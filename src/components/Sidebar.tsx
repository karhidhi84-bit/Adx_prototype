import React from 'react';
import {
  LayoutDashboard,
  Clock,
  GraduationCap,
  Sparkles,
  CalendarDays,
  UtensilsCrossed,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    userRole,
    setUserRole,
    assignments,
    calendarEntries,
    canteenItems,
    notifications
  } = useApp();

  const pendingAssignmentsCount = assignments.filter(a => a.status === 'pending').length;
  const soldOutCount = canteenItems.filter(i => !i.isAvailable).length;
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const upcomingExams = calendarEntries.filter(e => e.type === 'Exam');

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: unreadNotifs > 0 ? `${unreadNotifs} unread` : null,
    },
    {
      id: 'timetable',
      label: 'Class Timetable',
      icon: Clock,
      badge: '6 Periods',
    },
    {
      id: 'academic',
      label: 'Academic Vault',
      icon: GraduationCap,
      badge: pendingAssignmentsCount > 0 ? `${pendingAssignmentsCount} due` : null,
    },
    {
      id: 'campus',
      label: 'Campus & Societies',
      icon: Sparkles,
      badge: null,
    },
    {
      id: 'calendar',
      label: 'Term Calendar',
      icon: CalendarDays,
      badge: upcomingExams.length > 0 ? `${upcomingExams.length} exams` : null,
    },
    {
      id: 'canteen',
      label: 'Dining Commons',
      icon: UtensilsCrossed,
      badge: soldOutCount > 0 ? `${soldOutCount} out` : 'Open',
    },
  ] as const;

  return (
    <aside className="w-68 shrink-0 bg-white dark:bg-[#111A30] border-r border-stone-200 dark:border-stone-800 flex flex-col h-screen sticky top-0 select-none shadow-2xs">
      {/* Collegiate Brand Header */}
      <div className="p-5 border-b border-stone-200 dark:border-stone-800/90 flex items-center justify-between bg-stone-50/50 dark:bg-[#0E1528]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#172554] dark:bg-[#1E3A8A] text-amber-400 border border-amber-600/40 flex items-center justify-center font-bold text-base shadow-xs tracking-tight font-display">
            AX
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-white block leading-tight font-display">
              Acade<span className="text-amber-700 dark:text-amber-500 font-serif-ivy">X</span>
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium tracking-wide">
              University Portal · Fall 2026
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-display">
          Academic Workspaces
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium rounded-lg transition-all text-left ${
                isActive
                  ? 'bg-amber-50/80 dark:bg-amber-950/30 text-stone-950 dark:text-amber-100 font-bold border-l-4 border-amber-600 shadow-2xs'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100/80 dark:hover:bg-stone-800/60 hover:text-stone-900 dark:hover:text-white border-l-4 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4.5 h-4.5 shrink-0 ${
                    isActive
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-stone-400 dark:text-stone-500'
                  }`}
                />
                <span className="truncate font-display">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded border shrink-0 ${
                    isActive
                      ? 'text-amber-900 dark:text-amber-200 bg-amber-100/90 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800 font-bold'
                      : 'text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Role & Scholar Status Footnote */}
      <div className="p-3.5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-[#0E1528]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-display">
            Active Role
          </span>
          <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold">
            Honors Track
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1 p-0.5 bg-stone-200/70 dark:bg-stone-800 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setUserRole('student')}
            className={`py-1 rounded text-center transition-all ${
              userRole === 'student'
                ? 'bg-white dark:bg-[#172554] text-stone-900 dark:text-amber-200 shadow-2xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setUserRole('faculty')}
            className={`py-1 rounded text-center transition-all ${
              userRole === 'faculty'
                ? 'bg-white dark:bg-[#172554] text-stone-900 dark:text-amber-200 shadow-2xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Faculty
          </button>
          <button
            onClick={() => setUserRole('canteen_staff')}
            className={`py-1 rounded text-center transition-all ${
              userRole === 'canteen_staff'
                ? 'bg-white dark:bg-[#172554] text-stone-900 dark:text-amber-200 shadow-2xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Dining
          </button>
        </div>
      </div>
    </aside>
  );
};
