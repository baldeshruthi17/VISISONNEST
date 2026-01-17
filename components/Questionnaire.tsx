
import React, { useState } from 'react';
import { UserAnswers, UserGoal, DomainRecommendation } from '../types';
import { 
  BRANCHES, TIERS, YEARS, TECH_DOMAINS, 
  CSE_INFERENCE_QUESTIONS, NON_CSE_INFERENCE_QUESTIONS,
  HIGHER_STUDIES_INFERENCE_QUESTIONS,
  GOVT_JOBS_INFERENCE_QUESTIONS
} from '../constants';
import { getDomainRecommendation } from '../services/geminiService';

interface QuestionnaireProps {
  onComplete: (answers: UserAnswers) => void;
}

type WizardStep = 'GOAL' | 'CORE_INFO' | 'PATH_DECISION' | 'KNOW_CHECK' | 'DOMAIN_SELECT' | 'INFERENCE' | 'RECOMMEND' | 'FINAL_TIER';

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [wizardStep, setWizardStep] = useState<WizardStep>('GOAL');
  const [answers, setAnswers] = useState<Partial<UserAnswers>>({
    interestProfile: [],
    cgpa: "7.5"
  });
  const [inferenceIndex, setInferenceIndex] = useState(0);
  const [recommendation, setRecommendation] = useState<DomainRecommendation | null>(null);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  const isCse = answers.branch === "CSE/IT";
  const isHigherStudies = answers.mainGoal === UserGoal.HIGHER_STUDIES;
  const isGovtJobs = answers.mainGoal === UserGoal.GOVT_EXAMS;
  
  const currentInferenceQuestions = isHigherStudies 
    ? HIGHER_STUDIES_INFERENCE_QUESTIONS 
    : (isGovtJobs ? GOVT_JOBS_INFERENCE_QUESTIONS : (isCse ? CSE_INFERENCE_QUESTIONS : NON_CSE_INFERENCE_QUESTIONS));

  const handleGoalSelect = (goal: UserGoal) => {
    setAnswers({ ...answers, mainGoal: goal });
    setWizardStep('CORE_INFO');
  };

  const handleCoreInfo = (field: string, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const nextFromCore = () => {
    if (!answers.branch || !answers.year) return;

    // If student explicitly chose 'Higher Studies' or 'Govt Jobs', go to specialized inference
    if (answers.mainGoal === UserGoal.HIGHER_STUDIES || answers.mainGoal === UserGoal.GOVT_EXAMS) {
      setWizardStep('INFERENCE');
      return;
    }

    // If student explicitly chose 'Core Jobs', we skip tech path questions
    if (answers.mainGoal === UserGoal.CORE_JOBS) {
      handlePathDecision('Core');
      return;
    }

    // For CSE/IT, it's always Tech Path
    if (answers.branch === "CSE/IT") {
      handlePathDecision('Tech');
    } else {
      // For ECE/EEE, Civil/Mech, etc - Ask if they are interested in tech
      setWizardStep('PATH_DECISION');
    }
  };

  const handlePathDecision = (choice: 'Tech' | 'Core') => {
    setAnswers(prev => ({ ...prev, pathPreference: choice }));
    if (choice === 'Tech') {
      // If Tech path selected, ask if they know which domain
      setWizardStep('KNOW_CHECK');
    } else {
      // Core path: directly go to final tier, preferredRole set to branch core
      setAnswers(prev => ({ 
        ...prev, 
        preferredRole: `Core Engineering in ${prev.branch}` 
      }));
      setWizardStep('FINAL_TIER');
    }
  };

  const handleInference = (option: string) => {
    const q = currentInferenceQuestions[inferenceIndex];
    const entry = `${q.question}: ${option}`;
    const newProfile = [...(answers.interestProfile || []), entry];
    setAnswers(prev => ({ ...prev, interestProfile: newProfile }));

    if (inferenceIndex < currentInferenceQuestions.length - 1) {
      setInferenceIndex(prev => prev + 1);
    } else {
      fetchRecommendation(newProfile);
    }
  };

  const fetchRecommendation = async (profile: string[]) => {
    setWizardStep('RECOMMEND');
    setIsLoadingRecs(true);
    try {
      const rec = await getDomainRecommendation({
        ...answers,
        interestProfile: profile
      });
      setRecommendation(rec);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingRecs(false);
    }
  };

  const finalizeDomain = (domain: string) => {
    setAnswers(prev => ({ ...prev, preferredRole: domain }));
    setWizardStep('FINAL_TIER');
  };

  const handleFinish = () => {
    if (answers.mainGoal && answers.branch && answers.year && answers.cgpa && answers.tier && answers.preferredRole) {
      onComplete(answers as UserAnswers);
    }
  };

  const renderStep = () => {
    switch (wizardStep) {
      case 'GOAL':
        return (
          <div className="animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 mb-10 leading-tight">What is your main goal?</h2>
            <div className="grid gap-4">
              {[UserGoal.TECH_JOB, UserGoal.HIGHER_STUDIES, UserGoal.GOVT_EXAMS, UserGoal.CORE_JOBS].map(goal => (
                <button
                  key={goal}
                  onClick={() => handleGoalSelect(goal)}
                  className="p-6 bg-white border-2 border-slate-100 rounded-3xl text-left hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-700 text-lg group-hover:text-blue-600 transition-colors">{goal}</span>
                    <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'CORE_INFO':
        return (
          <div className="animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Academic Profile</h2>
            <div className="space-y-10">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">College Branch?</label>
                <div className="grid grid-cols-2 gap-3">
                  {BRANCHES.map(b => (
                    <button
                      key={b}
                      onClick={() => handleCoreInfo('branch', b)}
                      className={`py-4 rounded-2xl border-2 font-bold transition-all ${answers.branch === b ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-200 text-slate-600'}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Current Year?</label>
                <div className="grid grid-cols-2 gap-3">
                  {YEARS.map(y => (
                    <button
                      key={y}
                      onClick={() => handleCoreInfo('year', y)}
                      className={`py-4 rounded-2xl border-2 font-bold transition-all ${answers.year === y ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-200 text-slate-600'}`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Your CGPA: <span className="text-blue-600 text-lg ml-1 font-black">{answers.cgpa}</span></label>
                <input
                  type="range"
                  min="4.0"
                  max="10.0"
                  step="0.1"
                  value={answers.cgpa}
                  onChange={(e) => handleCoreInfo('cgpa', e.target.value)}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <button
                onClick={nextFromCore}
                disabled={!answers.branch || !answers.year}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-[32px] font-black text-xl shadow-xl transition-all"
              >
                Continue →
              </button>
            </div>
          </div>
        );

      case 'PATH_DECISION':
        return (
          <div className="animate-fadeIn text-center py-6">
            <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Are you interested in Tech?</h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handlePathDecision('Tech')}
                className="py-8 bg-white border-2 border-slate-100 rounded-[32px] font-bold text-xl text-slate-700 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm"
              >
                YES, I want a Software Job
              </button>
              <button
                onClick={() => handlePathDecision('Core')}
                className="py-8 bg-slate-900 text-white rounded-[32px] font-bold text-xl hover:bg-slate-800 transition-all shadow-xl"
              >
                NO, I want Core Engineering
              </button>
            </div>
          </div>
        );

      case 'KNOW_CHECK':
        return (
          <div className="animate-fadeIn text-center py-6">
            <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">Do you know which tech domain you want?</h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setWizardStep('DOMAIN_SELECT')}
                className="py-6 bg-white border-2 border-slate-100 rounded-[32px] font-bold text-xl text-slate-700 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm"
              >
                YES, I know
              </button>
              <button
                onClick={() => setWizardStep('INFERENCE')}
                className="py-6 bg-slate-900 text-white rounded-[32px] font-bold text-xl hover:bg-slate-800 transition-all shadow-xl"
              >
                NO, help me decide
              </button>
            </div>
          </div>
        );

      case 'DOMAIN_SELECT':
        return (
          <div className="animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Select tech domain</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TECH_DOMAINS.map(d => (
                <button
                  key={d}
                  onClick={() => finalizeDomain(d)}
                  className="p-6 bg-white border-2 border-slate-100 rounded-[32px] text-left hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-slate-700 shadow-sm"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        );

      case 'INFERENCE':
        const q = currentInferenceQuestions[inferenceIndex];
        const categoryLabel = isHigherStudies ? 'HIGHER STUDIES' : (isGovtJobs ? 'GOVERNMENT JOBS' : (isCse ? 'CSE TRACK' : 'NON-CSE TECH TRACK'));
        return (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Step {inferenceIndex + 1} of {currentInferenceQuestions.length}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{categoryLabel}</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-10 leading-tight">{q.question}</h2>
            <div className="grid gap-4">
              {q.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleInference(opt)}
                  className="p-6 bg-white border-2 border-slate-100 rounded-[32px] text-left hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-slate-700 shadow-sm"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );

      case 'RECOMMEND':
        return (
          <div className="animate-fadeIn text-center">
            {isLoadingRecs ? (
              <div className="py-20 flex flex-col items-center">
                <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-slate-500 font-bold">Analyzing your career path...</p>
              </div>
            ) : recommendation ? (
              <div className="space-y-8">
                <h2 className="text-4xl font-black text-slate-900 mb-6">Your Recommended Path</h2>
                <div className="p-10 bg-white border-2 border-blue-600 rounded-[48px] shadow-2xl shadow-blue-100">
                  <h3 className="text-3xl font-black text-blue-600 mb-4">{recommendation.domain}</h3>
                  <p className="text-slate-600 text-lg font-medium leading-relaxed mb-10">{recommendation.reason}</p>
                  <button
                    onClick={() => finalizeDomain(recommendation.domain)}
                    className="w-full py-5 bg-slate-900 text-white rounded-[32px] font-black text-xl hover:bg-slate-800 transition-all"
                  >
                    Accept Path →
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        );

      case 'FINAL_TIER':
        return (
          <div className="animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">Final Step</h2>
            <p className="text-slate-500 mb-10 text-lg font-medium">Which tier is your college? This helps us unlock specialized resources.</p>
            <div className="grid gap-4">
              {TIERS.map(t => (
                <button
                  key={t}
                  onClick={() => handleCoreInfo('tier', t)}
                  className={`p-6 border-2 rounded-[32px] text-left transition-all font-bold text-lg ${answers.tier === t ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white text-slate-700 shadow-sm'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            {answers.tier && (
              <button
                onClick={handleFinish}
                className="w-full mt-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[32px] font-black text-xl shadow-2xl transition-all"
              >
                Generate Vision Roadmap
              </button>
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-3xl px-6 py-12 mx-auto">
      {wizardStep !== 'GOAL' && (
        <button 
          onClick={() => {
             setWizardStep('GOAL');
             setAnswers({ cgpa: "7.5", interestProfile: [] });
             setInferenceIndex(0);
          }}
          className="mb-8 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-blue-600 flex items-center gap-2 transition-colors"
        >
          <span>←</span> Back to start
        </button>
      )}
      {renderStep()}
    </div>
  );
};

export default Questionnaire;
