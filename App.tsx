
import React, { useState } from 'react';
import { UserAnswers, CareerPathData } from './types';
import Questionnaire from './components/Questionnaire';
import Dashboard from './components/Dashboard';
import CoursesView from './components/CoursesView';
import FeedbackView from './components/FeedbackView';
import LoginView from './components/LoginView';
import LogoutView from './components/LogoutView';
import SignupView from './components/SignupView';
import { generateCareerGuidance } from './services/geminiService';
import { TECH_DOMAINS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'questionnaire' | 'loading' | 'dashboard' | 'all-courses' | 'all-resources' | 'about' | 'feedback' | 'login' | 'logout-success' | 'signup'>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [answers, setAnswers] = useState<UserAnswers | null>(null);
  const [careerData, setCareerData] = useState<CareerPathData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startAssessment = () => {
    if (!isLoggedIn) {
      setView('login');
    } else {
      setView('questionnaire');
    }
  };

  const handleCompleteQuestionnaire = async (finalAnswers: UserAnswers) => {
    setAnswers(finalAnswers);
    setView('loading');
    try {
      const data = await generateCareerGuidance(finalAnswers);
      setCareerData(data);
      setView('dashboard');
    } catch (err) {
      console.error(err);
      setError("Failed to generate career path. Please try again.");
      setView('questionnaire');
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setView('landing');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAnswers(null);
    setCareerData(null);
    setView('logout-success');
  };

  const reset = () => {
    setAnswers(null);
    setCareerData(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-16 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={reset}>
          <span className="text-2xl font-extrabold tracking-tight text-slate-800">Vision<span className="text-blue-600">Nest</span></span>
        </div>
        <div className="hidden md:flex gap-10 items-center">
          <button onClick={reset} className={`text-sm font-semibold transition-colors ${view === 'landing' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-500 hover:text-slate-800'}`}>Home</button>
          <button onClick={() => setView('about')} className={`text-sm font-semibold transition-colors ${view === 'about' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-500 hover:text-slate-800'}`}>About</button>
          <button onClick={() => setView('questionnaire')} className={`text-sm font-semibold transition-colors ${view === 'questionnaire' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-500 hover:text-slate-800'}`}>Roadmap</button>
          <button onClick={() => setView('all-courses')} className={`text-sm font-semibold transition-colors ${view === 'all-courses' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-500 hover:text-slate-800'}`}>Courses</button>
          <button onClick={() => setView('feedback')} className={`text-sm font-semibold transition-colors ${view === 'feedback' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-500 hover:text-slate-800'}`}>Feedback</button>
          <button className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">Contact</button>
        </div>
        
        {isLoggedIn ? (
          <button 
            onClick={handleLogout}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-10 py-2.5 rounded-full text-sm font-bold transition-all"
          >
            Logout
          </button>
        ) : (
          <button 
            onClick={() => setView('login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-md transition-all"
          >
            Login
          </button>
        )}
      </nav>

      <main className="flex-1 flex flex-col items-center w-full overflow-x-hidden">
        {view === 'landing' && <Landing onStart={startAssessment} setView={setView} />}
        {view === 'login' && <LoginView onLoginSuccess={handleLoginSuccess} onGoToSignup={() => setView('signup')} />}
        {view === 'signup' && <SignupView onSignupSuccess={handleLoginSuccess} onGoToLogin={() => setView('login')} />}
        {view === 'logout-success' && <LogoutView onGoHome={() => setView('landing')} onLoginAgain={() => setView('login')} />}
        {view === 'about' && <AboutView />}
        {view === 'questionnaire' && <Questionnaire onComplete={handleCompleteQuestionnaire} />}
        {view === 'loading' && <LoadingScreen />}
        {view === 'dashboard' && careerData && answers && (
          <Dashboard careerData={careerData} answers={answers} onReset={reset} />
        )}
        {view === 'all-courses' && <GlobalExplorer type="courses" />}
        {view === 'all-resources' && <GlobalExplorer type="resources" />}
        {view === 'feedback' && <div className="py-20 w-full"><FeedbackView /></div>}
      </main>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
          {error}
          <button className="ml-4 font-bold" onClick={() => setError(null)}>&times;</button>
        </div>
      )}
    </div>
  );
};

const Landing: React.FC<{ onStart: () => void, setView: (v: any) => void }> = ({ onStart, setView }) => (
  <div className="w-full animate-fadeIn">
    {/* Full width expansive hero */}
    <div className="w-full px-4 md:px-10 py-6 md:py-10">
      <div className="flex flex-col lg:flex-row items-stretch bg-[#111111] rounded-[40px] overflow-hidden shadow-2xl min-h-[600px]">
        <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-0 bg-zinc-800">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1400" 
            alt="Engineering Workspace" 
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-all duration-700"
            onError={(e) => {
               (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f?auto=format&fit=crop&q=80&w=1400";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>
        
        <div className="lg:w-1/2 p-12 md:p-24 flex flex-col justify-center text-white">
          <div className="inline-block mb-10">
            <span className="px-6 py-2.5 border border-blue-500/40 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-500/5">
              AI-Driven Roadmaps for B.Tech Students
            </span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white">
            Discover Your Career Potential with VisionNest
          </h1>
          
          <p className="text-xl text-zinc-400 mb-12 max-w-xl leading-relaxed font-medium">
            Get a clear, realistic roadmap. VisionNest aligns your branch, skills, and goals with the right domains, projects, and placements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={onStart}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20"
            >
              Get My Roadmap →
            </button>
            <button 
              className="px-10 py-5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-full font-bold text-lg border border-blue-500/20 transition-all"
            >
              Ask a Mentor
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Secondary Actions Section */}
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
      <div onClick={() => setView('all-courses')} className="p-12 bg-white border border-slate-100 rounded-[48px] shadow-sm hover:shadow-2xl transition-all cursor-pointer group border-b-4 hover:border-b-blue-600">
        <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Courses</h3>
        <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">Access curated learning paths for every major engineering domain.</p>
        <div className="flex items-center gap-3 text-blue-600 font-bold uppercase tracking-widest text-sm">
          Browse Library <span className="group-hover:translate-x-2 transition-transform">→</span>
        </div>
      </div>
      <div onClick={() => setView('all-resources')} className="p-12 bg-white border border-slate-100 rounded-[48px] shadow-sm hover:shadow-2xl transition-all cursor-pointer group border-b-4 hover:border-b-blue-600">
        <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Free Resources</h3>
        <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">Download cheat sheets, templates, and essential documentation.</p>
        <div className="flex items-center gap-3 text-blue-600 font-bold uppercase tracking-widest text-sm">
          Access Now <span className="group-hover:translate-x-2 transition-transform">→</span>
        </div>
      </div>
    </div>
  </div>
);

const AboutView: React.FC = () => (
  <div className="max-w-4xl mx-auto px-6 py-24 text-center animate-fadeIn">
    <h2 className="text-5xl font-black text-slate-900 mb-10 tracking-tight">Empowering Engineers Through Intelligence</h2>
    <p className="text-xl text-slate-500 leading-relaxed mb-16 font-medium">
      VisionNest was built to solve a critical problem: the gap between academic theory and industry reality. 
      Our platform uses advanced AI to analyze your current standing and provide a precision-engineered path 
      to your professional goals.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100">
        <h4 className="text-xl font-black text-slate-900 mb-4">Our Mission</h4>
        <p className="text-slate-500 leading-relaxed">To democratize expert career guidance for every engineering student, regardless of their college tier or background.</p>
      </div>
      <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100">
        <h4 className="text-xl font-black text-slate-900 mb-4">Our Technology</h4>
        <p className="text-slate-500 leading-relaxed">Leveraging state-of-the-art Generative AI to provide context-aware, hyper-personalized career roadmaps in under 5 seconds.</p>
      </div>
    </div>
  </div>
);

const GlobalExplorer: React.FC<{ type: 'courses' | 'resources' }> = ({ type }) => {
  const [selectedDomain, setSelectedDomain] = useState(TECH_DOMAINS[0]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16 animate-fadeIn">
      <div className="mb-16 text-center">
        <h2 className="text-5xl font-black text-slate-900 mb-6 capitalize tracking-tight">Explore {type === 'courses' ? 'Courses' : 'Resources'}</h2>
        <p className="text-slate-500 text-xl font-medium">Browse high-quality learning materials for every engineering domain.</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-16">
        {TECH_DOMAINS.map(d => (
          <button
            key={d}
            onClick={() => setSelectedDomain(d)}
            className={`px-8 py-3.5 rounded-full text-sm font-black transition-all uppercase tracking-widest ${
              selectedDomain === d ? 'bg-blue-600 text-white shadow-xl scale-105' : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-300'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">
        {type === 'courses' ? <CoursesView domain={selectedDomain} /> : <ResourcesList domain={selectedDomain} />}
      </div>
    </div>
  );
};

const ResourcesList: React.FC<{ domain: string }> = ({ domain }) => {
  const dummyResources = [
    { title: `${domain} Documentation`, link: "#", type: "Docs", desc: "Official language and framework guides." },
    { title: `Top ${domain} Cheat Sheet`, link: "#", type: "PDF", desc: "Essential syntax and common patterns summarized." },
    { title: "Industry Whitepaper", link: "#", type: "Reading", desc: "How top companies use this technology today." },
    { title: "GitHub Awesome List", link: "#", type: "Link", desc: "Community-curated list of libraries and tools." },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeIn">
      {dummyResources.map((res, i) => (
        <div key={i} className="p-10 bg-white border border-slate-200 rounded-[40px] hover:shadow-2xl transition-all group flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all tracking-tighter text-xl">
              {res.type[0]}
            </div>
            <h4 className="text-xl font-black text-slate-900 mb-3 leading-tight">{res.title}</h4>
            <p className="text-slate-500 font-medium mb-10">{res.desc}</p>
          </div>
          <a href={res.link} className="text-blue-600 font-black text-sm uppercase tracking-widest hover:underline flex items-center gap-2">
            Download <span className="text-lg">↗</span>
          </a>
        </div>
      ))}
    </div>
  );
};

const LoadingScreen: React.FC = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center min-h-[60vh]">
    <div className="w-24 h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-12"></div>
    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Generating your roadmap</h2>
  </div>
);

export default App;
