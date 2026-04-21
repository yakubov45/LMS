"use client";
import React, { useState, useEffect } from "react";
import {
    Search, Plus, Edit, Trash2, X, AlertTriangle, Users, Mail, GraduationCap, Info
} from "lucide-react";
import { api } from "../../../lib/api";
import Card from "../../../components/Card";
import { useLanguage } from "../../../lib/LanguageContext";
import { translateAll } from "../../../lib/translate";

export default function AcademicTeachersPage() {
    const { t } = useLanguage();
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isTranslating, setIsTranslating] = useState(false);

    // Modal States
    const [showTeacherModal, setShowTeacherModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [teacherToDelete, setTeacherToDelete] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ name: "", department: "Computer Science", subject: "", email: "", avatar: "", bio: "" });

    useEffect(() => {
        const fetchTeachers = async () => {
            const data = await api.getTeachers();
            setTeachers(data);
            setLoading(false);
        };
        fetchTeachers();
    }, []);

    const handleAutoTranslate = async () => {
        if (!formData.bio) return;
        setIsTranslating(true);
        try {
            const translations = await translateAll(formData.bio);
            alert(`AI Translation results (Bio):\nUZ: ${translations.uz}\nRU: ${translations.ru}\nEN: ${translations.en}`);
        } finally {
            setIsTranslating(false);
        }
    };

    const filteredTeachers = teachers.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openAddModal = () => {
        setFormData({ name: "", department: "Computer Science", subject: "", email: "", avatar: "", bio: "" });
        setEditingTeacher(null);
        setShowTeacherModal(true);
    };

    const openEditModal = (teacher) => {
        setFormData({ ...teacher });
        setEditingTeacher(teacher);
        setShowTeacherModal(true);
    };

    const handleSaveTeacher = async () => {
        if (editingTeacher) {
            setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...t, ...formData } : t));
            await api.updateTeacher(editingTeacher.id, formData);
        } else {
            const result = await api.addTeacher(formData);
            setTeachers([result.teacher, ...teachers]);
        }
        setShowTeacherModal(false);
    };

    const confirmDelete = (teacher) => {
        setTeacherToDelete(teacher);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        await api.deleteTeacher(teacherToDelete.id);
        setTeachers(teachers.filter(t => t.id !== teacherToDelete.id));
        setShowDeleteModal(false);
        setTeacherToDelete(null);
    };

    if (loading) return null;

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">{t('teachersManagement')}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">{t('teachersSubtitle')}</p>
            </header>

            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div className="relative flex-1 sm:w-64 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('searchTeachers')}
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
                        <span>{t('addTeacher')}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeachers.map((t_item) => (
                        <Card key={t_item.id} className="bg-white border border-slate-100 dark:border-white/5 rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <img src={t_item.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${t_item.name}`} alt={t_item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 flex space-x-1">
                                    <button onClick={() => openEditModal(t_item)} className="p-2 bg-white dark:bg-slate-800 rounded-xl text-slate-400 hover:text-indigo-600 shadow-md border border-slate-100 dark:border-white/5">
                                        <Edit className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => confirmDelete(t_item)} className="p-2 bg-white dark:bg-slate-800 rounded-xl text-slate-400 hover:text-rose-600 shadow-md border border-slate-100 dark:border-white/5">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-1">{t_item.name}</h3>
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4 px-3 py-1 bg-indigo-50 rounded-lg">{t(t_item.department.toLowerCase().replace(/\s+/g, '')) || t_item.department}</p>

                            <div className="space-y-3 w-full border-t border-slate-50 dark:border-white/5 pt-4 mt-2">
                                <div className="flex items-center space-x-2 text-slate-500">
                                    <GraduationCap className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-tight">{t_item.subject}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-slate-500">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-xs font-bold">{t_item.email}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredTeachers.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">{t('noTeachers')}</p>
                    </div>
                )}
            </Card>

            {/* Teacher Modal */}
            {showTeacherModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowTeacherModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl p-8 border border-white max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{editingTeacher ? t('editTeacherInfo') : t('newTeacher')}</h3>
                            <button onClick={() => setShowTeacherModal(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('fullName')}</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                                        placeholder="Dr. Ismonov..."
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                                        placeholder="name@university.uz"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('department')}</label>
                                    <select
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-700"
                                    >
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Design">Design</option>
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="Physics">Physics</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('subjectName')}</label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                                        placeholder="Sub'iy Intellekt..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('imageURL')}</label>
                                <input
                                    type="text"
                                    value={formData.avatar}
                                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('bio')}</label>
                                <div className="relative">
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        rows={3}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all resize-none"
                                        placeholder="Short bio..."
                                    />
                                    <button
                                        onClick={handleAutoTranslate}
                                        disabled={isTranslating}
                                        className="absolute right-2 bottom-2 h-8 px-3 bg-white border border-slate-200 rounded-lg text-[8px] font-black uppercase tracking-tighter text-indigo-600"
                                    >
                                        {isTranslating ? t('translating') : t('autoTranslate')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end space-x-3">
                            <button onClick={() => setShowTeacherModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">{t('cancel')}</button>
                            <button
                                onClick={handleSaveTeacher}
                                disabled={!formData.name || !formData.email}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 transform"
                            >
                                {editingTeacher ? t('save') : t('add')}
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
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{t('confirmDelete')}?</h3>
                        <p className="text-sm font-medium text-slate-500 mb-8">
                            {t('confirmDelete')} <strong className="text-slate-800">{teacherToDelete?.name}</strong>?
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

