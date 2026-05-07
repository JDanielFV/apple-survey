"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface ReasonViewProps {
  onNext: (reason: string) => void;
}

const REASONS = [
  "Precio",
  "Calidad",
  "No sé si lo manejen",
  "Definitivamente no cambiaré de proveedor de este producto / servicio",
  "Otro"
];

export function ReasonView({ onNext }: ReasonViewProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 gap-8 max-w-sm mx-auto">
      <div className="text-center">
        <h2 className="survey-title !text-center !text-[32px]">
          De estas opciones cual sería la razón por la que no lo producimos para ti
        </h2>
      </div>

      <div className="flex flex-col gap-2.5 w-full">
        {REASONS.map((reason) => (
          <button
            key={reason}
            onClick={() => onNext(reason)}
            className="flex items-center justify-between w-full bg-gray-50 text-black font-bold py-4 px-5 rounded-2xl hover:bg-gray-100 transition-all border-2 border-transparent hover:border-gray-200 group text-left"
          >
            <span className="text-sm leading-tight font-bold">{reason}</span>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
