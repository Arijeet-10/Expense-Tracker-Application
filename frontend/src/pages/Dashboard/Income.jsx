import React, { useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useState } from "react";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

function Income() {

  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get All Income Details

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Income

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    if (!source.trim()) {
      toast.error("Source is Required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Invalid Amount");
      return;
    }

    if (!date) {
      toast.error("Date is Required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income Added Successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log(
        "Something went wrong",
        error.response?.data?.message || error.message
      );
    }
  };

  // Delete income

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income Deleted Successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log(
        "Something went wrong",
        error.response?.data?.message || error.message
      );
    }
  };

  // handle download income details

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        { responseType: "blob" }
      );
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click(); // ✅ This ensures the download starts
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details", error);
      toast.error("Error downloading income details, please try again");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show} // ✅ Corrected
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => {
              console.log("Deleting ID:", openDeleteAlert.data); // ✅ Debugging
              deleteIncome(openDeleteAlert.data);
            }}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;
