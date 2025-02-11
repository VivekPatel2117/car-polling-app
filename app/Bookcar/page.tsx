"use client"
import Footer from '@/components/Footer/Footer'
import { Navbar } from '@/components/Navbar/Navbar'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
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

export default function () {
  const [data, setData] = useState<Car[]>([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.get('/api/car/view',{
      headers: {
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
        'Content-Type': 'application/json', // Optional, if you want to specify content type
      },
    }).then((res) => {
      console.log(res)
      setData((res.data as { data: any[] }).data);
    })
  }, [])
  
  return (
    <>
    <Navbar/>
        <div className='grid mt-6 mb-6 grid-cols-3 gap-4 grid-flow-row w-[80vw] place-content-center justify-self-center justify-center'>
        {data.map((car) => (
          <div key={car.id} className='h-[50vh] w-full border border-gray-800'>
            <img src={car.image} alt={car.model} className='h-[30vh] w-full' />
            <div className='grid'>
              <div className='grid grid-flow-row text-center'>
                <h1>{car.company} - {car.model}</h1>
                <h1>{car.type}</h1>
                <h1>{car.location}</h1>
                <h1> Rs: {car.price} per day</h1>
              </div>
             
            </div>
          </div>
        ))}
        </div>
    <Footer/>
    </>
  )
}
