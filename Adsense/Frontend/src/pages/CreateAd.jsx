import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Heading,
  useToast,
  Container,
  Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

export default function CreateAd() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://adsense-21ou.onrender.com/api/ads',
        { title, description, budget, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: 'Ad Created!',
        description: 'Your ad has been created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/company/dashboard');
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Failed to create ad.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Container maxW="lg" py={12}>
        <Box bg="white" p={8} borderRadius="lg" boxShadow="lg">
          <Heading mb={6} color="red.400" size="lg" textAlign="center">
            Create New Ad
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Ad Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Describe your campaign..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Budget ($)</FormLabel>
                <Input
                  type="number"
                  placeholder="Budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  min={0}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  placeholder="Select category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Fashion">Fashion</option>
                  <option value="Tech">Tech</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <Button
                colorScheme="red"
                type="submit"
                isLoading={loading}
                size="lg"
                mt={2}
              >
                Create Ad
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
} 