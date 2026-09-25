import {
  AcademicSubject,
  ClassPeriod,
  LectureNote,
  Assignment,
  CanteenItem,
  CampusEvent,
  CampusClub,
  CalendarEntry,
  AppNotification
} from '../types';

export const INITIAL_SUBJECTS: AcademicSubject[] = [
  {
    id: 'cs301',
    code: 'CS-301',
    name: 'Distributed Systems & Algorithms',
    professor: 'Dr. Elena Vance',
    professorEmail: 'e.vance@university.edu',
    officeHours: 'Tue & Thu 02:00 PM - 04:00 PM',
    room: 'Turing Hall 402',
    credits: 4,
    color: 'indigo',
    description: 'Consensus protocols, Raft, Paxos, fault tolerance, and vector clocks in modern cloud computing.',
    department: 'Computer Science & Engineering',
  },
  {
    id: 'math240',
    code: 'MATH-240',
    name: 'Linear Algebra & Optimization',
    professor: 'Prof. Marcus Chen',
    professorEmail: 'm.chen@university.edu',
    officeHours: 'Mon & Wed 10:00 AM - 12:00 PM',
    room: 'Euler Science Bldg 108',
    credits: 4,
    color: 'emerald',
    description: 'Eigenvalues, SVD decomposition, convex optimization, and matrix calculus applied to high-dimensional data.',
    department: 'Mathematics & Statistics',
  },
  {
    id: 'phys210',
    code: 'PHYS-210',
    name: 'Quantum & Wave Mechanics',
    professor: 'Dr. Aris Thorne',
    professorEmail: 'a.thorne@university.edu',
    officeHours: 'Friday 01:00 PM - 03:30 PM',
    room: 'Curie Lab 214',
    credits: 4,
    color: 'violet',
    description: 'Wave functions, Schrödinger equation, harmonic oscillators, and experimental photonics laboratory.',
    department: 'Physical Sciences',
  },
  {
    id: 'ds220',
    code: 'DS-220',
    name: 'Applied Machine Learning',
    professor: 'Dr. Sophia Ramos',
    professorEmail: 's.ramos@university.edu',
    officeHours: 'Wednesday 03:00 PM - 05:00 PM',
    room: 'Hopper Complex 310',
    credits: 3,
    color: 'amber',
    description: 'Supervised and unsupervised learning, transformers, loss functions, and ethical AI deployment.',
    department: 'Data Science & AI',
  },
  {
    id: 'lit180',
    code: 'LIT-180',
    name: 'Modern World Literature & Ethics',
    professor: 'Prof. Julian Sterling',
    professorEmail: 'j.sterling@university.edu',
    officeHours: 'Mon 01:00 PM - 03:00 PM',
    room: 'Milton Hall 102',
    credits: 3,
    color: 'rose',
    description: 'Comparative 20th and 21st-century global prose, narrative theory, post-colonial discourse, and rhetoric.',
    department: 'Humanities & Social Sciences',
  },
  {
    id: 'sec310',
    code: 'SEC-310',
    name: 'Network Security & Cryptography',
    professor: 'Dr. Tariq Al-Mansoor',
    professorEmail: 't.mansoor@university.edu',
    officeHours: 'Thursday 11:00 AM - 01:00 PM',
    room: 'Shannon Cyber Lab 205',
    credits: 4,
    color: 'teal',
    description: 'Public key infrastructure, cryptographic protocols, zero-knowledge proofs, and network defense architecture.',
    department: 'Cybersecurity',
  }
];

// Bell schedule: 6 classes every weekday (09:05 AM to 04:00 PM)
// 10 min break at 11:10 AM, 50 min lunch break at 12:15 PM, 10 min break at 02:55 PM
export const BELL_SCHEDULE = [
  { period: 1, timeSlot: '09:05 - 10:05 AM' },
  { period: 2, timeSlot: '10:10 - 11:10 AM' },
  { period: 3, timeSlot: '11:20 AM - 12:15 PM' },
  { period: 4, timeSlot: '01:05 - 02:00 PM' },
  { period: 5, timeSlot: '02:00 - 02:55 PM' },
  { period: 6, timeSlot: '03:05 - 04:00 PM' },
];

export const SCHEDULE_BREAKS = [
  {
    id: 'morning-recess',
    afterPeriod: 2,
    name: 'Morning Recess Break',
    timeSlot: '11:10 - 11:20 AM',
    duration: '10 mins',
    description: 'Quick refreshment & classroom change break'
  },
  {
    id: 'lunch-recess',
    afterPeriod: 3,
    name: 'Midday Campus Lunch Break',
    timeSlot: '12:15 - 01:05 PM',
    duration: '50 mins',
    description: 'Central cafeteria dining & campus recess'
  },
  {
    id: 'afternoon-recess',
    afterPeriod: 5,
    name: 'Afternoon Recess Break',
    timeSlot: '02:55 - 03:05 PM',
    duration: '10 mins',
    description: 'Short campus rest before final period'
  }
];

