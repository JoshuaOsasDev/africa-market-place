import { CustomerReviewStarRating } from "@/components/common/customerReviewStarRating";
import FilterOptions from "@/components/common/filterOptions";
import ReviewsSummary from "@/components/pageComponents/vendor/customersReviews/reviewsSummary";
import { Button } from "@/components/ui/button";
import { reviewData } from "@/lib/data";
import {
  ChevronDown,
  Filter,
  Star,
  StarIcon,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";

const CustomersPage = () => {
  return (
    <div>
      <h2 className="hidden text-xl font-medium text-[#45464E] md:block">
        Customers Review
      </h2>

      <ReviewsSummary />

      <div className="rounded-[12px] bg-white p-2 md:mt-5 md:p-5.5">
        <div className="mt-2 mb-6 hidden items-center justify-between md:flex">
          <div className="flex space-x-4">
            <Button className="rounded-[5px] border border-[#D5D5D5] bg-transparent px-5 py-2.5 text-black">
              All Reviews <span>(450)</span>
            </Button>
            <Button className="flex items-center justify-center rounded-[5px] bg-[#2E7D32] p-2.5">
              <span>
                <Star size={15} className={"fill-[#E5E7EB] text-[#E5E7EB]"} />
              </span>
              <span className="text-sm text-white">5</span>
            </Button>

            <Button className="flex items-center justify-center rounded-[5px] border border-[#D5D5D5] bg-transparent p-2.5">
              <span>
                <Star
                  size={15}
                  className={"fill-[#FF8A00] text-sm text-[#FF8A00]"}
                />
              </span>
              <span className="text-sm text-black">4</span>
            </Button>

            <Button className="flex items-center justify-center rounded-[5px] border border-[#D5D5D5] bg-transparent p-2.5">
              <span>
                <Star
                  size={15}
                  className={"fill-[#FF8A00] text-sm text-[#FF8A00]"}
                />
              </span>
              <span className="text-sm text-black">3</span>
            </Button>

            <Button className="flex items-center justify-center rounded-[5px] border border-[#D5D5D5] bg-transparent p-2.5">
              <span>
                <Star
                  size={15}
                  className={"fill-[#FF8A00] text-sm text-[#FF8A00]"}
                />
              </span>
              <span className="text-sm text-black">2</span>
            </Button>

            <Button className="flex items-center justify-center rounded-[5px] border border-[#D5D5D5] bg-transparent p-2.5">
              <span>
                <Star
                  size={15}
                  className={"fill-[#FF8A00] text-sm text-[#FF8A00]"}
                />
              </span>
              <span className="text-sm text-black">1</span>
            </Button>
          </div>
          <div className="flex gap-3">
            <Button className="rounded-[5px] border border-[#D5D5D5] bg-transparent p-2.5 text-black">
              <span>Last 30 days</span>
              <span>
                <ChevronDown className="text-[#BEC0CA]" />
              </span>
            </Button>

            <Button className="justify-startrounded-[5px] flex border border-[#D5D5D5] bg-transparent p-2.5 text-black">
              <span>Most Recent</span>
              <span>
                <ChevronDown className="text-[#BEC0CA]" />
              </span>
            </Button>
          </div>
        </div>

        <Button className="mt-4 rounded-xl border border-[#E9E9E9] bg-[#FAFAFA] px-2.5 py-5 text-black md:hidden">
          <span>
            <Filter />
          </span>
          <span>Filter</span>
          <span>
            <ChevronDown />
          </span>
        </Button>
        {/* "fill-[#E5E7EB] text-[#E5E7EB]" */}
        <div className="mt-10 flex flex-col gap-8.5">
          <h2 className="text-xl font-bold text-[#292929]">Review Lists</h2>

          {reviewData.map((review) => (
            <div className="relative h-[138px] md:h-full" key={review.id}>
              <CustomerReviewStarRating
                rating={review.rating}
                reviewCount={review.reviewCount}
                showRating={true}
                className="absolute top-0 right-0 md:static"
              />

              <p className="absolute top-6 mt-2 py-1.5 text-[18px] font-medium text-[#141414] md:static">
                {review.reviewText}
              </p>

              <p className="absolute top-16 text-[#818B9C] md:static">
                {review.date}
              </p>

              <div className="flex w-full items-end justify-between py-4">
                <div className="absolute top-0 left-0 flex items-center justify-center space-x-2 md:static">
                  <div className="relative h-8 w-8">
                    <Image
                      src={review.userImage}
                      alt="user-profile-picture"
                      fill
                      object-fit="cover"
                      object-position="center"
                    />
                  </div>
                  <p className="font-medium text-[#0B0F0E]">
                    {review.userName}
                  </p>
                </div>

                <div className="absolute bottom-2 left-0 flex items-center gap-2 md:static">
                  <Button className="flex items-center justify-center rounded-xl border-[#E4E9EE] bg-[#FFFFFF] p-1 text-[#141414] md:border md:p-5.5">
                    <span>
                      <ThumbsUp className="h-5.5" />
                    </span>

                    <span className="text-[16px]">{review.likes}</span>
                  </Button>

                  <Button className="rounded-xl border-[#E4E9EE] bg-[#FFFFFF] p-1 text-[#141414] md:border md:p-5.5">
                    <ThumbsDown />
                  </Button>
                </div>
              </div>

              <hr className="border-0.5 absolute right-0 bottom-0 left-0 mt-2 border-dashed border-[#A3A3A3] md:static" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
