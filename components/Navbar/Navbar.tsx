
"use client"
import Link from "next/link";
import { ToggleButton } from "../ToogleButton";
import { NestedMenu } from "../NestedMenu/NestedMenu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "@/components/profileslider/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const Navbar = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [slider, setSlider] = useState(false);
  const [profile, setProfile] = useState<string>("");
  const router = useRouter();
  const UserLoginRegister = [
    {
      name:"Login",
      clickFunc: () => {
        router.push("/login")
      },
    },
    {
      name:"Register",
      clickFunc: () => {
        router.push("/register")
      },
    },
    
  ]
  const MoblieMenu = [
    {
      name: "Home",
      clickFunc: () => {
        router.push("/");
      },
    },
    {
      name: "Book Car",
      clickFunc: () => {
        router.push("/bookcar");
      },
    },
    {
      name: "Add Car",
      clickFunc: () => {
        router.push("/addcar");
      },
    },
    {
      name: "Manage Car",
      clickFunc: () => {
        router.push("/seecar");
      },
    },
    {
      name: "Manage orders",
      clickFunc: () => {
        router.push("/order");
      },
    },
    {
      name: "Your orders",
      clickFunc: () => {
        router.push("/myorder");
      },
    },
  ]
  const NestMenuArr = [
    {
      name: "Add Car",
      clickFunc: () => {
        router.push("/addcar");
      },
    },
    {
      name: "Manage Car",
      clickFunc: () => {
        router.push("/seecar");
      },
    },
    {
      name: "Manage orders",
      clickFunc: () => {
        router.push("/order");
      },
    },
    {
      name: "Your orders",
      clickFunc: () => {
        router.push("/myorder");
      },
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    const profileImg = localStorage.getItem("profile");
    if(profileImg){
      setProfile(profileImg)
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize",handleResize);
    }
  }, [])
  return (
    <div
      className="overflow-hidden 
    w-full border h-20 dark:bg-black grid pl-2 items-center grid-flow-col justify-between"
    >
      <p className="text-xl">Poolcar</p>
     {isMobile ? (
      <nav className="w-[65vw]">
      <ul className="flex list-none justify-evenly items-center">
        <li>
          <ToggleButton />
        </li>
        <li className="hover:cursor-pointer hover:border-b-2">
           <NestedMenu MenuItems={MoblieMenu} triggerName="Menu"  />
        </li>
        {(profile != null && profile) ? (
          <li onClick={() => setSlider(true)}>
          <Avatar>
            <AvatarImage src={profile}></AvatarImage>
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
      </li>
        ) : (
          <NestedMenu MenuItems={UserLoginRegister} triggerName="User"/>
        )}
        </ul>
        </nav>
     ) : 
     (
     <nav className="w-[40vw]">
        <ul className="flex list-none justify-evenly items-center">
          <li>
            <ToggleButton />
          </li>
          <li className="hover:cursor-pointer hover:border-b-2">Home</li>
          <li className="hover:cursor-pointer hover:border-b-2">
            <NestedMenu MenuItems={NestMenuArr} triggerName="Car" />
          </li>
          <li className="hover:cursor-pointer hover:border-b-2">
            <Link href={"/Bookcar"}>Book car</Link>
          </li>
          {(profile!= null && profile) ? (
            <li onClick={() => setSlider(true)}>
                <Avatar>
                  <AvatarImage src={profile}></AvatarImage>
                  <AvatarFallback>Profile</AvatarFallback>
                </Avatar>
            </li>
          ):(
            <>
              <li className="hover:cursor-pointer hover:border-b-2">
                <Link href={"/login"}>Login</Link>
              </li>
              <li className="hover:cursor-pointer hover:border-b-2">
                <Link href={"/register"}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    )}
      {slider && (
        <Slider open={slider} setOpen={setSlider} />
      )}
    </div>
  );
};
