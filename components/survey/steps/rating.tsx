"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";

interface RatingViewProps {
  onSelect: (rating: number) => void;
}

export function RatingView({ onSelect }: RatingViewProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 text-center gap-12">
      <div className="space-y-6 max-w-sm">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="survey-title !text-center !text-[32px]" // Ajustado levemente para preguntas
        >
          ¿Como calificas tu experiencia al trabajar con nosotros?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="survey-light !text-[20px] px-4"
        >
          Tu sinceridad es crucial para que podamos mejorar, ¡así que no te guardes nada!
        </motion.p>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onSelect(star)}
            className="p-1"
          >
            <Star 
              className={`w-12 h-12 transition-all duration-300 ${
                star <= hover ? "fill-black stroke-black" : "fill-transparent stroke-black/20"
              }`}
              strokeWidth={1.5}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
