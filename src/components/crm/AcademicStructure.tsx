import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  BookOpen,
  Layers,
  Users,
  GraduationCap,
  Calendar,
  School,
  Sparkles,
  Award,
  Plus
} from 'lucide-react';

export const AcademicStructure: React.FC = () => {
  const {
    academicYears,
    classes,
    sections,
    subjects,
    teachers,
    students
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'classes' | 'sections' | 'subjects' | 'teachers'>('classes');
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || 'CLS-10');

  const selectedClass = classes.find(c => c.id === selectedClassId) || classes[0];
  const classSections = sections.filter(s => s.classId === selectedClassId);
  const classSubjects = subjects.filter(sub => sub.classId === selectedClassId);
  const classStudents = students.filter(stu => stu.currentClassId === selectedClassId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Academic Architecture Module
            </span>
            <span className="text-xs text-slate-400">Current Session: 2025 - 2026</span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1">Academic Structure, Classes & Teacher Mapping</h2>
          <p className="text-xs text-slate-400">
            Define hierarchical relationships between Academic Years, Classes, Sections, Subjects, and Faculty.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'classes' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Classes & Curriculum
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'sections' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sections & Rooms
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'subjects' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Subjects & Credits
          </button>
          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'teachers' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Faculty Directory
          </button>
        </div>
      </div>

      {/* Class Level Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {classes.map(cls => {
          const studentCount = students.filter(s => s.currentClassId === cls.id).length;
          const sectionCount = sections.filter(s => s.classId === cls.id).length;

          return (
            <div
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer ${
                selectedClassId === cls.id
                  ? 'bg-slate-850 border-amber-500 ring-1 ring-amber-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">{cls.id}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Level {cls.level}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white mt-1">{cls.name}</h3>
              <p className="text-[11px] text-slate-400 truncate">{cls.stream}</p>
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>{sectionCount} Sections</span>
                <span className="font-semibold text-slate-200">{studentCount} Students</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab 1: Classes & Curriculum Overview */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Class Profile Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-amber-400">{selectedClass.id}</span>
                <h3 className="text-lg font-bold text-white">{selectedClass.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase">Annual Fee</span>
                <p className="text-sm font-extrabold text-emerald-400">${selectedClass.annualFee}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <p><span className="text-slate-400">Academic Stream:</span> <span className="font-semibold text-white">{selectedClass.stream}</span></p>
              <p><span className="text-slate-400">Active Sections:</span> <span className="font-semibold text-white">{classSections.length}</span></p>
              <p><span className="text-slate-400">Total Subjects:</span> <span className="font-semibold text-white">{classSubjects.length} Courses</span></p>
              <p><span className="text-slate-400">Enrolled Students:</span> <span className="font-semibold text-amber-400">{classStudents.length} Students</span></p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-300">Zoho CRM Relational Mapping:</span>
              <p>Linked via <code className="text-amber-400 font-mono">Class_Lookup</code> foreign key across Sections, Students, Exams, and Fee Structures.</p>
            </div>
          </div>

          {/* Associated Sections */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Assigned Sections ({classSections.length})</span>
            </h3>

            <div className="space-y-2.5">
              {classSections.map(sec => {
                const teacher = teachers.find(t => t.id === sec.classTeacherId);
                const count = students.filter(s => s.currentSectionId === sec.id).length;

                return (
                  <div key={sec.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{sec.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {sec.roomNo}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Class Teacher: <span className="font-semibold text-sky-400">{teacher?.name || 'Unassigned'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                      <span>Enrollment: {count}/{sec.capacity}</span>
                      <span className="text-emerald-400 font-medium">Active</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Associated Subjects */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Core Subjects & Faculty ({classSubjects.length})</span>
            </h3>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {classSubjects.map(sub => {
                const teacher = teachers.find(t => t.id === sub.teacherId);
                return (
                  <div key={sub.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-white">{sub.name}</span>
                        <span className="font-mono text-[9px] px-1 rounded bg-slate-800 text-amber-400">{sub.code}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Instructor: <span className="text-slate-300">{teacher?.name}</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                      {sub.credits} Credits
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sections & Rooms */}
      {activeTab === 'sections' && (
        <div className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Section ID</th>
                <th className="px-4 py-3">Class Grade</th>
                <th className="px-4 py-3">Section Name</th>
                <th className="px-4 py-3">Room</th>
                <th className="px-4 py-3">Class Teacher</th>
                <th className="px-4 py-3 text-right">Capacity & Headcount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {sections.map(sec => {
                const cls = classes.find(c => c.id === sec.classId);
                const teacher = teachers.find(t => t.id === sec.classTeacherId);
                const count = students.filter(s => s.currentSectionId === sec.id).length;

                return (
                  <tr key={sec.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-mono text-amber-400 font-bold">{sec.id}</td>
                    <td className="px-4 py-3 font-semibold text-white">{cls?.name}</td>
                    <td className="px-4 py-3">{sec.name}</td>
                    <td className="px-4 py-3 text-slate-400">{sec.roomNo}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-sky-400">{teacher?.name}</div>
                      <div className="text-[10px] text-slate-500">{teacher?.department}</div>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-white">
                      {count} / {sec.capacity} students
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Subjects & Curriculum */}
      {activeTab === 'subjects' && (
        <div className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Subject Code</th>
                <th className="px-4 py-3">Subject Name</th>
                <th className="px-4 py-3">Assigned Grade</th>
                <th className="px-4 py-3">Lead Faculty</th>
                <th className="px-4 py-3">Credits</th>
                <th className="px-4 py-3 text-right">Max Exam Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {subjects.map(sub => {
                const cls = classes.find(c => c.id === sub.classId);
                const teacher = teachers.find(t => t.id === sub.teacherId);

                return (
                  <tr key={sub.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-mono text-amber-400 font-bold">{sub.code}</td>
                    <td className="px-4 py-3 font-bold text-white">{sub.name}</td>
                    <td className="px-4 py-3 text-slate-300">{cls?.name}</td>
                    <td className="px-4 py-3 text-sky-400">{teacher?.name}</td>
                    <td className="px-4 py-3 font-semibold">{sub.credits}</td>
                    <td className="px-4 py-3 text-right font-bold text-white">{sub.maxMarks}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Faculty & Teachers Directory */}
      {activeTab === 'teachers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map(teacher => {
            const taughtSubjects = subjects.filter(sub => sub.teacherId === teacher.id);
            const classTeacherSection = sections.find(s => s.classTeacherId === teacher.id);

            return (
              <div key={teacher.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={teacher.avatarUrl}
                    alt={teacher.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{teacher.name}</h4>
                    <span className="text-[10px] font-mono text-amber-400">{teacher.employeeId}</span>
                    <p className="text-[11px] text-slate-400">{teacher.department}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] space-y-1 text-slate-300">
                  <p><span className="text-slate-400">Specialization:</span> {teacher.specialization}</p>
                  <p><span className="text-slate-400">Email:</span> {teacher.email}</p>
                  {classTeacherSection && (
                    <p><span className="text-slate-400">Class Mentor:</span> <span className="font-semibold text-emerald-300">{classTeacherSection.name}</span></p>
                  )}
                </div>

                <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
                  <span>Assigned Courses:</span>
                  <span className="font-bold text-white">{taughtSubjects.length} Subjects</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
