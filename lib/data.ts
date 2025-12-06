import { Product, WishlistItem } from "@/types/appTypes";

export const countryListAndFlags = [
  {
    name: "Nigeria",
    flagImage: "/images/flag.png",
    alt: "Nigeria flag",
    selected: true,
  },
  {
    name: "Ghana",
    flagImage: "/images/flag2.png",
    alt: "Ghana flag",
    selected: false,
  },
];

export const navListArray = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Shop",
    url: "/user/shop",
  },
  {
    name: "Contact",
    url: "/contact",
  },
  {
    name: "Wishlist",
    url: "/wishlist",
  },
  {
    name: "Sell",
    url: "/sell",
  },
];

export const socialData = [
  {
    id: 1,
    url: "",
    name: "facebook",
  },
  {
    id: 2,
    url: "",
    name: "instagram",
  },
  {
    id: 3,
    url: "",
    name: "twitter",
  },
  {
    id: 4,
    url: "",
    name: "mail",
  },
];

export const socialData2 = [
  {
    id: 1,
    url: "",
    name: "Shop",
  },
  {
    id: 2,
    url: "",
    name: "My account",
  },
  {
    id: 3,
    url: "",
    name: "Login",
  },
  {
    id: 4,
    url: "",
    name: "Wishlist",
  },
];

export const socialData3 = [
  {
    id: 1,
    url: "",
    name: "Information",
  },
  {
    id: 2,
    url: "",
    name: "Shipping Policy",
  },
  {
    id: 3,
    url: "",
    name: "Return And Refunds",
  },
  {
    id: 4,
    url: "",
    name: "Cookies Policy",
  },
  {
    id: 5,
    url: "",
    name: "Frequently Asked",
  },
];
export const socialData4 = [
  {
    id: 1,
    url: "",
    name: "Company",
  },
  {
    id: 2,
    url: "",
    name: "About Us",
  },
  {
    id: 3,
    url: "",
    name: "Privacy Policy",
  },
  {
    id: 4,
    url: "",
    name: "Terms And Conditions",
  },
  {
    id: 5,
    url: "",
    name: "Contact Us",
  },
];

export const sliderCardData = [
  {
    imgUrl: "/images/sliderCard1.png",
    link: "",
    id: 1,
    alt: "advert 1",
  },
  {
    imgUrl: "/images/sliderCard2.webp",
    link: "",
    id: 2,
    alt: "advert 2",
  },
];

export const categorySectionList = [
  {
    category: "Fruit And Vegetable",
    subcategory: [
      {
        name: "Lemon",
        id: 1,
        url: "",
      },
      {
        name: "Lemon2",
        id: 2,
        url: "",
      },
      {
        name: "Lemo3",
        id: 3,
        url: "",
      },
    ],
    imgUrl: "/images/apple.png",
    id: 1,
  },
  {
    category: "Meats And Seafood",
    subcategory: [
      {
        name: "Lemon",
        id: 1,
        url: "",
      },
      {
        name: "Lemon2",
        id: 2,
        url: "",
      },
      {
        name: "Lemo3",
        id: 3,
        url: "",
      },
    ],
    imgUrl: "/images/meat.jpg",
    id: 2,
  },
  {
    category: "Fruit And Vegetable",
    subcategory: [
      {
        name: "Lemon",
        id: 1,
        url: "",
      },
      {
        name: "Lemon2",
        id: 2,
        url: "",
      },
      {
        name: "Lemo3",
        id: 3,
        url: "",
      },
    ],
    imgUrl: "/images/apple.png",
    id: 3,
  },
];

