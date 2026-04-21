"use client";
import React, { useState, useEffect } from 'react';
import Card from '../../../components/Card';
import { Users, Check, Clock, X, Calendar, ChevronRight, Save } from 'lucide-react';
import { useLanguage } from '../../../lib/LanguageContext';
import { api } from '../../../lib/api';

const MOCK_STUDENTS = [
  { id: 'S001', name: 'Ali Valiyev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: 'S002', name: 'Hasan Husanov', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { id: 'S003', name: 'Zuhra Aliyeva', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { id: 'S004', name: 'Timur Akhmedov', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 'S005', name: 'Olimjon Sobirov', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
];

export default function Page() {
  const { t } = useLanguage();
  const [schedule, setSchedule] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getTeacherSchedule().then(data => {
      setSchedule(data || []);
      setLoading(false);
    });
  }, []);

  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    const initialMap = {};
    MOCK_STUDENTS.forEach(s => initialMap[s.id] = 'Present');
    setAttendanceMap(initialMap);
  };

  const handleStatusChange = (studentId, status) => {
    setAttendanceMap(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    const payload = {
      title: `${selectedClass.course} (${selectedClass.day})`,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
      classId: selectedClass.id,
      attendance: attendanceMap
    };
    await api.addAttendance(payload);
    alert('Attendance saved successfully!');
    setSaving(false);
    setSelectedClass(null);
  };

  const statusColors = {
    Present: 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100',
    Late: 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100',
    Absent: 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
  };

  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className='p-6 md:p-8 lg:p-10 w-full animate-in fade-in duration-500'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10'>
        <div>
          <h1 className='text-[40px] font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3'>{t('attendance')}</h1>
          <p className='text-slate-500 font-bold uppercase tracking-widest text-[11px]'>{t('recordAttendance') || 'Select a class to mark attendance'}</p>
        </div>
      </div>

      <div className='space-y-12'>
        <h2 className='text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center mb-6'>
          <Calendar className='w-6 h-6 mr-3 text-indigo-500' />
          {t('weeklySchedule') || 'Weekly Schedule'}
        </h2>

        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[1, 2, 3].map(i => <div key={i} className='h-32 bg-slate-100 rounded-[32px] animate-pulse'></div>)}
          </div>
        ) : (
          <div className='space-y-10'>
            {DAYS.map(day => {
              const dayClasses = schedule.filter(c => c.day === day);

              return (
                <div key={day} className="bg-white/40 backdrop-blur-sm border border-white p-6 rounded-[32px] shadow-sm">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 pl-2">{t(day.toLowerCase()) || day}</h3>
                  {dayClasses.length === 0 ? (
                    <div className="flex items-center justify-center p-8 bg-white/20 rounded-3xl border border-white/50 border-dashed">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('noClassesToday') || 'No classes'}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {dayClasses.map(cls => (
                        <Card
                          key={cls.id}
                          onClick={() => handleSelectClass(cls)}
                          className={`p-6 cursor-pointer transition-all border-2 group hover:border-indigo-300 hover:shadow-lg ${selectedClass?.id === cls.id ? 'border-indigo-500 shadow-md bg-indigo-50/50' : 'border-transparent bg-white/60'}`}
                        >
                          <div className='flex justify-between items-start'>
                            <div>
                              <div className="flex items-center space-x-2 mb-3">
                                <span className='text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-100 px-3 py-1 rounded-xl'>{cls.room}</span>
                                <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center'>
                                  <Clock className='w-3 h-3 mr-1' /> {cls.time}
                                </span>
                              </div>
                              <h4 className='font-black text-slate-800 text-lg leading-tight uppercase tracking-tight'>{cls.course}</h4>
                            </div>
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${selectedClass?.id === cls.id ? 'bg-indigo-500 text-white' : 'bg-slate-50 text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-400'}`}>
                              <ChevronRight className="w-5 h-5 ml-0.5" />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Student Roster Modal */}
      {selectedClass && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedClass(null)}></div>
          <div className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-white">
            {/* Modal Header */}
            <div className='flex items-center justify-between border-b border-slate-100 p-8 pb-6 bg-slate-50/50'>
              <div>
                <h3 className='text-3xl font-black text-slate-900 tracking-tight mb-2'>{selectedClass.course}</h3>
                <div className='flex items-center gap-3'>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">
                    {t(selectedClass.day.toLowerCase()) || selectedClass.day}
                  </span>
                  <span className='text-xs font-bold text-slate-500 uppercase tracking-widest'>
                    {selectedClass.time} • Room {selectedClass.room}
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='hidden sm:flex bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest'>
                  {MOCK_STUDENTS.length} Students
                </div>
                <button onClick={() => setSelectedClass(null)} className="p-2 sm:p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className='p-8 flex-1 overflow-y-auto space-y-4 bg-white/50'>
              {MOCK_STUDENTS.map(student => (
                <div key={student.id} className='flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-3xl border border-slate-100 hover:border-slate-200 transition-colors gap-4 bg-white shadow-sm hover:shadow-md'>
                  <div className='flex items-center space-x-4'>
                    <img src={student.avatar} alt={student.name} className='w-12 h-12 rounded-2xl object-cover' />
                    <div>
                      <p className='font-black text-slate-900 text-sm uppercase tracking-wider'>{student.name}</p>
                      <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5'>ID: {student.id}</p>
                    </div>
                  </div>

                  {/* Attendance Toggles */}
                  <div className='flex p-1.5 rounded-2xl bg-slate-50/80 border border-slate-100/50'>
                    {['Present', 'Late', 'Absent'].map(status => {
                      const isSelected = attendanceMap[student.id] === status;
                      const key = status.toLowerCase(); // 'present', 'late', 'absent'
                      return (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(student.id, status)}
                          className={`flex-[1] px-3 sm:px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${isSelected
                            ? `${statusColors[status]} shadow-sm scale-100`
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 scale-95'
                            }`}
                        >
                          {t(key) || status}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className='p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3'>
              <button
                onClick={() => setSelectedClass(null)}
                className='px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors uppercase tracking-widest text-[#10px]'
              >
                {t('cancel') || 'Cancel'}
              </button>
              <button
                onClick={handleSaveAttendance}
                disabled={saving}
                className='flex items-center space-x-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50'
              >
                <Save className='w-4 h-4' />
                <span>{saving ? 'Saving...' : (t('save') || 'Save Attendance')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
