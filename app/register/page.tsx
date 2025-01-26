"use client"
import { RegisterForm } from "@/components/register-form"
import { useToast } from "@/hooks/use-toast"

export default function Page() {
  const {toast} = useToast();
  const handleFormSubmit = (formData: { email: string; password: string }) => {
   toast({
    description:`${formData.email}-${formData.password}`
   })
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm onFormSubmit={handleFormSubmit} />
      </div>
    </div>
  )
}
