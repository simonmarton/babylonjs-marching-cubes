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

fn vec4_at_idx(i: i32) -> vec4<f32> {
  let idx = i * 4;
  return vec4<f32>(points.corners[idx], points.corners[idx + 1], points.corners[idx + 2], points.corners[idx + 3]);
}

[[stage(compute), workgroup_size(1)]]
fn main([[builtin(global_invocation_id)]] id: vec3<u32>) {
  let length = i32(arrayLength(&points.corners));
  // Calculated grid is a size smaller, all corners contain the next neighbours
  let grid_size = i32(pow(f32(length) / 4., 1. / 3.));
  let tight_grid_size = grid_size - 1;

  let iso_level = 0.;

  var tri_idx: i32 = 0;

  //
  // let c1 = vec4_at_idx(0);
  // let c2 = vec4_at_idx(4);
  // let c3 = vec4_at_idx(8);

  // result.tris[0] = c1.x;
  // result.tris[1] = c1.y;
  // result.tris[2] = c1.z;
  // result.tris[3] = c2.x;
  // result.tris[4] = c2.y;
  // result.tris[5] = c2.z;
  // result.tris[6] = c3.x;
  // result.tris[7] = c3.y;
  // result.tris[8] = c3.z;
  // result_size.size = 9;

  // result.tris[0] = 1.;
  // result.tris[1] = 1.;
  // result.tris[2] = 1.;
  // return;
  //

  for(var i: i32 = 0; i < i32(pow(f32(grid_size), 3.)) - grid_size * grid_size; i = i + 1) {
    // skip points at the edges
    if(i % grid_size == tight_grid_size || i / grid_size % grid_size == tight_grid_size) {
      continue;
    }

    var cube_corners = array<vec4<f32>, 8>(
      vec4_at_idx(i),
      vec4_at_idx(i + 1),
      vec4_at_idx(i + grid_size),
      vec4_at_idx(i + grid_size + 1),
      vec4_at_idx(i + grid_size * grid_size),
      vec4_at_idx(i + grid_size * grid_size + 1),
      vec4_at_idx(i + grid_size * (grid_size + 1)),
      vec4_at_idx(i + grid_size * (grid_size + 1) + 1)
    );

    var cube_idx = 0;
    if (cube_corners[0].w <= iso_level) { cube_idx = cube_idx | 1; }
    if (cube_corners[1].w <= iso_level) { cube_idx = cube_idx | 2; }
    if (cube_corners[2].w <= iso_level) { cube_idx = cube_idx | 4; }
    if (cube_corners[3].w <= iso_level) { cube_idx = cube_idx | 8; }
    if (cube_corners[4].w <= iso_level) { cube_idx = cube_idx | 16; }
    if (cube_corners[5].w <= iso_level) { cube_idx = cube_idx | 32; }
    if (cube_corners[6].w <= iso_level) { cube_idx = cube_idx | 64; }
    if (cube_corners[7].w <= iso_level) { cube_idx = cube_idx | 128; }

    var edge_config = triangulation_table[cube_idx];

    result.tris[tri_idx] = f32(cube_idx);
    // [1, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],

    // corner_idx_a_from_edge
    // 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3

    // corner_idx_b_from_edge
    // 1, 2, 3, 0, 5, 6, 7, 4, 4, 5, 6, 7

    for(var j: i32 = 0; edge_config[j] != -1; j = j + 3) {
      let a0 = corner_idx_a_from_edge[edge_config[j]];
      let b0 = corner_idx_b_from_edge[edge_config[j]];

      let a1 = corner_idx_a_from_edge[edge_config[j + 1]];
      let b1 = corner_idx_b_from_edge[edge_config[j + 1]];

      let a2 = corner_idx_a_from_edge[edge_config[j + 2]];
      let b2 = corner_idx_b_from_edge[edge_config[j + 2]];

      // result.tris[tri_idx] = f32(j);
      // result.tris[tri_idx + 1] = -1.;
      // result.tris[tri_idx + 2] = f32(edge_config[j]);

      // result.tris[tri_idx + 3] = f32(edge_config[j+1]);
      // result.tris[tri_idx + 4] = f32(edge_config[j+2]);
      // result.tris[tri_idx + 5] = f32(cube_idx);

      // // result.tris[tri_idx + 6] = f32(b1);
      // // result.tris[tri_idx + 7] = f32(b2);
      // result.tris[tri_idx + 8] = -2.;
      
      // result.tris[tri_idx] = f32(j);
      // result.tris[tri_idx + 1] = -1.;
      // result.tris[tri_idx + 2] = f32(a0);

      // result.tris[tri_idx + 3] = f32(a1);
      // result.tris[tri_idx + 4] = f32(a2);
      // result.tris[tri_idx + 5] = f32(b0);

      // result.tris[tri_idx + 6] = f32(b1);
      // result.tris[tri_idx + 7] = f32(b2);
      // result.tris[tri_idx + 8] = -2.;

      let tri1 = vec4<f32>((cube_corners[a0] + cube_corners[b0]) / 2.);
      result.tris[tri_idx] = tri1.x;
      result.tris[tri_idx + 1] = tri1.y;
      result.tris[tri_idx + 2] = tri1.z;

      let tri2 = vec4<f32>((cube_corners[a1] + cube_corners[b1]) / 2.);
      result.tris[tri_idx + 3] = tri2.x;
      result.tris[tri_idx + 4] = tri2.y;
      result.tris[tri_idx + 5] = tri2.z;

      let tri3 = vec4<f32>((cube_corners[a2] + cube_corners[b2]) / 2.);
      result.tris[tri_idx + 6] = tri3.x;
      result.tris[tri_idx + 7] = tri3.y;
      result.tris[tri_idx + 8] = tri3.z;
      
      
      // let tri1 = cube_corners[a2];
      // result.tris[tri_idx] = tri1.x;
      // result.tris[tri_idx + 1] = tri1.y;
      // result.tris[tri_idx + 2] = tri1.z;

      // let tri2 = cube_corners[b2];
      // result.tris[tri_idx + 3] = tri2.x;
      // result.tris[tri_idx + 4] = tri2.y;
      // result.tris[tri_idx + 5] = tri2.z;

      // // let tri3 = vec4<f32>((cube_corners[a2] + cube_corners[b2]) / 2.);
      // result.tris[tri_idx + 6] = -1.;
      // result.tris[tri_idx + 7] = -1.;
      // result.tris[tri_idx + 8] = -1.;



      // let tri1 = cube_corners[a0];
      // result.tris[tri_idx + 0] = tri1.x;
      // result.tris[tri_idx + 1] = tri1.y;
      // result.tris[tri_idx + 2] = tri1.w;

      // let tri2 = cube_corners[b0].xyz;
      // result.tris[tri_idx + 3] = tri2.x;
      // result.tris[tri_idx + 4] = tri2.y;
      // result.tris[tri_idx + 5] = tri2.z;

      // let tri3 = cube_corners[b2].xyz;
      // result.tris[tri_idx + 6] = tri3.x;
      // result.tris[tri_idx + 7] = tri3.y;
      // result.tris[tri_idx + 8] = tri3.z;

      tri_idx = tri_idx + 9;
    }

    
  }

  result_size.size = tri_idx;
}
