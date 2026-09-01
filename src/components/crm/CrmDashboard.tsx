import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Award,
  AlertTriangle,
  FileText,
  UserPlus
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';

export const CrmDashboard: React.FC = () => {
  const {
    students,
    leads,
    attendanceRecords,
    feeAccounts,
    examinations,
    earlyWarningAlerts,
    setCrmTab,
    setCurrentPortal
  } = useSchool();

  // Metrics computation
  const totalStudents = students.length;
  const activeLeads = leads.filter(l => l.status !== 'Enrolled' && l.status !== 'Rejected').length;
  const enrolledCount = leads.filter(l => l.status === 'Enrolled').length;
  const conversionRate = leads.length > 0 ? Math.round((enrolledCount / leads.length) * 100) : 0;

  // Attendance rate
  const totalAttendanceLogs = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(r => r.status === 'Present' || r.status === 'Late' || r.status === 'Excused').length;
  const overallAttendancePct = totalAttendanceLogs > 0 ? Math.round((presentCount / totalAttendanceLogs) * 100) : 94;

  // Fee collection
  const totalAnnualBilling = feeAccounts.reduce((acc, curr) => acc + curr.netFee, 0);
  const totalCollected = feeAccounts.reduce((acc, curr) => acc + curr.amountPaid, 0);
  const totalOutstanding = feeAccounts.reduce((acc, curr) => acc + curr.outstandingBalance, 0);
  const collectionPct = totalAnnualBilling > 0 ? Math.round((totalCollected / totalAnnualBilling) * 100) : 0;

  // High Risk Students
  const highRiskStudents = students.filter(s => s.riskLevel === 'High').length;

  // Chart data: Admissions Pipeline Stages
  const leadStageDistribution = [
    { name: 'New Enquiry', count: leads.filter(l => l.status === 'New Enquiry').length, color: '#38bdf8' },
    { name: 'Contacted', count: leads.filter(l => l.status === 'Contacted').length, color: '#818cf8' },
    { name: 'Campus Visit', count: leads.filter(l => l.status === 'Campus Visit').length, color: '#fbbf24' },
    { name: 'Assessment', count: leads.filter(l => l.status === 'Assessment Scheduled').length, color: '#f97316' },
    { name: 'Approved', count: leads.filter(l => l.status === 'Admission Approved').length, color: '#34d399' },
    { name: 'Enrolled', count: leads.filter(l => l.status === 'Enrolled').length, color: '#10b981' },
  ];

  // Chart data: Fee collection status breakdown
  const feeStatusData = [
    { name: 'Fully Paid', value: feeAccounts.filter(f => f.status === 'Paid').length, color: '#10b981' },
    { name: 'Partial', value: feeAccounts.filter(f => f.status === 'Partial').length, color: '#38bdf8' },
    { name: 'Pending', value: feeAccounts.filter(f => f.status === 'Pending').length, color: '#f59e0b' },
    { name: 'Overdue', value: feeAccounts.filter(f => f.status === 'Overdue').length, color: '#ef4444' },
  ];

  // Class enrollment distribution
  const classDistribution = [
    { grade: 'Grade 9', students: students.filter(s => s.currentClassId === 'CLS-9').length + 12 },
    { grade: 'Grade 10', students: students.filter(s => s.currentClassId === 'CLS-10').length + 15 },
    { grade: 'Grade 11', students: students.filter(s => s.currentClassId === 'CLS-11').length + 10 },
    { grade: 'Grade 12', students: students.filter(s => s.currentClassId === 'CLS-12').length + 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#111827] border border-[#1F2937] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Zoho CRM Executive Hub
            </span>
            <span className="text-xs text-[#9CA3AF]">Academic Session: 2025 - 2026</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">School Management & Operations Overview</h1>
          <p className="text-sm text-[#9CA3AF] mt-0.5">
            Centralized administration spanning admissions funnel, student academics, attendance health, and fee revenue.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setCurrentPortal('webform')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1F2937] hover:bg-[#374151] text-[#D1D5DB] text-xs font-semibold border border-[#1F2937] transition shadow-sm"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Open Public Webform</span>
          </button>
          <button
            onClick={() => setCrmTab('admissions')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md shadow-blue-900/30"
          >
            <UserPlus className="w-4 h-4" />
            <span>Manage Admissions</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="card hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="stat-label">Total Enrolled</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="stat-value">{totalStudents}</span>
            <span className="text-xs text-emerald-400 flex items-center font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> 100% Active
            </span>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1">Across Grades 9–12 across all sections</p>
        </div>

        {/* Admissions Pipeline */}
        <div className="card hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="stat-label">Open Admissions</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="stat-value">{activeLeads}</span>
            <span className="text-xs text-blue-400 font-medium">
              {conversionRate}% Conversion
            </span>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1">{leads.length} total enquiries captured</p>
        </div>

        {/* Daily Attendance Rate */}
        <div className="card hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="stat-label">Attendance Avg.</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="stat-value">{overallAttendancePct}%</span>
            <span className="text-xs text-emerald-400 font-medium">Daily target: 95%</span>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1">Compound duplicate validation active</p>
        </div>

        {/* Fee Collection KPI */}
        <div className="card border-blue-900/30 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="stat-label text-blue-400">Outstanding Fees</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="stat-value">${totalOutstanding.toLocaleString()}</span>
            <span className="text-xs text-blue-400 font-medium">{collectionPct}% collected</span>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1">${totalCollected.toLocaleString()} received to date</p>
        </div>
      </div>

      {/* Standout Feature Callout: Early Warning System */}
      <div className="card border-blue-900/40 bg-gradient-to-r from-[#111827] via-[#111827] to-[#1F2937]/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Innovation Feature: Smart Alert Deluge &amp; EWS</h3>
              <span className="status-pill bg-info text-[10px]">
                ACTIVE ENGINE
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] mt-1 max-w-3xl leading-relaxed">
              Automated cross-module workflow: When student attendance drops below 75% or fee stress signals are detected, an alert notification is pushed directly to counselors and mirrored to the Zoho Creator Parent App.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCrmTab('early-warning')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-lg shadow-blue-900/30 shrink-0"
        >
          <span>View Risk Radar ({highRiskStudents} Alerts)</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admissions Funnel Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Admissions Enquiry Pipeline</h3>
              <p className="text-xs text-[#9CA3AF]">Distribution of leads across CRM admission workflow stages</p>
            </div>
            <button
              onClick={() => setCrmTab('admissions')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <span>Manage Leads</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadStageDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 11 }} />
                <YAxis stroke="#9CA3AF" allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#1F2937', borderRadius: '0.5rem', color: '#F3F4F6', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {leadStageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Collection Status Pie */}
        <div className="card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Fee Account Health</h3>
              <button
                onClick={() => setCrmTab('fees')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
              >
                Invoices
              </button>
            </div>
            <p className="text-xs text-[#9CA3AF] mb-4">Student payment status compliance</p>

            <div className="h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={feeStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {feeStatusData.map((entry, index) => (
                      <Cell key={`fee-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111827', borderColor: '#1F2937', borderRadius: '0.5rem', color: '#F3F4F6', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#1F2937] text-xs">
            {feeStatusData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[#9CA3AF]">{item.name}:</span>
                <span className="font-bold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Tables: Recent Admissions & Scheduled Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admissions Enquiries */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Admission Leads</h3>
              <p className="text-xs text-[#9CA3AF]">Captured via Webform and Referral Channels</p>
            </div>
            <button
              onClick={() => setCrmTab('admissions')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              View All ({leads.length})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#9CA3AF] border-b border-[#1F2937]">
                  <th className="pb-3 font-medium">Student</th>
                  <th className="pb-3 font-medium">Parent</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-[#D1D5DB]">
                {leads.slice(0, 4).map(lead => (
                  <tr key={lead.id} className="border-b border-[#1F2937]/50 hover:bg-[#1F2937]/30">
                    <td className="py-3">
                      <div className="font-bold text-white">{lead.studentName}</div>
                      <div className="text-[11px] text-[#9CA3AF]">{lead.enquiryNumber}</div>
                    </td>
                    <td className="py-3">
                      <div>{lead.parentName}</div>
                      <div className="text-[11px] text-[#9CA3AF]">{lead.parentPhone}</div>
                    </td>
                    <td className="py-3">
                      <span className={`status-pill ${
                        lead.status === 'Enrolled'
                          ? 'bg-success'
                          : lead.status === 'Admission Approved'
                          ? 'bg-info'
                          : 'bg-warning'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => setCrmTab('admissions')}
                        className="px-2.5 py-1 rounded bg-[#1F2937] hover:bg-[#374151] text-blue-400 text-[11px] font-semibold transition"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Examinations Overview */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Examinations &amp; Assessments</h3>
              <p className="text-xs text-[#9CA3AF]">Class academic evaluation schedules</p>
            </div>
            <button
              onClick={() => setCrmTab('exams')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              Gradebook
            </button>
          </div>

          <div className="space-y-3">
            {examinations.map(exam => (
              <div
                key={exam.id}
                className="p-3.5 rounded-xl bg-[#0A0C10] border border-[#1F2937] flex items-center justify-between gap-3 hover:border-slate-700 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{exam.name}</h4>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                      Dates: {exam.startDate} to {exam.endDate} • Max: {exam.totalMaxMarks} Marks
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`status-pill ${
                    exam.status === 'Published'
                      ? 'bg-success'
                      : 'bg-info'
                  }`}>
                    {exam.status}
                  </span>
                  <button
                    onClick={() => setCrmTab('exams')}
                    className="p-1.5 rounded-lg bg-[#1F2937] hover:bg-[#374151] text-[#D1D5DB] transition"
                    title="Open Exam Marks"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
