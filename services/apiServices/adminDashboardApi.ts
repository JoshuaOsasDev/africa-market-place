import { Search } from "lucide-react";
import http from "./http";

// Admin Settings APIs
export const getAdminSettings = async () => {
  const { data } = await http.get(`/admin/settings/settings`);
  return data;
};

// Admin Currency APIs
export const getAdminCurrency = async () => {
  const { data } = await http.get(`/admin/currencies`);
  return data;
};

export const getAdminCurrencyById = async (currencyId: string) => {
  const { data } = await http.get(`/admin/currencies/${currencyId}`);
  return data;
};

export const createAdminCurrency = async (currencyData: {
  name: string;
  code: "NGN" | "USD" | "EUR" | "GBP";
  rate: number;
  country: string;
}) => {
  const { data } = await http.post(`/admin/currencies`, currencyData);
  return data;
};

// Admin Users APIs
export const getAdminUser = async (
  page: { page: number },
  limit: number,
  search: string = "",
  role: string = "",
) => {
  const { data } = await http.get(
    `/admin/users?page=${page}&limit=${limit}&search=${search}&role=${role}`,
  );
  return data;
};

// Admin dashboard

export const getAdminDashboardAnalytics = async () => {
  const { data } = await http.get(`/admin/dashboard-analytics`);
  // console.log(data, "admin data");
  return data;
};

//get all categories
export const getAllCategories = async () => {
  const { data } = await http.get(`/all/category-subcategory-childcategory`);
  return data;
};

//get admin product

export const getAdminProduct = async (
  page: { page: number },
  limit: number = 10,
  search: string = "",
  status: string = "",
) => {
  const { data } = await http.get(
    `/admin/products?page=${page}&limit=${limit}&search=${search}&status=${status}`,
  );
  return data;
};

export const approveAdminProduct = async (slug: string, details: string) => {
  const { data } = await http.put(`/admin/products/${slug}`, {
    status: details,
  });
  return data;
};

export const getAdminShops = async (
  page: { page: number },
  limit: number = 10,
  search: string = "",
  status: string = "",
) => {
  const { data } = await http.get(
    `/admin/shops?page=${page}&limit=${limit}&search=${search}&status=${status}`,
  );
  return data;
};

export const getAdminShop = async (slug: string) => {
  const { data } = await http.get(`/admin/shops/${slug}`);
  return data;
};

export const approveAdminShop = async (slug: string, details: string) => {
  const { data } = await http.put(`/admin/shops/status/${slug}`, {
    status: details,
  });
  return data;
};
