"use client";
import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";

// redux

// components

export default function Guest({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAdmin, setAdmin] = useState(true);
  const { isAuthenticated, user } = useAppSelector(({ user }) => user);

  useEffect(() => {
    /*  if (!isAuthenticated || !user.role === 'super-admin' || !user.role === 'admin') {
      setAdmin(false);
      toast.error("You're not allowed to access dashboard");
      router.push('/auth/sign-in');
    } */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAdmin) {
    return "Loading...";
  }
  return children;
}
