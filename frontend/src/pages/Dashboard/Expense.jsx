import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { API_PATHS } from "../../utils/apiPaths";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "./../../components/Modal";
import ExpenseList from "./../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Get All Expense Details

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );
      if (response.data) setExpenseData(response.data);
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false); // ✅ Ensure `loading` is always updated
    }
  };

  // Handle Add Expense

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    if (!category.trim()) {
      toast.error("Category is Required");
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense Added Successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.log(
        "Something went wrong",
        error.response?.data?.message || error.message
      );
    }
  };

  // Delete Expense

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense Details Deleted Successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.log(
        "Something went wrong",
        error.response?.data?.message || error.message
      );
    }
  };

  // handle download Expense details

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click(); // ✅ This ensures the download starts
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details", error);
      toast.error("Error downloading expense details, please try again");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid gird-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show} // ✅ Corrected
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Expense?"
            onDelete={() => {
              console.log("Deleting ID:", openDeleteAlert.data); // ✅ Debugging
              deleteExpense(openDeleteAlert.data);
            }}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
