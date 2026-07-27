import React, { useState } from 'react';
import { VideoMaterial } from '../types';
import { Video, Plus, Play, Eye, Star, Trash2 } from 'lucide-react';

interface VideoManagerViewProps {
  videos: VideoMaterial[];
  onAddVideo: (vid: Omit<VideoMaterial, 'id'>) => void;
  onDeleteVideo: (id: string) => void;
}

export const VideoManagerView: React.FC<VideoManagerViewProps> = ({
  videos,
  onAddVideo,
  onDeleteVideo
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formTeacher, setFormTeacher] = useState('Dr. A.K. Sharma');
  const [formSubject, setFormSubject] = useState('DBMS');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return alert('Please enter Video Title');
    onAddVideo({
      title: formTitle,
      youtubeUrl: formUrl || 'https://youtube.com/watch?v=demo',
      duration: '45 mins',
      teacherName: formTeacher,
      subjectName: formSubject,
      semester: 4,
      examTag: 'End Sem',
      viewsCount: 1,
      isFeatured: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80'
    });
    setFormTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Video Lecture Manager</h2>
          <p className="text-xs text-slate-500">Upload YouTube and external video lectures mapped to Subject 6 Cards</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Video</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v) => (
          <div key={v.id} className="saas-card overflow-hidden group">
            <div className="relative h-40 overflow-hidden">
              <img src={v.thumbnailUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                <Play className="w-3 h-3 fill-white" /> Video Lecture
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white px-2 py-0.5 rounded text-[10px] font-bold backdrop-blur-xs">
                {v.duration}
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">{v.title}</h3>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>By {v.teacherName}</span>
                <span className="font-bold text-blue-600">{v.subjectName}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span className="flex items-center gap-1 text-emerald-600 font-bold"><Eye className="w-3 h-3" /> {v.viewsCount.toLocaleString()} Views</span>
                <button onClick={() => onDeleteVideo(v.id)} className="text-rose-500 hover:underline">Delete Video</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Upload Video */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="saas-card w-full max-w-md p-6 bg-white space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">Upload Video Lecture</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Video Title</label>
                <input
                  type="text"
                  placeholder="e.g. DBMS B-Trees Indexing Lecture 14"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">YouTube Video URL</label>
                <input
                  type="text"
                  placeholder="e.g. https://youtube.com/watch?v=..."
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Subject</label>
                  <input
                    type="text"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Teacher</label>
                  <input
                    type="text"
                    value={formTeacher}
                    onChange={(e) => setFormTeacher(e.target.value)}
                    className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md shadow-blue-500/20"
                >
                  Publish Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
