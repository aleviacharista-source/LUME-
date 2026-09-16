import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatIDR } from '../utils/formatters';
import { PRODUCTS } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    addToCart,
  } = useShop();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const shippingEstimate = cartSubtotal > 350000 || cartSubtotal === 0 ? 0 : 25000;
  const grandTotal = cartSubtotal + shippingEstimate;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  // Recommended products (excluding items already in cart)
  const cartProductIds = cart.map((i) => i.product.id);
  const recommendations = PRODUCTS.filter((p) => !cartProductIds.includes(p.id)).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F4EF] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Top Header */}
          <div className="p-6 border-b border-[#E8DED2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#111111]" />
              <span className="font-serif text-lg text-[#111111] tracking-wide uppercase">
                YOUR BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-[#111111] hover:opacity-60 transition-opacity"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-[#C9B8A8] mb-4 stroke-1" />
                <p className="font-serif text-xl text-[#111111] mb-2">YOUR BAG IS EMPTY</p>
                <p className="text-xs text-[#777777] uppercase tracking-wider mb-6 max-w-xs">
                  Discover our architectural cosmetic rituals and curated essentials.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-3 bg-[#111111] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-black transition-colors"
                >
                  START EXPLORING
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#E8DED2]">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 pb-4 flex gap-4">
                    {/* Thumbnail */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover bg-[#ECE7DE] rounded-none flex-shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-medium text-[#111111] leading-tight font-sans">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-[#777777] hover:text-[#111111] transition-colors"
                            aria-label={`Remove ${item.product.name} from cart`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Shade tag */}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/15"
                            style={{ backgroundColor: item.selectedShade.color }}
                          />
                          <span className="text-[11px] text-[#777777]">
                            {item.selectedShade.name}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-[#111111]/20 bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 text-[#111111] hover:bg-[#F7F4EF]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 text-[#111111] hover:bg-[#F7F4EF]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-mono font-medium text-[#111111]">
                          {formatIDR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* YOU MAY ALSO LIKE */}
            {recommendations.length > 0 && cart.length > 0 && (
              <div className="pt-6 border-t border-[#E8DED2]">
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#777777] block mb-3">
                  YOU MAY ALSO LIKE
                </span>
                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="flex items-center justify-between p-2.5 bg-white border border-[#E8DED2] group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={rec.images[0]}
                          alt={rec.name}
                          className="w-10 h-12 object-cover bg-[#ECE7DE]"
                        />
                        <div>
                          <p className="text-xs font-medium text-[#111111] line-clamp-1">
                            {rec.name}
                          </p>
                          <p className="text-[11px] font-mono text-[#777777]">
                            {formatIDR(rec.price)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(rec, rec.shades[0], 1)}
                        className="p-1.5 text-xs text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                        title="Add to bag"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Summary & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8DED2] bg-white/70 backdrop-blur-md space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#777777]">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatIDR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-[#777777]">
                  <span>Shipping</span>
                  <span className="font-mono">
                    {shippingEstimate === 0 ? 'FREE' : formatIDR(shippingEstimate)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#111111] pt-2 border-t border-[#E8DED2]">
                  <span>Total</span>
                  <span className="font-mono">{formatIDR(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 bg-[#111111] text-[#F7F4EF] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-black transition-all flex items-center justify-center gap-2"
              >
                <span>CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#777777] uppercase tracking-wider">
                Complimentary luxury signature gift wrap on all orders
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
