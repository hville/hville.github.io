var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// ../node_modules/rbush/rbush.min.js
var require_rbush_min = __commonJS({
  "../node_modules/rbush/rbush.min.js"(exports, module) {
    !function(t, i) {
      typeof exports == "object" && typeof module != "undefined" ? module.exports = i() : typeof define == "function" && define.amd ? define(i) : (t = t || self).RBush = i();
    }(exports, function() {
      "use strict";
      function t(t2, r2, e2, a2, h2) {
        !function t3(n2, r3, e3, a3, h3) {
          for (; a3 > e3; ) {
            if (a3 - e3 > 600) {
              var o2 = a3 - e3 + 1, s2 = r3 - e3 + 1, l2 = Math.log(o2), f2 = 0.5 * Math.exp(2 * l2 / 3), u2 = 0.5 * Math.sqrt(l2 * f2 * (o2 - f2) / o2) * (s2 - o2 / 2 < 0 ? -1 : 1), m2 = Math.max(e3, Math.floor(r3 - s2 * f2 / o2 + u2)), c2 = Math.min(a3, Math.floor(r3 + (o2 - s2) * f2 / o2 + u2));
              t3(n2, r3, m2, c2, h3);
            }
            var p5 = n2[r3], d2 = e3, x = a3;
            for (i(n2, e3, r3), h3(n2[a3], p5) > 0 && i(n2, e3, a3); d2 < x; ) {
              for (i(n2, d2, x), d2++, x--; h3(n2[d2], p5) < 0; )
                d2++;
              for (; h3(n2[x], p5) > 0; )
                x--;
            }
            h3(n2[e3], p5) === 0 ? i(n2, e3, x) : i(n2, ++x, a3), x <= r3 && (e3 = x + 1), r3 <= x && (a3 = x - 1);
          }
        }(t2, r2, e2 || 0, a2 || t2.length - 1, h2 || n);
      }
      function i(t2, i2, n2) {
        var r2 = t2[i2];
        t2[i2] = t2[n2], t2[n2] = r2;
      }
      function n(t2, i2) {
        return t2 < i2 ? -1 : t2 > i2 ? 1 : 0;
      }
      var r = function(t2) {
        t2 === void 0 && (t2 = 9), this._maxEntries = Math.max(4, t2), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
      };
      function e(t2, i2, n2) {
        if (!n2)
          return i2.indexOf(t2);
        for (var r2 = 0; r2 < i2.length; r2++)
          if (n2(t2, i2[r2]))
            return r2;
        return -1;
      }
      function a(t2, i2) {
        h(t2, 0, t2.children.length, i2, t2);
      }
      function h(t2, i2, n2, r2, e2) {
        e2 || (e2 = p(null)), e2.minX = 1 / 0, e2.minY = 1 / 0, e2.maxX = -1 / 0, e2.maxY = -1 / 0;
        for (var a2 = i2; a2 < n2; a2++) {
          var h2 = t2.children[a2];
          o(e2, t2.leaf ? r2(h2) : h2);
        }
        return e2;
      }
      function o(t2, i2) {
        return t2.minX = Math.min(t2.minX, i2.minX), t2.minY = Math.min(t2.minY, i2.minY), t2.maxX = Math.max(t2.maxX, i2.maxX), t2.maxY = Math.max(t2.maxY, i2.maxY), t2;
      }
      function s(t2, i2) {
        return t2.minX - i2.minX;
      }
      function l(t2, i2) {
        return t2.minY - i2.minY;
      }
      function f(t2) {
        return (t2.maxX - t2.minX) * (t2.maxY - t2.minY);
      }
      function u(t2) {
        return t2.maxX - t2.minX + (t2.maxY - t2.minY);
      }
      function m(t2, i2) {
        return t2.minX <= i2.minX && t2.minY <= i2.minY && i2.maxX <= t2.maxX && i2.maxY <= t2.maxY;
      }
      function c(t2, i2) {
        return i2.minX <= t2.maxX && i2.minY <= t2.maxY && i2.maxX >= t2.minX && i2.maxY >= t2.minY;
      }
      function p(t2) {
        return { children: t2, height: 1, leaf: true, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
      }
      function d(i2, n2, r2, e2, a2) {
        for (var h2 = [n2, r2]; h2.length; )
          if (!((r2 = h2.pop()) - (n2 = h2.pop()) <= e2)) {
            var o2 = n2 + Math.ceil((r2 - n2) / e2 / 2) * e2;
            t(i2, o2, n2, r2, a2), h2.push(n2, o2, o2, r2);
          }
      }
      return r.prototype.all = function() {
        return this._all(this.data, []);
      }, r.prototype.search = function(t2) {
        var i2 = this.data, n2 = [];
        if (!c(t2, i2))
          return n2;
        for (var r2 = this.toBBox, e2 = []; i2; ) {
          for (var a2 = 0; a2 < i2.children.length; a2++) {
            var h2 = i2.children[a2], o2 = i2.leaf ? r2(h2) : h2;
            c(t2, o2) && (i2.leaf ? n2.push(h2) : m(t2, o2) ? this._all(h2, n2) : e2.push(h2));
          }
          i2 = e2.pop();
        }
        return n2;
      }, r.prototype.collides = function(t2) {
        var i2 = this.data;
        if (!c(t2, i2))
          return false;
        for (var n2 = []; i2; ) {
          for (var r2 = 0; r2 < i2.children.length; r2++) {
            var e2 = i2.children[r2], a2 = i2.leaf ? this.toBBox(e2) : e2;
            if (c(t2, a2)) {
              if (i2.leaf || m(t2, a2))
                return true;
              n2.push(e2);
            }
          }
          i2 = n2.pop();
        }
        return false;
      }, r.prototype.load = function(t2) {
        if (!t2 || !t2.length)
          return this;
        if (t2.length < this._minEntries) {
          for (var i2 = 0; i2 < t2.length; i2++)
            this.insert(t2[i2]);
          return this;
        }
        var n2 = this._build(t2.slice(), 0, t2.length - 1, 0);
        if (this.data.children.length)
          if (this.data.height === n2.height)
            this._splitRoot(this.data, n2);
          else {
            if (this.data.height < n2.height) {
              var r2 = this.data;
              this.data = n2, n2 = r2;
            }
            this._insert(n2, this.data.height - n2.height - 1, true);
          }
        else
          this.data = n2;
        return this;
      }, r.prototype.insert = function(t2) {
        return t2 && this._insert(t2, this.data.height - 1), this;
      }, r.prototype.clear = function() {
        return this.data = p([]), this;
      }, r.prototype.remove = function(t2, i2) {
        if (!t2)
          return this;
        for (var n2, r2, a2, h2 = this.data, o2 = this.toBBox(t2), s2 = [], l2 = []; h2 || s2.length; ) {
          if (h2 || (h2 = s2.pop(), r2 = s2[s2.length - 1], n2 = l2.pop(), a2 = true), h2.leaf) {
            var f2 = e(t2, h2.children, i2);
            if (f2 !== -1)
              return h2.children.splice(f2, 1), s2.push(h2), this._condense(s2), this;
          }
          a2 || h2.leaf || !m(h2, o2) ? r2 ? (n2++, h2 = r2.children[n2], a2 = false) : h2 = null : (s2.push(h2), l2.push(n2), n2 = 0, r2 = h2, h2 = h2.children[0]);
        }
        return this;
      }, r.prototype.toBBox = function(t2) {
        return t2;
      }, r.prototype.compareMinX = function(t2, i2) {
        return t2.minX - i2.minX;
      }, r.prototype.compareMinY = function(t2, i2) {
        return t2.minY - i2.minY;
      }, r.prototype.toJSON = function() {
        return this.data;
      }, r.prototype.fromJSON = function(t2) {
        return this.data = t2, this;
      }, r.prototype._all = function(t2, i2) {
        for (var n2 = []; t2; )
          t2.leaf ? i2.push.apply(i2, t2.children) : n2.push.apply(n2, t2.children), t2 = n2.pop();
        return i2;
      }, r.prototype._build = function(t2, i2, n2, r2) {
        var e2, h2 = n2 - i2 + 1, o2 = this._maxEntries;
        if (h2 <= o2)
          return a(e2 = p(t2.slice(i2, n2 + 1)), this.toBBox), e2;
        r2 || (r2 = Math.ceil(Math.log(h2) / Math.log(o2)), o2 = Math.ceil(h2 / Math.pow(o2, r2 - 1))), (e2 = p([])).leaf = false, e2.height = r2;
        var s2 = Math.ceil(h2 / o2), l2 = s2 * Math.ceil(Math.sqrt(o2));
        d(t2, i2, n2, l2, this.compareMinX);
        for (var f2 = i2; f2 <= n2; f2 += l2) {
          var u2 = Math.min(f2 + l2 - 1, n2);
          d(t2, f2, u2, s2, this.compareMinY);
          for (var m2 = f2; m2 <= u2; m2 += s2) {
            var c2 = Math.min(m2 + s2 - 1, u2);
            e2.children.push(this._build(t2, m2, c2, r2 - 1));
          }
        }
        return a(e2, this.toBBox), e2;
      }, r.prototype._chooseSubtree = function(t2, i2, n2, r2) {
        for (; r2.push(i2), !i2.leaf && r2.length - 1 !== n2; ) {
          for (var e2 = 1 / 0, a2 = 1 / 0, h2 = void 0, o2 = 0; o2 < i2.children.length; o2++) {
            var s2 = i2.children[o2], l2 = f(s2), u2 = (m2 = t2, c2 = s2, (Math.max(c2.maxX, m2.maxX) - Math.min(c2.minX, m2.minX)) * (Math.max(c2.maxY, m2.maxY) - Math.min(c2.minY, m2.minY)) - l2);
            u2 < a2 ? (a2 = u2, e2 = l2 < e2 ? l2 : e2, h2 = s2) : u2 === a2 && l2 < e2 && (e2 = l2, h2 = s2);
          }
          i2 = h2 || i2.children[0];
        }
        var m2, c2;
        return i2;
      }, r.prototype._insert = function(t2, i2, n2) {
        var r2 = n2 ? t2 : this.toBBox(t2), e2 = [], a2 = this._chooseSubtree(r2, this.data, i2, e2);
        for (a2.children.push(t2), o(a2, r2); i2 >= 0 && e2[i2].children.length > this._maxEntries; )
          this._split(e2, i2), i2--;
        this._adjustParentBBoxes(r2, e2, i2);
      }, r.prototype._split = function(t2, i2) {
        var n2 = t2[i2], r2 = n2.children.length, e2 = this._minEntries;
        this._chooseSplitAxis(n2, e2, r2);
        var h2 = this._chooseSplitIndex(n2, e2, r2), o2 = p(n2.children.splice(h2, n2.children.length - h2));
        o2.height = n2.height, o2.leaf = n2.leaf, a(n2, this.toBBox), a(o2, this.toBBox), i2 ? t2[i2 - 1].children.push(o2) : this._splitRoot(n2, o2);
      }, r.prototype._splitRoot = function(t2, i2) {
        this.data = p([t2, i2]), this.data.height = t2.height + 1, this.data.leaf = false, a(this.data, this.toBBox);
      }, r.prototype._chooseSplitIndex = function(t2, i2, n2) {
        for (var r2, e2, a2, o2, s2, l2, u2, m2 = 1 / 0, c2 = 1 / 0, p5 = i2; p5 <= n2 - i2; p5++) {
          var d2 = h(t2, 0, p5, this.toBBox), x = h(t2, p5, n2, this.toBBox), v = (e2 = d2, a2 = x, o2 = void 0, s2 = void 0, l2 = void 0, u2 = void 0, o2 = Math.max(e2.minX, a2.minX), s2 = Math.max(e2.minY, a2.minY), l2 = Math.min(e2.maxX, a2.maxX), u2 = Math.min(e2.maxY, a2.maxY), Math.max(0, l2 - o2) * Math.max(0, u2 - s2)), M = f(d2) + f(x);
          v < m2 ? (m2 = v, r2 = p5, c2 = M < c2 ? M : c2) : v === m2 && M < c2 && (c2 = M, r2 = p5);
        }
        return r2 || n2 - i2;
      }, r.prototype._chooseSplitAxis = function(t2, i2, n2) {
        var r2 = t2.leaf ? this.compareMinX : s, e2 = t2.leaf ? this.compareMinY : l;
        this._allDistMargin(t2, i2, n2, r2) < this._allDistMargin(t2, i2, n2, e2) && t2.children.sort(r2);
      }, r.prototype._allDistMargin = function(t2, i2, n2, r2) {
        t2.children.sort(r2);
        for (var e2 = this.toBBox, a2 = h(t2, 0, i2, e2), s2 = h(t2, n2 - i2, n2, e2), l2 = u(a2) + u(s2), f2 = i2; f2 < n2 - i2; f2++) {
          var m2 = t2.children[f2];
          o(a2, t2.leaf ? e2(m2) : m2), l2 += u(a2);
        }
        for (var c2 = n2 - i2 - 1; c2 >= i2; c2--) {
          var p5 = t2.children[c2];
          o(s2, t2.leaf ? e2(p5) : p5), l2 += u(s2);
        }
        return l2;
      }, r.prototype._adjustParentBBoxes = function(t2, i2, n2) {
        for (var r2 = n2; r2 >= 0; r2--)
          o(i2[r2], t2);
      }, r.prototype._condense = function(t2) {
        for (var i2 = t2.length - 1, n2 = void 0; i2 >= 0; i2--)
          t2[i2].children.length === 0 ? i2 > 0 ? (n2 = t2[i2 - 1].children).splice(n2.indexOf(t2[i2]), 1) : this.clear() : a(t2[i2], this.toBBox);
      }, r;
    });
  }
});

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
function binarySearch(haystack, needle, opt_comparator) {
  var mid, cmp;
  var comparator = opt_comparator || numberSafeCompareFunction;
  var low = 0;
  var high = haystack.length;
  var found = false;
  while (low < high) {
    mid = low + (high - low >> 1);
    cmp = +comparator(haystack[mid], needle);
    if (cmp < 0) {
      low = mid + 1;
    } else {
      high = mid;
      found = !cmp;
    }
  }
  return found ? low : ~low;
}
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
function reverseSubArray(arr, begin, end) {
  while (begin < end) {
    var tmp = arr[begin];
    arr[begin] = arr[end];
    arr[end] = tmp;
    ++begin;
    --end;
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

// ../node_modules/ol/CollectionEventType.js
var CollectionEventType_default = {
  ADD: "add",
  REMOVE: "remove"
};

// ../node_modules/ol/Collection.js
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
var Property = {
  LENGTH: "length"
};
var CollectionEvent = function(_super) {
  __extends5(CollectionEvent2, _super);
  function CollectionEvent2(type, opt_element, opt_index) {
    var _this = _super.call(this, type) || this;
    _this.element = opt_element;
    _this.index = opt_index;
    return _this;
  }
  return CollectionEvent2;
}(Event_default);
var Collection = function(_super) {
  __extends5(Collection2, _super);
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

// ../node_modules/ol/asserts.js
function assert(assertion, errorCode) {
  if (!assertion) {
    throw new AssertionError_default(errorCode);
  }
}

// ../node_modules/ol/Feature.js
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
var Feature = function(_super) {
  __extends6(Feature2, _super);
  function Feature2(opt_geometryOrProperties) {
    var _this = _super.call(this) || this;
    _this.on;
    _this.once;
    _this.un;
    _this.id_ = void 0;
    _this.geometryName_ = "geometry";
    _this.style_ = null;
    _this.styleFunction_ = void 0;
    _this.geometryChangeKey_ = null;
    _this.addChangeListener(_this.geometryName_, _this.handleGeometryChanged_);
    if (opt_geometryOrProperties) {
      if (typeof opt_geometryOrProperties.getSimplifiedGeometry === "function") {
        var geometry = opt_geometryOrProperties;
        _this.setGeometry(geometry);
      } else {
        var properties = opt_geometryOrProperties;
        _this.setProperties(properties);
      }
    }
    return _this;
  }
  Feature2.prototype.clone = function() {
    var clone2 = new Feature2(this.hasProperties() ? this.getProperties() : null);
    clone2.setGeometryName(this.getGeometryName());
    var geometry = this.getGeometry();
    if (geometry) {
      clone2.setGeometry(geometry.clone());
    }
    var style = this.getStyle();
    if (style) {
      clone2.setStyle(style);
    }
    return clone2;
  };
  Feature2.prototype.getGeometry = function() {
    return this.get(this.geometryName_);
  };
  Feature2.prototype.getId = function() {
    return this.id_;
  };
  Feature2.prototype.getGeometryName = function() {
    return this.geometryName_;
  };
  Feature2.prototype.getStyle = function() {
    return this.style_;
  };
  Feature2.prototype.getStyleFunction = function() {
    return this.styleFunction_;
  };
  Feature2.prototype.handleGeometryChange_ = function() {
    this.changed();
  };
  Feature2.prototype.handleGeometryChanged_ = function() {
    if (this.geometryChangeKey_) {
      unlistenByKey(this.geometryChangeKey_);
      this.geometryChangeKey_ = null;
    }
    var geometry = this.getGeometry();
    if (geometry) {
      this.geometryChangeKey_ = listen(geometry, EventType_default.CHANGE, this.handleGeometryChange_, this);
    }
    this.changed();
  };
  Feature2.prototype.setGeometry = function(geometry) {
    this.set(this.geometryName_, geometry);
  };
  Feature2.prototype.setStyle = function(opt_style) {
    this.style_ = opt_style;
    this.styleFunction_ = !opt_style ? void 0 : createStyleFunction(opt_style);
    this.changed();
  };
  Feature2.prototype.setId = function(id) {
    this.id_ = id;
    this.changed();
  };
  Feature2.prototype.setGeometryName = function(name) {
    this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_);
    this.geometryName_ = name;
    this.addChangeListener(this.geometryName_, this.handleGeometryChanged_);
    this.handleGeometryChanged_();
  };
  return Feature2;
}(Object_default);
function createStyleFunction(obj) {
  if (typeof obj === "function") {
    return obj;
  } else {
    var styles_1;
    if (Array.isArray(obj)) {
      styles_1 = obj;
    } else {
      assert(typeof obj.getZIndex === "function", 41);
      var style = obj;
      styles_1 = [style];
    }
    return function() {
      return styles_1;
    };
  }
}
var Feature_default = Feature;

// ../node_modules/ol/geom/GeometryLayout.js
var GeometryLayout_default = {
  XY: "XY",
  XYZ: "XYZ",
  XYM: "XYM",
  XYZM: "XYZM"
};

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
function set(transform2, a, b, c, d, e, f) {
  transform2[0] = a;
  transform2[1] = b;
  transform2[2] = c;
  transform2[3] = d;
  transform2[4] = e;
  transform2[5] = f;
  return transform2;
}
function setFromArray(transform1, transform2) {
  transform1[0] = transform2[0];
  transform1[1] = transform2[1];
  transform1[2] = transform2[2];
  transform1[3] = transform2[3];
  transform1[4] = transform2[4];
  transform1[5] = transform2[5];
  return transform1;
}
function apply(transform2, coordinate) {
  var x = coordinate[0];
  var y = coordinate[1];
  coordinate[0] = transform2[0] * x + transform2[2] * y + transform2[4];
  coordinate[1] = transform2[1] * x + transform2[3] * y + transform2[5];
  return coordinate;
}
function makeScale(target, x, y) {
  return set(target, x, 0, 0, y, 0, 0);
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
function buffer(extent, value, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0] - value;
    opt_extent[1] = extent[1] - value;
    opt_extent[2] = extent[2] + value;
    opt_extent[3] = extent[3] + value;
    return opt_extent;
  } else {
    return [
      extent[0] - value,
      extent[1] - value,
      extent[2] + value,
      extent[3] + value
    ];
  }
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
function containsCoordinate(extent, coordinate) {
  return containsXY(extent, coordinate[0], coordinate[1]);
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
function createOrUpdateFromFlatCoordinates(flatCoordinates, offset2, end, stride, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendFlatCoordinates(extent, flatCoordinates, offset2, end, stride);
}
function equals2(extent1, extent2) {
  return extent1[0] == extent2[0] && extent1[2] == extent2[2] && extent1[1] == extent2[1] && extent1[3] == extent2[3];
}
function approximatelyEquals(extent1, extent2, tolerance) {
  return Math.abs(extent1[0] - extent2[0]) < tolerance && Math.abs(extent1[2] - extent2[2]) < tolerance && Math.abs(extent1[1] - extent2[1]) < tolerance && Math.abs(extent1[3] - extent2[3]) < tolerance;
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
function extendFlatCoordinates(extent, flatCoordinates, offset2, end, stride) {
  for (; offset2 < end; offset2 += stride) {
    extendXY(extent, flatCoordinates[offset2], flatCoordinates[offset2 + 1]);
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
function wrapX(extent, projection) {
  var projectionExtent = projection.getExtent();
  var center = getCenter(extent);
  if (projection.canWrapX() && (center[0] < projectionExtent[0] || center[0] >= projectionExtent[2])) {
    var worldWidth = getWidth(projectionExtent);
    var worldsAway = Math.floor((center[0] - projectionExtent[0]) / worldWidth);
    var offset2 = worldsAway * worldWidth;
    extent[0] -= offset2;
    extent[2] -= offset2;
  }
  return extent;
}

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
function toDegrees(angleInRadians) {
  return angleInRadians * 180 / Math.PI;
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

// ../node_modules/ol/string.js
function padNumber(number, width, opt_precision) {
  var numberString = opt_precision !== void 0 ? number.toFixed(opt_precision) : "" + number;
  var decimal = numberString.indexOf(".");
  decimal = decimal === -1 ? numberString.length : decimal;
  return decimal > width ? numberString : new Array(1 + width - decimal).join("0") + numberString;
}

// ../node_modules/ol/coordinate.js
function add3(coordinate, delta) {
  coordinate[0] += +delta[0];
  coordinate[1] += +delta[1];
  return coordinate;
}
function degreesToStringHDMS(hemispheres, degrees, opt_fractionDigits) {
  var normalizedDegrees = modulo(degrees + 180, 360) - 180;
  var x = Math.abs(3600 * normalizedDegrees);
  var dflPrecision = opt_fractionDigits || 0;
  var precision = Math.pow(10, dflPrecision);
  var deg = Math.floor(x / 3600);
  var min = Math.floor((x - deg * 3600) / 60);
  var sec = x - deg * 3600 - min * 60;
  sec = Math.ceil(sec * precision) / precision;
  if (sec >= 60) {
    sec = 0;
    min += 1;
  }
  if (min >= 60) {
    min = 0;
    deg += 1;
  }
  return deg + "\xB0 " + padNumber(min, 2) + "\u2032 " + padNumber(sec, 2, dflPrecision) + "\u2033" + (normalizedDegrees == 0 ? "" : " " + hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0));
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
function scale(coordinate, scale4) {
  coordinate[0] *= scale4;
  coordinate[1] *= scale4;
  return coordinate;
}
function wrapX2(coordinate, projection) {
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

// ../node_modules/ol/sphere.js
var DEFAULT_RADIUS = 63710088e-1;
function offset(c1, distance, bearing, opt_radius) {
  var radius = opt_radius || DEFAULT_RADIUS;
  var lat1 = toRadians(c1[1]);
  var lon1 = toRadians(c1[0]);
  var dByR = distance / radius;
  var lat = Math.asin(Math.sin(lat1) * Math.cos(dByR) + Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing));
  var lon = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1), Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat));
  return [toDegrees(lon), toDegrees(lat)];
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
function toUserResolution(resolution, sourceProjection) {
  if (!userProjection) {
    return resolution;
  }
  var sourceUnits = get3(sourceProjection).getUnits();
  var userUnits = userProjection.getUnits();
  return sourceUnits && userUnits ? resolution * METERS_PER_UNIT[sourceUnits] / METERS_PER_UNIT[userUnits] : resolution;
}
function addCommon() {
  addEquivalentProjections(PROJECTIONS);
  addEquivalentProjections(PROJECTIONS2);
  addEquivalentTransforms(PROJECTIONS2, PROJECTIONS, fromEPSG4326, toEPSG4326);
}
addCommon();

// ../node_modules/ol/geom/flat/transform.js
function transform2D(flatCoordinates, offset2, end, stride, transform2, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;
  for (var j = offset2; j < end; j += stride) {
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
function rotate2(flatCoordinates, offset2, end, stride, angle, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;
  for (var j = offset2; j < end; j += stride) {
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
function scale2(flatCoordinates, offset2, end, stride, sx, sy, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;
  for (var j = offset2; j < end; j += stride) {
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
function translate(flatCoordinates, offset2, end, stride, deltaX, deltaY, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;
  for (var j = offset2; j < end; j += stride) {
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
var tmpTransform = create();
var Geometry = function(_super) {
  __extends9(Geometry2, _super);
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
      var scale4 = getHeight(projectedExtent) / getHeight(pixelExtent);
      compose(tmpTransform, projectedExtent[0], projectedExtent[3], scale4, -scale4, 0, 0, 0);
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
var SimpleGeometry = function(_super) {
  __extends10(SimpleGeometry2, _super);
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
function transformGeom2D(simpleGeometry, transform2, opt_dest) {
  var flatCoordinates = simpleGeometry.getFlatCoordinates();
  if (!flatCoordinates) {
    return null;
  } else {
    var stride = simpleGeometry.getStride();
    return transform2D(flatCoordinates, 0, flatCoordinates.length, stride, transform2, opt_dest);
  }
}
var SimpleGeometry_default = SimpleGeometry;

// ../node_modules/ol/geom/flat/closest.js
function assignClosest(flatCoordinates, offset1, offset2, stride, x, y, closestPoint) {
  var x1 = flatCoordinates[offset1];
  var y1 = flatCoordinates[offset1 + 1];
  var dx = flatCoordinates[offset2] - x1;
  var dy = flatCoordinates[offset2 + 1] - y1;
  var offset3;
  if (dx === 0 && dy === 0) {
    offset3 = offset1;
  } else {
    var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      offset3 = offset2;
    } else if (t > 0) {
      for (var i = 0; i < stride; ++i) {
        closestPoint[i] = lerp(flatCoordinates[offset1 + i], flatCoordinates[offset2 + i], t);
      }
      closestPoint.length = stride;
      return;
    } else {
      offset3 = offset1;
    }
  }
  for (var i = 0; i < stride; ++i) {
    closestPoint[i] = flatCoordinates[offset3 + i];
  }
  closestPoint.length = stride;
}
function maxSquaredDelta(flatCoordinates, offset2, end, stride, max) {
  var x1 = flatCoordinates[offset2];
  var y1 = flatCoordinates[offset2 + 1];
  for (offset2 += stride; offset2 < end; offset2 += stride) {
    var x2 = flatCoordinates[offset2];
    var y2 = flatCoordinates[offset2 + 1];
    var squaredDelta = squaredDistance(x1, y1, x2, y2);
    if (squaredDelta > max) {
      max = squaredDelta;
    }
    x1 = x2;
    y1 = y2;
  }
  return max;
}
function arrayMaxSquaredDelta(flatCoordinates, offset2, ends, stride, max) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    max = maxSquaredDelta(flatCoordinates, offset2, end, stride, max);
    offset2 = end;
  }
  return max;
}
function assignClosestPoint(flatCoordinates, offset2, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  if (offset2 == end) {
    return minSquaredDistance;
  }
  var i, squaredDistance2;
  if (maxDelta === 0) {
    squaredDistance2 = squaredDistance(x, y, flatCoordinates[offset2], flatCoordinates[offset2 + 1]);
    if (squaredDistance2 < minSquaredDistance) {
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[offset2 + i];
      }
      closestPoint.length = stride;
      return squaredDistance2;
    } else {
      return minSquaredDistance;
    }
  }
  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
  var index = offset2 + stride;
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
    assignClosest(flatCoordinates, end - stride, offset2, stride, x, y, tmpPoint);
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
function assignClosestArrayPoint(flatCoordinates, offset2, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    minSquaredDistance = assignClosestPoint(flatCoordinates, offset2, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
    offset2 = end;
  }
  return minSquaredDistance;
}

// ../node_modules/ol/geom/flat/deflate.js
function deflateCoordinate(flatCoordinates, offset2, coordinate, stride) {
  for (var i = 0, ii = coordinate.length; i < ii; ++i) {
    flatCoordinates[offset2++] = coordinate[i];
  }
  return offset2;
}
function deflateCoordinates(flatCoordinates, offset2, coordinates2, stride) {
  for (var i = 0, ii = coordinates2.length; i < ii; ++i) {
    var coordinate = coordinates2[i];
    for (var j = 0; j < stride; ++j) {
      flatCoordinates[offset2++] = coordinate[j];
    }
  }
  return offset2;
}
function deflateCoordinatesArray(flatCoordinates, offset2, coordinatess, stride, opt_ends) {
  var ends = opt_ends ? opt_ends : [];
  var i = 0;
  for (var j = 0, jj = coordinatess.length; j < jj; ++j) {
    var end = deflateCoordinates(flatCoordinates, offset2, coordinatess[j], stride);
    ends[i++] = end;
    offset2 = end;
  }
  ends.length = i;
  return ends;
}

// ../node_modules/ol/geom/flat/simplify.js
function douglasPeucker(flatCoordinates, offset2, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  var n = (end - offset2) / stride;
  if (n < 3) {
    for (; offset2 < end; offset2 += stride) {
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset2];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset2 + 1];
    }
    return simplifiedOffset;
  }
  var markers = new Array(n);
  markers[0] = 1;
  markers[n - 1] = 1;
  var stack = [offset2, end - stride];
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
      markers[(index - offset2) / stride] = 1;
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
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset2 + i * stride];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset2 + i * stride + 1];
    }
  }
  return simplifiedOffset;
}
function snap(value, tolerance) {
  return tolerance * Math.round(value / tolerance);
}
function quantize(flatCoordinates, offset2, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  if (offset2 == end) {
    return simplifiedOffset;
  }
  var x1 = snap(flatCoordinates[offset2], tolerance);
  var y1 = snap(flatCoordinates[offset2 + 1], tolerance);
  offset2 += stride;
  simplifiedFlatCoordinates[simplifiedOffset++] = x1;
  simplifiedFlatCoordinates[simplifiedOffset++] = y1;
  var x2, y2;
  do {
    x2 = snap(flatCoordinates[offset2], tolerance);
    y2 = snap(flatCoordinates[offset2 + 1], tolerance);
    offset2 += stride;
    if (offset2 == end) {
      simplifiedFlatCoordinates[simplifiedOffset++] = x2;
      simplifiedFlatCoordinates[simplifiedOffset++] = y2;
      return simplifiedOffset;
    }
  } while (x2 == x1 && y2 == y1);
  while (offset2 < end) {
    var x3 = snap(flatCoordinates[offset2], tolerance);
    var y3 = snap(flatCoordinates[offset2 + 1], tolerance);
    offset2 += stride;
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
function quantizeArray(flatCoordinates, offset2, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    simplifiedOffset = quantize(flatCoordinates, offset2, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset);
    simplifiedEnds.push(simplifiedOffset);
    offset2 = end;
  }
  return simplifiedOffset;
}

// ../node_modules/ol/geom/flat/inflate.js
function inflateCoordinates(flatCoordinates, offset2, end, stride, opt_coordinates) {
  var coordinates2 = opt_coordinates !== void 0 ? opt_coordinates : [];
  var i = 0;
  for (var j = offset2; j < end; j += stride) {
    coordinates2[i++] = flatCoordinates.slice(j, j + stride);
  }
  coordinates2.length = i;
  return coordinates2;
}
function inflateCoordinatesArray(flatCoordinates, offset2, ends, stride, opt_coordinatess) {
  var coordinatess = opt_coordinatess !== void 0 ? opt_coordinatess : [];
  var i = 0;
  for (var j = 0, jj = ends.length; j < jj; ++j) {
    var end = ends[j];
    coordinatess[i++] = inflateCoordinates(flatCoordinates, offset2, end, stride, coordinatess[i]);
    offset2 = end;
  }
  coordinatess.length = i;
  return coordinatess;
}
function inflateMultiCoordinatesArray(flatCoordinates, offset2, endss, stride, opt_coordinatesss) {
  var coordinatesss = opt_coordinatesss !== void 0 ? opt_coordinatesss : [];
  var i = 0;
  for (var j = 0, jj = endss.length; j < jj; ++j) {
    var ends = endss[j];
    coordinatesss[i++] = inflateCoordinatesArray(flatCoordinates, offset2, ends, stride, coordinatesss[i]);
    offset2 = ends[ends.length - 1];
  }
  coordinatesss.length = i;
  return coordinatesss;
}

// ../node_modules/ol/geom/flat/area.js
function linearRing(flatCoordinates, offset2, end, stride) {
  var twiceArea = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];
  for (; offset2 < end; offset2 += stride) {
    var x2 = flatCoordinates[offset2];
    var y2 = flatCoordinates[offset2 + 1];
    twiceArea += y1 * x2 - x1 * y2;
    x1 = x2;
    y1 = y2;
  }
  return twiceArea / 2;
}
function linearRings(flatCoordinates, offset2, ends, stride) {
  var area = 0;
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    area += linearRing(flatCoordinates, offset2, end, stride);
    offset2 = end;
  }
  return area;
}

// ../node_modules/ol/geom/LinearRing.js
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
var LinearRing = function(_super) {
  __extends11(LinearRing2, _super);
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
var Point = function(_super) {
  __extends12(Point2, _super);
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
function linearRingContainsExtent(flatCoordinates, offset2, end, stride, extent) {
  var outside = forEachCorner(extent, function(coordinate) {
    return !linearRingContainsXY(flatCoordinates, offset2, end, stride, coordinate[0], coordinate[1]);
  });
  return !outside;
}
function linearRingContainsXY(flatCoordinates, offset2, end, stride, x, y) {
  var wn = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];
  for (; offset2 < end; offset2 += stride) {
    var x2 = flatCoordinates[offset2];
    var y2 = flatCoordinates[offset2 + 1];
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
function linearRingsContainsXY(flatCoordinates, offset2, ends, stride, x, y) {
  if (ends.length === 0) {
    return false;
  }
  if (!linearRingContainsXY(flatCoordinates, offset2, ends[0], stride, x, y)) {
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
function getInteriorPointOfArray(flatCoordinates, offset2, ends, stride, flatCenters, flatCentersOffset, opt_dest) {
  var i, ii, x, x1, x2, y1, y2;
  var y = flatCenters[flatCentersOffset + 1];
  var intersections = [];
  for (var r = 0, rr = ends.length; r < rr; ++r) {
    var end = ends[r];
    x1 = flatCoordinates[end - stride];
    y1 = flatCoordinates[end - stride + 1];
    for (i = offset2; i < end; i += stride) {
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
      if (linearRingsContainsXY(flatCoordinates, offset2, ends, stride, x, y)) {
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
function forEach(flatCoordinates, offset2, end, stride, callback) {
  var ret;
  offset2 += stride;
  for (; offset2 < end; offset2 += stride) {
    ret = callback(flatCoordinates.slice(offset2 - stride, offset2), flatCoordinates.slice(offset2, offset2 + stride));
    if (ret) {
      return ret;
    }
  }
  return false;
}

// ../node_modules/ol/geom/flat/intersectsextent.js
function intersectsLineString(flatCoordinates, offset2, end, stride, extent) {
  var coordinatesExtent = extendFlatCoordinates(createEmpty(), flatCoordinates, offset2, end, stride);
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
  return forEach(flatCoordinates, offset2, end, stride, function(point1, point2) {
    return intersectsSegment(extent, point1, point2);
  });
}
function intersectsLinearRing(flatCoordinates, offset2, end, stride, extent) {
  if (intersectsLineString(flatCoordinates, offset2, end, stride, extent)) {
    return true;
  }
  if (linearRingContainsXY(flatCoordinates, offset2, end, stride, extent[0], extent[1])) {
    return true;
  }
  if (linearRingContainsXY(flatCoordinates, offset2, end, stride, extent[0], extent[3])) {
    return true;
  }
  if (linearRingContainsXY(flatCoordinates, offset2, end, stride, extent[2], extent[1])) {
    return true;
  }
  if (linearRingContainsXY(flatCoordinates, offset2, end, stride, extent[2], extent[3])) {
    return true;
  }
  return false;
}
function intersectsLinearRingArray(flatCoordinates, offset2, ends, stride, extent) {
  if (!intersectsLinearRing(flatCoordinates, offset2, ends[0], stride, extent)) {
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
function coordinates(flatCoordinates, offset2, end, stride) {
  while (offset2 < end - stride) {
    for (var i = 0; i < stride; ++i) {
      var tmp = flatCoordinates[offset2 + i];
      flatCoordinates[offset2 + i] = flatCoordinates[end - stride + i];
      flatCoordinates[end - stride + i] = tmp;
    }
    offset2 += stride;
    end -= stride;
  }
}

// ../node_modules/ol/geom/flat/orient.js
function linearRingIsClockwise(flatCoordinates, offset2, end, stride) {
  var edge = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];
  for (; offset2 < end; offset2 += stride) {
    var x2 = flatCoordinates[offset2];
    var y2 = flatCoordinates[offset2 + 1];
    edge += (x2 - x1) * (y2 + y1);
    x1 = x2;
    y1 = y2;
  }
  return edge === 0 ? void 0 : edge > 0;
}
function linearRingsAreOriented(flatCoordinates, offset2, ends, stride, opt_right) {
  var right = opt_right !== void 0 ? opt_right : false;
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    var isClockwise = linearRingIsClockwise(flatCoordinates, offset2, end, stride);
    if (i === 0) {
      if (right && isClockwise || !right && !isClockwise) {
        return false;
      }
    } else {
      if (right && !isClockwise || !right && isClockwise) {
        return false;
      }
    }
    offset2 = end;
  }
  return true;
}
function orientLinearRings(flatCoordinates, offset2, ends, stride, opt_right) {
  var right = opt_right !== void 0 ? opt_right : false;
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    var isClockwise = linearRingIsClockwise(flatCoordinates, offset2, end, stride);
    var reverse = i === 0 ? right && isClockwise || !right && !isClockwise : right && !isClockwise || !right && isClockwise;
    if (reverse) {
      coordinates(flatCoordinates, offset2, end, stride);
    }
    offset2 = end;
  }
  return offset2;
}

// ../node_modules/ol/geom/Polygon.js
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
var Polygon = function(_super) {
  __extends13(Polygon2, _super);
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
    var offset2 = 0;
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      var linearRing2 = new LinearRing_default(flatCoordinates.slice(offset2, end), layout);
      linearRings2.push(linearRing2);
      offset2 = end;
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
function circular(center, radius, opt_n, opt_sphereRadius) {
  var n = opt_n ? opt_n : 32;
  var flatCoordinates = [];
  for (var i = 0; i < n; ++i) {
    extend(flatCoordinates, offset(center, radius, 2 * Math.PI * i / n, opt_sphereRadius));
  }
  flatCoordinates.push(flatCoordinates[0], flatCoordinates[1]);
  return new Polygon(flatCoordinates, GeometryLayout_default.XY, [
    flatCoordinates.length
  ]);
}
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

// ../node_modules/ol/Geolocation.js
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
var Property2 = {
  ACCURACY: "accuracy",
  ACCURACY_GEOMETRY: "accuracyGeometry",
  ALTITUDE: "altitude",
  ALTITUDE_ACCURACY: "altitudeAccuracy",
  HEADING: "heading",
  POSITION: "position",
  PROJECTION: "projection",
  SPEED: "speed",
  TRACKING: "tracking",
  TRACKING_OPTIONS: "trackingOptions"
};
var GeolocationError = function(_super) {
  __extends14(GeolocationError2, _super);
  function GeolocationError2(error) {
    var _this = _super.call(this, EventType_default.ERROR) || this;
    _this.code = error.code;
    _this.message = error.message;
    return _this;
  }
  return GeolocationError2;
}(Event_default);
var Geolocation = function(_super) {
  __extends14(Geolocation2, _super);
  function Geolocation2(opt_options) {
    var _this = _super.call(this) || this;
    _this.on;
    _this.once;
    _this.un;
    var options = opt_options || {};
    _this.position_ = null;
    _this.transform_ = identityTransform;
    _this.watchId_ = void 0;
    _this.addChangeListener(Property2.PROJECTION, _this.handleProjectionChanged_);
    _this.addChangeListener(Property2.TRACKING, _this.handleTrackingChanged_);
    if (options.projection !== void 0) {
      _this.setProjection(options.projection);
    }
    if (options.trackingOptions !== void 0) {
      _this.setTrackingOptions(options.trackingOptions);
    }
    _this.setTracking(options.tracking !== void 0 ? options.tracking : false);
    return _this;
  }
  Geolocation2.prototype.disposeInternal = function() {
    this.setTracking(false);
    _super.prototype.disposeInternal.call(this);
  };
  Geolocation2.prototype.handleProjectionChanged_ = function() {
    var projection = this.getProjection();
    if (projection) {
      this.transform_ = getTransformFromProjections(get3("EPSG:4326"), projection);
      if (this.position_) {
        this.set(Property2.POSITION, this.transform_(this.position_));
      }
    }
  };
  Geolocation2.prototype.handleTrackingChanged_ = function() {
    if ("geolocation" in navigator) {
      var tracking = this.getTracking();
      if (tracking && this.watchId_ === void 0) {
        this.watchId_ = navigator.geolocation.watchPosition(this.positionChange_.bind(this), this.positionError_.bind(this), this.getTrackingOptions());
      } else if (!tracking && this.watchId_ !== void 0) {
        navigator.geolocation.clearWatch(this.watchId_);
        this.watchId_ = void 0;
      }
    }
  };
  Geolocation2.prototype.positionChange_ = function(position) {
    var coords = position.coords;
    this.set(Property2.ACCURACY, coords.accuracy);
    this.set(Property2.ALTITUDE, coords.altitude === null ? void 0 : coords.altitude);
    this.set(Property2.ALTITUDE_ACCURACY, coords.altitudeAccuracy === null ? void 0 : coords.altitudeAccuracy);
    this.set(Property2.HEADING, coords.heading === null ? void 0 : toRadians(coords.heading));
    if (!this.position_) {
      this.position_ = [coords.longitude, coords.latitude];
    } else {
      this.position_[0] = coords.longitude;
      this.position_[1] = coords.latitude;
    }
    var projectedPosition = this.transform_(this.position_);
    this.set(Property2.POSITION, projectedPosition);
    this.set(Property2.SPEED, coords.speed === null ? void 0 : coords.speed);
    var geometry = circular(this.position_, coords.accuracy);
    geometry.applyTransform(this.transform_);
    this.set(Property2.ACCURACY_GEOMETRY, geometry);
    this.changed();
  };
  Geolocation2.prototype.positionError_ = function(error) {
    this.dispatchEvent(new GeolocationError(error));
  };
  Geolocation2.prototype.getAccuracy = function() {
    return this.get(Property2.ACCURACY);
  };
  Geolocation2.prototype.getAccuracyGeometry = function() {
    return this.get(Property2.ACCURACY_GEOMETRY) || null;
  };
  Geolocation2.prototype.getAltitude = function() {
    return this.get(Property2.ALTITUDE);
  };
  Geolocation2.prototype.getAltitudeAccuracy = function() {
    return this.get(Property2.ALTITUDE_ACCURACY);
  };
  Geolocation2.prototype.getHeading = function() {
    return this.get(Property2.HEADING);
  };
  Geolocation2.prototype.getPosition = function() {
    return this.get(Property2.POSITION);
  };
  Geolocation2.prototype.getProjection = function() {
    return this.get(Property2.PROJECTION);
  };
  Geolocation2.prototype.getSpeed = function() {
    return this.get(Property2.SPEED);
  };
  Geolocation2.prototype.getTracking = function() {
    return this.get(Property2.TRACKING);
  };
  Geolocation2.prototype.getTrackingOptions = function() {
    return this.get(Property2.TRACKING_OPTIONS);
  };
  Geolocation2.prototype.setProjection = function(projection) {
    this.set(Property2.PROJECTION, get3(projection));
  };
  Geolocation2.prototype.setTracking = function(tracking) {
    this.set(Property2.TRACKING, tracking);
  };
  Geolocation2.prototype.setTrackingOptions = function(options) {
    this.set(Property2.TRACKING_OPTIONS, options);
  };
  return Geolocation2;
}(Object_default);
var Geolocation_default = Geolocation;

// ../node_modules/ol/render/EventType.js
var EventType_default2 = {
  PRERENDER: "prerender",
  POSTRENDER: "postrender",
  PRECOMPOSE: "precompose",
  POSTCOMPOSE: "postcompose",
  RENDERCOMPLETE: "rendercomplete"
};

// ../node_modules/ol/style/Fill.js
var Fill = function() {
  function Fill2(opt_options) {
    var options = opt_options || {};
    this.color_ = options.color !== void 0 ? options.color : null;
  }
  Fill2.prototype.clone = function() {
    var color = this.getColor();
    return new Fill2({
      color: Array.isArray(color) ? color.slice() : color || void 0
    });
  };
  Fill2.prototype.getColor = function() {
    return this.color_;
  };
  Fill2.prototype.setColor = function(color) {
    this.color_ = color;
  };
  return Fill2;
}();
var Fill_default = Fill;

// ../node_modules/ol/geom/flat/interpolate.js
function interpolatePoint(flatCoordinates, offset2, end, stride, fraction, opt_dest, opt_dimension) {
  var o, t;
  var n = (end - offset2) / stride;
  if (n === 1) {
    o = offset2;
  } else if (n === 2) {
    o = offset2;
    t = fraction;
  } else if (n !== 0) {
    var x1 = flatCoordinates[offset2];
    var y1 = flatCoordinates[offset2 + 1];
    var length_1 = 0;
    var cumulativeLengths = [0];
    for (var i = offset2 + stride; i < end; i += stride) {
      var x2 = flatCoordinates[i];
      var y2 = flatCoordinates[i + 1];
      length_1 += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      cumulativeLengths.push(length_1);
      x1 = x2;
      y1 = y2;
    }
    var target = fraction * length_1;
    var index = binarySearch(cumulativeLengths, target);
    if (index < 0) {
      t = (target - cumulativeLengths[-index - 2]) / (cumulativeLengths[-index - 1] - cumulativeLengths[-index - 2]);
      o = offset2 + (-index - 2) * stride;
    } else {
      o = offset2 + index * stride;
    }
  }
  var dimension = opt_dimension > 1 ? opt_dimension : 2;
  var dest = opt_dest ? opt_dest : new Array(dimension);
  for (var i = 0; i < dimension; ++i) {
    dest[i] = o === void 0 ? NaN : t === void 0 ? flatCoordinates[o + i] : lerp(flatCoordinates[o + i], flatCoordinates[o + stride + i], t);
  }
  return dest;
}
function lineStringCoordinateAtM(flatCoordinates, offset2, end, stride, m, extrapolate) {
  if (end == offset2) {
    return null;
  }
  var coordinate;
  if (m < flatCoordinates[offset2 + stride - 1]) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(offset2, offset2 + stride);
      coordinate[stride - 1] = m;
      return coordinate;
    } else {
      return null;
    }
  } else if (flatCoordinates[end - 1] < m) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(end - stride, end);
      coordinate[stride - 1] = m;
      return coordinate;
    } else {
      return null;
    }
  }
  if (m == flatCoordinates[offset2 + stride - 1]) {
    return flatCoordinates.slice(offset2, offset2 + stride);
  }
  var lo = offset2 / stride;
  var hi = end / stride;
  while (lo < hi) {
    var mid = lo + hi >> 1;
    if (m < flatCoordinates[(mid + 1) * stride - 1]) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  var m0 = flatCoordinates[lo * stride - 1];
  if (m == m0) {
    return flatCoordinates.slice((lo - 1) * stride, (lo - 1) * stride + stride);
  }
  var m1 = flatCoordinates[(lo + 1) * stride - 1];
  var t = (m - m0) / (m1 - m0);
  coordinate = [];
  for (var i = 0; i < stride - 1; ++i) {
    coordinate.push(lerp(flatCoordinates[(lo - 1) * stride + i], flatCoordinates[lo * stride + i], t));
  }
  coordinate.push(m);
  return coordinate;
}

// ../node_modules/ol/geom/flat/length.js
function lineStringLength(flatCoordinates, offset2, end, stride) {
  var x1 = flatCoordinates[offset2];
  var y1 = flatCoordinates[offset2 + 1];
  var length = 0;
  for (var i = offset2 + stride; i < end; i += stride) {
    var x2 = flatCoordinates[i];
    var y2 = flatCoordinates[i + 1];
    length += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    x1 = x2;
    y1 = y2;
  }
  return length;
}

// ../node_modules/ol/geom/LineString.js
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
var LineString = function(_super) {
  __extends15(LineString2, _super);
  function LineString2(coordinates2, opt_layout) {
    var _this = _super.call(this) || this;
    _this.flatMidpoint_ = null;
    _this.flatMidpointRevision_ = -1;
    _this.maxDelta_ = -1;
    _this.maxDeltaRevision_ = -1;
    if (opt_layout !== void 0 && !Array.isArray(coordinates2[0])) {
      _this.setFlatCoordinates(opt_layout, coordinates2);
    } else {
      _this.setCoordinates(coordinates2, opt_layout);
    }
    return _this;
  }
  LineString2.prototype.appendCoordinate = function(coordinate) {
    if (!this.flatCoordinates) {
      this.flatCoordinates = coordinate.slice();
    } else {
      extend(this.flatCoordinates, coordinate);
    }
    this.changed();
  };
  LineString2.prototype.clone = function() {
    var lineString = new LineString2(this.flatCoordinates.slice(), this.layout);
    lineString.applyProperties(this);
    return lineString;
  };
  LineString2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt(maxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }
    return assignClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, false, x, y, closestPoint, minSquaredDistance);
  };
  LineString2.prototype.forEachSegment = function(callback) {
    return forEach(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, callback);
  };
  LineString2.prototype.getCoordinateAtM = function(m, opt_extrapolate) {
    if (this.layout != GeometryLayout_default.XYM && this.layout != GeometryLayout_default.XYZM) {
      return null;
    }
    var extrapolate = opt_extrapolate !== void 0 ? opt_extrapolate : false;
    return lineStringCoordinateAtM(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, m, extrapolate);
  };
  LineString2.prototype.getCoordinates = function() {
    return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };
  LineString2.prototype.getCoordinateAt = function(fraction, opt_dest) {
    return interpolatePoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, fraction, opt_dest, this.stride);
  };
  LineString2.prototype.getLength = function() {
    return lineStringLength(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };
  LineString2.prototype.getFlatMidpoint = function() {
    if (this.flatMidpointRevision_ != this.getRevision()) {
      this.flatMidpoint_ = this.getCoordinateAt(0.5, this.flatMidpoint_);
      this.flatMidpointRevision_ = this.getRevision();
    }
    return this.flatMidpoint_;
  };
  LineString2.prototype.getSimplifiedGeometryInternal = function(squaredTolerance) {
    var simplifiedFlatCoordinates = [];
    simplifiedFlatCoordinates.length = douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
    return new LineString2(simplifiedFlatCoordinates, GeometryLayout_default.XY);
  };
  LineString2.prototype.getType = function() {
    return GeometryType_default.LINE_STRING;
  };
  LineString2.prototype.intersectsExtent = function(extent) {
    return intersectsLineString(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
  };
  LineString2.prototype.setCoordinates = function(coordinates2, opt_layout) {
    this.setLayout(opt_layout, coordinates2, 1);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates2, this.stride);
    this.changed();
  };
  return LineString2;
}(SimpleGeometry_default);
var LineString_default = LineString;

// ../node_modules/ol/style/Stroke.js
var Stroke = function() {
  function Stroke2(opt_options) {
    var options = opt_options || {};
    this.color_ = options.color !== void 0 ? options.color : null;
    this.lineCap_ = options.lineCap;
    this.lineDash_ = options.lineDash !== void 0 ? options.lineDash : null;
    this.lineDashOffset_ = options.lineDashOffset;
    this.lineJoin_ = options.lineJoin;
    this.miterLimit_ = options.miterLimit;
    this.width_ = options.width;
  }
  Stroke2.prototype.clone = function() {
    var color = this.getColor();
    return new Stroke2({
      color: Array.isArray(color) ? color.slice() : color || void 0,
      lineCap: this.getLineCap(),
      lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
      lineDashOffset: this.getLineDashOffset(),
      lineJoin: this.getLineJoin(),
      miterLimit: this.getMiterLimit(),
      width: this.getWidth()
    });
  };
  Stroke2.prototype.getColor = function() {
    return this.color_;
  };
  Stroke2.prototype.getLineCap = function() {
    return this.lineCap_;
  };
  Stroke2.prototype.getLineDash = function() {
    return this.lineDash_;
  };
  Stroke2.prototype.getLineDashOffset = function() {
    return this.lineDashOffset_;
  };
  Stroke2.prototype.getLineJoin = function() {
    return this.lineJoin_;
  };
  Stroke2.prototype.getMiterLimit = function() {
    return this.miterLimit_;
  };
  Stroke2.prototype.getWidth = function() {
    return this.width_;
  };
  Stroke2.prototype.setColor = function(color) {
    this.color_ = color;
  };
  Stroke2.prototype.setLineCap = function(lineCap) {
    this.lineCap_ = lineCap;
  };
  Stroke2.prototype.setLineDash = function(lineDash) {
    this.lineDash_ = lineDash;
  };
  Stroke2.prototype.setLineDashOffset = function(lineDashOffset) {
    this.lineDashOffset_ = lineDashOffset;
  };
  Stroke2.prototype.setLineJoin = function(lineJoin) {
    this.lineJoin_ = lineJoin;
  };
  Stroke2.prototype.setMiterLimit = function(miterLimit) {
    this.miterLimit_ = miterLimit;
  };
  Stroke2.prototype.setWidth = function(width) {
    this.width_ = width;
  };
  return Stroke2;
}();
var Stroke_default = Stroke;

// ../node_modules/ol/ImageState.js
var ImageState_default = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};

// ../node_modules/ol/size.js
function hasArea(size) {
  return size[0] > 0 && size[1] > 0;
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

// ../node_modules/ol/style/Image.js
var ImageStyle = function() {
  function ImageStyle2(options) {
    this.opacity_ = options.opacity;
    this.rotateWithView_ = options.rotateWithView;
    this.rotation_ = options.rotation;
    this.scale_ = options.scale;
    this.scaleArray_ = toSize(options.scale);
    this.displacement_ = options.displacement;
  }
  ImageStyle2.prototype.clone = function() {
    var scale4 = this.getScale();
    return new ImageStyle2({
      opacity: this.getOpacity(),
      scale: Array.isArray(scale4) ? scale4.slice() : scale4,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice()
    });
  };
  ImageStyle2.prototype.getOpacity = function() {
    return this.opacity_;
  };
  ImageStyle2.prototype.getRotateWithView = function() {
    return this.rotateWithView_;
  };
  ImageStyle2.prototype.getRotation = function() {
    return this.rotation_;
  };
  ImageStyle2.prototype.getScale = function() {
    return this.scale_;
  };
  ImageStyle2.prototype.getScaleArray = function() {
    return this.scaleArray_;
  };
  ImageStyle2.prototype.getDisplacement = function() {
    return this.displacement_;
  };
  ImageStyle2.prototype.getAnchor = function() {
    return abstract();
  };
  ImageStyle2.prototype.getImage = function(pixelRatio) {
    return abstract();
  };
  ImageStyle2.prototype.getHitDetectionImage = function() {
    return abstract();
  };
  ImageStyle2.prototype.getPixelRatio = function(pixelRatio) {
    return 1;
  };
  ImageStyle2.prototype.getImageState = function() {
    return abstract();
  };
  ImageStyle2.prototype.getImageSize = function() {
    return abstract();
  };
  ImageStyle2.prototype.getOrigin = function() {
    return abstract();
  };
  ImageStyle2.prototype.getSize = function() {
    return abstract();
  };
  ImageStyle2.prototype.setDisplacement = function(displacement) {
    this.displacement_ = displacement;
  };
  ImageStyle2.prototype.setOpacity = function(opacity) {
    this.opacity_ = opacity;
  };
  ImageStyle2.prototype.setRotateWithView = function(rotateWithView) {
    this.rotateWithView_ = rotateWithView;
  };
  ImageStyle2.prototype.setRotation = function(rotation) {
    this.rotation_ = rotation;
  };
  ImageStyle2.prototype.setScale = function(scale4) {
    this.scale_ = scale4;
    this.scaleArray_ = toSize(scale4);
  };
  ImageStyle2.prototype.listenImageChange = function(listener) {
    abstract();
  };
  ImageStyle2.prototype.load = function() {
    abstract();
  };
  ImageStyle2.prototype.unlistenImageChange = function(listener) {
    abstract();
  };
  return ImageStyle2;
}();
var Image_default = ImageStyle;

// ../node_modules/ol/color.js
var HEX_COLOR_RE_ = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i;
var NAMED_COLOR_RE_ = /^([a-z]*)$|^hsla?\(.*\)$/i;
function asString(color) {
  if (typeof color === "string") {
    return color;
  } else {
    return toString2(color);
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
function toString2(color) {
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
    return toString2(color);
  } else {
    return color;
  }
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
function outerWidth(element) {
  var width = element.offsetWidth;
  var style = getComputedStyle(element);
  width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
  return width;
}
function outerHeight(element) {
  var height = element.offsetHeight;
  var style = getComputedStyle(element);
  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
  return height;
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

// ../node_modules/ol/css.js
var CLASS_HIDDEN = "ol-hidden";
var CLASS_SELECTABLE = "ol-selectable";
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
function cssOpacity(opacity) {
  return opacity === 1 ? "" : String(Math.round(opacity * 100) / 100);
}

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
var defaultPadding = [0, 0, 0, 0];
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
function measureAndCacheTextWidth(font, text, cache2) {
  if (text in cache2) {
    return cache2[text];
  }
  var width = measureTextWidth(font, text);
  cache2[text] = width;
  return width;
}
function getTextDimensions(baseStyle, chunks) {
  var widths = [];
  var heights = [];
  var lineWidths = [];
  var width = 0;
  var lineWidth = 0;
  var height = 0;
  var lineHeight = 0;
  for (var i = 0, ii = chunks.length; i <= ii; i += 2) {
    var text = chunks[i];
    if (text === "\n" || i === ii) {
      width = Math.max(width, lineWidth);
      lineWidths.push(lineWidth);
      lineWidth = 0;
      height += lineHeight;
      continue;
    }
    var font = chunks[i + 1] || baseStyle.font;
    var currentWidth = measureTextWidth(font, text);
    widths.push(currentWidth);
    lineWidth += currentWidth;
    var currentHeight = measureTextHeight(font);
    heights.push(currentHeight);
    lineHeight = Math.max(lineHeight, currentHeight);
  }
  return { width, height, widths, heights, lineWidths };
}
function drawImageOrLabel(context, transform2, opacity, labelOrImage, originX, originY, w, h, x, y, scale4) {
  context.save();
  if (opacity !== 1) {
    context.globalAlpha *= opacity;
  }
  if (transform2) {
    context.setTransform.apply(context, transform2);
  }
  if (labelOrImage.contextInstructions) {
    context.translate(x, y);
    context.scale(scale4[0], scale4[1]);
    executeLabelInstructions(labelOrImage, context);
  } else if (scale4[0] < 0 || scale4[1] < 0) {
    context.translate(x, y);
    context.scale(scale4[0], scale4[1]);
    context.drawImage(labelOrImage, originX, originY, w, h, 0, 0, w, h);
  } else {
    context.drawImage(labelOrImage, originX, originY, w, h, x, y, w * scale4[0], h * scale4[1]);
  }
  context.restore();
}
function executeLabelInstructions(label, context) {
  var contextInstructions = label.contextInstructions;
  for (var i = 0, ii = contextInstructions.length; i < ii; i += 2) {
    if (Array.isArray(contextInstructions[i + 1])) {
      context[contextInstructions[i]].apply(context, contextInstructions[i + 1]);
    } else {
      context[contextInstructions[i]] = contextInstructions[i + 1];
    }
  }
}

// ../node_modules/ol/style/RegularShape.js
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
var RegularShape = function(_super) {
  __extends16(RegularShape2, _super);
  function RegularShape2(options) {
    var _this = this;
    var rotateWithView = options.rotateWithView !== void 0 ? options.rotateWithView : false;
    _this = _super.call(this, {
      opacity: 1,
      rotateWithView,
      rotation: options.rotation !== void 0 ? options.rotation : 0,
      scale: options.scale !== void 0 ? options.scale : 1,
      displacement: options.displacement !== void 0 ? options.displacement : [0, 0]
    }) || this;
    _this.canvas_ = void 0;
    _this.hitDetectionCanvas_ = null;
    _this.fill_ = options.fill !== void 0 ? options.fill : null;
    _this.origin_ = [0, 0];
    _this.points_ = options.points;
    _this.radius_ = options.radius !== void 0 ? options.radius : options.radius1;
    _this.radius2_ = options.radius2;
    _this.angle_ = options.angle !== void 0 ? options.angle : 0;
    _this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
    _this.size_ = null;
    _this.renderOptions_ = null;
    _this.render();
    return _this;
  }
  RegularShape2.prototype.clone = function() {
    var scale4 = this.getScale();
    var style = new RegularShape2({
      fill: this.getFill() ? this.getFill().clone() : void 0,
      points: this.getPoints(),
      radius: this.getRadius(),
      radius2: this.getRadius2(),
      angle: this.getAngle(),
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(scale4) ? scale4.slice() : scale4,
      displacement: this.getDisplacement().slice()
    });
    style.setOpacity(this.getOpacity());
    return style;
  };
  RegularShape2.prototype.getAnchor = function() {
    var size = this.size_;
    if (!size) {
      return null;
    }
    var displacement = this.getDisplacement();
    return [size[0] / 2 - displacement[0], size[1] / 2 + displacement[1]];
  };
  RegularShape2.prototype.getAngle = function() {
    return this.angle_;
  };
  RegularShape2.prototype.getFill = function() {
    return this.fill_;
  };
  RegularShape2.prototype.getHitDetectionImage = function() {
    if (!this.hitDetectionCanvas_) {
      this.createHitDetectionCanvas_(this.renderOptions_);
    }
    return this.hitDetectionCanvas_;
  };
  RegularShape2.prototype.getImage = function(pixelRatio) {
    var image = this.canvas_[pixelRatio];
    if (!image) {
      var renderOptions = this.renderOptions_;
      var context = createCanvasContext2D(renderOptions.size * pixelRatio, renderOptions.size * pixelRatio);
      this.draw_(renderOptions, context, pixelRatio);
      image = context.canvas;
      this.canvas_[pixelRatio] = image;
    }
    return image;
  };
  RegularShape2.prototype.getPixelRatio = function(pixelRatio) {
    return pixelRatio;
  };
  RegularShape2.prototype.getImageSize = function() {
    return this.size_;
  };
  RegularShape2.prototype.getImageState = function() {
    return ImageState_default.LOADED;
  };
  RegularShape2.prototype.getOrigin = function() {
    return this.origin_;
  };
  RegularShape2.prototype.getPoints = function() {
    return this.points_;
  };
  RegularShape2.prototype.getRadius = function() {
    return this.radius_;
  };
  RegularShape2.prototype.getRadius2 = function() {
    return this.radius2_;
  };
  RegularShape2.prototype.getSize = function() {
    return this.size_;
  };
  RegularShape2.prototype.getStroke = function() {
    return this.stroke_;
  };
  RegularShape2.prototype.listenImageChange = function(listener) {
  };
  RegularShape2.prototype.load = function() {
  };
  RegularShape2.prototype.unlistenImageChange = function(listener) {
  };
  RegularShape2.prototype.calculateLineJoinSize_ = function(lineJoin, strokeWidth, miterLimit) {
    if (strokeWidth === 0 || this.points_ === Infinity || lineJoin !== "bevel" && lineJoin !== "miter") {
      return strokeWidth;
    }
    var r1 = this.radius_;
    var r2 = this.radius2_ === void 0 ? r1 : this.radius2_;
    if (r1 < r2) {
      var tmp = r1;
      r1 = r2;
      r2 = tmp;
    }
    var points = this.radius2_ === void 0 ? this.points_ : this.points_ * 2;
    var alpha = 2 * Math.PI / points;
    var a = r2 * Math.sin(alpha);
    var b = Math.sqrt(r2 * r2 - a * a);
    var d = r1 - b;
    var e = Math.sqrt(a * a + d * d);
    var miterRatio = e / a;
    if (lineJoin === "miter" && miterRatio <= miterLimit) {
      return miterRatio * strokeWidth;
    }
    var k = strokeWidth / 2 / miterRatio;
    var l = strokeWidth / 2 * (d / e);
    var maxr = Math.sqrt((r1 + k) * (r1 + k) + l * l);
    var bevelAdd = maxr - r1;
    if (this.radius2_ === void 0 || lineJoin === "bevel") {
      return bevelAdd * 2;
    }
    var aa = r1 * Math.sin(alpha);
    var bb = Math.sqrt(r1 * r1 - aa * aa);
    var dd = r2 - bb;
    var ee = Math.sqrt(aa * aa + dd * dd);
    var innerMiterRatio = ee / aa;
    if (innerMiterRatio <= miterLimit) {
      var innerLength = innerMiterRatio * strokeWidth / 2 - r2 - r1;
      return 2 * Math.max(bevelAdd, innerLength);
    }
    return bevelAdd * 2;
  };
  RegularShape2.prototype.createRenderOptions = function() {
    var lineJoin = defaultLineJoin;
    var miterLimit = 0;
    var lineDash = null;
    var lineDashOffset = 0;
    var strokeStyle;
    var strokeWidth = 0;
    if (this.stroke_) {
      strokeStyle = this.stroke_.getColor();
      if (strokeStyle === null) {
        strokeStyle = defaultStrokeStyle;
      }
      strokeStyle = asColorLike(strokeStyle);
      strokeWidth = this.stroke_.getWidth();
      if (strokeWidth === void 0) {
        strokeWidth = defaultLineWidth;
      }
      lineDash = this.stroke_.getLineDash();
      lineDashOffset = this.stroke_.getLineDashOffset();
      lineJoin = this.stroke_.getLineJoin();
      if (lineJoin === void 0) {
        lineJoin = defaultLineJoin;
      }
      miterLimit = this.stroke_.getMiterLimit();
      if (miterLimit === void 0) {
        miterLimit = defaultMiterLimit;
      }
    }
    var add4 = this.calculateLineJoinSize_(lineJoin, strokeWidth, miterLimit);
    var maxRadius = Math.max(this.radius_, this.radius2_ || 0);
    var size = Math.ceil(2 * maxRadius + add4);
    return {
      strokeStyle,
      strokeWidth,
      size,
      lineDash,
      lineDashOffset,
      lineJoin,
      miterLimit
    };
  };
  RegularShape2.prototype.render = function() {
    this.renderOptions_ = this.createRenderOptions();
    var size = this.renderOptions_.size;
    this.canvas_ = {};
    this.size_ = [size, size];
  };
  RegularShape2.prototype.draw_ = function(renderOptions, context, pixelRatio) {
    context.scale(pixelRatio, pixelRatio);
    context.translate(renderOptions.size / 2, renderOptions.size / 2);
    this.createPath_(context);
    if (this.fill_) {
      var color = this.fill_.getColor();
      if (color === null) {
        color = defaultFillStyle;
      }
      context.fillStyle = asColorLike(color);
      context.fill();
    }
    if (this.stroke_) {
      context.strokeStyle = renderOptions.strokeStyle;
      context.lineWidth = renderOptions.strokeWidth;
      if (context.setLineDash && renderOptions.lineDash) {
        context.setLineDash(renderOptions.lineDash);
        context.lineDashOffset = renderOptions.lineDashOffset;
      }
      context.lineJoin = renderOptions.lineJoin;
      context.miterLimit = renderOptions.miterLimit;
      context.stroke();
    }
  };
  RegularShape2.prototype.createHitDetectionCanvas_ = function(renderOptions) {
    if (this.fill_) {
      var color = this.fill_.getColor();
      var opacity = 0;
      if (typeof color === "string") {
        color = asArray(color);
      }
      if (color === null) {
        opacity = 1;
      } else if (Array.isArray(color)) {
        opacity = color.length === 4 ? color[3] : 1;
      }
      if (opacity === 0) {
        var context = createCanvasContext2D(renderOptions.size, renderOptions.size);
        this.hitDetectionCanvas_ = context.canvas;
        this.drawHitDetectionCanvas_(renderOptions, context);
      }
    }
    if (!this.hitDetectionCanvas_) {
      this.hitDetectionCanvas_ = this.getImage(1);
    }
  };
  RegularShape2.prototype.createPath_ = function(context) {
    var points = this.points_;
    var radius = this.radius_;
    if (points === Infinity) {
      context.arc(0, 0, radius, 0, 2 * Math.PI);
    } else {
      var radius2 = this.radius2_ === void 0 ? radius : this.radius2_;
      if (this.radius2_ !== void 0) {
        points *= 2;
      }
      var startAngle = this.angle_ - Math.PI / 2;
      var step = 2 * Math.PI / points;
      for (var i = 0; i < points; i++) {
        var angle0 = startAngle + i * step;
        var radiusC = i % 2 === 0 ? radius : radius2;
        context.lineTo(radiusC * Math.cos(angle0), radiusC * Math.sin(angle0));
      }
      context.closePath();
    }
  };
  RegularShape2.prototype.drawHitDetectionCanvas_ = function(renderOptions, context) {
    context.translate(renderOptions.size / 2, renderOptions.size / 2);
    this.createPath_(context);
    context.fillStyle = defaultFillStyle;
    context.fill();
    if (this.stroke_) {
      context.strokeStyle = renderOptions.strokeStyle;
      context.lineWidth = renderOptions.strokeWidth;
      if (renderOptions.lineDash) {
        context.setLineDash(renderOptions.lineDash);
        context.lineDashOffset = renderOptions.lineDashOffset;
      }
      context.lineJoin = renderOptions.lineJoin;
      context.miterLimit = renderOptions.miterLimit;
      context.stroke();
    }
  };
  return RegularShape2;
}(Image_default);
var RegularShape_default = RegularShape;

// ../node_modules/ol/style/Circle.js
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
var CircleStyle = function(_super) {
  __extends17(CircleStyle2, _super);
  function CircleStyle2(opt_options) {
    var options = opt_options ? opt_options : {};
    return _super.call(this, {
      points: Infinity,
      fill: options.fill,
      radius: options.radius,
      stroke: options.stroke,
      scale: options.scale !== void 0 ? options.scale : 1,
      rotation: options.rotation !== void 0 ? options.rotation : 0,
      rotateWithView: options.rotateWithView !== void 0 ? options.rotateWithView : false,
      displacement: options.displacement !== void 0 ? options.displacement : [0, 0]
    }) || this;
  }
  CircleStyle2.prototype.clone = function() {
    var scale4 = this.getScale();
    var style = new CircleStyle2({
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      radius: this.getRadius(),
      scale: Array.isArray(scale4) ? scale4.slice() : scale4,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice()
    });
    style.setOpacity(this.getOpacity());
    return style;
  };
  CircleStyle2.prototype.setRadius = function(radius) {
    this.radius_ = radius;
    this.render();
  };
  return CircleStyle2;
}(RegularShape_default);
var Circle_default = CircleStyle;

// ../node_modules/ol/style/Style.js
var Style = function() {
  function Style2(opt_options) {
    var options = opt_options || {};
    this.geometry_ = null;
    this.geometryFunction_ = defaultGeometryFunction;
    if (options.geometry !== void 0) {
      this.setGeometry(options.geometry);
    }
    this.fill_ = options.fill !== void 0 ? options.fill : null;
    this.image_ = options.image !== void 0 ? options.image : null;
    this.renderer_ = options.renderer !== void 0 ? options.renderer : null;
    this.hitDetectionRenderer_ = options.hitDetectionRenderer !== void 0 ? options.hitDetectionRenderer : null;
    this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
    this.text_ = options.text !== void 0 ? options.text : null;
    this.zIndex_ = options.zIndex;
  }
  Style2.prototype.clone = function() {
    var geometry = this.getGeometry();
    if (geometry && typeof geometry === "object") {
      geometry = geometry.clone();
    }
    return new Style2({
      geometry,
      fill: this.getFill() ? this.getFill().clone() : void 0,
      image: this.getImage() ? this.getImage().clone() : void 0,
      renderer: this.getRenderer(),
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      text: this.getText() ? this.getText().clone() : void 0,
      zIndex: this.getZIndex()
    });
  };
  Style2.prototype.getRenderer = function() {
    return this.renderer_;
  };
  Style2.prototype.setRenderer = function(renderer) {
    this.renderer_ = renderer;
  };
  Style2.prototype.setHitDetectionRenderer = function(renderer) {
    this.hitDetectionRenderer_ = renderer;
  };
  Style2.prototype.getHitDetectionRenderer = function() {
    return this.hitDetectionRenderer_;
  };
  Style2.prototype.getGeometry = function() {
    return this.geometry_;
  };
  Style2.prototype.getGeometryFunction = function() {
    return this.geometryFunction_;
  };
  Style2.prototype.getFill = function() {
    return this.fill_;
  };
  Style2.prototype.setFill = function(fill) {
    this.fill_ = fill;
  };
  Style2.prototype.getImage = function() {
    return this.image_;
  };
  Style2.prototype.setImage = function(image) {
    this.image_ = image;
  };
  Style2.prototype.getStroke = function() {
    return this.stroke_;
  };
  Style2.prototype.setStroke = function(stroke) {
    this.stroke_ = stroke;
  };
  Style2.prototype.getText = function() {
    return this.text_;
  };
  Style2.prototype.setText = function(text) {
    this.text_ = text;
  };
  Style2.prototype.getZIndex = function() {
    return this.zIndex_;
  };
  Style2.prototype.setGeometry = function(geometry) {
    if (typeof geometry === "function") {
      this.geometryFunction_ = geometry;
    } else if (typeof geometry === "string") {
      this.geometryFunction_ = function(feature) {
        return feature.get(geometry);
      };
    } else if (!geometry) {
      this.geometryFunction_ = defaultGeometryFunction;
    } else if (geometry !== void 0) {
      this.geometryFunction_ = function() {
        return geometry;
      };
    }
    this.geometry_ = geometry;
  };
  Style2.prototype.setZIndex = function(zIndex) {
    this.zIndex_ = zIndex;
  };
  return Style2;
}();
function toFunction(obj) {
  var styleFunction;
  if (typeof obj === "function") {
    styleFunction = obj;
  } else {
    var styles_1;
    if (Array.isArray(obj)) {
      styles_1 = obj;
    } else {
      assert(typeof obj.getZIndex === "function", 41);
      var style = obj;
      styles_1 = [style];
    }
    styleFunction = function() {
      return styles_1;
    };
  }
  return styleFunction;
}
var defaultStyles = null;
function createDefaultStyle(feature, resolution) {
  if (!defaultStyles) {
    var fill = new Fill_default({
      color: "rgba(255,255,255,0.4)"
    });
    var stroke = new Stroke_default({
      color: "#3399CC",
      width: 1.25
    });
    defaultStyles = [
      new Style({
        image: new Circle_default({
          fill,
          stroke,
          radius: 5
        }),
        fill,
        stroke
      })
    ];
  }
  return defaultStyles;
}
function defaultGeometryFunction(feature) {
  return feature.getGeometry();
}
var Style_default = Style;

// ../node_modules/ol/style/TextPlacement.js
var TextPlacement_default = {
  POINT: "point",
  LINE: "line"
};

// ../node_modules/ol/style/Text.js
var DEFAULT_FILL_COLOR = "#333";
var Text = function() {
  function Text2(opt_options) {
    var options = opt_options || {};
    this.font_ = options.font;
    this.rotation_ = options.rotation;
    this.rotateWithView_ = options.rotateWithView;
    this.scale_ = options.scale;
    this.scaleArray_ = toSize(options.scale !== void 0 ? options.scale : 1);
    this.text_ = options.text;
    this.textAlign_ = options.textAlign;
    this.textBaseline_ = options.textBaseline;
    this.fill_ = options.fill !== void 0 ? options.fill : new Fill_default({ color: DEFAULT_FILL_COLOR });
    this.maxAngle_ = options.maxAngle !== void 0 ? options.maxAngle : Math.PI / 4;
    this.placement_ = options.placement !== void 0 ? options.placement : TextPlacement_default.POINT;
    this.overflow_ = !!options.overflow;
    this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
    this.offsetX_ = options.offsetX !== void 0 ? options.offsetX : 0;
    this.offsetY_ = options.offsetY !== void 0 ? options.offsetY : 0;
    this.backgroundFill_ = options.backgroundFill ? options.backgroundFill : null;
    this.backgroundStroke_ = options.backgroundStroke ? options.backgroundStroke : null;
    this.padding_ = options.padding === void 0 ? null : options.padding;
  }
  Text2.prototype.clone = function() {
    var scale4 = this.getScale();
    return new Text2({
      font: this.getFont(),
      placement: this.getPlacement(),
      maxAngle: this.getMaxAngle(),
      overflow: this.getOverflow(),
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(scale4) ? scale4.slice() : scale4,
      text: this.getText(),
      textAlign: this.getTextAlign(),
      textBaseline: this.getTextBaseline(),
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      offsetX: this.getOffsetX(),
      offsetY: this.getOffsetY(),
      backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : void 0,
      backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : void 0,
      padding: this.getPadding() || void 0
    });
  };
  Text2.prototype.getOverflow = function() {
    return this.overflow_;
  };
  Text2.prototype.getFont = function() {
    return this.font_;
  };
  Text2.prototype.getMaxAngle = function() {
    return this.maxAngle_;
  };
  Text2.prototype.getPlacement = function() {
    return this.placement_;
  };
  Text2.prototype.getOffsetX = function() {
    return this.offsetX_;
  };
  Text2.prototype.getOffsetY = function() {
    return this.offsetY_;
  };
  Text2.prototype.getFill = function() {
    return this.fill_;
  };
  Text2.prototype.getRotateWithView = function() {
    return this.rotateWithView_;
  };
  Text2.prototype.getRotation = function() {
    return this.rotation_;
  };
  Text2.prototype.getScale = function() {
    return this.scale_;
  };
  Text2.prototype.getScaleArray = function() {
    return this.scaleArray_;
  };
  Text2.prototype.getStroke = function() {
    return this.stroke_;
  };
  Text2.prototype.getText = function() {
    return this.text_;
  };
  Text2.prototype.getTextAlign = function() {
    return this.textAlign_;
  };
  Text2.prototype.getTextBaseline = function() {
    return this.textBaseline_;
  };
  Text2.prototype.getBackgroundFill = function() {
    return this.backgroundFill_;
  };
  Text2.prototype.getBackgroundStroke = function() {
    return this.backgroundStroke_;
  };
  Text2.prototype.getPadding = function() {
    return this.padding_;
  };
  Text2.prototype.setOverflow = function(overflow) {
    this.overflow_ = overflow;
  };
  Text2.prototype.setFont = function(font) {
    this.font_ = font;
  };
  Text2.prototype.setMaxAngle = function(maxAngle) {
    this.maxAngle_ = maxAngle;
  };
  Text2.prototype.setOffsetX = function(offsetX) {
    this.offsetX_ = offsetX;
  };
  Text2.prototype.setOffsetY = function(offsetY) {
    this.offsetY_ = offsetY;
  };
  Text2.prototype.setPlacement = function(placement) {
    this.placement_ = placement;
  };
  Text2.prototype.setRotateWithView = function(rotateWithView) {
    this.rotateWithView_ = rotateWithView;
  };
  Text2.prototype.setFill = function(fill) {
    this.fill_ = fill;
  };
  Text2.prototype.setRotation = function(rotation) {
    this.rotation_ = rotation;
  };
  Text2.prototype.setScale = function(scale4) {
    this.scale_ = scale4;
    this.scaleArray_ = toSize(scale4 !== void 0 ? scale4 : 1);
  };
  Text2.prototype.setStroke = function(stroke) {
    this.stroke_ = stroke;
  };
  Text2.prototype.setText = function(text) {
    this.text_ = text;
  };
  Text2.prototype.setTextAlign = function(textAlign) {
    this.textAlign_ = textAlign;
  };
  Text2.prototype.setTextBaseline = function(textBaseline) {
    this.textBaseline_ = textBaseline;
  };
  Text2.prototype.setBackgroundFill = function(fill) {
    this.backgroundFill_ = fill;
  };
  Text2.prototype.setBackgroundStroke = function(stroke) {
    this.backgroundStroke_ = stroke;
  };
  Text2.prototype.setPadding = function(padding) {
    this.padding_ = padding;
  };
  return Text2;
}();
var Text_default = Text;

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
var BaseLayer = function(_super) {
  __extends18(BaseLayer2, _super);
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

// ../node_modules/ol/source/State.js
var State_default = {
  UNDEFINED: "undefined",
  LOADING: "loading",
  READY: "ready",
  ERROR: "error"
};

// ../node_modules/ol/layer/Layer.js
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
var Layer = function(_super) {
  __extends19(Layer2, _super);
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

// ../node_modules/ol/layer/BaseVector.js
var import_rbush = __toESM(require_rbush_min(), 1);
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
var Property3 = {
  RENDER_ORDER: "renderOrder"
};
var BaseVectorLayer = function(_super) {
  __extends20(BaseVectorLayer2, _super);
  function BaseVectorLayer2(opt_options) {
    var _this = this;
    var options = opt_options ? opt_options : {};
    var baseOptions = assign({}, options);
    delete baseOptions.style;
    delete baseOptions.renderBuffer;
    delete baseOptions.updateWhileAnimating;
    delete baseOptions.updateWhileInteracting;
    _this = _super.call(this, baseOptions) || this;
    _this.declutter_ = options.declutter !== void 0 ? options.declutter : false;
    _this.renderBuffer_ = options.renderBuffer !== void 0 ? options.renderBuffer : 100;
    _this.style_ = null;
    _this.styleFunction_ = void 0;
    _this.setStyle(options.style);
    _this.updateWhileAnimating_ = options.updateWhileAnimating !== void 0 ? options.updateWhileAnimating : false;
    _this.updateWhileInteracting_ = options.updateWhileInteracting !== void 0 ? options.updateWhileInteracting : false;
    return _this;
  }
  BaseVectorLayer2.prototype.getDeclutter = function() {
    return this.declutter_;
  };
  BaseVectorLayer2.prototype.getFeatures = function(pixel) {
    return _super.prototype.getFeatures.call(this, pixel);
  };
  BaseVectorLayer2.prototype.getRenderBuffer = function() {
    return this.renderBuffer_;
  };
  BaseVectorLayer2.prototype.getRenderOrder = function() {
    return this.get(Property3.RENDER_ORDER);
  };
  BaseVectorLayer2.prototype.getStyle = function() {
    return this.style_;
  };
  BaseVectorLayer2.prototype.getStyleFunction = function() {
    return this.styleFunction_;
  };
  BaseVectorLayer2.prototype.getUpdateWhileAnimating = function() {
    return this.updateWhileAnimating_;
  };
  BaseVectorLayer2.prototype.getUpdateWhileInteracting = function() {
    return this.updateWhileInteracting_;
  };
  BaseVectorLayer2.prototype.renderDeclutter = function(frameState) {
    if (!frameState.declutterTree) {
      frameState.declutterTree = new import_rbush.default(9);
    }
    this.getRenderer().renderDeclutter(frameState);
  };
  BaseVectorLayer2.prototype.setRenderOrder = function(renderOrder) {
    this.set(Property3.RENDER_ORDER, renderOrder);
  };
  BaseVectorLayer2.prototype.setStyle = function(opt_style) {
    this.style_ = opt_style !== void 0 ? opt_style : createDefaultStyle;
    this.styleFunction_ = opt_style === null ? void 0 : toFunction(this.style_);
    this.changed();
  };
  return BaseVectorLayer2;
}(Layer_default);
var BaseVector_default = BaseVectorLayer;

// ../node_modules/ol/render/canvas/Instruction.js
var Instruction = {
  BEGIN_GEOMETRY: 0,
  BEGIN_PATH: 1,
  CIRCLE: 2,
  CLOSE_PATH: 3,
  CUSTOM: 4,
  DRAW_CHARS: 5,
  DRAW_IMAGE: 6,
  END_GEOMETRY: 7,
  FILL: 8,
  MOVE_TO_LINE_TO: 9,
  SET_FILL_STYLE: 10,
  SET_STROKE_STYLE: 11,
  STROKE: 12
};
var fillInstruction = [Instruction.FILL];
var strokeInstruction = [Instruction.STROKE];
var beginPathInstruction = [Instruction.BEGIN_PATH];
var closePathInstruction = [Instruction.CLOSE_PATH];
var Instruction_default = Instruction;

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

// ../node_modules/ol/render/canvas/Builder.js
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
var CanvasBuilder = function(_super) {
  __extends21(CanvasBuilder2, _super);
  function CanvasBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
    var _this = _super.call(this) || this;
    _this.tolerance = tolerance;
    _this.maxExtent = maxExtent;
    _this.pixelRatio = pixelRatio;
    _this.maxLineWidth = 0;
    _this.resolution = resolution;
    _this.beginGeometryInstruction1_ = null;
    _this.beginGeometryInstruction2_ = null;
    _this.bufferedMaxExtent_ = null;
    _this.instructions = [];
    _this.coordinates = [];
    _this.tmpCoordinate_ = [];
    _this.hitDetectionInstructions = [];
    _this.state = {};
    return _this;
  }
  CanvasBuilder2.prototype.applyPixelRatio = function(dashArray) {
    var pixelRatio = this.pixelRatio;
    return pixelRatio == 1 ? dashArray : dashArray.map(function(dash) {
      return dash * pixelRatio;
    });
  };
  CanvasBuilder2.prototype.appendFlatPointCoordinates = function(flatCoordinates, stride) {
    var extent = this.getBufferedMaxExtent();
    var tmpCoord = this.tmpCoordinate_;
    var coordinates2 = this.coordinates;
    var myEnd = coordinates2.length;
    for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      tmpCoord[0] = flatCoordinates[i];
      tmpCoord[1] = flatCoordinates[i + 1];
      if (containsCoordinate(extent, tmpCoord)) {
        coordinates2[myEnd++] = tmpCoord[0];
        coordinates2[myEnd++] = tmpCoord[1];
      }
    }
    return myEnd;
  };
  CanvasBuilder2.prototype.appendFlatLineCoordinates = function(flatCoordinates, offset2, end, stride, closed, skipFirst) {
    var coordinates2 = this.coordinates;
    var myEnd = coordinates2.length;
    var extent = this.getBufferedMaxExtent();
    if (skipFirst) {
      offset2 += stride;
    }
    var lastXCoord = flatCoordinates[offset2];
    var lastYCoord = flatCoordinates[offset2 + 1];
    var nextCoord = this.tmpCoordinate_;
    var skipped = true;
    var i, lastRel, nextRel;
    for (i = offset2 + stride; i < end; i += stride) {
      nextCoord[0] = flatCoordinates[i];
      nextCoord[1] = flatCoordinates[i + 1];
      nextRel = coordinateRelationship(extent, nextCoord);
      if (nextRel !== lastRel) {
        if (skipped) {
          coordinates2[myEnd++] = lastXCoord;
          coordinates2[myEnd++] = lastYCoord;
          skipped = false;
        }
        coordinates2[myEnd++] = nextCoord[0];
        coordinates2[myEnd++] = nextCoord[1];
      } else if (nextRel === Relationship_default.INTERSECTING) {
        coordinates2[myEnd++] = nextCoord[0];
        coordinates2[myEnd++] = nextCoord[1];
        skipped = false;
      } else {
        skipped = true;
      }
      lastXCoord = nextCoord[0];
      lastYCoord = nextCoord[1];
      lastRel = nextRel;
    }
    if (closed && skipped || i === offset2 + stride) {
      coordinates2[myEnd++] = lastXCoord;
      coordinates2[myEnd++] = lastYCoord;
    }
    return myEnd;
  };
  CanvasBuilder2.prototype.drawCustomCoordinates_ = function(flatCoordinates, offset2, ends, stride, builderEnds) {
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      var builderEnd = this.appendFlatLineCoordinates(flatCoordinates, offset2, end, stride, false, false);
      builderEnds.push(builderEnd);
      offset2 = end;
    }
    return offset2;
  };
  CanvasBuilder2.prototype.drawCustom = function(geometry, feature, renderer, hitDetectionRenderer) {
    this.beginGeometry(geometry, feature);
    var type = geometry.getType();
    var stride = geometry.getStride();
    var builderBegin = this.coordinates.length;
    var flatCoordinates, builderEnd, builderEnds, builderEndss;
    var offset2;
    switch (type) {
      case GeometryType_default.MULTI_POLYGON:
        flatCoordinates = geometry.getOrientedFlatCoordinates();
        builderEndss = [];
        var endss = geometry.getEndss();
        offset2 = 0;
        for (var i = 0, ii = endss.length; i < ii; ++i) {
          var myEnds = [];
          offset2 = this.drawCustomCoordinates_(flatCoordinates, offset2, endss[i], stride, myEnds);
          builderEndss.push(myEnds);
        }
        this.instructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEndss,
          geometry,
          renderer,
          inflateMultiCoordinatesArray
        ]);
        this.hitDetectionInstructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEndss,
          geometry,
          hitDetectionRenderer || renderer,
          inflateMultiCoordinatesArray
        ]);
        break;
      case GeometryType_default.POLYGON:
      case GeometryType_default.MULTI_LINE_STRING:
        builderEnds = [];
        flatCoordinates = type == GeometryType_default.POLYGON ? geometry.getOrientedFlatCoordinates() : geometry.getFlatCoordinates();
        offset2 = this.drawCustomCoordinates_(flatCoordinates, 0, geometry.getEnds(), stride, builderEnds);
        this.instructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEnds,
          geometry,
          renderer,
          inflateCoordinatesArray
        ]);
        this.hitDetectionInstructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEnds,
          geometry,
          hitDetectionRenderer || renderer,
          inflateCoordinatesArray
        ]);
        break;
      case GeometryType_default.LINE_STRING:
      case GeometryType_default.CIRCLE:
        flatCoordinates = geometry.getFlatCoordinates();
        builderEnd = this.appendFlatLineCoordinates(flatCoordinates, 0, flatCoordinates.length, stride, false, false);
        this.instructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEnd,
          geometry,
          renderer,
          inflateCoordinates
        ]);
        this.hitDetectionInstructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEnd,
          geometry,
          hitDetectionRenderer || renderer,
          inflateCoordinates
        ]);
        break;
      case GeometryType_default.MULTI_POINT:
        flatCoordinates = geometry.getFlatCoordinates();
        builderEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
        if (builderEnd > builderBegin) {
          this.instructions.push([
            Instruction_default.CUSTOM,
            builderBegin,
            builderEnd,
            geometry,
            renderer,
            inflateCoordinates
          ]);
          this.hitDetectionInstructions.push([
            Instruction_default.CUSTOM,
            builderBegin,
            builderEnd,
            geometry,
            hitDetectionRenderer || renderer,
            inflateCoordinates
          ]);
        }
        break;
      case GeometryType_default.POINT:
        flatCoordinates = geometry.getFlatCoordinates();
        this.coordinates.push(flatCoordinates[0], flatCoordinates[1]);
        builderEnd = this.coordinates.length;
        this.instructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEnd,
          geometry,
          renderer
        ]);
        this.hitDetectionInstructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEnd,
          geometry,
          hitDetectionRenderer || renderer
        ]);
        break;
      default:
    }
    this.endGeometry(feature);
  };
  CanvasBuilder2.prototype.beginGeometry = function(geometry, feature) {
    this.beginGeometryInstruction1_ = [
      Instruction_default.BEGIN_GEOMETRY,
      feature,
      0,
      geometry
    ];
    this.instructions.push(this.beginGeometryInstruction1_);
    this.beginGeometryInstruction2_ = [
      Instruction_default.BEGIN_GEOMETRY,
      feature,
      0,
      geometry
    ];
    this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
  };
  CanvasBuilder2.prototype.finish = function() {
    return {
      instructions: this.instructions,
      hitDetectionInstructions: this.hitDetectionInstructions,
      coordinates: this.coordinates
    };
  };
  CanvasBuilder2.prototype.reverseHitDetectionInstructions = function() {
    var hitDetectionInstructions = this.hitDetectionInstructions;
    hitDetectionInstructions.reverse();
    var i;
    var n = hitDetectionInstructions.length;
    var instruction;
    var type;
    var begin = -1;
    for (i = 0; i < n; ++i) {
      instruction = hitDetectionInstructions[i];
      type = instruction[0];
      if (type == Instruction_default.END_GEOMETRY) {
        begin = i;
      } else if (type == Instruction_default.BEGIN_GEOMETRY) {
        instruction[2] = i;
        reverseSubArray(this.hitDetectionInstructions, begin, i);
        begin = -1;
      }
    }
  };
  CanvasBuilder2.prototype.setFillStrokeStyle = function(fillStyle, strokeStyle) {
    var state = this.state;
    if (fillStyle) {
      var fillStyleColor = fillStyle.getColor();
      state.fillStyle = asColorLike(fillStyleColor ? fillStyleColor : defaultFillStyle);
    } else {
      state.fillStyle = void 0;
    }
    if (strokeStyle) {
      var strokeStyleColor = strokeStyle.getColor();
      state.strokeStyle = asColorLike(strokeStyleColor ? strokeStyleColor : defaultStrokeStyle);
      var strokeStyleLineCap = strokeStyle.getLineCap();
      state.lineCap = strokeStyleLineCap !== void 0 ? strokeStyleLineCap : defaultLineCap;
      var strokeStyleLineDash = strokeStyle.getLineDash();
      state.lineDash = strokeStyleLineDash ? strokeStyleLineDash.slice() : defaultLineDash;
      var strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
      state.lineDashOffset = strokeStyleLineDashOffset ? strokeStyleLineDashOffset : defaultLineDashOffset;
      var strokeStyleLineJoin = strokeStyle.getLineJoin();
      state.lineJoin = strokeStyleLineJoin !== void 0 ? strokeStyleLineJoin : defaultLineJoin;
      var strokeStyleWidth = strokeStyle.getWidth();
      state.lineWidth = strokeStyleWidth !== void 0 ? strokeStyleWidth : defaultLineWidth;
      var strokeStyleMiterLimit = strokeStyle.getMiterLimit();
      state.miterLimit = strokeStyleMiterLimit !== void 0 ? strokeStyleMiterLimit : defaultMiterLimit;
      if (state.lineWidth > this.maxLineWidth) {
        this.maxLineWidth = state.lineWidth;
        this.bufferedMaxExtent_ = null;
      }
    } else {
      state.strokeStyle = void 0;
      state.lineCap = void 0;
      state.lineDash = null;
      state.lineDashOffset = void 0;
      state.lineJoin = void 0;
      state.lineWidth = void 0;
      state.miterLimit = void 0;
    }
  };
  CanvasBuilder2.prototype.createFill = function(state) {
    var fillStyle = state.fillStyle;
    var fillInstruction2 = [Instruction_default.SET_FILL_STYLE, fillStyle];
    if (typeof fillStyle !== "string") {
      fillInstruction2.push(true);
    }
    return fillInstruction2;
  };
  CanvasBuilder2.prototype.applyStroke = function(state) {
    this.instructions.push(this.createStroke(state));
  };
  CanvasBuilder2.prototype.createStroke = function(state) {
    return [
      Instruction_default.SET_STROKE_STYLE,
      state.strokeStyle,
      state.lineWidth * this.pixelRatio,
      state.lineCap,
      state.lineJoin,
      state.miterLimit,
      this.applyPixelRatio(state.lineDash),
      state.lineDashOffset * this.pixelRatio
    ];
  };
  CanvasBuilder2.prototype.updateFillStyle = function(state, createFill) {
    var fillStyle = state.fillStyle;
    if (typeof fillStyle !== "string" || state.currentFillStyle != fillStyle) {
      if (fillStyle !== void 0) {
        this.instructions.push(createFill.call(this, state));
      }
      state.currentFillStyle = fillStyle;
    }
  };
  CanvasBuilder2.prototype.updateStrokeStyle = function(state, applyStroke) {
    var strokeStyle = state.strokeStyle;
    var lineCap = state.lineCap;
    var lineDash = state.lineDash;
    var lineDashOffset = state.lineDashOffset;
    var lineJoin = state.lineJoin;
    var lineWidth = state.lineWidth;
    var miterLimit = state.miterLimit;
    if (state.currentStrokeStyle != strokeStyle || state.currentLineCap != lineCap || lineDash != state.currentLineDash && !equals(state.currentLineDash, lineDash) || state.currentLineDashOffset != lineDashOffset || state.currentLineJoin != lineJoin || state.currentLineWidth != lineWidth || state.currentMiterLimit != miterLimit) {
      if (strokeStyle !== void 0) {
        applyStroke.call(this, state);
      }
      state.currentStrokeStyle = strokeStyle;
      state.currentLineCap = lineCap;
      state.currentLineDash = lineDash;
      state.currentLineDashOffset = lineDashOffset;
      state.currentLineJoin = lineJoin;
      state.currentLineWidth = lineWidth;
      state.currentMiterLimit = miterLimit;
    }
  };
  CanvasBuilder2.prototype.endGeometry = function(feature) {
    this.beginGeometryInstruction1_[2] = this.instructions.length;
    this.beginGeometryInstruction1_ = null;
    this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length;
    this.beginGeometryInstruction2_ = null;
    var endGeometryInstruction = [Instruction_default.END_GEOMETRY, feature];
    this.instructions.push(endGeometryInstruction);
    this.hitDetectionInstructions.push(endGeometryInstruction);
  };
  CanvasBuilder2.prototype.getBufferedMaxExtent = function() {
    if (!this.bufferedMaxExtent_) {
      this.bufferedMaxExtent_ = clone(this.maxExtent);
      if (this.maxLineWidth > 0) {
        var width = this.resolution * (this.maxLineWidth + 1) / 2;
        buffer(this.bufferedMaxExtent_, width, this.bufferedMaxExtent_);
      }
    }
    return this.bufferedMaxExtent_;
  };
  return CanvasBuilder2;
}(VectorContext_default);
var Builder_default = CanvasBuilder;

