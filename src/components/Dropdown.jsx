import React, { useState, useEffect, useRef } from "react";
import { useClickOutside } from "../utils/hooks";
import { GrFormClose } from "react-icons/gr";

export const Dropdown = ({
  options,
  className,
  name,
  onChange,
  onClose,
  value,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(value);

  const dropDownRef = useRef(null);

  useClickOutside(dropDownRef, onClose);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  const handleOptionChange = (e) =>
    e.target.checked
      ? setSelectedOptions((selectedOptions) => [
          ...selectedOptions,
          e.target.value,
        ])
      : setSelectedOptions((selectedOptions) =>
          selectedOptions.filter((option) => option !== e.target.value)
        );

  return (
    <div
      ref={dropDownRef}
      className={`p-md br-sm shadow-medium bg-light fc-fs-fs pos-abs ${
        className ? className : ""
      }`}
    >
      <button onClick={onClose} className="ml-auto">
        <GrFormClose className="txt-md" />
      </button>
      {options?.map((option, index) => (
        <label
          className="fr-fs-ct cursor-pointer py-sm px-xl br-sm hover-light txt-xs full-width"
          htmlFor={option}
        >
          <input
            key={index}
            type="checkbox"
            value={option}
            id={option}
            checked={selectedOptions.includes(option)}
            name={name}
            onChange={handleOptionChange}
            className="mr-sm"
          />
          {option}
        </label>
      ))}
    </div>
  );
};
