import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { AttendanceStatus } from '../../types';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  ShieldCheck,
  Sparkles,
  Calendar,
  Save,
  Users,
  Info
} from 'lucide-react';

export const AttendanceManager: React.FC = () => {
  const {
    students,
    classes,
    sections,
    attendanceRecords,
    recordAttendance,
    recordBatchAttendance,
    getStudentAttendancePercentage
  } = useSchool();

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedClassId, setSelectedClassId] = useState<string>('CLS-10');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('SEC-10A');
  const [statusDraft, setStatusDraft] = useState<Record<string, { status: AttendanceStatus; remarks: string }>>({});
  const [validationBanner, setValidationBanner] = useState<{ type: 'duplicate' | 'success'; message: string } | null>(null);

  const sectionStudents = students.filter(
    s => s.currentClassId === selectedClassId && s.currentSectionId === selectedSectionId
  );

  // Initialize draft states for students on date
  const getInitialStatusForStudent = (studentId: string): { status: AttendanceStatus; remarks: string } => {
    if (statusDraft[studentId]) return statusDraft[studentId];
    const existing = attendanceRecords.find(r => r.studentId === studentId && r.date === selectedDate);
    if (existing) {
      return { status: existing.status, remarks: existing.remarks || '' };
    }
    return { status: 'Present', remarks: '' };
  };

  const handleStatusToggle = (studentId: string, newStatus: AttendanceStatus) => {
    setStatusDraft(prev => ({
      ...prev,
      [studentId]: {
        status: newStatus,
        remarks: prev[studentId]?.remarks || ''
      }
    }));
  };

  const handleRemarkChange = (studentId: string, remarks: string) => {
    setStatusDraft(prev => ({
      ...prev,
      [studentId]: {
        status: prev[studentId]?.status || 'Present',
        remarks
      }
    }));
  };

  const handleBatchSaveAttendance = () => {
    setValidationBanner(null);
    const recordsToSave = sectionStudents.map(student => {
      const draft = getInitialStatusForStudent(student.id);
      return {
        studentId: student.id,
        classId: selectedClassId,
        sectionId: selectedSectionId,
        status: draft.status,
        remarks: draft.remarks
      };
    });

    const result = recordBatchAttendance(selectedDate, recordsToSave);
    if (result.duplicateCount > 0 && result.successCount === 0) {
      setValidationBanner({
        type: 'duplicate',
        message: `Deluge Validation Alert: Attendance records for date ${selectedDate} already exist for this section. Duplicate creation was blocked to preserve ledger integrity.`
      });
    } else {
      setValidationBanner({
        type: 'success',
        message: `Successfully processed roll-call for ${selectedDate}. Recorded: ${result.successCount}, Skipped Duplicates: ${result.duplicateCount}.`
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Zoho CRM Attendance Module
            </span>
            <span className="text-xs text-slate-400">Enforcing Deluge 02 Validation Rules</span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1">Daily Attendance & Duplicate Prevention Engine</h2>
          <p className="text-xs text-slate-400">
            Record teacher roll-calls, safeguard against duplicate logs for same calendar date, and track individual attendance %.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleBatchSaveAttendance}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-amber-500/20"
          >
            <Save className="w-4 h-4" />
            <span>Save Roll-Call Log</span>
          </button>
        </div>
      </div>

      {/* Validation / Duplicate Alert Banner */}
      {validationBanner && (
        <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 animate-in fade-in ${
          validationBanner.type === 'duplicate'
            ? 'bg-rose-950/40 border-rose-800 text-rose-200'
            : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
        }`}>
          {validationBanner.type === 'duplicate' ? (
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <h4 className="font-bold">{validationBanner.type === 'duplicate' ? 'Zoho CRM Validation Rule Blocked Insertion' : 'Attendance Operation Complete'}</h4>
            <p className="mt-0.5">{validationBanner.message}</p>
          </div>
          <button onClick={() => setValidationBanner(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Filter and Date Selector Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Attendance Date</span>
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Class Grade</label>
          <select
            value={selectedClassId}
            onChange={(e) => {
              setSelectedClassId(e.target.value);
              const firstSec = sections.find(s => s.classId === e.target.value);
              if (firstSec) setSelectedSectionId(firstSec.id);
            }}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Section</label>
          <select
            value={selectedSectionId}
            onChange={(e) => setSelectedSectionId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {sections.filter(s => s.classId === selectedClassId).map(sec => (
              <option key={sec.id} value={sec.id}>{sec.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Roll-Call Marking Grid */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Roll Call Sheet: {classes.find(c => c.id === selectedClassId)?.name} • {sections.find(s => s.id === selectedSectionId)?.name}
            </h3>
            <span className="text-xs text-slate-400">({sectionStudents.length} Registered Students)</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => {
                const draft: Record<string, { status: AttendanceStatus; remarks: string }> = {};
                sectionStudents.forEach(s => {
                  draft[s.id] = { status: 'Present', remarks: '' };
                });
                setStatusDraft(draft);
              }}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold"
            >
              Mark All Present
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/50 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Student ID</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Cumulative Attendance</th>
                <th className="px-4 py-3 text-center">Status Action</th>
                <th className="px-4 py-3">Teacher Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {sectionStudents.map(student => {
                const currentDraft = getInitialStatusForStudent(student.id);
                const attPct = getStudentAttendancePercentage(student.id);

                return (
                  <tr key={student.id} className="hover:bg-slate-850/50">
                    <td className="px-4 py-3.5 font-mono text-amber-400 font-bold">{student.id}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={student.avatarUrl}
                          alt={student.name}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-lg object-cover border border-slate-700"
                        />
                        <div>
                          <div className="font-bold text-white">{student.name}</div>
                          <div className="text-[10px] text-slate-400">Roll: {student.rollNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              attPct >= 85 ? 'bg-emerald-400' : attPct >= 75 ? 'bg-amber-400' : 'bg-rose-500'
                            }`}
                            style={{ width: `${attPct}%` }}
                          />
                        </div>
                        <span className={`font-bold ${
                          attPct >= 85 ? 'text-emerald-400' : attPct >= 75 ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                          {attPct}%
                        </span>
                        {attPct < 75 && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300">
                            Low
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 w-max mx-auto">
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(student.id, 'Present')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            currentDraft.status === 'Present'
                              ? 'bg-emerald-500 text-slate-950 shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(student.id, 'Absent')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            currentDraft.status === 'Absent'
                              ? 'bg-rose-500 text-white shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(student.id, 'Late')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            currentDraft.status === 'Late'
                              ? 'bg-amber-500 text-slate-950 shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Late
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(student.id, 'Excused')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                            currentDraft.status === 'Excused'
                              ? 'bg-sky-500 text-white shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Excused
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <input
                        type="text"
                        placeholder="Optional remarks (e.g. medical, bus delay)..."
                        value={currentDraft.remarks}
                        onChange={(e) => handleRemarkChange(student.id, e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />
                    </td>
                  </tr>
                );
              })}

              {sectionStudents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No students currently assigned to this class and section.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
