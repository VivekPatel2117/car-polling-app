import React, { useState } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Spinner from "../Spinner";

interface RejectProps {
  bookingId: string;
  onSuccess: () => void;
}

export const RejectBox: React.FC<RejectProps> = ({ bookingId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // Control dialog manually

  const handleAcceptBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/car/book/reject`,
        {
          booking_id: bookingId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        onSuccess();
        setOpen(false); // Close dialog on success
      }
    } catch (err) {
      setError("Failed to accept booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button variant={"outline"} className="w-full" onClick={() => setOpen(true)}>Reject</Button>
      <AlertDialogContent>
        <form onSubmit={handleAcceptBooking}>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Booking</AlertDialogTitle>
            <AlertDialogDescription>
              By clicking the reject button, you confirm the rejection of booking for your car.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <br />
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading} onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner isOpen={loading} /> : "Reject"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
