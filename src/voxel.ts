import {
  ActionManager,
  Color3,
  ExecuteCodeAction,
  Material,
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
  label: string;
  gizmo: Mesh;
};

type VoxelOptions = {
  gridSize: number;
  isoLevel: number;
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
  }

  private createCorners() {
    const { x, y, z } = this.origin;
    const { gridSize } = this.options;

    const getInitialIntensity = (coords: Vector3): number =>
      Math.round(Math.random());
    const setGizmoColor = (material: Material, intensity: number): void => {
      if (intensity < this.options.isoLevel) {
        (material as StandardMaterial).diffuseColor = Color3.Black();
      } else {
        (material as StandardMaterial).diffuseColor = Color3.White();
      }
    };

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

    this.corners = coords.map((coord, i) => {
      const id = `gizmo_${i}`;
      const gizmo = MeshBuilder.CreateIcoSphere(
        id,
        { radius: 0.03 },
        this.scene
      );
      gizmo.position = coord;
      const intensity = getInitialIntensity(coord);
      const material = new StandardMaterial('mat', this.scene);
      setGizmoColor(material, intensity);
      gizmo.material = material;

      // Label
      const getLabelText = (intensity: number) =>
        `${i} ${intensity ? '✅' : '❌'}`;
      const label = new TextBlock(`${i}_label`, getLabelText(intensity));
      label.color = '#999';
      Voxel.gui.addControl(label);
      label.linkWithMesh(gizmo);
      label.linkOffsetX = 50;
      label.linkOffsetY = 25;

      gizmo.actionManager = new ActionManager(this.scene);
      gizmo.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickTrigger, (evt) => {
          const intensity = +!this.corners[i].intensity;
          this.corners[i].intensity = intensity;
          setGizmoColor(material, intensity);
          label.text = getLabelText(intensity);
        })
      );

      return {
        coord,
        gizmo,
        intensity,
        label: i.toString(),
      };
    });

    MeshBuilder.CreateLines(
      'edges',
      {
        points: [
          coords[0],
          coords[1],
          coords[2],
          coords[3],
          //
          coords[0],
          coords[4],
          coords[5],
          coords[6],
          coords[7],
          //
          coords[4],
          coords[5],
          coords[1],
          coords[2],
          coords[6],
          coords[7],
          coords[3],
        ],
      },
      this.scene
    );
  }
}
