import React from 'react';
import { useSchool, AppPortal, CrmTab } from '../../context/SchoolContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  Award,
  CreditCard,
  AlertTriangle,
  Building2,
  Smartphone,
  FileText,
  Code2,
  Network,
  BookOpen,
  Sparkles,
  School
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPortal, setCurrentPortal, crmTab, setCrmTab, leads, earlyWarningAlerts } = useSchool();

  const openEnquiries = leads.filter(l => l.status === 'New Enquiry' || l.status === 'Contacted').length;
  const highRiskCount = earlyWarningAlerts.filter(a => a.status === 'Open' || a.status === 'Under Review').length;

  return (
    <header className="sticky top-0 z-40 bg-[#111827] border-b border-[#1F2937]">
      {/* Primary Brand & Portal Switcher Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-blue-900/20">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">EduCore CRM</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Zoho Ecosystem
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF]">School Management System • CRM & Creator Hybrid</p>
            </div>
          </div>

          {/* Major System Portal Switcher */}
          <nav className="flex items-center gap-1.5 p-1 bg-[#0A0C10] rounded-xl border border-[#1F2937]">
            <button
              id="nav-crm-btn"
              onClick={() => setCurrentPortal('crm')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentPortal === 'crm'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Zoho CRM (Staff)</span>
              {openEnquiries > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#0A0C10] text-blue-300 text-[10px] font-bold border border-blue-500/30">
                  {openEnquiries}
                </span>
              )}
            </button>

            <button
              id="nav-creator-btn"
              onClick={() => setCurrentPortal('creator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentPortal === 'creator'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/60'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Zoho Creator (Parent App)</span>
            </button>

            <button
              id="nav-webform-btn"
              onClick={() => setCurrentPortal('webform')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentPortal === 'webform'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Admission Webform</span>
            </button>

            <button
              id="nav-deluge-btn"
              onClick={() => setCurrentPortal('deluge')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentPortal === 'deluge'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/60'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Deluge Studio</span>
            </button>

            <button
              id="nav-architecture-btn"
              onClick={() => setCurrentPortal('architecture')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentPortal === 'architecture'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/60'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Architecture & ERD</span>
            </button>
          </nav>
        </div>
      </div>

      {/* CRM Sub-Navigation Bar (When on Zoho CRM Portal) */}
      {currentPortal === 'crm' && (
        <div className="bg-[#0A0C10] border-t border-[#1F2937] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-2">
            <div className="flex items-center gap-1 min-w-max">
              <button
                id="crm-tab-dashboard"
                onClick={() => setCrmTab('dashboard')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  crmTab === 'dashboard'
                    ? 'bg-[#1F2937] text-[#F3F4F6] border-l-2 border-blue-500 font-semibold shadow-sm'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/40'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
                <span>Dashboard & Reports</span>
              </button>

              <button
                id="crm-tab-admissions"
                onClick={() => setCrmTab('admissions')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors relative ${
                  crmTab === 'admissions'
                    ? 'bg-[#1F2937] text-[#F3F4F6] border-l-2 border-blue-500 font-semibold shadow-sm'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/40'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Admissions (Leads)</span>
                {openEnquiries > 0 && (
                  <span className="status-pill bg-warning text-[10px]">
                    {openEnquiries}
                  </span>
                )}
              </button>

              <button
                id="crm-tab-students"
                onClick={() => setCrmTab('students')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  crmTab === 'students'
                    ? 'bg-[#1F2937] text-[#F3F4F6] border-l-2 border-blue-500 font-semibold shadow-sm'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/40'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                <span>Student Directory</span>
              </button>

              <button
                id="crm-tab-academics"
                onClick={() => setCrmTab('academics')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  crmTab === 'academics'
                    ? 'bg-[#1F2937] text-[#F3F4F6] border-l-2 border-blue-500 font-semibold shadow-sm'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/40'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Academic Structure</span>
              </button>

              <button
                id="crm-tab-attendance"
                onClick={() => setCrmTab('attendance')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  crmTab === 'attendance'
                    ? 'bg-[#1F2937] text-[#F3F4F6] border-l-2 border-blue-500 font-semibold shadow-sm'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/40'
                }`}
              >
                <CalendarCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Daily Attendance</span>
              </button>

              <button
                id="crm-tab-exams"
                onClick={() => setCrmTab('exams')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  crmTab === 'exams'
                    ? 'bg-[#1F2937] text-[#F3F4F6] border-l-2 border-blue-500 font-semibold shadow-sm'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/40'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>Examinations & Marks</span>
              </button>

              <button
                id="crm-tab-fees"
                onClick={() => setCrmTab('fees')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  crmTab === 'fees'
                    ? 'bg-[#1F2937] text-[#F3F4F6] border-l-2 border-blue-500 font-semibold shadow-sm'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2937]/40'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                <span>Fee Management</span>
              </button>

              <button
                id="crm-tab-early-warning"
                onClick={() => setCrmTab('early-warning')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  crmTab === 'early-warning'
                    ? 'bg-[#1F2937] text-rose-300 border-l-2 border-rose-500 font-semibold shadow-sm'
                    : 'text-rose-400/80 hover:text-rose-300 hover:bg-[#1F2937]/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Early Warning AI (EWS)</span>
                {highRiskCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#9CA3AF]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>CRM &amp; Creator Sync: Active</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
