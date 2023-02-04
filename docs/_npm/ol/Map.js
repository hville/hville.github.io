// ../node_modules/ol/Disposable.js
var Disposable = function() {
  function Disposable2() {
    this.disposed = false;
  }
  Disposable2.prototype.dispose = function() {
    if (!this.disposed) {
      this.disposed = true;
      this.disposeInternal();
    }
  };
  Disposable2.prototype.disposeInternal = function() {
  };
  return Disposable2;
}();
var Disposable_default = Disposable;

// ../node_modules/ol/array.js
function numberSafeCompareFunction(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
function linearFindNearest(arr, target, direction) {
  var n = arr.length;
  if (arr[0] <= target) {
    return 0;
  } else if (target <= arr[n - 1]) {
    return n - 1;
  } else {
    var i = void 0;
    if (direction > 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] < target) {
          return i - 1;
        }
      }
    } else if (direction < 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] <= target) {
          return i;
        }
      }
    } else {
      for (i = 1; i < n; ++i) {
        if (arr[i] == target) {
          return i;
        } else if (arr[i] < target) {
          if (typeof direction === "function") {
            if (direction(target, arr[i - 1], arr[i]) > 0) {
              return i - 1;
            } else {
              return i;
            }
          } else if (arr[i - 1] - target < target - arr[i]) {
            return i - 1;
          } else {
            return i;
          }
        }
      }
    }
    return n - 1;
  }
}
function extend(arr, data) {
  var extension = Array.isArray(data) ? data : [data];
  var length = extension.length;
  for (var i = 0; i < length; i++) {
    arr[arr.length] = extension[i];
  }
}
function equals(arr1, arr2) {
  var len1 = arr1.length;
  if (len1 !== arr2.length) {
    return false;
  }
  for (var i = 0; i < len1; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

// ../node_modules/ol/functions.js
function TRUE() {
  return true;
}
function FALSE() {
  return false;
}
function VOID() {
}
function memoizeOne(fn) {
  var called = false;
  var lastResult;
  var lastArgs;
  var lastThis;
  return function() {
    var nextArgs = Array.prototype.slice.call(arguments);
    if (!called || this !== lastThis || !equals(nextArgs, lastArgs)) {
      called = true;
      lastThis = this;
      lastArgs = nextArgs;
      lastResult = fn.apply(this, arguments);
    }
    return lastResult;
  };
}

// ../node_modules/ol/util.js
function abstract() {
  return function() {
    throw new Error("Unimplemented abstract method.");
  }();
}
var uidCounter_ = 0;
function getUid(obj) {
  return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
}
var VERSION = "6.14.1";

// ../node_modules/ol/has.js
var ua = typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined" ? navigator.userAgent.toLowerCase() : "";
var FIREFOX = ua.indexOf("firefox") !== -1;
var SAFARI = ua.indexOf("safari") !== -1 && ua.indexOf("chrom") == -1;
var SAFARI_BUG_237906 = SAFARI && !!(ua.indexOf("version/15.4") >= 0 || ua.match(/cpu (os|iphone os) 15_4 like mac os x/));
var WEBKIT = ua.indexOf("webkit") !== -1 && ua.indexOf("edge") == -1;
var MAC = ua.indexOf("macintosh") !== -1;
var DEVICE_PIXEL_RATIO = typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1;
var WORKER_OFFSCREEN_CANVAS = typeof WorkerGlobalScope !== "undefined" && typeof OffscreenCanvas !== "undefined" && self instanceof WorkerGlobalScope;
var IMAGE_DECODE = typeof Image !== "undefined" && Image.prototype.decode;
var PASSIVE_EVENT_LISTENERS = function() {
  var passive = false;
  try {
    var options = Object.defineProperty({}, "passive", {
      get: function() {
        passive = true;
      }
    });
    window.addEventListener("_", null, options);
    window.removeEventListener("_", null, options);
  } catch (error) {
  }
  return passive;
}();

// ../node_modules/ol/AssertionError.js
var __extends = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var AssertionError = function(_super) {
  __extends(AssertionError2, _super);
  function AssertionError2(code) {
    var _this = this;
    var path = VERSION === "latest" ? VERSION : "v" + VERSION.split("-")[0];
    var message = "Assertion failed. See https://openlayers.org/en/" + path + "/doc/errors/#" + code + " for details.";
    _this = _super.call(this, message) || this;
    _this.code = code;
    _this.name = "AssertionError";
    _this.message = message;
    return _this;
  }
  return AssertionError2;
}(Error);
var AssertionError_default = AssertionError;

// ../node_modules/ol/asserts.js
function assert(assertion, errorCode) {
  if (!assertion) {
    throw new AssertionError_default(errorCode);
  }
}

// ../node_modules/ol/transform.js
var tmp_ = new Array(6);
function create() {
  return [1, 0, 0, 1, 0, 0];
}
function apply(transform2, coordinate) {
  var x = coordinate[0];
  var y = coordinate[1];
  coordinate[0] = transform2[0] * x + transform2[2] * y + transform2[4];
  coordinate[1] = transform2[1] * x + transform2[3] * y + transform2[5];
  return coordinate;
}
function compose(transform2, dx1, dy1, sx, sy, angle, dx2, dy2) {
  var sin = Math.sin(angle);
  var cos = Math.cos(angle);
  transform2[0] = sx * cos;
  transform2[1] = sy * sin;
  transform2[2] = -sx * sin;
  transform2[3] = sy * cos;
  transform2[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
  transform2[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
  return transform2;
}
function makeInverse(target, source) {
  var det = determinant(source);
  assert(det !== 0, 32);
  var a = source[0];
  var b = source[1];
  var c = source[2];
  var d = source[3];
  var e = source[4];
  var f = source[5];
  target[0] = d / det;
  target[1] = -b / det;
  target[2] = -c / det;
  target[3] = a / det;
  target[4] = (c * f - d * e) / det;
  target[5] = -(a * f - b * e) / det;
  return target;
}
function determinant(mat) {
  return mat[0] * mat[3] - mat[1] * mat[2];
}

// ../node_modules/ol/extent/Relationship.js
var Relationship_default = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};

// ../node_modules/ol/extent.js
function _boundingExtentXYs(xs, ys, opt_extent) {
  var minX = Math.min.apply(null, xs);
  var minY = Math.min.apply(null, ys);
  var maxX = Math.max.apply(null, xs);
  var maxY = Math.max.apply(null, ys);
  return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
}
function clone(extent, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0];
    opt_extent[1] = extent[1];
    opt_extent[2] = extent[2];
    opt_extent[3] = extent[3];
    return opt_extent;
  } else {
    return extent.slice();
  }
}
function closestSquaredDistanceXY(extent, x, y) {
  var dx, dy;
  if (x < extent[0]) {
    dx = extent[0] - x;
  } else if (extent[2] < x) {
    dx = x - extent[2];
  } else {
    dx = 0;
  }
  if (y < extent[1]) {
    dy = extent[1] - y;
  } else if (extent[3] < y) {
    dy = y - extent[3];
  } else {
    dy = 0;
  }
  return dx * dx + dy * dy;
}
function containsExtent(extent1, extent2) {
  return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
}
function containsXY(extent, x, y) {
  return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
}
function coordinateRelationship(extent, coordinate) {
  var minX = extent[0];
  var minY = extent[1];
  var maxX = extent[2];
  var maxY = extent[3];
  var x = coordinate[0];
  var y = coordinate[1];
  var relationship = Relationship_default.UNKNOWN;
  if (x < minX) {
    relationship = relationship | Relationship_default.LEFT;
  } else if (x > maxX) {
    relationship = relationship | Relationship_default.RIGHT;
  }
  if (y < minY) {
    relationship = relationship | Relationship_default.BELOW;
  } else if (y > maxY) {
    relationship = relationship | Relationship_default.ABOVE;
  }
  if (relationship === Relationship_default.UNKNOWN) {
    relationship = Relationship_default.INTERSECTING;
  }
  return relationship;
}
function createEmpty() {
  return [Infinity, Infinity, -Infinity, -Infinity];
}
function createOrUpdate(minX, minY, maxX, maxY, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = minX;
    opt_extent[1] = minY;
    opt_extent[2] = maxX;
    opt_extent[3] = maxY;
    return opt_extent;
  } else {
    return [minX, minY, maxX, maxY];
  }
}
function createOrUpdateEmpty(opt_extent) {
  return createOrUpdate(Infinity, Infinity, -Infinity, -Infinity, opt_extent);
}
function createOrUpdateFromCoordinate(coordinate, opt_extent) {
  var x = coordinate[0];
  var y = coordinate[1];
  return createOrUpdate(x, y, x, y, opt_extent);
}
function createOrUpdateFromFlatCoordinates(flatCoordinates, offset, end, stride, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendFlatCoordinates(extent, flatCoordinates, offset, end, stride);
}
function equals2(extent1, extent2) {
  return extent1[0] == extent2[0] && extent1[2] == extent2[2] && extent1[1] == extent2[1] && extent1[3] == extent2[3];
}
function extendFlatCoordinates(extent, flatCoordinates, offset, end, stride) {
  for (; offset < end; offset += stride) {
    extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
  }
  return extent;
}
function extendXY(extent, x, y) {
  extent[0] = Math.min(extent[0], x);
  extent[1] = Math.min(extent[1], y);
  extent[2] = Math.max(extent[2], x);
  extent[3] = Math.max(extent[3], y);
}
function forEachCorner(extent, callback) {
  var val;
  val = callback(getBottomLeft(extent));
  if (val) {
    return val;
  }
  val = callback(getBottomRight(extent));
  if (val) {
    return val;
  }
  val = callback(getTopRight(extent));
  if (val) {
    return val;
  }
  val = callback(getTopLeft(extent));
  if (val) {
    return val;
  }
  return false;
}
function getBottomLeft(extent) {
  return [extent[0], extent[1]];
}
function getBottomRight(extent) {
  return [extent[2], extent[1]];
}
function getCenter(extent) {
  return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
}
function getForViewAndSize(center, resolution, rotation, size, opt_extent) {
  var dx = resolution * size[0] / 2;
  var dy = resolution * size[1] / 2;
  var cosRotation = Math.cos(rotation);
  var sinRotation = Math.sin(rotation);
  var xCos = dx * cosRotation;
  var xSin = dx * sinRotation;
  var yCos = dy * cosRotation;
  var ySin = dy * sinRotation;
  var x = center[0];
  var y = center[1];
  var x0 = x - xCos + ySin;
  var x1 = x - xCos - ySin;
  var x2 = x + xCos - ySin;
  var x3 = x + xCos + ySin;
  var y0 = y - xSin - yCos;
  var y1 = y - xSin + yCos;
  var y2 = y + xSin + yCos;
  var y3 = y + xSin - yCos;
  return createOrUpdate(Math.min(x0, x1, x2, x3), Math.min(y0, y1, y2, y3), Math.max(x0, x1, x2, x3), Math.max(y0, y1, y2, y3), opt_extent);
}
function getHeight(extent) {
  return extent[3] - extent[1];
}
function getIntersection(extent1, extent2, opt_extent) {
  var intersection = opt_extent ? opt_extent : createEmpty();
  if (intersects(extent1, extent2)) {
    if (extent1[0] > extent2[0]) {
      intersection[0] = extent1[0];
    } else {
      intersection[0] = extent2[0];
    }
    if (extent1[1] > extent2[1]) {
      intersection[1] = extent1[1];
    } else {
      intersection[1] = extent2[1];
    }
    if (extent1[2] < extent2[2]) {
      intersection[2] = extent1[2];
    } else {
      intersection[2] = extent2[2];
    }
    if (extent1[3] < extent2[3]) {
      intersection[3] = extent1[3];
    } else {
      intersection[3] = extent2[3];
    }
  } else {
    createOrUpdateEmpty(intersection);
  }
  return intersection;
}
function getTopLeft(extent) {
  return [extent[0], extent[3]];
}
function getTopRight(extent) {
  return [extent[2], extent[3]];
}
function getWidth(extent) {
  return extent[2] - extent[0];
}
function intersects(extent1, extent2) {
  return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
}
function isEmpty(extent) {
  return extent[2] < extent[0] || extent[3] < extent[1];
}
function returnOrUpdate(extent, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0];
    opt_extent[1] = extent[1];
    opt_extent[2] = extent[2];
    opt_extent[3] = extent[3];
    return opt_extent;
  } else {
    return extent;
  }
}
function intersectsSegment(extent, start, end) {
  var intersects2 = false;
  var startRel = coordinateRelationship(extent, start);
  var endRel = coordinateRelationship(extent, end);
  if (startRel === Relationship_default.INTERSECTING || endRel === Relationship_default.INTERSECTING) {
    intersects2 = true;
  } else {
    var minX = extent[0];
    var minY = extent[1];
    var maxX = extent[2];
    var maxY = extent[3];
    var startX = start[0];
    var startY = start[1];
    var endX = end[0];
    var endY = end[1];
    var slope = (endY - startY) / (endX - startX);
    var x = void 0, y = void 0;
    if (!!(endRel & Relationship_default.ABOVE) && !(startRel & Relationship_default.ABOVE)) {
      x = endX - (endY - maxY) / slope;
      intersects2 = x >= minX && x <= maxX;
    }
    if (!intersects2 && !!(endRel & Relationship_default.RIGHT) && !(startRel & Relationship_default.RIGHT)) {
      y = endY - (endX - maxX) * slope;
      intersects2 = y >= minY && y <= maxY;
    }
    if (!intersects2 && !!(endRel & Relationship_default.BELOW) && !(startRel & Relationship_default.BELOW)) {
      x = endX - (endY - minY) / slope;
      intersects2 = x >= minX && x <= maxX;
    }
    if (!intersects2 && !!(endRel & Relationship_default.LEFT) && !(startRel & Relationship_default.LEFT)) {
      y = endY - (endX - minX) * slope;
      intersects2 = y >= minY && y <= maxY;
    }
  }
  return intersects2;
}
function applyTransform(extent, transformFn, opt_extent, opt_stops) {
  var coordinates2 = [];
  if (opt_stops > 1) {
    var width = extent[2] - extent[0];
    var height = extent[3] - extent[1];
    for (var i = 0; i < opt_stops; ++i) {
      coordinates2.push(extent[0] + width * i / opt_stops, extent[1], extent[2], extent[1] + height * i / opt_stops, extent[2] - width * i / opt_stops, extent[3], extent[0], extent[3] - height * i / opt_stops);
    }
  } else {
    coordinates2 = [
      extent[0],
      extent[1],
      extent[2],
      extent[1],
      extent[2],
      extent[3],
      extent[0],
      extent[3]
    ];
  }
  transformFn(coordinates2, coordinates2, 2);
  var xs = [];
  var ys = [];
  for (var i = 0, l = coordinates2.length; i < l; i += 2) {
    xs.push(coordinates2[i]);
    ys.push(coordinates2[i + 1]);
  }
  return _boundingExtentXYs(xs, ys, opt_extent);
}

// ../node_modules/ol/math.js
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
var cosh = function() {
  var cosh2;
  if ("cosh" in Math) {
    cosh2 = Math.cosh;
  } else {
    cosh2 = function(x) {
      var y = Math.exp(x);
      return (y + 1 / y) / 2;
    };
  }
  return cosh2;
}();
var log2 = function() {
  var log22;
  if ("log2" in Math) {
    log22 = Math.log2;
  } else {
    log22 = function(x) {
      return Math.log(x) * Math.LOG2E;
    };
  }
  return log22;
}();
function squaredSegmentDistance(x, y, x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  if (dx !== 0 || dy !== 0) {
    var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x1 = x2;
      y1 = y2;
    } else if (t > 0) {
      x1 += dx * t;
      y1 += dy * t;
    }
  }
  return squaredDistance(x, y, x1, y1);
}
function squaredDistance(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return dx * dx + dy * dy;
}
function toRadians(angleInDegrees) {
  return angleInDegrees * Math.PI / 180;
}
function modulo(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r;
}
function lerp(a, b, x) {
  return a + x * (b - a);
}

// ../node_modules/ol/color.js
var HEX_COLOR_RE_ = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i;
var NAMED_COLOR_RE_ = /^([a-z]*)$|^hsla?\(.*\)$/i;
function asString(color) {
  if (typeof color === "string") {
    return color;
  } else {
    return toString(color);
  }
}
function fromNamed(color) {
  var el = document.createElement("div");
  el.style.color = color;
  if (el.style.color !== "") {
    document.body.appendChild(el);
    var rgb = getComputedStyle(el).color;
    document.body.removeChild(el);
    return rgb;
  } else {
    return "";
  }
}
var fromString = function() {
  var MAX_CACHE_SIZE = 1024;
  var cache2 = {};
  var cacheSize = 0;
  return function(s) {
    var color;
    if (cache2.hasOwnProperty(s)) {
      color = cache2[s];
    } else {
      if (cacheSize >= MAX_CACHE_SIZE) {
        var i = 0;
        for (var key in cache2) {
          if ((i++ & 3) === 0) {
            delete cache2[key];
            --cacheSize;
          }
        }
      }
      color = fromStringInternal_(s);
      cache2[s] = color;
      ++cacheSize;
    }
    return color;
  };
}();
function fromStringInternal_(s) {
  var r, g, b, a, color;
  if (NAMED_COLOR_RE_.exec(s)) {
    s = fromNamed(s);
  }
  if (HEX_COLOR_RE_.exec(s)) {
    var n = s.length - 1;
    var d = void 0;
    if (n <= 4) {
      d = 1;
    } else {
      d = 2;
    }
    var hasAlpha = n === 4 || n === 8;
    r = parseInt(s.substr(1 + 0 * d, d), 16);
    g = parseInt(s.substr(1 + 1 * d, d), 16);
    b = parseInt(s.substr(1 + 2 * d, d), 16);
    if (hasAlpha) {
      a = parseInt(s.substr(1 + 3 * d, d), 16);
    } else {
      a = 255;
    }
    if (d == 1) {
      r = (r << 4) + r;
      g = (g << 4) + g;
      b = (b << 4) + b;
      if (hasAlpha) {
        a = (a << 4) + a;
      }
    }
    color = [r, g, b, a / 255];
  } else if (s.indexOf("rgba(") == 0) {
    color = s.slice(5, -1).split(",").map(Number);
    normalize(color);
  } else if (s.indexOf("rgb(") == 0) {
    color = s.slice(4, -1).split(",").map(Number);
    color.push(1);
    normalize(color);
  } else {
    assert(false, 14);
  }
  return color;
}
function normalize(color) {
  color[0] = clamp(color[0] + 0.5 | 0, 0, 255);
  color[1] = clamp(color[1] + 0.5 | 0, 0, 255);
  color[2] = clamp(color[2] + 0.5 | 0, 0, 255);
  color[3] = clamp(color[3], 0, 1);
  return color;
}
function toString(color) {
  var r = color[0];
  if (r != (r | 0)) {
    r = r + 0.5 | 0;
  }
  var g = color[1];
  if (g != (g | 0)) {
    g = g + 0.5 | 0;
  }
  var b = color[2];
  if (b != (b | 0)) {
    b = b + 0.5 | 0;
  }
  var a = color[3] === void 0 ? 1 : Math.round(color[3] * 100) / 100;
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

// ../node_modules/ol/style/IconImageCache.js
var IconImageCache = function() {
  function IconImageCache2() {
    this.cache_ = {};
    this.cacheSize_ = 0;
    this.maxCacheSize_ = 32;
  }
  IconImageCache2.prototype.clear = function() {
    this.cache_ = {};
    this.cacheSize_ = 0;
  };
  IconImageCache2.prototype.canExpireCache = function() {
    return this.cacheSize_ > this.maxCacheSize_;
  };
  IconImageCache2.prototype.expire = function() {
    if (this.canExpireCache()) {
      var i = 0;
      for (var key in this.cache_) {
        var iconImage = this.cache_[key];
        if ((i++ & 3) === 0 && !iconImage.hasListener()) {
          delete this.cache_[key];
          --this.cacheSize_;
        }
      }
    }
  };
  IconImageCache2.prototype.get = function(src, crossOrigin, color) {
    var key = getKey(src, crossOrigin, color);
    return key in this.cache_ ? this.cache_[key] : null;
  };
  IconImageCache2.prototype.set = function(src, crossOrigin, color, iconImage) {
    var key = getKey(src, crossOrigin, color);
    this.cache_[key] = iconImage;
    ++this.cacheSize_;
  };
  IconImageCache2.prototype.setSize = function(maxCacheSize) {
    this.maxCacheSize_ = maxCacheSize;
    this.expire();
  };
  return IconImageCache2;
}();
function getKey(src, crossOrigin, color) {
  var colorString = color ? asString(color) : "null";
  return crossOrigin + ":" + src + ":" + colorString;
}
var shared = new IconImageCache();

// ../node_modules/ol/events/Event.js
var BaseEvent = function() {
  function BaseEvent2(type) {
    this.propagationStopped;
    this.defaultPrevented;
    this.type = type;
    this.target = null;
  }
  BaseEvent2.prototype.preventDefault = function() {
    this.defaultPrevented = true;
  };
  BaseEvent2.prototype.stopPropagation = function() {
    this.propagationStopped = true;
  };
  return BaseEvent2;
}();
var Event_default = BaseEvent;

// ../node_modules/ol/ObjectEventType.js
var ObjectEventType_default = {
  PROPERTYCHANGE: "propertychange"
};

// ../node_modules/ol/obj.js
var assign = typeof Object.assign === "function" ? Object.assign : function(target, var_sources) {
  if (target === void 0 || target === null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  var output = Object(target);
  for (var i = 1, ii = arguments.length; i < ii; ++i) {
    var source = arguments[i];
    if (source !== void 0 && source !== null) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          output[key] = source[key];
        }
      }
    }
  }
  return output;
};
function clear(object) {
  for (var property in object) {
    delete object[property];
  }
}
var getValues = typeof Object.values === "function" ? Object.values : function(object) {
  var values = [];
  for (var property in object) {
    values.push(object[property]);
  }
  return values;
};
function isEmpty2(object) {
  var property;
  for (property in object) {
    return false;
  }
  return !property;
}

// ../node_modules/ol/events/Target.js
var __extends2 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Target = function(_super) {
  __extends2(Target2, _super);
  function Target2(opt_target) {
    var _this = _super.call(this) || this;
    _this.eventTarget_ = opt_target;
    _this.pendingRemovals_ = null;
    _this.dispatching_ = null;
    _this.listeners_ = null;
    return _this;
  }
  Target2.prototype.addEventListener = function(type, listener) {
    if (!type || !listener) {
      return;
    }
    var listeners = this.listeners_ || (this.listeners_ = {});
    var listenersForType = listeners[type] || (listeners[type] = []);
    if (listenersForType.indexOf(listener) === -1) {
      listenersForType.push(listener);
    }
  };
  Target2.prototype.dispatchEvent = function(event) {
    var isString = typeof event === "string";
    var type = isString ? event : event.type;
    var listeners = this.listeners_ && this.listeners_[type];
    if (!listeners) {
      return;
    }
    var evt = isString ? new Event_default(event) : event;
    if (!evt.target) {
      evt.target = this.eventTarget_ || this;
    }
    var dispatching = this.dispatching_ || (this.dispatching_ = {});
    var pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});
    if (!(type in dispatching)) {
      dispatching[type] = 0;
      pendingRemovals[type] = 0;
    }
    ++dispatching[type];
    var propagate;
    for (var i = 0, ii = listeners.length; i < ii; ++i) {
      if ("handleEvent" in listeners[i]) {
        propagate = listeners[i].handleEvent(evt);
      } else {
        propagate = listeners[i].call(this, evt);
      }
      if (propagate === false || evt.propagationStopped) {
        propagate = false;
        break;
      }
    }
    if (--dispatching[type] === 0) {
      var pr = pendingRemovals[type];
      delete pendingRemovals[type];
      while (pr--) {
        this.removeEventListener(type, VOID);
      }
      delete dispatching[type];
    }
    return propagate;
  };
  Target2.prototype.disposeInternal = function() {
    this.listeners_ && clear(this.listeners_);
  };
  Target2.prototype.getListeners = function(type) {
    return this.listeners_ && this.listeners_[type] || void 0;
  };
  Target2.prototype.hasListener = function(opt_type) {
    if (!this.listeners_) {
      return false;
    }
    return opt_type ? opt_type in this.listeners_ : Object.keys(this.listeners_).length > 0;
  };
  Target2.prototype.removeEventListener = function(type, listener) {
    var listeners = this.listeners_ && this.listeners_[type];
    if (listeners) {
      var index = listeners.indexOf(listener);
      if (index !== -1) {
        if (this.pendingRemovals_ && type in this.pendingRemovals_) {
          listeners[index] = VOID;
          ++this.pendingRemovals_[type];
        } else {
          listeners.splice(index, 1);
          if (listeners.length === 0) {
            delete this.listeners_[type];
          }
        }
      }
    }
  };
  return Target2;
}(Disposable_default);
var Target_default = Target;

// ../node_modules/ol/events/EventType.js
var EventType_default = {
  CHANGE: "change",
  ERROR: "error",
  BLUR: "blur",
  CLEAR: "clear",
  CONTEXTMENU: "contextmenu",
  CLICK: "click",
  DBLCLICK: "dblclick",
  DRAGENTER: "dragenter",
  DRAGOVER: "dragover",
  DROP: "drop",
  FOCUS: "focus",
  KEYDOWN: "keydown",
  KEYPRESS: "keypress",
  LOAD: "load",
  RESIZE: "resize",
  TOUCHMOVE: "touchmove",
  WHEEL: "wheel"
};

// ../node_modules/ol/events.js
function listen(target, type, listener, opt_this, opt_once) {
  if (opt_this && opt_this !== target) {
    listener = listener.bind(opt_this);
  }
  if (opt_once) {
    var originalListener_1 = listener;
    listener = function() {
      target.removeEventListener(type, listener);
      originalListener_1.apply(this, arguments);
    };
  }
  var eventsKey = {
    target,
    type,
    listener
  };
  target.addEventListener(type, listener);
  return eventsKey;
}
function listenOnce(target, type, listener, opt_this) {
  return listen(target, type, listener, opt_this, true);
}
function unlistenByKey(key) {
  if (key && key.target) {
    key.target.removeEventListener(key.type, key.listener);
    clear(key);
  }
}

// ../node_modules/ol/Observable.js
var __extends3 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Observable = function(_super) {
  __extends3(Observable2, _super);
  function Observable2() {
    var _this = _super.call(this) || this;
    _this.on = _this.onInternal;
    _this.once = _this.onceInternal;
    _this.un = _this.unInternal;
    _this.revision_ = 0;
    return _this;
  }
  Observable2.prototype.changed = function() {
    ++this.revision_;
    this.dispatchEvent(EventType_default.CHANGE);
  };
  Observable2.prototype.getRevision = function() {
    return this.revision_;
  };
  Observable2.prototype.onInternal = function(type, listener) {
    if (Array.isArray(type)) {
      var len = type.length;
      var keys = new Array(len);
      for (var i = 0; i < len; ++i) {
        keys[i] = listen(this, type[i], listener);
      }
      return keys;
    } else {
      return listen(this, type, listener);
    }
  };
  Observable2.prototype.onceInternal = function(type, listener) {
    var key;
    if (Array.isArray(type)) {
      var len = type.length;
      key = new Array(len);
      for (var i = 0; i < len; ++i) {
        key[i] = listenOnce(this, type[i], listener);
      }
    } else {
      key = listenOnce(this, type, listener);
    }
    listener.ol_key = key;
    return key;
  };
  Observable2.prototype.unInternal = function(type, listener) {
    var key = listener.ol_key;
    if (key) {
      unByKey(key);
    } else if (Array.isArray(type)) {
      for (var i = 0, ii = type.length; i < ii; ++i) {
        this.removeEventListener(type[i], listener);
      }
    } else {
      this.removeEventListener(type, listener);
    }
  };
  return Observable2;
}(Target_default);
Observable.prototype.on;
Observable.prototype.once;
Observable.prototype.un;
function unByKey(key) {
  if (Array.isArray(key)) {
    for (var i = 0, ii = key.length; i < ii; ++i) {
      unlistenByKey(key[i]);
    }
  } else {
    unlistenByKey(key);
  }
}
var Observable_default = Observable;

// ../node_modules/ol/Object.js
var __extends4 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var ObjectEvent = function(_super) {
  __extends4(ObjectEvent2, _super);
  function ObjectEvent2(type, key, oldValue) {
    var _this = _super.call(this, type) || this;
    _this.key = key;
    _this.oldValue = oldValue;
    return _this;
  }
  return ObjectEvent2;
}(Event_default);
var BaseObject = function(_super) {
  __extends4(BaseObject2, _super);
  function BaseObject2(opt_values) {
    var _this = _super.call(this) || this;
    _this.on;
    _this.once;
    _this.un;
    getUid(_this);
    _this.values_ = null;
    if (opt_values !== void 0) {
      _this.setProperties(opt_values);
    }
    return _this;
  }
  BaseObject2.prototype.get = function(key) {
    var value;
    if (this.values_ && this.values_.hasOwnProperty(key)) {
      value = this.values_[key];
    }
    return value;
  };
  BaseObject2.prototype.getKeys = function() {
    return this.values_ && Object.keys(this.values_) || [];
  };
  BaseObject2.prototype.getProperties = function() {
    return this.values_ && assign({}, this.values_) || {};
  };
  BaseObject2.prototype.hasProperties = function() {
    return !!this.values_;
  };
  BaseObject2.prototype.notify = function(key, oldValue) {
    var eventType;
    eventType = "change:".concat(key);
    if (this.hasListener(eventType)) {
      this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
    }
    eventType = ObjectEventType_default.PROPERTYCHANGE;
    if (this.hasListener(eventType)) {
      this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
    }
  };
  BaseObject2.prototype.addChangeListener = function(key, listener) {
    this.addEventListener("change:".concat(key), listener);
  };
  BaseObject2.prototype.removeChangeListener = function(key, listener) {
    this.removeEventListener("change:".concat(key), listener);
  };
  BaseObject2.prototype.set = function(key, value, opt_silent) {
    var values = this.values_ || (this.values_ = {});
    if (opt_silent) {
      values[key] = value;
    } else {
      var oldValue = values[key];
      values[key] = value;
      if (oldValue !== value) {
        this.notify(key, oldValue);
      }
    }
  };
  BaseObject2.prototype.setProperties = function(values, opt_silent) {
    for (var key in values) {
      this.set(key, values[key], opt_silent);
    }
  };
  BaseObject2.prototype.applyProperties = function(source) {
    if (!source.values_) {
      return;
    }
    assign(this.values_ || (this.values_ = {}), source.values_);
  };
  BaseObject2.prototype.unset = function(key, opt_silent) {
    if (this.values_ && key in this.values_) {
      var oldValue = this.values_[key];
      delete this.values_[key];
      if (isEmpty2(this.values_)) {
        this.values_ = null;
      }
      if (!opt_silent) {
        this.notify(key, oldValue);
      }
    }
  };
  return BaseObject2;
}(Observable_default);
var Object_default = BaseObject;

// ../node_modules/ol/layer/Property.js
var Property_default = {
  OPACITY: "opacity",
  VISIBLE: "visible",
  EXTENT: "extent",
  Z_INDEX: "zIndex",
  MAX_RESOLUTION: "maxResolution",
  MIN_RESOLUTION: "minResolution",
  MAX_ZOOM: "maxZoom",
  MIN_ZOOM: "minZoom",
  SOURCE: "source",
  MAP: "map"
};

