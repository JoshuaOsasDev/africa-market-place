export default function ProductsAndRegionalPerformance() {
  // Top Products Data
  const topProducts = [
    {
      id: 1,
      name: "Green Beans",
      sales: 2568,
      amount: "₦45,007",
    },
    {
      id: 2,
      name: "Salad Greens",
      sales: 1850,
      amount: "₦43,104",
    },
    {
      id: 3,
      name: "Cocoa Yam",
      sales: 1500,
      amount: "₦2,933",
    },
    {
      id: 4,
      name: "Maize",
      sales: 1200,
      amount: "₦6,012",
    },
    {
      id: 5,
      name: "Red Pepper",
      sales: 2968,
      amount: "₦10,378",
    },
    {
      id: 6,
      name: "Tomatoes",
      sales: 2368,
      amount: "₦9,815",
    },
  ];

  // Regional Performance Data
  const regionalData = [
    { region: "Abuja", percentage: 70, color: "bg-[#2E7D32]" },
    { region: "Lagos", percentage: 50, color: "bg-[#2E7D32]" },
    { region: "Kano", percentage: 40, color: "bg-[#2E7D32]" },
  ];

  return (
    <div className="w-full space-y-6 bg-gray-50 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-[18px] font-semibold text-[#333843]">
            Top Products
          </h2>

          <div className="space-y-4">
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b border-[#F0F1F3] pb-4 last:border-b-0"
              >
                {/* Product Info */}
                <div className="flex items-center gap-3">
                  {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F6F6F6]">
                    <span className="text-lg">{product.icon}</span>
                  </div> */}
                  <div>
                    <p className="text-[14px] font-medium text-[#333843]">
                      {product.name}
                    </p>
                    <p className="text-[12px] text-[#667085]">
                      {product.sales} Sales
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <p className="text-[14px] font-semibold text-[#333843]">
                    {product.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Performance */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-[18px] font-semibold text-[#333843]">
            Regional Performance
          </h2>

          {/* Map Section */}
          <div className="relative mb-6 flex h-40 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
            {/* Simple Map Visualization */}
            {/* <div className="relative h-full w-full bg-gradient-to-br from-blue-50 to-green-50">
           
              <svg
                className="h-full w-full opacity-20"
                viewBox="0 0 300 200"
                preserveAspectRatio="none"
              >
                <path
                  d="M50,50 Q150,30 250,50 T250,150 Q150,170 50,150 T50,50"
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2"
                />
              </svg>

           
              <div className="absolute top-12 left-1/3 flex flex-col items-center">
                <div className="h-4 w-4 animate-pulse rounded-full bg-red-500"></div>
                <div className="mt-1 text-[10px] font-semibold text-[#333843]">
                  Abuja
                </div>
              </div>

              <div className="absolute top-32 left-1/4 flex flex-col items-center">
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
                <div className="mt-1 text-[10px] font-semibold text-[#333843]">
                  Lagos
                </div>
              </div>

              <div className="absolute right-1/4 bottom-8 flex flex-col items-center">
                <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                <div className="mt-1 text-[10px] font-semibold text-[#333843]">
                  Kano
                </div>
              </div>
            </div> */}
          </div>

          {/* Performance Bars */}
          <div className="space-y-5">
            {regionalData.map((region) => (
              <div key={region.region}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[14px] font-medium text-[#333843]">
                    {region.region}
                  </span>
                  <span className="text-[14px] font-semibold text-[#333843]">
                    {region.percentage}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full ${region.color}`}
                    style={{ width: `${region.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
