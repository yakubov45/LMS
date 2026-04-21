"use client";
import React, { useState } from "react";
import Card from "../../../components/Card";
import { Calendar as CalendarIcon, Plus, CalendarDays, Edit, Trash2, ArrowRight } from "lucide-react";
import { useLanguage } from "../../../lib/LanguageContext";

const MOCK_EVENTS = [
    { id: 1, title: "Fall Semester Starts", date: "2026-09-01", type: "Semester", description: "First day of classes for Fall 2026", color: "indigo" },
    { id: 2, title: "Course Registration Deadline", date: "2026-09-15", type: "Deadline", description: "Last day to add/drop courses", color: "amber" },
    { id: 3, title: "Midterm Exams Week", date: "2026-10-20", type: "Exam", description: "Midterm assessments for all programs", color: "emerald" },
    { id: 4, title: "Winter Break Starts", date: "2026-12-25", type: "Holiday", description: "No classes until January", color: "slate" },
];

export default function AcademicCalendarPage() {
    const { t } = useLanguage();
    const [events, setEvents] = useState(MOCK_EVENTS);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({ title: "", date: "", type: "Semester", description: "", color: "indigo" });

    const typeColors = {
        "Semester": "indigo",
        "Deadline": "amber",
        "Exam": "emerald",
        "Holiday": "slate",
        "Other": "blue"
    };

    const handleOpenModal = (evt = null) => {
        if (evt) {
            setEditingEvent(evt);
            setFormData({ ...evt });
        } else {
            setEditingEvent(null);
            setFormData({ title: "", date: "", type: "Semester", description: "", color: "indigo" });
        }
        setShowModal(true);
    };

    const handleSave = () => {
        if (!formData.title || !formData.date) return;
        formData.color = typeColors[formData.type] || "blue";
        if (editingEvent) {
            setEvents(events.map(e => e.id === editingEvent.id ? { ...e, ...formData } : e));
        } else {
            setEvents([{ id: Date.now(), ...formData }, ...events].sort((a, b) => new Date(a.date) - new Date(b.date)));
        }
        setShowModal(false);
    };

    const handleDelete = (id) => setEvents(events.filter(e => e.id !== id));

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">{t('academicCalendar') || "Academic Calendar"}</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">{events.length} important dates scheduled</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                    <Plus className="w-4 h-4" />
                    <span>{t('addDate') || "Add Date"}</span>
                </button>
            </header>

            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">

                <div className="flex border-b border-slate-200 mb-8 pb-4 space-x-6">
                    <button className="text-sm font-black text-indigo-600 border-b-2 border-indigo-600 pb-4 -mb-4 px-1">Upcoming Dates</button>
                    <button className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors px-1">Past Dates</button>
                </div>

                <div className="space-y-4">
                    {events.map((evt, index) => {
                        const evtDate = new Date(evt.date);
                        const month = evtDate.toLocaleString('default', { month: 'short' });
                        const day = evtDate.getDate();

                        return (
                            <div key={evt.id} className="relative group flex items-stretch p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white transition-all shadow-sm hover:shadow-md">

                                {/* Date Box */}
                                <div className="flex flex-col items-center justify-center min-w-[80px] px-4 py-2 border-r border-slate-200/60 shrink-0">
                                    <span className={`text-[10px] font-black uppercase tracking-widest text-${evt.color}-500 mb-1`}>{month}</span>
                                    <span className="text-3xl font-black tracking-tighter text-slate-900">{day}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 px-6 py-2 flex flex-col justify-center">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest bg-${evt.color}-100 text-${evt.color}-700`}>
                                            {evt.type}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-black text-slate-900 mb-1">{evt.title}</h3>
                                    <p className="text-xs font-bold text-slate-500">{evt.description}</p>
                                </div>

                                {/* Actions overlay */}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center px-4 space-x-2 border-l border-slate-200/60 shrink-0">
                                    <button onClick={() => handleOpenModal(evt)} className="p-2 text-slate-400 hover:text-indigo-600 rounded-xl hover:bg-slate-100 transition-colors"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(evt.id)} className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-slate-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {events.length === 0 && (
                    <div className="text-center py-12">
                        <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-black text-slate-900 mb-2">No upcoming dates</h3>
                        <p className="text-sm font-medium text-slate-500">Your academic calendar is empty.</p>
                    </div>
                )}
            </Card>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl p-8 border border-white">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-6">{editingEvent ? "Edit Event" : "New Calendar Event"}</h3>

                        <div className="mb-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Event Title</label>
                            <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. Fall Semester Starts" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Date</label>
                                <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Type</label>
                                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20">
                                    <option>Semester</option>
                                    <option>Deadline</option>
                                    <option>Exam</option>
                                    <option>Holiday</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Description</label>
                            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="Brief description of the event..."></textarea>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
                            <button onClick={handleSave} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md">
                                {editingEvent ? "Save Changes" : "Add Event"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
