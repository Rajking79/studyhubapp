import React, { useState } from 'react';
import { Course, College } from '../types';
import { GraduationCap, Plus, Code, Laptop, Cpu, Brain, Server } from 'lucide-react';

interface CoursesViewProps {
  courses: Course[];
  colleges: College[];
  onAddCourse: (course: Omit<Course, 'id'>) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  colleges,
  onAddCourse
}) => {
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formDuration, setFormDuration] = useState(4);

  const filteredCourses = courses.filter(
    c => selectedCollegeId === 'all' || c.collegeId === selectedCollegeId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return alert('Please enter Course Name');

    const collegeObj = colleges.find(cl => cl.id === selectedCollegeId) || colleges[0];

    onAddCourse({
      collegeId: collegeObj.id,
      collegeName: collegeObj.name,
      name: formName,
      code: formCode || 'CS-NEW',
      durationYears: formDuration,
      totalSemesters: formDuration * 2,
      description: 'Undergraduate engineering and technological coursework',
      iconName: 'GraduationCap',
      colorTheme: '#2563EB',
      status: 'Active'
    });

    setFormName('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Course Management</h2>
          <p className="text-xs text-slate-500">Manage degree programs (B.Tech, BCA, MCA, B.Sc) mapped to colleges</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      <div className="saas-card p-6 space-y-4">
        {/* Filter Bar */}
        <div className="flex items-center gap-4">
          <label className="text-xs font-bold text-slate-700">Filter By College:</label>
          <select
            value={selectedCollegeId}
            onChange={(e) => setSelectedCollegeId(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
          >
            <option value="all">All Colleges (120 Courses Total)</option>
            {colleges.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100">
                <th className="pb-3 px-3">Course Name & Code</th>
                <th className="pb-3 px-3">College</th>
                <th className="pb-3 px-3">Duration</th>
                <th className="pb-3 px-3">Total Semesters</th>
                <th className="pb-3 px-3">Color Theme</th>
                <th className="pb-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCourses.map((crs) => (
                <tr key={crs.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: crs.colorTheme }}
                    >
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{crs.name}</h4>
                      <span className="text-[10px] font-bold text-blue-600">Code: {crs.code}</span>
                    </div>
                  </td>
                  <td className="px-3 text-slate-600">{crs.collegeName}</td>
                  <td className="px-3 font-semibold text-slate-700">{crs.durationYears} Years</td>
                  <td className="px-3 font-bold text-purple-600">{crs.totalSemesters} Semesters</td>
                  <td className="px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full inline-block border border-slate-200"
                        style={{ backgroundColor: crs.colorTheme }}
                      ></span>
                      <span className="text-[11px] font-mono text-slate-500">{crs.colorTheme}</span>
                    </div>
                  </td>
                  <td className="px-3">
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full">
                      {crs.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Course */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="saas-card w-full max-w-md p-6 bg-white space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">Add New Course</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Select Target College</label>
                <select
                  value={selectedCollegeId}
                  onChange={(e) => setSelectedCollegeId(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none bg-white"
                >
                  {colleges.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Course Name</label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech Computer Science (CS)"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g. BT-CS"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Duration (Years)</label>
                  <input
                    type="number"
                    value={formDuration}
                    onChange={(e) => setFormDuration(Number(e.target.value))}
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
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
