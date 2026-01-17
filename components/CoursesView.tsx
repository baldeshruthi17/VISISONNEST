
import React from 'react';
import { Course } from '../types';

interface CoursesViewProps {
  domain: string;
}

const CoursesView: React.FC<CoursesViewProps> = ({ domain }) => {
  const getDummyCourses = (domain: string): Course[] => {
    return [
      {
        title: `Full ${domain} Masterclass`,
        platform: 'Udemy',
        level: 'Beginner',
        link: 'https://udemy.com',
        description: 'Comprehensive guide covering everything from zero to advanced concepts.'
      },
      {
        title: `${domain} Foundations`,
        platform: 'Coursera',
        level: 'Intermediate',
        link: 'https://coursera.org',
        description: 'Academic rigor combined with practical projects for industry readiness.'
      },
      {
        title: `Free ${domain} Bootcamp 2024`,
        platform: 'YouTube',
        level: 'Beginner',
        link: 'https://youtube.com',
        description: 'Complete hands-on curriculum available for free with community support.'
      },
      {
        title: `Advanced ${domain} System Design`,
        platform: 'Educative',
        level: 'Advanced',
        link: 'https://educative.io',
        description: 'Focus on scalability, reliability and production-grade architecture.'
      }
    ];
  };

  const courses = getDummyCourses(domain);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
      {courses.map((course, idx) => (
        <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
               <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-lg">{course.platform}</span>
               <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                 course.level === 'Beginner' ? 'bg-green-100 text-green-700' : 
                 course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
               }`}>
                 {course.level}
               </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 mb-4 leading-tight">{course.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">{course.description}</p>
          </div>
          <a 
            href={course.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-3 bg-blue-600 text-white text-center font-bold rounded-2xl hover:bg-blue-700 transition-colors"
          >
            View Course
          </a>
        </div>
      ))}
    </div>
  );
};

export default CoursesView;
