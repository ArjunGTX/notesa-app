import React from "react";
import { GoAlert } from "react-icons/go";

export const InputAlert = ({ message, className }) => {
  return (
    <div className={`fr-ct-ct input-alert ${className ? className : ""}`}>
      <GoAlert className="icon-md icon-error" />
      <p className="txt-error">{message}</p>
    </div>
  );
};
