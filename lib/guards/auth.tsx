'use client';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/router';
import Loader from '@/components/common/loader';

// components

export default function Guest({ children }: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector(({ user }) => user);
  const [isAuth, setAuth] = useState(true);
  
  useEffect(() => {
    if (!isAuthenticated) {
      setAuth(false);
      router.push('/auth/sign-in');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (!isAuth) {
    return <Loader />;
  }

  return children;
}


