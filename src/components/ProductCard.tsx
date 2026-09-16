import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../types/product';
import { formatIDR } from '../utils/formatters';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist, addToCart } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [quickAdded, setQuickAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.secondaryImage || product.images[1] || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick add default shade
    const defaultShade = product.shades[0];
    addToCart(product, defaultShade, 1);
    setQuickAdded(true);
    setTimeout(() => setQuickAdded(false), 1800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="group relative flex flex-col bg-transparent select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <Link
        to={`/product/${product.id}`}
        className="relative w-full aspect-[4/5] overflow-hidden bg-[#ECE7DE] rounded-sm block"
      >
        {/* Main Image */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Image for smooth crossfade on hover */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} preview`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Badges: NEW or BESTSELLER */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-[#111111] text-[#F7F4EF] text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 font-semibold">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-[#FFFFFF]/90 text-[#111111] backdrop-blur-sm text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 font-semibold border border-[#E8DED2]">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isFavorited
              ? 'bg-[#111111] text-white'
              : 'bg-white/80 text-[#111111] hover:bg-white hover:scale-110'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-[#111111]/90 hover:bg-[#111111] text-[#FFFFFF] text-[11px] font-medium tracking-[0.2em] uppercase backdrop-blur-sm transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {quickAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>QUICK ADD</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="pt-3.5 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-[11px] tracking-wider text-[#777777] uppercase mb-1">
          <span>{product.category}</span>
          <span className="text-[11px] text-[#111111] font-mono">★ {product.rating}</span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="text-sm sm:text-base font-medium text-[#111111] hover:text-[#777777] transition-colors line-clamp-1 font-sans"
        >
          {product.name}
        </Link>

        {/* Shades preview dots */}
        <div className="flex items-center gap-1.5 my-1.5">
          {product.shades.slice(0, 4).map((shade) => (
            <span
              key={shade.id}
              className="w-2.5 h-2.5 rounded-full border border-black/15"
              style={{ backgroundColor: shade.color }}
              title={shade.name}
            />
          ))}
          {product.shades.length > 4 && (
            <span className="text-[10px] text-[#777777] font-medium">
              +{product.shades.length - 4}
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm font-medium text-[#111111] font-mono mt-auto">
          {formatIDR(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
