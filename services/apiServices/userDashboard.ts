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
  console.log(data, "data");
  return data;
};

export const getUserWishlist = async () => {
  const { data } = await http.get("/wishlist");
  return data;
};
