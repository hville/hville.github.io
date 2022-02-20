// node_modules/@hugov/inhtml/browser.js
var D = document;
var ID = "id";
var TW = D.createTreeWalker(D, 1);
var $ = (sel, elm) => (elm || D).querySelector(sel);
var $$ = (sel, elm) => (elm || D).querySelectorAll(sel);
function $ids(el) {
  let spot = TW.currentNode = el;
  const next = el.nextSibling?.() || null, ids = /* @__PURE__ */ Object.create(null);
  while ((spot = TW.nextNode()) !== next)
    if (spot.hasAttribute(ID))
      (ids[spot.getAttribute(ID)] = spot).removeAttribute(ID);
  return ids;
}
function cast(template, decorator) {
  template = template.nodeName ? template : template[0] === "<" ? html(template) : $(template);
  if (template.nodeName === "TEMPLATE")
    template = template.content;
  return function(v, k) {
    const el = template.cloneNode(true);
    const res = decorator.call(this, $ids(el), v, k);
    return res?.nodeType ? res : el;
  };
}
function html(base, ...args) {
  const T = D.createElement("template");
  T.innerHTML = typeof base === "string" ? base : String.raw(base, ...args);
  return T.content;
}
function list(parent, factory, { getKey, after = null, before = null } = {}) {
  if (!parent.nodeType)
    parent = $(parent);
  let last = /* @__PURE__ */ Object.create(null), updater = parent.update;
  parent.update = !updater ? updateList : function(...args) {
    updateList.call(this, ...args);
    updater.call(this, ...args);
  };
  function updateList(arr) {
    const kids = /* @__PURE__ */ Object.create(null);
    let spot = after ? after.nextSibling : parent.firstChild;
    if (!arr.length && !before && !after)
      parent.textContent = "";
    else {
      for (let i = 0; i < arr.length; ++i) {
        const key = getKey?.(arr[i], i, arr) || i;
        let kid = last[key];
        if (kid)
          kid.update && kid.update(arr[i], key, arr);
        else
          kid = factory(arr[i], i, arr);
        kids[key] = kid;
        if (!spot)
          parent.appendChild(kid);
        else if (kid === spot.nextSibling)
          parent.removeChild(spot);
        else if (kid !== spot)
          parent.insertBefore(kid, spot);
        spot = kid.nextSibling;
      }
      while (spot !== before) {
        const next = spot.nextSibling;
        parent.removeChild(spot);
        spot = next;
      }
    }
    last = kids;
    return this;
  }
  return parent;
}
var DELEGATES = {};
function delegate(eventType) {
  if (!DELEGATES[eventType]) {
    DELEGATES[eventType] = "on" + eventType[0].toUpperCase() + eventType.slice(1);
    D.addEventListener(eventType, listener);
  }
}
function listener(event) {
  let tgt = event.target, evt = DELEGATES[event.type];
  do
    if (tgt[evt])
      return tgt[evt](e);
  while (tgt = tgt.parentNode);
}
var ISMOD = /^[\s]*import[\s'"`*{;]/;
function frame(func, init = "", attributes = ISMOD.test(init) ? "type=module" : "") {
  const frm = D.createElement("iframe");
  frm.hidden = true;
  frm.sandbox = "allow-scripts allow-same-origin";
  frm.srcdoc = `<script ${attributes}>${"" + init}; window.framedFunction=${"" + func}<\/script>`;
  const framed = new Promise((p, f) => {
    frm.onload = () => p(frm.contentWindow.framedFunction.bind(frm.contentWindow));
    frm.onerror = f;
  });
  D.body.appendChild(frm);
  return {
    run: async (...args) => (await framed)(...args),
    end: () => void frm.remove()
  };
}
export {
  $,
  $$,
  $ids,
  TW,
  cast,
  delegate,
  frame,
  html,
  list
};
