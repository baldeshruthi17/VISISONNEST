
import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  variant?: 'primary' | 'light';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, variant = 'primary' }) => {
  return (
    <div className="w-full">
      <div className={`h-3 w-full rounded-full overflow-hidden ${variant === 'primary' ? 'bg-slate-200' : 'bg-white/20'}`}>
        <div 
          className={`h-full transition-all duration-1000 ease-out rounded-full ${
            variant === 'primary' ? 'bg-blue-600' : 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
