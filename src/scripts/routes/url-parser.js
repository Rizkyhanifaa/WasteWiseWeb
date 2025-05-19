import { routes } from './routes';

function extractPathnameSegments(path) {
  const splitUrl = path.split('/');

  return {
    resource: splitUrl[1] || null,
    id: splitUrl[2] || null,
  };
}

function constructRouteFromSegments(pathSegments) {
  let pathname = '';

  if (pathSegments.resource) {
    pathname = pathname.concat(`/${pathSegments.resource}`);
  }

  if (pathSegments.id) {
    pathname = pathname.concat('/:id');
  }

  return pathname || '/';
}

export function getActivePathname() {
  return location.hash.replace('#', '') || '/';
}

export function getActiveRoute() {
  const pathname = getActivePathname();
  const urlSegments = pathname.split('/').filter(Boolean);

  for (const route in routes) {
    const routeSegments = route.split('/').filter(Boolean);

    if (routeSegments.length !== urlSegments.length) continue;

    let matched = true;
    for (let i = 0; i < routeSegments.length; i++) {
      if (routeSegments[i].startsWith(':')) continue;
      if (routeSegments[i] !== urlSegments[i]) {
        matched = false;
        break;
      }
    }

    if (matched) return route;
  }

  return '/not-found'; // fallback
}

export function parseActivePathname() {
  const pathname = getActivePathname();
  return extractPathnameSegments(pathname);
}

export function getRoute(pathname) {
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

export function parsePathname(pathname) {
  return extractPathnameSegments(pathname);
}
