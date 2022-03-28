import React from "react";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header className="full-width grid sticky-top p-xl bg-light">
      <div className="grid-col-2 fr-ct-ct">
        <Logo />
      </div>
    </header>
  );
};
