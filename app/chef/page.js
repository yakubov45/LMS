"use client";
import React, { useState, useEffect } from "react";
import {
    Coffee, Utensils, Plus, Trash2, Edit,
    Clock, DollarSign, Flame, Star,
    Filter, ChevronRight, LayoutGrid, List
} from "lucide-react";
import { api } from "../../lib/api";
import Card from "../../components/Card";
import { useLanguage } from "../../lib/LanguageContext";
import { translateAll } from "../../lib/translate";

export default function ChefDashboard() {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [showAddForm, setShowAddForm] = useState(false);
    const [newDish, setNewDish] = useState({ name: "", category: "Lunch", price: "", calories: "" });
    const [isTranslating, setIsTranslating] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            const menuData = await api.getChefMenu();
            setMenu(menuData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleAutoTranslate = async () => {
        if (!newDish.name) return;
        setIsTranslating(true);
        try {
            const translations = await translateAll(newDish.name);
            // In a real app, you'd store all 3 versions. 
            // For now, let's just show it's working by alerting or updating a hidden state.
            console.log("AI Translations:", translations);
            alert(`AI Translation results:\nUZ: ${translations.uz}\nRU: ${translations.ru}\nEN: ${translations.en}`);
            // If the current lang is UZ, and we entered UZ, translations.en will have the English version.
        } finally {
            setIsTranslating(false);
        }
    };

    const handleAddDish = async () => {
        const res = await api.addMenuItem({ ...newDish, price: parseFloat(newDish.price), calories: parseInt(newDish.calories), rating: 5.0 });
        if (res.success) {
            setMenu([...menu, { ...newDish, id: Date.now(), rating: 5.0 }]);
            setNewDish({ name: "", category: "Lunch", price: "", calories: "" });
            setShowAddForm(false);
        }
    };

    const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];
    const filteredMenu = activeCategory === "All" ? menu : menu.filter(m => m.category === activeCategory);

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
                <div className="text-center md:text-left w-full md:w-auto">
                    <h1 className="text-3xl md:text-[40px] font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">{t('kitchenCommand')}</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">{t('bistroSubtitle')}</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center space-x-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    <span>{t('addDish')}</span>
                </button>
            </header>

            {/* Add Dish Form */}
            {showAddForm && (
                <section className="mb-16 animate-in zoom-in-95 duration-300">
                    <Card className="p-10 bg-white/80 border border-white dark:border-white/10 rounded-[40px] shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{t('dishName')}</label>
                                <div className="relative">
                                    <input
                                        value={newDish.name}
                                        onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                                        className="w-full h-14 px-6 bg-slate-50 dark:bg-slate-900/50 border-none rounded-2xl text-[13px] font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
                                        placeholder="e.g. Traditional Plov"
                                    />
                                    <button
                                        onClick={handleAutoTranslate}
                                        disabled={isTranslating}
                                        className="absolute right-2 top-2 h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[9px] font-black uppercase tracking-tighter text-indigo-600 hover:bg-indigo-50 transition-colors disabled:opacity-50"
                                    >
                                        {isTranslating ? t('translating') : t('autoTranslate')}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{t('category')}</label>
                                <select
                                    value={newDish.category}
                                    onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                                    className="w-full h-14 px-6 bg-slate-50 dark:bg-slate-900/50 border-none rounded-2xl text-[13px] font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                >
                                    {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{t(c.toLowerCase())}</option>)}
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{t('price')} ($)</label>
                                <input
                                    type="number"
                                    value={newDish.price}
                                    onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                                    className="w-full h-14 px-6 bg-slate-50 dark:bg-slate-900/50 border-none rounded-2xl text-[13px] font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
                                    placeholder="9.99"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{t('calories')}</label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="number"
                                        value={newDish.calories}
                                        onChange={(e) => setNewDish({ ...newDish, calories: e.target.value })}
                                        className="w-full h-14 px-6 bg-slate-50 dark:bg-slate-900/50 border-none rounded-2xl text-[13px] font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
                                        placeholder="450"
                                    />
                                    <button
                                        onClick={handleAddDish}
                                        className="h-14 px-8 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100 dark:shadow-none"
                                    >
                                        {t('save')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>
            )}

            {/* Monthly Report Section */}
            <section className="mb-16">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="h-0.5 w-12 bg-indigo-600 rounded-full"></div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">{t('monthlyReport')}</h2>
                    <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-lg">{t('april')} 2026</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white dark:border-white/10 rounded-[40px]">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{t('totalRevenue')}</p>
                        <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">$12,450.00</h3>
                        <div className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[85%] bg-indigo-500 rounded-full"></div>
                        </div>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase mt-4">↑ 12% {t('totalSubmitted')}</p>
                    </Card>

                    <Card className="p-8 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-white dark:border-white/10 rounded-[40px]">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{t('orderCount')}</p>
                        <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">1,280</h3>
                        <div className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[70%] bg-emerald-500 rounded-full"></div>
                        </div>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase mt-4">↑ 8.5% {t('weekly')}</p>
                    </Card>

                    <Card className="p-8 bg-gradient-to-br from-orange-500/10 to-rose-500/10 border border-white dark:border-white/10 rounded-[40px]">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{t('bestSeller')}</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Beef Burger</h3>
                        <div className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-4 rounded-md bg-orange-500/40"></div>)}
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-4">420 {t('portionsSold')}</p>
                    </Card>
                </div>
            </section>

            {/* Category Filter */}
            <div className="flex items-center bg-white/40 border border-white dark:border-white/5 rounded-[24px] p-2 shadow-sm mb-12 overflow-x-auto no-scrollbar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap px-8 py-3.5 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-lg -translate-y-0.5' : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
                            }`}
                    >
                        {t(cat.toLowerCase())}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredMenu.map((item) => (
                    <Card key={item.id} className="p-0 overflow-hidden bg-white/60 border border-white rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl">
                                    <Utensils className="w-8 h-8 text-indigo-500" />
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-2 uppercase">{item.name}</h3>
                            <div className="flex items-center space-x-3 mb-6">
                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">{t(item.category.toLowerCase())}</span>
                                <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                <span className="text-lg font-black text-slate-900 dark:text-white">${item.price.toFixed(2)}</span>
                            </div>

                            <div className="pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                                        <span>{item.calories} {t('kcal')}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <Star className="w-3.5 h-3.5 text-amber-500" />
                                        <span>{item.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

