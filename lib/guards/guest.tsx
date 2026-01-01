'use client';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/redux/store';



Guest.propTypes = {
  children: PropTypes.node.isRequired
};
export default function Guest({ children }: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector(({ user }) => user);
  const [isAuth, setAuth] = useState(true);
  useEffect(() => {
    if (isAuthenticated) {
      setAuth(false);

      const isAdmin = user?.role?.includes('admin');
      const isVendor = user?.role?.includes('vendor');
      router.push(isAdmin ? '/admin/dashboard' : isVendor ? '/vendor/dashboard' : '/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isAuth) {
    return "Loading";
  }
  return children;
}
