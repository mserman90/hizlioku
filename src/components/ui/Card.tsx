import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  childFriendly?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  childFriendly = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-slate-900 border rounded-2xl p-6 transition-all",
        childFriendly
          ? "border-amber-200 dark:border-amber-900/60 shadow-lg shadow-amber-100 dark:shadow-none rounded-3xl"
          : "border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
