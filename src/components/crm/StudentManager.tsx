import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Student } from '../../types';
import {
  GraduationCap,
  Search,
  Filter,
  UserCheck,
  Calendar,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
  Clock,
  Award,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export const StudentManager: React.FC = () => {
  const {
    students,
    classes,
    sections,
    getStudentAttendancePercentage,
    getStudentFeeAccount,
    setCurrentPortal,
    setSelectedStudentId,
    setSelectedParentEmail
  } = useSchool();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');
  const [activeStudent, setActiveStudent] = useState<Student | null>(students[0] || null);

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.parentEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = selectedClassFilter === 'ALL' || student.currentClassId === selectedClassFilter;
    const matchesRisk = selectedRiskFilter === 'ALL' || student.riskLevel === selectedRiskFilter;

    return matchesSearch && matchesClass && matchesRisk;
  });

  const handleOpenParentPortalForStudent = (student: Student) => {
    setSelectedStudentId(student.id);
    setSelectedParentEmail(student.parentEmail);
    setCurrentPortal('creator');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Zoho CRM Custom Module: Students
            </span>
            <span className="text-xs text-slate-400">Total: {students.length} Enrolled</span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1">Student 360 & Academic Lifecycle Management</h2>
          <p className="text-xs text-slate-400">
            Maintain complete student profiles, auto-generated unique IDs, guardian relations, and cross-year academic history.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Student Name, Student ID (STU-XXXX), parent email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedClassFilter}
            onChange={(e) => setSelectedClassFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Classes</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={selectedRiskFilter}
            onChange={(e) => setSelectedRiskFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="Low">Low Risk</option>
            <option value="Moderate">Moderate Risk</option>
            <option value="High">High Risk (EWS Alert)</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Student List + 360 Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Student List Sidebar */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Student Records ({filteredStudents.length})
          </h3>

          <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
            {filteredStudents.map(student => {
              const currentClass = classes.find(c => c.id === student.currentClassId);
              const currentSection = sections.find(s => s.id === student.currentSectionId);
              const attPct = getStudentAttendancePercentage(student.id);
              const fee = getStudentFeeAccount(student.id);

              return (
                <div
                  key={student.id}
                  onClick={() => setActiveStudent(student)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    activeStudent?.id === student.id
                      ? 'bg-slate-850 border-amber-500 ring-1 ring-amber-500/30'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white truncate">{student.name}</span>
                        <span className="font-mono text-[10px] text-amber-400 font-semibold px-1 rounded bg-amber-500/10">
                          {student.id}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {currentClass?.name} • {currentSection?.name.split(' - ')[0]} (Roll: {student.rollNumber})
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-[10px]">
                        <span className={`px-1.5 py-0.2 rounded font-semibold ${
                          attPct >= 85 ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'
                        }`}>
                          {attPct}% Att.
                        </span>
                        <span className={`px-1.5 py-0.2 rounded font-semibold ${
                          fee?.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-300' : fee?.status === 'Overdue' ? 'bg-rose-500/10 text-rose-300' : 'bg-amber-500/10 text-amber-300'
                        }`}>
                          Fee: {fee?.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {student.riskLevel === 'High' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>High Risk</span>
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
              );
            })}

            {filteredStudents.length === 0 && (
              <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl text-xs text-slate-500">
                No matching student records found.
              </div>
            )}
          </div>
        </div>

        {/* Student 360 Detail Card */}
        {activeStudent && (
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <img
                    src={activeStudent.avatarUrl}
                    alt={activeStudent.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/40 shadow-lg shadow-amber-500/10"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-white">{activeStudent.name}</h3>
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500 text-slate-950">
                        {activeStudent.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {classes.find(c => c.id === activeStudent.currentClassId)?.name} •{' '}
                      {sections.find(s => s.id === activeStudent.currentSectionId)?.name} • Roll No: {activeStudent.rollNumber}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Status: {activeStudent.status}
                      </span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-400">Admitted: {activeStudent.admissionDate}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Link to Creator Parent Portal for this student */}
                <button
                  onClick={() => handleOpenParentPortalForStudent(activeStudent)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-600/20 self-start sm:self-center"
                >
                  <span>View in Parent Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* At-Risk Warning Box if applicable */}
              {activeStudent.riskLevel === 'High' && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-300 font-bold">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>Early Warning System (EWS) High Risk Flag</span>
                  </div>
                  <ul className="list-disc list-inside text-rose-200 text-[11px] space-y-1 pl-1">
                    {activeStudent.riskReasons?.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    )) || <li>Attendance or academic threshold triggered intervention.</li>}
                  </ul>
                </div>
              )}

              {/* Personal & Academic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
                  <h4 className="font-bold text-slate-300 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span>Personal Info & Health</span>
                  </h4>
                  <p><span className="text-slate-400">Date of Birth:</span> <span className="font-semibold text-white">{activeStudent.dob}</span></p>
                  <p><span className="text-slate-400">Gender:</span> <span className="font-semibold text-white">{activeStudent.gender}</span></p>
                  <p><span className="text-slate-400">Blood Group:</span> <span className="font-semibold text-rose-400">{activeStudent.bloodGroup}</span></p>
                  <p><span className="text-slate-400">Medical Notes:</span> <span className="text-slate-300 italic">{activeStudent.medicalNotes || 'None reported.'}</span></p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
                  <h4 className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-indigo-400" />
                    <span>Guardian & Emergency</span>
                  </h4>
                  <p><span className="text-slate-400">Guardian Name:</span> <span className="font-semibold text-white">{activeStudent.parentName}</span></p>
                  <p><span className="text-slate-400">Guardian Email:</span> <span className="font-semibold text-sky-400">{activeStudent.parentEmail}</span></p>
                  <p><span className="text-slate-400">Guardian Phone:</span> <span className="font-semibold text-white">{activeStudent.parentPhone}</span></p>
                  <p><span className="text-slate-400">Emergency:</span> <span className="text-slate-300">{activeStudent.emergencyContact.name} ({activeStudent.emergencyContact.relationship}) - {activeStudent.emergencyContact.phone}</span></p>
                </div>
              </div>

              {/* Cross-Year Academic History (Fulfills Part 1 requirement) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>Historical Academic Progression (Multi-Year Logs)</span>
                  </h4>
                  <span className="text-[11px] text-slate-500">Preserved in CRM sub-forms</span>
                </div>

                <div className="overflow-x-auto rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="px-3 py-2.5">Academic Year</th>
                        <th className="px-3 py-2.5">Grade Level</th>
                        <th className="px-3 py-2.5">Section</th>
                        <th className="px-3 py-2.5">GPA</th>
                        <th className="px-3 py-2.5">Attendance</th>
                        <th className="px-3 py-2.5 text-right">Promotion Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      {/* Current Year */}
                      <tr className="bg-amber-500/5">
                        <td className="px-3 py-2.5 font-bold text-amber-300">2025 - 2026 (Current)</td>
                        <td className="px-3 py-2.5">{classes.find(c => c.id === activeStudent.currentClassId)?.name}</td>
                        <td className="px-3 py-2.5">{sections.find(s => s.id === activeStudent.currentSectionId)?.name.split(' - ')[0]}</td>
                        <td className="px-3 py-2.5 font-bold text-white">In Progress</td>
                        <td className="px-3 py-2.5 font-semibold text-emerald-400">{getStudentAttendancePercentage(activeStudent.id)}%</td>
                        <td className="px-3 py-2.5 text-right font-bold text-amber-400">Current Session</td>
                      </tr>

                      {/* Past Historical Years */}
                      {activeStudent.academicHistory.map((hist, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/20">
                          <td className="px-3 py-2.5 text-slate-400">{hist.academicYear}</td>
                          <td className="px-3 py-2.5">{hist.grade}</td>
                          <td className="px-3 py-2.5">{hist.section}</td>
                          <td className="px-3 py-2.5 font-bold text-white">{hist.gpa.toFixed(2)}</td>
                          <td className="px-3 py-2.5 text-slate-300">{hist.attendancePercentage}%</td>
                          <td className="px-3 py-2.5 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-300">
                              {hist.status}
                            </span>
                          </td>
                        </tr>
                      ))}

                      {activeStudent.academicHistory.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-3 py-3 text-center text-slate-500 text-[11px]">
                            Newly enrolled student for AY 2025-2026. Historical logs will archive upon term completion.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
