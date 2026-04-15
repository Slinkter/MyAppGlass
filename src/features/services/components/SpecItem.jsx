import React from "react";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";

/**
 * @component SpecItem
 * @description Muestra una especificación técnica individual (Clave: Valor) usando DataList de Chakra v3.
 */
const SpecItem = ({ label, value }) => {
    return (
        <DataListRoot
            w="full"
            p={3}
            bg="surface.container"
            rounded="xl"
            borderWidth="1px"
            borderColor="border.default"
            transition="all 0.2s"
            _hover={{
                borderColor: "text.accent",
                transform: "translateY(-1px)",
                shadow: "sm",
            }}
        >
            <DataListItem 
                label={label} 
                value={value} 
                grow
                labelProps={{
                    fontSize: "xs",
                    fontWeight: "semibold",
                    textTransform: "uppercase",
                    letterSpacing: "wider",
                    color: "text.muted",
                }}
                valueProps={{
                    fontSize: "sm",
                    fontWeight: "bold",
                    color: "text.body",
                    textAlign: "right",
                }}
            />
        </DataListRoot>
    );
};

export default SpecItem;
