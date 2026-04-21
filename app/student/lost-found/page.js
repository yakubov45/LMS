"use client";
import React, { useState } from "react";
import Card from "../../../components/Card";
import {
    Search, Filter, Plus, Camera,
    MapPin, Clock, Tag, ShieldCheck,
    ChevronRight, MoreHorizontal, Info,
    Package, AlertTriangle, CheckCircle2, X
} from "lucide-react";

const ItemCard = ({ title, date, location, category, status, image }) => (
    <Card className="p-0 overflow-hidden bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5 rounded-[40px] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group flex flex-col h-full">
        <div className="relative h-48 overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm border border-white dark:border-white/10`}>
                    {category}
                </span>
            </div>
            <div className="absolute bottom-4 right-4">
                <div className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg ${status === 'Found' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                    {status}
                </div>
            </div>
        </div>

        <div className="p-8 flex-1 flex flex-col">
            <h3 className="text-[17px] font-black text-slate-900 dark:text-white mb-4 tracking-tighter uppercase leading-tight truncate">{title}</h3>
            <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span>{status === 'Lost' ? 'Yo\'qolgan' : 'Topilgan'}: {date}</span>
                </div>
            </div>

            <button className="mt-auto w-full py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-indigo-600 transition-all active:scale-95 transform shadow-sm">
                Men buni topdim
            </button>
        </div>
    </Card>
);

export default function LostFoundPage() {
    const [itemList, setItemList] = useState([
        { id: 1, title: "Silver MacBook Air 13''", date: "14-May, 2026", location: "Library Block B", category: "Electronics", status: "Lost", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80" },
        { id: 2, title: "Blue Water Bottle (Hydro)", date: "15-May, 2026", location: "Gym Locker Room", category: "Personal", status: "Found", image: "https://images.unsplash.com/photo-1602143393494-1da6cc58721c?w=600&q=80" },
        { id: 3, title: "Black Leather Wallet", date: "12-May, 2026", location: "Cafeteria Terrace", category: "Accessories", status: "Lost", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80" },
        { id: 4, title: "Scientific Calculator", date: "15-May, 2026", location: "Room 402, Block C", category: "Academic", status: "Found", image: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=600&q=80" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: "", location: "", category: "Electronics", status: "Found", description: "", image: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            ...formData,
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            image: formData.image || "https://images.unsplash.com/photo-1584931423298-c576fda54bd2?w=600&q=80"
        };
        setItemList([newItem, ...itemList]);
        setShowModal(false);
        setFormData({ title: "", location: "", category: "Electronics", status: "Found", description: "", image: "" });
    };

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header Section */}
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-[40px] font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-3">Yo'qotilgan & Topilgan</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">Talabalarga o'z buyumlarini qayta topishda yordam beramiz</p>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex-1 sm:flex-none flex items-center justify-center space-x-3 px-8 py-3.5 bg-slate-900 dark:bg-slate-800 text-white rounded-[24px] text-xs font-black uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-xl shadow-slate-200 dark:shadow-none transform active:scale-95"
                    >
                        <Plus className="w-4 h-4 text-amber-400" />
                        <span>E'lon berish</span>
                    </button>
                </div>
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                    { title: '42', label: 'Faol qidiruvlar', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
                    { title: '156', label: 'Egasiga qaytarildi', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
                    { title: 'Markaziy', label: 'Office Block A', icon: Package, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' }
                ].map((stat, i) => (
                    <Card key={i} className="p-8 bg-white/40 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5 rounded-[40px] shadow-sm flex items-center space-x-6">
                        <div className={`p-5 ${stat.bg} rounded-[24px]`}>
                            <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">{stat.title}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Buyumni qidiring..."
                        className="w-full bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-[32px] py-5 pl-16 pr-8 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-sm"
                    />
                </div>
                <div className="flex items-center bg-white/40 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-[32px] p-2 shadow-sm shrink-0 no-scrollbar overflow-x-auto">
                    {['Barchasi', 'Elektronika', 'Akademik', 'Aksessuarlar'].map(cat => (
                        <button key={cat} className={`px-6 py-3.5 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${cat === 'Barchasi' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {itemList.map(item => (
                    <ItemCard key={item.id} {...item} />
                ))}

                <button onClick={() => setShowModal(true)} className="group border-4 border-dashed border-slate-100 dark:border-white/5 rounded-[40px] p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/30 hover:bg-indigo-50/10 transition-all min-h-[400px]">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:text-indigo-600 transition-all text-slate-300">
                        <Camera className="w-8 h-8" />
                    </div>
                    <h3 className="text-sm font-black text-slate-400 tracking-widest uppercase mb-2">Buyum rasm'ini kiritish</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Buyum topib olganda tezkor ro'yxatdan o'tkazish</p>
                </button>
            </div>

            {/* Submission Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl p-10 border border-white dark:border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Yangi e'lon</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Buyumlar boshqaruvi tizimi</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Buyum nomi</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Masalan: Apple AirPods Pro"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Holat</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all dark:text-white"
                                    >
                                        <option value="Found">Topilgan</option>
                                        <option value="Lost">Yo'qolgan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Kategoriya</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all dark:text-white"
                                    >
                                        <option>Electronics</option>
                                        <option>Academic</option>
                                        <option>Accessories</option>
                                        <option>Personal</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Joylashuv (Location)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Masalan: 4-bino, 2-qavat"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Tavsif (Description)</label>
                                <textarea
                                    required
                                    placeholder="Buyum haqida batafsil ma'lumot..."
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
                                />
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5 flex justify-end space-x-4">
                                <button type="button" onClick={() => setShowModal(false)} className="px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Bekor qilish</button>
                                <button
                                    type="submit"
                                    className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 transform"
                                >
                                    E'lonni joylash
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Info Section */}
            <Card className="mt-16 p-10 bg-[#1e293b] text-white rounded-[40px] shadow-2xl relative overflow-hidden border border-white/5">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl text-center md:text-left">
                        <h2 className="text-3xl font-black mb-4 tracking-tighter uppercase">Qaytarish Qoidalari</h2>
                        <p className="text-indigo-100 font-bold text-sm leading-relaxed mb-8 uppercase tracking-wide">Buyumni qaytarib olish uchun siz buyumni batafsil tavsiflab berishingiz va rasmiy Talaba ID kartangizni taqdim etishingiz kerak.</p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <div className="flex items-center space-x-3 text-[11px] font-black uppercase tracking-widest text-indigo-300">
                                <ShieldCheck className="w-5 h-5" />
                                <span>ID karta talab etiladi</span>
                            </div>
                            <div className="flex items-center space-x-3 text-[11px] font-black uppercase tracking-widest text-indigo-300">
                                <Info className="w-5 h-5" />
                                <span>30 kun davomida saqlanadi</span>
                            </div>
                        </div>
                    </div>
                    <button className="px-10 py-5 bg-white text-slate-900 rounded-[24px] text-xs font-black uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-2xl shrink-0">
                        Ish vaqtini ko'rish
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            </Card>
        </div>
    );
}
