import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  bordered?: boolean;
  glowing?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  title,
  bordered = true,
  glowing = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "bg-cyberpunk-dark p-4 rounded-md",
        bordered && "border-2 border-neon-blue",
        glowing && "shadow-lg shadow-neon-blue/20",
        className
      )}
      {...props}
    >
      {title && (
        <div className="mb-3 pb-2 border-b border-neon-blue/30">
          <h3 className="text-lg font-orbitron text-neon-blue">{title}</h3>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;