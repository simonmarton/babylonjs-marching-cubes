import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
  Nullable,
} from 'babylonjs';

import Voxel from './voxel';

const GRID_SIZE = 1;

const createEngine = (): Engine => {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  return new Engine(canvas, true, {});
};

let scene: Nullable<Scene> = null;

export const setup = (): void => {
  const engine = createEngine();
  scene = new Scene(engine);
  window.addEventListener('resize', () => engine.resize());

  const camera = new ArcRotateCamera(
    'camera',
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new Vector3(GRID_SIZE / 2, GRID_SIZE / 2, GRID_SIZE / 2),
    scene
  );
  camera.attachControl(engine.getRenderingCanvas(), true);

  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  // const box = MeshBuilder.CreateBox('box', {}, scene);
  // box.material = new StandardMaterial('mat', scene);

  // box.material.wireframe = true;
  // console.log('box.material!', Material, 1, box.material);
  new Voxel(Vector3.Zero(), { gridSize: GRID_SIZE, isoLevel: 0.5 }, scene);
};

export const startLoop = (): void => {
  if (!scene) {
    throw new Error('Scene is null');
  } else {
    scene.getEngine().runRenderLoop(() => {
      scene!.render();
    });
  }
};
