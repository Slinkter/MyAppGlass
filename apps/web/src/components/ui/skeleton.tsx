import { Skeleton as ChakraSkeleton, Circle, Stack, StackProps, SkeletonProps } from "@chakra-ui/react"
import * as React from "react"

export interface SkeletonCircleProps extends SkeletonProps {
  size?: string | number
}

export const SkeletonCircle = React.forwardRef<HTMLDivElement, SkeletonCircleProps>(
  function SkeletonCircle(props, ref) {
    const { size, ...rest } = props
    return (
      <Circle size={size} asChild ref={ref}>
        <ChakraSkeleton {...rest} />
      </Circle>
    )
  },
)

export interface SkeletonTextProps extends StackProps {
  noOfLines?: number
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText(props, ref) {
    const { noOfLines = 3, gap, ...rest } = props
    return (
      <Stack gap={gap} width="full" ref={ref}>
        {Array.from({ length: noOfLines }).map((_, index) => (
          <ChakraSkeleton
            height="4"
            key={index}
            _last={{ maxW: "80%" }}
            {...rest}
          />
        ))}
      </Stack>
    )
  },
)

export const Skeleton = ChakraSkeleton
