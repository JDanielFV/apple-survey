"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface PositiveAcknowledgmentViewProps {
  onNext: () => void;
}

export function PositiveAcknowledgmentView({ onNext }: PositiveAcknowledgmentViewProps) {
  useEffect(() => {
    const timer = setTimeout(onNext, 4000);
    return () => clearTimeout(timer);
  }, [onNext]);

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

      <div className="w-full max-w-[200px] h-1 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          className="h-full bg-black"
        />
      </div>
      
      <p className="survey-light !text-[14px] !text-gray-300 uppercase tracking-widest">
        Cargando catálogo...
      </p>
    </div>
  );
}
