import React, { useState } from 'react';
import { Subject } from '../types';
import { BookOpen, Plus, Search, Trash2, Edit3 } from 'lucide-react';

interface SubjectsViewProps {
  subjects: Subject[];
  onAddSubject: (subject: Omit<Subject, 'id'>) => void;
  onDeleteSubject: (id: string) => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({
  subjects,
  onAddSubject,
  onDeleteSubject
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formTeacher, setFormTeacher] = useState('');

  const filteredSubjects = subjects.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return alert('Please enter Subject Title');
    onAddSubject({
      code: formCode || 'CS-405',
      name: formName,
      courseName: 'B.Tech CS',
      semester: 4,
      teacherName: formTeacher || 'Dr. A.K. Sharma',
      credits: 4,
      description: 'Core computer science curriculum overview',
      materialsCount: 45,
      status: 'Active'
    });
    setFormName('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Subject Management</h2>
          <p className="text-xs text-slate-500">Manage 480 academic subjects mapped to courses & semesters</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Subject</span>
        </button>
      </div>

      <div className="saas-card p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search subject title or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">
            Showing {filteredSubjects.length} Subjects
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100">
                <th className="pb-3 px-3">Subject Code & Title</th>
                <th className="pb-3 px-3">Course & Semester</th>
                <th className="pb-3 px-3">Instructor / Teacher</th>
                <th className="pb-3 px-3">Credits</th>
                <th className="pb-3 px-3">PDFs Count</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredSubjects.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 leading-tight">{s.name}</h4>
                        <span className="text-[10px] font-bold text-blue-600">Code: {s.code}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 text-slate-600 font-semibold">{s.courseName} (Sem {s.semester})</td>
                  <td className="px-3 text-slate-600">{s.teacherName}</td>
                  <td className="px-3 font-bold text-purple-600">{s.credits} Credits</td>
                  <td className="px-3 font-bold text-emerald-600">{s.materialsCount} PDFs</td>
                  <td className="px-3 text-right">
                    <button
                      onClick={() => onDeleteSubject(s.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Subject */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="saas-card w-full max-w-md p-6 bg-white space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">Add New Subject</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Subject Title</label>
                <input
                  type="text"
                  placeholder="e.g. Computer Networks"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Subject Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CS-403"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Teacher Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. A.K. Sharma"
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
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
