const ae = globalThis, Ae = ae.ShadowRoot && (ae.ShadyCSS === void 0 || ae.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ke = /* @__PURE__ */ Symbol(), Ne = /* @__PURE__ */ new WeakMap();
let tt = class {
  constructor(e, s, n) {
    if (this._$cssResult$ = !0, n !== ke) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (Ae && e === void 0) {
      const n = s !== void 0 && s.length === 1;
      n && (e = Ne.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Ne.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const At = (t) => new tt(typeof t == "string" ? t : t + "", void 0, ke), st = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce((n, r, i) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[i + 1], t[0]);
  return new tt(s, t, ke);
}, kt = (t, e) => {
  if (Ae) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const n = document.createElement("style"), r = ae.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = s.cssText, t.appendChild(n);
  }
}, Ue = Ae ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const n of e.cssRules) s += n.cssText;
  return At(s);
})(t) : t;
const { is: Dt, defineProperty: Ct, getOwnPropertyDescriptor: xt, getOwnPropertyNames: Et, getOwnPropertySymbols: Tt, getPrototypeOf: Lt } = Object, de = globalThis, Re = de.trustedTypes, Pt = Re ? Re.emptyScript : "", Ot = de.reactiveElementPolyfillSupport, J = (t, e) => t, le = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Pt : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let s = t;
  switch (e) {
    case Boolean:
      s = t !== null;
      break;
    case Number:
      s = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(t);
      } catch {
        s = null;
      }
  }
  return s;
} }, De = (t, e) => !Dt(t, e), He = { attribute: !0, type: String, converter: le, reflect: !1, useDefault: !1, hasChanged: De };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), de.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let W = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = He) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, n, s);
      r !== void 0 && Ct(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, s, n) {
    const { get: r, set: i } = xt(this.prototype, e) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: r, set(o) {
      const l = r?.call(this);
      i?.call(this, o), this.requestUpdate(e, l, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? He;
  }
  static _$Ei() {
    if (this.hasOwnProperty(J("elementProperties"))) return;
    const e = Lt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(J("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(J("properties"))) {
      const s = this.properties, n = [...Et(s), ...Tt(s)];
      for (const r of n) this.createProperty(r, s[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const s = litPropertyMetadata.get(e);
      if (s !== void 0) for (const [n, r] of s) this.elementProperties.set(n, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, n] of this.elementProperties) {
      const r = this._$Eu(s, n);
      r !== void 0 && this._$Eh.set(r, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const s = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const r of n) s.unshift(Ue(r));
    } else e !== void 0 && s.push(Ue(e));
    return s;
  }
  static _$Eu(e, s) {
    const n = s.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const n of s.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return kt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, s, n) {
    this._$AK(e, n);
  }
  _$ET(e, s) {
    const n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
    if (r !== void 0 && n.reflect === !0) {
      const i = (n.converter?.toAttribute !== void 0 ? n.converter : le).toAttribute(s, n.type);
      this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
    }
  }
  _$AK(e, s) {
    const n = this.constructor, r = n._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const i = n.getPropertyOptions(r), o = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : le;
      this._$Em = r;
      const l = o.fromAttribute(s, i.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, s, n, r = !1, i) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (i = this[e]), n ??= o.getPropertyOptions(e), !((n.hasChanged ?? De)(i, s) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, n)))) return;
      this.C(e, s, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, s, { useDefault: n, reflect: r, wrapped: i }, o) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? s ?? this[e]), i !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (s = void 0), this._$AL.set(e, s)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, i] of this._$Ep) this[r] = i;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [r, i] of n) {
        const { wrapped: o } = i, l = this[r];
        o !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, i, l);
      }
    }
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
    }
    e && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((s) => s.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((s) => this._$ET(s, this[s])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
W.elementStyles = [], W.shadowRootOptions = { mode: "open" }, W[J("elementProperties")] = /* @__PURE__ */ new Map(), W[J("finalized")] = /* @__PURE__ */ new Map(), Ot?.({ ReactiveElement: W }), (de.reactiveElementVersions ??= []).push("2.1.2");
const Ce = globalThis, Ie = (t) => t, ce = Ce.trustedTypes, ze = ce ? ce.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, nt = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, rt = "?" + N, Nt = `<${rt}>`, F = document, se = () => F.createComment(""), ne = (t) => t === null || typeof t != "object" && typeof t != "function", xe = Array.isArray, Ut = (t) => xe(t) || typeof t?.[Symbol.iterator] == "function", ye = `[ 	
\f\r]`, Q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Fe = /-->/g, je = />/g, R = RegExp(`>|${ye}(?:([^\\s"'>=/]+)(${ye}*=${ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ge = /'/g, Ve = /"/g, it = /^(?:script|style|textarea|title)$/i, ot = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), S = ot(1), me = ot(2), q = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), We = /* @__PURE__ */ new WeakMap(), z = F.createTreeWalker(F, 129);
function at(t, e) {
  if (!xe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ze !== void 0 ? ze.createHTML(e) : e;
}
const Rt = (t, e) => {
  const s = t.length - 1, n = [];
  let r, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = Q;
  for (let l = 0; l < s; l++) {
    const a = t[l];
    let c, h, u = -1, d = 0;
    for (; d < a.length && (o.lastIndex = d, h = o.exec(a), h !== null); ) d = o.lastIndex, o === Q ? h[1] === "!--" ? o = Fe : h[1] !== void 0 ? o = je : h[2] !== void 0 ? (it.test(h[2]) && (r = RegExp("</" + h[2], "g")), o = R) : h[3] !== void 0 && (o = R) : o === R ? h[0] === ">" ? (o = r ?? Q, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, c = h[1], o = h[3] === void 0 ? R : h[3] === '"' ? Ve : Ge) : o === Ve || o === Ge ? o = R : o === Fe || o === je ? o = Q : (o = R, r = void 0);
    const p = o === R && t[l + 1].startsWith("/>") ? " " : "";
    i += o === Q ? a + Nt : u >= 0 ? (n.push(c), a.slice(0, u) + nt + a.slice(u) + N + p) : a + N + (u === -2 ? l : p);
  }
  return [at(t, i + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class re {
  constructor({ strings: e, _$litType$: s }, n) {
    let r;
    this.parts = [];
    let i = 0, o = 0;
    const l = e.length - 1, a = this.parts, [c, h] = Rt(e, s);
    if (this.el = re.createElement(c, n), z.currentNode = this.el.content, s === 2 || s === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = z.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(nt)) {
          const d = h[o++], p = r.getAttribute(u).split(N), y = /([.?@])?(.*)/.exec(d);
          a.push({ type: 1, index: i, name: y[2], strings: p, ctor: y[1] === "." ? It : y[1] === "?" ? zt : y[1] === "@" ? Ft : fe }), r.removeAttribute(u);
        } else u.startsWith(N) && (a.push({ type: 6, index: i }), r.removeAttribute(u));
        if (it.test(r.tagName)) {
          const u = r.textContent.split(N), d = u.length - 1;
          if (d > 0) {
            r.textContent = ce ? ce.emptyScript : "";
            for (let p = 0; p < d; p++) r.append(u[p], se()), z.nextNode(), a.push({ type: 2, index: ++i });
            r.append(u[d], se());
          }
        }
      } else if (r.nodeType === 8) if (r.data === rt) a.push({ type: 2, index: i });
      else {
        let u = -1;
        for (; (u = r.data.indexOf(N, u + 1)) !== -1; ) a.push({ type: 7, index: i }), u += N.length - 1;
      }
      i++;
    }
  }
  static createElement(e, s) {
    const n = F.createElement("template");
    return n.innerHTML = e, n;
  }
}
function Z(t, e, s = t, n) {
  if (e === q) return e;
  let r = n !== void 0 ? s._$Co?.[n] : s._$Cl;
  const i = ne(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== i && (r?._$AO?.(!1), i === void 0 ? r = void 0 : (r = new i(t), r._$AT(t, s, n)), n !== void 0 ? (s._$Co ??= [])[n] = r : s._$Cl = r), r !== void 0 && (e = Z(t, r._$AS(t, e.values), r, n)), e;
}
class Ht {
  constructor(e, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: s }, parts: n } = this._$AD, r = (e?.creationScope ?? F).importNode(s, !0);
    z.currentNode = r;
    let i = z.nextNode(), o = 0, l = 0, a = n[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new ie(i, i.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(i, a.name, a.strings, this, e) : a.type === 6 && (c = new jt(i, this, e)), this._$AV.push(c), a = n[++l];
      }
      o !== a?.index && (i = z.nextNode(), o++);
    }
    return z.currentNode = F, r;
  }
  p(e) {
    let s = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, s), s += n.strings.length - 2) : n._$AI(e[s])), s++;
  }
}
class ie {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, s, n, r) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && e?.nodeType === 11 && (e = s.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, s = this) {
    e = Z(this, e, s), ne(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== q && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ut(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && ne(this._$AH) ? this._$AA.nextSibling.data = e : this.T(F.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: s, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = re.createElement(at(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(s);
    else {
      const i = new Ht(r, this), o = i.u(this.options);
      i.p(s), this.T(o), this._$AH = i;
    }
  }
  _$AC(e) {
    let s = We.get(e.strings);
    return s === void 0 && We.set(e.strings, s = new re(e)), s;
  }
  k(e) {
    xe(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let n, r = 0;
    for (const i of e) r === s.length ? s.push(n = new ie(this.O(se()), this.O(se()), this, this.options)) : n = s[r], n._$AI(i), r++;
    r < s.length && (this._$AR(n && n._$AB.nextSibling, r), s.length = r);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); e !== this._$AB; ) {
      const n = Ie(e).nextSibling;
      Ie(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class fe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, n, r, i) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = s, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = m;
  }
  _$AI(e, s = this, n, r) {
    const i = this.strings;
    let o = !1;
    if (i === void 0) e = Z(this, e, s, 0), o = !ne(e) || e !== this._$AH && e !== q, o && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = i[0], a = 0; a < i.length - 1; a++) c = Z(this, l[n + a], s, a), c === q && (c = this._$AH[a]), o ||= !ne(c) || c !== this._$AH[a], c === m ? e = m : e !== m && (e += (c ?? "") + i[a + 1]), this._$AH[a] = c;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class It extends fe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class zt extends fe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class Ft extends fe {
  constructor(e, s, n, r, i) {
    super(e, s, n, r, i), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = Z(this, e, s, 0) ?? m) === q) return;
    const n = this._$AH, r = e === m && n !== m || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== m && (n === m || r);
    r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class jt {
  constructor(e, s, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Z(this, e);
  }
}
const Gt = Ce.litHtmlPolyfillSupport;
Gt?.(re, ie), (Ce.litHtmlVersions ??= []).push("3.3.2");
const Vt = (t, e, s) => {
  const n = s?.renderBefore ?? e;
  let r = n._$litPart$;
  if (r === void 0) {
    const i = s?.renderBefore ?? null;
    n._$litPart$ = r = new ie(e.insertBefore(se(), i), i, void 0, s ?? {});
  }
  return r._$AI(t), r;
};
const Ee = globalThis;
let ee = class extends W {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Vt(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return q;
  }
};
ee._$litElement$ = !0, ee.finalized = !0, Ee.litElementHydrateSupport?.({ LitElement: ee });
const Wt = Ee.litElementPolyfillSupport;
Wt?.({ LitElement: ee });
(Ee.litElementVersions ??= []).push("4.2.2");
const Bt = (t) => (e, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const Yt = { attribute: !0, type: String, converter: le, reflect: !1, hasChanged: De }, qt = (t = Yt, e, s) => {
  const { kind: n, metadata: r } = s;
  let i = globalThis.litPropertyMetadata.get(r);
  if (i === void 0 && globalThis.litPropertyMetadata.set(r, i = /* @__PURE__ */ new Map()), n === "setter" && ((t = Object.create(t)).wrapped = !0), i.set(s.name, t), n === "accessor") {
    const { name: o } = s;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, a, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, t, l), l;
    } };
  }
  if (n === "setter") {
    const { name: o } = s;
    return function(l) {
      const a = this[o];
      e.call(this, l), this.requestUpdate(o, a, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function lt(t) {
  return (e, s) => typeof s == "object" ? qt(t, e, s) : ((n, r, i) => {
    const o = r.hasOwnProperty(i);
    return r.constructor.createProperty(i, n), o ? Object.getOwnPropertyDescriptor(r, i) : void 0;
  })(t, e, s);
}
function K(t) {
  return lt({ ...t, state: !0, attribute: !1 });
}
const Zt = /^\d{4}-\d{2}-\d{2}$/;
function Te(t) {
  return Zt.test(t);
}
function $e(t) {
  if (!Te(t)) return null;
  const [e, s, n] = t.split("-"), r = Number(e), i = Number(s), o = Number(n);
  return !Number.isFinite(r) || !Number.isFinite(i) || !Number.isFinite(o) ? null : new Date(r, i - 1, o);
}
function ct(t) {
  const e = t.getFullYear(), s = String(t.getMonth() + 1).padStart(2, "0"), n = String(t.getDate()).padStart(2, "0");
  return `${e}-${s}-${n}`;
}
function ht(t) {
  if (typeof t == "string" && Te(t))
    return t;
  if (typeof t == "string" && !t.includes("T"))
    return null;
  const e = new Date(t);
  return Number.isNaN(e.getTime()) ? null : ct(e);
}
function ut(t) {
  const e = t.getFullYear(), s = String(t.getMonth() + 1).padStart(2, "0"), n = String(t.getDate()).padStart(2, "0");
  return `${e}-${s}-${n}`;
}
function Kt(t) {
  const e = new Date(t);
  return e.setHours(0, 0, 0, 0), e;
}
function Be(t, e) {
  const s = new Date(t);
  return s.setDate(s.getDate() + e), s;
}
function Xt(t) {
  return t.getDay();
}
function dt(t) {
  const e = [];
  for (let s = 1; s < t; s++)
    e.push(s / t * 100);
  return e;
}
function Qt(t) {
  if (!Array.isArray(t) || t.length === 0)
    return [];
  const e = t[0];
  if (typeof e == "object" && e !== null && "date" in e && "count" in e)
    return t.filter(
      (s) => typeof s == "object" && s !== null && "date" in s && "count" in s && typeof s.date == "string" && typeof s.count == "number" && Te(s.date)
    ).map((s) => ({ date: s.date, count: s.count }));
  if (typeof e == "string") {
    const s = {};
    for (const n of t) {
      if (typeof n != "string") continue;
      const r = ht(n);
      r && (s[r] = (s[r] || 0) + 1);
    }
    return Object.entries(s).map(([n, r]) => ({ date: n, count: r }));
  }
  return [];
}
function ft(t, e = /* @__PURE__ */ new Date()) {
  const s = t.weekStartDay ?? 1, n = Kt(e);
  if (t.mode === "rolling") {
    const l = n, a = t.days ?? 364;
    let c = Be(l, -a);
    const u = (Xt(c) - s + 7) % 7;
    return c = Be(c, -u), [{ startDate: c, endDate: l }];
  }
  const r = t.targetYear ?? n.getFullYear(), i = t.years ?? 1, o = [];
  for (let l = 0; l < i; l++) {
    const a = r - i + 1 + l, c = new Date(a, 0, 1), h = new Date(a, 11, 31);
    o.push({ startDate: c, endDate: h, label: a.toString() });
  }
  return o;
}
function Jt(t, e, s = 5, n, r) {
  const i = r ?? e;
  if (i === 0) return 0;
  const o = n ?? dt(s), l = Math.min(Math.max(0, t) / i * 100, 100);
  for (let a = 0; a < o.length; a++)
    if (l <= o[a]) return a;
  return s - 1;
}
function es(t, e, s, n) {
  if (t === e)
    return Math.floor(s / 2);
  let r;
  return typeof n == "number" && Number.isFinite(n) ? r = n : r = t <= 0 && e >= 0 ? 0 : (t + e) / 2, r = Math.max(t, Math.min(e, r)), Math.round(
    (r - t) / (e - t) * (s - 1)
  );
}
function ts(t, e, s, n = 5, r, i, o) {
  const l = e, a = i ?? s;
  if (l === a) return Math.floor(n / 2);
  const c = r ?? dt(n), h = (t - l) / (a - l) * 100, u = Math.max(0, Math.min(100, h));
  for (let d = 0; d < c.length; d++)
    if (u <= c[d]) return d;
  return n - 1;
}
function ss(t, e) {
  for (let s = e.length - 1; s >= 0; s--)
    if (t >= e[s]) return s;
  return 0;
}
function ns(t, e) {
  const s = /* @__PURE__ */ new Map();
  for (const { date: i, count: o } of t)
    s.set(i, o);
  let n = 1 / 0, r = -1 / 0;
  for (const i of e) {
    const o = new Date(i.startDate);
    for (; o <= i.endDate; ) {
      const l = ut(o);
      if (s.has(l)) {
        const a = s.get(l);
        n = Math.min(n, a), r = Math.max(r, a);
      }
      o.setDate(o.getDate() + 1);
    }
  }
  return r === -1 / 0 ? { minCount: 0, maxCount: 0 } : { minCount: n, maxCount: r };
}
function rs(t, e, s = 5, n, r, i, o, l, a, c, h) {
  const u = /* @__PURE__ */ new Map();
  for (const { date: C, count: D } of t)
    u.set(C, D);
  const d = i === "range" || o, y = (d ? "transparent" : r) === "transparent", $ = [];
  let b = a?.maxCount ?? (d ? -1 / 0 : 0), k = a?.minCount ?? (d ? 1 / 0 : 0);
  const j = !!a, G = new Date(e.startDate);
  for (; G <= e.endDate; ) {
    const C = ut(G), D = u.has(C), x = u.get(C) ?? 0;
    j || (d ? D && (b = Math.max(b, x), k = Math.min(k, x)) : b = Math.max(b, x)), $.push({ date: C, count: x, hasData: D }), G.setDate(G.getDate() + 1);
  }
  !j && d && b === -1 / 0 && (b = 0, k = 0);
  const _ = [];
  let v = [];
  for (const { date: C, count: D, hasData: x } of $) {
    let oe;
    h ? oe = ss(D, h) : i === "range" ? oe = x ? ts(
      D,
      k,
      b,
      s,
      n,
      c
    ) : 0 : oe = Jt(D, b, s, n, c);
    const Oe = { date: C, count: D, level: oe };
    y && (Oe.missing = !x), v.push(Oe), v.length === 7 && (_.push(v), v = []);
  }
  v.length > 0 && _.push(v);
  const T = { range: e, weeks: _, maxCount: b };
  return (o || i === "range") && (T.minCount = k), o && (T.neutralLevel = es(
    k,
    b,
    s,
    l
  )), T;
}
function is(t, e, s = /* @__PURE__ */ new Date()) {
  const n = Qt(e), r = ft(t, s), i = t.levelCount ?? 5, o = Math.max(2, Math.min(10, i)), l = t.levelThresholds, a = t.missingMode, c = t.isDiverging, h = t.neutralValue, u = t.maxValue, d = t.colorThresholdValues, p = c ? "range" : t.valueMode, y = c ? ns(n, r) : void 0;
  return r.map(
    ($) => rs(
      n,
      $,
      o,
      l,
      a,
      p,
      c,
      h,
      y,
      u,
      d
    )
  );
}
const pe = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
function he(t) {
  return typeof t == "string" && pe.test(t);
}
function be(t) {
  t = t.replace(/^#/, ""), t.length === 3 && (t = t.split("").map((h) => h + h).join(""));
  const e = parseInt(t.slice(0, 2), 16) / 255, s = parseInt(t.slice(2, 4), 16) / 255, n = parseInt(t.slice(4, 6), 16) / 255, r = Math.max(e, s, n), i = Math.min(e, s, n), o = (r + i) / 2;
  if (r === i)
    return { h: 0, s: 0, l: o * 100 };
  const l = r - i, a = o > 0.5 ? l / (2 - r - i) : l / (r + i);
  let c;
  switch (r) {
    case e:
      c = ((s - n) / l + (s < n ? 6 : 0)) / 6;
      break;
    case s:
      c = ((n - e) / l + 2) / 6;
      break;
    default:
      c = ((e - s) / l + 4) / 6;
      break;
  }
  return {
    h: Math.round(c * 360),
    s: Math.round(a * 100),
    l: Math.round(o * 100)
  };
}
function I(t) {
  return `hsl(${t.h}, ${t.s}%, ${t.l}%)`;
}
function os(t, e, s = {}) {
  const {
    darkMode: n = !1,
    maxLightness: r = 80,
    minLightness: i = 25,
    emptyLightness: o = n ? 15 : 92
  } = s, { h: l, s: a } = be(t), c = [], h = Math.max(5, Math.round(a * 0.3));
  c.push(I({ h: l, s: h, l: o }));
  const u = e - 1;
  if (u === 1)
    c.push(t);
  else
    for (let d = 0; d < u; d++) {
      const p = d / (u - 1);
      let y;
      n ? y = i + p * (r - i) : y = r - p * (r - i), c.push(I({ h: l, s: a, l: Math.round(y) }));
    }
  return c;
}
function as(t, e, s, n, r = {}) {
  const { darkMode: i = !1 } = r, o = be(t), l = be(e), a = ls(o.h, l.h), c = 8, h = i ? 28 : 90, u = [], d = i ? { dark: 55 } : { dark: 55 };
  for (let p = 0; p < s; p++)
    if (p === n)
      u.push(
        I({ h: a, s: c, l: h })
      );
    else if (p < n) {
      const y = n;
      if (y === 0)
        u.push(
          I({
            h: a,
            s: c,
            l: h
          })
        );
      else {
        const $ = p / y, b = i ? d.dark - $ * (d.dark - h) : d.dark + $ * (h - d.dark), k = o.s * (1 - $ * 0.5);
        u.push(
          I({ h: o.h, s: Math.round(k), l: Math.round(b) })
        );
      }
    } else {
      const y = s - 1 - n;
      if (y === 0)
        u.push(
          I({
            h: a,
            s: c,
            l: h
          })
        );
      else {
        const $ = (p - n) / y, b = i ? h + $ * (d.dark - h) : h - $ * (h - d.dark), k = l.s * (0.5 + $ * 0.5);
        u.push(
          I({ h: l.h, s: Math.round(k), l: Math.round(b) })
        );
      }
    }
  return u;
}
function ls(t, e) {
  if (Math.abs(t - e) <= 180)
    return Math.round((t + e) / 2);
  const n = (t + e + 360) / 2;
  return Math.round(n % 360);
}
let _e;
// @__NO_SIDE_EFFECTS__
function pt(t) {
  return {
    lang: t?.lang ?? _e?.lang,
    message: t?.message,
    abortEarly: t?.abortEarly ?? _e?.abortEarly,
    abortPipeEarly: t?.abortPipeEarly ?? _e?.abortPipeEarly
  };
}
let cs;
// @__NO_SIDE_EFFECTS__
function hs(t) {
  return cs?.get(t);
}
let us;
// @__NO_SIDE_EFFECTS__
function ds(t) {
  return us?.get(t);
}
let fs;
// @__NO_SIDE_EFFECTS__
function ps(t, e) {
  return fs?.get(t)?.get(e);
}
// @__NO_SIDE_EFFECTS__
function Le(t) {
  const e = typeof t;
  return e === "string" ? `"${t}"` : e === "number" || e === "bigint" || e === "boolean" ? `${t}` : e === "object" || e === "function" ? (t && Object.getPrototypeOf(t)?.constructor?.name) ?? "null" : e;
}
function L(t, e, s, n, r) {
  const i = r && "input" in r ? r.input : s.value, o = r?.expected ?? t.expects ?? null, l = r?.received ?? /* @__PURE__ */ Le(i), a = {
    kind: t.kind,
    type: t.type,
    input: i,
    expected: o,
    received: l,
    message: `Invalid ${e}: ${o ? `Expected ${o} but r` : "R"}eceived ${l}`,
    requirement: t.requirement,
    path: r?.path,
    issues: r?.issues,
    lang: n.lang,
    abortEarly: n.abortEarly,
    abortPipeEarly: n.abortPipeEarly
  }, c = t.kind === "schema", h = r?.message ?? t.message ?? /* @__PURE__ */ ps(t.reference, a.lang) ?? (c ? /* @__PURE__ */ ds(a.lang) : null) ?? n.message ?? /* @__PURE__ */ hs(a.lang);
  h !== void 0 && (a.message = typeof h == "function" ? h(a) : h), c && (s.typed = !1), s.issues ? s.issues.push(a) : s.issues = [a];
}
// @__NO_SIDE_EFFECTS__
function E(t) {
  return {
    version: 1,
    vendor: "valibot",
    validate(e) {
      return t["~run"]({ value: e }, /* @__PURE__ */ pt());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function gt(t, e) {
  const s = [...new Set(t)];
  return s.length > 1 ? `(${s.join(` ${e} `)})` : s[0] ?? "never";
}
// @__NO_SIDE_EFFECTS__
function M(t) {
  return {
    kind: "transformation",
    type: "transform",
    reference: M,
    async: !1,
    operation: t,
    "~run"(e) {
      return e.value = this.operation(e.value), e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function yt() {
  return {
    kind: "transformation",
    type: "trim",
    reference: yt,
    async: !1,
    "~run"(t) {
      return t.value = t.value.trim(), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function gs(t, e, s) {
  return typeof t.fallback == "function" ? t.fallback(e, s) : t.fallback;
}
// @__NO_SIDE_EFFECTS__
function mt(t, e, s) {
  return typeof t.default == "function" ? t.default(e, s) : t.default;
}
// @__NO_SIDE_EFFECTS__
function _t(t, e) {
  return {
    kind: "schema",
    type: "array",
    reference: _t,
    expects: "Array",
    async: !1,
    item: t,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ E(this);
    },
    "~run"(s, n) {
      const r = s.value;
      if (Array.isArray(r)) {
        s.typed = !0, s.value = [];
        for (let i = 0; i < r.length; i++) {
          const o = r[i], l = this.item["~run"]({ value: o }, n);
          if (l.issues) {
            const a = {
              type: "array",
              origin: "value",
              input: r,
              key: i,
              value: o
            };
            for (const c of l.issues)
              c.path ? c.path.unshift(a) : c.path = [a], s.issues?.push(c);
            if (s.issues || (s.issues = l.issues), n.abortEarly) {
              s.typed = !1;
              break;
            }
          }
          l.typed || (s.typed = !1), s.value.push(l.value);
        }
      } else L(this, "type", s, n);
      return s;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function Se(t) {
  return {
    kind: "schema",
    type: "boolean",
    reference: Se,
    expects: "boolean",
    async: !1,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ E(this);
    },
    "~run"(e, s) {
      return typeof e.value == "boolean" ? e.typed = !0 : L(this, "type", e, s), e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function vt(t, e) {
  return {
    kind: "schema",
    type: "literal",
    reference: vt,
    expects: /* @__PURE__ */ Le(t),
    async: !1,
    literal: t,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ E(this);
    },
    "~run"(s, n) {
      return s.value === this.literal ? s.typed = !0 : L(this, "type", s, n), s;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function O(t) {
  return {
    kind: "schema",
    type: "number",
    reference: O,
    expects: "number",
    async: !1,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ E(this);
    },
    "~run"(e, s) {
      return typeof e.value == "number" && !isNaN(e.value) ? e.typed = !0 : L(this, "type", e, s), e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function Pe(t, e) {
  return {
    kind: "schema",
    type: "object",
    reference: Pe,
    expects: "Object",
    async: !1,
    entries: t,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ E(this);
    },
    "~run"(s, n) {
      const r = s.value;
      if (r && typeof r == "object") {
        s.typed = !0, s.value = {};
        for (const i in this.entries) {
          const o = this.entries[i];
          if (i in r || (o.type === "exact_optional" || o.type === "optional" || o.type === "nullish") && o.default !== void 0) {
            const l = i in r ? r[i] : /* @__PURE__ */ mt(o), a = o["~run"]({ value: l }, n);
            if (a.issues) {
              const c = {
                type: "object",
                origin: "value",
                input: r,
                key: i,
                value: l
              };
              for (const h of a.issues)
                h.path ? h.path.unshift(c) : h.path = [c], s.issues?.push(h);
              if (s.issues || (s.issues = a.issues), n.abortEarly) {
                s.typed = !1;
                break;
              }
            }
            a.typed || (s.typed = !1), s.value[i] = a.value;
          } else if (o.fallback !== void 0) s.value[i] = /* @__PURE__ */ gs(o);
          else if (o.type !== "exact_optional" && o.type !== "optional" && o.type !== "nullish" && (L(this, "key", s, n, {
            input: void 0,
            expected: `"${i}"`,
            path: [{
              type: "object",
              origin: "key",
              input: r,
              key: i,
              value: r[i]
            }]
          }), n.abortEarly))
            break;
        }
      } else L(this, "type", s, n);
      return s;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function f(t, e) {
  return {
    kind: "schema",
    type: "optional",
    reference: f,
    expects: `(${t.expects} | undefined)`,
    async: !1,
    wrapped: t,
    default: e,
    get "~standard"() {
      return /* @__PURE__ */ E(this);
    },
    "~run"(s, n) {
      return s.value === void 0 && (this.default !== void 0 && (s.value = /* @__PURE__ */ mt(this, s, n)), s.value === void 0) ? (s.typed = !0, s) : this.wrapped["~run"](s, n);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function X(t, e) {
  return {
    kind: "schema",
    type: "picklist",
    reference: X,
    expects: /* @__PURE__ */ gt(t.map(Le), "|"),
    async: !1,
    options: t,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ E(this);
    },
    "~run"(s, n) {
      return this.options.includes(s.value) ? s.typed = !0 : L(this, "type", s, n), s;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function B(t) {
  return {
    kind: "schema",
    type: "string",
    reference: B,
    expects: "string",
    async: !1,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ E(this);
    },
    "~run"(e, s) {
      return typeof e.value == "string" ? e.typed = !0 : L(this, "type", e, s), e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function Ye(t) {
  let e;
  if (t) for (const s of t) e ? e.push(...s.issues) : e = s.issues;
  return e;
}
// @__NO_SIDE_EFFECTS__
function $t(t, e) {
  return {
    kind: "schema",
    type: "union",
    reference: $t,
    expects: /* @__PURE__ */ gt(t.map((s) => s.expects), "|"),
    async: !1,
    options: t,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ E(this);
    },
    "~run"(s, n) {
      let r, i, o;
      for (const l of this.options) {
        const a = l["~run"]({ value: s.value }, n);
        if (a.typed) if (a.issues) i ? i.push(a) : i = [a];
        else {
          r = a;
          break;
        }
        else o ? o.push(a) : o = [a];
      }
      if (r) return r;
      if (i) {
        if (i.length === 1) return i[0];
        L(this, "type", s, n, { issues: /* @__PURE__ */ Ye(i) }), s.typed = !0;
      } else {
        if (o?.length === 1) return o[0];
        L(this, "type", s, n, { issues: /* @__PURE__ */ Ye(o) });
      }
      return s;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function A() {
  return {
    kind: "schema",
    type: "unknown",
    reference: A,
    expects: "unknown",
    async: !1,
    get "~standard"() {
      return /* @__PURE__ */ E(this);
    },
    "~run"(t) {
      return t.typed = !0, t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function w(...t) {
  return {
    ...t[0],
    pipe: t,
    get "~standard"() {
      return /* @__PURE__ */ E(this);
    },
    "~run"(e, s) {
      for (const n of t) if (n.kind !== "metadata") {
        if (e.issues && (n.kind === "schema" || n.kind === "transformation")) {
          e.typed = !1;
          break;
        }
        (!e.issues || !s.abortEarly && !s.abortPipeEarly) && (e = n["~run"](e, s));
      }
      return e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function bt(t, e, s) {
  const n = t["~run"]({ value: e }, /* @__PURE__ */ pt(s));
  return {
    typed: n.typed,
    success: !n.issues,
    output: n.value,
    issues: n.issues
  };
}
const g = {
  range: "rolling",
  years: 1,
  days: 364,
  weekStartDay: "monday",
  weekdayLabels: "short",
  levelCount: 5,
  baseColor: "#40c463",
  show_legend: !0,
  attribute: "data",
  missingMode: "zero",
  valueMode: "clamp_zero",
  zoom: 1,
  scrollToToday: !1
};
function ys(t) {
  return t === "sunday" ? 0 : 1;
}
function ge(t, e) {
  return /* @__PURE__ */ w(
    /* @__PURE__ */ A(),
    /* @__PURE__ */ M((s) => {
      const n = /* @__PURE__ */ bt(t, s);
      return n.success ? n.output : e;
    })
  );
}
const ms = /* @__PURE__ */ w(
  /* @__PURE__ */ A(),
  /* @__PURE__ */ M((t) => {
    if (typeof t == "string") {
      const e = t.toLowerCase();
      if (e === "sunday" || e === "sun") return "sunday";
      if (e === "monday" || e === "mon") return "monday";
    }
    return t === 0 ? "sunday" : t === 1 ? "monday" : g.weekStartDay;
  })
), _s = ge(
  /* @__PURE__ */ X(["rolling", "year"]),
  g.range
), vs = /* @__PURE__ */ w(
  /* @__PURE__ */ A(),
  /* @__PURE__ */ M((t) => typeof t == "number" && Number.isInteger(t) && t >= 1 ? t : g.years)
), $s = /* @__PURE__ */ w(
  /* @__PURE__ */ A(),
  /* @__PURE__ */ M((t) => typeof t == "number" && Number.isInteger(t) && t >= 7 && t <= 365 ? t : g.days)
), bs = /* @__PURE__ */ w(
  /* @__PURE__ */ A(),
  /* @__PURE__ */ M((t) => typeof t == "number" && Number.isFinite(t) && t >= 0.5 && t <= 3 ? t : g.zoom)
), qe = /* @__PURE__ */ w(
  /* @__PURE__ */ A(),
  /* @__PURE__ */ M((t) => {
    if (typeof t == "number" && Number.isInteger(t) && t >= 0 && t <= 48)
      return t;
  })
), Ss = /* @__PURE__ */ w(
  /* @__PURE__ */ A(),
  /* @__PURE__ */ M((t) => typeof t == "number" && Number.isInteger(t) && t >= 2 && t <= 10 ? t : g.levelCount)
), ws = ge(
  /* @__PURE__ */ X(["zero", "transparent"]),
  g.missingMode
), Ms = ge(
  /* @__PURE__ */ X(["clamp_zero", "range"]),
  g.valueMode
), As = ge(
  /* @__PURE__ */ X(["none", "short", "all", "letter"]),
  g.weekdayLabels
), ks = /* @__PURE__ */ w(
  /* @__PURE__ */ A(),
  /* @__PURE__ */ M((t) => typeof t == "string" && pe.test(t) ? t : g.baseColor)
), Ze = /* @__PURE__ */ w(
  /* @__PURE__ */ A(),
  /* @__PURE__ */ M((t) => {
    if (typeof t == "string" && pe.test(t))
      return t;
  })
), Ds = /* @__PURE__ */ w(
  /* @__PURE__ */ A(),
  /* @__PURE__ */ M((t) => {
    if (typeof t == "number" && Number.isFinite(t))
      return t;
  })
), Cs = /* @__PURE__ */ w(
  /* @__PURE__ */ A(),
  /* @__PURE__ */ M((t) => {
    if (typeof t == "number" && Number.isFinite(t) && t > 0)
      return t;
  })
), xs = /* @__PURE__ */ w(
  /* @__PURE__ */ A(),
  /* @__PURE__ */ M((t) => {
    if (typeof t == "string" && t.length > 0) {
      const e = new Date(t);
      if (!Number.isNaN(e.getTime())) return t;
    }
  })
), Es = /* @__PURE__ */ w(
  /* @__PURE__ */ A(),
  /* @__PURE__ */ M((t) => {
    if (!Array.isArray(t) || t.length < 2) return;
    const e = [];
    for (const s of t)
      s && typeof s == "object" && typeof s.value == "number" && Number.isFinite(s.value) && typeof s.color == "string" && pe.test(s.color) && e.push({ value: s.value, color: s.color });
    if (!(e.length < 2))
      return e.sort((s, n) => s.value - n.value), e;
  })
), Ts = /* @__PURE__ */ f(
  /* @__PURE__ */ Pe({
    columns: /* @__PURE__ */ f(/* @__PURE__ */ $t([/* @__PURE__ */ O(), /* @__PURE__ */ vt("full")])),
    min_columns: /* @__PURE__ */ f(/* @__PURE__ */ O()),
    max_columns: /* @__PURE__ */ f(/* @__PURE__ */ O()),
    rows: /* @__PURE__ */ f(/* @__PURE__ */ O()),
    min_rows: /* @__PURE__ */ f(/* @__PURE__ */ O()),
    max_rows: /* @__PURE__ */ f(/* @__PURE__ */ O())
  })
), Ls = /* @__PURE__ */ w(
  /* @__PURE__ */ Pe({
    // Required (but can be empty for preview mode)
    entity: /* @__PURE__ */ w(/* @__PURE__ */ B("You need to define an entity"), /* @__PURE__ */ yt()),
    // Card type (required)
    card: /* @__PURE__ */ X(["heatmap"], "You need to define a card type"),
    // Optional with defaults
    title: /* @__PURE__ */ f(/* @__PURE__ */ B()),
    show_legend: /* @__PURE__ */ f(/* @__PURE__ */ Se(), g.show_legend),
    attribute: /* @__PURE__ */ f(/* @__PURE__ */ B(), g.attribute),
    range: /* @__PURE__ */ f(_s, g.range),
    years: /* @__PURE__ */ f(vs, g.years),
    days: /* @__PURE__ */ f($s, g.days),
    end_date: /* @__PURE__ */ f(xs),
    weekStartDay: /* @__PURE__ */ f(ms, g.weekStartDay),
    weekdayLabels: /* @__PURE__ */ f(
      As,
      g.weekdayLabels
    ),
    levelCount: /* @__PURE__ */ f(Ss, g.levelCount),
    levelThresholds: /* @__PURE__ */ f(/* @__PURE__ */ _t(/* @__PURE__ */ O())),
    missingMode: /* @__PURE__ */ f(ws, g.missingMode),
    valueMode: /* @__PURE__ */ f(Ms, g.valueMode),
    baseColor: /* @__PURE__ */ f(ks, g.baseColor),
    unit: /* @__PURE__ */ f(/* @__PURE__ */ B()),
    backgroundColor: /* @__PURE__ */ f(/* @__PURE__ */ B()),
    zoom: /* @__PURE__ */ f(bs, g.zoom),
    scrollToToday: /* @__PURE__ */ f(/* @__PURE__ */ Se(), g.scrollToToday),
    cardPadding: /* @__PURE__ */ f(qe),
    titleGap: /* @__PURE__ */ f(qe),
    // Diverging color scheme (both required for diverging mode)
    negativeColor: /* @__PURE__ */ f(Ze),
    positiveColor: /* @__PURE__ */ f(Ze),
    neutralValue: /* @__PURE__ */ f(Ds),
    // Absolute max value for 100% intensity
    maxValue: /* @__PURE__ */ f(Cs),
    // Custom color thresholds (overrides auto color generation)
    colorThresholds: /* @__PURE__ */ f(Es),
    // Override dark mode detection (auto-detect if omitted)
    darkMode: /* @__PURE__ */ f(
      /* @__PURE__ */ w(
        /* @__PURE__ */ A(),
        /* @__PURE__ */ M(
          (t) => typeof t == "boolean" ? t : void 0
        )
      )
    ),
    grid_options: Ts
  }),
  // Cross-field validation
  /* @__PURE__ */ M((t) => {
    if (t.colorThresholds)
      return {
        ...t,
        levelThresholds: void 0,
        levelCount: t.colorThresholds.length
      };
    if (t.levelThresholds) {
      const e = t.levelCount - 1;
      if (t.levelThresholds.length !== e)
        return { ...t, levelThresholds: void 0 };
    }
    return t;
  })
);
function Ps(t) {
  if (!t || typeof t != "object")
    throw new Error("Configuration must be an object");
  const e = /* @__PURE__ */ bt(Ls, t);
  if (!e.success) {
    const s = e.issues[0];
    throw new Error(s.message);
  }
  return e.output;
}
const Os = st`
  :host {
    display: block;
    --zen-card-padding: 20px 24px;
    --zen-title-gap: 20px;
    /* Default GitHub Light Theme Colors */
    --gh-c-0: #ebedf0;
    --gh-c-1: #9be9a8;
    --gh-c-2: #40c463;
    --gh-c-3: #30a14e;
    --gh-c-4: #216e39;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --gh-c-0: #161b22;
      --gh-c-1: #0e4429;
      --gh-c-2: #006d32;
      --gh-c-3: #26a641;
      --gh-c-4: #39d353;
    }
  }

  /* Support class-based or attribute-based dark mode (e.g. from HA or Demo) */
  :host-context(.dark),
  :host-context([dark]) {
    --gh-c-0: #161b22;
    --gh-c-1: #0e4429;
    --gh-c-2: #006d32;
    --gh-c-3: #26a641;
    --gh-c-4: #39d353;
  }

  ha-card {
    padding: var(--zen-card-padding);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--ha-card-background, var(--card-background-color, #fff));
    color: var(--primary-text-color);
  }

  .header {
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: var(--zen-title-gap);
    color: var(--primary-text-color);
    text-align: left;
    font-family: var(
      --ha-font-family-body,
      -apple-system,
      BlinkMacSystemFont,
      'SF Pro Display',
      'Segoe UI',
      Roboto,
      sans-serif
    );
  }

  .tooltip {
    position: fixed;
    padding: 8px 12px;
    background: var(--primary-text-color);
    color: var(--ha-card-background, var(--card-background-color, #fff));
    border-radius: 8px;
    font-size: 12px;
    font-family: var(
      --ha-font-family-body,
      -apple-system,
      BlinkMacSystemFont,
      'SF Pro Text',
      'Segoe UI',
      Roboto,
      sans-serif
    );
    pointer-events: none;
    z-index: 1000;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translate(-50%, -100%) translateY(-8px);
  }

  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: var(--primary-text-color);
  }

  .tooltip-date {
    font-weight: 600;
    margin-bottom: 2px;
  }

  .tooltip-count {
    opacity: 0.8;
    font-weight: 500;
  }

  .loading,
  .error,
  .empty {
    padding: 20px;
    text-align: center;
    color: var(--secondary-text-color);
    font-size: 14px;
  }

  .error {
    color: #d32f2f;
  }
`, St = {
  less: "Less",
  more: "More",
  loading: "Loading history...",
  noData: "No data available",
  error: "Failed to load statistics data",
  missing: "Missing"
}, Ns = {
  en: St,
  nl: {
    less: "Minder",
    more: "Meer",
    loading: "Laden...",
    noData: "Geen gegevens",
    error: "Laden mislukt",
    missing: "Ontbreekt"
  },
  de: {
    less: "Weniger",
    more: "Mehr",
    loading: "Laden...",
    noData: "Keine Daten",
    error: "Fehler beim Laden",
    missing: "Fehlt"
  },
  fr: {
    less: "Moins",
    more: "Plus",
    loading: "Chargement...",
    noData: "Aucune donnée",
    error: "Erreur de chargement",
    missing: "Manquant"
  },
  es: {
    less: "Menos",
    more: "Más",
    loading: "Cargando...",
    noData: "Sin datos",
    error: "Error al cargar",
    missing: "Falta"
  }
}, Y = (t, e = "en") => Ns[e.split("-")[0]]?.[t] ?? St[t], Us = st`
  .graph-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-x: auto;
  }

  svg {
    width: 100%;
    font-family: var(
      --ha-font-family-body,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Helvetica,
      Arial,
      sans-serif
    );
  }

  text {
    font-size: 10px;
    fill: var(--secondary-text-color);
  }

  rect {
    shape-rendering: geometricPrecision;
    rx: 2;
    ry: 2;
  }

  .legend {
    display: flex;
    align-items: center;
    align-self: flex-end;
    gap: 3px;
    font-size: 11px;
    font-weight: 500;
    color: var(--secondary-text-color);
    margin-top: 4px;
    font-family: var(
      --ha-font-family-body,
      -apple-system,
      BlinkMacSystemFont,
      'SF Pro Text',
      'Segoe UI',
      Roboto,
      sans-serif
    );
  }

  .legend span {
    margin: 0 4px;
  }

  .legend-item {
    width: 8px;
    height: 8px;
    border-radius: 2px;
  }

  .year-graph {
    width: 100%;
    margin-bottom: 16px;
  }

  .year-graph:last-child {
    margin-bottom: 8px;
  }

  .year-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--secondary-text-color);
    margin-bottom: 6px;
    margin-left: 30px;
    font-family: var(
      --ha-font-family-body,
      -apple-system,
      BlinkMacSystemFont,
      'SF Pro Display',
      'Segoe UI',
      Roboto,
      sans-serif
    );
    letter-spacing: -0.01em;
  }
`;
const Rs = (t) => t.strings === void 0;
const Hs = { CHILD: 2 }, Is = (t) => (...e) => ({ _$litDirective$: t, values: e });
class zs {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, s, n) {
    this._$Ct = e, this._$AM = s, this._$Ci = n;
  }
  _$AS(e, s) {
    return this.update(e, s);
  }
  update(e, s) {
    return this.render(...s);
  }
}
const te = (t, e) => {
  const s = t._$AN;
  if (s === void 0) return !1;
  for (const n of s) n._$AO?.(e, !1), te(n, e);
  return !0;
}, ue = (t) => {
  let e, s;
  do {
    if ((e = t._$AM) === void 0) break;
    s = e._$AN, s.delete(t), t = e;
  } while (s?.size === 0);
}, wt = (t) => {
  for (let e; e = t._$AM; t = e) {
    let s = e._$AN;
    if (s === void 0) e._$AN = s = /* @__PURE__ */ new Set();
    else if (s.has(t)) break;
    s.add(t), Gs(e);
  }
};
function Fs(t) {
  this._$AN !== void 0 ? (ue(this), this._$AM = t, wt(this)) : this._$AM = t;
}
function js(t, e = !1, s = 0) {
  const n = this._$AH, r = this._$AN;
  if (r !== void 0 && r.size !== 0) if (e) if (Array.isArray(n)) for (let i = s; i < n.length; i++) te(n[i], !1), ue(n[i]);
  else n != null && (te(n, !1), ue(n));
  else te(this, t);
}
const Gs = (t) => {
  t.type == Hs.CHILD && (t._$AP ??= js, t._$AQ ??= Fs);
};
class Vs extends zs {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, s, n) {
    super._$AT(e, s, n), wt(this), this.isConnected = e._$AU;
  }
  _$AO(e, s = !0) {
    e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), s && (te(this, e), ue(this));
  }
  setValue(e) {
    if (Rs(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const s = [...this._$Ct._$AH];
      s[this._$Ci] = e, this._$Ct._$AI(s, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
const ve = /* @__PURE__ */ new WeakMap(), Ws = Is(class extends Vs {
  render(t) {
    return m;
  }
  update(t, [e]) {
    const s = e !== this.G;
    return s && this.G !== void 0 && this.rt(void 0), (s || this.lt !== this.ct) && (this.G = e, this.ht = t.options?.host, this.rt(this.ct = t.element)), m;
  }
  rt(t) {
    if (this.isConnected || (t = void 0), typeof this.G == "function") {
      const e = this.ht ?? globalThis;
      let s = ve.get(e);
      s === void 0 && (s = /* @__PURE__ */ new WeakMap(), ve.set(e, s)), s.get(this.G) !== void 0 && this.G.call(this.ht, void 0), s.set(this.G, t), t !== void 0 && this.G.call(this.ht, t);
    } else this.G.value = t;
  }
  get lt() {
    return typeof this.G == "function" ? ve.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
function Bs(t, e) {
  if (t.length === 0) return [];
  const r = (($e(t[0].date) ?? new Date(t[0].date)).getDay() - e + 7) % 7;
  return t.map((i, o) => {
    const c = (($e(i.date) ?? new Date(i.date)).getDay() - e + 7) % 7, h = Math.floor((o + r) / 7);
    return { day: i, row: c, col: h };
  });
}
const we = 10, Me = 3, V = we + Me, Ke = 30, Xe = 20, Ys = 0.8, Qe = /* @__PURE__ */ new WeakMap();
function qs(t, e, s = 1) {
  const n = s * 100, r = s === 1 ? "" : `width: ${n}%;`, i = t < 52 ? `max-width: ${e * s}px;` : "";
  return `${r}${i}`;
}
function Zs(t, e, s, n = Ys) {
  const r = Math.max(0, s - e), i = t - e * n;
  return Math.min(r, Math.max(0, i));
}
function Ks(t, e, s) {
  const n = t.ownerSVGElement?.closest(
    ".graph-container"
  );
  if (!n) return;
  const r = e.config, i = [
    s,
    r.range,
    r.years,
    r.days,
    r.end_date ?? "",
    r.zoom ?? 1
  ].join("|");
  Qe.get(n) !== i && requestAnimationFrame(() => {
    if (!t.isConnected || !n.isConnected) return;
    const o = n.getBoundingClientRect(), l = t.getBoundingClientRect(), a = n.scrollLeft + (l.left - o.left) + l.width / 2;
    n.scrollLeft = Zs(
      a,
      n.clientWidth,
      n.scrollWidth
    ), Qe.set(n, i);
  });
}
function H(t, e, s) {
  const n = new Date(Date.UTC(2e3, 0, 2 + t)), r = s === "letter" ? "narrow" : "short";
  return n.toLocaleString(e, {
    weekday: r,
    timeZone: "UTC"
  });
}
function Xs(t, e, s) {
  return t === "none" ? [] : t === "all" || t === "letter" ? [0, 1, 2, 3, 4, 5, 6].map((n) => ({
    row: n,
    label: H((n + e) % 7, s, t)
  })) : e === 0 ? [
    { row: 1, label: H(1, s, t) },
    // Mon
    { row: 3, label: H(3, s, t) },
    // Wed
    { row: 5, label: H(5, s, t) }
    // Fri
  ] : [
    { row: 1, label: H(2, s, t) },
    // Tue
    { row: 3, label: H(4, s, t) },
    // Thu
    { row: 5, label: H(6, s, t) }
    // Sat
  ];
}
function Qs(t, e, s, n, r) {
  const i = s.config.weekStartDay === "sunday" ? 0 : 1, o = ct(/* @__PURE__ */ new Date()), l = /* @__PURE__ */ new Map();
  t.weeks.forEach((_, v) => {
    for (const T of _) {
      const C = $e(T.date) ?? new Date(T.date);
      if (C.getDate() === 1) {
        const D = C.getMonth();
        l.has(D) || l.set(D, v);
      }
    }
  });
  const a = [], c = Array.from(l.entries()).sort(
    (_, v) => _[1] - v[1]
  );
  n && !l.has(0) && c.unshift([0, 0]);
  let h = -999;
  for (const [_, v] of c)
    if (v - h > 2) {
      const T = new Date(Date.UTC(2e3, _, 1)).toLocaleString(
        s.locale,
        {
          month: "short",
          timeZone: "UTC"
        }
      );
      a.push(me`<text x="${v * V}" y="-7">${T}</text>`), h = v;
    }
  const u = t.weeks.length * V - Me, d = 7 * V - Me, p = Ke + u + 5, y = s.config.zoom ?? 1, $ = Xs(
    s.config.weekdayLabels,
    i,
    s.locale
  ), b = t.range.label || "", k = s.config.cardPadding, j = s.config.titleGap, G = k !== void 0 || j !== void 0 ? S`<style>
          :host {
            ${k !== void 0 ? `--zen-card-padding: ${k}px;` : ""}
            ${j !== void 0 ? `--zen-title-gap: ${j}px;` : ""}
          }
        </style>` : "";
  return S`
    ${G}
    <div class="year-graph">
      ${r ? S`<div class="year-label">${b}</div>` : ""}
      <svg
        viewBox="0 0 ${p} ${Xe + d + 2}"
        style="${qs(
    t.weeks.length,
    p,
    y
  )}"
      >
        <g transform="translate(${Ke}, ${Xe})">
          ${a}
          ${Bs(t.weeks.flat(), i).map(
    ({ day: _, row: v, col: T }) => {
      const C = _.missing ? "rgba(128, 128, 128, 0.02)" : e[_.level] ?? e[e.length - 1], D = s.config.scrollToToday && _.date === o;
      return me`
                <rect
                  width="${we}"
                  height="${we}"
                  x="${T * V}"
                  y="${v * V}"
                  rx="2"
                  ry="2"
                  fill="${C}"
                  data-date="${_.date}"
                  ${D ? Ws((x) => {
        x instanceof SVGRectElement && Ks(x, s, o);
      }) : m}
                  style="cursor: pointer;"
                  @mouseenter=${(x) => s.onCellMouseEnter(x, _.date, _.count, _.missing)}
                  @mouseleave=${s.onCellMouseLeave}
                />
              `;
    }
  )}
          ${$.map(
    ({ row: _, label: v }) => me`
                <text x="-5" y="${_ * V + 9}" text-anchor="end" style="font-size: 9px;">${v}</text>
            `
  )}
        </g>
      </svg>
    </div>
  `;
}
function Je(t, e) {
  const n = Number.isInteger(t) ? t.toLocaleString(e) : t.toLocaleString(e, { maximumFractionDigits: 1 });
  return t > 0 ? `+${n}` : t === 0 ? "0" : n;
}
function Js(t, e, s) {
  const { isDiverging: n, minValue: r, maxValue: i } = s ?? {}, o = t.map((h) => {
    const u = h === "transparent" ? "background-color: transparent; border: 1px solid var(--secondary-text-color);" : `background-color: ${h};`;
    return S`<div class="legend-item" style="${u}"></div>`;
  }), l = typeof r == "number" && typeof i == "number" && Number.isFinite(r) && Number.isFinite(i), a = n && l ? Je(r, e) : Y("less", e), c = n && l ? Je(i, e) : Y("more", e);
  return S`
    <div class="legend">
      <span>${a}</span>
      ${o}
      <span>${c}</span>
    </div>
  `;
}
const en = {
  styles: Us,
  getCardSize(t) {
    return t.range === "year" ? 3 * (t.years ?? 1) : (t.days ?? 364) <= 30 ? 2 : 3;
  },
  render(t) {
    const { config: e, data: s, colorScale: n, locale: r } = t, i = e.range === "year", o = s.length > 1, a = he(e.negativeColor) && he(e.positiveColor) ? {
      isDiverging: !0,
      minValue: s[0]?.minCount,
      maxValue: s[0]?.maxCount
    } : void 0;
    return S`
      <div class="graph-container">
        ${s.map(
      (c) => Qs(
        c,
        n,
        t,
        i,
        o
      )
    )}
        ${e.show_legend !== !1 ? Js(n, r, a) : ""}
      </div>
    `;
  }
}, Mt = {
  heatmap: en
};
function et(t) {
  const e = Mt[t];
  if (!e)
    throw new Error(`Unknown card type: ${t}`);
  return e;
}
function tn() {
  return Object.values(Mt).map((t) => t.styles);
}
function sn(t, e) {
  const { entityId: s, attribute: n } = e, r = t.states[s];
  if (!r) return [];
  const i = r.attributes[n];
  return !i || !Array.isArray(i) || i.length === 0 ? [] : i.filter(
    (o) => typeof o == "object" && o !== null && "date" in o && "count" in o && typeof o.date == "string" && typeof o.count == "number"
  ).map((o) => ({ date: o.date, count: o.count }));
}
async function nn(t, e) {
  const { entityId: s, startDate: n, endDate: r, period: i = "day" } = e, l = await t.callWS({
    type: "recorder/statistics_during_period",
    start_time: n.toISOString(),
    end_time: r.toISOString(),
    statistic_ids: [s],
    period: i
  });
  return !l || !l[s] ? [] : l[s];
}
function rn(t, e = "max") {
  if (!t || t.length === 0) return [];
  const s = [];
  for (const n of t) {
    const r = n[e];
    if (r == null) continue;
    const i = ht(n.start);
    i && s.push({ date: i, count: r });
  }
  return s.sort((n, r) => n.date.localeCompare(r.date));
}
var on = Object.defineProperty, an = Object.getOwnPropertyDescriptor, U = (t, e, s, n) => {
  for (var r = n > 1 ? void 0 : n ? an(e, s) : e, i = t.length - 1, o; i >= 0; i--)
    (o = t[i]) && (r = (n ? o(e, s, r) : o(r)) || r);
  return n && r && on(e, s, r), r;
};
console.info(
  "%c ZEN-UI %c 1.2.1 ",
  "color: #5c5f77; background: #ea76cb; font-weight: bold; padding: 2px 4px; border-radius: 4px 0 0 4px;",
  "color: #ea76cb; background: #5c5f77; font-weight: bold; padding: 2px 4px; border-radius: 0 4px 4px 0;"
);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "zen-ui",
  name: "Zen UI",
  description: "GitHub-style contribution heatmap for tracking daily metrics",
  preview: !0,
  documentationURL: "https://github.com/shashanktomar/zen-ui"
});
let P = class extends ee {
  constructor() {
    super(...arguments), this._darkMode = !1, this._historyData = [], this._loading = !1, this._onDarkModeChange = () => {
      this._updateDarkMode();
    }, this._onCellMouseEnter = (t, e, s, n) => {
      const r = t.target.getBoundingClientRect();
      this._tooltip = {
        x: r.left + r.width / 2,
        y: r.top,
        date: e,
        count: s,
        missing: n
      };
    }, this._onCellMouseLeave = () => {
      this._tooltip = void 0;
    };
  }
  static getStubConfig() {
    return {
      type: "custom:zen-ui",
      card: "heatmap",
      entity: "",
      title: "Preview"
    };
  }
  setConfig(t) {
    this._config = Ps(t);
  }
  getCardSize() {
    return this._config ? et(this._config.card).getCardSize(this._config) : 3;
  }
  getGridOptions() {
    return {
      columns: this._config?.grid_options?.columns ?? "full",
      min_columns: this._config?.grid_options?.min_columns ?? 6,
      min_rows: this._config?.grid_options?.min_rows ?? 2
    };
  }
  updated(t) {
    (t.has("hass") || t.has("_config")) && this._updateDarkMode(), (t.has("hass") || t.has("_config")) && this._fetchHistoryIfNeeded();
  }
  connectedCallback() {
    super.connectedCallback(), this._setupDarkModeDetection();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanupDarkModeDetection();
  }
  _setupDarkModeDetection() {
    this._darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)"), this._darkModeMediaQuery.addEventListener("change", this._onDarkModeChange), this._darkModeObserver = new MutationObserver(this._onDarkModeChange), this._darkModeObserver.observe(document.body, {
      attributes: !0,
      attributeFilter: ["class"]
    }), this._darkModeObserver.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }), this._updateDarkMode();
  }
  _cleanupDarkModeDetection() {
    this._darkModeMediaQuery?.removeEventListener(
      "change",
      this._onDarkModeChange
    ), this._darkModeObserver?.disconnect();
  }
  _updateDarkMode() {
    this._darkMode = this._detectDarkMode();
  }
  _detectDarkMode() {
    if (this._config?.darkMode !== void 0)
      return this._config.darkMode;
    if (this.hass?.themes?.darkMode !== void 0)
      return this.hass.themes.darkMode;
    const t = document.querySelector("meta[name=color-scheme]");
    return t ? t.getAttribute("content")?.includes("dark") ?? !1 : document.body.classList.contains("dark") || document.documentElement.classList.contains("dark") ? !0 : window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? !1;
  }
  _getFetchKey() {
    const t = this._config;
    return `${t.entity}|${t.range}|${t.years}|${t.days}|${t.end_date ?? ""}`;
  }
  _fetchHistoryIfNeeded() {
    if (!this._config?.entity || !this.hass) return;
    const t = this._getFetchKey();
    this._lastFetchKey !== t && (this._lastFetchKey = t, this._fetchStatistics());
  }
  async _fetchStatistics() {
    if (!(!this._config?.entity || !this.hass) && typeof this.hass.callWS == "function") {
      this._loading = !0, this._error = void 0;
      try {
        const t = this._getPipelineConfig(), e = ft(t), s = e[0].startDate, n = e[e.length - 1].endDate, r = await nn(this.hass, {
          entityId: this._config.entity,
          startDate: s,
          endDate: n,
          period: "day"
        }), i = this._getStatisticsType();
        this._historyData = rn(r, i);
      } catch (t) {
        console.error("Failed to fetch statistics:", t), this._error = "Failed to load statistics data", this._historyData = [];
      } finally {
        this._loading = !1;
      }
    }
  }
  _getStatisticsType() {
    if (!this._config?.entity || !this.hass) return "max";
    const e = this.hass.states[this._config.entity]?.attributes?.state_class;
    return e === "total" || e === "total_increasing" ? "change" : "max";
  }
  _getRawData() {
    if (!this._config) return [];
    if (!this._config.entity)
      return this._generateMockData();
    if (this.hass) {
      const t = sn(this.hass, {
        entityId: this._config.entity,
        attribute: this._config.attribute || "data"
      });
      if (t.length > 0)
        return t;
    }
    return this._historyData.length > 0 ? this._historyData : [];
  }
  _generateMockData() {
    const t = [], e = /* @__PURE__ */ new Date();
    e.setHours(0, 0, 0, 0);
    let n = 12345;
    const r = () => (n = n * 1103515245 + 12345 & 2147483647, n / 2147483647);
    for (let i = 0; i < 365; i++) {
      const o = new Date(e);
      o.setDate(o.getDate() - i);
      const l = o.getDay(), a = Math.floor(i / 7), c = Math.sin(a * 0.3) * 0.3 + 0.5, h = l >= 1 && l <= 5 ? 1 : 0.4, u = r(), d = Math.floor(u * c * h * 15);
      if (r() > 0.25 && d > 0) {
        const p = o.getFullYear(), y = String(o.getMonth() + 1).padStart(2, "0"), $ = String(o.getDate()).padStart(2, "0");
        t.push({
          date: `${p}-${y}-${$}`,
          count: d
        });
      }
    }
    return t;
  }
  /**
   * Checks if diverging color mode is enabled.
   * Requires both negativeColor and positiveColor to be valid hex colors.
   */
  _isDiverging() {
    return this._config ? he(this._config.negativeColor) && he(this._config.positiveColor) : !1;
  }
  /**
   * Gets the effective level count, adjusting for diverging mode requirements.
   * Diverging mode requires odd levelCount >= 3.
   */
  _getEffectiveLevelCount() {
    const t = this._config;
    if (t.colorThresholds)
      return t.colorThresholds.length;
    let e = t.levelCount ?? 5;
    return this._isDiverging() && (e = Math.max(3, e), e % 2 === 0 && e++), e;
  }
  _getPipelineConfig() {
    const t = this._config, e = t.end_date ? new Date(t.end_date) : /* @__PURE__ */ new Date(), s = this._isDiverging(), n = t.levelCount ?? 5, r = this._getEffectiveLevelCount();
    s && t.valueMode === "clamp_zero" && console.warn(
      'zen-ui: diverging colors require valueMode "range", ignoring clamp_zero'
    );
    let i = t.levelThresholds;
    return s && t.levelThresholds && r !== n && (console.warn(
      "zen-ui: levelThresholds ignored because levelCount was adjusted for diverging mode"
    ), i = void 0), {
      mode: t.range === "year" ? "fixed" : "rolling",
      years: t.years,
      days: t.days,
      targetYear: e.getFullYear(),
      weekStartDay: ys(t.weekStartDay),
      levelCount: r,
      levelThresholds: i,
      missingMode: t.missingMode,
      // Force range mode for diverging
      valueMode: s ? "range" : t.valueMode,
      isDiverging: s,
      neutralValue: t.neutralValue,
      maxValue: t.maxValue,
      colorThresholdValues: t.colorThresholds?.map((o) => o.value)
    };
  }
  _getColorScale(t) {
    const e = this._config, s = this._getEffectiveLevelCount();
    return e.colorThresholds ? e.colorThresholds.map((n) => n.color) : this._isDiverging() ? as(
      e.negativeColor,
      e.positiveColor,
      s,
      t ?? Math.floor(s / 2),
      { darkMode: this._darkMode }
    ) : os(e.baseColor, s, {
      darkMode: this._darkMode
    });
  }
  _getLocale() {
    return this.hass?.locale?.language ?? "en";
  }
  _formatTooltipDate(t) {
    return (/* @__PURE__ */ new Date(t + "T12:00:00")).toLocaleDateString(this._getLocale(), {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }
  _getUnit() {
    return this._config ? this._config.unit ? this._config.unit : this.hass?.states[this._config.entity]?.attributes?.unit_of_measurement : void 0;
  }
  render() {
    if (!this._config) return S``;
    const t = this._config.backgroundColor ? `background-color: ${this._config.backgroundColor};` : "";
    if (this._loading)
      return S`
        <ha-card style="${t}">
          ${this._config.title ? S`<div class="header">${this._config.title}</div>` : ""}
          <div class="loading">${Y("loading", this._getLocale())}</div>
        </ha-card>
      `;
    if (this._error)
      return S`
        <ha-card style="${t}">
          ${this._config.title ? S`<div class="header">${this._config.title}</div>` : ""}
          <div class="error">${Y("error", this._getLocale())}</div>
        </ha-card>
      `;
    const e = et(this._config.card), s = this._getRawData(), n = this._getPipelineConfig(), r = is(n, s), i = r[0]?.neutralLevel, o = this._getColorScale(i);
    if (r.length === 0)
      return S`
        <ha-card style="${t}">
          ${this._config.title ? S`<div class="header">${this._config.title}</div>` : ""}
          <div class="empty">${Y("noData", this._getLocale())}</div>
        </ha-card>
      `;
    const l = {
      config: this._config,
      data: r,
      colorScale: o,
      darkMode: this._darkMode,
      locale: this._getLocale(),
      tooltip: this._tooltip,
      onCellMouseEnter: this._onCellMouseEnter,
      onCellMouseLeave: this._onCellMouseLeave
    };
    return S`
      <ha-card style="${t}">
        ${this._config.title ? S`<div class="header">${this._config.title}</div>` : ""}
        ${e.render(l)}
      </ha-card>
      ${this._tooltip ? S`
            <div
              class="tooltip"
              style="left: ${this._tooltip.x}px; top: ${this._tooltip.y}px;"
            >
              <div class="tooltip-date">
                ${this._formatTooltipDate(this._tooltip.date)}
              </div>
              <div class="tooltip-count">
                ${this._tooltip.missing ? Y("missing", this._getLocale()) : `${this._tooltip.count.toFixed(2)}${this._getUnit() ? ` ${this._getUnit()}` : ""}`}
              </div>
            </div>
          ` : ""}
    `;
  }
};
P.styles = [Os, ...tn()];
U([
  lt({ attribute: !1 })
], P.prototype, "hass", 2);
U([
  K()
], P.prototype, "_config", 2);
U([
  K()
], P.prototype, "_darkMode", 2);
U([
  K()
], P.prototype, "_tooltip", 2);
U([
  K()
], P.prototype, "_historyData", 2);
U([
  K()
], P.prototype, "_loading", 2);
U([
  K()
], P.prototype, "_error", 2);
P = U([
  Bt("zen-ui")
], P);
export {
  P as ZenUI
};
