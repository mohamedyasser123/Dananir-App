import { Skeleton } from "@/components/ui/skeleton"

export default function CompanySkeleton() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full py-4">
        <div className="flex items-center gap-3 flex-1 max-w-md w-full">
          <Skeleton className="h-[42px] flex-1 rounded-[10px]" />
          <Skeleton className="h-[42px] w-24 rounded-[10px] shrink-0" />
        </div>
        <Skeleton className="h-[42px] w-32 rounded-[14px] shrink-0" />
      </div>

      <div className="w-full bg-white rounded-[15px] border border-[#EAEAEA] overflow-hidden">
        <div className="flex items-center h-12 px-6 gap-6 bg-[#FCFCFD] border-b border-[#EAEAEA]">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3.5 w-40" />
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-3.5 w-16 ml-auto" />
        </div>

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center h-[60px] px-6 gap-6 border-b border-[#F3F4F6] last:border-b-0"
          >
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <div className="flex items-center gap-2 ml-auto">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
