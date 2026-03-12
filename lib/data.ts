import { Product, ShippingDataType, WishlistItem } from "@/types/appTypes";
import {
  BaggageClaim,
  Bell,
  Heart,
  HousePlus,
  ShoppingBag,
} from "lucide-react";
import logo from "../lib/public/images/africa1_logo.png";
// Mobile Data Information

export const navMobileData = (path = "/") => {
  if (path === "/") {
    return [
      {
        image: logo,
        href: "/",
        name: "image",
      },
      {
        icon: ShoppingBag,
        href: "/user/dashboard/orders",
        name: "Orders",
      },
      {
        icon: Bell,
        href: "/user/dashboard/notifications",
        name: "Notifications",
      },
    ];
  } else if (path.includes("/orders")) {
    return [
      {
        image: logo,
        href: "/",
        name: "image",
      },
      {
        icon: BaggageClaim,
        href: "/user/dashboard/notifications",
        name: "Notification",
      },
    ];
  }

  return [
    {
      image: logo,
      href: "/",
      name: "image",
    },
  ];
};

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
    name: "Order",
    url: "/user/dashboard/orders",
  },
  {
    name: "Wishlist",
    url: "/user/dashboard/wishlist",
  },
  {
    name: "Notifications",
    url: "/user/dashboard/notifications",
  },

  {
    name: "Messages",
    url: "/user/dashboard/messages",
  },
];

export const socialData = [
  {
    id: 1,
    url: "https://www.facebook.com/profile.php?id=61575640694194",
    name: "facebook",
  },
  {
    id: 2,
    url: "https://www.instagram.com/africamarketplace.co.uk?igsh=MTFwNTdsbWh6MmQ4Mw==",
    name: "instagram",
  },
  {
    id: 3,
    url: "",
    name: "twitter",
  },
  {
    id: 4,
    url: "mailto:Contact@africamarketplace.co.uk",
    name: "mail",
  },
];

