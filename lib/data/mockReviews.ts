import { Review } from "@/types/review";

export const getMockReviews = (): Review[] => {
  return [
    {
      id: "1",
      userName: "Marvelz",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      comment: "Duis at ullamcorper nulla, eu dictum eros.",
      date: "2 min ago",
      countryFlag: "NG",
    },
    {
      id: "2",
      userName: "Chukwuebuka",
      userAvatar: "https://i.pravatar.cc/150?img=2",
      rating: 4,
      comment:
        "Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to \"bolt\" or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants.",
      date: "30 Apr, 2021",
      countryFlag: "GH",
    },
    {
      id: "3",
      userName: "Adebayor",
      userAvatar: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      comment: "Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus.",
      date: "2 min ago",
      countryFlag: "CN",
    },
    {
      id: "4",
      userName: "Nkuruma",
      userAvatar: "https://i.pravatar.cc/150?img=4",
      rating: 5,
      comment:
        "200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom Non-GMO Productive Brassica rapa VAR. chinensis, a.k.a. Canton's Choice, Bok Choi, from USA",
      date: "2 min ago",
      countryFlag: "BW",
    },
    {
      id: "5",
      userName: "Amara",
      userAvatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      comment:
        "Excellent product! The cabbage arrived fresh and crisp. Perfect for my stir-fry recipes.",
      date: "1 week ago",
      countryFlag: "NG",
    },
    {
      id: "6",
      userName: "Kwame",
      userAvatar: "https://i.pravatar.cc/150?img=6",
      rating: 4,
      comment:
        "Good quality vegetables. Delivery was prompt and packaging was secure.",
      date: "2 weeks ago",
      countryFlag: "GH",
    },
  ];
};