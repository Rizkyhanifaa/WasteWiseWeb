import {
  generateLoaderAbsoluteTemplate,
} from '../../templates';
import HomePresenter from './home-presenter';
import * as StoryAppAPI from '../../data/api';

export default class HomePage {
  #presenter = null;

  async render() {
    return `
     <!-- Hero Section -->
      <section id="hero">
        <div class="hero-content">
          <h1>
            <span class="green-light">Klasifikasikan Sampah <br></span> 
            <span class="green-dark">Dalam Satu Klik</span>
          </h1>
          <p>Kenali jenis sampahmu hanya dalam sekali klik. <br> Solusi cepat dan edukatif untuk pengelolaan sampah.</p>
          <a class="cta-button" href="#/classify">Coba Sekarang</a>
        </div>

        <div class="hero-image">
              <img src="./img/home/kumpulan_sampah.png" alt="Klasifikasi Sampah">
        </div>
      </section>

      <!-- Tentang Waste Wise Web -->
      <section id="about">
          <h2>
            <span class="green-light">Apa Itu</span> 
            <span class="green-dark">WasteWise Web?</span>
          </h2>
          <p>WasteWise Web adalah sebuah platform berbasis website yang menggunakan teknologi Machine Learning untuk mengklasifikasikan sampah secara otomatis melalui gambar atau input pengguna, serta memberikan edukasi tentang pengelolaan sampah organik dan anorganik.</p>
      </section>

      <!-- Langkah Klasifikasi -->
      <section id="steps">
        <h2>Mulai Klasifikasi dalam 3 Langkah</h2>
        <div class="steps-container">
          <div class="step">
            <img src="./img/home/unggah.png" alt="Unggah Gambar">
            <h3>1. Unggah Gambar</h3>
              <p>Pilih atau unggah gambar sampah yang ingin kamu identifikasi melalui sistem</p>
          </div>

          <div class="step">
            <img src="./img/home/loader.png" alt="Proses Klasifikasi">
            <h3>2. Proses Klasifikasi</h3>
            <p>
              Sistem akan memproses gambar dan mengenalinya berdasarkan kategori sampah organik atau anorganik
            </p>
          </div>
          
          <div class="step">
            <img src="./img/home/check.png" alt="Lihat Hasil">
            <h3>3. Lihat Hasilnya</h3>
            <p>Kategori sampah akan ditampilkan, lengkap dengan edukasi pengelolaan sampah</p>
          </div>
        </div>
      </section>

      <!-- Waste Type -->
      <section id="waste-type">
        <div class="type-image">
          <div class="category">
              <img src="./img/home/organik.png" alt="Sampah Organik">
              <p>Sampah Organik</p>
          </div>
          <div class="category">
              <img src="./img/home/anorganik.png" alt="Sampah Anorganik">
              <p>Sampah Anorganik</p>
          </div>
        </div>

        <div class="type-content">
          <h2>
            <span class="green-light">Kenali Jenis Sampah <br></span> 
            <span class="green-dark">Di Sekitarmu!</span>
          </h2>
          <p>Memilah sampah dengan benar dimulai dari memahami perbedaan sampah organik dan anorganik sebagai langkah awal menuju lingkungan yang lebih baik</p>
          <a class="cta-button" href="#/wastetype">Baca Selengkapnya</a>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: StoryAppAPI,
    });

  }

  
}
