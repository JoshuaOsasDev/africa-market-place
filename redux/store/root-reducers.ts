/* Instruments */
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can use other storage options if needed

// slices
import productReducer from "../slices/product";
import UserReducer from "../slices/user";
import WishlistReducer from "../slices/wishlist";
import CompareReducer from "../slices/compare";
import SettingsReducer from "../slices/settings";
import CategoriesReducer from "../slices/categories";
import BrandsReducer from "../slices/brands";
import { showFormReducer } from "../slices/showFormSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};
const wishlistPersistConfig = {
  key: "wishlist",
  storage,
  keyPrefix: "redux-",
  whitelist: ["wishlist"],
};
const comparePersistConfig = {
  key: "compare",
  storage,
  keyPrefix: "redux-",
  whitelist: ["products"],
};

const settingsPersistConfig = { key: "settings", storage, keyPrefix: "redux-" };
const userPersistConfig = {
  key: "user",
  storage,
  keyPrefix: "redux-",
  whitelist: ["user", "isAuthenticated"],
};

const categoriesPersistConfig = {
  key: "categories",
  storage,
  keyPrefix: "redux-",
  whitelist: ["categories", "newCategories"], // fields inside slice
};

const reducer = combineReducers({
  product: persistReducer(productPersistConfig, productReducer),
  user: persistReducer(userPersistConfig, UserReducer),
  settings: persistReducer(settingsPersistConfig, SettingsReducer),
  wishlist: persistReducer(wishlistPersistConfig, WishlistReducer),
  compare: persistReducer(comparePersistConfig, CompareReducer),
  //categories: CategoriesReducer,
  categories: persistReducer(categoriesPersistConfig, CategoriesReducer),
  brands: BrandsReducer,
  showFormReducer: showFormReducer,
});
export { rootPersistConfig, reducer };
