"use client";
import { useState, useEffect } from "react";
import Card from "../../../components/Card";
import { api } from "../../../lib/api";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, User, MessageCircle } from "lucide-react";

export default function Schedule() {
    const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"];
    const [activeDay, setActiveDay] = useState("Dushanba");
    const [scheduleData, setScheduleData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getSchedule().then(data => {
            setScheduleData(data || []);
            setLoading(false);
        });
    }, []);

    const dailySchedule = scheduleData
        .filter(s => s.day === activeDay)
        .sort((a, b) => (a.para || 0) - (b.para || 0))
        .map(s => ({
            ...s,
            teacher: s.teacher || "Mavjud emas",
            para: s.para || 0,
            details: s.details || "Mavzu bo'yicha nazariy va amaliy bilimlar."
        }));

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-[40px] font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-3">Dars Jadvali</h1>
                    <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        <CalendarIcon className="w-4 h-4 text-indigo-500" />
                        <span>Akademik haftalik (2026-yil, 16-22-aprel)</span>
                    </div>
                </div>

                <div className="flex items-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-1.5 rounded-[24px] shadow-sm border border-slate-200/50 dark:border-white/5">
                    <button className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 transition-all active:scale-90">
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="px-6 py-2">
                        <span className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">Joriy Hafta</span>
                    </div>
                    <button className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 transition-all active:scale-90">
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Day Selector */}
            <div className="flex space-x-3 overflow-x-auto pb-10 scroll-smooth no-scrollbar w-full">
                {days.map(day => (
                    <button
                        key={day}
                        onClick={() => setActiveDay(day)}
                        className={`group relative px-8 py-5 rounded-[28px] text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-500 ${activeDay === day
                            ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-500/30 -translate-y-1.5"
                            : "bg-white/40 dark:bg-slate-900/40 backdrop-blur-md text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-white/5 hover:bg-white dark:hover:bg-slate-800"
                            }`}
                    >
                        {day}
                        {activeDay === day && (
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-white rounded-full"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Redesigned Schedule View */}
            <div className="grid grid-cols-1 gap-10 max-w-5xl">
                {dailySchedule.length > 0 ? (
                    dailySchedule.map((item, idx) => (
                        <div key={item.id} className="group relative flex flex-col md:flex-row items-stretch gap-8">
                            {/* Para info */}
                            <div className="md:w-32 shrink-0 flex flex-col md:items-end md:justify-center">
                                <span className="text-xs font-black text-indigo-500 uppercase tracking-[0.3em] mb-1">{item.para}-Para</span>
                                <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{item.time.split(" - ")[0]}</h4>
                                <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{item.time.split(" - ")[1]}</span>
                            </div>

                            {/* Center Line for desktop */}
                            <div className="hidden md:flex flex-col items-center">
                                <div className={`w-6 h-6 rounded-full border-[6px] transition-all duration-500 group-hover:scale-125 z-10 ${idx % 2 === 0 ? 'bg-indigo-600 border-indigo-100 dark:border-indigo-500/20' : 'bg-emerald-500 border-emerald-100 dark:border-emerald-500/20'}`}></div>
                                {idx !== dailySchedule.length - 1 && <div className="w-px flex-1 bg-slate-200 dark:bg-white/5 my-4"></div>}
                            </div>

                            {/* Main Info Card */}
                            <Card className="flex-1 p-8 md:p-10 bg-white/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 rounded-[40px] hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group-hover:-translate-y-1 relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>

                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest ${item.type === 'Lecture' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600'}`}>
                                                {item.type}
                                            </span>
                                            <div className="flex items-center space-x-2 text-slate-400">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="text-[11px] font-bold uppercase tracking-widest">{item.room}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight mb-4 group-hover:text-indigo-600 transition-colors">
                                        {item.course}
                                    </h3>

                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed italic">
                                        &ldquo;{item.details}&rdquo;
                                    </p>

                                    <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-100 dark:border-white/5">
                                        <div className="flex items-center space-x-4">
                                            <div className="relative">
                                                <img src={item.photo || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop`} className="w-12 h-12 rounded-2xl bg-slate-100 border-2 border-white dark:border-slate-800" alt="Teacher" />
                                                <div className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-white/10">
                                                    <User className="w-2.5 h-2.5 text-indigo-500" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">O'qituvchi</p>
                                                <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{item.teacher}</p>
                                            </div>
                                        </div>

                                        <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all transform active:scale-95 shadow-xl shadow-slate-200/50 dark:shadow-none">
                                            <MessageCircle className="w-4 h-4" />
                                            <span>Xabarlar</span>
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))
                ) : (
                    <div className="py-24 text-center bg-white/30 dark:bg-slate-900/30 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[60px]">
                        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <CalendarIcon className="w-10 h-10 text-indigo-500" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Dam olish kuni</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bugun sizda hech qanday dars mavjud emas</p>
                    </div>
                )}
            </div>
        </div>
    );
}

