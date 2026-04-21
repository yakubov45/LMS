"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Users, BookOpen, FileText, Zap, ShieldCheck,
    Newspaper, CalendarDays, Settings, Activity,
    CheckCircle, AlertCircle, Clock
} from "lucide-react";
import { api } from "../../lib/api";
import Card from "../../components/Card";
import { useLanguage } from "../../lib/LanguageContext";

const StatCard = ({ title, value, icon: Icon }) => (
    <Card className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-[32px] p-6 shadow-sm hover:shadow-lg transition-all">
        <div className="flex justify-between items-center">
            <div>
                <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400 mb-1">{title}</p>
                <span className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">{value}</span>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl">
                <Icon className="w-6 h-6 text-indigo-500" />
            </div>
        </div>
    </Card>
);

const auditLogs = [
    { action: "User blocked", target: "student@uni.edu", time: "2 min ago", type: "warning" },
    { action: "News article published", target: "AI Research Initiative", time: "14 min ago", type: "success" },
    { action: "Settings changed", target: "Registration Open → true", time: "1 hr ago", type: "info" },
    { action: "New user created", target: "prof.adil@uni.edu", time: "2 hr ago", type: "success" },
    { action: "Event deleted", target: "Old Alumni Meet 2025", time: "5 hr ago", type: "warning" },
];

const logIcon = { success: CheckCircle, warning: AlertCircle, info: Clock };
const logColor = { success: "text-emerald-500", warning: "text-amber-500", info: "text-indigo-400" };

const quickLinks = [
    { label: "newsManagement", path: "/admin/news", icon: Newspaper, color: "bg-indigo-600" },
    { label: "eventsManagement", path: "/admin/events", icon: CalendarDays, color: "bg-emerald-600" },
    { label: "systemSettings", path: "/admin/settings", icon: Settings, color: "bg-amber-500" },
    { label: "userManagement", path: "/admin/users", icon: Users, color: "bg-slate-700" },
];

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            const usersData = await api.getUsers();
            const statsData = await api.getAdminStats();
            setUsers(usersData);
            setStats(statsData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const iconMap = { Users, BookOpen, FileText, Zap };

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">{t('adminAuthority')}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">{t('adminSubtitle')}</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((s, idx) => (
                    <StatCard
                        key={idx}
                        title={t(s.title.toLowerCase().replace(' ', '')) || s.title}
                        value={s.value}
                        icon={iconMap[s.icon] || ShieldCheck}
                    />
                ))}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {quickLinks.map(({ label, path, icon: Icon, color }) => (
                    <Link key={path} href={path} className={`flex flex-col items-center justify-center gap-3 p-6 ${color} text-white rounded-[32px] shadow-lg hover:scale-[1.03] hover:shadow-xl transition-all duration-300`}>
                        <Icon className="w-7 h-7 opacity-90" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight opacity-90">{t(label)}</span>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Audit Logs */}
                <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-indigo-50 rounded-2xl">
                            <Activity className="w-5 h-5 text-indigo-500" />
                        </div>
                        <h2 className="text-lg font-black text-slate-900 dark:text-white">{t('auditLog')}</h2>
                    </div>
                    <div className="space-y-3">
                        {auditLogs.map((log, idx) => {
                            const Icon = logIcon[log.type] || Clock;
                            return (
                                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/80 transition-all">
                                    <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${logColor[log.type]}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-slate-900 dark:text-white">{log.action}</p>
                                        <p className="text-xs font-bold text-slate-500 truncate">{log.target}</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">{log.time}</span>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* System Health */}
                <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-emerald-50 rounded-2xl">
                            <Zap className="w-5 h-5 text-emerald-500" />
                        </div>
                        <h2 className="text-lg font-black text-slate-900 dark:text-white">{t('systemHealthTitle')}</h2>
                    </div>
                    <div className="space-y-5">
                        {[
                            { label: "API Response", value: 98, color: "bg-emerald-500" },
                            { label: "DB Load", value: 42, color: "bg-indigo-500" },
                            { label: "Storage Used", value: 67, color: "bg-amber-500" },
                            { label: "Active Sessions", value: 81, color: "bg-indigo-400" },
                        ].map(({ label, value, color }) => (
                            <div key={label}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
                                    <span className="text-sm font-black text-slate-900 dark:text-white">{value}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${value}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
