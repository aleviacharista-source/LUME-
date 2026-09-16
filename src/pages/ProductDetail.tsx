import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { Product, Shade } from '../types/product';
import { ProductGallery } from '../components/ProductGallery';
import { ShadeSelector } from '../components/ShadeSelector';
import { QuantitySelector } from '../components/QuantitySelector';
import { Accordion, AccordionItem } from '../components/Accordion';
import { ReviewSection } from '../components/ReviewSection';
import { ProductCard } from '../components/ProductCard';
import { formatIDR } from '../utils/formatters';
import { useShop } from '../context/ShopContext';
import { Star, ShieldCheck, Truck, RefreshCw, Heart, ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, isInWishlist, toggleWishlist } = useShop();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    if (id) {
      productService.getProductById(id).then((p) => {
        if (p) {
          setProduct(p);
          setSelectedShade(p.shades[0]);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="font-serif text-2xl text-[#111111] animate-pulse">LOADING FORMULATION...</p>
          <span className="text-xs text-[#777777] uppercase tracking-widest mt-2 block">
            Preparing 3D geometry and pigments
          </span>
        </div>
      </div>
    );
  }

  if (!product || !selectedShade) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl text-[#111111] mb-3">PRODUCT NOT FOUND</h2>
        <p className="text-xs text-[#777777] uppercase tracking-wider mb-8">
          The requested formulation may have been retired or moved to the seasonal archive.
        </p>
        <Link
          to="/shop"
          className="inline-block px-8 py-4 bg-[#111111] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-black transition-colors"
        >
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const handleAddToBag = () => {
    addToCart(product, selectedShade, quantity);
  };

  // Related products in the same category or bestsellers
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isBestSeller)
  ).slice(0, 4);

  // Accordion Sections
  const accordionItems: AccordionItem[] = [
    {
      id: 'details',
      title: 'PRODUCT DETAILS',
      content: (
        <ul className="list-disc list-inside space-y-1.5 text-xs text-[#777777]">
          {product.details.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      id: 'ingredients',
      title: 'INGREDIENTS & CELLULAR COMPLEX',
      content: (
        <p className="text-xs text-[#777777] leading-relaxed font-mono">
          {product.ingredients}
        </p>
      ),
    },
    {
      id: 'usage',
      title: 'HOW TO USE & APPLICATION RITUAL',
      content: (
        <p className="text-xs text-[#777777] leading-relaxed">
          {product.howToUse}
        </p>
      ),
    },
    {
      id: 'shipping',
      title: 'SHIPPING & SHADE GUARANTEE',
      content: (
        <div className="space-y-2 text-xs text-[#777777]">
          <p>
            Complimentary white-glove signature delivery on all orders over Rp350.000. Each package includes complimentary bespoke samples and luxury protective wrapping.
          </p>
          <p>
            <strong>Perfect Shade Match Guarantee:</strong> If the undertone doesn't harmonize perfectly with your skin in natural daylight, contact concierge within 14 days for a complimentary shade replacement.
          </p>
        </div>
      ),
    },
    {
      id: 'reviews',
      title: `VERIFIED REVIEWS (${product.reviewCount})`,
      content: (
        <ReviewSection
          reviews={product.reviews}
          overallRating={product.rating}
          reviewCount={product.reviewCount}
        />
      ),
    },
  ];

  return (
    <div className="bg-[#F7F4EF] min-h-screen py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-[#777777] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO CATALOG</span>
          </Link>
          <span className="text-xs tracking-wider text-[#777777] uppercase font-mono hidden sm:inline">
            SKU: {product.id.toUpperCase()}
          </span>
        </div>

        {/* 2-Column Product Layout: ~55% Left Visual, ~45% Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-[#E8DED2]">
          {/* Left Visual Column (~55%) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              productName={product.name}
              selectedShade={selectedShade}
              productModel={product.productModel}
            />
          </div>

          {/* Right Product Info Column (~45%) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Category & Badge */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-semibold tracking-[0.25em] text-[#777777] uppercase">
                {product.category} {product.subCategory ? `— ${product.subCategory}` : ''}
              </span>
              {product.isNew && (
                <span className="bg-[#111111] text-white text-[10px] tracking-[0.18em] uppercase px-2 py-0.5 font-semibold">
                  NEW
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] tracking-tight mb-3">
              {product.name}
            </h1>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5 text-[#111111]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[#111111] text-[#111111]'
                        : 'text-[#C9B8A8]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono font-medium text-[#111111]">{product.rating}</span>
              <span className="text-xs text-[#777777]">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <p className="font-mono text-2xl font-medium text-[#111111] mb-6">
              {formatIDR(product.price)}
            </p>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed mb-8">
              {product.longDescription || product.description}
            </p>

            {/* Shade Selector */}
            <div className="mb-8 pb-8 border-b border-[#E8DED2]">
              <ShadeSelector
                shades={product.shades}
                selectedShade={selectedShade}
                onSelectShade={setSelectedShade}
              />
            </div>

            {/* Quantity Selector & Add to Bag CTA */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock} />

                {/* Primary CTA: ADD TO BAG */}
                <button
                  onClick={handleAddToBag}
                  className="flex-grow py-4 bg-[#111111] hover:bg-black text-[#F7F4EF] text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-sm"
                >
                  ADD TO BAG — {formatIDR(product.price * quantity)}
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full py-3 border text-xs font-medium tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-2 ${
                  isFavorited
                    ? 'border-[#111111] bg-white text-[#111111]'
                    : 'border-[#111111]/30 text-[#111111] hover:border-[#111111]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#111111]' : ''}`} />
                <span>{isFavorited ? 'SAVED IN WISHLIST' : 'SAVE TO WISHLIST'}</span>
              </button>
            </div>

            {/* Value Guarantees */}
            <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-[#E8DED2] text-center text-[10px] text-[#777777] uppercase tracking-wider mb-8">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#111111]" />
                <span>Express Dispatch</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-[#111111]" />
                <span>Shade Guarantee</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#111111]" />
                <span>Authentic LUMÉ</span>
              </div>
            </div>

            {/* Accordion list */}
            <Accordion items={accordionItems} defaultOpenId="details" />
          </div>
        </div>

        {/* COMPLETE THE RITUAL (Recommended Products) */}
        {relatedProducts.length > 0 && (
          <section className="pt-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-semibold tracking-[0.25em] text-[#777777] uppercase block mb-1">
                  HARMONIOUS LAYERING
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111]">
                  COMPLETE THE RITUAL
                </h3>
              </div>
              <Link
                to="/shop"
                className="text-xs tracking-wider uppercase text-[#111111] border-b border-[#111111] pb-0.5"
              >
                VIEW ALL
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
