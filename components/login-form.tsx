"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import Google from "../public/Google.svg";
import GoogleDark from "../public/Google-dark.svg";
import GithubDark from "../public/Github-dark.svg"
import Github from "../public/Github.svg";
import Spinner from "./Spinner";

type LoginFormProps = React.ComponentPropsWithoutRef<"div"> & {
  onFormSubmit: (formData: { email: string; password: string }) => void;
  isLoading: Boolean;
};
export function LoginForm({
  className,
  onFormSubmit,
  isLoading,
  ...props 
}: LoginFormProps ) {
  const { toast } = useToast()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if(!email || !password){
      toast({
        variant: "destructive",
        description: "Please fill all the feilds",
      })
    }
    onFormSubmit({ email, password }); 
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                onChange={(e)=>setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/Forgot"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input onChange={(e)=>setPassword(e.target.value)} id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
               {isLoading ? (
                  <Spinner isOpen={isLoading} />
               ): "Login"}
              </Button>
              <div className="grid grid-cols-2 gap-4">
              <Button>
                <Image
                  className="text-white"
                  src={localStorage.getItem("theme") === "dark" ? GithubDark : Github}
                  alt="Github"
                  width={20}
                  height={20}
                />{" "}
                Github
              </Button>
              <Button>
                <Image src={localStorage.getItem("theme") === "dark" ? GoogleDark : Google} alt="Google" width={20} height={20} />
                Google
              </Button>
            </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