export const INITIAL_TIMETABLE: ClassPeriod[] = [
  // MONDAY (6 classes)
  {
    id: 'mon-1',
    periodNumber: 1,
    timeSlot: '09:05 - 10:05 AM',
    subjectId: 'cs301',
    subjectName: 'Distributed Systems & Algorithms',
    subjectCode: 'CS-301',
    room: 'Turing Hall 402',
    building: 'Engineering Block A',
    instructor: 'Dr. Elena Vance',
    type: 'Lecture',
    day: 'Monday',
    notes: 'Review Byzantine Fault Tolerance before class',
    attendanceStatus: 'present'
  },
  {
    id: 'mon-2',
    periodNumber: 2,
    timeSlot: '10:10 - 11:10 AM',
    subjectId: 'math240',
    subjectName: 'Linear Algebra & Optimization',
    subjectCode: 'MATH-240',
    room: 'Euler Bldg 108',
    building: 'Science Pavilion',
    instructor: 'Prof. Marcus Chen',
    type: 'Lecture',
    day: 'Monday',
    notes: 'Bring graph notebook for spectral theorem exercises',
    attendanceStatus: 'present'
  },
  {
    id: 'mon-3',
    periodNumber: 3,
    timeSlot: '11:20 AM - 12:15 PM',
    subjectId: 'phys210',
    subjectName: 'Quantum & Wave Mechanics',
    subjectCode: 'PHYS-210',
    room: 'Curie Lab 214',
    building: 'Natural Sciences Hub',
    instructor: 'Dr. Aris Thorne',
    type: 'Lecture',
    day: 'Monday',
    notes: 'Schrödinger equation boundary value derivations',
    attendanceStatus: 'present'
  },
  {
    id: 'mon-4',
    periodNumber: 4,
    timeSlot: '01:05 - 02:00 PM',
    subjectId: 'ds220',
    subjectName: 'Applied Machine Learning',
    subjectCode: 'DS-220',
    room: 'Hopper Complex 310',
    building: 'Computing Wing',
    instructor: 'Dr. Sophia Ramos',
    type: 'Lab',
    day: 'Monday',
    notes: 'Bring Jupyter environment with PyTorch pre-loaded',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'mon-5',
    periodNumber: 5,
    timeSlot: '02:00 - 02:55 PM',
    subjectId: 'sec310',
    subjectName: 'Network Security & Cryptography',
    subjectCode: 'SEC-310',
    room: 'Shannon Cyber Lab 205',
    building: 'Cyber Annex',
    instructor: 'Dr. Tariq Al-Mansoor',
    type: 'Lecture',
    day: 'Monday',
    notes: 'Wireshark packet capture analysis preview',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'mon-6',
    periodNumber: 6,
    timeSlot: '03:05 - 04:00 PM',
    subjectId: 'lit180',
    subjectName: 'Modern World Literature & Ethics',
    subjectCode: 'LIT-180',
    room: 'Milton Hall 102',
    building: 'Liberal Arts Wing',
    instructor: 'Prof. Julian Sterling',
    type: 'Seminar',
    day: 'Monday',
    notes: 'Group discussion on Post-War existential memoirs',
    attendanceStatus: 'unmarked'
  },

  // TUESDAY (6 classes)
  {
    id: 'tue-1',
    periodNumber: 1,
    timeSlot: '09:05 - 10:05 AM',
    subjectId: 'math240',
    subjectName: 'Linear Algebra & Optimization',
    subjectCode: 'MATH-240',
    room: 'Euler Bldg 108',
    building: 'Science Pavilion',
    instructor: 'Prof. Marcus Chen',
    type: 'Tutorial',
    day: 'Tuesday',
    notes: 'Problem set #4 walkthrough',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'tue-2',
    periodNumber: 2,
    timeSlot: '10:10 - 11:10 AM',
    subjectId: 'cs301',
    subjectName: 'Distributed Systems & Algorithms',
    subjectCode: 'CS-301',
    room: 'Turing Hall 402',
    building: 'Engineering Block A',
    instructor: 'Dr. Elena Vance',
    type: 'Lecture',
    day: 'Tuesday',
    notes: 'Raft consensus state machine replication',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'tue-3',
    periodNumber: 3,
    timeSlot: '11:20 AM - 12:15 PM',
    subjectId: 'sec310',
    subjectName: 'Network Security & Cryptography',
    subjectCode: 'SEC-310',
    room: 'Shannon Cyber Lab 205',
    building: 'Cyber Annex',
    instructor: 'Dr. Tariq Al-Mansoor',
    type: 'Lab',
    day: 'Tuesday',
    notes: 'Hands-on RSA key pair generation & attack simulation',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'tue-4',
    periodNumber: 4,
    timeSlot: '01:05 - 02:00 PM',
    subjectId: 'phys210',
    subjectName: 'Quantum & Wave Mechanics',
    subjectCode: 'PHYS-210',
    room: 'Curie Lab 214',
    building: 'Natural Sciences Hub',
    instructor: 'Dr. Aris Thorne',
    type: 'Lab',
    day: 'Tuesday',
    notes: 'Interferometer experiment & optical wavelength calibration',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'tue-5',
    periodNumber: 5,
    timeSlot: '02:00 - 02:55 PM',
    subjectId: 'ds220',
    subjectName: 'Applied Machine Learning',
    subjectCode: 'DS-220',
    room: 'Hopper Complex 310',
    building: 'Computing Wing',
    instructor: 'Dr. Sophia Ramos',
    type: 'Lecture',
    day: 'Tuesday',
    notes: 'Gradient descent variants and Adam optimizer analysis',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'tue-6',
    periodNumber: 6,
    timeSlot: '03:05 - 04:00 PM',
    subjectId: 'lit180',
    subjectName: 'Modern World Literature & Ethics',
    subjectCode: 'LIT-180',
    room: 'Milton Hall 102',
    building: 'Liberal Arts Wing',
    instructor: 'Prof. Julian Sterling',
    type: 'Lecture',
    day: 'Tuesday',
    notes: 'Narrative structures and voice in contemporary poetry',
    attendanceStatus: 'unmarked'
  },

  // WEDNESDAY (6 classes)
  {
    id: 'wed-1',
    periodNumber: 1,
    timeSlot: '09:05 - 10:05 AM',
    subjectId: 'cs301',
    subjectName: 'Distributed Systems & Algorithms',
    subjectCode: 'CS-301',
    room: 'Turing Hall 402',
    building: 'Engineering Block A',
    instructor: 'Dr. Elena Vance',
    type: 'Lab',
    day: 'Wednesday',
    notes: 'Distributed node heartbeat simulator check-in',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'wed-2',
    periodNumber: 2,
    timeSlot: '10:10 - 11:10 AM',
    subjectId: 'math240',
    subjectName: 'Linear Algebra & Optimization',
    subjectCode: 'MATH-240',
    room: 'Euler Bldg 108',
    building: 'Science Pavilion',
    instructor: 'Prof. Marcus Chen',
    type: 'Lecture',
    day: 'Wednesday',
    notes: 'Singular Value Decomposition applications in PCA',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'wed-3',
    periodNumber: 3,
    timeSlot: '11:20 AM - 12:15 PM',
    subjectId: 'phys210',
    subjectName: 'Quantum & Wave Mechanics',
    subjectCode: 'PHYS-210',
    room: 'Curie Lab 214',
    building: 'Natural Sciences Hub',
    instructor: 'Dr. Aris Thorne',
    type: 'Lecture',
    day: 'Wednesday',
    notes: 'Heisenberg uncertainty principle proofs',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'wed-4',
    periodNumber: 4,
    timeSlot: '01:05 - 02:00 PM',
    subjectId: 'sec310',
    subjectName: 'Network Security & Cryptography',
    subjectCode: 'SEC-310',
    room: 'Shannon Cyber Lab 205',
    building: 'Cyber Annex',
    instructor: 'Dr. Tariq Al-Mansoor',
    type: 'Lecture',
    day: 'Wednesday',
    notes: 'Elliptic curve cryptography math fundamentals',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'wed-5',
    periodNumber: 5,
    timeSlot: '02:00 - 02:55 PM',
    subjectId: 'ds220',
    subjectName: 'Applied Machine Learning',
    subjectCode: 'DS-220',
    room: 'Hopper Complex 310',
    building: 'Computing Wing',
    instructor: 'Dr. Sophia Ramos',
    type: 'Tutorial',
    day: 'Wednesday',
    notes: 'Model validation, cross-validation, and ROC-AUC',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'wed-6',
    periodNumber: 6,
    timeSlot: '03:05 - 04:00 PM',
    subjectId: 'lit180',
    subjectName: 'Modern World Literature & Ethics',
    subjectCode: 'LIT-180',
    room: 'Milton Hall 102',
    building: 'Liberal Arts Wing',
    instructor: 'Prof. Julian Sterling',
    type: 'Seminar',
    day: 'Wednesday',
    notes: 'Peer review session on mid-term thesis outlines',
    attendanceStatus: 'unmarked'
  },

  // THURSDAY (6 classes)
  {
    id: 'thu-1',
    periodNumber: 1,
    timeSlot: '09:05 - 10:05 AM',
    subjectId: 'ds220',
    subjectName: 'Applied Machine Learning',
    subjectCode: 'DS-220',
    room: 'Hopper Complex 310',
    building: 'Computing Wing',
    instructor: 'Dr. Sophia Ramos',
    type: 'Lecture',
    day: 'Thursday',
    notes: 'Convolutional neural networks for spatial vision tasks',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'thu-2',
    periodNumber: 2,
    timeSlot: '10:10 - 11:10 AM',
    subjectId: 'cs301',
    subjectName: 'Distributed Systems & Algorithms',
    subjectCode: 'CS-301',
    room: 'Turing Hall 402',
    building: 'Engineering Block A',
    instructor: 'Dr. Elena Vance',
    type: 'Lecture',
    day: 'Thursday',
    notes: 'Vector clocks and causal consistency models',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'thu-3',
    periodNumber: 3,
    timeSlot: '11:20 AM - 12:15 PM',
    subjectId: 'math240',
    subjectName: 'Linear Algebra & Optimization',
    subjectCode: 'MATH-240',
    room: 'Euler Bldg 108',
    building: 'Science Pavilion',
    instructor: 'Prof. Marcus Chen',
    type: 'Lecture',
    day: 'Thursday',
    notes: 'Lagrange multipliers & constrained optimization',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'thu-4',
    periodNumber: 4,
    timeSlot: '01:05 - 02:00 PM',
    subjectId: 'phys210',
    subjectName: 'Quantum & Wave Mechanics',
    subjectCode: 'PHYS-210',
    room: 'Curie Lab 214',
    building: 'Natural Sciences Hub',
    instructor: 'Dr. Aris Thorne',
    type: 'Seminar',
    day: 'Thursday',
    notes: 'Superposition in quantum computing qubits',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'thu-5',
    periodNumber: 5,
    timeSlot: '02:00 - 02:55 PM',
    subjectId: 'sec310',
    subjectName: 'Network Security & Cryptography',
    subjectCode: 'SEC-310',
    room: 'Shannon Cyber Lab 205',
    building: 'Cyber Annex',
    instructor: 'Dr. Tariq Al-Mansoor',
    type: 'Tutorial',
    day: 'Thursday',
    notes: 'Firewall rules and intrusion detection system configs',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'thu-6',
    periodNumber: 6,
    timeSlot: '03:05 - 04:00 PM',
    subjectId: 'lit180',
    subjectName: 'Modern World Literature & Ethics',
    subjectCode: 'LIT-180',
    room: 'Milton Hall 102',
    building: 'Liberal Arts Wing',
    instructor: 'Prof. Julian Sterling',
    type: 'Lecture',
    day: 'Thursday',
    notes: 'Magical realism in Latin American literature',
    attendanceStatus: 'unmarked'
  },

  // FRIDAY (6 classes)
  {
    id: 'fri-1',
    periodNumber: 1,
    timeSlot: '09:05 - 10:05 AM',
    subjectId: 'sec310',
    subjectName: 'Network Security & Cryptography',
    subjectCode: 'SEC-310',
    room: 'Shannon Cyber Lab 205',
    building: 'Cyber Annex',
    instructor: 'Dr. Tariq Al-Mansoor',
    type: 'Lecture',
    day: 'Friday',
    notes: 'Review for upcoming midterm cryptography exam',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'fri-2',
    periodNumber: 2,
    timeSlot: '10:10 - 11:10 AM',
    subjectId: 'cs301',
    subjectName: 'Distributed Systems & Algorithms',
    subjectCode: 'CS-301',
    room: 'Turing Hall 402',
    building: 'Engineering Block A',
    instructor: 'Dr. Elena Vance',
    type: 'Seminar',
    day: 'Friday',
    notes: 'Guest speaker: Distributed storage architectures at scale',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'fri-3',
    periodNumber: 3,
    timeSlot: '11:20 AM - 12:15 PM',
    subjectId: 'math240',
    subjectName: 'Linear Algebra & Optimization',
    subjectCode: 'MATH-240',
    room: 'Euler Bldg 108',
    building: 'Science Pavilion',
    instructor: 'Prof. Marcus Chen',
    type: 'Tutorial',
    day: 'Friday',
    notes: 'Weekly quiz #3 on Quadratic Forms and Positive Definite Matrices',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'fri-4',
    periodNumber: 4,
    timeSlot: '01:05 - 02:00 PM',
    subjectId: 'ds220',
    subjectName: 'Applied Machine Learning',
    subjectCode: 'DS-220',
    room: 'Hopper Complex 310',
    building: 'Computing Wing',
    instructor: 'Dr. Sophia Ramos',
    type: 'Lab',
    day: 'Friday',
    notes: 'Kaggle benchmark evaluation for project milestone #1',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'fri-5',
    periodNumber: 5,
    timeSlot: '02:00 - 02:55 PM',
    subjectId: 'phys210',
    subjectName: 'Quantum & Wave Mechanics',
    subjectCode: 'PHYS-210',
    room: 'Curie Lab 214',
    building: 'Natural Sciences Hub',
    instructor: 'Dr. Aris Thorne',
    type: 'Lecture',
    day: 'Friday',
    notes: 'Tunneling effect and scanning tunneling microscopy',
    attendanceStatus: 'unmarked'
  },
  {
    id: 'fri-6',
    periodNumber: 6,
    timeSlot: '03:05 - 04:00 PM',
    subjectId: 'lit180',
    subjectName: 'Modern World Literature & Ethics',
    subjectCode: 'LIT-180',
    room: 'Milton Hall 102',
    building: 'Liberal Arts Wing',
    instructor: 'Prof. Julian Sterling',
    type: 'Seminar',
    day: 'Friday',
    notes: 'Wrap-up debate: Technology narratives in speculative fiction',
    attendanceStatus: 'unmarked'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Raft Consensus Protocol Leader Election Implementation',
    subjectId: 'cs301',
    subjectName: 'Distributed Systems & Algorithms',
    description: 'Implement heartbeats, candidate election timeouts, and vote request handling in Go or Python. Validate with the provided network partition test suite.',
    dueDate: '2026-09-28T23:59',
    points: 100,
    priority: 'urgent',
    category: 'Project',
    status: 'pending',
    rubricSummary: '40% Election correctness, 30% Partition tolerance, 30% Code clarity and unit test coverage.',
    attachments: ['raft_spec_v2.pdf', 'network_partition_test.py']
  },
  {
    id: 'asg-2',
    title: 'Problem Set 4: SVD & Principal Component Analysis',
    subjectId: 'math240',
    subjectName: 'Linear Algebra & Optimization',
    description: 'Solve questions 4.1 to 4.8 from the course reader. Include complete mathematical proofs for low-rank matrix approximations.',
    dueDate: '2026-09-27T17:00',
    points: 50,
    priority: 'urgent',
    category: 'Homework',
    status: 'pending',
    rubricSummary: 'Full marks for rigorous step-by-step proofs and orthogonal projection graphs.',
    attachments: ['ps4_optimization.pdf']
  },
  {
    id: 'asg-3',
    title: 'Quantum Harmonic Oscillator Energy States Lab Report',
    subjectId: 'phys210',
    subjectName: 'Quantum & Wave Mechanics',
    description: 'Submit experimental data analysis, error propagation graphs, and comparison against theoretical ladder operator eigenvalue predictions.',
    dueDate: '2026-09-30T23:59',
    points: 75,
    priority: 'medium',
    category: 'Lab Report',
    status: 'pending',
    rubricSummary: 'Experimental methodology (25 pts), Uncertainty analysis (25 pts), Conclusion (25 pts).'
  },
  {
    id: 'asg-4',
    title: 'Transformer Attention Mechanism Paper Critique',
    subjectId: 'ds220',
    subjectName: 'Applied Machine Learning',
    description: 'Write a 1200-word critique of scaled dot-product attention versus linear attention mechanisms in resource-constrained environments.',
    dueDate: '2026-10-03T18:00',
    points: 60,
    priority: 'medium',
    category: 'Essay',
    status: 'pending',
    rubricSummary: 'Depth of analysis, mathematical rigor, and clarity of technical writing.'
  },
  {
    id: 'asg-5',
    title: 'Diffie-Hellman Key Exchange Man-in-the-Middle Attack Lab',
    subjectId: 'sec310',
    subjectName: 'Network Security & Cryptography',
    description: 'Execute the simulated adversary script against an unauthenticated Diffie-Hellman exchange. Document the session keys extracted.',
    dueDate: '2026-10-05T23:59',
    points: 80,
    priority: 'low',
    category: 'Lab Report',
    status: 'pending',
    rubricSummary: 'Successful attack execution log (40 pts), Mitigation proposal and TLS 1.3 analysis (40 pts).'
  },
  {
    id: 'asg-6',
    title: 'Comparative Essay: Kafka & Post-Modern Alienation',
    subjectId: 'lit180',
    subjectName: 'Modern World Literature & Ethics',
    description: 'Analyze motifs of bureaucratic paralysis and institutional alienation in The Castle and modern corporate fiction.',
    dueDate: '2026-09-22T23:59',
    points: 50,
    priority: 'low',
    category: 'Essay',
    status: 'graded',
    grade: '96/100 (A)',
    submissionText: 'Submitted comparative essay exploring Kafkaesque themes across mid-century existential philosophy.',
    submittedAt: '2026-09-22T19:42'
  },
  {
    id: 'asg-7',
    title: 'Homework 3: Byzantine Generals & Paxos Invariants',
    subjectId: 'cs301',
    subjectName: 'Distributed Systems & Algorithms',
    description: 'Complete questions 1 to 5 on quorum intersections, state machine replication, and safety guarantees.',
    dueDate: '2026-09-29T16:00',
    points: 40,
    priority: 'urgent',
    category: 'Homework',
    status: 'pending',
    rubricSummary: 'Mathematical proofs of quorum intersections and partial synchrony bounds.'
  },
  {
    id: 'asg-8',
    title: 'Daily Homework: Eigenvalues & Diagonalization Practice',
    subjectId: 'math240',
    subjectName: 'Linear Algebra & Optimization',
    description: 'Solve exercises 3.2, 3.4, and 3.9 on characteristic polynomials and defective matrices.',
    dueDate: '2026-09-26T12:00',
    points: 30,
    priority: 'medium',
    category: 'Homework',
    status: 'completed',
    completedAt: '2026-09-25T14:30',
    rubricSummary: 'Step-by-step matrix row operations and spectral decomposition.'
  }
];

