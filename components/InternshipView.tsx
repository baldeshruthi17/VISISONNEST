
import React from 'react';
import { Internship } from '../types';

interface InternshipViewProps {
  domain: string;
}

const InternshipView: React.FC<InternshipViewProps> = ({ domain }) => {
  const getDummyInternships = (domain: string): Internship[] => [
    { title: `${domain} Intern`, company: "TechNova Solutions", location: "Bangalore (Remote)", duration: "6 Months", link: "#" },
    { title: `Junior ${domain} Developer`, company: "InnovaStream", location: "Hyderabad", duration: "3 Months", link: "#" },
    { title: `Research Intern - ${domain}`, company: "Global Analytics Corp", location: "Pune", duration: "4 Months", link: "#" },
    { title: `${domain} Summer Trainee`, company: "StartUp Edge", location: "Remote", duration: "2 Months", link: "#" },
  ];

  const internships = getDummyInternships(domain);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-6">
        <div className="text-4xl">💡</div>
        <div>
          <h3 className="text-xl font-bold text-blue-900">Pro Tip for Placements</h3>
          <p className="text-blue-700">Apply for at least 5 internships weekly. Having one solid project in {domain} increases your selection chance by 60%.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {internships.map((job, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-400 text-xl">
                {job.company[0]}
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-800">{job.title}</h3>
                <p className="text-blue-600 font-bold text-sm">{job.company}</p>
                <div className="flex gap-4 mt-2 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1">📍 {job.location}</span>
                  <span className="flex items-center gap-1">⏱️ {job.duration}</span>
                </div>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors whitespace-nowrap shadow-lg shadow-blue-100">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 p-10 border-2 border-dashed border-slate-200 rounded-3xl text-center">
        <h4 className="text-xl font-bold text-slate-800 mb-2">Can't find what you're looking for?</h4>
        <p className="text-slate-500 mb-6">Check top portals with filters pre-applied for {domain}.</p>
        <div className="flex flex-wrap justify-center gap-4">
          {["LinkedIn", "Internshala", "Naukri", "Indeed"].map(site => (
            <button key={site} className="px-6 py-2 bg-white border border-slate-300 rounded-full text-sm font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all">
              Search on {site}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternshipView;
