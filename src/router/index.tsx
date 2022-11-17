import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/common";
import ROUTE_PATH from "./paths";
import { AccountDetailPage, AccountPage, LoginPage, UserDetailPage, UserPage } from "@/pages";
import AuthRoute from "./AuthRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTE_PATH.LOGIN}
          element={
            <AuthRoute isTokenRequired redirectPath={ROUTE_PATH.BASE}>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route element={<Layout />}>
          <Route
            path={ROUTE_PATH.BASE}
            element={
              <AuthRoute isTokenRequired={false} redirectPath={ROUTE_PATH.LOGIN}>
                <AccountPage />
              </AuthRoute>
            }
          />
          <Route
            path={`${ROUTE_PATH.DETAIL}`}
            element={
              <AuthRoute isTokenRequired={false} redirectPath={ROUTE_PATH.LOGIN}>
                <AccountDetailPage />
              </AuthRoute>
            }
          />
          <Route
            path={`${ROUTE_PATH.USER}`}
            element={
              <AuthRoute isTokenRequired={false} redirectPath={ROUTE_PATH.LOGIN}>
                <UserPage />
              </AuthRoute>
            }
          />
          <Route
            path={`${ROUTE_PATH.USER}/:id`}
            element={
              <AuthRoute isTokenRequired={false} redirectPath={ROUTE_PATH.LOGIN}>
                <UserDetailPage />
              </AuthRoute>
            }
          />
        </Route>
        <Route path={ROUTE_PATH.NOT_FOUND} element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
