"use client";
import React, { useState, useEffect } from "react";
import {
    FileText, CheckCircle, XCircle, Clock,
    AlertTriangle, Search, Filter, Mail,
    ChevronDown, MoreHorizontal, UserCheck,
    Newspaper, Users, Calendar
} from "lucide-react";
import { api } from "../../lib/api";
import Card from "../../components/Card";
import { useLanguage } from "../../lib/LanguageContext";

export default function AcademicDashboard() {
    const [requests, setRequests] = useState([]);
    const [warnings, setWarnings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("All");
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            const reqData = await api.getDocumentRequests();
            const warnData = await api.getAcademicWarnings();
            setRequests(reqData);
            setWarnings(warnData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const updateRequestStatus = (id, newStatus) => {
        if (confirm(t('confirmStatusChange').replace('{status}', t(newStatus.toLowerCase())))) {
            setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
        }
    };

    const filteredRequests = filterStatus === "All" ? requests : requests.filter(r => r.status === filterStatus);

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="mb-12 text-center md:text-left">
                <h1 className="text-3xl md:text-[40px] font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">{t('academicRegistry')}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">{t('academicSubtitle')}</p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Left Column: Document Requests */}
                <div className="xl:col-span-2 space-y-8">
                    <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('pendingRequests')}</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{t('pendingRequestsSubtitle')}</p>
                            </div>
                            <div className="flex bg-slate-100/50 p-1 rounded-xl">
                                {['All', 'Pending', 'Approved'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === status ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
                                    >
                                        {t(status.toLowerCase()) || status}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-white/5 pb-4">
                                        <th className="pb-4 pl-2">{t('student')}</th>
                                        <th className="pb-4">{t('documentType')}</th>
                                        <th className="pb-4">{t('date')}</th>
                                        <th className="pb-4 text-right pr-2">{t('actions')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                    {filteredRequests.map((req) => (
                                        <tr key={req.id} className="group hover:bg-white/40 transition-colors">
                                            <td className="py-6 pl-2">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center font-bold text-orange-500">
                                                        {req.student.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{req.student}</span>
                                                </div>
                                            </td>
                                            <td className="py-6">
                                                <div className="flex items-center space-x-2">
                                                    <FileText className="w-4 h-4 text-slate-400" />
                                                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight">{req.type}</span>
                                                </div>
                                            </td>
                                            <td className="py-6">
                                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{req.date}</span>
                                            </td>
                                            <td className="py-6 text-right pr-2">
                                                <div className="flex items-center justify-end space-x-2">
                                                    {req.status === 'Pending' ? (
                                                        <>
                                                            <button onClick={() => updateRequestStatus(req.id, 'Approved')} className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all shadow-sm active:scale-90 transform">
                                                                <CheckCircle className="w-4.5 h-4.5" />
                                                            </button>
                                                            <button onClick={() => updateRequestStatus(req.id, 'Rejected')} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all shadow-sm active:scale-90 transform">
                                                                <XCircle className="w-4.5 h-4.5" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                                                            }`}>
                                                            {t(req.status.toLowerCase()) || req.status}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredRequests.length === 0 && (
                                <div className="py-20 text-center">
                                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">{t('noRequests')}</p>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-8 bg-[#1e293b] text-white rounded-[40px] shadow-xl relative overflow-hidden flex items-center justify-between">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black mb-1 uppercase tracking-tighter">84%</h3>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t('graduationReadiness')}</p>
                            </div>
                            <UserCheck className="w-12 h-12 text-indigo-400 opacity-50 relative z-10" />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        </Card>
                        <Card className="p-8 bg-white border border-slate-100 rounded-[40px] shadow-sm flex items-center justify-between">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 mb-1 uppercase tracking-tighter">12</h3>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t('newRequestsToday')}</p>
                            </div>
                            <div className="p-4 bg-indigo-50 rounded-2xl">
                                <FileText className="w-8 h-8 text-indigo-500" />
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Right Column: Academic Warnings */}
                <div className="space-y-8">
                    {/* Management Links */}
                    <Card className="p-8 bg-white border border-slate-100 dark:border-white/5 rounded-[40px] shadow-sm">
                        <h3 className="text-xl font-black mb-6 uppercase tracking-tighter text-slate-900 dark:text-white">{t('management')}</h3>
                        <div className="space-y-4">
                            {[
                                { name: t('newsTitle'), path: '/academic/news', icon: Newspaper, color: 'bg-orange-50 text-orange-600' },
                                { name: t('teachersTitle'), path: '/academic/teachers', icon: Users, color: 'bg-blue-50 text-blue-600' },
                                { name: t('eventsTitle'), path: '/academic/events', icon: Calendar, color: 'bg-emerald-50 text-emerald-600' },
                            ].map((item) => (
                                <a
                                    key={item.name}
                                    href={item.path}
                                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2.5 rounded-xl ${item.color}`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight">{item.name}</span>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-slate-300 -rotate-90 group-hover:text-slate-600 transition-all" />
                                </a>
                            ))}
                        </div>
                    </Card>

                    <Card className="bg-indigo-600 text-white rounded-[40px] p-8 shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">{t('officeHours')}</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest">{t('monFri')}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">09:00 - 17:00</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest">{t('sat')}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">10:00 - 13:00</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mb-16"></div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
