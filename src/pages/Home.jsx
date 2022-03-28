import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Logo, SideNav } from "../components";

export const Home = () => {
  return (
    <div className="full-page">
      <Header/>
      <SideNav/>
    </div>
  );
};
