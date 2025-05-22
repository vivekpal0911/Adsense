import React from 'react';
import { Box, Heading, Text, Container, VStack, SimpleGrid, Avatar } from '@chakra-ui/react';

const team = [
  { name: 'Amit Sharma', role: 'Founder & CEO', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Priya Verma', role: 'CTO', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Rahul Singh', role: 'Lead Developer', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
];

const About = () => (
  <Box minH="100vh" bgGradient="linear(to-br, orange.50, red.50)" py={16}>
    <Container maxW="4xl" bg="white" boxShadow="2xl" borderRadius="xl" p={10}>
      <Heading size="2xl" color="red.500" textAlign="center" mb={6}>About Us</Heading>
      <Text fontSize="lg" color="gray.700" textAlign="center" mb={8}>
        Our mission is to empower brands and influencers to collaborate seamlessly, transparently, and with maximum impact. We believe in the power of authentic partnerships and data-driven marketing.
      </Text>
      <Heading size="lg" color="orange.500" mb={4}>Our Vision</Heading>
      <Text color="gray.700" mb={8}>
        We envision a world where every brand, big or small, can find the perfect influencer to tell their story. Our platform leverages AI, analytics, and secure technology to make influencer marketing accessible and effective for everyone.
      </Text>
      <Heading size="lg" color="orange.500" mb={4}>Meet the Team</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={8}>
        {team.map((member, idx) => (
          <VStack key={idx} spacing={3}>
            <Avatar src={member.img} name={member.name} size="xl" />
            <Text fontWeight="bold" color="red.500">{member.name}</Text>
            <Text color="gray.600">{member.role}</Text>
          </VStack>
        ))}
      </SimpleGrid>
      <Heading size="lg" color="orange.500" mb={4}>What Makes Us Unique?</Heading>
      <Text color="gray.700">
        • AI-powered smart matching for best results<br/>
        • Transparent, secure payments<br/>
        • Real-time analytics and reporting<br/>
        • Dedicated support for every user<br/>
        • Community-driven growth and learning
      </Text>
    </Container>
  </Box>
);

export default About; 