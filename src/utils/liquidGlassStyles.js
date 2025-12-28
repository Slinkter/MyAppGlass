import { useColorModeValue } from "@chakra-ui/react";

export const useLiquidGlassProps = () => {
    const bgColor = useColorModeValue(
        "rgba(255, 255, 255, 0.15)",
        "rgba(0, 0, 0, 0.15)"
    );
    const borderColor = useColorModeValue(
        "rgba(255, 255, 255, 0.25)",
        "rgba(255, 255, 255, 0.15)"
    ); // Adjusted for dark mode visibility
    const boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)"; // Soft shadow
    const hoverBoxShadow = "0 6px 40px rgba(0, 0, 0, 0.15)"; // Slightly more pronounced hover shadow

    return {
        bg: bgColor,
        backdropFilter: "blur(30px)",
        border: "1px solid",
        borderColor: borderColor,
        borderRadius: "32px",
        boxShadow: boxShadow,
        transition: "all 0.3s ease",
        _hover: {
            boxShadow: hoverBoxShadow,
            transform: "scale(1.02)",
        },
    };
};

export const useLiquidGlassButtonProps = () => {
    const buttonBg = useColorModeValue(
        "rgba(255, 255, 255, 0.1)",
        "rgba(0, 0, 0, 0.1)"
    );
    const buttonBorderColor = useColorModeValue(
        "rgba(255, 255, 255, 0.4)",
        "rgba(255, 255, 255, 0.2)"
    );
    const buttonHoverBg = useColorModeValue(
        "rgba(255, 255, 255, 0.2)",
        "rgba(0, 0, 0, 0.2)"
    );
    const buttonHoverBorderColor = useColorModeValue(
        "rgba(255, 255, 255, 0.6)",
        "rgba(255, 255, 255, 0.3)"
    );
    const buttonTextColor = useColorModeValue("gray.800", "white");

    return {
        bg: buttonBg,
        color: buttonTextColor,
        backdropFilter: "blur(15px)", // Slightly less blur for buttons
        border: "1px solid",
        borderColor: buttonBorderColor,
        borderRadius: "16px", // Smaller radius for buttons
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)", // Softer button shadow
        transition: "all 0.2s ease-in-out",
        _hover: {
            bg: buttonHoverBg,
            borderColor: buttonHoverBorderColor,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // More pronounced hover shadow
        },
    };
};
