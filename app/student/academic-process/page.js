"use client";
import React from "react";
import Card from '../../../components/Card';
import {
  Award, BookOpen, ChevronRight, Download, Filter,
  MoreHorizontal, Search, Star, TrendingUp, CheckCircle2
} from 'lucide-react';
import { mockUser, mockCourses } from '../../../data/mock';

const GradeCard = ({ title, grade, target, credits, color }) => (
  <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group cursor-pointer border-t-4" style={{ borderTopColor: color }}>
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-white transition-colors">
        <BookOpen className="w-5 h-5 text-slate-700" />
      </div>
      <div className="bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
        {credits} Credits
      </div>
    </div>
    <h3 className="text-lg font-black text-slate-900 mb-1 truncate">{title}</h3>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Current Grade</p>

    <div className="flex items-end justify-between">
      <div className="flex items-baseline space-x-2">
        <span className="text-4xl font-black text-slate-900 leading-none">{grade}</span>
        <span className="text-sm font-bold text-slate-400">/ 100</span>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target</p>
        <p className="text-sm font-black text-indigo-600">{target}%</p>
      </div>
    </div>

    <div className="mt-6 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${grade}%` }}></div>
    </div>
  </div>
);

export default function Gradebook() {
  const gradesData = [
    { id: 'CS301', title: 'Data Structures', grade: 92, target: 95, credits: 4, color: '#6366f1' },
    { id: 'MA202', title: 'Linear Algebra', grade: 88, target: 90, credits: 3, color: '#ec4899' },
    { id: 'PH101', title: 'Quantum Physics', grade: 85, target: 85, credits: 4, color: '#f59e0b' },
    { id: 'EN402', title: 'Technical Writing', grade: 95, target: 95, credits: 2, color: '#10b981' },
  ];

  return (
    <div className="p-6 lg:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* Header Section */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
        <div>
          <h1 className="text-[40px] font-black text-slate-900 tracking-tight leading-none mb-3">Academic Performance</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Cumulative GPA: <span className="text-slate-900 font-black">{mockUser.gpa}</span></span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center space-x-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Rank: <span className="text-slate-900 font-black">Top 5%</span></span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3.5 bg-[#1e293b] text-white rounded-[20px] text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
            <Download className="w-4 h-4" />
            <span>Export Transcript</span>
          </button>
          <button className="p-3.5 bg-white/40 border border-white rounded-[20px] text-slate-600 hover:bg-white transition-all shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* GPA Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {gradesData.map(course => (
          <GradeCard key={course.id} {...course} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Detailed Grade Table */}
        <div className="xl:col-span-2">
          <Card className="p-8 bg-white/60 border border-white rounded-[40px] shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Transcript Details</h2>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                    <th className="pb-6 pl-2">Subject Code</th>
                    <th className="pb-6">Course Name</th>
                    <th className="pb-6">Instructor</th>
                    <th className="pb-6">Credit</th>
                    <th className="pb-6">Final Grade</th>
                    <th className="pb-6 text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { code: 'CS 301', name: 'Data Structures', prof: 'Dr. Sarah Connor', credit: 4, grade: 'A', score: 92 },
                    { code: 'MA 202', name: 'Linear Algebra', prof: 'Prof. Xavier', credit: 3, grade: 'B+', score: 88 },
                    { code: 'PH 101', name: 'Quantum Physics', prof: 'Dr. Manhattan', credit: 4, grade: 'B', score: 85 },
                    { code: 'EN 402', name: 'Technical Writing', prof: 'Prof. Tolkien', credit: 2, grade: 'A+', score: 95 },
                    { code: 'HIS 110', name: 'Modern History', prof: 'Dr. Jones', credit: 3, grade: 'A-', score: 91 },
                  ].map((row, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 pl-2">
                        <span className="text-[13px] font-black text-slate-400">{row.code}</span>
                      </td>
                      <td className="py-5">
                        <span className="text-[14px] font-black text-slate-800">{row.name}</span>
                      </td>
                      <td className="py-5">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] uppercase font-bold text-slate-500">{row.prof.split(' ').pop()[0]}</div>
                          <span className="text-[13px] font-bold text-slate-500">{row.prof}</span>
                        </div>
                      </td>
                      <td className="py-5">
                        <span className="text-[13px] font-black text-slate-500">{row.credit}</span>
                      </td>
                      <td className="py-5">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${row.grade.startsWith('A') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                            }`}>
                            {row.grade}
                          </div>
                          <span className="text-[13px] font-black text-slate-400">{row.score}%</span>
                        </div>
                      </td>
                      <td className="py-5 text-right pr-2">
                        <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Vertical Distribution / Trends */}
        <div className="space-y-8">
          <Card className="p-8 bg-white/60 border border-white rounded-[40px] shadow-sm">
            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-8">Semester Trend</h2>

            <div className="space-y-6">
              {[
                { label: 'Knowledge Mastery', val: 88, color: 'bg-indigo-500' },
                { label: 'Project Performance', val: 94, color: 'bg-emerald-500' },
                { label: 'Attendance Rate', val: 98, color: 'bg-amber-500' },
                { label: 'Extra-Curricular', val: 75, color: 'bg-rose-500' },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <span>{item.label}</span>
                    <span className="text-slate-900">{item.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${item.val}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 rounded-[24px] bg-slate-900 text-white relative overflow-hidden">
              <div className="relative z-10">
                <Star className="w-6 h-6 text-amber-400 mb-3" />
                <h4 className="text-sm font-black uppercase tracking-widest mb-1">Dean&apos;s List Goal</h4>
                <p className="text-[11px] font-bold text-slate-400 leading-relaxed mb-4">You are only 0.1 GPA points away from the Presidential Award!</p>
                <button className="w-full py-2 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">
                  View Requirements
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            </div>
          </Card>

          <Card className="p-8 bg-white/60 border border-white rounded-[40px] shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">Verified Transcript</h3>
            <p className="text-xs font-bold text-slate-500 leading-relaxed max-w-[200px] mb-6">Your academic records are electronically signed and verified by the University Registry.</p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 w-full">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=VERIFIED_TRANSCRIPT_ID_8842" className="w-20 h-20 mx-auto mb-2 opacity-50 contrast-125" alt="QR Code" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Scan for verification</p>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

