
import React from 'react';
import { STATIC_MENTORS } from '../constants';

interface MentorViewProps {
  domain: string;
}

const MentorView: React.FC<MentorViewProps> = ({ domain }) => {
  // Filter mentors based on role/domain
  const filteredMentors = STATIC_MENTORS.filter(mentor => {
    const isCore = domain.toLowerCase().includes('core');
    if (isCore) {
      return mentor.name === "Aga Pranathi";
    }
    // Check if mentor's domainMatch array includes current domain or related keywords
    return mentor.domainMatch?.some(dm => 
      domain.toLowerCase().includes(dm.toLowerCase()) || 
      dm.toLowerCase().includes(domain.toLowerCase())
    );
  });

  // Fallback if no specific filter works
  const mentorsToDisplay = filteredMentors.length > 0 ? filteredMentors : STATIC_MENTORS;

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="max-w-3xl mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Meet Your Curated Mentors</h2>
        <p className="text-slate-500 text-lg leading-relaxed">
          We've matched you with professionals who have successfully navigated the path to {domain}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mentorsToDisplay.map((mentor, idx) => (
          <div key={idx} className="group bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 group-hover:bg-blue-100 transition-colors"></div>
             
             <div className="flex items-start gap-6 relative z-10">
                {/* Letter-based icon for mentor profile */}
                <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-lg border-2 border-white uppercase">
                  {mentor.name.charAt(0)}
                </div>
                <div>
                   <h3 className="text-xl font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">{mentor.name}</h3>
                   <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">{mentor.role}</p>
                   <p className="text-blue-600 font-black text-xs uppercase tracking-widest mt-1">@ {mentor.company}</p>
                </div>
             </div>

             <div className="mt-8 relative z-10">
                <div className="flex flex-wrap gap-2 mb-8">
                   {mentor.expertise.map(exp => (
                     <span key={exp} className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-black uppercase rounded-lg">
                       {exp}
                     </span>
                   ))}
                </div>
                
                <a 
                  href={`mailto:${mentor.email}?subject=Mentorship Request&body=Hello ${mentor.name}, I am a student interested in ${domain}...`}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-900 text-slate-900 font-black text-sm rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all transform active:scale-95"
                >
                  Contact via Gmail
                </a>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorView;
