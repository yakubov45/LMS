"use client";
import React from "react";
import { HelpCircle, Mail, MessageSquare, Phone, ExternalLink } from "lucide-react";
import { useLanguage } from "../../../lib/LanguageContext";
import Card from "../../../components/Card";

export default function StudentHelpPage() {
    const { t } = useLanguage();
    const supportChannels = [
        { name: t('supportChat'), desc: t('supportChatDesc'), icon: MessageSquare, action: t('startChat'), color: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
        { name: t('emailSupport'), desc: t('emailSupportDesc'), icon: Mail, action: t('writeEmail'), color: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
        { name: t('hotline'), desc: t('hotlineDesc'), icon: Phone, action: t('callNow'), color: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400" },
    ];

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="mb-12">
                <h1 className="text-[40px] font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-3">{t('helpCenterTitle')}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">{t('helpCenterSubtitle')}</p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    <Card className="p-8 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 rounded-[40px] shadow-sm">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-8">{t('faqTitle')}</h2>
                        <div className="space-y-4">
                            {[
                                { q: t('faqQ1'), a: t('faqA1') },
                                { q: t('faqQ2'), a: t('faqA2') },
                                { q: t('faqQ3'), a: t('faqA3') },
                            ].map((item, idx) => (
                                <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-white/5">
                                    <h4 className="text-sm font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">{item.q}</h4>
                                    <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-8 bg-indigo-600 text-white rounded-[40px] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-4 tracking-tighter">{t('guidesTitle')}</h3>
                            <p className="text-white/80 text-sm font-medium mb-8 max-w-md">{t('guidesDesc')}</p>
                            <button className="px-8 py-3.5 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2">
                                <ExternalLink className="w-4 h-4" />
                                <span>{t('downloadGuide')}</span>
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight px-2">{t('contactSupport')}</h3>
                    {supportChannels.map((channel, idx) => (
                        <Card key={idx} className="p-6 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                            <div className={`p-4 ${channel.color} rounded-2xl w-14 h-14 flex items-center justify-center mb-6`}>
                                <channel.icon className="w-7 h-7" />
                            </div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">{channel.name}</h4>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-6">{channel.desc}</p>
                            <button className="w-full py-3 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                                {channel.action}
                            </button>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
