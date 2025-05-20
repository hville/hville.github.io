// ../node_modules/ol/render/VectorContext.js
var VectorContext = class {
  /**
   * Render a geometry with a custom renderer.
   *
   * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   */
  drawCustom(geometry, feature, renderer, hitDetectionRenderer) {
  }
  /**
   * Render a geometry.
   *
   * @param {import("../geom/Geometry.js").default} geometry The geometry to render.
   */
  drawGeometry(geometry) {
  }
  /**
   * Set the rendering style.
   *
   * @param {import("../style/Style.js").default} style The rendering style.
   */
  setStyle(style) {
  }
  /**
   * @param {import("../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../Feature.js").default} feature Feature.
   */
  drawCircle(circleGeometry, feature) {
  }
  /**
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("../style/Style.js").default} style Style.
   */
  drawFeature(feature, style) {
  }
  /**
   * @param {import("../geom/GeometryCollection.js").default} geometryCollectionGeometry Geometry collection.
   * @param {import("../Feature.js").default} feature Feature.
   */
  drawGeometryCollection(geometryCollectionGeometry, feature) {
  }
  /**
   * @param {import("../geom/LineString.js").default|import("./Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawLineString(lineStringGeometry, feature) {
  }
  /**
   * @param {import("../geom/MultiLineString.js").default|import("./Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawMultiLineString(multiLineStringGeometry, feature) {
  }
  /**
   * @param {import("../geom/MultiPoint.js").default|import("./Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawMultiPoint(multiPointGeometry, feature) {
  }
  /**
   * @param {import("../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawMultiPolygon(multiPolygonGeometry, feature) {
  }
  /**
   * @param {import("../geom/Point.js").default|import("./Feature.js").default} pointGeometry Point geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawPoint(pointGeometry, feature) {
  }
  /**
   * @param {import("../geom/Polygon.js").default|import("./Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawPolygon(polygonGeometry, feature) {
  }
  /**
   * @param {import("../geom/SimpleGeometry.js").default|import("./Feature.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawText(geometry, feature) {
  }
  /**
   * @param {import("../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../style/Stroke.js").default} strokeStyle Stroke style.
   */
  setFillStrokeStyle(fillStyle, strokeStyle) {
  }
  /**
   * @param {import("../style/Image.js").default} imageStyle Image style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with a text style.
   */
  setImageStyle(imageStyle, declutterImageWithText) {
  }
  /**
   * @param {import("../style/Text.js").default} textStyle Text style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with an image style.
   */
  setTextStyle(textStyle, declutterImageWithText) {
  }
};
var VectorContext_default = VectorContext;

// ../node_modules/ol/math.js
function toFixed(n, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}

