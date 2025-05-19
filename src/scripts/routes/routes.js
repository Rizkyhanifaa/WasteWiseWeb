import HomePage from '../pages/home/home-page';
import NotFoundPage from '../pages/not-found/not-found-page'; 
import WasteTypePage from '../pages/waste-type/waste-type-page'; 
import ImpactPage from '../pages/impact/impact-page'; 
import AboutPage from '../pages/about/about-page';
import ClassifyPage from '../pages/classify/classify_page';


export const routes = {
  '/': () => (new HomePage()),
  '/not-found': () => NotFoundPage,
  '/wastetype': () => WasteTypePage,
  '/impact': () => ImpactPage,
  '/about': () => AboutPage,
  '/classify': () => new ClassifyPage(),
};
