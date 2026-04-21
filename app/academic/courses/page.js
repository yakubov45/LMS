"use client";
import React, { useState } from "react";
import Card from "../../../components/Card";
import { BookOpen, Plus, Search, Edit, Trash2, FileText, ArrowRight } from "lucide-react";
import { useLanguage } from "../../../lib/LanguageContext";

const MOCK_COURSES = [
    { id: 1, code: "CS101", name: "Introduction to Computer Science", credits: 4, department: "Computer Science", prerequisite: null, instructor: "Dr. Smith", status: "Active" },
    { id: 2, code: "CS201", name: "Data Structures & Algorithms", credits: 4, department: "Computer Science", prerequisite: "CS101", instructor: "Dr. Adams", status: "Active" },
    { id: 3, code: "MTH101", name: "Calculus I", credits: 3, department: "Mathematics", prerequisite: null, instructor: "Prof. Einstein", status: "Active" },
    { id: 4, code: "ENG101", name: "Academic Writing", credits: 2, department: "Languages", prerequisite: null, instructor: "Dr. Johnson", status: "Draft" },
];

export default function AcademicCoursesPage() {
    const { t } = useLanguage();
    const [courses, setCourses] = useState(MOCK_COURSES);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({ code: "", name: "", credits: 3, department: "Computer Science", prerequisite: "", status: "Active" });

    const handleOpenModal = (course = null) => {
        if (course) {
            setEditingCourse(course);
            setFormData({ ...course });
        } else {
            setEditingCourse(null);
            setFormData({ code: "", name: "", credits: 3, department: "Computer Science", prerequisite: "", status: "Active" });
        }
        setShowModal(true);
    };

    const handleSave = () => {
        if (!formData.name || !formData.code) return;
        if (editingCourse) {
            setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...formData } : c));
        } else {
            setCourses([{ id: Date.now(), ...formData, instructor: "Unassigned" }, ...courses]);
        }
        setShowModal(false);
    };

    const handleDelete = (id) => setCourses(courses.filter(c => c.id !== id));

    const filteredCourses = courses.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">{t('coursesManagement') || "Curriculum & Courses"}</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">{courses.length} total courses</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                    <Plus className="w-4 h-4" />
                    <span>{t('addCourse') || "Add Course"}</span>
                </button>
            </header>

            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                <div className="relative mb-8 max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder={t('searchCourses') || "Search course code or name..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
                        <div key={course.id} className="relative group p-6 rounded-3xl bg-slate-50/70 border border-slate-100 hover:bg-white transition-all shadow-sm hover:shadow-md">

                            {/* Action Buttons Overlay */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                                <button onClick={() => handleOpenModal(course)} className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(course.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${course.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {course.code}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{course.credits} Credits</span>
                            </div>

                            <h3 className="text-lg font-black text-slate-900 leading-tight mb-2">{course.name}</h3>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">{course.department}</p>

                            {course.prerequisite ? (
                                <div className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 p-2 rounded-xl mb-4 border border-amber-100">
                                    <ArrowRight className="w-3 h-3 mr-2 shrink-0" /> Requirements: {course.prerequisite}
                                </div>
                            ) : (
                                <div className="h-9 mb-4"></div> /* Placeholder for alignment */
                            )}

                            <div className="flex justify-between items-center pt-4 border-t border-slate-200/60">
                                <span className="text-xs font-medium text-slate-500">{course.instructor}</span>
                                <button className="flex items-center text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors">
                                    <FileText className="w-3 h-3 mr-1" /> Syllabus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl p-8 border border-white">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-6">{editingCourse ? "Edit Course" : "New Course"}</h3>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Course Code</label>
                                <input type="text" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. CS101" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Credits</label>
                                <input type="number" value={formData.credits} onChange={e => setFormData({ ...formData, credits: parseInt(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Course Name</label>
                            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Department</label>
                                <input type="text" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Status</label>
                                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20">
                                    <option value="Active">Active</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Prerequisite (Course Code)</label>
                            <input type="text" value={formData.prerequisite || ""} onChange={e => setFormData({ ...formData, prerequisite: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. CS100 (Leave empty if none)" />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
                            <button onClick={handleSave} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md">
                                {editingCourse ? "Save Changes" : "Create Course"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
