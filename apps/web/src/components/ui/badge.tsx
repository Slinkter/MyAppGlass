import { Badge as ChakraBadge, BadgeProps as ChakraBadgeProps } from '@chakra-ui/react'
import * as React from 'react'

/** Variantes propias del tema (ver `badgeRecipe` en shared/providers/theme/index.ts). */
export type BadgeVariant =
  | 'neutral' | 'ink' | 'inkSolid' | 'success' | 'warning' | 'danger' | 'info'
  | 'chip' | 'chipInk' | 'chipSuccess' | 'chipWarning' | 'chipDanger' | 'chipInfo'

export interface BadgeProps extends Omit<ChakraBadgeProps, 'variant'> {
  variant?: ChakraBadgeProps['variant'] | BadgeVariant
}

/** Badge con el tipado de las variantes del sistema de diseño (apps/web/DESIGN.md). */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(props, ref) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <ChakraBadge ref={ref} {...(props as any)} />
})
