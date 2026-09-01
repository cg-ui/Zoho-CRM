import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notifications, dismissNotification } = useSchool();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {notifications.map(n => {
        let borderClass = 'border-sky-500/40 bg-slate-900/95';
        let icon = <Info className="w-5 h-5 text-sky-400 shrink-0" />;

        if (n.type === 'success') {
          borderClass = 'border-emerald-500/50 bg-slate-900/95';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        } else if (n.type === 'warning') {
          borderClass = 'border-amber-500/50 bg-slate-900/95';
          icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
        } else if (n.type === 'error') {
          borderClass = 'border-rose-500/50 bg-slate-900/95';
          icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
        }

        return (
          <div
            key={n.id}
            className={`pointer-events-auto p-3.5 rounded-xl border ${borderClass} shadow-2xl backdrop-blur flex items-start gap-3 transition-all duration-200 animate-in fade-in slide-in-from-bottom-3`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-white tracking-tight truncate">{n.title}</h4>
                <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{n.message}</p>
            </div>
            <button
              onClick={() => dismissNotification(n.id)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
