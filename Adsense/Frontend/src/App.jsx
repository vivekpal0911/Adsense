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

const theme = extendTheme({
  colors: {
    brand: {
      500: '#FF4D4D',
    },
  },
});

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  // While loading, show a spinner instead of redirecting
  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  // After loading, check if user exists
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check role after confirming user exists
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/smart-matching" element={<SmartMatching />} />
          <Route path="/performance-analytics" element={<PerformanceAnalytics />} />
          <Route path="/secure-payments" element={<SecurePayments />} />
          <Route
            path="/influencer/dashboard"
            element={
              <ProtectedRoute role="influencer">
                <InfluencerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/profile"
            element={
              <ProtectedRoute role="company">
                <CompanyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/influencer/profile"
            element={
              <ProtectedRoute role="influencer">
                <InfluencerProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/company/create-ad" element={<CreateAd />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/company/manage-ads" element={<ManageAds />} />
          <Route path="/company/discover-influencers" element={<DiscoverInfluencers />} />
          <Route path="/company/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;