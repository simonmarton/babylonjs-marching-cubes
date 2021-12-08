import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import ComputeShader, { Serializable } from './ComputeShader';

const compute = async (): Promise<void> => {
  // Every cube corner
  const points: Vector3[] = [];

  const gridSize = 3;
  for (let i = 0; i < gridSize ** 3; i++) {
    const x = i % gridSize;
    const tmp = (i - x) / gridSize;
    const y = tmp % gridSize;
    const z = Math.floor(tmp / gridSize);

    points.push(new Vector3(x, y, z));
  }

  console.log({ points });

  const input: Serializable = {
    toFloat32Array() {
      // const w = 123; // isoLevel
      return new Float32Array(
        points.reduce((arr: number[], { x, y, z }) => [...arr, x, y, z], [])
      );
    },
  };

  // Max 5 triangles per cube
  const maxTriCount = points.length * 5;

  console.log('points:', points.length, 'max tris:', maxTriCount);

  const computeShader = new ComputeShader(input, maxTriCount);
  await computeShader.init(1);
  const result = await computeShader.exec();

  console.log('len', result.length);

  console.log(...input.toFloat32Array());
  console.log(...result);
};

export default compute;
