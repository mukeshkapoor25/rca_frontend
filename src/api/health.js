export const getAPIHealthStatus = async () => {
  const endpoint = window.location.origin.includes('localhost') ? 'http://56.228.43.181:8000/health' : 'http://56.228.43.181:8000/health';
  console.log('getAPIHealthStatus endpoint:: '+endpoint)
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      return 'healthy';
    }
    return 'unhealthy';
  } catch {
    return 'unhealthy';
  }
};
