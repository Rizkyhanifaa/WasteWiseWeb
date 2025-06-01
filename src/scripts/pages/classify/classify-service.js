const ClassifyService = {
  async classifyImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('https://hapi-webapp123-gea7b4bbhbengbdv.indonesiacentral-01.azurewebsites.net/classify', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || 'Gagal melakukan klasifikasi.';
      throw new Error(errorMessage);
    }

    const result = await response.json();

    return { result };
  }
};

export default ClassifyService;
