(() => {
  // node_modules/@babylonjs/core/Maths/math.scalar.js
  var Scalar = function() {
    function Scalar2() {
    }
    Scalar2.WithinEpsilon = function(a, b, epsilon) {
      if (epsilon === void 0) {
        epsilon = 1401298e-51;
      }
      var num = a - b;
      return -epsilon <= num && num <= epsilon;
    };
    Scalar2.ToHex = function(i) {
      var str = i.toString(16);
      if (i <= 15) {
        return ("0" + str).toUpperCase();
      }
      return str.toUpperCase();
    };
    Scalar2.Sign = function(value) {
      value = +value;
      if (value === 0 || isNaN(value)) {
        return value;
      }
      return value > 0 ? 1 : -1;
    };
    Scalar2.Clamp = function(value, min, max) {
      if (min === void 0) {
        min = 0;
      }
      if (max === void 0) {
        max = 1;
      }
      return Math.min(max, Math.max(min, value));
    };
    Scalar2.Log2 = function(value) {
      return Math.log(value) * Math.LOG2E;
    };
    Scalar2.Repeat = function(value, length) {
      return value - Math.floor(value / length) * length;
    };
    Scalar2.Normalize = function(value, min, max) {
      return (value - min) / (max - min);
    };
    Scalar2.Denormalize = function(normalized, min, max) {
      return normalized * (max - min) + min;
    };
    Scalar2.DeltaAngle = function(current, target) {
      var num = Scalar2.Repeat(target - current, 360);
      if (num > 180) {
        num -= 360;
      }
      return num;
    };
    Scalar2.PingPong = function(tx, length) {
      var t = Scalar2.Repeat(tx, length * 2);
      return length - Math.abs(t - length);
    };
    Scalar2.SmoothStep = function(from, to, tx) {
      var t = Scalar2.Clamp(tx);
      t = -2 * t * t * t + 3 * t * t;
      return to * t + from * (1 - t);
    };
    Scalar2.MoveTowards = function(current, target, maxDelta) {
      var result = 0;
      if (Math.abs(target - current) <= maxDelta) {
        result = target;
      } else {
        result = current + Scalar2.Sign(target - current) * maxDelta;
      }
      return result;
    };
    Scalar2.MoveTowardsAngle = function(current, target, maxDelta) {
      var num = Scalar2.DeltaAngle(current, target);
      var result = 0;
      if (-maxDelta < num && num < maxDelta) {
        result = target;
      } else {
        target = current + num;
        result = Scalar2.MoveTowards(current, target, maxDelta);
      }
      return result;
    };
    Scalar2.Lerp = function(start, end, amount) {
      return start + (end - start) * amount;
    };
    Scalar2.LerpAngle = function(start, end, amount) {
      var num = Scalar2.Repeat(end - start, 360);
      if (num > 180) {
        num -= 360;
      }
      return start + num * Scalar2.Clamp(amount);
    };
    Scalar2.InverseLerp = function(a, b, value) {
      var result = 0;
      if (a != b) {
        result = Scalar2.Clamp((value - a) / (b - a));
      } else {
        result = 0;
      }
      return result;
    };
    Scalar2.Hermite = function(value1, tangent1, value2, tangent2, amount) {
      var squared = amount * amount;
      var cubed = amount * squared;
      var part1 = 2 * cubed - 3 * squared + 1;
      var part2 = -2 * cubed + 3 * squared;
      var part3 = cubed - 2 * squared + amount;
      var part4 = cubed - squared;
      return value1 * part1 + value2 * part2 + tangent1 * part3 + tangent2 * part4;
    };
    Scalar2.RandomRange = function(min, max) {
      if (min === max) {
        return min;
      }
      return Math.random() * (max - min) + min;
    };
    Scalar2.RangeToPercent = function(number, min, max) {
      return (number - min) / (max - min);
    };
    Scalar2.PercentToRange = function(percent, min, max) {
      return (max - min) * percent + min;
    };
    Scalar2.NormalizeRadians = function(angle) {
      angle -= Scalar2.TwoPi * Math.floor((angle + Math.PI) / Scalar2.TwoPi);
      return angle;
    };
    Scalar2.TwoPi = Math.PI * 2;
    return Scalar2;
  }();

  // node_modules/@babylonjs/core/Maths/math.constants.js
  var ToGammaSpace = 1 / 2.2;
  var ToLinearSpace = 2.2;
  var Epsilon = 1e-3;

  // node_modules/@babylonjs/core/Misc/arrayTools.js
  var ArrayTools = function() {
    function ArrayTools2() {
    }
    ArrayTools2.BuildArray = function(size, itemBuilder) {
      var a = [];
      for (var i = 0; i < size; ++i) {
        a.push(itemBuilder());
      }
      return a;
    };
    return ArrayTools2;
  }();

  // node_modules/@babylonjs/core/Misc/typeStore.js
  var _TypeStore = function() {
    function _TypeStore2() {
    }
    _TypeStore2.GetClass = function(fqdn) {
      if (this.RegisteredTypes && this.RegisteredTypes[fqdn]) {
        return this.RegisteredTypes[fqdn];
      }
      return null;
    };
    _TypeStore2.RegisteredTypes = {};
    return _TypeStore2;
  }();

  // node_modules/@babylonjs/core/Engines/performanceConfigurator.js
  var PerformanceConfigurator = function() {
    function PerformanceConfigurator2() {
    }
    PerformanceConfigurator2.SetMatrixPrecision = function(use64bits) {
      PerformanceConfigurator2.MatrixTrackPrecisionChange = false;
      if (use64bits && !PerformanceConfigurator2.MatrixUse64Bits) {
        if (PerformanceConfigurator2.MatrixTrackedMatrices) {
          for (var m = 0; m < PerformanceConfigurator2.MatrixTrackedMatrices.length; ++m) {
            var matrix = PerformanceConfigurator2.MatrixTrackedMatrices[m];
            var values = matrix._m;
            matrix._m = new Array(16);
            for (var i = 0; i < 16; ++i) {
              matrix._m[i] = values[i];
            }
          }
        }
      }
      PerformanceConfigurator2.MatrixUse64Bits = use64bits;
      PerformanceConfigurator2.MatrixCurrentType = PerformanceConfigurator2.MatrixUse64Bits ? Array : Float32Array;
      PerformanceConfigurator2.MatrixTrackedMatrices = null;
    };
    PerformanceConfigurator2.MatrixUse64Bits = false;
    PerformanceConfigurator2.MatrixTrackPrecisionChange = true;
    PerformanceConfigurator2.MatrixCurrentType = Float32Array;
    PerformanceConfigurator2.MatrixTrackedMatrices = [];
    return PerformanceConfigurator2;
  }();

  // node_modules/@babylonjs/core/Maths/math.vector.js
  var Vector2 = function() {
    function Vector22(x, y) {
      if (x === void 0) {
        x = 0;
      }
      if (y === void 0) {
        y = 0;
      }
      this.x = x;
      this.y = y;
    }
    Vector22.prototype.toString = function() {
      return "{X: " + this.x + " Y: " + this.y + "}";
    };
    Vector22.prototype.getClassName = function() {
      return "Vector2";
    };
    Vector22.prototype.getHashCode = function() {
      var hash = this.x | 0;
      hash = hash * 397 ^ (this.y | 0);
      return hash;
    };
    Vector22.prototype.toArray = function(array, index) {
      if (index === void 0) {
        index = 0;
      }
      array[index] = this.x;
      array[index + 1] = this.y;
      return this;
    };
    Vector22.prototype.fromArray = function(array, index) {
      if (index === void 0) {
        index = 0;
      }
      Vector22.FromArrayToRef(array, index, this);
      return this;
    };
    Vector22.prototype.asArray = function() {
      var result = new Array();
      this.toArray(result, 0);
      return result;
    };
    Vector22.prototype.copyFrom = function(source) {
      this.x = source.x;
      this.y = source.y;
      return this;
    };
    Vector22.prototype.copyFromFloats = function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    };
    Vector22.prototype.set = function(x, y) {
      return this.copyFromFloats(x, y);
    };
    Vector22.prototype.add = function(otherVector) {
      return new Vector22(this.x + otherVector.x, this.y + otherVector.y);
    };
    Vector22.prototype.addToRef = function(otherVector, result) {
      result.x = this.x + otherVector.x;
      result.y = this.y + otherVector.y;
      return this;
    };
    Vector22.prototype.addInPlace = function(otherVector) {
      this.x += otherVector.x;
      this.y += otherVector.y;
      return this;
    };
    Vector22.prototype.addVector3 = function(otherVector) {
      return new Vector22(this.x + otherVector.x, this.y + otherVector.y);
    };
    Vector22.prototype.subtract = function(otherVector) {
      return new Vector22(this.x - otherVector.x, this.y - otherVector.y);
    };
    Vector22.prototype.subtractToRef = function(otherVector, result) {
      result.x = this.x - otherVector.x;
      result.y = this.y - otherVector.y;
      return this;
    };
    Vector22.prototype.subtractInPlace = function(otherVector) {
      this.x -= otherVector.x;
      this.y -= otherVector.y;
      return this;
    };
    Vector22.prototype.multiplyInPlace = function(otherVector) {
      this.x *= otherVector.x;
      this.y *= otherVector.y;
      return this;
    };
    Vector22.prototype.multiply = function(otherVector) {
      return new Vector22(this.x * otherVector.x, this.y * otherVector.y);
    };
    Vector22.prototype.multiplyToRef = function(otherVector, result) {
      result.x = this.x * otherVector.x;
      result.y = this.y * otherVector.y;
      return this;
    };
    Vector22.prototype.multiplyByFloats = function(x, y) {
      return new Vector22(this.x * x, this.y * y);
    };
    Vector22.prototype.divide = function(otherVector) {
      return new Vector22(this.x / otherVector.x, this.y / otherVector.y);
    };
    Vector22.prototype.divideToRef = function(otherVector, result) {
      result.x = this.x / otherVector.x;
      result.y = this.y / otherVector.y;
      return this;
    };
    Vector22.prototype.divideInPlace = function(otherVector) {
      return this.divideToRef(otherVector, this);
    };
    Vector22.prototype.negate = function() {
      return new Vector22(-this.x, -this.y);
    };
    Vector22.prototype.negateInPlace = function() {
      this.x *= -1;
      this.y *= -1;
      return this;
    };
    Vector22.prototype.negateToRef = function(result) {
      return result.copyFromFloats(this.x * -1, this.y * -1);
    };
    Vector22.prototype.scaleInPlace = function(scale) {
      this.x *= scale;
      this.y *= scale;
      return this;
    };
    Vector22.prototype.scale = function(scale) {
      var result = new Vector22(0, 0);
      this.scaleToRef(scale, result);
      return result;
    };
    Vector22.prototype.scaleToRef = function(scale, result) {
      result.x = this.x * scale;
      result.y = this.y * scale;
      return this;
    };
    Vector22.prototype.scaleAndAddToRef = function(scale, result) {
      result.x += this.x * scale;
      result.y += this.y * scale;
      return this;
    };
    Vector22.prototype.equals = function(otherVector) {
      return otherVector && this.x === otherVector.x && this.y === otherVector.y;
    };
    Vector22.prototype.equalsWithEpsilon = function(otherVector, epsilon) {
      if (epsilon === void 0) {
        epsilon = Epsilon;
      }
      return otherVector && Scalar.WithinEpsilon(this.x, otherVector.x, epsilon) && Scalar.WithinEpsilon(this.y, otherVector.y, epsilon);
    };
    Vector22.prototype.floor = function() {
      return new Vector22(Math.floor(this.x), Math.floor(this.y));
    };
    Vector22.prototype.fract = function() {
      return new Vector22(this.x - Math.floor(this.x), this.y - Math.floor(this.y));
    };
    Vector22.prototype.length = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector22.prototype.lengthSquared = function() {
      return this.x * this.x + this.y * this.y;
    };
    Vector22.prototype.normalize = function() {
      var len = this.length();
      if (len === 0) {
        return this;
      }
      this.x /= len;
      this.y /= len;
      return this;
    };
    Vector22.prototype.clone = function() {
      return new Vector22(this.x, this.y);
    };
    Vector22.Zero = function() {
      return new Vector22(0, 0);
    };
    Vector22.One = function() {
      return new Vector22(1, 1);
    };
    Vector22.FromArray = function(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return new Vector22(array[offset], array[offset + 1]);
    };
    Vector22.FromArrayToRef = function(array, offset, result) {
      result.x = array[offset];
      result.y = array[offset + 1];
    };
    Vector22.CatmullRom = function(value1, value2, value3, value4, amount) {
      var squared = amount * amount;
      var cubed = amount * squared;
      var x = 0.5 * (2 * value2.x + (-value1.x + value3.x) * amount + (2 * value1.x - 5 * value2.x + 4 * value3.x - value4.x) * squared + (-value1.x + 3 * value2.x - 3 * value3.x + value4.x) * cubed);
      var y = 0.5 * (2 * value2.y + (-value1.y + value3.y) * amount + (2 * value1.y - 5 * value2.y + 4 * value3.y - value4.y) * squared + (-value1.y + 3 * value2.y - 3 * value3.y + value4.y) * cubed);
      return new Vector22(x, y);
    };
    Vector22.Clamp = function(value, min, max) {
      var x = value.x;
      x = x > max.x ? max.x : x;
      x = x < min.x ? min.x : x;
      var y = value.y;
      y = y > max.y ? max.y : y;
      y = y < min.y ? min.y : y;
      return new Vector22(x, y);
    };
    Vector22.Hermite = function(value1, tangent1, value2, tangent2, amount) {
      var squared = amount * amount;
      var cubed = amount * squared;
      var part1 = 2 * cubed - 3 * squared + 1;
      var part2 = -2 * cubed + 3 * squared;
      var part3 = cubed - 2 * squared + amount;
      var part4 = cubed - squared;
      var x = value1.x * part1 + value2.x * part2 + tangent1.x * part3 + tangent2.x * part4;
      var y = value1.y * part1 + value2.y * part2 + tangent1.y * part3 + tangent2.y * part4;
      return new Vector22(x, y);
    };
    Vector22.Lerp = function(start, end, amount) {
      var x = start.x + (end.x - start.x) * amount;
      var y = start.y + (end.y - start.y) * amount;
      return new Vector22(x, y);
    };
    Vector22.Dot = function(left, right) {
      return left.x * right.x + left.y * right.y;
    };
    Vector22.Normalize = function(vector) {
      var newVector = vector.clone();
      newVector.normalize();
      return newVector;
    };
    Vector22.Minimize = function(left, right) {
      var x = left.x < right.x ? left.x : right.x;
      var y = left.y < right.y ? left.y : right.y;
      return new Vector22(x, y);
    };
    Vector22.Maximize = function(left, right) {
      var x = left.x > right.x ? left.x : right.x;
      var y = left.y > right.y ? left.y : right.y;
      return new Vector22(x, y);
    };
    Vector22.Transform = function(vector, transformation) {
      var r = Vector22.Zero();
      Vector22.TransformToRef(vector, transformation, r);
      return r;
    };
    Vector22.TransformToRef = function(vector, transformation, result) {
      var m = transformation.m;
      var x = vector.x * m[0] + vector.y * m[4] + m[12];
      var y = vector.x * m[1] + vector.y * m[5] + m[13];
      result.x = x;
      result.y = y;
    };
    Vector22.PointInTriangle = function(p, p0, p1, p2) {
      var a = 1 / 2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
      var sign = a < 0 ? -1 : 1;
      var s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
      var t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;
      return s > 0 && t > 0 && s + t < 2 * a * sign;
    };
    Vector22.Distance = function(value1, value2) {
      return Math.sqrt(Vector22.DistanceSquared(value1, value2));
    };
    Vector22.DistanceSquared = function(value1, value2) {
      var x = value1.x - value2.x;
      var y = value1.y - value2.y;
      return x * x + y * y;
    };
    Vector22.Center = function(value1, value2) {
      var center = value1.add(value2);
      center.scaleInPlace(0.5);
      return center;
    };
    Vector22.DistanceOfPointFromSegment = function(p, segA, segB) {
      var l2 = Vector22.DistanceSquared(segA, segB);
      if (l2 === 0) {
        return Vector22.Distance(p, segA);
      }
      var v = segB.subtract(segA);
      var t = Math.max(0, Math.min(1, Vector22.Dot(p.subtract(segA), v) / l2));
      var proj = segA.add(v.multiplyByFloats(t, t));
      return Vector22.Distance(p, proj);
    };
    return Vector22;
  }();
  var Vector3 = function() {
    function Vector32(x, y, z) {
      if (x === void 0) {
        x = 0;
      }
      if (y === void 0) {
        y = 0;
      }
      if (z === void 0) {
        z = 0;
      }
      this._isDirty = true;
      this._x = x;
      this._y = y;
      this._z = z;
    }
    Object.defineProperty(Vector32.prototype, "x", {
      get: function() {
        return this._x;
      },
      set: function(value) {
        this._x = value;
        this._isDirty = true;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Vector32.prototype, "y", {
      get: function() {
        return this._y;
      },
      set: function(value) {
        this._y = value;
        this._isDirty = true;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Vector32.prototype, "z", {
      get: function() {
        return this._z;
      },
      set: function(value) {
        this._z = value;
        this._isDirty = true;
      },
      enumerable: false,
      configurable: true
    });
    Vector32.prototype.toString = function() {
      return "{X: " + this._x + " Y:" + this._y + " Z:" + this._z + "}";
    };
    Vector32.prototype.getClassName = function() {
      return "Vector3";
    };
    Vector32.prototype.getHashCode = function() {
      var hash = this._x | 0;
      hash = hash * 397 ^ (this._y | 0);
      hash = hash * 397 ^ (this._z | 0);
      return hash;
    };
    Vector32.prototype.asArray = function() {
      var result = [];
      this.toArray(result, 0);
      return result;
    };
    Vector32.prototype.toArray = function(array, index) {
      if (index === void 0) {
        index = 0;
      }
      array[index] = this._x;
      array[index + 1] = this._y;
      array[index + 2] = this._z;
      return this;
    };
    Vector32.prototype.fromArray = function(array, index) {
      if (index === void 0) {
        index = 0;
      }
      Vector32.FromArrayToRef(array, index, this);
      return this;
    };
    Vector32.prototype.toQuaternion = function() {
      return Quaternion.RotationYawPitchRoll(this._y, this._x, this._z);
    };
    Vector32.prototype.addInPlace = function(otherVector) {
      return this.addInPlaceFromFloats(otherVector._x, otherVector._y, otherVector._z);
    };
    Vector32.prototype.addInPlaceFromFloats = function(x, y, z) {
      this.x += x;
      this.y += y;
      this.z += z;
      return this;
    };
    Vector32.prototype.add = function(otherVector) {
      return new Vector32(this._x + otherVector._x, this._y + otherVector._y, this._z + otherVector._z);
    };
    Vector32.prototype.addToRef = function(otherVector, result) {
      return result.copyFromFloats(this._x + otherVector._x, this._y + otherVector._y, this._z + otherVector._z);
    };
    Vector32.prototype.subtractInPlace = function(otherVector) {
      this.x -= otherVector._x;
      this.y -= otherVector._y;
      this.z -= otherVector._z;
      return this;
    };
    Vector32.prototype.subtract = function(otherVector) {
      return new Vector32(this._x - otherVector._x, this._y - otherVector._y, this._z - otherVector._z);
    };
    Vector32.prototype.subtractToRef = function(otherVector, result) {
      return this.subtractFromFloatsToRef(otherVector._x, otherVector._y, otherVector._z, result);
    };
    Vector32.prototype.subtractFromFloats = function(x, y, z) {
      return new Vector32(this._x - x, this._y - y, this._z - z);
    };
    Vector32.prototype.subtractFromFloatsToRef = function(x, y, z, result) {
      return result.copyFromFloats(this._x - x, this._y - y, this._z - z);
    };
    Vector32.prototype.negate = function() {
      return new Vector32(-this._x, -this._y, -this._z);
    };
    Vector32.prototype.negateInPlace = function() {
      this.x *= -1;
      this.y *= -1;
      this.z *= -1;
      return this;
    };
    Vector32.prototype.negateToRef = function(result) {
      return result.copyFromFloats(this._x * -1, this._y * -1, this._z * -1);
    };
    Vector32.prototype.scaleInPlace = function(scale) {
      this.x *= scale;
      this.y *= scale;
      this.z *= scale;
      return this;
    };
    Vector32.prototype.scale = function(scale) {
      return new Vector32(this._x * scale, this._y * scale, this._z * scale);
    };
    Vector32.prototype.scaleToRef = function(scale, result) {
      return result.copyFromFloats(this._x * scale, this._y * scale, this._z * scale);
    };
    Vector32.prototype.scaleAndAddToRef = function(scale, result) {
      return result.addInPlaceFromFloats(this._x * scale, this._y * scale, this._z * scale);
    };
    Vector32.prototype.projectOnPlane = function(plane, origin) {
      var result = Vector32.Zero();
      this.projectOnPlaneToRef(plane, origin, result);
      return result;
    };
    Vector32.prototype.projectOnPlaneToRef = function(plane, origin, result) {
      var n = plane.normal;
      var d = plane.d;
      var V = MathTmp.Vector3[0];
      this.subtractToRef(origin, V);
      V.normalize();
      var denom = Vector32.Dot(V, n);
      var t = -(Vector32.Dot(origin, n) + d) / denom;
      var scaledV = V.scaleInPlace(t);
      origin.addToRef(scaledV, result);
    };
    Vector32.prototype.equals = function(otherVector) {
      return otherVector && this._x === otherVector._x && this._y === otherVector._y && this._z === otherVector._z;
    };
    Vector32.prototype.equalsWithEpsilon = function(otherVector, epsilon) {
      if (epsilon === void 0) {
        epsilon = Epsilon;
      }
      return otherVector && Scalar.WithinEpsilon(this._x, otherVector._x, epsilon) && Scalar.WithinEpsilon(this._y, otherVector._y, epsilon) && Scalar.WithinEpsilon(this._z, otherVector._z, epsilon);
    };
    Vector32.prototype.equalsToFloats = function(x, y, z) {
      return this._x === x && this._y === y && this._z === z;
    };
    Vector32.prototype.multiplyInPlace = function(otherVector) {
      this.x *= otherVector._x;
      this.y *= otherVector._y;
      this.z *= otherVector._z;
      return this;
    };
    Vector32.prototype.multiply = function(otherVector) {
      return this.multiplyByFloats(otherVector._x, otherVector._y, otherVector._z);
    };
    Vector32.prototype.multiplyToRef = function(otherVector, result) {
      return result.copyFromFloats(this._x * otherVector._x, this._y * otherVector._y, this._z * otherVector._z);
    };
    Vector32.prototype.multiplyByFloats = function(x, y, z) {
      return new Vector32(this._x * x, this._y * y, this._z * z);
    };
    Vector32.prototype.divide = function(otherVector) {
      return new Vector32(this._x / otherVector._x, this._y / otherVector._y, this._z / otherVector._z);
    };
    Vector32.prototype.divideToRef = function(otherVector, result) {
      return result.copyFromFloats(this._x / otherVector._x, this._y / otherVector._y, this._z / otherVector._z);
    };
    Vector32.prototype.divideInPlace = function(otherVector) {
      return this.divideToRef(otherVector, this);
    };
    Vector32.prototype.minimizeInPlace = function(other) {
      return this.minimizeInPlaceFromFloats(other._x, other._y, other._z);
    };
    Vector32.prototype.maximizeInPlace = function(other) {
      return this.maximizeInPlaceFromFloats(other._x, other._y, other._z);
    };
    Vector32.prototype.minimizeInPlaceFromFloats = function(x, y, z) {
      if (x < this._x) {
        this.x = x;
      }
      if (y < this._y) {
        this.y = y;
      }
      if (z < this._z) {
        this.z = z;
      }
      return this;
    };
    Vector32.prototype.maximizeInPlaceFromFloats = function(x, y, z) {
      if (x > this._x) {
        this.x = x;
      }
      if (y > this._y) {
        this.y = y;
      }
      if (z > this._z) {
        this.z = z;
      }
      return this;
    };
    Vector32.prototype.isNonUniformWithinEpsilon = function(epsilon) {
      var absX = Math.abs(this._x);
      var absY = Math.abs(this._y);
      if (!Scalar.WithinEpsilon(absX, absY, epsilon)) {
        return true;
      }
      var absZ = Math.abs(this._z);
      if (!Scalar.WithinEpsilon(absX, absZ, epsilon)) {
        return true;
      }
      if (!Scalar.WithinEpsilon(absY, absZ, epsilon)) {
        return true;
      }
      return false;
    };
    Object.defineProperty(Vector32.prototype, "isNonUniform", {
      get: function() {
        var absX = Math.abs(this._x);
        var absY = Math.abs(this._y);
        if (absX !== absY) {
          return true;
        }
        var absZ = Math.abs(this._z);
        if (absX !== absZ) {
          return true;
        }
        return false;
      },
      enumerable: false,
      configurable: true
    });
    Vector32.prototype.floor = function() {
      return new Vector32(Math.floor(this._x), Math.floor(this._y), Math.floor(this._z));
    };
    Vector32.prototype.fract = function() {
      return new Vector32(this._x - Math.floor(this._x), this._y - Math.floor(this._y), this._z - Math.floor(this._z));
    };
    Vector32.prototype.length = function() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    };
    Vector32.prototype.lengthSquared = function() {
      return this._x * this._x + this._y * this._y + this._z * this._z;
    };
    Vector32.prototype.normalize = function() {
      return this.normalizeFromLength(this.length());
    };
    Vector32.prototype.reorderInPlace = function(order) {
      var _this = this;
      order = order.toLowerCase();
      if (order === "xyz") {
        return this;
      }
      MathTmp.Vector3[0].copyFrom(this);
      ["x", "y", "z"].forEach(function(val, i) {
        _this[val] = MathTmp.Vector3[0][order[i]];
      });
      return this;
    };
    Vector32.prototype.rotateByQuaternionToRef = function(quaternion, result) {
      quaternion.toRotationMatrix(MathTmp.Matrix[0]);
      Vector32.TransformCoordinatesToRef(this, MathTmp.Matrix[0], result);
      return result;
    };
    Vector32.prototype.rotateByQuaternionAroundPointToRef = function(quaternion, point, result) {
      this.subtractToRef(point, MathTmp.Vector3[0]);
      MathTmp.Vector3[0].rotateByQuaternionToRef(quaternion, MathTmp.Vector3[0]);
      point.addToRef(MathTmp.Vector3[0], result);
      return result;
    };
    Vector32.prototype.cross = function(other) {
      return Vector32.Cross(this, other);
    };
    Vector32.prototype.normalizeFromLength = function(len) {
      if (len === 0 || len === 1) {
        return this;
      }
      return this.scaleInPlace(1 / len);
    };
    Vector32.prototype.normalizeToNew = function() {
      var normalized = new Vector32(0, 0, 0);
      this.normalizeToRef(normalized);
      return normalized;
    };
    Vector32.prototype.normalizeToRef = function(reference) {
      var len = this.length();
      if (len === 0 || len === 1) {
        return reference.copyFromFloats(this._x, this._y, this._z);
      }
      return this.scaleToRef(1 / len, reference);
    };
    Vector32.prototype.clone = function() {
      return new Vector32(this._x, this._y, this._z);
    };
    Vector32.prototype.copyFrom = function(source) {
      return this.copyFromFloats(source._x, source._y, source._z);
    };
    Vector32.prototype.copyFromFloats = function(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    };
    Vector32.prototype.set = function(x, y, z) {
      return this.copyFromFloats(x, y, z);
    };
    Vector32.prototype.setAll = function(v) {
      this.x = this.y = this.z = v;
      return this;
    };
    Vector32.GetClipFactor = function(vector0, vector1, axis, size) {
      var d0 = Vector32.Dot(vector0, axis) - size;
      var d1 = Vector32.Dot(vector1, axis) - size;
      var s = d0 / (d0 - d1);
      return s;
    };
    Vector32.GetAngleBetweenVectors = function(vector0, vector1, normal) {
      var v0 = vector0.normalizeToRef(MathTmp.Vector3[1]);
      var v1 = vector1.normalizeToRef(MathTmp.Vector3[2]);
      var dot = Vector32.Dot(v0, v1);
      var n = MathTmp.Vector3[3];
      Vector32.CrossToRef(v0, v1, n);
      if (Vector32.Dot(n, normal) > 0) {
        return Math.acos(dot);
      }
      return -Math.acos(dot);
    };
    Vector32.FromArray = function(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return new Vector32(array[offset], array[offset + 1], array[offset + 2]);
    };
    Vector32.FromFloatArray = function(array, offset) {
      return Vector32.FromArray(array, offset);
    };
    Vector32.FromArrayToRef = function(array, offset, result) {
      result.x = array[offset];
      result.y = array[offset + 1];
      result.z = array[offset + 2];
    };
    Vector32.FromFloatArrayToRef = function(array, offset, result) {
      return Vector32.FromArrayToRef(array, offset, result);
    };
    Vector32.FromFloatsToRef = function(x, y, z, result) {
      result.copyFromFloats(x, y, z);
    };
    Vector32.Zero = function() {
      return new Vector32(0, 0, 0);
    };
    Vector32.One = function() {
      return new Vector32(1, 1, 1);
    };
    Vector32.Up = function() {
      return new Vector32(0, 1, 0);
    };
    Object.defineProperty(Vector32, "UpReadOnly", {
      get: function() {
        return Vector32._UpReadOnly;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Vector32, "ZeroReadOnly", {
      get: function() {
        return Vector32._ZeroReadOnly;
      },
      enumerable: false,
      configurable: true
    });
    Vector32.Down = function() {
      return new Vector32(0, -1, 0);
    };
    Vector32.Forward = function(rightHandedSystem) {
      if (rightHandedSystem === void 0) {
        rightHandedSystem = false;
      }
      return new Vector32(0, 0, rightHandedSystem ? -1 : 1);
    };
    Vector32.Backward = function(rightHandedSystem) {
      if (rightHandedSystem === void 0) {
        rightHandedSystem = false;
      }
      return new Vector32(0, 0, rightHandedSystem ? 1 : -1);
    };
    Vector32.Right = function() {
      return new Vector32(1, 0, 0);
    };
    Vector32.Left = function() {
      return new Vector32(-1, 0, 0);
    };
    Vector32.TransformCoordinates = function(vector, transformation) {
      var result = Vector32.Zero();
      Vector32.TransformCoordinatesToRef(vector, transformation, result);
      return result;
    };
    Vector32.TransformCoordinatesToRef = function(vector, transformation, result) {
      Vector32.TransformCoordinatesFromFloatsToRef(vector._x, vector._y, vector._z, transformation, result);
    };
    Vector32.TransformCoordinatesFromFloatsToRef = function(x, y, z, transformation, result) {
      var m = transformation.m;
      var rx = x * m[0] + y * m[4] + z * m[8] + m[12];
      var ry = x * m[1] + y * m[5] + z * m[9] + m[13];
      var rz = x * m[2] + y * m[6] + z * m[10] + m[14];
      var rw = 1 / (x * m[3] + y * m[7] + z * m[11] + m[15]);
      result.x = rx * rw;
      result.y = ry * rw;
      result.z = rz * rw;
    };
    Vector32.TransformNormal = function(vector, transformation) {
      var result = Vector32.Zero();
      Vector32.TransformNormalToRef(vector, transformation, result);
      return result;
    };
    Vector32.TransformNormalToRef = function(vector, transformation, result) {
      this.TransformNormalFromFloatsToRef(vector._x, vector._y, vector._z, transformation, result);
    };
    Vector32.TransformNormalFromFloatsToRef = function(x, y, z, transformation, result) {
      var m = transformation.m;
      result.x = x * m[0] + y * m[4] + z * m[8];
      result.y = x * m[1] + y * m[5] + z * m[9];
      result.z = x * m[2] + y * m[6] + z * m[10];
    };
    Vector32.CatmullRom = function(value1, value2, value3, value4, amount) {
      var squared = amount * amount;
      var cubed = amount * squared;
      var x = 0.5 * (2 * value2._x + (-value1._x + value3._x) * amount + (2 * value1._x - 5 * value2._x + 4 * value3._x - value4._x) * squared + (-value1._x + 3 * value2._x - 3 * value3._x + value4._x) * cubed);
      var y = 0.5 * (2 * value2._y + (-value1._y + value3._y) * amount + (2 * value1._y - 5 * value2._y + 4 * value3._y - value4._y) * squared + (-value1._y + 3 * value2._y - 3 * value3._y + value4._y) * cubed);
      var z = 0.5 * (2 * value2._z + (-value1._z + value3._z) * amount + (2 * value1._z - 5 * value2._z + 4 * value3._z - value4._z) * squared + (-value1._z + 3 * value2._z - 3 * value3._z + value4._z) * cubed);
      return new Vector32(x, y, z);
    };
    Vector32.Clamp = function(value, min, max) {
      var v = new Vector32();
      Vector32.ClampToRef(value, min, max, v);
      return v;
    };
    Vector32.ClampToRef = function(value, min, max, result) {
      var x = value._x;
      x = x > max._x ? max._x : x;
      x = x < min._x ? min._x : x;
      var y = value._y;
      y = y > max._y ? max._y : y;
      y = y < min._y ? min._y : y;
      var z = value._z;
      z = z > max._z ? max._z : z;
      z = z < min._z ? min._z : z;
      result.copyFromFloats(x, y, z);
    };
    Vector32.CheckExtends = function(v, min, max) {
      min.minimizeInPlace(v);
      max.maximizeInPlace(v);
    };
    Vector32.Hermite = function(value1, tangent1, value2, tangent2, amount) {
      var squared = amount * amount;
      var cubed = amount * squared;
      var part1 = 2 * cubed - 3 * squared + 1;
      var part2 = -2 * cubed + 3 * squared;
      var part3 = cubed - 2 * squared + amount;
      var part4 = cubed - squared;
      var x = value1._x * part1 + value2._x * part2 + tangent1._x * part3 + tangent2._x * part4;
      var y = value1._y * part1 + value2._y * part2 + tangent1._y * part3 + tangent2._y * part4;
      var z = value1._z * part1 + value2._z * part2 + tangent1._z * part3 + tangent2._z * part4;
      return new Vector32(x, y, z);
    };
    Vector32.Lerp = function(start, end, amount) {
      var result = new Vector32(0, 0, 0);
      Vector32.LerpToRef(start, end, amount, result);
      return result;
    };
    Vector32.LerpToRef = function(start, end, amount, result) {
      result.x = start._x + (end._x - start._x) * amount;
      result.y = start._y + (end._y - start._y) * amount;
      result.z = start._z + (end._z - start._z) * amount;
    };
    Vector32.Dot = function(left, right) {
      return left._x * right._x + left._y * right._y + left._z * right._z;
    };
    Vector32.Cross = function(left, right) {
      var result = Vector32.Zero();
      Vector32.CrossToRef(left, right, result);
      return result;
    };
    Vector32.CrossToRef = function(left, right, result) {
      var x = left._y * right._z - left._z * right._y;
      var y = left._z * right._x - left._x * right._z;
      var z = left._x * right._y - left._y * right._x;
      result.copyFromFloats(x, y, z);
    };
    Vector32.Normalize = function(vector) {
      var result = Vector32.Zero();
      Vector32.NormalizeToRef(vector, result);
      return result;
    };
    Vector32.NormalizeToRef = function(vector, result) {
      vector.normalizeToRef(result);
    };
    Vector32.Project = function(vector, world, transform, viewport) {
      var result = new Vector32();
      Vector32.ProjectToRef(vector, world, transform, viewport, result);
      return result;
    };
    Vector32.ProjectToRef = function(vector, world, transform, viewport, result) {
      var cw = viewport.width;
      var ch = viewport.height;
      var cx = viewport.x;
      var cy = viewport.y;
      var viewportMatrix = MathTmp.Matrix[1];
      Matrix.FromValuesToRef(cw / 2, 0, 0, 0, 0, -ch / 2, 0, 0, 0, 0, 0.5, 0, cx + cw / 2, ch / 2 + cy, 0.5, 1, viewportMatrix);
      var matrix = MathTmp.Matrix[0];
      world.multiplyToRef(transform, matrix);
      matrix.multiplyToRef(viewportMatrix, matrix);
      Vector32.TransformCoordinatesToRef(vector, matrix, result);
      return result;
    };
    Vector32._UnprojectFromInvertedMatrixToRef = function(source, matrix, result) {
      Vector32.TransformCoordinatesToRef(source, matrix, result);
      var m = matrix.m;
      var num = source._x * m[3] + source._y * m[7] + source._z * m[11] + m[15];
      if (Scalar.WithinEpsilon(num, 1)) {
        result.scaleInPlace(1 / num);
      }
    };
    Vector32.UnprojectFromTransform = function(source, viewportWidth, viewportHeight, world, transform) {
      var matrix = MathTmp.Matrix[0];
      world.multiplyToRef(transform, matrix);
      matrix.invert();
      source.x = source._x / viewportWidth * 2 - 1;
      source.y = -(source._y / viewportHeight * 2 - 1);
      var vector = new Vector32();
      Vector32._UnprojectFromInvertedMatrixToRef(source, matrix, vector);
      return vector;
    };
    Vector32.Unproject = function(source, viewportWidth, viewportHeight, world, view, projection) {
      var result = Vector32.Zero();
      Vector32.UnprojectToRef(source, viewportWidth, viewportHeight, world, view, projection, result);
      return result;
    };
    Vector32.UnprojectToRef = function(source, viewportWidth, viewportHeight, world, view, projection, result) {
      Vector32.UnprojectFloatsToRef(source._x, source._y, source._z, viewportWidth, viewportHeight, world, view, projection, result);
    };
    Vector32.UnprojectFloatsToRef = function(sourceX, sourceY, sourceZ, viewportWidth, viewportHeight, world, view, projection, result) {
      var matrix = MathTmp.Matrix[0];
      world.multiplyToRef(view, matrix);
      matrix.multiplyToRef(projection, matrix);
      matrix.invert();
      var screenSource = MathTmp.Vector3[0];
      screenSource.x = sourceX / viewportWidth * 2 - 1;
      screenSource.y = -(sourceY / viewportHeight * 2 - 1);
      screenSource.z = 2 * sourceZ - 1;
      Vector32._UnprojectFromInvertedMatrixToRef(screenSource, matrix, result);
    };
    Vector32.Minimize = function(left, right) {
      var min = left.clone();
      min.minimizeInPlace(right);
      return min;
    };
    Vector32.Maximize = function(left, right) {
      var max = left.clone();
      max.maximizeInPlace(right);
      return max;
    };
    Vector32.Distance = function(value1, value2) {
      return Math.sqrt(Vector32.DistanceSquared(value1, value2));
    };
    Vector32.DistanceSquared = function(value1, value2) {
      var x = value1._x - value2._x;
      var y = value1._y - value2._y;
      var z = value1._z - value2._z;
      return x * x + y * y + z * z;
    };
    Vector32.Center = function(value1, value2) {
      var center = value1.add(value2);
      center.scaleInPlace(0.5);
      return center;
    };
    Vector32.RotationFromAxis = function(axis1, axis2, axis3) {
      var rotation = Vector32.Zero();
      Vector32.RotationFromAxisToRef(axis1, axis2, axis3, rotation);
      return rotation;
    };
    Vector32.RotationFromAxisToRef = function(axis1, axis2, axis3, ref) {
      var quat = MathTmp.Quaternion[0];
      Quaternion.RotationQuaternionFromAxisToRef(axis1, axis2, axis3, quat);
      quat.toEulerAnglesToRef(ref);
    };
    Vector32._UpReadOnly = Vector32.Up();
    Vector32._ZeroReadOnly = Vector32.Zero();
    return Vector32;
  }();
  var Vector4 = function() {
    function Vector42(x, y, z, w) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    }
    Vector42.prototype.toString = function() {
      return "{X: " + this.x + " Y:" + this.y + " Z:" + this.z + " W:" + this.w + "}";
    };
    Vector42.prototype.getClassName = function() {
      return "Vector4";
    };
    Vector42.prototype.getHashCode = function() {
      var hash = this.x | 0;
      hash = hash * 397 ^ (this.y | 0);
      hash = hash * 397 ^ (this.z | 0);
      hash = hash * 397 ^ (this.w | 0);
      return hash;
    };
    Vector42.prototype.asArray = function() {
      var result = new Array();
      this.toArray(result, 0);
      return result;
    };
    Vector42.prototype.toArray = function(array, index) {
      if (index === void 0) {
        index = 0;
      }
      array[index] = this.x;
      array[index + 1] = this.y;
      array[index + 2] = this.z;
      array[index + 3] = this.w;
      return this;
    };
    Vector42.prototype.fromArray = function(array, index) {
      if (index === void 0) {
        index = 0;
      }
      Vector42.FromArrayToRef(array, index, this);
      return this;
    };
    Vector42.prototype.addInPlace = function(otherVector) {
      this.x += otherVector.x;
      this.y += otherVector.y;
      this.z += otherVector.z;
      this.w += otherVector.w;
      return this;
    };
    Vector42.prototype.add = function(otherVector) {
      return new Vector42(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z, this.w + otherVector.w);
    };
    Vector42.prototype.addToRef = function(otherVector, result) {
      result.x = this.x + otherVector.x;
      result.y = this.y + otherVector.y;
      result.z = this.z + otherVector.z;
      result.w = this.w + otherVector.w;
      return this;
    };
    Vector42.prototype.subtractInPlace = function(otherVector) {
      this.x -= otherVector.x;
      this.y -= otherVector.y;
      this.z -= otherVector.z;
      this.w -= otherVector.w;
      return this;
    };
    Vector42.prototype.subtract = function(otherVector) {
      return new Vector42(this.x - otherVector.x, this.y - otherVector.y, this.z - otherVector.z, this.w - otherVector.w);
    };
    Vector42.prototype.subtractToRef = function(otherVector, result) {
      result.x = this.x - otherVector.x;
      result.y = this.y - otherVector.y;
      result.z = this.z - otherVector.z;
      result.w = this.w - otherVector.w;
      return this;
    };
    Vector42.prototype.subtractFromFloats = function(x, y, z, w) {
      return new Vector42(this.x - x, this.y - y, this.z - z, this.w - w);
    };
    Vector42.prototype.subtractFromFloatsToRef = function(x, y, z, w, result) {
      result.x = this.x - x;
      result.y = this.y - y;
      result.z = this.z - z;
      result.w = this.w - w;
      return this;
    };
    Vector42.prototype.negate = function() {
      return new Vector42(-this.x, -this.y, -this.z, -this.w);
    };
    Vector42.prototype.negateInPlace = function() {
      this.x *= -1;
      this.y *= -1;
      this.z *= -1;
      this.w *= -1;
      return this;
    };
    Vector42.prototype.negateToRef = function(result) {
      return result.copyFromFloats(this.x * -1, this.y * -1, this.z * -1, this.w * -1);
    };
    Vector42.prototype.scaleInPlace = function(scale) {
      this.x *= scale;
      this.y *= scale;
      this.z *= scale;
      this.w *= scale;
      return this;
    };
    Vector42.prototype.scale = function(scale) {
      return new Vector42(this.x * scale, this.y * scale, this.z * scale, this.w * scale);
    };
    Vector42.prototype.scaleToRef = function(scale, result) {
      result.x = this.x * scale;
      result.y = this.y * scale;
      result.z = this.z * scale;
      result.w = this.w * scale;
      return this;
    };
    Vector42.prototype.scaleAndAddToRef = function(scale, result) {
      result.x += this.x * scale;
      result.y += this.y * scale;
      result.z += this.z * scale;
      result.w += this.w * scale;
      return this;
    };
    Vector42.prototype.equals = function(otherVector) {
      return otherVector && this.x === otherVector.x && this.y === otherVector.y && this.z === otherVector.z && this.w === otherVector.w;
    };
    Vector42.prototype.equalsWithEpsilon = function(otherVector, epsilon) {
      if (epsilon === void 0) {
        epsilon = Epsilon;
      }
      return otherVector && Scalar.WithinEpsilon(this.x, otherVector.x, epsilon) && Scalar.WithinEpsilon(this.y, otherVector.y, epsilon) && Scalar.WithinEpsilon(this.z, otherVector.z, epsilon) && Scalar.WithinEpsilon(this.w, otherVector.w, epsilon);
    };
    Vector42.prototype.equalsToFloats = function(x, y, z, w) {
      return this.x === x && this.y === y && this.z === z && this.w === w;
    };
    Vector42.prototype.multiplyInPlace = function(otherVector) {
      this.x *= otherVector.x;
      this.y *= otherVector.y;
      this.z *= otherVector.z;
      this.w *= otherVector.w;
      return this;
    };
    Vector42.prototype.multiply = function(otherVector) {
      return new Vector42(this.x * otherVector.x, this.y * otherVector.y, this.z * otherVector.z, this.w * otherVector.w);
    };
    Vector42.prototype.multiplyToRef = function(otherVector, result) {
      result.x = this.x * otherVector.x;
      result.y = this.y * otherVector.y;
      result.z = this.z * otherVector.z;
      result.w = this.w * otherVector.w;
      return this;
    };
    Vector42.prototype.multiplyByFloats = function(x, y, z, w) {
      return new Vector42(this.x * x, this.y * y, this.z * z, this.w * w);
    };
    Vector42.prototype.divide = function(otherVector) {
      return new Vector42(this.x / otherVector.x, this.y / otherVector.y, this.z / otherVector.z, this.w / otherVector.w);
    };
    Vector42.prototype.divideToRef = function(otherVector, result) {
      result.x = this.x / otherVector.x;
      result.y = this.y / otherVector.y;
      result.z = this.z / otherVector.z;
      result.w = this.w / otherVector.w;
      return this;
    };
    Vector42.prototype.divideInPlace = function(otherVector) {
      return this.divideToRef(otherVector, this);
    };
    Vector42.prototype.minimizeInPlace = function(other) {
      if (other.x < this.x) {
        this.x = other.x;
      }
      if (other.y < this.y) {
        this.y = other.y;
      }
      if (other.z < this.z) {
        this.z = other.z;
      }
      if (other.w < this.w) {
        this.w = other.w;
      }
      return this;
    };
    Vector42.prototype.maximizeInPlace = function(other) {
      if (other.x > this.x) {
        this.x = other.x;
      }
      if (other.y > this.y) {
        this.y = other.y;
      }
      if (other.z > this.z) {
        this.z = other.z;
      }
      if (other.w > this.w) {
        this.w = other.w;
      }
      return this;
    };
    Vector42.prototype.floor = function() {
      return new Vector42(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z), Math.floor(this.w));
    };
    Vector42.prototype.fract = function() {
      return new Vector42(this.x - Math.floor(this.x), this.y - Math.floor(this.y), this.z - Math.floor(this.z), this.w - Math.floor(this.w));
    };
    Vector42.prototype.length = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    };
    Vector42.prototype.lengthSquared = function() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    };
    Vector42.prototype.normalize = function() {
      var len = this.length();
      if (len === 0) {
        return this;
      }
      return this.scaleInPlace(1 / len);
    };
    Vector42.prototype.toVector3 = function() {
      return new Vector3(this.x, this.y, this.z);
    };
    Vector42.prototype.clone = function() {
      return new Vector42(this.x, this.y, this.z, this.w);
    };
    Vector42.prototype.copyFrom = function(source) {
      this.x = source.x;
      this.y = source.y;
      this.z = source.z;
      this.w = source.w;
      return this;
    };
    Vector42.prototype.copyFromFloats = function(x, y, z, w) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
      return this;
    };
    Vector42.prototype.set = function(x, y, z, w) {
      return this.copyFromFloats(x, y, z, w);
    };
    Vector42.prototype.setAll = function(v) {
      this.x = this.y = this.z = this.w = v;
      return this;
    };
    Vector42.FromArray = function(array, offset) {
      if (!offset) {
        offset = 0;
      }
      return new Vector42(array[offset], array[offset + 1], array[offset + 2], array[offset + 3]);
    };
    Vector42.FromArrayToRef = function(array, offset, result) {
      result.x = array[offset];
      result.y = array[offset + 1];
      result.z = array[offset + 2];
      result.w = array[offset + 3];
    };
    Vector42.FromFloatArrayToRef = function(array, offset, result) {
      Vector42.FromArrayToRef(array, offset, result);
    };
    Vector42.FromFloatsToRef = function(x, y, z, w, result) {
      result.x = x;
      result.y = y;
      result.z = z;
      result.w = w;
    };
    Vector42.Zero = function() {
      return new Vector42(0, 0, 0, 0);
    };
    Vector42.One = function() {
      return new Vector42(1, 1, 1, 1);
    };
    Vector42.Normalize = function(vector) {
      var result = Vector42.Zero();
      Vector42.NormalizeToRef(vector, result);
      return result;
    };
    Vector42.NormalizeToRef = function(vector, result) {
      result.copyFrom(vector);
      result.normalize();
    };
    Vector42.Minimize = function(left, right) {
      var min = left.clone();
      min.minimizeInPlace(right);
      return min;
    };
    Vector42.Maximize = function(left, right) {
      var max = left.clone();
      max.maximizeInPlace(right);
      return max;
    };
    Vector42.Distance = function(value1, value2) {
      return Math.sqrt(Vector42.DistanceSquared(value1, value2));
    };
    Vector42.DistanceSquared = function(value1, value2) {
      var x = value1.x - value2.x;
      var y = value1.y - value2.y;
      var z = value1.z - value2.z;
      var w = value1.w - value2.w;
      return x * x + y * y + z * z + w * w;
    };
    Vector42.Center = function(value1, value2) {
      var center = value1.add(value2);
      center.scaleInPlace(0.5);
      return center;
    };
    Vector42.TransformNormal = function(vector, transformation) {
      var result = Vector42.Zero();
      Vector42.TransformNormalToRef(vector, transformation, result);
      return result;
    };
    Vector42.TransformNormalToRef = function(vector, transformation, result) {
      var m = transformation.m;
      var x = vector.x * m[0] + vector.y * m[4] + vector.z * m[8];
      var y = vector.x * m[1] + vector.y * m[5] + vector.z * m[9];
      var z = vector.x * m[2] + vector.y * m[6] + vector.z * m[10];
      result.x = x;
      result.y = y;
      result.z = z;
      result.w = vector.w;
    };
    Vector42.TransformNormalFromFloatsToRef = function(x, y, z, w, transformation, result) {
      var m = transformation.m;
      result.x = x * m[0] + y * m[4] + z * m[8];
      result.y = x * m[1] + y * m[5] + z * m[9];
      result.z = x * m[2] + y * m[6] + z * m[10];
      result.w = w;
    };
    Vector42.FromVector3 = function(source, w) {
      if (w === void 0) {
        w = 0;
      }
      return new Vector42(source._x, source._y, source._z, w);
    };
    return Vector42;
  }();
  var Quaternion = function() {
    function Quaternion2(x, y, z, w) {
      if (x === void 0) {
        x = 0;
      }
      if (y === void 0) {
        y = 0;
      }
      if (z === void 0) {
        z = 0;
      }
      if (w === void 0) {
        w = 1;
      }
      this._isDirty = true;
      this._x = x;
      this._y = y;
      this._z = z;
      this._w = w;
    }
    Object.defineProperty(Quaternion2.prototype, "x", {
      get: function() {
        return this._x;
      },
      set: function(value) {
        this._x = value;
        this._isDirty = true;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Quaternion2.prototype, "y", {
      get: function() {
        return this._y;
      },
      set: function(value) {
        this._y = value;
        this._isDirty = true;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Quaternion2.prototype, "z", {
      get: function() {
        return this._z;
      },
      set: function(value) {
        this._z = value;
        this._isDirty = true;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Quaternion2.prototype, "w", {
      get: function() {
        return this._w;
      },
      set: function(value) {
        this._w = value;
        this._isDirty = true;
      },
      enumerable: false,
      configurable: true
    });
    Quaternion2.prototype.toString = function() {
      return "{X: " + this._x + " Y:" + this._y + " Z:" + this._z + " W:" + this._w + "}";
    };
    Quaternion2.prototype.getClassName = function() {
      return "Quaternion";
    };
    Quaternion2.prototype.getHashCode = function() {
      var hash = this._x | 0;
      hash = hash * 397 ^ (this._y | 0);
      hash = hash * 397 ^ (this._z | 0);
      hash = hash * 397 ^ (this._w | 0);
      return hash;
    };
    Quaternion2.prototype.asArray = function() {
      return [this._x, this._y, this._z, this._w];
    };
    Quaternion2.prototype.equals = function(otherQuaternion) {
      return otherQuaternion && this._x === otherQuaternion._x && this._y === otherQuaternion._y && this._z === otherQuaternion._z && this._w === otherQuaternion._w;
    };
    Quaternion2.prototype.equalsWithEpsilon = function(otherQuaternion, epsilon) {
      if (epsilon === void 0) {
        epsilon = Epsilon;
      }
      return otherQuaternion && Scalar.WithinEpsilon(this._x, otherQuaternion._x, epsilon) && Scalar.WithinEpsilon(this._y, otherQuaternion._y, epsilon) && Scalar.WithinEpsilon(this._z, otherQuaternion._z, epsilon) && Scalar.WithinEpsilon(this._w, otherQuaternion._w, epsilon);
    };
    Quaternion2.prototype.clone = function() {
      return new Quaternion2(this._x, this._y, this._z, this._w);
    };
    Quaternion2.prototype.copyFrom = function(other) {
      this.x = other._x;
      this.y = other._y;
      this.z = other._z;
      this.w = other._w;
      return this;
    };
    Quaternion2.prototype.copyFromFloats = function(x, y, z, w) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
      return this;
    };
    Quaternion2.prototype.set = function(x, y, z, w) {
      return this.copyFromFloats(x, y, z, w);
    };
    Quaternion2.prototype.add = function(other) {
      return new Quaternion2(this._x + other._x, this._y + other._y, this._z + other._z, this._w + other._w);
    };
    Quaternion2.prototype.addInPlace = function(other) {
      this._x += other._x;
      this._y += other._y;
      this._z += other._z;
      this._w += other._w;
      return this;
    };
    Quaternion2.prototype.subtract = function(other) {
      return new Quaternion2(this._x - other._x, this._y - other._y, this._z - other._z, this._w - other._w);
    };
    Quaternion2.prototype.scale = function(value) {
      return new Quaternion2(this._x * value, this._y * value, this._z * value, this._w * value);
    };
    Quaternion2.prototype.scaleToRef = function(scale, result) {
      result.x = this._x * scale;
      result.y = this._y * scale;
      result.z = this._z * scale;
      result.w = this._w * scale;
      return this;
    };
    Quaternion2.prototype.scaleInPlace = function(value) {
      this.x *= value;
      this.y *= value;
      this.z *= value;
      this.w *= value;
      return this;
    };
    Quaternion2.prototype.scaleAndAddToRef = function(scale, result) {
      result.x += this._x * scale;
      result.y += this._y * scale;
      result.z += this._z * scale;
      result.w += this._w * scale;
      return this;
    };
    Quaternion2.prototype.multiply = function(q1) {
      var result = new Quaternion2(0, 0, 0, 1);
      this.multiplyToRef(q1, result);
      return result;
    };
    Quaternion2.prototype.multiplyToRef = function(q1, result) {
      var x = this._x * q1._w + this._y * q1._z - this._z * q1._y + this._w * q1._x;
      var y = -this._x * q1._z + this._y * q1._w + this._z * q1._x + this._w * q1._y;
      var z = this._x * q1._y - this._y * q1._x + this._z * q1._w + this._w * q1._z;
      var w = -this._x * q1._x - this._y * q1._y - this._z * q1._z + this._w * q1._w;
      result.copyFromFloats(x, y, z, w);
      return this;
    };
    Quaternion2.prototype.multiplyInPlace = function(q1) {
      this.multiplyToRef(q1, this);
      return this;
    };
    Quaternion2.prototype.conjugateToRef = function(ref) {
      ref.copyFromFloats(-this._x, -this._y, -this._z, this._w);
      return this;
    };
    Quaternion2.prototype.conjugateInPlace = function() {
      this.x *= -1;
      this.y *= -1;
      this.z *= -1;
      return this;
    };
    Quaternion2.prototype.conjugate = function() {
      var result = new Quaternion2(-this._x, -this._y, -this._z, this._w);
      return result;
    };
    Quaternion2.prototype.length = function() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    };
    Quaternion2.prototype.normalize = function() {
      var len = this.length();
      if (len === 0) {
        return this;
      }
      var inv = 1 / len;
      this.x *= inv;
      this.y *= inv;
      this.z *= inv;
      this.w *= inv;
      return this;
    };
    Quaternion2.prototype.toEulerAngles = function(order) {
      if (order === void 0) {
        order = "YZX";
      }
      var result = Vector3.Zero();
      this.toEulerAnglesToRef(result);
      return result;
    };
    Quaternion2.prototype.toEulerAnglesToRef = function(result) {
      var qz = this._z;
      var qx = this._x;
      var qy = this._y;
      var qw = this._w;
      var sqw = qw * qw;
      var sqz = qz * qz;
      var sqx = qx * qx;
      var sqy = qy * qy;
      var zAxisY = qy * qz - qx * qw;
      var limit = 0.4999999;
      if (zAxisY < -limit) {
        result.y = 2 * Math.atan2(qy, qw);
        result.x = Math.PI / 2;
        result.z = 0;
      } else if (zAxisY > limit) {
        result.y = 2 * Math.atan2(qy, qw);
        result.x = -Math.PI / 2;
        result.z = 0;
      } else {
        result.z = Math.atan2(2 * (qx * qy + qz * qw), -sqz - sqx + sqy + sqw);
        result.x = Math.asin(-2 * (qz * qy - qx * qw));
        result.y = Math.atan2(2 * (qz * qx + qy * qw), sqz - sqx - sqy + sqw);
      }
      return this;
    };
    Quaternion2.prototype.toRotationMatrix = function(result) {
      Matrix.FromQuaternionToRef(this, result);
      return this;
    };
    Quaternion2.prototype.fromRotationMatrix = function(matrix) {
      Quaternion2.FromRotationMatrixToRef(matrix, this);
      return this;
    };
    Quaternion2.FromRotationMatrix = function(matrix) {
      var result = new Quaternion2();
      Quaternion2.FromRotationMatrixToRef(matrix, result);
      return result;
    };
    Quaternion2.FromRotationMatrixToRef = function(matrix, result) {
      var data = matrix.m;
      var m11 = data[0], m12 = data[4], m13 = data[8];
      var m21 = data[1], m22 = data[5], m23 = data[9];
      var m31 = data[2], m32 = data[6], m33 = data[10];
      var trace = m11 + m22 + m33;
      var s;
      if (trace > 0) {
        s = 0.5 / Math.sqrt(trace + 1);
        result.w = 0.25 / s;
        result.x = (m32 - m23) * s;
        result.y = (m13 - m31) * s;
        result.z = (m21 - m12) * s;
      } else if (m11 > m22 && m11 > m33) {
        s = 2 * Math.sqrt(1 + m11 - m22 - m33);
        result.w = (m32 - m23) / s;
        result.x = 0.25 * s;
        result.y = (m12 + m21) / s;
        result.z = (m13 + m31) / s;
      } else if (m22 > m33) {
        s = 2 * Math.sqrt(1 + m22 - m11 - m33);
        result.w = (m13 - m31) / s;
        result.x = (m12 + m21) / s;
        result.y = 0.25 * s;
        result.z = (m23 + m32) / s;
      } else {
        s = 2 * Math.sqrt(1 + m33 - m11 - m22);
        result.w = (m21 - m12) / s;
        result.x = (m13 + m31) / s;
        result.y = (m23 + m32) / s;
        result.z = 0.25 * s;
      }
    };
    Quaternion2.Dot = function(left, right) {
      return left._x * right._x + left._y * right._y + left._z * right._z + left._w * right._w;
    };
    Quaternion2.AreClose = function(quat0, quat1) {
      var dot = Quaternion2.Dot(quat0, quat1);
      return dot >= 0;
    };
    Quaternion2.Zero = function() {
      return new Quaternion2(0, 0, 0, 0);
    };
    Quaternion2.Inverse = function(q) {
      return new Quaternion2(-q._x, -q._y, -q._z, q._w);
    };
    Quaternion2.InverseToRef = function(q, result) {
      result.set(-q._x, -q._y, -q._z, q._w);
      return result;
    };
    Quaternion2.Identity = function() {
      return new Quaternion2(0, 0, 0, 1);
    };
    Quaternion2.IsIdentity = function(quaternion) {
      return quaternion && quaternion._x === 0 && quaternion._y === 0 && quaternion._z === 0 && quaternion._w === 1;
    };
    Quaternion2.RotationAxis = function(axis, angle) {
      return Quaternion2.RotationAxisToRef(axis, angle, new Quaternion2());
    };
    Quaternion2.RotationAxisToRef = function(axis, angle, result) {
      var sin = Math.sin(angle / 2);
      axis.normalize();
      result.w = Math.cos(angle / 2);
      result.x = axis._x * sin;
      result.y = axis._y * sin;
      result.z = axis._z * sin;
      return result;
    };
    Quaternion2.FromArray = function(array, offset) {
      if (!offset) {
        offset = 0;
      }
      return new Quaternion2(array[offset], array[offset + 1], array[offset + 2], array[offset + 3]);
    };
    Quaternion2.FromArrayToRef = function(array, offset, result) {
      result.x = array[offset];
      result.y = array[offset + 1];
      result.z = array[offset + 2];
      result.w = array[offset + 3];
    };
    Quaternion2.FromEulerAngles = function(x, y, z) {
      var q = new Quaternion2();
      Quaternion2.RotationYawPitchRollToRef(y, x, z, q);
      return q;
    };
    Quaternion2.FromEulerAnglesToRef = function(x, y, z, result) {
      Quaternion2.RotationYawPitchRollToRef(y, x, z, result);
      return result;
    };
    Quaternion2.FromEulerVector = function(vec) {
      var q = new Quaternion2();
      Quaternion2.RotationYawPitchRollToRef(vec._y, vec._x, vec._z, q);
      return q;
    };
    Quaternion2.FromEulerVectorToRef = function(vec, result) {
      Quaternion2.RotationYawPitchRollToRef(vec._y, vec._x, vec._z, result);
      return result;
    };
    Quaternion2.RotationYawPitchRoll = function(yaw, pitch, roll) {
      var q = new Quaternion2();
      Quaternion2.RotationYawPitchRollToRef(yaw, pitch, roll, q);
      return q;
    };
    Quaternion2.RotationYawPitchRollToRef = function(yaw, pitch, roll, result) {
      var halfRoll = roll * 0.5;
      var halfPitch = pitch * 0.5;
      var halfYaw = yaw * 0.5;
      var sinRoll = Math.sin(halfRoll);
      var cosRoll = Math.cos(halfRoll);
      var sinPitch = Math.sin(halfPitch);
      var cosPitch = Math.cos(halfPitch);
      var sinYaw = Math.sin(halfYaw);
      var cosYaw = Math.cos(halfYaw);
      result.x = cosYaw * sinPitch * cosRoll + sinYaw * cosPitch * sinRoll;
      result.y = sinYaw * cosPitch * cosRoll - cosYaw * sinPitch * sinRoll;
      result.z = cosYaw * cosPitch * sinRoll - sinYaw * sinPitch * cosRoll;
      result.w = cosYaw * cosPitch * cosRoll + sinYaw * sinPitch * sinRoll;
    };
    Quaternion2.RotationAlphaBetaGamma = function(alpha, beta, gamma) {
      var result = new Quaternion2();
      Quaternion2.RotationAlphaBetaGammaToRef(alpha, beta, gamma, result);
      return result;
    };
    Quaternion2.RotationAlphaBetaGammaToRef = function(alpha, beta, gamma, result) {
      var halfGammaPlusAlpha = (gamma + alpha) * 0.5;
      var halfGammaMinusAlpha = (gamma - alpha) * 0.5;
      var halfBeta = beta * 0.5;
      result.x = Math.cos(halfGammaMinusAlpha) * Math.sin(halfBeta);
      result.y = Math.sin(halfGammaMinusAlpha) * Math.sin(halfBeta);
      result.z = Math.sin(halfGammaPlusAlpha) * Math.cos(halfBeta);
      result.w = Math.cos(halfGammaPlusAlpha) * Math.cos(halfBeta);
    };
    Quaternion2.RotationQuaternionFromAxis = function(axis1, axis2, axis3) {
      var quat = new Quaternion2(0, 0, 0, 0);
      Quaternion2.RotationQuaternionFromAxisToRef(axis1, axis2, axis3, quat);
      return quat;
    };
    Quaternion2.RotationQuaternionFromAxisToRef = function(axis1, axis2, axis3, ref) {
      var rotMat = MathTmp.Matrix[0];
      Matrix.FromXYZAxesToRef(axis1.normalize(), axis2.normalize(), axis3.normalize(), rotMat);
      Quaternion2.FromRotationMatrixToRef(rotMat, ref);
    };
    Quaternion2.Slerp = function(left, right, amount) {
      var result = Quaternion2.Identity();
      Quaternion2.SlerpToRef(left, right, amount, result);
      return result;
    };
    Quaternion2.SlerpToRef = function(left, right, amount, result) {
      var num2;
      var num3;
      var num4 = left._x * right._x + left._y * right._y + left._z * right._z + left._w * right._w;
      var flag = false;
      if (num4 < 0) {
        flag = true;
        num4 = -num4;
      }
      if (num4 > 0.999999) {
        num3 = 1 - amount;
        num2 = flag ? -amount : amount;
      } else {
        var num5 = Math.acos(num4);
        var num6 = 1 / Math.sin(num5);
        num3 = Math.sin((1 - amount) * num5) * num6;
        num2 = flag ? -Math.sin(amount * num5) * num6 : Math.sin(amount * num5) * num6;
      }
      result.x = num3 * left._x + num2 * right._x;
      result.y = num3 * left._y + num2 * right._y;
      result.z = num3 * left._z + num2 * right._z;
      result.w = num3 * left._w + num2 * right._w;
    };
    Quaternion2.Hermite = function(value1, tangent1, value2, tangent2, amount) {
      var squared = amount * amount;
      var cubed = amount * squared;
      var part1 = 2 * cubed - 3 * squared + 1;
      var part2 = -2 * cubed + 3 * squared;
      var part3 = cubed - 2 * squared + amount;
      var part4 = cubed - squared;
      var x = value1._x * part1 + value2._x * part2 + tangent1._x * part3 + tangent2._x * part4;
      var y = value1._y * part1 + value2._y * part2 + tangent1._y * part3 + tangent2._y * part4;
      var z = value1._z * part1 + value2._z * part2 + tangent1._z * part3 + tangent2._z * part4;
      var w = value1._w * part1 + value2._w * part2 + tangent1._w * part3 + tangent2._w * part4;
      return new Quaternion2(x, y, z, w);
    };
    return Quaternion2;
  }();
  var Matrix = function() {
    function Matrix2() {
      this._isIdentity = false;
      this._isIdentityDirty = true;
      this._isIdentity3x2 = true;
      this._isIdentity3x2Dirty = true;
      this.updateFlag = -1;
      if (PerformanceConfigurator.MatrixTrackPrecisionChange) {
        PerformanceConfigurator.MatrixTrackedMatrices.push(this);
      }
      this._m = new PerformanceConfigurator.MatrixCurrentType(16);
      this._updateIdentityStatus(false);
    }
    Object.defineProperty(Matrix2, "Use64Bits", {
      get: function() {
        return PerformanceConfigurator.MatrixUse64Bits;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Matrix2.prototype, "m", {
      get: function() {
        return this._m;
      },
      enumerable: false,
      configurable: true
    });
    Matrix2.prototype._markAsUpdated = function() {
      this.updateFlag = Matrix2._updateFlagSeed++;
      this._isIdentity = false;
      this._isIdentity3x2 = false;
      this._isIdentityDirty = true;
      this._isIdentity3x2Dirty = true;
    };
    Matrix2.prototype._updateIdentityStatus = function(isIdentity, isIdentityDirty, isIdentity3x2, isIdentity3x2Dirty) {
      if (isIdentityDirty === void 0) {
        isIdentityDirty = false;
      }
      if (isIdentity3x2 === void 0) {
        isIdentity3x2 = false;
      }
      if (isIdentity3x2Dirty === void 0) {
        isIdentity3x2Dirty = true;
      }
      this.updateFlag = Matrix2._updateFlagSeed++;
      this._isIdentity = isIdentity;
      this._isIdentity3x2 = isIdentity || isIdentity3x2;
      this._isIdentityDirty = this._isIdentity ? false : isIdentityDirty;
      this._isIdentity3x2Dirty = this._isIdentity3x2 ? false : isIdentity3x2Dirty;
    };
    Matrix2.prototype.isIdentity = function() {
      if (this._isIdentityDirty) {
        this._isIdentityDirty = false;
        var m = this._m;
        this._isIdentity = m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 0 && m[4] === 0 && m[5] === 1 && m[6] === 0 && m[7] === 0 && m[8] === 0 && m[9] === 0 && m[10] === 1 && m[11] === 0 && m[12] === 0 && m[13] === 0 && m[14] === 0 && m[15] === 1;
      }
      return this._isIdentity;
    };
    Matrix2.prototype.isIdentityAs3x2 = function() {
      if (this._isIdentity3x2Dirty) {
        this._isIdentity3x2Dirty = false;
        if (this._m[0] !== 1 || this._m[5] !== 1 || this._m[15] !== 1) {
          this._isIdentity3x2 = false;
        } else if (this._m[1] !== 0 || this._m[2] !== 0 || this._m[3] !== 0 || this._m[4] !== 0 || this._m[6] !== 0 || this._m[7] !== 0 || this._m[8] !== 0 || this._m[9] !== 0 || this._m[10] !== 0 || this._m[11] !== 0 || this._m[12] !== 0 || this._m[13] !== 0 || this._m[14] !== 0) {
          this._isIdentity3x2 = false;
        } else {
          this._isIdentity3x2 = true;
        }
      }
      return this._isIdentity3x2;
    };
    Matrix2.prototype.determinant = function() {
      if (this._isIdentity === true) {
        return 1;
      }
      var m = this._m;
      var m00 = m[0], m01 = m[1], m02 = m[2], m03 = m[3];
      var m10 = m[4], m11 = m[5], m12 = m[6], m13 = m[7];
      var m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11];
      var m30 = m[12], m31 = m[13], m32 = m[14], m33 = m[15];
      var det_22_33 = m22 * m33 - m32 * m23;
      var det_21_33 = m21 * m33 - m31 * m23;
      var det_21_32 = m21 * m32 - m31 * m22;
      var det_20_33 = m20 * m33 - m30 * m23;
      var det_20_32 = m20 * m32 - m22 * m30;
      var det_20_31 = m20 * m31 - m30 * m21;
      var cofact_00 = +(m11 * det_22_33 - m12 * det_21_33 + m13 * det_21_32);
      var cofact_01 = -(m10 * det_22_33 - m12 * det_20_33 + m13 * det_20_32);
      var cofact_02 = +(m10 * det_21_33 - m11 * det_20_33 + m13 * det_20_31);
      var cofact_03 = -(m10 * det_21_32 - m11 * det_20_32 + m12 * det_20_31);
      return m00 * cofact_00 + m01 * cofact_01 + m02 * cofact_02 + m03 * cofact_03;
    };
    Matrix2.prototype.toArray = function() {
      return this._m;
    };
    Matrix2.prototype.asArray = function() {
      return this._m;
    };
    Matrix2.prototype.invert = function() {
      this.invertToRef(this);
      return this;
    };
    Matrix2.prototype.reset = function() {
      Matrix2.FromValuesToRef(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this);
      this._updateIdentityStatus(false);
      return this;
    };
    Matrix2.prototype.add = function(other) {
      var result = new Matrix2();
      this.addToRef(other, result);
      return result;
    };
    Matrix2.prototype.addToRef = function(other, result) {
      var m = this._m;
      var resultM = result._m;
      var otherM = other.m;
      for (var index = 0; index < 16; index++) {
        resultM[index] = m[index] + otherM[index];
      }
      result._markAsUpdated();
      return this;
    };
    Matrix2.prototype.addToSelf = function(other) {
      var m = this._m;
      var otherM = other.m;
      for (var index = 0; index < 16; index++) {
        m[index] += otherM[index];
      }
      this._markAsUpdated();
      return this;
    };
    Matrix2.prototype.invertToRef = function(other) {
      if (this._isIdentity === true) {
        Matrix2.IdentityToRef(other);
        return this;
      }
      var m = this._m;
      var m00 = m[0], m01 = m[1], m02 = m[2], m03 = m[3];
      var m10 = m[4], m11 = m[5], m12 = m[6], m13 = m[7];
      var m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11];
      var m30 = m[12], m31 = m[13], m32 = m[14], m33 = m[15];
      var det_22_33 = m22 * m33 - m32 * m23;
      var det_21_33 = m21 * m33 - m31 * m23;
      var det_21_32 = m21 * m32 - m31 * m22;
      var det_20_33 = m20 * m33 - m30 * m23;
      var det_20_32 = m20 * m32 - m22 * m30;
      var det_20_31 = m20 * m31 - m30 * m21;
      var cofact_00 = +(m11 * det_22_33 - m12 * det_21_33 + m13 * det_21_32);
      var cofact_01 = -(m10 * det_22_33 - m12 * det_20_33 + m13 * det_20_32);
      var cofact_02 = +(m10 * det_21_33 - m11 * det_20_33 + m13 * det_20_31);
      var cofact_03 = -(m10 * det_21_32 - m11 * det_20_32 + m12 * det_20_31);
      var det = m00 * cofact_00 + m01 * cofact_01 + m02 * cofact_02 + m03 * cofact_03;
      if (det === 0) {
        other.copyFrom(this);
        return this;
      }
      var detInv = 1 / det;
      var det_12_33 = m12 * m33 - m32 * m13;
      var det_11_33 = m11 * m33 - m31 * m13;
      var det_11_32 = m11 * m32 - m31 * m12;
      var det_10_33 = m10 * m33 - m30 * m13;
      var det_10_32 = m10 * m32 - m30 * m12;
      var det_10_31 = m10 * m31 - m30 * m11;
      var det_12_23 = m12 * m23 - m22 * m13;
      var det_11_23 = m11 * m23 - m21 * m13;
      var det_11_22 = m11 * m22 - m21 * m12;
      var det_10_23 = m10 * m23 - m20 * m13;
      var det_10_22 = m10 * m22 - m20 * m12;
      var det_10_21 = m10 * m21 - m20 * m11;
      var cofact_10 = -(m01 * det_22_33 - m02 * det_21_33 + m03 * det_21_32);
      var cofact_11 = +(m00 * det_22_33 - m02 * det_20_33 + m03 * det_20_32);
      var cofact_12 = -(m00 * det_21_33 - m01 * det_20_33 + m03 * det_20_31);
      var cofact_13 = +(m00 * det_21_32 - m01 * det_20_32 + m02 * det_20_31);
      var cofact_20 = +(m01 * det_12_33 - m02 * det_11_33 + m03 * det_11_32);
      var cofact_21 = -(m00 * det_12_33 - m02 * det_10_33 + m03 * det_10_32);
      var cofact_22 = +(m00 * det_11_33 - m01 * det_10_33 + m03 * det_10_31);
      var cofact_23 = -(m00 * det_11_32 - m01 * det_10_32 + m02 * det_10_31);
      var cofact_30 = -(m01 * det_12_23 - m02 * det_11_23 + m03 * det_11_22);
      var cofact_31 = +(m00 * det_12_23 - m02 * det_10_23 + m03 * det_10_22);
      var cofact_32 = -(m00 * det_11_23 - m01 * det_10_23 + m03 * det_10_21);
      var cofact_33 = +(m00 * det_11_22 - m01 * det_10_22 + m02 * det_10_21);
      Matrix2.FromValuesToRef(cofact_00 * detInv, cofact_10 * detInv, cofact_20 * detInv, cofact_30 * detInv, cofact_01 * detInv, cofact_11 * detInv, cofact_21 * detInv, cofact_31 * detInv, cofact_02 * detInv, cofact_12 * detInv, cofact_22 * detInv, cofact_32 * detInv, cofact_03 * detInv, cofact_13 * detInv, cofact_23 * detInv, cofact_33 * detInv, other);
      return this;
    };
    Matrix2.prototype.addAtIndex = function(index, value) {
      this._m[index] += value;
      this._markAsUpdated();
      return this;
    };
    Matrix2.prototype.multiplyAtIndex = function(index, value) {
      this._m[index] *= value;
      this._markAsUpdated();
      return this;
    };
    Matrix2.prototype.setTranslationFromFloats = function(x, y, z) {
      this._m[12] = x;
      this._m[13] = y;
      this._m[14] = z;
      this._markAsUpdated();
      return this;
    };
    Matrix2.prototype.addTranslationFromFloats = function(x, y, z) {
      this._m[12] += x;
      this._m[13] += y;
      this._m[14] += z;
      this._markAsUpdated();
      return this;
    };
    Matrix2.prototype.setTranslation = function(vector3) {
      return this.setTranslationFromFloats(vector3._x, vector3._y, vector3._z);
    };
    Matrix2.prototype.getTranslation = function() {
      return new Vector3(this._m[12], this._m[13], this._m[14]);
    };
    Matrix2.prototype.getTranslationToRef = function(result) {
      result.x = this._m[12];
      result.y = this._m[13];
      result.z = this._m[14];
      return this;
    };
    Matrix2.prototype.removeRotationAndScaling = function() {
      var m = this.m;
      Matrix2.FromValuesToRef(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, m[12], m[13], m[14], m[15], this);
      this._updateIdentityStatus(m[12] === 0 && m[13] === 0 && m[14] === 0 && m[15] === 1);
      return this;
    };
    Matrix2.prototype.multiply = function(other) {
      var result = new Matrix2();
      this.multiplyToRef(other, result);
      return result;
    };
    Matrix2.prototype.copyFrom = function(other) {
      other.copyToArray(this._m);
      var o = other;
      this._updateIdentityStatus(o._isIdentity, o._isIdentityDirty, o._isIdentity3x2, o._isIdentity3x2Dirty);
      return this;
    };
    Matrix2.prototype.copyToArray = function(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var source = this._m;
      array[offset] = source[0];
      array[offset + 1] = source[1];
      array[offset + 2] = source[2];
      array[offset + 3] = source[3];
      array[offset + 4] = source[4];
      array[offset + 5] = source[5];
      array[offset + 6] = source[6];
      array[offset + 7] = source[7];
      array[offset + 8] = source[8];
      array[offset + 9] = source[9];
      array[offset + 10] = source[10];
      array[offset + 11] = source[11];
      array[offset + 12] = source[12];
      array[offset + 13] = source[13];
      array[offset + 14] = source[14];
      array[offset + 15] = source[15];
      return this;
    };
    Matrix2.prototype.multiplyToRef = function(other, result) {
      if (this._isIdentity) {
        result.copyFrom(other);
        return this;
      }
      if (other._isIdentity) {
        result.copyFrom(this);
        return this;
      }
      this.multiplyToArray(other, result._m, 0);
      result._markAsUpdated();
      return this;
    };
    Matrix2.prototype.multiplyToArray = function(other, result, offset) {
      var m = this._m;
      var otherM = other.m;
      var tm0 = m[0], tm1 = m[1], tm2 = m[2], tm3 = m[3];
      var tm4 = m[4], tm5 = m[5], tm6 = m[6], tm7 = m[7];
      var tm8 = m[8], tm9 = m[9], tm10 = m[10], tm11 = m[11];
      var tm12 = m[12], tm13 = m[13], tm14 = m[14], tm15 = m[15];
      var om0 = otherM[0], om1 = otherM[1], om2 = otherM[2], om3 = otherM[3];
      var om4 = otherM[4], om5 = otherM[5], om6 = otherM[6], om7 = otherM[7];
      var om8 = otherM[8], om9 = otherM[9], om10 = otherM[10], om11 = otherM[11];
      var om12 = otherM[12], om13 = otherM[13], om14 = otherM[14], om15 = otherM[15];
      result[offset] = tm0 * om0 + tm1 * om4 + tm2 * om8 + tm3 * om12;
      result[offset + 1] = tm0 * om1 + tm1 * om5 + tm2 * om9 + tm3 * om13;
      result[offset + 2] = tm0 * om2 + tm1 * om6 + tm2 * om10 + tm3 * om14;
      result[offset + 3] = tm0 * om3 + tm1 * om7 + tm2 * om11 + tm3 * om15;
      result[offset + 4] = tm4 * om0 + tm5 * om4 + tm6 * om8 + tm7 * om12;
      result[offset + 5] = tm4 * om1 + tm5 * om5 + tm6 * om9 + tm7 * om13;
      result[offset + 6] = tm4 * om2 + tm5 * om6 + tm6 * om10 + tm7 * om14;
      result[offset + 7] = tm4 * om3 + tm5 * om7 + tm6 * om11 + tm7 * om15;
      result[offset + 8] = tm8 * om0 + tm9 * om4 + tm10 * om8 + tm11 * om12;
      result[offset + 9] = tm8 * om1 + tm9 * om5 + tm10 * om9 + tm11 * om13;
      result[offset + 10] = tm8 * om2 + tm9 * om6 + tm10 * om10 + tm11 * om14;
      result[offset + 11] = tm8 * om3 + tm9 * om7 + tm10 * om11 + tm11 * om15;
      result[offset + 12] = tm12 * om0 + tm13 * om4 + tm14 * om8 + tm15 * om12;
      result[offset + 13] = tm12 * om1 + tm13 * om5 + tm14 * om9 + tm15 * om13;
      result[offset + 14] = tm12 * om2 + tm13 * om6 + tm14 * om10 + tm15 * om14;
      result[offset + 15] = tm12 * om3 + tm13 * om7 + tm14 * om11 + tm15 * om15;
      return this;
    };
    Matrix2.prototype.equals = function(value) {
      var other = value;
      if (!other) {
        return false;
      }
      if (this._isIdentity || other._isIdentity) {
        if (!this._isIdentityDirty && !other._isIdentityDirty) {
          return this._isIdentity && other._isIdentity;
        }
      }
      var m = this.m;
      var om = other.m;
      return m[0] === om[0] && m[1] === om[1] && m[2] === om[2] && m[3] === om[3] && m[4] === om[4] && m[5] === om[5] && m[6] === om[6] && m[7] === om[7] && m[8] === om[8] && m[9] === om[9] && m[10] === om[10] && m[11] === om[11] && m[12] === om[12] && m[13] === om[13] && m[14] === om[14] && m[15] === om[15];
    };
    Matrix2.prototype.clone = function() {
      var matrix = new Matrix2();
      matrix.copyFrom(this);
      return matrix;
    };
    Matrix2.prototype.getClassName = function() {
      return "Matrix";
    };
    Matrix2.prototype.getHashCode = function() {
      var hash = this._m[0] | 0;
      for (var i = 1; i < 16; i++) {
        hash = hash * 397 ^ (this._m[i] | 0);
      }
      return hash;
    };
    Matrix2.prototype.decompose = function(scale, rotation, translation) {
      if (this._isIdentity) {
        if (translation) {
          translation.setAll(0);
        }
        if (scale) {
          scale.setAll(1);
        }
        if (rotation) {
          rotation.copyFromFloats(0, 0, 0, 1);
        }
        return true;
      }
      var m = this._m;
      if (translation) {
        translation.copyFromFloats(m[12], m[13], m[14]);
      }
      scale = scale || MathTmp.Vector3[0];
      scale.x = Math.sqrt(m[0] * m[0] + m[1] * m[1] + m[2] * m[2]);
      scale.y = Math.sqrt(m[4] * m[4] + m[5] * m[5] + m[6] * m[6]);
      scale.z = Math.sqrt(m[8] * m[8] + m[9] * m[9] + m[10] * m[10]);
      if (this.determinant() <= 0) {
        scale.y *= -1;
      }
      if (scale._x === 0 || scale._y === 0 || scale._z === 0) {
        if (rotation) {
          rotation.copyFromFloats(0, 0, 0, 1);
        }
        return false;
      }
      if (rotation) {
        var sx = 1 / scale._x, sy = 1 / scale._y, sz = 1 / scale._z;
        Matrix2.FromValuesToRef(m[0] * sx, m[1] * sx, m[2] * sx, 0, m[4] * sy, m[5] * sy, m[6] * sy, 0, m[8] * sz, m[9] * sz, m[10] * sz, 0, 0, 0, 0, 1, MathTmp.Matrix[0]);
        Quaternion.FromRotationMatrixToRef(MathTmp.Matrix[0], rotation);
      }
      return true;
    };
    Matrix2.prototype.getRow = function(index) {
      if (index < 0 || index > 3) {
        return null;
      }
      var i = index * 4;
      return new Vector4(this._m[i + 0], this._m[i + 1], this._m[i + 2], this._m[i + 3]);
    };
    Matrix2.prototype.setRow = function(index, row) {
      return this.setRowFromFloats(index, row.x, row.y, row.z, row.w);
    };
    Matrix2.prototype.transpose = function() {
      return Matrix2.Transpose(this);
    };
    Matrix2.prototype.transposeToRef = function(result) {
      Matrix2.TransposeToRef(this, result);
      return this;
    };
    Matrix2.prototype.setRowFromFloats = function(index, x, y, z, w) {
      if (index < 0 || index > 3) {
        return this;
      }
      var i = index * 4;
      this._m[i + 0] = x;
      this._m[i + 1] = y;
      this._m[i + 2] = z;
      this._m[i + 3] = w;
      this._markAsUpdated();
      return this;
    };
    Matrix2.prototype.scale = function(scale) {
      var result = new Matrix2();
      this.scaleToRef(scale, result);
      return result;
    };
    Matrix2.prototype.scaleToRef = function(scale, result) {
      for (var index = 0; index < 16; index++) {
        result._m[index] = this._m[index] * scale;
      }
      result._markAsUpdated();
      return this;
    };
    Matrix2.prototype.scaleAndAddToRef = function(scale, result) {
      for (var index = 0; index < 16; index++) {
        result._m[index] += this._m[index] * scale;
      }
      result._markAsUpdated();
      return this;
    };
    Matrix2.prototype.toNormalMatrix = function(ref) {
      var tmp = MathTmp.Matrix[0];
      this.invertToRef(tmp);
      tmp.transposeToRef(ref);
      var m = ref._m;
      Matrix2.FromValuesToRef(m[0], m[1], m[2], 0, m[4], m[5], m[6], 0, m[8], m[9], m[10], 0, 0, 0, 0, 1, ref);
    };
    Matrix2.prototype.getRotationMatrix = function() {
      var result = new Matrix2();
      this.getRotationMatrixToRef(result);
      return result;
    };
    Matrix2.prototype.getRotationMatrixToRef = function(result) {
      var scale = MathTmp.Vector3[0];
      if (!this.decompose(scale)) {
        Matrix2.IdentityToRef(result);
        return this;
      }
      var m = this._m;
      var sx = 1 / scale._x, sy = 1 / scale._y, sz = 1 / scale._z;
      Matrix2.FromValuesToRef(m[0] * sx, m[1] * sx, m[2] * sx, 0, m[4] * sy, m[5] * sy, m[6] * sy, 0, m[8] * sz, m[9] * sz, m[10] * sz, 0, 0, 0, 0, 1, result);
      return this;
    };
    Matrix2.prototype.toggleModelMatrixHandInPlace = function() {
      var m = this._m;
      m[2] *= -1;
      m[6] *= -1;
      m[8] *= -1;
      m[9] *= -1;
      m[14] *= -1;
      this._markAsUpdated();
    };
    Matrix2.prototype.toggleProjectionMatrixHandInPlace = function() {
      var m = this._m;
      m[8] *= -1;
      m[9] *= -1;
      m[10] *= -1;
      m[11] *= -1;
      this._markAsUpdated();
    };
    Matrix2.FromArray = function(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var result = new Matrix2();
      Matrix2.FromArrayToRef(array, offset, result);
      return result;
    };
    Matrix2.FromArrayToRef = function(array, offset, result) {
      for (var index = 0; index < 16; index++) {
        result._m[index] = array[index + offset];
      }
      result._markAsUpdated();
    };
    Matrix2.FromFloat32ArrayToRefScaled = function(array, offset, scale, result) {
      for (var index = 0; index < 16; index++) {
        result._m[index] = array[index + offset] * scale;
      }
      result._markAsUpdated();
    };
    Object.defineProperty(Matrix2, "IdentityReadOnly", {
      get: function() {
        return Matrix2._identityReadOnly;
      },
      enumerable: false,
      configurable: true
    });
    Matrix2.FromValuesToRef = function(initialM11, initialM12, initialM13, initialM14, initialM21, initialM22, initialM23, initialM24, initialM31, initialM32, initialM33, initialM34, initialM41, initialM42, initialM43, initialM44, result) {
      var m = result._m;
      m[0] = initialM11;
      m[1] = initialM12;
      m[2] = initialM13;
      m[3] = initialM14;
      m[4] = initialM21;
      m[5] = initialM22;
      m[6] = initialM23;
      m[7] = initialM24;
      m[8] = initialM31;
      m[9] = initialM32;
      m[10] = initialM33;
      m[11] = initialM34;
      m[12] = initialM41;
      m[13] = initialM42;
      m[14] = initialM43;
      m[15] = initialM44;
      result._markAsUpdated();
    };
    Matrix2.FromValues = function(initialM11, initialM12, initialM13, initialM14, initialM21, initialM22, initialM23, initialM24, initialM31, initialM32, initialM33, initialM34, initialM41, initialM42, initialM43, initialM44) {
      var result = new Matrix2();
      var m = result._m;
      m[0] = initialM11;
      m[1] = initialM12;
      m[2] = initialM13;
      m[3] = initialM14;
      m[4] = initialM21;
      m[5] = initialM22;
      m[6] = initialM23;
      m[7] = initialM24;
      m[8] = initialM31;
      m[9] = initialM32;
      m[10] = initialM33;
      m[11] = initialM34;
      m[12] = initialM41;
      m[13] = initialM42;
      m[14] = initialM43;
      m[15] = initialM44;
      result._markAsUpdated();
      return result;
    };
    Matrix2.Compose = function(scale, rotation, translation) {
      var result = new Matrix2();
      Matrix2.ComposeToRef(scale, rotation, translation, result);
      return result;
    };
    Matrix2.ComposeToRef = function(scale, rotation, translation, result) {
      var m = result._m;
      var x = rotation._x, y = rotation._y, z = rotation._z, w = rotation._w;
      var x2 = x + x, y2 = y + y, z2 = z + z;
      var xx = x * x2, xy = x * y2, xz = x * z2;
      var yy = y * y2, yz = y * z2, zz = z * z2;
      var wx = w * x2, wy = w * y2, wz = w * z2;
      var sx = scale._x, sy = scale._y, sz = scale._z;
      m[0] = (1 - (yy + zz)) * sx;
      m[1] = (xy + wz) * sx;
      m[2] = (xz - wy) * sx;
      m[3] = 0;
      m[4] = (xy - wz) * sy;
      m[5] = (1 - (xx + zz)) * sy;
      m[6] = (yz + wx) * sy;
      m[7] = 0;
      m[8] = (xz + wy) * sz;
      m[9] = (yz - wx) * sz;
      m[10] = (1 - (xx + yy)) * sz;
      m[11] = 0;
      m[12] = translation._x;
      m[13] = translation._y;
      m[14] = translation._z;
      m[15] = 1;
      result._markAsUpdated();
    };
    Matrix2.Identity = function() {
      var identity = Matrix2.FromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      identity._updateIdentityStatus(true);
      return identity;
    };
    Matrix2.IdentityToRef = function(result) {
      Matrix2.FromValuesToRef(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, result);
      result._updateIdentityStatus(true);
    };
    Matrix2.Zero = function() {
      var zero = Matrix2.FromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      zero._updateIdentityStatus(false);
      return zero;
    };
    Matrix2.RotationX = function(angle) {
      var result = new Matrix2();
      Matrix2.RotationXToRef(angle, result);
      return result;
    };
    Matrix2.Invert = function(source) {
      var result = new Matrix2();
      source.invertToRef(result);
      return result;
    };
    Matrix2.RotationXToRef = function(angle, result) {
      var s = Math.sin(angle);
      var c = Math.cos(angle);
      Matrix2.FromValuesToRef(1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, result);
      result._updateIdentityStatus(c === 1 && s === 0);
    };
    Matrix2.RotationY = function(angle) {
      var result = new Matrix2();
      Matrix2.RotationYToRef(angle, result);
      return result;
    };
    Matrix2.RotationYToRef = function(angle, result) {
      var s = Math.sin(angle);
      var c = Math.cos(angle);
      Matrix2.FromValuesToRef(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1, result);
      result._updateIdentityStatus(c === 1 && s === 0);
    };
    Matrix2.RotationZ = function(angle) {
      var result = new Matrix2();
      Matrix2.RotationZToRef(angle, result);
      return result;
    };
    Matrix2.RotationZToRef = function(angle, result) {
      var s = Math.sin(angle);
      var c = Math.cos(angle);
      Matrix2.FromValuesToRef(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, result);
      result._updateIdentityStatus(c === 1 && s === 0);
    };
    Matrix2.RotationAxis = function(axis, angle) {
      var result = new Matrix2();
      Matrix2.RotationAxisToRef(axis, angle, result);
      return result;
    };
    Matrix2.RotationAxisToRef = function(axis, angle, result) {
      var s = Math.sin(-angle);
      var c = Math.cos(-angle);
      var c1 = 1 - c;
      axis.normalize();
      var m = result._m;
      m[0] = axis._x * axis._x * c1 + c;
      m[1] = axis._x * axis._y * c1 - axis._z * s;
      m[2] = axis._x * axis._z * c1 + axis._y * s;
      m[3] = 0;
      m[4] = axis._y * axis._x * c1 + axis._z * s;
      m[5] = axis._y * axis._y * c1 + c;
      m[6] = axis._y * axis._z * c1 - axis._x * s;
      m[7] = 0;
      m[8] = axis._z * axis._x * c1 - axis._y * s;
      m[9] = axis._z * axis._y * c1 + axis._x * s;
      m[10] = axis._z * axis._z * c1 + c;
      m[11] = 0;
      m[12] = 0;
      m[13] = 0;
      m[14] = 0;
      m[15] = 1;
      result._markAsUpdated();
    };
    Matrix2.RotationAlignToRef = function(from, to, result) {
      var v = Vector3.Cross(to, from);
      var c = Vector3.Dot(to, from);
      var k = 1 / (1 + c);
      var m = result._m;
      m[0] = v._x * v._x * k + c;
      m[1] = v._y * v._x * k - v._z;
      m[2] = v._z * v._x * k + v._y;
      m[3] = 0;
      m[4] = v._x * v._y * k + v._z;
      m[5] = v._y * v._y * k + c;
      m[6] = v._z * v._y * k - v._x;
      m[7] = 0;
      m[8] = v._x * v._z * k - v._y;
      m[9] = v._y * v._z * k + v._x;
      m[10] = v._z * v._z * k + c;
      m[11] = 0;
      m[12] = 0;
      m[13] = 0;
      m[14] = 0;
      m[15] = 1;
      result._markAsUpdated();
    };
    Matrix2.RotationYawPitchRoll = function(yaw, pitch, roll) {
      var result = new Matrix2();
      Matrix2.RotationYawPitchRollToRef(yaw, pitch, roll, result);
      return result;
    };
    Matrix2.RotationYawPitchRollToRef = function(yaw, pitch, roll, result) {
      Quaternion.RotationYawPitchRollToRef(yaw, pitch, roll, MathTmp.Quaternion[0]);
      MathTmp.Quaternion[0].toRotationMatrix(result);
    };
    Matrix2.Scaling = function(x, y, z) {
      var result = new Matrix2();
      Matrix2.ScalingToRef(x, y, z, result);
      return result;
    };
    Matrix2.ScalingToRef = function(x, y, z, result) {
      Matrix2.FromValuesToRef(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1, result);
      result._updateIdentityStatus(x === 1 && y === 1 && z === 1);
    };
    Matrix2.Translation = function(x, y, z) {
      var result = new Matrix2();
      Matrix2.TranslationToRef(x, y, z, result);
      return result;
    };
    Matrix2.TranslationToRef = function(x, y, z, result) {
      Matrix2.FromValuesToRef(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1, result);
      result._updateIdentityStatus(x === 0 && y === 0 && z === 0);
    };
    Matrix2.Lerp = function(startValue, endValue, gradient) {
      var result = new Matrix2();
      Matrix2.LerpToRef(startValue, endValue, gradient, result);
      return result;
    };
    Matrix2.LerpToRef = function(startValue, endValue, gradient, result) {
      var resultM = result._m;
      var startM = startValue.m;
      var endM = endValue.m;
      for (var index = 0; index < 16; index++) {
        resultM[index] = startM[index] * (1 - gradient) + endM[index] * gradient;
      }
      result._markAsUpdated();
    };
    Matrix2.DecomposeLerp = function(startValue, endValue, gradient) {
      var result = new Matrix2();
      Matrix2.DecomposeLerpToRef(startValue, endValue, gradient, result);
      return result;
    };
    Matrix2.DecomposeLerpToRef = function(startValue, endValue, gradient, result) {
      var startScale = MathTmp.Vector3[0];
      var startRotation = MathTmp.Quaternion[0];
      var startTranslation = MathTmp.Vector3[1];
      startValue.decompose(startScale, startRotation, startTranslation);
      var endScale = MathTmp.Vector3[2];
      var endRotation = MathTmp.Quaternion[1];
      var endTranslation = MathTmp.Vector3[3];
      endValue.decompose(endScale, endRotation, endTranslation);
      var resultScale = MathTmp.Vector3[4];
      Vector3.LerpToRef(startScale, endScale, gradient, resultScale);
      var resultRotation = MathTmp.Quaternion[2];
      Quaternion.SlerpToRef(startRotation, endRotation, gradient, resultRotation);
      var resultTranslation = MathTmp.Vector3[5];
      Vector3.LerpToRef(startTranslation, endTranslation, gradient, resultTranslation);
      Matrix2.ComposeToRef(resultScale, resultRotation, resultTranslation, result);
    };
    Matrix2.LookAtLH = function(eye, target, up) {
      var result = new Matrix2();
      Matrix2.LookAtLHToRef(eye, target, up, result);
      return result;
    };
    Matrix2.LookAtLHToRef = function(eye, target, up, result) {
      var xAxis = MathTmp.Vector3[0];
      var yAxis = MathTmp.Vector3[1];
      var zAxis = MathTmp.Vector3[2];
      target.subtractToRef(eye, zAxis);
      zAxis.normalize();
      Vector3.CrossToRef(up, zAxis, xAxis);
      var xSquareLength = xAxis.lengthSquared();
      if (xSquareLength === 0) {
        xAxis.x = 1;
      } else {
        xAxis.normalizeFromLength(Math.sqrt(xSquareLength));
      }
      Vector3.CrossToRef(zAxis, xAxis, yAxis);
      yAxis.normalize();
      var ex = -Vector3.Dot(xAxis, eye);
      var ey = -Vector3.Dot(yAxis, eye);
      var ez = -Vector3.Dot(zAxis, eye);
      Matrix2.FromValuesToRef(xAxis._x, yAxis._x, zAxis._x, 0, xAxis._y, yAxis._y, zAxis._y, 0, xAxis._z, yAxis._z, zAxis._z, 0, ex, ey, ez, 1, result);
    };
    Matrix2.LookAtRH = function(eye, target, up) {
      var result = new Matrix2();
      Matrix2.LookAtRHToRef(eye, target, up, result);
      return result;
    };
    Matrix2.LookAtRHToRef = function(eye, target, up, result) {
      var xAxis = MathTmp.Vector3[0];
      var yAxis = MathTmp.Vector3[1];
      var zAxis = MathTmp.Vector3[2];
      eye.subtractToRef(target, zAxis);
      zAxis.normalize();
      Vector3.CrossToRef(up, zAxis, xAxis);
      var xSquareLength = xAxis.lengthSquared();
      if (xSquareLength === 0) {
        xAxis.x = 1;
      } else {
        xAxis.normalizeFromLength(Math.sqrt(xSquareLength));
      }
      Vector3.CrossToRef(zAxis, xAxis, yAxis);
      yAxis.normalize();
      var ex = -Vector3.Dot(xAxis, eye);
      var ey = -Vector3.Dot(yAxis, eye);
      var ez = -Vector3.Dot(zAxis, eye);
      Matrix2.FromValuesToRef(xAxis._x, yAxis._x, zAxis._x, 0, xAxis._y, yAxis._y, zAxis._y, 0, xAxis._z, yAxis._z, zAxis._z, 0, ex, ey, ez, 1, result);
    };
    Matrix2.OrthoLH = function(width, height, znear, zfar) {
      var matrix = new Matrix2();
      Matrix2.OrthoLHToRef(width, height, znear, zfar, matrix);
      return matrix;
    };
    Matrix2.OrthoLHToRef = function(width, height, znear, zfar, result) {
      var n = znear;
      var f = zfar;
      var a = 2 / width;
      var b = 2 / height;
      var c = 2 / (f - n);
      var d = -(f + n) / (f - n);
      Matrix2.FromValuesToRef(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, d, 1, result);
      result._updateIdentityStatus(a === 1 && b === 1 && c === 1 && d === 0);
    };
    Matrix2.OrthoOffCenterLH = function(left, right, bottom, top, znear, zfar) {
      var matrix = new Matrix2();
      Matrix2.OrthoOffCenterLHToRef(left, right, bottom, top, znear, zfar, matrix);
      return matrix;
    };
    Matrix2.OrthoOffCenterLHToRef = function(left, right, bottom, top, znear, zfar, result) {
      var n = znear;
      var f = zfar;
      var a = 2 / (right - left);
      var b = 2 / (top - bottom);
      var c = 2 / (f - n);
      var d = -(f + n) / (f - n);
      var i0 = (left + right) / (left - right);
      var i1 = (top + bottom) / (bottom - top);
      Matrix2.FromValuesToRef(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, i0, i1, d, 1, result);
      result._markAsUpdated();
    };
    Matrix2.OrthoOffCenterRH = function(left, right, bottom, top, znear, zfar) {
      var matrix = new Matrix2();
      Matrix2.OrthoOffCenterRHToRef(left, right, bottom, top, znear, zfar, matrix);
      return matrix;
    };
    Matrix2.OrthoOffCenterRHToRef = function(left, right, bottom, top, znear, zfar, result) {
      Matrix2.OrthoOffCenterLHToRef(left, right, bottom, top, znear, zfar, result);
      result._m[10] *= -1;
    };
    Matrix2.PerspectiveLH = function(width, height, znear, zfar) {
      var matrix = new Matrix2();
      var n = znear;
      var f = zfar;
      var a = 2 * n / width;
      var b = 2 * n / height;
      var c = (f + n) / (f - n);
      var d = -2 * f * n / (f - n);
      Matrix2.FromValuesToRef(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 1, 0, 0, d, 0, matrix);
      matrix._updateIdentityStatus(false);
      return matrix;
    };
    Matrix2.PerspectiveFovLH = function(fov, aspect, znear, zfar) {
      var matrix = new Matrix2();
      Matrix2.PerspectiveFovLHToRef(fov, aspect, znear, zfar, matrix);
      return matrix;
    };
    Matrix2.PerspectiveFovLHToRef = function(fov, aspect, znear, zfar, result, isVerticalFovFixed) {
      if (isVerticalFovFixed === void 0) {
        isVerticalFovFixed = true;
      }
      var n = znear;
      var f = zfar;
      var t = 1 / Math.tan(fov * 0.5);
      var a = isVerticalFovFixed ? t / aspect : t;
      var b = isVerticalFovFixed ? t : t * aspect;
      var c = (f + n) / (f - n);
      var d = -2 * f * n / (f - n);
      Matrix2.FromValuesToRef(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 1, 0, 0, d, 0, result);
      result._updateIdentityStatus(false);
    };
    Matrix2.PerspectiveFovReverseLHToRef = function(fov, aspect, znear, zfar, result, isVerticalFovFixed) {
      if (isVerticalFovFixed === void 0) {
        isVerticalFovFixed = true;
      }
      var t = 1 / Math.tan(fov * 0.5);
      var a = isVerticalFovFixed ? t / aspect : t;
      var b = isVerticalFovFixed ? t : t * aspect;
      Matrix2.FromValuesToRef(a, 0, 0, 0, 0, b, 0, 0, 0, 0, -znear, 1, 0, 0, 1, 0, result);
      result._updateIdentityStatus(false);
    };
    Matrix2.PerspectiveFovRH = function(fov, aspect, znear, zfar) {
      var matrix = new Matrix2();
      Matrix2.PerspectiveFovRHToRef(fov, aspect, znear, zfar, matrix);
      return matrix;
    };
    Matrix2.PerspectiveFovRHToRef = function(fov, aspect, znear, zfar, result, isVerticalFovFixed) {
      if (isVerticalFovFixed === void 0) {
        isVerticalFovFixed = true;
      }
      var n = znear;
      var f = zfar;
      var t = 1 / Math.tan(fov * 0.5);
      var a = isVerticalFovFixed ? t / aspect : t;
      var b = isVerticalFovFixed ? t : t * aspect;
      var c = -(f + n) / (f - n);
      var d = -2 * f * n / (f - n);
      Matrix2.FromValuesToRef(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, -1, 0, 0, d, 0, result);
      result._updateIdentityStatus(false);
    };
    Matrix2.PerspectiveFovReverseRHToRef = function(fov, aspect, znear, zfar, result, isVerticalFovFixed) {
      if (isVerticalFovFixed === void 0) {
        isVerticalFovFixed = true;
      }
      var t = 1 / Math.tan(fov * 0.5);
      var a = isVerticalFovFixed ? t / aspect : t;
      var b = isVerticalFovFixed ? t : t * aspect;
      Matrix2.FromValuesToRef(a, 0, 0, 0, 0, b, 0, 0, 0, 0, -znear, -1, 0, 0, -1, 0, result);
      result._updateIdentityStatus(false);
    };
    Matrix2.PerspectiveFovWebVRToRef = function(fov, znear, zfar, result, rightHanded) {
      if (rightHanded === void 0) {
        rightHanded = false;
      }
      var rightHandedFactor = rightHanded ? -1 : 1;
      var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
      var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
      var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
      var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
      var xScale = 2 / (leftTan + rightTan);
      var yScale = 2 / (upTan + downTan);
      var m = result._m;
      m[0] = xScale;
      m[1] = m[2] = m[3] = m[4] = 0;
      m[5] = yScale;
      m[6] = m[7] = 0;
      m[8] = (leftTan - rightTan) * xScale * 0.5;
      m[9] = -((upTan - downTan) * yScale * 0.5);
      m[10] = -zfar / (znear - zfar);
      m[11] = 1 * rightHandedFactor;
      m[12] = m[13] = m[15] = 0;
      m[14] = -(2 * zfar * znear) / (zfar - znear);
      result._markAsUpdated();
    };
    Matrix2.GetFinalMatrix = function(viewport, world, view, projection, zmin, zmax) {
      var cw = viewport.width;
      var ch = viewport.height;
      var cx = viewport.x;
      var cy = viewport.y;
      var viewportMatrix = Matrix2.FromValues(cw / 2, 0, 0, 0, 0, -ch / 2, 0, 0, 0, 0, zmax - zmin, 0, cx + cw / 2, ch / 2 + cy, zmin, 1);
      var matrix = MathTmp.Matrix[0];
      world.multiplyToRef(view, matrix);
      matrix.multiplyToRef(projection, matrix);
      return matrix.multiply(viewportMatrix);
    };
    Matrix2.GetAsMatrix2x2 = function(matrix) {
      var m = matrix.m;
      var arr = [m[0], m[1], m[4], m[5]];
      return PerformanceConfigurator.MatrixUse64Bits ? arr : new Float32Array(arr);
    };
    Matrix2.GetAsMatrix3x3 = function(matrix) {
      var m = matrix.m;
      var arr = [
        m[0],
        m[1],
        m[2],
        m[4],
        m[5],
        m[6],
        m[8],
        m[9],
        m[10]
      ];
      return PerformanceConfigurator.MatrixUse64Bits ? arr : new Float32Array(arr);
    };
    Matrix2.Transpose = function(matrix) {
      var result = new Matrix2();
      Matrix2.TransposeToRef(matrix, result);
      return result;
    };
    Matrix2.TransposeToRef = function(matrix, result) {
      var rm = result._m;
      var mm = matrix.m;
      rm[0] = mm[0];
      rm[1] = mm[4];
      rm[2] = mm[8];
      rm[3] = mm[12];
      rm[4] = mm[1];
      rm[5] = mm[5];
      rm[6] = mm[9];
      rm[7] = mm[13];
      rm[8] = mm[2];
      rm[9] = mm[6];
      rm[10] = mm[10];
      rm[11] = mm[14];
      rm[12] = mm[3];
      rm[13] = mm[7];
      rm[14] = mm[11];
      rm[15] = mm[15];
      result._updateIdentityStatus(matrix._isIdentity, matrix._isIdentityDirty);
    };
    Matrix2.Reflection = function(plane) {
      var matrix = new Matrix2();
      Matrix2.ReflectionToRef(plane, matrix);
      return matrix;
    };
    Matrix2.ReflectionToRef = function(plane, result) {
      plane.normalize();
      var x = plane.normal.x;
      var y = plane.normal.y;
      var z = plane.normal.z;
      var temp = -2 * x;
      var temp2 = -2 * y;
      var temp3 = -2 * z;
      Matrix2.FromValuesToRef(temp * x + 1, temp2 * x, temp3 * x, 0, temp * y, temp2 * y + 1, temp3 * y, 0, temp * z, temp2 * z, temp3 * z + 1, 0, temp * plane.d, temp2 * plane.d, temp3 * plane.d, 1, result);
    };
    Matrix2.FromXYZAxesToRef = function(xaxis, yaxis, zaxis, result) {
      Matrix2.FromValuesToRef(xaxis._x, xaxis._y, xaxis._z, 0, yaxis._x, yaxis._y, yaxis._z, 0, zaxis._x, zaxis._y, zaxis._z, 0, 0, 0, 0, 1, result);
    };
    Matrix2.FromQuaternionToRef = function(quat, result) {
      var xx = quat._x * quat._x;
      var yy = quat._y * quat._y;
      var zz = quat._z * quat._z;
      var xy = quat._x * quat._y;
      var zw = quat._z * quat._w;
      var zx = quat._z * quat._x;
      var yw = quat._y * quat._w;
      var yz = quat._y * quat._z;
      var xw = quat._x * quat._w;
      result._m[0] = 1 - 2 * (yy + zz);
      result._m[1] = 2 * (xy + zw);
      result._m[2] = 2 * (zx - yw);
      result._m[3] = 0;
      result._m[4] = 2 * (xy - zw);
      result._m[5] = 1 - 2 * (zz + xx);
      result._m[6] = 2 * (yz + xw);
      result._m[7] = 0;
      result._m[8] = 2 * (zx + yw);
      result._m[9] = 2 * (yz - xw);
      result._m[10] = 1 - 2 * (yy + xx);
      result._m[11] = 0;
      result._m[12] = 0;
      result._m[13] = 0;
      result._m[14] = 0;
      result._m[15] = 1;
      result._markAsUpdated();
    };
    Matrix2._updateFlagSeed = 0;
    Matrix2._identityReadOnly = Matrix2.Identity();
    return Matrix2;
  }();
  var MathTmp = function() {
    function MathTmp2() {
    }
    MathTmp2.Vector3 = ArrayTools.BuildArray(6, Vector3.Zero);
    MathTmp2.Matrix = ArrayTools.BuildArray(2, Matrix.Identity);
    MathTmp2.Quaternion = ArrayTools.BuildArray(3, Quaternion.Zero);
    return MathTmp2;
  }();
  var TmpVectors = function() {
    function TmpVectors2() {
    }
    TmpVectors2.Vector2 = ArrayTools.BuildArray(3, Vector2.Zero);
    TmpVectors2.Vector3 = ArrayTools.BuildArray(13, Vector3.Zero);
    TmpVectors2.Vector4 = ArrayTools.BuildArray(3, Vector4.Zero);
    TmpVectors2.Quaternion = ArrayTools.BuildArray(2, Quaternion.Zero);
    TmpVectors2.Matrix = ArrayTools.BuildArray(8, Matrix.Identity);
    return TmpVectors2;
  }();
  _TypeStore.RegisteredTypes["BABYLON.Vector2"] = Vector2;
  _TypeStore.RegisteredTypes["BABYLON.Vector3"] = Vector3;
  _TypeStore.RegisteredTypes["BABYLON.Vector4"] = Vector4;
  _TypeStore.RegisteredTypes["BABYLON.Matrix"] = Matrix;

  // node_modules/@babylonjs/core/Maths/math.axis.js
  var Space;
  (function(Space2) {
    Space2[Space2["LOCAL"] = 0] = "LOCAL";
    Space2[Space2["WORLD"] = 1] = "WORLD";
    Space2[Space2["BONE"] = 2] = "BONE";
  })(Space || (Space = {}));
  var Axis = function() {
    function Axis2() {
    }
    Axis2.X = new Vector3(1, 0, 0);
    Axis2.Y = new Vector3(0, 1, 0);
    Axis2.Z = new Vector3(0, 0, 1);
    return Axis2;
  }();
  var Coordinate;
  (function(Coordinate2) {
    Coordinate2[Coordinate2["X"] = 0] = "X";
    Coordinate2[Coordinate2["Y"] = 1] = "Y";
    Coordinate2[Coordinate2["Z"] = 2] = "Z";
  })(Coordinate || (Coordinate = {}));

  // node_modules/@babylonjs/core/Maths/math.color.js
  var Color3 = function() {
    function Color32(r, g, b) {
      if (r === void 0) {
        r = 0;
      }
      if (g === void 0) {
        g = 0;
      }
      if (b === void 0) {
        b = 0;
      }
      this.r = r;
      this.g = g;
      this.b = b;
    }
    Color32.prototype.toString = function() {
      return "{R: " + this.r + " G:" + this.g + " B:" + this.b + "}";
    };
    Color32.prototype.getClassName = function() {
      return "Color3";
    };
    Color32.prototype.getHashCode = function() {
      var hash = this.r * 255 | 0;
      hash = hash * 397 ^ (this.g * 255 | 0);
      hash = hash * 397 ^ (this.b * 255 | 0);
      return hash;
    };
    Color32.prototype.toArray = function(array, index) {
      if (index === void 0) {
        index = 0;
      }
      array[index] = this.r;
      array[index + 1] = this.g;
      array[index + 2] = this.b;
      return this;
    };
    Color32.prototype.fromArray = function(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      Color32.FromArrayToRef(array, offset, this);
      return this;
    };
    Color32.prototype.toColor4 = function(alpha) {
      if (alpha === void 0) {
        alpha = 1;
      }
      return new Color4(this.r, this.g, this.b, alpha);
    };
    Color32.prototype.asArray = function() {
      var result = new Array();
      this.toArray(result, 0);
      return result;
    };
    Color32.prototype.toLuminance = function() {
      return this.r * 0.3 + this.g * 0.59 + this.b * 0.11;
    };
    Color32.prototype.multiply = function(otherColor) {
      return new Color32(this.r * otherColor.r, this.g * otherColor.g, this.b * otherColor.b);
    };
    Color32.prototype.multiplyToRef = function(otherColor, result) {
      result.r = this.r * otherColor.r;
      result.g = this.g * otherColor.g;
      result.b = this.b * otherColor.b;
      return this;
    };
    Color32.prototype.equals = function(otherColor) {
      return otherColor && this.r === otherColor.r && this.g === otherColor.g && this.b === otherColor.b;
    };
    Color32.prototype.equalsFloats = function(r, g, b) {
      return this.r === r && this.g === g && this.b === b;
    };
    Color32.prototype.scale = function(scale) {
      return new Color32(this.r * scale, this.g * scale, this.b * scale);
    };
    Color32.prototype.scaleToRef = function(scale, result) {
      result.r = this.r * scale;
      result.g = this.g * scale;
      result.b = this.b * scale;
      return this;
    };
    Color32.prototype.scaleAndAddToRef = function(scale, result) {
      result.r += this.r * scale;
      result.g += this.g * scale;
      result.b += this.b * scale;
      return this;
    };
    Color32.prototype.clampToRef = function(min, max, result) {
      if (min === void 0) {
        min = 0;
      }
      if (max === void 0) {
        max = 1;
      }
      result.r = Scalar.Clamp(this.r, min, max);
      result.g = Scalar.Clamp(this.g, min, max);
      result.b = Scalar.Clamp(this.b, min, max);
      return this;
    };
    Color32.prototype.add = function(otherColor) {
      return new Color32(this.r + otherColor.r, this.g + otherColor.g, this.b + otherColor.b);
    };
    Color32.prototype.addToRef = function(otherColor, result) {
      result.r = this.r + otherColor.r;
      result.g = this.g + otherColor.g;
      result.b = this.b + otherColor.b;
      return this;
    };
    Color32.prototype.subtract = function(otherColor) {
      return new Color32(this.r - otherColor.r, this.g - otherColor.g, this.b - otherColor.b);
    };
    Color32.prototype.subtractToRef = function(otherColor, result) {
      result.r = this.r - otherColor.r;
      result.g = this.g - otherColor.g;
      result.b = this.b - otherColor.b;
      return this;
    };
    Color32.prototype.clone = function() {
      return new Color32(this.r, this.g, this.b);
    };
    Color32.prototype.copyFrom = function(source) {
      this.r = source.r;
      this.g = source.g;
      this.b = source.b;
      return this;
    };
    Color32.prototype.copyFromFloats = function(r, g, b) {
      this.r = r;
      this.g = g;
      this.b = b;
      return this;
    };
    Color32.prototype.set = function(r, g, b) {
      return this.copyFromFloats(r, g, b);
    };
    Color32.prototype.toHexString = function() {
      var intR = this.r * 255 | 0;
      var intG = this.g * 255 | 0;
      var intB = this.b * 255 | 0;
      return "#" + Scalar.ToHex(intR) + Scalar.ToHex(intG) + Scalar.ToHex(intB);
    };
    Color32.prototype.toLinearSpace = function() {
      var convertedColor = new Color32();
      this.toLinearSpaceToRef(convertedColor);
      return convertedColor;
    };
    Color32.prototype.toHSV = function() {
      var result = new Color32();
      this.toHSVToRef(result);
      return result;
    };
    Color32.prototype.toHSVToRef = function(result) {
      var r = this.r;
      var g = this.g;
      var b = this.b;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h = 0;
      var s = 0;
      var v = max;
      var dm = max - min;
      if (max !== 0) {
        s = dm / max;
      }
      if (max != min) {
        if (max == r) {
          h = (g - b) / dm;
          if (g < b) {
            h += 6;
          }
        } else if (max == g) {
          h = (b - r) / dm + 2;
        } else if (max == b) {
          h = (r - g) / dm + 4;
        }
        h *= 60;
      }
      result.r = h;
      result.g = s;
      result.b = v;
    };
    Color32.prototype.toLinearSpaceToRef = function(convertedColor) {
      convertedColor.r = Math.pow(this.r, ToLinearSpace);
      convertedColor.g = Math.pow(this.g, ToLinearSpace);
      convertedColor.b = Math.pow(this.b, ToLinearSpace);
      return this;
    };
    Color32.prototype.toGammaSpace = function() {
      var convertedColor = new Color32();
      this.toGammaSpaceToRef(convertedColor);
      return convertedColor;
    };
    Color32.prototype.toGammaSpaceToRef = function(convertedColor) {
      convertedColor.r = Math.pow(this.r, ToGammaSpace);
      convertedColor.g = Math.pow(this.g, ToGammaSpace);
      convertedColor.b = Math.pow(this.b, ToGammaSpace);
      return this;
    };
    Color32.HSVtoRGBToRef = function(hue, saturation, value, result) {
      var chroma = value * saturation;
      var h = hue / 60;
      var x = chroma * (1 - Math.abs(h % 2 - 1));
      var r = 0;
      var g = 0;
      var b = 0;
      if (h >= 0 && h <= 1) {
        r = chroma;
        g = x;
      } else if (h >= 1 && h <= 2) {
        r = x;
        g = chroma;
      } else if (h >= 2 && h <= 3) {
        g = chroma;
        b = x;
      } else if (h >= 3 && h <= 4) {
        g = x;
        b = chroma;
      } else if (h >= 4 && h <= 5) {
        r = x;
        b = chroma;
      } else if (h >= 5 && h <= 6) {
        r = chroma;
        b = x;
      }
      var m = value - chroma;
      result.set(r + m, g + m, b + m);
    };
    Color32.FromHexString = function(hex) {
      if (hex.substring(0, 1) !== "#" || hex.length !== 7) {
        return new Color32(0, 0, 0);
      }
      var r = parseInt(hex.substring(1, 3), 16);
      var g = parseInt(hex.substring(3, 5), 16);
      var b = parseInt(hex.substring(5, 7), 16);
      return Color32.FromInts(r, g, b);
    };
    Color32.FromArray = function(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return new Color32(array[offset], array[offset + 1], array[offset + 2]);
    };
    Color32.FromArrayToRef = function(array, offset, result) {
      if (offset === void 0) {
        offset = 0;
      }
      result.r = array[offset];
      result.g = array[offset + 1];
      result.b = array[offset + 2];
    };
    Color32.FromInts = function(r, g, b) {
      return new Color32(r / 255, g / 255, b / 255);
    };
    Color32.Lerp = function(start, end, amount) {
      var result = new Color32(0, 0, 0);
      Color32.LerpToRef(start, end, amount, result);
      return result;
    };
    Color32.LerpToRef = function(left, right, amount, result) {
      result.r = left.r + (right.r - left.r) * amount;
      result.g = left.g + (right.g - left.g) * amount;
      result.b = left.b + (right.b - left.b) * amount;
    };
    Color32.Red = function() {
      return new Color32(1, 0, 0);
    };
    Color32.Green = function() {
      return new Color32(0, 1, 0);
    };
    Color32.Blue = function() {
      return new Color32(0, 0, 1);
    };
    Color32.Black = function() {
      return new Color32(0, 0, 0);
    };
    Object.defineProperty(Color32, "BlackReadOnly", {
      get: function() {
        return Color32._BlackReadOnly;
      },
      enumerable: false,
      configurable: true
    });
    Color32.White = function() {
      return new Color32(1, 1, 1);
    };
    Color32.Purple = function() {
      return new Color32(0.5, 0, 0.5);
    };
    Color32.Magenta = function() {
      return new Color32(1, 0, 1);
    };
    Color32.Yellow = function() {
      return new Color32(1, 1, 0);
    };
    Color32.Gray = function() {
      return new Color32(0.5, 0.5, 0.5);
    };
    Color32.Teal = function() {
      return new Color32(0, 1, 1);
    };
    Color32.Random = function() {
      return new Color32(Math.random(), Math.random(), Math.random());
    };
    Color32._BlackReadOnly = Color32.Black();
    return Color32;
  }();
  var Color4 = function() {
    function Color42(r, g, b, a) {
      if (r === void 0) {
        r = 0;
      }
      if (g === void 0) {
        g = 0;
      }
      if (b === void 0) {
        b = 0;
      }
      if (a === void 0) {
        a = 1;
      }
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }
    Color42.prototype.addInPlace = function(right) {
      this.r += right.r;
      this.g += right.g;
      this.b += right.b;
      this.a += right.a;
      return this;
    };
    Color42.prototype.asArray = function() {
      var result = new Array();
      this.toArray(result, 0);
      return result;
    };
    Color42.prototype.toArray = function(array, index) {
      if (index === void 0) {
        index = 0;
      }
      array[index] = this.r;
      array[index + 1] = this.g;
      array[index + 2] = this.b;
      array[index + 3] = this.a;
      return this;
    };
    Color42.prototype.fromArray = function(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      Color42.FromArrayToRef(array, offset, this);
      return this;
    };
    Color42.prototype.equals = function(otherColor) {
      return otherColor && this.r === otherColor.r && this.g === otherColor.g && this.b === otherColor.b && this.a === otherColor.a;
    };
    Color42.prototype.add = function(right) {
      return new Color42(this.r + right.r, this.g + right.g, this.b + right.b, this.a + right.a);
    };
    Color42.prototype.subtract = function(right) {
      return new Color42(this.r - right.r, this.g - right.g, this.b - right.b, this.a - right.a);
    };
    Color42.prototype.subtractToRef = function(right, result) {
      result.r = this.r - right.r;
      result.g = this.g - right.g;
      result.b = this.b - right.b;
      result.a = this.a - right.a;
      return this;
    };
    Color42.prototype.scale = function(scale) {
      return new Color42(this.r * scale, this.g * scale, this.b * scale, this.a * scale);
    };
    Color42.prototype.scaleToRef = function(scale, result) {
      result.r = this.r * scale;
      result.g = this.g * scale;
      result.b = this.b * scale;
      result.a = this.a * scale;
      return this;
    };
    Color42.prototype.scaleAndAddToRef = function(scale, result) {
      result.r += this.r * scale;
      result.g += this.g * scale;
      result.b += this.b * scale;
      result.a += this.a * scale;
      return this;
    };
    Color42.prototype.clampToRef = function(min, max, result) {
      if (min === void 0) {
        min = 0;
      }
      if (max === void 0) {
        max = 1;
      }
      result.r = Scalar.Clamp(this.r, min, max);
      result.g = Scalar.Clamp(this.g, min, max);
      result.b = Scalar.Clamp(this.b, min, max);
      result.a = Scalar.Clamp(this.a, min, max);
      return this;
    };
    Color42.prototype.multiply = function(color) {
      return new Color42(this.r * color.r, this.g * color.g, this.b * color.b, this.a * color.a);
    };
    Color42.prototype.multiplyToRef = function(color, result) {
      result.r = this.r * color.r;
      result.g = this.g * color.g;
      result.b = this.b * color.b;
      result.a = this.a * color.a;
      return result;
    };
    Color42.prototype.toString = function() {
      return "{R: " + this.r + " G:" + this.g + " B:" + this.b + " A:" + this.a + "}";
    };
    Color42.prototype.getClassName = function() {
      return "Color4";
    };
    Color42.prototype.getHashCode = function() {
      var hash = this.r * 255 | 0;
      hash = hash * 397 ^ (this.g * 255 | 0);
      hash = hash * 397 ^ (this.b * 255 | 0);
      hash = hash * 397 ^ (this.a * 255 | 0);
      return hash;
    };
    Color42.prototype.clone = function() {
      return new Color42(this.r, this.g, this.b, this.a);
    };
    Color42.prototype.copyFrom = function(source) {
      this.r = source.r;
      this.g = source.g;
      this.b = source.b;
      this.a = source.a;
      return this;
    };
    Color42.prototype.copyFromFloats = function(r, g, b, a) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      return this;
    };
    Color42.prototype.set = function(r, g, b, a) {
      return this.copyFromFloats(r, g, b, a);
    };
    Color42.prototype.toHexString = function(returnAsColor3) {
      if (returnAsColor3 === void 0) {
        returnAsColor3 = false;
      }
      var intR = this.r * 255 | 0;
      var intG = this.g * 255 | 0;
      var intB = this.b * 255 | 0;
      if (returnAsColor3) {
        return "#" + Scalar.ToHex(intR) + Scalar.ToHex(intG) + Scalar.ToHex(intB);
      }
      var intA = this.a * 255 | 0;
      return "#" + Scalar.ToHex(intR) + Scalar.ToHex(intG) + Scalar.ToHex(intB) + Scalar.ToHex(intA);
    };
    Color42.prototype.toLinearSpace = function() {
      var convertedColor = new Color42();
      this.toLinearSpaceToRef(convertedColor);
      return convertedColor;
    };
    Color42.prototype.toLinearSpaceToRef = function(convertedColor) {
      convertedColor.r = Math.pow(this.r, ToLinearSpace);
      convertedColor.g = Math.pow(this.g, ToLinearSpace);
      convertedColor.b = Math.pow(this.b, ToLinearSpace);
      convertedColor.a = this.a;
      return this;
    };
    Color42.prototype.toGammaSpace = function() {
      var convertedColor = new Color42();
      this.toGammaSpaceToRef(convertedColor);
      return convertedColor;
    };
    Color42.prototype.toGammaSpaceToRef = function(convertedColor) {
      convertedColor.r = Math.pow(this.r, ToGammaSpace);
      convertedColor.g = Math.pow(this.g, ToGammaSpace);
      convertedColor.b = Math.pow(this.b, ToGammaSpace);
      convertedColor.a = this.a;
      return this;
    };
    Color42.FromHexString = function(hex) {
      if (hex.substring(0, 1) !== "#" || hex.length !== 9) {
        return new Color42(0, 0, 0, 0);
      }
      var r = parseInt(hex.substring(1, 3), 16);
      var g = parseInt(hex.substring(3, 5), 16);
      var b = parseInt(hex.substring(5, 7), 16);
      var a = parseInt(hex.substring(7, 9), 16);
      return Color42.FromInts(r, g, b, a);
    };
    Color42.Lerp = function(left, right, amount) {
      var result = new Color42(0, 0, 0, 0);
      Color42.LerpToRef(left, right, amount, result);
      return result;
    };
    Color42.LerpToRef = function(left, right, amount, result) {
      result.r = left.r + (right.r - left.r) * amount;
      result.g = left.g + (right.g - left.g) * amount;
      result.b = left.b + (right.b - left.b) * amount;
      result.a = left.a + (right.a - left.a) * amount;
    };
    Color42.FromColor3 = function(color3, alpha) {
      if (alpha === void 0) {
        alpha = 1;
      }
      return new Color42(color3.r, color3.g, color3.b, alpha);
    };
    Color42.FromArray = function(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return new Color42(array[offset], array[offset + 1], array[offset + 2], array[offset + 3]);
    };
    Color42.FromArrayToRef = function(array, offset, result) {
      if (offset === void 0) {
        offset = 0;
      }
      result.r = array[offset];
      result.g = array[offset + 1];
      result.b = array[offset + 2];
      result.a = array[offset + 3];
    };
    Color42.FromInts = function(r, g, b, a) {
      return new Color42(r / 255, g / 255, b / 255, a / 255);
    };
    Color42.CheckColors4 = function(colors, count) {
      if (colors.length === count * 3) {
        var colors4 = [];
        for (var index = 0; index < colors.length; index += 3) {
          var newIndex = index / 3 * 4;
          colors4[newIndex] = colors[index];
          colors4[newIndex + 1] = colors[index + 1];
          colors4[newIndex + 2] = colors[index + 2];
          colors4[newIndex + 3] = 1;
        }
        return colors4;
      }
      return colors;
    };
    return Color42;
  }();
  var TmpColors = function() {
    function TmpColors2() {
    }
    TmpColors2.Color3 = ArrayTools.BuildArray(3, Color3.Black);
    TmpColors2.Color4 = ArrayTools.BuildArray(3, function() {
      return new Color4(0, 0, 0, 0);
    });
    return TmpColors2;
  }();
  _TypeStore.RegisteredTypes["BABYLON.Color3"] = Color3;
  _TypeStore.RegisteredTypes["BABYLON.Color4"] = Color4;

  // node_modules/@babylonjs/core/Maths/math.plane.js
  var Plane = function() {
    function Plane2(a, b, c, d) {
      this.normal = new Vector3(a, b, c);
      this.d = d;
    }
    Plane2.prototype.asArray = function() {
      return [this.normal.x, this.normal.y, this.normal.z, this.d];
    };
    Plane2.prototype.clone = function() {
      return new Plane2(this.normal.x, this.normal.y, this.normal.z, this.d);
    };
    Plane2.prototype.getClassName = function() {
      return "Plane";
    };
    Plane2.prototype.getHashCode = function() {
      var hash = this.normal.getHashCode();
      hash = hash * 397 ^ (this.d | 0);
      return hash;
    };
    Plane2.prototype.normalize = function() {
      var norm = Math.sqrt(this.normal.x * this.normal.x + this.normal.y * this.normal.y + this.normal.z * this.normal.z);
      var magnitude = 0;
      if (norm !== 0) {
        magnitude = 1 / norm;
      }
      this.normal.x *= magnitude;
      this.normal.y *= magnitude;
      this.normal.z *= magnitude;
      this.d *= magnitude;
      return this;
    };
    Plane2.prototype.transform = function(transformation) {
      var invertedMatrix = Plane2._TmpMatrix;
      transformation.invertToRef(invertedMatrix);
      var m = invertedMatrix.m;
      var x = this.normal.x;
      var y = this.normal.y;
      var z = this.normal.z;
      var d = this.d;
      var normalX = x * m[0] + y * m[1] + z * m[2] + d * m[3];
      var normalY = x * m[4] + y * m[5] + z * m[6] + d * m[7];
      var normalZ = x * m[8] + y * m[9] + z * m[10] + d * m[11];
      var finalD = x * m[12] + y * m[13] + z * m[14] + d * m[15];
      return new Plane2(normalX, normalY, normalZ, finalD);
    };
    Plane2.prototype.dotCoordinate = function(point) {
      return this.normal.x * point.x + this.normal.y * point.y + this.normal.z * point.z + this.d;
    };
    Plane2.prototype.copyFromPoints = function(point1, point2, point3) {
      var x1 = point2.x - point1.x;
      var y1 = point2.y - point1.y;
      var z1 = point2.z - point1.z;
      var x2 = point3.x - point1.x;
      var y2 = point3.y - point1.y;
      var z2 = point3.z - point1.z;
      var yz = y1 * z2 - z1 * y2;
      var xz = z1 * x2 - x1 * z2;
      var xy = x1 * y2 - y1 * x2;
      var pyth = Math.sqrt(yz * yz + xz * xz + xy * xy);
      var invPyth;
      if (pyth !== 0) {
        invPyth = 1 / pyth;
      } else {
        invPyth = 0;
      }
      this.normal.x = yz * invPyth;
      this.normal.y = xz * invPyth;
      this.normal.z = xy * invPyth;
      this.d = -(this.normal.x * point1.x + this.normal.y * point1.y + this.normal.z * point1.z);
      return this;
    };
    Plane2.prototype.isFrontFacingTo = function(direction, epsilon) {
      var dot = Vector3.Dot(this.normal, direction);
      return dot <= epsilon;
    };
    Plane2.prototype.signedDistanceTo = function(point) {
      return Vector3.Dot(point, this.normal) + this.d;
    };
    Plane2.FromArray = function(array) {
      return new Plane2(array[0], array[1], array[2], array[3]);
    };
    Plane2.FromPoints = function(point1, point2, point3) {
      var result = new Plane2(0, 0, 0, 0);
      result.copyFromPoints(point1, point2, point3);
      return result;
    };
    Plane2.FromPositionAndNormal = function(origin, normal) {
      var result = new Plane2(0, 0, 0, 0);
      normal.normalize();
      result.normal = normal;
      result.d = -(normal.x * origin.x + normal.y * origin.y + normal.z * origin.z);
      return result;
    };
    Plane2.SignedDistanceToPlaneFromPositionAndNormal = function(origin, normal, point) {
      var d = -(normal.x * origin.x + normal.y * origin.y + normal.z * origin.z);
      return Vector3.Dot(point, normal) + d;
    };
    Plane2._TmpMatrix = Matrix.Identity();
    return Plane2;
  }();

  // node_modules/@babylonjs/core/Maths/math.frustum.js
  var Frustum = function() {
    function Frustum2() {
    }
    Frustum2.GetPlanes = function(transform) {
      var frustumPlanes = [];
      for (var index = 0; index < 6; index++) {
        frustumPlanes.push(new Plane(0, 0, 0, 0));
      }
      Frustum2.GetPlanesToRef(transform, frustumPlanes);
      return frustumPlanes;
    };
    Frustum2.GetNearPlaneToRef = function(transform, frustumPlane) {
      var m = transform.m;
      frustumPlane.normal.x = m[3] + m[2];
      frustumPlane.normal.y = m[7] + m[6];
      frustumPlane.normal.z = m[11] + m[10];
      frustumPlane.d = m[15] + m[14];
      frustumPlane.normalize();
    };
    Frustum2.GetFarPlaneToRef = function(transform, frustumPlane) {
      var m = transform.m;
      frustumPlane.normal.x = m[3] - m[2];
      frustumPlane.normal.y = m[7] - m[6];
      frustumPlane.normal.z = m[11] - m[10];
      frustumPlane.d = m[15] - m[14];
      frustumPlane.normalize();
    };
    Frustum2.GetLeftPlaneToRef = function(transform, frustumPlane) {
      var m = transform.m;
      frustumPlane.normal.x = m[3] + m[0];
      frustumPlane.normal.y = m[7] + m[4];
      frustumPlane.normal.z = m[11] + m[8];
      frustumPlane.d = m[15] + m[12];
      frustumPlane.normalize();
    };
    Frustum2.GetRightPlaneToRef = function(transform, frustumPlane) {
      var m = transform.m;
      frustumPlane.normal.x = m[3] - m[0];
      frustumPlane.normal.y = m[7] - m[4];
      frustumPlane.normal.z = m[11] - m[8];
      frustumPlane.d = m[15] - m[12];
      frustumPlane.normalize();
    };
    Frustum2.GetTopPlaneToRef = function(transform, frustumPlane) {
      var m = transform.m;
      frustumPlane.normal.x = m[3] - m[1];
      frustumPlane.normal.y = m[7] - m[5];
      frustumPlane.normal.z = m[11] - m[9];
      frustumPlane.d = m[15] - m[13];
      frustumPlane.normalize();
    };
    Frustum2.GetBottomPlaneToRef = function(transform, frustumPlane) {
      var m = transform.m;
      frustumPlane.normal.x = m[3] + m[1];
      frustumPlane.normal.y = m[7] + m[5];
      frustumPlane.normal.z = m[11] + m[9];
      frustumPlane.d = m[15] + m[13];
      frustumPlane.normalize();
    };
    Frustum2.GetPlanesToRef = function(transform, frustumPlanes) {
      Frustum2.GetNearPlaneToRef(transform, frustumPlanes[0]);
      Frustum2.GetFarPlaneToRef(transform, frustumPlanes[1]);
      Frustum2.GetLeftPlaneToRef(transform, frustumPlanes[2]);
      Frustum2.GetRightPlaneToRef(transform, frustumPlanes[3]);
      Frustum2.GetTopPlaneToRef(transform, frustumPlanes[4]);
      Frustum2.GetBottomPlaneToRef(transform, frustumPlanes[5]);
    };
    return Frustum2;
  }();

  // node_modules/@babylonjs/core/Maths/math.path.js
  var Orientation;
  (function(Orientation2) {
    Orientation2[Orientation2["CW"] = 0] = "CW";
    Orientation2[Orientation2["CCW"] = 1] = "CCW";
  })(Orientation || (Orientation = {}));
  var BezierCurve = function() {
    function BezierCurve2() {
    }
    BezierCurve2.Interpolate = function(t, x1, y1, x2, y2) {
      var f0 = 1 - 3 * x2 + 3 * x1;
      var f1 = 3 * x2 - 6 * x1;
      var f2 = 3 * x1;
      var refinedT = t;
      for (var i = 0; i < 5; i++) {
        var refinedT2 = refinedT * refinedT;
        var refinedT3 = refinedT2 * refinedT;
        var x = f0 * refinedT3 + f1 * refinedT2 + f2 * refinedT;
        var slope = 1 / (3 * f0 * refinedT2 + 2 * f1 * refinedT + f2);
        refinedT -= (x - t) * slope;
        refinedT = Math.min(1, Math.max(0, refinedT));
      }
      return 3 * Math.pow(1 - refinedT, 2) * refinedT * y1 + 3 * (1 - refinedT) * Math.pow(refinedT, 2) * y2 + Math.pow(refinedT, 3);
    };
    return BezierCurve2;
  }();
  var Angle = function() {
    function Angle2(radians) {
      this._radians = radians;
      if (this._radians < 0) {
        this._radians += 2 * Math.PI;
      }
    }
    Angle2.prototype.degrees = function() {
      return this._radians * 180 / Math.PI;
    };
    Angle2.prototype.radians = function() {
      return this._radians;
    };
    Angle2.BetweenTwoPoints = function(a, b) {
      var delta = b.subtract(a);
      var theta = Math.atan2(delta.y, delta.x);
      return new Angle2(theta);
    };
    Angle2.FromRadians = function(radians) {
      return new Angle2(radians);
    };
    Angle2.FromDegrees = function(degrees) {
      return new Angle2(degrees * Math.PI / 180);
    };
    return Angle2;
  }();
  var Arc2 = function() {
    function Arc22(startPoint, midPoint, endPoint) {
      this.startPoint = startPoint;
      this.midPoint = midPoint;
      this.endPoint = endPoint;
      var temp = Math.pow(midPoint.x, 2) + Math.pow(midPoint.y, 2);
      var startToMid = (Math.pow(startPoint.x, 2) + Math.pow(startPoint.y, 2) - temp) / 2;
      var midToEnd = (temp - Math.pow(endPoint.x, 2) - Math.pow(endPoint.y, 2)) / 2;
      var det = (startPoint.x - midPoint.x) * (midPoint.y - endPoint.y) - (midPoint.x - endPoint.x) * (startPoint.y - midPoint.y);
      this.centerPoint = new Vector2((startToMid * (midPoint.y - endPoint.y) - midToEnd * (startPoint.y - midPoint.y)) / det, ((startPoint.x - midPoint.x) * midToEnd - (midPoint.x - endPoint.x) * startToMid) / det);
      this.radius = this.centerPoint.subtract(this.startPoint).length();
      this.startAngle = Angle.BetweenTwoPoints(this.centerPoint, this.startPoint);
      var a1 = this.startAngle.degrees();
      var a2 = Angle.BetweenTwoPoints(this.centerPoint, this.midPoint).degrees();
      var a3 = Angle.BetweenTwoPoints(this.centerPoint, this.endPoint).degrees();
      if (a2 - a1 > 180) {
        a2 -= 360;
      }
      if (a2 - a1 < -180) {
        a2 += 360;
      }
      if (a3 - a2 > 180) {
        a3 -= 360;
      }
      if (a3 - a2 < -180) {
        a3 += 360;
      }
      this.orientation = a2 - a1 < 0 ? Orientation.CW : Orientation.CCW;
      this.angle = Angle.FromDegrees(this.orientation === Orientation.CW ? a1 - a3 : a3 - a1);
    }
    return Arc22;
  }();
  var Path2 = function() {
    function Path22(x, y) {
      this._points = new Array();
      this._length = 0;
      this.closed = false;
      this._points.push(new Vector2(x, y));
    }
    Path22.prototype.addLineTo = function(x, y) {
      if (this.closed) {
        return this;
      }
      var newPoint = new Vector2(x, y);
      var previousPoint = this._points[this._points.length - 1];
      this._points.push(newPoint);
      this._length += newPoint.subtract(previousPoint).length();
      return this;
    };
    Path22.prototype.addArcTo = function(midX, midY, endX, endY, numberOfSegments) {
      if (numberOfSegments === void 0) {
        numberOfSegments = 36;
      }
      if (this.closed) {
        return this;
      }
      var startPoint = this._points[this._points.length - 1];
      var midPoint = new Vector2(midX, midY);
      var endPoint = new Vector2(endX, endY);
      var arc = new Arc2(startPoint, midPoint, endPoint);
      var increment = arc.angle.radians() / numberOfSegments;
      if (arc.orientation === Orientation.CW) {
        increment *= -1;
      }
      var currentAngle = arc.startAngle.radians() + increment;
      for (var i = 0; i < numberOfSegments; i++) {
        var x = Math.cos(currentAngle) * arc.radius + arc.centerPoint.x;
        var y = Math.sin(currentAngle) * arc.radius + arc.centerPoint.y;
        this.addLineTo(x, y);
        currentAngle += increment;
      }
      return this;
    };
    Path22.prototype.close = function() {
      this.closed = true;
      return this;
    };
    Path22.prototype.length = function() {
      var result = this._length;
      if (this.closed) {
        var lastPoint = this._points[this._points.length - 1];
        var firstPoint = this._points[0];
        result += firstPoint.subtract(lastPoint).length();
      }
      return result;
    };
    Path22.prototype.getPoints = function() {
      return this._points;
    };
    Path22.prototype.getPointAtLengthPosition = function(normalizedLengthPosition) {
      if (normalizedLengthPosition < 0 || normalizedLengthPosition > 1) {
        return Vector2.Zero();
      }
      var lengthPosition = normalizedLengthPosition * this.length();
      var previousOffset = 0;
      for (var i = 0; i < this._points.length; i++) {
        var j = (i + 1) % this._points.length;
        var a = this._points[i];
        var b = this._points[j];
        var bToA = b.subtract(a);
        var nextOffset = bToA.length() + previousOffset;
        if (lengthPosition >= previousOffset && lengthPosition <= nextOffset) {
          var dir = bToA.normalize();
          var localOffset = lengthPosition - previousOffset;
          return new Vector2(a.x + dir.x * localOffset, a.y + dir.y * localOffset);
        }
        previousOffset = nextOffset;
      }
      return Vector2.Zero();
    };
    Path22.StartingAt = function(x, y) {
      return new Path22(x, y);
    };
    return Path22;
  }();
  var Path3D = function() {
    function Path3D2(path, firstNormal, raw, alignTangentsWithPath) {
      if (firstNormal === void 0) {
        firstNormal = null;
      }
      if (alignTangentsWithPath === void 0) {
        alignTangentsWithPath = false;
      }
      this.path = path;
      this._curve = new Array();
      this._distances = new Array();
      this._tangents = new Array();
      this._normals = new Array();
      this._binormals = new Array();
      this._pointAtData = {
        id: 0,
        point: Vector3.Zero(),
        previousPointArrayIndex: 0,
        position: 0,
        subPosition: 0,
        interpolateReady: false,
        interpolationMatrix: Matrix.Identity()
      };
      for (var p = 0; p < path.length; p++) {
        this._curve[p] = path[p].clone();
      }
      this._raw = raw || false;
      this._alignTangentsWithPath = alignTangentsWithPath;
      this._compute(firstNormal, alignTangentsWithPath);
    }
    Path3D2.prototype.getCurve = function() {
      return this._curve;
    };
    Path3D2.prototype.getPoints = function() {
      return this._curve;
    };
    Path3D2.prototype.length = function() {
      return this._distances[this._distances.length - 1];
    };
    Path3D2.prototype.getTangents = function() {
      return this._tangents;
    };
    Path3D2.prototype.getNormals = function() {
      return this._normals;
    };
    Path3D2.prototype.getBinormals = function() {
      return this._binormals;
    };
    Path3D2.prototype.getDistances = function() {
      return this._distances;
    };
    Path3D2.prototype.getPointAt = function(position) {
      return this._updatePointAtData(position).point;
    };
    Path3D2.prototype.getTangentAt = function(position, interpolated) {
      if (interpolated === void 0) {
        interpolated = false;
      }
      this._updatePointAtData(position, interpolated);
      return interpolated ? Vector3.TransformCoordinates(Vector3.Forward(), this._pointAtData.interpolationMatrix) : this._tangents[this._pointAtData.previousPointArrayIndex];
    };
    Path3D2.prototype.getNormalAt = function(position, interpolated) {
      if (interpolated === void 0) {
        interpolated = false;
      }
      this._updatePointAtData(position, interpolated);
      return interpolated ? Vector3.TransformCoordinates(Vector3.Right(), this._pointAtData.interpolationMatrix) : this._normals[this._pointAtData.previousPointArrayIndex];
    };
    Path3D2.prototype.getBinormalAt = function(position, interpolated) {
      if (interpolated === void 0) {
        interpolated = false;
      }
      this._updatePointAtData(position, interpolated);
      return interpolated ? Vector3.TransformCoordinates(Vector3.UpReadOnly, this._pointAtData.interpolationMatrix) : this._binormals[this._pointAtData.previousPointArrayIndex];
    };
    Path3D2.prototype.getDistanceAt = function(position) {
      return this.length() * position;
    };
    Path3D2.prototype.getPreviousPointIndexAt = function(position) {
      this._updatePointAtData(position);
      return this._pointAtData.previousPointArrayIndex;
    };
    Path3D2.prototype.getSubPositionAt = function(position) {
      this._updatePointAtData(position);
      return this._pointAtData.subPosition;
    };
    Path3D2.prototype.getClosestPositionTo = function(target) {
      var smallestDistance = Number.MAX_VALUE;
      var closestPosition = 0;
      for (var i = 0; i < this._curve.length - 1; i++) {
        var point = this._curve[i + 0];
        var tangent = this._curve[i + 1].subtract(point).normalize();
        var subLength = this._distances[i + 1] - this._distances[i + 0];
        var subPosition = Math.min(Math.max(Vector3.Dot(tangent, target.subtract(point).normalize()), 0) * Vector3.Distance(point, target) / subLength, 1);
        var distance = Vector3.Distance(point.add(tangent.scale(subPosition * subLength)), target);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestPosition = (this._distances[i + 0] + subLength * subPosition) / this.length();
        }
      }
      return closestPosition;
    };
    Path3D2.prototype.slice = function(start, end) {
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = 1;
      }
      if (start < 0) {
        start = 1 - start * -1 % 1;
      }
      if (end < 0) {
        end = 1 - end * -1 % 1;
      }
      if (start > end) {
        var _start = start;
        start = end;
        end = _start;
      }
      var curvePoints = this.getCurve();
      var startPoint = this.getPointAt(start);
      var startIndex = this.getPreviousPointIndexAt(start);
      var endPoint = this.getPointAt(end);
      var endIndex = this.getPreviousPointIndexAt(end) + 1;
      var slicePoints = [];
      if (start !== 0) {
        startIndex++;
        slicePoints.push(startPoint);
      }
      slicePoints.push.apply(slicePoints, curvePoints.slice(startIndex, endIndex));
      if (end !== 1 || start === 1) {
        slicePoints.push(endPoint);
      }
      return new Path3D2(slicePoints, this.getNormalAt(start), this._raw, this._alignTangentsWithPath);
    };
    Path3D2.prototype.update = function(path, firstNormal, alignTangentsWithPath) {
      if (firstNormal === void 0) {
        firstNormal = null;
      }
      if (alignTangentsWithPath === void 0) {
        alignTangentsWithPath = false;
      }
      for (var p = 0; p < path.length; p++) {
        this._curve[p].x = path[p].x;
        this._curve[p].y = path[p].y;
        this._curve[p].z = path[p].z;
      }
      this._compute(firstNormal, alignTangentsWithPath);
      return this;
    };
    Path3D2.prototype._compute = function(firstNormal, alignTangentsWithPath) {
      if (alignTangentsWithPath === void 0) {
        alignTangentsWithPath = false;
      }
      var l = this._curve.length;
      if (l < 2) {
        return;
      }
      this._tangents[0] = this._getFirstNonNullVector(0);
      if (!this._raw) {
        this._tangents[0].normalize();
      }
      this._tangents[l - 1] = this._curve[l - 1].subtract(this._curve[l - 2]);
      if (!this._raw) {
        this._tangents[l - 1].normalize();
      }
      var tg0 = this._tangents[0];
      var pp0 = this._normalVector(tg0, firstNormal);
      this._normals[0] = pp0;
      if (!this._raw) {
        this._normals[0].normalize();
      }
      this._binormals[0] = Vector3.Cross(tg0, this._normals[0]);
      if (!this._raw) {
        this._binormals[0].normalize();
      }
      this._distances[0] = 0;
      var prev;
      var cur;
      var curTang;
      var prevNor;
      var prevBinor;
      for (var i = 1; i < l; i++) {
        prev = this._getLastNonNullVector(i);
        if (i < l - 1) {
          cur = this._getFirstNonNullVector(i);
          this._tangents[i] = alignTangentsWithPath ? cur : prev.add(cur);
          this._tangents[i].normalize();
        }
        this._distances[i] = this._distances[i - 1] + this._curve[i].subtract(this._curve[i - 1]).length();
        curTang = this._tangents[i];
        prevBinor = this._binormals[i - 1];
        this._normals[i] = Vector3.Cross(prevBinor, curTang);
        if (!this._raw) {
          if (this._normals[i].length() === 0) {
            prevNor = this._normals[i - 1];
            this._normals[i] = prevNor.clone();
          } else {
            this._normals[i].normalize();
          }
        }
        this._binormals[i] = Vector3.Cross(curTang, this._normals[i]);
        if (!this._raw) {
          this._binormals[i].normalize();
        }
      }
      this._pointAtData.id = NaN;
    };
    Path3D2.prototype._getFirstNonNullVector = function(index) {
      var i = 1;
      var nNVector = this._curve[index + i].subtract(this._curve[index]);
      while (nNVector.length() === 0 && index + i + 1 < this._curve.length) {
        i++;
        nNVector = this._curve[index + i].subtract(this._curve[index]);
      }
      return nNVector;
    };
    Path3D2.prototype._getLastNonNullVector = function(index) {
      var i = 1;
      var nLVector = this._curve[index].subtract(this._curve[index - i]);
      while (nLVector.length() === 0 && index > i + 1) {
        i++;
        nLVector = this._curve[index].subtract(this._curve[index - i]);
      }
      return nLVector;
    };
    Path3D2.prototype._normalVector = function(vt, va) {
      var normal0;
      var tgl = vt.length();
      if (tgl === 0) {
        tgl = 1;
      }
      if (va === void 0 || va === null) {
        var point;
        if (!Scalar.WithinEpsilon(Math.abs(vt.y) / tgl, 1, Epsilon)) {
          point = new Vector3(0, -1, 0);
        } else if (!Scalar.WithinEpsilon(Math.abs(vt.x) / tgl, 1, Epsilon)) {
          point = new Vector3(1, 0, 0);
        } else if (!Scalar.WithinEpsilon(Math.abs(vt.z) / tgl, 1, Epsilon)) {
          point = new Vector3(0, 0, 1);
        } else {
          point = Vector3.Zero();
        }
        normal0 = Vector3.Cross(vt, point);
      } else {
        normal0 = Vector3.Cross(vt, va);
        Vector3.CrossToRef(normal0, vt, normal0);
      }
      normal0.normalize();
      return normal0;
    };
    Path3D2.prototype._updatePointAtData = function(position, interpolateTNB) {
      if (interpolateTNB === void 0) {
        interpolateTNB = false;
      }
      if (this._pointAtData.id === position) {
        if (!this._pointAtData.interpolateReady) {
          this._updateInterpolationMatrix();
        }
        return this._pointAtData;
      } else {
        this._pointAtData.id = position;
      }
      var curvePoints = this.getPoints();
      if (position <= 0) {
        return this._setPointAtData(0, 0, curvePoints[0], 0, interpolateTNB);
      } else if (position >= 1) {
        return this._setPointAtData(1, 1, curvePoints[curvePoints.length - 1], curvePoints.length - 1, interpolateTNB);
      }
      var previousPoint = curvePoints[0];
      var currentPoint;
      var currentLength = 0;
      var targetLength = position * this.length();
      for (var i = 1; i < curvePoints.length; i++) {
        currentPoint = curvePoints[i];
        var distance = Vector3.Distance(previousPoint, currentPoint);
        currentLength += distance;
        if (currentLength === targetLength) {
          return this._setPointAtData(position, 1, currentPoint, i, interpolateTNB);
        } else if (currentLength > targetLength) {
          var toLength = currentLength - targetLength;
          var diff = toLength / distance;
          var dir = previousPoint.subtract(currentPoint);
          var point = currentPoint.add(dir.scaleInPlace(diff));
          return this._setPointAtData(position, 1 - diff, point, i - 1, interpolateTNB);
        }
        previousPoint = currentPoint;
      }
      return this._pointAtData;
    };
    Path3D2.prototype._setPointAtData = function(position, subPosition, point, parentIndex, interpolateTNB) {
      this._pointAtData.point = point;
      this._pointAtData.position = position;
      this._pointAtData.subPosition = subPosition;
      this._pointAtData.previousPointArrayIndex = parentIndex;
      this._pointAtData.interpolateReady = interpolateTNB;
      if (interpolateTNB) {
        this._updateInterpolationMatrix();
      }
      return this._pointAtData;
    };
    Path3D2.prototype._updateInterpolationMatrix = function() {
      this._pointAtData.interpolationMatrix = Matrix.Identity();
      var parentIndex = this._pointAtData.previousPointArrayIndex;
      if (parentIndex !== this._tangents.length - 1) {
        var index = parentIndex + 1;
        var tangentFrom = this._tangents[parentIndex].clone();
        var normalFrom = this._normals[parentIndex].clone();
        var binormalFrom = this._binormals[parentIndex].clone();
        var tangentTo = this._tangents[index].clone();
        var normalTo = this._normals[index].clone();
        var binormalTo = this._binormals[index].clone();
        var quatFrom = Quaternion.RotationQuaternionFromAxis(normalFrom, binormalFrom, tangentFrom);
        var quatTo = Quaternion.RotationQuaternionFromAxis(normalTo, binormalTo, tangentTo);
        var quatAt = Quaternion.Slerp(quatFrom, quatTo, this._pointAtData.subPosition);
        quatAt.toRotationMatrix(this._pointAtData.interpolationMatrix);
      }
    };
    return Path3D2;
  }();
  var Curve3 = function() {
    function Curve32(points) {
      this._length = 0;
      this._points = points;
      this._length = this._computeLength(points);
    }
    Curve32.CreateQuadraticBezier = function(v0, v1, v2, nbPoints) {
      nbPoints = nbPoints > 2 ? nbPoints : 3;
      var bez = new Array();
      var equation = function(t, val0, val1, val2) {
        var res = (1 - t) * (1 - t) * val0 + 2 * t * (1 - t) * val1 + t * t * val2;
        return res;
      };
      for (var i = 0; i <= nbPoints; i++) {
        bez.push(new Vector3(equation(i / nbPoints, v0.x, v1.x, v2.x), equation(i / nbPoints, v0.y, v1.y, v2.y), equation(i / nbPoints, v0.z, v1.z, v2.z)));
      }
      return new Curve32(bez);
    };
    Curve32.CreateCubicBezier = function(v0, v1, v2, v3, nbPoints) {
      nbPoints = nbPoints > 3 ? nbPoints : 4;
      var bez = new Array();
      var equation = function(t, val0, val1, val2, val3) {
        var res = (1 - t) * (1 - t) * (1 - t) * val0 + 3 * t * (1 - t) * (1 - t) * val1 + 3 * t * t * (1 - t) * val2 + t * t * t * val3;
        return res;
      };
      for (var i = 0; i <= nbPoints; i++) {
        bez.push(new Vector3(equation(i / nbPoints, v0.x, v1.x, v2.x, v3.x), equation(i / nbPoints, v0.y, v1.y, v2.y, v3.y), equation(i / nbPoints, v0.z, v1.z, v2.z, v3.z)));
      }
      return new Curve32(bez);
    };
    Curve32.CreateHermiteSpline = function(p1, t1, p2, t2, nbPoints) {
      var hermite = new Array();
      var step = 1 / nbPoints;
      for (var i = 0; i <= nbPoints; i++) {
        hermite.push(Vector3.Hermite(p1, t1, p2, t2, i * step));
      }
      return new Curve32(hermite);
    };
    Curve32.CreateCatmullRomSpline = function(points, nbPoints, closed) {
      var catmullRom = new Array();
      var step = 1 / nbPoints;
      var amount = 0;
      if (closed) {
        var pointsCount = points.length;
        for (var i = 0; i < pointsCount; i++) {
          amount = 0;
          for (var c = 0; c < nbPoints; c++) {
            catmullRom.push(Vector3.CatmullRom(points[i % pointsCount], points[(i + 1) % pointsCount], points[(i + 2) % pointsCount], points[(i + 3) % pointsCount], amount));
            amount += step;
          }
        }
        catmullRom.push(catmullRom[0]);
      } else {
        var totalPoints = new Array();
        totalPoints.push(points[0].clone());
        Array.prototype.push.apply(totalPoints, points);
        totalPoints.push(points[points.length - 1].clone());
        for (var i = 0; i < totalPoints.length - 3; i++) {
          amount = 0;
          for (var c = 0; c < nbPoints; c++) {
            catmullRom.push(Vector3.CatmullRom(totalPoints[i], totalPoints[i + 1], totalPoints[i + 2], totalPoints[i + 3], amount));
            amount += step;
          }
        }
        i--;
        catmullRom.push(Vector3.CatmullRom(totalPoints[i], totalPoints[i + 1], totalPoints[i + 2], totalPoints[i + 3], amount));
      }
      return new Curve32(catmullRom);
    };
    Curve32.prototype.getPoints = function() {
      return this._points;
    };
    Curve32.prototype.length = function() {
      return this._length;
    };
    Curve32.prototype.continue = function(curve) {
      var lastPoint = this._points[this._points.length - 1];
      var continuedPoints = this._points.slice();
      var curvePoints = curve.getPoints();
      for (var i = 1; i < curvePoints.length; i++) {
        continuedPoints.push(curvePoints[i].subtract(curvePoints[0]).add(lastPoint));
      }
      var continuedCurve = new Curve32(continuedPoints);
      return continuedCurve;
    };
    Curve32.prototype._computeLength = function(path) {
      var l = 0;
      for (var i = 1; i < path.length; i++) {
        l += path[i].subtract(path[i - 1]).length();
      }
      return l;
    };
    return Curve32;
  }();

  // node_modules/@babylonjs/core/Maths/math.size.js
  var Size = function() {
    function Size2(width, height) {
      this.width = width;
      this.height = height;
    }
    Size2.prototype.toString = function() {
      return "{W: " + this.width + ", H: " + this.height + "}";
    };
    Size2.prototype.getClassName = function() {
      return "Size";
    };
    Size2.prototype.getHashCode = function() {
      var hash = this.width | 0;
      hash = hash * 397 ^ (this.height | 0);
      return hash;
    };
    Size2.prototype.copyFrom = function(src) {
      this.width = src.width;
      this.height = src.height;
    };
    Size2.prototype.copyFromFloats = function(width, height) {
      this.width = width;
      this.height = height;
      return this;
    };
    Size2.prototype.set = function(width, height) {
      return this.copyFromFloats(width, height);
    };
    Size2.prototype.multiplyByFloats = function(w, h) {
      return new Size2(this.width * w, this.height * h);
    };
    Size2.prototype.clone = function() {
      return new Size2(this.width, this.height);
    };
    Size2.prototype.equals = function(other) {
      if (!other) {
        return false;
      }
      return this.width === other.width && this.height === other.height;
    };
    Object.defineProperty(Size2.prototype, "surface", {
      get: function() {
        return this.width * this.height;
      },
      enumerable: false,
      configurable: true
    });
    Size2.Zero = function() {
      return new Size2(0, 0);
    };
    Size2.prototype.add = function(otherSize) {
      var r = new Size2(this.width + otherSize.width, this.height + otherSize.height);
      return r;
    };
    Size2.prototype.subtract = function(otherSize) {
      var r = new Size2(this.width - otherSize.width, this.height - otherSize.height);
      return r;
    };
    Size2.Lerp = function(start, end, amount) {
      var w = start.width + (end.width - start.width) * amount;
      var h = start.height + (end.height - start.height) * amount;
      return new Size2(w, h);
    };
    return Size2;
  }();

  // node_modules/@babylonjs/core/Maths/math.vertexFormat.js
  var PositionNormalVertex = function() {
    function PositionNormalVertex2(position, normal) {
      if (position === void 0) {
        position = Vector3.Zero();
      }
      if (normal === void 0) {
        normal = Vector3.Up();
      }
      this.position = position;
      this.normal = normal;
    }
    PositionNormalVertex2.prototype.clone = function() {
      return new PositionNormalVertex2(this.position.clone(), this.normal.clone());
    };
    return PositionNormalVertex2;
  }();
  var PositionNormalTextureVertex = function() {
    function PositionNormalTextureVertex2(position, normal, uv) {
      if (position === void 0) {
        position = Vector3.Zero();
      }
      if (normal === void 0) {
        normal = Vector3.Up();
      }
      if (uv === void 0) {
        uv = Vector2.Zero();
      }
      this.position = position;
      this.normal = normal;
      this.uv = uv;
    }
    PositionNormalTextureVertex2.prototype.clone = function() {
      return new PositionNormalTextureVertex2(this.position.clone(), this.normal.clone(), this.uv.clone());
    };
    return PositionNormalTextureVertex2;
  }();

  // node_modules/@babylonjs/core/Maths/math.viewport.js
  var Viewport = function() {
    function Viewport2(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
    Viewport2.prototype.toGlobal = function(renderWidth, renderHeight) {
      return new Viewport2(this.x * renderWidth, this.y * renderHeight, this.width * renderWidth, this.height * renderHeight);
    };
    Viewport2.prototype.toGlobalToRef = function(renderWidth, renderHeight, ref) {
      ref.x = this.x * renderWidth;
      ref.y = this.y * renderHeight;
      ref.width = this.width * renderWidth;
      ref.height = this.height * renderHeight;
      return this;
    };
    Viewport2.prototype.clone = function() {
      return new Viewport2(this.x, this.y, this.width, this.height);
    };
    return Viewport2;
  }();

  // src/voxel/march-tables.ts
  var triangulationTable = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 8, 3, 9, 8, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 8, 3, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [9, 2, 10, 0, 2, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [2, 8, 3, 2, 10, 8, 10, 9, 8, -1, -1, -1, -1, -1, -1, -1],
    [3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 11, 2, 8, 11, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 9, 0, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 11, 2, 1, 9, 11, 9, 8, 11, -1, -1, -1, -1, -1, -1, -1],
    [3, 10, 1, 11, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 10, 1, 0, 8, 10, 8, 11, 10, -1, -1, -1, -1, -1, -1, -1],
    [3, 9, 0, 3, 11, 9, 11, 10, 9, -1, -1, -1, -1, -1, -1, -1],
    [9, 8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [4, 3, 0, 7, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 1, 9, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [4, 1, 9, 4, 7, 1, 7, 3, 1, -1, -1, -1, -1, -1, -1, -1],
    [1, 2, 10, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [3, 4, 7, 3, 0, 4, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1],
    [9, 2, 10, 9, 0, 2, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1],
    [2, 10, 9, 2, 9, 7, 2, 7, 3, 7, 9, 4, -1, -1, -1, -1],
    [8, 4, 7, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [11, 4, 7, 11, 2, 4, 2, 0, 4, -1, -1, -1, -1, -1, -1, -1],
    [9, 0, 1, 8, 4, 7, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1],
    [4, 7, 11, 9, 4, 11, 9, 11, 2, 9, 2, 1, -1, -1, -1, -1],
    [3, 10, 1, 3, 11, 10, 7, 8, 4, -1, -1, -1, -1, -1, -1, -1],
    [1, 11, 10, 1, 4, 11, 1, 0, 4, 7, 11, 4, -1, -1, -1, -1],
    [4, 7, 8, 9, 0, 11, 9, 11, 10, 11, 0, 3, -1, -1, -1, -1],
    [4, 7, 11, 4, 11, 9, 9, 11, 10, -1, -1, -1, -1, -1, -1, -1],
    [9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [9, 5, 4, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 5, 4, 1, 5, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [8, 5, 4, 8, 3, 5, 3, 1, 5, -1, -1, -1, -1, -1, -1, -1],
    [1, 2, 10, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [3, 0, 8, 1, 2, 10, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1],
    [5, 2, 10, 5, 4, 2, 4, 0, 2, -1, -1, -1, -1, -1, -1, -1],
    [2, 10, 5, 3, 2, 5, 3, 5, 4, 3, 4, 8, -1, -1, -1, -1],
    [9, 5, 4, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 11, 2, 0, 8, 11, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1],
    [0, 5, 4, 0, 1, 5, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1],
    [2, 1, 5, 2, 5, 8, 2, 8, 11, 4, 8, 5, -1, -1, -1, -1],
    [10, 3, 11, 10, 1, 3, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1],
    [4, 9, 5, 0, 8, 1, 8, 10, 1, 8, 11, 10, -1, -1, -1, -1],
    [5, 4, 0, 5, 0, 11, 5, 11, 10, 11, 0, 3, -1, -1, -1, -1],
    [5, 4, 8, 5, 8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1],
    [9, 7, 8, 5, 7, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [9, 3, 0, 9, 5, 3, 5, 7, 3, -1, -1, -1, -1, -1, -1, -1],
    [0, 7, 8, 0, 1, 7, 1, 5, 7, -1, -1, -1, -1, -1, -1, -1],
    [1, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [9, 7, 8, 9, 5, 7, 10, 1, 2, -1, -1, -1, -1, -1, -1, -1],
    [10, 1, 2, 9, 5, 0, 5, 3, 0, 5, 7, 3, -1, -1, -1, -1],
    [8, 0, 2, 8, 2, 5, 8, 5, 7, 10, 5, 2, -1, -1, -1, -1],
    [2, 10, 5, 2, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1],
    [7, 9, 5, 7, 8, 9, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1],
    [9, 5, 7, 9, 7, 2, 9, 2, 0, 2, 7, 11, -1, -1, -1, -1],
    [2, 3, 11, 0, 1, 8, 1, 7, 8, 1, 5, 7, -1, -1, -1, -1],
    [11, 2, 1, 11, 1, 7, 7, 1, 5, -1, -1, -1, -1, -1, -1, -1],
    [9, 5, 8, 8, 5, 7, 10, 1, 3, 10, 3, 11, -1, -1, -1, -1],
    [5, 7, 0, 5, 0, 9, 7, 11, 0, 1, 0, 10, 11, 10, 0, -1],
    [11, 10, 0, 11, 0, 3, 10, 5, 0, 8, 0, 7, 5, 7, 0, -1],
    [11, 10, 5, 7, 11, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [10, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 8, 3, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [9, 0, 1, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 8, 3, 1, 9, 8, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1],
    [1, 6, 5, 2, 6, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 6, 5, 1, 2, 6, 3, 0, 8, -1, -1, -1, -1, -1, -1, -1],
    [9, 6, 5, 9, 0, 6, 0, 2, 6, -1, -1, -1, -1, -1, -1, -1],
    [5, 9, 8, 5, 8, 2, 5, 2, 6, 3, 2, 8, -1, -1, -1, -1],
    [2, 3, 11, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [11, 0, 8, 11, 2, 0, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1],
    [0, 1, 9, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1],
    [5, 10, 6, 1, 9, 2, 9, 11, 2, 9, 8, 11, -1, -1, -1, -1],
    [6, 3, 11, 6, 5, 3, 5, 1, 3, -1, -1, -1, -1, -1, -1, -1],
    [0, 8, 11, 0, 11, 5, 0, 5, 1, 5, 11, 6, -1, -1, -1, -1],
    [3, 11, 6, 0, 3, 6, 0, 6, 5, 0, 5, 9, -1, -1, -1, -1],
    [6, 5, 9, 6, 9, 11, 11, 9, 8, -1, -1, -1, -1, -1, -1, -1],
    [5, 10, 6, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [4, 3, 0, 4, 7, 3, 6, 5, 10, -1, -1, -1, -1, -1, -1, -1],
    [1, 9, 0, 5, 10, 6, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1],
    [10, 6, 5, 1, 9, 7, 1, 7, 3, 7, 9, 4, -1, -1, -1, -1],
    [6, 1, 2, 6, 5, 1, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1],
    [1, 2, 5, 5, 2, 6, 3, 0, 4, 3, 4, 7, -1, -1, -1, -1],
    [8, 4, 7, 9, 0, 5, 0, 6, 5, 0, 2, 6, -1, -1, -1, -1],
    [7, 3, 9, 7, 9, 4, 3, 2, 9, 5, 9, 6, 2, 6, 9, -1],
    [3, 11, 2, 7, 8, 4, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1],
    [5, 10, 6, 4, 7, 2, 4, 2, 0, 2, 7, 11, -1, -1, -1, -1],
    [0, 1, 9, 4, 7, 8, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1],
    [9, 2, 1, 9, 11, 2, 9, 4, 11, 7, 11, 4, 5, 10, 6, -1],
    [8, 4, 7, 3, 11, 5, 3, 5, 1, 5, 11, 6, -1, -1, -1, -1],
    [5, 1, 11, 5, 11, 6, 1, 0, 11, 7, 11, 4, 0, 4, 11, -1],
    [0, 5, 9, 0, 6, 5, 0, 3, 6, 11, 6, 3, 8, 4, 7, -1],
    [6, 5, 9, 6, 9, 11, 4, 7, 9, 7, 11, 9, -1, -1, -1, -1],
    [10, 4, 9, 6, 4, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [4, 10, 6, 4, 9, 10, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1],
    [10, 0, 1, 10, 6, 0, 6, 4, 0, -1, -1, -1, -1, -1, -1, -1],
    [8, 3, 1, 8, 1, 6, 8, 6, 4, 6, 1, 10, -1, -1, -1, -1],
    [1, 4, 9, 1, 2, 4, 2, 6, 4, -1, -1, -1, -1, -1, -1, -1],
    [3, 0, 8, 1, 2, 9, 2, 4, 9, 2, 6, 4, -1, -1, -1, -1],
    [0, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [8, 3, 2, 8, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1],
    [10, 4, 9, 10, 6, 4, 11, 2, 3, -1, -1, -1, -1, -1, -1, -1],
    [0, 8, 2, 2, 8, 11, 4, 9, 10, 4, 10, 6, -1, -1, -1, -1],
    [3, 11, 2, 0, 1, 6, 0, 6, 4, 6, 1, 10, -1, -1, -1, -1],
    [6, 4, 1, 6, 1, 10, 4, 8, 1, 2, 1, 11, 8, 11, 1, -1],
    [9, 6, 4, 9, 3, 6, 9, 1, 3, 11, 6, 3, -1, -1, -1, -1],
    [8, 11, 1, 8, 1, 0, 11, 6, 1, 9, 1, 4, 6, 4, 1, -1],
    [3, 11, 6, 3, 6, 0, 0, 6, 4, -1, -1, -1, -1, -1, -1, -1],
    [6, 4, 8, 11, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [7, 10, 6, 7, 8, 10, 8, 9, 10, -1, -1, -1, -1, -1, -1, -1],
    [0, 7, 3, 0, 10, 7, 0, 9, 10, 6, 7, 10, -1, -1, -1, -1],
    [10, 6, 7, 1, 10, 7, 1, 7, 8, 1, 8, 0, -1, -1, -1, -1],
    [10, 6, 7, 10, 7, 1, 1, 7, 3, -1, -1, -1, -1, -1, -1, -1],
    [1, 2, 6, 1, 6, 8, 1, 8, 9, 8, 6, 7, -1, -1, -1, -1],
    [2, 6, 9, 2, 9, 1, 6, 7, 9, 0, 9, 3, 7, 3, 9, -1],
    [7, 8, 0, 7, 0, 6, 6, 0, 2, -1, -1, -1, -1, -1, -1, -1],
    [7, 3, 2, 6, 7, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [2, 3, 11, 10, 6, 8, 10, 8, 9, 8, 6, 7, -1, -1, -1, -1],
    [2, 0, 7, 2, 7, 11, 0, 9, 7, 6, 7, 10, 9, 10, 7, -1],
    [1, 8, 0, 1, 7, 8, 1, 10, 7, 6, 7, 10, 2, 3, 11, -1],
    [11, 2, 1, 11, 1, 7, 10, 6, 1, 6, 7, 1, -1, -1, -1, -1],
    [8, 9, 6, 8, 6, 7, 9, 1, 6, 11, 6, 3, 1, 3, 6, -1],
    [0, 9, 1, 11, 6, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [7, 8, 0, 7, 0, 6, 3, 11, 0, 11, 6, 0, -1, -1, -1, -1],
    [7, 11, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [3, 0, 8, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 1, 9, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [8, 1, 9, 8, 3, 1, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1],
    [10, 1, 2, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 2, 10, 3, 0, 8, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1],
    [2, 9, 0, 2, 10, 9, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1],
    [6, 11, 7, 2, 10, 3, 10, 8, 3, 10, 9, 8, -1, -1, -1, -1],
    [7, 2, 3, 6, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [7, 0, 8, 7, 6, 0, 6, 2, 0, -1, -1, -1, -1, -1, -1, -1],
    [2, 7, 6, 2, 3, 7, 0, 1, 9, -1, -1, -1, -1, -1, -1, -1],
    [1, 6, 2, 1, 8, 6, 1, 9, 8, 8, 7, 6, -1, -1, -1, -1],
    [10, 7, 6, 10, 1, 7, 1, 3, 7, -1, -1, -1, -1, -1, -1, -1],
    [10, 7, 6, 1, 7, 10, 1, 8, 7, 1, 0, 8, -1, -1, -1, -1],
    [0, 3, 7, 0, 7, 10, 0, 10, 9, 6, 10, 7, -1, -1, -1, -1],
    [7, 6, 10, 7, 10, 8, 8, 10, 9, -1, -1, -1, -1, -1, -1, -1],
    [6, 8, 4, 11, 8, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [3, 6, 11, 3, 0, 6, 0, 4, 6, -1, -1, -1, -1, -1, -1, -1],
    [8, 6, 11, 8, 4, 6, 9, 0, 1, -1, -1, -1, -1, -1, -1, -1],
    [9, 4, 6, 9, 6, 3, 9, 3, 1, 11, 3, 6, -1, -1, -1, -1],
    [6, 8, 4, 6, 11, 8, 2, 10, 1, -1, -1, -1, -1, -1, -1, -1],
    [1, 2, 10, 3, 0, 11, 0, 6, 11, 0, 4, 6, -1, -1, -1, -1],
    [4, 11, 8, 4, 6, 11, 0, 2, 9, 2, 10, 9, -1, -1, -1, -1],
    [10, 9, 3, 10, 3, 2, 9, 4, 3, 11, 3, 6, 4, 6, 3, -1],
    [8, 2, 3, 8, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1],
    [0, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 9, 0, 2, 3, 4, 2, 4, 6, 4, 3, 8, -1, -1, -1, -1],
    [1, 9, 4, 1, 4, 2, 2, 4, 6, -1, -1, -1, -1, -1, -1, -1],
    [8, 1, 3, 8, 6, 1, 8, 4, 6, 6, 10, 1, -1, -1, -1, -1],
    [10, 1, 0, 10, 0, 6, 6, 0, 4, -1, -1, -1, -1, -1, -1, -1],
    [4, 6, 3, 4, 3, 8, 6, 10, 3, 0, 3, 9, 10, 9, 3, -1],
    [10, 9, 4, 6, 10, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [4, 9, 5, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 8, 3, 4, 9, 5, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1],
    [5, 0, 1, 5, 4, 0, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1],
    [11, 7, 6, 8, 3, 4, 3, 5, 4, 3, 1, 5, -1, -1, -1, -1],
    [9, 5, 4, 10, 1, 2, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1],
    [6, 11, 7, 1, 2, 10, 0, 8, 3, 4, 9, 5, -1, -1, -1, -1],
    [7, 6, 11, 5, 4, 10, 4, 2, 10, 4, 0, 2, -1, -1, -1, -1],
    [3, 4, 8, 3, 5, 4, 3, 2, 5, 10, 5, 2, 11, 7, 6, -1],
    [7, 2, 3, 7, 6, 2, 5, 4, 9, -1, -1, -1, -1, -1, -1, -1],
    [9, 5, 4, 0, 8, 6, 0, 6, 2, 6, 8, 7, -1, -1, -1, -1],
    [3, 6, 2, 3, 7, 6, 1, 5, 0, 5, 4, 0, -1, -1, -1, -1],
    [6, 2, 8, 6, 8, 7, 2, 1, 8, 4, 8, 5, 1, 5, 8, -1],
    [9, 5, 4, 10, 1, 6, 1, 7, 6, 1, 3, 7, -1, -1, -1, -1],
    [1, 6, 10, 1, 7, 6, 1, 0, 7, 8, 7, 0, 9, 5, 4, -1],
    [4, 0, 10, 4, 10, 5, 0, 3, 10, 6, 10, 7, 3, 7, 10, -1],
    [7, 6, 10, 7, 10, 8, 5, 4, 10, 4, 8, 10, -1, -1, -1, -1],
    [6, 9, 5, 6, 11, 9, 11, 8, 9, -1, -1, -1, -1, -1, -1, -1],
    [3, 6, 11, 0, 6, 3, 0, 5, 6, 0, 9, 5, -1, -1, -1, -1],
    [0, 11, 8, 0, 5, 11, 0, 1, 5, 5, 6, 11, -1, -1, -1, -1],
    [6, 11, 3, 6, 3, 5, 5, 3, 1, -1, -1, -1, -1, -1, -1, -1],
    [1, 2, 10, 9, 5, 11, 9, 11, 8, 11, 5, 6, -1, -1, -1, -1],
    [0, 11, 3, 0, 6, 11, 0, 9, 6, 5, 6, 9, 1, 2, 10, -1],
    [11, 8, 5, 11, 5, 6, 8, 0, 5, 10, 5, 2, 0, 2, 5, -1],
    [6, 11, 3, 6, 3, 5, 2, 10, 3, 10, 5, 3, -1, -1, -1, -1],
    [5, 8, 9, 5, 2, 8, 5, 6, 2, 3, 8, 2, -1, -1, -1, -1],
    [9, 5, 6, 9, 6, 0, 0, 6, 2, -1, -1, -1, -1, -1, -1, -1],
    [1, 5, 8, 1, 8, 0, 5, 6, 8, 3, 8, 2, 6, 2, 8, -1],
    [1, 5, 6, 2, 1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 3, 6, 1, 6, 10, 3, 8, 6, 5, 6, 9, 8, 9, 6, -1],
    [10, 1, 0, 10, 0, 6, 9, 5, 0, 5, 6, 0, -1, -1, -1, -1],
    [0, 3, 8, 5, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [10, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [11, 5, 10, 7, 5, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [11, 5, 10, 11, 7, 5, 8, 3, 0, -1, -1, -1, -1, -1, -1, -1],
    [5, 11, 7, 5, 10, 11, 1, 9, 0, -1, -1, -1, -1, -1, -1, -1],
    [10, 7, 5, 10, 11, 7, 9, 8, 1, 8, 3, 1, -1, -1, -1, -1],
    [11, 1, 2, 11, 7, 1, 7, 5, 1, -1, -1, -1, -1, -1, -1, -1],
    [0, 8, 3, 1, 2, 7, 1, 7, 5, 7, 2, 11, -1, -1, -1, -1],
    [9, 7, 5, 9, 2, 7, 9, 0, 2, 2, 11, 7, -1, -1, -1, -1],
    [7, 5, 2, 7, 2, 11, 5, 9, 2, 3, 2, 8, 9, 8, 2, -1],
    [2, 5, 10, 2, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1],
    [8, 2, 0, 8, 5, 2, 8, 7, 5, 10, 2, 5, -1, -1, -1, -1],
    [9, 0, 1, 5, 10, 3, 5, 3, 7, 3, 10, 2, -1, -1, -1, -1],
    [9, 8, 2, 9, 2, 1, 8, 7, 2, 10, 2, 5, 7, 5, 2, -1],
    [1, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 8, 7, 0, 7, 1, 1, 7, 5, -1, -1, -1, -1, -1, -1, -1],
    [9, 0, 3, 9, 3, 5, 5, 3, 7, -1, -1, -1, -1, -1, -1, -1],
    [9, 8, 7, 5, 9, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [5, 8, 4, 5, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1],
    [5, 0, 4, 5, 11, 0, 5, 10, 11, 11, 3, 0, -1, -1, -1, -1],
    [0, 1, 9, 8, 4, 10, 8, 10, 11, 10, 4, 5, -1, -1, -1, -1],
    [10, 11, 4, 10, 4, 5, 11, 3, 4, 9, 4, 1, 3, 1, 4, -1],
    [2, 5, 1, 2, 8, 5, 2, 11, 8, 4, 5, 8, -1, -1, -1, -1],
    [0, 4, 11, 0, 11, 3, 4, 5, 11, 2, 11, 1, 5, 1, 11, -1],
    [0, 2, 5, 0, 5, 9, 2, 11, 5, 4, 5, 8, 11, 8, 5, -1],
    [9, 4, 5, 2, 11, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [2, 5, 10, 3, 5, 2, 3, 4, 5, 3, 8, 4, -1, -1, -1, -1],
    [5, 10, 2, 5, 2, 4, 4, 2, 0, -1, -1, -1, -1, -1, -1, -1],
    [3, 10, 2, 3, 5, 10, 3, 8, 5, 4, 5, 8, 0, 1, 9, -1],
    [5, 10, 2, 5, 2, 4, 1, 9, 2, 9, 4, 2, -1, -1, -1, -1],
    [8, 4, 5, 8, 5, 3, 3, 5, 1, -1, -1, -1, -1, -1, -1, -1],
    [0, 4, 5, 1, 0, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [8, 4, 5, 8, 5, 3, 9, 0, 5, 0, 3, 5, -1, -1, -1, -1],
    [9, 4, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [4, 11, 7, 4, 9, 11, 9, 10, 11, -1, -1, -1, -1, -1, -1, -1],
    [0, 8, 3, 4, 9, 7, 9, 11, 7, 9, 10, 11, -1, -1, -1, -1],
    [1, 10, 11, 1, 11, 4, 1, 4, 0, 7, 4, 11, -1, -1, -1, -1],
    [3, 1, 4, 3, 4, 8, 1, 10, 4, 7, 4, 11, 10, 11, 4, -1],
    [4, 11, 7, 9, 11, 4, 9, 2, 11, 9, 1, 2, -1, -1, -1, -1],
    [9, 7, 4, 9, 11, 7, 9, 1, 11, 2, 11, 1, 0, 8, 3, -1],
    [11, 7, 4, 11, 4, 2, 2, 4, 0, -1, -1, -1, -1, -1, -1, -1],
    [11, 7, 4, 11, 4, 2, 8, 3, 4, 3, 2, 4, -1, -1, -1, -1],
    [2, 9, 10, 2, 7, 9, 2, 3, 7, 7, 4, 9, -1, -1, -1, -1],
    [9, 10, 7, 9, 7, 4, 10, 2, 7, 8, 7, 0, 2, 0, 7, -1],
    [3, 7, 10, 3, 10, 2, 7, 4, 10, 1, 10, 0, 4, 0, 10, -1],
    [1, 10, 2, 8, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [4, 9, 1, 4, 1, 7, 7, 1, 3, -1, -1, -1, -1, -1, -1, -1],
    [4, 9, 1, 4, 1, 7, 0, 8, 1, 8, 7, 1, -1, -1, -1, -1],
    [4, 0, 3, 7, 4, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [4, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [9, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [3, 0, 9, 3, 9, 11, 11, 9, 10, -1, -1, -1, -1, -1, -1, -1],
    [0, 1, 10, 0, 10, 8, 8, 10, 11, -1, -1, -1, -1, -1, -1, -1],
    [3, 1, 10, 11, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 2, 11, 1, 11, 9, 9, 11, 8, -1, -1, -1, -1, -1, -1, -1],
    [3, 0, 9, 3, 9, 11, 1, 2, 9, 2, 11, 9, -1, -1, -1, -1],
    [0, 2, 11, 8, 0, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [3, 2, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [2, 3, 8, 2, 8, 10, 10, 8, 9, -1, -1, -1, -1, -1, -1, -1],
    [9, 10, 2, 0, 9, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [2, 3, 8, 2, 8, 10, 0, 1, 8, 1, 10, 8, -1, -1, -1, -1],
    [1, 10, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 3, 8, 9, 1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 9, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [0, 3, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  ];
  var cornerIdxAFromEdge = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    0,
    1,
    2,
    3
  ];
  var cornerIdxBFromEdge = [
    1,
    2,
    3,
    0,
    5,
    6,
    7,
    4,
    4,
    5,
    6,
    7
  ];
  var getEdgeCornerIndices = (edgeIdx) => [
    cornerIdxAFromEdge[edgeIdx],
    cornerIdxBFromEdge[edgeIdx]
  ];

  // src/voxel/marching-cubes.ts
  var getEdgeConfigIdx = (cornerValues) => cornerValues.reduce((sum, val, idx) => val ? sum + (1 << idx) : sum, 0);
  var getEdgeConfig = (cornerValues) => triangulationTable[getEdgeConfigIdx(cornerValues)];
  var interpolateVectors = (...vectors) => vectors.reduce((sum, vec) => sum.add(vec), Vector3.Zero()).scale(1 / vectors.length);
  var getTriangles = (corners) => {
    const cornerIntensities = corners.map((x) => x.isEnabled);
    const edgeConfig = getEdgeConfig(cornerIntensities);
    const triangles = [];
    for (let idx = 0; edgeConfig[idx] !== -1; idx += 3) {
      const [a0, b0] = getEdgeCornerIndices(edgeConfig[idx]);
      const [a1, b1] = getEdgeCornerIndices(edgeConfig[idx + 1]);
      const [a2, b2] = getEdgeCornerIndices(edgeConfig[idx + 2]);
      triangles.push([
        interpolateVectors(corners[a0].position, corners[b0].position),
        interpolateVectors(corners[a1].position, corners[b1].position),
        interpolateVectors(corners[a2].position, corners[b2].position)
      ]);
    }
    return triangles;
  };
})();
