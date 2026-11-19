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
        "bg-white border rounded-2xl p-6 transition-all",
        childFriendly
          ? "border-amber-200 shadow-lg shadow-amber-100 rounded-3xl"
          : "border-slate-200 shadow-sm hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
