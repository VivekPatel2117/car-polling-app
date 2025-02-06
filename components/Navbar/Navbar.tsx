
"use client"
import Link from "next/link";
import { ToggleButton } from "../ToogleButton";
import { NestedMenu } from "../NestedMenu/NestedMenu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const Navbar = () => {
  const router = useRouter();
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
        router.push("/manageorders");
      },
    },
    {
      name: "Your orders",
      clickFunc: () => {
        router.push("/orders");
      },
    },
  ];
  const [profile, setProfile] = useState<string>("");
  useEffect(() => {
    const profileImg = localStorage.getItem("profile");
    if(profileImg){
      setProfile(profileImg)
    }
  }, [])
  
  return (
    <div
      className="overflow-hidden 
    w-full border h-20 dark:bg-black grid pl-2 items-center grid-flow-col justify-between"
    >
      <p className="text-xl">Poolcar</p>
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
            <li>
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
    </div>
  );
};
