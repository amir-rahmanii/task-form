import React from "react";

interface SwitchProps {
  isChecked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ isChecked, onChange, disabled }) => {
  return (
    <div
      onClick={!disabled ? onChange : undefined}
      className={`relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in border ${
        isChecked ? "bg-blue-500" : "bg-gray-300"
      } rounded-full cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div
        className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition duration-200 ease-in-out ${
          isChecked ? "-translate-x-0" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default Switch;
