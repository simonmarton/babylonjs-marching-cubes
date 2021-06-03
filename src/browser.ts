/**
 * This file is the entrypoint of browser builds.
 * The code executes when loaded in a browser.
 */
import { setup, startLoop } from './main';

window.onload = () => {
  setup();
  startLoop();
};
