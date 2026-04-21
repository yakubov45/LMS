"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, GraduationCap, Calendar, Bell, BookOpen,
    FileText, User, Users, Coffee, CalendarDays, FileCheck,
    MessageSquare, Award, Newspaper, Search, Dumbbell,
    Moon, Sun, LogOut, ChevronDown, Settings, HelpCircle, X,
    PlusCircle, ClipboardList, Utensils, Languages
} from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "../lib/UserContext";
import { useLanguage } from "../lib/LanguageContext";

export default function Sidebar({ className = "" }) {
    const pathname = usePathname();
    const { user, role, logout, isDarkMode, toggleDarkMode } = useUser();
    const { language, changeLanguage, t } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const searchableItems = [
        { name: "AI Research Center", type: "News", path: "/student/news" },
        { name: "Spring Gala 2026", type: "News", path: "/student/news" },
        { name: "Steve Rogers", type: "Faculty", path: "/student/profile" },
        { name: "Academic Regulations", type: "Academic", path: "/student/academic-process" },
        { name: "Cafeteria Menu", type: "Campus", path: "/student/cafeteria" },
        { name: "Sports Rankings", type: "Sports", path: "/student/ranking" },
        { name: "Schedule Changes", type: "Notification", path: "/student/notifications" },
        { name: "Document Request Status", type: "Documents", path: "/student/application" },
    ];

    const searchResults = searchQuery.length > 1
        ? searchableItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleOpenSearch = () => setShowSearch(true);
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setShowSearch(true);
            }
            if (e.key === '/') {
                const activeElement = document.activeElement;
                if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    setShowSearch(true);
                }
            }
        };

        window.addEventListener('open-global-search', handleOpenSearch);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('open-global-search', handleOpenSearch);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (pathname === "/") return null;

    // Role-based navigation filtering
    const allNavSections = [
        {
            title: "General",
            roles: ["admin", "teacher", "chef", "academic"],
            items: [
                { name: t('dashboard'), path: role ? `/${role.toLowerCase()}` : "/", icon: LayoutDashboard },
            ]
        },
        {
            title: t('studentDashboard'),
            roles: ["student"],
            items: [
                { name: t('dashboard'), path: "/student", icon: LayoutDashboard },
                { name: t('schedule'), path: "/student/schedule", icon: Calendar },
                { name: t('grades'), path: "/student/academic-process", icon: FileCheck },
                { name: t('news'), path: "/student/news", icon: Newspaper },
                { name: t('teachers'), path: "/student/teachers", icon: Users },
                { name: t('cafeteria'), path: "/student/cafeteria", icon: Coffee },
                { name: t('events'), path: "/student/events", icon: CalendarDays },
                { name: t('documents'), path: "/student/application", icon: FileText },
                { name: t('forum'), path: "/student/forum", icon: MessageSquare },
                { name: t('portfolio'), path: "/student/ranking", icon: Award },
                { name: t('lostFound'), path: "/student/lost-found", icon: Search },
                { name: t('sports'), path: "/student/sports", icon: Dumbbell }
            ]
        },
        {
            title: t('adminTools'),
            roles: ["admin"],
            items: [
                { name: t('userManagement'), path: "/admin/users", icon: Users },
                { name: t('systemAnalytics'), path: "/admin", icon: LayoutDashboard },
                { name: t('newsManagement'), path: "/admin/news", icon: Newspaper },
                { name: t('eventsManagement'), path: "/admin/events", icon: CalendarDays },
                { name: t('systemSettings'), path: "/admin/settings", icon: Settings },
            ]
        },
        {
            title: t('teacherTools'),
            roles: ["teacher"],
            items: [
                { name: t('mySchedule'), path: "/teacher", icon: Calendar },
                { name: t('assignments'), path: "/teacher/assignments", icon: ClipboardList },
                { name: t('studentSubs'), path: "/teacher/submissions", icon: FileCheck },
                { name: t('attendance'), path: "/teacher/attendance", icon: Users },
                { name: t('compensation'), path: "/teacher/compensation", icon: Coffee },
                { name: t('examBoard'), path: "/teacher/exam", icon: FileText },
                { name: t('hwSubmissions'), path: "/teacher/homework-submission", icon: BookOpen },
                { name: t('oralExams'), path: "/teacher/oral-exam", icon: MessageSquare },
            ]
        },
        {
            title: t('kitchenManagement'),
            roles: ["chef"],
            items: [
                { name: t('dailyMenu'), path: "/chef", icon: Coffee },
                { name: t('manageItems'), path: "/chef/menu", icon: Utensils },
            ]
        },
        {
            title: t('academicOffice'),
            roles: ["academic"],
            items: [
                { name: t('courses'), path: "/academic/courses", icon: BookOpen },
                { name: t('groups'), path: "/academic/groups", icon: Users },
                { name: t('academicCalendar'), path: "/academic/calendar", icon: Calendar },
                { name: t('docRequests'), path: "/academic", icon: FileText },
                { name: t('studentWarnings'), path: "/academic/warnings", icon: Bell },
                { name: t('news'), path: "/academic/news", icon: Newspaper },
                { name: t('teachers'), path: "/academic/teachers", icon: Users },
                { name: t('events'), path: "/academic/events", icon: CalendarDays },
            ]
        },
        {
            title: t('campusAccess'),
            roles: ["teacher", "academic"],
            items: [
                { name: t('cafeteria'), path: "/student/cafeteria", icon: Coffee },
            ]
        },
        {
            title: t('support'),
            roles: ["teacher", "chef", "student"],
            items: [
                { name: t('itHelp'), path: "/student/help", icon: HelpCircle },
            ]
        }
    ];

    const navSections = allNavSections
        .filter(section => !section.roles || section.roles.includes(role?.toLowerCase()))
        .map(section => ({
            ...section,
            items: section.items.filter(item => !item.roles || item.roles.includes(role?.toLowerCase()))
        }))
        .filter(section => section.items.length > 0);

    const SidebarContent = () => (
        <div className="flex flex-col h-full text-slate-800 relative z-20 overflow-hidden font-sans">
            {/* User Profile Section at Top */}
            <Link href={role ? `/${role.toLowerCase()}${role.toLowerCase() === 'student' ? '/profile' : ''}` : "/"} className="p-6 pb-2 shrink-0 block">
                <div className="flex items-center space-x-3 p-2 rounded-2xl bg-white/40 hover:bg-white transition-colors border border-white/40 cursor-pointer group">
                    <div className="relative">
                        <img
                            src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Steve"}
                            alt="User"
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-white"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate uppercase tracking-tighter">{user?.name || t('guestUser')}</p>
                        <p className="text-[11px] font-semibold text-slate-500 truncate uppercase tracking-widest">{t(role?.toLowerCase()) || t('visitor')}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>
            </Link>

            {/* Navigation Sections */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-8 scroll-smooth custom-scrollbar">
                {navSections.map((section, idx) => (
                    <div key={idx} className={`${idx !== 0 ? 'mt-6 pt-6 border-t border-slate-200/50' : ''}`}>
                        <div className="px-5 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{section.title}</div>
                        <div className="space-y-1.5">
                            {section.items.map((item) => {
                                const isActive = pathname === item.path;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        className={`sidebar-link group/link ${isActive
                                            ? "bg-white dark:bg-slate-800 shadow-md text-indigo-700 dark:text-white border border-indigo-50 dark:border-white/10"
                                            : "text-slate-500 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                                            }`}
                                    >
                                        <Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-indigo-50 text-glow ring-2 ring-indigo-500' : 'text-slate-400 opacity-60'}`} style={{ backgroundColor: isActive ? '#4f46e5' : 'transparent', borderRadius: '6px', padding: isActive ? '3px' : '0' }} strokeWidth={isActive ? 2.5 : 2} />
                                        <span className={`text-[14px] ${isActive ? 'font-black' : 'font-medium'}`}>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Controls */}
            <div className="p-4 pt-2 border-t border-white/20 space-y-2">
                {/* Language Switcher */}
                <div className="flex bg-white/40 dark:bg-slate-800/40 p-1 rounded-xl mb-2 border border-white/40 dark:border-white/5 shadow-sm">
                    {['EN', 'UZ', 'RU'].map((l) => (
                        <button
                            key={l}
                            onClick={() => changeLanguage(l.toLowerCase())}
                            className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${language.toUpperCase() === l ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
                        >
                            {l}
                        </button>
                    ))}
                </div>

                <button
                    onClick={toggleDarkMode}
                    className="flex items-center space-x-3 px-5 py-3 rounded-xl text-slate-500 font-medium hover:bg-white/40 hover:text-slate-900 dark:hover:text-white transition-all w-full"
                >
                    {isDarkMode ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
                    <span className="text-[14px]">{isDarkMode ? t('lightMode') || "Light Mode" : t('darkMode') || "Dark Mode"}</span>
                </button>
                <div
                    onClick={() => {
                        logout();
                        window.location.href = "/";
                    }}
                    className="flex items-center space-x-3 px-5 py-3 rounded-xl text-slate-500 font-medium hover:bg-white/40 hover:text-red-600 transition-all w-full group cursor-pointer"
                >
                    <LogOut className="h-[18px] w-[18px] group-hover:text-red-500 transition-colors" />
                    <span className="text-[14px]">{t('signOut')}</span>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className={`h-full relative z-20 ${className}`}>
                <SidebarContent />
            </div>

            {/* Global Search Modal */}
            {showSearch && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowSearch(false)}></div>
                    <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden border border-white dark:border-white/10">
                        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center space-x-6">
                            <Search className="w-8 h-8 text-indigo-500" />
                            <input
                                type="text"
                                autoFocus
                                placeholder={t('searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none text-2xl font-black text-slate-900 dark:text-white outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700 tracking-tight"
                            />
                            <button onClick={() => setShowSearch(false)} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto p-4 no-scrollbar">
                            {searchQuery.length > 1 ? (
                                <div className="space-y-2">
                                    {searchResults.length > 0 ? searchResults.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={item.path}
                                            onClick={() => setShowSearch(false)}
                                            className="flex items-center justify-between p-6 rounded-[24px] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                                                    {item.type === 'Course' && <BookOpen className="w-6 h-6 text-indigo-500" />}
                                                    {item.type === 'News' && <Newspaper className="w-6 h-6 text-indigo-500" />}
                                                    {item.type === 'Faculty' && <User className="w-6 h-6 text-indigo-500" />}
                                                    {!['Course', 'News', 'Faculty'].includes(item.type) && <Search className="w-6 h-6 text-indigo-500" />}
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{item.name}</h4>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.type}</span>
                                                </div>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-all">
                                                <ChevronDown className="w-5 h-5 text-slate-300 -rotate-90" />
                                            </div>
                                        </Link>
                                    )) : (
                                        <div className="p-10 text-center">
                                            <p className="text-slate-400 font-bold">{t('noResultsFound')} &quot;{searchQuery}&quot;</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-10 text-center">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">{t('searchMinChars')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-b border-white/20 dark:border-white/10 flex items-center justify-between px-6 z-50 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="bg-indigo-600 p-2 rounded-xl">
                        <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-black text-slate-900 dark:text-white tracking-widest text-[13px] uppercase">Campus</span>
                </div>

                <div className="flex items-center space-x-3">
                    <button onClick={() => setShowSearch(true)} className="p-2 text-slate-500 hover:text-indigo-600 transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-slate-900 dark:text-white"
                    >
                        <LayoutDashboard className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-[100] flex animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
                    <div className="relative flex w-[280px] flex-col bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl shadow-2xl h-full overflow-hidden rounded-r-[40px] border-r border-white dark:border-white/10 animate-in slide-in-from-left duration-500">
                        <SidebarContent />
                    </div>
                </div>
            )}
        </>
    );
}

