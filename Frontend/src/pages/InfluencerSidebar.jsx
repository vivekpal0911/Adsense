import React from 'react';
import { Box, HStack, Avatar, Text, VStack, Button, Divider } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const sidebarLinks = [
  { label: 'Dashboard', to: 'dashboard' },
  { label: 'Profile', to: 'profile' },
  { label: 'Earnings', to: 'earnings' },
  { label: 'Messages', to: 'messages' },
];

export default function InfluencerSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const activePath = location.pathname.split('/')[2];

  return (
    <Box
      w={{ base: '60', md: '64' }}
      bg="white"
      borderRightWidth={1}
      borderColor="gray.200"
      minH="calc(100vh - 60px)"
      pt={8}
      px={4}
      position="sticky"
      top={0}
    >
      <HStack mb={8} spacing={3} align="center">
        <Avatar size="sm" name={user?.name} />
        <Text fontWeight="bold" fontSize="lg" color="red.400">SENSE</Text>
        <Text fontWeight="bold" fontSize="md" color="gray.700">{user?.name}</Text>
      </HStack>
      <VStack align="stretch" spacing={1}>
        {sidebarLinks.map((link) => (
          <Button
            key={link.label}
            as={RouterLink}
            to={link.to}
            variant={activePath === link.to ? 'solid' : 'ghost'}
            colorScheme={activePath === link.to ? 'red' : 'gray'}
            justifyContent="flex-start"
            fontWeight={activePath === link.to ? 'bold' : 'normal'}
            size="lg"
            borderRadius="md"
            mb={1}
          >
            {link.label}
          </Button>
        ))}
        <Divider my={2} />
        <Button
          variant="ghost"
          colorScheme="gray"
          justifyContent="flex-start"
          size="lg"
          borderRadius="md"
          as={RouterLink}
          to="/login"
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
} 