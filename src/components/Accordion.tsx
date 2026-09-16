import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, defaultOpenId }) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="border-t border-[#E8DED2] divide-y divide-[#E8DED2]">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between text-left group"
              aria-expanded={isOpen}
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111] group-hover:text-[#777777] transition-colors">
                {item.title}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#777777] transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-[#111111]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="pt-3 pb-1 text-xs text-[#777777] leading-relaxed animate-in fade-in duration-200">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
