import React, { useState, useEffect } from 'react';
import { Review, fetchReviews, submitReview } from '@/lib/reviews';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { StarRating } from '@/components/ui/StarRating';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { verifyOrder } from '@/lib/orders';

interface ReviewsSectionProps {
  productId: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);

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
  
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const handleVerifyOrder = async () => {
    if (!orderId.trim()) {
      setVerificationError('Please enter a valid order ID');
      return;
    }

    try {
      setVerificationLoading(true);
      setVerificationError(null);
      const verificationResult = await verifyOrder(orderId, productId);
      
      if (verificationResult.valid) {
        setIsVerified(true);
      } else {
        setVerificationError(verificationResult.message || 'This order is not eligible for reviewing this product');
      }
    } catch (err) {
      setVerificationError('Failed to verify order. Please try again later.');
      console.error('Error verifying order:', err);
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewText.trim() || reviewRating === 0) {
      setVerificationError('Please provide both a rating and review text');
      return;
    }

    try {
      setSubmittingReview(true);
      const newReview = await submitReview({
        productId,
        rating: reviewRating,
        content: reviewText,
        title: "User Review", // ✅ Provide a default or user-inputted title
      });
      setReviews([newReview, ...reviews]);
      resetReviewForm();
    } catch (err) {
      setVerificationError('Failed to submit review. Please try again.');
      console.error('Error submitting review:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  const resetReviewForm = () => {
    setShowReviewForm(false);
    setOrderId('');
    setIsVerified(false);
    setReviewText('');
    setReviewRating(0);
    setVerificationError(null);
  };

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
              <PrimaryButton 
                onClick={() => setShowReviewForm(true)}
                className="w-full md:w-auto"
              >
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

      {/* Review Form Modal */}
      <Modal 
        isOpen={showReviewForm} 
        onClose={resetReviewForm}
        title={isVerified ? "Write Your Review" : "Verify Your Purchase"}
      >
        {!isVerified ? (
          <div className="space-y-4">
            <p className="text-gray-700">
              To ensure authentic reviews, please verify your purchase by entering your Order ID.
            </p>
            <Input
              label="Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your order ID"
            />
            {verificationError && (
              <p className="text-red-500 text-sm">{verificationError}</p>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <PrimaryButton
                onClick={handleVerifyOrder}
                loading={verificationLoading}
                disabled={verificationLoading}
              >
                Verify Order
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Rating
              </label>
              <StarRating 
                rating={reviewRating} 
                onRatingChange={setReviewRating}
                interactive={true}
                size="lg"
              />
            </div>
            <Input
              label="Your Review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this product..."
              multiline
              rows={4}
            />
            {verificationError && (
              <p className="text-red-500 text-sm">{verificationError}</p>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={resetReviewForm}
                className="px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <PrimaryButton
                onClick={handleSubmitReview}
                loading={submittingReview}
                disabled={submittingReview}
              >
                Submit Review
              </PrimaryButton>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};