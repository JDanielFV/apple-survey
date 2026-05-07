"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Mail, ChevronRight } from "lucide-react";

const OPTIONS = [
  {
    id: "whatsapp",
    label: "Whatsapp",
    icon: MessageCircle,
    detailPlaceholder: "Tu número de Whatsapp",
    detailLabel: "Número",
    detailType: "tel" as const,
    hasSchedule: true,
  },
  {
    id: "llamada",
    label: "Llamada",
    icon: Phone,
    detailPlaceholder: "Tu número de teléfono",
    detailLabel: "Teléfono",
    detailType: "tel" as const,
    hasSchedule: true,
  },
  {
    id: "correo",
    label: "Correo",
    icon: Mail,
    detailPlaceholder: "Tu dirección de correo",
    detailLabel: "Correo electrónico",
    detailType: "email" as const,
    hasSchedule: false,
  },
] as const;

type ContactOption = (typeof OPTIONS)[number]["id"];

interface ContactMethodViewProps {
  onSelect: (value: {
    contact_method: ContactOption;
    contact_detail?: string;
    contact_schedule?: string;
  }) => void;
}

export function ContactMethodView({ onSelect }: ContactMethodViewProps) {
  const [expanded, setExpanded] = useState<ContactOption | null>(null);
  const [detail, setDetail] = useState("");
  const [schedule, setSchedule] = useState("");

  const handleOptionClick = (id: ContactOption) => {
    setExpanded(prev => (prev === id ? null : id));
    setDetail("");
    setSchedule("");
  };

  const handleConfirm = (id: ContactOption) => {
    if (!detail.trim()) return;
    onSelect({
      contact_method: id,
      contact_detail: detail.trim(),
      contact_schedule: schedule.trim() || undefined,
    });
  };

  return (
    <div className="flex flex-col gap-10 max-w-sm mx-auto w-full">
      <div className="flex flex-col gap-4">
        <h2 className="survey-title !text-left !text-[32px]">
          ¿Por que medio te gustaría que nos comunicaramos?
        </h2>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {OPTIONS.map(({ id, label, icon: Icon, detailPlaceholder, detailLabel, detailType, hasSchedule }) => {
          const isExpanded = expanded === id;

          return (
            <div key={id} className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50 transition-shadow">
              <button
                onClick={() => handleOptionClick(id)}
                className="flex items-center gap-4 px-6 py-5 w-full text-left"
              >
                <Icon className="w-5 h-5 text-black shrink-0" />
                <span className="flex-1 font-bold text-base text-black capitalize">
                  {label}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4 text-black" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="form"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-3 px-6 pb-6">
                      <div className="w-full h-px bg-black/5" />

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black text-black uppercase tracking-widest">
                          {detailLabel}
                        </label>
                        <input
                          type={detailType}
                          inputMode={detailType === "tel" ? "tel" : "email"}
                          value={detail}
                          onChange={(e) => setDetail(e.target.value)}
                          placeholder={detailPlaceholder}
                          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-black placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black/5 transition"
                        />
                      </div>

                      {hasSchedule && (
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-black text-black uppercase tracking-widest">
                            Horario preferido
                          </label>
                          <input
                            type="text"
                            value={schedule}
                            onChange={(e) => setSchedule(e.target.value)}
                            placeholder="Ej. Lunes a viernes, 9am – 2pm"
                            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-black placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black/5 transition"
                          />
                        </div>
                      )}

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleConfirm(id)}
                        disabled={!detail.trim()}
                        className="w-full py-4 mt-1 rounded-xl bg-black text-white font-black text-base tracking-tight transition-opacity disabled:opacity-20 active:opacity-80 shadow-lg shadow-black/10"
                      >
                        Confirmar
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
