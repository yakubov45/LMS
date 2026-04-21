"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Calendar, ClipboardList, FileCheck, Plus,
    Clock, BookOpen, MoreHorizontal, CheckCircle,
    Search, Filter, ChevronRight
} from "lucide-react";
import { api } from "../../lib/api";
import Card from "../../components/Card";
import { useLanguage } from "../../lib/LanguageContext";

export default function TeacherDashboard() {
    const [assignments, setAssignments] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            const assData = await api.getTeacherAssignments();
            const schData = await api.getTeacherSchedule();
            const subData = await api.getTeacherSubmissions();
            setAssignments(assData || []);
            setSchedule(schData || []);
            setSubmissions(subData || []);
            setLoading(false);
        };
        fetchData();
    }, []);

    const pendingSubmissions = submissions.filter(s => s.status !== "Graded" && s.status !== "Approved").length;

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="mb-12">
                <h1 className="text-[40px] font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">{t('academicInstruction')}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">{t('facultyDashboardSubtitle')}</p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Left Column: Stats */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-8 bg-indigo-600 text-white rounded-[40px] shadow-xl relative overflow-hidden">
                            <h3 className="text-xl font-black mb-1">{t('gradingQueue')}</h3>
                            <p className="text-indigo-100 text-sm font-bold opacity-80 mb-6">{pendingSubmissions} {t('submissionsAwaiting')}</p>
                            <Link href="/teacher/submissions" className="inline-block px-6 py-3 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                                {t('startGrading')}
                            </Link>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        </Card>
                        <Card className="p-8 bg-slate-900 text-white rounded-[40px] shadow-xl relative overflow-hidden">
                            <h3 className="text-xl font-black mb-1">{t('upcomingExam')}</h3>
                            <p className="text-slate-400 text-sm font-bold opacity-80 mb-6">{t('physicsMidterm')}</p>
                            <Link href="/teacher/exam" className="inline-block px-6 py-3 bg-white/10 border border-white/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                                {t('reviewPapers')}
                            </Link>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
                        </Card>
                    </div>
                </div>

                {/* Right Column: Schedule & Tasks */}
                <div className="space-y-8">
                    <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{t('todaysSchedule')}</h2>
                            <Calendar className="w-5 h-5 text-indigo-500" />
                        </div>

                        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {Object.entries(
                                schedule.reduce((acc, item) => {
                                    const day = item.day || "Today";
                                    if (!acc[day]) acc[day] = [];
                                    acc[day].push(item);
                                    return acc;
                                }, {})
                            ).map(([day, items]) => (
                                <div key={day} className="mb-6 last:mb-0">
                                    <h3 className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-4 bg-indigo-50 dark:bg-indigo-900/20 inline-block px-3 py-1 rounded-lg">
                                        {day}
                                    </h3>
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <div key={item.id} className="relative pl-6 border-l-2 border-indigo-100 dark:border-white/5 py-2">
                                                <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-500"></div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.time}</p>
                                                <h4 className="text-[14px] font-black text-slate-900 dark:text-white uppercase leading-tight">{item.course}</h4>
                                                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-tight">{item.room}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {schedule.length === 0 && (
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{t('noClassesToday')}</p>
                            )}
                        </div>

                        <Link href="/teacher/attendance" className="block w-full mt-8 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 transition-all text-center">
                            {t('attendance')}
                        </Link>
                    </Card>

                    <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-8">{t('facultyAnnouncements')}</h2>
                        <div className="space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="flex items-start space-x-3 p-3 rounded-2xl hover:bg-white/60 transition-colors cursor-pointer">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400 leading-relaxed uppercase tracking-tight">
                                        {t('facultyMeetingNotice')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
