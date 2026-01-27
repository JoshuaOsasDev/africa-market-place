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
export const getAdminUser = async () => {
  const { data } = await http.get(`/admin/users`);
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
