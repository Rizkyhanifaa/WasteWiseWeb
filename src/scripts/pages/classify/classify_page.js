import ClassifyPresenter from './classify-presenter';
import Camera from '../../utils/camera';

export default class ClassifyPage {
  #presenter = null;
  #form = null;
  #camera = null;
  #isCameraOpen = false;

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

              <!-- Kamera -->
              <div id="camera-container" style="display: none;">
                <video id="camera-video" autoplay playsinline style="width: 100%; border-radius: 8px;"></video>
                <canvas id="camera-canvas" style="display: none;"></canvas>
                <select id="camera-select"></select>
                <button id="camera-take-button" type="button" class="btn">Ambil Gambar</button>
              </div>

              <!-- Preview hasil gambar dari kamera -->
              <img id="captured-image";" />
            </div>

            <div id="preview-container" style="display: none;">
              <img id="preview-image" alt="Preview" />
            </div>

            <div class="upload-buttons">
              <button class="btn-unggah" type="submit">Unggah Gambar</button>
              <button id="open-camera-button" class="btn-camera" type="button">Buka Kamera</button>
            </div>
          </form>
        </div>
        <div id="classification-result"></div>
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
    const capturedImage = document.getElementById('captured-image');

    imageInput.addEventListener('change', () => {
      const file = imageInput.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        previewImage.src = url;
        previewContainer.style.display = 'block';
        capturedImage.style.display = 'none'; // Hide captured image if uploading new file
      }
    });

    this.#form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const file = imageInput.files[0];
      if (!file) return alert('Mohon unggah gambar terlebih dahulu.');

      this.#presenter.classifyImage(file);
    });

    document.getElementById('open-camera-button').addEventListener('click', async () => {
      const cameraContainer = document.getElementById('camera-container');
      this.#isCameraOpen = !this.#isCameraOpen;

      if (this.#isCameraOpen) {
        cameraContainer.style.display = 'block';
        document.getElementById('open-camera-button').textContent = 'Tutup Kamera';
        this.#setupCamera();
        await this.#camera.launch();
      } else {
        cameraContainer.style.display = 'none';
        document.getElementById('open-camera-button').textContent = 'Buka Kamera';
        if (this.#camera) this.#camera.stop();
      }
    });
  }

  #setupCamera() {
    if (!this.#camera) {
      this.#camera = new Camera({
        video: document.getElementById('camera-video'),
        cameraSelect: document.getElementById('camera-select'),
        canvas: document.getElementById('camera-canvas'),
      });
    }

    this.#camera.addCheeseButtonListener('#camera-take-button', async () => {
      const image = await this.#camera.takePicture();
      const imageInput = document.getElementById('image-input');
      const capturedImage = document.getElementById('captured-image');

      const blobUrl = URL.createObjectURL(image);
      capturedImage.src = blobUrl;
      capturedImage.style.display = 'block';

      // Sembunyikan kamera setelah ambil gambar
      document.getElementById('camera-video').style.display = 'none';
      imageInput.style.display = 'none';

      // Konversi blob ke File lalu masukkan ke input[type=file]
      const file = new File([image], `camera-capture-${Date.now()}.png`, { type: 'image/png' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      imageInput.files = dataTransfer.files;
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
