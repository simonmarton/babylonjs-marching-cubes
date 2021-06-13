import { Vector3 } from 'babylonjs';

import {
  getEdgeConfigIdx,
  getEdgeConfig,
  interpolateVectors,
} from './marching-cubes';

describe('marching-cubes', () => {
  test('getEdgeConfigIdx', () => {
    // Fully outside
    expect(
      getEdgeConfigIdx([false, false, false, false, false, false, false, false])
    ).toBe(0);

    expect(
      getEdgeConfigIdx([false, true, false, true, true, false, false, false])
    ).toBe(26);

    expect(
      getEdgeConfigIdx([true, true, false, false, true, false, false, true])
    ).toBe(147);

    // Fully inside
    expect(
      getEdgeConfigIdx([true, true, true, true, true, true, true, true])
    ).toBe(255);
  });

  test('getEdgeConfig', () => {
    expect(
      getEdgeConfig([false, false, false, false, false, false, false, false])
    ).toEqual([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);

    expect(
      getEdgeConfig([false, true, false, true, true, false, false, false])
    ).toEqual([9, 0, 1, 8, 4, 7, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1]);

    expect(
      getEdgeConfig([true, true, false, false, true, false, false, true])
    ).toEqual([9, 4, 6, 9, 6, 3, 9, 3, 1, 11, 3, 6, -1, -1, -1, -1]);

    expect(
      getEdgeConfig([true, true, true, true, true, true, true, true])
    ).toEqual([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  });

  test('interpolateVectors', () => {
    let v3 = interpolateVectors(new Vector3(2, 4, 6), new Vector3(-2, 6, 8));
    expect(v3.x).toEqual(0);
    expect(v3.y).toEqual(5);
    expect(v3.z).toEqual(7);

    v3 = interpolateVectors(
      new Vector3(1, 2, 3),
      new Vector3(4, 5, 6),
      new Vector3(7, 8, 9)
    );
    expect(v3.x).toEqual(4);
    expect(v3.y).toEqual(5);
    expect(v3.z).toEqual(6);
  });
});
