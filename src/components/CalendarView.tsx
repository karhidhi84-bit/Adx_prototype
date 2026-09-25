import React, { useState } from 'react';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  Clock,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CalendarEntry } from '../types';

export const CalendarView: React.FC<{
  onOpenAddEvent: (prefilledDate?: string) => void;
  onOpenEditEvent: (entry: CalendarEntry) => void;
}> = ({ onOpenAddEvent, onOpenEditEvent }) => {
  const { calendarEntries, deleteCalendarEntry } = useApp();

  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 25)); // Sept 25, 2026
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'month' | 'agenda' | 'exams'>('month');

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calendar math
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const filteredEntries = calendarEntries.filter(entry => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Exams Only') return entry.type === 'Exam';
    if (selectedFilter === 'Milestones') return entry.type === 'Academic Milestone';
    if (selectedFilter === 'Holidays') return entry.type === 'Holiday';
    if (selectedFilter === 'Events') return entry.type === 'Event';
    return true;
  });

  const getEntriesForDay = (dayNum: number) => {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    return filteredEntries.filter(entry => entry.date === formattedDate);
  };

  // Classic Academic Ivy solid indicator themes
  const getBadgeStyle = (type: CalendarEntry['type']) => {
    switch (type) {
      case 'Exam':
        return 'text-rose-950 bg-rose-50 border border-rose-300 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-800';
      case 'Academic Milestone':
        return 'text-amber-950 bg-amber-50 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800';
      case 'Holiday':
        return 'text-emerald-950 bg-emerald-50 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800';
      case 'Event':
      default:
        return 'text-blue-950 bg-blue-50 border border-blue-300 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800';
    }
  };

  // Exam list sorted
  const allExams = calendarEntries
    .filter(e => e.type === 'Exam')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      {/* Calendar Header in Classic Academic Ivy Styling */}
      <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1 font-display">
              <span className="bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-900 px-2 py-0.5 rounded font-mono">
                Term Calendar
              </span>
              <span aria-hidden="true">·</span>
              <span>Semester Milestones & Examinations</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900 dark:text-white mt-1 font-display">
              Academic Calendar & Assessment Timetable
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              Track midterms, final exam sittings, project submission milestones, and official university holidays
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAddEvent()}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#172554] hover:bg-[#1E3A8A] text-amber-300 transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap border border-amber-600/40 font-display"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              Schedule Event
            </button>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 gap-3">
          {/* Month selector */}
          <div className="flex items-center gap-3">
            <h2 className="text-base md:text-lg font-bold text-stone-900 dark:text-white min-w-[170px] font-display">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
                title="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date(2026, 8, 25))}
                className="px-3 py-1.5 text-xs md:text-sm font-semibold rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-display"
              >
                Today
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
                title="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* View Mode & Filter */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm font-semibold">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3.5 py-1.5 rounded transition-all font-display ${
                  viewMode === 'month'
                    ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Month Grid
              </button>
              <button
                onClick={() => setViewMode('exams')}
                className={`px-3.5 py-1.5 rounded transition-all font-display ${
                  viewMode === 'exams'
                    ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Exams Hub ({allExams.length})
              </button>
              <button
                onClick={() => setViewMode('agenda')}
                className={`px-3.5 py-1.5 rounded transition-all font-display ${
                  viewMode === 'agenda'
                    ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Agenda List
              </button>
            </div>

            <select
              value={selectedFilter}
              onChange={e => setSelectedFilter(e.target.value)}
              className="text-xs md:text-sm py-1.5 px-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-display font-medium"
            >
              <option value="All">All Events & Deadlines</option>
              <option value="Exams Only">Exams Only</option>
              <option value="Milestones">Academic Milestones</option>
              <option value="Holidays">Holidays & Recess</option>
              <option value="Events">Campus Events</option>
            </select>
          </div>
        </div>
      </div>

      {/* View 1: Month Grid */}
      {viewMode === 'month' && (
        <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-2xs">
          {/* Day of week headers */}
          <div className="grid grid-cols-7 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/50 text-center text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 py-3 font-display">
            {daysOfWeek.map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Month days grid */}
          <div className="grid grid-cols-7 divide-x divide-y divide-stone-100 dark:divide-stone-800">
            {/* Blank leading days */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`blank-${i}`} className="min-h-[105px] bg-stone-50/30 dark:bg-stone-900/20 p-2" />
            ))}

            {/* Days in month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isToday =
                currentYear === 2026 && currentMonth === 8 && dayNum === 25;
              const dayEntries = getEntriesForDay(dayNum);
              const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;

              return (
                <div
                  key={`day-${dayNum}`}
                  className={`min-h-[110px] p-2 flex flex-col justify-between transition-colors group ${
                    isToday
                      ? 'bg-amber-50/50 dark:bg-amber-950/20'
                      : 'hover:bg-stone-50/80 dark:hover:bg-stone-800/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-mono font-bold w-6 h-6 flex items-center justify-center rounded ${
                          isToday
                            ? 'bg-[#172554] text-amber-200'
                            : 'text-stone-800 dark:text-stone-200'
                        }`}
                      >
                        {dayNum}
                      </span>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onOpenAddEvent(formattedDate);
                        }}
                        className="text-xs text-stone-400 group-hover:text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity font-semibold"
                        title="Add event for this date"
                      >
                        + Add
                      </button>
                    </div>

                    {/* Entry Badges */}
                    <div className="mt-1.5 space-y-1">
                      {dayEntries.map(entry => (
                        <div
                          key={entry.id}
                          onClick={e => {
                            e.stopPropagation();
                            onOpenEditEvent(entry);
                          }}
                          className={`px-2 py-0.5 rounded text-xs font-semibold leading-tight truncate transition-colors cursor-pointer ${getBadgeStyle(
                            entry.type
                          )}`}
                          title={`${entry.title} (${entry.type})`}
                        >
                          {entry.title}
                        </div>
                      ))}
                    </div>
                  </div>

                  {dayEntries.length > 0 && (
                    <div className="text-[11px] text-amber-800 dark:text-amber-400 font-mono text-right font-medium">
                      {dayEntries.length} {dayEntries.length === 1 ? 'event' : 'events'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: Dedicated Exam Tracker Mode */}
      {viewMode === 'exams' && (
        <div className="space-y-4">
          <div className="bg-rose-50/80 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800/80 rounded-xl p-5 flex items-center justify-between shadow-2xs border-l-4 border-l-rose-900">
            <div>
              <h3 className="text-base font-bold text-rose-950 dark:text-rose-100 font-display">
                Semester Examination Schedule
              </h3>
              <p className="text-xs md:text-sm text-rose-800 dark:text-rose-300 mt-0.5">
                Upcoming midterm exams, practical assessments, and finals with room designations and countdowns
              </p>
            </div>
            <button
              onClick={() => onOpenAddEvent()}
              className="px-4 py-2 text-xs md:text-sm font-bold rounded-lg bg-rose-900 text-white hover:bg-rose-950 transition-colors shadow-xs font-display"
            >
              + Schedule Exam
            </button>
          </div>

          <div className="space-y-3.5">
            {allExams.map(exam => {
              const examDate = new Date(exam.date);
              const today = new Date(2026, 8, 25);
              const diffDays = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

              return (
                <div
                  key={exam.id}
                  className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-5 hover:border-amber-500 transition-colors shadow-2xs border-l-4 border-l-rose-900"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-xs font-mono font-bold text-rose-900 dark:text-rose-200 bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-900 px-2 py-0.5 rounded">
                          EXAM
                        </span>
                        {exam.subjectCode && (
                          <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-400">
                            {exam.subjectCode}
                          </span>
                        )}
                        <h4 className="text-base md:text-lg font-bold text-stone-900 dark:text-white font-display">
                          {exam.title}
                        </h4>
                      </div>

                      <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                        {exam.description}
                      </p>

                      <div className="flex items-center gap-3.5 text-xs md:text-sm text-stone-600 dark:text-stone-400 pt-1">
                        <span className="flex items-center gap-1.5 font-mono tabular-nums font-semibold text-stone-900 dark:text-stone-100">
                          <CalendarDays className="w-4 h-4 text-stone-400" />
                          {exam.date}
                        </span>
                        {exam.time && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-1.5 font-mono tabular-nums">
                              <Clock className="w-4 h-4 text-stone-400" />
                              {exam.time}
                            </span>
                          </>
                        )}
                        {exam.location && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-1.5 font-medium">
                              <MapPin className="w-4 h-4 text-stone-400" />
                              {exam.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold block text-rose-900 dark:text-rose-400">
                          {diffDays === 0
                            ? 'Today!'
                            : diffDays === 1
                            ? 'Tomorrow'
                            : `In ${diffDays} days`}
                        </span>
                        <span className="text-[11px] text-stone-500 font-mono">Assessment Sitting</span>
                      </div>

                      <button
                        onClick={() => onOpenEditEvent(exam)}
                        className="p-2 text-stone-500 hover:text-amber-700 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
                        title="Edit exam details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCalendarEntry(exam.id)}
                        className="p-2 text-stone-400 hover:text-rose-600 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
                        title="Delete exam"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 3: Agenda List Mode */}
      {viewMode === 'agenda' && (
        <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl divide-y divide-stone-100 dark:divide-stone-800 shadow-2xs">
          {filteredEntries.length === 0 ? (
            <div className="p-12 text-center text-stone-400">
              No calendar events found under this filter.
            </div>
          ) : (
            filteredEntries
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map(entry => (
                <div
                  key={entry.id}
                  className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${getBadgeStyle(entry.type)}`}>
                        {entry.type}
                      </span>
                      {entry.subjectCode && (
                        <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-400">
                          {entry.subjectCode}
                        </span>
                      )}
                      <h4 className="text-base font-bold text-stone-900 dark:text-white font-display">
                        {entry.title}
                      </h4>
                    </div>

                    <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300">
                      {entry.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-stone-500 font-mono pt-1">
                      <span>{entry.date}</span>
                      {entry.time && <span>· {entry.time}</span>}
                      {entry.location && <span>· {entry.location}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => onOpenEditEvent(entry)}
                      className="p-1.5 text-stone-500 hover:text-amber-700 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteCalendarEntry(entry.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};
