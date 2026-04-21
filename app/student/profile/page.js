"use client";
import { useState } from "react";
import Card from "../../../components/Card";
import { mockUser } from "../../../data/mock";
import {
    User, Settings, Shield, Bell, LogOut,
    AlertCircle, Camera, Mail, GraduationCap,
    Calendar, Globe, Lock, Save, Trash2, Plus, X
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/LanguageContext";

export default function Profile() {
    const router = useRouter();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("profile");
    const [showImageModal, setShowImageModal] = useState(false);
    const [currentAvatar, setCurrentAvatar] = useState(mockUser.avatar);

    const tabs = [
        { id: 'profile', label: t('profile'), icon: User },
        { id: 'notifications', label: t('notifications'), icon: Bell },
        { id: 'security', label: t('security'), icon: Shield },
    ];

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentAvatar(reader.result);
                setShowImageModal(false);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">

            <div className="mb-8 md:mb-12">
                <h1 className="text-3xl md:text-[40px] font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">{t('settingsTitle')}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">{t('settingsSubtitle')}</p>
            </div>

            <div className="flex flex-col xl:flex-row gap-10">

                {/* Sidebar Navigation */}
                <div className="w-full xl:w-72 shrink-0 space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-[24px] text-sm font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-[#1e293b] text-white shadow-xl shadow-slate-200 dark:shadow-none -translate-y-1'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}

                    <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-white/5">
                        <button
                            onClick={() => router.push('/')}
                            className="w-full flex items-center space-x-4 px-6 py-4 rounded-[24px] text-sm font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>{t('signOut')}</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 max-w-4xl">
                    {activeTab === 'profile' && (
                        <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right-4 duration-500">
                            <Card className="p-6 md:p-10 bg-white/60 dark:bg-slate-800/40 border border-white dark:border-white/10 rounded-[32px] md:rounded-[40px] shadow-sm">
                                <div className="flex justify-between items-center mb-10">
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('publicProfile')}</h2>
                                    <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        <Globe className="w-3 h-3" />
                                        <span>{t('visibleOnCampus')}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 border-b border-slate-100 dark:border-white/5 pb-10 mb-10">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-700 shadow-2xl overflow-hidden relative">
                                            <img src={currentAvatar} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <button
                                            onClick={() => setShowImageModal(true)}
                                            className="absolute bottom-0 right-0 p-3 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 transition-colors border-4 border-white dark:border-slate-800"
                                        >
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex-1 space-y-6 w-full text-center sm:text-left pt-2">
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">{mockUser.name}</h3>
                                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Student ID: <span className="text-indigo-600 dark:text-indigo-400">{mockUser.id}</span></p>
                                        </div>
                                        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                                            <button
                                                onClick={() => setShowImageModal(true)}
                                                className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                                            >
                                                {t('changePhoto')}
                                            </button>
                                            <button className="px-6 py-3 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all">{t('delete')}</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{t('fullName')}</label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg group-focus-within:bg-indigo-50 dark:group-focus-within:bg-indigo-500/10 transition-colors">
                                                <User className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
                                            </div>
                                            <input
                                                type="text"
                                                defaultValue={mockUser.name}
                                                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-[20px] py-4 pl-14 pr-6 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{t('emailAddress')}</label>
                                        <div className="relative group opacity-60 cursor-not-allowed">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                                <Mail className="w-4 h-4 text-slate-400" />
                                            </div>
                                            <input
                                                type="email"
                                                defaultValue={mockUser.email}
                                                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-[20px] py-4 pl-14 pr-6 text-sm font-bold text-slate-500 dark:text-slate-400 focus:outline-none pointer-events-none"
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{t('major')}</label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                                <GraduationCap className="w-4 h-4 text-slate-400" />
                                            </div>
                                            <input
                                                type="text"
                                                defaultValue={mockUser.major}
                                                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-[20px] py-4 pl-14 pr-6 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{t('academicYear')}</label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                            </div>
                                            <input
                                                type="text"
                                                defaultValue={mockUser.year}
                                                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-[20px] py-4 pl-14 pr-6 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 bg-slate-900 rounded-[32px] text-white">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-white/10 rounded-2xl">
                                            <AlertCircle className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black tracking-tight leading-none mb-1">{t('officialData')}</p>
                                            <p className="text-[11px] font-bold text-slate-400">{t('officialDataSubtitle')}</p>
                                        </div>
                                    </div>
                                    <button className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/40 active:scale-95 transform">
                                        {t('save')}
                                    </button>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right-4 duration-500">
                            <Card className="p-6 md:p-10 bg-white/60 dark:bg-slate-800/40 border border-white dark:border-white/10 rounded-[32px] md:rounded-[40px] shadow-sm">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">{t('notificationSettings')}</h2>
                                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-10 pb-10 border-b border-slate-100 dark:border-white/5">{t('notifSubtitle')}</p>

                                <div className="space-y-10">
                                    {[
                                        { title: t('notifTitle1'), desc: t('notifDesc1'), enabled: true },
                                        { title: t('notifTitle2'), desc: t('notifDesc2'), enabled: true },
                                        { title: t('notifTitle3'), desc: t('notifDesc3'), enabled: true },
                                        { title: t('notifTitle4'), desc: t('notifDesc4'), enabled: false },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start justify-between group">
                                            <div className="space-y-1">
                                                <h4 className="text-[15px] font-black text-slate-900 dark:text-white tracking-tight">{item.title}</h4>
                                                <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 max-w-sm">{item.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked={item.enabled} />
                                                <div className="w-14 h-8 bg-slate-200/60 dark:bg-slate-700/60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right-4 duration-500">
                            <Card className="p-6 md:p-10 bg-white/60 dark:bg-slate-800/40 border border-white dark:border-white/10 rounded-[32px] md:rounded-[40px] shadow-sm">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">{t('securityKirish')}</h2>
                                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-10 pb-10 border-b border-slate-100 dark:border-white/5">{t('securitySubtitle')}</p>

                                <div className="max-w-md space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{t('currentPassword')}</label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors">
                                                <Lock className="w-4 h-4 text-slate-400" />
                                            </div>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-[20px] py-4 pl-14 pr-6 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{t('newPassword')}</label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors">
                                                <Lock className="w-4 h-4 text-slate-400" />
                                            </div>
                                            <input
                                                type="password"
                                                placeholder="Kamida 8 belgi"
                                                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-[20px] py-4 pl-14 pr-6 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3 text-right">
                                        <button className="flex items-center space-x-2 px-8 py-3.5 bg-slate-900 dark:bg-slate-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-600 transition-all shadow-xl shadow-slate-200 dark:shadow-none ml-auto">
                                            <Save className="w-4 h-4" />
                                            <span>{t('updatePassword')}</span>
                                        </button>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-10 bg-white/60 dark:bg-slate-900/40 border border-white dark:border-white/10 rounded-[40px] shadow-sm border-l-4 border-l-rose-500">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2">{t('dangerZone')}</h3>
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 max-w-sm">{t('dangerZoneDesc')}</p>
                                    <button className="flex items-center space-x-2 px-8 py-3.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all">
                                        <Trash2 className="w-4 h-4" />
                                        <span>{t('deleteAccount')}</span>
                                    </button>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Selection Modal */}
            {showImageModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowImageModal(false)}></div>
                    <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl p-10 border border-white dark:border-white/10 overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{t('selectImage')}</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Sizga yoqqan rasmni bosing</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                    />
                                    <button
                                        onClick={() => setShowImageModal(false)}
                                        className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 py-10">
                                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[40px] bg-slate-50/50 dark:bg-slate-800/20 group hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-500">
                                    <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-slate-200 dark:shadow-none group-hover:scale-110 transition-transform duration-500">
                                        <Camera className="w-10 h-10 text-indigo-600" />
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2">{t('uploadNew')}</h4>
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-8 uppercase tracking-widest">{t('formats')}</p>

                                    <label
                                        htmlFor="avatar-upload"
                                        className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all cursor-pointer shadow-xl shadow-indigo-500/20 active:scale-95 transform"
                                    >
                                        {t('pickFile')}
                                    </label>
                                </div>
                            </div>

                            <div className="mt-6 pt-8 border-t border-slate-100 dark:border-white/5 flex justify-end">
                                <button
                                    onClick={() => setShowImageModal(false)}
                                    className="px-10 py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-xl active:scale-95 transform"
                                >
                                    {t('cancel')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

