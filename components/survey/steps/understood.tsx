"use client";

import { motion } from "framer-motion";

export function UnderstoodView() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-8 text-center gap-10 max-w-sm mx-auto">
      <h2 className="survey-title !text-center !text-[32px]">
        Entendemos perfectamente, <br /> ¡Estamos trabajando para cumplir tus expectativas!
      </h2>

      <p className="survey-light !text-[20px]">
        ...
      </p>

      <p className="survey-light !text-[14px] !text-gray-300 font-black uppercase tracking-widest mt-10">
        Puedes cerrar esta ventana
      </p>
    </div>
  );
}
