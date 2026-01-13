import http from "./http";

export const getVendorDashboardAnalytics = async () => {
  const { data } = await http.get(`/vendor/dashboard-analytics`);
  return data;
};

export const getVendorProducts = async () => {
  const { data } = await http.get(`/vendor/products`);
  return data;
};
