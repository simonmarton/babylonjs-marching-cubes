[[block]] struct CubeCorners {
  corners: array<f32>;
};

[[block]] struct ResultSize {
  size: i32;
};

[[block]] struct Tris {
  tris: array<f32>;
};

[[group(0), binding(0)]] var<storage, read> points: CubeCorners;
[[group(0), binding(1)]] var<storage, write> result: Tris;
[[group(0), binding(2)]] var<storage, write> result_size: ResultSize;

[[stage(compute), workgroup_size(1)]]
fn main([[builtin(global_invocation_id)]] id: vec3<u32>) {
  let length = i32(arrayLength(&points.corners));
  result_size.size = length * 3;

  for(var i: i32 = 0; i < length * 3; i = i + 3) {
    var p: vec3<f32> = vec3<f32>(f32(i), f32(-i), f32(i + 2) + 30.);

    // tri
    result.tris[i] = p.x;
    result.tris[i + 1] = p.y;
    result.tris[i + 2] = p.z;

    // result.tris[i * 2] = p.x + 1.;
    // result.tris[i * 2 + 1] = p.y + 1.;
    // result.tris[i * 2 + 2] = p.z + 1.;

    // result.tris[i * 3] = p.x + 2.;
    // result.tris[i * 3 + 1] = p.y + 2.;
    // result.tris[i * 3 + 2] = p.z + 2.;
  }
}
