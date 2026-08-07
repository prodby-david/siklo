"use client";

import React from "react";

export function DotsBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#2d466d_1px,transparent_1px)] [background-size:16px_16px] z-0"
      aria-hidden="true"
    />
  );
}

export default DotsBackground;
