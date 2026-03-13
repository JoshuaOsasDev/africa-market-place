import { ProductCompletionInput } from "@/types/product";

const REQUIRED_FIELDS: (keyof ProductCompletionInput)[] = [
  "name",
  "description",
  "sku",
  "price",
  "status",
  "stockQuantity",
  "category",
  "width",
  "images",
];

export function calculateProductStatus(product: ProductCompletionInput) {
  const total = REQUIRED_FIELDS.length;

  const filled = REQUIRED_FIELDS.filter((field) => {
    const value = product[field];

    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.trim() !== "";
    if (typeof value === "number") return true;

    return Boolean(value);
  }).length;

  const completionPercentage = Math.round((filled / total) * 100);

  let computedStatus: "draft" | "pending" | "published";

  if (completionPercentage < 100) {
    computedStatus = "draft";
  } else if (product.status === "Published") {
    computedStatus = "published";
  } else {
    computedStatus = "pending";
  }

  return {
    completionPercentage,
    computedStatus,
  };
}
