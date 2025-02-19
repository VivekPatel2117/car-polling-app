import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SkeletonLoader() {
  return (
    <Card className="w-[350px] bg-black text-white relative p-4">
      <div className="absolute top-3 right-3 text-gray-400">
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
      <CardHeader className="font-semibold">
        <Skeleton className="h-6 w-24 mx-auto" />
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-400 mb-2">
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        <div className="text-center font-bold mb-4">
          <Skeleton className="h-6 w-16 mx-auto" />
        </div>

        <div className="mb-2">
          <Skeleton className="h-4 w-16 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="mb-4">
          <Skeleton className="h-4 w-16 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>

        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}
