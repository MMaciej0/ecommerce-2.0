import { Star, StarHalf } from "lucide-react";
import { type FC } from "react";

interface RatingProps {
  rating: number;
}

const Rating: FC<RatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const complement = rating - fullStars;

  return (
    <div className="flex">
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={i}>
          <Star />
        </span>
      ))}
      {complement > 0 && <StarHalf />}
    </div>
  );
};

export default Rating;
