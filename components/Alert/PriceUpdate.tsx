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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PriceUpdateProps {
  carId: string;
  currentPrice: number;
  onSuccess: () => void;
}

export const PriceUpdate: React.FC<PriceUpdateProps> = ({
  carId,
  currentPrice,
  onSuccess,
}) => {
  const [newPrice, setNewPrice] = useState<number>(currentPrice);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdatePrice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/api/car/update`,
        {
          newPrice,
          carId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
            "Content-Type": "application/json", // Optional, if you want to specify content type
          },
        }
      );

      if (response.status === 200) {
        onSuccess(); // Notify parent component of the update
      }
    } catch (err) {
      setError("Failed to update price. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">Update Price</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleUpdatePrice}>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Car Price</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the new price for the car. This will update the listing
              price.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
            min="0"
            required
            className="mt-2"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <br />
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Confirm"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
