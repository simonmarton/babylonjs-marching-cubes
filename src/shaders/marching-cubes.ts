import { Vector3, Vector4 } from '@babylonjs/core/Maths/math.vector';

import IntensityCalculator from '../intensity-calculator';
import { Triangle } from '../models';
import ComputeShader, { Serializable } from './ComputeShader';

type MarchingCubesResult = {
  points: Vector4[];
  // triangles: Triangle[];
  trianglePoints: number[];
};

type MarchingCubesConfig = {
  gridSize: number;
  expression: string;
};

const compute = async ({
  gridSize = 5,
  expression,
}: MarchingCubesConfig): Promise<MarchingCubesResult> => {
  const intensityCalculator = new IntensityCalculator(expression);
  // Every cube corner
  const points: Vector4[] = [];

  for (let i = 0; i < gridSize ** 3; i++) {
    const x = i % gridSize;
    const tmp = (i - x) / gridSize;
    const y = tmp % gridSize;
    const z = Math.floor(tmp / gridSize);

    points.push(
      new Vector4(x, y, z, intensityCalculator.getIntensity({ x, y, z }))
    );
  }

  const input: Serializable = {
    toFloat32Array() {
      return new Float32Array(
        points.reduce((arr: number[], p) => {
          return [...arr, p.x, p.y, p.z, p.w];
        }, [])
      );
    },
  };

  // Max 5 triangles per cube
  const maxTriCount = points.length * 5;

  const computeShader = new ComputeShader(input, maxTriCount);
  await computeShader.init(1);
  const trianglePoints = Array.from(await computeShader.exec());

  // const triangles: Triangle[] = [];

  // for (let idx = 0; idx < trianglePoints.length; idx += 9) {
  //   const [x0, y0, z0, x1, y1, z1, x2, y2, z2] = trianglePoints.slice(idx);

  //   triangles.push([
  //     new Vector3(x0, y0, z0),
  //     new Vector3(x1, y1, z1),
  //     new Vector3(x2, y2, z2),
  //   ]);
  // }

  return {
    points,
    // triangles,
    trianglePoints,
  };
};

export default compute;
