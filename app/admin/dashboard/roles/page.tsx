"use client";
import Modal from "@/components/common/Modal";
import CreateRoles from "@/components/pageComponents/admin/roles/createRoles";
import {
  ChevronDown,
  Share,
  UserPen,
  Edit,
  Trash2,
  Settings,
  ShoppingCart,
  Headphones,
  Image,
  ImagePlay,
  ShoppingBag,
  ChartNoAxesColumn,
  User,
  SettingsIcon,
  ShoppingBagIcon,
  ListOrdered,
} from "lucide-react";

export default function RolesPage() {
  // Mock roles data
  const rolesData = [
    {
      id: "1",
      name: "Administrator",
      lastUpdated: "Last updated 12/07/2025",
      accessLevel: "Full system access",
      icon: <Settings />,
      permissions: ["Users", "Settings", "Products", "Orders"],
    },
    {
      id: "2",
      name: "Store Manager",
      lastUpdated: "Last updated 12/07/2025",
      accessLevel: "Limited access",
      icon: <ShoppingCart />,
      permissions: ["Users", "Products", "Orders"],
    },
    {
      id: "3",
      name: "Customer Support",
      lastUpdated: "Last updated 12/07/2025",
      accessLevel: "Limited access",
      icon: <Headphones />,
      permissions: ["Users", "Orders"],
    },
    {
      id: "4",
      name: "Content Manager",
      lastUpdated: "Last updated 12/07/2025",
      accessLevel: "Limited access",
      icon: <ImagePlay />,
      permissions: ["Settings", "Products"],
    },
    {
      id: "5",
      name: "Inventory Manager",
      lastUpdated: "Last updated 12/07/2025",
      accessLevel: "Limited access",
      icon: <ShoppingBag />,
      permissions: ["Users", "Products", "Orders"],
    },
    {
      id: "6",
      name: "Analytics Manager",
      lastUpdated: "Last updated 12/07/2025",
      accessLevel: "Full system access",
      icon: <ChartNoAxesColumn />,
      permissions: ["Users", "Settings", "Products", "Orders"],
    },
  ];

  const getAccessBadgeStyle = (accessLevel: string) => {
    return accessLevel === "Full system access"
      ? "bg-[#2E7D32] text-white"
      : "bg-gray-100 text-[#667085]";
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="rounded-[10px] bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left side - Search and Filters */}
          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
            {/* Search Input */}
            <div className="w-full lg:w-50">
              <div className="relative">
                <svg
                  className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400"
                  fill="none"
                  stroke="#949494"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search user..."
                  className="w-full rounded-xl border border-[#DEDEDE] py-3 pr-4 pl-10 text-[14px] text-[#949494] focus:border-[#2E7D32] focus:outline-none md:text-[16px]"
                />
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="relative hidden w-full md:block md:w-35">
              <select className="w-full cursor-pointer appearance-none rounded-xl border border-[#DEDEDE] bg-white p-3 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none">
                <option>Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-[#949494]" />
            </div>

            {/* User Type Dropdown */}
            <div className="relative hidden w-full md:block md:w-35">
              <select className="w-full cursor-pointer appearance-none rounded-xl border border-[#DEDEDE] bg-white p-3 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none">
                <option>User Type</option>
                <option>Admin</option>
                <option>Manager</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-[#949494]" />
            </div>

            {/* Joined Date Dropdown */}
            <div className="relative hidden w-full md:block md:w-35">
              <select className="w-full cursor-pointer appearance-none rounded-xl border border-[#DEDEDE] bg-white p-3 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none">
                <option>Joined Date</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            {/* Export Button */}
            <button className="flex w-full items-center space-x-1.5 rounded-xl border border-[#E9E9E9] bg-white px-4 py-3 text-[16px] text-[#2E7D32] hover:bg-gray-50 md:w-auto">
              <Share size={18} />
              <span>Export Data</span>
            </button>

            {/* Add Role Button */}
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2E7D32] px-4 py-3 text-[16px] font-medium text-white hover:bg-green-700 md:w-auto md:whitespace-nowrap">
              <UserPen size={18} />
              <span>Add Role</span>
            </button>
          </div>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 gap-9 md:grid-cols-2">
        {rolesData.map((role) => (
          <div
            key={role.id}
            className="flex flex-col gap-3.5 rounded-lg border border-[#EBEBEB] bg-white p-4"
          >
            {/* Role Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[20px] bg-[#F4F4F5]">
                  <span className="text-lg">{role.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#333843]">
                    {role.name}
                  </h3>
                  <p className="text-[16px] text-[#595959]">
                    {role.lastUpdated}
                  </p>
                </div>
              </div>

              {/* Access Level Badge */}
              <div className="">
                <span
                  className={`inline-flex items-center rounded-xl px-3 py-1.5 text-[12px] font-medium ${getAccessBadgeStyle(
                    role.accessLevel,
                  )}`}
                >
                  {role.accessLevel}
                </span>
              </div>
            </div>

            {/* Permissions Section */}
            <div className="border-t border-[#E9E9E9] pt-4">
              <p className="mb-2 text-[12px] font-medium">
                Permissions Category
              </p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <div
                    key={permission}
                    className="flex items-center space-x-1.5 rounded-xl bg-[#F4F4F5] px-2.5 py-1"
                  >
                    <span className="text-[16px] text-[#667085]">
                      {permission === "Users" && <User />}
                      {permission === "Settings" && <SettingsIcon />}
                      {permission === "Products" && <ShoppingBagIcon />}
                      {permission === "Orders" && <ListOrdered />}
                    </span>
                    <span className="text-[12px] text-[#667085]">
                      {permission}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3">
              <Modal>
                <Modal.Open opens="create-role">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#2E7D32] px-4 py-2 text-[14px] font-medium text-[#2E7D32] hover:bg-[#F0F9F0] md:py-2.5">
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>
                </Modal.Open>
                <Modal.Window
                  name="create-role"
                  className="max-w-3xl overflow-y-scroll"
                >
                  <CreateRoles />
                </Modal.Window>
              </Modal>

              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-[14px] font-medium text-red-600 hover:bg-red-50 md:py-2.5">
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
