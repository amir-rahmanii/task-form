/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import type { Control, FieldError } from "react-hook-form";

import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface Props {
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
  error?: FieldError;
  type?: string;
  required?: boolean;
  divider?: boolean;
  isPasswordVisible?: boolean;
  togglePasswordVisibility?: () => void;
}

// eslint-disable-next-line complexity
const Input: React.FC<Props> = ({
  id = "",
  name,
  label = "",
  error,
  control,
  onChange,
  disabled = false,
  placeholder = "",
  required = false,
  defaultValue = "",
  labelClassName = "",
  errorClassName = "",
  inputClassName = "",
  wrapperClassName = "",
  type = "text",
  divider = false,
  isPasswordVisible = false,
  togglePasswordVisibility,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!defaultValue);

  useEffect(() => {
    setHasValue(!!defaultValue);
  }, [defaultValue]);

  return (
    <div
      className={clsx(
        "relative w-full flex flex-col gap-y-1",
        wrapperClassName,
      )}
    >
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={id || name}
            className={clsx(
              "absolute transition-all duration-300 text-secondary-dark font-medium capitalize z-[1]",
              {
                "-top-2.5 ltr:left-3 rtl:right-3 text-sm px-1.5 before:bg-opacity-100 before:w-full":
                  !!placeholder || isFocused || hasValue,
                "top-1/2 ltr:left-5 rtl:right-5 -translate-y-1/2 before:bg-opacity-0 before:w-1/2":
                  !placeholder && !isFocused && !hasValue,
                "text-opacity-50": disabled && !isFocused,
                "!text-error": error,
              },
              "peer-placeholder-shown:top-1/2 peer-placeholder-shown:ltr:left-5 peer-placeholder-shown:rtl:right-5 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:before:bg-opacity-0 peer-placeholder-shown:before:w-1/2",
              "peer-autofill:-top-2.5 peer-autofill:ltr:left-3 peer-autofill:rtl:right-3 peer-autofill:text-sm peer-autofill:px-1.5 peer-autofill:before:bg-opacity-100 peer-autofill:before:w-full",
              "before:absolute before:left-0 before:top-1/2 before:h-0.5 before:bg-bg-light transition-all duration-300",
              labelClassName,
            )}
          >
            <span className="relative">{label}</span>{" "}
            {required && <span className="relative">*</span>}
          </label>
        )}

        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            useEffect(() => {
              setIsFocused(!!field.value);
              setHasValue(!!field.value);
            }, [field.value]);

            return (
              <div className="relative w-full">
                <input
                  {...field}
                  defaultValue={defaultValue}
                  disabled={disabled}
                  id={id || name}
                  onBlur={() => !field.value && setIsFocused(false)}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (divider) {
                      value = value.replace(/[^0-9,]/g, "").replaceAll(",", "");
                    } else if (type === "number") {
                      value = value.replace(/[^0-9]/g, "");
                    }
                    field.onChange(value);
                    onChange?.(e);
                    setHasValue(!!value);
                  }}
                  onFocus={() => setIsFocused(true)}
                  placeholder={placeholder}
                  className={clsx(
                    "peer w-full outline-none border-[1.5px] border-lighter-blue rounded-xl bg-white px-4 py-3.5 text-primary-dark font-medium transition-all duration-300",
                    {
                      "!border-error bg-error bg-opacity-5": error,
                      "disabled:text-opacity-50 focus:border-primary-dark":
                        !error,
                    },
                    inputClassName,
                  )}
                  type={
                    type === "password"
                      ? isPasswordVisible
                        ? "text"
                        : "password"
                      : type === "number"
                        ? "text"
                        : type
                  }
                  value={
                    divider && field.value
                      ? field.value
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : field.value
                  }
                />

                {type === "password" && togglePasswordVisibility && (
                  <button
                    className="absolute inset-y-0 ltr:right-5 rtl:left-5 flex items-center cursor-pointer"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <Eye className="h-[22px] w-[22px] text-secondary-dark" />
                    ) : (
                      <EyeOff className="h-[22px] w-[22px] text-secondary-dark" />
                    )}
                  </button>
                )}
              </div>
            );
          }}
        />
      </div>

      {error && (
        <div
          className={clsx(
            "w-full text-sm h-5 py-0.5 pl-4 text-red-500 text-start",
            errorClassName,
          )}
        >
          {error.message}
        </div>
      )}
    </div>
  );
};

export default Input;
