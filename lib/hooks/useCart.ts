// lib/hooks/useCart.ts or hooks/useCart.ts
import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  addCart as addCartAction,
  decreaseQuantity,
  deleteCart,
  increaseQuantity,
} from "@/redux/slices/product";
import { Product } from "@/types/product";
import {
  useAddToCart as useAddToCartAPI,
  useRemoveFromCart as useRemoveFromCartAPI,
} from "@/lib/hooks/userDashboard/useUser";
import { CartItem } from "@/types/cart";

export function useCart(product?: Product) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.product.checkout.cart);

  //console.log(cartItems, "cart items in useCart");
  const {
    mutate: addToCartAPI,
    isPending: isAdding,
    variables: addingVariables,
  } = useAddToCartAPI();
  const {
    mutate: removeFromCartAPI,
    isPending: isRemoving,
    variables: removingVariables,
  } = useRemoveFromCartAPI();
  // Extract productId to avoid optional chaining in dependency array
  const productId = product?._id;

  //Loading state for Adding and removing
  const isAddingThisProduct =
    isAdding && addingVariables?.pid?._id === productId;

  const isRemovingThisProduct =
    isRemoving && removingVariables?.pid?._id === productId;

  const isLoading = isAddingThisProduct || isRemovingThisProduct;

  // Check if a specific product is in cart

  const isInCart = useMemo(() => {
    if (!productId || !cartItems || !Array.isArray(cartItems)) return false;

    return cartItems.some((item: any) => {
      if (typeof item.pid === "string") return item.pid === productId;
      if (typeof item.pid === "object" && item.pid !== null)
        return item.pid._id === productId;
      return item._id === productId;
    });
  }, [cartItems, productId]);

  // const isInCart = useMemo(() => {
  //   if (!productId || !cartItems || !Array.isArray(cartItems)) {
  //     return false;
  //   }
  //   return cartItems.some((item: CartItem) => item.pid === productId);
  // }, [cartItems, productId]);

  // const isInCart = useMemo(() => {
  //   if (!productId || !cartItems || !Array.isArray(cartItems)) {
  //     return false;
  //   }
  //   return cartItems.some(
  //     (item: any) =>
  //       item._id === productId || // direct product in cart
  //       item.pid === productId || // cart item with pid reference
  //       item.pid?._id === productId, // cart item with populated pid
  //   );
  // }, [cartItems, productId]);

  // Get cart item count
  const cartCount = useMemo(() => {
    return cartItems?.length || 0;
  }, [cartItems]);

  // Get total cart value
  const cartTotal = useMemo(() => {
    if (!cartItems || !Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item: CartItem) => {
      return total + (item.salePrice || item.price) * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  // Add to cart (syncs with both Redux and backend)
  const addToCart = useCallback(
    (productToAdd: Product, quantity: number = 1) => {
      // Update Redux store
      dispatch(addCartAction({ product: productToAdd, quantity }));

      // Sync with backend
      addToCartAPI({ pid: productToAdd, quantity });
    },
    [dispatch, addToCartAPI],
  );

  // Remove from cart (syncs with both Redux and backend)
  const removeFromCart = useCallback(
    (productToRemove: Product) => {
      // Update Redux store
      dispatch(deleteCart(productToRemove._id));

      // Sync with backend
      removeFromCartAPI({ pid: productToRemove });
    },
    [dispatch, removeFromCartAPI],
  );

  // Toggle cart (add if not in cart, remove if in cart)
  const toggleCart = useCallback(
    (productToToggle: Product, quantity: number = 1) => {
      const inCart = cartItems?.some(
        (item: CartItem) => item.pid === productToToggle._id,
      );

      if (inCart) {
        removeFromCart(productToToggle);
      } else {
        addToCart(productToToggle, quantity);
      }
    },
    [cartItems, addToCart, removeFromCart],
  );

  // Update quantity
  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      const currentItem = cartItems?.find(
        (item: CartItem) => item.pid === productId,
      );
      //console.log(productId, cartItems, newQuantity, "item pid");
      if (!currentItem) return;

      if (newQuantity < 1) {
        // Remove item if quantity is 0
        const product = currentItem;
        dispatch(deleteCart(productId));
        removeFromCartAPI({ pid: product });
        return;
      }

      // Calculate difference
      const currentQuantity =
        currentItem.quantity || currentItem.stockQuantity || 1;

      const diff = newQuantity - currentQuantity;

      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          dispatch(increaseQuantity(productId));
        }
      } else if (diff < 0) {
        for (let i = 0; i < Math.abs(diff); i++) {
          dispatch(decreaseQuantity(productId));
        }
      }

      // Sync with backend if you have an update endpoint
      // updateQuantityAPI({ productId, quantity: newQuantity });
    },
    [cartItems, dispatch, removeFromCartAPI],
  );

  //is product in cart with a paramenter

  const isProductInCart = useCallback(
    (productId: string) => {
      if (!productId || !cartItems || !Array.isArray(cartItems)) return false;

      return cartItems.some((item: any) => {
        if (typeof item.pid === "string") return item.pid === productId;
        if (typeof item.pid === "object" && item.pid !== null)
          return item.pid._id === productId;
        return item._id === productId;
      });
    },
    [cartItems],
  );
  return {
    // State
    cartItems,
    isInCart,
    cartCount,
    cartTotal,
    isProductInCart,

    // Loading states
    isAdding: isAddingThisProduct,
    isRemoving: isRemovingThisProduct,
    isLoading,

    // Actions
    addToCart,
    removeFromCart,
    toggleCart,
    updateQuantity,
  };
}
