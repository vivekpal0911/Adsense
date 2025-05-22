import React, { useEffect, useState } from 'react';
import {
  Box, Heading, SimpleGrid, Avatar, Text, Tag, TagLabel, Button, VStack, HStack, Spinner, Center, useToast, Input, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex, Checkbox, CheckboxGroup, Stack
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const categoryOptions = ['Fashion', 'Fitness', 'Travel', 'Tech', 'Food'];

const DiscoverInfluencers = () => {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [minFollowers, setMinFollowers] = useState(0);
  const [maxFollowers, setMaxFollowers] = useState(1000000);
  const [followersRange, setFollowersRange] = useState([0, 1000000]);
  const toast = useToast();

  // Fetch influencers with filters
  const fetchInfluencers = async (filters = {}) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.categories && filters.categories.length > 0) params.categories = filters.categories.join(',');
      if (filters.minFollowers !== undefined) params.minFollowers = filters.minFollowers;
      if (filters.maxFollowers !== undefined) params.maxFollowers = filters.maxFollowers;
      const res = await axios.get('http://localhost:5001/api/users/influencers', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setInfluencers(res.data);
    } catch (err) {
      setInfluencers([]);
    } finally {
      setLoading(false);
    }
  };

  // Get min/max followers for slider
  useEffect(() => {
    const getRange = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/users/influencers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allFollowers = res.data.map(inf => (inf.socialMedia || []).reduce((sum, s) => sum + (s.followers || 0), 0));
        const minF = Math.min(...allFollowers, 0);
        const maxF = Math.max(...allFollowers, 1000);
        setFollowersRange([minF, maxF]);
        setMinFollowers(minF);
        setMaxFollowers(maxF);
      } catch {
        setFollowersRange([0, 1000000]);
        setMinFollowers(0);
        setMaxFollowers(1000000);
      }
    };
    getRange();
  }, []);

  // Fetch influencers on filter change
  useEffect(() => {
    fetchInfluencers({ search, categories, minFollowers, maxFollowers });
    // eslint-disable-next-line
  }, [search, categories, minFollowers, maxFollowers]);

  const handleInvite = (influencer) => {
    toast({ title: `Invite sent to ${influencer.name}`, status: 'success', duration: 2000 });
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box maxW="7xl" mx="auto" py={10}>
        <Heading size="lg" color="red.500" mb={8}>Discover Influencers</Heading>
        {/* Filters */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={8}>
          <Flex direction={{ base: 'column', md: 'row' }} gap={4} align="center">
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              maxW="250px"
            />
            <CheckboxGroup value={categories} onChange={setCategories}>
              <Stack direction="row" spacing={4} wrap="wrap">
                {categoryOptions.map(cat => (
                  <Checkbox key={cat} value={cat}>{cat}</Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
            <Box flex={1} maxW="350px">
              <Text fontSize="sm" mb={1}>Followers Range: {minFollowers} - {maxFollowers}</Text>
              <Slider
                min={followersRange[0]}
                max={followersRange[1]}
                value={[minFollowers, maxFollowers]}
                onChange={val => {
                  setMinFollowers(val[0]);
                  setMaxFollowers(val[1]);
                }}
                minStepsBetweenThumbs={1}
                step={100}
                aria-label={['min', 'max']}
                colorScheme="red"
                isRange
              >
                <SliderTrack><SliderFilledTrack /></SliderTrack>
                <SliderThumb index={0} />
                <SliderThumb index={1} />
              </Slider>
            </Box>
          </Flex>
        </Box>
        {loading ? (
          <Center py={10}><Spinner size="lg" color="red.400" /></Center>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
            {influencers.length === 0 ? (
              <Text>No influencers found.</Text>
            ) : (
              influencers.map((inf) => (
                <VStack key={inf._id} p={6} bg="white" borderRadius="lg" boxShadow="md" align="center" spacing={4}>
                  <Avatar size="xl" name={inf.name} src={inf.avatar} />
                  <Text fontWeight="bold" fontSize="lg" color="red.500">{inf.name}</Text>
                  <HStack spacing={2} wrap="wrap">
                    {inf.categories && inf.categories.map((cat) => (
                      <Tag key={cat} colorScheme="orange" borderRadius="full"><TagLabel>{cat}</TagLabel></Tag>
                    ))}
                  </HStack>
                  <Text color="gray.600">Followers: {inf.socialMedia?.reduce((sum, s) => sum + (s.followers || 0), 0) || 0}</Text>
                  <Button colorScheme="red" onClick={() => handleInvite(inf)} w="full">Invite</Button>
                </VStack>
              ))
            )}
          </SimpleGrid>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default DiscoverInfluencers; 