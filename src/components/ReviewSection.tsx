import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { Review } from '../types/product';

interface ReviewSectionProps {
  reviews?: Review[];
  overallRating: number;
  reviewCount: number;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews = [],
  overallRating,
  reviewCount,
}) => {
  const [userReviews, setUserReviews] = useState<Review[]>(reviews);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');

  // Rating distribution breakdown
  const distributions = [
    { stars: 5, percentage: 82 },
    { stars: 4, percentage: 12 },
    { stars: 3, percentage: 4 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const created: Review = {
      id: Date.now().toString(),
      userName: newAuthor.trim(),
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      verified: true,
    };

    setUserReviews([created, ...userReviews]);
    setNewAuthor('');
    setNewComment('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header & Rating breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-[#E8DED2]">
        {/* Left: Big Score */}
        <div className="md:col-span-4 flex flex-col items-start">
          <span className="text-4xl sm:text-5xl font-serif text-[#111111]">
            {overallRating.toFixed(1)}
          </span>
          <div className="flex items-center gap-1 my-2 text-[#111111]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(overallRating)
                    ? 'fill-[#111111] text-[#111111]'
                    : 'text-[#C9B8A8]'
                }`}
              />
            ))}
          </div>
          <span className="text-xs tracking-wider text-[#777777] uppercase">
            Based on {reviewCount + (userReviews.length - reviews.length)} verified reviews
          </span>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-[#111111] text-xs font-semibold tracking-wider uppercase text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Right: Distribution Bars */}
        <div className="md:col-span-8 space-y-2 w-full max-w-md">
          {distributions.map((d) => (
            <div key={d.stars} className="flex items-center gap-3 text-xs text-[#777777]">
              <span className="w-12 text-right font-medium text-[#111111]">{d.stars} stars</span>
              <div className="flex-grow h-2 bg-[#E8DED2]/60 overflow-hidden">
                <div
                  className="h-full bg-[#111111] transition-all duration-500"
                  style={{ width: `${d.percentage}%` }}
                />
              </div>
              <span className="w-8 text-right font-mono text-[11px]">{d.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddReview}
          className="p-6 bg-white border border-[#E8DED2] space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#111111]">
              Submit Your Experience
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= newRating ? 'fill-[#111111] text-[#111111]' : 'text-[#C9B8A8]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="Your Full Name"
              className="p-2.5 text-xs bg-[#F7F4EF] border border-[#E8DED2] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <textarea
            required
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Describe texture, longevity, scent, or skin response..."
            className="w-full p-2.5 text-xs bg-[#F7F4EF] border border-[#E8DED2] focus:outline-none focus:border-[#111111]"
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs uppercase tracking-wider text-[#777777] hover:text-[#111111]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase hover:bg-black transition-colors"
            >
              Post Review
            </button>
          </div>
        </form>
      )}

      {/* Review Cards List */}
      <div className="space-y-6">
        {userReviews.length === 0 ? (
          <p className="text-xs text-[#777777] italic py-4">No reviews yet for this product.</p>
        ) : (
          userReviews.map((rev) => (
            <div key={rev.id} className="pb-6 border-b border-[#E8DED2]/50 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#111111]">{rev.userName}</span>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-[#777777] uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3 text-[#111111]" /> Verified
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#777777] font-mono">{rev.date}</span>
              </div>

              <div className="flex items-center gap-0.5 mb-2 text-[#111111]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < rev.rating ? 'fill-[#111111] text-[#111111]' : 'text-[#C9B8A8]'
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs text-[#777777] leading-relaxed max-w-2xl">{rev.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
