import {
  ActionManager,
  Color3,
  ExecuteCodeAction,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
  VertexData,
} from 'babylonjs';
import { AdvancedDynamicTexture, TextBlock } from 'babylonjs-gui';

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

  constructor(
    private origin: Vector3,
    private options: VoxelOptions,
    private scene: Scene
  ) {
    // TODO should be static singleton
    Voxel.gui = AdvancedDynamicTexture.CreateFullscreenUI('gui');

    this.createCorners();
    this.calculateTris();

    if (options.debug) {
      this.createEdges();
    }
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

    this.corners = coords.map((coord, idx) => {
      const intensity = this.getIntensity(coord);
      let gizmo: Gizmo | null = null;

      if (this.options.debug) {
        gizmo = this.createCornerGizmo(idx, coord, intensity);
      }

      return {
        coord,
        gizmo,
        intensity,
      };
    });
  }

  private calculateTris(): void {
    const marchingCubeCorners = this.corners.map(({ coord, intensity }) => ({
      position: coord,
      isEnabled: intensity > 0.5,
    })) as unknown as CubicArray<MarchingCubeCorner>;
    const tris = getTriangles(marchingCubeCorners);

    let positions: number[] = [];
    tris.forEach((tri) => {
      positions = positions.concat(...tri.map(({ x, y, z }) => [x, y, z]));
    });

    let mesh: Mesh = this.scene.getMeshByID('tris') as Mesh;
    if (!mesh) {
      mesh = new Mesh('tris', this.scene);
    }

    const vertices = new VertexData();
    vertices.positions = positions;
    vertices.indices = Array(tris.length * 3)
      .fill(null)
      .map((_, i) => i);
    mesh.material = new StandardMaterial('march_mat', this.scene);
    mesh.material.backFaceCulling = false;

    // const color = Color3.Random();
    const color = new Color3(0.79, 0.9, 0.29);
    (mesh.material as StandardMaterial).diffuseColor = color;

    vertices.applyToMesh(mesh);
  }

  // TODO: get this from a service
  private getIntensity = (coords: Vector3): number => Math.round(Math.random());

  private createCornerGizmo(
    idx: number,
    position: Vector3,
    intensity: number
  ): Gizmo {
    const id = `gizmo_${idx}`;

    const gizmo = MeshBuilder.CreateIcoSphere(
      id,
      { radius: 0.03 },
      this.scene
    ) as Gizmo;
    gizmo.position = position;
    gizmo.material = new StandardMaterial('mat', this.scene);

    // Add gizmo label
    const label = new TextBlock(`${id}_label`, idx.toString());
    Voxel.gui.addControl(label);
    label.color = '#999';
    label.linkWithMesh(gizmo);
    label.linkOffsetX = 50;
    label.linkOffsetY = 25;

    gizmo.actionManager = new ActionManager(this.scene);
    gizmo.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, (_evt) => {
        const intensity = +!this.corners[idx].intensity;
        this.corners[idx].intensity = intensity;

        gizmo.updateIntensity(intensity);
        this.calculateTris();
      })
    );

    gizmo.updateIntensity = (intensity) => {
      (gizmo.material as StandardMaterial).diffuseColor =
        intensity < this.options.isoLevel ? Color3.Black() : Color3.White();
      label.text = idx.toString();
    };

    gizmo.updateIntensity(intensity);

    return gizmo;
  }

  private createEdges() {
    MeshBuilder.CreateLines(
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
  }
}
