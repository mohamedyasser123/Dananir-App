import { Skeleton } from "@/components/ui/skeleton"

export default function NotificationsSkeleton() {
  return (
    <div className="w-full bg-white rounded-[15px] border border-[#EAEAEA] overflow-hidden">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center h-[60px] px-6 gap-6 border-b border-[#F3F4F6] last:border-b-0"
        >
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-5 w-16 rounded-full ml-auto" />
        </div>
      ))}
    </div>
  )
}
