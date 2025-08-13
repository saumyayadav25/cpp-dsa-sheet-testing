"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = "solid",
  size = "md",
  icon,
  href,
  onClick,
  className,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200";
  const variants = {
    solid:
      "bg-blue-600 text-white hover:bg-blue-700 active:scale-95",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 active:scale-95",
  };
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const handleClick = (e: React.MouseEvent) => {
    if (href) {
      e.preventDefault();
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
}
