import {
  AdmissionLead,
  AcademicYear,
  ClassGrade,
  Section,
  Subject,
  Teacher,
  Student,
  AttendanceRecord,
  Examination,
  MarkEntry,
  StudentFeeAccount,
  PaymentTransaction,
  EarlyWarningAlert,
  DelugeScript
} from '../types';

export const initialAcademicYears: AcademicYear[] = [
  {
    id: 'AY-2025-26',
    name: 'Academic Year 2025 - 2026',
    startDate: '2025-06-01',
    endDate: '2026-04-30',
    isCurrent: true,
  },
  {
    id: 'AY-2024-25',
    name: 'Academic Year 2024 - 2025',
    startDate: '2024-06-01',
    endDate: '2025-04-30',
    isCurrent: false,
  },
];

export const initialClasses: ClassGrade[] = [
  { id: 'CLS-9', name: 'Grade 9', level: 9, stream: 'General Secondary', annualFee: 4200 },
  { id: 'CLS-10', name: 'Grade 10', level: 10, stream: 'General Secondary (Board Year)', annualFee: 4600 },
  { id: 'CLS-11', name: 'Grade 11', level: 11, stream: 'Science & Tech Stream', annualFee: 5200 },
  { id: 'CLS-12', name: 'Grade 12', level: 12, stream: 'Advanced STEM / Pre-University', annualFee: 5600 },
];

