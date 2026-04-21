"use client";
import React, { useState, useEffect } from 'react';
import Card from '../../../components/Card';
import { CheckSquare } from 'lucide-react';
import { api } from '../../../lib/api';
import { useLanguage } from '../../../lib/LanguageContext';

export default function Page() {
  const { t } = useLanguage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTeacherSubmissions().then((res) => {
      setData(res || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className='p-6 md:p-8 lg:p-10 w-full animate-in fade-in duration-500'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-[40px] font-bold text-[#14213d] tracking-tight'>{t('hwSubmissions')}</h1>
          <p className='text-slate-500 font-medium mt-1'>{t('manageRecordsDesc')}</p>
        </div>
      </div>

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
                  <th className='p-5 pl-8 text-slate-400'>{t('recordId') || 'Submission ID'}</th>
                  <th className='p-5 text-slate-400'>{t('details') || 'Details'}</th>
                  <th className='p-5 text-slate-400'>{t('dateLogged')}</th>
                  <th className='p-5 pr-8 text-slate-400'>{t('statusGrade')}</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/50'>
                {data.length === 0 ? (
                  <tr><td colSpan={4} className='py-16 text-center text-slate-400 font-bold text-sm uppercase tracking-widest'>{t('noRecords') || 'No submissions yet'}</td></tr>
                ) : data.map((row, idx) => (
                  <tr key={row.id || idx} className='hover:bg-white/40 transition-colors group'>
                    <td className='p-5 pl-8 text-[13px] font-bold text-slate-500'>#{String(row.id).slice(0, 8)}</td>
                    <td className='p-5'>
                      <div className='flex items-center'>
                        <div className='bg-orange-100 p-2.5 rounded-xl mr-4 shadow-sm border border-orange-200/50'>
                          <CheckSquare className='w-5 h-5 text-orange-600' />
                        </div>
                        <div>
                          <span className='text-[15px] font-bold text-slate-800 block'>{row.student || 'Unknown Student'}</span>
                          <span className='text-[12px] text-slate-500 font-medium'>{row.assignment || row.title}</span>
                        </div>
                      </div>
                    </td>
                    <td className='p-5 text-[14px] font-semibold text-slate-600'>{row.date || row.createdAt?.split('T')[0] || '-'}</td>
                    <td className='p-5 pr-8'>
                      <span className='inline-flex items-center px-3 py-1.5 rounded-lg text-[12px] font-bold shadow-sm border bg-white/60 text-slate-700 border-white'>
                        {t(row.grade?.toLowerCase()) || row.grade || row.status || t('ungraded') || 'Ungraded'}
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
