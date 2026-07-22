export interface PurchaseItem {
  name: string;
  qty: number;
  price: number;
}

export interface PurchaseData {
  id: string;
  storeName: string;
  txnId: string;
  amount: number;
  paymentMethod: "Card" | "Installment" | "Cash";
  date: string;
  status: "Completed" | "Pending" | "Failed";
  taxAmount?: number;
  fees?: string;
  items?: PurchaseItem[];
}

export interface LoanData {
  id: string;
  bank: string;
  code: string;
  loanType: string;
  monthlyPayment: number | null;
  remaining: number;
  progress: number;
  status: "Active" | "Completed";
}

export interface DebtData {
  id: string;
  person: string;
  code?: string;
  note: string;
  type: "Debit" | "Credit";
  date: string;
  total: number;
  paid: number;
  remaining: number;
  status: "Partially Paid" | "Paid" | "Pending";
  avatarColor: string;
}

export interface DetailedLoan {
  id: string;
  bank: string;
  type: string;
  code: string;
  branch: string;
  status: "Active" | "Completed";
  totalAmount: number;
  remaining: number;
  monthly: number | null;
  interestRate: string;
  duration: string;
  loanOfficer: string;
  paidAmount: number;
  percentagePaid: number;
  startDate: string;
  endDate: string;
}

export interface PaymentSchedule {
  id: string;
  bank: string;
  loanType: string;
  code: string;
  installmentDate: string;
  amount: number;
  status: "Upcoming" | "Paid" | "Late";
}
