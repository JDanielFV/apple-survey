"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FailedViewProps {
  onNext: (data: { failed_categories: string[], failed: string }) => void;
}

const CATEGORIES = ["Tiempo", "Costo", "Calidad", "Otro"];

export function FailedView({ onNext }: FailedViewProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) 
        ? prev.filter(c => c !== cat) 
        : [...prev, cat]
    );
  };

  const handleNext = () => {
    onNext({ 
      failed_categories: selectedCategories, 
      failed: selectedCategories.includes("Otro") ? comment : selectedCategories.join(", ")
    });
  };

  const hasOtro = selectedCategories.includes("Otro");
  const canContinue = selectedCategories.length > 0 && (!hasOtro || comment.trim().length > 0);

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 gap-8 max-w-sm mx-auto">
      <div className="text-center space-y-4">
        <h2 className="survey-title !text-center !text-[32px]">
          ¿En que te hemos fallado?
        </h2>
        <p className="survey-light !text-[18px]">
          Puedes seleccionar varias opciones
        </p>
      </div>

      <div className="flex flex-wrap gap-2 w-full justify-center">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategories.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all border-2 ${
                isSelected 
                  ? "bg-black border-black text-white" 
                  : "bg-gray-50 border-gray-50 text-gray-400 hover:border-gray-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {hasOtro && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full overflow-hidden"
          >
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cuéntanos más sobre tu experiencia..."
              className="w-full h-40 bg-gray-50 border-2 border-black rounded-[32px] p-6 text-black font-bold placeholder:text-gray-300 focus:bg-white outline-none transition-all resize-none mt-2"
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleNext}
        disabled={!canContinue}
        className="w-full bg-black text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-black/10 disabled:opacity-30 disabled:shadow-none transition-all active:scale-95 mt-4"
      >
        Continuar
      </button>
    </div>
  );
}
