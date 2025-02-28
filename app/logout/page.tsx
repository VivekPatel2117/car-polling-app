"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      localStorage.removeItem('token'); // Clear the token from localStorage
      router.push('/login'); // Navigate to the login page
    }
  }, [isMounted, router]);

  return (
    <div>Logging out...</div>
  );
}