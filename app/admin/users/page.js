"use client";
import React, { useState, useEffect } from "react";
import {
    Search, Plus, Edit, Trash2, X, AlertTriangle, UserCheck
} from "lucide-react";
import { api } from "../../../lib/api";
import Card from "../../../components/Card";
import { useLanguage } from "../../../lib/LanguageContext";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const { t } = useLanguage();

    // Modal States
    const [showUserModal, setShowUserModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ name: "", email: "", role: "Student", status: "Active" });

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await api.getUsers();
            setUsers(data);
            setLoading(false);
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openAddModal = () => {
        setFormData({ name: "", email: "", role: "Student", status: "Active" });
        setEditingUser(null);
        setShowUserModal(true);
    };

    const openEditModal = (user) => {
        setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
        setEditingUser(user);
        setShowUserModal(true);
    };

    const handleSaveUser = async () => {
        if (editingUser) {
            await api.updateUser(editingUser.id, formData);
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
        } else {
            const res = await api.addUser(formData);
            const newUser = { id: res.id || `U-${Date.now()}`, ...formData };
            setUsers([newUser, ...users]);
        }
        setShowUserModal(false);
    };

    const confirmDelete = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        await api.deleteUser(userToDelete.id);
        setUsers(users.filter(u => u.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    if (loading) return null;

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">{t('userDirectory')}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">{t('userDirectorySubtitle')}</p>
            </header>

            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder={t('searchUsers')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/40 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center space-x-2 px-6 py-2.5 bg-[#1e293b] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95 transform"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">{t('addUser')}</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-white/5 pb-4">
                                <th className="pb-4 pl-4">{t('nameEmail')}</th>
                                <th className="pb-4">{t('role')}</th>
                                <th className="pb-4">{t('status')}</th>
                                <th className="pb-4 text-right pr-4">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {filteredUsers.map((u) => (
                                <tr key={u.id} className="group hover:bg-white/40 transition-colors">
                                    <td className="py-5 pl-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-400 overflow-hidden">
                                                {u.avatar ? (
                                                    <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    u.name.charAt(0)
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{u.name}</p>
                                                <p className="text-xs font-bold text-slate-400">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${u.role === 'Admin' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                            u.role === 'Teacher' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                                                'bg-slate-50 text-slate-600 border border-slate-100'
                                            }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="py-5">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
                                            <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">
                                                {u.status === 'Active' ? t('active') : t('inactive') || u.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-5 text-right pr-4">
                                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button onClick={() => openEditModal(u)} className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-white/10 text-slate-400 hover:text-indigo-600 transition-all">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => confirmDelete(u)} className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-white/10 text-slate-400 hover:text-rose-600 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">{t('noUsersFound')}</p>
                        </div>
                    )}
                </div>
            </Card>

            {/* User Modal */}
            {showUserModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowUserModal(false)}></div>
                    <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl p-8 border border-white">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{editingUser ? t('editUser') : t('newUser')}</h3>
                            <button onClick={() => setShowUserModal(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('fullName')}</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                                    placeholder="Steve Rogers"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('emailAddress')}</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                                    placeholder="steve@university.edu"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('role')}</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-700"
                                    >
                                        <option value="Student">{t('student') || 'Student'}</option>
                                        <option value="Teacher">{t('teacher') || 'Teacher'}</option>
                                        <option value="Admin">{t('admin') || 'Admin'}</option>
                                        <option value="Chef">{t('chef') || 'Chef'}</option>
                                        <option value="Academic Admin">{t('academicAdmin') || 'Academic Admin'}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('status')}</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-700"
                                    >
                                        <option value="Active">{t('active')}</option>
                                        <option value="Inactive">{t('inactive')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end space-x-3">
                            <button onClick={() => setShowUserModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">{t('cancel')}</button>
                            <button
                                onClick={handleSaveUser}
                                disabled={!formData.name || !formData.email}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 transform"
                            >
                                {editingUser ? t('saveUpdates') : t('createUser')}
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
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{t('deleteUserTitle')}</h3>
                        <p className="text-sm font-medium text-slate-500 mb-8">
                            {t('deleteConfirm').replace('user', userToDelete?.name)}
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
