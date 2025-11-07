"use client";

import React, { ReactNode, useState } from "react";

interface InteractiveCardProps {
  children: ReactNode;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ children }) => {
  // const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      // onMouseOver={() => setIsHovered(true)}
      // onMouseOut={() => setIsHovered(false)}
      className={`rounded-lg w-full ${
        // isHovered
        // ? "shadow-2xl bg-neutral-200/30 backdrop-blur-xs"
        "shadow-xl shadow-black/30 bg-white/20 backdrop-blur-sm border border-white/20"
      }`}
    >
      {children}
    </div>
  );
};

export default InteractiveCard;
