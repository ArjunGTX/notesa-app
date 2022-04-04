import React from "react";
import { GrFormClose } from "react-icons/gr";

export const Label = ({ className, label, onRemove }) => {
  return (
    <div
      onClick={() => onRemove(label)}
      className={`br-sm px-sm bg-light fr-fs-ct txt-xs cursor-pointer ${
        className ? className : ""
      }`}
    >
      {label}
      <button className="ml-xs">
        <GrFormClose className="txt-xs" />
      </button>
    </div>
  );
};
