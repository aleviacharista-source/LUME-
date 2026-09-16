import { useState, useEffect } from 'react';
import { Product, FilterState } from '../types/product';
import { productService } from '../services/productService';

export function useProducts(filters?: FilterState) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (filters) {
      productService.filterProducts(filters).then((data) => {
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      });
    } else {
      productService.getProducts().then((data) => {
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [
    filters?.category.join(','),
    filters?.priceRange.join(','),
    filters?.finish.join(','),
    filters?.shade.join(','),
    filters?.sortBy,
  ]);

  return { products, loading };
}
