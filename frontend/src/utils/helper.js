import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < words.length; i++) {
    initials += words[i].charAt(0).toUpperCase();
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  if (!data.length) return [];

  // ✅ Sort by date (ascending order)
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // ✅ Ensure X-Axis key is "date" & format is "MMM DD"
  return sortedData.map((item) => ({
    date: moment(item.date).format("MMM DD"), // 🔹 Example: "Mar 15"
    amount: item.amount,
    source: item.source,
  }));
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month : moment(item?.date).format("Do MMM"),
    amount : item?.amount,
    category : item?.category,
  }));
  return chartData;
};
