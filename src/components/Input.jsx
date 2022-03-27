import React from "react";

export const Input = ({
  type,
  placeholder,
  id,
  name,
  onChange,
  value,
  disabled,
  autoComplete,
  className,
}) => {
  return (
    <input
      type={type ? type : "text"}
      placeholder={placeholder ? placeholder : ""}
      id={id ? id : ""}
      className={`full-width ul-primary px-lg py-sm font-medium ${
        className ? className : ""
      }`}
      name={name ? name : ""}
      value={value ? value : ""}
      disabled={disabled ? disabled : false}
      autoComplete={autoComplete ? autoComplete : "new-password"}
      onChange={onChange}
    />
  );
};
