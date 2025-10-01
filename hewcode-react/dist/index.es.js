import * as b from "react";
import Ke, { createContext as cl, forwardRef as Sn, useRef as st, useMemo as ke, useState as Ee, useEffect as Xt, useImperativeHandle as hd, createElement as Rr, useCallback as Te, useLayoutEffect as ll } from "react";
import * as En from "react-dom";
import md from "react-dom";
var Di = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function gd(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var Ur = { exports: {} }, hr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fi;
function yd() {
  if (Fi) return hr;
  Fi = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function r(n, o, s) {
    var i = null;
    if (s !== void 0 && (i = "" + s), o.key !== void 0 && (i = "" + o.key), "key" in o) {
      s = {};
      for (var a in o)
        a !== "key" && (s[a] = o[a]);
    } else s = o;
    return o = s.ref, {
      $$typeof: e,
      type: n,
      key: i,
      ref: o !== void 0 ? o : null,
      props: s
    };
  }
  return hr.Fragment = t, hr.jsx = r, hr.jsxs = r, hr;
}
var mr = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Li;
function vd() {
  return Li || (Li = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(N) {
      if (N == null) return null;
      if (typeof N == "function")
        return N.$$typeof === j ? null : N.displayName || N.name || null;
      if (typeof N == "string") return N;
      switch (N) {
        case p:
          return "Fragment";
        case v:
          return "Profiler";
        case d:
          return "StrictMode";
        case P:
          return "Suspense";
        case T:
          return "SuspenseList";
        case I:
          return "Activity";
      }
      if (typeof N == "object")
        switch (typeof N.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), N.$$typeof) {
          case g:
            return "Portal";
          case w:
            return (N.displayName || "Context") + ".Provider";
          case y:
            return (N._context.displayName || "Context") + ".Consumer";
          case S:
            var U = N.render;
            return N = N.displayName, N || (N = U.displayName || U.name || "", N = N !== "" ? "ForwardRef(" + N + ")" : "ForwardRef"), N;
          case A:
            return U = N.displayName || null, U !== null ? U : e(N.type) || "Memo";
          case E:
            U = N._payload, N = N._init;
            try {
              return e(N(U));
            } catch {
            }
        }
      return null;
    }
    function t(N) {
      return "" + N;
    }
    function r(N) {
      try {
        t(N);
        var U = !1;
      } catch {
        U = !0;
      }
      if (U) {
        U = console;
        var Z = U.error, Y = typeof Symbol == "function" && Symbol.toStringTag && N[Symbol.toStringTag] || N.constructor.name || "Object";
        return Z.call(
          U,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          Y
        ), t(N);
      }
    }
    function n(N) {
      if (N === p) return "<>";
      if (typeof N == "object" && N !== null && N.$$typeof === E)
        return "<...>";
      try {
        var U = e(N);
        return U ? "<" + U + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function o() {
      var N = L.A;
      return N === null ? null : N.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function i(N) {
      if (D.call(N, "key")) {
        var U = Object.getOwnPropertyDescriptor(N, "key").get;
        if (U && U.isReactWarning) return !1;
      }
      return N.key !== void 0;
    }
    function a(N, U) {
      function Z() {
        Q || (Q = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          U
        ));
      }
      Z.isReactWarning = !0, Object.defineProperty(N, "key", {
        get: Z,
        configurable: !0
      });
    }
    function l() {
      var N = e(this.type);
      return q[N] || (q[N] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), N = this.props.ref, N !== void 0 ? N : null;
    }
    function c(N, U, Z, Y, W, re, ie, k) {
      return Z = re.ref, N = {
        $$typeof: h,
        type: N,
        key: U,
        props: re,
        _owner: W
      }, (Z !== void 0 ? Z : null) !== null ? Object.defineProperty(N, "ref", {
        enumerable: !1,
        get: l
      }) : Object.defineProperty(N, "ref", { enumerable: !1, value: null }), N._store = {}, Object.defineProperty(N._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(N, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(N, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ie
      }), Object.defineProperty(N, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: k
      }), Object.freeze && (Object.freeze(N.props), Object.freeze(N)), N;
    }
    function u(N, U, Z, Y, W, re, ie, k) {
      var $ = U.children;
      if ($ !== void 0)
        if (Y)
          if (X($)) {
            for (Y = 0; Y < $.length; Y++)
              f($[Y]);
            Object.freeze && Object.freeze($);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else f($);
      if (D.call(U, "key")) {
        $ = e(N);
        var H = Object.keys(U).filter(function(F) {
          return F !== "key";
        });
        Y = 0 < H.length ? "{key: someKey, " + H.join(": ..., ") + ": ...}" : "{key: someKey}", J[$ + Y] || (H = 0 < H.length ? "{" + H.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          Y,
          $,
          H,
          $
        ), J[$ + Y] = !0);
      }
      if ($ = null, Z !== void 0 && (r(Z), $ = "" + Z), i(U) && (r(U.key), $ = "" + U.key), "key" in U) {
        Z = {};
        for (var M in U)
          M !== "key" && (Z[M] = U[M]);
      } else Z = U;
      return $ && a(
        Z,
        typeof N == "function" ? N.displayName || N.name || "Unknown" : N
      ), c(
        N,
        $,
        re,
        W,
        o(),
        Z,
        ie,
        k
      );
    }
    function f(N) {
      typeof N == "object" && N !== null && N.$$typeof === h && N._store && (N._store.validated = 1);
    }
    var m = Ke, h = Symbol.for("react.transitional.element"), g = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), y = Symbol.for("react.consumer"), w = Symbol.for("react.context"), S = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), A = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), I = Symbol.for("react.activity"), j = Symbol.for("react.client.reference"), L = m.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = Object.prototype.hasOwnProperty, X = Array.isArray, B = console.createTask ? console.createTask : function() {
      return null;
    };
    m = {
      react_stack_bottom_frame: function(N) {
        return N();
      }
    };
    var Q, q = {}, z = m.react_stack_bottom_frame.bind(
      m,
      s
    )(), R = B(n(s)), J = {};
    mr.Fragment = p, mr.jsx = function(N, U, Z, Y, W) {
      var re = 1e4 > L.recentlyCreatedOwnerStacks++;
      return u(
        N,
        U,
        Z,
        !1,
        Y,
        W,
        re ? Error("react-stack-top-frame") : z,
        re ? B(n(N)) : R
      );
    }, mr.jsxs = function(N, U, Z, Y, W) {
      var re = 1e4 > L.recentlyCreatedOwnerStacks++;
      return u(
        N,
        U,
        Z,
        !0,
        Y,
        W,
        re ? Error("react-stack-top-frame") : z,
        re ? B(n(N)) : R
      );
    };
  })()), mr;
}
var $i;
function bd() {
  return $i || ($i = 1, process.env.NODE_ENV === "production" ? Ur.exports = yd() : Ur.exports = vd()), Ur.exports;
}
var x = bd(), ro, Bi;
function nr() {
  return Bi || (Bi = 1, ro = TypeError), ro;
}
const wd = {}, xd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wd
}, Symbol.toStringTag, { value: "Module" })), Sd = /* @__PURE__ */ gd(xd);
var no, qi;
function Pn() {
  if (qi) return no;
  qi = 1;
  var e = typeof Map == "function" && Map.prototype, t = Object.getOwnPropertyDescriptor && e ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, r = e && t && typeof t.get == "function" ? t.get : null, n = e && Map.prototype.forEach, o = typeof Set == "function" && Set.prototype, s = Object.getOwnPropertyDescriptor && o ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, i = o && s && typeof s.get == "function" ? s.get : null, a = o && Set.prototype.forEach, l = typeof WeakMap == "function" && WeakMap.prototype, c = l ? WeakMap.prototype.has : null, u = typeof WeakSet == "function" && WeakSet.prototype, f = u ? WeakSet.prototype.has : null, m = typeof WeakRef == "function" && WeakRef.prototype, h = m ? WeakRef.prototype.deref : null, g = Boolean.prototype.valueOf, p = Object.prototype.toString, d = Function.prototype.toString, v = String.prototype.match, y = String.prototype.slice, w = String.prototype.replace, S = String.prototype.toUpperCase, P = String.prototype.toLowerCase, T = RegExp.prototype.test, A = Array.prototype.concat, E = Array.prototype.join, I = Array.prototype.slice, j = Math.floor, L = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, D = Object.getOwnPropertySymbols, X = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, B = typeof Symbol == "function" && typeof Symbol.iterator == "object", Q = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === B || !0) ? Symbol.toStringTag : null, q = Object.prototype.propertyIsEnumerable, z = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(C) {
    return C.__proto__;
  } : null);
  function R(C, O) {
    if (C === 1 / 0 || C === -1 / 0 || C !== C || C && C > -1e3 && C < 1e3 || T.call(/e/, O))
      return O;
    var ae = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof C == "number") {
      var ue = C < 0 ? -j(-C) : j(C);
      if (ue !== C) {
        var de = String(ue), oe = y.call(O, de.length + 1);
        return w.call(de, ae, "$&_") + "." + w.call(w.call(oe, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return w.call(O, ae, "$&_");
  }
  var J = Sd, N = J.custom, U = le(N) ? N : null, Z = {
    __proto__: null,
    double: '"',
    single: "'"
  }, Y = {
    __proto__: null,
    double: /(["\\])/g,
    single: /(['\\])/g
  };
  no = function C(O, ae, ue, de) {
    var oe = ae || {};
    if (we(oe, "quoteStyle") && !we(Z, oe.quoteStyle))
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (we(oe, "maxStringLength") && (typeof oe.maxStringLength == "number" ? oe.maxStringLength < 0 && oe.maxStringLength !== 1 / 0 : oe.maxStringLength !== null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var ht = we(oe, "customInspect") ? oe.customInspect : !0;
    if (typeof ht != "boolean" && ht !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (we(oe, "indent") && oe.indent !== null && oe.indent !== "	" && !(parseInt(oe.indent, 10) === oe.indent && oe.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (we(oe, "numericSeparator") && typeof oe.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var At = oe.numericSeparator;
    if (typeof O > "u")
      return "undefined";
    if (O === null)
      return "null";
    if (typeof O == "boolean")
      return O ? "true" : "false";
    if (typeof O == "string")
      return Ci(O, oe);
    if (typeof O == "number") {
      if (O === 0)
        return 1 / 0 / O > 0 ? "0" : "-0";
      var Ne = String(O);
      return At ? R(O, Ne) : Ne;
    }
    if (typeof O == "bigint") {
      var mt = String(O) + "n";
      return At ? R(O, mt) : mt;
    }
    var Jn = typeof oe.depth > "u" ? 5 : oe.depth;
    if (typeof ue > "u" && (ue = 0), ue >= Jn && Jn > 0 && typeof O == "object")
      return k(O) ? "[Array]" : "[Object]";
    var Ut = fd(oe, ue);
    if (typeof de > "u")
      de = [];
    else if (pt(de, O) >= 0)
      return "[Circular]";
    function Fe(Ht, qr, pd) {
      if (qr && (de = I.call(de), de.push(qr)), pd) {
        var ji = {
          depth: oe.depth
        };
        return we(oe, "quoteStyle") && (ji.quoteStyle = oe.quoteStyle), C(Ht, ji, ue + 1, de);
      }
      return C(Ht, oe, ue + 1, de);
    }
    if (typeof O == "function" && !H(O)) {
      var Ti = je(O), Oi = $r(O, Fe);
      return "[Function" + (Ti ? ": " + Ti : " (anonymous)") + "]" + (Oi.length > 0 ? " { " + E.call(Oi, ", ") + " }" : "");
    }
    if (le(O)) {
      var _i = B ? w.call(String(O), /^(Symbol\(.*\))_[^)]*$/, "$1") : X.call(O);
      return typeof O == "object" && !B ? dr(_i) : _i;
    }
    if (cd(O)) {
      for (var pr = "<" + P.call(String(O.nodeName)), Xn = O.attributes || [], Br = 0; Br < Xn.length; Br++)
        pr += " " + Xn[Br].name + "=" + W(re(Xn[Br].value), "double", oe);
      return pr += ">", O.childNodes && O.childNodes.length && (pr += "..."), pr += "</" + P.call(String(O.nodeName)) + ">", pr;
    }
    if (k(O)) {
      if (O.length === 0)
        return "[]";
      var Yn = $r(O, Fe);
      return Ut && !ud(Yn) ? "[" + Kn(Yn, Ut) + "]" : "[ " + E.call(Yn, ", ") + " ]";
    }
    if (M(O)) {
      var Qn = $r(O, Fe);
      return !("cause" in Error.prototype) && "cause" in O && !q.call(O, "cause") ? "{ [" + String(O) + "] " + E.call(A.call("[cause]: " + Fe(O.cause), Qn), ", ") + " }" : Qn.length === 0 ? "[" + String(O) + "]" : "{ [" + String(O) + "] " + E.call(Qn, ", ") + " }";
    }
    if (typeof O == "object" && ht) {
      if (U && typeof O[U] == "function" && J)
        return J(O, { depth: Jn - ue });
      if (ht !== "symbol" && typeof O.inspect == "function")
        return O.inspect();
    }
    if (De(O)) {
      var Ni = [];
      return n && n.call(O, function(Ht, qr) {
        Ni.push(Fe(qr, O, !0) + " => " + Fe(Ht, O));
      }), Ri("Map", r.call(O), Ni, Ut);
    }
    if (qt(O)) {
      var ki = [];
      return a && a.call(O, function(Ht) {
        ki.push(Fe(Ht, O));
      }), Ri("Set", i.call(O), ki, Ut);
    }
    if ($t(O))
      return Gn("WeakMap");
    if (ad(O))
      return Gn("WeakSet");
    if (Bt(O))
      return Gn("WeakRef");
    if (K(O))
      return dr(Fe(Number(O)));
    if (ve(O))
      return dr(Fe(L.call(O)));
    if (ee(O))
      return dr(g.call(O));
    if (F(O))
      return dr(Fe(String(O)));
    if (typeof window < "u" && O === window)
      return "{ [object Window] }";
    if (typeof globalThis < "u" && O === globalThis || typeof Di < "u" && O === Di)
      return "{ [object globalThis] }";
    if (!$(O) && !H(O)) {
      var Zn = $r(O, Fe), Ii = z ? z(O) === Object.prototype : O instanceof Object || O.constructor === Object, eo = O instanceof Object ? "" : "null prototype", Mi = !Ii && Q && Object(O) === O && Q in O ? y.call(Re(O), 8, -1) : eo ? "Object" : "", dd = Ii || typeof O.constructor != "function" ? "" : O.constructor.name ? O.constructor.name + " " : "", to = dd + (Mi || eo ? "[" + E.call(A.call([], Mi || [], eo || []), ": ") + "] " : "");
      return Zn.length === 0 ? to + "{}" : Ut ? to + "{" + Kn(Zn, Ut) + "}" : to + "{ " + E.call(Zn, ", ") + " }";
    }
    return String(O);
  };
  function W(C, O, ae) {
    var ue = ae.quoteStyle || O, de = Z[ue];
    return de + C + de;
  }
  function re(C) {
    return w.call(String(C), /"/g, "&quot;");
  }
  function ie(C) {
    return !Q || !(typeof C == "object" && (Q in C || typeof C[Q] < "u"));
  }
  function k(C) {
    return Re(C) === "[object Array]" && ie(C);
  }
  function $(C) {
    return Re(C) === "[object Date]" && ie(C);
  }
  function H(C) {
    return Re(C) === "[object RegExp]" && ie(C);
  }
  function M(C) {
    return Re(C) === "[object Error]" && ie(C);
  }
  function F(C) {
    return Re(C) === "[object String]" && ie(C);
  }
  function K(C) {
    return Re(C) === "[object Number]" && ie(C);
  }
  function ee(C) {
    return Re(C) === "[object Boolean]" && ie(C);
  }
  function le(C) {
    if (B)
      return C && typeof C == "object" && C instanceof Symbol;
    if (typeof C == "symbol")
      return !0;
    if (!C || typeof C != "object" || !X)
      return !1;
    try {
      return X.call(C), !0;
    } catch {
    }
    return !1;
  }
  function ve(C) {
    if (!C || typeof C != "object" || !L)
      return !1;
    try {
      return L.call(C), !0;
    } catch {
    }
    return !1;
  }
  var ge = Object.prototype.hasOwnProperty || function(C) {
    return C in this;
  };
  function we(C, O) {
    return ge.call(C, O);
  }
  function Re(C) {
    return p.call(C);
  }
  function je(C) {
    if (C.name)
      return C.name;
    var O = v.call(d.call(C), /^function\s*([\w$]+)/);
    return O ? O[1] : null;
  }
  function pt(C, O) {
    if (C.indexOf)
      return C.indexOf(O);
    for (var ae = 0, ue = C.length; ae < ue; ae++)
      if (C[ae] === O)
        return ae;
    return -1;
  }
  function De(C) {
    if (!r || !C || typeof C != "object")
      return !1;
    try {
      r.call(C);
      try {
        i.call(C);
      } catch {
        return !0;
      }
      return C instanceof Map;
    } catch {
    }
    return !1;
  }
  function $t(C) {
    if (!c || !C || typeof C != "object")
      return !1;
    try {
      c.call(C, c);
      try {
        f.call(C, f);
      } catch {
        return !0;
      }
      return C instanceof WeakMap;
    } catch {
    }
    return !1;
  }
  function Bt(C) {
    if (!h || !C || typeof C != "object")
      return !1;
    try {
      return h.call(C), !0;
    } catch {
    }
    return !1;
  }
  function qt(C) {
    if (!i || !C || typeof C != "object")
      return !1;
    try {
      i.call(C);
      try {
        r.call(C);
      } catch {
        return !0;
      }
      return C instanceof Set;
    } catch {
    }
    return !1;
  }
  function ad(C) {
    if (!f || !C || typeof C != "object")
      return !1;
    try {
      f.call(C, f);
      try {
        c.call(C, c);
      } catch {
        return !0;
      }
      return C instanceof WeakSet;
    } catch {
    }
    return !1;
  }
  function cd(C) {
    return !C || typeof C != "object" ? !1 : typeof HTMLElement < "u" && C instanceof HTMLElement ? !0 : typeof C.nodeName == "string" && typeof C.getAttribute == "function";
  }
  function Ci(C, O) {
    if (C.length > O.maxStringLength) {
      var ae = C.length - O.maxStringLength, ue = "... " + ae + " more character" + (ae > 1 ? "s" : "");
      return Ci(y.call(C, 0, O.maxStringLength), O) + ue;
    }
    var de = Y[O.quoteStyle || "single"];
    de.lastIndex = 0;
    var oe = w.call(w.call(C, de, "\\$1"), /[\x00-\x1f]/g, ld);
    return W(oe, "single", O);
  }
  function ld(C) {
    var O = C.charCodeAt(0), ae = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[O];
    return ae ? "\\" + ae : "\\x" + (O < 16 ? "0" : "") + S.call(O.toString(16));
  }
  function dr(C) {
    return "Object(" + C + ")";
  }
  function Gn(C) {
    return C + " { ? }";
  }
  function Ri(C, O, ae, ue) {
    var de = ue ? Kn(ae, ue) : E.call(ae, ", ");
    return C + " (" + O + ") {" + de + "}";
  }
  function ud(C) {
    for (var O = 0; O < C.length; O++)
      if (pt(C[O], `
`) >= 0)
        return !1;
    return !0;
  }
  function fd(C, O) {
    var ae;
    if (C.indent === "	")
      ae = "	";
    else if (typeof C.indent == "number" && C.indent > 0)
      ae = E.call(Array(C.indent + 1), " ");
    else
      return null;
    return {
      base: ae,
      prev: E.call(Array(O + 1), ae)
    };
  }
  function Kn(C, O) {
    if (C.length === 0)
      return "";
    var ae = `
` + O.prev + O.base;
    return ae + E.call(C, "," + ae) + `
` + O.prev;
  }
  function $r(C, O) {
    var ae = k(C), ue = [];
    if (ae) {
      ue.length = C.length;
      for (var de = 0; de < C.length; de++)
        ue[de] = we(C, de) ? O(C[de], C) : "";
    }
    var oe = typeof D == "function" ? D(C) : [], ht;
    if (B) {
      ht = {};
      for (var At = 0; At < oe.length; At++)
        ht["$" + oe[At]] = oe[At];
    }
    for (var Ne in C)
      we(C, Ne) && (ae && String(Number(Ne)) === Ne && Ne < C.length || B && ht["$" + Ne] instanceof Symbol || (T.call(/[^\w$]/, Ne) ? ue.push(O(Ne, C) + ": " + O(C[Ne], C)) : ue.push(Ne + ": " + O(C[Ne], C))));
    if (typeof D == "function")
      for (var mt = 0; mt < oe.length; mt++)
        q.call(C, oe[mt]) && ue.push("[" + O(oe[mt]) + "]: " + O(C[oe[mt]], C));
    return ue;
  }
  return no;
}
var oo, Ui;
function Ed() {
  if (Ui) return oo;
  Ui = 1;
  var e = /* @__PURE__ */ Pn(), t = /* @__PURE__ */ nr(), r = function(a, l, c) {
    for (var u = a, f; (f = u.next) != null; u = f)
      if (f.key === l)
        return u.next = f.next, c || (f.next = /** @type {NonNullable<typeof list.next>} */
        a.next, a.next = f), f;
  }, n = function(a, l) {
    if (a) {
      var c = r(a, l);
      return c && c.value;
    }
  }, o = function(a, l, c) {
    var u = r(a, l);
    u ? u.value = c : a.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
    {
      // eslint-disable-line no-param-reassign, no-extra-parens
      key: l,
      next: a.next,
      value: c
    };
  }, s = function(a, l) {
    return a ? !!r(a, l) : !1;
  }, i = function(a, l) {
    if (a)
      return r(a, l, !0);
  };
  return oo = function() {
    var l, c = {
      assert: function(u) {
        if (!c.has(u))
          throw new t("Side channel does not contain " + e(u));
      },
      delete: function(u) {
        var f = l && l.next, m = i(l, u);
        return m && f && f === m && (l = void 0), !!m;
      },
      get: function(u) {
        return n(l, u);
      },
      has: function(u) {
        return s(l, u);
      },
      set: function(u, f) {
        l || (l = {
          next: void 0
        }), o(
          /** @type {NonNullable<typeof $o>} */
          l,
          u,
          f
        );
      }
    };
    return c;
  }, oo;
}
var so, Hi;
function ul() {
  return Hi || (Hi = 1, so = Object), so;
}
var io, zi;
function Pd() {
  return zi || (zi = 1, io = Error), io;
}
var ao, Wi;
function Ad() {
  return Wi || (Wi = 1, ao = EvalError), ao;
}
var co, Vi;
function Cd() {
  return Vi || (Vi = 1, co = RangeError), co;
}
var lo, Gi;
function Rd() {
  return Gi || (Gi = 1, lo = ReferenceError), lo;
}
var uo, Ki;
function Td() {
  return Ki || (Ki = 1, uo = SyntaxError), uo;
}
var fo, Ji;
function Od() {
  return Ji || (Ji = 1, fo = URIError), fo;
}
var po, Xi;
function _d() {
  return Xi || (Xi = 1, po = Math.abs), po;
}
var ho, Yi;
function Nd() {
  return Yi || (Yi = 1, ho = Math.floor), ho;
}
var mo, Qi;
function kd() {
  return Qi || (Qi = 1, mo = Math.max), mo;
}
var go, Zi;
function Id() {
  return Zi || (Zi = 1, go = Math.min), go;
}
var yo, ea;
function Md() {
  return ea || (ea = 1, yo = Math.pow), yo;
}
var vo, ta;
function jd() {
  return ta || (ta = 1, vo = Math.round), vo;
}
var bo, ra;
function Dd() {
  return ra || (ra = 1, bo = Number.isNaN || function(t) {
    return t !== t;
  }), bo;
}
var wo, na;
function Fd() {
  if (na) return wo;
  na = 1;
  var e = /* @__PURE__ */ Dd();
  return wo = function(r) {
    return e(r) || r === 0 ? r : r < 0 ? -1 : 1;
  }, wo;
}
var xo, oa;
function Ld() {
  return oa || (oa = 1, xo = Object.getOwnPropertyDescriptor), xo;
}
var So, sa;
function fl() {
  if (sa) return So;
  sa = 1;
  var e = /* @__PURE__ */ Ld();
  if (e)
    try {
      e([], "length");
    } catch {
      e = null;
    }
  return So = e, So;
}
var Eo, ia;
function $d() {
  if (ia) return Eo;
  ia = 1;
  var e = Object.defineProperty || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return Eo = e, Eo;
}
var Po, aa;
function Bd() {
  return aa || (aa = 1, Po = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var t = {}, r = Symbol("test"), n = Object(r);
    if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
      return !1;
    var o = 42;
    t[r] = o;
    for (var s in t)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
      return !1;
    var i = Object.getOwnPropertySymbols(t);
    if (i.length !== 1 || i[0] !== r || !Object.prototype.propertyIsEnumerable.call(t, r))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var a = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(t, r)
      );
      if (a.value !== o || a.enumerable !== !0)
        return !1;
    }
    return !0;
  }), Po;
}
var Ao, ca;
function qd() {
  if (ca) return Ao;
  ca = 1;
  var e = typeof Symbol < "u" && Symbol, t = Bd();
  return Ao = function() {
    return typeof e != "function" || typeof Symbol != "function" || typeof e("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : t();
  }, Ao;
}
var Co, la;
function dl() {
  return la || (la = 1, Co = typeof Reflect < "u" && Reflect.getPrototypeOf || null), Co;
}
var Ro, ua;
function pl() {
  if (ua) return Ro;
  ua = 1;
  var e = /* @__PURE__ */ ul();
  return Ro = e.getPrototypeOf || null, Ro;
}
var To, fa;
function Ud() {
  if (fa) return To;
  fa = 1;
  var e = "Function.prototype.bind called on incompatible ", t = Object.prototype.toString, r = Math.max, n = "[object Function]", o = function(l, c) {
    for (var u = [], f = 0; f < l.length; f += 1)
      u[f] = l[f];
    for (var m = 0; m < c.length; m += 1)
      u[m + l.length] = c[m];
    return u;
  }, s = function(l, c) {
    for (var u = [], f = c, m = 0; f < l.length; f += 1, m += 1)
      u[m] = l[f];
    return u;
  }, i = function(a, l) {
    for (var c = "", u = 0; u < a.length; u += 1)
      c += a[u], u + 1 < a.length && (c += l);
    return c;
  };
  return To = function(l) {
    var c = this;
    if (typeof c != "function" || t.apply(c) !== n)
      throw new TypeError(e + c);
    for (var u = s(arguments, 1), f, m = function() {
      if (this instanceof f) {
        var v = c.apply(
          this,
          o(u, arguments)
        );
        return Object(v) === v ? v : this;
      }
      return c.apply(
        l,
        o(u, arguments)
      );
    }, h = r(0, c.length - u.length), g = [], p = 0; p < h; p++)
      g[p] = "$" + p;
    if (f = Function("binder", "return function (" + i(g, ",") + "){ return binder.apply(this,arguments); }")(m), c.prototype) {
      var d = function() {
      };
      d.prototype = c.prototype, f.prototype = new d(), d.prototype = null;
    }
    return f;
  }, To;
}
var Oo, da;
function An() {
  if (da) return Oo;
  da = 1;
  var e = Ud();
  return Oo = Function.prototype.bind || e, Oo;
}
var _o, pa;
function Ws() {
  return pa || (pa = 1, _o = Function.prototype.call), _o;
}
var No, ha;
function hl() {
  return ha || (ha = 1, No = Function.prototype.apply), No;
}
var ko, ma;
function Hd() {
  return ma || (ma = 1, ko = typeof Reflect < "u" && Reflect && Reflect.apply), ko;
}
var Io, ga;
function zd() {
  if (ga) return Io;
  ga = 1;
  var e = An(), t = hl(), r = Ws(), n = Hd();
  return Io = n || e.call(r, t), Io;
}
var Mo, ya;
function ml() {
  if (ya) return Mo;
  ya = 1;
  var e = An(), t = /* @__PURE__ */ nr(), r = Ws(), n = zd();
  return Mo = function(s) {
    if (s.length < 1 || typeof s[0] != "function")
      throw new t("a function is required");
    return n(e, r, s);
  }, Mo;
}
var jo, va;
function Wd() {
  if (va) return jo;
  va = 1;
  var e = ml(), t = /* @__PURE__ */ fl(), r;
  try {
    r = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (i) {
    if (!i || typeof i != "object" || !("code" in i) || i.code !== "ERR_PROTO_ACCESS")
      throw i;
  }
  var n = !!r && t && t(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), o = Object, s = o.getPrototypeOf;
  return jo = n && typeof n.get == "function" ? e([n.get]) : typeof s == "function" ? (
    /** @type {import('./get')} */
    function(a) {
      return s(a == null ? a : o(a));
    }
  ) : !1, jo;
}
var Do, ba;
function Vd() {
  if (ba) return Do;
  ba = 1;
  var e = dl(), t = pl(), r = /* @__PURE__ */ Wd();
  return Do = e ? function(o) {
    return e(o);
  } : t ? function(o) {
    if (!o || typeof o != "object" && typeof o != "function")
      throw new TypeError("getProto: not an object");
    return t(o);
  } : r ? function(o) {
    return r(o);
  } : null, Do;
}
var Fo, wa;
function Gd() {
  if (wa) return Fo;
  wa = 1;
  var e = Function.prototype.call, t = Object.prototype.hasOwnProperty, r = An();
  return Fo = r.call(e, t), Fo;
}
var Lo, xa;
function Vs() {
  if (xa) return Lo;
  xa = 1;
  var e, t = /* @__PURE__ */ ul(), r = /* @__PURE__ */ Pd(), n = /* @__PURE__ */ Ad(), o = /* @__PURE__ */ Cd(), s = /* @__PURE__ */ Rd(), i = /* @__PURE__ */ Td(), a = /* @__PURE__ */ nr(), l = /* @__PURE__ */ Od(), c = /* @__PURE__ */ _d(), u = /* @__PURE__ */ Nd(), f = /* @__PURE__ */ kd(), m = /* @__PURE__ */ Id(), h = /* @__PURE__ */ Md(), g = /* @__PURE__ */ jd(), p = /* @__PURE__ */ Fd(), d = Function, v = function(H) {
    try {
      return d('"use strict"; return (' + H + ").constructor;")();
    } catch {
    }
  }, y = /* @__PURE__ */ fl(), w = /* @__PURE__ */ $d(), S = function() {
    throw new a();
  }, P = y ? (function() {
    try {
      return arguments.callee, S;
    } catch {
      try {
        return y(arguments, "callee").get;
      } catch {
        return S;
      }
    }
  })() : S, T = qd()(), A = Vd(), E = pl(), I = dl(), j = hl(), L = Ws(), D = {}, X = typeof Uint8Array > "u" || !A ? e : A(Uint8Array), B = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? e : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? e : ArrayBuffer,
    "%ArrayIteratorPrototype%": T && A ? A([][Symbol.iterator]()) : e,
    "%AsyncFromSyncIteratorPrototype%": e,
    "%AsyncFunction%": D,
    "%AsyncGenerator%": D,
    "%AsyncGeneratorFunction%": D,
    "%AsyncIteratorPrototype%": D,
    "%Atomics%": typeof Atomics > "u" ? e : Atomics,
    "%BigInt%": typeof BigInt > "u" ? e : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? e : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? e : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? e : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": r,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": n,
    "%Float16Array%": typeof Float16Array > "u" ? e : Float16Array,
    "%Float32Array%": typeof Float32Array > "u" ? e : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? e : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? e : FinalizationRegistry,
    "%Function%": d,
    "%GeneratorFunction%": D,
    "%Int8Array%": typeof Int8Array > "u" ? e : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? e : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? e : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": T && A ? A(A([][Symbol.iterator]())) : e,
    "%JSON%": typeof JSON == "object" ? JSON : e,
    "%Map%": typeof Map > "u" ? e : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !T || !A ? e : A((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": t,
    "%Object.getOwnPropertyDescriptor%": y,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? e : Promise,
    "%Proxy%": typeof Proxy > "u" ? e : Proxy,
    "%RangeError%": o,
    "%ReferenceError%": s,
    "%Reflect%": typeof Reflect > "u" ? e : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? e : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !T || !A ? e : A((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? e : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": T && A ? A(""[Symbol.iterator]()) : e,
    "%Symbol%": T ? Symbol : e,
    "%SyntaxError%": i,
    "%ThrowTypeError%": P,
    "%TypedArray%": X,
    "%TypeError%": a,
    "%Uint8Array%": typeof Uint8Array > "u" ? e : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? e : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? e : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? e : Uint32Array,
    "%URIError%": l,
    "%WeakMap%": typeof WeakMap > "u" ? e : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? e : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? e : WeakSet,
    "%Function.prototype.call%": L,
    "%Function.prototype.apply%": j,
    "%Object.defineProperty%": w,
    "%Object.getPrototypeOf%": E,
    "%Math.abs%": c,
    "%Math.floor%": u,
    "%Math.max%": f,
    "%Math.min%": m,
    "%Math.pow%": h,
    "%Math.round%": g,
    "%Math.sign%": p,
    "%Reflect.getPrototypeOf%": I
  };
  if (A)
    try {
      null.error;
    } catch (H) {
      var Q = A(A(H));
      B["%Error.prototype%"] = Q;
    }
  var q = function H(M) {
    var F;
    if (M === "%AsyncFunction%")
      F = v("async function () {}");
    else if (M === "%GeneratorFunction%")
      F = v("function* () {}");
    else if (M === "%AsyncGeneratorFunction%")
      F = v("async function* () {}");
    else if (M === "%AsyncGenerator%") {
      var K = H("%AsyncGeneratorFunction%");
      K && (F = K.prototype);
    } else if (M === "%AsyncIteratorPrototype%") {
      var ee = H("%AsyncGenerator%");
      ee && A && (F = A(ee.prototype));
    }
    return B[M] = F, F;
  }, z = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, R = An(), J = /* @__PURE__ */ Gd(), N = R.call(L, Array.prototype.concat), U = R.call(j, Array.prototype.splice), Z = R.call(L, String.prototype.replace), Y = R.call(L, String.prototype.slice), W = R.call(L, RegExp.prototype.exec), re = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, ie = /\\(\\)?/g, k = function(M) {
    var F = Y(M, 0, 1), K = Y(M, -1);
    if (F === "%" && K !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    if (K === "%" && F !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var ee = [];
    return Z(M, re, function(le, ve, ge, we) {
      ee[ee.length] = ge ? Z(we, ie, "$1") : ve || le;
    }), ee;
  }, $ = function(M, F) {
    var K = M, ee;
    if (J(z, K) && (ee = z[K], K = "%" + ee[0] + "%"), J(B, K)) {
      var le = B[K];
      if (le === D && (le = q(K)), typeof le > "u" && !F)
        throw new a("intrinsic " + M + " exists, but is not available. Please file an issue!");
      return {
        alias: ee,
        name: K,
        value: le
      };
    }
    throw new i("intrinsic " + M + " does not exist!");
  };
  return Lo = function(M, F) {
    if (typeof M != "string" || M.length === 0)
      throw new a("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof F != "boolean")
      throw new a('"allowMissing" argument must be a boolean');
    if (W(/^%?[^%]*%?$/, M) === null)
      throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var K = k(M), ee = K.length > 0 ? K[0] : "", le = $("%" + ee + "%", F), ve = le.name, ge = le.value, we = !1, Re = le.alias;
    Re && (ee = Re[0], U(K, N([0, 1], Re)));
    for (var je = 1, pt = !0; je < K.length; je += 1) {
      var De = K[je], $t = Y(De, 0, 1), Bt = Y(De, -1);
      if (($t === '"' || $t === "'" || $t === "`" || Bt === '"' || Bt === "'" || Bt === "`") && $t !== Bt)
        throw new i("property names with quotes must have matching quotes");
      if ((De === "constructor" || !pt) && (we = !0), ee += "." + De, ve = "%" + ee + "%", J(B, ve))
        ge = B[ve];
      else if (ge != null) {
        if (!(De in ge)) {
          if (!F)
            throw new a("base intrinsic for " + M + " exists, but the property is not available.");
          return;
        }
        if (y && je + 1 >= K.length) {
          var qt = y(ge, De);
          pt = !!qt, pt && "get" in qt && !("originalValue" in qt.get) ? ge = qt.get : ge = ge[De];
        } else
          pt = J(ge, De), ge = ge[De];
        pt && !we && (B[ve] = ge);
      }
    }
    return ge;
  }, Lo;
}
var $o, Sa;
function gl() {
  if (Sa) return $o;
  Sa = 1;
  var e = /* @__PURE__ */ Vs(), t = ml(), r = t([e("%String.prototype.indexOf%")]);
  return $o = function(o, s) {
    var i = (
      /** @type {(this: unknown, ...args: unknown[]) => unknown} */
      e(o, !!s)
    );
    return typeof i == "function" && r(o, ".prototype.") > -1 ? t(
      /** @type {const} */
      [i]
    ) : i;
  }, $o;
}
var Bo, Ea;
function yl() {
  if (Ea) return Bo;
  Ea = 1;
  var e = /* @__PURE__ */ Vs(), t = /* @__PURE__ */ gl(), r = /* @__PURE__ */ Pn(), n = /* @__PURE__ */ nr(), o = e("%Map%", !0), s = t("Map.prototype.get", !0), i = t("Map.prototype.set", !0), a = t("Map.prototype.has", !0), l = t("Map.prototype.delete", !0), c = t("Map.prototype.size", !0);
  return Bo = !!o && /** @type {Exclude<import('.'), false>} */
  function() {
    var f, m = {
      assert: function(h) {
        if (!m.has(h))
          throw new n("Side channel does not contain " + r(h));
      },
      delete: function(h) {
        if (f) {
          var g = l(f, h);
          return c(f) === 0 && (f = void 0), g;
        }
        return !1;
      },
      get: function(h) {
        if (f)
          return s(f, h);
      },
      has: function(h) {
        return f ? a(f, h) : !1;
      },
      set: function(h, g) {
        f || (f = new o()), i(f, h, g);
      }
    };
    return m;
  }, Bo;
}
var qo, Pa;
function Kd() {
  if (Pa) return qo;
  Pa = 1;
  var e = /* @__PURE__ */ Vs(), t = /* @__PURE__ */ gl(), r = /* @__PURE__ */ Pn(), n = yl(), o = /* @__PURE__ */ nr(), s = e("%WeakMap%", !0), i = t("WeakMap.prototype.get", !0), a = t("WeakMap.prototype.set", !0), l = t("WeakMap.prototype.has", !0), c = t("WeakMap.prototype.delete", !0);
  return qo = s ? (
    /** @type {Exclude<import('.'), false>} */
    function() {
      var f, m, h = {
        assert: function(g) {
          if (!h.has(g))
            throw new o("Side channel does not contain " + r(g));
        },
        delete: function(g) {
          if (s && g && (typeof g == "object" || typeof g == "function")) {
            if (f)
              return c(f, g);
          } else if (n && m)
            return m.delete(g);
          return !1;
        },
        get: function(g) {
          return s && g && (typeof g == "object" || typeof g == "function") && f ? i(f, g) : m && m.get(g);
        },
        has: function(g) {
          return s && g && (typeof g == "object" || typeof g == "function") && f ? l(f, g) : !!m && m.has(g);
        },
        set: function(g, p) {
          s && g && (typeof g == "object" || typeof g == "function") ? (f || (f = new s()), a(f, g, p)) : n && (m || (m = n()), m.set(g, p));
        }
      };
      return h;
    }
  ) : n, qo;
}
var Uo, Aa;
function Jd() {
  if (Aa) return Uo;
  Aa = 1;
  var e = /* @__PURE__ */ nr(), t = /* @__PURE__ */ Pn(), r = Ed(), n = yl(), o = Kd(), s = o || n || r;
  return Uo = function() {
    var a, l = {
      assert: function(c) {
        if (!l.has(c))
          throw new e("Side channel does not contain " + t(c));
      },
      delete: function(c) {
        return !!a && a.delete(c);
      },
      get: function(c) {
        return a && a.get(c);
      },
      has: function(c) {
        return !!a && a.has(c);
      },
      set: function(c, u) {
        a || (a = s()), a.set(c, u);
      }
    };
    return l;
  }, Uo;
}
var Ho, Ca;
function Gs() {
  if (Ca) return Ho;
  Ca = 1;
  var e = String.prototype.replace, t = /%20/g, r = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
  return Ho = {
    default: r.RFC3986,
    formatters: {
      RFC1738: function(n) {
        return e.call(n, t, "+");
      },
      RFC3986: function(n) {
        return String(n);
      }
    },
    RFC1738: r.RFC1738,
    RFC3986: r.RFC3986
  }, Ho;
}
var zo, Ra;
function vl() {
  if (Ra) return zo;
  Ra = 1;
  var e = /* @__PURE__ */ Gs(), t = Object.prototype.hasOwnProperty, r = Array.isArray, n = (function() {
    for (var d = [], v = 0; v < 256; ++v)
      d.push("%" + ((v < 16 ? "0" : "") + v.toString(16)).toUpperCase());
    return d;
  })(), o = function(v) {
    for (; v.length > 1; ) {
      var y = v.pop(), w = y.obj[y.prop];
      if (r(w)) {
        for (var S = [], P = 0; P < w.length; ++P)
          typeof w[P] < "u" && S.push(w[P]);
        y.obj[y.prop] = S;
      }
    }
  }, s = function(v, y) {
    for (var w = y && y.plainObjects ? { __proto__: null } : {}, S = 0; S < v.length; ++S)
      typeof v[S] < "u" && (w[S] = v[S]);
    return w;
  }, i = function d(v, y, w) {
    if (!y)
      return v;
    if (typeof y != "object" && typeof y != "function") {
      if (r(v))
        v.push(y);
      else if (v && typeof v == "object")
        (w && (w.plainObjects || w.allowPrototypes) || !t.call(Object.prototype, y)) && (v[y] = !0);
      else
        return [v, y];
      return v;
    }
    if (!v || typeof v != "object")
      return [v].concat(y);
    var S = v;
    return r(v) && !r(y) && (S = s(v, w)), r(v) && r(y) ? (y.forEach(function(P, T) {
      if (t.call(v, T)) {
        var A = v[T];
        A && typeof A == "object" && P && typeof P == "object" ? v[T] = d(A, P, w) : v.push(P);
      } else
        v[T] = P;
    }), v) : Object.keys(y).reduce(function(P, T) {
      var A = y[T];
      return t.call(P, T) ? P[T] = d(P[T], A, w) : P[T] = A, P;
    }, S);
  }, a = function(v, y) {
    return Object.keys(y).reduce(function(w, S) {
      return w[S] = y[S], w;
    }, v);
  }, l = function(d, v, y) {
    var w = d.replace(/\+/g, " ");
    if (y === "iso-8859-1")
      return w.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(w);
    } catch {
      return w;
    }
  }, c = 1024, u = function(v, y, w, S, P) {
    if (v.length === 0)
      return v;
    var T = v;
    if (typeof v == "symbol" ? T = Symbol.prototype.toString.call(v) : typeof v != "string" && (T = String(v)), w === "iso-8859-1")
      return escape(T).replace(/%u[0-9a-f]{4}/gi, function(X) {
        return "%26%23" + parseInt(X.slice(2), 16) + "%3B";
      });
    for (var A = "", E = 0; E < T.length; E += c) {
      for (var I = T.length >= c ? T.slice(E, E + c) : T, j = [], L = 0; L < I.length; ++L) {
        var D = I.charCodeAt(L);
        if (D === 45 || D === 46 || D === 95 || D === 126 || D >= 48 && D <= 57 || D >= 65 && D <= 90 || D >= 97 && D <= 122 || P === e.RFC1738 && (D === 40 || D === 41)) {
          j[j.length] = I.charAt(L);
          continue;
        }
        if (D < 128) {
          j[j.length] = n[D];
          continue;
        }
        if (D < 2048) {
          j[j.length] = n[192 | D >> 6] + n[128 | D & 63];
          continue;
        }
        if (D < 55296 || D >= 57344) {
          j[j.length] = n[224 | D >> 12] + n[128 | D >> 6 & 63] + n[128 | D & 63];
          continue;
        }
        L += 1, D = 65536 + ((D & 1023) << 10 | I.charCodeAt(L) & 1023), j[j.length] = n[240 | D >> 18] + n[128 | D >> 12 & 63] + n[128 | D >> 6 & 63] + n[128 | D & 63];
      }
      A += j.join("");
    }
    return A;
  }, f = function(v) {
    for (var y = [{ obj: { o: v }, prop: "o" }], w = [], S = 0; S < y.length; ++S)
      for (var P = y[S], T = P.obj[P.prop], A = Object.keys(T), E = 0; E < A.length; ++E) {
        var I = A[E], j = T[I];
        typeof j == "object" && j !== null && w.indexOf(j) === -1 && (y.push({ obj: T, prop: I }), w.push(j));
      }
    return o(y), v;
  }, m = function(v) {
    return Object.prototype.toString.call(v) === "[object RegExp]";
  }, h = function(v) {
    return !v || typeof v != "object" ? !1 : !!(v.constructor && v.constructor.isBuffer && v.constructor.isBuffer(v));
  }, g = function(v, y) {
    return [].concat(v, y);
  }, p = function(v, y) {
    if (r(v)) {
      for (var w = [], S = 0; S < v.length; S += 1)
        w.push(y(v[S]));
      return w;
    }
    return y(v);
  };
  return zo = {
    arrayToObject: s,
    assign: a,
    combine: g,
    compact: f,
    decode: l,
    encode: u,
    isBuffer: h,
    isRegExp: m,
    maybeMap: p,
    merge: i
  }, zo;
}
var Wo, Ta;
function Xd() {
  if (Ta) return Wo;
  Ta = 1;
  var e = Jd(), t = /* @__PURE__ */ vl(), r = /* @__PURE__ */ Gs(), n = Object.prototype.hasOwnProperty, o = {
    brackets: function(d) {
      return d + "[]";
    },
    comma: "comma",
    indices: function(d, v) {
      return d + "[" + v + "]";
    },
    repeat: function(d) {
      return d;
    }
  }, s = Array.isArray, i = Array.prototype.push, a = function(p, d) {
    i.apply(p, s(d) ? d : [d]);
  }, l = Date.prototype.toISOString, c = r.default, u = {
    addQueryPrefix: !1,
    allowDots: !1,
    allowEmptyArrays: !1,
    arrayFormat: "indices",
    charset: "utf-8",
    charsetSentinel: !1,
    commaRoundTrip: !1,
    delimiter: "&",
    encode: !0,
    encodeDotInKeys: !1,
    encoder: t.encode,
    encodeValuesOnly: !1,
    filter: void 0,
    format: c,
    formatter: r.formatters[c],
    // deprecated
    indices: !1,
    serializeDate: function(d) {
      return l.call(d);
    },
    skipNulls: !1,
    strictNullHandling: !1
  }, f = function(d) {
    return typeof d == "string" || typeof d == "number" || typeof d == "boolean" || typeof d == "symbol" || typeof d == "bigint";
  }, m = {}, h = function p(d, v, y, w, S, P, T, A, E, I, j, L, D, X, B, Q, q, z) {
    for (var R = d, J = z, N = 0, U = !1; (J = J.get(m)) !== void 0 && !U; ) {
      var Z = J.get(d);
      if (N += 1, typeof Z < "u") {
        if (Z === N)
          throw new RangeError("Cyclic object value");
        U = !0;
      }
      typeof J.get(m) > "u" && (N = 0);
    }
    if (typeof I == "function" ? R = I(v, R) : R instanceof Date ? R = D(R) : y === "comma" && s(R) && (R = t.maybeMap(R, function(ve) {
      return ve instanceof Date ? D(ve) : ve;
    })), R === null) {
      if (P)
        return E && !Q ? E(v, u.encoder, q, "key", X) : v;
      R = "";
    }
    if (f(R) || t.isBuffer(R)) {
      if (E) {
        var Y = Q ? v : E(v, u.encoder, q, "key", X);
        return [B(Y) + "=" + B(E(R, u.encoder, q, "value", X))];
      }
      return [B(v) + "=" + B(String(R))];
    }
    var W = [];
    if (typeof R > "u")
      return W;
    var re;
    if (y === "comma" && s(R))
      Q && E && (R = t.maybeMap(R, E)), re = [{ value: R.length > 0 ? R.join(",") || null : void 0 }];
    else if (s(I))
      re = I;
    else {
      var ie = Object.keys(R);
      re = j ? ie.sort(j) : ie;
    }
    var k = A ? String(v).replace(/\./g, "%2E") : String(v), $ = w && s(R) && R.length === 1 ? k + "[]" : k;
    if (S && s(R) && R.length === 0)
      return $ + "[]";
    for (var H = 0; H < re.length; ++H) {
      var M = re[H], F = typeof M == "object" && M && typeof M.value < "u" ? M.value : R[M];
      if (!(T && F === null)) {
        var K = L && A ? String(M).replace(/\./g, "%2E") : String(M), ee = s(R) ? typeof y == "function" ? y($, K) : $ : $ + (L ? "." + K : "[" + K + "]");
        z.set(d, N);
        var le = e();
        le.set(m, z), a(W, p(
          F,
          ee,
          y,
          w,
          S,
          P,
          T,
          A,
          y === "comma" && Q && s(R) ? null : E,
          I,
          j,
          L,
          D,
          X,
          B,
          Q,
          q,
          le
        ));
      }
    }
    return W;
  }, g = function(d) {
    if (!d)
      return u;
    if (typeof d.allowEmptyArrays < "u" && typeof d.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof d.encodeDotInKeys < "u" && typeof d.encodeDotInKeys != "boolean")
      throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
    if (d.encoder !== null && typeof d.encoder < "u" && typeof d.encoder != "function")
      throw new TypeError("Encoder has to be a function.");
    var v = d.charset || u.charset;
    if (typeof d.charset < "u" && d.charset !== "utf-8" && d.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var y = r.default;
    if (typeof d.format < "u") {
      if (!n.call(r.formatters, d.format))
        throw new TypeError("Unknown format option provided.");
      y = d.format;
    }
    var w = r.formatters[y], S = u.filter;
    (typeof d.filter == "function" || s(d.filter)) && (S = d.filter);
    var P;
    if (d.arrayFormat in o ? P = d.arrayFormat : "indices" in d ? P = d.indices ? "indices" : "repeat" : P = u.arrayFormat, "commaRoundTrip" in d && typeof d.commaRoundTrip != "boolean")
      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var T = typeof d.allowDots > "u" ? d.encodeDotInKeys === !0 ? !0 : u.allowDots : !!d.allowDots;
    return {
      addQueryPrefix: typeof d.addQueryPrefix == "boolean" ? d.addQueryPrefix : u.addQueryPrefix,
      allowDots: T,
      allowEmptyArrays: typeof d.allowEmptyArrays == "boolean" ? !!d.allowEmptyArrays : u.allowEmptyArrays,
      arrayFormat: P,
      charset: v,
      charsetSentinel: typeof d.charsetSentinel == "boolean" ? d.charsetSentinel : u.charsetSentinel,
      commaRoundTrip: !!d.commaRoundTrip,
      delimiter: typeof d.delimiter > "u" ? u.delimiter : d.delimiter,
      encode: typeof d.encode == "boolean" ? d.encode : u.encode,
      encodeDotInKeys: typeof d.encodeDotInKeys == "boolean" ? d.encodeDotInKeys : u.encodeDotInKeys,
      encoder: typeof d.encoder == "function" ? d.encoder : u.encoder,
      encodeValuesOnly: typeof d.encodeValuesOnly == "boolean" ? d.encodeValuesOnly : u.encodeValuesOnly,
      filter: S,
      format: y,
      formatter: w,
      serializeDate: typeof d.serializeDate == "function" ? d.serializeDate : u.serializeDate,
      skipNulls: typeof d.skipNulls == "boolean" ? d.skipNulls : u.skipNulls,
      sort: typeof d.sort == "function" ? d.sort : null,
      strictNullHandling: typeof d.strictNullHandling == "boolean" ? d.strictNullHandling : u.strictNullHandling
    };
  };
  return Wo = function(p, d) {
    var v = p, y = g(d), w, S;
    typeof y.filter == "function" ? (S = y.filter, v = S("", v)) : s(y.filter) && (S = y.filter, w = S);
    var P = [];
    if (typeof v != "object" || v === null)
      return "";
    var T = o[y.arrayFormat], A = T === "comma" && y.commaRoundTrip;
    w || (w = Object.keys(v)), y.sort && w.sort(y.sort);
    for (var E = e(), I = 0; I < w.length; ++I) {
      var j = w[I], L = v[j];
      y.skipNulls && L === null || a(P, h(
        L,
        j,
        T,
        A,
        y.allowEmptyArrays,
        y.strictNullHandling,
        y.skipNulls,
        y.encodeDotInKeys,
        y.encode ? y.encoder : null,
        y.filter,
        y.sort,
        y.allowDots,
        y.serializeDate,
        y.format,
        y.formatter,
        y.encodeValuesOnly,
        y.charset,
        E
      ));
    }
    var D = P.join(y.delimiter), X = y.addQueryPrefix === !0 ? "?" : "";
    return y.charsetSentinel && (y.charset === "iso-8859-1" ? X += "utf8=%26%2310003%3B&" : X += "utf8=%E2%9C%93&"), D.length > 0 ? X + D : "";
  }, Wo;
}
var Vo, Oa;
function Yd() {
  if (Oa) return Vo;
  Oa = 1;
  var e = /* @__PURE__ */ vl(), t = Object.prototype.hasOwnProperty, r = Array.isArray, n = {
    allowDots: !1,
    allowEmptyArrays: !1,
    allowPrototypes: !1,
    allowSparse: !1,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: !1,
    comma: !1,
    decodeDotInKeys: !1,
    decoder: e.decode,
    delimiter: "&",
    depth: 5,
    duplicates: "combine",
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictDepth: !1,
    strictNullHandling: !1,
    throwOnLimitExceeded: !1
  }, o = function(m) {
    return m.replace(/&#(\d+);/g, function(h, g) {
      return String.fromCharCode(parseInt(g, 10));
    });
  }, s = function(m, h, g) {
    if (m && typeof m == "string" && h.comma && m.indexOf(",") > -1)
      return m.split(",");
    if (h.throwOnLimitExceeded && g >= h.arrayLimit)
      throw new RangeError("Array limit exceeded. Only " + h.arrayLimit + " element" + (h.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
    return m;
  }, i = "utf8=%26%2310003%3B", a = "utf8=%E2%9C%93", l = function(h, g) {
    var p = { __proto__: null }, d = g.ignoreQueryPrefix ? h.replace(/^\?/, "") : h;
    d = d.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    var v = g.parameterLimit === 1 / 0 ? void 0 : g.parameterLimit, y = d.split(
      g.delimiter,
      g.throwOnLimitExceeded ? v + 1 : v
    );
    if (g.throwOnLimitExceeded && y.length > v)
      throw new RangeError("Parameter limit exceeded. Only " + v + " parameter" + (v === 1 ? "" : "s") + " allowed.");
    var w = -1, S, P = g.charset;
    if (g.charsetSentinel)
      for (S = 0; S < y.length; ++S)
        y[S].indexOf("utf8=") === 0 && (y[S] === a ? P = "utf-8" : y[S] === i && (P = "iso-8859-1"), w = S, S = y.length);
    for (S = 0; S < y.length; ++S)
      if (S !== w) {
        var T = y[S], A = T.indexOf("]="), E = A === -1 ? T.indexOf("=") : A + 1, I, j;
        E === -1 ? (I = g.decoder(T, n.decoder, P, "key"), j = g.strictNullHandling ? null : "") : (I = g.decoder(T.slice(0, E), n.decoder, P, "key"), j = e.maybeMap(
          s(
            T.slice(E + 1),
            g,
            r(p[I]) ? p[I].length : 0
          ),
          function(D) {
            return g.decoder(D, n.decoder, P, "value");
          }
        )), j && g.interpretNumericEntities && P === "iso-8859-1" && (j = o(String(j))), T.indexOf("[]=") > -1 && (j = r(j) ? [j] : j);
        var L = t.call(p, I);
        L && g.duplicates === "combine" ? p[I] = e.combine(p[I], j) : (!L || g.duplicates === "last") && (p[I] = j);
      }
    return p;
  }, c = function(m, h, g, p) {
    var d = 0;
    if (m.length > 0 && m[m.length - 1] === "[]") {
      var v = m.slice(0, -1).join("");
      d = Array.isArray(h) && h[v] ? h[v].length : 0;
    }
    for (var y = p ? h : s(h, g, d), w = m.length - 1; w >= 0; --w) {
      var S, P = m[w];
      if (P === "[]" && g.parseArrays)
        S = g.allowEmptyArrays && (y === "" || g.strictNullHandling && y === null) ? [] : e.combine([], y);
      else {
        S = g.plainObjects ? { __proto__: null } : {};
        var T = P.charAt(0) === "[" && P.charAt(P.length - 1) === "]" ? P.slice(1, -1) : P, A = g.decodeDotInKeys ? T.replace(/%2E/g, ".") : T, E = parseInt(A, 10);
        !g.parseArrays && A === "" ? S = { 0: y } : !isNaN(E) && P !== A && String(E) === A && E >= 0 && g.parseArrays && E <= g.arrayLimit ? (S = [], S[E] = y) : A !== "__proto__" && (S[A] = y);
      }
      y = S;
    }
    return y;
  }, u = function(h, g, p, d) {
    if (h) {
      var v = p.allowDots ? h.replace(/\.([^.[]+)/g, "[$1]") : h, y = /(\[[^[\]]*])/, w = /(\[[^[\]]*])/g, S = p.depth > 0 && y.exec(v), P = S ? v.slice(0, S.index) : v, T = [];
      if (P) {
        if (!p.plainObjects && t.call(Object.prototype, P) && !p.allowPrototypes)
          return;
        T.push(P);
      }
      for (var A = 0; p.depth > 0 && (S = w.exec(v)) !== null && A < p.depth; ) {
        if (A += 1, !p.plainObjects && t.call(Object.prototype, S[1].slice(1, -1)) && !p.allowPrototypes)
          return;
        T.push(S[1]);
      }
      if (S) {
        if (p.strictDepth === !0)
          throw new RangeError("Input depth exceeded depth option of " + p.depth + " and strictDepth is true");
        T.push("[" + v.slice(S.index) + "]");
      }
      return c(T, g, p, d);
    }
  }, f = function(h) {
    if (!h)
      return n;
    if (typeof h.allowEmptyArrays < "u" && typeof h.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof h.decodeDotInKeys < "u" && typeof h.decodeDotInKeys != "boolean")
      throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
    if (h.decoder !== null && typeof h.decoder < "u" && typeof h.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (typeof h.charset < "u" && h.charset !== "utf-8" && h.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    if (typeof h.throwOnLimitExceeded < "u" && typeof h.throwOnLimitExceeded != "boolean")
      throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
    var g = typeof h.charset > "u" ? n.charset : h.charset, p = typeof h.duplicates > "u" ? n.duplicates : h.duplicates;
    if (p !== "combine" && p !== "first" && p !== "last")
      throw new TypeError("The duplicates option must be either combine, first, or last");
    var d = typeof h.allowDots > "u" ? h.decodeDotInKeys === !0 ? !0 : n.allowDots : !!h.allowDots;
    return {
      allowDots: d,
      allowEmptyArrays: typeof h.allowEmptyArrays == "boolean" ? !!h.allowEmptyArrays : n.allowEmptyArrays,
      allowPrototypes: typeof h.allowPrototypes == "boolean" ? h.allowPrototypes : n.allowPrototypes,
      allowSparse: typeof h.allowSparse == "boolean" ? h.allowSparse : n.allowSparse,
      arrayLimit: typeof h.arrayLimit == "number" ? h.arrayLimit : n.arrayLimit,
      charset: g,
      charsetSentinel: typeof h.charsetSentinel == "boolean" ? h.charsetSentinel : n.charsetSentinel,
      comma: typeof h.comma == "boolean" ? h.comma : n.comma,
      decodeDotInKeys: typeof h.decodeDotInKeys == "boolean" ? h.decodeDotInKeys : n.decodeDotInKeys,
      decoder: typeof h.decoder == "function" ? h.decoder : n.decoder,
      delimiter: typeof h.delimiter == "string" || e.isRegExp(h.delimiter) ? h.delimiter : n.delimiter,
      // eslint-disable-next-line no-implicit-coercion, no-extra-parens
      depth: typeof h.depth == "number" || h.depth === !1 ? +h.depth : n.depth,
      duplicates: p,
      ignoreQueryPrefix: h.ignoreQueryPrefix === !0,
      interpretNumericEntities: typeof h.interpretNumericEntities == "boolean" ? h.interpretNumericEntities : n.interpretNumericEntities,
      parameterLimit: typeof h.parameterLimit == "number" ? h.parameterLimit : n.parameterLimit,
      parseArrays: h.parseArrays !== !1,
      plainObjects: typeof h.plainObjects == "boolean" ? h.plainObjects : n.plainObjects,
      strictDepth: typeof h.strictDepth == "boolean" ? !!h.strictDepth : n.strictDepth,
      strictNullHandling: typeof h.strictNullHandling == "boolean" ? h.strictNullHandling : n.strictNullHandling,
      throwOnLimitExceeded: typeof h.throwOnLimitExceeded == "boolean" ? h.throwOnLimitExceeded : !1
    };
  };
  return Vo = function(m, h) {
    var g = f(h);
    if (m === "" || m === null || typeof m > "u")
      return g.plainObjects ? { __proto__: null } : {};
    for (var p = typeof m == "string" ? l(m, g) : m, d = g.plainObjects ? { __proto__: null } : {}, v = Object.keys(p), y = 0; y < v.length; ++y) {
      var w = v[y], S = u(w, p[w], g, typeof m == "string");
      d = e.merge(d, S, g);
    }
    return g.allowSparse === !0 ? d : e.compact(d);
  }, Vo;
}
var Go, _a;
function Qd() {
  if (_a) return Go;
  _a = 1;
  var e = /* @__PURE__ */ Xd(), t = /* @__PURE__ */ Yd(), r = /* @__PURE__ */ Gs();
  return Go = {
    formats: r,
    parse: t,
    stringify: e
  }, Go;
}
var Na = /* @__PURE__ */ Qd(), bl = typeof global == "object" && global && global.Object === Object && global, Zd = typeof self == "object" && self && self.Object === Object && self, et = bl || Zd || Function("return this")(), Qe = et.Symbol, wl = Object.prototype, ep = wl.hasOwnProperty, tp = wl.toString, gr = Qe ? Qe.toStringTag : void 0;
function rp(e) {
  var t = ep.call(e, gr), r = e[gr];
  try {
    e[gr] = void 0;
    var n = !0;
  } catch {
  }
  var o = tp.call(e);
  return n && (t ? e[gr] = r : delete e[gr]), o;
}
var np = Object.prototype, op = np.toString;
function sp(e) {
  return op.call(e);
}
var ip = "[object Null]", ap = "[object Undefined]", ka = Qe ? Qe.toStringTag : void 0;
function or(e) {
  return e == null ? e === void 0 ? ap : ip : ka && ka in Object(e) ? rp(e) : sp(e);
}
function bt(e) {
  return e != null && typeof e == "object";
}
var cp = "[object Symbol]";
function Ks(e) {
  return typeof e == "symbol" || bt(e) && or(e) == cp;
}
function lp(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var at = Array.isArray, Ia = Qe ? Qe.prototype : void 0, Ma = Ia ? Ia.toString : void 0;
function xl(e) {
  if (typeof e == "string")
    return e;
  if (at(e))
    return lp(e, xl) + "";
  if (Ks(e))
    return Ma ? Ma.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function Yt(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var up = "[object AsyncFunction]", fp = "[object Function]", dp = "[object GeneratorFunction]", pp = "[object Proxy]";
function Sl(e) {
  if (!Yt(e))
    return !1;
  var t = or(e);
  return t == fp || t == dp || t == up || t == pp;
}
var Ko = et["__core-js_shared__"], ja = (function() {
  var e = /[^.]+$/.exec(Ko && Ko.keys && Ko.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
})();
function hp(e) {
  return !!ja && ja in e;
}
var mp = Function.prototype, gp = mp.toString;
function Ft(e) {
  if (e != null) {
    try {
      return gp.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var yp = /[\\^$.*+?()[\]{}|]/g, vp = /^\[object .+?Constructor\]$/, bp = Function.prototype, wp = Object.prototype, xp = bp.toString, Sp = wp.hasOwnProperty, Ep = RegExp(
  "^" + xp.call(Sp).replace(yp, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Pp(e) {
  if (!Yt(e) || hp(e))
    return !1;
  var t = Sl(e) ? Ep : vp;
  return t.test(Ft(e));
}
function Ap(e, t) {
  return e == null ? void 0 : e[t];
}
function Lt(e, t) {
  var r = Ap(e, t);
  return Pp(r) ? r : void 0;
}
var ps = Lt(et, "WeakMap"), Da = Object.create, Cp = /* @__PURE__ */ (function() {
  function e() {
  }
  return function(t) {
    if (!Yt(t))
      return {};
    if (Da)
      return Da(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
})(), Fa = (function() {
  try {
    var e = Lt(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
})();
function Rp(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Tp = 9007199254740991, Op = /^(?:0|[1-9]\d*)$/;
function Js(e, t) {
  var r = typeof e;
  return t = t ?? Tp, !!t && (r == "number" || r != "symbol" && Op.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function _p(e, t, r) {
  t == "__proto__" && Fa ? Fa(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
function Xs(e, t) {
  return e === t || e !== e && t !== t;
}
var Np = Object.prototype, kp = Np.hasOwnProperty;
function El(e, t, r) {
  var n = e[t];
  (!(kp.call(e, t) && Xs(n, r)) || r === void 0 && !(t in e)) && _p(e, t, r);
}
var Ip = 9007199254740991;
function Ys(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ip;
}
function Mp(e) {
  return e != null && Ys(e.length) && !Sl(e);
}
var jp = Object.prototype;
function Pl(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || jp;
  return e === r;
}
function Dp(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var Fp = "[object Arguments]";
function La(e) {
  return bt(e) && or(e) == Fp;
}
var Al = Object.prototype, Lp = Al.hasOwnProperty, $p = Al.propertyIsEnumerable, Cl = La(/* @__PURE__ */ (function() {
  return arguments;
})()) ? La : function(e) {
  return bt(e) && Lp.call(e, "callee") && !$p.call(e, "callee");
};
function Bp() {
  return !1;
}
var Rl = typeof exports == "object" && exports && !exports.nodeType && exports, $a = Rl && typeof module == "object" && module && !module.nodeType && module, qp = $a && $a.exports === Rl, Ba = qp ? et.Buffer : void 0, Up = Ba ? Ba.isBuffer : void 0, un = Up || Bp, Hp = "[object Arguments]", zp = "[object Array]", Wp = "[object Boolean]", Vp = "[object Date]", Gp = "[object Error]", Kp = "[object Function]", Jp = "[object Map]", Xp = "[object Number]", Yp = "[object Object]", Qp = "[object RegExp]", Zp = "[object Set]", eh = "[object String]", th = "[object WeakMap]", rh = "[object ArrayBuffer]", nh = "[object DataView]", oh = "[object Float32Array]", sh = "[object Float64Array]", ih = "[object Int8Array]", ah = "[object Int16Array]", ch = "[object Int32Array]", lh = "[object Uint8Array]", uh = "[object Uint8ClampedArray]", fh = "[object Uint16Array]", dh = "[object Uint32Array]", pe = {};
pe[oh] = pe[sh] = pe[ih] = pe[ah] = pe[ch] = pe[lh] = pe[uh] = pe[fh] = pe[dh] = !0;
pe[Hp] = pe[zp] = pe[rh] = pe[Wp] = pe[nh] = pe[Vp] = pe[Gp] = pe[Kp] = pe[Jp] = pe[Xp] = pe[Yp] = pe[Qp] = pe[Zp] = pe[eh] = pe[th] = !1;
function ph(e) {
  return bt(e) && Ys(e.length) && !!pe[or(e)];
}
function Qs(e) {
  return function(t) {
    return e(t);
  };
}
var Tl = typeof exports == "object" && exports && !exports.nodeType && exports, Er = Tl && typeof module == "object" && module && !module.nodeType && module, hh = Er && Er.exports === Tl, Jo = hh && bl.process, Qt = (function() {
  try {
    var e = Er && Er.require && Er.require("util").types;
    return e || Jo && Jo.binding && Jo.binding("util");
  } catch {
  }
})(), qa = Qt && Qt.isTypedArray, Ol = qa ? Qs(qa) : ph, mh = Object.prototype, gh = mh.hasOwnProperty;
function yh(e, t) {
  var r = at(e), n = !r && Cl(e), o = !r && !n && un(e), s = !r && !n && !o && Ol(e), i = r || n || o || s, a = i ? Dp(e.length, String) : [], l = a.length;
  for (var c in e)
    gh.call(e, c) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    Js(c, l))) && a.push(c);
  return a;
}
function _l(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var vh = _l(Object.keys, Object), bh = Object.prototype, wh = bh.hasOwnProperty;
function xh(e) {
  if (!Pl(e))
    return vh(e);
  var t = [];
  for (var r in Object(e))
    wh.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function Sh(e) {
  return Mp(e) ? yh(e) : xh(e);
}
var Eh = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ph = /^\w*$/;
function Ah(e, t) {
  if (at(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Ks(e) ? !0 : Ph.test(e) || !Eh.test(e) || t != null && e in Object(t);
}
var Tr = Lt(Object, "create");
function Ch() {
  this.__data__ = Tr ? Tr(null) : {}, this.size = 0;
}
function Rh(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Th = "__lodash_hash_undefined__", Oh = Object.prototype, _h = Oh.hasOwnProperty;
function Nh(e) {
  var t = this.__data__;
  if (Tr) {
    var r = t[e];
    return r === Th ? void 0 : r;
  }
  return _h.call(t, e) ? t[e] : void 0;
}
var kh = Object.prototype, Ih = kh.hasOwnProperty;
function Mh(e) {
  var t = this.__data__;
  return Tr ? t[e] !== void 0 : Ih.call(t, e);
}
var jh = "__lodash_hash_undefined__";
function Dh(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = Tr && t === void 0 ? jh : t, this;
}
function Nt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Nt.prototype.clear = Ch;
Nt.prototype.delete = Rh;
Nt.prototype.get = Nh;
Nt.prototype.has = Mh;
Nt.prototype.set = Dh;
function Fh() {
  this.__data__ = [], this.size = 0;
}
function Cn(e, t) {
  for (var r = e.length; r--; )
    if (Xs(e[r][0], t))
      return r;
  return -1;
}
var Lh = Array.prototype, $h = Lh.splice;
function Bh(e) {
  var t = this.__data__, r = Cn(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : $h.call(t, r, 1), --this.size, !0;
}
function qh(e) {
  var t = this.__data__, r = Cn(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function Uh(e) {
  return Cn(this.__data__, e) > -1;
}
function Hh(e, t) {
  var r = this.__data__, n = Cn(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function ut(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
ut.prototype.clear = Fh;
ut.prototype.delete = Bh;
ut.prototype.get = qh;
ut.prototype.has = Uh;
ut.prototype.set = Hh;
var Or = Lt(et, "Map");
function zh() {
  this.size = 0, this.__data__ = {
    hash: new Nt(),
    map: new (Or || ut)(),
    string: new Nt()
  };
}
function Wh(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Rn(e, t) {
  var r = e.__data__;
  return Wh(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function Vh(e) {
  var t = Rn(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Gh(e) {
  return Rn(this, e).get(e);
}
function Kh(e) {
  return Rn(this, e).has(e);
}
function Jh(e, t) {
  var r = Rn(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function ft(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
ft.prototype.clear = zh;
ft.prototype.delete = Vh;
ft.prototype.get = Gh;
ft.prototype.has = Kh;
ft.prototype.set = Jh;
var Xh = "Expected a function";
function Zs(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Xh);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], s = r.cache;
    if (s.has(o))
      return s.get(o);
    var i = e.apply(this, n);
    return r.cache = s.set(o, i) || s, i;
  };
  return r.cache = new (Zs.Cache || ft)(), r;
}
Zs.Cache = ft;
var Yh = 500;
function Qh(e) {
  var t = Zs(e, function(n) {
    return r.size === Yh && r.clear(), n;
  }), r = t.cache;
  return t;
}
var Zh = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, em = /\\(\\)?/g, tm = Qh(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Zh, function(r, n, o, s) {
    t.push(o ? s.replace(em, "$1") : n || r);
  }), t;
});
function rm(e) {
  return e == null ? "" : xl(e);
}
function ei(e, t) {
  return at(e) ? e : Ah(e, t) ? [e] : tm(rm(e));
}
function ti(e) {
  if (typeof e == "string" || Ks(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function nm(e, t) {
  t = ei(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[ti(t[r++])];
  return r && r == n ? e : void 0;
}
function Nl(e, t, r) {
  var n = e == null ? void 0 : nm(e, t);
  return n === void 0 ? r : n;
}
function om(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var sm = _l(Object.getPrototypeOf, Object);
function im() {
  this.__data__ = new ut(), this.size = 0;
}
function am(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function cm(e) {
  return this.__data__.get(e);
}
function lm(e) {
  return this.__data__.has(e);
}
var um = 200;
function fm(e, t) {
  var r = this.__data__;
  if (r instanceof ut) {
    var n = r.__data__;
    if (!Or || n.length < um - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new ft(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function it(e) {
  var t = this.__data__ = new ut(e);
  this.size = t.size;
}
it.prototype.clear = im;
it.prototype.delete = am;
it.prototype.get = cm;
it.prototype.has = lm;
it.prototype.set = fm;
var kl = typeof exports == "object" && exports && !exports.nodeType && exports, Ua = kl && typeof module == "object" && module && !module.nodeType && module, dm = Ua && Ua.exports === kl, Ha = dm ? et.Buffer : void 0;
Ha && Ha.allocUnsafe;
function pm(e, t) {
  return e.slice();
}
function hm(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, s = []; ++r < n; ) {
    var i = e[r];
    t(i, r, e) && (s[o++] = i);
  }
  return s;
}
function mm() {
  return [];
}
var gm = Object.prototype, ym = gm.propertyIsEnumerable, za = Object.getOwnPropertySymbols, vm = za ? function(e) {
  return e == null ? [] : (e = Object(e), hm(za(e), function(t) {
    return ym.call(e, t);
  }));
} : mm;
function bm(e, t, r) {
  var n = t(e);
  return at(e) ? n : om(n, r(e));
}
function hs(e) {
  return bm(e, Sh, vm);
}
var ms = Lt(et, "DataView"), gs = Lt(et, "Promise"), ys = Lt(et, "Set"), Wa = "[object Map]", wm = "[object Object]", Va = "[object Promise]", Ga = "[object Set]", Ka = "[object WeakMap]", Ja = "[object DataView]", xm = Ft(ms), Sm = Ft(Or), Em = Ft(gs), Pm = Ft(ys), Am = Ft(ps), Be = or;
(ms && Be(new ms(new ArrayBuffer(1))) != Ja || Or && Be(new Or()) != Wa || gs && Be(gs.resolve()) != Va || ys && Be(new ys()) != Ga || ps && Be(new ps()) != Ka) && (Be = function(e) {
  var t = or(e), r = t == wm ? e.constructor : void 0, n = r ? Ft(r) : "";
  if (n)
    switch (n) {
      case xm:
        return Ja;
      case Sm:
        return Wa;
      case Em:
        return Va;
      case Pm:
        return Ga;
      case Am:
        return Ka;
    }
  return t;
});
var Cm = Object.prototype, Rm = Cm.hasOwnProperty;
function Tm(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && Rm.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var fn = et.Uint8Array;
function ri(e) {
  var t = new e.constructor(e.byteLength);
  return new fn(t).set(new fn(e)), t;
}
function Om(e, t) {
  var r = ri(e.buffer);
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var _m = /\w*$/;
function Nm(e) {
  var t = new e.constructor(e.source, _m.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Xa = Qe ? Qe.prototype : void 0, Ya = Xa ? Xa.valueOf : void 0;
function km(e) {
  return Ya ? Object(Ya.call(e)) : {};
}
function Im(e, t) {
  var r = ri(e.buffer);
  return new e.constructor(r, e.byteOffset, e.length);
}
var Mm = "[object Boolean]", jm = "[object Date]", Dm = "[object Map]", Fm = "[object Number]", Lm = "[object RegExp]", $m = "[object Set]", Bm = "[object String]", qm = "[object Symbol]", Um = "[object ArrayBuffer]", Hm = "[object DataView]", zm = "[object Float32Array]", Wm = "[object Float64Array]", Vm = "[object Int8Array]", Gm = "[object Int16Array]", Km = "[object Int32Array]", Jm = "[object Uint8Array]", Xm = "[object Uint8ClampedArray]", Ym = "[object Uint16Array]", Qm = "[object Uint32Array]";
function Zm(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case Um:
      return ri(e);
    case Mm:
    case jm:
      return new n(+e);
    case Hm:
      return Om(e);
    case zm:
    case Wm:
    case Vm:
    case Gm:
    case Km:
    case Jm:
    case Xm:
    case Ym:
    case Qm:
      return Im(e);
    case Dm:
      return new n();
    case Fm:
    case Bm:
      return new n(e);
    case Lm:
      return Nm(e);
    case $m:
      return new n();
    case qm:
      return km(e);
  }
}
function eg(e) {
  return typeof e.constructor == "function" && !Pl(e) ? Cp(sm(e)) : {};
}
var tg = "[object Map]";
function rg(e) {
  return bt(e) && Be(e) == tg;
}
var Qa = Qt && Qt.isMap, ng = Qa ? Qs(Qa) : rg, og = "[object Set]";
function sg(e) {
  return bt(e) && Be(e) == og;
}
var Za = Qt && Qt.isSet, ig = Za ? Qs(Za) : sg, Il = "[object Arguments]", ag = "[object Array]", cg = "[object Boolean]", lg = "[object Date]", ug = "[object Error]", Ml = "[object Function]", fg = "[object GeneratorFunction]", dg = "[object Map]", pg = "[object Number]", jl = "[object Object]", hg = "[object RegExp]", mg = "[object Set]", gg = "[object String]", yg = "[object Symbol]", vg = "[object WeakMap]", bg = "[object ArrayBuffer]", wg = "[object DataView]", xg = "[object Float32Array]", Sg = "[object Float64Array]", Eg = "[object Int8Array]", Pg = "[object Int16Array]", Ag = "[object Int32Array]", Cg = "[object Uint8Array]", Rg = "[object Uint8ClampedArray]", Tg = "[object Uint16Array]", Og = "[object Uint32Array]", fe = {};
fe[Il] = fe[ag] = fe[bg] = fe[wg] = fe[cg] = fe[lg] = fe[xg] = fe[Sg] = fe[Eg] = fe[Pg] = fe[Ag] = fe[dg] = fe[pg] = fe[jl] = fe[hg] = fe[mg] = fe[gg] = fe[yg] = fe[Cg] = fe[Rg] = fe[Tg] = fe[Og] = !0;
fe[ug] = fe[Ml] = fe[vg] = !1;
function en(e, t, r, n, o, s) {
  var i;
  if (i !== void 0)
    return i;
  if (!Yt(e))
    return e;
  var a = at(e);
  if (a)
    i = Tm(e);
  else {
    var l = Be(e), c = l == Ml || l == fg;
    if (un(e))
      return pm(e);
    if (l == jl || l == Il || c && !o)
      i = c ? {} : eg(e);
    else {
      if (!fe[l])
        return o ? e : {};
      i = Zm(e, l);
    }
  }
  s || (s = new it());
  var u = s.get(e);
  if (u)
    return u;
  s.set(e, i), ig(e) ? e.forEach(function(h) {
    i.add(en(h, t, r, h, e, s));
  }) : ng(e) && e.forEach(function(h, g) {
    i.set(g, en(h, t, r, g, e, s));
  });
  var f = hs, m = a ? void 0 : f(e);
  return Rp(m || e, function(h, g) {
    m && (g = h, h = e[g]), El(i, g, en(h, t, r, g, e, s));
  }), i;
}
var _g = 1, Ng = 4;
function wr(e) {
  return en(e, _g | Ng);
}
var kg = "__lodash_hash_undefined__";
function Ig(e) {
  return this.__data__.set(e, kg), this;
}
function Mg(e) {
  return this.__data__.has(e);
}
function dn(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new ft(); ++t < r; )
    this.add(e[t]);
}
dn.prototype.add = dn.prototype.push = Ig;
dn.prototype.has = Mg;
function jg(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
function Dg(e, t) {
  return e.has(t);
}
var Fg = 1, Lg = 2;
function Dl(e, t, r, n, o, s) {
  var i = r & Fg, a = e.length, l = t.length;
  if (a != l && !(i && l > a))
    return !1;
  var c = s.get(e), u = s.get(t);
  if (c && u)
    return c == t && u == e;
  var f = -1, m = !0, h = r & Lg ? new dn() : void 0;
  for (s.set(e, t), s.set(t, e); ++f < a; ) {
    var g = e[f], p = t[f];
    if (n)
      var d = i ? n(p, g, f, t, e, s) : n(g, p, f, e, t, s);
    if (d !== void 0) {
      if (d)
        continue;
      m = !1;
      break;
    }
    if (h) {
      if (!jg(t, function(v, y) {
        if (!Dg(h, y) && (g === v || o(g, v, r, n, s)))
          return h.push(y);
      })) {
        m = !1;
        break;
      }
    } else if (!(g === p || o(g, p, r, n, s))) {
      m = !1;
      break;
    }
  }
  return s.delete(e), s.delete(t), m;
}
function $g(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, o) {
    r[++t] = [o, n];
  }), r;
}
function Bg(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var qg = 1, Ug = 2, Hg = "[object Boolean]", zg = "[object Date]", Wg = "[object Error]", Vg = "[object Map]", Gg = "[object Number]", Kg = "[object RegExp]", Jg = "[object Set]", Xg = "[object String]", Yg = "[object Symbol]", Qg = "[object ArrayBuffer]", Zg = "[object DataView]", ec = Qe ? Qe.prototype : void 0, Xo = ec ? ec.valueOf : void 0;
function ey(e, t, r, n, o, s, i) {
  switch (r) {
    case Zg:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Qg:
      return !(e.byteLength != t.byteLength || !s(new fn(e), new fn(t)));
    case Hg:
    case zg:
    case Gg:
      return Xs(+e, +t);
    case Wg:
      return e.name == t.name && e.message == t.message;
    case Kg:
    case Xg:
      return e == t + "";
    case Vg:
      var a = $g;
    case Jg:
      var l = n & qg;
      if (a || (a = Bg), e.size != t.size && !l)
        return !1;
      var c = i.get(e);
      if (c)
        return c == t;
      n |= Ug, i.set(e, t);
      var u = Dl(a(e), a(t), n, o, s, i);
      return i.delete(e), u;
    case Yg:
      if (Xo)
        return Xo.call(e) == Xo.call(t);
  }
  return !1;
}
var ty = 1, ry = Object.prototype, ny = ry.hasOwnProperty;
function oy(e, t, r, n, o, s) {
  var i = r & ty, a = hs(e), l = a.length, c = hs(t), u = c.length;
  if (l != u && !i)
    return !1;
  for (var f = l; f--; ) {
    var m = a[f];
    if (!(i ? m in t : ny.call(t, m)))
      return !1;
  }
  var h = s.get(e), g = s.get(t);
  if (h && g)
    return h == t && g == e;
  var p = !0;
  s.set(e, t), s.set(t, e);
  for (var d = i; ++f < l; ) {
    m = a[f];
    var v = e[m], y = t[m];
    if (n)
      var w = i ? n(y, v, m, t, e, s) : n(v, y, m, e, t, s);
    if (!(w === void 0 ? v === y || o(v, y, r, n, s) : w)) {
      p = !1;
      break;
    }
    d || (d = m == "constructor");
  }
  if (p && !d) {
    var S = e.constructor, P = t.constructor;
    S != P && "constructor" in e && "constructor" in t && !(typeof S == "function" && S instanceof S && typeof P == "function" && P instanceof P) && (p = !1);
  }
  return s.delete(e), s.delete(t), p;
}
var sy = 1, tc = "[object Arguments]", rc = "[object Array]", Hr = "[object Object]", iy = Object.prototype, nc = iy.hasOwnProperty;
function ay(e, t, r, n, o, s) {
  var i = at(e), a = at(t), l = i ? rc : Be(e), c = a ? rc : Be(t);
  l = l == tc ? Hr : l, c = c == tc ? Hr : c;
  var u = l == Hr, f = c == Hr, m = l == c;
  if (m && un(e)) {
    if (!un(t))
      return !1;
    i = !0, u = !1;
  }
  if (m && !u)
    return s || (s = new it()), i || Ol(e) ? Dl(e, t, r, n, o, s) : ey(e, t, l, r, n, o, s);
  if (!(r & sy)) {
    var h = u && nc.call(e, "__wrapped__"), g = f && nc.call(t, "__wrapped__");
    if (h || g) {
      var p = h ? e.value() : e, d = g ? t.value() : t;
      return s || (s = new it()), o(p, d, r, n, s);
    }
  }
  return m ? (s || (s = new it()), oy(e, t, r, n, o, s)) : !1;
}
function Fl(e, t, r, n, o) {
  return e === t ? !0 : e == null || t == null || !bt(e) && !bt(t) ? e !== e && t !== t : ay(e, t, r, n, Fl, o);
}
function cy(e, t, r) {
  t = ei(t, e);
  for (var n = -1, o = t.length, s = !1; ++n < o; ) {
    var i = ti(t[n]);
    if (!(s = e != null && r(e, i)))
      break;
    e = e[i];
  }
  return s || ++n != o ? s : (o = e == null ? 0 : e.length, !!o && Ys(o) && Js(i, o) && (at(e) || Cl(e)));
}
var ly = Object.prototype, uy = ly.hasOwnProperty;
function fy(e, t) {
  return e != null && uy.call(e, t);
}
function dy(e, t) {
  return e != null && cy(e, t, fy);
}
function Ll(e, t) {
  return Fl(e, t);
}
function py(e, t, r, n) {
  if (!Yt(e))
    return e;
  t = ei(t, e);
  for (var o = -1, s = t.length, i = s - 1, a = e; a != null && ++o < s; ) {
    var l = ti(t[o]), c = r;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (o != i) {
      var u = a[l];
      c = void 0, c === void 0 && (c = Yt(u) ? u : Js(t[o + 1]) ? [] : {});
    }
    El(a, l, c), a = a[l];
  }
  return e;
}
function Pr(e, t, r) {
  return e == null ? e : py(e, t, r);
}
function $l(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: hy } = Object.prototype, { getPrototypeOf: ni } = Object, { iterator: Tn, toStringTag: Bl } = Symbol, On = /* @__PURE__ */ ((e) => (t) => {
  const r = hy.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), We = (e) => (e = e.toLowerCase(), (t) => On(t) === e), _n = (e) => (t) => typeof t === e, { isArray: sr } = Array, _r = _n("undefined");
function Ir(e) {
  return e !== null && !_r(e) && e.constructor !== null && !_r(e.constructor) && Oe(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const ql = We("ArrayBuffer");
function my(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && ql(e.buffer), t;
}
const gy = _n("string"), Oe = _n("function"), Ul = _n("number"), Mr = (e) => e !== null && typeof e == "object", yy = (e) => e === !0 || e === !1, tn = (e) => {
  if (On(e) !== "object")
    return !1;
  const t = ni(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Bl in e) && !(Tn in e);
}, vy = (e) => {
  if (!Mr(e) || Ir(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, by = We("Date"), wy = We("File"), xy = We("Blob"), Sy = We("FileList"), Ey = (e) => Mr(e) && Oe(e.pipe), Py = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Oe(e.append) && ((t = On(e)) === "formdata" || // detect form-data instance
  t === "object" && Oe(e.toString) && e.toString() === "[object FormData]"));
}, Ay = We("URLSearchParams"), [Cy, Ry, Ty, Oy] = ["ReadableStream", "Request", "Response", "Headers"].map(We), _y = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function jr(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), sr(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    if (Ir(e))
      return;
    const s = r ? Object.getOwnPropertyNames(e) : Object.keys(e), i = s.length;
    let a;
    for (n = 0; n < i; n++)
      a = s[n], t.call(null, e[a], a, e);
  }
}
function Hl(e, t) {
  if (Ir(e))
    return null;
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Rt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, zl = (e) => !_r(e) && e !== Rt;
function vs() {
  const { caseless: e } = zl(this) && this || {}, t = {}, r = (n, o) => {
    const s = e && Hl(t, o) || o;
    tn(t[s]) && tn(n) ? t[s] = vs(t[s], n) : tn(n) ? t[s] = vs({}, n) : sr(n) ? t[s] = n.slice() : t[s] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && jr(arguments[n], r);
  return t;
}
const Ny = (e, t, r, { allOwnKeys: n } = {}) => (jr(t, (o, s) => {
  r && Oe(o) ? e[s] = $l(o, r) : e[s] = o;
}, { allOwnKeys: n }), e), ky = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Iy = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, My = (e, t, r, n) => {
  let o, s, i;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0; )
      i = o[s], (!n || n(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
    e = r !== !1 && ni(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, jy = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, Dy = (e) => {
  if (!e) return null;
  if (sr(e)) return e;
  let t = e.length;
  if (!Ul(t)) return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, Fy = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && ni(Uint8Array)), Ly = (e, t) => {
  const n = (e && e[Tn]).call(e);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const s = o.value;
    t.call(e, s[0], s[1]);
  }
}, $y = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, By = We("HTMLFormElement"), qy = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), oc = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), Uy = We("RegExp"), Wl = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  jr(r, (o, s) => {
    let i;
    (i = t(o, s, e)) !== !1 && (n[s] = i || o);
  }), Object.defineProperties(e, n);
}, Hy = (e) => {
  Wl(e, (t, r) => {
    if (Oe(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (Oe(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, zy = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((s) => {
      r[s] = !0;
    });
  };
  return sr(e) ? n(e) : n(String(e).split(t)), r;
}, Wy = () => {
}, Vy = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Gy(e) {
  return !!(e && Oe(e.append) && e[Bl] === "FormData" && e[Tn]);
}
const Ky = (e) => {
  const t = new Array(10), r = (n, o) => {
    if (Mr(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (Ir(n))
        return n;
      if (!("toJSON" in n)) {
        t[o] = n;
        const s = sr(n) ? [] : {};
        return jr(n, (i, a) => {
          const l = r(i, o + 1);
          !_r(l) && (s[a] = l);
        }), t[o] = void 0, s;
      }
    }
    return n;
  };
  return r(e, 0);
}, Jy = We("AsyncFunction"), Xy = (e) => e && (Mr(e) || Oe(e)) && Oe(e.then) && Oe(e.catch), Vl = ((e, t) => e ? setImmediate : t ? ((r, n) => (Rt.addEventListener("message", ({ source: o, data: s }) => {
  o === Rt && s === r && n.length && n.shift()();
}, !1), (o) => {
  n.push(o), Rt.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  Oe(Rt.postMessage)
), Yy = typeof queueMicrotask < "u" ? queueMicrotask.bind(Rt) : typeof process < "u" && process.nextTick || Vl, Qy = (e) => e != null && Oe(e[Tn]), _ = {
  isArray: sr,
  isArrayBuffer: ql,
  isBuffer: Ir,
  isFormData: Py,
  isArrayBufferView: my,
  isString: gy,
  isNumber: Ul,
  isBoolean: yy,
  isObject: Mr,
  isPlainObject: tn,
  isEmptyObject: vy,
  isReadableStream: Cy,
  isRequest: Ry,
  isResponse: Ty,
  isHeaders: Oy,
  isUndefined: _r,
  isDate: by,
  isFile: wy,
  isBlob: xy,
  isRegExp: Uy,
  isFunction: Oe,
  isStream: Ey,
  isURLSearchParams: Ay,
  isTypedArray: Fy,
  isFileList: Sy,
  forEach: jr,
  merge: vs,
  extend: Ny,
  trim: _y,
  stripBOM: ky,
  inherits: Iy,
  toFlatObject: My,
  kindOf: On,
  kindOfTest: We,
  endsWith: jy,
  toArray: Dy,
  forEachEntry: Ly,
  matchAll: $y,
  isHTMLForm: By,
  hasOwnProperty: oc,
  hasOwnProp: oc,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Wl,
  freezeMethods: Hy,
  toObjectSet: zy,
  toCamelCase: qy,
  noop: Wy,
  toFiniteNumber: Vy,
  findKey: Hl,
  global: Rt,
  isContextDefined: zl,
  isSpecCompliantForm: Gy,
  toJSONObject: Ky,
  isAsyncFn: Jy,
  isThenable: Xy,
  setImmediate: Vl,
  asap: Yy,
  isIterable: Qy
};
function ne(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o, this.status = o.status ? o.status : null);
}
_.inherits(ne, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: _.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Gl = ne.prototype, Kl = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Kl[e] = { value: e };
});
Object.defineProperties(ne, Kl);
Object.defineProperty(Gl, "isAxiosError", { value: !0 });
ne.from = (e, t, r, n, o, s) => {
  const i = Object.create(Gl);
  return _.toFlatObject(e, i, function(l) {
    return l !== Error.prototype;
  }, (a) => a !== "isAxiosError"), ne.call(i, e.message, t, r, n, o), i.cause = e, i.name = e.name, s && Object.assign(i, s), i;
};
const Zy = null;
function bs(e) {
  return _.isPlainObject(e) || _.isArray(e);
}
function Jl(e) {
  return _.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function sc(e, t, r) {
  return e ? e.concat(t).map(function(o, s) {
    return o = Jl(o), !r && s ? "[" + o + "]" : o;
  }).join(r ? "." : "") : t;
}
function ev(e) {
  return _.isArray(e) && !e.some(bs);
}
const tv = _.toFlatObject(_, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Nn(e, t, r) {
  if (!_.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), r = _.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, d) {
    return !_.isUndefined(d[p]);
  });
  const n = r.metaTokens, o = r.visitor || u, s = r.dots, i = r.indexes, l = (r.Blob || typeof Blob < "u" && Blob) && _.isSpecCompliantForm(t);
  if (!_.isFunction(o))
    throw new TypeError("visitor must be a function");
  function c(g) {
    if (g === null) return "";
    if (_.isDate(g))
      return g.toISOString();
    if (_.isBoolean(g))
      return g.toString();
    if (!l && _.isBlob(g))
      throw new ne("Blob is not supported. Use a Buffer instead.");
    return _.isArrayBuffer(g) || _.isTypedArray(g) ? l && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function u(g, p, d) {
    let v = g;
    if (g && !d && typeof g == "object") {
      if (_.endsWith(p, "{}"))
        p = n ? p : p.slice(0, -2), g = JSON.stringify(g);
      else if (_.isArray(g) && ev(g) || (_.isFileList(g) || _.endsWith(p, "[]")) && (v = _.toArray(g)))
        return p = Jl(p), v.forEach(function(w, S) {
          !(_.isUndefined(w) || w === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? sc([p], S, s) : i === null ? p : p + "[]",
            c(w)
          );
        }), !1;
    }
    return bs(g) ? !0 : (t.append(sc(d, p, s), c(g)), !1);
  }
  const f = [], m = Object.assign(tv, {
    defaultVisitor: u,
    convertValue: c,
    isVisitable: bs
  });
  function h(g, p) {
    if (!_.isUndefined(g)) {
      if (f.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + p.join("."));
      f.push(g), _.forEach(g, function(v, y) {
        (!(_.isUndefined(v) || v === null) && o.call(
          t,
          v,
          _.isString(y) ? y.trim() : y,
          p,
          m
        )) === !0 && h(v, p ? p.concat(y) : [y]);
      }), f.pop();
    }
  }
  if (!_.isObject(e))
    throw new TypeError("data must be an object");
  return h(e), t;
}
function ic(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function oi(e, t) {
  this._pairs = [], e && Nn(e, this, t);
}
const Xl = oi.prototype;
Xl.append = function(t, r) {
  this._pairs.push([t, r]);
};
Xl.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, ic);
  } : ic;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function rv(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Yl(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || rv;
  _.isFunction(r) && (r = {
    serialize: r
  });
  const o = r && r.serialize;
  let s;
  if (o ? s = o(t, r) : s = _.isURLSearchParams(t) ? t.toString() : new oi(t, r).toString(n), s) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class ac {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, r, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    _.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const Ql = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, nv = typeof URLSearchParams < "u" ? URLSearchParams : oi, ov = typeof FormData < "u" ? FormData : null, sv = typeof Blob < "u" ? Blob : null, iv = {
  isBrowser: !0,
  classes: {
    URLSearchParams: nv,
    FormData: ov,
    Blob: sv
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, si = typeof window < "u" && typeof document < "u", ws = typeof navigator == "object" && navigator || void 0, av = si && (!ws || ["ReactNative", "NativeScript", "NS"].indexOf(ws.product) < 0), cv = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", lv = si && window.location.href || "http://localhost", uv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: si,
  hasStandardBrowserEnv: av,
  hasStandardBrowserWebWorkerEnv: cv,
  navigator: ws,
  origin: lv
}, Symbol.toStringTag, { value: "Module" })), Pe = {
  ...uv,
  ...iv
};
function fv(e, t) {
  return Nn(e, new Pe.classes.URLSearchParams(), {
    visitor: function(r, n, o, s) {
      return Pe.isNode && _.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function dv(e) {
  return _.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function pv(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let s;
  for (n = 0; n < o; n++)
    s = r[n], t[s] = e[s];
  return t;
}
function Zl(e) {
  function t(r, n, o, s) {
    let i = r[s++];
    if (i === "__proto__") return !0;
    const a = Number.isFinite(+i), l = s >= r.length;
    return i = !i && _.isArray(o) ? o.length : i, l ? (_.hasOwnProp(o, i) ? o[i] = [o[i], n] : o[i] = n, !a) : ((!o[i] || !_.isObject(o[i])) && (o[i] = []), t(r, n, o[i], s) && _.isArray(o[i]) && (o[i] = pv(o[i])), !a);
  }
  if (_.isFormData(e) && _.isFunction(e.entries)) {
    const r = {};
    return _.forEachEntry(e, (n, o) => {
      t(dv(n), o, r, 0);
    }), r;
  }
  return null;
}
function hv(e, t, r) {
  if (_.isString(e))
    try {
      return (t || JSON.parse)(e), _.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const Dr = {
  transitional: Ql,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, s = _.isObject(t);
    if (s && _.isHTMLForm(t) && (t = new FormData(t)), _.isFormData(t))
      return o ? JSON.stringify(Zl(t)) : t;
    if (_.isArrayBuffer(t) || _.isBuffer(t) || _.isStream(t) || _.isFile(t) || _.isBlob(t) || _.isReadableStream(t))
      return t;
    if (_.isArrayBufferView(t))
      return t.buffer;
    if (_.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (s) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return fv(t, this.formSerializer).toString();
      if ((a = _.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return Nn(
          a ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return s || o ? (r.setContentType("application/json", !1), hv(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || Dr.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (_.isResponse(t) || _.isReadableStream(t))
      return t;
    if (t && _.isString(t) && (n && !this.responseType || o)) {
      const i = !(r && r.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? ne.from(a, ne.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Pe.classes.FormData,
    Blob: Pe.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
_.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Dr.headers[e] = {};
});
const mv = _.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), gv = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || t[r] && mv[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, cc = Symbol("internals");
function yr(e) {
  return e && String(e).trim().toLowerCase();
}
function rn(e) {
  return e === !1 || e == null ? e : _.isArray(e) ? e.map(rn) : String(e);
}
function yv(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const vv = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Yo(e, t, r, n, o) {
  if (_.isFunction(n))
    return n.call(this, t, r);
  if (o && (t = r), !!_.isString(t)) {
    if (_.isString(n))
      return t.indexOf(n) !== -1;
    if (_.isRegExp(n))
      return n.test(t);
  }
}
function bv(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function wv(e, t) {
  const r = _.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(o, s, i) {
        return this[n].call(this, t, o, s, i);
      },
      configurable: !0
    });
  });
}
let _e = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const o = this;
    function s(a, l, c) {
      const u = yr(l);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const f = _.findKey(o, u);
      (!f || o[f] === void 0 || c === !0 || c === void 0 && o[f] !== !1) && (o[f || l] = rn(a));
    }
    const i = (a, l) => _.forEach(a, (c, u) => s(c, u, l));
    if (_.isPlainObject(t) || t instanceof this.constructor)
      i(t, r);
    else if (_.isString(t) && (t = t.trim()) && !vv(t))
      i(gv(t), r);
    else if (_.isObject(t) && _.isIterable(t)) {
      let a = {}, l, c;
      for (const u of t) {
        if (!_.isArray(u))
          throw TypeError("Object iterator must return a key-value pair");
        a[c = u[0]] = (l = a[c]) ? _.isArray(l) ? [...l, u[1]] : [l, u[1]] : u[1];
      }
      i(a, r);
    } else
      t != null && s(r, t, n);
    return this;
  }
  get(t, r) {
    if (t = yr(t), t) {
      const n = _.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return yv(o);
        if (_.isFunction(r))
          return r.call(this, o, n);
        if (_.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = yr(t), t) {
      const n = _.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || Yo(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function s(i) {
      if (i = yr(i), i) {
        const a = _.findKey(n, i);
        a && (!r || Yo(n, n[a], a, r)) && (delete n[a], o = !0);
      }
    }
    return _.isArray(t) ? t.forEach(s) : s(t), o;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, o = !1;
    for (; n--; ) {
      const s = r[n];
      (!t || Yo(this, this[s], s, t, !0)) && (delete this[s], o = !0);
    }
    return o;
  }
  normalize(t) {
    const r = this, n = {};
    return _.forEach(this, (o, s) => {
      const i = _.findKey(n, s);
      if (i) {
        r[i] = rn(o), delete r[s];
        return;
      }
      const a = t ? bv(s) : String(s).trim();
      a !== s && delete r[s], r[a] = rn(o), n[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return _.forEach(this, (n, o) => {
      n != null && n !== !1 && (r[o] = t && _.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return r.forEach((o) => n.set(o)), n;
  }
  static accessor(t) {
    const n = (this[cc] = this[cc] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function s(i) {
      const a = yr(i);
      n[a] || (wv(o, i), n[a] = !0);
    }
    return _.isArray(t) ? t.forEach(s) : s(t), this;
  }
};
_e.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
_.reduceDescriptors(_e.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    }
  };
});
_.freezeMethods(_e);
function Qo(e, t) {
  const r = this || Dr, n = t || r, o = _e.from(n.headers);
  let s = n.data;
  return _.forEach(e, function(a) {
    s = a.call(r, s, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), s;
}
function eu(e) {
  return !!(e && e.__CANCEL__);
}
function ir(e, t, r) {
  ne.call(this, e ?? "canceled", ne.ERR_CANCELED, t, r), this.name = "CanceledError";
}
_.inherits(ir, ne, {
  __CANCEL__: !0
});
function tu(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new ne(
    "Request failed with status code " + r.status,
    [ne.ERR_BAD_REQUEST, ne.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function xv(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Sv(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let o = 0, s = 0, i;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const c = Date.now(), u = n[s];
    i || (i = c), r[o] = l, n[o] = c;
    let f = s, m = 0;
    for (; f !== o; )
      m += r[f++], f = f % e;
    if (o = (o + 1) % e, o === s && (s = (s + 1) % e), c - i < t)
      return;
    const h = u && c - u;
    return h ? Math.round(m * 1e3 / h) : void 0;
  };
}
function Ev(e, t) {
  let r = 0, n = 1e3 / t, o, s;
  const i = (c, u = Date.now()) => {
    r = u, o = null, s && (clearTimeout(s), s = null), e(...c);
  };
  return [(...c) => {
    const u = Date.now(), f = u - r;
    f >= n ? i(c, u) : (o = c, s || (s = setTimeout(() => {
      s = null, i(o);
    }, n - f)));
  }, () => o && i(o)];
}
const pn = (e, t, r = 3) => {
  let n = 0;
  const o = Sv(50, 250);
  return Ev((s) => {
    const i = s.loaded, a = s.lengthComputable ? s.total : void 0, l = i - n, c = o(l), u = i <= a;
    n = i;
    const f = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: l,
      rate: c || void 0,
      estimated: c && a && u ? (a - i) / c : void 0,
      event: s,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(f);
  }, r);
}, lc = (e, t) => {
  const r = e != null;
  return [(n) => t[0]({
    lengthComputable: r,
    total: e,
    loaded: n
  }), t[1]];
}, uc = (e) => (...t) => _.asap(() => e(...t)), Pv = Pe.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (r) => (r = new URL(r, Pe.origin), e.protocol === r.protocol && e.host === r.host && (t || e.port === r.port)))(
  new URL(Pe.origin),
  Pe.navigator && /(msie|trident)/i.test(Pe.navigator.userAgent)
) : () => !0, Av = Pe.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, r, n, o, s) {
      const i = [e + "=" + encodeURIComponent(t)];
      _.isNumber(r) && i.push("expires=" + new Date(r).toGMTString()), _.isString(n) && i.push("path=" + n), _.isString(o) && i.push("domain=" + o), s === !0 && i.push("secure"), document.cookie = i.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Cv(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Rv(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ru(e, t, r) {
  let n = !Cv(t);
  return e && (n || r == !1) ? Rv(e, t) : t;
}
const fc = (e) => e instanceof _e ? { ...e } : e;
function kt(e, t) {
  t = t || {};
  const r = {};
  function n(c, u, f, m) {
    return _.isPlainObject(c) && _.isPlainObject(u) ? _.merge.call({ caseless: m }, c, u) : _.isPlainObject(u) ? _.merge({}, u) : _.isArray(u) ? u.slice() : u;
  }
  function o(c, u, f, m) {
    if (_.isUndefined(u)) {
      if (!_.isUndefined(c))
        return n(void 0, c, f, m);
    } else return n(c, u, f, m);
  }
  function s(c, u) {
    if (!_.isUndefined(u))
      return n(void 0, u);
  }
  function i(c, u) {
    if (_.isUndefined(u)) {
      if (!_.isUndefined(c))
        return n(void 0, c);
    } else return n(void 0, u);
  }
  function a(c, u, f) {
    if (f in t)
      return n(c, u);
    if (f in e)
      return n(void 0, c);
  }
  const l = {
    url: s,
    method: s,
    data: s,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: a,
    headers: (c, u, f) => o(fc(c), fc(u), f, !0)
  };
  return _.forEach(Object.keys({ ...e, ...t }), function(u) {
    const f = l[u] || o, m = f(e[u], t[u], u);
    _.isUndefined(m) && f !== a || (r[u] = m);
  }), r;
}
const nu = (e) => {
  const t = kt({}, e);
  let { data: r, withXSRFToken: n, xsrfHeaderName: o, xsrfCookieName: s, headers: i, auth: a } = t;
  t.headers = i = _e.from(i), t.url = Yl(ru(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), a && i.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  );
  let l;
  if (_.isFormData(r)) {
    if (Pe.hasStandardBrowserEnv || Pe.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if ((l = i.getContentType()) !== !1) {
      const [c, ...u] = l ? l.split(";").map((f) => f.trim()).filter(Boolean) : [];
      i.setContentType([c || "multipart/form-data", ...u].join("; "));
    }
  }
  if (Pe.hasStandardBrowserEnv && (n && _.isFunction(n) && (n = n(t)), n || n !== !1 && Pv(t.url))) {
    const c = o && s && Av.read(s);
    c && i.set(o, c);
  }
  return t;
}, Tv = typeof XMLHttpRequest < "u", Ov = Tv && function(e) {
  return new Promise(function(r, n) {
    const o = nu(e);
    let s = o.data;
    const i = _e.from(o.headers).normalize();
    let { responseType: a, onUploadProgress: l, onDownloadProgress: c } = o, u, f, m, h, g;
    function p() {
      h && h(), g && g(), o.cancelToken && o.cancelToken.unsubscribe(u), o.signal && o.signal.removeEventListener("abort", u);
    }
    let d = new XMLHttpRequest();
    d.open(o.method.toUpperCase(), o.url, !0), d.timeout = o.timeout;
    function v() {
      if (!d)
        return;
      const w = _e.from(
        "getAllResponseHeaders" in d && d.getAllResponseHeaders()
      ), P = {
        data: !a || a === "text" || a === "json" ? d.responseText : d.response,
        status: d.status,
        statusText: d.statusText,
        headers: w,
        config: e,
        request: d
      };
      tu(function(A) {
        r(A), p();
      }, function(A) {
        n(A), p();
      }, P), d = null;
    }
    "onloadend" in d ? d.onloadend = v : d.onreadystatechange = function() {
      !d || d.readyState !== 4 || d.status === 0 && !(d.responseURL && d.responseURL.indexOf("file:") === 0) || setTimeout(v);
    }, d.onabort = function() {
      d && (n(new ne("Request aborted", ne.ECONNABORTED, e, d)), d = null);
    }, d.onerror = function() {
      n(new ne("Network Error", ne.ERR_NETWORK, e, d)), d = null;
    }, d.ontimeout = function() {
      let S = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const P = o.transitional || Ql;
      o.timeoutErrorMessage && (S = o.timeoutErrorMessage), n(new ne(
        S,
        P.clarifyTimeoutError ? ne.ETIMEDOUT : ne.ECONNABORTED,
        e,
        d
      )), d = null;
    }, s === void 0 && i.setContentType(null), "setRequestHeader" in d && _.forEach(i.toJSON(), function(S, P) {
      d.setRequestHeader(P, S);
    }), _.isUndefined(o.withCredentials) || (d.withCredentials = !!o.withCredentials), a && a !== "json" && (d.responseType = o.responseType), c && ([m, g] = pn(c, !0), d.addEventListener("progress", m)), l && d.upload && ([f, h] = pn(l), d.upload.addEventListener("progress", f), d.upload.addEventListener("loadend", h)), (o.cancelToken || o.signal) && (u = (w) => {
      d && (n(!w || w.type ? new ir(null, e, d) : w), d.abort(), d = null);
    }, o.cancelToken && o.cancelToken.subscribe(u), o.signal && (o.signal.aborted ? u() : o.signal.addEventListener("abort", u)));
    const y = xv(o.url);
    if (y && Pe.protocols.indexOf(y) === -1) {
      n(new ne("Unsupported protocol " + y + ":", ne.ERR_BAD_REQUEST, e));
      return;
    }
    d.send(s || null);
  });
}, _v = (e, t) => {
  const { length: r } = e = e ? e.filter(Boolean) : [];
  if (t || r) {
    let n = new AbortController(), o;
    const s = function(c) {
      if (!o) {
        o = !0, a();
        const u = c instanceof Error ? c : this.reason;
        n.abort(u instanceof ne ? u : new ir(u instanceof Error ? u.message : u));
      }
    };
    let i = t && setTimeout(() => {
      i = null, s(new ne(`timeout ${t} of ms exceeded`, ne.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((c) => {
        c.unsubscribe ? c.unsubscribe(s) : c.removeEventListener("abort", s);
      }), e = null);
    };
    e.forEach((c) => c.addEventListener("abort", s));
    const { signal: l } = n;
    return l.unsubscribe = () => _.asap(a), l;
  }
}, Nv = function* (e, t) {
  let r = e.byteLength;
  if (r < t) {
    yield e;
    return;
  }
  let n = 0, o;
  for (; n < r; )
    o = n + t, yield e.slice(n, o), n = o;
}, kv = async function* (e, t) {
  for await (const r of Iv(e))
    yield* Nv(r, t);
}, Iv = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: r, value: n } = await t.read();
      if (r)
        break;
      yield n;
    }
  } finally {
    await t.cancel();
  }
}, dc = (e, t, r, n) => {
  const o = kv(e, t);
  let s = 0, i, a = (l) => {
    i || (i = !0, n && n(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: c, value: u } = await o.next();
        if (c) {
          a(), l.close();
          return;
        }
        let f = u.byteLength;
        if (r) {
          let m = s += f;
          r(m);
        }
        l.enqueue(new Uint8Array(u));
      } catch (c) {
        throw a(c), c;
      }
    },
    cancel(l) {
      return a(l), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, kn = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", ou = kn && typeof ReadableStream == "function", Mv = kn && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), su = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, jv = ou && su(() => {
  let e = !1;
  const t = new Request(Pe.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), pc = 64 * 1024, xs = ou && su(() => _.isReadableStream(new Response("").body)), hn = {
  stream: xs && ((e) => e.body)
};
kn && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !hn[t] && (hn[t] = _.isFunction(e[t]) ? (r) => r[t]() : (r, n) => {
      throw new ne(`Response type '${t}' is not supported`, ne.ERR_NOT_SUPPORT, n);
    });
  });
})(new Response());
const Dv = async (e) => {
  if (e == null)
    return 0;
  if (_.isBlob(e))
    return e.size;
  if (_.isSpecCompliantForm(e))
    return (await new Request(Pe.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (_.isArrayBufferView(e) || _.isArrayBuffer(e))
    return e.byteLength;
  if (_.isURLSearchParams(e) && (e = e + ""), _.isString(e))
    return (await Mv(e)).byteLength;
}, Fv = async (e, t) => {
  const r = _.toFiniteNumber(e.getContentLength());
  return r ?? Dv(t);
}, Lv = kn && (async (e) => {
  let {
    url: t,
    method: r,
    data: n,
    signal: o,
    cancelToken: s,
    timeout: i,
    onDownloadProgress: a,
    onUploadProgress: l,
    responseType: c,
    headers: u,
    withCredentials: f = "same-origin",
    fetchOptions: m
  } = nu(e);
  c = c ? (c + "").toLowerCase() : "text";
  let h = _v([o, s && s.toAbortSignal()], i), g;
  const p = h && h.unsubscribe && (() => {
    h.unsubscribe();
  });
  let d;
  try {
    if (l && jv && r !== "get" && r !== "head" && (d = await Fv(u, n)) !== 0) {
      let P = new Request(t, {
        method: "POST",
        body: n,
        duplex: "half"
      }), T;
      if (_.isFormData(n) && (T = P.headers.get("content-type")) && u.setContentType(T), P.body) {
        const [A, E] = lc(
          d,
          pn(uc(l))
        );
        n = dc(P.body, pc, A, E);
      }
    }
    _.isString(f) || (f = f ? "include" : "omit");
    const v = "credentials" in Request.prototype;
    g = new Request(t, {
      ...m,
      signal: h,
      method: r.toUpperCase(),
      headers: u.normalize().toJSON(),
      body: n,
      duplex: "half",
      credentials: v ? f : void 0
    });
    let y = await fetch(g, m);
    const w = xs && (c === "stream" || c === "response");
    if (xs && (a || w && p)) {
      const P = {};
      ["status", "statusText", "headers"].forEach((I) => {
        P[I] = y[I];
      });
      const T = _.toFiniteNumber(y.headers.get("content-length")), [A, E] = a && lc(
        T,
        pn(uc(a), !0)
      ) || [];
      y = new Response(
        dc(y.body, pc, A, () => {
          E && E(), p && p();
        }),
        P
      );
    }
    c = c || "text";
    let S = await hn[_.findKey(hn, c) || "text"](y, e);
    return !w && p && p(), await new Promise((P, T) => {
      tu(P, T, {
        data: S,
        headers: _e.from(y.headers),
        status: y.status,
        statusText: y.statusText,
        config: e,
        request: g
      });
    });
  } catch (v) {
    throw p && p(), v && v.name === "TypeError" && /Load failed|fetch/i.test(v.message) ? Object.assign(
      new ne("Network Error", ne.ERR_NETWORK, e, g),
      {
        cause: v.cause || v
      }
    ) : ne.from(v, v && v.code, e, g);
  }
}), Ss = {
  http: Zy,
  xhr: Ov,
  fetch: Lv
};
_.forEach(Ss, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const hc = (e) => `- ${e}`, $v = (e) => _.isFunction(e) || e === null || e === !1, iu = {
  getAdapter: (e) => {
    e = _.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    const o = {};
    for (let s = 0; s < t; s++) {
      r = e[s];
      let i;
      if (n = r, !$v(r) && (n = Ss[(i = String(r)).toLowerCase()], n === void 0))
        throw new ne(`Unknown adapter '${i}'`);
      if (n)
        break;
      o[i || "#" + s] = n;
    }
    if (!n) {
      const s = Object.entries(o).map(
        ([a, l]) => `adapter ${a} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = t ? s.length > 1 ? `since :
` + s.map(hc).join(`
`) : " " + hc(s[0]) : "as no adapter specified";
      throw new ne(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: Ss
};
function Zo(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new ir(null, e);
}
function mc(e) {
  return Zo(e), e.headers = _e.from(e.headers), e.data = Qo.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), iu.getAdapter(e.adapter || Dr.adapter)(e).then(function(n) {
    return Zo(e), n.data = Qo.call(
      e,
      e.transformResponse,
      n
    ), n.headers = _e.from(n.headers), n;
  }, function(n) {
    return eu(n) || (Zo(e), n && n.response && (n.response.data = Qo.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = _e.from(n.response.headers))), Promise.reject(n);
  });
}
const au = "1.11.0", In = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  In[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const gc = {};
In.transitional = function(t, r, n) {
  function o(s, i) {
    return "[Axios v" + au + "] Transitional option '" + s + "'" + i + (n ? ". " + n : "");
  }
  return (s, i, a) => {
    if (t === !1)
      throw new ne(
        o(i, " has been removed" + (r ? " in " + r : "")),
        ne.ERR_DEPRECATED
      );
    return r && !gc[i] && (gc[i] = !0, console.warn(
      o(
        i,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(s, i, a) : !0;
  };
};
In.spelling = function(t) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function Bv(e, t, r) {
  if (typeof e != "object")
    throw new ne("options must be an object", ne.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const s = n[o], i = t[s];
    if (i) {
      const a = e[s], l = a === void 0 || i(a, s, e);
      if (l !== !0)
        throw new ne("option " + s + " must be " + l, ne.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new ne("Unknown option " + s, ne.ERR_BAD_OPTION);
  }
}
const nn = {
  assertOptions: Bv,
  validators: In
}, Ge = nn.validators;
let Ot = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new ac(),
      response: new ac()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, r) {
    try {
      return await this._request(t, r);
    } catch (n) {
      if (n instanceof Error) {
        let o = {};
        Error.captureStackTrace ? Error.captureStackTrace(o) : o = new Error();
        const s = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? s && !String(n.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + s) : n.stack = s;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = kt(this.defaults, r);
    const { transitional: n, paramsSerializer: o, headers: s } = r;
    n !== void 0 && nn.assertOptions(n, {
      silentJSONParsing: Ge.transitional(Ge.boolean),
      forcedJSONParsing: Ge.transitional(Ge.boolean),
      clarifyTimeoutError: Ge.transitional(Ge.boolean)
    }, !1), o != null && (_.isFunction(o) ? r.paramsSerializer = {
      serialize: o
    } : nn.assertOptions(o, {
      encode: Ge.function,
      serialize: Ge.function
    }, !0)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = !0), nn.assertOptions(r, {
      baseUrl: Ge.spelling("baseURL"),
      withXsrfToken: Ge.spelling("withXSRFToken")
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let i = s && _.merge(
      s.common,
      s[r.method]
    );
    s && _.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (g) => {
        delete s[g];
      }
    ), r.headers = _e.concat(i, s);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(r) === !1 || (l = l && p.synchronous, a.unshift(p.fulfilled, p.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(p) {
      c.push(p.fulfilled, p.rejected);
    });
    let u, f = 0, m;
    if (!l) {
      const g = [mc.bind(this), void 0];
      for (g.unshift(...a), g.push(...c), m = g.length, u = Promise.resolve(r); f < m; )
        u = u.then(g[f++], g[f++]);
      return u;
    }
    m = a.length;
    let h = r;
    for (f = 0; f < m; ) {
      const g = a[f++], p = a[f++];
      try {
        h = g(h);
      } catch (d) {
        p.call(this, d);
        break;
      }
    }
    try {
      u = mc.call(this, h);
    } catch (g) {
      return Promise.reject(g);
    }
    for (f = 0, m = c.length; f < m; )
      u = u.then(c[f++], c[f++]);
    return u;
  }
  getUri(t) {
    t = kt(this.defaults, t);
    const r = ru(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Yl(r, t.params, t.paramsSerializer);
  }
};
_.forEach(["delete", "get", "head", "options"], function(t) {
  Ot.prototype[t] = function(r, n) {
    return this.request(kt(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
_.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(s, i, a) {
      return this.request(kt(a || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: i
      }));
    };
  }
  Ot.prototype[t] = r(), Ot.prototype[t + "Form"] = r(!0);
});
let qv = class cu {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(s) {
      r = s;
    });
    const n = this;
    this.promise.then((o) => {
      if (!n._listeners) return;
      let s = n._listeners.length;
      for (; s-- > 0; )
        n._listeners[s](o);
      n._listeners = null;
    }), this.promise.then = (o) => {
      let s;
      const i = new Promise((a) => {
        n.subscribe(a), s = a;
      }).then(o);
      return i.cancel = function() {
        n.unsubscribe(s);
      }, i;
    }, t(function(s, i, a) {
      n.reason || (n.reason = new ir(s, i, a), r(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), r = (n) => {
      t.abort(n);
    };
    return this.subscribe(r), t.signal.unsubscribe = () => this.unsubscribe(r), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new cu(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
};
function Uv(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function Hv(e) {
  return _.isObject(e) && e.isAxiosError === !0;
}
const Es = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Es).forEach(([e, t]) => {
  Es[t] = e;
});
function lu(e) {
  const t = new Ot(e), r = $l(Ot.prototype.request, t);
  return _.extend(r, Ot.prototype, t, { allOwnKeys: !0 }), _.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(o) {
    return lu(kt(e, o));
  }, r;
}
const ye = lu(Dr);
ye.Axios = Ot;
ye.CanceledError = ir;
ye.CancelToken = qv;
ye.isCancel = eu;
ye.VERSION = au;
ye.toFormData = Nn;
ye.AxiosError = ne;
ye.Cancel = ye.CanceledError;
ye.all = function(t) {
  return Promise.all(t);
};
ye.spread = Uv;
ye.isAxiosError = Hv;
ye.mergeConfig = kt;
ye.AxiosHeaders = _e;
ye.formToJSON = (e) => Zl(_.isHTMLForm(e) ? new FormData(e) : e);
ye.getAdapter = iu.getAdapter;
ye.HttpStatusCode = Es;
ye.default = ye;
const {
  Axios: r0,
  AxiosError: n0,
  CanceledError: o0,
  isCancel: s0,
  CancelToken: i0,
  VERSION: a0,
  all: c0,
  Cancel: l0,
  isAxiosError: u0,
  spread: f0,
  toFormData: d0,
  AxiosHeaders: p0,
  HttpStatusCode: h0,
  formToJSON: m0,
  getAdapter: g0,
  mergeConfig: y0
} = ye;
function yc(e, t) {
  let r;
  return function(...n) {
    clearTimeout(r), r = setTimeout(() => e.apply(this, n), t);
  };
}
function Ve(e, t) {
  return document.dispatchEvent(new CustomEvent(`inertia:${e}`, t));
}
var vc = (e) => Ve("before", { cancelable: !0, detail: { visit: e } }), zv = (e) => Ve("error", { detail: { errors: e } }), Wv = (e) => Ve("exception", { cancelable: !0, detail: { exception: e } }), Vv = (e) => Ve("finish", { detail: { visit: e } }), Gv = (e) => Ve("invalid", { cancelable: !0, detail: { response: e } }), Ar = (e) => Ve("navigate", { detail: { page: e } }), Kv = (e) => Ve("progress", { detail: { progress: e } }), Jv = (e) => Ve("start", { detail: { visit: e } }), Xv = (e) => Ve("success", { detail: { page: e } }), Yv = (e, t) => Ve("prefetched", { detail: { fetchedAt: Date.now(), response: e.data, visit: t } }), Qv = (e) => Ve("prefetching", { detail: { visit: e } }), Ce = class {
  static set(e, t) {
    typeof window < "u" && window.sessionStorage.setItem(e, JSON.stringify(t));
  }
  static get(e) {
    if (typeof window < "u")
      return JSON.parse(window.sessionStorage.getItem(e) || "null");
  }
  static merge(e, t) {
    const r = this.get(e);
    r === null ? this.set(e, t) : this.set(e, { ...r, ...t });
  }
  static remove(e) {
    typeof window < "u" && window.sessionStorage.removeItem(e);
  }
  static removeNested(e, t) {
    const r = this.get(e);
    r !== null && (delete r[t], this.set(e, r));
  }
  static exists(e) {
    try {
      return this.get(e) !== null;
    } catch {
      return !1;
    }
  }
  static clear() {
    typeof window < "u" && window.sessionStorage.clear();
  }
};
Ce.locationVisitKey = "inertiaLocationVisit";
var Zv = async (e) => {
  if (typeof window > "u")
    throw new Error("Unable to encrypt history");
  const t = uu(), r = await fu(), n = await sb(r);
  if (!n)
    throw new Error("Unable to encrypt history");
  return await tb(t, n, e);
}, Zt = {
  key: "historyKey",
  iv: "historyIv"
}, eb = async (e) => {
  const t = uu(), r = await fu();
  if (!r)
    throw new Error("Unable to decrypt history");
  return await rb(t, r, e);
}, tb = async (e, t, r) => {
  if (typeof window > "u")
    throw new Error("Unable to encrypt history");
  if (typeof window.crypto.subtle > "u")
    return console.warn("Encryption is not supported in this environment. SSL is required."), Promise.resolve(r);
  const n = new TextEncoder(), o = JSON.stringify(r), s = new Uint8Array(o.length * 3), i = n.encodeInto(o, s);
  return window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: e
    },
    t,
    s.subarray(0, i.written)
  );
}, rb = async (e, t, r) => {
  if (typeof window.crypto.subtle > "u")
    return console.warn("Decryption is not supported in this environment. SSL is required."), Promise.resolve(r);
  const n = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: e
    },
    t,
    r
  );
  return JSON.parse(new TextDecoder().decode(n));
}, uu = () => {
  const e = Ce.get(Zt.iv);
  if (e)
    return new Uint8Array(e);
  const t = window.crypto.getRandomValues(new Uint8Array(12));
  return Ce.set(Zt.iv, Array.from(t)), t;
}, nb = async () => typeof window.crypto.subtle > "u" ? (console.warn("Encryption is not supported in this environment. SSL is required."), Promise.resolve(null)) : window.crypto.subtle.generateKey(
  {
    name: "AES-GCM",
    length: 256
  },
  !0,
  ["encrypt", "decrypt"]
), ob = async (e) => {
  if (typeof window.crypto.subtle > "u")
    return console.warn("Encryption is not supported in this environment. SSL is required."), Promise.resolve();
  const t = await window.crypto.subtle.exportKey("raw", e);
  Ce.set(Zt.key, Array.from(new Uint8Array(t)));
}, sb = async (e) => {
  if (e)
    return e;
  const t = await nb();
  return t ? (await ob(t), t) : null;
}, fu = async () => {
  const e = Ce.get(Zt.key);
  return e ? await window.crypto.subtle.importKey(
    "raw",
    new Uint8Array(e),
    {
      name: "AES-GCM",
      length: 256
    },
    !0,
    ["encrypt", "decrypt"]
  ) : null;
}, qe = class {
  static save() {
    ce.saveScrollPositions(
      Array.from(this.regions()).map((e) => ({
        top: e.scrollTop,
        left: e.scrollLeft
      }))
    );
  }
  static regions() {
    return document.querySelectorAll("[scroll-region]");
  }
  static reset() {
    const e = typeof window < "u" ? window.location.hash : null;
    e || window.scrollTo(0, 0), this.regions().forEach((t) => {
      typeof t.scrollTo == "function" ? t.scrollTo(0, 0) : (t.scrollTop = 0, t.scrollLeft = 0);
    }), this.save(), e && setTimeout(() => {
      const t = document.getElementById(e.slice(1));
      t ? t.scrollIntoView() : window.scrollTo(0, 0);
    });
  }
  static restore(e) {
    this.restoreDocument(), this.regions().forEach((t, r) => {
      const n = e[r];
      n && (typeof t.scrollTo == "function" ? t.scrollTo(n.left, n.top) : (t.scrollTop = n.top, t.scrollLeft = n.left));
    });
  }
  static restoreDocument() {
    const e = ce.getDocumentScrollPosition();
    typeof window < "u" && window.scrollTo(e.left, e.top);
  }
  static onScroll(e) {
    const t = e.target;
    typeof t.hasAttribute == "function" && t.hasAttribute("scroll-region") && this.save();
  }
  static onWindowScroll() {
    ce.saveDocumentScrollPosition({
      top: window.scrollY,
      left: window.scrollX
    });
  }
};
function Ps(e) {
  return e instanceof File || e instanceof Blob || e instanceof FileList && e.length > 0 || e instanceof FormData && Array.from(e.values()).some((t) => Ps(t)) || typeof e == "object" && e !== null && Object.values(e).some((t) => Ps(t));
}
var As = (e) => e instanceof FormData;
function du(e, t = new FormData(), r = null) {
  e = e || {};
  for (const n in e)
    Object.prototype.hasOwnProperty.call(e, n) && hu(t, pu(r, n), e[n]);
  return t;
}
function pu(e, t) {
  return e ? e + "[" + t + "]" : t;
}
function hu(e, t, r) {
  if (Array.isArray(r))
    return Array.from(r.keys()).forEach((n) => hu(e, pu(t, n.toString()), r[n]));
  if (r instanceof Date)
    return e.append(t, r.toISOString());
  if (r instanceof File)
    return e.append(t, r, r.name);
  if (r instanceof Blob)
    return e.append(t, r);
  if (typeof r == "boolean")
    return e.append(t, r ? "1" : "0");
  if (typeof r == "string")
    return e.append(t, r);
  if (typeof r == "number")
    return e.append(t, `${r}`);
  if (r == null)
    return e.append(t, "");
  du(r, e, t);
}
function vt(e) {
  return new URL(e.toString(), typeof window > "u" ? void 0 : window.location.toString());
}
var ib = (e, t, r, n, o) => {
  let s = typeof e == "string" ? vt(e) : e;
  if ((Ps(t) || n) && !As(t) && (t = du(t)), As(t))
    return [s, t];
  const [i, a] = ii(r, s, t, o);
  return [vt(i), a];
};
function ii(e, t, r, n = "brackets") {
  const o = e === "get" && !As(r) && Object.keys(r).length > 0, s = /^[a-z][a-z0-9+.-]*:\/\//i.test(t.toString()), i = s || t.toString().startsWith("/") || t.toString() === "", a = !i && !t.toString().startsWith("#") && !t.toString().startsWith("?"), l = /^[.]{1,2}([/]|$)/.test(t.toString()), c = t.toString().includes("?") || o, u = t.toString().includes("#"), f = new URL(t.toString(), typeof window > "u" ? "http://localhost" : window.location.toString());
  if (o) {
    const m = { ignoreQueryPrefix: !0, parseArrays: !1 };
    f.search = Na.stringify(
      { ...Na.parse(f.search, m), ...r },
      {
        encodeValuesOnly: !0,
        arrayFormat: n
      }
    );
  }
  return [
    [
      s ? `${f.protocol}//${f.host}` : "",
      i ? f.pathname : "",
      a ? f.pathname.substring(l ? 0 : 1) : "",
      c ? f.search : "",
      u ? f.hash : ""
    ].join(""),
    o ? {} : r
  ];
}
function mn(e) {
  return e = new URL(e.href), e.hash = "", e;
}
var bc = (e, t) => {
  e.hash && !t.hash && mn(e).href === t.href && (t.hash = e.hash);
}, Cs = (e, t) => mn(e).href === mn(t).href;
function _t(e) {
  return e !== null && typeof e == "object" && e !== void 0 && "url" in e && "method" in e;
}
var ab = class {
  constructor() {
    this.componentId = {}, this.listeners = [], this.isFirstPageLoad = !0, this.cleared = !1, this.pendingDeferredProps = null;
  }
  init({ initialPage: e, swapComponent: t, resolveComponent: r }) {
    return this.page = e, this.swapComponent = t, this.resolveComponent = r, this;
  }
  set(e, {
    replace: t = !1,
    preserveScroll: r = !1,
    preserveState: n = !1
  } = {}) {
    Object.keys(e.deferredProps || {}).length && (this.pendingDeferredProps = {
      deferredProps: e.deferredProps,
      component: e.component,
      url: e.url
    }), this.componentId = {};
    const o = this.componentId;
    return e.clearHistory && ce.clear(), this.resolve(e.component).then((s) => {
      if (o !== this.componentId)
        return;
      e.rememberedState ?? (e.rememberedState = {});
      const i = typeof window < "u" ? window.location : new URL(e.url);
      return t = t || Cs(vt(e.url), i), new Promise((a) => {
        t ? ce.replaceState(e, () => a(null)) : ce.pushState(e, () => a(null));
      }).then(() => {
        const a = !this.isTheSame(e);
        return this.page = e, this.cleared = !1, a && this.fireEventsFor("newComponent"), this.isFirstPageLoad && this.fireEventsFor("firstLoad"), this.isFirstPageLoad = !1, this.swap({ component: s, page: e, preserveState: n }).then(() => {
          r || qe.reset(), this.pendingDeferredProps && this.pendingDeferredProps.component === e.component && this.pendingDeferredProps.url === e.url && Tt.fireInternalEvent("loadDeferredProps", this.pendingDeferredProps.deferredProps), this.pendingDeferredProps = null, t || Ar(e);
        });
      });
    });
  }
  setQuietly(e, {
    preserveState: t = !1
  } = {}) {
    return this.resolve(e.component).then((r) => (this.page = e, this.cleared = !1, ce.setCurrent(e), this.swap({ component: r, page: e, preserveState: t })));
  }
  clear() {
    this.cleared = !0;
  }
  isCleared() {
    return this.cleared;
  }
  get() {
    return this.page;
  }
  merge(e) {
    this.page = { ...this.page, ...e };
  }
  setUrlHash(e) {
    this.page.url.includes(e) || (this.page.url += e);
  }
  remember(e) {
    this.page.rememberedState = e;
  }
  swap({
    component: e,
    page: t,
    preserveState: r
  }) {
    return this.swapComponent({ component: e, page: t, preserveState: r });
  }
  resolve(e) {
    return Promise.resolve(this.resolveComponent(e));
  }
  isTheSame(e) {
    return this.page.component === e.component;
  }
  on(e, t) {
    return this.listeners.push({ event: e, callback: t }), () => {
      this.listeners = this.listeners.filter((r) => r.event !== e && r.callback !== t);
    };
  }
  fireEventsFor(e) {
    this.listeners.filter((t) => t.event === e).forEach((t) => t.callback());
  }
}, te = new ab(), mu = class {
  constructor() {
    this.items = [], this.processingPromise = null;
  }
  add(e) {
    return this.items.push(e), this.process();
  }
  process() {
    return this.processingPromise ?? (this.processingPromise = this.processNext().finally(() => {
      this.processingPromise = null;
    })), this.processingPromise;
  }
  processNext() {
    const e = this.items.shift();
    return e ? Promise.resolve(e()).then(() => this.processNext()) : Promise.resolve();
  }
}, xr = typeof window > "u", vr = new mu(), wc = !xr && /CriOS/.test(window.navigator.userAgent), cb = class {
  constructor() {
    this.rememberedState = "rememberedState", this.scrollRegions = "scrollRegions", this.preserveUrl = !1, this.current = {}, this.initialState = null;
  }
  remember(e, t) {
    var r;
    this.replaceState({
      ...te.get(),
      rememberedState: {
        ...((r = te.get()) == null ? void 0 : r.rememberedState) ?? {},
        [t]: e
      }
    });
  }
  restore(e) {
    var t, r, n;
    if (!xr)
      return this.current[this.rememberedState] ? (t = this.current[this.rememberedState]) == null ? void 0 : t[e] : (n = (r = this.initialState) == null ? void 0 : r[this.rememberedState]) == null ? void 0 : n[e];
  }
  pushState(e, t = null) {
    if (!xr) {
      if (this.preserveUrl) {
        t && t();
        return;
      }
      this.current = e, vr.add(() => this.getPageData(e).then((r) => {
        const n = () => {
          this.doPushState({ page: r }, e.url), t && t();
        };
        wc ? setTimeout(n) : n();
      }));
    }
  }
  getPageData(e) {
    return new Promise((t) => e.encryptHistory ? Zv(e).then(t) : t(e));
  }
  processQueue() {
    return vr.process();
  }
  decrypt(e = null) {
    var r;
    if (xr)
      return Promise.resolve(e ?? te.get());
    const t = e ?? ((r = window.history.state) == null ? void 0 : r.page);
    return this.decryptPageData(t).then((n) => {
      if (!n)
        throw new Error("Unable to decrypt history");
      return this.initialState === null ? this.initialState = n ?? void 0 : this.current = n ?? {}, n;
    });
  }
  decryptPageData(e) {
    return e instanceof ArrayBuffer ? eb(e) : Promise.resolve(e);
  }
  saveScrollPositions(e) {
    vr.add(() => Promise.resolve().then(() => {
      var t;
      (t = window.history.state) != null && t.page && this.doReplaceState({
        page: window.history.state.page,
        scrollRegions: e
      });
    }));
  }
  saveDocumentScrollPosition(e) {
    vr.add(() => Promise.resolve().then(() => {
      var t;
      (t = window.history.state) != null && t.page && this.doReplaceState({
        page: window.history.state.page,
        documentScrollPosition: e
      });
    }));
  }
  getScrollRegions() {
    var e;
    return ((e = window.history.state) == null ? void 0 : e.scrollRegions) || [];
  }
  getDocumentScrollPosition() {
    var e;
    return ((e = window.history.state) == null ? void 0 : e.documentScrollPosition) || { top: 0, left: 0 };
  }
  replaceState(e, t = null) {
    if (te.merge(e), !xr) {
      if (this.preserveUrl) {
        t && t();
        return;
      }
      this.current = e, vr.add(() => this.getPageData(e).then((r) => {
        const n = () => {
          this.doReplaceState({ page: r }, e.url), t && t();
        };
        wc ? setTimeout(n) : n();
      }));
    }
  }
  doReplaceState(e, t) {
    var r, n;
    window.history.replaceState(
      {
        ...e,
        scrollRegions: e.scrollRegions ?? ((r = window.history.state) == null ? void 0 : r.scrollRegions),
        documentScrollPosition: e.documentScrollPosition ?? ((n = window.history.state) == null ? void 0 : n.documentScrollPosition)
      },
      "",
      t
    );
  }
  doPushState(e, t) {
    window.history.pushState(e, "", t);
  }
  getState(e, t) {
    var r;
    return ((r = this.current) == null ? void 0 : r[e]) ?? t;
  }
  deleteState(e) {
    this.current[e] !== void 0 && (delete this.current[e], this.replaceState(this.current));
  }
  hasAnyState() {
    return !!this.getAllState();
  }
  clear() {
    Ce.remove(Zt.key), Ce.remove(Zt.iv);
  }
  setCurrent(e) {
    this.current = e;
  }
  isValidState(e) {
    return !!e.page;
  }
  getAllState() {
    return this.current;
  }
};
typeof window < "u" && window.history.scrollRestoration && (window.history.scrollRestoration = "manual");
var ce = new cb(), lb = class {
  constructor() {
    this.internalListeners = [];
  }
  init() {
    typeof window < "u" && (window.addEventListener("popstate", this.handlePopstateEvent.bind(this)), window.addEventListener("scroll", yc(qe.onWindowScroll.bind(qe), 100), !0)), typeof document < "u" && document.addEventListener("scroll", yc(qe.onScroll.bind(qe), 100), !0);
  }
  onGlobalEvent(e, t) {
    const r = (n) => {
      const o = t(n);
      n.cancelable && !n.defaultPrevented && o === !1 && n.preventDefault();
    };
    return this.registerListener(`inertia:${e}`, r);
  }
  on(e, t) {
    return this.internalListeners.push({ event: e, listener: t }), () => {
      this.internalListeners = this.internalListeners.filter((r) => r.listener !== t);
    };
  }
  onMissingHistoryItem() {
    te.clear(), this.fireInternalEvent("missingHistoryItem");
  }
  fireInternalEvent(e, ...t) {
    this.internalListeners.filter((r) => r.event === e).forEach((r) => r.listener(...t));
  }
  registerListener(e, t) {
    return document.addEventListener(e, t), () => document.removeEventListener(e, t);
  }
  handlePopstateEvent(e) {
    const t = e.state || null;
    if (t === null) {
      const r = vt(te.get().url);
      r.hash = window.location.hash, ce.replaceState({ ...te.get(), url: r.href }), qe.reset();
      return;
    }
    if (!ce.isValidState(t))
      return this.onMissingHistoryItem();
    ce.decrypt(t.page).then((r) => {
      if (te.get().version !== r.version) {
        this.onMissingHistoryItem();
        return;
      }
      Ue.cancelAll(), te.setQuietly(r, { preserveState: !1 }).then(() => {
        window.requestAnimationFrame(() => {
          qe.restore(ce.getScrollRegions());
        }), Ar(te.get());
      });
    }).catch(() => {
      this.onMissingHistoryItem();
    });
  }
}, Tt = new lb(), ub = class {
  constructor() {
    this.type = this.resolveType();
  }
  resolveType() {
    return typeof window > "u" ? "navigate" : window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("navigation").length > 0 ? window.performance.getEntriesByType("navigation")[0].type : "navigate";
  }
  get() {
    return this.type;
  }
  isBackForward() {
    return this.type === "back_forward";
  }
  isReload() {
    return this.type === "reload";
  }
}, es = new ub(), fb = class {
  static handle() {
    this.clearRememberedStateOnReload(), [this.handleBackForward, this.handleLocation, this.handleDefault].find((t) => t.bind(this)());
  }
  static clearRememberedStateOnReload() {
    es.isReload() && ce.deleteState(ce.rememberedState);
  }
  static handleBackForward() {
    if (!es.isBackForward() || !ce.hasAnyState())
      return !1;
    const e = ce.getScrollRegions();
    return ce.decrypt().then((t) => {
      te.set(t, { preserveScroll: !0, preserveState: !0 }).then(() => {
        qe.restore(e), Ar(te.get());
      });
    }).catch(() => {
      Tt.onMissingHistoryItem();
    }), !0;
  }
  /**
   * @link https://inertiajs.com/redirects#external-redirects
   */
  static handleLocation() {
    if (!Ce.exists(Ce.locationVisitKey))
      return !1;
    const e = Ce.get(Ce.locationVisitKey) || {};
    return Ce.remove(Ce.locationVisitKey), typeof window < "u" && te.setUrlHash(window.location.hash), ce.decrypt(te.get()).then(() => {
      const t = ce.getState(ce.rememberedState, {}), r = ce.getScrollRegions();
      te.remember(t), te.set(te.get(), {
        preserveScroll: e.preserveScroll,
        preserveState: !0
      }).then(() => {
        e.preserveScroll && qe.restore(r), Ar(te.get());
      });
    }).catch(() => {
      Tt.onMissingHistoryItem();
    }), !0;
  }
  static handleDefault() {
    typeof window < "u" && te.setUrlHash(window.location.hash), te.set(te.get(), { preserveScroll: !0, preserveState: !0 }).then(() => {
      es.isReload() && qe.restore(ce.getScrollRegions()), Ar(te.get());
    });
  }
}, db = class {
  constructor(e, t, r) {
    this.id = null, this.throttle = !1, this.keepAlive = !1, this.cbCount = 0, this.keepAlive = r.keepAlive ?? !1, this.cb = t, this.interval = e, (r.autoStart ?? !0) && this.start();
  }
  stop() {
    this.id && clearInterval(this.id);
  }
  start() {
    typeof window > "u" || (this.stop(), this.id = window.setInterval(() => {
      (!this.throttle || this.cbCount % 10 === 0) && this.cb(), this.throttle && this.cbCount++;
    }, this.interval));
  }
  isInBackground(e) {
    this.throttle = this.keepAlive ? !1 : e, this.throttle && (this.cbCount = 0);
  }
}, pb = class {
  constructor() {
    this.polls = [], this.setupVisibilityListener();
  }
  add(e, t, r) {
    const n = new db(e, t, r);
    return this.polls.push(n), {
      stop: () => n.stop(),
      start: () => n.start()
    };
  }
  clear() {
    this.polls.forEach((e) => e.stop()), this.polls = [];
  }
  setupVisibilityListener() {
    typeof document > "u" || document.addEventListener(
      "visibilitychange",
      () => {
        this.polls.forEach((e) => e.isInBackground(document.hidden));
      },
      !1
    );
  }
}, hb = new pb(), gu = (e, t, r) => {
  if (e === t)
    return !0;
  for (const n in e)
    if (!r.includes(n) && e[n] !== t[n] && !mb(e[n], t[n]))
      return !1;
  return !0;
}, mb = (e, t) => {
  switch (typeof e) {
    case "object":
      return gu(e, t, []);
    case "function":
      return e.toString() === t.toString();
    default:
      return e === t;
  }
}, gb = {
  ms: 1,
  s: 1e3,
  m: 1e3 * 60,
  h: 1e3 * 60 * 60,
  d: 1e3 * 60 * 60 * 24
}, xc = (e) => {
  if (typeof e == "number")
    return e;
  for (const [t, r] of Object.entries(gb))
    if (e.endsWith(t))
      return parseFloat(e) * r;
  return parseInt(e);
}, yb = class {
  constructor() {
    this.cached = [], this.inFlightRequests = [], this.removalTimers = [], this.currentUseId = null;
  }
  add(e, t, { cacheFor: r, cacheTags: n }) {
    if (this.findInFlight(e))
      return Promise.resolve();
    const s = this.findCached(e);
    if (!e.fresh && s && s.staleTimestamp > Date.now())
      return Promise.resolve();
    const [i, a] = this.extractStaleValues(r), l = new Promise((c, u) => {
      t({
        ...e,
        onCancel: () => {
          this.remove(e), e.onCancel(), u();
        },
        onError: (f) => {
          this.remove(e), e.onError(f), u();
        },
        onPrefetching(f) {
          e.onPrefetching(f);
        },
        onPrefetched(f, m) {
          e.onPrefetched(f, m);
        },
        onPrefetchResponse(f) {
          c(f);
        },
        onPrefetchError(f) {
          ot.removeFromInFlight(e), u(f);
        }
      });
    }).then((c) => (this.remove(e), this.cached.push({
      params: { ...e },
      staleTimestamp: Date.now() + i,
      response: l,
      singleUse: a === 0,
      timestamp: Date.now(),
      inFlight: !1,
      tags: Array.isArray(n) ? n : [n]
    }), this.scheduleForRemoval(e, a), this.removeFromInFlight(e), c.handlePrefetch(), c));
    return this.inFlightRequests.push({
      params: { ...e },
      response: l,
      staleTimestamp: null,
      inFlight: !0
    }), l;
  }
  removeAll() {
    this.cached = [], this.removalTimers.forEach((e) => {
      clearTimeout(e.timer);
    }), this.removalTimers = [];
  }
  removeByTags(e) {
    this.cached = this.cached.filter((t) => !t.tags.some((r) => e.includes(r)));
  }
  remove(e) {
    this.cached = this.cached.filter((t) => !this.paramsAreEqual(t.params, e)), this.clearTimer(e);
  }
  removeFromInFlight(e) {
    this.inFlightRequests = this.inFlightRequests.filter((t) => !this.paramsAreEqual(t.params, e));
  }
  extractStaleValues(e) {
    const [t, r] = this.cacheForToStaleAndExpires(e);
    return [xc(t), xc(r)];
  }
  cacheForToStaleAndExpires(e) {
    if (!Array.isArray(e))
      return [e, e];
    switch (e.length) {
      case 0:
        return [0, 0];
      case 1:
        return [e[0], e[0]];
      default:
        return [e[0], e[1]];
    }
  }
  clearTimer(e) {
    const t = this.removalTimers.find((r) => this.paramsAreEqual(r.params, e));
    t && (clearTimeout(t.timer), this.removalTimers = this.removalTimers.filter((r) => r !== t));
  }
  scheduleForRemoval(e, t) {
    if (!(typeof window > "u") && (this.clearTimer(e), t > 0)) {
      const r = window.setTimeout(() => this.remove(e), t);
      this.removalTimers.push({
        params: e,
        timer: r
      });
    }
  }
  get(e) {
    return this.findCached(e) || this.findInFlight(e);
  }
  use(e, t) {
    const r = `${t.url.pathname}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    return this.currentUseId = r, e.response.then((n) => {
      if (this.currentUseId === r)
        return n.mergeParams({ ...t, onPrefetched: () => {
        } }), this.removeSingleUseItems(t), n.handle();
    });
  }
  removeSingleUseItems(e) {
    this.cached = this.cached.filter((t) => this.paramsAreEqual(t.params, e) ? !t.singleUse : !0);
  }
  findCached(e) {
    return this.cached.find((t) => this.paramsAreEqual(t.params, e)) || null;
  }
  findInFlight(e) {
    return this.inFlightRequests.find((t) => this.paramsAreEqual(t.params, e)) || null;
  }
  withoutPurposePrefetchHeader(e) {
    const t = wr(e);
    return t.headers.Purpose === "prefetch" && delete t.headers.Purpose, t;
  }
  paramsAreEqual(e, t) {
    return gu(
      this.withoutPurposePrefetchHeader(e),
      this.withoutPurposePrefetchHeader(t),
      [
        "showProgress",
        "replace",
        "prefetch",
        "onBefore",
        "onStart",
        "onProgress",
        "onFinish",
        "onCancel",
        "onSuccess",
        "onError",
        "onPrefetched",
        "onCancelToken",
        "onPrefetching",
        "async"
      ]
    );
  }
}, ot = new yb(), vb = class yu {
  constructor(t) {
    if (this.callbacks = [], !t.prefetch)
      this.params = t;
    else {
      const r = {
        onBefore: this.wrapCallback(t, "onBefore"),
        onStart: this.wrapCallback(t, "onStart"),
        onProgress: this.wrapCallback(t, "onProgress"),
        onFinish: this.wrapCallback(t, "onFinish"),
        onCancel: this.wrapCallback(t, "onCancel"),
        onSuccess: this.wrapCallback(t, "onSuccess"),
        onError: this.wrapCallback(t, "onError"),
        onCancelToken: this.wrapCallback(t, "onCancelToken"),
        onPrefetched: this.wrapCallback(t, "onPrefetched"),
        onPrefetching: this.wrapCallback(t, "onPrefetching")
      };
      this.params = {
        ...t,
        ...r,
        onPrefetchResponse: t.onPrefetchResponse || (() => {
        }),
        onPrefetchError: t.onPrefetchError || (() => {
        })
      };
    }
  }
  static create(t) {
    return new yu(t);
  }
  data() {
    return this.params.method === "get" ? null : this.params.data;
  }
  queryParams() {
    return this.params.method === "get" ? this.params.data : {};
  }
  isPartial() {
    return this.params.only.length > 0 || this.params.except.length > 0 || this.params.reset.length > 0;
  }
  onCancelToken(t) {
    this.params.onCancelToken({
      cancel: t
    });
  }
  markAsFinished() {
    this.params.completed = !0, this.params.cancelled = !1, this.params.interrupted = !1;
  }
  markAsCancelled({ cancelled: t = !0, interrupted: r = !1 }) {
    this.params.onCancel(), this.params.completed = !1, this.params.cancelled = t, this.params.interrupted = r;
  }
  wasCancelledAtAll() {
    return this.params.cancelled || this.params.interrupted;
  }
  onFinish() {
    this.params.onFinish(this.params);
  }
  onStart() {
    this.params.onStart(this.params);
  }
  onPrefetching() {
    this.params.onPrefetching(this.params);
  }
  onPrefetchResponse(t) {
    this.params.onPrefetchResponse && this.params.onPrefetchResponse(t);
  }
  onPrefetchError(t) {
    this.params.onPrefetchError && this.params.onPrefetchError(t);
  }
  all() {
    return this.params;
  }
  headers() {
    const t = {
      ...this.params.headers
    };
    this.isPartial() && (t["X-Inertia-Partial-Component"] = te.get().component);
    const r = this.params.only.concat(this.params.reset);
    return r.length > 0 && (t["X-Inertia-Partial-Data"] = r.join(",")), this.params.except.length > 0 && (t["X-Inertia-Partial-Except"] = this.params.except.join(",")), this.params.reset.length > 0 && (t["X-Inertia-Reset"] = this.params.reset.join(",")), this.params.errorBag && this.params.errorBag.length > 0 && (t["X-Inertia-Error-Bag"] = this.params.errorBag), t;
  }
  setPreserveOptions(t) {
    this.params.preserveScroll = this.resolvePreserveOption(this.params.preserveScroll, t), this.params.preserveState = this.resolvePreserveOption(this.params.preserveState, t);
  }
  runCallbacks() {
    this.callbacks.forEach(({ name: t, args: r }) => {
      this.params[t](...r);
    });
  }
  merge(t) {
    this.params = {
      ...this.params,
      ...t
    };
  }
  wrapCallback(t, r) {
    return (...n) => {
      this.recordCallback(r, n), t[r](...n);
    };
  }
  recordCallback(t, r) {
    this.callbacks.push({ name: t, args: r });
  }
  resolvePreserveOption(t, r) {
    return typeof t == "function" ? t(r) : t === "errors" ? Object.keys(r.props.errors || {}).length > 0 : t;
  }
}, bb = {
  modal: null,
  listener: null,
  show(e) {
    typeof e == "object" && (e = `All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.<hr>${JSON.stringify(
      e
    )}`);
    const t = document.createElement("html");
    t.innerHTML = e, t.querySelectorAll("a").forEach((n) => n.setAttribute("target", "_top")), this.modal = document.createElement("div"), this.modal.style.position = "fixed", this.modal.style.width = "100vw", this.modal.style.height = "100vh", this.modal.style.padding = "50px", this.modal.style.boxSizing = "border-box", this.modal.style.backgroundColor = "rgba(0, 0, 0, .6)", this.modal.style.zIndex = 2e5, this.modal.addEventListener("click", () => this.hide());
    const r = document.createElement("iframe");
    if (r.style.backgroundColor = "white", r.style.borderRadius = "5px", r.style.width = "100%", r.style.height = "100%", this.modal.appendChild(r), document.body.prepend(this.modal), document.body.style.overflow = "hidden", !r.contentWindow)
      throw new Error("iframe not yet ready.");
    r.contentWindow.document.open(), r.contentWindow.document.write(t.outerHTML), r.contentWindow.document.close(), this.listener = this.hideOnEscape.bind(this), document.addEventListener("keydown", this.listener);
  },
  hide() {
    this.modal.outerHTML = "", this.modal = null, document.body.style.overflow = "visible", document.removeEventListener("keydown", this.listener);
  },
  hideOnEscape(e) {
    e.keyCode === 27 && this.hide();
  }
}, wb = new mu(), Sc = class vu {
  constructor(t, r, n) {
    this.requestParams = t, this.response = r, this.originatingPage = n;
  }
  static create(t, r, n) {
    return new vu(t, r, n);
  }
  async handlePrefetch() {
    Cs(this.requestParams.all().url, window.location) && this.handle();
  }
  async handle() {
    return wb.add(() => this.process());
  }
  async process() {
    if (this.requestParams.all().prefetch)
      return this.requestParams.all().prefetch = !1, this.requestParams.all().onPrefetched(this.response, this.requestParams.all()), Yv(this.response, this.requestParams.all()), Promise.resolve();
    if (this.requestParams.runCallbacks(), !this.isInertiaResponse())
      return this.handleNonInertiaResponse();
    await ce.processQueue(), ce.preserveUrl = this.requestParams.all().preserveUrl, await this.setPage();
    const t = te.get().props.errors || {};
    if (Object.keys(t).length > 0) {
      const r = this.getScopedErrors(t);
      return zv(r), this.requestParams.all().onError(r);
    }
    Ue.flushByCacheTags(this.requestParams.all().invalidateCacheTags || []), Xv(te.get()), await this.requestParams.all().onSuccess(te.get()), ce.preserveUrl = !1;
  }
  mergeParams(t) {
    this.requestParams.merge(t);
  }
  async handleNonInertiaResponse() {
    if (this.isLocationVisit()) {
      const r = vt(this.getHeader("x-inertia-location"));
      return bc(this.requestParams.all().url, r), this.locationVisit(r);
    }
    const t = {
      ...this.response,
      data: this.getDataFromResponse(this.response.data)
    };
    if (Gv(t))
      return bb.show(t.data);
  }
  isInertiaResponse() {
    return this.hasHeader("x-inertia");
  }
  hasStatus(t) {
    return this.response.status === t;
  }
  getHeader(t) {
    return this.response.headers[t];
  }
  hasHeader(t) {
    return this.getHeader(t) !== void 0;
  }
  isLocationVisit() {
    return this.hasStatus(409) && this.hasHeader("x-inertia-location");
  }
  /**
   * @link https://inertiajs.com/redirects#external-redirects
   */
  locationVisit(t) {
    try {
      if (Ce.set(Ce.locationVisitKey, {
        preserveScroll: this.requestParams.all().preserveScroll === !0
      }), typeof window > "u")
        return;
      Cs(window.location, t) ? window.location.reload() : window.location.href = t.href;
    } catch {
      return !1;
    }
  }
  async setPage() {
    const t = this.getDataFromResponse(this.response.data);
    return this.shouldSetPage(t) ? (this.mergeProps(t), await this.setRememberedState(t), this.requestParams.setPreserveOptions(t), t.url = ce.preserveUrl ? te.get().url : this.pageUrl(t), te.set(t, {
      replace: this.requestParams.all().replace,
      preserveScroll: this.requestParams.all().preserveScroll,
      preserveState: this.requestParams.all().preserveState
    })) : Promise.resolve();
  }
  getDataFromResponse(t) {
    if (typeof t != "string")
      return t;
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
  }
  shouldSetPage(t) {
    if (!this.requestParams.all().async || this.originatingPage.component !== t.component)
      return !0;
    if (this.originatingPage.component !== te.get().component)
      return !1;
    const r = vt(this.originatingPage.url), n = vt(te.get().url);
    return r.origin === n.origin && r.pathname === n.pathname;
  }
  pageUrl(t) {
    const r = vt(t.url);
    return bc(this.requestParams.all().url, r), r.pathname + r.search + r.hash;
  }
  mergeProps(t) {
    if (!this.requestParams.isPartial() || t.component !== te.get().component)
      return;
    const r = t.mergeProps || [], n = t.deepMergeProps || [], o = t.matchPropsOn || [];
    r.forEach((s) => {
      const i = t.props[s];
      Array.isArray(i) ? t.props[s] = this.mergeOrMatchItems(
        te.get().props[s] || [],
        i,
        s,
        o
      ) : typeof i == "object" && i !== null && (t.props[s] = {
        ...te.get().props[s] || [],
        ...i
      });
    }), n.forEach((s) => {
      const i = t.props[s], a = te.get().props[s], l = (c, u, f) => Array.isArray(u) ? this.mergeOrMatchItems(c, u, f, o) : typeof u == "object" && u !== null ? Object.keys(u).reduce(
        (m, h) => (m[h] = l(c ? c[h] : void 0, u[h], `${f}.${h}`), m),
        { ...c }
      ) : u;
      t.props[s] = l(a, i, s);
    }), t.props = { ...te.get().props, ...t.props };
  }
  mergeOrMatchItems(t, r, n, o) {
    const s = o.find((c) => c.split(".").slice(0, -1).join(".") === n);
    if (!s)
      return [...Array.isArray(t) ? t : [], ...r];
    const i = s.split(".").pop() || "", a = Array.isArray(t) ? t : [], l = /* @__PURE__ */ new Map();
    return a.forEach((c) => {
      c && typeof c == "object" && i in c ? l.set(c[i], c) : l.set(Symbol(), c);
    }), r.forEach((c) => {
      c && typeof c == "object" && i in c ? l.set(c[i], c) : l.set(Symbol(), c);
    }), Array.from(l.values());
  }
  async setRememberedState(t) {
    const r = await ce.getState(ce.rememberedState, {});
    this.requestParams.all().preserveState && r && t.component === te.get().component && (t.rememberedState = r);
  }
  getScopedErrors(t) {
    return this.requestParams.all().errorBag ? t[this.requestParams.all().errorBag || ""] || {} : t;
  }
}, Ec = class bu {
  constructor(t, r) {
    this.page = r, this.requestHasFinished = !1, this.requestParams = vb.create(t), this.cancelToken = new AbortController();
  }
  static create(t, r) {
    return new bu(t, r);
  }
  async send() {
    this.requestParams.onCancelToken(() => this.cancel({ cancelled: !0 })), Jv(this.requestParams.all()), this.requestParams.onStart(), this.requestParams.all().prefetch && (this.requestParams.onPrefetching(), Qv(this.requestParams.all()));
    const t = this.requestParams.all().prefetch;
    return ye({
      method: this.requestParams.all().method,
      url: mn(this.requestParams.all().url).href,
      data: this.requestParams.data(),
      params: this.requestParams.queryParams(),
      signal: this.cancelToken.signal,
      headers: this.getHeaders(),
      onUploadProgress: this.onProgress.bind(this),
      // Why text? This allows us to delay JSON.parse until we're ready to use the response,
      // helps with performance particularly on large responses + history encryption
      responseType: "text"
    }).then((r) => (this.response = Sc.create(this.requestParams, r, this.page), this.response.handle())).catch((r) => r != null && r.response ? (this.response = Sc.create(this.requestParams, r.response, this.page), this.response.handle()) : Promise.reject(r)).catch((r) => {
      if (!ye.isCancel(r) && Wv(r))
        return t && this.requestParams.onPrefetchError(r), Promise.reject(r);
    }).finally(() => {
      this.finish(), t && this.response && this.requestParams.onPrefetchResponse(this.response);
    });
  }
  finish() {
    this.requestParams.wasCancelledAtAll() || (this.requestParams.markAsFinished(), this.fireFinishEvents());
  }
  fireFinishEvents() {
    this.requestHasFinished || (this.requestHasFinished = !0, Vv(this.requestParams.all()), this.requestParams.onFinish());
  }
  cancel({ cancelled: t = !1, interrupted: r = !1 }) {
    this.requestHasFinished || (this.cancelToken.abort(), this.requestParams.markAsCancelled({ cancelled: t, interrupted: r }), this.fireFinishEvents());
  }
  onProgress(t) {
    this.requestParams.data() instanceof FormData && (t.percentage = t.progress ? Math.round(t.progress * 100) : 0, Kv(t), this.requestParams.all().onProgress(t));
  }
  getHeaders() {
    const t = {
      ...this.requestParams.headers(),
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0
    };
    return te.get().version && (t["X-Inertia-Version"] = te.get().version), t;
  }
}, Pc = class {
  constructor({ maxConcurrent: e, interruptible: t }) {
    this.requests = [], this.maxConcurrent = e, this.interruptible = t;
  }
  send(e) {
    this.requests.push(e), e.send().then(() => {
      this.requests = this.requests.filter((t) => t !== e);
    });
  }
  interruptInFlight() {
    this.cancel({ interrupted: !0 }, !1);
  }
  cancelInFlight() {
    this.cancel({ cancelled: !0 }, !0);
  }
  cancel({ cancelled: e = !1, interrupted: t = !1 } = {}, r) {
    if (!this.shouldCancel(r))
      return;
    const n = this.requests.shift();
    n == null || n.cancel({ interrupted: t, cancelled: e });
  }
  shouldCancel(e) {
    return e ? !0 : this.interruptible && this.requests.length >= this.maxConcurrent;
  }
}, xb = class {
  constructor() {
    this.syncRequestStream = new Pc({
      maxConcurrent: 1,
      interruptible: !0
    }), this.asyncRequestStream = new Pc({
      maxConcurrent: 1 / 0,
      interruptible: !1
    });
  }
  init({ initialPage: e, resolveComponent: t, swapComponent: r }) {
    te.init({
      initialPage: e,
      resolveComponent: t,
      swapComponent: r
    }), fb.handle(), Tt.init(), Tt.on("missingHistoryItem", () => {
      typeof window < "u" && this.visit(window.location.href, { preserveState: !0, preserveScroll: !0, replace: !0 });
    }), Tt.on("loadDeferredProps", (n) => {
      this.loadDeferredProps(n);
    });
  }
  get(e, t = {}, r = {}) {
    return this.visit(e, { ...r, method: "get", data: t });
  }
  post(e, t = {}, r = {}) {
    return this.visit(e, { preserveState: !0, ...r, method: "post", data: t });
  }
  put(e, t = {}, r = {}) {
    return this.visit(e, { preserveState: !0, ...r, method: "put", data: t });
  }
  patch(e, t = {}, r = {}) {
    return this.visit(e, { preserveState: !0, ...r, method: "patch", data: t });
  }
  delete(e, t = {}) {
    return this.visit(e, { preserveState: !0, ...t, method: "delete" });
  }
  reload(e = {}) {
    if (!(typeof window > "u"))
      return this.visit(window.location.href, {
        ...e,
        preserveScroll: !0,
        preserveState: !0,
        async: !0,
        headers: {
          ...e.headers || {},
          "Cache-Control": "no-cache"
        }
      });
  }
  remember(e, t = "default") {
    ce.remember(e, t);
  }
  restore(e = "default") {
    return ce.restore(e);
  }
  on(e, t) {
    return typeof window > "u" ? () => {
    } : Tt.onGlobalEvent(e, t);
  }
  cancel() {
    this.syncRequestStream.cancelInFlight();
  }
  cancelAll() {
    this.asyncRequestStream.cancelInFlight(), this.syncRequestStream.cancelInFlight();
  }
  poll(e, t = {}, r = {}) {
    return hb.add(e, () => this.reload(t), {
      autoStart: r.autoStart ?? !0,
      keepAlive: r.keepAlive ?? !1
    });
  }
  visit(e, t = {}) {
    const r = this.getPendingVisit(e, {
      ...t,
      showProgress: t.showProgress ?? !t.async
    }), n = this.getVisitEvents(t);
    if (n.onBefore(r) === !1 || !vc(r))
      return;
    const o = r.async ? this.asyncRequestStream : this.syncRequestStream;
    o.interruptInFlight(), !te.isCleared() && !r.preserveUrl && qe.save();
    const s = {
      ...r,
      ...n
    }, i = ot.get(s);
    i ? (Pb(i.inFlight), ot.use(i, s)) : o.send(Ec.create(s, te.get()));
  }
  getCached(e, t = {}) {
    return ot.findCached(this.getPrefetchParams(e, t));
  }
  flush(e, t = {}) {
    ot.remove(this.getPrefetchParams(e, t));
  }
  flushAll() {
    ot.removeAll();
  }
  flushByCacheTags(e) {
    ot.removeByTags(Array.isArray(e) ? e : [e]);
  }
  getPrefetching(e, t = {}) {
    return ot.findInFlight(this.getPrefetchParams(e, t));
  }
  prefetch(e, t = {}, r = {}) {
    if ((t.method ?? (_t(e) ? e.method : "get")) !== "get")
      throw new Error("Prefetch requests must use the GET method");
    const o = this.getPendingVisit(e, {
      ...t,
      async: !0,
      showProgress: !1,
      prefetch: !0
    }), s = o.url.origin + o.url.pathname + o.url.search, i = window.location.origin + window.location.pathname + window.location.search;
    if (s === i)
      return;
    const a = this.getVisitEvents(t);
    if (a.onBefore(o) === !1 || !vc(o))
      return;
    this.asyncRequestStream.interruptInFlight();
    const l = {
      ...o,
      ...a
    };
    new Promise((u) => {
      const f = () => {
        te.get() ? u() : setTimeout(f, 50);
      };
      f();
    }).then(() => {
      ot.add(
        l,
        (u) => {
          this.asyncRequestStream.send(Ec.create(u, te.get()));
        },
        {
          cacheFor: 3e4,
          cacheTags: [],
          ...r
        }
      );
    });
  }
  clearHistory() {
    ce.clear();
  }
  decryptHistory() {
    return ce.decrypt();
  }
  resolveComponent(e) {
    return te.resolve(e);
  }
  replace(e) {
    this.clientVisit(e, { replace: !0 });
  }
  push(e) {
    this.clientVisit(e);
  }
  clientVisit(e, { replace: t = !1 } = {}) {
    const r = te.get(), n = typeof e.props == "function" ? e.props(r.props) : e.props ?? r.props, { onError: o, onFinish: s, onSuccess: i, ...a } = e;
    te.set(
      {
        ...r,
        ...a,
        props: n
      },
      {
        replace: t,
        preserveScroll: e.preserveScroll,
        preserveState: e.preserveState
      }
    ).then(() => {
      const l = te.get().props.errors || {};
      if (Object.keys(l).length === 0)
        return i == null ? void 0 : i(te.get());
      const c = e.errorBag ? l[e.errorBag || ""] || {} : l;
      return o == null ? void 0 : o(c);
    }).finally(() => s == null ? void 0 : s(e));
  }
  getPrefetchParams(e, t) {
    return {
      ...this.getPendingVisit(e, {
        ...t,
        async: !0,
        showProgress: !1,
        prefetch: !0
      }),
      ...this.getVisitEvents(t)
    };
  }
  getPendingVisit(e, t, r = {}) {
    if (_t(e)) {
      const a = e;
      e = a.url, t.method = t.method ?? a.method;
    }
    const n = {
      method: "get",
      data: {},
      replace: !1,
      preserveScroll: !1,
      preserveState: !1,
      only: [],
      except: [],
      headers: {},
      errorBag: "",
      forceFormData: !1,
      queryStringArrayFormat: "brackets",
      async: !1,
      showProgress: !0,
      fresh: !1,
      reset: [],
      preserveUrl: !1,
      prefetch: !1,
      invalidateCacheTags: [],
      ...t
    }, [o, s] = ib(
      e,
      n.data,
      n.method,
      n.forceFormData,
      n.queryStringArrayFormat
    ), i = {
      cancelled: !1,
      completed: !1,
      interrupted: !1,
      ...n,
      ...r,
      url: o,
      data: s
    };
    return i.prefetch && (i.headers.Purpose = "prefetch"), i;
  }
  getVisitEvents(e) {
    return {
      onCancelToken: e.onCancelToken || (() => {
      }),
      onBefore: e.onBefore || (() => {
      }),
      onStart: e.onStart || (() => {
      }),
      onProgress: e.onProgress || (() => {
      }),
      onFinish: e.onFinish || (() => {
      }),
      onCancel: e.onCancel || (() => {
      }),
      onSuccess: e.onSuccess || (() => {
      }),
      onError: e.onError || (() => {
      }),
      onPrefetched: e.onPrefetched || (() => {
      }),
      onPrefetching: e.onPrefetching || (() => {
      })
    };
  }
  loadDeferredProps(e) {
    e && Object.entries(e).forEach(([t, r]) => {
      this.reload({ only: r });
    });
  }
};
function Sb(e) {
  if (!e.includes("."))
    return e;
  const t = (r) => r.startsWith("[") && r.endsWith("]") ? r : r.split(".").reduce((n, o, s) => s === 0 ? o : `${n}[${o}]`);
  return e.replace(/\\\./g, "__ESCAPED_DOT__").split(/(\[[^\]]*\])/).filter(Boolean).map(t).join("").replace(/__ESCAPED_DOT__/g, ".");
}
function Eb(e) {
  const t = [], r = /([^\[\]]+)|\[(\d*)\]/g;
  let n;
  for (; (n = r.exec(e)) !== null; )
    n[1] !== void 0 ? t.push(n[1]) : n[2] !== void 0 && t.push(n[2] === "" ? "" : Number(n[2]));
  return t;
}
function Ac(e) {
  const t = {};
  for (const [r, n] of e.entries()) {
    if (n instanceof File && n.size === 0 && n.name === "")
      continue;
    const o = Eb(Sb(r));
    if (o[o.length - 1] === "") {
      const s = o.slice(0, -1), i = Nl(t, s);
      Array.isArray(i) ? i.push(n) : Pr(t, s, [n]);
      continue;
    }
    Pr(t, o, n);
  }
  return t;
}
function zr(e) {
  const t = e.currentTarget.tagName.toLowerCase() === "a";
  return !(e.target && (e == null ? void 0 : e.target).isContentEditable || e.defaultPrevented || t && e.altKey || t && e.ctrlKey || t && e.metaKey || t && e.shiftKey || t && "button" in e && e.button !== 0);
}
function Cc(e) {
  const t = e.currentTarget.tagName.toLowerCase() === "button";
  return e.key === "Enter" || t && e.key === " ";
}
var Pb = (e = !1) => {
};
function Rs(e) {
  return e instanceof HTMLInputElement || e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement;
}
function Ab(e, t) {
  const r = e.value, n = e.checked;
  switch (e.type.toLowerCase()) {
    case "checkbox":
      e.checked = t.includes(e.value);
      break;
    case "radio":
      e.checked = t[0] === e.value;
      break;
    case "file":
      e.value = "";
      break;
    case "button":
    case "submit":
    case "reset":
    case "image":
      break;
    default:
      e.value = t[0] !== null && t[0] !== void 0 ? String(t[0]) : "";
  }
  return e.value !== r || e.checked !== n;
}
function Cb(e, t) {
  const r = e.value, n = Array.from(e.selectedOptions).map((i) => i.value);
  if (e.multiple) {
    const i = t.map((a) => String(a));
    Array.from(e.options).forEach((a) => {
      a.selected = i.includes(a.value);
    });
  } else
    e.value = t[0] !== void 0 ? String(t[0]) : "";
  const o = Array.from(e.selectedOptions).map((i) => i.value);
  return e.multiple ? JSON.stringify(n.sort()) !== JSON.stringify(o.sort()) : e.value !== r;
}
function ts(e, t) {
  if (e.disabled) {
    if (e instanceof HTMLInputElement) {
      const r = e.value, n = e.checked;
      switch (e.type.toLowerCase()) {
        case "checkbox":
        case "radio":
          return e.checked = e.defaultChecked, e.checked !== n;
        case "file":
          return e.value = "", r !== "";
        case "button":
        case "submit":
        case "reset":
        case "image":
          return !1;
        default:
          return e.value = e.defaultValue, e.value !== r;
      }
    } else if (e instanceof HTMLSelectElement) {
      const r = Array.from(e.selectedOptions).map((o) => o.value);
      Array.from(e.options).forEach((o) => {
        o.selected = o.defaultSelected;
      });
      const n = Array.from(e.selectedOptions).map((o) => o.value);
      return JSON.stringify(r.sort()) !== JSON.stringify(n.sort());
    } else if (e instanceof HTMLTextAreaElement) {
      const r = e.value;
      return e.value = e.defaultValue, e.value !== r;
    }
    return !1;
  }
  if (e instanceof HTMLInputElement)
    return Ab(e, t);
  if (e instanceof HTMLSelectElement)
    return Cb(e, t);
  if (e instanceof HTMLTextAreaElement) {
    const r = e.value;
    return e.value = t[0] !== void 0 ? String(t[0]) : "", e.value !== r;
  }
  return !1;
}
function Rb(e, t) {
  let r = !1;
  return e instanceof RadioNodeList || e instanceof HTMLCollection ? Array.from(e).forEach((n, o) => {
    if (n instanceof Element && Rs(n))
      if (n instanceof HTMLInputElement && ["checkbox", "radio"].includes(n.type.toLowerCase()))
        ts(n, t) && (r = !0);
      else {
        const s = t[o] !== void 0 ? [t[o]] : [t[0] ?? null].filter(Boolean);
        ts(n, s) && (r = !0);
      }
  }) : Rs(e) && (r = ts(e, t)), r;
}
function Tb(e, t, r) {
  if (!e)
    return;
  if (!r || r.length === 0) {
    const o = new FormData(e), s = Array.from(e.elements).map((i) => Rs(i) ? i.name : "").filter(Boolean);
    r = [.../* @__PURE__ */ new Set([...t.keys(), ...o.keys(), ...s])];
  }
  let n = !1;
  r.forEach((o) => {
    const s = e.elements.namedItem(o);
    s && Rb(s, t.getAll(o)) && (n = !0);
  }), n && e.dispatchEvent(new Event("reset", { bubbles: !0 }));
}
var Ue = new xb();
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
var Ob = cl(void 0);
Ob.displayName = "InertiaHeadContext";
var _b = cl(void 0);
_b.displayName = "InertiaPageContext";
function Rc(e, t) {
  const [r, n] = Ee(() => {
    const o = Ue.restore(t);
    return o !== void 0 ? o : e;
  });
  return Xt(() => {
    Ue.remember(r, t);
  }, [r, t]), [r, n];
}
function Nb(e, t) {
  const r = st(null), n = typeof e == "string" ? e : null, [o, s] = Ee(
    (typeof e == "string" ? t : e) || {}
  ), i = st(null), a = st(null), [l, c] = n ? Rc(o, `${n}:data`) : Ee(o), [u, f] = n ? Rc({}, `${n}:errors`) : Ee({}), [m, h] = Ee(!1), [g, p] = Ee(!1), [d, v] = Ee(null), [y, w] = Ee(!1), [S, P] = Ee(!1), T = st((k) => k), A = ke(() => !Ll(l, o), [l, o]);
  Xt(() => (r.current = !0, () => {
    r.current = !1;
  }), []);
  const E = st(!1), I = Te(
    (...k) => {
      const $ = k[0] !== null && typeof k[0] == "object", H = $ ? k[0].method : k[0], M = $ ? k[0].url : k[1], F = ($ ? k[1] : k[2]) ?? {};
      E.current = !1;
      const K = {
        ...F,
        onCancelToken: (ee) => {
          if (i.current = ee, F.onCancelToken)
            return F.onCancelToken(ee);
        },
        onBefore: (ee) => {
          if (w(!1), P(!1), clearTimeout(a.current), F.onBefore)
            return F.onBefore(ee);
        },
        onStart: (ee) => {
          if (p(!0), F.onStart)
            return F.onStart(ee);
        },
        onProgress: (ee) => {
          if (v(ee), F.onProgress)
            return F.onProgress(ee);
        },
        onSuccess: async (ee) => {
          r.current && (p(!1), v(null), f({}), h(!1), w(!0), P(!0), a.current = setTimeout(() => {
            r.current && P(!1);
          }, 2e3));
          const le = F.onSuccess ? await F.onSuccess(ee) : null;
          return r.current && !E.current && c((ve) => (s(wr(ve)), ve)), le;
        },
        onError: (ee) => {
          if (r.current && (p(!1), v(null), f(ee), h(!0)), F.onError)
            return F.onError(ee);
        },
        onCancel: () => {
          if (r.current && (p(!1), v(null)), F.onCancel)
            return F.onCancel();
        },
        onFinish: (ee) => {
          if (r.current && (p(!1), v(null)), i.current = null, F.onFinish)
            return F.onFinish(ee);
        }
      };
      H === "delete" ? Ue.delete(M, { ...K, data: T.current(l) }) : Ue[H](M, T.current(l), K);
    },
    [l, f, T]
  ), j = Te(
    (k, $) => {
      c(typeof k == "string" ? (H) => Pr(wr(H), k, $) : typeof k == "function" ? (H) => k(H) : k);
    },
    [c]
  ), [L, D] = Ee(!1), X = st(l);
  Xt(() => {
    X.current = l;
  });
  const B = Te(
    (k, $) => {
      E.current = !0, typeof k > "u" ? (s(X.current), D(!0)) : s((H) => typeof k == "string" ? Pr(wr(H), k, $) : Object.assign(wr(H), k));
    },
    [s]
  );
  ll(() => {
    L && (A && s(l), D(!1));
  }, [L]);
  const Q = Te(
    (...k) => {
      k.length === 0 ? c(o) : c(
        ($) => k.filter((H) => dy(o, H)).reduce(
          (H, M) => Pr(H, M, Nl(o, M)),
          { ...$ }
        )
      );
    },
    [c, o]
  ), q = Te(
    (k, $) => {
      f((H) => {
        const M = {
          ...H,
          ...typeof k == "string" ? { [k]: $ } : k
        };
        return h(Object.keys(M).length > 0), M;
      });
    },
    [f, h]
  ), z = Te(
    (...k) => {
      f(($) => {
        const H = Object.keys($).reduce(
          (M, F) => ({
            ...M,
            ...k.length > 0 && !k.includes(F) ? { [F]: $[F] } : {}
          }),
          {}
        );
        return h(Object.keys(H).length > 0), H;
      });
    },
    [f, h]
  ), R = Te(
    (...k) => {
      Q(...k), z(...k);
    },
    [Q, z]
  ), J = (k) => ($, H) => {
    I(k, $, H);
  }, N = Te(J("get"), [I]), U = Te(J("post"), [I]), Z = Te(J("put"), [I]), Y = Te(J("patch"), [I]), W = Te(J("delete"), [I]), re = Te(() => {
    i.current && i.current.cancel();
  }, []), ie = Te((k) => {
    T.current = k;
  }, []);
  return {
    data: l,
    setData: j,
    isDirty: A,
    errors: u,
    hasErrors: m,
    processing: g,
    progress: d,
    wasSuccessful: y,
    recentlySuccessful: S,
    transform: ie,
    setDefaults: B,
    reset: Q,
    setError: q,
    clearErrors: z,
    resetAndClearErrors: R,
    submit: I,
    get: N,
    post: U,
    put: Z,
    patch: Y,
    delete: W,
    cancel: re
  };
}
var kb = (e) => {
  typeof Ke.startTransition == "function" ? Ke.startTransition(e) : setTimeout(e, 0);
}, rt = () => {
}, Ib = Sn(
  ({
    action: e = "",
    method: t = "get",
    headers: r = {},
    queryStringArrayFormat: n = "brackets",
    errorBag: o = null,
    showProgress: s = !0,
    transform: i = (I) => I,
    options: a = {},
    onStart: l = rt,
    onProgress: c = rt,
    onFinish: u = rt,
    onBefore: f = rt,
    onCancel: m = rt,
    onSuccess: h = rt,
    onError: g = rt,
    onCancelToken: p = rt,
    onSubmitComplete: d = rt,
    disableWhileProcessing: v = !1,
    resetOnError: y = !1,
    resetOnSuccess: w = !1,
    setDefaultsOnSuccess: S = !1,
    invalidateCacheTags: P = [],
    children: T,
    ...A
  }, E) => {
    const I = Nb({}), j = st(null), L = ke(() => _t(e) ? e.method : t.toLowerCase(), [e, t]), [D, X] = Ee(!1), B = st(new FormData()), Q = () => new FormData(j.current), q = () => Ac(Q()), z = (W) => kb(
      () => X(W.type === "reset" ? !1 : !Ll(q(), Ac(B.current)))
    );
    Xt(() => {
      B.current = Q();
      const W = ["input", "change", "reset"];
      return W.forEach((re) => j.current.addEventListener(re, z)), () => W.forEach((re) => {
        var ie;
        return (ie = j.current) == null ? void 0 : ie.removeEventListener(re, z);
      });
    }, []);
    const R = (...W) => {
      Tb(j.current, B.current, W);
    }, J = (...W) => {
      I.clearErrors(...W), R(...W);
    }, N = (W) => {
      W && (W === !0 ? R() : W.length > 0 && R(...W));
    }, U = () => {
      const [W, re] = ii(
        L,
        _t(e) ? e.url : e,
        q(),
        n
      ), ie = {
        headers: r,
        errorBag: o,
        showProgress: s,
        invalidateCacheTags: P,
        onCancelToken: p,
        onBefore: f,
        onStart: l,
        onProgress: c,
        onFinish: u,
        onCancel: m,
        onSuccess: (...k) => {
          h(...k), d({
            reset: R,
            defaults: Z
          }), N(w), S === !0 && Z();
        },
        onError(...k) {
          g(...k), N(y);
        },
        ...a
      };
      I.transform(() => i(re)), I.submit(L, W, ie);
    }, Z = () => {
      B.current = Q(), X(!1);
    }, Y = () => ({
      errors: I.errors,
      hasErrors: I.hasErrors,
      processing: I.processing,
      progress: I.progress,
      wasSuccessful: I.wasSuccessful,
      recentlySuccessful: I.recentlySuccessful,
      isDirty: D,
      clearErrors: I.clearErrors,
      resetAndClearErrors: J,
      setError: I.setError,
      reset: R,
      submit: U,
      defaults: Z
    });
    return hd(E, Y, [I, D, U]), Rr(
      "form",
      {
        ...A,
        ref: j,
        action: _t(e) ? e.url : e,
        method: L,
        onSubmit: (W) => {
          W.preventDefault(), U();
        },
        // Only React 19 supports passing a boolean to the `inert` attribute.
        // To support earlier versions as well, we use the string 'true'.
        // Unfortunately, React 19 treats an empty string as `false`.
        // See: https://github.com/inertiajs/inertia/pull/2536
        inert: v && I.processing && "true"
      },
      typeof T == "function" ? T(Y()) : T
    );
  }
);
Ib.displayName = "InertiaForm";
var Le = () => {
}, wu = Sn(
  ({
    children: e,
    as: t = "a",
    data: r = {},
    href: n = "",
    method: o = "get",
    preserveScroll: s = !1,
    preserveState: i = null,
    replace: a = !1,
    only: l = [],
    except: c = [],
    headers: u = {},
    queryStringArrayFormat: f = "brackets",
    async: m = !1,
    onClick: h = Le,
    onCancelToken: g = Le,
    onBefore: p = Le,
    onStart: d = Le,
    onProgress: v = Le,
    onFinish: y = Le,
    onCancel: w = Le,
    onSuccess: S = Le,
    onError: P = Le,
    onPrefetching: T = Le,
    onPrefetched: A = Le,
    prefetch: E = !1,
    cacheFor: I = 0,
    cacheTags: j = [],
    ...L
  }, D) => {
    const [X, B] = Ee(0), Q = st(null), q = ke(() => _t(n) ? n.method : o.toLowerCase(), [n, o]), z = ke(() => typeof t != "string" || t.toLowerCase() !== "a" ? t : q !== "get" ? "button" : t.toLowerCase(), [t, q]), R = ke(
      () => ii(q, _t(n) ? n.url : n, r, f),
      [n, q, r, f]
    ), J = ke(() => R[0], [R]), N = ke(() => R[1], [R]), U = ke(
      () => ({
        data: N,
        method: q,
        preserveScroll: s,
        preserveState: i ?? q !== "get",
        replace: a,
        only: l,
        except: c,
        headers: u,
        async: m
      }),
      [N, q, s, i, a, l, c, u, m]
    ), Z = ke(
      () => ({
        ...U,
        onCancelToken: g,
        onBefore: p,
        onStart(M) {
          B((F) => F + 1), d(M);
        },
        onProgress: v,
        onFinish(M) {
          B((F) => F - 1), y(M);
        },
        onCancel: w,
        onSuccess: S,
        onError: P
      }),
      [U, g, p, d, v, y, w, S, P]
    ), Y = ke(
      () => E === !0 ? ["hover"] : E === !1 ? [] : Array.isArray(E) ? E : [E],
      Array.isArray(E) ? E : [E]
    ), W = ke(() => I !== 0 ? I : Y.length === 1 && Y[0] === "click" ? 0 : 3e4, [I, Y]), re = ke(() => () => {
      Ue.prefetch(
        J,
        {
          ...U,
          onPrefetching: T,
          onPrefetched: A
        },
        { cacheFor: W, cacheTags: j }
      );
    }, [J, U, T, A, W, j]);
    Xt(() => () => {
      clearTimeout(Q.current);
    }, []), Xt(() => {
      Y.includes("mount") && setTimeout(() => re());
    }, Y);
    const ie = {
      onClick: (M) => {
        h(M), zr(M) && (M.preventDefault(), Ue.visit(J, Z));
      }
    }, k = {
      onMouseEnter: () => {
        Q.current = window.setTimeout(() => {
          re();
        }, 75);
      },
      onMouseLeave: () => {
        clearTimeout(Q.current);
      },
      onClick: ie.onClick
    }, $ = {
      onMouseDown: (M) => {
        zr(M) && (M.preventDefault(), re());
      },
      onKeyDown: (M) => {
        zr(M) && Cc(M) && (M.preventDefault(), re());
      },
      onMouseUp: (M) => {
        M.preventDefault(), Ue.visit(J, Z);
      },
      onKeyUp: (M) => {
        Cc(M) && (M.preventDefault(), Ue.visit(J, Z));
      },
      onClick: (M) => {
        h(M), zr(M) && M.preventDefault();
      }
    }, H = ke(() => z === "button" ? { type: "button" } : z === "a" || typeof z != "string" ? { href: J } : {}, [z, J]);
    return Rr(
      z,
      {
        ...L,
        ...H,
        ref: D,
        ...Y.includes("hover") ? k : Y.includes("click") ? $ : ie,
        "data-loading": X > 0 ? "" : void 0
      },
      e
    );
  }
);
wu.displayName = "InertiaLink";
var Wr = wu, Ts = Ue;
function xu(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (r = xu(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Cr() {
  for (var e, t, r = 0, n = "", o = arguments.length; r < o; r++) (e = arguments[r]) && (t = xu(e)) && (n && (n += " "), n += t);
  return n;
}
const ai = "-", Mb = (e) => {
  const t = Db(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (i) => {
      const a = i.split(ai);
      return a[0] === "" && a.length !== 1 && a.shift(), Su(a, t) || jb(i);
    },
    getConflictingClassGroupIds: (i, a) => {
      const l = r[i] || [];
      return a && n[i] ? [...l, ...n[i]] : l;
    }
  };
}, Su = (e, t) => {
  var i;
  if (e.length === 0)
    return t.classGroupId;
  const r = e[0], n = t.nextPart.get(r), o = n ? Su(e.slice(1), n) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(ai);
  return (i = t.validators.find(({
    validator: a
  }) => a(s))) == null ? void 0 : i.classGroupId;
}, Tc = /^\[(.+)\]$/, jb = (e) => {
  if (Tc.test(e)) {
    const t = Tc.exec(e)[1], r = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, Db = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e, n = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in r)
    Os(r[o], n, o, t);
  return n;
}, Os = (e, t, r, n) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : Oc(t, o);
      s.classGroupId = r;
      return;
    }
    if (typeof o == "function") {
      if (Fb(o)) {
        Os(o(n), t, r, n);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: r
      });
      return;
    }
    Object.entries(o).forEach(([s, i]) => {
      Os(i, Oc(t, s), r, n);
    });
  });
}, Oc = (e, t) => {
  let r = e;
  return t.split(ai).forEach((n) => {
    r.nextPart.has(n) || r.nextPart.set(n, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(n);
  }), r;
}, Fb = (e) => e.isThemeGetter, Lb = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  const o = (s, i) => {
    r.set(s, i), t++, t > e && (t = 0, n = r, r = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let i = r.get(s);
      if (i !== void 0)
        return i;
      if ((i = n.get(s)) !== void 0)
        return o(s, i), i;
    },
    set(s, i) {
      r.has(s) ? r.set(s, i) : o(s, i);
    }
  };
}, _s = "!", Ns = ":", $b = Ns.length, Bb = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let n = (o) => {
    const s = [];
    let i = 0, a = 0, l = 0, c;
    for (let g = 0; g < o.length; g++) {
      let p = o[g];
      if (i === 0 && a === 0) {
        if (p === Ns) {
          s.push(o.slice(l, g)), l = g + $b;
          continue;
        }
        if (p === "/") {
          c = g;
          continue;
        }
      }
      p === "[" ? i++ : p === "]" ? i-- : p === "(" ? a++ : p === ")" && a--;
    }
    const u = s.length === 0 ? o : o.substring(l), f = qb(u), m = f !== u, h = c && c > l ? c - l : void 0;
    return {
      modifiers: s,
      hasImportantModifier: m,
      baseClassName: f,
      maybePostfixModifierPosition: h
    };
  };
  if (t) {
    const o = t + Ns, s = n;
    n = (i) => i.startsWith(o) ? s(i.substring(o.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: i,
      maybePostfixModifierPosition: void 0
    };
  }
  if (r) {
    const o = n;
    n = (s) => r({
      className: s,
      parseClassName: o
    });
  }
  return n;
}, qb = (e) => e.endsWith(_s) ? e.substring(0, e.length - 1) : e.startsWith(_s) ? e.substring(1) : e, Ub = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((n) => [n, !0]));
  return (n) => {
    if (n.length <= 1)
      return n;
    const o = [];
    let s = [];
    return n.forEach((i) => {
      i[0] === "[" || t[i] ? (o.push(...s.sort(), i), s = []) : s.push(i);
    }), o.push(...s.sort()), o;
  };
}, Hb = (e) => ({
  cache: Lb(e.cacheSize),
  parseClassName: Bb(e),
  sortModifiers: Ub(e),
  ...Mb(e)
}), zb = /\s+/, Wb = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, i = [], a = e.trim().split(zb);
  let l = "";
  for (let c = a.length - 1; c >= 0; c -= 1) {
    const u = a[c], {
      isExternal: f,
      modifiers: m,
      hasImportantModifier: h,
      baseClassName: g,
      maybePostfixModifierPosition: p
    } = r(u);
    if (f) {
      l = u + (l.length > 0 ? " " + l : l);
      continue;
    }
    let d = !!p, v = n(d ? g.substring(0, p) : g);
    if (!v) {
      if (!d) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (v = n(g), !v) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      d = !1;
    }
    const y = s(m).join(":"), w = h ? y + _s : y, S = w + v;
    if (i.includes(S))
      continue;
    i.push(S);
    const P = o(v, d);
    for (let T = 0; T < P.length; ++T) {
      const A = P[T];
      i.push(w + A);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function Vb() {
  let e = 0, t, r, n = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (r = Eu(t)) && (n && (n += " "), n += r);
  return n;
}
const Eu = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = Eu(e[n])) && (r && (r += " "), r += t);
  return r;
};
function Gb(e, ...t) {
  let r, n, o, s = i;
  function i(l) {
    const c = t.reduce((u, f) => f(u), e());
    return r = Hb(c), n = r.cache.get, o = r.cache.set, s = a, a(l);
  }
  function a(l) {
    const c = n(l);
    if (c)
      return c;
    const u = Wb(l, r);
    return o(l, u), u;
  }
  return function() {
    return s(Vb.apply(null, arguments));
  };
}
const Se = (e) => {
  const t = (r) => r[e] || [];
  return t.isThemeGetter = !0, t;
}, Pu = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Au = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Kb = /^\d+\/\d+$/, Jb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Xb = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Yb = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Qb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Zb = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, zt = (e) => Kb.test(e), se = (e) => !!e && !Number.isNaN(Number(e)), gt = (e) => !!e && Number.isInteger(Number(e)), rs = (e) => e.endsWith("%") && se(e.slice(0, -1)), nt = (e) => Jb.test(e), ew = () => !0, tw = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Xb.test(e) && !Yb.test(e)
), Cu = () => !1, rw = (e) => Qb.test(e), nw = (e) => Zb.test(e), ow = (e) => !V(e) && !G(e), sw = (e) => ar(e, Ou, Cu), V = (e) => Pu.test(e), Ct = (e) => ar(e, _u, tw), ns = (e) => ar(e, uw, se), _c = (e) => ar(e, Ru, Cu), iw = (e) => ar(e, Tu, nw), Vr = (e) => ar(e, Nu, rw), G = (e) => Au.test(e), br = (e) => cr(e, _u), aw = (e) => cr(e, fw), Nc = (e) => cr(e, Ru), cw = (e) => cr(e, Ou), lw = (e) => cr(e, Tu), Gr = (e) => cr(e, Nu, !0), ar = (e, t, r) => {
  const n = Pu.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, cr = (e, t, r = !1) => {
  const n = Au.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, Ru = (e) => e === "position" || e === "percentage", Tu = (e) => e === "image" || e === "url", Ou = (e) => e === "length" || e === "size" || e === "bg-size", _u = (e) => e === "length", uw = (e) => e === "number", fw = (e) => e === "family-name", Nu = (e) => e === "shadow", dw = () => {
  const e = Se("color"), t = Se("font"), r = Se("text"), n = Se("font-weight"), o = Se("tracking"), s = Se("leading"), i = Se("breakpoint"), a = Se("container"), l = Se("spacing"), c = Se("radius"), u = Se("shadow"), f = Se("inset-shadow"), m = Se("text-shadow"), h = Se("drop-shadow"), g = Se("blur"), p = Se("perspective"), d = Se("aspect"), v = Se("ease"), y = Se("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], P = () => [...S(), G, V], T = () => ["auto", "hidden", "clip", "visible", "scroll"], A = () => ["auto", "contain", "none"], E = () => [G, V, l], I = () => [zt, "full", "auto", ...E()], j = () => [gt, "none", "subgrid", G, V], L = () => ["auto", {
    span: ["full", gt, G, V]
  }, gt, G, V], D = () => [gt, "auto", G, V], X = () => ["auto", "min", "max", "fr", G, V], B = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], Q = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], q = () => ["auto", ...E()], z = () => [zt, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...E()], R = () => [e, G, V], J = () => [...S(), Nc, _c, {
    position: [G, V]
  }], N = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], U = () => ["auto", "cover", "contain", cw, sw, {
    size: [G, V]
  }], Z = () => [rs, br, Ct], Y = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    G,
    V
  ], W = () => ["", se, br, Ct], re = () => ["solid", "dashed", "dotted", "double"], ie = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], k = () => [se, rs, Nc, _c], $ = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    g,
    G,
    V
  ], H = () => ["none", se, G, V], M = () => ["none", se, G, V], F = () => [se, G, V], K = () => [zt, "full", ...E()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [nt],
      breakpoint: [nt],
      color: [ew],
      container: [nt],
      "drop-shadow": [nt],
      ease: ["in", "out", "in-out"],
      font: [ow],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [nt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [nt],
      shadow: [nt],
      spacing: ["px", se],
      text: [nt],
      "text-shadow": [nt],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", zt, V, G, d]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [se, V, G, a]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": w()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": w()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: P()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: T()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": T()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": T()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: A()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": A()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": A()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: I()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": I()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": I()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: I()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: I()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: I()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: I()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: I()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: I()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [gt, "auto", G, V]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [zt, "full", "auto", a, ...E()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [se, zt, "auto", "initial", "none", V]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", se, G, V]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", se, G, V]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [gt, "first", "last", "none", G, V]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": j()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: L()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": D()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": D()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": j()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: L()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": D()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": D()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": X()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": X()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: E()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": E()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": E()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...B(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...Q(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...Q()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...B()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...Q(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...Q(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": B()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...Q(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...Q()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: E()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: E()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: E()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: E()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: E()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: E()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: E()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: E()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: E()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: q()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: q()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: q()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: q()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: q()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: q()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: q()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: q()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: q()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": E()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": E()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: z()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...z()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          a,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...z()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          a,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [i]
          },
          ...z()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...z()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...z()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...z()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, br, Ct]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [n, G, ns]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", rs, V]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [aw, V, t]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [o, G, V]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [se, "none", G, ns]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...E()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", G, V]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", G, V]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: R()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: R()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...re(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [se, "from-font", "auto", G, Ct]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: R()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [se, "auto", G, V]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: E()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", G, V]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", G, V]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: J()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: N()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: U()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, gt, G, V],
          radial: ["", G, V],
          conic: [gt, G, V]
        }, lw, iw]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: R()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: Z()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: Z()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: Z()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: R()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: R()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: R()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: Y()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": Y()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": Y()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": Y()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": Y()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": Y()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": Y()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": Y()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": Y()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": Y()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": Y()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": Y()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": Y()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": Y()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": Y()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: W()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": W()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": W()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": W()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": W()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": W()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": W()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": W()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": W()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": W()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": W()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...re(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...re(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: R()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": R()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": R()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": R()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": R()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": R()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": R()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": R()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": R()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: R()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...re(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [se, G, V]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", se, br, Ct]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: R()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          u,
          Gr,
          Vr
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: R()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", f, Gr, Vr]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": R()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: W()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: R()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [se, Ct]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": R()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": W()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": R()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", m, Gr, Vr]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": R()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [se, G, V]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ie(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ie()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [se]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": k()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": k()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": R()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": R()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": k()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": k()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": R()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": R()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": k()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": k()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": R()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": R()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": k()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": k()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": R()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": R()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": k()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": k()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": R()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": R()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": k()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": k()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": R()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": R()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": k()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": k()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": R()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": R()
      }],
      "mask-image-radial": [{
        "mask-radial": [G, V]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": k()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": k()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": R()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": R()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": S()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [se]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": k()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": k()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": R()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": R()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: J()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: N()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: U()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", G, V]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          G,
          V
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: $()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [se, G, V]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [se, G, V]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          h,
          Gr,
          Vr
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": R()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", se, G, V]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [se, G, V]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", se, G, V]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [se, G, V]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", se, G, V]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          G,
          V
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": $()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [se, G, V]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [se, G, V]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", se, G, V]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [se, G, V]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", se, G, V]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [se, G, V]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [se, G, V]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", se, G, V]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": E()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": E()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": E()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", G, V]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [se, "initial", G, V]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", v, G, V]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [se, G, V]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", y, G, V]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [p, G, V]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": P()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: H()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": H()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": H()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": H()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: M()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": M()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": M()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": M()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: F()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": F()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": F()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [G, V, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: P()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: K()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": K()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": K()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": K()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: R()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: R()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", G, V]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": E()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": E()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": E()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": E()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": E()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": E()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": E()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": E()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": E()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": E()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": E()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": E()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": E()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": E()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": E()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": E()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": E()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": E()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", G, V]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...R()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [se, br, Ct, ns]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...R()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, pw = /* @__PURE__ */ Gb(dw);
function be(...e) {
  return pw(Cr(e));
}
function hw({ className: e, ...t }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ x.jsx(
        "table",
        {
          "data-slot": "table",
          className: be("w-full caption-bottom text-sm", e),
          ...t
        }
      )
    }
  );
}
function mw({ className: e, ...t }) {
  return /* @__PURE__ */ x.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: be("[&_tr]:border-b", e),
      ...t
    }
  );
}
function gw({ className: e, ...t }) {
  return /* @__PURE__ */ x.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: be("[&_tr:last-child]:border-0", e),
      ...t
    }
  );
}
function kc({ className: e, ...t }) {
  return /* @__PURE__ */ x.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: be(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        e
      ),
      ...t
    }
  );
}
function yw({ className: e, ...t }) {
  return /* @__PURE__ */ x.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: be(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        e
      ),
      ...t
    }
  );
}
function ku({ className: e, ...t }) {
  return /* @__PURE__ */ x.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: be(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        e
      ),
      ...t
    }
  );
}
function on(e, t, r = window.location.href) {
  const n = new URL(r);
  n.searchParams.delete(e);
  const o = [...n.searchParams.entries()];
  for (const [s] of o)
    s.startsWith(`${e}[`) && s.endsWith("]") && n.searchParams.delete(s);
  return [n.toString(), t ? { [e]: t } : {}];
}
function sn(e) {
  const t = new URLSearchParams(window.location.search);
  let r = null;
  const n = [...t.entries()];
  for (const [o, s] of n)
    if (o.startsWith(e + "[") && o.endsWith("]")) {
      const a = o.slice(e.length + 1, -1).split("][");
      r || (r = {});
      let l = r;
      for (let u = 0; u < a.length - 1; u++) {
        const f = a[u];
        l[f] || (l[f] = {}), l = l[f];
      }
      const c = a[a.length - 1];
      l[c] = s;
    }
  return r || t.get(e) || null;
}
function Ic(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Iu(...e) {
  return (t) => {
    let r = !1;
    const n = e.map((o) => {
      const s = Ic(o, t);
      return !r && typeof s == "function" && (r = !0), s;
    });
    if (r)
      return () => {
        for (let o = 0; o < n.length; o++) {
          const s = n[o];
          typeof s == "function" ? s() : Ic(e[o], null);
        }
      };
  };
}
function xe(...e) {
  return b.useCallback(Iu(...e), e);
}
// @__NO_SIDE_EFFECTS__
function er(e) {
  const t = /* @__PURE__ */ vw(e), r = b.forwardRef((n, o) => {
    const { children: s, ...i } = n, a = b.Children.toArray(s), l = a.find(ww);
    if (l) {
      const c = l.props.children, u = a.map((f) => f === l ? b.Children.count(c) > 1 ? b.Children.only(null) : b.isValidElement(c) ? c.props.children : null : f);
      return /* @__PURE__ */ x.jsx(t, { ...i, ref: o, children: b.isValidElement(c) ? b.cloneElement(c, void 0, u) : null });
    }
    return /* @__PURE__ */ x.jsx(t, { ...i, ref: o, children: s });
  });
  return r.displayName = `${e}.Slot`, r;
}
var Mu = /* @__PURE__ */ er("Slot");
// @__NO_SIDE_EFFECTS__
function vw(e) {
  const t = b.forwardRef((r, n) => {
    const { children: o, ...s } = r;
    if (b.isValidElement(o)) {
      const i = Sw(o), a = xw(s, o.props);
      return o.type !== b.Fragment && (a.ref = n ? Iu(n, i) : i), b.cloneElement(o, a);
    }
    return b.Children.count(o) > 1 ? b.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var bw = Symbol("radix.slottable");
function ww(e) {
  return b.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === bw;
}
function xw(e, t) {
  const r = { ...t };
  for (const n in t) {
    const o = e[n], s = t[n];
    /^on[A-Z]/.test(n) ? o && s ? r[n] = (...a) => {
      const l = s(...a);
      return o(...a), l;
    } : o && (r[n] = o) : n === "style" ? r[n] = { ...o, ...s } : n === "className" && (r[n] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function Sw(e) {
  var n, o;
  let t = (n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : n.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
const Mc = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, jc = Cr, ju = (e, t) => (r) => {
  var n;
  if ((t == null ? void 0 : t.variants) == null) return jc(e, r == null ? void 0 : r.class, r == null ? void 0 : r.className);
  const { variants: o, defaultVariants: s } = t, i = Object.keys(o).map((c) => {
    const u = r == null ? void 0 : r[c], f = s == null ? void 0 : s[c];
    if (u === null) return null;
    const m = Mc(u) || Mc(f);
    return o[c][m];
  }), a = r && Object.entries(r).reduce((c, u) => {
    let [f, m] = u;
    return m === void 0 || (c[f] = m), c;
  }, {}), l = t == null || (n = t.compoundVariants) === null || n === void 0 ? void 0 : n.reduce((c, u) => {
    let { class: f, className: m, ...h } = u;
    return Object.entries(h).every((g) => {
      let [p, d] = g;
      return Array.isArray(d) ? d.includes({
        ...s,
        ...a
      }[p]) : {
        ...s,
        ...a
      }[p] === d;
    }) ? [
      ...c,
      f,
      m
    ] : c;
  }, []);
  return jc(e, i, l, r == null ? void 0 : r.class, r == null ? void 0 : r.className);
}, Ew = ju(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), ci = b.forwardRef(({
  className: e,
  variant: t,
  asChild: r = !1,
  ...n
}, o) => {
  const s = r ? Mu : "span";
  return /* @__PURE__ */ x.jsx(
    s,
    {
      "data-slot": "badge",
      className: be(Ew({ variant: t }), e),
      ref: o,
      ...n
    }
  );
});
ci.displayName = "Badge";
const Pw = ({ status: e, color: t = "secondary" }) => {
  const n = {
    success: "default",
    sage: "secondary",
    gray: "secondary",
    info: "default",
    warning: "outline",
    purple: "secondary",
    danger: "destructive",
    default: "secondary",
    dark: "secondary",
    slate: "secondary",
    black: "secondary"
  }[t] || "secondary";
  return /* @__PURE__ */ x.jsx(ci, { variant: n, children: e });
};
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Aw = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Cw = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, r, n) => n ? n.toUpperCase() : r.toLowerCase()
), Dc = (e) => {
  const t = Cw(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Du = (...e) => e.filter((t, r, n) => !!t && t.trim() !== "" && n.indexOf(t) === r).join(" ").trim(), Rw = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Tw = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ow = Sn(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: n,
    className: o = "",
    children: s,
    iconNode: i,
    ...a
  }, l) => Rr(
    "svg",
    {
      ref: l,
      ...Tw,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: n ? Number(r) * 24 / Number(t) : r,
      className: Du("lucide", o),
      ...!s && !Rw(a) && { "aria-hidden": "true" },
      ...a
    },
    [
      ...i.map(([c, u]) => Rr(c, u)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dt = (e, t) => {
  const r = Sn(
    ({ className: n, ...o }, s) => Rr(Ow, {
      ref: s,
      iconNode: t,
      className: Du(
        `lucide-${Aw(Dc(e))}`,
        `lucide-${e}`,
        n
      ),
      ...o
    })
  );
  return r.displayName = Dc(e), r;
};
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _w = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], Nw = dt("check", _w);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kw = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], gn = dt("chevron-down", kw);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Iw = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], Mw = dt("chevron-left", Iw);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jw = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Dw = dt("chevron-right", jw);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fw = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], ks = dt("chevron-up", Fw);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lw = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], $w = dt("eye-off", Lw);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bw = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], qw = dt("eye", Bw);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uw = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
], Hw = dt("funnel", Uw);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zw = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], Ww = dt("search", zw), Vw = ju(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Mn = b.forwardRef(({
  className: e,
  variant: t,
  size: r,
  asChild: n = !1,
  ...o
}, s) => {
  const i = n ? Mu : "button";
  return /* @__PURE__ */ x.jsx(
    i,
    {
      "data-slot": "button",
      className: be(Vw({ variant: t, size: r, className: e })),
      ref: s,
      ...o
    }
  );
});
Mn.displayName = "Button";
let Fc = null;
function li() {
  const e = {
    "app.common.previous": "Previous",
    "app.common.next": "Next",
    "app.common.search": "Search",
    "app.common.filter": "Filter",
    "app.common.filters": "Filters",
    "app.common.clear_all": "Clear All",
    "app.common.showing_x_to_y_of_z_results": "Showing {from} to {to} of {total} results"
  };
  return Fc = (t, r = {}) => {
    let n = e[t] || t;
    return Object.keys(r).forEach((o) => {
      n = n.replace(`{${o}}`, r[o]), n = n.replace(`:${o}`, r[o]);
    }), n;
  }, {
    __: Fc,
    locale: "en"
  };
}
const Gw = ({ currentPage: e = 1, totalPages: t = 1, totalItems: r = 0, itemsPerPage: n = 20, onPageChange: o, showPagination: s = !0 }) => {
  const { __: i } = li();
  if (!s || t <= 1) return null;
  const a = (u) => {
    const f = new URL(window.location.href);
    return f.searchParams.set("page", u), f.toString();
  }, l = (e - 1) * n + 1, c = Math.min(e * n, r);
  return /* @__PURE__ */ x.jsxs("div", { className: "p-6 flex items-center justify-between", children: [
    /* @__PURE__ */ x.jsxs("div", { className: "space-x-2 flex items-center", children: [
      /* @__PURE__ */ x.jsxs(
        Wr,
        {
          href: a(e - 1),
          className: Cr(
            "px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border-gray-300 rounded-lg hover:bg-gray-50 flex items-center border disabled:cursor-not-allowed disabled:opacity-50",
            {
              "cursor-not-allowed opacity-50": e === 1
            }
          ),
          children: [
            /* @__PURE__ */ x.jsx(Mw, { className: "h-4 w-4 mr-1" }),
            i("app.common.previous")
          ]
        }
      ),
      /* @__PURE__ */ x.jsxs("div", { className: "space-x-1 flex items-center", children: [
        Array.from({ length: Math.min(5, t) }, (u, f) => {
          let m;
          return t <= 5 || e <= 3 ? m = f + 1 : e >= t - 2 ? m = t - 4 + f : m = e - 2 + f, /* @__PURE__ */ x.jsx(
            Wr,
            {
              href: a(m),
              className: Cr("px-3 py-1.5 text-sm font-medium rounded-lg rounded-lg flex items-center border", {
                "bg-black border-black text-white": m === e,
                "bg-white border-gray-300 text-gray-700 hover:bg-gray-50": m !== e
              }),
              children: m
            },
            m
          );
        }),
        t > 5 && e < t - 2 && /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
          /* @__PURE__ */ x.jsx("span", { className: "px-2 text-gray-500", children: "..." }),
          /* @__PURE__ */ x.jsx(
            Wr,
            {
              href: a(t),
              className: "px-3 py-1.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 bg-white border-gray-300 rounded-lg hover:bg-gray-50 flex items-center border",
              children: t
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ x.jsxs(
        Wr,
        {
          href: a(e + 1),
          className: Cr(
            "px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border-gray-300 rounded-lg hover:bg-gray-50 flex items-center border disabled:cursor-not-allowed disabled:opacity-50",
            {
              "cursor-not-allowed opacity-50": e === t
            }
          ),
          children: [
            i("app.common.next"),
            /* @__PURE__ */ x.jsx(Dw, { className: "h-4 w-4 ml-1" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ x.jsx("div", { className: "text-sm text-gray-700", children: i("app.common.showing_x_to_y_of_z_results", {
      from: l,
      to: c,
      total: r
    }) })
  ] });
}, Kw = ({ label: e, sortable: t = !1, sortDirection: r, onSort: n, className: o, ...s }) => /* @__PURE__ */ x.jsx(
  yw,
  {
    className: be(o),
    ...s,
    children: t ? /* @__PURE__ */ x.jsxs("button", { onClick: n, className: "space-x-1 flex w-full cursor-pointer items-center justify-between", children: [
      /* @__PURE__ */ x.jsx("span", { children: e }),
      /* @__PURE__ */ x.jsx("div", { className: "ml-1 hover:text-gray-700", children: r === "asc" ? /* @__PURE__ */ x.jsx(ks, { className: "h-4 w-4" }) : r === "desc" ? /* @__PURE__ */ x.jsx(gn, { className: "h-4 w-4" }) : /* @__PURE__ */ x.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ x.jsx(ks, { className: "h-3 w-3 -mb-1" }),
        /* @__PURE__ */ x.jsx(gn, { className: "h-3 w-3" })
      ] }) })
    ] }) : /* @__PURE__ */ x.jsx("span", { children: e })
  }
);
function Jw(e, t, r) {
  var n = {}, o = n.noTrailing, s = o === void 0 ? !1 : o, i = n.noLeading, a = i === void 0 ? !1 : i, l = n.debounceMode, c = l === void 0 ? void 0 : l, u, f = !1, m = 0;
  function h() {
    u && clearTimeout(u);
  }
  function g(d) {
    var v = d || {}, y = v.upcomingOnly, w = y === void 0 ? !1 : y;
    h(), f = !w;
  }
  function p() {
    for (var d = arguments.length, v = new Array(d), y = 0; y < d; y++)
      v[y] = arguments[y];
    var w = this, S = Date.now() - m;
    if (f)
      return;
    function P() {
      m = Date.now(), t.apply(w, v);
    }
    function T() {
      u = void 0;
    }
    !a && c && !u && P(), h(), c === void 0 && S > e ? a ? (m = Date.now(), s || (u = setTimeout(c ? T : P, e))) : P() : s !== !0 && (u = setTimeout(c ? T : P, c === void 0 ? e - S : e));
  }
  return p.cancel = g, p;
}
function Fu({ className: e, type: t, ...r }) {
  return /* @__PURE__ */ x.jsx(
    "input",
    {
      type: t,
      "data-slot": "input",
      className: be(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        e
      ),
      ...r
    }
  );
}
function he(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), r === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function jn(e, t = []) {
  let r = [];
  function n(s, i) {
    const a = b.createContext(i), l = r.length;
    r = [...r, i];
    const c = (f) => {
      var v;
      const { scope: m, children: h, ...g } = f, p = ((v = m == null ? void 0 : m[e]) == null ? void 0 : v[l]) || a, d = b.useMemo(() => g, Object.values(g));
      return /* @__PURE__ */ x.jsx(p.Provider, { value: d, children: h });
    };
    c.displayName = s + "Provider";
    function u(f, m) {
      var p;
      const h = ((p = m == null ? void 0 : m[e]) == null ? void 0 : p[l]) || a, g = b.useContext(h);
      if (g) return g;
      if (i !== void 0) return i;
      throw new Error(`\`${f}\` must be used within \`${s}\``);
    }
    return [c, u];
  }
  const o = () => {
    const s = r.map((i) => b.createContext(i));
    return function(a) {
      const l = (a == null ? void 0 : a[e]) || s;
      return b.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: l } }),
        [a, l]
      );
    };
  };
  return o.scopeName = e, [n, Xw(o, ...t)];
}
function Xw(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const r = () => {
    const n = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const i = n.reduce((a, { useScope: l, scopeName: c }) => {
        const f = l(s)[`__scope${c}`];
        return { ...a, ...f };
      }, {});
      return b.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return r.scopeName = t.scopeName, r;
}
var Yw = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], me = Yw.reduce((e, t) => {
  const r = /* @__PURE__ */ er(`Primitive.${t}`), n = b.forwardRef((o, s) => {
    const { asChild: i, ...a } = o, l = i ? r : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ x.jsx(l, { ...a, ref: s });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {});
function Qw(e, t) {
  e && En.flushSync(() => e.dispatchEvent(t));
}
function It(e) {
  const t = b.useRef(e);
  return b.useEffect(() => {
    t.current = e;
  }), b.useMemo(() => (...r) => {
    var n;
    return (n = t.current) == null ? void 0 : n.call(t, ...r);
  }, []);
}
function Zw(e, t = globalThis == null ? void 0 : globalThis.document) {
  const r = It(e);
  b.useEffect(() => {
    const n = (o) => {
      o.key === "Escape" && r(o);
    };
    return t.addEventListener("keydown", n, { capture: !0 }), () => t.removeEventListener("keydown", n, { capture: !0 });
  }, [r, t]);
}
var ex = "DismissableLayer", Is = "dismissableLayer.update", tx = "dismissableLayer.pointerDownOutside", rx = "dismissableLayer.focusOutside", Lc, Lu = b.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), ui = b.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: r = !1,
      onEscapeKeyDown: n,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: i,
      onDismiss: a,
      ...l
    } = e, c = b.useContext(Lu), [u, f] = b.useState(null), m = (u == null ? void 0 : u.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = b.useState({}), g = xe(t, (A) => f(A)), p = Array.from(c.layers), [d] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), v = p.indexOf(d), y = u ? p.indexOf(u) : -1, w = c.layersWithOutsidePointerEventsDisabled.size > 0, S = y >= v, P = sx((A) => {
      const E = A.target, I = [...c.branches].some((j) => j.contains(E));
      !S || I || (o == null || o(A), i == null || i(A), A.defaultPrevented || a == null || a());
    }, m), T = ix((A) => {
      const E = A.target;
      [...c.branches].some((j) => j.contains(E)) || (s == null || s(A), i == null || i(A), A.defaultPrevented || a == null || a());
    }, m);
    return Zw((A) => {
      y === c.layers.size - 1 && (n == null || n(A), !A.defaultPrevented && a && (A.preventDefault(), a()));
    }, m), b.useEffect(() => {
      if (u)
        return r && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (Lc = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(u)), c.layers.add(u), $c(), () => {
          r && c.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = Lc);
        };
    }, [u, m, r, c]), b.useEffect(() => () => {
      u && (c.layers.delete(u), c.layersWithOutsidePointerEventsDisabled.delete(u), $c());
    }, [u, c]), b.useEffect(() => {
      const A = () => h({});
      return document.addEventListener(Is, A), () => document.removeEventListener(Is, A);
    }, []), /* @__PURE__ */ x.jsx(
      me.div,
      {
        ...l,
        ref: g,
        style: {
          pointerEvents: w ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: he(e.onFocusCapture, T.onFocusCapture),
        onBlurCapture: he(e.onBlurCapture, T.onBlurCapture),
        onPointerDownCapture: he(
          e.onPointerDownCapture,
          P.onPointerDownCapture
        )
      }
    );
  }
);
ui.displayName = ex;
var nx = "DismissableLayerBranch", ox = b.forwardRef((e, t) => {
  const r = b.useContext(Lu), n = b.useRef(null), o = xe(t, n);
  return b.useEffect(() => {
    const s = n.current;
    if (s)
      return r.branches.add(s), () => {
        r.branches.delete(s);
      };
  }, [r.branches]), /* @__PURE__ */ x.jsx(me.div, { ...e, ref: o });
});
ox.displayName = nx;
function sx(e, t = globalThis == null ? void 0 : globalThis.document) {
  const r = It(e), n = b.useRef(!1), o = b.useRef(() => {
  });
  return b.useEffect(() => {
    const s = (a) => {
      if (a.target && !n.current) {
        let l = function() {
          $u(
            tx,
            r,
            c,
            { discrete: !0 }
          );
        };
        const c = { originalEvent: a };
        a.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = l, t.addEventListener("click", o.current, { once: !0 })) : l();
      } else
        t.removeEventListener("click", o.current);
      n.current = !1;
    }, i = window.setTimeout(() => {
      t.addEventListener("pointerdown", s);
    }, 0);
    return () => {
      window.clearTimeout(i), t.removeEventListener("pointerdown", s), t.removeEventListener("click", o.current);
    };
  }, [t, r]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => n.current = !0
  };
}
function ix(e, t = globalThis == null ? void 0 : globalThis.document) {
  const r = It(e), n = b.useRef(!1);
  return b.useEffect(() => {
    const o = (s) => {
      s.target && !n.current && $u(rx, r, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, r]), {
    onFocusCapture: () => n.current = !0,
    onBlurCapture: () => n.current = !1
  };
}
function $c() {
  const e = new CustomEvent(Is);
  document.dispatchEvent(e);
}
function $u(e, t, r, { discrete: n }) {
  const o = r.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
  t && o.addEventListener(e, t, { once: !0 }), n ? Qw(o, s) : o.dispatchEvent(s);
}
var os = 0;
function Bu() {
  b.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Bc()), document.body.insertAdjacentElement("beforeend", e[1] ?? Bc()), os++, () => {
      os === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), os--;
    };
  }, []);
}
function Bc() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var ss = "focusScope.autoFocusOnMount", is = "focusScope.autoFocusOnUnmount", qc = { bubbles: !1, cancelable: !0 }, ax = "FocusScope", fi = b.forwardRef((e, t) => {
  const {
    loop: r = !1,
    trapped: n = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...i
  } = e, [a, l] = b.useState(null), c = It(o), u = It(s), f = b.useRef(null), m = xe(t, (p) => l(p)), h = b.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  b.useEffect(() => {
    if (n) {
      let p = function(w) {
        if (h.paused || !a) return;
        const S = w.target;
        a.contains(S) ? f.current = S : yt(f.current, { select: !0 });
      }, d = function(w) {
        if (h.paused || !a) return;
        const S = w.relatedTarget;
        S !== null && (a.contains(S) || yt(f.current, { select: !0 }));
      }, v = function(w) {
        if (document.activeElement === document.body)
          for (const P of w)
            P.removedNodes.length > 0 && yt(a);
      };
      document.addEventListener("focusin", p), document.addEventListener("focusout", d);
      const y = new MutationObserver(v);
      return a && y.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", p), document.removeEventListener("focusout", d), y.disconnect();
      };
    }
  }, [n, a, h.paused]), b.useEffect(() => {
    if (a) {
      Hc.add(h);
      const p = document.activeElement;
      if (!a.contains(p)) {
        const v = new CustomEvent(ss, qc);
        a.addEventListener(ss, c), a.dispatchEvent(v), v.defaultPrevented || (cx(px(qu(a)), { select: !0 }), document.activeElement === p && yt(a));
      }
      return () => {
        a.removeEventListener(ss, c), setTimeout(() => {
          const v = new CustomEvent(is, qc);
          a.addEventListener(is, u), a.dispatchEvent(v), v.defaultPrevented || yt(p ?? document.body, { select: !0 }), a.removeEventListener(is, u), Hc.remove(h);
        }, 0);
      };
    }
  }, [a, c, u, h]);
  const g = b.useCallback(
    (p) => {
      if (!r && !n || h.paused) return;
      const d = p.key === "Tab" && !p.altKey && !p.ctrlKey && !p.metaKey, v = document.activeElement;
      if (d && v) {
        const y = p.currentTarget, [w, S] = lx(y);
        w && S ? !p.shiftKey && v === S ? (p.preventDefault(), r && yt(w, { select: !0 })) : p.shiftKey && v === w && (p.preventDefault(), r && yt(S, { select: !0 })) : v === y && p.preventDefault();
      }
    },
    [r, n, h.paused]
  );
  return /* @__PURE__ */ x.jsx(me.div, { tabIndex: -1, ...i, ref: m, onKeyDown: g });
});
fi.displayName = ax;
function cx(e, { select: t = !1 } = {}) {
  const r = document.activeElement;
  for (const n of e)
    if (yt(n, { select: t }), document.activeElement !== r) return;
}
function lx(e) {
  const t = qu(e), r = Uc(t, e), n = Uc(t.reverse(), e);
  return [r, n];
}
function qu(e) {
  const t = [], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const o = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || o ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) t.push(r.currentNode);
  return t;
}
function Uc(e, t) {
  for (const r of e)
    if (!ux(r, { upTo: t })) return r;
}
function ux(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function fx(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function yt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const r = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== r && fx(e) && t && e.select();
  }
}
var Hc = dx();
function dx() {
  let e = [];
  return {
    add(t) {
      const r = e[0];
      t !== r && (r == null || r.pause()), e = zc(e, t), e.unshift(t);
    },
    remove(t) {
      var r;
      e = zc(e, t), (r = e[0]) == null || r.resume();
    }
  };
}
function zc(e, t) {
  const r = [...e], n = r.indexOf(t);
  return n !== -1 && r.splice(n, 1), r;
}
function px(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Ae = globalThis != null && globalThis.document ? b.useLayoutEffect : () => {
}, hx = b[" useId ".trim().toString()] || (() => {
}), mx = 0;
function Dn(e) {
  const [t, r] = b.useState(hx());
  return Ae(() => {
    r((n) => n ?? String(mx++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const gx = ["top", "right", "bottom", "left"], wt = Math.min, Ie = Math.max, yn = Math.round, Kr = Math.floor, Ye = (e) => ({
  x: e,
  y: e
}), yx = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, vx = {
  start: "end",
  end: "start"
};
function Ms(e, t, r) {
  return Ie(e, wt(t, r));
}
function ct(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function lt(e) {
  return e.split("-")[0];
}
function lr(e) {
  return e.split("-")[1];
}
function di(e) {
  return e === "x" ? "y" : "x";
}
function pi(e) {
  return e === "y" ? "height" : "width";
}
const bx = /* @__PURE__ */ new Set(["top", "bottom"]);
function Xe(e) {
  return bx.has(lt(e)) ? "y" : "x";
}
function hi(e) {
  return di(Xe(e));
}
function wx(e, t, r) {
  r === void 0 && (r = !1);
  const n = lr(e), o = hi(e), s = pi(o);
  let i = o === "x" ? n === (r ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = vn(i)), [i, vn(i)];
}
function xx(e) {
  const t = vn(e);
  return [js(e), t, js(t)];
}
function js(e) {
  return e.replace(/start|end/g, (t) => vx[t]);
}
const Wc = ["left", "right"], Vc = ["right", "left"], Sx = ["top", "bottom"], Ex = ["bottom", "top"];
function Px(e, t, r) {
  switch (e) {
    case "top":
    case "bottom":
      return r ? t ? Vc : Wc : t ? Wc : Vc;
    case "left":
    case "right":
      return t ? Sx : Ex;
    default:
      return [];
  }
}
function Ax(e, t, r, n) {
  const o = lr(e);
  let s = Px(lt(e), r === "start", n);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(js)))), s;
}
function vn(e) {
  return e.replace(/left|right|bottom|top/g, (t) => yx[t]);
}
function Cx(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Uu(e) {
  return typeof e != "number" ? Cx(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function bn(e) {
  const {
    x: t,
    y: r,
    width: n,
    height: o
  } = e;
  return {
    width: n,
    height: o,
    top: r,
    left: t,
    right: t + n,
    bottom: r + o,
    x: t,
    y: r
  };
}
function Gc(e, t, r) {
  let {
    reference: n,
    floating: o
  } = e;
  const s = Xe(t), i = hi(t), a = pi(i), l = lt(t), c = s === "y", u = n.x + n.width / 2 - o.width / 2, f = n.y + n.height / 2 - o.height / 2, m = n[a] / 2 - o[a] / 2;
  let h;
  switch (l) {
    case "top":
      h = {
        x: u,
        y: n.y - o.height
      };
      break;
    case "bottom":
      h = {
        x: u,
        y: n.y + n.height
      };
      break;
    case "right":
      h = {
        x: n.x + n.width,
        y: f
      };
      break;
    case "left":
      h = {
        x: n.x - o.width,
        y: f
      };
      break;
    default:
      h = {
        x: n.x,
        y: n.y
      };
  }
  switch (lr(t)) {
    case "start":
      h[i] -= m * (r && c ? -1 : 1);
      break;
    case "end":
      h[i] += m * (r && c ? -1 : 1);
      break;
  }
  return h;
}
const Rx = async (e, t, r) => {
  const {
    placement: n = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: i
  } = r, a = s.filter(Boolean), l = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let c = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: u,
    y: f
  } = Gc(c, n, l), m = n, h = {}, g = 0;
  for (let p = 0; p < a.length; p++) {
    const {
      name: d,
      fn: v
    } = a[p], {
      x: y,
      y: w,
      data: S,
      reset: P
    } = await v({
      x: u,
      y: f,
      initialPlacement: n,
      placement: m,
      strategy: o,
      middlewareData: h,
      rects: c,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = y ?? u, f = w ?? f, h = {
      ...h,
      [d]: {
        ...h[d],
        ...S
      }
    }, P && g <= 50 && (g++, typeof P == "object" && (P.placement && (m = P.placement), P.rects && (c = P.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : P.rects), {
      x: u,
      y: f
    } = Gc(c, m, l)), p = -1);
  }
  return {
    x: u,
    y: f,
    placement: m,
    strategy: o,
    middlewareData: h
  };
};
async function Nr(e, t) {
  var r;
  t === void 0 && (t = {});
  const {
    x: n,
    y: o,
    platform: s,
    rects: i,
    elements: a,
    strategy: l
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: f = "floating",
    altBoundary: m = !1,
    padding: h = 0
  } = ct(t, e), g = Uu(h), d = a[m ? f === "floating" ? "reference" : "floating" : f], v = bn(await s.getClippingRect({
    element: (r = await (s.isElement == null ? void 0 : s.isElement(d))) == null || r ? d : d.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
  })), y = f === "floating" ? {
    x: n,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, w = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), S = await (s.isElement == null ? void 0 : s.isElement(w)) ? await (s.getScale == null ? void 0 : s.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, P = bn(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: y,
    offsetParent: w,
    strategy: l
  }) : y);
  return {
    top: (v.top - P.top + g.top) / S.y,
    bottom: (P.bottom - v.bottom + g.bottom) / S.y,
    left: (v.left - P.left + g.left) / S.x,
    right: (P.right - v.right + g.right) / S.x
  };
}
const Tx = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: r,
      y: n,
      placement: o,
      rects: s,
      platform: i,
      elements: a,
      middlewareData: l
    } = t, {
      element: c,
      padding: u = 0
    } = ct(e, t) || {};
    if (c == null)
      return {};
    const f = Uu(u), m = {
      x: r,
      y: n
    }, h = hi(o), g = pi(h), p = await i.getDimensions(c), d = h === "y", v = d ? "top" : "left", y = d ? "bottom" : "right", w = d ? "clientHeight" : "clientWidth", S = s.reference[g] + s.reference[h] - m[h] - s.floating[g], P = m[h] - s.reference[h], T = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(c));
    let A = T ? T[w] : 0;
    (!A || !await (i.isElement == null ? void 0 : i.isElement(T))) && (A = a.floating[w] || s.floating[g]);
    const E = S / 2 - P / 2, I = A / 2 - p[g] / 2 - 1, j = wt(f[v], I), L = wt(f[y], I), D = j, X = A - p[g] - L, B = A / 2 - p[g] / 2 + E, Q = Ms(D, B, X), q = !l.arrow && lr(o) != null && B !== Q && s.reference[g] / 2 - (B < D ? j : L) - p[g] / 2 < 0, z = q ? B < D ? B - D : B - X : 0;
    return {
      [h]: m[h] + z,
      data: {
        [h]: Q,
        centerOffset: B - Q - z,
        ...q && {
          alignmentOffset: z
        }
      },
      reset: q
    };
  }
}), Ox = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var r, n;
      const {
        placement: o,
        middlewareData: s,
        rects: i,
        initialPlacement: a,
        platform: l,
        elements: c
      } = t, {
        mainAxis: u = !0,
        crossAxis: f = !0,
        fallbackPlacements: m,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: p = !0,
        ...d
      } = ct(e, t);
      if ((r = s.arrow) != null && r.alignmentOffset)
        return {};
      const v = lt(o), y = Xe(a), w = lt(a) === a, S = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), P = m || (w || !p ? [vn(a)] : xx(a)), T = g !== "none";
      !m && T && P.push(...Ax(a, p, g, S));
      const A = [a, ...P], E = await Nr(t, d), I = [];
      let j = ((n = s.flip) == null ? void 0 : n.overflows) || [];
      if (u && I.push(E[v]), f) {
        const B = wx(o, i, S);
        I.push(E[B[0]], E[B[1]]);
      }
      if (j = [...j, {
        placement: o,
        overflows: I
      }], !I.every((B) => B <= 0)) {
        var L, D;
        const B = (((L = s.flip) == null ? void 0 : L.index) || 0) + 1, Q = A[B];
        if (Q && (!(f === "alignment" ? y !== Xe(Q) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        j.every((R) => Xe(R.placement) === y ? R.overflows[0] > 0 : !0)))
          return {
            data: {
              index: B,
              overflows: j
            },
            reset: {
              placement: Q
            }
          };
        let q = (D = j.filter((z) => z.overflows[0] <= 0).sort((z, R) => z.overflows[1] - R.overflows[1])[0]) == null ? void 0 : D.placement;
        if (!q)
          switch (h) {
            case "bestFit": {
              var X;
              const z = (X = j.filter((R) => {
                if (T) {
                  const J = Xe(R.placement);
                  return J === y || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  J === "y";
                }
                return !0;
              }).map((R) => [R.placement, R.overflows.filter((J) => J > 0).reduce((J, N) => J + N, 0)]).sort((R, J) => R[1] - J[1])[0]) == null ? void 0 : X[0];
              z && (q = z);
              break;
            }
            case "initialPlacement":
              q = a;
              break;
          }
        if (o !== q)
          return {
            reset: {
              placement: q
            }
          };
      }
      return {};
    }
  };
};
function Kc(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Jc(e) {
  return gx.some((t) => e[t] >= 0);
}
const _x = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: r
      } = t, {
        strategy: n = "referenceHidden",
        ...o
      } = ct(e, t);
      switch (n) {
        case "referenceHidden": {
          const s = await Nr(t, {
            ...o,
            elementContext: "reference"
          }), i = Kc(s, r.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: Jc(i)
            }
          };
        }
        case "escaped": {
          const s = await Nr(t, {
            ...o,
            altBoundary: !0
          }), i = Kc(s, r.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: Jc(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Hu = /* @__PURE__ */ new Set(["left", "top"]);
async function Nx(e, t) {
  const {
    placement: r,
    platform: n,
    elements: o
  } = e, s = await (n.isRTL == null ? void 0 : n.isRTL(o.floating)), i = lt(r), a = lr(r), l = Xe(r) === "y", c = Hu.has(i) ? -1 : 1, u = s && l ? -1 : 1, f = ct(t, e);
  let {
    mainAxis: m,
    crossAxis: h,
    alignmentAxis: g
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return a && typeof g == "number" && (h = a === "end" ? g * -1 : g), l ? {
    x: h * u,
    y: m * c
  } : {
    x: m * c,
    y: h * u
  };
}
const kx = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var r, n;
      const {
        x: o,
        y: s,
        placement: i,
        middlewareData: a
      } = t, l = await Nx(t, e);
      return i === ((r = a.offset) == null ? void 0 : r.placement) && (n = a.arrow) != null && n.alignmentOffset ? {} : {
        x: o + l.x,
        y: s + l.y,
        data: {
          ...l,
          placement: i
        }
      };
    }
  };
}, Ix = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: r,
        y: n,
        placement: o
      } = t, {
        mainAxis: s = !0,
        crossAxis: i = !1,
        limiter: a = {
          fn: (d) => {
            let {
              x: v,
              y
            } = d;
            return {
              x: v,
              y
            };
          }
        },
        ...l
      } = ct(e, t), c = {
        x: r,
        y: n
      }, u = await Nr(t, l), f = Xe(lt(o)), m = di(f);
      let h = c[m], g = c[f];
      if (s) {
        const d = m === "y" ? "top" : "left", v = m === "y" ? "bottom" : "right", y = h + u[d], w = h - u[v];
        h = Ms(y, h, w);
      }
      if (i) {
        const d = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", y = g + u[d], w = g - u[v];
        g = Ms(y, g, w);
      }
      const p = a.fn({
        ...t,
        [m]: h,
        [f]: g
      });
      return {
        ...p,
        data: {
          x: p.x - r,
          y: p.y - n,
          enabled: {
            [m]: s,
            [f]: i
          }
        }
      };
    }
  };
}, Mx = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: r,
        y: n,
        placement: o,
        rects: s,
        middlewareData: i
      } = t, {
        offset: a = 0,
        mainAxis: l = !0,
        crossAxis: c = !0
      } = ct(e, t), u = {
        x: r,
        y: n
      }, f = Xe(o), m = di(f);
      let h = u[m], g = u[f];
      const p = ct(a, t), d = typeof p == "number" ? {
        mainAxis: p,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...p
      };
      if (l) {
        const w = m === "y" ? "height" : "width", S = s.reference[m] - s.floating[w] + d.mainAxis, P = s.reference[m] + s.reference[w] - d.mainAxis;
        h < S ? h = S : h > P && (h = P);
      }
      if (c) {
        var v, y;
        const w = m === "y" ? "width" : "height", S = Hu.has(lt(o)), P = s.reference[f] - s.floating[w] + (S && ((v = i.offset) == null ? void 0 : v[f]) || 0) + (S ? 0 : d.crossAxis), T = s.reference[f] + s.reference[w] + (S ? 0 : ((y = i.offset) == null ? void 0 : y[f]) || 0) - (S ? d.crossAxis : 0);
        g < P ? g = P : g > T && (g = T);
      }
      return {
        [m]: h,
        [f]: g
      };
    }
  };
}, jx = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var r, n;
      const {
        placement: o,
        rects: s,
        platform: i,
        elements: a
      } = t, {
        apply: l = () => {
        },
        ...c
      } = ct(e, t), u = await Nr(t, c), f = lt(o), m = lr(o), h = Xe(o) === "y", {
        width: g,
        height: p
      } = s.floating;
      let d, v;
      f === "top" || f === "bottom" ? (d = f, v = m === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (v = f, d = m === "end" ? "top" : "bottom");
      const y = p - u.top - u.bottom, w = g - u.left - u.right, S = wt(p - u[d], y), P = wt(g - u[v], w), T = !t.middlewareData.shift;
      let A = S, E = P;
      if ((r = t.middlewareData.shift) != null && r.enabled.x && (E = w), (n = t.middlewareData.shift) != null && n.enabled.y && (A = y), T && !m) {
        const j = Ie(u.left, 0), L = Ie(u.right, 0), D = Ie(u.top, 0), X = Ie(u.bottom, 0);
        h ? E = g - 2 * (j !== 0 || L !== 0 ? j + L : Ie(u.left, u.right)) : A = p - 2 * (D !== 0 || X !== 0 ? D + X : Ie(u.top, u.bottom));
      }
      await l({
        ...t,
        availableWidth: E,
        availableHeight: A
      });
      const I = await i.getDimensions(a.floating);
      return g !== I.width || p !== I.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Fn() {
  return typeof window < "u";
}
function ur(e) {
  return zu(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Me(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function tt(e) {
  var t;
  return (t = (zu(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function zu(e) {
  return Fn() ? e instanceof Node || e instanceof Me(e).Node : !1;
}
function He(e) {
  return Fn() ? e instanceof Element || e instanceof Me(e).Element : !1;
}
function Ze(e) {
  return Fn() ? e instanceof HTMLElement || e instanceof Me(e).HTMLElement : !1;
}
function Xc(e) {
  return !Fn() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Me(e).ShadowRoot;
}
const Dx = /* @__PURE__ */ new Set(["inline", "contents"]);
function Fr(e) {
  const {
    overflow: t,
    overflowX: r,
    overflowY: n,
    display: o
  } = ze(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + n + r) && !Dx.has(o);
}
const Fx = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Lx(e) {
  return Fx.has(ur(e));
}
const $x = [":popover-open", ":modal"];
function Ln(e) {
  return $x.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Bx = ["transform", "translate", "scale", "rotate", "perspective"], qx = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Ux = ["paint", "layout", "strict", "content"];
function mi(e) {
  const t = gi(), r = He(e) ? ze(e) : e;
  return Bx.some((n) => r[n] ? r[n] !== "none" : !1) || (r.containerType ? r.containerType !== "normal" : !1) || !t && (r.backdropFilter ? r.backdropFilter !== "none" : !1) || !t && (r.filter ? r.filter !== "none" : !1) || qx.some((n) => (r.willChange || "").includes(n)) || Ux.some((n) => (r.contain || "").includes(n));
}
function Hx(e) {
  let t = xt(e);
  for (; Ze(t) && !tr(t); ) {
    if (mi(t))
      return t;
    if (Ln(t))
      return null;
    t = xt(t);
  }
  return null;
}
function gi() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const zx = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function tr(e) {
  return zx.has(ur(e));
}
function ze(e) {
  return Me(e).getComputedStyle(e);
}
function $n(e) {
  return He(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function xt(e) {
  if (ur(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Xc(e) && e.host || // Fallback.
    tt(e)
  );
  return Xc(t) ? t.host : t;
}
function Wu(e) {
  const t = xt(e);
  return tr(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ze(t) && Fr(t) ? t : Wu(t);
}
function kr(e, t, r) {
  var n;
  t === void 0 && (t = []), r === void 0 && (r = !0);
  const o = Wu(e), s = o === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Me(o);
  if (s) {
    const a = Ds(i);
    return t.concat(i, i.visualViewport || [], Fr(o) ? o : [], a && r ? kr(a) : []);
  }
  return t.concat(o, kr(o, [], r));
}
function Ds(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Vu(e) {
  const t = ze(e);
  let r = parseFloat(t.width) || 0, n = parseFloat(t.height) || 0;
  const o = Ze(e), s = o ? e.offsetWidth : r, i = o ? e.offsetHeight : n, a = yn(r) !== s || yn(n) !== i;
  return a && (r = s, n = i), {
    width: r,
    height: n,
    $: a
  };
}
function yi(e) {
  return He(e) ? e : e.contextElement;
}
function Kt(e) {
  const t = yi(e);
  if (!Ze(t))
    return Ye(1);
  const r = t.getBoundingClientRect(), {
    width: n,
    height: o,
    $: s
  } = Vu(t);
  let i = (s ? yn(r.width) : r.width) / n, a = (s ? yn(r.height) : r.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const Wx = /* @__PURE__ */ Ye(0);
function Gu(e) {
  const t = Me(e);
  return !gi() || !t.visualViewport ? Wx : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Vx(e, t, r) {
  return t === void 0 && (t = !1), !r || t && r !== Me(e) ? !1 : t;
}
function Mt(e, t, r, n) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  const o = e.getBoundingClientRect(), s = yi(e);
  let i = Ye(1);
  t && (n ? He(n) && (i = Kt(n)) : i = Kt(e));
  const a = Vx(s, r, n) ? Gu(s) : Ye(0);
  let l = (o.left + a.x) / i.x, c = (o.top + a.y) / i.y, u = o.width / i.x, f = o.height / i.y;
  if (s) {
    const m = Me(s), h = n && He(n) ? Me(n) : n;
    let g = m, p = Ds(g);
    for (; p && n && h !== g; ) {
      const d = Kt(p), v = p.getBoundingClientRect(), y = ze(p), w = v.left + (p.clientLeft + parseFloat(y.paddingLeft)) * d.x, S = v.top + (p.clientTop + parseFloat(y.paddingTop)) * d.y;
      l *= d.x, c *= d.y, u *= d.x, f *= d.y, l += w, c += S, g = Me(p), p = Ds(g);
    }
  }
  return bn({
    width: u,
    height: f,
    x: l,
    y: c
  });
}
function Bn(e, t) {
  const r = $n(e).scrollLeft;
  return t ? t.left + r : Mt(tt(e)).left + r;
}
function Ku(e, t) {
  const r = e.getBoundingClientRect(), n = r.left + t.scrollLeft - Bn(e, r), o = r.top + t.scrollTop;
  return {
    x: n,
    y: o
  };
}
function Gx(e) {
  let {
    elements: t,
    rect: r,
    offsetParent: n,
    strategy: o
  } = e;
  const s = o === "fixed", i = tt(n), a = t ? Ln(t.floating) : !1;
  if (n === i || a && s)
    return r;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = Ye(1);
  const u = Ye(0), f = Ze(n);
  if ((f || !f && !s) && ((ur(n) !== "body" || Fr(i)) && (l = $n(n)), Ze(n))) {
    const h = Mt(n);
    c = Kt(n), u.x = h.x + n.clientLeft, u.y = h.y + n.clientTop;
  }
  const m = i && !f && !s ? Ku(i, l) : Ye(0);
  return {
    width: r.width * c.x,
    height: r.height * c.y,
    x: r.x * c.x - l.scrollLeft * c.x + u.x + m.x,
    y: r.y * c.y - l.scrollTop * c.y + u.y + m.y
  };
}
function Kx(e) {
  return Array.from(e.getClientRects());
}
function Jx(e) {
  const t = tt(e), r = $n(e), n = e.ownerDocument.body, o = Ie(t.scrollWidth, t.clientWidth, n.scrollWidth, n.clientWidth), s = Ie(t.scrollHeight, t.clientHeight, n.scrollHeight, n.clientHeight);
  let i = -r.scrollLeft + Bn(e);
  const a = -r.scrollTop;
  return ze(n).direction === "rtl" && (i += Ie(t.clientWidth, n.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const Yc = 25;
function Xx(e, t) {
  const r = Me(e), n = tt(e), o = r.visualViewport;
  let s = n.clientWidth, i = n.clientHeight, a = 0, l = 0;
  if (o) {
    s = o.width, i = o.height;
    const u = gi();
    (!u || u && t === "fixed") && (a = o.offsetLeft, l = o.offsetTop);
  }
  const c = Bn(n);
  if (c <= 0) {
    const u = n.ownerDocument, f = u.body, m = getComputedStyle(f), h = u.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, g = Math.abs(n.clientWidth - f.clientWidth - h);
    g <= Yc && (s -= g);
  } else c <= Yc && (s += c);
  return {
    width: s,
    height: i,
    x: a,
    y: l
  };
}
const Yx = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Qx(e, t) {
  const r = Mt(e, !0, t === "fixed"), n = r.top + e.clientTop, o = r.left + e.clientLeft, s = Ze(e) ? Kt(e) : Ye(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, l = o * s.x, c = n * s.y;
  return {
    width: i,
    height: a,
    x: l,
    y: c
  };
}
function Qc(e, t, r) {
  let n;
  if (t === "viewport")
    n = Xx(e, r);
  else if (t === "document")
    n = Jx(tt(e));
  else if (He(t))
    n = Qx(t, r);
  else {
    const o = Gu(e);
    n = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return bn(n);
}
function Ju(e, t) {
  const r = xt(e);
  return r === t || !He(r) || tr(r) ? !1 : ze(r).position === "fixed" || Ju(r, t);
}
function Zx(e, t) {
  const r = t.get(e);
  if (r)
    return r;
  let n = kr(e, [], !1).filter((a) => He(a) && ur(a) !== "body"), o = null;
  const s = ze(e).position === "fixed";
  let i = s ? xt(e) : e;
  for (; He(i) && !tr(i); ) {
    const a = ze(i), l = mi(i);
    !l && a.position === "fixed" && (o = null), (s ? !l && !o : !l && a.position === "static" && !!o && Yx.has(o.position) || Fr(i) && !l && Ju(e, i)) ? n = n.filter((u) => u !== i) : o = a, i = xt(i);
  }
  return t.set(e, n), n;
}
function eS(e) {
  let {
    element: t,
    boundary: r,
    rootBoundary: n,
    strategy: o
  } = e;
  const i = [...r === "clippingAncestors" ? Ln(t) ? [] : Zx(t, this._c) : [].concat(r), n], a = i[0], l = i.reduce((c, u) => {
    const f = Qc(t, u, o);
    return c.top = Ie(f.top, c.top), c.right = wt(f.right, c.right), c.bottom = wt(f.bottom, c.bottom), c.left = Ie(f.left, c.left), c;
  }, Qc(t, a, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function tS(e) {
  const {
    width: t,
    height: r
  } = Vu(e);
  return {
    width: t,
    height: r
  };
}
function rS(e, t, r) {
  const n = Ze(t), o = tt(t), s = r === "fixed", i = Mt(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = Ye(0);
  function c() {
    l.x = Bn(o);
  }
  if (n || !n && !s)
    if ((ur(t) !== "body" || Fr(o)) && (a = $n(t)), n) {
      const h = Mt(t, !0, s, t);
      l.x = h.x + t.clientLeft, l.y = h.y + t.clientTop;
    } else o && c();
  s && !n && o && c();
  const u = o && !n && !s ? Ku(o, a) : Ye(0), f = i.left + a.scrollLeft - l.x - u.x, m = i.top + a.scrollTop - l.y - u.y;
  return {
    x: f,
    y: m,
    width: i.width,
    height: i.height
  };
}
function as(e) {
  return ze(e).position === "static";
}
function Zc(e, t) {
  if (!Ze(e) || ze(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let r = e.offsetParent;
  return tt(e) === r && (r = r.ownerDocument.body), r;
}
function Xu(e, t) {
  const r = Me(e);
  if (Ln(e))
    return r;
  if (!Ze(e)) {
    let o = xt(e);
    for (; o && !tr(o); ) {
      if (He(o) && !as(o))
        return o;
      o = xt(o);
    }
    return r;
  }
  let n = Zc(e, t);
  for (; n && Lx(n) && as(n); )
    n = Zc(n, t);
  return n && tr(n) && as(n) && !mi(n) ? r : n || Hx(e) || r;
}
const nS = async function(e) {
  const t = this.getOffsetParent || Xu, r = this.getDimensions, n = await r(e.floating);
  return {
    reference: rS(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: n.width,
      height: n.height
    }
  };
};
function oS(e) {
  return ze(e).direction === "rtl";
}
const sS = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Gx,
  getDocumentElement: tt,
  getClippingRect: eS,
  getOffsetParent: Xu,
  getElementRects: nS,
  getClientRects: Kx,
  getDimensions: tS,
  getScale: Kt,
  isElement: He,
  isRTL: oS
};
function Yu(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function iS(e, t) {
  let r = null, n;
  const o = tt(e);
  function s() {
    var a;
    clearTimeout(n), (a = r) == null || a.disconnect(), r = null;
  }
  function i(a, l) {
    a === void 0 && (a = !1), l === void 0 && (l = 1), s();
    const c = e.getBoundingClientRect(), {
      left: u,
      top: f,
      width: m,
      height: h
    } = c;
    if (a || t(), !m || !h)
      return;
    const g = Kr(f), p = Kr(o.clientWidth - (u + m)), d = Kr(o.clientHeight - (f + h)), v = Kr(u), w = {
      rootMargin: -g + "px " + -p + "px " + -d + "px " + -v + "px",
      threshold: Ie(0, wt(1, l)) || 1
    };
    let S = !0;
    function P(T) {
      const A = T[0].intersectionRatio;
      if (A !== l) {
        if (!S)
          return i();
        A ? i(!1, A) : n = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      A === 1 && !Yu(c, e.getBoundingClientRect()) && i(), S = !1;
    }
    try {
      r = new IntersectionObserver(P, {
        ...w,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      r = new IntersectionObserver(P, w);
    }
    r.observe(e);
  }
  return i(!0), s;
}
function aS(e, t, r, n) {
  n === void 0 && (n = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = n, c = yi(e), u = o || s ? [...c ? kr(c) : [], ...kr(t)] : [];
  u.forEach((v) => {
    o && v.addEventListener("scroll", r, {
      passive: !0
    }), s && v.addEventListener("resize", r);
  });
  const f = c && a ? iS(c, r) : null;
  let m = -1, h = null;
  i && (h = new ResizeObserver((v) => {
    let [y] = v;
    y && y.target === c && h && (h.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var w;
      (w = h) == null || w.observe(t);
    })), r();
  }), c && !l && h.observe(c), h.observe(t));
  let g, p = l ? Mt(e) : null;
  l && d();
  function d() {
    const v = Mt(e);
    p && !Yu(p, v) && r(), p = v, g = requestAnimationFrame(d);
  }
  return r(), () => {
    var v;
    u.forEach((y) => {
      o && y.removeEventListener("scroll", r), s && y.removeEventListener("resize", r);
    }), f == null || f(), (v = h) == null || v.disconnect(), h = null, l && cancelAnimationFrame(g);
  };
}
const cS = kx, lS = Ix, uS = Ox, fS = jx, dS = _x, el = Tx, pS = Mx, hS = (e, t, r) => {
  const n = /* @__PURE__ */ new Map(), o = {
    platform: sS,
    ...r
  }, s = {
    ...o.platform,
    _c: n
  };
  return Rx(e, t, {
    ...o,
    platform: s
  });
};
var mS = typeof document < "u", gS = function() {
}, an = mS ? ll : gS;
function wn(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let r, n, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (r = e.length, r !== t.length) return !1;
      for (n = r; n-- !== 0; )
        if (!wn(e[n], t[n]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), r = o.length, r !== Object.keys(t).length)
      return !1;
    for (n = r; n-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[n]))
        return !1;
    for (n = r; n-- !== 0; ) {
      const s = o[n];
      if (!(s === "_owner" && e.$$typeof) && !wn(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Qu(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function tl(e, t) {
  const r = Qu(e);
  return Math.round(t * r) / r;
}
function cs(e) {
  const t = b.useRef(e);
  return an(() => {
    t.current = e;
  }), t;
}
function yS(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: r = "absolute",
    middleware: n = [],
    platform: o,
    elements: {
      reference: s,
      floating: i
    } = {},
    transform: a = !0,
    whileElementsMounted: l,
    open: c
  } = e, [u, f] = b.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [m, h] = b.useState(n);
  wn(m, n) || h(n);
  const [g, p] = b.useState(null), [d, v] = b.useState(null), y = b.useCallback((R) => {
    R !== T.current && (T.current = R, p(R));
  }, []), w = b.useCallback((R) => {
    R !== A.current && (A.current = R, v(R));
  }, []), S = s || g, P = i || d, T = b.useRef(null), A = b.useRef(null), E = b.useRef(u), I = l != null, j = cs(l), L = cs(o), D = cs(c), X = b.useCallback(() => {
    if (!T.current || !A.current)
      return;
    const R = {
      placement: t,
      strategy: r,
      middleware: m
    };
    L.current && (R.platform = L.current), hS(T.current, A.current, R).then((J) => {
      const N = {
        ...J,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: D.current !== !1
      };
      B.current && !wn(E.current, N) && (E.current = N, En.flushSync(() => {
        f(N);
      }));
    });
  }, [m, t, r, L, D]);
  an(() => {
    c === !1 && E.current.isPositioned && (E.current.isPositioned = !1, f((R) => ({
      ...R,
      isPositioned: !1
    })));
  }, [c]);
  const B = b.useRef(!1);
  an(() => (B.current = !0, () => {
    B.current = !1;
  }), []), an(() => {
    if (S && (T.current = S), P && (A.current = P), S && P) {
      if (j.current)
        return j.current(S, P, X);
      X();
    }
  }, [S, P, X, j, I]);
  const Q = b.useMemo(() => ({
    reference: T,
    floating: A,
    setReference: y,
    setFloating: w
  }), [y, w]), q = b.useMemo(() => ({
    reference: S,
    floating: P
  }), [S, P]), z = b.useMemo(() => {
    const R = {
      position: r,
      left: 0,
      top: 0
    };
    if (!q.floating)
      return R;
    const J = tl(q.floating, u.x), N = tl(q.floating, u.y);
    return a ? {
      ...R,
      transform: "translate(" + J + "px, " + N + "px)",
      ...Qu(q.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: J,
      top: N
    };
  }, [r, a, q.floating, u.x, u.y]);
  return b.useMemo(() => ({
    ...u,
    update: X,
    refs: Q,
    elements: q,
    floatingStyles: z
  }), [u, X, Q, q, z]);
}
const vS = (e) => {
  function t(r) {
    return {}.hasOwnProperty.call(r, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(r) {
      const {
        element: n,
        padding: o
      } = typeof e == "function" ? e(r) : e;
      return n && t(n) ? n.current != null ? el({
        element: n.current,
        padding: o
      }).fn(r) : {} : n ? el({
        element: n,
        padding: o
      }).fn(r) : {};
    }
  };
}, bS = (e, t) => ({
  ...cS(e),
  options: [e, t]
}), wS = (e, t) => ({
  ...lS(e),
  options: [e, t]
}), xS = (e, t) => ({
  ...pS(e),
  options: [e, t]
}), SS = (e, t) => ({
  ...uS(e),
  options: [e, t]
}), ES = (e, t) => ({
  ...fS(e),
  options: [e, t]
}), PS = (e, t) => ({
  ...dS(e),
  options: [e, t]
}), AS = (e, t) => ({
  ...vS(e),
  options: [e, t]
});
var CS = "Arrow", Zu = b.forwardRef((e, t) => {
  const { children: r, width: n = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ x.jsx(
    me.svg,
    {
      ...s,
      ref: t,
      width: n,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? r : /* @__PURE__ */ x.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Zu.displayName = CS;
var RS = Zu;
function TS(e) {
  const [t, r] = b.useState(void 0);
  return Ae(() => {
    if (e) {
      r({ width: e.offsetWidth, height: e.offsetHeight });
      const n = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const s = o[0];
        let i, a;
        if ("borderBoxSize" in s) {
          const l = s.borderBoxSize, c = Array.isArray(l) ? l[0] : l;
          i = c.inlineSize, a = c.blockSize;
        } else
          i = e.offsetWidth, a = e.offsetHeight;
        r({ width: i, height: a });
      });
      return n.observe(e, { box: "border-box" }), () => n.unobserve(e);
    } else
      r(void 0);
  }, [e]), t;
}
var vi = "Popper", [ef, qn] = jn(vi), [OS, tf] = ef(vi), rf = (e) => {
  const { __scopePopper: t, children: r } = e, [n, o] = b.useState(null);
  return /* @__PURE__ */ x.jsx(OS, { scope: t, anchor: n, onAnchorChange: o, children: r });
};
rf.displayName = vi;
var nf = "PopperAnchor", of = b.forwardRef(
  (e, t) => {
    const { __scopePopper: r, virtualRef: n, ...o } = e, s = tf(nf, r), i = b.useRef(null), a = xe(t, i), l = b.useRef(null);
    return b.useEffect(() => {
      const c = l.current;
      l.current = (n == null ? void 0 : n.current) || i.current, c !== l.current && s.onAnchorChange(l.current);
    }), n ? null : /* @__PURE__ */ x.jsx(me.div, { ...o, ref: a });
  }
);
of.displayName = nf;
var bi = "PopperContent", [_S, NS] = ef(bi), sf = b.forwardRef(
  (e, t) => {
    var k, $, H, M, F, K;
    const {
      __scopePopper: r,
      side: n = "bottom",
      sideOffset: o = 0,
      align: s = "center",
      alignOffset: i = 0,
      arrowPadding: a = 0,
      avoidCollisions: l = !0,
      collisionBoundary: c = [],
      collisionPadding: u = 0,
      sticky: f = "partial",
      hideWhenDetached: m = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: g,
      ...p
    } = e, d = tf(bi, r), [v, y] = b.useState(null), w = xe(t, (ee) => y(ee)), [S, P] = b.useState(null), T = TS(S), A = (T == null ? void 0 : T.width) ?? 0, E = (T == null ? void 0 : T.height) ?? 0, I = n + (s !== "center" ? "-" + s : ""), j = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, L = Array.isArray(c) ? c : [c], D = L.length > 0, X = {
      padding: j,
      boundary: L.filter(IS),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: D
    }, { refs: B, floatingStyles: Q, placement: q, isPositioned: z, middlewareData: R } = yS({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: I,
      whileElementsMounted: (...ee) => aS(...ee, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: d.anchor
      },
      middleware: [
        bS({ mainAxis: o + E, alignmentAxis: i }),
        l && wS({
          mainAxis: !0,
          crossAxis: !1,
          limiter: f === "partial" ? xS() : void 0,
          ...X
        }),
        l && SS({ ...X }),
        ES({
          ...X,
          apply: ({ elements: ee, rects: le, availableWidth: ve, availableHeight: ge }) => {
            const { width: we, height: Re } = le.reference, je = ee.floating.style;
            je.setProperty("--radix-popper-available-width", `${ve}px`), je.setProperty("--radix-popper-available-height", `${ge}px`), je.setProperty("--radix-popper-anchor-width", `${we}px`), je.setProperty("--radix-popper-anchor-height", `${Re}px`);
          }
        }),
        S && AS({ element: S, padding: a }),
        MS({ arrowWidth: A, arrowHeight: E }),
        m && PS({ strategy: "referenceHidden", ...X })
      ]
    }), [J, N] = lf(q), U = It(g);
    Ae(() => {
      z && (U == null || U());
    }, [z, U]);
    const Z = (k = R.arrow) == null ? void 0 : k.x, Y = ($ = R.arrow) == null ? void 0 : $.y, W = ((H = R.arrow) == null ? void 0 : H.centerOffset) !== 0, [re, ie] = b.useState();
    return Ae(() => {
      v && ie(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ x.jsx(
      "div",
      {
        ref: B.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...Q,
          transform: z ? Q.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: re,
          "--radix-popper-transform-origin": [
            (M = R.transformOrigin) == null ? void 0 : M.x,
            (F = R.transformOrigin) == null ? void 0 : F.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((K = R.hide) == null ? void 0 : K.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ x.jsx(
          _S,
          {
            scope: r,
            placedSide: J,
            onArrowChange: P,
            arrowX: Z,
            arrowY: Y,
            shouldHideArrow: W,
            children: /* @__PURE__ */ x.jsx(
              me.div,
              {
                "data-side": J,
                "data-align": N,
                ...p,
                ref: w,
                style: {
                  ...p.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: z ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
sf.displayName = bi;
var af = "PopperArrow", kS = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, cf = b.forwardRef(function(t, r) {
  const { __scopePopper: n, ...o } = t, s = NS(af, n), i = kS[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ x.jsx(
      "span",
      {
        ref: s.onArrowChange,
        style: {
          position: "absolute",
          left: s.arrowX,
          top: s.arrowY,
          [i]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[s.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[s.placedSide],
          visibility: s.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ x.jsx(
          RS,
          {
            ...o,
            ref: r,
            style: {
              ...o.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
cf.displayName = af;
function IS(e) {
  return e !== null;
}
var MS = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var d, v, y;
    const { placement: r, rects: n, middlewareData: o } = t, i = ((d = o.arrow) == null ? void 0 : d.centerOffset) !== 0, a = i ? 0 : e.arrowWidth, l = i ? 0 : e.arrowHeight, [c, u] = lf(r), f = { start: "0%", center: "50%", end: "100%" }[u], m = (((v = o.arrow) == null ? void 0 : v.x) ?? 0) + a / 2, h = (((y = o.arrow) == null ? void 0 : y.y) ?? 0) + l / 2;
    let g = "", p = "";
    return c === "bottom" ? (g = i ? f : `${m}px`, p = `${-l}px`) : c === "top" ? (g = i ? f : `${m}px`, p = `${n.floating.height + l}px`) : c === "right" ? (g = `${-l}px`, p = i ? f : `${h}px`) : c === "left" && (g = `${n.floating.width + l}px`, p = i ? f : `${h}px`), { data: { x: g, y: p } };
  }
});
function lf(e) {
  const [t, r = "center"] = e.split("-");
  return [t, r];
}
var uf = rf, wi = of, ff = sf, df = cf, jS = "Portal", xi = b.forwardRef((e, t) => {
  var a;
  const { container: r, ...n } = e, [o, s] = b.useState(!1);
  Ae(() => s(!0), []);
  const i = r || o && ((a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : a.body);
  return i ? md.createPortal(/* @__PURE__ */ x.jsx(me.div, { ...n, ref: t }), i) : null;
});
xi.displayName = jS;
function DS(e, t) {
  return b.useReducer((r, n) => t[r][n] ?? r, e);
}
var Si = (e) => {
  const { present: t, children: r } = e, n = FS(t), o = typeof r == "function" ? r({ present: n.isPresent }) : b.Children.only(r), s = xe(n.ref, LS(o));
  return typeof r == "function" || n.isPresent ? b.cloneElement(o, { ref: s }) : null;
};
Si.displayName = "Presence";
function FS(e) {
  const [t, r] = b.useState(), n = b.useRef(null), o = b.useRef(e), s = b.useRef("none"), i = e ? "mounted" : "unmounted", [a, l] = DS(i, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return b.useEffect(() => {
    const c = Jr(n.current);
    s.current = a === "mounted" ? c : "none";
  }, [a]), Ae(() => {
    const c = n.current, u = o.current;
    if (u !== e) {
      const m = s.current, h = Jr(c);
      e ? l("MOUNT") : h === "none" || (c == null ? void 0 : c.display) === "none" ? l("UNMOUNT") : l(u && m !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), Ae(() => {
    if (t) {
      let c;
      const u = t.ownerDocument.defaultView ?? window, f = (h) => {
        const p = Jr(n.current).includes(CSS.escape(h.animationName));
        if (h.target === t && p && (l("ANIMATION_END"), !o.current)) {
          const d = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = d);
          });
        }
      }, m = (h) => {
        h.target === t && (s.current = Jr(n.current));
      };
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        u.clearTimeout(c), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(a),
    ref: b.useCallback((c) => {
      n.current = c ? getComputedStyle(c) : null, r(c);
    }, [])
  };
}
function Jr(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function LS(e) {
  var n, o;
  let t = (n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : n.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var $S = b[" useInsertionEffect ".trim().toString()] || Ae;
function Fs({
  prop: e,
  defaultProp: t,
  onChange: r = () => {
  },
  caller: n
}) {
  const [o, s, i] = BS({
    defaultProp: t,
    onChange: r
  }), a = e !== void 0, l = a ? e : o;
  {
    const u = b.useRef(e !== void 0);
    b.useEffect(() => {
      const f = u.current;
      f !== a && console.warn(
        `${n} is changing from ${f ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = a;
    }, [a, n]);
  }
  const c = b.useCallback(
    (u) => {
      var f;
      if (a) {
        const m = qS(u) ? u(e) : u;
        m !== e && ((f = i.current) == null || f.call(i, m));
      } else
        s(u);
    },
    [a, e, s, i]
  );
  return [l, c];
}
function BS({
  defaultProp: e,
  onChange: t
}) {
  const [r, n] = b.useState(e), o = b.useRef(r), s = b.useRef(t);
  return $S(() => {
    s.current = t;
  }, [t]), b.useEffect(() => {
    var i;
    o.current !== r && ((i = s.current) == null || i.call(s, r), o.current = r);
  }, [r, o]), [r, n, s];
}
function qS(e) {
  return typeof e == "function";
}
var US = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Wt = /* @__PURE__ */ new WeakMap(), Xr = /* @__PURE__ */ new WeakMap(), Yr = {}, ls = 0, pf = function(e) {
  return e && (e.host || pf(e.parentNode));
}, HS = function(e, t) {
  return t.map(function(r) {
    if (e.contains(r))
      return r;
    var n = pf(r);
    return n && e.contains(n) ? n : (console.error("aria-hidden", r, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, zS = function(e, t, r, n) {
  var o = HS(t, Array.isArray(e) ? e : [e]);
  Yr[r] || (Yr[r] = /* @__PURE__ */ new WeakMap());
  var s = Yr[r], i = [], a = /* @__PURE__ */ new Set(), l = new Set(o), c = function(f) {
    !f || a.has(f) || (a.add(f), c(f.parentNode));
  };
  o.forEach(c);
  var u = function(f) {
    !f || l.has(f) || Array.prototype.forEach.call(f.children, function(m) {
      if (a.has(m))
        u(m);
      else
        try {
          var h = m.getAttribute(n), g = h !== null && h !== "false", p = (Wt.get(m) || 0) + 1, d = (s.get(m) || 0) + 1;
          Wt.set(m, p), s.set(m, d), i.push(m), p === 1 && g && Xr.set(m, !0), d === 1 && m.setAttribute(r, "true"), g || m.setAttribute(n, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", m, v);
        }
    });
  };
  return u(t), a.clear(), ls++, function() {
    i.forEach(function(f) {
      var m = Wt.get(f) - 1, h = s.get(f) - 1;
      Wt.set(f, m), s.set(f, h), m || (Xr.has(f) || f.removeAttribute(n), Xr.delete(f)), h || f.removeAttribute(r);
    }), ls--, ls || (Wt = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new WeakMap(), Xr = /* @__PURE__ */ new WeakMap(), Yr = {});
  };
}, hf = function(e, t, r) {
  r === void 0 && (r = "data-aria-hidden");
  var n = Array.from(Array.isArray(e) ? e : [e]), o = US(e);
  return o ? (n.push.apply(n, Array.from(o.querySelectorAll("[aria-live], script"))), zS(n, o, r, "aria-hidden")) : function() {
    return null;
  };
}, Je = function() {
  return Je = Object.assign || function(t) {
    for (var r, n = 1, o = arguments.length; n < o; n++) {
      r = arguments[n];
      for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (t[s] = r[s]);
    }
    return t;
  }, Je.apply(this, arguments);
};
function mf(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
      t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
  return r;
}
function WS(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, o = t.length, s; n < o; n++)
    (s || !(n in t)) && (s || (s = Array.prototype.slice.call(t, 0, n)), s[n] = t[n]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var cn = "right-scroll-bar-position", ln = "width-before-scroll-bar", VS = "with-scroll-bars-hidden", GS = "--removed-body-scroll-bar-size";
function us(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function KS(e, t) {
  var r = Ee(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return r.value;
        },
        set current(n) {
          var o = r.value;
          o !== n && (r.value = n, r.callback(n, o));
        }
      }
    };
  })[0];
  return r.callback = t, r.facade;
}
var JS = typeof window < "u" ? b.useLayoutEffect : b.useEffect, rl = /* @__PURE__ */ new WeakMap();
function XS(e, t) {
  var r = KS(null, function(n) {
    return e.forEach(function(o) {
      return us(o, n);
    });
  });
  return JS(function() {
    var n = rl.get(r);
    if (n) {
      var o = new Set(n), s = new Set(e), i = r.current;
      o.forEach(function(a) {
        s.has(a) || us(a, null);
      }), s.forEach(function(a) {
        o.has(a) || us(a, i);
      });
    }
    rl.set(r, e);
  }, [e]), r;
}
function YS(e) {
  return e;
}
function QS(e, t) {
  t === void 0 && (t = YS);
  var r = [], n = !1, o = {
    read: function() {
      if (n)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return r.length ? r[r.length - 1] : e;
    },
    useMedium: function(s) {
      var i = t(s, n);
      return r.push(i), function() {
        r = r.filter(function(a) {
          return a !== i;
        });
      };
    },
    assignSyncMedium: function(s) {
      for (n = !0; r.length; ) {
        var i = r;
        r = [], i.forEach(s);
      }
      r = {
        push: function(a) {
          return s(a);
        },
        filter: function() {
          return r;
        }
      };
    },
    assignMedium: function(s) {
      n = !0;
      var i = [];
      if (r.length) {
        var a = r;
        r = [], a.forEach(s), i = r;
      }
      var l = function() {
        var u = i;
        i = [], u.forEach(s);
      }, c = function() {
        return Promise.resolve().then(l);
      };
      c(), r = {
        push: function(u) {
          i.push(u), c();
        },
        filter: function(u) {
          return i = i.filter(u), r;
        }
      };
    }
  };
  return o;
}
function ZS(e) {
  e === void 0 && (e = {});
  var t = QS(null);
  return t.options = Je({ async: !0, ssr: !1 }, e), t;
}
var gf = function(e) {
  var t = e.sideCar, r = mf(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var n = t.read();
  if (!n)
    throw new Error("Sidecar medium not found");
  return b.createElement(n, Je({}, r));
};
gf.isSideCarExport = !0;
function eE(e, t) {
  return e.useMedium(t), gf;
}
var yf = ZS(), fs = function() {
}, Un = b.forwardRef(function(e, t) {
  var r = b.useRef(null), n = b.useState({
    onScrollCapture: fs,
    onWheelCapture: fs,
    onTouchMoveCapture: fs
  }), o = n[0], s = n[1], i = e.forwardProps, a = e.children, l = e.className, c = e.removeScrollBar, u = e.enabled, f = e.shards, m = e.sideCar, h = e.noRelative, g = e.noIsolation, p = e.inert, d = e.allowPinchZoom, v = e.as, y = v === void 0 ? "div" : v, w = e.gapMode, S = mf(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), P = m, T = XS([r, t]), A = Je(Je({}, S), o);
  return b.createElement(
    b.Fragment,
    null,
    u && b.createElement(P, { sideCar: yf, removeScrollBar: c, shards: f, noRelative: h, noIsolation: g, inert: p, setCallbacks: s, allowPinchZoom: !!d, lockRef: r, gapMode: w }),
    i ? b.cloneElement(b.Children.only(a), Je(Je({}, A), { ref: T })) : b.createElement(y, Je({}, A, { className: l, ref: T }), a)
  );
});
Un.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Un.classNames = {
  fullWidth: ln,
  zeroRight: cn
};
var tE = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function rE() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = tE();
  return t && e.setAttribute("nonce", t), e;
}
function nE(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function oE(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var sE = function() {
  var e = 0, t = null;
  return {
    add: function(r) {
      e == 0 && (t = rE()) && (nE(t, r), oE(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, iE = function() {
  var e = sE();
  return function(t, r) {
    b.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && r]);
  };
}, vf = function() {
  var e = iE(), t = function(r) {
    var n = r.styles, o = r.dynamic;
    return e(n, o), null;
  };
  return t;
}, aE = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, ds = function(e) {
  return parseInt(e || "", 10) || 0;
}, cE = function(e) {
  var t = window.getComputedStyle(document.body), r = t[e === "padding" ? "paddingLeft" : "marginLeft"], n = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [ds(r), ds(n), ds(o)];
}, lE = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return aE;
  var t = cE(e), r = document.documentElement.clientWidth, n = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, n - r + t[2] - t[0])
  };
}, uE = vf(), Jt = "data-scroll-locked", fE = function(e, t, r, n) {
  var o = e.left, s = e.top, i = e.right, a = e.gap;
  return r === void 0 && (r = "margin"), `
  .`.concat(VS, ` {
   overflow: hidden `).concat(n, `;
   padding-right: `).concat(a, "px ").concat(n, `;
  }
  body[`).concat(Jt, `] {
    overflow: hidden `).concat(n, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(n, ";"),
    r === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(s, `px;
    padding-right: `).concat(i, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a, "px ").concat(n, `;
    `),
    r === "padding" && "padding-right: ".concat(a, "px ").concat(n, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(cn, ` {
    right: `).concat(a, "px ").concat(n, `;
  }
  
  .`).concat(ln, ` {
    margin-right: `).concat(a, "px ").concat(n, `;
  }
  
  .`).concat(cn, " .").concat(cn, ` {
    right: 0 `).concat(n, `;
  }
  
  .`).concat(ln, " .").concat(ln, ` {
    margin-right: 0 `).concat(n, `;
  }
  
  body[`).concat(Jt, `] {
    `).concat(GS, ": ").concat(a, `px;
  }
`);
}, nl = function() {
  var e = parseInt(document.body.getAttribute(Jt) || "0", 10);
  return isFinite(e) ? e : 0;
}, dE = function() {
  b.useEffect(function() {
    return document.body.setAttribute(Jt, (nl() + 1).toString()), function() {
      var e = nl() - 1;
      e <= 0 ? document.body.removeAttribute(Jt) : document.body.setAttribute(Jt, e.toString());
    };
  }, []);
}, pE = function(e) {
  var t = e.noRelative, r = e.noImportant, n = e.gapMode, o = n === void 0 ? "margin" : n;
  dE();
  var s = b.useMemo(function() {
    return lE(o);
  }, [o]);
  return b.createElement(uE, { styles: fE(s, !t, o, r ? "" : "!important") });
}, Ls = !1;
if (typeof window < "u")
  try {
    var Qr = Object.defineProperty({}, "passive", {
      get: function() {
        return Ls = !0, !0;
      }
    });
    window.addEventListener("test", Qr, Qr), window.removeEventListener("test", Qr, Qr);
  } catch {
    Ls = !1;
  }
var Vt = Ls ? { passive: !1 } : !1, hE = function(e) {
  return e.tagName === "TEXTAREA";
}, bf = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var r = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    r[t] !== "hidden" && // contains scroll inside self
    !(r.overflowY === r.overflowX && !hE(e) && r[t] === "visible")
  );
}, mE = function(e) {
  return bf(e, "overflowY");
}, gE = function(e) {
  return bf(e, "overflowX");
}, ol = function(e, t) {
  var r = t.ownerDocument, n = t;
  do {
    typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
    var o = wf(e, n);
    if (o) {
      var s = xf(e, n), i = s[1], a = s[2];
      if (i > a)
        return !0;
    }
    n = n.parentNode;
  } while (n && n !== r.body);
  return !1;
}, yE = function(e) {
  var t = e.scrollTop, r = e.scrollHeight, n = e.clientHeight;
  return [
    t,
    r,
    n
  ];
}, vE = function(e) {
  var t = e.scrollLeft, r = e.scrollWidth, n = e.clientWidth;
  return [
    t,
    r,
    n
  ];
}, wf = function(e, t) {
  return e === "v" ? mE(t) : gE(t);
}, xf = function(e, t) {
  return e === "v" ? yE(t) : vE(t);
}, bE = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, wE = function(e, t, r, n, o) {
  var s = bE(e, window.getComputedStyle(t).direction), i = s * n, a = r.target, l = t.contains(a), c = !1, u = i > 0, f = 0, m = 0;
  do {
    if (!a)
      break;
    var h = xf(e, a), g = h[0], p = h[1], d = h[2], v = p - d - s * g;
    (g || v) && wf(e, a) && (f += v, m += g);
    var y = a.parentNode;
    a = y && y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? y.host : y;
  } while (
    // portaled content
    !l && a !== document.body || // self content
    l && (t.contains(a) || t === a)
  );
  return (u && Math.abs(f) < 1 || !u && Math.abs(m) < 1) && (c = !0), c;
}, Zr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, sl = function(e) {
  return [e.deltaX, e.deltaY];
}, il = function(e) {
  return e && "current" in e ? e.current : e;
}, xE = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, SE = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, EE = 0, Gt = [];
function PE(e) {
  var t = b.useRef([]), r = b.useRef([0, 0]), n = b.useRef(), o = b.useState(EE++)[0], s = b.useState(vf)[0], i = b.useRef(e);
  b.useEffect(function() {
    i.current = e;
  }, [e]), b.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var p = WS([e.lockRef.current], (e.shards || []).map(il), !0).filter(Boolean);
      return p.forEach(function(d) {
        return d.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), p.forEach(function(d) {
          return d.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = b.useCallback(function(p, d) {
    if ("touches" in p && p.touches.length === 2 || p.type === "wheel" && p.ctrlKey)
      return !i.current.allowPinchZoom;
    var v = Zr(p), y = r.current, w = "deltaX" in p ? p.deltaX : y[0] - v[0], S = "deltaY" in p ? p.deltaY : y[1] - v[1], P, T = p.target, A = Math.abs(w) > Math.abs(S) ? "h" : "v";
    if ("touches" in p && A === "h" && T.type === "range")
      return !1;
    var E = ol(A, T);
    if (!E)
      return !0;
    if (E ? P = A : (P = A === "v" ? "h" : "v", E = ol(A, T)), !E)
      return !1;
    if (!n.current && "changedTouches" in p && (w || S) && (n.current = P), !P)
      return !0;
    var I = n.current || P;
    return wE(I, d, p, I === "h" ? w : S);
  }, []), l = b.useCallback(function(p) {
    var d = p;
    if (!(!Gt.length || Gt[Gt.length - 1] !== s)) {
      var v = "deltaY" in d ? sl(d) : Zr(d), y = t.current.filter(function(P) {
        return P.name === d.type && (P.target === d.target || d.target === P.shadowParent) && xE(P.delta, v);
      })[0];
      if (y && y.should) {
        d.cancelable && d.preventDefault();
        return;
      }
      if (!y) {
        var w = (i.current.shards || []).map(il).filter(Boolean).filter(function(P) {
          return P.contains(d.target);
        }), S = w.length > 0 ? a(d, w[0]) : !i.current.noIsolation;
        S && d.cancelable && d.preventDefault();
      }
    }
  }, []), c = b.useCallback(function(p, d, v, y) {
    var w = { name: p, delta: d, target: v, should: y, shadowParent: AE(v) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== w;
      });
    }, 1);
  }, []), u = b.useCallback(function(p) {
    r.current = Zr(p), n.current = void 0;
  }, []), f = b.useCallback(function(p) {
    c(p.type, sl(p), p.target, a(p, e.lockRef.current));
  }, []), m = b.useCallback(function(p) {
    c(p.type, Zr(p), p.target, a(p, e.lockRef.current));
  }, []);
  b.useEffect(function() {
    return Gt.push(s), e.setCallbacks({
      onScrollCapture: f,
      onWheelCapture: f,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", l, Vt), document.addEventListener("touchmove", l, Vt), document.addEventListener("touchstart", u, Vt), function() {
      Gt = Gt.filter(function(p) {
        return p !== s;
      }), document.removeEventListener("wheel", l, Vt), document.removeEventListener("touchmove", l, Vt), document.removeEventListener("touchstart", u, Vt);
    };
  }, []);
  var h = e.removeScrollBar, g = e.inert;
  return b.createElement(
    b.Fragment,
    null,
    g ? b.createElement(s, { styles: SE(o) }) : null,
    h ? b.createElement(pE, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function AE(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const CE = eE(yf, PE);
var Ei = b.forwardRef(function(e, t) {
  return b.createElement(Un, Je({}, e, { ref: t, sideCar: CE }));
});
Ei.classNames = Un.classNames;
var Hn = "Popover", [Sf, v0] = jn(Hn, [
  qn
]), Lr = qn(), [RE, St] = Sf(Hn), Ef = (e) => {
  const {
    __scopePopover: t,
    children: r,
    open: n,
    defaultOpen: o,
    onOpenChange: s,
    modal: i = !1
  } = e, a = Lr(t), l = b.useRef(null), [c, u] = b.useState(!1), [f, m] = Fs({
    prop: n,
    defaultProp: o ?? !1,
    onChange: s,
    caller: Hn
  });
  return /* @__PURE__ */ x.jsx(uf, { ...a, children: /* @__PURE__ */ x.jsx(
    RE,
    {
      scope: t,
      contentId: Dn(),
      triggerRef: l,
      open: f,
      onOpenChange: m,
      onOpenToggle: b.useCallback(() => m((h) => !h), [m]),
      hasCustomAnchor: c,
      onCustomAnchorAdd: b.useCallback(() => u(!0), []),
      onCustomAnchorRemove: b.useCallback(() => u(!1), []),
      modal: i,
      children: r
    }
  ) });
};
Ef.displayName = Hn;
var Pf = "PopoverAnchor", TE = b.forwardRef(
  (e, t) => {
    const { __scopePopover: r, ...n } = e, o = St(Pf, r), s = Lr(r), { onCustomAnchorAdd: i, onCustomAnchorRemove: a } = o;
    return b.useEffect(() => (i(), () => a()), [i, a]), /* @__PURE__ */ x.jsx(wi, { ...s, ...n, ref: t });
  }
);
TE.displayName = Pf;
var Af = "PopoverTrigger", Cf = b.forwardRef(
  (e, t) => {
    const { __scopePopover: r, ...n } = e, o = St(Af, r), s = Lr(r), i = xe(t, o.triggerRef), a = /* @__PURE__ */ x.jsx(
      me.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Nf(o.open),
        ...n,
        ref: i,
        onClick: he(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? a : /* @__PURE__ */ x.jsx(wi, { asChild: !0, ...s, children: a });
  }
);
Cf.displayName = Af;
var Pi = "PopoverPortal", [OE, _E] = Sf(Pi, {
  forceMount: void 0
}), Rf = (e) => {
  const { __scopePopover: t, forceMount: r, children: n, container: o } = e, s = St(Pi, t);
  return /* @__PURE__ */ x.jsx(OE, { scope: t, forceMount: r, children: /* @__PURE__ */ x.jsx(Si, { present: r || s.open, children: /* @__PURE__ */ x.jsx(xi, { asChild: !0, container: o, children: n }) }) });
};
Rf.displayName = Pi;
var rr = "PopoverContent", Tf = b.forwardRef(
  (e, t) => {
    const r = _E(rr, e.__scopePopover), { forceMount: n = r.forceMount, ...o } = e, s = St(rr, e.__scopePopover);
    return /* @__PURE__ */ x.jsx(Si, { present: n || s.open, children: s.modal ? /* @__PURE__ */ x.jsx(kE, { ...o, ref: t }) : /* @__PURE__ */ x.jsx(IE, { ...o, ref: t }) });
  }
);
Tf.displayName = rr;
var NE = /* @__PURE__ */ er("PopoverContent.RemoveScroll"), kE = b.forwardRef(
  (e, t) => {
    const r = St(rr, e.__scopePopover), n = b.useRef(null), o = xe(t, n), s = b.useRef(!1);
    return b.useEffect(() => {
      const i = n.current;
      if (i) return hf(i);
    }, []), /* @__PURE__ */ x.jsx(Ei, { as: NE, allowPinchZoom: !0, children: /* @__PURE__ */ x.jsx(
      Of,
      {
        ...e,
        ref: o,
        trapFocus: r.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: he(e.onCloseAutoFocus, (i) => {
          var a;
          i.preventDefault(), s.current || (a = r.triggerRef.current) == null || a.focus();
        }),
        onPointerDownOutside: he(
          e.onPointerDownOutside,
          (i) => {
            const a = i.detail.originalEvent, l = a.button === 0 && a.ctrlKey === !0, c = a.button === 2 || l;
            s.current = c;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: he(
          e.onFocusOutside,
          (i) => i.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), IE = b.forwardRef(
  (e, t) => {
    const r = St(rr, e.__scopePopover), n = b.useRef(!1), o = b.useRef(!1);
    return /* @__PURE__ */ x.jsx(
      Of,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (s) => {
          var i, a;
          (i = e.onCloseAutoFocus) == null || i.call(e, s), s.defaultPrevented || (n.current || (a = r.triggerRef.current) == null || a.focus(), s.preventDefault()), n.current = !1, o.current = !1;
        },
        onInteractOutside: (s) => {
          var l, c;
          (l = e.onInteractOutside) == null || l.call(e, s), s.defaultPrevented || (n.current = !0, s.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const i = s.target;
          ((c = r.triggerRef.current) == null ? void 0 : c.contains(i)) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && o.current && s.preventDefault();
        }
      }
    );
  }
), Of = b.forwardRef(
  (e, t) => {
    const {
      __scopePopover: r,
      trapFocus: n,
      onOpenAutoFocus: o,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: i,
      onEscapeKeyDown: a,
      onPointerDownOutside: l,
      onFocusOutside: c,
      onInteractOutside: u,
      ...f
    } = e, m = St(rr, r), h = Lr(r);
    return Bu(), /* @__PURE__ */ x.jsx(
      fi,
      {
        asChild: !0,
        loop: !0,
        trapped: n,
        onMountAutoFocus: o,
        onUnmountAutoFocus: s,
        children: /* @__PURE__ */ x.jsx(
          ui,
          {
            asChild: !0,
            disableOutsidePointerEvents: i,
            onInteractOutside: u,
            onEscapeKeyDown: a,
            onPointerDownOutside: l,
            onFocusOutside: c,
            onDismiss: () => m.onOpenChange(!1),
            children: /* @__PURE__ */ x.jsx(
              ff,
              {
                "data-state": Nf(m.open),
                role: "dialog",
                id: m.contentId,
                ...h,
                ...f,
                ref: t,
                style: {
                  ...f.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }
), _f = "PopoverClose", ME = b.forwardRef(
  (e, t) => {
    const { __scopePopover: r, ...n } = e, o = St(_f, r);
    return /* @__PURE__ */ x.jsx(
      me.button,
      {
        type: "button",
        ...n,
        ref: t,
        onClick: he(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
ME.displayName = _f;
var jE = "PopoverArrow", DE = b.forwardRef(
  (e, t) => {
    const { __scopePopover: r, ...n } = e, o = Lr(r);
    return /* @__PURE__ */ x.jsx(df, { ...o, ...n, ref: t });
  }
);
DE.displayName = jE;
function Nf(e) {
  return e ? "open" : "closed";
}
var FE = Ef, LE = Cf, $E = Rf, BE = Tf;
function qE({
  ...e
}) {
  return /* @__PURE__ */ x.jsx(FE, { "data-slot": "popover", ...e });
}
function UE({
  ...e
}) {
  return /* @__PURE__ */ x.jsx(LE, { "data-slot": "popover-trigger", ...e });
}
function HE({
  className: e,
  align: t = "center",
  sideOffset: r = 4,
  ...n
}) {
  return /* @__PURE__ */ x.jsx($E, { children: /* @__PURE__ */ x.jsx(
    BE,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: r,
      className: be(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        e
      ),
      ...n
    }
  ) });
}
const zE = ({ children: e, variant: t = "ghost", icon: r, disabled: n = !1, onClick: o, className: s = "", ...i }) => {
  const l = {
    primary: "default",
    sage: "secondary",
    success: "default",
    danger: "destructive",
    warning: "secondary",
    info: "secondary",
    neutral: "ghost",
    dark: "secondary"
  }[t] || "ghost";
  return /* @__PURE__ */ x.jsxs(
    Mn,
    {
      onClick: o,
      disabled: n,
      variant: l,
      size: "sm",
      className: s,
      ...i,
      children: [
        r && /* @__PURE__ */ x.jsx(r, { className: "h-4 w-4 mr-1" }),
        e
      ]
    }
  );
}, WE = ({
  icon: e,
  variant: t = "ghost",
  size: r = "icon",
  outline: n = !1,
  compact: o = !1,
  disabled: s = !1,
  onClick: i,
  className: a = "",
  title: l,
  ...c
}) => {
  const f = {
    primary: n ? "outline" : "default",
    success: n ? "outline" : "default",
    danger: n ? "outline" : "destructive",
    warning: n ? "outline" : "secondary",
    info: n ? "outline" : "secondary",
    neutral: n ? "outline" : "ghost",
    dark: n ? "outline" : "secondary"
  }[t] || "ghost", m = o ? "sm" : r;
  return /* @__PURE__ */ x.jsx(
    Mn,
    {
      onClick: i,
      disabled: s,
      variant: f,
      size: m,
      title: l,
      className: a,
      ...c,
      children: /* @__PURE__ */ x.jsx(e, { className: "h-4 w-4" })
    }
  );
};
var VE = "Label", kf = b.forwardRef((e, t) => /* @__PURE__ */ x.jsx(
  me.label,
  {
    ...e,
    ref: t,
    onMouseDown: (r) => {
      var o;
      r.target.closest("button, input, select, textarea") || ((o = e.onMouseDown) == null || o.call(e, r), !r.defaultPrevented && r.detail > 1 && r.preventDefault());
    }
  }
));
kf.displayName = VE;
var GE = kf;
function KE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ x.jsx(
    GE,
    {
      "data-slot": "label",
      className: be(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function If({ children: e, required: t, className: r, ...n }) {
  return /* @__PURE__ */ x.jsxs(KE, { className: be("mb-2", r), ...n, children: [
    e,
    t && /* @__PURE__ */ x.jsx("span", { className: "text-destructive ml-1", children: "*" })
  ] });
}
const $s = ({
  value: e,
  onChange: t,
  label: r,
  description: n,
  error: o,
  required: s = !1,
  prefixIcon: i,
  suffixIcon: a,
  suffixText: l,
  placeholder: c,
  disabled: u = !1,
  className: f,
  inputClassName: m,
  type: h = "text",
  revealable: g = !1,
  ...p
}) => {
  const [d, v] = Ee(!1), y = o && o.length > 0, w = a || l || g && h === "password", S = a, P = i, T = g && h === "password" ? d ? "text" : "password" : h, A = () => {
    v(!d);
  };
  return /* @__PURE__ */ x.jsxs("div", { className: be("w-full", f), children: [
    r && /* @__PURE__ */ x.jsx(If, { required: s, children: r }),
    /* @__PURE__ */ x.jsxs("div", { className: "relative", children: [
      i && /* @__PURE__ */ x.jsx(P, { className: "left-3 w-4 h-4 text-muted-foreground absolute top-1/2 -translate-y-1/2 transform pointer-events-none" }),
      /* @__PURE__ */ x.jsx(
        Fu,
        {
          type: T,
          value: e,
          onChange: (E) => t(E.target.value),
          placeholder: c,
          disabled: u,
          className: be(
            {
              "pl-10": i,
              "pr-10": w,
              "border-destructive": y
            },
            m
          ),
          ...p
        }
      ),
      w && /* @__PURE__ */ x.jsx("div", { className: "right-3 absolute top-1/2 -translate-y-1/2 transform", children: g && h === "password" ? /* @__PURE__ */ x.jsx(
        WE,
        {
          icon: d ? $w : qw,
          variant: "ghost",
          size: "sm",
          onClick: A,
          title: d ? "Hide password" : "Show password",
          disabled: u
        }
      ) : a ? /* @__PURE__ */ x.jsx(S, { className: "w-5 h-5 text-muted-foreground" }) : /* @__PURE__ */ x.jsx("span", { className: "text-sm text-muted-foreground", children: l }) })
    ] }),
    y && /* @__PURE__ */ x.jsx("p", { className: "mt-1 text-sm text-destructive", children: o }),
    n && !y && /* @__PURE__ */ x.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: n })
  ] });
};
function JE({ from: e, to: t, onChange: r }) {
  return /* @__PURE__ */ x.jsxs("div", { className: "flex space-x-2", children: [
    /* @__PURE__ */ x.jsx(
      $s,
      {
        type: "date",
        value: e,
        onChange: (n) => r({ from: n, to: t }),
        placeholder: "From",
        size: "sm"
      }
    ),
    /* @__PURE__ */ x.jsx(
      $s,
      {
        type: "date",
        value: t,
        onChange: (n) => r({ from: e, to: n }),
        placeholder: "To",
        size: "sm"
      }
    )
  ] });
}
function al(e, [t, r]) {
  return Math.min(r, Math.max(t, e));
}
function XE(e) {
  const t = e + "CollectionProvider", [r, n] = jn(t), [o, s] = r(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (p) => {
    const { scope: d, children: v } = p, y = Ke.useRef(null), w = Ke.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ x.jsx(o, { scope: d, itemMap: w, collectionRef: y, children: v });
  };
  i.displayName = t;
  const a = e + "CollectionSlot", l = /* @__PURE__ */ er(a), c = Ke.forwardRef(
    (p, d) => {
      const { scope: v, children: y } = p, w = s(a, v), S = xe(d, w.collectionRef);
      return /* @__PURE__ */ x.jsx(l, { ref: S, children: y });
    }
  );
  c.displayName = a;
  const u = e + "CollectionItemSlot", f = "data-radix-collection-item", m = /* @__PURE__ */ er(u), h = Ke.forwardRef(
    (p, d) => {
      const { scope: v, children: y, ...w } = p, S = Ke.useRef(null), P = xe(d, S), T = s(u, v);
      return Ke.useEffect(() => (T.itemMap.set(S, { ref: S, ...w }), () => void T.itemMap.delete(S))), /* @__PURE__ */ x.jsx(m, { [f]: "", ref: P, children: y });
    }
  );
  h.displayName = u;
  function g(p) {
    const d = s(e + "CollectionConsumer", p);
    return Ke.useCallback(() => {
      const y = d.collectionRef.current;
      if (!y) return [];
      const w = Array.from(y.querySelectorAll(`[${f}]`));
      return Array.from(d.itemMap.values()).sort(
        (T, A) => w.indexOf(T.ref.current) - w.indexOf(A.ref.current)
      );
    }, [d.collectionRef, d.itemMap]);
  }
  return [
    { Provider: i, Slot: c, ItemSlot: h },
    g,
    n
  ];
}
var YE = b.createContext(void 0);
function QE(e) {
  const t = b.useContext(YE);
  return e || t || "ltr";
}
function ZE(e) {
  const t = b.useRef({ value: e, previous: e });
  return b.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var Mf = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), eP = "VisuallyHidden", tP = b.forwardRef(
  (e, t) => /* @__PURE__ */ x.jsx(
    me.span,
    {
      ...e,
      ref: t,
      style: { ...Mf, ...e.style }
    }
  )
);
tP.displayName = eP;
var rP = [" ", "Enter", "ArrowUp", "ArrowDown"], nP = [" ", "Enter"], jt = "Select", [zn, Wn, oP] = XE(jt), [fr, b0] = jn(jt, [
  oP,
  qn
]), Vn = qn(), [sP, Et] = fr(jt), [iP, aP] = fr(jt), jf = (e) => {
  const {
    __scopeSelect: t,
    children: r,
    open: n,
    defaultOpen: o,
    onOpenChange: s,
    value: i,
    defaultValue: a,
    onValueChange: l,
    dir: c,
    name: u,
    autoComplete: f,
    disabled: m,
    required: h,
    form: g
  } = e, p = Vn(t), [d, v] = b.useState(null), [y, w] = b.useState(null), [S, P] = b.useState(!1), T = QE(c), [A, E] = Fs({
    prop: n,
    defaultProp: o ?? !1,
    onChange: s,
    caller: jt
  }), [I, j] = Fs({
    prop: i,
    defaultProp: a,
    onChange: l,
    caller: jt
  }), L = b.useRef(null), D = d ? g || !!d.closest("form") : !0, [X, B] = b.useState(/* @__PURE__ */ new Set()), Q = Array.from(X).map((q) => q.props.value).join(";");
  return /* @__PURE__ */ x.jsx(uf, { ...p, children: /* @__PURE__ */ x.jsxs(
    sP,
    {
      required: h,
      scope: t,
      trigger: d,
      onTriggerChange: v,
      valueNode: y,
      onValueNodeChange: w,
      valueNodeHasChildren: S,
      onValueNodeHasChildrenChange: P,
      contentId: Dn(),
      value: I,
      onValueChange: j,
      open: A,
      onOpenChange: E,
      dir: T,
      triggerPointerDownPosRef: L,
      disabled: m,
      children: [
        /* @__PURE__ */ x.jsx(zn.Provider, { scope: t, children: /* @__PURE__ */ x.jsx(
          iP,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: b.useCallback((q) => {
              B((z) => new Set(z).add(q));
            }, []),
            onNativeOptionRemove: b.useCallback((q) => {
              B((z) => {
                const R = new Set(z);
                return R.delete(q), R;
              });
            }, []),
            children: r
          }
        ) }),
        D ? /* @__PURE__ */ x.jsxs(
          nd,
          {
            "aria-hidden": !0,
            required: h,
            tabIndex: -1,
            name: u,
            autoComplete: f,
            value: I,
            onChange: (q) => j(q.target.value),
            disabled: m,
            form: g,
            children: [
              I === void 0 ? /* @__PURE__ */ x.jsx("option", { value: "" }) : null,
              Array.from(X)
            ]
          },
          Q
        ) : null
      ]
    }
  ) });
};
jf.displayName = jt;
var Df = "SelectTrigger", Ff = b.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, disabled: n = !1, ...o } = e, s = Vn(r), i = Et(Df, r), a = i.disabled || n, l = xe(t, i.onTriggerChange), c = Wn(r), u = b.useRef("touch"), [f, m, h] = sd((p) => {
      const d = c().filter((w) => !w.disabled), v = d.find((w) => w.value === i.value), y = id(d, p, v);
      y !== void 0 && i.onValueChange(y.value);
    }), g = (p) => {
      a || (i.onOpenChange(!0), h()), p && (i.triggerPointerDownPosRef.current = {
        x: Math.round(p.pageX),
        y: Math.round(p.pageY)
      });
    };
    return /* @__PURE__ */ x.jsx(wi, { asChild: !0, ...s, children: /* @__PURE__ */ x.jsx(
      me.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": i.contentId,
        "aria-expanded": i.open,
        "aria-required": i.required,
        "aria-autocomplete": "none",
        dir: i.dir,
        "data-state": i.open ? "open" : "closed",
        disabled: a,
        "data-disabled": a ? "" : void 0,
        "data-placeholder": od(i.value) ? "" : void 0,
        ...o,
        ref: l,
        onClick: he(o.onClick, (p) => {
          p.currentTarget.focus(), u.current !== "mouse" && g(p);
        }),
        onPointerDown: he(o.onPointerDown, (p) => {
          u.current = p.pointerType;
          const d = p.target;
          d.hasPointerCapture(p.pointerId) && d.releasePointerCapture(p.pointerId), p.button === 0 && p.ctrlKey === !1 && p.pointerType === "mouse" && (g(p), p.preventDefault());
        }),
        onKeyDown: he(o.onKeyDown, (p) => {
          const d = f.current !== "";
          !(p.ctrlKey || p.altKey || p.metaKey) && p.key.length === 1 && m(p.key), !(d && p.key === " ") && rP.includes(p.key) && (g(), p.preventDefault());
        })
      }
    ) });
  }
);
Ff.displayName = Df;
var Lf = "SelectValue", $f = b.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, className: n, style: o, children: s, placeholder: i = "", ...a } = e, l = Et(Lf, r), { onValueNodeHasChildrenChange: c } = l, u = s !== void 0, f = xe(t, l.onValueNodeChange);
    return Ae(() => {
      c(u);
    }, [c, u]), /* @__PURE__ */ x.jsx(
      me.span,
      {
        ...a,
        ref: f,
        style: { pointerEvents: "none" },
        children: od(l.value) ? /* @__PURE__ */ x.jsx(x.Fragment, { children: i }) : s
      }
    );
  }
);
$f.displayName = Lf;
var cP = "SelectIcon", Bf = b.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, children: n, ...o } = e;
    return /* @__PURE__ */ x.jsx(me.span, { "aria-hidden": !0, ...o, ref: t, children: n || "▼" });
  }
);
Bf.displayName = cP;
var lP = "SelectPortal", qf = (e) => /* @__PURE__ */ x.jsx(xi, { asChild: !0, ...e });
qf.displayName = lP;
var Dt = "SelectContent", Uf = b.forwardRef(
  (e, t) => {
    const r = Et(Dt, e.__scopeSelect), [n, o] = b.useState();
    if (Ae(() => {
      o(new DocumentFragment());
    }, []), !r.open) {
      const s = n;
      return s ? En.createPortal(
        /* @__PURE__ */ x.jsx(Hf, { scope: e.__scopeSelect, children: /* @__PURE__ */ x.jsx(zn.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ x.jsx("div", { children: e.children }) }) }),
        s
      ) : null;
    }
    return /* @__PURE__ */ x.jsx(zf, { ...e, ref: t });
  }
);
Uf.displayName = Dt;
var $e = 10, [Hf, Pt] = fr(Dt), uP = "SelectContentImpl", fP = /* @__PURE__ */ er("SelectContent.RemoveScroll"), zf = b.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: r,
      position: n = "item-aligned",
      onCloseAutoFocus: o,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      //
      // PopperContent props
      side: a,
      sideOffset: l,
      align: c,
      alignOffset: u,
      arrowPadding: f,
      collisionBoundary: m,
      collisionPadding: h,
      sticky: g,
      hideWhenDetached: p,
      avoidCollisions: d,
      //
      ...v
    } = e, y = Et(Dt, r), [w, S] = b.useState(null), [P, T] = b.useState(null), A = xe(t, (k) => S(k)), [E, I] = b.useState(null), [j, L] = b.useState(
      null
    ), D = Wn(r), [X, B] = b.useState(!1), Q = b.useRef(!1);
    b.useEffect(() => {
      if (w) return hf(w);
    }, [w]), Bu();
    const q = b.useCallback(
      (k) => {
        const [$, ...H] = D().map((K) => K.ref.current), [M] = H.slice(-1), F = document.activeElement;
        for (const K of k)
          if (K === F || (K == null || K.scrollIntoView({ block: "nearest" }), K === $ && P && (P.scrollTop = 0), K === M && P && (P.scrollTop = P.scrollHeight), K == null || K.focus(), document.activeElement !== F)) return;
      },
      [D, P]
    ), z = b.useCallback(
      () => q([E, w]),
      [q, E, w]
    );
    b.useEffect(() => {
      X && z();
    }, [X, z]);
    const { onOpenChange: R, triggerPointerDownPosRef: J } = y;
    b.useEffect(() => {
      if (w) {
        let k = { x: 0, y: 0 };
        const $ = (M) => {
          var F, K;
          k = {
            x: Math.abs(Math.round(M.pageX) - (((F = J.current) == null ? void 0 : F.x) ?? 0)),
            y: Math.abs(Math.round(M.pageY) - (((K = J.current) == null ? void 0 : K.y) ?? 0))
          };
        }, H = (M) => {
          k.x <= 10 && k.y <= 10 ? M.preventDefault() : w.contains(M.target) || R(!1), document.removeEventListener("pointermove", $), J.current = null;
        };
        return J.current !== null && (document.addEventListener("pointermove", $), document.addEventListener("pointerup", H, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", $), document.removeEventListener("pointerup", H, { capture: !0 });
        };
      }
    }, [w, R, J]), b.useEffect(() => {
      const k = () => R(!1);
      return window.addEventListener("blur", k), window.addEventListener("resize", k), () => {
        window.removeEventListener("blur", k), window.removeEventListener("resize", k);
      };
    }, [R]);
    const [N, U] = sd((k) => {
      const $ = D().filter((F) => !F.disabled), H = $.find((F) => F.ref.current === document.activeElement), M = id($, k, H);
      M && setTimeout(() => M.ref.current.focus());
    }), Z = b.useCallback(
      (k, $, H) => {
        const M = !Q.current && !H;
        (y.value !== void 0 && y.value === $ || M) && (I(k), M && (Q.current = !0));
      },
      [y.value]
    ), Y = b.useCallback(() => w == null ? void 0 : w.focus(), [w]), W = b.useCallback(
      (k, $, H) => {
        const M = !Q.current && !H;
        (y.value !== void 0 && y.value === $ || M) && L(k);
      },
      [y.value]
    ), re = n === "popper" ? Bs : Wf, ie = re === Bs ? {
      side: a,
      sideOffset: l,
      align: c,
      alignOffset: u,
      arrowPadding: f,
      collisionBoundary: m,
      collisionPadding: h,
      sticky: g,
      hideWhenDetached: p,
      avoidCollisions: d
    } : {};
    return /* @__PURE__ */ x.jsx(
      Hf,
      {
        scope: r,
        content: w,
        viewport: P,
        onViewportChange: T,
        itemRefCallback: Z,
        selectedItem: E,
        onItemLeave: Y,
        itemTextRefCallback: W,
        focusSelectedItem: z,
        selectedItemText: j,
        position: n,
        isPositioned: X,
        searchRef: N,
        children: /* @__PURE__ */ x.jsx(Ei, { as: fP, allowPinchZoom: !0, children: /* @__PURE__ */ x.jsx(
          fi,
          {
            asChild: !0,
            trapped: y.open,
            onMountAutoFocus: (k) => {
              k.preventDefault();
            },
            onUnmountAutoFocus: he(o, (k) => {
              var $;
              ($ = y.trigger) == null || $.focus({ preventScroll: !0 }), k.preventDefault();
            }),
            children: /* @__PURE__ */ x.jsx(
              ui,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: s,
                onPointerDownOutside: i,
                onFocusOutside: (k) => k.preventDefault(),
                onDismiss: () => y.onOpenChange(!1),
                children: /* @__PURE__ */ x.jsx(
                  re,
                  {
                    role: "listbox",
                    id: y.contentId,
                    "data-state": y.open ? "open" : "closed",
                    dir: y.dir,
                    onContextMenu: (k) => k.preventDefault(),
                    ...v,
                    ...ie,
                    onPlaced: () => B(!0),
                    ref: A,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...v.style
                    },
                    onKeyDown: he(v.onKeyDown, (k) => {
                      const $ = k.ctrlKey || k.altKey || k.metaKey;
                      if (k.key === "Tab" && k.preventDefault(), !$ && k.key.length === 1 && U(k.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(k.key)) {
                        let M = D().filter((F) => !F.disabled).map((F) => F.ref.current);
                        if (["ArrowUp", "End"].includes(k.key) && (M = M.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(k.key)) {
                          const F = k.target, K = M.indexOf(F);
                          M = M.slice(K + 1);
                        }
                        setTimeout(() => q(M)), k.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
zf.displayName = uP;
var dP = "SelectItemAlignedPosition", Wf = b.forwardRef((e, t) => {
  const { __scopeSelect: r, onPlaced: n, ...o } = e, s = Et(Dt, r), i = Pt(Dt, r), [a, l] = b.useState(null), [c, u] = b.useState(null), f = xe(t, (A) => u(A)), m = Wn(r), h = b.useRef(!1), g = b.useRef(!0), { viewport: p, selectedItem: d, selectedItemText: v, focusSelectedItem: y } = i, w = b.useCallback(() => {
    if (s.trigger && s.valueNode && a && c && p && d && v) {
      const A = s.trigger.getBoundingClientRect(), E = c.getBoundingClientRect(), I = s.valueNode.getBoundingClientRect(), j = v.getBoundingClientRect();
      if (s.dir !== "rtl") {
        const F = j.left - E.left, K = I.left - F, ee = A.left - K, le = A.width + ee, ve = Math.max(le, E.width), ge = window.innerWidth - $e, we = al(K, [
          $e,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max($e, ge - ve)
        ]);
        a.style.minWidth = le + "px", a.style.left = we + "px";
      } else {
        const F = E.right - j.right, K = window.innerWidth - I.right - F, ee = window.innerWidth - A.right - K, le = A.width + ee, ve = Math.max(le, E.width), ge = window.innerWidth - $e, we = al(K, [
          $e,
          Math.max($e, ge - ve)
        ]);
        a.style.minWidth = le + "px", a.style.right = we + "px";
      }
      const L = m(), D = window.innerHeight - $e * 2, X = p.scrollHeight, B = window.getComputedStyle(c), Q = parseInt(B.borderTopWidth, 10), q = parseInt(B.paddingTop, 10), z = parseInt(B.borderBottomWidth, 10), R = parseInt(B.paddingBottom, 10), J = Q + q + X + R + z, N = Math.min(d.offsetHeight * 5, J), U = window.getComputedStyle(p), Z = parseInt(U.paddingTop, 10), Y = parseInt(U.paddingBottom, 10), W = A.top + A.height / 2 - $e, re = D - W, ie = d.offsetHeight / 2, k = d.offsetTop + ie, $ = Q + q + k, H = J - $;
      if ($ <= W) {
        const F = L.length > 0 && d === L[L.length - 1].ref.current;
        a.style.bottom = "0px";
        const K = c.clientHeight - p.offsetTop - p.offsetHeight, ee = Math.max(
          re,
          ie + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (F ? Y : 0) + K + z
        ), le = $ + ee;
        a.style.height = le + "px";
      } else {
        const F = L.length > 0 && d === L[0].ref.current;
        a.style.top = "0px";
        const ee = Math.max(
          W,
          Q + p.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (F ? Z : 0) + ie
        ) + H;
        a.style.height = ee + "px", p.scrollTop = $ - W + p.offsetTop;
      }
      a.style.margin = `${$e}px 0`, a.style.minHeight = N + "px", a.style.maxHeight = D + "px", n == null || n(), requestAnimationFrame(() => h.current = !0);
    }
  }, [
    m,
    s.trigger,
    s.valueNode,
    a,
    c,
    p,
    d,
    v,
    s.dir,
    n
  ]);
  Ae(() => w(), [w]);
  const [S, P] = b.useState();
  Ae(() => {
    c && P(window.getComputedStyle(c).zIndex);
  }, [c]);
  const T = b.useCallback(
    (A) => {
      A && g.current === !0 && (w(), y == null || y(), g.current = !1);
    },
    [w, y]
  );
  return /* @__PURE__ */ x.jsx(
    hP,
    {
      scope: r,
      contentWrapper: a,
      shouldExpandOnScrollRef: h,
      onScrollButtonChange: T,
      children: /* @__PURE__ */ x.jsx(
        "div",
        {
          ref: l,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: S
          },
          children: /* @__PURE__ */ x.jsx(
            me.div,
            {
              ...o,
              ref: f,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...o.style
              }
            }
          )
        }
      )
    }
  );
});
Wf.displayName = dP;
var pP = "SelectPopperPosition", Bs = b.forwardRef((e, t) => {
  const {
    __scopeSelect: r,
    align: n = "start",
    collisionPadding: o = $e,
    ...s
  } = e, i = Vn(r);
  return /* @__PURE__ */ x.jsx(
    ff,
    {
      ...i,
      ...s,
      ref: t,
      align: n,
      collisionPadding: o,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...s.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
Bs.displayName = pP;
var [hP, Ai] = fr(Dt, {}), qs = "SelectViewport", Vf = b.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, nonce: n, ...o } = e, s = Pt(qs, r), i = Ai(qs, r), a = xe(t, s.onViewportChange), l = b.useRef(0);
    return /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
      /* @__PURE__ */ x.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: n
        }
      ),
      /* @__PURE__ */ x.jsx(zn.Slot, { scope: r, children: /* @__PURE__ */ x.jsx(
        me.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...o,
          ref: a,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...o.style
          },
          onScroll: he(o.onScroll, (c) => {
            const u = c.currentTarget, { contentWrapper: f, shouldExpandOnScrollRef: m } = i;
            if (m != null && m.current && f) {
              const h = Math.abs(l.current - u.scrollTop);
              if (h > 0) {
                const g = window.innerHeight - $e * 2, p = parseFloat(f.style.minHeight), d = parseFloat(f.style.height), v = Math.max(p, d);
                if (v < g) {
                  const y = v + h, w = Math.min(g, y), S = y - w;
                  f.style.height = w + "px", f.style.bottom === "0px" && (u.scrollTop = S > 0 ? S : 0, f.style.justifyContent = "flex-end");
                }
              }
            }
            l.current = u.scrollTop;
          })
        }
      ) })
    ] });
  }
);
Vf.displayName = qs;
var Gf = "SelectGroup", [mP, gP] = fr(Gf), yP = b.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e, o = Dn();
    return /* @__PURE__ */ x.jsx(mP, { scope: r, id: o, children: /* @__PURE__ */ x.jsx(me.div, { role: "group", "aria-labelledby": o, ...n, ref: t }) });
  }
);
yP.displayName = Gf;
var Kf = "SelectLabel", vP = b.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e, o = gP(Kf, r);
    return /* @__PURE__ */ x.jsx(me.div, { id: o.id, ...n, ref: t });
  }
);
vP.displayName = Kf;
var xn = "SelectItem", [bP, Jf] = fr(xn), Xf = b.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: r,
      value: n,
      disabled: o = !1,
      textValue: s,
      ...i
    } = e, a = Et(xn, r), l = Pt(xn, r), c = a.value === n, [u, f] = b.useState(s ?? ""), [m, h] = b.useState(!1), g = xe(
      t,
      (y) => {
        var w;
        return (w = l.itemRefCallback) == null ? void 0 : w.call(l, y, n, o);
      }
    ), p = Dn(), d = b.useRef("touch"), v = () => {
      o || (a.onValueChange(n), a.onOpenChange(!1));
    };
    if (n === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ x.jsx(
      bP,
      {
        scope: r,
        value: n,
        disabled: o,
        textId: p,
        isSelected: c,
        onItemTextChange: b.useCallback((y) => {
          f((w) => w || ((y == null ? void 0 : y.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ x.jsx(
          zn.ItemSlot,
          {
            scope: r,
            value: n,
            disabled: o,
            textValue: u,
            children: /* @__PURE__ */ x.jsx(
              me.div,
              {
                role: "option",
                "aria-labelledby": p,
                "data-highlighted": m ? "" : void 0,
                "aria-selected": c && m,
                "data-state": c ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...i,
                ref: g,
                onFocus: he(i.onFocus, () => h(!0)),
                onBlur: he(i.onBlur, () => h(!1)),
                onClick: he(i.onClick, () => {
                  d.current !== "mouse" && v();
                }),
                onPointerUp: he(i.onPointerUp, () => {
                  d.current === "mouse" && v();
                }),
                onPointerDown: he(i.onPointerDown, (y) => {
                  d.current = y.pointerType;
                }),
                onPointerMove: he(i.onPointerMove, (y) => {
                  var w;
                  d.current = y.pointerType, o ? (w = l.onItemLeave) == null || w.call(l) : d.current === "mouse" && y.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: he(i.onPointerLeave, (y) => {
                  var w;
                  y.currentTarget === document.activeElement && ((w = l.onItemLeave) == null || w.call(l));
                }),
                onKeyDown: he(i.onKeyDown, (y) => {
                  var S;
                  ((S = l.searchRef) == null ? void 0 : S.current) !== "" && y.key === " " || (nP.includes(y.key) && v(), y.key === " " && y.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
Xf.displayName = xn;
var Sr = "SelectItemText", Yf = b.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, className: n, style: o, ...s } = e, i = Et(Sr, r), a = Pt(Sr, r), l = Jf(Sr, r), c = aP(Sr, r), [u, f] = b.useState(null), m = xe(
      t,
      (v) => f(v),
      l.onItemTextChange,
      (v) => {
        var y;
        return (y = a.itemTextRefCallback) == null ? void 0 : y.call(a, v, l.value, l.disabled);
      }
    ), h = u == null ? void 0 : u.textContent, g = b.useMemo(
      () => /* @__PURE__ */ x.jsx("option", { value: l.value, disabled: l.disabled, children: h }, l.value),
      [l.disabled, l.value, h]
    ), { onNativeOptionAdd: p, onNativeOptionRemove: d } = c;
    return Ae(() => (p(g), () => d(g)), [p, d, g]), /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
      /* @__PURE__ */ x.jsx(me.span, { id: l.textId, ...s, ref: m }),
      l.isSelected && i.valueNode && !i.valueNodeHasChildren ? En.createPortal(s.children, i.valueNode) : null
    ] });
  }
);
Yf.displayName = Sr;
var Qf = "SelectItemIndicator", Zf = b.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e;
    return Jf(Qf, r).isSelected ? /* @__PURE__ */ x.jsx(me.span, { "aria-hidden": !0, ...n, ref: t }) : null;
  }
);
Zf.displayName = Qf;
var Us = "SelectScrollUpButton", ed = b.forwardRef((e, t) => {
  const r = Pt(Us, e.__scopeSelect), n = Ai(Us, e.__scopeSelect), [o, s] = b.useState(!1), i = xe(t, n.onScrollButtonChange);
  return Ae(() => {
    if (r.viewport && r.isPositioned) {
      let a = function() {
        const c = l.scrollTop > 0;
        s(c);
      };
      const l = r.viewport;
      return a(), l.addEventListener("scroll", a), () => l.removeEventListener("scroll", a);
    }
  }, [r.viewport, r.isPositioned]), o ? /* @__PURE__ */ x.jsx(
    rd,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: a, selectedItem: l } = r;
        a && l && (a.scrollTop = a.scrollTop - l.offsetHeight);
      }
    }
  ) : null;
});
ed.displayName = Us;
var Hs = "SelectScrollDownButton", td = b.forwardRef((e, t) => {
  const r = Pt(Hs, e.__scopeSelect), n = Ai(Hs, e.__scopeSelect), [o, s] = b.useState(!1), i = xe(t, n.onScrollButtonChange);
  return Ae(() => {
    if (r.viewport && r.isPositioned) {
      let a = function() {
        const c = l.scrollHeight - l.clientHeight, u = Math.ceil(l.scrollTop) < c;
        s(u);
      };
      const l = r.viewport;
      return a(), l.addEventListener("scroll", a), () => l.removeEventListener("scroll", a);
    }
  }, [r.viewport, r.isPositioned]), o ? /* @__PURE__ */ x.jsx(
    rd,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: a, selectedItem: l } = r;
        a && l && (a.scrollTop = a.scrollTop + l.offsetHeight);
      }
    }
  ) : null;
});
td.displayName = Hs;
var rd = b.forwardRef((e, t) => {
  const { __scopeSelect: r, onAutoScroll: n, ...o } = e, s = Pt("SelectScrollButton", r), i = b.useRef(null), a = Wn(r), l = b.useCallback(() => {
    i.current !== null && (window.clearInterval(i.current), i.current = null);
  }, []);
  return b.useEffect(() => () => l(), [l]), Ae(() => {
    var u;
    const c = a().find((f) => f.ref.current === document.activeElement);
    (u = c == null ? void 0 : c.ref.current) == null || u.scrollIntoView({ block: "nearest" });
  }, [a]), /* @__PURE__ */ x.jsx(
    me.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: he(o.onPointerDown, () => {
        i.current === null && (i.current = window.setInterval(n, 50));
      }),
      onPointerMove: he(o.onPointerMove, () => {
        var c;
        (c = s.onItemLeave) == null || c.call(s), i.current === null && (i.current = window.setInterval(n, 50));
      }),
      onPointerLeave: he(o.onPointerLeave, () => {
        l();
      })
    }
  );
}), wP = "SelectSeparator", xP = b.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e;
    return /* @__PURE__ */ x.jsx(me.div, { "aria-hidden": !0, ...n, ref: t });
  }
);
xP.displayName = wP;
var zs = "SelectArrow", SP = b.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e, o = Vn(r), s = Et(zs, r), i = Pt(zs, r);
    return s.open && i.position === "popper" ? /* @__PURE__ */ x.jsx(df, { ...o, ...n, ref: t }) : null;
  }
);
SP.displayName = zs;
var EP = "SelectBubbleInput", nd = b.forwardRef(
  ({ __scopeSelect: e, value: t, ...r }, n) => {
    const o = b.useRef(null), s = xe(n, o), i = ZE(t);
    return b.useEffect(() => {
      const a = o.current;
      if (!a) return;
      const l = window.HTMLSelectElement.prototype, u = Object.getOwnPropertyDescriptor(
        l,
        "value"
      ).set;
      if (i !== t && u) {
        const f = new Event("change", { bubbles: !0 });
        u.call(a, t), a.dispatchEvent(f);
      }
    }, [i, t]), /* @__PURE__ */ x.jsx(
      me.select,
      {
        ...r,
        style: { ...Mf, ...r.style },
        ref: s,
        defaultValue: t
      }
    );
  }
);
nd.displayName = EP;
function od(e) {
  return e === "" || e === void 0;
}
function sd(e) {
  const t = It(e), r = b.useRef(""), n = b.useRef(0), o = b.useCallback(
    (i) => {
      const a = r.current + i;
      t(a), (function l(c) {
        r.current = c, window.clearTimeout(n.current), c !== "" && (n.current = window.setTimeout(() => l(""), 1e3));
      })(a);
    },
    [t]
  ), s = b.useCallback(() => {
    r.current = "", window.clearTimeout(n.current);
  }, []);
  return b.useEffect(() => () => window.clearTimeout(n.current), []), [r, o, s];
}
function id(e, t, r) {
  const o = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t, s = r ? e.indexOf(r) : -1;
  let i = PP(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((c) => c !== r));
  const l = i.find(
    (c) => c.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== r ? l : void 0;
}
function PP(e, t) {
  return e.map((r, n) => e[(t + n) % e.length]);
}
var AP = jf, CP = Ff, RP = $f, TP = Bf, OP = qf, _P = Uf, NP = Vf, kP = Xf, IP = Yf, MP = Zf, jP = ed, DP = td;
function FP({
  ...e
}) {
  return /* @__PURE__ */ x.jsx(AP, { "data-slot": "select", ...e });
}
function LP({
  ...e
}) {
  return /* @__PURE__ */ x.jsx(RP, { "data-slot": "select-value", ...e });
}
function $P({
  className: e,
  size: t = "default",
  children: r,
  ...n
}) {
  return /* @__PURE__ */ x.jsxs(
    CP,
    {
      "data-slot": "select-trigger",
      "data-size": t,
      className: be(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...n,
      children: [
        r,
        /* @__PURE__ */ x.jsx(TP, { asChild: !0, children: /* @__PURE__ */ x.jsx(gn, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function BP({
  className: e,
  children: t,
  position: r = "popper",
  ...n
}) {
  return /* @__PURE__ */ x.jsx(OP, { children: /* @__PURE__ */ x.jsxs(
    _P,
    {
      "data-slot": "select-content",
      className: be(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        r === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: r,
      ...n,
      children: [
        /* @__PURE__ */ x.jsx(UP, {}),
        /* @__PURE__ */ x.jsx(
          NP,
          {
            className: be(
              "p-1",
              r === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ x.jsx(HP, {})
      ]
    }
  ) });
}
function qP({
  className: e,
  children: t,
  ...r
}) {
  return /* @__PURE__ */ x.jsxs(
    kP,
    {
      "data-slot": "select-item",
      className: be(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        e
      ),
      ...r,
      children: [
        /* @__PURE__ */ x.jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ x.jsx(MP, { children: /* @__PURE__ */ x.jsx(Nw, { className: "size-4" }) }) }),
        /* @__PURE__ */ x.jsx(IP, { children: t })
      ]
    }
  );
}
function UP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ x.jsx(
    jP,
    {
      "data-slot": "select-scroll-up-button",
      className: be(
        "flex cursor-default items-center justify-center py-1",
        e
      ),
      ...t,
      children: /* @__PURE__ */ x.jsx(ks, { className: "size-4" })
    }
  );
}
function HP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ x.jsx(
    DP,
    {
      "data-slot": "select-scroll-down-button",
      className: be(
        "flex cursor-default items-center justify-center py-1",
        e
      ),
      ...t,
      children: /* @__PURE__ */ x.jsx(gn, { className: "size-4" })
    }
  );
}
function zP({ label: e, required: t, options: r, value: n, onChange: o, className: s, clearable: i = !0 }) {
  let a = [...r];
  return i && !r.some((l) => !l.value) && (a = [{ label: "-", value: "" }, ...r]), /* @__PURE__ */ x.jsxs("div", { className: s, children: [
    e && /* @__PURE__ */ x.jsx(If, { required: t, children: e }),
    /* @__PURE__ */ x.jsxs(FP, { value: n || "", onValueChange: o, children: [
      /* @__PURE__ */ x.jsx($P, { children: /* @__PURE__ */ x.jsx(LP, {}) }),
      /* @__PURE__ */ x.jsx(BP, { children: a.map(({ label: l, value: c }) => /* @__PURE__ */ x.jsx(qP, { value: c, children: l }, l)) })
    ] })
  ] });
}
function WP({ filters: e, state: t, onFilter: r }) {
  const { __: n } = li(), o = Object.entries(t || {}).filter(([s, i]) => i !== null && i !== "").length;
  return /* @__PURE__ */ x.jsxs(qE, { children: [
    /* @__PURE__ */ x.jsx(UE, { asChild: !0, children: /* @__PURE__ */ x.jsxs(Mn, { variant: "outline", className: "gap-2", children: [
      /* @__PURE__ */ x.jsx(Hw, { className: "h-4 w-4" }),
      n("app.common.filter"),
      !!o && /* @__PURE__ */ x.jsx(ci, { variant: "secondary", className: "ml-1 px-1 py-0 text-xs h-5 w-5 rounded-full", children: o })
    ] }) }),
    /* @__PURE__ */ x.jsx(HE, { className: "w-80", align: "start", children: /* @__PURE__ */ x.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ x.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ x.jsx("h4", { className: "font-medium", children: n("app.common.filters") }),
        /* @__PURE__ */ x.jsx(zE, { onClick: () => r(null), variant: "ghost", children: n("app.common.clear_all") })
      ] }),
      /* @__PURE__ */ x.jsx("div", { className: "space-y-3", children: e.map((s) => {
        var i, a;
        return /* @__PURE__ */ x.jsxs("div", { children: [
          /* @__PURE__ */ x.jsx("label", { className: "text-sm font-medium mb-2 block", children: s.label }),
          (a = (i = {
            select: VP,
            "date-range": GP,
            text: KP
            // Add more filter types here
          })[s.type]) == null ? void 0 : a.call(i, {
            filter: s,
            state: (t == null ? void 0 : t[s.name]) || null,
            onChange: (l) => {
              r({ ...t, [s.name]: l });
            }
          })
        ] }, s.name);
      }) })
    ] }) })
  ] });
}
function VP({ filter: e, state: t, onChange: r }) {
  return /* @__PURE__ */ x.jsx(zP, { options: e.options, value: t, onChange: r });
}
function GP({ filter: e, state: t, onChange: r }) {
  return /* @__PURE__ */ x.jsx(JE, { from: (t == null ? void 0 : t.from) || "", to: (t == null ? void 0 : t.to) || "", onChange: r });
}
function KP({ filter: e, state: t, onChange: r }) {
  return /* @__PURE__ */ x.jsx(
    $s,
    {
      value: t || "",
      onChange: (n) => r(n),
      placeholder: e.placeholder || "",
      className: "w-full",
      autoComplete: "off",
      spellCheck: "false",
      type: "text"
    }
  );
}
const JP = Jw(650, (e) => {
  const [t, r] = on("search", e.target.value);
  Ts.get(t, r, { replace: !0, preserveState: !0 });
}), XP = ({
  showSearch: e = !0,
  showFilter: t = !0,
  showActions: r = !0,
  searchPlaceholder: n,
  onSearch: o,
  onFilter: s,
  filterState: i,
  headerActions: a = [],
  filters: l = []
}) => {
  const [c, u] = Ee(sn("search") || ""), { __: f } = li();
  return n || (n = f("app.common.search") + "..."), /* @__PURE__ */ x.jsxs("div", { className: "p-6 flex items-center justify-between", children: [
    /* @__PURE__ */ x.jsxs("div", { className: "space-x-4 flex items-center", children: [
      e && /* @__PURE__ */ x.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ x.jsx(Ww, { className: "left-3 text-gray-400 h-4 w-4 absolute top-1/2 -translate-y-1/2 transform pointer-events-none" }),
        /* @__PURE__ */ x.jsx(
          Fu,
          {
            type: "text",
            value: c || "",
            placeholder: n,
            className: "pl-10",
            onChange: (m) => {
              u(m.target.value), o ? o(m.target.value) : JP(m);
            }
          }
        )
      ] }),
      t && l.length > 0 && /* @__PURE__ */ x.jsx(WP, { filters: l, state: i, onFilter: s })
    ] }),
    r && a.length > 0 && /* @__PURE__ */ x.jsx("div", { className: "space-x-2 flex items-center", children: a })
  ] });
}, YP = ({ actions: e = [] }) => !e || e.length === 0 ? null : /* @__PURE__ */ x.jsx(ku, { className: "text-right", children: /* @__PURE__ */ x.jsx("div", { className: "space-x-2 flex items-center justify-end", children: e }) }), w0 = ({
  records: e = [],
  columns: t = [],
  showSearch: r = !0,
  showFilter: n = !0,
  showActions: o = !0,
  showPagination: s = !0,
  searchPlaceholder: i,
  headerActions: a = [],
  rowActions: l = null,
  sortable: c = [],
  filters: u = null,
  onSearch: f,
  onFilter: m,
  onSort: h,
  pagination: g = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20
  },
  thClassName: p = "",
  tdClassName: d = "",
  theadClassName: v = ""
}) => {
  const [y, w] = Ee({
    sort: sn("sort") || null,
    direction: sn("direction") || null
  }), [S, P] = Ee(sn("filter") || {}), T = (E) => {
    if (!c.includes(E)) return;
    const I = y.sort === E ? y.direction === "asc" ? "desc" : null : "asc";
    if (I || (E = null), w({ sort: E, direction: I }), h)
      h == null || h(E, I);
    else {
      let [j, L] = on("sort", E);
      const [D, X] = on("direction", I, j);
      Ts.get(D, { ...L, ...X }, { replace: !0, preserveState: !0 });
    }
  }, A = (E, I) => {
    var j, L;
    return I.render ? I.render(E[I.key], E) : I.type === "status" ? /* @__PURE__ */ x.jsx(Pw, { status: (j = E[I.key]) == null ? void 0 : j.label, color: (L = E[I.key]) == null ? void 0 : L.color }) : E[I.key];
  };
  return m || (m = (E) => {
    P(E);
    const [I, j] = on("filter", E);
    Ts.get(I, j, { replace: !0, preserveState: !0 });
  }), /* @__PURE__ */ x.jsxs("div", { className: "w-full", children: [
    (r || o || u) && /* @__PURE__ */ x.jsx(
      XP,
      {
        showSearch: r,
        showFilter: n,
        showActions: o,
        searchPlaceholder: i,
        filters: u,
        filterState: S,
        onSearch: f,
        onFilter: m,
        headerActions: a
      }
    ) || null,
    /* @__PURE__ */ x.jsxs(hw, { children: [
      /* @__PURE__ */ x.jsx(mw, { className: v, children: /* @__PURE__ */ x.jsx(kc, { children: t.filter((E) => !E.hidden).map((E) => /* @__PURE__ */ x.jsx(
        Kw,
        {
          label: E.label,
          sortable: c.includes(E.key),
          sortDirection: y.sort === E.key ? y.direction : null,
          onSort: () => T(E.key),
          colSpan: l && E.key === t[t.length - 1].key ? 2 : 1,
          className: p
        },
        E.key
      )) }) }),
      /* @__PURE__ */ x.jsx(gw, { children: e.map((E, I) => /* @__PURE__ */ x.jsxs(kc, { children: [
        t.filter((j) => !j.hidden).map((j) => /* @__PURE__ */ x.jsx(
          ku,
          {
            className: d,
            children: A(E, j)
          },
          j.key
        )),
        /* @__PURE__ */ x.jsx(YP, { actions: l == null ? void 0 : l(E) })
      ] }, E.id || I)) })
    ] }),
    /* @__PURE__ */ x.jsx(
      Gw,
      {
        showPagination: s,
        currentPage: g.currentPage,
        totalPages: g.totalPages,
        totalItems: g.totalItems,
        itemsPerPage: g.itemsPerPage
      }
    )
  ] });
};
export {
  w0 as DataTable
};
