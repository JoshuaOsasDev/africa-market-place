// Hook to fetch vendor dashboard analytics
import { useQuery } from "@tanstack/react-query";
import {
  getVendorDashboardAnalytics,
  getVendorProducts,
} from "@/services/apiServices/vendorDashboard";
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
export const useVendorProducts = () => {
  const {
    isLoading,
    data: vendorProducts,
    error: vendorProductsError,
  } = useQuery({
    queryKey: ["vendor-products"],
    queryFn: getVendorProducts,
  });

  return { isLoading, vendorProducts, vendorProductsError };
};
