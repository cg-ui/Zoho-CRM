import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Student, PaymentTransaction, FeeInstallment } from '../../types';
import {
  Smartphone,
  GraduationCap,
  CalendarCheck,
  Award,
  CreditCard,
  User,
  Phone,
  Mail,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Clock,
  Sparkles,
  Download,
  AlertTriangle,
  Receipt,
  Layers,
  HeartPulse,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ParentPortal: React.FC = () => {
  const {
    students,
    classes,
    sections,
    attendanceRecords,
    examinations,
    markEntries,
    feeAccounts,
    paymentTransactions,
    selectedParentEmail,
    setSelectedParentEmail,
    selectedStudentId,
    setSelectedStudentId,
    processFeePayment,
    getStudentAttendancePercentage,
    getStudentFeeAccount,
    triggerNotification
  } = useSchool();

  // Find all children associated with this parent email (Role-Based Access Control in Creator)
  const parentChildren = students.filter(s => s.parentEmail.toLowerCase() === selectedParentEmail.toLowerCase());
  
  // If current selected student isn't in parent's children, pick the first
  const activeChild = parentChildren.find(s => s.id === selectedStudentId) || parentChildren[0] || students[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'academics' | 'fees'>('overview');
  
  // Online Payment Simulator inside Creator
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState<FeeInstallment | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const childClass = classes.find(c => c.id === activeChild?.currentClassId);
  const childSection = sections.find(s => s.id === activeChild?.currentSectionId);
  const childAttendanceRecords = attendanceRecords.filter(r => r.studentId === activeChild?.id);
  const childAttPct = activeChild ? getStudentAttendancePercentage(activeChild.id) : 95;
  const childFeeAccount = activeChild ? getStudentFeeAccount(activeChild.id) : undefined;
  const childMarks = markEntries.filter(m => m.studentId === activeChild?.id);

  const handleOpenCheckout = (inst: FeeInstallment) => {
    setSelectedInstallment(inst);
    setShowCheckoutModal(true);
  };

  const handleSimulateOnlinePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChild || !selectedInstallment) return;

    setPaymentProcessing(true);

    setTimeout(() => {
      processFeePayment({
        studentId: activeChild.id,
        installmentId: selectedInstallment.id,
        amount: selectedInstallment.amount - selectedInstallment.paidAmount,
        paymentMethod: 'Credit Card',
        transactionRef: `CREATOR_GATEWAY_${Date.now()}`,
        notes: 'Online payment authorized via Zoho Creator Parent Portal'
      });

      setPaymentProcessing(false);
      setShowCheckoutModal(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Creator App Header & Parent Switcher */}
      <div className="card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold shadow-lg shadow-blue-900/10">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="status-pill bg-info text-[10px]">
                Zoho Creator Parent Application
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Connected to Zoho CRM
              </span>
            </div>
            <h1 className="text-xl font-bold text-white mt-1">EduCore Parent Portal</h1>
            <p className="text-xs text-[#9CA3AF]">
              Live synchronized portal delivering academic progress, attendance records, and secure fee settlement.
            </p>
          </div>
        </div>

        {/* Parent Role Filter Selector (Demonstrates Parent Data Isolation) */}
        <div className="p-2.5 rounded-xl bg-[#0A0C10] border border-[#1F2937] text-xs space-y-1">
          <label className="block text-[11px] font-bold text-[#9CA3AF]">Simulate Parent Sign-in:</label>
          <select
            value={selectedParentEmail}
            onChange={(e) => {
              setSelectedParentEmail(e.target.value);
              const kids = students.filter(s => s.parentEmail.toLowerCase() === e.target.value.toLowerCase());
              if (kids.length > 0) setSelectedStudentId(kids[0].id);
            }}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#111827] border border-[#1F2937] text-xs text-blue-400 font-semibold focus:outline-none focus:border-blue-500"
          >
            {Array.from(new Set(students.map(s => s.parentEmail))).map(email => {
              const guardian = students.find(s => s.parentEmail === email);
              return (
                <option key={email} value={email}>
                  {guardian?.parentName} ({email})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Child Switcher (If multiple kids belong to parent) */}
      {parentChildren.length > 1 && (
        <div className="flex items-center gap-2 p-2 bg-[#111827] rounded-xl border border-[#1F2937]">
          <span className="text-xs font-bold text-[#9CA3AF] px-2">Select Student:</span>
          {parentChildren.map(child => (
            <button
              key={child.id}
              onClick={() => setSelectedStudentId(child.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeChild.id === child.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-[#1F2937] text-[#D1D5DB] hover:bg-[#374151]'
              }`}
            >
              <img
                src={child.avatarUrl}
                alt={child.name}
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{child.name} ({child.id})</span>
            </button>
          ))}
        </div>
      )}

      {/* Student Identity Card in Creator */}
      {activeChild && (
        <div className="card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1F2937]">
            <div className="flex items-center gap-4">
              <img
                src={activeChild.avatarUrl}
                alt={activeChild.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover border-2 border-blue-500/40 shadow-lg shadow-blue-900/10"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{activeChild.name}</h2>
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-600 text-white">
                    {activeChild.id}
                  </span>
                </div>
                <p className="text-xs text-[#9CA3AF] mt-0.5">
                  {childClass?.name} • {childSection?.name} • Roll No: <span className="font-semibold text-white">{activeChild.rollNumber}</span>
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="status-pill bg-success text-[10px]">
                    Academic Year 2025 - 2026
                  </span>
                  <span className="text-xs text-[#9CA3AF]">•</span>
                  <span className="text-xs text-[#9CA3AF]">Class Teacher: Dr. Arthur Sterling</span>
                </div>
              </div>
            </div>

            {/* Quick KPI pills */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <div className="p-2.5 rounded-xl bg-[#0A0C10] border border-[#1F2937] text-center min-w-20">
                <span className="text-[10px] text-[#9CA3AF] uppercase font-semibold">Attendance</span>
                <p className={`text-sm font-bold ${childAttPct >= 85 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {childAttPct}%
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0A0C10] border border-[#1F2937] text-center min-w-20">
                <span className="text-[10px] text-[#9CA3AF] uppercase font-semibold">Fee Status</span>
                <p className={`text-sm font-bold ${
                  childFeeAccount?.status === 'Paid' ? 'text-emerald-400' : childFeeAccount?.status === 'Overdue' ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {childFeeAccount?.status || 'Active'}
                </p>
              </div>
            </div>
          </div>

          {/* Creator Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#1F2937] pb-3 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === 'overview'
                  ? 'bg-[#1F2937] text-[#F3F4F6] border-l-2 border-blue-500 shadow-sm'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/40'
              }`}
            >
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Student Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('attendance')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === 'attendance'
                  ? 'bg-[#1F2937] text-[#F3F4F6] border-l-2 border-blue-500 shadow-sm'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/40'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Attendance History</span>
            </button>

            <button
              onClick={() => setActiveTab('academics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === 'academics'
                  ? 'bg-[#1F2937] text-[#F3F4F6] border-l-2 border-blue-500 shadow-sm'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/40'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Exam Results &amp; Marks</span>
            </button>

            <button
              onClick={() => setActiveTab('fees')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === 'fees'
                  ? 'bg-[#1F2937] text-[#F3F4F6] border-l-2 border-blue-500 shadow-sm'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/40'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-blue-400" />
              <span>Fee Invoices &amp; Payments</span>
            </button>
          </div>

          {/* TAB 1: Student Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-2.5">
                <h4 className="font-bold text-[#F3F4F6] flex items-center gap-1.5 uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>Academic Details</span>
                </h4>
                <p><span className="text-[#9CA3AF]">Class &amp; Section:</span> <span className="font-semibold text-white">{childClass?.name} - {childSection?.name}</span></p>
                <p><span className="text-[#9CA3AF]">Classroom:</span> <span className="font-semibold text-white">{childSection?.roomNo}</span></p>
                <p><span className="text-[#9CA3AF]">Admission Date:</span> <span className="font-semibold text-white">{activeChild.admissionDate}</span></p>
                <p><span className="text-[#9CA3AF]">Enrollment Status:</span> <span className="font-semibold text-emerald-400">{activeChild.status}</span></p>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-2.5">
                <h4 className="font-bold text-[#F3F4F6] flex items-center gap-1.5 uppercase tracking-wider">
                  <HeartPulse className="w-4 h-4 text-rose-400" />
                  <span>Personal &amp; Medical Notes</span>
                </h4>
                <p><span className="text-[#9CA3AF]">Date of Birth:</span> <span className="font-semibold text-white">{activeChild.dob}</span></p>
                <p><span className="text-[#9CA3AF]">Blood Group:</span> <span className="font-semibold text-rose-400">{activeChild.bloodGroup}</span></p>
                <p><span className="text-[#9CA3AF]">Medical Advisory:</span> <span className="text-[#D1D5DB] italic">{activeChild.medicalNotes || 'None recorded'}</span></p>
                <p><span className="text-[#9CA3AF]">Primary Address:</span> <span className="text-[#D1D5DB]">{activeChild.parentAddress}</span></p>
              </div>
            </div>
          )}

          {/* TAB 2: Attendance History */}
          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cumulative Attendance Record</h4>
                  <p className="text-[11px] text-[#9CA3AF]">Synchronized live from Zoho CRM daily logs</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-emerald-400">{childAttPct}%</span>
                  <p className="text-[10px] text-[#9CA3AF]">Attendance Compliance</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl bg-[#0A0C10] border border-[#1F2937]">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[#9CA3AF] border-b border-[#1F2937]">
                      <th className="px-4 py-2.5 font-medium">Date</th>
                      <th className="px-4 py-2.5 font-medium">Status</th>
                      <th className="px-4 py-2.5 font-medium">Teacher Remarks</th>
                      <th className="px-4 py-2.5 text-right font-medium">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#D1D5DB]">
                    {childAttendanceRecords.map(rec => (
                      <tr key={rec.id} className="border-b border-[#1F2937]/50 hover:bg-[#1F2937]/30">
                        <td className="px-4 py-2.5 font-semibold text-white">{rec.date}</td>
                        <td className="px-4 py-2.5">
                          <span className={`status-pill ${
                            rec.status === 'Present'
                              ? 'bg-success'
                              : rec.status === 'Late'
                              ? 'bg-warning'
                              : 'bg-danger'
                          }`}>
                            {rec.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-[#9CA3AF]">{rec.remarks || 'Normal roll-call marked.'}</td>
                        <td className="px-4 py-2.5 text-right font-mono text-[10px] text-[#9CA3AF]">
                          Verified by CRM Teacher
                        </td>
                      </tr>
                    ))}

                    {childAttendanceRecords.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-center text-[#9CA3AF]">
                          No attendance entries recorded for this student yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Examination Results */}
          {activeTab === 'academics' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                Examinations &amp; Subject Performance Transcripts
              </h4>

              <div className="overflow-x-auto rounded-xl bg-[#0A0C10] border border-[#1F2937]">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[#9CA3AF] border-b border-[#1F2937]">
                      <th className="px-4 py-3 font-medium">Examination</th>
                      <th className="px-4 py-3 font-medium">Subject</th>
                      <th className="px-4 py-3 font-medium">Score</th>
                      <th className="px-4 py-3 font-medium">Letter Grade</th>
                      <th className="px-4 py-3 font-medium">Teacher Assessment</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#D1D5DB]">
                    {childMarks.map(mark => {
                      const exam = examinations.find(e => e.id === mark.examId);
                      return (
                        <tr key={mark.id} className="border-b border-[#1F2937]/50 hover:bg-[#1F2937]/30">
                          <td className="px-4 py-3 font-semibold text-white">{exam?.name || mark.examId}</td>
                          <td className="px-4 py-3 text-[#D1D5DB]">
                            {mark.subjectId === 'SUB-101' ? 'Advanced Mathematics' :
                             mark.subjectId === 'SUB-102' ? 'Applied Physics' :
                             mark.subjectId === 'SUB-103' ? 'Chemistry' :
                             mark.subjectId === 'SUB-104' ? 'Computer Science' : 'English Literature'}
                          </td>
                          <td className="px-4 py-3 font-bold text-white">
                            {mark.marksObtained} / {mark.maxMarks}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`status-pill ${
                              mark.grade === 'A+' || mark.grade === 'A'
                                ? 'bg-success'
                                : mark.grade === 'B+' || mark.grade === 'B'
                                ? 'bg-info'
                                : mark.grade === 'C'
                                ? 'bg-warning'
                                : 'bg-danger'
                            }`}>
                              {mark.grade}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[#D1D5DB] italic">
                            "{mark.feedback || 'Good academic effort shown.'}"
                          </td>
                        </tr>
                      );
                    })}

                    {childMarks.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-[#9CA3AF]">
                          No examination report cards published yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Fee Invoices & Payment Gateway Simulation */}
          {activeTab === 'fees' && childFeeAccount && (
            <div className="space-y-6">
              {/* Fee Summary Banner */}
              <div className="p-5 rounded-xl bg-[#0A0C10] border border-[#1F2937] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="stat-label">Total Annual Fee</span>
                  <div className="stat-value mt-1">${childFeeAccount.totalFee}</div>
                </div>
                <div>
                  <span className="stat-label">Total Amount Paid</span>
                  <div className="stat-value text-emerald-400 mt-1">${childFeeAccount.amountPaid}</div>
                </div>
                <div>
                  <span className="stat-label text-blue-400">Remaining Balance Due</span>
                  <div className="stat-value text-blue-400 mt-1">${childFeeAccount.outstandingBalance}</div>
                </div>
              </div>

              {/* Installment Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                  Fee Installment Schedule
                </h4>

                <div className="space-y-2.5">
                  {childFeeAccount.installments.map(inst => (
                    <div
                      key={inst.id}
                      className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{inst.title}</span>
                          <span className={`status-pill ${
                            inst.status === 'Paid'
                              ? 'bg-success'
                              : inst.status === 'Overdue'
                              ? 'bg-danger'
                              : 'bg-warning'
                          }`}>
                            {inst.status}
                          </span>
                        </div>
                        <p className="text-[#9CA3AF] text-[11px] mt-0.5">Due Date: {inst.dueDate}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold text-white text-sm">${inst.amount}</div>
                          <div className="text-[10px] text-[#9CA3AF]">Paid: ${inst.paidAmount}</div>
                        </div>

                        {inst.status !== 'Paid' && (
                          <button
                            onClick={() => handleOpenCheckout(inst)}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-md shadow-blue-900/20"
                          >
                            Pay Online (${inst.amount - inst.paidAmount})
                          </button>
                        )}
                        {inst.status === 'Paid' && (
                          <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Paid in Full</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Receipts History */}
              <div className="space-y-3 pt-4 border-t border-[#1F2937]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                  Payment History &amp; Downloadable Receipts
                </h4>

                <div className="overflow-x-auto rounded-xl bg-[#0A0C10] border border-[#1F2937]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-[#9CA3AF] border-b border-[#1F2937]">
                        <th className="px-4 py-2.5 font-medium">Receipt No</th>
                        <th className="px-4 py-2.5 font-medium">Date</th>
                        <th className="px-4 py-2.5 font-medium">Payment Method</th>
                        <th className="px-4 py-2.5 font-medium">Amount</th>
                        <th className="px-4 py-2.5 text-right font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#D1D5DB]">
                      {paymentTransactions.filter(p => p.studentId === activeChild.id).map(txn => (
                        <tr key={txn.id} className="border-b border-[#1F2937]/50 hover:bg-[#1F2937]/30">
                          <td className="px-4 py-2.5 font-mono font-bold text-blue-400">{txn.receiptNumber}</td>
                          <td className="px-4 py-2.5 text-[#D1D5DB]">{txn.paymentDate}</td>
                          <td className="px-4 py-2.5 text-[#D1D5DB]">{txn.paymentMethod}</td>
                          <td className="px-4 py-2.5 font-bold text-emerald-400">${txn.amount}</td>
                          <td className="px-4 py-2.5 text-right font-bold text-emerald-400">
                            Verified
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ONLINE PAYMENT CHECKOUT MODAL (Creator Simulator) */}
      {showCheckoutModal && selectedInstallment && activeChild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#111827] border border-[#1F2937] shadow-2xl p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F2937]">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                  Zoho Creator Payment Gateway
                </span>
                <h3 className="text-base font-bold text-white">Settle Fee Installment</h3>
              </div>
              <button onClick={() => setShowCheckoutModal(false)} className="text-[#9CA3AF] hover:text-white">✕</button>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">Student Name:</span>
                <span className="font-bold text-white">{activeChild.name} ({activeChild.id})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">Installment:</span>
                <span className="font-semibold text-[#D1D5DB]">{selectedInstallment.title}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#1F2937]">
                <span className="text-[#9CA3AF]">Amount Due:</span>
                <span className="text-base font-bold text-emerald-400">
                  ${selectedInstallment.amount - selectedInstallment.paidAmount}
                </span>
              </div>
            </div>

            <form onSubmit={handleSimulateOnlinePayment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#D1D5DB] mb-1">Card Number (Simulated)</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0C10] border border-[#1F2937] text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#D1D5DB] mb-1">Expires</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0C10] border border-[#1F2937] text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#D1D5DB] mb-1">CVC</label>
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0C10] border border-[#1F2937] text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCheckoutModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#1F2937] text-[#D1D5DB] hover:bg-[#374151] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={paymentProcessing}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-lg shadow-blue-900/30 disabled:opacity-50"
                >
                  {paymentProcessing ? (
                    <span>Syncing with Zoho CRM...</span>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Authorize Payment (${selectedInstallment.amount - selectedInstallment.paidAmount})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
