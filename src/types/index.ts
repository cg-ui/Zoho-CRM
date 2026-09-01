export type AdmissionStatus = 
  | 'New Enquiry' 
  | 'Contacted' 
  | 'Campus Visit' 
  | 'Assessment Scheduled' 
  | 'Admission Approved' 
  | 'Enrolled' 
  | 'Rejected';

export interface AdmissionLead {
  id: string;
  enquiryNumber: string;
  studentName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  targetGrade: string;
  previousSchool: string;
  enquiryDate: string;
  status: AdmissionStatus;
  notes: string;
  assignedCounselor: string;
  convertedStudentId?: string;
  score?: number;
}

export interface AcademicYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface ClassGrade {
  id: string;
  name: string;
  level: number;
  stream: string;
  annualFee: number;
}

export interface Section {
  id: string;
  classId: string;
  name: string;
  roomNo: string;
  capacity: number;
  classTeacherId: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  classId: string;
  teacherId: string;
  credits: number;
  maxMarks: number;
}

export interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  specialization: string;
  avatarUrl: string;
}

export interface AcademicHistory {
  academicYear: string;
  grade: string;
  section: string;
  gpa: number;
  attendancePercentage: number;
  status: 'Promoted' | 'Current' | 'Completed';
}

export type RiskLevel = 'Low' | 'Moderate' | 'High';

export interface Student {
  id: string; // STU-2025-XXXX
  crmLeadId?: string;
  name: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  avatarUrl: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  parentAddress: string;
  currentAcademicYearId: string;
  currentClassId: string;
  currentSectionId: string;
  rollNumber: string;
  admissionDate: string;
  status: 'Active' | 'Graduated' | 'Suspended' | 'Withdrawn';
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalNotes?: string;
  academicHistory: AcademicHistory[];
  riskLevel: RiskLevel;
  riskReasons?: string[];
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  sectionId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  markedByTeacherId: string;
  remarks?: string;
  timestamp: string;
}

export interface Examination {
  id: string;
  name: string; // e.g. "Term 1 Mid-Term", "Final Annual Exam"
  academicYearId: string;
  classId: string;
  startDate: string;
  endDate: string;
  totalMaxMarks: number;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Published';
}

export interface MarkEntry {
  id: string;
  examId: string;
  studentId: string;
  subjectId: string;
  marksObtained: number;
  maxMarks: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
  feedback?: string;
}

export interface FeeInstallment {
  id: string;
  title: string; // e.g. "Term 1 Tuition", "Term 2 Tuition"
  dueDate: string;
  amount: number;
  paidAmount: number;
  status: 'Paid' | 'Partially Paid' | 'Unpaid' | 'Overdue';
}

export interface StudentFeeAccount {
  id: string;
  studentId: string;
  academicYearId: string;
  totalFee: number;
  discount: number;
  netFee: number;
  amountPaid: number;
  outstandingBalance: number;
  status: 'Paid' | 'Partial' | 'Pending' | 'Overdue';
  installments: FeeInstallment[];
}

export interface PaymentTransaction {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentFeeAccountId: string;
  installmentId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'Credit Card' | 'Debit Card' | 'UPI' | 'Net Banking' | 'Cash' | 'Cheque';
  transactionReference: string;
  status: 'Success' | 'Pending' | 'Failed';
  notes?: string;
}

export interface EarlyWarningAlert {
  id: string;
  studentId: string;
  detectedDate: string;
  riskLevel: RiskLevel;
  triggers: {
    attendanceRate: number; // e.g. 68%
    academicScoreAvg: number; // e.g. 52%
    feeOverdueDays: number; // e.g. 35 days
  };
  status: 'Open' | 'Under Review' | 'Counseling Scheduled' | 'Resolved';
  actionPlan?: string;
  counselorAssigned: string;
}

export interface DelugeScript {
  id: string;
  title: string;
  category: 'Workflow' | 'Custom Function' | 'Validation Rule' | 'Integration' | 'Scheduled Script';
  triggerEvent: string;
  module: string;
  description: string;
  code: string;
  inputParams: Record<string, string>;
  outputType: string;
}
