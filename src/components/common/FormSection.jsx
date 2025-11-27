import { Heading, Box, useColorModeValue } from "@chakra-ui/react";

/**
 * @component FormSection
 * @description Reusable section component for forms with a heading and border.
 * Provides consistent styling for form sections.
 *
 * @param {{
 *   title: string,
 *   children: React.ReactNode,
 *   pt?: string | number
 * }} props - Component props
 * @returns {JSX.Element} The rendered form section
 *
 * @example
 * <FormSection title="Personal Information">
 *   <FormControl>...</FormControl>
 * </FormSection>
 */
const FormSection = ({ title, children, pt = 4 }) => {
  const headingColor = useColorModeValue("gray.900", "white");

  return (
    <Box>
      <Heading
        as="h3"
        size="md"
        borderBottomWidth={2}
        pb={2}
        pt={pt}
        color={headingColor}
      >
        {title}
      </Heading>
      {children}
    </Box>
  );
};

export default FormSection;
