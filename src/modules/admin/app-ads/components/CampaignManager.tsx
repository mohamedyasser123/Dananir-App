import { Megaphone } from "lucide-react";
import SharedTable from "@/components/shared/SharedTable";
import type { AppAd } from "../types/appAds.types";

interface CampaignManagerProps {
  data: AppAd[];
  onEdit: (campaign: AppAd) => void;
  onDelete: (campaign: AppAd) => void;
}

export default function CampaignManager({ data, onEdit, onDelete }: CampaignManagerProps) {
  const campaignColumns = [
    {
      header: "Campaign Name",
      accessorKey: "name", // التعديل هنا: اسم الكي المطلوب لـ TanStack Table
      cell: ({ row }: { row: { original: AppAd } }) => {
        const campaign = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="w-[36px] h-[36px] rounded-[10px] bg-[#FF6B00] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Megaphone className="w-4 h-4 fill-white/10 stroke-[2]" />
            </div>
            <span className="text-[14px] font-bold text-[#101828] truncate">{campaign.name}</span>
          </div>
        );
      },
    },
    {
      header: "Budget",
      accessorKey: "budget",
      cell: ({ row }: { row: { original: AppAd } }) => (
        <span className="text-[14px] font-bold text-[#101828]">
          ${row.original.budget.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Spent",
      accessorKey: "spent",
      cell: ({ row }: { row: { original: AppAd } }) => {
        const campaign = row.original;
        const progressPercent = campaign.budget > 0 ? Math.min((campaign.spent / campaign.budget) * 100, 100) : 0;
        return (
          <div className="flex flex-col gap-1.5 justify-center">
            <span className="text-[14px] font-bold text-[#101828]">${campaign.spent.toLocaleString()}</span>
            <div className="w-[80px] h-[6px] bg-[#EAEAEA] rounded-full overflow-hidden">
              <div className="h-full bg-[#1D4ED8] rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        );
      },
    },
    {
      header: "Impressions",
      accessorKey: "impressions",
      cell: ({ row }: { row: { original: AppAd } }) => (
        <span className="text-[14px] text-[#475569] font-medium">{row.original.impressions.toLocaleString()}</span>
      ),
    },
    {
      header: "Clicks",
      accessorKey: "clicks",
      cell: ({ row }: { row: { original: AppAd } }) => (
        <span className="text-[14px] text-[#101828] font-bold">{row.original.clicks.toLocaleString()}</span>
      ),
    },
    {
      header: "CTR",
      accessorKey: "ctr",
      cell: ({ row }: { row: { original: AppAd } }) => (
        <span className="px-2.5 py-0.5 text-[12px] font-bold bg-[#EFF6FF] text-[#1D4ED8] rounded-full inline-block">
          {row.original.ctr}%
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: { original: AppAd } }) => {
        const badgeStyles = {
          ACTIVE: "bg-[#E6F4EA] text-[#137333]",
          COMPLETED: "bg-[#F1F5F9] text-[#475569]",
          SCHEDULED: "bg-[#FEF7E0] text-[#B06000]",
        };
        return (
          <span className={`px-2.5 py-0.5 text-[11px] font-extrabold rounded-[6px] tracking-wide uppercase ${badgeStyles[row.original.status]}`}>
            {row.original.status}
          </span>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
    },
  ];

  return (
    <div className="w-full bg-white border border-[#EAEAEA] rounded-[16px] overflow-hidden p-4">

      <SharedTable
        showFilters={false}
        data={data}
        columns={campaignColumns}
        actionVariant="ghost"
        onEdit={onEdit}
        onDelete={onDelete}
      />

    </div>
  );
}
