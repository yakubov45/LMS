"use client";
import React from "react";
import Card from "../../../components/Card";
import {
    Trophy, Award, TrendingUp, Search,
    Filter, Star, Zap, Target,
    ChevronUp, ChevronDown, User, Medal
} from "lucide-react";
import { mockUser } from "../../../data/mock";

const RankRow = ({ rank, name, major, score, trend, avatar, isUser = false }) => (
    <tr className={`group transition-all duration-300 ${isUser ? 'bg-indigo-50/50' : 'hover:bg-slate-50/50'}`}>
        <td className="py-6 pl-8">
            <div className="flex items-center space-x-4">
                <span className={`text-sm font-black ${rank <= 3 ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {rank.toString().padStart(2, '0')}
                </span>
                {rank === 1 && <Trophy className="w-4 h-4 text-amber-500" />}
                {rank === 2 && <Award className="w-4 h-4 text-slate-400" />}
                {rank === 3 && <Award className="w-4 h-4 text-orange-400" />}
            </div>
        </td>
        <td className="py-6">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <img src={avatar} alt={name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                    {isUser && <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-600 border-2 border-white rounded-full"></div>}
                </div>
                <div>
                    <h4 className={`text-sm font-black tracking-tight ${isUser ? 'text-indigo-600' : 'text-slate-900'}`}>{name} {isUser && "(You)"}</h4>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{major}</p>
                </div>
            </div>
        </td>
        <td className="py-6">
            <div className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-slate-500">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{score} Points</span>
            </div>
        </td>
        <td className="py-6">
            <div className={`flex items-center space-x-1.5 text-[11px] font-black uppercase tracking-widest ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {trend > 0 ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{Math.abs(trend)}%</span>
            </div>
        </td>
        <td className="py-6 pr-8 text-right">
            <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                View Profile
            </button>
        </td>
    </tr>
);

export default function RankingsPage() {
    const [activeTab, setActiveTab] = React.useState('Overall');
    const [searchQuery, setSearchQuery] = React.useState('');

    const list = [
        { rank: 1, name: "Alexander Pierce", major: "Quantum Computing", score: 9840, trend: 12, avatar: "https://i.pravatar.cc/150?img=12", department: "Research", category: "Research" },
        { rank: 2, name: "Sarah Jenkins", major: "Neurobiology", score: 9620, trend: 8, avatar: "https://i.pravatar.cc/150?img=25", department: "Department", category: "Department" },
        { rank: 3, name: "Michael Chen", major: "Cybersecurity", score: 9410, trend: -2, avatar: "https://i.pravatar.cc/150?img=33", department: "Research", category: "Research" },
        { rank: 14, name: mockUser.name, major: mockUser.major, score: 8240, trend: 15, avatar: mockUser.avatar, isUser: true, department: "Department", category: "Overall" },
        { rank: 4, name: "Emily Watson", major: "Global Economics", score: 9180, trend: 5, avatar: "https://i.pravatar.cc/150?img=44", department: "Department", category: "Department" },
        { rank: 5, name: "David Miller", major: "Aerospace Eng.", score: 8950, trend: -4, avatar: "https://i.pravatar.cc/150?img=52", department: "Sports", category: "Sports" },
    ];

    const filteredList = list.filter(student => {
        const matchesTab = activeTab === 'Overall' || student.department === activeTab || student.category === activeTab;
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.major.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    }).sort((a, b) => a.rank - b.rank);

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">

            {/* Header Section */}
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-[40px] font-black text-slate-900 tracking-tight leading-none mb-3">Academic Excellence</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span>Your Growth: <span className="text-slate-900 font-black">+15%</span> This Month</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <Medal className="w-4 h-4 text-amber-500" />
                            <span>Top 1% of Global Students</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center overflow-x-auto no-scrollbar bg-white/40 dark:bg-slate-800/40 border border-white dark:border-white/10 rounded-[24px] p-2 shadow-sm max-w-full">
                    {['Overall', 'Department', 'Research', 'Sports'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all ${tab === activeTab ? 'bg-[#1e293b] dark:bg-white text-white dark:text-slate-900 shadow-lg' : 'text-slate-500 hover:text-indigo-600 dark:hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>

            {/* Top 3 Spotlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {filteredList.slice(0, 3).map((student, idx) => (
                    <Card key={idx} className={`p-8 md:p-10 bg-white/60 dark:bg-slate-800/40 border border-white dark:border-white/10 rounded-[32px] md:rounded-[40px] shadow-sm relative overflow-hidden flex flex-col items-center text-center ${student.rank === 1 ? 'md:scale-105 border-t-4 border-t-amber-400 z-10 shadow-xl' : ''}`}>
                        <div className="relative mb-6">
                            <img src={student.avatar} alt={student.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-white dark:ring-slate-700 shadow-2xl" />
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-900 dark:bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                Rank #{student.rank}
                            </div>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">{student.name}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{student.major}</p>

                        <div className="w-full pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-around">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Points</p>
                                <p className="text-lg font-black text-slate-900 dark:text-white">{student.score}</p>
                            </div>
                            <div className="w-px h-8 bg-slate-100 dark:bg-white/10"></div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Growth</p>
                                <p className="text-lg font-black text-emerald-500">+{student.trend}%</p>
                            </div>
                        </div>
                        {student.rank === 1 && <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl -mr-16 -mt-16"></div>}
                    </Card>
                ))}
            </div>

            {/* Rankings Table */}
            <Card className="p-0 bg-white/60 dark:bg-slate-800/40 border border-white dark:border-white/10 rounded-[40px] shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Full Leaderboard</h2>
                    <div className="relative group w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find a student..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-white/10 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 dark:border-white/5">
                                <th className="pb-6 pl-8">Rank Status</th>
                                <th className="pb-6">Student Information</th>
                                <th className="pb-6">Academic Score</th>
                                <th className="pb-6">Monthly Trend</th>
                                <th className="pb-6 pr-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {filteredList.map((row, idx) => (
                                <RankRow key={idx} {...row} />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Showing {filteredList.length} students of 12,482 in {activeTab}</p>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-not-allowed">Prev</button>
                        <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all shadow-sm">Next</button>
                    </div>
                </div>
            </Card>

            {/* Achievements Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Badges & Hall of Fame</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {[
                        { label: 'Deans List', icon: Medal, color: 'text-amber-500', bg: 'bg-amber-50' },
                        { label: 'Research Ace', icon: Zap, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                        { label: 'Community Hero', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                        { label: 'Global Citizen', icon: Medal, color: 'text-rose-500', bg: 'bg-rose-50' },
                        { label: 'Speed Reader', icon: Star, color: 'text-blue-500', bg: 'bg-blue-50' },
                        { label: 'Top Contributor', icon: Trophy, color: 'text-orange-500', bg: 'bg-orange-50' },
                    ].map((badge, idx) => (
                        <Card key={idx} className="p-6 bg-white/40 border border-white rounded-[32px] shadow-sm flex flex-col items-center text-center group hover:-translate-y-2 transition-all cursor-pointer">
                            <div className={`w-14 h-14 ${badge.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <badge.icon className={`w-7 h-7 ${badge.color}`} />
                            </div>
                            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-tight">{badge.label}</h4>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
