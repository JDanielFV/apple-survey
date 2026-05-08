"use client";

import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";

interface PositiveContactCheckViewProps {
  onAnswer: (wantsContact: boolean) => void;
}

export function PositiveContactCheckView({ onAnswer }: PositiveContactCheckViewProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-8 text-center gap-10 max-w-sm mx-auto">
      <div className="space-y-6">
        <div className="bg-black/5 p-4 rounded-full w-fit mx-auto">
          <MessageSquareText className="w-10 h-10 text-black" />
        </div>
        
        <h2 className="survey-title !text-center !text-[32px]">
          ¿Te gustaría que te ayudáramos con esto?
        </h2>
        
        <p className="survey-light !text-[18px]">
          Nos encantaría brindarte una solución a la medida. ¿Te gustaría que un asesor se comunique contigo para darte más información?
        </p>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={() => onAnswer(false)}
          className="flex-1 bg-gray-50 text-gray-400 font-black py-5 rounded-2xl hover:bg-gray-100 transition-all"
        >
          No, gracias
        </button>
        <button
          onClick={() => onAnswer(true)}
          className="flex-1 bg-black text-white font-black py-5 rounded-2xl shadow-xl shadow-black/10 transition-all active:scale-95"
        >
          Sí, por favor
        </button>
      </div>
    </div>
  );
}
