import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Layers,
  Code2,
  Database,
  Workflow,
  Sparkles,
  Copy,
  Check,
  FileText,
  GitBranch,
  ShieldCheck,
  Server,
  ArrowRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const { delugeScripts } = useSchool();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeDocTab, setActiveDocTab] = useState<'architecture' | 'erd' | 'integration' | 'deluge' | 'additional_feature'>('architecture');

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-pill bg-info text-[10px]">
              Complete System Documentation & Specification
            </span>
            <span className="text-xs text-[#9CA3AF]">Zoho CRM &amp; Creator Architecture</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            System Design, Relational Data Structure &amp; Deluge Engine
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-1 max-w-2xl">
            Comprehensive blueprint covering modules, fields, foreign keys, bidirectional CRM ↔ Creator webhooks, automated Deluge scripts, and the Early Warning System.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center p-1 bg-[#0A0C10] rounded-xl border border-[#1F2937]">
          <button
            onClick={() => setActiveDocTab('architecture')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeDocTab === 'architecture' ? 'bg-blue-600 text-white font-bold' : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            System Architecture
          </button>
          <button
            onClick={() => setActiveDocTab('erd')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeDocTab === 'erd' ? 'bg-blue-600 text-white font-bold' : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            Data Structure &amp; ERD
          </button>
          <button
            onClick={() => setActiveDocTab('integration')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeDocTab === 'integration' ? 'bg-blue-600 text-white font-bold' : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            CRM ↔ Creator Sync
          </button>
          <button
            onClick={() => setActiveDocTab('deluge')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeDocTab === 'deluge' ? 'bg-blue-600 text-white font-bold' : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            Deluge Scripts ({delugeScripts.length})
          </button>
          <button
            onClick={() => setActiveDocTab('additional_feature')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeDocTab === 'additional_feature' ? 'bg-blue-600 text-white font-bold' : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            Additional Feature (EWS)
          </button>
        </div>
      </div>

      {/* TAB 1: System Architecture Overview */}
      {activeDocTab === 'architecture' && (
        <div className="space-y-6">
          <div className="card space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-400" />
              <span>High-Level Dual System Architecture</span>
            </h3>
            <p className="text-xs text-[#D1D5DB] leading-relaxed">
              The system segregates back-office administrative control (Zoho CRM) from self-service parent engagement (Zoho Creator) using RESTful API connectors, automated Deluge business logic, and role-based record scoping.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0A0C10] border border-blue-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-blue-400 text-sm">1. Zoho CRM (Primary Staff Operating System)</h4>
                  <span className="status-pill bg-info text-[10px]">Staff Portal</span>
                </div>
                <ul className="text-xs text-[#D1D5DB] space-y-1.5 list-disc list-inside">
                  <li><strong>Admissions &amp; Webforms:</strong> Leads module with automated qualification scorecards and Deluge conversion.</li>
                  <li><strong>Students Directory:</strong> Unique Auto-numbering (<code className="text-blue-400">STU-YYYY-XXXX</code>), multi-year academic log sub-forms.</li>
                  <li><strong>Academic Structure:</strong> Hierarchical lookup tree (Academic Year → Class → Section → Subject → Faculty).</li>
                  <li><strong>Attendance Module:</strong> Duplicate validation rule preventing multiple roll-calls per date per student.</li>
                  <li><strong>Examinations:</strong> Marks ledger with automatic GPA calculation, grading thresholds, and leaderboard ranks.</li>
                  <li><strong>Fee Management:</strong> Installment schedules, cash/counter receipts, and automated overdue notifications.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0C10] border border-blue-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-blue-400 text-sm">2. Zoho Creator (Parent-Facing Self-Service Portal)</h4>
                  <span className="status-pill bg-info text-[10px]">Parent Portal</span>
                </div>
                <ul className="text-xs text-[#D1D5DB] space-y-1.5 list-disc list-inside">
                  <li><strong>Role-Based Access Control (RBAC):</strong> Authenticated parents only access records filtered by <code className="text-blue-400">zoho.loginuser</code> matching <code className="text-blue-400">Parent_Email</code>.</li>
                  <li><strong>Multi-Ward Support:</strong> Instant toggle between multiple siblings enrolled at Springdale.</li>
                  <li><strong>Live CRM Sync:</strong> Displays attendance trends, exam performance report cards, and fee schedules in real-time.</li>
                  <li><strong>Integrated Online Fee Settlement:</strong> In-portal payment gateway syncing immediately to CRM payment ledgers.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Data Structure & ERD */}
      {activeDocTab === 'erd' && (
        <div className="space-y-6">
          <div className="card space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-400" />
              <span>Zoho CRM Relational Data Structure &amp; Custom Modules</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {/* Module 1 */}
              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-2">
                <div className="font-bold text-blue-400 text-sm">1. Leads (Standard Module)</div>
                <p className="text-[#9CA3AF] text-[11px]">Captures webform enquiries &amp; parent follow-ups.</p>
                <div className="space-y-1 text-[#D1D5DB]">
                  <p><code className="text-[#9CA3AF]">Student_Name:</code> Single Line</p>
                  <p><code className="text-[#9CA3AF]">Parent_Name, Email, Phone:</code> Contact Fields</p>
                  <p><code className="text-[#9CA3AF]">Target_Class:</code> Lookup (Classes)</p>
                  <p><code className="text-[#9CA3AF]">Lead_Status:</code> New, In Review, Offered, Enrolled, Rejected</p>
                  <p><code className="text-[#9CA3AF]">Converted_Student_ID:</code> Lookup (Students)</p>
                </div>
              </div>

              {/* Module 2 */}
              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-2">
                <div className="font-bold text-blue-400 text-sm">2. Students (Custom Module)</div>
                <p className="text-[#9CA3AF] text-[11px]">Primary student 360 record with unique ID.</p>
                <div className="space-y-1 text-[#D1D5DB]">
                  <p><code className="text-[#9CA3AF]">Student_ID:</code> Auto-Number (STU-YYYY-XXXX)</p>
                  <p><code className="text-[#9CA3AF]">Current_Class_Lookup:</code> Lookup (Classes)</p>
                  <p><code className="text-[#9CA3AF]">Current_Section_Lookup:</code> Lookup (Sections)</p>
                  <p><code className="text-[#9CA3AF]">Academic_History_Subform:</code> Multi-row table (Year, Grade, Section, GPA, Status)</p>
                  <p><code className="text-[#9CA3AF]">Risk_Level:</code> Low, Moderate, High (EWS Calculated)</p>
                </div>
              </div>

              {/* Module 3 */}
              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-2">
                <div className="font-bold text-blue-400 text-sm">3. Classes &amp; Sections (Custom Modules)</div>
                <p className="text-[#9CA3AF] text-[11px]">Grade structures and physical classroom allocations.</p>
                <div className="space-y-1 text-[#D1D5DB]">
                  <p><code className="text-[#9CA3AF]">Class_Name, Level, Stream:</code> Curriculum attributes</p>
                  <p><code className="text-[#9CA3AF]">Annual_Tuition_Fee:</code> Currency</p>
                  <p><code className="text-[#9CA3AF]">Class_Teacher_Lookup:</code> Lookup (Faculty)</p>
                  <p><code className="text-[#9CA3AF]">Room_Number, Capacity:</code> Integer &amp; Text</p>
                </div>
              </div>

              {/* Module 4 */}
              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-2">
                <div className="font-bold text-blue-400 text-sm">4. Attendance (Custom Module)</div>
                <p className="text-[#9CA3AF] text-[11px]">Daily roll-call ledger with unique compound constraint.</p>
                <div className="space-y-1 text-[#D1D5DB]">
                  <p><code className="text-[#9CA3AF]">Student_Lookup:</code> Lookup (Students)</p>
                  <p><code className="text-[#9CA3AF]">Attendance_Date:</code> Date</p>
                  <p><code className="text-[#9CA3AF]">Status:</code> Present, Absent, Late, Excused</p>
                  <p><code className="text-[#9CA3AF]">Compound_Key:</code> Student_ID + Date (Enforces single log)</p>
                </div>
              </div>

              {/* Module 5 */}
              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-2">
                <div className="font-bold text-blue-400 text-sm">5. Examinations &amp; Marks (Custom Modules)</div>
                <p className="text-[#9CA3AF] text-[11px]">Test scheduling and student gradebook entries.</p>
                <div className="space-y-1 text-[#D1D5DB]">
                  <p><code className="text-[#9CA3AF]">Exam_Lookup:</code> Lookup (Examinations)</p>
                  <p><code className="text-[#9CA3AF]">Subject_Lookup:</code> Lookup (Subjects)</p>
                  <p><code className="text-[#9CA3AF]">Marks_Obtained, Max_Marks:</code> Decimal</p>
                  <p><code className="text-[#9CA3AF]">Calculated_Grade, GPA:</code> Formula fields</p>
                </div>
              </div>

              {/* Module 6 */}
              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-2">
                <div className="font-bold text-blue-400 text-sm">6. Fee Accounts &amp; Invoices (Custom Modules)</div>
                <p className="text-[#9CA3AF] text-[11px]">Student billing, installment schedules &amp; receipts.</p>
                <div className="space-y-1 text-[#D1D5DB]">
                  <p><code className="text-[#9CA3AF]">Total_Fee, Amount_Paid:</code> Currency</p>
                  <p><code className="text-[#9CA3AF]">Outstanding_Balance:</code> Formula (Total - Paid)</p>
                  <p><code className="text-[#9CA3AF]">Fee_Status:</code> Paid, Partial, Pending, Overdue</p>
                  <p><code className="text-[#9CA3AF]">Installments_Subform:</code> Term breakdowns with due dates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CRM <-> Creator Integration Approach */}
      {activeDocTab === 'integration' && (
        <div className="space-y-6">
          <div className="card space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Workflow className="w-5 h-5 text-blue-400" />
              <span>Bidirectional Integration Architecture (CRM ↔ Creator)</span>
            </h3>

            <div className="space-y-4 text-xs text-[#D1D5DB]">
              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-2">
                <h4 className="font-bold text-blue-400 text-sm">1. Authentication &amp; Security Handshake</h4>
                <p className="leading-relaxed">
                  Connections use <strong>Zoho OAuth 2.0 Integration Connections</strong> (<code className="text-blue-400">zoho.crm.CREATE, zoho.creator.CREATE</code>). Tokens are auto-refreshed via Zoho Connections Manager without manual secret rotation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-2">
                <h4 className="font-bold text-blue-400 text-sm">2. Synchronous &amp; Asynchronous Event Triggers</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-[#111827] border border-[#1F2937]">
                    <span className="font-bold text-white block mb-1">CRM → Creator (Outbound Push)</span>
                    <p className="text-[#9CA3AF] text-[11px]">
                      Workflow rules on Lead Conversion, Daily Attendance creation, Marks submission, and Fee invoice generation invoke Webhooks / Deluge <code className="text-blue-400">zoho.creator.createRecord()</code> to maintain mirrored copies in Creator tables for instant parent rendering.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#111827] border border-[#1F2937]">
                    <span className="font-bold text-white block mb-1">Creator → CRM (Inbound Settlement)</span>
                    <p className="text-[#9CA3AF] text-[11px]">
                      When a parent makes an online payment via Creator portal, the Creator <code className="text-blue-400">On Success</code> script triggers <code className="text-blue-400">zoho.crm.createRecord("Payment_Transactions")</code> and updates the CRM Student Fee Account balance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-2">
                <h4 className="font-bold text-blue-400 text-sm">3. Parent Data Privacy &amp; Scoping in Creator</h4>
                <p className="leading-relaxed">
                  Creator Reports enforce criteria filters: <code className="text-emerald-400 font-mono">Parent_Email == zoho.loginuser</code>. This guarantees strict multi-tenant isolation where parents can never view records of other students.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Deluge Scripts */}
      {activeDocTab === 'deluge' && (
        <div className="space-y-6">
          <div className="card space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <span>Production Deluge Business Automation Scripts</span>
              </h3>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                Exact Deluge functions implementing conversions, validations, calculations, and integrations across Zoho CRM &amp; Creator.
              </p>
            </div>

            <div className="space-y-4">
              {delugeScripts.map(script => (
                <div key={script.id} className="rounded-xl bg-[#0A0C10] border border-[#1F2937] overflow-hidden">
                  <div className="p-3.5 bg-[#111827] border-b border-[#1F2937] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-400">{script.id}</span>
                        <h4 className="font-bold text-xs text-white">{script.name}</h4>
                        <span className="status-pill bg-info text-[10px]">
                          {script.triggerEvent}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9CA3AF] mt-0.5">{script.description}</p>
                    </div>

                    <button
                      onClick={() => handleCopyCode(script.id, script.code)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F2937] hover:bg-[#374151] text-[#D1D5DB] text-xs font-semibold transition"
                    >
                      {copiedId === script.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Deluge</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 overflow-x-auto bg-[#0A0C10]">
                    <pre className="text-xs font-mono text-emerald-400 leading-relaxed">
                      {script.code}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Additional Feature Justification (EWS) */}
      {activeDocTab === 'additional_feature' && (
        <div className="space-y-6">
          <div className="card space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Submission Requirement: Additional Feature Explanation
                </h3>
                <p className="text-xs text-[#9CA3AF]">Comprehensive justification of problem, selection rationale, and scalable implementation.</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#D1D5DB]">
              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-1.5">
                <h4 className="font-bold text-rose-400 text-sm">1. The Problem Identified</h4>
                <p className="leading-relaxed">
                  Traditional school administration is purely reactive: school counselors and management only become aware of student difficulties after end-of-term examination failures, extended truancy, or payment default leading to student dropouts. Because attendance, grading, and finance data live in separate CRM modules, staff lacked a holistic early warning mechanism to intervene before distress escalated.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-1.5">
                <h4 className="font-bold text-blue-400 text-sm">2. Why We Selected the Early Warning System (EWS)</h4>
                <p className="leading-relaxed">
                  A high-impact School Management System should not merely store records—it should generate predictive, actionable intelligence. The Early Warning System (EWS) correlates leading indicators into a unified 100-point risk index:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1 text-[#9CA3AF]">
                  <li><strong>Attendance Decay (&lt;75%):</strong> Accounts for 40 points of risk score.</li>
                  <li><strong>Academic Failure (Marks &lt;60% in any core subject):</strong> Accounts for 40 points.</li>
                  <li><strong>Financial Stress (Fees overdue &gt;30 days):</strong> Accounts for 20 points.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0C10] border border-[#1F2937] space-y-1.5">
                <h4 className="font-bold text-emerald-400 text-sm">3. Scalability, Code Optimization &amp; Execution Architecture</h4>
                <p className="leading-relaxed">
                  In production Zoho environments with 5,000+ students, running realtime calculations during record edits would trigger API concurrency locks and degrade CRM performance. We optimized this by implementing:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1 text-[#9CA3AF]">
                  <li><strong>Scheduled Batch Processing:</strong> A nighttime Deluge schedule (<code className="text-blue-400">DELUGE-06</code>) batches student evaluations in chunks of 200 records.</li>
                  <li><strong>Indexed Criteria Filtering:</strong> Only students modified within the last 7 days or those flagged above threshold are recalculated.</li>
                  <li><strong>Asynchronous Task Dispatch:</strong> Automatically spawns Zoho CRM Tasks assigned to the guidance counselor with pre-filled remedial action plans.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