export const INITIAL_LECTURE_NOTES: LectureNote[] = [
  {
    id: 'note-1',
    subjectId: 'cs301',
    subjectName: 'Distributed Systems & Algorithms',
    title: 'Week 4: Consensus Fundamentals & Paxos vs Raft',
    unit: 'Unit 2 - Fault Tolerant Consensus',
    dateUploaded: '2026-09-24',
    uploadedBy: 'Dr. Elena Vance',
    role: 'Professor',
    fileType: 'Slides',
    fileSize: '4.8 MB',
    downloadCount: 142,
    summary: 'Comprehensive breakdown of leader election, log replication, terms, and safety invariants in Raft.',
    keyTopics: ['Split brain prevention', 'Heartbeat timers', 'Commit index monotonicity', 'RPC exchanges']
  },
  {
    id: 'note-2',
    subjectId: 'cs301',
    subjectName: 'Distributed Systems & Algorithms',
    title: 'Vector Clocks and Lamport Timestamps Lecture Notes',
    unit: 'Unit 1 - Time and Global State',
    dateUploaded: '2026-09-17',
    uploadedBy: 'Dr. Elena Vance',
    role: 'Professor',
    fileType: 'PDF',
    fileSize: '2.1 MB',
    downloadCount: 189,
    summary: 'Detailed mathematical formulations for causal consistency, partial ordering of events, and concurrent executions.',
    keyTopics: ['Partial order relations', 'Concurrent events detection', 'Distributed snapshot algorithm']
  },
  {
    id: 'note-3',
    subjectId: 'math240',
    subjectName: 'Linear Algebra & Optimization',
    title: 'Spectral Theorem and Matrix Factorization Proofs',
    unit: 'Unit 3 - Advanced Decomposition',
    dateUploaded: '2026-09-23',
    uploadedBy: 'Prof. Marcus Chen',
    role: 'Professor',
    fileType: 'PDF',
    fileSize: '3.4 MB',
    downloadCount: 165,
    summary: 'Formal proofs for real symmetric matrices, orthonormal bases, and positive semi-definite matrix decomposition.',
    keyTopics: ['Rayleigh quotient', 'SVD geometry', 'Condition numbers', 'Low rank approximations']
  },
  {
    id: 'note-4',
    subjectId: 'phys210',
    subjectName: 'Quantum & Wave Mechanics',
    title: 'Time-Independent Schrödinger Equation Solutions',
    unit: 'Unit 2 - Potential Wells and Barriers',
    dateUploaded: '2026-09-21',
    uploadedBy: 'Dr. Aris Thorne',
    role: 'Professor',
    fileType: 'PDF',
    fileSize: '5.2 MB',
    downloadCount: 118,
    summary: 'Step-by-step calculus solving infinite square well, finite well continuity conditions, and tunneling coefficients.',
    keyTopics: ['Boundary conditions', 'Wave transmission', 'Probability density normalization']
  },
  {
    id: 'note-5',
    subjectId: 'ds220',
    subjectName: 'Applied Machine Learning',
    title: 'Loss Functions, Regularization, and Optimization Dynamics',
    unit: 'Unit 2 - Deep Learning Optimization',
    dateUploaded: '2026-09-22',
    uploadedBy: 'Dr. Sophia Ramos',
    role: 'Professor',
    fileType: 'Slides',
    fileSize: '6.1 MB',
    downloadCount: 204,
    summary: 'In-depth exploration of L1/L2 weight decay, AdamW momentum, learning rate warmups, and loss landscape visualization.',
    keyTopics: ['Hessian curvature', 'Stochastic gradient descent', 'Batch normalization mechanics']
  },
  {
    id: 'note-6',
    subjectId: 'sec310',
    subjectName: 'Network Security & Cryptography',
    title: 'Public Key Cryptography & Zero-Knowledge Primer',
    unit: 'Unit 2 - Asymmetric Encryption & Proofs',
    dateUploaded: '2026-09-20',
    uploadedBy: 'Dr. Tariq Al-Mansoor',
    role: 'Professor',
    fileType: 'Slides',
    fileSize: '3.9 MB',
    downloadCount: 133,
    summary: 'Euler totient function, modular arithmetic, discrete logarithm difficulty, and interactive zero-knowledge protocols.',
    keyTopics: ['RSA keygen', 'Diffie-Hellman hardness', 'Schnorr identification', 'ZK-SNARK overview']
  }
];

