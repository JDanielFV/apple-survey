"use client";

import { motion } from "framer-motion";

interface AcknowledgmentViewProps {
  onAnswer: (wantsContact: boolean) => void;
}

export function AcknowledgmentView({ onAnswer }: AcknowledgmentViewProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center gap-10 max-w-sm mx-auto">
      <div className="space-y-6">
        <h2 className="survey-title !text-center">
          Agradecemos tu sinceridad. Estamos trabajando constantemente en mejorar nuestra calidad de servicio
        </h2>
        
        <p className="survey-body">
          Lamentamos el inconveniente que hayas podido tener con nosotros. Si nos das la oportunidad nuestro representante se comunicará contigo
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={() => onAnswer(true)}
          className="btn-premium w-full py-5 rounded-2xl text-lg"
        >
          Sí, por favor
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="w-full bg-white border-2 border-gray-100 text-gray-500 font-bold py-5 rounded-2xl hover:border-guinda/20 hover:bg-guinda/[0.02] transition-all"
        >
          No, gracias
        </button>
      </div>
    </div>
  );
}
