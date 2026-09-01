/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { Navbar } from './components/ui/Navbar';
import { NotificationToast } from './components/ui/NotificationToast';
import { CrmDashboard } from './components/crm/CrmDashboard';
import { AdmissionsManager } from './components/crm/AdmissionsManager';
import { StudentManager } from './components/crm/StudentManager';
import { AcademicStructure } from './components/crm/AcademicStructure';
import { AttendanceManager } from './components/crm/AttendanceManager';
import { ExamManager } from './components/crm/ExamManager';
import { FeeManager } from './components/crm/FeeManager';
import { EarlyWarningSystem } from './components/crm/EarlyWarningSystem';
import { ParentPortal } from './components/creator/ParentPortal';
import { ArchitectureViewer } from './components/docs/ArchitectureViewer';

const AppContent: React.FC = () => {
  const { currentPortal, crmTab } = useSchool();

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#D1D5DB] font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />
      <NotificationToast />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentPortal === 'creator' && <ParentPortal />}

        {(currentPortal === 'architecture' || currentPortal === 'deluge' || (currentPortal as string) === 'docs') && (
          <ArchitectureViewer />
        )}

        {currentPortal === 'webform' && <AdmissionsManager />}

        {currentPortal === 'crm' && (
          <>
            {crmTab === 'dashboard' && <CrmDashboard />}
            {crmTab === 'admissions' && <AdmissionsManager />}
            {crmTab === 'students' && <StudentManager />}
            {crmTab === 'academics' && <AcademicStructure />}
            {crmTab === 'attendance' && <AttendanceManager />}
            {crmTab === 'exams' && <ExamManager />}
            {crmTab === 'fees' && <FeeManager />}
            {crmTab === 'early-warning' && <EarlyWarningSystem />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1F2937] bg-[#111827] py-4 px-6 text-center text-xs text-[#9CA3AF]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>EduCore • School Management System (Zoho CRM & Creator Hybrid)</span>
          <span className="font-mono text-[11px] text-blue-400">Deluge Automation Engine & EWS Active</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <AppContent />
    </SchoolProvider>
  );
}
