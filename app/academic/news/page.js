"use client";
import React, { useState, useEffect } from "react";
import {
    Search, Plus, Edit, Trash2, X, AlertTriangle, Newspaper, Image as ImageIcon
} from "lucide-react";
import { api } from "../../../lib/api";
import Card from "../../../components/Card";
import { useLanguage } from "../../../lib/LanguageContext";
import { translateAll } from "../../../lib/translate";

export default function AcademicNewsPage() {
    const { t } = useLanguage();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isTranslating, setIsTranslating] = useState(false);

    // Modal States
    const [showNewsModal, setShowNewsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [newsToDelete, setNewsToDelete] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ title: "", category: "Campus", image: "", content: "" });

    useEffect(() => {
        const fetchNews = async () => {
            const data = await api.getNews();
            setNews(data);
            setLoading(false);
        };
        fetchNews();
    }, []);

    const handleAutoTranslate = async (field) => {
        const text = formData[field];
        if (!text) return;
        setIsTranslating(true);
        try {
            const translations = await translateAll(text);
            alert(`AI Translation results (${field}):\nUZ: ${translations.uz}\nRU: ${translations.ru}\nEN: ${translations.en}`);
        } finally {
            setIsTranslating(false);
        }
    };

    const filteredNews = news.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openAddModal = () => {
        setFormData({ title: "", category: "Campus", image: "", content: "" });
        setEditingNews(null);
        setShowNewsModal(true);
    };

    const openEditModal = (item) => {
        setFormData({ title: item.title, category: item.category, image: item.image, content: item.content });
        setEditingNews(item);
        setShowNewsModal(true);
    };

    const handleSaveNews = async () => {
        if (editingNews) {
            setNews(news.map(n => n.id === editingNews.id ? { ...n, ...formData } : n));
            await api.updateNews(editingNews.id, formData);
        } else {
            const result = await api.addNews(formData);
            setNews([result.news, ...news]);
        }
        setShowNewsModal(false);
    };

    const confirmDelete = (item) => {
        setNewsToDelete(item);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        await api.deleteNews(newsToDelete.id);
        setNews(news.filter(n => n.id !== newsToDelete.id));
        setShowDeleteModal(false);
        setNewsToDelete(null);
    };

    if (loading) return null;

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">{t('newsManagement')}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">{t('newsSubtitle')}</p>
            </header>

            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div className="relative flex-1 sm:w-64 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('searchNews')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/40 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg active:scale-95 transform"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{t('addNews')}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredNews.map((item) => (
                        <Card key={item.id} className="bg-white border border-slate-100 dark:border-white/5 rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
                            <div className="h-48 relative overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">
                                        {t(item.category.toLowerCase()) || item.category}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                                    <button onClick={() => openEditModal(item)} className="p-2 bg-white/90 backdrop-blur-md rounded-lg text-slate-600 hover:text-indigo-600 shadow-sm">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => confirmDelete(item)} className="p-2 bg-white/90 backdrop-blur-md rounded-lg text-slate-600 hover:text-rose-600 shadow-sm">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{item.date}</span>
                                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-3 line-clamp-2">{item.title}</h3>
                                <p className="text-sm text-slate-500 line-clamp-2">{item.content}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredNews.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">{t('noNews')}</p>
                    </div>
                )}
            </Card>

            {/* News Modal */}
            {showNewsModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowNewsModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl p-8 border border-white max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{editingNews ? t('editNews') : t('newEvent')}</h3>
                            <button onClick={() => setShowNewsModal(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('newsTitleLabel')}</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                                        placeholder="News title..."
                                    />
                                    <button
                                        onClick={() => handleAutoTranslate('title')}
                                        disabled={isTranslating}
                                        className="absolute right-2 top-2 h-8 px-3 bg-white border border-slate-200 rounded-lg text-[8px] font-black uppercase tracking-tighter text-indigo-600"
                                    >
                                        {isTranslating ? t('translating') : t('autoTranslate')}
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('category')}</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-700"
                                    >
                                        <option value="Campus">Campus</option>
                                        <option value="Academic">Academic</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Announcement">Announcement</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('date')}</label>
                                    <input
                                        type="date"
                                        value={formData.date || new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-700"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('imageURL')}</label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('content')}</label>
                                <div className="relative">
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        rows={4}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all resize-none"
                                        placeholder="News details..."
                                    />
                                    <button
                                        onClick={() => handleAutoTranslate('content')}
                                        disabled={isTranslating}
                                        className="absolute right-2 bottom-2 h-8 px-3 bg-white border border-slate-200 rounded-lg text-[8px] font-black uppercase tracking-tighter text-indigo-600"
                                    >
                                        {isTranslating ? t('translating') : t('autoTranslate')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end space-x-3">
                            <button onClick={() => setShowNewsModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">{t('cancel')}</button>
                            <button
                                onClick={handleSaveNews}
                                disabled={!formData.title || !formData.content}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 transform"
                            >
                                {editingNews ? t('update') : t('save')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}></div>
                    <div className="relative w-full max-w-sm bg-white rounded-[32px] shadow-2xl p-8 border border-white text-center">
                        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-8 h-8 text-rose-500" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{t('deleteNews')}?</h3>
                        <p className="text-sm font-medium text-slate-500 mb-8">
                            {t('confirmDelete')} <strong className="text-slate-800">{newsToDelete?.title}</strong>?
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setShowDeleteModal(false)} className="py-3.5 rounded-xl font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">{t('cancel')}</button>
                            <button onClick={handleDelete} className="py-3.5 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all shadow-md active:scale-95 transform">{t('delete')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

