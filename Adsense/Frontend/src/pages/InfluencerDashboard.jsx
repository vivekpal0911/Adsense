import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Avatar,
  VStack,
  HStack,
  Stack,
  Badge,
  Divider,
  SimpleGrid,
  Icon,
  Button,
  useColorModeValue,
  Spinner,
  Center,
  useToast,
} from '@chakra-ui/react';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';

const sidebarLinks = [
  { label: 'Dashboard', to: '/influencer/dashboard' },
  { label: 'Profile', to: '/influencer/profile' },
  { label: 'Earnings', to: '/influencer/earnings' },
  { label: 'Messages', to: '/influencer/messages' },
];

export default function InfluencerDashboard() {
  const { user } = useAuth();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [actionLoading, setActionLoading] = useState({});

  // Fallbacks for demo if user is missing fields
  const name = user?.name || 'Influencer';
  const followers = user?.socialMedia?.reduce((sum, s) => sum + (s.followers || 0), 0) || 0;
  const costPerAd = user?.costPerAd || 430;
  const categories = user?.categories && user.categories.length > 0 ? user.categories : ['Fashion', 'Fitness', 'Travel'];
  const social = user?.socialMedia?.length
    ? user.socialMedia.map((s) => ({
        platform: s.platform,
        icon: s.platform === 'Instagram' ? FaInstagram : s.platform === 'YouTube' ? FaYoutube : FaTiktok,
        followers: s.followers,
      }))
    : [
        { platform: 'Instagram', icon: FaInstagram, followers: 150000 },
        { platform: 'YouTube', icon: FaYoutube, followers: 200000 },
        { platform: 'TikTok', icon: FaTiktok, followers: 80000 },
      ];
  const mockEarnings = 1800;

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://adsense-21ou.onrender.com/api/ads', {
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

  // Accept Ad
  const handleAccept = async (adId) => {
    setActionLoading((prev) => ({ ...prev, [adId]: true }));
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://adsense-21ou.onrender.com/api/ads/${adId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAds((prev) => prev.filter((ad) => ad._id !== adId));
      toast({
        title: 'Ad Accepted',
        description: 'The company has been notified.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Failed to accept ad.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setActionLoading((prev) => ({ ...prev, [adId]: false }));
    }
  };

  // Reject Ad
  const handleReject = async (adId) => {
    setActionLoading((prev) => ({ ...prev, [adId]: true }));
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://adsense-21ou.onrender.com/api/ads/${adId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAds((prev) => prev.filter((ad) => ad._id !== adId));
      toast({
        title: 'Ad Rejected',
        description: 'The company has been notified.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Failed to reject ad.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setActionLoading((prev) => ({ ...prev, [adId]: false }));
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
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
            <Avatar size="sm" name={name} />
            <Text fontWeight="bold" fontSize="lg" color="gray.700">{name}</Text>
          </HStack>
          <VStack align="stretch" spacing={1}>
            {sidebarLinks.map((link) => (
              <Button
                key={link.label}
                as={RouterLink}
                to={link.to}
                variant={link.label === 'Dashboard' ? 'solid' : 'ghost'}
                colorScheme={link.label === 'Dashboard' ? 'red' : 'gray'}
                justifyContent="flex-start"
                fontWeight={link.label === 'Dashboard' ? 'bold' : 'normal'}
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

        {/* Main Content */}
        <Box flex={1} p={{ base: 4, md: 10 }}>
          {/* Profile Card */}
          <Box bg={useColorModeValue('white', 'gray.800')} p={8} borderRadius="lg" boxShadow="md" mb={8}>
            <HStack spacing={8} align="flex-start">
              <Avatar size="2xl" name={name} />
              <VStack align="flex-start" spacing={2} flex={1}>
                <Text fontWeight="bold" fontSize="2xl" color="red.500">{name}</Text>
                <Text color="gray.600">Total Followers: {followers.toLocaleString()}</Text>
                <Text color="gray.600">Cost per Ad: <b>${costPerAd.toFixed(2)}</b></Text>
                <Box>
                  <Text fontWeight="bold" mb={1}>Connected Social Media:</Text>
                  <VStack align="flex-start" spacing={1}>
                    {social.map((s) => (
                      <HStack key={s.platform} spacing={2}>
                        <Icon as={s.icon} color="gray.500" />
                        <Text color="gray.700">{s.platform}: {s.followers.toLocaleString()} followers</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={1}>Selected Categories:</Text>
                  <HStack spacing={2}>
                    {categories.map((cat) => (
                      <Badge key={cat} colorScheme={cat === 'Fashion' ? 'pink' : cat === 'Fitness' ? 'green' : cat === 'Travel' ? 'blue' : 'gray'} px={3} py={1} borderRadius="md" fontSize="md">
                        {cat.toUpperCase()}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              </VStack>
            </HStack>
          </Box>

          {/* Earnings Card */}
          <Box bg={useColorModeValue('white', 'gray.800')} p={8} borderRadius="lg" boxShadow="md" mb={8}>
            <Text fontWeight="bold" fontSize="xl" color="red.500" mb={2}>Your Earnings</Text>
            <Text color="gray.600" fontSize="md">Total Earnings</Text>
            <Text fontWeight="bold" fontSize="3xl" color="gray.800">${mockEarnings.toLocaleString()}</Text>
            <Text color="gray.400" fontSize="sm">From accepted ads</Text>
          </Box>

          {/* Active Campaigns Table */}
          <Box bg={useColorModeValue('white', 'gray.800')} p={8} borderRadius="lg" boxShadow="md" mb={8}>
            <Text fontWeight="bold" fontSize="xl" color="red.500" mb={4}>Active Campaigns</Text>
            {loading ? (
              <Center py={10}><Spinner size="lg" color="red.400" /></Center>
            ) : (
              <Box overflowX="auto">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '12px 8px' }}>Campaign Name</th>
                      <th style={{ textAlign: 'left', padding: '12px 8px' }}>Status</th>
                      <th style={{ textAlign: 'left', padding: '12px 8px' }}>Impressions</th>
                      <th style={{ textAlign: 'left', padding: '12px 8px' }}>Clicks</th>
                      <th style={{ textAlign: 'left', padding: '12px 8px' }}>Engagement</th>
                      <th style={{ textAlign: 'left', padding: '12px 8px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ads.length === 0 ? (
                      <tr><td colSpan={6} style={{ textAlign: 'center', padding: '16px' }}>No campaigns found.</td></tr>
                    ) : (
                      ads.map((ad) => (
                        <tr key={ad._id}>
                          <td style={{ padding: '12px 8px' }}>{ad.title}</td>
                          <td style={{ padding: '12px 8px' }}>{ad.status === 'pending' ? 'Pending' : ad.status === 'accepted' ? 'Accepted' : ad.status}</td>
                          <td style={{ padding: '12px 8px' }}>{ad.impressions || 0}</td>
                          <td style={{ padding: '12px 8px' }}>{ad.clicks || 0}</td>
                          <td style={{ padding: '12px 8px' }}>{ad.engagement || '0%'}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <Button
                              colorScheme="red"
                              size="sm"
                              onClick={() => {}}
                              isDisabled
                            >
                              Manage
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </Box>
            )}
          </Box>

          {/* Relevant Ads */}
          <Box bg={useColorModeValue('white', 'gray.800')} p={8} borderRadius="lg" boxShadow="md">
            <Text fontWeight="bold" fontSize="xl" color="red.500" mb={2}>Relevant Ads</Text>
            <Text color="gray.600" mb={4}>Ads matching your selected categories: {categories.join(', ')}</Text>
            {loading ? (
              <Center py={10}><Spinner size="lg" color="red.400" /></Center>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {ads.length === 0 ? (
                  <Text color="gray.400" fontSize="lg" gridColumn="1/-1">No relevant ads found.</Text>
                ) : (
                  ads.map((ad) => (
                    <Box key={ad._id} p={5} borderWidth={1} borderRadius="md" borderColor="gray.200" bg={useColorModeValue('gray.50', 'gray.700')}>
                      <Text fontWeight="bold" fontSize="lg">{ad.title}</Text>
                      <Text color="gray.600" fontSize="md">Company: <b>{ad.companyId?.name || 'Unknown'}</b></Text>
                      <Text color="gray.600" fontSize="md">Category: <Badge colorScheme={ad.category === 'Fashion' ? 'pink' : ad.category === 'Fitness' ? 'green' : ad.category === 'Travel' ? 'blue' : 'gray'}>{ad.category}</Badge></Text>
                      <HStack mt={4} spacing={4}>
                        <Button
                          colorScheme="green"
                          size="sm"
                          isLoading={actionLoading[ad._id]}
                          onClick={() => handleAccept(ad._id)}
                        >
                          Accept
                        </Button>
                        <Button
                          colorScheme="red"
                          size="sm"
                          variant="outline"
                          isLoading={actionLoading[ad._id]}
                          onClick={() => handleReject(ad._id)}
                        >
                          Reject
                        </Button>
                      </HStack>
                    </Box>
                  ))
                )}
              </SimpleGrid>
            )}
          </Box>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}