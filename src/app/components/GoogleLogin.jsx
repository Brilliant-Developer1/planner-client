'use client';
import useAuth from '@/hooks/useAuth';
import { Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

const GoogleLogin = () => {
  const router = useRouter();
  const { googleLogin } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      const redirect = router.query.redirect || '/';
      router.push(redirect);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="btn btn-primary rounded-lg w-full"
    >
      <div className="flex items-center gap-2">
        <Mail />
        <p>Google</p>
      </div>
    </button>
  );
};

export default GoogleLogin;
