/* eslint-disable @typescript-eslint/no-var-requires */

const esbuild = require('esbuild');
const { createServer, request } = require('http');
const { spawn } = require('child_process');

const clients = [];

esbuild
  .build({
    entryPoints: ['src/browser.ts'],
    bundle: true,
    outfile: 'dist/esbuild/browser.js',
    banner: {
      js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();',
    },
    watch: {
      onRebuild(error) {
        clients.forEach((res) => res.write('data: update\n\n'));
        clients.length = 0;
        console.log(error ? error : 'rebuilt..');
      },
    },
  })
  .catch(() => process.exit(1));

esbuild.serve({ servedir: './' }, {}).then(() => {
  createServer((req, res) => {
    const { url, method, headers } = req;
    if (req.url === '/esbuild') {
      return clients.push(
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        })
      );
    }
    const path = url.split('/').pop().includes('.')
      ? url
      : `/public/index.html`; //for PWA with router
    req.pipe(
      request(
        { hostname: '0.0.0.0', port: 8000, path, method, headers },
        (prxRes) => {
          res.writeHead(prxRes.statusCode, prxRes.headers);
          prxRes.pipe(res, { end: true });
        }
      ),
      { end: true }
    );
  }).listen(3000);

  setTimeout(() => {
    const op = {
      darwin: ['open'],
      linux: ['xdg-open'],
      win32: ['cmd', '/c', 'start'],
    };

    const [cmd, ...rest] = op[process.platform];

    if (clients.length === 0) {
      spawn(cmd, [...rest, 'http://localhost:3000']);
    }
  }, 1000); //open the default browser only if it is not opened yet
});
