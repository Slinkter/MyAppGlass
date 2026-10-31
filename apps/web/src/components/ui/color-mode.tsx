'use client'

import { ClientOnly, IconButton, Skeleton, Box, IconButtonProps, BoxProps } from "@chakra-ui/react"
import { ThemeProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useColorMode } from './color-mode-hooks'

export type ColorModeProviderProps = ThemeProviderProps

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute='data-theme' disableTransitionOnChange {...props} />
  )
}

export interface ColorModeIconProps {
  size?: number | string
}

export function ColorModeIcon({ size }: ColorModeIconProps) {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? (
    <Moon size={size} style={{ flexShrink: 0 }} />
  ) : (
    <Sun size={size} style={{ flexShrink: 0 }} />
  )
}

export interface ColorModeButtonProps extends IconButtonProps {
  iconSize?: number | string
}

export const ColorModeButton = React.forwardRef<HTMLButtonElement, ColorModeButtonProps>(
  function ColorModeButton({ iconSize, ...props }, ref) {
    const { toggleColorMode } = useColorMode()
    return (
      <ClientOnly fallback={<Skeleton boxSize='9' borderRadius='full' />}>
        <IconButton
          onClick={toggleColorMode}
          variant='ghost'
          aria-label='Toggle color mode'
          size='sm'
          ref={ref}
          {...props}
          css={
            iconSize
              ? undefined
              : {
                  _icon: {
                    width: '5',
                    height: '5',
                  },
                }
          }
        >
          <ColorModeIcon size={iconSize} />
        </IconButton>
      </ClientOnly>
    )
  },
)

export const LightMode = React.forwardRef<HTMLSpanElement, BoxProps>(function LightMode(props, ref) {
  return (
    <Box
      as='span'
      color='fg'
      display='contents'
      data-theme='light'
      colorPalette='gray'
      ref={ref}
      {...props}
    />
  )
})

export const DarkMode = React.forwardRef<HTMLSpanElement, BoxProps>(function DarkMode(props, ref) {
  return (
    <Box
      as='span'
      color='fg'
      display='contents'
      data-theme='dark'
      colorPalette='gray'
      ref={ref}
      {...props}
    />
  )
})
