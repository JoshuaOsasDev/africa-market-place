import { Product } from "@/types/appTypes";

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
