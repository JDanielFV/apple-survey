"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface StepContainerProps {
  children: ReactNode;
  stepId: string;
  direction: number;
}

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    y: direction < 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98
  })
};

export function StepContainer({ children, stepId, direction }: StepContainerProps) {
  return (
    <main className="flex items-center justify-center min-h-[100dvh] w-full relative overflow-hidden px-4 py-10">
      
      {/* Círculos de luz decorativos de fondo */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-guinda/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-guinda/5 rounded-full blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={stepId}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 400, damping: 40 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.4 }
          }}
          className="w-full max-w-xl glass-card rounded-[40px] p-8 md:p-12 relative z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
