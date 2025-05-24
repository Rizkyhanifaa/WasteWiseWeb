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

            <!-- Upload Area -->
            <div class="upload-area">
              <div id="upload-content">
                <img src="./img/classify/upload.png" alt="Upload Icon" id="upload-icon" />
                <input type="file" id="image-input" accept="image/*" style="display: none;"/>
              </div> 

              <!-- Kamera -->
              <div id="camera-container" style="display: none;">
                <video id="camera-video" autoplay playsinline></video>
                <canvas id="camera-canvas" style="display: none;"></canvas>
              </div>

              <!-- Preview hasil gambar dari kamera -->
              <img id="captured-image" />
            </div>

            <!-- Kontrol Kamera -->
            <div id="camera-controls" style="display: none; margin-top: 1rem; text-align: center;">
              <select id="camera-select"></select>
              <button id="camera-take-button" type="button" class="btn">Ambil Gambar</button>
            </div>

            <!-- Tombol Unggah & Kamera -->
            <div class="upload-buttons">
              <button id="upload-image-button" class="btn-unggah" type="button">Unggah Gambar</button>
              <button id="open-camera-button" class="btn-camera" type="button">Buka Kamera</button>
            </div>

            <!-- Tombol Klasifikasi & Ganti Gambar -->
            <div id="action-buttons" >
              <button id="classify-button" class="btn-unggah" type="submit">Klasifikasi</button>
              <button id="reset-button" class="btn-camera" type="button">Ganti Gambar</button>
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

    // Sembunyikan action button di awal
    document.getElementById('action-buttons').style.display = 'none';
  }

  #setupForm() {
    this.#form = document.getElementById('classify-form');

    const uploadButton = document.getElementById('upload-image-button');
    const openCameraButton = document.getElementById('open-camera-button');
    const imageInput = document.getElementById('image-input');
    const capturedImage = document.getElementById('captured-image');
    const uploadIcon = document.getElementById('upload-icon');
    const actionButtons = document.getElementById('action-buttons');
    const classifyButton = document.getElementById('classify-button');
    const resetButton = document.getElementById('reset-button');

    uploadButton.addEventListener('click', () => {
      imageInput.click();
    });

    imageInput.addEventListener('change', () => {
      const file = imageInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          capturedImage.src = e.target.result;
          capturedImage.style.display = 'block';
          uploadIcon.style.display = 'none';
          uploadButton.style.display = 'none';
          openCameraButton.style.display = 'none';
          actionButtons.style.display = 'flex';
        };
        reader.readAsDataURL(file);
      }
    });

    this.#form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const file = imageInput.files[0];
      if (!file) return alert('Mohon unggah gambar terlebih dahulu.');

      this.#presenter.classifyImage(file);
    });

    openCameraButton.addEventListener('click', async () => {
      const cameraContainer = document.getElementById('camera-container');
      const cameraControls = document.getElementById('camera-controls');

      this.#isCameraOpen = !this.#isCameraOpen;

      if (this.#isCameraOpen) {
        cameraContainer.style.display = 'block';
        cameraControls.style.display = 'block';
        uploadButton.style.display = 'none';
        openCameraButton.style.display = 'none';
        uploadIcon.style.display = 'none';

        this.#setupCamera();
        await this.#camera.launch();
      } else {
        cameraContainer.style.display = 'none';
        cameraControls.style.display = 'none';
        uploadButton.style.display = 'inline-block';
        openCameraButton.style.display = 'inline-block';
        openCameraButton.textContent = 'Buka Kamera';

        if (this.#camera) this.#camera.stop();
      }
    });

    resetButton.addEventListener('click', () => this.#resetForm());
  }

  #resetForm() {
    document.getElementById('captured-image').style.display = 'none';
    document.getElementById('upload-icon').style.display = 'block';
    document.getElementById('upload-image-button').style.display = 'inline-block';
    document.getElementById('open-camera-button').style.display = 'inline-block';
    document.getElementById('action-buttons').style.display = 'none';
    document.getElementById('image-input').value = '';

    if (this.#camera) {
      this.#camera.stop();
      document.getElementById('camera-container').style.display = 'none';
      document.getElementById('camera-video').style.display = 'block';
      this.#isCameraOpen = false;
      document.getElementById('open-camera-button').textContent = 'Buka Kamera';
    }
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
      const uploadIcon = document.getElementById('upload-icon');

      const blobUrl = URL.createObjectURL(image);
      capturedImage.src = blobUrl;
      capturedImage.style.display = 'block';
      uploadIcon.style.display = 'none';

      document.getElementById('camera-video').style.display = 'none';
      imageInput.style.display = 'none';

      const file = new File([image], `camera-capture-${Date.now()}.png`, { type: 'image/png' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      imageInput.files = dataTransfer.files;

      // Tampilkan tombol aksi
      document.getElementById('action-buttons').style.display = 'flex';

      // Sembunyikan kamera dan kontrolnya setelah ambil gambar
      document.getElementById('camera-controls').style.display = 'none';
      document.getElementById('camera-container').style.display = 'none';

      // Stop kamera agar tidak terus menyala
      if (this.#camera) {
        this.#camera.stop();
        this.#isCameraOpen = false;
      }
    });
  }

  // Menampilkan tombol klasifikasi dengan loading spinner
  showSubmitLoadingButton() {
    const classifyButton = document.getElementById('classify-button');
    classifyButton.disabled = true;
    classifyButton.innerHTML = `
      <span class="spinner"></span>
      Mengklasifikasi...
    `;
  }

  // Menyembunyikan tombol klasifikasi loading spinner
  showSubmitNormalButton() {
    const classifyButton = document.getElementById('classify-button');
    classifyButton.disabled = false;
    classifyButton.innerHTML = 'Klasifikasi';
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
