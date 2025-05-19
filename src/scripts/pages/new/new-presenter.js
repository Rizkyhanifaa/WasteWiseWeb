export default class NewPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showNewFormMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error('showNewFormMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async postNewStory({ name, description, evidenceImages, latitude, longitude }) {
  this.#view.showSubmitLoadingButton();
  try {
    if (!description || !Array.isArray(evidenceImages) || evidenceImages.length === 0) {
      throw new Error('Deskripsi dan minimal satu gambar diperlukan.');
    }

    const formData = new FormData();
    formData.append('description', description);
    evidenceImages.forEach((image) => {
      formData.append('photo', image);
    });

    if (latitude && longitude) {
      formData.append('lat', latitude);
      formData.append('lon', longitude);
    }

    const response = await this.#model.storeNewStory(formData);

    if (!response || typeof response !== 'object' || !('ok' in response)) {
      throw new Error('Respons server tidak sesuai format.');
    }

    if (!response.ok) {
      console.error('Gagal kirim:', response);
      this.#view.storeFailed(response.message || 'Gagal menyimpan laporan.');
      return;
    }

    this.#view.storeSuccessfully(response.message);
  
  } catch (error) {
    console.error('postNewStory: error:', error);
    this.#view.storeFailed(error.message);
  } finally {
    this.#view.hideSubmitLoadingButton();
  }
}

}
