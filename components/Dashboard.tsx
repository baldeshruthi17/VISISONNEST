
import React, { useState } from 'react';
import { CareerPathData, UserAnswers } from '../types';
import RoadmapView from './RoadmapView';
import MentorView from './MentorView';
import CoursesView from './CoursesView';
import ProgressBar from './ProgressBar';

interface DashboardProps {
  careerData: CareerPathData;
  answers: UserAnswers;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ careerData, answers, onReset }) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'courses' | 'resources' | 'mentors' | 'trends'>('roadmap');
  const [progress, setProgress] = useState(0);

  const handleProgressUpdate = (completedCount: number, totalCount: number) => {
    const newProgress = Math.round((completedCount / totalCount) * 100);
    setProgress(newProgress);
  };

  return (
    <div className="w-full max-w-full px-4 md:px-10 py-6 animate-fadeIn">
      {/* Hero Header - Updated to be full-width text only to satisfy "no image in roadmap page" */}
      <div className="bg-slate-900 rounded-[48px] overflow-hidden shadow-2xl min-h-[400px] mb-12 border border-slate-800 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
        
        <div className="p-12 md:p-20 flex flex-col justify-center relative z-10 text-white max-w-5xl">
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-5 py-2 border border-slate-700 bg-slate-800/50 rounded-full text-[11px] font-black uppercase tracking-widest text-slate-400">
              Branch: {answers.branch}
            </span>
            <span className="px-5 py-2 bg-blue-600 text-white rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">
              Tier {answers.tier.split(' ')[1]}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white">
            Target Domain: <span>{careerData.suggestedDomain}</span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-10 leading-relaxed font-medium italic border-l-4 border-blue-500 pl-8 max-w-3xl">
            "{careerData.explanation}"
          </p>

          <div className="bg-slate-800/40 backdrop-blur-md p-8 rounded-[36px] border border-slate-700/50 shadow-inner max-w-xl">
             <div className="flex justify-between items-end mb-6">
                <div>
                   <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Learning Momentum</h3>
                   <span className="text-slate-400 text-sm font-bold">Preparation Progress</span>
                </div>
                <span className="text-5xl font-black text-blue-500 tracking-tighter">{progress}%</span>
             </div>
             <ProgressBar progress={progress} variant="light" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap gap-2 p-2 bg-slate-100/90 backdrop-blur rounded-[36px] w-fit shadow-md mx-auto">
          {[
            { id: 'roadmap', label: 'Roadmap' },
            { id: 'courses', label: 'Courses' },
            { id: 'resources', label: 'Resources' },
            { id: 'trends', label: 'Market Demand' },
            { id: 'mentors', label: 'Mentors' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-4.5 rounded-[28px] font-black flex items-center gap-2 transition-all text-[11px] uppercase tracking-widest ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-xl scale-105' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto min-h-[600px] pb-32">
        {activeTab === 'roadmap' && (
          <RoadmapView 
            roadmap={careerData.roadmap} 
            onProgressUpdate={handleProgressUpdate}
          />
        )}
        {activeTab === 'courses' && <CoursesView domain={careerData.suggestedDomain} />}
        {activeTab === 'resources' && <ResourcesSection roadmap={careerData.roadmap} />}
        {activeTab === 'trends' && <TrendsView trends={careerData.marketTrends} domain={careerData.suggestedDomain} />}
        {activeTab === 'mentors' && <MentorView domain={careerData.suggestedDomain} />}
      </div>
    </div>
  );
};

const ResourcesSection: React.FC<{ roadmap: any[] }> = ({ roadmap }) => {
  const allResources = roadmap.flatMap(step => step.resources);
  return (
    <div className="animate-fadeIn">
      <h2 className="text-4xl font-black text-slate-900 mb-12 tracking-tight">Reading & Practice Materials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allResources.map((res, i) => (
          <a 
            key={i}
            href={res.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-10 rounded-[44px] border transition-all hover:shadow-2xl group flex flex-col justify-between h-full ${
              res.tierSpecial ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/10 scale-105' : 'bg-white border-slate-100 text-slate-800'
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-8">
                <span className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-full ${res.tierSpecial ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                  {res.type}
                </span>
                {res.tierSpecial && <span className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase">Tier Equalizer</span>}
              </div>
              <h4 className="text-2xl font-black mb-6 group-hover:underline leading-tight">{res.title}</h4>
            </div>
            <div className="mt-8 flex items-center justify-between font-black text-xs uppercase tracking-widest border-t border-current pt-6 opacity-80 group-hover:opacity-100">
               <span>Access Repository</span>
               <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const TrendsView: React.FC<{ trends: any[]; domain: string }> = ({ trends, domain }) => (
  <div className="space-y-16 animate-fadeIn">
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Market Demand: {domain}</h2>
      <p className="text-slate-500 text-xl font-medium leading-relaxed">Intelligence on current shifts in hiring patterns and technological advancements.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {trends.map((t, i) => (
        <div key={i} className="p-12 bg-white rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
          <div className="flex justify-between items-start mb-10">
            <span className={`px-5 py-2 text-[10px] font-black uppercase rounded-full ${
              t.demandLevel === 'High' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
            }`}>
              {t.demandLevel} Demand
            </span>
            <div className="text-4xl font-black text-blue-600 leading-none group-hover:scale-125 transition-transform">↗</div>
          </div>
          <h4 className="text-2xl font-black text-slate-800 mb-6 leading-tight group-hover:text-blue-600 transition-colors">{t.trend}</h4>
          <p className="text-slate-500 text-lg leading-relaxed font-medium">{t.impact}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Dashboard;
