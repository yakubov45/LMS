"use client";
import React, { useState } from 'react';
import { Bell, Calendar, Dumbbell, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import Card from '../../../components/Card';

const mockNotifications = [
    { id: 1, type: 'academic', title: 'Yangi baho kiritildi', message: 'Fizika fanidan joriy baholash natijasi e\'lon qilindi: 85/100.', time: '10 daqiqa oldin', read: false },
    { id: 2, type: 'events', title: 'Bahorgi festival', message: 'Ertaga soat 14:00 da boshlanadigan bahorgi festivalga taklif etamiz!', time: '1 soat oldin', read: false },
    { id: 3, type: 'sports', title: 'Futbol mashg\'uloti bekor qilindi', message: 'Bugungi futbol jamoasi mashg\'uloti yomg\'ir sababli qoldirildi.', time: '2 soat oldin', read: true },
    { id: 4, type: 'system', title: 'Tizim yangilanishi', message: 'Bugun tunda soat 02:00 da profilaktika ishlari olib boriladi.', time: 'Kecha', read: true },
    { id: 5, type: 'academic', title: 'Hujjat tasdiqlandi', message: 'Sizning Ma\'lumotnoma so\'rovingiz muvaffaqiyatli tasdiqlandi. Dekanatdan olib ketishingiz mumkin.', time: 'Kecha', read: true },
    { id: 6, type: 'sports', title: 'Yangi turnir', message: 'Stol tennisi bo\'yicha yangi turnirga ro\'yxatdan o\'tish boshlandi.', time: '2 kun oldin', read: true }
];

export default function NotificationsPage() {
    const [filter, setFilter] = useState('all');
    const [notifications, setNotifications] = useState(mockNotifications);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const filteredNotifications = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);

    const getIcon = (type) => {
        switch (type) {
            case 'academic': return <BookOpen className="w-5 h-5 text-indigo-500" />;
            case 'events': return <Calendar className="w-5 h-5 text-emerald-500" />;
            case 'sports': return <Dumbbell className="w-5 h-5 text-orange-500" />;
            case 'system': return <AlertCircle className="w-5 h-5 text-rose-500" />;
            default: return <Bell className="w-5 h-5 text-slate-500" />;
        }
    };

    const getBgColor = (type) => {
        switch (type) {
            case 'academic': return 'bg-indigo-50 dark:bg-indigo-500/10';
            case 'events': return 'bg-emerald-50 dark:bg-emerald-500/10';
            case 'sports': return 'bg-orange-50 dark:bg-orange-500/10';
            case 'system': return 'bg-rose-50 dark:bg-rose-500/10';
            default: return 'bg-slate-50 dark:bg-slate-800';
        }
    };

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">Xabarnomalar</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">Barcha muhim voqealar va yangiliklar</p>
                </div>
                <button
                    onClick={markAllAsRead}
                    className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-95"
                >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>O'qilgan deb belgilash</span>
                </button>
            </header>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-2 rounded-2xl border border-slate-200/50 dark:border-white/5 w-max max-w-full overflow-x-auto custom-scrollbar">
                {[
                    { id: 'all', label: 'Barchasi', icon: Bell },
                    { id: 'academic', label: 'Akademik', icon: BookOpen },
                    { id: 'events', label: 'Tadbirlar', icon: Calendar },
                    { id: 'sports', label: 'Sport', icon: Dumbbell },
                    { id: 'system', label: 'Tizim', icon: AlertCircle }
                ].map((tab) => {
                    const active = filter === tab.id;
                    const TabIcon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id)}
                            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${active
                                    ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                        >
                            <TabIcon className={`w-4 h-4 ${active ? 'opacity-100' : 'opacity-50'}`} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 gap-4">
                {filteredNotifications.length > 0 ? filteredNotifications.map((notification) => (
                    <Card
                        key={notification.id}
                        className={`p-6 transition-all border ${!notification.read ? 'bg-white dark:bg-slate-800 border-indigo-100 dark:border-indigo-500/20 shadow-md ring-1 ring-indigo-500/10' : 'bg-white/60 dark:bg-slate-900/40 border-slate-200/50 dark:border-white/5 shadow-sm opacity-80'} hover:shadow-lg`}
                    >
                        <div className="flex items-start md:items-center space-x-4 md:space-x-6">
                            <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${getBgColor(notification.type)}`}>
                                {getIcon(notification.type)}
                            </div>

                            <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center space-x-3 mb-1">
                                        <h3 className={`text-base md:text-lg font-black tracking-tight ${!notification.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                            {notification.title}
                                        </h3>
                                        {!notification.read && (
                                            <span className="px-2 py-0.5 bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">Yangi</span>
                                        )}
                                    </div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl">
                                        {notification.message}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                        {notification.time}
                                    </span>
                                    {!notification.read && (
                                        <button
                                            onClick={() => markAsRead(notification.id)}
                                            className="text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg transition-colors"
                                        >
                                            O'qildi
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                )) : (
                    <div className="py-20 text-center">
                        <Bell className="w-16 h-16 text-slate-200 dark:text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Bu bo'limda xabarlar yo'q</p>
                    </div>
                )}
            </div>
        </div>
    );
}
