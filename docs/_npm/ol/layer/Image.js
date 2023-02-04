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

// ../node_modules/ol/layer/BaseImage.js
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
var BaseImageLayer = function(_super) {
  __extends7(BaseImageLayer2, _super);
  function BaseImageLayer2(opt_options) {
    var options = opt_options ? opt_options : {};
    return _super.call(this, options) || this;
  }
  return BaseImageLayer2;
}(Layer_default);
var BaseImage_default = BaseImageLayer;

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
function apply(transform, coordinate) {
  var x = coordinate[0];
  var y = coordinate[1];
  coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
  coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
  return coordinate;
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
function containsExtent(extent1, extent2) {
  return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
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
function getBottomLeft(extent) {
  return [extent[0], extent[1]];
}
function getBottomRight(extent) {
  return [extent[2], extent[1]];
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
  CanvasLayerRenderer2.prototype.useContainer = function(target, transform, opacity, opt_backgroundColor) {
    var layerClassName = this.getLayer().getClassName();
    var container, context;
    if (target && target.className === layerClassName && target.style.opacity === "" && opacity === 1 && (!opt_backgroundColor || target.style.backgroundColor && equals(asArray(target.style.backgroundColor), asArray(opt_backgroundColor)))) {
      var canvas = target.firstElementChild;
      if (canvas instanceof HTMLCanvasElement) {
        context = canvas.getContext("2d");
      }
    }
    if (context && context.canvas.style.transform === transform) {
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

// ../node_modules/ol/ViewHint.js
var ViewHint_default = {
  ANIMATING: 0,
  INTERACTING: 1
};

// ../node_modules/ol/reproj/common.js
var ENABLE_RASTER_REPROJECTION = true;

// ../node_modules/ol/renderer/canvas/common.js
var IMAGE_SMOOTHING_DISABLED = {
  imageSmoothingEnabled: false,
  msImageSmoothingEnabled: false
};
var IMAGE_SMOOTHING_ENABLED = {
  imageSmoothingEnabled: true,
  msImageSmoothingEnabled: true
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
var RADIUS = 6378137;
var HALF_SIZE = Math.PI * RADIUS;
var EXTENT = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
var WORLD_EXTENT = [-180, -85, 180, 85];
var MAX_SAFE_Y = RADIUS * Math.log(Math.tan(Math.PI / 2));
var EPSG3857Projection = function(_super) {
  __extends11(EPSG3857Projection2, _super);
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
var RADIUS2 = 6378137;
var EXTENT2 = [-180, -90, 180, 90];
var METERS_PER_UNIT2 = Math.PI * RADIUS2 / 180;
var EPSG4326Projection = function(_super) {
  __extends12(EPSG4326Projection2, _super);
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

// ../node_modules/ol/renderer/canvas/ImageLayer.js
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
var CanvasImageLayerRenderer = function(_super) {
  __extends13(CanvasImageLayerRenderer2, _super);
  function CanvasImageLayerRenderer2(imageLayer) {
    var _this = _super.call(this, imageLayer) || this;
    _this.image_ = null;
    return _this;
  }
  CanvasImageLayerRenderer2.prototype.getImage = function() {
    return !this.image_ ? null : this.image_.getImage();
  };
  CanvasImageLayerRenderer2.prototype.prepareFrame = function(frameState) {
    var layerState = frameState.layerStatesArray[frameState.layerIndex];
    var pixelRatio = frameState.pixelRatio;
    var viewState = frameState.viewState;
    var viewResolution = viewState.resolution;
    var imageSource = this.getLayer().getSource();
    var hints = frameState.viewHints;
    var renderedExtent = frameState.extent;
    if (layerState.extent !== void 0) {
      renderedExtent = getIntersection(renderedExtent, fromUserExtent(layerState.extent, viewState.projection));
    }
    if (!hints[ViewHint_default.ANIMATING] && !hints[ViewHint_default.INTERACTING] && !isEmpty2(renderedExtent)) {
      if (imageSource) {
        var projection = viewState.projection;
        if (!ENABLE_RASTER_REPROJECTION) {
          var sourceProjection = imageSource.getProjection();
          if (sourceProjection) {
            projection = sourceProjection;
          }
        }
        var image = imageSource.getImage(renderedExtent, viewResolution, pixelRatio, projection);
        if (image) {
          if (this.loadImage(image)) {
            this.image_ = image;
          } else if (image.getState() === ImageState_default.EMPTY) {
            this.image_ = null;
          }
        }
      } else {
        this.image_ = null;
      }
    }
    return !!this.image_;
  };
  CanvasImageLayerRenderer2.prototype.getData = function(pixel) {
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
    var imageExtent = this.image_.getExtent();
    var img = this.image_.getImage();
    var imageMapWidth = getWidth(imageExtent);
    var col = Math.floor(img.width * ((coordinate[0] - imageExtent[0]) / imageMapWidth));
    if (col < 0 || col >= img.width) {
      return null;
    }
    var imageMapHeight = getHeight(imageExtent);
    var row = Math.floor(img.height * ((imageExtent[3] - coordinate[1]) / imageMapHeight));
    if (row < 0 || row >= img.height) {
      return null;
    }
    return this.getImageData(img, col, row);
  };
  CanvasImageLayerRenderer2.prototype.renderFrame = function(frameState, target) {
    var image = this.image_;
    var imageExtent = image.getExtent();
    var imageResolution = image.getResolution();
    var imagePixelRatio = image.getPixelRatio();
    var layerState = frameState.layerStatesArray[frameState.layerIndex];
    var pixelRatio = frameState.pixelRatio;
    var viewState = frameState.viewState;
    var viewCenter = viewState.center;
    var viewResolution = viewState.resolution;
    var size = frameState.size;
    var scale = pixelRatio * imageResolution / (viewResolution * imagePixelRatio);
    var width = Math.round(size[0] * pixelRatio);
    var height = Math.round(size[1] * pixelRatio);
    var rotation = viewState.rotation;
    if (rotation) {
      var size_1 = Math.round(Math.sqrt(width * width + height * height));
      width = size_1;
      height = size_1;
    }
    compose(this.pixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / pixelRatio, 1 / pixelRatio, rotation, -width / 2, -height / 2);
    makeInverse(this.inversePixelTransform, this.pixelTransform);
    var canvasTransform = toString(this.pixelTransform);
    this.useContainer(target, canvasTransform, layerState.opacity, this.getBackground(frameState));
    var context = this.context;
    var canvas = context.canvas;
    if (canvas.width != width || canvas.height != height) {
      canvas.width = width;
      canvas.height = height;
    } else if (!this.containerReused) {
      context.clearRect(0, 0, width, height);
    }
    var clipped = false;
    var render = true;
    if (layerState.extent) {
      var layerExtent = fromUserExtent(layerState.extent, viewState.projection);
      render = intersects(layerExtent, frameState.extent);
      clipped = render && !containsExtent(layerExtent, frameState.extent);
      if (clipped) {
        this.clipUnrotated(context, frameState, layerExtent);
      }
    }
    var img = image.getImage();
    var transform = compose(this.tempTransform, width / 2, height / 2, scale, scale, 0, imagePixelRatio * (imageExtent[0] - viewCenter[0]) / imageResolution, imagePixelRatio * (viewCenter[1] - imageExtent[3]) / imageResolution);
    this.renderedResolution = imageResolution * pixelRatio / imagePixelRatio;
    var dw = img.width * transform[0];
    var dh = img.height * transform[3];
    if (!this.getLayer().getSource().getInterpolate()) {
      assign(context, IMAGE_SMOOTHING_DISABLED);
    }
    this.preRender(context, frameState);
    if (render && dw >= 0.5 && dh >= 0.5) {
      var dx = transform[4];
      var dy = transform[5];
      var opacity = layerState.opacity;
      var previousAlpha = void 0;
      if (opacity !== 1) {
        previousAlpha = context.globalAlpha;
        context.globalAlpha = opacity;
      }
      context.drawImage(img, 0, 0, +img.width, +img.height, Math.round(dx), Math.round(dy), Math.round(dw), Math.round(dh));
      if (opacity !== 1) {
        context.globalAlpha = previousAlpha;
      }
    }
    this.postRender(context, frameState);
    if (clipped) {
      context.restore();
    }
    assign(context, IMAGE_SMOOTHING_ENABLED);
    if (canvasTransform !== canvas.style.transform) {
      canvas.style.transform = canvasTransform;
    }
    return this.container;
  };
  return CanvasImageLayerRenderer2;
}(Layer_default3);
var ImageLayer_default = CanvasImageLayerRenderer;

// ../node_modules/ol/layer/Image.js
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
var ImageLayer = function(_super) {
  __extends14(ImageLayer2, _super);
  function ImageLayer2(opt_options) {
    return _super.call(this, opt_options) || this;
  }
  ImageLayer2.prototype.createRenderer = function() {
    return new ImageLayer_default(this);
  };
  ImageLayer2.prototype.getData = function(pixel) {
    return _super.prototype.getData.call(this, pixel);
  };
  return ImageLayer2;
}(BaseImage_default);
var Image_default = ImageLayer;
export {
  Image_default as default
};
