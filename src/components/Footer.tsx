import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setJoined(true);
      setEmail('');
      setTimeout(() => setJoined(false), 4000);
    }
  };

  return (
    <footer className="bg-[#111111] text-[#F7F4EF] pt-20 pb-12 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="pb-16 mb-16 border-b border-[#2A2A2A] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6">
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-[#C9B8A8] block mb-2">
              INNER CIRCLE
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mb-3">
              JOIN THE LUMÉ WORLD
            </h3>
            <p className="text-xs sm:text-sm text-[#777777] max-w-md leading-relaxed">
              Receive private invitations to seasonal product launches, formulation previews, and intimate beauty masterclasses.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL..."
                className="flex-grow p-4 bg-[#1A1A1A] border border-[#333333] text-xs text-white placeholder:text-[#666666] tracking-widest focus:outline-none focus:border-[#C9B8A8] uppercase font-sans"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#F7F4EF] text-[#111111] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                {joined ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>WELCOME</span>
                  </>
                ) : (
                  <>
                    <span>JOIN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Navigation columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-16 border-b border-[#2A2A2A]">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-serif text-3xl tracking-[0.25em] text-white block mb-4">
              LUMÉ
            </Link>
            <p className="text-xs text-[#777777] leading-relaxed max-w-xs">
              Futuristic beauty formulations honoring the natural architecture of skin.
            </p>
          </div>

          {/* SHOP */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#777777]">
              <li>
                <Link to="/shop?filter=new" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Makeup
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Lips" className="hover:text-white transition-colors">
                  Lips
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Face" className="hover:text-white transition-colors">
                  Face
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Eyes" className="hover:text-white transition-colors">
                  Eyes
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Skincare" className="hover:text-white transition-colors">
                  Skincare
                </Link>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4">
              HELP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#777777]">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  White-Glove Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Formulation FAQ
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Concierge Contact
                </span>
              </li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-xs text-[#777777]">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Careers & Atelier
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4">
              SOCIAL
            </h4>
            <ul className="space-y-2.5 text-xs text-[#777777]">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors block"
                >
                  Instagram @lume.atelier
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors block"
                >
                  TikTok @lumebeauty
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#555555] tracking-wider uppercase">
          <p>© {new Date().getFullYear()} LUMÉ COSMETICS INTERNATIONAL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <span className="hover:text-[#777777] cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-[#777777] cursor-pointer">TERMS OF SERVICE</span>
            <span className="hover:text-[#777777] cursor-pointer">SHADE GUARANTEE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
