"use client";
import { useEffect, useState } from "react";
import { BookingData, columns } from "./coloumn";
import { DataTable } from "./data-table";
import { differenceInDays } from "date-fns";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import axios from "axios";
import TableSkeleton from "@/components/TableLoader/TableSkeleton";

interface Car {
  id: string;
  model: string;
  type: string;
  company: string;
  price: number;
  image: string;
  location: string;
  createdAt: string;
  createdBy: string;
  bookedUserIds: string[];
}

interface User {
  id: string;
  username: string;
  email: string;
  profile: string;
}

interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  accepted: boolean;
  car_id: string;
  user_id: string;
  status: string;
  car: Car;
  user: User;
}

function formatDateWithOrdinal(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();

  const getOrdinalSuffix = (day: any) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayWithSuffix = day + getOrdinalSuffix(day);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${dayWithSuffix} ${month} ${year}`;
}

function getTotalPrice(price: number, from: string, to: string) {
  const difference = differenceInDays(to, from);
  return price * difference;
}

const processData = (data: Booking[]) => {
  return data.map((item, index) => {
    const newItem = {
      id: item.id,
      start_date: formatDateWithOrdinal(item.start_date),
      end_date: formatDateWithOrdinal(item.end_date),
      amount: getTotalPrice(item.car.price, item.start_date, item.end_date),
      status: item.status,
      email: item.user.email,
      name: item.car.company,
      model: item.car.model,
    };

    return newItem;
  });
};

export default function Page() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("/api/car/book/order", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          const data = (response.data as { bookings: Booking[] }).bookings;
          setBookings(processData(data));
          setIsLoading(false);
        } else if(response.status === 200) {
          setIsError("No bookings found");
        }
      } catch (error) {
        console.log(error)
        setIsError("Internal Error occured!")
      } finally {
       setIsLoading(false);
      }
    };

    fetchUserBookings();
  }, []); // Empty array to run once when the component mounts

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <h1>Orders you have requested</h1>
       {isLoading ? (
        <TableSkeleton/>
       ):isError !== "" ? (
        <p>{isError}</p>
       ):(
        <DataTable columns={columns} data={bookings} />
       )}
      </div>
      <Footer />
    </>
  );
}
