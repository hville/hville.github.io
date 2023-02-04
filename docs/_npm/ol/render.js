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

// ../node_modules/ol/render/VectorContext.js
var VectorContext = function() {
  function VectorContext2() {
  }
  VectorContext2.prototype.drawCustom = function(geometry, feature, renderer, hitDetectionRenderer) {
  };
  VectorContext2.prototype.drawGeometry = function(geometry) {
  };
  VectorContext2.prototype.setStyle = function(style) {
  };
  VectorContext2.prototype.drawCircle = function(circleGeometry, feature) {
  };
  VectorContext2.prototype.drawFeature = function(feature, style) {
  };
  VectorContext2.prototype.drawGeometryCollection = function(geometryCollectionGeometry, feature) {
  };
  VectorContext2.prototype.drawLineString = function(lineStringGeometry, feature) {
  };
  VectorContext2.prototype.drawMultiLineString = function(multiLineStringGeometry, feature) {
  };
  VectorContext2.prototype.drawMultiPoint = function(multiPointGeometry, feature) {
  };
  VectorContext2.prototype.drawMultiPolygon = function(multiPolygonGeometry, feature) {
  };
  VectorContext2.prototype.drawPoint = function(pointGeometry, feature) {
  };
  VectorContext2.prototype.drawPolygon = function(polygonGeometry, feature) {
  };
  VectorContext2.prototype.drawText = function(geometry, feature) {
  };
  VectorContext2.prototype.setFillStrokeStyle = function(fillStyle, strokeStyle) {
  };
  VectorContext2.prototype.setImageStyle = function(imageStyle, opt_declutterImageWithText) {
  };
  VectorContext2.prototype.setTextStyle = function(textStyle, opt_declutterImageWithText) {
  };
  return VectorContext2;
}();
var VectorContext_default = VectorContext;

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

// ../node_modules/ol/color.js
var HEX_COLOR_RE_ = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i;
var NAMED_COLOR_RE_ = /^([a-z]*)$|^hsla?\(.*\)$/i;
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

// ../node_modules/ol/colorlike.js
function asColorLike(color) {
  if (Array.isArray(color)) {
    return toString(color);
  } else {
    return color;
  }
}

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

