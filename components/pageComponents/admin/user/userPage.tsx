"use client";
import Loader from "@/components/common/loader";
import UserTable from "@/components/pageComponents/admin/user/userTable";
import { useAdminUsers } from "@/lib/hooks/adminDashboardApi/useAdmin";
import { countActiveUsersLast2Months } from "@/lib/utils";
import {
  ChevronDown,
  Share,
  User,
  UserPen,
  UserPlus,
  UserRoundCheck,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [role, setRole] = useState("");
  const limit = 10;
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { useradminData, isLoading, error } = useAdminUsers(
    page,
    limit,
    debouncedSearch,
    role,
  );

  //Effect for 1 second wait on search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 1000); // 1 second delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);
  //console.log(searchQuery, "admin data");
  const totalCount = useradminData?.totalCounts;
  const totalPages = totalCount || Math.max(1, Math.ceil(totalCount / limit));

  // console.log(useradminData, "admin user data");
  if (isLoading) return <Loader />;
  return (
    <div>
      <div className="mt-5 grid grid-cols-2 gap-8 md:grid-cols-3">
        {/* TOTAL Users */}
        <div className="flex flex-col justify-between rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5 md:h-[130px] md:w-[315px]">
          <div className="w-fit rounded-xl bg-[#EAF2EA] px-2 py-2">
            <User className="text-[#2E7D32]" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#8B8D97]">Total Users</h3>
            <p className="text-xl font-medium">{useradminData.totalCounts}</p>
          </div>
        </div>
        {/* USERS TODAY */}
        <div className="flex flex-col justify-between rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5 md:h-[130px] md:w-[315px]">
          <div className="w-fit rounded-xl bg-[#FFF9EA] px-2 py-2">
            <UserPlus className="text-[#FBC02D]" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#8B8D97]">Active Users</h3>
            <p className="text-xl font-medium">
              {countActiveUsersLast2Months(useradminData?.data)}
            </p>
          </div>
        </div>
        {/* PENDING TODAY */}
        <div className="flex flex-col justify-between rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5 md:h-[130px] md:w-[315px]">
          <div className="w-fit rounded-xl bg-[#AD91FF29] px-2 py-2">
            <UserRoundCheck className="text-[#8A38F5]" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#8B8D97]">New Users</h3>
            <p className="text-xl font-medium">5</p>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-[10px] bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left side - Search and Filters */}
          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
            {/* Search Input */}
            <div className="w-full md:w-xl">
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search user..."
                  className="w-full rounded-xl border border-[#DEDEDE] py-3 pr-4 pl-10 text-[14px] text-[#949494] focus:border-[#2E7D32] focus:outline-none md:text-[16px]"
                />
              </div>
            </div>

            {/* Status Dropdown */}
            {/* <div className="relative hidden w-full md:block md:w-35">
              <select className="w-full cursor-pointer appearance-none rounded-xl border border-[#DEDEDE] bg-white p-3 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none">
                <option>Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-[#949494]" />
            </div> */}

            {/* User Type Dropdown */}

            {/* Joined Date Dropdown */}
            {/* <div className="relative hidden w-full md:block md:w-35">
              <select className="w-full cursor-pointer appearance-none rounded-xl border border-[#DEDEDE] bg-white p-3 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none">
                <option>Joined Date</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div> */}
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <div className="relative hidden w-full md:block md:w-35">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-[#DEDEDE] bg-white p-3 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none"
              >
                <option value="">All Role</option>
                <option value="super-admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="support-agent">Support Agent</option>
                <option value="vendor">Vendor</option>
                <option value="user">User</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-[#949494]" />
            </div>

            {/* Export Button */}
            {/* <button className="flex w-full items-center space-x-1.5 rounded-xl border border-[#E9E9E9] bg-white px-4 py-3 text-[16px] text-[#2E7D32] hover:bg-gray-50 md:w-auto">
              <Share size={18} />
              <span>Export Data</span>
            </button> */}

            {/* Add Role Button */}
            {/* <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2E7D32] px-4 py-3 text-[16px] font-medium text-white hover:bg-green-700 md:w-auto md:whitespace-nowrap">
              <UserPlus size={18} />
              <span>Add User</span>
            </button> */}
          </div>
        </div>

        <UserTable
          totalPages={totalPages}
          data={useradminData?.data}
          user="user"
          page={page}
        />
      </div>
    </div>
  );
}
