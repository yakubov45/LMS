"use client";
import React, { useState, useEffect } from "react";
import {
    ClipboardList, Plus, Clock, MoreHorizontal, Edit, Trash2, X
} from "lucide-react";
import { api } from "../../../lib/api";
import Card from "../../../components/Card";
import { useLanguage } from "../../../lib/LanguageContext";

export default function TeacherAssignmentsPage() {
    const { t } = useLanguage();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [editingAssignment, setEditingAssignment] = useState(null);
    const [formData, setFormData] = useState({ title: "", course: "Linear Algebra", dueDate: "", status: "Draft" });

    useEffect(() => {
        const fetchAssignments = async () => {
            const data = await api.getTeacherAssignments();
            setAssignments(data);
            setLoading(false);
        };
        fetchAssignments();
    }, []);

    const openAddModal = () => {
        setFormData({ title: "", course: "Linear Algebra", dueDate: "", status: "Draft" });
        setEditingAssignment(null);
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setFormData({ title: item.title, course: item.course, dueDate: item.dueDate, status: item.status });
        setEditingAssignment(item);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (editingAssignment) {
            const res = await api.updateAssignment(editingAssignment.id, formData);
            if (res.success) {
                setAssignments(assignments.map(a => a.id === editingAssignment.id ? { ...a, ...formData } : a));
            }
        } else {
            const res = await api.addAssignment(formData);
            setAssignments([{ id: res.id || `A-${Date.now()}`, ...formData, submissions: 0 }, ...assignments]);
        }
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this assignment?")) {
            await api.deleteAssignment(id);
            setAssignments(assignments.filter(a => a.id !== id));
        }
    };

    if (loading) return null;

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">{t('assignments')}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">{t('detailsSubtitle') || 'Manage course tasks & evaluations'}</p>
            </header>

            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('active') || 'Active'} {t('assignments')}</h2>
                    </div>
                    <button onClick={openAddModal} className="flex items-center space-x-2 px-6 py-2.5 bg-[#1e293b] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95 transform">
                        <Plus className="w-4 h-4" />
                        <span>{t('add') || 'Create New'}</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {assignments.map((assignment) => (
                        <div key={assignment.id} className="p-6 rounded-3xl bg-white/40 border border-white hover:border-slate-200 transition-all group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                                        <ClipboardList className="w-6 h-6 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">{assignment.title}</h4>
                                        <div className="flex items-center space-x-3 mt-1">
                                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">{assignment.course}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {t('due')}: {assignment.dueDate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-lg font-black text-slate-900 dark:text-white leading-none">{assignment.submissions}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{t('submissions')}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${assignment.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                                            }`}>
                                            {assignment.status}
                                        </span>
                                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all ml-2">
                                            <button onClick={() => openEditModal(assignment)} className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(assignment.id)} className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-rose-600 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {assignments.length === 0 && (
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest text-center py-10">{t('noRecords') || 'No Assignments Found'}</p>
                    )}
                </div>
            </Card>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl p-8 border border-white">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{editingAssignment ? (t('edit') || 'Edit') : (t('add') || 'New')}</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('assignmentTitle') || 'Assignment Title'}</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('course') || 'Course'}</label>
                                    <select
                                        value={formData.course}
                                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700"
                                    >
                                        <option>Linear Algebra</option>
                                        <option>Data Structures</option>
                                        <option>Physics II</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('status') || 'Status'}</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700"
                                    >
                                        <option>Draft</option>
                                        <option>Published</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('dueDate') || 'Due Date'}</label>
                                <input
                                    type="date"
                                    value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setFormData({ ...formData, dueDate: new Date(e.target.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end space-x-3">
                            <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">{t('cancel') || 'Cancel'}</button>
                            <button
                                onClick={handleSave}
                                disabled={!formData.title}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md active:scale-95 transform"
                            >
                                {editingAssignment ? (t('save') || 'Save') : (t('add') || 'Create')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