// ../node_modules/ol/render/canvas/ImageBuilder.js
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
var CanvasImageBuilder = function(_super) {
  __extends22(CanvasImageBuilder2, _super);
  function CanvasImageBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
    var _this = _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
    _this.hitDetectionImage_ = null;
    _this.image_ = null;
    _this.imagePixelRatio_ = void 0;
    _this.anchorX_ = void 0;
    _this.anchorY_ = void 0;
    _this.height_ = void 0;
    _this.opacity_ = void 0;
    _this.originX_ = void 0;
    _this.originY_ = void 0;
    _this.rotateWithView_ = void 0;
    _this.rotation_ = void 0;
    _this.scale_ = void 0;
    _this.width_ = void 0;
    _this.declutterImageWithText_ = void 0;
    return _this;
  }
  CanvasImageBuilder2.prototype.drawPoint = function(pointGeometry, feature) {
    if (!this.image_) {
      return;
    }
    this.beginGeometry(pointGeometry, feature);
    var flatCoordinates = pointGeometry.getFlatCoordinates();
    var stride = pointGeometry.getStride();
    var myBegin = this.coordinates.length;
    var myEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
    this.instructions.push([
      Instruction_default.DRAW_IMAGE,
      myBegin,
      myEnd,
      this.image_,
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      [
        this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
        this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterImageWithText_
    ]);
    this.hitDetectionInstructions.push([
      Instruction_default.DRAW_IMAGE,
      myBegin,
      myEnd,
      this.hitDetectionImage_,
      this.anchorX_,
      this.anchorY_,
      this.height_,
      this.opacity_,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.width_,
      this.declutterImageWithText_
    ]);
    this.endGeometry(feature);
  };
  CanvasImageBuilder2.prototype.drawMultiPoint = function(multiPointGeometry, feature) {
    if (!this.image_) {
      return;
    }
    this.beginGeometry(multiPointGeometry, feature);
    var flatCoordinates = multiPointGeometry.getFlatCoordinates();
    var stride = multiPointGeometry.getStride();
    var myBegin = this.coordinates.length;
    var myEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
    this.instructions.push([
      Instruction_default.DRAW_IMAGE,
      myBegin,
      myEnd,
      this.image_,
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      [
        this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
        this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterImageWithText_
    ]);
    this.hitDetectionInstructions.push([
      Instruction_default.DRAW_IMAGE,
      myBegin,
      myEnd,
      this.hitDetectionImage_,
      this.anchorX_,
      this.anchorY_,
      this.height_,
      this.opacity_,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.width_,
      this.declutterImageWithText_
    ]);
    this.endGeometry(feature);
  };
  CanvasImageBuilder2.prototype.finish = function() {
    this.reverseHitDetectionInstructions();
    this.anchorX_ = void 0;
    this.anchorY_ = void 0;
    this.hitDetectionImage_ = null;
    this.image_ = null;
    this.imagePixelRatio_ = void 0;
    this.height_ = void 0;
    this.scale_ = void 0;
    this.opacity_ = void 0;
    this.originX_ = void 0;
    this.originY_ = void 0;
    this.rotateWithView_ = void 0;
    this.rotation_ = void 0;
    this.width_ = void 0;
    return _super.prototype.finish.call(this);
  };
  CanvasImageBuilder2.prototype.setImageStyle = function(imageStyle, opt_sharedData) {
    var anchor = imageStyle.getAnchor();
    var size = imageStyle.getSize();
    var hitDetectionImage = imageStyle.getHitDetectionImage();
    var image = imageStyle.getImage(this.pixelRatio);
    var origin = imageStyle.getOrigin();
    this.imagePixelRatio_ = imageStyle.getPixelRatio(this.pixelRatio);
    this.anchorX_ = anchor[0];
    this.anchorY_ = anchor[1];
    this.hitDetectionImage_ = hitDetectionImage;
    this.image_ = image;
    this.height_ = size[1];
    this.opacity_ = imageStyle.getOpacity();
    this.originX_ = origin[0] * this.imagePixelRatio_;
    this.originY_ = origin[1] * this.imagePixelRatio_;
    this.rotateWithView_ = imageStyle.getRotateWithView();
    this.rotation_ = imageStyle.getRotation();
    this.scale_ = imageStyle.getScaleArray();
    this.width_ = size[0];
    this.declutterImageWithText_ = opt_sharedData;
  };
  return CanvasImageBuilder2;
}(Builder_default);
var ImageBuilder_default = CanvasImageBuilder;

// ../node_modules/ol/render/canvas/LineStringBuilder.js
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
var CanvasLineStringBuilder = function(_super) {
  __extends23(CanvasLineStringBuilder2, _super);
  function CanvasLineStringBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
    return _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
  }
  CanvasLineStringBuilder2.prototype.drawFlatCoordinates_ = function(flatCoordinates, offset2, end, stride) {
    var myBegin = this.coordinates.length;
    var myEnd = this.appendFlatLineCoordinates(flatCoordinates, offset2, end, stride, false, false);
    var moveToLineToInstruction = [
      Instruction_default.MOVE_TO_LINE_TO,
      myBegin,
      myEnd
    ];
    this.instructions.push(moveToLineToInstruction);
    this.hitDetectionInstructions.push(moveToLineToInstruction);
    return end;
  };
  CanvasLineStringBuilder2.prototype.drawLineString = function(lineStringGeometry, feature) {
    var state = this.state;
    var strokeStyle = state.strokeStyle;
    var lineWidth = state.lineWidth;
    if (strokeStyle === void 0 || lineWidth === void 0) {
      return;
    }
    this.updateStrokeStyle(state, this.applyStroke);
    this.beginGeometry(lineStringGeometry, feature);
    this.hitDetectionInstructions.push([
      Instruction_default.SET_STROKE_STYLE,
      state.strokeStyle,
      state.lineWidth,
      state.lineCap,
      state.lineJoin,
      state.miterLimit,
      defaultLineDash,
      defaultLineDashOffset
    ], beginPathInstruction);
    var flatCoordinates = lineStringGeometry.getFlatCoordinates();
    var stride = lineStringGeometry.getStride();
    this.drawFlatCoordinates_(flatCoordinates, 0, flatCoordinates.length, stride);
    this.hitDetectionInstructions.push(strokeInstruction);
    this.endGeometry(feature);
  };
  CanvasLineStringBuilder2.prototype.drawMultiLineString = function(multiLineStringGeometry, feature) {
    var state = this.state;
    var strokeStyle = state.strokeStyle;
    var lineWidth = state.lineWidth;
    if (strokeStyle === void 0 || lineWidth === void 0) {
      return;
    }
    this.updateStrokeStyle(state, this.applyStroke);
    this.beginGeometry(multiLineStringGeometry, feature);
    this.hitDetectionInstructions.push([
      Instruction_default.SET_STROKE_STYLE,
      state.strokeStyle,
      state.lineWidth,
      state.lineCap,
      state.lineJoin,
      state.miterLimit,
      state.lineDash,
      state.lineDashOffset
    ], beginPathInstruction);
    var ends = multiLineStringGeometry.getEnds();
    var flatCoordinates = multiLineStringGeometry.getFlatCoordinates();
    var stride = multiLineStringGeometry.getStride();
    var offset2 = 0;
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      offset2 = this.drawFlatCoordinates_(flatCoordinates, offset2, ends[i], stride);
    }
    this.hitDetectionInstructions.push(strokeInstruction);
    this.endGeometry(feature);
  };
  CanvasLineStringBuilder2.prototype.finish = function() {
    var state = this.state;
    if (state.lastStroke != void 0 && state.lastStroke != this.coordinates.length) {
      this.instructions.push(strokeInstruction);
    }
    this.reverseHitDetectionInstructions();
    this.state = null;
    return _super.prototype.finish.call(this);
  };
  CanvasLineStringBuilder2.prototype.applyStroke = function(state) {
    if (state.lastStroke != void 0 && state.lastStroke != this.coordinates.length) {
      this.instructions.push(strokeInstruction);
      state.lastStroke = this.coordinates.length;
    }
    state.lastStroke = 0;
    _super.prototype.applyStroke.call(this, state);
    this.instructions.push(beginPathInstruction);
  };
  return CanvasLineStringBuilder2;
}(Builder_default);
var LineStringBuilder_default = CanvasLineStringBuilder;

