import { ChevronRight } from "lucide-react";
import type { PurchaseData } from "./types";

export const purchasesData: PurchaseData[] = [
    {
        id: "1",
        storeName: "Apple Store – City Stars",
        txnId: "TXN-90281",
        amount: 2499,
        paymentMethod: "Card",
        date: "Mar 22, 2026",
        status: "Completed",
        taxAmount: 62.48,
        fees: "None",
        items: [
            { name: "MacBook Pro 16\"", qty: 1, price: 2399 },
            { name: "AppleCare+", qty: 1, price: 100 },
        ],
    },
    { id: "2", storeName: "IKEA – Cairo Festival City", txnId: "TXN-90276", amount: 1284, paymentMethod: "Installment", date: "Mar 18, 2026", status: "Pending" },
    { id: "3", storeName: "Amazon.eg", txnId: "TXN-90265", amount: 549, paymentMethod: "Card", date: "Mar 14, 2026", status: "Completed" },
    { id: "4", storeName: "Carrefour – Mall of Egypt", txnId: "TXN-90251", amount: 312, paymentMethod: "Cash", date: "Mar 08, 2026", status: "Completed" },
    { id: "5", storeName: "Vodafone Egypt", txnId: "TXN-90244", amount: 199, paymentMethod: "Card", date: "Mar 05, 2026", status: "Completed" },
    { id: "6", storeName: "Virgin Megastore", txnId: "TXN-90230", amount: 129, paymentMethod: "Cash", date: "Feb 28, 2026", status: "Failed" },
    { id: "7", storeName: "Noon.com", txnId: "TXN-90218", amount: 389, paymentMethod: "Card", date: "Feb 22, 2026", status: "Completed" },
    { id: "8", storeName: "Spinney's – Zamalek", txnId: "TXN-90201", amount: 478, paymentMethod: "Card", date: "Feb 15, 2026", status: "Completed" },
];

export const purchaseColumns = [
    {
        header: "STORE NAME",
        accessorKey: "storeName",
        cell: ({ row }: { row: { original: PurchaseData } }) => (
            <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#101828]">{row.original.storeName}</span>
                <span className="text-[12px] text-[#99A1AF]">{row.original.txnId}</span>
            </div>
        ),
    },
    {
        header: "AMOUNT",
        accessorKey: "amount",
        cell: ({ row }: { row: { original: PurchaseData } }) => (
            <span className="text-[14px] font-bold text-[#101828]">${row.original.amount.toLocaleString()}</span>
        ),
    },
    {
        header: "PAYMENT METHOD",
        accessorKey: "paymentMethod",
        cell: ({ row }: { row: { original: PurchaseData } }) => {
            const methodStyles = {
                Card: "bg-[#EFF6FF] text-[#1D4ED8]",
                Installment: "bg-[#F3E8FF] text-[#7E22CE]",
                Cash: "bg-[#F1F5F9] text-[#475569]",
            };
            return (
                <span className={`px-2.5 py-0.5 text-[12px] font-medium rounded-full inline-flex items-center gap-1.5 ${methodStyles[row.original.paymentMethod]}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {row.original.paymentMethod}
                </span>
            );
        },
    },
    {
        header: "DATE",
        accessorKey: "date",
        cell: ({ row }: { row: { original: PurchaseData } }) => (
            <span className="text-[13px] text-[#64748B]">{row.original.date}</span>
        ),
    },
    {
        header: "STATUS",
        accessorKey: "status",
        cell: ({ row }: { row: { original: PurchaseData } }) => {
            const statusStyles = {
                Completed: "bg-[#EFF6FF] text-[#1D4ED8]",
                Pending: "bg-[#FEF3C7] text-[#D97706]",
                Failed: "bg-[#FEE2E2] text-[#DC2626]",
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
