export const uploadLogFile = async (file) => {
  const endpoint = window.location.origin.includes('localhost') ? 'https://56.228.43.181:7860/upload/' : 'http://56.228.43.181:7860/upload';
  //const endpoint = 'https://56.228.43.181:7860/upload/';
  console.log('Upload endpoint:: '+endpoint)
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, message: errorText || 'Upload failed' };
    }
    const data = await response.json();
    return { success: true, message: data?.message || 'Upload successful' };
  } catch (error) {
    return { success: false, message: (error instanceof Error ? error.message : 'Network error') };
  }
};
