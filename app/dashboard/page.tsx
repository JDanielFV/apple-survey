"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Link as LinkIcon, 
  ExternalLink, 
  Clipboard, 
  Check, 
  BarChart3, 
  MessageSquare, 
  Star,
  RefreshCw,
  FileText,
  X,
  Calendar,
  User,
  Clock,
  HelpCircle,
  MessageCircle,
  ShieldCheck
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

  // Función para generar un código aleatorio de 16 caracteres
  const generateSecureCode = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 16; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Función para limpiar texto (quitar acentos, eñes, etc.)
  const cleanName = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Quita acentos
      .replace(/[^a-zA-Z0-9\s]/g, "") // Quita símbolos especiales
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
    
    // El nombre se guarda limpio, pero el slug es un código de 16 chars
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
      } else {
        const err = await res.json();
        alert(`Error: ${err.error}`);
      }
    } catch (e) {
      console.error("Error creating survey", e);
      alert("Error de conexión");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-[Montserrat]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-black p-2 rounded-xl text-white flex items-center justify-center font-black italic">
              A&G
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-black">A&G Feedback Dashboard</h1>
              <p className="text-gray-500 text-sm">Gestiona tus enlaces y revisa la satisfacción del cliente</p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Nuevo Enlace
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Surveys List */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-lg flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-gray-400" />
                  Enlaces Activos
                </h2>
                <button onClick={fetchData} className="text-gray-400 hover:text-black transition-colors">
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {surveys.length === 0 && !loading ? (
                  <p className="text-gray-400 text-sm text-center py-10 italic">No hay enlaces generados aún.</p>
                ) : (
                  surveys.map((survey) => (
                    <div key={survey.id} className="group p-4 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:border-gray-200 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-black">{survey.name}</span>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => copyLink(survey.slug)}
                            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all"
                          >
                            {copiedId === survey.slug ? <Check className="w-4 h-4 text-green-500" /> : <Clipboard className="w-4 h-4" />}
                          </button>
                          <a 
                            href={`/survey/${survey.slug}`} 
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-green-500" />
                        <code className="text-[10px] text-gray-400 font-mono">{survey.slug}</code>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Responses Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-full overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  Respuestas Recientes
                </h2>
                <div className="flex gap-2">
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    {responses.length} Total
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase tracking-wider font-black border-b border-gray-50">
                      <th className="pb-4 px-4 text-center">Calif.</th>
                      <th className="pb-4 px-4">Cliente / Enlace</th>
                      <th className="pb-4 px-4">Detalles</th>
                      <th className="pb-4 px-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-sm">
                    {responses.length === 0 && !loading ? (
                      <tr>
                        <td colSpan={4} className="py-20 text-center text-gray-400 italic">No hay respuestas registradas.</td>
                      </tr>
                    ) : (
                      responses.map((resp) => {
                        const survey = surveys.find(s => s.id === resp.survey_id);
                        return (
                          <tr key={resp.id} className="group hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-4">
                              <div className={`flex items-center justify-center gap-0.5 rounded-lg py-1 px-2 w-fit mx-auto ${resp.rating >= 4 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                <span className="font-black">{resp.rating}</span>
                                <Star className={`w-3 h-3 ${resp.rating >= 4 ? 'fill-green-700' : 'fill-red-700'}`} />
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-bold text-black">{survey?.name || '---'}</div>
                              <div className="text-[10px] text-gray-400 font-mono">ID: {resp.id.slice(0, 8)}</div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-gray-500 truncate max-w-[150px]">
                                {resp.rating >= 4 ? (resp.would_improve || 'Satisfecho') : (resp.failed || 'Inconforme')}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button 
                                onClick={() => setSelectedResponse(resp)}
                                className="inline-flex items-center gap-2 bg-gray-100 text-black px-4 py-2 rounded-xl text-xs font-black hover:bg-black hover:text-white transition-all active:scale-95"
                              >
                                <FileText className="w-3 h-3" />
                                Ver Reporte
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Create Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCreateModal(false)}
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">Nuevo enlace seguro</h3>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Nombre del Cliente</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Notaría 43 de Cancún"
                      value={newSurveyName}
                      onChange={(e) => setNewSurveyName(e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-black font-bold focus:ring-2 focus:ring-black transition-all"
                    />
                    <p className="text-[10px] text-gray-400 px-1 mt-1 italic">Acentos y símbolos se limpiarán automáticamente.</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-4 border border-dashed border-gray-200">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Código de enlace (Auto-generado)</span>
                    <code className="text-sm font-mono text-black">survey/****************</code>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => setShowCreateModal(false)} className="flex-1 bg-gray-100 text-black font-black py-4 rounded-2xl">Cancelar</button>
                    <button onClick={createSurvey} className="flex-1 bg-black text-white font-black py-4 rounded-2xl">Generar Enlace</button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Response Report Modal */}
        <AnimatePresence>
          {selectedResponse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedResponse(null)}
                className="absolute inset-0 bg-black/40 backdrop-blur-md"
              />
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="relative bg-white rounded-[40px] w-full max-w-2xl max-h-[85vh] shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${selectedResponse.rating >= 4 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-black">Detalle de Respuesta</h3>
                      <p className="text-gray-400 text-xs font-bold flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {new Date(selectedResponse.created_at).toLocaleString('es-MX')}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedResponse(null)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
                  <div className="flex flex-col gap-6">
                    
                    {/* Resumen Superior */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Cliente</span>
                        <div className="flex items-center gap-2 font-black text-lg text-black">
                          <User className="w-4 h-4 text-black/20" />
                          {surveys.find(s => s.id === selectedResponse.survey_id)?.name || 'Desconocido'}
                        </div>
                      </div>
                      <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Calificación</span>
                        <div className="flex items-center gap-1 font-black text-2xl">
                          {selectedResponse.rating}
                          <Star className={`w-5 h-5 ${selectedResponse.rating >= 4 ? 'fill-green-500 text-green-500' : 'fill-red-500 text-red-500'}`} />
                        </div>
                      </div>
                    </div>

                    {/* Detalle de Preguntas en Tarjetas */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Cuestionario</h4>
                      
                      {selectedResponse.rating >= 4 ? (
                        <>
                          <DetailCard icon={<HelpCircle className="w-4 h-4"/>} label="¿En qué te ayudamos hoy?" content={selectedResponse.helped?.join(', ')} />
                          <DetailCard icon={<MessageCircle className="w-4 h-4"/>} label="¿Qué podríamos mejorar?" content={selectedResponse.would_improve} />
                          <DetailCard icon={<BarChart3 className="w-4 h-4"/>} label="¿Faltó algún producto?" content={selectedResponse.missing_product} />
                          {selectedResponse.has_provider && (
                            <>
                              <DetailCard icon={<Check className="w-4 h-4"/>} label="¿Ya tiene proveedor para ese producto?" content="Sí" />
                              <DetailCard icon={<MessageSquare className="w-4 h-4"/>} label="Razón por la que no nos compra" content={selectedResponse.reason} />
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <DetailCard icon={<HelpCircle className="w-4 h-4"/>} label="¿En qué fallamos?" content={selectedResponse.failed_categories?.join(', ')} />
                          <DetailCard icon={<MessageCircle className="w-4 h-4"/>} label="Detalle de la falla" content={selectedResponse.failed} />
                          <DetailCard icon={<Check className="w-4 h-4"/>} label="¿Desea que lo contactemos?" content={selectedResponse.wants_contact ? 'Sí' : 'No'} />
                        </>
                      )}
                    </div>

                    {/* Tarjeta de Contacto */}
                    <div className="bg-black text-white rounded-[32px] p-8 mt-4">
                      <div className="flex items-center gap-3 mb-6">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <h4 className="text-sm font-black uppercase tracking-widest">Información de Seguimiento</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Medio</span>
                          <p className="font-bold capitalize">{selectedResponse.contact_method || 'Ninguno'}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Detalle</span>
                          <p className="font-bold">{selectedResponse.contact_detail || '---'}</p>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Horario de Preferencia</span>
                          <p className="font-bold">{selectedResponse.contact_schedule || 'No especificado'}</p>
                        </div>
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
    <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="text-black/20">{icon}</div>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-black font-bold text-lg leading-snug">{content || '_Sin respuesta_'}</p>
    </div>
  );
}
