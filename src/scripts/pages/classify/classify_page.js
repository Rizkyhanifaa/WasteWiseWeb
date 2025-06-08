import ClassifyPresenter from './classify-presenter';
import ClassifyService from './classify-service'; 
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
            <div id="action-buttons">
              <button id="classify-button" class="btn-unggah" type="submit">Klasifikasi</button>
              <button id="reset-button" class="btn-camera" type="button">Ganti Gambar</button>
            </div>
          </form>
        </div>

        <div id="classification-result"></div>

        <div id="loading-popup" class="loading-popup hidden">
          <div class="loading-box">
            <span class="spinner"></span>
            <p>Mengklasifikasi gambar</p>
          </div>
        </div>
      </section>
    `;
  }

    _showModelLoading(isLoading) {
      const uploadButton = document.getElementById('upload-image-button');
      const cameraButton = document.getElementById('open-camera-button');
      const classifyButton = document.getElementById('classify-button');

      if (isLoading) {
          uploadButton.disabled = true;
          cameraButton.disabled = true;
          classifyButton.disabled = true;
          uploadButton.textContent = 'Memuat model...';
      } else {
          uploadButton.disabled = false;
          cameraButton.disabled = false;
          classifyButton.disabled = false;
          uploadButton.textContent = 'Unggah Gambar';
      }
  }

  async afterRender() {
    this.#presenter = new ClassifyPresenter({
      view: this,
      model: ClassifyService,
  });

  this.#setupForm();

  document.getElementById('action-buttons').style.display = 'none';

  // Memulai memuat model dan memperbarui UI
  this._showModelLoading(true);
  try {
    await ClassifyService._loadModel(); // Memanggil fungsi load model
  } catch (error) {
    this.showError(error.message);
  } finally {
    this._showModelLoading(false); // Selesai loading
  }
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
        reader.onload = (e) => {
          capturedImage.src = e.target.result;
          capturedImage.style.display = 'block';
          uploadIcon.style.display = 'none';
          document.querySelector(".upload-buttons").style.display = "none";
          actionButtons.style.display = 'flex';
        };
        reader.readAsDataURL(file);
      }
    });

    this.#form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const imageElement = document.getElementById("captured-image");

      // Pastikan gambar sudah ditampilkan sebelum klasifikasi
      if (!imageElement.src || imageElement.style.display === "none") {
        return alert ("Mohon unggah atau ambil gambar terlebih dahulu.")
      }

      this.showLoadingPopup();
      this.showSubmitLoadingButton();

      try {
        await this.#presenter.submitImage(imageElement);
      } catch (error) {
        console.error(error); 
        this.showError('Terjadi kesalahan saat mengklasifikasi gambar.');
      } finally {
        this.hideLoadingPopup();
        this.showSubmitNormalButton();
      }
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

      document.getElementById('action-buttons').style.display = 'flex';
      document.getElementById('camera-controls').style.display = 'none';
      document.getElementById('camera-container').style.display = 'none';

      if (this.#camera) {
        this.#camera.stop();
        this.#isCameraOpen = false;
      }
    });
  }

  #resetForm() {
    document.getElementById('captured-image').style.display = 'none';
    document.getElementById('upload-icon').style.display = 'block';
    document.getElementById('upload-image-button').style.display = 'inline-block';
    document.getElementById('open-camera-button').style.display = 'inline-block';
    document.querySelector(".upload-buttons").style.display = "flex";
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

  showSubmitLoadingButton() {
    const classifyButton = document.getElementById('classify-button');
    classifyButton.disabled = true;
    classifyButton.innerHTML = `<span class="spinner-inline"></span> Mengklasifikasi...`;
  }

  showSubmitNormalButton() {
    const classifyButton = document.getElementById('classify-button');
    classifyButton.disabled = false;
    classifyButton.innerHTML = 'Klasifikasi';
  }

  showLoadingPopup() {
    document.getElementById('loading-popup').classList.remove('hidden');
  }

  hideLoadingPopup() {
    document.getElementById('loading-popup').classList.add('hidden');
  }

   showResult(result) {
    // Daftar rekomendasi penanganan sampah yang lebih detail
    const wasteHandlingRecommendations = {
      // Organik
      "biological": `
        Sampah jenis ini sangat cocok untuk dijadikan kompos alami yang bermanfaat bagi tanaman. 
        Kamu bisa mengolahnya menggunakan metode komposter sederhana di rumah atau mengumpulkannya 
        untuk dibawa ke bank sampah atau fasilitas pengelolaan organik.`,
      
      // Anorganik
      "cardboard": "Kardus dapat didaur ulang menjadi kertas baru. Pastikan kardus dalam keadaan kering dan bersih sebelum diserahkan ke bank sampah atau pemulung.",
      "paper": "Kertas sangat mudah didaur ulang. Kumpulkan secara terpisah dari sampah basah dan serahkan ke fasilitas daur ulang.",
      "plastic": "Pisahkan plastik berdasarkan jenisnya jika memungkinkan (botol, kemasan, dll). Bersihkan dari sisa makanan/minuman sebelum didaur ulang untuk mengurangi kontaminasi.",
      "metal": "Kaleng minuman atau sisa logam lainnya memiliki nilai tinggi untuk didaur ulang. Kumpulkan dan jual ke bank sampah atau pengepul barang bekas.",
      "brown-glass": "Botol kaca berwarna dapat didaur ulang menjadi botol baru atau material bangunan. Kumpulkan secara terpisah dari kaca bening.",
      "green-glass": "Sama seperti kaca coklat, kaca hijau juga dapat didaur ulang. Pisahkan dari jenis kaca lainnya untuk proses daur ulang yang lebih efisien.",
      "white-glass": "Kaca bening dapat didaur ulang berkali-kali tanpa kehilangan kualitas. Ini adalah salah satu material daur ulang yang paling efisien.",
      "battery": "Sangat Berbahaya! Baterai bekas mengandung zat kimia beracun. Kumpulkan dan buang di tempat khusus penampungan limbah B3 (Bahan Berbahaya dan Beracun) yang biasanya tersedia di supermarket atau kantor dinas lingkungan hidup.",
      "clothes": "Pakaian bekas yang masih layak pakai dapat disumbangkan. Jika sudah rusak, bisa dijadikan kain lap atau diserahkan ke program daur ulang tekstil.",
      "shoes": "Sepatu yang masih layak bisa didonasikan. Jika rusak, periksa apakah ada program daur ulang sepatu di daerahmu, karena beberapa bagiannya bisa didaur ulang.",
      "trash": "Ini adalah kategori sampah residu yang sulit atau tidak bisa didaur ulang. Pastikan sampah jenis ini dibuang ke tempat sampah agar berakhir di TPA (Tempat Pemrosesan Akhir) dengan benar.",
      "default": "Rekomendasi tidak tersedia. Pastikan untuk membuang sampah pada tempatnya."
    };

    const confidenceText = (result.confidence * 100).toFixed(2) + '%';
    
    // Tentukan teks untuk kolom kategori
    let categoryText = result.label;
    if (result.label === 'Anorganik' && result.specific) {
      // Mengubah format nama kelas (misal: "brown-glass" menjadi "Brown Glass")
      const specificText = result.specific.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      categoryText = `Anorganik (Jenis: ${specificText})`;
    }

    // Ambil rekomendasi berdasarkan kelas spesifik
    const penjelasan = wasteHandlingRecommendations[result.specific] || wasteHandlingRecommendations.default;

    document.getElementById('classification-result').innerHTML = `
      <div id="result-card-section">
        <h3>Hasil Klasifikasi</h3>
        <table id="tabel-klasifikasi">
          <thead>
            <tr>
              <th>Kategori</th>
              <th>Kepercayaan</th>
              <th>Rekomendasi Pengolahan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${categoryText}</td>
              <td>${confidenceText}</td>
              <td>${penjelasan}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  showError(error) {
    document.getElementById('classification-result').innerHTML = `
      <p class="error-message">${error}</p>
    `;
  }
}
