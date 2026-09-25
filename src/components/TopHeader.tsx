import React, { useState } from 'react';
import {
  Bell,
  Plus,
  BookMarked
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopHeader: React.FC<{
  onOpenQuickModal: (type: 'assignment' | 'event' | 'calendar' | 'note') => void;
}> = ({ onOpenQuickModal }) => {
  const {
    currentTab,
    setCurrentTab,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    userRole
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getBreadcrumb = () => {
    switch (currentTab) {
      case 'dashboard':
        return 'Campus Overview & Real-Time Alerts';
      case 'timetable':
        return 'Class Timetable · 6 Periods Daily Schedule';
      case 'academic':
        return 'Academic Vault · Syllabi, Notes & Homework';
      case 'campus':
        return 'Campus Life · Academic Societies & Events';
      case 'calendar':
        return 'Academic Calendar · Exam Sittings & Milestones';
      case 'canteen':
        return 'Dining Commons · Live Menu & Kitchen Pre-Orders';
      default:
        return 'AcadeX Portal';
    }
  };

  return (
    <header className="h-17 px-6 bg-white dark:bg-[#111A30] border-b border-stone-200 dark:border-stone-800/90 flex items-center justify-between sticky top-0 z-30 select-none shadow-2xs">
      {/* Zone 1: Breadcrumb and Context */}
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-base md:text-lg font-bold text-stone-900 dark:text-white truncate font-display">
          {getBreadcrumb()}
        </span>
        <span className="hidden md:inline text-xs text-amber-900 dark:text-amber-300 font-mono bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 px-2.5 py-0.5 rounded-md font-semibold">
          Fall Semester · Term IV
        </span>
      </div>

      {/* Zone 2: Navigation Shortcuts with Classic Academic Ivy Links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
        <button
          onClick={() => setCurrentTab('timetable')}
          className={`transition-colors py-1 ${
            currentTab === 'timetable'
              ? 'text-stone-900 dark:text-amber-200 font-bold border-b-2 border-amber-600 font-display'
              : 'hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          Daily Schedule
        </button>
        <button
          onClick={() => setCurrentTab('academic')}
          className={`transition-colors py-1 ${
            currentTab === 'academic'
              ? 'text-stone-900 dark:text-amber-200 font-bold border-b-2 border-amber-600 font-display'
              : 'hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          Course Material
        </button>
        <button
          onClick={() => setCurrentTab('calendar')}
          className={`transition-colors py-1 ${
            currentTab === 'calendar'
              ? 'text-stone-900 dark:text-amber-200 font-bold border-b-2 border-amber-600 font-display'
              : 'hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          Examinations
        </button>
        <button
          onClick={() => setCurrentTab('canteen')}
          className={`transition-colors py-1 ${
            currentTab === 'canteen'
              ? 'text-stone-900 dark:text-amber-200 font-bold border-b-2 border-amber-600 font-display'
              : 'hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          Dining Menu
        </button>
      </nav>

      {/* Zone 3: Actions & Notifications */}
      <div className="flex items-center gap-3 relative">
        {/* Quick Add Action Menu in Collegiate Navy & Bronze */}
        <div className="relative">
          <button
            onClick={() => {
              if (userRole === 'faculty') onOpenQuickModal('note');
              else onOpenQuickModal('calendar');
            }}
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg bg-[#172554] hover:bg-[#1E3A8A] text-amber-300 dark:bg-[#1E3A8A] dark:hover:bg-[#254BAA] dark:text-amber-200 transition-colors shadow-2xs whitespace-nowrap border border-amber-600/40 font-display"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>
              {userRole === 'faculty' ? 'Publish Material' : 'Schedule Event'}
            </span>
          </button>
        </div>

        {/* Notifications Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-lg text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
            title="Academic Notices"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-600 ring-2 ring-white dark:ring-[#111A30]" />
            )}
          </button>

          {/* Notifications Dropdown Tray */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-84 md:w-96 bg-white dark:bg-[#111A30] rounded-xl shadow-xl border border-stone-200 dark:border-stone-800 py-3 z-50">
              <div className="px-4 pb-2.5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-stone-900 dark:text-white font-display">
                    Campus Notices
                  </span>
                  {unreadCount > 0 && (
                    <span className="text-xs font-mono tabular-nums text-amber-900 dark:text-amber-200 bg-amber-100/90 dark:bg-amber-950/80 px-2 py-0.5 rounded font-semibold border border-amber-300 dark:border-amber-800">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-medium font-display"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-84 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-sm text-stone-400">
                    No active notices
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        if (notif.actionView) {
                          setCurrentTab(notif.actionView as any);
                          setShowNotifications(false);
                        }
                      }}
                      className={`p-3.5 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors cursor-pointer text-left ${
                        !notif.read ? 'bg-amber-50/40 dark:bg-amber-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-stone-900 dark:text-white font-display">
                          {notif.title}
                        </span>
                        <span className="text-xs text-stone-400 font-mono tabular-nums shrink-0">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 line-clamp-2">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
