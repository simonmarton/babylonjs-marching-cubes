/// <reference types="@webgpu/types" />

import simpleShader from './simple.wgsl';

const getDevice = async (): Promise<GPUDevice> => {
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw new Error('webgpu unavailable');
  }

  return adapter.requestDevice();
};

const exec = async (): Promise<void> => {
  const device = await getDevice();

  const input = new Float32Array([Math.PI, 123, -666]);

  const bufSize = Float32Array.BYTES_PER_ELEMENT * input.length;
  const inputBuffer = device.createBuffer({
    mappedAtCreation: true,
    size: bufSize,
    usage: GPUBufferUsage.STORAGE,
  });
  const inputArrayBuffer = inputBuffer.getMappedRange();
  new Float32Array(inputArrayBuffer).set(input);
  inputBuffer.unmap();

  const resultBuffer = device.createBuffer({
    size: bufSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
  });

  const shaderModule = device.createShaderModule({
    code: simpleShader,
  });

  const computePipeline = device.createComputePipeline({
    compute: {
      module: shaderModule,
      entryPoint: 'main',
    },
  });

  const bindGroup = device.createBindGroup({
    layout: computePipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: { buffer: inputBuffer },
      },
      {
        binding: 1,
        resource: { buffer: resultBuffer },
      },
    ],
  });

  const commandEncoder = device.createCommandEncoder();
  const passEncoder = commandEncoder.beginComputePass();
  passEncoder.setPipeline(computePipeline);
  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.dispatch(0);
  passEncoder.dispatch(3);
  passEncoder.endPass();

  const gpuReadBuffer = device.createBuffer({
    size: bufSize,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
  });

  commandEncoder.copyBufferToBuffer(resultBuffer, 0, gpuReadBuffer, 0, bufSize);

  const gpuCommands = commandEncoder.finish();
  device.queue.submit([gpuCommands]);

  await gpuReadBuffer.mapAsync(GPUMapMode.READ);
  const arrayBuffer = gpuReadBuffer.getMappedRange();
  console.log(...new Float32Array(arrayBuffer));
};

export default exec;
