import React from "react";
import { Star, BookOpen, Users } from "lucide-react";
import { Button } from "@mui/material";
import { bookBtn } from "@/styles/card";
import { useRouter } from "next/navigation";

interface CardHorizontalProps {
  courseId: string;
  image?: string | null;
  title?: string;
  rating?: number;
  reviews?: number;
  lessons?: number;
  students?: number;
  price?: number | string;
  width?: number;
  height?: number;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  description?: string;
  showBookNow?: boolean;
}

const CardHorizontal: React.FC<CardHorizontalProps> = ({
  image = "/image.png",
  title = "Untitled Course",
  courseId,
  rating,
  reviews,
  lessons,
  students,
  price,
  width = 793,
  height = 196,
  imageWidth = 292,
  imageHeight = 195,
  description,
  showBookNow = false,
  className = "",
}) => {
    const router = useRouter();
  
  return (
    <div className={`flex items-start gap-6 max-w-[820px] w-full cursor-pointer ${className}`}       onClick={() => router.push(`/courses/${courseId}`)}
       >
      {image && (
        <div
          className="flex-shrink-0 overflow-hidden border"
          style={{
            width: imageWidth,
            borderRadius: 8,
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-auto block rounded-md"
          />
        </div>
      )}

      {/* details */}
      <div className="flex flex-col justify-center ml-4 gap-5 w-full">
        {/* Title + Rating + Description */}
        <div className="flex flex-col gap-2">
          {/* Rating Row */}
          {(rating !== undefined || reviews) && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={
                      i < Math.round(rating ?? 0) ? "#FACC15" : "transparent"
                    }
                    stroke="#FACC15"
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm font-medium">{rating}</p>
              {reviews && <p className="text-gray-500 text-sm">({reviews})</p>}
            </div>
          )}

          {/* Title */}
          {title && (
            <h3 className="text-xl font-semibold text-gray-900 leading-tight">
              {title}
            </h3>
          )}

          {/* Description */}
          {description && (
            <p className="text-gray-600 text-sm leading-5 max-w-[450px]">
              {description}
            </p>
          )}
        </div>

        {/* Lessons + Students */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          {lessons && (
            <div className="flex items-center gap-2">
              <BookOpen size={18} />
              <span>{lessons} Lessons</span>
            </div>
          )}

          {students && (
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>{students} Students</span>
            </div>
          )}
        </div>

        {/* Price + Book Now (aligned left + right) */}
        <div className="flex items-center justify-between w-full mt-2">
          {/* Price */}
          {price && (
            <span className="text-[#006661] text-xl font-semibold">
              {typeof price === "number" ? `$${price}` : price}
            </span>
          )}

          {/* Book button */}
          {showBookNow && <Button sx={bookBtn(false)}>Book now</Button>}
        </div>
      </div>
    </div>
  );
};

export default CardHorizontal;
