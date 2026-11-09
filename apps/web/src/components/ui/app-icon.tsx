import React from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { ICON_SIZES, type IconSizeToken } from "@/shared/constants/motion";

export interface AppIconProps extends Omit<LucideProps, "size"> {
  icon: LucideIcon;
  /** Escala oficial R4: sm (16px), md (20px), lg (24px) o valor numérico 16 | 20 | 24. */
  size?: IconSizeToken | 16 | 20 | 24;
  /** Si es decorativo (true por defecto cuando no hay aria-label), añade aria-hidden="true". */
  decorative?: boolean;
}

/**
 * Helper canónico para íconos Lucide (Regla R4):
 * - Restringe el tamaño a 16 / 20 / 24 px.
 * - Incluye `style={{ flexShrink: 0 }}` para evitar compresión en flexbox.
 * - Aplica `aria-hidden="true"` automáticamente cuando es decorativo.
 */
export const AppIcon: React.FC<AppIconProps> = ({
  icon: IconComponent,
  size = "md",
  decorative = true,
  style,
  "aria-label": ariaLabel,
  ...rest
}) => {
  const numericSize = typeof size === "number" ? size : ICON_SIZES[size];
  const isDecorative = ariaLabel ? false : decorative;

  return (
    <IconComponent
      size={numericSize}
      aria-hidden={isDecorative ? true : undefined}
      aria-label={ariaLabel}
      style={{ flexShrink: 0, ...style }}
      {...rest}
    />
  );
};
