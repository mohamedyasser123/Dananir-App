import { Skeleton } from "@/components/ui/skeleton"

export default function RolesSkeleton() {
  return (
    <div className="w-full !px-2 !py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-full rounded-[14px] border border-[#F3F4F6] overflow-hidden">
            <Skeleton className="h-[140px] w-full rounded-none" />
            <div className="!p-6 flex flex-col gap-4 bg-white">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-3 w-16" />
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