// ../node_modules/ol/layer/Base.js
var __extends5 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var BaseLayer = function(_super) {
  __extends5(BaseLayer2, _super);
  function BaseLayer2(options) {
    var _this = _super.call(this) || this;
    _this.on;
    _this.once;
    _this.un;
    _this.background_ = options.background;
    var properties = assign({}, options);
    if (typeof options.properties === "object") {
      delete properties.properties;
      assign(properties, options.properties);
    }
    properties[Property_default.OPACITY] = options.opacity !== void 0 ? options.opacity : 1;
    assert(typeof properties[Property_default.OPACITY] === "number", 64);
    properties[Property_default.VISIBLE] = options.visible !== void 0 ? options.visible : true;
    properties[Property_default.Z_INDEX] = options.zIndex;
    properties[Property_default.MAX_RESOLUTION] = options.maxResolution !== void 0 ? options.maxResolution : Infinity;
    properties[Property_default.MIN_RESOLUTION] = options.minResolution !== void 0 ? options.minResolution : 0;
    properties[Property_default.MIN_ZOOM] = options.minZoom !== void 0 ? options.minZoom : -Infinity;
    properties[Property_default.MAX_ZOOM] = options.maxZoom !== void 0 ? options.maxZoom : Infinity;
    _this.className_ = properties.className !== void 0 ? properties.className : "ol-layer";
    delete properties.className;
    _this.setProperties(properties);
    _this.state_ = null;
    return _this;
  }
  BaseLayer2.prototype.getBackground = function() {
    return this.background_;
  };
  BaseLayer2.prototype.getClassName = function() {
    return this.className_;
  };
  BaseLayer2.prototype.getLayerState = function(opt_managed) {
    var state = this.state_ || {
      layer: this,
      managed: opt_managed === void 0 ? true : opt_managed
    };
    var zIndex = this.getZIndex();
    state.opacity = clamp(Math.round(this.getOpacity() * 100) / 100, 0, 1);
    state.visible = this.getVisible();
    state.extent = this.getExtent();
    state.zIndex = zIndex === void 0 && !state.managed ? Infinity : zIndex;
    state.maxResolution = this.getMaxResolution();
    state.minResolution = Math.max(this.getMinResolution(), 0);
    state.minZoom = this.getMinZoom();
    state.maxZoom = this.getMaxZoom();
    this.state_ = state;
    return state;
  };
  BaseLayer2.prototype.getLayersArray = function(opt_array) {
    return abstract();
  };
  BaseLayer2.prototype.getLayerStatesArray = function(opt_states) {
    return abstract();
  };
  BaseLayer2.prototype.getExtent = function() {
    return this.get(Property_default.EXTENT);
  };
  BaseLayer2.prototype.getMaxResolution = function() {
    return this.get(Property_default.MAX_RESOLUTION);
  };
  BaseLayer2.prototype.getMinResolution = function() {
    return this.get(Property_default.MIN_RESOLUTION);
  };
  BaseLayer2.prototype.getMinZoom = function() {
    return this.get(Property_default.MIN_ZOOM);
  };
  BaseLayer2.prototype.getMaxZoom = function() {
    return this.get(Property_default.MAX_ZOOM);
  };
  BaseLayer2.prototype.getOpacity = function() {
    return this.get(Property_default.OPACITY);
  };
  BaseLayer2.prototype.getSourceState = function() {
    return abstract();
  };
  BaseLayer2.prototype.getVisible = function() {
    return this.get(Property_default.VISIBLE);
  };
  BaseLayer2.prototype.getZIndex = function() {
    return this.get(Property_default.Z_INDEX);
  };
  BaseLayer2.prototype.setBackground = function(opt_background) {
    this.background_ = opt_background;
    this.changed();
  };
  BaseLayer2.prototype.setExtent = function(extent) {
    this.set(Property_default.EXTENT, extent);
  };
  BaseLayer2.prototype.setMaxResolution = function(maxResolution) {
    this.set(Property_default.MAX_RESOLUTION, maxResolution);
  };
  BaseLayer2.prototype.setMinResolution = function(minResolution) {
    this.set(Property_default.MIN_RESOLUTION, minResolution);
  };
  BaseLayer2.prototype.setMaxZoom = function(maxZoom) {
    this.set(Property_default.MAX_ZOOM, maxZoom);
  };
  BaseLayer2.prototype.setMinZoom = function(minZoom) {
    this.set(Property_default.MIN_ZOOM, minZoom);
  };
  BaseLayer2.prototype.setOpacity = function(opacity) {
    assert(typeof opacity === "number", 64);
    this.set(Property_default.OPACITY, opacity);
  };
  BaseLayer2.prototype.setVisible = function(visible) {
    this.set(Property_default.VISIBLE, visible);
  };
  BaseLayer2.prototype.setZIndex = function(zindex) {
    this.set(Property_default.Z_INDEX, zindex);
  };
  BaseLayer2.prototype.disposeInternal = function() {
    if (this.state_) {
      this.state_.layer = null;
      this.state_ = null;
    }
    _super.prototype.disposeInternal.call(this);
  };
  return BaseLayer2;
}(Object_default);
var Base_default = BaseLayer;

// ../node_modules/ol/render/EventType.js
var EventType_default2 = {
  PRERENDER: "prerender",
  POSTRENDER: "postrender",
  PRECOMPOSE: "precompose",
  POSTCOMPOSE: "postcompose",
  RENDERCOMPLETE: "rendercomplete"
};

// ../node_modules/ol/source/State.js
var State_default = {
  UNDEFINED: "undefined",
  LOADING: "loading",
  READY: "ready",
  ERROR: "error"
};

// ../node_modules/ol/layer/Layer.js
var __extends6 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Layer = function(_super) {
  __extends6(Layer2, _super);
  function Layer2(options) {
    var _this = this;
    var baseOptions = assign({}, options);
    delete baseOptions.source;
    _this = _super.call(this, baseOptions) || this;
    _this.on;
    _this.once;
    _this.un;
    _this.mapPrecomposeKey_ = null;
    _this.mapRenderKey_ = null;
    _this.sourceChangeKey_ = null;
    _this.renderer_ = null;
    _this.rendered = false;
    if (options.render) {
      _this.render = options.render;
    }
    if (options.map) {
      _this.setMap(options.map);
    }
    _this.addChangeListener(Property_default.SOURCE, _this.handleSourcePropertyChange_);
    var source = options.source ? options.source : null;
    _this.setSource(source);
    return _this;
  }
  Layer2.prototype.getLayersArray = function(opt_array) {
    var array = opt_array ? opt_array : [];
    array.push(this);
    return array;
  };
  Layer2.prototype.getLayerStatesArray = function(opt_states) {
    var states = opt_states ? opt_states : [];
    states.push(this.getLayerState());
    return states;
  };
  Layer2.prototype.getSource = function() {
    return this.get(Property_default.SOURCE) || null;
  };
  Layer2.prototype.getRenderSource = function() {
    return this.getSource();
  };
  Layer2.prototype.getSourceState = function() {
    var source = this.getSource();
    return !source ? State_default.UNDEFINED : source.getState();
  };
  Layer2.prototype.handleSourceChange_ = function() {
    this.changed();
  };
  Layer2.prototype.handleSourcePropertyChange_ = function() {
    if (this.sourceChangeKey_) {
      unlistenByKey(this.sourceChangeKey_);
      this.sourceChangeKey_ = null;
    }
    var source = this.getSource();
    if (source) {
      this.sourceChangeKey_ = listen(source, EventType_default.CHANGE, this.handleSourceChange_, this);
    }
    this.changed();
  };
  Layer2.prototype.getFeatures = function(pixel) {
    if (!this.renderer_) {
      return new Promise(function(resolve) {
        return resolve([]);
      });
    }
    return this.renderer_.getFeatures(pixel);
  };
  Layer2.prototype.getData = function(pixel) {
    if (!this.renderer_ || !this.rendered) {
      return null;
    }
    return this.renderer_.getData(pixel);
  };
  Layer2.prototype.render = function(frameState, target) {
    var layerRenderer = this.getRenderer();
    if (layerRenderer.prepareFrame(frameState)) {
      this.rendered = true;
      return layerRenderer.renderFrame(frameState, target);
    }
  };
  Layer2.prototype.unrender = function() {
    this.rendered = false;
  };
  Layer2.prototype.setMapInternal = function(map) {
    if (!map) {
      this.unrender();
    }
    this.set(Property_default.MAP, map);
  };
  Layer2.prototype.getMapInternal = function() {
    return this.get(Property_default.MAP);
  };
  Layer2.prototype.setMap = function(map) {
    if (this.mapPrecomposeKey_) {
      unlistenByKey(this.mapPrecomposeKey_);
      this.mapPrecomposeKey_ = null;
    }
    if (!map) {
      this.changed();
    }
    if (this.mapRenderKey_) {
      unlistenByKey(this.mapRenderKey_);
      this.mapRenderKey_ = null;
    }
    if (map) {
      this.mapPrecomposeKey_ = listen(map, EventType_default2.PRECOMPOSE, function(evt) {
        var renderEvent = evt;
        var layerStatesArray = renderEvent.frameState.layerStatesArray;
        var layerState = this.getLayerState(false);
        assert(!layerStatesArray.some(function(arrayLayerState) {
          return arrayLayerState.layer === layerState.layer;
        }), 67);
        layerStatesArray.push(layerState);
      }, this);
      this.mapRenderKey_ = listen(this, EventType_default.CHANGE, map.render, map);
      this.changed();
    }
  };
  Layer2.prototype.setSource = function(source) {
    this.set(Property_default.SOURCE, source);
  };
  Layer2.prototype.getRenderer = function() {
    if (!this.renderer_) {
      this.renderer_ = this.createRenderer();
    }
    return this.renderer_;
  };
  Layer2.prototype.hasRenderer = function() {
    return !!this.renderer_;
  };
  Layer2.prototype.createRenderer = function() {
    return null;
  };
  Layer2.prototype.disposeInternal = function() {
    if (this.renderer_) {
      this.renderer_.dispose();
      delete this.renderer_;
    }
    this.setSource(null);
    _super.prototype.disposeInternal.call(this);
  };
  return Layer2;
}(Base_default);
function inView(layerState, viewState) {
  if (!layerState.visible) {
    return false;
  }
  var resolution = viewState.resolution;
  if (resolution < layerState.minResolution || resolution >= layerState.maxResolution) {
    return false;
  }
  var zoom = viewState.zoom;
  return zoom > layerState.minZoom && zoom <= layerState.maxZoom;
}
var Layer_default = Layer;

// ../node_modules/ol/coordinate.js
function add(coordinate, delta) {
  coordinate[0] += +delta[0];
  coordinate[1] += +delta[1];
  return coordinate;
}
function equals3(coordinate1, coordinate2) {
  var equals4 = true;
  for (var i = coordinate1.length - 1; i >= 0; --i) {
    if (coordinate1[i] != coordinate2[i]) {
      equals4 = false;
      break;
    }
  }
  return equals4;
}
function rotate(coordinate, angle) {
  var cosAngle = Math.cos(angle);
  var sinAngle = Math.sin(angle);
  var x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
  var y = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
  coordinate[0] = x;
  coordinate[1] = y;
  return coordinate;
}
function scale(coordinate, scale3) {
  coordinate[0] *= scale3;
  coordinate[1] *= scale3;
  return coordinate;
}
function wrapX(coordinate, projection) {
  if (projection.canWrapX()) {
    var worldWidth = getWidth(projection.getExtent());
    var worldsAway = getWorldsAway(coordinate, projection, worldWidth);
    if (worldsAway) {
      coordinate[0] -= worldsAway * worldWidth;
    }
  }
  return coordinate;
}
function getWorldsAway(coordinate, projection, opt_sourceExtentWidth) {
  var projectionExtent = projection.getExtent();
  var worldsAway = 0;
  if (projection.canWrapX() && (coordinate[0] < projectionExtent[0] || coordinate[0] > projectionExtent[2])) {
    var sourceExtentWidth = opt_sourceExtentWidth || getWidth(projectionExtent);
    worldsAway = Math.floor((coordinate[0] - projectionExtent[0]) / sourceExtentWidth);
  }
  return worldsAway;
}

// ../node_modules/ol/renderer/Map.js
var __extends7 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var MapRenderer = function(_super) {
  __extends7(MapRenderer2, _super);
  function MapRenderer2(map) {
    var _this = _super.call(this) || this;
    _this.map_ = map;
    return _this;
  }
  MapRenderer2.prototype.dispatchRenderEvent = function(type, frameState) {
    abstract();
  };
  MapRenderer2.prototype.calculateMatrices2D = function(frameState) {
    var viewState = frameState.viewState;
    var coordinateToPixelTransform = frameState.coordinateToPixelTransform;
    var pixelToCoordinateTransform = frameState.pixelToCoordinateTransform;
    compose(coordinateToPixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / viewState.resolution, -1 / viewState.resolution, -viewState.rotation, -viewState.center[0], -viewState.center[1]);
    makeInverse(pixelToCoordinateTransform, coordinateToPixelTransform);
  };
  MapRenderer2.prototype.forEachFeatureAtCoordinate = function(coordinate, frameState, hitTolerance, checkWrapped, callback, thisArg, layerFilter, thisArg2) {
    var result;
    var viewState = frameState.viewState;
    function forEachFeatureAtCoordinate(managed, feature, layer2, geometry) {
      return callback.call(thisArg, feature, managed ? layer2 : null, geometry);
    }
    var projection = viewState.projection;
    var translatedCoordinate = wrapX(coordinate.slice(), projection);
    var offsets = [[0, 0]];
    if (projection.canWrapX() && checkWrapped) {
      var projectionExtent = projection.getExtent();
      var worldWidth = getWidth(projectionExtent);
      offsets.push([-worldWidth, 0], [worldWidth, 0]);
    }
    var layerStates = frameState.layerStatesArray;
    var numLayers = layerStates.length;
    var matches = [];
    var tmpCoord = [];
    for (var i = 0; i < offsets.length; i++) {
      for (var j = numLayers - 1; j >= 0; --j) {
        var layerState = layerStates[j];
        var layer = layerState.layer;
        if (layer.hasRenderer() && inView(layerState, viewState) && layerFilter.call(thisArg2, layer)) {
          var layerRenderer = layer.getRenderer();
          var source = layer.getSource();
          if (layerRenderer && source) {
            var coordinates2 = source.getWrapX() ? translatedCoordinate : coordinate;
            var callback_1 = forEachFeatureAtCoordinate.bind(null, layerState.managed);
            tmpCoord[0] = coordinates2[0] + offsets[i][0];
            tmpCoord[1] = coordinates2[1] + offsets[i][1];
            result = layerRenderer.forEachFeatureAtCoordinate(tmpCoord, frameState, hitTolerance, callback_1, matches);
          }
          if (result) {
            return result;
          }
        }
      }
    }
    if (matches.length === 0) {
      return void 0;
    }
    var order = 1 / matches.length;
    matches.forEach(function(m, i2) {
      return m.distanceSq += i2 * order;
    });
    matches.sort(function(a, b) {
      return a.distanceSq - b.distanceSq;
    });
    matches.some(function(m) {
      return result = m.callback(m.feature, m.layer, m.geometry);
    });
    return result;
  };
  MapRenderer2.prototype.forEachLayerAtPixel = function(pixel, frameState, hitTolerance, callback, layerFilter) {
    return abstract();
  };
  MapRenderer2.prototype.hasFeatureAtCoordinate = function(coordinate, frameState, hitTolerance, checkWrapped, layerFilter, thisArg) {
    var hasFeature = this.forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, checkWrapped, TRUE, this, layerFilter, thisArg);
    return hasFeature !== void 0;
  };
  MapRenderer2.prototype.getMap = function() {
    return this.map_;
  };
  MapRenderer2.prototype.renderFrame = function(frameState) {
    abstract();
  };
  MapRenderer2.prototype.scheduleExpireIconCache = function(frameState) {
    if (shared.canExpireCache()) {
      frameState.postRenderFunctions.push(expireIconCache);
    }
  };
  return MapRenderer2;
}(Disposable_default);
function expireIconCache(map, frameState) {
  shared.expire();
}
var Map_default = MapRenderer;

// ../node_modules/ol/render/Event.js
var __extends8 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var RenderEvent = function(_super) {
  __extends8(RenderEvent2, _super);
  function RenderEvent2(type, opt_inversePixelTransform, opt_frameState, opt_context) {
    var _this = _super.call(this, type) || this;
    _this.inversePixelTransform = opt_inversePixelTransform;
    _this.frameState = opt_frameState;
    _this.context = opt_context;
    return _this;
  }
  return RenderEvent2;
}(Event_default);
var Event_default2 = RenderEvent;

// ../node_modules/ol/css.js
var CLASS_HIDDEN = "ol-hidden";
var CLASS_UNSELECTABLE = "ol-unselectable";
var CLASS_CONTROL = "ol-control";
var CLASS_COLLAPSED = "ol-collapsed";
var fontRegEx = new RegExp([
  "^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)",
  "(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)",
  "(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)",
  "(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?",
  "(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))",
  "(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",
  `?\\s*([-,\\"\\'\\sa-z]+?)\\s*$`
].join(""), "i");
var fontRegExMatchIndex = [
  "style",
  "variant",
  "weight",
  "size",
  "lineHeight",
  "family"
];
var getFontParameters = function(fontSpec) {
  var match = fontSpec.match(fontRegEx);
  if (!match) {
    return null;
  }
  var style = {
    lineHeight: "normal",
    size: "1.2em",
    style: "normal",
    weight: "normal",
    variant: "normal"
  };
  for (var i = 0, ii = fontRegExMatchIndex.length; i < ii; ++i) {
    var value = match[i + 1];
    if (value !== void 0) {
      style[fontRegExMatchIndex[i]] = value;
    }
  }
  style.families = style.family.split(/,\s?/);
  return style;
};

// ../node_modules/ol/dom.js
function createCanvasContext2D(opt_width, opt_height, opt_canvasPool, opt_Context2DSettings) {
  var canvas;
  if (opt_canvasPool && opt_canvasPool.length) {
    canvas = opt_canvasPool.shift();
  } else if (WORKER_OFFSCREEN_CANVAS) {
    canvas = new OffscreenCanvas(opt_width || 300, opt_height || 300);
  } else {
    canvas = document.createElement("canvas");
  }
  if (opt_width) {
    canvas.width = opt_width;
  }
  if (opt_height) {
    canvas.height = opt_height;
  }
  return canvas.getContext("2d", opt_Context2DSettings);
}
function replaceNode(newNode, oldNode) {
  var parent = oldNode.parentNode;
  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
}
function removeNode(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
}
function removeChildren(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}
function replaceChildren(node, children) {
  var oldChildren = node.childNodes;
  for (var i = 0; true; ++i) {
    var oldChild = oldChildren[i];
    var newChild = children[i];
    if (!oldChild && !newChild) {
      break;
    }
    if (oldChild === newChild) {
      continue;
    }
    if (!oldChild) {
      node.appendChild(newChild);
      continue;
    }
    if (!newChild) {
      node.removeChild(oldChild);
      --i;
      continue;
    }
    node.insertBefore(newChild, oldChild);
  }
}

// ../node_modules/ol/render/canvas.js
var checkedFonts = new Object_default();
var labelCache = new Target_default();
labelCache.setSize = function() {
  console.warn("labelCache is deprecated.");
};
var measureContext = null;
var measureFont;
var textHeights = {};
var registerFont = function() {
  var retries = 100;
  var size = "32px ";
  var referenceFonts = ["monospace", "serif"];
  var len = referenceFonts.length;
  var text = "wmytzilWMYTZIL@#/&?$%10\uF013";
  var interval, referenceWidth;
  function isAvailable(fontStyle, fontWeight, fontFamily) {
    var available = true;
    for (var i = 0; i < len; ++i) {
      var referenceFont = referenceFonts[i];
      referenceWidth = measureTextWidth(fontStyle + " " + fontWeight + " " + size + referenceFont, text);
      if (fontFamily != referenceFont) {
        var width = measureTextWidth(fontStyle + " " + fontWeight + " " + size + fontFamily + "," + referenceFont, text);
        available = available && width != referenceWidth;
      }
    }
    if (available) {
      return true;
    }
    return false;
  }
  function check() {
    var done = true;
    var fonts = checkedFonts.getKeys();
    for (var i = 0, ii = fonts.length; i < ii; ++i) {
      var font = fonts[i];
      if (checkedFonts.get(font) < retries) {
        if (isAvailable.apply(this, font.split("\n"))) {
          clear(textHeights);
          measureContext = null;
          measureFont = void 0;
          checkedFonts.set(font, retries);
        } else {
          checkedFonts.set(font, checkedFonts.get(font) + 1, true);
          done = false;
        }
      }
    }
    if (done) {
      clearInterval(interval);
      interval = void 0;
    }
  }
  return function(fontSpec) {
    var font = getFontParameters(fontSpec);
    if (!font) {
      return;
    }
    var families = font.families;
    for (var i = 0, ii = families.length; i < ii; ++i) {
      var family = families[i];
      var key = font.style + "\n" + font.weight + "\n" + family;
      if (checkedFonts.get(key) === void 0) {
        checkedFonts.set(key, retries, true);
        if (!isAvailable(font.style, font.weight, family)) {
          checkedFonts.set(key, 0, true);
          if (interval === void 0) {
            interval = setInterval(check, 32);
          }
        }
      }
    }
  };
}();
var measureTextHeight = function() {
  var measureElement;
  return function(fontSpec) {
    var height = textHeights[fontSpec];
    if (height == void 0) {
      if (WORKER_OFFSCREEN_CANVAS) {
        var font = getFontParameters(fontSpec);
        var metrics = measureText(fontSpec, "\u017Dg");
        var lineHeight = isNaN(Number(font.lineHeight)) ? 1.2 : Number(font.lineHeight);
        height = lineHeight * (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
      } else {
        if (!measureElement) {
          measureElement = document.createElement("div");
          measureElement.innerHTML = "M";
          measureElement.style.minHeight = "0";
          measureElement.style.maxHeight = "none";
          measureElement.style.height = "auto";
          measureElement.style.padding = "0";
          measureElement.style.border = "none";
          measureElement.style.position = "absolute";
          measureElement.style.display = "block";
          measureElement.style.left = "-99999px";
        }
        measureElement.style.font = fontSpec;
        document.body.appendChild(measureElement);
        height = measureElement.offsetHeight;
        document.body.removeChild(measureElement);
      }
      textHeights[fontSpec] = height;
    }
    return height;
  };
}();
function measureText(font, text) {
  if (!measureContext) {
    measureContext = createCanvasContext2D(1, 1);
  }
  if (font != measureFont) {
    measureContext.font = font;
    measureFont = measureContext.font;
  }
  return measureContext.measureText(text);
}
function measureTextWidth(font, text) {
  return measureText(font, text).width;
}

// ../node_modules/ol/renderer/Composite.js
var __extends9 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var CompositeMapRenderer = function(_super) {
  __extends9(CompositeMapRenderer2, _super);
  function CompositeMapRenderer2(map) {
    var _this = _super.call(this, map) || this;
    _this.fontChangeListenerKey_ = listen(checkedFonts, ObjectEventType_default.PROPERTYCHANGE, map.redrawText.bind(map));
    _this.element_ = document.createElement("div");
    var style = _this.element_.style;
    style.position = "absolute";
    style.width = "100%";
    style.height = "100%";
    style.zIndex = "0";
    _this.element_.className = CLASS_UNSELECTABLE + " ol-layers";
    var container = map.getViewport();
    container.insertBefore(_this.element_, container.firstChild || null);
    _this.children_ = [];
    _this.renderedVisible_ = true;
    return _this;
  }
  CompositeMapRenderer2.prototype.dispatchRenderEvent = function(type, frameState) {
    var map = this.getMap();
    if (map.hasListener(type)) {
      var event_1 = new Event_default2(type, void 0, frameState);
      map.dispatchEvent(event_1);
    }
  };
  CompositeMapRenderer2.prototype.disposeInternal = function() {
    unlistenByKey(this.fontChangeListenerKey_);
    this.element_.parentNode.removeChild(this.element_);
    _super.prototype.disposeInternal.call(this);
  };
  CompositeMapRenderer2.prototype.renderFrame = function(frameState) {
    if (!frameState) {
      if (this.renderedVisible_) {
        this.element_.style.display = "none";
        this.renderedVisible_ = false;
      }
      return;
    }
    this.calculateMatrices2D(frameState);
    this.dispatchRenderEvent(EventType_default2.PRECOMPOSE, frameState);
    var layerStatesArray = frameState.layerStatesArray.sort(function(a, b) {
      return a.zIndex - b.zIndex;
    });
    var viewState = frameState.viewState;
    this.children_.length = 0;
    var declutterLayers = [];
    var previousElement = null;
    for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
      var layerState = layerStatesArray[i];
      frameState.layerIndex = i;
      var layer = layerState.layer;
      var sourceState = layer.getSourceState();
      if (!inView(layerState, viewState) || sourceState != State_default.READY && sourceState != State_default.UNDEFINED) {
        layer.unrender();
        continue;
      }
      var element = layer.render(frameState, previousElement);
      if (!element) {
        continue;
      }
      if (element !== previousElement) {
        this.children_.push(element);
        previousElement = element;
      }
      if ("getDeclutter" in layer) {
        declutterLayers.push(layer);
      }
    }
    for (var i = declutterLayers.length - 1; i >= 0; --i) {
      declutterLayers[i].renderDeclutter(frameState);
    }
    replaceChildren(this.element_, this.children_);
    this.dispatchRenderEvent(EventType_default2.POSTCOMPOSE, frameState);
    if (!this.renderedVisible_) {
      this.element_.style.display = "";
      this.renderedVisible_ = true;
    }
    this.scheduleExpireIconCache(frameState);
  };
  CompositeMapRenderer2.prototype.forEachLayerAtPixel = function(pixel, frameState, hitTolerance, callback, layerFilter) {
    var viewState = frameState.viewState;
    var layerStates = frameState.layerStatesArray;
    var numLayers = layerStates.length;
    for (var i = numLayers - 1; i >= 0; --i) {
      var layerState = layerStates[i];
      var layer = layerState.layer;
      if (layer.hasRenderer() && inView(layerState, viewState) && layerFilter(layer)) {
        var layerRenderer = layer.getRenderer();
        var data = layerRenderer.getDataAtPixel(pixel, frameState, hitTolerance);
        if (data) {
          var result = callback(layer, data);
          if (result) {
            return result;
          }
        }
      }
    }
    return void 0;
  };
  return CompositeMapRenderer2;
}(Map_default);
var Composite_default = CompositeMapRenderer;

// ../node_modules/ol/CollectionEventType.js
var CollectionEventType_default = {
  ADD: "add",
  REMOVE: "remove"
};

// ../node_modules/ol/Collection.js
var __extends10 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Property = {
  LENGTH: "length"
};
var CollectionEvent = function(_super) {
  __extends10(CollectionEvent2, _super);
  function CollectionEvent2(type, opt_element, opt_index) {
    var _this = _super.call(this, type) || this;
    _this.element = opt_element;
    _this.index = opt_index;
    return _this;
  }
  return CollectionEvent2;
}(Event_default);
var Collection = function(_super) {
  __extends10(Collection2, _super);
  function Collection2(opt_array, opt_options) {
    var _this = _super.call(this) || this;
    _this.on;
    _this.once;
    _this.un;
    var options = opt_options || {};
    _this.unique_ = !!options.unique;
    _this.array_ = opt_array ? opt_array : [];
    if (_this.unique_) {
      for (var i = 0, ii = _this.array_.length; i < ii; ++i) {
        _this.assertUnique_(_this.array_[i], i);
      }
    }
    _this.updateLength_();
    return _this;
  }
  Collection2.prototype.clear = function() {
    while (this.getLength() > 0) {
      this.pop();
    }
  };
  Collection2.prototype.extend = function(arr) {
    for (var i = 0, ii = arr.length; i < ii; ++i) {
      this.push(arr[i]);
    }
    return this;
  };
  Collection2.prototype.forEach = function(f) {
    var array = this.array_;
    for (var i = 0, ii = array.length; i < ii; ++i) {
      f(array[i], i, array);
    }
  };
  Collection2.prototype.getArray = function() {
    return this.array_;
  };
  Collection2.prototype.item = function(index) {
    return this.array_[index];
  };
  Collection2.prototype.getLength = function() {
    return this.get(Property.LENGTH);
  };
  Collection2.prototype.insertAt = function(index, elem) {
    if (this.unique_) {
      this.assertUnique_(elem);
    }
    this.array_.splice(index, 0, elem);
    this.updateLength_();
    this.dispatchEvent(new CollectionEvent(CollectionEventType_default.ADD, elem, index));
  };
  Collection2.prototype.pop = function() {
    return this.removeAt(this.getLength() - 1);
  };
  Collection2.prototype.push = function(elem) {
    if (this.unique_) {
      this.assertUnique_(elem);
    }
    var n = this.getLength();
    this.insertAt(n, elem);
    return this.getLength();
  };
  Collection2.prototype.remove = function(elem) {
    var arr = this.array_;
    for (var i = 0, ii = arr.length; i < ii; ++i) {
      if (arr[i] === elem) {
        return this.removeAt(i);
      }
    }
    return void 0;
  };
  Collection2.prototype.removeAt = function(index) {
    var prev = this.array_[index];
    this.array_.splice(index, 1);
    this.updateLength_();
    this.dispatchEvent(new CollectionEvent(CollectionEventType_default.REMOVE, prev, index));
    return prev;
  };
  Collection2.prototype.setAt = function(index, elem) {
    var n = this.getLength();
    if (index < n) {
      if (this.unique_) {
        this.assertUnique_(elem, index);
      }
      var prev = this.array_[index];
      this.array_[index] = elem;
      this.dispatchEvent(new CollectionEvent(CollectionEventType_default.REMOVE, prev, index));
      this.dispatchEvent(new CollectionEvent(CollectionEventType_default.ADD, elem, index));
    } else {
      for (var j = n; j < index; ++j) {
        this.insertAt(j, void 0);
      }
      this.insertAt(index, elem);
    }
  };
  Collection2.prototype.updateLength_ = function() {
    this.set(Property.LENGTH, this.array_.length);
  };
  Collection2.prototype.assertUnique_ = function(elem, opt_except) {
    for (var i = 0, ii = this.array_.length; i < ii; ++i) {
      if (this.array_[i] === elem && i !== opt_except) {
        throw new AssertionError_default(58);
      }
    }
  };
  return Collection2;
}(Object_default);
var Collection_default = Collection;

