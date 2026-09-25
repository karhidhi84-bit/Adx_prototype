import React, { useState } from 'react';
import {
  GraduationCap,
  FileText,
  Upload,
  Download,
  Plus,
  CheckCircle2,
  Clock,
  User,
  Mail,
  Search,
  Check,
  Eye,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AcademicSubject, LectureNote, Assignment } from '../types';

export const AcademicView: React.FC<{
  onOpenUploadNote: (subjectId: string) => void;
  onOpenCreateAssignment: (subjectId: string) => void;
  onOpenSubmitAssignment: (assignmentId: string) => void;
}> = ({ onOpenUploadNote, onOpenCreateAssignment, onOpenSubmitAssignment }) => {
  const {
    subjects,
    selectedSubjectId,
    setSelectedSubjectId,
    lectureNotes,
    downloadNote,
    assignments,
    toggleAssignmentComplete,
    userRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<'notes' | 'assignments'>('notes');
  const [assignmentFilter, setAssignmentFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [scopeFilter, setScopeFilter] = useState<'course' | 'all'>('course');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNoteForPreview, setSelectedNoteForPreview] = useState<LectureNote | null>(null);

  const currentSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  // Notes for this subject
  const subjectNotes = lectureNotes
    .filter(n => n.subjectId === currentSubject.id)
    .filter(n => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        n.title.toLowerCase().includes(q) ||
        n.unit.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q)
      );
    });

  // Base assignments pool based on scope (current course or all courses)
  const baseAssignments = scopeFilter === 'course'
    ? assignments.filter(a => a.subjectId === currentSubject.id)
    : assignments;

  const allSubjectAssignments = [...baseAssignments].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const pendingSubjectAssignments = allSubjectAssignments.filter(
    a => a.status === 'pending'
  );

  const completedSubjectAssignments = allSubjectAssignments.filter(
    a => a.status === 'completed' || a.status === 'submitted' || a.status === 'graded'
  );

  const subjectAssignments = allSubjectAssignments
    .filter(a => {
      const isDone = a.status === 'completed' || a.status === 'submitted' || a.status === 'graded';
      if (assignmentFilter === 'pending') return !isDone;
      if (assignmentFilter === 'completed') return isDone;
      return true;
    })
    .filter(a => {
      if (categoryFilter === 'all') return true;
      return a.category.toLowerCase() === categoryFilter.toLowerCase();
    })
    .filter(a => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.subjectName.toLowerCase().includes(q)
      );
    });

  const getSubjectBorderColor = (color: string) => {
    switch (color) {
      case 'indigo':
        return 'border-l-blue-900 dark:border-l-blue-500';
      case 'emerald':
        return 'border-l-emerald-800 dark:border-l-emerald-500';
      case 'violet':
        return 'border-l-purple-900 dark:border-l-purple-500';
      case 'cyan':
        return 'border-l-teal-800 dark:border-l-teal-500';
      default:
        return 'border-l-amber-700 dark:border-l-amber-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Subject Navigation Header */}
      <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 font-display">
              <span className="bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 px-2 py-0.5 rounded font-mono">
                Academic Vault
              </span>
              <span aria-hidden="true">·</span>
              <span>Curriculum, Lecture Notes & Syllabi</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900 dark:text-white mt-1 font-display">
              Course Material & Deliverables 
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              Access lecture slides, review reading lists, track graded deliverables, and check syllabus rubrics
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onOpenUploadNote(currentSubject.id)}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#172554] hover:bg-[#1E3A8A] text-amber-300 transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap border border-amber-600/40 font-display"
            >
              <Upload className="w-4 h-4 text-amber-400" />
              Upload Lecture Notes
            </button>
          </div>
        </div>

        {/* Course Tabs Carousel with Solid Indicator Borders */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 overflow-x-auto pb-1">
          {subjects.map(subject => {
            const isSelected = selectedSubjectId === subject.id;
            const borderCol = getSubjectBorderColor(subject.color);
            const asgCount = assignments.filter(
              a => a.subjectId === subject.id && a.status === 'pending'
            ).length;

            return (
              <button
                key={subject.id}
                onClick={() => setSelectedSubjectId(subject.id)}
                className={`px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all text-left shrink-0 border border-stone-200 dark:border-stone-800 border-l-4 ${borderCol} font-display ${
                  isSelected
                    ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] shadow-xs'
                    : 'bg-white dark:bg-[#111A30] text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold">{subject.code}</span>
                  {asgCount > 0 && (
                    <span className="text-xs px-1.5 py-0.2 rounded bg-amber-200 text-amber-950 font-bold font-mono">
                      {asgCount}
                    </span>
                  )}
                </div>
                <div className="text-xs opacity-90 truncate max-w-[155px] font-normal mt-0.5">
                  {subject.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Subject Banner in Classic Ivy Format */}
      <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-2xs border-l-4 border-l-amber-600">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 px-2 py-0.5 rounded">
                {currentSubject.code}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-stone-900 dark:text-white font-display">
                {currentSubject.name}
              </h2>
            </div>
            <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed max-w-3xl">
              {currentSubject.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs md:text-sm text-stone-600 dark:text-stone-400 border-t md:border-t-0 md:border-l border-stone-100 dark:border-stone-800 pt-3 md:pt-0 md:pl-5 shrink-0">
            <div>
              <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5 font-display">
                <User className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                {currentSubject.professor}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5 font-mono">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                {currentSubject.professorEmail}
              </div>
              <div className="text-xs text-stone-500 mt-1">
                Office Hours: <span className="font-medium text-stone-700 dark:text-stone-300">{currentSubject.officeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Mode Tabs: Lecture Notes vs Assignments */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex-wrap gap-3">
          <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm font-semibold">
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-display ${
                activeTab === 'notes'
                  ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Lecture Notes & Slides ({subjectNotes.length})
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-display ${
                activeTab === 'assignments'
                  ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Assignments & Homework ({subjectAssignments.length})
            </button>
          </div>

          {/* Search Field */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'notes' ? 'lecture notes' : 'assignments'}...`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-3.5 py-1.5 text-xs md:text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500 w-56 md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Content Area: Lecture Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          {subjectNotes.length === 0 ? (
            <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-12 text-center shadow-2xs">
              <FileText className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 font-display">
                No lecture notes found
              </h3>
              <p className="text-xs md:text-sm text-stone-500 mt-1 max-w-sm mx-auto">
                No materials have been uploaded for this unit yet. Faculty can upload PDF slides or study notes directly.
              </p>
              <button
                onClick={() => onOpenUploadNote(currentSubject.id)}
                className="mt-4 px-4 py-2 text-xs md:text-sm font-bold rounded-lg bg-[#172554] text-amber-300 hover:bg-[#1E3A8A] transition-colors font-display border border-amber-600/40"
              >
                Upload First Note
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjectNotes.map(note => (
                <div
                  key={note.id}
                  className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 border-l-4 border-l-amber-700 rounded-xl p-5 hover:border-amber-500 transition-all flex flex-col justify-between shadow-2xs group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-400">
                        {note.unit}
                      </span>
                      <span className="text-xs font-mono uppercase font-bold text-stone-500 dark:text-stone-400">
                        {note.fileType}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 dark:text-white mt-2 leading-snug group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors font-display">
                      {note.title}
                    </h3>

                    <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 mt-1.5 line-clamp-3 leading-relaxed">
                      {note.summary}
                    </p>

                    {/* Key Topics - Clean Unboxed Text with Separators */}
                    {note.keyTopics && note.keyTopics.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs text-stone-500 dark:text-stone-400">
                        {note.keyTopics.map((topic, i) => (
                          <React.Fragment key={topic}>
                            {i > 0 && <span aria-hidden="true">·</span>}
                            <span>{topic}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <div className="text-xs text-stone-500 font-mono">
                      <span>{note.fileSize}</span>
                      <span className="mx-1.5">·</span>
                      <span>{note.downloadCount} dl</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedNoteForPreview(note)}
                        className="p-1.5 text-stone-500 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors"
                        title="Quick Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => downloadNote(note.id)}
                        className="px-2.5 py-1 text-xs font-bold rounded bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 hover:bg-amber-100 flex items-center gap-1.5 transition-colors font-display"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content Area: Assignments & Homework */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          {/* Assignment Control Sub-bar */}
          <div className="bg-stone-50 dark:bg-stone-800/60 p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Scope & Status Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex p-0.5 bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-700 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setScopeFilter('course')}
                  className={`px-3 py-1 rounded transition-colors font-display ${
                    scopeFilter === 'course'
                      ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-2xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  {currentSubject.code} Only
                </button>
                <button
                  onClick={() => setScopeFilter('all')}
                  className={`px-3 py-1 rounded transition-colors font-display ${
                    scopeFilter === 'all'
                      ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-2xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  All Courses ({assignments.length})
                </button>
              </div>

              {/* Status pills */}
              <div className="inline-flex p-0.5 bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-700 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setAssignmentFilter('all')}
                  className={`px-2.5 py-1 rounded transition-colors font-display ${
                    assignmentFilter === 'all'
                      ? 'bg-stone-700 text-white font-bold'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setAssignmentFilter('pending')}
                  className={`px-2.5 py-1 rounded transition-colors font-display ${
                    assignmentFilter === 'pending'
                      ? 'bg-amber-700 text-white font-bold'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  Pending ({pendingSubjectAssignments.length})
                </button>
                <button
                  onClick={() => setAssignmentFilter('completed')}
                  className={`px-2.5 py-1 rounded transition-colors font-display ${
                    assignmentFilter === 'completed'
                      ? 'bg-emerald-800 text-white font-bold'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  Done ({completedSubjectAssignments.length})
                </button>
              </div>
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-medium">
              <span className="text-stone-500 text-[11px] uppercase tracking-wider font-bold mr-1">
                Type:
              </span>
              {['all', 'Homework', 'Project', 'Lab Report', 'Essay'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2 py-0.5 rounded-md border text-xs whitespace-nowrap transition-colors ${
                    categoryFilter.toLowerCase() === cat.toLowerCase()
                      ? 'bg-amber-100 text-amber-900 border-amber-400 dark:bg-amber-950 dark:text-amber-200 font-bold'
                      : 'bg-white dark:bg-[#111A30] text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {cat === 'all' ? 'All Types' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Strip */}
          <div className="p-3 bg-white dark:bg-[#111A30] rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="font-bold text-stone-700 dark:text-stone-300 font-display">
                Tasks Completed:
              </span>
              <div className="w-32 md:w-48 h-2 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
                <div
                  className="h-full bg-emerald-700 rounded-full transition-all"
                  style={{
                    width: `${
                      allSubjectAssignments.length > 0
                        ? Math.round((completedSubjectAssignments.length / allSubjectAssignments.length) * 100)
                        : 0
                    }%`
                  }}
                />
              </div>
              <span className="font-bold text-emerald-800 dark:text-emerald-400">
                {completedSubjectAssignments.length} / {allSubjectAssignments.length} (
                {allSubjectAssignments.length > 0
                  ? Math.round((completedSubjectAssignments.length / allSubjectAssignments.length) * 100)
                  : 0}
                %)
              </span>
            </div>

            <button
              onClick={() => onOpenCreateAssignment(currentSubject.id)}
              className="px-2.5 py-1 text-xs font-bold rounded bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 hover:bg-amber-100 flex items-center gap-1 font-display"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Task
            </button>
          </div>

          {subjectAssignments.length === 0 ? (
            <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-12 text-center shadow-2xs">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 font-display">
                No assignments found
              </h3>
              <p className="text-xs md:text-sm text-stone-500 mt-1 max-w-sm mx-auto">
                No active deliverables match this filter. Everything is completed or pending release.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectAssignments.map(asg => {
                const isCompleted =
                  asg.status === 'completed' || asg.status === 'submitted' || asg.status === 'graded';
                const isGraded = asg.status === 'graded';

                return (
                  <div
                    key={asg.id}
                    className={`border rounded-xl p-5 transition-all shadow-2xs border-l-4 ${
                      isCompleted
                        ? 'border-emerald-300 dark:border-emerald-900/80 bg-emerald-50/20 dark:bg-emerald-950/15 border-l-emerald-800'
                        : 'bg-white dark:bg-[#111A30] border-stone-200 dark:border-stone-800 hover:border-amber-500 border-l-amber-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-400">
                            {asg.category}
                          </span>
                          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                          <span className="text-xs font-mono text-stone-500 font-semibold">
                            {asg.subjectName}
                          </span>
                          <span className="text-xs font-mono tabular-nums text-stone-500 font-semibold ml-auto">
                            {asg.points} pts
                          </span>
                        </div>

                        <h3
                          className={`text-base font-bold mt-2 font-display ${
                            isCompleted
                              ? 'line-through text-stone-400 dark:text-stone-500'
                              : 'text-stone-900 dark:text-white'
                          }`}
                        >
                          {asg.title}
                        </h3>
                      </div>

                      {/* 1-Click Fast Checkbox to Toggle Completed */}
                      <button
                        onClick={() => toggleAssignmentComplete(asg.id)}
                        className={`mt-1 p-2 rounded-lg border transition-all flex items-center justify-center shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-800 border-emerald-800 text-white shadow-xs'
                            : 'border-stone-300 dark:border-stone-600 hover:border-emerald-600 bg-white dark:bg-stone-800 text-stone-400 hover:text-emerald-600'
                        }`}
                        title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>

                    <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                      {asg.description}
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs md:text-sm gap-2">
                      <div className="flex items-center gap-1.5 font-mono text-stone-600 dark:text-stone-400">
                        <Clock className="w-4 h-4 text-stone-400" />
                        <span>Due: {asg.dueDate.replace('T', ' ')}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status Label */}
                        <span
                          className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                            isCompleted
                              ? 'bg-emerald-100/90 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                              : isGraded
                              ? 'bg-teal-100/90 text-teal-900 dark:bg-teal-950/80 dark:text-teal-200 border-teal-300 dark:border-teal-800'
                              : 'bg-amber-100/90 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                          }`}
                        >
                          {isCompleted ? 'Done ✓' : isGraded ? 'Graded' : 'Pending'}
                        </span>

                        {!isCompleted && (
                          <button
                            onClick={() => onOpenSubmitAssignment(asg.id)}
                            className="px-3 py-1 text-xs font-bold rounded-lg bg-[#172554] text-amber-300 hover:bg-[#1E3A8A] transition-colors shadow-2xs font-display border border-amber-600/30"
                          >
                            Submit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Note Preview Drawer Modal */}
      {selectedNoteForPreview && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111A30] rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-900 px-2 py-0.5 rounded">
                  {selectedNoteForPreview.unit}
                </span>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white mt-1 font-display">
                  {selectedNoteForPreview.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNoteForPreview(null)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {selectedNoteForPreview.summary}
            </p>

            <div className="flex items-center gap-3 text-xs text-stone-500 font-mono pt-3 border-t border-stone-100 dark:border-stone-800">
              <span>Uploaded by: {selectedNoteForPreview.uploadedBy}</span>
              <span>·</span>
              <span>Date: {selectedNoteForPreview.dateUploaded}</span>
              <span>·</span>
              <span>Format: {selectedNoteForPreview.fileType} ({selectedNoteForPreview.fileSize})</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setSelectedNoteForPreview(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  downloadNote(selectedNoteForPreview.id);
                  setSelectedNoteForPreview(null);
                }}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-[#172554] text-amber-300 hover:bg-[#1E3A8A] flex items-center gap-2 font-display border border-amber-600/40"
              >
                <Download className="w-3.5 h-3.5" />
                Download Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
