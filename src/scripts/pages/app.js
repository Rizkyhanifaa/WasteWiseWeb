import { getActiveRoute } from '../routes/url-parser';
import {
  generateMainNavigationListTemplate,
} from '../templates';
import { 
  isServiceWorkerAvailable,
  setupSkipToContent, 
  transitionHelper,
 } from '../utils';
import { routes } from '../routes/routes';
import NotFoundPage from '../pages/not-found/not-found-page';

export default class App {
  #content;
  #drawerButton;
  #drawerNavigation;
  #skipLinkButton;

  constructor({ content, drawerNavigation, drawerButton, skipLinkButton }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#drawerNavigation = drawerNavigation;
    this.#skipLinkButton = skipLinkButton;

    this.#init();
  }

  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#drawerNavigation.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      const isTargetInsideDrawer = this.#drawerNavigation.contains(event.target);
      const isTargetInsideButton = this.#drawerButton.contains(event.target);

      if (!(isTargetInsideDrawer || isTargetInsideButton)) {
        this.#drawerNavigation.classList.remove('open');
      }

      this.#drawerNavigation.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#drawerNavigation.classList.remove('open');
        }
      });
    });
  }

#setupNavigationList() {
  const navListMain = this.#drawerNavigation.children.namedItem('navlist-main');
  const navList = this.#drawerNavigation.children.namedItem('navlist');

  // Langsung render template tanpa cek login
  navListMain.innerHTML = generateMainNavigationListTemplate();
}

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];
  
  let page;

  if (!route || typeof route !== 'function') {
    console.warn(`Route "${url}" tidak valid, mengarahkan ke halaman Not Found.`);
    page = NotFoundPage;
  } else {
    page = route();
  }

  const transition = transitionHelper({
    updateDOM: async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();

      const navLinks = document.querySelectorAll('#navlist-main a');
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === window.location.hash) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    },
  });
  
    transition.ready?.catch(console.error);
  
    transition.updateCallbackDone.then(() => {
      this.#setupNavigationList();  // <- Panggil kembali setelah render
    });
  } 
}
