"use client";

import type { Control, FieldError } from "react-hook-form";

import Image from "next/image";
import React from "react";
import { Controller } from "react-hook-form";

interface PropsType {
  id?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  control: Control<any>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelClassName?: string;
  errorClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  error?: FieldError | undefined;
  type?: string;
  required?: boolean;
  divider?: boolean;
  isPasswordVisible?: boolean;
  togglePasswordVisibility?: () => void;
}

const TelInput: React.FC<PropsType> = ({
  id = "",
  name,
  label = "",
  error,
  control,
  onChange = () => {},
  disabled = false,
  placeholder = "",
  required = false,
  labelClassName = "",
  errorClassName = "",
  inputClassName = "",
  wrapperClassName = "",
}) => {
  return (
    <div
      className={`${wrapperClassName} relative w-full flex flex-col items-center sm:items-start gap-y-1`}
    >
      <div className="relative w-full flex items-center gap-x-2">
        {label && (
          <label
            htmlFor={id || name}
            className={`${labelClassName} absolute transition-all duration-300 -top-2.5 ltr:left-3 rtl:right-3 text-sm px-1.5 before:bg-opacity-100 before:w-full text-secondary-dark font-medium capitalize z-[1] ${
              disabled && "text-opacity-50"
            } before:absolute before:left-0 before:top-1/2 before:translate-y-[-0.5px] before:h-0.5 before:bg-bg-light transition-all duration-300 ${
              error ? "!text-error" : ""
            }`}
          >
            <span className="relative">{label}</span>{" "}
            <span className="relative">{required && "*"}</span>
          </label>
        )}

        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <div className="relative w-full z-0">
                <Image
                  height={64}
                  width={64}
                  alt="ae flag"
                  className="w-7 absolute left-5 top-1/2 -translate-y-1/2 z-10"
                  src="https://www.world-api.ir/v1/countries/flag/IR.svg"
                  priority
                />

                <span
                  dir="ltr"
                  className={`w-9 absolute left-14 top-1/2 -translate-y-1/2 text-primary-dark z-10 ${
                    disabled && "opacity-50"
                  }`}
                >
                  +98
                </span>

                <input
                  dir="ltr"
                  {...field}
                  disabled={disabled}
                  id={id || name}
                  type="tel"
                  value={field.value}
                  inputMode="tel"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    onChange(e);
                  }}
                  placeholder={placeholder}
                  className={`${inputClassName} relative w-full outline-none border border-lighter-blue rounded-xl bg-white pr-12 pl-24 py-4 text-[16px] text-primary-dark transition-all duration-300 ${
                    error ? "!border-error bg-error bg-opacity-5" : ""
                  } disabled:text-opacity-50 focus:border-primary-dark transition-all duration-300`}
                />
              </div>
            );
          }}
        />
      </div>

      {error && (
        <div
          className={`${errorClassName} w-full pr-4 text-sm h-5 py-1 pl-4 text-red-500 text-start`}
        >
          {error.message || ""}
        </div>
      )}
    </div>
  );
};

export default TelInput;
