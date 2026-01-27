"use client";
import { ChevronDown } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="rounded-lg border border-[#2E7D32]/20 bg-[#F0F9F0] p-3 shadow-lg">
//         <p className="text-[14px] font-semibold text-[#333843]">
//           {payload[0].name}: {payload[0].value}
//         </p>
//       </div>
//     );
//   }
//   return (
//     <div className="h-10 w-20 rounded-lg border border-[#2E7D32]/20 bg-[#F0F9F0] p-3"></div>
//   );
// };

export default function DashboardSalesPage() {
  // Sales Dynamics Data
  const salesData = [
    { month: "Jan", sales: 2400 },
    { month: "Feb", sales: 1398 },
    { month: "Mar", sales: 3200 },
    { month: "Apr", sales: 2780 },
    { month: "May", sales: 1890 },
    { month: "Jun", sales: 2390 },
    { month: "Jul", sales: 3490 },
    { month: "Aug", sales: 2100 },
    { month: "Sep", sales: 2800 },
    { month: "Oct", sales: 2390 },
    { month: "Nov", sales: 3200 },
    { month: "Dec", sales: 2800 },
  ];

  // Revenue Overview Data
  const revenueData = [
    { day: "01am", revenue: 30 },
    { day: "02am", revenue: 35 },
    { day: "03am", revenue: 28 },
    { day: "04am", revenue: 40 },
    { day: "05am", revenue: 32 },
    { day: "06am", revenue: 45 },
    { day: "07am", revenue: 50 },
    { day: "08am", revenue: 48 },
    { day: "09am", revenue: 55 },
    { day: "10am", revenue: 60 },
    { day: "11am", revenue: 65 },
    { day: "12am", revenue: 70 },
  ];

  return (
    <div className="w-full space-y-6 bg-gray-50 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales Dynamics Chart */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[18px] font-semibold text-[#333843]">
              Sales dynamics
            </h2>
            <div className="flex items-start gap-2">
              <span className="text-[19.2px] font-medium text-[#535353]">
                2023
              </span>
              <ChevronDown className="h-5 w-5 text-[#535353]" />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData} barCategoryGap={"20%"}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F3" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#667085", fontSize: 12 }}
                axisLine={{ stroke: "#F0F1F3" }}
              />
              <YAxis
                tick={{ fill: "#667085", fontSize: 12 }}
                axisLine={{ stroke: "#F0F1F3" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E0E2E7",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="sales"
                fill="#2E7D32"
                radius={[8, 8, 0, 0]}
                width={20}
                background={{
                  fill: "#EAF2EA", // 👈 background color
                  radius: `${[8, 8, 0, 0]}`,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Overview Chart */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[18px] font-semibold text-[#333843]">
              Revenue Overview
            </h2>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-[#2E7D32] px-3 py-1">
              <span className="text-[12px] font-semibold text-white">+7%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              {/* Gradient definition */}
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#5BC4FF" />
                  <stop offset="100%" stopColor="#FF5BEF" />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F3" />
              <XAxis
                dataKey="day"
                tick={{ fill: "#667085", fontSize: 12 }}
                axisLine={{ stroke: "#F0F1F3" }}
              />
              <YAxis
                tick={{ fill: "#667085", fontSize: 12 }}
                axisLine={{ stroke: "#F0F1F3" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E0E2E7",
                  borderRadius: "8px",
                }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="url(#revenueGradient)" // 👈 gradient here
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
