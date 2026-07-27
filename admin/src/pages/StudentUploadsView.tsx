import React, { useState } from 'react';
import { StudentUpload } from '../types';
import { ShieldCheck, Eye, CheckCircle2, XCircle, FileText, AlertCircle } from 'lucide-react';

interface StudentUploadsViewProps {
  uploads: StudentUpload[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}

export const StudentUploadsView: React.FC<StudentUploadsViewProps> = ({
  uploads,
  onApprove,
  onReject
}) => {
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [rejectingUploadId, setRejectingUploadId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingUploadId) return;
    onReject(rejectingUploadId, rejectReason || 'Quality too low / Blurry pages');
    setRejectingUploadId(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Student Notes Moderation Queue</h2>
          <p className="text-xs text-slate-500">Review student handwritten notes before approving for 5,000 app users</p>
        </div>
        <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold rounded-full flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {uploads.filter(u => u.status === 'Pending').length} Pending Submissions
        </span>
      </div>

      <div className="saas-card p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100">
                <th className="pb-3 px-3">Student Info</th>
                <th className="pb-3 px-3">Submitted PDF Title</th>
                <th className="pb-3 px-3">Subject</th>
                <th className="pb-3 px-3">Size</th>
                <th className="pb-3 px-3">Preview PDF</th>
                <th className="pb-3 px-3">Submitted</th>
                <th className="pb-3 px-3 text-right">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {uploads.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 flex items-center gap-3">
                    <img src={u.studentAvatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900 leading-tight">{u.studentName}</h4>
                      <span className="text-[10px] text-slate-400">{u.studentEmail}</span>
                    </div>
                  </td>
                  <td className="px-3 font-bold text-slate-800">{u.title}</td>
                  <td className="px-3 text-slate-600 font-semibold">{u.subjectName}</td>
                  <td className="px-3 font-mono text-slate-500">{u.fileSizeMb} MB</td>
                  <td className="px-3">
                    <button
                      onClick={() => setPreviewPdfUrl(u.pdfUrl || '#')}
                      className="px-2.5 py-1 bg-blue-50 text-[#2563EB] hover:bg-blue-100 text-[11px] font-bold rounded-lg flex items-center gap-1 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview PDF</span>
                    </button>
                  </td>
                  <td className="px-3 text-slate-400">{u.submittedTime}</td>
                  <td className="px-3 text-right">
                    {u.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onApprove(u.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => setRejectingUploadId(u.id)}
                          className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-xs font-bold transition flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {u.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {previewPdfUrl && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="saas-card w-full max-w-3xl h-[80vh] p-6 bg-white flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">In-Browser PDF Viewer Preview</h3>
              <button onClick={() => setPreviewPdfUrl(null)} className="text-xs font-bold text-slate-400 hover:text-slate-700">
                Close Preview ✕
              </button>
            </div>
            <div className="flex-1 my-4 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">
              <FileText className="w-12 h-12 text-[#2563EB] mb-2" />
              <span>Simulated High-Definition PDF Document Canvas</span>
            </div>
            <button
              onClick={() => setPreviewPdfUrl(null)}
              className="w-full py-2.5 bg-[#2563EB] text-white font-bold text-xs rounded-xl"
            >
              Done Reviewing
            </button>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {rejectingUploadId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="saas-card w-full max-w-md p-6 bg-white space-y-4">
            <h3 className="text-base font-extrabold text-rose-600 font-['Outfit']">Reject Student Submission</h3>
            <form onSubmit={handleRejectSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Reason for Rejection</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Quality is low / Blurry text pages / Off-topic file..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-rose-500"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRejectingUploadId(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 shadow-md shadow-rose-500/20"
                >
                  Confirm Reject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
