export const askBot = async (question) => {
  const endpoint = 'https://mukeshkapoor25-logbert-sqlagent.hf.space/ask';
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question })
    });
    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, message: errorText || 'API request failed' };
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, message: (error instanceof Error ? error.message : 'Network error') };
  }
};
