import { Link } from "react-router-dom"
import { ArrowLeft, Building2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { UseCompanyResult } from "../../hooks/company/useCompany"
import { COMPANY_VISIBILITY_USERS } from "../../constants/company.form"
import CompanyDetailsSkeleton from "./CompanyDetailsSkeleton"
import CompanyDetailsError from "./CompanyDetailsError"
import CompanyDetailsEmpty from "./CompanyDetailsEmpty"

const ACTIVITY_TREND = [
  { month: "Jan", value: 46 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 61 },
  { month: "May", value: 55 },
  { month: "Jun", value: 68 },
]

const ASSIGNED_USER_ROLES = ["Owner", "Manager", "Editor", "Viewer", "Viewer"]

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#99A1AF]">{label}</span>
      <span className="text-[14px] font-semibold text-[#101828]">{value}</span>
    </div>
  )
}

export default function CompanyDetailsContent({ data, isLoading, isError, error, refetch }: UseCompanyResult) {
  if (isLoading) return <CompanyDetailsSkeleton />
  if (isError) return <CompanyDetailsError message={error?.message} onRetry={refetch} />
  if (!data) return <CompanyDetailsEmpty />

  return (
    <div className="w-full space-y-6 !px-6 !py-4">
      <Link
        to="/admin/user-segment/company"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#667085] hover:text-[#101828] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Companies
      </Link>

      <div>
        <h1 className="text-[24px] font-bold text-[#101828] tracking-tight">{data.companyName}</h1>
        <p className="text-[13px] text-[#99A1AF] mt-0.5">Company ID: {data.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-6 items-start">
        <div className="w-full bg-white border border-[#EAEAEA] rounded-[16px] p-4 shadow-sm">
          <div className="w-full aspect-square rounded-[12px] bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
            <Building2 className="h-12 w-12 text-[#99A1AF]" />
          </div>
        </div>

        <div className="w-full bg-white border border-[#EAEAEA] rounded-[16px] p-6 shadow-sm">
          <h2 className="text-[16px] font-bold text-[#101828] mb-5">Company Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <InfoField label="Industry Branch" value={data.industryBranch ?? "—"} />
            <InfoField label="Phone Number" value={data.phoneNumber ?? "—"} />
            <InfoField label="Manager Name" value={data.managerName ?? "—"} />
            <InfoField label="Trade Number" value={data.tradeNumber ?? "—"} />
            <InfoField label="Email" value={data.email} />
            <InfoField label="Website" value={data.website ?? "—"} />
          </div>

          <div className="mt-5 pt-5 border-t border-[#F3F4F6] flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#99A1AF]">Status</span>
            <div>
              <Badge
                className={
                  data.status === "Active"
                    ? "bg-[#DCFCE7] text-[#15803D] border-0 rounded-[6px] px-2.5 py-1 font-bold"
                    : "bg-[#FEE2E2] text-[#B91C1C] border-0 rounded-[6px] px-2.5 py-1 font-bold"
                }
              >
                {data.status}
              </Badge>
            </div>
          </div>

          {data.address && (
            <div className="mt-5 pt-5 border-t border-[#F3F4F6] flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#99A1AF]">Address</span>
              <p className="text-[14px] text-[#475569]">{data.address}</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-white border border-[#EAEAEA] rounded-[16px] p-6 shadow-sm">
        <h2 className="text-[16px] font-bold text-[#101828] mb-5">Company Activity</h2>
        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ACTIVITY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
              <XAxis
                dataKey="month"
                axisLine={{ stroke: "#99A1AF", strokeWidth: 1 }}
                tickLine={false}
                tick={{ fill: "#667085", fontSize: 13, fontWeight: 500 }}
                dy={10}
              />
              <YAxis
                domain={[0, 80]}
                ticks={[0, 20, 40, 60, 80]}
                axisLine={{ stroke: "#99A1AF", strokeWidth: 1 }}
                tickLine={false}
                tick={{ fill: "#667085", fontSize: 13 }}
                dx={-5}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2C4F93"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#2C4F93", strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full bg-white border border-[#EAEAEA] rounded-[16px] overflow-hidden shadow-sm">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-[16px] font-bold text-[#101828]">Assigned Users</h2>
        </div>

        <Table>
          <TableHeader className="bg-[#FCFCFD]">
            <TableRow className="border-b border-[#EAEAEA] hover:bg-transparent">
              <TableHead className="text-[#667085] font-semibold text-[12px] h-12 px-6 uppercase tracking-wider">
                User ID
              </TableHead>
              <TableHead className="text-[#667085] font-semibold text-[12px] h-12 uppercase tracking-wider">
                Name
              </TableHead>
              <TableHead className="text-[#667085] font-semibold text-[12px] h-12 uppercase tracking-wider">
                Role
              </TableHead>
              <TableHead className="text-[#667085] font-semibold text-[12px] h-12 px-6 uppercase tracking-wider">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {COMPANY_VISIBILITY_USERS.map((user, index) => (
              <TableRow key={user.id} className="border-b border-[#F3F4F6] last:border-b-0">
                <TableCell className="py-4 px-6 font-semibold text-[#2C4F93] text-[14px]">#{user.id}</TableCell>
                <TableCell className="py-4 text-[14px] text-[#475569]">{user.name}</TableCell>
                <TableCell className="py-4 text-[14px] text-[#475569]">{ASSIGNED_USER_ROLES[index] ?? "Viewer"}</TableCell>
                <TableCell className="py-4 px-6">
                  <Badge className="bg-[#DCFCE7] text-[#15803D] border-0 rounded-[6px] px-2.5 py-1 font-bold">
                    Active
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
