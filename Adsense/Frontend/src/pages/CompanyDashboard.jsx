import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
  Divider,
  Avatar,
  VStack,
  HStack,
  Spacer,
  SimpleGrid,
  Container,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FiHome, FiPlus, FiList, FiSearch, FiBarChart2, FiMessageCircle, FiUser, FiLogOut } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.jsx';

const sidebarLinks = [
  { label: 'Overview', icon: FiHome, to: '/company/dashboard' },
  { label: 'Create Ad', icon: FiPlus, to: '/company/create-ad' },
  { label: 'Manage Ads', icon: FiList, to: '/company/manage-ads' },
  { label: 'Discover Influencers', icon: FiSearch, to: '/company/discover-influencers' },
  { label: 'Analytics', icon: FiBarChart2, to: '/company/analytics' },
  { label: 'Messages', icon: FiMessageCircle, to: '/company/messages' },
  { label: 'Profile', icon: FiUser, to: '/company/profile' },
];

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const activeLink = '/company/dashboard';
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/ads/my-ads', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAds(res.data);
      } catch (err) {
        setAds([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  // Calculate stats
  const totalImpressions = ads.reduce((sum, ad) => sum + (Number(ad.impressions) || 0), 0);
  const totalClicks = ads.reduce((sum, ad) => sum + (Number(ad.clicks) || 0), 0);
  const avgEngagement = ads.length
    ? (
        ads.reduce((sum, ad) => sum + (parseFloat(ad.engagement) || 0), 0) / ads.length
      ).toFixed(1) + '%'
    : '0%';

  const stats = [
    { label: 'Total Impressions', value: totalImpressions, sub: 'Across all campaigns' },
    { label: 'Total Clicks', value: totalClicks, sub: 'Across all campaigns' },
    { label: 'Avg. Engagement', value: avgEngagement, sub: 'Across all campaigns' },
  ];

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Topbar */}
      <Navbar />
      <Flex>
        {/* Sidebar */}
        <Box
          w={{ base: '60', md: '64' }}
          bg={useColorModeValue('white', 'gray.800')}
          borderRightWidth={1}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
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
                variant={activeLink === link.to ? 'solid' : 'ghost'}
                colorScheme={activeLink === link.to ? 'red' : 'gray'}
                justifyContent="flex-start"
                fontWeight={activeLink === link.to ? 'bold' : 'normal'}
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
              onClick={() => navigate('/login')}
            >
              Logout
            </Button>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex={1} p={{ base: 4, md: 10 }}>
          <Text fontSize="2xl" fontWeight="bold" color="red.500" mb={6}>
            Dashboard Overview
          </Text>
          {/* Stats */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
            {stats.map((stat) => (
              <Box
                key={stat.label}
                bg={useColorModeValue('white', 'gray.800')}
                p={6}
                borderRadius="lg"
                boxShadow="md"
              >
                <Text fontSize="lg" color="gray.500" mb={1}>{stat.label}</Text>
                <Text fontSize="2xl" fontWeight="bold">{stat.value}</Text>
                <Text fontSize="sm" color="gray.400">{stat.sub}</Text>
              </Box>
            ))}
          </SimpleGrid>
          {/* Actions */}
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mb={8}>
            <Button colorScheme="red" onClick={() => navigate('/company/create-ad')}>Create New Ad</Button>
            <Button colorScheme="orange" onClick={() => navigate('/company/discover-influencers')}>Discover Influencers</Button>
          </Stack>
          {/* Campaigns Table */}
          <Box bg={useColorModeValue('white', 'gray.800')} p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold" mb={4}>Active Campaigns</Text>
            {loading ? (
              <Center py={10}><Spinner size="lg" color="red.400" /></Center>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Campaign Name</Th>
                    <Th>Status</Th>
                    <Th>Impressions</Th>
                    <Th>Clicks</Th>
                    <Th>Engagement</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ads.length === 0 ? (
                    <Tr><Td colSpan={6}><Text textAlign="center">No campaigns found.</Text></Td></Tr>
                  ) : (
                    ads.map((c) => (
                      <Tr key={c._id || c.name}>
                        <Td>{c.title || c.name}</Td>
                        <Td>{c.status === 'pending' ? 'Active' : c.status ? c.status.charAt(0).toUpperCase() + c.status.slice(1) : 'Draft'}</Td>
                        <Td>{c.impressions || 0}</Td>
                        <Td>{c.clicks || 0}</Td>
                        <Td>{c.engagement || '0%'}</Td>
                        <Td>
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() => navigate(`/company/manage-ads?campaign=${encodeURIComponent(c.title || c.name)}`)}
                          >
                            Manage
                          </Button>
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            )}
          </Box>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}