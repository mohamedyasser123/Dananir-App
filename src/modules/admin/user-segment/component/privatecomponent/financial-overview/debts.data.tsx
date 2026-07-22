import { ChevronRight } from "lucide-react";
import type { DebtData } from "./types";

export const debtsData: DebtData[] = [
    { id: "1", code: "DC-001", person: "Omar Youssef", note: "Borrowed for home renovation", type: "Debit", date: "Mar 20, 2026", total: 15000, paid: 10000, remaining: 5000, status: "Partially Paid", avatarColor: "#EF4444" },
    { id: "2", code: "DC-002", person: "Tarek Mansour", note: "Loan repayment from 2025", type: "Credit", date: "Mar 12, 2026", total: 8500, paid: 8500, remaining: 0, status: "Paid", avatarColor: "#10B981" },
    { id: "3", code: "DC-003", person: "Youssef El-Masry", note: "", type: "Debit", date: "Feb 28, 2026", total: 3200, paid: 0, remaining: 3200, status: "Pending", avatarColor: "#EF4444" },
];

export const debtColumns = [
    {
        header: "PERSON",
        accessorKey: "person",
        cell: ({ row }: { row: { original: DebtData } }) => (
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: row.original.avatarColor }} />
                <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#101828]">{row.original.person}</span>
                    {row.original.note && <span className="text-[12px] text-[#99A1AF]">{row.original.note}</span>}
                </div>
            </div>
        ),
    },
    {
        header: "TYPE",
        accessorKey: "type",
        cell: ({ row }: { row: { original: DebtData } }) => {
            const isDebit = row.original.type === "Debit";
            return (
                <span className={`px-2 py-0.5 text-[11px] font-bold rounded-[6px] inline-flex items-center gap-1 ${isDebit ? "bg-[#FEE2E2] text-[#DC2626]" : "bg-[#D1FAE5] text-[#059669]"}`}>
                    {isDebit ? "↗ Debit" : "↘ Credit"}
                </span>
            );
        },
    },
    {
        header: "DATE",
        accessorKey: "date",
        cell: ({ row }: { row: { original: DebtData } }) => (
            <span className="text-[13px] text-[#64748B]">{row.original.date}</span>
        ),
    },
    {
        header: "TOTAL",
        accessorKey: "total",
        cell: ({ row }: { row: { original: DebtData } }) => (
            <span className="text-[14px] font-bold text-[#101828]">${row.original.total.toLocaleString()}</span>
        ),
    },
    {
        header: "PAID",
        accessorKey: "paid",
        cell: ({ row }: { row: { original: DebtData } }) => (
            <span className="text-[14px] font-medium text-[#059669]">${row.original.paid.toLocaleString()}</span>
        ),
    },
    {
        header: "REMAINING",
        accessorKey: "remaining",
        cell: ({ row }: { row: { original: DebtData } }) => (
            <span className="text-[13px] text-[#64748B]">${row.original.remaining.toLocaleString()}</span>
        ),
    },
    {
        header: "STATUS",
        accessorKey: "status",
        cell: ({ row }: { row: { original: DebtData } }) => {
            const statusStyles = {
                "Partially Paid": "bg-[#FEF3C7] text-[#D97706]",
                Paid: "bg-[#D1FAE5] text-[#059669]",
                Pending: "bg-[#FEF3C7] text-[#D97706]",
            };
            return (
                <span className={`px-2.5 py-0.5 text-[12px] font-medium rounded-full inline-flex items-center gap-1.5 ${statusStyles[row.original.status]}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {row.original.status}
                </span>
            );
        },
    },
    {
        header: "",
        accessorKey: "arrow",
        cell: () => <ChevronRight className="w-4 h-4 text-[#CBD5E1] ml-auto" />,
    },
];
