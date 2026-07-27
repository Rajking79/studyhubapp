import React, { useState } from 'react';
import { NotificationBroadcast } from '../types';
import { Bell, Send, CheckCircle2 } from 'lucide-react';

interface NotificationsViewProps {
  notifications: NotificationBroadcast[];
  onSendBroadcast: (notif: Omit<NotificationBroadcast, 'id' | 'sentAt' | 'deliveredCount'>) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onSendBroadcast
}) => {
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState<any>('Exams');
  const [formAudience, setFormAudience] = useState<any>('All Users');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return alert('Please enter Notice Title');
    onSendBroadcast({
      title: formTitle,
      description: formDesc || 'Important updates regarding your college courses and datesheets.',
      category: formCategory,
      targetAudience: formAudience
    });
    setFormTitle('');
    setFormDesc('');
    alert('🔔 Push Notification Broadcasted to Mobile Devices!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Notification Manager & Push Broadcaster</h2>
        <p className="text-xs text-slate-500">Send Firebase Push Notifications to ALL students or target by College, Course, and Semester</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Panel */}
        <div className="saas-card p-6 lg:col-span-1 space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#2563EB]" />
            <span>Create Push Broadcast</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Notice Title</label>
              <input
                type="text"
                placeholder="e.g. May 2026 End-Sem Datesheet Out!"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Category</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as any)}
                className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none bg-white"
              >
                <option>Exams</option>
                <option>Notices</option>
                <option>New Uploads</option>
                <option>System</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Target Audience</label>
              <select
                value={formAudience}
                onChange={(e) => setFormAudience(e.target.value as any)}
                className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none bg-white"
              >
                <option>All Users</option>
                <option>Specific College</option>
                <option>Specific Course</option>
                <option>Specific Semester</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Description Message</label>
              <textarea
                rows={3}
                placeholder="Enter notification details for student phone ringing..."
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition"
            >
              <Send className="w-4 h-4" />
              <span>Send Firebase Push Broadcast</span>
            </button>
          </form>
        </div>

        {/* History Panel */}
        <div className="saas-card p-6 lg:col-span-2 space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">Sent Broadcasts History</h3>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold">{n.sentAt}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{n.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] font-bold">
                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Audience: {n.targetAudience}</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Delivered to {n.deliveredCount.toLocaleString()} Phones
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
