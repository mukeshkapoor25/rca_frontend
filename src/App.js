import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Components
import Navigation from './components/Navigation';
import UploadLogFile from './components/UploadLogFile';
import RCALatestCard from './components/RCALatestCard';
import Chatbot from './components/Chatbot';
import LandingPage from './components/LandingPage';

// Services
import { apiService } from './services/apiService';
import { getAPIHealthStatus } from './api/health';

function App() {
  const [apiHealth, setApiHealth] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [agentsStatus, setAgentsStatus] = useState({});

  useEffect(() => {
    // Initial data fetch
    checkApiHealth();
    fetchAgentsStatus();

    // Set up periodic checks
    const healthInterval = setInterval(checkApiHealth, 30000);
    const agentsInterval = setInterval(fetchAgentsStatus, 10000);

    return () => {
      clearInterval(healthInterval);
      clearInterval(agentsInterval);
    };
  }, []);

  const checkApiHealth = async () => {
    try {
      const health = await getAPIHealthStatus();
      setApiHealth(health);
      setIsConnected(health === 'healthy');
    } catch (error) {
      console.error('API health check failed:', error);
      setIsConnected(false);
      setApiHealth(null);
    }
  };

  const fetchAgentsStatus = async () => {
    try {
      const status = await apiService.getAgentsStatus();
      setAgentsStatus(status);
    } catch (error) {
      console.error('Failed to fetch agents status:', error);
    }
  };

  return (
    <div className="App">
      <Navigation isConnected={isConnected} agentsStatus={agentsStatus} />
      <Container fluid className="py-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadLogFile />} />
          <Route path="/rca-results" element={<RCALatestCard />} />
        </Routes>
      </Container>
      <Chatbot />
    </div>
  );
}

export default App;
