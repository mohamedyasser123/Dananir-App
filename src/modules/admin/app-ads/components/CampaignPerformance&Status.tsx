import type { AppAd } from "../types/appAds.types";

interface CampaignDashboardProps {
  campaigns: AppAd[];
}

export default function CampaignDashboard({ campaigns }: CampaignDashboardProps) {
  const activeCampaigns = campaigns.filter((campaign) => campaign.status === "ACTIVE");
  const completedCount = campaigns.filter((campaign) => campaign.status === "COMPLETED").length;
  const scheduledCount = campaigns.filter((campaign) => campaign.status === "SCHEDULED").length;

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen p-6 font-sans flex flex-col lg:flex-row gap-6">

      <div className="flex-1 bg-white border border-[#EAEAEA] rounded-[16px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] flex flex-col gap-5">
        <h3 className="text-[18px] font-bold text-[#101828] mb-1">Campaign Performance</h3>

        <div className="flex flex-col gap-4">
          {activeCampaigns.map((campaign) => {
            const progressPercent = campaign.budget > 0 ? Math.min((campaign.spent / campaign.budget) * 100, 100) : 0;

            return (
              <div
                key={campaign.id}
                className="w-full p-5 bg-white border border-[#F0F0F0] rounded-[12px] flex flex-col gap-4 transition-all hover:border-slate-300"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-[16px] font-bold text-[#101828]">{campaign.name}</h4>
                  <span className="px-2.5 py-0.5 text-[11px] font-extrabold bg-[#E6F4EA] text-[#137333] rounded-[6px] tracking-wider">
                    {campaign.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 py-1">
                  <div className="flex flex-col">
                    <span className="text-[12px] text-[#99A1AF] mb-1">Impressions</span>
                    <span className="text-[18px] font-bold text-[#101828]">{campaign.impressions.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] text-[#99A1AF] mb-1">Clicks</span>
                    <span className="text-[18px] font-bold text-[#101828]">{campaign.clicks.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] text-[#99A1AF] mb-1">CTR</span>
                    <span className="text-[18px] font-bold text-[#1D4ED8]">{campaign.ctr}%</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-1">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#99A1AF] font-medium">Budget Progress</span>
                    <span className="font-bold text-[#101828]">
                      ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-[10px] bg-[#EAEAEA] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1D4ED8] rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full lg:w-[320px] bg-white border border-[#EAEAEA] rounded-[16px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] flex flex-col gap-4 shrink-0">
        <h3 className="text-[18px] font-bold text-[#101828] mb-2">Campaign Status</h3>

        <div className="flex flex-col gap-4">
          <div className="w-full p-4 bg-[#E6F4EA]/50 border border-[#E6F4EA] rounded-[12px] flex flex-col gap-1.5">
            <span className="text-[14px] font-bold text-[#137333]">Active Campaigns</span>
            <span className="text-[32px] font-extrabold text-[#137333] leading-none">{activeCampaigns.length}</span>
          </div>

          <div className="w-full p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] flex flex-col gap-1.5">
            <span className="text-[14px] font-bold text-[#64748B]">Completed</span>
            <span className="text-[32px] font-extrabold text-[#0F172A] leading-none">{completedCount}</span>
          </div>

          <div className="w-full p-4 bg-[#FEF7E0]/60 border border-[#FEF7E0] rounded-[12px] flex flex-col gap-1.5">
            <span className="text-[14px] font-bold text-[#B06000]">Scheduled</span>
            <span className="text-[32px] font-extrabold text-[#B06000] leading-none">{scheduledCount}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
