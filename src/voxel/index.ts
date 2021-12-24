// import {
//   ActionManager,
//   Color3,
//   ExecuteCodeAction,
//   Mesh,
//   MeshBuilder,
//   Scene,
//   StandardMaterial,
//   Vector3,
//   VertexData,
// } from 'babylonjs';
import { Scene } from '@babylonjs/core/Scene';
import { Vector3, Color3 } from '@babylonjs/core/Maths/math';
import { Mesh, MeshBuilder, VertexData } from '@babylonjs/core/Meshes';
import { StandardMaterial } from '@babylonjs/core/Materials';

import { AdvancedDynamicTexture, TextBlock } from '@babylonjs/gui';

import IntensityCalculator from '../intensity-calculator';

import { CubicArray } from '../models';
import { getTriangles, MarchingCubeCorner } from './marching-cubes';

type VoxelCorner = {
  coord: Vector3;
  intensity: number;
  gizmo?: Mesh | null;
};

type VoxelOptions = {
  gridSize: number;
  isoLevel: number;
  debug?: boolean;
};

type Gizmo = Mesh & {
  updateIntensity: (intensity: number) => void;
};

export default class Voxel {
  private corners: VoxelCorner[] = [];
  private static gui: AdvancedDynamicTexture;
  private id: string;
  private labelMeshMaterial?: StandardMaterial;

  constructor(
    private origin: Vector3,
    private options: VoxelOptions,
    private intensityCalculator: IntensityCalculator,
    private scene: Scene
  ) {
    if (options.debug) {
      if (!Voxel.gui) {
        Voxel.gui = AdvancedDynamicTexture.CreateFullscreenUI('gui');
      }

      this.labelMeshMaterial = new StandardMaterial('mat', this.scene);
      // this.createEdges();
    }

    this.id = `voxel-${origin.x}-${origin.y}-${origin.z}`;

    this.createCorners();
    this.calculateTris();
  }

  private createCorners() {
    const { x, y, z } = this.origin;
    const { gridSize } = this.options;

    const coords = [
      new Vector3(x, y, z),
      new Vector3(x + gridSize, y, z),
      new Vector3(x + gridSize, y, z + gridSize),
      new Vector3(x, y, z + gridSize),
      new Vector3(x, y + gridSize, z),
      new Vector3(x + gridSize, y + gridSize, z),
      new Vector3(x + gridSize, y + gridSize, z + gridSize),
      new Vector3(x, y + gridSize, z + gridSize),
    ];

    // console.log('coords', coords);

    this.corners = coords.map((coord, idx) => {
      const intensity = this.intensityCalculator.getIntensity(coord);
      // let gizmo: Gizmo | null = null;

      if (this.options.debug) {
        // gizmo = this.createCornerGizmo(idx, coord, intensity);
        // this.createCornerGizmo(idx, coord, intensity);
        this.addValueLabel(idx, coord, intensity);
      }

      return {
        coord,
        // gizmo,
        intensity,
      };
    });
  }

  private calculateTris(): void {
    const marchingCubeCorners = this.corners.map(({ coord, intensity }) => ({
      position: coord,
      isEnabled: intensity > this.options.isoLevel,
    })) as unknown as CubicArray<MarchingCubeCorner>;
    const tris = getTriangles(marchingCubeCorners);
    // console.log('tris length', tris.length);
    if (tris.length === 0) {
      return;
    }
    console.log('tris', this.id, marchingCubeCorners, tris);

    let positions: number[] = [];
    tris.forEach((tri) => {
      positions = positions.concat(...tri.map(({ x, y, z }) => [x, y, z]));
    });

    let mesh: Mesh = this.scene.getMeshByID(this.id) as Mesh;
    if (!mesh) {
      mesh = new Mesh(this.id, this.scene);
    }

    const vertices = new VertexData();
    vertices.positions = positions;
    vertices.indices = Array(tris.length * 3)
      .fill(null)
      .map((_, i) => i);
    // console.log(vertices);
    mesh.material = new StandardMaterial('march_mat', this.scene);
    mesh.material.backFaceCulling = false;

    // const color = Color3.Random();
    const color = new Color3(0.79, 0.9, 0.29);
    (mesh.material as StandardMaterial).diffuseColor = color;

    vertices.applyToMesh(mesh);
  }

  private addValueLabel(
    idx: number,
    position: Vector3,
    intensity: number
  ): void {
    const id = `label-${this.id}-${idx}`;
    const label = new TextBlock(`${id}_label`, intensity.toFixed(2));

    const mesh = MeshBuilder.CreateBox('box', { size: 0.02 }, this.scene);
    mesh.material = this.labelMeshMaterial!;
    (mesh.material as StandardMaterial).diffuseColor =
      intensity < this.options.isoLevel ? Color3.Black() : Color3.White();
    mesh.position = position;

    label.color = '#999';
    Voxel.gui.addControl(label);
    label.linkWithMesh(mesh);
    label.linkOffsetX = 50;
    label.linkOffsetY = 25;
  }

  private createCornerGizmo(
    idx: number,
    position: Vector3,
    intensity: number
  ): Gizmo {
    const id = `gizmo-${this.id}-${idx}`;

    const gizmo = MeshBuilder.CreateIcoSphere(
      id,
      { radius: 0.03 },
      this.scene
    ) as Gizmo;
    gizmo.position = position;
    gizmo.material = new StandardMaterial('mat', this.scene);

    // Add gizmo label
    const label = new TextBlock(`${id}_label`, 'cica');
    Voxel.gui.addControl(label);
    label.color = '#999';
    label.linkWithMesh(gizmo);
    label.linkOffsetX = 50;
    label.linkOffsetY = 25;

    // gizmo.actionManager = new ActionManager(this.scene);
    // gizmo.actionManager.registerAction(
    //   new ExecuteCodeAction(ActionManager.OnPickTrigger, (_evt) => {
    //     const intensity = +!this.corners[idx].intensity;
    //     this.corners[idx].intensity = intensity;

    //     gizmo.updateIntensity(intensity);
    //     this.calculateTris();
    //   })
    // );

    gizmo.updateIntensity = (intensity) => {
      // (gizmo.material as StandardMaterial).diffuseColor =
      //   intensity < this.options.isoLevel ? Color3.Black() : Color3.White();
      // label.text = idx.toString();
      label.text = intensity.toFixed(2);
    };

    gizmo.updateIntensity(intensity);

    return gizmo;
  }

  private createEdges() {
    const x = MeshBuilder.CreateLines(
      'edges',
      {
        points: [
          this.corners[0].coord,
          this.corners[1].coord,
          this.corners[2].coord,
          this.corners[3].coord,
          this.corners[0].coord,
          this.corners[4].coord,
          this.corners[5].coord,
          this.corners[6].coord,
          this.corners[7].coord,
          this.corners[4].coord,
          this.corners[5].coord,
          this.corners[1].coord,
          this.corners[2].coord,
          this.corners[6].coord,
          this.corners[7].coord,
          this.corners[3].coord,
        ],
      },
      this.scene
    );
    x.color = new Color3(Math.random(), Math.random(), Math.random());
  }
}
