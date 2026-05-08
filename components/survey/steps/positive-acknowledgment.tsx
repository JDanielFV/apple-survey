"use client";

import { motion } from "framer-motion";

interface PositiveAcknowledgmentViewProps {
  onNext: () => void;
}

export function PositiveAcknowledgmentView({ onNext }: PositiveAcknowledgmentViewProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-8 text-center gap-10 max-w-sm mx-auto">
      <div className="space-y-6">
        <h2 className="survey-title !text-center !text-[32px]">
          Agradecemos tu sinceridad.
        </h2>
        
        <p className="survey-light !text-[24px]">
          Estamos trabajando constantemente en mejorar nuestra calidad de servicio
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-black text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-black/10 transition-all active:scale-95"
      >
        Continuar
      </button>
    </div>
  );
}
