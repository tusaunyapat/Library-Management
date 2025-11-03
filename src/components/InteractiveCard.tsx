"use client";

import React, { ReactNode, useState } from "react";

interface InteractiveCardProps {
  children: ReactNode;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`rounded-lg w-full ${
        isHovered ? "shadow-2xl bg-neutral-200" : "shadow-lg bg-white"
      }`}
    >
      {children}
    </div>
  );
};

export default InteractiveCard;
