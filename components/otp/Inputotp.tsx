"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import axios from "axios"
export function InputOTPForm() {
  const [otp, setOtp] = useState("")
const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast({ description: "Please enter a valid 6-digit OTP." })
      return
    }
    const response = await axios.post("/api/forgot/verify",{
        otp:otp
    });
    if(response.status === 201){
        const data = response.data as { email: string }; // Type assertion
        toast({ variant:"default",
            description: `OTP validation successfull! \n Please wait while we are navigating you...` })
        router.push(`/reset?email=${data.email}`)
    }else{
        toast({ variant:"destructive",
            description: `Invalid OTP` })
    }
  }

  return (
    <div className="w-screen grid justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="w-2/3 space-y-6">
        <Label>One-Time Password</Label>
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
            {[...Array(6)].map((_, index) => (
                <InputOTPSlot key={index} index={index} />
            ))}
            </InputOTPGroup>
        </InputOTP>
        <p>Please enter the one-time password sent to your phone.</p>
        <Button type="submit">Submit</Button>
        </form>
    </div>
  )
}
