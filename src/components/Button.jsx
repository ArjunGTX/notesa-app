import React from "react";

export const Button = ({
  children,
  variant,
  color,
  className,
  onClick,
  type,
}) => {
  return (
    <button
      type={type ? type : "submit"}
      onClick={onClick}
      className={`px-lg py-sm br-sm font-medium cursor-pointer ${
        variant === "contained"
          ? `bg-${color} txt-light bd-none hover-${color}`
          : `txt-${color}`
      } ${variant === "outlined" ? `bd-${color}` : `txt-${color}`} ${
        className ? className : ""
      }`}
    >
      {children}
    </button>
  );
};
