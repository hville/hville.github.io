// ../node_modules/ol/events/Event.js
var BaseEvent = class {
  /**
   * @param {string} type Type.
   */
  constructor(type) {
    this.propagationStopped;
    this.defaultPrevented;
    this.type = type;
    this.target = null;
  }
  /**
   * Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
   * will be fired.
   * @api
   */
  preventDefault() {
    this.defaultPrevented = true;
  }
  /**
   * Stop event propagation.
   * @api
   */
  stopPropagation() {
    this.propagationStopped = true;
  }
};
var Event_default = BaseEvent;

// ../node_modules/ol/ObjectEventType.js
var ObjectEventType_default = {
  /**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */
  PROPERTYCHANGE: "propertychange"
};

// ../node_modules/ol/Disposable.js
var Disposable = class {
  constructor() {
    this.disposed = false;
  }
  /**
   * Clean up.
   */
  dispose() {
    if (!this.disposed) {
      this.disposed = true;
      this.disposeInternal();
    }
  }
  /**
   * Extension point for disposable objects.
   * @protected
   */
  disposeInternal() {
  }
};
var Disposable_default = Disposable;

// ../node_modules/ol/array.js
function ascending(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
function linearFindNearest(arr, target, direction) {
  const n = arr.length;
  if (arr[0] <= target) {
    return 0;
  } else if (target <= arr[n - 1]) {
    return n - 1;
  }
  let i;
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
          }
          return i;
        } else if (arr[i - 1] - target < target - arr[i]) {
          return i - 1;
        }
        return i;
      }
    }
  }
  return n - 1;
}
function extend(arr, data) {
  const extension = Array.isArray(data) ? data : [data];
  const length = extension.length;
  for (let i = 0; i < length; i++) {
    arr[arr.length] = extension[i];
  }
}
function equals(arr1, arr2) {
  const len1 = arr1.length;
  if (len1 !== arr2.length) {
    return false;
  }
  for (let i = 0; i < len1; i++) {
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
  let called = false;
  let lastResult;
  let lastArgs;
  let lastThis;
  return function() {
    const nextArgs = Array.prototype.slice.call(arguments);
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
function clear(object) {
  for (const property in object) {
    delete object[property];
  }
}
function isEmpty(object) {
  let property;
  for (property in object) {
    return false;
  }
  return !property;
}

// ../node_modules/ol/events/Target.js
var Target = class extends Disposable_default {
  /**
   * @param {*} [target] Default event target for dispatched events.
   */
  constructor(target) {
    super();
    this.eventTarget_ = target;
    this.pendingRemovals_ = null;
    this.dispatching_ = null;
    this.listeners_ = null;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */
  addEventListener(type, listener) {
    if (!type || !listener) {
      return;
    }
    const listeners = this.listeners_ || (this.listeners_ = {});
    const listenersForType = listeners[type] || (listeners[type] = []);
    if (!listenersForType.includes(listener)) {
      listenersForType.push(listener);
    }
  }
  /**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   *
   * @param {import("./Event.js").default|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */
  dispatchEvent(event) {
    const isString = typeof event === "string";
    const type = isString ? event : event.type;
    const listeners = this.listeners_ && this.listeners_[type];
    if (!listeners) {
      return;
    }
    const evt = isString ? new Event_default(event) : (
      /** @type {Event} */
      event
    );
    if (!evt.target) {
      evt.target = this.eventTarget_ || this;
    }
    const dispatching = this.dispatching_ || (this.dispatching_ = {});
    const pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});
    if (!(type in dispatching)) {
      dispatching[type] = 0;
      pendingRemovals[type] = 0;
    }
    ++dispatching[type];
    let propagate;
    for (let i = 0, ii = listeners.length; i < ii; ++i) {
      if ("handleEvent" in listeners[i]) {
        propagate = /** @type {import("../events.js").ListenerObject} */
        listeners[i].handleEvent(evt);
      } else {
        propagate = /** @type {import("../events.js").ListenerFunction} */
        listeners[i].call(this, evt);
      }
      if (propagate === false || evt.propagationStopped) {
        propagate = false;
        break;
      }
    }
    if (--dispatching[type] === 0) {
      let pr = pendingRemovals[type];
      delete pendingRemovals[type];
      while (pr--) {
        this.removeEventListener(type, VOID);
      }
      delete dispatching[type];
    }
    return propagate;
  }
  /**
   * Clean up.
   */
  disposeInternal() {
    this.listeners_ && clear(this.listeners_);
  }
  /**
   * Get the listeners for a specified event type. Listeners are returned in the
   * order that they will be called in.
   *
   * @param {string} type Type.
   * @return {Array<import("../events.js").Listener>|undefined} Listeners.
   */
  getListeners(type) {
    return this.listeners_ && this.listeners_[type] || void 0;
  }
  /**
   * @param {string} [type] Type. If not provided,
   *     `true` will be returned if this event target has any listeners.
   * @return {boolean} Has listeners.
   */
  hasListener(type) {
    if (!this.listeners_) {
      return false;
    }
    return type ? type in this.listeners_ : Object.keys(this.listeners_).length > 0;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */
  removeEventListener(type, listener) {
    const listeners = this.listeners_ && this.listeners_[type];
    if (listeners) {
      const index = listeners.indexOf(listener);
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
  }
};
var Target_default = Target;

// ../node_modules/ol/events/EventType.js
var EventType_default = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */
  CHANGE: "change",
  /**
   * Generic error event. Triggered when an error occurs.
   * @event module:ol/events/Event~BaseEvent#error
   * @api
   */
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
function listen(target, type, listener, thisArg, once) {
  if (thisArg && thisArg !== target) {
    listener = listener.bind(thisArg);
  }
  if (once) {
    const originalListener = listener;
    listener = function() {
      target.removeEventListener(type, listener);
      originalListener.apply(this, arguments);
    };
  }
  const eventsKey = {
    target,
    type,
    listener
  };
  target.addEventListener(type, listener);
  return eventsKey;
}
function listenOnce(target, type, listener, thisArg) {
  return listen(target, type, listener, thisArg, true);
}
function unlistenByKey(key) {
  if (key && key.target) {
    key.target.removeEventListener(key.type, key.listener);
    clear(key);
  }
}

// ../node_modules/ol/Observable.js
var Observable = class extends Target_default {
  constructor() {
    super();
    this.on = /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    this.onInternal;
    this.once = /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    this.onceInternal;
    this.un = /** @type {ObservableOnSignature<void>} */
    this.unInternal;
    this.revision_ = 0;
  }
  /**
   * Increases the revision counter and dispatches a 'change' event.
   * @api
   */
  changed() {
    ++this.revision_;
    this.dispatchEvent(EventType_default.CHANGE);
  }
  /**
   * Get the version number for this object.  Each time the object is modified,
   * its version number will be incremented.
   * @return {number} Revision.
   * @api
   */
  getRevision() {
    return this.revision_;
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */
  onInternal(type, listener) {
    if (Array.isArray(type)) {
      const len = type.length;
      const keys = new Array(len);
      for (let i = 0; i < len; ++i) {
        keys[i] = listen(this, type[i], listener);
      }
      return keys;
    }
    return listen(
      this,
      /** @type {string} */
      type,
      listener
    );
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */
  onceInternal(type, listener) {
    let key;
    if (Array.isArray(type)) {
      const len = type.length;
      key = new Array(len);
      for (let i = 0; i < len; ++i) {
        key[i] = listenOnce(this, type[i], listener);
      }
    } else {
      key = listenOnce(
        this,
        /** @type {string} */
        type,
        listener
      );
    }
    listener.ol_key = key;
    return key;
  }
  /**
   * Unlisten for a certain type of event.
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @protected
   */
  unInternal(type, listener) {
    const key = (
      /** @type {Object} */
      listener.ol_key
    );
    if (key) {
      unByKey(key);
    } else if (Array.isArray(type)) {
      for (let i = 0, ii = type.length; i < ii; ++i) {
        this.removeEventListener(type[i], listener);
      }
    } else {
      this.removeEventListener(type, listener);
    }
  }
};
Observable.prototype.on;
Observable.prototype.once;
Observable.prototype.un;
function unByKey(key) {
  if (Array.isArray(key)) {
    for (let i = 0, ii = key.length; i < ii; ++i) {
      unlistenByKey(key[i]);
    }
  } else {
    unlistenByKey(
      /** @type {import("./events.js").EventsKey} */
      key
    );
  }
}
var Observable_default = Observable;

// ../node_modules/ol/util.js
function abstract() {
  throw new Error("Unimplemented abstract method.");
}
var uidCounter_ = 0;
function getUid(obj) {
  return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
}

// ../node_modules/ol/Object.js
var ObjectEvent = class extends Event_default {
  /**
   * @param {string} type The event type.
   * @param {string} key The property name.
   * @param {*} oldValue The old value for `key`.
   */
  constructor(type, key, oldValue) {
    super(type);
    this.key = key;
    this.oldValue = oldValue;
  }
};
var BaseObject = class extends Observable_default {
  /**
   * @param {Object<string, *>} [values] An object with key-value pairs.
   */
  constructor(values) {
    super();
    this.on;
    this.once;
    this.un;
    getUid(this);
    this.values_ = null;
    if (values !== void 0) {
      this.setProperties(values);
    }
  }
  /**
   * Gets a value.
   * @param {string} key Key name.
   * @return {*} Value.
   * @api
   */
  get(key) {
    let value;
    if (this.values_ && this.values_.hasOwnProperty(key)) {
      value = this.values_[key];
    }
    return value;
  }
  /**
   * Get a list of object property names.
   * @return {Array<string>} List of property names.
   * @api
   */
  getKeys() {
    return this.values_ && Object.keys(this.values_) || [];
  }
  /**
   * Get an object of all property names and values.
   * @return {Object<string, *>} Object.
   * @api
   */
  getProperties() {
    return this.values_ && Object.assign({}, this.values_) || {};
  }
  /**
   * @return {boolean} The object has properties.
   */
  hasProperties() {
    return !!this.values_;
  }
  /**
   * @param {string} key Key name.
   * @param {*} oldValue Old value.
   */
  notify(key, oldValue) {
    let eventType;
    eventType = `change:${key}`;
    if (this.hasListener(eventType)) {
      this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
    }
    eventType = ObjectEventType_default.PROPERTYCHANGE;
    if (this.hasListener(eventType)) {
      this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
    }
  }
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */
  addChangeListener(key, listener) {
    this.addEventListener(`change:${key}`, listener);
  }
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */
  removeChangeListener(key, listener) {
    this.removeEventListener(`change:${key}`, listener);
  }
  /**
   * Sets a value.
   * @param {string} key Key name.
   * @param {*} value Value.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */
  set(key, value, silent) {
    const values = this.values_ || (this.values_ = {});
    if (silent) {
      values[key] = value;
    } else {
      const oldValue = values[key];
      values[key] = value;
      if (oldValue !== value) {
        this.notify(key, oldValue);
      }
    }
  }
  /**
   * Sets a collection of key-value pairs.  Note that this changes any existing
   * properties and adds new ones (it does not remove any existing properties).
   * @param {Object<string, *>} values Values.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */
  setProperties(values, silent) {
    for (const key in values) {
      this.set(key, values[key], silent);
    }
  }
  /**
   * Apply any properties from another object without triggering events.
   * @param {BaseObject} source The source object.
   * @protected
   */
  applyProperties(source) {
    if (!source.values_) {
      return;
    }
    Object.assign(this.values_ || (this.values_ = {}), source.values_);
  }
  /**
   * Unsets a property.
   * @param {string} key Key name.
   * @param {boolean} [silent] Unset without triggering an event.
   * @api
   */
  unset(key, silent) {
    if (this.values_ && key in this.values_) {
      const oldValue = this.values_[key];
      delete this.values_[key];
      if (isEmpty(this.values_)) {
        this.values_ = null;
      }
      if (!silent) {
        this.notify(key, oldValue);
      }
    }
  }
};
var Object_default = BaseObject;

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

// ../node_modules/ol/proj/Units.js
var METERS_PER_UNIT = {
  // use the radius of the Normal sphere
  "radians": 6370997 / (2 * Math.PI),
  "degrees": 2 * Math.PI * 6370997 / 360,
  "ft": 0.3048,
  "m": 1,
  "us-ft": 1200 / 3937
};

// ../node_modules/ol/proj/Projection.js
var Projection = class {
  /**
   * @param {Options} options Projection options.
   */
  constructor(options) {
    this.code_ = options.code;
    this.units_ = /** @type {import("./Units.js").Units} */
    options.units;
    this.extent_ = options.extent !== void 0 ? options.extent : null;
    this.worldExtent_ = options.worldExtent !== void 0 ? options.worldExtent : null;
    this.axisOrientation_ = options.axisOrientation !== void 0 ? options.axisOrientation : "enu";
    this.global_ = options.global !== void 0 ? options.global : false;
    this.canWrapX_ = !!(this.global_ && this.extent_);
    this.getPointResolutionFunc_ = options.getPointResolution;
    this.defaultTileGrid_ = null;
    this.metersPerUnit_ = options.metersPerUnit;
  }
  /**
   * @return {boolean} The projection is suitable for wrapping the x-axis
   */
  canWrapX() {
    return this.canWrapX_;
  }
  /**
   * Get the code for this projection, e.g. 'EPSG:4326'.
   * @return {string} Code.
   * @api
   */
  getCode() {
    return this.code_;
  }
  /**
   * Get the validity extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_;
  }
  /**
   * Get the units of this projection.
   * @return {import("./Units.js").Units} Units.
   * @api
   */
  getUnits() {
    return this.units_;
  }
  /**
   * Get the amount of meters per unit of this projection.  If the projection is
   * not configured with `metersPerUnit` or a units identifier, the return is
   * `undefined`.
   * @return {number|undefined} Meters.
   * @api
   */
  getMetersPerUnit() {
    return this.metersPerUnit_ || METERS_PER_UNIT[this.units_];
  }
  /**
   * Get the world extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getWorldExtent() {
    return this.worldExtent_;
  }
  /**
   * Get the axis orientation of this projection.
   * Example values are:
   * enu - the default easting, northing, elevation.
   * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
   *     or south orientated transverse mercator.
   * wnu - westing, northing, up - some planetary coordinate systems have
   *     "west positive" coordinate systems
   * @return {string} Axis orientation.
   * @api
   */
  getAxisOrientation() {
    return this.axisOrientation_;
  }
  /**
   * Is this projection a global projection which spans the whole world?
   * @return {boolean} Whether the projection is global.
   * @api
   */
  isGlobal() {
    return this.global_;
  }
  /**
   * Set if the projection is a global projection which spans the whole world
   * @param {boolean} global Whether the projection is global.
   * @api
   */
  setGlobal(global) {
    this.global_ = global;
    this.canWrapX_ = !!(global && this.extent_);
  }
  /**
   * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
   */
  getDefaultTileGrid() {
    return this.defaultTileGrid_;
  }
  /**
   * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
   */
  setDefaultTileGrid(tileGrid) {
    this.defaultTileGrid_ = tileGrid;
  }
  /**
   * Set the validity extent for this projection.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */
  setExtent(extent) {
    this.extent_ = extent;
    this.canWrapX_ = !!(this.global_ && extent);
  }
  /**
   * Set the world extent for this projection.
   * @param {import("../extent.js").Extent} worldExtent World extent
   *     [minlon, minlat, maxlon, maxlat].
   * @api
   */
  setWorldExtent(worldExtent) {
    this.worldExtent_ = worldExtent;
  }
  /**
   * Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
   * for this projection.
   * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
   * @api
   */
  setGetPointResolution(func) {
    this.getPointResolutionFunc_ = func;
  }
  /**
   * Get the custom point resolution function for this projection (if set).
   * @return {function(number, import("../coordinate.js").Coordinate):number|undefined} The custom point
   * resolution function (if set).
   */
  getPointResolutionFunc() {
    return this.getPointResolutionFunc_;
  }
};
var Projection_default = Projection;

// ../node_modules/ol/proj/epsg3857.js
var RADIUS = 6378137;
var HALF_SIZE = Math.PI * RADIUS;
var EXTENT = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
var WORLD_EXTENT = [-180, -85, 180, 85];
var MAX_SAFE_Y = RADIUS * Math.log(Math.tan(Math.PI / 2));
var EPSG3857Projection = class extends Projection_default {
  /**
   * @param {string} code Code.
   */
  constructor(code) {
    super({
      code,
      units: "m",
      extent: EXTENT,
      global: true,
      worldExtent: WORLD_EXTENT,
      getPointResolution: function(resolution, point) {
        return resolution / Math.cosh(point[1] / RADIUS);
      }
    });
  }
};
var PROJECTIONS = [
  new EPSG3857Projection("EPSG:3857"),
  new EPSG3857Projection("EPSG:102100"),
  new EPSG3857Projection("EPSG:102113"),
  new EPSG3857Projection("EPSG:900913"),
  new EPSG3857Projection("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new EPSG3857Projection("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
function fromEPSG4326(input, output, dimension) {
  const length = input.length;
  dimension = dimension > 1 ? dimension : 2;
  if (output === void 0) {
    if (dimension > 2) {
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }
  for (let i = 0; i < length; i += dimension) {
    output[i] = HALF_SIZE * input[i] / 180;
    let y = RADIUS * Math.log(Math.tan(Math.PI * (+input[i + 1] + 90) / 360));
    if (y > MAX_SAFE_Y) {
      y = MAX_SAFE_Y;
    } else if (y < -MAX_SAFE_Y) {
      y = -MAX_SAFE_Y;
    }
    output[i + 1] = y;
  }
  return output;
}
function toEPSG4326(input, output, dimension) {
  const length = input.length;
  dimension = dimension > 1 ? dimension : 2;
  if (output === void 0) {
    if (dimension > 2) {
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }
  for (let i = 0; i < length; i += dimension) {
    output[i] = 180 * input[i] / HALF_SIZE;
    output[i + 1] = 360 * Math.atan(Math.exp(input[i + 1] / RADIUS)) / Math.PI - 90;
  }
  return output;
}

// ../node_modules/ol/proj/epsg4326.js
var RADIUS2 = 6378137;
var EXTENT2 = [-180, -90, 180, 90];
var METERS_PER_UNIT2 = Math.PI * RADIUS2 / 180;
var EPSG4326Projection = class extends Projection_default {
  /**
   * @param {string} code Code.
   * @param {string} [axisOrientation] Axis orientation.
   */
  constructor(code, axisOrientation) {
    super({
      code,
      units: "degrees",
      extent: EXTENT2,
      axisOrientation,
      global: true,
      metersPerUnit: METERS_PER_UNIT2,
      worldExtent: EXTENT2
    });
  }
};
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
  const sourceCode = source.getCode();
  const destinationCode = destination.getCode();
  if (!(sourceCode in transforms)) {
    transforms[sourceCode] = {};
  }
  transforms[sourceCode][destinationCode] = transformFn;
}
function get2(sourceCode, destinationCode) {
  let transform2;
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
var messages = {
  1: "The view center is not defined",
  2: "The view resolution is not defined",
  3: "The view rotation is not defined",
  4: "`image` and `src` cannot be provided at the same time",
  5: "`imgSize` must be set when `image` is provided",
  7: "`format` must be set when `url` is set",
  8: "Unknown `serverType` configured",
  9: "`url` must be configured or set using `#setUrl()`",
  10: "The default `geometryFunction` can only handle `Point` geometries",
  11: "`options.featureTypes` must be an Array",
  12: "`options.geometryName` must also be provided when `options.bbox` is set",
  13: "Invalid corner",
  14: "Invalid color",
  15: "Tried to get a value for a key that does not exist in the cache",
  16: "Tried to set a value for a key that is used already",
  17: "`resolutions` must be sorted in descending order",
  18: "Either `origin` or `origins` must be configured, never both",
  19: "Number of `tileSizes` and `resolutions` must be equal",
  20: "Number of `origins` and `resolutions` must be equal",
  22: "Either `tileSize` or `tileSizes` must be configured, never both",
  24: "Invalid extent or geometry provided as `geometry`",
  25: "Cannot fit empty extent provided as `geometry`",
  26: "Features must have an id set",
  27: "Features must have an id set",
  28: '`renderMode` must be `"hybrid"` or `"vector"`',
  30: "The passed `feature` was already added to the source",
  31: "Tried to enqueue an `element` that was already added to the queue",
  32: "Transformation matrix cannot be inverted",
  33: "Invalid units",
  34: "Invalid geometry layout",
  36: "Unknown SRS type",
  37: "Unknown geometry type found",
  38: "`styleMapValue` has an unknown type",
  39: "Unknown geometry type",
  40: "Expected `feature` to have a geometry",
  41: "Expected an `ol/style/Style` or an array of `ol/style/Style.js`",
  42: "Question unknown, the answer is 42",
  43: "Expected `layers` to be an array or a `Collection`",
  47: "Expected `controls` to be an array or an `ol/Collection`",
  48: "Expected `interactions` to be an array or an `ol/Collection`",
  49: "Expected `overlays` to be an array or an `ol/Collection`",
  50: "`options.featureTypes` should be an Array",
  51: "Either `url` or `tileJSON` options must be provided",
  52: "Unknown `serverType` configured",
  53: "Unknown `tierSizeCalculation` configured",
  55: "The {-y} placeholder requires a tile grid with extent",
  56: "mapBrowserEvent must originate from a pointer event",
  57: "At least 2 conditions are required",
  59: "Invalid command found in the PBF",
  60: "Missing or invalid `size`",
  61: "Cannot determine IIIF Image API version from provided image information JSON",
  62: "A `WebGLArrayBuffer` must either be of type `ELEMENT_ARRAY_BUFFER` or `ARRAY_BUFFER`",
  64: "Layer opacity must be a number",
  66: "`forEachFeatureAtCoordinate` cannot be used on a WebGL layer if the hit detection logic has not been enabled. This is done by providing adequate shaders using the `hitVertexShader` and `hitFragmentShader` properties of `WebGLPointsLayerRenderer`",
  67: "A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both",
  68: "A VectorTile source can only be rendered if it has a projection compatible with the view projection",
  69: "`width` or `height` cannot be provided together with `scale`"
};
var AssertionError = class extends Error {
  /**
   * @param {number} code Error code.
   */
  constructor(code) {
    const message = messages[code];
    super(message);
    this.code = code;
    this.name = "AssertionError";
    this.message = message;
  }
};
var AssertionError_default = AssertionError;

// ../node_modules/ol/asserts.js
function assert(assertion, errorCode) {
  if (!assertion) {
    throw new AssertionError_default(errorCode);
  }
}

// ../node_modules/ol/extent.js
function _boundingExtentXYs(xs, ys, dest) {
  const minX = Math.min.apply(null, xs);
  const minY = Math.min.apply(null, ys);
  const maxX = Math.max.apply(null, xs);
  const maxY = Math.max.apply(null, ys);
  return createOrUpdate(minX, minY, maxX, maxY, dest);
}
function closestSquaredDistanceXY(extent, x, y) {
  let dx, dy;
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
  const minX = extent[0];
  const minY = extent[1];
  const maxX = extent[2];
  const maxY = extent[3];
  const x = coordinate[0];
  const y = coordinate[1];
  let relationship = Relationship_default.UNKNOWN;
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
function createOrUpdate(minX, minY, maxX, maxY, dest) {
  if (dest) {
    dest[0] = minX;
    dest[1] = minY;
    dest[2] = maxX;
    dest[3] = maxY;
    return dest;
  }
  return [minX, minY, maxX, maxY];
}
function createOrUpdateEmpty(dest) {
  return createOrUpdate(Infinity, Infinity, -Infinity, -Infinity, dest);
}
function createOrUpdateFromCoordinate(coordinate, dest) {
  const x = coordinate[0];
  const y = coordinate[1];
  return createOrUpdate(x, y, x, y, dest);
}
function createOrUpdateFromFlatCoordinates(flatCoordinates, offset, end, stride, dest) {
  const extent = createOrUpdateEmpty(dest);
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
  let val;
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
function getForViewAndSize(center, resolution, rotation, size, dest) {
  const [x0, y0, x1, y1, x2, y2, x3, y3] = getRotatedViewport(
    center,
    resolution,
    rotation,
    size
  );
  return createOrUpdate(
    Math.min(x0, x1, x2, x3),
    Math.min(y0, y1, y2, y3),
    Math.max(x0, x1, x2, x3),
    Math.max(y0, y1, y2, y3),
    dest
  );
}
function getRotatedViewport(center, resolution, rotation, size) {
  const dx = resolution * size[0] / 2;
  const dy = resolution * size[1] / 2;
  const cosRotation = Math.cos(rotation);
  const sinRotation = Math.sin(rotation);
  const xCos = dx * cosRotation;
  const xSin = dx * sinRotation;
  const yCos = dy * cosRotation;
  const ySin = dy * sinRotation;
  const x = center[0];
  const y = center[1];
  return [
    x - xCos + ySin,
    y - xSin - yCos,
    x - xCos - ySin,
    y - xSin + yCos,
    x + xCos - ySin,
    y + xSin + yCos,
    x + xCos + ySin,
    y + xSin - yCos,
    x - xCos + ySin,
    y - xSin - yCos
  ];
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
function returnOrUpdate(extent, dest) {
  if (dest) {
    dest[0] = extent[0];
    dest[1] = extent[1];
    dest[2] = extent[2];
    dest[3] = extent[3];
    return dest;
  }
  return extent;
}
function intersectsSegment(extent, start, end) {
  let intersects2 = false;
  const startRel = coordinateRelationship(extent, start);
  const endRel = coordinateRelationship(extent, end);
  if (startRel === Relationship_default.INTERSECTING || endRel === Relationship_default.INTERSECTING) {
    intersects2 = true;
  } else {
    const minX = extent[0];
    const minY = extent[1];
    const maxX = extent[2];
    const maxY = extent[3];
    const startX = start[0];
    const startY = start[1];
    const endX = end[0];
    const endY = end[1];
    const slope = (endY - startY) / (endX - startX);
    let x, y;
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
function applyTransform(extent, transformFn, dest, stops) {
  let coordinates2 = [];
  if (stops > 1) {
    const width = extent[2] - extent[0];
    const height = extent[3] - extent[1];
    for (let i = 0; i < stops; ++i) {
      coordinates2.push(
        extent[0] + width * i / stops,
        extent[1],
        extent[2],
        extent[1] + height * i / stops,
        extent[2] - width * i / stops,
        extent[3],
        extent[0],
        extent[3] - height * i / stops
      );
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
  const xs = [];
  const ys = [];
  for (let i = 0, l = coordinates2.length; i < l; i += 2) {
    xs.push(coordinates2[i]);
    ys.push(coordinates2[i + 1]);
  }
  return _boundingExtentXYs(xs, ys, dest);
}

// ../node_modules/ol/math.js
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function squaredSegmentDistance(x, y, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx !== 0 || dy !== 0) {
    const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
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
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
}
function toRadians(angleInDegrees) {
  return angleInDegrees * Math.PI / 180;
}
function modulo(a, b) {
  const r = a % b;
  return r * b < 0 ? r + b : r;
}
function lerp(a, b, x) {
  return a + x * (b - a);
}

// ../node_modules/ol/coordinate.js
function add3(coordinate, delta) {
  coordinate[0] += +delta[0];
  coordinate[1] += +delta[1];
  return coordinate;
}
function equals2(coordinate1, coordinate2) {
  let equals3 = true;
  for (let i = coordinate1.length - 1; i >= 0; --i) {
    if (coordinate1[i] != coordinate2[i]) {
      equals3 = false;
      break;
    }
  }
  return equals3;
}
function rotate(coordinate, angle) {
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);
  const x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
  const y = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
  coordinate[0] = x;
  coordinate[1] = y;
  return coordinate;
}

// ../node_modules/ol/console.js
var levels = {
  info: 1,
  warn: 2,
  error: 3,
  none: 4
};
var level = levels.info;
function warn(...args) {
  if (level > levels.warn) {
    return;
  }
  console.warn(...args);
}

// ../node_modules/ol/proj.js
var showCoordinateWarning = true;
function disableCoordinateWarning(disable2) {
  const hide = disable2 === void 0 ? true : disable2;
  showCoordinateWarning = !hide;
}
function cloneTransform(input, output) {
  if (output !== void 0) {
    for (let i = 0, ii = input.length; i < ii; ++i) {
      output[i] = input[i];
    }
    output = output;
  } else {
    output = input.slice();
  }
  return output;
}
function identityTransform(input, output) {
  if (output !== void 0 && input !== output) {
    for (let i = 0, ii = input.length; i < ii; ++i) {
      output[i] = input[i];
    }
    input = output;
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
  return typeof projectionLike === "string" ? get(
    /** @type {string} */
    projectionLike
  ) : (
    /** @type {Projection} */
    projectionLike || null
  );
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
  }
  return (
    /** @type {Projection} */
    projection
  );
}
function getTransformFromProjections(sourceProjection, destinationProjection) {
  const sourceCode = sourceProjection.getCode();
  const destinationCode = destinationProjection.getCode();
  let transformFunc = get2(sourceCode, destinationCode);
  if (!transformFunc) {
    transformFunc = identityTransform;
  }
  return transformFunc;
}
function getTransform(source, destination) {
  const sourceProjection = get3(source);
  const destinationProjection = get3(destination);
  return getTransformFromProjections(sourceProjection, destinationProjection);
}
function transform(coordinate, source, destination) {
  const transformFunc = getTransform(source, destination);
  return transformFunc(coordinate, void 0, coordinate.length);
}
function transformExtent(extent, source, destination, stops) {
  const transformFunc = getTransform(source, destination);
  return applyTransform(extent, transformFunc, void 0, stops);
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
      warn(
        "Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates."
      );
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
  addEquivalentTransforms(
    PROJECTIONS2,
    PROJECTIONS,
    fromEPSG4326,
    toEPSG4326
  );
}
addCommon();

// ../node_modules/ol/centerconstraint.js
function createExtent(extent, onlyCenter, smooth) {
  return (
    /**
     * @param {import("./coordinate.js").Coordinate|undefined} center Center.
     * @param {number|undefined} resolution Resolution.
     * @param {import("./size.js").Size} size Viewport size; unused if `onlyCenter` was specified.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @param {Array<number>} [centerShift] Shift between map center and viewport center.
     * @return {import("./coordinate.js").Coordinate|undefined} Center.
     */
    function(center, resolution, size, isMoving, centerShift) {
      if (!center) {
        return void 0;
      }
      if (!resolution && !onlyCenter) {
        return center;
      }
      const viewWidth = onlyCenter ? 0 : size[0] * resolution;
      const viewHeight = onlyCenter ? 0 : size[1] * resolution;
      const shiftX = centerShift ? centerShift[0] : 0;
      const shiftY = centerShift ? centerShift[1] : 0;
      let minX = extent[0] + viewWidth / 2 + shiftX;
      let maxX = extent[2] - viewWidth / 2 + shiftX;
      let minY = extent[1] + viewHeight / 2 + shiftY;
      let maxY = extent[3] - viewHeight / 2 + shiftY;
      if (minX > maxX) {
        minX = (maxX + minX) / 2;
        maxX = minX;
      }
      if (minY > maxY) {
        minY = (maxY + minY) / 2;
        maxY = minY;
      }
      let x = clamp(center[0], minX, maxX);
      let y = clamp(center[1], minY, maxY);
      if (isMoving && smooth && resolution) {
        const ratio = 30 * resolution;
        x += -ratio * Math.log(1 + Math.max(0, minX - center[0]) / ratio) + ratio * Math.log(1 + Math.max(0, center[0] - maxX) / ratio);
        y += -ratio * Math.log(1 + Math.max(0, minY - center[1]) / ratio) + ratio * Math.log(1 + Math.max(0, center[1] - maxY) / ratio);
      }
      return [x, y];
    }
  );
}
function none(center) {
  return center;
}

// ../node_modules/ol/resolutionconstraint.js
function getViewportClampedResolution(resolution, maxExtent, viewportSize, showFullExtent) {
  const xResolution = getWidth(maxExtent) / viewportSize[0];
  const yResolution = getHeight(maxExtent) / viewportSize[1];
  if (showFullExtent) {
    return Math.min(resolution, Math.max(xResolution, yResolution));
  }
  return Math.min(resolution, Math.min(xResolution, yResolution));
}
function getSmoothClampedResolution(resolution, maxResolution, minResolution) {
  let result = Math.min(resolution, maxResolution);
  const ratio = 50;
  result *= Math.log(1 + ratio * Math.max(0, resolution / maxResolution - 1)) / ratio + 1;
  if (minResolution) {
    result = Math.max(result, minResolution);
    result /= Math.log(1 + ratio * Math.max(0, minResolution / resolution - 1)) / ratio + 1;
  }
  return clamp(result, minResolution / 2, maxResolution * 2);
}
function createSnapToResolutions(resolutions, smooth, maxExtent, showFullExtent) {
  smooth = smooth !== void 0 ? smooth : true;
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function(resolution, direction, size, isMoving) {
      if (resolution !== void 0) {
        const maxResolution = resolutions[0];
        const minResolution = resolutions[resolutions.length - 1];
        const cappedMaxRes = maxExtent ? getViewportClampedResolution(
          maxResolution,
          maxExtent,
          size,
          showFullExtent
        ) : maxResolution;
        if (isMoving) {
          if (!smooth) {
            return clamp(resolution, minResolution, cappedMaxRes);
          }
          return getSmoothClampedResolution(
            resolution,
            cappedMaxRes,
            minResolution
          );
        }
        const capped = Math.min(cappedMaxRes, resolution);
        const z = Math.floor(linearFindNearest(resolutions, capped, direction));
        if (resolutions[z] > cappedMaxRes && z < resolutions.length - 1) {
          return resolutions[z + 1];
        }
        return resolutions[z];
      }
      return void 0;
    }
  );
}
function createSnapToPower(power, maxResolution, minResolution, smooth, maxExtent, showFullExtent) {
  smooth = smooth !== void 0 ? smooth : true;
  minResolution = minResolution !== void 0 ? minResolution : 0;
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function(resolution, direction, size, isMoving) {
      if (resolution !== void 0) {
        const cappedMaxRes = maxExtent ? getViewportClampedResolution(
          maxResolution,
          maxExtent,
          size,
          showFullExtent
        ) : maxResolution;
        if (isMoving) {
          if (!smooth) {
            return clamp(resolution, minResolution, cappedMaxRes);
          }
          return getSmoothClampedResolution(
            resolution,
            cappedMaxRes,
            minResolution
          );
        }
        const tolerance = 1e-9;
        const minZoomLevel = Math.ceil(
          Math.log(maxResolution / cappedMaxRes) / Math.log(power) - tolerance
        );
        const offset = -direction * (0.5 - tolerance) + 0.5;
        const capped = Math.min(cappedMaxRes, resolution);
        const cappedZoomLevel = Math.floor(
          Math.log(maxResolution / capped) / Math.log(power) + offset
        );
        const zoomLevel = Math.max(minZoomLevel, cappedZoomLevel);
        const newResolution = maxResolution / Math.pow(power, zoomLevel);
        return clamp(newResolution, minResolution, cappedMaxRes);
      }
      return void 0;
    }
  );
}
function createMinMaxResolution(maxResolution, minResolution, smooth, maxExtent, showFullExtent) {
  smooth = smooth !== void 0 ? smooth : true;
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function(resolution, direction, size, isMoving) {
      if (resolution !== void 0) {
        const cappedMaxRes = maxExtent ? getViewportClampedResolution(
          maxResolution,
          maxExtent,
          size,
          showFullExtent
        ) : maxResolution;
        if (!smooth || !isMoving) {
          return clamp(resolution, minResolution, cappedMaxRes);
        }
        return getSmoothClampedResolution(
          resolution,
          cappedMaxRes,
          minResolution
        );
      }
      return void 0;
    }
  );
}

// ../node_modules/ol/rotationconstraint.js
function disable(rotation) {
  if (rotation !== void 0) {
    return 0;
  }
  return void 0;
}
function none2(rotation) {
  if (rotation !== void 0) {
    return rotation;
  }
  return void 0;
}
function createSnapToN(n) {
  const theta = 2 * Math.PI / n;
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function(rotation, isMoving) {
      if (isMoving) {
        return rotation;
      }
      if (rotation !== void 0) {
        rotation = Math.floor(rotation / theta + 0.5) * theta;
        return rotation;
      }
      return void 0;
    }
  );
}
function createSnapToZero(tolerance) {
  tolerance = tolerance || toRadians(5);
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function(rotation, isMoving) {
      if (isMoving) {
        return rotation;
      }
      if (rotation !== void 0) {
        if (Math.abs(rotation) <= tolerance) {
          return 0;
        }
        return rotation;
      }
      return void 0;
    }
  );
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

// ../node_modules/ol/transform.js
var tmp_ = new Array(6);
function create() {
  return [1, 0, 0, 1, 0, 0];
}
function compose(transform2, dx1, dy1, sx, sy, angle, dx2, dy2) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  transform2[0] = sx * cos;
  transform2[1] = sy * sin;
  transform2[2] = -sx * sin;
  transform2[3] = sy * cos;
  transform2[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
  transform2[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
  return transform2;
}

// ../node_modules/ol/geom/flat/transform.js
function transform2D(flatCoordinates, offset, end, stride, transform2, dest) {
  dest = dest ? dest : [];
  let i = 0;
  for (let j = offset; j < end; j += stride) {
    const x = flatCoordinates[j];
    const y = flatCoordinates[j + 1];
    dest[i++] = transform2[0] * x + transform2[2] * y + transform2[4];
    dest[i++] = transform2[1] * x + transform2[3] * y + transform2[5];
  }
  if (dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}
function rotate2(flatCoordinates, offset, end, stride, angle, anchor, dest) {
  dest = dest ? dest : [];
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const anchorX = anchor[0];
  const anchorY = anchor[1];
  let i = 0;
  for (let j = offset; j < end; j += stride) {
    const deltaX = flatCoordinates[j] - anchorX;
    const deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + deltaX * cos - deltaY * sin;
    dest[i++] = anchorY + deltaX * sin + deltaY * cos;
    for (let k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}
function scale(flatCoordinates, offset, end, stride, sx, sy, anchor, dest) {
  dest = dest ? dest : [];
  const anchorX = anchor[0];
  const anchorY = anchor[1];
  let i = 0;
  for (let j = offset; j < end; j += stride) {
    const deltaX = flatCoordinates[j] - anchorX;
    const deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + sx * deltaX;
    dest[i++] = anchorY + sy * deltaY;
    for (let k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}
function translate(flatCoordinates, offset, end, stride, deltaX, deltaY, dest) {
  dest = dest ? dest : [];
  let i = 0;
  for (let j = offset; j < end; j += stride) {
    dest[i++] = flatCoordinates[j] + deltaX;
    dest[i++] = flatCoordinates[j + 1] + deltaY;
    for (let k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}

// ../node_modules/ol/geom/Geometry.js
var tmpTransform = create();
var Geometry = class extends Object_default {
  constructor() {
    super();
    this.extent_ = createEmpty();
    this.extentRevision_ = -1;
    this.simplifiedGeometryMaxMinSquaredTolerance = 0;
    this.simplifiedGeometryRevision = 0;
    this.simplifyTransformedInternal = memoizeOne(function(revision, squaredTolerance, transform2) {
      if (!transform2) {
        return this.getSimplifiedGeometry(squaredTolerance);
      }
      const clone = this.clone();
      clone.applyTransform(transform2);
      return clone.getSimplifiedGeometry(squaredTolerance);
    });
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {Geometry} Simplified geometry.
   */
  simplifyTransformed(squaredTolerance, transform2) {
    return this.simplifyTransformedInternal(
      this.getRevision(),
      squaredTolerance,
      transform2
    );
  }
  /**
   * Make a complete copy of the geometry.
   * @abstract
   * @return {!Geometry} Clone.
   */
  clone() {
    return abstract();
  }
  /**
   * @abstract
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    return abstract();
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */
  containsXY(x, y) {
    const coord = this.getClosestPoint([x, y]);
    return coord[0] === x && coord[1] === y;
  }
  /**
   * Return the closest point of the geometry to the passed point as
   * {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} point Point.
   * @param {import("../coordinate.js").Coordinate} [closestPoint] Closest point.
   * @return {import("../coordinate.js").Coordinate} Closest point.
   * @api
   */
  getClosestPoint(point, closestPoint) {
    closestPoint = closestPoint ? closestPoint : [NaN, NaN];
    this.closestPointXY(point[0], point[1], closestPoint, Infinity);
    return closestPoint;
  }
  /**
   * Returns true if this geometry includes the specified coordinate. If the
   * coordinate is on the boundary of the geometry, returns false.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains coordinate.
   * @api
   */
  intersectsCoordinate(coordinate) {
    return this.containsXY(coordinate[0], coordinate[1]);
  }
  /**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */
  computeExtent(extent) {
    return abstract();
  }
  /**
   * Get the extent of the geometry.
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} extent Extent.
   * @api
   */
  getExtent(extent) {
    if (this.extentRevision_ != this.getRevision()) {
      const extent2 = this.computeExtent(this.extent_);
      if (isNaN(extent2[0]) || isNaN(extent2[1])) {
        createOrUpdateEmpty(extent2);
      }
      this.extentRevision_ = this.getRevision();
    }
    return returnOrUpdate(this.extent_, extent);
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */
  rotate(angle, anchor) {
    abstract();
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */
  scale(sx, sy, anchor) {
    abstract();
  }
  /**
   * Create a simplified version of this geometry.  For linestrings, this uses
   * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
   * algorithm.  For polygons, a quantization-based
   * simplification is used to preserve topology.
   * @param {number} tolerance The tolerance distance for simplification.
   * @return {Geometry} A new, simplified version of the original geometry.
   * @api
   */
  simplify(tolerance) {
    return this.getSimplifiedGeometry(tolerance * tolerance);
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker
   * algorithm.
   * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Geometry} Simplified geometry.
   */
  getSimplifiedGeometry(squaredTolerance) {
    return abstract();
  }
  /**
   * Get the type of this geometry.
   * @abstract
   * @return {Type} Geometry type.
   */
  getType() {
    return abstract();
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @abstract
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   */
  applyTransform(transformFn) {
    abstract();
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   */
  intersectsExtent(extent) {
    return abstract();
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @abstract
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */
  translate(deltaX, deltaY) {
    abstract();
  }
  /**
   * Transform each coordinate of the geometry from one coordinate reference
   * system to another. The geometry is modified in place.
   * For example, a line will be transformed to a line and a circle to a circle.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   *
   * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @return {Geometry} This geometry.  Note that original geometry is
   *     modified in place.
   * @api
   */
  transform(source, destination) {
    const sourceProj = get3(source);
    const transformFn = sourceProj.getUnits() == "tile-pixels" ? function(inCoordinates, outCoordinates, stride) {
      const pixelExtent = sourceProj.getExtent();
      const projectedExtent = sourceProj.getWorldExtent();
      const scale2 = getHeight(projectedExtent) / getHeight(pixelExtent);
      compose(
        tmpTransform,
        projectedExtent[0],
        projectedExtent[3],
        scale2,
        -scale2,
        0,
        0,
        0
      );
      transform2D(
        inCoordinates,
        0,
        inCoordinates.length,
        stride,
        tmpTransform,
        outCoordinates
      );
      return getTransform(sourceProj, destination)(
        inCoordinates,
        outCoordinates,
        stride
      );
    } : getTransform(sourceProj, destination);
    this.applyTransform(transformFn);
    return this;
  }
};
var Geometry_default = Geometry;

// ../node_modules/ol/geom/SimpleGeometry.js
var SimpleGeometry = class extends Geometry_default {
  constructor() {
    super();
    this.layout = "XY";
    this.stride = 2;
    this.flatCoordinates = null;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */
  computeExtent(extent) {
    return createOrUpdateFromFlatCoordinates(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      extent
    );
  }
  /**
   * @abstract
   * @return {Array<*> | null} Coordinates.
   */
  getCoordinates() {
    return abstract();
  }
  /**
   * Return the first coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} First coordinate.
   * @api
   */
  getFirstCoordinate() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  /**
   * @return {Array<number>} Flat coordinates.
   */
  getFlatCoordinates() {
    return this.flatCoordinates;
  }
  /**
   * Return the last coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} Last point.
   * @api
   */
  getLastCoordinate() {
    return this.flatCoordinates.slice(
      this.flatCoordinates.length - this.stride
    );
  }
  /**
   * Return the {@link import("./Geometry.js").GeometryLayout layout} of the geometry.
   * @return {import("./Geometry.js").GeometryLayout} Layout.
   * @api
   */
  getLayout() {
    return this.layout;
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   */
  getSimplifiedGeometry(squaredTolerance) {
    if (this.simplifiedGeometryRevision !== this.getRevision()) {
      this.simplifiedGeometryMaxMinSquaredTolerance = 0;
      this.simplifiedGeometryRevision = this.getRevision();
    }
    if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance) {
      return this;
    }
    const simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
    const simplifiedFlatCoordinates = simplifiedGeometry.getFlatCoordinates();
    if (simplifiedFlatCoordinates.length < this.flatCoordinates.length) {
      return simplifiedGeometry;
    }
    this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
    return this;
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @protected
   */
  getSimplifiedGeometryInternal(squaredTolerance) {
    return this;
  }
  /**
   * @return {number} Stride.
   */
  getStride() {
    return this.stride;
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout} layout Layout.
   * @param {Array<number>} flatCoordinates Flat coordinates.
   */
  setFlatCoordinates(layout, flatCoordinates) {
    this.stride = getStrideForLayout(layout);
    this.layout = layout;
    this.flatCoordinates = flatCoordinates;
  }
  /**
   * @abstract
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  setCoordinates(coordinates2, layout) {
    abstract();
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
   * @param {Array<*>} coordinates Coordinates.
   * @param {number} nesting Nesting.
   * @protected
   */
  setLayout(layout, coordinates2, nesting) {
    let stride;
    if (layout) {
      stride = getStrideForLayout(layout);
    } else {
      for (let i = 0; i < nesting; ++i) {
        if (coordinates2.length === 0) {
          this.layout = "XY";
          this.stride = 2;
          return;
        }
        coordinates2 = /** @type {Array} */
        coordinates2[0];
      }
      stride = coordinates2.length;
      layout = getLayoutForStride(stride);
    }
    this.layout = layout;
    this.stride = stride;
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   */
  applyTransform(transformFn) {
    if (this.flatCoordinates) {
      transformFn(this.flatCoordinates, this.flatCoordinates, this.stride);
      this.changed();
    }
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in counter-clockwise radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */
  rotate(angle, anchor) {
    const flatCoordinates = this.getFlatCoordinates();
    if (flatCoordinates) {
      const stride = this.getStride();
      rotate2(
        flatCoordinates,
        0,
        flatCoordinates.length,
        stride,
        angle,
        anchor,
        flatCoordinates
      );
      this.changed();
    }
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */
  scale(sx, sy, anchor) {
    if (sy === void 0) {
      sy = sx;
    }
    if (!anchor) {
      anchor = getCenter(this.getExtent());
    }
    const flatCoordinates = this.getFlatCoordinates();
    if (flatCoordinates) {
      const stride = this.getStride();
      scale(
        flatCoordinates,
        0,
        flatCoordinates.length,
        stride,
        sx,
        sy,
        anchor,
        flatCoordinates
      );
      this.changed();
    }
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */
  translate(deltaX, deltaY) {
    const flatCoordinates = this.getFlatCoordinates();
    if (flatCoordinates) {
      const stride = this.getStride();
      translate(
        flatCoordinates,
        0,
        flatCoordinates.length,
        stride,
        deltaX,
        deltaY,
        flatCoordinates
      );
      this.changed();
    }
  }
};
function getLayoutForStride(stride) {
  let layout;
  if (stride == 2) {
    layout = "XY";
  } else if (stride == 3) {
    layout = "XYZ";
  } else if (stride == 4) {
    layout = "XYZM";
  }
  return (
    /** @type {import("./Geometry.js").GeometryLayout} */
    layout
  );
}
function getStrideForLayout(layout) {
  let stride;
  if (layout == "XY") {
    stride = 2;
  } else if (layout == "XYZ" || layout == "XYM") {
    stride = 3;
  } else if (layout == "XYZM") {
    stride = 4;
  }
  return (
    /** @type {number} */
    stride
  );
}
var SimpleGeometry_default = SimpleGeometry;

// ../node_modules/ol/geom/flat/closest.js
function assignClosest(flatCoordinates, offset1, offset2, stride, x, y, closestPoint) {
  const x1 = flatCoordinates[offset1];
  const y1 = flatCoordinates[offset1 + 1];
  const dx = flatCoordinates[offset2] - x1;
  const dy = flatCoordinates[offset2 + 1] - y1;
  let offset;
  if (dx === 0 && dy === 0) {
    offset = offset1;
  } else {
    const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      offset = offset2;
    } else if (t > 0) {
      for (let i = 0; i < stride; ++i) {
        closestPoint[i] = lerp(
          flatCoordinates[offset1 + i],
          flatCoordinates[offset2 + i],
          t
        );
      }
      closestPoint.length = stride;
      return;
    } else {
      offset = offset1;
    }
  }
  for (let i = 0; i < stride; ++i) {
    closestPoint[i] = flatCoordinates[offset + i];
  }
  closestPoint.length = stride;
}
function maxSquaredDelta(flatCoordinates, offset, end, stride, max) {
  let x1 = flatCoordinates[offset];
  let y1 = flatCoordinates[offset + 1];
  for (offset += stride; offset < end; offset += stride) {
    const x2 = flatCoordinates[offset];
    const y2 = flatCoordinates[offset + 1];
    const squaredDelta = squaredDistance(x1, y1, x2, y2);
    if (squaredDelta > max) {
      max = squaredDelta;
    }
    x1 = x2;
    y1 = y2;
  }
  return max;
}
function arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max) {
  for (let i = 0, ii = ends.length; i < ii; ++i) {
    const end = ends[i];
    max = maxSquaredDelta(flatCoordinates, offset, end, stride, max);
    offset = end;
  }
  return max;
}
function assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint) {
  if (offset == end) {
    return minSquaredDistance;
  }
  let i, squaredDistance2;
  if (maxDelta === 0) {
    squaredDistance2 = squaredDistance(
      x,
      y,
      flatCoordinates[offset],
      flatCoordinates[offset + 1]
    );
    if (squaredDistance2 < minSquaredDistance) {
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[offset + i];
      }
      closestPoint.length = stride;
      return squaredDistance2;
    }
    return minSquaredDistance;
  }
  tmpPoint = tmpPoint ? tmpPoint : [NaN, NaN];
  let index = offset + stride;
  while (index < end) {
    assignClosest(
      flatCoordinates,
      index - stride,
      index,
      stride,
      x,
      y,
      tmpPoint
    );
    squaredDistance2 = squaredDistance(x, y, tmpPoint[0], tmpPoint[1]);
    if (squaredDistance2 < minSquaredDistance) {
      minSquaredDistance = squaredDistance2;
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }
      closestPoint.length = stride;
      index += stride;
    } else {
      index += stride * Math.max(
        (Math.sqrt(squaredDistance2) - Math.sqrt(minSquaredDistance)) / maxDelta | 0,
        1
      );
    }
  }
  if (isRing) {
    assignClosest(
      flatCoordinates,
      end - stride,
      offset,
      stride,
      x,
      y,
      tmpPoint
    );
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
function assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint) {
  tmpPoint = tmpPoint ? tmpPoint : [NaN, NaN];
  for (let i = 0, ii = ends.length; i < ii; ++i) {
    const end = ends[i];
    minSquaredDistance = assignClosestPoint(
      flatCoordinates,
      offset,
      end,
      stride,
      maxDelta,
      isRing,
      x,
      y,
      closestPoint,
      minSquaredDistance,
      tmpPoint
    );
    offset = end;
  }
  return minSquaredDistance;
}

// ../node_modules/ol/geom/flat/deflate.js
function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
  for (let i = 0, ii = coordinate.length; i < ii; ++i) {
    flatCoordinates[offset++] = coordinate[i];
  }
  return offset;
}
function deflateCoordinates(flatCoordinates, offset, coordinates2, stride) {
  for (let i = 0, ii = coordinates2.length; i < ii; ++i) {
    const coordinate = coordinates2[i];
    for (let j = 0; j < stride; ++j) {
      flatCoordinates[offset++] = coordinate[j];
    }
  }
  return offset;
}
function deflateCoordinatesArray(flatCoordinates, offset, coordinatess, stride, ends) {
  ends = ends ? ends : [];
  let i = 0;
  for (let j = 0, jj = coordinatess.length; j < jj; ++j) {
    const end = deflateCoordinates(
      flatCoordinates,
      offset,
      coordinatess[j],
      stride
    );
    ends[i++] = end;
    offset = end;
  }
  ends.length = i;
  return ends;
}

// ../node_modules/ol/geom/flat/simplify.js
function douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  const n = (end - offset) / stride;
  if (n < 3) {
    for (; offset < end; offset += stride) {
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
    }
    return simplifiedOffset;
  }
  const markers = new Array(n);
  markers[0] = 1;
  markers[n - 1] = 1;
  const stack = [offset, end - stride];
  let index = 0;
  while (stack.length > 0) {
    const last = stack.pop();
    const first = stack.pop();
    let maxSquaredDistance = 0;
    const x1 = flatCoordinates[first];
    const y1 = flatCoordinates[first + 1];
    const x2 = flatCoordinates[last];
    const y2 = flatCoordinates[last + 1];
    for (let i = first + stride; i < last; i += stride) {
      const x = flatCoordinates[i];
      const y = flatCoordinates[i + 1];
      const squaredDistance2 = squaredSegmentDistance(x, y, x1, y1, x2, y2);
      if (squaredDistance2 > maxSquaredDistance) {
        index = i;
        maxSquaredDistance = squaredDistance2;
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
  for (let i = 0; i < n; ++i) {
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
  let x1 = snap(flatCoordinates[offset], tolerance);
  let y1 = snap(flatCoordinates[offset + 1], tolerance);
  offset += stride;
  simplifiedFlatCoordinates[simplifiedOffset++] = x1;
  simplifiedFlatCoordinates[simplifiedOffset++] = y1;
  let x2, y2;
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
    const x3 = snap(flatCoordinates[offset], tolerance);
    const y3 = snap(flatCoordinates[offset + 1], tolerance);
    offset += stride;
    if (x3 == x2 && y3 == y2) {
      continue;
    }
    const dx1 = x2 - x1;
    const dy1 = y2 - y1;
    const dx2 = x3 - x1;
    const dy2 = y3 - y1;
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
  for (let i = 0, ii = ends.length; i < ii; ++i) {
    const end = ends[i];
    simplifiedOffset = quantize(
      flatCoordinates,
      offset,
      end,
      stride,
      tolerance,
      simplifiedFlatCoordinates,
      simplifiedOffset
    );
    simplifiedEnds.push(simplifiedOffset);
    offset = end;
  }
  return simplifiedOffset;
}

// ../node_modules/ol/geom/flat/inflate.js
function inflateCoordinates(flatCoordinates, offset, end, stride, coordinates2) {
  coordinates2 = coordinates2 !== void 0 ? coordinates2 : [];
  let i = 0;
  for (let j = offset; j < end; j += stride) {
    coordinates2[i++] = flatCoordinates.slice(j, j + stride);
  }
  coordinates2.length = i;
  return coordinates2;
}
function inflateCoordinatesArray(flatCoordinates, offset, ends, stride, coordinatess) {
  coordinatess = coordinatess !== void 0 ? coordinatess : [];
  let i = 0;
  for (let j = 0, jj = ends.length; j < jj; ++j) {
    const end = ends[j];
    coordinatess[i++] = inflateCoordinates(
      flatCoordinates,
      offset,
      end,
      stride,
      coordinatess[i]
    );
    offset = end;
  }
  coordinatess.length = i;
  return coordinatess;
}

// ../node_modules/ol/geom/flat/area.js
function linearRing(flatCoordinates, offset, end, stride) {
  let twiceArea = 0;
  let x1 = flatCoordinates[end - stride];
  let y1 = flatCoordinates[end - stride + 1];
  for (; offset < end; offset += stride) {
    const x2 = flatCoordinates[offset];
    const y2 = flatCoordinates[offset + 1];
    twiceArea += y1 * x2 - x1 * y2;
    x1 = x2;
    y1 = y2;
  }
  return twiceArea / 2;
}
function linearRings(flatCoordinates, offset, ends, stride) {
  let area = 0;
  for (let i = 0, ii = ends.length; i < ii; ++i) {
    const end = ends[i];
    area += linearRing(flatCoordinates, offset, end, stride);
    offset = end;
  }
  return area;
}

// ../node_modules/ol/geom/LinearRing.js
var LinearRing = class _LinearRing extends SimpleGeometry_default {
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(coordinates2, layout) {
    super();
    this.maxDelta_ = -1;
    this.maxDeltaRevision_ = -1;
    if (layout !== void 0 && !Array.isArray(coordinates2[0])) {
      this.setFlatCoordinates(
        layout,
        /** @type {Array<number>} */
        coordinates2
      );
    } else {
      this.setCoordinates(
        /** @type {Array<import("../coordinate.js").Coordinate>} */
        coordinates2,
        layout
      );
    }
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!LinearRing} Clone.
   * @api
   */
  clone() {
    return new _LinearRing(this.flatCoordinates.slice(), this.layout);
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt(
        maxSquaredDelta(
          this.flatCoordinates,
          0,
          this.flatCoordinates.length,
          this.stride,
          0
        )
      );
      this.maxDeltaRevision_ = this.getRevision();
    }
    return assignClosestPoint(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      this.maxDelta_,
      true,
      x,
      y,
      closestPoint,
      minSquaredDistance
    );
  }
  /**
   * Return the area of the linear ring on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return linearRing(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * Return the coordinates of the linear ring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */
  getCoordinates() {
    return inflateCoordinates(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LinearRing} Simplified LinearRing.
   * @protected
   */
  getSimplifiedGeometryInternal(squaredTolerance) {
    const simplifiedFlatCoordinates = [];
    simplifiedFlatCoordinates.length = douglasPeucker(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      squaredTolerance,
      simplifiedFlatCoordinates,
      0
    );
    return new _LinearRing(simplifiedFlatCoordinates, "XY");
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */
  getType() {
    return "LinearRing";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */
  intersectsExtent(extent) {
    return false;
  }
  /**
   * Set the coordinates of the linear ring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */
  setCoordinates(coordinates2, layout) {
    this.setLayout(layout, coordinates2, 1);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = deflateCoordinates(
      this.flatCoordinates,
      0,
      coordinates2,
      this.stride
    );
    this.changed();
  }
};
var LinearRing_default = LinearRing;

// ../node_modules/ol/geom/Point.js
var Point = class _Point extends SimpleGeometry_default {
  /**
   * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(coordinates2, layout) {
    super();
    this.setCoordinates(coordinates2, layout);
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Point} Clone.
   * @api
   */
  clone() {
    const point = new _Point(this.flatCoordinates.slice(), this.layout);
    point.applyProperties(this);
    return point;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    const flatCoordinates = this.flatCoordinates;
    const squaredDistance2 = squaredDistance(
      x,
      y,
      flatCoordinates[0],
      flatCoordinates[1]
    );
    if (squaredDistance2 < minSquaredDistance) {
      const stride = this.stride;
      for (let i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[i];
      }
      closestPoint.length = stride;
      return squaredDistance2;
    }
    return minSquaredDistance;
  }
  /**
   * Return the coordinate of the point.
   * @return {import("../coordinate.js").Coordinate} Coordinates.
   * @api
   */
  getCoordinates() {
    return !this.flatCoordinates ? [] : this.flatCoordinates.slice();
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */
  computeExtent(extent) {
    return createOrUpdateFromCoordinate(this.flatCoordinates, extent);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */
  getType() {
    return "Point";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */
  intersectsExtent(extent) {
    return containsXY(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  /**
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */
  setCoordinates(coordinates2, layout) {
    this.setLayout(layout, coordinates2, 0);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = deflateCoordinate(
      this.flatCoordinates,
      0,
      coordinates2,
      this.stride
    );
    this.changed();
  }
};
var Point_default = Point;

// ../node_modules/ol/geom/flat/contains.js
function linearRingContainsExtent(flatCoordinates, offset, end, stride, extent) {
  const outside = forEachCorner(
    extent,
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains (x, y).
     */
    function(coordinate) {
      return !linearRingContainsXY(
        flatCoordinates,
        offset,
        end,
        stride,
        coordinate[0],
        coordinate[1]
      );
    }
  );
  return !outside;
}
function linearRingContainsXY(flatCoordinates, offset, end, stride, x, y) {
  let wn = 0;
  let x1 = flatCoordinates[end - stride];
  let y1 = flatCoordinates[end - stride + 1];
  for (; offset < end; offset += stride) {
    const x2 = flatCoordinates[offset];
    const y2 = flatCoordinates[offset + 1];
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
  for (let i = 1, ii = ends.length; i < ii; ++i) {
    if (linearRingContainsXY(flatCoordinates, ends[i - 1], ends[i], stride, x, y)) {
      return false;
    }
  }
  return true;
}

// ../node_modules/ol/geom/flat/interiorpoint.js
function getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, flatCentersOffset, dest) {
  let i, ii, x, x1, x2, y1, y2;
  const y = flatCenters[flatCentersOffset + 1];
  const intersections = [];
  for (let r = 0, rr = ends.length; r < rr; ++r) {
    const end = ends[r];
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
  let pointX = NaN;
  let maxSegmentLength = -Infinity;
  intersections.sort(ascending);
  x1 = intersections[0];
  for (i = 1, ii = intersections.length; i < ii; ++i) {
    x2 = intersections[i];
    const segmentLength = Math.abs(x2 - x1);
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
  if (dest) {
    dest.push(pointX, y, maxSegmentLength);
    return dest;
  }
  return [pointX, y, maxSegmentLength];
}

// ../node_modules/ol/geom/flat/segments.js
function forEach(flatCoordinates, offset, end, stride, callback) {
  let ret;
  offset += stride;
  for (; offset < end; offset += stride) {
    ret = callback(
      flatCoordinates.slice(offset - stride, offset),
      flatCoordinates.slice(offset, offset + stride)
    );
    if (ret) {
      return ret;
    }
  }
  return false;
}

// ../node_modules/ol/geom/flat/intersectsextent.js
function intersectsLineString(flatCoordinates, offset, end, stride, extent) {
  const coordinatesExtent = extendFlatCoordinates(
    createEmpty(),
    flatCoordinates,
    offset,
    end,
    stride
  );
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
  return forEach(
    flatCoordinates,
    offset,
    end,
    stride,
    /**
     * @param {import("../../coordinate.js").Coordinate} point1 Start point.
     * @param {import("../../coordinate.js").Coordinate} point2 End point.
     * @return {boolean} `true` if the segment and the extent intersect,
     *     `false` otherwise.
     */
    function(point1, point2) {
      return intersectsSegment(extent, point1, point2);
    }
  );
}
function intersectsLinearRing(flatCoordinates, offset, end, stride, extent) {
  if (intersectsLineString(flatCoordinates, offset, end, stride, extent)) {
    return true;
  }
  if (linearRingContainsXY(
    flatCoordinates,
    offset,
    end,
    stride,
    extent[0],
    extent[1]
  )) {
    return true;
  }
  if (linearRingContainsXY(
    flatCoordinates,
    offset,
    end,
    stride,
    extent[0],
    extent[3]
  )) {
    return true;
  }
  if (linearRingContainsXY(
    flatCoordinates,
    offset,
    end,
    stride,
    extent[2],
    extent[1]
  )) {
    return true;
  }
  if (linearRingContainsXY(
    flatCoordinates,
    offset,
    end,
    stride,
    extent[2],
    extent[3]
  )) {
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
  for (let i = 1, ii = ends.length; i < ii; ++i) {
    if (linearRingContainsExtent(
      flatCoordinates,
      ends[i - 1],
      ends[i],
      stride,
      extent
    )) {
      if (!intersectsLineString(
        flatCoordinates,
        ends[i - 1],
        ends[i],
        stride,
        extent
      )) {
        return false;
      }
    }
  }
  return true;
}

// ../node_modules/ol/geom/flat/reverse.js
function coordinates(flatCoordinates, offset, end, stride) {
  while (offset < end - stride) {
    for (let i = 0; i < stride; ++i) {
      const tmp = flatCoordinates[offset + i];
      flatCoordinates[offset + i] = flatCoordinates[end - stride + i];
      flatCoordinates[end - stride + i] = tmp;
    }
    offset += stride;
    end -= stride;
  }
}

// ../node_modules/ol/geom/flat/orient.js
function linearRingIsClockwise(flatCoordinates, offset, end, stride) {
  let edge = 0;
  let x1 = flatCoordinates[end - stride];
  let y1 = flatCoordinates[end - stride + 1];
  for (; offset < end; offset += stride) {
    const x2 = flatCoordinates[offset];
    const y2 = flatCoordinates[offset + 1];
    edge += (x2 - x1) * (y2 + y1);
    x1 = x2;
    y1 = y2;
  }
  return edge === 0 ? void 0 : edge > 0;
}
function linearRingsAreOriented(flatCoordinates, offset, ends, stride, right) {
  right = right !== void 0 ? right : false;
  for (let i = 0, ii = ends.length; i < ii; ++i) {
    const end = ends[i];
    const isClockwise = linearRingIsClockwise(
      flatCoordinates,
      offset,
      end,
      stride
    );
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
function orientLinearRings(flatCoordinates, offset, ends, stride, right) {
  right = right !== void 0 ? right : false;
  for (let i = 0, ii = ends.length; i < ii; ++i) {
    const end = ends[i];
    const isClockwise = linearRingIsClockwise(
      flatCoordinates,
      offset,
      end,
      stride
    );
    const reverse = i === 0 ? right && isClockwise || !right && !isClockwise : right && !isClockwise || !right && isClockwise;
    if (reverse) {
      coordinates(flatCoordinates, offset, end, stride);
    }
    offset = end;
  }
  return offset;
}

// ../node_modules/ol/geom/Polygon.js
var Polygon = class _Polygon extends SimpleGeometry_default {
  /**
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
   *     Array of linear rings that define the polygon. The first linear ring of the
   *     array defines the outer-boundary or surface of the polygon. Each subsequent
   *     linear ring defines a hole in the surface of the polygon. A linear ring is
   *     an array of vertices' coordinates where the first coordinate and the last are
   *     equivalent. (For internal use, flat coordinates in combination with
   *     `layout` and `ends` are also accepted.)
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<number>} [ends] Ends (for internal use with flat coordinates).
   */
  constructor(coordinates2, layout, ends) {
    super();
    this.ends_ = [];
    this.flatInteriorPointRevision_ = -1;
    this.flatInteriorPoint_ = null;
    this.maxDelta_ = -1;
    this.maxDeltaRevision_ = -1;
    this.orientedRevision_ = -1;
    this.orientedFlatCoordinates_ = null;
    if (layout !== void 0 && ends) {
      this.setFlatCoordinates(
        layout,
        /** @type {Array<number>} */
        coordinates2
      );
      this.ends_ = ends;
    } else {
      this.setCoordinates(
        /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
        coordinates2,
        layout
      );
    }
  }
  /**
   * Append the passed linear ring to this polygon.
   * @param {LinearRing} linearRing Linear ring.
   * @api
   */
  appendLinearRing(linearRing2) {
    if (!this.flatCoordinates) {
      this.flatCoordinates = linearRing2.getFlatCoordinates().slice();
    } else {
      extend(this.flatCoordinates, linearRing2.getFlatCoordinates());
    }
    this.ends_.push(this.flatCoordinates.length);
    this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Polygon} Clone.
   * @api
   */
  clone() {
    const polygon = new _Polygon(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice()
    );
    polygon.applyProperties(this);
    return polygon;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt(
        arrayMaxSquaredDelta(
          this.flatCoordinates,
          0,
          this.ends_,
          this.stride,
          0
        )
      );
      this.maxDeltaRevision_ = this.getRevision();
    }
    return assignClosestArrayPoint(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      this.maxDelta_,
      true,
      x,
      y,
      closestPoint,
      minSquaredDistance
    );
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */
  containsXY(x, y) {
    return linearRingsContainsXY(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      x,
      y
    );
  }
  /**
   * Return the area of the polygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return linearRings(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride
    );
  }
  /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for polygons.
   *
   * @param {boolean} [right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   */
  getCoordinates(right) {
    let flatCoordinates;
    if (right !== void 0) {
      flatCoordinates = this.getOrientedFlatCoordinates().slice();
      orientLinearRings(flatCoordinates, 0, this.ends_, this.stride, right);
    } else {
      flatCoordinates = this.flatCoordinates;
    }
    return inflateCoordinatesArray(flatCoordinates, 0, this.ends_, this.stride);
  }
  /**
   * @return {Array<number>} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * @return {Array<number>} Interior point.
   */
  getFlatInteriorPoint() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      const flatCenter = getCenter(this.getExtent());
      this.flatInteriorPoint_ = getInteriorPointOfArray(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        flatCenter,
        0
      );
      this.flatInteriorPointRevision_ = this.getRevision();
    }
    return this.flatInteriorPoint_;
  }
  /**
   * Return an interior point of the polygon.
   * @return {Point} Interior point as XYM coordinate, where M is the
   * length of the horizontal intersection that the point belongs to.
   * @api
   */
  getInteriorPoint() {
    return new Point_default(this.getFlatInteriorPoint(), "XYM");
  }
  /**
   * Return the number of rings of the polygon,  this includes the exterior
   * ring and any interior rings.
   *
   * @return {number} Number of rings.
   * @api
   */
  getLinearRingCount() {
    return this.ends_.length;
  }
  /**
   * Return the Nth linear ring of the polygon geometry. Return `null` if the
   * given index is out of range.
   * The exterior linear ring is available at index `0` and the interior rings
   * at index `1` and beyond.
   *
   * @param {number} index Index.
   * @return {LinearRing|null} Linear ring.
   * @api
   */
  getLinearRing(index) {
    if (index < 0 || this.ends_.length <= index) {
      return null;
    }
    return new LinearRing_default(
      this.flatCoordinates.slice(
        index === 0 ? 0 : this.ends_[index - 1],
        this.ends_[index]
      ),
      this.layout
    );
  }
  /**
   * Return the linear rings of the polygon.
   * @return {Array<LinearRing>} Linear rings.
   * @api
   */
  getLinearRings() {
    const layout = this.layout;
    const flatCoordinates = this.flatCoordinates;
    const ends = this.ends_;
    const linearRings2 = [];
    let offset = 0;
    for (let i = 0, ii = ends.length; i < ii; ++i) {
      const end = ends[i];
      const linearRing2 = new LinearRing_default(
        flatCoordinates.slice(offset, end),
        layout
      );
      linearRings2.push(linearRing2);
      offset = end;
    }
    return linearRings2;
  }
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const flatCoordinates = this.flatCoordinates;
      if (linearRingsAreOriented(flatCoordinates, 0, this.ends_, this.stride)) {
        this.orientedFlatCoordinates_ = flatCoordinates;
      } else {
        this.orientedFlatCoordinates_ = flatCoordinates.slice();
        this.orientedFlatCoordinates_.length = orientLinearRings(
          this.orientedFlatCoordinates_,
          0,
          this.ends_,
          this.stride
        );
      }
      this.orientedRevision_ = this.getRevision();
    }
    return this.orientedFlatCoordinates_;
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Polygon} Simplified Polygon.
   * @protected
   */
  getSimplifiedGeometryInternal(squaredTolerance) {
    const simplifiedFlatCoordinates = [];
    const simplifiedEnds = [];
    simplifiedFlatCoordinates.length = quantizeArray(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      Math.sqrt(squaredTolerance),
      simplifiedFlatCoordinates,
      0,
      simplifiedEnds
    );
    return new _Polygon(simplifiedFlatCoordinates, "XY", simplifiedEnds);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */
  getType() {
    return "Polygon";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */
  intersectsExtent(extent) {
    return intersectsLinearRingArray(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      extent
    );
  }
  /**
   * Set the coordinates of the polygon.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */
  setCoordinates(coordinates2, layout) {
    this.setLayout(layout, coordinates2, 2);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    const ends = deflateCoordinatesArray(
      this.flatCoordinates,
      0,
      coordinates2,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
    this.changed();
  }
};
function fromExtent(extent) {
  const minX = extent[0];
  const minY = extent[1];
  const maxX = extent[2];
  const maxY = extent[3];
  const flatCoordinates = [
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
  return new Polygon(flatCoordinates, "XY", [flatCoordinates.length]);
}

// ../node_modules/ol/View.js
var DEFAULT_MIN_ZOOM = 0;
var View = class extends Object_default {
  /**
   * @param {ViewOptions} [options] View options.
   */
  constructor(options) {
    super();
    this.on;
    this.once;
    this.un;
    options = Object.assign({}, options);
    this.hints_ = [0, 0];
    this.animations_ = [];
    this.updateAnimationKey_;
    this.projection_ = createProjection(options.projection, "EPSG:3857");
    this.viewportSize_ = [100, 100];
    this.targetCenter_ = null;
    this.targetResolution_;
    this.targetRotation_;
    this.nextCenter_ = null;
    this.nextResolution_;
    this.nextRotation_;
    this.cancelAnchor_ = void 0;
    if (options.projection) {
      disableCoordinateWarning();
    }
    if (options.center) {
      options.center = fromUserCoordinate(options.center, this.projection_);
    }
    if (options.extent) {
      options.extent = fromUserExtent(options.extent, this.projection_);
    }
    this.applyOptions_(options);
  }
  /**
   * Set up the view with the given options.
   * @param {ViewOptions} options View options.
   */
  applyOptions_(options) {
    const properties = Object.assign({}, options);
    for (const key in ViewProperty_default) {
      delete properties[key];
    }
    this.setProperties(properties, true);
    const resolutionConstraintInfo = createResolutionConstraint(options);
    this.maxResolution_ = resolutionConstraintInfo.maxResolution;
    this.minResolution_ = resolutionConstraintInfo.minResolution;
    this.zoomFactor_ = resolutionConstraintInfo.zoomFactor;
    this.resolutions_ = options.resolutions;
    this.padding_ = options.padding;
    this.minZoom_ = resolutionConstraintInfo.minZoom;
    const centerConstraint = createCenterConstraint(options);
    const resolutionConstraint = resolutionConstraintInfo.constraint;
    const rotationConstraint = createRotationConstraint(options);
    this.constraints_ = {
      center: centerConstraint,
      resolution: resolutionConstraint,
      rotation: rotationConstraint
    };
    this.setRotation(options.rotation !== void 0 ? options.rotation : 0);
    this.setCenterInternal(
      options.center !== void 0 ? options.center : null
    );
    if (options.resolution !== void 0) {
      this.setResolution(options.resolution);
    } else if (options.zoom !== void 0) {
      this.setZoom(options.zoom);
    }
  }
  /**
   * Padding (in css pixels).
   * If the map viewport is partially covered with other content (overlays) along
   * its edges, this setting allows to shift the center of the viewport away from that
   * content. The order of the values in the array is top, right, bottom, left.
   * The default is no padding, which is equivalent to `[0, 0, 0, 0]`.
   * @type {Array<number>|undefined}
   * @api
   */
  get padding() {
    return this.padding_;
  }
  set padding(padding) {
    let oldPadding = this.padding_;
    this.padding_ = padding;
    const center = this.getCenterInternal();
    if (center) {
      const newPadding = padding || [0, 0, 0, 0];
      oldPadding = oldPadding || [0, 0, 0, 0];
      const resolution = this.getResolution();
      const offsetX = resolution / 2 * (newPadding[3] - oldPadding[3] + oldPadding[1] - newPadding[1]);
      const offsetY = resolution / 2 * (newPadding[0] - oldPadding[0] + oldPadding[2] - newPadding[2]);
      this.setCenterInternal([center[0] + offsetX, center[1] - offsetY]);
    }
  }
  /**
   * Get an updated version of the view options used to construct the view.  The
   * current resolution (or zoom), center, and rotation are applied to any stored
   * options.  The provided options can be used to apply new min/max zoom or
   * resolution limits.
   * @param {ViewOptions} newOptions New options to be applied.
   * @return {ViewOptions} New options updated with the current view state.
   */
  getUpdatedOptions_(newOptions) {
    const options = this.getProperties();
    if (options.resolution !== void 0) {
      options.resolution = this.getResolution();
    } else {
      options.zoom = this.getZoom();
    }
    options.center = this.getCenterInternal();
    options.rotation = this.getRotation();
    return Object.assign({}, options, newOptions);
  }
  /**
   * Animate the view.  The view's center, zoom (or resolution), and rotation
   * can be animated for smooth transitions between view states.  For example,
   * to animate the view to a new zoom level:
   *
   *     view.animate({zoom: view.getZoom() + 1});
   *
   * By default, the animation lasts one second and uses in-and-out easing.  You
   * can customize this behavior by including `duration` (in milliseconds) and
   * `easing` options (see {@link module:ol/easing}).
   *
   * To chain together multiple animations, call the method with multiple
   * animation objects.  For example, to first zoom and then pan:
   *
   *     view.animate({zoom: 10}, {center: [0, 0]});
   *
   * If you provide a function as the last argument to the animate method, it
   * will get called at the end of an animation series.  The callback will be
   * called with `true` if the animation series completed on its own or `false`
   * if it was cancelled.
   *
   * Animations are cancelled by user interactions (e.g. dragging the map) or by
   * calling `view.setCenter()`, `view.setResolution()`, or `view.setRotation()`
   * (or another method that calls one of these).
   *
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation
   *     options.  Multiple animations can be run in series by passing multiple
   *     options objects.  To run multiple animations in parallel, call the method
   *     multiple times.  An optional callback can be provided as a final
   *     argument.  The callback will be called with a boolean indicating whether
   *     the animation completed without being cancelled.
   * @api
   */
  animate(var_args) {
    if (this.isDef() && !this.getAnimating()) {
      this.resolveConstraints(0);
    }
    const args = new Array(arguments.length);
    for (let i = 0; i < args.length; ++i) {
      let options = arguments[i];
      if (options.center) {
        options = Object.assign({}, options);
        options.center = fromUserCoordinate(
          options.center,
          this.getProjection()
        );
      }
      if (options.anchor) {
        options = Object.assign({}, options);
        options.anchor = fromUserCoordinate(
          options.anchor,
          this.getProjection()
        );
      }
      args[i] = options;
    }
    this.animateInternal.apply(this, args);
  }
  /**
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation options.
   */
  animateInternal(var_args) {
    let animationCount = arguments.length;
    let callback;
    if (animationCount > 1 && typeof arguments[animationCount - 1] === "function") {
      callback = arguments[animationCount - 1];
      --animationCount;
    }
    let i = 0;
    for (; i < animationCount && !this.isDef(); ++i) {
      const state = arguments[i];
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
    let start = Date.now();
    let center = this.targetCenter_.slice();
    let resolution = this.targetResolution_;
    let rotation = this.targetRotation_;
    const series = [];
    for (; i < animationCount; ++i) {
      const options = (
        /** @type {AnimationOptions} */
        arguments[i]
      );
      const animation = {
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
        const delta = modulo(options.rotation - rotation + Math.PI, 2 * Math.PI) - Math.PI;
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
  }
  /**
   * Determine if the view is being animated.
   * @return {boolean} The view is being animated.
   * @api
   */
  getAnimating() {
    return this.hints_[ViewHint_default.ANIMATING] > 0;
  }
  /**
   * Determine if the user is interacting with the view, such as panning or zooming.
   * @return {boolean} The view is being interacted with.
   * @api
   */
  getInteracting() {
    return this.hints_[ViewHint_default.INTERACTING] > 0;
  }
  /**
   * Cancel any ongoing animations.
   * @api
   */
  cancelAnimations() {
    this.setHint(ViewHint_default.ANIMATING, -this.hints_[ViewHint_default.ANIMATING]);
    let anchor;
    for (let i = 0, ii = this.animations_.length; i < ii; ++i) {
      const series = this.animations_[i];
      if (series[0].callback) {
        animationCallback(series[0].callback, false);
      }
      if (!anchor) {
        for (let j = 0, jj = series.length; j < jj; ++j) {
          const animation = series[j];
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
  }
  /**
   * Update all animations.
   */
  updateAnimations_() {
    if (this.updateAnimationKey_ !== void 0) {
      cancelAnimationFrame(this.updateAnimationKey_);
      this.updateAnimationKey_ = void 0;
    }
    if (!this.getAnimating()) {
      return;
    }
    const now = Date.now();
    let more = false;
    for (let i = this.animations_.length - 1; i >= 0; --i) {
      const series = this.animations_[i];
      let seriesComplete = true;
      for (let j = 0, jj = series.length; j < jj; ++j) {
        const animation = series[j];
        if (animation.complete) {
          continue;
        }
        const elapsed = now - animation.start;
        let fraction = animation.duration > 0 ? elapsed / animation.duration : 1;
        if (fraction >= 1) {
          animation.complete = true;
          fraction = 1;
        } else {
          seriesComplete = false;
        }
        const progress = animation.easing(fraction);
        if (animation.sourceCenter) {
          const x0 = animation.sourceCenter[0];
          const y0 = animation.sourceCenter[1];
          const x1 = animation.targetCenter[0];
          const y1 = animation.targetCenter[1];
          this.nextCenter_ = animation.targetCenter;
          const x = x0 + progress * (x1 - x0);
          const y = y0 + progress * (y1 - y0);
          this.targetCenter_ = [x, y];
        }
        if (animation.sourceResolution && animation.targetResolution) {
          const resolution = progress === 1 ? animation.targetResolution : animation.sourceResolution + progress * (animation.targetResolution - animation.sourceResolution);
          if (animation.anchor) {
            const size = this.getViewportSize_(this.getRotation());
            const constrainedResolution = this.constraints_.resolution(
              resolution,
              0,
              size,
              true
            );
            this.targetCenter_ = this.calculateCenterZoom(
              constrainedResolution,
              animation.anchor
            );
          }
          this.nextResolution_ = animation.targetResolution;
          this.targetResolution_ = resolution;
          this.applyTargetState_(true);
        }
        if (animation.sourceRotation !== void 0 && animation.targetRotation !== void 0) {
          const rotation = progress === 1 ? modulo(animation.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : animation.sourceRotation + progress * (animation.targetRotation - animation.sourceRotation);
          if (animation.anchor) {
            const constrainedRotation = this.constraints_.rotation(
              rotation,
              true
            );
            this.targetCenter_ = this.calculateCenterRotate(
              constrainedRotation,
              animation.anchor
            );
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
        const callback = series[0].callback;
        if (callback) {
          animationCallback(callback, true);
        }
      }
    }
    this.animations_ = this.animations_.filter(Boolean);
    if (more && this.updateAnimationKey_ === void 0) {
      this.updateAnimationKey_ = requestAnimationFrame(
        this.updateAnimations_.bind(this)
      );
    }
  }
  /**
   * @param {number} rotation Target rotation.
   * @param {import("./coordinate.js").Coordinate} anchor Rotation anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for rotation and anchor.
   */
  calculateCenterRotate(rotation, anchor) {
    let center;
    const currentCenter = this.getCenterInternal();
    if (currentCenter !== void 0) {
      center = [currentCenter[0] - anchor[0], currentCenter[1] - anchor[1]];
      rotate(center, rotation - this.getRotation());
      add3(center, anchor);
    }
    return center;
  }
  /**
   * @param {number} resolution Target resolution.
   * @param {import("./coordinate.js").Coordinate} anchor Zoom anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for resolution and anchor.
   */
  calculateCenterZoom(resolution, anchor) {
    let center;
    const currentCenter = this.getCenterInternal();
    const currentResolution = this.getResolution();
    if (currentCenter !== void 0 && currentResolution !== void 0) {
      const x = anchor[0] - resolution * (anchor[0] - currentCenter[0]) / currentResolution;
      const y = anchor[1] - resolution * (anchor[1] - currentCenter[1]) / currentResolution;
      center = [x, y];
    }
    return center;
  }
  /**
   * Returns the current viewport size.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size or `[100, 100]` when no viewport is found.
   */
  getViewportSize_(rotation) {
    const size = this.viewportSize_;
    if (rotation) {
      const w = size[0];
      const h = size[1];
      return [
        Math.abs(w * Math.cos(rotation)) + Math.abs(h * Math.sin(rotation)),
        Math.abs(w * Math.sin(rotation)) + Math.abs(h * Math.cos(rotation))
      ];
    }
    return size;
  }
  /**
   * Stores the viewport size on the view. The viewport size is not read every time from the DOM
   * to avoid performance hit and layout reflow.
   * This should be done on map size change.
   * Note: the constraints are not resolved during an animation to avoid stopping it
   * @param {import("./size.js").Size} [size] Viewport size; if undefined, [100, 100] is assumed
   */
  setViewportSize(size) {
    this.viewportSize_ = Array.isArray(size) ? size.slice() : [100, 100];
    if (!this.getAnimating()) {
      this.resolveConstraints(0);
    }
  }
  /**
   * Get the view center.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   * @observable
   * @api
   */
  getCenter() {
    const center = this.getCenterInternal();
    if (!center) {
      return center;
    }
    return toUserCoordinate(center, this.getProjection());
  }
  /**
   * Get the view center without transforming to user projection.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   */
  getCenterInternal() {
    return (
      /** @type {import("./coordinate.js").Coordinate|undefined} */
      this.get(ViewProperty_default.CENTER)
    );
  }
  /**
   * @return {Constraints} Constraints.
   */
  getConstraints() {
    return this.constraints_;
  }
  /**
   * @return {boolean} Resolution constraint is set
   */
  getConstrainResolution() {
    return this.get("constrainResolution");
  }
  /**
   * @param {Array<number>} [hints] Destination array.
   * @return {Array<number>} Hint.
   */
  getHints(hints) {
    if (hints !== void 0) {
      hints[0] = this.hints_[0];
      hints[1] = this.hints_[1];
      return hints;
    }
    return this.hints_.slice();
  }
  /**
   * Calculate the extent for the current view state and the passed size.
   * The size is the pixel dimensions of the box into which the calculated extent
   * should fit. In most cases you want to get the extent of the entire map,
   * that is `map.getSize()`.
   * @param {import("./size.js").Size} [size] Box pixel size. If not provided, the size
   * of the map that uses this view will be used.
   * @return {import("./extent.js").Extent} Extent.
   * @api
   */
  calculateExtent(size) {
    const extent = this.calculateExtentInternal(size);
    return toUserExtent(extent, this.getProjection());
  }
  /**
   * @param {import("./size.js").Size} [size] Box pixel size. If not provided,
   * the map's last known viewport size will be used.
   * @return {import("./extent.js").Extent} Extent.
   */
  calculateExtentInternal(size) {
    size = size || this.getViewportSizeMinusPadding_();
    const center = (
      /** @type {!import("./coordinate.js").Coordinate} */
      this.getCenterInternal()
    );
    assert(center, 1);
    const resolution = (
      /** @type {!number} */
      this.getResolution()
    );
    assert(resolution !== void 0, 2);
    const rotation = (
      /** @type {!number} */
      this.getRotation()
    );
    assert(rotation !== void 0, 3);
    return getForViewAndSize(center, resolution, rotation, size);
  }
  /**
   * Get the maximum resolution of the view.
   * @return {number} The maximum resolution of the view.
   * @api
   */
  getMaxResolution() {
    return this.maxResolution_;
  }
  /**
   * Get the minimum resolution of the view.
   * @return {number} The minimum resolution of the view.
   * @api
   */
  getMinResolution() {
    return this.minResolution_;
  }
  /**
   * Get the maximum zoom level for the view.
   * @return {number} The maximum zoom level.
   * @api
   */
  getMaxZoom() {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.minResolution_)
    );
  }
  /**
   * Set a new maximum zoom level for the view.
   * @param {number} zoom The maximum zoom level.
   * @api
   */
  setMaxZoom(zoom) {
    this.applyOptions_(this.getUpdatedOptions_({ maxZoom: zoom }));
  }
  /**
   * Get the minimum zoom level for the view.
   * @return {number} The minimum zoom level.
   * @api
   */
  getMinZoom() {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.maxResolution_)
    );
  }
  /**
   * Set a new minimum zoom level for the view.
   * @param {number} zoom The minimum zoom level.
   * @api
   */
  setMinZoom(zoom) {
    this.applyOptions_(this.getUpdatedOptions_({ minZoom: zoom }));
  }
  /**
   * Set whether the view should allow intermediary zoom levels.
   * @param {boolean} enabled Whether the resolution is constrained.
   * @api
   */
  setConstrainResolution(enabled) {
    this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: enabled }));
  }
  /**
   * Get the view projection.
   * @return {import("./proj/Projection.js").default} The projection of the view.
   * @api
   */
  getProjection() {
    return this.projection_;
  }
  /**
   * Get the view resolution.
   * @return {number|undefined} The resolution of the view.
   * @observable
   * @api
   */
  getResolution() {
    return (
      /** @type {number|undefined} */
      this.get(ViewProperty_default.RESOLUTION)
    );
  }
  /**
   * Get the resolutions for the view. This returns the array of resolutions
   * passed to the constructor of the View, or undefined if none were given.
   * @return {Array<number>|undefined} The resolutions of the view.
   * @api
   */
  getResolutions() {
    return this.resolutions_;
  }
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   * @api
   */
  getResolutionForExtent(extent, size) {
    return this.getResolutionForExtentInternal(
      fromUserExtent(extent, this.getProjection()),
      size
    );
  }
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   */
  getResolutionForExtentInternal(extent, size) {
    size = size || this.getViewportSizeMinusPadding_();
    const xResolution = getWidth(extent) / size[0];
    const yResolution = getHeight(extent) / size[1];
    return Math.max(xResolution, yResolution);
  }
  /**
   * Return a function that returns a value between 0 and 1 for a
   * resolution. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Resolution for value function.
   */
  getResolutionForValueFunction(power) {
    power = power || 2;
    const maxResolution = this.getConstrainedResolution(this.maxResolution_);
    const minResolution = this.minResolution_;
    const max = Math.log(maxResolution / minResolution) / Math.log(power);
    return (
      /**
       * @param {number} value Value.
       * @return {number} Resolution.
       */
      function(value) {
        const resolution = maxResolution / Math.pow(power, value * max);
        return resolution;
      }
    );
  }
  /**
   * Get the view rotation.
   * @return {number} The rotation of the view in radians.
   * @observable
   * @api
   */
  getRotation() {
    return (
      /** @type {number} */
      this.get(ViewProperty_default.ROTATION)
    );
  }
  /**
   * Return a function that returns a resolution for a value between
   * 0 and 1. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Value for resolution function.
   */
  getValueForResolutionFunction(power) {
    const logPower = Math.log(power || 2);
    const maxResolution = this.getConstrainedResolution(this.maxResolution_);
    const minResolution = this.minResolution_;
    const max = Math.log(maxResolution / minResolution) / logPower;
    return (
      /**
       * @param {number} resolution Resolution.
       * @return {number} Value.
       */
      function(resolution) {
        const value = Math.log(maxResolution / resolution) / logPower / max;
        return value;
      }
    );
  }
  /**
   * Returns the size of the viewport minus padding.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size reduced by the padding.
   */
  getViewportSizeMinusPadding_(rotation) {
    let size = this.getViewportSize_(rotation);
    const padding = this.padding_;
    if (padding) {
      size = [
        size[0] - padding[1] - padding[3],
        size[1] - padding[0] - padding[2]
      ];
    }
    return size;
  }
  /**
   * @return {State} View state.
   */
  getState() {
    const projection = this.getProjection();
    const resolution = this.getResolution();
    const rotation = this.getRotation();
    let center = (
      /** @type {import("./coordinate.js").Coordinate} */
      this.getCenterInternal()
    );
    const padding = this.padding_;
    if (padding) {
      const reducedSize = this.getViewportSizeMinusPadding_();
      center = calculateCenterOn(
        center,
        this.getViewportSize_(),
        [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]],
        resolution,
        rotation
      );
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
  }
  /**
   * @return {ViewStateAndExtent} Like `FrameState`, but just `viewState` and `extent`.
   */
  getViewStateAndExtent() {
    return {
      viewState: this.getState(),
      extent: this.calculateExtent()
    };
  }
  /**
   * Get the current zoom level. This method may return non-integer zoom levels
   * if the view does not constrain the resolution, or if an interaction or
   * animation is underway.
   * @return {number|undefined} Zoom.
   * @api
   */
  getZoom() {
    let zoom;
    const resolution = this.getResolution();
    if (resolution !== void 0) {
      zoom = this.getZoomForResolution(resolution);
    }
    return zoom;
  }
  /**
   * Get the zoom level for a resolution.
   * @param {number} resolution The resolution.
   * @return {number|undefined} The zoom level for the provided resolution.
   * @api
   */
  getZoomForResolution(resolution) {
    let offset = this.minZoom_ || 0;
    let max, zoomFactor;
    if (this.resolutions_) {
      const nearest = linearFindNearest(this.resolutions_, resolution, 1);
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
  }
  /**
   * Get the resolution for a zoom level.
   * @param {number} zoom Zoom level.
   * @return {number} The view resolution for the provided zoom level.
   * @api
   */
  getResolutionForZoom(zoom) {
    if (this.resolutions_) {
      if (this.resolutions_.length <= 1) {
        return 0;
      }
      const baseLevel = clamp(
        Math.floor(zoom),
        0,
        this.resolutions_.length - 2
      );
      const zoomFactor = this.resolutions_[baseLevel] / this.resolutions_[baseLevel + 1];
      return this.resolutions_[baseLevel] / Math.pow(zoomFactor, clamp(zoom - baseLevel, 0, 1));
    }
    return this.maxResolution_ / Math.pow(this.zoomFactor_, zoom - this.minZoom_);
  }
  /**
   * Fit the given geometry or extent based on the given map size and border.
   * The size is pixel dimensions of the box to fit the extent into.
   * In most cases you will want to use the map size, that is `map.getSize()`.
   * Takes care of the map angle.
   * @param {import("./geom/SimpleGeometry.js").default|import("./extent.js").Extent} geometryOrExtent The geometry or
   *     extent to fit the view to.
   * @param {FitOptions} [options] Options.
   * @api
   */
  fit(geometryOrExtent, options) {
    let geometry;
    assert(
      Array.isArray(geometryOrExtent) || typeof /** @type {?} */
      geometryOrExtent.getSimplifiedGeometry === "function",
      24
    );
    if (Array.isArray(geometryOrExtent)) {
      assert(!isEmpty2(geometryOrExtent), 25);
      const extent = fromUserExtent(geometryOrExtent, this.getProjection());
      geometry = fromExtent(extent);
    } else if (geometryOrExtent.getType() === "Circle") {
      const extent = fromUserExtent(
        geometryOrExtent.getExtent(),
        this.getProjection()
      );
      geometry = fromExtent(extent);
      geometry.rotate(this.getRotation(), getCenter(extent));
    } else {
      const userProjection2 = getUserProjection();
      if (userProjection2) {
        geometry = /** @type {import("./geom/SimpleGeometry.js").default} */
        geometryOrExtent.clone().transform(userProjection2, this.getProjection());
      } else {
        geometry = geometryOrExtent;
      }
    }
    this.fitInternal(geometry, options);
  }
  /**
   * Calculate rotated extent
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @return {import("./extent").Extent} The rotated extent for the geometry.
   */
  rotatedExtentForGeometry(geometry) {
    const rotation = this.getRotation();
    const cosAngle = Math.cos(rotation);
    const sinAngle = Math.sin(-rotation);
    const coords = geometry.getFlatCoordinates();
    const stride = geometry.getStride();
    let minRotX = Infinity;
    let minRotY = Infinity;
    let maxRotX = -Infinity;
    let maxRotY = -Infinity;
    for (let i = 0, ii = coords.length; i < ii; i += stride) {
      const rotX = coords[i] * cosAngle - coords[i + 1] * sinAngle;
      const rotY = coords[i] * sinAngle + coords[i + 1] * cosAngle;
      minRotX = Math.min(minRotX, rotX);
      minRotY = Math.min(minRotY, rotY);
      maxRotX = Math.max(maxRotX, rotX);
      maxRotY = Math.max(maxRotY, rotY);
    }
    return [minRotX, minRotY, maxRotX, maxRotY];
  }
  /**
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @param {FitOptions} [options] Options.
   */
  fitInternal(geometry, options) {
    options = options || {};
    let size = options.size;
    if (!size) {
      size = this.getViewportSizeMinusPadding_();
    }
    const padding = options.padding !== void 0 ? options.padding : [0, 0, 0, 0];
    const nearest = options.nearest !== void 0 ? options.nearest : false;
    let minResolution;
    if (options.minResolution !== void 0) {
      minResolution = options.minResolution;
    } else if (options.maxZoom !== void 0) {
      minResolution = this.getResolutionForZoom(options.maxZoom);
    } else {
      minResolution = 0;
    }
    const rotatedExtent = this.rotatedExtentForGeometry(geometry);
    let resolution = this.getResolutionForExtentInternal(rotatedExtent, [
      size[0] - padding[1] - padding[3],
      size[1] - padding[0] - padding[2]
    ]);
    resolution = isNaN(resolution) ? minResolution : Math.max(resolution, minResolution);
    resolution = this.getConstrainedResolution(resolution, nearest ? 0 : 1);
    const rotation = this.getRotation();
    const sinAngle = Math.sin(rotation);
    const cosAngle = Math.cos(rotation);
    const centerRot = getCenter(rotatedExtent);
    centerRot[0] += (padding[1] - padding[3]) / 2 * resolution;
    centerRot[1] += (padding[0] - padding[2]) / 2 * resolution;
    const centerX = centerRot[0] * cosAngle - centerRot[1] * sinAngle;
    const centerY = centerRot[1] * cosAngle + centerRot[0] * sinAngle;
    const center = this.getConstrainedCenter([centerX, centerY], resolution);
    const callback = options.callback ? options.callback : VOID;
    if (options.duration !== void 0) {
      this.animateInternal(
        {
          resolution,
          center,
          duration: options.duration,
          easing: options.easing
        },
        callback
      );
    } else {
      this.targetResolution_ = resolution;
      this.targetCenter_ = center;
      this.applyTargetState_(false, true);
      animationCallback(callback, true);
    }
  }
  /**
   * Center on coordinate and view position.
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   * @api
   */
  centerOn(coordinate, size, position) {
    this.centerOnInternal(
      fromUserCoordinate(coordinate, this.getProjection()),
      size,
      position
    );
  }
  /**
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   */
  centerOnInternal(coordinate, size, position) {
    this.setCenterInternal(
      calculateCenterOn(
        coordinate,
        size,
        position,
        this.getResolution(),
        this.getRotation()
      )
    );
  }
  /**
   * Calculates the shift between map and viewport center.
   * @param {import("./coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {import("./size.js").Size} size Size.
   * @return {Array<number>|undefined} Center shift.
   */
  calculateCenterShift(center, resolution, rotation, size) {
    let centerShift;
    const padding = this.padding_;
    if (padding && center) {
      const reducedSize = this.getViewportSizeMinusPadding_(-rotation);
      const shiftedCenter = calculateCenterOn(
        center,
        size,
        [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]],
        resolution,
        rotation
      );
      centerShift = [
        center[0] - shiftedCenter[0],
        center[1] - shiftedCenter[1]
      ];
    }
    return centerShift;
  }
  /**
   * @return {boolean} Is defined.
   */
  isDef() {
    return !!this.getCenterInternal() && this.getResolution() !== void 0;
  }
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   * @api
   */
  adjustCenter(deltaCoordinates) {
    const center = toUserCoordinate(this.targetCenter_, this.getProjection());
    this.setCenter([
      center[0] + deltaCoordinates[0],
      center[1] + deltaCoordinates[1]
    ]);
  }
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   */
  adjustCenterInternal(deltaCoordinates) {
    const center = this.targetCenter_;
    this.setCenterInternal([
      center[0] + deltaCoordinates[0],
      center[1] + deltaCoordinates[1]
    ]);
  }
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  adjustResolution(ratio, anchor) {
    anchor = anchor && fromUserCoordinate(anchor, this.getProjection());
    this.adjustResolutionInternal(ratio, anchor);
  }
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  adjustResolutionInternal(ratio, anchor) {
    const isMoving = this.getAnimating() || this.getInteracting();
    const size = this.getViewportSize_(this.getRotation());
    const newResolution = this.constraints_.resolution(
      this.targetResolution_ * ratio,
      0,
      size,
      isMoving
    );
    if (anchor) {
      this.targetCenter_ = this.calculateCenterZoom(newResolution, anchor);
    }
    this.targetResolution_ *= ratio;
    this.applyTargetState_();
  }
  /**
   * Adds a value to the view zoom level, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom level.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  adjustZoom(delta, anchor) {
    this.adjustResolution(Math.pow(this.zoomFactor_, -delta), anchor);
  }
  /**
   * Adds a value to the view rotation, optionally using an anchor. Any rotation
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   * @api
   */
  adjustRotation(delta, anchor) {
    if (anchor) {
      anchor = fromUserCoordinate(anchor, this.getProjection());
    }
    this.adjustRotationInternal(delta, anchor);
  }
  /**
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   */
  adjustRotationInternal(delta, anchor) {
    const isMoving = this.getAnimating() || this.getInteracting();
    const newRotation = this.constraints_.rotation(
      this.targetRotation_ + delta,
      isMoving
    );
    if (anchor) {
      this.targetCenter_ = this.calculateCenterRotate(newRotation, anchor);
    }
    this.targetRotation_ += delta;
    this.applyTargetState_();
  }
  /**
   * Set the center of the current view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   * @observable
   * @api
   */
  setCenter(center) {
    this.setCenterInternal(
      center ? fromUserCoordinate(center, this.getProjection()) : center
    );
  }
  /**
   * Set the center using the view projection (not the user projection).
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   */
  setCenterInternal(center) {
    this.targetCenter_ = center;
    this.applyTargetState_();
  }
  /**
   * @param {import("./ViewHint.js").default} hint Hint.
   * @param {number} delta Delta.
   * @return {number} New value.
   */
  setHint(hint, delta) {
    this.hints_[hint] += delta;
    this.changed();
    return this.hints_[hint];
  }
  /**
   * Set the resolution for this view. Any resolution constraint will apply.
   * @param {number|undefined} resolution The resolution of the view.
   * @observable
   * @api
   */
  setResolution(resolution) {
    this.targetResolution_ = resolution;
    this.applyTargetState_();
  }
  /**
   * Set the rotation for this view. Any rotation constraint will apply.
   * @param {number} rotation The rotation of the view in radians.
   * @observable
   * @api
   */
  setRotation(rotation) {
    this.targetRotation_ = rotation;
    this.applyTargetState_();
  }
  /**
   * Zoom to a specific zoom level. Any resolution constrain will apply.
   * @param {number} zoom Zoom level.
   * @api
   */
  setZoom(zoom) {
    this.setResolution(this.getResolutionForZoom(zoom));
  }
  /**
   * Recompute rotation/resolution/center based on target values.
   * Note: we have to compute rotation first, then resolution and center considering that
   * parameters can influence one another in case a view extent constraint is present.
   * @param {boolean} [doNotCancelAnims] Do not cancel animations.
   * @param {boolean} [forceMoving] Apply constraints as if the view is moving.
   * @private
   */
  applyTargetState_(doNotCancelAnims, forceMoving) {
    const isMoving = this.getAnimating() || this.getInteracting() || forceMoving;
    const newRotation = this.constraints_.rotation(
      this.targetRotation_,
      isMoving
    );
    const size = this.getViewportSize_(newRotation);
    const newResolution = this.constraints_.resolution(
      this.targetResolution_,
      0,
      size,
      isMoving
    );
    const newCenter = this.constraints_.center(
      this.targetCenter_,
      newResolution,
      size,
      isMoving,
      this.calculateCenterShift(
        this.targetCenter_,
        newResolution,
        newRotation,
        size
      )
    );
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
    if (this.getAnimating() && !doNotCancelAnims) {
      this.cancelAnimations();
    }
    this.cancelAnchor_ = void 0;
  }
  /**
   * If any constraints need to be applied, an animation will be triggered.
   * This is typically done on interaction end.
   * Note: calling this with a duration of 0 will apply the constrained values straight away,
   * without animation.
   * @param {number} [duration] The animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  resolveConstraints(duration, resolutionDirection, anchor) {
    duration = duration !== void 0 ? duration : 200;
    const direction = resolutionDirection || 0;
    const newRotation = this.constraints_.rotation(this.targetRotation_);
    const size = this.getViewportSize_(newRotation);
    const newResolution = this.constraints_.resolution(
      this.targetResolution_,
      direction,
      size
    );
    const newCenter = this.constraints_.center(
      this.targetCenter_,
      newResolution,
      size,
      false,
      this.calculateCenterShift(
        this.targetCenter_,
        newResolution,
        newRotation,
        size
      )
    );
    if (duration === 0 && !this.cancelAnchor_) {
      this.targetResolution_ = newResolution;
      this.targetRotation_ = newRotation;
      this.targetCenter_ = newCenter;
      this.applyTargetState_();
      return;
    }
    anchor = anchor || (duration === 0 ? this.cancelAnchor_ : void 0);
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
  }
  /**
   * Notify the View that an interaction has started.
   * The view state will be resolved to a stable one if needed
   * (depending on its constraints).
   * @api
   */
  beginInteraction() {
    this.resolveConstraints(0);
    this.setHint(ViewHint_default.INTERACTING, 1);
  }
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  endInteraction(duration, resolutionDirection, anchor) {
    anchor = anchor && fromUserCoordinate(anchor, this.getProjection());
    this.endInteractionInternal(duration, resolutionDirection, anchor);
  }
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  endInteractionInternal(duration, resolutionDirection, anchor) {
    if (!this.getInteracting()) {
      return;
    }
    this.setHint(ViewHint_default.INTERACTING, -1);
    this.resolveConstraints(duration, resolutionDirection, anchor);
  }
  /**
   * Get a valid position for the view center according to the current constraints.
   * @param {import("./coordinate.js").Coordinate|undefined} targetCenter Target center position.
   * @param {number} [targetResolution] Target resolution. If not supplied, the current one will be used.
   * This is useful to guess a valid center position at a different zoom level.
   * @return {import("./coordinate.js").Coordinate|undefined} Valid center position.
   */
  getConstrainedCenter(targetCenter, targetResolution) {
    const size = this.getViewportSize_(this.getRotation());
    return this.constraints_.center(
      targetCenter,
      targetResolution || this.getResolution(),
      size
    );
  }
  /**
   * Get a valid zoom level according to the current view constraints.
   * @param {number|undefined} targetZoom Target zoom.
   * @param {number} [direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid zoom level.
   */
  getConstrainedZoom(targetZoom, direction) {
    const targetRes = this.getResolutionForZoom(targetZoom);
    return this.getZoomForResolution(
      this.getConstrainedResolution(targetRes, direction)
    );
  }
  /**
   * Get a valid resolution according to the current view constraints.
   * @param {number|undefined} targetResolution Target resolution.
   * @param {number} [direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid resolution.
   */
  getConstrainedResolution(targetResolution, direction) {
    direction = direction || 0;
    const size = this.getViewportSize_(this.getRotation());
    return this.constraints_.resolution(targetResolution, direction, size);
  }
};
function animationCallback(callback, returnValue) {
  setTimeout(function() {
    callback(returnValue);
  }, 0);
}
function createCenterConstraint(options) {
  if (options.extent !== void 0) {
    const smooth = options.smoothExtentConstraint !== void 0 ? options.smoothExtentConstraint : true;
    return createExtent(options.extent, options.constrainOnlyCenter, smooth);
  }
  const projection = createProjection(options.projection, "EPSG:3857");
  if (options.multiWorld !== true && projection.isGlobal()) {
    const extent = projection.getExtent().slice();
    extent[0] = -Infinity;
    extent[2] = Infinity;
    return createExtent(extent, false, false);
  }
  return none;
}
function createResolutionConstraint(options) {
  let resolutionConstraint;
  let maxResolution;
  let minResolution;
  const defaultMaxZoom = 28;
  const defaultZoomFactor = 2;
  let minZoom = options.minZoom !== void 0 ? options.minZoom : DEFAULT_MIN_ZOOM;
  let maxZoom = options.maxZoom !== void 0 ? options.maxZoom : defaultMaxZoom;
  const zoomFactor = options.zoomFactor !== void 0 ? options.zoomFactor : defaultZoomFactor;
  const multiWorld = options.multiWorld !== void 0 ? options.multiWorld : false;
  const smooth = options.smoothResolutionConstraint !== void 0 ? options.smoothResolutionConstraint : true;
  const showFullExtent = options.showFullExtent !== void 0 ? options.showFullExtent : false;
  const projection = createProjection(options.projection, "EPSG:3857");
  const projExtent = projection.getExtent();
  let constrainOnlyCenter = options.constrainOnlyCenter;
  let extent = options.extent;
  if (!multiWorld && !extent && projection.isGlobal()) {
    constrainOnlyCenter = false;
    extent = projExtent;
  }
  if (options.resolutions !== void 0) {
    const resolutions = options.resolutions;
    maxResolution = resolutions[minZoom];
    minResolution = resolutions[maxZoom] !== void 0 ? resolutions[maxZoom] : resolutions[resolutions.length - 1];
    if (options.constrainResolution) {
      resolutionConstraint = createSnapToResolutions(
        resolutions,
        smooth,
        !constrainOnlyCenter && extent,
        showFullExtent
      );
    } else {
      resolutionConstraint = createMinMaxResolution(
        maxResolution,
        minResolution,
        smooth,
        !constrainOnlyCenter && extent,
        showFullExtent
      );
    }
  } else {
    const size = !projExtent ? (
      // use an extent that can fit the whole world if need be
      360 * METERS_PER_UNIT.degrees / projection.getMetersPerUnit()
    ) : Math.max(getWidth(projExtent), getHeight(projExtent));
    const defaultMaxResolution = size / DEFAULT_TILE_SIZE / Math.pow(defaultZoomFactor, DEFAULT_MIN_ZOOM);
    const defaultMinResolution = defaultMaxResolution / Math.pow(defaultZoomFactor, defaultMaxZoom - DEFAULT_MIN_ZOOM);
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
    maxZoom = minZoom + Math.floor(
      Math.log(maxResolution / minResolution) / Math.log(zoomFactor)
    );
    minResolution = maxResolution / Math.pow(zoomFactor, maxZoom - minZoom);
    if (options.constrainResolution) {
      resolutionConstraint = createSnapToPower(
        zoomFactor,
        maxResolution,
        minResolution,
        smooth,
        !constrainOnlyCenter && extent,
        showFullExtent
      );
    } else {
      resolutionConstraint = createMinMaxResolution(
        maxResolution,
        minResolution,
        smooth,
        !constrainOnlyCenter && extent,
        showFullExtent
      );
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
  const enableRotation = options.enableRotation !== void 0 ? options.enableRotation : true;
  if (enableRotation) {
    const constrainRotation = options.constrainRotation;
    if (constrainRotation === void 0 || constrainRotation === true) {
      return createSnapToZero();
    } else if (constrainRotation === false) {
      return none2;
    } else if (typeof constrainRotation === "number") {
      return createSnapToN(constrainRotation);
    }
    return none2;
  }
  return disable;
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
  const cosAngle = Math.cos(-rotation);
  let sinAngle = Math.sin(-rotation);
  let rotX = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
  let rotY = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
  rotX += (size[0] / 2 - position[0]) * resolution;
  rotY += (position[1] - size[1] / 2) * resolution;
  sinAngle = -sinAngle;
  const centerX = rotX * cosAngle - rotY * sinAngle;
  const centerY = rotY * cosAngle + rotX * sinAngle;
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
