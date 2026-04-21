"use client";
import React from "react";
import Card from "../../../components/Card";
import {
    Search, Filter, Mail, Phone, BookOpen,
    Award, Star, MessageSquare, Globe,
    MoreHorizontal, ChevronRight, MapPin
} from "lucide-react";

const TeacherCard = ({ name, role, department, office, email, bio, avatar, tags }) => (
    <Card className="p-0 overflow-hidden bg-white/60 border border-white rounded-[40px] shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500 group flex flex-col md:flex-row">
        <div className="w-full md:w-72 h-80 md:h-auto overflow-hidden relative">
            <img src={avatar} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl flex items-center space-x-2 text-white border border-white/20">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Top Rated</span>
                </div>
            </div>
        </div>

        <div className="flex-1 p-10 flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2">{name}</h3>
                    <div className="flex items-center space-x-3 text-sm font-bold text-indigo-600 uppercase tracking-widest">
                        <span>{role}</span>
                        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                        <span className="text-slate-500">{department}</span>
                    </div>
                </div>
                <button className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <p className="text-[14px] font-medium text-slate-500 leading-relaxed mb-8 max-w-xl">
                {bio}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8 border-y border-slate-50 py-8">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Office Hours</p>
                    <p className="text-sm font-bold text-slate-800">{office}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Specialization</p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <span key={tag} className="text-[11px] font-bold text-indigo-600">#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-4">
                <button className="flex-1 sm:flex-none flex items-center justify-center space-x-3 px-8 py-3.5 bg-[#1e293b] text-white rounded-[20px] text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                    <Mail className="w-4 h-4" />
                    <span>Contact Professor</span>
                </button>
                <button className="p-3.5 bg-white border border-slate-200 rounded-[20px] text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                    <MessageSquare className="w-5 h-5" />
                </button>
                <button className="p-3.5 bg-white border border-slate-200 rounded-[20px] text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                    <Globe className="w-5 h-5" />
                </button>
            </div>
        </div>
    </Card>
);

export default function TeachersPage() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const list = [
        {
            id: 1,
            name: "Dr. Elena Vance",
            role: "Assoc. Professor",
            department: "Computer Science",
            office: "Mon & Wed, 10:00 - 12:00",
            email: "elena.vance@campus.edu",
            bio: "Specializing in High-Performance Computing and Distributed Systems. Dr. Vance leads the Green Computing laboratory and has published over 50 papers on parallel algorithms.",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
            tags: ["HPC", "Algorithms", "AI"]
        },
        {
            id: 2,
            name: "Prof. Arthur Pendragon",
            role: "Senior Lecturer",
            department: "History & Arts",
            office: "Tue & Fri, 14:00 - 16:00",
            email: "arthur.p@campus.edu",
            bio: "Renowned expert in Medieval History and Archeology. Author of 'The Legend of Camelot: Fact vs Fiction'. Prof. Arthur is the recipient of the Excellence in Teaching award 2025.",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
            tags: ["History", "Archeology", "Literature"]
        }
    ];

    const filteredTeachers = list.filter(teacher =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">

            {/* Header Section */}
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-[40px] font-black text-slate-900 tracking-tight leading-none mb-3">Academic Faculty</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Connect with our world-class educators and researchers</p>
                </div>

                <div className="flex items-center space-x-4 w-full xl:w-auto">
                    <div className="relative flex-1 xl:w-96 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name, department..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/60 dark:bg-slate-800/60 border border-white dark:border-white/10 rounded-[32px] py-4 pl-14 pr-6 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-white/20 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm"
                        />
                    </div>
                    <button className="p-4 bg-white border border-white rounded-[32px] text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <div className="space-y-10">
                {list.map(teacher => (
                    <TeacherCard key={teacher.id} {...teacher} />
                ))}

                {/* Horizontal Stat Bar */}
                <Card className="p-8 bg-slate-900 border-none rounded-[40px] shadow-2xl overflow-hidden relative">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-around gap-8 text-center">
                        <div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Active Professors</p>
                            <h4 className="text-3xl font-black text-white">412</h4>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-white/10"></div>
                        <div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">PhD Candidates</p>
                            <h4 className="text-3xl font-black text-white">3,124</h4>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-white/10"></div>
                        <div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Department Stats</p>
                            <h4 className="text-3xl font-black text-white">24</h4>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-white/10"></div>
                        <button className="px-8 py-3 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-colors">
                            Appointment System
                        </button>
                    </div>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -ml-32 -mt-32"></div>
                </Card>
            </div>
        </div>
    );
}
