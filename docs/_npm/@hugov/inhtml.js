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
  return document.createRange().createContextualFragment(Array.isArray(txt) ? tag.apply(null, arguments) : txt);
}
function load(path) {
  return fetch(path).then((res) => res.text().then((txt) => html(txt)));
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

// ../node_modules/@hugov/inhtml/frame.js
function frame(lambda, { context = "", transfer1, transfer2, scriptAttributes = "type=module" } = {}) {
  const uid = "$" + Math.floor(Math.random() * 2 ** (5 * 6)).toString(32).padStart(6, 0), iframeEl = document.createElement("iframe"), { port1, port2 } = new MessageChannel();
  iframeEl.style.display = "none";
  iframeEl.sandbox = "allow-scripts";
  iframeEl.srcdoc = `<script ${scriptAttributes}>${context}; const ${uid}={ f:${lambda.toString()}, t:${transfer2?.toString()} }; onmessage = ({ports:[port2]}) => { port2.onmessage = async evt => { const result = await ${uid}.f(...evt.data); port2.postMessage( result${transfer2 ? `, ${uid}.t(result)` : ""} ) } }<\/script>`;
  const framed = new Promise((p, f) => {
    iframeEl.onload = p;
    iframeEl.onerror = f;
  }).then(() => {
    iframeEl.contentWindow.postMessage("", "*", [port2]);
  });
  async function framedFunction(...args) {
    await framed;
    return new Promise((p, f) => {
      port1.onmessage = (evt) => p(evt.data);
      port1.onerror = f;
      port1.postMessage(args, transfer1?.(...args) || []);
    });
  }
  framedFunction.remove = iframeEl.remove.bind(iframeEl);
  document.body.appendChild(iframeEl);
  return framedFunction;
}

// ../node_modules/@hugov/inhtml/worker.js
function worker(code, options = { type: "module" }) {
  return new Worker(URL.createObjectURL(new Blob([code], { type: "text/javascript" })), options);
}
export {
  $,
  $$,
  cast,
  frame,
  html,
  list,
  load,
  tag,
  worker
};
