const WasteTypePage = {
  async render() {
    return `
      <section class="waste-type-page">
        <h2 class="waste-type-title">
            <span class="green-light">Jenis - Jenis</span> 
            <span class="green-dark">Sampah</span>
        </h2>
        <p class="waste-type-description">Memilah sampah dengan benar dimulai dari memahami perbedaan sampah organik dan anorganik sebagai langkah awal menuju lingkungan yang lebih baik</p>

        <div class="waste-type-section">
          <div class="waste-category">
            <h3>
                <span class="green-light">Sampah</span> 
                <span class="green-dark">Organik</span>
            </h3>
            <div class="waste-items">
                <div class="waste-card">
                    <img src="./img/jenis_sampah/sisa_makanan.png" alt="Sisa makanan">
                    <p>Sisa makanan</p>
                </div>
                <div class="waste-card">
                    <img src="./img/jenis_sampah/daun.png" alt="Daun kering">
                    <p>Daun kering</p>
                </div>
                <div class="waste-card">
                    <img src="./img/jenis_sampah/kulit_buah.png" alt="Kulit buah">
                    <p>Kulit buah</p>
                </div>
                <div class="waste-card">
                    <img src="./img/jenis_sampah/ampas_kopi.png" alt="Ampas kopi">
                    <p>Ampas kopi</p>
                </div>
            </div>
            <p class="waste-processing"><b>Pengolahan: </b> Dapat dijadikan kompos atau diolah dalam komposter rumah tangga</p>
          </div>

          <div class="waste-category">
            <h3>
                <span class="green-light">Sampah</span> 
                <span class="green-dark">Anorganik</span>
            </h3>
            <div class="waste-items">
                <div class="waste-card">
                    <img src="./img/jenis_sampah/plastik.png" alt="Plastik Kemasan">
                    <p>Plastik Kemasan</p>
                </div>
                <div class="waste-card">
                    <img src="./img/jenis_sampah/kaleng.png" alt="Kaleng Minuman">
                    <p>Kaleng Minuman</p>
                </div>
                <div class="waste-card">
                    <img src="./img/jenis_sampah/botol.png" alt="Botol Kaca">
                    <p>Botol Kaca</p>
                </div>
                <div class="waste-card">
                    <img src="./img/jenis_sampah/kardus.png" alt="Kardus Bekas">
                    <p>Kardus Bekas</p>
                </div>
            </div>
            <p class="waste-processing"> <b> Pengolahan: </b> Dapat dikumpulkan untuk proses daur ulang atau disalurkan ke bank sampah.</p>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // Tidak ada fungsi interaktif di halaman ini
  }
};

export default WasteTypePage;
