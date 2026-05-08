"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function SuccessView() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-10">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 bg-guinda rounded-full flex items-center justify-center shadow-xl shadow-guinda/30"
      >
        <CheckCircle2 className="w-12 h-12 text-white" />
      </motion.div>

      <div className="space-y-4">
        <h2 className="survey-title !text-center">
          ¡Gracias por tu tiempo!
        </h2>
        <p className="survey-body">
          Tus respuestas han sido enviadas. Tu opinión nos ayuda a mejorar cada día.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pt-4"
      >
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Puedes cerrar esta pestaña
        </p>
      </motion.div>
    </div>
  );
}
