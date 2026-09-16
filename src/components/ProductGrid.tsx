import React from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  emptyMessage = 'No products found.',
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="flex flex-col animate-pulse">
            <div className="w-full aspect-[4/5] bg-[#E8DED2]/60 rounded-sm mb-3" />
            <div className="h-3 w-16 bg-[#E8DED2]/60 rounded mb-2" />
            <div className="h-4 w-32 bg-[#E8DED2]/80 rounded mb-2" />
            <div className="h-3 w-20 bg-[#E8DED2]/60 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center">
        <p className="font-serif text-2xl text-[#111111] mb-2">NO PRODUCTS FOUND</p>
        <p className="text-xs tracking-wider text-[#777777] uppercase max-w-sm">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
