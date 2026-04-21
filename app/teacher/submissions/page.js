"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Search, Edit } from "lucide-react";
import Card from "../../../components/Card";
import { useLanguage } from "../../../lib/LanguageContext";
import { api } from "../../../lib/api";

export default function TeacherSubmissionsPage() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showGradeModal, setShowGradeModal] = useState(false);
    const [gradingItem, setGradingItem] = useState(null);
    const [gradeInput, setGradeInput] = useState("");

    useEffect(() => {
        api.getTeacherSubmissions().then((data) => {
            setSubmissions(data || []);
            setLoading(false);
        });
    }, []);

    const openGradeModal = (sub) => {
        setGradingItem(sub);
        setGradeInput(sub.grade && sub.grade !== "-" ? sub.grade : "");
        setShowGradeModal(true);
    };

    const handleSaveGrade = async () => {
        const payload = { grade: gradeInput, status: "Graded" };
        const res = await api.updateSubmissionGrade(gradingItem.id, payload);
        if (res.success) {
            setSubmissions(submissions.map(s => s.id === gradingItem.id ? { ...s, ...payload } : s));
            setShowGradeModal(false);
        }
    };

    const filteredSubmissions = submissions.filter(s =>
        (s.student || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.assignment || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">{t('submissionsGrading')}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">{t('reviewingStudentAss')}</p>
            </header>

            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('filterStudentAss')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/40 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-white/5 pb-4">
                                <th className="pb-4 pl-4">{t('student')}</th>
                                <th className="pb-4">{t('assignments')}</th>
                                <th className="pb-4">{t('submittedOn')}</th>
                                <th className="pb-4">{t('statusGrade')}</th>
                                <th className="pb-4 text-right pr-4">{t('action')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {filteredSubmissions.map((sub) => (
                                <tr key={sub.id} className="group hover:bg-white/40 transition-colors">
                                    <td className="py-5 pl-4">
                                        <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{sub.student}</p>
                                    </td>
                                    <td className="py-5">
                                        <p className="text-sm font-bold text-slate-600">{sub.assignment}</p>
                                    </td>
                                    <td className="py-5">
                                        <p className="text-xs font-bold text-slate-400">{sub.date}</p>
                                    </td>
                                    <td className="py-5">
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${sub.status === 'Graded' ? 'bg-emerald-50 text-emerald-600' :
                                                sub.status === 'Late' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                                                }`}>
                                                {t(sub.status.toLowerCase().replace(/\s+/g, '')) || sub.status}
                                            </span>
                                            {sub.grade !== "-" && (
                                                <span className="text-sm font-black text-slate-900">{sub.grade}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-5 text-right pr-4">
                                        <button onClick={() => openGradeModal(sub)} className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-white/10 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all font-bold text-[10px] uppercase tracking-widest">
                                            {sub.status === 'Graded' ? t('editGrades') : t('grade')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {showGradeModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowGradeModal(false)}></div>
                    <div className="relative w-full max-w-sm bg-white rounded-[32px] shadow-2xl p-8 border border-white">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{t('assignGrade')}</h3>
                        <p className="text-sm font-bold text-slate-500 mb-6">{t('grading')} <span className="text-slate-800">{gradingItem?.student}</span></p>

                        <div className="mb-8">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('letterGrade')}</label>
                            <input
                                autoFocus
                                type="text"
                                maxLength={2}
                                value={gradeInput}
                                onChange={(e) => setGradeInput(e.target.value.toUpperCase())}
                                className="w-full text-center text-4xl font-black bg-slate-50 border border-slate-200 rounded-2xl py-6 px-4 outline-none focus:ring-2 focus:ring-indigo-500/20"
                                placeholder="A"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setShowGradeModal(false)} className="py-3.5 rounded-xl font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">{t('cancel')}</button>
                            <button disabled={!gradeInput} onClick={handleSaveGrade} className="py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95 transform disabled:opacity-50">{t('save')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
