"use client";
import React, { useState, useEffect } from 'react';
import Card from '../../../components/Card';
import { Coffee, Plus } from 'lucide-react';
import { api } from '../../../lib/api';
import { useLanguage } from '../../../lib/LanguageContext';

export default function Page() {
  const { t } = useLanguage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', status: 'Pending Review', date: '' });

  useEffect(() => {
    api.getTeacherCompensation().then((res) => {
      setData(res || []);
      setLoading(false);
    });
  }, []);

  const handleAddRecord = async () => {
    const res = await api.addTeacherCompensation(formData);
    if (res.success) {
      setData([{ id: res.id, ...formData }, ...data]);
      setFormData({ title: '', status: 'Pending Review', date: '' });
      setShowForm(false);
    }
  };

  return (
    <div className='p-6 md:p-8 lg:p-10 w-full animate-in fade-in duration-500'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-[40px] font-bold text-[#14213d] tracking-tight'>{t('compensation')}</h1>
          <p className='text-slate-500 font-medium mt-1'>{t('manageRecordsDesc')}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className='flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg hover:bg-indigo-700 transition-all active:scale-95'
        >
          <Plus className='w-4 h-4' />
          <span>{t('add') || 'Add Record'}</span>
        </button>
      </div>

      {showForm && (
        <Card className='p-8 mb-8 bg-white/80 border border-white rounded-[32px] shadow-xl animate-in zoom-in-95 duration-200'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <label className='text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block'>{t('description')}</label>
              <input
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className='w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20'
                placeholder={t('recordTitle')}
              />
            </div>
            <div>
              <label className='text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block'>{t('date')}</label>
              <input
                type='date'
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className='w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20'
              />
            </div>
            <div>
              <label className='text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block'>{t('status')}</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className='w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700'
              >
                <option>{t('pending')}</option>
                <option>{t('processing')}</option>
                <option>{t('approved')}</option>
                <option>{t('completed')}</option>
              </select>
            </div>
          </div>
          <div className='flex justify-end space-x-3 mt-6'>
            <button onClick={() => setShowForm(false)} className='px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors'>{t('cancel')}</button>
            <button onClick={handleAddRecord} disabled={!formData.title} className='px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md active:scale-95'>{t('save')}</button>
          </div>
        </Card>
      )}

      <Card className='p-0 overflow-hidden border-white/60'>
        {loading ? (
          <div className='p-10 space-y-3'>
            {[1, 2, 3].map(i => <div key={i} className='h-14 bg-slate-100 rounded-2xl animate-pulse'></div>)}
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-left min-w-[600px]'>
              <thead>
                <tr className='text-[12px] font-bold text-slate-400 uppercase tracking-wider border-b border-white'>
                  <th className='p-5 pl-8 text-slate-400'>{t('recordId')}</th>
                  <th className='p-5 text-slate-400'>{t('description')}</th>
                  <th className='p-5 text-slate-400'>{t('dateLogged')}</th>
                  <th className='p-5 pr-8 text-slate-400'>{t('status')}</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/50'>
                {data.length === 0 ? (
                  <tr><td colSpan={4} className='py-16 text-center text-slate-400 font-bold text-sm uppercase tracking-widest'>{t('noRecords')}</td></tr>
                ) : data.map((row, idx) => (
                  <tr key={row.id || idx} className='hover:bg-white/40 transition-colors group'>
                    <td className='p-5 pl-8 text-[13px] font-bold text-slate-500'>#{String(row.id).slice(0, 8)}</td>
                    <td className='p-5'>
                      <div className='flex items-center'>
                        <div className='bg-orange-100 p-2.5 rounded-xl mr-4 shadow-sm border border-orange-200/50'>
                          <Coffee className='w-5 h-5 text-orange-600' />
                        </div>
                        <span className='text-[15px] font-bold text-slate-800'>{row.title}</span>
                      </div>
                    </td>
                    <td className='p-5 text-[14px] font-semibold text-slate-600'>{row.date}</td>
                    <td className='p-5 pr-8'>
                      <span className='inline-flex items-center px-3 py-1.5 rounded-lg text-[12px] font-bold shadow-sm border bg-white/60 text-slate-700 border-white'>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
