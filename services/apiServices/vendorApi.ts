/* 
export const getVendorProductBySlug = async (slug) => {
    const { data } = await http.get(`/vendor/products/${slug}`);
    return data;
  };
  export const getVendorShop = async () => {
    const { data } = await http.get(`/vendor/shop`);
    return data;
  };
  export const vendorDashboardAnalytics = async () => {
    const { data } = await http.get(`/vendor/dashboard-analytics`);
    return data;
  };
  export const getVendorLowStockProducts = async (page) => {
    const { data: response } = await http.get(`/vendor/low-stock-products?page=${page}`);
    return response;
  };
  
  export const getProductsByVendor = async (params) => {
    const { data: response } = await http.get(`/vendor/products?${params}`);
    return response; 
  };
  
  export const deleteVendorProduct = async (slug) => {
    const { data: response } = await http.delete(`/vendor/products/${slug}`);
    return response;
  };
  export const createVendorProduct = async (payload) => {
    const { data: response } = await http.post(`/vendor/products`, payload);
    return response;
  };
  export const updateVendorProduct = async ({ currentSlug, ...payload }) => {
    const { data: response } = await http.put(`/vendor/products/${currentSlug}`, payload);
    return response;
  };
  export const getOrdersByVendor = async (payload) => {
    const { data } = await http.get(`/vendor/orders?${payload}`);
    return data;
  };
  export const getOrderByVendor = async (id) => {
    const { data } = await http.get(`/vendor/orders/${id}`);
    return data;
  };
  export const addShopByVendor = async (payload) => {
    const { data } = await http.post(`/vendor/shops`, payload);
    return data;
  };
  export const updateShopByVendor = async ({ currentSlug, ...payload }) => {
    const { data } = await http.put(`/vendor/shops/${currentSlug}`, payload);
    return data;
  };
  export const getShopDetailsByVendor = async () => {
    const { data } = await http.get(`/vendor/shop/stats`);
    return data;
  };
  export const getIncomeByVendor = async (slug, page) => {
    const { data } = await http.get(`/vendor/shops/income?page=${page || 1}`);
    return data;
  };

  export const updateOrderStatusByVendor = async ({ _id, ...payload }) => {
  const { data } = await http.put(`/vendor/orders/${_id}`, payload);
  return data;
};

   */