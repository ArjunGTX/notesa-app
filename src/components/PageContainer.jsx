import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts";
import { Header } from "./Header";
import { MainContainer } from "./MainContainer";
import { SideNav } from "./SideNav";

export const PageContainer = ({ page, requiresAuth }) => {
  const location = useLocation();
  const {
    auth: { isLoggedIn },
  } = useAuth();

  return (
    <>
      {requiresAuth ? (
        isLoggedIn ? (
          <div className="full-page">
            <Header />
            <SideNav />
            <MainContainer>{page}</MainContainer>
          </div>
        ) : (
          <Navigate
            to="/login"
            replace
            state={{
              from: location,
            }}
          />
        )
      ) : (
        page
      )}
    </>
  );
};
