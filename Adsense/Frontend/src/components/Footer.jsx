import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Link,
  SimpleGrid,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Company
            </Text>
            <Link as={RouterLink} to={'/about'}>About Us</Link>
            <Link as={RouterLink} to={'/contact'}>Contact</Link>
            <Link as={RouterLink} to={'/careers'}>Careers</Link>
            <Link as={RouterLink} to={'/press'}>Press</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Features
            </Text>
            <Link as={RouterLink} to={'/features'}>How it Works</Link>
            <Link as={RouterLink} to={'/pricing'}>Pricing</Link>
            <Link as={RouterLink} to={'/testimonials'}>Testimonials</Link>
            <Link as={RouterLink} to={'/faq'}>FAQ</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Resources
            </Text>
            <Link as={RouterLink} to={'/blog'}>Blog</Link>
            <Link as={RouterLink} to={'/guides'}>Guides</Link>
            <Link as={RouterLink} to={'/help'}>Help Center</Link>
            <Link as={RouterLink} to={'/api'}>API</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Legal
            </Text>
            <Link as={RouterLink} to={'/privacy'}>Privacy Policy</Link>
            <Link as={RouterLink} to={'/terms'}>Terms of Service</Link>
            <Link as={RouterLink} to={'/cookies'}>Cookie Policy</Link>
            <Link as={RouterLink} to={'/gdpr'}>GDPR</Link>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}>
          <Text>© 2024 AdSense. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <Link as={RouterLink} to={'/privacy'}>Privacy</Link>
            <Link as={RouterLink} to={'/terms'}>Terms</Link>
            <Link as={RouterLink} to={'/cookies'}>Cookies</Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
