import {
  createAdminCurrency,
  getAdminCurrency,
  getAdminCurrencyById,
  getAdminDashboardAnalytics,
  getAdminSettings,
  getAdminUser,
  getAllCategories,
} from "@/services/apiServices/adminDashboardApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { boolean } from "yup";

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
export const useAdminUsers = () => {
  const {
    isLoading,
    data: useradminData,
    error,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: getAdminUser,
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
