/**
 * This file is the entrypoint of browser builds.
 * The code executes when loaded in a browser.
 */
import { setup, startLoop } from './main';
import drawMarchingCubes from './draw-marching-cubes';

window.onload = () => {
  const { pathname } = window.location;

  switch (pathname) {
    case '/':
      setup();
      startLoop();
      break;
    case '/shader':
      drawMarchingCubes();
      break;
    default:
      console.log('unknown path', pathname);
  }
};
