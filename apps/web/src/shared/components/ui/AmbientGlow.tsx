import React from "react";

interface AmbientGlowProps {
  position?: "top-left" | "bottom-right" | "both";
  className?: string;
}

export default function AmbientGlow({
  position = "both",
  className = "",
}: AmbientGlowProps) {
  return null;
}
