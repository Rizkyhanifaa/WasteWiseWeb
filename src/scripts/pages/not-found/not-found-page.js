const NotFoundPage = {
  async render() {
    return `
      <div class="not-found">
        <h1 class="not-found__title">404</h1>
        <p class="not-found__description">Halaman Tidak Ditemukan</p>
        <button id="back-button" class="not-found__button">Kembali ke Beranda</button>
      </div>
    `;
  },

  async afterRender() {
    const backButton = document.querySelector('#back-button');
    backButton.addEventListener('click', () => {
      window.location.href = '/';
    });
  },
};

export default NotFoundPage;
