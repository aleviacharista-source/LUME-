import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Truck, CreditCard, Building2, Smartphone } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatIDR } from '../utils/formatters';
import { productService } from '../services/productService';
import { OrderConfirmation, OrderInfo } from '../types/product';

export const CheckoutForm: React.FC = () => {
  const { cart, cartSubtotal, clearCart } = useShop();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);

  const [formData, setFormData] = useState<OrderInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'bank_transfer',
  });

  const shippingCost = formData.shippingMethod === 'express' ? 45000 : (cartSubtotal > 350000 ? 0 : 25000);
  const finalTotal = cartSubtotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((step + 1) as 2 | 3);
    } else if (step === 3) {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const order = await productService.createOrder(formData, cart, shippingCost);
      setConfirmation(order);
      clearCart();
      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If cart is empty and not on confirmation step
  if (cart.length === 0 && step !== 4) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <p className="font-serif text-3xl text-[#111111] mb-3">YOUR BAG IS EMPTY</p>
        <p className="text-xs tracking-wider text-[#777777] uppercase mb-8">
          Add luxury cosmetic rituals to your bag before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="inline-block px-8 py-4 bg-[#111111] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-black transition-colors"
        >
          EXPLORE CATALOG
        </Link>
      </div>
    );
  }

  // STEP 4: ORDER CONFIRMED
  if (step === 4 && confirmation) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-[#111111] text-white rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold tracking-[0.25em] text-[#777777] uppercase block mb-2">
          TRANSACTION COMPLETED
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-2">ORDER CONFIRMED</h1>
        <p className="text-sm text-[#777777] mb-8">
          Thank you for your purchase, <span className="text-[#111111] font-semibold">{confirmation.fullName}</span>. We are meticulously preparing your LUMÉ formulations with signature luxury packaging.
        </p>

        {/* Order Details Card */}
        <div className="bg-white border border-[#E8DED2] p-6 text-left mb-8 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#E8DED2]">
            <span className="text-xs tracking-wider uppercase text-[#777777]">Order Reference:</span>
            <span className="text-xs font-mono font-bold text-[#111111]">{confirmation.orderNumber}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-[#777777]">Date:</span>
            <span className="font-mono text-[#111111]">{confirmation.date}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-[#777777]">Destination:</span>
            <span className="text-[#111111]">{confirmation.address}, {confirmation.city}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-[#777777]">Payment Method:</span>
            <span className="text-[#111111] capitalize">{confirmation.paymentMethod.replace('_', ' ')}</span>
          </div>

          <div className="pt-3 border-t border-[#E8DED2] space-y-2">
            <span className="text-[11px] font-semibold tracking-wider text-[#777777] uppercase block">
              Items Ordered:
            </span>
            {confirmation.items.map((i) => (
              <div key={i.id} className="flex justify-between text-xs">
                <span>
                  {i.product.name} ({i.selectedShade.name}) × {i.quantity}
                </span>
                <span className="font-mono">{formatIDR(i.product.price * i.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8DED2] flex justify-between font-semibold text-sm">
            <span>Total Paid</span>
            <span className="font-mono">{formatIDR(confirmation.total)}</span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            to="/shop"
            className="px-8 py-4 bg-[#111111] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-black transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Steps Indicator */}
      <div className="flex items-center justify-center gap-6 sm:gap-12 mb-12">
        {[
          { num: 1, label: 'INFORMATION' },
          { num: 2, label: 'SHIPPING' },
          { num: 3, label: 'PAYMENT' },
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-medium ${
                step === s.num
                  ? 'bg-[#111111] text-white'
                  : step > s.num
                  ? 'bg-[#111111]/20 text-[#111111]'
                  : 'bg-[#E8DED2] text-[#777777]'
              }`}
            >
              {s.num}
            </span>
            <span
              className={`text-xs tracking-wider uppercase hidden sm:inline ${
                step === s.num ? 'font-semibold text-[#111111]' : 'text-[#777777]'
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form area */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#E8DED2]">
          <form onSubmit={handleNextStep} className="space-y-6">
            {/* STEP 1: INFORMATION */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-serif text-xl text-[#111111] mb-2">1. PERSONAL INFORMATION</h3>

                <div>
                  <label className="text-[11px] font-semibold tracking-wider text-[#777777] uppercase block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Maya Indah"
                    className="w-full p-3 text-xs bg-[#F7F4EF] border border-[#E8DED2] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold tracking-wider text-[#777777] uppercase block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="maya@example.com"
                      className="w-full p-3 text-xs bg-[#F7F4EF] border border-[#E8DED2] focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold tracking-wider text-[#777777] uppercase block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+62 812 3456 7890"
                      className="w-full p-3 text-xs bg-[#F7F4EF] border border-[#E8DED2] focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: SHIPPING */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-serif text-xl text-[#111111] mb-2">2. DELIVERY ADDRESS</h3>

                <div>
                  <label className="text-[11px] font-semibold tracking-wider text-[#777777] uppercase block mb-1">
                    Street Address & Building *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Jl. Senopati No. 45"
                    className="w-full p-3 text-xs bg-[#F7F4EF] border border-[#E8DED2] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold tracking-wider text-[#777777] uppercase block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Jakarta Selatan"
                      className="w-full p-3 text-xs bg-[#F7F4EF] border border-[#E8DED2] focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold tracking-wider text-[#777777] uppercase block mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="12190"
                      className="w-full p-3 text-xs bg-[#F7F4EF] border border-[#E8DED2] focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8DED2]">
                  <label className="text-[11px] font-semibold tracking-wider text-[#777777] uppercase block mb-2">
                    Shipping Method
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 border border-[#E8DED2] cursor-pointer hover:border-[#111111]">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === 'standard'}
                          onChange={handleChange}
                          className="accent-[#111111]"
                        />
                        <div>
                          <p className="text-xs font-medium text-[#111111]">Standard White-Glove (2–3 Days)</p>
                          <p className="text-[11px] text-[#777777]">Free for orders above Rp350K</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium">
                        {cartSubtotal > 350000 ? 'FREE' : 'Rp25.000'}
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-3 border border-[#E8DED2] cursor-pointer hover:border-[#111111]">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={formData.shippingMethod === 'express'}
                          onChange={handleChange}
                          className="accent-[#111111]"
                        />
                        <div>
                          <p className="text-xs font-medium text-[#111111]">Priority Same-Day Dispatch</p>
                          <p className="text-[11px] text-[#777777]">Guaranteed temperature-controlled delivery</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium">Rp45.000</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-serif text-xl text-[#111111] mb-2">3. PAYMENT METHOD</h3>
                <p className="text-xs text-[#777777] mb-4">
                  Select your preferred secure payment solution. (Simulated environment)
                </p>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3.5 border border-[#E8DED2] cursor-pointer hover:border-[#111111]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={handleChange}
                      className="accent-[#111111]"
                    />
                    <Building2 className="w-4 h-4 text-[#111111]" />
                    <div>
                      <p className="text-xs font-medium text-[#111111]">Bank Transfer (Virtual Account)</p>
                      <p className="text-[11px] text-[#777777]">BCA, Mandiri, BNI, BRI</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 border border-[#E8DED2] cursor-pointer hover:border-[#111111]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="e_wallet"
                      checked={formData.paymentMethod === 'e_wallet'}
                      onChange={handleChange}
                      className="accent-[#111111]"
                    />
                    <Smartphone className="w-4 h-4 text-[#111111]" />
                    <div>
                      <p className="text-xs font-medium text-[#111111]">E-Wallet / QRIS</p>
                      <p className="text-[11px] text-[#777777]">GoPay, OVO, ShopeePay, Dana</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 border border-[#E8DED2] cursor-pointer hover:border-[#111111]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="accent-[#111111]"
                    />
                    <CreditCard className="w-4 h-4 text-[#111111]" />
                    <div>
                      <p className="text-xs font-medium text-[#111111]">Credit / Debit Card</p>
                      <p className="text-[11px] text-[#777777]">Visa, Mastercard, JCB, American Express</p>
                    </div>
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-4 text-[11px] text-[#777777]">
                  <ShieldCheck className="w-4 h-4 text-[#111111]" />
                  <span>256-bit encrypted SSL checkout for total privacy</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#E8DED2]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((step - 1) as 1 | 2)}
                  className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-[#777777] hover:text-[#111111]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-[#777777] hover:text-[#111111]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Catalog</span>
                </Link>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-[#111111] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-black transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>PROCESSING...</span>
                ) : step === 3 ? (
                  <>
                    <span>PLACE ORDER</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>CONTINUE</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-[#ECE7DE]/50 p-6 sm:p-8 border border-[#E8DED2] h-fit space-y-6">
          <h3 className="font-serif text-lg text-[#111111] pb-3 border-b border-[#E8DED2]">
            ORDER SUMMARY ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h3>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-14 h-16 object-cover bg-white"
                />
                <div className="flex-grow">
                  <p className="text-xs font-medium text-[#111111] line-clamp-1">
                    {item.product.name}
                  </p>
                  <p className="text-[11px] text-[#777777]">
                    {item.selectedShade.name} × {item.quantity}
                  </p>
                </div>
                <span className="text-xs font-mono font-medium text-[#111111]">
                  {formatIDR(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs pt-4 border-t border-[#E8DED2]">
            <div className="flex justify-between text-[#777777]">
              <span>Subtotal</span>
              <span className="font-mono">{formatIDR(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between text-[#777777]">
              <span>Estimated Shipping</span>
              <span className="font-mono">
                {shippingCost === 0 ? 'FREE' : formatIDR(shippingCost)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-[#111111] pt-3 border-t border-[#E8DED2]">
              <span>Total</span>
              <span className="font-mono">{formatIDR(finalTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
