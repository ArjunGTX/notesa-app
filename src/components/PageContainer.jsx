import React from "react";
import { Header } from "./Header";
import { MainContainer } from "./MainContainer";
import { SideNav } from "./SideNav";

export const PageContainer = ({ children }) => {
  return (
    <div className="full-page">
      <Header />
      <SideNav />
      <MainContainer>{children}</MainContainer>
    </div>
  );
};