// ../node_modules/ol/layer/Group.js
var __extends11 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var GroupEvent = function(_super) {
  __extends11(GroupEvent2, _super);
  function GroupEvent2(type, layer) {
    var _this = _super.call(this, type) || this;
    _this.layer = layer;
    return _this;
  }
  return GroupEvent2;
}(Event_default);
var Property2 = {
  LAYERS: "layers"
};
var LayerGroup = function(_super) {
  __extends11(LayerGroup2, _super);
  function LayerGroup2(opt_options) {
    var _this = this;
    var options = opt_options || {};
    var baseOptions = assign({}, options);
    delete baseOptions.layers;
    var layers = options.layers;
    _this = _super.call(this, baseOptions) || this;
    _this.on;
    _this.once;
    _this.un;
    _this.layersListenerKeys_ = [];
    _this.listenerKeys_ = {};
    _this.addChangeListener(Property2.LAYERS, _this.handleLayersChanged_);
    if (layers) {
      if (Array.isArray(layers)) {
        layers = new Collection_default(layers.slice(), { unique: true });
      } else {
        assert(typeof layers.getArray === "function", 43);
      }
    } else {
      layers = new Collection_default(void 0, { unique: true });
    }
    _this.setLayers(layers);
    return _this;
  }
  LayerGroup2.prototype.handleLayerChange_ = function() {
    this.changed();
  };
  LayerGroup2.prototype.handleLayersChanged_ = function() {
    this.layersListenerKeys_.forEach(unlistenByKey);
    this.layersListenerKeys_.length = 0;
    var layers = this.getLayers();
    this.layersListenerKeys_.push(listen(layers, CollectionEventType_default.ADD, this.handleLayersAdd_, this), listen(layers, CollectionEventType_default.REMOVE, this.handleLayersRemove_, this));
    for (var id in this.listenerKeys_) {
      this.listenerKeys_[id].forEach(unlistenByKey);
    }
    clear(this.listenerKeys_);
    var layersArray = layers.getArray();
    for (var i = 0, ii = layersArray.length; i < ii; i++) {
      var layer = layersArray[i];
      this.registerLayerListeners_(layer);
      this.dispatchEvent(new GroupEvent("addlayer", layer));
    }
    this.changed();
  };
  LayerGroup2.prototype.registerLayerListeners_ = function(layer) {
    var listenerKeys = [
      listen(layer, ObjectEventType_default.PROPERTYCHANGE, this.handleLayerChange_, this),
      listen(layer, EventType_default.CHANGE, this.handleLayerChange_, this)
    ];
    if (layer instanceof LayerGroup2) {
      listenerKeys.push(listen(layer, "addlayer", this.handleLayerGroupAdd_, this), listen(layer, "removelayer", this.handleLayerGroupRemove_, this));
    }
    this.listenerKeys_[getUid(layer)] = listenerKeys;
  };
  LayerGroup2.prototype.handleLayerGroupAdd_ = function(event) {
    this.dispatchEvent(new GroupEvent("addlayer", event.layer));
  };
  LayerGroup2.prototype.handleLayerGroupRemove_ = function(event) {
    this.dispatchEvent(new GroupEvent("removelayer", event.layer));
  };
  LayerGroup2.prototype.handleLayersAdd_ = function(collectionEvent) {
    var layer = collectionEvent.element;
    this.registerLayerListeners_(layer);
    this.dispatchEvent(new GroupEvent("addlayer", layer));
    this.changed();
  };
  LayerGroup2.prototype.handleLayersRemove_ = function(collectionEvent) {
    var layer = collectionEvent.element;
    var key = getUid(layer);
    this.listenerKeys_[key].forEach(unlistenByKey);
    delete this.listenerKeys_[key];
    this.dispatchEvent(new GroupEvent("removelayer", layer));
    this.changed();
  };
  LayerGroup2.prototype.getLayers = function() {
    return this.get(Property2.LAYERS);
  };
  LayerGroup2.prototype.setLayers = function(layers) {
    var collection = this.getLayers();
    if (collection) {
      var currentLayers = collection.getArray();
      for (var i = 0, ii = currentLayers.length; i < ii; ++i) {
        this.dispatchEvent(new GroupEvent("removelayer", currentLayers[i]));
      }
    }
    this.set(Property2.LAYERS, layers);
  };
  LayerGroup2.prototype.getLayersArray = function(opt_array) {
    var array = opt_array !== void 0 ? opt_array : [];
    this.getLayers().forEach(function(layer) {
      layer.getLayersArray(array);
    });
    return array;
  };
  LayerGroup2.prototype.getLayerStatesArray = function(opt_states) {
    var states = opt_states !== void 0 ? opt_states : [];
    var pos = states.length;
    this.getLayers().forEach(function(layer) {
      layer.getLayerStatesArray(states);
    });
    var ownLayerState = this.getLayerState();
    var defaultZIndex = ownLayerState.zIndex;
    if (!opt_states && ownLayerState.zIndex === void 0) {
      defaultZIndex = 0;
    }
    for (var i = pos, ii = states.length; i < ii; i++) {
      var layerState = states[i];
      layerState.opacity *= ownLayerState.opacity;
      layerState.visible = layerState.visible && ownLayerState.visible;
      layerState.maxResolution = Math.min(layerState.maxResolution, ownLayerState.maxResolution);
      layerState.minResolution = Math.max(layerState.minResolution, ownLayerState.minResolution);
      layerState.minZoom = Math.max(layerState.minZoom, ownLayerState.minZoom);
      layerState.maxZoom = Math.min(layerState.maxZoom, ownLayerState.maxZoom);
      if (ownLayerState.extent !== void 0) {
        if (layerState.extent !== void 0) {
          layerState.extent = getIntersection(layerState.extent, ownLayerState.extent);
        } else {
          layerState.extent = ownLayerState.extent;
        }
      }
      if (layerState.zIndex === void 0) {
        layerState.zIndex = defaultZIndex;
      }
    }
    return states;
  };
  LayerGroup2.prototype.getSourceState = function() {
    return State_default.READY;
  };
  return LayerGroup2;
}(Base_default);
var Group_default = LayerGroup;

// ../node_modules/ol/MapEvent.js
var __extends12 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var MapEvent = function(_super) {
  __extends12(MapEvent2, _super);
  function MapEvent2(type, map, opt_frameState) {
    var _this = _super.call(this, type) || this;
    _this.map = map;
    _this.frameState = opt_frameState !== void 0 ? opt_frameState : null;
    return _this;
  }
  return MapEvent2;
}(Event_default);
var MapEvent_default = MapEvent;

// ../node_modules/ol/MapBrowserEvent.js
var __extends13 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var MapBrowserEvent = function(_super) {
  __extends13(MapBrowserEvent2, _super);
  function MapBrowserEvent2(type, map, originalEvent, opt_dragging, opt_frameState) {
    var _this = _super.call(this, type, map, opt_frameState) || this;
    _this.originalEvent = originalEvent;
    _this.pixel_ = null;
    _this.coordinate_ = null;
    _this.dragging = opt_dragging !== void 0 ? opt_dragging : false;
    return _this;
  }
  Object.defineProperty(MapBrowserEvent2.prototype, "pixel", {
    get: function() {
      if (!this.pixel_) {
        this.pixel_ = this.map.getEventPixel(this.originalEvent);
      }
      return this.pixel_;
    },
    set: function(pixel) {
      this.pixel_ = pixel;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MapBrowserEvent2.prototype, "coordinate", {
    get: function() {
      if (!this.coordinate_) {
        this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel);
      }
      return this.coordinate_;
    },
    set: function(coordinate) {
      this.coordinate_ = coordinate;
    },
    enumerable: false,
    configurable: true
  });
  MapBrowserEvent2.prototype.preventDefault = function() {
    _super.prototype.preventDefault.call(this);
    if ("preventDefault" in this.originalEvent) {
      this.originalEvent.preventDefault();
    }
  };
  MapBrowserEvent2.prototype.stopPropagation = function() {
    _super.prototype.stopPropagation.call(this);
    if ("stopPropagation" in this.originalEvent) {
      this.originalEvent.stopPropagation();
    }
  };
  return MapBrowserEvent2;
}(MapEvent_default);
var MapBrowserEvent_default = MapBrowserEvent;

// ../node_modules/ol/MapBrowserEventType.js
var MapBrowserEventType_default = {
  SINGLECLICK: "singleclick",
  CLICK: EventType_default.CLICK,
  DBLCLICK: EventType_default.DBLCLICK,
  POINTERDRAG: "pointerdrag",
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
};

// ../node_modules/ol/pointer/EventType.js
var EventType_default3 = {
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
};

// ../node_modules/ol/MapBrowserEventHandler.js
var __extends14 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var MapBrowserEventHandler = function(_super) {
  __extends14(MapBrowserEventHandler2, _super);
  function MapBrowserEventHandler2(map, moveTolerance) {
    var _this = _super.call(this, map) || this;
    _this.map_ = map;
    _this.clickTimeoutId_;
    _this.emulateClicks_ = false;
    _this.dragging_ = false;
    _this.dragListenerKeys_ = [];
    _this.moveTolerance_ = moveTolerance === void 0 ? 1 : moveTolerance;
    _this.down_ = null;
    var element = _this.map_.getViewport();
    _this.activePointers_ = 0;
    _this.trackedTouches_ = {};
    _this.element_ = element;
    _this.pointerdownListenerKey_ = listen(element, EventType_default3.POINTERDOWN, _this.handlePointerDown_, _this);
    _this.originalPointerMoveEvent_;
    _this.relayedListenerKey_ = listen(element, EventType_default3.POINTERMOVE, _this.relayEvent_, _this);
    _this.boundHandleTouchMove_ = _this.handleTouchMove_.bind(_this);
    _this.element_.addEventListener(EventType_default.TOUCHMOVE, _this.boundHandleTouchMove_, PASSIVE_EVENT_LISTENERS ? { passive: false } : false);
    return _this;
  }
  MapBrowserEventHandler2.prototype.emulateClick_ = function(pointerEvent) {
    var newEvent = new MapBrowserEvent_default(MapBrowserEventType_default.CLICK, this.map_, pointerEvent);
    this.dispatchEvent(newEvent);
    if (this.clickTimeoutId_ !== void 0) {
      clearTimeout(this.clickTimeoutId_);
      this.clickTimeoutId_ = void 0;
      newEvent = new MapBrowserEvent_default(MapBrowserEventType_default.DBLCLICK, this.map_, pointerEvent);
      this.dispatchEvent(newEvent);
    } else {
      this.clickTimeoutId_ = setTimeout(function() {
        this.clickTimeoutId_ = void 0;
        var newEvent2 = new MapBrowserEvent_default(MapBrowserEventType_default.SINGLECLICK, this.map_, pointerEvent);
        this.dispatchEvent(newEvent2);
      }.bind(this), 250);
    }
  };
  MapBrowserEventHandler2.prototype.updateActivePointers_ = function(pointerEvent) {
    var event = pointerEvent;
    if (event.type == MapBrowserEventType_default.POINTERUP || event.type == MapBrowserEventType_default.POINTERCANCEL) {
      delete this.trackedTouches_[event.pointerId];
    } else if (event.type == MapBrowserEventType_default.POINTERDOWN) {
      this.trackedTouches_[event.pointerId] = true;
    }
    this.activePointers_ = Object.keys(this.trackedTouches_).length;
  };
  MapBrowserEventHandler2.prototype.handlePointerUp_ = function(pointerEvent) {
    this.updateActivePointers_(pointerEvent);
    var newEvent = new MapBrowserEvent_default(MapBrowserEventType_default.POINTERUP, this.map_, pointerEvent);
    this.dispatchEvent(newEvent);
    if (this.emulateClicks_ && !newEvent.defaultPrevented && !this.dragging_ && this.isMouseActionButton_(pointerEvent)) {
      this.emulateClick_(this.down_);
    }
    if (this.activePointers_ === 0) {
      this.dragListenerKeys_.forEach(unlistenByKey);
      this.dragListenerKeys_.length = 0;
      this.dragging_ = false;
      this.down_ = null;
    }
  };
  MapBrowserEventHandler2.prototype.isMouseActionButton_ = function(pointerEvent) {
    return pointerEvent.button === 0;
  };
  MapBrowserEventHandler2.prototype.handlePointerDown_ = function(pointerEvent) {
    this.emulateClicks_ = this.activePointers_ === 0;
    this.updateActivePointers_(pointerEvent);
    var newEvent = new MapBrowserEvent_default(MapBrowserEventType_default.POINTERDOWN, this.map_, pointerEvent);
    this.dispatchEvent(newEvent);
    this.down_ = {};
    for (var property in pointerEvent) {
      var value = pointerEvent[property];
      this.down_[property] = typeof value === "function" ? VOID : value;
    }
    if (this.dragListenerKeys_.length === 0) {
      var doc = this.map_.getOwnerDocument();
      this.dragListenerKeys_.push(listen(doc, MapBrowserEventType_default.POINTERMOVE, this.handlePointerMove_, this), listen(doc, MapBrowserEventType_default.POINTERUP, this.handlePointerUp_, this), listen(this.element_, MapBrowserEventType_default.POINTERCANCEL, this.handlePointerUp_, this));
      if (this.element_.getRootNode && this.element_.getRootNode() !== doc) {
        this.dragListenerKeys_.push(listen(this.element_.getRootNode(), MapBrowserEventType_default.POINTERUP, this.handlePointerUp_, this));
      }
    }
  };
  MapBrowserEventHandler2.prototype.handlePointerMove_ = function(pointerEvent) {
    if (this.isMoving_(pointerEvent)) {
      this.dragging_ = true;
      var newEvent = new MapBrowserEvent_default(MapBrowserEventType_default.POINTERDRAG, this.map_, pointerEvent, this.dragging_);
      this.dispatchEvent(newEvent);
    }
  };
  MapBrowserEventHandler2.prototype.relayEvent_ = function(pointerEvent) {
    this.originalPointerMoveEvent_ = pointerEvent;
    var dragging = !!(this.down_ && this.isMoving_(pointerEvent));
    this.dispatchEvent(new MapBrowserEvent_default(pointerEvent.type, this.map_, pointerEvent, dragging));
  };
  MapBrowserEventHandler2.prototype.handleTouchMove_ = function(event) {
    var originalEvent = this.originalPointerMoveEvent_;
    if ((!originalEvent || originalEvent.defaultPrevented) && (typeof event.cancelable !== "boolean" || event.cancelable === true)) {
      event.preventDefault();
    }
  };
  MapBrowserEventHandler2.prototype.isMoving_ = function(pointerEvent) {
    return this.dragging_ || Math.abs(pointerEvent.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(pointerEvent.clientY - this.down_.clientY) > this.moveTolerance_;
  };
  MapBrowserEventHandler2.prototype.disposeInternal = function() {
    if (this.relayedListenerKey_) {
      unlistenByKey(this.relayedListenerKey_);
      this.relayedListenerKey_ = null;
    }
    this.element_.removeEventListener(EventType_default.TOUCHMOVE, this.boundHandleTouchMove_);
    if (this.pointerdownListenerKey_) {
      unlistenByKey(this.pointerdownListenerKey_);
      this.pointerdownListenerKey_ = null;
    }
    this.dragListenerKeys_.forEach(unlistenByKey);
    this.dragListenerKeys_.length = 0;
    this.element_ = null;
    _super.prototype.disposeInternal.call(this);
  };
  return MapBrowserEventHandler2;
}(Target_default);
var MapBrowserEventHandler_default = MapBrowserEventHandler;

// ../node_modules/ol/MapEventType.js
var MapEventType_default = {
  POSTRENDER: "postrender",
  MOVESTART: "movestart",
  MOVEEND: "moveend",
  LOADSTART: "loadstart",
  LOADEND: "loadend"
};

// ../node_modules/ol/MapProperty.js
var MapProperty_default = {
  LAYERGROUP: "layergroup",
  SIZE: "size",
  TARGET: "target",
  VIEW: "view"
};

// ../node_modules/ol/structs/PriorityQueue.js
var DROP = Infinity;
var PriorityQueue = function() {
  function PriorityQueue2(priorityFunction, keyFunction) {
    this.priorityFunction_ = priorityFunction;
    this.keyFunction_ = keyFunction;
    this.elements_ = [];
    this.priorities_ = [];
    this.queuedElements_ = {};
  }
  PriorityQueue2.prototype.clear = function() {
    this.elements_.length = 0;
    this.priorities_.length = 0;
    clear(this.queuedElements_);
  };
  PriorityQueue2.prototype.dequeue = function() {
    var elements = this.elements_;
    var priorities = this.priorities_;
    var element = elements[0];
    if (elements.length == 1) {
      elements.length = 0;
      priorities.length = 0;
    } else {
      elements[0] = elements.pop();
      priorities[0] = priorities.pop();
      this.siftUp_(0);
    }
    var elementKey = this.keyFunction_(element);
    delete this.queuedElements_[elementKey];
    return element;
  };
  PriorityQueue2.prototype.enqueue = function(element) {
    assert(!(this.keyFunction_(element) in this.queuedElements_), 31);
    var priority = this.priorityFunction_(element);
    if (priority != DROP) {
      this.elements_.push(element);
      this.priorities_.push(priority);
      this.queuedElements_[this.keyFunction_(element)] = true;
      this.siftDown_(0, this.elements_.length - 1);
      return true;
    }
    return false;
  };
  PriorityQueue2.prototype.getCount = function() {
    return this.elements_.length;
  };
  PriorityQueue2.prototype.getLeftChildIndex_ = function(index) {
    return index * 2 + 1;
  };
  PriorityQueue2.prototype.getRightChildIndex_ = function(index) {
    return index * 2 + 2;
  };
  PriorityQueue2.prototype.getParentIndex_ = function(index) {
    return index - 1 >> 1;
  };
  PriorityQueue2.prototype.heapify_ = function() {
    var i;
    for (i = (this.elements_.length >> 1) - 1; i >= 0; i--) {
      this.siftUp_(i);
    }
  };
  PriorityQueue2.prototype.isEmpty = function() {
    return this.elements_.length === 0;
  };
  PriorityQueue2.prototype.isKeyQueued = function(key) {
    return key in this.queuedElements_;
  };
  PriorityQueue2.prototype.isQueued = function(element) {
    return this.isKeyQueued(this.keyFunction_(element));
  };
  PriorityQueue2.prototype.siftUp_ = function(index) {
    var elements = this.elements_;
    var priorities = this.priorities_;
    var count = elements.length;
    var element = elements[index];
    var priority = priorities[index];
    var startIndex = index;
    while (index < count >> 1) {
      var lIndex = this.getLeftChildIndex_(index);
      var rIndex = this.getRightChildIndex_(index);
      var smallerChildIndex = rIndex < count && priorities[rIndex] < priorities[lIndex] ? rIndex : lIndex;
      elements[index] = elements[smallerChildIndex];
      priorities[index] = priorities[smallerChildIndex];
      index = smallerChildIndex;
    }
    elements[index] = element;
    priorities[index] = priority;
    this.siftDown_(startIndex, index);
  };
  PriorityQueue2.prototype.siftDown_ = function(startIndex, index) {
    var elements = this.elements_;
    var priorities = this.priorities_;
    var element = elements[index];
    var priority = priorities[index];
    while (index > startIndex) {
      var parentIndex = this.getParentIndex_(index);
      if (priorities[parentIndex] > priority) {
        elements[index] = elements[parentIndex];
        priorities[index] = priorities[parentIndex];
        index = parentIndex;
      } else {
        break;
      }
    }
    elements[index] = element;
    priorities[index] = priority;
  };
  PriorityQueue2.prototype.reprioritize = function() {
    var priorityFunction = this.priorityFunction_;
    var elements = this.elements_;
    var priorities = this.priorities_;
    var index = 0;
    var n = elements.length;
    var element, i, priority;
    for (i = 0; i < n; ++i) {
      element = elements[i];
      priority = priorityFunction(element);
      if (priority == DROP) {
        delete this.queuedElements_[this.keyFunction_(element)];
      } else {
        priorities[index] = priority;
        elements[index++] = element;
      }
    }
    elements.length = index;
    priorities.length = index;
    this.heapify_();
  };
  return PriorityQueue2;
}();
var PriorityQueue_default = PriorityQueue;

// ../node_modules/ol/TileState.js
var TileState_default = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};

// ../node_modules/ol/TileQueue.js
var __extends15 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var TileQueue = function(_super) {
  __extends15(TileQueue2, _super);
  function TileQueue2(tilePriorityFunction, tileChangeCallback) {
    var _this = _super.call(this, function(element) {
      return tilePriorityFunction.apply(null, element);
    }, function(element) {
      return element[0].getKey();
    }) || this;
    _this.boundHandleTileChange_ = _this.handleTileChange.bind(_this);
    _this.tileChangeCallback_ = tileChangeCallback;
    _this.tilesLoading_ = 0;
    _this.tilesLoadingKeys_ = {};
    return _this;
  }
  TileQueue2.prototype.enqueue = function(element) {
    var added = _super.prototype.enqueue.call(this, element);
    if (added) {
      var tile = element[0];
      tile.addEventListener(EventType_default.CHANGE, this.boundHandleTileChange_);
    }
    return added;
  };
  TileQueue2.prototype.getTilesLoading = function() {
    return this.tilesLoading_;
  };
  TileQueue2.prototype.handleTileChange = function(event) {
    var tile = event.target;
    var state = tile.getState();
    if (state === TileState_default.LOADED || state === TileState_default.ERROR || state === TileState_default.EMPTY) {
      tile.removeEventListener(EventType_default.CHANGE, this.boundHandleTileChange_);
      var tileKey = tile.getKey();
      if (tileKey in this.tilesLoadingKeys_) {
        delete this.tilesLoadingKeys_[tileKey];
        --this.tilesLoading_;
      }
      this.tileChangeCallback_();
    }
  };
  TileQueue2.prototype.loadMoreTiles = function(maxTotalLoading, maxNewLoads) {
    var newLoads = 0;
    var state, tile, tileKey;
    while (this.tilesLoading_ < maxTotalLoading && newLoads < maxNewLoads && this.getCount() > 0) {
      tile = this.dequeue()[0];
      tileKey = tile.getKey();
      state = tile.getState();
      if (state === TileState_default.IDLE && !(tileKey in this.tilesLoadingKeys_)) {
        this.tilesLoadingKeys_[tileKey] = true;
        ++this.tilesLoading_;
        ++newLoads;
        tile.load();
      }
    }
  };
  return TileQueue2;
}(PriorityQueue_default);
var TileQueue_default = TileQueue;
function getTilePriority(frameState, tile, tileSourceKey, tileCenter, tileResolution) {
  if (!frameState || !(tileSourceKey in frameState.wantedTiles)) {
    return DROP;
  }
  if (!frameState.wantedTiles[tileSourceKey][tile.getKey()]) {
    return DROP;
  }
  var center = frameState.viewState.center;
  var deltaX = tileCenter[0] - center[0];
  var deltaY = tileCenter[1] - center[1];
  return 65536 * Math.log(tileResolution) + Math.sqrt(deltaX * deltaX + deltaY * deltaY) / tileResolution;
}

// ../node_modules/ol/geom/GeometryType.js
var GeometryType_default = {
  POINT: "Point",
  LINE_STRING: "LineString",
  LINEAR_RING: "LinearRing",
  POLYGON: "Polygon",
  MULTI_POINT: "MultiPoint",
  MULTI_LINE_STRING: "MultiLineString",
  MULTI_POLYGON: "MultiPolygon",
  GEOMETRY_COLLECTION: "GeometryCollection",
  CIRCLE: "Circle"
};

// ../node_modules/ol/proj/Units.js
var Units = {
  RADIANS: "radians",
  DEGREES: "degrees",
  FEET: "ft",
  METERS: "m",
  PIXELS: "pixels",
  TILE_PIXELS: "tile-pixels",
  USFEET: "us-ft"
};
var unitByCode = {
  "9001": Units.METERS,
  "9002": Units.FEET,
  "9003": Units.USFEET,
  "9101": Units.RADIANS,
  "9102": Units.DEGREES
};
var METERS_PER_UNIT = {};
METERS_PER_UNIT[Units.RADIANS] = 6370997 / (2 * Math.PI);
METERS_PER_UNIT[Units.DEGREES] = 2 * Math.PI * 6370997 / 360;
METERS_PER_UNIT[Units.FEET] = 0.3048;
METERS_PER_UNIT[Units.METERS] = 1;
METERS_PER_UNIT[Units.USFEET] = 1200 / 3937;
var Units_default = Units;

// ../node_modules/ol/ViewHint.js
var ViewHint_default = {
  ANIMATING: 0,
  INTERACTING: 1
};

// ../node_modules/ol/ViewProperty.js
var ViewProperty_default = {
  CENTER: "center",
  RESOLUTION: "resolution",
  ROTATION: "rotation"
};

// ../node_modules/ol/tilegrid/common.js
var DEFAULT_TILE_SIZE = 256;

// ../node_modules/ol/proj/Projection.js
var Projection = function() {
  function Projection2(options) {
    this.code_ = options.code;
    this.units_ = options.units;
    this.extent_ = options.extent !== void 0 ? options.extent : null;
    this.worldExtent_ = options.worldExtent !== void 0 ? options.worldExtent : null;
    this.axisOrientation_ = options.axisOrientation !== void 0 ? options.axisOrientation : "enu";
    this.global_ = options.global !== void 0 ? options.global : false;
    this.canWrapX_ = !!(this.global_ && this.extent_);
    this.getPointResolutionFunc_ = options.getPointResolution;
    this.defaultTileGrid_ = null;
    this.metersPerUnit_ = options.metersPerUnit;
  }
  Projection2.prototype.canWrapX = function() {
    return this.canWrapX_;
  };
  Projection2.prototype.getCode = function() {
    return this.code_;
  };
  Projection2.prototype.getExtent = function() {
    return this.extent_;
  };
  Projection2.prototype.getUnits = function() {
    return this.units_;
  };
  Projection2.prototype.getMetersPerUnit = function() {
    return this.metersPerUnit_ || METERS_PER_UNIT[this.units_];
  };
  Projection2.prototype.getWorldExtent = function() {
    return this.worldExtent_;
  };
  Projection2.prototype.getAxisOrientation = function() {
    return this.axisOrientation_;
  };
  Projection2.prototype.isGlobal = function() {
    return this.global_;
  };
  Projection2.prototype.setGlobal = function(global) {
    this.global_ = global;
    this.canWrapX_ = !!(global && this.extent_);
  };
  Projection2.prototype.getDefaultTileGrid = function() {
    return this.defaultTileGrid_;
  };
  Projection2.prototype.setDefaultTileGrid = function(tileGrid) {
    this.defaultTileGrid_ = tileGrid;
  };
  Projection2.prototype.setExtent = function(extent) {
    this.extent_ = extent;
    this.canWrapX_ = !!(this.global_ && extent);
  };
  Projection2.prototype.setWorldExtent = function(worldExtent) {
    this.worldExtent_ = worldExtent;
  };
  Projection2.prototype.setGetPointResolution = function(func) {
    this.getPointResolutionFunc_ = func;
  };
  Projection2.prototype.getPointResolutionFunc = function() {
    return this.getPointResolutionFunc_;
  };
  return Projection2;
}();
var Projection_default = Projection;

// ../node_modules/ol/proj/epsg3857.js
var __extends16 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var RADIUS = 6378137;
var HALF_SIZE = Math.PI * RADIUS;
var EXTENT = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
var WORLD_EXTENT = [-180, -85, 180, 85];
var MAX_SAFE_Y = RADIUS * Math.log(Math.tan(Math.PI / 2));
var EPSG3857Projection = function(_super) {
  __extends16(EPSG3857Projection2, _super);
  function EPSG3857Projection2(code) {
    return _super.call(this, {
      code,
      units: Units_default.METERS,
      extent: EXTENT,
      global: true,
      worldExtent: WORLD_EXTENT,
      getPointResolution: function(resolution, point) {
        return resolution / cosh(point[1] / RADIUS);
      }
    }) || this;
  }
  return EPSG3857Projection2;
}(Projection_default);
var PROJECTIONS = [
  new EPSG3857Projection("EPSG:3857"),
  new EPSG3857Projection("EPSG:102100"),
  new EPSG3857Projection("EPSG:102113"),
  new EPSG3857Projection("EPSG:900913"),
  new EPSG3857Projection("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new EPSG3857Projection("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
function fromEPSG4326(input, opt_output, opt_dimension) {
  var length = input.length;
  var dimension = opt_dimension > 1 ? opt_dimension : 2;
  var output = opt_output;
  if (output === void 0) {
    if (dimension > 2) {
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }
  for (var i = 0; i < length; i += dimension) {
    output[i] = HALF_SIZE * input[i] / 180;
    var y = RADIUS * Math.log(Math.tan(Math.PI * (+input[i + 1] + 90) / 360));
    if (y > MAX_SAFE_Y) {
      y = MAX_SAFE_Y;
    } else if (y < -MAX_SAFE_Y) {
      y = -MAX_SAFE_Y;
    }
    output[i + 1] = y;
  }
  return output;
}
function toEPSG4326(input, opt_output, opt_dimension) {
  var length = input.length;
  var dimension = opt_dimension > 1 ? opt_dimension : 2;
  var output = opt_output;
  if (output === void 0) {
    if (dimension > 2) {
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }
  for (var i = 0; i < length; i += dimension) {
    output[i] = 180 * input[i] / HALF_SIZE;
    output[i + 1] = 360 * Math.atan(Math.exp(input[i + 1] / RADIUS)) / Math.PI - 90;
  }
  return output;
}

// ../node_modules/ol/proj/epsg4326.js
var __extends17 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var RADIUS2 = 6378137;
var EXTENT2 = [-180, -90, 180, 90];
var METERS_PER_UNIT2 = Math.PI * RADIUS2 / 180;
var EPSG4326Projection = function(_super) {
  __extends17(EPSG4326Projection2, _super);
  function EPSG4326Projection2(code, opt_axisOrientation) {
    return _super.call(this, {
      code,
      units: Units_default.DEGREES,
      extent: EXTENT2,
      axisOrientation: opt_axisOrientation,
      global: true,
      metersPerUnit: METERS_PER_UNIT2,
      worldExtent: EXTENT2
    }) || this;
  }
  return EPSG4326Projection2;
}(Projection_default);
var PROJECTIONS2 = [
  new EPSG4326Projection("CRS:84"),
  new EPSG4326Projection("EPSG:4326", "neu"),
  new EPSG4326Projection("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new EPSG4326Projection("urn:ogc:def:crs:OGC:2:84"),
  new EPSG4326Projection("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new EPSG4326Projection("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new EPSG4326Projection("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
];

// ../node_modules/ol/proj/projections.js
var cache = {};
function get(code) {
  return cache[code] || cache[code.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function add2(code, projection) {
  cache[code] = projection;
}

// ../node_modules/ol/proj/transforms.js
var transforms = {};
function add3(source, destination, transformFn) {
  var sourceCode = source.getCode();
  var destinationCode = destination.getCode();
  if (!(sourceCode in transforms)) {
    transforms[sourceCode] = {};
  }
  transforms[sourceCode][destinationCode] = transformFn;
}
function get2(sourceCode, destinationCode) {
  var transform2;
  if (sourceCode in transforms && destinationCode in transforms[sourceCode]) {
    transform2 = transforms[sourceCode][destinationCode];
  }
  return transform2;
}

// ../node_modules/ol/proj.js
var showCoordinateWarning = true;
function disableCoordinateWarning(opt_disable) {
  var hide = opt_disable === void 0 ? true : opt_disable;
  showCoordinateWarning = !hide;
}
function cloneTransform(input, opt_output, opt_dimension) {
  var output;
  if (opt_output !== void 0) {
    for (var i = 0, ii = input.length; i < ii; ++i) {
      opt_output[i] = input[i];
    }
    output = opt_output;
  } else {
    output = input.slice();
  }
  return output;
}
function identityTransform(input, opt_output, opt_dimension) {
  if (opt_output !== void 0 && input !== opt_output) {
    for (var i = 0, ii = input.length; i < ii; ++i) {
      opt_output[i] = input[i];
    }
    input = opt_output;
  }
  return input;
}
function addProjection(projection) {
  add2(projection.getCode(), projection);
  add3(projection, projection, cloneTransform);
}
function addProjections(projections) {
  projections.forEach(addProjection);
}
function get3(projectionLike) {
  return typeof projectionLike === "string" ? get(projectionLike) : projectionLike || null;
}
function addEquivalentProjections(projections) {
  addProjections(projections);
  projections.forEach(function(source) {
    projections.forEach(function(destination) {
      if (source !== destination) {
        add3(source, destination, cloneTransform);
      }
    });
  });
}
function addEquivalentTransforms(projections1, projections2, forwardTransform, inverseTransform) {
  projections1.forEach(function(projection1) {
    projections2.forEach(function(projection2) {
      add3(projection1, projection2, forwardTransform);
      add3(projection2, projection1, inverseTransform);
    });
  });
}
function createProjection(projection, defaultCode) {
  if (!projection) {
    return get3(defaultCode);
  } else if (typeof projection === "string") {
    return get3(projection);
  } else {
    return projection;
  }
}
function getTransformFromProjections(sourceProjection, destinationProjection) {
  var sourceCode = sourceProjection.getCode();
  var destinationCode = destinationProjection.getCode();
  var transformFunc = get2(sourceCode, destinationCode);
  if (!transformFunc) {
    transformFunc = identityTransform;
  }
  return transformFunc;
}
function getTransform(source, destination) {
  var sourceProjection = get3(source);
  var destinationProjection = get3(destination);
  return getTransformFromProjections(sourceProjection, destinationProjection);
}
function transform(coordinate, source, destination) {
  var transformFunc = getTransform(source, destination);
  return transformFunc(coordinate, void 0, coordinate.length);
}
function transformExtent(extent, source, destination, opt_stops) {
  var transformFunc = getTransform(source, destination);
  return applyTransform(extent, transformFunc, void 0, opt_stops);
}
var userProjection = null;
function getUserProjection() {
  return userProjection;
}
function toUserCoordinate(coordinate, sourceProjection) {
  if (!userProjection) {
    return coordinate;
  }
  return transform(coordinate, sourceProjection, userProjection);
}
function fromUserCoordinate(coordinate, destProjection) {
  if (!userProjection) {
    if (showCoordinateWarning && !equals3(coordinate, [0, 0]) && coordinate[0] >= -180 && coordinate[0] <= 180 && coordinate[1] >= -90 && coordinate[1] <= 90) {
      showCoordinateWarning = false;
      console.warn("Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates.");
    }
    return coordinate;
  }
  return transform(coordinate, userProjection, destProjection);
}
function toUserExtent(extent, sourceProjection) {
  if (!userProjection) {
    return extent;
  }
  return transformExtent(extent, sourceProjection, userProjection);
}
function fromUserExtent(extent, destProjection) {
  if (!userProjection) {
    return extent;
  }
  return transformExtent(extent, userProjection, destProjection);
}
function addCommon() {
  addEquivalentProjections(PROJECTIONS);
  addEquivalentProjections(PROJECTIONS2);
  addEquivalentTransforms(PROJECTIONS2, PROJECTIONS, fromEPSG4326, toEPSG4326);
}
addCommon();

// ../node_modules/ol/centerconstraint.js
function createExtent(extent, onlyCenter, smooth) {
  return function(center, resolution, size, opt_isMoving, opt_centerShift) {
    if (!center) {
      return void 0;
    }
    if (!resolution && !onlyCenter) {
      return center;
    }
    var viewWidth = onlyCenter ? 0 : size[0] * resolution;
    var viewHeight = onlyCenter ? 0 : size[1] * resolution;
    var shiftX = opt_centerShift ? opt_centerShift[0] : 0;
    var shiftY = opt_centerShift ? opt_centerShift[1] : 0;
    var minX = extent[0] + viewWidth / 2 + shiftX;
    var maxX = extent[2] - viewWidth / 2 + shiftX;
    var minY = extent[1] + viewHeight / 2 + shiftY;
    var maxY = extent[3] - viewHeight / 2 + shiftY;
    if (minX > maxX) {
      minX = (maxX + minX) / 2;
      maxX = minX;
    }
    if (minY > maxY) {
      minY = (maxY + minY) / 2;
      maxY = minY;
    }
    var x = clamp(center[0], minX, maxX);
    var y = clamp(center[1], minY, maxY);
    if (opt_isMoving && smooth && resolution) {
      var ratio = 30 * resolution;
      x += -ratio * Math.log(1 + Math.max(0, minX - center[0]) / ratio) + ratio * Math.log(1 + Math.max(0, center[0] - maxX) / ratio);
      y += -ratio * Math.log(1 + Math.max(0, minY - center[1]) / ratio) + ratio * Math.log(1 + Math.max(0, center[1] - maxY) / ratio);
    }
    return [x, y];
  };
}
function none(center) {
  return center;
}

// ../node_modules/ol/resolutionconstraint.js
function getViewportClampedResolution(resolution, maxExtent, viewportSize, showFullExtent) {
  var xResolution = getWidth(maxExtent) / viewportSize[0];
  var yResolution = getHeight(maxExtent) / viewportSize[1];
  if (showFullExtent) {
    return Math.min(resolution, Math.max(xResolution, yResolution));
  }
  return Math.min(resolution, Math.min(xResolution, yResolution));
}
function getSmoothClampedResolution(resolution, maxResolution, minResolution) {
  var result = Math.min(resolution, maxResolution);
  var ratio = 50;
  result *= Math.log(1 + ratio * Math.max(0, resolution / maxResolution - 1)) / ratio + 1;
  if (minResolution) {
    result = Math.max(result, minResolution);
    result /= Math.log(1 + ratio * Math.max(0, minResolution / resolution - 1)) / ratio + 1;
  }
  return clamp(result, minResolution / 2, maxResolution * 2);
}
function createSnapToResolutions(resolutions, opt_smooth, opt_maxExtent, opt_showFullExtent) {
  return function(resolution, direction, size, opt_isMoving) {
    if (resolution !== void 0) {
      var maxResolution = resolutions[0];
      var minResolution = resolutions[resolutions.length - 1];
      var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution;
      if (opt_isMoving) {
        var smooth = opt_smooth !== void 0 ? opt_smooth : true;
        if (!smooth) {
          return clamp(resolution, minResolution, cappedMaxRes);
        }
        return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
      }
      var capped = Math.min(cappedMaxRes, resolution);
      var z = Math.floor(linearFindNearest(resolutions, capped, direction));
      if (resolutions[z] > cappedMaxRes && z < resolutions.length - 1) {
        return resolutions[z + 1];
      }
      return resolutions[z];
    } else {
      return void 0;
    }
  };
}
function createSnapToPower(power, maxResolution, opt_minResolution, opt_smooth, opt_maxExtent, opt_showFullExtent) {
  return function(resolution, direction, size, opt_isMoving) {
    if (resolution !== void 0) {
      var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution;
      var minResolution = opt_minResolution !== void 0 ? opt_minResolution : 0;
      if (opt_isMoving) {
        var smooth = opt_smooth !== void 0 ? opt_smooth : true;
        if (!smooth) {
          return clamp(resolution, minResolution, cappedMaxRes);
        }
        return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
      }
      var tolerance = 1e-9;
      var minZoomLevel = Math.ceil(Math.log(maxResolution / cappedMaxRes) / Math.log(power) - tolerance);
      var offset = -direction * (0.5 - tolerance) + 0.5;
      var capped = Math.min(cappedMaxRes, resolution);
      var cappedZoomLevel = Math.floor(Math.log(maxResolution / capped) / Math.log(power) + offset);
      var zoomLevel = Math.max(minZoomLevel, cappedZoomLevel);
      var newResolution = maxResolution / Math.pow(power, zoomLevel);
      return clamp(newResolution, minResolution, cappedMaxRes);
    } else {
      return void 0;
    }
  };
}
function createMinMaxResolution(maxResolution, minResolution, opt_smooth, opt_maxExtent, opt_showFullExtent) {
  return function(resolution, direction, size, opt_isMoving) {
    if (resolution !== void 0) {
      var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution;
      var smooth = opt_smooth !== void 0 ? opt_smooth : true;
      if (!smooth || !opt_isMoving) {
        return clamp(resolution, minResolution, cappedMaxRes);
      }
      return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
    } else {
      return void 0;
    }
  };
}

// ../node_modules/ol/rotationconstraint.js
function disable(rotation) {
  if (rotation !== void 0) {
    return 0;
  } else {
    return void 0;
  }
}
function none2(rotation) {
  if (rotation !== void 0) {
    return rotation;
  } else {
    return void 0;
  }
}
function createSnapToN(n) {
  var theta = 2 * Math.PI / n;
  return function(rotation, opt_isMoving) {
    if (opt_isMoving) {
      return rotation;
    }
    if (rotation !== void 0) {
      rotation = Math.floor(rotation / theta + 0.5) * theta;
      return rotation;
    } else {
      return void 0;
    }
  };
}
function createSnapToZero(opt_tolerance) {
  var tolerance = opt_tolerance || toRadians(5);
  return function(rotation, opt_isMoving) {
    if (opt_isMoving) {
      return rotation;
    }
    if (rotation !== void 0) {
      if (Math.abs(rotation) <= tolerance) {
        return 0;
      } else {
        return rotation;
      }
    } else {
      return void 0;
    }
  };
}

// ../node_modules/ol/easing.js
function easeIn(t) {
  return Math.pow(t, 3);
}
function easeOut(t) {
  return 1 - easeIn(1 - t);
}
function inAndOut(t) {
  return 3 * t * t - 2 * t * t * t;
}
function linear(t) {
  return t;
}

// ../node_modules/ol/geom/GeometryLayout.js
var GeometryLayout_default = {
  XY: "XY",
  XYZ: "XYZ",
  XYM: "XYM",
  XYZM: "XYZM"
};

// ../node_modules/ol/geom/flat/transform.js
function transform2D(flatCoordinates, offset, end, stride, transform2, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;
  for (var j = offset; j < end; j += stride) {
    var x = flatCoordinates[j];
    var y = flatCoordinates[j + 1];
    dest[i++] = transform2[0] * x + transform2[2] * y + transform2[4];
    dest[i++] = transform2[1] * x + transform2[3] * y + transform2[5];
  }
  if (opt_dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}
function rotate2(flatCoordinates, offset, end, stride, angle, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;
  for (var j = offset; j < end; j += stride) {
    var deltaX = flatCoordinates[j] - anchorX;
    var deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + deltaX * cos - deltaY * sin;
    dest[i++] = anchorY + deltaX * sin + deltaY * cos;
    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (opt_dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}
function scale2(flatCoordinates, offset, end, stride, sx, sy, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;
  for (var j = offset; j < end; j += stride) {
    var deltaX = flatCoordinates[j] - anchorX;
    var deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + sx * deltaX;
    dest[i++] = anchorY + sy * deltaY;
    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (opt_dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}
function translate(flatCoordinates, offset, end, stride, deltaX, deltaY, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;
  for (var j = offset; j < end; j += stride) {
    dest[i++] = flatCoordinates[j] + deltaX;
    dest[i++] = flatCoordinates[j + 1] + deltaY;
    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (opt_dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}

// ../node_modules/ol/geom/Geometry.js
var __extends18 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var tmpTransform = create();
var Geometry = function(_super) {
  __extends18(Geometry2, _super);
  function Geometry2() {
    var _this = _super.call(this) || this;
    _this.extent_ = createEmpty();
    _this.extentRevision_ = -1;
    _this.simplifiedGeometryMaxMinSquaredTolerance = 0;
    _this.simplifiedGeometryRevision = 0;
    _this.simplifyTransformedInternal = memoizeOne(function(revision, squaredTolerance, opt_transform) {
      if (!opt_transform) {
        return this.getSimplifiedGeometry(squaredTolerance);
      }
      var clone2 = this.clone();
      clone2.applyTransform(opt_transform);
      return clone2.getSimplifiedGeometry(squaredTolerance);
    });
    return _this;
  }
  Geometry2.prototype.simplifyTransformed = function(squaredTolerance, opt_transform) {
    return this.simplifyTransformedInternal(this.getRevision(), squaredTolerance, opt_transform);
  };
  Geometry2.prototype.clone = function() {
    return abstract();
  };
  Geometry2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
    return abstract();
  };
  Geometry2.prototype.containsXY = function(x, y) {
    var coord = this.getClosestPoint([x, y]);
    return coord[0] === x && coord[1] === y;
  };
  Geometry2.prototype.getClosestPoint = function(point, opt_closestPoint) {
    var closestPoint = opt_closestPoint ? opt_closestPoint : [NaN, NaN];
    this.closestPointXY(point[0], point[1], closestPoint, Infinity);
    return closestPoint;
  };
  Geometry2.prototype.intersectsCoordinate = function(coordinate) {
    return this.containsXY(coordinate[0], coordinate[1]);
  };
  Geometry2.prototype.computeExtent = function(extent) {
    return abstract();
  };
  Geometry2.prototype.getExtent = function(opt_extent) {
    if (this.extentRevision_ != this.getRevision()) {
      var extent = this.computeExtent(this.extent_);
      if (isNaN(extent[0]) || isNaN(extent[1])) {
        createOrUpdateEmpty(extent);
      }
      this.extentRevision_ = this.getRevision();
    }
    return returnOrUpdate(this.extent_, opt_extent);
  };
  Geometry2.prototype.rotate = function(angle, anchor) {
    abstract();
  };
  Geometry2.prototype.scale = function(sx, opt_sy, opt_anchor) {
    abstract();
  };
  Geometry2.prototype.simplify = function(tolerance) {
    return this.getSimplifiedGeometry(tolerance * tolerance);
  };
  Geometry2.prototype.getSimplifiedGeometry = function(squaredTolerance) {
    return abstract();
  };
  Geometry2.prototype.getType = function() {
    return abstract();
  };
  Geometry2.prototype.applyTransform = function(transformFn) {
    abstract();
  };
  Geometry2.prototype.intersectsExtent = function(extent) {
    return abstract();
  };
  Geometry2.prototype.translate = function(deltaX, deltaY) {
    abstract();
  };
  Geometry2.prototype.transform = function(source, destination) {
    var sourceProj = get3(source);
    var transformFn = sourceProj.getUnits() == Units_default.TILE_PIXELS ? function(inCoordinates, outCoordinates, stride) {
      var pixelExtent = sourceProj.getExtent();
      var projectedExtent = sourceProj.getWorldExtent();
      var scale3 = getHeight(projectedExtent) / getHeight(pixelExtent);
      compose(tmpTransform, projectedExtent[0], projectedExtent[3], scale3, -scale3, 0, 0, 0);
      transform2D(inCoordinates, 0, inCoordinates.length, stride, tmpTransform, outCoordinates);
      return getTransform(sourceProj, destination)(inCoordinates, outCoordinates, stride);
    } : getTransform(sourceProj, destination);
    this.applyTransform(transformFn);
    return this;
  };
  return Geometry2;
}(Object_default);
var Geometry_default = Geometry;

// ../node_modules/ol/geom/SimpleGeometry.js
var __extends19 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var SimpleGeometry = function(_super) {
  __extends19(SimpleGeometry2, _super);
  function SimpleGeometry2() {
    var _this = _super.call(this) || this;
    _this.layout = GeometryLayout_default.XY;
    _this.stride = 2;
    _this.flatCoordinates = null;
    return _this;
  }
  SimpleGeometry2.prototype.computeExtent = function(extent) {
    return createOrUpdateFromFlatCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
  };
  SimpleGeometry2.prototype.getCoordinates = function() {
    return abstract();
  };
  SimpleGeometry2.prototype.getFirstCoordinate = function() {
    return this.flatCoordinates.slice(0, this.stride);
  };
  SimpleGeometry2.prototype.getFlatCoordinates = function() {
    return this.flatCoordinates;
  };
  SimpleGeometry2.prototype.getLastCoordinate = function() {
    return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
  };
  SimpleGeometry2.prototype.getLayout = function() {
    return this.layout;
  };
  SimpleGeometry2.prototype.getSimplifiedGeometry = function(squaredTolerance) {
    if (this.simplifiedGeometryRevision !== this.getRevision()) {
      this.simplifiedGeometryMaxMinSquaredTolerance = 0;
      this.simplifiedGeometryRevision = this.getRevision();
    }
    if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance) {
      return this;
    }
    var simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
    var simplifiedFlatCoordinates = simplifiedGeometry.getFlatCoordinates();
    if (simplifiedFlatCoordinates.length < this.flatCoordinates.length) {
      return simplifiedGeometry;
    } else {
      this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
      return this;
    }
  };
  SimpleGeometry2.prototype.getSimplifiedGeometryInternal = function(squaredTolerance) {
    return this;
  };
  SimpleGeometry2.prototype.getStride = function() {
    return this.stride;
  };
  SimpleGeometry2.prototype.setFlatCoordinates = function(layout, flatCoordinates) {
    this.stride = getStrideForLayout(layout);
    this.layout = layout;
    this.flatCoordinates = flatCoordinates;
  };
  SimpleGeometry2.prototype.setCoordinates = function(coordinates2, opt_layout) {
    abstract();
  };
  SimpleGeometry2.prototype.setLayout = function(layout, coordinates2, nesting) {
    var stride;
    if (layout) {
      stride = getStrideForLayout(layout);
    } else {
      for (var i = 0; i < nesting; ++i) {
        if (coordinates2.length === 0) {
          this.layout = GeometryLayout_default.XY;
          this.stride = 2;
          return;
        } else {
          coordinates2 = coordinates2[0];
        }
      }
      stride = coordinates2.length;
      layout = getLayoutForStride(stride);
    }
    this.layout = layout;
    this.stride = stride;
  };
  SimpleGeometry2.prototype.applyTransform = function(transformFn) {
    if (this.flatCoordinates) {
      transformFn(this.flatCoordinates, this.flatCoordinates, this.stride);
      this.changed();
    }
  };
  SimpleGeometry2.prototype.rotate = function(angle, anchor) {
    var flatCoordinates = this.getFlatCoordinates();
    if (flatCoordinates) {
      var stride = this.getStride();
      rotate2(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
      this.changed();
    }
  };
  SimpleGeometry2.prototype.scale = function(sx, opt_sy, opt_anchor) {
    var sy = opt_sy;
    if (sy === void 0) {
      sy = sx;
    }
    var anchor = opt_anchor;
    if (!anchor) {
      anchor = getCenter(this.getExtent());
    }
    var flatCoordinates = this.getFlatCoordinates();
    if (flatCoordinates) {
      var stride = this.getStride();
      scale2(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
      this.changed();
    }
  };
  SimpleGeometry2.prototype.translate = function(deltaX, deltaY) {
    var flatCoordinates = this.getFlatCoordinates();
    if (flatCoordinates) {
      var stride = this.getStride();
      translate(flatCoordinates, 0, flatCoordinates.length, stride, deltaX, deltaY, flatCoordinates);
      this.changed();
    }
  };
  return SimpleGeometry2;
}(Geometry_default);
function getLayoutForStride(stride) {
  var layout;
  if (stride == 2) {
    layout = GeometryLayout_default.XY;
  } else if (stride == 3) {
    layout = GeometryLayout_default.XYZ;
  } else if (stride == 4) {
    layout = GeometryLayout_default.XYZM;
  }
  return layout;
}
function getStrideForLayout(layout) {
  var stride;
  if (layout == GeometryLayout_default.XY) {
    stride = 2;
  } else if (layout == GeometryLayout_default.XYZ || layout == GeometryLayout_default.XYM) {
    stride = 3;
  } else if (layout == GeometryLayout_default.XYZM) {
    stride = 4;
  }
  return stride;
}
var SimpleGeometry_default = SimpleGeometry;

// ../node_modules/ol/geom/flat/closest.js
function assignClosest(flatCoordinates, offset1, offset2, stride, x, y, closestPoint) {
  var x1 = flatCoordinates[offset1];
  var y1 = flatCoordinates[offset1 + 1];
  var dx = flatCoordinates[offset2] - x1;
  var dy = flatCoordinates[offset2 + 1] - y1;
  var offset;
  if (dx === 0 && dy === 0) {
    offset = offset1;
  } else {
    var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      offset = offset2;
    } else if (t > 0) {
      for (var i = 0; i < stride; ++i) {
        closestPoint[i] = lerp(flatCoordinates[offset1 + i], flatCoordinates[offset2 + i], t);
      }
      closestPoint.length = stride;
      return;
    } else {
      offset = offset1;
    }
  }
  for (var i = 0; i < stride; ++i) {
    closestPoint[i] = flatCoordinates[offset + i];
  }
  closestPoint.length = stride;
}
function maxSquaredDelta(flatCoordinates, offset, end, stride, max) {
  var x1 = flatCoordinates[offset];
  var y1 = flatCoordinates[offset + 1];
  for (offset += stride; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    var squaredDelta = squaredDistance(x1, y1, x2, y2);
    if (squaredDelta > max) {
      max = squaredDelta;
    }
    x1 = x2;
    y1 = y2;
  }
  return max;
}
function arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    max = maxSquaredDelta(flatCoordinates, offset, end, stride, max);
    offset = end;
  }
  return max;
}
function assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  if (offset == end) {
    return minSquaredDistance;
  }
  var i, squaredDistance2;
  if (maxDelta === 0) {
    squaredDistance2 = squaredDistance(x, y, flatCoordinates[offset], flatCoordinates[offset + 1]);
    if (squaredDistance2 < minSquaredDistance) {
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[offset + i];
      }
      closestPoint.length = stride;
      return squaredDistance2;
    } else {
      return minSquaredDistance;
    }
  }
  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
  var index = offset + stride;
  while (index < end) {
    assignClosest(flatCoordinates, index - stride, index, stride, x, y, tmpPoint);
    squaredDistance2 = squaredDistance(x, y, tmpPoint[0], tmpPoint[1]);
    if (squaredDistance2 < minSquaredDistance) {
      minSquaredDistance = squaredDistance2;
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }
      closestPoint.length = stride;
      index += stride;
    } else {
      index += stride * Math.max((Math.sqrt(squaredDistance2) - Math.sqrt(minSquaredDistance)) / maxDelta | 0, 1);
    }
  }
  if (isRing) {
    assignClosest(flatCoordinates, end - stride, offset, stride, x, y, tmpPoint);
    squaredDistance2 = squaredDistance(x, y, tmpPoint[0], tmpPoint[1]);
    if (squaredDistance2 < minSquaredDistance) {
      minSquaredDistance = squaredDistance2;
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }
      closestPoint.length = stride;
    }
  }
  return minSquaredDistance;
}
function assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    minSquaredDistance = assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
    offset = end;
  }
  return minSquaredDistance;
}

// ../node_modules/ol/geom/flat/deflate.js
function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
  for (var i = 0, ii = coordinate.length; i < ii; ++i) {
    flatCoordinates[offset++] = coordinate[i];
  }
  return offset;
}
function deflateCoordinates(flatCoordinates, offset, coordinates2, stride) {
  for (var i = 0, ii = coordinates2.length; i < ii; ++i) {
    var coordinate = coordinates2[i];
    for (var j = 0; j < stride; ++j) {
      flatCoordinates[offset++] = coordinate[j];
    }
  }
  return offset;
}
function deflateCoordinatesArray(flatCoordinates, offset, coordinatess, stride, opt_ends) {
  var ends = opt_ends ? opt_ends : [];
  var i = 0;
  for (var j = 0, jj = coordinatess.length; j < jj; ++j) {
    var end = deflateCoordinates(flatCoordinates, offset, coordinatess[j], stride);
    ends[i++] = end;
    offset = end;
  }
  ends.length = i;
  return ends;
}

// ../node_modules/ol/geom/flat/simplify.js
function douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  var n = (end - offset) / stride;
  if (n < 3) {
    for (; offset < end; offset += stride) {
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
    }
    return simplifiedOffset;
  }
  var markers = new Array(n);
  markers[0] = 1;
  markers[n - 1] = 1;
  var stack = [offset, end - stride];
  var index = 0;
  while (stack.length > 0) {
    var last = stack.pop();
    var first = stack.pop();
    var maxSquaredDistance = 0;
    var x1 = flatCoordinates[first];
    var y1 = flatCoordinates[first + 1];
    var x2 = flatCoordinates[last];
    var y2 = flatCoordinates[last + 1];
    for (var i = first + stride; i < last; i += stride) {
      var x = flatCoordinates[i];
      var y = flatCoordinates[i + 1];
      var squaredDistance_1 = squaredSegmentDistance(x, y, x1, y1, x2, y2);
      if (squaredDistance_1 > maxSquaredDistance) {
        index = i;
        maxSquaredDistance = squaredDistance_1;
      }
    }
    if (maxSquaredDistance > squaredTolerance) {
      markers[(index - offset) / stride] = 1;
      if (first + stride < index) {
        stack.push(first, index);
      }
      if (index + stride < last) {
        stack.push(index, last);
      }
    }
  }
  for (var i = 0; i < n; ++i) {
    if (markers[i]) {
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride + 1];
    }
  }
  return simplifiedOffset;
}
function snap(value, tolerance) {
  return tolerance * Math.round(value / tolerance);
}
function quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  if (offset == end) {
    return simplifiedOffset;
  }
  var x1 = snap(flatCoordinates[offset], tolerance);
  var y1 = snap(flatCoordinates[offset + 1], tolerance);
  offset += stride;
  simplifiedFlatCoordinates[simplifiedOffset++] = x1;
  simplifiedFlatCoordinates[simplifiedOffset++] = y1;
  var x2, y2;
  do {
    x2 = snap(flatCoordinates[offset], tolerance);
    y2 = snap(flatCoordinates[offset + 1], tolerance);
    offset += stride;
    if (offset == end) {
      simplifiedFlatCoordinates[simplifiedOffset++] = x2;
      simplifiedFlatCoordinates[simplifiedOffset++] = y2;
      return simplifiedOffset;
    }
  } while (x2 == x1 && y2 == y1);
  while (offset < end) {
    var x3 = snap(flatCoordinates[offset], tolerance);
    var y3 = snap(flatCoordinates[offset + 1], tolerance);
    offset += stride;
    if (x3 == x2 && y3 == y2) {
      continue;
    }
    var dx1 = x2 - x1;
    var dy1 = y2 - y1;
    var dx2 = x3 - x1;
    var dy2 = y3 - y1;
    if (dx1 * dy2 == dy1 * dx2 && (dx1 < 0 && dx2 < dx1 || dx1 == dx2 || dx1 > 0 && dx2 > dx1) && (dy1 < 0 && dy2 < dy1 || dy1 == dy2 || dy1 > 0 && dy2 > dy1)) {
      x2 = x3;
      y2 = y3;
      continue;
    }
    simplifiedFlatCoordinates[simplifiedOffset++] = x2;
    simplifiedFlatCoordinates[simplifiedOffset++] = y2;
    x1 = x2;
    y1 = y2;
    x2 = x3;
    y2 = y3;
  }
  simplifiedFlatCoordinates[simplifiedOffset++] = x2;
  simplifiedFlatCoordinates[simplifiedOffset++] = y2;
  return simplifiedOffset;
}
function quantizeArray(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    simplifiedOffset = quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset);
    simplifiedEnds.push(simplifiedOffset);
    offset = end;
  }
  return simplifiedOffset;
}

// ../node_modules/ol/geom/flat/inflate.js
function inflateCoordinates(flatCoordinates, offset, end, stride, opt_coordinates) {
  var coordinates2 = opt_coordinates !== void 0 ? opt_coordinates : [];
  var i = 0;
  for (var j = offset; j < end; j += stride) {
    coordinates2[i++] = flatCoordinates.slice(j, j + stride);
  }
  coordinates2.length = i;
  return coordinates2;
}
function inflateCoordinatesArray(flatCoordinates, offset, ends, stride, opt_coordinatess) {
  var coordinatess = opt_coordinatess !== void 0 ? opt_coordinatess : [];
  var i = 0;
  for (var j = 0, jj = ends.length; j < jj; ++j) {
    var end = ends[j];
    coordinatess[i++] = inflateCoordinates(flatCoordinates, offset, end, stride, coordinatess[i]);
    offset = end;
  }
  coordinatess.length = i;
  return coordinatess;
}

// ../node_modules/ol/geom/flat/area.js
function linearRing(flatCoordinates, offset, end, stride) {
  var twiceArea = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];
  for (; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    twiceArea += y1 * x2 - x1 * y2;
    x1 = x2;
    y1 = y2;
  }
  return twiceArea / 2;
}
function linearRings(flatCoordinates, offset, ends, stride) {
  var area = 0;
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    area += linearRing(flatCoordinates, offset, end, stride);
    offset = end;
  }
  return area;
}

