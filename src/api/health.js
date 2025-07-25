export const getAPIHealthStatus = async () => {
  const endpoint = 'http://56.228.43.181:8000/health';
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
