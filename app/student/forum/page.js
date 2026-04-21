"use client";
import React from "react";
import Card from "../../../components/Card";
import {
    MessageSquare, Search, Filter, Plus,
    ArrowUpCircle, ArrowDownCircle, Clock,
    User, Tag, Share2, MoreHorizontal,
    TrendingUp, Award, MessageCircle
} from "lucide-react";

const ForumPost = ({ author, time, title, content, tags, upvotes, comments }) => (
    <Card className="p-8 bg-white/60 border border-white rounded-[40px] shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500 group flex gap-8">
        <div className="hidden sm:flex flex-col items-center space-y-2 pt-1">
            <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <ArrowUpCircle className="w-8 h-8" />
            </button>
            <span className="text-sm font-black text-slate-900">{upvotes}</span>
            <button className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                <ArrowDownCircle className="w-8 h-8" />
            </button>
        </div>

        <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 border border-slate-200 uppercase">
                        {author[0]}
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span className="text-slate-900 font-extrabold">{author}</span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                        <Clock className="w-3 h-3" />
                        <span>{time} ago</span>
                    </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors uppercase truncate">
                {title}
            </h3>

            <p className="text-[14px] font-medium text-slate-500 leading-relaxed mb-6 line-clamp-2">
                {content}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-indigo-100 hover:text-indigo-600 transition-all cursor-pointer">
                            # {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center space-x-6 text-[11px] font-black text-slate-400 tracking-widest uppercase">
                    <button className="flex items-center space-x-2 hover:text-indigo-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{comments} Comments</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-indigo-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                    </button>
                </div>
            </div>
        </div>
    </Card>
);

export default function ForumPage() {
    const posts = [
        {
            id: 1,
            author: "Steve Rogers",
            time: "2h",
            title: "Study Group for Advanced Algorithms Midterm?",
            content: "Hey everyone! I'm putting together a serious study group for the midterm next week. We'll be focusing on Dynamic Programming and Graph Theory. Space is limited to 5 people.",
            tags: ["Academics", "CS", "StudyGroup"],
            upvotes: "1,240",
            comments: 42
        },
        {
            id: 2,
            author: "Natasha Romanoff",
            time: "5h",
            title: "Best Coffee Spot on Campus for Night Owls?",
            content: "Since the main library café started closing at midnight, I've been looking for alternative spots with good Wi-Fi and strong espresso. Any hidden gems?",
            tags: ["CampusLife", "Coffee", "Tips"],
            upvotes: "850",
            comments: 128
        },
        {
            id: 3,
            author: "Tony Stark",
            time: "1d",
            title: "Announcing the 2026 Innovation Hackathon",
            content: "Registration is now open for the biggest hackathon of the year. $50k prize pool and direct internship offers from top tech companies. Who's in?",
            tags: ["Announcements", "Hackathon", "Tech"],
            upvotes: "3,120",
            comments: 642
        }
    ];

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">

            {/* Header Section */}
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-[40px] font-black text-slate-900 tracking-tight leading-none mb-3">Community Forum</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span>Trending Topic: Fall Career Fair</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <MessageSquare className="w-4 h-4 text-indigo-500" />
                            <span>124 Active Discussions Now</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center space-x-3 px-8 py-3.5 bg-[#1e293b] text-white rounded-[24px] text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                        <Plus className="w-4 h-4" />
                        <span>Start Discussion</span>
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">

                {/* Posts Feed */}
                <div className="xl:col-span-3 space-y-8">
                    {/* Filter Bar */}
                    <div className="flex items-center bg-white/40 border border-white rounded-[24px] p-2 shadow-sm overflow-x-auto no-scrollbar">
                        {['All Posts', 'Academics', 'Campus Life', 'Announcements', 'Lost & Found'].map(tab => (
                            <button key={tab} className={`whitespace-nowrap px-8 py-3.5 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all ${tab === 'All Posts' ? 'bg-[#1e293b] text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-6">
                        {posts.map(post => (
                            <ForumPost key={post.id} {...post} />
                        ))}

                        {/* Featured Topic Card */}
                        <Card className="p-0 overflow-hidden bg-indigo-600 border-none rounded-[40px] shadow-2xl relative h-64 group cursor-pointer mt-12">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-transparent"></div>
                            <div className="relative h-full flex flex-col justify-center p-10 max-w-xl">
                                <h2 className="text-3xl font-black text-white mb-4 tracking-tight leading-tight uppercase">Ask the Dean: Monthly Open Q&A Session</h2>
                                <p className="text-sm font-bold text-indigo-100 mb-8 uppercase tracking-widest">Happening this Thursday @ 15:00 in the Main Plaza</p>
                                <div className="flex items-center space-x-3 text-white font-black uppercase tracking-widest text-[11px]">
                                    <Clock className="w-4 h-4" />
                                    <span>248 Reminders Set</span>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        </Card>
                    </div>
                </div>

                {/* Sidebar: Stats & Members */}
                <div className="space-y-8">
                    {/* Search Card */}
                    <Card className="p-8 bg-white/60 border border-white rounded-[40px] shadow-sm">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">Search Forum</h3>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Keywords..."
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all shadow-sm"
                            />
                        </div>
                    </Card>

                    {/* Community Stats */}
                    <Card className="p-8 bg-slate-900 text-white rounded-[40px] shadow-xl overflow-hidden relative">
                        <div className="relative z-10">
                            <h3 className="text-lg font-black tracking-tight mb-8 uppercase">Community Stats</h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Members</p>
                                    <h4 className="text-2xl font-black">24,102</h4>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Posts</p>
                                    <h4 className="text-2xl font-black">102K+</h4>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Online</p>
                                    <h4 className="text-2xl font-black text-emerald-400">1,240</h4>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rank</p>
                                    <h4 className="text-2xl font-black text-amber-400">#12</h4>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    </Card>

                    {/* Top Contributors */}
                    <div className="p-2 space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Top Contributors</h4>
                        <div className="space-y-4">
                            {[
                                { name: "Tony Stark", points: "12,482", rank: 1 },
                                { name: "Bruce Banner", points: "9,102", rank: 2 },
                                { name: "Steve Rogers", points: "8,240", rank: 3 },
                            ].map((user, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-white/40 border border-white rounded-[24px] hover:bg-white transition-all cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black">
                                            {user.name[0]}
                                        </div>
                                        <span className="text-[13px] font-bold text-slate-900">{user.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-1.5 text-[11px] font-black text-indigo-600">
                                        <Award className="w-3.5 h-3.5" />
                                        <span>{user.points}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
