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
function isSorted(arr, opt_func, opt_strict) {
  var compare = opt_func || numberSafeCompareFunction;
  return arr.every(function(currentVal, index) {
    if (index === 0) {
      return true;
    }
    var res = compare(arr[index - 1], currentVal);
    return !(res > 0 || opt_strict && res === 0);
  });
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

// ../node_modules/ol/TileState.js
var TileState_default = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};

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

// ../node_modules/ol/easing.js
function easeIn(t) {
  return Math.pow(t, 3);
}

// ../node_modules/ol/Tile.js
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
var Tile = function(_super) {
  __extends2(Tile2, _super);
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

// ../node_modules/ol/ImageBase.js
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
var ImageBase = function(_super) {
  __extends3(ImageBase2, _super);
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

// ../node_modules/ol/ImageState.js
var ImageState_default = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};

// ../node_modules/ol/extent/Corner.js
var Corner_default = {
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right"
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

// ../node_modules/ol/extent.js
function boundingExtent(coordinates) {
  var extent = createEmpty();
  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    extendCoordinate(extent, coordinates[i]);
  }
  return extent;
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
function getCorner(extent, corner) {
  var coordinate;
  if (corner === Corner_default.BOTTOM_LEFT) {
    coordinate = getBottomLeft(extent);
  } else if (corner === Corner_default.BOTTOM_RIGHT) {
    coordinate = getBottomRight(extent);
  } else if (corner === Corner_default.TOP_LEFT) {
    coordinate = getTopLeft(extent);
  } else if (corner === Corner_default.TOP_RIGHT) {
    coordinate = getTopRight(extent);
  } else {
    assert(false, 13);
  }
  return coordinate;
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

// ../node_modules/ol/Image.js
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
var ImageWrapper = function(_super) {
  __extends5(ImageWrapper2, _super);
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
var ImageTile = function(_super) {
  __extends6(ImageTile2, _super);
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
var ENABLE_RASTER_REPROJECTION = true;

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
function toFixed(n, decimals) {
  var factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}
function floor(n, decimals) {
  return Math.floor(toFixed(n, decimals));
}
function ceil(n, decimals) {
  return Math.ceil(toFixed(n, decimals));
}

// ../node_modules/ol/proj/epsg3857.js
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
var RADIUS = 6378137;
var HALF_SIZE = Math.PI * RADIUS;
var EXTENT = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
var WORLD_EXTENT = [-180, -85, 180, 85];
var MAX_SAFE_Y = RADIUS * Math.log(Math.tan(Math.PI / 2));
var EPSG3857Projection = function(_super) {
  __extends7(EPSG3857Projection2, _super);
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
var RADIUS2 = 6378137;
var EXTENT2 = [-180, -90, 180, 90];
var METERS_PER_UNIT2 = Math.PI * RADIUS2 / 180;
var EPSG4326Projection = function(_super) {
  __extends8(EPSG4326Projection2, _super);
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
function equivalent(projection1, projection2) {
  if (projection1 === projection2) {
    return true;
  }
  var equalUnits = projection1.getUnits() === projection2.getUnits();
  if (projection1.getCode() === projection2.getCode()) {
    return equalUnits;
  } else {
    var transformFunc = getTransformFromProjections(projection1, projection2);
    return transformFunc === cloneTransform && equalUnits;
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
var ReprojTile = function(_super) {
  __extends9(ReprojTile2, _super);
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

// ../node_modules/ol/structs/LRUCache.js
var LRUCache = function() {
  function LRUCache2(opt_highWaterMark) {
    this.highWaterMark = opt_highWaterMark !== void 0 ? opt_highWaterMark : 2048;
    this.count_ = 0;
    this.entries_ = {};
    this.oldest_ = null;
    this.newest_ = null;
  }
  LRUCache2.prototype.canExpireCache = function() {
    return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
  };
  LRUCache2.prototype.expireCache = function(keep) {
    while (this.canExpireCache()) {
      this.pop();
    }
  };
  LRUCache2.prototype.clear = function() {
    this.count_ = 0;
    this.entries_ = {};
    this.oldest_ = null;
    this.newest_ = null;
  };
  LRUCache2.prototype.containsKey = function(key) {
    return this.entries_.hasOwnProperty(key);
  };
  LRUCache2.prototype.forEach = function(f) {
    var entry = this.oldest_;
    while (entry) {
      f(entry.value_, entry.key_, this);
      entry = entry.newer;
    }
  };
  LRUCache2.prototype.get = function(key, opt_options) {
    var entry = this.entries_[key];
    assert(entry !== void 0, 15);
    if (entry === this.newest_) {
      return entry.value_;
    } else if (entry === this.oldest_) {
      this.oldest_ = this.oldest_.newer;
      this.oldest_.older = null;
    } else {
      entry.newer.older = entry.older;
      entry.older.newer = entry.newer;
    }
    entry.newer = null;
    entry.older = this.newest_;
    this.newest_.newer = entry;
    this.newest_ = entry;
    return entry.value_;
  };
  LRUCache2.prototype.remove = function(key) {
    var entry = this.entries_[key];
    assert(entry !== void 0, 15);
    if (entry === this.newest_) {
      this.newest_ = entry.older;
      if (this.newest_) {
        this.newest_.newer = null;
      }
    } else if (entry === this.oldest_) {
      this.oldest_ = entry.newer;
      if (this.oldest_) {
        this.oldest_.older = null;
      }
    } else {
      entry.newer.older = entry.older;
      entry.older.newer = entry.newer;
    }
    delete this.entries_[key];
    --this.count_;
    return entry.value_;
  };
  LRUCache2.prototype.getCount = function() {
    return this.count_;
  };
  LRUCache2.prototype.getKeys = function() {
    var keys = new Array(this.count_);
    var i = 0;
    var entry;
    for (entry = this.newest_; entry; entry = entry.older) {
      keys[i++] = entry.key_;
    }
    return keys;
  };
  LRUCache2.prototype.getValues = function() {
    var values = new Array(this.count_);
    var i = 0;
    var entry;
    for (entry = this.newest_; entry; entry = entry.older) {
      values[i++] = entry.value_;
    }
    return values;
  };
  LRUCache2.prototype.peekLast = function() {
    return this.oldest_.value_;
  };
  LRUCache2.prototype.peekLastKey = function() {
    return this.oldest_.key_;
  };
  LRUCache2.prototype.peekFirstKey = function() {
    return this.newest_.key_;
  };
  LRUCache2.prototype.pop = function() {
    var entry = this.oldest_;
    delete this.entries_[entry.key_];
    if (entry.newer) {
      entry.newer.older = null;
    }
    this.oldest_ = entry.newer;
    if (!this.oldest_) {
      this.newest_ = null;
    }
    --this.count_;
    return entry.value_;
  };
  LRUCache2.prototype.replace = function(key, value) {
    this.get(key);
    this.entries_[key].value_ = value;
  };
  LRUCache2.prototype.set = function(key, value) {
    assert(!(key in this.entries_), 16);
    var entry = {
      key_: key,
      newer: null,
      older: this.newest_,
      value_: value
    };
    if (!this.newest_) {
      this.oldest_ = entry;
    } else {
      this.newest_.newer = entry;
    }
    this.newest_ = entry;
    this.entries_[key] = entry;
    ++this.count_;
  };
  LRUCache2.prototype.setSize = function(size) {
    this.highWaterMark = size;
  };
  return LRUCache2;
}();
var LRUCache_default = LRUCache;

// ../node_modules/ol/tilecoord.js
function createOrUpdate2(z, x, y, opt_tileCoord) {
  if (opt_tileCoord !== void 0) {
    opt_tileCoord[0] = z;
    opt_tileCoord[1] = x;
    opt_tileCoord[2] = y;
    return opt_tileCoord;
  } else {
    return [z, x, y];
  }
}
function getKeyZXY(z, x, y) {
  return z + "/" + x + "/" + y;
}
function getKey(tileCoord) {
  return getKeyZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
}
function fromKey(key) {
  return key.split("/").map(Number);
}
function hash(tileCoord) {
  return (tileCoord[1] << tileCoord[0]) + tileCoord[2];
}
function withinExtentAndZ(tileCoord, tileGrid) {
  var z = tileCoord[0];
  var x = tileCoord[1];
  var y = tileCoord[2];
  if (tileGrid.getMinZoom() > z || z > tileGrid.getMaxZoom()) {
    return false;
  }
  var tileRange = tileGrid.getFullTileRange(z);
  if (!tileRange) {
    return true;
  } else {
    return tileRange.containsXY(x, y);
  }
}

// ../node_modules/ol/TileCache.js
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
var TileCache = function(_super) {
  __extends10(TileCache2, _super);
  function TileCache2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  TileCache2.prototype.expireCache = function(usedTiles) {
    while (this.canExpireCache()) {
      var tile = this.peekLast();
      if (tile.getKey() in usedTiles) {
        break;
      } else {
        this.pop().release();
      }
    }
  };
  TileCache2.prototype.pruneExceptNewestZ = function() {
    if (this.getCount() === 0) {
      return;
    }
    var key = this.peekFirstKey();
    var tileCoord = fromKey(key);
    var z = tileCoord[0];
    this.forEach(function(tile) {
      if (tile.tileCoord[0] !== z) {
        this.remove(getKey(tile.tileCoord));
        tile.release();
      }
    }.bind(this));
  };
  return TileCache2;
}(LRUCache_default);
var TileCache_default = TileCache;

// ../node_modules/ol/source/TileEventType.js
var TileEventType_default = {
  TILELOADSTART: "tileloadstart",
  TILELOADEND: "tileloadend",
  TILELOADERROR: "tileloaderror"
};

// ../node_modules/ol/ObjectEventType.js
var ObjectEventType_default = {
  PROPERTYCHANGE: "propertychange"
};

// ../node_modules/ol/Observable.js
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
var Observable = function(_super) {
  __extends11(Observable2, _super);
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
var ObjectEvent = function(_super) {
  __extends12(ObjectEvent2, _super);
  function ObjectEvent2(type, key, oldValue) {
    var _this = _super.call(this, type) || this;
    _this.key = key;
    _this.oldValue = oldValue;
    return _this;
  }
  return ObjectEvent2;
}(Event_default);
var BaseObject = function(_super) {
  __extends12(BaseObject2, _super);
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

// ../node_modules/ol/source/State.js
var State_default = {
  UNDEFINED: "undefined",
  LOADING: "loading",
  READY: "ready",
  ERROR: "error"
};

// ../node_modules/ol/source/Source.js
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
var Source = function(_super) {
  __extends13(Source2, _super);
  function Source2(options) {
    var _this = _super.call(this) || this;
    _this.projection = get3(options.projection);
    _this.attributions_ = adaptAttributions(options.attributions);
    _this.attributionsCollapsible_ = options.attributionsCollapsible !== void 0 ? options.attributionsCollapsible : true;
    _this.loading = false;
    _this.state_ = options.state !== void 0 ? options.state : State_default.READY;
    _this.wrapX_ = options.wrapX !== void 0 ? options.wrapX : false;
    _this.interpolate_ = !!options.interpolate;
    _this.viewResolver = null;
    _this.viewRejector = null;
    var self2 = _this;
    _this.viewPromise_ = new Promise(function(resolve, reject) {
      self2.viewResolver = resolve;
      self2.viewRejector = reject;
    });
    return _this;
  }
  Source2.prototype.getAttributions = function() {
    return this.attributions_;
  };
  Source2.prototype.getAttributionsCollapsible = function() {
    return this.attributionsCollapsible_;
  };
  Source2.prototype.getProjection = function() {
    return this.projection;
  };
  Source2.prototype.getResolutions = function() {
    return abstract();
  };
  Source2.prototype.getView = function() {
    return this.viewPromise_;
  };
  Source2.prototype.getState = function() {
    return this.state_;
  };
  Source2.prototype.getWrapX = function() {
    return this.wrapX_;
  };
  Source2.prototype.getInterpolate = function() {
    return this.interpolate_;
  };
  Source2.prototype.refresh = function() {
    this.changed();
  };
  Source2.prototype.setAttributions = function(attributions) {
    this.attributions_ = adaptAttributions(attributions);
    this.changed();
  };
  Source2.prototype.setState = function(state) {
    this.state_ = state;
    this.changed();
  };
  return Source2;
}(Object_default);
function adaptAttributions(attributionLike) {
  if (!attributionLike) {
    return null;
  }
  if (Array.isArray(attributionLike)) {
    return function(frameState) {
      return attributionLike;
    };
  }
  if (typeof attributionLike === "function") {
    return attributionLike;
  }
  return function(frameState) {
    return [attributionLike];
  };
}
var Source_default = Source;

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
function createOrUpdate3(minX, maxX, minY, maxY, tileRange) {
  if (tileRange !== void 0) {
    tileRange.minX = minX;
    tileRange.maxX = maxX;
    tileRange.minY = minY;
    tileRange.maxY = maxY;
    return tileRange;
  } else {
    return new TileRange(minX, maxX, minY, maxY);
  }
}
var TileRange_default = TileRange;

// ../node_modules/ol/tilegrid/common.js
var DEFAULT_MAX_ZOOM = 42;
var DEFAULT_TILE_SIZE = 256;

// ../node_modules/ol/size.js
function scale(size, ratio, opt_size) {
  if (opt_size === void 0) {
    opt_size = [0, 0];
  }
  opt_size[0] = size[0] * ratio + 0.5 | 0;
  opt_size[1] = size[1] * ratio + 0.5 | 0;
  return opt_size;
}
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

// ../node_modules/ol/tilegrid/TileGrid.js
var tmpTileCoord = [0, 0, 0];
var DECIMALS = 5;
var TileGrid = function() {
  function TileGrid2(options) {
    this.minZoom = options.minZoom !== void 0 ? options.minZoom : 0;
    this.resolutions_ = options.resolutions;
    assert(isSorted(this.resolutions_, function(a, b) {
      return b - a;
    }, true), 17);
    var zoomFactor;
    if (!options.origins) {
      for (var i = 0, ii = this.resolutions_.length - 1; i < ii; ++i) {
        if (!zoomFactor) {
          zoomFactor = this.resolutions_[i] / this.resolutions_[i + 1];
        } else {
          if (this.resolutions_[i] / this.resolutions_[i + 1] !== zoomFactor) {
            zoomFactor = void 0;
            break;
          }
        }
      }
    }
    this.zoomFactor_ = zoomFactor;
    this.maxZoom = this.resolutions_.length - 1;
    this.origin_ = options.origin !== void 0 ? options.origin : null;
    this.origins_ = null;
    if (options.origins !== void 0) {
      this.origins_ = options.origins;
      assert(this.origins_.length == this.resolutions_.length, 20);
    }
    var extent = options.extent;
    if (extent !== void 0 && !this.origin_ && !this.origins_) {
      this.origin_ = getTopLeft(extent);
    }
    assert(!this.origin_ && this.origins_ || this.origin_ && !this.origins_, 18);
    this.tileSizes_ = null;
    if (options.tileSizes !== void 0) {
      this.tileSizes_ = options.tileSizes;
      assert(this.tileSizes_.length == this.resolutions_.length, 19);
    }
    this.tileSize_ = options.tileSize !== void 0 ? options.tileSize : !this.tileSizes_ ? DEFAULT_TILE_SIZE : null;
    assert(!this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_, 22);
    this.extent_ = extent !== void 0 ? extent : null;
    this.fullTileRanges_ = null;
    this.tmpSize_ = [0, 0];
    this.tmpExtent_ = [0, 0, 0, 0];
    if (options.sizes !== void 0) {
      this.fullTileRanges_ = options.sizes.map(function(size, z) {
        var tileRange = new TileRange_default(Math.min(0, size[0]), Math.max(size[0] - 1, -1), Math.min(0, size[1]), Math.max(size[1] - 1, -1));
        if (extent) {
          var restrictedTileRange = this.getTileRangeForExtentAndZ(extent, z);
          tileRange.minX = Math.max(restrictedTileRange.minX, tileRange.minX);
          tileRange.maxX = Math.min(restrictedTileRange.maxX, tileRange.maxX);
          tileRange.minY = Math.max(restrictedTileRange.minY, tileRange.minY);
          tileRange.maxY = Math.min(restrictedTileRange.maxY, tileRange.maxY);
        }
        return tileRange;
      }, this);
    } else if (extent) {
      this.calculateTileRanges_(extent);
    }
  }
  TileGrid2.prototype.forEachTileCoord = function(extent, zoom, callback) {
    var tileRange = this.getTileRangeForExtentAndZ(extent, zoom);
    for (var i = tileRange.minX, ii = tileRange.maxX; i <= ii; ++i) {
      for (var j = tileRange.minY, jj = tileRange.maxY; j <= jj; ++j) {
        callback([zoom, i, j]);
      }
    }
  };
  TileGrid2.prototype.forEachTileCoordParentTileRange = function(tileCoord, callback, opt_tileRange, opt_extent) {
    var tileRange, x, y;
    var tileCoordExtent = null;
    var z = tileCoord[0] - 1;
    if (this.zoomFactor_ === 2) {
      x = tileCoord[1];
      y = tileCoord[2];
    } else {
      tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent);
    }
    while (z >= this.minZoom) {
      if (this.zoomFactor_ === 2) {
        x = Math.floor(x / 2);
        y = Math.floor(y / 2);
        tileRange = createOrUpdate3(x, x, y, y, opt_tileRange);
      } else {
        tileRange = this.getTileRangeForExtentAndZ(tileCoordExtent, z, opt_tileRange);
      }
      if (callback(z, tileRange)) {
        return true;
      }
      --z;
    }
    return false;
  };
  TileGrid2.prototype.getExtent = function() {
    return this.extent_;
  };
  TileGrid2.prototype.getMaxZoom = function() {
    return this.maxZoom;
  };
  TileGrid2.prototype.getMinZoom = function() {
    return this.minZoom;
  };
  TileGrid2.prototype.getOrigin = function(z) {
    if (this.origin_) {
      return this.origin_;
    } else {
      return this.origins_[z];
    }
  };
  TileGrid2.prototype.getResolution = function(z) {
    return this.resolutions_[z];
  };
  TileGrid2.prototype.getResolutions = function() {
    return this.resolutions_;
  };
  TileGrid2.prototype.getTileCoordChildTileRange = function(tileCoord, opt_tileRange, opt_extent) {
    if (tileCoord[0] < this.maxZoom) {
      if (this.zoomFactor_ === 2) {
        var minX = tileCoord[1] * 2;
        var minY = tileCoord[2] * 2;
        return createOrUpdate3(minX, minX + 1, minY, minY + 1, opt_tileRange);
      }
      var tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent || this.tmpExtent_);
      return this.getTileRangeForExtentAndZ(tileCoordExtent, tileCoord[0] + 1, opt_tileRange);
    }
    return null;
  };
  TileGrid2.prototype.getTileRangeForTileCoordAndZ = function(tileCoord, z, opt_tileRange) {
    if (z > this.maxZoom || z < this.minZoom) {
      return null;
    }
    var tileCoordZ = tileCoord[0];
    var tileCoordX = tileCoord[1];
    var tileCoordY = tileCoord[2];
    if (z === tileCoordZ) {
      return createOrUpdate3(tileCoordX, tileCoordY, tileCoordX, tileCoordY, opt_tileRange);
    }
    if (this.zoomFactor_) {
      var factor = Math.pow(this.zoomFactor_, z - tileCoordZ);
      var minX = Math.floor(tileCoordX * factor);
      var minY = Math.floor(tileCoordY * factor);
      if (z < tileCoordZ) {
        return createOrUpdate3(minX, minX, minY, minY, opt_tileRange);
      }
      var maxX = Math.floor(factor * (tileCoordX + 1)) - 1;
      var maxY = Math.floor(factor * (tileCoordY + 1)) - 1;
      return createOrUpdate3(minX, maxX, minY, maxY, opt_tileRange);
    }
    var tileCoordExtent = this.getTileCoordExtent(tileCoord, this.tmpExtent_);
    return this.getTileRangeForExtentAndZ(tileCoordExtent, z, opt_tileRange);
  };
  TileGrid2.prototype.getTileRangeExtent = function(z, tileRange, opt_extent) {
    var origin = this.getOrigin(z);
    var resolution = this.getResolution(z);
    var tileSize = toSize(this.getTileSize(z), this.tmpSize_);
    var minX = origin[0] + tileRange.minX * tileSize[0] * resolution;
    var maxX = origin[0] + (tileRange.maxX + 1) * tileSize[0] * resolution;
    var minY = origin[1] + tileRange.minY * tileSize[1] * resolution;
    var maxY = origin[1] + (tileRange.maxY + 1) * tileSize[1] * resolution;
    return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
  };
  TileGrid2.prototype.getTileRangeForExtentAndZ = function(extent, z, opt_tileRange) {
    var tileCoord = tmpTileCoord;
    this.getTileCoordForXYAndZ_(extent[0], extent[3], z, false, tileCoord);
    var minX = tileCoord[1];
    var minY = tileCoord[2];
    this.getTileCoordForXYAndZ_(extent[2], extent[1], z, true, tileCoord);
    return createOrUpdate3(minX, tileCoord[1], minY, tileCoord[2], opt_tileRange);
  };
  TileGrid2.prototype.getTileCoordCenter = function(tileCoord) {
    var origin = this.getOrigin(tileCoord[0]);
    var resolution = this.getResolution(tileCoord[0]);
    var tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
    return [
      origin[0] + (tileCoord[1] + 0.5) * tileSize[0] * resolution,
      origin[1] - (tileCoord[2] + 0.5) * tileSize[1] * resolution
    ];
  };
  TileGrid2.prototype.getTileCoordExtent = function(tileCoord, opt_extent) {
    var origin = this.getOrigin(tileCoord[0]);
    var resolution = this.getResolution(tileCoord[0]);
    var tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
    var minX = origin[0] + tileCoord[1] * tileSize[0] * resolution;
    var minY = origin[1] - (tileCoord[2] + 1) * tileSize[1] * resolution;
    var maxX = minX + tileSize[0] * resolution;
    var maxY = minY + tileSize[1] * resolution;
    return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
  };
  TileGrid2.prototype.getTileCoordForCoordAndResolution = function(coordinate, resolution, opt_tileCoord) {
    return this.getTileCoordForXYAndResolution_(coordinate[0], coordinate[1], resolution, false, opt_tileCoord);
  };
  TileGrid2.prototype.getTileCoordForXYAndResolution_ = function(x, y, resolution, reverseIntersectionPolicy, opt_tileCoord) {
    var z = this.getZForResolution(resolution);
    var scale2 = resolution / this.getResolution(z);
    var origin = this.getOrigin(z);
    var tileSize = toSize(this.getTileSize(z), this.tmpSize_);
    var tileCoordX = scale2 * (x - origin[0]) / resolution / tileSize[0];
    var tileCoordY = scale2 * (origin[1] - y) / resolution / tileSize[1];
    if (reverseIntersectionPolicy) {
      tileCoordX = ceil(tileCoordX, DECIMALS) - 1;
      tileCoordY = ceil(tileCoordY, DECIMALS) - 1;
    } else {
      tileCoordX = floor(tileCoordX, DECIMALS);
      tileCoordY = floor(tileCoordY, DECIMALS);
    }
    return createOrUpdate2(z, tileCoordX, tileCoordY, opt_tileCoord);
  };
  TileGrid2.prototype.getTileCoordForXYAndZ_ = function(x, y, z, reverseIntersectionPolicy, opt_tileCoord) {
    var origin = this.getOrigin(z);
    var resolution = this.getResolution(z);
    var tileSize = toSize(this.getTileSize(z), this.tmpSize_);
    var tileCoordX = (x - origin[0]) / resolution / tileSize[0];
    var tileCoordY = (origin[1] - y) / resolution / tileSize[1];
    if (reverseIntersectionPolicy) {
      tileCoordX = ceil(tileCoordX, DECIMALS) - 1;
      tileCoordY = ceil(tileCoordY, DECIMALS) - 1;
    } else {
      tileCoordX = floor(tileCoordX, DECIMALS);
      tileCoordY = floor(tileCoordY, DECIMALS);
    }
    return createOrUpdate2(z, tileCoordX, tileCoordY, opt_tileCoord);
  };
  TileGrid2.prototype.getTileCoordForCoordAndZ = function(coordinate, z, opt_tileCoord) {
    return this.getTileCoordForXYAndZ_(coordinate[0], coordinate[1], z, false, opt_tileCoord);
  };
  TileGrid2.prototype.getTileCoordResolution = function(tileCoord) {
    return this.resolutions_[tileCoord[0]];
  };
  TileGrid2.prototype.getTileSize = function(z) {
    if (this.tileSize_) {
      return this.tileSize_;
    } else {
      return this.tileSizes_[z];
    }
  };
  TileGrid2.prototype.getFullTileRange = function(z) {
    if (!this.fullTileRanges_) {
      return this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, z) : null;
    } else {
      return this.fullTileRanges_[z];
    }
  };
  TileGrid2.prototype.getZForResolution = function(resolution, opt_direction) {
    var z = linearFindNearest(this.resolutions_, resolution, opt_direction || 0);
    return clamp(z, this.minZoom, this.maxZoom);
  };
  TileGrid2.prototype.calculateTileRanges_ = function(extent) {
    var length = this.resolutions_.length;
    var fullTileRanges = new Array(length);
    for (var z = this.minZoom; z < length; ++z) {
      fullTileRanges[z] = this.getTileRangeForExtentAndZ(extent, z);
    }
    this.fullTileRanges_ = fullTileRanges;
  };
  return TileGrid2;
}();
var TileGrid_default = TileGrid;

// ../node_modules/ol/tilegrid.js
function getForProjection(projection) {
  var tileGrid = projection.getDefaultTileGrid();
  if (!tileGrid) {
    tileGrid = createForProjection(projection);
    projection.setDefaultTileGrid(tileGrid);
  }
  return tileGrid;
}
function wrapX(tileGrid, tileCoord, projection) {
  var z = tileCoord[0];
  var center = tileGrid.getTileCoordCenter(tileCoord);
  var projectionExtent = extentFromProjection(projection);
  if (!containsCoordinate(projectionExtent, center)) {
    var worldWidth = getWidth(projectionExtent);
    var worldsAway = Math.ceil((projectionExtent[0] - center[0]) / worldWidth);
    center[0] += worldWidth * worldsAway;
    return tileGrid.getTileCoordForCoordAndZ(center, z);
  } else {
    return tileCoord;
  }
}
function createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner) {
  var corner = opt_corner !== void 0 ? opt_corner : Corner_default.TOP_LEFT;
  var resolutions = resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize);
  return new TileGrid_default({
    extent,
    origin: getCorner(extent, corner),
    resolutions,
    tileSize: opt_tileSize
  });
}
function createXYZ(opt_options) {
  var xyzOptions = opt_options || {};
  var extent = xyzOptions.extent || get3("EPSG:3857").getExtent();
  var gridOptions = {
    extent,
    minZoom: xyzOptions.minZoom,
    tileSize: xyzOptions.tileSize,
    resolutions: resolutionsFromExtent(extent, xyzOptions.maxZoom, xyzOptions.tileSize, xyzOptions.maxResolution)
  };
  return new TileGrid_default(gridOptions);
}
function resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize, opt_maxResolution) {
  var maxZoom = opt_maxZoom !== void 0 ? opt_maxZoom : DEFAULT_MAX_ZOOM;
  var height = getHeight(extent);
  var width = getWidth(extent);
  var tileSize = toSize(opt_tileSize !== void 0 ? opt_tileSize : DEFAULT_TILE_SIZE);
  var maxResolution = opt_maxResolution > 0 ? opt_maxResolution : Math.max(width / tileSize[0], height / tileSize[1]);
  var length = maxZoom + 1;
  var resolutions = new Array(length);
  for (var z = 0; z < length; ++z) {
    resolutions[z] = maxResolution / Math.pow(2, z);
  }
  return resolutions;
}
function createForProjection(projection, opt_maxZoom, opt_tileSize, opt_corner) {
  var extent = extentFromProjection(projection);
  return createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner);
}
function extentFromProjection(projection) {
  projection = get3(projection);
  var extent = projection.getExtent();
  if (!extent) {
    var half = 180 * METERS_PER_UNIT[Units_default.DEGREES] / projection.getMetersPerUnit();
    extent = createOrUpdate(-half, -half, half, half);
  }
  return extent;
}

// ../node_modules/ol/source/Tile.js
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
var TileSource = function(_super) {
  __extends14(TileSource2, _super);
  function TileSource2(options) {
    var _this = _super.call(this, {
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      projection: options.projection,
      state: options.state,
      wrapX: options.wrapX,
      interpolate: options.interpolate
    }) || this;
    _this.on;
    _this.once;
    _this.un;
    _this.opaque_ = options.opaque !== void 0 ? options.opaque : false;
    _this.tilePixelRatio_ = options.tilePixelRatio !== void 0 ? options.tilePixelRatio : 1;
    _this.tileGrid = options.tileGrid !== void 0 ? options.tileGrid : null;
    var tileSize = [256, 256];
    if (_this.tileGrid) {
      toSize(_this.tileGrid.getTileSize(_this.tileGrid.getMinZoom()), tileSize);
    }
    _this.tileCache = new TileCache_default(options.cacheSize || 0);
    _this.tmpSize = [0, 0];
    _this.key_ = options.key || "";
    _this.tileOptions = {
      transition: options.transition,
      interpolate: options.interpolate
    };
    _this.zDirection = options.zDirection ? options.zDirection : 0;
    return _this;
  }
  TileSource2.prototype.canExpireCache = function() {
    return this.tileCache.canExpireCache();
  };
  TileSource2.prototype.expireCache = function(projection, usedTiles) {
    var tileCache = this.getTileCacheForProjection(projection);
    if (tileCache) {
      tileCache.expireCache(usedTiles);
    }
  };
  TileSource2.prototype.forEachLoadedTile = function(projection, z, tileRange, callback) {
    var tileCache = this.getTileCacheForProjection(projection);
    if (!tileCache) {
      return false;
    }
    var covered = true;
    var tile, tileCoordKey, loaded;
    for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
      for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
        tileCoordKey = getKeyZXY(z, x, y);
        loaded = false;
        if (tileCache.containsKey(tileCoordKey)) {
          tile = tileCache.get(tileCoordKey);
          loaded = tile.getState() === TileState_default.LOADED;
          if (loaded) {
            loaded = callback(tile) !== false;
          }
        }
        if (!loaded) {
          covered = false;
        }
      }
    }
    return covered;
  };
  TileSource2.prototype.getGutterForProjection = function(projection) {
    return 0;
  };
  TileSource2.prototype.getKey = function() {
    return this.key_;
  };
  TileSource2.prototype.setKey = function(key) {
    if (this.key_ !== key) {
      this.key_ = key;
      this.changed();
    }
  };
  TileSource2.prototype.getOpaque = function(projection) {
    return this.opaque_;
  };
  TileSource2.prototype.getResolutions = function() {
    if (!this.tileGrid) {
      return null;
    }
    return this.tileGrid.getResolutions();
  };
  TileSource2.prototype.getTile = function(z, x, y, pixelRatio, projection) {
    return abstract();
  };
  TileSource2.prototype.getTileGrid = function() {
    return this.tileGrid;
  };
  TileSource2.prototype.getTileGridForProjection = function(projection) {
    if (!this.tileGrid) {
      return getForProjection(projection);
    } else {
      return this.tileGrid;
    }
  };
  TileSource2.prototype.getTileCacheForProjection = function(projection) {
    assert(equivalent(this.getProjection(), projection), 68);
    return this.tileCache;
  };
  TileSource2.prototype.getTilePixelRatio = function(pixelRatio) {
    return this.tilePixelRatio_;
  };
  TileSource2.prototype.getTilePixelSize = function(z, pixelRatio, projection) {
    var tileGrid = this.getTileGridForProjection(projection);
    var tilePixelRatio = this.getTilePixelRatio(pixelRatio);
    var tileSize = toSize(tileGrid.getTileSize(z), this.tmpSize);
    if (tilePixelRatio == 1) {
      return tileSize;
    } else {
      return scale(tileSize, tilePixelRatio, this.tmpSize);
    }
  };
  TileSource2.prototype.getTileCoordForTileUrlFunction = function(tileCoord, opt_projection) {
    var projection = opt_projection !== void 0 ? opt_projection : this.getProjection();
    var tileGrid = this.getTileGridForProjection(projection);
    if (this.getWrapX() && projection.isGlobal()) {
      tileCoord = wrapX(tileGrid, tileCoord, projection);
    }
    return withinExtentAndZ(tileCoord, tileGrid) ? tileCoord : null;
  };
  TileSource2.prototype.clear = function() {
    this.tileCache.clear();
  };
  TileSource2.prototype.refresh = function() {
    this.clear();
    _super.prototype.refresh.call(this);
  };
  TileSource2.prototype.updateCacheSize = function(tileCount, projection) {
    var tileCache = this.getTileCacheForProjection(projection);
    if (tileCount > tileCache.highWaterMark) {
      tileCache.highWaterMark = tileCount;
    }
  };
  TileSource2.prototype.useTile = function(z, x, y, projection) {
  };
  return TileSource2;
}(Source_default);
var TileSourceEvent = function(_super) {
  __extends14(TileSourceEvent2, _super);
  function TileSourceEvent2(type, tile) {
    var _this = _super.call(this, type) || this;
    _this.tile = tile;
    return _this;
  }
  return TileSourceEvent2;
}(Event_default);
var Tile_default3 = TileSource;

// ../node_modules/ol/tileurlfunction.js
function createFromTemplate(template, tileGrid) {
  var zRegEx = /\{z\}/g;
  var xRegEx = /\{x\}/g;
  var yRegEx = /\{y\}/g;
  var dashYRegEx = /\{-y\}/g;
  return function(tileCoord, pixelRatio, projection) {
    if (!tileCoord) {
      return void 0;
    } else {
      return template.replace(zRegEx, tileCoord[0].toString()).replace(xRegEx, tileCoord[1].toString()).replace(yRegEx, tileCoord[2].toString()).replace(dashYRegEx, function() {
        var z = tileCoord[0];
        var range = tileGrid.getFullTileRange(z);
        assert(range, 55);
        var y = range.getHeight() - tileCoord[2] - 1;
        return y.toString();
      });
    }
  };
}
function createFromTemplates(templates, tileGrid) {
  var len = templates.length;
  var tileUrlFunctions = new Array(len);
  for (var i = 0; i < len; ++i) {
    tileUrlFunctions[i] = createFromTemplate(templates[i], tileGrid);
  }
  return createFromTileUrlFunctions(tileUrlFunctions);
}
function createFromTileUrlFunctions(tileUrlFunctions) {
  if (tileUrlFunctions.length === 1) {
    return tileUrlFunctions[0];
  }
  return function(tileCoord, pixelRatio, projection) {
    if (!tileCoord) {
      return void 0;
    } else {
      var h = hash(tileCoord);
      var index = modulo(h, tileUrlFunctions.length);
      return tileUrlFunctions[index](tileCoord, pixelRatio, projection);
    }
  };
}
function expandUrl(url) {
  var urls = [];
  var match = /\{([a-z])-([a-z])\}/.exec(url);
  if (match) {
    var startCharCode = match[1].charCodeAt(0);
    var stopCharCode = match[2].charCodeAt(0);
    var charCode = void 0;
    for (charCode = startCharCode; charCode <= stopCharCode; ++charCode) {
      urls.push(url.replace(match[0], String.fromCharCode(charCode)));
    }
    return urls;
  }
  match = /\{(\d+)-(\d+)\}/.exec(url);
  if (match) {
    var stop_1 = parseInt(match[2], 10);
    for (var i = parseInt(match[1], 10); i <= stop_1; i++) {
      urls.push(url.replace(match[0], i.toString()));
    }
    return urls;
  }
  urls.push(url);
  return urls;
}

// ../node_modules/ol/source/UrlTile.js
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
var UrlTile = function(_super) {
  __extends15(UrlTile2, _super);
  function UrlTile2(options) {
    var _this = _super.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      opaque: options.opaque,
      projection: options.projection,
      state: options.state,
      tileGrid: options.tileGrid,
      tilePixelRatio: options.tilePixelRatio,
      wrapX: options.wrapX,
      transition: options.transition,
      interpolate: options.interpolate,
      key: options.key,
      attributionsCollapsible: options.attributionsCollapsible,
      zDirection: options.zDirection
    }) || this;
    _this.generateTileUrlFunction_ = _this.tileUrlFunction === UrlTile2.prototype.tileUrlFunction;
    _this.tileLoadFunction = options.tileLoadFunction;
    if (options.tileUrlFunction) {
      _this.tileUrlFunction = options.tileUrlFunction;
    }
    _this.urls = null;
    if (options.urls) {
      _this.setUrls(options.urls);
    } else if (options.url) {
      _this.setUrl(options.url);
    }
    _this.tileLoadingKeys_ = {};
    return _this;
  }
  UrlTile2.prototype.getTileLoadFunction = function() {
    return this.tileLoadFunction;
  };
  UrlTile2.prototype.getTileUrlFunction = function() {
    return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
  };
  UrlTile2.prototype.getUrls = function() {
    return this.urls;
  };
  UrlTile2.prototype.handleTileChange = function(event) {
    var tile = event.target;
    var uid = getUid(tile);
    var tileState = tile.getState();
    var type;
    if (tileState == TileState_default.LOADING) {
      this.tileLoadingKeys_[uid] = true;
      type = TileEventType_default.TILELOADSTART;
    } else if (uid in this.tileLoadingKeys_) {
      delete this.tileLoadingKeys_[uid];
      type = tileState == TileState_default.ERROR ? TileEventType_default.TILELOADERROR : tileState == TileState_default.LOADED ? TileEventType_default.TILELOADEND : void 0;
    }
    if (type != void 0) {
      this.dispatchEvent(new TileSourceEvent(type, tile));
    }
  };
  UrlTile2.prototype.setTileLoadFunction = function(tileLoadFunction) {
    this.tileCache.clear();
    this.tileLoadFunction = tileLoadFunction;
    this.changed();
  };
  UrlTile2.prototype.setTileUrlFunction = function(tileUrlFunction, key) {
    this.tileUrlFunction = tileUrlFunction;
    this.tileCache.pruneExceptNewestZ();
    if (typeof key !== "undefined") {
      this.setKey(key);
    } else {
      this.changed();
    }
  };
  UrlTile2.prototype.setUrl = function(url) {
    var urls = expandUrl(url);
    this.urls = urls;
    this.setUrls(urls);
  };
  UrlTile2.prototype.setUrls = function(urls) {
    this.urls = urls;
    var key = urls.join("\n");
    if (this.generateTileUrlFunction_) {
      this.setTileUrlFunction(createFromTemplates(urls, this.tileGrid), key);
    } else {
      this.setKey(key);
    }
  };
  UrlTile2.prototype.tileUrlFunction = function(tileCoord, pixelRatio, projection) {
    return void 0;
  };
  UrlTile2.prototype.useTile = function(z, x, y) {
    var tileCoordKey = getKeyZXY(z, x, y);
    if (this.tileCache.containsKey(tileCoordKey)) {
      this.tileCache.get(tileCoordKey);
    }
  };
  return UrlTile2;
}(Tile_default3);
var UrlTile_default = UrlTile;

// ../node_modules/ol/source/TileImage.js
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
var TileImage = function(_super) {
  __extends16(TileImage2, _super);
  function TileImage2(options) {
    var _this = this;
    var interpolate = options.imageSmoothing !== void 0 ? options.imageSmoothing : true;
    if (options.interpolate !== void 0) {
      interpolate = options.interpolate;
    }
    _this = _super.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      opaque: options.opaque,
      projection: options.projection,
      state: options.state,
      tileGrid: options.tileGrid,
      tileLoadFunction: options.tileLoadFunction ? options.tileLoadFunction : defaultTileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      tileUrlFunction: options.tileUrlFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX,
      transition: options.transition,
      interpolate,
      key: options.key,
      attributionsCollapsible: options.attributionsCollapsible,
      zDirection: options.zDirection
    }) || this;
    _this.crossOrigin = options.crossOrigin !== void 0 ? options.crossOrigin : null;
    _this.tileClass = options.tileClass !== void 0 ? options.tileClass : ImageTile_default;
    _this.tileCacheForProjection = {};
    _this.tileGridForProjection = {};
    _this.reprojectionErrorThreshold_ = options.reprojectionErrorThreshold;
    _this.renderReprojectionEdges_ = false;
    return _this;
  }
  TileImage2.prototype.canExpireCache = function() {
    if (!ENABLE_RASTER_REPROJECTION) {
      return _super.prototype.canExpireCache.call(this);
    }
    if (this.tileCache.canExpireCache()) {
      return true;
    } else {
      for (var key in this.tileCacheForProjection) {
        if (this.tileCacheForProjection[key].canExpireCache()) {
          return true;
        }
      }
    }
    return false;
  };
  TileImage2.prototype.expireCache = function(projection, usedTiles) {
    if (!ENABLE_RASTER_REPROJECTION) {
      _super.prototype.expireCache.call(this, projection, usedTiles);
      return;
    }
    var usedTileCache = this.getTileCacheForProjection(projection);
    this.tileCache.expireCache(this.tileCache == usedTileCache ? usedTiles : {});
    for (var id in this.tileCacheForProjection) {
      var tileCache = this.tileCacheForProjection[id];
      tileCache.expireCache(tileCache == usedTileCache ? usedTiles : {});
    }
  };
  TileImage2.prototype.getGutterForProjection = function(projection) {
    if (ENABLE_RASTER_REPROJECTION && this.getProjection() && projection && !equivalent(this.getProjection(), projection)) {
      return 0;
    } else {
      return this.getGutter();
    }
  };
  TileImage2.prototype.getGutter = function() {
    return 0;
  };
  TileImage2.prototype.getKey = function() {
    var key = _super.prototype.getKey.call(this);
    if (!this.getInterpolate()) {
      key += ":disable-interpolation";
    }
    return key;
  };
  TileImage2.prototype.getOpaque = function(projection) {
    if (ENABLE_RASTER_REPROJECTION && this.getProjection() && projection && !equivalent(this.getProjection(), projection)) {
      return false;
    } else {
      return _super.prototype.getOpaque.call(this, projection);
    }
  };
  TileImage2.prototype.getTileGridForProjection = function(projection) {
    if (!ENABLE_RASTER_REPROJECTION) {
      return _super.prototype.getTileGridForProjection.call(this, projection);
    }
    var thisProj = this.getProjection();
    if (this.tileGrid && (!thisProj || equivalent(thisProj, projection))) {
      return this.tileGrid;
    } else {
      var projKey = getUid(projection);
      if (!(projKey in this.tileGridForProjection)) {
        this.tileGridForProjection[projKey] = getForProjection(projection);
      }
      return this.tileGridForProjection[projKey];
    }
  };
  TileImage2.prototype.getTileCacheForProjection = function(projection) {
    if (!ENABLE_RASTER_REPROJECTION) {
      return _super.prototype.getTileCacheForProjection.call(this, projection);
    }
    var thisProj = this.getProjection();
    if (!thisProj || equivalent(thisProj, projection)) {
      return this.tileCache;
    } else {
      var projKey = getUid(projection);
      if (!(projKey in this.tileCacheForProjection)) {
        this.tileCacheForProjection[projKey] = new TileCache_default(this.tileCache.highWaterMark);
      }
      return this.tileCacheForProjection[projKey];
    }
  };
  TileImage2.prototype.createTile_ = function(z, x, y, pixelRatio, projection, key) {
    var tileCoord = [z, x, y];
    var urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
    var tileUrl = urlTileCoord ? this.tileUrlFunction(urlTileCoord, pixelRatio, projection) : void 0;
    var tile = new this.tileClass(tileCoord, tileUrl !== void 0 ? TileState_default.IDLE : TileState_default.EMPTY, tileUrl !== void 0 ? tileUrl : "", this.crossOrigin, this.tileLoadFunction, this.tileOptions);
    tile.key = key;
    tile.addEventListener(EventType_default.CHANGE, this.handleTileChange.bind(this));
    return tile;
  };
  TileImage2.prototype.getTile = function(z, x, y, pixelRatio, projection) {
    var sourceProjection = this.getProjection();
    if (!ENABLE_RASTER_REPROJECTION || !sourceProjection || !projection || equivalent(sourceProjection, projection)) {
      return this.getTileInternal(z, x, y, pixelRatio, sourceProjection || projection);
    } else {
      var cache2 = this.getTileCacheForProjection(projection);
      var tileCoord = [z, x, y];
      var tile = void 0;
      var tileCoordKey = getKey(tileCoord);
      if (cache2.containsKey(tileCoordKey)) {
        tile = cache2.get(tileCoordKey);
      }
      var key = this.getKey();
      if (tile && tile.key == key) {
        return tile;
      } else {
        var sourceTileGrid = this.getTileGridForProjection(sourceProjection);
        var targetTileGrid = this.getTileGridForProjection(projection);
        var wrappedTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
        var newTile = new Tile_default2(sourceProjection, sourceTileGrid, projection, targetTileGrid, tileCoord, wrappedTileCoord, this.getTilePixelRatio(pixelRatio), this.getGutter(), function(z2, x2, y2, pixelRatio2) {
          return this.getTileInternal(z2, x2, y2, pixelRatio2, sourceProjection);
        }.bind(this), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_, this.getInterpolate());
        newTile.key = key;
        if (tile) {
          newTile.interimTile = tile;
          newTile.refreshInterimChain();
          cache2.replace(tileCoordKey, newTile);
        } else {
          cache2.set(tileCoordKey, newTile);
        }
        return newTile;
      }
    }
  };
  TileImage2.prototype.getTileInternal = function(z, x, y, pixelRatio, projection) {
    var tile = null;
    var tileCoordKey = getKeyZXY(z, x, y);
    var key = this.getKey();
    if (!this.tileCache.containsKey(tileCoordKey)) {
      tile = this.createTile_(z, x, y, pixelRatio, projection, key);
      this.tileCache.set(tileCoordKey, tile);
    } else {
      tile = this.tileCache.get(tileCoordKey);
      if (tile.key != key) {
        var interimTile = tile;
        tile = this.createTile_(z, x, y, pixelRatio, projection, key);
        if (interimTile.getState() == TileState_default.IDLE) {
          tile.interimTile = interimTile.interimTile;
        } else {
          tile.interimTile = interimTile;
        }
        tile.refreshInterimChain();
        this.tileCache.replace(tileCoordKey, tile);
      }
    }
    return tile;
  };
  TileImage2.prototype.setRenderReprojectionEdges = function(render2) {
    if (!ENABLE_RASTER_REPROJECTION || this.renderReprojectionEdges_ == render2) {
      return;
    }
    this.renderReprojectionEdges_ = render2;
    for (var id in this.tileCacheForProjection) {
      this.tileCacheForProjection[id].clear();
    }
    this.changed();
  };
  TileImage2.prototype.setTileGridForProjection = function(projection, tilegrid) {
    if (ENABLE_RASTER_REPROJECTION) {
      var proj = get3(projection);
      if (proj) {
        var projKey = getUid(proj);
        if (!(projKey in this.tileGridForProjection)) {
          this.tileGridForProjection[projKey] = tilegrid;
        }
      }
    }
  };
  return TileImage2;
}(UrlTile_default);
function defaultTileLoadFunction(imageTile, src) {
  imageTile.getImage().src = src;
}
var TileImage_default = TileImage;

