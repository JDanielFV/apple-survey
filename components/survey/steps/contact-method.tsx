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
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-3">
        <h2 className="survey-title !text-left !text-[32px]">
          ¿Por qué medio te gustaría que nos comunicáramos?
        </h2>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {OPTIONS.map(({ id, label, icon: Icon, detailPlaceholder, detailLabel, detailType, hasSchedule, errorMsg }) => {
          const isExpanded = expanded === id;

          return (
            <div 
              key={id} 
              className={`flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
                isExpanded ? 'border-guinda/20 bg-guinda/[0.02] shadow-lg shadow-guinda/5' : 'border-gray-100 bg-white/50 hover:border-gray-200'
              }`}
            >
              <button
                onClick={() => handleOptionClick(id)}
                className="flex items-center gap-4 px-6 py-5 w-full text-left group"
              >
                <div className={`p-2 rounded-lg transition-colors ${isExpanded ? 'bg-guinda text-white' : 'bg-gray-100 text-gray-400 group-hover:text-guinda'}`}>
                  <Icon className="w-5 h-5 shrink-0" />
                </div>
                <span className={`flex-1 font-bold text-base transition-colors ${isExpanded ? 'text-guinda' : 'text-gray-600'}`}>
                  {label}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className={`w-4 h-4 ${isExpanded ? 'text-guinda' : 'text-gray-300'}`} />
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
                      <div className="w-full h-px bg-guinda/5" />

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-black text-guinda/60 uppercase tracking-widest">
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
                            if (detailType === "tel") {
                              const numericValue = val.replace(/\D/g, "");
                              setDetail(numericValue);
                            } else {
                              setDetail(val);
                            }
                            setTouched(true);
                          }}
                          placeholder={detailPlaceholder}
                          className={`w-full rounded-xl border px-4 py-4 text-base font-bold focus:outline-none transition-all ${
                            showError ? 'border-red-500 bg-red-50 text-red-700' : 'border-guinda/10 bg-white text-black focus:border-guinda focus:ring-4 focus:ring-guinda/5'
                          }`}
                        />
                      </div>

                      {hasSchedule && (
                        <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl border border-guinda/10 shadow-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-3 h-3 text-guinda/40" />
                            <label className="text-[10px] font-black text-guinda/60 uppercase tracking-widest">
                              Días disponibles
                            </label>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <ScheduleSelect label="De" value={startDay} onChange={setStartDay} options={DAYS} />
                            <ScheduleSelect label="A" value={endDay} onChange={setEndDay} options={DAYS} />
                          </div>

                          <div className="flex items-center gap-2 mt-2 mb-1">
                            <Clock className="w-3 h-3 text-guinda/40" />
                            <label className="text-[10px] font-black text-guinda/60 uppercase tracking-widest">
                              Rango de Horas
                            </label>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <ScheduleSelect label="De" value={startTime} onChange={setStartTime} options={HOURS} />
                            <ScheduleSelect label="A" value={endTime} onChange={setEndTime} options={HOURS} />
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => handleConfirm(id)}
                        disabled={!isValid}
                        className="btn-premium w-full py-5 rounded-2xl text-lg disabled:opacity-30 disabled:pointer-events-none mt-2"
                      >
                        Confirmar
                      </button>
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

function ScheduleSelect({ label, value, onChange, options }: { label: string, value: string, onChange: (v: string) => void, options: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-bold text-gray-400 ml-1">{label}</span>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2.5 text-sm font-bold outline-none focus:border-guinda/30 transition-all cursor-pointer"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}
