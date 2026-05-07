"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface MissingProductViewProps {
  onAnswer: (product: string) => void;
}

export function MissingProductView({ onAnswer }: MissingProductViewProps) {
  const [product, setProduct] = useState("");

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 gap-8 max-w-sm mx-auto">
      <div className="text-center space-y-4">
        <h2 className="survey-title !text-center !text-[32px]">
          ¿Hay algún producto o servicio que nosotros no te brindemos?
        </h2>
      </div>

      <textarea
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Cuéntanos qué te hace falta..."
        className="w-full h-40 bg-gray-50 border-2 border-gray-50 rounded-[32px] p-6 text-black font-bold placeholder:text-gray-300 focus:border-black focus:bg-white outline-none transition-all resize-none"
      />

      <button
        onClick={() => onAnswer(product)}
        className="w-full bg-black text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-black/10 transition-all active:scale-95"
      >
        {product.trim() ? "Siguiente" : "No, todo bien"}
      </button>
    </div>
  );
}
