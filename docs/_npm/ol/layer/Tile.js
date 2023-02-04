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

// ../node_modules/ol/AssertionError.js
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
var AssertionError = function(_super) {
  __extends4(AssertionError2, _super);
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
function solveLinearSystem(mat) {
  var n = mat.length;
  for (var i = 0; i < n; i++) {
    var maxRow = i;
    var maxEl = Math.abs(mat[i][i]);
    for (var r = i + 1; r < n; r++) {
      var absValue = Math.abs(mat[r][i]);
      if (absValue > maxEl) {
        maxEl = absValue;
        maxRow = r;
      }
    }
    if (maxEl === 0) {
      return null;
    }
    var tmp = mat[maxRow];
    mat[maxRow] = mat[i];
    mat[i] = tmp;
    for (var j = i + 1; j < n; j++) {
      var coef = -mat[j][i] / mat[i][i];
      for (var k = i; k < n + 1; k++) {
        if (i == k) {
          mat[j][k] = 0;
        } else {
          mat[j][k] += coef * mat[i][k];
        }
      }
    }
  }
  var x = new Array(n);
  for (var l = n - 1; l >= 0; l--) {
    x[l] = mat[l][n] / mat[l][l];
    for (var m = l - 1; m >= 0; m--) {
      mat[m][n] -= mat[m][l] * x[l];
    }
  }
  return x;
}
function toRadians(angleInDegrees) {
  return angleInDegrees * Math.PI / 180;
}
function modulo(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r;
}

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
var Layer_default = Layer;

// ../node_modules/ol/layer/TileProperty.js
var TileProperty_default = {
  PRELOAD: "preload",
  USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError"
};

// ../node_modules/ol/layer/BaseTile.js
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
var BaseTileLayer = function(_super) {
  __extends7(BaseTileLayer2, _super);
  function BaseTileLayer2(opt_options) {
    var _this = this;
    var options = opt_options ? opt_options : {};
    var baseOptions = assign({}, options);
    delete baseOptions.preload;
    delete baseOptions.useInterimTilesOnError;
    _this = _super.call(this, baseOptions) || this;
    _this.on;
    _this.once;
    _this.un;
    _this.setPreload(options.preload !== void 0 ? options.preload : 0);
    _this.setUseInterimTilesOnError(options.useInterimTilesOnError !== void 0 ? options.useInterimTilesOnError : true);
    return _this;
  }
  BaseTileLayer2.prototype.getPreload = function() {
    return this.get(TileProperty_default.PRELOAD);
  };
  BaseTileLayer2.prototype.setPreload = function(preload) {
    this.set(TileProperty_default.PRELOAD, preload);
  };
  BaseTileLayer2.prototype.getUseInterimTilesOnError = function() {
    return this.get(TileProperty_default.USE_INTERIM_TILES_ON_ERROR);
  };
  BaseTileLayer2.prototype.setUseInterimTilesOnError = function(useInterimTilesOnError) {
    this.set(TileProperty_default.USE_INTERIM_TILES_ON_ERROR, useInterimTilesOnError);
  };
  BaseTileLayer2.prototype.getData = function(pixel) {
    return _super.prototype.getData.call(this, pixel);
  };
  return BaseTileLayer2;
}(Layer_default);
var BaseTile_default = BaseTileLayer;

// ../node_modules/ol/ImageState.js
var ImageState_default = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};

// ../node_modules/ol/renderer/Layer.js
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
var LayerRenderer = function(_super) {
  __extends8(LayerRenderer2, _super);
  function LayerRenderer2(layer) {
    var _this = _super.call(this) || this;
    _this.ready = true;
    _this.boundHandleImageChange_ = _this.handleImageChange_.bind(_this);
    _this.layer_ = layer;
    _this.declutterExecutorGroup = null;
    return _this;
  }
  LayerRenderer2.prototype.getFeatures = function(pixel) {
    return abstract();
  };
  LayerRenderer2.prototype.getData = function(pixel) {
    return null;
  };
  LayerRenderer2.prototype.prepareFrame = function(frameState) {
    return abstract();
  };
  LayerRenderer2.prototype.renderFrame = function(frameState, target) {
    return abstract();
  };
  LayerRenderer2.prototype.loadedTileCallback = function(tiles, zoom, tile) {
    if (!tiles[zoom]) {
      tiles[zoom] = {};
    }
    tiles[zoom][tile.tileCoord.toString()] = tile;
    return void 0;
  };
  LayerRenderer2.prototype.createLoadedTileFinder = function(source, projection, tiles) {
    return function(zoom, tileRange) {
      var callback = this.loadedTileCallback.bind(this, tiles, zoom);
      return source.forEachLoadedTile(projection, zoom, tileRange, callback);
    }.bind(this);
  };
  LayerRenderer2.prototype.forEachFeatureAtCoordinate = function(coordinate, frameState, hitTolerance, callback, matches) {
    return void 0;
  };
  LayerRenderer2.prototype.getDataAtPixel = function(pixel, frameState, hitTolerance) {
    return null;
  };
  LayerRenderer2.prototype.getLayer = function() {
    return this.layer_;
  };
  LayerRenderer2.prototype.handleFontsChanged = function() {
  };
  LayerRenderer2.prototype.handleImageChange_ = function(event) {
    var image = event.target;
    if (image.getState() === ImageState_default.LOADED) {
      this.renderIfReadyAndVisible();
    }
  };
  LayerRenderer2.prototype.loadImage = function(image) {
    var imageState = image.getState();
    if (imageState != ImageState_default.LOADED && imageState != ImageState_default.ERROR) {
      image.addEventListener(EventType_default.CHANGE, this.boundHandleImageChange_);
    }
    if (imageState == ImageState_default.IDLE) {
      image.load();
      imageState = image.getState();
    }
    return imageState == ImageState_default.LOADED;
  };
  LayerRenderer2.prototype.renderIfReadyAndVisible = function() {
    var layer = this.getLayer();
    if (layer.getVisible() && layer.getSourceState() == State_default.READY) {
      layer.changed();
    }
  };
  LayerRenderer2.prototype.disposeInternal = function() {
    delete this.layer_;
    _super.prototype.disposeInternal.call(this);
  };
  return LayerRenderer2;
}(Observable_default);
var Layer_default2 = LayerRenderer;

