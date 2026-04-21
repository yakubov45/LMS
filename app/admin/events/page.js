"use client";
import React, { useState } from "react";
import Card from "../../../components/Card";
import { CalendarDays, Plus, Trash2, Edit, MapPin, Clock } from "lucide-react";
import { useLanguage } from "../../../lib/LanguageContext";

const mockEvents = [
    { id: 1, title: "Spring Gala 2026", date: "2026-05-10", time: "18:00", location: "Main Hall", type: "Social" },
    { id: 2, title: "Research Symposium", date: "2026-05-15", time: "09:00", location: "Auditorium A", type: "Academic" },
    { id: 3, title: "Inter-University Sports Day", date: "2026-05-22", time: "10:00", location: "Sports Complex", type: "Sports" },
    { id: 4, title: "End-of-Semester Ceremony", date: "2026-06-01", time: "15:00", location: "Grand Hall", type: "Ceremony" },
];

const TypeBadge = ({ type }) => {
    const colors = {
        Social: "bg-pink-50 text-pink-600",
        Academic: "bg-indigo-50 text-indigo-600",
        Sports: "bg-emerald-50 text-emerald-600",
        Ceremony: "bg-amber-50 text-amber-600",
    };
    return (
        <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${colors[type] || "bg-slate-50 text-slate-600"}`}>
            {type}
        </span>
    );
};

export default function AdminEventsPage() {
    const { t } = useLanguage();
    const [events, setEvents] = useState(mockEvents);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", date: "", time: "", location: "", type: "Academic" });
    const [editingId, setEditingId] = useState(null);

    const handleSave = () => {
        if (!form.title.trim()) return;
        if (editingId !== null) {
            setEvents(prev => prev.map(e => e.id === editingId ? { ...e, ...form } : e));
            setEditingId(null);
        } else {
            setEvents(prev => [{ id: Date.now(), ...form }, ...prev]);
        }
        setForm({ title: "", date: "", time: "", location: "", type: "Academic" });
        setShowForm(false);
    };

    const handleDelete = (id) => setEvents(prev => prev.filter(e => e.id !== id));
    const handleEdit = (item) => {
        setForm({ title: item.title, date: item.date, time: item.time, location: item.location, type: item.type });
        setEditingId(item.id);
        setShowForm(true);
    };

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">{t('eventsManagement')}</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">{events.length} {t('upcomingEventsCount')}</p>
                </div>
                <button
                    onClick={() => { setShowForm(s => !s); setEditingId(null); setForm({ title: "", date: "", time: "", location: "", type: "Academic" }); }}
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                    <Plus className="w-4 h-4" />
                    <span>{t('addEvent')}</span>
                </button>
            </header>

            {showForm && (
                <Card className="mb-8 p-6 bg-white/80 border border-white rounded-[32px] shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { label: t('eventTitle'), key: "title", type: "text", placeholder: t('eventTitle') + "..." },
                            { label: t('eventDate'), key: "date", type: "date", placeholder: "" },
                            { label: t('eventTime'), key: "time", type: "time", placeholder: "" },
                            { label: t('eventLocation'), key: "location", type: "text", placeholder: t('eventLocation') + "..." },
                        ].map(f => (
                            <div key={f.key}>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{f.label}</label>
                                <input
                                    type={f.type}
                                    value={form[f.key]}
                                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                                    placeholder={f.placeholder}
                                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        ))}
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t('eventType')}</label>
                            <select
                                value={form.type}
                                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                                className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {["Academic", "Social", "Sports", "Ceremony"].map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button onClick={handleSave} className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">
                            {editingId ? t('saveChanges') : t('createEvent')}
                        </button>
                        <button onClick={() => { setShowForm(false); setEditingId(null); }} className="px-5 py-3 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                            {t('articleCancel')}
                        </button>
                    </div>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {events.map(event => (
                    <Card key={event.id} className="p-6 bg-white/60 backdrop-blur-xl border border-white/60 rounded-[32px] shadow-sm hover:shadow-lg transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <TypeBadge type={event.type} />
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                <button onClick={() => handleEdit(event)} className="p-1.5 rounded-xl hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-all">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(event.id)} className="p-1.5 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-4">{event.title}</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                <CalendarDays className="w-3.5 h-3.5 text-indigo-400" />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                                <span>{event.location}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
