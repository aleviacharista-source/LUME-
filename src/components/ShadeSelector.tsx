import React from 'react';
import { Shade } from '../types/product';

interface ShadeSelectorProps {
  shades: Shade[];
  selectedShade: Shade;
  onSelectShade: (shade: Shade) => void;
}

export const ShadeSelector: React.FC<ShadeSelectorProps> = ({
  shades,
  selectedShade,
  onSelectShade,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs tracking-wider uppercase">
        <span className="text-[#777777]">Shade:</span>
        <span className="font-semibold text-[#111111]">{selectedShade.name}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {shades.map((shade) => {
          const isSelected = selectedShade.id === shade.id;

          return (
            <button
              key={shade.id}
              onClick={() => onSelectShade(shade)}
              className="relative p-0.5 group focus:outline-none transition-transform"
              title={shade.name}
              aria-label={`Select shade ${shade.name}`}
            >
              {/* Selected shade: black outer ring, white gap, colored inner circle */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'ring-1 ring-[#111111] p-[2px] bg-white'
                    : 'group-hover:scale-105'
                }`}
              >
                <span
                  className="w-full h-full rounded-full border border-black/15 block"
                  style={{ backgroundColor: shade.color }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShadeSelector;
