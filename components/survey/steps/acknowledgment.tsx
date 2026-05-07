"use client";

import { motion } from "framer-motion";

interface AcknowledgmentViewProps {
  onAnswer: (wantsContact: boolean) => void;
}

export function AcknowledgmentView({ onAnswer }: AcknowledgmentViewProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-8 text-center gap-10 max-w-sm mx-auto">
      <div className="space-y-6">
        <h2 className="survey-title !text-center !text-[32px]">
          Agradecemos tu sinceridad. Estamos trabajando constantemente en mejorar nuestra calidad de servicio
        </h2>
        
        <p className="survey-light !text-[18px]">
          Lamentamos el inconveniente que hayas podido tener con nosotros. Si nos das la oportunidad nuestro representante se comunicará contigo
        </p>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={() => onAnswer(false)}
          className="flex-1 bg-gray-50 text-gray-400 font-black py-5 rounded-2xl hover:bg-gray-100 transition-all"
        >
          No, gracias
        </button>
        <button
          onClick={() => onAnswer(true)}
          className="flex-1 bg-black text-white font-black py-5 rounded-2xl shadow-xl shadow-black/10 transition-all active:scale-95"
        >
          Sí, por favor
        </button>
      </div>
    </div>
  );
}
