import { Shield, SquarePen, Users } from "lucide-react";

const rolesData = [
  {
    id: 1,
    title: "Super Admin",
    userCount: "1 user",
    headerBg: "bg-[linear-gradient(to_right,#AD46FF,#8200DB)]",
    isAllPermissions: true,
    permissions: ["All Permissions"],
  },
  {
    id: 2,
    title: "Admin",
    userCount: "3 users",
    headerBg:"bg-[linear-gradient(to_right,#2B7FFF,#1447E6)]",
    isAllPermissions: false,
    permissions: ["users.read", "users.write", "companies.read", "+3 more"],
  },
  {
    id: 3,
    title: "Manager",
    userCount: "2 users",
    headerBg: "bg-[linear-gradient(to_right,#00C950,#008236)]",
    isAllPermissions: false,
    permissions: ["users.read", "orders.read", "orders.write", "+1 more"],
  },
  {
    id: 4,
    title: "Support",
    userCount: "2 users",
    headerBg: "bg-[linear-gradient(to_right,#FF6900,#CA3500)]",
    isAllPermissions: false,
    permissions: ["users.read", "tickets.read", "tickets.write"],
  },
];

export default function RoleCards() {
  return (
    <div className="w-full !px-2 !py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {rolesData.map((role) => (
          <div
            key={role.id}
className="w-full bg-white rounded-[14px] flex flex-col shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_0_rgba(0,0,0,0.1)] border border-[#F3F4F6] overflow-hidden"          >
            <div className={`${role.headerBg} !p-6 flex flex-col text-white h-[140px] justify-between relative`}>
              <div className="flex items-center justify-between w-full">
                <Shield className="w-6 h-6 opacity-90 stroke-[2]" />
                <button className="hover:bg-white/15 !p-1.5 rounded-lg transition-colors">
                  <SquarePen className="w-4 h-4 opacity-90" />
                </button>
              </div>
              
              <h3 className="text-[22px] font-bold tracking-tight">
                {role.title}
              </h3>
            </div>

            <div className="!p-6 flex flex-col gap-4 flex-1 bg-white">
              {/* عدد المستخدمين */}
              <div className="flex items-center gap-2 text-[#99A1AF] text-[13px] font-semibold">
                <Users className="w-4 h-4" />
                <span>{role.userCount}</span>
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="text-[11px] font-extrabold tracking-wider text-[#99A1AF] uppercase">
                  Permissions
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {role.isAllPermissions ? (
                    <span className="text-[12px] font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full">
                      {role.permissions[0]}
                    </span>
                  ) : (
                    role.permissions.map((perm, idx) => (
                      <span
                        key={idx}
                        className={`text-[12px] font-semibold px-2.5 py-1 rounded-[6px] ${
                          perm.startsWith("+")
                            ? "bg-[#F1F5F9] text-[#64748B] font-bold"
                            : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]/60"
                        }`}
                      >
                        {perm}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}