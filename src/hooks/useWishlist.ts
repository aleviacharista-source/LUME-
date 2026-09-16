import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/product';

export function useWishlist() {
  const { wishlist, toggleWishlist, isInWishlist } = useShop();

  const wishlistProducts: Product[] = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return {
    wishlistIds: wishlist,
    wishlistProducts,
    toggleWishlist,
    isInWishlist,
    count: wishlist.length,
  };
}
