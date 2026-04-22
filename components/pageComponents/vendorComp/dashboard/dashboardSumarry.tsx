import {
  BanknoteArrowUp,
  ShoppingCart,
  ScanQrCode,
  Wallet,
} from "lucide-react";

export default function DashboardSummary(dashboardData: any) {
  //calcuating sales and revenue and balance

  const analytics = dashboardData?.dashboardData;
  const totalSales = analytics?.salesReport?.reduce(
    (sum: any, sale: any) => sum + sale,
    0,
  );

  const revenue = analytics?.monthlyEarningsByVendor;

  const balance = revenue - totalSales;
  // console.log(analytics, "admin");
  const stats = [
    {
      icon: BanknoteArrowUp,
      iconBg: "#DEDEFA",
      iconBorder: "#EFEFFD",
      iconColor: "#5C59E8",
      title: "Total Revenue",
      amount: revenue?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      percentage: 15,
    },
    {
      icon: ShoppingCart,
      iconBg: "#CFE7DC",
      iconBorder: "#E7F4EE",
      iconColor: "#2E7D32",
      title: "Total Sales",
      amount: totalSales?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      percentage: -8,
    },
    {
      icon: ScanQrCode,
      iconBg: "#FCDAD7",
      iconBorder: "#FEEDEC",
      iconColor: "#F04438",
      title: "Product SKU",
      amount: analytics?.totalProducts?.toLocaleString(),
      percentage: 23,
    },
    {
      icon: Wallet,
      iconBg: "#FAE1CF",
      iconBorder: "#FDF1E8",
      iconColor: "#E46A11",
      title: "Balance",
      amount: balance?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      percentage: -12,
    },
  ];

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isNegative = stat.percentage < 0;

        return (
          <div
            key={index}
            className="flex w-full flex-col items-start gap-4 rounded-xl border border-[#E0E2E7] bg-white p-5"
          >
            <div
              className="rounded-full border-4 p-2"
              style={{
                backgroundColor: stat.iconBg,
                borderColor: stat.iconBorder,
              }}
            >
              <Icon className="h-6 w-6" style={{ color: stat.iconColor }} />
            </div>
            <div className="w-full">
              <h3 className="text-lg font-medium text-[#667085]">
                {stat.title}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-medium text-[#333843]">
                  {`£${stat.amount}`}
                </span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                    isNegative
                      ? "bg-[#FEEDEC] text-[#F04438]"
                      : "bg-[#E7F4EE] text-[#2E7D32]"
                  }`}
                >
                  {isNegative ? "" : "+"}
                  {stat.percentage}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
