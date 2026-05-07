"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function NPSView({ onSelect }: { onSelect: (value: number) => void }) {
  return (
    <div className="text-center space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-apple-text">
          ¿Qué tan probable es que nos recomiendes?
        </h2>
        <p className="text-lg text-apple-secondary">
          En una escala del 0 al 10.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <motion.button
            key={num}
            whileHover={{ scale: 1.1, backgroundColor: "#0071E3", color: "#FFFFFF" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(num)}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-lg font-semibold transition-all shadow-sm hover:border-apple-blue"
          >
            {num}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between max-w-md mx-auto text-xs font-bold text-apple-secondary uppercase tracking-widest px-2">
        <span>Nada probable</span>
        <span>Muy probable</span>
      </div>
    </div>
  );
}
