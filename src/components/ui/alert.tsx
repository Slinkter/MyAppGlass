import { Alert as ChakraAlert } from "@chakra-ui/react"
import * as React from "react"

export interface AlertProps extends ChakraAlert.RootProps {
  title?: React.ReactNode
  icon?: React.ReactNode
  startElement?: React.ReactNode
  endElement?: React.ReactNode
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    const { title, children, icon, startElement, endElement, ...rest } = props
    return (
      <ChakraAlert.Root ref={ref} {...rest}>
        {startElement || <ChakraAlert.Indicator>{icon}</ChakraAlert.Indicator>}
        {children ? (
          <ChakraAlert.Content>
            <ChakraAlert.Title>{title}</ChakraAlert.Title>
            <ChakraAlert.Description>{children}</ChakraAlert.Description>
          </ChakraAlert.Content>
        ) : (
          <ChakraAlert.Title flex="1">{title}</ChakraAlert.Title>
        )}
        {endElement}
      </ChakraAlert.Root>
    )
  },
)

export const AlertRoot = ChakraAlert.Root
export const AlertIndicator = ChakraAlert.Indicator
export const AlertTitle = ChakraAlert.Title
export const AlertDescription = ChakraAlert.Description
export const AlertContent = ChakraAlert.Content