// ../node_modules/ol/render/canvas/PolygonBuilder.js
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
var CanvasPolygonBuilder = function(_super) {
  __extends24(CanvasPolygonBuilder2, _super);
  function CanvasPolygonBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
    return _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
  }
  CanvasPolygonBuilder2.prototype.drawFlatCoordinatess_ = function(flatCoordinates, offset2, ends, stride) {
    var state = this.state;
    var fill = state.fillStyle !== void 0;
    var stroke = state.strokeStyle !== void 0;
    var numEnds = ends.length;
    this.instructions.push(beginPathInstruction);
    this.hitDetectionInstructions.push(beginPathInstruction);
    for (var i = 0; i < numEnds; ++i) {
      var end = ends[i];
      var myBegin = this.coordinates.length;
      var myEnd = this.appendFlatLineCoordinates(flatCoordinates, offset2, end, stride, true, !stroke);
      var moveToLineToInstruction = [
        Instruction_default.MOVE_TO_LINE_TO,
        myBegin,
        myEnd
      ];
      this.instructions.push(moveToLineToInstruction);
      this.hitDetectionInstructions.push(moveToLineToInstruction);
      if (stroke) {
        this.instructions.push(closePathInstruction);
        this.hitDetectionInstructions.push(closePathInstruction);
      }
      offset2 = end;
    }
    if (fill) {
      this.instructions.push(fillInstruction);
      this.hitDetectionInstructions.push(fillInstruction);
    }
    if (stroke) {
      this.instructions.push(strokeInstruction);
      this.hitDetectionInstructions.push(strokeInstruction);
    }
    return offset2;
  };
  CanvasPolygonBuilder2.prototype.drawCircle = function(circleGeometry, feature) {
    var state = this.state;
    var fillStyle = state.fillStyle;
    var strokeStyle = state.strokeStyle;
    if (fillStyle === void 0 && strokeStyle === void 0) {
      return;
    }
    this.setFillStrokeStyles_();
    this.beginGeometry(circleGeometry, feature);
    if (state.fillStyle !== void 0) {
      this.hitDetectionInstructions.push([
        Instruction_default.SET_FILL_STYLE,
        defaultFillStyle
      ]);
    }
    if (state.strokeStyle !== void 0) {
      this.hitDetectionInstructions.push([
        Instruction_default.SET_STROKE_STYLE,
        state.strokeStyle,
        state.lineWidth,
        state.lineCap,
        state.lineJoin,
        state.miterLimit,
        state.lineDash,
        state.lineDashOffset
      ]);
    }
    var flatCoordinates = circleGeometry.getFlatCoordinates();
    var stride = circleGeometry.getStride();
    var myBegin = this.coordinates.length;
    this.appendFlatLineCoordinates(flatCoordinates, 0, flatCoordinates.length, stride, false, false);
    var circleInstruction = [Instruction_default.CIRCLE, myBegin];
    this.instructions.push(beginPathInstruction, circleInstruction);
    this.hitDetectionInstructions.push(beginPathInstruction, circleInstruction);
    if (state.fillStyle !== void 0) {
      this.instructions.push(fillInstruction);
      this.hitDetectionInstructions.push(fillInstruction);
    }
    if (state.strokeStyle !== void 0) {
      this.instructions.push(strokeInstruction);
      this.hitDetectionInstructions.push(strokeInstruction);
    }
    this.endGeometry(feature);
  };
  CanvasPolygonBuilder2.prototype.drawPolygon = function(polygonGeometry, feature) {
    var state = this.state;
    var fillStyle = state.fillStyle;
    var strokeStyle = state.strokeStyle;
    if (fillStyle === void 0 && strokeStyle === void 0) {
      return;
    }
    this.setFillStrokeStyles_();
    this.beginGeometry(polygonGeometry, feature);
    if (state.fillStyle !== void 0) {
      this.hitDetectionInstructions.push([
        Instruction_default.SET_FILL_STYLE,
        defaultFillStyle
      ]);
    }
    if (state.strokeStyle !== void 0) {
      this.hitDetectionInstructions.push([
        Instruction_default.SET_STROKE_STYLE,
        state.strokeStyle,
        state.lineWidth,
        state.lineCap,
        state.lineJoin,
        state.miterLimit,
        state.lineDash,
        state.lineDashOffset
      ]);
    }
    var ends = polygonGeometry.getEnds();
    var flatCoordinates = polygonGeometry.getOrientedFlatCoordinates();
    var stride = polygonGeometry.getStride();
    this.drawFlatCoordinatess_(flatCoordinates, 0, ends, stride);
    this.endGeometry(feature);
  };
  CanvasPolygonBuilder2.prototype.drawMultiPolygon = function(multiPolygonGeometry, feature) {
    var state = this.state;
    var fillStyle = state.fillStyle;
    var strokeStyle = state.strokeStyle;
    if (fillStyle === void 0 && strokeStyle === void 0) {
      return;
    }
    this.setFillStrokeStyles_();
    this.beginGeometry(multiPolygonGeometry, feature);
    if (state.fillStyle !== void 0) {
      this.hitDetectionInstructions.push([
        Instruction_default.SET_FILL_STYLE,
        defaultFillStyle
      ]);
    }
    if (state.strokeStyle !== void 0) {
      this.hitDetectionInstructions.push([
        Instruction_default.SET_STROKE_STYLE,
        state.strokeStyle,
        state.lineWidth,
        state.lineCap,
        state.lineJoin,
        state.miterLimit,
        state.lineDash,
        state.lineDashOffset
      ]);
    }
    var endss = multiPolygonGeometry.getEndss();
    var flatCoordinates = multiPolygonGeometry.getOrientedFlatCoordinates();
    var stride = multiPolygonGeometry.getStride();
    var offset2 = 0;
    for (var i = 0, ii = endss.length; i < ii; ++i) {
      offset2 = this.drawFlatCoordinatess_(flatCoordinates, offset2, endss[i], stride);
    }
    this.endGeometry(feature);
  };
  CanvasPolygonBuilder2.prototype.finish = function() {
    this.reverseHitDetectionInstructions();
    this.state = null;
    var tolerance = this.tolerance;
    if (tolerance !== 0) {
      var coordinates2 = this.coordinates;
      for (var i = 0, ii = coordinates2.length; i < ii; ++i) {
        coordinates2[i] = snap(coordinates2[i], tolerance);
      }
    }
    return _super.prototype.finish.call(this);
  };
  CanvasPolygonBuilder2.prototype.setFillStrokeStyles_ = function() {
    var state = this.state;
    var fillStyle = state.fillStyle;
    if (fillStyle !== void 0) {
      this.updateFillStyle(state, this.createFill);
    }
    if (state.strokeStyle !== void 0) {
      this.updateStrokeStyle(state, this.applyStroke);
    }
  };
  return CanvasPolygonBuilder2;
}(Builder_default);
var PolygonBuilder_default = CanvasPolygonBuilder;

