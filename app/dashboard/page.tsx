"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Link as LinkIcon, 
  ExternalLink, 
  Clipboard, 
  Check, 
  Star,
  RefreshCw,
  FileText,
  X,
  Calendar,
  User,
  Clock,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  ArrowDownCircle,
  Inbox,
  BarChart3,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<any | null>(null);
  const [newSurveyName, setNewSurveyName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/surveys');
      const data = await res.json();
      setSurveys(data.surveys || []);
      
      const resResp = await fetch('/api/responses');
      const dataResp = await resResp.json();
      setResponses(dataResp.responses || []);
    } catch (e) {
      console.error("Error fetching data", e);
    } finally {
      setLoading(false);
    }
  };

  // Enlaces que NO tienen respuesta aún
  const pendingSurveys = surveys.filter(s => !responses.some(r => r.survey_id === s.id));

  const generateSecureCode = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 16; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const cleanName = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim();
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/survey/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(slug);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const createSurvey = async () => {
    if (!newSurveyName) return;
    const slug = generateSecureCode();
    const finalName = cleanName(newSurveyName);

    try {
      const res = await fetch('/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: finalName, slug: slug })
      });

      if (res.ok) {
        setShowCreateModal(false);
        setNewSurveyName("");
        fetchData();
      }
    } catch (e) {
      console.error("Error creating survey", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-[Montserrat]">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header Compacto */}
        <header className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2.5 rounded-xl text-white flex items-center justify-center font-black italic text-sm">
              A&G
            </div>
            <h1 className="text-xl font-black tracking-tight text-black">Survey Console</h1>
          </div>
          
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95 text-sm"
          >
            <Plus className="w-4 h-4" />
            Nuevo Enlace
          </button>
        </header>

        {/* Unified Scroll Area Content */}
        <div className="flex flex-col gap-10">
          
          {/* SECCIÓN 1: ENLACES PENDIENTES */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <LinkIcon className="w-3 h-3" />
                Enlaces por responder ({pendingSurveys.length})
              </h2>
              <button onClick={fetchData} className="text-gray-400 hover:text-black transition-colors">
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <AnimatePresence mode="popLayout">
                {pendingSurveys.map((survey) => (
                  <motion.div 
                    key={survey.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm hover:border-guinda/20 transition-all flex items-center justify-between group"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-black text-sm">{survey.name}</span>
                      <code className="text-[9px] text-gray-400 font-mono mt-1 uppercase tracking-tighter">Code: {survey.slug.slice(0,8)}...</code>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => copyLink(survey.slug)}
                        className={`p-2.5 rounded-xl transition-all ${copiedId === survey.slug ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100'}`}
                      >
                        {copiedId === survey.slug ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {pendingSurveys.length === 0 && (
                <div className="col-span-full py-8 border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center text-gray-400 gap-2">
                  <Inbox className="w-6 h-6 opacity-20" />
                  <p className="text-xs font-bold italic">No hay enlaces pendientes</p>
                </div>
              )}
            </div>
          </section>

          {/* DIVIDER VISUAL */}
          <div className="flex items-center gap-4 px-2">
            <div className="h-px bg-gray-100 flex-1" />
            <ArrowDownCircle className="w-4 h-4 text-gray-200" />
            <div className="h-px bg-gray-100 flex-1" />
          </div>

          {/* SECCIÓN 2: RESPUESTAS RECIBIDAS */}
          <section className="flex flex-col gap-4">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 px-2">
              <FileText className="w-3 h-3" />
              Reportes Recibidos ({responses.length})
            </h2>

            <div className="flex flex-col gap-3">
              {responses.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((resp) => {
                const survey = surveys.find(s => s.id === resp.survey_id);
                return (
                  <motion.div 
                    key={resp.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white border border-gray-100 p-5 rounded-[32px] shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 ${resp.rating >= 4 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <span className="text-lg font-black leading-none">{resp.rating}</span>
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-black">{survey?.name || '---'}</span>
                        <p className="text-xs text-gray-400 font-bold truncate max-w-[250px]">
                          {resp.rating >= 4 ? (resp.would_improve || 'Satisfecho') : (resp.failed || 'Inconforme')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-gray-50">
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none">Recibido</span>
                        <span className="text-[11px] font-bold text-gray-500 mt-1">{new Date(resp.created_at).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedResponse(resp)}
                        className="bg-gray-50 text-black px-6 py-3 rounded-2xl text-xs font-black hover:bg-black hover:text-white transition-all active:scale-95 flex items-center gap-2"
                      >
                        Ver Reporte
                      </button>
                    </div>
                  </motion.div>
                );
              })}
              
              {responses.length === 0 && !loading && (
                <p className="text-gray-400 text-sm text-center py-20 italic">Aún no has recibido respuestas.</p>
              )}
            </div>
          </section>
        </div>

        {/* MODALES (Mantenemos la misma lógica pero con el nuevo estilo) */}
        <AnimatePresence>
          {showCreateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCreateModal(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white rounded-[40px] p-8 md:p-12 w-full max-w-md shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-green-100 p-2.5 rounded-xl"><ShieldCheck className="w-6 h-6 text-green-600" /></div>
                  <h3 className="text-2xl font-black tracking-tight">Nuevo enlace</h3>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nombre del Cliente</label>
                    <input type="text" placeholder="Ej. Notaría 43" value={newSurveyName} onChange={(e) => setNewSurveyName(e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => setShowCreateModal(false)} className="flex-1 bg-gray-100 text-black font-black py-4 rounded-2xl text-sm">Cancelar</button>
                    <button onClick={createSurvey} className="flex-1 bg-black text-white font-black py-4 rounded-2xl text-sm">Generar</button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {selectedResponse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedResponse(null)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
              <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="relative bg-white rounded-[40px] w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
                <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${selectedResponse.rating >= 4 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}><FileText className="w-6 h-6" /></div>
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-black">Detalle de Respuesta</h3>
                      <p className="text-gray-400 text-[10px] font-bold flex items-center gap-1.5 mt-1"><Clock className="w-3 h-3" /> {new Date(selectedResponse.created_at).toLocaleString('es-MX')}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedResponse(null)} className="p-2 bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-500" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50/50">
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm"><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Cliente</span><div className="font-black text-sm md:text-base text-black truncate">{surveys.find(s => s.id === selectedResponse.survey_id)?.name || 'Desconocido'}</div></div>
                      <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center"><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Calificación</span><div className="flex items-center gap-1 font-black text-xl md:text-2xl">{selectedResponse.rating}<Star className={`w-5 h-5 ${selectedResponse.rating >= 4 ? 'fill-green-500 text-green-500' : 'fill-red-500 text-red-500'}`} /></div></div>
                    </div>
                    <div className="flex flex-col gap-4">
                      {selectedResponse.rating >= 4 ? (
                        <>
                          <DetailCard icon={<HelpCircle className="w-4 h-4"/>} label="¿En qué te ayudamos hoy?" content={selectedResponse.helped?.join(', ')} />
                          <DetailCard icon={<MessageCircle className="w-4 h-4"/>} label="¿Qué podríamos mejorar?" content={selectedResponse.would_improve} />
                          <DetailCard icon={<BarChart3 className="w-4 h-4"/>} label="¿Faltó algún producto?" content={selectedResponse.missing_product} />
                          {selectedResponse.missing_product && <DetailCard icon={<Check className="w-4 h-4"/>} label="¿Ya tiene proveedor?" content={selectedResponse.has_provider ? "Sí, ya tiene" : "No, está buscando"} />}
                          {selectedResponse.has_provider && selectedResponse.reason && <DetailCard icon={<MessageSquare className="w-4 h-4"/>} label="Razón por la que no nos compra" content={selectedResponse.reason} />}
                          {!selectedResponse.has_provider && selectedResponse.missing_product && <DetailCard icon={<User className="w-4 h-4"/>} label="¿Desea ayuda?" content={selectedResponse.wants_contact ? "Sí, requiere asesoría" : "No por ahora"} />}
                        </>
                      ) : (
                        <>
                          <DetailCard icon={<HelpCircle className="w-4 h-4"/>} label="¿En qué fallamos?" content={selectedResponse.failed_categories?.join(', ')} />
                          <DetailCard icon={<MessageCircle className="w-4 h-4"/>} label="Detalle de la falla" content={selectedResponse.failed} />
                          <DetailCard icon={<Check className="w-4 h-4"/>} label="¿Desea que lo contactemos?" content={selectedResponse.wants_contact ? 'Sí' : 'No'} />
                        </>
                      )}
                    </div>
                    <div className="bg-black text-white rounded-[32px] p-6 md:p-8 mt-4">
                      <div className="flex items-center gap-3 mb-8"><Calendar className="w-5 h-5 text-gray-500" /><h4 className="text-[10px] font-black uppercase tracking-widest">Seguimiento</h4></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div><span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">Medio</span><p className="font-bold capitalize text-sm">{selectedResponse.contact_method || 'Ninguno'}</p></div>
                        <div><span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">Detalle</span><p className="font-bold text-sm truncate">{selectedResponse.contact_detail || '---'}</p></div>
                        <div className="md:col-span-2"><span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">Horario</span><p className="font-bold text-sm leading-relaxed">{selectedResponse.contact_schedule || 'No especificado'}</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

function DetailCard({ icon, label, content }: { icon: React.ReactNode, label: string, content?: string }) {
  return (
    <div className="bg-white rounded-[24px] p-5 md:p-6 border border-gray-100 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-2"><div className="text-guinda/30 shrink-0">{icon}</div><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</span></div>
      <p className="text-black font-bold text-sm md:text-base leading-snug">{content || '_Sin respuesta_'}</p>
    </div>
  );
}
