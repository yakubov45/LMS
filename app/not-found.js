"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function NotFound() {
    const { t } = useLanguage();
    const router = useRouter();

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 w-full max-w-2xl text-center">
                <div className="mb-12 relative inline-block">
                    <div className="text-[180px] font-black text-slate-100 dark:text-slate-800 leading-none select-none">404</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-8 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white dark:border-white/10 rounded-[40px] shadow-2xl animate-in zoom-in-50 duration-500">
                            <AlertCircle className="w-20 h-20 text-indigo-500" />
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 uppercase">
                    {t('pageNotFound') || "Page Not Found"}
                </h1>

                <p className="text-lg md:text-xl font-bold text-slate-500 dark:text-slate-400 mb-12 max-w-lg mx-auto leading-relaxed">
                    {t('notFoundSubtitle') || "The page you are looking for might have been removed or is temporarily unavailable."}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center space-x-3 px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-3xl font-black uppercase tracking-widest text-xs border border-slate-200 dark:border-white/10 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>{t('goBack') || "Go Back"}</span>
                    </button>

                    <Link
                        href="/"
                        className="flex items-center space-x-3 px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95"
                    >
                        <Home className="w-5 h-5" />
                        <span>{t('goHome') || "Go Home"}</span>
                    </Link>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-200 dark:border-white/5 flex flex-wrap justify-center gap-8">
                    <div className="flex items-center space-x-2 text-slate-400">
                        <Search className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('searchInstruction') || "Try searching for something else"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
