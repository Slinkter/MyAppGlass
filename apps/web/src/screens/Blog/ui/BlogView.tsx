import React from 'react';
import { Box } from '@chakra-ui/react';
import BlogList from '@/features/blog/components/BlogList';
import type { BlogPost } from '@/shared/api/firebase/types';

interface BlogViewProps {
  posts: BlogPost[];
}

export const BlogView: React.FC<BlogViewProps> = ({ posts }) => {
  return (
    <Box as='section' py={{ base: '14', md: '24', lg: '36' }}>
      <BlogList posts={posts} />
    </Box>
  );
};
