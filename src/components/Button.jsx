import React from "react";

export const Button = ({ children, variant, color, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-lg py-sm br-sm font-medium cursor-pointer ${
        variant === "contained"
          ? `bg-${color} txt-light bd-none`
          : `txt-${color}`
      } ${
        variant === "outlined" ? `bd-${color}` : `txt-${color}`
      } hover-${color} ${className ? className : ""}`}
    >
      {children}
    </button>
  );
};
