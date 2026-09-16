import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductViewer3D } from './ProductViewer3D';

export const Hero: React.FC = () => {
  const [selectedHeroShade, setSelectedHeroShade] = useState({
    name: 'Dewy Squalane',
    color: '#E8DED2',
  });

  const heroShades = [
    { name: 'Dewy Clear', color: '#E8DED2' },
    { name: 'Rose Petal', color: '#E8C8CC' },
    { name: 'Pure Amber', color: '#DFB591' },
  ];

  return (
    <section className="relative min-h-[calc(100vh-80px)] w-full flex items-center bg-[#F7F4EF] overflow-hidden border-b border-[#E8DED2]/60">
      {/* Editorial Watermark Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-[#E8DED2]/40 text-[20vw] font-serif font-light tracking-widest leading-none z-0">
        LUMÉ
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start justify-center order-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#111111]">
                NEW BEAUTY COLLECTION
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[86px] xl:text-[96px] leading-[1.05] tracking-[-0.01em] font-normal text-[#111111] mb-6">
              YOUR SKIN.
              <br />
              <span className="italic font-light text-[#777777]">YOUR STORY.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#777777] max-w-md leading-relaxed mb-8">
              A high-potency fusion of botanical lipids and cellular science. Weightless formulations designed to illuminate and honor your skin’s authentic architecture.
            </p>

            {/* Interactive Hero Shade Switcher */}
            <div className="mb-8 flex items-center gap-3">
              <span className="text-xs tracking-wider uppercase text-[#777777]">Finish:</span>
              <div className="flex items-center gap-2">
                {heroShades.map((shade) => {
                  const isSelected = selectedHeroShade.name === shade.name;
                  return (
                    <button
                      key={shade.name}
                      onClick={() => setSelectedHeroShade(shade)}
                      className={`relative w-6 h-6 rounded-full transition-transform ${
                        isSelected ? 'scale-110 ring-1 ring-[#111111] ring-offset-2 ring-offset-[#F7F4EF]' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: shade.color }}
                      title={shade.name}
                      aria-label={`Select shade ${shade.name}`}
                    />
                  );
                })}
              </div>
              <span className="text-xs tracking-wide text-[#111111] font-medium ml-1">
                {selectedHeroShade.name}
              </span>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                to="/shop"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#111111] text-[#F7F4EF] text-xs font-medium tracking-[0.2em] uppercase hover:bg-black transition-all hover:gap-4 shadow-sm"
              >
                <span>SHOP COLLECTION</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/product/lume-glow-serum"
                className="inline-flex items-center justify-center px-6 py-4 border border-[#111111]/20 text-[#111111] text-xs font-medium tracking-[0.2em] uppercase hover:border-[#111111] transition-colors"
              >
                EXPLORE SERUM
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Cosmetic Product */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-6 w-full h-[400px] sm:h-[480px] lg:h-[580px] rounded-sm relative flex items-center justify-center order-2"
          >
            <div className="w-full h-full relative rounded-sm overflow-hidden bg-gradient-to-b from-[#F7F4EF] to-[#E8DED2]/30 border border-[#E8DED2]/50">
              <ProductViewer3D
                productModel="serum"
                productColor={selectedHeroShade.color}
                autoRotate={true}
                enableZoom={false}
                fallbackImage="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-full"
                interactive={true}
              />

              {/* Floating Specification Card */}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-sm border border-[#E8DED2]/60 pointer-events-none hidden sm:block">
                <p className="text-[10px] tracking-widest uppercase text-[#777777]">Featured</p>
                <p className="text-xs font-serif font-medium text-[#111111]">LUMÉ Glow Serum</p>
                <p className="text-[11px] font-mono text-[#111111]">Rp 249.000</p>
              </div>

              {/* Interactive hint */}
              <div className="absolute bottom-4 left-4 bg-white/75 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-[#E8DED2]/50 pointer-events-none text-[10px] tracking-widest uppercase text-[#777777]">
                Drag to rotate in 3D
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
