import React, { useEffect, useState } from 'react';
import {
  Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Table, Thead, Tbody, Tr, Th, Td, Spinner, Center, useColorModeValue
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#FF4D4D', '#FFB347', '#4D96FF', '#4DFFB3', '#FFD24D'];

const Analytics = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://adsense-21ou.onrender.com/api/ads/my-ads', {
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

  const totalImpressions = ads.reduce((sum, ad) => sum + (Number(ad.impressions) || 0), 0);
  const totalClicks = ads.reduce((sum, ad) => sum + (Number(ad.clicks) || 0), 0);
  const avgEngagement = ads.length
    ? (ads.reduce((sum, ad) => sum + (parseFloat(ad.engagement) || 0), 0) / ads.length).toFixed(1) + '%'
    : '0%';

  const topAds = [...ads].sort((a, b) => (b.impressions || 0) - (a.impressions || 0)).slice(0, 5);

  // Prepare data for line chart (group by date)
  const chartData = (() => {
    const map = {};
    ads.forEach(ad => {
      const date = new Date(ad.createdAt).toLocaleDateString();
      if (!map[date]) map[date] = { date, Impressions: 0, Clicks: 0 };
      map[date].Impressions += Number(ad.impressions) || 0;
      map[date].Clicks += Number(ad.clicks) || 0;
    });
    return Object.values(map).sort((a, b) => new Date(a.date) - new Date(b.date));
  })();

  // Prepare data for pie chart (category distribution)
  const categoryData = (() => {
    const map = {};
    ads.forEach(ad => {
      if (!map[ad.category]) map[ad.category] = 0;
      map[ad.category] += 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  })();

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box maxW="6xl" mx="auto" py={10}>
        <Heading size="lg" color="red.500" mb={8}>Analytics</Heading>
        {loading ? (
          <Center py={10}><Spinner size="lg" color="red.400" /></Center>
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={10}>
              <Stat p={6} bg="white" borderRadius="lg" boxShadow="md">
                <StatLabel>Total Impressions</StatLabel>
                <StatNumber>{totalImpressions}</StatNumber>
                <StatHelpText>All campaigns</StatHelpText>
              </Stat>
              <Stat p={6} bg="white" borderRadius="lg" boxShadow="md">
                <StatLabel>Total Clicks</StatLabel>
                <StatNumber>{totalClicks}</StatNumber>
                <StatHelpText>All campaigns</StatHelpText>
              </Stat>
              <Stat p={6} bg="white" borderRadius="lg" boxShadow="md">
                <StatLabel>Avg. Engagement</StatLabel>
                <StatNumber>{avgEngagement}</StatNumber>
                <StatHelpText>All campaigns</StatHelpText>
              </Stat>
            </SimpleGrid>
            {/* Line Chart */}
            <Box bg="white" borderRadius="lg" boxShadow="md" p={8} mb={10} textAlign="center">
              <Heading size="md" mb={4}>Impressions & Clicks Over Time</Heading>
              <Box h="250px">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Impressions" stroke="#FF4D4D" strokeWidth={2} />
                    <Line type="monotone" dataKey="Clicks" stroke="#4D96FF" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>
            {/* Pie Chart */}
            <Box bg="white" borderRadius="lg" boxShadow="md" p={8} mb={10} textAlign="center">
              <Heading size="md" mb={4}>Top Categories</Heading>
              <Box h="250px" display="flex" alignItems="center" justifyContent="center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#FF4D4D"
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Box>
            <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
              <Heading size="md" mb={4}>Top Performing Ads</Heading>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Impressions</Th>
                    <Th>Clicks</Th>
                    <Th>Engagement</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {topAds.length === 0 ? (
                    <Tr><Td colSpan={4}><Center>No ads found.</Center></Td></Tr>
                  ) : (
                    topAds.map((ad) => (
                      <Tr key={ad._id}>
                        <Td>{ad.title}</Td>
                        <Td>{ad.impressions || 0}</Td>
                        <Td>{ad.clicks || 0}</Td>
                        <Td>{ad.engagement || '0%'}</Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </Box>
          </>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Analytics; 