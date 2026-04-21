"use client";
import React, { useState, useEffect } from "react";
import {
    Utensils, Plus, Trash2, Edit, Flame, Star, X
} from "lucide-react";
import { api } from "../../../lib/api";
import Card from "../../../components/Card";

export default function ChefMenuPage() {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ name: "", category: "Breakfast", price: 0, calories: 0, rating: 5.0, image: "", description: "" });

    useEffect(() => {
        const fetchData = async () => {
            const data = await api.getChefMenu();
            setMenu(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];
    const filteredMenu = activeCategory === "All" ? menu : menu.filter(m => m.category === activeCategory);

    const openAddModal = () => {
        setFormData({ name: "", category: "Breakfast", price: 0, calories: 0, rating: 5.0, image: "", description: "" });
        setEditingItem(null);
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setFormData({ name: item.name, category: item.category, price: item.price, calories: item.calories, rating: item.rating, image: item.image || "", description: item.description || "" });
        setEditingItem(item);
        setShowModal(true);
    };

    const handleSave = () => {
        const payload = {
            ...formData,
            price: parseFloat(formData.price),
            calories: parseInt(formData.calories),
            rating: parseFloat(formData.rating)
        };

        if (editingItem) {
            setMenu(menu.map(m => m.id === editingItem.id ? { ...m, ...payload } : m));
        } else {
            const newItem = {
                id: Math.floor(Math.random() * 10000),
                ...payload
            };
            setMenu([newItem, ...menu]);
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (confirm("Taomni o'chirishni tasdiqlaysizmi?")) {
            setMenu(menu.filter(m => m.id !== id));
        }
    };

    if (loading) return null;

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">Kitchen Command</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">Edit cafeteria offerings & pricing</p>
                </div>
                <button onClick={openAddModal} className="flex items-center space-x-3 px-8 py-3.5 bg-slate-900 dark:bg-slate-800 text-white rounded-[24px] text-xs font-black uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-xl active:scale-95 transform">
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Yangi taom qo'shish</span>
                </button>
            </header>

            <div className="flex items-center bg-white/40 border border-white dark:border-white/5 rounded-[24px] p-2 shadow-sm mb-12 overflow-x-auto no-scrollbar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap px-8 py-3.5 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-lg -translate-y-0.5' : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredMenu.map((item) => (
                    <Card key={item.id} className="p-0 overflow-hidden bg-white/60 dark:bg-slate-900/40 border border-white dark:border-white/10 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col h-full">
                        <div className="relative h-48 w-full overflow-hidden">
                            <img
                                src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80"}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-6">
                                <span className="text-[10px] font-black text-white uppercase tracking-widest bg-indigo-600 px-3 py-1 rounded-full">{item.category}</span>
                            </div>
                            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                                <button onClick={() => openEditModal(item)} className="p-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white text-white hover:text-indigo-600 transition-colors border border-white/20">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white text-white hover:text-rose-500 transition-colors border border-white/20">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">{item.name}</h3>
                                <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">${item.price.toFixed(2)}</span>
                            </div>

                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">
                                {item.description || "Mazali va yangi tayyorlangan restoran darajasidagi taom."}
                            </p>

                            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                                        <span>{item.calories} kcal</span>
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

                <button onClick={openAddModal} className="p-8 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[40px] flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-all group min-h-[400px]">
                    <Plus className="w-12 h-12 mb-4 group-hover:rotate-90 transition-transform duration-500" />
                    <span className="text-sm font-black uppercase tracking-widest">Yangi taom qo'shish</span>
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl p-10 border border-white dark:border-white/10 max-h-[90dvh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{editingItem ? 'Tahrirlash' : 'Yangi Taom'}</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Menu Engineering Studio</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Taom nomi</label>
                                <input
                                    type="text"
                                    placeholder="Masalan: Salmon Salad"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Rasm URL (Rasm)</label>
                                <input
                                    type="text"
                                    placeholder="https://images.unsplash.com/..."
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Kategoriya</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-700 dark:text-slate-300"
                                    >
                                        <option>Breakfast</option>
                                        <option>Lunch</option>
                                        <option>Dinner</option>
                                        <option>Snacks</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Narxi ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Tafsilotlar (Description)</label>
                                <textarea
                                    placeholder="Taom haqida batafsil ma'lumot qoldiring..."
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Kaloriya (kcal)</label>
                                    <input
                                        type="number"
                                        value={formData.calories}
                                        onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Reyting (1-5)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        max="5"
                                        min="0"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5 flex justify-end space-x-4">
                            <button onClick={() => setShowModal(false)} className="px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Bekor qilish</button>
                            <button
                                onClick={handleSave}
                                disabled={!formData.name}
                                className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 transform"
                            >
                                {editingItem ? 'Saqlash' : 'Qo\'shish'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
