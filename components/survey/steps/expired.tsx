"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export function ExpiredView() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-8 text-center gap-8 max-w-sm mx-auto">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-gray-100 p-6 rounded-full"
      >
        <Lock className="w-12 h-12 text-gray-400" />
      </motion.div>
      
      <div className="space-y-4">
        <h2 className="survey-title !text-center !text-[32px]">
          Enlace Expirado
        </h2>
        <p className="survey-light !text-[20px]">
          Esta encuesta ya ha sido completada y el enlace ya no es válido.
        </p>
      </div>

      <p className="survey-light !text-[14px] !text-gray-300 font-black uppercase tracking-widest mt-10">
        Agradecemos tu interés
      </p>
    </div>
  );
}
