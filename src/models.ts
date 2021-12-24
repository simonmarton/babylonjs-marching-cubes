import { Vector3 } from '@babylonjs/core/Maths/math.vector';

export type FixedSizeArray<N extends number, T> = N extends 0
  ? never[]
  : {
      0: T;
      length: N;
    } & ReadonlyArray<T>;

export type CubicArray<T> = FixedSizeArray<8, T>;

export type TriangulationEntry = FixedSizeArray<16, number>;

export type Triangle = FixedSizeArray<3, Vector3>;
