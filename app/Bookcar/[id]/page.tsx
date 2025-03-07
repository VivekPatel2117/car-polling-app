"use client";
import Footer from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { useToast } from "@/hooks/use-toast";
import { addDays } from "date-fns";
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
export default function Bookcar() {
  const params = useParams();
  const { toast } = useToast();
  const id = params.id;
  const [data, setData] = useState<Car>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [progress, setProgress] = useState(false);
  const [days, setDays] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const handleGETCarData = (token: string) => {
    axios
      .get(`/api/car/view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
          "Content-Type": "application/json", // Optional, if you want to specify content type
        },
      })
      .then((res) => {
        const carData = res.data as {
          data: Car;
          isAlreadyBookedByUser: boolean;
        };
        setData(carData.data);
        setIsBooked(carData.isAlreadyBookedByUser);
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
  const [isBooked, setIsBooked] = useState(false);
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

      if (response.status === 201) {
        toast({
          description: "Booking successfull!",
        });
        handleGETCarData(token); // Notify parent component of the booking success
      }
    } catch (err) {
      setError("Failed to book. Please try again.");
      console.log("Error occured in Bookcar: ",err);
      console.log(error);
    } finally {
      setProgress(false);
    }
  };
  const getDaysDifference = () => {
    if (dateRange?.from && dateRange?.to) {
      const differenceInDates = differenceInDays(dateRange.to, dateRange.from);
      setDays(differenceInDates);
      return differenceInDates;
    }
    return 0; // Default value if range is not selected
  };
  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      toast({
        description: <p>{getDaysDifference()}</p>,
      });
    }
  }, [dateRange]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken as string);
      handleGETCarData(storedToken as string);
    }
  }, []);
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
                <div className="flex gap-2 items-center">
                <p>Pick a date: </p>
                <DatePicker date={dateRange} setDate={setDateRange}/>
                </div>
              </div>
              <div className="grid grid-cols-2 h-[70vh]">
                <div className="grid justify-center items-center">
                  <img className="w-[40vw]" src={data.image} alt={data.company} />
                </div>
                <div className="grid justify-start items-center w-full">
                  <div className="grid grid-flow-row p-2 gap-1">
                    <div className="w-full flex flex-col gap-[10vh]">
                      <div className="grid grid-rows-3 items-center h-[25vh]">
                        <h1 className="font-sans font-bold text-3xl">
                          Company name: {data.company}
                        </h1>
                        <h4 className="font-sans text-2xl">
                          Model: {data.model}
                        </h4>
                        <h1 className="font-sans text-2xl">
                          Car Type: {data.type}
                        </h1>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h1 className="flex gap-4 font-sans text-xl">
                          Price:{" "}
                          <p className="font- font-bold text-xl hover:underline">
                            ₹{data.price} / per day
                          </p>
                        </h1>
                        {dateRange?.from && dateRange?.to && (
                          <h1 className="flex gap-4 font-sans text-2xl">
                            Total Price:{" "}
                            <p className="flex flex-col font-bold text-2xl hover:underline">
                              ₹{data.price * days} for {days} days
                              <b className="text-gray-600 font-normal text-sm">
                                This price does not include fuel and toll tax
                              </b>
                            </p>
                          </h1>
                        )}
                      </div>
                      <Button
                        onClick={handleBooking}
                        className="w-full h-[7vh] text-2xl"
                        disabled={isBooked}
                      >
                        {isBooked ? (
                          "Requested"
                        ) : (
                          <>
                            {progress ? (
                              <Spinner isOpen={progress} />
                            ) : (
                              "Request car"
                            )}
                          </>
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
