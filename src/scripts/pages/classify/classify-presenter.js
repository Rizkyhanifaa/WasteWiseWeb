export default class ClassifyPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model; // Opsional jika pakai layer model/API terpisah
  }

  async classifyImage(file) {
    try {
      // Contoh: kirim ke endpoint API untuk klasifikasi
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('https://your-api-endpoint.com/classify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Gagal melakukan klasifikasi. Silakan coba lagi.');
      }

      const result = await response.json();

      // Misalnya responsenya: { label: "Organik", confidence: 0.92 }
      this.#view.showResult(
        `Label: <strong>${result.label}</strong><br>Kepercayaan: ${(result.confidence * 100).toFixed(2)}%`
      );
    } catch (error) {
      this.#view.showError(error.message);
    }
  }
}
