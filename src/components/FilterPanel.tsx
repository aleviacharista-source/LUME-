import React from 'react';
import { FilterState } from '../types/product';
import { X, RotateCcw } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onReset,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const categories = ['Lips', 'Face', 'Eyes', 'Skincare'];
  const priceRanges = [
    { label: 'Under Rp100K', value: 'under-100k' },
    { label: 'Rp100K–250K', value: '100k-250k' },
    { label: 'Above Rp250K', value: 'above-250k' },
  ];
  const finishes = ['Matte', 'Glossy', 'Natural'];
  const shades = [
    { name: 'Nude', color: '#DFB591' },
    { name: 'Pink', color: '#E8A3A8' },
    { name: 'Red', color: '#9B1B28' },
    { name: 'Brown', color: '#6A564A' },
  ];

  const toggleArrayItem = (key: keyof Pick<FilterState, 'category' | 'priceRange' | 'finish' | 'shade'>, value: string) => {
    const current = filters[key];
    const exists = current.includes(value);
    const updated = exists ? current.filter((item) => item !== value) : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const hasActiveFilters =
    filters.category.length > 0 ||
    filters.priceRange.length > 0 ||
    filters.finish.length > 0 ||
    filters.shade.length > 0;

  const content = (
    <div className="space-y-8 text-[#111111]">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8DED2]">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase">FILTERS</span>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] tracking-wider text-[#777777] hover:text-[#111111] uppercase transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* CATEGORY */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#111111] mb-3">
          CATEGORY
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => {
            const checked = filters.category.includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center gap-2.5 text-xs text-[#111111] cursor-pointer hover:opacity-75 transition-opacity"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleArrayItem('category', cat)}
                  className="w-3.5 h-3.5 accent-[#111111] rounded-none border border-[#111111]"
                />
                <span className={checked ? 'font-medium' : 'text-[#777777]'}>{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#111111] mb-3">
          PRICE
        </h4>
        <div className="space-y-2">
          {priceRanges.map((p) => {
            const checked = filters.priceRange.includes(p.value);
            return (
              <label
                key={p.value}
                className="flex items-center gap-2.5 text-xs text-[#111111] cursor-pointer hover:opacity-75 transition-opacity"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleArrayItem('priceRange', p.value)}
                  className="w-3.5 h-3.5 accent-[#111111] rounded-none border border-[#111111]"
                />
                <span className={checked ? 'font-medium' : 'text-[#777777]'}>{p.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* FINISH */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#111111] mb-3">
          FINISH
        </h4>
        <div className="space-y-2">
          {finishes.map((finish) => {
            const checked = filters.finish.includes(finish);
            return (
              <label
                key={finish}
                className="flex items-center gap-2.5 text-xs text-[#111111] cursor-pointer hover:opacity-75 transition-opacity"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleArrayItem('finish', finish)}
                  className="w-3.5 h-3.5 accent-[#111111] rounded-none border border-[#111111]"
                />
                <span className={checked ? 'font-medium' : 'text-[#777777]'}>{finish}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* SHADE FAMILY */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#111111] mb-3">
          SHADE
        </h4>
        <div className="flex flex-wrap gap-2">
          {shades.map((shade) => {
            const checked = filters.shade.includes(shade.name);
            return (
              <button
                key={shade.name}
                type="button"
                onClick={() => toggleArrayItem('shade', shade.name)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs border rounded-none transition-all ${
                  checked
                    ? 'border-[#111111] bg-[#111111] text-white font-medium'
                    : 'border-[#E8DED2] bg-white/60 text-[#111111] hover:border-[#111111]'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: shade.color }}
                />
                <span>{shade.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop View */}
      <aside className="hidden lg:block w-64 flex-shrink-0 pr-8 border-r border-[#E8DED2]">
        {content}
      </aside>

      {/* Mobile Drawer / Bottom Sheet */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-sm lg:hidden">
          <div className="bg-[#F7F4EF] p-6 max-h-[85vh] overflow-y-auto w-full shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DED2] mb-6">
              <span className="font-serif text-lg text-[#111111]">FILTER PRODUCTS</span>
              <button
                onClick={onCloseMobile}
                className="p-1 text-[#111111]"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
            <div className="pt-8 mt-6 border-t border-[#E8DED2]">
              <button
                onClick={onCloseMobile}
                className="w-full py-3.5 bg-[#111111] text-white text-xs font-semibold tracking-[0.2em] uppercase"
              >
                APPLY FILTERS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
