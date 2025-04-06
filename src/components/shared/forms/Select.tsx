"use client";

import type { Control, FieldError } from "react-hook-form";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

interface OptionType {
  id: string;
  label: string;
}

interface SelectProps {
  name: string;
  label?: string;
  options: OptionType[];
  control: Control<any>;
  defaultValue?: string;
  error?: FieldError;
  disabled?: boolean;
  required?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  selectedItemClassName?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  control,
  defaultValue = "",
  error,
  disabled = false,
  required = false,
  wrapperClassName = "",
  labelClassName = "",
  dropdownClassName = "",
  optionClassName = "",
  selectedItemClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      render={({ field }) => {
        const selected = field.value || "";

        const handleSelect = (id: string) => {
          field.onChange(id);
          setIsOpen(false);
        };

        return (
          <div
            className={`relative w-full ${wrapperClassName}`}
            ref={dropdownRef}
          >
            {label && (
              <label
                htmlFor={name}
                className={clsx(
                  "absolute transition-all duration-300 text-secondary-dark font-medium z-[1]",
                  {
                    "-top-[10px] ltr:left-3 rtl:right-3 text-sm bg-bg-light px-1":
                      isFocused || selected,
                    "top-1/2 ltr:left-5 rtl:right-5 -translate-y-1/2 text-secondary-dark !leading-4":
                      !isFocused && !selected,
                  },
                  labelClassName,
                )}
              >
                {label} {required && "*"}
              </label>
            )}

            <div
              onBlur={() => setIsFocused(!!selected)}
              onClick={() => !disabled && setIsOpen(!isOpen)}
              onFocus={() => setIsFocused(true)}
              className={clsx(
                "relative flex items-center justify-between border-[1.5px] border-lighter-blue rounded-xl bg-white px-4 py-4 text-primary-dark font-medium cursor-pointer transition-all duration-300",
                {
                  "opacity-50 cursor-not-allowed": disabled,
                },
              )}
            >
              <div className="relative w-full flex gap-2 overflow-hidden">
                <span
                  className={`text-primary-dark text-nowrap ${selectedItemClassName}`}
                >
                  {options.find((opt) => opt.id === selected)?.label}
                </span>
              </div>

              <ChevronDown
                className={`text-secondary-dark w-5 h-5 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            <div
              className={clsx(
                "absolute left-0 mt-2 max-h-48 w-full max-w-80 px-1 py-1.5 bg-bg-light bg-opacity-80 backdrop-blur-2xl overflow-auto border border-gray-300 rounded-lg shadow-lg z-50 transition-all duration-300 custom-blur-bg",
                {
                  "opacity-100 translate-y-0 pointer-events-auto": isOpen,
                  "opacity-0 translate-y-4 pointer-events-none": !isOpen,
                },
                dropdownClassName,
              )}
            >
              {options.map((option) => (
                <label
                  className={`flex gap-x-3.5 px-2 py-1.5 hover:bg-gray-200 hover:bg-opacity-30 rounded-lg cursor-pointer ${optionClassName}`}
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                >
                  <span>{option.label}</span>
                </label>
              ))}
            </div>

            {error && (
              <p className="text-red-600 text-sm mt-1">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default Select;
