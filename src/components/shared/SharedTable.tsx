import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit2, 
  Trash2, 
  Eye, 
  Phone, 
  Mail, 
  MessageSquare, 
  Bell, 
  Search, 
  ChevronDown 
} from "lucide-react";

interface FilterSelectProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options?: { label: string; value: string }[];
}

function FilterSelect({ placeholder, value, onChange, options = [] }: FilterSelectProps) {
  return (
    <div className="relative w-full sm:w-[160px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[42px] pl-4 pr-10 text-[14px] font-medium text-[#475569] bg-white border border-[#EAEAEA] rounded-[10px] appearance-none focus:outline-none focus:border-[#2C4F93] cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#99A1AF]">
        <ChevronDown className="w-4 h-4" />
      </span>
    </div>
  );
}

export interface TableColumn {
  header: string | React.ReactNode;
  accessorKey: string;
}

interface SharedTableProps {
  data: any[];
  columns: TableColumn[];
  onEdit?: (row: any) => void;
  onDelete?: (id: any) => void;
  onView?: (row: any) => void;
  actionVariant?: "solid" | "ghost";
  
  showFilters?: boolean;
  categoryOptions?: { label: string; value: string }[];
  cityOptions?: { label: string; value: string }[];
  statusOptions?: { label: string; value: string }[];
  onFilterSubmit?: (filters: { search: string; category: string; city: string; status: string }) => void;

  totalEntries?: number;
  currentEntriesStart?: number;
  currentEntriesEnd?: number;
}

export default function SharedTable({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  actionVariant = "solid",
  showFilters = true,
  categoryOptions = [],
  cityOptions = [],
  statusOptions = [],
  onFilterSubmit,
  totalEntries = 9,
  currentEntriesStart = 1,
  currentEntriesEnd = 9,
}: SharedTableProps) {
  // الحالات الداخلية للبحث والفلاتر جوه التيبل
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  const handleFilterClick = () => {
    if (onFilterSubmit) {
      onFilterSubmit({ search, category, city, status });
    }
  };

  return (
    <div className="w-full flex flex-col bg-transparent">
      
      {showFilters && (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full pb-5 bg-transparent mt-5">
          <div className="flex flex-wrap items-center gap-4 flex-1">
            <FilterSelect 
              placeholder="Category" 
              value={category} 
              onChange={setCategory} 
              options={categoryOptions} 
            />
            <FilterSelect 
              placeholder="City" 
              value={city} 
              onChange={setCity} 
              options={cityOptions} 
            />
            <FilterSelect 
              placeholder="Status" 
              value={status} 
              onChange={setStatus} 
              options={statusOptions} 
            />

            <div className="relative w-full sm:w-[220px] sm:ml-auto">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#99A1AF]" />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full h-[42px] pl-10 pr-4 text-[14px] text-[#12121280]/50 placeholder-[#99A1AF] bg-white border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:border-[#2C4F93] transition-colors"
              />
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <button
              onClick={handleFilterClick}
              className="w-full lg:w-[120px] h-[42px] bg-[#2C4F93] hover:bg-[#1E3A75] text-white text-[14px] font-semibold rounded-[10px] shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center"
            >
              Filter
            </button>
          </div>
        </div>
      )}

      <div className="w-full bg-white rounded-t-[16px] border border-[#EAEAEA] border-b-0 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FCFCFD]">
            <TableRow className="border-b border-[#EAEAEA] hover:bg-transparent">
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className="text-[#667085] font-semibold text-[12px] h-12 px-6 uppercase tracking-wider"
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                className="border-b border-[#F3F4F6] hover:bg-slate-50/40 last:border-b-0 transition-colors"
              >
                {columns.map((col, idx) => {
                  const value = row[col.accessorKey];

                  if (col.accessorKey === "companyName" || col.accessorKey === "user") {
                    return (
                      <TableCell key={idx} className="py-5 px-6 font-semibold text-[#2C4F93] text-[14px]">
                        {value}
                      </TableCell>
                    );
                  }

                  if (["category", "city", "phoneNumber", "email"].includes(col.accessorKey)) {
                    return (
                      <TableCell key={idx} className="py-5 px-6 text-[14px] text-[#475569]">
                        {value}
                      </TableCell>
                    );
                  }

                  if (col.accessorKey === "contact") {
                    return (
                      <TableCell key={idx} className="py-5 px-6">
                        <div className="flex flex-col gap-1 text-[13px] text-[#475569]">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{value.phone}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{value.email}</span>
                          </div>
                        </div>
                      </TableCell>
                    );
                  }

                  if (col.accessorKey === "status" && typeof value === "string" && value === "Active") {
                    return (
                      <TableCell key={idx} className="py-5 px-6">
                        <Badge className="bg-[#E6F4EA] hover:bg-[#E6F4EA] text-[#137333] rounded-full px-3 py-1 text-[13px] font-semibold border-0 shadow-none">
                          {value}
                        </Badge>
                      </TableCell>
                    );
                  }

                  if (col.accessorKey === "actions") {
                    const isGhost = actionVariant === "ghost";

                    return (
                      <TableCell key={idx} className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          {onView && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onView(row)}
                              className={`h-8 w-8 rounded-md transition-colors cursor-pointer ${
                                isGhost
                                  ? "bg-transparent text-[#2C4F93] hover:bg-[#2C4F93]/10"
                                  : "bg-[#2C4F93] hover:bg-[#1E3A75] text-white"
                              }`}
                            >
                              <Eye className="h-[14px] w-[14px]" />
                            </Button>
                          )}
                          {onEdit && (
                            <Button
                              variant="ghost"
                              className={`h-8 px-3 rounded-md font-medium text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer ${
                                isGhost
                                  ? "bg-transparent text-[#2C4F93] hover:bg-[#2C4F93]/10"
                                  : "bg-[#2C4F93] hover:bg-[#1E3A75] text-white"
                              }`}
                              onClick={() => onEdit(row)}
                            >
                              <Edit2 className="h-3.5 h-3.5" />
                              <span>Edit</span>
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              variant="ghost"
                              className={`h-8 px-3 rounded-md font-medium text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer ${
                                isGhost
                                  ? "bg-transparent text-[#EF4444] hover:bg-[#EF4444]/10"
                                  : "bg-[#EF4444] hover:bg-[#DC2626] text-white"
                              }`}
                              onClick={() => onDelete(row.id)}
                            >
                              <Trash2 className="h-3.5 h-3.5" />
                              <span>Delete</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={idx} className="py-5 px-6 text-[14px] text-slate-700">
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 3. سكشن الباجينشن المقفل بكيرف سفلي */}
      <div className="w-full bg-[#FCFCFD] border border-[#EAEAEA] rounded-b-[16px] px-6 py-4 flex items-center justify-between text-[13px] text-[#667085]">
        <div>
          Showing <span className="font-bold text-slate-800">{currentEntriesStart}</span> to{" "}
          <span className="font-bold text-slate-800">{currentEntriesEnd}</span> of{" "}
          <span className="font-bold text-slate-800">{totalEntries}</span> entries
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 font-semibold text-slate-400 cursor-not-allowed hover:bg-transparent">
            Previous
          </button>
          <button className="w-8 h-8 rounded-[8px] bg-[#2C4F93] text-white font-semibold flex items-center justify-center shadow-sm">
            1
          </button>
          <button className="px-3 py-1.5 font-bold text-[#2C4F93] hover:text-[#1E3A75] transition-colors cursor-pointer">
            Next
          </button>
        </div>
      </div>

    </div>
  );
}