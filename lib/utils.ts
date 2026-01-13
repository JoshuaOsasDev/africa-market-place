import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (createdAt: string) => {
  return new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const countActiveUsersLast2Months = (users: any[]) => {
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

  return users.filter((user) => {
    if (user.role !== "user" || user.role === "admin") return false;
    if (!user.lastSeen) return false;
    return new Date(user.lastSeen) >= twoMonthsAgo;
  }).length;
};
