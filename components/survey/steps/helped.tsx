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
  "Costos",
  "Organización",
  "No necesariamente",
  "Otro"
];

export function HelpedView({ onNext }: HelpedViewProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (opt: string) => {
    const isExclusive = opt === "No necesariamente" || opt === "Otro";

    setSelected(prev => {
      // Si ya está seleccionada, simplemente la quitamos
      if (prev.includes(opt)) {
        return prev.filter(i => i !== opt);
      }

      // Si es una opción exclusiva, limpia todo lo demás y solo deja esta
      if (isExclusive) {
        return [opt];
      }

      // Si es una opción normal, nos aseguramos de quitar las exclusivas si estaban activas
      return [...prev.filter(i => i !== "No necesariamente" && i !== "Otro"), opt];
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 max-w-md mx-auto">
      <div className="text-center space-y-4">
        <h2 className="survey-title !text-center">
          ¿Te hemos ayudado en algo?
        </h2>
        <p className="survey-light">Selecciona una o varias opciones</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {OPTIONS.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-base transition-all border-2 ${
                isSelected 
                  ? "bg-guinda border-guinda text-white shadow-lg shadow-guinda/20" 
                  : "bg-white border-gray-100 text-gray-600 hover:border-guinda/30 hover:bg-guinda/[0.02]"
              }`}
            >
              <span className="truncate mr-2">{opt}</span>
              {isSelected && <Check className="w-4 h-4 shrink-0" />}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onNext(selected)}
        disabled={selected.length === 0}
        className="btn-premium w-full py-5 rounded-2xl text-lg disabled:opacity-30 disabled:pointer-events-none"
      >
        Continuar
      </button>
    </div>
  );
}
