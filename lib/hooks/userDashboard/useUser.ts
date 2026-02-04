import { setCategories } from "@/redux/slices/categories";
import { resetCart } from "@/redux/slices/product";
import { setLogoutAction } from "@/redux/slices/user";
import { resetWishlistAction } from "@/redux/slices/wishlist";
import { useAppDispatch } from "@/redux/store";
import { signOut } from "@/services/apiServices/authApi";
import {
  getUserProducts,
  getUserProductsBySlug,
  getUserWishlist,
  PostUserWishlist,
} from "@/services/apiServices/userDashboard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { error } from "console";
import { useRouter } from "next/navigation";

export const useUserProducts = () => {
  const {
    isLoading,
    data: userProducts,
    error,
  } = useQuery({
    queryKey: ["user-products"],
    queryFn: getUserProducts,
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
    mutationKey: ["user-wishlist"],

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
      dispatch(setCategories([])); // Clear categories on logout
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
