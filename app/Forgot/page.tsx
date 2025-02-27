"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { InputOTPForm } from "@/components/otp/Inputotp";
export default function page() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const handleFormSubmit = (e: React.FormEvent) => {
    setIsLoading(true)
    e.preventDefault();
    if (!email) {
      toast({
        variant: "destructive",
        description: "Enter email please",
      });
    }
    axios
      .post("/api/forgot", { email })
      .then((res) => {
        if (res.status === 200) {
          setIsOtpSent(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        toast({
          description:`Error occured: ${err}`
        });
        setIsLoading(false);
        setIsOtpSent(false);
      });
  };
  return (
    <React.Fragment>
      {isOtpSent ? (
        <InputOTPForm />
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className="h-screen w-screen justify-center flex items-center"
        >
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Reset your password</CardTitle>
              <CardDescription>
                Will send a OTP to verify the email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="email"
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Link href={"/login"}>Cancel</Link>
              </Button>
              <Button type="submit">
                {isLoading ? <Spinner isOpen={isLoading} /> : "Send Mail"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </React.Fragment>
  );
}
