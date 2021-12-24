import { Engine } from '@babylonjs/core/engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Nullable } from '@babylonjs/core/types';
import { HemisphericLight } from '@babylonjs/core/lights';
import { ArcRotateCamera } from '@babylonjs/core/cameras';
import { Vector3, Color3 } from '@babylonjs/core/maths/math';

import IntensityCalculator from './intensity-calculator';
import Voxel from './voxel';

const GRID_SIZE = 2;
// const GRID_SIZE = 12;
const HALF_GRID = GRID_SIZE / 2;
const DEBUG = 0;
const SHOW_FPS = true;

let scene: Nullable<Scene> = null;

const createScene = (): Scene => {
  console.time('createScene');
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  const engine = new Engine(canvas, true, {});

  scene = new Scene(engine);
  window.addEventListener('resize', () => engine.resize());

  const camera = new ArcRotateCamera(
    'camera',
    -Math.PI / 2,
    Math.PI / 2.5,
    GRID_SIZE * 3,
    Vector3.Zero(),
    scene
  );
  camera.position = new Vector3(
    GRID_SIZE * 2,
    GRID_SIZE * 1.5,
    GRID_SIZE * 1.5
  );
  camera.attachControl(engine.getRenderingCanvas(), true);
  camera.wheelPrecision = 50; // Lower zoom sensitivity

  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  light.intensity = 1.2;
  scene.ambientColor = Color3.White();

  console.timeEnd('createScene');
  return scene;
};

const createVoxels = (scene: Scene): Voxel[] => {
  console.time('createVoxels');
  const intensityCalculator = new IntensityCalculator(
    // `x*x+y*y+z*z-${Math.pow(HALF_GRID * 0.8, 2)}`
    `y -   1`
  );

  const voxelCount = Math.pow(GRID_SIZE, 3);
  console.log('creating voxels', voxelCount);

  const voxels: Voxel[] = [];

  for (let i = 0; i < voxelCount; i++) {
    const x = i % GRID_SIZE;
    const y = (i - x) / GRID_SIZE;
    const z = Math.floor(y / GRID_SIZE);

    voxels.push(
      new Voxel(
        // new Vector3(x - HALF_GRID, (y % GRID_SIZE) - HALF_GRID, z - HALF_GRID),
        new Vector3(x, y % GRID_SIZE, z),
        { gridSize: 1, isoLevel: 0, debug: !!DEBUG },
        intensityCalculator,
        scene
      )
    );
  }

  // for (let x = -HALF_GRID; x < HALF_GRID; x++) {
  //   for (let y = -HALF_GRID; y < HALF_GRID; y++) {
  //     for (let z = -HALF_GRID; z < HALF_GRID; z++) {
  //       // console.log('Voxel!', x, y, z);
  //       voxels.push(
  //         new Voxel(
  //           new Vector3(x, y, z),
  //           { gridSize: 1, isoLevel: 0, debug: !!DEBUG },
  //           intensityCalculator,
  //           scene
  //         )
  //       );
  //     }
  //   }
  // }
  console.timeEnd('createVoxels');

  return voxels;
};

export const setup = (): void => {
  scene = createScene();

  createVoxels(scene);
  // new Voxel(Vector3.Zero(), { gridSize: GRID_SIZE, isoLevel: 0.5 }, scene);
};

export const startLoop = (): void => {
  if (!scene) {
    throw new Error('Scene is null');
  } else {
    const engine = scene.getEngine();
    const fps = document.getElementById('fps');
    engine.runRenderLoop(() => {
      if (fps && SHOW_FPS) fps.innerText = `${engine.getFps().toFixed()} FPS`;
      scene!.render();
    });
  }
};
