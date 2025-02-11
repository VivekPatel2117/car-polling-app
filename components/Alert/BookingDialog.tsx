// import React, { useState } from "react";
// import axios from "axios";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { DateRange } from "react-day-picker";
// import { DatePicker } from "../DatePicker/DatePicker";
// interface BookingProps {
//   onSuccess: () => void;
// }

// export const BookingDialog: React.FC<BookingProps> = ({ onSuccess }) => {
//   const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     console.log(dateRange);
//     if (!dateRange?.from || !dateRange?.to) {
//       setError("Please select a valid date range.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `/api/booking/create`,
//         {
//           car_id:carId,
//           start_date: dateRange.from,
//           end_date: dateRange.to,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         onSuccess(); // Notify parent component of the booking success
//       }
//     } catch (err) {
//       setError("Failed to book. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleBooking} className="space-y-4">
//           <DatePicker
//             className="w-full"
//             onChange={(range) => {
//               console.log("DATE: ", range);
//               setDateRange(range);
//             }}
//           />
//           {/* Error Message */}
//           {error && <p className="text-sm text-red-500">{error}</p>}
//         </form>
//   );
// };
