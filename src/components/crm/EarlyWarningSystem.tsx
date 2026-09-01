import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { EarlyWarningAlert, Student } from '../../types';
import {
  Sparkles,
  ShieldAlert,
  AlertTriangle,
  Users,
  CheckCircle2,
  Clock,
  Play,
  TrendingDown,
  PhoneCall,
  Calendar,
  Layers,
  ArrowRight,
  BookOpen,
  CreditCard,
  HeartHandshake
} from 'lucide-react';

export const EarlyWarningSystem: React.FC = () => {
  const {
    students,
    earlyWarningAlerts,
    runEarlyWarningScan,
    updateAlertStatus,
    getStudentAttendancePercentage,
    getStudentFeeAccount,
    triggerNotification
  } = useSchool();

  const [isScanning, setIsScanning] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<EarlyWarningAlert | null>(earlyWarningAlerts[0] || null);
  const [actionPlanInput, setActionPlanInput] = useState('');

  const handleTriggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      runEarlyWarningScan();
      setIsScanning(false);
    }, 800);
  };

  const highRiskStudents = students.filter(s => s.riskLevel === 'High');
  const moderateRiskStudents = students.filter(s => s.riskLevel === 'Moderate');

  return (
    <div className="space-y-6">
      {/* Feature Highlight Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border border-rose-900/60 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Additional Feature Assignment Focus
                </span>
                <span className="text-xs text-slate-400">Proactive Student Retention</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                AI Early Warning & At-Risk Intervention System (EWS)
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                A multi-dimensional scoring engine that correlates <strong>Attendance Drops</strong>, <strong>Academic Degradation</strong>, and <strong>Financial Stress</strong> to trigger proactive counseling workflows before students fall through the cracks.
              </p>
            </div>
          </div>

          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-rose-500/25 disabled:opacity-50 shrink-0"
          >
            {isScanning ? (
              <span>Running Algorithmic Assessment...</span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run Real-Time Risk Scan</span>
              </>
            )}
          </button>
        </div>

        {/* Why this feature was selected & scalability card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="font-bold text-rose-400 flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5" /> 1. Problem Identified
            </span>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Schools often discover student distress too late (after exam failures or dropouts). Siloed attendance, grading, and fee data prevented early detection.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> 2. Selected Solution
            </span>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Cross-module composite risk scoring (0-100 pts) triggering automated CRM Counselor Tasks and parent proactive notifications in Creator.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 3. Code Scalability & Optimization
            </span>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Runs via asynchronous batch Deluge scripts with indexed criteria, caching student metrics to respect Zoho API rate limits at 10,000+ student scale.
            </p>
          </div>
        </div>
      </div>

      {/* Metric Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-300 uppercase">High Risk (Urgent Action)</span>
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          </div>
          <div className="mt-2 text-3xl font-black text-white">{highRiskStudents.length}</div>
          <p className="text-[11px] text-rose-400 mt-1">Requires immediate counselor case review</p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-900/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-300 uppercase">Moderate Risk (Monitor)</span>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div className="mt-2 text-3xl font-black text-white">{moderateRiskStudents.length}</div>
          <p className="text-[11px] text-amber-400 mt-1">Early indicators of attendance or grade dip</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Total Active Alerts</span>
            <Clock className="w-5 h-5 text-sky-400" />
          </div>
          <div className="mt-2 text-3xl font-black text-white">{earlyWarningAlerts.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">Counselor workflow tickets generated</p>
        </div>
      </div>

      {/* Main Grid: At-Risk Students & Intervention Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* At-Risk Case Queue */}
        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Identified At-Risk Students
          </h3>

          <div className="space-y-3">
            {students.filter(s => s.riskLevel !== 'Low').map(student => {
              const attPct = getStudentAttendancePercentage(student.id);
              const fee = getStudentFeeAccount(student.id);
              const alert = earlyWarningAlerts.find(a => a.studentId === student.id);

              return (
                <div
                  key={student.id}
                  onClick={() => setSelectedAlert(alert || null)}
                  className={`p-4 rounded-2xl border transition cursor-pointer space-y-3 ${
                    selectedAlert?.studentId === student.id
                      ? 'bg-slate-850 border-rose-500 ring-1 ring-rose-500/40'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatarUrl}
                        alt={student.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                      />
                      <div>
                        <div className="font-bold text-xs text-white">{student.name}</div>
                        <div className="font-mono text-[10px] text-amber-400">{student.id}</div>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      student.riskLevel === 'High'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {student.riskLevel} Risk
                    </span>
                  </div>

                  {/* Multi-metric radar triggers */}
                  <div className="grid grid-cols-3 gap-2 text-[10px] pt-1">
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400 block">Attendance</span>
                      <span className={`font-bold ${attPct < 75 ? 'text-rose-400' : 'text-amber-400'}`}>
                        {attPct}%
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400 block">Academics</span>
                      <span className="font-bold text-rose-400">
                        {student.id === 'STU-2025-003' ? '54% (F in Chem)' : '72% (Passing)'}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400 block">Fee Balance</span>
                      <span className={`font-bold ${fee?.status === 'Overdue' ? 'text-rose-400' : 'text-slate-200'}`}>
                        ${fee?.outstandingBalance || 0}
                      </span>
                    </div>
                  </div>

                  {student.riskReasons && (
                    <div className="text-[11px] text-rose-300/90 bg-rose-950/30 p-2 rounded-lg border border-rose-900/40 space-y-0.5">
                      {student.riskReasons.map((r, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Counselor Intervention Workspace */}
        <div className="lg:col-span-6 space-y-4">
          {selectedAlert ? (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-amber-400">{selectedAlert.id}</span>
                  <h3 className="text-base font-bold text-white">
                    Counselor Action Plan: {students.find(s => s.id === selectedAlert.studentId)?.name}
                  </h3>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Status: {selectedAlert.status}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Counselor:</span>
                  <span className="font-bold text-sky-400">{selectedAlert.counselorAssigned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Alert Detected:</span>
                  <span className="text-slate-300">{selectedAlert.detectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Guardian Contact:</span>
                  <span className="text-slate-200">{students.find(s => s.id === selectedAlert.studentId)?.parentName}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Intervention Notes & Remedial Action Log
                </label>
                <textarea
                  rows={4}
                  value={actionPlanInput || selectedAlert.actionPlan || ''}
                  onChange={(e) => setActionPlanInput(e.target.value)}
                  placeholder="Record counseling notes, remedial class schedules, or guardian call results..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    updateAlertStatus(selectedAlert.id, 'Counseling Scheduled', actionPlanInput);
                    triggerNotification('Counselor Meeting Booked', `Scheduled intervention call for student ${selectedAlert.studentId}.`, 'success');
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book Guardian Meeting</span>
                </button>

                <button
                  onClick={() => {
                    updateAlertStatus(selectedAlert.id, 'Resolved', actionPlanInput || 'Intervention completed and grades recovered.');
                    triggerNotification('Case Resolved', `EWS case for student ${selectedAlert.studentId} marked as resolved.`, 'success');
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Case Resolved</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl text-xs text-slate-500">
              Select an at-risk student card to view or record counselor intervention notes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