export const INITIAL_CANTEEN_ITEMS: CanteenItem[] = [
  {
    id: 'food-1',
    name: 'Artisan Mediterranean Harvest Bowl',
    category: 'Lunch Specials',
    price: 8.50,
    isAvailable: true,
    prepTime: '6-8 min',
    rating: 4.8,
    calories: 540,
    dietary: ['Vegetarian', 'High-Protein', 'Halal'],
    description: 'Warm roasted spiced chickpeas, lemon-herb quinoa, heirloom tomatoes, pickled cucumber, and creamy garlic tahini.',
    imageUrl: '/src/assets/images/canteen_artisan_meal_1790350021560.jpg',
    counterLocation: 'Counter 2 (Greens & Bowls)',
    stockCount: 24
  },
  {
    id: 'food-2',
    name: 'Avocado Sourdough & Poached Egg Toast',
    category: 'Breakfast',
    price: 6.25,
    isAvailable: true,
    prepTime: '5 min',
    rating: 4.7,
    calories: 420,
    dietary: ['Vegetarian'],
    description: 'Thick artisan sourdough slice with crushed Hass avocado, microgreens, chili flakes, and cage-free poached eggs.',
    counterLocation: 'Counter 1 (Breakfast Express)',
    stockCount: 18
  },
  {
    id: 'food-3',
    name: 'Grilled Teriyaki Salmon & Brown Rice Bowl',
    category: 'Lunch Specials',
    price: 10.50,
    isAvailable: true,
    prepTime: '8-10 min',
    rating: 4.9,
    calories: 620,
    dietary: ['High-Protein', 'Gluten-Free'],
    description: 'Glazed Pacific salmon fillet served over steamed brown rice with wok-charred broccoli, edamame, and sesame drizzle.',
    counterLocation: 'Counter 3 (Hot Grill & Wok)',
    stockCount: 12
  },
  {
    id: 'food-4',
    name: 'Crispy Falafel Wrap with Beet Hummus',
    category: 'Quick Snacks',
    price: 6.75,
    isAvailable: true,
    prepTime: '4 min',
    rating: 4.6,
    calories: 480,
    dietary: ['Vegan', 'Halal'],
    description: 'Freshly fried herbed falafel balls wrapped in warm flatbread with shredded purple cabbage, mint, and beet hummus.',
    counterLocation: 'Counter 2 (Greens & Bowls)',
    stockCount: 20
  },
  {
    id: 'food-5',
    name: 'Cold Brew Oat Milk Latte (Single Origin)',
    category: 'Beverages & Coffee',
    price: 4.20,
    isAvailable: true,
    prepTime: '2 min',
    rating: 4.9,
    calories: 120,
    dietary: ['Vegan', 'Gluten-Free'],
    description: '20-hour steeped Ethiopian Yirgacheffe coffee beans poured over minor figures barista oat milk and ice.',
    counterLocation: 'Café Barista Station',
    stockCount: 45
  },
  {
    id: 'food-6',
    name: 'Matcha Chia Seed Pudding with Fresh Berries',
    category: 'Healthy Bowls',
    price: 4.95,
    isAvailable: false, // Currently sold out!
    prepTime: 'Ready to Grab',
    rating: 4.5,
    calories: 280,
    dietary: ['Vegan', 'Gluten-Free'],
    description: 'Overnight organic chia seeds infused with ceremonial grade Uji matcha and coconut milk, topped with wild blueberries.',
    counterLocation: 'Grab & Go Cooler A',
    stockCount: 0
  },
  {
    id: 'food-7',
    name: 'Stone-Baked Margherita Flatbread Slice',
    category: 'Quick Snacks',
    price: 4.50,
    isAvailable: true,
    prepTime: '3 min',
    rating: 4.4,
    calories: 380,
    dietary: ['Vegetarian'],
    description: 'Crisp sourdough crust topped with San Marzano tomato reduction, buffalo mozzarella, and fresh basil leaf.',
    counterLocation: 'Counter 4 (Bakehouse)',
    stockCount: 15
  },
  {
    id: 'food-8',
    name: 'Dragonfruit Acai Energy Smoothie',
    category: 'Beverages & Coffee',
    price: 5.50,
    isAvailable: false, // Sold out currently
    prepTime: '3 min',
    rating: 4.7,
    calories: 210,
    dietary: ['Vegan', 'Gluten-Free', 'High-Protein'],
    description: 'Blended pink pitaya, organic acai, banana, plant protein scoop, and coconut water.',
    counterLocation: 'Juice & Smoothie Bar',
    stockCount: 0
  }
];