// ../node_modules/ol/render/Event.js
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
var RenderEvent = function(_super) {
  __extends9(RenderEvent2, _super);
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

// ../node_modules/ol/has.js
var ua = typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined" ? navigator.userAgent.toLowerCase() : "";
var FIREFOX = ua.indexOf("firefox") !== -1;
var SAFARI = ua.indexOf("safari") !== -1 && ua.indexOf("chrom") == -1;
var SAFARI_BUG_237906 = SAFARI && !!(ua.indexOf("version/15.4") >= 0 || ua.match(/cpu (os|iphone os) 15_4 like mac os x/));
var WEBKIT = ua.indexOf("webkit") !== -1 && ua.indexOf("edge") == -1;
var MAC = ua.indexOf("macintosh") !== -1;
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
var transformStringDiv;
function toString(mat) {
  var transformString = "matrix(" + mat.join(", ") + ")";
  if (WORKER_OFFSCREEN_CANVAS) {
    return transformString;
  }
  var node = transformStringDiv || (transformStringDiv = document.createElement("div"));
  node.style.transform = transformString;
  return node.style.transform;
}

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
function asArray(color) {
  if (Array.isArray(color)) {
    return color;
  } else {
    return fromString(color);
  }
}
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

// ../node_modules/ol/extent.js
function boundingExtent(coordinates) {
  var extent = createEmpty();
  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    extendCoordinate(extent, coordinates[i]);
  }
  return extent;
}
function _boundingExtentXYs(xs, ys, opt_extent) {
  var minX = Math.min.apply(null, xs);
  var minY = Math.min.apply(null, ys);
  var maxX = Math.max.apply(null, xs);
  var maxY = Math.max.apply(null, ys);
  return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
}
function containsCoordinate(extent, coordinate) {
  return containsXY(extent, coordinate[0], coordinate[1]);
}
function containsXY(extent, x, y) {
  return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
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
function equals2(extent1, extent2) {
  return extent1[0] == extent2[0] && extent1[2] == extent2[2] && extent1[1] == extent2[1] && extent1[3] == extent2[3];
}
function extend(extent1, extent2) {
  if (extent2[0] < extent1[0]) {
    extent1[0] = extent2[0];
  }
  if (extent2[2] > extent1[2]) {
    extent1[2] = extent2[2];
  }
  if (extent2[1] < extent1[1]) {
    extent1[1] = extent2[1];
  }
  if (extent2[3] > extent1[3]) {
    extent1[3] = extent2[3];
  }
  return extent1;
}
function extendCoordinate(extent, coordinate) {
  if (coordinate[0] < extent[0]) {
    extent[0] = coordinate[0];
  }
  if (coordinate[0] > extent[2]) {
    extent[2] = coordinate[0];
  }
  if (coordinate[1] < extent[1]) {
    extent[1] = coordinate[1];
  }
  if (coordinate[1] > extent[3]) {
    extent[3] = coordinate[1];
  }
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
function getArea(extent) {
  var area = 0;
  if (!isEmpty2(extent)) {
    area = getWidth(extent) * getHeight(extent);
  }
  return area;
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
function isEmpty2(extent) {
  return extent[2] < extent[0] || extent[3] < extent[1];
}
function applyTransform(extent, transformFn, opt_extent, opt_stops) {
  var coordinates = [];
  if (opt_stops > 1) {
    var width = extent[2] - extent[0];
    var height = extent[3] - extent[1];
    for (var i = 0; i < opt_stops; ++i) {
      coordinates.push(extent[0] + width * i / opt_stops, extent[1], extent[2], extent[1] + height * i / opt_stops, extent[2] - width * i / opt_stops, extent[3], extent[0], extent[3] - height * i / opt_stops);
    }
  } else {
    coordinates = [
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
  transformFn(coordinates, coordinates, 2);
  var xs = [];
  var ys = [];
  for (var i = 0, l = coordinates.length; i < l; i += 2) {
    xs.push(coordinates[i]);
    ys.push(coordinates[i + 1]);
  }
  return _boundingExtentXYs(xs, ys, opt_extent);
}

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

// ../node_modules/ol/renderer/canvas/Layer.js
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
var pixelContext = null;
function createPixelContext() {
  var canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  pixelContext = canvas.getContext("2d");
}
var CanvasLayerRenderer = function(_super) {
  __extends10(CanvasLayerRenderer2, _super);
  function CanvasLayerRenderer2(layer) {
    var _this = _super.call(this, layer) || this;
    _this.container = null;
    _this.renderedResolution;
    _this.tempTransform = create();
    _this.pixelTransform = create();
    _this.inversePixelTransform = create();
    _this.context = null;
    _this.containerReused = false;
    _this.pixelContext_ = null;
    _this.frameState = null;
    return _this;
  }
  CanvasLayerRenderer2.prototype.getImageData = function(image, col, row) {
    if (!pixelContext) {
      createPixelContext();
    }
    pixelContext.clearRect(0, 0, 1, 1);
    var data;
    try {
      pixelContext.drawImage(image, col, row, 1, 1, 0, 0, 1, 1);
      data = pixelContext.getImageData(0, 0, 1, 1).data;
    } catch (err) {
      return null;
    }
    return data;
  };
  CanvasLayerRenderer2.prototype.getBackground = function(frameState) {
    var layer = this.getLayer();
    var background = layer.getBackground();
    if (typeof background === "function") {
      background = background(frameState.viewState.resolution);
    }
    return background || void 0;
  };
  CanvasLayerRenderer2.prototype.useContainer = function(target, transform2, opacity, opt_backgroundColor) {
    var layerClassName = this.getLayer().getClassName();
    var container, context;
    if (target && target.className === layerClassName && target.style.opacity === "" && opacity === 1 && (!opt_backgroundColor || target.style.backgroundColor && equals(asArray(target.style.backgroundColor), asArray(opt_backgroundColor)))) {
      var canvas = target.firstElementChild;
      if (canvas instanceof HTMLCanvasElement) {
        context = canvas.getContext("2d");
      }
    }
    if (context && context.canvas.style.transform === transform2) {
      this.container = target;
      this.context = context;
      this.containerReused = true;
    } else if (this.containerReused) {
      this.container = null;
      this.context = null;
      this.containerReused = false;
    }
    if (!this.container) {
      container = document.createElement("div");
      container.className = layerClassName;
      var style = container.style;
      style.position = "absolute";
      style.width = "100%";
      style.height = "100%";
      if (opt_backgroundColor) {
        style.backgroundColor = opt_backgroundColor;
      }
      context = createCanvasContext2D();
      var canvas = context.canvas;
      container.appendChild(canvas);
      style = canvas.style;
      style.position = "absolute";
      style.left = "0";
      style.transformOrigin = "top left";
      this.container = container;
      this.context = context;
    }
  };
  CanvasLayerRenderer2.prototype.clipUnrotated = function(context, frameState, extent) {
    var topLeft = getTopLeft(extent);
    var topRight = getTopRight(extent);
    var bottomRight = getBottomRight(extent);
    var bottomLeft = getBottomLeft(extent);
    apply(frameState.coordinateToPixelTransform, topLeft);
    apply(frameState.coordinateToPixelTransform, topRight);
    apply(frameState.coordinateToPixelTransform, bottomRight);
    apply(frameState.coordinateToPixelTransform, bottomLeft);
    var inverted = this.inversePixelTransform;
    apply(inverted, topLeft);
    apply(inverted, topRight);
    apply(inverted, bottomRight);
    apply(inverted, bottomLeft);
    context.save();
    context.beginPath();
    context.moveTo(Math.round(topLeft[0]), Math.round(topLeft[1]));
    context.lineTo(Math.round(topRight[0]), Math.round(topRight[1]));
    context.lineTo(Math.round(bottomRight[0]), Math.round(bottomRight[1]));
    context.lineTo(Math.round(bottomLeft[0]), Math.round(bottomLeft[1]));
    context.clip();
  };
  CanvasLayerRenderer2.prototype.dispatchRenderEvent_ = function(type, context, frameState) {
    var layer = this.getLayer();
    if (layer.hasListener(type)) {
      var event_1 = new Event_default2(type, this.inversePixelTransform, frameState, context);
      layer.dispatchEvent(event_1);
    }
  };
  CanvasLayerRenderer2.prototype.preRender = function(context, frameState) {
    this.frameState = frameState;
    this.dispatchRenderEvent_(EventType_default2.PRERENDER, context, frameState);
  };
  CanvasLayerRenderer2.prototype.postRender = function(context, frameState) {
    this.dispatchRenderEvent_(EventType_default2.POSTRENDER, context, frameState);
  };
  CanvasLayerRenderer2.prototype.getRenderTransform = function(center, resolution, rotation, pixelRatio, width, height, offsetX) {
    var dx1 = width / 2;
    var dy1 = height / 2;
    var sx = pixelRatio / resolution;
    var sy = -sx;
    var dx2 = -center[0] + offsetX;
    var dy2 = -center[1];
    return compose(this.tempTransform, dx1, dy1, sx, sy, -rotation, dx2, dy2);
  };
  CanvasLayerRenderer2.prototype.getDataAtPixel = function(pixel, frameState, hitTolerance) {
    var renderPixel = apply(this.inversePixelTransform, pixel.slice());
    var context = this.context;
    var layer = this.getLayer();
    var layerExtent = layer.getExtent();
    if (layerExtent) {
      var renderCoordinate = apply(frameState.pixelToCoordinateTransform, pixel.slice());
      if (!containsCoordinate(layerExtent, renderCoordinate)) {
        return null;
      }
    }
    var x = Math.round(renderPixel[0]);
    var y = Math.round(renderPixel[1]);
    var pixelContext2 = this.pixelContext_;
    if (!pixelContext2) {
      var pixelCanvas = document.createElement("canvas");
      pixelCanvas.width = 1;
      pixelCanvas.height = 1;
      pixelContext2 = pixelCanvas.getContext("2d");
      this.pixelContext_ = pixelContext2;
    }
    pixelContext2.clearRect(0, 0, 1, 1);
    var data;
    try {
      pixelContext2.drawImage(context.canvas, x, y, 1, 1, 0, 0, 1, 1);
      data = pixelContext2.getImageData(0, 0, 1, 1).data;
    } catch (err) {
      if (err.name === "SecurityError") {
        this.pixelContext_ = null;
        return new Uint8Array();
      }
      return data;
    }
    if (data[3] === 0) {
      return null;
    }
    return data;
  };
  CanvasLayerRenderer2.prototype.disposeInternal = function() {
    delete this.frameState;
    _super.prototype.disposeInternal.call(this);
  };
  return CanvasLayerRenderer2;
}(Layer_default2);
var Layer_default3 = CanvasLayerRenderer;

// ../node_modules/ol/TileState.js
var TileState_default = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};

// ../node_modules/ol/easing.js
function easeIn(t) {
  return Math.pow(t, 3);
}

// ../node_modules/ol/Tile.js
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
var Tile = function(_super) {
  __extends11(Tile2, _super);
  function Tile2(tileCoord, state, opt_options) {
    var _this = _super.call(this) || this;
    var options = opt_options ? opt_options : {};
    _this.tileCoord = tileCoord;
    _this.state = state;
    _this.interimTile = null;
    _this.key = "";
    _this.transition_ = options.transition === void 0 ? 250 : options.transition;
    _this.transitionStarts_ = {};
    _this.interpolate = !!options.interpolate;
    return _this;
  }
  Tile2.prototype.changed = function() {
    this.dispatchEvent(EventType_default.CHANGE);
  };
  Tile2.prototype.release = function() {
  };
  Tile2.prototype.getKey = function() {
    return this.key + "/" + this.tileCoord;
  };
  Tile2.prototype.getInterimTile = function() {
    if (!this.interimTile) {
      return this;
    }
    var tile = this.interimTile;
    do {
      if (tile.getState() == TileState_default.LOADED) {
        this.transition_ = 0;
        return tile;
      }
      tile = tile.interimTile;
    } while (tile);
    return this;
  };
  Tile2.prototype.refreshInterimChain = function() {
    if (!this.interimTile) {
      return;
    }
    var tile = this.interimTile;
    var prev = this;
    do {
      if (tile.getState() == TileState_default.LOADED) {
        tile.interimTile = null;
        break;
      } else if (tile.getState() == TileState_default.LOADING) {
        prev = tile;
      } else if (tile.getState() == TileState_default.IDLE) {
        prev.interimTile = tile.interimTile;
      } else {
        prev = tile;
      }
      tile = prev.interimTile;
    } while (tile);
  };
  Tile2.prototype.getTileCoord = function() {
    return this.tileCoord;
  };
  Tile2.prototype.getState = function() {
    return this.state;
  };
  Tile2.prototype.setState = function(state) {
    if (this.state !== TileState_default.ERROR && this.state > state) {
      throw new Error("Tile load sequence violation");
    }
    this.state = state;
    this.changed();
  };
  Tile2.prototype.load = function() {
    abstract();
  };
  Tile2.prototype.getAlpha = function(id, time) {
    if (!this.transition_) {
      return 1;
    }
    var start = this.transitionStarts_[id];
    if (!start) {
      start = time;
      this.transitionStarts_[id] = start;
    } else if (start === -1) {
      return 1;
    }
    var delta = time - start + 1e3 / 60;
    if (delta >= this.transition_) {
      return 1;
    }
    return easeIn(delta / this.transition_);
  };
  Tile2.prototype.inTransition = function(id) {
    if (!this.transition_) {
      return false;
    }
    return this.transitionStarts_[id] !== -1;
  };
  Tile2.prototype.endTransition = function(id) {
    if (this.transition_) {
      this.transitionStarts_[id] = -1;
    }
  };
  return Tile2;
}(Target_default);
var Tile_default = Tile;

// ../node_modules/ol/ImageBase.js
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
var ImageBase = function(_super) {
  __extends12(ImageBase2, _super);
  function ImageBase2(extent, resolution, pixelRatio, state) {
    var _this = _super.call(this) || this;
    _this.extent = extent;
    _this.pixelRatio_ = pixelRatio;
    _this.resolution = resolution;
    _this.state = state;
    return _this;
  }
  ImageBase2.prototype.changed = function() {
    this.dispatchEvent(EventType_default.CHANGE);
  };
  ImageBase2.prototype.getExtent = function() {
    return this.extent;
  };
  ImageBase2.prototype.getImage = function() {
    return abstract();
  };
  ImageBase2.prototype.getPixelRatio = function() {
    return this.pixelRatio_;
  };
  ImageBase2.prototype.getResolution = function() {
    return this.resolution;
  };
  ImageBase2.prototype.getState = function() {
    return this.state;
  };
  ImageBase2.prototype.load = function() {
    abstract();
  };
  return ImageBase2;
}(Target_default);
var ImageBase_default = ImageBase;

// ../node_modules/ol/Image.js
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
var ImageWrapper = function(_super) {
  __extends13(ImageWrapper2, _super);
  function ImageWrapper2(extent, resolution, pixelRatio, src, crossOrigin, imageLoadFunction) {
    var _this = _super.call(this, extent, resolution, pixelRatio, ImageState_default.IDLE) || this;
    _this.src_ = src;
    _this.image_ = new Image();
    if (crossOrigin !== null) {
      _this.image_.crossOrigin = crossOrigin;
    }
    _this.unlisten_ = null;
    _this.state = ImageState_default.IDLE;
    _this.imageLoadFunction_ = imageLoadFunction;
    return _this;
  }
  ImageWrapper2.prototype.getImage = function() {
    return this.image_;
  };
  ImageWrapper2.prototype.handleImageError_ = function() {
    this.state = ImageState_default.ERROR;
    this.unlistenImage_();
    this.changed();
  };
  ImageWrapper2.prototype.handleImageLoad_ = function() {
    if (this.resolution === void 0) {
      this.resolution = getHeight(this.extent) / this.image_.height;
    }
    this.state = ImageState_default.LOADED;
    this.unlistenImage_();
    this.changed();
  };
  ImageWrapper2.prototype.load = function() {
    if (this.state == ImageState_default.IDLE || this.state == ImageState_default.ERROR) {
      this.state = ImageState_default.LOADING;
      this.changed();
      this.imageLoadFunction_(this, this.src_);
      this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
    }
  };
  ImageWrapper2.prototype.setImage = function(image) {
    this.image_ = image;
    this.resolution = getHeight(this.extent) / this.image_.height;
  };
  ImageWrapper2.prototype.unlistenImage_ = function() {
    if (this.unlisten_) {
      this.unlisten_();
      this.unlisten_ = null;
    }
  };
  return ImageWrapper2;
}(ImageBase_default);
function listenImage(image, loadHandler, errorHandler) {
  var img = image;
  var listening = true;
  var decoding = false;
  var loaded = false;
  var listenerKeys = [
    listenOnce(img, EventType_default.LOAD, function() {
      loaded = true;
      if (!decoding) {
        loadHandler();
      }
    })
  ];
  if (img.src && IMAGE_DECODE) {
    decoding = true;
    img.decode().then(function() {
      if (listening) {
        loadHandler();
      }
    }).catch(function(error) {
      if (listening) {
        if (loaded) {
          loadHandler();
        } else {
          errorHandler();
        }
      }
    });
  } else {
    listenerKeys.push(listenOnce(img, EventType_default.ERROR, errorHandler));
  }
  return function unlisten() {
    listening = false;
    listenerKeys.forEach(unlistenByKey);
  };
}

// ../node_modules/ol/ImageTile.js
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
var ImageTile = function(_super) {
  __extends14(ImageTile2, _super);
  function ImageTile2(tileCoord, state, src, crossOrigin, tileLoadFunction, opt_options) {
    var _this = _super.call(this, tileCoord, state, opt_options) || this;
    _this.crossOrigin_ = crossOrigin;
    _this.src_ = src;
    _this.key = src;
    _this.image_ = new Image();
    if (crossOrigin !== null) {
      _this.image_.crossOrigin = crossOrigin;
    }
    _this.unlisten_ = null;
    _this.tileLoadFunction_ = tileLoadFunction;
    return _this;
  }
  ImageTile2.prototype.getImage = function() {
    return this.image_;
  };
  ImageTile2.prototype.setImage = function(element) {
    this.image_ = element;
    this.state = TileState_default.LOADED;
    this.unlistenImage_();
    this.changed();
  };
  ImageTile2.prototype.handleImageError_ = function() {
    this.state = TileState_default.ERROR;
    this.unlistenImage_();
    this.image_ = getBlankImage();
    this.changed();
  };
  ImageTile2.prototype.handleImageLoad_ = function() {
    var image = this.image_;
    if (image.naturalWidth && image.naturalHeight) {
      this.state = TileState_default.LOADED;
    } else {
      this.state = TileState_default.EMPTY;
    }
    this.unlistenImage_();
    this.changed();
  };
  ImageTile2.prototype.load = function() {
    if (this.state == TileState_default.ERROR) {
      this.state = TileState_default.IDLE;
      this.image_ = new Image();
      if (this.crossOrigin_ !== null) {
        this.image_.crossOrigin = this.crossOrigin_;
      }
    }
    if (this.state == TileState_default.IDLE) {
      this.state = TileState_default.LOADING;
      this.changed();
      this.tileLoadFunction_(this, this.src_);
      this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
    }
  };
  ImageTile2.prototype.unlistenImage_ = function() {
    if (this.unlisten_) {
      this.unlisten_();
      this.unlisten_ = null;
    }
  };
  return ImageTile2;
}(Tile_default);
function getBlankImage() {
  var ctx = createCanvasContext2D(1, 1);
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, 1, 1);
  return ctx.canvas;
}
var ImageTile_default = ImageTile;

// ../node_modules/ol/reproj/common.js
var ERROR_THRESHOLD = 0.5;

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
var RADIUS = 6378137;
var HALF_SIZE = Math.PI * RADIUS;
var EXTENT = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
var WORLD_EXTENT = [-180, -85, 180, 85];
var MAX_SAFE_Y = RADIUS * Math.log(Math.tan(Math.PI / 2));
var EPSG3857Projection = function(_super) {
  __extends15(EPSG3857Projection2, _super);
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
var RADIUS2 = 6378137;
var EXTENT2 = [-180, -90, 180, 90];
var METERS_PER_UNIT2 = Math.PI * RADIUS2 / 180;
var EPSG4326Projection = function(_super) {
  __extends16(EPSG4326Projection2, _super);
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

// ../node_modules/ol/sphere.js
var DEFAULT_RADIUS = 63710088e-1;
function getDistance(c1, c2, opt_radius) {
  var radius = opt_radius || DEFAULT_RADIUS;
  var lat1 = toRadians(c1[1]);
  var lat2 = toRadians(c2[1]);
  var deltaLatBy2 = (lat2 - lat1) / 2;
  var deltaLonBy2 = toRadians(c2[0] - c1[0]) / 2;
  var a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
  return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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
function getPointResolution(projection, resolution, point, opt_units) {
  projection = get3(projection);
  var pointResolution;
  var getter = projection.getPointResolutionFunc();
  if (getter) {
    pointResolution = getter(resolution, point);
    if (opt_units && opt_units !== projection.getUnits()) {
      var metersPerUnit = projection.getMetersPerUnit();
      if (metersPerUnit) {
        pointResolution = pointResolution * metersPerUnit / METERS_PER_UNIT[opt_units];
      }
    }
  } else {
    var units = projection.getUnits();
    if (units == Units_default.DEGREES && !opt_units || opt_units == Units_default.DEGREES) {
      pointResolution = resolution;
    } else {
      var toEPSG4326_1 = getTransformFromProjections(projection, get3("EPSG:4326"));
      if (toEPSG4326_1 === identityTransform && units !== Units_default.DEGREES) {
        pointResolution = resolution * projection.getMetersPerUnit();
      } else {
        var vertices = [
          point[0] - resolution / 2,
          point[1],
          point[0] + resolution / 2,
          point[1],
          point[0],
          point[1] - resolution / 2,
          point[0],
          point[1] + resolution / 2
        ];
        vertices = toEPSG4326_1(vertices, vertices, 2);
        var width = getDistance(vertices.slice(0, 2), vertices.slice(2, 4));
        var height = getDistance(vertices.slice(4, 6), vertices.slice(6, 8));
        pointResolution = (width + height) / 2;
      }
      var metersPerUnit = opt_units ? METERS_PER_UNIT[opt_units] : projection.getMetersPerUnit();
      if (metersPerUnit !== void 0) {
        pointResolution /= metersPerUnit;
      }
    }
  }
  return pointResolution;
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
function transform(coordinate, source, destination) {
  var transformFunc = getTransform(source, destination);
  return transformFunc(coordinate, void 0, coordinate.length);
}
function transformExtent(extent, source, destination, opt_stops) {
  var transformFunc = getTransform(source, destination);
  return applyTransform(extent, transformFunc, void 0, opt_stops);
}
var userProjection = null;
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

// ../node_modules/ol/reproj/Triangulation.js
var MAX_SUBDIVISION = 10;
var MAX_TRIANGLE_WIDTH = 0.25;
var Triangulation = function() {
  function Triangulation2(sourceProj, targetProj, targetExtent, maxSourceExtent, errorThreshold, opt_destinationResolution) {
    this.sourceProj_ = sourceProj;
    this.targetProj_ = targetProj;
    var transformInvCache = {};
    var transformInv = getTransform(this.targetProj_, this.sourceProj_);
    this.transformInv_ = function(c) {
      var key = c[0] + "/" + c[1];
      if (!transformInvCache[key]) {
        transformInvCache[key] = transformInv(c);
      }
      return transformInvCache[key];
    };
    this.maxSourceExtent_ = maxSourceExtent;
    this.errorThresholdSquared_ = errorThreshold * errorThreshold;
    this.triangles_ = [];
    this.wrapsXInSource_ = false;
    this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!maxSourceExtent && !!this.sourceProj_.getExtent() && getWidth(maxSourceExtent) == getWidth(this.sourceProj_.getExtent());
    this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? getWidth(this.sourceProj_.getExtent()) : null;
    this.targetWorldWidth_ = this.targetProj_.getExtent() ? getWidth(this.targetProj_.getExtent()) : null;
    var destinationTopLeft = getTopLeft(targetExtent);
    var destinationTopRight = getTopRight(targetExtent);
    var destinationBottomRight = getBottomRight(targetExtent);
    var destinationBottomLeft = getBottomLeft(targetExtent);
    var sourceTopLeft = this.transformInv_(destinationTopLeft);
    var sourceTopRight = this.transformInv_(destinationTopRight);
    var sourceBottomRight = this.transformInv_(destinationBottomRight);
    var sourceBottomLeft = this.transformInv_(destinationBottomLeft);
    var maxSubdivision = MAX_SUBDIVISION + (opt_destinationResolution ? Math.max(0, Math.ceil(log2(getArea(targetExtent) / (opt_destinationResolution * opt_destinationResolution * 256 * 256)))) : 0);
    this.addQuad_(destinationTopLeft, destinationTopRight, destinationBottomRight, destinationBottomLeft, sourceTopLeft, sourceTopRight, sourceBottomRight, sourceBottomLeft, maxSubdivision);
    if (this.wrapsXInSource_) {
      var leftBound_1 = Infinity;
      this.triangles_.forEach(function(triangle, i, arr) {
        leftBound_1 = Math.min(leftBound_1, triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]);
      });
      this.triangles_.forEach(function(triangle) {
        if (Math.max(triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]) - leftBound_1 > this.sourceWorldWidth_ / 2) {
          var newTriangle = [
            [triangle.source[0][0], triangle.source[0][1]],
            [triangle.source[1][0], triangle.source[1][1]],
            [triangle.source[2][0], triangle.source[2][1]]
          ];
          if (newTriangle[0][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
            newTriangle[0][0] -= this.sourceWorldWidth_;
          }
          if (newTriangle[1][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
            newTriangle[1][0] -= this.sourceWorldWidth_;
          }
          if (newTriangle[2][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
            newTriangle[2][0] -= this.sourceWorldWidth_;
          }
          var minX = Math.min(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
          var maxX = Math.max(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
          if (maxX - minX < this.sourceWorldWidth_ / 2) {
            triangle.source = newTriangle;
          }
        }
      }.bind(this));
    }
    transformInvCache = {};
  }
  Triangulation2.prototype.addTriangle_ = function(a, b, c, aSrc, bSrc, cSrc) {
    this.triangles_.push({
      source: [aSrc, bSrc, cSrc],
      target: [a, b, c]
    });
  };
  Triangulation2.prototype.addQuad_ = function(a, b, c, d, aSrc, bSrc, cSrc, dSrc, maxSubdivision) {
    var sourceQuadExtent = boundingExtent([aSrc, bSrc, cSrc, dSrc]);
    var sourceCoverageX = this.sourceWorldWidth_ ? getWidth(sourceQuadExtent) / this.sourceWorldWidth_ : null;
    var sourceWorldWidth = this.sourceWorldWidth_;
    var wrapsX = this.sourceProj_.canWrapX() && sourceCoverageX > 0.5 && sourceCoverageX < 1;
    var needsSubdivision = false;
    if (maxSubdivision > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        var targetQuadExtent = boundingExtent([a, b, c, d]);
        var targetCoverageX = getWidth(targetQuadExtent) / this.targetWorldWidth_;
        needsSubdivision = targetCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
      }
      if (!wrapsX && this.sourceProj_.isGlobal() && sourceCoverageX) {
        needsSubdivision = sourceCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
      }
    }
    if (!needsSubdivision && this.maxSourceExtent_) {
      if (isFinite(sourceQuadExtent[0]) && isFinite(sourceQuadExtent[1]) && isFinite(sourceQuadExtent[2]) && isFinite(sourceQuadExtent[3])) {
        if (!intersects(sourceQuadExtent, this.maxSourceExtent_)) {
          return;
        }
      }
    }
    var isNotFinite = 0;
    if (!needsSubdivision) {
      if (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) || !isFinite(bSrc[0]) || !isFinite(bSrc[1]) || !isFinite(cSrc[0]) || !isFinite(cSrc[1]) || !isFinite(dSrc[0]) || !isFinite(dSrc[1])) {
        if (maxSubdivision > 0) {
          needsSubdivision = true;
        } else {
          isNotFinite = (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) ? 8 : 0) + (!isFinite(bSrc[0]) || !isFinite(bSrc[1]) ? 4 : 0) + (!isFinite(cSrc[0]) || !isFinite(cSrc[1]) ? 2 : 0) + (!isFinite(dSrc[0]) || !isFinite(dSrc[1]) ? 1 : 0);
          if (isNotFinite != 1 && isNotFinite != 2 && isNotFinite != 4 && isNotFinite != 8) {
            return;
          }
        }
      }
    }
    if (maxSubdivision > 0) {
      if (!needsSubdivision) {
        var center = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
        var centerSrc = this.transformInv_(center);
        var dx = void 0;
        if (wrapsX) {
          var centerSrcEstimX = (modulo(aSrc[0], sourceWorldWidth) + modulo(cSrc[0], sourceWorldWidth)) / 2;
          dx = centerSrcEstimX - modulo(centerSrc[0], sourceWorldWidth);
        } else {
          dx = (aSrc[0] + cSrc[0]) / 2 - centerSrc[0];
        }
        var dy = (aSrc[1] + cSrc[1]) / 2 - centerSrc[1];
        var centerSrcErrorSquared = dx * dx + dy * dy;
        needsSubdivision = centerSrcErrorSquared > this.errorThresholdSquared_;
      }
      if (needsSubdivision) {
        if (Math.abs(a[0] - c[0]) <= Math.abs(a[1] - c[1])) {
          var bc = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
          var bcSrc = this.transformInv_(bc);
          var da = [(d[0] + a[0]) / 2, (d[1] + a[1]) / 2];
          var daSrc = this.transformInv_(da);
          this.addQuad_(a, b, bc, da, aSrc, bSrc, bcSrc, daSrc, maxSubdivision - 1);
          this.addQuad_(da, bc, c, d, daSrc, bcSrc, cSrc, dSrc, maxSubdivision - 1);
        } else {
          var ab = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          var abSrc = this.transformInv_(ab);
          var cd = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2];
          var cdSrc = this.transformInv_(cd);
          this.addQuad_(a, ab, cd, d, aSrc, abSrc, cdSrc, dSrc, maxSubdivision - 1);
          this.addQuad_(ab, b, c, cd, abSrc, bSrc, cSrc, cdSrc, maxSubdivision - 1);
        }
        return;
      }
    }
    if (wrapsX) {
      if (!this.canWrapXInSource_) {
        return;
      }
      this.wrapsXInSource_ = true;
    }
    if ((isNotFinite & 11) == 0) {
      this.addTriangle_(a, c, d, aSrc, cSrc, dSrc);
    }
    if ((isNotFinite & 14) == 0) {
      this.addTriangle_(a, c, b, aSrc, cSrc, bSrc);
    }
    if (isNotFinite) {
      if ((isNotFinite & 13) == 0) {
        this.addTriangle_(b, d, a, bSrc, dSrc, aSrc);
      }
      if ((isNotFinite & 7) == 0) {
        this.addTriangle_(b, d, c, bSrc, dSrc, cSrc);
      }
    }
  };
  Triangulation2.prototype.calculateSourceExtent = function() {
    var extent = createEmpty();
    this.triangles_.forEach(function(triangle, i, arr) {
      var src = triangle.source;
      extendCoordinate(extent, src[0]);
      extendCoordinate(extent, src[1]);
      extendCoordinate(extent, src[2]);
    });
    return extent;
  };
  Triangulation2.prototype.getTriangles = function() {
    return this.triangles_;
  };
  return Triangulation2;
}();
var Triangulation_default = Triangulation;

// ../node_modules/ol/renderer/canvas/common.js
var IMAGE_SMOOTHING_DISABLED = {
  imageSmoothingEnabled: false,
  msImageSmoothingEnabled: false
};
var IMAGE_SMOOTHING_ENABLED = {
  imageSmoothingEnabled: true,
  msImageSmoothingEnabled: true
};

// ../node_modules/ol/reproj.js
var brokenDiagonalRendering_;
function drawTestTriangle(ctx, u1, v1, u2, v2) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(u1, v1);
  ctx.lineTo(u2, v2);
  ctx.closePath();
  ctx.save();
  ctx.clip();
  ctx.fillRect(0, 0, Math.max(u1, u2) + 1, Math.max(v1, v2));
  ctx.restore();
}
function verifyBrokenDiagonalRendering(data, offset) {
  return Math.abs(data[offset * 4] - 210) > 2 || Math.abs(data[offset * 4 + 3] - 0.75 * 255) > 2;
}
function isBrokenDiagonalRendering() {
  if (brokenDiagonalRendering_ === void 0) {
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = "rgba(210, 0, 0, 0.75)";
    drawTestTriangle(ctx, 4, 5, 4, 0);
    drawTestTriangle(ctx, 4, 5, 0, 5);
    var data = ctx.getImageData(0, 0, 3, 3).data;
    brokenDiagonalRendering_ = verifyBrokenDiagonalRendering(data, 0) || verifyBrokenDiagonalRendering(data, 4) || verifyBrokenDiagonalRendering(data, 8);
  }
  return brokenDiagonalRendering_;
}
function calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution) {
  var sourceCenter = transform(targetCenter, targetProj, sourceProj);
  var sourceResolution = getPointResolution(targetProj, targetResolution, targetCenter);
  var targetMetersPerUnit = targetProj.getMetersPerUnit();
  if (targetMetersPerUnit !== void 0) {
    sourceResolution *= targetMetersPerUnit;
  }
  var sourceMetersPerUnit = sourceProj.getMetersPerUnit();
  if (sourceMetersPerUnit !== void 0) {
    sourceResolution /= sourceMetersPerUnit;
  }
  var sourceExtent = sourceProj.getExtent();
  if (!sourceExtent || containsCoordinate(sourceExtent, sourceCenter)) {
    var compensationFactor = getPointResolution(sourceProj, sourceResolution, sourceCenter) / sourceResolution;
    if (isFinite(compensationFactor) && compensationFactor > 0) {
      sourceResolution /= compensationFactor;
    }
  }
  return sourceResolution;
}
function calculateSourceExtentResolution(sourceProj, targetProj, targetExtent, targetResolution) {
  var targetCenter = getCenter(targetExtent);
  var sourceResolution = calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution);
  if (!isFinite(sourceResolution) || sourceResolution <= 0) {
    forEachCorner(targetExtent, function(corner) {
      sourceResolution = calculateSourceResolution(sourceProj, targetProj, corner, targetResolution);
      return isFinite(sourceResolution) && sourceResolution > 0;
    });
  }
  return sourceResolution;
}
function render(width, height, pixelRatio, sourceResolution, sourceExtent, targetResolution, targetExtent, triangulation, sources, gutter, opt_renderEdges, opt_interpolate) {
  var context = createCanvasContext2D(Math.round(pixelRatio * width), Math.round(pixelRatio * height));
  if (!opt_interpolate) {
    assign(context, IMAGE_SMOOTHING_DISABLED);
  }
  if (sources.length === 0) {
    return context.canvas;
  }
  context.scale(pixelRatio, pixelRatio);
  function pixelRound(value) {
    return Math.round(value * pixelRatio) / pixelRatio;
  }
  context.globalCompositeOperation = "lighter";
  var sourceDataExtent = createEmpty();
  sources.forEach(function(src, i, arr) {
    extend(sourceDataExtent, src.extent);
  });
  var canvasWidthInUnits = getWidth(sourceDataExtent);
  var canvasHeightInUnits = getHeight(sourceDataExtent);
  var stitchContext = createCanvasContext2D(Math.round(pixelRatio * canvasWidthInUnits / sourceResolution), Math.round(pixelRatio * canvasHeightInUnits / sourceResolution));
  if (!opt_interpolate) {
    assign(stitchContext, IMAGE_SMOOTHING_DISABLED);
  }
  var stitchScale = pixelRatio / sourceResolution;
  sources.forEach(function(src, i, arr) {
    var xPos = src.extent[0] - sourceDataExtent[0];
    var yPos = -(src.extent[3] - sourceDataExtent[3]);
    var srcWidth = getWidth(src.extent);
    var srcHeight = getHeight(src.extent);
    if (src.image.width > 0 && src.image.height > 0) {
      stitchContext.drawImage(src.image, gutter, gutter, src.image.width - 2 * gutter, src.image.height - 2 * gutter, xPos * stitchScale, yPos * stitchScale, srcWidth * stitchScale, srcHeight * stitchScale);
    }
  });
  var targetTopLeft = getTopLeft(targetExtent);
  triangulation.getTriangles().forEach(function(triangle, i, arr) {
    var source = triangle.source;
    var target = triangle.target;
    var x0 = source[0][0], y0 = source[0][1];
    var x1 = source[1][0], y1 = source[1][1];
    var x2 = source[2][0], y2 = source[2][1];
    var u0 = pixelRound((target[0][0] - targetTopLeft[0]) / targetResolution);
    var v0 = pixelRound(-(target[0][1] - targetTopLeft[1]) / targetResolution);
    var u1 = pixelRound((target[1][0] - targetTopLeft[0]) / targetResolution);
    var v1 = pixelRound(-(target[1][1] - targetTopLeft[1]) / targetResolution);
    var u2 = pixelRound((target[2][0] - targetTopLeft[0]) / targetResolution);
    var v2 = pixelRound(-(target[2][1] - targetTopLeft[1]) / targetResolution);
    var sourceNumericalShiftX = x0;
    var sourceNumericalShiftY = y0;
    x0 = 0;
    y0 = 0;
    x1 -= sourceNumericalShiftX;
    y1 -= sourceNumericalShiftY;
    x2 -= sourceNumericalShiftX;
    y2 -= sourceNumericalShiftY;
    var augmentedMatrix = [
      [x1, y1, 0, 0, u1 - u0],
      [x2, y2, 0, 0, u2 - u0],
      [0, 0, x1, y1, v1 - v0],
      [0, 0, x2, y2, v2 - v0]
    ];
    var affineCoefs = solveLinearSystem(augmentedMatrix);
    if (!affineCoefs) {
      return;
    }
    context.save();
    context.beginPath();
    if (isBrokenDiagonalRendering() || !opt_interpolate) {
      context.moveTo(u1, v1);
      var steps = 4;
      var ud = u0 - u1;
      var vd = v0 - v1;
      for (var step = 0; step < steps; step++) {
        context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound(step * vd / (steps - 1)));
        if (step != steps - 1) {
          context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound((step + 1) * vd / (steps - 1)));
        }
      }
      context.lineTo(u2, v2);
    } else {
      context.moveTo(u1, v1);
      context.lineTo(u0, v0);
      context.lineTo(u2, v2);
    }
    context.clip();
    context.transform(affineCoefs[0], affineCoefs[2], affineCoefs[1], affineCoefs[3], u0, v0);
    context.translate(sourceDataExtent[0] - sourceNumericalShiftX, sourceDataExtent[3] - sourceNumericalShiftY);
    context.scale(sourceResolution / pixelRatio, -sourceResolution / pixelRatio);
    context.drawImage(stitchContext.canvas, 0, 0);
    context.restore();
  });
  if (opt_renderEdges) {
    context.save();
    context.globalCompositeOperation = "source-over";
    context.strokeStyle = "black";
    context.lineWidth = 1;
    triangulation.getTriangles().forEach(function(triangle, i, arr) {
      var target = triangle.target;
      var u0 = (target[0][0] - targetTopLeft[0]) / targetResolution;
      var v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution;
      var u1 = (target[1][0] - targetTopLeft[0]) / targetResolution;
      var v1 = -(target[1][1] - targetTopLeft[1]) / targetResolution;
      var u2 = (target[2][0] - targetTopLeft[0]) / targetResolution;
      var v2 = -(target[2][1] - targetTopLeft[1]) / targetResolution;
      context.beginPath();
      context.moveTo(u1, v1);
      context.lineTo(u0, v0);
      context.lineTo(u2, v2);
      context.closePath();
      context.stroke();
    });
    context.restore();
  }
  return context.canvas;
}

// ../node_modules/ol/reproj/Tile.js
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
var ReprojTile = function(_super) {
  __extends17(ReprojTile2, _super);
  function ReprojTile2(sourceProj, sourceTileGrid, targetProj, targetTileGrid, tileCoord, wrappedTileCoord, pixelRatio, gutter, getTileFunction, opt_errorThreshold, opt_renderEdges, opt_interpolate) {
    var _this = _super.call(this, tileCoord, TileState_default.IDLE, { interpolate: !!opt_interpolate }) || this;
    _this.renderEdges_ = opt_renderEdges !== void 0 ? opt_renderEdges : false;
    _this.pixelRatio_ = pixelRatio;
    _this.gutter_ = gutter;
    _this.canvas_ = null;
    _this.sourceTileGrid_ = sourceTileGrid;
    _this.targetTileGrid_ = targetTileGrid;
    _this.wrappedTileCoord_ = wrappedTileCoord ? wrappedTileCoord : tileCoord;
    _this.sourceTiles_ = [];
    _this.sourcesListenerKeys_ = null;
    _this.sourceZ_ = 0;
    var targetExtent = targetTileGrid.getTileCoordExtent(_this.wrappedTileCoord_);
    var maxTargetExtent = _this.targetTileGrid_.getExtent();
    var maxSourceExtent = _this.sourceTileGrid_.getExtent();
    var limitedTargetExtent = maxTargetExtent ? getIntersection(targetExtent, maxTargetExtent) : targetExtent;
    if (getArea(limitedTargetExtent) === 0) {
      _this.state = TileState_default.EMPTY;
      return _this;
    }
    var sourceProjExtent = sourceProj.getExtent();
    if (sourceProjExtent) {
      if (!maxSourceExtent) {
        maxSourceExtent = sourceProjExtent;
      } else {
        maxSourceExtent = getIntersection(maxSourceExtent, sourceProjExtent);
      }
    }
    var targetResolution = targetTileGrid.getResolution(_this.wrappedTileCoord_[0]);
    var sourceResolution = calculateSourceExtentResolution(sourceProj, targetProj, limitedTargetExtent, targetResolution);
    if (!isFinite(sourceResolution) || sourceResolution <= 0) {
      _this.state = TileState_default.EMPTY;
      return _this;
    }
    var errorThresholdInPixels = opt_errorThreshold !== void 0 ? opt_errorThreshold : ERROR_THRESHOLD;
    _this.triangulation_ = new Triangulation_default(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels, targetResolution);
    if (_this.triangulation_.getTriangles().length === 0) {
      _this.state = TileState_default.EMPTY;
      return _this;
    }
    _this.sourceZ_ = sourceTileGrid.getZForResolution(sourceResolution);
    var sourceExtent = _this.triangulation_.calculateSourceExtent();
    if (maxSourceExtent) {
      if (sourceProj.canWrapX()) {
        sourceExtent[1] = clamp(sourceExtent[1], maxSourceExtent[1], maxSourceExtent[3]);
        sourceExtent[3] = clamp(sourceExtent[3], maxSourceExtent[1], maxSourceExtent[3]);
      } else {
        sourceExtent = getIntersection(sourceExtent, maxSourceExtent);
      }
    }
    if (!getArea(sourceExtent)) {
      _this.state = TileState_default.EMPTY;
    } else {
      var sourceRange = sourceTileGrid.getTileRangeForExtentAndZ(sourceExtent, _this.sourceZ_);
      for (var srcX = sourceRange.minX; srcX <= sourceRange.maxX; srcX++) {
        for (var srcY = sourceRange.minY; srcY <= sourceRange.maxY; srcY++) {
          var tile = getTileFunction(_this.sourceZ_, srcX, srcY, pixelRatio);
          if (tile) {
            _this.sourceTiles_.push(tile);
          }
        }
      }
      if (_this.sourceTiles_.length === 0) {
        _this.state = TileState_default.EMPTY;
      }
    }
    return _this;
  }
  ReprojTile2.prototype.getImage = function() {
    return this.canvas_;
  };
  ReprojTile2.prototype.reproject_ = function() {
    var sources = [];
    this.sourceTiles_.forEach(function(tile, i, arr) {
      if (tile && tile.getState() == TileState_default.LOADED) {
        sources.push({
          extent: this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord),
          image: tile.getImage()
        });
      }
    }.bind(this));
    this.sourceTiles_.length = 0;
    if (sources.length === 0) {
      this.state = TileState_default.ERROR;
    } else {
      var z = this.wrappedTileCoord_[0];
      var size = this.targetTileGrid_.getTileSize(z);
      var width = typeof size === "number" ? size : size[0];
      var height = typeof size === "number" ? size : size[1];
      var targetResolution = this.targetTileGrid_.getResolution(z);
      var sourceResolution = this.sourceTileGrid_.getResolution(this.sourceZ_);
      var targetExtent = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
      this.canvas_ = render(width, height, this.pixelRatio_, sourceResolution, this.sourceTileGrid_.getExtent(), targetResolution, targetExtent, this.triangulation_, sources, this.gutter_, this.renderEdges_, this.interpolate);
      this.state = TileState_default.LOADED;
    }
    this.changed();
  };
  ReprojTile2.prototype.load = function() {
    if (this.state == TileState_default.IDLE) {
      this.state = TileState_default.LOADING;
      this.changed();
      var leftToLoad_1 = 0;
      this.sourcesListenerKeys_ = [];
      this.sourceTiles_.forEach(function(tile, i, arr) {
        var state = tile.getState();
        if (state == TileState_default.IDLE || state == TileState_default.LOADING) {
          leftToLoad_1++;
          var sourceListenKey_1 = listen(tile, EventType_default.CHANGE, function(e) {
            var state2 = tile.getState();
            if (state2 == TileState_default.LOADED || state2 == TileState_default.ERROR || state2 == TileState_default.EMPTY) {
              unlistenByKey(sourceListenKey_1);
              leftToLoad_1--;
              if (leftToLoad_1 === 0) {
                this.unlistenSources_();
                this.reproject_();
              }
            }
          }, this);
          this.sourcesListenerKeys_.push(sourceListenKey_1);
        }
      }.bind(this));
      if (leftToLoad_1 === 0) {
        setTimeout(this.reproject_.bind(this), 0);
      } else {
        this.sourceTiles_.forEach(function(tile, i, arr) {
          var state = tile.getState();
          if (state == TileState_default.IDLE) {
            tile.load();
          }
        });
      }
    }
  };
  ReprojTile2.prototype.unlistenSources_ = function() {
    this.sourcesListenerKeys_.forEach(unlistenByKey);
    this.sourcesListenerKeys_ = null;
  };
  return ReprojTile2;
}(Tile_default);
var Tile_default2 = ReprojTile;

