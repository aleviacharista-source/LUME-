import React, { useState } from 'react';
import { Box, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { ProductViewer3D } from './ProductViewer3D';
import { Shade } from '../types/product';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  selectedShade?: Shade;
  productModel?: 'serum' | 'lipstick' | 'foundation' | 'compact' | 'cream';
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  selectedShade,
  productModel = 'serum',
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo');
  const [isZoomed, setIsZoomed] = useState(false);

  const currentImage = images[activeImageIndex] || images[0];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 w-full">
      {/* Thumbnail column */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 lg:w-20 flex-shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveImageIndex(idx);
              setViewMode('photo');
            }}
            className={`relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 border transition-all overflow-hidden rounded-none ${
              viewMode === 'photo' && activeImageIndex === idx
                ? 'border-[#111111] ring-1 ring-[#111111]'
                : 'border-[#E8DED2] opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}

        {/* 3D Viewer Thumbnail Selector */}
        <button
          onClick={() => setViewMode('3d')}
          className={`relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 border flex flex-col items-center justify-center gap-1.5 p-1 transition-all ${
            viewMode === '3d'
              ? 'border-[#111111] bg-[#111111] text-white ring-1 ring-[#111111]'
              : 'border-[#E8DED2] bg-white text-[#111111] hover:border-[#111111]'
          }`}
          title="Interactive 3D View"
        >
          <Box className="w-5 h-5" />
          <span className="text-[9px] font-semibold tracking-widest uppercase text-center leading-tight">
            3D MODEL
          </span>
        </button>
      </div>

      {/* Main Preview Area */}
      <div className="relative flex-grow aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-[#ECE7DE] overflow-hidden">
        {/* Toggle Mode Pills at Top */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setViewMode('photo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium tracking-wider uppercase transition-all backdrop-blur-md ${
              viewMode === 'photo'
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-white/80 text-[#111111] hover:bg-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>PHOTOS</span>
          </button>

          <button
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium tracking-wider uppercase transition-all backdrop-blur-md ${
              viewMode === '3d'
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-white/80 text-[#111111] hover:bg-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>VIEW IN 3D</span>
          </button>
        </div>

        {/* Photographic Mode */}
        {viewMode === 'photo' && (
          <div
            className="relative w-full h-full cursor-zoom-in overflow-hidden flex items-center justify-center"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={currentImage}
              alt={productName}
              className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
            />
            <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm p-2 text-[#111111] pointer-events-none">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* 3D Mode */}
        {viewMode === '3d' && (
          <div className="w-full h-full relative">
            <ProductViewer3D
              productModel={productModel}
              productColor={selectedShade?.modelColor || selectedShade?.color || '#E8C8CC'}
              autoRotate={true}
              enableZoom={true}
              fallbackImage={currentImage}
              className="w-full h-full"
              interactive={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