// ../node_modules/ol/transform.js
var tmp_ = new Array(6);
function create() {
  return [1, 0, 0, 1, 0, 0];
}
function multiply(transform1, transform2) {
  var a1 = transform1[0];
  var b1 = transform1[1];
  var c1 = transform1[2];
  var d1 = transform1[3];
  var e1 = transform1[4];
  var f1 = transform1[5];
  var a2 = transform2[0];
  var b2 = transform2[1];
  var c2 = transform2[2];
  var d2 = transform2[3];
  var e2 = transform2[4];
  var f2 = transform2[5];
  transform1[0] = a1 * a2 + c1 * b2;
  transform1[1] = b1 * a2 + d1 * b2;
  transform1[2] = a1 * c2 + c1 * d2;
  transform1[3] = b1 * c2 + d1 * d2;
  transform1[4] = a1 * e2 + c1 * f2 + e1;
  transform1[5] = b1 * e2 + d1 * f2 + f1;
  return transform1;
}
function set(transform, a, b, c, d, e, f) {
  transform[0] = a;
  transform[1] = b;
  transform[2] = c;
  transform[3] = d;
  transform[4] = e;
  transform[5] = f;
  return transform;
}
function apply(transform, coordinate) {
  var x = coordinate[0];
  var y = coordinate[1];
  coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
  coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
  return coordinate;
}
function scale(transform, x, y) {
  return multiply(transform, set(tmp_, x, 0, 0, y, 0, 0));
}
function compose(transform, dx1, dy1, sx, sy, angle, dx2, dy2) {
  var sin = Math.sin(angle);
  var cos = Math.cos(angle);
  transform[0] = sx * cos;
  transform[1] = sy * sin;
  transform[2] = -sx * sin;
  transform[3] = sy * cos;
  transform[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
  transform[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
  return transform;
}

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

// ../node_modules/ol/css.js
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

// ../node_modules/ol/render/canvas.js
var defaultFont = "10px sans-serif";
var defaultFillStyle = "#000";
var defaultLineCap = "round";
var defaultLineDash = [];
var defaultLineDashOffset = 0;
var defaultLineJoin = "round";
var defaultMiterLimit = 10;
var defaultStrokeStyle = "#000";
var defaultTextAlign = "center";
var defaultTextBaseline = "middle";
var defaultLineWidth = 1;
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

// ../node_modules/ol/extent.js
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
function getCenter(extent) {
  return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
}
function getHeight(extent) {
  return extent[3] - extent[1];
}
function intersects(extent1, extent2) {
  return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
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

// ../node_modules/ol/geom/flat/transform.js
function transform2D(flatCoordinates, offset, end, stride, transform, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;
  for (var j = offset; j < end; j += stride) {
    var x = flatCoordinates[j];
    var y = flatCoordinates[j + 1];
    dest[i++] = transform[0] * x + transform[2] * y + transform[4];
    dest[i++] = transform[1] * x + transform[3] * y + transform[5];
  }
  if (opt_dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}
function rotate(flatCoordinates, offset, end, stride, angle, anchor, opt_dest) {
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
var RADIUS = 6378137;
var HALF_SIZE = Math.PI * RADIUS;
var EXTENT = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
var WORLD_EXTENT = [-180, -85, 180, 85];
var MAX_SAFE_Y = RADIUS * Math.log(Math.tan(Math.PI / 2));
var EPSG3857Projection = function(_super) {
  __extends5(EPSG3857Projection2, _super);
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
var RADIUS2 = 6378137;
var EXTENT2 = [-180, -90, 180, 90];
var METERS_PER_UNIT2 = Math.PI * RADIUS2 / 180;
var EPSG4326Projection = function(_super) {
  __extends6(EPSG4326Projection2, _super);
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
  var transform;
  if (sourceCode in transforms && destinationCode in transforms[sourceCode]) {
    transform = transforms[sourceCode][destinationCode];
  }
  return transform;
}

// ../node_modules/ol/proj.js
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
var userProjection = null;
function getUserProjection() {
  return userProjection;
}
function addCommon() {
  addEquivalentProjections(PROJECTIONS);
  addEquivalentProjections(PROJECTIONS2);
  addEquivalentTransforms(PROJECTIONS2, PROJECTIONS, fromEPSG4326, toEPSG4326);
}
addCommon();

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

// ../node_modules/ol/geom/GeometryLayout.js
var GeometryLayout_default = {
  XY: "XY",
  XYZ: "XYZ",
  XYM: "XYM",
  XYZM: "XYZM"
};

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
  SimpleGeometry2.prototype.setCoordinates = function(coordinates, opt_layout) {
    abstract();
  };
  SimpleGeometry2.prototype.setLayout = function(layout, coordinates, nesting) {
    var stride;
    if (layout) {
      stride = getStrideForLayout(layout);
    } else {
      for (var i = 0; i < nesting; ++i) {
        if (coordinates.length === 0) {
          this.layout = GeometryLayout_default.XY;
          this.stride = 2;
          return;
        } else {
          coordinates = coordinates[0];
        }
      }
      stride = coordinates.length;
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
      rotate(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
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
function transformGeom2D(simpleGeometry, transform, opt_dest) {
  var flatCoordinates = simpleGeometry.getFlatCoordinates();
  if (!flatCoordinates) {
    return null;
  } else {
    var stride = simpleGeometry.getStride();
    return transform2D(flatCoordinates, 0, flatCoordinates.length, stride, transform, opt_dest);
  }
}

// ../node_modules/ol/render/canvas/Immediate.js
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
var CanvasImmediateRenderer = function(_super) {
  __extends9(CanvasImmediateRenderer2, _super);
  function CanvasImmediateRenderer2(context, pixelRatio, extent, transform, viewRotation, opt_squaredTolerance, opt_userTransform) {
    var _this = _super.call(this) || this;
    _this.context_ = context;
    _this.pixelRatio_ = pixelRatio;
    _this.extent_ = extent;
    _this.transform_ = transform;
    _this.viewRotation_ = viewRotation;
    _this.squaredTolerance_ = opt_squaredTolerance;
    _this.userTransform_ = opt_userTransform;
    _this.contextFillState_ = null;
    _this.contextStrokeState_ = null;
    _this.contextTextState_ = null;
    _this.fillState_ = null;
    _this.strokeState_ = null;
    _this.image_ = null;
    _this.imageAnchorX_ = 0;
    _this.imageAnchorY_ = 0;
    _this.imageHeight_ = 0;
    _this.imageOpacity_ = 0;
    _this.imageOriginX_ = 0;
    _this.imageOriginY_ = 0;
    _this.imageRotateWithView_ = false;
    _this.imageRotation_ = 0;
    _this.imageScale_ = [0, 0];
    _this.imageWidth_ = 0;
    _this.text_ = "";
    _this.textOffsetX_ = 0;
    _this.textOffsetY_ = 0;
    _this.textRotateWithView_ = false;
    _this.textRotation_ = 0;
    _this.textScale_ = [0, 0];
    _this.textFillState_ = null;
    _this.textStrokeState_ = null;
    _this.textState_ = null;
    _this.pixelCoordinates_ = [];
    _this.tmpLocalTransform_ = create();
    return _this;
  }
  CanvasImmediateRenderer2.prototype.drawImages_ = function(flatCoordinates, offset, end, stride) {
    if (!this.image_) {
      return;
    }
    var pixelCoordinates = transform2D(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
    var context = this.context_;
    var localTransform = this.tmpLocalTransform_;
    var alpha = context.globalAlpha;
    if (this.imageOpacity_ != 1) {
      context.globalAlpha = alpha * this.imageOpacity_;
    }
    var rotation = this.imageRotation_;
    if (this.imageRotateWithView_) {
      rotation += this.viewRotation_;
    }
    for (var i = 0, ii = pixelCoordinates.length; i < ii; i += 2) {
      var x = pixelCoordinates[i] - this.imageAnchorX_;
      var y = pixelCoordinates[i + 1] - this.imageAnchorY_;
      if (rotation !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
        var centerX = x + this.imageAnchorX_;
        var centerY = y + this.imageAnchorY_;
        compose(localTransform, centerX, centerY, 1, 1, rotation, -centerX, -centerY);
        context.setTransform.apply(context, localTransform);
        context.translate(centerX, centerY);
        context.scale(this.imageScale_[0], this.imageScale_[1]);
        context.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, -this.imageAnchorX_, -this.imageAnchorY_, this.imageWidth_, this.imageHeight_);
        context.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        context.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, x, y, this.imageWidth_, this.imageHeight_);
      }
    }
    if (this.imageOpacity_ != 1) {
      context.globalAlpha = alpha;
    }
  };
  CanvasImmediateRenderer2.prototype.drawText_ = function(flatCoordinates, offset, end, stride) {
    if (!this.textState_ || this.text_ === "") {
      return;
    }
    if (this.textFillState_) {
      this.setContextFillState_(this.textFillState_);
    }
    if (this.textStrokeState_) {
      this.setContextStrokeState_(this.textStrokeState_);
    }
    this.setContextTextState_(this.textState_);
    var pixelCoordinates = transform2D(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
    var context = this.context_;
    var rotation = this.textRotation_;
    if (this.textRotateWithView_) {
      rotation += this.viewRotation_;
    }
    for (; offset < end; offset += stride) {
      var x = pixelCoordinates[offset] + this.textOffsetX_;
      var y = pixelCoordinates[offset + 1] + this.textOffsetY_;
      if (rotation !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1) {
        var localTransform = compose(this.tmpLocalTransform_, x, y, 1, 1, rotation, -x, -y);
        context.setTransform.apply(context, localTransform);
        context.translate(x, y);
        context.scale(this.textScale_[0], this.textScale_[1]);
        if (this.textStrokeState_) {
          context.strokeText(this.text_, 0, 0);
        }
        if (this.textFillState_) {
          context.fillText(this.text_, 0, 0);
        }
        context.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        if (this.textStrokeState_) {
          context.strokeText(this.text_, x, y);
        }
        if (this.textFillState_) {
          context.fillText(this.text_, x, y);
        }
      }
    }
  };
  CanvasImmediateRenderer2.prototype.moveToLineTo_ = function(flatCoordinates, offset, end, stride, close) {
    var context = this.context_;
    var pixelCoordinates = transform2D(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
    context.moveTo(pixelCoordinates[0], pixelCoordinates[1]);
    var length = pixelCoordinates.length;
    if (close) {
      length -= 2;
    }
    for (var i = 2; i < length; i += 2) {
      context.lineTo(pixelCoordinates[i], pixelCoordinates[i + 1]);
    }
    if (close) {
      context.closePath();
    }
    return end;
  };
  CanvasImmediateRenderer2.prototype.drawRings_ = function(flatCoordinates, offset, ends, stride) {
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      offset = this.moveToLineTo_(flatCoordinates, offset, ends[i], stride, true);
    }
    return offset;
  };
  CanvasImmediateRenderer2.prototype.drawCircle = function(geometry) {
    if (!intersects(this.extent_, geometry.getExtent())) {
      return;
    }
    if (this.fillState_ || this.strokeState_) {
      if (this.fillState_) {
        this.setContextFillState_(this.fillState_);
      }
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
      }
      var pixelCoordinates = transformGeom2D(geometry, this.transform_, this.pixelCoordinates_);
      var dx = pixelCoordinates[2] - pixelCoordinates[0];
      var dy = pixelCoordinates[3] - pixelCoordinates[1];
      var radius = Math.sqrt(dx * dx + dy * dy);
      var context = this.context_;
      context.beginPath();
      context.arc(pixelCoordinates[0], pixelCoordinates[1], radius, 0, 2 * Math.PI);
      if (this.fillState_) {
        context.fill();
      }
      if (this.strokeState_) {
        context.stroke();
      }
    }
    if (this.text_ !== "") {
      this.drawText_(geometry.getCenter(), 0, 2, 2);
    }
  };
  CanvasImmediateRenderer2.prototype.setStyle = function(style) {
    this.setFillStrokeStyle(style.getFill(), style.getStroke());
    this.setImageStyle(style.getImage());
    this.setTextStyle(style.getText());
  };
  CanvasImmediateRenderer2.prototype.setTransform = function(transform) {
    this.transform_ = transform;
  };
  CanvasImmediateRenderer2.prototype.drawGeometry = function(geometry) {
    var type = geometry.getType();
    switch (type) {
      case GeometryType_default.POINT:
        this.drawPoint(geometry);
        break;
      case GeometryType_default.LINE_STRING:
        this.drawLineString(geometry);
        break;
      case GeometryType_default.POLYGON:
        this.drawPolygon(geometry);
        break;
      case GeometryType_default.MULTI_POINT:
        this.drawMultiPoint(geometry);
        break;
      case GeometryType_default.MULTI_LINE_STRING:
        this.drawMultiLineString(geometry);
        break;
      case GeometryType_default.MULTI_POLYGON:
        this.drawMultiPolygon(geometry);
        break;
      case GeometryType_default.GEOMETRY_COLLECTION:
        this.drawGeometryCollection(geometry);
        break;
      case GeometryType_default.CIRCLE:
        this.drawCircle(geometry);
        break;
      default:
    }
  };
  CanvasImmediateRenderer2.prototype.drawFeature = function(feature, style) {
    var geometry = style.getGeometryFunction()(feature);
    if (!geometry || !intersects(this.extent_, geometry.getExtent())) {
      return;
    }
    this.setStyle(style);
    this.drawGeometry(geometry);
  };
  CanvasImmediateRenderer2.prototype.drawGeometryCollection = function(geometry) {
    var geometries = geometry.getGeometriesArray();
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      this.drawGeometry(geometries[i]);
    }
  };
  CanvasImmediateRenderer2.prototype.drawPoint = function(geometry) {
    if (this.squaredTolerance_) {
      geometry = geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
    }
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    if (this.image_) {
      this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
    if (this.text_ !== "") {
      this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
  };
  CanvasImmediateRenderer2.prototype.drawMultiPoint = function(geometry) {
    if (this.squaredTolerance_) {
      geometry = geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
    }
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    if (this.image_) {
      this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
    if (this.text_ !== "") {
      this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
  };
  CanvasImmediateRenderer2.prototype.drawLineString = function(geometry) {
    if (this.squaredTolerance_) {
      geometry = geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
    }
    if (!intersects(this.extent_, geometry.getExtent())) {
      return;
    }
    if (this.strokeState_) {
      this.setContextStrokeState_(this.strokeState_);
      var context = this.context_;
      var flatCoordinates = geometry.getFlatCoordinates();
      context.beginPath();
      this.moveToLineTo_(flatCoordinates, 0, flatCoordinates.length, geometry.getStride(), false);
      context.stroke();
    }
    if (this.text_ !== "") {
      var flatMidpoint = geometry.getFlatMidpoint();
      this.drawText_(flatMidpoint, 0, 2, 2);
    }
  };
  CanvasImmediateRenderer2.prototype.drawMultiLineString = function(geometry) {
    if (this.squaredTolerance_) {
      geometry = geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
    }
    var geometryExtent = geometry.getExtent();
    if (!intersects(this.extent_, geometryExtent)) {
      return;
    }
    if (this.strokeState_) {
      this.setContextStrokeState_(this.strokeState_);
      var context = this.context_;
      var flatCoordinates = geometry.getFlatCoordinates();
      var offset = 0;
      var ends = geometry.getEnds();
      var stride = geometry.getStride();
      context.beginPath();
      for (var i = 0, ii = ends.length; i < ii; ++i) {
        offset = this.moveToLineTo_(flatCoordinates, offset, ends[i], stride, false);
      }
      context.stroke();
    }
    if (this.text_ !== "") {
      var flatMidpoints = geometry.getFlatMidpoints();
      this.drawText_(flatMidpoints, 0, flatMidpoints.length, 2);
    }
  };
  CanvasImmediateRenderer2.prototype.drawPolygon = function(geometry) {
    if (this.squaredTolerance_) {
      geometry = geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
    }
    if (!intersects(this.extent_, geometry.getExtent())) {
      return;
    }
    if (this.strokeState_ || this.fillState_) {
      if (this.fillState_) {
        this.setContextFillState_(this.fillState_);
      }
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
      }
      var context = this.context_;
      context.beginPath();
      this.drawRings_(geometry.getOrientedFlatCoordinates(), 0, geometry.getEnds(), geometry.getStride());
      if (this.fillState_) {
        context.fill();
      }
      if (this.strokeState_) {
        context.stroke();
      }
    }
    if (this.text_ !== "") {
      var flatInteriorPoint = geometry.getFlatInteriorPoint();
      this.drawText_(flatInteriorPoint, 0, 2, 2);
    }
  };
  CanvasImmediateRenderer2.prototype.drawMultiPolygon = function(geometry) {
    if (this.squaredTolerance_) {
      geometry = geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
    }
    if (!intersects(this.extent_, geometry.getExtent())) {
      return;
    }
    if (this.strokeState_ || this.fillState_) {
      if (this.fillState_) {
        this.setContextFillState_(this.fillState_);
      }
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
      }
      var context = this.context_;
      var flatCoordinates = geometry.getOrientedFlatCoordinates();
      var offset = 0;
      var endss = geometry.getEndss();
      var stride = geometry.getStride();
      context.beginPath();
      for (var i = 0, ii = endss.length; i < ii; ++i) {
        var ends = endss[i];
        offset = this.drawRings_(flatCoordinates, offset, ends, stride);
      }
      if (this.fillState_) {
        context.fill();
      }
      if (this.strokeState_) {
        context.stroke();
      }
    }
    if (this.text_ !== "") {
      var flatInteriorPoints = geometry.getFlatInteriorPoints();
      this.drawText_(flatInteriorPoints, 0, flatInteriorPoints.length, 2);
    }
  };
  CanvasImmediateRenderer2.prototype.setContextFillState_ = function(fillState) {
    var context = this.context_;
    var contextFillState = this.contextFillState_;
    if (!contextFillState) {
      context.fillStyle = fillState.fillStyle;
      this.contextFillState_ = {
        fillStyle: fillState.fillStyle
      };
    } else {
      if (contextFillState.fillStyle != fillState.fillStyle) {
        contextFillState.fillStyle = fillState.fillStyle;
        context.fillStyle = fillState.fillStyle;
      }
    }
  };
  CanvasImmediateRenderer2.prototype.setContextStrokeState_ = function(strokeState) {
    var context = this.context_;
    var contextStrokeState = this.contextStrokeState_;
    if (!contextStrokeState) {
      context.lineCap = strokeState.lineCap;
      if (context.setLineDash) {
        context.setLineDash(strokeState.lineDash);
        context.lineDashOffset = strokeState.lineDashOffset;
      }
      context.lineJoin = strokeState.lineJoin;
      context.lineWidth = strokeState.lineWidth;
      context.miterLimit = strokeState.miterLimit;
      context.strokeStyle = strokeState.strokeStyle;
      this.contextStrokeState_ = {
        lineCap: strokeState.lineCap,
        lineDash: strokeState.lineDash,
        lineDashOffset: strokeState.lineDashOffset,
        lineJoin: strokeState.lineJoin,
        lineWidth: strokeState.lineWidth,
        miterLimit: strokeState.miterLimit,
        strokeStyle: strokeState.strokeStyle
      };
    } else {
      if (contextStrokeState.lineCap != strokeState.lineCap) {
        contextStrokeState.lineCap = strokeState.lineCap;
        context.lineCap = strokeState.lineCap;
      }
      if (context.setLineDash) {
        if (!equals(contextStrokeState.lineDash, strokeState.lineDash)) {
          context.setLineDash(contextStrokeState.lineDash = strokeState.lineDash);
        }
        if (contextStrokeState.lineDashOffset != strokeState.lineDashOffset) {
          contextStrokeState.lineDashOffset = strokeState.lineDashOffset;
          context.lineDashOffset = strokeState.lineDashOffset;
        }
      }
      if (contextStrokeState.lineJoin != strokeState.lineJoin) {
        contextStrokeState.lineJoin = strokeState.lineJoin;
        context.lineJoin = strokeState.lineJoin;
      }
      if (contextStrokeState.lineWidth != strokeState.lineWidth) {
        contextStrokeState.lineWidth = strokeState.lineWidth;
        context.lineWidth = strokeState.lineWidth;
      }
      if (contextStrokeState.miterLimit != strokeState.miterLimit) {
        contextStrokeState.miterLimit = strokeState.miterLimit;
        context.miterLimit = strokeState.miterLimit;
      }
      if (contextStrokeState.strokeStyle != strokeState.strokeStyle) {
        contextStrokeState.strokeStyle = strokeState.strokeStyle;
        context.strokeStyle = strokeState.strokeStyle;
      }
    }
  };
  CanvasImmediateRenderer2.prototype.setContextTextState_ = function(textState) {
    var context = this.context_;
    var contextTextState = this.contextTextState_;
    var textAlign = textState.textAlign ? textState.textAlign : defaultTextAlign;
    if (!contextTextState) {
      context.font = textState.font;
      context.textAlign = textAlign;
      context.textBaseline = textState.textBaseline;
      this.contextTextState_ = {
        font: textState.font,
        textAlign,
        textBaseline: textState.textBaseline
      };
    } else {
      if (contextTextState.font != textState.font) {
        contextTextState.font = textState.font;
        context.font = textState.font;
      }
      if (contextTextState.textAlign != textAlign) {
        contextTextState.textAlign = textAlign;
        context.textAlign = textAlign;
      }
      if (contextTextState.textBaseline != textState.textBaseline) {
        contextTextState.textBaseline = textState.textBaseline;
        context.textBaseline = textState.textBaseline;
      }
    }
  };
  CanvasImmediateRenderer2.prototype.setFillStrokeStyle = function(fillStyle, strokeStyle) {
    var _this = this;
    if (!fillStyle) {
      this.fillState_ = null;
    } else {
      var fillStyleColor = fillStyle.getColor();
      this.fillState_ = {
        fillStyle: asColorLike(fillStyleColor ? fillStyleColor : defaultFillStyle)
      };
    }
    if (!strokeStyle) {
      this.strokeState_ = null;
    } else {
      var strokeStyleColor = strokeStyle.getColor();
      var strokeStyleLineCap = strokeStyle.getLineCap();
      var strokeStyleLineDash = strokeStyle.getLineDash();
      var strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
      var strokeStyleLineJoin = strokeStyle.getLineJoin();
      var strokeStyleWidth = strokeStyle.getWidth();
      var strokeStyleMiterLimit = strokeStyle.getMiterLimit();
      var lineDash = strokeStyleLineDash ? strokeStyleLineDash : defaultLineDash;
      this.strokeState_ = {
        lineCap: strokeStyleLineCap !== void 0 ? strokeStyleLineCap : defaultLineCap,
        lineDash: this.pixelRatio_ === 1 ? lineDash : lineDash.map(function(n) {
          return n * _this.pixelRatio_;
        }),
        lineDashOffset: (strokeStyleLineDashOffset ? strokeStyleLineDashOffset : defaultLineDashOffset) * this.pixelRatio_,
        lineJoin: strokeStyleLineJoin !== void 0 ? strokeStyleLineJoin : defaultLineJoin,
        lineWidth: (strokeStyleWidth !== void 0 ? strokeStyleWidth : defaultLineWidth) * this.pixelRatio_,
        miterLimit: strokeStyleMiterLimit !== void 0 ? strokeStyleMiterLimit : defaultMiterLimit,
        strokeStyle: asColorLike(strokeStyleColor ? strokeStyleColor : defaultStrokeStyle)
      };
    }
  };
  CanvasImmediateRenderer2.prototype.setImageStyle = function(imageStyle) {
    var imageSize;
    if (!imageStyle || !(imageSize = imageStyle.getSize())) {
      this.image_ = null;
      return;
    }
    var imageAnchor = imageStyle.getAnchor();
    var imageOrigin = imageStyle.getOrigin();
    this.image_ = imageStyle.getImage(this.pixelRatio_);
    this.imageAnchorX_ = imageAnchor[0] * this.pixelRatio_;
    this.imageAnchorY_ = imageAnchor[1] * this.pixelRatio_;
    this.imageHeight_ = imageSize[1] * this.pixelRatio_;
    this.imageOpacity_ = imageStyle.getOpacity();
    this.imageOriginX_ = imageOrigin[0];
    this.imageOriginY_ = imageOrigin[1];
    this.imageRotateWithView_ = imageStyle.getRotateWithView();
    this.imageRotation_ = imageStyle.getRotation();
    this.imageScale_ = imageStyle.getScaleArray();
    this.imageWidth_ = imageSize[0] * this.pixelRatio_;
  };
  CanvasImmediateRenderer2.prototype.setTextStyle = function(textStyle) {
    if (!textStyle) {
      this.text_ = "";
    } else {
      var textFillStyle = textStyle.getFill();
      if (!textFillStyle) {
        this.textFillState_ = null;
      } else {
        var textFillStyleColor = textFillStyle.getColor();
        this.textFillState_ = {
          fillStyle: asColorLike(textFillStyleColor ? textFillStyleColor : defaultFillStyle)
        };
      }
      var textStrokeStyle = textStyle.getStroke();
      if (!textStrokeStyle) {
        this.textStrokeState_ = null;
      } else {
        var textStrokeStyleColor = textStrokeStyle.getColor();
        var textStrokeStyleLineCap = textStrokeStyle.getLineCap();
        var textStrokeStyleLineDash = textStrokeStyle.getLineDash();
        var textStrokeStyleLineDashOffset = textStrokeStyle.getLineDashOffset();
        var textStrokeStyleLineJoin = textStrokeStyle.getLineJoin();
        var textStrokeStyleWidth = textStrokeStyle.getWidth();
        var textStrokeStyleMiterLimit = textStrokeStyle.getMiterLimit();
        this.textStrokeState_ = {
          lineCap: textStrokeStyleLineCap !== void 0 ? textStrokeStyleLineCap : defaultLineCap,
          lineDash: textStrokeStyleLineDash ? textStrokeStyleLineDash : defaultLineDash,
          lineDashOffset: textStrokeStyleLineDashOffset ? textStrokeStyleLineDashOffset : defaultLineDashOffset,
          lineJoin: textStrokeStyleLineJoin !== void 0 ? textStrokeStyleLineJoin : defaultLineJoin,
          lineWidth: textStrokeStyleWidth !== void 0 ? textStrokeStyleWidth : defaultLineWidth,
          miterLimit: textStrokeStyleMiterLimit !== void 0 ? textStrokeStyleMiterLimit : defaultMiterLimit,
          strokeStyle: asColorLike(textStrokeStyleColor ? textStrokeStyleColor : defaultStrokeStyle)
        };
      }
      var textFont = textStyle.getFont();
      var textOffsetX = textStyle.getOffsetX();
      var textOffsetY = textStyle.getOffsetY();
      var textRotateWithView = textStyle.getRotateWithView();
      var textRotation = textStyle.getRotation();
      var textScale = textStyle.getScaleArray();
      var textText = textStyle.getText();
      var textTextAlign = textStyle.getTextAlign();
      var textTextBaseline = textStyle.getTextBaseline();
      this.textState_ = {
        font: textFont !== void 0 ? textFont : defaultFont,
        textAlign: textTextAlign !== void 0 ? textTextAlign : defaultTextAlign,
        textBaseline: textTextBaseline !== void 0 ? textTextBaseline : defaultTextBaseline
      };
      this.text_ = textText !== void 0 ? Array.isArray(textText) ? textText.reduce(function(acc, t, i) {
        return acc += i % 2 ? " " : t;
      }, "") : textText : "";
      this.textOffsetX_ = textOffsetX !== void 0 ? this.pixelRatio_ * textOffsetX : 0;
      this.textOffsetY_ = textOffsetY !== void 0 ? this.pixelRatio_ * textOffsetY : 0;
      this.textRotateWithView_ = textRotateWithView !== void 0 ? textRotateWithView : false;
      this.textRotation_ = textRotation !== void 0 ? textRotation : 0;
      this.textScale_ = [
        this.pixelRatio_ * textScale[0],
        this.pixelRatio_ * textScale[1]
      ];
    }
  };
  return CanvasImmediateRenderer2;
}(VectorContext_default);
var Immediate_default = CanvasImmediateRenderer;

// ../node_modules/ol/renderer/vector.js
var SIMPLIFY_TOLERANCE = 0.5;
function getSquaredTolerance(resolution, pixelRatio) {
  var tolerance = getTolerance(resolution, pixelRatio);
  return tolerance * tolerance;
}
function getTolerance(resolution, pixelRatio) {
  return SIMPLIFY_TOLERANCE * resolution / pixelRatio;
}

// ../node_modules/ol/render.js
function toContext(context, opt_options) {
  var canvas = context.canvas;
  var options = opt_options ? opt_options : {};
  var pixelRatio = options.pixelRatio || DEVICE_PIXEL_RATIO;
  var size = options.size;
  if (size) {
    canvas.width = size[0] * pixelRatio;
    canvas.height = size[1] * pixelRatio;
    canvas.style.width = size[0] + "px";
    canvas.style.height = size[1] + "px";
  }
  var extent = [0, 0, canvas.width, canvas.height];
  var transform = scale(create(), pixelRatio, pixelRatio);
  return new Immediate_default(context, pixelRatio, extent, transform, 0);
}
function getVectorContext(event) {
  if (!(event.context instanceof CanvasRenderingContext2D)) {
    throw new Error("Only works for render events from Canvas 2D layers");
  }
  var canvasPixelRatio = event.inversePixelTransform[0];
  var frameState = event.frameState;
  var transform = multiply(event.inversePixelTransform.slice(), frameState.coordinateToPixelTransform);
  var squaredTolerance = getSquaredTolerance(frameState.viewState.resolution, canvasPixelRatio);
  var userTransform;
  var userProjection2 = getUserProjection();
  if (userProjection2) {
    userTransform = getTransformFromProjections(userProjection2, frameState.viewState.projection);
  }
  return new Immediate_default(event.context, canvasPixelRatio, frameState.extent, transform, frameState.viewState.rotation, squaredTolerance, userTransform);
}
function getRenderPixel(event, pixel) {
  return apply(event.inversePixelTransform, pixel.slice(0));
}
export {
  getRenderPixel,
  getVectorContext,
  toContext
};
