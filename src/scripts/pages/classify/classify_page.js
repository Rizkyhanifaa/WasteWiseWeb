import ClassifyPresenter from './classify-presenter';

export default class ClassifyPage {
  #presenter = null;
  #form = null;

async render() {
    return `
      <section class="classify-page">
        <h2>
          <span class="green-light">Klasifikasikan Sampahmu </span> 
          <span class="green-dark">Sekarang!</span>
        </h2>
        <p class="subtext">
          Unggah atau ambil gambar sampahmu, dan biarkan sistem cerdas kami mengidentifikasinya secara otomatis
        </p>

        <div id="classification-card-section">
          <form id="classify-form">
            <div class="upload-area">
                <img src="./img/classify/upload.png" alt="Upload Icon" />
              <input type="file" id="image-input" />
            </div>

            <div id="preview-container" style="display: none;">
              <img id="preview-image" alt="Preview" />
            </div>

            <div class="upload-buttons">
              <button class="btn-unggah" type="submit">Unggah Gambar</button>
              <button class="btn-camera" type="button">Buka Kamera</button>
            </div>
          </form>
        </div>
      </section>
    `;
  }


  async afterRender() {
    this.#presenter = new ClassifyPresenter({ view: this });
    this.#setupForm();
  }

  #setupForm() {
    this.#form = document.getElementById('classify-form');

    const imageInput = document.getElementById('image-input');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');

    imageInput.addEventListener('change', () => {
      const file = imageInput.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        previewImage.src = url;
        previewContainer.style.display = 'block';
      }
    });

    this.#form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const file = imageInput.files[0];
      if (!file) return alert('Mohon unggah gambar terlebih dahulu.');

      this.#presenter.classifyImage(file);
    });
  }

  showResult(result) {
    document.getElementById('classification-result').innerHTML = `
      <h2>Hasil Klasifikasi</h2>
      <p>${result}</p>
    `;
  }

  showError(error) {
    document.getElementById('classification-result').innerHTML = `
      <p class="error-message">${error}</p>
    `;
  }
}
