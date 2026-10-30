import { DataList as ChakraDataList } from "@chakra-ui/react"
import * as React from "react"

export const DataListRoot = ChakraDataList.Root

export interface DataListItemProps extends ChakraDataList.ItemProps {
  label: React.ReactNode
  value: React.ReactNode
  grow?: boolean
  labelProps?: ChakraDataList.ItemLabelProps
  valueProps?: ChakraDataList.ItemValueProps
}

export const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(
  function DataListItem(props, ref) {
    const { label, value, children, grow, labelProps, valueProps, ...rest } = props
    return (
      <ChakraDataList.Item ref={ref} {...rest}>
        <ChakraDataList.ItemLabel flex={grow ? "1" : undefined} {...labelProps}>
          {label}
        </ChakraDataList.ItemLabel>
        <ChakraDataList.ItemValue flex={grow ? "1" : undefined} {...valueProps}>
          {value}
        </ChakraDataList.ItemValue>
        {children}
      </ChakraDataList.Item>
    )
  },
)
