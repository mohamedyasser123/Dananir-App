import { DollarSign, Eye, TrendingUp } from "lucide-react";
import type { AppAd } from "../types/appAds.types";

interface CampaignStatsSectionProps {
  campaigns: AppAd[];
}

export default function CampaignStatsSection({ campaigns }: CampaignStatsSectionProps) {
  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const spentPercent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div className="w-full bg-[#FAFAFA] py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white border border-[#EAEAEA] rounded-[16px] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex items-start justify-between min-h-[140px]">
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-semibold text-[#667085]">Total Budget</span>
            <span className="text-[32px] font-bold text-[#101828] tracking-tight">${totalBudget.toLocaleString()}</span>
          </div>
          <div className="w-[46px] h-[46px] rounded-[12px] bg-[#2F6BF6] flex items-center justify-center text-white shrink-0 shadow-sm">
            <DollarSign className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        <div className="bg-white border border-[#EAEAEA] rounded-[16px] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex items-start justify-between min-h-[140px]">
          <div className="flex flex-col gap-1.5">
            <span className="text-[14px] font-semibold text-[#667085]">Total Spent</span>
            <span className="text-[32px] font-bold text-[#101828] tracking-tight">${totalSpent.toLocaleString()}</span>
            <span className="text-[12px] text-[#667085] mt-1">
              <span className="font-bold text-[#2F6BF6]">{spentPercent.toFixed(1)}%</span> of budget
            </span>
          </div>
          <div className="w-[46px] h-[46px] rounded-[12px] bg-[#2F6BF6] flex items-center justify-center text-white shrink-0 shadow-sm">
            <DollarSign className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        <div className="bg-white border border-[#EAEAEA] rounded-[16px] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex items-start justify-between min-h-[140px]">
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-semibold text-[#667085]">Total Impressions</span>
            <span className="text-[32px] font-bold text-[#101828] tracking-tight">{totalImpressions.toLocaleString()}</span>
          </div>
          <div className="w-[46px] h-[46px] rounded-[12px] bg-[#2F6BF6] flex items-center justify-center text-white shrink-0 shadow-sm">
            <Eye className="w-5 h-5 stroke-[2]" />
          </div>
        </div>

        <div className="bg-white border border-[#EAEAEA] rounded-[16px] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex items-start justify-between min-h-[140px]">
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-semibold text-[#667085]">Total Clicks</span>
            <span className="text-[32px] font-bold text-[#101828] tracking-tight">{totalClicks.toLocaleString()}</span>
          </div>
          <div className="w-[46px] h-[46px] rounded-[12px] bg-[#2F6BF6] flex items-center justify-center text-white shrink-0 shadow-sm">
            <TrendingUp className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

      </div>
    </div>
  );
}