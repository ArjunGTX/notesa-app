import React from "react";

export const Logo = ({ className }) => {
  return (
    <div className={`txt-primary logo font-bold ${className ? className : ""}`}>
      Not<span className="txt-medium logo font-medium">Edd</span>
    </div>
  );
};
