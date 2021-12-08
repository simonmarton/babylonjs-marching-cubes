/**
 * This file is the entrypoint of browser builds.
 * The code executes when loaded in a browser.
 */
import { setup, startLoop } from './main';
import computMarchingCubes from './shaders/marching-cubes';

window.onload = () => {
  const { pathname } = window.location;

  switch (pathname) {
    case '/':
      setup();
      startLoop();
      break;
    case '/shader':
      computMarchingCubes();
      break;
    default:
      console.log('unknown path', pathname);
  }
};
