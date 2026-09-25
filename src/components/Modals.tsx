import React, { useState } from 'react';
import {
  X,
  Upload,
  Calendar,
  Clock,
  BookOpen,
  MapPin,
  Check,
  FileText,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClassPeriod, CalendarEntry, AcademicSubject } from '../types';

interface ModalsProps {
  modalState: {
    type: 'editPeriod' | 'uploadNote' | 'createAssignment' | 'submitAssignment' | 'calendarEvent' | 'clubNotice' | 'createEvent' | null;
    data?: any;
  };
  onClose: () => void;
}

export const Modals: React.FC<ModalsProps> = ({ modalState, onClose }) => {
  const {
    subjects,
    updatePeriod,
    addLectureNote,
    addAssignment,
    submitAssignment,
    addCalendarEntry,
    updateCalendarEntry,
    addClubAnnouncement,
    addEvent,
    userRole
  } = useApp();

  if (!modalState.type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#111A30] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 border-l-4 border-l-amber-600 max-w-lg w-full p-6.5 my-8">
        {/* 1. Edit Period Modal */}
        {modalState.type === 'editPeriod' && (
          <EditPeriodForm
            period={modalState.data as ClassPeriod}
            onSave={(updates) => {
              updatePeriod(modalState.data.id, updates);
              onClose();
            }}
            onClose={onClose}
          />
        )}

        {/* 2. Upload Note Modal */}
        {modalState.type === 'uploadNote' && (
          <UploadNoteForm
            subjects={subjects}
            preselectedSubjectId={modalState.data?.subjectId}
            onSave={(noteData) => {
              addLectureNote(noteData);
              onClose();
            }}
            onClose={onClose}
            userRole={userRole}
          />
        )}

        {/* 3. Create Assignment Modal */}
        {modalState.type === 'createAssignment' && (
          <CreateAssignmentForm
            subjects={subjects}
            preselectedSubjectId={modalState.data?.subjectId}
            onSave={(asgData) => {
              addAssignment(asgData);
              onClose();
            }}
            onClose={onClose}
          />
        )}

        {/* 4. Submit Assignment Modal */}
        {modalState.type === 'submitAssignment' && (
          <SubmitAssignmentForm
            assignmentId={modalState.data?.assignmentId}
            onSave={(text) => {
              submitAssignment(modalState.data.assignmentId, text);
              onClose();
            }}
            onClose={onClose}
          />
        )}

        {/* 5. Add / Edit Calendar Event Modal */}
        {modalState.type === 'calendarEvent' && (
          <CalendarEventForm
            entry={modalState.data?.entry}
            prefilledDate={modalState.data?.prefilledDate}
            onSave={(data, id) => {
              if (id) {
                updateCalendarEntry(id, data);
              } else {
                addCalendarEntry(data);
              }
              onClose();
            }}
            onClose={onClose}
          />
        )}

        {/* 6. Post Club Notice */}
        {modalState.type === 'clubNotice' && (
          <ClubNoticeForm
            clubId={modalState.data?.clubId}
            onSave={(title, content) => {
              addClubAnnouncement(modalState.data.clubId, title, content);
              onClose();
            }}
            onClose={onClose}
          />
        )}

        {/* 7. Create Campus Event */}
        {modalState.type === 'createEvent' && (
          <CreateEventForm
            onSave={(eventData) => {
              addEvent(eventData);
              onClose();
            }}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

// Form: Edit Class Period
const EditPeriodForm: React.FC<{
  period: ClassPeriod;
  onSave: (updates: Partial<ClassPeriod>) => void;
  onClose: () => void;
}> = ({ period, onSave, onClose }) => {
  const [room, setRoom] = useState(period.room);
  const [instructor, setInstructor] = useState(period.instructor);
  const [notes, setNotes] = useState(period.notes || '');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 dark:border-stone-800">
        <div>
          <span className="text-xs font-mono uppercase text-amber-900 dark:text-amber-400 font-bold">
            Period 0{period.periodNumber} · {period.day}
          </span>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5 font-display">
            {period.subjectName}
          </h3>
        </div>
        <button onClick={onClose} className="text-stone-400 hover:text-stone-700 dark:hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3.5 text-sm">
        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Classroom & Hall
          </label>
          <input
            type="text"
            value={room}
            onChange={e => setRoom(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Assigned Instructor
          </label>
          <input
            type="text"
            value={instructor}
            onChange={e => setInstructor(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Preparation Notes / Reminders
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="e.g. Bring scientific calculator or review lecture 3"
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none leading-relaxed font-sans"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2.5">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 font-semibold font-display"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave({ room, instructor, notes })}
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#172554] hover:bg-[#1E3A8A] text-amber-300 dark:bg-[#1E3A8A] dark:hover:bg-[#254BAA] dark:text-amber-200 transition-colors shadow-xs font-display border border-amber-600/40"
        >
          Save Class Info
        </button>
      </div>
    </div>
  );
};

// Form: Upload Lecture Notes
const UploadNoteForm: React.FC<{
  subjects: AcademicSubject[];
  preselectedSubjectId?: string;
  onSave: (data: any) => void;
  onClose: () => void;
  userRole: string;
}> = ({ subjects, preselectedSubjectId, onSave, onClose, userRole }) => {
  const [subjectId, setSubjectId] = useState(preselectedSubjectId || subjects[0].id);
  const [title, setTitle] = useState('');
  const [unit, setUnit] = useState('Unit 3');
  const [fileType, setFileType] = useState<'PDF' | 'Slides' | 'Code' | 'Document'>('PDF');
  const [summary, setSummary] = useState('');
  const [topicsStr, setTopicsStr] = useState('');

  const selectedSubject = subjects.find(s => s.id === subjectId) || subjects[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      subjectId,
      subjectName: selectedSubject.name,
      title: title.trim(),
      unit,
      uploadedBy: userRole === 'faculty' ? 'Dr. Elena Vance (Faculty)' : 'Alex Chen (Student)',
      role: userRole === 'faculty' ? 'Professor' : 'Student',
      fileType,
      fileSize: '3.8 MB',
      summary: summary.trim() || 'Comprehensive course notes and reference formulas.',
      keyTopics: topicsStr
        ? topicsStr.split(',').map(t => t.trim()).filter(Boolean)
        : ['Core Lecture Principles', 'Formulas', 'Examples']
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 dark:border-stone-800">
        <div>
          <span className="text-xs font-mono uppercase text-amber-900 dark:text-amber-400 font-bold">
            Faculty & Academic Vault
          </span>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5 font-display">
            Upload Lecture Notes & Slides
          </h3>
        </div>
        <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3.5 text-sm">
        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Subject & Course
          </label>
          <select
            value={subjectId}
            onChange={e => setSubjectId(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
          >
            {subjects.map(s => (
              <option key={s.id} value={s.id}>
                {s.code} - {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Lecture Document Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Week 5: Vector Clocks & Byzantine Generals"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
              Curriculum Unit
            </label>
            <input
              type="text"
              value={unit}
              onChange={e => setUnit(e.target.value)}
              placeholder="e.g. Unit 3 - Optimization"
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
              File Format
            </label>
            <select
              value={fileType}
              onChange={e => setFileType(e.target.value as any)}
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
            >
              <option value="PDF">PDF Document</option>
              <option value="Slides">Presentation Slides</option>
              <option value="Code">Jupyter / Code Archive</option>
              <option value="Document">Word Document</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Summary / Key Takeaways
          </label>
          <textarea
            rows={2}
            value={summary}
            onChange={e => setSummary(e.target.value)}
            placeholder="Brief overview of theories, derivations, and examples discussed..."
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none leading-relaxed font-sans"
          />
        </div>

        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Key Topics (comma separated)
          </label>
          <input
            type="text"
            value={topicsStr}
            onChange={e => setTopicsStr(e.target.value)}
            placeholder="e.g. Eigenvalues, Matrix SVD, Orthonormal Bases"
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 font-semibold font-display"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#172554] hover:bg-[#1E3A8A] text-amber-300 dark:bg-[#1E3A8A] dark:hover:bg-[#254BAA] dark:text-amber-200 transition-colors flex items-center gap-2 shadow-xs font-display border border-amber-600/40"
        >
          <Upload className="w-4 h-4 text-amber-400" />
          Publish Notes
        </button>
      </div>
    </form>
  );
};

// Form: Create Assignment
const CreateAssignmentForm: React.FC<{
  subjects: AcademicSubject[];
  preselectedSubjectId?: string;
  onSave: (data: any) => void;
  onClose: () => void;
}> = ({ subjects, preselectedSubjectId, onSave, onClose }) => {
  const [subjectId, setSubjectId] = useState(preselectedSubjectId || subjects[0].id);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Homework' | 'Project' | 'Lab Report' | 'Quiz Prep' | 'Essay'>('Homework');
  const [dueDate, setDueDate] = useState('2026-10-05T23:59');
  const [points, setPoints] = useState(50);
  const [priority, setPriority] = useState<'urgent' | 'medium' | 'low'>('medium');
  const [description, setDescription] = useState('');
  const [rubricSummary, setRubricSummary] = useState('');

  const selectedSubject = subjects.find(s => s.id === subjectId) || subjects[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      subjectId,
      subjectName: selectedSubject.name,
      category,
      dueDate,
      points: Number(points),
      priority,
      description: description.trim() || 'Complete the assigned questions and verify with test suite.',
      rubricSummary: rubricSummary.trim() || 'Accuracy (50%), Methodology (30%), Code / Proof clarity (20%).'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 dark:border-stone-800">
        <div>
          <span className="text-xs font-mono uppercase text-amber-900 dark:text-amber-400 font-bold">
            Course Deliverable
          </span>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5 font-display">
            Create Class Homework or Assignment
          </h3>
        </div>
        <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3.5 text-sm">
        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Subject
          </label>
          <select
            value={subjectId}
            onChange={e => setSubjectId(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
          >
            {subjects.map(s => (
              <option key={s.id} value={s.id}>
                {s.code} - {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Assignment Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Problem Set 5: Matrix Decomposition"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
            >
              <option value="Homework">Homework</option>
              <option value="Project">Project</option>
              <option value="Lab Report">Lab Report</option>
              <option value="Essay">Essay</option>
              <option value="Quiz Prep">Quiz Prep</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
              Max Points
            </label>
            <input
              type="number"
              value={points}
              onChange={e => setPoints(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
              Urgency
            </label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as any)}
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
            >
              <option value="urgent">Urgent</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Due Date & Time
          </label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Instructions & Problem Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Details of the problems, data sets, or code repository..."
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none leading-relaxed font-sans"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 font-semibold font-display"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#172554] hover:bg-[#1E3A8A] text-amber-300 dark:bg-[#1E3A8A] dark:hover:bg-[#254BAA] dark:text-amber-200 transition-colors flex items-center gap-2 shadow-xs font-display border border-amber-600/40"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          Assign to Class
        </button>
      </div>
    </form>
  );
};

// Form: Submit Assignment
const SubmitAssignmentForm: React.FC<{
  assignmentId: string;
  onSave: (text: string) => void;
  onClose: () => void;
}> = ({ onSave, onClose }) => {
  const [submissionText, setSubmissionText] = useState('');
  const [simulatedFileName, setSimulatedFileName] = useState('solution_v1.zip');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      submissionText.trim()
        ? `${submissionText} (Attached: ${simulatedFileName})`
        : `Attached: ${simulatedFileName} with verified unit tests`
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 dark:border-stone-800">
        <div>
          <span className="text-xs font-mono uppercase text-amber-900 dark:text-amber-400 font-bold">
            Student Portal
          </span>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5 font-display">
            Submit Class Deliverable
          </h3>
        </div>
        <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3.5 text-sm">
        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Submission Comments / Implementation Notes
          </label>
          <textarea
            rows={3}
            value={submissionText}
            onChange={e => setSubmissionText(e.target.value)}
            placeholder="Explain methodology, test suite passes, and references used..."
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none leading-relaxed font-sans"
          />
        </div>

        <div className="p-3.5 border border-dashed border-amber-300 dark:border-amber-800 rounded-lg text-center bg-amber-50/40 dark:bg-amber-950/20">
          <Upload className="w-6 h-6 text-amber-700 dark:text-amber-400 mx-auto mb-1.5" />
          <p className="font-bold text-stone-900 dark:text-stone-100 text-sm font-display">
            File Attached: {simulatedFileName}
          </p>
          <p className="text-xs text-stone-500 mt-0.5">
            PDF, ZIP, or Jupyter notebook accepted
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 font-semibold font-display"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#172554] hover:bg-[#1E3A8A] text-amber-300 dark:bg-[#1E3A8A] dark:hover:bg-[#254BAA] dark:text-amber-200 transition-colors flex items-center gap-2 shadow-xs font-display border border-amber-600/40"
        >
          <Check className="w-4 h-4 text-amber-400" />
          Confirm Submission
        </button>
      </div>
    </form>
  );
};

// Form: Add / Edit Calendar Event
const CalendarEventForm: React.FC<{
  entry?: CalendarEntry;
  prefilledDate?: string;
  onSave: (data: any, id?: string) => void;
  onClose: () => void;
}> = ({ entry, prefilledDate, onSave, onClose }) => {
  const [title, setTitle] = useState(entry?.title || '');
  const [date, setDate] = useState(entry?.date || prefilledDate || '2026-09-29');
  const [time, setTime] = useState(entry?.time || '09:00 AM - 11:00 AM');
  const [type, setType] = useState<CalendarEntry['type']>(entry?.type || 'Exam');
  const [location, setLocation] = useState(entry?.location || 'Turing Hall 402');
  const [description, setDescription] = useState(entry?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    onSave(
      {
        title: title.trim(),
        date,
        time,
        type,
        location,
        description: description.trim()
      },
      entry?.id
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 dark:border-stone-800">
        <div>
          <span className="text-xs font-mono uppercase text-amber-900 dark:text-amber-400 font-bold">
            {entry ? 'Edit Calendar Event' : 'Add to Academic Calendar'}
          </span>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5 font-display">
            {entry ? entry.title : 'Schedule Exam or Milestone'}
          </h3>
        </div>
        <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3.5 text-sm">
        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Event Title / Subject Code
          </label>
          <input
            type="text"
            required
            placeholder="e.g. CS-301 Midterm Examination"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
              Event Category
            </label>
            <select
              value={type}
              onChange={e => setType(e.target.value as any)}
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
            >
              <option value="Exam">Exam / Midterm / Final</option>
              <option value="Academic Milestone">Academic Milestone</option>
              <option value="Assignment">Assignment Deadline</option>
              <option value="Event">Campus Event</option>
              <option value="Holiday">Study Break / Holiday</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
              Scheduled Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
              Time Slot
            </label>
            <input
              type="text"
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="e.g. 10:00 AM - 12:00 PM"
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
              Location / Venue
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Euler Science 108"
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Exam Description / Permitted Items
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="e.g. Covers Chapters 1-4. One formula sheet allowed."
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none leading-relaxed font-sans"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 font-semibold font-display"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#172554] hover:bg-[#1E3A8A] text-amber-300 dark:bg-[#1E3A8A] dark:hover:bg-[#254BAA] dark:text-amber-200 transition-colors shadow-xs font-display border border-amber-600/40"
        >
          {entry ? 'Update Event' : 'Add to Calendar'}
        </button>
      </div>
    </form>
  );
};

// Form: Club Notice
const ClubNoticeForm: React.FC<{
  clubId: string;
  onSave: (title: string, content: string) => void;
  onClose: () => void;
}> = ({ onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSave(title.trim(), content.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 dark:border-stone-800">
        <div>
          <span className="text-xs font-mono uppercase text-amber-900 dark:text-amber-400 font-bold">
            Collegiate Society Notice
          </span>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5 font-display">
            Post Society Announcement
          </h3>
        </div>
        <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3.5 text-sm">
        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Notice Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Colloquium Rescheduled to Hall 304"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Notice Content
          </label>
          <textarea
            rows={3}
            required
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Detailed meeting notes or requirements for scholars..."
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none leading-relaxed font-sans"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 font-semibold font-display"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#172554] hover:bg-[#1E3A8A] text-amber-300 dark:bg-[#1E3A8A] dark:hover:bg-[#254BAA] dark:text-amber-200 transition-colors shadow-xs font-display border border-amber-600/40"
        >
          Post Notice
        </button>
      </div>
    </form>
  );
};

// Form: Create Campus Event
const CreateEventForm: React.FC<{
  onSave: (data: any) => void;
  onClose: () => void;
}> = ({ onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Academic' | 'Cultural Fest' | 'Hackathon & Tech' | 'Sports' | 'Career & Workshop'>('Hackathon & Tech');
  const [date, setDate] = useState('2026-10-18');
  const [time, setTime] = useState('02:00 PM - 05:00 PM');
  const [venue, setVenue] = useState('Student Union Hall');
  const [organizer, setOrganizer] = useState('Engineering Student Council');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      category,
      date,
      time,
      venue,
      organizer,
      description: description.trim() || 'Annual university event open to all scholars.',
      tags: ['Campus', 'Community']
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 dark:border-stone-800">
        <div>
          <span className="text-xs font-mono uppercase text-amber-900 dark:text-amber-400 font-bold">
            Campus Life
          </span>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5 font-display">
            Propose Campus Event
          </h3>
        </div>
        <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3.5 text-sm">
        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Event Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Inter-Varsity Chess Championship"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
            >
              <option value="Hackathon & Tech">Hackathon & Tech</option>
              <option value="Cultural Fest">Cultural Fest</option>
              <option value="Academic">Academic</option>
              <option value="Sports">Sports</option>
              <option value="Career & Workshop">Career & Workshop</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
              Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
              Time
            </label>
            <input
              type="text"
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="e.g. 03:00 PM - 06:00 PM"
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
              Campus Venue
            </label>
            <input
              type="text"
              value={venue}
              onChange={e => setVenue(e.target.value)}
              placeholder="e.g. Grand Auditorium"
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Host / Organizing Society
          </label>
          <input
            type="text"
            value={organizer}
            onChange={e => setOrganizer(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1 font-display">
            Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Event details, schedule, or prerequisites..."
            className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0E1528] text-stone-900 dark:text-white text-sm focus:ring-1 focus:ring-amber-500 focus:outline-none leading-relaxed font-sans"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 font-semibold font-display"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#172554] hover:bg-[#1E3A8A] text-amber-300 dark:bg-[#1E3A8A] dark:hover:bg-[#254BAA] dark:text-amber-200 transition-colors shadow-xs font-display border border-amber-600/40"
        >
          Publish Event
        </button>
      </div>
    </form>
  );
};
