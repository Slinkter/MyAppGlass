import { Box } from '@chakra-ui/react';

const GlassCard = ({ children, ...props }) => {
  return (
    <Box
      bg='whiteAlpha.200'
      backdropFilter='blur(12px)'
      border='1px solid whiteAlpha.300'
      rounded='xl'
      {...props}
    >
      {children}
    </Box>
  );
};

export default GlassCard;
