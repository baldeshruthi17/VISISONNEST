
import React from 'react';

interface LogoutViewProps {
  onGoHome: () => void;
  onLoginAgain: () => void;
}

const LogoutView: React.FC<LogoutViewProps> = ({ onGoHome, onLoginAgain }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-white min-h-[70vh] animate-fadeIn">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[32px] flex items-center justify-center text-4xl mx-auto mb-10 shadow-inner">
          👋
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Logged Out Successfully</h2>
        <p className="text-slate-500 text-lg font-medium mb-12 leading-relaxed">
          Thank you for using VisionNest. Your session has been closed safely. We hope to see you back soon!
        </p>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={onLoginAgain}
            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] font-black text-lg shadow-xl shadow-blue-500/20 transition-all transform active:scale-95"
          >
            Log In Again
          </button>
          <button
            onClick={onGoHome}
            className="w-full py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-[24px] font-black text-lg transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutView;
