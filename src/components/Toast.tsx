import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 bg-[#111111] text-white text-xs tracking-wider uppercase font-medium shadow-2xl animate-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-[#E8C8CC]" />
          ) : (
            <Info className="w-3.5 h-3.5 text-[#C9B8A8]" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Toast;
