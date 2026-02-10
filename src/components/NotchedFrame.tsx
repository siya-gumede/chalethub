import React from 'react';

interface NotchedFrameProps {
  className?: string;
  inset?: { left: number; right: number; top: number; bottom: number };
}

export const NotchedFrame: React.FC<NotchedFrameProps> = ({ 
  className = '',
  inset = { left: 6, right: 6, top: 7, bottom: 7 }
}) => {
  const { left, right, top, bottom } = inset;
  
  return (
    <div className={`notched-frame ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <polygon
          points={`
            ${left},${top + 3} 
            ${left},${top} 
            ${left + 3},${top}
            ${100 - right - 3},${top}
            ${100 - right},${top}
            ${100 - right},${top + 3}
            ${100 - right},${100 - bottom - 3}
            ${100 - right},${100 - bottom}
            ${100 - right - 3},${100 - bottom}
            ${left + 3},${100 - bottom}
            ${left},${100 - bottom}
            ${left},${100 - bottom - 3}
          `}
          fill="none"
          stroke="rgba(244, 241, 234, 0.75)"
          strokeWidth="0.25"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default NotchedFrame;
