import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterPanel } from '../components/FilterPanel';
import { ProductGrid } from '../components/ProductGrid';
import { FilterState } from '../types/product';
import { useProducts } from '../hooks/useProducts';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const initialFilters: FilterState = useMemo(() => {
    const categoryParam = searchParams.get('category');
    const filterParam = searchParams.get('filter');

    return {
      category: categoryParam ? [categoryParam] : [],
      priceRange: [],
      finish: [],
      shade: [],
      sortBy: filterParam === 'new' ? 'newest' : 'recommended',
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Sync state if URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    const filter = searchParams.get('filter');

    setFilters((prev) => ({
      ...prev,
      category: cat ? [cat] : prev.category,
      sortBy: filter === 'new' ? 'newest' : prev.sortBy,
    }));
  }, [searchParams]);

  const { products, loading } = useProducts(filters);

  const handleResetFilters = () => {
    setFilters({
      category: [],
      priceRange: [],
      finish: [],
      shade: [],
      sortBy: 'recommended',
    });
    setSearchParams({});
  };

  const currentCategoryTitle =
    filters.category.length === 1 ? filters.category[0].toUpperCase() : 'MAKEUP & SKINCARE';

  return (
    <div className="bg-[#F7F4EF] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="border-b border-[#E8DED2] pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#777777] uppercase block mb-1">
              THE CATALOG
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#111111] tracking-tight">
              {currentCategoryTitle}
            </h1>
          </div>
          <span className="text-xs font-mono font-medium tracking-widest text-[#777777] uppercase mt-2 md:mt-0">
            {products.length} PRODUCTS AVAILABLE
          </span>
        </div>

        {/* Controls Bar: Mobile Filter Button & Sorting */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8DED2]/60">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-[#E8DED2] text-xs font-semibold tracking-wider uppercase text-[#111111]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {/* Desktop Filter Count Display */}
          <div className="hidden lg:block text-xs tracking-wider text-[#777777] uppercase">
            Showing {products.length} refined items
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs tracking-wider text-[#777777] uppercase hidden sm:inline">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })
                }
                className="appearance-none bg-white border border-[#E8DED2] px-3 py-2 pr-8 text-xs font-medium uppercase tracking-wider text-[#111111] focus:outline-none focus:border-[#111111] cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#777777] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Content Layout: Filters Left + Product Grid Right */}
        <div className="flex items-start gap-8">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            isOpenMobile={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          <div className="flex-grow w-full">
            <ProductGrid
              products={products}
              loading={loading}
              emptyMessage="Try resetting your filters or selecting another shade family."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