// ../node_modules/ol/geom/LinearRing.js
var __extends20 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var LinearRing = function(_super) {
  __extends20(LinearRing2, _super);
  function LinearRing2(coordinates2, opt_layout) {
    var _this = _super.call(this) || this;
    _this.maxDelta_ = -1;
    _this.maxDeltaRevision_ = -1;
    if (opt_layout !== void 0 && !Array.isArray(coordinates2[0])) {
      _this.setFlatCoordinates(opt_layout, coordinates2);
    } else {
      _this.setCoordinates(coordinates2, opt_layout);
    }
    return _this;
  }
  LinearRing2.prototype.clone = function() {
    return new LinearRing2(this.flatCoordinates.slice(), this.layout);
  };
  LinearRing2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt(maxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }
    return assignClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
  };
  LinearRing2.prototype.getArea = function() {
    return linearRing(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };
  LinearRing2.prototype.getCoordinates = function() {
    return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };
  LinearRing2.prototype.getSimplifiedGeometryInternal = function(squaredTolerance) {
    var simplifiedFlatCoordinates = [];
    simplifiedFlatCoordinates.length = douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
    return new LinearRing2(simplifiedFlatCoordinates, GeometryLayout_default.XY);
  };
  LinearRing2.prototype.getType = function() {
    return GeometryType_default.LINEAR_RING;
  };
  LinearRing2.prototype.intersectsExtent = function(extent) {
    return false;
  };
  LinearRing2.prototype.setCoordinates = function(coordinates2, opt_layout) {
    this.setLayout(opt_layout, coordinates2, 1);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates2, this.stride);
    this.changed();
  };
  return LinearRing2;
}(SimpleGeometry_default);
var LinearRing_default = LinearRing;

// ../node_modules/ol/geom/Point.js
var __extends21 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Point = function(_super) {
  __extends21(Point2, _super);
  function Point2(coordinates2, opt_layout) {
    var _this = _super.call(this) || this;
    _this.setCoordinates(coordinates2, opt_layout);
    return _this;
  }
  Point2.prototype.clone = function() {
    var point = new Point2(this.flatCoordinates.slice(), this.layout);
    point.applyProperties(this);
    return point;
  };
  Point2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
    var flatCoordinates = this.flatCoordinates;
    var squaredDistance2 = squaredDistance(x, y, flatCoordinates[0], flatCoordinates[1]);
    if (squaredDistance2 < minSquaredDistance) {
      var stride = this.stride;
      for (var i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[i];
      }
      closestPoint.length = stride;
      return squaredDistance2;
    } else {
      return minSquaredDistance;
    }
  };
  Point2.prototype.getCoordinates = function() {
    return !this.flatCoordinates ? [] : this.flatCoordinates.slice();
  };
  Point2.prototype.computeExtent = function(extent) {
    return createOrUpdateFromCoordinate(this.flatCoordinates, extent);
  };
  Point2.prototype.getType = function() {
    return GeometryType_default.POINT;
  };
  Point2.prototype.intersectsExtent = function(extent) {
    return containsXY(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
  };
  Point2.prototype.setCoordinates = function(coordinates2, opt_layout) {
    this.setLayout(opt_layout, coordinates2, 0);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = deflateCoordinate(this.flatCoordinates, 0, coordinates2, this.stride);
    this.changed();
  };
  return Point2;
}(SimpleGeometry_default);
var Point_default = Point;

// ../node_modules/ol/geom/flat/contains.js
function linearRingContainsExtent(flatCoordinates, offset, end, stride, extent) {
  var outside = forEachCorner(extent, function(coordinate) {
    return !linearRingContainsXY(flatCoordinates, offset, end, stride, coordinate[0], coordinate[1]);
  });
  return !outside;
}
function linearRingContainsXY(flatCoordinates, offset, end, stride, x, y) {
  var wn = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];
  for (; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    if (y1 <= y) {
      if (y2 > y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) > 0) {
        wn++;
      }
    } else if (y2 <= y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) < 0) {
      wn--;
    }
    x1 = x2;
    y1 = y2;
  }
  return wn !== 0;
}
function linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y) {
  if (ends.length === 0) {
    return false;
  }
  if (!linearRingContainsXY(flatCoordinates, offset, ends[0], stride, x, y)) {
    return false;
  }
  for (var i = 1, ii = ends.length; i < ii; ++i) {
    if (linearRingContainsXY(flatCoordinates, ends[i - 1], ends[i], stride, x, y)) {
      return false;
    }
  }
  return true;
}

// ../node_modules/ol/geom/flat/interiorpoint.js
function getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, flatCentersOffset, opt_dest) {
  var i, ii, x, x1, x2, y1, y2;
  var y = flatCenters[flatCentersOffset + 1];
  var intersections = [];
  for (var r = 0, rr = ends.length; r < rr; ++r) {
    var end = ends[r];
    x1 = flatCoordinates[end - stride];
    y1 = flatCoordinates[end - stride + 1];
    for (i = offset; i < end; i += stride) {
      x2 = flatCoordinates[i];
      y2 = flatCoordinates[i + 1];
      if (y <= y1 && y2 <= y || y1 <= y && y <= y2) {
        x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
        intersections.push(x);
      }
      x1 = x2;
      y1 = y2;
    }
  }
  var pointX = NaN;
  var maxSegmentLength = -Infinity;
  intersections.sort(numberSafeCompareFunction);
  x1 = intersections[0];
  for (i = 1, ii = intersections.length; i < ii; ++i) {
    x2 = intersections[i];
    var segmentLength = Math.abs(x2 - x1);
    if (segmentLength > maxSegmentLength) {
      x = (x1 + x2) / 2;
      if (linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y)) {
        pointX = x;
        maxSegmentLength = segmentLength;
      }
    }
    x1 = x2;
  }
  if (isNaN(pointX)) {
    pointX = flatCenters[flatCentersOffset];
  }
  if (opt_dest) {
    opt_dest.push(pointX, y, maxSegmentLength);
    return opt_dest;
  } else {
    return [pointX, y, maxSegmentLength];
  }
}

