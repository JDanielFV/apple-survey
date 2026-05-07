"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion } from "framer-motion";

export function CommentView({ onNext }: { onNext: (value: string) => void }) {
  const [comment, setComment] = useState("");

  return (
    <div className="text-center space-y-10">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-apple-text">
          ¿Algún comentario adicional?
        </h2>
        <p className="text-lg text-apple-secondary">
          Tu opinión nos ayuda a ser mejores cada día.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Textarea
          placeholder="Escribe aquí tu comentario..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[160px] rounded-3xl p-6 bg-white border-gray-200 text-lg focus-visible:ring-apple-blue resize-none transition-shadow hover:shadow-md"
        />
      </div>

      <div className="flex flex-col gap-4 items-center">
        <Button
          onClick={() => onNext(comment)}
          size="lg"
          className="bg-apple-blue hover:bg-blue-600 text-white rounded-full px-12 h-14 text-lg font-medium transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          Finalizar
        </Button>
        <button 
          onClick={() => onNext("")}
          className="text-apple-secondary hover:text-apple-text font-medium transition-colors"
        >
          Omitir este paso
        </button>
      </div>
    </div>
  );
}
