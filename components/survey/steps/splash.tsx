"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface SplashViewProps {
  onStart: () => void;
  surveyName?: string;
}

export function SplashView({ onStart, surveyName }: SplashViewProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientY;
    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > 50;

    if (isSwipeUp) {
      onStart();
    }
  };

  const handleClick = () => {
    if (!isMobile) {
      onStart();
    }
  };

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      className={`flex flex-col items-center justify-center w-full min-h-[100dvh] gap-12 text-center select-none touch-none ${!isMobile ? 'cursor-pointer' : ''}`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-guinda/10 blur-[60px] rounded-full scale-150" />
        <Image
          src="/logo-cg.webp"
          alt="A&G"
          width={180}
          height={180}
          priority
          className="relative z-10 w-[140px] md:w-[180px] h-auto animate-float"
        />
      </motion.div>

      <div className="space-y-4 relative z-10">
        <h1 className="survey-title !text-center px-4">
          Gracias por dejarnos formar parte de tu camino
        </h1>
        <p className="survey-body">
          Trabajando con los mejores
        </p>
        {surveyName && (
          <p className="survey-light text-guinda font-bold uppercase tracking-[0.3em] text-[10px] mt-2">
            {surveyName}
          </p>
        )}
      </div>

      {/* Botón: Solo visible en Desktop */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        onClick={onStart}
        className="hidden md:flex btn-premium w-full max-w-xs py-5 rounded-2xl text-lg relative z-10 shadow-2xl active:scale-95 transition-all justify-center"
      >
        Empezar Encuesta
      </motion.button>
      
      {/* Indicadores: Solo visibles en Móvil o como apoyo visual */}
      <div className="space-y-3 text-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Tomará unos segundos</p>
        <p className="text-[10px] font-black text-guinda uppercase tracking-[0.2em] animate-pulse">
          {isMobile ? "Desliza para continuar" : "Haz clic para continuar"}
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex justify-center mt-2"
        >
          <ChevronDown className="w-8 h-8 text-guinda/30" strokeWidth={3} />
        </motion.div>
      </div>

      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] opacity-40 absolute bottom-8">
        © A&G Papelería Notarial
      </p>
    </div>
  );
}
