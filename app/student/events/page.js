"use client";
import React, { useState, useEffect } from "react";
import Card from "../../../components/Card";
import {
    Calendar, Plus,
    MapPin, Clock, Users, Star,
    ArrowRight, ChevronLeft, ChevronRight,
    Compass, Bell, Bookmark
} from "lucide-react";
import { api } from "../../../lib/api";

const EventCard = ({ title, type, date, location, capacity, status, image }) => (
    <Card className="p-0 overflow-hidden bg-white/60 border border-white rounded-[40px] shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500 group flex flex-col">
        <div className="relative h-48 overflow-hidden">
            <img src={image || "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=800&q=80"} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-white">
                    {type}
                </span>
            </div>
            <button className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/40 transition-all">
                <Bookmark className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest opacity-80">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{date}</span>
                </div>
            </div>
        </div>
        <div className="p-6">
            <h3 className="text-[17px] font-black text-slate-900 mb-2 tracking-tight uppercase leading-tight truncate">{title}</h3>
            <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>{location}</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${status === 'Upcoming' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {status}
                </span>
                <button className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-[#1e293b] hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    </Card>
);

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getEvents().then(data => {
            setEvents(data || []);
            setLoading(false);
        });
    }, []);

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">

            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-[40px] font-black text-slate-900 tracking-tight leading-none mb-3">Campus Events</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <Star className="w-4 h-4 text-amber-500" />
                            <span>{events.length} Events Available</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <Users className="w-4 h-4 text-indigo-500" />
                            <span>Register Now</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center space-x-3 px-8 py-3.5 bg-[#1e293b] text-white rounded-[24px] text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                        <Plus className="w-4 h-4" />
                        <span>Submit Event</span>
                    </button>
                    <button className="p-3.5 bg-white border border-white rounded-[24px] text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        <Bell className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
                {/* Calendar Sidebar */}
                <div className="space-y-8">
                    <Card className="p-8 bg-white/60 border border-white rounded-[40px] shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">May 2026</h3>
                            <div className="flex space-x-2">
                                <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors"><ChevronLeft className="w-4 h-4 text-slate-400" /></button>
                                <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors"><ChevronRight className="w-4 h-4 text-slate-400" /></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center mb-4">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                <span key={i} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</span>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: 31 }).map((_, i) => (
                                <div key={i} className={`aspect-square flex items-center justify-center text-[11px] font-black rounded-xl cursor-pointer transition-all ${i === 14 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'hover:bg-slate-50 text-slate-700'}`}>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="p-2 space-y-3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Workshops', 'Social', 'Music', 'Sports', 'Academic'].map(cat => (
                                <button key={cat} className="px-4 py-2.5 bg-white/40 border border-white rounded-2xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-white transition-all shadow-sm">
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="xl:col-span-3">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => <div key={i} className="h-72 bg-white/40 rounded-[40px] animate-pulse"></div>)}
                        </div>
                    ) : events.length === 0 ? (
                        <div className="py-24 text-center bg-white/30 border-2 border-dashed border-slate-200 rounded-[60px]">
                            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No events scheduled yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map(event => (
                                <EventCard key={event.id} {...event} />
                            ))}
                            <div className="p-10 border-4 border-dashed border-slate-100 rounded-[40px] flex flex-col items-center justify-center text-center group bg-slate-50/20 cursor-pointer hover:bg-white/40 transition-all">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <Compass className="w-8 h-8 text-slate-300 group-hover:text-indigo-600" />
                                </div>
                                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Explore Campus Life</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Find hidden gatherings & clubs</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
