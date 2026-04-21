"use client";
import React, { useState, useEffect } from "react";
import {
    Search, Plus, Edit, Trash2, X, AlertTriangle, Calendar, MapPin, Users, Tag
} from "lucide-react";
import { api } from "../../../lib/api";
import Card from "../../../components/Card";
import { useLanguage } from "../../../lib/LanguageContext";
import { translateAll } from "../../../lib/translate";

export default function AcademicEventsPage() {
    const { t } = useLanguage();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isTranslating, setIsTranslating] = useState(false);

    // Modal States
    const [showEventModal, setShowEventModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [eventToDelete, setEventToDelete] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ title: "", date: "", type: "Academic", location: "", capacity: 50, status: "Upcoming" });

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await api.getEvents();
            setEvents(data);
            setLoading(false);
        };
        fetchEvents();
    }, []);

    const handleAutoTranslate = async () => {
        if (!formData.title) return;
        setIsTranslating(true);
        try {
            const translations = await translateAll(formData.title);
            console.log("AI Translations:", translations);
            alert(`AI Translation results:\nUZ: ${translations.uz}\nRU: ${translations.ru}\nEN: ${translations.en}`);
        } finally {
            setIsTranslating(false);
        }
    };

    const filteredEvents = events.filter(e =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openAddModal = () => {
        setFormData({ title: "", date: "", type: "Academic", location: "", capacity: 50, status: "Upcoming" });
        setEditingEvent(null);
        setShowEventModal(true);
    };

    const openEditModal = (event) => {
        setFormData({ ...event });
        setEditingEvent(event);
        setShowEventModal(true);
    };

    const handleSaveEvent = async () => {
        if (editingEvent) {
            setEvents(events.map(e => e.id === editingEvent.id ? { ...e, ...formData } : e));
            await api.updateEvent(editingEvent.id, formData);
        } else {
            const result = await api.addEvent(formData);
            setEvents([result.event, ...events]);
        }
        setShowEventModal(false);
    };

    const confirmDelete = (event) => {
        setEventToDelete(event);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        await api.deleteEvent(eventToDelete.id);
        setEvents(events.filter(e => e.id !== eventToDelete.id));
        setShowDeleteModal(false);
        setEventToDelete(null);
    };

    if (loading) return null;

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">{t('eventManagement')}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">{t('eventsSubtitle')}</p>
            </header>

            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div className="relative flex-1 sm:w-64 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('searchEvents')}
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
                        <span>{t('addEvent')}</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-white/5 pb-4">
                                <th className="pb-4 pl-4">{t('eventName')}</th>
                                <th className="pb-4">{t('dateLocation')}</th>
                                <th className="pb-4">{t('typeCapacity')}</th>
                                <th className="pb-4 text-right pr-4">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {filteredEvents.map((e) => (
                                <tr key={e.id} className="group hover:bg-white/40 transition-colors">
                                    <td className="py-6 pl-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                                                <Calendar className="w-6 h-6 text-indigo-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">{e.title}</p>
                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${e.status === 'Upcoming' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                                    {t(e.status.toLowerCase()) || e.status}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2 text-slate-600">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span className="text-xs font-bold">{e.date}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="font-medium">{e.location}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <Tag className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">{t(e.type.toLowerCase()) || e.type}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-slate-400">
                                                <Users className="w-3.5 h-3.5" />
                                                <span className="text-[11px] font-bold">{e.capacity} {t('student')}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 text-right pr-4">
                                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button onClick={() => openEditModal(e)} className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-white/10 text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => confirmDelete(e)} className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-white/10 text-slate-400 hover:text-rose-600 transition-all shadow-sm">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredEvents.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">{t('noEvents')}</p>
                        </div>
                    )}
                </div>
            </Card>

            {/* Event Modal */}
            {showEventModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowEventModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl p-8 border border-white max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{editingEvent ? t('editEvent') : t('newEvent')}</h3>
                            <button onClick={() => setShowEventModal(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('eventTitle')}</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                                        placeholder="e.g. Chess Tournament"
                                    />
                                    <button
                                        onClick={handleAutoTranslate}
                                        disabled={isTranslating}
                                        className="absolute right-2 top-2 h-8 px-3 bg-white border border-slate-200 rounded-lg text-[8px] font-black uppercase tracking-tighter text-indigo-600"
                                    >
                                        {isTranslating ? t('translating') : t('autoTranslate')}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('date')}</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-700"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('category')}</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-700"
                                    >
                                        <option value="Academic">Academic</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Workshop">Workshop</option>
                                        <option value="Social">Social</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('location')}</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                                        placeholder="Main Hall, B-102..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('capacity')}</label>
                                    <input
                                        type="number"
                                        value={formData.capacity}
                                        onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('status')}</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-700"
                                    >
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Registration Open">Registration Open</option>
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Finished">Finished</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end space-x-3">
                            <button onClick={() => setShowEventModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">{t('cancel')}</button>
                            <button
                                onClick={handleSaveEvent}
                                disabled={!formData.title || !formData.date || !formData.location}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 transform"
                            >
                                {editingEvent ? t('save') : t('add')}
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
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{t('deleteEvent')}?</h3>
                        <p className="text-sm font-medium text-slate-500 mb-8">
                            {t('confirmDeleteEvent')} <strong className="text-slate-800">{eventToDelete?.title}</strong>?
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

