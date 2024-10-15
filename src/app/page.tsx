'use client'

import { Metadata } from 'next'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title: 'MatchMatrix',
}

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
