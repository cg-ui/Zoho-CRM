import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { AdmissionLead, AdmissionStatus } from '../../types';
import {
  Users,
  Search,
  Filter,
  Plus,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  GraduationCap,
  FileText,
  HelpCircle,
  BookOpen
} from 'lucide-react';

export const AdmissionsManager: React.FC = () => {
  const {
    leads,
    classes,
    sections,
    updateLeadStatus,
    convertLeadToStudent,
    setCurrentPortal,
    setCrmTab
  } = useSchool();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [activeViewMode, setActiveViewMode] = useState<'kanban' | 'table'>('kanban');
  const [selectedLead, setSelectedLead] = useState<AdmissionLead | null>(leads[0] || null);

  // Conversion Modal State
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [convertTargetClass, setConvertTargetClass] = useState<string>(classes[0]?.id || 'CLS-10');
  const [convertTargetSection, setConvertTargetSection] = useState<string>(sections[0]?.id || 'SEC-10A');
  const [isConverting, setIsConverting] = useState(false);

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.enquiryNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.parentEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatusFilter === 'ALL' || lead.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const stages: AdmissionStatus[] = [
    'New Enquiry',
    'Contacted',
    'Campus Visit',
    'Assessment Scheduled',
    'Admission Approved',
    'Enrolled',
    'Rejected'
  ];

  const handleOpenConvertModal = (lead: AdmissionLead) => {
    setSelectedLead(lead);
    setConvertTargetClass(lead.targetGrade || classes[0].id);
    setShowConvertModal(true);
  };

  const handleExecuteConversion = () => {
    if (!selectedLead) return;
    setIsConverting(true);

    setTimeout(() => {
      convertLeadToStudent(selectedLead.id, convertTargetClass, convertTargetSection);
      setIsConverting(false);
      setShowConvertModal(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Zoho CRM Leads Module
            </span>
            <span className="text-xs text-slate-400">Total: {leads.length} Enquiries</span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1">Admission Management & Enquiry Pipeline</h2>
          <p className="text-xs text-slate-400">
            Track webform inquiries through follow-up stages and automatically convert approved leads to full student records.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPortal('webform')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Test Webform Submission</span>
          </button>

          <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveViewMode('kanban')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                activeViewMode === 'kanban' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pipeline Kanban
            </button>
            <button
              onClick={() => setActiveViewMode('table')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                activeViewMode === 'table' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Table View
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, enquiry number, parent email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Stages</option>
            {stages.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KANBAN VIEW */}
      {activeViewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3.5 overflow-x-auto pb-4">
          {stages.map(stage => {
            const stageLeads = filteredLeads.filter(l => l.status === stage);
            
            let stageBadgeColor = 'bg-slate-800 text-slate-300';
            if (stage === 'New Enquiry') stageBadgeColor = 'bg-sky-500/20 text-sky-300 border border-sky-500/30';
            if (stage === 'Admission Approved') stageBadgeColor = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
            if (stage === 'Enrolled') stageBadgeColor = 'bg-emerald-600 text-white';
            if (stage === 'Rejected') stageBadgeColor = 'bg-rose-500/20 text-rose-300 border border-rose-500/30';

            return (
              <div key={stage} className="flex flex-col rounded-2xl bg-slate-950/70 border border-slate-800/80 p-3 min-h-[420px]">
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-800/60">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className={`w-2 h-2 rounded-full ${
                      stage === 'Enrolled' ? 'bg-emerald-400' : stage === 'Admission Approved' ? 'bg-sky-400' : 'bg-amber-400'
                    }`} />
                    <h3 className="text-xs font-bold text-slate-200 truncate">{stage}</h3>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-400">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards in stage */}
                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`p-3 rounded-xl bg-slate-900 border transition cursor-pointer hover:border-amber-500/50 shadow-sm ${
                        selectedLead?.id === lead.id ? 'border-amber-500 ring-1 ring-amber-500/40 bg-slate-850' : 'border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-mono font-semibold text-slate-400">{lead.enquiryNumber}</span>
                        {lead.score && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            {lead.score}% Score
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-white mt-1 truncate">{lead.studentName}</h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <span>Target:</span>
                        <span className="font-semibold text-slate-300">
                          {classes.find(c => c.id === lead.targetGrade)?.name || lead.targetGrade}
                        </span>
                      </p>

                      <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                        <div className="flex items-center gap-1.5 truncate">
                          <Users className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{lead.parentName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{lead.parentPhone}</span>
                        </div>
                      </div>

                      {/* Convert to Student Action Button (When in Admission Approved or Enquiry) */}
                      {lead.status === 'Admission Approved' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenConvertModal(lead);
                          }}
                          className="w-full mt-2.5 py-1 px-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 text-[11px] font-bold border border-emerald-500/30 transition flex items-center justify-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Convert to Student</span>
                        </button>
                      )}

                      {lead.status === 'Enrolled' && (
                        <div className="mt-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 p-1 rounded text-center border border-emerald-800/40">
                          ID: {lead.convertedStudentId}
                        </div>
                      )}
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="h-24 flex items-center justify-center border border-dashed border-slate-800/60 rounded-xl text-[11px] text-slate-600 font-medium">
                      No Leads
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {activeViewMode === 'table' && (
        <div className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Enquiry ID</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Parent Info</th>
                <th className="px-4 py-3">Target Grade</th>
                <th className="px-4 py-3">Enquiry Date</th>
                <th className="px-4 py-3">Stage / Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filteredLeads.map(lead => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`hover:bg-slate-800/40 cursor-pointer ${
                    selectedLead?.id === lead.id ? 'bg-slate-850' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-amber-400 font-semibold">{lead.enquiryNumber}</td>
                  <td className="px-4 py-3 font-bold text-white">{lead.studentName}</td>
                  <td className="px-4 py-3">
                    <div>{lead.parentName}</div>
                    <div className="text-[11px] text-slate-400">{lead.parentEmail}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-300">
                    {classes.find(c => c.id === lead.targetGrade)?.name || lead.targetGrade}
                  </td>
                  <td className="px-4 py-3 text-slate-400">{lead.enquiryDate}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      lead.status === 'Enrolled'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : lead.status === 'Admission Approved'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : lead.status === 'Rejected'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {lead.status === 'Admission Approved' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenConvertModal(lead);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 text-[11px] font-bold hover:bg-emerald-400 transition"
                      >
                        Enroll Student
                      </button>
                    )}
                    {lead.status === 'Enrolled' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCrmTab('students');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-amber-400 text-[11px] font-semibold hover:bg-slate-700 transition"
                      >
                        View Record
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Selected Lead Inspector Drawer / Details */}
      {selectedLead && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-400 font-semibold">{selectedLead.enquiryNumber}</span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400">Captured on {selectedLead.enquiryDate}</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">{selectedLead.studentName}</h3>
            </div>

            {/* Stage Transition Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Change Stage:</span>
              <select
                value={selectedLead.status}
                onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as AdmissionStatus)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-amber-300 focus:outline-none focus:border-amber-500"
              >
                {stages.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>

              {selectedLead.status === 'Admission Approved' && (
                <button
                  onClick={() => handleOpenConvertModal(selectedLead)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-md shadow-emerald-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Convert to Student</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h4 className="font-bold text-slate-300 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Student Details</span>
              </h4>
              <p><span className="text-slate-400">Date of Birth:</span> <span className="font-semibold text-white">{selectedLead.dob}</span></p>
              <p><span className="text-slate-400">Gender:</span> <span className="font-semibold text-white">{selectedLead.gender}</span></p>
              <p><span className="text-slate-400">Target Grade:</span> <span className="font-semibold text-amber-300">{classes.find(c => c.id === selectedLead.targetGrade)?.name || selectedLead.targetGrade}</span></p>
              <p><span className="text-slate-400">Previous School:</span> <span className="font-semibold text-white">{selectedLead.previousSchool || 'N/A'}</span></p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h4 className="font-bold text-slate-300 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Parent / Guardian</span>
              </h4>
              <p><span className="text-slate-400">Parent Name:</span> <span className="font-semibold text-white">{selectedLead.parentName}</span></p>
              <p><span className="text-slate-400">Email:</span> <span className="font-semibold text-white">{selectedLead.parentEmail}</span></p>
              <p><span className="text-slate-400">Phone:</span> <span className="font-semibold text-white">{selectedLead.parentPhone}</span></p>
              <p><span className="text-slate-400">Assigned Counselor:</span> <span className="font-semibold text-sky-400">{selectedLead.assignedCounselor}</span></p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h4 className="font-bold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Counselor Notes & Follow-up</span>
              </h4>
              <p className="text-slate-300 leading-relaxed italic bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px]">
                "{selectedLead.notes || 'No counselor notes recorded yet.'}"
              </p>
              {selectedLead.convertedStudentId && (
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 font-mono text-[11px]">
                  Enrolled as: {selectedLead.convertedStudentId}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CONVERT TO STUDENT MODAL */}
      {showConvertModal && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Enroll & Convert Admission Lead</h3>
                  <p className="text-xs text-slate-400">Executes Deluge Script: 01_lead_to_student_conversion.dg</p>
                </div>
              </div>
              <button
                onClick={() => setShowConvertModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Candidate Name:</span>
                <span className="font-bold text-white">{selectedLead.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Enquiry No:</span>
                <span className="font-mono text-amber-400">{selectedLead.enquiryNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Parent Contact:</span>
                <span className="text-slate-200">{selectedLead.parentEmail} ({selectedLead.parentPhone})</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Assign Class / Grade</label>
                <select
                  value={convertTargetClass}
                  onChange={(e) => setConvertTargetClass(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.stream}) • Annual Fee: ${cls.annualFee}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Assign Section</label>
                <select
                  value={convertTargetSection}
                  onChange={(e) => setConvertTargetSection(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {sections.filter(s => s.classId === convertTargetClass).map(sec => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name} ({sec.roomNo})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Automated Workflow Actions Triggered:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-300 pl-1">
                <li>Generates unique Student ID: <span className="font-mono text-amber-300">STU-2025-XXXX</span></li>
                <li>Creates custom Student Module record in Zoho CRM</li>
                <li>Provisions Student Fee Account with 3-term installment schedule</li>
                <li>Pushes OAuth sync webhook to Zoho Creator Parent Portal</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConvertModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteConversion}
                disabled={isConverting}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {isConverting ? (
                  <span>Executing Deluge Conversion...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm Enrollment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