// ../node_modules/ol/geom/flat/segments.js
function forEach(flatCoordinates, offset, end, stride, callback) {
  var ret;
  offset += stride;
  for (; offset < end; offset += stride) {
    ret = callback(flatCoordinates.slice(offset - stride, offset), flatCoordinates.slice(offset, offset + stride));
    if (ret) {
      return ret;
    }
  }
  return false;
}

// ../node_modules/ol/geom/flat/intersectsextent.js
function intersectsLineString(flatCoordinates, offset, end, stride, extent) {
  var coordinatesExtent = extendFlatCoordinates(createEmpty(), flatCoordinates, offset, end, stride);
  if (!intersects(extent, coordinatesExtent)) {
    return false;
  }
  if (containsExtent(extent, coordinatesExtent)) {
    return true;
  }
  if (coordinatesExtent[0] >= extent[0] && coordinatesExtent[2] <= extent[2]) {
    return true;
  }
  if (coordinatesExtent[1] >= extent[1] && coordinatesExtent[3] <= extent[3]) {
    return true;
  }
  return forEach(flatCoordinates, offset, end, stride, function(point1, point2) {
    return intersectsSegment(extent, point1, point2);
  });
}
function intersectsLinearRing(flatCoordinates, offset, end, stride, extent) {
  if (intersectsLineString(flatCoordinates, offset, end, stride, extent)) {
    return true;
  }
  if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[0], extent[1])) {
    return true;
  }
  if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[0], extent[3])) {
    return true;
  }
  if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[2], extent[1])) {
    return true;
  }
  if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[2], extent[3])) {
    return true;
  }
  return false;
}
function intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent) {
  if (!intersectsLinearRing(flatCoordinates, offset, ends[0], stride, extent)) {
    return false;
  }
  if (ends.length === 1) {
    return true;
  }
  for (var i = 1, ii = ends.length; i < ii; ++i) {
    if (linearRingContainsExtent(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
      if (!intersectsLineString(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
        return false;
      }
    }
  }
  return true;
}

// ../node_modules/ol/geom/flat/reverse.js
function coordinates(flatCoordinates, offset, end, stride) {
  while (offset < end - stride) {
    for (var i = 0; i < stride; ++i) {
      var tmp = flatCoordinates[offset + i];
      flatCoordinates[offset + i] = flatCoordinates[end - stride + i];
      flatCoordinates[end - stride + i] = tmp;
    }
    offset += stride;
    end -= stride;
  }
}

// ../node_modules/ol/geom/flat/orient.js
function linearRingIsClockwise(flatCoordinates, offset, end, stride) {
  var edge = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];
  for (; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    edge += (x2 - x1) * (y2 + y1);
    x1 = x2;
    y1 = y2;
  }
  return edge === 0 ? void 0 : edge > 0;
}
function linearRingsAreOriented(flatCoordinates, offset, ends, stride, opt_right) {
  var right = opt_right !== void 0 ? opt_right : false;
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    var isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);
    if (i === 0) {
      if (right && isClockwise || !right && !isClockwise) {
        return false;
      }
    } else {
      if (right && !isClockwise || !right && isClockwise) {
        return false;
      }
    }
    offset = end;
  }
  return true;
}
function orientLinearRings(flatCoordinates, offset, ends, stride, opt_right) {
  var right = opt_right !== void 0 ? opt_right : false;
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    var isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);
    var reverse = i === 0 ? right && isClockwise || !right && !isClockwise : right && !isClockwise || !right && isClockwise;
    if (reverse) {
      coordinates(flatCoordinates, offset, end, stride);
    }
    offset = end;
  }
  return offset;
}

// ../node_modules/ol/geom/Polygon.js
var __extends22 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Polygon = function(_super) {
  __extends22(Polygon2, _super);
  function Polygon2(coordinates2, opt_layout, opt_ends) {
    var _this = _super.call(this) || this;
    _this.ends_ = [];
    _this.flatInteriorPointRevision_ = -1;
    _this.flatInteriorPoint_ = null;
    _this.maxDelta_ = -1;
    _this.maxDeltaRevision_ = -1;
    _this.orientedRevision_ = -1;
    _this.orientedFlatCoordinates_ = null;
    if (opt_layout !== void 0 && opt_ends) {
      _this.setFlatCoordinates(opt_layout, coordinates2);
      _this.ends_ = opt_ends;
    } else {
      _this.setCoordinates(coordinates2, opt_layout);
    }
    return _this;
  }
  Polygon2.prototype.appendLinearRing = function(linearRing2) {
    if (!this.flatCoordinates) {
      this.flatCoordinates = linearRing2.getFlatCoordinates().slice();
    } else {
      extend(this.flatCoordinates, linearRing2.getFlatCoordinates());
    }
    this.ends_.push(this.flatCoordinates.length);
    this.changed();
  };
  Polygon2.prototype.clone = function() {
    var polygon = new Polygon2(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
    polygon.applyProperties(this);
    return polygon;
  };
  Polygon2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt(arrayMaxSquaredDelta(this.flatCoordinates, 0, this.ends_, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }
    return assignClosestArrayPoint(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
  };
  Polygon2.prototype.containsXY = function(x, y) {
    return linearRingsContainsXY(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, x, y);
  };
  Polygon2.prototype.getArea = function() {
    return linearRings(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
  };
  Polygon2.prototype.getCoordinates = function(opt_right) {
    var flatCoordinates;
    if (opt_right !== void 0) {
      flatCoordinates = this.getOrientedFlatCoordinates().slice();
      orientLinearRings(flatCoordinates, 0, this.ends_, this.stride, opt_right);
    } else {
      flatCoordinates = this.flatCoordinates;
    }
    return inflateCoordinatesArray(flatCoordinates, 0, this.ends_, this.stride);
  };
  Polygon2.prototype.getEnds = function() {
    return this.ends_;
  };
  Polygon2.prototype.getFlatInteriorPoint = function() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      var flatCenter = getCenter(this.getExtent());
      this.flatInteriorPoint_ = getInteriorPointOfArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, flatCenter, 0);
      this.flatInteriorPointRevision_ = this.getRevision();
    }
    return this.flatInteriorPoint_;
  };
  Polygon2.prototype.getInteriorPoint = function() {
    return new Point_default(this.getFlatInteriorPoint(), GeometryLayout_default.XYM);
  };
  Polygon2.prototype.getLinearRingCount = function() {
    return this.ends_.length;
  };
  Polygon2.prototype.getLinearRing = function(index) {
    if (index < 0 || this.ends_.length <= index) {
      return null;
    }
    return new LinearRing_default(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
  };
  Polygon2.prototype.getLinearRings = function() {
    var layout = this.layout;
    var flatCoordinates = this.flatCoordinates;
    var ends = this.ends_;
    var linearRings2 = [];
    var offset = 0;
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      var linearRing2 = new LinearRing_default(flatCoordinates.slice(offset, end), layout);
      linearRings2.push(linearRing2);
      offset = end;
    }
    return linearRings2;
  };
  Polygon2.prototype.getOrientedFlatCoordinates = function() {
    if (this.orientedRevision_ != this.getRevision()) {
      var flatCoordinates = this.flatCoordinates;
      if (linearRingsAreOriented(flatCoordinates, 0, this.ends_, this.stride)) {
        this.orientedFlatCoordinates_ = flatCoordinates;
      } else {
        this.orientedFlatCoordinates_ = flatCoordinates.slice();
        this.orientedFlatCoordinates_.length = orientLinearRings(this.orientedFlatCoordinates_, 0, this.ends_, this.stride);
      }
      this.orientedRevision_ = this.getRevision();
    }
    return this.orientedFlatCoordinates_;
  };
  Polygon2.prototype.getSimplifiedGeometryInternal = function(squaredTolerance) {
    var simplifiedFlatCoordinates = [];
    var simplifiedEnds = [];
    simplifiedFlatCoordinates.length = quantizeArray(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEnds);
    return new Polygon2(simplifiedFlatCoordinates, GeometryLayout_default.XY, simplifiedEnds);
  };
  Polygon2.prototype.getType = function() {
    return GeometryType_default.POLYGON;
  };
  Polygon2.prototype.intersectsExtent = function(extent) {
    return intersectsLinearRingArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, extent);
  };
  Polygon2.prototype.setCoordinates = function(coordinates2, opt_layout) {
    this.setLayout(opt_layout, coordinates2, 2);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    var ends = deflateCoordinatesArray(this.flatCoordinates, 0, coordinates2, this.stride, this.ends_);
    this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
    this.changed();
  };
  return Polygon2;
}(SimpleGeometry_default);
var Polygon_default = Polygon;
function fromExtent(extent) {
  var minX = extent[0];
  var minY = extent[1];
  var maxX = extent[2];
  var maxY = extent[3];
  var flatCoordinates = [
    minX,
    minY,
    minX,
    maxY,
    maxX,
    maxY,
    maxX,
    minY,
    minX,
    minY
  ];
  return new Polygon(flatCoordinates, GeometryLayout_default.XY, [
    flatCoordinates.length
  ]);
}

