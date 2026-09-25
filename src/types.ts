export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export type UserRole = 'student' | 'faculty' | 'canteen_staff';

export interface ClassPeriod {
  id: string;
  periodNumber: 1 | 2 | 3 | 4 | 5 | 6;
  timeSlot: string; // e.g. "08:30 - 09:30 AM"
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  room: string;
  building: string;
  instructor: string;
  type: 'Lecture' | 'Lab' | 'Tutorial' | 'Seminar';
  day: DayOfWeek;
  notes?: string;
  attendanceStatus?: 'present' | 'absent' | 'excused' | 'unmarked';
}

export interface AcademicSubject {
  id: string;
  code: string;
  name: string;
  professor: string;
  professorEmail: string;
  officeHours: string;
  room: string;
  credits: number;
  color: string;
  description: string;
  department: string;
}

export interface LectureNote {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  unit: string;
  dateUploaded: string;
  uploadedBy: string;
  role: 'Professor' | 'Teaching Assistant' | 'Student';
  fileType: 'PDF' | 'Slides' | 'Code' | 'Document';
  fileSize: string;
  downloadCount: number;
  summary: string;
  keyTopics: string[];
}

export interface Assignment {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  description: string;
  dueDate: string; // ISO format or YYYY-MM-DDTHH:mm
  points: number;
  priority: 'urgent' | 'medium' | 'low';
  category: 'Homework' | 'Project' | 'Lab Report' | 'Quiz Prep' | 'Essay';
  status: 'pending' | 'completed' | 'submitted' | 'graded';
  grade?: string;
  rubricSummary?: string;
  submissionText?: string;
  submittedAt?: string;
  completedAt?: string;
  attachments?: string[];
}

export interface CanteenItem {
  id: string;
  name: string;
  category: 'Breakfast' | 'Lunch Specials' | 'Beverages & Coffee' | 'Quick Snacks' | 'Healthy Bowls';
  price: number;
  isAvailable: boolean;
  prepTime: string;
  rating: number;
  calories: number;
  dietary: ('Vegetarian' | 'Vegan' | 'Gluten-Free' | 'High-Protein' | 'Halal')[];
  description: string;
  imageUrl?: string;
  counterLocation: string;
  stockCount: number;
}

export interface CampusEvent {
  id: string;
  title: string;
  category: 'Academic' | 'Cultural Fest' | 'Hackathon & Tech' | 'Sports' | 'Career & Workshop';
  date: string; // YYYY-MM-DD
  time: string;
  venue: string;
  organizer: string;
  description: string;
  isRsvpd: boolean;
  attendeeCount: number;
  imageUrl?: string;
  tags: string[];
}

export interface ClubAnnouncement {
  id: string;
  date: string;
  title: string;
  content: string;
}

export interface CampusClub {
  id: string;
  name: string;
  category: 'Technology' | 'Debate & Arts' | 'Social & Service' | 'Sports & Athletics' | 'Academic';
  description: string;
  president: string;
  contactEmail: string;
  regularMeeting: string;
  location: string;
  memberCount: number;
  isMember: boolean;
  announcements: ClubAnnouncement[];
}

export interface CalendarEntry {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  type: 'Exam' | 'Assignment' | 'Event' | 'Holiday' | 'Academic Milestone';
  subjectCode?: string;
  description?: string;
  location?: string;
  isCustom?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'assignment' | 'canteen' | 'exam' | 'event' | 'schedule';
  read: boolean;
  actionView?: string;
}
