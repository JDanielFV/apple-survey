"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";

export function UnderstoodView() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-10">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center"
      >
        <Info className="w-12 h-12 text-gray-400" />
      </motion.div>

      <div className="space-y-4">
        <h2 className="survey-title !text-center">
          Entendemos perfectamente, <br /> ¡Estamos trabajando para cumplir tus expectativas!
        </h2>
        <p className="survey-body italic opacity-50">
          ...
        </p>
      </div>

      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pt-4">
        Puedes cerrar esta ventana
      </p>
    </div>
  );
}
