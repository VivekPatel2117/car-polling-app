"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Footer from "@/components/Footer/Footer";
export default function ContactPage() {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/contact-us",{
        email,
        message,
        name
    })
    alert("Support Message sent!")
  };

  return (
    <div className="container py-6 w-screen h-screen grid justify-center items-center">
      <h1 className="scroll-m-20 text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
        Contact Us
      </h1>
      <p className="leading-7 text-center [&:not(:first-child)]:mt-6">
        If you have any questions or feedback, feel free to reach out to us.
      </p>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 grid justify-center">
        {/* Name */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your Name"
            className="mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="How can we help you?"
            className="mt-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit">Send</Button>
      </form>
      <Footer/>
    </div>
  );
}
