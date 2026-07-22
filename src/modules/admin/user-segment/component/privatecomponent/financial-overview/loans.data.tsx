import { ChevronRight } from "lucide-react";
import type { LoanData } from "./types";

export const loansData: LoanData[] = [
    { id: "1", bank: "National Bank of Egypt", code: "LN-44821", loanType: "Home Loan", monthlyPayment: 5200, remaining: 382500, progress: 15, status: "Active" },
    { id: "2", bank: "Commercial International Bank", code: "LN-44756", loanType: "Car Loan", monthlyPayment: 4100, remaining: 196000, progress: 30, status: "Active" },
    { id: "3", bank: "Banque Misr", code: "LN-44690", loanType: "Personal Loan", monthlyPayment: 1100, remaining: 12500, progress: 75, status: "Active" },
    { id: "4", bank: "QNB Alahli", code: "LN-44512", loanType: "Education Loan", monthlyPayment: null, remaining: 0, progress: 100, status: "Completed" },
];

export const loanColumns = [
    {
        header: "BANK",
        accessorKey: "bank",
        cell: ({ row }: { row: { original: LoanData } }) => (
            <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#101828]">{row.original.bank}</span>
                <span className="text-[12px] text-[#99A1AF]">{row.original.code}</span>
            </div>
        ),
    },
    {
        header: "LOAN TYPE",
        accessorKey: "loanType",
        cell: ({ row }: { row: { original: LoanData } }) => (
            <span className="text-[13px] text-[#64748B] font-medium">{row.original.loanType}</span>
        ),
    },
    {
        header: "MONTHLY PAYMENT",
        accessorKey: "monthlyPayment",
        cell: ({ row }: { row: { original: LoanData } }) => (
            <span className="text-[14px] font-bold text-[#101828]">
                {row.original.monthlyPayment ? `$${row.original.monthlyPayment.toLocaleString()}` : "—"}
            </span>
        ),
    },
    {
        header: "REMAINING",
        accessorKey: "remaining",
        cell: ({ row }: { row: { original: LoanData } }) => (
            <span className="text-[13px] font-medium text-[#475569]">${row.original.remaining.toLocaleString()}</span>
        ),
    },
    {
        header: "PROGRESS",
        accessorKey: "progress",
        cell: ({ row }: { row: { original: LoanData } }) => (
            <div className="flex items-center gap-3">
                <div className="w-[70px] h-[6px] bg-[#EAEAEA] rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full ${row.original.progress === 100 ? "bg-[#10B981]" : "bg-[#1D4ED8]"}`}
                        style={{ width: `${row.original.progress}%` }}
                    />
                </div>
                <span className="text-[12px] text-[#99A1AF] font-medium">{row.original.progress}%</span>
            </div>
        ),
    },
    {
        header: "STATUS",
        accessorKey: "status",
        cell: ({ row }: { row: { original: LoanData } }) => {
            const isCompleted = row.original.status === "Completed";
            return (
                <span className={`px-2.5 py-0.5 text-[12px] font-medium rounded-full inline-flex items-center gap-1.5 ${isCompleted ? "bg-[#EFF6FF] text-[#1D4ED8]" : "bg-[#E6F4EA] text-[#137333]"}`}>
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
