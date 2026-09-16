import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { formatIDR } from '../utils/formatters';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartSubtotal } = useShop();
  const navigate = useNavigate();

  const shippingCost = cartSubtotal > 350000 || cartSubtotal === 0 ? 0 : 25000;
  const total = cartSubtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="bg-[#F7F4EF] min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <ShoppingBag className="w-12 h-12 text-[#C9B8A8] mx-auto mb-4 stroke-1" />
          <h1 className="font-serif text-3xl text-[#111111] mb-2">YOUR BAG IS EMPTY</h1>
          <p className="text-xs text-[#777777] uppercase tracking-wider mb-8">
            Add our high-potency formulations to begin your customized ritual.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#111111] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-black transition-colors"
          >
            <span>DISCOVER LUMÉ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F4EF] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E8DED2] pb-6 mb-10">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#777777] uppercase block mb-1">
            SHOPPING BAG
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#111111]">
            YOUR SELECTION ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items Table */}
          <div className="lg:col-span-8 divide-y divide-[#E8DED2]">
            {cart.map((item) => (
              <div key={item.id} className="py-6 first:pt-0 flex gap-6 items-center">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-24 h-28 object-cover bg-[#ECE7DE] rounded-none flex-shrink-0"
                />

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] tracking-wider text-[#777777] uppercase block">
                        {item.product.category}
                      </span>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="text-base font-medium text-[#111111] hover:text-[#777777]"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-black/15"
                          style={{ backgroundColor: item.selectedShade.color }}
                        />
                        <span className="text-xs text-[#777777]">
                          {item.selectedShade.name}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-[#777777] hover:text-[#111111] transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    <div className="inline-flex items-center border border-[#111111]/30 bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 text-[#111111] hover:bg-[#F7F4EF]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 text-[#111111] hover:bg-[#F7F4EF]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono text-base font-semibold text-[#111111]">
                      {formatIDR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary Card */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 border border-[#E8DED2] h-fit space-y-6">
            <h3 className="font-serif text-xl text-[#111111] pb-4 border-b border-[#E8DED2]">
              SUMMARY
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-[#777777]">
                <span>Bag Subtotal</span>
                <span className="font-mono text-[#111111]">{formatIDR(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[#777777]">
                <span>Shipping</span>
                <span className="font-mono text-[#111111]">
                  {shippingCost === 0 ? 'FREE' : formatIDR(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#111111] pt-4 border-t border-[#E8DED2]">
                <span>Estimated Total</span>
                <span className="font-mono">{formatIDR(total)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-[#111111] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-[#777777] text-center leading-relaxed">
              Taxes calculated at checkout. Free returns on unopened cosmetic bottles within 14 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