// ../node_modules/ol/geom/flat/straightchunk.js
function matchingChunk(maxAngle, flatCoordinates, offset2, end, stride) {
  var chunkStart = offset2;
  var chunkEnd = offset2;
  var chunkM = 0;
  var m = 0;
  var start = offset2;
  var acos, i, m12, m23, x1, y1, x12, y12, x23, y23;
  for (i = offset2; i < end; i += stride) {
    var x2 = flatCoordinates[i];
    var y2 = flatCoordinates[i + 1];
    if (x1 !== void 0) {
      x23 = x2 - x1;
      y23 = y2 - y1;
      m23 = Math.sqrt(x23 * x23 + y23 * y23);
      if (x12 !== void 0) {
        m += m12;
        acos = Math.acos((x12 * x23 + y12 * y23) / (m12 * m23));
        if (acos > maxAngle) {
          if (m > chunkM) {
            chunkM = m;
            chunkStart = start;
            chunkEnd = i;
          }
          m = 0;
          start = i - stride;
        }
      }
      m12 = m23;
      x12 = x23;
      y12 = y23;
    }
    x1 = x2;
    y1 = y2;
  }
  m += m23;
  return m > chunkM ? [start, i] : [chunkStart, chunkEnd];
}

// ../node_modules/ol/render/canvas/TextBuilder.js
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
var TEXT_ALIGN = {
  "left": 0,
  "end": 0,
  "center": 0.5,
  "right": 1,
  "start": 1,
  "top": 0,
  "middle": 0.5,
  "hanging": 0.2,
  "alphabetic": 0.8,
  "ideographic": 0.8,
  "bottom": 1
};
var CanvasTextBuilder = function(_super) {
  __extends25(CanvasTextBuilder2, _super);
  function CanvasTextBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
    var _this = _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
    _this.labels_ = null;
    _this.text_ = "";
    _this.textOffsetX_ = 0;
    _this.textOffsetY_ = 0;
    _this.textRotateWithView_ = void 0;
    _this.textRotation_ = 0;
    _this.textFillState_ = null;
    _this.fillStates = {};
    _this.textStrokeState_ = null;
    _this.strokeStates = {};
    _this.textState_ = {};
    _this.textStates = {};
    _this.textKey_ = "";
    _this.fillKey_ = "";
    _this.strokeKey_ = "";
    _this.declutterImageWithText_ = void 0;
    return _this;
  }
  CanvasTextBuilder2.prototype.finish = function() {
    var instructions = _super.prototype.finish.call(this);
    instructions.textStates = this.textStates;
    instructions.fillStates = this.fillStates;
    instructions.strokeStates = this.strokeStates;
    return instructions;
  };
  CanvasTextBuilder2.prototype.drawText = function(geometry, feature) {
    var fillState = this.textFillState_;
    var strokeState = this.textStrokeState_;
    var textState = this.textState_;
    if (this.text_ === "" || !textState || !fillState && !strokeState) {
      return;
    }
    var coordinates2 = this.coordinates;
    var begin = coordinates2.length;
    var geometryType = geometry.getType();
    var flatCoordinates = null;
    var stride = geometry.getStride();
    if (textState.placement === TextPlacement_default.LINE && (geometryType == GeometryType_default.LINE_STRING || geometryType == GeometryType_default.MULTI_LINE_STRING || geometryType == GeometryType_default.POLYGON || geometryType == GeometryType_default.MULTI_POLYGON)) {
      if (!intersects(this.getBufferedMaxExtent(), geometry.getExtent())) {
        return;
      }
      var ends = void 0;
      flatCoordinates = geometry.getFlatCoordinates();
      if (geometryType == GeometryType_default.LINE_STRING) {
        ends = [flatCoordinates.length];
      } else if (geometryType == GeometryType_default.MULTI_LINE_STRING) {
        ends = geometry.getEnds();
      } else if (geometryType == GeometryType_default.POLYGON) {
        ends = geometry.getEnds().slice(0, 1);
      } else if (geometryType == GeometryType_default.MULTI_POLYGON) {
        var endss = geometry.getEndss();
        ends = [];
        for (var i = 0, ii = endss.length; i < ii; ++i) {
          ends.push(endss[i][0]);
        }
      }
      this.beginGeometry(geometry, feature);
      var textAlign = textState.textAlign;
      var flatOffset = 0;
      var flatEnd = void 0;
      for (var o = 0, oo = ends.length; o < oo; ++o) {
        if (textAlign == void 0) {
          var range = matchingChunk(textState.maxAngle, flatCoordinates, flatOffset, ends[o], stride);
          flatOffset = range[0];
          flatEnd = range[1];
        } else {
          flatEnd = ends[o];
        }
        for (var i = flatOffset; i < flatEnd; i += stride) {
          coordinates2.push(flatCoordinates[i], flatCoordinates[i + 1]);
        }
        var end = coordinates2.length;
        flatOffset = ends[o];
        this.drawChars_(begin, end);
        begin = end;
      }
      this.endGeometry(feature);
    } else {
      var geometryWidths = textState.overflow ? null : [];
      switch (geometryType) {
        case GeometryType_default.POINT:
        case GeometryType_default.MULTI_POINT:
          flatCoordinates = geometry.getFlatCoordinates();
          break;
        case GeometryType_default.LINE_STRING:
          flatCoordinates = geometry.getFlatMidpoint();
          break;
        case GeometryType_default.CIRCLE:
          flatCoordinates = geometry.getCenter();
          break;
        case GeometryType_default.MULTI_LINE_STRING:
          flatCoordinates = geometry.getFlatMidpoints();
          stride = 2;
          break;
        case GeometryType_default.POLYGON:
          flatCoordinates = geometry.getFlatInteriorPoint();
          if (!textState.overflow) {
            geometryWidths.push(flatCoordinates[2] / this.resolution);
          }
          stride = 3;
          break;
        case GeometryType_default.MULTI_POLYGON:
          var interiorPoints = geometry.getFlatInteriorPoints();
          flatCoordinates = [];
          for (var i = 0, ii = interiorPoints.length; i < ii; i += 3) {
            if (!textState.overflow) {
              geometryWidths.push(interiorPoints[i + 2] / this.resolution);
            }
            flatCoordinates.push(interiorPoints[i], interiorPoints[i + 1]);
          }
          if (flatCoordinates.length === 0) {
            return;
          }
          stride = 2;
          break;
        default:
      }
      var end = this.appendFlatPointCoordinates(flatCoordinates, stride);
      if (end === begin) {
        return;
      }
      if (geometryWidths && (end - begin) / 2 !== flatCoordinates.length / stride) {
        var beg_1 = begin / 2;
        geometryWidths = geometryWidths.filter(function(w, i2) {
          var keep = coordinates2[(beg_1 + i2) * 2] === flatCoordinates[i2 * stride] && coordinates2[(beg_1 + i2) * 2 + 1] === flatCoordinates[i2 * stride + 1];
          if (!keep) {
            --beg_1;
          }
          return keep;
        });
      }
      this.saveTextStates_();
      if (textState.backgroundFill || textState.backgroundStroke) {
        this.setFillStrokeStyle(textState.backgroundFill, textState.backgroundStroke);
        if (textState.backgroundFill) {
          this.updateFillStyle(this.state, this.createFill);
          this.hitDetectionInstructions.push(this.createFill(this.state));
        }
        if (textState.backgroundStroke) {
          this.updateStrokeStyle(this.state, this.applyStroke);
          this.hitDetectionInstructions.push(this.createStroke(this.state));
        }
      }
      this.beginGeometry(geometry, feature);
      var padding = textState.padding;
      if (padding != defaultPadding && (textState.scale[0] < 0 || textState.scale[1] < 0)) {
        var p0 = textState.padding[0];
        var p12 = textState.padding[1];
        var p22 = textState.padding[2];
        var p32 = textState.padding[3];
        if (textState.scale[0] < 0) {
          p12 = -p12;
          p32 = -p32;
        }
        if (textState.scale[1] < 0) {
          p0 = -p0;
          p22 = -p22;
        }
        padding = [p0, p12, p22, p32];
      }
      var pixelRatio_1 = this.pixelRatio;
      this.instructions.push([
        Instruction_default.DRAW_IMAGE,
        begin,
        end,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [1, 1],
        NaN,
        this.declutterImageWithText_,
        padding == defaultPadding ? defaultPadding : padding.map(function(p) {
          return p * pixelRatio_1;
        }),
        !!textState.backgroundFill,
        !!textState.backgroundStroke,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        geometryWidths
      ]);
      var scale4 = 1 / pixelRatio_1;
      this.hitDetectionInstructions.push([
        Instruction_default.DRAW_IMAGE,
        begin,
        end,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [scale4, scale4],
        NaN,
        this.declutterImageWithText_,
        padding,
        !!textState.backgroundFill,
        !!textState.backgroundStroke,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        geometryWidths
      ]);
      this.endGeometry(feature);
    }
  };
  CanvasTextBuilder2.prototype.saveTextStates_ = function() {
    var strokeState = this.textStrokeState_;
    var textState = this.textState_;
    var fillState = this.textFillState_;
    var strokeKey = this.strokeKey_;
    if (strokeState) {
      if (!(strokeKey in this.strokeStates)) {
        this.strokeStates[strokeKey] = {
          strokeStyle: strokeState.strokeStyle,
          lineCap: strokeState.lineCap,
          lineDashOffset: strokeState.lineDashOffset,
          lineWidth: strokeState.lineWidth,
          lineJoin: strokeState.lineJoin,
          miterLimit: strokeState.miterLimit,
          lineDash: strokeState.lineDash
        };
      }
    }
    var textKey = this.textKey_;
    if (!(textKey in this.textStates)) {
      this.textStates[textKey] = {
        font: textState.font,
        textAlign: textState.textAlign || defaultTextAlign,
        textBaseline: textState.textBaseline || defaultTextBaseline,
        scale: textState.scale
      };
    }
    var fillKey = this.fillKey_;
    if (fillState) {
      if (!(fillKey in this.fillStates)) {
        this.fillStates[fillKey] = {
          fillStyle: fillState.fillStyle
        };
      }
    }
  };
  CanvasTextBuilder2.prototype.drawChars_ = function(begin, end) {
    var strokeState = this.textStrokeState_;
    var textState = this.textState_;
    var strokeKey = this.strokeKey_;
    var textKey = this.textKey_;
    var fillKey = this.fillKey_;
    this.saveTextStates_();
    var pixelRatio = this.pixelRatio;
    var baseline = TEXT_ALIGN[textState.textBaseline];
    var offsetY = this.textOffsetY_ * pixelRatio;
    var text = this.text_;
    var strokeWidth = strokeState ? strokeState.lineWidth * Math.abs(textState.scale[0]) / 2 : 0;
    this.instructions.push([
      Instruction_default.DRAW_CHARS,
      begin,
      end,
      baseline,
      textState.overflow,
      fillKey,
      textState.maxAngle,
      pixelRatio,
      offsetY,
      strokeKey,
      strokeWidth * pixelRatio,
      text,
      textKey,
      1
    ]);
    this.hitDetectionInstructions.push([
      Instruction_default.DRAW_CHARS,
      begin,
      end,
      baseline,
      textState.overflow,
      fillKey,
      textState.maxAngle,
      1,
      offsetY,
      strokeKey,
      strokeWidth,
      text,
      textKey,
      1 / pixelRatio
    ]);
  };
  CanvasTextBuilder2.prototype.setTextStyle = function(textStyle, opt_sharedData) {
    var textState, fillState, strokeState;
    if (!textStyle) {
      this.text_ = "";
    } else {
      var textFillStyle = textStyle.getFill();
      if (!textFillStyle) {
        fillState = null;
        this.textFillState_ = fillState;
      } else {
        fillState = this.textFillState_;
        if (!fillState) {
          fillState = {};
          this.textFillState_ = fillState;
        }
        fillState.fillStyle = asColorLike(textFillStyle.getColor() || defaultFillStyle);
      }
      var textStrokeStyle = textStyle.getStroke();
      if (!textStrokeStyle) {
        strokeState = null;
        this.textStrokeState_ = strokeState;
      } else {
        strokeState = this.textStrokeState_;
        if (!strokeState) {
          strokeState = {};
          this.textStrokeState_ = strokeState;
        }
        var lineDash = textStrokeStyle.getLineDash();
        var lineDashOffset = textStrokeStyle.getLineDashOffset();
        var lineWidth = textStrokeStyle.getWidth();
        var miterLimit = textStrokeStyle.getMiterLimit();
        strokeState.lineCap = textStrokeStyle.getLineCap() || defaultLineCap;
        strokeState.lineDash = lineDash ? lineDash.slice() : defaultLineDash;
        strokeState.lineDashOffset = lineDashOffset === void 0 ? defaultLineDashOffset : lineDashOffset;
        strokeState.lineJoin = textStrokeStyle.getLineJoin() || defaultLineJoin;
        strokeState.lineWidth = lineWidth === void 0 ? defaultLineWidth : lineWidth;
        strokeState.miterLimit = miterLimit === void 0 ? defaultMiterLimit : miterLimit;
        strokeState.strokeStyle = asColorLike(textStrokeStyle.getColor() || defaultStrokeStyle);
      }
      textState = this.textState_;
      var font = textStyle.getFont() || defaultFont;
      registerFont(font);
      var textScale = textStyle.getScaleArray();
      textState.overflow = textStyle.getOverflow();
      textState.font = font;
      textState.maxAngle = textStyle.getMaxAngle();
      textState.placement = textStyle.getPlacement();
      textState.textAlign = textStyle.getTextAlign();
      textState.textBaseline = textStyle.getTextBaseline() || defaultTextBaseline;
      textState.backgroundFill = textStyle.getBackgroundFill();
      textState.backgroundStroke = textStyle.getBackgroundStroke();
      textState.padding = textStyle.getPadding() || defaultPadding;
      textState.scale = textScale === void 0 ? [1, 1] : textScale;
      var textOffsetX = textStyle.getOffsetX();
      var textOffsetY = textStyle.getOffsetY();
      var textRotateWithView = textStyle.getRotateWithView();
      var textRotation = textStyle.getRotation();
      this.text_ = textStyle.getText() || "";
      this.textOffsetX_ = textOffsetX === void 0 ? 0 : textOffsetX;
      this.textOffsetY_ = textOffsetY === void 0 ? 0 : textOffsetY;
      this.textRotateWithView_ = textRotateWithView === void 0 ? false : textRotateWithView;
      this.textRotation_ = textRotation === void 0 ? 0 : textRotation;
      this.strokeKey_ = strokeState ? (typeof strokeState.strokeStyle == "string" ? strokeState.strokeStyle : getUid(strokeState.strokeStyle)) + strokeState.lineCap + strokeState.lineDashOffset + "|" + strokeState.lineWidth + strokeState.lineJoin + strokeState.miterLimit + "[" + strokeState.lineDash.join() + "]" : "";
      this.textKey_ = textState.font + textState.scale + (textState.textAlign || "?") + (textState.textBaseline || "?");
      this.fillKey_ = fillState ? typeof fillState.fillStyle == "string" ? fillState.fillStyle : "|" + getUid(fillState.fillStyle) : "";
    }
    this.declutterImageWithText_ = opt_sharedData;
  };
  return CanvasTextBuilder2;
}(Builder_default);
var TextBuilder_default = CanvasTextBuilder;

// ../node_modules/ol/render/canvas/BuilderGroup.js
var BATCH_CONSTRUCTORS = {
  "Circle": PolygonBuilder_default,
  "Default": Builder_default,
  "Image": ImageBuilder_default,
  "LineString": LineStringBuilder_default,
  "Polygon": PolygonBuilder_default,
  "Text": TextBuilder_default
};
var BuilderGroup = function() {
  function BuilderGroup2(tolerance, maxExtent, resolution, pixelRatio) {
    this.tolerance_ = tolerance;
    this.maxExtent_ = maxExtent;
    this.pixelRatio_ = pixelRatio;
    this.resolution_ = resolution;
    this.buildersByZIndex_ = {};
  }
  BuilderGroup2.prototype.finish = function() {
    var builderInstructions = {};
    for (var zKey in this.buildersByZIndex_) {
      builderInstructions[zKey] = builderInstructions[zKey] || {};
      var builders = this.buildersByZIndex_[zKey];
      for (var builderKey in builders) {
        var builderInstruction = builders[builderKey].finish();
        builderInstructions[zKey][builderKey] = builderInstruction;
      }
    }
    return builderInstructions;
  };
  BuilderGroup2.prototype.getBuilder = function(zIndex, builderType) {
    var zIndexKey = zIndex !== void 0 ? zIndex.toString() : "0";
    var replays = this.buildersByZIndex_[zIndexKey];
    if (replays === void 0) {
      replays = {};
      this.buildersByZIndex_[zIndexKey] = replays;
    }
    var replay = replays[builderType];
    if (replay === void 0) {
      var Constructor = BATCH_CONSTRUCTORS[builderType];
      replay = new Constructor(this.tolerance_, this.maxExtent_, this.resolution_, this.pixelRatio_);
      replays[builderType] = replay;
    }
    return replay;
  };
  return BuilderGroup2;
}();
var BuilderGroup_default = BuilderGroup;

