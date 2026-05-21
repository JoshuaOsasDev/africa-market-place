import { Stat } from "@/app/admin/dashboard/page";
type DashboardSummaryProps = {
  stats: Stat[];
  dashboardGrid: string;
};

export default function DashboardSummary({
  stats,
  dashboardGrid,
}: DashboardSummaryProps) {
  return (
    <div
      className={`mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 ${dashboardGrid}`}
    >
      {stats?.map((stat, index) => {
        const Icon = stat.icon;

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
                  {`${stat.amount}`}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
