import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface CollectionItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: 'lips',
    title: 'LIPS',
    category: 'VELVET & GLAZE',
    description: 'Sculpted pigments and restorative mirror oils designed for all-day comfort.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=Lips',
  },
  {
    id: 'face',
    title: 'FACE',
    category: 'SKIN VEIL & BASE',
    description: 'Second-skin weightless foundations, cushion tints, and whipped watercolor blush.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=Face',
  },
  {
    id: 'skin',
    title: 'SKIN',
    category: 'CELLULAR RADIANCE',
    description: 'Multi-depth hydrating serums, botanical barrier creams, and prebiotic mists.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=Skincare',
  },
];

export const FeaturedCollection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F7F4EF] border-b border-[#E8DED2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#777777] uppercase block mb-2">
              CURATED RITUALS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] tracking-tight">
              SHOP THE LOOK
            </h2>
          </div>
          <p className="text-sm text-[#777777] max-w-sm mt-3 md:mt-0 leading-relaxed">
            Architectural formulas crafted to seamlessly layer across lips, complexion, and skin.
          </p>
        </div>

        {/* 3 Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {COLLECTIONS.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group relative h-[480px] sm:h-[540px] overflow-hidden bg-[#111111] flex flex-col justify-end p-8 text-[#FFFFFF]"
            >
              {/* Card Image with subtle zoom on hover */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-85 group-hover:opacity-75 transition-all duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Editorial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Content moving upward smoothly */}
              <div className="relative z-10 transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                <span className="text-[11px] font-medium tracking-[0.25em] text-[#E8DED2] uppercase block mb-1">
                  {item.category}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#E8DED2]/80 line-clamp-2 mb-6 max-w-xs font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] font-medium uppercase text-[#FFFFFF] border-b border-white/40 pb-1 group-hover:border-white transition-colors">
                  <span>EXPLORE COLLECTION</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
