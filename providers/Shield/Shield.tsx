import { useRouter } from 'next/router';
import FullPageLoader from '@components/atoms/FullPageLoader';
import { PUBLIC_ROUTES, ROUTES } from '@constants/routes';
import { useAuth } from '@providers/AuthProvider';
import { useEffect, useMemo } from 'react';

function Shield({ children }: { children: React.ReactNode }): JSX.Element {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const loggedInWithPublicRoute = useMemo(() => {
    const currentRoute = router.asPath as typeof PUBLIC_ROUTES[number];

    return PUBLIC_ROUTES.includes(currentRoute) && user && !isLoading;
  }, [router.asPath, user, isLoading]);

  useEffect(() => {
    if (loggedInWithPublicRoute) {
      router.push(ROUTES.COMMUNITY_COMPONENTS);
    }
  }, [loggedInWithPublicRoute, user]);

  return isLoading || loggedInWithPublicRoute ? <FullPageLoader /> : <>{children}</>;
}

export default Shield;
