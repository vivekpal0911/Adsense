import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InfluencerSidebar from './InfluencerSidebar';

export default function InfluencerLayout() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Flex>
        <InfluencerSidebar />
        <Box flex={1} p={{ base: 4, md: 10 }}>
          <Outlet />
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
} 