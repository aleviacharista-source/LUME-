import React, { useState } from 'react';
import { Sparkles, ArrowRight, Bot, Compass, Shield, Leaf } from 'lucide-react';
import { productService } from '../services/productService';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';

export const About: React.FC = () => {
  const [aiQuery, setAiQuery] = useState('I want a natural everyday makeup look.');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<{
    message: string;
    recommendedProducts: Product[];
  } | null>(null);

  const samplePrompts = [
    'I want a natural everyday makeup look.',
    'Formulations for maximum glass skin hydration and glow.',
    'An evening glam look with bold lipstick and defined eyes.',
  ];

  const handleAskAi = async (promptText: string) => {
    setAiQuery(promptText);
    setAiLoading(true);
    try {
      const res = await productService.getBeautyAiRecommendations(promptText);
      setAiResponse(res);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-[#F7F4EF] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#777777] block mb-3">
            THE ATELIER
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#111111] leading-tight mb-6">
            ARCHITECTURAL COSMETICS.
            <br />
            HONORING AUTHENTIC SKIN.
          </h1>
          <p className="text-sm sm:text-base text-[#777777] leading-relaxed">
            LUMÉ was founded on a singular conviction: luxury beauty should not conceal individuality under heavy synthetic layers. We formulate biomimetic lipids, light-diffusing optical minerals, and botanical antioxidants that work in synergy with living cellular tissue.
          </p>
        </div>

        {/* Brand Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20 border-b border-[#E8DED2]">
          <div className="p-8 bg-white border border-[#E8DED2]">
            <Compass className="w-6 h-6 text-[#111111] mb-4" />
            <h3 className="font-serif text-2xl text-[#111111] mb-2">Architectural Casing</h3>
            <p className="text-xs text-[#777777] leading-relaxed">
              Every lipstick bullet, glass flacon, and compact is engineered with weighted magnetic mechanisms and precision ergonomic geometry for an indelible sensory ritual.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E8DED2]">
            <Leaf className="w-6 h-6 text-[#111111] mb-4" />
            <h3 className="font-serif text-2xl text-[#111111] mb-2">Cellular Integrity</h3>
            <p className="text-xs text-[#777777] leading-relaxed">
              Formulated without volatile parabens, talc fillers, or pore-blocking mineral waxes. Every ingredient serves a dual cosmetic and dermatological purpose.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E8DED2]">
            <Shield className="w-6 h-6 text-[#111111] mb-4" />
            <h3 className="font-serif text-2xl text-[#111111] mb-2">Sustainable Luxury</h3>
            <p className="text-xs text-[#777777] leading-relaxed">
              100% cruelty-free, vegan certified, and housed in endlessly recyclable flint glass flacons with replenishable refill inner pods.
            </p>
          </div>
        </div>

        {/* Section 33: BEAUTY AI ASSISTANT ARCHITECTURE SHOWCASE */}
        <div className="pt-20">
          <div className="bg-[#111111] text-white p-8 sm:p-14 lg:p-16">
            <div className="max-w-2xl mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-4 h-4 text-[#C9B8A8]" />
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C9B8A8]">
                  INNOVATION PREVIEW
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mb-3">
                LUMÉ BEAUTY AI ASSISTANT
              </h2>
              <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                Our bespoke intelligent formulation advisor. Powered by architectural cosmetic intelligence and prepared for Google Gemini API integration, Beauty AI matches routines to your unique skin profile, climate, and personal aesthetic.
              </p>
            </div>

            {/* Prompt Selector & Input */}
            <div className="space-y-4 max-w-2xl mb-8">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#777777] block">
                Sample Consultations:
              </span>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleAskAi(p)}
                    className="px-3.5 py-2 text-xs bg-[#1F1F1F] hover:bg-[#2B2B2B] text-[#E8DED2] border border-[#333333] transition-colors text-left"
                  >
                    "{p}"
                  </button>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Describe your desired look, undertone, or skin need..."
                  className="flex-grow p-3 bg-[#1F1F1F] border border-[#333333] text-xs text-white placeholder:text-[#666666] focus:outline-none focus:border-[#C9B8A8]"
                />
                <button
                  onClick={() => handleAskAi(aiQuery)}
                  disabled={aiLoading}
                  className="px-6 py-3 bg-[#F7F4EF] text-[#111111] text-xs font-semibold tracking-wider uppercase hover:bg-white transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{aiLoading ? 'ANALYZING...' : 'CURATE'}</span>
                </button>
              </div>
            </div>

            {/* AI Results Presentation */}
            {aiResponse && (
              <div className="mt-8 pt-8 border-t border-[#2A2A2A] animate-in fade-in duration-300">
                <p className="text-xs text-[#C9B8A8] font-mono mb-6">
                  {aiResponse.message}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {aiResponse.recommendedProducts.map((p) => (
                    <div key={p.id} className="bg-[#1A1A1A] p-3 border border-[#2E2E2E]">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full aspect-[4/5] object-cover mb-3"
                      />
                      <p className="text-xs text-[#777777] uppercase tracking-wider">{p.category}</p>
                      <h4 className="text-sm font-medium text-white line-clamp-1">{p.name}</h4>
                      <p className="text-xs font-mono text-[#C9B8A8] mt-1">
                        Rp {p.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
