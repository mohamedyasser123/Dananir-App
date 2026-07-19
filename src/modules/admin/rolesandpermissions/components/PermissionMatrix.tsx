import React, { useEffect, useState } from "react";
// Import الـ Checkbox الافتراضي من شاد سي إن (تأكد من مسار الـ components عندك)
import { Checkbox } from "@/components/ui/checkbox";
import type { PermissionCategory } from "../types/role.types";
import { usePermissionMatrixTemplate } from "../hooks/role/usePermissionMatrixTemplate";
import { useCreateRole } from "../hooks/role/useCreateRole";

export default function PermissionMatrix() {
    const [roleName, setRoleName] = useState("");
    const { data: template } = usePermissionMatrixTemplate();
    const createRole = useCreateRole();

    // هنا بنعمل State مرن عشان الـ Checkboxes تشتغل بشكل تفاعلي بالكامل
    const [permissionsState, setPermissionsState] = useState<PermissionCategory[]>([]);

    useEffect(() => {
        if (template) {
            setPermissionsState(template);
        }
    }, [template]);

    const handleCheckboxChange = (catIdx: number, permIdx: number, field: 'view' | 'edite' | 'addDelete' | 'manage') => {
        const updatedState = [...permissionsState];
        updatedState[catIdx].permissions[permIdx][field] = !updatedState[catIdx].permissions[permIdx][field];
        setPermissionsState(updatedState);
    };

    const handleSave = () => {
        if (!roleName.trim()) return;
        createRole.mutate(
            { name: roleName.trim(), matrix: permissionsState },
            {
                onSuccess: () => {
                    setRoleName("");
                    if (template) setPermissionsState(template);
                },
            }
        );
    };

    return (
        <div className="w-full !px-6 !py-4 flex flex-col gap-6">

            {/* الكارت الرئيسي واخد الـ Layered Shadows والـ Border اللي ضبطناهم بالملي */}
            <div className="w-full bg-white rounded-[14px] !p-8 flex flex-col shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_0_rgba(0,0,0,0.1)] border border-[#F3F4F6] overflow-hidden">

                {/* ================= 1. الهيدر و خانة إدخال الـ Role Name ================= */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full mb-8">
                    <div>
                        <h3 className="text-[20px] font-bold text-[#0D3B73] tracking-tight">
                            Permission Matrix
                        </h3>
                    </div>

                    <div className="flex flex-col gap-1.5 w-full md:w-[320px]">
                        <label className="text-[13px] font-bold text-[#475569]">Role name</label>
                        <input
                            type="text"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            placeholder="Give role name"
                            className="w-full h-[42px] px-4 rounded-[8px] border border-[#E2E8F0] text-[14px] placeholder-[#BCC1C9] focus:outline-none focus:ring-2 focus:ring-[#2C4F93]/20"
                        />
                    </div>
                </div>

                {/* ================= 2. جدول المصفوفة (Matrix Table) ================= */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#F3F4F6]">
                                {/* العمود الأول */}
                                <th className="!pb-4 !px-4 text-[13px] font-bold text-[#475569] w-[40%] border-r border-[#F3F4F6]">
                                    Category
                                </th>
                                {/* باقي الأعمدة بينها خطوط رأسيّة */}
                                <th className="!pb-4 !px-4 text-[13px] font-bold text-[#475569] text-center w-[15%] border-r border-[#F3F4F6]">
                                    View
                                </th>
                                <th className="!pb-4 !px-4 text-[13px] font-bold text-[#475569] text-center w-[15%] border-r border-[#F3F4F6]">
                                    Edite
                                </th>
                                <th className="!pb-4 !px-4 text-[13px] font-bold text-[#475569] text-center w-[15%] border-r border-[#F3F4F6]">
                                    Add/delete
                                </th>
                                <th className="!pb-4 !px-4 text-[13px] font-bold text-[#475569] text-center w-[15%]">
                                    Manage
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#F3F4F6]">
                            {permissionsState.map((cat, catIdx) => (
                                <React.Fragment key={cat.category}>
                                    {cat.permissions.map((perm, permIdx) => (
                                        <tr key={perm.id} className="hover:bg-[#F8FAFC]/40 transition-colors">

                                            {/* داتا العمود الأول */}
                                            <td className="!py-4 !px-4 text-[14px] text-[#64748B] border-r border-[#F3F4F6]">
                                                <div className="flex items-center gap-6">
                                                    <span className="w-[100px] font-bold text-[#0D3B73] block shrink-0">
                                                        {permIdx === 0 ? cat.category : ""}
                                                    </span>
                                                    <span className="font-medium text-[#99A1AF]">{perm.code}</span>
                                                </div>
                                            </td>

                                            {/* View Checkbox */}
                                            <td className="!py-4 !px-4 text-center border-r border-[#F3F4F6]">
                                                <div className="flex justify-center items-center">
                                                    <Checkbox
                                                        id={`${perm.id}-view`}
                                                        checked={perm.view}
                                                        onCheckedChange={() => handleCheckboxChange(catIdx, permIdx, 'view')}
                                                        className="w-5 h-5 rounded-none bg-transparent border-[#00000040] data-[state=checked]:!bg-[#00A63E] data-[state=checked]:!border-[#00A63E] transition-all"
                                                        style={{
                                                            backgroundColor: perm.view ? "#00A63E" : "transparent",
                                                            borderColor: perm.view ? "#00A63E" : "#00000040",
                                                        }}
                                                    />
                                                </div>
                                            </td>

                                            {/* Edite Checkbox */}
                                            <td className="!py-4 !px-4 text-center border-r border-[#F3F4F6]">
                                                <div className="flex justify-center items-center">
                                                    <Checkbox
                                                        id={`${perm.id}-view`}
                                                        checked={perm.view}
                                                        onCheckedChange={() => handleCheckboxChange(catIdx, permIdx, 'view')}
                                                        className="w-5 h-5 rounded-none bg-transparent border-[#00000040] data-[state=checked]:!bg-[#00A63E] data-[state=checked]:!border-[#00A63E] transition-all"
                                                        style={{
                                                            backgroundColor: perm.view ? "#00A63E" : "transparent",
                                                            borderColor: perm.view ? "#00A63E" : "#00000040",
                                                        }}
                                                    />
                                                </div>
                                            </td>

                                            <td className="!py-4 !px-4 text-center border-r border-[#F3F4F6]">
                                                <div className="flex justify-center items-center">
                                                    <Checkbox
                                                        id={`${perm.id}-view`}
                                                        checked={perm.view}
                                                        onCheckedChange={() => handleCheckboxChange(catIdx, permIdx, 'view')}
                                                        className="w-5 h-5 rounded-none bg-transparent border-[#00000040] data-[state=checked]:!bg-[#00A63E] data-[state=checked]:!border-[#00A63E] transition-all"
                                                        style={{
                                                            backgroundColor: perm.view ? "#00A63E" : "transparent",
                                                            borderColor: perm.view ? "#00A63E" : "#00000040",
                                                        }}
                                                    />
                                                </div>
                                            </td>

                                            <td className="!py-4 !px-4 text-center">
                                                <div className="flex justify-center items-center">
                                                    <Checkbox
                                                        id={`${perm.id}-view`}
                                                        checked={perm.view}
                                                        onCheckedChange={() => handleCheckboxChange(catIdx, permIdx, 'view')}
                                                        className="w-5 h-5 rounded-none bg-transparent border-[#00000040] data-[state=checked]:!bg-[#00A63E] data-[state=checked]:!border-[#00A63E] transition-all"
                                                        style={{
                                                            backgroundColor: perm.view ? "#00A63E" : "transparent",
                                                            borderColor: perm.view ? "#00A63E" : "#00000040",
                                                        }}
                                                    />
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* ================= 3. زرار الحفظ السفلي بلون #2C4F93 ================= */}
            <div className="w-full flex justify-end !mt-2">
                <button
                    onClick={handleSave}
                    disabled={createRole.isPending}
                    className="h-[46px] px-10 bg-[#2C4F93] hover:bg-[#1E4385] text-white font-bold text-[15px] rounded-[10px] transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {createRole.isPending ? "Saving..." : "Save"}
                </button>
            </div>

        </div>
    );
}