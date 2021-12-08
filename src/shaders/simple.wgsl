[[block]] struct MyArr {
  numbers: array<f32>;
};

[[group(0), binding(0)]] var<storage, read> input: MyArr;
[[group(0), binding(1)]] var<storage, write> result: MyArr;

[[stage(compute), workgroup_size(1)]]
fn main([[builtin(global_invocation_id)]] global_id: vec3<u32>) {
  result.numbers[global_id.x] = input.numbers[global_id.x] * 2.0;
}