"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CreateRoles() {
  const [permissions, setPermissions] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    employeeId: "",
    dateJoined: "",
    role: "",
    isActive: true,
  });

  const permissionsList = [
    "User management",
    "Role management",
    "Product management",
    "Order management",
    "Reports access",
    "Settings access",
    "Audit logs",
    "Billing",
    "Support",
    "Notifications",
  ];

  const togglePermission = (permission: string) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission],
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      permissions,
    };

    //console.log("Form Payload:", payload);

    // Example API call
    // await axios.post("/api/roles", payload);
  };

  return (
    <div className="">
      <div className="col-1 mb-5 h-full w-full p-4">
        <h1 className="mb-2 text-2xl font-bold text-[#424242]">
          Platform Details
        </h1>
        <p className="mb-4 text-[16px] text-[#595959]">
          Create a new role with full system privileges
        </p>

        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 lg:flex-row">
            <label htmlFor="firstName" className="w-full">
              <span className="text-[18px] font-medium text-[#424242]">
                First Name
                <br />
              </span>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Your First Name"
                className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
              />
            </label>

            <label htmlFor="lastName" className="w-full">
              <span className="text-[18px] font-medium text-[#424242]">
                Last Name
                <br />
              </span>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Your Last Name"
                className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
              />
            </label>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <label htmlFor="emailAddress" className="w-full">
              <span className="text-[18px] font-medium text-[#424242]">
                Email Address
                <br />
              </span>
              <input
                type="email"
                name="emailAddress"
                id="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                placeholder="john@example.com"
                className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
              />
            </label>

            <label htmlFor="phoneNumber" className="w-full">
              <span className="text-[18px] font-medium text-[#424242]">
                Phone Number
                <br />
              </span>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="mt-2 w-full rounded-xl border border-[#E0E0E0] px-[14px] py-4 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
              />
            </label>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <label htmlFor="employeeId" className="w-full">
              <span className="text-[18px] font-medium text-[#424242]">
                Employee ID
                <br />
              </span>
              <input
                type="text"
                name="employeeId"
                id="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="WP-9990"
                className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
              />
            </label>

            <label htmlFor="dateJoined" className="w-full">
              <span className="text-[18px] font-medium text-[#424242]">
                Date Joined
                <br />
              </span>

              <input
                type="date"
                name="dateJoined"
                id="dateJoined"
                value={formData.dateJoined}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959]"
              />
            </label>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <label htmlFor="role" className="w-full">
              <span className="text-[18px] font-medium text-[#424242]">
                Role
                <br />
              </span>
              <div className="relative w-full">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full cursor-pointer appearance-none rounded-xl border border-[#DEDEDE] bg-white p-3 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none"
                >
                  <option>Finance</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-[#949494]" />
              </div>
            </label>

            <label
              htmlFor="timeZone"
              className="flex w-full items-center justify-between rounded-xl bg-[#F4F4F5] p-2.5"
            >
              <p className="flex flex-col text-[18px] font-medium text-[#424242]">
                <span>Account Status</span>
                <span className="text-sm font-normal">
                  {" "}
                  Enable or disable this role
                </span>
              </p>

              <Switch
                checked={formData.isActive}
                onCheckedChange={(value) =>
                  setFormData((prev) => ({ ...prev, isActive: value }))
                }
              />
            </label>
          </div>

          <div className="mt-3 flex flex-col gap-7.5">
            <div className="flex flex-col space-y-1">
              <h3 className="text-[20px] font-semibold text-[#424242]">
                Permissions & Access
              </h3>
              <p className="text-[16px] text-[#595959]">
                Configure access levels and permissions for the super admin
              </p>
            </div>
            <div className="flex w-full flex-col md:flex-row md:justify-between">
              <div className="space-y-2">
                {permissionsList
                  .slice(0, Math.ceil(permissionsList.length / 2))
                  .map((permission) => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={permissions.includes(permission)}
                        onChange={() => togglePermission(permission)}
                        className="mr-2 accent-[#2E7D32]"
                      />
                      {permission}
                    </label>
                  ))}
              </div>

              <div className="space-y-2">
                {permissionsList
                  .slice(Math.ceil(permissionsList.length / 2))
                  .map((permission) => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={permissions.includes(permission)}
                        onChange={() => togglePermission(permission)}
                        className="mr-2 accent-[#2E7D32]"
                      />
                      {permission}
                    </label>
                  ))}
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="mt-3 rounded-2xl bg-[#2E7D32] py-5 md:mx-auto md:mt-5 md:px-38"
          >
            Create Role
          </Button>
        </form>
      </div>
    </div>
  );
}