// ../node_modules/ol/renderer/Layer.js
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
var LayerRenderer = function(_super) {
  __extends26(LayerRenderer2, _super);
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
var RenderEvent = function(_super) {
  __extends27(RenderEvent2, _super);
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

// ../node_modules/ol/renderer/canvas/Layer.js
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
var pixelContext = null;
function createPixelContext() {
  var canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  pixelContext = canvas.getContext("2d");
}
var CanvasLayerRenderer = function(_super) {
  __extends28(CanvasLayerRenderer2, _super);
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

// ../node_modules/ol/render/canvas/BuilderType.js
var BuilderType_default = {
  CIRCLE: "Circle",
  DEFAULT: "Default",
  IMAGE: "Image",
  LINE_STRING: "LineString",
  POLYGON: "Polygon",
  TEXT: "Text"
};

// ../node_modules/ol/geom/flat/textpath.js
function drawTextOnPath(flatCoordinates, offset2, end, stride, text, startM, maxAngle, scale4, measureAndCacheTextWidth2, font, cache2, rotation) {
  var x2 = flatCoordinates[offset2];
  var y2 = flatCoordinates[offset2 + 1];
  var x1 = 0;
  var y1 = 0;
  var segmentLength = 0;
  var segmentM = 0;
  function advance() {
    x1 = x2;
    y1 = y2;
    offset2 += stride;
    x2 = flatCoordinates[offset2];
    y2 = flatCoordinates[offset2 + 1];
    segmentM += segmentLength;
    segmentLength = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }
  do {
    advance();
  } while (offset2 < end - stride && segmentM + segmentLength < startM);
  var interpolate = segmentLength === 0 ? 0 : (startM - segmentM) / segmentLength;
  var beginX = lerp(x1, x2, interpolate);
  var beginY = lerp(y1, y2, interpolate);
  var startOffset = offset2 - stride;
  var startLength = segmentM;
  var endM = startM + scale4 * measureAndCacheTextWidth2(font, text, cache2);
  while (offset2 < end - stride && segmentM + segmentLength < endM) {
    advance();
  }
  interpolate = segmentLength === 0 ? 0 : (endM - segmentM) / segmentLength;
  var endX = lerp(x1, x2, interpolate);
  var endY = lerp(y1, y2, interpolate);
  var reverse;
  if (rotation) {
    var flat = [beginX, beginY, endX, endY];
    rotate2(flat, 0, 4, 2, rotation, flat, flat);
    reverse = flat[0] > flat[2];
  } else {
    reverse = beginX > endX;
  }
  var PI = Math.PI;
  var result = [];
  var singleSegment = startOffset + stride === offset2;
  offset2 = startOffset;
  segmentLength = 0;
  segmentM = startLength;
  x2 = flatCoordinates[offset2];
  y2 = flatCoordinates[offset2 + 1];
  var previousAngle;
  if (singleSegment) {
    advance();
    previousAngle = Math.atan2(y2 - y1, x2 - x1);
    if (reverse) {
      previousAngle += previousAngle > 0 ? -PI : PI;
    }
    var x = (endX + beginX) / 2;
    var y = (endY + beginY) / 2;
    result[0] = [x, y, (endM - startM) / 2, previousAngle, text];
    return result;
  }
  for (var i = 0, ii = text.length; i < ii; ) {
    advance();
    var angle = Math.atan2(y2 - y1, x2 - x1);
    if (reverse) {
      angle += angle > 0 ? -PI : PI;
    }
    if (previousAngle !== void 0) {
      var delta = angle - previousAngle;
      delta += delta > PI ? -2 * PI : delta < -PI ? 2 * PI : 0;
      if (Math.abs(delta) > maxAngle) {
        return null;
      }
    }
    previousAngle = angle;
    var iStart = i;
    var charLength = 0;
    for (; i < ii; ++i) {
      var index = reverse ? ii - i - 1 : i;
      var len = scale4 * measureAndCacheTextWidth2(font, text[index], cache2);
      if (offset2 + stride < end && segmentM + segmentLength < startM + charLength + len / 2) {
        break;
      }
      charLength += len;
    }
    if (i === iStart) {
      continue;
    }
    var chars = reverse ? text.substring(ii - iStart, ii - i) : text.substring(iStart, i);
    interpolate = segmentLength === 0 ? 0 : (startM + charLength / 2 - segmentM) / segmentLength;
    var x = lerp(x1, x2, interpolate);
    var y = lerp(y1, y2, interpolate);
    result.push([x, y, charLength / 2, angle, chars]);
    startM += charLength;
  }
  return result;
}

// ../node_modules/ol/render/canvas/Executor.js
var tmpExtent = createEmpty();
var p1 = [];
var p2 = [];
var p3 = [];
var p4 = [];
function getDeclutterBox(replayImageOrLabelArgs) {
  return replayImageOrLabelArgs[3].declutterBox;
}
var rtlRegEx = new RegExp("[" + String.fromCharCode(1425) + "-" + String.fromCharCode(2303) + String.fromCharCode(64285) + "-" + String.fromCharCode(65023) + String.fromCharCode(65136) + "-" + String.fromCharCode(65276) + String.fromCharCode(67584) + "-" + String.fromCharCode(69631) + String.fromCharCode(124928) + "-" + String.fromCharCode(126975) + "]");
function horizontalTextAlign(text, align) {
  if ((align === "start" || align === "end") && !rtlRegEx.test(text)) {
    align = align === "start" ? "left" : "right";
  }
  return TEXT_ALIGN[align];
}
function createTextChunks(acc, line2, i) {
  if (i > 0) {
    acc.push("\n", "");
  }
  acc.push(line2, "");
  return acc;
}
var Executor = function() {
  function Executor2(resolution, pixelRatio, overlaps, instructions) {
    this.overlaps = overlaps;
    this.pixelRatio = pixelRatio;
    this.resolution = resolution;
    this.alignFill_;
    this.instructions = instructions.instructions;
    this.coordinates = instructions.coordinates;
    this.coordinateCache_ = {};
    this.renderedTransform_ = create();
    this.hitDetectionInstructions = instructions.hitDetectionInstructions;
    this.pixelCoordinates_ = null;
    this.viewRotation_ = 0;
    this.fillStates = instructions.fillStates || {};
    this.strokeStates = instructions.strokeStates || {};
    this.textStates = instructions.textStates || {};
    this.widths_ = {};
    this.labels_ = {};
  }
  Executor2.prototype.createLabel = function(text, textKey, fillKey, strokeKey) {
    var key = text + textKey + fillKey + strokeKey;
    if (this.labels_[key]) {
      return this.labels_[key];
    }
    var strokeState = strokeKey ? this.strokeStates[strokeKey] : null;
    var fillState = fillKey ? this.fillStates[fillKey] : null;
    var textState = this.textStates[textKey];
    var pixelRatio = this.pixelRatio;
    var scale4 = [
      textState.scale[0] * pixelRatio,
      textState.scale[1] * pixelRatio
    ];
    var textIsArray = Array.isArray(text);
    var align = horizontalTextAlign(textIsArray ? text[0] : text, textState.textAlign || defaultTextAlign);
    var strokeWidth = strokeKey && strokeState.lineWidth ? strokeState.lineWidth : 0;
    var chunks = textIsArray ? text : text.split("\n").reduce(createTextChunks, []);
    var _a = getTextDimensions(textState, chunks), width = _a.width, height = _a.height, widths = _a.widths, heights = _a.heights, lineWidths = _a.lineWidths;
    var renderWidth = width + strokeWidth;
    var contextInstructions = [];
    var w = (renderWidth + 2) * scale4[0];
    var h = (height + strokeWidth) * scale4[1];
    var label = {
      width: w < 0 ? Math.floor(w) : Math.ceil(w),
      height: h < 0 ? Math.floor(h) : Math.ceil(h),
      contextInstructions
    };
    if (scale4[0] != 1 || scale4[1] != 1) {
      contextInstructions.push("scale", scale4);
    }
    if (strokeKey) {
      contextInstructions.push("strokeStyle", strokeState.strokeStyle);
      contextInstructions.push("lineWidth", strokeWidth);
      contextInstructions.push("lineCap", strokeState.lineCap);
      contextInstructions.push("lineJoin", strokeState.lineJoin);
      contextInstructions.push("miterLimit", strokeState.miterLimit);
      var Context = WORKER_OFFSCREEN_CANVAS ? OffscreenCanvasRenderingContext2D : CanvasRenderingContext2D;
      if (Context.prototype.setLineDash) {
        contextInstructions.push("setLineDash", [strokeState.lineDash]);
        contextInstructions.push("lineDashOffset", strokeState.lineDashOffset);
      }
    }
    if (fillKey) {
      contextInstructions.push("fillStyle", fillState.fillStyle);
    }
    contextInstructions.push("textBaseline", "middle");
    contextInstructions.push("textAlign", "center");
    var leftRight = 0.5 - align;
    var x = align * renderWidth + leftRight * strokeWidth;
    var strokeInstructions = [];
    var fillInstructions = [];
    var lineHeight = 0;
    var lineOffset = 0;
    var widthHeightIndex = 0;
    var lineWidthIndex = 0;
    var previousFont;
    for (var i = 0, ii = chunks.length; i < ii; i += 2) {
      var text_1 = chunks[i];
      if (text_1 === "\n") {
        lineOffset += lineHeight;
        lineHeight = 0;
        x = align * renderWidth + leftRight * strokeWidth;
        ++lineWidthIndex;
        continue;
      }
      var font = chunks[i + 1] || textState.font;
      if (font !== previousFont) {
        if (strokeKey) {
          strokeInstructions.push("font", font);
        }
        if (fillKey) {
          fillInstructions.push("font", font);
        }
        previousFont = font;
      }
      lineHeight = Math.max(lineHeight, heights[widthHeightIndex]);
      var fillStrokeArgs = [
        text_1,
        x + leftRight * widths[widthHeightIndex] + align * (widths[widthHeightIndex] - lineWidths[lineWidthIndex]),
        0.5 * (strokeWidth + lineHeight) + lineOffset
      ];
      x += widths[widthHeightIndex];
      if (strokeKey) {
        strokeInstructions.push("strokeText", fillStrokeArgs);
      }
      if (fillKey) {
        fillInstructions.push("fillText", fillStrokeArgs);
      }
      ++widthHeightIndex;
    }
    Array.prototype.push.apply(contextInstructions, strokeInstructions);
    Array.prototype.push.apply(contextInstructions, fillInstructions);
    this.labels_[key] = label;
    return label;
  };
  Executor2.prototype.replayTextBackground_ = function(context, p12, p22, p32, p42, fillInstruction2, strokeInstruction2) {
    context.beginPath();
    context.moveTo.apply(context, p12);
    context.lineTo.apply(context, p22);
    context.lineTo.apply(context, p32);
    context.lineTo.apply(context, p42);
    context.lineTo.apply(context, p12);
    if (fillInstruction2) {
      this.alignFill_ = fillInstruction2[2];
      this.fill_(context);
    }
    if (strokeInstruction2) {
      this.setStrokeStyle_(context, strokeInstruction2);
      context.stroke();
    }
  };
  Executor2.prototype.calculateImageOrLabelDimensions_ = function(sheetWidth, sheetHeight, centerX, centerY, width, height, anchorX, anchorY, originX, originY, rotation, scale4, snapToPixel, padding, fillStroke, feature) {
    anchorX *= scale4[0];
    anchorY *= scale4[1];
    var x = centerX - anchorX;
    var y = centerY - anchorY;
    var w = width + originX > sheetWidth ? sheetWidth - originX : width;
    var h = height + originY > sheetHeight ? sheetHeight - originY : height;
    var boxW = padding[3] + w * scale4[0] + padding[1];
    var boxH = padding[0] + h * scale4[1] + padding[2];
    var boxX = x - padding[3];
    var boxY = y - padding[0];
    if (fillStroke || rotation !== 0) {
      p1[0] = boxX;
      p4[0] = boxX;
      p1[1] = boxY;
      p2[1] = boxY;
      p2[0] = boxX + boxW;
      p3[0] = p2[0];
      p3[1] = boxY + boxH;
      p4[1] = p3[1];
    }
    var transform2;
    if (rotation !== 0) {
      transform2 = compose(create(), centerX, centerY, 1, 1, rotation, -centerX, -centerY);
      apply(transform2, p1);
      apply(transform2, p2);
      apply(transform2, p3);
      apply(transform2, p4);
      createOrUpdate(Math.min(p1[0], p2[0], p3[0], p4[0]), Math.min(p1[1], p2[1], p3[1], p4[1]), Math.max(p1[0], p2[0], p3[0], p4[0]), Math.max(p1[1], p2[1], p3[1], p4[1]), tmpExtent);
    } else {
      createOrUpdate(Math.min(boxX, boxX + boxW), Math.min(boxY, boxY + boxH), Math.max(boxX, boxX + boxW), Math.max(boxY, boxY + boxH), tmpExtent);
    }
    if (snapToPixel) {
      x = Math.round(x);
      y = Math.round(y);
    }
    return {
      drawImageX: x,
      drawImageY: y,
      drawImageW: w,
      drawImageH: h,
      originX,
      originY,
      declutterBox: {
        minX: tmpExtent[0],
        minY: tmpExtent[1],
        maxX: tmpExtent[2],
        maxY: tmpExtent[3],
        value: feature
      },
      canvasTransform: transform2,
      scale: scale4
    };
  };
  Executor2.prototype.replayImageOrLabel_ = function(context, contextScale, imageOrLabel, dimensions, opacity, fillInstruction2, strokeInstruction2) {
    var fillStroke = !!(fillInstruction2 || strokeInstruction2);
    var box = dimensions.declutterBox;
    var canvas = context.canvas;
    var strokePadding = strokeInstruction2 ? strokeInstruction2[2] * dimensions.scale[0] / 2 : 0;
    var intersects2 = box.minX - strokePadding <= canvas.width / contextScale && box.maxX + strokePadding >= 0 && box.minY - strokePadding <= canvas.height / contextScale && box.maxY + strokePadding >= 0;
    if (intersects2) {
      if (fillStroke) {
        this.replayTextBackground_(context, p1, p2, p3, p4, fillInstruction2, strokeInstruction2);
      }
      drawImageOrLabel(context, dimensions.canvasTransform, opacity, imageOrLabel, dimensions.originX, dimensions.originY, dimensions.drawImageW, dimensions.drawImageH, dimensions.drawImageX, dimensions.drawImageY, dimensions.scale);
    }
    return true;
  };
  Executor2.prototype.fill_ = function(context) {
    if (this.alignFill_) {
      var origin_1 = apply(this.renderedTransform_, [0, 0]);
      var repeatSize = 512 * this.pixelRatio;
      context.save();
      context.translate(origin_1[0] % repeatSize, origin_1[1] % repeatSize);
      context.rotate(this.viewRotation_);
    }
    context.fill();
    if (this.alignFill_) {
      context.restore();
    }
  };
  Executor2.prototype.setStrokeStyle_ = function(context, instruction) {
    context["strokeStyle"] = instruction[1];
    context.lineWidth = instruction[2];
    context.lineCap = instruction[3];
    context.lineJoin = instruction[4];
    context.miterLimit = instruction[5];
    if (context.setLineDash) {
      context.lineDashOffset = instruction[7];
      context.setLineDash(instruction[6]);
    }
  };
  Executor2.prototype.drawLabelWithPointPlacement_ = function(text, textKey, strokeKey, fillKey) {
    var textState = this.textStates[textKey];
    var label = this.createLabel(text, textKey, fillKey, strokeKey);
    var strokeState = this.strokeStates[strokeKey];
    var pixelRatio = this.pixelRatio;
    var align = horizontalTextAlign(Array.isArray(text) ? text[0] : text, textState.textAlign || defaultTextAlign);
    var baseline = TEXT_ALIGN[textState.textBaseline || defaultTextBaseline];
    var strokeWidth = strokeState && strokeState.lineWidth ? strokeState.lineWidth : 0;
    var width = label.width / pixelRatio - 2 * textState.scale[0];
    var anchorX = align * width + 2 * (0.5 - align) * strokeWidth;
    var anchorY = baseline * label.height / pixelRatio + 2 * (0.5 - baseline) * strokeWidth;
    return {
      label,
      anchorX,
      anchorY
    };
  };
  Executor2.prototype.execute_ = function(context, contextScale, transform2, instructions, snapToPixel, opt_featureCallback, opt_hitExtent, opt_declutterTree) {
    var pixelCoordinates;
    if (this.pixelCoordinates_ && equals(transform2, this.renderedTransform_)) {
      pixelCoordinates = this.pixelCoordinates_;
    } else {
      if (!this.pixelCoordinates_) {
        this.pixelCoordinates_ = [];
      }
      pixelCoordinates = transform2D(this.coordinates, 0, this.coordinates.length, 2, transform2, this.pixelCoordinates_);
      setFromArray(this.renderedTransform_, transform2);
    }
    var i = 0;
    var ii = instructions.length;
    var d = 0;
    var dd;
    var anchorX, anchorY, prevX, prevY, roundX, roundY, image, text, textKey, strokeKey, fillKey;
    var pendingFill = 0;
    var pendingStroke = 0;
    var lastFillInstruction = null;
    var lastStrokeInstruction = null;
    var coordinateCache = this.coordinateCache_;
    var viewRotation = this.viewRotation_;
    var viewRotationFromTransform = Math.round(Math.atan2(-transform2[1], transform2[0]) * 1e12) / 1e12;
    var state = {
      context,
      pixelRatio: this.pixelRatio,
      resolution: this.resolution,
      rotation: viewRotation
    };
    var batchSize = this.instructions != instructions || this.overlaps ? 0 : 200;
    var feature;
    var x, y, currentGeometry;
    while (i < ii) {
      var instruction = instructions[i];
      var type = instruction[0];
      switch (type) {
        case Instruction_default.BEGIN_GEOMETRY:
          feature = instruction[1];
          currentGeometry = instruction[3];
          if (!feature.getGeometry()) {
            i = instruction[2];
          } else if (opt_hitExtent !== void 0 && !intersects(opt_hitExtent, currentGeometry.getExtent())) {
            i = instruction[2] + 1;
          } else {
            ++i;
          }
          break;
        case Instruction_default.BEGIN_PATH:
          if (pendingFill > batchSize) {
            this.fill_(context);
            pendingFill = 0;
          }
          if (pendingStroke > batchSize) {
            context.stroke();
            pendingStroke = 0;
          }
          if (!pendingFill && !pendingStroke) {
            context.beginPath();
            prevX = NaN;
            prevY = NaN;
          }
          ++i;
          break;
        case Instruction_default.CIRCLE:
          d = instruction[1];
          var x1 = pixelCoordinates[d];
          var y1 = pixelCoordinates[d + 1];
          var x2 = pixelCoordinates[d + 2];
          var y2 = pixelCoordinates[d + 3];
          var dx = x2 - x1;
          var dy = y2 - y1;
          var r = Math.sqrt(dx * dx + dy * dy);
          context.moveTo(x1 + r, y1);
          context.arc(x1, y1, r, 0, 2 * Math.PI, true);
          ++i;
          break;
        case Instruction_default.CLOSE_PATH:
          context.closePath();
          ++i;
          break;
        case Instruction_default.CUSTOM:
          d = instruction[1];
          dd = instruction[2];
          var geometry = instruction[3];
          var renderer = instruction[4];
          var fn = instruction.length == 6 ? instruction[5] : void 0;
          state.geometry = geometry;
          state.feature = feature;
          if (!(i in coordinateCache)) {
            coordinateCache[i] = [];
          }
          var coords = coordinateCache[i];
          if (fn) {
            fn(pixelCoordinates, d, dd, 2, coords);
          } else {
            coords[0] = pixelCoordinates[d];
            coords[1] = pixelCoordinates[d + 1];
            coords.length = 2;
          }
          renderer(coords, state);
          ++i;
          break;
        case Instruction_default.DRAW_IMAGE:
          d = instruction[1];
          dd = instruction[2];
          image = instruction[3];
          anchorX = instruction[4];
          anchorY = instruction[5];
          var height = instruction[6];
          var opacity = instruction[7];
          var originX = instruction[8];
          var originY = instruction[9];
          var rotateWithView = instruction[10];
          var rotation = instruction[11];
          var scale4 = instruction[12];
          var width = instruction[13];
          var declutterImageWithText = instruction[14];
          if (!image && instruction.length >= 19) {
            text = instruction[18];
            textKey = instruction[19];
            strokeKey = instruction[20];
            fillKey = instruction[21];
            var labelWithAnchor = this.drawLabelWithPointPlacement_(text, textKey, strokeKey, fillKey);
            image = labelWithAnchor.label;
            instruction[3] = image;
            var textOffsetX = instruction[22];
            anchorX = (labelWithAnchor.anchorX - textOffsetX) * this.pixelRatio;
            instruction[4] = anchorX;
            var textOffsetY = instruction[23];
            anchorY = (labelWithAnchor.anchorY - textOffsetY) * this.pixelRatio;
            instruction[5] = anchorY;
            height = image.height;
            instruction[6] = height;
            width = image.width;
            instruction[13] = width;
          }
          var geometryWidths = void 0;
          if (instruction.length > 24) {
            geometryWidths = instruction[24];
          }
          var padding = void 0, backgroundFill = void 0, backgroundStroke = void 0;
          if (instruction.length > 16) {
            padding = instruction[15];
            backgroundFill = instruction[16];
            backgroundStroke = instruction[17];
          } else {
            padding = defaultPadding;
            backgroundFill = false;
            backgroundStroke = false;
          }
          if (rotateWithView && viewRotationFromTransform) {
            rotation += viewRotation;
          } else if (!rotateWithView && !viewRotationFromTransform) {
            rotation -= viewRotation;
          }
          var widthIndex = 0;
          for (; d < dd; d += 2) {
            if (geometryWidths && geometryWidths[widthIndex++] < width / this.pixelRatio) {
              continue;
            }
            var dimensions = this.calculateImageOrLabelDimensions_(image.width, image.height, pixelCoordinates[d], pixelCoordinates[d + 1], width, height, anchorX, anchorY, originX, originY, rotation, scale4, snapToPixel, padding, backgroundFill || backgroundStroke, feature);
            var args = [
              context,
              contextScale,
              image,
              dimensions,
              opacity,
              backgroundFill ? lastFillInstruction : null,
              backgroundStroke ? lastStrokeInstruction : null
            ];
            var imageArgs = void 0;
            var imageDeclutterBox = void 0;
            if (opt_declutterTree && declutterImageWithText) {
              var index = dd - d;
              if (!declutterImageWithText[index]) {
                declutterImageWithText[index] = args;
                continue;
              }
              imageArgs = declutterImageWithText[index];
              delete declutterImageWithText[index];
              imageDeclutterBox = getDeclutterBox(imageArgs);
              if (opt_declutterTree.collides(imageDeclutterBox)) {
                continue;
              }
            }
            if (opt_declutterTree && opt_declutterTree.collides(dimensions.declutterBox)) {
              continue;
            }
            if (imageArgs) {
              if (opt_declutterTree) {
                opt_declutterTree.insert(imageDeclutterBox);
              }
              this.replayImageOrLabel_.apply(this, imageArgs);
            }
            if (opt_declutterTree) {
              opt_declutterTree.insert(dimensions.declutterBox);
            }
            this.replayImageOrLabel_.apply(this, args);
          }
          ++i;
          break;
        case Instruction_default.DRAW_CHARS:
          var begin = instruction[1];
          var end = instruction[2];
          var baseline = instruction[3];
          var overflow = instruction[4];
          fillKey = instruction[5];
          var maxAngle = instruction[6];
          var measurePixelRatio = instruction[7];
          var offsetY = instruction[8];
          strokeKey = instruction[9];
          var strokeWidth = instruction[10];
          text = instruction[11];
          textKey = instruction[12];
          var pixelRatioScale = [
            instruction[13],
            instruction[13]
          ];
          var textState = this.textStates[textKey];
          var font = textState.font;
          var textScale = [
            textState.scale[0] * measurePixelRatio,
            textState.scale[1] * measurePixelRatio
          ];
          var cachedWidths = void 0;
          if (font in this.widths_) {
            cachedWidths = this.widths_[font];
          } else {
            cachedWidths = {};
            this.widths_[font] = cachedWidths;
          }
          var pathLength = lineStringLength(pixelCoordinates, begin, end, 2);
          var textLength = Math.abs(textScale[0]) * measureAndCacheTextWidth(font, text, cachedWidths);
          if (overflow || textLength <= pathLength) {
            var textAlign = this.textStates[textKey].textAlign;
            var startM = (pathLength - textLength) * TEXT_ALIGN[textAlign];
            var parts = drawTextOnPath(pixelCoordinates, begin, end, 2, text, startM, maxAngle, Math.abs(textScale[0]), measureAndCacheTextWidth, font, cachedWidths, viewRotationFromTransform ? 0 : this.viewRotation_);
            drawChars:
              if (parts) {
                var replayImageOrLabelArgs = [];
                var c = void 0, cc = void 0, chars = void 0, label = void 0, part = void 0;
                if (strokeKey) {
                  for (c = 0, cc = parts.length; c < cc; ++c) {
                    part = parts[c];
                    chars = part[4];
                    label = this.createLabel(chars, textKey, "", strokeKey);
                    anchorX = part[2] + (textScale[0] < 0 ? -strokeWidth : strokeWidth);
                    anchorY = baseline * label.height + (0.5 - baseline) * 2 * strokeWidth * textScale[1] / textScale[0] - offsetY;
                    var dimensions = this.calculateImageOrLabelDimensions_(label.width, label.height, part[0], part[1], label.width, label.height, anchorX, anchorY, 0, 0, part[3], pixelRatioScale, false, defaultPadding, false, feature);
                    if (opt_declutterTree && opt_declutterTree.collides(dimensions.declutterBox)) {
                      break drawChars;
                    }
                    replayImageOrLabelArgs.push([
                      context,
                      contextScale,
                      label,
                      dimensions,
                      1,
                      null,
                      null
                    ]);
                  }
                }
                if (fillKey) {
                  for (c = 0, cc = parts.length; c < cc; ++c) {
                    part = parts[c];
                    chars = part[4];
                    label = this.createLabel(chars, textKey, fillKey, "");
                    anchorX = part[2];
                    anchorY = baseline * label.height - offsetY;
                    var dimensions = this.calculateImageOrLabelDimensions_(label.width, label.height, part[0], part[1], label.width, label.height, anchorX, anchorY, 0, 0, part[3], pixelRatioScale, false, defaultPadding, false, feature);
                    if (opt_declutterTree && opt_declutterTree.collides(dimensions.declutterBox)) {
                      break drawChars;
                    }
                    replayImageOrLabelArgs.push([
                      context,
                      contextScale,
                      label,
                      dimensions,
                      1,
                      null,
                      null
                    ]);
                  }
                }
                if (opt_declutterTree) {
                  opt_declutterTree.load(replayImageOrLabelArgs.map(getDeclutterBox));
                }
                for (var i_1 = 0, ii_1 = replayImageOrLabelArgs.length; i_1 < ii_1; ++i_1) {
                  this.replayImageOrLabel_.apply(this, replayImageOrLabelArgs[i_1]);
                }
              }
          }
          ++i;
          break;
        case Instruction_default.END_GEOMETRY:
          if (opt_featureCallback !== void 0) {
            feature = instruction[1];
            var result = opt_featureCallback(feature, currentGeometry);
            if (result) {
              return result;
            }
          }
          ++i;
          break;
        case Instruction_default.FILL:
          if (batchSize) {
            pendingFill++;
          } else {
            this.fill_(context);
          }
          ++i;
          break;
        case Instruction_default.MOVE_TO_LINE_TO:
          d = instruction[1];
          dd = instruction[2];
          x = pixelCoordinates[d];
          y = pixelCoordinates[d + 1];
          roundX = x + 0.5 | 0;
          roundY = y + 0.5 | 0;
          if (roundX !== prevX || roundY !== prevY) {
            context.moveTo(x, y);
            prevX = roundX;
            prevY = roundY;
          }
          for (d += 2; d < dd; d += 2) {
            x = pixelCoordinates[d];
            y = pixelCoordinates[d + 1];
            roundX = x + 0.5 | 0;
            roundY = y + 0.5 | 0;
            if (d == dd - 2 || roundX !== prevX || roundY !== prevY) {
              context.lineTo(x, y);
              prevX = roundX;
              prevY = roundY;
            }
          }
          ++i;
          break;
        case Instruction_default.SET_FILL_STYLE:
          lastFillInstruction = instruction;
          this.alignFill_ = instruction[2];
          if (pendingFill) {
            this.fill_(context);
            pendingFill = 0;
            if (pendingStroke) {
              context.stroke();
              pendingStroke = 0;
            }
          }
          context.fillStyle = instruction[1];
          ++i;
          break;
        case Instruction_default.SET_STROKE_STYLE:
          lastStrokeInstruction = instruction;
          if (pendingStroke) {
            context.stroke();
            pendingStroke = 0;
          }
          this.setStrokeStyle_(context, instruction);
          ++i;
          break;
        case Instruction_default.STROKE:
          if (batchSize) {
            pendingStroke++;
          } else {
            context.stroke();
          }
          ++i;
          break;
        default:
          ++i;
          break;
      }
    }
    if (pendingFill) {
      this.fill_(context);
    }
    if (pendingStroke) {
      context.stroke();
    }
    return void 0;
  };
  Executor2.prototype.execute = function(context, contextScale, transform2, viewRotation, snapToPixel, opt_declutterTree) {
    this.viewRotation_ = viewRotation;
    this.execute_(context, contextScale, transform2, this.instructions, snapToPixel, void 0, void 0, opt_declutterTree);
  };
  Executor2.prototype.executeHitDetection = function(context, transform2, viewRotation, opt_featureCallback, opt_hitExtent) {
    this.viewRotation_ = viewRotation;
    return this.execute_(context, 1, transform2, this.hitDetectionInstructions, true, opt_featureCallback, opt_hitExtent);
  };
  return Executor2;
}();
var Executor_default = Executor;

// ../node_modules/ol/render/canvas/ExecutorGroup.js
var ORDER = [
  BuilderType_default.POLYGON,
  BuilderType_default.CIRCLE,
  BuilderType_default.LINE_STRING,
  BuilderType_default.IMAGE,
  BuilderType_default.TEXT,
  BuilderType_default.DEFAULT
];
var ExecutorGroup = function() {
  function ExecutorGroup2(maxExtent, resolution, pixelRatio, overlaps, allInstructions, opt_renderBuffer) {
    this.maxExtent_ = maxExtent;
    this.overlaps_ = overlaps;
    this.pixelRatio_ = pixelRatio;
    this.resolution_ = resolution;
    this.renderBuffer_ = opt_renderBuffer;
    this.executorsByZIndex_ = {};
    this.hitDetectionContext_ = null;
    this.hitDetectionTransform_ = create();
    this.createExecutors_(allInstructions);
  }
  ExecutorGroup2.prototype.clip = function(context, transform2) {
    var flatClipCoords = this.getClipCoords(transform2);
    context.beginPath();
    context.moveTo(flatClipCoords[0], flatClipCoords[1]);
    context.lineTo(flatClipCoords[2], flatClipCoords[3]);
    context.lineTo(flatClipCoords[4], flatClipCoords[5]);
    context.lineTo(flatClipCoords[6], flatClipCoords[7]);
    context.clip();
  };
  ExecutorGroup2.prototype.createExecutors_ = function(allInstructions) {
    for (var zIndex in allInstructions) {
      var executors = this.executorsByZIndex_[zIndex];
      if (executors === void 0) {
        executors = {};
        this.executorsByZIndex_[zIndex] = executors;
      }
      var instructionByZindex = allInstructions[zIndex];
      for (var builderType in instructionByZindex) {
        var instructions = instructionByZindex[builderType];
        executors[builderType] = new Executor_default(this.resolution_, this.pixelRatio_, this.overlaps_, instructions);
      }
    }
  };
  ExecutorGroup2.prototype.hasExecutors = function(executors) {
    for (var zIndex in this.executorsByZIndex_) {
      var candidates = this.executorsByZIndex_[zIndex];
      for (var i = 0, ii = executors.length; i < ii; ++i) {
        if (executors[i] in candidates) {
          return true;
        }
      }
    }
    return false;
  };
  ExecutorGroup2.prototype.forEachFeatureAtCoordinate = function(coordinate, resolution, rotation, hitTolerance, callback, declutteredFeatures) {
    hitTolerance = Math.round(hitTolerance);
    var contextSize = hitTolerance * 2 + 1;
    var transform2 = compose(this.hitDetectionTransform_, hitTolerance + 0.5, hitTolerance + 0.5, 1 / resolution, -1 / resolution, -rotation, -coordinate[0], -coordinate[1]);
    var newContext = !this.hitDetectionContext_;
    if (newContext) {
      this.hitDetectionContext_ = createCanvasContext2D(contextSize, contextSize);
    }
    var context = this.hitDetectionContext_;
    if (context.canvas.width !== contextSize || context.canvas.height !== contextSize) {
      context.canvas.width = contextSize;
      context.canvas.height = contextSize;
    } else if (!newContext) {
      context.clearRect(0, 0, contextSize, contextSize);
    }
    var hitExtent;
    if (this.renderBuffer_ !== void 0) {
      hitExtent = createEmpty();
      extendCoordinate(hitExtent, coordinate);
      buffer(hitExtent, resolution * (this.renderBuffer_ + hitTolerance), hitExtent);
    }
    var indexes = getPixelIndexArray(hitTolerance);
    var builderType;
    function featureCallback(feature, geometry) {
      var imageData = context.getImageData(0, 0, contextSize, contextSize).data;
      for (var i_1 = 0, ii = indexes.length; i_1 < ii; i_1++) {
        if (imageData[indexes[i_1]] > 0) {
          if (!declutteredFeatures || builderType !== BuilderType_default.IMAGE && builderType !== BuilderType_default.TEXT || declutteredFeatures.indexOf(feature) !== -1) {
            var idx = (indexes[i_1] - 3) / 4;
            var x = hitTolerance - idx % contextSize;
            var y = hitTolerance - (idx / contextSize | 0);
            var result_1 = callback(feature, geometry, x * x + y * y);
            if (result_1) {
              return result_1;
            }
          }
          context.clearRect(0, 0, contextSize, contextSize);
          break;
        }
      }
      return void 0;
    }
    var zs = Object.keys(this.executorsByZIndex_).map(Number);
    zs.sort(numberSafeCompareFunction);
    var i, j, executors, executor, result;
    for (i = zs.length - 1; i >= 0; --i) {
      var zIndexKey = zs[i].toString();
      executors = this.executorsByZIndex_[zIndexKey];
      for (j = ORDER.length - 1; j >= 0; --j) {
        builderType = ORDER[j];
        executor = executors[builderType];
        if (executor !== void 0) {
          result = executor.executeHitDetection(context, transform2, rotation, featureCallback, hitExtent);
          if (result) {
            return result;
          }
        }
      }
    }
    return void 0;
  };
  ExecutorGroup2.prototype.getClipCoords = function(transform2) {
    var maxExtent = this.maxExtent_;
    if (!maxExtent) {
      return null;
    }
    var minX = maxExtent[0];
    var minY = maxExtent[1];
    var maxX = maxExtent[2];
    var maxY = maxExtent[3];
    var flatClipCoords = [minX, minY, minX, maxY, maxX, maxY, maxX, minY];
    transform2D(flatClipCoords, 0, 8, 2, transform2, flatClipCoords);
    return flatClipCoords;
  };
  ExecutorGroup2.prototype.isEmpty = function() {
    return isEmpty(this.executorsByZIndex_);
  };
  ExecutorGroup2.prototype.execute = function(context, contextScale, transform2, viewRotation, snapToPixel, opt_builderTypes, opt_declutterTree) {
    var zs = Object.keys(this.executorsByZIndex_).map(Number);
    zs.sort(numberSafeCompareFunction);
    if (this.maxExtent_) {
      context.save();
      this.clip(context, transform2);
    }
    var builderTypes = opt_builderTypes ? opt_builderTypes : ORDER;
    var i, ii, j, jj, replays, replay;
    if (opt_declutterTree) {
      zs.reverse();
    }
    for (i = 0, ii = zs.length; i < ii; ++i) {
      var zIndexKey = zs[i].toString();
      replays = this.executorsByZIndex_[zIndexKey];
      for (j = 0, jj = builderTypes.length; j < jj; ++j) {
        var builderType = builderTypes[j];
        replay = replays[builderType];
        if (replay !== void 0) {
          replay.execute(context, contextScale, transform2, viewRotation, snapToPixel, opt_declutterTree);
        }
      }
    }
    if (this.maxExtent_) {
      context.restore();
    }
  };
  return ExecutorGroup2;
}();
var circlePixelIndexArrayCache = {};
function getPixelIndexArray(radius) {
  if (circlePixelIndexArrayCache[radius] !== void 0) {
    return circlePixelIndexArrayCache[radius];
  }
  var size = radius * 2 + 1;
  var maxDistanceSq = radius * radius;
  var distances = new Array(maxDistanceSq + 1);
  for (var i = 0; i <= radius; ++i) {
    for (var j = 0; j <= radius; ++j) {
      var distanceSq = i * i + j * j;
      if (distanceSq > maxDistanceSq) {
        break;
      }
      var distance = distances[distanceSq];
      if (!distance) {
        distance = [];
        distances[distanceSq] = distance;
      }
      distance.push(((radius + i) * size + (radius + j)) * 4 + 3);
      if (i > 0) {
        distance.push(((radius - i) * size + (radius + j)) * 4 + 3);
      }
      if (j > 0) {
        distance.push(((radius + i) * size + (radius - j)) * 4 + 3);
        if (i > 0) {
          distance.push(((radius - i) * size + (radius - j)) * 4 + 3);
        }
      }
    }
  }
  var pixelIndex = [];
  for (var i = 0, ii = distances.length; i < ii; ++i) {
    if (distances[i]) {
      pixelIndex.push.apply(pixelIndex, distances[i]);
    }
  }
  circlePixelIndexArrayCache[radius] = pixelIndex;
  return pixelIndex;
}
var ExecutorGroup_default = ExecutorGroup;

// ../node_modules/ol/ViewHint.js
var ViewHint_default = {
  ANIMATING: 0,
  INTERACTING: 1
};

// ../node_modules/ol/render/canvas/Immediate.js
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
var CanvasImmediateRenderer = function(_super) {
  __extends29(CanvasImmediateRenderer2, _super);
  function CanvasImmediateRenderer2(context, pixelRatio, extent, transform2, viewRotation, opt_squaredTolerance, opt_userTransform) {
    var _this = _super.call(this) || this;
    _this.context_ = context;
    _this.pixelRatio_ = pixelRatio;
    _this.extent_ = extent;
    _this.transform_ = transform2;
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
  CanvasImmediateRenderer2.prototype.drawImages_ = function(flatCoordinates, offset2, end, stride) {
    if (!this.image_) {
      return;
    }
    var pixelCoordinates = transform2D(flatCoordinates, offset2, end, stride, this.transform_, this.pixelCoordinates_);
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
  CanvasImmediateRenderer2.prototype.drawText_ = function(flatCoordinates, offset2, end, stride) {
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
    var pixelCoordinates = transform2D(flatCoordinates, offset2, end, stride, this.transform_, this.pixelCoordinates_);
    var context = this.context_;
    var rotation = this.textRotation_;
    if (this.textRotateWithView_) {
      rotation += this.viewRotation_;
    }
    for (; offset2 < end; offset2 += stride) {
      var x = pixelCoordinates[offset2] + this.textOffsetX_;
      var y = pixelCoordinates[offset2 + 1] + this.textOffsetY_;
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
  CanvasImmediateRenderer2.prototype.moveToLineTo_ = function(flatCoordinates, offset2, end, stride, close) {
    var context = this.context_;
    var pixelCoordinates = transform2D(flatCoordinates, offset2, end, stride, this.transform_, this.pixelCoordinates_);
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
  CanvasImmediateRenderer2.prototype.drawRings_ = function(flatCoordinates, offset2, ends, stride) {
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      offset2 = this.moveToLineTo_(flatCoordinates, offset2, ends[i], stride, true);
    }
    return offset2;
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
  CanvasImmediateRenderer2.prototype.setTransform = function(transform2) {
    this.transform_ = transform2;
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
      var offset2 = 0;
      var ends = geometry.getEnds();
      var stride = geometry.getStride();
      context.beginPath();
      for (var i = 0, ii = ends.length; i < ii; ++i) {
        offset2 = this.moveToLineTo_(flatCoordinates, offset2, ends[i], stride, false);
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
      var offset2 = 0;
      var endss = geometry.getEndss();
      var stride = geometry.getStride();
      context.beginPath();
      for (var i = 0, ii = endss.length; i < ii; ++i) {
        var ends = endss[i];
        offset2 = this.drawRings_(flatCoordinates, offset2, ends, stride);
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

// ../node_modules/ol/style/IconAnchorUnits.js
var IconAnchorUnits_default = {
  FRACTION: "fraction",
  PIXELS: "pixels"
};

// ../node_modules/ol/style/IconOrigin.js
var IconOrigin_default = {
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right"
};

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

// ../node_modules/ol/ImageBase.js
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
var ImageBase = function(_super) {
  __extends30(ImageBase2, _super);
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
var ImageWrapper = function(_super) {
  __extends31(ImageWrapper2, _super);
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
var Image_default2 = ImageWrapper;

// ../node_modules/ol/style/IconImage.js
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
var taintedTestContext = null;
var IconImage = function(_super) {
  __extends32(IconImage2, _super);
  function IconImage2(image, src, size, crossOrigin, imageState, color) {
    var _this = _super.call(this) || this;
    _this.hitDetectionImage_ = null;
    _this.image_ = !image ? new Image() : image;
    if (crossOrigin !== null) {
      _this.image_.crossOrigin = crossOrigin;
    }
    _this.canvas_ = {};
    _this.color_ = color;
    _this.unlisten_ = null;
    _this.imageState_ = imageState;
    _this.size_ = size;
    _this.src_ = src;
    _this.tainted_;
    return _this;
  }
  IconImage2.prototype.isTainted_ = function() {
    if (this.tainted_ === void 0 && this.imageState_ === ImageState_default.LOADED) {
      if (!taintedTestContext) {
        taintedTestContext = createCanvasContext2D(1, 1);
      }
      taintedTestContext.drawImage(this.image_, 0, 0);
      try {
        taintedTestContext.getImageData(0, 0, 1, 1);
        this.tainted_ = false;
      } catch (e) {
        taintedTestContext = null;
        this.tainted_ = true;
      }
    }
    return this.tainted_ === true;
  };
  IconImage2.prototype.dispatchChangeEvent_ = function() {
    this.dispatchEvent(EventType_default.CHANGE);
  };
  IconImage2.prototype.handleImageError_ = function() {
    this.imageState_ = ImageState_default.ERROR;
    this.unlistenImage_();
    this.dispatchChangeEvent_();
  };
  IconImage2.prototype.handleImageLoad_ = function() {
    this.imageState_ = ImageState_default.LOADED;
    if (this.size_) {
      this.image_.width = this.size_[0];
      this.image_.height = this.size_[1];
    } else {
      this.size_ = [this.image_.width, this.image_.height];
    }
    this.unlistenImage_();
    this.dispatchChangeEvent_();
  };
  IconImage2.prototype.getImage = function(pixelRatio) {
    this.replaceColor_(pixelRatio);
    return this.canvas_[pixelRatio] ? this.canvas_[pixelRatio] : this.image_;
  };
  IconImage2.prototype.getPixelRatio = function(pixelRatio) {
    this.replaceColor_(pixelRatio);
    return this.canvas_[pixelRatio] ? pixelRatio : 1;
  };
  IconImage2.prototype.getImageState = function() {
    return this.imageState_;
  };
  IconImage2.prototype.getHitDetectionImage = function() {
    if (!this.hitDetectionImage_) {
      if (this.isTainted_()) {
        var width = this.size_[0];
        var height = this.size_[1];
        var context = createCanvasContext2D(width, height);
        context.fillRect(0, 0, width, height);
        this.hitDetectionImage_ = context.canvas;
      } else {
        this.hitDetectionImage_ = this.image_;
      }
    }
    return this.hitDetectionImage_;
  };
  IconImage2.prototype.getSize = function() {
    return this.size_;
  };
  IconImage2.prototype.getSrc = function() {
    return this.src_;
  };
  IconImage2.prototype.load = function() {
    if (this.imageState_ == ImageState_default.IDLE) {
      this.imageState_ = ImageState_default.LOADING;
      try {
        this.image_.src = this.src_;
      } catch (e) {
        this.handleImageError_();
      }
      this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
    }
  };
  IconImage2.prototype.replaceColor_ = function(pixelRatio) {
    if (!this.color_ || this.canvas_[pixelRatio] || this.imageState_ !== ImageState_default.LOADED) {
      return;
    }
    var canvas = document.createElement("canvas");
    this.canvas_[pixelRatio] = canvas;
    canvas.width = Math.ceil(this.image_.width * pixelRatio);
    canvas.height = Math.ceil(this.image_.height * pixelRatio);
    var ctx = canvas.getContext("2d");
    ctx.scale(pixelRatio, pixelRatio);
    ctx.drawImage(this.image_, 0, 0);
    ctx.globalCompositeOperation = "multiply";
    if (ctx.globalCompositeOperation === "multiply" || this.isTainted_()) {
      ctx.fillStyle = asString(this.color_);
      ctx.fillRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(this.image_, 0, 0);
    } else {
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imgData.data;
      var r = this.color_[0] / 255;
      var g = this.color_[1] / 255;
      var b = this.color_[2] / 255;
      var a = this.color_[3];
      for (var i = 0, ii = data.length; i < ii; i += 4) {
        data[i] *= r;
        data[i + 1] *= g;
        data[i + 2] *= b;
        data[i + 3] *= a;
      }
      ctx.putImageData(imgData, 0, 0);
    }
  };
  IconImage2.prototype.unlistenImage_ = function() {
    if (this.unlisten_) {
      this.unlisten_();
      this.unlisten_ = null;
    }
  };
  return IconImage2;
}(Target_default);
function get4(image, src, size, crossOrigin, imageState, color) {
  var iconImage = shared.get(src, crossOrigin, color);
  if (!iconImage) {
    iconImage = new IconImage(image, src, size, crossOrigin, imageState, color);
    shared.set(src, crossOrigin, color, iconImage);
  }
  return iconImage;
}

// ../node_modules/ol/style/Icon.js
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
var Icon = function(_super) {
  __extends33(Icon2, _super);
  function Icon2(opt_options) {
    var _this = this;
    var options = opt_options || {};
    var opacity = options.opacity !== void 0 ? options.opacity : 1;
    var rotation = options.rotation !== void 0 ? options.rotation : 0;
    var scale4 = options.scale !== void 0 ? options.scale : 1;
    var rotateWithView = options.rotateWithView !== void 0 ? options.rotateWithView : false;
    _this = _super.call(this, {
      opacity,
      rotation,
      scale: scale4,
      displacement: options.displacement !== void 0 ? options.displacement : [0, 0],
      rotateWithView
    }) || this;
    _this.anchor_ = options.anchor !== void 0 ? options.anchor : [0.5, 0.5];
    _this.normalizedAnchor_ = null;
    _this.anchorOrigin_ = options.anchorOrigin !== void 0 ? options.anchorOrigin : IconOrigin_default.TOP_LEFT;
    _this.anchorXUnits_ = options.anchorXUnits !== void 0 ? options.anchorXUnits : IconAnchorUnits_default.FRACTION;
    _this.anchorYUnits_ = options.anchorYUnits !== void 0 ? options.anchorYUnits : IconAnchorUnits_default.FRACTION;
    _this.crossOrigin_ = options.crossOrigin !== void 0 ? options.crossOrigin : null;
    var image = options.img !== void 0 ? options.img : null;
    _this.imgSize_ = options.imgSize;
    var src = options.src;
    assert(!(src !== void 0 && image), 4);
    assert(!image || image && _this.imgSize_, 5);
    if ((src === void 0 || src.length === 0) && image) {
      src = image.src || getUid(image);
    }
    assert(src !== void 0 && src.length > 0, 6);
    var imageState = options.src !== void 0 ? ImageState_default.IDLE : ImageState_default.LOADED;
    _this.color_ = options.color !== void 0 ? asArray(options.color) : null;
    _this.iconImage_ = get4(image, src, _this.imgSize_ !== void 0 ? _this.imgSize_ : null, _this.crossOrigin_, imageState, _this.color_);
    _this.offset_ = options.offset !== void 0 ? options.offset : [0, 0];
    _this.offsetOrigin_ = options.offsetOrigin !== void 0 ? options.offsetOrigin : IconOrigin_default.TOP_LEFT;
    _this.origin_ = null;
    _this.size_ = options.size !== void 0 ? options.size : null;
    return _this;
  }
  Icon2.prototype.clone = function() {
    var scale4 = this.getScale();
    return new Icon2({
      anchor: this.anchor_.slice(),
      anchorOrigin: this.anchorOrigin_,
      anchorXUnits: this.anchorXUnits_,
      anchorYUnits: this.anchorYUnits_,
      color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || void 0,
      crossOrigin: this.crossOrigin_,
      imgSize: this.imgSize_,
      offset: this.offset_.slice(),
      offsetOrigin: this.offsetOrigin_,
      opacity: this.getOpacity(),
      rotateWithView: this.getRotateWithView(),
      rotation: this.getRotation(),
      scale: Array.isArray(scale4) ? scale4.slice() : scale4,
      size: this.size_ !== null ? this.size_.slice() : void 0,
      src: this.getSrc()
    });
  };
  Icon2.prototype.getAnchor = function() {
    var anchor = this.normalizedAnchor_;
    if (!anchor) {
      anchor = this.anchor_;
      var size = this.getSize();
      if (this.anchorXUnits_ == IconAnchorUnits_default.FRACTION || this.anchorYUnits_ == IconAnchorUnits_default.FRACTION) {
        if (!size) {
          return null;
        }
        anchor = this.anchor_.slice();
        if (this.anchorXUnits_ == IconAnchorUnits_default.FRACTION) {
          anchor[0] *= size[0];
        }
        if (this.anchorYUnits_ == IconAnchorUnits_default.FRACTION) {
          anchor[1] *= size[1];
        }
      }
      if (this.anchorOrigin_ != IconOrigin_default.TOP_LEFT) {
        if (!size) {
          return null;
        }
        if (anchor === this.anchor_) {
          anchor = this.anchor_.slice();
        }
        if (this.anchorOrigin_ == IconOrigin_default.TOP_RIGHT || this.anchorOrigin_ == IconOrigin_default.BOTTOM_RIGHT) {
          anchor[0] = -anchor[0] + size[0];
        }
        if (this.anchorOrigin_ == IconOrigin_default.BOTTOM_LEFT || this.anchorOrigin_ == IconOrigin_default.BOTTOM_RIGHT) {
          anchor[1] = -anchor[1] + size[1];
        }
      }
      this.normalizedAnchor_ = anchor;
    }
    var displacement = this.getDisplacement();
    return [anchor[0] - displacement[0], anchor[1] + displacement[1]];
  };
  Icon2.prototype.setAnchor = function(anchor) {
    this.anchor_ = anchor;
    this.normalizedAnchor_ = null;
  };
  Icon2.prototype.getColor = function() {
    return this.color_;
  };
  Icon2.prototype.getImage = function(pixelRatio) {
    return this.iconImage_.getImage(pixelRatio);
  };
  Icon2.prototype.getPixelRatio = function(pixelRatio) {
    return this.iconImage_.getPixelRatio(pixelRatio);
  };
  Icon2.prototype.getImageSize = function() {
    return this.iconImage_.getSize();
  };
  Icon2.prototype.getImageState = function() {
    return this.iconImage_.getImageState();
  };
  Icon2.prototype.getHitDetectionImage = function() {
    return this.iconImage_.getHitDetectionImage();
  };
  Icon2.prototype.getOrigin = function() {
    if (this.origin_) {
      return this.origin_;
    }
    var offset2 = this.offset_;
    if (this.offsetOrigin_ != IconOrigin_default.TOP_LEFT) {
      var size = this.getSize();
      var iconImageSize = this.iconImage_.getSize();
      if (!size || !iconImageSize) {
        return null;
      }
      offset2 = offset2.slice();
      if (this.offsetOrigin_ == IconOrigin_default.TOP_RIGHT || this.offsetOrigin_ == IconOrigin_default.BOTTOM_RIGHT) {
        offset2[0] = iconImageSize[0] - size[0] - offset2[0];
      }
      if (this.offsetOrigin_ == IconOrigin_default.BOTTOM_LEFT || this.offsetOrigin_ == IconOrigin_default.BOTTOM_RIGHT) {
        offset2[1] = iconImageSize[1] - size[1] - offset2[1];
      }
    }
    this.origin_ = offset2;
    return this.origin_;
  };
  Icon2.prototype.getSrc = function() {
    return this.iconImage_.getSrc();
  };
  Icon2.prototype.getSize = function() {
    return !this.size_ ? this.iconImage_.getSize() : this.size_;
  };
  Icon2.prototype.listenImageChange = function(listener) {
    this.iconImage_.addEventListener(EventType_default.CHANGE, listener);
  };
  Icon2.prototype.load = function() {
    this.iconImage_.load();
  };
  Icon2.prototype.unlistenImageChange = function(listener) {
    this.iconImage_.removeEventListener(EventType_default.CHANGE, listener);
  };
  return Icon2;
}(Image_default);
var Icon_default = Icon;

// ../node_modules/ol/render/canvas/hitdetect.js
var HIT_DETECT_RESOLUTION = 0.5;
function createHitDetectionImageData(size, transforms2, features, styleFunction, extent, resolution, rotation) {
  var width = size[0] * HIT_DETECT_RESOLUTION;
  var height = size[1] * HIT_DETECT_RESOLUTION;
  var context = createCanvasContext2D(width, height);
  context.imageSmoothingEnabled = false;
  var canvas = context.canvas;
  var renderer = new Immediate_default(context, HIT_DETECT_RESOLUTION, extent, null, rotation);
  var featureCount = features.length;
  var indexFactor = Math.floor((256 * 256 * 256 - 1) / featureCount);
  var featuresByZIndex = {};
  for (var i = 1; i <= featureCount; ++i) {
    var feature = features[i - 1];
    var featureStyleFunction = feature.getStyleFunction() || styleFunction;
    if (!styleFunction) {
      continue;
    }
    var styles = featureStyleFunction(feature, resolution);
    if (!styles) {
      continue;
    }
    if (!Array.isArray(styles)) {
      styles = [styles];
    }
    var index = i * indexFactor;
    var color = "#" + ("000000" + index.toString(16)).slice(-6);
    for (var j = 0, jj = styles.length; j < jj; ++j) {
      var originalStyle = styles[j];
      var geometry = originalStyle.getGeometryFunction()(feature);
      if (!geometry || !intersects(extent, geometry.getExtent())) {
        continue;
      }
      var style = originalStyle.clone();
      var fill = style.getFill();
      if (fill) {
        fill.setColor(color);
      }
      var stroke = style.getStroke();
      if (stroke) {
        stroke.setColor(color);
        stroke.setLineDash(null);
      }
      style.setText(void 0);
      var image = originalStyle.getImage();
      if (image && image.getOpacity() !== 0) {
        var imgSize = image.getImageSize();
        if (!imgSize) {
          continue;
        }
        var imgContext = createCanvasContext2D(imgSize[0], imgSize[1], void 0, { alpha: false });
        var img = imgContext.canvas;
        imgContext.fillStyle = color;
        imgContext.fillRect(0, 0, img.width, img.height);
        style.setImage(new Icon_default({
          img,
          imgSize,
          anchor: image.getAnchor(),
          anchorXUnits: IconAnchorUnits_default.PIXELS,
          anchorYUnits: IconAnchorUnits_default.PIXELS,
          offset: image.getOrigin(),
          opacity: 1,
          size: image.getSize(),
          scale: image.getScale(),
          rotation: image.getRotation(),
          rotateWithView: image.getRotateWithView()
        }));
      }
      var zIndex = style.getZIndex() || 0;
      var byGeometryType = featuresByZIndex[zIndex];
      if (!byGeometryType) {
        byGeometryType = {};
        featuresByZIndex[zIndex] = byGeometryType;
        byGeometryType[GeometryType_default.POLYGON] = [];
        byGeometryType[GeometryType_default.CIRCLE] = [];
        byGeometryType[GeometryType_default.LINE_STRING] = [];
        byGeometryType[GeometryType_default.POINT] = [];
      }
      byGeometryType[geometry.getType().replace("Multi", "")].push(geometry, style);
    }
  }
  var zIndexKeys = Object.keys(featuresByZIndex).map(Number).sort(numberSafeCompareFunction);
  for (var i = 0, ii = zIndexKeys.length; i < ii; ++i) {
    var byGeometryType = featuresByZIndex[zIndexKeys[i]];
    for (var type in byGeometryType) {
      var geomAndStyle = byGeometryType[type];
      for (var j = 0, jj = geomAndStyle.length; j < jj; j += 2) {
        renderer.setStyle(geomAndStyle[j + 1]);
        for (var k = 0, kk = transforms2.length; k < kk; ++k) {
          renderer.setTransform(transforms2[k]);
          renderer.drawGeometry(geomAndStyle[j]);
        }
      }
    }
  }
  return context.getImageData(0, 0, canvas.width, canvas.height);
}
function hitDetect(pixel, features, imageData) {
  var resultFeatures = [];
  if (imageData) {
    var x = Math.floor(Math.round(pixel[0]) * HIT_DETECT_RESOLUTION);
    var y = Math.floor(Math.round(pixel[1]) * HIT_DETECT_RESOLUTION);
    var index = (clamp(x, 0, imageData.width - 1) + clamp(y, 0, imageData.height - 1) * imageData.width) * 4;
    var r = imageData.data[index];
    var g = imageData.data[index + 1];
    var b = imageData.data[index + 2];
    var i = b + 256 * (g + 256 * r);
    var indexFactor = Math.floor((256 * 256 * 256 - 1) / features.length);
    if (i && i % indexFactor === 0) {
      resultFeatures.push(features[i / indexFactor - 1]);
    }
  }
  return resultFeatures;
}

// ../node_modules/ol/renderer/vector.js
var SIMPLIFY_TOLERANCE = 0.5;
var GEOMETRY_RENDERERS = {
  "Point": renderPointGeometry,
  "LineString": renderLineStringGeometry,
  "Polygon": renderPolygonGeometry,
  "MultiPoint": renderMultiPointGeometry,
  "MultiLineString": renderMultiLineStringGeometry,
  "MultiPolygon": renderMultiPolygonGeometry,
  "GeometryCollection": renderGeometryCollectionGeometry,
  "Circle": renderCircleGeometry
};
function defaultOrder(feature1, feature2) {
  return parseInt(getUid(feature1), 10) - parseInt(getUid(feature2), 10);
}
function getSquaredTolerance(resolution, pixelRatio) {
  var tolerance = getTolerance(resolution, pixelRatio);
  return tolerance * tolerance;
}
function getTolerance(resolution, pixelRatio) {
  return SIMPLIFY_TOLERANCE * resolution / pixelRatio;
}
function renderCircleGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var fillStyle = style.getFill();
  var strokeStyle = style.getStroke();
  if (fillStyle || strokeStyle) {
    var circleReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.CIRCLE);
    circleReplay.setFillStrokeStyle(fillStyle, strokeStyle);
    circleReplay.drawCircle(geometry, feature);
  }
  var textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
function renderFeature(replayGroup, feature, style, squaredTolerance, listener, opt_transform, opt_declutterBuilderGroup) {
  var loading = false;
  var imageStyle = style.getImage();
  if (imageStyle) {
    var imageState = imageStyle.getImageState();
    if (imageState == ImageState_default.LOADED || imageState == ImageState_default.ERROR) {
      imageStyle.unlistenImageChange(listener);
    } else {
      if (imageState == ImageState_default.IDLE) {
        imageStyle.load();
      }
      imageState = imageStyle.getImageState();
      imageStyle.listenImageChange(listener);
      loading = true;
    }
  }
  renderFeatureInternal(replayGroup, feature, style, squaredTolerance, opt_transform, opt_declutterBuilderGroup);
  return loading;
}
function renderFeatureInternal(replayGroup, feature, style, squaredTolerance, opt_transform, opt_declutterBuilderGroup) {
  var geometry = style.getGeometryFunction()(feature);
  if (!geometry) {
    return;
  }
  var simplifiedGeometry = geometry.simplifyTransformed(squaredTolerance, opt_transform);
  var renderer = style.getRenderer();
  if (renderer) {
    renderGeometry(replayGroup, simplifiedGeometry, style, feature);
  } else {
    var geometryRenderer = GEOMETRY_RENDERERS[simplifiedGeometry.getType()];
    geometryRenderer(replayGroup, simplifiedGeometry, style, feature, opt_declutterBuilderGroup);
  }
}
function renderGeometry(replayGroup, geometry, style, feature) {
  if (geometry.getType() == GeometryType_default.GEOMETRY_COLLECTION) {
    var geometries = geometry.getGeometries();
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      renderGeometry(replayGroup, geometries[i], style, feature);
    }
    return;
  }
  var replay = replayGroup.getBuilder(style.getZIndex(), BuilderType_default.DEFAULT);
  replay.drawCustom(geometry, feature, style.getRenderer(), style.getHitDetectionRenderer());
}
function renderGeometryCollectionGeometry(replayGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var geometries = geometry.getGeometriesArray();
  var i, ii;
  for (i = 0, ii = geometries.length; i < ii; ++i) {
    var geometryRenderer = GEOMETRY_RENDERERS[geometries[i].getType()];
    geometryRenderer(replayGroup, geometries[i], style, feature, opt_declutterBuilderGroup);
  }
}
function renderLineStringGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var strokeStyle = style.getStroke();
  if (strokeStyle) {
    var lineStringReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.LINE_STRING);
    lineStringReplay.setFillStrokeStyle(null, strokeStyle);
    lineStringReplay.drawLineString(geometry, feature);
  }
  var textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
function renderMultiLineStringGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var strokeStyle = style.getStroke();
  if (strokeStyle) {
    var lineStringReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.LINE_STRING);
    lineStringReplay.setFillStrokeStyle(null, strokeStyle);
    lineStringReplay.drawMultiLineString(geometry, feature);
  }
  var textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
function renderMultiPolygonGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var fillStyle = style.getFill();
  var strokeStyle = style.getStroke();
  if (strokeStyle || fillStyle) {
    var polygonReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.POLYGON);
    polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
    polygonReplay.drawMultiPolygon(geometry, feature);
  }
  var textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
function renderPointGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var imageStyle = style.getImage();
  var textStyle = style.getText();
  var declutterImageWithText;
  if (opt_declutterBuilderGroup) {
    builderGroup = opt_declutterBuilderGroup;
    declutterImageWithText = imageStyle && textStyle && textStyle.getText() ? {} : void 0;
  }
  if (imageStyle) {
    if (imageStyle.getImageState() != ImageState_default.LOADED) {
      return;
    }
    var imageReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.IMAGE);
    imageReplay.setImageStyle(imageStyle, declutterImageWithText);
    imageReplay.drawPoint(geometry, feature);
  }
  if (textStyle && textStyle.getText()) {
    var textReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle, declutterImageWithText);
    textReplay.drawText(geometry, feature);
  }
}
function renderMultiPointGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var imageStyle = style.getImage();
  var textStyle = style.getText();
  var declutterImageWithText;
  if (opt_declutterBuilderGroup) {
    builderGroup = opt_declutterBuilderGroup;
    declutterImageWithText = imageStyle && textStyle && textStyle.getText() ? {} : void 0;
  }
  if (imageStyle) {
    if (imageStyle.getImageState() != ImageState_default.LOADED) {
      return;
    }
    var imageReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.IMAGE);
    imageReplay.setImageStyle(imageStyle, declutterImageWithText);
    imageReplay.drawMultiPoint(geometry, feature);
  }
  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle, declutterImageWithText);
    textReplay.drawText(geometry, feature);
  }
}
function renderPolygonGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var fillStyle = style.getFill();
  var strokeStyle = style.getStroke();
  if (fillStyle || strokeStyle) {
    var polygonReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType_default.POLYGON);
    polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
    polygonReplay.drawPolygon(geometry, feature);
  }
  var textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType_default.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}

