"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface HonestyViewProps {
  onNext: () => void;
}

export function HonestyView({ onNext }: HonestyViewProps) {
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
      onNext();
    }
  };

  const handleClick = () => {
    if (!isMobile) {
      onNext();
    }
  };

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      className={`flex flex-col h-full w-full select-none touch-none ${!isMobile ? 'cursor-pointer' : ''}`}
    >
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 max-w-lg mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="survey-title !text-center"
        >
          No buscamos elogios, buscamos la verdad. <br />Tu honestidad, por cruda que sea, es lo único que nos ayuda a mejorar de verdad.
        </motion.h1>
      </div>

      <div className="flex flex-col items-center gap-6 pb-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="survey-light !font-black !uppercase tracking-[0.3em] text-[10px] text-guinda/60"
        >
          {isMobile ? "Desliza para continuar" : "Haz clic para continuar"}
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-guinda/20" strokeWidth={3} />
        </motion.div>
      </div>
    </div>
  );
}
