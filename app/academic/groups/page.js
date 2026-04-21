"use client";
import React, { useState } from "react";
import Card from "../../../components/Card";
import { Users, Plus, Search, Edit, Trash2, ArrowRightLeft } from "lucide-react";
import { useLanguage } from "../../../lib/LanguageContext";

const MOCK_GROUPS = [
    { id: 1, name: "CS-2026", department: "Computer Science", studentsCount: 28, maxStudents: 30, advisor: "Dr. Smith", year: "Freshman" },
    { id: 2, name: "SE-2025", department: "Software Engineering", studentsCount: 25, maxStudents: 25, advisor: "Dr. Adams", year: "Sophomore" },
    { id: 3, name: "MTH-2024", department: "Mathematics", studentsCount: 15, maxStudents: 20, advisor: "Prof. Einstein", year: "Junior" },
];

export default function AcademicGroupsPage() {
    const { t } = useLanguage();
    const [groups, setGroups] = useState(MOCK_GROUPS);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showTransfer, setShowTransfer] = useState(false);
    const [editingGroup, setEditingGroup] = useState(null);
    const [formData, setFormData] = useState({ name: "", department: "Computer Science", maxStudents: 30, advisor: "", year: "Freshman" });

    const handleOpenModal = (group = null) => {
        if (group) {
            setEditingGroup(group);
            setFormData({ ...group });
        } else {
            setEditingGroup(null);
            setFormData({ name: "", department: "Computer Science", maxStudents: 30, advisor: "", year: "Freshman" });
        }
        setShowModal(true);
    };

    const handleSave = () => {
        if (!formData.name) return;
        if (editingGroup) {
            setGroups(groups.map(g => g.id === editingGroup.id ? { ...g, ...formData } : g));
        } else {
            setGroups([{ id: Date.now(), ...formData, studentsCount: 0 }, ...groups]);
        }
        setShowModal(false);
    };

    const handleDelete = (id) => setGroups(groups.filter(g => g.id !== id));

    const filteredGroups = groups.filter(g =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">{t('studentGrouping') || "Student Groups"}</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">{groups.length} active groups</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowTransfer(!showTransfer)}
                        className="flex items-center space-x-2 px-6 py-3 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm border border-indigo-100"
                    >
                        <ArrowRightLeft className="w-4 h-4" />
                        <span>{t('transferStudents') || "Transfer"}</span>
                    </button>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{t('createGroup') || "Create Group"}</span>
                    </button>
                </div>
            </header>

            {showTransfer && (
                <Card className="mb-8 p-6 bg-indigo-50 border border-indigo-100 rounded-[32px] flex items-center justify-between">
                    <div className="flex-1">
                        <h3 className="text-sm font-black text-indigo-900 mb-1">Student Transfer Active</h3>
                        <p className="text-xs font-semibold text-indigo-600">Select students from a group to transfer them. Feature coming soon.</p>
                    </div>
                    <button onClick={() => setShowTransfer(false)} className="text-indigo-400 hover:text-indigo-700">Close</button>
                </Card>
            )}

            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                <div className="relative mb-8 max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder={t('searchGroups') || "Search group or department..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGroups.map(group => {
                        const isFull = group.studentsCount >= group.maxStudents;
                        return (
                            <div key={group.id} className="relative group p-6 rounded-3xl bg-slate-50/70 border border-slate-100 hover:bg-white transition-all shadow-sm hover:shadow-md">

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                                    <button onClick={() => handleOpenModal(group)} className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(group.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                                </div>

                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
                                            <Users className="w-4 h-4" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{group.year}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${isFull ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                        {group.studentsCount} / {group.maxStudents} {!isFull ? "Slots" : "Full"}
                                    </span>
                                </div>

                                <h3 className="text-xl font-black text-slate-900 leading-tight mb-1">{group.name}</h3>
                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">{group.department}</p>

                                <div className="flex justify-between items-center pt-4 border-t border-slate-200/60">
                                    <span className="text-xs font-medium text-slate-500">Curator: <strong className="text-slate-800">{group.advisor}</strong></span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl p-8 border border-white">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-6">{editingGroup ? "Edit Group" : "New Group"}</h3>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Group Name</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. CS-2026" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Max Students</label>
                                <input type="number" value={formData.maxStudents} onChange={e => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Department</label>
                            <input type="text" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Academic Year</label>
                                <select value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20">
                                    <option>Freshman</option>
                                    <option>Sophomore</option>
                                    <option>Junior</option>
                                    <option>Senior</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Curator / Advisor</label>
                                <input type="text" value={formData.advisor} onChange={e => setFormData({ ...formData, advisor: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
                            <button onClick={handleSave} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md">
                                {editingGroup ? "Save Changes" : "Create Group"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
