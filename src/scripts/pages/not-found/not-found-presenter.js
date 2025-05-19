
const NotFoundPresenter = {
  init(page) {
    const backButton = page.querySelector('#back-button');
    backButton.addEventListener('click', () => {
      window.location.href = '/';
    });
  },
};

export default NotFoundPresenter;
