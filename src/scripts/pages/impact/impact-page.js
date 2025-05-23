const ImpactPage = {
  async render() {
    return `
      <section class="impact-page">
        <h2 class="impact-title">
          <span class="green-light">Dampak</span> 
          <span class="green-dark">Sampah</span>
        </h2>
        <p class="impact-description">
          Sampah yang tidak dikelola dengan benar dapat menimbulkan dampak serius terhadap lingkungan dan kesehatan manusia.
          Dari pencemaran tanah hingga polusi udara, sampah menjadi ancaman nyata jika terus diabaikan.
          Melalui data dan fakta berikut, mari kita pahami betapa pentingnya memilah dan mengurangi sampah mulai dari sekarang.
        </p>

        <div class="impact-cards">
          <div class="impact-card">
              <div class="impact-card-header">
                <h4 class="impact-card-title green-light">Pencemaran Tanah</h4>
                <img src="img/impact/pencemaran_tanah.png" alt="Pencemaran Tanah" class="impact-card-image">
              </div>
            <p>Sampah yang dibuang sembarangan, terutama plastik dapat meresap ke dalam tanah, merusak struktur dan kualitasnya, serta mengganggu pertumbuhan tanaman dan mikroorganisme.</p>
          </div>
          <div class="impact-card">
            <div class="impact-card-header">
              <h4 class="impact-card-title green-light">Pencemaran Air</h4>
              <img src="img/impact/pencemaran_air.png" alt="Pencemaran Air" class="impact-card-image">
            </div>
            <p>Sampah yang terbawa ke sungai dan laut menyebabkan air tercemar, membahayakan biota air, dan berdampak pada manusia yang mengonsumsi air tersebut. Mikroplastik kini ditemukan dalam tubuh ikan, bahkan dalam air kemasan.</p>
          </div>
          <div class="impact-card">
            <div class="impact-card-header">
              <h4 class="impact-card-title green-light">Pencemaran Udara</h4>
              <img src="img/impact/pencemaran_udara.png" alt="Pencemaran Udara" class="impact-card-image">
            </div>
            <p>Pembakaran sampah terbuka, terutama plastik, menghasilkan gas berbahaya seperti dioksin dan karbon monoksida yang mencemari udara dan menyebabkan gangguan pernapasan, khususnya bagi anak-anak dan lansia.</p>
          </div>
          <div class="impact-card">
            <div class="impact-card-header">
              <h4 class="impact-card-title green-light">Kerusakan Ekosistem </h4>
              <img src="img/impact/kerusakan_ekosistem.png" alt="Kerusakan Ekosistem " class="impact-card-image">
            </div>
            <p>Sampah di habitat alami dapat menyebabkan hewan terluka, terjerat, atau bahkan mati karena menelan benda asing seperti plastik. Ekosistem laut, hutan, dan perkotaan kini semakin terganggu akibat tumpukan sampah yang tidak terkendali.</p>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // Tidak ada interaksi untuk saat ini
  }
};

export default ImpactPage;
