import React, { useEffect, useState } from 'react';
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, useToast, Spinner, Center, IconButton
} from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const POLL_INTERVAL = 5000; // 5 seconds

const ManageAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Fetch ads with polling for real-time updates
  useEffect(() => {
    let interval;
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
    interval = setInterval(fetchAds, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/ads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAds((prev) => prev.filter((ad) => ad._id !== id));
      toast({ title: 'Ad deleted', status: 'success', duration: 2000 });
    } catch (err) {
      toast({ title: 'Failed to delete ad', status: 'error', duration: 2000 });
    }
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box maxW="6xl" mx="auto" py={10}>
        <Heading size="lg" color="red.500" mb={6}>Manage Ads</Heading>
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          {loading ? (
            <Center py={10}><Spinner size="lg" color="red.400" /></Center>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Status</Th>
                  <Th>Impressions</Th>
                  <Th>Clicks</Th>
                  <Th>Engagement</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {ads.length === 0 ? (
                  <Tr><Td colSpan={6}><Center>No ads found.</Center></Td></Tr>
                ) : (
                  ads.map((ad) => (
                    <Tr key={ad._id}>
                      <Td>{ad.title}</Td>
                      <Td>{ad.status === 'pending' ? 'Active' : ad.status ? ad.status.charAt(0).toUpperCase() + ad.status.slice(1) : 'Draft'}</Td>
                      <Td>{ad.impressions || 0}</Td>
                      <Td>{ad.clicks || 0}</Td>
                      <Td>{ad.engagement || '0%'}</Td>
                      <Td>
                        <IconButton
                          icon={<FiEdit />}
                          colorScheme="orange"
                          size="sm"
                          mr={2}
                          aria-label="Edit"
                          // onClick={() => handleEdit(ad._id)}
                          isDisabled
                        />
                        <IconButton
                          icon={<FiTrash2 />}
                          colorScheme="red"
                          size="sm"
                          aria-label="Delete"
                          onClick={() => handleDelete(ad._id)}
                        />
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ManageAds; 