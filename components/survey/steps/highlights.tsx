"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { id: "service", label: "El Servicio" },
  { id: "product", label: "El Producto" },
  { id: "speed", label: "La Rapidez" },
  { id: "price", label: "El Precio" },
  { id: "other", label: "Otro" },
];

export function HighlightsView({ onNext }: { onNext: (values: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="text-center space-y-10">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-apple-text">
          ¿Qué fue lo que más te gustó?
        </h2>
        <p className="text-lg text-apple-secondary">
          Puedes seleccionar varias opciones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => toggle(opt.id)}
            className={cn(
              "p-6 rounded-2xl border-2 transition-all duration-300 text-left flex items-center justify-between group",
              selected.includes(opt.id)
                ? "border-apple-blue bg-white shadow-md ring-1 ring-apple-blue/10"
                : "border-transparent bg-white/50 hover:bg-white hover:border-gray-200"
            )}
          >
            <span className={cn(
              "font-medium text-lg",
              selected.includes(opt.id) ? "text-apple-blue" : "text-apple-text"
            )}>
              {opt.label}
            </span>
            <div className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
              selected.includes(opt.id)
                ? "bg-apple-blue border-apple-blue"
                : "border-gray-300 group-hover:border-gray-400"
            )}>
              {selected.includes(opt.id) && <CheckCircle2 className="w-4 h-4 text-white" />}
            </div>
          </button>
        ))}
      </div>

      <motion.div animate={{ opacity: selected.length > 0 ? 1 : 0.5 }}>
        <Button
          disabled={selected.length === 0}
          onClick={() => onNext(selected)}
          size="lg"
          className="bg-apple-blue hover:bg-blue-600 text-white rounded-full px-12 h-14 text-lg font-medium transition-all active:scale-95"
        >
          Continuar
        </Button>
      </motion.div>
    </div>
  );
}