// ../node_modules/ol/TileRange.js
var TileRange = function() {
  function TileRange2(minX, maxX, minY, maxY) {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
  }
  TileRange2.prototype.contains = function(tileCoord) {
    return this.containsXY(tileCoord[1], tileCoord[2]);
  };
  TileRange2.prototype.containsTileRange = function(tileRange) {
    return this.minX <= tileRange.minX && tileRange.maxX <= this.maxX && this.minY <= tileRange.minY && tileRange.maxY <= this.maxY;
  };
  TileRange2.prototype.containsXY = function(x, y) {
    return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
  };
  TileRange2.prototype.equals = function(tileRange) {
    return this.minX == tileRange.minX && this.minY == tileRange.minY && this.maxX == tileRange.maxX && this.maxY == tileRange.maxY;
  };
  TileRange2.prototype.extend = function(tileRange) {
    if (tileRange.minX < this.minX) {
      this.minX = tileRange.minX;
    }
    if (tileRange.maxX > this.maxX) {
      this.maxX = tileRange.maxX;
    }
    if (tileRange.minY < this.minY) {
      this.minY = tileRange.minY;
    }
    if (tileRange.maxY > this.maxY) {
      this.maxY = tileRange.maxY;
    }
  };
  TileRange2.prototype.getHeight = function() {
    return this.maxY - this.minY + 1;
  };
  TileRange2.prototype.getSize = function() {
    return [this.getWidth(), this.getHeight()];
  };
  TileRange2.prototype.getWidth = function() {
    return this.maxX - this.minX + 1;
  };
  TileRange2.prototype.intersects = function(tileRange) {
    return this.minX <= tileRange.maxX && this.maxX >= tileRange.minX && this.minY <= tileRange.maxY && this.maxY >= tileRange.minY;
  };
  return TileRange2;
}();
var TileRange_default = TileRange;

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
function cssOpacity(opacity) {
  return opacity === 1 ? "" : String(Math.round(opacity * 100) / 100);
}

