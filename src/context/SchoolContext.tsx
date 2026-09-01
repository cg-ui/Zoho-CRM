import React, { createContext, useContext, useState, useEffect } from 'react';
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
  FeeInstallment,
  PaymentTransaction,
  EarlyWarningAlert,
  DelugeScript,
  AdmissionStatus,
  AttendanceStatus
} from '../types';
import {
  initialAcademicYears,
  initialClasses,
  initialSections,
  initialSubjects,
  initialTeachers,
  initialLeads,
  initialStudents,
  initialAttendanceRecords,
  initialExaminations,
  initialMarkEntries,
  initialFeeAccounts,
  initialPaymentTransactions,
  initialEarlyWarningAlerts,
  delugeScriptsRegistry
} from '../data/mockData';

export type AppPortal = 'crm' | 'creator' | 'webform' | 'deluge' | 'architecture';
export type CrmTab = 
  | 'dashboard' 
  | 'admissions' 
  | 'students' 
  | 'academics' 
  | 'attendance' 
  | 'exams' 
  | 'fees' 
  | 'early-warning';

interface NotificationMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
}

interface SchoolContextType {
  // Navigation
  currentPortal: AppPortal;
  setCurrentPortal: (portal: AppPortal) => void;
  crmTab: CrmTab;
  setCrmTab: (tab: CrmTab) => void;
  
  // Data
  academicYears: AcademicYear[];
  classes: ClassGrade[];
  sections: Section[];
  subjects: Subject[];
  teachers: Teacher[];
  leads: AdmissionLead[];
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  examinations: Examination[];
  markEntries: MarkEntry[];
  feeAccounts: StudentFeeAccount[];
  paymentTransactions: PaymentTransaction[];
  earlyWarningAlerts: EarlyWarningAlert[];
  delugeScripts: DelugeScript[];
  notifications: NotificationMessage[];
  
  // Active selection for parent portal
  selectedParentEmail: string;
  setSelectedParentEmail: (email: string) => void;
  selectedStudentId: string;
  setSelectedStudentId: (id: string) => void;
  
  // Action Handlers
  addLeadFromWebform: (leadData: Omit<AdmissionLead, 'id' | 'enquiryNumber' | 'enquiryDate' | 'status'>) => AdmissionLead;
  updateLeadStatus: (leadId: string, status: AdmissionStatus, notes?: string) => void;
  convertLeadToStudent: (leadId: string, assignedClassId: string, assignedSectionId: string) => Student;
  
  addStudent: (student: Omit<Student, 'id' | 'admissionDate'>) => Student;
  updateStudent: (studentId: string, updates: Partial<Student>) => void;
  
  recordAttendance: (record: { studentId: string; classId: string; sectionId: string; date: string; status: AttendanceStatus; remarks?: string }) => { success: boolean; error?: string; record?: AttendanceRecord };
  recordBatchAttendance: (date: string, records: { studentId: string; classId: string; sectionId: string; status: AttendanceStatus; remarks?: string }[]) => { successCount: number; duplicateCount: number };
  
  addExamination: (exam: Omit<Examination, 'id'>) => Examination;
  saveMarkEntry: (entry: Omit<MarkEntry, 'id' | 'grade'>) => MarkEntry;
  saveBatchMarks: (examId: string, marks: { studentId: string; subjectId: string; marksObtained: number; maxMarks: number; feedback?: string }[]) => void;
  
  processFeePayment: (payment: { studentId: string; installmentId: string; amount: number; paymentMethod: PaymentTransaction['paymentMethod']; transactionRef?: string; notes?: string }) => PaymentTransaction;
  
  runEarlyWarningScan: () => void;
  updateAlertStatus: (alertId: string, status: EarlyWarningAlert['status'], actionPlan?: string) => void;
  
  dismissNotification: (id: string) => void;
  triggerNotification: (title: string, message: string, type?: NotificationMessage['type']) => void;
  
