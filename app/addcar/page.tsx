"use client";
import Footer from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import uploadToSupabaseStorage from "@/lib/uploadToSupabase";
import Link from "next/link";

export default function addcar() {
  const [file, setFile] = useState<any>();
  const [carImg, setCarImg] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleAvatarClick = () => {
    fileInputRef.current?.click(); // Open file input when clicking on avatar
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = event.target.files?.[0];
    setFile(fileData);
    if (fileData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCarImg(reader.result as string);
      };
      reader.readAsDataURL(fileData);
    }
  };
  const handleCarAddition = () => {
    if (!company || !model || !type || !price || !carImg || !location) {
      toast({
        variant: "destructive",
        description: "Please fill all the feilds",
      });
    }
    uploadToSupabaseStorage({file:file,type:"Car"}).then((res)=>{
      axios.post("/api/car/create",{
        model,type,company,price,image:res,location
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Add token to Authorization header
          'Content-Type': 'application/json', // Optional, if you want to specify content type
        },
      }
    ).then((response)=>{
        if(response.status === 201){
          toast({
            description:(
              <p>New car added to your cars <br /><Link href={"/seecar"}>Click here to see the cars</Link></p>
            ),
          });
        }
      })
      .catch((err)=>{
        toast({
          variant:"destructive",
          description:(
            <p>Error occured {err}</p>
          )
        })
      })
    }).catch((err)=>{
      console.log(err)
      toast({
        description:`${err}`
      })
    })
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken as string);
      }
    }
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="grid h-screen items-center justify-center">
        <div className="grid grid-flow-row h-[75vh] p-4 border border-gray-200 dark:border-gray-800 rounded-md ">
          <h1 className="text-3xl text-center h-20 grid">
            Add a new car to your profile
            <Separator/>
          </h1>
          <div className="grid grid-cols-2 h-[30vh] w-[50vw]">
            <div
              onClick={handleAvatarClick}
              className="car-wrapper h-[30vh] w-full flex justify-center items-center"
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <img
                className="object-contain h-full w-full"
                src={
                  carImg
                    ? carImg
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXx8/XCy9K/yND09vfw8vTP1tzp7O/i5ure4+fO1dvJ0dfT2d/EzNPt7/Lb4OXo6+4FeM7UAAAFL0lEQVR4nO2c24KrIAxFLdha7///t0dxOlWDSiAKztnrbR4G6SoJBKHZA6zJYncgQeCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ocEKBEwqcUOCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ot3Oi1KMq64FnWTVq+EueWzlRquqKVn/J+/ezEfdyHydKPYtc62yF1m1Xymq5ixPVdDnx8eslf1eCVu7hRFXFppAfLW39kNJyByeqOTJirGTvRsbKDZyozsHIpKUQsZK8E1Vu55GTrKTuRL0ZRoyVLviZaTtRVctUMuaVOnCoJO1E1WwjxsorbGZO2Qk7br5WuhApKTvpfZWMy5WAoZKuk6b1NhI4VJJ10uRBSsas0ng+OlUnVaARw9NvqCTqRERJpt9eUtJ0IqPEN36SdNIIKRnIPeafFJ0Ep9c5mr+qTdFJ2CRMpLAn5fScqJeokrFWZkoRdaImwtpw2T9iSnnxuiDoRFXda6hK28JzWTA14ryBxKFlTT9iTlT1W57o3Lta96yED8krRieknCw/DDuEP1TnKBlgzMlCTtZDXr+8pIjOwitK5x7JOKFD3mukiE85ix45S5FxYll46prdiv8ekpsU19wv4kS9LV1ouQPlrPzKliIzTuw9YDYiVfgFSxFx8rR+wcyMomSX9HYpTjlFwonqrB3gBc/JyYQjRcRJYe8Ay4l9rMlLcVi8iTjp7Y/nOBHcMjngWEoi4+TUlcmKw9rnxHzCWMqeU/ltkB9JEZl3SusnYmwQn1fm2GgPeiOzZrM9WZfu/3/BNDznYATLOLENffep+JppeMZBMSZUF9N6ljFM7KF3qpTduBZyQj4W53XTiRsEm1L2dr2k9k9W9Rtjq2BrJj9Zyk7pI7bP9lw8kfH+4KIFLGF77Sa3R90Un0POvHNCcYzsLVMk9+2buni1bd9xjMSJHMPmjCz7zov/fidW5GQ7OS/2e8BoRrLtrBfXScTIMVLsk09cJxEjZ8I6+cR1EmG1tsRaDsZ0EjlyDL0leuxOpulD4JTALtfXORRbnqVO1LDOePdtpoclWPsqulL+wt0P0SNnxFKrrp2opmuXl+5OuHA3PSmByDGQ9ezSydYdM+ELd4YUIsdANnoWTva2RSUv3JlnJRE5I2RbY+6kee1+dTrrhC7cPTZeMUdivZnydaIc3tdqqWuI6USOYZlSfp0oxzVlJxNByUSOYZlSPk6cDzqEXy17JDTn/LBMKRlTSRZ4X2giep2zZnEwZHLiGjifFt6BTtKKHMMspUxO2BkvDzoDm1jkGGa7bsaJx0t9XfgrOfuMlhezwsc48RrKufvhyiXXHatg8T2Zkm0eHzluxO8W4pXHKljkXycBt3h9blFdeqyCx2fPOguLbn6qTWsBu+Czxs/CopsdP4kmkx+mcZ8FRrfuWUqSTSYT005keDucW4iXnzRhMg17iYacC6A0VyZzzIQs0pBrUrn22JoXY4Us0pDjaZMzb+dIMX6/Qi0dHSU0XHySz48heqSaOs60vsvlq2mtpzj9OCh/Trgjew7afgLar63d6ec2SmTZm37+UyV7048K+Gmkm7O10A/8aaSbY7sEr8rYvYoNnX4Sr3EuYJVpVc35Ccu/innZbryMJ1n4v9f4N9FZ39XPZ931GYzMGH9VPHYfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADp8Q9+nG9anuOrfAAAAABJRU5ErkJggg=="
                }
                alt=""
              />
            </div>
            <div className="grid grid-flow-col p-2 ">
              <div className="grid grid-rows-4 gap-1">
                <p>Name</p>
                <p>Type</p>
                <p>Company</p>
                <p>Price for day</p>
                <p>Location</p>
              </div>
              <div className="grid gap-1 grid-rows-4 items-center">
                <Input
                  className="w-full"
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Enter name of your car model"
                />
                <Select onValueChange={(value)=>setType(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select car type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="Hatchbacks">Hatchbacks</SelectItem>
                    <SelectItem value="SUVs">SUVs</SelectItem>
                    <SelectItem value="Coupes">Coupes</SelectItem>
                    <SelectItem value="Convertibles">Convertibles</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  className="w-full"
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter name of your car company"
                />
                <Input
                  className="w-full"
                  type="number"
                  id="price"
                  name="price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                />
                <Input
                  className="w-full"
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter pickup location of your car"
                />
              </div>
            </div>
          </div>
          <Button onClick={handleCarAddition} className="text-xl">
            Add car
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
