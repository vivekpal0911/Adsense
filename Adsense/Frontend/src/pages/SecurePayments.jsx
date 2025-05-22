import React from 'react';
import { Box, Heading, Text, Container, Icon, VStack } from '@chakra-ui/react';
import { FaHandshake } from 'react-icons/fa';

const SecurePayments = () => (
  <Box minH="100vh" bgGradient="linear(to-br, orange.50, red.50)" py={16}>
    <Container maxW="3xl" bg="white" boxShadow="2xl" borderRadius="xl" p={10}>
      <VStack spacing={6} align="center">
        <Icon as={FaHandshake} w={16} h={16} color="red.400" />
        <Heading size="2xl" color="red.500">Secure Payments</Heading>
        <Text fontSize="lg" color="gray.700" textAlign="center">
          Our platform uses an escrow-based Secure Payments system to protect both brands and creators. Funds are only released when campaign milestones are met.
        </Text>
        <Text fontSize="md" color="gray.600" textAlign="center">
          <b>How we keep you safe:</b><br/>
          • Payments are held securely until deliverables are approved.<br/>
          • Transparent transaction history for all parties.<br/>
          • Fast payouts and multiple payment options.<br/>
          • Dispute resolution support for peace of mind.
        </Text>
      </VStack>
    </Container>
  </Box>
);

export default SecurePayments; 