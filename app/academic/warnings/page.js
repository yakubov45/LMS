"use client";
import React, { useState, useEffect } from "react";
import { AlertTriangle, Send, Search } from "lucide-react";
import { api } from "../../../lib/api";
import Card from "../../../components/Card";
import { useLanguage } from "../../../lib/LanguageContext";
import { translateAll } from "../../../lib/translate";

export default function AcademicWarningsPage() {
    const { t } = useLanguage();
    const [warnings, setWarnings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchWarnings = async () => {
            const warnData = await api.getAcademicWarnings();
            setWarnings(warnData);
            setLoading(false);
        };
        fetchWarnings();
    }, []);

    const issueNotice = async (id, reason) => {
        if (confirm(t('confirmNotice'))) {
            setWarnings(warnings.map(w => w.id === id ? { ...w, notified: true } : w));
            // AI Translate the reason for historical records/notices
            try {
                const translations = await translateAll(reason);
                console.log("AI translations for notice:", translations);
            } catch (e) {
                console.error("AI translation failed:", e);
            }
            alert(t('noticeIssued'));
        }
    };

    const filteredWarnings = warnings.filter(w => w.student.toLowerCase().includes(searchQuery.toLowerCase()));

    if (loading) return null;

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">{t('academicWarnings')}</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">{t('trackNotices')}</p>
                </div>
            </header>

            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-6 h-6 text-amber-500" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('activeCases')}</h2>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('searchStudents')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/40 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWarnings.map((warn) => (
                        <div key={warn.id} className={`p-6 rounded-3xl border transition-all ${warn.notified ? 'bg-slate-50/50 border-slate-200 opacity-60' : 'bg-amber-50/50 border-amber-100 hover:shadow-lg'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{warn.student}</h4>
                                <span className="text-xs font-black text-slate-400">{warn.date}</span>
                            </div>
                            <p className={`text-sm font-bold leading-relaxed mb-6 ${warn.notified ? 'text-slate-600' : 'text-amber-700'}`}>
                                {warn.reason}
                            </p>

                            {warn.notified ? (
                                <div className="w-full py-3 bg-slate-100 text-slate-500 rounded-xl text-xs font-black uppercase tracking-[0.2em] text-center flex items-center justify-center space-x-2">
                                    <span>{t('noticeIssued')}</span>
                                </div>
                            ) : (
                                <button onClick={() => issueNotice(warn.id, warn.reason)} className="w-full py-3 bg-[#1e293b] text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center space-x-2 active:scale-95 transform shadow-md">
                                    <Send className="w-4 h-4" />
                                    <span>{t('issueNotice')}</span>
                                </button>
                            )}
                        </div>
                    ))}
                    {filteredWarnings.length === 0 && (
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest col-span-3 text-center py-10">{t('noCases')}</p>
                    )}
                </div>
            </Card>
        </div>
    );
}

