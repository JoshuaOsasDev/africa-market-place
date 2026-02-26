import {
  approveAdminProduct,
  approveAdminShop,
  createAdminCurrency,
  getAdminCurrency,
  getAdminCurrencyById,
  getAdminDashboardAnalytics,
  getAdminProduct,
  getAdminSettings,
  getAdminShop,
  getAdminShops,
  getAdminUser,
  getAllCategories,
} from "@/services/apiServices/adminDashboardApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Hook to fetch admin settings
export const useAdminSettings = () => {
  const {
    isLoading,
    data: adminSettings,
    error,
  } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: getAdminSettings,
  });

  return { isLoading, adminSettings, error };
};

// Hook to fetch admin currency data
export const useAdminCurrency = () => {
  const {
    isLoading,
    data: adminCurrency,
    error,
  } = useQuery({
    queryKey: ["admin-currency"],
    queryFn: getAdminCurrency,
  });

  return { isLoading, adminCurrency, error };
};

export const useAdminCurrencyById = (currencyId: string) => {
  const {
    isLoading,
    data: currencyData,
    error,
  } = useQuery({
    queryKey: ["admin-currency-by-id", currencyId],
    queryFn: () => getAdminCurrencyById(currencyId),
    enabled: !!currencyId,
  });
  return { isLoading, currencyData, error };
};

export const useCreateAdminCurrency = () => {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: createCurrency,
    error,
  } = useMutation({
    mutationKey: ["create-admin-currency"],
    mutationFn: createAdminCurrency,
    onSuccess: () => {
      // Invalidate or refetch queries if needed
      queryClient.invalidateQueries({ queryKey: ["admin-currency"] });
    },
  });

  return { isPending, createCurrency, error };
};

//Hook to fetch admin users
export const useAdminUsers = (
  page: { page: number },
  limit: number,
  search: string,
  role: string,
) => {
  const {
    isLoading,
    data: useradminData,
    error,
  } = useQuery({
    queryKey: ["admin-users", page, limit, search, role],
    queryFn: () => getAdminUser(page, limit, search, role),
  });

  return { isLoading, useradminData, error };
};

// Hook to fetch admin dashboard analytics
export const useAdminDashboardAnalytics = () => {
  const {
    isLoading,
    data: adminDashboardAnalytics,
    error: adminDashboardAnalyticsError,
  } = useQuery({
    queryKey: ["admin-dashboard-analytics"],
    queryFn: getAdminDashboardAnalytics,
  });
  return { isLoading, adminDashboardAnalytics, adminDashboardAnalyticsError };
};

//Hook for all categories

export const useAllCategories = (enabledFire: boolean) => {
  const {
    isLoading,
    data: allCategories,
    error,
  } = useQuery({
    queryKey: ["get-all-categories"],
    enabled: enabledFire,
    queryFn: getAllCategories,
  });
  return { isLoading, allCategories, error };
};

//Hook to fecth admin product

export const useAdminProducts = (
  page: { page: number },
  limit: number,
  search: string,
  status: string,
) => {
  const {
    isLoading,
    data: adminProducts,
    error,
  } = useQuery({
    queryKey: ["admin-products", page, limit, search, status],
    queryFn: () => getAdminProduct(page, limit, search, status),
  });

  return { isLoading, adminProducts, error };
};

export const useAdminProductApproval = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate, error } = useMutation({
    mutationKey: ["admin-product-approval"],

    mutationFn: ({ slug, details }: { slug: string; details: string }) =>
      approveAdminProduct(slug, details),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["vendor-product"] });
      queryClient.invalidateQueries({ queryKey: ["user-products"] });

      toast.success("Prouct Updated Succesfully", {
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

  return { isPending, mutate, error };
};

export const useAdminShops = (
  page: { page: number },
  limit: number,
  search: string,
  status: string,
) => {
  const {
    isLoading,
    data: adminShops,
    error,
  } = useQuery({
    queryKey: ["admin-shops", page, limit, search, status],
    queryFn: () => getAdminShops(page, limit, search, status),
  });

  return { isLoading, adminShops, error };
};

export const useAdminShop = (slug: string) => {
  const {
    isLoading,
    data: adminShop,
    error,
  } = useQuery({
    queryKey: ["admin-shop"],
    queryFn: () => getAdminShop(slug),
  });

  return { isLoading, adminShop, error };
};

export const useAdminShopApproval = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate, error } = useMutation({
    mutationKey: ["admin-shop-approval"],

    mutationFn: ({ slug, details }: { slug: string; details: string }) =>
      approveAdminShop(slug, details),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-shops"] });
      queryClient.invalidateQueries({ queryKey: ["admin-shop"] });
      queryClient.invalidateQueries({ queryKey: ["vendor-product"] });
      queryClient.invalidateQueries({ queryKey: ["user-products"] });

      toast.success("Shop Updated Succesfully", {
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

  return { isPending, mutate, error };
};
