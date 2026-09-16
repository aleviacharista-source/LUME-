import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCartItems, wishlist, setIsCartOpen, setIsSearchOpen } = useShop();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'NEW', path: '/shop?filter=new' },
    { name: 'MAKEUP', path: '/shop' },
    { name: 'LIPS', path: '/shop?category=Lips' },
    { name: 'FACE', path: '/shop?category=Face' },
    { name: 'EYES', path: '/shop?category=Eyes' },
    { name: 'SKINCARE', path: '/shop?category=Skincare' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#F7F4EF]/85 backdrop-blur-md border-b border-[#E8DED2]/70 py-3.5'
            : 'bg-[#F7F4EF]/50 backdrop-blur-sm border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Trigger & Mobile Brand */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#111111] hover:text-[#777777] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="text-xs tracking-widest font-semibold uppercase text-[#111111]">
              MENU
            </span>
          </div>

          {/* Desktop Left / Center Brand Logo */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-medium text-[#111111] hover:opacity-85 transition-opacity"
            >
              LUMÉ
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[13px] tracking-[0.18em] font-medium text-[#111111] hover:text-[#777777] transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#111111] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Actions: Search, Wishlist, Bag */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] text-[#111111] hover:text-[#777777] transition-colors p-1"
              aria-label="Open search dialog"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">SEARCH</span>
            </button>

            <Link
              to="/wishlist"
              className="flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] text-[#111111] hover:text-[#777777] transition-colors relative p-1"
              aria-label="View wishlist"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">WISHLIST</span>
              {wishlist.length > 0 && (
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#111111] text-[#F7F4EF] text-[9px] font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] text-[#111111] hover:text-[#777777] transition-colors relative p-1"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">BAG</span>
              {totalCartItems > 0 && (
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#111111] text-[#F7F4EF] text-[9px] font-bold">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-[#F7F4EF] border-b border-[#E8DED2] p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base tracking-[0.2em] font-medium text-[#111111] py-2 border-b border-[#E8DED2]/40"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 flex items-center justify-between text-xs tracking-widest text-[#777777]">
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                  OUR PHILOSOPHY
                </Link>
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                  SAVED ({wishlist.length})
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
