import type { ReactNode } from "react";

import Link from "next/link";

interface PropsType {
  onClick?: any;
  href?: string;
  target?: string;
  variant?: "contained" | "outlined";
  className?: string;
  wrapperClassName?: string;
  loading?: boolean;
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  tooltip?: string; // Added tooltip prop
}

const PrimaryButton = ({
  href,
  disabled,
  children,
  onClick,
  type,
  className = "",
  loading,
  target = "_self",
  variant = "contained",
  wrapperClassName = "",
  tooltip,
}: PropsType) => {
  const isContained = variant === "contained";

  const buttonClassName = `${className} group w-full relative border border-primary-dark rounded-2xl px-4 sm:px-6 py-4 ${
    isContained
      ? "text-primary-light bg-primary-dark hover:bg-opacity-90 hover:disabled:bg-opacity-100 hover:disabled:text-primary-light"
      : "text-primary-dark bg-primary-light hover:bg-primary-dark hover:bg-opacity-10 hover:disabled:bg-opacity-0"
  } font-semibold text-sm disabled:opacity-50 flex items-center justify-center transition-all duration-300 overflow-hidden`;

  const tooltipClassName =
    "absolute top-[110%] left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs bg-gray-700 text-white rounded-md opacity-0 group-hover/wrapper:opacity-100 transition-opacity duration-300 delay-200 z-10 whitespace-nowrap capitalize z-10 cursor-default";

  if (href)
    return (
      <div className={`group/wrapper relative block ${wrapperClassName}`}>
        <Link className={buttonClassName} href={href} target={target}>
          {children}
          {loading && (
            <div className="absolute left-0 top-0 w-full h-full bg-primary-dark flex items-center justify-center">
              <div className="loading-spinner" />
            </div>
          )}
        </Link>
        {tooltip && <div className={tooltipClassName}>{tooltip}</div>}
      </div>
    );

  return (
    <div className={`group/wrapper relative block ${wrapperClassName}`}>
      <button
        className={buttonClassName}
        disabled={loading ?? disabled}
        type={type ?? "button"}
        onClick={onClick}
      >
        {children}
        {loading && (
          <div className="absolute left-0 top-0 w-full h-full bg-primary-dark flex items-center justify-center">
            <div className="loading-spinner" />
          </div>
        )}
      </button>
      {tooltip && <div className={tooltipClassName}>{tooltip}</div>}
    </div>
  );
};

export default PrimaryButton;
