import { Product } from "@/types/product";
import http from "./http";
import { PostReview } from "@/types/appTypes";

//get User Product
export const getUserProducts = async (params: any) => {
  // Pass the params object to axios/http
  const { data } = await http.get("/products", { params });
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

export const clearUserCart = async () => {
  const { data } = await http.get("/cart/clear");
  return data;
};

// Users Orders

export const getUserOrder = async (params = { page: 1, limit: 10 }) => {
  const { data } = await http.get(
    `/user/orders?page=${params.page}&limit=${params.limit}`,
  );
  return data;
};

export const getUserOrderId = async (id: string) => {
  const { data } = await http.get(`/orders/${id}`);
  return data;
};
export const postUserOrder = async (payload: any) => {
  const { data } = await http.post("/orders", payload);
  console.log(data, "data");

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

export const getAllDelivery = async () => {
  const { data } = await http.get("/delivery/all");
  return data;
};

export const updateDelivery = async (id: string, payload: any) => {
  const { data } = await http.put(`/delivery/${id}`, payload);
  return data;
};

export const postDelivery = async (payload: any) => {
  const { data } = await http.post(`/delivery/create`, payload);
  return data;
};

export const deleteDelivery = async (id: string) => {
  const { data } = await http.delete(`/delivery/${id}`);
  return data;
};

export const getUserReviews = async (id: string) => {
  const { data } = await http.get(`/reviews/${id}`);
  return data;
};

export const postUserReviews = async (payload: PostReview) => {
  const { data } = await http.post(`/reviews`, payload);
  return data;
};

//post ticket

export const postTicket = async (payload: any) => {
  const { data } = await http.post("/user/createTicket", payload);

  return data;
};

export const getTicket = async (id: string) => {
  const { data } = await http.get(`/user/ticket/${id}`);
  console.log(data, "ticket");
  return data;
};

export const getCourier = async (weight: number) => {
  const { data } = await http.get(`/delivery/carrier/${weight}`);
  return data;
};