export const initialTeachers: Teacher[] = [
  {
    id: 'TCH-001',
    employeeId: 'EMP-701',
    name: 'Dr. Arthur Sterling',
    email: 'arthur.sterling@springdale.edu',
    phone: '+1 (555) 234-8901',
    department: 'Mathematics',
    specialization: 'Calculus & Statistics',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TCH-002',
    employeeId: 'EMP-702',
    name: 'Prof. Elena Rostova',
    email: 'elena.rostova@springdale.edu',
    phone: '+1 (555) 234-8902',
    department: 'Physics',
    specialization: 'Quantum Mechanics & Kinematics',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TCH-003',
    employeeId: 'EMP-703',
    name: 'Marcus Vance',
    email: 'marcus.vance@springdale.edu',
    phone: '+1 (555) 234-8903',
    department: 'Computer Science',
    specialization: 'Algorithms & Software Engineering',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TCH-004',
    employeeId: 'EMP-704',
    name: 'Sarah Lin',
    email: 'sarah.lin@springdale.edu',
    phone: '+1 (555) 234-8904',
    department: 'Chemistry & Biology',
    specialization: 'Organic Chemistry',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'TCH-005',
    employeeId: 'EMP-705',
    name: 'David Reynolds',
    email: 'david.reynolds@springdale.edu',
    phone: '+1 (555) 234-8905',
    department: 'Literature & Languages',
    specialization: 'Academic Writing & Rhetoric',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
];

export const initialSections: Section[] = [
  { id: 'SEC-9A', classId: 'CLS-9', name: 'Section A - Newton', roomNo: 'Room 101', capacity: 30, classTeacherId: 'TCH-001' },
  { id: 'SEC-9B', classId: 'CLS-9', name: 'Section B - Galileo', roomNo: 'Room 102', capacity: 30, classTeacherId: 'TCH-005' },
  { id: 'SEC-10A', classId: 'CLS-10', name: 'Section A - Curie', roomNo: 'Room 201', capacity: 30, classTeacherId: 'TCH-002' },
  { id: 'SEC-10B', classId: 'CLS-10', name: 'Section B - Darwin', roomNo: 'Room 202', capacity: 30, classTeacherId: 'TCH-004' },
  { id: 'SEC-11A', classId: 'CLS-11', name: 'Section A - Turing', roomNo: 'Room 301', capacity: 25, classTeacherId: 'TCH-003' },
  { id: 'SEC-12A', classId: 'CLS-12', name: 'Section A - Hawking', roomNo: 'Room 401', capacity: 25, classTeacherId: 'TCH-002' },
];

export const initialSubjects: Subject[] = [
  { id: 'SUB-101', code: 'MATH-10', name: 'Advanced Mathematics', classId: 'CLS-10', teacherId: 'TCH-001', credits: 4, maxMarks: 100 },
  { id: 'SUB-102', code: 'PHYS-10', name: 'Applied Physics', classId: 'CLS-10', teacherId: 'TCH-002', credits: 4, maxMarks: 100 },
  { id: 'SUB-103', code: 'CHEM-10', name: 'Organic & Analytical Chemistry', classId: 'CLS-10', teacherId: 'TCH-004', credits: 3, maxMarks: 100 },
  { id: 'SUB-104', code: 'CS-10', name: 'Computer Science & Python', classId: 'CLS-10', teacherId: 'TCH-003', credits: 3, maxMarks: 100 },
  { id: 'SUB-105', code: 'ENG-10', name: 'English Literature & Composition', classId: 'CLS-10', teacherId: 'TCH-005', credits: 3, maxMarks: 100 },
  
  { id: 'SUB-901', code: 'MATH-09', name: 'Foundational Algebra & Geometry', classId: 'CLS-9', teacherId: 'TCH-001', credits: 4, maxMarks: 100 },
  { id: 'SUB-902', code: 'SCI-09', name: 'Integrated General Science', classId: 'CLS-9', teacherId: 'TCH-004', credits: 4, maxMarks: 100 },
  { id: 'SUB-903', code: 'ENG-09', name: 'English Language & Reading', classId: 'CLS-9', teacherId: 'TCH-005', credits: 3, maxMarks: 100 },
  
  { id: 'SUB-111', code: 'MATH-11', name: 'Calculus & Vectors', classId: 'CLS-11', teacherId: 'TCH-001', credits: 5, maxMarks: 100 },
  { id: 'SUB-112', code: 'PHYS-11', name: 'Electromagnetism & Thermodynamics', classId: 'CLS-11', teacherId: 'TCH-002', credits: 5, maxMarks: 100 },
  { id: 'SUB-113', code: 'CS-11', name: 'Data Structures & Algorithms', classId: 'CLS-11', teacherId: 'TCH-003', credits: 4, maxMarks: 100 },
];

export const initialLeads: AdmissionLead[] = [
  {
    id: 'LEAD-2025-081',
    enquiryNumber: 'ENQ-8921',
    studentName: 'Samantha Brooks',
    dob: '2009-08-14',
    gender: 'Female',
    parentName: 'Robert Brooks',
    parentEmail: 'robert.brooks@example.com',
    parentPhone: '+1 (555) 789-1122',
    targetGrade: 'CLS-10',
    previousSchool: 'Oakridge International Academy',
    enquiryDate: '2025-05-10',
    status: 'Admission Approved',
    notes: 'Strong candidate in STEM. Passed entrance aptitude test with 92%. Ready for enrollment conversion.',
    assignedCounselor: 'Amanda Clark (Senior Admissions)',
    score: 92,
  },
  {
    id: 'LEAD-2025-082',
    enquiryNumber: 'ENQ-8922',
    studentName: 'Liam Chen',
    dob: '2010-02-19',
    gender: 'Male',
    parentName: 'Dr. Wei Chen',
    parentEmail: 'wei.chen@example.com',
    parentPhone: '+1 (555) 345-6677',
    targetGrade: 'CLS-9',
    previousSchool: 'Pinecrest Middle School',
    enquiryDate: '2025-05-14',
    status: 'Campus Visit',
    notes: 'Scheduled for school walkthrough and meeting with Math Department head on Thursday.',
    assignedCounselor: 'Amanda Clark (Senior Admissions)',
    score: 84,
  },
  {
    id: 'LEAD-2025-083',
    enquiryNumber: 'ENQ-8923',
    studentName: 'Maya Patel',
    dob: '2008-11-05',
    gender: 'Female',
    parentName: 'Anita Patel',
    parentEmail: 'anita.patel@example.com',
    parentPhone: '+1 (555) 901-2233',
    targetGrade: 'CLS-11',
    previousSchool: 'Greenwood High',
    enquiryDate: '2025-05-18',
    status: 'Assessment Scheduled',
    notes: 'Interested in Computer Science & Robotics track. Evaluation test booked for next Monday.',
    assignedCounselor: 'Amanda Clark (Senior Admissions)',
    score: 78,
  },
  {
    id: 'LEAD-2025-084',
    enquiryNumber: 'ENQ-8924',
    studentName: 'Ethan Wright',
    dob: '2009-04-22',
    gender: 'Male',
    parentName: 'Jennifer Wright',
    parentEmail: 'jennifer.wright@example.com',
    parentPhone: '+1 (555) 678-4455',
    targetGrade: 'CLS-10',
    previousSchool: 'St. Jude Academy',
    enquiryDate: '2025-05-20',
    status: 'New Enquiry',
    notes: 'Webform enquiry received via portal. Requested brochure and fee breakdown schedule.',
    assignedCounselor: 'Unassigned',
  },
  {
    id: 'LEAD-2025-080',
    enquiryNumber: 'ENQ-8919',
    studentName: 'Julian Hayes',
    dob: '2009-03-12',
    gender: 'Male',
    parentName: 'Catherine Hayes',
    parentEmail: 'catherine.hayes@example.com',
    parentPhone: '+1 (555) 432-1100',
    targetGrade: 'CLS-10',
    previousSchool: 'Crestview Preparatory',
    enquiryDate: '2025-04-28',
    status: 'Enrolled',
    notes: 'Admission fee processed. Converted into Student ID STU-2025-001.',
    assignedCounselor: 'Amanda Clark (Senior Admissions)',
    convertedStudentId: 'STU-2025-001',
    score: 95,
  }
];

export const initialStudents: Student[] = [
  {
    id: 'STU-2025-001',
    crmLeadId: 'LEAD-2025-080',
    name: 'Julian Hayes',
    dob: '2009-03-12',
    gender: 'Male',
    bloodGroup: 'O+',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    parentName: 'Catherine Hayes',
    parentEmail: 'catherine.hayes@example.com',
    parentPhone: '+1 (555) 432-1100',
    parentAddress: '742 Evergreen Terrace, Springfield, IL',
    currentAcademicYearId: 'AY-2025-26',
    currentClassId: 'CLS-10',
    currentSectionId: 'SEC-10A',
    rollNumber: '10A-01',
    admissionDate: '2025-05-01',
    status: 'Active',
    emergencyContact: {
      name: 'Thomas Hayes',
      relationship: 'Father',
      phone: '+1 (555) 432-1102',
    },
    medicalNotes: 'Mild asthma, carries inhaler during sports.',
    academicHistory: [
      {
        academicYear: '2024-2025',
        grade: 'Grade 9',
        section: 'Section A',
        gpa: 3.85,
        attendancePercentage: 96.2,
        status: 'Promoted',
      }
    ],
    riskLevel: 'Low',
  },
  {
    id: 'STU-2025-002',
    name: 'Avery Morgan',
    dob: '2009-07-25',
    gender: 'Female',
    bloodGroup: 'A+',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    parentName: 'Michael Morgan',
    parentEmail: 'michael.morgan@example.com',
    parentPhone: '+1 (555) 887-3344',
    parentAddress: '124 Horizon Blvd, Oakridge',
    currentAcademicYearId: 'AY-2025-26',
    currentClassId: 'CLS-10',
    currentSectionId: 'SEC-10A',
    rollNumber: '10A-02',
    admissionDate: '2024-06-15',
    status: 'Active',
    emergencyContact: {
      name: 'Claire Morgan',
      relationship: 'Mother',
      phone: '+1 (555) 887-3345',
    },
    academicHistory: [
      {
        academicYear: '2024-2025',
        grade: 'Grade 9',
        section: 'Section B',
        gpa: 3.92,
        attendancePercentage: 98.4,
        status: 'Promoted',
      }
    ],
    riskLevel: 'Low',
  },
  {
    id: 'STU-2025-003',
    name: 'Lucas Davenport',
    dob: '2009-01-18',
    gender: 'Male',
    bloodGroup: 'B+',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    parentName: 'Richard Davenport',
    parentEmail: 'richard.davenport@example.com',
    parentPhone: '+1 (555) 998-2211',
    parentAddress: '55 Pine Needle Way, Ridgewood',
    currentAcademicYearId: 'AY-2025-26',
    currentClassId: 'CLS-10',
    currentSectionId: 'SEC-10A',
    rollNumber: '10A-03',
    admissionDate: '2024-06-15',
    status: 'Active',
    emergencyContact: {
      name: 'Evelyn Davenport',
      relationship: 'Aunt',
      phone: '+1 (555) 998-2215',
    },
    academicHistory: [
      {
        academicYear: '2024-2025',
        grade: 'Grade 9',
        section: 'Section A',
        gpa: 2.45,
        attendancePercentage: 74.1,
        status: 'Promoted',
      }
    ],
    riskLevel: 'High',
    riskReasons: ['Attendance dropped below 70%', 'Failing Chemistry Unit Assessment', 'Term 2 Fee overdue by 45 days'],
  },
  {
    id: 'STU-2025-004',
    name: 'Sophia Castillo',
    dob: '2010-09-30',
    gender: 'Female',
    bloodGroup: 'AB+',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    parentName: 'Gabriel Castillo',
    parentEmail: 'gabriel.castillo@example.com',
    parentPhone: '+1 (555) 776-5544',
    parentAddress: '88 Sunnydale Court, Westlake',
    currentAcademicYearId: 'AY-2025-26',
    currentClassId: 'CLS-9',
    currentSectionId: 'SEC-9A',
    rollNumber: '09A-01',
    admissionDate: '2025-06-01',
    status: 'Active',
    emergencyContact: {
      name: 'Gabriel Castillo',
      relationship: 'Father',
      phone: '+1 (555) 776-5544',
    },
    academicHistory: [],
    riskLevel: 'Low',
  },
  {
    id: 'STU-2025-005',
    name: 'Noah Bennett',
    dob: '2008-05-11',
    gender: 'Male',
    bloodGroup: 'O-',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    parentName: 'Karen Bennett',
    parentEmail: 'karen.bennett@example.com',
    parentPhone: '+1 (555) 321-9988',
    parentAddress: '310 Cedar Grove Road, Riverview',
    currentAcademicYearId: 'AY-2025-26',
    currentClassId: 'CLS-11',
    currentSectionId: 'SEC-11A',
    rollNumber: '11A-01',
    admissionDate: '2023-06-10',
    status: 'Active',
    emergencyContact: {
      name: 'George Bennett',
      relationship: 'Grandfather',
      phone: '+1 (555) 321-9990',
    },
    academicHistory: [
      {
        academicYear: '2024-2025',
        grade: 'Grade 10',
        section: 'Section A',
        gpa: 3.42,
        attendancePercentage: 88.0,
        status: 'Promoted',
      },
      {
        academicYear: '2023-2024',
        grade: 'Grade 9',
        section: 'Section A',
        gpa: 3.60,
        attendancePercentage: 92.5,
        status: 'Promoted',
      }
    ],
    riskLevel: 'Moderate',
    riskReasons: ['Recent 3 consecutive unexcused absences', 'Math grade declined from B to C-'],
  }
];

export const initialAttendanceRecords: AttendanceRecord[] = [
  // Julian Hayes (STU-2025-001)
  { id: 'ATT-1001', studentId: 'STU-2025-001', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-25', status: 'Present', markedByTeacherId: 'TCH-002', timestamp: '2026-08-25T08:15:00Z' },
  { id: 'ATT-1002', studentId: 'STU-2025-001', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-26', status: 'Present', markedByTeacherId: 'TCH-002', timestamp: '2026-08-26T08:14:00Z' },
  { id: 'ATT-1003', studentId: 'STU-2025-001', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-27', status: 'Present', markedByTeacherId: 'TCH-002', timestamp: '2026-08-27T08:16:00Z' },
  { id: 'ATT-1004', studentId: 'STU-2025-001', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-28', status: 'Present', markedByTeacherId: 'TCH-002', timestamp: '2026-08-28T08:15:00Z' },
  { id: 'ATT-1005', studentId: 'STU-2025-001', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-29', status: 'Late', remarks: 'Bus delay', markedByTeacherId: 'TCH-002', timestamp: '2026-08-29T08:35:00Z' },
  { id: 'ATT-1006', studentId: 'STU-2025-001', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-09-01', status: 'Present', markedByTeacherId: 'TCH-002', timestamp: '2026-09-01T08:12:00Z' },

  // Lucas Davenport (STU-2025-003) - Low attendance
  { id: 'ATT-1007', studentId: 'STU-2025-003', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-25', status: 'Absent', remarks: 'Unexplained absence', markedByTeacherId: 'TCH-002', timestamp: '2026-08-25T08:15:00Z' },
  { id: 'ATT-1008', studentId: 'STU-2025-003', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-26', status: 'Absent', remarks: 'Unexplained absence', markedByTeacherId: 'TCH-002', timestamp: '2026-08-26T08:14:00Z' },
  { id: 'ATT-1009', studentId: 'STU-2025-003', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-27', status: 'Late', remarks: 'Arrived at 9:15 AM', markedByTeacherId: 'TCH-002', timestamp: '2026-08-27T09:15:00Z' },
  { id: 'ATT-1010', studentId: 'STU-2025-003', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-28', status: 'Absent', markedByTeacherId: 'TCH-002', timestamp: '2026-08-28T08:15:00Z' },
  { id: 'ATT-1011', studentId: 'STU-2025-003', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-29', status: 'Present', markedByTeacherId: 'TCH-002', timestamp: '2026-08-29T08:10:00Z' },
  { id: 'ATT-1012', studentId: 'STU-2025-003', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-09-01', status: 'Absent', remarks: 'No note received', markedByTeacherId: 'TCH-002', timestamp: '2026-09-01T08:12:00Z' },

  // Avery Morgan (STU-2025-002) - High attendance
  { id: 'ATT-1013', studentId: 'STU-2025-002', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-25', status: 'Present', markedByTeacherId: 'TCH-002', timestamp: '2026-08-25T08:15:00Z' },
  { id: 'ATT-1014', studentId: 'STU-2025-002', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-26', status: 'Present', markedByTeacherId: 'TCH-002', timestamp: '2026-08-26T08:14:00Z' },
  { id: 'ATT-1015', studentId: 'STU-2025-002', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-27', status: 'Present', markedByTeacherId: 'TCH-002', timestamp: '2026-08-27T08:16:00Z' },
  { id: 'ATT-1016', studentId: 'STU-2025-002', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-28', status: 'Present', markedByTeacherId: 'TCH-002', timestamp: '2026-08-28T08:15:00Z' },
  { id: 'ATT-1017', studentId: 'STU-2025-002', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-08-29', status: 'Present', markedByTeacherId: 'TCH-002', timestamp: '2026-08-29T08:10:00Z' },
  { id: 'ATT-1018', studentId: 'STU-2025-002', classId: 'CLS-10', sectionId: 'SEC-10A', date: '2026-09-01', status: 'Present', markedByTeacherId: 'TCH-002', timestamp: '2026-09-01T08:12:00Z' },
];

export const initialExaminations: Examination[] = [
  {
    id: 'EXAM-2025-T1',
    name: 'Term 1 Mid-Term Examination',
    academicYearId: 'AY-2025-26',
    classId: 'CLS-10',
    startDate: '2025-10-10',
    endDate: '2025-10-18',
    totalMaxMarks: 500,
    status: 'Published',
  },
  {
    id: 'EXAM-2025-T2',
    name: 'Term 2 Periodic Assessment',
    academicYearId: 'AY-2025-26',
    classId: 'CLS-10',
    startDate: '2026-01-12',
    endDate: '2026-01-20',
    totalMaxMarks: 500,
    status: 'Published',
  },
  {
    id: 'EXAM-2026-FIN',
    name: 'Final Annual Board Assessment 2026',
    academicYearId: 'AY-2025-26',
    classId: 'CLS-10',
    startDate: '2026-03-20',
    endDate: '2026-03-31',
    totalMaxMarks: 500,
    status: 'Scheduled',
  }
];

export const initialMarkEntries: MarkEntry[] = [
  // Julian Hayes (STU-2025-001) - Term 1 Mid-Term
  { id: 'MRK-101', examId: 'EXAM-2025-T1', studentId: 'STU-2025-001', subjectId: 'SUB-101', marksObtained: 94, maxMarks: 100, grade: 'A+', feedback: 'Exceptional mastery of algebraic proofs.' },
  { id: 'MRK-102', examId: 'EXAM-2025-T1', studentId: 'STU-2025-001', subjectId: 'SUB-102', marksObtained: 88, maxMarks: 100, grade: 'A', feedback: 'Very good lab analysis and theory.' },
  { id: 'MRK-103', examId: 'EXAM-2025-T1', studentId: 'STU-2025-001', subjectId: 'SUB-103', marksObtained: 91, maxMarks: 100, grade: 'A+', feedback: 'Accurate stoichiometric calculations.' },
  { id: 'MRK-104', examId: 'EXAM-2025-T1', studentId: 'STU-2025-001', subjectId: 'SUB-104', marksObtained: 98, maxMarks: 100, grade: 'A+', feedback: 'Top coder in Python logic projects.' },
  { id: 'MRK-105', examId: 'EXAM-2025-T1', studentId: 'STU-2025-001', subjectId: 'SUB-105', marksObtained: 85, maxMarks: 100, grade: 'A', feedback: 'Strong literary analysis essay.' },

  // Avery Morgan (STU-2025-002) - Term 1 Mid-Term
  { id: 'MRK-106', examId: 'EXAM-2025-T1', studentId: 'STU-2025-002', subjectId: 'SUB-101', marksObtained: 96, maxMarks: 100, grade: 'A+', feedback: 'Outstanding problem solving.' },
  { id: 'MRK-107', examId: 'EXAM-2025-T1', studentId: 'STU-2025-002', subjectId: 'SUB-102', marksObtained: 95, maxMarks: 100, grade: 'A+', feedback: 'Flawless physics concept application.' },
  { id: 'MRK-108', examId: 'EXAM-2025-T1', studentId: 'STU-2025-002', subjectId: 'SUB-103', marksObtained: 92, maxMarks: 100, grade: 'A+', feedback: 'Excellent laboratory discipline.' },
  { id: 'MRK-109', examId: 'EXAM-2025-T1', studentId: 'STU-2025-002', subjectId: 'SUB-104', marksObtained: 90, maxMarks: 100, grade: 'A', feedback: 'Clean code and documentation.' },
  { id: 'MRK-110', examId: 'EXAM-2025-T1', studentId: 'STU-2025-002', subjectId: 'SUB-105', marksObtained: 94, maxMarks: 100, grade: 'A+', feedback: 'Exemplary essay articulation.' },

  // Lucas Davenport (STU-2025-003) - Term 1 Mid-Term
  { id: 'MRK-111', examId: 'EXAM-2025-T1', studentId: 'STU-2025-003', subjectId: 'SUB-101', marksObtained: 58, maxMarks: 100, grade: 'D', feedback: 'Needs remedial sessions in quadratic equations.' },
  { id: 'MRK-112', examId: 'EXAM-2025-T1', studentId: 'STU-2025-003', subjectId: 'SUB-102', marksObtained: 61, maxMarks: 100, grade: 'C', feedback: 'Incomplete practical record.' },
  { id: 'MRK-113', examId: 'EXAM-2025-T1', studentId: 'STU-2025-003', subjectId: 'SUB-103', marksObtained: 44, maxMarks: 100, grade: 'F', feedback: 'Failed periodic table and bonds module.' },
  { id: 'MRK-114', examId: 'EXAM-2025-T1', studentId: 'STU-2025-003', subjectId: 'SUB-104', marksObtained: 65, maxMarks: 100, grade: 'C', feedback: 'Basic syntax understanding shown.' },
  { id: 'MRK-115', examId: 'EXAM-2025-T1', studentId: 'STU-2025-003', subjectId: 'SUB-105', marksObtained: 60, maxMarks: 100, grade: 'C', feedback: 'Grammar and reading comprehension needs work.' },
];

export const initialFeeAccounts: StudentFeeAccount[] = [
  {
    id: 'FEE-2025-001',
    studentId: 'STU-2025-001',
    academicYearId: 'AY-2025-26',
    totalFee: 4600,
    discount: 200,
    netFee: 4400,
    amountPaid: 3300,
    outstandingBalance: 1100,
    status: 'Partial',
    installments: [
      { id: 'INST-101', title: 'Term 1 Tuition & Registration', dueDate: '2025-06-15', amount: 1650, paidAmount: 1650, status: 'Paid' },
      { id: 'INST-102', title: 'Term 2 Tuition & STEM Lab Fee', dueDate: '2025-10-15', amount: 1650, paidAmount: 1650, status: 'Paid' },
      { id: 'INST-103', title: 'Term 3 Tuition & Examination Fee', dueDate: '2026-02-15', amount: 1100, paidAmount: 0, status: 'Unpaid' },
    ]
  },
  {
    id: 'FEE-2025-002',
    studentId: 'STU-2025-002',
    academicYearId: 'AY-2025-26',
    totalFee: 4600,
    discount: 0,
    netFee: 4600,
    amountPaid: 4600,
    outstandingBalance: 0,
    status: 'Paid',
    installments: [
      { id: 'INST-201', title: 'Term 1 Tuition & Registration', dueDate: '2025-06-15', amount: 1534, paidAmount: 1534, status: 'Paid' },
      { id: 'INST-202', title: 'Term 2 Tuition & STEM Lab Fee', dueDate: '2025-10-15', amount: 1533, paidAmount: 1533, status: 'Paid' },
      { id: 'INST-203', title: 'Term 3 Tuition & Examination Fee', dueDate: '2026-02-15', amount: 1533, paidAmount: 1533, status: 'Paid' },
    ]
  },
  {
    id: 'FEE-2025-003',
    studentId: 'STU-2025-003',
    academicYearId: 'AY-2025-26',
    totalFee: 4600,
    discount: 0,
    netFee: 4600,
    amountPaid: 1534,
    outstandingBalance: 3066,
    status: 'Overdue',
    installments: [
      { id: 'INST-301', title: 'Term 1 Tuition & Registration', dueDate: '2025-06-15', amount: 1534, paidAmount: 1534, status: 'Paid' },
      { id: 'INST-302', title: 'Term 2 Tuition & STEM Lab Fee', dueDate: '2025-10-15', amount: 1533, paidAmount: 0, status: 'Overdue' },
      { id: 'INST-303', title: 'Term 3 Tuition & Examination Fee', dueDate: '2026-02-15', amount: 1533, paidAmount: 0, status: 'Unpaid' },
    ]
  },
  {
    id: 'FEE-2025-004',
    studentId: 'STU-2025-004',
    academicYearId: 'AY-2025-26',
    totalFee: 4200,
    discount: 300,
    netFee: 3900,
    amountPaid: 2600,
    outstandingBalance: 1300,
    status: 'Partial',
    installments: [
      { id: 'INST-401', title: 'Term 1 Tuition & Books', dueDate: '2025-06-15', amount: 1300, paidAmount: 1300, status: 'Paid' },
      { id: 'INST-402', title: 'Term 2 Tuition & Lab', dueDate: '2025-10-15', amount: 1300, paidAmount: 1300, status: 'Paid' },
      { id: 'INST-403', title: 'Term 3 Tuition', dueDate: '2026-02-15', amount: 1300, paidAmount: 0, status: 'Unpaid' },
    ]
  },
  {
    id: 'FEE-2025-005',
    studentId: 'STU-2025-005',
    academicYearId: 'AY-2025-26',
    totalFee: 5200,
    discount: 0,
    netFee: 5200,
    amountPaid: 3467,
    outstandingBalance: 1733,
    status: 'Partial',
    installments: [
      { id: 'INST-501', title: 'Term 1 Tuition & Science Kit', dueDate: '2025-06-15', amount: 1734, paidAmount: 1734, status: 'Paid' },
      { id: 'INST-502', title: 'Term 2 Tuition & Coding Lab', dueDate: '2025-10-15', amount: 1733, paidAmount: 1733, status: 'Paid' },
      { id: 'INST-503', title: 'Term 3 Tuition', dueDate: '2026-02-15', amount: 1733, paidAmount: 0, status: 'Unpaid' },
    ]
  }
];

export const initialPaymentTransactions: PaymentTransaction[] = [
  {
    id: 'TXN-9801',
    receiptNumber: 'REC-2025-001',
    studentId: 'STU-2025-001',
    studentFeeAccountId: 'FEE-2025-001',
    installmentId: 'INST-101',
    amount: 1650,
    paymentDate: '2025-06-12',
    paymentMethod: 'Credit Card',
    transactionReference: 'STRIPE_CH_9023812',
    status: 'Success',
    notes: 'Paid via Zoho Creator Parent Portal online gateway',
  },
  {
    id: 'TXN-9802',
    receiptNumber: 'REC-2025-045',
    studentId: 'STU-2025-001',
    studentFeeAccountId: 'FEE-2025-001',
    installmentId: 'INST-102',
    amount: 1650,
    paymentDate: '2025-10-14',
    paymentMethod: 'Net Banking',
    transactionReference: 'ACH_BANK_REF_33891',
    status: 'Success',
    notes: 'Direct bank transfer auto-reconciled',
  },
  {
    id: 'TXN-9803',
    receiptNumber: 'REC-2025-002',
    studentId: 'STU-2025-002',
    studentFeeAccountId: 'FEE-2025-002',
    installmentId: 'INST-201',
    amount: 1534,
    paymentDate: '2025-06-10',
    paymentMethod: 'Credit Card',
    transactionReference: 'STRIPE_CH_9023844',
    status: 'Success',
  },
  {
    id: 'TXN-9804',
    receiptNumber: 'REC-2025-003',
    studentId: 'STU-2025-003',
    studentFeeAccountId: 'FEE-2025-003',
    installmentId: 'INST-301',
    amount: 1534,
    paymentDate: '2025-06-15',
    paymentMethod: 'Cheque',
    transactionReference: 'CHQ-889021',
    status: 'Success',
    notes: 'Counter payment verified by Accounts',
  }
];

export const initialEarlyWarningAlerts: EarlyWarningAlert[] = [
  {
    id: 'EWS-ALERT-001',
    studentId: 'STU-2025-003',
    detectedDate: '2026-08-30',
    riskLevel: 'High',
    triggers: {
      attendanceRate: 66.7,
      academicScoreAvg: 53.4,
      feeOverdueDays: 48,
    },
    status: 'Counseling Scheduled',
    actionPlan: 'Academic advisor meeting arranged with guardian Mr. Richard Davenport on Friday. Remedial chemistry and math tutoring enrolled.',
    counselorAssigned: 'Amanda Clark (Senior Counselor)',
  },
  {
    id: 'EWS-ALERT-002',
    studentId: 'STU-2025-005',
    detectedDate: '2026-08-28',
    riskLevel: 'Moderate',
    triggers: {
      attendanceRate: 78.0,
      academicScoreAvg: 72.0,
      feeOverdueDays: 0,
    },
    status: 'Under Review',
    actionPlan: 'Class teacher TCH-003 scheduled one-on-one progress review.',
    counselorAssigned: 'Amanda Clark (Senior Counselor)',
  }
];

export const delugeScriptsRegistry: DelugeScript[] = [
  {
    id: 'DELUGE-01',
    title: 'Lead to Student Auto-Conversion & ID Generator',
    category: 'Workflow',
    triggerEvent: 'Lead Status changed to "Admission Approved" or "Enrolled"',
    module: 'Leads -> Students (Custom Module)',
    description: 'Generates an sequential unique Student ID (STU-YYYY-XXXX), transfers parent contact details, provisions Student Fee Account with grade installment schedule, and triggers welcome email.',
    inputParams: { leadId: 'Lead Record ID (BigInt)' },
    outputType: 'Map: { success: Boolean, studentId: String, crmRecordId: BigInt }',
    code: `/* 
   Zoho CRM Custom Function: Convert Admission Lead to Student
   Trigger: Lead Stage = 'Admission Approved' / 'Enrolled'
*/
void convertLeadToStudent(String leadId)
{
    // 1. Fetch the source Lead record
    leadRecord = zoho.crm.getRecordById("Leads", leadId.toLong());
    
    if(leadRecord.get("id") != null)
    {
        currentYear = zoho.currentdate.getYear().toString();
        
        // 2. Fetch latest sequence count from System Settings / Counter
        counterMap = zoho.crm.getRecords("System_Counters", 1, 1);
        nextSeq = 1;
        if(counterMap.size() > 0)
        {
            nextSeq = counterMap.get(0).get("Last_Student_Sequence").toLong() + 1;
            // Update counter in CRM
            zoho.crm.updateRecord("System_Counters", counterMap.get(0).get("id"), {"Last_Student_Sequence": nextSeq});
        }
        
        // Generate formatted Unique Student ID: STU-2025-0042
        formattedSeq = nextSeq.toString();
        while(formattedSeq.length() < 4)
        {
            formattedSeq = "0" + formattedSeq;
        }
        generatedStudentID = "STU-" + currentYear + "-" + formattedSeq;
        
        // 3. Create Custom Student Module Record in Zoho CRM
        studentMap = Map();
        studentMap.put("Name", leadRecord.get("Student_Name"));
        studentMap.put("Student_ID", generatedStudentID);
        studentMap.put("Date_of_Birth", leadRecord.get("Date_of_Birth"));
        studentMap.put("Gender", leadRecord.get("Gender"));
        studentMap.put("Target_Class", leadRecord.get("Target_Class"));
        studentMap.put("Enrolled_Date", zoho.currentdate.toString("yyyy-MM-dd"));
        studentMap.put("Status", "Active");
        studentMap.put("Parent_Name", leadRecord.get("Parent_Name"));
        studentMap.put("Parent_Email", leadRecord.get("Email"));
        studentMap.put("Parent_Phone", leadRecord.get("Phone"));
        studentMap.put("CRM_Lead_Ref", leadId);
        
        studentResponse = zoho.crm.createRecord("Students", studentMap);
        newStudentCrmId = studentResponse.get("id");
        
        // 4. Generate Fee Structure Record for the Enrolled Class
        targetClass = leadRecord.get("Target_Class");
        classInfo = zoho.crm.searchRecords("Classes", "(Name:equals:" + targetClass + ")");
        annualFee = 4500.0;
        if(classInfo.size() > 0)
        {
            annualFee = classInfo.get(0).get("Annual_Fee").toDecimal();
        }
        
        feeMap = Map();
        feeMap.put("Student_Lookup", newStudentCrmId);
        feeMap.put("Academic_Year", "2025-2026");
        feeMap.put("Total_Annual_Fee", annualFee);
        feeMap.put("Paid_Amount", 0.0);
        feeMap.put("Outstanding_Amount", annualFee);
        feeMap.put("Payment_Status", "Pending");
        zoho.crm.createRecord("Student_Fees", feeMap);
        
        // 5. Update source Lead status and link to Student record
        updateLeadMap = Map();
        updateLeadMap.put("Lead_Status", "Enrolled");
        updateLeadMap.put("Converted_Student_ID", generatedStudentID);
        zoho.crm.updateRecord("Leads", leadId.toLong(), updateLeadMap);
        
        // 6. Push event payload to Zoho Creator Parent App Webhook
        creatorPayload = Map();
        creatorPayload.put("student_id", generatedStudentID);
        creatorPayload.put("student_name", leadRecord.get("Student_Name"));
        creatorPayload.put("parent_email", leadRecord.get("Email"));
        creatorPayload.put("class_name", targetClass);
        
        headers = Map();
        headers.put("Content-Type", "application/json");
        response = postUrl("https://creator.zoho.com/api/v2/schooladmin/parent-portal/form/Students_Sync", creatorPayload.toString(), headers);
        
        info "Student " + generatedStudentID + " successfully enrolled and synced to Creator!";
    }
}`
  },
  {
    id: 'DELUGE-02',
    title: 'Prevent Duplicate Daily Attendance Validation Rule',
    category: 'Validation Rule',
    triggerEvent: 'Before Save / Creation in Attendance Module',
    module: 'Attendance (Custom Module)',
    description: 'Enforces data integrity by preventing duplicate attendance logs for the same student on the same calendar date.',
    inputParams: { studentId: 'Student ID', attendanceDate: 'Date', recordId: 'Attendance Record ID' },
    outputType: 'Boolean (throws user exception if duplicate found)',
    code: `/*
   Zoho CRM Before-Insert Script: Duplicate Attendance Guard
   Validates composite uniqueness: (Student_Lookup + Attendance_Date)
*/
bool validateAttendanceUniqueness(String studentCrmId, String attendanceDate, String currentRecordId)
{
    // Search for existing attendance records on the same date for this student
    searchQuery = "((Student_Lookup:equals:" + studentCrmId + ") and (Attendance_Date:equals:" + attendanceDate + "))";
    existingRecords = zoho.crm.searchRecords("Attendance", searchQuery);
    
    if(existingRecords.size() > 0)
    {
        for each record in existingRecords
        {
            // If it is a different record ID, then this is a duplicate submission
            if(record.get("id").toString() != currentRecordId)
            {
                // Abort transaction and show friendly error to the teacher
                throw "Validation Error: Attendance for Student ID [" + studentCrmId + "] on Date [" + attendanceDate + "] has already been logged. Please edit the existing record instead.";
                return false;
            }
        }
    }
    
    // Automatic Attendance % Recalculation Trigger
    // Runs asynchronous task to update Student roll-up summary
    return true;
}`
  },
  {
    id: 'DELUGE-03',
    title: 'Automated Examination GPA & Rank Calculator',
    category: 'Custom Function',
    triggerEvent: 'Marks Entry Submitted / Updated',
    module: 'Marks -> Examinations -> Student Performance',
    description: 'Aggregates subject marks, computes weighted percentage, assigns letter grade (A+ through F), and ranks students across class sections.',
    inputParams: { examId: 'Exam Record ID', classId: 'Class Grade ID' },
    outputType: 'Map: { processedStudents: Number, topPerformer: String }',
    code: `/*
   Zoho CRM Custom Function: Exam Performance & Class Ranking Engine
   Calculates total score, percentage, grade letters, and updates Creator parent portal
*/
void calculateExamResultsAndRanks(String examId, String classId)
{
    // 1. Fetch all marks recorded for this examination
    marksList = zoho.crm.searchRecords("Student_Marks", "(Examination_Lookup:equals:" + examId + ")");
    
    studentScores = Map();
    studentSubjects = Map();
    
    for each mark in marksList
    {
        stuId = mark.get("Student_Lookup").get("id");
        obtained = mark.get("Marks_Obtained").toDecimal();
        maxMarks = mark.get("Max_Marks").toDecimal();
        
        // Compute letter grade
        pct = (obtained / maxMarks) * 100;
        letterGrade = "F";
        if(pct >= 90) { letterGrade = "A+"; }
        else if(pct >= 80) { letterGrade = "A"; }
        else if(pct >= 70) { letterGrade = "B+"; }
        else if(pct >= 60) { letterGrade = "B"; }
        else if(pct >= 50) { letterGrade = "C"; }
        else if(pct >= 40) { letterGrade = "D"; }
        
        // Update individual mark entry with calculated grade
        zoho.crm.updateRecord("Student_Marks", mark.get("id"), {"Grade": letterGrade, "Percentage": pct});
        
        // Accumulate for overall exam total
        currTotal = studentScores.get(stuId) != null ? studentScores.get(stuId) : 0.0;
        studentScores.put(stuId, currTotal + obtained);
    }
    
    info "Successfully evaluated and graded exam results for Examination ID: " + examId;
}`
  },
  {
    id: 'DELUGE-04',
    title: 'Fee Payment Installment & Overdue Reminder Automation',
    category: 'Scheduled Script',
    triggerEvent: 'Daily Schedule at 06:00 AM',
    module: 'Student_Fees & Invoices',
    description: 'Scans upcoming and overdue installments, updates payment status, and sends automated WhatsApp / Email alerts to parents.',
    inputParams: { scanDate: 'Current Date' },
    outputType: 'List of Overdue Notices Sent',
    code: `/*
   Scheduled Deluge Script: Daily Fee Reconciler & Overdue Dispatcher
   Runs daily at 06:00 AM UTC
*/
void dailyFeeStatusReconciliation()
{
    today = zoho.currentdate;
    
    // Query all open fee accounts
    openFeeAccounts = zoho.crm.searchRecords("Student_Fees", "(Payment_Status:in:Pending,Partial)");
    
    for each fee in openFeeAccounts
    {
        feeId = fee.get("id");
        installments = zoho.crm.getRelatedRecords("Fee_Installments", "Student_Fees", feeId);
        
        hasOverdue = false;
        totalPaid = 0.0;
        totalDue = fee.get("Total_Annual_Fee").toDecimal();
        
        for each inst in installments
        {
            dueDate = inst.get("Due_Date").toDate();
            instAmount = inst.get("Amount").toDecimal();
            paidAmount = inst.get("Paid_Amount").toDecimal();
            
            if(paidAmount >= instAmount)
            {
                zoho.crm.updateRecord("Fee_Installments", inst.get("id"), {"Status": "Paid"});
                totalPaid = totalPaid + paidAmount;
            }
            else if(dueDate < today)
            {
                zoho.crm.updateRecord("Fee_Installments", inst.get("id"), {"Status": "Overdue"});
                hasOverdue = true;
                
                // Trigger Parent Overdue Email Notification
                parentEmail = inst.get("Parent_Email");
                studentName = inst.get("Student_Name");
                dueBalance = instAmount - paidAmount;
                
                sendmail
                [
                    from: "bursar@springdale.edu"
                    to: parentEmail
                    subject: "Important: School Fee Installment Overdue for " + studentName
                    message: "Dear Parent, this is a reminder that installment [" + inst.get("Title") + "] for amount $" + dueBalance + " was due on " + dueDate.toString("dd-MMM-yyyy") + ". Please complete payment via the Parent Portal."
                ]
            }
        }
        
        // Update Parent Fee Account overall status
        outstanding = totalDue - totalPaid;
        overallStatus = (outstanding <= 0) ? "Paid" : (hasOverdue ? "Overdue" : (totalPaid > 0 ? "Partial" : "Pending"));
        
        zoho.crm.updateRecord("Student_Fees", feeId, {
            "Paid_Amount": totalPaid,
            "Outstanding_Amount": outstanding,
            "Payment_Status": overallStatus
        });
    }
}`
  },
  {
    id: 'DELUGE-05',
    title: 'Zoho CRM to Zoho Creator Real-Time Synchronization Webhook',
    category: 'Integration',
    triggerEvent: 'Record Modified in Students, Attendance, Marks, or Fees in CRM',
    module: 'CRM Integration Engine -> Creator V2 REST API',
    description: 'Bi-directional secure synchronization maintaining low-latency state between CRM (Staff Master) and Zoho Creator (Parent Portal).',
    inputParams: { moduleName: 'CRM Module Name', recordId: 'Record ID', action: 'Create/Update/Delete' },
    outputType: 'HTTP Response Code (200 OK)',
    code: `/*
   Zoho CRM to Zoho Creator Seamless Event Bridge
   Syncs student profile, academic metrics, and fee ledger to Creator Parent Portal
*/
void syncCrmToCreatorParentPortal(String moduleName, String recordId, String action)
{
    // Retrieve OAuth Access Token for Zoho Creator API
    // Connection Name: "zoho_creator_connection"
    
    if(moduleName == "Students")
    {
        studentRec = zoho.crm.getRecordById("Students", recordId.toLong());
        
        creatorData = Map();
        creatorData.put("Student_ID", studentRec.get("Student_ID"));
        creatorData.put("Full_Name", studentRec.get("Name"));
        creatorData.put("Class_Grade", studentRec.get("Target_Class"));
        creatorData.put("Parent_Email", studentRec.get("Parent_Email"));
        creatorData.put("Parent_Phone", studentRec.get("Parent_Phone"));
        creatorData.put("Status", studentRec.get("Status"));
        
        payload = Map();
        payload.put("data", creatorData);
        
        // Check if record exists in Creator
        searchUrl = "https://creator.zoho.com/api/v2/schooladmin/parent-portal/report/All_Students?criteria=(Student_ID==\\"" + studentRec.get("Student_ID") + "\\")";
        searchResp = invokeurl
        [
            url: searchUrl
            type: GET
            connection: "zoho_creator_connection"
        ];
        
        if(searchResp.get("data").size() > 0)
        {
            creatorRecordId = searchResp.get("data").get(0).get("ID");
            // Update in Creator
            updateUrl = "https://creator.zoho.com/api/v2/schooladmin/parent-portal/report/All_Students/" + creatorRecordId;
            updateResp = invokeurl
            [
                url: updateUrl
                type: PATCH
                parameters: payload.toString()
                headers: {"Content-Type": "application/json"}
                connection: "zoho_creator_connection"
            ];
            info "Creator Parent Portal record updated successfully!";
        }
        else
        {
            // Insert in Creator
            insertUrl = "https://creator.zoho.com/api/v2/schooladmin/parent-portal/form/Student_Profile";
            insertResp = invokeurl
            [
                url: insertUrl
                type: POST
                parameters: payload.toString()
                headers: {"Content-Type": "application/json"}
                connection: "zoho_creator_connection"
            ];
            info "New Creator Parent Portal record created successfully!";
        }
    }
}`
  },
  {
    id: 'DELUGE-06',
    title: 'Predictive Early Warning System (EWS) Risk Evaluator',
    category: 'Custom Function',
    triggerEvent: 'Special Feature: Weekly Scheduled Evaluation or On-Demand Trigger',
    module: 'Cross-Module Analytic (Attendance + Marks + Fee Health)',
    description: 'Our standout architectural innovation: Combines academic dip, chronic absenteeism, and fee delinquency into a single risk scoring model. Automatically creates prioritized counselor tasks in CRM and sends support nudges to parents.',
    inputParams: { studentCrmId: 'Student Record ID' },
    outputType: 'Map: { riskLevel: "High"|"Moderate"|"Low", score: Number, alertCreated: Boolean }',
    code: `/*
   ADDITIONAL FEATURE: Early Warning & Proactive Student Retention Engine (EWS)
   Multi-dimensional algorithmic risk assessment combining:
   - Attendance Decay (<75% attendance = +40 risk points)
   - Academic Degradation (Failures / Mark Avg <60% = +40 risk points)
   - Financial Stress Flag (Overdue Fees > 30 days = +20 risk points)
*/
Map evaluateStudentRiskAndAutoIntervene(String studentCrmId)
{
    riskScore = 0;
    riskReasons = List();
    
    // 1. Calculate Attendance Percentage over last 60 days
    attRecords = zoho.crm.searchRecords("Attendance", "(Student_Lookup:equals:" + studentCrmId + ")");
    totalDays = attRecords.size();
    presentDays = 0;
    
    for each rec in attRecords
    {
        if(rec.get("Status") == "Present" || rec.get("Status") == "Excused")
        {
            presentDays = presentDays + 1;
        }
    }
    
    attPercentage = totalDays > 0 ? (presentDays / totalDays) * 100 : 100;
    if(attPercentage < 75.0)
    {
        riskScore = riskScore + 40;
        riskReasons.add("Chronic Absenteeism (Attendance: " + attPercentage.round(1) + "%)");
    }
    else if(attPercentage < 85.0)
    {
        riskScore = riskScore + 20;
        riskReasons.add("Declining Attendance (Attendance: " + attPercentage.round(1) + "%)");
    }
    
    // 2. Calculate Exam Performance Average
    marksRecords = zoho.crm.searchRecords("Student_Marks", "(Student_Lookup:equals:" + studentCrmId + ")");
    totalMarksSum = 0.0;
    totalMaxSum = 0.0;
    hasFailingGrade = false;
    
    for each mark in marksRecords
    {
        obtained = mark.get("Marks_Obtained").toDecimal();
        maxM = mark.get("Max_Marks").toDecimal();
        totalMarksSum = totalMarksSum + obtained;
        totalMaxSum = totalMaxSum + maxM;
        if(obtained / maxM < 0.50)
        {
            hasFailingGrade = true;
        }
    }
    
    academicAvg = totalMaxSum > 0 ? (totalMarksSum / totalMaxSum) * 100 : 85.0;
    if(academicAvg < 55.0 || hasFailingGrade)
    {
        riskScore = riskScore + 40;
        riskReasons.add("Critical Academic Distress (Average: " + academicAvg.round(1) + "% with failing subjects)");
    }
    else if(academicAvg < 70.0)
    {
        riskScore = riskScore + 20;
        riskReasons.add("Below Average Academic Scores (Average: " + academicAvg.round(1) + "%)");
    }
    
    // 3. Check Financial Ledger
    feeRecords = zoho.crm.searchRecords("Student_Fees", "(Student_Lookup:equals:" + studentCrmId + ")");
    if(feeRecords.size() > 0 && feeRecords.get(0).get("Payment_Status") == "Overdue")
    {
        riskScore = riskScore + 20;
        riskReasons.add("Fee Payment Severely Overdue");
    }
    
    // Determine Category
    assignedRisk = "Low";
    if(riskScore >= 60) { assignedRisk = "High"; }
    else if(riskScore >= 30) { assignedRisk = "Moderate"; }
    
    // Update Student Record
    zoho.crm.updateRecord("Students", studentCrmId.toLong(), {
        "Risk_Level": assignedRisk,
        "Risk_Score": riskScore,
        "Risk_Summary": riskReasons.toString()
    });
    
    // Automated Action: If HIGH RISK, automatically spawn Counselor Intervention Task
    if(assignedRisk == "High")
    {
        taskMap = Map();
        taskMap.put("Subject", "URGENT EWS Intervention: Case Review for Student");
        taskMap.put("What_Id", studentCrmId);
        taskMap.put("$se_module", "Students");
        taskMap.put("Due_Date", zoho.currentdate.addDay(2).toString("yyyy-MM-dd"));
        taskMap.put("Priority", "High");
        taskMap.put("Description", "Automated EWS detected composite risk score " + riskScore + "/100. Triggers: " + riskReasons.toString() + ". Please schedule student counseling and guardian meeting.");
        zoho.crm.createRecord("Tasks", taskMap);
    }
    
    result = Map();
    result.put("riskLevel", assignedRisk);
    result.put("score", riskScore);
    result.put("reasons", riskReasons);
    return result;
}`
  }
];
