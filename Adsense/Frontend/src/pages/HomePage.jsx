import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Badge,
  Link
} from '@chakra-ui/react';
import { FaArrowRight, FaChartLine, FaSearch, FaHandshake } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  const bgGradient = useColorModeValue(
    'linear(to-r, red.400, orange.400)',
    'linear(to-r, red.500, orange.500)'
  );

  const stats = [
    { value: '10,000+', label: 'Active Influencers' },
    { value: '2,500+', label: 'Brand Partners' },
    { value: '$5M+', label: 'Paid to Creators' },
    { value: '95%', label: 'Satisfaction Rate' },
  ];

  const features = [
    {
      icon: FaSearch,
      title: 'Smart Matching',
      text: 'Our AI finds perfect influencer-brand matches based on audience demographics and engagement',
    },
    {
      icon: FaChartLine,
      title: 'Performance Analytics',
      text: 'Real-time campaign tracking with detailed ROI metrics and audience insights',
    },
    {
      icon: FaHandshake,
      title: 'Secure Payments',
      text: 'Escrow system ensures creators get paid and brands get quality content',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah K.',
      role: 'Beauty Influencer',
      content: 'Grew my brand collaborations by 300% in just 3 months using this platform!',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Mike T.',
      role: 'Marketing Director, Nike',
      content: 'Found perfect micro-influencers for our campaign with incredible ROI.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  ];

  return (
    <Box>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Box bgGradient={bgGradient} color="white" py={{ base: 8, sm: 12, md: 20 }} px={{ base: 3, sm: 4 }}>
        <Container maxW="6xl">
          <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={{ base: 6, sm: 8, md: 0 }}>
            <Box flex={1} mb={{ base: 6, sm: 8, md: 0 }} textAlign={{ base: 'center', md: 'left' }}>
              <Heading 
                as="h1" 
                size={{ base: 'xl', sm: '2xl', md: '3xl' }} 
                mb={{ base: 3, sm: 4 }} 
                lineHeight="1.2"
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                letterSpacing={{ base: '-0.5px', md: '-1px' }}
              >
                Connect Brands with <br />Authentic Influencers
              </Heading>
              <Text 
                fontSize={{ base: 'md', sm: 'lg', md: 'xl' }} 
                mb={{ base: 6, sm: 8 }}
                opacity={0.9}
                lineHeight="1.6"
              >
                The leading platform for influencer marketing campaigns with verified audience data
              </Text>
              <Stack 
                direction={{ base: 'column', sm: 'row' }} 
                spacing={{ base: 3, sm: 4 }} 
                justify={{ base: 'center', md: 'flex-start' }}
                width={{ base: 'full', sm: 'auto' }}
              >
                <Button
                  as={RouterLink}
                  to="/signup"
                  size={{ base: 'md', sm: 'lg' }}
                  colorScheme="whiteAlpha"
                  rightIcon={<FaArrowRight />}
                  width={{ base: 'full', sm: 'auto' }}
                  height={{ base: '48px', sm: '56px' }}
                  fontSize={{ base: 'md', sm: 'lg' }}
                >
                  Sign Up
                </Button>
                <Button
                  as={RouterLink}
                  to="/login"
                  size={{ base: 'md', sm: 'lg' }}
                  variant="outline"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                  rightIcon={<FaArrowRight />}
                  width={{ base: 'full', sm: 'auto' }}
                  height={{ base: '48px', sm: '56px' }}
                  fontSize={{ base: 'md', sm: 'lg' }}
                >
                  Login
                </Button>
              </Stack>
            </Box>
            <Box flex={1} display="flex" justifyContent="center" mt={{ base: 4, sm: 6, md: 0 }}>
              <Image
                src="https://illustrations.popsy.co/amber/digital-nomad.svg"
                alt="Influencer marketing illustration"
                maxW={{ base: '280px', sm: '350px', md: '500px' }}
                w="100%"
                transform={{ base: 'scale(0.9)', sm: 'scale(1)' }}
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box py={{ base: 10, sm: 12, md: 16 }} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Container maxW="6xl">
          <SimpleGrid 
            columns={{ base: 2, md: 4 }} 
            spacing={{ base: 8, sm: 10, md: 12 }}
            px={{ base: 2, sm: 4 }}
          >
            {stats.map((stat) => (
              <Box key={stat.label} textAlign="center">
                <Text 
                  fontSize={{ base: 'xl', sm: '2xl', md: '4xl' }} 
                  fontWeight="bold" 
                  mb={{ base: 1, sm: 2 }}
                  color={useColorModeValue('gray.800', 'white')}
                >
                  {stat.value}
                </Text>
                <Text 
                  fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} 
                  color={useColorModeValue('gray.600', 'gray.400')}
                  lineHeight="1.4"
                >
                  {stat.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={{ base: 10, sm: 12, md: 16 }}>
        <Container maxW="6xl">
          <Heading 
            as="h2" 
            size={{ base: 'lg', sm: 'xl', md: '2xl' }} 
            textAlign="center" 
            mb={{ base: 8, sm: 10, md: 12 }}
            color={useColorModeValue('gray.800', 'white')}
          >
            Why Choose Our Platform
          </Heading>
          <SimpleGrid 
            columns={{ base: 1, md: 3 }} 
            spacing={{ base: 6, sm: 8, md: 10 }}
            px={{ base: 2, sm: 4 }}
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                p={{ base: 5, sm: 6, md: 8 }}
                boxShadow="lg"
                borderRadius="lg"
                as={RouterLink}
                to={
                  index === 0
                    ? '/smart-matching'
                    : index === 1
                    ? '/performance-analytics'
                    : '/secure-payments'
                }
                _hover={{ 
                  boxShadow: 'xl', 
                  transform: 'translateY(-4px)', 
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.50', 'gray.700')
                }}
                transition="all 0.2s"
                cursor="pointer"
                bg={useColorModeValue('white', 'gray.800')}
              >
                <Icon 
                  as={feature.icon} 
                  w={{ base: 8, sm: 10, md: 12 }} 
                  h={{ base: 8, sm: 10, md: 12 }} 
                  color="red.400" 
                  mb={{ base: 4, sm: 5 }} 
                />
                <Heading 
                  as="h3" 
                  size={{ base: 'md', sm: 'lg' }} 
                  mb={{ base: 2, sm: 3 }}
                  color={useColorModeValue('gray.800', 'white')}
                >
                  {feature.title}
                </Heading>
                <Text 
                  fontSize={{ base: 'sm', sm: 'md' }} 
                  color={useColorModeValue('gray.600', 'gray.400')}
                  lineHeight="1.6"
                >
                  {feature.text}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box py={{ base: 10, sm: 12, md: 16 }} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Container maxW="6xl">
          <Heading 
            as="h2" 
            size={{ base: 'lg', sm: 'xl', md: '2xl' }} 
            textAlign="center" 
            mb={{ base: 8, sm: 10, md: 12 }}
            color={useColorModeValue('gray.800', 'white')}
          >
            How It Works
          </Heading>
          <SimpleGrid 
            columns={{ base: 1, md: 3 }} 
            spacing={{ base: 8, sm: 10, md: 12 }}
            px={{ base: 2, sm: 4 }}
          >
            {[
              {
                step: '1',
                title: 'Create Profile',
                description: 'Brands or influencers set up their verified profiles',
              },
              {
                step: '2',
                title: 'Find Matches',
                description: 'Our algorithm suggests perfect collaboration partners',
              },
              {
                step: '3',
                title: 'Launch Campaign',
                description: 'Manage everything from brief to payment in one dashboard',
              },
            ].map((item) => (
              <Box 
                key={item.step} 
                textAlign="center"
                p={{ base: 4, sm: 6 }}
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius="lg"
                boxShadow="md"
              >
                <Badge
                  fontSize={{ base: 'lg', sm: 'xl' }}
                  p={{ base: 2, sm: 3 }}
                  borderRadius="full"
                  bgGradient={bgGradient}
                  color="white"
                  mb={{ base: 4, sm: 5 }}
                >
                  {item.step}
                </Badge>
                <Heading 
                  as="h3" 
                  size={{ base: 'md', sm: 'lg' }} 
                  mb={{ base: 2, sm: 3 }}
                  color={useColorModeValue('gray.800', 'white')}
                >
                  {item.title}
                </Heading>
                <Text 
                  fontSize={{ base: 'sm', sm: 'md' }} 
                  color={useColorModeValue('gray.600', 'gray.400')}
                  lineHeight="1.6"
                >
                  {item.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box py={{ base: 10, sm: 12, md: 16 }}>
        <Container maxW="6xl">
          <Heading 
            as="h2" 
            size={{ base: 'lg', sm: 'xl', md: '2xl' }} 
            textAlign="center" 
            mb={{ base: 8, sm: 10, md: 12 }}
            color={useColorModeValue('gray.800', 'white')}
          >
            What Our Users Say
          </Heading>
          <SimpleGrid 
            columns={{ base: 1, md: 2 }} 
            spacing={{ base: 6, sm: 8, md: 10 }}
            px={{ base: 2, sm: 4 }}
          >
            {testimonials.map((testimonial, index) => (
              <Box
                key={index}
                p={{ base: 5, sm: 6, md: 8 }}
                borderWidth="1px"
                borderRadius="lg"
                position="relative"
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow="md"
              >
                <Box
                  position="absolute"
                  top="-4"
                  left="6"
                  bg="white"
                  p={1}
                  borderRadius="full"
                  boxShadow="md"
                >
                  <Icon 
                    as={MdVerified} 
                    w={{ base: 5, sm: 6 }} 
                    h={{ base: 5, sm: 6 }} 
                    color="red.400" 
                  />
                </Box>
                <Text 
                  mb={{ base: 4, sm: 5 }} 
                  fontStyle="italic" 
                  fontSize={{ base: 'sm', sm: 'md' }}
                  color={useColorModeValue('gray.700', 'gray.300')}
                  lineHeight="1.6"
                >
                  "{testimonial.content}"
                </Text>
                <Flex align="center">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    boxSize={{ base: '40px', sm: '50px' }}
                    borderRadius="full"
                    mr={3}
                  />
                  <Box>
                    <Text 
                      fontWeight="bold" 
                      fontSize={{ base: 'sm', sm: 'md' }}
                      color={useColorModeValue('gray.800', 'white')}
                    >
                      {testimonial.name}
                    </Text>
                    <Text 
                      fontSize={{ base: 'xs', sm: 'sm' }} 
                      color={useColorModeValue('gray.600', 'gray.400')}
                    >
                      {testimonial.role}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={{ base: 12, sm: 16, md: 20 }} bgGradient={bgGradient} color="white">
        <Container maxW="2xl" textAlign="center" px={{ base: 4, sm: 6 }}>
          <Heading 
            as="h2" 
            size={{ base: 'xl', sm: '2xl' }} 
            mb={{ base: 4, sm: 6 }}
            lineHeight="1.2"
          >
            Ready to Grow Your Brand?
          </Heading>
          <Text 
            fontSize={{ base: 'lg', sm: 'xl' }} 
            mb={{ base: 6, sm: 8 }}
            opacity={0.9}
            lineHeight="1.6"
          >
            Join thousands of brands and creators already collaborating on our platform
          </Text>
          <Stack 
            direction={{ base: 'column', sm: 'row' }} 
            justify="center" 
            spacing={{ base: 4, sm: 6 }}
            width={{ base: 'full', sm: 'auto' }}
          >
            <Button
              as={RouterLink}
              to="/signup"
              size={{ base: 'lg', sm: 'xl' }}
              colorScheme="whiteAlpha"
              rightIcon={<FaArrowRight />}
              width={{ base: 'full', sm: 'auto' }}
              height={{ base: '48px', sm: '56px' }}
              fontSize={{ base: 'md', sm: 'lg' }}
            >
              Sign Up
            </Button>
            <Button
              size={{ base: 'lg', sm: 'xl' }}
              variant="outline"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              width={{ base: 'full', sm: 'auto' }}
              height={{ base: '48px', sm: '56px' }}
              fontSize={{ base: 'md', sm: 'lg' }}
            >
              See How It Works
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage; 