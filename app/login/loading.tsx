import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Skeleton/>
        </div>
    );
  };