import React from "react";

const inputTagClasses = {
  smallInput:
    "bg-transparent border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500  text-green-500",

  largeInput:
    "bg-transparent block p-4  w-full h-24   rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500  text-green-500",
};

const Input = ({
  inputTagType,
  placeholder,
  onChange,
  value,
  name,
  type = "text",
  required = false,
}) => (
  <div>
    {inputTagType === "smallInput" ? (
      <input
        type={type}
        className={inputTagClasses[inputTagType]}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    ) : (
      <textarea
        className={inputTagClasses[inputTagType]}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    )}
  </div>
);

export default Input;