// ../node_modules/ol/View.js
var __extends23 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var DEFAULT_MIN_ZOOM = 0;
var View = function(_super) {
  __extends23(View2, _super);
  function View2(opt_options) {
    var _this = _super.call(this) || this;
    _this.on;
    _this.once;
    _this.un;
    var options = assign({}, opt_options);
    _this.hints_ = [0, 0];
    _this.animations_ = [];
    _this.updateAnimationKey_;
    _this.projection_ = createProjection(options.projection, "EPSG:3857");
    _this.viewportSize_ = [100, 100];
    _this.targetCenter_ = null;
    _this.targetResolution_;
    _this.targetRotation_;
    _this.nextCenter_ = null;
    _this.nextResolution_;
    _this.nextRotation_;
    _this.cancelAnchor_ = void 0;
    if (options.projection) {
      disableCoordinateWarning();
    }
    if (options.center) {
      options.center = fromUserCoordinate(options.center, _this.projection_);
    }
    if (options.extent) {
      options.extent = fromUserExtent(options.extent, _this.projection_);
    }
    _this.applyOptions_(options);
    return _this;
  }
  View2.prototype.applyOptions_ = function(options) {
    var properties = assign({}, options);
    for (var key in ViewProperty_default) {
      delete properties[key];
    }
    this.setProperties(properties, true);
    var resolutionConstraintInfo = createResolutionConstraint(options);
    this.maxResolution_ = resolutionConstraintInfo.maxResolution;
    this.minResolution_ = resolutionConstraintInfo.minResolution;
    this.zoomFactor_ = resolutionConstraintInfo.zoomFactor;
    this.resolutions_ = options.resolutions;
    this.padding_ = options.padding;
    this.minZoom_ = resolutionConstraintInfo.minZoom;
    var centerConstraint = createCenterConstraint(options);
    var resolutionConstraint = resolutionConstraintInfo.constraint;
    var rotationConstraint = createRotationConstraint(options);
    this.constraints_ = {
      center: centerConstraint,
      resolution: resolutionConstraint,
      rotation: rotationConstraint
    };
    this.setRotation(options.rotation !== void 0 ? options.rotation : 0);
    this.setCenterInternal(options.center !== void 0 ? options.center : null);
    if (options.resolution !== void 0) {
      this.setResolution(options.resolution);
    } else if (options.zoom !== void 0) {
      this.setZoom(options.zoom);
    }
  };
  Object.defineProperty(View2.prototype, "padding", {
    get: function() {
      return this.padding_;
    },
    set: function(padding) {
      var oldPadding = this.padding_;
      this.padding_ = padding;
      var center = this.getCenter();
      if (center) {
        var newPadding = padding || [0, 0, 0, 0];
        oldPadding = oldPadding || [0, 0, 0, 0];
        var resolution = this.getResolution();
        var offsetX = resolution / 2 * (newPadding[3] - oldPadding[3] + oldPadding[1] - newPadding[1]);
        var offsetY = resolution / 2 * (newPadding[0] - oldPadding[0] + oldPadding[2] - newPadding[2]);
        this.setCenterInternal([center[0] + offsetX, center[1] - offsetY]);
      }
    },
    enumerable: false,
    configurable: true
  });
  View2.prototype.getUpdatedOptions_ = function(newOptions) {
    var options = this.getProperties();
    if (options.resolution !== void 0) {
      options.resolution = this.getResolution();
    } else {
      options.zoom = this.getZoom();
    }
    options.center = this.getCenterInternal();
    options.rotation = this.getRotation();
    return assign({}, options, newOptions);
  };
  View2.prototype.animate = function(var_args) {
    if (this.isDef() && !this.getAnimating()) {
      this.resolveConstraints(0);
    }
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; ++i) {
      var options = arguments[i];
      if (options.center) {
        options = assign({}, options);
        options.center = fromUserCoordinate(options.center, this.getProjection());
      }
      if (options.anchor) {
        options = assign({}, options);
        options.anchor = fromUserCoordinate(options.anchor, this.getProjection());
      }
      args[i] = options;
    }
    this.animateInternal.apply(this, args);
  };
  View2.prototype.animateInternal = function(var_args) {
    var animationCount = arguments.length;
    var callback;
    if (animationCount > 1 && typeof arguments[animationCount - 1] === "function") {
      callback = arguments[animationCount - 1];
      --animationCount;
    }
    var i = 0;
    for (; i < animationCount && !this.isDef(); ++i) {
      var state = arguments[i];
      if (state.center) {
        this.setCenterInternal(state.center);
      }
      if (state.zoom !== void 0) {
        this.setZoom(state.zoom);
      } else if (state.resolution) {
        this.setResolution(state.resolution);
      }
      if (state.rotation !== void 0) {
        this.setRotation(state.rotation);
      }
    }
    if (i === animationCount) {
      if (callback) {
        animationCallback(callback, true);
      }
      return;
    }
    var start = Date.now();
    var center = this.targetCenter_.slice();
    var resolution = this.targetResolution_;
    var rotation = this.targetRotation_;
    var series = [];
    for (; i < animationCount; ++i) {
      var options = arguments[i];
      var animation = {
        start,
        complete: false,
        anchor: options.anchor,
        duration: options.duration !== void 0 ? options.duration : 1e3,
        easing: options.easing || inAndOut,
        callback
      };
      if (options.center) {
        animation.sourceCenter = center;
        animation.targetCenter = options.center.slice();
        center = animation.targetCenter;
      }
      if (options.zoom !== void 0) {
        animation.sourceResolution = resolution;
        animation.targetResolution = this.getResolutionForZoom(options.zoom);
        resolution = animation.targetResolution;
      } else if (options.resolution) {
        animation.sourceResolution = resolution;
        animation.targetResolution = options.resolution;
        resolution = animation.targetResolution;
      }
      if (options.rotation !== void 0) {
        animation.sourceRotation = rotation;
        var delta = modulo(options.rotation - rotation + Math.PI, 2 * Math.PI) - Math.PI;
        animation.targetRotation = rotation + delta;
        rotation = animation.targetRotation;
      }
      if (isNoopAnimation(animation)) {
        animation.complete = true;
      } else {
        start += animation.duration;
      }
      series.push(animation);
    }
    this.animations_.push(series);
    this.setHint(ViewHint_default.ANIMATING, 1);
    this.updateAnimations_();
  };
  View2.prototype.getAnimating = function() {
    return this.hints_[ViewHint_default.ANIMATING] > 0;
  };
  View2.prototype.getInteracting = function() {
    return this.hints_[ViewHint_default.INTERACTING] > 0;
  };
  View2.prototype.cancelAnimations = function() {
    this.setHint(ViewHint_default.ANIMATING, -this.hints_[ViewHint_default.ANIMATING]);
    var anchor;
    for (var i = 0, ii = this.animations_.length; i < ii; ++i) {
      var series = this.animations_[i];
      if (series[0].callback) {
        animationCallback(series[0].callback, false);
      }
      if (!anchor) {
        for (var j = 0, jj = series.length; j < jj; ++j) {
          var animation = series[j];
          if (!animation.complete) {
            anchor = animation.anchor;
            break;
          }
        }
      }
    }
    this.animations_.length = 0;
    this.cancelAnchor_ = anchor;
    this.nextCenter_ = null;
    this.nextResolution_ = NaN;
    this.nextRotation_ = NaN;
  };
  View2.prototype.updateAnimations_ = function() {
    if (this.updateAnimationKey_ !== void 0) {
      cancelAnimationFrame(this.updateAnimationKey_);
      this.updateAnimationKey_ = void 0;
    }
    if (!this.getAnimating()) {
      return;
    }
    var now = Date.now();
    var more = false;
    for (var i = this.animations_.length - 1; i >= 0; --i) {
      var series = this.animations_[i];
      var seriesComplete = true;
      for (var j = 0, jj = series.length; j < jj; ++j) {
        var animation = series[j];
        if (animation.complete) {
          continue;
        }
        var elapsed = now - animation.start;
        var fraction = animation.duration > 0 ? elapsed / animation.duration : 1;
        if (fraction >= 1) {
          animation.complete = true;
          fraction = 1;
        } else {
          seriesComplete = false;
        }
        var progress = animation.easing(fraction);
        if (animation.sourceCenter) {
          var x0 = animation.sourceCenter[0];
          var y0 = animation.sourceCenter[1];
          var x1 = animation.targetCenter[0];
          var y1 = animation.targetCenter[1];
          this.nextCenter_ = animation.targetCenter;
          var x = x0 + progress * (x1 - x0);
          var y = y0 + progress * (y1 - y0);
          this.targetCenter_ = [x, y];
        }
        if (animation.sourceResolution && animation.targetResolution) {
          var resolution = progress === 1 ? animation.targetResolution : animation.sourceResolution + progress * (animation.targetResolution - animation.sourceResolution);
          if (animation.anchor) {
            var size = this.getViewportSize_(this.getRotation());
            var constrainedResolution = this.constraints_.resolution(resolution, 0, size, true);
            this.targetCenter_ = this.calculateCenterZoom(constrainedResolution, animation.anchor);
          }
          this.nextResolution_ = animation.targetResolution;
          this.targetResolution_ = resolution;
          this.applyTargetState_(true);
        }
        if (animation.sourceRotation !== void 0 && animation.targetRotation !== void 0) {
          var rotation = progress === 1 ? modulo(animation.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : animation.sourceRotation + progress * (animation.targetRotation - animation.sourceRotation);
          if (animation.anchor) {
            var constrainedRotation = this.constraints_.rotation(rotation, true);
            this.targetCenter_ = this.calculateCenterRotate(constrainedRotation, animation.anchor);
          }
          this.nextRotation_ = animation.targetRotation;
          this.targetRotation_ = rotation;
        }
        this.applyTargetState_(true);
        more = true;
        if (!animation.complete) {
          break;
        }
      }
      if (seriesComplete) {
        this.animations_[i] = null;
        this.setHint(ViewHint_default.ANIMATING, -1);
        this.nextCenter_ = null;
        this.nextResolution_ = NaN;
        this.nextRotation_ = NaN;
        var callback = series[0].callback;
        if (callback) {
          animationCallback(callback, true);
        }
      }
    }
    this.animations_ = this.animations_.filter(Boolean);
    if (more && this.updateAnimationKey_ === void 0) {
      this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_.bind(this));
    }
  };
  View2.prototype.calculateCenterRotate = function(rotation, anchor) {
    var center;
    var currentCenter = this.getCenterInternal();
    if (currentCenter !== void 0) {
      center = [currentCenter[0] - anchor[0], currentCenter[1] - anchor[1]];
      rotate(center, rotation - this.getRotation());
      add(center, anchor);
    }
    return center;
  };
  View2.prototype.calculateCenterZoom = function(resolution, anchor) {
    var center;
    var currentCenter = this.getCenterInternal();
    var currentResolution = this.getResolution();
    if (currentCenter !== void 0 && currentResolution !== void 0) {
      var x = anchor[0] - resolution * (anchor[0] - currentCenter[0]) / currentResolution;
      var y = anchor[1] - resolution * (anchor[1] - currentCenter[1]) / currentResolution;
      center = [x, y];
    }
    return center;
  };
  View2.prototype.getViewportSize_ = function(opt_rotation) {
    var size = this.viewportSize_;
    if (opt_rotation) {
      var w = size[0];
      var h = size[1];
      return [
        Math.abs(w * Math.cos(opt_rotation)) + Math.abs(h * Math.sin(opt_rotation)),
        Math.abs(w * Math.sin(opt_rotation)) + Math.abs(h * Math.cos(opt_rotation))
      ];
    } else {
      return size;
    }
  };
  View2.prototype.setViewportSize = function(opt_size) {
    this.viewportSize_ = Array.isArray(opt_size) ? opt_size.slice() : [100, 100];
    if (!this.getAnimating()) {
      this.resolveConstraints(0);
    }
  };
  View2.prototype.getCenter = function() {
    var center = this.getCenterInternal();
    if (!center) {
      return center;
    }
    return toUserCoordinate(center, this.getProjection());
  };
  View2.prototype.getCenterInternal = function() {
    return this.get(ViewProperty_default.CENTER);
  };
  View2.prototype.getConstraints = function() {
    return this.constraints_;
  };
  View2.prototype.getConstrainResolution = function() {
    return this.get("constrainResolution");
  };
  View2.prototype.getHints = function(opt_hints) {
    if (opt_hints !== void 0) {
      opt_hints[0] = this.hints_[0];
      opt_hints[1] = this.hints_[1];
      return opt_hints;
    } else {
      return this.hints_.slice();
    }
  };
  View2.prototype.calculateExtent = function(opt_size) {
    var extent = this.calculateExtentInternal(opt_size);
    return toUserExtent(extent, this.getProjection());
  };
  View2.prototype.calculateExtentInternal = function(opt_size) {
    var size = opt_size || this.getViewportSizeMinusPadding_();
    var center = this.getCenterInternal();
    assert(center, 1);
    var resolution = this.getResolution();
    assert(resolution !== void 0, 2);
    var rotation = this.getRotation();
    assert(rotation !== void 0, 3);
    return getForViewAndSize(center, resolution, rotation, size);
  };
  View2.prototype.getMaxResolution = function() {
    return this.maxResolution_;
  };
  View2.prototype.getMinResolution = function() {
    return this.minResolution_;
  };
  View2.prototype.getMaxZoom = function() {
    return this.getZoomForResolution(this.minResolution_);
  };
  View2.prototype.setMaxZoom = function(zoom) {
    this.applyOptions_(this.getUpdatedOptions_({ maxZoom: zoom }));
  };
  View2.prototype.getMinZoom = function() {
    return this.getZoomForResolution(this.maxResolution_);
  };
  View2.prototype.setMinZoom = function(zoom) {
    this.applyOptions_(this.getUpdatedOptions_({ minZoom: zoom }));
  };
  View2.prototype.setConstrainResolution = function(enabled) {
    this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: enabled }));
  };
  View2.prototype.getProjection = function() {
    return this.projection_;
  };
  View2.prototype.getResolution = function() {
    return this.get(ViewProperty_default.RESOLUTION);
  };
  View2.prototype.getResolutions = function() {
    return this.resolutions_;
  };
  View2.prototype.getResolutionForExtent = function(extent, opt_size) {
    return this.getResolutionForExtentInternal(fromUserExtent(extent, this.getProjection()), opt_size);
  };
  View2.prototype.getResolutionForExtentInternal = function(extent, opt_size) {
    var size = opt_size || this.getViewportSizeMinusPadding_();
    var xResolution = getWidth(extent) / size[0];
    var yResolution = getHeight(extent) / size[1];
    return Math.max(xResolution, yResolution);
  };
  View2.prototype.getResolutionForValueFunction = function(opt_power) {
    var power = opt_power || 2;
    var maxResolution = this.getConstrainedResolution(this.maxResolution_);
    var minResolution = this.minResolution_;
    var max = Math.log(maxResolution / minResolution) / Math.log(power);
    return function(value) {
      var resolution = maxResolution / Math.pow(power, value * max);
      return resolution;
    };
  };
  View2.prototype.getRotation = function() {
    return this.get(ViewProperty_default.ROTATION);
  };
  View2.prototype.getValueForResolutionFunction = function(opt_power) {
    var logPower = Math.log(opt_power || 2);
    var maxResolution = this.getConstrainedResolution(this.maxResolution_);
    var minResolution = this.minResolution_;
    var max = Math.log(maxResolution / minResolution) / logPower;
    return function(resolution) {
      var value = Math.log(maxResolution / resolution) / logPower / max;
      return value;
    };
  };
  View2.prototype.getViewportSizeMinusPadding_ = function(opt_rotation) {
    var size = this.getViewportSize_(opt_rotation);
    var padding = this.padding_;
    if (padding) {
      size = [
        size[0] - padding[1] - padding[3],
        size[1] - padding[0] - padding[2]
      ];
    }
    return size;
  };
  View2.prototype.getState = function() {
    var projection = this.getProjection();
    var resolution = this.getResolution();
    var rotation = this.getRotation();
    var center = this.getCenterInternal();
    var padding = this.padding_;
    if (padding) {
      var reducedSize = this.getViewportSizeMinusPadding_();
      center = calculateCenterOn(center, this.getViewportSize_(), [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
    }
    return {
      center: center.slice(0),
      projection: projection !== void 0 ? projection : null,
      resolution,
      nextCenter: this.nextCenter_,
      nextResolution: this.nextResolution_,
      nextRotation: this.nextRotation_,
      rotation,
      zoom: this.getZoom()
    };
  };
  View2.prototype.getZoom = function() {
    var zoom;
    var resolution = this.getResolution();
    if (resolution !== void 0) {
      zoom = this.getZoomForResolution(resolution);
    }
    return zoom;
  };
  View2.prototype.getZoomForResolution = function(resolution) {
    var offset = this.minZoom_ || 0;
    var max, zoomFactor;
    if (this.resolutions_) {
      var nearest = linearFindNearest(this.resolutions_, resolution, 1);
      offset = nearest;
      max = this.resolutions_[nearest];
      if (nearest == this.resolutions_.length - 1) {
        zoomFactor = 2;
      } else {
        zoomFactor = max / this.resolutions_[nearest + 1];
      }
    } else {
      max = this.maxResolution_;
      zoomFactor = this.zoomFactor_;
    }
    return offset + Math.log(max / resolution) / Math.log(zoomFactor);
  };
  View2.prototype.getResolutionForZoom = function(zoom) {
    if (this.resolutions_) {
      if (this.resolutions_.length <= 1) {
        return 0;
      }
      var baseLevel = clamp(Math.floor(zoom), 0, this.resolutions_.length - 2);
      var zoomFactor = this.resolutions_[baseLevel] / this.resolutions_[baseLevel + 1];
      return this.resolutions_[baseLevel] / Math.pow(zoomFactor, clamp(zoom - baseLevel, 0, 1));
    } else {
      return this.maxResolution_ / Math.pow(this.zoomFactor_, zoom - this.minZoom_);
    }
  };
  View2.prototype.fit = function(geometryOrExtent, opt_options) {
    var geometry;
    assert(Array.isArray(geometryOrExtent) || typeof geometryOrExtent.getSimplifiedGeometry === "function", 24);
    if (Array.isArray(geometryOrExtent)) {
      assert(!isEmpty(geometryOrExtent), 25);
      var extent = fromUserExtent(geometryOrExtent, this.getProjection());
      geometry = fromExtent(extent);
    } else if (geometryOrExtent.getType() === GeometryType_default.CIRCLE) {
      var extent = fromUserExtent(geometryOrExtent.getExtent(), this.getProjection());
      geometry = fromExtent(extent);
      geometry.rotate(this.getRotation(), getCenter(extent));
    } else {
      var userProjection2 = getUserProjection();
      if (userProjection2) {
        geometry = geometryOrExtent.clone().transform(userProjection2, this.getProjection());
      } else {
        geometry = geometryOrExtent;
      }
    }
    this.fitInternal(geometry, opt_options);
  };
  View2.prototype.rotatedExtentForGeometry = function(geometry) {
    var rotation = this.getRotation();
    var cosAngle = Math.cos(rotation);
    var sinAngle = Math.sin(-rotation);
    var coords = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var minRotX = Infinity;
    var minRotY = Infinity;
    var maxRotX = -Infinity;
    var maxRotY = -Infinity;
    for (var i = 0, ii = coords.length; i < ii; i += stride) {
      var rotX = coords[i] * cosAngle - coords[i + 1] * sinAngle;
      var rotY = coords[i] * sinAngle + coords[i + 1] * cosAngle;
      minRotX = Math.min(minRotX, rotX);
      minRotY = Math.min(minRotY, rotY);
      maxRotX = Math.max(maxRotX, rotX);
      maxRotY = Math.max(maxRotY, rotY);
    }
    return [minRotX, minRotY, maxRotX, maxRotY];
  };
  View2.prototype.fitInternal = function(geometry, opt_options) {
    var options = opt_options || {};
    var size = options.size;
    if (!size) {
      size = this.getViewportSizeMinusPadding_();
    }
    var padding = options.padding !== void 0 ? options.padding : [0, 0, 0, 0];
    var nearest = options.nearest !== void 0 ? options.nearest : false;
    var minResolution;
    if (options.minResolution !== void 0) {
      minResolution = options.minResolution;
    } else if (options.maxZoom !== void 0) {
      minResolution = this.getResolutionForZoom(options.maxZoom);
    } else {
      minResolution = 0;
    }
    var rotatedExtent = this.rotatedExtentForGeometry(geometry);
    var resolution = this.getResolutionForExtentInternal(rotatedExtent, [
      size[0] - padding[1] - padding[3],
      size[1] - padding[0] - padding[2]
    ]);
    resolution = isNaN(resolution) ? minResolution : Math.max(resolution, minResolution);
    resolution = this.getConstrainedResolution(resolution, nearest ? 0 : 1);
    var rotation = this.getRotation();
    var sinAngle = Math.sin(rotation);
    var cosAngle = Math.cos(rotation);
    var centerRot = getCenter(rotatedExtent);
    centerRot[0] += (padding[1] - padding[3]) / 2 * resolution;
    centerRot[1] += (padding[0] - padding[2]) / 2 * resolution;
    var centerX = centerRot[0] * cosAngle - centerRot[1] * sinAngle;
    var centerY = centerRot[1] * cosAngle + centerRot[0] * sinAngle;
    var center = this.getConstrainedCenter([centerX, centerY], resolution);
    var callback = options.callback ? options.callback : VOID;
    if (options.duration !== void 0) {
      this.animateInternal({
        resolution,
        center,
        duration: options.duration,
        easing: options.easing
      }, callback);
    } else {
      this.targetResolution_ = resolution;
      this.targetCenter_ = center;
      this.applyTargetState_(false, true);
      animationCallback(callback, true);
    }
  };
  View2.prototype.centerOn = function(coordinate, size, position) {
    this.centerOnInternal(fromUserCoordinate(coordinate, this.getProjection()), size, position);
  };
  View2.prototype.centerOnInternal = function(coordinate, size, position) {
    this.setCenterInternal(calculateCenterOn(coordinate, size, position, this.getResolution(), this.getRotation()));
  };
  View2.prototype.calculateCenterShift = function(center, resolution, rotation, size) {
    var centerShift;
    var padding = this.padding_;
    if (padding && center) {
      var reducedSize = this.getViewportSizeMinusPadding_(-rotation);
      var shiftedCenter = calculateCenterOn(center, size, [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
      centerShift = [
        center[0] - shiftedCenter[0],
        center[1] - shiftedCenter[1]
      ];
    }
    return centerShift;
  };
  View2.prototype.isDef = function() {
    return !!this.getCenterInternal() && this.getResolution() !== void 0;
  };
  View2.prototype.adjustCenter = function(deltaCoordinates) {
    var center = toUserCoordinate(this.targetCenter_, this.getProjection());
    this.setCenter([
      center[0] + deltaCoordinates[0],
      center[1] + deltaCoordinates[1]
    ]);
  };
  View2.prototype.adjustCenterInternal = function(deltaCoordinates) {
    var center = this.targetCenter_;
    this.setCenterInternal([
      center[0] + deltaCoordinates[0],
      center[1] + deltaCoordinates[1]
    ]);
  };
  View2.prototype.adjustResolution = function(ratio, opt_anchor) {
    var anchor = opt_anchor && fromUserCoordinate(opt_anchor, this.getProjection());
    this.adjustResolutionInternal(ratio, anchor);
  };
  View2.prototype.adjustResolutionInternal = function(ratio, opt_anchor) {
    var isMoving = this.getAnimating() || this.getInteracting();
    var size = this.getViewportSize_(this.getRotation());
    var newResolution = this.constraints_.resolution(this.targetResolution_ * ratio, 0, size, isMoving);
    if (opt_anchor) {
      this.targetCenter_ = this.calculateCenterZoom(newResolution, opt_anchor);
    }
    this.targetResolution_ *= ratio;
    this.applyTargetState_();
  };
  View2.prototype.adjustZoom = function(delta, opt_anchor) {
    this.adjustResolution(Math.pow(this.zoomFactor_, -delta), opt_anchor);
  };
  View2.prototype.adjustRotation = function(delta, opt_anchor) {
    if (opt_anchor) {
      opt_anchor = fromUserCoordinate(opt_anchor, this.getProjection());
    }
    this.adjustRotationInternal(delta, opt_anchor);
  };
  View2.prototype.adjustRotationInternal = function(delta, opt_anchor) {
    var isMoving = this.getAnimating() || this.getInteracting();
    var newRotation = this.constraints_.rotation(this.targetRotation_ + delta, isMoving);
    if (opt_anchor) {
      this.targetCenter_ = this.calculateCenterRotate(newRotation, opt_anchor);
    }
    this.targetRotation_ += delta;
    this.applyTargetState_();
  };
  View2.prototype.setCenter = function(center) {
    this.setCenterInternal(center ? fromUserCoordinate(center, this.getProjection()) : center);
  };
  View2.prototype.setCenterInternal = function(center) {
    this.targetCenter_ = center;
    this.applyTargetState_();
  };
  View2.prototype.setHint = function(hint, delta) {
    this.hints_[hint] += delta;
    this.changed();
    return this.hints_[hint];
  };
  View2.prototype.setResolution = function(resolution) {
    this.targetResolution_ = resolution;
    this.applyTargetState_();
  };
  View2.prototype.setRotation = function(rotation) {
    this.targetRotation_ = rotation;
    this.applyTargetState_();
  };
  View2.prototype.setZoom = function(zoom) {
    this.setResolution(this.getResolutionForZoom(zoom));
  };
  View2.prototype.applyTargetState_ = function(opt_doNotCancelAnims, opt_forceMoving) {
    var isMoving = this.getAnimating() || this.getInteracting() || opt_forceMoving;
    var newRotation = this.constraints_.rotation(this.targetRotation_, isMoving);
    var size = this.getViewportSize_(newRotation);
    var newResolution = this.constraints_.resolution(this.targetResolution_, 0, size, isMoving);
    var newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, isMoving, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));
    if (this.get(ViewProperty_default.ROTATION) !== newRotation) {
      this.set(ViewProperty_default.ROTATION, newRotation);
    }
    if (this.get(ViewProperty_default.RESOLUTION) !== newResolution) {
      this.set(ViewProperty_default.RESOLUTION, newResolution);
      this.set("zoom", this.getZoom(), true);
    }
    if (!newCenter || !this.get(ViewProperty_default.CENTER) || !equals3(this.get(ViewProperty_default.CENTER), newCenter)) {
      this.set(ViewProperty_default.CENTER, newCenter);
    }
    if (this.getAnimating() && !opt_doNotCancelAnims) {
      this.cancelAnimations();
    }
    this.cancelAnchor_ = void 0;
  };
  View2.prototype.resolveConstraints = function(opt_duration, opt_resolutionDirection, opt_anchor) {
    var duration = opt_duration !== void 0 ? opt_duration : 200;
    var direction = opt_resolutionDirection || 0;
    var newRotation = this.constraints_.rotation(this.targetRotation_);
    var size = this.getViewportSize_(newRotation);
    var newResolution = this.constraints_.resolution(this.targetResolution_, direction, size);
    var newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, false, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));
    if (duration === 0 && !this.cancelAnchor_) {
      this.targetResolution_ = newResolution;
      this.targetRotation_ = newRotation;
      this.targetCenter_ = newCenter;
      this.applyTargetState_();
      return;
    }
    var anchor = opt_anchor || (duration === 0 ? this.cancelAnchor_ : void 0);
    this.cancelAnchor_ = void 0;
    if (this.getResolution() !== newResolution || this.getRotation() !== newRotation || !this.getCenterInternal() || !equals3(this.getCenterInternal(), newCenter)) {
      if (this.getAnimating()) {
        this.cancelAnimations();
      }
      this.animateInternal({
        rotation: newRotation,
        center: newCenter,
        resolution: newResolution,
        duration,
        easing: easeOut,
        anchor
      });
    }
  };
  View2.prototype.beginInteraction = function() {
    this.resolveConstraints(0);
    this.setHint(ViewHint_default.INTERACTING, 1);
  };
  View2.prototype.endInteraction = function(opt_duration, opt_resolutionDirection, opt_anchor) {
    var anchor = opt_anchor && fromUserCoordinate(opt_anchor, this.getProjection());
    this.endInteractionInternal(opt_duration, opt_resolutionDirection, anchor);
  };
  View2.prototype.endInteractionInternal = function(opt_duration, opt_resolutionDirection, opt_anchor) {
    this.setHint(ViewHint_default.INTERACTING, -1);
    this.resolveConstraints(opt_duration, opt_resolutionDirection, opt_anchor);
  };
  View2.prototype.getConstrainedCenter = function(targetCenter, opt_targetResolution) {
    var size = this.getViewportSize_(this.getRotation());
    return this.constraints_.center(targetCenter, opt_targetResolution || this.getResolution(), size);
  };
  View2.prototype.getConstrainedZoom = function(targetZoom, opt_direction) {
    var targetRes = this.getResolutionForZoom(targetZoom);
    return this.getZoomForResolution(this.getConstrainedResolution(targetRes, opt_direction));
  };
  View2.prototype.getConstrainedResolution = function(targetResolution, opt_direction) {
    var direction = opt_direction || 0;
    var size = this.getViewportSize_(this.getRotation());
    return this.constraints_.resolution(targetResolution, direction, size);
  };
  return View2;
}(Object_default);
function animationCallback(callback, returnValue) {
  setTimeout(function() {
    callback(returnValue);
  }, 0);
}
function createCenterConstraint(options) {
  if (options.extent !== void 0) {
    var smooth = options.smoothExtentConstraint !== void 0 ? options.smoothExtentConstraint : true;
    return createExtent(options.extent, options.constrainOnlyCenter, smooth);
  }
  var projection = createProjection(options.projection, "EPSG:3857");
  if (options.multiWorld !== true && projection.isGlobal()) {
    var extent = projection.getExtent().slice();
    extent[0] = -Infinity;
    extent[2] = Infinity;
    return createExtent(extent, false, false);
  }
  return none;
}
function createResolutionConstraint(options) {
  var resolutionConstraint;
  var maxResolution;
  var minResolution;
  var defaultMaxZoom = 28;
  var defaultZoomFactor = 2;
  var minZoom = options.minZoom !== void 0 ? options.minZoom : DEFAULT_MIN_ZOOM;
  var maxZoom = options.maxZoom !== void 0 ? options.maxZoom : defaultMaxZoom;
  var zoomFactor = options.zoomFactor !== void 0 ? options.zoomFactor : defaultZoomFactor;
  var multiWorld = options.multiWorld !== void 0 ? options.multiWorld : false;
  var smooth = options.smoothResolutionConstraint !== void 0 ? options.smoothResolutionConstraint : true;
  var showFullExtent = options.showFullExtent !== void 0 ? options.showFullExtent : false;
  var projection = createProjection(options.projection, "EPSG:3857");
  var projExtent = projection.getExtent();
  var constrainOnlyCenter = options.constrainOnlyCenter;
  var extent = options.extent;
  if (!multiWorld && !extent && projection.isGlobal()) {
    constrainOnlyCenter = false;
    extent = projExtent;
  }
  if (options.resolutions !== void 0) {
    var resolutions = options.resolutions;
    maxResolution = resolutions[minZoom];
    minResolution = resolutions[maxZoom] !== void 0 ? resolutions[maxZoom] : resolutions[resolutions.length - 1];
    if (options.constrainResolution) {
      resolutionConstraint = createSnapToResolutions(resolutions, smooth, !constrainOnlyCenter && extent, showFullExtent);
    } else {
      resolutionConstraint = createMinMaxResolution(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    }
  } else {
    var size = !projExtent ? 360 * METERS_PER_UNIT[Units_default.DEGREES] / projection.getMetersPerUnit() : Math.max(getWidth(projExtent), getHeight(projExtent));
    var defaultMaxResolution = size / DEFAULT_TILE_SIZE / Math.pow(defaultZoomFactor, DEFAULT_MIN_ZOOM);
    var defaultMinResolution = defaultMaxResolution / Math.pow(defaultZoomFactor, defaultMaxZoom - DEFAULT_MIN_ZOOM);
    maxResolution = options.maxResolution;
    if (maxResolution !== void 0) {
      minZoom = 0;
    } else {
      maxResolution = defaultMaxResolution / Math.pow(zoomFactor, minZoom);
    }
    minResolution = options.minResolution;
    if (minResolution === void 0) {
      if (options.maxZoom !== void 0) {
        if (options.maxResolution !== void 0) {
          minResolution = maxResolution / Math.pow(zoomFactor, maxZoom);
        } else {
          minResolution = defaultMaxResolution / Math.pow(zoomFactor, maxZoom);
        }
      } else {
        minResolution = defaultMinResolution;
      }
    }
    maxZoom = minZoom + Math.floor(Math.log(maxResolution / minResolution) / Math.log(zoomFactor));
    minResolution = maxResolution / Math.pow(zoomFactor, maxZoom - minZoom);
    if (options.constrainResolution) {
      resolutionConstraint = createSnapToPower(zoomFactor, maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    } else {
      resolutionConstraint = createMinMaxResolution(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    }
  }
  return {
    constraint: resolutionConstraint,
    maxResolution,
    minResolution,
    minZoom,
    zoomFactor
  };
}
function createRotationConstraint(options) {
  var enableRotation = options.enableRotation !== void 0 ? options.enableRotation : true;
  if (enableRotation) {
    var constrainRotation = options.constrainRotation;
    if (constrainRotation === void 0 || constrainRotation === true) {
      return createSnapToZero();
    } else if (constrainRotation === false) {
      return none2;
    } else if (typeof constrainRotation === "number") {
      return createSnapToN(constrainRotation);
    } else {
      return none2;
    }
  } else {
    return disable;
  }
}
function isNoopAnimation(animation) {
  if (animation.sourceCenter && animation.targetCenter) {
    if (!equals3(animation.sourceCenter, animation.targetCenter)) {
      return false;
    }
  }
  if (animation.sourceResolution !== animation.targetResolution) {
    return false;
  }
  if (animation.sourceRotation !== animation.targetRotation) {
    return false;
  }
  return true;
}
function calculateCenterOn(coordinate, size, position, resolution, rotation) {
  var cosAngle = Math.cos(-rotation);
  var sinAngle = Math.sin(-rotation);
  var rotX = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
  var rotY = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
  rotX += (size[0] / 2 - position[0]) * resolution;
  rotY += (position[1] - size[1] / 2) * resolution;
  sinAngle = -sinAngle;
  var centerX = rotX * cosAngle - rotY * sinAngle;
  var centerY = rotY * cosAngle + rotX * sinAngle;
  return [centerX, centerY];
}
var View_default = View;

// ../node_modules/ol/size.js
function hasArea(size) {
  return size[0] > 0 && size[1] > 0;
}

// ../node_modules/ol/PluggableMap.js
var __extends24 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
function removeLayerMapProperty(layer) {
  if (layer instanceof Layer_default) {
    layer.setMapInternal(null);
    return;
  }
  if (layer instanceof Group_default) {
    layer.getLayers().forEach(removeLayerMapProperty);
  }
}
function setLayerMapProperty(layer, map) {
  if (layer instanceof Layer_default) {
    layer.setMapInternal(map);
    return;
  }
  if (layer instanceof Group_default) {
    var layers = layer.getLayers().getArray();
    for (var i = 0, ii = layers.length; i < ii; ++i) {
      setLayerMapProperty(layers[i], map);
    }
  }
}
var PluggableMap = function(_super) {
  __extends24(PluggableMap2, _super);
  function PluggableMap2(options) {
    var _this = _super.call(this) || this;
    _this.on;
    _this.once;
    _this.un;
    var optionsInternal = createOptionsInternal(options);
    _this.renderComplete_;
    _this.loaded_ = true;
    _this.boundHandleBrowserEvent_ = _this.handleBrowserEvent.bind(_this);
    _this.maxTilesLoading_ = options.maxTilesLoading !== void 0 ? options.maxTilesLoading : 16;
    _this.pixelRatio_ = options.pixelRatio !== void 0 ? options.pixelRatio : DEVICE_PIXEL_RATIO;
    _this.postRenderTimeoutHandle_;
    _this.animationDelayKey_;
    _this.animationDelay_ = function() {
      this.animationDelayKey_ = void 0;
      this.renderFrame_(Date.now());
    }.bind(_this);
    _this.coordinateToPixelTransform_ = create();
    _this.pixelToCoordinateTransform_ = create();
    _this.frameIndex_ = 0;
    _this.frameState_ = null;
    _this.previousExtent_ = null;
    _this.viewPropertyListenerKey_ = null;
    _this.viewChangeListenerKey_ = null;
    _this.layerGroupPropertyListenerKeys_ = null;
    _this.viewport_ = document.createElement("div");
    _this.viewport_.className = "ol-viewport" + ("ontouchstart" in window ? " ol-touch" : "");
    _this.viewport_.style.position = "relative";
    _this.viewport_.style.overflow = "hidden";
    _this.viewport_.style.width = "100%";
    _this.viewport_.style.height = "100%";
    _this.overlayContainer_ = document.createElement("div");
    _this.overlayContainer_.style.position = "absolute";
    _this.overlayContainer_.style.zIndex = "0";
    _this.overlayContainer_.style.width = "100%";
    _this.overlayContainer_.style.height = "100%";
    _this.overlayContainer_.style.pointerEvents = "none";
    _this.overlayContainer_.className = "ol-overlaycontainer";
    _this.viewport_.appendChild(_this.overlayContainer_);
    _this.overlayContainerStopEvent_ = document.createElement("div");
    _this.overlayContainerStopEvent_.style.position = "absolute";
    _this.overlayContainerStopEvent_.style.zIndex = "0";
    _this.overlayContainerStopEvent_.style.width = "100%";
    _this.overlayContainerStopEvent_.style.height = "100%";
    _this.overlayContainerStopEvent_.style.pointerEvents = "none";
    _this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent";
    _this.viewport_.appendChild(_this.overlayContainerStopEvent_);
    _this.mapBrowserEventHandler_ = null;
    _this.moveTolerance_ = options.moveTolerance;
    _this.keyboardEventTarget_ = optionsInternal.keyboardEventTarget;
    _this.targetChangeHandlerKeys_ = null;
    _this.controls = optionsInternal.controls || new Collection_default();
    _this.interactions = optionsInternal.interactions || new Collection_default();
    _this.overlays_ = optionsInternal.overlays;
    _this.overlayIdIndex_ = {};
    _this.renderer_ = null;
    _this.postRenderFunctions_ = [];
    _this.tileQueue_ = new TileQueue_default(_this.getTilePriority.bind(_this), _this.handleTileChange_.bind(_this));
    _this.addChangeListener(MapProperty_default.LAYERGROUP, _this.handleLayerGroupChanged_);
    _this.addChangeListener(MapProperty_default.VIEW, _this.handleViewChanged_);
    _this.addChangeListener(MapProperty_default.SIZE, _this.handleSizeChanged_);
    _this.addChangeListener(MapProperty_default.TARGET, _this.handleTargetChanged_);
    _this.setProperties(optionsInternal.values);
    var map = _this;
    if (options.view && !(options.view instanceof View_default)) {
      options.view.then(function(viewOptions) {
        map.setView(new View_default(viewOptions));
      });
    }
    _this.controls.addEventListener(CollectionEventType_default.ADD, function(event) {
      event.element.setMap(this);
    }.bind(_this));
    _this.controls.addEventListener(CollectionEventType_default.REMOVE, function(event) {
      event.element.setMap(null);
    }.bind(_this));
    _this.interactions.addEventListener(CollectionEventType_default.ADD, function(event) {
      event.element.setMap(this);
    }.bind(_this));
    _this.interactions.addEventListener(CollectionEventType_default.REMOVE, function(event) {
      event.element.setMap(null);
    }.bind(_this));
    _this.overlays_.addEventListener(CollectionEventType_default.ADD, function(event) {
      this.addOverlayInternal_(event.element);
    }.bind(_this));
    _this.overlays_.addEventListener(CollectionEventType_default.REMOVE, function(event) {
      var overlay = event.element;
      var id = overlay.getId();
      if (id !== void 0) {
        delete this.overlayIdIndex_[id.toString()];
      }
      event.element.setMap(null);
    }.bind(_this));
    _this.controls.forEach(function(control) {
      control.setMap(this);
    }.bind(_this));
    _this.interactions.forEach(function(interaction) {
      interaction.setMap(this);
    }.bind(_this));
    _this.overlays_.forEach(_this.addOverlayInternal_.bind(_this));
    return _this;
  }
  PluggableMap2.prototype.createRenderer = function() {
    throw new Error("Use a map type that has a createRenderer method");
  };
  PluggableMap2.prototype.addControl = function(control) {
    this.getControls().push(control);
  };
  PluggableMap2.prototype.addInteraction = function(interaction) {
    this.getInteractions().push(interaction);
  };
  PluggableMap2.prototype.addLayer = function(layer) {
    var layers = this.getLayerGroup().getLayers();
    layers.push(layer);
  };
  PluggableMap2.prototype.handleLayerAdd_ = function(event) {
    setLayerMapProperty(event.layer, this);
  };
  PluggableMap2.prototype.addOverlay = function(overlay) {
    this.getOverlays().push(overlay);
  };
  PluggableMap2.prototype.addOverlayInternal_ = function(overlay) {
    var id = overlay.getId();
    if (id !== void 0) {
      this.overlayIdIndex_[id.toString()] = overlay;
    }
    overlay.setMap(this);
  };
  PluggableMap2.prototype.disposeInternal = function() {
    this.setTarget(null);
    _super.prototype.disposeInternal.call(this);
  };
  PluggableMap2.prototype.forEachFeatureAtPixel = function(pixel, callback, opt_options) {
    if (!this.frameState_ || !this.renderer_) {
      return;
    }
    var coordinate = this.getCoordinateFromPixelInternal(pixel);
    opt_options = opt_options !== void 0 ? opt_options : {};
    var hitTolerance = opt_options.hitTolerance !== void 0 ? opt_options.hitTolerance : 0;
    var layerFilter = opt_options.layerFilter !== void 0 ? opt_options.layerFilter : TRUE;
    var checkWrapped = opt_options.checkWrapped !== false;
    return this.renderer_.forEachFeatureAtCoordinate(coordinate, this.frameState_, hitTolerance, checkWrapped, callback, null, layerFilter, null);
  };
  PluggableMap2.prototype.getFeaturesAtPixel = function(pixel, opt_options) {
    var features = [];
    this.forEachFeatureAtPixel(pixel, function(feature) {
      features.push(feature);
    }, opt_options);
    return features;
  };
  PluggableMap2.prototype.getAllLayers = function() {
    var layers = [];
    function addLayersFrom(layerGroup) {
      layerGroup.forEach(function(layer) {
        if (layer instanceof Group_default) {
          addLayersFrom(layer.getLayers());
        } else {
          layers.push(layer);
        }
      });
    }
    addLayersFrom(this.getLayers());
    return layers;
  };
  PluggableMap2.prototype.forEachLayerAtPixel = function(pixel, callback, opt_options) {
    if (!this.frameState_ || !this.renderer_) {
      return;
    }
    var options = opt_options || {};
    var hitTolerance = options.hitTolerance !== void 0 ? options.hitTolerance : 0;
    var layerFilter = options.layerFilter || TRUE;
    return this.renderer_.forEachLayerAtPixel(pixel, this.frameState_, hitTolerance, callback, layerFilter);
  };
  PluggableMap2.prototype.hasFeatureAtPixel = function(pixel, opt_options) {
    if (!this.frameState_ || !this.renderer_) {
      return false;
    }
    var coordinate = this.getCoordinateFromPixelInternal(pixel);
    opt_options = opt_options !== void 0 ? opt_options : {};
    var layerFilter = opt_options.layerFilter !== void 0 ? opt_options.layerFilter : TRUE;
    var hitTolerance = opt_options.hitTolerance !== void 0 ? opt_options.hitTolerance : 0;
    var checkWrapped = opt_options.checkWrapped !== false;
    return this.renderer_.hasFeatureAtCoordinate(coordinate, this.frameState_, hitTolerance, checkWrapped, layerFilter, null);
  };
  PluggableMap2.prototype.getEventCoordinate = function(event) {
    return this.getCoordinateFromPixel(this.getEventPixel(event));
  };
  PluggableMap2.prototype.getEventCoordinateInternal = function(event) {
    return this.getCoordinateFromPixelInternal(this.getEventPixel(event));
  };
  PluggableMap2.prototype.getEventPixel = function(event) {
    var viewportPosition = this.viewport_.getBoundingClientRect();
    var eventPosition = "changedTouches" in event ? event.changedTouches[0] : event;
    return [
      eventPosition.clientX - viewportPosition.left,
      eventPosition.clientY - viewportPosition.top
    ];
  };
  PluggableMap2.prototype.getTarget = function() {
    return this.get(MapProperty_default.TARGET);
  };
  PluggableMap2.prototype.getTargetElement = function() {
    var target = this.getTarget();
    if (target !== void 0) {
      return typeof target === "string" ? document.getElementById(target) : target;
    } else {
      return null;
    }
  };
  PluggableMap2.prototype.getCoordinateFromPixel = function(pixel) {
    return toUserCoordinate(this.getCoordinateFromPixelInternal(pixel), this.getView().getProjection());
  };
  PluggableMap2.prototype.getCoordinateFromPixelInternal = function(pixel) {
    var frameState = this.frameState_;
    if (!frameState) {
      return null;
    } else {
      return apply(frameState.pixelToCoordinateTransform, pixel.slice());
    }
  };
  PluggableMap2.prototype.getControls = function() {
    return this.controls;
  };
  PluggableMap2.prototype.getOverlays = function() {
    return this.overlays_;
  };
  PluggableMap2.prototype.getOverlayById = function(id) {
    var overlay = this.overlayIdIndex_[id.toString()];
    return overlay !== void 0 ? overlay : null;
  };
  PluggableMap2.prototype.getInteractions = function() {
    return this.interactions;
  };
  PluggableMap2.prototype.getLayerGroup = function() {
    return this.get(MapProperty_default.LAYERGROUP);
  };
  PluggableMap2.prototype.setLayers = function(layers) {
    var group = this.getLayerGroup();
    if (layers instanceof Collection_default) {
      group.setLayers(layers);
      return;
    }
    var collection = group.getLayers();
    collection.clear();
    collection.extend(layers);
  };
  PluggableMap2.prototype.getLayers = function() {
    var layers = this.getLayerGroup().getLayers();
    return layers;
  };
  PluggableMap2.prototype.getLoadingOrNotReady = function() {
    var layerStatesArray = this.getLayerGroup().getLayerStatesArray();
    for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
      var state = layerStatesArray[i];
      if (!state.visible) {
        continue;
      }
      var renderer = state.layer.getRenderer();
      if (renderer && !renderer.ready) {
        return true;
      }
      var source = state.layer.getSource();
      if (source && source.loading) {
        return true;
      }
    }
    return false;
  };
  PluggableMap2.prototype.getPixelFromCoordinate = function(coordinate) {
    var viewCoordinate = fromUserCoordinate(coordinate, this.getView().getProjection());
    return this.getPixelFromCoordinateInternal(viewCoordinate);
  };
  PluggableMap2.prototype.getPixelFromCoordinateInternal = function(coordinate) {
    var frameState = this.frameState_;
    if (!frameState) {
      return null;
    } else {
      return apply(frameState.coordinateToPixelTransform, coordinate.slice(0, 2));
    }
  };
  PluggableMap2.prototype.getRenderer = function() {
    return this.renderer_;
  };
  PluggableMap2.prototype.getSize = function() {
    return this.get(MapProperty_default.SIZE);
  };
  PluggableMap2.prototype.getView = function() {
    return this.get(MapProperty_default.VIEW);
  };
  PluggableMap2.prototype.getViewport = function() {
    return this.viewport_;
  };
  PluggableMap2.prototype.getOverlayContainer = function() {
    return this.overlayContainer_;
  };
  PluggableMap2.prototype.getOverlayContainerStopEvent = function() {
    return this.overlayContainerStopEvent_;
  };
  PluggableMap2.prototype.getOwnerDocument = function() {
    var targetElement = this.getTargetElement();
    return targetElement ? targetElement.ownerDocument : document;
  };
  PluggableMap2.prototype.getTilePriority = function(tile, tileSourceKey, tileCenter, tileResolution) {
    return getTilePriority(this.frameState_, tile, tileSourceKey, tileCenter, tileResolution);
  };
  PluggableMap2.prototype.handleBrowserEvent = function(browserEvent, opt_type) {
    var type = opt_type || browserEvent.type;
    var mapBrowserEvent = new MapBrowserEvent_default(type, this, browserEvent);
    this.handleMapBrowserEvent(mapBrowserEvent);
  };
  PluggableMap2.prototype.handleMapBrowserEvent = function(mapBrowserEvent) {
    if (!this.frameState_) {
      return;
    }
    var originalEvent = mapBrowserEvent.originalEvent;
    var eventType = originalEvent.type;
    if (eventType === EventType_default3.POINTERDOWN || eventType === EventType_default.WHEEL || eventType === EventType_default.KEYDOWN) {
      var doc = this.getOwnerDocument();
      var rootNode = this.viewport_.getRootNode ? this.viewport_.getRootNode() : doc;
      var target = originalEvent.target;
      if (this.overlayContainerStopEvent_.contains(target) || !(rootNode === doc ? doc.documentElement : rootNode).contains(target)) {
        return;
      }
    }
    mapBrowserEvent.frameState = this.frameState_;
    if (this.dispatchEvent(mapBrowserEvent) !== false) {
      var interactionsArray = this.getInteractions().getArray().slice();
      for (var i = interactionsArray.length - 1; i >= 0; i--) {
        var interaction = interactionsArray[i];
        if (interaction.getMap() !== this || !interaction.getActive() || !this.getTargetElement()) {
          continue;
        }
        var cont = interaction.handleEvent(mapBrowserEvent);
        if (!cont || mapBrowserEvent.propagationStopped) {
          break;
        }
      }
    }
  };
  PluggableMap2.prototype.handlePostRender = function() {
    var frameState = this.frameState_;
    var tileQueue = this.tileQueue_;
    if (!tileQueue.isEmpty()) {
      var maxTotalLoading = this.maxTilesLoading_;
      var maxNewLoads = maxTotalLoading;
      if (frameState) {
        var hints = frameState.viewHints;
        if (hints[ViewHint_default.ANIMATING] || hints[ViewHint_default.INTERACTING]) {
          var lowOnFrameBudget = Date.now() - frameState.time > 8;
          maxTotalLoading = lowOnFrameBudget ? 0 : 8;
          maxNewLoads = lowOnFrameBudget ? 0 : 2;
        }
      }
      if (tileQueue.getTilesLoading() < maxTotalLoading) {
        tileQueue.reprioritize();
        tileQueue.loadMoreTiles(maxTotalLoading, maxNewLoads);
      }
    }
    if (frameState && this.renderer_ && !frameState.animate) {
      if (this.renderComplete_ === true) {
        if (this.hasListener(EventType_default2.RENDERCOMPLETE)) {
          this.renderer_.dispatchRenderEvent(EventType_default2.RENDERCOMPLETE, frameState);
        }
        if (this.loaded_ === false) {
          this.loaded_ = true;
          this.dispatchEvent(new MapEvent_default(MapEventType_default.LOADEND, this, frameState));
        }
      } else if (this.loaded_ === true) {
        this.loaded_ = false;
        this.dispatchEvent(new MapEvent_default(MapEventType_default.LOADSTART, this, frameState));
      }
    }
    var postRenderFunctions = this.postRenderFunctions_;
    for (var i = 0, ii = postRenderFunctions.length; i < ii; ++i) {
      postRenderFunctions[i](this, frameState);
    }
    postRenderFunctions.length = 0;
  };
  PluggableMap2.prototype.handleSizeChanged_ = function() {
    if (this.getView() && !this.getView().getAnimating()) {
      this.getView().resolveConstraints(0);
    }
    this.render();
  };
  PluggableMap2.prototype.handleTargetChanged_ = function() {
    if (this.mapBrowserEventHandler_) {
      for (var i = 0, ii = this.targetChangeHandlerKeys_.length; i < ii; ++i) {
        unlistenByKey(this.targetChangeHandlerKeys_[i]);
      }
      this.targetChangeHandlerKeys_ = null;
      this.viewport_.removeEventListener(EventType_default.CONTEXTMENU, this.boundHandleBrowserEvent_);
      this.viewport_.removeEventListener(EventType_default.WHEEL, this.boundHandleBrowserEvent_);
      this.mapBrowserEventHandler_.dispose();
      this.mapBrowserEventHandler_ = null;
      removeNode(this.viewport_);
    }
    var targetElement = this.getTargetElement();
    if (!targetElement) {
      if (this.renderer_) {
        clearTimeout(this.postRenderTimeoutHandle_);
        this.postRenderTimeoutHandle_ = void 0;
        this.postRenderFunctions_.length = 0;
        this.renderer_.dispose();
        this.renderer_ = null;
      }
      if (this.animationDelayKey_) {
        cancelAnimationFrame(this.animationDelayKey_);
        this.animationDelayKey_ = void 0;
      }
    } else {
      targetElement.appendChild(this.viewport_);
      if (!this.renderer_) {
        this.renderer_ = this.createRenderer();
      }
      this.mapBrowserEventHandler_ = new MapBrowserEventHandler_default(this, this.moveTolerance_);
      for (var key in MapBrowserEventType_default) {
        this.mapBrowserEventHandler_.addEventListener(MapBrowserEventType_default[key], this.handleMapBrowserEvent.bind(this));
      }
      this.viewport_.addEventListener(EventType_default.CONTEXTMENU, this.boundHandleBrowserEvent_, false);
      this.viewport_.addEventListener(EventType_default.WHEEL, this.boundHandleBrowserEvent_, PASSIVE_EVENT_LISTENERS ? { passive: false } : false);
      var defaultView = this.getOwnerDocument().defaultView;
      var keyboardEventTarget = !this.keyboardEventTarget_ ? targetElement : this.keyboardEventTarget_;
      this.targetChangeHandlerKeys_ = [
        listen(keyboardEventTarget, EventType_default.KEYDOWN, this.handleBrowserEvent, this),
        listen(keyboardEventTarget, EventType_default.KEYPRESS, this.handleBrowserEvent, this),
        listen(defaultView, EventType_default.RESIZE, this.updateSize, this)
      ];
    }
    this.updateSize();
  };
  PluggableMap2.prototype.handleTileChange_ = function() {
    this.render();
  };
  PluggableMap2.prototype.handleViewPropertyChanged_ = function() {
    this.render();
  };
  PluggableMap2.prototype.handleViewChanged_ = function() {
    if (this.viewPropertyListenerKey_) {
      unlistenByKey(this.viewPropertyListenerKey_);
      this.viewPropertyListenerKey_ = null;
    }
    if (this.viewChangeListenerKey_) {
      unlistenByKey(this.viewChangeListenerKey_);
      this.viewChangeListenerKey_ = null;
    }
    var view = this.getView();
    if (view) {
      this.updateViewportSize_();
      this.viewPropertyListenerKey_ = listen(view, ObjectEventType_default.PROPERTYCHANGE, this.handleViewPropertyChanged_, this);
      this.viewChangeListenerKey_ = listen(view, EventType_default.CHANGE, this.handleViewPropertyChanged_, this);
      view.resolveConstraints(0);
    }
    this.render();
  };
  PluggableMap2.prototype.handleLayerGroupChanged_ = function() {
    if (this.layerGroupPropertyListenerKeys_) {
      this.layerGroupPropertyListenerKeys_.forEach(unlistenByKey);
      this.layerGroupPropertyListenerKeys_ = null;
    }
    var layerGroup = this.getLayerGroup();
    if (layerGroup) {
      this.handleLayerAdd_(new GroupEvent("addlayer", layerGroup));
      this.layerGroupPropertyListenerKeys_ = [
        listen(layerGroup, ObjectEventType_default.PROPERTYCHANGE, this.render, this),
        listen(layerGroup, EventType_default.CHANGE, this.render, this),
        listen(layerGroup, "addlayer", this.handleLayerAdd_, this),
        listen(layerGroup, "removelayer", this.handleLayerRemove_, this)
      ];
    }
    this.render();
  };
  PluggableMap2.prototype.isRendered = function() {
    return !!this.frameState_;
  };
  PluggableMap2.prototype.renderSync = function() {
    if (this.animationDelayKey_) {
      cancelAnimationFrame(this.animationDelayKey_);
    }
    this.animationDelay_();
  };
  PluggableMap2.prototype.redrawText = function() {
    var layerStates = this.getLayerGroup().getLayerStatesArray();
    for (var i = 0, ii = layerStates.length; i < ii; ++i) {
      var layer = layerStates[i].layer;
      if (layer.hasRenderer()) {
        layer.getRenderer().handleFontsChanged();
      }
    }
  };
  PluggableMap2.prototype.render = function() {
    if (this.renderer_ && this.animationDelayKey_ === void 0) {
      this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_);
    }
  };
  PluggableMap2.prototype.removeControl = function(control) {
    return this.getControls().remove(control);
  };
  PluggableMap2.prototype.removeInteraction = function(interaction) {
    return this.getInteractions().remove(interaction);
  };
  PluggableMap2.prototype.removeLayer = function(layer) {
    var layers = this.getLayerGroup().getLayers();
    return layers.remove(layer);
  };
  PluggableMap2.prototype.handleLayerRemove_ = function(event) {
    removeLayerMapProperty(event.layer);
  };
  PluggableMap2.prototype.removeOverlay = function(overlay) {
    return this.getOverlays().remove(overlay);
  };
  PluggableMap2.prototype.renderFrame_ = function(time) {
    var _this = this;
    var size = this.getSize();
    var view = this.getView();
    var previousFrameState = this.frameState_;
    var frameState = null;
    if (size !== void 0 && hasArea(size) && view && view.isDef()) {
      var viewHints = view.getHints(this.frameState_ ? this.frameState_.viewHints : void 0);
      var viewState = view.getState();
      frameState = {
        animate: false,
        coordinateToPixelTransform: this.coordinateToPixelTransform_,
        declutterTree: null,
        extent: getForViewAndSize(viewState.center, viewState.resolution, viewState.rotation, size),
        index: this.frameIndex_++,
        layerIndex: 0,
        layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
        pixelRatio: this.pixelRatio_,
        pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
        postRenderFunctions: [],
        size,
        tileQueue: this.tileQueue_,
        time,
        usedTiles: {},
        viewState,
        viewHints,
        wantedTiles: {},
        mapId: getUid(this),
        renderTargets: {}
      };
      if (viewState.nextCenter && viewState.nextResolution) {
        var rotation = isNaN(viewState.nextRotation) ? viewState.rotation : viewState.nextRotation;
        frameState.nextExtent = getForViewAndSize(viewState.nextCenter, viewState.nextResolution, rotation, size);
      }
    }
    this.frameState_ = frameState;
    this.renderer_.renderFrame(frameState);
    if (frameState) {
      if (frameState.animate) {
        this.render();
      }
      Array.prototype.push.apply(this.postRenderFunctions_, frameState.postRenderFunctions);
      if (previousFrameState) {
        var moveStart = !this.previousExtent_ || !isEmpty(this.previousExtent_) && !equals2(frameState.extent, this.previousExtent_);
        if (moveStart) {
          this.dispatchEvent(new MapEvent_default(MapEventType_default.MOVESTART, this, previousFrameState));
          this.previousExtent_ = createOrUpdateEmpty(this.previousExtent_);
        }
      }
      var idle = this.previousExtent_ && !frameState.viewHints[ViewHint_default.ANIMATING] && !frameState.viewHints[ViewHint_default.INTERACTING] && !equals2(frameState.extent, this.previousExtent_);
      if (idle) {
        this.dispatchEvent(new MapEvent_default(MapEventType_default.MOVEEND, this, frameState));
        clone(frameState.extent, this.previousExtent_);
      }
    }
    this.dispatchEvent(new MapEvent_default(MapEventType_default.POSTRENDER, this, frameState));
    this.renderComplete_ = this.hasListener(MapEventType_default.LOADSTART) || this.hasListener(MapEventType_default.LOADEND) || this.hasListener(EventType_default2.RENDERCOMPLETE) ? !this.tileQueue_.getTilesLoading() && !this.tileQueue_.getCount() && !this.getLoadingOrNotReady() : void 0;
    if (!this.postRenderTimeoutHandle_) {
      this.postRenderTimeoutHandle_ = setTimeout(function() {
        _this.postRenderTimeoutHandle_ = void 0;
        _this.handlePostRender();
      }, 0);
    }
  };
  PluggableMap2.prototype.setLayerGroup = function(layerGroup) {
    var oldLayerGroup = this.getLayerGroup();
    if (oldLayerGroup) {
      this.handleLayerRemove_(new GroupEvent("removelayer", oldLayerGroup));
    }
    this.set(MapProperty_default.LAYERGROUP, layerGroup);
  };
  PluggableMap2.prototype.setSize = function(size) {
    this.set(MapProperty_default.SIZE, size);
  };
  PluggableMap2.prototype.setTarget = function(target) {
    this.set(MapProperty_default.TARGET, target);
  };
  PluggableMap2.prototype.setView = function(view) {
    if (!view || view instanceof View_default) {
      this.set(MapProperty_default.VIEW, view);
      return;
    }
    this.set(MapProperty_default.VIEW, new View_default());
    var map = this;
    view.then(function(viewOptions) {
      map.setView(new View_default(viewOptions));
    });
  };
  PluggableMap2.prototype.updateSize = function() {
    var targetElement = this.getTargetElement();
    var size = void 0;
    if (targetElement) {
      var computedStyle = getComputedStyle(targetElement);
      var width = targetElement.offsetWidth - parseFloat(computedStyle["borderLeftWidth"]) - parseFloat(computedStyle["paddingLeft"]) - parseFloat(computedStyle["paddingRight"]) - parseFloat(computedStyle["borderRightWidth"]);
      var height = targetElement.offsetHeight - parseFloat(computedStyle["borderTopWidth"]) - parseFloat(computedStyle["paddingTop"]) - parseFloat(computedStyle["paddingBottom"]) - parseFloat(computedStyle["borderBottomWidth"]);
      if (!isNaN(width) && !isNaN(height)) {
        size = [width, height];
        if (!hasArea(size) && !!(targetElement.offsetWidth || targetElement.offsetHeight || targetElement.getClientRects().length)) {
          console.warn("No map visible because the map container's width or height are 0.");
        }
      }
    }
    this.setSize(size);
    this.updateViewportSize_();
  };
  PluggableMap2.prototype.updateViewportSize_ = function() {
    var view = this.getView();
    if (view) {
      var size = void 0;
      var computedStyle = getComputedStyle(this.viewport_);
      if (computedStyle.width && computedStyle.height) {
        size = [
          parseInt(computedStyle.width, 10),
          parseInt(computedStyle.height, 10)
        ];
      }
      view.setViewportSize(size);
    }
  };
  return PluggableMap2;
}(Object_default);
function createOptionsInternal(options) {
  var keyboardEventTarget = null;
  if (options.keyboardEventTarget !== void 0) {
    keyboardEventTarget = typeof options.keyboardEventTarget === "string" ? document.getElementById(options.keyboardEventTarget) : options.keyboardEventTarget;
  }
  var values = {};
  var layerGroup = options.layers && typeof options.layers.getLayers === "function" ? options.layers : new Group_default({ layers: options.layers });
  values[MapProperty_default.LAYERGROUP] = layerGroup;
  values[MapProperty_default.TARGET] = options.target;
  values[MapProperty_default.VIEW] = options.view instanceof View_default ? options.view : new View_default();
  var controls;
  if (options.controls !== void 0) {
    if (Array.isArray(options.controls)) {
      controls = new Collection_default(options.controls.slice());
    } else {
      assert(typeof options.controls.getArray === "function", 47);
      controls = options.controls;
    }
  }
  var interactions;
  if (options.interactions !== void 0) {
    if (Array.isArray(options.interactions)) {
      interactions = new Collection_default(options.interactions.slice());
    } else {
      assert(typeof options.interactions.getArray === "function", 48);
      interactions = options.interactions;
    }
  }
  var overlays;
  if (options.overlays !== void 0) {
    if (Array.isArray(options.overlays)) {
      overlays = new Collection_default(options.overlays.slice());
    } else {
      assert(typeof options.overlays.getArray === "function", 49);
      overlays = options.overlays;
    }
  } else {
    overlays = new Collection_default();
  }
  return {
    controls,
    interactions,
    keyboardEventTarget,
    overlays,
    values
  };
}
var PluggableMap_default = PluggableMap;

// ../node_modules/ol/control/Control.js
var __extends25 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Control = function(_super) {
  __extends25(Control2, _super);
  function Control2(options) {
    var _this = _super.call(this) || this;
    var element = options.element;
    if (element && !options.target && !element.style.pointerEvents) {
      element.style.pointerEvents = "auto";
    }
    _this.element = element ? element : null;
    _this.target_ = null;
    _this.map_ = null;
    _this.listenerKeys = [];
    if (options.render) {
      _this.render = options.render;
    }
    if (options.target) {
      _this.setTarget(options.target);
    }
    return _this;
  }
  Control2.prototype.disposeInternal = function() {
    removeNode(this.element);
    _super.prototype.disposeInternal.call(this);
  };
  Control2.prototype.getMap = function() {
    return this.map_;
  };
  Control2.prototype.setMap = function(map) {
    if (this.map_) {
      removeNode(this.element);
    }
    for (var i = 0, ii = this.listenerKeys.length; i < ii; ++i) {
      unlistenByKey(this.listenerKeys[i]);
    }
    this.listenerKeys.length = 0;
    this.map_ = map;
    if (map) {
      var target = this.target_ ? this.target_ : map.getOverlayContainerStopEvent();
      target.appendChild(this.element);
      if (this.render !== VOID) {
        this.listenerKeys.push(listen(map, MapEventType_default.POSTRENDER, this.render, this));
      }
      map.render();
    }
  };
  Control2.prototype.render = function(mapEvent) {
  };
  Control2.prototype.setTarget = function(target) {
    this.target_ = typeof target === "string" ? document.getElementById(target) : target;
  };
  return Control2;
}(Object_default);
var Control_default = Control;

// ../node_modules/ol/control/Attribution.js
var __extends26 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Attribution = function(_super) {
  __extends26(Attribution2, _super);
  function Attribution2(opt_options) {
    var _this = this;
    var options = opt_options ? opt_options : {};
    _this = _super.call(this, {
      element: document.createElement("div"),
      render: options.render,
      target: options.target
    }) || this;
    _this.ulElement_ = document.createElement("ul");
    _this.collapsed_ = options.collapsed !== void 0 ? options.collapsed : true;
    _this.userCollapsed_ = _this.collapsed_;
    _this.overrideCollapsible_ = options.collapsible !== void 0;
    _this.collapsible_ = options.collapsible !== void 0 ? options.collapsible : true;
    if (!_this.collapsible_) {
      _this.collapsed_ = false;
    }
    var className = options.className !== void 0 ? options.className : "ol-attribution";
    var tipLabel = options.tipLabel !== void 0 ? options.tipLabel : "Attributions";
    var expandClassName = options.expandClassName !== void 0 ? options.expandClassName : className + "-expand";
    var collapseLabel = options.collapseLabel !== void 0 ? options.collapseLabel : "\u203A";
    var collapseClassName = options.collapseClassName !== void 0 ? options.collapseClassName : className + "-collapse";
    if (typeof collapseLabel === "string") {
      _this.collapseLabel_ = document.createElement("span");
      _this.collapseLabel_.textContent = collapseLabel;
      _this.collapseLabel_.className = collapseClassName;
    } else {
      _this.collapseLabel_ = collapseLabel;
    }
    var label = options.label !== void 0 ? options.label : "i";
    if (typeof label === "string") {
      _this.label_ = document.createElement("span");
      _this.label_.textContent = label;
      _this.label_.className = expandClassName;
    } else {
      _this.label_ = label;
    }
    var activeLabel = _this.collapsible_ && !_this.collapsed_ ? _this.collapseLabel_ : _this.label_;
    _this.toggleButton_ = document.createElement("button");
    _this.toggleButton_.setAttribute("type", "button");
    _this.toggleButton_.setAttribute("aria-expanded", String(!_this.collapsed_));
    _this.toggleButton_.title = tipLabel;
    _this.toggleButton_.appendChild(activeLabel);
    _this.toggleButton_.addEventListener(EventType_default.CLICK, _this.handleClick_.bind(_this), false);
    var cssClasses = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL + (_this.collapsed_ && _this.collapsible_ ? " " + CLASS_COLLAPSED : "") + (_this.collapsible_ ? "" : " ol-uncollapsible");
    var element = _this.element;
    element.className = cssClasses;
    element.appendChild(_this.toggleButton_);
    element.appendChild(_this.ulElement_);
    _this.renderedAttributions_ = [];
    _this.renderedVisible_ = true;
    return _this;
  }
  Attribution2.prototype.collectSourceAttributions_ = function(frameState) {
    var lookup = {};
    var visibleAttributions = [];
    var collapsible = true;
    var layerStatesArray = frameState.layerStatesArray;
    for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
      var layerState = layerStatesArray[i];
      if (!inView(layerState, frameState.viewState)) {
        continue;
      }
      var source = layerState.layer.getSource();
      if (!source) {
        continue;
      }
      var attributionGetter = source.getAttributions();
      if (!attributionGetter) {
        continue;
      }
      var attributions = attributionGetter(frameState);
      if (!attributions) {
        continue;
      }
      collapsible = collapsible && source.getAttributionsCollapsible() !== false;
      if (Array.isArray(attributions)) {
        for (var j = 0, jj = attributions.length; j < jj; ++j) {
          if (!(attributions[j] in lookup)) {
            visibleAttributions.push(attributions[j]);
            lookup[attributions[j]] = true;
          }
        }
      } else {
        if (!(attributions in lookup)) {
          visibleAttributions.push(attributions);
          lookup[attributions] = true;
        }
      }
    }
    if (!this.overrideCollapsible_) {
      this.setCollapsible(collapsible);
    }
    return visibleAttributions;
  };
  Attribution2.prototype.updateElement_ = function(frameState) {
    if (!frameState) {
      if (this.renderedVisible_) {
        this.element.style.display = "none";
        this.renderedVisible_ = false;
      }
      return;
    }
    var attributions = this.collectSourceAttributions_(frameState);
    var visible = attributions.length > 0;
    if (this.renderedVisible_ != visible) {
      this.element.style.display = visible ? "" : "none";
      this.renderedVisible_ = visible;
    }
    if (equals(attributions, this.renderedAttributions_)) {
      return;
    }
    removeChildren(this.ulElement_);
    for (var i = 0, ii = attributions.length; i < ii; ++i) {
      var element = document.createElement("li");
      element.innerHTML = attributions[i];
      this.ulElement_.appendChild(element);
    }
    this.renderedAttributions_ = attributions;
  };
  Attribution2.prototype.handleClick_ = function(event) {
    event.preventDefault();
    this.handleToggle_();
    this.userCollapsed_ = this.collapsed_;
  };
  Attribution2.prototype.handleToggle_ = function() {
    this.element.classList.toggle(CLASS_COLLAPSED);
    if (this.collapsed_) {
      replaceNode(this.collapseLabel_, this.label_);
    } else {
      replaceNode(this.label_, this.collapseLabel_);
    }
    this.collapsed_ = !this.collapsed_;
    this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_));
  };
  Attribution2.prototype.getCollapsible = function() {
    return this.collapsible_;
  };
  Attribution2.prototype.setCollapsible = function(collapsible) {
    if (this.collapsible_ === collapsible) {
      return;
    }
    this.collapsible_ = collapsible;
    this.element.classList.toggle("ol-uncollapsible");
    if (this.userCollapsed_) {
      this.handleToggle_();
    }
  };
  Attribution2.prototype.setCollapsed = function(collapsed) {
    this.userCollapsed_ = collapsed;
    if (!this.collapsible_ || this.collapsed_ === collapsed) {
      return;
    }
    this.handleToggle_();
  };
  Attribution2.prototype.getCollapsed = function() {
    return this.collapsed_;
  };
  Attribution2.prototype.render = function(mapEvent) {
    this.updateElement_(mapEvent.frameState);
  };
  return Attribution2;
}(Control_default);
var Attribution_default = Attribution;

