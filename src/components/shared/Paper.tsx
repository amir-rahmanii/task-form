import type { ReactNode } from "react";

import clsx from "clsx";

interface PropsType {
  children?: ReactNode;
  className?: string;
}

const Paper = ({ className, children }: PropsType) => {
  return (
    <div
      className={clsx(
        "relative w-full rounded-xl bg-bg-light shadow-paper overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Paper;
