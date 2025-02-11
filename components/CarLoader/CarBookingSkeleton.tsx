import { Skeleton } from "@/components/ui/skeleton";

export function CarBookingSkeleton() {
  return (
    <div className="book-car-wrapper">
      {/* Top Section */}
      <div className="overflow-hidden w-full border h-20 grid items-center grid-flow-col justify-between pl-10 pr-10">
        <Skeleton className="w-[250px] h-6" />
        <Skeleton className="w-[300px] h-6" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 h-[70vh]">
        {/* Car Image Section */}
        <div className="grid justify-center items-center">
          <Skeleton className="w-[40vw] h-[60vh] rounded-md" />
        </div>

        {/* Car Details Section */}
        <div className="grid justify-start items-center w-full">
          <div className="grid grid-flow-row p-2 gap-1">
            <div className="w-full flex flex-col gap-[10vh]">
              {/* Car Information */}
              <div className="grid grid-rows-3 items-center h-[25vh]">
                <Skeleton className="w-[200px] h-8" />
                <Skeleton className="w-[150px] h-6" />
                <Skeleton className="w-[180px] h-6" />
              </div>

              {/* Price Section */}
              <div className="flex flex-col gap-4">
                <Skeleton className="w-[100px] h-6" />
                <Skeleton className="w-[250px] h-6" />
              </div>

              {/* Button */}
              <Skeleton className="w-full h-[10vh] rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
