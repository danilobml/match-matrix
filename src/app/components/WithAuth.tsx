'use client';

import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const user = sessionStorage.getItem('RAS_USER');

      if (!user) {
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};

export default WithAuth;
