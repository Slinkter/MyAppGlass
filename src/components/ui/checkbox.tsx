import { Checkbox as ChakraCheckbox } from "@chakra-ui/react"
import * as React from "react"

export interface CheckboxProps extends ChakraCheckbox.RootProps {
  icon?: React.ReactNode
  label?: React.ReactNode
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  name?: string
  checked?: boolean
  onCheckedChange?: (_details: { checked: boolean | "indeterminate" }) => void
}

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { icon, label, inputProps, children, ...rest } = props
    return (
      <ChakraCheckbox.Root ref={ref} {...rest}>
        <ChakraCheckbox.HiddenInput {...inputProps} />
        <ChakraCheckbox.Control>
          <ChakraCheckbox.Indicator>{icon}</ChakraCheckbox.Indicator>
        </ChakraCheckbox.Control>
        {label && <ChakraCheckbox.Label>{label}</ChakraCheckbox.Label>}
        {children}
      </ChakraCheckbox.Root>
    )
  },
)
