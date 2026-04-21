"use client";
import React, { useState, useEffect } from "react";
import Card from "../../../components/Card";
import {
    Calendar, Clock, Bookmark, ArrowRight,
    TrendingUp, Newspaper, Bell, MapPin
} from "lucide-react";
import { useLanguage } from "../../../lib/LanguageContext";
import { api } from "../../../lib/api";

const NewsCard = ({ category, title, content, date, image, featured = false }) => (
    <Card className="p-0 overflow-hidden bg-white/60 border border-white rounded-[40px] shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500 group h-full flex flex-col">
        <div className="relative h-56 overflow-hidden">
            <img
                src={image || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800&q=80"}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-6 left-6 flex space-x-2">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-white">
                    {category}
                </span>
                {featured && (
                    <span className="px-4 py-2 bg-[#1e293b] rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg">Featured</span>
                )}
            </div>
            <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md text-white rounded-2xl hover:bg-white/40 transition-all">
                <Bookmark className="w-4 h-4" />
            </button>
        </div>
        <div className="p-8 flex-1 flex flex-col">
            <div className="flex items-center space-x-4 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{date}</span>
                </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{title}</h3>
            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6 line-clamp-3">{content}</p>
            <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-end">
                <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    </Card>
);

export default function NewsPage() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('Latest');
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([api.getNews(), api.getEvents()]).then(([newsData, eventsData]) => {
            setNews(newsData || []);
            setEvents(eventsData || []);
            setLoading(false);
        });
    }, []);

    const categories = ['Latest', 'Academic', 'Campus', 'Sports', 'Life'];
    const filteredNews = activeTab === 'Latest' ? news : news.filter(item => item.category === activeTab);

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-[40px] font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">{t('newsTitle')}</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span>{t('trendingNow')}: {t('graduation')}</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <Newspaper className="w-4 h-4 text-indigo-500" />
                            <span>{news.length} {t('newStories')}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center overflow-x-auto no-scrollbar bg-white/40 dark:bg-slate-800/40 border border-white dark:border-white/10 rounded-[24px] p-2 shadow-sm max-w-full">
                    {categories.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all ${tab === activeTab ? 'bg-[#1e293b] dark:bg-white text-white dark:text-slate-900 shadow-lg' : 'text-slate-500 hover:text-indigo-600 dark:hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
                <div className="xl:col-span-3">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-80 bg-white/40 rounded-[40px] animate-pulse"></div>
                            ))}
                        </div>
                    ) : filteredNews.length === 0 ? (
                        <div className="py-24 text-center bg-white/30 border-2 border-dashed border-slate-200 rounded-[60px]">
                            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No news in this category</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredNews.map(item => (
                                <NewsCard key={item.id} {...item} />
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-8">
                    <Card className="p-8 bg-white/60 dark:bg-slate-900/40 border border-white dark:border-white/5 rounded-[40px] shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{t('upcomingEvents')}</h2>
                            <button className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 rounded-xl text-slate-500 hover:text-indigo-600 transition-all">
                                <Calendar className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            {events.slice(0, 5).map((event, idx) => (
                                <div key={idx} className="group cursor-pointer">
                                    <h4 className="text-[14px] font-black text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{event.title}</h4>
                                    <div className="flex items-center space-x-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {events.length === 0 && !loading && (
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No upcoming events</p>
                            )}
                        </div>
                        <button className="w-full mt-10 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-indigo-600 transition-all">
                            {t('viewCalendar')}
                        </button>
                    </Card>

                    <Card className="p-8 bg-indigo-600 text-white rounded-[40px] shadow-xl shadow-indigo-200 relative overflow-hidden">
                        <div className="relative z-10">
                            <Bell className="w-8 h-8 text-indigo-300 mb-4" />
                            <h3 className="text-lg font-black tracking-tight mb-2 leading-none">{t('stayInLoop')}</h3>
                            <p className="text-xs font-bold text-indigo-100 mb-6 leading-relaxed">{t('newsLetterDesc')}</p>
                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder={t('emailPlaceholder') || "Enter email..."}
                                    className="w-full px-5 py-3.5 bg-white/10 border border-white/10 rounded-2xl text-xs font-bold outline-none focus:bg-white/20 transition-all placeholder:text-indigo-300"
                                />
                                <button className="w-full py-3.5 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
                                    {t('subscribeNow')}
                                </button>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
