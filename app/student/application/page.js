"use client";

import { useState } from "react";
import {
  FileText, FileCheck, Clock, AlertCircle,
  Download, Plus, Search, Filter,
  MoreHorizontal, ChevronRight, Send,
  ShieldCheck, History, Info, X
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/LanguageContext";
import Card from "../../../components/Card";

export default function ApplicationPage() {
  const { t } = useLanguage();
  const [requests, setRequests] = useState([
    { id: "REQ-9924", title: t('academicTranscript'), date: "May 10, 2026", status: 'InProgress', type: "Standard" },
    { id: "REQ-9812", title: t('visaVerification'), date: "May 08, 2026", status: 'Completed', type: "Express" },
    { id: "REQ-9755", title: t('libraryClearance'), date: "May 02, 2026", status: 'Pending', type: "Digital" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", type: "Standard", purpose: "", details: "" });

  const handleNewRequest = (preTitle = "") => {
    setFormData({ title: preTitle, type: "Standard", purpose: "", details: "" });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReq = {
      id: `REQ-${Math.floor(Math.random() * 9000) + 1000}`,
      title: formData.title,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: "In Progress",
      type: formData.type
    };
    setRequests([newReq, ...requests]);
    setShowModal(false);
  };

  return (
    <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* Header Section */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
        <div>
          <h1 className="text-[40px] font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-3">{t('docServiceTitle')}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">{t('docServiceSubtitle')}</p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={() => handleNewRequest()}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-3 px-8 py-3.5 bg-slate-900 dark:bg-slate-800 text-white rounded-[24px] text-xs font-black uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-xl shadow-slate-200 dark:shadow-none transform active:scale-95"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>{t('newRequest')}</span>
          </button>
          <button className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[24px] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
            <History className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

        {/* Main Request History */}
        <div className="xl:col-span-2 space-y-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('myApplications')}</h2>
            <div className="flex items-center space-x-3 bg-white/40 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5 p-1 rounded-2xl">
              <button className="px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">{t('all')}</button>
              <button className="px-4 py-2 text-slate-500 dark:text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white dark:hover:bg-slate-800 transition-all">{t('pending')}</button>
            </div>
          </div>

          <div className="space-y-4">
            {requests.map(req => (
              <RequestCard key={req.id} {...req} />
            ))}
          </div>

          {/* Quick Request Grid */}
          <div className="pt-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-8">{t('serviceCatalog')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: t('academicTranscript'), desc: 'Transcript va baholar haqida', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
                { title: t('recommendationLetter'), desc: 'Fakultet ustozlaridan so\'rash', icon: Send, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10' },
                { title: t('visaVerification'), desc: 'Sayohat va o\'qishni tasdiqlsh', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
                { title: t('libraryClearance'), desc: 'Kitob qaytarish va hisob holati', icon: FileCheck, color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-500/10' },
              ].map((service, idx) => (
                <Card
                  key={idx}
                  onClick={() => handleNewRequest(service.title)}
                  className="p-8 bg-white/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 rounded-[40px] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group cursor-pointer"
                >
                  <div className={`p-4 ${service.bg} rounded-3xl w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`w-7 h-7 ${service.color}`} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">{service.title}</h3>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{service.desc}</p>
                  <div className="mt-8 flex items-center text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <span>{t('applyNow')}</span>
                    <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info & Status */}
        <div className="space-y-8">
          <Card className="p-8 bg-slate-900 dark:bg-slate-950 text-white rounded-[40px] shadow-xl overflow-hidden relative border border-white/5">
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-indigo-500 rounded-xl">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black tracking-tight uppercase">{t('limits')}</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>{t('digitalCerts')}</span>
                    <span className="text-white">8/10 {t('used')}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[80%] rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>{t('expressMail')}</span>
                    <span className="text-white">1/3 {t('used')}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[33%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5 rounded-[40px] shadow-sm">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-3">{t('reminder')}</h3>
            <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-8">{t('reminderDesc')}</p>
            <div className="p-5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 rounded-3xl flex items-center space-x-4">
              <Clock className="w-6 h-6 text-indigo-500 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('avgWait')}</p>
                <p className="text-sm font-black text-slate-800 dark:text-white tracking-tight">2.5 {t('daysCount')}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* New Request Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl p-10 border border-white dark:border-white/10 overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{t('newRequest')}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{t('docServiceSubtitle')}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('docName')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('docNamePlaceholder')}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('serviceType')}</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-700 dark:text-slate-300"
                >
                  <option value="Standard">{t('standard3Days')}</option>
                  <option value="Express">{t('expressToday')}</option>
                  <option value="Digital">{t('digitalBlockchain')}</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('purpose')}</label>
                <input
                  type="text"
                  placeholder={t('purposePlaceholder')}
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('additionalInfo')}</label>
                <textarea
                  placeholder={t('additionalInfoPlaceholder')}
                  rows="3"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
                />
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5 flex justify-end space-x-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">{t('cancel')}</button>
                <button
                  type="submit"
                  className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 transform"
                >
                  {t('submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function RequestCard({ id, title, date, status, type }) {
  const { t } = useLanguage();
  const statusKey = `status${status.replace(/\s/g, '')}`;
  const statusLabel = t(statusKey) || status;

  return (
    <Card className="p-6 bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5 rounded-3xl shadow-sm hover:shadow-md transition-all group">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className={`p-4 rounded-2xl ${status === 'Completed' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600'}`}>
            {status === 'Completed' ? <FileCheck className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{title}</h4>
            <div className="flex items-center space-x-3 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
              <span>{id}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>{date}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right">
            <span className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${status === 'Completed' ? 'bg-emerald-500 text-white' : status === 'InProgress' ? 'bg-amber-500 text-white' : 'bg-slate-500 text-white'}`}>
              {statusLabel}
            </span>
          </div>
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  );
}