// ../node_modules/ol/renderer/canvas/VectorLayer.js
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
var CanvasVectorLayerRenderer = function(_super) {
  __extends34(CanvasVectorLayerRenderer2, _super);
  function CanvasVectorLayerRenderer2(vectorLayer) {
    var _this = _super.call(this, vectorLayer) || this;
    _this.boundHandleStyleImageChange_ = _this.handleStyleImageChange_.bind(_this);
    _this.animatingOrInteracting_;
    _this.dirty_ = false;
    _this.hitDetectionImageData_ = null;
    _this.renderedFeatures_ = null;
    _this.renderedRevision_ = -1;
    _this.renderedResolution_ = NaN;
    _this.renderedExtent_ = createEmpty();
    _this.wrappedRenderedExtent_ = createEmpty();
    _this.renderedRotation_;
    _this.renderedCenter_ = null;
    _this.renderedProjection_ = null;
    _this.renderedRenderOrder_ = null;
    _this.replayGroup_ = null;
    _this.replayGroupChanged = true;
    _this.declutterExecutorGroup = null;
    _this.clipping = true;
    return _this;
  }
  CanvasVectorLayerRenderer2.prototype.renderWorlds = function(executorGroup, frameState, opt_declutterTree) {
    var extent = frameState.extent;
    var viewState = frameState.viewState;
    var center = viewState.center;
    var resolution = viewState.resolution;
    var projection = viewState.projection;
    var rotation = viewState.rotation;
    var projectionExtent = projection.getExtent();
    var vectorSource = this.getLayer().getSource();
    var pixelRatio = frameState.pixelRatio;
    var viewHints = frameState.viewHints;
    var snapToPixel = !(viewHints[ViewHint_default.ANIMATING] || viewHints[ViewHint_default.INTERACTING]);
    var context = this.context;
    var width = Math.round(frameState.size[0] * pixelRatio);
    var height = Math.round(frameState.size[1] * pixelRatio);
    var multiWorld = vectorSource.getWrapX() && projection.canWrapX();
    var worldWidth = multiWorld ? getWidth(projectionExtent) : null;
    var endWorld = multiWorld ? Math.ceil((extent[2] - projectionExtent[2]) / worldWidth) + 1 : 1;
    var world = multiWorld ? Math.floor((extent[0] - projectionExtent[0]) / worldWidth) : 0;
    do {
      var transform2 = this.getRenderTransform(center, resolution, rotation, pixelRatio, width, height, world * worldWidth);
      executorGroup.execute(context, 1, transform2, rotation, snapToPixel, void 0, opt_declutterTree);
    } while (++world < endWorld);
  };
  CanvasVectorLayerRenderer2.prototype.renderDeclutter = function(frameState) {
    if (this.declutterExecutorGroup) {
      this.renderWorlds(this.declutterExecutorGroup, frameState, frameState.declutterTree);
    }
  };
  CanvasVectorLayerRenderer2.prototype.renderFrame = function(frameState, target) {
    var pixelRatio = frameState.pixelRatio;
    var layerState = frameState.layerStatesArray[frameState.layerIndex];
    makeScale(this.pixelTransform, 1 / pixelRatio, 1 / pixelRatio);
    makeInverse(this.inversePixelTransform, this.pixelTransform);
    var canvasTransform = toString(this.pixelTransform);
    this.useContainer(target, canvasTransform, layerState.opacity, this.getBackground(frameState));
    var context = this.context;
    var canvas = context.canvas;
    var replayGroup = this.replayGroup_;
    var declutterExecutorGroup = this.declutterExecutorGroup;
    if ((!replayGroup || replayGroup.isEmpty()) && (!declutterExecutorGroup || declutterExecutorGroup.isEmpty())) {
      return null;
    }
    var width = Math.round(frameState.size[0] * pixelRatio);
    var height = Math.round(frameState.size[1] * pixelRatio);
    if (canvas.width != width || canvas.height != height) {
      canvas.width = width;
      canvas.height = height;
      if (canvas.style.transform !== canvasTransform) {
        canvas.style.transform = canvasTransform;
      }
    } else if (!this.containerReused) {
      context.clearRect(0, 0, width, height);
    }
    this.preRender(context, frameState);
    var viewState = frameState.viewState;
    var projection = viewState.projection;
    var clipped = false;
    var render = true;
    if (layerState.extent && this.clipping) {
      var layerExtent = fromUserExtent(layerState.extent, projection);
      render = intersects(layerExtent, frameState.extent);
      clipped = render && !containsExtent(layerExtent, frameState.extent);
      if (clipped) {
        this.clipUnrotated(context, frameState, layerExtent);
      }
    }
    if (render) {
      this.renderWorlds(replayGroup, frameState);
    }
    if (clipped) {
      context.restore();
    }
    this.postRender(context, frameState);
    var opacity = cssOpacity(layerState.opacity);
    var container = this.container;
    if (opacity !== container.style.opacity) {
      container.style.opacity = opacity;
    }
    if (this.renderedRotation_ !== viewState.rotation) {
      this.renderedRotation_ = viewState.rotation;
      this.hitDetectionImageData_ = null;
    }
    return this.container;
  };
  CanvasVectorLayerRenderer2.prototype.getFeatures = function(pixel) {
    return new Promise(function(resolve) {
      if (!this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
        var size = [this.context.canvas.width, this.context.canvas.height];
        apply(this.pixelTransform, size);
        var center = this.renderedCenter_;
        var resolution = this.renderedResolution_;
        var rotation = this.renderedRotation_;
        var projection = this.renderedProjection_;
        var extent = this.wrappedRenderedExtent_;
        var layer = this.getLayer();
        var transforms2 = [];
        var width = size[0] * HIT_DETECT_RESOLUTION;
        var height = size[1] * HIT_DETECT_RESOLUTION;
        transforms2.push(this.getRenderTransform(center, resolution, rotation, HIT_DETECT_RESOLUTION, width, height, 0).slice());
        var source = layer.getSource();
        var projectionExtent = projection.getExtent();
        if (source.getWrapX() && projection.canWrapX() && !containsExtent(projectionExtent, extent)) {
          var startX = extent[0];
          var worldWidth = getWidth(projectionExtent);
          var world = 0;
          var offsetX = void 0;
          while (startX < projectionExtent[0]) {
            --world;
            offsetX = worldWidth * world;
            transforms2.push(this.getRenderTransform(center, resolution, rotation, HIT_DETECT_RESOLUTION, width, height, offsetX).slice());
            startX += worldWidth;
          }
          world = 0;
          startX = extent[2];
          while (startX > projectionExtent[2]) {
            ++world;
            offsetX = worldWidth * world;
            transforms2.push(this.getRenderTransform(center, resolution, rotation, HIT_DETECT_RESOLUTION, width, height, offsetX).slice());
            startX -= worldWidth;
          }
        }
        this.hitDetectionImageData_ = createHitDetectionImageData(size, transforms2, this.renderedFeatures_, layer.getStyleFunction(), extent, resolution, rotation);
      }
      resolve(hitDetect(pixel, this.renderedFeatures_, this.hitDetectionImageData_));
    }.bind(this));
  };
  CanvasVectorLayerRenderer2.prototype.forEachFeatureAtCoordinate = function(coordinate, frameState, hitTolerance, callback, matches) {
    var _this = this;
    if (!this.replayGroup_) {
      return void 0;
    }
    var resolution = frameState.viewState.resolution;
    var rotation = frameState.viewState.rotation;
    var layer = this.getLayer();
    var features = {};
    var featureCallback = function(feature, geometry, distanceSq) {
      var key = getUid(feature);
      var match = features[key];
      if (!match) {
        if (distanceSq === 0) {
          features[key] = true;
          return callback(feature, layer, geometry);
        }
        matches.push(features[key] = {
          feature,
          layer,
          geometry,
          distanceSq,
          callback
        });
      } else if (match !== true && distanceSq < match.distanceSq) {
        if (distanceSq === 0) {
          features[key] = true;
          matches.splice(matches.lastIndexOf(match), 1);
          return callback(feature, layer, geometry);
        }
        match.geometry = geometry;
        match.distanceSq = distanceSq;
      }
      return void 0;
    };
    var result;
    var executorGroups = [this.replayGroup_];
    if (this.declutterExecutorGroup) {
      executorGroups.push(this.declutterExecutorGroup);
    }
    executorGroups.some(function(executorGroup) {
      return result = executorGroup.forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, featureCallback, executorGroup === _this.declutterExecutorGroup && frameState.declutterTree ? frameState.declutterTree.all().map(function(item) {
        return item.value;
      }) : null);
    });
    return result;
  };
  CanvasVectorLayerRenderer2.prototype.handleFontsChanged = function() {
    var layer = this.getLayer();
    if (layer.getVisible() && this.replayGroup_) {
      layer.changed();
    }
  };
  CanvasVectorLayerRenderer2.prototype.handleStyleImageChange_ = function(event) {
    this.renderIfReadyAndVisible();
  };
  CanvasVectorLayerRenderer2.prototype.prepareFrame = function(frameState) {
    var vectorLayer = this.getLayer();
    var vectorSource = vectorLayer.getSource();
    if (!vectorSource) {
      return false;
    }
    var animating = frameState.viewHints[ViewHint_default.ANIMATING];
    var interacting = frameState.viewHints[ViewHint_default.INTERACTING];
    var updateWhileAnimating = vectorLayer.getUpdateWhileAnimating();
    var updateWhileInteracting = vectorLayer.getUpdateWhileInteracting();
    if (!this.dirty_ && !updateWhileAnimating && animating || !updateWhileInteracting && interacting) {
      this.animatingOrInteracting_ = true;
      return true;
    }
    this.animatingOrInteracting_ = false;
    var frameStateExtent = frameState.extent;
    var viewState = frameState.viewState;
    var projection = viewState.projection;
    var resolution = viewState.resolution;
    var pixelRatio = frameState.pixelRatio;
    var vectorLayerRevision = vectorLayer.getRevision();
    var vectorLayerRenderBuffer = vectorLayer.getRenderBuffer();
    var vectorLayerRenderOrder = vectorLayer.getRenderOrder();
    if (vectorLayerRenderOrder === void 0) {
      vectorLayerRenderOrder = defaultOrder;
    }
    var center = viewState.center.slice();
    var extent = buffer(frameStateExtent, vectorLayerRenderBuffer * resolution);
    var renderedExtent = extent.slice();
    var loadExtents = [extent.slice()];
    var projectionExtent = projection.getExtent();
    if (vectorSource.getWrapX() && projection.canWrapX() && !containsExtent(projectionExtent, frameState.extent)) {
      var worldWidth = getWidth(projectionExtent);
      var gutter = Math.max(getWidth(extent) / 2, worldWidth);
      extent[0] = projectionExtent[0] - gutter;
      extent[2] = projectionExtent[2] + gutter;
      wrapX2(center, projection);
      var loadExtent = wrapX(loadExtents[0], projection);
      if (loadExtent[0] < projectionExtent[0] && loadExtent[2] < projectionExtent[2]) {
        loadExtents.push([
          loadExtent[0] + worldWidth,
          loadExtent[1],
          loadExtent[2] + worldWidth,
          loadExtent[3]
        ]);
      } else if (loadExtent[0] > projectionExtent[0] && loadExtent[2] > projectionExtent[2]) {
        loadExtents.push([
          loadExtent[0] - worldWidth,
          loadExtent[1],
          loadExtent[2] - worldWidth,
          loadExtent[3]
        ]);
      }
    }
    if (!this.dirty_ && this.renderedResolution_ == resolution && this.renderedRevision_ == vectorLayerRevision && this.renderedRenderOrder_ == vectorLayerRenderOrder && containsExtent(this.wrappedRenderedExtent_, extent)) {
      if (!equals(this.renderedExtent_, renderedExtent)) {
        this.hitDetectionImageData_ = null;
        this.renderedExtent_ = renderedExtent;
      }
      this.renderedCenter_ = center;
      this.replayGroupChanged = false;
      return true;
    }
    this.replayGroup_ = null;
    this.dirty_ = false;
    var replayGroup = new BuilderGroup_default(getTolerance(resolution, pixelRatio), extent, resolution, pixelRatio);
    var declutterBuilderGroup;
    if (this.getLayer().getDeclutter()) {
      declutterBuilderGroup = new BuilderGroup_default(getTolerance(resolution, pixelRatio), extent, resolution, pixelRatio);
    }
    var userProjection2 = getUserProjection();
    var userTransform;
    if (userProjection2) {
      for (var i = 0, ii = loadExtents.length; i < ii; ++i) {
        var extent_1 = loadExtents[i];
        var userExtent_1 = toUserExtent(extent_1, projection);
        vectorSource.loadFeatures(userExtent_1, toUserResolution(resolution, projection), userProjection2);
      }
      userTransform = getTransformFromProjections(userProjection2, projection);
    } else {
      for (var i = 0, ii = loadExtents.length; i < ii; ++i) {
        vectorSource.loadFeatures(loadExtents[i], resolution, projection);
      }
    }
    var squaredTolerance = getSquaredTolerance(resolution, pixelRatio);
    var render = function(feature) {
      var styles;
      var styleFunction = feature.getStyleFunction() || vectorLayer.getStyleFunction();
      if (styleFunction) {
        styles = styleFunction(feature, resolution);
      }
      if (styles) {
        var dirty = this.renderFeature(feature, squaredTolerance, styles, replayGroup, userTransform, declutterBuilderGroup);
        this.dirty_ = this.dirty_ || dirty;
      }
    }.bind(this);
    var userExtent = toUserExtent(extent, projection);
    var features = vectorSource.getFeaturesInExtent(userExtent);
    if (vectorLayerRenderOrder) {
      features.sort(vectorLayerRenderOrder);
    }
    for (var i = 0, ii = features.length; i < ii; ++i) {
      render(features[i]);
    }
    this.renderedFeatures_ = features;
    var replayGroupInstructions = replayGroup.finish();
    var executorGroup = new ExecutorGroup_default(extent, resolution, pixelRatio, vectorSource.getOverlaps(), replayGroupInstructions, vectorLayer.getRenderBuffer());
    if (declutterBuilderGroup) {
      this.declutterExecutorGroup = new ExecutorGroup_default(extent, resolution, pixelRatio, vectorSource.getOverlaps(), declutterBuilderGroup.finish(), vectorLayer.getRenderBuffer());
    }
    this.renderedResolution_ = resolution;
    this.renderedRevision_ = vectorLayerRevision;
    this.renderedRenderOrder_ = vectorLayerRenderOrder;
    this.renderedExtent_ = renderedExtent;
    this.wrappedRenderedExtent_ = extent;
    this.renderedCenter_ = center;
    this.renderedProjection_ = projection;
    this.replayGroup_ = executorGroup;
    this.hitDetectionImageData_ = null;
    this.replayGroupChanged = true;
    return true;
  };
  CanvasVectorLayerRenderer2.prototype.renderFeature = function(feature, squaredTolerance, styles, builderGroup, opt_transform, opt_declutterBuilderGroup) {
    if (!styles) {
      return false;
    }
    var loading = false;
    if (Array.isArray(styles)) {
      for (var i = 0, ii = styles.length; i < ii; ++i) {
        loading = renderFeature(builderGroup, feature, styles[i], squaredTolerance, this.boundHandleStyleImageChange_, opt_transform, opt_declutterBuilderGroup) || loading;
      }
    } else {
      loading = renderFeature(builderGroup, feature, styles, squaredTolerance, this.boundHandleStyleImageChange_, opt_transform, opt_declutterBuilderGroup);
    }
    return loading;
  };
  return CanvasVectorLayerRenderer2;
}(Layer_default3);
var VectorLayer_default = CanvasVectorLayerRenderer;

// ../node_modules/ol/layer/Vector.js
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
var VectorLayer = function(_super) {
  __extends35(VectorLayer2, _super);
  function VectorLayer2(opt_options) {
    return _super.call(this, opt_options) || this;
  }
  VectorLayer2.prototype.createRenderer = function() {
    return new VectorLayer_default(this);
  };
  return VectorLayer2;
}(BaseVector_default);
var Vector_default = VectorLayer;