export const INITIAL_CLUBS: CampusClub[] = [
  {
    id: 'club-ai',
    name: 'AI & Machine Learning Guild',
    category: 'Technology',
    description: 'Student-led research hub dedicated to deep learning projects, Kaggle competitions, open-source model fine-tuning, and research reading groups.',
    president: 'Maya Lin (Senior CS)',
    contactEmail: 'aiml-club@campus.edu',
    regularMeeting: 'Wednesdays @ 5:30 PM',
    location: 'Hopper Tech Lab 104',
    memberCount: 248,
    isMember: true,
    announcements: [
      {
        id: 'ann-1',
        date: '2026-09-24',
        title: 'Kaggle University Cup Hackathon Signups Open',
        content: 'Form teams of 2 to 4 for the upcoming 48-hour computer vision benchmark. Cloud compute credits sponsored by lab partners.'
      },
      {
        id: 'ann-2',
        date: '2026-09-18',
        title: 'Guest Paper Discussion: State Space Models vs Attention',
        content: 'Slides and reference code are uploaded to the club repo. See you this Wednesday!'
      }
    ]
  },
  {
    id: 'club-robotics',
    name: 'University Robotics & Autonomous Systems',
    category: 'Technology',
    description: 'Building competitive rovers, autonomous drones, and humanoid kinematics. We compete annually in RoboSub and University Rover Challenge.',
    president: 'Daniel Ortiz (Junior MechE)',
    contactEmail: 'robotics@campus.edu',
    regularMeeting: 'Tuesdays & Thursdays @ 6:00 PM',
    location: 'Makerspace Hangar B',
    memberCount: 185,
    isMember: false,
    announcements: [
      {
        id: 'ann-3',
        date: '2026-09-23',
        title: 'PCB Soldering & ROS2 Workshop This Thursday',
        content: 'Bring your laptops with Ubuntu/WSL installed. Component kits will be provided at the workshop door.'
      }
    ]
  },
  {
    id: 'club-debate',
    name: 'Parliamentary Debate & Public Policy Union',
    category: 'Debate & Arts',
    description: 'Competitive British Parliamentary and Policy debate society. Regular mock trials, intervarsity tournaments, and campus speaker debates.',
    president: 'Samantha Vance (Senior PolSci)',
    contactEmail: 'debate@campus.edu',
    regularMeeting: 'Mondays @ 6:30 PM',
    location: 'Student Union Room 302',
    memberCount: 112,
    isMember: true,
    announcements: [
      {
        id: 'ann-4',
        date: '2026-09-21',
        title: 'Tryouts for National Parliamentary Championship',
        content: 'Registration deadline is this Friday. Topic will be released 15 minutes prior to the first round.'
      }
    ]
  },
  {
    id: 'club-eco',
    name: 'Campus Eco-Initiative & Sustainability Council',
    category: 'Social & Service',
    description: 'Promoting campus zero-waste dining, rooftop solar integration, botanical gardening, and university climate policy advocacy.',
    president: 'Liam K. Njoroge (Junior EnvSci)',
    contactEmail: 'sustainability@campus.edu',
    regularMeeting: 'Fridays @ 4:15 PM',
    location: 'Eco Pavilion & Rooftop Garden',
    memberCount: 160,
    isMember: false,
    announcements: [
      {
        id: 'ann-5',
        date: '2026-09-22',
        title: 'Campus Arbor Day Tree Planting & Seed Bomb Event',
        content: 'Join us on North Lawn this Saturday at 10 AM. Free gloves, saplings, and refreshments provided!'
      }
    ]
  },
  {
    id: 'club-athletics',
    name: 'Inter-Collegiate Running & Triathlon Club',
    category: 'Sports & Athletics',
    description: 'Open to all fitness levels. Morning group trail runs, sprint interval workouts, and preparation for half-marathons and triathlons.',
    president: 'Clara Johansson (Sophomore Kinesiology)',
    contactEmail: 'running-club@campus.edu',
    regularMeeting: 'Mon/Wed/Sat @ 7:00 AM',
    location: 'Campus Stadium Track',
    memberCount: 220,
    isMember: false,
    announcements: [
      {
        id: 'ann-6',
        date: '2026-09-20',
        title: 'Annual Campus 5K Fun Run Registration Now Open',
        content: 'Free commemorative t-shirt for all students registered before end of September.'
      }
    ]
  }
];

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'event-1',
    title: 'University Fall Hackathon: Apex Innovate 2026',
    category: 'Hackathon & Tech',
    date: '2026-10-02',
    time: '09:00 AM - Oct 4, 05:00 PM',
    venue: 'Student Innovation Center & Grand Atrium',
    organizer: 'Computer Science Dept & AI Guild',
    description: '36-hour flagship hackathon featuring hardware and software tracks, $15,000 in prize pools, mentoring from industry engineers, and continuous food catering.',
    isRsvpd: true,
    attendeeCount: 420,
    imageUrl: '/src/assets/images/campus_hackathon_event_1790350034407.jpg',
    tags: ['Hackathon', 'Coding', 'Prizes', 'Catering']
  },
  {
    id: 'event-2',
    title: 'Autumn Campus Cultural & Arts Festival',
    category: 'Cultural Fest',
    date: '2026-10-08',
    time: '04:00 PM - 10:00 PM',
    venue: 'North Quad Courtyard & Amphitheater',
    organizer: 'Student Affairs & Campus Arts Council',
    description: 'Live musical performances by student bands, cultural dance troupes, international street food stalls, artisan craft booths, and outdoor light displays.',
    isRsvpd: false,
    attendeeCount: 1150,
    imageUrl: '/src/assets/images/campus_quad_aerial_1790350006851.jpg',
    tags: ['Music', 'Food', 'Culture', 'Free Entry']
  },
  {
    id: 'event-3',
    title: 'Distinguished Lecture: The Future of Quantum Sensing',
    category: 'Academic',
    date: '2026-09-29',
    time: '04:30 PM - 06:00 PM',
    venue: 'Fermi Auditorium, Science Quad',
    organizer: 'Department of Physics & Materials Science',
    description: 'Keynote presentation by Dr. Evelyn Zhao, Lead Principal Scientist at National Quantum Research Institute. Q&A and networking reception to follow.',
    isRsvpd: true,
    attendeeCount: 230,
    tags: ['Guest Lecture', 'Physics', 'Networking']
  },
  {
    id: 'event-4',
    title: 'Annual Campus Career Fair & Tech Expo',
    category: 'Career & Workshop',
    date: '2026-10-14',
    time: '10:00 AM - 04:00 PM',
    venue: 'University Recreation Arena',
    organizer: 'Career Services Center',
    description: 'Over 80 top tech, engineering, finance, and biotech employers recruiting for summer internships and full-time new graduate roles. Professional headshots available on site.',
    isRsvpd: false,
    attendeeCount: 1600,
    tags: ['Internships', 'Jobs', 'Resume Review']
  },
  {
    id: 'event-5',
    title: 'Inter-Collegiate Basketball: Wolves vs Bears',
    category: 'Sports',
    date: '2026-10-05',
    time: '07:00 PM - 09:30 PM',
    venue: 'Campus Athletics Arena Court 1',
    organizer: 'Varsity Athletics Board',
    description: 'Home rivalry match against State University. Student section cheer rallies, halftime performance, and free merchandise giveaways.',
    isRsvpd: false,
    attendeeCount: 890,
    tags: ['Basketball', 'Varsity', 'Spirit Night']
  }
];

