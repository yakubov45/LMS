"use client";
import React from "react";
import Card from "../../../components/Card";
import {
    Dumbbell, Calendar, Users, Trophy,
    ChevronRight, MapPin, Clock, Star,
    ArrowRight, Activity, Zap, Medal
} from "lucide-react";

const SportCard = ({ title, date, time, location, teams, color, image }) => (
    <Card className="p-0 overflow-hidden bg-white/60 border border-white rounded-[40px] shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500 group flex flex-col">
        <div className="relative h-48 overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            <div className={`absolute inset-0 bg-gradient-to-t from-${color}-900/60 to-transparent`}></div>
            <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-white">
                    Live Score
                </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div className="flex -space-x-3">
                    {[1, 2].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-900 last:bg-indigo-600 last:text-white">
                            {i === 1 ? 'UNI' : 'STA'}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60 leading-none mb-1">Score</p>
                    <p className="text-2xl font-black">2 - 1</p>
                </div>
            </div>
        </div>

        <div className="p-8">
            <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight uppercase leading-tight">{title}</h3>
            <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                <MapPin className="w-3 h-3" />
                <span>{location}</span>
                <div className="w-1 h-1 bg-slate-200 rounded-full mx-2"></div>
                <Clock className="w-3 h-3" />
                <span>{time}</span>
            </div>

            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95 transform">
                Book Tickets
            </button>
        </div>
    </Card>
);

export default function SportsPage() {
    const sections = [
        { title: 'Basketball League', icon: Trophy, members: '24 Teams' },
        { title: 'Football Club', icon: Activity, members: '12 Teams' },
        { title: 'Swimming Pool', icon: Zap, members: 'Open 08:00 - 22:00' },
        { title: 'Gym & Fitness', icon: Dumbbell, members: '400+ Members' },
    ];

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">

            {/* Header Section */}
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-[40px] font-black text-slate-900 tracking-tight leading-none mb-3">Campus Athletics</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <Medal className="w-4 h-4 text-amber-500" />
                            <span>15 Active Tournaments</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <Users className="w-4 h-4 text-indigo-500" />
                            <span>3.5k Students Active in Sports</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center space-x-3 px-8 py-3.5 bg-[#1e293b] text-white rounded-[24px] text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                        <Calendar className="w-4 h-4" />
                        <span>Reserve Facility</span>
                    </button>
                </div>
            </header>

            {/* Quick Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {sections.map((section, idx) => (
                    <Card key={idx} className="p-8 bg-white/40 border border-white rounded-[40px] shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <section.icon className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">{section.title}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{section.members}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

                {/* Upcoming Matches */}
                <div className="xl:col-span-2 space-y-8">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Featured Matches</h2>
                        <button className="flex items-center text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] hover:translate-x-1 transition-transform">
                            <span>View All Matches</span>
                            <ArrowRight className="w-3 h-3 ml-2" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SportCard
                            title="Varsity Basketball"
                            location="Main Indoor Arena"
                            time="18:00 Today"
                            image="https://images.unsplash.com/photo-1546519638-68e1004ddda8?w=800&q=80"
                            color="orange"
                        />
                        <SportCard
                            title="Championship Football"
                            location="Olympic Stadium"
                            time="Tomorrow 15:00"
                            image="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80"
                            color="emerald"
                        />
                    </div>
                </div>

                {/* Sidebar: Personal Progress */}
                <div className="space-y-8">
                    <Card className="p-8 bg-indigo-600 text-white rounded-[40px] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black tracking-tight mb-8">Your Activity</h3>
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-white/10 rounded-2xl">
                                            <Activity className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Kcal Burnt</p>
                                            <h4 className="text-xl font-black">12,480</h4>
                                        </div>
                                    </div>
                                    <div className="text-[11px] font-black text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-400/20">
                                        +12%
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-white/10 rounded-2xl">
                                            <Zap className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Trainings</p>
                                            <h4 className="text-xl font-black">24 Sessions</h4>
                                        </div>
                                    </div>
                                    <div className="text-[11px] font-black text-indigo-200">
                                        Target 30
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-10 py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                                Open Fitness App
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    </Card>

                    <Card className="p-8 bg-white/40 border border-white rounded-[40px] shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Leaderboard</h3>
                            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/60 rounded-2xl border border-white">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-[11px] font-black text-slate-400">0{i}</span>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200"></div>
                                        <p className="text-[12px] font-black text-slate-800">Student Athlete {i}</p>
                                    </div>
                                    <span className="text-[11px] font-black text-indigo-600">{2400 - i * 100}pts</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}
