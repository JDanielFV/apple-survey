"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export function CatalogView() {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinished(true);
    }, 5000); // 5 segundos para leer el catálogo antes del cierre final
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full px-8 text-center min-h-[400px] max-w-sm mx-auto overflow-hidden">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="catalog"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-12"
          >
            <div className="space-y-8">
              <h2 className="survey-title !text-center !text-[32px]">
                Te invitamos a conocer nuestro catálogo de productos en:
              </h2>
              
              <a 
                href="https://papelerianotarial.net" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-[28px] font-light text-black underline underline-offset-8 decoration-1 hover:decoration-2 transition-all font-[Montserrat]"
              >
                Papelerianotarial.net
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>

            <Image
              src="/logo-cg.webp"
              alt="A&G Papelería Notarial & Corporativa"
              width={100}
              height={50}
              style={{ height: "auto" }}
              className="grayscale opacity-30"
            />
          </motion.div>
        ) : (
          <motion.div
            key="closing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <CheckCircle2 className="w-20 h-20 text-black" />
            </motion.div>
            <h2 className="survey-title !text-center !text-[40px]">
              ¡Muchas gracias!
            </h2>
            <p className="survey-light !text-[20px]">
              Tus respuestas nos ayudan a ser mejores cada día.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
