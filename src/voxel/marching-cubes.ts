import { Vector3 } from 'babylonjs';

import { CubicArray, FixedSizeArray, TriangulationEntry } from '../models';
import { getEdgeCornerIndices, triangulationTable } from './march-tables';

export type MarchingCubeCorner = {
  position: Vector3;
  isEnabled: boolean;
};

type Triangle = FixedSizeArray<3, Vector3>;
// export type MarchinTriangle = Triangle[];

export const getEdgeConfigIdx = (cornerValues: CubicArray<boolean>): number =>
  cornerValues.reduce((sum, val, idx) => (val ? sum + (1 << idx) : sum), 0);

export const getEdgeConfig = (
  cornerValues: CubicArray<boolean>
): TriangulationEntry => triangulationTable[getEdgeConfigIdx(cornerValues)];

export const interpolateVectors = (...vectors: Vector3[]) =>
  vectors
    .reduce((sum, vec) => sum.add(vec), Vector3.Zero())
    .scale(1 / vectors.length);

export const getTriangles = (
  corners: CubicArray<MarchingCubeCorner>
): Triangle[] => {
  const cornerIntensities = corners.map(
    (x) => x.isEnabled
  ) as unknown as CubicArray<boolean>;
  const edgeConfig = getEdgeConfig(cornerIntensities);

  const triangles: Triangle[] = [];
  for (let idx = 0; edgeConfig[idx] !== -1; idx += 3) {
    const [a0, b0] = getEdgeCornerIndices(edgeConfig[idx]);
    const [a1, b1] = getEdgeCornerIndices(edgeConfig[idx + 1]);
    const [a2, b2] = getEdgeCornerIndices(edgeConfig[idx + 2]);

    // TODO: interpolate vertices based on iso value
    triangles.push([
      interpolateVectors(corners[a0].position, corners[b0].position),
      interpolateVectors(corners[a1].position, corners[b1].position),
      interpolateVectors(corners[a2].position, corners[b2].position),
    ]);
  }

  return triangles;
};
