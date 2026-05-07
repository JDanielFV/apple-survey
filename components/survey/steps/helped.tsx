"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

interface HelpedViewProps {
  onNext: (selections: string[]) => void;
}

const OPTIONS = [
  "Imagen",
  "Calidad",
  "Posicionamiento",
  "Ventas",
  "Organización",
  "Otro"
];

export function HelpedView({ onNext }: HelpedViewProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (opt: string) => {
    setSelected(prev => 
      prev.includes(opt) ? prev.filter(i => i !== opt) : [...prev, opt]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 gap-10 max-w-md mx-auto">
      <div className="text-center space-y-4">
        <h2 className="survey-title !text-center !text-[32px]">
          ¿En que te hemos ayudado?
        </h2>
        <p className="survey-light !text-[18px]">Selecciona una o varias opciones</p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {OPTIONS.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-sm transition-all border-2 ${
                isSelected 
                  ? "bg-black border-black text-white" 
                  : "bg-gray-50 border-gray-50 text-black hover:border-gray-200"
              }`}
            >
              {opt}
              {isSelected && <Check className="w-4 h-4" />}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onNext(selected)}
        disabled={selected.length === 0}
        className="w-full bg-black text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-black/10 disabled:opacity-30 disabled:shadow-none transition-all active:scale-95"
      >
        Continuar
      </button>
    </div>
  );
}
