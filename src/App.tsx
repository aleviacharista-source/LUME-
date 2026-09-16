import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { Toast } from './components/Toast';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';

// Scroll to top automatically when navigation occurs
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#F7F4EF] text-[#111111] antialiased selection:bg-[#111111] selection:text-[#FFFFFF]">
          {/* Sticky Responsive Luxury Navbar */}
          <Navbar />

          {/* Main Route Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Interactive Global Slide-in Cart Drawer */}
          <CartDrawer />

          {/* Full-Screen Intelligent Search Overlay */}
          <SearchOverlay />

          {/* Toast Feedback */}
          <Toast />

          {/* Editorial Minimal Footer */}
          <Footer />
        </div>
      </ShopProvider>
    </BrowserRouter>
  );
}
