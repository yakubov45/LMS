"use client";
import React, { useState, useEffect } from "react";
import Card from "../../../components/Card";
import {
    Utensils, Coffee,
    Star, Heart, Info, Clock,
    Leaf, Flame, Zap, ShoppingCart
} from "lucide-react";
import { api } from "../../../lib/api";
import { useLanguage } from "../../../lib/LanguageContext";

const MenuItem = ({ name, price, description, calories, tags, image, rating, onOrder }) => {
    const { t } = useLanguage();
    return (
        <Card className="p-0 overflow-hidden bg-white/60 border border-white rounded-[40px] shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500 group flex flex-col">
            <div className="relative h-48 overflow-hidden">
                <img src={image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80"} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute top-4 left-4 flex space-x-2">
                    {(tags || []).map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-white">
                            {tag}
                        </span>
                    ))}
                </div>
                <button className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/40 transition-all">
                    <Heart className="w-4 h-4" />
                </button>
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors uppercase">{name}</h3>
                    <span className="text-lg font-black text-indigo-600">${parseFloat(price || 0).toFixed(2)}</span>
                </div>
                <p className="text-xs font-bold text-slate-500 leading-relaxed mb-6 line-clamp-2">{description || t('freshPrepared').replace('{name}', name)}</p>
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <Flame className="w-3.5 h-3.5 text-orange-500" />
                            <span>{calories} {t('kcal')}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <Star className="w-3.5 h-3.5 text-amber-500" />
                            <span>{rating}</span>
                        </div>
                    </div>
                    <button onClick={onOrder} className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-all shadow-lg active:scale-90 transform">
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default function CafeteriaPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderMsg, setOrderMsg] = useState('');
    const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];
    const { t } = useLanguage();

    useEffect(() => {
        api.getChefMenu().then(data => {
            setMenu(data || []);
            setLoading(false);
        });
    }, []);

    const handleOrder = async (item) => {
        await api.placeOrder({ menuItemId: item.id, name: item.name, price: item.price });
        setOrderMsg(`✓ "${item.name}" ${t('addedToOrder')}`);
        setTimeout(() => setOrderMsg(''), 3000);
    };

    const filteredMenu = activeCategory === 'All' ? menu : menu.filter(m => m.category === activeCategory);

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">

            {/* Order confirmation toast */}
            {orderMsg && (
                <div className="fixed top-6 right-6 z-[200] px-6 py-4 bg-emerald-600 text-white rounded-2xl shadow-xl font-bold text-sm animate-in slide-in-from-top-2 duration-300">
                    {orderMsg}
                </div>
            )}

            {/* Header Section */}
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-[40px] font-black text-slate-900 tracking-tight leading-none mb-3">{t('bistroTitle')}</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <span>{t('currentlyOpen')}</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <Utensils className="w-4 h-4 text-indigo-500" />
                            <span>{menu.length} {t('freshDishesAvailable')}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Category Filter */}
            <div className="flex items-center bg-white/40 border border-white rounded-[24px] p-2 shadow-sm mb-12 overflow-x-auto custom-scrollbar no-scrollbar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap px-8 py-3.5 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === cat ? 'bg-[#1e293b] text-white shadow-lg -translate-y-0.5' : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'}`}
                    >
                        {t(cat.toLowerCase())}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-80 bg-white/40 rounded-[40px] animate-pulse"></div>)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredMenu.map(item => (
                        <MenuItem key={item.id} {...item} onOrder={() => handleOrder(item)} />
                    ))}
                    {filteredMenu.length === 0 && (
                        <div className="col-span-4 py-24 text-center bg-white/30 border-2 border-dashed border-slate-200 rounded-[60px]">
                            <Utensils className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">{t('noItemsCategory')}</p>
                        </div>
                    )}

                    {/* Promo Card */}
                    <Card className="p-8 bg-indigo-600 text-white rounded-[40px] shadow-xl shadow-indigo-100 relative overflow-hidden flex flex-col justify-center text-center">
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                                <Utensils className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-black mb-2 tracking-tight">{t('lunchSpecialTitle')}</h3>
                            <p className="text-sm font-bold text-indigo-100 mb-8 max-w-[200px] mx-auto">{t('lunchSpecialDesc')}</p>
                            <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 transform">
                                {t('claimOffer')}
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -ml-24 -mb-24"></div>
                    </Card>
                </div>
            )}

            {/* Nutrition Info */}
            <div className="mt-16 grid grid-cols-1 xl:grid-cols-3 gap-10">
                <Card className="p-8 bg-white/40 border border-white rounded-[40px] shadow-sm flex items-center space-x-6">
                    <div className="p-4 bg-emerald-50 rounded-3xl">
                        <Leaf className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-slate-900 leading-tight">{t('organicTitle')}</h4>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('organicDesc')}</p>
                    </div>
                </Card>
                <Card className="p-8 bg-white/40 border border-white rounded-[40px] shadow-sm flex items-center space-x-6">
                    <div className="p-4 bg-amber-50 rounded-3xl">
                        <Info className="w-8 h-8 text-amber-500" />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-slate-900 leading-tight">{t('allergyTitle')}</h4>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('allergyDesc')}</p>
                    </div>
                </Card>
                <Card className="p-8 bg-white/40 border border-white rounded-[40px] shadow-sm flex items-center space-x-6">
                    <div className="p-4 bg-indigo-50 rounded-3xl">
                        <Coffee className="w-8 h-8 text-indigo-500" />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-slate-900 leading-tight">{t('coffeeTitle')}</h4>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('coffeeDesc')}</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