export const socialData2 = [
  {
    id: 1,
    url: "http://localhost:3000/user/dashboard/notifications",
    name: "Notifications",
  },
  {
    id: 2,
    url: "http://localhost:3000/user/dashboard/userInfo",
    name: "My account",
  },
  {
    id: 3,
    url: "http://localhost:3000/user/dashboard/orders",
    name: "Order",
  },
  {
    id: 4,
    url: "http://localhost:3000/user/dashboard/wishlist",
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
    url: "/about",
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
  {
    imgUrl: "/images/slider_4.png",
    link: "",
    id: 3,
    alt: "advert 3",
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
export const userSettingList = [
  {
    category: "Settings",
    subcategory: [
      {
        name: "User Information",
        id: 1,
        url: "/user/dashboard/userInfo",
      },
      {
        name: "Password Setting",
        id: 2,
        url: "/user/dashboard/passwordSetting",
      },
      {
        name: "Notification Setting",
        id: 3,
        url: "/user/dashboard/notificationSetting",
      },
    ],
    imgUrl: "/images/apple.png",
    id: 1,
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
    id: 0,
    url: "",
    wished: false,
  },
  {
    imgurl: "/images/food.jpg",
    heading: "Fruit and Vegetables",
    discount: 15,
    presentPrice: 500,
    pastPrice: 400,
    starRating: 4,
    id: 1,
    url: "",
    wished: false,
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
    wished: true,
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
    wished: false,
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
    wished: false,
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
    wished: true,
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
const statuses: Product["status"][] = ["published", "draft", "Out of Stock"];

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
export const products = Array.from({ length: 100 }, (_, index) => {
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

export const shippingData: ShippingDataType[] = [
  {
    id: "SHP1234578",
    trackingNo: "SHP1234578",
    customer: "Janat Abdallah",
    destination: "Lagos State",
    deliveryDate: "20-03-2025",
    status: "Delivered",
  },
  {
    id: "SHP1234579",
    trackingNo: "SHP1234579",
    customer: "Janat Abdallah",
    destination: "Lagos State",
    deliveryDate: "20-03-2025",
    status: "Delivered",
  },
  {
    id: "SHP1234580",
    trackingNo: "SHP1234580",
    customer: "Janat Abdallah",
    destination: "Lagos State",
    deliveryDate: "20-03-2025",
    status: "Delivered",
  },
  {
    id: "SHP1234581",
    trackingNo: "SHP1234581",
    customer: "Janat Abdallah",
    destination: "Lagos State",
    deliveryDate: "20-03-2025",
    status: "Delivered",
  },
  {
    id: "SHP1234582",
    trackingNo: "SHP1234582",
    customer: "Emaka Eze",
    destination: "Enugu State",
    deliveryDate: "25-04-2024",
    status: "Cancelled",
  },
  {
    id: "SHP1234583",
    trackingNo: "SHP1234583",
    customer: "Ahmed Nasiru",
    destination: "Abuja",
    deliveryDate: "25-04-2024",
    status: "In Transit",
  },
  {
    id: "SHP1234584",
    trackingNo: "SHP1234584",
    customer: "Ahmed Nasiru",
    destination: "Abuja",
    deliveryDate: "25-04-2024",
    status: "In Transit",
  },
  {
    id: "SHP1234585",
    trackingNo: "SHP1234585",
    customer: "John Smith",
    destination: "Kano State",
    deliveryDate: "10-05-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234586",
    trackingNo: "SHP1234586",
    customer: "Mary Johnson",
    destination: "Port Harcourt",
    deliveryDate: "15-05-2024",
    status: "Pending",
  },
  {
    id: "SHP1234587",
    trackingNo: "SHP1234587",
    customer: "David Okafor",
    destination: "Ibadan",
    deliveryDate: "18-05-2024",
    status: "In Transit",
  },
  {
    id: "SHP1234588",
    trackingNo: "SHP1234588",
    customer: "Aisha Bello",
    destination: "Ilorin",
    deliveryDate: "20-05-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234589",
    trackingNo: "SHP1234589",
    customer: "Samuel Adeyemi",
    destination: "Akure",
    deliveryDate: "21-05-2024",
    status: "Pending",
  },
  {
    id: "SHP1234590",
    trackingNo: "SHP1234590",
    customer: "Blessing Uche",
    destination: "Owerri",
    deliveryDate: "22-05-2024",
    status: "In Transit",
  },
  {
    id: "SHP1234591",
    trackingNo: "SHP1234591",
    customer: "Ibrahim Musa",
    destination: "Minna",
    deliveryDate: "23-05-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234592",
    trackingNo: "SHP1234592",
    customer: "Grace Thompson",
    destination: "Uyo",
    deliveryDate: "24-05-2024",
    status: "Cancelled",
  },
  {
    id: "SHP1234593",
    trackingNo: "SHP1234593",
    customer: "Daniel Afolayan",
    destination: "Ado-Ekiti",
    deliveryDate: "25-05-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234594",
    trackingNo: "SHP1234594",
    customer: "Zainab Sadiq",
    destination: "Zaria",
    deliveryDate: "26-05-2024",
    status: "In Transit",
  },
  {
    id: "SHP1234595",
    trackingNo: "SHP1234595",
    customer: "Chinedu Okorie",
    destination: "Onitsha",
    deliveryDate: "27-05-2024",
    status: "Pending",
  },
  {
    id: "SHP1234596",
    trackingNo: "SHP1234596",
    customer: "Fatima Lawal",
    destination: "Ogbomosho",
    deliveryDate: "28-05-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234597",
    trackingNo: "SHP1234597",
    customer: "Michael Brown",
    destination: "Abeokuta",
    deliveryDate: "29-05-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234598",
    trackingNo: "SHP1234598",
    customer: "Hassan Abdullahi",
    destination: "Sokoto",
    deliveryDate: "30-05-2024",
    status: "In Transit",
  },
  {
    id: "SHP1234599",
    trackingNo: "SHP1234599",
    customer: "Peace Daniels",
    destination: "Asaba",
    deliveryDate: "31-05-2024",
    status: "Pending",
  },
  {
    id: "SHP1234600",
    trackingNo: "SHP1234600",
    customer: "Victor Ekanem",
    destination: "Calabar",
    deliveryDate: "01-06-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234601",
    trackingNo: "SHP1234601",
    customer: "Rashid Garba",
    destination: "Gusau",
    deliveryDate: "02-06-2024",
    status: "Cancelled",
  },
  {
    id: "SHP1234602",
    trackingNo: "SHP1234602",
    customer: "Linda Peters",
    destination: "Yenagoa",
    deliveryDate: "03-06-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234603",
    trackingNo: "SHP1234603",
    customer: "Joseph Samuel",
    destination: "Lokoja",
    deliveryDate: "04-06-2024",
    status: "In Transit",
  },
  {
    id: "SHP1234604",
    trackingNo: "SHP1234604",
    customer: "Mariam Tanko",
    destination: "Jalingo",
    deliveryDate: "05-06-2024",
    status: "Pending",
  },
  {
    id: "SHP1234605",
    trackingNo: "SHP1234605",
    customer: "Kelvin Okon",
    destination: "Eket",
    deliveryDate: "06-06-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234606",
    trackingNo: "SHP1234606",
    customer: "Sadiya Mohammed",
    destination: "Katsina",
    deliveryDate: "07-06-2024",
    status: "In Transit",
  },
  {
    id: "SHP1234607",
    trackingNo: "SHP1234607",
    customer: "Andrew Cole",
    destination: "Ife",
    deliveryDate: "08-06-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234608",
    trackingNo: "SHP1234608",
    customer: "Oluchi Nwoye",
    destination: "Nnewi",
    deliveryDate: "09-06-2024",
    status: "Pending",
  },
  {
    id: "SHP1234609",
    trackingNo: "SHP1234609",
    customer: "Sola Ogun",
    destination: "Iseyin",
    deliveryDate: "10-06-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234610",
    trackingNo: "SHP1234610",
    customer: "Ismail Danjuma",
    destination: "Birnin Kebbi",
    deliveryDate: "11-06-2024",
    status: "Cancelled",
  },
  {
    id: "SHP1234611",
    trackingNo: "SHP1234611",
    customer: "Nancy White",
    destination: "Makurdi",
    deliveryDate: "12-06-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234612",
    trackingNo: "SHP1234612",
    customer: "Paul Okeke",
    destination: "Nsukka",
    deliveryDate: "13-06-2024",
    status: "In Transit",
  },
  {
    id: "SHP1234613",
    trackingNo: "SHP1234613",
    customer: "Halima Abubakar",
    destination: "Gombe",
    deliveryDate: "14-06-2024",
    status: "Pending",
  },
  {
    id: "SHP1234614",
    trackingNo: "SHP1234614",
    customer: "Peter Johnson",
    destination: "Ijebu Ode",
    deliveryDate: "15-06-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234615",
    trackingNo: "SHP1234615",
    customer: "Aminu Shehu",
    destination: "Dutse",
    deliveryDate: "16-06-2024",
    status: "In Transit",
  },
  {
    id: "SHP1234616",
    trackingNo: "SHP1234616",
    customer: "Comfort Adebayo",
    destination: "Owo",
    deliveryDate: "17-06-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234617",
    trackingNo: "SHP1234617",
    customer: "Yusuf Lawan",
    destination: "Nguru",
    deliveryDate: "18-06-2024",
    status: "Pending",
  },
  {
    id: "SHP1234618",
    trackingNo: "SHP1234618",
    customer: "Esther Mark",
    destination: "Otukpo",
    deliveryDate: "19-06-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234619",
    trackingNo: "SHP1234619",
    customer: "Abdul Kareem",
    destination: "Oshogbo",
    deliveryDate: "20-06-2024",
    status: "In Transit",
  },
  {
    id: "SHP1234620",
    trackingNo: "SHP1234620",
    customer: "Rebecca Stone",
    destination: "Badagry",
    deliveryDate: "21-06-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234621",
    trackingNo: "SHP1234621",
    customer: "Sani Abdulkadir",
    destination: "Kafanchan",
    deliveryDate: "22-06-2024",
    status: "Pending",
  },
  {
    id: "SHP1234622",
    trackingNo: "SHP1234622",
    customer: "Juliet Obi",
    destination: "Awka",
    deliveryDate: "23-06-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234623",
    trackingNo: "SHP1234623",
    customer: "Tunde Balogun",
    destination: "Ikorodu",
    deliveryDate: "24-06-2024",
    status: "In Transit",
  },
  {
    id: "SHP1234624",
    trackingNo: "SHP1234624",
    customer: "Amina Yusuf",
    destination: "Lafia",
    deliveryDate: "25-06-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234625",
    trackingNo: "SHP1234625",
    customer: "Brian Adams",
    destination: "Ota",
    deliveryDate: "26-06-2024",
    status: "Pending",
  },
  {
    id: "SHP1234626",
    trackingNo: "SHP1234626",
    customer: "Salihu Ibrahim",
    destination: "Yola",
    deliveryDate: "27-06-2024",
    status: "Delivered",
  },
  {
    id: "SHP1234627",
    trackingNo: "SHP1234627",
    customer: "Modupe Ajayi",
    destination: "Ilaro",
    deliveryDate: "28-06-2024",
    status: "In Transit",
  },
];

export const dealsToday = [
  {
    id: 1,
    image: "/images/food.jpg",
    discount: "59%",
    title: "Assorted fresh fruit basket for top customers",
    price: 10.5,
    oldPrice: 15.0,
    description:
      "Lorem ipsum hendrerit ultrices odio sit massa nunc imperdiet odio nunc mi ipsum.",
  },
  {
    id: 2,
    image: "/images/food.jpg",
    discount: "40%",
    title: "Organic vegetable combo pack",
    price: 8.2,
    oldPrice: 12.0,
    description: "Fresh farm vegetables delivered straight to your doorstep.",
  },
  {
    id: 3,
    image: "/images/food.jpg",
    discount: "30%",
    title: "Premium breakfast combo",
    price: 14.99,
    oldPrice: 20.0,
    description: "Healthy breakfast selection for energetic mornings.",
  },
  {
    id: 4,
    image: "/images/food.jpg",
    discount: "50%",
    title: "Exotic fruit selection",
    price: 18.75,
    oldPrice: 25.0,
    description: "Taste the world with this premium exotic fruit collection.",
  },
];
