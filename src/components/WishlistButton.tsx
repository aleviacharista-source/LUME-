import React from 'react';
import { Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface WishlistButtonProps {
  productId: string;
  className?: string;
  showText?: boolean;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  className = '',
  showText = false,
}) => {
  const { isInWishlist, toggleWishlist } = useShop();
  const isFavorited = isInWishlist(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 ${className}`}
      aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
    >
      <Heart
        className={`w-4 h-4 transition-colors ${
          isFavorited ? 'fill-[#111111] text-[#111111]' : 'text-[#111111]'
        }`}
      />
      {showText && (
        <span className="text-xs tracking-wider uppercase font-medium">
          {isFavorited ? 'SAVED TO WISHLIST' : 'SAVE TO WISHLIST'}
        </span>
      )}
    </button>
  );
};

export default WishlistButton;
