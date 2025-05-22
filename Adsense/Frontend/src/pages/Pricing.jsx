import React from 'react';
import { Box, Heading, Text, Container, SimpleGrid, VStack, Button, Badge } from '@chakra-ui/react';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    features: [
      'Basic Smart Matching',
      'Access to public campaigns',
      'Limited analytics',
      'Standard support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$49/mo',
    features: [
      'Advanced Smart Matching',
      'Unlimited campaigns',
      'Full analytics dashboard',
      'Priority support',
      'Verified badge',
    ],
    cta: 'Upgrade Now',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    features: [
      'Custom integrations',
      'Dedicated account manager',
      'API access',
      'Team collaboration tools',
      'Custom analytics & reporting',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const Pricing = () => (
  <Box minH="100vh" bgGradient="linear(to-br, orange.50, red.50)" py={16}>
    <Container maxW="6xl" bg="white" boxShadow="2xl" borderRadius="xl" p={10}>
      <Heading size="2xl" color="red.500" textAlign="center" mb={10}>Pricing Plans</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {plans.map((plan, idx) => (
          <VStack key={idx} spacing={5} align="center" p={8} borderRadius="lg" boxShadow={plan.highlight ? 'xl' : 'md'} bg={plan.highlight ? 'orange.100' : 'orange.50'} border={plan.highlight ? '2px solid #FF4D4D' : 'none'}>
            {plan.highlight && <Badge colorScheme="red" mb={2}>Most Popular</Badge>}
            <Heading size="md" color="red.500">{plan.name}</Heading>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">{plan.price}</Text>
            <VStack spacing={2} align="start">
              {plan.features.map((f, i) => (
                <Text key={i} color="gray.700">• {f}</Text>
              ))}
            </VStack>
            <Button colorScheme="red" variant={plan.highlight ? 'solid' : 'outline'} w="full">{plan.cta}</Button>
          </VStack>
        ))}
      </SimpleGrid>
    </Container>
  </Box>
);

export default Pricing; 