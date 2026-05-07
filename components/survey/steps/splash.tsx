"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface SplashViewProps {
  onStart: () => void;
}

export function SplashView({ onStart }: SplashViewProps) {
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
      className={`flex flex-col h-[100dvh] w-full bg-white select-none touch-none ${!isMobile ? 'cursor-pointer' : ''}`}
    >
      {/* Upper Content - Left Aligned inside a max-w container */}
      <div className="flex-1 flex flex-col justify-start pt-24 px-10 md:px-20 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="survey-title">
            Gracias por dejarnos formar parte de tu camino
          </h1>
          
          <div className="survey-divider" />
          
          <p className="survey-body">
            Trabajando con los mejores
          </p>
        </motion.div>
      </div>

      {/* Lower Content - Center Aligned */}
      <div className="flex flex-col items-center gap-12 pb-16 px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center gap-8"
        >
          <Image
            src="/logo-cg.webp"
            alt="A&G Papelería Notarial & Corporativa"
            width={180}
            height={90}
            priority
            className="mb-2"
            style={{ height: "auto" }}
          />
          
          <div className="space-y-3 text-center">
            <p className="survey-light font-medium">Tomará unos segundos</p>
            <p className="survey-light font-black tracking-tight">
              {isMobile ? "Desliza para continuar" : "Haz clic para continuar"}
            </p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-12 h-12 text-black/20" strokeWidth={3} />
        </motion.div>
      </div>
    </div>
  );
}
