import React from "react";
import { Link } from "react-router-dom";

export const Logo = ({ className }) => {
  return (
    <Link to="/">
      <div
        className={`txt-primary logo font-bold ${className ? className : ""}`}
      >
        Not<span className="txt-medium logo font-medium">Edd</span>
      </div>
    </Link>
  );
};
