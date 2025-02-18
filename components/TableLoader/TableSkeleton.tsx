import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">
              <Skeleton className="h-6 w-24" />
            </th>
            <th className="px-4 py-2 text-left">
              <Skeleton className="h-6 w-24" />
            </th>
            <th className="px-4 py-2 text-left">
              <Skeleton className="h-6 w-32" />
            </th>
            <th className="px-4 py-2 text-left">
              <Skeleton className="h-6 w-32" />
            </th>
            <th className="px-4 py-2 text-left">
              <Skeleton className="h-6 w-24" />
            </th>
            <th className="px-4 py-2 text-left">
              <Skeleton className="h-6 w-32" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="px-4 py-2">
                <Skeleton className="h-6 w-24" />
              </td>
              <td className="px-4 py-2">
                <Skeleton className="h-6 w-24" />
              </td>
              <td className="px-4 py-2">
                <Skeleton className="h-6 w-32" />
              </td>
              <td className="px-4 py-2">
                <Skeleton className="h-6 w-32" />
              </td>
              <td className="px-4 py-2">
                <Skeleton className="h-6 w-24" />
              </td>
              <td className="px-4 py-2">
                <Skeleton className="h-6 w-32" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
