import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";




const CustomBarChart = ({ data }) => {

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-200">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-700">
            Amount: <span className="font-semibold text-gray-900">${payload[0].payload.amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  const COLORS = ["#875cf5", "#90b9ff"]; // Alternate colors

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none"/>
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} /> 
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
