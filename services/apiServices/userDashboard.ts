import { Product } from "@/types/product";
import http from "./http";

//get User Product
export const getUserProducts = async () => {
  const { data } = await http.get("/products");
  return data;
};

export const getUserProductsBySlug = async (slug: string) => {
  const { data } = await http.get(`/products/${slug}`);
  return data;
};

//get Wishlist

export const PostUserWishlist = async (list: string) => {
  const { data } = await http.post("/wishlist", { pid: list });
  //console.log(data, "data");
  return data;
};

export const getUserWishlist = async () => {
  const { data } = await http.get("/wishlist");
  return data;
};

export const getUserCart = async () => {
  const { data } = await http.get("/cart");
  return data;
};

export const addToCart = async ({
  pid,
  quantity,
}: {
  pid: Product;
  quantity: number;
}) => {
  const { data } = await http.post("/cart/add", {
    pid: pid._id,
    quantity: quantity,
  });

  return data;
};

export const removeFromCart = async (pid: Product) => {
  const { data } = await http.post("/cart/remove", {
    pid: pid._id ?? pid.pid,
  });
  return data;
};

// Users Orders

export const getUserOrder = async () => {
  const { data } = await http.get("/user/orders");
  return data;
};

export const postUserOrder = async (payload: any) => {
  const { data } = await http.post("/orders", payload);
  //console.log(data, "data");
  return data;
};

export const getSlider = async () => {
  const { data } = await http.get("/settings/slider");
  return data;
};

export const createImageSlider = async (payload: any) => {
  const { data } = await http.post(`/settings/slider/create`, payload);

  return data;
};
