import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import { ProductGrid } from '../components/ProductGrid';
import { Heart, ArrowRight } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const { wishlistProducts, count } = useWishlist();

  return (
    <div className="bg-[#F7F4EF] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E8DED2] pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#777777] uppercase block mb-1">
              CURATED COLLECTION
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#111111] tracking-tight">
              MY WISHLIST
            </h1>
          </div>
          <span className="text-xs font-mono font-medium tracking-widest text-[#777777] uppercase mt-2 md:mt-0">
            {count} {count === 1 ? 'FORMULATION SAVED' : 'FORMULATIONS SAVED'}
          </span>
        </div>

        {count === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-white border border-[#E8DED2] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-[#C9B8A8]" />
            </div>
            <h2 className="font-serif text-2xl text-[#111111] mb-2">YOUR WISHLIST IS EMPTY</h2>
            <p className="text-xs text-[#777777] uppercase tracking-wider mb-8 leading-relaxed">
              Save your favorite luxury cosmetic formulations, shades, and rituals for future contemplation.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#111111] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-black transition-colors"
            >
              <span>EXPLORE ALL FORMULATIONS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <ProductGrid products={wishlistProducts} />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
