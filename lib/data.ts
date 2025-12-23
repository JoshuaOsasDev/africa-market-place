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

export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    image: "/images/tomatoes.png",
    sku: "302012",
    category: "Vegetables",
    stock: 45,
    price: 1199.99,
    status: "Published",
    addedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Green Pepper",
    image: "/images/pepper.png",
    sku: "302012",
    category: "Vegetables",
    stock: 8,
    price: 899.99,
    status: "Low Stock",
    addedDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Fresh Tomatoes",
    image: "/images/tomatoes.png",
    sku: "302013",
    category: "Vegetables",
    stock: 45,
    price: 1199.99,
    status: "Published",
    addedDate: "2024-01-15",
  },
  {
    id: "4",
    name: "Green Pepper",
    image: "/images/pepper.png",
    sku: "302014",
    category: "Vegetables",
    stock: 8,
    price: 899.99,
    status: "Low Stock",
    addedDate: "2024-02-20",
  },
  {
    id: "5",
    name: "Fresh Tomatoes",
    image: "/images/tomatoes.png",
    sku: "302015",
    category: "Vegetables",
    stock: 45,
    price: 1199.99,
    status: "Published",
    addedDate: "2024-01-15",
  },
  {
    id: "6",
    name: "Green Pepper",
    image: "/images/pepper.png",
    sku: "302016",
    category: "Vegetables",
    stock: 8,
    price: 899.99,
    status: "Low Stock",
    addedDate: "2024-02-20",
  },

  {
    id: "7",
    name: "Fresh Chicken Breast",
    image: "/images/tomatoes.png",
    sku: "502101",
    category: "Protein",
    stock: 20,
    price: 3599.99,
    status: "Published",
    addedDate: "2024-03-10",
  },
  {
    id: "8",
    name: "Beef Strips",
    image: "/images/pepper.png",
    sku: "502102",
    category: "Protein",
    stock: 12,
    price: 4999.99,
    status: "Low Stock",
    addedDate: "2024-04-05",
  },
  {
    id: "9",
    name: "Fresh Chicken Breast",
    image: "/images/tomatoes.png",
    sku: "502103",
    category: "Protein",
    stock: 18,
    price: 3599.99,
    status: "Published",
    addedDate: "2024-03-10",
  },
  {
    id: "10",
    name: "Beef Strips",
    image: "/images/pepper.png",
    sku: "502104",
    category: "Protein",
    stock: 7,
    price: 4999.99,
    status: "Low Stock",
    addedDate: "2024-04-05",
  },
  {
    id: "11",
    name: "Fresh Chicken Breast",
    image: "/images/tomatoes.png",
    sku: "502105",
    category: "Protein",
    stock: 16,
    price: 3599.99,
    status: "Published",
    addedDate: "2024-03-10",
  },
  {
    id: "12",
    name: "Beef Strips",
    image: "/images/pepper.png",
    sku: "502106",
    category: "Protein",
    stock: 9,
    price: 4999.99,
    status: "Low Stock",
    addedDate: "2024-04-05",
  },
];

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
