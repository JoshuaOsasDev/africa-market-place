import http from "./http";
import {
  CategoryPayload,
  ChildCategoryPayload,
  SubCategoryPayload,
} from "@/components/pageComponents/admin/pageSetup/categoriesSetup";

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
  page: number,
  limit: number,
  search: string = "",
  role: string = "",
) => {
  //console.log(page, "user page");
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
  page: number,
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
  page: number,
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

//Set category api
export const createCategory = async (categoryData: CategoryPayload) => {
  const { data } = await http.post(`/admin/categories`, categoryData);
  return data;
};

export const getAllCategoriesAdmin = async () => {
  const { data } = await http.get(`/admin/all-categories`);
  return data;
};
export const getAllSubCategoriesAdmin = async () => {
  const { data } = await http.get(`/admin/sub-categories/all`);
  return data;
};
export const createSubCategory = async (
  subCategoryData: SubCategoryPayload,
) => {
  const { data } = await http.post(`/admin/sub-categories`, subCategoryData);
  return data;
};

export const createChildCategory = async (
  childCategoryData: ChildCategoryPayload,
) => {
  const { data } = await http.post(
    `/admin/child-categories`,
    childCategoryData,
  );
  return data;
};
