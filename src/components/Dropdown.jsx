import React, { useState, useEffect, useRef } from "react";
import { useClickOutside } from "../utils/hooks";
import { GrFormClose } from "react-icons/gr";
import { AiFillPlusCircle } from "react-icons/ai";
import { Input } from "./Input";
import { useLabels } from "../contexts";

export const Dropdown = ({
  options,
  className,
  name,
  onChange,
  onClose,
  value,
}) => {
  const { labels, setLabels } = useLabels();

  const [selectedOptions, setSelectedOptions] = useState(value);
  const [newLabel, setNewLabel] = useState("");

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

  const handleInputChange = (e) => setNewLabel(e.target.value);

  const addNewLabel = () => {
    if (
      labels.some((label) => label.toLowerCase() === newLabel.toLowerCase()) ||
      !newLabel
    )
      return;
    setLabels((labels) => [...labels, newLabel]);
    setNewLabel("");
  };

  return (
    <div
      ref={dropDownRef}
      className={`p-md br-sm shadow-medium bg-light fc-fs-fs pos-abs dropdown ${
        className ? className : ""
      }`}
    >
      <button onClick={onClose} className="ml-auto">
        <GrFormClose className="txt-md" />
      </button>
      <div className="full-width full-height ofy-auto fc-fs-ct">
        {options?.map((option, index) => (
          <label
            key={index}
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
      <div className="fr-ct-fe full-width">
        <Input
          value={newLabel}
          onChange={handleInputChange}
          placeholder="Add new Label"
          className="txt-xs"
        />
        <button onClick={addNewLabel} className="ml-auto">
          <AiFillPlusCircle className="txt-md" />
        </button>
      </div>
    </div>
  );
};
