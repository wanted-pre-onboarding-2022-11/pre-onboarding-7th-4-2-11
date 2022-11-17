import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTE_PATH from "./routerPaths";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import DetailPage from "../pages/DetailPage";
import ProtectedRoute from "./AuthorizationRouter";
import Layout from "../components/Layout/Layout";
import UserPage from "../pages/UserPage";
import UserInfoPage from "../pages/UserInfoPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTE_PATH.LOGIN}
          element={
            <ProtectedRoute isTokenRequired redirectPath={ROUTE_PATH.BASE}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route element={<Layout />}>
          <Route
            path={ROUTE_PATH.BASE}
            element={
              <ProtectedRoute isTokenRequired={false} redirectPath={ROUTE_PATH.LOGIN}>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTE_PATH.DETAIL}`}
            element={
              <ProtectedRoute isTokenRequired={false} redirectPath={ROUTE_PATH.LOGIN}>
                <DetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTE_PATH.USER}`}
            element={
              <ProtectedRoute isTokenRequired={false} redirectPath={ROUTE_PATH.LOGIN}>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTE_PATH.USER}/:id`}
            element={
              <ProtectedRoute isTokenRequired={false} redirectPath={ROUTE_PATH.LOGIN}>
                <UserInfoPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={ROUTE_PATH.NOT_FOUND} element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
