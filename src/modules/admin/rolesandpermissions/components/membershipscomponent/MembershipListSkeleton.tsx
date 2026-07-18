import { Skeleton } from "@/components/ui/skeleton"

export default function MembershipListSkeleton() {
  return (
    <>
      <div className="w-full bg-[#FAFAFA] !py-12 !px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-[20px] border border-[#EAEAEA] overflow-hidden">
              <Skeleton className="h-[140px] w-full rounded-none" />
              <div className="!p-6 flex flex-col gap-4">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-11 w-full rounded-xl mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-white border border-[#EAEAEA] rounded-[16px] !p-6 max-w-[1400px] mx-auto">
        <Skeleton className="h-5 w-40 mb-5" />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-[68px] w-full rounded-[12px]" />
          ))}
        </div>
      </div>
    </>
  )
}
