"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export function CatalogView() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-8 text-center gap-12 max-w-sm mx-auto">
      <div className="space-y-8">
        <h2 className="survey-title !text-center !text-[32px]">
          Te invitamos a conocer nuestro catalogo de productos en:
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
        className="mt-10 grayscale opacity-30"
      />

      <p className="survey-light !text-[14px] !text-gray-300 uppercase tracking-widest">
        ¡Gracias por tu tiempo!
      </p>
    </div>
  );
}
