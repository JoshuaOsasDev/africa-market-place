import { changePasswordType, userInfoType } from "@/types/appTypes";
import http from "./http";


export const changeUserPasswordApi = async (payload:changePasswordType) => {
  const { data } = await http.put(`/users/change-password`, payload);
  return data;
};
export const getNotifications = async (page: string) => {
    const { data } = await http.get(`/admin/notifications?limit=${page}`, {});
    return data;
};

export const updateProfileApi = async (payload: userInfoType) => {
  const { data } = await http.put(`/users/profile`, payload);
  return data;
};
/*  
export const updateOrderStatus = async ({ id, ...payload }) => {
    const { data } = await http.put(`/admin/orders/${id}`, payload);
    return data;
  };
  export const createCourierInfo = async (payload) => {
    const { data } = await http.post(`/vendor/courier-info`, payload);
    return data;
  };
  export const updateCourierInfo = async ({ _id, ...payload }) => {
    const { data } = await http.put(`/vendor/courier-info/${_id}`, payload);
  
    return data;
  };


export const getProducts = async (query = '') => {
    const { data } = await http.get(`/products${query}`);
    return data;
  };
  export const getProductDetails = async (pid) => {
    const { data } = await http.get(`/products/${pid}`);
    return data;
  };
  
  export const getProductSlugs = async () => {
    const { data } = await http.get(`/products-slugs`);
    return data;
  };
  
  export const getAllProducts = async () => {
    const { data } = await http.get(`/products/all`);
    return data;
  };
  export const getAllFilters = async () => {
    const { data } = await http.get(`/products/filters`);
    return data;
  };
  
  export const getNewProducts = async () => {
    const { data } = await http.get(`/products/new`);
    return data;
  };
  export const getFiltersByShop = async (shop) => {
    const { data } = await http.get(`/filters/${shop}`);
    return data;
  };
  
  export const getNewArrivels = async () => {
    const { data } = await http.get('/new-arrivals');
    return data;
  };
  export const getRelatedProducts = async (pid) => {
    const { data } = await http.get(`/related-products/${pid}`);
    return data;
  };
  export const getProductBySlug = async (slug) => {
    const { data } = await http.get(`/products/${slug}`);
    return data;
  };
  
  export const getProductReviews = async (pid) => {
    const { data } = await http.get(`/reviews/${pid}`);
    return data;
  };
  export const addReview = async (payload) => {
    const { data } = await http.post(`/reviews`, payload);
    return data;
  };
  
  export const getUserInvoice = async (page) => {
    const { data: response } = await http.get(`/users/invoice${page}`);
    return response;
  };
  
 
  
  
  
  export const getAddress = async (payload) => {
    const { data } = await http.get(`/users/addresses?id=${payload}`);
    return data;
  };
  export const updateAddress = async ({ _id, ...payload }) => {
    const { data } = await http.put(`/users/addresses/${_id}`, payload);
    return data;
  };
  export const createAddress = async ({ ...payload }) => {
    const { data } = await http.post(`/users/addresses/`, payload);
    return data;
  };
  export const deleteAddress = async ({ _id }) => {
    const { data } = await http.delete(`/users/addresses/${_id}`);
    return data;
  };
  export const search = async (payload) => {
    const { data } = await http.post(`/search`, payload);
    return data;
  };
  export const getSearchFilters = async () => {
    const { data } = await http.get(`/search-filters`);
    return data;
  };
  export const getInvoices = async () => {
    const { data } = await http.get(`/users/invoice`);
    return data;
  };
  export const placeOrder = async (payload) => {
    const { data } = await http.post(`/orders`, payload);
    return data;
  };
  export const getLayout = async () => {
    const { data } = await http.get(`/layout`);
    return data;
  };
  export const singleDeleteFile = async (id) => {
    const { data } = await http.delete(`/delete-file/${id}`);
    return data;
  };
  
  export const sendNewsletter = async (payload) => {
    const { data } = await http.post(`/newsletter`, payload);
    return data;
  };
  
  export const getWishlist = async () => {
    const { data } = await http.get(`/wishlist`);
    return data;
  };
  export const updateWishlist = async (pid) => {
    const { data } = await http.post(`/wishlist`, { pid });
    return data;
  };
  export const getCompareProducts = async (products) => {
    const { data } = await http.post(`/compare/products`, { products });
    return data;
  };
  
  export const getProfile = async () => {
    const { data } = await http.get(`/users/profile`);
    return data;
  };
  
  export const getAllCategories = async () => {
    const { data } = await http.get(`/all-categories`);
    return data;
  };
  
  export const getHomeShops = async () => {
    const { data } = await http.get(`/shops?limit=5`);
    return data;
  };
  export const getBrands = async (page) => {
    const { data } = await http.get(`/brands?page=${page || 1}`);
    return data;
  };
  export const applyCouponCode = async (code) => {
    const { data: response } = await http.get(`/coupon-codes/${code}`);
    return response;
  };
  
  export const paymentIntents = async (amount, currency) => {
    const { data } = await http.post(`/payment-intents`, {
      amount,
      currency
    });
    return data;
  };
  
  export const addShopByUser = async (payload) => {
    const { data } = await http.post(`/shops`, {
      ...payload
    });
  
    return data;
  };
  export const getShopByUser = async () => {
    const { data } = await http.get(`/user/shop`);
    return data;
  };
  
  export const getShops = async () => {
    const { data } = await http.get(`/shops`);
    return data;
  };
  
  export const getAllCategoriesByUser = async () => {
    const { data } = await http.get(`/all-categories`);
    return data;
  };
  
  export const getCurrencies = async () => {
    const { data } = await http.get(`/currencies`);
    return data;
  };
  export const getCategoryTitle = async (category) => {
    const { data } = await http.get(`/category-title/${category}`);
    return data;
  };
  
  export const getCategoryBySlug = async (category) => {
    const { data } = await http.get(`/categories/${category}`);
    return data;
  };
  
  export const getCategorySlugs = async () => {
    const { data } = await http.get(`/categories-slugs`);
    return data;
  };
  export const getShopSlugs = async () => {
    const { data } = await http.get('/shops-slugs');
    return data;
  };
  export const getShopBySlug = async (shop) => {
    const { data } = await http.get(`/shops/${shop}`);
    return data;
  };
  export const getShopTitle = async (shop) => {
    const { data } = await http.get(`/shop-title/${shop}`);
    return data;
  };
  
  export const getSubCategoryTitle = async (subcategory) => {
    const { data } = await http.get(`/sub-category-title/${subcategory}`);
    return data;
  };
  export const getSubCategoryBySlug = async (subCategory) => {
    const { data } = await http.get(`/sub-categories/${subCategory}`);
    return data;
  };
  
  export const getSubCategorySlugs = async () => {
    const { data } = await http.get(`/sub-categories-slugs`);
    return data;
  };
  
  export const getChildCategoryBySlug = async (childCategory) => {
    const { data } = await http.get('/child-categories/' + childCategory);
    return data;
  };
  


  export const updateProfile = async ({ ...payload }) => {
    const { data } = await http.put(`/users/profile`, payload);
    return data;
  };
  export const changePassword = async ({ ...payload }) => {
    const { data } = await http.put(`/users/change-password`, payload);
    return data;
  };
  
  export const getAddress = async (payload) => {
    const { data } = await http.get(`/users/addresses?id=${payload}`);
    return data;
  };
  export const updateAddress = async ({ _id, ...payload }) => {
    const { data } = await http.put(`/users/addresses/${_id}`, payload);
    return data;
  };
  export const createAddress = async ({ ...payload }) => {
    const { data } = await http.post(`/users/addresses/`, payload);
    return data;
  };
  export const deleteAddress = async ({ _id }) => {
    const { data } = await http.delete(`/users/addresses/${_id}`);
    return data;
  };
  export const search = async (payload) => {
    const { data } = await http.post(`/search`, payload);
    return data;
  };
  export const getSearchFilters = async () => {
    const { data } = await http.get(`/search-filters`);
    return data;
  };
  export const getInvoices = async () => {
    const { data } = await http.get(`/users/invoice`);
    return data;
  };
  export const placeOrder = async (payload) => {
    const { data } = await http.post(`/orders`, payload);
    return data;
  };
  export const getLayout = async () => {
    const { data } = await http.get(`/layout`);
    return data;
  };
  export const singleDeleteFile = async (id) => {
    const { data } = await http.delete(`/delete-file/${id}`);
    return data;
  };
  
  export const sendNewsletter = async (payload) => {
    const { data } = await http.post(`/newsletter`, payload);
    return data;
  };
  
  export const getWishlist = async () => {
    const { data } = await http.get(`/wishlist`);
    return data;
  };
  export const updateWishlist = async (pid) => {
    const { data } = await http.post(`/wishlist`, { pid });
    return data;
  };
  export const getCompareProducts = async (products) => {
    const { data } = await http.post(`/compare/products`, { products });
    return data;
  };
  
  export const getProfile = async () => {
    const { data } = await http.get(`/users/profile`);
    return data;
  };
  
  export const getAllCategories = async () => {
    const { data } = await http.get(`/all-categories`);
    return data;
  };
  
  export const getHomeShops = async () => {
    const { data } = await http.get(`/shops?limit=5`);
    return data;
  };
  export const getBrands = async (page) => {
    const { data } = await http.get(`/brands?page=${page || 1}`);
    return data;
  };
  export const applyCouponCode = async (code) => {
    const { data: response } = await http.get(`/coupon-codes/${code}`);
    return response;
  };
  
  export const paymentIntents = async (amount, currency) => {
    const { data } = await http.post(`/payment-intents`, {
      amount,
      currency
    });
    return data;
  };
  
  export const addShopByUser = async (payload) => {
    const { data } = await http.post(`/shops`, {
      ...payload
    });
  
    return data;
  };
  export const getShopByUser = async () => {
    const { data } = await http.get(`/user/shop`);
    return data;
  };
  
  export const getShops = async () => {
    const { data } = await http.get(`/shops`);
    return data;
  };
  
  export const getAllCategoriesByUser = async () => {
    const { data } = await http.get(`/all-categories`);
    return data;
  };
  
  export const getCurrencies = async () => {
    const { data } = await http.get(`/currencies`);
    return data;
  };
  export const getCategoryTitle = async (category) => {
    const { data } = await http.get(`/category-title/${category}`);
    return data;
  };
  
  export const getCategoryBySlug = async (category) => {
    const { data } = await http.get(`/categories/${category}`);
    return data;
  };
  
  export const getCategorySlugs = async () => {
    const { data } = await http.get(`/categories-slugs`);
    return data;
  };
  export const getShopSlugs = async () => {
    const { data } = await http.get('/shops-slugs');
    return data;
  };
  export const getShopBySlug = async (shop) => {
    const { data } = await http.get(`/shops/${shop}`);
    return data;
  };
  export const getShopTitle = async (shop) => {
    const { data } = await http.get(`/shop-title/${shop}`);
    return data;
  };
  
  export const getSubCategoryTitle = async (subcategory) => {
    const { data } = await http.get(`/sub-category-title/${subcategory}`);
    return data;
  };
  export const getSubCategoryBySlug = async (subCategory) => {
    const { data } = await http.get(`/sub-categories/${subCategory}`);
    return data;
  };
  
  export const getSubCategorySlugs = async () => {
    const { data } = await http.get(`/sub-categories-slugs`);
    return data;
  };
  
  export const getChildCategoryBySlug = async (childCategory) => {
    const { data } = await http.get('/child-categories/' + childCategory);
    return data;
  };
  
  // export const contactUs = async (payload) => {
  //   const { data } = await http.post(`/contact-us`, payload);
  //   return data;
  // };
  
  // attributes
  // settings
  
  export const getSettingsByUser = async () => {
    const { data } = await http.get(`/settings/general-settings`);
    return data;
  };
  
  
  export const uploadFile = async (formData, config, cloudName) => {
    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, config);
    return data;
  };
  
  

export const getNewsletter = async (page) => {
    const { data } = await http.get(`/admin/newsletter?page=${page}`);
    return data;
  };
  
  export const getProducts = async (query = '') => {
    const { data } = await http.get(`/products${query}`);
    return data;
  };
  export const getProductDetails = async (pid) => {
    const { data } = await http.get(`/products/${pid}`);
    return data;
  };
  
  export const getProductSlugs = async () => {
    const { data } = await http.get(`/products-slugs`);
    return data;
  };
  
  export const getAllProducts = async () => {
    const { data } = await http.get(`/products/all`);
    return data;
  };
  export const getAllFilters = async () => {
    const { data } = await http.get(`/products/filters`);
    return data;
  };
  
  export const getNewProducts = async () => {
    const { data } = await http.get(`/products/new`);
    return data;
  };
  export const getFiltersByShop = async (shop) => {
    const { data } = await http.get(`/filters/${shop}`);
    return data;
  };
  
  export const getNewArrivels = async () => {
    const { data } = await http.get('/new-arrivals');
    return data;
  };
  export const getRelatedProducts = async (pid) => {
    const { data } = await http.get(`/related-products/${pid}`);
    return data;
  };
  export const getProductBySlug = async (slug) => {
    const { data } = await http.get(`/products/${slug}`);
    return data;
  };
  
  export const getProductReviews = async (pid) => {
    const { data } = await http.get(`/reviews/${pid}`);
    return data;
  };
  export const addReview = async (payload) => {
    const { data } = await http.post(`/reviews`, payload);
    return data;
  };
  
  export const getUserInvoice = async (page) => {
    const { data: response } = await http.get(`/users/invoice${page}`);
    return response;
  };

  */