import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Select, Textarea, Button, VStack, Text, HStack, Checkbox, CheckboxGroup, Stack, RadioGroup, Radio } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    contactInfo: '',
    industry: '',
    companySize: '',
    website: '',
    socialMedia: [],
    description: '',
    categories: [],
  });
  const [error, setError] = useState('');
  const [newPlatform, setNewPlatform] = useState({ platform: '', followers: '' });

  const categoriesList = ['Fashion', 'Fitness', 'Travel', 'Tech', 'Food'];
  const companyIndustries = ['Technology', 'Fashion', 'Beauty', 'Fitness', 'Travel', 'Food & Beverage', 'Gaming', 'Lifestyle', 'Healthcare', 'Finance'];
  const companySizes = ['Small (1-50 employees)', 'Medium (51-200 employees)', 'Large (201+ employees)'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData((prev) => ({ ...prev, categories: selected }));
  };

  const handleAddPlatform = () => {
    if (!newPlatform.platform || !newPlatform.followers) return;
    setFormData((prev) => ({
      ...prev,
      socialMedia: [
        ...prev.socialMedia,
        { platform: newPlatform.platform, followers: parseInt(newPlatform.followers) },
      ],
    }));
    setNewPlatform({ platform: '', followers: '' });
  };

  const handleRemovePlatform = (index) => {
    const updatedSocialMedia = formData.socialMedia.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, socialMedia: updatedSocialMedia }));
  };

  const handleSubmit = async () => {
    try {
      setError('');
      const user = await signup(formData);
      if (user.role === 'influencer') {
        navigate('/influencer/dashboard');
      } else {
        navigate('/company/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Box minH="calc(100vh - 160px)" p={6} bg="gray.50" display="flex" justifyContent="center">
        <Box p={6} bg="white" borderRadius="md" boxShadow="md" w="full" maxW="md">
          <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">Signup</Text>
            {error && <Text color="red.500">{error}</Text>}
            <FormControl as="fieldset">
              <FormLabel as="legend">Role</FormLabel>
              <RadioGroup
                name="role"
                value={formData.role}
                onChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
              >
                <HStack spacing="24px">
                  <Radio value="influencer">Influencer</Radio>
                  <Radio value="company">Company</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>{formData.role === 'company' ? 'Company Name' : 'Name'}</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" value={formData.password} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Contact Information (Phone)</FormLabel>
              <Input type="tel" name="contactInfo" value={formData.contactInfo} onChange={handleChange} />
            </FormControl>
            {formData.role === 'company' && (
              <>
                <FormControl>
                  <FormLabel>Industry</FormLabel>
                  <Select name="industry" value={formData.industry} onChange={handleChange} placeholder="Select industry">
                    {companyIndustries.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Company Size</FormLabel>
                  <Select name="companySize" value={formData.companySize} onChange={handleChange} placeholder="Select size">
                    {companySizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Website</FormLabel>
                  <Input type="url" name="website" value={formData.website} onChange={handleChange} />
                </FormControl>
              </>
            )}
            {formData.role === 'influencer' && (
              <>
                <FormControl>
                  <FormLabel>Social Media Platforms</FormLabel>
                  {formData.socialMedia.map((sm, index) => (
                    <HStack key={index} spacing={2} mb={2}>
                      <Input value={sm.platform} isReadOnly />
                      <Input value={sm.followers} isReadOnly />
                      <Button colorScheme="red" onClick={() => handleRemovePlatform(index)}>Remove</Button>
                    </HStack>
                  ))}
                  <HStack spacing={2}>
                    <Select
                      value={newPlatform.platform}
                      onChange={(e) => setNewPlatform((prev) => ({ ...prev, platform: e.target.value }))}
                      placeholder="Select Platform"
                    >
                      <option value="Instagram">Instagram</option>
                      <option value="YouTube">YouTube</option>
                      <option value="TikTok">TikTok</option>
                    </Select>
                    <Input
                      type="number"
                      value={newPlatform.followers}
                      onChange={(e) => setNewPlatform((prev) => ({ ...prev, followers: e.target.value }))}
                      placeholder="Followers"
                    />
                    <Button onClick={handleAddPlatform} colorScheme="brand">Add</Button>
                  </HStack>
                </FormControl>
                <FormControl>
                  <FormLabel>Categories</FormLabel>
                  <CheckboxGroup
                    colorScheme="brand"
                    value={formData.categories}
                    onChange={(values) => setFormData((prev) => ({ ...prev, categories: values }))}
                  >
                    <Stack spacing={2}>
                      {categoriesList.map((cat) => {
                        const isChecked = formData.categories.includes(cat);
                        const isDisabled = !isChecked && formData.categories.length >= 3;
                        return (
                          <Checkbox key={cat} value={cat} isDisabled={isDisabled}>
                            {cat}
                          </Checkbox>
                        );
                      })}
                    </Stack>
                  </CheckboxGroup>
                </FormControl>
              </>
            )}
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea name="description" value={formData.description} onChange={handleChange} />
            </FormControl>
            <Button colorScheme="brand" onClick={handleSubmit}>Signup</Button>
          </VStack>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Signup;