// ../node_modules/ol/color.js
function toString(color) {
  let r = color[0];
  if (r != (r | 0)) {
    r = r + 0.5 | 0;
  }
  let g = color[1];
  if (g != (g | 0)) {
    g = g + 0.5 | 0;
  }
  let b = color[2];
  if (b != (b | 0)) {
    b = b + 0.5 | 0;
  }
  const a = color[3] === void 0 ? 1 : Math.round(color[3] * 100) / 100;
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

// ../node_modules/ol/colorlike.js
function asColorLike(color) {
  if (Array.isArray(color)) {
    return toString(color);
  }
  return color;
}

// ../node_modules/ol/has.js
var ua = typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined" ? navigator.userAgent.toLowerCase() : "";
var FIREFOX = ua.includes("firefox");
var SAFARI = ua.includes("safari") && !ua.includes("chrom");
var SAFARI_BUG_237906 = SAFARI && (ua.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(ua));
var WEBKIT = ua.includes("webkit") && !ua.includes("edge");
var MAC = ua.includes("macintosh");
var DEVICE_PIXEL_RATIO = typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1;
var WORKER_OFFSCREEN_CANVAS = typeof WorkerGlobalScope !== "undefined" && typeof OffscreenCanvas !== "undefined" && self instanceof WorkerGlobalScope;
var IMAGE_DECODE = typeof Image !== "undefined" && Image.prototype.decode;
var PASSIVE_EVENT_LISTENERS = function() {
  let passive = false;
  try {
    const options = Object.defineProperty({}, "passive", {
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
  const a1 = transform1[0];
  const b1 = transform1[1];
  const c1 = transform1[2];
  const d1 = transform1[3];
  const e1 = transform1[4];
  const f1 = transform1[5];
  const a2 = transform2[0];
  const b2 = transform2[1];
  const c2 = transform2[2];
  const d2 = transform2[3];
  const e2 = transform2[4];
  const f2 = transform2[5];
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
  const x = coordinate[0];
  const y = coordinate[1];
  coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
  coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
  return coordinate;
}
function scale(transform, x, y) {
  return multiply(transform, set(tmp_, x, 0, 0, y, 0, 0));
}
function compose(transform, dx1, dy1, sx, sy, angle, dx2, dy2) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  transform[0] = sx * cos;
  transform[1] = sy * sin;
  transform[2] = -sx * sin;
  transform[3] = sy * cos;
  transform[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
  transform[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
  return transform;
}

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

// ../node_modules/ol/dom.js
function createCanvasContext2D(width, height, canvasPool, settings) {
  let canvas;
  if (canvasPool && canvasPool.length) {
    canvas = canvasPool.shift();
  } else if (WORKER_OFFSCREEN_CANVAS) {
    canvas = new OffscreenCanvas(width || 300, height || 300);
  } else {
    canvas = document.createElement("canvas");
  }
  if (width) {
    canvas.width = width;
  }
  if (height) {
    canvas.height = height;
  }
  return (
    /** @type {CanvasRenderingContext2D} */
    canvas.getContext("2d", settings)
  );
}

// ../node_modules/ol/css.js
var fontRegEx = new RegExp(
  [
    "^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)",
    "(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?",
    "(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))",
    "(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",
    `?\\s*([-,\\"\\'\\sa-z]+?)\\s*$`
  ].join(""),
  "i"
);
var fontRegExMatchIndex = [
  "style",
  "variant",
  "weight",
  "size",
  "lineHeight",
  "family"
];
var getFontParameters = function(fontSpec) {
  const match = fontSpec.match(fontRegEx);
  if (!match) {
    return null;
  }
  const style = (
    /** @type {FontParameters} */
    {
      lineHeight: "normal",
      size: "1.2em",
      style: "normal",
      weight: "normal",
      variant: "normal"
    }
  );
  for (let i = 0, ii = fontRegExMatchIndex.length; i < ii; ++i) {
    const value = match[i + 1];
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
var measureContext = null;
var measureFont;
var textHeights = {};
var registerFont = function() {
  const retries = 100;
  const size = "32px ";
  const referenceFonts = ["monospace", "serif"];
  const len = referenceFonts.length;
  const text = "wmytzilWMYTZIL@#/&?$%10\uF013";
  let interval, referenceWidth;
  function isAvailable(fontStyle, fontWeight, fontFamily) {
    let available = true;
    for (let i = 0; i < len; ++i) {
      const referenceFont = referenceFonts[i];
      referenceWidth = measureTextWidth(
        fontStyle + " " + fontWeight + " " + size + referenceFont,
        text
      );
      if (fontFamily != referenceFont) {
        const width = measureTextWidth(
          fontStyle + " " + fontWeight + " " + size + fontFamily + "," + referenceFont,
          text
        );
        available = available && width != referenceWidth;
      }
    }
    if (available) {
      return true;
    }
    return false;
  }
  function check() {
    let done = true;
    const fonts = checkedFonts.getKeys();
    for (let i = 0, ii = fonts.length; i < ii; ++i) {
      const font = fonts[i];
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
    const font = getFontParameters(fontSpec);
    if (!font) {
      return;
    }
    const families = font.families;
    for (let i = 0, ii = families.length; i < ii; ++i) {
      const family = families[i];
      const key = font.style + "\n" + font.weight + "\n" + family;
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
function intersects(extent1, extent2) {
  return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
}

// ../node_modules/ol/geom/flat/transform.js
function transform2D(flatCoordinates, offset, end, stride, transform, dest) {
  dest = dest ? dest : [];
  let i = 0;
  for (let j = offset; j < end; j += stride) {
    const x = flatCoordinates[j];
    const y = flatCoordinates[j + 1];
    dest[i++] = transform[0] * x + transform[2] * y + transform[4];
    dest[i++] = transform[1] * x + transform[3] * y + transform[5];
  }
  if (dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}

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
function get(sourceCode, destinationCode) {
  let transform;
  if (sourceCode in transforms && destinationCode in transforms[sourceCode]) {
    transform = transforms[sourceCode][destinationCode];
  }
  return transform;
}

// ../node_modules/ol/proj.js
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
  const sourceCode = sourceProjection.getCode();
  const destinationCode = destinationProjection.getCode();
  let transformFunc = get(sourceCode, destinationCode);
  if (!transformFunc) {
    transformFunc = identityTransform;
  }
  return transformFunc;
}
var userProjection = null;
function getUserProjection() {
  return userProjection;
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

// ../node_modules/ol/geom/SimpleGeometry.js
function transformGeom2D(simpleGeometry, transform, dest) {
  const flatCoordinates = simpleGeometry.getFlatCoordinates();
  if (!flatCoordinates) {
    return null;
  }
  const stride = simpleGeometry.getStride();
  return transform2D(
    flatCoordinates,
    0,
    flatCoordinates.length,
    stride,
    transform,
    dest
  );
}

// ../node_modules/ol/render/canvas/Immediate.js
var CanvasImmediateRenderer = class extends VectorContext_default {
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../extent.js").Extent} extent Extent.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {number} [squaredTolerance] Optional squared tolerance for simplification.
   * @param {import("../../proj.js").TransformFunction} [userTransform] Transform from user to view projection.
   */
  constructor(context, pixelRatio, extent, transform, viewRotation, squaredTolerance, userTransform) {
    super();
    this.context_ = context;
    this.pixelRatio_ = pixelRatio;
    this.extent_ = extent;
    this.transform_ = transform;
    this.transformRotation_ = transform ? toFixed(Math.atan2(transform[1], transform[0]), 10) : 0;
    this.viewRotation_ = viewRotation;
    this.squaredTolerance_ = squaredTolerance;
    this.userTransform_ = userTransform;
    this.contextFillState_ = null;
    this.contextStrokeState_ = null;
    this.contextTextState_ = null;
    this.fillState_ = null;
    this.strokeState_ = null;
    this.image_ = null;
    this.imageAnchorX_ = 0;
    this.imageAnchorY_ = 0;
    this.imageHeight_ = 0;
    this.imageOpacity_ = 0;
    this.imageOriginX_ = 0;
    this.imageOriginY_ = 0;
    this.imageRotateWithView_ = false;
    this.imageRotation_ = 0;
    this.imageScale_ = [0, 0];
    this.imageWidth_ = 0;
    this.text_ = "";
    this.textOffsetX_ = 0;
    this.textOffsetY_ = 0;
    this.textRotateWithView_ = false;
    this.textRotation_ = 0;
    this.textScale_ = [0, 0];
    this.textFillState_ = null;
    this.textStrokeState_ = null;
    this.textState_ = null;
    this.pixelCoordinates_ = [];
    this.tmpLocalTransform_ = create();
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */
  drawImages_(flatCoordinates, offset, end, stride) {
    if (!this.image_) {
      return;
    }
    const pixelCoordinates = transform2D(
      flatCoordinates,
      offset,
      end,
      stride,
      this.transform_,
      this.pixelCoordinates_
    );
    const context = this.context_;
    const localTransform = this.tmpLocalTransform_;
    const alpha = context.globalAlpha;
    if (this.imageOpacity_ != 1) {
      context.globalAlpha = alpha * this.imageOpacity_;
    }
    let rotation = this.imageRotation_;
    if (this.transformRotation_ === 0) {
      rotation -= this.viewRotation_;
    }
    if (this.imageRotateWithView_) {
      rotation += this.viewRotation_;
    }
    for (let i = 0, ii = pixelCoordinates.length; i < ii; i += 2) {
      const x = pixelCoordinates[i] - this.imageAnchorX_;
      const y = pixelCoordinates[i + 1] - this.imageAnchorY_;
      if (rotation !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
        const centerX = x + this.imageAnchorX_;
        const centerY = y + this.imageAnchorY_;
        compose(
          localTransform,
          centerX,
          centerY,
          1,
          1,
          rotation,
          -centerX,
          -centerY
        );
        context.setTransform.apply(context, localTransform);
        context.translate(centerX, centerY);
        context.scale(this.imageScale_[0], this.imageScale_[1]);
        context.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          -this.imageAnchorX_,
          -this.imageAnchorY_,
          this.imageWidth_,
          this.imageHeight_
        );
        context.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        context.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          x,
          y,
          this.imageWidth_,
          this.imageHeight_
        );
      }
    }
    if (this.imageOpacity_ != 1) {
      context.globalAlpha = alpha;
    }
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */
  drawText_(flatCoordinates, offset, end, stride) {
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
    const pixelCoordinates = transform2D(
      flatCoordinates,
      offset,
      end,
      stride,
      this.transform_,
      this.pixelCoordinates_
    );
    const context = this.context_;
    let rotation = this.textRotation_;
    if (this.transformRotation_ === 0) {
      rotation -= this.viewRotation_;
    }
    if (this.textRotateWithView_) {
      rotation += this.viewRotation_;
    }
    for (; offset < end; offset += stride) {
      const x = pixelCoordinates[offset] + this.textOffsetX_;
      const y = pixelCoordinates[offset + 1] + this.textOffsetY_;
      if (rotation !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1) {
        context.translate(x - this.textOffsetX_, y - this.textOffsetY_);
        context.rotate(rotation);
        context.translate(this.textOffsetX_, this.textOffsetY_);
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
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} close Close.
   * @private
   * @return {number} end End.
   */
  moveToLineTo_(flatCoordinates, offset, end, stride, close) {
    const context = this.context_;
    const pixelCoordinates = transform2D(
      flatCoordinates,
      offset,
      end,
      stride,
      this.transform_,
      this.pixelCoordinates_
    );
    context.moveTo(pixelCoordinates[0], pixelCoordinates[1]);
    let length = pixelCoordinates.length;
    if (close) {
      length -= 2;
    }
    for (let i = 2; i < length; i += 2) {
      context.lineTo(pixelCoordinates[i], pixelCoordinates[i + 1]);
    }
    if (close) {
      context.closePath();
    }
    return end;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */
  drawRings_(flatCoordinates, offset, ends, stride) {
    for (let i = 0, ii = ends.length; i < ii; ++i) {
      offset = this.moveToLineTo_(
        flatCoordinates,
        offset,
        ends[i],
        stride,
        true
      );
    }
    return offset;
  }
  /**
   * Render a circle geometry into the canvas.  Rendering is immediate and uses
   * the current fill and stroke styles.
   *
   * @param {import("../../geom/Circle.js").default} geometry Circle geometry.
   * @api
   */
  drawCircle(geometry) {
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
      const pixelCoordinates = transformGeom2D(
        geometry,
        this.transform_,
        this.pixelCoordinates_
      );
      const dx = pixelCoordinates[2] - pixelCoordinates[0];
      const dy = pixelCoordinates[3] - pixelCoordinates[1];
      const radius = Math.sqrt(dx * dx + dy * dy);
      const context = this.context_;
      context.beginPath();
      context.arc(
        pixelCoordinates[0],
        pixelCoordinates[1],
        radius,
        0,
        2 * Math.PI
      );
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
  }
  /**
   * Set the rendering style.  Note that since this is an immediate rendering API,
   * any `zIndex` on the provided style will be ignored.
   *
   * @param {import("../../style/Style.js").default} style The rendering style.
   * @api
   */
  setStyle(style) {
    this.setFillStrokeStyle(style.getFill(), style.getStroke());
    this.setImageStyle(style.getImage());
    this.setTextStyle(style.getText());
  }
  /**
   * @param {import("../../transform.js").Transform} transform Transform.
   */
  setTransform(transform) {
    this.transform_ = transform;
  }
  /**
   * Render a geometry into the canvas.  Call
   * {@link module:ol/render/canvas/Immediate~CanvasImmediateRenderer#setStyle renderer.setStyle()} first to set the rendering style.
   *
   * @param {import("../../geom/Geometry.js").default|import("../Feature.js").default} geometry The geometry to render.
   * @api
   */
  drawGeometry(geometry) {
    const type = geometry.getType();
    switch (type) {
      case "Point":
        this.drawPoint(
          /** @type {import("../../geom/Point.js").default} */
          geometry
        );
        break;
      case "LineString":
        this.drawLineString(
          /** @type {import("../../geom/LineString.js").default} */
          geometry
        );
        break;
      case "Polygon":
        this.drawPolygon(
          /** @type {import("../../geom/Polygon.js").default} */
          geometry
        );
        break;
      case "MultiPoint":
        this.drawMultiPoint(
          /** @type {import("../../geom/MultiPoint.js").default} */
          geometry
        );
        break;
      case "MultiLineString":
        this.drawMultiLineString(
          /** @type {import("../../geom/MultiLineString.js").default} */
          geometry
        );
        break;
      case "MultiPolygon":
        this.drawMultiPolygon(
          /** @type {import("../../geom/MultiPolygon.js").default} */
          geometry
        );
        break;
      case "GeometryCollection":
        this.drawGeometryCollection(
          /** @type {import("../../geom/GeometryCollection.js").default} */
          geometry
        );
        break;
      case "Circle":
        this.drawCircle(
          /** @type {import("../../geom/Circle.js").default} */
          geometry
        );
        break;
      default:
    }
  }
  /**
   * Render a feature into the canvas.  Note that any `zIndex` on the provided
   * style will be ignored - features are rendered immediately in the order that
   * this method is called.  If you need `zIndex` support, you should be using an
   * {@link module:ol/layer/Vector~VectorLayer} instead.
   *
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {import("../../style/Style.js").default} style Style.
   * @api
   */
  drawFeature(feature, style) {
    const geometry = style.getGeometryFunction()(feature);
    if (!geometry || !intersects(this.extent_, geometry.getExtent())) {
      return;
    }
    this.setStyle(style);
    this.drawGeometry(geometry);
  }
  /**
   * Render a GeometryCollection to the canvas.  Rendering is immediate and
   * uses the current styles appropriate for each geometry in the collection.
   *
   * @param {import("../../geom/GeometryCollection.js").default} geometry Geometry collection.
   */
  drawGeometryCollection(geometry) {
    const geometries = geometry.getGeometriesArray();
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      this.drawGeometry(geometries[i]);
    }
  }
  /**
   * Render a Point geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} geometry Point geometry.
   */
  drawPoint(geometry) {
    if (this.squaredTolerance_) {
      geometry = /** @type {import("../../geom/Point.js").default} */
      geometry.simplifyTransformed(
        this.squaredTolerance_,
        this.userTransform_
      );
    }
    const flatCoordinates = geometry.getFlatCoordinates();
    const stride = geometry.getStride();
    if (this.image_) {
      this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
    if (this.text_ !== "") {
      this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
  }
  /**
   * Render a MultiPoint geometry  into the canvas.  Rendering is immediate and
   * uses the current style.
   *
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} geometry MultiPoint geometry.
   */
  drawMultiPoint(geometry) {
    if (this.squaredTolerance_) {
      geometry = /** @type {import("../../geom/MultiPoint.js").default} */
      geometry.simplifyTransformed(
        this.squaredTolerance_,
        this.userTransform_
      );
    }
    const flatCoordinates = geometry.getFlatCoordinates();
    const stride = geometry.getStride();
    if (this.image_) {
      this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
    if (this.text_ !== "") {
      this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
  }
  /**
   * Render a LineString into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} geometry LineString geometry.
   */
  drawLineString(geometry) {
    if (this.squaredTolerance_) {
      geometry = /** @type {import("../../geom/LineString.js").default} */
      geometry.simplifyTransformed(
        this.squaredTolerance_,
        this.userTransform_
      );
    }
    if (!intersects(this.extent_, geometry.getExtent())) {
      return;
    }
    if (this.strokeState_) {
      this.setContextStrokeState_(this.strokeState_);
      const context = this.context_;
      const flatCoordinates = geometry.getFlatCoordinates();
      context.beginPath();
      this.moveToLineTo_(
        flatCoordinates,
        0,
        flatCoordinates.length,
        geometry.getStride(),
        false
      );
      context.stroke();
    }
    if (this.text_ !== "") {
      const flatMidpoint = geometry.getFlatMidpoint();
      this.drawText_(flatMidpoint, 0, 2, 2);
    }
  }
  /**
   * Render a MultiLineString geometry into the canvas.  Rendering is immediate
   * and uses the current style.
   *
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} geometry MultiLineString geometry.
   */
  drawMultiLineString(geometry) {
    if (this.squaredTolerance_) {
      geometry = /** @type {import("../../geom/MultiLineString.js").default} */
      geometry.simplifyTransformed(
        this.squaredTolerance_,
        this.userTransform_
      );
    }
    const geometryExtent = geometry.getExtent();
    if (!intersects(this.extent_, geometryExtent)) {
      return;
    }
    if (this.strokeState_) {
      this.setContextStrokeState_(this.strokeState_);
      const context = this.context_;
      const flatCoordinates = geometry.getFlatCoordinates();
      let offset = 0;
      const ends = (
        /** @type {Array<number>} */
        geometry.getEnds()
      );
      const stride = geometry.getStride();
      context.beginPath();
      for (let i = 0, ii = ends.length; i < ii; ++i) {
        offset = this.moveToLineTo_(
          flatCoordinates,
          offset,
          ends[i],
          stride,
          false
        );
      }
      context.stroke();
    }
    if (this.text_ !== "") {
      const flatMidpoints = geometry.getFlatMidpoints();
      this.drawText_(flatMidpoints, 0, flatMidpoints.length, 2);
    }
  }
  /**
   * Render a Polygon geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} geometry Polygon geometry.
   */
  drawPolygon(geometry) {
    if (this.squaredTolerance_) {
      geometry = /** @type {import("../../geom/Polygon.js").default} */
      geometry.simplifyTransformed(
        this.squaredTolerance_,
        this.userTransform_
      );
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
      const context = this.context_;
      context.beginPath();
      this.drawRings_(
        geometry.getOrientedFlatCoordinates(),
        0,
        /** @type {Array<number>} */
        geometry.getEnds(),
        geometry.getStride()
      );
      if (this.fillState_) {
        context.fill();
      }
      if (this.strokeState_) {
        context.stroke();
      }
    }
    if (this.text_ !== "") {
      const flatInteriorPoint = geometry.getFlatInteriorPoint();
      this.drawText_(flatInteriorPoint, 0, 2, 2);
    }
  }
  /**
   * Render MultiPolygon geometry into the canvas.  Rendering is immediate and
   * uses the current style.
   * @param {import("../../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
   */
  drawMultiPolygon(geometry) {
    if (this.squaredTolerance_) {
      geometry = /** @type {import("../../geom/MultiPolygon.js").default} */
      geometry.simplifyTransformed(
        this.squaredTolerance_,
        this.userTransform_
      );
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
      const context = this.context_;
      const flatCoordinates = geometry.getOrientedFlatCoordinates();
      let offset = 0;
      const endss = geometry.getEndss();
      const stride = geometry.getStride();
      context.beginPath();
      for (let i = 0, ii = endss.length; i < ii; ++i) {
        const ends = endss[i];
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
      const flatInteriorPoints = geometry.getFlatInteriorPoints();
      this.drawText_(flatInteriorPoints, 0, flatInteriorPoints.length, 2);
    }
  }
  /**
   * @param {import("../canvas.js").FillState} fillState Fill state.
   * @private
   */
  setContextFillState_(fillState) {
    const context = this.context_;
    const contextFillState = this.contextFillState_;
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
  }
  /**
   * @param {import("../canvas.js").StrokeState} strokeState Stroke state.
   * @private
   */
  setContextStrokeState_(strokeState) {
    const context = this.context_;
    const contextStrokeState = this.contextStrokeState_;
    if (!contextStrokeState) {
      context.lineCap = strokeState.lineCap;
      context.setLineDash(strokeState.lineDash);
      context.lineDashOffset = strokeState.lineDashOffset;
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
      if (!equals(contextStrokeState.lineDash, strokeState.lineDash)) {
        context.setLineDash(
          contextStrokeState.lineDash = strokeState.lineDash
        );
      }
      if (contextStrokeState.lineDashOffset != strokeState.lineDashOffset) {
        contextStrokeState.lineDashOffset = strokeState.lineDashOffset;
        context.lineDashOffset = strokeState.lineDashOffset;
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
  }
  /**
   * @param {import("../canvas.js").TextState} textState Text state.
   * @private
   */
  setContextTextState_(textState) {
    const context = this.context_;
    const contextTextState = this.contextTextState_;
    const textAlign = textState.textAlign ? textState.textAlign : defaultTextAlign;
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
  }
  /**
   * Set the fill and stroke style for subsequent draw operations.  To clear
   * either fill or stroke styles, pass null for the appropriate parameter.
   *
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   */
  setFillStrokeStyle(fillStyle, strokeStyle) {
    if (!fillStyle) {
      this.fillState_ = null;
    } else {
      const fillStyleColor = fillStyle.getColor();
      this.fillState_ = {
        fillStyle: asColorLike(
          fillStyleColor ? fillStyleColor : defaultFillStyle
        )
      };
    }
    if (!strokeStyle) {
      this.strokeState_ = null;
    } else {
      const strokeStyleColor = strokeStyle.getColor();
      const strokeStyleLineCap = strokeStyle.getLineCap();
      const strokeStyleLineDash = strokeStyle.getLineDash();
      const strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
      const strokeStyleLineJoin = strokeStyle.getLineJoin();
      const strokeStyleWidth = strokeStyle.getWidth();
      const strokeStyleMiterLimit = strokeStyle.getMiterLimit();
      const lineDash = strokeStyleLineDash ? strokeStyleLineDash : defaultLineDash;
      this.strokeState_ = {
        lineCap: strokeStyleLineCap !== void 0 ? strokeStyleLineCap : defaultLineCap,
        lineDash: this.pixelRatio_ === 1 ? lineDash : lineDash.map((n) => n * this.pixelRatio_),
        lineDashOffset: (strokeStyleLineDashOffset ? strokeStyleLineDashOffset : defaultLineDashOffset) * this.pixelRatio_,
        lineJoin: strokeStyleLineJoin !== void 0 ? strokeStyleLineJoin : defaultLineJoin,
        lineWidth: (strokeStyleWidth !== void 0 ? strokeStyleWidth : defaultLineWidth) * this.pixelRatio_,
        miterLimit: strokeStyleMiterLimit !== void 0 ? strokeStyleMiterLimit : defaultMiterLimit,
        strokeStyle: asColorLike(
          strokeStyleColor ? strokeStyleColor : defaultStrokeStyle
        )
      };
    }
  }
  /**
   * Set the image style for subsequent draw operations.  Pass null to remove
   * the image style.
   *
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   */
  setImageStyle(imageStyle) {
    let imageSize;
    if (!imageStyle || !(imageSize = imageStyle.getSize())) {
      this.image_ = null;
      return;
    }
    const imagePixelRatio = imageStyle.getPixelRatio(this.pixelRatio_);
    const imageAnchor = imageStyle.getAnchor();
    const imageOrigin = imageStyle.getOrigin();
    this.image_ = imageStyle.getImage(this.pixelRatio_);
    this.imageAnchorX_ = imageAnchor[0] * imagePixelRatio;
    this.imageAnchorY_ = imageAnchor[1] * imagePixelRatio;
    this.imageHeight_ = imageSize[1] * imagePixelRatio;
    this.imageOpacity_ = imageStyle.getOpacity();
    this.imageOriginX_ = imageOrigin[0];
    this.imageOriginY_ = imageOrigin[1];
    this.imageRotateWithView_ = imageStyle.getRotateWithView();
    this.imageRotation_ = imageStyle.getRotation();
    const imageScale = imageStyle.getScaleArray();
    this.imageScale_ = [
      imageScale[0] * this.pixelRatio_ / imagePixelRatio,
      imageScale[1] * this.pixelRatio_ / imagePixelRatio
    ];
    this.imageWidth_ = imageSize[0] * imagePixelRatio;
  }
  /**
   * Set the text style for subsequent draw operations.  Pass null to
   * remove the text style.
   *
   * @param {import("../../style/Text.js").default} textStyle Text style.
   */
  setTextStyle(textStyle) {
    if (!textStyle) {
      this.text_ = "";
    } else {
      const textFillStyle = textStyle.getFill();
      if (!textFillStyle) {
        this.textFillState_ = null;
      } else {
        const textFillStyleColor = textFillStyle.getColor();
        this.textFillState_ = {
          fillStyle: asColorLike(
            textFillStyleColor ? textFillStyleColor : defaultFillStyle
          )
        };
      }
      const textStrokeStyle = textStyle.getStroke();
      if (!textStrokeStyle) {
        this.textStrokeState_ = null;
      } else {
        const textStrokeStyleColor = textStrokeStyle.getColor();
        const textStrokeStyleLineCap = textStrokeStyle.getLineCap();
        const textStrokeStyleLineDash = textStrokeStyle.getLineDash();
        const textStrokeStyleLineDashOffset = textStrokeStyle.getLineDashOffset();
        const textStrokeStyleLineJoin = textStrokeStyle.getLineJoin();
        const textStrokeStyleWidth = textStrokeStyle.getWidth();
        const textStrokeStyleMiterLimit = textStrokeStyle.getMiterLimit();
        this.textStrokeState_ = {
          lineCap: textStrokeStyleLineCap !== void 0 ? textStrokeStyleLineCap : defaultLineCap,
          lineDash: textStrokeStyleLineDash ? textStrokeStyleLineDash : defaultLineDash,
          lineDashOffset: textStrokeStyleLineDashOffset ? textStrokeStyleLineDashOffset : defaultLineDashOffset,
          lineJoin: textStrokeStyleLineJoin !== void 0 ? textStrokeStyleLineJoin : defaultLineJoin,
          lineWidth: textStrokeStyleWidth !== void 0 ? textStrokeStyleWidth : defaultLineWidth,
          miterLimit: textStrokeStyleMiterLimit !== void 0 ? textStrokeStyleMiterLimit : defaultMiterLimit,
          strokeStyle: asColorLike(
            textStrokeStyleColor ? textStrokeStyleColor : defaultStrokeStyle
          )
        };
      }
      const textFont = textStyle.getFont();
      const textOffsetX = textStyle.getOffsetX();
      const textOffsetY = textStyle.getOffsetY();
      const textRotateWithView = textStyle.getRotateWithView();
      const textRotation = textStyle.getRotation();
      const textScale = textStyle.getScaleArray();
      const textText = textStyle.getText();
      const textTextAlign = textStyle.getTextAlign();
      const textTextBaseline = textStyle.getTextBaseline();
      this.textState_ = {
        font: textFont !== void 0 ? textFont : defaultFont,
        textAlign: textTextAlign !== void 0 ? textTextAlign : defaultTextAlign,
        textBaseline: textTextBaseline !== void 0 ? textTextBaseline : defaultTextBaseline
      };
      this.text_ = textText !== void 0 ? Array.isArray(textText) ? textText.reduce((acc, t, i) => acc += i % 2 ? " " : t, "") : textText : "";
      this.textOffsetX_ = textOffsetX !== void 0 ? this.pixelRatio_ * textOffsetX : 0;
      this.textOffsetY_ = textOffsetY !== void 0 ? this.pixelRatio_ * textOffsetY : 0;
      this.textRotateWithView_ = textRotateWithView !== void 0 ? textRotateWithView : false;
      this.textRotation_ = textRotation !== void 0 ? textRotation : 0;
      this.textScale_ = [
        this.pixelRatio_ * textScale[0],
        this.pixelRatio_ * textScale[1]
      ];
    }
  }
};
var Immediate_default = CanvasImmediateRenderer;

// ../node_modules/ol/renderer/vector.js
var SIMPLIFY_TOLERANCE = 0.5;
function getSquaredTolerance(resolution, pixelRatio) {
  const tolerance = getTolerance(resolution, pixelRatio);
  return tolerance * tolerance;
}
function getTolerance(resolution, pixelRatio) {
  return SIMPLIFY_TOLERANCE * resolution / pixelRatio;
}

// ../node_modules/ol/render.js
function toContext(context, options) {
  const canvas = context.canvas;
  options = options ? options : {};
  const pixelRatio = options.pixelRatio || DEVICE_PIXEL_RATIO;
  const size = options.size;
  if (size) {
    canvas.width = size[0] * pixelRatio;
    canvas.height = size[1] * pixelRatio;
    canvas.style.width = size[0] + "px";
    canvas.style.height = size[1] + "px";
  }
  const extent = [0, 0, canvas.width, canvas.height];
  const transform = scale(create(), pixelRatio, pixelRatio);
  return new Immediate_default(context, pixelRatio, extent, transform, 0);
}
function getVectorContext(event) {
  if (!(event.context instanceof CanvasRenderingContext2D)) {
    throw new Error("Only works for render events from Canvas 2D layers");
  }
  const a = event.inversePixelTransform[0];
  const b = event.inversePixelTransform[1];
  const canvasPixelRatio = Math.sqrt(a * a + b * b);
  const frameState = event.frameState;
  const transform = multiply(
    event.inversePixelTransform.slice(),
    frameState.coordinateToPixelTransform
  );
  const squaredTolerance = getSquaredTolerance(
    frameState.viewState.resolution,
    canvasPixelRatio
  );
  let userTransform;
  const userProjection2 = getUserProjection();
  if (userProjection2) {
    userTransform = getTransformFromProjections(
      userProjection2,
      frameState.viewState.projection
    );
  }
  return new Immediate_default(
    event.context,
    canvasPixelRatio,
    frameState.extent,
    transform,
    frameState.viewState.rotation,
    squaredTolerance,
    userTransform
  );
}
function getRenderPixel(event, pixel) {
  return apply(event.inversePixelTransform, pixel.slice(0));
}
export {
  getRenderPixel,
  getVectorContext,
  toContext
};
