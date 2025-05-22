import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, extendTheme, Spinner, Center } from '@chakra-ui/react';
import { useAuth } from './contexts/AuthContext.jsx';
import HomePage from './pages/HomePage.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import InfluencerDashboard from './pages/InfluencerDashboard.jsx';
import CompanyDashboard from './pages/CompanyDashboard.jsx';
import InfluencerProfile from './pages/InfluencerProfile.jsx';
import CompanyProfile from './pages/CompanyProfile.jsx';
import CreateAd from './pages/CreateAd.jsx';
import SmartMatching from './pages/SmartMatching.jsx';
import PerformanceAnalytics from './pages/PerformanceAnalytics.jsx';
import SecurePayments from './pages/SecurePayments.jsx';
import Features from './pages/Features.jsx';
import Pricing from './pages/Pricing.jsx';
import About from './pages/About.jsx';
import ManageAds from './pages/ManageAds.jsx';
import DiscoverInfluencers from './pages/DiscoverInfluencers.jsx';
import Analytics from './pages/Analytics.jsx';
import Messages from './pages/Messages.jsx';
import CompanyLayout from './pages/CompanyLayout.jsx';
import InfluencerLayout from './pages/InfluencerLayout.jsx';

// ... existing code ...

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/smart-matching" element={<SmartMatching />} />
          <Route path="/performance-analytics" element={<PerformanceAnalytics />} />
          <Route path="/secure-payments" element={<SecurePayments />} />

          {/* Company Dashboard Layout */}
          <Route path="/company" element={<ProtectedRoute role="company"><CompanyLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<CompanyDashboard />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<CompanyProfile />} />
            <Route path="create-ad" element={<CreateAd />} />
            <Route path="manage-ads" element={<ManageAds />} />
            <Route path="discover-influencers" element={<DiscoverInfluencers />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>

          {/* Influencer Dashboard Layout */}
          <Route path="/influencer" element={<ProtectedRoute role="influencer"><InfluencerLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<InfluencerDashboard />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<InfluencerProfile />} />
            {/* Add more influencer routes as needed */}
          </Route>

          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App; 