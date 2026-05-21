import axios from "axios";
import { Product } from "@/types/product";
import http from "./http";
import { CreateShopPayload, Shop, ShopFormInput } from "@/types/shop";
import { number } from "yup";

export const getVendorDashboardAnalytics = async () => {
  const { data } = await http.get(`/vendor/dashboard-analytics`);
  return data;
};

export const getVendorProducts = async (params = { page: 1, limit: 10 }) => {
  const [products, shop] = await Promise.all([
    http.get(`/vendor/products?page=${params.page}&limit=${params.limit}`),
    http.get("/vendor/shop"),
  ]);
  return {
    products: products.data,
    shop: shop.data,
  };
};

export const getVendorProductById = async (productId: string | undefined) => {
  const { data } = await http.get(`/vendor/products/${productId}`);
  return data;
};

// export const getSubCategory = async (slug: string) => {
//   const { data } = await http.get(`/admin/sub-categories/${slug}`);
// };

export const updateVendorProduct = async ({
  updatedProduct,
  slug,
}: {
  slug: string;
  updatedProduct: Product;
}) => {
  const { data } = await http.put(`/vendor/products/${slug}`, {
    ...updatedProduct,
    // category: {
    //   _id: updatedProduct.category._id,
    //   name: updatedProduct.category.name,
    // },
  });

  //console.log(data, "data");
  return data;
};

export const createVendorProduct = async (FormData: Product) => {
  const { data } = await http.post(`/vendor/products`, FormData);
  //console.log(data);
  return data;
};

export const deleteVendorProduct = async (slug: string) => {
  const { data } = await http.delete(`vendor/products/${slug}`);
  console.log(data);
  return data;
};

//VENDOR ORDER
export const getVendorOrders = async (params = { page: 1, limit: 10 }) => {
  const { data } = await http.get(
    `/vendor/orders?page=${params.page}&limit=${params.limit}`,
  );
  return data;
};

export const getvendorOrderSlug = async (slug: string) => {
  const { data } = await http.get(`/vendor/orders/${slug}`);
  // console.log(data, "order slug");
  return data;
};

export const createVendorShop = async (formData: CreateShopPayload) => {
  try {
    const { data } = await http.post(`/vendor/shops`, formData);
    return data;
  } catch (error: any) {
    // Axios error handling
    if (axios.isAxiosError(error)) {
      // Server responded with error (4xx, 5xx)
      if (error.response) {
        throw new Error(error.response.data?.message);
      }

      // Request made but no response (network issue)
      if (error.request) {
        throw new Error("Network error. Please check your connection.");
      }
    }

    // Unknown error
    throw new Error(error.message || "Unexpected error occurred");
  }
};

//Vendor Shop
export const getVendorShop = async () => {
  const { data } = await http.get(`/vendor/shop`);
  return data;
};

export const updateVendorShop = async (
  formData: CreateShopPayload,
  slug: string | undefined,
) => {
  try {
    const { data } = await http.put(`/vendor/shops/${slug}`, {
      ...formData,
      financialDetails: {
        paymentMethod: "paypal",
        paypal: {
          email: "joshuaebighosele@gmail.com",
        },
      },
    });
    return data;
  } catch (error: any) {
    // Axios error handling
    if (axios.isAxiosError(error)) {
      // Server responded with error (4xx, 5xx)
      if (error.response) {
        throw new Error(error.response.data?.message);
      }

      // Request made but no response (network issue)
      if (error.request) {
        throw new Error("Network error. Please check your connection.");
      }
    }

    // Unknown error
    throw new Error(error.message || "Unexpected error occurred");
  }
};

// lib/server/getVendorProductById.ts
export async function getVendorProductByIdServer(productId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/vendor/products/${productId}`,
    {
      cache: "no-store",
      credentials: "include",
    },
  );

  if (!res.ok) return null;

  //console.log(res, "metadat");
  return res.json();
}

//VENDOR PAYMENT

export const getVendorPayment = async (params = { page: 1, limit: 10 }) => {
  const { data } = await http.get(
    `/vendor/payments?page=${params.page}&limit=${params.limit}`,
  );
  return data;
};

//VENDOR CUSTORMERS
export const getVendorCustormersOrders = async (
  params = { page: 1, limit: 10 },
) => {
  const { data } = await http.get(
    `/vendor/shop/orders=${params.page}&limit=${params.limit}`,
  );
  return data;
};
