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
function isEmpty(object) {
  var property;
  for (property in object) {
    return false;
  }
  return !property;
}

// ../node_modules/ol/events/Target.js
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
var Target = function(_super) {
  __extends(Target2, _super);
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
var Observable = function(_super) {
  __extends2(Observable2, _super);
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

// ../node_modules/ol/Object.js
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
var ObjectEvent = function(_super) {
  __extends3(ObjectEvent2, _super);
  function ObjectEvent2(type, key, oldValue) {
    var _this = _super.call(this, type) || this;
    _this.key = key;
    _this.oldValue = oldValue;
    return _this;
  }
  return ObjectEvent2;
}(Event_default);
var BaseObject = function(_super) {
  __extends3(BaseObject2, _super);
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
      if (isEmpty(this.values_)) {
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

// ../node_modules/ol/proj/epsg3857.js
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
var RADIUS = 6378137;
var HALF_SIZE = Math.PI * RADIUS;
var EXTENT = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
var WORLD_EXTENT = [-180, -85, 180, 85];
var MAX_SAFE_Y = RADIUS * Math.log(Math.tan(Math.PI / 2));
var EPSG3857Projection = function(_super) {
  __extends4(EPSG3857Projection2, _super);
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
var RADIUS2 = 6378137;
var EXTENT2 = [-180, -90, 180, 90];
var METERS_PER_UNIT2 = Math.PI * RADIUS2 / 180;
var EPSG4326Projection = function(_super) {
  __extends5(EPSG4326Projection2, _super);
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
function add(code, projection) {
  cache[code] = projection;
}

// ../node_modules/ol/proj/transforms.js
var transforms = {};
function add2(source, destination, transformFn) {
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

// ../node_modules/ol/extent/Relationship.js
var Relationship_default = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};

// ../node_modules/ol/AssertionError.js
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
var AssertionError = function(_super) {
  __extends6(AssertionError2, _super);
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

// ../node_modules/ol/extent.js
function _boundingExtentXYs(xs, ys, opt_extent) {
  var minX = Math.min.apply(null, xs);
  var minY = Math.min.apply(null, ys);
  var maxX = Math.max.apply(null, xs);
  var maxY = Math.max.apply(null, ys);
  return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
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
function isEmpty2(extent) {
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

// ../node_modules/ol/coordinate.js
function add3(coordinate, delta) {
  coordinate[0] += +delta[0];
  coordinate[1] += +delta[1];
  return coordinate;
}
function equals2(coordinate1, coordinate2) {
  var equals3 = true;
  for (var i = coordinate1.length - 1; i >= 0; --i) {
    if (coordinate1[i] != coordinate2[i]) {
      equals3 = false;
      break;
    }
  }
  return equals3;
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
  add(projection.getCode(), projection);
  add2(projection, projection, cloneTransform);
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
        add2(source, destination, cloneTransform);
      }
    });
  });
}
function addEquivalentTransforms(projections1, projections2, forwardTransform, inverseTransform) {
  projections1.forEach(function(projection1) {
    projections2.forEach(function(projection2) {
      add2(projection1, projection2, forwardTransform);
      add2(projection2, projection1, inverseTransform);
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
    if (showCoordinateWarning && !equals2(coordinate, [0, 0]) && coordinate[0] >= -180 && coordinate[0] <= 180 && coordinate[1] >= -90 && coordinate[1] <= 90) {
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

// ../node_modules/ol/geom/GeometryLayout.js
var GeometryLayout_default = {
  XY: "XY",
  XYZ: "XYZ",
  XYM: "XYM",
  XYZM: "XYZM"
};

// ../node_modules/ol/transform.js
var tmp_ = new Array(6);
function create() {
  return [1, 0, 0, 1, 0, 0];
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
function scale(flatCoordinates, offset, end, stride, sx, sy, anchor, opt_dest) {
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
var tmpTransform = create();
var Geometry = function(_super) {
  __extends7(Geometry2, _super);
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
      var clone = this.clone();
      clone.applyTransform(opt_transform);
      return clone.getSimplifiedGeometry(squaredTolerance);
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
      var scale2 = getHeight(projectedExtent) / getHeight(pixelExtent);
      compose(tmpTransform, projectedExtent[0], projectedExtent[3], scale2, -scale2, 0, 0, 0);
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
var SimpleGeometry = function(_super) {
  __extends8(SimpleGeometry2, _super);
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
      scale(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
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
var LinearRing = function(_super) {
  __extends9(LinearRing2, _super);
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
var Point = function(_super) {
  __extends10(Point2, _super);
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
var Polygon = function(_super) {
  __extends11(Polygon2, _super);
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
var DEFAULT_MIN_ZOOM = 0;
var View = function(_super) {
  __extends12(View2, _super);
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
      add3(center, anchor);
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
      assert(!isEmpty2(geometryOrExtent), 25);
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
    if (!newCenter || !this.get(ViewProperty_default.CENTER) || !equals2(this.get(ViewProperty_default.CENTER), newCenter)) {
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
    if (this.getResolution() !== newResolution || this.getRotation() !== newRotation || !this.getCenterInternal() || !equals2(this.getCenterInternal(), newCenter)) {
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
    if (!equals2(animation.sourceCenter, animation.targetCenter)) {
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
export {
  createCenterConstraint,
  createResolutionConstraint,
  createRotationConstraint,
  View_default as default,
  isNoopAnimation
};
