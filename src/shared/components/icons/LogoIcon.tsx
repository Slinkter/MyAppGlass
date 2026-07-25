import React from "react";

export interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * @component LogoIcon
 * @description Componente SVG vectorial oficial del isotipo GYA Glass & Aluminum.
 */
export const LogoIcon = React.forwardRef<SVGSVGElement, LogoIconProps>(
  ({ size = 500, ...props }, ref) => (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      focusable="false"
      ref={ref}
      {...props}
    >
      <title>Logo GYA Glass & Aluminum</title>
      {/* Triángulo principal */}
      <path d="M 20 460 L 250 40 L 480 460 Z" fill="#FF5A5F" />

      {/* Círculo blanco central */}
      <circle cx="250" cy="315" r="115" stroke="white" strokeWidth="8" />

      {/* Rombos centrales (Cuadrados rotados) */}
      <g transform="translate(250, 315) rotate(45)">
        <rect x="-71" y="-71" width="68" height="68" fill="white" />
        <rect x="3" y="-71" width="68" height="68" fill="white" />
        <rect x="-71" y="3" width="68" height="68" fill="white" />
        <rect x="3" y="3" width="68" height="68" fill="white" />
      </g>
    </svg>
  )
);

LogoIcon.displayName = "LogoIcon";
