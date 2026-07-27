import React, { useState } from 'react';
import { MessageSquare, CheckCircle2 } from 'lucide-react';

export const FeedbackManagerView: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, student: 'rohitsharma@gmail.com', category: 'Missing PYQ', message: 'Please add more 2024 End Sem Solved Papers for Computer Networks.', rating: 5, status: 'Pending' },
    { id: 2, student: 'priyapatel@gmail.com', category: 'App Bug', message: 'PDF reader page zoom button gets cut off on smaller screens.', rating: 4, status: 'In Progress' }
  ]);

  const handleResolve = (id: number) => {
    setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, status: 'Resolved' } : f));
    alert('✅ Support Feedback Marked as Resolved!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Student Feedback & Support Inbox</h2>
        <p className="text-xs text-slate-500">View student suggestions, missing material requests, and reported app bugs</p>
      </div>

      <div className="saas-card p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100">
                <th className="pb-3 px-3">Student Email</th>
                <th className="pb-3 px-3">Category</th>
                <th className="pb-3 px-3">Message</th>
                <th className="pb-3 px-3">Rating</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {feedbacks.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-bold text-slate-900">{f.student}</td>
                  <td className="px-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-600 rounded">
                      {f.category}
                    </span>
                  </td>
                  <td className="px-3 text-slate-700 max-w-xs truncate">{f.message}</td>
                  <td className="px-3 text-amber-500 font-bold">{"⭐".repeat(f.rating)}</td>
                  <td className="px-3">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      f.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="px-3 text-right">
                    {f.status !== 'Resolved' && (
                      <button
                        onClick={() => handleResolve(f.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