// ../node_modules/ol/source/XYZ.js
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
var XYZ = function(_super) {
  __extends17(XYZ2, _super);
  function XYZ2(opt_options) {
    var options = opt_options || {};
    var interpolate = options.imageSmoothing !== void 0 ? options.imageSmoothing : true;
    if (options.interpolate !== void 0) {
      interpolate = options.interpolate;
    }
    var projection = options.projection !== void 0 ? options.projection : "EPSG:3857";
    var tileGrid = options.tileGrid !== void 0 ? options.tileGrid : createXYZ({
      extent: extentFromProjection(projection),
      maxResolution: options.maxResolution,
      maxZoom: options.maxZoom,
      minZoom: options.minZoom,
      tileSize: options.tileSize
    });
    return _super.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      interpolate,
      opaque: options.opaque,
      projection,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileGrid,
      tileLoadFunction: options.tileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      tileUrlFunction: options.tileUrlFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX !== void 0 ? options.wrapX : true,
      transition: options.transition,
      attributionsCollapsible: options.attributionsCollapsible,
      zDirection: options.zDirection
    }) || this;
  }
  return XYZ2;
}(TileImage_default);
var XYZ_default = XYZ;

// ../node_modules/ol/source/OSM.js
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
var ATTRIBUTION = '&#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.';
var OSM = function(_super) {
  __extends18(OSM2, _super);
  function OSM2(opt_options) {
    var options = opt_options || {};
    var interpolate = options.imageSmoothing !== void 0 ? options.imageSmoothing : true;
    if (options.interpolate !== void 0) {
      interpolate = options.interpolate;
    }
    var attributions;
    if (options.attributions !== void 0) {
      attributions = options.attributions;
    } else {
      attributions = [ATTRIBUTION];
    }
    var crossOrigin = options.crossOrigin !== void 0 ? options.crossOrigin : "anonymous";
    var url = options.url !== void 0 ? options.url : "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    return _super.call(this, {
      attributions,
      attributionsCollapsible: false,
      cacheSize: options.cacheSize,
      crossOrigin,
      interpolate,
      maxZoom: options.maxZoom !== void 0 ? options.maxZoom : 19,
      opaque: options.opaque !== void 0 ? options.opaque : true,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileLoadFunction: options.tileLoadFunction,
      transition: options.transition,
      url,
      wrapX: options.wrapX,
      zDirection: options.zDirection
    }) || this;
  }
  return OSM2;
}(XYZ_default);
var OSM_default = OSM;
export {
  ATTRIBUTION,
  OSM_default as default
};