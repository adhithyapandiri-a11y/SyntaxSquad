'use client';

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { 
  CreditCard, Download, CheckCircle2, Clock, AlertCircle, Plus, FileText, Sparkles 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useStore } from '@/lib/store/useStore';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Payment } from '@/types';

export default function PaymentsPage() {
  const { payments, markPaymentPaid, addPayment } = useStore();
  const [selectedPayForModal, setSelectedPayForModal] = useState<Payment | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit Card' | 'Net Banking'>('UPI');

  const handlePayConfirm = () => {
    if (!selectedPayForModal) return;
    markPaymentPaid(selectedPayForModal.id, paymentMethod);
    setSelectedPayForModal(null);
  };

  const generatePDFReceipt = (pay: Payment) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.text('RoomZen Student Housing OS', 20, 20);

    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50);
    doc.text('OFFICIAL PAYMENT RECEIPT', 20, 32);

    doc.setLineWidth(0.5);
    doc.line(20, 36, 190, 36);

    doc.setFontSize(11);
    doc.text(`Receipt Invoice No: ${pay.invoiceNo}`, 20, 48);
    doc.text(`Date of Payment: ${pay.paidDate ? formatDate(pay.paidDate) : formatDate(new Date().toISOString())}`, 20, 56);
    doc.text(`Student Name: ${pay.studentName}`, 20, 64);
    doc.text(`Room Number: Room ${pay.roomNumber}`, 20, 72);

    doc.line(20, 78, 190, 78);

    doc.text(`Description: ${pay.title}`, 20, 90);
    doc.text(`Amount Paid: ${formatCurrency(pay.amount)}`, 20, 98);
    doc.text(`Payment Method: ${pay.paymentMethod || 'UPI'}`, 20, 106);
    doc.text(`Transaction Status: SUCCESSFUL`, 20, 114);

    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text('This is a computer-generated digital receipt issued by RoomZen OS.', 20, 135);

    doc.save(`RoomZen_Receipt_${pay.invoiceNo}.pdf`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <CreditCard className="w-7 h-7 text-violet-600" />
            Hostel Fee & Financial Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track student hostel fees, mess bills, electricity utility invoices, and download PDF receipts.
          </p>
        </div>
      </div>

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices & Payment Records</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-4">Invoice No</th>
                <th className="p-4">Student</th>
                <th className="p-4">Billing Item</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {payments.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">{pay.invoiceNo}</td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white">{pay.studentName}</p>
                    <p className="text-[10px] text-slate-500">Room {pay.roomNumber}</p>
                  </td>
                  <td className="p-4 font-medium text-slate-800 dark:text-slate-200">{pay.title}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{formatCurrency(pay.amount)}</td>
                  <td className="p-4 text-slate-500">{formatDate(pay.dueDate)}</td>
                  <td className="p-4">
                    <Badge variant={pay.status === 'paid' ? 'success' : 'warning'}>{pay.status}</Badge>
                  </td>
                  <td className="p-4 text-right">
                    {pay.status === 'pending' ? (
                      <Button size="sm" variant="primary" onClick={() => setSelectedPayForModal(pay)}>
                        Pay Invoice
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => generatePDFReceipt(pay)}>
                        <Download className="w-3.5 h-3.5 mr-1" /> PDF Receipt
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Online Payment Modal */}
      {selectedPayForModal && (
        <Modal
          isOpen={!!selectedPayForModal}
          onClose={() => setSelectedPayForModal(null)}
          title={`Pay Invoice: ${selectedPayForModal.title}`}
          subtitle={`Amount: ${formatCurrency(selectedPayForModal.amount)} • Invoice ${selectedPayForModal.invoiceNo}`}
          maxWidth="sm"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['UPI', 'Credit Card', 'Net Banking'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                      paymentMethod === m
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold">{formatCurrency(selectedPayForModal.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Gateway Fee:</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between border-t pt-1 font-extrabold text-sm">
                <span>Total Amount:</span>
                <span className="text-blue-600">{formatCurrency(selectedPayForModal.amount)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button variant="ghost" onClick={() => setSelectedPayForModal(null)}>Cancel</Button>
              <Button variant="success" onClick={handlePayConfirm}>
                Confirm & Pay {formatCurrency(selectedPayForModal.amount)}
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
