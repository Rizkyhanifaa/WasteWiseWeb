export default class ClassifyPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model; // Bisa tetap null jika tidak pakai model
  }

  async classifyImage(file) {
    this.#view.showSubmitLoadingButton();

    try {
      if (!file) {
        throw new Error('Mohon unggah atau ambil gambar terlebih dahulu.');
      }

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('https://hapi-webapp123-gea7b4bbhbengbdv.indonesiacentral-01.azurewebsites.net/classify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || 'Gagal melakukan klasifikasi. Silakan coba lagi.';
        throw new Error(errorMessage);
      }

      const result = await response.json();

      if (!result || !result.label || typeof result.confidence !== 'number') {
        throw new Error('Format hasil klasifikasi tidak dikenali.');
      }

      this.#view.showResult(result);
    } catch (error) {
      console.error('classifyImage: error:', error);
      this.#view.showError(error.message);
    } finally {
      this.#view.showSubmitNormalButton();
    }

   
    
  }
}
