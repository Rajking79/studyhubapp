import React, { useState } from 'react';
import { College } from '../types';
import { Building2, Plus, Search, Star, Edit3, Trash2, CheckCircle2, X } from 'lucide-react';

interface CollegesViewProps {
  colleges: College[];
  onAddCollege: (college: Omit<College, 'id'>) => void;
  onToggleFeatured: (id: string) => void;
  onDeleteCollege: (id: string) => void;
  onEditCollege?: (id: string, updated: Partial<College>) => void;
}

export const CollegesView: React.FC<CollegesViewProps> = ({
  colleges,
  onAddCollege,
  onToggleFeatured,
  onDeleteCollege,
  onEditCollege
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState<College | null>(null);

  // Add Form
  const [formName, setFormName] = useState('');
  const [formUniv, setFormUniv] = useState('Central University');
  const [formCity, setFormCity] = useState('');
  const [formState, setFormState] = useState('');

  // Edit Form
  const [editName, setEditName] = useState('');
  const [editUniv, setEditUniv] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editState, setEditState] = useState('');

  const filteredColleges = colleges.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return alert('Please enter College Name');
    onAddCollege({
      name: formName,
      university: formUniv,
      city: formCity || 'New Delhi',
      state: formState || 'Delhi',
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&q=80',
      coursesCount: 8,
      studentsCount: 120,
      isFeatured: true,
      status: 'Active'
    });
    setFormName('');
    setIsModalOpen(false);
  };

  const handleStartEdit = (col: College) => {
    setEditingCollege(col);
    setEditName(col.name);
    setEditUniv(col.university);
    setEditCity(col.city);
    setEditState(col.state);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollege) return;
    if (onEditCollege) {
      onEditCollege(editingCollege.id, {
        name: editName,
        university: editUniv,
        city: editCity,
        state: editState
      });
    }
    setEditingCollege(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Colleges & Universities Catalog</h2>
          <p className="text-xs text-slate-500">Manage Indian universities and toggle Featured Colleges on Mobile App</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-2 transition hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New College</span>
        </button>
      </div>

      {/* Table & Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        {/* Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search college by name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">
            Showing {filteredColleges.length} Colleges
          </span>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100">
                <th className="pb-3 px-3">College Name & Logo</th>
                <th className="pb-3 px-3">University</th>
                <th className="pb-3 px-3">Location</th>
                <th className="pb-3 px-3">Courses</th>
                <th className="pb-3 px-3">Students</th>
                <th className="pb-3 px-3">Featured on Mobile</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredColleges.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3 flex items-center gap-3">
                    <img
                      src={c.logo}
                      alt={c.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&q=80';
                      }}
                      className="w-9 h-9 rounded-xl object-cover border border-slate-200 bg-slate-100"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 leading-tight">{c.name}</h4>
                      <span className="text-[10px] text-slate-400">ID: {c.id}</span>
                    </div>
                  </td>
                  <td className="px-3 text-slate-600 font-semibold">{c.university}</td>
                  <td className="px-3 text-slate-600">{c.city}, {c.state}</td>
                  <td className="px-3 font-bold text-blue-600">{c.coursesCount} Courses</td>
                  <td className="px-3 font-bold text-emerald-600">{c.studentsCount} Students</td>
                  <td className="px-3">
                    <button
                      onClick={() => onToggleFeatured(c.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1.5 transition ${
                        c.isFeatured
                          ? 'bg-amber-50 text-amber-600 border border-amber-200'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${c.isFeatured ? 'fill-amber-500 text-amber-500' : ''}`} />
                      <span>{c.isFeatured ? 'Featured ON' : 'OFF'}</span>
                    </button>
                  </td>
                  <td className="px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleStartEdit(c)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition"
                        title="Edit College"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteCollege(c.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition"
                        title="Delete College"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add College */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4 animate-in fade-in zoom-in duration-200 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">Add New College</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">College Name</label>
                <input
                  type="text"
                  placeholder="e.g. Indian Institute of Science (IISc)"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">University Category</label>
                <select
                  value={formUniv}
                  onChange={(e) => setFormUniv(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none bg-white font-medium"
                >
                  <option>Central University</option>
                  <option>State University</option>
                  <option>Institute of National Importance</option>
                  <option>Autonomous College</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">State</label>
                  <input
                    type="text"
                    placeholder="e.g. Karnataka"
                    value={formState}
                    onChange={(e) => setFormState(e.target.value)}
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
                  Save College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit College */}
      {editingCollege && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4 animate-in fade-in zoom-in duration-200 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">Edit College Details</h3>
              <button onClick={() => setEditingCollege(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">College Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">University Category</label>
                <input
                  type="text"
                  value={editUniv}
                  onChange={(e) => setEditUniv(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">City</label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">State</label>
                  <input
                    type="text"
                    value={editState}
                    onChange={(e) => setEditState(e.target.value)}
                    className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCollege(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md shadow-blue-500/20"
                >
                  Update College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
