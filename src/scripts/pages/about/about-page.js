const AboutPage = {
  async render() {
    return `
      <section class="about-page">
        <h2 class="about-title">
          <span class="green-light">Tentang </span> 
          <span class="green-dark">Tim Kami</span>
        </h2>
        <p class="about-description">
          Kami mengucapkan terima kasih kepada seluruh anggota tim Capstone yang telah berkontribusi dengan semangat dan dedikasi tinggi dalam pembuatan website ini.
        </p>

        <div class="team-cards">
          <div class="team-card">
            <div class="team-photo"></div>
            <div class="team-info">
              <h4 class="team-name">Devit Imanuel Nuary S.</h4>
              <p class="team-role">Universitas Mikroskil
                <br> Machine Learning 
              </p>
            </div>
          </div>
          <div class="team-card">
            <div class="team-photo"></div>
            <div class="team-info">
              <h4 class="team-name">Rizky Hanifa Afania</h4>
              <p class="team-role">Telkom University Purwokerto
                <br>Front End Back End
              </p>
            </div>
          </div>
          <div class="team-card">
            <div class="team-photo"></div>
            <div class="team-info">
              <h4 class="team-name">Gelwin Alfito</h4>
              <p class="team-role">Universitas Kristen Petra 
                <br>Machine Learning
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // Tidak ada logika interaktif saat ini
  }
};

export default AboutPage;
