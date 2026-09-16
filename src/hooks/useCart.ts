import { useShop } from '../context/ShopContext';

export function useCart() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    cartSubtotal,
    totalCartItems,
  } = useShop();

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    cartSubtotal,
    totalCartItems,
  };
}
