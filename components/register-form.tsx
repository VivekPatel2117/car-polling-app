"use client";
import { useState,useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Spinner from "./Spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Github from "../public/Github.svg";
import GithubDark from "../public/Github-dark.svg";
import Google from "../public/Google.svg";
import GoogleDark from "../public/Google-dark.svg";
import { useToast } from "@/hooks/use-toast";

type RegisterFormProps = React.ComponentPropsWithoutRef<"div"> & {
  onFormSubmit: (formData: { email: string; password: string, file: any, username: string }) => void,
  isLoading: boolean,
};
export function RegisterForm({
  className,
  onFormSubmit,
  isLoading,
  ...props
}: RegisterFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profile, setProfile] = useState<any>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = event.target.files?.[0];
    setFile(fileData)
    if (fileData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result as string);
      };
      reader.readAsDataURL(fileData);
    }
  };
  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !username) {
      toast({
        variant: "destructive",
        description: "Please fill all the feilds",
      });
    }
    onFormSubmit({ email, password, file, username });
  };
  const handleAvatarClick = () => {
    fileInputRef.current?.click(); // Open file input when clicking on avatar
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Button>
                <Image
                  className="text-white"
                  src={
                    localStorage.getItem("theme") === "dark"
                      ? GithubDark
                      : Github
                  }
                  alt="Github"
                  width={20}
                  height={20}
                />{" "}
                Github
              </Button>
              <Button>
                <Image
                  src={
                    localStorage.getItem("theme") === "dark"
                      ? GoogleDark
                      : Google
                  }
                  alt="Google"
                  width={20}
                  height={20}
                />
                Google
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <hr className="flex-1 border-t border-gray-600" />
              <span className="text-sm text-gray-400">OR CONTINUE WITH</span>
              <hr className="flex-1 border-t border-gray-600" />
            </div>
            <form onSubmit={handleForm}>
              <div className="flex justify-center">
                <Avatar onClick={handleAvatarClick} className="h-[10vh] w-[10vh] mt-2 mb-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  <AvatarImage src={profile} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    type="username"
                    placeholder="JohnDoe123"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                {isLoading ? (
                  <Spinner isOpen={isLoading} />
               ): "Create Account"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
