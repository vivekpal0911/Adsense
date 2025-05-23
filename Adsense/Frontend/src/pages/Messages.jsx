import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Heading, Flex, VStack, HStack, Avatar, Text, Input, Button, Spinner, Center, useToast, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, List, ListItem
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingConvos, setLoadingConvos] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [newMsg, setNewMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const toast = useToast();
  const chatRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch conversations
  useEffect(() => {
    const fetchConvos = async () => {
      setLoadingConvos(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://adsense-21ou.onrender.com/api/messages/conversations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConversations(res.data);
      } catch {
        setConversations([]);
      } finally {
        setLoadingConvos(false);
      }
    };
    fetchConvos();
  }, []);

  // Fetch messages for selected user
  useEffect(() => {
    if (!selectedUser) return;
    let interval;
    const fetchMsgs = async () => {
      setLoadingMsgs(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://adsense-21ou.onrender.com/api/messages/${selectedUser._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
        setTimeout(() => {
          if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }, 100);
      } catch {
        setMessages([]);
      } finally {
        setLoadingMsgs(false);
      }
    };
    fetchMsgs();
    interval = setInterval(fetchMsgs, 5000);
    return () => clearInterval(interval);
  }, [selectedUser]);

  // Fetch all users for new chat
  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://adsense-21ou.onrender.com/api/messages/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUsers(res.data);
    } catch {
      setAllUsers([]);
    }
  };

  const handleSend = async () => {
    if (!newMsg.trim() || !selectedUser) return;
    setSending(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://adsense-21ou.onrender.com/api/messages', {
        receiver: selectedUser._id,
        content: newMsg.trim(),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewMsg('');
    } catch {
      toast({ title: 'Failed to send message', status: 'error' });
    } finally {
      setSending(false);
    }
  };

  // Filter users for search
  const filteredUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box maxW="6xl" mx="auto" py={10}>
        <Heading size="lg" color="red.500" mb={8}>Messages</Heading>
        <Flex bg="white" borderRadius="lg" boxShadow="md" minH="500px" overflow="hidden">
          {/* Conversations List */}
          <VStack w={{ base: '40%', md: '30%' }} bg="gray.50" p={4} spacing={2} align="stretch" borderRight="1px solid #eee">
            <HStack justify="space-between" mb={2}>
              <Text fontWeight="bold">Conversations</Text>
              <Button size="xs" colorScheme="red" onClick={() => { fetchAllUsers(); onOpen(); }}>New Message</Button>
            </HStack>
            {loadingConvos ? <Spinner /> : conversations.length === 0 ? <Text>No conversations</Text> : (
              conversations.map(user => (
                <HStack
                  key={user._id}
                  p={2}
                  borderRadius="md"
                  bg={selectedUser && selectedUser._id === user._id ? 'orange.100' : 'transparent'}
                  cursor="pointer"
                  _hover={{ bg: 'orange.50' }}
                  onClick={() => setSelectedUser(user)}
                  spacing={3}
                  align="center"
                >
                  <Avatar size="sm" name={user.name} />
                  <Text fontWeight="medium">{user.name}</Text>
                </HStack>
              ))
            )}
          </VStack>
          {/* Chat Window */}
          <Flex direction="column" flex={1} p={4} minH="500px">
            {selectedUser ? (
              <>
                <HStack mb={2} spacing={3} align="center">
                  <Avatar size="sm" name={selectedUser.name} />
                  <Text fontWeight="bold">{selectedUser.name}</Text>
                </HStack>
                <Divider mb={2} />
                <Box ref={chatRef} flex={1} overflowY="auto" maxH="350px" minH="350px" bg="gray.50" borderRadius="md" p={3} mb={3}>
                  {loadingMsgs ? <Center py={10}><Spinner /></Center> : messages.length === 0 ? <Text color="gray.400">No messages yet</Text> : (
                    messages.map((msg, idx) => (
                      <Box key={idx} mb={2} textAlign={msg.sender === selectedUser._id ? 'left' : 'right'}>
                        <Box
                          display="inline-block"
                          bg={msg.sender === selectedUser._id ? 'gray.200' : 'red.100'}
                          color="gray.800"
                          px={3}
                          py={2}
                          borderRadius="xl"
                          fontSize="sm"
                        >
                          {msg.content}
                        </Box>
                        <Text fontSize="xs" color="gray.400" mt={1}>{new Date(msg.createdAt).toLocaleTimeString()}</Text>
                      </Box>
                    ))
                  )}
                </Box>
                <HStack mt="auto">
                  <Input
                    placeholder="Type a message..."
                    value={newMsg}
                    onChange={e => setNewMsg(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                    isDisabled={sending}
                  />
                  <Button colorScheme="red" onClick={handleSend} isLoading={sending}>Send</Button>
                </HStack>
              </>
            ) : (
              <Center flex={1} color="gray.400">Select a conversation to start chatting</Center>
            )}
          </Flex>
        </Flex>
        {/* New Message Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Start New Chat</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Search users by name or email..."
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                mb={3}
              />
              <List maxH="250px" overflowY="auto">
                {filteredUsers.length === 0 ? (
                  <ListItem color="gray.400">No users found</ListItem>
                ) : filteredUsers.map(u => (
                  <ListItem
                    key={u._id}
                    p={2}
                    borderRadius="md"
                    _hover={{ bg: 'orange.50', cursor: 'pointer' }}
                    onClick={() => { setSelectedUser(u); onClose(); }}
                  >
                    <HStack spacing={3} align="center">
                      <Avatar size="sm" name={u.name} />
                      <Box>
                        <Text fontWeight="medium">{u.name}</Text>
                        <Text fontSize="xs" color="gray.500">{u.email}</Text>
                        <Text fontSize="xs" color="gray.400">{u.role}</Text>
                      </Box>
                    </HStack>
                  </ListItem>
                ))}
              </List>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
      <Footer />
    </Box>
  );
};

export default Messages; 