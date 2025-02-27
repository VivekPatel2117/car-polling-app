import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Spinner from "../Spinner";

interface AcceptProps {
  bookingId: string;
  onSuccess: () => void;
}

export const AcceptBox: React.FC<AcceptProps> = ({ bookingId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // Control dialog manually
  const [token, setToken] = useState("");
  const handleAcceptBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `/api/car/book/accept`,
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
      console.log("Error occured in acceptBox: ",err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button variant={"outline"} className="w-full" onClick={() => setOpen(true)}>Accept</Button>
      <AlertDialogContent>
        <form onSubmit={handleAcceptBooking}>
          <AlertDialogHeader>
            <AlertDialogTitle>Accept Booking</AlertDialogTitle>
            <AlertDialogDescription>
              By clicking the accept button, you confirm the booking for your car.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <br />
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading} onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner isOpen={loading} /> : "Accept"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