// ../node_modules/ol/control/Rotate.js
var __extends27 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Rotate = function(_super) {
  __extends27(Rotate2, _super);
  function Rotate2(opt_options) {
    var _this = this;
    var options = opt_options ? opt_options : {};
    _this = _super.call(this, {
      element: document.createElement("div"),
      render: options.render,
      target: options.target
    }) || this;
    var className = options.className !== void 0 ? options.className : "ol-rotate";
    var label = options.label !== void 0 ? options.label : "\u21E7";
    var compassClassName = options.compassClassName !== void 0 ? options.compassClassName : "ol-compass";
    _this.label_ = null;
    if (typeof label === "string") {
      _this.label_ = document.createElement("span");
      _this.label_.className = compassClassName;
      _this.label_.textContent = label;
    } else {
      _this.label_ = label;
      _this.label_.classList.add(compassClassName);
    }
    var tipLabel = options.tipLabel ? options.tipLabel : "Reset rotation";
    var button = document.createElement("button");
    button.className = className + "-reset";
    button.setAttribute("type", "button");
    button.title = tipLabel;
    button.appendChild(_this.label_);
    button.addEventListener(EventType_default.CLICK, _this.handleClick_.bind(_this), false);
    var cssClasses = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL;
    var element = _this.element;
    element.className = cssClasses;
    element.appendChild(button);
    _this.callResetNorth_ = options.resetNorth ? options.resetNorth : void 0;
    _this.duration_ = options.duration !== void 0 ? options.duration : 250;
    _this.autoHide_ = options.autoHide !== void 0 ? options.autoHide : true;
    _this.rotation_ = void 0;
    if (_this.autoHide_) {
      _this.element.classList.add(CLASS_HIDDEN);
    }
    return _this;
  }
  Rotate2.prototype.handleClick_ = function(event) {
    event.preventDefault();
    if (this.callResetNorth_ !== void 0) {
      this.callResetNorth_();
    } else {
      this.resetNorth_();
    }
  };
  Rotate2.prototype.resetNorth_ = function() {
    var map = this.getMap();
    var view = map.getView();
    if (!view) {
      return;
    }
    var rotation = view.getRotation();
    if (rotation !== void 0) {
      if (this.duration_ > 0 && rotation % (2 * Math.PI) !== 0) {
        view.animate({
          rotation: 0,
          duration: this.duration_,
          easing: easeOut
        });
      } else {
        view.setRotation(0);
      }
    }
  };
  Rotate2.prototype.render = function(mapEvent) {
    var frameState = mapEvent.frameState;
    if (!frameState) {
      return;
    }
    var rotation = frameState.viewState.rotation;
    if (rotation != this.rotation_) {
      var transform2 = "rotate(" + rotation + "rad)";
      if (this.autoHide_) {
        var contains = this.element.classList.contains(CLASS_HIDDEN);
        if (!contains && rotation === 0) {
          this.element.classList.add(CLASS_HIDDEN);
        } else if (contains && rotation !== 0) {
          this.element.classList.remove(CLASS_HIDDEN);
        }
      }
      this.label_.style.transform = transform2;
    }
    this.rotation_ = rotation;
  };
  return Rotate2;
}(Control_default);
var Rotate_default = Rotate;

// ../node_modules/ol/control/Zoom.js
var __extends28 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Zoom = function(_super) {
  __extends28(Zoom2, _super);
  function Zoom2(opt_options) {
    var _this = this;
    var options = opt_options ? opt_options : {};
    _this = _super.call(this, {
      element: document.createElement("div"),
      target: options.target
    }) || this;
    var className = options.className !== void 0 ? options.className : "ol-zoom";
    var delta = options.delta !== void 0 ? options.delta : 1;
    var zoomInClassName = options.zoomInClassName !== void 0 ? options.zoomInClassName : className + "-in";
    var zoomOutClassName = options.zoomOutClassName !== void 0 ? options.zoomOutClassName : className + "-out";
    var zoomInLabel = options.zoomInLabel !== void 0 ? options.zoomInLabel : "+";
    var zoomOutLabel = options.zoomOutLabel !== void 0 ? options.zoomOutLabel : "\u2013";
    var zoomInTipLabel = options.zoomInTipLabel !== void 0 ? options.zoomInTipLabel : "Zoom in";
    var zoomOutTipLabel = options.zoomOutTipLabel !== void 0 ? options.zoomOutTipLabel : "Zoom out";
    var inElement = document.createElement("button");
    inElement.className = zoomInClassName;
    inElement.setAttribute("type", "button");
    inElement.title = zoomInTipLabel;
    inElement.appendChild(typeof zoomInLabel === "string" ? document.createTextNode(zoomInLabel) : zoomInLabel);
    inElement.addEventListener(EventType_default.CLICK, _this.handleClick_.bind(_this, delta), false);
    var outElement = document.createElement("button");
    outElement.className = zoomOutClassName;
    outElement.setAttribute("type", "button");
    outElement.title = zoomOutTipLabel;
    outElement.appendChild(typeof zoomOutLabel === "string" ? document.createTextNode(zoomOutLabel) : zoomOutLabel);
    outElement.addEventListener(EventType_default.CLICK, _this.handleClick_.bind(_this, -delta), false);
    var cssClasses = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL;
    var element = _this.element;
    element.className = cssClasses;
    element.appendChild(inElement);
    element.appendChild(outElement);
    _this.duration_ = options.duration !== void 0 ? options.duration : 250;
    return _this;
  }
  Zoom2.prototype.handleClick_ = function(delta, event) {
    event.preventDefault();
    this.zoomByDelta_(delta);
  };
  Zoom2.prototype.zoomByDelta_ = function(delta) {
    var map = this.getMap();
    var view = map.getView();
    if (!view) {
      return;
    }
    var currentZoom = view.getZoom();
    if (currentZoom !== void 0) {
      var newZoom = view.getConstrainedZoom(currentZoom + delta);
      if (this.duration_ > 0) {
        if (view.getAnimating()) {
          view.cancelAnimations();
        }
        view.animate({
          zoom: newZoom,
          duration: this.duration_,
          easing: easeOut
        });
      } else {
        view.setZoom(newZoom);
      }
    }
  };
  return Zoom2;
}(Control_default);
var Zoom_default = Zoom;

// ../node_modules/ol/control.js
function defaults(opt_options) {
  var options = opt_options ? opt_options : {};
  var controls = new Collection_default();
  var zoomControl = options.zoom !== void 0 ? options.zoom : true;
  if (zoomControl) {
    controls.push(new Zoom_default(options.zoomOptions));
  }
  var rotateControl = options.rotate !== void 0 ? options.rotate : true;
  if (rotateControl) {
    controls.push(new Rotate_default(options.rotateOptions));
  }
  var attributionControl = options.attribution !== void 0 ? options.attribution : true;
  if (attributionControl) {
    controls.push(new Attribution_default(options.attributionOptions));
  }
  return controls;
}

// ../node_modules/ol/interaction/Property.js
var Property_default2 = {
  ACTIVE: "active"
};

// ../node_modules/ol/interaction/Interaction.js
var __extends29 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Interaction = function(_super) {
  __extends29(Interaction2, _super);
  function Interaction2(opt_options) {
    var _this = _super.call(this) || this;
    _this.on;
    _this.once;
    _this.un;
    if (opt_options && opt_options.handleEvent) {
      _this.handleEvent = opt_options.handleEvent;
    }
    _this.map_ = null;
    _this.setActive(true);
    return _this;
  }
  Interaction2.prototype.getActive = function() {
    return this.get(Property_default2.ACTIVE);
  };
  Interaction2.prototype.getMap = function() {
    return this.map_;
  };
  Interaction2.prototype.handleEvent = function(mapBrowserEvent) {
    return true;
  };
  Interaction2.prototype.setActive = function(active) {
    this.set(Property_default2.ACTIVE, active);
  };
  Interaction2.prototype.setMap = function(map) {
    this.map_ = map;
  };
  return Interaction2;
}(Object_default);
function pan(view, delta, opt_duration) {
  var currentCenter = view.getCenterInternal();
  if (currentCenter) {
    var center = [currentCenter[0] + delta[0], currentCenter[1] + delta[1]];
    view.animateInternal({
      duration: opt_duration !== void 0 ? opt_duration : 250,
      easing: linear,
      center: view.getConstrainedCenter(center)
    });
  }
}
function zoomByDelta(view, delta, opt_anchor, opt_duration) {
  var currentZoom = view.getZoom();
  if (currentZoom === void 0) {
    return;
  }
  var newZoom = view.getConstrainedZoom(currentZoom + delta);
  var newResolution = view.getResolutionForZoom(newZoom);
  if (view.getAnimating()) {
    view.cancelAnimations();
  }
  view.animate({
    resolution: newResolution,
    anchor: opt_anchor,
    duration: opt_duration !== void 0 ? opt_duration : 250,
    easing: easeOut
  });
}
var Interaction_default = Interaction;

// ../node_modules/ol/interaction/DoubleClickZoom.js
var __extends30 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var DoubleClickZoom = function(_super) {
  __extends30(DoubleClickZoom2, _super);
  function DoubleClickZoom2(opt_options) {
    var _this = _super.call(this) || this;
    var options = opt_options ? opt_options : {};
    _this.delta_ = options.delta ? options.delta : 1;
    _this.duration_ = options.duration !== void 0 ? options.duration : 250;
    return _this;
  }
  DoubleClickZoom2.prototype.handleEvent = function(mapBrowserEvent) {
    var stopEvent = false;
    if (mapBrowserEvent.type == MapBrowserEventType_default.DBLCLICK) {
      var browserEvent = mapBrowserEvent.originalEvent;
      var map = mapBrowserEvent.map;
      var anchor = mapBrowserEvent.coordinate;
      var delta = browserEvent.shiftKey ? -this.delta_ : this.delta_;
      var view = map.getView();
      zoomByDelta(view, delta, anchor, this.duration_);
      browserEvent.preventDefault();
      stopEvent = true;
    }
    return !stopEvent;
  };
  return DoubleClickZoom2;
}(Interaction_default);
var DoubleClickZoom_default = DoubleClickZoom;

// ../node_modules/ol/interaction/Pointer.js
var __extends31 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var PointerInteraction = function(_super) {
  __extends31(PointerInteraction2, _super);
  function PointerInteraction2(opt_options) {
    var _this = this;
    var options = opt_options ? opt_options : {};
    _this = _super.call(this, options) || this;
    if (options.handleDownEvent) {
      _this.handleDownEvent = options.handleDownEvent;
    }
    if (options.handleDragEvent) {
      _this.handleDragEvent = options.handleDragEvent;
    }
    if (options.handleMoveEvent) {
      _this.handleMoveEvent = options.handleMoveEvent;
    }
    if (options.handleUpEvent) {
      _this.handleUpEvent = options.handleUpEvent;
    }
    if (options.stopDown) {
      _this.stopDown = options.stopDown;
    }
    _this.handlingDownUpSequence = false;
    _this.trackedPointers_ = {};
    _this.targetPointers = [];
    return _this;
  }
  PointerInteraction2.prototype.getPointerCount = function() {
    return this.targetPointers.length;
  };
  PointerInteraction2.prototype.handleDownEvent = function(mapBrowserEvent) {
    return false;
  };
  PointerInteraction2.prototype.handleDragEvent = function(mapBrowserEvent) {
  };
  PointerInteraction2.prototype.handleEvent = function(mapBrowserEvent) {
    if (!mapBrowserEvent.originalEvent) {
      return true;
    }
    var stopEvent = false;
    this.updateTrackedPointers_(mapBrowserEvent);
    if (this.handlingDownUpSequence) {
      if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERDRAG) {
        this.handleDragEvent(mapBrowserEvent);
        mapBrowserEvent.originalEvent.preventDefault();
      } else if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERUP) {
        var handledUp = this.handleUpEvent(mapBrowserEvent);
        this.handlingDownUpSequence = handledUp && this.targetPointers.length > 0;
      }
    } else {
      if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERDOWN) {
        var handled = this.handleDownEvent(mapBrowserEvent);
        this.handlingDownUpSequence = handled;
        stopEvent = this.stopDown(handled);
      } else if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERMOVE) {
        this.handleMoveEvent(mapBrowserEvent);
      }
    }
    return !stopEvent;
  };
  PointerInteraction2.prototype.handleMoveEvent = function(mapBrowserEvent) {
  };
  PointerInteraction2.prototype.handleUpEvent = function(mapBrowserEvent) {
    return false;
  };
  PointerInteraction2.prototype.stopDown = function(handled) {
    return handled;
  };
  PointerInteraction2.prototype.updateTrackedPointers_ = function(mapBrowserEvent) {
    if (isPointerDraggingEvent(mapBrowserEvent)) {
      var event_1 = mapBrowserEvent.originalEvent;
      var id = event_1.pointerId.toString();
      if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERUP) {
        delete this.trackedPointers_[id];
      } else if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERDOWN) {
        this.trackedPointers_[id] = event_1;
      } else if (id in this.trackedPointers_) {
        this.trackedPointers_[id] = event_1;
      }
      this.targetPointers = getValues(this.trackedPointers_);
    }
  };
  return PointerInteraction2;
}(Interaction_default);
function centroid(pointerEvents) {
  var length = pointerEvents.length;
  var clientX = 0;
  var clientY = 0;
  for (var i = 0; i < length; i++) {
    clientX += pointerEvents[i].clientX;
    clientY += pointerEvents[i].clientY;
  }
  return [clientX / length, clientY / length];
}
function isPointerDraggingEvent(mapBrowserEvent) {
  var type = mapBrowserEvent.type;
  return type === MapBrowserEventType_default.POINTERDOWN || type === MapBrowserEventType_default.POINTERDRAG || type === MapBrowserEventType_default.POINTERUP;
}
var Pointer_default = PointerInteraction;

