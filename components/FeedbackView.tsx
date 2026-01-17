
import React, { useState } from 'react';

const FeedbackView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center animate-fadeIn">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-8">✓</div>
        <h2 className="text-4xl font-black text-slate-900 mb-4">Thank you for your feedback!</h2>
        <p className="text-slate-500 text-lg font-medium">Your insights help us refine our AI architects to serve engineering students better.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Your Feedback</h2>
      <p className="text-slate-500 text-lg font-medium mb-12">How helpful was this AI-generated roadmap for your career goals?</p>
      
      <form onSubmit={handleSubmit} className="space-y-10">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Rating</label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                  rating >= star ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
              >
                {star}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Any specific improvements or comments?</label>
          <textarea
            required
            className="w-full h-48 bg-slate-50 border border-slate-200 rounded-[32px] p-8 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
            placeholder="Tell us what you liked or what was missing..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-6 bg-slate-900 text-white rounded-full font-black text-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackView;
