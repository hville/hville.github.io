// ../node_modules/@hugov/inhtml/in-frame.js
var ISMOD = /^[\s]*import[\s'"`*{;]/;
function frame(code, init = "", attributes = ISMOD.test(init) ? "type=module" : "") {
  const uid = "$" + Math.floor(Math.random() * 2 ** (5 * 6)).toString(32).padStart(6, 0), iframeEl = document.createElement("iframe"), { port1, port2 } = new MessageChannel();
  iframeEl.style.display = "none";
  iframeEl.sandbox = "allow-scripts";
  iframeEl.srcdoc = `<script ${attributes}>${init}; onmessage = ({ports:[port2]}) => {
		port2.onmessage = async evt => port2.postMessage(await window.${uid}(...evt.data))
};
window.${uid}=${code};
<\/script>`;
  return new Promise((pass, fail) => {
    iframeEl.onerror = (e) => {
      fail(e);
      iframeEl.remove();
    };
    iframeEl.onload = () => {
      let ret, err;
      iframeEl.contentWindow.postMessage("", "*", [port2]);
      port1.onmessage = (evt) => ret(evt.data);
      port1.onerror = (evt) => err(evt);
      function framedFunction(...args) {
        return new Promise((p, f) => {
          ret = p;
          err = f;
          port1.postMessage(args);
        });
      }
      framedFunction.remove = iframeEl.remove.bind(iframeEl);
      pass(framedFunction);
    };
    document.body.appendChild(iframeEl);
  });
}

// ../node_modules/@hugov/inhtml/in-html.js
function tag(strings) {
  let t = strings[0];
  for (let i = 1; i < arguments.length; ++i)
    t += arguments[i] + strings[i];
  return t;
}
function $(selector, parent = document) {
  return parent.querySelector(Array.isArray(selector) ? tag.apply(null, arguments) : selector);
}
function $$(selector, parent = document) {
  return parent.querySelectorAll(Array.isArray(selector) ? tag.apply(null, arguments) : selector);
}
function html(txt) {
  const T = document.createElement("template");
  T.innerHTML = Array.isArray(txt) ? tag.apply(null, arguments) : txt;
  return T.content;
}
function getNode(selection) {
  const node = selection.nodeName ? selection : selection[0] === "<" ? html(selection) : $(selection);
  return node.content || node;
}
function $ids(el) {
  const ids = /* @__PURE__ */ Object.create(null);
  if (el.id)
    (ids[el.id] = el).removeAttribute("id");
  for (const kid of el.querySelectorAll("[id]"))
    (ids[kid.id] = kid).removeAttribute("id");
  return ids;
}
function cast(template, decorator) {
  const model = getNode(template);
  return function(v, k) {
    const el = model.cloneNode(true), res = decorator.call(this, $ids(el), v, k);
    return res?.nodeType ? res : el;
  };
}
function list(parent, factory, { getKey, after = null, before = null } = {}) {
  const kin = getNode(parent);
  let last = /* @__PURE__ */ Object.create(null), updater = kin.update;
  kin.update = !updater ? updateList : function(...args) {
    updateList.call(this, ...args);
    updater.call(this, ...args);
  };
  function updateList(arr) {
    const kids = /* @__PURE__ */ Object.create(null);
    let spot = after ? after.nextSibling : kin.firstChild;
    if (!arr.length && !before && !after)
      kin.textContent = "";
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
          kin.appendChild(kid);
        else if (kid === spot.nextSibling)
          kin.removeChild(spot);
        else if (kid !== spot)
          kin.insertBefore(kid, spot);
        spot = kid.nextSibling;
      }
      while (spot !== before) {
        const next = spot.nextSibling;
        kin.removeChild(spot);
        spot = next;
      }
    }
    last = kids;
    return this;
  }
  return kin;
}
export {
  $,
  $$,
  cast,
  frame,
  html,
  list,
  tag
};
