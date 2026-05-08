"use client";

import { motion } from "framer-motion";

interface HasProviderViewProps {
  onAnswer: (has_provider: boolean) => void;
}

export function HasProviderView({ onAnswer }: HasProviderViewProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 max-w-sm mx-auto">
      <div className="text-center space-y-4">
        <h2 className="survey-title !text-center">
          ¿Ya tienes un proveedor que solvente esa necesidad?
        </h2>
        <p className="survey-light">Queremos saber si podemos ser tu mejor opción.</p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={() => onAnswer(false)}
          className="btn-premium w-full py-5 rounded-2xl text-lg"
        >
          No, estoy buscando
        </button>
        <button
          onClick={() => onAnswer(true)}
          className="w-full bg-white border-2 border-gray-100 text-gray-500 font-bold py-5 rounded-2xl hover:border-guinda/20 hover:bg-guinda/[0.02] transition-all"
        >
          Sí, ya cuento con uno
        </button>
      </div>
    </div>
  );
}
