"use client"

import useAuth from '@/hooks/useAuth';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user) {
        router.replace(`/login?from=${pathname}`);
      }
  }, [loading, user, router,pathname]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return children;
  }
  
  return null;
};

export default PrivateRoute;
