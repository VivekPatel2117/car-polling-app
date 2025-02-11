"use client"
import Footer from '@/components/Footer/Footer'
import { Navbar } from '@/components/Navbar/Navbar'
import React, { useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast";
import axios from 'axios'
interface Car {
  _id: string;  // MongoDB ObjectId as a string
  model: string;
  type: string;
  company: string;
  price: number;
  image: string;
  location: string;
  createdAt: string; // ISO date string
  createdBy?: string; // Optional, in case some cars don't have a creator
}

export default function page() {
  const { toast } = useToast();
  const [data, setData] = useState<Car[]>([]);
  const token = localStorage.getItem("token")
  useEffect(() => {
    axios.get("/api/car/update",{
      headers: {
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
        'Content-Type': 'application/json', // Optional, if you want to specify content type
      },
    })
    .then((res)=>{
      setData((res.data as { data: Car[] }).data)
    })
    .catch((err)=>{
      toast({
        variant:"destructive",
        description:(
          <p>{JSON.stringify(err)}</p>

        )
      })
    })
  }, []);
  
  return (
    <>
    <Navbar/>
    <Footer/>
    </>
  )
}
