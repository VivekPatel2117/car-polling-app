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
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { useSearchParams } from "next/navigation";
export default function ResetPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!newPassword || !confirmPassword) {
      toast({
        variant: "destructive",
        description: "Please enter both passwords",
      });
      setIsLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        description: "Passwords do not match",
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/forgot/reset", { email,newPassword });

      if (res.status === 200) {
        toast({
          variant: "default",
          description: "Password reset successfully!\n Please continue to login...",
        });
        router.push("/login")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error resetting password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleResetPassword}
      className="h-screen w-screen flex justify-center items-center"
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>Enter a new password to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Link href={"/login"}>Cancel</Link>
          </Button>
          <Button type="submit">
            {isLoading ? <Spinner isOpen={isLoading} /> : "Reset Password"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
