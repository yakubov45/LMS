"use client";
import React from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { useUser } from '../lib/UserContext';
import { useLanguage } from '../lib/LanguageContext';

export default function Header() {
    const { role, user } = useUser();
    const { t } = useLanguage();

    const getWorkspaceTitle = () => {
        if (!role) return "";
        if (role === 'student') return t('studentWorkspace');
        return t(`${role}Dashboard`);
    };

    return (
        <header className="w-full h-16 md:h-20 flex items-center justify-between px-6 md:px-10 border-b border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shrink-0 z-50">
            <div className="flex items-center">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
                    {getWorkspaceTitle()}
                </h2>
            </div>

            <div className="flex items-center space-x-4">
                {role === 'student' && (
                    <Link
                        href="/student/notifications"
                        className="relative p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-white/10 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:shadow-md group"
                    >
                        <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                    </Link>
                )}

                <div className="hidden sm:block text-right">
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">{user?.name || "User"}</p>
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{role}</p>
                </div>
            </div>
        </header>
    );
}
