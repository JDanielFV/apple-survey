"use client";

import { motion } from "framer-motion";

interface YesNoViewProps {
  title: string;
  subtitle?: string;
  onAnswer: (value: boolean) => void;
}

export function YesNoView({ title, subtitle, onAnswer }: YesNoViewProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-[2rem] font-black leading-tight tracking-tight text-black">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base font-normal text-gray-500 leading-snug">{subtitle}</p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onAnswer(true)}
          className="w-full py-5 rounded-2xl bg-black text-white font-semibold text-lg tracking-tight transition-opacity active:opacity-80"
        >
          Sí
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onAnswer(false)}
          className="w-full py-5 rounded-2xl border border-gray-200 bg-white text-black font-semibold text-lg tracking-tight hover:border-gray-400 transition-colors"
        >
          No
        </motion.button>
      </div>
    </div>
  );
}
