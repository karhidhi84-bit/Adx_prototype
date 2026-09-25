import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardView } from './components/DashboardView';
import { TimetableView } from './components/TimetableView';
import { AcademicView } from './components/AcademicView';
import { CampusView } from './components/CampusView';
import { CalendarView } from './components/CalendarView';
import { CanteenView } from './components/CanteenView';
import { Modals } from './components/Modals';
import { ClassPeriod, CalendarEntry } from './types';
import { Menu, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentTab } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal manager state
  const [modalState, setModalState] = useState<{
    type: 'editPeriod' | 'uploadNote' | 'createAssignment' | 'submitAssignment' | 'calendarEvent' | 'clubNotice' | 'createEvent' | null;
    data?: any;
  }>({ type: null });

  const closeModal = () => setModalState({ type: null });

  return (
    <div className="flex h-screen bg-[#FAF8F5] dark:bg-[#0B1329] text-stone-900 dark:text-stone-100 overflow-hidden font-sans">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-950/60 md:hidden backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop and Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header Bar with Hamburger */}
        <div className="md:hidden flex items-center justify-between p-3.5 bg-white dark:bg-[#111A30] border-b border-stone-200 dark:border-stone-800">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-extrabold text-lg text-stone-900 dark:text-white font-display">
            Acade<span className="text-amber-700 dark:text-amber-500">X</span>
          </span>
          <div className="w-6" />
        </div>

        {/* Desktop Top Bar Contract */}
        <TopHeader
          onOpenQuickModal={(type) => {
            if (type === 'note') {
              setModalState({ type: 'uploadNote' });
            } else if (type === 'calendar') {
              setModalState({ type: 'calendarEvent' });
            } else if (type === 'assignment') {
              setModalState({ type: 'createAssignment' });
            } else if (type === 'event') {
              setModalState({ type: 'createEvent' });
            }
          }}
        />

        {/* Scrollable Content Arena */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto pb-14">
            {currentTab === 'dashboard' && (
              <DashboardView
                onSelectPeriod={(period: ClassPeriod) =>
                  setModalState({ type: 'editPeriod', data: period })
                }
                onOpenSubmitAssignment={(assignmentId: string) =>
                  setModalState({ type: 'submitAssignment', data: { assignmentId } })
                }
              />
            )}

            {currentTab === 'timetable' && (
              <TimetableView
                onSelectPeriod={(period: ClassPeriod) =>
                  setModalState({ type: 'editPeriod', data: period })
                }
              />
            )}

            {currentTab === 'academic' && (
              <AcademicView
                onOpenUploadNote={(subjectId: string) =>
                  setModalState({ type: 'uploadNote', data: { subjectId } })
                }
                onOpenCreateAssignment={(subjectId: string) =>
                  setModalState({ type: 'createAssignment', data: { subjectId } })
                }
                onOpenSubmitAssignment={(assignmentId: string) =>
                  setModalState({ type: 'submitAssignment', data: { assignmentId } })
                }
              />
            )}

            {currentTab === 'campus' && (
              <CampusView
                onOpenCreateEvent={() => setModalState({ type: 'createEvent' })}
                onOpenCreateClubAnnouncement={(clubId: string) =>
                  setModalState({ type: 'clubNotice', data: { clubId } })
                }
              />
            )}

            {currentTab === 'calendar' && (
              <CalendarView
                onOpenAddEvent={(prefilledDate?: string) =>
                  setModalState({ type: 'calendarEvent', data: { prefilledDate } })
                }
                onOpenEditEvent={(entry: CalendarEntry) =>
                  setModalState({ type: 'calendarEvent', data: { entry } })
                }
              />
            )}

            {currentTab === 'canteen' && <CanteenView />}
          </div>
        </main>
      </div>

      {/* Global Modals Manager */}
      <Modals modalState={modalState} onClose={closeModal} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
