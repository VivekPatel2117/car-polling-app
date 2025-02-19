"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Spinner from "../Spinner";
import SkeletonLoader from "./Loader";

interface SliderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface User {
  id: string;
  username: string;
  email: string;
  profile: string;
}

export default function Slider({ open, setOpen }: SliderProps) {
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User>({
    id: "",
    username: "",
    email: "",
    profile: "",
  });

  // Fetch user info
  const handleGETUser = async (token: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setUserInfo(response.data as User);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save user info
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        "/api/user",
        { username: userInfo.username, email: userInfo.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Profile updated successfully!");
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      const tokenData = localStorage.getItem("token");
      if (tokenData) {
        handleGETUser(tokenData);
        setToken(tokenData);
      }
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <React.Fragment>
            <div className="flex justify-center">
              <Avatar className="h-[10vh] w-[10vh] mt-2 mb-2">
                <AvatarImage src={userInfo.profile} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Username
                </Label>
                <Input
                  id="name"
                  value={userInfo.username}
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
            </div>
          </React.Fragment>
        )}
        <SheetFooter>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? <Spinner isOpen={isLoading} /> : "Save changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
