import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CompanySidebar from './CompanySidebar';

export default function CompanyLayout() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Flex>
        <CompanySidebar />
        <Box flex={1} p={{ base: 4, md: 10 }}>
          <Outlet />
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
} 