export const topCategoriesData = [
  {
    imgurl: "/images/food.jpg",
    heading: "Fruit and Vegetables",
    id: 1,
    url: "",
  },
  {
    imgurl: "/images/food.jpg",
    heading: "Beaverages",
    id: 2,
    url: "",
  },
  {
    imgurl: "/images/food.jpg",
    heading: "Sea Food",
    id: 3,
    url: "",
  },
  {
    imgurl: "/images/food.jpg",
    heading: "Palm Oil",
    id: 4,
    url: "",
  },
  {
    imgurl: "/images/food.jpg",
    heading: "Fruit and Vegetables",
    id: 5,
    url: "",
  },
];
export const bestSellingProductData = [
  {
    imgurl: "/images/food.jpg",
    heading: "Fruit and Vegetables",
    discount: 15,
    presentPrice: 500,
    pastPrice: 400,
    starRating: 4,
    id: 1,
    url: "",
  },
  {
    imgurl: "/images/food.jpg",
    heading: "Fruit and Vegetables",
    discount: 15,
    presentPrice: 500,
    pastPrice: 400,
    starRating: 4,
    id: 2,
    url: "",
  },
  {
    imgurl: "/images/food.jpg",
    heading: "Fruit and Vegetables",
    discount: 15,
    presentPrice: 500,
    pastPrice: 400,
    starRating: 4,
    id: 3,
    url: "",
  },
  {
    imgurl: "/images/food.jpg",
    heading: "Fruit and Vegetables",
    discount: 15,
    presentPrice: 500,
    pastPrice: 400,
    starRating: 4,
    id: 4,
    url: "",
  },
  {
    imgurl: "/images/food.jpg",
    heading: "Fruit and Vegetables",
    discount: 15,
    presentPrice: 500,
    pastPrice: 400,
    starRating: 4,
    id: 5,
    url: "",
  },
  {
    imgurl: "/images/food.jpg",
    heading: "Fruit and Vegetables",
    discount: 15,
    presentPrice: 500,
    pastPrice: 400,
    starRating: 4,
    id: 6,
    url: "",
  },
];

const productNames = [
  "Fresh Tomatoes",
  "Green Pepper",
  "Fresh Chicken Breast",
  "Beef Strips",
];
const categories = ["Vegetables", "Vegetables", "Protein", "Protein"];
const images = [
  "/images/tomatoes.png",
  "/images/pepper.png",
  "/images/tomatoes.png",
  "/images/pepper.png",
];
const statuses: Product["status"][] = [
  "Published",
  "Low Stock",
  "Draft",
  "Out of Stock",
];

export const ordersData = Array.from({ length: 50 }, (_, index) => {
  const i = index % 4;
  {
    return {
      id: (1000 + index).toString(),
      orderId: `ORD-${1000 + index}`,
      image: images[i],
      product: productNames[index % productNames.length],
      date: `2024-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}`,
      total: parseFloat((Math.random() * 500 + 50).toFixed(2)),
      payment: index % 2 === 0 ? "Master card" : "Visa",
      status:
        index % 3 === 0
          ? "Shipped"
          : index % 3 === 1
            ? "Processing"
            : "Cancelled",
    };
  }
});
export const products: Product[] = Array.from({ length: 100 }, (_, index) => {
  const i = index % 4;
  return {
    id: (index + 1).toString(),
    name: productNames[i],
    image: images[i],
    sku: (302000 + index).toString(),
    category: categories[i],
    stock: Math.floor(Math.random() * 50) + 1,
    price: parseFloat((Math.random() * 5000 + 500).toFixed(2)),
    status: statuses[index % statuses.length],
    addedDate: `2024-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}`,
  };
});

export const salesData = [
  {
    country: "United Kingdom",
    flag: "/images/united-kingdom-flag-background_23-2147820390.avif",
    sales: 340,
    revenue: 17678,
    change: 10,
  },
  {
    country: "Finland",
    flag: "/images/finland-flag.jpg",
    sales: 520,
    revenue: 24350,
    change: 15,
  },
  {
    country: "France",
    flag: "/images/france-flag.jpg",
    sales: 280,
    revenue: 13420,
    change: -5,
  },
  {
    country: "Germany",
    flag: "/images/germany-flag.jpg",
    sales: 410,
    revenue: 19890,
    change: 8,
  },
  {
    country: "Turkey",
    flag: "/images/turkey-flag.jpg",
    sales: 195,
    revenue: 8760,
    change: -12,
  },
  {
    country: "Nigeria",
    flag: "/images/nigeria-flag.png",
    sales: 560,
    revenue: 6350,
    change: 15,
  },
];

