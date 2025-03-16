import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";


const CustomPieChart = ({ data, label, totalAmount, colors }) => {
    return (
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
          <Legend content={CustomLegend} />
  
          {/* Centered Total Balance Text */}
          <text
            x="50%"
            y="50%"
            dy={-10} // Adjust the position
            textAnchor="middle"
            fill="#666"
            fontSize="14px"
            fontWeight="bold"
          >
            {label}
          </text>
          <text
            x="50%"
            y="50%"
            dy={15} // Move it slightly below
            textAnchor="middle"
            fill="#000"
            fontSize="24px"
            fontWeight="semi-bold"
          >
            {totalAmount}
          </text>
        </PieChart>
      </ResponsiveContainer>
    );
  };

export default CustomPieChart;
