import React from "react";
import { Logo } from "./Logo";
import { AiOutlineMenu } from "react-icons/ai";
import { useSideNav } from "../contexts";

export const Header = ({ className }) => {
  const { toggleSideNav } = useSideNav();
  return (
    <header
      className={`full-width sticky-top fr-fs-ct p-xl bg-light header ${
        className ? className : ""
      }`}
    >
      <button onClick={() => toggleSideNav(true)} className="ml-lg menu-btn">
        <AiOutlineMenu className="txt-xl" />
      </button>
      <div className="ml-xl pl-xl">
        <Logo />
      </div>
    </header>
  );
};
