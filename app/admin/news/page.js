"use client";
import React, { useState } from "react";
import Card from "../../../components/Card";
import { Newspaper, Plus, Trash2, Edit, Check, X } from "lucide-react";
import { useLanguage } from "../../../lib/LanguageContext";

const mockNews = [
    { id: 1, title: "New Library Wing Opens", category: "Campus", date: "2026-04-20", published: true },
    { id: 2, title: "AI Research Initiative Launched", category: "Academic", date: "2026-04-18", published: true },
    { id: 3, title: "Spring Gala 2026 Registration Open", category: "Events", date: "2026-04-15", published: false },
    { id: 4, title: "Semester Exam Schedule Released", category: "Academic", date: "2026-04-12", published: true },
];

const CategoryBadge = ({ cat }) => {
    const colors = {
        Campus: "bg-emerald-50 text-emerald-700",
        Academic: "bg-indigo-50 text-indigo-700",
        Events: "bg-amber-50 text-amber-700",
    };
    return (
        <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${colors[cat] || "bg-slate-50 text-slate-600"}`}>
            {cat}
        </span>
    );
};

export default function AdminNewsPage() {
    const { t } = useLanguage();
    const [news, setNews] = useState(mockNews);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", category: "Campus" });
    const [editingId, setEditingId] = useState(null);

    const handleAdd = () => {
        if (!form.title.trim()) return;
        if (editingId !== null) {
            setNews(prev => prev.map(n => n.id === editingId ? { ...n, title: form.title, category: form.category } : n));
            setEditingId(null);
        } else {
            const newItem = { id: Date.now(), title: form.title, category: form.category, date: new Date().toISOString().slice(0, 10), published: false };
            setNews(prev => [newItem, ...prev]);
        }
        setForm({ title: "", category: "Campus" });
        setShowForm(false);
    };

    const handleDelete = (id) => setNews(prev => prev.filter(n => n.id !== id));
    const handleToggle = (id) => setNews(prev => prev.map(n => n.id === id ? { ...n, published: !n.published } : n));
    const handleEdit = (item) => { setForm({ title: item.title, category: item.category }); setEditingId(item.id); setShowForm(true); };

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">{t('newsManagement')}</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">{news.length} {t('articlesCount')}</p>
                </div>
                <button
                    onClick={() => { setShowForm(s => !s); setEditingId(null); setForm({ title: "", category: "Campus" }); }}
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                    <Plus className="w-4 h-4" />
                    <span>{t('addArticle')}</span>
                </button>
            </header>

            {showForm && (
                <Card className="mb-8 p-6 bg-white/80 border border-white rounded-[32px] shadow-lg">
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('articleTitle')}</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder={t('articleTitle') + "..."}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('articleCategory')}</label>
                            <select
                                value={form.category}
                                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                className="px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {["Campus", "Academic", "Events"].map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <button onClick={handleAdd} className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">
                            {editingId ? t('articleSave') : t('articlePublish')}
                        </button>
                        <button onClick={() => { setShowForm(false); setEditingId(null); }} className="px-5 py-3 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                            {t('articleCancel')}
                        </button>
                    </div>
                </Card>
            )}

            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] shadow-sm overflow-hidden">
                <div className="p-4">
                    {news.map((item, idx) => (
                        <div key={item.id} className={`flex items-center gap-4 px-6 py-4 rounded-3xl hover:bg-white/80 transition-all ${idx !== news.length - 1 ? "border-b border-slate-100" : ""}`}>
                            <div className="p-3 bg-indigo-50 rounded-2xl shrink-0">
                                <Newspaper className="w-5 h-5 text-indigo-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-black text-slate-900 dark:text-white truncate">{item.title}</h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <CategoryBadge cat={item.category} />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => handleToggle(item.id)}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${item.published ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}
                                >
                                    {item.published ? <><Check className="w-3 h-3" />{t('articleLive')}</> : t('articleDraft')}
                                </button>
                                <button onClick={() => handleEdit(item)} className="p-2 rounded-xl hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-all">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
