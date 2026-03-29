"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StarRatingHover } from "./starRatingHover";
import { usePostReview } from "@/lib/hooks/userDashboard/useUser";
import { postUserReviews } from "@/services/apiServices/userDashboard";

export type WriteReview = {
  open: boolean;
  pid: string;
  onClose: () => void;
};
export default function WriteReviewModal({ open, onClose, pid }: WriteReview) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);

  const { mutate: create, isPending, error } = usePostReview();

  const handleSubmit = () => {
    const payload = {
      pid,
      rating,
      review,
      images,
    };
    console.log(payload, "payload");
    create(payload);
    //postUserReviews(payload);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Write a Review
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Rating */}
          <div>
            <label className="text-sm font-medium">Rating</label>
            <div className="mt-2 flex gap-2">
              <StarRatingHover value={rating} onChange={setRating} />
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label className="text-sm font-medium">Review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="mt-2 w-full rounded-lg border p-2 text-sm outline-none focus:border-[#2E7D32]"
              rows={4}
            />
          </div>

          {/* Submit */}
          <Button
            disabled={isPending}
            onClick={handleSubmit}
            className="w-full bg-[#2E7D32] hover:bg-[#246628]"
          >
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
