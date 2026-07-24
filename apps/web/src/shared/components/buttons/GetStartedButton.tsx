"use client";

import React from "react";
import Link from "next/link";
import { Coins } from "lucide-react";
import { motion } from "framer-motion";

interface GetStartedButtonProps {
  text?: string;
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function GetStartedButton({
  text = "Get Started",
  href = "/signin",
  className = "",
  size = "md",
  icon,
  onClick,
}: GetStartedButtonProps) {
  const sizeStyles = {
    sm: "h-8 px-3.5 text-xs font-bold gap-1.5",
    md: "h-11 px-6 text-xs sm:text-sm font-extrabold gap-2",
    lg: "h-12 px-8 text-sm sm:text-base font-extrabold gap-2.5",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const defaultIcon = <Coins className={iconSizes[size]} />;

  const content = (
    <>
      {icon ? icon : defaultIcon}
      <span>{text}</span>
    </>
  );

  const baseStyles = `flex items-center justify-center rounded-2xl bg-brand-accent text-white hover:bg-brand-accent-hover cursor-pointer transition-all duration-150 shadow-md hover:shadow-brand-accent/20 ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-block"
      >
        <Link href={href} onClick={onClick} className={baseStyles}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={baseStyles}
    >
      {content}
    </motion.button>
  );
}
