import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AcademicSubject,
  ClassPeriod,
  LectureNote,
  Assignment,
  CanteenItem,
  CampusEvent,
  CampusClub,
  CalendarEntry,
  AppNotification,
  DayOfWeek,
  UserRole
} from '../types';
import {
  INITIAL_SUBJECTS,
  INITIAL_TIMETABLE,
  INITIAL_ASSIGNMENTS,
  INITIAL_LECTURE_NOTES,
  INITIAL_CANTEEN_ITEMS,
  INITIAL_CLUBS,
  INITIAL_EVENTS,
  INITIAL_CALENDAR_ENTRIES,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';

interface AppContextType {
  // Navigation & Role
  currentTab: 'dashboard' | 'timetable' | 'academic' | 'campus' | 'calendar' | 'canteen';
  setCurrentTab: (tab: 'dashboard' | 'timetable' | 'academic' | 'campus' | 'calendar' | 'canteen') => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  selectedSubjectId: string | null;
  setSelectedSubjectId: (id: string | null) => void;

  // Timetable
  timetable: ClassPeriod[];
  selectedDay: DayOfWeek;
  setSelectedDay: (day: DayOfWeek) => void;
  updatePeriod: (periodId: string, updates: Partial<ClassPeriod>) => void;
  updateAttendance: (periodId: string, status: 'present' | 'absent' | 'excused' | 'unmarked') => void;

  // Subjects & Notes
  subjects: AcademicSubject[];
  lectureNotes: LectureNote[];
  addLectureNote: (note: Omit<LectureNote, 'id' | 'downloadCount' | 'dateUploaded'>) => void;
  downloadNote: (noteId: string) => void;

  // Assignments
  assignments: Assignment[];
  addAssignment: (assignment: Omit<Assignment, 'id' | 'status'>) => void;
  submitAssignment: (assignmentId: string, submissionText: string) => void;
  toggleAssignmentComplete: (assignmentId: string) => void;

  // Canteen
  canteenItems: CanteenItem[];
  toggleCanteenAvailability: (itemId: string) => void;
  cartItems: { item: CanteenItem; quantity: number }[];
  addToCart: (item: CanteenItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;

  // Campus Events & Clubs
  events: CampusEvent[];
  clubs: CampusClub[];
  toggleEventRsvp: (eventId: string) => void;
  toggleClubMembership: (clubId: string) => void;
  addEvent: (event: Omit<CampusEvent, 'id' | 'attendeeCount' | 'isRsvpd'>) => void;
  addClubAnnouncement: (clubId: string, title: string, content: string) => void;

  // Calendar
  calendarEntries: CalendarEntry[];
  addCalendarEntry: (entry: Omit<CalendarEntry, 'id'>) => void;
  updateCalendarEntry: (id: string, updates: Partial<CalendarEntry>) => void;
  deleteCalendarEntry: (id: string) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (title: string, message: string, type: AppNotification['type'], actionView?: string) => void;

  // Reset to initial state helper
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'timetable' | 'academic' | 'campus' | 'calendar' | 'canteen'>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>('cs301');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');

  // Timetable state
  const [timetable, setTimetable] = useState<ClassPeriod[]>(() => {
    const saved = localStorage.getItem('campuspulse_timetable');
    return saved ? JSON.parse(saved) : INITIAL_TIMETABLE;
  });

  // Subjects state
  const [subjects] = useState<AcademicSubject[]>(INITIAL_SUBJECTS);

  // Lecture notes state
  const [lectureNotes, setLectureNotes] = useState<LectureNote[]>(() => {
    const saved = localStorage.getItem('campuspulse_notes');
    return saved ? JSON.parse(saved) : INITIAL_LECTURE_NOTES;
  });

  // Assignments state
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('campuspulse_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  // Canteen items state
  const [canteenItems, setCanteenItems] = useState<CanteenItem[]>(() => {
    const saved = localStorage.getItem('campuspulse_canteen');
    return saved ? JSON.parse(saved) : INITIAL_CANTEEN_ITEMS;
  });

  // Pre-order cart
  const [cartItems, setCartItems] = useState<{ item: CanteenItem; quantity: number }[]>([]);

  // Campus clubs state
  const [clubs, setClubs] = useState<CampusClub[]>(() => {
    const saved = localStorage.getItem('campuspulse_clubs');
    return saved ? JSON.parse(saved) : INITIAL_CLUBS;
  });

  // Campus events state
  const [events, setEvents] = useState<CampusEvent[]>(() => {
    const saved = localStorage.getItem('campuspulse_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  // Calendar entries state
  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>(() => {
    const saved = localStorage.getItem('campuspulse_calendar');
    return saved ? JSON.parse(saved) : INITIAL_CALENDAR_ENTRIES;
  });

  // Notifications state
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('campuspulse_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // LocalStorage synchronizations
  useEffect(() => {
    localStorage.setItem('campuspulse_timetable', JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem('campuspulse_notes', JSON.stringify(lectureNotes));
  }, [lectureNotes]);

  useEffect(() => {
    localStorage.setItem('campuspulse_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('campuspulse_canteen', JSON.stringify(canteenItems));
  }, [canteenItems]);

  useEffect(() => {
    localStorage.setItem('campuspulse_clubs', JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem('campuspulse_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('campuspulse_calendar', JSON.stringify(calendarEntries));
  }, [calendarEntries]);

  useEffect(() => {
    localStorage.setItem('campuspulse_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Handler functions
  const updatePeriod = (periodId: string, updates: Partial<ClassPeriod>) => {
    setTimetable(prev =>
      prev.map(item => (item.id === periodId ? { ...item, ...updates } : item))
    );
  };

  const updateAttendance = (periodId: string, status: 'present' | 'absent' | 'excused' | 'unmarked') => {
    setTimetable(prev =>
      prev.map(item => (item.id === periodId ? { ...item, attendanceStatus: status } : item))
    );
  };

  const addLectureNote = (note: Omit<LectureNote, 'id' | 'downloadCount' | 'dateUploaded'>) => {
    const newNote: LectureNote = {
      ...note,
      id: `note-${Date.now()}`,
      dateUploaded: new Date().toISOString().split('T')[0],
      downloadCount: 1
    };
    setLectureNotes(prev => [newNote, ...prev]);
    addNotification(
      'New Material Uploaded',
      `"${newNote.title}" was published under ${newNote.subjectName}`,
      'schedule',
      'academic'
    );
  };

  const downloadNote = (noteId: string) => {
    setLectureNotes(prev =>
      prev.map(note =>
        note.id === noteId ? { ...note, downloadCount: note.downloadCount + 1 } : note
      )
    );
  };

  const addAssignment = (assignment: Omit<Assignment, 'id' | 'status'>) => {
    const newAsg: Assignment = {
      ...assignment,
      id: `asg-${Date.now()}`,
      status: 'pending'
    };
    setAssignments(prev => [newAsg, ...prev]);
    addNotification(
      'New Class Assignment',
      `${newAsg.title} added to ${newAsg.subjectName}`,
      'assignment',
      'academic'
    );
  };

  const submitAssignment = (assignmentId: string, submissionText: string) => {
    setAssignments(prev =>
      prev.map(asg => {
        if (asg.id === assignmentId) {
          return {
            ...asg,
            status: 'submitted',
            submissionText,
            submittedAt: new Date().toISOString()
          };
        }
        return asg;
      })
    );
    addNotification('Assignment Submitted', 'Your submission has been recorded successfully.', 'assignment', 'academic');
  };

  const toggleAssignmentComplete = (assignmentId: string) => {
    setAssignments(prev =>
      prev.map(asg => {
        if (asg.id === assignmentId) {
          const isDone = asg.status === 'completed' || asg.status === 'submitted' || asg.status === 'graded';
          const nextStatus = isDone ? 'pending' : 'completed';
          const nowIso = new Date().toISOString();
          
          addNotification(
            nextStatus === 'completed' ? 'Task Marked Completed ✓' : 'Task Marked as Pending',
            `"${asg.title}" (${asg.subjectName}) marked as ${nextStatus === 'completed' ? 'completed' : 'pending'}.`,
            'assignment',
            'academic'
          );

          return {
            ...asg,
            status: nextStatus,
            completedAt: nextStatus === 'completed' ? nowIso : undefined,
            submittedAt: nextStatus === 'completed' ? (asg.submittedAt || nowIso) : undefined
          };
        }
        return asg;
      })
    );
  };

  const toggleCanteenAvailability = (itemId: string) => {
    setCanteenItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const nextAvailable = !item.isAvailable;
          addNotification(
            'Canteen Stock Update',
            `${item.name} is now marked ${nextAvailable ? 'In Stock & Available' : 'Sold Out'}`,
            'canteen',
            'canteen'
          );
          return {
            ...item,
            isAvailable: nextAvailable,
            stockCount: nextAvailable ? (item.stockCount > 0 ? item.stockCount : 15) : 0
          };
        }
        return item;
      })
    );
  };

  const addToCart = (item: CanteenItem) => {
    if (!item.isAvailable) return;
    setCartItems(prev => {
      const existing = prev.find(p => p.item.id === item.id);
      if (existing) {
        return prev.map(p =>
          p.item.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(p =>
          p.item.id === itemId ? { ...p, quantity: p.quantity - 1 } : p
        );
      }
      return prev.filter(p => p.item.id !== itemId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleEventRsvp = (eventId: string) => {
    setEvents(prev =>
      prev.map(event => {
        if (event.id === eventId) {
          const nextState = !event.isRsvpd;
          return {
            ...event,
            isRsvpd: nextState,
            attendeeCount: nextState ? event.attendeeCount + 1 : Math.max(0, event.attendeeCount - 1)
          };
        }
        return event;
      })
    );
  };

  const toggleClubMembership = (clubId: string) => {
    setClubs(prev =>
      prev.map(club => {
        if (club.id === clubId) {
          const nextState = !club.isMember;
          return {
            ...club,
            isMember: nextState,
            memberCount: nextState ? club.memberCount + 1 : club.memberCount - 1
          };
        }
        return club;
      })
    );
  };

  const addEvent = (event: Omit<CampusEvent, 'id' | 'attendeeCount' | 'isRsvpd'>) => {
    const newEvent: CampusEvent = {
      ...event,
      id: `event-${Date.now()}`,
      attendeeCount: 1,
      isRsvpd: true
    };
    setEvents(prev => [newEvent, ...prev]);

    // Also add to academic calendar automatically!
    addCalendarEntry({
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      type: 'Event',
      location: newEvent.venue,
      description: newEvent.description
    });

    addNotification(
      'New Campus Event Added',
      `${newEvent.title} on ${newEvent.date}`,
      'event',
      'campus'
    );
  };

  const addClubAnnouncement = (clubId: string, title: string, content: string) => {
    setClubs(prev =>
      prev.map(club => {
        if (club.id === clubId) {
          return {
            ...club,
            announcements: [
              {
                id: `ann-${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                title,
                content
              },
              ...club.announcements
            ]
          };
        }
        return club;
      })
    );
  };

  const addCalendarEntry = (entry: Omit<CalendarEntry, 'id'>) => {
    const newEntry: CalendarEntry = {
      ...entry,
      id: `cal-${Date.now()}`,
      isCustom: true
    };
    setCalendarEntries(prev => [...prev, newEntry]);
    addNotification(
      'Calendar Event Scheduled',
      `${newEntry.title} on ${newEntry.date}`,
      newEntry.type === 'Exam' ? 'exam' : 'schedule',
      'calendar'
    );
  };

  const updateCalendarEntry = (id: string, updates: Partial<CalendarEntry>) => {
    setCalendarEntries(prev =>
      prev.map(entry => (entry.id === id ? { ...entry, ...updates } : entry))
    );
  };

  const deleteCalendarEntry = (id: string) => {
    setCalendarEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (title: string, message: string, type: AppNotification['type'], actionView?: string) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false,
      actionView
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const resetToDefaults = () => {
    setTimetable(INITIAL_TIMETABLE);
    setAssignments(INITIAL_ASSIGNMENTS);
    setLectureNotes(INITIAL_LECTURE_NOTES);
    setCanteenItems(INITIAL_CANTEEN_ITEMS);
    setClubs(INITIAL_CLUBS);
    setEvents(INITIAL_EVENTS);
    setCalendarEntries(INITIAL_CALENDAR_ENTRIES);
    setNotifications(INITIAL_NOTIFICATIONS);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        userRole,
        setUserRole,
        selectedSubjectId,
        setSelectedSubjectId,
        timetable,
        selectedDay,
        setSelectedDay,
        updatePeriod,
        updateAttendance,
        subjects,
        lectureNotes,
        addLectureNote,
        downloadNote,
        assignments,
        addAssignment,
        submitAssignment,
        toggleAssignmentComplete,
        canteenItems,
        toggleCanteenAvailability,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        events,
        clubs,
        toggleEventRsvp,
        toggleClubMembership,
        addEvent,
        addClubAnnouncement,
        calendarEntries,
        addCalendarEntry,
        updateCalendarEntry,
        deleteCalendarEntry,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
