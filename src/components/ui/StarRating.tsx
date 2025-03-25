import React from "react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  onRatingChange?: (newRating: number) => void; // Add this line
  interactive?: boolean; // Add this line
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  max = 5,
  size = "md",
  className = "",
  onRatingChange,
  interactive = false,
}) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - filledStars - (hasHalfStar ? 1 : 0);

  // Size classes
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const starSize = sizeClasses[size];

  // Handle click event for interactive rating
  const handleRatingClick = (newRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* Filled stars */}
      {Array.from({ length: filledStars }).map((_, i) => (
        <svg
          key={`filled-${i}`}
          className={`text-yellow-400 ${starSize} ${
            interactive ? "cursor-pointer" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          onClick={() => handleRatingClick(i + 1)}
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <svg
          className={`text-yellow-400 ${starSize} ${
            interactive ? "cursor-pointer" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          onClick={() => handleRatingClick(filledStars + 0.5)}
        >
          <defs>
            <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path
            fillRule="evenodd"
            fill="url(#half-fill)"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg
          key={`empty-${i}`}
          className={`text-gray-300 ${starSize} ${
            interactive ? "cursor-pointer" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          onClick={() => handleRatingClick(filledStars + (hasHalfStar ? 1 : 0) + i + 1)}
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};
