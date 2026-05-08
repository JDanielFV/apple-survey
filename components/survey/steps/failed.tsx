"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

interface FailedViewProps {
  onNext: (categories: string[], detail: string) => void;
}

const CATEGORIES = [
  "Costo",
  "Atención",
  "Calidad",
  "Tiempo",
  "Disponibilidad",
  "Otro"
];

export function FailedView({ onNext }: FailedViewProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [detail, setDetail] = useState("");

  const toggle = (cat: string) => {
    setSelected(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 max-w-md mx-auto">
      <div className="text-center space-y-4">
        <h2 className="survey-title !text-center">
          Lamentamos que tu experiencia no haya sido la mejor. <br /> ¿En qué te hemos fallado?
        </h2>
        <p className="survey-light">Puedes seleccionar varias opciones</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {CATEGORIES.map((cat) => {
          const isSelected = selected.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => toggle(cat)}
              className={`flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-base transition-all border-2 ${
                isSelected 
                  ? "bg-guinda border-guinda text-white shadow-lg shadow-guinda/20" 
                  : "bg-white border-gray-100 text-gray-600 hover:border-guinda/30 hover:bg-guinda/[0.02]"
              }`}
            >
              <span className="truncate mr-2">{cat}</span>
              {isSelected && <Check className="w-4 h-4 shrink-0" />}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-[10px] font-black text-guinda/60 uppercase tracking-widest px-1">
          Detalles adicionales (Opcional)
        </label>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Escribe aquí..."
          className="w-full bg-white border border-gray-100 rounded-2xl p-5 text-base font-bold focus:ring-4 focus:ring-guinda/5 focus:border-guinda/30 transition-all outline-none min-h-[120px] resize-none"
        />
      </div>

      <button
        onClick={() => onNext(selected, detail)}
        disabled={selected.length === 0 && detail.length === 0}
        className="btn-premium w-full py-5 rounded-2xl text-lg disabled:opacity-30 disabled:pointer-events-none"
      >
        Enviar Comentarios
      </button>
    </div>
  );
}
