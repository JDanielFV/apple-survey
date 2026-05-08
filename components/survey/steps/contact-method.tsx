"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Mail, ChevronRight, AlertCircle, Calendar, Clock } from "lucide-react";

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const HOURS = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

const OPTIONS = [
  {
    id: "whatsapp",
    label: "Whatsapp",
    icon: MessageCircle,
    detailPlaceholder: "Tu número de Whatsapp (10 dígitos)",
    detailLabel: "Número",
    detailType: "tel" as const,
    hasSchedule: true,
    validation: (val: string) => /^\d{10,}$/.test(val.replace(/\s/g, "")),
    errorMsg: "Por favor ingresa 10 números",
  },
  {
    id: "llamada",
    label: "Llamada",
    icon: Phone,
    detailPlaceholder: "Tu número de teléfono (10 dígitos)",
    detailLabel: "Teléfono",
    detailType: "tel" as const,
    hasSchedule: true,
    validation: (val: string) => /^\d{10,}$/.test(val.replace(/\s/g, "")),
    errorMsg: "Por favor ingresa 10 números",
  },
  {
    id: "correo",
    label: "Correo",
    icon: Mail,
    detailPlaceholder: "Tu dirección de correo",
    detailLabel: "Correo electrónico",
    detailType: "email" as const,
    hasSchedule: false,
    validation: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    errorMsg: "Formato de correo inválido",
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
  const [touched, setTouched] = useState(false);

  // Estados para los selectores de horario
  const [startDay, setStartDay] = useState("Lunes");
  const [endDay, setEndDay] = useState("Viernes");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const activeOption = OPTIONS.find(o => o.id === expanded);
  const isValid = activeOption ? activeOption.validation(detail) : false;
  const showError = touched && detail.length > 0 && !isValid;

  const handleOptionClick = (id: ContactOption) => {
    setExpanded(prev => (prev === id ? null : id));
    setDetail("");
    setTouched(false);
  };

  const handleConfirm = (id: ContactOption) => {
    if (!isValid) return;

    // Construir el string del horario
    let scheduleString = "";
    if (activeOption?.hasSchedule) {
      const daysPart = startDay === endDay ? startDay : `${startDay} a ${endDay}`;
      scheduleString = `${daysPart}, de ${startTime} a ${endTime}`;
    }

    onSelect({
      contact_method: id,
      contact_detail: detail.trim(),
      contact_schedule: scheduleString || undefined,
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
        {OPTIONS.map(({ id, label, icon: Icon, detailPlaceholder, detailLabel, detailType, hasSchedule, errorMsg }) => {
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
                    <div className="flex flex-col gap-5 px-6 pb-6">
                      <div className="w-full h-px bg-black/5" />

                      {/* Campo de Detalle (Tel/Email) */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-black text-black uppercase tracking-widest">
                            {detailLabel}
                          </label>
                          {showError && (
                            <span className="text-[9px] font-bold text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-2.5 h-2.5" />
                              {errorMsg}
                            </span>
                          )}
                        </div>
                        <input
                          type={detailType}
                          inputMode={detailType === "tel" ? "numeric" : "email"}
                          value={detail}
                          onChange={(e) => {
                            const val = e.target.value;
                            // Si es teléfono, solo permitimos números
                            if (detailType === "tel") {
                              const numericValue = val.replace(/\D/g, "");
                              setDetail(numericValue);
                            } else {
                              setDetail(val);
                            }
                            setTouched(true);
                          }}
                          placeholder={detailPlaceholder}
                          className={`w-full rounded-xl border ${showError ? 'border-red-500 bg-red-50' : 'border-black/10 bg-white'} px-4 py-3 text-base text-black placeholder:text-gray-300 focus:outline-none transition-all`}
                        />
                      </div>

                      {/* Selectores de Horario */}
                      {hasSchedule && (
                        <div className="flex flex-col gap-4 bg-white/50 p-4 rounded-2xl border border-black/5">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <label className="text-[10px] font-black text-black uppercase tracking-widest">
                              Días disponibles
                            </label>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-bold text-gray-400">De</span>
                              <select 
                                value={startDay}
                                onChange={(e) => setStartDay(e.target.value)}
                                className="w-full bg-white border border-black/10 rounded-lg p-2 text-sm font-bold outline-none"
                              >
                                {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                              </select>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-bold text-gray-400">A</span>
                              <select 
                                value={endDay}
                                onChange={(e) => setEndDay(e.target.value)}
                                className="w-full bg-white border border-black/10 rounded-lg p-2 text-sm font-bold outline-none"
                              >
                                {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                              </select>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-2 mb-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <label className="text-[10px] font-black text-black uppercase tracking-widest">
                              Rango de Horas
                            </label>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-bold text-gray-400">De</span>
                              <select 
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full bg-white border border-black/10 rounded-lg p-2 text-sm font-bold outline-none"
                              >
                                {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                              </select>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-bold text-gray-400">A</span>
                              <select 
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full bg-white border border-black/10 rounded-lg p-2 text-sm font-bold outline-none"
                              >
                                {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      <motion.button
                        whileTap={isValid ? { scale: 0.97 } : {}}
                        onClick={() => handleConfirm(id)}
                        disabled={!isValid}
                        className={`w-full py-4 mt-1 rounded-xl font-black text-base tracking-tight transition-all shadow-lg ${
                          isValid 
                            ? 'bg-black text-white shadow-black/10' 
                            : 'bg-gray-100 text-gray-400 shadow-none pointer-events-none'
                        }`}
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
