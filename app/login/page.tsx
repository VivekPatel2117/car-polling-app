"use client";
import { useState } from "react";
import { LoginForm } from "@/components/login-form";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
interface LoginResponse {
  token?: string;
  error?: string;
  profile?: string;
}

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleFormSubmit = (formData: { email: string; password: string }) => {
    setIsLoading(true);
    axios
      .post<LoginResponse>("/api/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          const token = data.token;
          localStorage.setItem("token",token as string)
          localStorage.setItem("profile",data.profile as string)
          toast({
            description: "Login Success",
          });
          router.push("/");
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: "Invalid email or password",
        });
        console.log("Error occured in login: ",err)
        setIsLoading(false);
      });
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onFormSubmit={handleFormSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
