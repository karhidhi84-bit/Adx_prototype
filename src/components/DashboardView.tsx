import React, { useState } from 'react';
import {
  Clock,
  AlertTriangle,
  UtensilsCrossed,
  ChevronRight,
  ArrowRight,
  User,
  MapPin,
  Calendar,
  BookOpen,
  CheckCircle2,
  Check,
  Coffee,
  CupSoda
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DayOfWeek, ClassPeriod } from '../types';

export const DashboardView: React.FC<{
  onSelectPeriod: (period: ClassPeriod) => void;
  onOpenSubmitAssignment: (assignmentId: string) => void;
}> = ({ onSelectPeriod, onOpenSubmitAssignment }) => {
  const {
    timetable,
    selectedDay,
    setSelectedDay,
    assignments,
    toggleAssignmentComplete,
    canteenItems,
    toggleCanteenAvailability,
    calendarEntries,
    setCurrentTab,
    userRole,
    addToCart
  } = useApp();

  const [assignmentFilter, setAssignmentFilter] = useState<'pending' | 'completed' | 'all'>('pending');

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // 6 classes for the selected day
  const dailyClasses = timetable
    .filter(c => c.day === selectedDay)
    .sort((a, b) => a.periodNumber - b.periodNumber);

  // Filter assignments
  const pendingAssignments = assignments
    .filter(a => a.status === 'pending')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const completedAssignments = assignments
    .filter(a => a.status === 'completed' || a.status === 'submitted' || a.status === 'graded');

  const displayedAssignments =
    assignmentFilter === 'pending'
      ? pendingAssignments
      : assignmentFilter === 'completed'
      ? completedAssignments
      : assignments;

  // Upcoming exams in the next 14 days
  const upcomingExams = calendarEntries
    .filter(e => e.type === 'Exam')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Quick canteen preview (4 curated items)
  const canteenPreview = canteenItems.slice(0, 4);

  const formatDueDate = (dateStr: string) => {
    const due = new Date(dateStr);
    const now = new Date();
    const diffHours = Math.round((due.getTime() - now.getTime()) / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffHours / 24);

    if (diffDays <= 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days (${due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
  };

  const getPeriodStyle = (periodNumber: number) => {
    switch (periodNumber) {
      case 1:
        return {
          border: 'border-l-4 border-blue-900 dark:border-blue-500',
          bg: 'hover:bg-blue-50/40 dark:hover:bg-blue-950/20',
          badgeText: 'text-blue-950 dark:text-blue-300'
        };
      case 2:
        return {
          border: 'border-l-4 border-emerald-800 dark:border-emerald-500',
          bg: 'hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20',
          badgeText: 'text-emerald-950 dark:text-emerald-300'
        };
      case 3:
        return {
          border: 'border-l-4 border-amber-700 dark:border-amber-500',
          bg: 'hover:bg-amber-50/40 dark:hover:bg-amber-950/20',
          badgeText: 'text-amber-950 dark:text-amber-300'
        };
      case 4:
        return {
          border: 'border-l-4 border-teal-800 dark:border-teal-500',
          bg: 'hover:bg-teal-50/40 dark:hover:bg-teal-950/20',
          badgeText: 'text-teal-950 dark:text-teal-300'
        };
      case 5:
        return {
          border: 'border-l-4 border-rose-900 dark:border-rose-500',
          bg: 'hover:bg-rose-50/40 dark:hover:bg-rose-950/20',
          badgeText: 'text-rose-950 dark:text-rose-300'
        };
      case 6:
      default:
        return {
          border: 'border-l-4 border-stone-700 dark:border-stone-400',
          bg: 'hover:bg-stone-50 dark:hover:bg-stone-800/40',
          badgeText: 'text-stone-900 dark:text-stone-300'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner in Classic Academic Ivy Tone */}
      <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1.5 font-display">
              <span className="bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 px-2.5 py-0.5 rounded-md font-mono">
                AcadeX University
              </span>
              <span aria-hidden="true">·</span>
              <span>Classes: 09:05 AM – 04:00 PM</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white font-display">
              {userRole === 'student'
                ? 'Welcome back, Alex'
                : userRole === 'faculty'
                ? 'Welcome, Dr. Elena Vance'
                : 'Dining Commons Management'}
            </h1>
            <p className="text-sm md:text-base text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
              You have <span className="font-bold text-stone-900 dark:text-white">6 classes</span> scheduled for {selectedDay} (09:05 – 04:00), with{' '}
              <span className="font-bold text-amber-800 dark:text-amber-400">
                {pendingAssignments.length} pending tasks
              </span>{' '}
              and <span className="font-bold text-emerald-800 dark:text-emerald-400">{completedAssignments.length} completed</span>.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {upcomingExams.length > 0 && (
              <div
                onClick={() => setCurrentTab('calendar')}
                className="px-4.5 py-3 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/80 rounded-xl cursor-pointer hover:border-amber-400 transition-colors shadow-2xs border-l-4 border-l-amber-600"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 font-display">
                  Next Examination
                </div>
                <div className="text-sm font-bold text-stone-900 dark:text-white truncate max-w-[220px] font-display mt-0.5">
                  {upcomingExams[0].title}
                </div>
                <div className="text-xs font-mono tabular-nums text-amber-800 dark:text-amber-300 mt-0.5 font-semibold">
                  {upcomingExams[0].date} · {upcomingExams[0].time || 'TBA'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Heritage Metric Tiles with Solid Indicator Borders */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Classes Scheduled */}
        <div
          onClick={() => setCurrentTab('timetable')}
          className="p-4 rounded-xl bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 border-l-4 border-l-blue-900 dark:border-l-blue-500 hover:border-blue-700 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-950 dark:text-blue-300 font-display">
              Today's Schedule
            </span>
            <Clock className="w-4 h-4 text-blue-900 dark:text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900 dark:text-white font-mono">
              6
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              Classes (09:05 - 04:00)
            </span>
          </div>
          <div className="mt-1 text-xs text-blue-900 dark:text-blue-300 font-medium flex items-center gap-1 font-display">
            {selectedDay} 6-Period Grid <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Pending & Completed Homework */}
        <div
          onClick={() => setCurrentTab('academic')}
          className="p-4 rounded-xl bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 border-l-4 border-l-amber-700 dark:border-l-amber-500 hover:border-amber-600 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-amber-300 font-display">
              Tasks & Homework
            </span>
            <BookOpen className="w-4 h-4 text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900 dark:text-white font-mono">
              {pendingAssignments.length}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              Due · {completedAssignments.length} Done
            </span>
          </div>
          <div className="mt-1 text-xs text-amber-800 dark:text-amber-300 font-medium flex items-center gap-1 font-display">
            Mark & Complete Tasks <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Live Canteen Items */}
        <div
          onClick={() => setCurrentTab('canteen')}
          className="p-4 rounded-xl bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 border-l-4 border-l-emerald-800 dark:border-l-emerald-500 hover:border-emerald-600 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 dark:text-emerald-300 font-display">
              Dining Commons
            </span>
            <UtensilsCrossed className="w-4 h-4 text-emerald-800 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900 dark:text-white font-mono">
              {canteenItems.filter(i => i.isAvailable).length}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              Ready to Order
            </span>
          </div>
          <div className="mt-1 text-xs text-emerald-800 dark:text-emerald-300 font-medium flex items-center gap-1 font-display">
            Lunch Break 12:15 - 01:05 <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Upcoming Events & Exams */}
        <div
          onClick={() => setCurrentTab('calendar')}
          className="p-4 rounded-xl bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 border-l-4 border-l-rose-900 dark:border-l-rose-500 hover:border-rose-700 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-950 dark:text-rose-300 font-display">
              Exam Milestones
            </span>
            <Calendar className="w-4 h-4 text-rose-800 dark:text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900 dark:text-white font-mono">
              {upcomingExams.length}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              Upcoming Sittings
            </span>
          </div>
          <div className="mt-1 text-xs text-rose-900 dark:text-rose-300 font-medium flex items-center gap-1 font-display">
            Open Exam Tracker <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Grid: Timetable on Left + Assignments on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Section 1: Daily Timetable with 6 Classes & Accurate Breaks */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800 gap-3">
              <div>
                <h2 className="text-base md:text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2 font-display">
                  <Clock className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                  Daily Timetable (6 Classes)
                </h2>
                <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                  09:05 AM to 04:00 PM · 10m breaks at 11:10 & 2:55 · 50m lunch at 12:15
                </p>
              </div>

              {/* Day Selector Buttons in Segmented Stone Style */}
              <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs font-semibold">
                {days.map(day => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3 py-1.5 rounded transition-all whitespace-nowrap font-display ${
                      selectedDay === day
                        ? 'bg-[#172554] text-amber-200 dark:bg-[#1E3A8A] font-bold shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* List of 6 Classes with Interspersed Break Markers */}
            <div className="divide-y divide-stone-100 dark:divide-stone-800 mt-2">
              {dailyClasses.map((period) => {
                const style = getPeriodStyle(period.periodNumber);
                return (
                  <React.Fragment key={period.id}>
                    {/* Morning Break Banner between Period 2 & Period 3 */}
                    {period.periodNumber === 3 && (
                      <div className="py-2.5 px-3.5 my-2 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/80 rounded-lg flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
                        <span className="font-bold flex items-center gap-1.5 font-display">
                          <Coffee className="w-3.5 h-3.5 text-amber-600" />
                          Morning Recess Break · 10 Minutes
                        </span>
                        <span className="font-mono tabular-nums font-semibold">
                          11:10 AM – 11:20 AM
                        </span>
                      </div>
                    )}

                    {/* Lunch Break Banner between Period 3 & Period 4 */}
                    {period.periodNumber === 4 && (
                      <div className="py-2.5 px-3.5 my-2 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-lg flex items-center justify-between text-xs text-emerald-950 dark:text-emerald-200">
                        <span className="font-bold flex items-center gap-1.5 font-display">
                          <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-600" />
                          Midday Dining Recess · 50 Minutes
                        </span>
                        <span className="font-mono tabular-nums font-semibold">
                          12:15 PM – 01:05 PM
                        </span>
                      </div>
                    )}

                    {/* Afternoon Break Banner between Period 5 & Period 6 */}
                    {period.periodNumber === 6 && (
                      <div className="py-2.5 px-3.5 my-2 bg-stone-100 dark:bg-stone-800/60 border border-stone-300 dark:border-stone-700 rounded-lg flex items-center justify-between text-xs text-stone-900 dark:text-stone-200">
                        <span className="font-bold flex items-center gap-1.5 font-display">
                          <CupSoda className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                          Afternoon Recess Break · 10 Minutes
                        </span>
                        <span className="font-mono tabular-nums font-semibold">
                          02:55 PM – 03:05 PM
                        </span>
                      </div>
                    )}

                    <div
                      onClick={() => onSelectPeriod(period)}
                      className={`py-3 px-3 rounded-lg ${style.border} ${style.bg} transition-colors cursor-pointer group my-1`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          {/* Period Badge & Time */}
                          <div className="w-24 shrink-0 text-left">
                            <span className={`text-xs font-mono font-bold ${style.badgeText} block`}>
                              Period 0{period.periodNumber}
                            </span>
                            <span className="text-xs font-mono tabular-nums text-stone-600 dark:text-stone-400 leading-tight font-medium">
                              {period.timeSlot}
                            </span>
                          </div>

                          {/* Class Details */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm md:text-base font-bold text-stone-900 dark:text-white truncate font-display">
                                {period.subjectName}
                              </span>
                              <span className="text-xs text-amber-900 dark:text-amber-400 font-mono font-semibold">
                                {period.subjectCode}
                              </span>
                            </div>

                            {/* Unboxed Metadata row */}
                            <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 mt-1 flex-wrap">
                              <span className="flex items-center gap-1 font-medium">
                                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                                {period.room} · {period.building}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5 text-stone-400" />
                                {period.instructor}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-semibold text-stone-700 dark:text-stone-300">
                                {period.type}
                              </span>
                            </div>

                            {period.notes && (
                              <p className="text-xs text-stone-500 italic mt-1 line-clamp-1">
                                Note: {period.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="text-xs text-stone-500 dark:text-stone-400">
                School day runs from 09:05 AM to 04:00 PM across all 6 periods
              </span>
              <button
                onClick={() => setCurrentTab('timetable')}
                className="text-xs md:text-sm font-bold text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1.5 font-display"
              >
                Open Full Timetable Grid <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Deliverables & Tasks with 1-Click "Mark Done" */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-stone-100 dark:border-stone-800 gap-2">
              <div>
                <h2 className="text-base md:text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2 font-display">
                  <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                  Assignments & Deliverables
                </h2>
                <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                  Track course deliverables and check off finished work
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="inline-flex p-0.5 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setAssignmentFilter('pending')}
                  className={`px-2.5 py-1 rounded transition-colors font-display ${
                    assignmentFilter === 'pending'
                      ? 'bg-amber-700 text-white shadow-2xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  Pending ({pendingAssignments.length})
                </button>
                <button
                  onClick={() => setAssignmentFilter('completed')}
                  className={`px-2.5 py-1 rounded transition-colors font-display ${
                    assignmentFilter === 'completed'
                      ? 'bg-emerald-800 text-white shadow-2xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  Done ({completedAssignments.length})
                </button>
              </div>
            </div>

            <div className="divide-y divide-stone-100 dark:divide-stone-800 mt-2">
              {displayedAssignments.length === 0 ? (
                <div className="py-8 text-center text-sm text-stone-400">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
                  <p className="font-semibold text-stone-700 dark:text-stone-300 font-display">
                    {assignmentFilter === 'pending'
                      ? 'All caught up! No pending homework.'
                      : 'No completed assignments yet.'}
                  </p>
                </div>
              ) : (
                displayedAssignments.slice(0, 5).map(asg => {
                  const isDone = asg.status === 'completed' || asg.status === 'submitted' || asg.status === 'graded';

                  return (
                    <div key={asg.id} className="py-3.5 group">
                      <div className="flex items-start justify-between gap-3">
                        {/* Interactive Checkbox for Fast Completion */}
                        <button
                          onClick={() => toggleAssignmentComplete(asg.id)}
                          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isDone
                              ? 'bg-emerald-800 border-emerald-800 text-white'
                              : 'border-stone-300 dark:border-stone-600 hover:border-emerald-600 bg-white dark:bg-stone-800'
                          }`}
                          title={isDone ? 'Mark as incomplete / pending' : 'Mark as completed'}
                        >
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-bold truncate font-display ${
                                isDone
                                  ? 'text-stone-400 dark:text-stone-500 line-through'
                                  : 'text-stone-900 dark:text-white'
                              }`}
                            >
                              {asg.title}
                            </span>
                            {isDone && (
                              <span className="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-300 dark:border-emerald-800">
                                Done ✓
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 mt-1">
                            <span className="font-semibold text-amber-900 dark:text-amber-400 font-mono">
                              {asg.subjectName}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums text-stone-600 dark:text-stone-300">
                              {formatDueDate(asg.dueDate)}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">{asg.points} pts</span>
                          </div>
                          <p className="text-xs text-stone-500 mt-1.5 line-clamp-1">
                            {asg.description}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 shrink-0 ml-1">
                          {!isDone ? (
                            <button
                              onClick={() => toggleAssignmentComplete(asg.id)}
                              className="px-2.5 py-1 text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white rounded-md transition-colors whitespace-nowrap shadow-2xs font-display flex items-center gap-1"
                              title="Mark this homework as completed"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Mark Done
                            </button>
                          ) : (
                            <button
                              onClick={() => toggleAssignmentComplete(asg.id)}
                              className="px-2 py-0.5 text-[11px] font-semibold text-stone-500 hover:text-rose-600 transition-colors"
                              title="Undo completed status"
                            >
                              Undo
                            </button>
                          )}
                          <button
                            onClick={() => onOpenSubmitAssignment(asg.id)}
                            className="text-[11px] font-medium text-stone-500 hover:text-amber-700 hover:underline transition-colors"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800 text-center">
              <button
                onClick={() => setCurrentTab('academic')}
                className="text-xs md:text-sm font-bold text-amber-800 dark:text-amber-400 hover:underline flex items-center justify-center gap-1.5 w-full font-display"
              >
                Open Academic Vault & All Assignments <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Dining Specials */}
      <div className="bg-white dark:bg-[#111A30] border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <h2 className="text-base md:text-lg font-bold text-stone-900 dark:text-white font-display">
                Dining Commons Live Specials & Inventory
              </h2>
            </div>
            <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              Midday Lunch Break (12:15 PM – 01:05 PM) · Real-time kitchen availability
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('canteen')}
              className="text-xs md:text-sm font-bold text-emerald-800 dark:text-emerald-300 hover:underline flex items-center gap-1.5 font-display"
            >
              Full Menu & Pre-Order <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Featured Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {canteenPreview.map(item => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                item.isAvailable
                  ? 'border-stone-200 dark:border-stone-800 bg-white dark:bg-[#111A30] shadow-2xs border-l-4 border-l-emerald-800'
                  : 'border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/40 opacity-75 border-l-4 border-l-stone-400'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-300 font-bold">
                  {item.category}
                </span>

                {/* Availability Toggle Button */}
                <button
                  onClick={() => toggleCanteenAvailability(item.id)}
                  className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 border ${
                    item.isAvailable
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                      : 'bg-rose-50 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800'
                  }`}
                  title="Click to toggle availability"
                >
                  <span className={`w-2 h-2 rounded-full ${item.isAvailable ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                  {item.isAvailable ? 'In Stock' : 'Sold Out'}
                </button>
              </div>

              <h3 className="text-base font-bold text-stone-900 dark:text-white mt-2 leading-snug font-display">
                {item.name}
              </h3>

              <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-3.5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-base font-bold font-mono tabular-nums text-stone-900 dark:text-white">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400 block font-mono">
                    {item.prepTime}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.isAvailable && (
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#172554] text-amber-300 hover:bg-[#1E3A8A] transition-colors shadow-2xs font-display"
                    >
                      + Tray
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
