import React from "react";

export const MainContainer = ({ className, children }) => {
  return (
    <div
      className={`fc-fs-ct p-xl main-container ofy-auto ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};
