
import React, { useState, useEffect } from 'react';
import { RoadmapStep } from '../types';

interface RoadmapViewProps {
  roadmap: RoadmapStep[];
  onProgressUpdate: (completed: number, total: number) => void;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmap, onProgressUpdate }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const totalTasks = roadmap.reduce((acc, step) => acc + step.topics.length + step.practice.length + (step.project ? 1 : 0), 0);
  
  useEffect(() => {
    const completed = Object.values(checkedItems).filter(Boolean).length;
    onProgressUpdate(completed, totalTasks);
  }, [checkedItems]);

  const toggleItem = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-16 pb-20 animate-fadeIn">
      {roadmap.map((step, idx) => (
        <div key={idx} className="relative pl-12 sm:pl-24">
          {idx !== roadmap.length - 1 && (
            <div className="absolute left-6 sm:left-12 top-10 bottom-[-64px] w-2 bg-slate-200 rounded-full" />
          )}
          
          <div className="absolute left-0 top-0 w-12 sm:w-24 h-12 sm:h-24 bg-white border-4 border-blue-600 rounded-[32px] flex flex-col items-center justify-center text-blue-600 z-10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform">
            <span className="text-[10px] font-black uppercase tracking-tighter">Month</span>
            <span className="text-4xl font-black">{idx + 1}</span>
          </div>

          <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="mb-12">
              <h3 className="text-4xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-4">{step.title}</h3>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">Phase: {step.focus}</span>
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">Target: {step.skillDepth}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <section>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 shadow-lg shadow-blue-200" /> Core Topics
                </h4>
                <div className="space-y-4">
                  {step.topics.map((t, i) => (
                    <label key={i} className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200 shadow-sm">
                      <input 
                        type="checkbox" 
                        checked={!!checkedItems[`${idx}-topic-${i}`]} 
                        onChange={() => toggleItem(`${idx}-topic-${i}`)}
                        className="mt-1 w-6 h-6 rounded-lg border-2 border-slate-300 text-blue-600 focus:ring-blue-500 transition-all"
                      />
                      <span className={`font-black text-slate-700 leading-snug text-lg ${checkedItems[`${idx}-topic-${i}`] ? 'line-through opacity-40' : ''}`}>{t}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                   <div className="w-5 h-5 rounded-full bg-indigo-500 shadow-lg shadow-indigo-200" /> Practical Skills
                </h4>
                <div className="space-y-4">
                  {step.practice.map((p, i) => (
                    <label key={i} className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200 shadow-sm">
                      <input 
                        type="checkbox" 
                        checked={!!checkedItems[`${idx}-prac-${i}`]} 
                        onChange={() => toggleItem(`${idx}-prac-${i}`)}
                        className="mt-1 w-6 h-6 rounded-lg border-2 border-slate-300 text-blue-600 focus:ring-blue-500 transition-all"
                      />
                      <span className={`font-black text-slate-700 leading-snug text-lg ${checkedItems[`${idx}-prac-${i}`] ? 'line-through opacity-40' : ''}`}>{p}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {step.project && (
              <div className="mt-16 p-10 bg-zinc-900 text-white rounded-[40px] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-full -mr-16 -mt-16"></div>
                <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Milestone Project</h4>
                <div className="flex justify-between items-center gap-6">
                   <div className="text-3xl font-black leading-tight">Build: {step.project}</div>
                   <input 
                     type="checkbox" 
                     checked={!!checkedItems[`${idx}-proj`]} 
                     onChange={() => toggleItem(`${idx}-proj`)}
                     className="w-10 h-10 rounded-xl bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500 transition-all cursor-pointer"
                   />
                </div>
              </div>
            )}

            {step.internshipTip && (
              <div className="mt-10 p-8 bg-blue-50 rounded-[32px] border border-blue-100 flex gap-6 items-center shadow-sm">
                 <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-black italic">!</div>
                 <div>
                    <h5 className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-1">Career Goal</h5>
                    <p className="text-blue-900 text-base font-bold leading-relaxed">{step.internshipTip}</p>
                 </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadmapView;
