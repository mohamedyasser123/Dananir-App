import { Search, Eye, Edit2, Trash2, ListFilter } from "lucide-react";

const companiesData = [
  {
    id: 1,
    initials: "NV",
    name: "Nexus Ventures",
    tier: "Enterprise Tier",
    address: "882 Market St, San Francisco, CA",
    phone: "+1 (415) 555-0123",
    category: "INVESTMENT",
    avatarBg: "bg-[#2C4F93]",
    badgeStyle: "bg-[#EFF6FF] text-[#2563EB]"
  },
  {
    id: 2,
    initials: "AS",
    name: "Apex Systems",
    tier: "Global Tier",
    address: "410 Tech Plaza, Austin, TX",
    phone: "+1 (512) 442-9981",
    category: "SOFTWARE",
    avatarBg: "bg-[#475569]",
    badgeStyle: "bg-[#F5F3FF] text-[#7C3AED]"
  },
  {
    id: 3,
    initials: "CH",
    name: "Cloud Harbor",
    tier: "Startup Tier",
    address: "12 Waterfront St, Seattle, WA",
    phone: "+1 (206) 555-8822",
    category: "FINTECH",
    avatarBg: "bg-[#854D0E]",
    badgeStyle: "bg-[#FFF7ED] text-[#EA580C]"
  }
];

export default function CompanyListTable() {
  return (
    <div className="w-full !px-6 !py-4">
      <div className="w-full bg-white rounded-[24px] flex flex-col shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] overflow-hidden">
        
        <div className="w-full !p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-[22px] font-bold text-[#0D3B73] tracking-tight">
              Company List
            </h3>
            <p className="text-[14px] text-[#99A1AF] font-medium mt-0.5">
              Managing 1,284 enterprise entities
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-[260px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99A1AF]" />
              <input 
                type="text" 
                placeholder="Search companies..." 
                className="w-full h-[42px] pl-10 pr-4 bg-[#F8FAFC] text-[14px] text-[#475569] placeholder-[#99A1AF] font-medium rounded-[12px] border-0 focus:outline-none focus:ring-2 focus:ring-[#2C4F93]/20"
              />
            </div>
            <button className="w-[42px] h-[42px] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] rounded-[12px] flex items-center justify-center transition-colors border-0">
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= 2. جدول البيانات المستجيب (Responsive Table) ================= */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse">
            
            {/* رأس الجدول بلون خلفية باهت وهادئ */}
            <thead>
              <tr className="bg-[#F8FAFC]/60 border-b border-[#F1F5F9]">
                <th className="!py-4 !px-6 text-[11px] font-extrabold tracking-wider text-[#99A1AF] uppercase w-[28%]">
                  Company Name
                </th>
                <th className="!py-4 !px-6 text-[11px] font-extrabold tracking-wider text-[#99A1AF] uppercase w-[25%]">
                  Address
                </th>
                <th className="!py-4 !px-6 text-[11px] font-extrabold tracking-wider text-[#99A1AF] uppercase w-[18%]">
                  Phone Number
                </th>
                <th className="!py-4 !px-6 text-[11px] font-extrabold tracking-wider text-[#99A1AF] uppercase w-[14%]">
                  Category Type
                </th>
                <th className="!py-4 !px-6 text-[11px] font-extrabold tracking-wider text-[#99A1AF] uppercase w-[15%] text-center">
                  Actions
                </th>
              </tr>
            </thead>

            {/* محتوى الجدول المقسم بدقة */}
            <tbody className="divide-y divide-[#F1F5F9]">
              {companiesData.map((company) => (
                <tr key={company.id} className="hover:bg-[#F8FAFC]/30 transition-colors">
                  
                  {/* اسم الشركة واللوجو الصغير والدعم لـ Subtitle */}
                  <td className="!py-5 !px-6">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 ${company.avatarBg} text-white font-bold text-[15px] rounded-[14px] flex items-center justify-center shrink-0`}>
                        {company.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-bold text-[#0D3B73] leading-tight">
                          {company.name}
                        </span>
                        <span className="text-[12px] text-[#99A1AF] font-medium mt-0.5">
                          {company.tier}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* العنوان */}
                  <td className="!py-5 !px-6 text-[13px] text-[#475569] font-medium leading-normal">
                    {company.address}
                  </td>

                  {/* رقم الهاتف */}
                  <td className="!py-5 !px-6 text-[13px] text-[#475569] font-semibold tracking-wide">
                    {company.phone}
                  </td>

                  {/* الـ Badge الملون المخصص للفئة */}
                  <td className="!py-5 !px-6">
                    <span className={`inline-block text-[11px] font-extrabold tracking-wide px-3 py-1 rounded-full ${company.badgeStyle}`}>
                      {company.category}
                    </span>
                  </td>

                  {/* أزرار الـ Actions الملونة (رؤية، تعديل، مسح) */}
                  <td className="!py-5 !px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="w-[34px] h-[34px] bg-[#2C4F93] hover:bg-[#1E4385] text-white rounded-[8px] flex items-center justify-center transition-colors shadow-sm">
                        <Eye className="w-4 h-4 stroke-[2.2]" />
                      </button>
                      <button className="w-[34px] h-[34px] bg-[#2C4F93] hover:bg-[#1E4385] text-white rounded-[8px] flex items-center justify-center transition-colors shadow-sm">
                        <Edit2 className="w-4 h-4 stroke-[2.2]" />
                      </button>
                      <button className="w-[34px] h-[34px] bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-[8px] flex items-center justify-center transition-colors shadow-sm">
                        <Trash2 className="w-4 h-4 stroke-[2.2]" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= 3. شريط الترقيم السفلي (Pagination) ================= */}
        <div className="w-full !p-6 bg-[#F8FAFC]/40 border-t border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-[13px] text-[#99A1AF] font-semibold">
            Showing 1 to 3 of 1,284 entries
          </span>

          <div className="flex items-center gap-2">
            <button className="h-[38px] px-4 text-[13px] font-bold text-[#475569] hover:bg-[#F1F5F9] rounded-[10px] border border-[#E2E8F0] transition-colors">
              Previous
            </button>
            
            <button className="w-[38px] h-[38px] text-[13px] font-bold bg-[#0D3B73] text-white rounded-[10px] flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="w-[38px] h-[38px] text-[13px] font-bold text-[#475569] hover:bg-[#F1F5F9] rounded-[10px] border border-[#E2E8F0] transition-colors flex items-center justify-center">
              2
            </button>
            <button className="w-[38px] h-[38px] text-[13px] font-bold text-[#475569] hover:bg-[#F1F5F9] rounded-[10px] border border-[#E2E8F0] transition-colors flex items-center justify-center">
              3
            </button>

            <button className="h-[38px] px-4 text-[13px] font-bold text-[#475569] hover:bg-[#F1F5F9] rounded-[10px] border border-[#E2E8F0] transition-colors">
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}