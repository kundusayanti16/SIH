import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useSchool();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border transition-all duration-300 animate-slide-down bg-white ${
            toast.type === 'error'
              ? 'border-rose-300 text-[#24332C]'
              : toast.type === 'info'
              ? 'border-[#3AA6A0] text-[#24332C]'
              : 'border-[#5F9F7A] text-[#24332C]'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-[#3AA6A0] shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#5F9F7A] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-sm font-semibold leading-relaxed text-[#24332C]">
            {toast.message}
          </div>
        </div>
      ))}
    </div>
  );
}
