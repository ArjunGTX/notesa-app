import React from "react";
import { GrFormClose } from "react-icons/gr";

export const Label = ({ className, children }) => {
  return (
    <div
      className={`br-sm px-sm bg-light fr-fs-ct txt-xs ${
        className ? className : ""
      }`}
    >
      {children}
      <button className="ml-xs">
        <GrFormClose className="txt-xs" />
      </button>
    </div>
  );
};