// ../node_modules/ol/structs/RBush.js
var import_rbush2 = __toESM(require_rbush_min(), 1);
var RBush2 = function() {
  function RBush3(opt_maxEntries) {
    this.rbush_ = new import_rbush2.default(opt_maxEntries);
    this.items_ = {};
  }
  RBush3.prototype.insert = function(extent, value) {
    var item = {
      minX: extent[0],
      minY: extent[1],
      maxX: extent[2],
      maxY: extent[3],
      value
    };
    this.rbush_.insert(item);
    this.items_[getUid(value)] = item;
  };
  RBush3.prototype.load = function(extents, values) {
    var items = new Array(values.length);
    for (var i = 0, l = values.length; i < l; i++) {
      var extent = extents[i];
      var value = values[i];
      var item = {
        minX: extent[0],
        minY: extent[1],
        maxX: extent[2],
        maxY: extent[3],
        value
      };
      items[i] = item;
      this.items_[getUid(value)] = item;
    }
    this.rbush_.load(items);
  };
  RBush3.prototype.remove = function(value) {
    var uid = getUid(value);
    var item = this.items_[uid];
    delete this.items_[uid];
    return this.rbush_.remove(item) !== null;
  };
  RBush3.prototype.update = function(extent, value) {
    var item = this.items_[getUid(value)];
    var bbox = [item.minX, item.minY, item.maxX, item.maxY];
    if (!equals2(bbox, extent)) {
      this.remove(value);
      this.insert(extent, value);
    }
  };
  RBush3.prototype.getAll = function() {
    var items = this.rbush_.all();
    return items.map(function(item) {
      return item.value;
    });
  };
  RBush3.prototype.getInExtent = function(extent) {
    var bbox = {
      minX: extent[0],
      minY: extent[1],
      maxX: extent[2],
      maxY: extent[3]
    };
    var items = this.rbush_.search(bbox);
    return items.map(function(item) {
      return item.value;
    });
  };
  RBush3.prototype.forEach = function(callback) {
    return this.forEach_(this.getAll(), callback);
  };
  RBush3.prototype.forEachInExtent = function(extent, callback) {
    return this.forEach_(this.getInExtent(extent), callback);
  };
  RBush3.prototype.forEach_ = function(values, callback) {
    var result;
    for (var i = 0, l = values.length; i < l; i++) {
      result = callback(values[i]);
      if (result) {
        return result;
      }
    }
    return result;
  };
  RBush3.prototype.isEmpty = function() {
    return isEmpty(this.items_);
  };
  RBush3.prototype.clear = function() {
    this.rbush_.clear();
    this.items_ = {};
  };
  RBush3.prototype.getExtent = function(opt_extent) {
    var data = this.rbush_.toJSON();
    return createOrUpdate(data.minX, data.minY, data.maxX, data.maxY, opt_extent);
  };
  RBush3.prototype.concat = function(rbush) {
    this.rbush_.load(rbush.rbush_.all());
    for (var i in rbush.items_) {
      this.items_[i] = rbush.items_[i];
    }
  };
  return RBush3;
}();
var RBush_default = RBush2;

// ../node_modules/ol/source/Source.js
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
var Source = function(_super) {
  __extends36(Source2, _super);
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

// ../node_modules/ol/source/VectorEventType.js
var VectorEventType_default = {
  ADDFEATURE: "addfeature",
  CHANGEFEATURE: "changefeature",
  CLEAR: "clear",
  REMOVEFEATURE: "removefeature",
  FEATURESLOADSTART: "featuresloadstart",
  FEATURESLOADEND: "featuresloadend",
  FEATURESLOADERROR: "featuresloaderror"
};

// ../node_modules/ol/loadingstrategy.js
function all(extent, resolution) {
  return [[-Infinity, -Infinity, Infinity, Infinity]];
}

// ../node_modules/ol/format/FormatType.js
var FormatType_default = {
  ARRAY_BUFFER: "arraybuffer",
  JSON: "json",
  TEXT: "text",
  XML: "xml"
};

// ../node_modules/ol/featureloader.js
var withCredentials = false;
function loadFeaturesXhr(url, format, extent, resolution, projection, success, failure) {
  var xhr2 = new XMLHttpRequest();
  xhr2.open("GET", typeof url === "function" ? url(extent, resolution, projection) : url, true);
  if (format.getType() == FormatType_default.ARRAY_BUFFER) {
    xhr2.responseType = "arraybuffer";
  }
  xhr2.withCredentials = withCredentials;
  xhr2.onload = function(event) {
    if (!xhr2.status || xhr2.status >= 200 && xhr2.status < 300) {
      var type = format.getType();
      var source = void 0;
      if (type == FormatType_default.JSON || type == FormatType_default.TEXT) {
        source = xhr2.responseText;
      } else if (type == FormatType_default.XML) {
        source = xhr2.responseXML;
        if (!source) {
          source = new DOMParser().parseFromString(xhr2.responseText, "application/xml");
        }
      } else if (type == FormatType_default.ARRAY_BUFFER) {
        source = xhr2.response;
      }
      if (source) {
        success(format.readFeatures(source, {
          extent,
          featureProjection: projection
        }), format.readProjection(source));
      } else {
        failure();
      }
    } else {
      failure();
    }
  };
  xhr2.onerror = failure;
  xhr2.send();
}
function xhr(url, format) {
  return function(extent, resolution, projection, success, failure) {
    var source = this;
    loadFeaturesXhr(url, format, extent, resolution, projection, function(features, dataProjection) {
      source.addFeatures(features);
      if (success !== void 0) {
        success(features);
      }
    }, failure ? failure : VOID);
  };
}

// ../node_modules/ol/source/Vector.js
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
var VectorSourceEvent = function(_super) {
  __extends37(VectorSourceEvent2, _super);
  function VectorSourceEvent2(type, opt_feature, opt_features) {
    var _this = _super.call(this, type) || this;
    _this.feature = opt_feature;
    _this.features = opt_features;
    return _this;
  }
  return VectorSourceEvent2;
}(Event_default);
var VectorSource = function(_super) {
  __extends37(VectorSource2, _super);
  function VectorSource2(opt_options) {
    var _this = this;
    var options = opt_options || {};
    _this = _super.call(this, {
      attributions: options.attributions,
      interpolate: true,
      projection: void 0,
      state: State_default.READY,
      wrapX: options.wrapX !== void 0 ? options.wrapX : true
    }) || this;
    _this.on;
    _this.once;
    _this.un;
    _this.loader_ = VOID;
    _this.format_ = options.format;
    _this.overlaps_ = options.overlaps === void 0 ? true : options.overlaps;
    _this.url_ = options.url;
    if (options.loader !== void 0) {
      _this.loader_ = options.loader;
    } else if (_this.url_ !== void 0) {
      assert(_this.format_, 7);
      _this.loader_ = xhr(_this.url_, _this.format_);
    }
    _this.strategy_ = options.strategy !== void 0 ? options.strategy : all;
    var useSpatialIndex = options.useSpatialIndex !== void 0 ? options.useSpatialIndex : true;
    _this.featuresRtree_ = useSpatialIndex ? new RBush_default() : null;
    _this.loadedExtentsRtree_ = new RBush_default();
    _this.loadingExtentsCount_ = 0;
    _this.nullGeometryFeatures_ = {};
    _this.idIndex_ = {};
    _this.uidIndex_ = {};
    _this.featureChangeKeys_ = {};
    _this.featuresCollection_ = null;
    var collection, features;
    if (Array.isArray(options.features)) {
      features = options.features;
    } else if (options.features) {
      collection = options.features;
      features = collection.getArray();
    }
    if (!useSpatialIndex && collection === void 0) {
      collection = new Collection_default(features);
    }
    if (features !== void 0) {
      _this.addFeaturesInternal(features);
    }
    if (collection !== void 0) {
      _this.bindFeaturesCollection_(collection);
    }
    return _this;
  }
  VectorSource2.prototype.addFeature = function(feature) {
    this.addFeatureInternal(feature);
    this.changed();
  };
  VectorSource2.prototype.addFeatureInternal = function(feature) {
    var featureKey = getUid(feature);
    if (!this.addToIndex_(featureKey, feature)) {
      if (this.featuresCollection_) {
        this.featuresCollection_.remove(feature);
      }
      return;
    }
    this.setupChangeEvents_(featureKey, feature);
    var geometry = feature.getGeometry();
    if (geometry) {
      var extent = geometry.getExtent();
      if (this.featuresRtree_) {
        this.featuresRtree_.insert(extent, feature);
      }
    } else {
      this.nullGeometryFeatures_[featureKey] = feature;
    }
    this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.ADDFEATURE, feature));
  };
  VectorSource2.prototype.setupChangeEvents_ = function(featureKey, feature) {
    this.featureChangeKeys_[featureKey] = [
      listen(feature, EventType_default.CHANGE, this.handleFeatureChange_, this),
      listen(feature, ObjectEventType_default.PROPERTYCHANGE, this.handleFeatureChange_, this)
    ];
  };
  VectorSource2.prototype.addToIndex_ = function(featureKey, feature) {
    var valid = true;
    var id = feature.getId();
    if (id !== void 0) {
      if (!(id.toString() in this.idIndex_)) {
        this.idIndex_[id.toString()] = feature;
      } else {
        valid = false;
      }
    }
    if (valid) {
      assert(!(featureKey in this.uidIndex_), 30);
      this.uidIndex_[featureKey] = feature;
    }
    return valid;
  };
  VectorSource2.prototype.addFeatures = function(features) {
    this.addFeaturesInternal(features);
    this.changed();
  };
  VectorSource2.prototype.addFeaturesInternal = function(features) {
    var extents = [];
    var newFeatures = [];
    var geometryFeatures = [];
    for (var i = 0, length_1 = features.length; i < length_1; i++) {
      var feature = features[i];
      var featureKey = getUid(feature);
      if (this.addToIndex_(featureKey, feature)) {
        newFeatures.push(feature);
      }
    }
    for (var i = 0, length_2 = newFeatures.length; i < length_2; i++) {
      var feature = newFeatures[i];
      var featureKey = getUid(feature);
      this.setupChangeEvents_(featureKey, feature);
      var geometry = feature.getGeometry();
      if (geometry) {
        var extent = geometry.getExtent();
        extents.push(extent);
        geometryFeatures.push(feature);
      } else {
        this.nullGeometryFeatures_[featureKey] = feature;
      }
    }
    if (this.featuresRtree_) {
      this.featuresRtree_.load(extents, geometryFeatures);
    }
    if (this.hasListener(VectorEventType_default.ADDFEATURE)) {
      for (var i = 0, length_3 = newFeatures.length; i < length_3; i++) {
        this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.ADDFEATURE, newFeatures[i]));
      }
    }
  };
  VectorSource2.prototype.bindFeaturesCollection_ = function(collection) {
    var modifyingCollection = false;
    this.addEventListener(VectorEventType_default.ADDFEATURE, function(evt) {
      if (!modifyingCollection) {
        modifyingCollection = true;
        collection.push(evt.feature);
        modifyingCollection = false;
      }
    });
    this.addEventListener(VectorEventType_default.REMOVEFEATURE, function(evt) {
      if (!modifyingCollection) {
        modifyingCollection = true;
        collection.remove(evt.feature);
        modifyingCollection = false;
      }
    });
    collection.addEventListener(CollectionEventType_default.ADD, function(evt) {
      if (!modifyingCollection) {
        modifyingCollection = true;
        this.addFeature(evt.element);
        modifyingCollection = false;
      }
    }.bind(this));
    collection.addEventListener(CollectionEventType_default.REMOVE, function(evt) {
      if (!modifyingCollection) {
        modifyingCollection = true;
        this.removeFeature(evt.element);
        modifyingCollection = false;
      }
    }.bind(this));
    this.featuresCollection_ = collection;
  };
  VectorSource2.prototype.clear = function(opt_fast) {
    if (opt_fast) {
      for (var featureId in this.featureChangeKeys_) {
        var keys = this.featureChangeKeys_[featureId];
        keys.forEach(unlistenByKey);
      }
      if (!this.featuresCollection_) {
        this.featureChangeKeys_ = {};
        this.idIndex_ = {};
        this.uidIndex_ = {};
      }
    } else {
      if (this.featuresRtree_) {
        var removeAndIgnoreReturn = function(feature) {
          this.removeFeatureInternal(feature);
        }.bind(this);
        this.featuresRtree_.forEach(removeAndIgnoreReturn);
        for (var id in this.nullGeometryFeatures_) {
          this.removeFeatureInternal(this.nullGeometryFeatures_[id]);
        }
      }
    }
    if (this.featuresCollection_) {
      this.featuresCollection_.clear();
    }
    if (this.featuresRtree_) {
      this.featuresRtree_.clear();
    }
    this.nullGeometryFeatures_ = {};
    var clearEvent = new VectorSourceEvent(VectorEventType_default.CLEAR);
    this.dispatchEvent(clearEvent);
    this.changed();
  };
  VectorSource2.prototype.forEachFeature = function(callback) {
    if (this.featuresRtree_) {
      return this.featuresRtree_.forEach(callback);
    } else if (this.featuresCollection_) {
      this.featuresCollection_.forEach(callback);
    }
  };
  VectorSource2.prototype.forEachFeatureAtCoordinateDirect = function(coordinate, callback) {
    var extent = [coordinate[0], coordinate[1], coordinate[0], coordinate[1]];
    return this.forEachFeatureInExtent(extent, function(feature) {
      var geometry = feature.getGeometry();
      if (geometry.intersectsCoordinate(coordinate)) {
        return callback(feature);
      } else {
        return void 0;
      }
    });
  };
  VectorSource2.prototype.forEachFeatureInExtent = function(extent, callback) {
    if (this.featuresRtree_) {
      return this.featuresRtree_.forEachInExtent(extent, callback);
    } else if (this.featuresCollection_) {
      this.featuresCollection_.forEach(callback);
    }
  };
  VectorSource2.prototype.forEachFeatureIntersectingExtent = function(extent, callback) {
    return this.forEachFeatureInExtent(extent, function(feature) {
      var geometry = feature.getGeometry();
      if (geometry.intersectsExtent(extent)) {
        var result = callback(feature);
        if (result) {
          return result;
        }
      }
    });
  };
  VectorSource2.prototype.getFeaturesCollection = function() {
    return this.featuresCollection_;
  };
  VectorSource2.prototype.getFeatures = function() {
    var features;
    if (this.featuresCollection_) {
      features = this.featuresCollection_.getArray().slice(0);
    } else if (this.featuresRtree_) {
      features = this.featuresRtree_.getAll();
      if (!isEmpty(this.nullGeometryFeatures_)) {
        extend(features, getValues(this.nullGeometryFeatures_));
      }
    }
    return features;
  };
  VectorSource2.prototype.getFeaturesAtCoordinate = function(coordinate) {
    var features = [];
    this.forEachFeatureAtCoordinateDirect(coordinate, function(feature) {
      features.push(feature);
    });
    return features;
  };
  VectorSource2.prototype.getFeaturesInExtent = function(extent) {
    if (this.featuresRtree_) {
      return this.featuresRtree_.getInExtent(extent);
    } else if (this.featuresCollection_) {
      return this.featuresCollection_.getArray().slice(0);
    } else {
      return [];
    }
  };
  VectorSource2.prototype.getClosestFeatureToCoordinate = function(coordinate, opt_filter) {
    var x = coordinate[0];
    var y = coordinate[1];
    var closestFeature = null;
    var closestPoint = [NaN, NaN];
    var minSquaredDistance = Infinity;
    var extent = [-Infinity, -Infinity, Infinity, Infinity];
    var filter = opt_filter ? opt_filter : TRUE;
    this.featuresRtree_.forEachInExtent(extent, function(feature) {
      if (filter(feature)) {
        var geometry = feature.getGeometry();
        var previousMinSquaredDistance = minSquaredDistance;
        minSquaredDistance = geometry.closestPointXY(x, y, closestPoint, minSquaredDistance);
        if (minSquaredDistance < previousMinSquaredDistance) {
          closestFeature = feature;
          var minDistance = Math.sqrt(minSquaredDistance);
          extent[0] = x - minDistance;
          extent[1] = y - minDistance;
          extent[2] = x + minDistance;
          extent[3] = y + minDistance;
        }
      }
    });
    return closestFeature;
  };
  VectorSource2.prototype.getExtent = function(opt_extent) {
    return this.featuresRtree_.getExtent(opt_extent);
  };
  VectorSource2.prototype.getFeatureById = function(id) {
    var feature = this.idIndex_[id.toString()];
    return feature !== void 0 ? feature : null;
  };
  VectorSource2.prototype.getFeatureByUid = function(uid) {
    var feature = this.uidIndex_[uid];
    return feature !== void 0 ? feature : null;
  };
  VectorSource2.prototype.getFormat = function() {
    return this.format_;
  };
  VectorSource2.prototype.getOverlaps = function() {
    return this.overlaps_;
  };
  VectorSource2.prototype.getUrl = function() {
    return this.url_;
  };
  VectorSource2.prototype.handleFeatureChange_ = function(event) {
    var feature = event.target;
    var featureKey = getUid(feature);
    var geometry = feature.getGeometry();
    if (!geometry) {
      if (!(featureKey in this.nullGeometryFeatures_)) {
        if (this.featuresRtree_) {
          this.featuresRtree_.remove(feature);
        }
        this.nullGeometryFeatures_[featureKey] = feature;
      }
    } else {
      var extent = geometry.getExtent();
      if (featureKey in this.nullGeometryFeatures_) {
        delete this.nullGeometryFeatures_[featureKey];
        if (this.featuresRtree_) {
          this.featuresRtree_.insert(extent, feature);
        }
      } else {
        if (this.featuresRtree_) {
          this.featuresRtree_.update(extent, feature);
        }
      }
    }
    var id = feature.getId();
    if (id !== void 0) {
      var sid = id.toString();
      if (this.idIndex_[sid] !== feature) {
        this.removeFromIdIndex_(feature);
        this.idIndex_[sid] = feature;
      }
    } else {
      this.removeFromIdIndex_(feature);
      this.uidIndex_[featureKey] = feature;
    }
    this.changed();
    this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.CHANGEFEATURE, feature));
  };
  VectorSource2.prototype.hasFeature = function(feature) {
    var id = feature.getId();
    if (id !== void 0) {
      return id in this.idIndex_;
    } else {
      return getUid(feature) in this.uidIndex_;
    }
  };
  VectorSource2.prototype.isEmpty = function() {
    if (this.featuresRtree_) {
      return this.featuresRtree_.isEmpty() && isEmpty(this.nullGeometryFeatures_);
    }
    if (this.featuresCollection_) {
      return this.featuresCollection_.getLength() === 0;
    }
    return true;
  };
  VectorSource2.prototype.loadFeatures = function(extent, resolution, projection) {
    var loadedExtentsRtree = this.loadedExtentsRtree_;
    var extentsToLoad = this.strategy_(extent, resolution, projection);
    var _loop_1 = function(i2, ii2) {
      var extentToLoad = extentsToLoad[i2];
      var alreadyLoaded = loadedExtentsRtree.forEachInExtent(extentToLoad, function(object) {
        return containsExtent(object.extent, extentToLoad);
      });
      if (!alreadyLoaded) {
        ++this_1.loadingExtentsCount_;
        this_1.dispatchEvent(new VectorSourceEvent(VectorEventType_default.FEATURESLOADSTART));
        this_1.loader_.call(this_1, extentToLoad, resolution, projection, function(features) {
          --this.loadingExtentsCount_;
          this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.FEATURESLOADEND, void 0, features));
        }.bind(this_1), function() {
          --this.loadingExtentsCount_;
          this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.FEATURESLOADERROR));
        }.bind(this_1));
        loadedExtentsRtree.insert(extentToLoad, { extent: extentToLoad.slice() });
      }
    };
    var this_1 = this;
    for (var i = 0, ii = extentsToLoad.length; i < ii; ++i) {
      _loop_1(i, ii);
    }
    this.loading = this.loader_.length < 4 ? false : this.loadingExtentsCount_ > 0;
  };
  VectorSource2.prototype.refresh = function() {
    this.clear(true);
    this.loadedExtentsRtree_.clear();
    _super.prototype.refresh.call(this);
  };
  VectorSource2.prototype.removeLoadedExtent = function(extent) {
    var loadedExtentsRtree = this.loadedExtentsRtree_;
    var obj;
    loadedExtentsRtree.forEachInExtent(extent, function(object) {
      if (equals2(object.extent, extent)) {
        obj = object;
        return true;
      }
    });
    if (obj) {
      loadedExtentsRtree.remove(obj);
    }
  };
  VectorSource2.prototype.removeFeature = function(feature) {
    if (!feature) {
      return;
    }
    var featureKey = getUid(feature);
    if (featureKey in this.nullGeometryFeatures_) {
      delete this.nullGeometryFeatures_[featureKey];
    } else {
      if (this.featuresRtree_) {
        this.featuresRtree_.remove(feature);
      }
    }
    var result = this.removeFeatureInternal(feature);
    if (result) {
      this.changed();
    }
  };
  VectorSource2.prototype.removeFeatureInternal = function(feature) {
    var featureKey = getUid(feature);
    var featureChangeKeys = this.featureChangeKeys_[featureKey];
    if (!featureChangeKeys) {
      return;
    }
    featureChangeKeys.forEach(unlistenByKey);
    delete this.featureChangeKeys_[featureKey];
    var id = feature.getId();
    if (id !== void 0) {
      delete this.idIndex_[id.toString()];
    }
    delete this.uidIndex_[featureKey];
    this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.REMOVEFEATURE, feature));
    return feature;
  };
  VectorSource2.prototype.removeFromIdIndex_ = function(feature) {
    var removed = false;
    for (var id in this.idIndex_) {
      if (this.idIndex_[id] === feature) {
        delete this.idIndex_[id];
        removed = true;
        break;
      }
    }
    return removed;
  };
  VectorSource2.prototype.setLoader = function(loader) {
    this.loader_ = loader;
  };
  VectorSource2.prototype.setUrl = function(url) {
    assert(this.format_, 7);
    this.url_ = url;
    this.setLoader(xhr(url, this.format_));
  };
  return VectorSource2;
}(Source_default);
var Vector_default2 = VectorSource;

// ../node_modules/ol/render.js
function getVectorContext(event) {
  if (!(event.context instanceof CanvasRenderingContext2D)) {
    throw new Error("Only works for render events from Canvas 2D layers");
  }
  var canvasPixelRatio = event.inversePixelTransform[0];
  var frameState = event.frameState;
  var transform2 = multiply(event.inversePixelTransform.slice(), frameState.coordinateToPixelTransform);
  var squaredTolerance = getSquaredTolerance(frameState.viewState.resolution, canvasPixelRatio);
  var userTransform;
  var userProjection2 = getUserProjection();
  if (userProjection2) {
    userTransform = getTransformFromProjections(userProjection2, frameState.viewState.projection);
  }
  return new Immediate_default(event.context, canvasPixelRatio, frameState.extent, transform2, frameState.viewState.rotation, squaredTolerance, userTransform);
}

// ../node_modules/ol/geom/flat/geodesic.js
function line(interpolate, transform2, squaredTolerance) {
  var flatCoordinates = [];
  var geoA = interpolate(0);
  var geoB = interpolate(1);
  var a = transform2(geoA);
  var b = transform2(geoB);
  var geoStack = [geoB, geoA];
  var stack = [b, a];
  var fractionStack = [1, 0];
  var fractions = {};
  var maxIterations = 1e5;
  var geoM, m, fracA, fracB, fracM, key;
  while (--maxIterations > 0 && fractionStack.length > 0) {
    fracA = fractionStack.pop();
    geoA = geoStack.pop();
    a = stack.pop();
    key = fracA.toString();
    if (!(key in fractions)) {
      flatCoordinates.push(a[0], a[1]);
      fractions[key] = true;
    }
    fracB = fractionStack.pop();
    geoB = geoStack.pop();
    b = stack.pop();
    fracM = (fracA + fracB) / 2;
    geoM = interpolate(fracM);
    m = transform2(geoM);
    if (squaredSegmentDistance(m[0], m[1], a[0], a[1], b[0], b[1]) < squaredTolerance) {
      flatCoordinates.push(b[0], b[1]);
      key = fracB.toString();
      fractions[key] = true;
    } else {
      fractionStack.push(fracB, fracM, fracM, fracA);
      stack.push(b, m, m, a);
      geoStack.push(geoB, geoM, geoM, geoA);
    }
  }
  return flatCoordinates;
}
function meridian(lon, lat1, lat2, projection, squaredTolerance) {
  var epsg4326Projection = get3("EPSG:4326");
  return line(function(frac) {
    return [lon, lat1 + (lat2 - lat1) * frac];
  }, getTransform(epsg4326Projection, projection), squaredTolerance);
}
function parallel(lat, lon1, lon2, projection, squaredTolerance) {
  var epsg4326Projection = get3("EPSG:4326");
  return line(function(frac) {
    return [lon1 + (lon2 - lon1) * frac, lat];
  }, getTransform(epsg4326Projection, projection), squaredTolerance);
}

