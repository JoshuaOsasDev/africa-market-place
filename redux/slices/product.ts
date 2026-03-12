import { sum, map, filter, uniqBy } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cart";

const initialState: any = {
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 5,
    shipping: 0,
    billing: null,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //Set cart to receive Api
    setCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(
        cart?.map(
          (product: any) =>
            (product.salePrice || product.price) * (product.quantity || 1),
        ),
      );

      state.checkout.cart = cart;
      state.checkout.subtotal = subtotal;
      state.checkout.total =
        subtotal -
        state.checkout.discount +
        (parseInt(state.checkout.shipping) || 0);
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload.cart;

      const subtotal = sum(
        cart.map(
          (product: any) =>
            (product.salePrice || product.price) * product.quantity,
        ),
      );
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : action.payload.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal + (parseInt(shipping) || 0);
    },

    // addCart(state, action) {
    //   const products = action.payload;

    //   const product = products.product;
    //   const value: number = products.quantity;

    //   const updatedProduct = {
    //     ...product,
    //   };
    //   const isEmptyCart = state.checkout.cart.length === 0;
    //   if (isEmptyCart) {
    //     state.checkout.cart = [...state.checkout.cart, updatedProduct];
    //   } else {
    //     state.checkout.cart = map(state.checkout.cart, (_product) => {
    //       const isExisted = _product.slug === updatedProduct.slug;
    //       if (isExisted) {
    //         return {
    //           ..._product,
    //           quantity: value,
    //         };
    //       }
    //       return _product;
    //     });
    //   }
    //   state.checkout.cart = uniqBy(
    //     [...state.checkout.cart, updatedProduct],
    //     "slug",
    //   );
    // },

    addCart(state, action) {
      const { product, quantity } = action.payload;

      // Normalize to the same shape as API cart items
      const normalizedItem = {
        pid: product._id, // ← add pid as string ID
        _id: product._id,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        slug: product.slug,
        quantity: quantity ?? 1,
        stockQuantity: product.stockQuantity,
        // add any other CartItem fields you need
      };

      const alreadyExists = state.checkout.cart?.some(
        (item: CartItem) => item.pid === normalizedItem.pid,
      );

      if (!alreadyExists) {
        state.checkout.cart?.push(normalizedItem);
      } else {
        state.checkout.cart = state.checkout.cart?.map((item: CartItem) =>
          item.pid === normalizedItem.pid
            ? { ...item, quantity: normalizedItem.quantity }
            : item,
        );
      }

      // Recalculate totals
      const subtotal = sum(
        state.checkout.cart?.map(
          (item: CartItem) =>
            (item.salePrice || item.price) * (item.quantity || 1),
        ),
      );
      state.checkout.subtotal = subtotal;
      state.checkout.total =
        subtotal -
        (state.checkout.discount || 0) +
        (parseInt(state.checkout.shipping) || 0);
    },

    clearCart(state, action) {
      const updateCart = filter(
        state.checkout.cart,
        (item) => item.sku !== action.payload,
      );

      state.checkout.cart = updateCart;
    },
    deleteCart(state, action) {
      const productId = action.payload;
      const updateCart = filter(
        state.checkout.cart,
        (item) => item.pid !== productId,
      );

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.billing = null;
    },

    // increaseQuantity(state, action) {
    //   const productSku = action.payload;
    //   const updateCart = map(state.checkout.cart, (product) => {
    //     if (product.sku === productSku) {
    //       return {
    //         ...product,
    //         quantity: product.quantity + 1,
    //       };
    //     }
    //     return product;
    //   });

    //   state.checkout.cart = updateCart;
    // },

    increaseQuantity(state, action) {
      const productId = action.payload; // Changed from sku to _id
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.pid === productId) {
          return {
            ...product,
            quantity: (product.quantity += 1),
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;

      // Recalculate subtotal and total
      const subtotal = sum(
        updateCart.map(
          (item: CartItem) => item.salePrice * (item.quantity || 1),
        ),
      );
      state.checkout.subtotal = subtotal;
      state.checkout.total =
        subtotal -
        state.checkout.discount +
        (parseInt(state.checkout.shipping) || 0);
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.pid === productId) {
          return {
            ...product,
            quantity: (product.quantity -= 1),
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;

      // Recalculate subtotal and total
      const subtotal = sum(
        updateCart.map(
          (item: CartItem) => item.salePrice * (item.quantity || 1),
        ),
      );
      state.checkout.subtotal = subtotal;
      state.checkout.total =
        subtotal -
        state.checkout.discount +
        (parseInt(state.checkout.shipping) || 0);
    },

    // Add a new action for direct quantity update
    updateQuantity(state, action) {
      const { product, newValue } = action.payload;

      const updateCart = map(state.checkout.cart, (product) => {
        if (product._id === product) {
          return {
            ...product,
            quantity: Math.max(1, newValue), // Ensure minimum of 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },
    setShippingFee(state, action) {
      state.checkout.shipping = action.payload;
    },
    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },
  },
});

// Reducer
export default productSlice.reducer;

// Actions
export const {
  setCart,
  getCart,
  addCart,
  resetCart,
  setShippingFee,
  clearCart,
  deleteCart,
  createBilling,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
} = productSlice.actions;
