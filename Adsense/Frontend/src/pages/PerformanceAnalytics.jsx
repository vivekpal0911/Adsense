import React from 'react';
import { Box, Heading, Text, Container, Icon, VStack } from '@chakra-ui/react';
import { FaChartLine } from 'react-icons/fa';

const PerformanceAnalytics = () => (
  <Box minH="100vh" bgGradient="linear(to-br, orange.50, yellow.50)" py={16}>
    <Container maxW="3xl" bg="white" boxShadow="2xl" borderRadius="xl" p={10}>
      <VStack spacing={6} align="center">
        <Icon as={FaChartLine} w={16} h={16} color="orange.400" />
        <Heading size="2xl" color="orange.500">Performance Analytics</Heading>
        <Text fontSize="lg" color="gray.700" textAlign="center">
          Track your campaign's success in real-time with our comprehensive Performance Analytics dashboard. Get actionable insights to maximize your ROI.
        </Text>
        <Text fontSize="md" color="gray.600" textAlign="center">
          <b>Key Features:</b><br/>
          • Real-time tracking of impressions, clicks, and conversions.<br/>
          • Audience demographics and engagement breakdown.<br/>
          • Visual reports and exportable data for presentations.<br/>
          • Compare campaign performance over time and across influencers.
        </Text>
      </VStack>
    </Container>
  </Box>
);

export default PerformanceAnalytics; 