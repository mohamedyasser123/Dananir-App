import { Skeleton } from "../../../../components/ui/skeleton"

function StatCardSkeleton() {
  return (
    <div className="flex h-44 flex-col justify-between rounded-[15px] border border-[#EAEAEA] p-6">
      <div className="flex items-start justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-12 w-12 rounded-[18px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-3.5 w-28" />
      </div>
    </div>
  )
}

function PanelSkeleton({ className, rows = 5 }: { className?: string; rows?: number }) {
  return (
    <div className={`bg-white rounded-[15px] border border-[#EAEAEA] p-6 flex flex-col gap-5 ${className ?? ""}`}>
      <Skeleton className="h-5 w-40" />
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </div>
  )
}

export default function DashboardSkeleton() {
  return (
    <>
      <div className="w-full px-6 py-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 w-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>
      </div>

      <div className="w-full px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          <PanelSkeleton className="lg:col-span-3 min-h-[450px]" />
          <PanelSkeleton className="lg:col-span-6 min-h-[450px]" rows={3} />
          <PanelSkeleton className="lg:col-span-3 min-h-[450px]" />
        </div>
      </div>

      <div className="w-full px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          <PanelSkeleton className="lg:col-span-8 min-h-[480px]" rows={4} />
          <PanelSkeleton className="lg:col-span-4 min-h-[480px]" />
        </div>
      </div>

      <div className="w-full px-6 py-4">
        <div className="mb-6 space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          <PanelSkeleton className="lg:col-span-4 min-h-[480px]" rows={4} />
          <div className="lg:col-span-8 flex flex-col gap-5 min-h-[480px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex-1 flex items-start gap-4 p-5 rounded-[10px] border border-[#EAEAEA] bg-white"
              >
                <Skeleton className="h-12 w-12 rounded-[12px] shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3.5 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