  // Helpers
  getStudentById: (id: string) => Student | undefined;
  getClassById: (id: string) => ClassGrade | undefined;
  getSectionById: (id: string) => Section | undefined;
  getSubjectById: (id: string) => Subject | undefined;
  getTeacherById: (id: string) => Teacher | undefined;
  getStudentAttendancePercentage: (studentId: string) => number;
  getStudentFeeAccount: (studentId: string) => StudentFeeAccount | undefined;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPortal, setCurrentPortal] = useState<AppPortal>('crm');
  const [crmTab, setCrmTab] = useState<CrmTab>('dashboard');

  const [academicYears] = useState<AcademicYear[]>(initialAcademicYears);
  const [classes, setClasses] = useState<ClassGrade[]>(initialClasses);
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [leads, setLeads] = useState<AdmissionLead[]>(initialLeads);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [examinations, setExaminations] = useState<Examination[]>(initialExaminations);
  const [markEntries, setMarkEntries] = useState<MarkEntry[]>(initialMarkEntries);
  const [feeAccounts, setFeeAccounts] = useState<StudentFeeAccount[]>(initialFeeAccounts);
  const [paymentTransactions, setPaymentTransactions] = useState<PaymentTransaction[]>(initialPaymentTransactions);
  const [earlyWarningAlerts, setEarlyWarningAlerts] = useState<EarlyWarningAlert[]>(initialEarlyWarningAlerts);
  const [delugeScripts] = useState<DelugeScript[]>(delugeScriptsRegistry);
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  const [selectedParentEmail, setSelectedParentEmail] = useState<string>('catherine.hayes@example.com');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('STU-2025-001');

  const triggerNotification = (title: string, message: string, type: NotificationMessage['type'] = 'info') => {
    const newNotification: NotificationMessage = {
      id: 'NOTIF-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 7)]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Helper getters
  const getStudentById = (id: string) => students.find(s => s.id === id);
  const getClassById = (id: string) => classes.find(c => c.id === id);
  const getSectionById = (id: string) => sections.find(s => s.id === id);
  const getSubjectById = (id: string) => subjects.find(sub => sub.id === id);
  const getTeacherById = (id: string) => teachers.find(t => t.id === id);

  const getStudentAttendancePercentage = (studentId: string) => {
    const studentRecords = attendanceRecords.filter(r => r.studentId === studentId);
    if (studentRecords.length === 0) return 100;
    const presentCount = studentRecords.filter(r => r.status === 'Present' || r.status === 'Late' || r.status === 'Excused').length;
    return Math.round((presentCount / studentRecords.length) * 100);
  };

  const getStudentFeeAccount = (studentId: string) => feeAccounts.find(f => f.studentId === studentId);

  // Webform submission -> Leads module
  const addLeadFromWebform = (leadData: Omit<AdmissionLead, 'id' | 'enquiryNumber' | 'enquiryDate' | 'status'>): AdmissionLead => {
    const newEnquiryNumber = `ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead: AdmissionLead = {
      ...leadData,
      id: `LEAD-2025-${Math.floor(100 + Math.random() * 900)}`,
      enquiryNumber: newEnquiryNumber,
      enquiryDate: new Date().toISOString().split('T')[0],
      status: 'New Enquiry',
      assignedCounselor: 'Amanda Clark (Senior Admissions)',
      score: 85,
    };

    setLeads(prev => [newLead, ...prev]);
    triggerNotification(
      'New Admission Enquiry Received',
      `Lead ${newLead.studentName} captured from Zoho CRM Webform (${newEnquiryNumber}). Assigned to Admissions counselor.`,
      'info'
    );
    return newLead;
  };

  const updateLeadStatus = (leadId: string, status: AdmissionStatus, notes?: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          status,
          notes: notes ? `${l.notes}\n[${new Date().toLocaleDateString()}] ${notes}` : l.notes
        };
      }
      return l;
    }));

    triggerNotification(
      'Admission Lead Updated',
      `Lead status moved to "${status}". Automation workflows synchronized.`,
      'info'
    );
  };

  // Convert Lead to Student (Executes the logic from Deluge 01 script)
  const convertLeadToStudent = (leadId: string, assignedClassId: string, assignedSectionId: string): Student => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) throw new Error('Lead not found');

    const yearPrefix = '2025';
    const nextSeqNum = students.length + 1;
    const formattedSeq = nextSeqNum.toString().padStart(3, '0');
    const newStudentId = `STU-${yearPrefix}-${formattedSeq}`;

    const targetClass = classes.find(c => c.id === assignedClassId) || classes[0];
    const targetSection = sections.find(s => s.id === assignedSectionId) || sections[0];

    const newStudent: Student = {
      id: newStudentId,
      crmLeadId: lead.id,
      name: lead.studentName,
      dob: lead.dob,
      gender: lead.gender,
      bloodGroup: 'O+',
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + nextSeqNum * 100}?w=150&auto=format&fit=crop&q=80`,
      parentName: lead.parentName,
      parentEmail: lead.parentEmail,
      parentPhone: lead.parentPhone,
      parentAddress: 'Primary Residence on Record',
      currentAcademicYearId: 'AY-2025-26',
      currentClassId: targetClass.id,
      currentSectionId: targetSection.id,
      rollNumber: `${targetSection.name.split(' ')[1] || '01'}-${formattedSeq.slice(-2)}`,
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      emergencyContact: {
        name: lead.parentName,
        relationship: 'Parent / Guardian',
        phone: lead.parentPhone,
      },
      academicHistory: [],
      riskLevel: 'Low',
    };

    // Auto-create Student Fee Account with 3 installment breakdown
    const annualFee = targetClass.annualFee;
    const installment1 = Math.round(annualFee * 0.35);
    const installment2 = Math.round(annualFee * 0.35);
    const installment3 = annualFee - installment1 - installment2;

    const newFeeAccount: StudentFeeAccount = {
      id: `FEE-${yearPrefix}-${formattedSeq}`,
      studentId: newStudentId,
      academicYearId: 'AY-2025-26',
      totalFee: annualFee,
      discount: 0,
      netFee: annualFee,
      amountPaid: 0,
      outstandingBalance: annualFee,
      status: 'Pending',
      installments: [
        { id: `INST-${newStudentId}-1`, title: 'Term 1 Tuition & Registration', dueDate: '2025-06-15', amount: installment1, paidAmount: 0, status: 'Unpaid' },
        { id: `INST-${newStudentId}-2`, title: 'Term 2 Tuition & STEM Lab Fee', dueDate: '2025-10-15', amount: installment2, paidAmount: 0, status: 'Unpaid' },
        { id: `INST-${newStudentId}-3`, title: 'Term 3 Tuition & Examination Fee', dueDate: '2026-02-15', amount: installment3, paidAmount: 0, status: 'Unpaid' },
      ]
    };

    // Update Lead state
    setLeads(prev => prev.map(l => l.id === leadId ? {
      ...l,
      status: 'Enrolled',
      convertedStudentId: newStudentId
    } : l));

    setStudents(prev => [newStudent, ...prev]);
    setFeeAccounts(prev => [newFeeAccount, ...prev]);

    triggerNotification(
      'Admission Confirmed & Student Enrolled!',
      `Generated Student ID: ${newStudentId} for ${newStudent.name}. Fee account generated and auto-synced to Zoho Creator Parent App.`,
      'success'
    );

    return newStudent;
  };

  const addStudent = (studentData: Omit<Student, 'id' | 'admissionDate'>): Student => {
    const yearPrefix = '2025';
    const nextSeqNum = students.length + 1;
    const formattedSeq = nextSeqNum.toString().padStart(3, '0');
    const newStudentId = `STU-${yearPrefix}-${formattedSeq}`;

    const newStudent: Student = {
      ...studentData,
      id: newStudentId,
      admissionDate: new Date().toISOString().split('T')[0],
    };

    setStudents(prev => [newStudent, ...prev]);
    triggerNotification('Student Created', `New student record ${newStudentId} added to Zoho CRM.`, 'success');
    return newStudent;
  };

  const updateStudent = (studentId: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, ...updates } : s));
    triggerNotification('Student Profile Updated', `Student ${studentId} details updated in CRM and synced to Creator.`, 'info');
  };

  // Attendance Record with Duplicate Prevention (Deluge 02 implementation)
  const recordAttendance = (record: { studentId: string; classId: string; sectionId: string; date: string; status: AttendanceStatus; remarks?: string }) => {
    // Check if duplicate exists for (studentId + date)
    const existing = attendanceRecords.find(r => r.studentId === record.studentId && r.date === record.date);
    if (existing) {
      triggerNotification(
        'Duplicate Attendance Prevented',
        `Attendance for Student ${record.studentId} on ${record.date} is already recorded (${existing.status}). Please update the existing entry.`,
        'warning'
      );
      return { success: false, error: `Duplicate: Attendance on ${record.date} already exists.` };
    }

    const newRecord: AttendanceRecord = {
      id: `ATT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...record,
      markedByTeacherId: 'TCH-002',
      timestamp: new Date().toISOString(),
    };

    setAttendanceRecords(prev => [newRecord, ...prev]);
    triggerNotification('Attendance Recorded', `Logged ${record.status} for student ${record.studentId} on ${record.date}.`, 'success');
    return { success: true, record: newRecord };
  };

  const recordBatchAttendance = (date: string, records: { studentId: string; classId: string; sectionId: string; status: AttendanceStatus; remarks?: string }[]) => {
    let successCount = 0;
    let duplicateCount = 0;
    const newItems: AttendanceRecord[] = [];

    records.forEach(r => {
      const existing = attendanceRecords.find(item => item.studentId === r.studentId && item.date === date);
      if (existing) {
        duplicateCount++;
      } else {
        successCount++;
        newItems.push({
          id: `ATT-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          studentId: r.studentId,
          classId: r.classId,
          sectionId: r.sectionId,
          date,
          status: r.status,
          remarks: r.remarks,
          markedByTeacherId: 'TCH-002',
          timestamp: new Date().toISOString(),
        });
      }
    });

    if (newItems.length > 0) {
      setAttendanceRecords(prev => [...newItems, ...prev]);
    }

    triggerNotification(
      'Batch Attendance Processed',
      `Saved ${successCount} attendance records for ${date}. ${duplicateCount > 0 ? `Prevented ${duplicateCount} duplicate entries.` : ''}`,
      duplicateCount > 0 ? 'warning' : 'success'
    );

    return { successCount, duplicateCount };
  };

  // Exam and Marks
  const addExamination = (examData: Omit<Examination, 'id'>): Examination => {
    const newExam: Examination = {
      ...examData,
      id: `EXAM-2025-${Math.floor(100 + Math.random() * 900)}`,
    };
    setExaminations(prev => [newExam, ...prev]);
    triggerNotification('Examination Scheduled', `Exam "${newExam.name}" scheduled for Class.`, 'info');
    return newExam;
  };

  const calculateGradeLetter = (marks: number, maxMarks: number): MarkEntry['grade'] => {
    const pct = (marks / maxMarks) * 100;
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B+';
    if (pct >= 60) return 'B';
    if (pct >= 50) return 'C';
    if (pct >= 40) return 'D';
    return 'F';
  };

  const saveMarkEntry = (entry: Omit<MarkEntry, 'id' | 'grade'>): MarkEntry => {
    const grade = calculateGradeLetter(entry.marksObtained, entry.maxMarks);
    const existingIndex = markEntries.findIndex(m => m.examId === entry.examId && m.studentId === entry.studentId && m.subjectId === entry.subjectId);

    let savedEntry: MarkEntry;
    if (existingIndex >= 0) {
      savedEntry = { ...markEntries[existingIndex], marksObtained: entry.marksObtained, maxMarks: entry.maxMarks, grade, feedback: entry.feedback };
      setMarkEntries(prev => prev.map((m, idx) => idx === existingIndex ? savedEntry : m));
    } else {
      savedEntry = {
        id: `MRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        ...entry,
        grade
      };
      setMarkEntries(prev => [savedEntry, ...prev]);
    }

    triggerNotification('Mark Logged', `Recorded ${entry.marksObtained}/${entry.maxMarks} (Grade ${grade}) for student ${entry.studentId}.`, 'success');
    return savedEntry;
  };

  const saveBatchMarks = (examId: string, marks: { studentId: string; subjectId: string; marksObtained: number; maxMarks: number; feedback?: string }[]) => {
    marks.forEach(m => {
      saveMarkEntry({
        examId,
        studentId: m.studentId,
        subjectId: m.subjectId,
        marksObtained: m.marksObtained,
        maxMarks: m.maxMarks,
        feedback: m.feedback
      });
    });
    triggerNotification('Batch Marks Saved', `Updated marks for ${marks.length} entries. Aggregated GPA & ranks recalculated in CRM and pushed to Parent App.`, 'success');
  };

  // Fee Payments
  const processFeePayment = (payment: {
    studentId: string;
    installmentId: string;
    amount: number;
    paymentMethod: PaymentTransaction['paymentMethod'];
    transactionRef?: string;
    notes?: string;
  }): PaymentTransaction => {
    const feeAcc = feeAccounts.find(f => f.studentId === payment.studentId);
    if (!feeAcc) throw new Error('Fee account not found for student');

    const receiptNo = `REC-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTxn: PaymentTransaction = {
      id: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      receiptNumber: receiptNo,
      studentId: payment.studentId,
      studentFeeAccountId: feeAcc.id,
      installmentId: payment.installmentId,
      amount: payment.amount,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: payment.paymentMethod,
      transactionReference: payment.transactionRef || `TXN_REF_${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Success',
      notes: payment.notes || 'Payment processed successfully',
    };

    // Update installments and fee account totals
    const updatedInstallments = feeAcc.installments.map(inst => {
      if (inst.id === payment.installmentId) {
        const newPaid = inst.paidAmount + payment.amount;
        const newStatus: FeeInstallment['status'] = newPaid >= inst.amount ? 'Paid' : newPaid > 0 ? 'Partially Paid' : 'Unpaid';
        return { ...inst, paidAmount: newPaid, status: newStatus };
      }
      return inst;
    });

    const newAmountPaid = feeAcc.amountPaid + payment.amount;
    const newOutstanding = Math.max(0, feeAcc.netFee - newAmountPaid);
    const hasOverdue = updatedInstallments.some(inst => inst.status === 'Overdue');
    const newOverallStatus: StudentFeeAccount['status'] = newOutstanding <= 0 ? 'Paid' : hasOverdue ? 'Overdue' : newAmountPaid > 0 ? 'Partial' : 'Pending';

    setFeeAccounts(prev => prev.map(f => f.id === feeAcc.id ? {
      ...f,
      amountPaid: newAmountPaid,
      outstandingBalance: newOutstanding,
      status: newOverallStatus,
      installments: updatedInstallments
    } : f));

    setPaymentTransactions(prev => [newTxn, ...prev]);

    triggerNotification(
      'Payment Recorded Successfully',
      `Receipt #${receiptNo} generated for $${payment.amount}. CRM ledger and Creator Parent balance updated in real-time.`,
      'success'
    );

    return newTxn;
  };

  // Early Warning Scan (Evaluator implementation)
  const runEarlyWarningScan = () => {
    const updatedStudents = students.map(student => {
      const attRate = getStudentAttendancePercentage(student.id);
      const studentMarks = markEntries.filter(m => m.studentId === student.id);
      let avgScore = 85;
      if (studentMarks.length > 0) {
        const sum = studentMarks.reduce((acc, curr) => acc + (curr.marksObtained / curr.maxMarks) * 100, 0);
        avgScore = sum / studentMarks.length;
      }
      const feeAcc = feeAccounts.find(f => f.studentId === student.id);
      const isFeeOverdue = feeAcc?.status === 'Overdue';

      let riskScore = 0;
      const reasons: string[] = [];

      if (attRate < 75) {
        riskScore += 40;
        reasons.push(`Chronic Absenteeism (Attendance: ${attRate}%)`);
      } else if (attRate < 85) {
        riskScore += 20;
        reasons.push(`Declining Attendance (Attendance: ${attRate}%)`);
      }

      if (avgScore < 55) {
        riskScore += 40;
        reasons.push(`Academic Distress (Assessment Avg: ${Math.round(avgScore)}%)`);
      } else if (avgScore < 70) {
        riskScore += 20;
        reasons.push(`Below Expected Academic Performance (${Math.round(avgScore)}%)`);
      }

      if (isFeeOverdue) {
        riskScore += 20;
        reasons.push('Fee Payment Past Due Date');
      }

      let riskLevel: Student['riskLevel'] = 'Low';
      if (riskScore >= 50) riskLevel = 'High';
      else if (riskScore >= 25) riskLevel = 'Moderate';

      return {
        ...student,
        riskLevel,
        riskReasons: reasons.length > 0 ? reasons : undefined
      };
    });

    setStudents(updatedStudents);

    // Create high risk alert records if needed
    const highRiskStudents = updatedStudents.filter(s => s.riskLevel === 'High');
    highRiskStudents.forEach(stu => {
      const existingAlert = earlyWarningAlerts.find(a => a.studentId === stu.id && a.status !== 'Resolved');
      if (!existingAlert) {
        const newAlert: EarlyWarningAlert = {
          id: `EWS-ALERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          studentId: stu.id,
          detectedDate: new Date().toISOString().split('T')[0],
          riskLevel: 'High',
          triggers: {
            attendanceRate: getStudentAttendancePercentage(stu.id),
            academicScoreAvg: 54,
            feeOverdueDays: 30,
          },
          status: 'Open',
          counselorAssigned: 'Amanda Clark (Senior Counselor)',
          actionPlan: 'Automatic task created in CRM: Schedule academic counseling and guardian follow-up call.',
        };
        setEarlyWarningAlerts(prev => [newAlert, ...prev]);
      }
    });

    triggerNotification(
      'Early Warning Scan Completed',
      `Scanned ${students.length} students. Identified ${highRiskStudents.length} high-risk cases requiring intervention.`,
      highRiskStudents.length > 0 ? 'warning' : 'success'
    );
  };

  const updateAlertStatus = (alertId: string, status: EarlyWarningAlert['status'], actionPlan?: string) => {
    setEarlyWarningAlerts(prev => prev.map(a => a.id === alertId ? {
      ...a,
      status,
      actionPlan: actionPlan || a.actionPlan
    } : a));
    triggerNotification('Early Warning Case Updated', `Case ${alertId} status changed to "${status}".`, 'info');
  };

  return (
    <SchoolContext.Provider
      value={{
        currentPortal,
        setCurrentPortal,
        crmTab,
        setCrmTab,
        academicYears,
        classes,
        sections,
        subjects,
        teachers,
        leads,
        students,
        attendanceRecords,
        examinations,
        markEntries,
        feeAccounts,
        paymentTransactions,
        earlyWarningAlerts,
        delugeScripts,
        notifications,
        selectedParentEmail,
        setSelectedParentEmail,
        selectedStudentId,
        setSelectedStudentId,
        addLeadFromWebform,
        updateLeadStatus,
        convertLeadToStudent,
        addStudent,
        updateStudent,
        recordAttendance,
        recordBatchAttendance,
        addExamination,
        saveMarkEntry,
        saveBatchMarks,
        processFeePayment,
        runEarlyWarningScan,
        updateAlertStatus,
        dismissNotification,
        triggerNotification,
        getStudentById,
        getClassById,
        getSectionById,
        getSubjectById,
        getTeacherById,
        getStudentAttendancePercentage,
        getStudentFeeAccount,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