export const INITIAL_CALENDAR_ENTRIES: CalendarEntry[] = [
  {
    id: 'cal-1',
    title: 'CS-301 Midterm Examination (Distributed Systems)',
    date: '2026-09-29',
    time: '09:00 AM - 11:00 AM',
    type: 'Exam',
    subjectCode: 'CS-301',
    location: 'Turing Hall 402',
    description: 'Covers Units 1 & 2: Lamport clocks, Vector timestamps, Raft consensus algorithm, and CAP theorem.'
  },
  {
    id: 'cal-2',
    title: 'MATH-240 Midterm Examination (Linear Algebra)',
    date: '2026-10-06',
    time: '10:00 AM - 12:00 PM',
    type: 'Exam',
    subjectCode: 'MATH-240',
    location: 'Euler Science Bldg 108',
    description: 'In-person closed book examination. One handwritten single-sided formula sheet permitted.'
  },
  {
    id: 'cal-3',
    title: 'PHYS-210 Laboratory Practical Exam',
    date: '2026-10-13',
    time: '01:30 PM - 04:30 PM',
    type: 'Exam',
    subjectCode: 'PHYS-210',
    location: 'Curie Lab 214',
    description: 'Practical bench exam assessing laser interferometer calibration and spectral analysis.'
  },
  {
    id: 'cal-4',
    title: 'Fall Term Add / Drop Registration Deadline',
    date: '2026-09-28',
    time: '11:59 PM',
    type: 'Academic Milestone',
    description: 'Last day to add, drop, or change grading options for Fall 2026 courses without academic penalty.'
  },
  {
    id: 'cal-5',
    title: 'Apex Innovate 2026 Campus Hackathon Starts',
    date: '2026-10-02',
    time: '09:00 AM',
    type: 'Event',
    location: 'Student Innovation Center',
    description: 'Opening ceremony, team matchings, and hardware lab kickoff.'
  },
  {
    id: 'cal-6',
    title: 'University Reading & Study Day (No Classes)',
    date: '2026-10-12',
    type: 'Holiday',
    description: 'Campus-wide study break before mid-term assessments. All lecture sessions suspended; library open 24/7.'
  },
  {
    id: 'cal-7',
    title: 'Final Term Examinations Week',
    date: '2026-12-14',
    time: 'All Day',
    type: 'Exam',
    description: 'Comprehensive Fall 2026 Final Examinations for all departments.'
  },
  {
    id: 'cal-8',
    title: 'Tuition Installment Payment #2 Due',
    date: '2026-10-15',
    time: '05:00 PM',
    type: 'Academic Milestone',
    description: 'Bursar office financial settlement deadline.'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Assignment Due in 2 Days',
    message: 'Raft Consensus Protocol Leader Election is due on Monday Sep 28 at 11:59 PM.',
    timestamp: '15m ago',
    type: 'assignment',
    read: false,
    actionView: 'academic'
  },
  {
    id: 'notif-2',
    title: 'Canteen Menu Update',
    message: 'Matcha Chia Seed Pudding is now Sold Out at Grab & Go Cooler A.',
    timestamp: '42m ago',
    type: 'canteen',
    read: false,
    actionView: 'canteen'
  },
  {
    id: 'notif-3',
    title: 'CS-301 Midterm Exam Countdown',
    message: 'Dr. Elena Vance scheduled your Midterm Exam for Tuesday Sep 29 @ 09:00 AM in Turing 402.',
    timestamp: '2h ago',
    type: 'exam',
    read: false,
    actionView: 'calendar'
  },
  {
    id: 'notif-4',
    title: 'New Lecture Notes Uploaded',
    message: 'Week 4: Consensus Fundamentals & Paxos vs Raft uploaded by Dr. Vance in CS-301.',
    timestamp: '4h ago',
    type: 'schedule',
    read: true,
    actionView: 'academic'
  },
  {
    id: 'notif-5',
    title: 'AI Guild Hackathon RSVP Confirmed',
    message: 'You are registered for Apex Innovate 2026 starting Oct 2.',
    timestamp: 'Yesterday',
    type: 'event',
    read: true,
    actionView: 'campus'
  }
];
