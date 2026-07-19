
interface CampaignCardProps {
  title: string;
  count: number;
  description: string;
  priceRange: string;
}

function CampaignTypeCard({ title, count, description, priceRange }: CampaignCardProps) {
  return (
    <div className="flex-1 min-w-[240px] bg-white border border-[#EAEAEA] rounded-[16px] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[160px] transition-all hover:shadow-md">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <h4 className="text-[16px] font-bold text-[#0F172A] truncate">
            {title}
          </h4>
          <span className="h-[22px] px-2 bg-[#F1F5F9] text-[#64748B] text-[12px] font-bold rounded-[6px] flex items-center justify-center shrink-0">
            {count}
          </span>
        </div>
        
        <p className="text-[13px] text-[#64748B] leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>
      </div>

      <span className="text-[15px] font-bold text-[#1E3A8A] block">
        {priceRange}
      </span>
    </div>
  );
}

export default function CampaignTypesSection() {
  const campaignsData: CampaignCardProps[] = [
    {
      title: "Banner Ads",
      count: 12,
      description: "Display banners on home and category pages",
      priceRange: "$500 - $2,000",
    },
    {
      title: "Suggestion ads",
      count: 18,
      description: "Highlight products in special sections",
      priceRange: "$300 - $1,500",
    },
    {
      title: "Top list ads",
      count: 8,
      description: "Premium placement on homepage",
      priceRange: "$1,000 - $5,000",
    },
    {
      title: "Notifications",
      count: 15,
      description: "Featured position in category listings",
      priceRange: "$400 - $1,200",
    },
  ];

  return (
    <div className="w-full bg-[#FAFAFA] py-6 flex flex-col gap-5 font-sans">
      <h3 className="text-[18px] font-bold text-[#0F172A] px-1">
        App and website Campange
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {campaignsData.map((campaign, index) => (
          <CampaignTypeCard
            key={index}
            title={campaign.title}
            count={campaign.count}
            description={campaign.description}
            priceRange={campaign.priceRange}
          />
        ))}
      </div>
    </div>
  );
}