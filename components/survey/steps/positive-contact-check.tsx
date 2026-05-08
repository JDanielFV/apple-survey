"use client";

import { motion } from "framer-motion";

interface PositiveContactCheckViewProps {
  onAnswer: (wantsContact: boolean) => void;
}

export function PositiveContactCheckView({ onAnswer }: PositiveContactCheckViewProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 max-w-sm mx-auto text-center">
      <div className="space-y-4">
        <h2 className="survey-title !text-center">
          ¿Te gustaría que te ayudáramos con esto?
        </h2>
        <p className="survey-light">
          Nos encantaría brindarte una solución a la medida. ¿Te gustaría que un asesor se comunique contigo para darte más información?
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={() => onAnswer(true)}
          className="btn-premium w-full py-5 rounded-2xl text-lg"
        >
          Sí, me gustaría
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="w-full bg-white border-2 border-gray-100 text-gray-500 font-bold py-5 rounded-2xl hover:border-guinda/20 hover:bg-guinda/[0.02] transition-all"
        >
          No por ahora
        </button>
      </div>
    </div>
  );
}
