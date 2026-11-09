import { Alert as ChakraAlert } from "@chakra-ui/react";
import * as React from "react";

/** Variantes de estado del tema (ver `alertRecipe` en shared/providers/theme/index.ts). */
export type AlertVariant = "studio" | "success" | "warning" | "danger" | "info";

export interface AlertProps extends Omit<ChakraAlert.RootProps, "variant"> {
    variant?: ChakraAlert.RootProps["variant"] | AlertVariant;
    title?: string;
    icon?: React.ReactNode;
    startElement?: React.ReactNode;
    endElement?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    function Alert(props, ref) {
        const { title, children, icon, startElement, endElement, ...rest } =
            props;
        return (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <ChakraAlert.Root ref={ref} {...(rest as any)}>
                {startElement || (
                    <ChakraAlert.Indicator>{icon}</ChakraAlert.Indicator>
                )}
                {children ? (
                    <ChakraAlert.Content>
                        <ChakraAlert.Title>{title}</ChakraAlert.Title>
                        <ChakraAlert.Description>
                            {children}
                        </ChakraAlert.Description>
                    </ChakraAlert.Content>
                ) : (
                    <ChakraAlert.Title flex="1">{title}</ChakraAlert.Title>
                )}
                {endElement}
            </ChakraAlert.Root>
        );
    },
);

export const AlertRoot = ChakraAlert.Root;
export const AlertIndicator = ChakraAlert.Indicator;
export const AlertTitle = ChakraAlert.Title;
export const AlertDescription = ChakraAlert.Description;
export const AlertContent = ChakraAlert.Content;
