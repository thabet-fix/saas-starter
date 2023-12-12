import { FC } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useAccount } from '@/spa/account/account.service';

export const EmployerAndManagerRouteGuard: FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const { isEmployer, isManager, isLoading } = useAccount();

  if (isLoading) {
    return null;
  }

  if (!isEmployer && !isManager) {
    return <ErrorPage errorCode={403} />;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
};
