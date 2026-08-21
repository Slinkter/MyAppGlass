import React from 'react';
import { Box } from '@chakra-ui/react';
import BlogList from '@/features/blog/components/BlogList';

export const BlogView: React.FC = () => {
  return (
    <Box as='section' py={{ base: '14', md: '24', lg: '36' }}>
      <BlogList />
    </Box>
  );
};
