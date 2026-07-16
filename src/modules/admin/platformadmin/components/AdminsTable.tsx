import { Edit2, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AdminRole, AdminStatus, AdminUser } from "../types/admin.types";

// الـ Props الخاصة بالجدول لإمكانية التحكم به من الخارج
interface AdminsTableProps {
  data: AdminUser[];
  onEdit: (user: AdminUser) => void;
  onDelete: (id: string) => void;
}

export default function AdminsTable({ data, onEdit, onDelete }: AdminsTableProps) {
  
  // فانكشن لتلوين الـ Role Badge بناءً على الديزاين بالملي
  const getRoleBadgeStyles = (role: AdminRole) => {
    switch (role) {
      case "Super Admin":
        return "bg-[#E0E7FF] text-[#2563EB] hover:bg-[#E0E7FF]/80"; // أزرق
      case "Admin":
        return "bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7]/80"; // أخضر
      case "Manager":
        return "bg-[#F1F5F9] text-[#475569] hover:bg-[#F1F5F9]/80"; // رمادي
      case "Support":
        return "bg-[#F8FAFC] text-[#64748B] hover:bg-[#F8FAFC]/80 border border-[#E2E8F0]"; // رمادي فاتح بحدود
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  // فانكشن لتلوين الـ Status Badge (Active / Inactive)
  const getStatusBadgeStyles = (status: AdminStatus) => {
    if (status === "ACTIVE") {
      return "bg-[#DCFCE7] text-[#15803D] font-bold text-[11px] tracking-wide px-2.5 py-0.5 rounded-[6px]";
    }
    return "bg-[#FEE2E2] text-[#B91C1C] font-bold text-[11px] tracking-wide px-2.5 py-0.5 rounded-[6px]";
  };

  return (
    <div className="w-full bg-white rounded-[15px] border border-[#EAEAEA] overflow-hidden">
      <Table>
        <TableHeader className="bg-[#FCFCFD]">
          <TableRow className="border-b border-[#EAEAEA] hover:bg-transparent">
            <TableHead className="text-[#667085] font-semibold text-[13px] h-12 px-6">
              NAME
            </TableHead>
            <TableHead className="text-[#667085] font-semibold text-[13px] h-12">
              EMAIL
            </TableHead>
            <TableHead className="text-[#667085] font-semibold text-[13px] h-12 text-center sm:text-left">
              ROLE
            </TableHead>
            <TableHead className="text-[#667085] font-semibold text-[13px] h-12 text-center sm:text-left">
              STATUS
            </TableHead>
            <TableHead className="text-[#667085] font-semibold text-[13px] h-12 text-right px-8">
              ACTIONS
            </TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-slate-500 font-medium">
                No results found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((user) => (
              <TableRow 
                key={user.id} 
                className="border-b border-[#F3F4F6] hover:bg-slate-50/50 last:border-b-0 transition-colors"
              >
                <TableCell className="font-semibold text-[#101828] text-[14px] py-4 px-6">
                  {user.name}
                </TableCell>
                
                <TableCell className="text-[#475569] text-[14px] py-4">
                  {user.email}
                </TableCell>
                
                <TableCell className="py-4">
                  <div className="flex justify-center sm:justify-start">
                    <Badge className={`rounded-[8px] px-2.5 py-0.5 text-[12px] font-semibold shadow-none border-0 capitalize ${getRoleBadgeStyles(user.role)}`}>
                      {user.role}
                    </Badge>
                  </div>
                </TableCell>
                
                <TableCell className="py-4">
                  <div className="flex justify-center sm:justify-start">
                    <span className={getStatusBadgeStyles(user.status)}>
                      {user.status}
                    </span>
                  </div>
                </TableCell>
                
                {/* الـ Actions */}
                <TableCell className="py-4 text-right px-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(user)}
                      className="h-8 w-8 text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded-md transition-colors"
                    >
                      <Edit2 className="h-[15px] w-[15px]" />
                    </Button>
                    
                    {/* زرار الحذف */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(user.id)}
                      className="h-8 w-8 text-[#EF4444] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded-md transition-colors"
                    >
                      <Trash2 className="h-[15px] w-[15px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}