// ../node_modules/ol/layer/Graticule.js
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
var DEFAULT_STROKE_STYLE = new Stroke_default({
  color: "rgba(0,0,0,0.2)"
});
var INTERVALS = [
  90,
  45,
  30,
  20,
  10,
  5,
  2,
  1,
  0.5,
  0.2,
  0.1,
  0.05,
  0.01,
  5e-3,
  2e-3,
  1e-3
];
var Graticule = function(_super) {
  __extends38(Graticule2, _super);
  function Graticule2(opt_options) {
    var _this = this;
    var options = opt_options ? opt_options : {};
    var baseOptions = assign({
      updateWhileAnimating: true,
      updateWhileInteracting: true,
      renderBuffer: 0
    }, options);
    delete baseOptions.maxLines;
    delete baseOptions.strokeStyle;
    delete baseOptions.targetSize;
    delete baseOptions.showLabels;
    delete baseOptions.lonLabelFormatter;
    delete baseOptions.latLabelFormatter;
    delete baseOptions.lonLabelPosition;
    delete baseOptions.latLabelPosition;
    delete baseOptions.lonLabelStyle;
    delete baseOptions.latLabelStyle;
    delete baseOptions.intervals;
    _this = _super.call(this, baseOptions) || this;
    _this.projection_ = null;
    _this.maxLat_ = Infinity;
    _this.maxLon_ = Infinity;
    _this.minLat_ = -Infinity;
    _this.minLon_ = -Infinity;
    _this.maxX_ = Infinity;
    _this.maxY_ = Infinity;
    _this.minX_ = -Infinity;
    _this.minY_ = -Infinity;
    _this.targetSize_ = options.targetSize !== void 0 ? options.targetSize : 100;
    _this.maxLines_ = options.maxLines !== void 0 ? options.maxLines : 100;
    _this.meridians_ = [];
    _this.parallels_ = [];
    _this.strokeStyle_ = options.strokeStyle !== void 0 ? options.strokeStyle : DEFAULT_STROKE_STYLE;
    _this.fromLonLatTransform_ = void 0;
    _this.toLonLatTransform_ = void 0;
    _this.projectionCenterLonLat_ = null;
    _this.bottomLeft_ = null;
    _this.bottomRight_ = null;
    _this.topLeft_ = null;
    _this.topRight_ = null;
    _this.meridiansLabels_ = null;
    _this.parallelsLabels_ = null;
    if (options.showLabels) {
      _this.lonLabelFormatter_ = options.lonLabelFormatter == void 0 ? degreesToStringHDMS.bind(_this, "EW") : options.lonLabelFormatter;
      _this.latLabelFormatter_ = options.latLabelFormatter == void 0 ? degreesToStringHDMS.bind(_this, "NS") : options.latLabelFormatter;
      _this.lonLabelPosition_ = options.lonLabelPosition == void 0 ? 0 : options.lonLabelPosition;
      _this.latLabelPosition_ = options.latLabelPosition == void 0 ? 1 : options.latLabelPosition;
      _this.lonLabelStyleBase_ = new Style_default({
        text: options.lonLabelStyle !== void 0 ? options.lonLabelStyle.clone() : new Text_default({
          font: "12px Calibri,sans-serif",
          textBaseline: "bottom",
          fill: new Fill_default({
            color: "rgba(0,0,0,1)"
          }),
          stroke: new Stroke_default({
            color: "rgba(255,255,255,1)",
            width: 3
          })
        })
      });
      _this.lonLabelStyle_ = function(feature) {
        var label = feature.get("graticule_label");
        this.lonLabelStyleBase_.getText().setText(label);
        return this.lonLabelStyleBase_;
      }.bind(_this);
      _this.latLabelStyleBase_ = new Style_default({
        text: options.latLabelStyle !== void 0 ? options.latLabelStyle.clone() : new Text_default({
          font: "12px Calibri,sans-serif",
          textAlign: "right",
          fill: new Fill_default({
            color: "rgba(0,0,0,1)"
          }),
          stroke: new Stroke_default({
            color: "rgba(255,255,255,1)",
            width: 3
          })
        })
      });
      _this.latLabelStyle_ = function(feature) {
        var label = feature.get("graticule_label");
        this.latLabelStyleBase_.getText().setText(label);
        return this.latLabelStyleBase_;
      }.bind(_this);
      _this.meridiansLabels_ = [];
      _this.parallelsLabels_ = [];
      _this.addEventListener(EventType_default2.POSTRENDER, _this.drawLabels_.bind(_this));
    }
    _this.intervals_ = options.intervals !== void 0 ? options.intervals : INTERVALS;
    _this.setSource(new Vector_default2({
      loader: _this.loaderFunction.bind(_this),
      strategy: _this.strategyFunction.bind(_this),
      features: new Collection_default(),
      overlaps: false,
      useSpatialIndex: false,
      wrapX: options.wrapX
    }));
    _this.featurePool_ = [];
    _this.lineStyle_ = new Style_default({
      stroke: _this.strokeStyle_
    });
    _this.loadedExtent_ = null;
    _this.renderedExtent_ = null;
    _this.renderedResolution_ = null;
    _this.setRenderOrder(null);
    return _this;
  }
  Graticule2.prototype.strategyFunction = function(extent, resolution) {
    var realWorldExtent = extent.slice();
    if (this.projection_ && this.getSource().getWrapX()) {
      wrapX(realWorldExtent, this.projection_);
    }
    if (this.loadedExtent_) {
      if (approximatelyEquals(this.loadedExtent_, realWorldExtent, resolution)) {
        realWorldExtent = this.loadedExtent_.slice();
      } else {
        this.getSource().removeLoadedExtent(this.loadedExtent_);
      }
    }
    return [realWorldExtent];
  };
  Graticule2.prototype.loaderFunction = function(extent, resolution, projection) {
    this.loadedExtent_ = extent;
    var source = this.getSource();
    var layerExtent = this.getExtent() || [
      -Infinity,
      -Infinity,
      Infinity,
      Infinity
    ];
    var renderExtent = getIntersection(layerExtent, extent);
    if (this.renderedExtent_ && equals2(this.renderedExtent_, renderExtent) && this.renderedResolution_ === resolution) {
      return;
    }
    this.renderedExtent_ = renderExtent;
    this.renderedResolution_ = resolution;
    if (isEmpty2(renderExtent)) {
      return;
    }
    var center = getCenter(renderExtent);
    var squaredTolerance = resolution * resolution / 4;
    var updateProjectionInfo = !this.projection_ || !equivalent(this.projection_, projection);
    if (updateProjectionInfo) {
      this.updateProjectionInfo_(projection);
    }
    this.createGraticule_(renderExtent, center, resolution, squaredTolerance);
    var featureCount = this.meridians_.length + this.parallels_.length;
    if (this.meridiansLabels_) {
      featureCount += this.meridians_.length;
    }
    if (this.parallelsLabels_) {
      featureCount += this.parallels_.length;
    }
    var feature;
    while (featureCount > this.featurePool_.length) {
      feature = new Feature_default();
      this.featurePool_.push(feature);
    }
    var featuresColl = source.getFeaturesCollection();
    featuresColl.clear();
    var poolIndex = 0;
    var i, l;
    for (i = 0, l = this.meridians_.length; i < l; ++i) {
      feature = this.featurePool_[poolIndex++];
      feature.setGeometry(this.meridians_[i]);
      feature.setStyle(this.lineStyle_);
      featuresColl.push(feature);
    }
    for (i = 0, l = this.parallels_.length; i < l; ++i) {
      feature = this.featurePool_[poolIndex++];
      feature.setGeometry(this.parallels_[i]);
      feature.setStyle(this.lineStyle_);
      featuresColl.push(feature);
    }
  };
  Graticule2.prototype.addMeridian_ = function(lon, minLat, maxLat, squaredTolerance, extent, index) {
    var lineString = this.getMeridian_(lon, minLat, maxLat, squaredTolerance, index);
    if (intersects(lineString.getExtent(), extent)) {
      if (this.meridiansLabels_) {
        var text = this.lonLabelFormatter_(lon);
        if (index in this.meridiansLabels_) {
          this.meridiansLabels_[index].text = text;
        } else {
          this.meridiansLabels_[index] = {
            geom: new Point_default([]),
            text
          };
        }
      }
      this.meridians_[index++] = lineString;
    }
    return index;
  };
  Graticule2.prototype.addParallel_ = function(lat, minLon, maxLon, squaredTolerance, extent, index) {
    var lineString = this.getParallel_(lat, minLon, maxLon, squaredTolerance, index);
    if (intersects(lineString.getExtent(), extent)) {
      if (this.parallelsLabels_) {
        var text = this.latLabelFormatter_(lat);
        if (index in this.parallelsLabels_) {
          this.parallelsLabels_[index].text = text;
        } else {
          this.parallelsLabels_[index] = {
            geom: new Point_default([]),
            text
          };
        }
      }
      this.parallels_[index++] = lineString;
    }
    return index;
  };
  Graticule2.prototype.drawLabels_ = function(event) {
    var rotation = event.frameState.viewState.rotation;
    var resolution = event.frameState.viewState.resolution;
    var size = event.frameState.size;
    var extent = event.frameState.extent;
    var rotationCenter = getCenter(extent);
    var rotationExtent = extent;
    if (rotation) {
      var unrotatedWidth = size[0] * resolution;
      var unrotatedHeight = size[1] * resolution;
      rotationExtent = [
        rotationCenter[0] - unrotatedWidth / 2,
        rotationCenter[1] - unrotatedHeight / 2,
        rotationCenter[0] + unrotatedWidth / 2,
        rotationCenter[1] + unrotatedHeight / 2
      ];
    }
    var startWorld = 0;
    var endWorld = 0;
    var labelsAtStart = this.latLabelPosition_ < 0.5;
    var projectionExtent = this.projection_.getExtent();
    var worldWidth = getWidth(projectionExtent);
    if (this.getSource().getWrapX() && this.projection_.canWrapX() && !containsExtent(projectionExtent, extent)) {
      startWorld = Math.floor((extent[0] - projectionExtent[0]) / worldWidth);
      endWorld = Math.ceil((extent[2] - projectionExtent[2]) / worldWidth);
      var inverted = Math.abs(rotation) > Math.PI / 2;
      labelsAtStart = labelsAtStart !== inverted;
    }
    var vectorContext = getVectorContext(event);
    for (var world = startWorld; world <= endWorld; ++world) {
      var poolIndex = this.meridians_.length + this.parallels_.length;
      var feature = void 0, index = void 0, l = void 0, textPoint = void 0;
      if (this.meridiansLabels_) {
        for (index = 0, l = this.meridiansLabels_.length; index < l; ++index) {
          var lineString = this.meridians_[index];
          if (!rotation && world === 0) {
            textPoint = this.getMeridianPoint_(lineString, extent, index);
          } else {
            var clone2 = lineString.clone();
            clone2.translate(world * worldWidth, 0);
            clone2.rotate(-rotation, rotationCenter);
            textPoint = this.getMeridianPoint_(clone2, rotationExtent, index);
            textPoint.rotate(rotation, rotationCenter);
          }
          feature = this.featurePool_[poolIndex++];
          feature.setGeometry(textPoint);
          feature.set("graticule_label", this.meridiansLabels_[index].text);
          vectorContext.drawFeature(feature, this.lonLabelStyle_(feature));
        }
      }
      if (this.parallelsLabels_) {
        if (world === startWorld && labelsAtStart || world === endWorld && !labelsAtStart) {
          for (index = 0, l = this.parallels_.length; index < l; ++index) {
            var lineString = this.parallels_[index];
            if (!rotation && world === 0) {
              textPoint = this.getParallelPoint_(lineString, extent, index);
            } else {
              var clone2 = lineString.clone();
              clone2.translate(world * worldWidth, 0);
              clone2.rotate(-rotation, rotationCenter);
              textPoint = this.getParallelPoint_(clone2, rotationExtent, index);
              textPoint.rotate(rotation, rotationCenter);
            }
            feature = this.featurePool_[poolIndex++];
            feature.setGeometry(textPoint);
            feature.set("graticule_label", this.parallelsLabels_[index].text);
            vectorContext.drawFeature(feature, this.latLabelStyle_(feature));
          }
        }
      }
    }
  };
  Graticule2.prototype.createGraticule_ = function(extent, center, resolution, squaredTolerance) {
    var interval = this.getInterval_(resolution);
    if (interval == -1) {
      this.meridians_.length = 0;
      this.parallels_.length = 0;
      if (this.meridiansLabels_) {
        this.meridiansLabels_.length = 0;
      }
      if (this.parallelsLabels_) {
        this.parallelsLabels_.length = 0;
      }
      return;
    }
    var wrapX3 = false;
    var projectionExtent = this.projection_.getExtent();
    var worldWidth = getWidth(projectionExtent);
    if (this.getSource().getWrapX() && this.projection_.canWrapX() && !containsExtent(projectionExtent, extent)) {
      if (getWidth(extent) >= worldWidth) {
        extent[0] = projectionExtent[0];
        extent[2] = projectionExtent[2];
      } else {
        wrapX3 = true;
      }
    }
    var validCenterP = [
      clamp(center[0], this.minX_, this.maxX_),
      clamp(center[1], this.minY_, this.maxY_)
    ];
    var centerLonLat = this.toLonLatTransform_(validCenterP);
    if (isNaN(centerLonLat[1])) {
      centerLonLat[1] = Math.abs(this.maxLat_) >= Math.abs(this.minLat_) ? this.maxLat_ : this.minLat_;
    }
    var centerLon = clamp(centerLonLat[0], this.minLon_, this.maxLon_);
    var centerLat = clamp(centerLonLat[1], this.minLat_, this.maxLat_);
    var maxLines = this.maxLines_;
    var cnt, idx, lat, lon;
    var validExtentP = extent;
    if (!wrapX3) {
      validExtentP = [
        clamp(extent[0], this.minX_, this.maxX_),
        clamp(extent[1], this.minY_, this.maxY_),
        clamp(extent[2], this.minX_, this.maxX_),
        clamp(extent[3], this.minY_, this.maxY_)
      ];
    }
    var validExtent = applyTransform(validExtentP, this.toLonLatTransform_, void 0, 8);
    var maxLat = validExtent[3];
    var maxLon = validExtent[2];
    var minLat = validExtent[1];
    var minLon = validExtent[0];
    if (!wrapX3) {
      if (containsCoordinate(validExtentP, this.bottomLeft_)) {
        minLon = this.minLon_;
        minLat = this.minLat_;
      }
      if (containsCoordinate(validExtentP, this.bottomRight_)) {
        maxLon = this.maxLon_;
        minLat = this.minLat_;
      }
      if (containsCoordinate(validExtentP, this.topLeft_)) {
        minLon = this.minLon_;
        maxLat = this.maxLat_;
      }
      if (containsCoordinate(validExtentP, this.topRight_)) {
        maxLon = this.maxLon_;
        maxLat = this.maxLat_;
      }
      maxLat = clamp(maxLat, centerLat, this.maxLat_);
      maxLon = clamp(maxLon, centerLon, this.maxLon_);
      minLat = clamp(minLat, this.minLat_, centerLat);
      minLon = clamp(minLon, this.minLon_, centerLon);
    }
    centerLon = Math.floor(centerLon / interval) * interval;
    lon = clamp(centerLon, this.minLon_, this.maxLon_);
    idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, 0);
    cnt = 0;
    if (wrapX3) {
      while ((lon -= interval) >= minLon && cnt++ < maxLines) {
        idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
      }
    } else {
      while (lon != this.minLon_ && cnt++ < maxLines) {
        lon = Math.max(lon - interval, this.minLon_);
        idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
      }
    }
    lon = clamp(centerLon, this.minLon_, this.maxLon_);
    cnt = 0;
    if (wrapX3) {
      while ((lon += interval) <= maxLon && cnt++ < maxLines) {
        idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
      }
    } else {
      while (lon != this.maxLon_ && cnt++ < maxLines) {
        lon = Math.min(lon + interval, this.maxLon_);
        idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
      }
    }
    this.meridians_.length = idx;
    if (this.meridiansLabels_) {
      this.meridiansLabels_.length = idx;
    }
    centerLat = Math.floor(centerLat / interval) * interval;
    lat = clamp(centerLat, this.minLat_, this.maxLat_);
    idx = this.addParallel_(lat, minLon, maxLon, squaredTolerance, extent, 0);
    cnt = 0;
    while (lat != this.minLat_ && cnt++ < maxLines) {
      lat = Math.max(lat - interval, this.minLat_);
      idx = this.addParallel_(lat, minLon, maxLon, squaredTolerance, extent, idx);
    }
    lat = clamp(centerLat, this.minLat_, this.maxLat_);
    cnt = 0;
    while (lat != this.maxLat_ && cnt++ < maxLines) {
      lat = Math.min(lat + interval, this.maxLat_);
      idx = this.addParallel_(lat, minLon, maxLon, squaredTolerance, extent, idx);
    }
    this.parallels_.length = idx;
    if (this.parallelsLabels_) {
      this.parallelsLabels_.length = idx;
    }
  };
  Graticule2.prototype.getInterval_ = function(resolution) {
    var centerLon = this.projectionCenterLonLat_[0];
    var centerLat = this.projectionCenterLonLat_[1];
    var interval = -1;
    var target = Math.pow(this.targetSize_ * resolution, 2);
    var p12 = [];
    var p22 = [];
    for (var i = 0, ii = this.intervals_.length; i < ii; ++i) {
      var delta = clamp(this.intervals_[i] / 2, 0, 90);
      var clampedLat = clamp(centerLat, -90 + delta, 90 - delta);
      p12[0] = centerLon - delta;
      p12[1] = clampedLat - delta;
      p22[0] = centerLon + delta;
      p22[1] = clampedLat + delta;
      this.fromLonLatTransform_(p12, p12);
      this.fromLonLatTransform_(p22, p22);
      var dist = Math.pow(p22[0] - p12[0], 2) + Math.pow(p22[1] - p12[1], 2);
      if (dist <= target) {
        break;
      }
      interval = this.intervals_[i];
    }
    return interval;
  };
  Graticule2.prototype.getMeridian_ = function(lon, minLat, maxLat, squaredTolerance, index) {
    var flatCoordinates = meridian(lon, minLat, maxLat, this.projection_, squaredTolerance);
    var lineString = this.meridians_[index];
    if (!lineString) {
      lineString = new LineString_default(flatCoordinates, GeometryLayout_default.XY);
      this.meridians_[index] = lineString;
    } else {
      lineString.setFlatCoordinates(GeometryLayout_default.XY, flatCoordinates);
      lineString.changed();
    }
    return lineString;
  };
  Graticule2.prototype.getMeridianPoint_ = function(lineString, extent, index) {
    var flatCoordinates = lineString.getFlatCoordinates();
    var bottom = 1;
    var top = flatCoordinates.length - 1;
    if (flatCoordinates[bottom] > flatCoordinates[top]) {
      bottom = top;
      top = 1;
    }
    var clampedBottom = Math.max(extent[1], flatCoordinates[bottom]);
    var clampedTop = Math.min(extent[3], flatCoordinates[top]);
    var lat = clamp(extent[1] + Math.abs(extent[1] - extent[3]) * this.lonLabelPosition_, clampedBottom, clampedTop);
    var coordinate0 = flatCoordinates[bottom - 1] + (flatCoordinates[top - 1] - flatCoordinates[bottom - 1]) * (lat - flatCoordinates[bottom]) / (flatCoordinates[top] - flatCoordinates[bottom]);
    var coordinate = [coordinate0, lat];
    var point = this.meridiansLabels_[index].geom;
    point.setCoordinates(coordinate);
    return point;
  };
  Graticule2.prototype.getMeridians = function() {
    return this.meridians_;
  };
  Graticule2.prototype.getParallel_ = function(lat, minLon, maxLon, squaredTolerance, index) {
    var flatCoordinates = parallel(lat, minLon, maxLon, this.projection_, squaredTolerance);
    var lineString = this.parallels_[index];
    if (!lineString) {
      lineString = new LineString_default(flatCoordinates, GeometryLayout_default.XY);
    } else {
      lineString.setFlatCoordinates(GeometryLayout_default.XY, flatCoordinates);
      lineString.changed();
    }
    return lineString;
  };
  Graticule2.prototype.getParallelPoint_ = function(lineString, extent, index) {
    var flatCoordinates = lineString.getFlatCoordinates();
    var left = 0;
    var right = flatCoordinates.length - 2;
    if (flatCoordinates[left] > flatCoordinates[right]) {
      left = right;
      right = 0;
    }
    var clampedLeft = Math.max(extent[0], flatCoordinates[left]);
    var clampedRight = Math.min(extent[2], flatCoordinates[right]);
    var lon = clamp(extent[0] + Math.abs(extent[0] - extent[2]) * this.latLabelPosition_, clampedLeft, clampedRight);
    var coordinate1 = flatCoordinates[left + 1] + (flatCoordinates[right + 1] - flatCoordinates[left + 1]) * (lon - flatCoordinates[left]) / (flatCoordinates[right] - flatCoordinates[left]);
    var coordinate = [lon, coordinate1];
    var point = this.parallelsLabels_[index].geom;
    point.setCoordinates(coordinate);
    return point;
  };
  Graticule2.prototype.getParallels = function() {
    return this.parallels_;
  };
  Graticule2.prototype.updateProjectionInfo_ = function(projection) {
    var epsg4326Projection = get3("EPSG:4326");
    var worldExtent = projection.getWorldExtent();
    this.maxLat_ = worldExtent[3];
    this.maxLon_ = worldExtent[2];
    this.minLat_ = worldExtent[1];
    this.minLon_ = worldExtent[0];
    var toLonLatTransform = getTransform(projection, epsg4326Projection);
    if (this.minLon_ < this.maxLon_) {
      this.toLonLatTransform_ = toLonLatTransform;
    } else {
      var split_1 = this.minLon_ + this.maxLon_ / 2;
      this.maxLon_ += 360;
      this.toLonLatTransform_ = function(coordinates2, opt_output, opt_dimension) {
        var dimension = opt_dimension || 2;
        var lonLatCoordinates = toLonLatTransform(coordinates2, opt_output, dimension);
        for (var i = 0, l = lonLatCoordinates.length; i < l; i += dimension) {
          if (lonLatCoordinates[i] < split_1) {
            lonLatCoordinates[i] += 360;
          }
        }
        return lonLatCoordinates;
      };
    }
    this.fromLonLatTransform_ = getTransform(epsg4326Projection, projection);
    var worldExtentP = applyTransform([this.minLon_, this.minLat_, this.maxLon_, this.maxLat_], this.fromLonLatTransform_, void 0, 8);
    this.minX_ = worldExtentP[0];
    this.maxX_ = worldExtentP[2];
    this.minY_ = worldExtentP[1];
    this.maxY_ = worldExtentP[3];
    this.bottomLeft_ = this.fromLonLatTransform_([this.minLon_, this.minLat_]);
    this.bottomRight_ = this.fromLonLatTransform_([this.maxLon_, this.minLat_]);
    this.topLeft_ = this.fromLonLatTransform_([this.minLon_, this.maxLat_]);
    this.topRight_ = this.fromLonLatTransform_([this.maxLon_, this.maxLat_]);
    this.projectionCenterLonLat_ = this.toLonLatTransform_(getCenter(projection.getExtent()));
    if (isNaN(this.projectionCenterLonLat_[1])) {
      this.projectionCenterLonLat_[1] = Math.abs(this.maxLat_) >= Math.abs(this.minLat_) ? this.maxLat_ : this.minLat_;
    }
    this.projection_ = projection;
  };
  return Graticule2;
}(Vector_default);
var Graticule_default = Graticule;

// ../node_modules/ol/ImageCanvas.js
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
var ImageCanvas = function(_super) {
  __extends39(ImageCanvas2, _super);
  function ImageCanvas2(extent, resolution, pixelRatio, canvas, opt_loader) {
    var _this = this;
    var state = opt_loader !== void 0 ? ImageState_default.IDLE : ImageState_default.LOADED;
    _this = _super.call(this, extent, resolution, pixelRatio, state) || this;
    _this.loader_ = opt_loader !== void 0 ? opt_loader : null;
    _this.canvas_ = canvas;
    _this.error_ = null;
    return _this;
  }
  ImageCanvas2.prototype.getError = function() {
    return this.error_;
  };
  ImageCanvas2.prototype.handleLoad_ = function(err) {
    if (err) {
      this.error_ = err;
      this.state = ImageState_default.ERROR;
    } else {
      this.state = ImageState_default.LOADED;
    }
    this.changed();
  };
  ImageCanvas2.prototype.load = function() {
    if (this.state == ImageState_default.IDLE) {
      this.state = ImageState_default.LOADING;
      this.changed();
      this.loader_(this.handleLoad_.bind(this));
    }
  };
  ImageCanvas2.prototype.getImage = function() {
    return this.canvas_;
  };
  return ImageCanvas2;
}(ImageBase_default);
var ImageCanvas_default = ImageCanvas;

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
function easeOut(t) {
  return 1 - easeIn(1 - t);
}
function inAndOut(t) {
  return 3 * t * t - 2 * t * t * t;
}
function linear(t) {
  return t;
}

// ../node_modules/ol/Tile.js
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
var Tile = function(_super) {
  __extends40(Tile2, _super);
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

// ../node_modules/ol/ImageTile.js
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
var ImageTile = function(_super) {
  __extends41(ImageTile2, _super);
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

// ../node_modules/ol/renderer/Map.js
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
var MapRenderer = function(_super) {
  __extends42(MapRenderer2, _super);
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
    var translatedCoordinate = wrapX2(coordinate.slice(), projection);
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

// ../node_modules/ol/renderer/Composite.js
var __extends43 = function() {
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
  __extends43(CompositeMapRenderer2, _super);
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

// ../node_modules/ol/layer/Group.js
var __extends44 = function() {
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
  __extends44(GroupEvent2, _super);
  function GroupEvent2(type, layer) {
    var _this = _super.call(this, type) || this;
    _this.layer = layer;
    return _this;
  }
  return GroupEvent2;
}(Event_default);
var Property4 = {
  LAYERS: "layers"
};
var LayerGroup = function(_super) {
  __extends44(LayerGroup2, _super);
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
    _this.addChangeListener(Property4.LAYERS, _this.handleLayersChanged_);
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
    return this.get(Property4.LAYERS);
  };
  LayerGroup2.prototype.setLayers = function(layers) {
    var collection = this.getLayers();
    if (collection) {
      var currentLayers = collection.getArray();
      for (var i = 0, ii = currentLayers.length; i < ii; ++i) {
        this.dispatchEvent(new GroupEvent("removelayer", currentLayers[i]));
      }
    }
    this.set(Property4.LAYERS, layers);
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
var __extends45 = function() {
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
  __extends45(MapEvent2, _super);
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
var __extends46 = function() {
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
  __extends46(MapBrowserEvent2, _super);
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
var __extends47 = function() {
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
  __extends47(MapBrowserEventHandler2, _super);
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

// ../node_modules/ol/TileQueue.js
var __extends48 = function() {
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
  __extends48(TileQueue2, _super);
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

// ../node_modules/ol/ViewProperty.js
var ViewProperty_default = {
  CENTER: "center",
  RESOLUTION: "resolution",
  ROTATION: "rotation"
};

// ../node_modules/ol/tilegrid/common.js
var DEFAULT_TILE_SIZE = 256;

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
      var offset2 = -direction * (0.5 - tolerance) + 0.5;
      var capped = Math.min(cappedMaxRes, resolution);
      var cappedZoomLevel = Math.floor(Math.log(maxResolution / capped) / Math.log(power) + offset2);
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

// ../node_modules/ol/View.js
var __extends49 = function() {
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
  __extends49(View2, _super);
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
    var offset2 = this.minZoom_ || 0;
    var max, zoomFactor;
    if (this.resolutions_) {
      var nearest = linearFindNearest(this.resolutions_, resolution, 1);
      offset2 = nearest;
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
    return offset2 + Math.log(max / resolution) / Math.log(zoomFactor);
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

// ../node_modules/ol/PluggableMap.js
var __extends50 = function() {
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
  __extends50(PluggableMap2, _super);
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
        var moveStart = !this.previousExtent_ || !isEmpty2(this.previousExtent_) && !equals2(frameState.extent, this.previousExtent_);
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
var __extends51 = function() {
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
  __extends51(Control2, _super);
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
var __extends52 = function() {
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
  __extends52(Attribution2, _super);
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
var __extends53 = function() {
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
  __extends53(Rotate2, _super);
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
var __extends54 = function() {
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
  __extends54(Zoom2, _super);
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

// ../node_modules/ol/OverlayPositioning.js
var OverlayPositioning_default = {
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_CENTER: "bottom-center",
  BOTTOM_RIGHT: "bottom-right",
  CENTER_LEFT: "center-left",
  CENTER_CENTER: "center-center",
  CENTER_RIGHT: "center-right",
  TOP_LEFT: "top-left",
  TOP_CENTER: "top-center",
  TOP_RIGHT: "top-right"
};

// ../node_modules/ol/Overlay.js
var __extends55 = function() {
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
var Property5 = {
  ELEMENT: "element",
  MAP: "map",
  OFFSET: "offset",
  POSITION: "position",
  POSITIONING: "positioning"
};
var Overlay = function(_super) {
  __extends55(Overlay2, _super);
  function Overlay2(options) {
    var _this = _super.call(this) || this;
    _this.on;
    _this.once;
    _this.un;
    _this.options = options;
    _this.id = options.id;
    _this.insertFirst = options.insertFirst !== void 0 ? options.insertFirst : true;
    _this.stopEvent = options.stopEvent !== void 0 ? options.stopEvent : true;
    _this.element = document.createElement("div");
    _this.element.className = options.className !== void 0 ? options.className : "ol-overlay-container " + CLASS_SELECTABLE;
    _this.element.style.position = "absolute";
    _this.element.style.pointerEvents = "auto";
    var autoPan = options.autoPan;
    if (autoPan && typeof autoPan !== "object") {
      autoPan = {
        animation: options.autoPanAnimation,
        margin: options.autoPanMargin
      };
    }
    _this.autoPan = autoPan || false;
    _this.rendered = {
      transform_: "",
      visible: true
    };
    _this.mapPostrenderListenerKey = null;
    _this.addChangeListener(Property5.ELEMENT, _this.handleElementChanged);
    _this.addChangeListener(Property5.MAP, _this.handleMapChanged);
    _this.addChangeListener(Property5.OFFSET, _this.handleOffsetChanged);
    _this.addChangeListener(Property5.POSITION, _this.handlePositionChanged);
    _this.addChangeListener(Property5.POSITIONING, _this.handlePositioningChanged);
    if (options.element !== void 0) {
      _this.setElement(options.element);
    }
    _this.setOffset(options.offset !== void 0 ? options.offset : [0, 0]);
    _this.setPositioning(options.positioning !== void 0 ? options.positioning : OverlayPositioning_default.TOP_LEFT);
    if (options.position !== void 0) {
      _this.setPosition(options.position);
    }
    return _this;
  }
  Overlay2.prototype.getElement = function() {
    return this.get(Property5.ELEMENT);
  };
  Overlay2.prototype.getId = function() {
    return this.id;
  };
  Overlay2.prototype.getMap = function() {
    return this.get(Property5.MAP) || null;
  };
  Overlay2.prototype.getOffset = function() {
    return this.get(Property5.OFFSET);
  };
  Overlay2.prototype.getPosition = function() {
    return this.get(Property5.POSITION);
  };
  Overlay2.prototype.getPositioning = function() {
    return this.get(Property5.POSITIONING);
  };
  Overlay2.prototype.handleElementChanged = function() {
    removeChildren(this.element);
    var element = this.getElement();
    if (element) {
      this.element.appendChild(element);
    }
  };
  Overlay2.prototype.handleMapChanged = function() {
    if (this.mapPostrenderListenerKey) {
      removeNode(this.element);
      unlistenByKey(this.mapPostrenderListenerKey);
      this.mapPostrenderListenerKey = null;
    }
    var map = this.getMap();
    if (map) {
      this.mapPostrenderListenerKey = listen(map, MapEventType_default.POSTRENDER, this.render, this);
      this.updatePixelPosition();
      var container = this.stopEvent ? map.getOverlayContainerStopEvent() : map.getOverlayContainer();
      if (this.insertFirst) {
        container.insertBefore(this.element, container.childNodes[0] || null);
      } else {
        container.appendChild(this.element);
      }
      this.performAutoPan();
    }
  };
  Overlay2.prototype.render = function() {
    this.updatePixelPosition();
  };
  Overlay2.prototype.handleOffsetChanged = function() {
    this.updatePixelPosition();
  };
  Overlay2.prototype.handlePositionChanged = function() {
    this.updatePixelPosition();
    this.performAutoPan();
  };
  Overlay2.prototype.handlePositioningChanged = function() {
    this.updatePixelPosition();
  };
  Overlay2.prototype.setElement = function(element) {
    this.set(Property5.ELEMENT, element);
  };
  Overlay2.prototype.setMap = function(map) {
    this.set(Property5.MAP, map);
  };
  Overlay2.prototype.setOffset = function(offset2) {
    this.set(Property5.OFFSET, offset2);
  };
  Overlay2.prototype.setPosition = function(position) {
    this.set(Property5.POSITION, position);
  };
  Overlay2.prototype.performAutoPan = function() {
    if (this.autoPan) {
      this.panIntoView(this.autoPan);
    }
  };
  Overlay2.prototype.panIntoView = function(opt_panIntoViewOptions) {
    var map = this.getMap();
    if (!map || !map.getTargetElement() || !this.get(Property5.POSITION)) {
      return;
    }
    var mapRect = this.getRect(map.getTargetElement(), map.getSize());
    var element = this.getElement();
    var overlayRect = this.getRect(element, [
      outerWidth(element),
      outerHeight(element)
    ]);
    var panIntoViewOptions = opt_panIntoViewOptions || {};
    var myMargin = panIntoViewOptions.margin === void 0 ? 20 : panIntoViewOptions.margin;
    if (!containsExtent(mapRect, overlayRect)) {
      var offsetLeft = overlayRect[0] - mapRect[0];
      var offsetRight = mapRect[2] - overlayRect[2];
      var offsetTop = overlayRect[1] - mapRect[1];
      var offsetBottom = mapRect[3] - overlayRect[3];
      var delta = [0, 0];
      if (offsetLeft < 0) {
        delta[0] = offsetLeft - myMargin;
      } else if (offsetRight < 0) {
        delta[0] = Math.abs(offsetRight) + myMargin;
      }
      if (offsetTop < 0) {
        delta[1] = offsetTop - myMargin;
      } else if (offsetBottom < 0) {
        delta[1] = Math.abs(offsetBottom) + myMargin;
      }
      if (delta[0] !== 0 || delta[1] !== 0) {
        var center = map.getView().getCenterInternal();
        var centerPx = map.getPixelFromCoordinateInternal(center);
        if (!centerPx) {
          return;
        }
        var newCenterPx = [centerPx[0] + delta[0], centerPx[1] + delta[1]];
        var panOptions = panIntoViewOptions.animation || {};
        map.getView().animateInternal({
          center: map.getCoordinateFromPixelInternal(newCenterPx),
          duration: panOptions.duration,
          easing: panOptions.easing
        });
      }
    }
  };
  Overlay2.prototype.getRect = function(element, size) {
    var box = element.getBoundingClientRect();
    var offsetX = box.left + window.pageXOffset;
    var offsetY = box.top + window.pageYOffset;
    return [offsetX, offsetY, offsetX + size[0], offsetY + size[1]];
  };
  Overlay2.prototype.setPositioning = function(positioning) {
    this.set(Property5.POSITIONING, positioning);
  };
  Overlay2.prototype.setVisible = function(visible) {
    if (this.rendered.visible !== visible) {
      this.element.style.display = visible ? "" : "none";
      this.rendered.visible = visible;
    }
  };
  Overlay2.prototype.updatePixelPosition = function() {
    var map = this.getMap();
    var position = this.getPosition();
    if (!map || !map.isRendered() || !position) {
      this.setVisible(false);
      return;
    }
    var pixel = map.getPixelFromCoordinate(position);
    var mapSize = map.getSize();
    this.updateRenderedPosition(pixel, mapSize);
  };
  Overlay2.prototype.updateRenderedPosition = function(pixel, mapSize) {
    var style = this.element.style;
    var offset2 = this.getOffset();
    var positioning = this.getPositioning();
    this.setVisible(true);
    var x = Math.round(pixel[0] + offset2[0]) + "px";
    var y = Math.round(pixel[1] + offset2[1]) + "px";
    var posX = "0%";
    var posY = "0%";
    if (positioning == OverlayPositioning_default.BOTTOM_RIGHT || positioning == OverlayPositioning_default.CENTER_RIGHT || positioning == OverlayPositioning_default.TOP_RIGHT) {
      posX = "-100%";
    } else if (positioning == OverlayPositioning_default.BOTTOM_CENTER || positioning == OverlayPositioning_default.CENTER_CENTER || positioning == OverlayPositioning_default.TOP_CENTER) {
      posX = "-50%";
    }
    if (positioning == OverlayPositioning_default.BOTTOM_LEFT || positioning == OverlayPositioning_default.BOTTOM_CENTER || positioning == OverlayPositioning_default.BOTTOM_RIGHT) {
      posY = "-100%";
    } else if (positioning == OverlayPositioning_default.CENTER_LEFT || positioning == OverlayPositioning_default.CENTER_CENTER || positioning == OverlayPositioning_default.CENTER_RIGHT) {
      posY = "-50%";
    }
    var transform2 = "translate(".concat(posX, ", ").concat(posY, ") translate(").concat(x, ", ").concat(y, ")");
    if (this.rendered.transform_ != transform2) {
      this.rendered.transform_ = transform2;
      style.transform = transform2;
      style.msTransform = transform2;
    }
  };
  Overlay2.prototype.getOptions = function() {
    return this.options;
  };
  return Overlay2;
}(Object_default);
var Overlay_default = Overlay;

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
var __extends56 = function() {
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
  __extends56(Interaction2, _super);
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
var __extends57 = function() {
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
  __extends57(DoubleClickZoom2, _super);
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
var __extends58 = function() {
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
  __extends58(PointerInteraction2, _super);
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
function all2(var_args) {
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
var __extends59 = function() {
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
  __extends59(DragPan2, _super);
  function DragPan2(opt_options) {
    var _this = _super.call(this, {
      stopDown: FALSE
    }) || this;
    var options = opt_options ? opt_options : {};
    _this.kinetic_ = options.kinetic;
    _this.lastCentroid = null;
    _this.lastPointersCount_;
    _this.panning_ = false;
    var condition = options.condition ? options.condition : all2(noModifierKeys, primaryAction);
    _this.condition_ = options.onFocusOnly ? all2(focusWithTabindex, condition) : condition;
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
var __extends60 = function() {
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
  __extends60(DragRotate2, _super);
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
    var offset2 = mapBrowserEvent.pixel;
    var theta = Math.atan2(size[1] / 2 - offset2[1], offset2[0] - size[0] / 2);
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
var __extends61 = function() {
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
  __extends61(RenderBox2, _super);
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
var __extends62 = function() {
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
  __extends62(DragBoxEvent2, _super);
  function DragBoxEvent2(type, coordinate, mapBrowserEvent) {
    var _this = _super.call(this, type) || this;
    _this.coordinate = coordinate;
    _this.mapBrowserEvent = mapBrowserEvent;
    return _this;
  }
  return DragBoxEvent2;
}(Event_default);
var DragBox = function(_super) {
  __extends62(DragBox2, _super);
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
var __extends63 = function() {
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
  __extends63(DragZoom2, _super);
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
var __extends64 = function() {
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
  __extends64(KeyboardPan2, _super);
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
var __extends65 = function() {
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
  __extends65(KeyboardZoom2, _super);
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

// ../node_modules/ol/interaction/MouseWheelZoom.js
var __extends66 = function() {
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
  __extends66(MouseWheelZoom2, _super);
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
    _this.condition_ = options.onFocusOnly ? all2(focusWithTabindex, condition) : condition;
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
var __extends67 = function() {
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
  __extends67(PinchRotate2, _super);
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
var __extends68 = function() {
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
  __extends68(PinchZoom2, _super);
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
var __extends69 = function() {
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
  __extends69(Map2, _super);
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
function getKeyZXY(z, x, y) {
  return z + "/" + x + "/" + y;
}
function getKey2(tileCoord) {
  return getKeyZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
}
function fromKey(key) {
  return key.split("/").map(Number);
}

// ../node_modules/ol/TileCache.js
var __extends70 = function() {
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
  __extends70(TileCache2, _super);
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
        this.remove(getKey2(tile.tileCoord));
        tile.release();
      }
    }.bind(this));
  };
  return TileCache2;
}(LRUCache_default);
var TileCache_default = TileCache;

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

// ../node_modules/ol/VectorRenderTile.js
var __extends71 = function() {
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
var canvasPool = [];
var VectorRenderTile = function(_super) {
  __extends71(VectorRenderTile2, _super);
  function VectorRenderTile2(tileCoord, state, urlTileCoord, getSourceTiles) {
    var _this = _super.call(this, tileCoord, state, { transition: 0 }) || this;
    _this.context_ = {};
    _this.executorGroups = {};
    _this.declutterExecutorGroups = {};
    _this.loadingSourceTiles = 0;
    _this.hitDetectionImageData = {};
    _this.replayState_ = {};
    _this.sourceTiles = [];
    _this.errorTileKeys = {};
    _this.wantedResolution;
    _this.getSourceTiles = getSourceTiles.bind(void 0, _this);
    _this.wrappedTileCoord = urlTileCoord;
    return _this;
  }
  VectorRenderTile2.prototype.getContext = function(layer) {
    var key = getUid(layer);
    if (!(key in this.context_)) {
      this.context_[key] = createCanvasContext2D(1, 1, canvasPool);
    }
    return this.context_[key];
  };
  VectorRenderTile2.prototype.hasContext = function(layer) {
    return getUid(layer) in this.context_;
  };
  VectorRenderTile2.prototype.getImage = function(layer) {
    return this.hasContext(layer) ? this.getContext(layer).canvas : null;
  };
  VectorRenderTile2.prototype.getReplayState = function(layer) {
    var key = getUid(layer);
    if (!(key in this.replayState_)) {
      this.replayState_[key] = {
        dirty: false,
        renderedRenderOrder: null,
        renderedResolution: NaN,
        renderedRevision: -1,
        renderedTileResolution: NaN,
        renderedTileRevision: -1,
        renderedTileZ: -1
      };
    }
    return this.replayState_[key];
  };
  VectorRenderTile2.prototype.load = function() {
    this.getSourceTiles();
  };
  VectorRenderTile2.prototype.release = function() {
    for (var key in this.context_) {
      canvasPool.push(this.context_[key].canvas);
      delete this.context_[key];
    }
    _super.prototype.release.call(this);
  };
  return VectorRenderTile2;
}(Tile_default);
var VectorRenderTile_default = VectorRenderTile;

// ../node_modules/ol/VectorTile.js
var __extends72 = function() {
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
var VectorTile = function(_super) {
  __extends72(VectorTile2, _super);
  function VectorTile2(tileCoord, state, src, format, tileLoadFunction, opt_options) {
    var _this = _super.call(this, tileCoord, state, opt_options) || this;
    _this.extent = null;
    _this.format_ = format;
    _this.features_ = null;
    _this.loader_;
    _this.projection = null;
    _this.resolution;
    _this.tileLoadFunction_ = tileLoadFunction;
    _this.url_ = src;
    _this.key = src;
    return _this;
  }
  VectorTile2.prototype.getFormat = function() {
    return this.format_;
  };
  VectorTile2.prototype.getFeatures = function() {
    return this.features_;
  };
  VectorTile2.prototype.load = function() {
    if (this.state == TileState_default.IDLE) {
      this.setState(TileState_default.LOADING);
      this.tileLoadFunction_(this, this.url_);
      if (this.loader_) {
        this.loader_(this.extent, this.resolution, this.projection);
      }
    }
  };
  VectorTile2.prototype.onLoad = function(features, dataProjection) {
    this.setFeatures(features);
  };
  VectorTile2.prototype.onError = function() {
    this.setState(TileState_default.ERROR);
  };
  VectorTile2.prototype.setFeatures = function(features) {
    this.features_ = features;
    this.setState(TileState_default.LOADED);
  };
  VectorTile2.prototype.setLoader = function(loader) {
    this.loader_ = loader;
  };
  return VectorTile2;
}(Tile_default);
var VectorTile_default = VectorTile;
export {
  AssertionError_default as AssertionError,
  Collection_default as Collection,
  Disposable_default as Disposable,
  Feature_default as Feature,
  Geolocation_default as Geolocation,
  Graticule_default as Graticule,
  Image_default2 as Image,
  ImageBase_default as ImageBase,
  ImageCanvas_default as ImageCanvas,
  ImageTile_default as ImageTile,
  Kinetic_default as Kinetic,
  Map_default2 as Map,
  MapBrowserEvent_default as MapBrowserEvent,
  MapBrowserEventHandler_default as MapBrowserEventHandler,
  MapEvent_default as MapEvent,
  Object_default as Object,
  Observable_default as Observable,
  Overlay_default as Overlay,
  PluggableMap_default as PluggableMap,
  Tile_default as Tile,
  TileCache_default as TileCache,
  TileQueue_default as TileQueue,
  TileRange_default as TileRange,
  VERSION,
  VectorRenderTile_default as VectorRenderTile,
  VectorTile_default as VectorTile,
  View_default as View,
  getUid
};