// ../node_modules/ol/events/condition.js
function all(var_args) {
  var conditions = arguments;
  return function(event) {
    var pass = true;
    for (var i = 0, ii = conditions.length; i < ii; ++i) {
      pass = pass && conditions[i](event);
      if (!pass) {
        break;
      }
    }
    return pass;
  };
}
var altShiftKeysOnly = function(mapBrowserEvent) {
  var originalEvent = mapBrowserEvent.originalEvent;
  return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && originalEvent.shiftKey;
};
var focus = function(event) {
  var targetElement = event.map.getTargetElement();
  var activeElement = event.map.getOwnerDocument().activeElement;
  return targetElement.contains(activeElement);
};
var focusWithTabindex = function(event) {
  return event.map.getTargetElement().hasAttribute("tabindex") ? focus(event) : true;
};
var always = TRUE;
var mouseActionButton = function(mapBrowserEvent) {
  var originalEvent = mapBrowserEvent.originalEvent;
  return originalEvent.button == 0 && !(WEBKIT && MAC && originalEvent.ctrlKey);
};
var noModifierKeys = function(mapBrowserEvent) {
  var originalEvent = mapBrowserEvent.originalEvent;
  return !originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && !originalEvent.shiftKey;
};
var shiftKeyOnly = function(mapBrowserEvent) {
  var originalEvent = mapBrowserEvent.originalEvent;
  return !originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && originalEvent.shiftKey;
};
var targetNotEditable = function(mapBrowserEvent) {
  var originalEvent = mapBrowserEvent.originalEvent;
  var tagName = originalEvent.target.tagName;
  return tagName !== "INPUT" && tagName !== "SELECT" && tagName !== "TEXTAREA";
};
var mouseOnly = function(mapBrowserEvent) {
  var pointerEvent = mapBrowserEvent.originalEvent;
  assert(pointerEvent !== void 0, 56);
  return pointerEvent.pointerType == "mouse";
};
var primaryAction = function(mapBrowserEvent) {
  var pointerEvent = mapBrowserEvent.originalEvent;
  assert(pointerEvent !== void 0, 56);
  return pointerEvent.isPrimary && pointerEvent.button === 0;
};

// ../node_modules/ol/interaction/DragPan.js
var __extends32 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var DragPan = function(_super) {
  __extends32(DragPan2, _super);
  function DragPan2(opt_options) {
    var _this = _super.call(this, {
      stopDown: FALSE
    }) || this;
    var options = opt_options ? opt_options : {};
    _this.kinetic_ = options.kinetic;
    _this.lastCentroid = null;
    _this.lastPointersCount_;
    _this.panning_ = false;
    var condition = options.condition ? options.condition : all(noModifierKeys, primaryAction);
    _this.condition_ = options.onFocusOnly ? all(focusWithTabindex, condition) : condition;
    _this.noKinetic_ = false;
    return _this;
  }
  DragPan2.prototype.handleDragEvent = function(mapBrowserEvent) {
    if (!this.panning_) {
      this.panning_ = true;
      this.getMap().getView().beginInteraction();
    }
    var targetPointers = this.targetPointers;
    var centroid2 = centroid(targetPointers);
    if (targetPointers.length == this.lastPointersCount_) {
      if (this.kinetic_) {
        this.kinetic_.update(centroid2[0], centroid2[1]);
      }
      if (this.lastCentroid) {
        var delta = [
          this.lastCentroid[0] - centroid2[0],
          centroid2[1] - this.lastCentroid[1]
        ];
        var map = mapBrowserEvent.map;
        var view = map.getView();
        scale(delta, view.getResolution());
        rotate(delta, view.getRotation());
        view.adjustCenterInternal(delta);
      }
    } else if (this.kinetic_) {
      this.kinetic_.begin();
    }
    this.lastCentroid = centroid2;
    this.lastPointersCount_ = targetPointers.length;
    mapBrowserEvent.originalEvent.preventDefault();
  };
  DragPan2.prototype.handleUpEvent = function(mapBrowserEvent) {
    var map = mapBrowserEvent.map;
    var view = map.getView();
    if (this.targetPointers.length === 0) {
      if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
        var distance = this.kinetic_.getDistance();
        var angle = this.kinetic_.getAngle();
        var center = view.getCenterInternal();
        var centerpx = map.getPixelFromCoordinateInternal(center);
        var dest = map.getCoordinateFromPixelInternal([
          centerpx[0] - distance * Math.cos(angle),
          centerpx[1] - distance * Math.sin(angle)
        ]);
        view.animateInternal({
          center: view.getConstrainedCenter(dest),
          duration: 500,
          easing: easeOut
        });
      }
      if (this.panning_) {
        this.panning_ = false;
        view.endInteraction();
      }
      return false;
    } else {
      if (this.kinetic_) {
        this.kinetic_.begin();
      }
      this.lastCentroid = null;
      return true;
    }
  };
  DragPan2.prototype.handleDownEvent = function(mapBrowserEvent) {
    if (this.targetPointers.length > 0 && this.condition_(mapBrowserEvent)) {
      var map = mapBrowserEvent.map;
      var view = map.getView();
      this.lastCentroid = null;
      if (view.getAnimating()) {
        view.cancelAnimations();
      }
      if (this.kinetic_) {
        this.kinetic_.begin();
      }
      this.noKinetic_ = this.targetPointers.length > 1;
      return true;
    } else {
      return false;
    }
  };
  return DragPan2;
}(Pointer_default);
var DragPan_default = DragPan;

// ../node_modules/ol/interaction/DragRotate.js
var __extends33 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var DragRotate = function(_super) {
  __extends33(DragRotate2, _super);
  function DragRotate2(opt_options) {
    var _this = this;
    var options = opt_options ? opt_options : {};
    _this = _super.call(this, {
      stopDown: FALSE
    }) || this;
    _this.condition_ = options.condition ? options.condition : altShiftKeysOnly;
    _this.lastAngle_ = void 0;
    _this.duration_ = options.duration !== void 0 ? options.duration : 250;
    return _this;
  }
  DragRotate2.prototype.handleDragEvent = function(mapBrowserEvent) {
    if (!mouseOnly(mapBrowserEvent)) {
      return;
    }
    var map = mapBrowserEvent.map;
    var view = map.getView();
    if (view.getConstraints().rotation === disable) {
      return;
    }
    var size = map.getSize();
    var offset = mapBrowserEvent.pixel;
    var theta = Math.atan2(size[1] / 2 - offset[1], offset[0] - size[0] / 2);
    if (this.lastAngle_ !== void 0) {
      var delta = theta - this.lastAngle_;
      view.adjustRotationInternal(-delta);
    }
    this.lastAngle_ = theta;
  };
  DragRotate2.prototype.handleUpEvent = function(mapBrowserEvent) {
    if (!mouseOnly(mapBrowserEvent)) {
      return true;
    }
    var map = mapBrowserEvent.map;
    var view = map.getView();
    view.endInteraction(this.duration_);
    return false;
  };
  DragRotate2.prototype.handleDownEvent = function(mapBrowserEvent) {
    if (!mouseOnly(mapBrowserEvent)) {
      return false;
    }
    if (mouseActionButton(mapBrowserEvent) && this.condition_(mapBrowserEvent)) {
      var map = mapBrowserEvent.map;
      map.getView().beginInteraction();
      this.lastAngle_ = void 0;
      return true;
    } else {
      return false;
    }
  };
  return DragRotate2;
}(Pointer_default);
var DragRotate_default = DragRotate;

// ../node_modules/ol/render/Box.js
var __extends34 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var RenderBox = function(_super) {
  __extends34(RenderBox2, _super);
  function RenderBox2(className) {
    var _this = _super.call(this) || this;
    _this.geometry_ = null;
    _this.element_ = document.createElement("div");
    _this.element_.style.position = "absolute";
    _this.element_.style.pointerEvents = "auto";
    _this.element_.className = "ol-box " + className;
    _this.map_ = null;
    _this.startPixel_ = null;
    _this.endPixel_ = null;
    return _this;
  }
  RenderBox2.prototype.disposeInternal = function() {
    this.setMap(null);
  };
  RenderBox2.prototype.render_ = function() {
    var startPixel = this.startPixel_;
    var endPixel = this.endPixel_;
    var px = "px";
    var style = this.element_.style;
    style.left = Math.min(startPixel[0], endPixel[0]) + px;
    style.top = Math.min(startPixel[1], endPixel[1]) + px;
    style.width = Math.abs(endPixel[0] - startPixel[0]) + px;
    style.height = Math.abs(endPixel[1] - startPixel[1]) + px;
  };
  RenderBox2.prototype.setMap = function(map) {
    if (this.map_) {
      this.map_.getOverlayContainer().removeChild(this.element_);
      var style = this.element_.style;
      style.left = "inherit";
      style.top = "inherit";
      style.width = "inherit";
      style.height = "inherit";
    }
    this.map_ = map;
    if (this.map_) {
      this.map_.getOverlayContainer().appendChild(this.element_);
    }
  };
  RenderBox2.prototype.setPixels = function(startPixel, endPixel) {
    this.startPixel_ = startPixel;
    this.endPixel_ = endPixel;
    this.createOrUpdateGeometry();
    this.render_();
  };
  RenderBox2.prototype.createOrUpdateGeometry = function() {
    var startPixel = this.startPixel_;
    var endPixel = this.endPixel_;
    var pixels = [
      startPixel,
      [startPixel[0], endPixel[1]],
      endPixel,
      [endPixel[0], startPixel[1]]
    ];
    var coordinates2 = pixels.map(this.map_.getCoordinateFromPixelInternal, this.map_);
    coordinates2[4] = coordinates2[0].slice();
    if (!this.geometry_) {
      this.geometry_ = new Polygon_default([coordinates2]);
    } else {
      this.geometry_.setCoordinates([coordinates2]);
    }
  };
  RenderBox2.prototype.getGeometry = function() {
    return this.geometry_;
  };
  return RenderBox2;
}(Disposable_default);
var Box_default = RenderBox;

// ../node_modules/ol/interaction/DragBox.js
var __extends35 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var DragBoxEventType = {
  BOXSTART: "boxstart",
  BOXDRAG: "boxdrag",
  BOXEND: "boxend",
  BOXCANCEL: "boxcancel"
};
var DragBoxEvent = function(_super) {
  __extends35(DragBoxEvent2, _super);
  function DragBoxEvent2(type, coordinate, mapBrowserEvent) {
    var _this = _super.call(this, type) || this;
    _this.coordinate = coordinate;
    _this.mapBrowserEvent = mapBrowserEvent;
    return _this;
  }
  return DragBoxEvent2;
}(Event_default);
var DragBox = function(_super) {
  __extends35(DragBox2, _super);
  function DragBox2(opt_options) {
    var _this = _super.call(this) || this;
    _this.on;
    _this.once;
    _this.un;
    var options = opt_options ? opt_options : {};
    _this.box_ = new Box_default(options.className || "ol-dragbox");
    _this.minArea_ = options.minArea !== void 0 ? options.minArea : 64;
    if (options.onBoxEnd) {
      _this.onBoxEnd = options.onBoxEnd;
    }
    _this.startPixel_ = null;
    _this.condition_ = options.condition ? options.condition : mouseActionButton;
    _this.boxEndCondition_ = options.boxEndCondition ? options.boxEndCondition : _this.defaultBoxEndCondition;
    return _this;
  }
  DragBox2.prototype.defaultBoxEndCondition = function(mapBrowserEvent, startPixel, endPixel) {
    var width = endPixel[0] - startPixel[0];
    var height = endPixel[1] - startPixel[1];
    return width * width + height * height >= this.minArea_;
  };
  DragBox2.prototype.getGeometry = function() {
    return this.box_.getGeometry();
  };
  DragBox2.prototype.handleDragEvent = function(mapBrowserEvent) {
    this.box_.setPixels(this.startPixel_, mapBrowserEvent.pixel);
    this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXDRAG, mapBrowserEvent.coordinate, mapBrowserEvent));
  };
  DragBox2.prototype.handleUpEvent = function(mapBrowserEvent) {
    this.box_.setMap(null);
    var completeBox = this.boxEndCondition_(mapBrowserEvent, this.startPixel_, mapBrowserEvent.pixel);
    if (completeBox) {
      this.onBoxEnd(mapBrowserEvent);
    }
    this.dispatchEvent(new DragBoxEvent(completeBox ? DragBoxEventType.BOXEND : DragBoxEventType.BOXCANCEL, mapBrowserEvent.coordinate, mapBrowserEvent));
    return false;
  };
  DragBox2.prototype.handleDownEvent = function(mapBrowserEvent) {
    if (this.condition_(mapBrowserEvent)) {
      this.startPixel_ = mapBrowserEvent.pixel;
      this.box_.setMap(mapBrowserEvent.map);
      this.box_.setPixels(this.startPixel_, this.startPixel_);
      this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXSTART, mapBrowserEvent.coordinate, mapBrowserEvent));
      return true;
    } else {
      return false;
    }
  };
  DragBox2.prototype.onBoxEnd = function(event) {
  };
  return DragBox2;
}(Pointer_default);
var DragBox_default = DragBox;

// ../node_modules/ol/interaction/DragZoom.js
var __extends36 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var DragZoom = function(_super) {
  __extends36(DragZoom2, _super);
  function DragZoom2(opt_options) {
    var _this = this;
    var options = opt_options ? opt_options : {};
    var condition = options.condition ? options.condition : shiftKeyOnly;
    _this = _super.call(this, {
      condition,
      className: options.className || "ol-dragzoom",
      minArea: options.minArea
    }) || this;
    _this.duration_ = options.duration !== void 0 ? options.duration : 200;
    _this.out_ = options.out !== void 0 ? options.out : false;
    return _this;
  }
  DragZoom2.prototype.onBoxEnd = function(event) {
    var map = this.getMap();
    var view = map.getView();
    var geometry = this.getGeometry();
    if (this.out_) {
      var rotatedExtent = view.rotatedExtentForGeometry(geometry);
      var resolution = view.getResolutionForExtentInternal(rotatedExtent);
      var factor = view.getResolution() / resolution;
      geometry = geometry.clone();
      geometry.scale(factor * factor);
    }
    view.fitInternal(geometry, {
      duration: this.duration_,
      easing: easeOut
    });
  };
  return DragZoom2;
}(DragBox_default);
var DragZoom_default = DragZoom;

// ../node_modules/ol/events/KeyCode.js
var KeyCode_default = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

// ../node_modules/ol/interaction/KeyboardPan.js
var __extends37 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var KeyboardPan = function(_super) {
  __extends37(KeyboardPan2, _super);
  function KeyboardPan2(opt_options) {
    var _this = _super.call(this) || this;
    var options = opt_options || {};
    _this.defaultCondition_ = function(mapBrowserEvent) {
      return noModifierKeys(mapBrowserEvent) && targetNotEditable(mapBrowserEvent);
    };
    _this.condition_ = options.condition !== void 0 ? options.condition : _this.defaultCondition_;
    _this.duration_ = options.duration !== void 0 ? options.duration : 100;
    _this.pixelDelta_ = options.pixelDelta !== void 0 ? options.pixelDelta : 128;
    return _this;
  }
  KeyboardPan2.prototype.handleEvent = function(mapBrowserEvent) {
    var stopEvent = false;
    if (mapBrowserEvent.type == EventType_default.KEYDOWN) {
      var keyEvent = mapBrowserEvent.originalEvent;
      var keyCode = keyEvent.keyCode;
      if (this.condition_(mapBrowserEvent) && (keyCode == KeyCode_default.DOWN || keyCode == KeyCode_default.LEFT || keyCode == KeyCode_default.RIGHT || keyCode == KeyCode_default.UP)) {
        var map = mapBrowserEvent.map;
        var view = map.getView();
        var mapUnitsDelta = view.getResolution() * this.pixelDelta_;
        var deltaX = 0, deltaY = 0;
        if (keyCode == KeyCode_default.DOWN) {
          deltaY = -mapUnitsDelta;
        } else if (keyCode == KeyCode_default.LEFT) {
          deltaX = -mapUnitsDelta;
        } else if (keyCode == KeyCode_default.RIGHT) {
          deltaX = mapUnitsDelta;
        } else {
          deltaY = mapUnitsDelta;
        }
        var delta = [deltaX, deltaY];
        rotate(delta, view.getRotation());
        pan(view, delta, this.duration_);
        keyEvent.preventDefault();
        stopEvent = true;
      }
    }
    return !stopEvent;
  };
  return KeyboardPan2;
}(Interaction_default);
var KeyboardPan_default = KeyboardPan;

// ../node_modules/ol/interaction/KeyboardZoom.js
var __extends38 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var KeyboardZoom = function(_super) {
  __extends38(KeyboardZoom2, _super);
  function KeyboardZoom2(opt_options) {
    var _this = _super.call(this) || this;
    var options = opt_options ? opt_options : {};
    _this.condition_ = options.condition ? options.condition : targetNotEditable;
    _this.delta_ = options.delta ? options.delta : 1;
    _this.duration_ = options.duration !== void 0 ? options.duration : 100;
    return _this;
  }
  KeyboardZoom2.prototype.handleEvent = function(mapBrowserEvent) {
    var stopEvent = false;
    if (mapBrowserEvent.type == EventType_default.KEYDOWN || mapBrowserEvent.type == EventType_default.KEYPRESS) {
      var keyEvent = mapBrowserEvent.originalEvent;
      var charCode = keyEvent.charCode;
      if (this.condition_(mapBrowserEvent) && (charCode == "+".charCodeAt(0) || charCode == "-".charCodeAt(0))) {
        var map = mapBrowserEvent.map;
        var delta = charCode == "+".charCodeAt(0) ? this.delta_ : -this.delta_;
        var view = map.getView();
        zoomByDelta(view, delta, void 0, this.duration_);
        keyEvent.preventDefault();
        stopEvent = true;
      }
    }
    return !stopEvent;
  };
  return KeyboardZoom2;
}(Interaction_default);
var KeyboardZoom_default = KeyboardZoom;

// ../node_modules/ol/Kinetic.js
var Kinetic = function() {
  function Kinetic2(decay, minVelocity, delay) {
    this.decay_ = decay;
    this.minVelocity_ = minVelocity;
    this.delay_ = delay;
    this.points_ = [];
    this.angle_ = 0;
    this.initialVelocity_ = 0;
  }
  Kinetic2.prototype.begin = function() {
    this.points_.length = 0;
    this.angle_ = 0;
    this.initialVelocity_ = 0;
  };
  Kinetic2.prototype.update = function(x, y) {
    this.points_.push(x, y, Date.now());
  };
  Kinetic2.prototype.end = function() {
    if (this.points_.length < 6) {
      return false;
    }
    var delay = Date.now() - this.delay_;
    var lastIndex = this.points_.length - 3;
    if (this.points_[lastIndex + 2] < delay) {
      return false;
    }
    var firstIndex = lastIndex - 3;
    while (firstIndex > 0 && this.points_[firstIndex + 2] > delay) {
      firstIndex -= 3;
    }
    var duration = this.points_[lastIndex + 2] - this.points_[firstIndex + 2];
    if (duration < 1e3 / 60) {
      return false;
    }
    var dx = this.points_[lastIndex] - this.points_[firstIndex];
    var dy = this.points_[lastIndex + 1] - this.points_[firstIndex + 1];
    this.angle_ = Math.atan2(dy, dx);
    this.initialVelocity_ = Math.sqrt(dx * dx + dy * dy) / duration;
    return this.initialVelocity_ > this.minVelocity_;
  };
  Kinetic2.prototype.getDistance = function() {
    return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
  };
  Kinetic2.prototype.getAngle = function() {
    return this.angle_;
  };
  return Kinetic2;
}();
var Kinetic_default = Kinetic;

// ../node_modules/ol/interaction/MouseWheelZoom.js
var __extends39 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Mode = {
  TRACKPAD: "trackpad",
  WHEEL: "wheel"
};
var MouseWheelZoom = function(_super) {
  __extends39(MouseWheelZoom2, _super);
  function MouseWheelZoom2(opt_options) {
    var _this = this;
    var options = opt_options ? opt_options : {};
    _this = _super.call(this, options) || this;
    _this.totalDelta_ = 0;
    _this.lastDelta_ = 0;
    _this.maxDelta_ = options.maxDelta !== void 0 ? options.maxDelta : 1;
    _this.duration_ = options.duration !== void 0 ? options.duration : 250;
    _this.timeout_ = options.timeout !== void 0 ? options.timeout : 80;
    _this.useAnchor_ = options.useAnchor !== void 0 ? options.useAnchor : true;
    _this.constrainResolution_ = options.constrainResolution !== void 0 ? options.constrainResolution : false;
    var condition = options.condition ? options.condition : always;
    _this.condition_ = options.onFocusOnly ? all(focusWithTabindex, condition) : condition;
    _this.lastAnchor_ = null;
    _this.startTime_ = void 0;
    _this.timeoutId_;
    _this.mode_ = void 0;
    _this.trackpadEventGap_ = 400;
    _this.trackpadTimeoutId_;
    _this.deltaPerZoom_ = 300;
    return _this;
  }
  MouseWheelZoom2.prototype.endInteraction_ = function() {
    this.trackpadTimeoutId_ = void 0;
    var view = this.getMap().getView();
    view.endInteraction(void 0, this.lastDelta_ ? this.lastDelta_ > 0 ? 1 : -1 : 0, this.lastAnchor_);
  };
  MouseWheelZoom2.prototype.handleEvent = function(mapBrowserEvent) {
    if (!this.condition_(mapBrowserEvent)) {
      return true;
    }
    var type = mapBrowserEvent.type;
    if (type !== EventType_default.WHEEL) {
      return true;
    }
    var map = mapBrowserEvent.map;
    var wheelEvent = mapBrowserEvent.originalEvent;
    wheelEvent.preventDefault();
    if (this.useAnchor_) {
      this.lastAnchor_ = mapBrowserEvent.coordinate;
    }
    var delta;
    if (mapBrowserEvent.type == EventType_default.WHEEL) {
      delta = wheelEvent.deltaY;
      if (FIREFOX && wheelEvent.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
        delta /= DEVICE_PIXEL_RATIO;
      }
      if (wheelEvent.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        delta *= 40;
      }
    }
    if (delta === 0) {
      return false;
    } else {
      this.lastDelta_ = delta;
    }
    var now = Date.now();
    if (this.startTime_ === void 0) {
      this.startTime_ = now;
    }
    if (!this.mode_ || now - this.startTime_ > this.trackpadEventGap_) {
      this.mode_ = Math.abs(delta) < 4 ? Mode.TRACKPAD : Mode.WHEEL;
    }
    var view = map.getView();
    if (this.mode_ === Mode.TRACKPAD && !(view.getConstrainResolution() || this.constrainResolution_)) {
      if (this.trackpadTimeoutId_) {
        clearTimeout(this.trackpadTimeoutId_);
      } else {
        if (view.getAnimating()) {
          view.cancelAnimations();
        }
        view.beginInteraction();
      }
      this.trackpadTimeoutId_ = setTimeout(this.endInteraction_.bind(this), this.timeout_);
      view.adjustZoom(-delta / this.deltaPerZoom_, this.lastAnchor_);
      this.startTime_ = now;
      return false;
    }
    this.totalDelta_ += delta;
    var timeLeft = Math.max(this.timeout_ - (now - this.startTime_), 0);
    clearTimeout(this.timeoutId_);
    this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, map), timeLeft);
    return false;
  };
  MouseWheelZoom2.prototype.handleWheelZoom_ = function(map) {
    var view = map.getView();
    if (view.getAnimating()) {
      view.cancelAnimations();
    }
    var delta = -clamp(this.totalDelta_, -this.maxDelta_ * this.deltaPerZoom_, this.maxDelta_ * this.deltaPerZoom_) / this.deltaPerZoom_;
    if (view.getConstrainResolution() || this.constrainResolution_) {
      delta = delta ? delta > 0 ? 1 : -1 : 0;
    }
    zoomByDelta(view, delta, this.lastAnchor_, this.duration_);
    this.mode_ = void 0;
    this.totalDelta_ = 0;
    this.lastAnchor_ = null;
    this.startTime_ = void 0;
    this.timeoutId_ = void 0;
  };
  MouseWheelZoom2.prototype.setMouseAnchor = function(useAnchor) {
    this.useAnchor_ = useAnchor;
    if (!useAnchor) {
      this.lastAnchor_ = null;
    }
  };
  return MouseWheelZoom2;
}(Interaction_default);
var MouseWheelZoom_default = MouseWheelZoom;

// ../node_modules/ol/interaction/PinchRotate.js
var __extends40 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var PinchRotate = function(_super) {
  __extends40(PinchRotate2, _super);
  function PinchRotate2(opt_options) {
    var _this = this;
    var options = opt_options ? opt_options : {};
    var pointerOptions = options;
    if (!pointerOptions.stopDown) {
      pointerOptions.stopDown = FALSE;
    }
    _this = _super.call(this, pointerOptions) || this;
    _this.anchor_ = null;
    _this.lastAngle_ = void 0;
    _this.rotating_ = false;
    _this.rotationDelta_ = 0;
    _this.threshold_ = options.threshold !== void 0 ? options.threshold : 0.3;
    _this.duration_ = options.duration !== void 0 ? options.duration : 250;
    return _this;
  }
  PinchRotate2.prototype.handleDragEvent = function(mapBrowserEvent) {
    var rotationDelta = 0;
    var touch0 = this.targetPointers[0];
    var touch1 = this.targetPointers[1];
    var angle = Math.atan2(touch1.clientY - touch0.clientY, touch1.clientX - touch0.clientX);
    if (this.lastAngle_ !== void 0) {
      var delta = angle - this.lastAngle_;
      this.rotationDelta_ += delta;
      if (!this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_) {
        this.rotating_ = true;
      }
      rotationDelta = delta;
    }
    this.lastAngle_ = angle;
    var map = mapBrowserEvent.map;
    var view = map.getView();
    if (view.getConstraints().rotation === disable) {
      return;
    }
    var viewportPosition = map.getViewport().getBoundingClientRect();
    var centroid2 = centroid(this.targetPointers);
    centroid2[0] -= viewportPosition.left;
    centroid2[1] -= viewportPosition.top;
    this.anchor_ = map.getCoordinateFromPixelInternal(centroid2);
    if (this.rotating_) {
      map.render();
      view.adjustRotationInternal(rotationDelta, this.anchor_);
    }
  };
  PinchRotate2.prototype.handleUpEvent = function(mapBrowserEvent) {
    if (this.targetPointers.length < 2) {
      var map = mapBrowserEvent.map;
      var view = map.getView();
      view.endInteraction(this.duration_);
      return false;
    } else {
      return true;
    }
  };
  PinchRotate2.prototype.handleDownEvent = function(mapBrowserEvent) {
    if (this.targetPointers.length >= 2) {
      var map = mapBrowserEvent.map;
      this.anchor_ = null;
      this.lastAngle_ = void 0;
      this.rotating_ = false;
      this.rotationDelta_ = 0;
      if (!this.handlingDownUpSequence) {
        map.getView().beginInteraction();
      }
      return true;
    } else {
      return false;
    }
  };
  return PinchRotate2;
}(Pointer_default);
var PinchRotate_default = PinchRotate;

// ../node_modules/ol/interaction/PinchZoom.js
var __extends41 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var PinchZoom = function(_super) {
  __extends41(PinchZoom2, _super);
  function PinchZoom2(opt_options) {
    var _this = this;
    var options = opt_options ? opt_options : {};
    var pointerOptions = options;
    if (!pointerOptions.stopDown) {
      pointerOptions.stopDown = FALSE;
    }
    _this = _super.call(this, pointerOptions) || this;
    _this.anchor_ = null;
    _this.duration_ = options.duration !== void 0 ? options.duration : 400;
    _this.lastDistance_ = void 0;
    _this.lastScaleDelta_ = 1;
    return _this;
  }
  PinchZoom2.prototype.handleDragEvent = function(mapBrowserEvent) {
    var scaleDelta = 1;
    var touch0 = this.targetPointers[0];
    var touch1 = this.targetPointers[1];
    var dx = touch0.clientX - touch1.clientX;
    var dy = touch0.clientY - touch1.clientY;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (this.lastDistance_ !== void 0) {
      scaleDelta = this.lastDistance_ / distance;
    }
    this.lastDistance_ = distance;
    var map = mapBrowserEvent.map;
    var view = map.getView();
    if (scaleDelta != 1) {
      this.lastScaleDelta_ = scaleDelta;
    }
    var viewportPosition = map.getViewport().getBoundingClientRect();
    var centroid2 = centroid(this.targetPointers);
    centroid2[0] -= viewportPosition.left;
    centroid2[1] -= viewportPosition.top;
    this.anchor_ = map.getCoordinateFromPixelInternal(centroid2);
    map.render();
    view.adjustResolutionInternal(scaleDelta, this.anchor_);
  };
  PinchZoom2.prototype.handleUpEvent = function(mapBrowserEvent) {
    if (this.targetPointers.length < 2) {
      var map = mapBrowserEvent.map;
      var view = map.getView();
      var direction = this.lastScaleDelta_ > 1 ? 1 : -1;
      view.endInteraction(this.duration_, direction);
      return false;
    } else {
      return true;
    }
  };
  PinchZoom2.prototype.handleDownEvent = function(mapBrowserEvent) {
    if (this.targetPointers.length >= 2) {
      var map = mapBrowserEvent.map;
      this.anchor_ = null;
      this.lastDistance_ = void 0;
      this.lastScaleDelta_ = 1;
      if (!this.handlingDownUpSequence) {
        map.getView().beginInteraction();
      }
      return true;
    } else {
      return false;
    }
  };
  return PinchZoom2;
}(Pointer_default);
var PinchZoom_default = PinchZoom;

// ../node_modules/ol/interaction.js
function defaults2(opt_options) {
  var options = opt_options ? opt_options : {};
  var interactions = new Collection_default();
  var kinetic = new Kinetic_default(-5e-3, 0.05, 100);
  var altShiftDragRotate = options.altShiftDragRotate !== void 0 ? options.altShiftDragRotate : true;
  if (altShiftDragRotate) {
    interactions.push(new DragRotate_default());
  }
  var doubleClickZoom = options.doubleClickZoom !== void 0 ? options.doubleClickZoom : true;
  if (doubleClickZoom) {
    interactions.push(new DoubleClickZoom_default({
      delta: options.zoomDelta,
      duration: options.zoomDuration
    }));
  }
  var dragPan = options.dragPan !== void 0 ? options.dragPan : true;
  if (dragPan) {
    interactions.push(new DragPan_default({
      onFocusOnly: options.onFocusOnly,
      kinetic
    }));
  }
  var pinchRotate = options.pinchRotate !== void 0 ? options.pinchRotate : true;
  if (pinchRotate) {
    interactions.push(new PinchRotate_default());
  }
  var pinchZoom = options.pinchZoom !== void 0 ? options.pinchZoom : true;
  if (pinchZoom) {
    interactions.push(new PinchZoom_default({
      duration: options.zoomDuration
    }));
  }
  var keyboard = options.keyboard !== void 0 ? options.keyboard : true;
  if (keyboard) {
    interactions.push(new KeyboardPan_default());
    interactions.push(new KeyboardZoom_default({
      delta: options.zoomDelta,
      duration: options.zoomDuration
    }));
  }
  var mouseWheelZoom = options.mouseWheelZoom !== void 0 ? options.mouseWheelZoom : true;
  if (mouseWheelZoom) {
    interactions.push(new MouseWheelZoom_default({
      onFocusOnly: options.onFocusOnly,
      duration: options.zoomDuration
    }));
  }
  var shiftDragZoom = options.shiftDragZoom !== void 0 ? options.shiftDragZoom : true;
  if (shiftDragZoom) {
    interactions.push(new DragZoom_default({
      duration: options.zoomDuration
    }));
  }
  return interactions;
}

// ../node_modules/ol/Map.js
var __extends42 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Map = function(_super) {
  __extends42(Map2, _super);
  function Map2(options) {
    options = assign({}, options);
    if (!options.controls) {
      options.controls = defaults();
    }
    if (!options.interactions) {
      options.interactions = defaults2({
        onFocusOnly: true
      });
    }
    return _super.call(this, options) || this;
  }
  Map2.prototype.createRenderer = function() {
    return new Composite_default(this);
  };
  return Map2;
}(PluggableMap_default);
var Map_default2 = Map;
export {
  Map_default2 as default
};
