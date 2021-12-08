/// <reference types="@webgpu/types" />

import shaderCode from './marching-cubes.wgsl';

interface Serializable {
  toFloat32Array: () => Float32Array;
}

class ComputeShader {
  private device!: GPUDevice;
  private gpuCommand!: GPUCommandBuffer;
  private gpuReadBuffer!: GPUBuffer;
  private trisBufferSize: number;
  private triCountBufferSize: number;

  constructor(private input: Serializable, private maxTriCount: number) {
    this.trisBufferSize = this.maxTriCount * 3 * Float32Array.BYTES_PER_ELEMENT;
    this.triCountBufferSize = Int32Array.BYTES_PER_ELEMENT * 4;
  }

  public async init(gridSize: number): Promise<void> {
    await this.setDevice();

    const inputData = this.input.toFloat32Array();

    const pointsBufferSize = inputData.byteLength;
    console.log({ pointsBufferSize });

    const pointsBuffer = this.device.createBuffer({
      mappedAtCreation: true,
      size: pointsBufferSize,
      usage: GPUBufferUsage.STORAGE,
    });
    const inputArrayBuffer = pointsBuffer.getMappedRange();
    new Float32Array(inputArrayBuffer).set(inputData);
    pointsBuffer.unmap();

    const trisBuffer = this.device.createBuffer({
      size: this.trisBufferSize,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const triCountBuffer = this.device.createBuffer({
      size: this.triCountBufferSize,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const shaderModule = this.device.createShaderModule({
      code: shaderCode,
    });

    const computePipeline = this.device.createComputePipeline({
      compute: {
        module: shaderModule,
        entryPoint: 'main',
      },
    });

    const bindGroup = this.device.createBindGroup({
      layout: computePipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: { buffer: pointsBuffer },
        },
        {
          binding: 1,
          resource: { buffer: trisBuffer },
        },
        {
          binding: 2,
          resource: { buffer: triCountBuffer },
        },
      ],
    });

    const commandEncoder = this.device.createCommandEncoder();
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(computePipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatch(gridSize, gridSize, gridSize);
    // passEncoder.dispatch(gridSize);
    passEncoder.endPass();

    this.gpuReadBuffer = this.device.createBuffer({
      size: this.trisBufferSize + this.triCountBufferSize,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    commandEncoder.copyBufferToBuffer(
      trisBuffer,
      0,
      this.gpuReadBuffer,
      0,
      this.trisBufferSize
    );
    commandEncoder.copyBufferToBuffer(
      triCountBuffer,
      0,
      this.gpuReadBuffer,
      this.trisBufferSize,
      this.triCountBufferSize
    );

    this.gpuCommand = commandEncoder.finish();
  }

  public async exec(): Promise<Float32Array> {
    if (!this.device) {
      throw new Error('ComputeShader was not initialized!');
    }

    this.device.queue.submit([this.gpuCommand]);

    await this.gpuReadBuffer.mapAsync(GPUMapMode.READ);
    const arrayBuffer = this.gpuReadBuffer.getMappedRange();

    console.log(arrayBuffer);

    const [triCount] = new Int32Array(
      arrayBuffer.slice(
        this.trisBufferSize,
        this.trisBufferSize + this.triCountBufferSize
      )
    );

    console.log({ triCount, bufSize: this.trisBufferSize });

    // return new Float32Array(arrayBuffer.slice(0, this.trisBufferSize));
    // return new Float32Array(arrayBuffer);
    return new Float32Array(
      arrayBuffer.slice(0, triCount * Float32Array.BYTES_PER_ELEMENT)
    );
  }

  private async setDevice(): Promise<void> {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      throw new Error('webgpu unavailable');
    }

    this.device = await adapter.requestDevice();
  }
}
export { Serializable };
export default ComputeShader;
