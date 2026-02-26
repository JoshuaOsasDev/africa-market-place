import { Product } from "@/types/product";
import http from "./http";
import { CreateShopPayload, Shop, ShopFormInput } from "@/types/shop";

export const getVendorDashboardAnalytics = async () => {
  const { data } = await http.get(`/vendor/dashboard-analytics`);
  return data;
};

export const getVendorProducts = async () => {
  const [products, shop] = await Promise.all([
    http.get("/vendor/products"),
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
export const getVendorOrders = async () => {
  const { data } = await http.get(`/vendor/orders`);
  return data;
};

export const getvendorOrderSlug = async (slug: string) => {
  const { data } = await http.get(`/vendor/orders/${slug}`);
  // console.log(data, "order slug");
  return data;
};

export const createVendorShop = async (FormData: CreateShopPayload) => {
  const { data } = await http.post(`/vendor/shops`, FormData);
  // console.log(data, "order slug");
  return data;
};

//Vendor Shop
export const getVendorShop = async () => {
  const { data } = await http.get(`/vendor/shop`);
  return data;
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
