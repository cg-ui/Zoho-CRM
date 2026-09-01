import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { StudentFeeAccount, PaymentTransaction, FeeInstallment } from '../../types';
import {
  CreditCard,
  Search,
  Filter,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Plus,
  Send,
  Download,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';

export const FeeManager: React.FC = () => {
  const {
    students,
    classes,
    feeAccounts,
    paymentTransactions,
    processFeePayment,
    triggerNotification
  } = useSchool();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [selectedAccount, setSelectedAccount] = useState<StudentFeeAccount | null>(feeAccounts[0] || null);

  // Record Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInstallmentId, setSelectedInstallmentId] = useState<string>('');
  const [paymentAmount, setPaymentAmount] = useState<number>(1500);
  const [paymentMethod, setPaymentMethod] = useState<PaymentTransaction['paymentMethod']>('Net Banking');
  const [transactionRef, setTransactionRef] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');

  // Receipt Modal
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<PaymentTransaction | null>(paymentTransactions[0] || null);

  const filteredFeeAccounts = feeAccounts.filter(acc => {
    const student = students.find(s => s.id === acc.studentId);
    const matchesSearch =
      (student?.name.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      acc.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student?.parentEmail.toLowerCase().includes(searchQuery.toLowerCase()) || false);

    const matchesStatus = selectedStatusFilter === 'ALL' || acc.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalBilled = feeAccounts.reduce((acc, curr) => acc + curr.netFee, 0);
  const totalCollected = feeAccounts.reduce((acc, curr) => acc + curr.amountPaid, 0);
  const totalOutstanding = feeAccounts.reduce((acc, curr) => acc + curr.outstandingBalance, 0);
  const overdueAccounts = feeAccounts.filter(f => f.status === 'Overdue');

  const handleOpenPaymentModal = (acc: StudentFeeAccount) => {
    setSelectedAccount(acc);
    const firstUnpaid = acc.installments.find(i => i.status !== 'Paid');
    if (firstUnpaid) {
      setSelectedInstallmentId(firstUnpaid.id);
      setPaymentAmount(firstUnpaid.amount - firstUnpaid.paidAmount);
    } else if (acc.installments[0]) {
      setSelectedInstallmentId(acc.installments[0].id);
      setPaymentAmount(500);
    }
    setShowPaymentModal(true);
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount || !selectedInstallmentId) return;

    const newTxn = processFeePayment({
      studentId: selectedAccount.studentId,
      installmentId: selectedInstallmentId,
      amount: Number(paymentAmount),
      paymentMethod,
      transactionRef: transactionRef || undefined,
      notes: paymentNotes || 'Cashier counter receipt in CRM'
    });

    setShowPaymentModal(false);
    setActiveReceipt(newTxn);
    setShowReceiptModal(true);
  };

  const handleSendOverdueReminders = () => {
    triggerNotification(
      'Deluge Scheduled Script Executed',
      `Dispatched automated fee overdue reminder notices (WhatsApp & Email) to ${overdueAccounts.length} delinquent accounts.`,
      'info'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Zoho CRM Billing & Fee Accounts
            </span>
            <span className="text-xs text-slate-400">Multi-installment tracking</span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1">Fee Invoicing, Installments & Payment Ledger</h2>
          <p className="text-xs text-slate-400">
            Monitor total annual school fees, track term-wise installments, record transactions, and auto-dispatch overdue notices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {overdueAccounts.length > 0 && (
            <button
              onClick={handleSendOverdueReminders}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-bold border border-rose-800/80 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Overdue Reminders ({overdueAccounts.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase">Total School Billing</span>
          <div className="mt-2 text-2xl font-black text-white">${totalBilled.toLocaleString()}</div>
          <p className="text-[11px] text-slate-400 mt-1">Across all {feeAccounts.length} enrolled fee accounts</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase">Collected Revenue</span>
          <div className="mt-2 text-2xl font-black text-emerald-400">${totalCollected.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-400 mt-1">
            {totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0}% Realization Rate
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase">Outstanding Balance</span>
          <div className="mt-2 text-2xl font-black text-rose-400">${totalOutstanding.toLocaleString()}</div>
          <p className="text-[11px] text-rose-300 mt-1">{overdueAccounts.length} accounts currently overdue</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, student ID, parent email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Payment Statuses</option>
            <option value="Paid">Fully Paid</option>
            <option value="Partial">Partially Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue (Delinquent)</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Fee Accounts Table + Selected Account Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Total Net Fee</th>
                  <th className="px-4 py-3">Paid</th>
                  <th className="px-4 py-3">Outstanding</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {filteredFeeAccounts.map(account => {
                  const student = students.find(s => s.id === account.studentId);
                  const isSelected = selectedAccount?.id === account.id;

                  return (
                    <tr
                      key={account.id}
                      onClick={() => setSelectedAccount(account)}
                      className={`hover:bg-slate-800/40 cursor-pointer ${
                        isSelected ? 'bg-slate-850' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-bold text-white">{student?.name || account.studentId}</div>
                        <div className="font-mono text-[10px] text-amber-400">{account.studentId}</div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-white">${account.netFee}</td>
                      <td className="px-4 py-3 font-bold text-emerald-400">${account.amountPaid}</td>
                      <td className="px-4 py-3 font-bold text-rose-400">${account.outstandingBalance}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          account.status === 'Paid'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : account.status === 'Overdue'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {account.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {account.outstandingBalance > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenPaymentModal(account);
                            }}
                            className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold transition"
                          >
                            Receive Payment
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Fee Account Breakdown */}
        {selectedAccount && (
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-amber-400">{selectedAccount.id}</span>
                  <h3 className="text-base font-bold text-white">
                    {students.find(s => s.id === selectedAccount.studentId)?.name}
                  </h3>
                </div>
                {selectedAccount.outstandingBalance > 0 && (
                  <button
                    onClick={() => handleOpenPaymentModal(selectedAccount)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition"
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Pay Installment</span>
                  </button>
                )}
              </div>

              {/* Installment Breakdown */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Installment Schedule</h4>
                {selectedAccount.installments.map(inst => (
                  <div
                    key={inst.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{inst.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>Due: {inst.dueDate}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-white">${inst.amount}</div>
                      <span className={`inline-flex px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        inst.status === 'Paid'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : inst.status === 'Overdue'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {inst.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Related Payment Receipts for this Student */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Payment History</h4>
                {paymentTransactions.filter(p => p.studentId === selectedAccount.studentId).map(txn => (
                  <div
                    key={txn.id}
                    className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="font-bold text-white">{txn.receiptNumber}</div>
                        <div className="text-[10px] text-slate-400">{txn.paymentDate} • {txn.paymentMethod}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-400">+${txn.amount}</div>
                      <button
                        onClick={() => {
                          setActiveReceipt(txn);
                          setShowReceiptModal(true);
                        }}
                        className="text-[10px] text-amber-400 hover:underline"
                      >
                        Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RECORD PAYMENT MODAL */}
      {showPaymentModal && selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Record Fee Payment (CRM Cashier)</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleExecutePayment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Target Installment</label>
                <select
                  value={selectedInstallmentId}
                  onChange={(e) => setSelectedInstallmentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                >
                  {selectedAccount.installments.map(inst => (
                    <option key={inst.id} value={inst.id}>
                      {inst.title} - ${inst.amount} (Paid: ${inst.paidAmount})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Payment Amount ($)</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-base focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Payment Mode</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Net Banking">Net Banking / Direct Deposit</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="UPI">UPI / Digital Wallet</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash (Cashier Counter)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Bank Reference / Cheque No</label>
                <input
                  type="text"
                  placeholder="e.g. ACH-9081290 or CHQ-4490"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
                >
                  Process & Generate Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECEIPT MODAL */}
      {showReceiptModal && activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl p-6 space-y-5 animate-in zoom-in-95">
            <div className="text-center pb-4 border-b border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Payment Receipt</h3>
              <p className="text-xs font-mono text-amber-400">{activeReceipt.receiptNumber}</p>
            </div>

            <div className="space-y-2.5 text-xs bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Student:</span>
                <span className="font-bold text-white">{students.find(s => s.id === activeReceipt.studentId)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Student ID:</span>
                <span className="font-mono text-slate-200">{activeReceipt.studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date Paid:</span>
                <span className="text-slate-200">{activeReceipt.paymentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Mode:</span>
                <span className="text-slate-200">{activeReceipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Reference:</span>
                <span className="font-mono text-slate-200">{activeReceipt.transactionReference}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm">
                <span className="font-bold text-slate-300">Amount Paid:</span>
                <span className="font-black text-emerald-400">${activeReceipt.amount}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReceiptModal(false)}
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
