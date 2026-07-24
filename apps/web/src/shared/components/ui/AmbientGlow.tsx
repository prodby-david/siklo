import React from "react";

interface AmbientGlowProps {
  position?: "top-left" | "bottom-right" | "both";
  className?: string;
}

export default function AmbientGlow({
  position = "both",
  className = "",
}: AmbientGlowProps) {
  return (
    <>
      {(position === "top-left" || position === "both") && (
        <div
          className={`absolute top-1/4 -left-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none ${className}`}
        />
      )}
      {(position === "bottom-right" || position === "both") && (
        <div
          className={`absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none ${className}`}
        />
      )}
    </>
  );
}
