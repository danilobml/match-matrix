'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem('RAS_USER');

    if (!user) {
      router.push('/login');
    } else {
      router.push('/home');
    }
  }, [router]);

  return null;
}
