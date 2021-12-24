import { Engine } from '@babylonjs/core/engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { HemisphericLight } from '@babylonjs/core/lights';
import { ArcRotateCamera } from '@babylonjs/core/cameras';
import { Vector3, Vector4, Color3 } from '@babylonjs/core/maths/math';
import { Mesh, MeshBuilder, VertexData } from '@babylonjs/core/Meshes';
import { StandardMaterial } from '@babylonjs/core/Materials';

import computeMarchingCubes from './shaders/marching-cubes';
import { getEdgeConfigIdx } from './voxel/marching-cubes';

const GRID_SIZE = 2;
const HALF_GRID = GRID_SIZE / 2;

const createScene = (): Scene => {
  console.time('createScene');
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  const engine = new Engine(canvas, true, {});

  const scene = new Scene(engine);
  window.addEventListener('resize', () => engine.resize());

  const camera = new ArcRotateCamera(
    'camera',
    -Math.PI / 2,
    Math.PI / 2.5,
    GRID_SIZE * 3,
    new Vector3(HALF_GRID, HALF_GRID, HALF_GRID),
    // Vector3.Zero(),
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

const drawTriangles = (scene: Scene, vertexPoints: number[]): void => {
  const mesh = new Mesh('triangles', scene);

  const vertices = new VertexData();
  vertices.positions = vertexPoints;
  vertices.indices = vertexPoints
    .slice(0, vertexPoints.length / 3)
    .map((_, i) => i);

  mesh.material = new StandardMaterial('triangles-material', scene);
  mesh.material.backFaceCulling = false;

  const color = new Color3(0.79, 0.9, 0.29);
  (mesh.material as StandardMaterial).diffuseColor = color;

  vertices.applyToMesh(mesh);
};

const drawPoints = (scene: Scene, points: Vector4[]): void => {
  const inMaterial = new StandardMaterial('points-material-in', scene);
  const outMaterial = new StandardMaterial('points-material-out', scene);
  inMaterial.diffuseColor = Color3.White();
  outMaterial.diffuseColor = Color3.Black();

  points.forEach((pos, idx) => {
    const mesh = MeshBuilder.CreateBox(
      'box',
      { size: idx * 0.01 + 0.01 },
      // { size: idx === 0 ? 0.04 : 0.02 },

      scene
    );
    mesh.material = pos.w > 0 ? inMaterial : outMaterial;

    mesh.position = pos.toVector3();
  });
};

export default async (): Promise<void> => {
  const scene = createScene();

  const { trianglePoints, points } = await computeMarchingCubes({
    gridSize: GRID_SIZE,
    expression: 'y',
    // expression: `(x+y)/${HALF_GRID}-${HALF_GRID}`,
    // expression: `1-(x+y+z)/${HALF_GRID}`,
    // expression: `pow(x-${HALF_GRID}, 2)+y*y+z*z-${Math.pow(
    //   HALF_GRID * 0.8,
    //   2
    // )}`,
  });

  console.log('points', ...points);
  console.log('trianglePoints');

  for (let idx = 0; idx < trianglePoints.length; idx += 3) {
    console.log([
      trianglePoints[idx],
      trianglePoints[idx + 1],
      trianglePoints[idx + 2],
    ]);
  }

  console.log(
    'idx1',
    getEdgeConfigIdx([false, false, true, true, false, false, true, true])
  );
  console.log(
    'idx2',
    getEdgeConfigIdx([true, true, false, false, true, true, false, false])
  );

  drawTriangles(scene, trianglePoints);
  drawPoints(scene, points);

  const engine = scene.getEngine();
  const fps = document.getElementById('fps');
  engine.runRenderLoop(() => {
    if (fps) fps.innerText = `${engine.getFps().toFixed()} FPS`;

    scene.render();
  });
};
