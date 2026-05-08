"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface RatingViewProps {
  onSelect: (rating: number) => void;
}

export function RatingView({ onSelect }: RatingViewProps) {
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-12 text-center">
      <div className="space-y-4">
        <h2 className="survey-title !text-center">
          ¿Cómo calificarías <br /> tu experiencia?
        </h2>
        <p className="survey-light">Tu opinión nos ayuda a ser mejores cada día</p>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setSelectedRating(star)}
            className="p-1 transition-all"
          >
            <Star
              className={`w-12 h-12 md:w-16 md:h-16 transition-all duration-300 ${
                star <= (hoveredRating || selectedRating)
                  ? "fill-guinda text-guinda filter drop-shadow-[0_0_8px_rgba(139,29,61,0.4)]"
                  : "text-gray-200"
              }`}
            />
          </motion.button>
        ))}
      </div>

      <button
        onClick={() => selectedRating && onSelect(selectedRating)}
        disabled={!selectedRating}
        className="btn-premium w-full max-w-xs py-5 rounded-2xl disabled:opacity-30 disabled:pointer-events-none"
      >
        Enviar Calificación
      </button>
    </div>
  );
}
