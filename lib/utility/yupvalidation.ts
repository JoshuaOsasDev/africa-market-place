import { image } from "framer-motion/client";
import * as yup from "yup";

export const userDataUpdateSchema = yup.object({
  firstName: yup.string().required("First name is  required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string().required("Phone number is reqjuired"),
  email: yup.string().required("Phone number is reqjuired"),
  image: yup.string().required("Image is required"),
});

export const addProductFormSchema = yup.object({
  productImage: yup.string().required("Product image is required"),
  productName: yup.string().required("Product name is required"),
  productCategory: yup.string().required("Product category is required"),
  productQuantity: yup.string().required("Product quantity is required"),
  productSubCategory: yup.string().required("Product subcategory is required"),
  productPrice: yup.string().required("Product price is required"),
  productDescription: yup.string().required("Product description is required"),
  productGroup: yup.string().required("Product group is required"),
});

export const addProductFormSchema2 = yup.object({
  productImage: yup.string().required("Product image is required"),
  productName: yup.string().required("Product name is required"),
  productCategory: yup.string().required("Product category is required"),
  productQuantity: yup.string().required("Product quantity is required"),
  productSubCategory: yup.string().required("Product subcategory is required"),
  productPrice: yup.string().required("Product price is required"),
  productDescription: yup.string().required("Product description is required"),
  productMinimumAmount: yup
    .string()
    .required("Product minimum amount is required"),
  /*   productGroup: yup.string().required("Product group category is required") */
});

// Define the schema using Yup
// used
export const signUpSchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, " Password must have a minimum lenght of 6 characters ")
    .max(12, "Passoword cannot exceed 12 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export const editProfileSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  role: yup.string().required("User role is required"),
  image: yup.string().required("User image is required"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
export const verifyEmailSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const registerStoreSchema = yup.object({
  storeName: yup.string().required("Store name is required"),
  storeOwner: yup.string().required("Store owner name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  storeImage: yup.string().required("Store image is required"),
  storeAddress: yup.string().required("Store address is required"),
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Password is required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export const banckSchema = yup.object().shape({
  accountNumber: yup
    .string()
    .length(10, "Account number must be exactly 10 digits")
    .required("Account number is required"),
  accountName: yup.string().required("Account name is required"),
  bankName: yup.string().required("Bank name is required"),
});

export const productSchema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  sku: yup.string().required("SKU is required"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),

  productDescription: yup.string().required("Product description is required"),

  category: yup.string().required("Category is required"),
  tags: yup.string().nullable(),
  status: yup.string().required("Status is required"),

  quantity: yup.string().required("Quantity is required"),
  barcode: yup.string().required("Barcode is required"),

  percentage: yup.number().nullable(), // optional
  checked: yup.boolean().default(true), // optional, default true
  discountType: yup.string().nullable(), // optional text
  imagePreview: yup.mixed().nullable(), // optional (file or URL)
});


