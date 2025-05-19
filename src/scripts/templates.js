import { showFormattedDate } from './utils';

export function generateLoaderTemplate() {
  return `
    <div class="loader"></div>
  `;
}

export function generateLoaderAbsoluteTemplate() {
  return `
    <div class="loader loader-absolute"></div>
  `;
}

// Navbar
export function generateMainNavigationListTemplate() {
  return `
    <li><a id="home-button" class="home-button" href="#/">Home</a></li>
    <li><a id="classify-button" class="classify-button" href="#/classify">Classify</a></li>
    <li><a id="wastetype-button" class="wastetype-button" href="#/wastetype">Waste Type</a></li>
    <li><a id="impact-button" class="impact-button" href="#/impact">Impact</a></li>
    <li><a id="about-button" class="about-button" href="#/about">About</a></li>
  `;
}

