import React from "react";
import { Star, BookOpen, Users } from "lucide-react";

interface CardHorizontalProps {
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
}

const CardHorizontal: React.FC<CardHorizontalProps> = ({
  image = "/image.png",
  title = "Untitled Course",
  rating,
  reviews,
  lessons,
  students,
  price,
  width = 793,
  height = 196,
  imageWidth = 292,
  imageHeight = 195,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center ${className}`}
      style={{
        width,
        height,
        gap: 16,
        display: "flex",
        alignItems: "center",
      }}
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
      <div className="flex flex-col justify-center gap-3 ml-4">
        {/* Box 1: Rating + Title */}
        {(rating || title) && (
          <div
            className="flex flex-col justify-start gap-2"
            style={{ width: 453, height: 66, opacity: 1 }}
          >
            {rating !== undefined && rating !== null && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.round(rating) ? "#FACC15" : "transparent"}
                      stroke="#FACC15"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm font-medium">{rating}</p>
                {reviews && (
                  <p className="text-gray-500 text-sm">({reviews})</p>
                )}
              </div>
            )}

            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
          </div>
        )}

        {/* Box 2: Lessons & Students */}
        {(lessons || students) && (
          <div
            className="flex items-center gap-5 text-sm text-gray-600"
            style={{ width: 236, height: 24, opacity: 1 }}
          >
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
        )}

        {/* Box 3: Price */}
        {price && (
          <div
            className="flex items-center text-lg font-semibold text-gray-800"
            style={{ width: 453, height: 30, opacity: 1 }}
          >
            <span className="text-[#006661]">
              {typeof price === "number" ? `$${price}` : price}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardHorizontal;
