import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  User,
  Edit2,
  Search,
  BookOpen,
  Calendar,
  Coffee,
  UtensilsCrossed,
  CupSoda,
  CheckCircle2,
  Check,
  ArrowRight,
  CheckSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClassPeriod, DayOfWeek } from '../types';

export const TimetableView: React.FC<{
  onSelectPeriod: (period: ClassPeriod) => void;
}> = ({ onSelectPeriod }) => {
  const {
    timetable,
    selectedDay,
    setSelectedDay,
    updateAttendance,
    setCurrentTab,
    assignments,
    toggleAssignmentComplete
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'week'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [homeworkFilter, setHomeworkFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Filter classes for the day
  const filteredDayClasses = timetable
    .filter(c => c.day === selectedDay)
    .filter(c => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.subjectName.toLowerCase().includes(q) ||
        c.subjectCode.toLowerCase().includes(q) ||
        c.room.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => a.periodNumber - b.periodNumber);

  // Subject IDs on the selected day
  const daySubjectIds = new Set(filteredDayClasses.map(c => c.subjectId));

  // Daily homework and assignments related to today's subjects (or all upcoming)
  const dayAssignments = assignments.filter(a => daySubjectIds.has(a.subjectId) || daySubjectIds.size === 0);
  const filteredAssignments = dayAssignments.filter(a => {
    const isDone = a.status === 'completed' || a.status === 'submitted' || a.status === 'graded';
    if (homeworkFilter === 'pending') return !isDone;
    if (homeworkFilter === 'completed') return isDone;
    return true;
  });

  const completedCount = dayAssignments.filter(
    a => a.status === 'completed' || a.status === 'submitted' || a.status === 'graded'
  ).length;

  // Classic Academic Ivy solid indicator themes for subjects & periods
  const getPeriodTheme = (periodNumber: number) => {
    switch (periodNumber) {
      case 1:
        return {
          border: 'border-l-4 border-blue-900 dark:border-blue-500',
          badgeText: 'text-blue-950 dark:text-blue-300',
          boxBg: 'bg-stone-50 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700',
          indicator: 'Collegiate Navy'
        };
      case 2:
        return {
          border: 'border-l-4 border-emerald-800 dark:border-emerald-500',
          badgeText: 'text-emerald-950 dark:text-emerald-300',
          boxBg: 'bg-stone-50 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700',
          indicator: 'Ivy Forest'
        };
      case 3:
        return {
          border: 'border-l-4 border-amber-700 dark:border-amber-500',
          badgeText: 'text-amber-950 dark:text-amber-300',
          boxBg: 'bg-stone-50 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700',
          indicator: 'Burnished Bronze'
        };
      case 4:
        return {
          border: 'border-l-4 border-teal-800 dark:border-teal-500',
          badgeText: 'text-teal-950 dark:text-teal-300',
          boxBg: 'bg-stone-50 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700',
          indicator: 'Oxford Teal'
        };
      case 5:
        return {
          border: 'border-l-4 border-rose-900 dark:border-rose-500',
          badgeText: 'text-rose-950 dark:text-rose-300',
          boxBg: 'bg-stone-50 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700',
          indicator: 'Oxblood Crimson'
        };
      case 6:
      default:
        return {
          border: 'border-l-4 border-stone-700 dark:border-stone-400',
          badgeText: 'text-stone-900 dark:text-stone-300',
          boxBg: 'bg-stone-50 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700',
          indicator: 'Granite Slate'
        };
    }
  };

  const getSubjectColorStyles = (code: string) => {
    if (code.startsWith('CS-301')) {
      return 'bg-blue-50/90 text-blue-950 dark:bg-blue-950/60 dark:text-blue-200 border-l-4 border-blue-900 dark:border-blue-500';
    } else if (code.startsWith('MATH-240')) {
      return 'bg-emerald-50/90 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-200 border-l-4 border-emerald-800 dark:border-emerald-500';
    } else if (code.startsWith('PHYS-210')) {
      return 'bg-amber-50/90 text-amber-950 dark:bg-amber-950/60 dark:text-amber-200 border-l-4 border-amber-700 dark:border-amber-500';
    } else if (code.startsWith('DS-220')) {
      return 'bg-teal-50/90 text-teal-950 dark:bg-teal-950/60 dark:text-teal-200 border-l-4 border-teal-800 dark:border-teal-500';
    } else if (code.startsWith('SEC-310')) {
      return 'bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-200 border-l-4 border-stone-700 dark:border-stone-400';
    }
    return 'bg-rose-50/90 text-rose-950 dark:bg-rose-950/60 dark:text-rose-200 border-l-4 border-rose-900 dark:border-rose-500';
  };

  const getPeriodByNumber = (num: number) => {
    return filteredDayClasses.find(c => c.periodNumber === num);
  };

  const renderPeriodCard = (period: ClassPeriod) => {
    const theme = getPeriodTheme(period.periodNumber);
    return (
      <div
        key={period.id}
        className={`bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-5 hover:border-amber-500/70 transition-all shadow-2xs flex flex-col justify-between ${theme.border} group`}
      >
        <div>
          {/* Header Row: Period, Time, Type */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${theme.badgeText}`}>
                Period 0{period.periodNumber}
              </span>
              <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
              <span className="text-xs font-mono tabular-nums font-bold text-stone-700 dark:text-stone-300">
                {period.timeSlot}
              </span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300">
              {period.type}
            </span>
          </div>

          {/* Subject Title & Code */}
          <div className="mt-3">
            <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-400">
              {period.subjectCode}
            </span>
            <h3 className="text-base font-bold text-stone-900 dark:text-white mt-1 leading-snug font-display group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
              {period.subjectName}
            </h3>
          </div>

          {/* Location & Instructor (Unboxed Metadata) */}
          <div className="space-y-1.5 mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/80 text-xs md:text-sm text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-700 dark:text-amber-500 shrink-0" />
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {period.room} · {period.building}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-stone-400 shrink-0" />
              <span>{period.instructor}</span>
            </div>
          </div>

          {/* Preparation Notes */}
          {period.notes && (
            <div className="mt-2.5 text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/60 p-2.5 rounded-lg border border-stone-200 dark:border-stone-700">
              <strong className="text-stone-900 dark:text-stone-100 font-display">Notes: </strong>
              {period.notes}
            </div>
          )}
        </div>

        {/* Footer: Attendance & Edit */}
        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
          {/* Attendance Controls */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-stone-500 font-medium font-display mr-1">Status:</span>
            <button
              onClick={() =>
                updateAttendance(
                  period.id,
                  period.attendanceStatus === 'present' ? 'unmarked' : 'present'
                )
              }
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors font-display ${
                period.attendanceStatus === 'present'
                  ? 'bg-emerald-800 text-white font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-50 dark:hover:bg-stone-700'
              }`}
            >
              Present
            </button>
            <button
              onClick={() =>
                updateAttendance(
                  period.id,
                  period.attendanceStatus === 'absent' ? 'unmarked' : 'absent'
                )
              }
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors font-display ${
                period.attendanceStatus === 'absent'
                  ? 'bg-rose-900 text-white font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-rose-50 dark:hover:bg-stone-700'
              }`}
            >
              Absent
            </button>
          </div>

          <button
            onClick={() => onSelectPeriod(period)}
            className="text-xs font-bold text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1 font-display"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls in Classic Academic Ivy Styling */}
      <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1 font-display">
              <span className="bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 px-2 py-0.5 rounded font-mono">
                Bell Schedule
              </span>
              <span aria-hidden="true">·</span>
              <span>Classes 09:05 AM to 04:00 PM</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900 dark:text-white flex items-center gap-2.5 font-display">
              <Clock className="w-6 h-6 text-amber-700 dark:text-amber-400" />
              Academic Class Timetable (6 Periods Daily)
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Structured 6 periods grid schedule (09:05 – 04:00) with 10m breaks at 11:10 & 2:55, and 50m lunch break at 12:15
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search course, room, professor..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-3.5 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500 w-56 md:w-64"
              />
            </div>

            {/* View Mode Toggle: Grid vs Week Matrix */}
            <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800/90 rounded-lg text-sm font-semibold">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3.5 py-1.5 rounded transition-all font-display ${
                  viewMode === 'grid'
                    ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Daily 6-Period Grid
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3.5 py-1.5 rounded transition-all font-display ${
                  viewMode === 'week'
                    ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Weekly Schedule Matrix
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Timing Quick Breakdown Banner */}
        <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <span className="font-bold text-stone-700 dark:text-stone-300 font-display uppercase tracking-wider text-[11px]">
            Schedule Breakdown:
          </span>
          <span className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-semibold">
            6 Periods: 09:05 AM – 04:00 PM
          </span>
          <span className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 font-semibold flex items-center gap-1">
            <Coffee className="w-3.5 h-3.5 text-amber-600" /> Morning Break: 11:10 – 11:20 AM (10 min)
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 font-semibold flex items-center gap-1">
            <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-600" /> Lunch Break: 12:15 – 01:05 PM (50 min)
          </span>
          <span className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-semibold flex items-center gap-1">
            <CupSoda className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" /> Afternoon Break: 02:55 – 03:05 PM (10 min)
          </span>
        </div>

        {/* Day Selector Tabs */}
        {viewMode === 'grid' && (
          <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 overflow-x-auto">
            {days.map(day => {
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap font-display ${
                    isSelected
                      ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] shadow-xs font-bold'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-700'
                  }`}
                >
                  {day}
                  <span className="ml-2 font-mono text-xs opacity-90">
                    6 Classes
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* VIEW 1: Daily 6 Periods Organized in a Clear Responsive Grid with Solid Indicator Borders */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          {/* Morning Block (Periods 1 & 2) in a 2-column Grid */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-display">
                Morning Session (Periods 01 & 02 · 09:05 AM – 11:10 AM)
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-400 font-semibold">
                60 min per period
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getPeriodByNumber(1) && renderPeriodCard(getPeriodByNumber(1)!)}
              {getPeriodByNumber(2) && renderPeriodCard(getPeriodByNumber(2)!)}
            </div>
          </div>

          {/* 10 MINUTE BREAK AT 11:10 AM */}
          <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 flex items-center justify-center shrink-0">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-amber-950 dark:text-amber-100 font-display block">
                  Morning Recess Break · 10 Minutes
                </span>
                <span className="text-xs text-amber-800 dark:text-amber-300">
                  Classroom transit, hallway conversation & morning coffee refreshment
                </span>
              </div>
            </div>
            <div className="text-right sm:text-right shrink-0">
              <span className="font-mono tabular-nums text-xs font-bold text-amber-900 dark:text-amber-200 bg-white dark:bg-[#111A30] px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
                11:10 AM – 11:20 AM
              </span>
            </div>
          </div>

          {/* Midday Block (Period 3) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-display">
                Midday Class (Period 03 · 11:20 AM – 12:15 PM)
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-400 font-semibold">
                55 min period · Pre-Lunch Lecture
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getPeriodByNumber(3) && renderPeriodCard(getPeriodByNumber(3)!)}
              <div className="flex flex-col justify-center items-center p-6 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-[#111A30] text-center border-l-4 border-amber-600">
                <Clock className="w-7 h-7 text-amber-700 dark:text-amber-400 mb-2" />
                <p className="font-bold text-sm text-stone-800 dark:text-stone-200 font-display">
                  Period 03 Concludes at 12:15 PM
                </p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Followed immediately by the 50-minute dining recess across university commons
                </p>
              </div>
            </div>
          </div>

          {/* 50 MINUTE LUNCH BREAK AT 12:15 PM */}
          <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-bold text-emerald-950 dark:text-emerald-100 font-display block leading-snug">
                  Midday Campus Lunch Break · 50 Minutes
                </span>
                <span className="text-xs text-emerald-800 dark:text-emerald-300">
                  Main dining commons open, student union food hall & mobile pre-order counters
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <span className="font-mono tabular-nums text-xs font-bold text-emerald-950 dark:text-emerald-200 bg-white dark:bg-[#111A30] px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-800 shadow-2xs">
                12:15 PM – 01:05 PM
              </span>
              <button
                onClick={() => setCurrentTab('canteen')}
                className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 transition-colors shadow-2xs flex items-center gap-1 font-display"
              >
                Dining Menu <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Afternoon Block (Periods 4 & 5) in a 2-column Grid */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-display">
                Afternoon Session (Periods 04 & 05 · 01:05 PM – 02:55 PM)
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-400 font-semibold">
                Post-lunch laboratory & recitations
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getPeriodByNumber(4) && renderPeriodCard(getPeriodByNumber(4)!)}
              {getPeriodByNumber(5) && renderPeriodCard(getPeriodByNumber(5)!)}
            </div>
          </div>

          {/* 10 MINUTE BREAK AT 02:55 PM */}
          <div className="p-3.5 bg-stone-100 dark:bg-stone-800/60 border border-stone-300 dark:border-stone-700 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 flex items-center justify-center shrink-0">
                <CupSoda className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display block">
                  Afternoon Recess Break · 10 Minutes
                </span>
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  Quick hydration, stroll through courtyard & transition into Period 06
                </span>
              </div>
            </div>
            <div className="text-right sm:text-right shrink-0">
              <span className="font-mono tabular-nums text-xs font-bold text-stone-900 dark:text-stone-200 bg-white dark:bg-[#111A30] px-2.5 py-1 rounded border border-stone-300 dark:border-stone-700">
                02:55 PM – 03:05 PM
              </span>
            </div>
          </div>

          {/* Final Period Block (Period 6 until 04:00 PM) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-display">
                Final Academic Period (Period 06 · 03:05 PM – 04:00 PM)
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-400 font-semibold">
                Daily Dismissal at 04:00 PM
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getPeriodByNumber(6) && renderPeriodCard(getPeriodByNumber(6)!)}
              <div className="flex flex-col justify-center items-center p-6 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-[#111A30] text-center border-l-4 border-stone-700">
                <CheckCircle2 className="w-7 h-7 text-amber-700 dark:text-amber-400 mb-2" />
                <p className="font-bold text-sm text-stone-800 dark:text-stone-200 font-display">
                  Daily Classes Conclude at 04:00 PM
                </p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  University library stacks, debating union, and athletic club meetings commence after 4 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Full Week Matrix Grid */}
      {viewMode === 'week' && (
        <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl overflow-x-auto p-5 shadow-2xs">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-xs font-mono uppercase tracking-wider">
                <th className="py-3 px-3.5 w-36 font-bold font-display">Period & Time</th>
                {days.map(d => (
                  <th key={d} className="py-3 px-3.5 font-bold font-display">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
              {/* Period 1 */}
              <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                <td className="py-3 px-3.5 font-mono">
                  <span className="font-bold text-blue-950 dark:text-blue-300 block">Period 01</span>
                  <span className="text-xs text-stone-500 tabular-nums">09:05 - 10:05 AM</span>
                </td>
                {days.map(day => {
                  const match = timetable.find(t => t.day === day && t.periodNumber === 1);
                  if (!match) return <td key={day} className="p-3 text-stone-300">-</td>;
                  const colorCls = getSubjectColorStyles(match.subjectCode);
                  return (
                    <td key={day} onClick={() => onSelectPeriod(match)} className="p-2 cursor-pointer">
                      <div className={`p-2.5 rounded-lg border transition-all hover:scale-101 hover:shadow-xs ${colorCls}`}>
                        <div className="font-bold font-display text-xs md:text-sm line-clamp-1">{match.subjectCode}</div>
                        <div className="text-xs opacity-90 truncate mt-0.5 font-medium">{match.room}</div>
                        <div className="text-[11px] font-mono opacity-80 mt-0.5">{match.type}</div>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Period 2 */}
              <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                <td className="py-3 px-3.5 font-mono">
                  <span className="font-bold text-emerald-950 dark:text-emerald-300 block">Period 02</span>
                  <span className="text-xs text-stone-500 tabular-nums">10:10 - 11:10 AM</span>
                </td>
                {days.map(day => {
                  const match = timetable.find(t => t.day === day && t.periodNumber === 2);
                  if (!match) return <td key={day} className="p-3 text-stone-300">-</td>;
                  const colorCls = getSubjectColorStyles(match.subjectCode);
                  return (
                    <td key={day} onClick={() => onSelectPeriod(match)} className="p-2 cursor-pointer">
                      <div className={`p-2.5 rounded-lg border transition-all hover:scale-101 hover:shadow-xs ${colorCls}`}>
                        <div className="font-bold font-display text-xs md:text-sm line-clamp-1">{match.subjectCode}</div>
                        <div className="text-xs opacity-90 truncate mt-0.5 font-medium">{match.room}</div>
                        <div className="text-[11px] font-mono opacity-80 mt-0.5">{match.type}</div>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* BREAK 1: 10 MIN BREAK AT 11:10 AM */}
              <tr className="bg-amber-50/60 dark:bg-amber-950/30 border-y border-amber-200 dark:border-amber-800/60">
                <td className="py-2.5 px-3.5 font-mono text-xs font-bold text-amber-900 dark:text-amber-200">
                  <div className="flex items-center gap-1.5 font-display">
                    <Coffee className="w-3.5 h-3.5 text-amber-600" />
                    <span>Break (10m)</span>
                  </div>
                  <span className="text-[11px] text-amber-800 dark:text-amber-300 tabular-nums">11:10 - 11:20 AM</span>
                </td>
                <td colSpan={5} className="py-2.5 px-3.5 text-xs text-amber-900 dark:text-amber-200 font-semibold font-display">
                  Morning Recess Break · 10 Minutes (11:10 AM – 11:20 AM) across all academic halls
                </td>
              </tr>

              {/* Period 3 */}
              <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                <td className="py-3 px-3.5 font-mono">
                  <span className="font-bold text-amber-950 dark:text-amber-300 block">Period 03</span>
                  <span className="text-xs text-stone-500 tabular-nums">11:20 AM - 12:15 PM</span>
                </td>
                {days.map(day => {
                  const match = timetable.find(t => t.day === day && t.periodNumber === 3);
                  if (!match) return <td key={day} className="p-3 text-stone-300">-</td>;
                  const colorCls = getSubjectColorStyles(match.subjectCode);
                  return (
                    <td key={day} onClick={() => onSelectPeriod(match)} className="p-2 cursor-pointer">
                      <div className={`p-2.5 rounded-lg border transition-all hover:scale-101 hover:shadow-xs ${colorCls}`}>
                        <div className="font-bold font-display text-xs md:text-sm line-clamp-1">{match.subjectCode}</div>
                        <div className="text-xs opacity-90 truncate mt-0.5 font-medium">{match.room}</div>
                        <div className="text-[11px] font-mono opacity-80 mt-0.5">{match.type}</div>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* LUNCH BREAK: 50 MIN BREAK AT 12:15 PM */}
              <tr className="bg-emerald-50/70 dark:bg-emerald-950/30 border-y border-emerald-200 dark:border-emerald-800/60">
                <td className="py-2.5 px-3.5 font-mono text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  <div className="flex items-center gap-1.5 font-display">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Lunch (50m)</span>
                  </div>
                  <span className="text-[11px] text-emerald-800 dark:text-emerald-300 tabular-nums">12:15 - 01:05 PM</span>
                </td>
                <td colSpan={5} className="py-2.5 px-3.5 text-xs text-emerald-950 dark:text-emerald-200 font-semibold font-display">
                  Campus Midday Dining Recess · 50 Minutes (12:15 PM – 01:05 PM) · Dining hall open
                </td>
              </tr>

              {/* Period 4 */}
              <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                <td className="py-3 px-3.5 font-mono">
                  <span className="font-bold text-teal-950 dark:text-teal-300 block">Period 04</span>
                  <span className="text-xs text-stone-500 tabular-nums">01:05 - 02:00 PM</span>
                </td>
                {days.map(day => {
                  const match = timetable.find(t => t.day === day && t.periodNumber === 4);
                  if (!match) return <td key={day} className="p-3 text-stone-300">-</td>;
                  const colorCls = getSubjectColorStyles(match.subjectCode);
                  return (
                    <td key={day} onClick={() => onSelectPeriod(match)} className="p-2 cursor-pointer">
                      <div className={`p-2.5 rounded-lg border transition-all hover:scale-101 hover:shadow-xs ${colorCls}`}>
                        <div className="font-bold font-display text-xs md:text-sm line-clamp-1">{match.subjectCode}</div>
                        <div className="text-xs opacity-90 truncate mt-0.5 font-medium">{match.room}</div>
                        <div className="text-[11px] font-mono opacity-80 mt-0.5">{match.type}</div>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Period 5 */}
              <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                <td className="py-3 px-3.5 font-mono">
                  <span className="font-bold text-rose-950 dark:text-rose-300 block">Period 05</span>
                  <span className="text-xs text-stone-500 tabular-nums">02:00 - 02:55 PM</span>
                </td>
                {days.map(day => {
                  const match = timetable.find(t => t.day === day && t.periodNumber === 5);
                  if (!match) return <td key={day} className="p-3 text-stone-300">-</td>;
                  const colorCls = getSubjectColorStyles(match.subjectCode);
                  return (
                    <td key={day} onClick={() => onSelectPeriod(match)} className="p-2 cursor-pointer">
                      <div className={`p-2.5 rounded-lg border transition-all hover:scale-101 hover:shadow-xs ${colorCls}`}>
                        <div className="font-bold font-display text-xs md:text-sm line-clamp-1">{match.subjectCode}</div>
                        <div className="text-xs opacity-90 truncate mt-0.5 font-medium">{match.room}</div>
                        <div className="text-[11px] font-mono opacity-80 mt-0.5">{match.type}</div>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* BREAK 2: 10 MIN BREAK AT 02:55 PM */}
              <tr className="bg-stone-100 dark:bg-stone-800/60 border-y border-stone-200 dark:border-stone-700">
                <td className="py-2.5 px-3.5 font-mono text-xs font-bold text-stone-900 dark:text-stone-200">
                  <div className="flex items-center gap-1.5 font-display">
                    <CupSoda className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                    <span>Break (10m)</span>
                  </div>
                  <span className="text-[11px] text-stone-700 dark:text-stone-300 tabular-nums">02:55 - 03:05 PM</span>
                </td>
                <td colSpan={5} className="py-2.5 px-3.5 text-xs text-stone-900 dark:text-stone-200 font-semibold font-display">
                  Afternoon Recess Break · 10 Minutes (02:55 PM – 03:05 PM)
                </td>
              </tr>

              {/* Period 6 */}
              <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                <td className="py-3 px-3.5 font-mono">
                  <span className="font-bold text-stone-900 dark:text-stone-200 block">Period 06</span>
                  <span className="text-xs text-stone-500 tabular-nums">03:05 - 04:00 PM</span>
                </td>
                {days.map(day => {
                  const match = timetable.find(t => t.day === day && t.periodNumber === 6);
                  if (!match) return <td key={day} className="p-3 text-stone-300">-</td>;
                  const colorCls = getSubjectColorStyles(match.subjectCode);
                  return (
                    <td key={day} onClick={() => onSelectPeriod(match)} className="p-2 cursor-pointer">
                      <div className={`p-2.5 rounded-lg border transition-all hover:scale-101 hover:shadow-xs ${colorCls}`}>
                        <div className="font-bold font-display text-xs md:text-sm line-clamp-1">{match.subjectCode}</div>
                        <div className="text-xs opacity-90 truncate mt-0.5 font-medium">{match.room}</div>
                        <div className="text-[11px] font-mono opacity-80 mt-0.5">{match.type}</div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* INTEGRATED SECTION: Course Homework & Assignments Checklist */}
      <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-5 md:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1 font-display">
              <span className="bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 px-2 py-0.5 rounded font-mono">
                Deliverables Tracker
              </span>
              <span aria-hidden="true">·</span>
              <span>{selectedDay}'s Classes</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold tracking-tight text-stone-900 dark:text-white flex items-center gap-2 font-display">
              <CheckSquare className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              Course Assignments & Homework Checklist
            </h2>
            <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              Click checkboxes to mark deliverables as completed. Synchronized across your academic vault.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setHomeworkFilter('all')}
                className={`px-3 py-1 rounded transition-colors font-display ${
                  homeworkFilter === 'all'
                    ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-2xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                All ({dayAssignments.length})
              </button>
              <button
                onClick={() => setHomeworkFilter('pending')}
                className={`px-3 py-1 rounded transition-colors font-display ${
                  homeworkFilter === 'pending'
                    ? 'bg-amber-700 text-white font-bold shadow-2xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Pending ({dayAssignments.length - completedCount})
              </button>
              <button
                onClick={() => setHomeworkFilter('completed')}
                className={`px-3 py-1 rounded transition-colors font-display ${
                  homeworkFilter === 'completed'
                    ? 'bg-emerald-800 text-white font-bold shadow-2xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Completed ({completedCount})
              </button>
            </div>

            <button
              onClick={() => setCurrentTab('academic')}
              className="text-xs font-bold text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1 font-display px-2 py-1"
            >
              Course Vault <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress Strip */}
        <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200 dark:border-stone-700 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 font-display">
              Completion Rate:
            </span>
            <div className="w-36 md:w-56 h-2 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
              <div
                className="h-full bg-emerald-700 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    dayAssignments.length > 0
                      ? Math.round((completedCount / dayAssignments.length) * 100)
                      : 0
                  }%`
                }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400">
              {dayAssignments.length > 0
                ? Math.round((completedCount / dayAssignments.length) * 100)
                : 0}
              %
            </span>
          </div>

          <span className="text-xs text-stone-500 font-mono">
            {completedCount} of {dayAssignments.length} done
          </span>
        </div>

        {/* Assignment & Homework Items */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredAssignments.length === 0 ? (
            <div className="col-span-full py-8 text-center text-stone-400 text-sm">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-semibold text-stone-700 dark:text-stone-300 font-display">
                {homeworkFilter === 'pending'
                  ? 'All tasks completed for these subjects! Commendable work.'
                  : 'No deliverables found under this filter.'}
              </p>
            </div>
          ) : (
            filteredAssignments.map(asg => {
              const isDone =
                asg.status === 'completed' || asg.status === 'submitted' || asg.status === 'graded';

              return (
                <div
                  key={asg.id}
                  onClick={() => toggleAssignmentComplete(asg.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 group select-none shadow-2xs ${
                    isDone
                      ? 'bg-emerald-50/20 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 border-l-4 border-l-emerald-700'
                      : 'bg-white dark:bg-[#111A30] border-stone-200 dark:border-stone-800 hover:border-amber-500/80 border-l-4 border-l-amber-600'
                  }`}
                >
                  {/* Checkbox */}
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      isDone
                        ? 'bg-emerald-800 border-emerald-800 text-white'
                        : 'border-stone-300 dark:border-stone-600 group-hover:border-emerald-600 bg-white dark:bg-stone-800'
                    }`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-400">
                        {asg.category}
                      </span>
                      <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                      <span className="text-xs font-mono text-stone-500">
                        {asg.subjectName}
                      </span>
                      {isDone && (
                        <span className="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-300 dark:border-emerald-800 ml-auto">
                          Done ✓
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-sm md:text-base font-bold mt-1.5 font-display leading-snug ${
                        isDone
                          ? 'line-through text-stone-400 dark:text-stone-500'
                          : 'text-stone-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors'
                      }`}
                    >
                      {asg.title}
                    </h3>

                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {asg.description}
                    </p>

                    <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                      <span className="font-mono text-stone-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        Due {asg.dueDate.split('T')[0]}
                      </span>
                      <span className="font-mono tabular-nums text-stone-600 dark:text-stone-300 font-semibold">
                        {asg.points} pts
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
