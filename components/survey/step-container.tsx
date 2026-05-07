"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface StepContainerProps {
  children: ReactNode;
  stepId: string;
  direction: number;
}

export function StepContainer({ children, stepId, direction }: StepContainerProps) {
  const isSplashLike = stepId === "splash" || stepId === "honesty";

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className={`relative overflow-hidden w-full flex flex-col ${!isSplashLike ? "items-center justify-center min-h-[400px]" : "h-full"}`}>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={stepId}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className={`w-full ${!isSplashLike ? "max-w-xl px-6 py-12" : "h-full"}`}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
