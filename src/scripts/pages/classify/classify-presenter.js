import ClassifyService from './classify-service.js';


export default class ClassifyPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async handleImageInputChange(file) {
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const imageElement = this.#view.showPreview(imageUrl);
  }

  async submitImage(imageElement) {
    try {
      this.#view.showLoadingPopup(); // Tampilkan popup loading
      this.#view.showSubmitLoadingButton();

      // Panggil service dengan elemen gambar
      const response = await this.#model.classifyImage(imageElement);
      this.#view.showResult(response.result);
    } catch (error) {
      this.#view.showError(error.message);
    } finally {
      this.#view.hideLoadingPopup() // Sembunyikan popup loading
      this.#view.showSubmitNormalButton();
    }
  }

  async handleCameraCapture(videoElement, canvasElement) {
    const context = canvasElement.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    canvasElement.toBlob(async (blob) => {
      const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(file);
      this.#view.showPreview(imageUrl);
      await this.submitImage(file);
    }, 'image/jpeg');
  }
}
