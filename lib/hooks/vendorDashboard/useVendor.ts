// Hook to fetch vendor dashboard analytics
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createVendorProduct,
  createVendorShop,
  deleteVendorProduct,
  getVendorDashboardAnalytics,
  getVendorOrders,
  getvendorOrderSlug,
  getVendorPayment,
  getVendorProductById,
  getVendorProducts,
  getVendorShop,
  updateVendorProduct,
} from "@/services/apiServices/vendorDashboard";
import { Product } from "@/types/product";
import toast from "react-hot-toast";
import { CreateShopPayload } from "@/types/shop";
import { number } from "yup";
import { useRouter } from "next/navigation";
import { param } from "framer-motion/client";
export const useVendorDashboardAnalytics = () => {
  const {
    isLoading,
    data: dashboardVendorAnalytics,
    error,
  } = useQuery({
    queryKey: ["vendor-dashboard-analytics"],
    queryFn: getVendorDashboardAnalytics,
  });

  return { isLoading, dashboardVendorAnalytics, error };
};

// Hook to fetch vendor products
export const useVendorProducts = (params = { page: 1, limit: 10 }) => {
  const {
    isLoading,
    data: vendorProducts,
    error: vendorProductsError,
  } = useQuery({
    queryKey: ["vendor-products", params],
    queryFn: () => getVendorProducts(params),
  });

  return { isLoading, vendorProducts, vendorProductsError };
};

// Hook to fetch vendor order by ID (example, not used in current code)
export const useVendorProductById = (productId: string | undefined) => {
  const {
    data: vendorProductById,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vendor-product", productId],
    queryFn: () => getVendorProductById(productId),
  });
  return { vendorProductById, isLoading, error };
};

export const useVendorUpdateProduct = (slug: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ["update-vendor-product", slug],
    mutationFn: (updatedProduct: Product) =>
      updateVendorProduct({ slug, updatedProduct }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor-product", slug],
      });
      queryClient.invalidateQueries({
        queryKey: ["vendor-products"],
      });

      toast.success("Prouct Updated Sucessfuly", {
        duration: 4000,
        icon: "✔",
        position: "top-center",
        style: {
          color: "#16a34a", // green
          fontWeight: "500",
        },
      });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update product";

      // Error toast
      toast.error(message, {
        duration: 4000,
        icon: "✗",
        position: "top-center",
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fecaca",
        },
      });
    },
  });

  return { mutate, isPending, error, isSuccess };
};

export const useVendorCreateProduct = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationKey: ["create-vendor-product"],
    mutationFn: (FormData: Product) => createVendorProduct(FormData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor-product"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vendor-products"],
      });

      toast.success("Prouct Updated Sucessfuly", {
        duration: 4000,
        icon: "✔",
        position: "top-center",
        style: {
          color: "#16a34a", // green
          fontWeight: "500",
        },
      });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update product";

      // Error toast
      toast.error(message, {
        duration: 4000,
        icon: "✗",
        position: "top-center",
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fecaca",
        },
      });
    },
  });

  return { mutate, isPending, error, isSuccess };
};

export const useDeleteVendorProduct = () => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: ["delete-vendor-product"],
    mutationFn: (slug: string) => deleteVendorProduct(slug),
  });
  return { mutate, isPending, error };
};

// Hook to fetch vendor orders

export const useVendorOrders = (params = { page: 1, limit: 10 }) => {
  const {
    isLoading,
    data: vendorOrders,
    error: vendorOrdersError,
  } = useQuery({
    queryKey: ["vendor-orders", params],
    queryFn: () => getVendorOrders(params),
  });
  return { isLoading, vendorOrders, vendorOrdersError };
};

export const useVEndorOrderSlug = (slug: string) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["vendor-order-slug"],
    queryFn: () => getvendorOrderSlug(slug),
  });

  return { data, isLoading, error };
};

//create Shop

export const useVendorCreateShop = () => {
  const route = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationKey: ["create-vendor-shop"],
    mutationFn: (FormData: CreateShopPayload) => createVendorShop(FormData),
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ["vendor-product"],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ["vendor-products"],
      // });

      route.push("/vendor/dashboard");

      toast.success("Shop Created Sucessfuly", {
        duration: 4000,
        icon: "✔",
        position: "top-center",
        style: {
          color: "#16a34a", // green
          fontWeight: "500",
        },
      });
    },

    // onError: (error: any) => {
    //   const message =
    //     error?.response?.data?.message ||
    //     error?.message ||
    //     "Failed to update product";

    //   // Error toast
    //   toast.error(message, {
    //     duration: 4000,
    //     icon: "✗",
    //     position: "top-center",
    //     style: {
    //       background: "#fee2e2",
    //       color: "#b91c1c",
    //       border: "1px solid #fecaca",
    //     },
    //   });
    // },
  });

  return { mutate, isPending, error, isSuccess };
};

//VEndor Shop

export const useVendorShop = () => {
  const {
    isLoading,
    data: vendorShop,
    error: vendorShopError,
  } = useQuery({
    queryKey: ["vendor-shop"],
    queryFn: getVendorShop,
  });
  return { isLoading, vendorShop, vendorShopError };
};

// export const useVendorSubCategory = (slug: string) => {
//   const {
//     data: vendorSubCategory,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["vendor-subcategoty", slug],
//     queryFn: () => getSubCategory(slug),
//   });
//   return { vendorSubCategory, error };
// };

export const useVendorPayment = (params = { page: 1, limit: 10 }) => {
  const {
    isLoading,
    data: vendorPayment,
    error: vendorPaymentError,
  } = useQuery({
    queryKey: ["vendor-payment", params],
    queryFn: () => getVendorPayment(params),
  });

  return { isLoading, vendorPayment, vendorPaymentError };
};
