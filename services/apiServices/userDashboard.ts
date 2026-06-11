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
import { AxiosError } from "axios";

export const postUserOrder = async (payload: any) => {
  try {
    const { data } = await http.post("/orders", payload);
    // console.log(data, "data");
    return data;
  } catch (error) {
    const err = error as AxiosError;

    if (err.response) {
      // Server responded with a status other than 2xx
      console.error("Response error:", err.response.data);
      throw err.response.data;
    } else if (err.request) {
      // Request was made but no response received
      console.error("No response:", err.request);
      throw new Error("No response from server");
    } else {
      // Something else happened
      console.error("Error:", err.message);
      throw new Error(err.message);
    }
  }
};

export const getSlider = async () => {
  const { data } = await http.get("/settings/slider");
  return data;
};

import axios from "axios";

export const createImageSlider = async (payload: any) => {
  // console.log(payload, "payload");
  try {
    const { data } = await http.post(`/settings/slider/create`, payload);

    return data;
  } catch (error) {
    // Check if the error was thrown by Axios
    if (axios.isAxiosError(error)) {
      // The server responded with a status code outside the 2xx range
      const serverMessage =
        error.response?.data?.message || error.response?.data?.error;
      const errorMessage =
        serverMessage || `Server responded with status ${error}`;

      console.error("Axios API Error:", errorMessage);
      throw new Error(errorMessage);
    }

    // Handle generic/network connection errors
    console.error("Unexpected Error:", error);
    throw new Error("A network error occurred. Please try again.");
  }
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
  try {
    const { data } = await http.get(`/delivery/carrier/${weight}`);
    return data;
  } catch (error) {
    // 1. Check if the error came from the server response (Axios Error)
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data || error.response?.data?.error;
      const errorMessage =
        serverMessage || `Courier fetch failed with status: ${error}`;

      console.error("API Error (Courier):", errorMessage);
      throw new Error(errorMessage); // React Query will catch this throw
    }

    // 2. Handle unexpected runtime or browser/network errors
    console.error("Unexpected Error (Courier):", error);
    throw new Error("A network connectivity error occurred. Please try again.");
  }
};
