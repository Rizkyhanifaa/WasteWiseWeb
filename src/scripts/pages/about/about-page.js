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
              <h4 class="team-name green-light">Devit Imanuel Nuary S.</h4>
              <p class="team-role">Machine Learning Cohort</p>
            </div>
          </div>
          <div class="team-card">
            <div class="team-photo"></div>
            <div class="team-info">
              <h4 class="team-name green-light">Rizky Hanifa Afania</h4>
              <p class="team-role">Front End Back End Cohort</p>
            </div>
          </div>
          <div class="team-card">
            <div class="team-photo"></div>
            <div class="team-info">
              <h4 class="team-name green-light">Gelwin Alfito</h4>
              <p class="team-role">Machine Learning Cohort</p>
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
