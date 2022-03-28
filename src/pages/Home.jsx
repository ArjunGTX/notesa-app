import React from "react";
import { Header, MainContainer, SideNav } from "../components";

export const Home = () => {
  return (
    <div className="full-page">
      <Header />
      <SideNav />
      <MainContainer></MainContainer>
    </div>
  );
};
