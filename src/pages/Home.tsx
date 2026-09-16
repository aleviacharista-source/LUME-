import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { FeaturedCollection } from '../components/FeaturedCollection';
import { ProductGrid } from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';
import { ArrowRight, Sparkles, Shield, Droplets, Leaf } from 'lucide-react';

export const Home: React.FC = () => {
  // New arrivals (first 4 items marked as new or best sellers)
  const newArrivals = PRODUCTS.filter((p) => p.isNew || p.isBestSeller).slice(0, 4);

  return (
    <div className="bg-[#F7F4EF] min-h-screen">
      {/* 1. Full-screen Hero Section with 3D Product */}
      <Hero />

      {/* 2. Brand Value Pillars Bar */}
      <section className="py-10 border-b border-[#E8DED2]/60 bg-[#ECE7DE]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Droplets className="w-5 h-5 text-[#111111] mb-2" />
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111]">
                BIO-MIMETIC LIPIDS
              </h4>
              <p className="text-[11px] text-[#777777] mt-1">Absorbs like natural cellular moisture</p>
            </div>
            <div className="flex flex-col items-center">
              <Sparkles className="w-5 h-5 text-[#111111] mb-2" />
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111]">
                PRISMATIC RADIANCE
              </h4>
              <p className="text-[11px] text-[#777777] mt-1">Zero glitter, authentic glass skin sheen</p>
            </div>
            <div className="flex flex-col items-center">
              <Leaf className="w-5 h-5 text-[#111111] mb-2" />
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111]">
                100% CLEAN & VEGAN
              </h4>
              <p className="text-[11px] text-[#777777] mt-1">Cruelty-free & dermatologist tested</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-5 h-5 text-[#111111] mb-2" />
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111]">
                WHITE-GLOVE SERVICE
              </h4>
              <p className="text-[11px] text-[#777777] mt-1">Signature packaging & shade exchange</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. New Arrivals Section */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#777777] uppercase block mb-2">
              SEASONAL EDIT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] tracking-tight">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            to="/shop?filter=new"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] font-medium uppercase text-[#111111] border-b border-[#111111] pb-1 hover:text-[#777777] hover:border-[#777777] transition-colors mt-4 md:mt-0"
          >
            <span>VIEW ALL NEW</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Grid */}
        <ProductGrid products={newArrivals} />
      </section>

      {/* 4. Featured Collection (Shop the Look) */}
      <FeaturedCollection />

      {/* 5. 3D Virtual Studio Banner */}
      <section className="py-24 bg-[#ECE7DE]/50 border-b border-[#E8DED2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111111] text-[#F7F4EF] p-8 sm:p-14 lg:p-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C9B8A8] block mb-3">
                INTERACTIVE 3D SHOWROOM
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white mb-6">
                EXPERIENCE LUXURY FORMULATIONS IN REAL-TIME 3D.
              </h2>
              <p className="text-xs sm:text-sm text-[#E8DED2]/80 leading-relaxed max-w-lg mb-8">
                Rotate precision-machined casings, inspect liquid pigment viscosities, and swap shade undertones in our real-time WebGL studio. Designed for discerning beauty enthusiasts.
              </p>
              <Link
                to="/product/lume-velvet-lip"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#F7F4EF] text-[#111111] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-all shadow-sm"
              >
                <span>TEST DRIVE LIP BULLET IN 3D</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-black/40 border border-white/10 text-center">
              <div className="w-20 h-20 rounded-full border border-[#C9B8A8]/40 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-[#C9B8A8]" />
              </div>
              <p className="font-serif text-xl text-white mb-1">Architectural Design</p>
              <p className="text-xs text-[#777777] max-w-xs uppercase tracking-wider">
                Magnetic closures, weighted cold-touch flacons, and multi-depth botanical hydration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Editorial Quote / Statement */}
      <section className="py-24 text-center max-w-4xl mx-auto px-4">
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#777777] block mb-6">
          THE LUMÉ PHILOSOPHY
        </span>
        <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl italic text-[#111111] leading-relaxed font-light mb-8">
          “Beauty is not a mask to obscure who you are. It is an architectural light designed to honor the story written on your skin.”
        </blockquote>
        <p className="text-xs tracking-[0.25em] font-medium uppercase text-[#111111]">
          LUMÉ FORMULATION ATELIER — PARIS & JAKARTA
        </p>
      </section>
    </div>
  );
};

export default Home;
