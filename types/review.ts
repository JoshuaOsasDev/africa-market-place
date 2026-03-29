type Users = {
  cover: {
    url: string;
  };
  firstName: string;
  lastName: string;
};
export interface Review {
  id?: string;
  _id: string;
  user: Users;
  userAvatar?: string;
  rating: number;
  review: string;
  createdAt: string;
  countryFlag?: string;
  verified?: boolean;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}
