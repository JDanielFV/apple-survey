"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function SuccessView() {
  return (
    <div className="text-center space-y-8">
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl font-semibold tracking-tight text-apple-text">
          ¡Gracias por tu tiempo!
        </h2>
        <p className="text-xl text-apple-secondary max-w-sm mx-auto leading-relaxed">
          Tus respuestas han sido enviadas. Tu opinión nos ayuda a mejorar cada día.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pt-8"
      >
        <p className="text-sm font-medium text-apple-secondary uppercase tracking-widest">
          Ya puedes cerrar esta pestaña
        </p>
      </motion.div>
    </div>
  );
}
