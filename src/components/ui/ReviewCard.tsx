import React from 'react';
import { format } from 'date-fns';
import { Review } from '@/lib/reviews';
import { StarRating } from './StarRating';
import { Check } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // Format the date
  const formattedDate = format(new Date(review.date), 'MMM d, yyyy');
  
  return (
    <div className="border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-gray-900">{review.title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={review.rating} />
            <span className="text-gray-600 text-sm">
              {review.rating.toFixed(1)}
            </span>
          </div>
        </div>
        {review.isVerified && (
          <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
            <Check className="h-3 w-3" />
            <span>Verified Purchase</span>
          </div>
        )}
      </div>
      
      <p className="text-gray-700 mb-4">{review.content}</p>
      
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="font-medium">{review.userName}</span>
        <span>•</span>
        <time dateTime={review.date}>{formattedDate}</time>
      </div>
    </div>
  );
};
