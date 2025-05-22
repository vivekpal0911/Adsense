import React from 'react';
import { Box, Heading, Text, Container, Icon, VStack } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const SmartMatching = () => (
  <Box minH="100vh" bgGradient="linear(to-br, red.50, orange.50)" py={16}>
    <Container maxW="3xl" bg="white" boxShadow="2xl" borderRadius="xl" p={10}>
      <VStack spacing={6} align="center">
        <Icon as={FaSearch} w={16} h={16} color="red.400" />
        <Heading size="2xl" color="red.500">Smart Matching</Heading>
        <Text fontSize="lg" color="gray.700" textAlign="center">
          Our advanced AI-driven Smart Matching system analyzes audience demographics, engagement rates, and content relevance to connect brands with the most suitable influencers. 
        </Text>
        <Text fontSize="md" color="gray.600" textAlign="center">
          <b>How it works:</b><br/>
          1. We collect and analyze influencer data from multiple platforms.<br/>
          2. Our algorithm matches brands with influencers whose audience aligns with campaign goals.<br/>
          3. Brands get recommendations ranked by relevance, engagement, and authenticity.<br/>
          4. Continuous learning improves matches over time for better ROI.
        </Text>
      </VStack>
    </Container>
  </Box>
);

export default SmartMatching; 