export const reviewData = [
  {
    id: 1,
    rating: 4.5,
    reviewCount: 120,
    reviewText: "This is amazing product I have.",
    date: "July 2, 2020 03:29 PM",
    userName: "Darrell Steward",
    userImage: "/dashboard-images/profile-picture.svg",
    likes: 128,
  },
  {
    id: 2,
    rating: 5,
    reviewCount: 210,
    reviewText: "Quality is top-notch. Highly recommended!",
    date: "May 11, 2021 10:14 AM",
    userName: "Courtney Henry",
    userImage: "/dashboard-images/profile-picture.svg",
    likes: 98,
  },
  {
    id: 3,
    rating: 3.5,
    reviewCount: 60,
    reviewText: "Good but delivery took too long.",
    date: "Jan 15, 2022 07:55 PM",
    userName: "Jenny Wilson",
    userImage: "/dashboard-images/profile-picture.svg",
    likes: 45,
  },
];

export const orders = {};

export const wishlistData: WishlistItem[] = [
  {
    id: 1,
    name: "Green Pepper",
    price: 30.5,
    oldPrice: 55.1,
    status: "in stock",
    image: "/images/pepper.png",
  },
  {
    id: 2,
    name: "Fresh Tomatoes",
    price: 18,
    oldPrice: 25,
    status: "in stock",
    image: "/images/tomatoes.png",
  },
  {
    id: 3,
    name: "Organic Onions",
    price: 10,
    oldPrice: 15,
    status: "in stock",
    image: "/images/pepper.png",
  },
  {
    id: 4,
    name: "Bell Pepper Mix",
    price: 22.9,
    oldPrice: 32.5,
    status: "in stock",
    image: "/images/pepper.png",
  },
  {
    id: 5,
    name: "Cherry Tomatoes",
    price: 12.5,
    oldPrice: 19.4,
    status: "in stock",
    image: "/images/tomatoes.png",
  },
  {
    id: 6,
    name: "Red Onions Pack",
    price: 14.7,
    oldPrice: 21.0,
    status: "in stock",
    image: "/images/pepper.png",
  },
  {
    id: 7,
    name: "Yellow Pepper",
    price: 28.4,
    oldPrice: 45.0,
    status: "in stock",
    image: "/images/pepper.png",
  },
  {
    id: 8,
    name: "Mixed Tomatoes",
    price: 17.2,
    oldPrice: 24.9,
    status: "in stock",
    image: "/images/tomatoes.png",
  },
  {
    id: 9,
    name: "White Onions Pack",
    price: 11.9,
    oldPrice: 17.5,
    status: "in stock",
    image: "/images/pepper.png",
  },
  {
    id: 10,
    name: "Sweet Pepper",
    price: 26.3,
    oldPrice: 39.9,
    status: "in stock",
    image: "/images/pepper.png",
  },
  {
    id: 11,
    name: "Roma Tomatoes",
    price: 15.0,
    oldPrice: 22.0,
    status: "in stock",
    image: "/images/tomatoes.png",
  },
  {
    id: 12,
    name: "Brown Onions",
    price: 13.4,
    oldPrice: 20.0,
    status: "in stock",
    image: "/images/pepper.png",
  },
  {
    id: 13,
    name: "Spicy Pepper Mix",
    price: 24.9,
    oldPrice: 35.0,
    status: "in stock",
    image: "/images/pepper.png",
  },
  {
    id: 14,
    name: "Tomato Basket",
    price: 20.5,
    oldPrice: 29.0,
    status: "in stock",
    image: "/images/tomatoes.png",
  },
  {
    id: 15,
    name: "Sliced Onions",
    price: 9.5,
    oldPrice: 14.0,
    status: "in stock",
    image: "/images/pepper.png",
  },
  {
    id: 16,
    name: "Crunchy Pepper",
    price: 27.8,
    oldPrice: 41.2,
    status: "in stock",
    image: "/images/pepper.png",
  },
  {
    id: 17,
    name: "Local Tomatoes",
    price: 16.7,
    oldPrice: 23.5,
    status: "in stock",
    image: "/images/tomatoes.png",
  },
  {
    id: 18,
    name: "Premium Onions",
    price: 12.9,
    oldPrice: 18.7,
    status: "in stock",
    image: "/images/pepper.png",
  },
  {
    id: 19,
    name: "Red Pepper",
    price: 29.4,
    oldPrice: 44.8,
    status: "in stock",
    image: "/images/pepper.png",
  },
  {
    id: 20,
    name: "Juicy Tomatoes",
    price: 19.3,
    oldPrice: 28.0,
    status: "in stock",
    image: "/images/tomatoes.png",
  },
];
