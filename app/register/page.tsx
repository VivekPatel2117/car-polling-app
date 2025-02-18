"use client";
import { RegisterForm } from "@/components/register-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import uploadToSupabaseStorage from "@/lib/uploadToSupabase";
import axios from "axios";
import { useState } from "react";
export default function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleFormSubmit = (formData: {
    email: string;
    password: string;
    file: any;
    username: string;
  }) => {
    setIsLoading(true);
    const fileData = formData.file;
    const fileType = "User";
    uploadToSupabaseStorage({ file: fileData, type: fileType }).then((res) => {
      axios
        .post("/api/register", {
          email: formData.email,
          password: formData.password,
          username: formData.password,
          profile: res,
        })
        .then((response) => {
          if (response.status === 201) {
            toast({
              description: `User registered successfully!`,
            });
            router.push("/login");
          }
        });
    }).catch((err)=>{
      toast({
        variant: "destructive",
        description: "Internal Error occured! \n Try again after sometime",
      });
    }).finally(()=>{
      setIsLoading(false);
    })
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm onFormSubmit={handleFormSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