// ../node_modules/ol/size.js
function toSize(size, opt_size) {
  if (Array.isArray(size)) {
    return size;
  } else {
    if (opt_size === void 0) {
      opt_size = [size, size];
    } else {
      opt_size[0] = size;
      opt_size[1] = size;
    }
    return opt_size;
  }
}

// ../node_modules/ol/renderer/canvas/TileLayer.js
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
var CanvasTileLayerRenderer = function(_super) {
  __extends18(CanvasTileLayerRenderer2, _super);
  function CanvasTileLayerRenderer2(tileLayer) {
    var _this = _super.call(this, tileLayer) || this;
    _this.extentChanged = true;
    _this.renderedExtent_ = null;
    _this.renderedPixelRatio;
    _this.renderedProjection = null;
    _this.renderedRevision;
    _this.renderedTiles = [];
    _this.newTiles_ = false;
    _this.tmpExtent = createEmpty();
    _this.tmpTileRange_ = new TileRange_default(0, 0, 0, 0);
    return _this;
  }
  CanvasTileLayerRenderer2.prototype.isDrawableTile = function(tile) {
    var tileLayer = this.getLayer();
    var tileState = tile.getState();
    var useInterimTilesOnError = tileLayer.getUseInterimTilesOnError();
    return tileState == TileState_default.LOADED || tileState == TileState_default.EMPTY || tileState == TileState_default.ERROR && !useInterimTilesOnError;
  };
  CanvasTileLayerRenderer2.prototype.getTile = function(z, x, y, frameState) {
    var pixelRatio = frameState.pixelRatio;
    var projection = frameState.viewState.projection;
    var tileLayer = this.getLayer();
    var tileSource = tileLayer.getSource();
    var tile = tileSource.getTile(z, x, y, pixelRatio, projection);
    if (tile.getState() == TileState_default.ERROR) {
      if (!tileLayer.getUseInterimTilesOnError()) {
        tile.setState(TileState_default.LOADED);
      } else if (tileLayer.getPreload() > 0) {
        this.newTiles_ = true;
      }
    }
    if (!this.isDrawableTile(tile)) {
      tile = tile.getInterimTile();
    }
    return tile;
  };
  CanvasTileLayerRenderer2.prototype.getData = function(pixel) {
    var frameState = this.frameState;
    if (!frameState) {
      return null;
    }
    var layer = this.getLayer();
    var coordinate = apply(frameState.pixelToCoordinateTransform, pixel.slice());
    var layerExtent = layer.getExtent();
    if (layerExtent) {
      if (!containsCoordinate(layerExtent, coordinate)) {
        return null;
      }
    }
    var pixelRatio = frameState.pixelRatio;
    var projection = frameState.viewState.projection;
    var viewState = frameState.viewState;
    var source = layer.getRenderSource();
    var tileGrid = source.getTileGridForProjection(viewState.projection);
    var tilePixelRatio = source.getTilePixelRatio(frameState.pixelRatio);
    for (var z = tileGrid.getZForResolution(viewState.resolution); z >= tileGrid.getMinZoom(); --z) {
      var tileCoord = tileGrid.getTileCoordForCoordAndZ(coordinate, z);
      var tile = source.getTile(z, tileCoord[1], tileCoord[2], pixelRatio, projection);
      if (!(tile instanceof ImageTile_default || tile instanceof Tile_default2)) {
        return null;
      }
      if (tile.getState() !== TileState_default.LOADED) {
        continue;
      }
      var tileOrigin = tileGrid.getOrigin(z);
      var tileSize = toSize(tileGrid.getTileSize(z));
      var tileResolution = tileGrid.getResolution(z);
      var col = Math.floor(tilePixelRatio * ((coordinate[0] - tileOrigin[0]) / tileResolution - tileCoord[1] * tileSize[0]));
      var row = Math.floor(tilePixelRatio * ((tileOrigin[1] - coordinate[1]) / tileResolution - tileCoord[2] * tileSize[1]));
      return this.getImageData(tile.getImage(), col, row);
    }
    return null;
  };
  CanvasTileLayerRenderer2.prototype.loadedTileCallback = function(tiles, zoom, tile) {
    if (this.isDrawableTile(tile)) {
      return _super.prototype.loadedTileCallback.call(this, tiles, zoom, tile);
    }
    return false;
  };
  CanvasTileLayerRenderer2.prototype.prepareFrame = function(frameState) {
    return !!this.getLayer().getSource();
  };
  CanvasTileLayerRenderer2.prototype.renderFrame = function(frameState, target) {
    var layerState = frameState.layerStatesArray[frameState.layerIndex];
    var viewState = frameState.viewState;
    var projection = viewState.projection;
    var viewResolution = viewState.resolution;
    var viewCenter = viewState.center;
    var rotation = viewState.rotation;
    var pixelRatio = frameState.pixelRatio;
    var tileLayer = this.getLayer();
    var tileSource = tileLayer.getSource();
    var sourceRevision = tileSource.getRevision();
    var tileGrid = tileSource.getTileGridForProjection(projection);
    var z = tileGrid.getZForResolution(viewResolution, tileSource.zDirection);
    var tileResolution = tileGrid.getResolution(z);
    var extent = frameState.extent;
    var layerExtent = layerState.extent && fromUserExtent(layerState.extent, projection);
    if (layerExtent) {
      extent = getIntersection(extent, fromUserExtent(layerState.extent, projection));
    }
    var tilePixelRatio = tileSource.getTilePixelRatio(pixelRatio);
    var width = Math.round(frameState.size[0] * tilePixelRatio);
    var height = Math.round(frameState.size[1] * tilePixelRatio);
    if (rotation) {
      var size = Math.round(Math.sqrt(width * width + height * height));
      width = size;
      height = size;
    }
    var dx = tileResolution * width / 2 / tilePixelRatio;
    var dy = tileResolution * height / 2 / tilePixelRatio;
    var canvasExtent = [
      viewCenter[0] - dx,
      viewCenter[1] - dy,
      viewCenter[0] + dx,
      viewCenter[1] + dy
    ];
    var tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z);
    var tilesToDrawByZ = {};
    tilesToDrawByZ[z] = {};
    var findLoadedTiles = this.createLoadedTileFinder(tileSource, projection, tilesToDrawByZ);
    var tmpExtent = this.tmpExtent;
    var tmpTileRange = this.tmpTileRange_;
    this.newTiles_ = false;
    for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
      for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
        var tile = this.getTile(z, x, y, frameState);
        if (this.isDrawableTile(tile)) {
          var uid = getUid(this);
          if (tile.getState() == TileState_default.LOADED) {
            tilesToDrawByZ[z][tile.tileCoord.toString()] = tile;
            var inTransition = tile.inTransition(uid);
            if (!this.newTiles_ && (inTransition || this.renderedTiles.indexOf(tile) === -1)) {
              this.newTiles_ = true;
            }
          }
          if (tile.getAlpha(uid, frameState.time) === 1) {
            continue;
          }
        }
        var childTileRange = tileGrid.getTileCoordChildTileRange(tile.tileCoord, tmpTileRange, tmpExtent);
        var covered = false;
        if (childTileRange) {
          covered = findLoadedTiles(z + 1, childTileRange);
        }
        if (!covered) {
          tileGrid.forEachTileCoordParentTileRange(tile.tileCoord, findLoadedTiles, tmpTileRange, tmpExtent);
        }
      }
    }
    var canvasScale = tileResolution / viewResolution;
    compose(this.pixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / tilePixelRatio, 1 / tilePixelRatio, rotation, -width / 2, -height / 2);
    var canvasTransform = toString(this.pixelTransform);
    this.useContainer(target, canvasTransform, layerState.opacity, this.getBackground(frameState));
    var context = this.context;
    var canvas = context.canvas;
    makeInverse(this.inversePixelTransform, this.pixelTransform);
    compose(this.tempTransform, width / 2, height / 2, canvasScale, canvasScale, 0, -width / 2, -height / 2);
    if (canvas.width != width || canvas.height != height) {
      canvas.width = width;
      canvas.height = height;
    } else if (!this.containerReused) {
      context.clearRect(0, 0, width, height);
    }
    if (layerExtent) {
      this.clipUnrotated(context, frameState, layerExtent);
    }
    if (!tileSource.getInterpolate()) {
      assign(context, IMAGE_SMOOTHING_DISABLED);
    }
    this.preRender(context, frameState);
    this.renderedTiles.length = 0;
    var zs = Object.keys(tilesToDrawByZ).map(Number);
    zs.sort(numberSafeCompareFunction);
    var clips, clipZs, currentClip;
    if (layerState.opacity === 1 && (!this.containerReused || tileSource.getOpaque(frameState.viewState.projection))) {
      zs = zs.reverse();
    } else {
      clips = [];
      clipZs = [];
    }
    for (var i = zs.length - 1; i >= 0; --i) {
      var currentZ = zs[i];
      var currentTilePixelSize = tileSource.getTilePixelSize(currentZ, pixelRatio, projection);
      var currentResolution = tileGrid.getResolution(currentZ);
      var currentScale = currentResolution / tileResolution;
      var dx_1 = currentTilePixelSize[0] * currentScale * canvasScale;
      var dy_1 = currentTilePixelSize[1] * currentScale * canvasScale;
      var originTileCoord = tileGrid.getTileCoordForCoordAndZ(getTopLeft(canvasExtent), currentZ);
      var originTileExtent = tileGrid.getTileCoordExtent(originTileCoord);
      var origin_1 = apply(this.tempTransform, [
        tilePixelRatio * (originTileExtent[0] - canvasExtent[0]) / tileResolution,
        tilePixelRatio * (canvasExtent[3] - originTileExtent[3]) / tileResolution
      ]);
      var tileGutter = tilePixelRatio * tileSource.getGutterForProjection(projection);
      var tilesToDraw = tilesToDrawByZ[currentZ];
      for (var tileCoordKey in tilesToDraw) {
        var tile = tilesToDraw[tileCoordKey];
        var tileCoord = tile.tileCoord;
        var xIndex = originTileCoord[1] - tileCoord[1];
        var nextX = Math.round(origin_1[0] - (xIndex - 1) * dx_1);
        var yIndex = originTileCoord[2] - tileCoord[2];
        var nextY = Math.round(origin_1[1] - (yIndex - 1) * dy_1);
        var x = Math.round(origin_1[0] - xIndex * dx_1);
        var y = Math.round(origin_1[1] - yIndex * dy_1);
        var w = nextX - x;
        var h = nextY - y;
        var transition = z === currentZ;
        var inTransition = transition && tile.getAlpha(getUid(this), frameState.time) !== 1;
        var contextSaved = false;
        if (!inTransition) {
          if (clips) {
            currentClip = [x, y, x + w, y, x + w, y + h, x, y + h];
            for (var i_1 = 0, ii = clips.length; i_1 < ii; ++i_1) {
              if (z !== currentZ && currentZ < clipZs[i_1]) {
                var clip = clips[i_1];
                if (intersects([x, y, x + w, y + h], [clip[0], clip[3], clip[4], clip[7]])) {
                  if (!contextSaved) {
                    context.save();
                    contextSaved = true;
                  }
                  context.beginPath();
                  context.moveTo(currentClip[0], currentClip[1]);
                  context.lineTo(currentClip[2], currentClip[3]);
                  context.lineTo(currentClip[4], currentClip[5]);
                  context.lineTo(currentClip[6], currentClip[7]);
                  context.moveTo(clip[6], clip[7]);
                  context.lineTo(clip[4], clip[5]);
                  context.lineTo(clip[2], clip[3]);
                  context.lineTo(clip[0], clip[1]);
                  context.clip();
                }
              }
            }
            clips.push(currentClip);
            clipZs.push(currentZ);
          } else {
            context.clearRect(x, y, w, h);
          }
        }
        this.drawTileImage(tile, frameState, x, y, w, h, tileGutter, transition);
        if (clips && !inTransition) {
          if (contextSaved) {
            context.restore();
          }
          this.renderedTiles.unshift(tile);
        } else {
          this.renderedTiles.push(tile);
        }
        this.updateUsedTiles(frameState.usedTiles, tileSource, tile);
      }
    }
    this.renderedRevision = sourceRevision;
    this.renderedResolution = tileResolution;
    this.extentChanged = !this.renderedExtent_ || !equals2(this.renderedExtent_, canvasExtent);
    this.renderedExtent_ = canvasExtent;
    this.renderedPixelRatio = pixelRatio;
    this.renderedProjection = projection;
    this.manageTilePyramid(frameState, tileSource, tileGrid, pixelRatio, projection, extent, z, tileLayer.getPreload());
    this.scheduleExpireCache(frameState, tileSource);
    this.postRender(context, frameState);
    if (layerState.extent) {
      context.restore();
    }
    assign(context, IMAGE_SMOOTHING_ENABLED);
    if (canvasTransform !== canvas.style.transform) {
      canvas.style.transform = canvasTransform;
    }
    var opacity = cssOpacity(layerState.opacity);
    var container = this.container;
    if (opacity !== container.style.opacity) {
      container.style.opacity = opacity;
    }
    return this.container;
  };
  CanvasTileLayerRenderer2.prototype.drawTileImage = function(tile, frameState, x, y, w, h, gutter, transition) {
    var image = this.getTileImage(tile);
    if (!image) {
      return;
    }
    var uid = getUid(this);
    var alpha = transition ? tile.getAlpha(uid, frameState.time) : 1;
    var alphaChanged = alpha !== this.context.globalAlpha;
    if (alphaChanged) {
      this.context.save();
      this.context.globalAlpha = alpha;
    }
    this.context.drawImage(image, gutter, gutter, image.width - 2 * gutter, image.height - 2 * gutter, x, y, w, h);
    if (alphaChanged) {
      this.context.restore();
    }
    if (alpha !== 1) {
      frameState.animate = true;
    } else if (transition) {
      tile.endTransition(uid);
    }
  };
  CanvasTileLayerRenderer2.prototype.getImage = function() {
    var context = this.context;
    return context ? context.canvas : null;
  };
  CanvasTileLayerRenderer2.prototype.getTileImage = function(tile) {
    return tile.getImage();
  };
  CanvasTileLayerRenderer2.prototype.scheduleExpireCache = function(frameState, tileSource) {
    if (tileSource.canExpireCache()) {
      var postRenderFunction = function(tileSource2, map, frameState2) {
        var tileSourceKey = getUid(tileSource2);
        if (tileSourceKey in frameState2.usedTiles) {
          tileSource2.expireCache(frameState2.viewState.projection, frameState2.usedTiles[tileSourceKey]);
        }
      }.bind(null, tileSource);
      frameState.postRenderFunctions.push(postRenderFunction);
    }
  };
  CanvasTileLayerRenderer2.prototype.updateUsedTiles = function(usedTiles, tileSource, tile) {
    var tileSourceKey = getUid(tileSource);
    if (!(tileSourceKey in usedTiles)) {
      usedTiles[tileSourceKey] = {};
    }
    usedTiles[tileSourceKey][tile.getKey()] = true;
  };
  CanvasTileLayerRenderer2.prototype.manageTilePyramid = function(frameState, tileSource, tileGrid, pixelRatio, projection, extent, currentZ, preload, opt_tileCallback) {
    var tileSourceKey = getUid(tileSource);
    if (!(tileSourceKey in frameState.wantedTiles)) {
      frameState.wantedTiles[tileSourceKey] = {};
    }
    var wantedTiles = frameState.wantedTiles[tileSourceKey];
    var tileQueue = frameState.tileQueue;
    var minZoom = tileGrid.getMinZoom();
    var tileCount = 0;
    var tile, tileRange, tileResolution, x, y, z;
    for (z = minZoom; z <= currentZ; ++z) {
      tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z, tileRange);
      tileResolution = tileGrid.getResolution(z);
      for (x = tileRange.minX; x <= tileRange.maxX; ++x) {
        for (y = tileRange.minY; y <= tileRange.maxY; ++y) {
          if (currentZ - z <= preload) {
            ++tileCount;
            tile = tileSource.getTile(z, x, y, pixelRatio, projection);
            if (tile.getState() == TileState_default.IDLE) {
              wantedTiles[tile.getKey()] = true;
              if (!tileQueue.isKeyQueued(tile.getKey())) {
                tileQueue.enqueue([
                  tile,
                  tileSourceKey,
                  tileGrid.getTileCoordCenter(tile.tileCoord),
                  tileResolution
                ]);
              }
            }
            if (opt_tileCallback !== void 0) {
              opt_tileCallback(tile);
            }
          } else {
            tileSource.useTile(z, x, y, projection);
          }
        }
      }
    }
    tileSource.updateCacheSize(tileCount, projection);
  };
  return CanvasTileLayerRenderer2;
}(Layer_default3);
var TileLayer_default = CanvasTileLayerRenderer;

// ../node_modules/ol/layer/Tile.js
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
var TileLayer = function(_super) {
  __extends19(TileLayer2, _super);
  function TileLayer2(opt_options) {
    return _super.call(this, opt_options) || this;
  }
  TileLayer2.prototype.createRenderer = function() {
    return new TileLayer_default(this);
  };
  return TileLayer2;
}(BaseTile_default);
var Tile_default3 = TileLayer;
export {
  Tile_default3 as default
};
