"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

interface ReasonViewProps {
  onNext: (reason: string) => void;
}

const REASONS = [
  "Precio",
  "Calidad",
  "No sé si lo manejen",
  "Definitivamente no cambiaré de proveedor de este producto / servicio",
  "Otro"
];

export function ReasonView({ onNext }: ReasonViewProps) {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 max-w-md mx-auto">
      <div className="text-center space-y-4">
        <h2 className="survey-title !text-center">
          De estas opciones cual sería la razón por la que no lo producimos para ti
        </h2>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {REASONS.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
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
        disabled={!selected}
        className="btn-premium w-full py-5 rounded-2xl text-lg disabled:opacity-30 disabled:pointer-events-none"
      >
        Continuar
      </button>
    </div>
  );
}
