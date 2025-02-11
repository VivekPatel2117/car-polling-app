"use client";
import Footer from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import Spinner from "@/components/Spinner";
import { CarBookingSkeleton } from "@/components/CarLoader/CarBookingSkeleton";
interface Car {
  id: string;
  model: string;
  type: string;
  company: string;
  price: number;
  image: string;
  location: string;
  createdAt: string;
  createdBy?: string;
  bookedUserIds: string[];
}
export default function page() {
  const params = useParams();
  const { toast } = useToast();
  const id = params.id;
  const [data, setData] = useState<Car>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [progress, setProgress] = useState(false);
  const [days, setDays] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const handleGETCarData = () => {
    axios
      .get(`/api/car/view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
          "Content-Type": "application/json", // Optional, if you want to specify content type
        },
      })
      .then((res) => {
        const carData = res.data as { data: Car };
        setData(carData.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: (
            <>
              <p>Failed to fetch cars</p>
              <p>{err}</p>
            </>
          ),
        });
      });
  };
  const handleBooking = async () => {
    setProgress(true);
    try {
        alert(`${dateRange?.from}- ${dateRange?.to}`);
      if (dateRange?.from === undefined || dateRange?.to === undefined) {
        toast({
          variant: "destructive",
          description: (
            <>
              <p>Please select a valid date range.</p>
            </>
          ),
        });
        return;
      }
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/car/book/create`,
        {
          car_id: id,
          start_date: dateRange?.from,
          end_date: dateRange?.to,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        handleGETCarData(); // Notify parent component of the booking success
      }
    } catch (err) {
      setError("Failed to book. Please try again.");
    } finally {
      setProgress(false);
    }
  };
  useEffect(() => {
    handleGETCarData();
  }, []);
  const getDaysDifference = () => {
    if (dateRange?.from && dateRange?.to) {
      const differenceInDates = differenceInDays(dateRange.to, dateRange.from);
      setDays(differenceInDates);
      return differenceInDates;
    }
    return 0; // Default value if range is not selected
  };
  useEffect(() => {
    if(dateRange?.from && dateRange?.to) {
     toast({
      description: (
        <p>{getDaysDifference()}</p>
      )
     })
    }
  }, [dateRange])
  
  return (
    <React.Fragment>
      <Navbar />
      <div className="book-car-wrapper">
        {isLoading ? (
          <CarBookingSkeleton />
        ) : (
          !isLoading &&
          data && (
            <>
              <div className="overflow-hidden w-full border h-20 grid items-center grid-flow-col justify-between pl-10 pr-10">
                <p className="font-sans items-center text-xl">
                  Pickup location: <b>{data?.location}</b>
                </p>
                <p className="flex text-xl font-sans items-center gap-4">
                  Choose your pickup date: <DatePicker date={dateRange} setDate={setDateRange} />
                </p>
              </div>
              <div className="grid grid-cols-2 h-[70vh]">
                <div className="grid justify-center items-center">
                  <img src={data.image} alt={data.company} />
                </div>
                <div className="grid justify-start items-center w-full">
                  <div className="grid grid-flow-row p-2 gap-1">
                    <div className="w-full flex flex-col gap-[10vh]">
                      <div className="grid grid-rows-3 items-center h-[25vh]">
                        <h1 className="font-sans font-bold text-5xl">
                          Company name: {data.company}
                        </h1>
                        <h4 className="font-sans text-3xl">
                          Model: {data.model}
                        </h4>
                        <h1 className="font-sans text-3xl">
                          Car Type: {data.type}
                        </h1>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h1 className="flex gap-4 font-sans text-2xl">
                          Price:{" "}
                          <p className="font- font-bold text-2xl hover:underline">
                            ₹{data.price} / per day
                          </p>
                        </h1>
                        {dateRange?.from && dateRange?.to && (
                          <h1 className="flex gap-4 font-sans text-2xl">
                          Total Price:{" "}
                          <p className="flex flex-col font-bold text-2xl hover:underline">
                            ₹{(data.price * days)} for {days} days
                            <b className="text-gray-600 font-normal text-sm">This price does not include fuel and toll tax</b>
                          </p>
                        </h1>
                        )}
                      </div>
                      <Button
                        onClick={handleBooking}
                        className="w-full h-[10vh] text-3xl"
                      >
                        {data.bookedUserIds.length > 0 ? (
                                <Button className="text-2xl w-full rounded-sm font-sans" disabled>
                                Booked
                                </Button>
                            ) : (
                            <Button className="text-2xl w-full rounded-sm font-sans">
                                {progress ? <Spinner isOpen={progress}/> : "Request car"}
                            </Button>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
}
