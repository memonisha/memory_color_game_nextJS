// src/components/ColoredSquare.tsx

import React from 'react';

type ColoredSquareProps = {
  color: string;        // Tailwind color like 'red-500'
  isActive?: boolean;   // If true, add glow effect
  onClick?: () => void; // Optional click handler
};

const ColoredSquare: React.FC<ColoredSquareProps> = ({ color, isActive = false, onClick }) => {
  // Compose Tailwind classes
  const baseClasses = `w-24 h-24 rounded-lg cursor-pointer transition-shadow duration-300`;
  const colorClass = `bg-${color}`;
  const activeClass = isActive ? 'shadow-[0_0_15px_5px_rgba(255,255,255,0.7)]' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${colorClass} ${activeClass}`}
      data-testid="colored-square"
    />
  );
};

export default ColoredSquare;
