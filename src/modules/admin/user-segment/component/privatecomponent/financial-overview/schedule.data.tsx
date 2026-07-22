import type { PaymentSchedule } from "./types";

export const scheduleData: PaymentSchedule[] = [
  { id: "1", bank: "National Bank of Egypt", loanType: "Home Loan", code: "LN-44821", installmentDate: "Apr 01, 2026", amount: 5200, status: "Upcoming" },
  { id: "2", bank: "National Bank of Egypt", loanType: "Home Loan", code: "LN-44821", installmentDate: "Mar 01, 2026", amount: 5200, status: "Paid" },
  { id: "3", bank: "National Bank of Egypt", loanType: "Home Loan", code: "LN-44821", installmentDate: "Feb 01, 2026", amount: 5200, status: "Paid" },
  { id: "4", bank: "National Bank of Egypt", loanType: "Home Loan", code: "LN-44821", installmentDate: "Jan 01, 2026", amount: 5200, status: "Paid" },
  { id: "5", bank: "National Bank of Egypt", loanType: "Home Loan", code: "LN-44821", installmentDate: "Dec 01, 2025", amount: 5200, status: "Paid" },
  { id: "6", bank: "National Bank of Egypt", loanType: "Home Loan", code: "LN-44821", installmentDate: "Nov 01, 2025", amount: 5200, status: "Paid" },
  { id: "7", bank: "Commercial International Bank", loanType: "Car Loan", code: "LN-44756", installmentDate: "Apr 01, 2026", amount: 4100, status: "Upcoming" },
  { id: "8", bank: "Commercial International Bank", loanType: "Car Loan", code: "LN-44756", installmentDate: "Mar 01, 2026", amount: 4100, status: "Paid" },
  { id: "9", bank: "Commercial International Bank", loanType: "Car Loan", code: "LN-44756", installmentDate: "Feb 01, 2026", amount: 4100, status: "Paid" },
];

export const scheduleColumns = [
  {
    header: "LOAN",
    accessorKey: "bank",
    cell: ({ row }: { row: { original: PaymentSchedule } }) => (
      <div className="flex flex-col">
        <span className="text-[14px] font-bold text-[#101828]">{row.original.bank}</span>
        <span className="text-[12px] text-[#99A1AF]">{row.original.loanType} · {row.original.code}</span>
      </div>
    ),
  },
  {
    header: "INSTALLMENT DATE",
    accessorKey: "installmentDate",
    cell: ({ row }: { row: { original: PaymentSchedule } }) => (
      <span className="text-[13px] text-[#64748B] font-medium">{row.original.installmentDate}</span>
    ),
  },
  {
    header: "AMOUNT",
    accessorKey: "amount",
    cell: ({ row }: { row: { original: PaymentSchedule } }) => (
      <span className="text-[14px] font-bold text-[#101828]">${row.original.amount.toLocaleString()}</span>
    ),
  },
  {
    header: "STATUS",
    accessorKey: "status",
    cell: ({ row }: { row: { original: PaymentSchedule } }) => {
      const isUpcoming = row.original.status === "Upcoming";
      return (
        <span
          className={`px-2.5 py-0.5 text-[12px] font-medium rounded-full inline-flex items-center gap-1.5 ${
            isUpcoming ? "bg-[#EFF6FF] text-[#1D4ED8]" : "bg-[#E6F4EA] text-[#137333]"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {row.original.status}
        </span>
      );
    },
  },
];
