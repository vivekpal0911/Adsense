import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Avatar,
  Button,
  Select,
  HStack,
  Icon,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiSave, FiTrash2 } from 'react-icons/fi';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';

const categoriesList = ['Fashion', 'Fitness', 'Travel', 'Tech', 'Food'];
const platformIcons = {
  Instagram: <FaInstagram />,
  YouTube: <FaYoutube />,
  TikTok: <FaTiktok />,
};

const InfluencerProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [influencerProfile, setInfluencerProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [error, setError] = useState('');
  const [newPlatform, setNewPlatform] = useState({ platform: '', followers: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const res = await axios.get('https://adsense-21ou.onrender.com/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setInfluencerProfile(res.data);
        setEditedProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      }
    };

    fetchProfile();
  }, [user]);

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const res = await axios.put('https://adsense-21ou.onrender.com/api/users/profile', editedProfile, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setInfluencerProfile(res.data);
        setEditedProfile(res.data);
      } catch (err) {
        console.error('Error updating profile:', err);
        setError('Failed to update profile');
      }
    }
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (field, value) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialMediaChange = (index, field, value) => {
    const updatedSocialMedia = [...editedProfile.socialMedia];
    updatedSocialMedia[index] = { ...updatedSocialMedia[index], [field]: value };
    setEditedProfile((prev) => ({ ...prev, socialMedia: updatedSocialMedia }));
  };

  const handleAddPlatform = () => {
    if (!newPlatform.platform || !newPlatform.followers) return;
    setEditedProfile((prev) => ({
      ...prev,
      socialMedia: [
        ...prev.socialMedia,
        { platform: newPlatform.platform, followers: parseInt(newPlatform.followers) },
      ],
    }));
    setNewPlatform({ platform: '', followers: '' });
  };

  const handleRemovePlatform = (index) => {
    const updatedSocialMedia = editedProfile.socialMedia.filter((_, i) => i !== index);
    setEditedProfile((prev) => ({ ...prev, socialMedia: updatedSocialMedia }));
  };

  const handleCategoryChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    handleProfileChange('categories', selected);
  };

  const handleBackToDashboard = () => {
    navigate('/influencer/dashboard');
  };

  if (!influencerProfile) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="brand.500" />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box minH="calc(100vh - 160px)" p={6} bg="gray.50">
        <Flex justify="space-between" align="center" mb={4}>
          <Flex align="center">
            <Avatar
              name={influencerProfile.name}
              size="lg"
              bg="brand.500"
              color="white"
              mr={4}
            />
            <Heading size="lg" color="brand.500">{influencerProfile.name}</Heading>
          </Flex>
          <IconButton
            icon={isEditing ? <FiSave /> : <FiEdit />}
            onClick={handleEditToggle}
            colorScheme={isEditing ? 'green' : 'brand'}
            aria-label={isEditing ? 'Save Profile' : 'Edit Profile'}
          />
        </Flex>
        {error && (
          <Text color="red.500" mb={4}>
            {error}
          </Text>
        )}
        <Box p={6} bg="white" borderRadius="md" boxShadow="md">
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              {isEditing ? (
                <Input
                  value={editedProfile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  focusBorderColor="brand.500"
                />
              ) : (
                <Text>{influencerProfile.name}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Text>{influencerProfile.email}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Text>{influencerProfile.role.charAt(0).toUpperCase() + influencerProfile.role.slice(1)}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Contact Information (Phone)</FormLabel>
              {isEditing ? (
                <Input
                  value={editedProfile.contactInfo}
                  onChange={(e) => handleProfileChange('contactInfo', e.target.value)}
                  type="tel"
                  focusBorderColor="brand.500"
                />
              ) : (
                <Text>{influencerProfile.contactInfo}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Social Media Platforms</FormLabel>
              {isEditing ? (
                <>
                  {editedProfile.socialMedia.map((sm, index) => (
                    <HStack key={index} spacing={2} mb={2}>
                      <Input
                        value={sm.platform}
                        onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                        placeholder="Platform"
                        focusBorderColor="brand.500"
                      />
                      <Input
                        value={sm.followers}
                        onChange={(e) => handleSocialMediaChange(index, 'followers', parseInt(e.target.value))}
                        type="number"
                        placeholder="Followers"
                        focusBorderColor="brand.500"
                      />
                      <IconButton
                        icon={<FiTrash2 />}
                        colorScheme="red"
                        onClick={() => handleRemovePlatform(index)}
                        aria-label="Remove Platform"
                      />
                    </HStack>
                  ))}
                  <HStack spacing={2}>
                    <Select
                      value={newPlatform.platform}
                      onChange={(e) => setNewPlatform((prev) => ({ ...prev, platform: e.target.value }))}
                      placeholder="Select Platform"
                      focusBorderColor="brand.500"
                    >
                      <option value="Instagram">Instagram</option>
                      <option value="YouTube">YouTube</option>
                      <option value="TikTok">TikTok</option>
                    </Select>
                    <Input
                      value={newPlatform.followers}
                      onChange={(e) => setNewPlatform((prev) => ({ ...prev, followers: e.target.value }))}
                      type="number"
                      placeholder="Followers"
                      focusBorderColor="brand.500"
                    />
                    <Button onClick={handleAddPlatform} colorScheme="brand">
                      Add
                    </Button>
                  </HStack>
                </>
              ) : (
                <VStack align="start">
                  {influencerProfile.socialMedia.length > 0 ? (
                    influencerProfile.socialMedia.map((sm, index) => (
                      <Flex key={index} align="center">
                        {platformIcons[sm.platform] && <Icon as={() => platformIcons[sm.platform]} mr={2} />}
                        <Text>
                          {sm.platform}: {sm.followers.toLocaleString()} followers
                        </Text>
                      </Flex>
                    ))
                  ) : (
                    <Text>None</Text>
                  )}
                </VStack>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Total Followers</FormLabel>
              <Text>
                {(influencerProfile.socialMedia || []).reduce((sum, sm) => sum + (sm.followers || 0), 0).toLocaleString()}
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel>Categories</FormLabel>
              {isEditing ? (
                <Select
                  multiple
                  value={editedProfile.categories || []}
                  onChange={handleCategoryChange}
                  focusBorderColor="brand.500"
                  height="100px"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              ) : (
                <Text>{influencerProfile.categories?.join(', ') || 'None'}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              {isEditing ? (
                <Textarea
                  value={editedProfile.description}
                  onChange={(e) => handleProfileChange('description', e.target.value)}
                  focusBorderColor="brand.500"
                  rows={3}
                />
              ) : (
                <Text>{influencerProfile.description}</Text>
              )}
            </FormControl>
          </VStack>
        </Box>
        <Button mt={6} colorScheme="brand" onClick={handleBackToDashboard}>
          Back to Dashboard
        </Button>
      </Box>
      <Footer />
    </>
  );
};

export default InfluencerProfile;