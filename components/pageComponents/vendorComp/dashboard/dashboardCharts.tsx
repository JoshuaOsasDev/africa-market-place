"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { MoreVertical } from "lucide-react";

// Props interface for the component
export type DashboardChartsProps = {
  incomeReport?: {
    month?: number[];
    week?: number[];
  };
  orderReport?: string[];
  monthlyEarningsByVendor?: number;
  dailyEarning?: number;
  salesReport?: number[];
};

// Sample data for the chart
// const chartData = [
//   { month: "Jan", revenue: 800, sales: 600 },
//   { month: "Feb", revenue: 950, sales: 910 },
//   { month: "Mar", revenue: 1100, sales: 900 },
//   { month: "Apr", revenue: 1050, sales: 950 },
//   { month: "May", revenue: 900, sales: 1400 },
//   { month: "Jun", revenue: 1200, sales: 1000 },
//   { month: "Jul", revenue: 1150, sales: 950 },
//   { month: "Aug", revenue: 1300, sales: 1100 },
//   { month: "Sep", revenue: 1100, sales: 950 },
//   { month: "Oct", revenue: 1000, sales: 900 },
//   { month: "Nov", revenue: 950, sales: 1050 },
//   { month: "Dec", revenue: 1100, sales: 1000 },
// ];

export default function DashboardCharts({
  incomeReport,
  monthlyEarningsByVendor = 0,
  salesReport = [],
}: DashboardChartsProps) {
  // Transform monthly income data for the chart
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = monthNames.map((month, index) => ({
    month,
    revenue: incomeReport?.month?.[index] || 0,
    sales: salesReport[index] || 0,
  }));

  // Calculate sales progress (example: percentage of monthly target)
  const monthlyTarget = 1000; // Set your target
  const salesProgress: any = Math.min(
    (monthlyEarningsByVendor / monthlyTarget) * 100,
    100,
  ).toFixed(2);

  // Calculate growth percentage (comparing to previous month)
  const currentMonthIndex = new Date().getMonth();
  const currentMonthEarnings = incomeReport?.month?.[currentMonthIndex] || 0;
  const previousMonthEarnings =
    incomeReport?.month?.[currentMonthIndex - 1] || 0;
  const growthPercentage =
    previousMonthEarnings > 0
      ? (
          ((currentMonthEarnings - previousMonthEarnings) /
            previousMonthEarnings) *
          100
        ).toFixed(1)
      : 0;

  // Stats for bottom section
  const target = (monthlyTarget / 1000).toFixed(1);
  const revenue = (monthlyEarningsByVendor / 1000).toFixed(1);
  const totalSales = salesReport.reduce((sum, sale) => sum + sale, 0);
  const sales = (totalSales / 1000).toFixed(1);

  // Calculate the circle's stroke properties
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  // const salesProgress = 75.55;
  // const earnedToday = 240;
  // const revenue = 20;
  // const sales = 1.5;
  // const target = 1.1;

  // Calculate the circle's stroke properties
  // const radius = 70;
  // const circumference = 2 * Math.PI * radius;
  // const strokeDashoffset =
  //   circumference - (salesProgress / 100) * circumference;

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Statistics Chart - Takes 2 columns */}
      <div className="h-[374px] rounded-xl border border-[#E0E2E7] bg-white p-6 lg:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#333843]">Statistics</h3>
            <p className="text-sm text-[#667085]">Revenue and Sales</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#5C59E8]"></div>
              <span className="text-sm font-medium text-[#667085]">
                Revenue
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#E46A11]"></div>
              <span className="text-sm font-medium text-[#667085]">Sales</span>
            </div>
          </div>
          <button className="rounded-lg p-1 hover:bg-gray-100">
            <MoreVertical className="h-5 w-5 text-[#667085]" />
          </button>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            {/* Define Gradients */}
            <defs>
              {/* Revenue Gradient */}
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7D7AED" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#FFFFFF00" stopOpacity={0} />
              </linearGradient>

              {/* Sales Gradient */}
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E98841" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#FFFFFF00" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#E0E2E7" />

            <XAxis
              dataKey="month"
              tick={{ fill: "#667085", fontSize: 12 }}
              axisLine={{ stroke: "#E0E2E7" }}
            />

            <YAxis
              tick={{ fill: "#667085", fontSize: 12 }}
              axisLine={{ stroke: "#E0E2E7" }}
              tickFormatter={(value) => `$${value}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E0E2E7",
                borderRadius: "8px",
                padding: "8px",
              }}
            />

            {/* Revenue Area */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#5C59E8"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              dot={false}
              activeDot={{ r: 5 }}
            />

            {/* Sales Area */}
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#E98841"
              strokeWidth={2}
              fill="url(#salesGradient)"
              dot={false}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Progress - Takes 1 column */}
      <div className="h-[376px] rounded-xl border border-[#E0E2E7] bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#333843]">
              Sales Progress
            </h3>
            <p className="text-sm text-[#667085]">This Quarter</p>
          </div>
          <button className="rounded-lg p-1 hover:bg-gray-100">
            <MoreVertical className="h-5 w-5 text-[#667085]" />
          </button>
        </div>

        {/* Semi-circle Progress */}
        <div className="relative mx-auto flex h-[136px] w-full items-end justify-center">
          <svg className="h-40 w-full" viewBox="0 0 200 120">
            {/* Background arc */}
            <path
              d="M 30 100 A 70 70 0 0 1 170 100"
              fill="none"
              stroke="#E0E2E7"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Progress arc */}
            <path
              d="M 30 100 A 70 70 0 0 1 170 100"
              fill="none"
              stroke="#2E7D32"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference / 2}
              strokeDashoffset={
                circumference / 2 - (salesProgress / 100) * (circumference / 2)
              }
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute bottom-8 text-center">
            <div className="text-3xl font-bold text-[#333843]">
              {salesProgress}%
            </div>

            <span className="m-auto w-fit rounded-full bg-[#E7F4EE] px-1 py-0.5 text-sm text-[#2E7D32]">
              +{growthPercentage}%
            </span>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="space-y-4">
          <p className="text-center text-sm text-[#667085]">
            You succeed earn{" "}
            <span className="font-semibold text-[#333843]">
              ${growthPercentage}
            </span>{" "}
            today, its higher than yesterday
          </p>

          <div className="flex items-center justify-between rounded-lg bg-[#F9F9FC] p-4">
            <div>
              <p className="text-sm text-[#667085]">Target</p>
              <p className="flex items-center gap-1 text-lg font-semibold text-[#333843]">
                ${target}k<span className="text-sm text-[#F36960]"> ↓</span>
              </p>
            </div>
            <div className="h-8 w-px bg-[#E0E2E7]"></div>
            <div>
              <p className="text-sm text-[#667085]">Revenue</p>
              <p className="flex items-center gap-1 text-lg font-semibold text-[#333843]">
                ${revenue}k<span className="text-sm text-[#2E7D32]">↑</span>
              </p>
            </div>
            <div className="h-8 w-px bg-[#E0E2E7]"></div>
            <div>
              <p className="text-sm text-[#667085]">Sales</p>
              <p className="flex items-center gap-1 text-lg font-semibold text-[#333843]">
                ${totalSales}k<span className="text-sm text-[#2E7D32]">↑</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
