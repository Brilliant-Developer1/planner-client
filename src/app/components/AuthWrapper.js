import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';

const AuthWrapper = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('/') || '/';

  useEffect(() => {
    if (user) {
      router.replace(from);
    }
  }, [user, from, router]);

  return children;
};

export default AuthWrapper;
