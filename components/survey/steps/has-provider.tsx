"use client";

import { motion } from "framer-motion";

interface HasProviderViewProps {
  onAnswer: (has_provider: boolean) => void;
}

export function HasProviderView({ onAnswer }: HasProviderViewProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 gap-12 max-w-sm mx-auto">
      <div className="text-center space-y-4">
        <h2 className="survey-title !text-center !text-[32px]">
          ¿Ya tienes un proveedor que solvente esa necesidad?
        </h2>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={() => onAnswer(true)}
          className="w-full bg-gray-50 text-gray-400 font-black py-5 rounded-2xl hover:bg-gray-100 transition-all border-2 border-transparent hover:border-gray-200"
        >
          Sí, ya cuento con uno
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="w-full bg-black text-white font-black py-5 rounded-2xl shadow-xl shadow-black/10 active:scale-95 transition-all"
        >
          No, estoy buscando
        </button>
      </div>
    </div>
  );
}
