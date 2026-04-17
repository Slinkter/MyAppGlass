import { DataList as ChakraDataList } from "@chakra-ui/react"
import * as React from "react"

export const DataListRoot = ChakraDataList.Root

export interface DataListItemProps extends ChakraDataList.ItemProps {
  label: React.ReactNode
  value: React.ReactNode
  grow?: boolean
}

export const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(
  function DataListItem(props, ref) {
    const { label, value, children, grow, ...rest } = props
    return (
      <ChakraDataList.Item ref={ref} {...rest}>
        <ChakraDataList.ItemLabel flex={grow ? "1" : undefined}>
          {label}
        </ChakraDataList.ItemLabel>
        <ChakraDataList.ItemValue flex={grow ? "1" : undefined}>
          {value}
        </ChakraDataList.ItemValue>
        {children}
      </ChakraDataList.Item>
    )
  },
)
