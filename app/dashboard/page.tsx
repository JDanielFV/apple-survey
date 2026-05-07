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
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSurveyName, setNewSurveyName] = useState("");
  const [newSurveySlug, setNewSurveySlug] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/surveys');
      const data = await res.json();
      setSurveys(data.surveys || []);
      setResponses(data.responses || []);
    } catch (e) {
      console.error("Error fetching data", e);
    } finally {
      setLoading(false);
    }
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
      .replace(/[^\w\s-]/g, '') // Quitar caracteres especiales
      .replace(/\s+/g, '-') // Espacios a guiones
      .replace(/--+/g, '-') // Quitar guiones dobles
      .trim();
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/survey/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(slug);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const createSurvey = async () => {
    if (!newSurveyName || !newSurveySlug) return;
    
    try {
      const res = await fetch('/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newSurveyName, slug: slugify(newSurveySlug) })
      });

      if (res.ok) {
        setShowCreateModal(false);
        setNewSurveyName("");
        setNewSurveySlug("");
        fetchData();
      }
    } catch (e) {
      console.error("Error creating survey", e);
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
                      <code className="text-xs text-gray-400">/survey/{survey.slug}</code>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Responses Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-full">
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
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase tracking-wider font-black border-b border-gray-50">
                      <th className="pb-4 px-2 text-center">Calif.</th>
                      <th className="pb-4 px-2">Cliente / Enlace</th>
                      <th className="pb-4 px-2">Comentario / Detalle</th>
                      <th className="pb-4 px-2 text-right">Fecha</th>
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
                            <td className="py-4 px-2">
                              <div className="flex items-center justify-center gap-0.5 bg-black/5 rounded-lg py-1 px-2 w-fit mx-auto">
                                <span className="font-black text-black">{resp.rating}</span>
                                <Star className="w-3 h-3 fill-black" />
                              </div>
                            </td>
                            <td className="py-4 px-2">
                              <div className="font-bold text-black">{survey?.name || '---'}</div>
                              <div className="text-xs text-gray-400 italic">{resp.contact_method || 'Sin contacto'}</div>
                            </td>
                            <td className="py-4 px-2 max-w-xs">
                              <div className="text-black truncate font-medium">
                                {resp.rating >= 4 ? resp.improve : resp.complaint}
                              </div>
                              <div className="text-xs text-gray-400 truncate">
                                {resp.contact_detail ? `Ref: ${resp.contact_detail}` : (resp.missing_product ? 'Faltan productos' : 'OK')}
                              </div>
                            </td>
                            <td className="py-4 px-2 text-right text-gray-400 text-xs">
                              {new Date(resp.created_at).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}
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
                <h3 className="text-2xl font-black mb-6 tracking-tight">Crear nuevo enlace</h3>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Nombre del Cliente</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Notaría 43"
                      value={newSurveyName}
                      onChange={(e) => {
                        setNewSurveyName(e.target.value);
                        setNewSurveySlug(e.target.value);
                      }}
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-black font-bold focus:ring-2 focus:ring-black transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Slug / URL</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">/survey/</span>
                      <input 
                        type="text" 
                        placeholder="slug-unico"
                        value={newSurveySlug}
                        onChange={(e) => setNewSurveySlug(e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-20 text-black font-bold focus:ring-2 focus:ring-black transition-all"
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 px-1 mt-1">El enlace se normalizará automáticamente (sin acentos ni espacios).</p>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 bg-gray-100 text-black font-black py-4 rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={createSurvey}
                      className="flex-1 bg-black text-white font-black py-4 rounded-2xl hover:opacity-90 transition-all active:scale-95"
                    >
                      Generar
                    </button>
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
