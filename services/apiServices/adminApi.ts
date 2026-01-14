/* import http from "./http";

export const adminDashboardAnalytics = async () => {
    const { data } = await http.get(`/admin/dashboard-analytics`);
    return data;
  };
 
  
  export const getBrandsByAdmin = async (page, search) => {
    const { data } = await http.get(`/admin/brands?search=${search}&page=${page}`);
    return data;
  };
  export const getBrandByAdmin = async (id) => {
    const { data } = await http.get(`/admin/brands/${id}`);
    return data;
  };
  export const getAllBrandsByAdmin = async () => {
    const { data } = await http.get(`/admin/all-brands`);
    return data;
  };
export const addBrandByAdmin = async(payload: any) => {
    const { data } = await http.post(`/admin/brands`, payload);
    return data;
  };
  export const updateBrandByAdmin = async ({ currentSlug, ...payload }) => {
    const { data } = await http.put(`/admin/brands/${currentSlug}`, payload);
    return data;
  };
  export const deleteBrandByAdmin = async (slug) => {
    const { data } = await http.delete(`/admin/brands/${slug}`);
    return data;
  };
  
  export const getCategoriesByAdmin = async (page, search) => {
    const { data } = await http.get(`/admin/categories?search=${search}&page=${page}`);
    return data;
  };
  export const getCategoryByAdmin = async (slug) => {
    const { data } = await http.get(`/admin/categories/${slug}`);
    return data;
  };
  export const deleteCategoryByAdmin = async (slug) => {
    const { data } = await http.delete(`/admin/categories/${slug}`);
    return data;
  };
  export const addCategoryByAdmin = async (payload) => {
    const { data } = await http.post(`/admin/categories`, payload);
    return data;
  };
  export const updateCategoryByAdmin = async ({ currentSlug, ...payload }) => {
    const { data } = await http.put(`/admin/categories/${currentSlug}`, payload);
    return data;
  };
  export const getAllCategoriesByAdmin = async () => {
    const { data } = await http.get(`/admin/all-categories`);
    return data;
  };
  // sub categories
  export const getSubCategoryByAdmin = async (slug) => {
    const { data } = await http.get(`/admin/sub-categories/${slug}`);
    return data;
  };
  export const getSubCategoriesByAdmin = async (params) => {
    const { data } = await http.get(`/admin/sub-categories?${params}`);
    return data;
  };
  export const deleteSubCategoryByAdmin = async (slug) => {
    const { data } = await http.delete(`/admin/sub-categories/${slug}`);
    return data;
  };
  export const addSubCategoryByAdmin = async (payload) => {
    const { data } = await http.post(`/admin/sub-categories`, payload);
    return data;
  };
  export const updateSubCategoryByAdmin = async ({ currentSlug, ...payload }) => {
    const { data } = await http.put(`/admin/sub-categories/${currentSlug}`, payload);
    return data;
  };
  // child categories
  
  export const getChildCategoryByAdmin = async (slug) => {
    const { data } = await http.get(`/admin/child-categories/${slug}`);
    return data;
  };
  export const getChildCategoriesByAdmin = async (params) => {
    const { data } = await http.get(`/admin/child-categories?${params}`);
    return data;
  };
  export const deleteChildCategoryByAdmin = async (slug) => {
    const { data } = await http.delete(`/admin/child-categories/${slug}`);
    return data;
  };
  export const addChildCategoryByAdmin = async (payload) => {
    const { data } = await http.post(`/admin/child-categories`, payload);
    return data;
  };
  export const updateChildCategoryByAdmin = async ({ currentSlug, ...payload }) => {
    const { data } = await http.put(`/admin/child-categories/${currentSlug}`, payload);
    return data;
  };
  export const getProductsByAdmin = async (params) => {
    const { data: response } = await http.get(`/admin/products?${params}`);
    return response;
  };
  export const createProductByAdmin = async (payload) => {
    const { data: response } = await http.post(`/admin/products`, payload);
    return response;
  };
  export const updateProductByAdmin = async ({ currentSlug, ...payload }) => {
    const { data: response } = await http.put(`/admin/products/${currentSlug}`, payload);
    return response;
  };
  
  export const deleteProductByAdmin = async (slug) => {
    const { data: response } = await http.delete(`/admin/products/${slug}`);
    return response;
  };
  
  export const getOrdersByAdmin = async (payload) => {
    const { data } = await http.get(`/admin/orders?${payload}`);
    return data;
  };
  export const getOrderByAdmin = async (id) => {
    const { data } = await http.get(`/admin/orders/${id}`);
    return data;
  };
  export const deleteOrderByAdmin = async (id) => {
    const { data } = await http.delete(`/admin/orders/${id}`);
    return data;
  };


export const getUserByAdminsByAdmin = async (page, search) => {
  const { data: response } = await http.get(`/admin/users?search=${search}&page=${page}`);
  return response;
};
export const getUserByAdmin = async (id) => {
  const { data: response } = await http.get(`/admin/users/${id}`);
  return response;
};
export const updateUserRoleByAdmin = async (id) => {
  const { data: response } = await http.post(`/admin/users/role/${id}`);
  return response;
};

export const getCouponCodesByAdmin = async (page, search) => {
  const { data: response } = await http.get(`/admin/coupon-codes?search=${search}&page=${page}`);
  return response;
};

export const getCouponCodeByAdmin = async (id) => {
  const { data: response } = await http.get(`/admin/coupon-codes/${id}`);
  return response;
};

export const addCouponCodeByAdmin = async (payload) => {
  const { data: response } = await http.post(`/admin/coupon-codes`, payload);
  return response;
};
export const updateCouponCodeByAdmin = async ({ currentId, ...others }) => {
  const { data: response } = await http.put(`/admin/coupon-codes/${currentId}`, others);
  return response;
};
export const deleteCouponCodeByAdmin = async (id) => {
  const { data: response } = await http.delete(`/admin/coupon-codes/${id}`);
  return response;
};


export const getShopDetailsByAdmin = async (slug) => {
  const { data } = await http.get(`/admin/shops/${slug}`);
  return data;
};
export const addAdminShopByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/shops`, payload);
  return data;
};
export const updateShopByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/shops/${currentSlug}`, payload);
  return data;
};
export const deleteShop = async (slug) => {
  const { data: response } = await http.delete(`/admin/shops/${slug}`);
  return response;
};
export const getLowStockProductsByAdmin = async (page) => {
  const { data: response } = await http.get(`/admin/low-stock-products?page=${page}`);
  return response;
};
export const getShopsByAdmin = async (page, search) => {
  const { data: response } = await http.get(`/admin/shops?search=${search}&page=${page}`);
  return response;
};
export const getShopIncomeByAdmin = async (slug, page) => {
  const { data } = await http.get(`/admin/shops/${slug}/income?page=${page || 1}`);

  return data;
};
export const getIncomeDetailsByAdmin = async (pid, page) => {
  const { data } = await http.get(`/admin/payments/${pid}?page=${page || 1}`);
  return data;
};
export const editPaymentByAdmin = async ({ pid, ...payload }) => {
  const { data } = await http.put(`/admin/payments/${pid}`, { ...payload });
  return data;
};
export const createPaymentByAdmin = async ({ ...payload }) => {
  const { data } = await http.post(`/admin/payments`, { ...payload });
  return data;
};
export const getPayoutsByAdmin = async (params) => {
  const { data } = await http.get(`/admin/payouts?${params}`);
  return data;
};
export const getAllShopsByAdmin = async () => {
  const { data } = await http.get(`/admin/all-shops`);
  return data;
};
export const getCurrenciesByAdmin = async (page, search) => {
  const { data } = await http.get(`/admin/currencies?page=${page || 1}&search=${search || ''}`);
  return data;
};
export const getAttributesByAdmin = async (page, search) => {
  const { data } = await http.get(`/admin/attributes?search=${search}&page=${page}`);
  return data;
};
export const getAttributeByAdmin = async (id) => {
  const { data } = await http.get(`/admin/attributes/${id}`);
  return data;
};
export const getAllAttributesByAdmin = async () => {
  const { data } = await http.get(`/admin/all-attributes`);
  return data;
};
export const addAttributeByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/attributes`, payload);
  return data;
};
export const updateAttributeByAdmin = async ({ currentId, ...payload }) => {
  const { data } = await http.put(`/admin/attributes/${currentId}`, payload);
  return data;
};
export const deleteAttributeByAdmin = async (id) => {
  const { data } = await http.delete(`/admin/attributes/${id}`);
  return data;
};


export const addCurrencyByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/currencies`, payload);
  return data;
};
export const deleteCurrencyByAdmin = async (id) => {
  const { data } = await http.delete(`/admin/currencies/${id}`);
  return data;
};
export const updateCurrencyByAdmin = async ({ _id, ...others }) => {
  const { data } = await http.put(`/admin/currencies/${_id}`, others);
  return data;
};
export const getCurrencyByAdmin = async (cid) => {
  const { data } = await http.get(`/admin/currencies/${cid}`);
  return data;
};

// admin setting
export const getBrandingSettingsByAdmin = async () => {
  const { data } = await http.get(`/admin/settings/branding`);
  return data;
};
export const updateGeneralSettingsByAdmin = async (payload) => {
  const { data } = await http.put(`/admin/settings/general/${payload._id}`, payload);
  return data;
};
export const updateHomeSettingsByAdmin = async (payload) => {
  const { data } = await http.put(`/admin/settings/home/${payload._id}`, payload);
  return data;
};

export const updateBrandingSettingsByAdmin = async (payload) => {
  const { data } = await http.put(`/admin/settings/branding/${payload._id}`, payload);
  return data;
};

export const getMainSettingsByAdmin = async () => {
  const { data } = await http.get(`/admin/settings/main`);
  return data;
};

export const getGeneralSettingsByAdmin = async () => {
  const { data } = await http.get(`/admin/settings/general`);
  return data;
};

export const getHomeSettingsByAdmin = async () => {
  const { data } = await http.get(`/admin/settings/home`);
  return data;
};
export const updateMainSettingsByAdmin = async (payload) => {
  const { data } = await http.put(`/admin/settings/main/${payload._id}`, payload);
  return data;
};

   */