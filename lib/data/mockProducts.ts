import { Product, ProductMock, RelatedProduct } from "@/types/product";
import { Review } from "@/types/review";
import { getMockReviews } from "./mockReviews";

export const getMockProduct = (
  slug: string,
): ProductMock & { reviews: Review[] } => {
  return {
    id: "1",
    name: "Chinese Cabbage",
    slug: "chinese-cabbage",
    description: `Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.

Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet nisi porttitor ac. Etiam tincidunt metus vel dui interdum sollicitudin. Mauris sem ante, vestibulum nec orci vitae, aliquam mollis lacus. Sed et condimentum arcu, id molestie tellus. Nulla scelerisque vitae justo a convallis. Morbi urna ipsum, placerat quis commodo quis, egestas elementum leo. Donec convallis mollis enim. Aliquam id mi quam. Phasellus nec fringilla elit.`,
    images: [
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=800",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800",
    ],
    price: 17.28,
    originalPrice: 48.0,
    discount: 64,
    inStock: true,
    stockQuantity: 50,
    sku: "2,51,594",
    rating: 5,
    reviewCount: 6,
    category: {
      id: "1",
      name: "Vegetables",
      slug: "vegetables",
    },
    tags: ["Vegetables", "Healthy", "Chinese", "Cabbage", "Green Cabbage"],
    features: [
      "100 g of fresh leaves provides.",
      "Aliquam ac est at augue volutpat elementum.",
      "Quisque nec enim eget sapien molestie.",
      "Proin convallis odio volutpat finibus posuere.",
    ],
    additionalInfo: {
      weight: "1 kg",
      dimensions: "15 × 10 × 8 cm",
      origin: "Nigeria",
      storage: "Keep refrigerated at 2-4°C",
    },
    reviews: getMockReviews(),
  };
};

export const getMockRelatedProducts = (): RelatedProduct[] => {
  return [
    {
      id: "2",
      name: "Red Tomato",
      slug: "red-tomato",
      image:
        "https://images.unsplash.com/photo-1640958904911-65668b264e26?w=500",
      price: 25.0,
      originalPrice: 25.0,
      rating: 4.5,
      reviewCount: 12,
      inStock: true,
    },
    {
      id: "3",
      name: "Fresh Corn",
      slug: "fresh-corn",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500",
      price: 25.0,
      originalPrice: 25.0,
      rating: 4,
      reviewCount: 8,
      inStock: true,
    },
    {
      id: "4",
      name: "Green Chili",
      slug: "green-chili",
      image:
        "https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=500",
      price: 25.0,
      originalPrice: 25.0,
      rating: 5,
      reviewCount: 15,
      inStock: true,
    },
    {
      id: "5",
      name: "Fresh Potato",
      slug: "fresh-potato",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500",
      price: 25.0,
      originalPrice: 25.0,
      rating: 4.5,
      reviewCount: 20,
      inStock: false,
    },
    {
      id: "6",
      name: "Red Tomato",
      slug: "red-tomato-2",
      image:
        "https://images.unsplash.com/photo-1640958904911-65668b264e26?w=500",
      price: 25.0,
      originalPrice: 25.0,
      rating: 4.5,
      reviewCount: 12,
      inStock: true,
    },
    {
      id: "7",
      name: "Fresh Corn",
      slug: "fresh-corn-2",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500",
      price: 25.0,
      originalPrice: 25.0,
      rating: 4,
      reviewCount: 8,
      inStock: true,
    },
    {
      id: "8",
      name: "Green Chili",
      slug: "green-chili-2",
      image:
        "https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=500",
      price: 25.0,
      originalPrice: 25.0,
      rating: 5,
      reviewCount: 15,
      inStock: true,
    },
    {
      id: "9",
      name: "Fresh Potato",
      slug: "fresh-potato-2",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500",
      price: 25.0,
      originalPrice: 25.0,
      rating: 4.5,
      reviewCount: 20,
      inStock: true,
    },
  ];
};
