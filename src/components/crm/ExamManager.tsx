import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Examination, MarkEntry } from '../../types';
import {
  Award,
  Plus,
  Search,
  Filter,
  Save,
  CheckCircle2,
  TrendingUp,
  BarChart2,
  Calendar,
  Sparkles,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export const ExamManager: React.FC = () => {
  const {
    examinations,
    classes,
    subjects,
    students,
    markEntries,
    saveMarkEntry,
    saveBatchMarks,
    addExamination
  } = useSchool();

  const [selectedExamId, setSelectedExamId] = useState<string>(examinations[0]?.id || 'EXAM-2025-T1');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('SUB-101');
  const [marksDraft, setMarksDraft] = useState<Record<string, { marks: number; feedback: string }>>({});
  const [showNewExamModal, setShowNewExamModal] = useState(false);

  // New Exam Form
  const [newExamName, setNewExamName] = useState('');
  const [newExamClassId, setNewExamClassId] = useState(classes[0]?.id || 'CLS-10');
  const [newExamStartDate, setNewExamStartDate] = useState('2026-04-10');
  const [newExamEndDate, setNewExamEndDate] = useState('2026-04-20');

  const selectedExam = examinations.find(e => e.id === selectedExamId) || examinations[0];
  const examClass = classes.find(c => c.id === selectedExam.classId);
  const examSubjects = subjects.filter(s => s.classId === selectedExam.classId);
  const examStudents = students.filter(s => s.currentClassId === selectedExam.classId);
  const currentSubject = subjects.find(s => s.id === selectedSubjectId) || examSubjects[0];

  // Helper for mark input
  const getDraftMarks = (studentId: string): { marks: number; feedback: string } => {
    if (marksDraft[studentId] !== undefined) return marksDraft[studentId];
    const existing = markEntries.find(
      m => m.examId === selectedExam.id && m.studentId === studentId && m.subjectId === selectedSubjectId
    );
    if (existing) {
      return { marks: existing.marksObtained, feedback: existing.feedback || '' };
    }
    return { marks: 80, feedback: '' };
  };

  const handleMarkChange = (studentId: string, marks: number) => {
    setMarksDraft(prev => ({
      ...prev,
      [studentId]: {
        marks: Math.max(0, Math.min(currentSubject?.maxMarks || 100, marks)),
        feedback: prev[studentId]?.feedback || ''
      }
    }));
  };

  const handleFeedbackChange = (studentId: string, feedback: string) => {
    setMarksDraft(prev => ({
      ...prev,
      [studentId]: {
        marks: prev[studentId]?.marks ?? 80,
        feedback
      }
    }));
  };

  const handleSaveSubjectMarks = () => {
    const payload = examStudents.map(student => {
      const draft = getDraftMarks(student.id);
      return {
        studentId: student.id,
        subjectId: selectedSubjectId,
        marksObtained: draft.marks,
        maxMarks: currentSubject?.maxMarks || 100,
        feedback: draft.feedback
      };
    });

    saveBatchMarks(selectedExam.id, payload);
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamName) return;

    addExamination({
      name: newExamName,
      academicYearId: 'AY-2025-26',
      classId: newExamClassId,
      startDate: newExamStartDate,
      endDate: newExamEndDate,
      totalMaxMarks: 500,
      status: 'Scheduled'
    });

    setShowNewExamModal(false);
    setNewExamName('');
  };

  // Compute Class Leaderboard & Performance Summary
  const studentPerformanceLeaderboard = examStudents.map(student => {
    const studentMarks = markEntries.filter(m => m.examId === selectedExam.id && m.studentId === student.id);
    const totalObtained = studentMarks.reduce((acc, curr) => acc + curr.marksObtained, 0);
    const totalMax = studentMarks.reduce((acc, curr) => acc + curr.maxMarks, 0);
    const percentage = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0;

    let grade = 'N/A';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C';
    else if (percentage > 0) grade = 'F';

    return {
      student,
      totalObtained,
      totalMax,
      percentage,
      grade,
      gradedCount: studentMarks.length
    };
  }).sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Zoho CRM Examinations Module
            </span>
            <span className="text-xs text-slate-400">Deluge 03 Automated Grading & Ranks</span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1">Examination Management & Gradebook Engine</h2>
          <p className="text-xs text-slate-400">
            Configure assessments, record subject marks, and compute automatic percentages, letter grades, and class rank distributions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewExamModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Schedule New Exam</span>
          </button>
          <button
            onClick={handleSaveSubjectMarks}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-amber-500/20"
          >
            <Save className="w-4 h-4" />
            <span>Save Marks & Recalculate Ranks</span>
          </button>
        </div>
      </div>

      {/* Exam Selector and Subject Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Select Examination</label>
          <select
            value={selectedExamId}
            onChange={(e) => {
              setSelectedExamId(e.target.value);
              const exam = examinations.find(ex => ex.id === e.target.value);
              const subs = subjects.filter(s => s.classId === exam?.classId);
              if (subs.length > 0) setSelectedSubjectId(subs[0].id);
            }}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-semibold focus:outline-none focus:border-amber-500"
          >
            {examinations.map(exam => (
              <option key={exam.id} value={exam.id}>
                {exam.name} ({classes.find(c => c.id === exam.classId)?.name}) - Status: {exam.status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Select Course / Subject</label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-semibold focus:outline-none focus:border-amber-500"
          >
            {examSubjects.map(sub => (
              <option key={sub.id} value={sub.id}>
                {sub.name} ({sub.code}) • Max Marks: {sub.maxMarks}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Marks Scoring Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Marks Entry Table */}
        <div className="lg:col-span-8 space-y-3">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Marks Entry: {currentSubject?.name} ({currentSubject?.code})
                </h3>
                <p className="text-[11px] text-slate-400">
                  Target Grade: {examClass?.name} • Max Allowable: {currentSubject?.maxMarks || 100} Marks
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Deluge Auto-Grading Live
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/50 text-slate-400 uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Score / Max</th>
                    <th className="px-4 py-3">Calculated Grade</th>
                    <th className="px-4 py-3">Faculty Feedback</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {examStudents.map(student => {
                    const draft = getDraftMarks(student.id);
                    const pct = Math.round((draft.marks / (currentSubject?.maxMarks || 100)) * 100);
                    let grade = 'F';
                    if (pct >= 90) grade = 'A+';
                    else if (pct >= 80) grade = 'A';
                    else if (pct >= 70) grade = 'B+';
                    else if (pct >= 60) grade = 'B';
                    else if (pct >= 50) grade = 'C';
                    else if (pct >= 40) grade = 'D';

                    return (
                      <tr key={student.id} className="hover:bg-slate-850/40">
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
                              <div className="text-[10px] font-mono text-amber-400">{student.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={0}
                              max={currentSubject?.maxMarks || 100}
                              value={draft.marks}
                              onChange={(e) => handleMarkChange(student.id, Number(e.target.value))}
                              className="w-20 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-bold text-center focus:outline-none focus:border-amber-500"
                            />
                            <span className="text-slate-400 font-semibold">/ {currentSubject?.maxMarks || 100}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex px-2.5 py-1 rounded-md font-extrabold text-xs ${
                            grade === 'A+' || grade === 'A'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : grade === 'B+' || grade === 'B'
                              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                              : grade === 'C' || grade === 'D'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}>
                            {grade} ({pct}%)
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <input
                            type="text"
                            placeholder="Teacher comments..."
                            value={draft.feedback}
                            onChange={(e) => handleFeedbackChange(student.id, e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Class Rank Leaderboard */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Class Rank Leaderboard</h3>
              </div>
              <span className="text-[11px] text-slate-400">Aggregate Score</span>
            </div>

            <div className="space-y-2.5">
              {studentPerformanceLeaderboard.map((item, index) => (
                <div
                  key={item.student.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      index === 0 ? 'bg-amber-500 text-slate-950' : index === 1 ? 'bg-slate-300 text-slate-950' : index === 2 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <div className="font-bold text-xs text-white truncate">{item.student.name}</div>
                      <div className="text-[10px] text-slate-400">{item.totalObtained} / {item.totalMax || 500} Marks</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-extrabold text-xs text-emerald-400">{item.percentage}%</div>
                    <div className="text-[10px] font-bold text-slate-400">Grade {item.grade}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SCHEDULE NEW EXAM MODAL */}
      {showNewExamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Schedule New Examination</h3>
              <button onClick={() => setShowNewExamModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateExam} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Assessment Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Term 3 Periodic Assessment 2026"
                  value={newExamName}
                  onChange={(e) => setNewExamName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Class Grade</label>
                <select
                  value={newExamClassId}
                  onChange={(e) => setNewExamClassId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.stream})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newExamStartDate}
                    onChange={(e) => setNewExamStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newExamEndDate}
                    onChange={(e) => setNewExamEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewExamModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Create Examination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
