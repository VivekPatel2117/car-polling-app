import { Navbar } from "@/components/Navbar/Navbar";
import Image from "next/image";
import Car from "../public/car.jpg";
import Footer from "@/components/Footer/Footer";
import { CarouselCard } from "@/components/CarouselCard/CarouselCard";
import Car1 from "@/public/Fortuner legender.jpeg"
import Car2 from "@/public/KIA seltos car.jpeg"
import Car3 from "@/public/MarutiSuzuki Ignis Alpha 1_2 MT 2023 Price In USA , Features And Specs.jpeg";
// import Car4 from "@/public/New Maruti Suzuki Brezza launched with amazing features!.jpeg"
import Car5 from "@/public/TATA NEXON.jpeg"
export default function Home() {
  const sliderImg = [
    Car1,Car2,Car3,Car5,Car5
  ]
  return (
    <>
      <Navbar />
      <div className="h-screen lg:h-[80vh] text-center lg:text-left w-screen pl-4 items-center justify-center grid grid-flow-row lg:grid-cols-2">
        <div className="flex h-full flex-col justify-center">
          <h1 className="text-4xl">Join the Ride, Share the Journey! </h1>
          <h4>
            Welcome to Poolcar, the smarter, eco-friendly, and affordable way to
            travel. Whether you're commuting to work, heading to college, or
            planning a road trip, we connect riders and drivers heading in the
            same direction.
          </h4>
          <p></p>
        </div>
        <div className="flex justify-center h-full lg:w-full w-screen lg:mb-0 mb-10">
          <Image src={Car} className="" alt="Car" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center lg:h-screen items-center w-screen overflow-x-hidden lg:gap-[2vw] gap-10">
        <div className="lg:h-[70vh] lg:w-[25vw] w-screen grid justify-center shadow-xl border rounded-sm text-justify">
          <Image className="h-40 w-full" src={Car} alt="Car" />
            <h1 className="text-2xl text-center">Rent a car</h1>
            <div className="p-4">
            <p className="text-sm">
              Drive Your Way with Ease! <br />
              Wide Range of Cars: From budget rides to luxury wheels, choose
              what suits your style. Hassle-Free Booking: Rent a car in just a
              few clicks—anytime, anywhere. Affordable Rates: Drive your dream
              car without breaking the bank.
            </p>
          </div>
        </div>
        <div className="lg:h-[70vh] lg:w-[25vw] w-screen grid justify-center shadow-xl border rounded-sm text-justify">
          <Image className="h-40 w-full" src={Car} alt="Car" />
            <h1 className="row-span-1 text-2xl text-center">Search cars by category</h1>
            <div className="p-4 grid grid-flow-row">
            <p className=" row-span-2 text-sm">
              Search Your Way with Ease! <br />
              Easily find the perfect car for your journey with our "Search by Category" feature. Choose from options like Economy, Premium, SUVs, or Electric Cars to match your style, budget, and needs—whether for city drives, family trips, or special occasions.
            </p>
          </div>
        </div>
        <div className="lg:h-[70vh] lg:w-[25vw] w-screen grid justify-center shadow-xl border rounded-sm text-justify">
          <Image className="h-40 w-full" src={Car} alt="Car" />
            <h1 className="text-2xl text-center">Online booking</h1>
          <div className="p-4">
            <p className="text-sm">
            Book Your Car 100% Online! 🚗💻 <br />
            Skip the hassle and book your dream ride entirely online. From selecting your ideal car to confirming your booking, our seamless process ensures convenience at your fingertips. No paperwork, no queues—just a few clicks, and you're ready to hit the road!
            </p>
          </div>
        </div>
       
      </div>
      <div className="grid grid-flow-row h-[90vh] lg:mt-0 mt-10">
        <h1 className="text-center text-3xl">Top Featured cars</h1>
      <CarouselCard ImgArr={sliderImg}/>
      </div>
      <Footer/>
    </>
  );
}
