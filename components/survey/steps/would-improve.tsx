"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface WouldImproveViewProps {
  onNext: (comment: string) => void;
}

export function WouldImproveView({ onNext }: WouldImproveViewProps) {
  const [comment, setComment] = useState("");

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 gap-8 max-w-sm mx-auto">
      <div className="text-center space-y-4">
        <h2 className="survey-title !text-center !text-[32px]">
          Aún asi, ¿Te gustaría que mejoráramos en algo?
        </h2>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tu opinión nos ayuda a crecer..."
        className="w-full h-40 bg-gray-50 border-2 border-gray-50 rounded-[32px] p-6 text-black font-bold placeholder:text-gray-300 focus:border-black focus:bg-white outline-none transition-all resize-none"
      />

      <button
        onClick={() => onNext(comment)}
        className="w-full bg-black text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-black/10 transition-all active:scale-95"
      >
        {comment.trim() ? "Siguiente" : "Omitir"}
      </button>
    </div>
  );
}
