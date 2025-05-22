import React from 'react';
import { Box, Heading, Text, Container, SimpleGrid, Icon, VStack } from '@chakra-ui/react';
import { FaSearch, FaChartLine, FaHandshake, FaShieldAlt, FaRocket } from 'react-icons/fa';

const features = [
  {
    icon: FaSearch,
    title: 'Smart Matching',
    desc: 'AI-driven matching connects brands with the most relevant influencers for their campaigns.'
  },
  {
    icon: FaChartLine,
    title: 'Performance Analytics',
    desc: 'Real-time analytics dashboard to track campaign success, engagement, and ROI.'
  },
  {
    icon: FaHandshake,
    title: 'Secure Payments',
    desc: 'Escrow-based payment system ensures safe and timely transactions for all parties.'
  },
  {
    icon: FaShieldAlt,
    title: 'Verified Profiles',
    desc: 'All users are verified to maintain trust and authenticity on the platform.'
  },
  {
    icon: FaRocket,
    title: 'Campaign Boost',
    desc: 'Tools to amplify your campaign reach and maximize results.'
  },
];

const Features = () => (
  <Box minH="100vh" bgGradient="linear(to-br, red.50, orange.50)" py={16}>
    <Container maxW="5xl" bg="white" boxShadow="2xl" borderRadius="xl" p={10}>
      <Heading size="2xl" color="red.500" textAlign="center" mb={10}>Platform Features</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {features.map((feature, idx) => (
          <VStack key={idx} spacing={4} align="start" p={6} borderRadius="lg" boxShadow="md" bg="orange.50">
            <Icon as={feature.icon} w={10} h={10} color="red.400" />
            <Heading size="md" color="red.500">{feature.title}</Heading>
            <Text color="gray.700">{feature.desc}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Container>
  </Box>
);

export default Features; 