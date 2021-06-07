import {
  ActionManager,
  Color3,
  ExecuteCodeAction,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from 'babylonjs';
import { AdvancedDynamicTexture, TextBlock } from 'babylonjs-gui';

type VoxelCorner = {
  coord: Vector3;
  intensity: number;
  gizmo: Mesh;
};

type VoxelOptions = {
  gridSize: number;
  isoLevel: number;
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

    // debug stuff
    this.createEdges();
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
      const gizmo = this.createCornerGizmo(idx, coord, intensity);

      return {
        coord,
        gizmo,
        intensity,
      };
    });
  }

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
    const getLabelText = (intensity: number) =>
      `${idx} ${intensity ? '✅' : '❌'}`;
    const label = new TextBlock(`${id}_label`, getLabelText(intensity));
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
      })
    );

    gizmo.updateIntensity = (intensity) => {
      (gizmo.material as StandardMaterial).diffuseColor =
        intensity < this.options.isoLevel ? Color3.Black() : Color3.White();
      label.text = getLabelText(intensity);
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
