import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';

import ConfigurationRoutes from '../Configuration/ConfigurationRoutes';
import PackRoutes from '../Packs/PackRoutes';
import PaymentRoutes from '../Paiement/PaymentRoutes';
import { useAccount } from '../account/account.service';
import BillingRoutes from '../billing/BillingRoutes';
import CompanyRoutes from '../company/CompanyRoutes';
import {
  AdminRouteGuard,
} from '../router/guards';
import { EmployerRouteGuard } from '../router/guards/EmployerRouteGuard';

const AdminUsersRoutes = React.lazy(
  () => import('@/spa/admin/users/AdminUsersRoutes')
);

const AdminRoutes = () => {
  const { isLoading: accountLoading } = useAccount();
  return (
    <Routes>
      {!accountLoading && (
        <>
          
          <Route
            path="settings/users/*"
            element={
              <EmployerRouteGuard>
                <AdminUsersRoutes />
              </EmployerRouteGuard>
            }
          />
          <Route
            path="settings/Pack/*"
            element={
              <AdminRouteGuard>
                <PackRoutes />
              </AdminRouteGuard>
            }
          />
          <Route
            path="settings/payment/*"
            element={
              <EmployerRouteGuard>
                <PaymentRoutes />{' '}
              </EmployerRouteGuard>
            }
          />
          <Route
            path="settings/billing/*"
            element={
              <EmployerRouteGuard>
                <BillingRoutes />
              </EmployerRouteGuard>
            }
          />
          <Route
            path="settings/configuration/*"
            element={
              <AdminRouteGuard>
                <ConfigurationRoutes />
              </AdminRouteGuard>
            }
          />
          <Route path="settings/company/*" element={<CompanyRoutes />} />
          <Route path="*" element={<ErrorPage errorCode={404} />} />
        </>
      )}
    </Routes>
  );
};

export default AdminRoutes;
