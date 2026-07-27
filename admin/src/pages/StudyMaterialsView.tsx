import React, { useState } from 'react';
import { Material } from '../types';
import {
  FolderOpen,
  Plus,
  Search,
  Star,
  Pin,
  FileCode,
  UploadCloud,
  CheckCircle2,
  Trash2,
  Building2,
  GraduationCap,
  Calendar,
  Layers,
  Filter,
  Video,
  Play,
  FileText
} from 'lucide-react';

interface StudyMaterialsViewProps {
  materials: Material[];
  onUploadMaterial: (mat: Omit<Material, 'id'>) => void;
  onDeleteMaterial: (id: string) => void;
}

export const StudyMaterialsView: React.FC<StudyMaterialsViewProps> = ({
  materials,
  onUploadMaterial,
  onDeleteMaterial
}) => {
  const [selectedType, setSelectedType] = useState<'All' | 'PDF' | 'Video'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCollege, setSelectedCollege] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedSemester, setSelectedSemester] = useState<string>('All');

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formUploadType, setFormUploadType] = useState<'PDF' | 'Video'>('PDF');
  const [formTitle, setFormTitle] = useState('');
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formTeacher, setFormTeacher] = useState('Dr. A.K. Sharma');
  const [formDuration, setFormDuration] = useState('45 mins');
  const [formCollege, setFormCollege] = useState('Delhi University (DU)');
  const [formCourse, setFormCourse] = useState('B.Tech CS');
  const [formYear, setFormYear] = useState('2nd Year');
  const [formSemester, setFormSemester] = useState<number>(4);
  const [formCategory, setFormCategory] = useState<any>('Previous Papers');
  const [formSubject, setFormSubject] = useState('DBMS');
  const [formExamTag, setFormExamTag] = useState<any>('End Sem');

  const categories = ['All', 'Previous Papers', 'Notes', 'Books', 'Guides', 'Assignments', 'Question Bank', 'Syllabus'];
  const collegesList = ['All', 'Delhi University (DU)', 'Delhi Technological University (DTU)', 'IIT Delhi (IITD)', 'AKTU Lucknow', 'VTU Belagavi', 'SPPU Pune', 'BHU Varanasi', 'JMI New Delhi'];
  const coursesList = ['All', 'B.Tech CS', 'BCA', 'B.Tech IT', 'B.Tech AI & DS', 'MCA'];
  const yearsList = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year'];
  const semestersList = ['All', 'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'];

  const filteredMaterials = materials.filter(m => {
    if (selectedType !== 'All' && m.uploadType !== selectedType) return false;
    if (selectedCategory !== 'All' && m.category !== selectedCategory) return false;
    if (selectedCollege !== 'All' && m.collegeName !== selectedCollege) return false;
    if (selectedCourse !== 'All' && m.courseName !== selectedCourse) return false;
    if (selectedYear !== 'All' && m.academicYear !== selectedYear) return false;
    if (selectedSemester !== 'All' && `Sem ${m.semester}` !== selectedSemester) return false;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return alert('Please enter Title');

    if (formUploadType === 'PDF') {
      onUploadMaterial({
        title: formTitle.endsWith('.pdf') ? formTitle : `${formTitle}.pdf`,
        category: formCategory,
        uploadType: 'PDF',
        subjectName: formSubject,
        collegeName: formCollege,
        courseName: formCourse,
        academicYear: formYear,
        semester: Number(formSemester),
        examTag: formExamTag,
        year: 2026,
        fileSizeMb: 5.4,
        downloadsCount: 1,
        uploadedBy: 'Admin Team',
        uploadedDate: '27 Jul 2026',
        isPinned: true,
        isFeatured: true,
        isPremium: false,
        status: 'Published'
      });
    } else {
      onUploadMaterial({
        title: formTitle,
        category: formCategory,
        uploadType: 'Video',
        subjectName: formSubject,
        collegeName: formCollege,
        courseName: formCourse,
        academicYear: formYear,
        semester: Number(formSemester),
        examTag: formExamTag,
        year: 2026,
        fileSizeMb: 0,
        downloadsCount: 1240,
        uploadedBy: formTeacher || 'Dr. A.K. Sharma',
        uploadedDate: '27 Jul 2026',
        isPinned: true,
        isFeatured: true,
        isPremium: false,
        status: 'Published',
        pdfUrl: formVideoUrl || 'https://youtube.com/watch?v=demo'
      });
    }

    setFormTitle('');
    setFormVideoUrl('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">Study Materials & Video Lectures Manager</h2>
          <p className="text-xs text-slate-500 font-medium">Unified management for PDF notes, PYQs, and Video Lectures mapped to College, Course, Year & Semester</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all hover:-translate-y-0.5"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload PDF or Video</span>
        </button>
      </div>

      {/* Type Switcher Tabs & College / Term Filters */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Filter className="w-4 h-4 text-[#2563EB]" />
            <span>Format & Target Filters</span>
          </div>

          {/* PDF vs Video Type Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedType('All')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                selectedType === 'All' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedType('PDF')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
                selectedType === 'PDF' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF Documents</span>
            </button>
            <button
              onClick={() => setSelectedType('Video')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
                selectedType === 'Video' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-rose-600" />
              <span>Video Lectures</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">College / University</label>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition"
            >
              {collegesList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Course / Branch</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition"
            >
              {coursesList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Academic Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition"
            >
              {yearsList.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition"
            >
              {semestersList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* 6 Cards Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Unified Table Displaying both PDFs and Videos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-200/80">
                <th className="py-4 px-5 min-w-[260px]">Format & Document Title</th>
                <th className="py-4 px-5 min-w-[180px]">College / University</th>
                <th className="py-4 px-5 min-w-[130px]">Course</th>
                <th className="py-4 px-5 min-w-[150px]">Academic Term</th>
                <th className="py-4 px-5 min-w-[130px]">Category</th>
                <th className="py-4 px-5 min-w-[130px]">Subject</th>
                <th className="py-4 px-5 min-w-[100px]">Exam Tag</th>
                <th className="py-4 px-5 min-w-[110px] text-center">Downloads / Views</th>
                <th className="py-4 px-5 min-w-[80px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredMaterials.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-semibold">
                    No study materials match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredMaterials.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Document Format & Title */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        {m.uploadType === 'Video' ? (
                          <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                            <Play className="w-4 h-4 fill-rose-600" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
                            <FileCode className="w-4 h-4" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-slate-900 leading-snug line-clamp-1">{m.title}</h4>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold mt-0.5">
                            {m.uploadType === 'Video' ? (
                              <span className="text-rose-600 font-bold">🎥 Video Lecture (By {m.uploadedBy})</span>
                            ) : (
                              <span>📄 PDF Document • {m.fileSizeMb || 4.8} MB</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* College / University */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                        <span className="font-bold text-slate-800 whitespace-nowrap">{m.collegeName || 'Delhi University (DU)'}</span>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-700 font-bold rounded-lg text-xs whitespace-nowrap">
                        <GraduationCap className="w-3.5 h-3.5" />
                        {m.courseName || 'B.Tech CS'}
                      </span>
                    </td>

                    {/* Academic Term (Year & Sem) */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 font-extrabold rounded-lg text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        {m.academicYear || '2nd Year'} • Sem {m.semester || 4}
                      </span>
                    </td>

                    {/* Card Category */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="px-2.5 py-1 text-xs font-bold bg-blue-50 text-[#2563EB] rounded-lg">
                        {m.category}
                      </span>
                    </td>

                    {/* Subject */}
                    <td className="py-4 px-5 font-bold text-slate-800 whitespace-nowrap">
                      {m.subjectName}
                    </td>

                    {/* Exam Tag */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="px-2 py-1 text-[11px] font-bold bg-slate-100 text-slate-700 rounded-md">
                        {m.examTag}
                      </span>
                    </td>

                    {/* Downloads / Views */}
                    <td className="py-4 px-5 text-center font-extrabold text-slate-900">
                      {m.downloadsCount.toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <button
                        onClick={() => onDeleteMaterial(m.id)}
                        className="p-2 rounded-xl hover:bg-rose-50 text-rose-500 transition-colors"
                        title="Delete Material"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal with PDF vs Video Toggle */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-extrabold text-slate-900 font-['Outfit'] flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#2563EB]" /> Upload Material or Video Lecture
            </h3>
            
            {/* Format Selection Switcher */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setFormUploadType('PDF')}
                className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                  formUploadType === 'PDF' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>📄 PDF Document Upload</span>
              </button>
              <button
                type="button"
                onClick={() => setFormUploadType('Video')}
                className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                  formUploadType === 'Video' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Play className="w-4 h-4 fill-rose-600" />
                <span>🎥 Video Lecture (YouTube)</span>
              </button>
            </div>

            {/* Drag and Drop / URL Input Zone */}
            {formUploadType === 'PDF' ? (
              <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl p-6 text-center space-y-1.5 cursor-pointer hover:bg-blue-50 transition">
                <UploadCloud className="w-8 h-8 text-[#2563EB] mx-auto animate-bounce" />
                <h4 className="text-xs font-bold text-slate-800">Drag & Drop PDF file here or click to browse</h4>
                <p className="text-[10px] text-slate-400">PDF, Notes, PYQs, Reference Books (Max 50MB)</p>
              </div>
            ) : (
              <div className="p-4 border border-rose-200 bg-rose-50/50 rounded-2xl space-y-2">
                <label className="text-xs font-bold text-slate-800 block">YouTube / External Video URL</label>
                <input
                  type="text"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formVideoUrl}
                  onChange={(e) => setFormVideoUrl(e.target.value)}
                  className="w-full p-2.5 bg-white border border-rose-200 rounded-xl text-xs font-medium outline-none focus:border-rose-500"
                />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {formUploadType === 'PDF' ? 'PDF Document Title' : 'Video Lecture Title'}
                </label>
                <input
                  type="text"
                  placeholder={formUploadType === 'PDF' ? 'e.g. DBMS 2024 End Sem Solved PYQ Paper' : 'e.g. DBMS B-Trees Indexing Lecture 14'}
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-[#2563EB]"
                  required
                />
              </div>

              {/* Teacher & Duration if Video */}
              {formUploadType === 'Video' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Teacher / Instructor Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. A.K. Sharma"
                      value={formTeacher}
                      onChange={(e) => setFormTeacher(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 45 mins"
                      value={formDuration}
                      onChange={(e) => setFormDuration(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              )}

              {/* College & Course Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select College / University</label>
                  <select
                    value={formCollege}
                    onChange={(e) => setFormCollege(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs outline-none bg-white font-medium"
                  >
                    {collegesList.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select Course / Branch</label>
                  <select
                    value={formCourse}
                    onChange={(e) => setFormCourse(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs outline-none bg-white font-medium"
                  >
                    {coursesList.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Year & Semester Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select Academic Year</label>
                  <select
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs outline-none bg-white font-medium"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select Semester</label>
                  <select
                    value={formSemester}
                    onChange={(e) => setFormSemester(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs outline-none bg-white font-medium"
                  >
                    <option value={1}>Semester 1</option>
                    <option value={2}>Semester 2</option>
                    <option value={3}>Semester 3</option>
                    <option value={4}>Semester 4</option>
                    <option value={5}>Semester 5</option>
                    <option value={6}>Semester 6</option>
                    <option value={7}>Semester 7</option>
                    <option value={8}>Semester 8</option>
                  </select>
                </div>
              </div>

              {/* Subject, Category & Exam Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subject Name</label>
                  <input
                    type="text"
                    placeholder="e.g. DBMS"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category (6 Cards)</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs outline-none bg-white font-medium"
                  >
                    <option>Previous Papers</option>
                    <option>Notes</option>
                    <option>Books</option>
                    <option>Guides</option>
                    <option>Assignments</option>
                    <option>Question Bank</option>
                    <option>Syllabus</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Exam Tag</label>
                  <select
                    value={formExamTag}
                    onChange={(e) => setFormExamTag(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs outline-none bg-white font-medium"
                  >
                    <option>End Sem</option>
                    <option>Mid Sem</option>
                    <option>Backlog</option>
                    <option>All</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
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
                  Publish {formUploadType === 'PDF' ? 'PDF Document' : 'Video Lecture'} Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
