import axios from 'axios';

// Create axios instances for different services
const baseURL = window.location.origin.includes('localhost') ? 'http://56.228.43.181:8000' : 'http://56.228.43.181:8000';
const apiClient = axios.create({
  baseURL:baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const fileUploadClient = axios.create({
  baseURL:baseURL,
  timeout: 120000, // Longer timeout for file uploads
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// ...existing code...

// Request interceptors
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptors
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const apiService = {
  // Agents status endpoint for App.js
  getAgentsStatus: async () => {
    const response = await apiClient.get('/agents/status');
    return response.data;
  },
  // Health check
  healthCheck: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },

  // Root endpoint info
  getRootInfo: async () => {
    const response = await apiClient.get('/');
    return response.data;
  },

  
 
  // Analysis endpoints (agent-based)
  analyzeLogFile: async (file, options = {}) => {
    const formData = new FormData();
    formData.append('files', file);
    
    // Add options to form data if needed
    Object.keys(options).forEach(key => {
      formData.append(key, options[key]);
    });

    const response = await fileUploadClient.post('/batch-analyze', formData);
    return response.data;
  },

  analyzeLogText: async (logText, options = {}) => {
    const response = await apiClient.post('/analyze', {
      log_text: logText,
      ...options
    });
    return response.data;
  },

  analyzeSample: async (sampleType = 'hadoop_error_logs') => {
    const response = await apiClient.post('/analyze/sample', {
      sample_type: sampleType
    });
    return response.data;
  },

  // System monitoring
  getMetricsSummary: async () => {
    const response = await apiClient.get('/metrics/summary');
    return response.data;
  },

  getRecentActivity: async () => {
    const response = await apiClient.get('/activity/recent');
    return response.data;
  },

  // ...existing code...

  // Agent-specific operations (using generic agent endpoints)
  coordinatorAgent: {
    getStatus: () => apiClient.get('/agents/status').then(r => r.data),
    executeWorkflow: (data) => apiClient.post('/analyze', data).then(r => r.data),
  },

  anomalyAgent: {
    getStatus: () => apiClient.get('/agents/status').then(r => r.data),
    detectAnomalies: (data) => apiClient.post('/analyze', data).then(r => r.data),
  },

  rootCauseAgent: {
    getStatus: () => apiClient.get('/agents/status').then(r => r.data),
    analyzeRootCause: (data) => apiClient.post('/analyze', data).then(r => r.data),
  },

  logParserAgent: {
    getStatus: () => apiClient.get('/agents/status').then(r => r.data),
    parseLogs: (data) => apiClient.post('/analyze', data).then(r => r.data),
  },

  explanationAgent: {
    getStatus: () => apiClient.get('/agents/status').then(r => r.data),
    generateExplanation: (data) => apiClient.post('/analyze', data).then(r => r.data),
  },

  // ...existing code...

  // System health monitoring
  getSystemHealth: () => apiClient.get('/health').then(r => r.data),
  
  // File upload for log analysis (uses batch-analyze endpoint)
  uploadLogFile: (file) => {
    const formData = new FormData();
    formData.append('files', file);
    return fileUploadClient.post('/batch-analyze', formData).then(r => r.data);
  },

  // Log analysis
  analyzeLogContent: (content) => apiClient.post('/analyze', { log_text: content }).then(r => r.data)
};

export default apiService;
