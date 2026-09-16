import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { productService } from '../services/productService';
import { Product } from '../types/product';
import { formatIDR } from '../utils/formatters';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const popularSearches = [
    'Lipstick',
    'Lip Gloss',
    'Glow Serum',
    'Skin Tint',
    'Cloud Blush',
    'Cushion Foundation',
  ];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(() => {
      productService.searchProducts(query).then((items) => {
        setResults(items);
        setIsSearching(false);
      });
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F4EF]/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200">
      {/* Top Bar with Input */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-8 pb-4 flex items-center justify-between border-b border-[#E8DED2]">
        <div className="flex items-center gap-3 w-full">
          <Search className="w-5 h-5 text-[#111111]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PRODUCTS, SHADES, OR RITUALS..."
            className="w-full bg-transparent text-lg sm:text-2xl font-light text-[#111111] placeholder:text-[#777777]/60 focus:outline-none tracking-wider uppercase font-sans"
          />
        </div>
        <button
          onClick={() => setIsSearchOpen(false)}
          className="p-2 text-[#111111] hover:opacity-60 transition-opacity ml-4"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 overflow-y-auto flex-grow">
        {/* If no query entered: Show Popular Searches */}
        {!query.trim() && (
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#777777] block mb-4">
              POPULAR SEARCHES
            </span>
            <div className="flex flex-wrap gap-2 mb-10">
              {popularSearches.map((item) => (
                <button
                  key={item}
                  onClick={() => handlePopularSearch(item)}
                  className="px-4 py-2 border border-[#E8DED2] bg-white/60 hover:border-[#111111] text-xs tracking-wider text-[#111111] uppercase transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#777777] block mb-4">
              RECOMMENDED COLLECTIONS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  navigate('/shop?category=Lips');
                }}
                className="p-4 bg-white/70 border border-[#E8DED2] text-left hover:border-[#111111] transition-all"
              >
                <p className="font-serif text-lg text-[#111111]">Lips</p>
                <p className="text-[11px] text-[#777777] tracking-wider uppercase mt-1">
                  Velvets & Mirror Glaze
                </p>
              </button>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  navigate('/shop?category=Face');
                }}
                className="p-4 bg-white/70 border border-[#E8DED2] text-left hover:border-[#111111] transition-all"
              >
                <p className="font-serif text-lg text-[#111111]">Face</p>
                <p className="text-[11px] text-[#777777] tracking-wider uppercase mt-1">
                  Skin Veil & Whipped Blush
                </p>
              </button>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  navigate('/shop?category=Skincare');
                }}
                className="p-4 bg-white/70 border border-[#E8DED2] text-left hover:border-[#111111] transition-all"
              >
                <p className="font-serif text-lg text-[#111111]">Skincare</p>
                <p className="text-[11px] text-[#777777] tracking-wider uppercase mt-1">
                  Barrier Repair & Radiance
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Searching indicator */}
        {isSearching && (
          <div className="py-12 text-center text-xs tracking-widest text-[#777777] uppercase">
            SEARCHING LUMÉ ARCHIVE...
          </div>
        )}

        {/* Results */}
        {!isSearching && query.trim() && results.length > 0 && (
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DED2] mb-6">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#777777] uppercase">
                {results.length} RESULTS FOR "{query}"
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="flex items-center gap-4 p-3 bg-white/70 border border-[#E8DED2]/80 hover:border-[#111111] transition-all cursor-pointer group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover bg-[#ECE7DE]"
                  />
                  <div className="flex-grow">
                    <span className="text-[10px] tracking-wider text-[#777777] uppercase block">
                      {product.category}
                    </span>
                    <h4 className="text-sm font-medium text-[#111111] group-hover:text-[#777777] transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-xs font-mono font-medium text-[#111111]">
                      {formatIDR(product.price)}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#777777] group-hover:text-[#111111] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {!isSearching && query.trim() && results.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-serif text-2xl text-[#111111] mb-2">NO MATCHES FOUND</p>
            <p className="text-xs tracking-wider text-[#777777] uppercase max-w-sm mx-auto">
              We couldn't find any products matching "{query}". Try checking your spelling or exploring our curated categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
