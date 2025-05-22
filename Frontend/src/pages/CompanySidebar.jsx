import React from 'react';
import { Box, HStack, Avatar, Text, VStack, Button, Divider } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FiHome, FiPlus, FiList, FiSearch, FiBarChart2, FiMessageCircle, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext.jsx';

const sidebarLinks = [
  { label: 'Overview', icon: FiHome, to: 'dashboard' },
  { label: 'Create Ad', icon: FiPlus, to: 'create-ad' },
  { label: 'Manage Ads', icon: FiList, to: 'manage-ads' },
  { label: 'Discover Influencers', icon: FiSearch, to: 'discover-influencers' },
  { label: 'Analytics', icon: FiBarChart2, to: 'analytics' },
  { label: 'Messages', icon: FiMessageCircle, to: 'messages' },
  { label: 'Profile', icon: FiUser, to: 'profile' },
];

export default function CompanySidebar() {
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
        <Text fontWeight="bold" fontSize="lg" color="red.500">{user?.name}</Text>
      </HStack>
      <VStack align="stretch" spacing={1}>
        {sidebarLinks.map((link) => (
          <Button
            key={link.label}
            as={RouterLink}
            to={link.to}
            leftIcon={<link.icon />}
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
          leftIcon={<FiLogOut />}
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