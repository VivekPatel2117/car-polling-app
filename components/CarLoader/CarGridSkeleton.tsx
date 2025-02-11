import { Skeleton } from "@/components/ui/skeleton";

export default function CarGridSkeleton() {
  return (
    <div className="grid mt-6 mb-6 grid-cols-3 gap-4 grid-flow-row w-[80vw] place-content-center justify-self-center justify-center">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="grid h-[60vh] w-full border border-gray-800">
          <Skeleton className="h-[35vh] w-full" />
          <div className="grid">
            <div className="grid grid-flow-row p-2 gap-1">
              <div className="w-full flex justify-between">
                <div>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-24 mt-1" />
                </div>
                <div className="flex flex-col items-end">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-16 mt-1" />
                </div>
              </div>
              <Skeleton className="h-1 w-full bg-gray-800 rounded" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-full rounded-sm mt-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
