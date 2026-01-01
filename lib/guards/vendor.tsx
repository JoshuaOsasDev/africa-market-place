'use client';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/redux/store';

// components


export default function Guest({ children }:{
  children: React.ReactNode
}) {
  const router = useRouter();
  const [isVendor, setVendor] = useState(true);
  const { isAuthenticated, user } = useAppSelector(({ user }) => user);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'vendor') {
      setVendor(false);
      toast.error("You're not allowed to access vendor dashboard");
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isVendor) {
    return "Loading...";
  }
  return children;
}


