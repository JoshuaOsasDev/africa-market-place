import {
  addCart,
  deleteCart,
  resetCart,
  setCart,
} from "@/redux/slices/product";
import { setLogoutAction } from "@/redux/slices/user";
import { resetWishlistAction } from "@/redux/slices/wishlist";
import { useAppDispatch } from "@/redux/store";
import { signOut } from "@/services/apiServices/authApi";
import {
  addToCart,
  clearUserCart,
  createImageSlider,
  deleteDelivery,
  getAllDelivery,
  getSlider,
  getUserCart,
  getUserOrder,
  getUserProducts,
  getUserProductsBySlug,
  getUserWishlist,
  postDelivery,
  postUserOrder,
  PostUserWishlist,
  removeFromCart,
  updateDelivery,
} from "@/services/apiServices/userDashboard";
import { Product } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

export const useUserProducts = () => {
  const {
    isLoading,
    data: userProducts,
    error,
  } = useQuery({
    queryKey: ["user-products"],
    queryFn: getUserProducts,
    throwOnError: true,
  });

  return { isLoading, userProducts, error };
};

export const useUserProductsBySlug = (slug: string) => {
  const {
    isLoading,
    data: userProductsSlug,
    error,
  } = useQuery({
    queryKey: ["user-products-slug"],
    queryFn: () => getUserProductsBySlug(slug),
  });

  return { isLoading, userProductsSlug, error };
};

export const useUserWishlist = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate, error } = useMutation({
    mutationKey: ["post-user-wishlist"],

    mutationFn: (list: string) => PostUserWishlist(list),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-wishlist"] });
    },
  });

  return { isPending, mutate, error };
};

export const useGetUserWishlist = () => {
  const {
    isLoading,
    data: userWishlist,
    error,
  } = useQuery({
    queryKey: ["user-wishlist"],
    queryFn: getUserWishlist,
  });

  return { isLoading, userWishlist, error };
};

//signout hook
export const useSignOut = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,

    onSettled: () => {
      // 🔥 Clear ALL client auth state
      dispatch(setLogoutAction()); // Redux update → UI re-renders
      // dispatch(setCategories([])); // Clear categories on logout
      dispatch(resetCart()); // Clear cart on logout
      dispatch(resetWishlistAction()); // Clear wishlist on logout
      queryClient.clear(); // Clear cached user data
      router.replace("/auth-user/login");
    },

    onError: (error) => {
      console.warn("Sign out failed, forcing logout", error);
      router.replace("/auth-user/login");
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { mutate, isPending, error, isSuccess, variables } = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: ({ pid, quantity }: { pid: Product; quantity: number }) =>
      addToCart({ pid: pid, quantity: quantity }),

    onSuccess: (_, variables) => {
      const { pid, quantity } = variables;

      dispatch(
        addCart({
          product: pid,
          quantity: quantity,
        }),
      );
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Prouct Added to Cart", {
        duration: 4000,
        icon: "✔",
        position: "top-center",
        style: {
          color: "#16a34a", // green
          fontWeight: "500",
        },
      });
    },
  });
  return { mutate, isPending, error, isSuccess, variables };
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { mutate, isPending, error, isSuccess, variables } = useMutation({
    mutationKey: ["remove-from-cart"],
    mutationFn: ({ pid }: { pid: Product }) => removeFromCart(pid),

    onSuccess: (_, variables) => {
      const { pid } = variables;

      if (pid._id) dispatch(deleteCart(pid._id));
      if (pid.pid) dispatch(deleteCart(pid.pid));

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Prouct removed from Cart", {
        duration: 4000,
        icon: "✔",
        position: "top-center",
        style: {
          color: "#16a34a", // green
          fontWeight: "500",
        },
      });
    },
  });
  return { mutate, isPending, error, isSuccess, variables };
};

export const useGetCart = () => {
  const {
    isLoading,
    data: userCart,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getUserCart,
  });

  return { isLoading, userCart, error };
};

//User Order
export const useUserOder = () => {
  const {
    isLoading,
    data: userOders,
    error,
  } = useQuery({
    queryKey: ["user-oders"],
    queryFn: getUserOrder,
  });

  return { isLoading, userOders, error };
};

export const usePostOrder = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error, isSuccess, variables } = useMutation({
    mutationKey: ["add-order"],
    mutationFn: (data) => postUserOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-oders"],
      });

      toast.success("Prouct Added to Order", {
        duration: 4000,
        icon: "✔",
        position: "top-center",
        style: {
          color: "#16a34a", // green
          fontWeight: "500",
        },
      });
    },
  });
  return { mutate, isPending, error, isSuccess, variables };
};

export const useSlider = () => {
  const {
    isLoading,
    data: sliderImage,
    error,
  } = useQuery({
    queryKey: ["slider-image"],
    queryFn: getSlider,
    throwOnError: true,
  });

  return { isLoading, sliderImage, error };
};

export const useCreateSlider = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createImageSlider,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["slider-image"],
      });

      toast.success("Slider Image Added", {
        duration: 4000,
        icon: "✔",
        position: "top-center",
        style: {
          color: "#16a34a", // green
          fontWeight: "500",
        },
      });
    },
  });

  return { mutate, isPending };
};

export const useAllDelivery = () => {
  const {
    isLoading,
    data: deliveries,
    error,
  } = useQuery({
    queryKey: ["all-deliveries"],
    queryFn: getAllDelivery,
    throwOnError: true,
  });

  return { isLoading, deliveries, error };
};

export const useUpdateDelivery = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateDelivery(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-deliveries"],
      });

      toast.success("Delivery Details Updated", {
        duration: 4000,
        icon: "✔",
        position: "top-center",
        style: {
          color: "#16a34a", // green
          fontWeight: "500",
        },
      });
    },
  });

  return { mutate, isPending };
};

export const useCreateDelivery = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) => postDelivery(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-deliveries"],
      });

      toast.success("Delivery Details Posted", {
        duration: 4000,
        icon: "✔",
        position: "top-center",
        style: {
          color: "#16a34a", // green
          fontWeight: "500",
        },
      });
    },
  });

  return { mutate, isPending };
};

export const useDeleteDelivery = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteDelivery(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-deliveries"],
      });

      toast.success("Delivery Details Posted", {
        duration: 4000,
        icon: "✔",
        position: "top-center",
        style: {
          color: "#16a34a", // green
          fontWeight: "500",
        },
      });
    },
  });

  return { mutate, isPending };
};

export const useCreateOrder = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) => postUserOrder(payload),

    onSuccess: async (data) => {
      console.log(data, "onSuccess");
      const orderId = data.orderId;
      // 1. Clear cart on server
      await clearUserCart();

      // 2. Clear cart in Redux
      dispatch(resetCart());

      // 3. Invalidate both cart and order queries
      queryClient.invalidateQueries({ queryKey: ["order"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      toast.success("Order placed successfully!", {
        duration: 4000,
        icon: "✔",
        position: "top-center",
        style: { color: "#16a34a", fontWeight: "500" },
      });

      router.push(`/user/payment/${orderId}`);
    },
  });

  return { mutate, isPending };
};
