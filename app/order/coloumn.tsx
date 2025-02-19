"use client"
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
export type BookingData = {
  id: string;
  "start_date":string,
  "end_date": string,
  amount: number;
  status: string;
  email: string;
  "name":string,
  model:string,
};

export const columns: ColumnDef<BookingData>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          ></Checkbox>
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey:"name",
        header:"Car Name"
      },
      {
        accessorKey:"model",
        header:"Model"
      },
      {
        accessorKey:"start_date",
        header:"Start Date"
      },
      {
        accessorKey:"end_date",
        header:"End Date"
      },
    {
    accessorKey: "amount",
    header: ({ column }) => {
        return (
          <div className="flex justify-end w-full">
            <Button
          
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          </div>
        );
      },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="flex justify-end w-full mr-4">
        <p className="pr-5">
            {formatted}
        </p>
            </div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
 
];
