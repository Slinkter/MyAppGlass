import React from 'react';
import { Box } from '@chakra-ui/react';
import BlogList from '@/features/blog/components/BlogList';

export const BlogView: React.FC = () => {
  return (
    <Box as='main' py={{ base: 'phi_xl', md: 'phi_3xl' }}>
      <BlogList />
    </Box>
  );
};
