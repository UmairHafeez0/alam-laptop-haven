import React, { useState, useEffect } from 'react';
import { Review, fetchReviews } from '@/lib/reviews';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { StarRating } from '@/components/ui/StarRating';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

interface ReviewsSectionProps {
  productId: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchReviews(productId);
        setReviews(data);
        setError(null);
      } catch (err) {
        setError('Failed to load reviews. Please try again later.');
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadReviews();
  }, [productId]);
  
  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <>
          {/* Reviews Summary */}
          <div className="flex flex-col md:flex-row gap-8 mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <StarRating rating={averageRating} size="lg" className="mb-2" />
              <div className="text-sm text-gray-500">
                Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="md:border-l md:border-gray-200 md:pl-8 flex flex-col justify-center flex-grow">
              <p className="text-gray-700 mb-4">
                Share your thoughts with other customers
              </p>
              <PrimaryButton className="w-full md:w-auto">
                Write a Review
              </PrimaryButton>
            </div>
          </div>
          
          {/* Reviews List */}
          <div className="grid gap-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No reviews yet. Be the first to review this product!
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
