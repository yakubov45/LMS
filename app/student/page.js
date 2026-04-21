"use client";
import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import {
    Search, Calendar, ChevronDown, MoreHorizontal, Sun,
    Play, Clock, HelpCircle, FileText, CheckCircle2,
    Layout, ArrowUpRight, GraduationCap, Flame,
    ArrowRight, Bell, Settings, Filter, X
} from "lucide-react";
import { dashboardStats, upcomingClasses, classmatesTable } from "../../data/mock";
import { useLanguage } from "../../lib/LanguageContext";

const StatCard = ({ title, value, status, progress, icon: Icon, onClick, t }) => (
    <div
        onClick={onClick}
        className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-[32px] p-6 shadow-sm flex flex-col justify-between h-[160px] group hover:bg-white/80 dark:hover:bg-slate-800/60 transition-all duration-300 cursor-pointer"
    >
        <div className="flex justify-between items-start">
            <div className={`p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            {status && (
                <div className="flex items-center space-x-1 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full border border-green-100 dark:border-green-500/20">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">{t('active')}</span>
                </div>
            )}
        </div>
        <div>
            <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400 mb-1">{title}</p>
            <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-black text-slate-800 dark:text-white">{value}</span>
                {progress !== undefined && (
                    <div className="flex-1 max-w-[120px]">
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                            <span>{t('progress')}</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <div className="flex items-center text-[11px] font-bold text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-white transition-colors mt-2 group-hover:translate-x-1 duration-300">
            {t('viewDetails')} <ArrowRight className="ml-1 h-3 w-3" />
        </div>
    </div>
);

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [upcoming, setUpcoming] = useState([]);
    const [classmates, setClassmates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState("2026");
    const [showModal, setShowModal] = useState(false);
    const [selectedModal, setSelectedModal] = useState(null);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [s, u, c] = await Promise.all([
                    api.getDashboardStats(),
                    api.getUpcomingClasses(),
                    api.getClassmates()
                ]);
                setStats(s);
                setUpcoming(u);
                setClassmates(c);
            } catch (err) {
                console.error("Dashboard Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || !stats) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">

            {/* Top Toolbar */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="relative w-full md:w-96 group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-4.5 w-4.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        onClick={() => window.dispatchEvent(new CustomEvent('open-global-search'))}
                        onFocus={() => window.dispatchEvent(new CustomEvent('open-global-search'))}
                        className="w-full bg-white/40 border border-white/60 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all shadow-sm"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center">
                        <kbd className="hidden sm:flex h-5 items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
                            <span className="text-xs">/</span>
                        </kbd>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="flex bg-white/40 border border-white/60 rounded-2xl p-1 shadow-sm">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-xs text-sm font-bold text-slate-800">
                            <Calendar className="w-4 h-4" />
                            <span>{selectedYear}</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <button className="p-2.5 bg-white/40 border border-white/60 rounded-2xl shadow-sm hover:bg-white transition-colors">
                        <Sun className="w-5 h-5 text-slate-600" />
                    </button>
                    <button className="p-2.5 bg-white/40 border border-white/60 rounded-2xl shadow-sm hover:bg-white transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
            </header>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title={t('enrolledCourses')}
                    value={stats.enrolledCourses}
                    status="Active"
                    progress={55}
                    icon={Layout}
                    onClick={() => { setSelectedModal('courses'); setShowModal(true); }}
                    t={t}
                />
                <StatCard
                    title={t('totalAssignments')}
                    value={stats.totalAssignments}
                    icon={FileText}
                    onClick={() => { setSelectedModal('assignments'); setShowModal(true); }}
                    t={t}
                />
                <StatCard
                    title={t('completedCourses')}
                    value={stats.completedCourses}
                    icon={CheckCircle2}
                    onClick={() => { setSelectedModal('completed'); setShowModal(true); }}
                    t={t}
                />
                <StatCard
                    title={t('upcomingQuiz')}
                    value={`${stats.upcomingQuizzes} ${t('days')}`}
                    icon={Bell}
                    onClick={() => { setSelectedModal('quiz'); setShowModal(true); }}
                    t={t}
                />
            </div>

            {/* Detail Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
                    <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden border border-white dark:border-white/10 max-h-[90vh] flex flex-col">
                        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
                                    {selectedModal === 'courses' && t('activeCoursesTitle')}
                                    {selectedModal === 'assignments' && t('assignmentsStatusTitle')}
                                    {selectedModal === 'completed' && t('completedCoursesTitle')}
                                    {selectedModal === 'quiz' && t('upcomingAssessmentsTitle')}
                                </h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{t('detailsSubtitle')}</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all transform active:scale-95">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto overflow-x-hidden custom-scrollbar">
                            {selectedModal === 'courses' && (
                                <div className="space-y-4">
                                    {[
                                        { name: 'Computer Science 101', code: 'CS101', credits: 4, prof: 'Dr. Sarah Connor', room: 'A-102', progress: 65, color: 'indigo' },
                                        { name: 'Modern Architecture', code: 'ARC202', credits: 3, prof: 'Arch. Peter Parker', room: 'B-405', progress: 40, color: 'emerald' },
                                        { name: 'Quantum Physics', code: 'PHY301', credits: 4, prof: 'Dr. Bruce Banner', room: 'Lab-12', progress: 20, color: 'rose' },
                                        { name: 'Business Ethics', code: 'BUS105', credits: 2, prof: 'Prof. Tony Stark', room: 'C-201', progress: 90, color: 'amber' },
                                    ].map((course, i) => (
                                        <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-indigo-200 dark:hover:border-indigo-500/20 transition-all group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{course.name}</h4>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{course.code} • {course.credits} {t('credits')} • {t('room')} {course.room}</p>
                                                </div>
                                                <div className={`px-2 py-1 rounded-lg text-[9px] font-black bg-${course.color}-100 dark:bg-${course.color}-500/10 text-${course.color}-600 dark:text-${course.color}-400 uppercase tracking-widest`}>{t('ongoing')}</div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    <span>{t('professor')}: {course.prof}</span>
                                                    <span>{course.progress}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div className={`h-full bg-${course.color}-500 rounded-full`} style={{ width: `${course.progress}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedModal === 'assignments' && (
                                <div className="space-y-4">
                                    {[
                                        { title: 'Project Research Lab', subject: 'CS101', due: 'Today, 23:59', status: 'Pending', priority: 'High' },
                                        { title: 'Mid-term Essay', subject: 'Literature', due: 'Tomorrow', status: 'Submitted', priority: 'Medium' },
                                        { title: 'Final Quiz Prep', subject: 'Physics', due: 'May 20', status: 'In Review', priority: 'High' },
                                        { title: 'Case Study Analysis', subject: 'Business', due: 'May 22', status: 'Graded', priority: 'Low' },
                                    ].map((task, i) => (
                                        <div key={i} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-white/5">
                                            <div className="flex items-center space-x-4">
                                                <div className={`p-3 rounded-2xl ${task.status === 'Submitted' ? 'bg-emerald-50 text-emerald-600' : task.status === 'Pending' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                                                    {task.status === 'Submitted' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <h4 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{task.title}</h4>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{task.subject} • {t('due')}: {task.due}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${task.priority === 'High' ? 'bg-rose-500 text-white' : 'bg-slate-500 text-white'}`}>
                                                    {task.priority}
                                                </div>
                                                <p className="text-[10px] font-black text-slate-500 mt-2 uppercase tracking-widest">{t(task.status.toLowerCase().replace(' ', '')) || task.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedModal === 'completed' && (
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { name: 'Introduction to Logic', code: 'PHL101', grade: 'A', date: 'Fall 2025', professor: 'Prof. Xavier' },
                                        { name: 'World History', code: 'HIS102', grade: 'B+', date: 'Spring 2025', professor: 'Dr. Jones' },
                                        { name: 'Web Development', code: 'CS204', grade: 'A+', date: 'Spring 2025', professor: 'Steve Rogers' },
                                        { name: 'Macroeconomics', code: 'ECO101', grade: 'A', date: 'Fall 2024', professor: 'Tony Stark' },
                                    ].map((course, i) => (
                                        <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-white/5 flex justify-between items-center group hover:bg-white dark:hover:bg-slate-800 transition-all">
                                            <div>
                                                <h4 className="text-sm font-black text-slate-900 dark:text-white tracking-tight uppercase">{course.name}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{course.code} • {course.date} • {course.professor}</p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('finalGrade')}</p>
                                                    <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">{course.grade}</p>
                                                </div>
                                                <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedModal === 'quiz' && (
                                <div className="space-y-6">
                                    {[
                                        { title: 'Mid-term Quiz', subject: 'Physics', time: 'Tomorrow, 10:00', duration: '45 min', platform: 'LMS Portal', color: 'indigo' },
                                        { title: 'Weekly Assessment', subject: 'Computer Science', time: 'Friday, 14:30', duration: '30 min', platform: 'Campus Lab', color: 'emerald' },
                                        { title: 'Lab Practical', subject: 'Chemistry', time: 'May 20, 09:00', duration: '90 min', platform: 'Science Wing', color: 'rose' },
                                    ].map((quiz, i) => (
                                        <div key={i} className="relative p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-white/5 overflow-hidden group">
                                            <div className={`absolute top-0 left-0 bottom-0 w-1.5 bg-${quiz.color}-500`}></div>
                                            <div className="flex justify-between items-start relative z-10">
                                                <div>
                                                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{quiz.title}</h4>
                                                    <div className="flex items-center space-x-3 mt-3">
                                                        <div className="flex items-center space-x-1 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            <span>{quiz.time}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span>{quiz.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{quiz.subject}</p>
                                                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{quiz.platform}</p>
                                                </div>
                                            </div>
                                            <button className="w-full mt-6 py-2.5 bg-white dark:bg-slate-700 border border-slate-100 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-all">
                                                {t('addToCalendar')}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-8 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/20 shrink-0">
                            <button onClick={() => setShowModal(false)} className="w-full py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 transform">
                                {t('closePage')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left Column: Analytics & Classes */}
                <div className="xl:col-span-2 space-y-8">

                    {/* Report Analytics */}
                    <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">{t('reportAnalytics')}</h2>
                            <div className="flex bg-slate-100/50 p-1 rounded-xl">
                                {['daily', 'weekly', 'monthly'].map((period) => (
                                    <button
                                        key={period}
                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${period === 'weekly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
                                    >
                                        {t(period)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Bar Chart Visual */}
                        <div className="h-64 relative mt-4">
                            <div className="absolute inset-0 flex flex-col justify-between py-1">
                                {[24, 16, 8, 4, 0].map(h => (
                                    <div key={h} className="flex items-center space-x-4">
                                        <span className="w-8 text-[11px] font-bold text-slate-400">{h}h</span>
                                        <div className="flex-1 h-px bg-slate-100"></div>
                                    </div>
                                ))}
                            </div>

                            <div className="absolute inset-0 pl-12 flex justify-around items-end">
                                {[
                                    { day: 'Mon', h: 30, color: 'bg-slate-200' },
                                    { day: 'Tues', h: 60, color: 'bg-slate-200' },
                                    { day: 'Wed', h: 45, color: 'bg-slate-200' },
                                    { day: 'Thurs', h: 80, color: 'bg-indigo-500', active: true },
                                    { day: 'Fri', h: 25, color: 'bg-slate-200' },
                                    { day: 'Sat', h: 35, color: 'bg-slate-200' },
                                    { day: 'Sun', h: 50, color: 'bg-slate-200' },
                                ].map((item) => (
                                    <div key={item.day} className="flex flex-col items-center group w-full max-w-[40px]">
                                        <div
                                            className={`${item.color} w-10 sm:w-12 rounded-xl transition-all duration-500 relative ${item.active ? 'shadow-lg shadow-indigo-200 animate-pulse' : ''}`}
                                            style={{ height: `${item.h}%` }}
                                        >
                                            {item.active && (
                                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1e293b] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl z-20">
                                                    <div className="flex items-center space-x-1.5">
                                                        <Flame className="w-3 h-3 text-orange-400" />
                                                        <span>8 Hours</span>
                                                    </div>
                                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1e293b] rotate-45"></div>
                                                </div>
                                            )}
                                        </div>
                                        <span className="mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Continuing Watching / Course Table */}
                    <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">{t('continuingWatching')}</h2>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white transition-colors">
                                    <Search className="w-4 h-4 text-slate-500" />
                                </button>
                                <button className="p-2 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white transition-colors">
                                    <Filter className="w-4 h-4 text-slate-500" />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-sans">
                                <thead>
                                    <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                        <th className="pb-4 pl-2">{t('id')}</th>
                                        <th className="pb-4">{t('subject')}</th>
                                        <th className="pb-4">{t('date')}</th>
                                        <th className="pb-4">{t('progress')}</th>
                                        <th className="pb-4">{t('assignee')}</th>
                                        <th className="pb-4 text-right pr-2">{t('view')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {classmates.map((course, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 pl-2">
                                                <div className="flex items-center space-x-3">
                                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-200" />
                                                    <span className="text-[13px] font-bold text-slate-500">{course.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <span className="text-[14px] font-bold text-slate-800">{course.subject}</span>
                                            </td>
                                            <td className="py-4">
                                                <span className="text-[13px] font-semibold text-slate-500">{course.date}</span>
                                            </td>
                                            <td className="py-4 w-40">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                                    </div>
                                                    <span className="text-[11px] font-bold text-slate-600">{course.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex -space-x-2">
                                                    {course.avatars.map((a, i) => (
                                                        <img key={i} src={`https://i.pravatar.cc/150?u=${a}`} alt="Student" className="w-6 h-6 rounded-full border-2 border-white ring-1 ring-slate-100" />
                                                    ))}
                                                    {course.avatars.length > 2 && (
                                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border-2 border-white ring-1 ring-slate-100">+1</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 text-right pr-2">
                                                <div className="flex items-center justify-end space-x-3">
                                                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-slate-400 hover:text-slate-900 transition-colors">
                                                        <MoreHorizontal className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Classes and Breakdown */}
                <div className="space-y-8">

                    {/* Online Classes */}
                    <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">{t('onlineClasses')}</h2>
                            <div className="flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">2 {t('ongoing')}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {upcoming.map((cls, idx) => (
                                <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-50 hover:border-slate-100 transition-all cursor-pointer group shadow-sm hover:shadow-md">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-10 rounded-xl ${cls.bg} flex items-center justify-center font-bold text-xs ${cls.color}`}>
                                                {cls.subject.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-[14px] font-bold text-slate-900">{cls.subject}</p>
                                                <p className="text-[12px] font-semibold text-slate-500">{cls.topic}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="text-[11px] font-bold text-slate-700">{cls.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 mr-4">
                                            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                                <div className={`h-full ${cls.percentage > 70 ? 'bg-emerald-500' : 'bg-indigo-500'} rounded-full`} style={{ width: `${cls.percentage}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Flame className={`w-3.5 h-3.5 ${cls.percentage > 70 ? 'text-amber-500' : 'text-slate-400'}`} />
                                            <span className="text-[11px] font-bold text-slate-800">{cls.percentage}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Assignment Breakdown */}
                    <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">{t('assignmentBreakdown')}</h2>
                            <HelpCircle className="w-4.5 h-4.5 text-slate-300" />
                        </div>

                        <div className="space-y-8">
                            {/* Horizontal Segmented Bar */}
                            <div className="h-6 w-full flex rounded-xl overflow-hidden shadow-sm">
                                <div className="h-full bg-emerald-400 w-[60%] border-r border-white/20"></div>
                                <div className="h-full bg-indigo-400 w-[25%] border-r border-white/20"></div>
                                <div className="h-full bg-slate-200 w-[15%]"></div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { label: t('totalSubmitted'), color: 'bg-emerald-400' },
                                    { label: t('inReview'), color: 'bg-indigo-400' },
                                    { label: t('remainingAssignment'), color: 'bg-slate-200' },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center space-x-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

