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
      className={`flex flex-col h-[100dvh] w-full bg-white select-none touch-none ${!isMobile ? 'cursor-pointer' : ''}`}
    >
      <div className="flex-1 flex flex-col justify-center px-10 md:px-20 max-w-4xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="survey-title !text-left"
        >
          No buscamos elogios, buscamos la verdad. Tu honestidad, por cruda que sea, es lo único que nos ayuda a mejorar de verdad.
        </motion.h1>
      </div>

      <div className="flex flex-col items-center gap-10 pb-16 px-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="survey-light font-black tracking-tight"
        >
          {isMobile ? "Desliza para continuar" : "Haz clic para continuar"}
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-10 h-10 text-black/20" strokeWidth={3} />
        </motion.div>
      </div>
    </div>
  );
}
