"use client";
import React, { useState } from "react";
import Card from "../../../components/Card";
import { Settings, ToggleLeft, ToggleRight, Save, Shield, Zap, Globe, Database } from "lucide-react";
import { useLanguage } from "../../../lib/LanguageContext";

const SETTINGS_GROUPS = [
    {
        group: "Platform",
        icon: Globe,
        color: "indigo",
        settings: [
            { key: "registrationOpen", label: "Student Registration Open", desc: "Allow new students to register accounts", default: true },
            { key: "maintenanceMode", label: "Maintenance Mode", desc: "Show maintenance page to all users", default: false },
            { key: "twoFactorAuth", label: "Two-Factor Authentication", desc: "Require 2FA for all admin accounts", default: true },
        ]
    },
    {
        group: "Academic",
        icon: Database,
        color: "emerald",
        settings: [
            { key: "gradeRelease", label: "Grade Release", desc: "Allow students to view their grades", default: true },
            { key: "schedulePublic", label: "Public Schedule", desc: "All schedules visible without login", default: false },
            { key: "semesterActive", label: "Semester Active", desc: "Current semester is marked as active", default: true },
        ]
    },
    {
        group: "System",
        icon: Zap,
        color: "amber",
        settings: [
            { key: "emailNotifications", label: "Email Notifications", desc: "Send automatic email to users on events", default: true },
            { key: "debugLogs", label: "Debug Logging", desc: "Log all API calls (performance impact)", default: false },
            { key: "autoBackup", label: "Auto Database Backup", desc: "Backup every 24 hours automatically", default: true },
        ]
    },
];

export default function AdminSettingsPage() {
    const { t } = useLanguage();
    const [toggles, setToggles] = useState(() => {
        const init = {};
        SETTINGS_GROUPS.forEach(g => g.settings.forEach(s => { init[s.key] = s.default; }));
        return init;
    });
    const [saved, setSaved] = useState(false);

    const handleToggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    const colorMap = {
        indigo: { icon: "bg-indigo-50 text-indigo-500", badge: "bg-indigo-50 text-indigo-600", ring: "ring-indigo-500" },
        emerald: { icon: "bg-emerald-50 text-emerald-500", badge: "bg-emerald-50 text-emerald-600", ring: "ring-emerald-500" },
        amber: { icon: "bg-amber-50 text-amber-500", badge: "bg-amber-50 text-amber-600", ring: "ring-amber-500" },
    };

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">{t('systemSettings')}</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">{t('configureSettings')}</p>
                </div>
                <button
                    onClick={handleSave}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg ${saved ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"}`}
                >
                    <Save className="w-4 h-4" />
                    <span>{saved ? t('settingsSaved') : t('saveSettingsBtn')}</span>
                </button>
            </header>

            <div className="space-y-8">
                {SETTINGS_GROUPS.map(({ group, icon: Icon, color, settings }) => (
                    <Card key={group} className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`p-3 rounded-2xl ${colorMap[color].icon}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{t(group.toLowerCase() + "SettingsGroup") || `${group} Settings`}</h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{settings.length} {t('optionsCount') || "options"}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {settings.map(s => (
                                <div key={s.key} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-800/30 hover:bg-white/80 transition-all">
                                    <div>
                                        <p className="text-sm font-black text-slate-900 dark:text-white">{t(s.key + "Label") || s.label}</p>
                                        <p className="text-xs font-bold text-slate-500 mt-0.5">{t(s.key + "Desc") || s.desc}</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle(s.key)}
                                        className="relative shrink-0 ml-6 transition-all duration-300"
                                        aria-label={`Toggle ${s.label}`}
                                    >
                                        {toggles[s.key] ? (
                                            <ToggleRight className="w-8 h-8 text-indigo-500" />
                                        ) : (
                                            <ToggleLeft className="w-8 h-8 text-slate-300" />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>

            {/* Security Warning */}
            <Card className="mt-6 p-6 bg-amber-50 border border-amber-100 rounded-[32px] flex items-start gap-4">
                <Shield className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-amber-700 leading-relaxed">
                    {t('securityNote')}
                </p>
            </Card>
        </div>
    );
}
