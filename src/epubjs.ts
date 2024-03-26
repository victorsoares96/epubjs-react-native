export default `
!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e(require("JSZip")))
    : "function" == typeof define && define.amd
      ? define(["JSZip"], e)
      : "object" == typeof exports
        ? (exports.ePub = e(require("JSZip")))
        : (t.ePub = e(t.JSZip));
})(window, function (t) {
  return (function (t) {
    var e = {};
    function i(n) {
      if (e[n]) return e[n].exports;
      var r = (e[n] = { i: n, l: !1, exports: {} });
      return t[n].call(r.exports, r, r.exports, i), (r.l = !0), r.exports;
    }
    return (
      (i.m = t),
      (i.c = e),
      (i.d = function (t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
      }),
      (i.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (i.t = function (t, e) {
        if ((1 & e && (t = i(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (i.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var r in t)
            i.d(
              n,
              r,
              function (e) {
                return t[e];
              }.bind(null, r),
            );
        return n;
      }),
      (i.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return i.d(e, "a", e), e;
      }),
      (i.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (i.p = "/dist/"),
      i((i.s = 77))
    );
  })([
    function (t, e, i) {
      "use strict";
      i.r(e),
        i.d(e, "requestAnimationFrame", function () {
          return r;
        }),
        i.d(e, "uuid", function () {
          return o;
        }),
        i.d(e, "documentHeight", function () {
          return a;
        }),
        i.d(e, "isElement", function () {
          return h;
        }),
        i.d(e, "isNumber", function () {
          return l;
        }),
        i.d(e, "isFloat", function () {
          return c;
        }),
        i.d(e, "prefixed", function () {
          return u;
        }),
        i.d(e, "defaults", function () {
          return d;
        }),
        i.d(e, "extend", function () {
          return f;
        }),
        i.d(e, "insert", function () {
          return p;
        }),
        i.d(e, "locationOf", function () {
          return g;
        }),
        i.d(e, "indexOfSorted", function () {
          return m;
        }),
        i.d(e, "bounds", function () {
          return v;
        }),
        i.d(e, "borders", function () {
          return y;
        }),
        i.d(e, "nodeBounds", function () {
          return b;
        }),
        i.d(e, "windowBounds", function () {
          return w;
        }),
        i.d(e, "indexOfNode", function () {
          return x;
        }),
        i.d(e, "indexOfTextNode", function () {
          return E;
        }),
        i.d(e, "indexOfElementNode", function () {
          return S;
        }),
        i.d(e, "isXml", function () {
          return N;
        }),
        i.d(e, "createBlob", function () {
          return _;
        }),
        i.d(e, "createBlobUrl", function () {
          return O;
        }),
        i.d(e, "revokeBlobUrl", function () {
          return T;
        }),
        i.d(e, "createBase64Url", function () {
          return C;
        }),
        i.d(e, "type", function () {
          return I;
        }),
        i.d(e, "parse", function () {
          return k;
        }),
        i.d(e, "qs", function () {
          return R;
        }),
        i.d(e, "qsa", function () {
          return A;
        }),
        i.d(e, "qsp", function () {
          return L;
        }),
        i.d(e, "sprint", function () {
          return j;
        }),
        i.d(e, "treeWalker", function () {
          return D;
        }),
        i.d(e, "walk", function () {
          return P;
        }),
        i.d(e, "blob2base64", function () {
          return M;
        }),
        i.d(e, "defer", function () {
          return z;
        }),
        i.d(e, "querySelectorByType", function () {
          return B;
        }),
        i.d(e, "findChildren", function () {
          return q;
        }),
        i.d(e, "parents", function () {
          return F;
        }),
        i.d(e, "filterChildren", function () {
          return U;
        }),
        i.d(e, "getParentByTagName", function () {
          return W;
        }),
        i.d(e, "RangeObject", function () {
          return H;
        });
      var n = i(28);
      const r =
          "undefined" != typeof window &&
          (window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame),
        s =
          "undefined" != typeof URL
            ? URL
            : "undefined" != typeof window
              ? window.URL || window.webkitURL || window.mozURL
              : void 0;
      function o() {
        var t = new Date().getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (e) {
            var i = (t + 16 * Math.random()) % 16 | 0;
            return (
              (t = Math.floor(t / 16)),
              ("x" == e ? i : (7 & i) | 8).toString(16)
            );
          },
        );
      }
      function a() {
        return Math.max(
          document.documentElement.clientHeight,
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
        );
      }
      function h(t) {
        return !(!t || 1 != t.nodeType);
      }
      function l(t) {
        return !isNaN(parseFloat(t)) && isFinite(t);
      }
      function c(t) {
        let e = parseFloat(t);
        return (
          !1 !== l(t) &&
          (("string" == typeof t && t.indexOf(".") > -1) || Math.floor(e) !== e)
        );
      }
      function u(t) {
        var e = ["-webkit-", "-webkit-", "-moz-", "-o-", "-ms-"],
          i = t.toLowerCase(),
          n = ["Webkit", "webkit", "Moz", "O", "ms"].length;
        if ("undefined" == typeof document || void 0 !== document.body.style[i])
          return t;
        for (var r = 0; r < n; r++)
          if (void 0 !== document.body.style[e[r] + i]) return e[r] + i;
        return t;
      }
      function d(t) {
        for (var e = 1, i = arguments.length; e < i; e++) {
          var n = arguments[e];
          for (var r in n) void 0 === t[r] && (t[r] = n[r]);
        }
        return t;
      }
      function f(t) {
        var e = [].slice.call(arguments, 1);
        return (
          e.forEach(function (e) {
            e &&
              Object.getOwnPropertyNames(e).forEach(function (i) {
                Object.defineProperty(
                  t,
                  i,
                  Object.getOwnPropertyDescriptor(e, i),
                );
              });
          }),
          t
        );
      }
      function p(t, e, i) {
        var n = g(t, e, i);
        return e.splice(n, 0, t), n;
      }
      function g(t, e, i, n, r) {
        var s,
          o = n || 0,
          a = r || e.length,
          h = parseInt(o + (a - o) / 2);
        return (
          i ||
            (i = function (t, e) {
              return t > e ? 1 : t < e ? -1 : t == e ? 0 : void 0;
            }),
          a - o <= 0
            ? h
            : ((s = i(e[h], t)),
              a - o == 1
                ? s >= 0
                  ? h
                  : h + 1
                : 0 === s
                  ? h
                  : -1 === s
                    ? g(t, e, i, h, a)
                    : g(t, e, i, o, h))
        );
      }
      function m(t, e, i, n, r) {
        var s,
          o = n || 0,
          a = r || e.length,
          h = parseInt(o + (a - o) / 2);
        return (
          i ||
            (i = function (t, e) {
              return t > e ? 1 : t < e ? -1 : t == e ? 0 : void 0;
            }),
          a - o <= 0
            ? -1
            : ((s = i(e[h], t)),
              a - o == 1
                ? 0 === s
                  ? h
                  : -1
                : 0 === s
                  ? h
                  : -1 === s
                    ? m(t, e, i, h, a)
                    : m(t, e, i, o, h))
        );
      }
      function v(t) {
        var e = window.getComputedStyle(t),
          i = 0,
          n = 0;
        return (
          [
            "width",
            "paddingRight",
            "paddingLeft",
            "marginRight",
            "marginLeft",
            "borderRightWidth",
            "borderLeftWidth",
          ].forEach(function (t) {
            i += parseFloat(e[t]) || 0;
          }),
          [
            "height",
            "paddingTop",
            "paddingBottom",
            "marginTop",
            "marginBottom",
            "borderTopWidth",
            "borderBottomWidth",
          ].forEach(function (t) {
            n += parseFloat(e[t]) || 0;
          }),
          { height: n, width: i }
        );
      }
      function y(t) {
        var e = window.getComputedStyle(t),
          i = 0,
          n = 0;
        return (
          [
            "paddingRight",
            "paddingLeft",
            "marginRight",
            "marginLeft",
            "borderRightWidth",
            "borderLeftWidth",
          ].forEach(function (t) {
            i += parseFloat(e[t]) || 0;
          }),
          [
            "paddingTop",
            "paddingBottom",
            "marginTop",
            "marginBottom",
            "borderTopWidth",
            "borderBottomWidth",
          ].forEach(function (t) {
            n += parseFloat(e[t]) || 0;
          }),
          { height: n, width: i }
        );
      }
      function b(t) {
        let e,
          i = t.ownerDocument;
        if (t.nodeType == Node.TEXT_NODE) {
          let n = i.createRange();
          n.selectNodeContents(t), (e = n.getBoundingClientRect());
        } else e = t.getBoundingClientRect();
        return e;
      }
      function w() {
        var t = window.innerWidth,
          e = window.innerHeight;
        return { top: 0, left: 0, right: t, bottom: e, width: t, height: e };
      }
      function x(t, e) {
        for (
          var i, n = t.parentNode.childNodes, r = -1, s = 0;
          s < n.length && ((i = n[s]).nodeType === e && r++, i != t);
          s++
        );
        return r;
      }
      function E(t) {
        return x(t, 3);
      }
      function S(t) {
        return x(t, 1);
      }
      function N(t) {
        return ["xml", "opf", "ncx"].indexOf(t) > -1;
      }
      function _(t, e) {
        return new Blob([t], { type: e });
      }
      function O(t, e) {
        var i = _(t, e);
        return s.createObjectURL(i);
      }
      function T(t) {
        return s.revokeObjectURL(t);
      }
      function C(t, e) {
        if ("string" == typeof t) return "data:" + e + ";base64," + btoa(t);
      }
      function I(t) {
        return Object.prototype.toString.call(t).slice(8, -1);
      }
      function k(t, e, i) {
        var r;
        return (
          (r = "undefined" == typeof DOMParser || i ? n.DOMParser : DOMParser),
          65279 === t.charCodeAt(0) && (t = t.slice(1)),
          new r().parseFromString(t, e)
        );
      }
      function R(t, e) {
        var i;
        if (!t) throw new Error("No Element Provided");
        return void 0 !== t.querySelector
          ? t.querySelector(e)
          : (i = t.getElementsByTagName(e)).length
            ? i[0]
            : void 0;
      }
      function A(t, e) {
        return void 0 !== t.querySelector
          ? t.querySelectorAll(e)
          : t.getElementsByTagName(e);
      }
      function L(t, e, i) {
        var n, r;
        if (void 0 !== t.querySelector) {
          for (var s in ((e += "["), i)) e += s + "~='" + i[s] + "'";
          return (e += "]"), t.querySelector(e);
        }
        if (
          ((n = t.getElementsByTagName(e)),
          (r = Array.prototype.slice.call(n, 0).filter(function (t) {
            for (var e in i) if (t.getAttribute(e) === i[e]) return !0;
            return !1;
          })))
        )
          return r[0];
      }
      function j(t, e) {
        void 0 !== (t.ownerDocument || t).createTreeWalker
          ? D(t, e, NodeFilter.SHOW_TEXT)
          : P(t, function (t) {
              t && 3 === t.nodeType && e(t);
            });
      }
      function D(t, e, i) {
        var n = document.createTreeWalker(t, i, null, !1);
        let r;
        for (; (r = n.nextNode()); ) e(r);
      }
      function P(t, e) {
        if (e(t)) return !0;
        if ((t = t.firstChild))
          do {
            if (P(t, e)) return !0;
            t = t.nextSibling;
          } while (t);
      }
      function M(t) {
        return new Promise(function (e, i) {
          var n = new FileReader();
          n.readAsDataURL(t),
            (n.onloadend = function () {
              e(n.result);
            });
        });
      }
      function z() {
        (this.resolve = null),
          (this.reject = null),
          (this.id = o()),
          (this.promise = new Promise((t, e) => {
            (this.resolve = t), (this.reject = e);
          })),
          Object.freeze(this);
      }
      function B(t, e, i) {
        var n;
        if (
          (void 0 !== t.querySelector &&
            (n = t.querySelector(\`\${e}[*|type="\${i}"]\`)),
          n && 0 !== n.length)
        )
          return n;
        n = A(t, e);
        for (var r = 0; r < n.length; r++)
          if (
            n[r].getAttributeNS("http://www.idpf.org/2007/ops", "type") === i ||
            n[r].getAttribute("epub:type") === i
          )
            return n[r];
      }
      function q(t) {
        for (var e = [], i = t.childNodes, n = 0; n < i.length; n++) {
          let t = i[n];
          1 === t.nodeType && e.push(t);
        }
        return e;
      }
      function F(t) {
        for (var e = [t]; t; t = t.parentNode) e.unshift(t);
        return e;
      }
      function U(t, e, i) {
        for (var n = [], r = t.childNodes, s = 0; s < r.length; s++) {
          let t = r[s];
          if (1 === t.nodeType && t.nodeName.toLowerCase() === e) {
            if (i) return t;
            n.push(t);
          }
        }
        if (!i) return n;
      }
      function W(t, e) {
        let i;
        if (null !== t && "" !== e)
          for (i = t.parentNode; 1 === i.nodeType; ) {
            if (i.tagName.toLowerCase() === e) return i;
            i = i.parentNode;
          }
      }
      class H {
        constructor() {
          (this.collapsed = !1),
            (this.commonAncestorContainer = void 0),
            (this.endContainer = void 0),
            (this.endOffset = void 0),
            (this.startContainer = void 0),
            (this.startOffset = void 0);
        }
        setStart(t, e) {
          (this.startContainer = t),
            (this.startOffset = e),
            this.endContainer
              ? (this.commonAncestorContainer = this._commonAncestorContainer())
              : this.collapse(!0),
            this._checkCollapsed();
        }
        setEnd(t, e) {
          (this.endContainer = t),
            (this.endOffset = e),
            this.startContainer
              ? ((this.collapsed = !1),
                (this.commonAncestorContainer =
                  this._commonAncestorContainer()))
              : this.collapse(!1),
            this._checkCollapsed();
        }
        collapse(t) {
          (this.collapsed = !0),
            t
              ? ((this.endContainer = this.startContainer),
                (this.endOffset = this.startOffset),
                (this.commonAncestorContainer = this.startContainer.parentNode))
              : ((this.startContainer = this.endContainer),
                (this.startOffset = this.endOffset),
                (this.commonAncestorContainer = this.endOffset.parentNode));
        }
        selectNode(t) {
          let e = t.parentNode,
            i = Array.prototype.indexOf.call(e.childNodes, t);
          this.setStart(e, i), this.setEnd(e, i + 1);
        }
        selectNodeContents(t) {
          t.childNodes[t.childNodes - 1];
          let e =
            3 === t.nodeType ? t.textContent.length : parent.childNodes.length;
          this.setStart(t, 0), this.setEnd(t, e);
        }
        _commonAncestorContainer(t, e) {
          var i = F(t || this.startContainer),
            n = F(e || this.endContainer);
          if (i[0] == n[0])
            for (var r = 0; r < i.length; r++)
              if (i[r] != n[r]) return i[r - 1];
        }
        _checkCollapsed() {
          this.startContainer === this.endContainer &&
          this.startOffset === this.endOffset
            ? (this.collapsed = !0)
            : (this.collapsed = !1);
        }
        toString() {}
      }
    },
    function (t, e, i) {
      "use strict";
      i.d(e, "b", function () {
        return n;
      }),
        i.d(e, "a", function () {
          return r;
        }),
        i.d(e, "c", function () {
          return s;
        });
      const n = "0.3",
        r = [
          "keydown",
          "keyup",
          "keypressed",
          "mouseup",
          "mousedown",
          "mousemove",
          "click",
          "touchend",
          "touchstart",
          "touchmove",
        ],
        s = {
          BOOK: { OPEN_FAILED: "openFailed" },
          CONTENTS: {
            EXPAND: "expand",
            RESIZE: "resize",
            SELECTED: "selected",
            SELECTED_RANGE: "selectedRange",
            LINK_CLICKED: "linkClicked",
          },
          LOCATIONS: { CHANGED: "changed" },
          MANAGERS: {
            RESIZE: "resize",
            RESIZED: "resized",
            ORIENTATION_CHANGE: "orientationchange",
            ADDED: "added",
            SCROLL: "scroll",
            SCROLLED: "scrolled",
            REMOVED: "removed",
          },
          VIEWS: {
            AXIS: "axis",
            WRITING_MODE: "writingMode",
            LOAD_ERROR: "loaderror",
            RENDERED: "rendered",
            RESIZED: "resized",
            DISPLAYED: "displayed",
            SHOWN: "shown",
            HIDDEN: "hidden",
            MARK_CLICKED: "markClicked",
          },
          RENDITION: {
            STARTED: "started",
            ATTACHED: "attached",
            DISPLAYED: "displayed",
            DISPLAY_ERROR: "displayerror",
            RENDERED: "rendered",
            REMOVED: "removed",
            RESIZED: "resized",
            ORIENTATION_CHANGE: "orientationchange",
            LOCATION_CHANGED: "locationChanged",
            RELOCATED: "relocated",
            MARK_CLICKED: "markClicked",
            SELECTED: "selected",
            LAYOUT: "layout",
          },
          LAYOUT: { UPDATED: "updated" },
          ANNOTATION: { ATTACH: "attach", DETACH: "detach" },
        };
    },
    function (t, e, i) {
      "use strict";
      var n = i(0);
      class r {
        constructor(t, e, i) {
          var s;
          if (
            ((this.str = ""),
            (this.base = {}),
            (this.spinePos = 0),
            (this.range = !1),
            (this.path = {}),
            (this.start = null),
            (this.end = null),
            !(this instanceof r))
          )
            return new r(t, e, i);
          if (
            ("string" == typeof e
              ? (this.base = this.parseComponent(e))
              : "object" == typeof e && e.steps && (this.base = e),
            "string" === (s = this.checkType(t)))
          )
            return (this.str = t), Object(n.extend)(this, this.parse(t));
          if ("range" === s)
            return Object(n.extend)(this, this.fromRange(t, this.base, i));
          if ("node" === s)
            return Object(n.extend)(this, this.fromNode(t, this.base, i));
          if ("EpubCFI" === s && t.path) return t;
          if (t) throw new TypeError("not a valid argument for EpubCFI");
          return this;
        }
        checkType(t) {
          return this.isCfiString(t)
            ? "string"
            : !t ||
                "object" != typeof t ||
                ("Range" !== Object(n.type)(t) && void 0 === t.startContainer)
              ? t && "object" == typeof t && void 0 !== t.nodeType
                ? "node"
                : !!(t && "object" == typeof t && t instanceof r) && "EpubCFI"
              : "range";
        }
        parse(t) {
          var e,
            i,
            n,
            r = {
              spinePos: -1,
              range: !1,
              base: {},
              path: {},
              start: null,
              end: null,
            };
          return "string" != typeof t
            ? { spinePos: -1 }
            : (0 === t.indexOf("epubcfi(") &&
                ")" === t[t.length - 1] &&
                (t = t.slice(8, t.length - 1)),
              (e = this.getChapterComponent(t))
                ? ((r.base = this.parseComponent(e)),
                  (i = this.getPathComponent(t)),
                  (r.path = this.parseComponent(i)),
                  (n = this.getRange(t)) &&
                    ((r.range = !0),
                    (r.start = this.parseComponent(n[0])),
                    (r.end = this.parseComponent(n[1]))),
                  (r.spinePos = r.base.steps[1].index),
                  r)
                : { spinePos: -1 });
        }
        parseComponent(t) {
          var e,
            i = { steps: [], terminal: { offset: null, assertion: null } },
            n = t.split(":"),
            r = n[0].split("/");
          return (
            n.length > 1 && ((e = n[1]), (i.terminal = this.parseTerminal(e))),
            "" === r[0] && r.shift(),
            (i.steps = r.map(
              function (t) {
                return this.parseStep(t);
              }.bind(this),
            )),
            i
          );
        }
        parseStep(t) {
          var e, i, n, r, s;
          if (
            ((r = t.match(/\\[(.*)\\]/)) && r[1] && (s = r[1]),
            (i = parseInt(t)),
            !isNaN(i))
          )
            return (
              i % 2 == 0
                ? ((e = "element"), (n = i / 2 - 1))
                : ((e = "text"), (n = (i - 1) / 2)),
              { type: e, index: n, id: s || null }
            );
        }
        parseTerminal(t) {
          var e,
            i,
            r = t.match(/\\[(.*)\\]/);
          return (
            r && r[1]
              ? ((e = parseInt(t.split("[")[0])), (i = r[1]))
              : (e = parseInt(t)),
            Object(n.isNumber)(e) || (e = null),
            { offset: e, assertion: i }
          );
        }
        getChapterComponent(t) {
          return t.split("!")[0];
        }
        getPathComponent(t) {
          var e = t.split("!");
          if (e[1]) {
            return e[1].split(",")[0];
          }
        }
        getRange(t) {
          var e = t.split(",");
          return 3 === e.length && [e[1], e[2]];
        }
        getCharecterOffsetComponent(t) {
          return t.split(":")[1] || "";
        }
        joinSteps(t) {
          return t
            ? t
                .map(function (t) {
                  var e = "";
                  return (
                    "element" === t.type && (e += 2 * (t.index + 1)),
                    "text" === t.type && (e += 1 + 2 * t.index),
                    t.id && (e += "[" + t.id + "]"),
                    e
                  );
                })
                .join("/")
            : "";
        }
        segmentString(t) {
          var e = "/";
          return (
            (e += this.joinSteps(t.steps)),
            t.terminal &&
              null != t.terminal.offset &&
              (e += ":" + t.terminal.offset),
            t.terminal &&
              null != t.terminal.assertion &&
              (e += "[" + t.terminal.assertion + "]"),
            e
          );
        }
        toString() {
          var t = "epubcfi(";
          return (
            (t += this.segmentString(this.base)),
            (t += "!"),
            (t += this.segmentString(this.path)),
            this.range &&
              this.start &&
              ((t += ","), (t += this.segmentString(this.start))),
            this.range &&
              this.end &&
              ((t += ","), (t += this.segmentString(this.end))),
            (t += ")")
          );
        }
        compare(t, e) {
          var i, n, s, o;
          if (
            ("string" == typeof t && (t = new r(t)),
            "string" == typeof e && (e = new r(e)),
            t.spinePos > e.spinePos)
          )
            return 1;
          if (t.spinePos < e.spinePos) return -1;
          t.range
            ? ((i = t.path.steps.concat(t.start.steps)), (s = t.start.terminal))
            : ((i = t.path.steps), (s = t.path.terminal)),
            e.range
              ? ((n = e.path.steps.concat(e.start.steps)),
                (o = e.start.terminal))
              : ((n = e.path.steps), (o = e.path.terminal));
          for (var a = 0; a < i.length; a++) {
            if (!i[a]) return -1;
            if (!n[a]) return 1;
            if (i[a].index > n[a].index) return 1;
            if (i[a].index < n[a].index) return -1;
          }
          return i.length < n.length
            ? -1
            : s.offset > o.offset
              ? 1
              : s.offset < o.offset
                ? -1
                : 0;
        }
        step(t) {
          var e = 3 === t.nodeType ? "text" : "element";
          return {
            id: t.id,
            tagName: t.tagName,
            type: e,
            index: this.position(t),
          };
        }
        filteredStep(t, e) {
          var i,
            n = this.filter(t, e);
          if (n)
            return (
              (i = 3 === n.nodeType ? "text" : "element"),
              {
                id: n.id,
                tagName: n.tagName,
                type: i,
                index: this.filteredPosition(n, e),
              }
            );
        }
        pathTo(t, e, i) {
          for (
            var n,
              r = { steps: [], terminal: { offset: null, assertion: null } },
              s = t;
            s && s.parentNode && 9 != s.parentNode.nodeType;

          )
            (n = i ? this.filteredStep(s, i) : this.step(s)) &&
              r.steps.unshift(n),
              (s = s.parentNode);
          return (
            null != e &&
              e >= 0 &&
              ((r.terminal.offset = e),
              "text" != r.steps[r.steps.length - 1].type &&
                r.steps.push({ type: "text", index: 0 })),
            r
          );
        }
        equalStep(t, e) {
          return (
            !(!t || !e) &&
            t.index === e.index &&
            t.id === e.id &&
            t.type === e.type
          );
        }
        fromRange(t, e, i) {
          var n = { range: !1, base: {}, path: {}, start: null, end: null },
            r = t.startContainer,
            s = t.endContainer,
            o = t.startOffset,
            a = t.endOffset,
            h = !1;
          if (
            (i && (h = null != r.ownerDocument.querySelector("." + i)),
            "string" == typeof e
              ? ((n.base = this.parseComponent(e)),
                (n.spinePos = n.base.steps[1].index))
              : "object" == typeof e && (n.base = e),
            t.collapsed)
          )
            h && (o = this.patchOffset(r, o, i)),
              (n.path = this.pathTo(r, o, i));
          else {
            (n.range = !0),
              h && (o = this.patchOffset(r, o, i)),
              (n.start = this.pathTo(r, o, i)),
              h && (a = this.patchOffset(s, a, i)),
              (n.end = this.pathTo(s, a, i)),
              (n.path = { steps: [], terminal: null });
            var l,
              c = n.start.steps.length;
            for (
              l = 0;
              l < c && this.equalStep(n.start.steps[l], n.end.steps[l]);
              l++
            )
              l === c - 1
                ? n.start.terminal === n.end.terminal &&
                  (n.path.steps.push(n.start.steps[l]), (n.range = !1))
                : n.path.steps.push(n.start.steps[l]);
            (n.start.steps = n.start.steps.slice(n.path.steps.length)),
              (n.end.steps = n.end.steps.slice(n.path.steps.length));
          }
          return n;
        }
        fromNode(t, e, i) {
          var n = { range: !1, base: {}, path: {}, start: null, end: null };
          return (
            "string" == typeof e
              ? ((n.base = this.parseComponent(e)),
                (n.spinePos = n.base.steps[1].index))
              : "object" == typeof e && (n.base = e),
            (n.path = this.pathTo(t, null, i)),
            n
          );
        }
        filter(t, e) {
          var i,
            n,
            r,
            s,
            o,
            a = !1;
          return (
            3 === t.nodeType
              ? ((a = !0),
                (r = t.parentNode),
                (i = t.parentNode.classList.contains(e)))
              : ((a = !1), (i = t.classList.contains(e))),
            i && a
              ? ((s = r.previousSibling),
                (o = r.nextSibling),
                s && 3 === s.nodeType
                  ? (n = s)
                  : o && 3 === o.nodeType && (n = o),
                n || t)
              : !(i && !a) && t
          );
        }
        patchOffset(t, e, i) {
          if (3 != t.nodeType) throw new Error("Anchor must be a text node");
          var n = t,
            r = e;
          for (
            t.parentNode.classList.contains(i) && (n = t.parentNode);
            n.previousSibling;

          ) {
            if (1 === n.previousSibling.nodeType) {
              if (!n.previousSibling.classList.contains(i)) break;
              r += n.previousSibling.textContent.length;
            } else r += n.previousSibling.textContent.length;
            n = n.previousSibling;
          }
          return r;
        }
        normalizedMap(t, e, i) {
          var n,
            r,
            s,
            o = {},
            a = -1,
            h = t.length;
          for (n = 0; n < h; n++)
            1 === (r = t[n].nodeType) && t[n].classList.contains(i) && (r = 3),
              n > 0 && 3 === r && 3 === s
                ? (o[n] = a)
                : e === r && ((a += 1), (o[n] = a)),
              (s = r);
          return o;
        }
        position(t) {
          var e, i;
          return (
            1 === t.nodeType
              ? ((e = t.parentNode.children) ||
                  (e = Object(n.findChildren)(t.parentNode)),
                (i = Array.prototype.indexOf.call(e, t)))
              : (i = (e = this.textNodes(t.parentNode)).indexOf(t)),
            i
          );
        }
        filteredPosition(t, e) {
          var i, n;
          return (
            1 === t.nodeType
              ? ((i = t.parentNode.children), (n = this.normalizedMap(i, 1, e)))
              : ((i = t.parentNode.childNodes),
                t.parentNode.classList.contains(e) &&
                  (i = (t = t.parentNode).parentNode.childNodes),
                (n = this.normalizedMap(i, 3, e))),
            n[Array.prototype.indexOf.call(i, t)]
          );
        }
        stepsToXpath(t) {
          var e = [".", "*"];
          return (
            t.forEach(function (t) {
              var i = t.index + 1;
              t.id
                ? e.push("*[position()=" + i + " and @id='" + t.id + "']")
                : "text" === t.type
                  ? e.push("text()[" + i + "]")
                  : e.push("*[" + i + "]");
            }),
            e.join("/")
          );
        }
        stepsToQuerySelector(t) {
          var e = ["html"];
          return (
            t.forEach(function (t) {
              var i = t.index + 1;
              t.id
                ? e.push("#" + t.id)
                : "text" === t.type || e.push("*:nth-child(" + i + ")");
            }),
            e.join(">")
          );
        }
        textNodes(t, e) {
          return Array.prototype.slice.call(t.childNodes).filter(function (t) {
            return 3 === t.nodeType || !(!e || !t.classList.contains(e));
          });
        }
        walkToNode(t, e, i) {
          var r,
            s,
            o = e || document,
            a = o.documentElement,
            h = t.length;
          for (
            s = 0;
            s < h &&
            ("element" === (r = t[s]).type
              ? (a = r.id
                  ? o.getElementById(r.id)
                  : (a.children || Object(n.findChildren)(a))[r.index])
              : "text" === r.type && (a = this.textNodes(a, i)[r.index]),
            a);
            s++
          );
          return a;
        }
        findNode(t, e, i) {
          var n,
            r,
            s = e || document;
          return (
            i || void 0 === s.evaluate
              ? (n = i ? this.walkToNode(t, s, i) : this.walkToNode(t, s))
              : ((r = this.stepsToXpath(t)),
                (n = s.evaluate(
                  r,
                  s,
                  null,
                  XPathResult.FIRST_ORDERED_NODE_TYPE,
                  null,
                ).singleNodeValue)),
            n
          );
        }
        fixMiss(t, e, i, n) {
          var r,
            s,
            o = this.findNode(t.slice(0, -1), i, n),
            a = o.childNodes,
            h = this.normalizedMap(a, 3, n),
            l = t[t.length - 1].index;
          for (let t in h) {
            if (!h.hasOwnProperty(t)) return;
            if (h[t] === l) {
              if (!(e > (s = (r = a[t]).textContent.length))) {
                o = 1 === r.nodeType ? r.childNodes[0] : r;
                break;
              }
              e -= s;
            }
          }
          return { container: o, offset: e };
        }
        toRange(t, e) {
          var i,
            r,
            s,
            o,
            a,
            h,
            l,
            c,
            u = t || document,
            d = !!e && null != u.querySelector("." + e);
          if (
            ((i =
              void 0 !== u.createRange ? u.createRange() : new n.RangeObject()),
            this.range
              ? ((r = this.start),
                (h = this.path.steps.concat(r.steps)),
                (o = this.findNode(h, u, d ? e : null)),
                (s = this.end),
                (l = this.path.steps.concat(s.steps)),
                (a = this.findNode(l, u, d ? e : null)))
              : ((r = this.path),
                (h = this.path.steps),
                (o = this.findNode(this.path.steps, u, d ? e : null))),
            !o)
          )
            return (
              console.log("No startContainer found for", this.toString()), null
            );
          try {
            null != r.terminal.offset
              ? i.setStart(o, r.terminal.offset)
              : i.setStart(o, 0);
          } catch (t) {
            (c = this.fixMiss(h, r.terminal.offset, u, d ? e : null)),
              i.setStart(c.container, c.offset);
          }
          if (a)
            try {
              null != s.terminal.offset
                ? i.setEnd(a, s.terminal.offset)
                : i.setEnd(a, 0);
            } catch (t) {
              (c = this.fixMiss(l, this.end.terminal.offset, u, d ? e : null)),
                i.setEnd(c.container, c.offset);
            }
          return i;
        }
        isCfiString(t) {
          return (
            "string" == typeof t &&
            0 === t.indexOf("epubcfi(") &&
            ")" === t[t.length - 1]
          );
        }
        generateChapterComponent(t, e, i) {
          var n = "/" + 2 * (t + 1) + "/";
          return (n += 2 * (parseInt(e) + 1)), i && (n += "[" + i + "]"), n;
        }
        collapse(t) {
          this.range &&
            ((this.range = !1),
            t
              ? ((this.path.steps = this.path.steps.concat(this.start.steps)),
                (this.path.terminal = this.start.terminal))
              : ((this.path.steps = this.path.steps.concat(this.end.steps)),
                (this.path.terminal = this.end.terminal)));
        }
      }
      e.a = r;
    },
    function (t, e, i) {
      "use strict";
      var n,
        r,
        s,
        o,
        a,
        h,
        l,
        c = i(78),
        u = i(92),
        d = Function.prototype.apply,
        f = Function.prototype.call,
        p = Object.create,
        g = Object.defineProperty,
        m = Object.defineProperties,
        v = Object.prototype.hasOwnProperty,
        y = { configurable: !0, enumerable: !1, writable: !0 };
      (r = function (t, e) {
        var i, r;
        return (
          u(e),
          (r = this),
          n.call(
            this,
            t,
            (i = function () {
              s.call(r, t, i), d.call(e, this, arguments);
            }),
          ),
          (i.__eeOnceListener__ = e),
          this
        );
      }),
        (a = {
          on: (n = function (t, e) {
            var i;
            return (
              u(e),
              v.call(this, "__ee__")
                ? (i = this.__ee__)
                : ((i = y.value = p(null)),
                  g(this, "__ee__", y),
                  (y.value = null)),
              i[t]
                ? "object" == typeof i[t]
                  ? i[t].push(e)
                  : (i[t] = [i[t], e])
                : (i[t] = e),
              this
            );
          }),
          once: r,
          off: (s = function (t, e) {
            var i, n, r, s;
            if ((u(e), !v.call(this, "__ee__"))) return this;
            if (!(i = this.__ee__)[t]) return this;
            if ("object" == typeof (n = i[t]))
              for (s = 0; (r = n[s]); ++s)
                (r !== e && r.__eeOnceListener__ !== e) ||
                  (2 === n.length ? (i[t] = n[s ? 0 : 1]) : n.splice(s, 1));
            else (n !== e && n.__eeOnceListener__ !== e) || delete i[t];
            return this;
          }),
          emit: (o = function (t) {
            var e, i, n, r, s;
            if (v.call(this, "__ee__") && (r = this.__ee__[t]))
              if ("object" == typeof r) {
                for (
                  i = arguments.length, s = new Array(i - 1), e = 1;
                  e < i;
                  ++e
                )
                  s[e - 1] = arguments[e];
                for (r = r.slice(), e = 0; (n = r[e]); ++e) d.call(n, this, s);
              } else
                switch (arguments.length) {
                  case 1:
                    f.call(r, this);
                    break;
                  case 2:
                    f.call(r, this, arguments[1]);
                    break;
                  case 3:
                    f.call(r, this, arguments[1], arguments[2]);
                    break;
                  default:
                    for (
                      i = arguments.length, s = new Array(i - 1), e = 1;
                      e < i;
                      ++e
                    )
                      s[e - 1] = arguments[e];
                    d.call(r, this, s);
                }
          }),
        }),
        (h = { on: c(n), once: c(r), off: c(s), emit: c(o) }),
        (l = m({}, h)),
        (t.exports = e =
          function (t) {
            return null == t ? p(l) : m(Object(t), h);
          }),
        (e.methods = a);
    },
    function (t, e, i) {
      "use strict";
      var n = i(8),
        r = i.n(n);
      e.a = class {
        constructor(t) {
          var e;
          t.indexOf("://") > -1 && (t = new URL(t).pathname),
            (e = this.parse(t)),
            (this.path = t),
            this.isDirectory(t)
              ? (this.directory = t)
              : (this.directory = e.dir + "/"),
            (this.filename = e.base),
            (this.extension = e.ext.slice(1));
        }
        parse(t) {
          return r.a.parse(t);
        }
        isAbsolute(t) {
          return r.a.isAbsolute(t || this.path);
        }
        isDirectory(t) {
          return "/" === t.charAt(t.length - 1);
        }
        join(t) {
          return r.a.join(this.directory, t);
        }
        resolve(t) {
          return r.a.resolve(this.directory, t);
        }
        relative(t) {
          return t && t.indexOf("://") > -1
            ? t
            : r.a.relative(this.directory, t);
        }
        splitPath(t) {
          return this.splitPathRe.exec(t).slice(1);
        }
        toString() {
          return this.path;
        }
      };
    },
    function (t, e, i) {
      "use strict";
      var n = i(4),
        r = i(8),
        s = i.n(r);
      e.a = class {
        constructor(t, e) {
          var i = t.indexOf("://") > -1,
            r = t;
          if (
            ((this.Url = void 0),
            (this.href = t),
            (this.protocol = ""),
            (this.origin = ""),
            (this.hash = ""),
            (this.hash = ""),
            (this.search = ""),
            (this.base = e),
            !i &&
              !1 !== e &&
              "string" != typeof e &&
              window &&
              window.location &&
              (this.base = window.location.href),
            i || this.base)
          )
            try {
              this.base
                ? (this.Url = new URL(t, this.base))
                : (this.Url = new URL(t)),
                (this.href = this.Url.href),
                (this.protocol = this.Url.protocol),
                (this.origin = this.Url.origin),
                (this.hash = this.Url.hash),
                (this.search = this.Url.search),
                (r =
                  this.Url.pathname + (this.Url.search ? this.Url.search : ""));
            } catch (t) {
              (this.Url = void 0),
                this.base && (r = new n.a(this.base).resolve(r));
            }
          (this.Path = new n.a(r)),
            (this.directory = this.Path.directory),
            (this.filename = this.Path.filename),
            (this.extension = this.Path.extension);
        }
        path() {
          return this.Path;
        }
        resolve(t) {
          var e;
          return t.indexOf("://") > -1
            ? t
            : ((e = s.a.resolve(this.directory, t)), this.origin + e);
        }
        relative(t) {
          return s.a.relative(t, this.directory);
        }
        toString() {
          return this.href;
        }
      };
    },
    function (t, e, i) {
      "use strict";
      e.a = class {
        constructor(t) {
          (this.context = t || this), (this.hooks = []);
        }
        register() {
          for (var t = 0; t < arguments.length; ++t)
            if ("function" == typeof arguments[t])
              this.hooks.push(arguments[t]);
            else
              for (var e = 0; e < arguments[t].length; ++e)
                this.hooks.push(arguments[t][e]);
        }
        deregister(t) {
          let e;
          for (let i = 0; i < this.hooks.length; i++)
            if (((e = this.hooks[i]), e === t)) {
              this.hooks.splice(i, 1);
              break;
            }
        }
        trigger() {
          var t = arguments,
            e = this.context,
            i = [];
          return (
            this.hooks.forEach(function (n) {
              try {
                var r = n.apply(e, t);
              } catch (t) {
                console.log(t);
              }
              r && "function" == typeof r.then && i.push(r);
            }),
            Promise.all(i)
          );
        }
        list() {
          return this.hooks;
        }
        clear() {
          return (this.hooks = []);
        }
      };
    },
    function (t, e) {
      t.exports = function (t) {
        return "function" == typeof t;
      };
    },
    function (t, e, i) {
      "use strict";
      if (!n)
        var n = {
          cwd: function () {
            return "/";
          },
        };
      function r(t) {
        if ("string" != typeof t)
          throw new TypeError("Path must be a string. Received " + t);
      }
      function s(t, e) {
        for (var i, n = "", r = -1, s = 0, o = 0; o <= t.length; ++o) {
          if (o < t.length) i = t.charCodeAt(o);
          else {
            if (47 === i) break;
            i = 47;
          }
          if (47 === i) {
            if (r === o - 1 || 1 === s);
            else if (r !== o - 1 && 2 === s) {
              if (
                n.length < 2 ||
                46 !== n.charCodeAt(n.length - 1) ||
                46 !== n.charCodeAt(n.length - 2)
              )
                if (n.length > 2) {
                  for (
                    var a = n.length - 1, h = a;
                    h >= 0 && 47 !== n.charCodeAt(h);
                    --h
                  );
                  if (h !== a) {
                    (n = -1 === h ? "" : n.slice(0, h)), (r = o), (s = 0);
                    continue;
                  }
                } else if (2 === n.length || 1 === n.length) {
                  (n = ""), (r = o), (s = 0);
                  continue;
                }
              e && (n.length > 0 ? (n += "/..") : (n = ".."));
            } else
              n.length > 0
                ? (n += "/" + t.slice(r + 1, o))
                : (n = t.slice(r + 1, o));
            (r = o), (s = 0);
          } else 46 === i && -1 !== s ? ++s : (s = -1);
        }
        return n;
      }
      var o = {
        resolve: function () {
          for (
            var t, e = "", i = !1, o = arguments.length - 1;
            o >= -1 && !i;
            o--
          ) {
            var a;
            o >= 0
              ? (a = arguments[o])
              : (void 0 === t && (t = n.cwd()), (a = t)),
              r(a),
              0 !== a.length &&
                ((e = a + "/" + e), (i = 47 === a.charCodeAt(0)));
          }
          return (
            (e = s(e, !i)),
            i ? (e.length > 0 ? "/" + e : "/") : e.length > 0 ? e : "."
          );
        },
        normalize: function (t) {
          if ((r(t), 0 === t.length)) return ".";
          var e = 47 === t.charCodeAt(0),
            i = 47 === t.charCodeAt(t.length - 1);
          return (
            0 !== (t = s(t, !e)).length || e || (t = "."),
            t.length > 0 && i && (t += "/"),
            e ? "/" + t : t
          );
        },
        isAbsolute: function (t) {
          return r(t), t.length > 0 && 47 === t.charCodeAt(0);
        },
        join: function () {
          if (0 === arguments.length) return ".";
          for (var t, e = 0; e < arguments.length; ++e) {
            var i = arguments[e];
            r(i), i.length > 0 && (void 0 === t ? (t = i) : (t += "/" + i));
          }
          return void 0 === t ? "." : o.normalize(t);
        },
        relative: function (t, e) {
          if ((r(t), r(e), t === e)) return "";
          if ((t = o.resolve(t)) === (e = o.resolve(e))) return "";
          for (var i = 1; i < t.length && 47 === t.charCodeAt(i); ++i);
          for (
            var n = t.length, s = n - i, a = 1;
            a < e.length && 47 === e.charCodeAt(a);
            ++a
          );
          for (
            var h = e.length - a, l = s < h ? s : h, c = -1, u = 0;
            u <= l;
            ++u
          ) {
            if (u === l) {
              if (h > l) {
                if (47 === e.charCodeAt(a + u)) return e.slice(a + u + 1);
                if (0 === u) return e.slice(a + u);
              } else
                s > l &&
                  (47 === t.charCodeAt(i + u) ? (c = u) : 0 === u && (c = 0));
              break;
            }
            var d = t.charCodeAt(i + u);
            if (d !== e.charCodeAt(a + u)) break;
            47 === d && (c = u);
          }
          var f = "";
          for (u = i + c + 1; u <= n; ++u)
            (u !== n && 47 !== t.charCodeAt(u)) ||
              (0 === f.length ? (f += "..") : (f += "/.."));
          return f.length > 0
            ? f + e.slice(a + c)
            : ((a += c), 47 === e.charCodeAt(a) && ++a, e.slice(a));
        },
        _makeLong: function (t) {
          return t;
        },
        dirname: function (t) {
          if ((r(t), 0 === t.length)) return ".";
          for (
            var e = t.charCodeAt(0),
              i = 47 === e,
              n = -1,
              s = !0,
              o = t.length - 1;
            o >= 1;
            --o
          )
            if (47 === (e = t.charCodeAt(o))) {
              if (!s) {
                n = o;
                break;
              }
            } else s = !1;
          return -1 === n
            ? i
              ? "/"
              : "."
            : i && 1 === n
              ? "//"
              : t.slice(0, n);
        },
        basename: function (t, e) {
          if (void 0 !== e && "string" != typeof e)
            throw new TypeError('"ext" argument must be a string');
          r(t);
          var i,
            n = 0,
            s = -1,
            o = !0;
          if (void 0 !== e && e.length > 0 && e.length <= t.length) {
            if (e.length === t.length && e === t) return "";
            var a = e.length - 1,
              h = -1;
            for (i = t.length - 1; i >= 0; --i) {
              var l = t.charCodeAt(i);
              if (47 === l) {
                if (!o) {
                  n = i + 1;
                  break;
                }
              } else
                -1 === h && ((o = !1), (h = i + 1)),
                  a >= 0 &&
                    (l === e.charCodeAt(a)
                      ? -1 == --a && (s = i)
                      : ((a = -1), (s = h)));
            }
            return (
              n === s ? (s = h) : -1 === s && (s = t.length), t.slice(n, s)
            );
          }
          for (i = t.length - 1; i >= 0; --i)
            if (47 === t.charCodeAt(i)) {
              if (!o) {
                n = i + 1;
                break;
              }
            } else -1 === s && ((o = !1), (s = i + 1));
          return -1 === s ? "" : t.slice(n, s);
        },
        extname: function (t) {
          r(t);
          for (
            var e = -1, i = 0, n = -1, s = !0, o = 0, a = t.length - 1;
            a >= 0;
            --a
          ) {
            var h = t.charCodeAt(a);
            if (47 !== h)
              -1 === n && ((s = !1), (n = a + 1)),
                46 === h
                  ? -1 === e
                    ? (e = a)
                    : 1 !== o && (o = 1)
                  : -1 !== e && (o = -1);
            else if (!s) {
              i = a + 1;
              break;
            }
          }
          return -1 === e ||
            -1 === n ||
            0 === o ||
            (1 === o && e === n - 1 && e === i + 1)
            ? ""
            : t.slice(e, n);
        },
        format: function (t) {
          if (null === t || "object" != typeof t)
            throw new TypeError(
              'Parameter "pathObject" must be an object, not ' + typeof t,
            );
          return (function (t, e) {
            var i = e.dir || e.root,
              n = e.base || (e.name || "") + (e.ext || "");
            return i ? (i === e.root ? i + n : i + t + n) : n;
          })("/", t);
        },
        parse: function (t) {
          r(t);
          var e = { root: "", dir: "", base: "", ext: "", name: "" };
          if (0 === t.length) return e;
          var i,
            n = t.charCodeAt(0),
            s = 47 === n;
          s ? ((e.root = "/"), (i = 1)) : (i = 0);
          for (
            var o = -1, a = 0, h = -1, l = !0, c = t.length - 1, u = 0;
            c >= i;
            --c
          )
            if (47 !== (n = t.charCodeAt(c)))
              -1 === h && ((l = !1), (h = c + 1)),
                46 === n
                  ? -1 === o
                    ? (o = c)
                    : 1 !== u && (u = 1)
                  : -1 !== o && (u = -1);
            else if (!l) {
              a = c + 1;
              break;
            }
          return (
            -1 === o ||
            -1 === h ||
            0 === u ||
            (1 === u && o === h - 1 && o === a + 1)
              ? -1 !== h &&
                (e.base = e.name = 0 === a && s ? t.slice(1, h) : t.slice(a, h))
              : (0 === a && s
                  ? ((e.name = t.slice(1, o)), (e.base = t.slice(1, h)))
                  : ((e.name = t.slice(a, o)), (e.base = t.slice(a, h))),
                (e.ext = t.slice(o, h))),
            a > 0 ? (e.dir = t.slice(0, a - 1)) : s && (e.dir = "/"),
            e
          );
        },
        sep: "/",
        delimiter: ":",
        posix: null,
      };
      t.exports = o;
    },
    function (t, e, i) {
      (function (e) {
        var i = function (t) {
          return t && t.Math == Math && t;
        };
        t.exports =
          i("object" == typeof globalThis && globalThis) ||
          i("object" == typeof window && window) ||
          i("object" == typeof self && self) ||
          i("object" == typeof e && e) ||
          (function () {
            return this;
          })() ||
          Function("return this")();
      }).call(this, i(25));
    },
    function (t, e, i) {
      "use strict";
      i.d(e, "a", function () {
        return s;
      }),
        i.d(e, "b", function () {
          return o;
        }),
        i.d(e, "d", function () {
          return a;
        }),
        i.d(e, "c", function () {
          return h;
        }),
        i.d(e, "e", function () {
          return l;
        });
      var n = i(0),
        r = i(5);
      i(4);
      function s(t, e) {
        var i,
          r,
          s = e.url,
          o = s.indexOf("://") > -1;
        t &&
          ((r = Object(n.qs)(t, "head")),
          (i = Object(n.qs)(r, "base")) ||
            ((i = t.createElement("base")), r.insertBefore(i, r.firstChild)),
          !o && window && window.location && (s = window.location.origin + s),
          i.setAttribute("href", s));
      }
      function o(t, e) {
        var i,
          r,
          s = e.canonical;
        t &&
          ((i = Object(n.qs)(t, "head")),
          (r = Object(n.qs)(i, "link[rel='canonical']"))
            ? r.setAttribute("href", s)
            : ((r = t.createElement("link")).setAttribute("rel", "canonical"),
              r.setAttribute("href", s),
              i.appendChild(r)));
      }
      function a(t, e) {
        var i,
          r,
          s = e.idref;
        t &&
          ((i = Object(n.qs)(t, "head")),
          (r = Object(n.qs)(i, "link[property='dc.identifier']"))
            ? r.setAttribute("content", s)
            : ((r = t.createElement("meta")).setAttribute(
                "name",
                "dc.identifier",
              ),
              r.setAttribute("content", s),
              i.appendChild(r)));
      }
      function h(t, e) {
        var i = t.querySelectorAll("a[href]");
        if (i.length)
          for (
            var s = Object(n.qs)(t.ownerDocument, "base"),
              o = s ? s.getAttribute("href") : void 0,
              a = function (t) {
                var i = t.getAttribute("href");
                if (0 !== i.indexOf("mailto:"))
                  if (i.indexOf("://") > -1) t.setAttribute("target", "_blank");
                  else {
                    var n;
                    try {
                      n = new r.a(i, o);
                    } catch (t) {}
                    t.onclick = function () {
                      return (
                        n && n.hash
                          ? e(n.Path.path + n.hash)
                          : e(n ? n.Path.path : i),
                        !1
                      );
                    };
                  }
              }.bind(this),
              h = 0;
            h < i.length;
            h++
          )
            a(i[h]);
      }
      function l(t, e, i) {
        return (
          e.forEach(function (e, n) {
            e &&
              i[n] &&
              ((e = e.replace(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g, "\\\\$&")),
              (t = t.replace(new RegExp(e, "g"), i[n])));
          }),
          t
        );
      }
    },
    function (t, e) {
      t.exports = function (t) {
        try {
          return !!t();
        } catch (t) {
          return !0;
        }
      };
    },
    function (t, e, i) {
      var n = i(36),
        r = {}.hasOwnProperty;
      t.exports =
        Object.hasOwn ||
        function (t, e) {
          return r.call(n(t), e);
        };
    },
    function (t, e, i) {
      var n = i(11);
      t.exports = !n(function () {
        return (
          7 !=
          Object.defineProperty({}, 1, {
            get: function () {
              return 7;
            },
          })[1]
        );
      });
    },
    function (t, e, i) {
      var n = i(9),
        r = i(59),
        s = i(12),
        o = i(60),
        a = i(58),
        h = i(57),
        l = r("wks"),
        c = n.Symbol,
        u = h ? c : (c && c.withoutSetter) || o;
      t.exports = function (t) {
        return (
          (s(l, t) && (a || "string" == typeof l[t])) ||
            (a && s(c, t) ? (l[t] = c[t]) : (l[t] = u("Symbol." + t))),
          l[t]
        );
      };
    },
    function (t, e, i) {
      "use strict";
      var n = i(0);
      e.a = class {
        constructor(t) {
          (this._q = []),
            (this.context = t),
            (this.tick = n.requestAnimationFrame),
            (this.running = !1),
            (this.paused = !1);
        }
        enqueue() {
          var t,
            e,
            i = [].shift.call(arguments),
            r = arguments;
          if (!i) throw new Error("No Task Provided");
          return (
            (e =
              "function" == typeof i
                ? {
                    task: i,
                    args: r,
                    deferred: (t = new n.defer()),
                    promise: t.promise,
                  }
                : { promise: i }),
            this._q.push(e),
            0 != this.paused || this.running || this.run(),
            e.promise
          );
        }
        dequeue() {
          var t, e, i;
          return !this._q.length || this.paused
            ? ((t = new n.defer()).deferred.resolve(), t.promise)
            : (e = (t = this._q.shift()).task)
              ? (i = e.apply(this.context, t.args)) &&
                "function" == typeof i.then
                ? i.then(
                    function () {
                      t.deferred.resolve.apply(this.context, arguments);
                    }.bind(this),
                    function () {
                      t.deferred.reject.apply(this.context, arguments);
                    }.bind(this),
                  )
                : (t.deferred.resolve.apply(this.context, i), t.promise)
              : t.promise
                ? t.promise
                : void 0;
        }
        dump() {
          for (; this._q.length; ) this.dequeue();
        }
        run() {
          return (
            this.running ||
              ((this.running = !0), (this.defered = new n.defer())),
            this.tick.call(window, () => {
              this._q.length
                ? this.dequeue().then(
                    function () {
                      this.run();
                    }.bind(this),
                  )
                : (this.defered.resolve(), (this.running = void 0));
            }),
            1 == this.paused && (this.paused = !1),
            this.defered.promise
          );
        }
        flush() {
          return this.running
            ? this.running
            : this._q.length
              ? ((this.running = this.dequeue().then(
                  function () {
                    return (this.running = void 0), this.flush();
                  }.bind(this),
                )),
                this.running)
              : void 0;
        }
        clear() {
          this._q = [];
        }
        length() {
          return this._q.length;
        }
        pause() {
          this.paused = !0;
        }
        stop() {
          (this._q = []), (this.running = !1), (this.paused = !0);
        }
      };
    },
    function (t, e, i) {
      "use strict";
      var n = i(3),
        r = i.n(n),
        s = i(0);
      function o() {
        var t = "reverse",
          e = (function () {
            var t = document.createElement("div");
            (t.dir = "rtl"),
              (t.style.position = "fixed"),
              (t.style.width = "1px"),
              (t.style.height = "1px"),
              (t.style.top = "0px"),
              (t.style.left = "0px"),
              (t.style.overflow = "hidden");
            var e = document.createElement("div");
            e.style.width = "2px";
            var i = document.createElement("span");
            (i.style.width = "1px"), (i.style.display = "inline-block");
            var n = document.createElement("span");
            return (
              (n.style.width = "1px"),
              (n.style.display = "inline-block"),
              e.appendChild(i),
              e.appendChild(n),
              t.appendChild(e),
              t
            );
          })();
        return (
          document.body.appendChild(e),
          e.scrollLeft > 0
            ? (t = "default")
            : "undefined" != typeof Element && Element.prototype.scrollIntoView
              ? (e.children[0].children[1].scrollIntoView(),
                e.scrollLeft < 0 && (t = "negative"))
              : ((e.scrollLeft = 1), 0 === e.scrollLeft && (t = "negative")),
          document.body.removeChild(e),
          t
        );
      }
      var a = i(17),
        h = i(15),
        l = i(75),
        c = i.n(l);
      var u = class {
        constructor(t) {
          (this.settings = t || {}),
            (this.id = "epubjs-container-" + Object(s.uuid)()),
            (this.container = this.create(this.settings)),
            this.settings.hidden && (this.wrapper = this.wrap(this.container));
        }
        create(t) {
          let e = t.height,
            i = t.width,
            n = t.overflow || !1,
            r = t.axis || "vertical",
            o = t.direction;
          Object(s.extend)(this.settings, t),
            t.height && Object(s.isNumber)(t.height) && (e = t.height + "px"),
            t.width && Object(s.isNumber)(t.width) && (i = t.width + "px");
          let a = document.createElement("div");
          return (
            (a.id = this.id),
            a.classList.add("epub-container"),
            (a.style.wordSpacing = "0"),
            (a.style.lineHeight = "0"),
            (a.style.verticalAlign = "top"),
            (a.style.position = "relative"),
            "horizontal" === r &&
              ((a.style.display = "flex"),
              (a.style.flexDirection = "row"),
              (a.style.flexWrap = "nowrap")),
            i && (a.style.width = i),
            e && (a.style.height = e),
            n &&
              ("scroll" === n && "vertical" === r
                ? ((a.style["overflow-y"] = n),
                  (a.style["overflow-x"] = "hidden"))
                : "scroll" === n && "horizontal" === r
                  ? ((a.style["overflow-y"] = "hidden"),
                    (a.style["overflow-x"] = n))
                  : (a.style.overflow = n)),
            o && ((a.dir = o), (a.style.direction = o)),
            o && this.settings.fullsize && (document.body.style.direction = o),
            a
          );
        }
        wrap(t) {
          var e = document.createElement("div");
          return (
            (e.style.visibility = "hidden"),
            (e.style.overflow = "hidden"),
            (e.style.width = "0"),
            (e.style.height = "0"),
            e.appendChild(t),
            e
          );
        }
        getElement(t) {
          var e;
          if (
            (Object(s.isElement)(t)
              ? (e = t)
              : "string" == typeof t && (e = document.getElementById(t)),
            !e)
          )
            throw new Error("Not an Element");
          return e;
        }
        attachTo(t) {
          var e,
            i = this.getElement(t);
          if (i)
            return (
              (e = this.settings.hidden ? this.wrapper : this.container),
              i.appendChild(e),
              (this.element = i),
              i
            );
        }
        getContainer() {
          return this.container;
        }
        onResize(t) {
          (Object(s.isNumber)(this.settings.width) &&
            Object(s.isNumber)(this.settings.height)) ||
            ((this.resizeFunc = c()(t, 50)),
            window.addEventListener("resize", this.resizeFunc, !1));
        }
        onOrientationChange(t) {
          (this.orientationChangeFunc = t),
            window.addEventListener(
              "orientationchange",
              this.orientationChangeFunc,
              !1,
            );
        }
        size(t, e) {
          var i;
          let n = t || this.settings.width,
            r = e || this.settings.height;
          null === t
            ? (i = this.element.getBoundingClientRect()).width &&
              ((t = Math.floor(i.width)),
              (this.container.style.width = t + "px"))
            : Object(s.isNumber)(t)
              ? (this.container.style.width = t + "px")
              : (this.container.style.width = t),
            null === e
              ? (i = i || this.element.getBoundingClientRect()).height &&
                ((e = i.height), (this.container.style.height = e + "px"))
              : Object(s.isNumber)(e)
                ? (this.container.style.height = e + "px")
                : (this.container.style.height = e),
            Object(s.isNumber)(t) || (t = this.container.clientWidth),
            Object(s.isNumber)(e) || (e = this.container.clientHeight),
            (this.containerStyles = window.getComputedStyle(this.container)),
            (this.containerPadding = {
              left: parseFloat(this.containerStyles["padding-left"]) || 0,
              right: parseFloat(this.containerStyles["padding-right"]) || 0,
              top: parseFloat(this.containerStyles["padding-top"]) || 0,
              bottom: parseFloat(this.containerStyles["padding-bottom"]) || 0,
            });
          let o = Object(s.windowBounds)(),
            a = window.getComputedStyle(document.body),
            h = parseFloat(a["padding-left"]) || 0,
            l = parseFloat(a["padding-right"]) || 0,
            c = parseFloat(a["padding-top"]) || 0,
            u = parseFloat(a["padding-bottom"]) || 0;
          return (
            n || (t = o.width - h - l),
            ((this.settings.fullsize && !r) || !r) && (e = o.height - c - u),
            {
              width:
                t - this.containerPadding.left - this.containerPadding.right,
              height:
                e - this.containerPadding.top - this.containerPadding.bottom,
            }
          );
        }
        bounds() {
          let t;
          return (
            "visible" !== this.container.style.overflow &&
              (t = this.container && this.container.getBoundingClientRect()),
            t && t.width && t.height ? t : Object(s.windowBounds)()
          );
        }
        getSheet() {
          var t = document.createElement("style");
          return (
            t.appendChild(document.createTextNode("")),
            document.head.appendChild(t),
            t.sheet
          );
        }
        addStyleRules(t, e) {
          var i = "#" + this.id + " ",
            n = "";
          this.sheet || (this.sheet = this.getSheet()),
            e.forEach(function (t) {
              for (var e in t)
                t.hasOwnProperty(e) && (n += e + ":" + t[e] + ";");
            }),
            this.sheet.insertRule(i + t + " {" + n + "}", 0);
        }
        axis(t) {
          "horizontal" === t
            ? ((this.container.style.display = "flex"),
              (this.container.style.flexDirection = "row"),
              (this.container.style.flexWrap = "nowrap"))
            : (this.container.style.display = "block"),
            (this.settings.axis = t);
        }
        direction(t) {
          this.container &&
            ((this.container.dir = t), (this.container.style.direction = t)),
            this.settings.fullsize && (document.body.style.direction = t),
            (this.settings.dir = t);
        }
        overflow(t) {
          this.container &&
            ("scroll" === t && "vertical" === this.settings.axis
              ? ((this.container.style["overflow-y"] = t),
                (this.container.style["overflow-x"] = "hidden"))
              : "scroll" === t && "horizontal" === this.settings.axis
                ? ((this.container.style["overflow-y"] = "hidden"),
                  (this.container.style["overflow-x"] = t))
                : (this.container.style.overflow = t)),
            (this.settings.overflow = t);
        }
        destroy() {
          this.element &&
            (this.settings.hidden ? this.wrapper : this.container,
            this.element.contains(this.container) &&
              this.element.removeChild(this.container),
            window.removeEventListener("resize", this.resizeFunc),
            window.removeEventListener(
              "orientationChange",
              this.orientationChangeFunc,
            ));
        }
      };
      var d = class {
          constructor(t) {
            (this.container = t),
              (this._views = []),
              (this.length = 0),
              (this.hidden = !1);
          }
          all() {
            return this._views;
          }
          first() {
            return this._views[0];
          }
          last() {
            return this._views[this._views.length - 1];
          }
          indexOf(t) {
            return this._views.indexOf(t);
          }
          slice() {
            return this._views.slice.apply(this._views, arguments);
          }
          get(t) {
            return this._views[t];
          }
          append(t) {
            return (
              this._views.push(t),
              this.container && this.container.appendChild(t.element),
              this.length++,
              t
            );
          }
          prepend(t) {
            return (
              this._views.unshift(t),
              this.container &&
                this.container.insertBefore(
                  t.element,
                  this.container.firstChild,
                ),
              this.length++,
              t
            );
          }
          insert(t, e) {
            return (
              this._views.splice(e, 0, t),
              this.container &&
                (e < this.container.children.length
                  ? this.container.insertBefore(
                      t.element,
                      this.container.children[e],
                    )
                  : this.container.appendChild(t.element)),
              this.length++,
              t
            );
          }
          remove(t) {
            var e = this._views.indexOf(t);
            e > -1 && this._views.splice(e, 1), this.destroy(t), this.length--;
          }
          destroy(t) {
            t.displayed && t.destroy(),
              this.container && this.container.removeChild(t.element),
              (t = null);
          }
          forEach() {
            return this._views.forEach.apply(this._views, arguments);
          }
          clear() {
            var t,
              e = this.length;
            if (this.length) {
              for (var i = 0; i < e; i++) (t = this._views[i]), this.destroy(t);
              (this._views = []), (this.length = 0);
            }
          }
          find(t) {
            for (var e, i = this.length, n = 0; n < i; n++)
              if ((e = this._views[n]).displayed && e.section.index == t.index)
                return e;
          }
          displayed() {
            for (var t, e = [], i = this.length, n = 0; n < i; n++)
              (t = this._views[n]).displayed && e.push(t);
            return e;
          }
          show() {
            for (var t, e = this.length, i = 0; i < e; i++)
              (t = this._views[i]).displayed && t.show();
            this.hidden = !1;
          }
          hide() {
            for (var t, e = this.length, i = 0; i < e; i++)
              (t = this._views[i]).displayed && t.hide();
            this.hidden = !0;
          }
        },
        f = i(1);
      class p {
        constructor(t) {
          (this.name = "default"),
            (this.optsSettings = t.settings),
            (this.View = t.view),
            (this.request = t.request),
            (this.renditionQueue = t.queue),
            (this.q = new h.a(this)),
            (this.settings = Object(s.extend)(this.settings || {}, {
              infinite: !0,
              hidden: !1,
              width: void 0,
              height: void 0,
              axis: void 0,
              writingMode: void 0,
              flow: "scrolled",
              ignoreClass: "",
              fullsize: void 0,
              allowScriptedContent: !1,
              allowPopups: !1,
            })),
            Object(s.extend)(this.settings, t.settings || {}),
            (this.viewSettings = {
              ignoreClass: this.settings.ignoreClass,
              axis: this.settings.axis,
              flow: this.settings.flow,
              layout: this.layout,
              method: this.settings.method,
              width: 0,
              height: 0,
              forceEvenPages: !0,
              allowScriptedContent: this.settings.allowScriptedContent,
              allowPopups: this.settings.allowPopups,
            }),
            (this.rendered = !1);
        }
        render(t, e) {
          let i = t.tagName;
          void 0 !== this.settings.fullsize ||
            !i ||
            ("body" != i.toLowerCase() && "html" != i.toLowerCase()) ||
            (this.settings.fullsize = !0),
            this.settings.fullsize &&
              ((this.settings.overflow = "visible"),
              (this.overflow = this.settings.overflow)),
            (this.settings.size = e),
            (this.settings.rtlScrollType = o()),
            (this.stage = new u({
              width: e.width,
              height: e.height,
              overflow: this.overflow,
              hidden: this.settings.hidden,
              axis: this.settings.axis,
              fullsize: this.settings.fullsize,
              direction: this.settings.direction,
            })),
            this.stage.attachTo(t),
            (this.container = this.stage.getContainer()),
            (this.views = new d(this.container)),
            (this._bounds = this.bounds()),
            (this._stageSize = this.stage.size()),
            (this.viewSettings.width = this._stageSize.width),
            (this.viewSettings.height = this._stageSize.height),
            this.stage.onResize(this.onResized.bind(this)),
            this.stage.onOrientationChange(this.onOrientationChange.bind(this)),
            this.addEventListeners(),
            this.layout && this.updateLayout(),
            (this.rendered = !0);
        }
        addEventListeners() {
          var t;
          window.addEventListener(
            "unload",
            function (t) {
              this.destroy();
            }.bind(this),
          ),
            (t = this.settings.fullsize ? window : this.container),
            (this._onScroll = this.onScroll.bind(this)),
            t.addEventListener("scroll", this._onScroll);
        }
        removeEventListeners() {
          (this.settings.fullsize
            ? window
            : this.container
          ).removeEventListener("scroll", this._onScroll),
            (this._onScroll = void 0);
        }
        destroy() {
          clearTimeout(this.orientationTimeout),
            clearTimeout(this.resizeTimeout),
            clearTimeout(this.afterScrolled),
            this.clear(),
            this.removeEventListeners(),
            this.stage.destroy(),
            (this.rendered = !1);
        }
        onOrientationChange(t) {
          let { orientation: e } = window;
          this.optsSettings.resizeOnOrientationChange && this.resize(),
            clearTimeout(this.orientationTimeout),
            (this.orientationTimeout = setTimeout(
              function () {
                (this.orientationTimeout = void 0),
                  this.optsSettings.resizeOnOrientationChange && this.resize(),
                  this.emit(f.c.MANAGERS.ORIENTATION_CHANGE, e);
              }.bind(this),
              500,
            ));
        }
        onResized(t) {
          this.resize();
        }
        resize(t, e, i) {
          let n = this.stage.size(t, e);
          (this.winBounds = Object(s.windowBounds)()),
            this.orientationTimeout &&
            this.winBounds.width === this.winBounds.height
              ? (this._stageSize = void 0)
              : (this._stageSize &&
                  this._stageSize.width === n.width &&
                  this._stageSize.height === n.height) ||
                ((this._stageSize = n),
                (this._bounds = this.bounds()),
                this.clear(),
                (this.viewSettings.width = this._stageSize.width),
                (this.viewSettings.height = this._stageSize.height),
                this.updateLayout(),
                this.emit(
                  f.c.MANAGERS.RESIZED,
                  {
                    width: this._stageSize.width,
                    height: this._stageSize.height,
                  },
                  i,
                ));
        }
        createView(t, e) {
          return new this.View(
            t,
            Object(s.extend)(this.viewSettings, { forceRight: e }),
          );
        }
        handleNextPrePaginated(t, e, i) {
          let n;
          if ("pre-paginated" === this.layout.name && this.layout.divisor > 1) {
            if (t || 0 === e.index) return;
            if (
              ((n = e.next()), n && !n.properties.includes("page-spread-left"))
            )
              return i.call(this, n);
          }
        }
        display(t, e) {
          var i = new s.defer(),
            n = i.promise;
          (e === t.href || Object(s.isNumber)(e)) && (e = void 0);
          var r = this.views.find(t);
          if (r && t && "pre-paginated" !== this.layout.name) {
            let t = r.offset();
            if ("ltr" === this.settings.direction)
              this.scrollTo(t.left, t.top, !0);
            else {
              let e = r.width();
              this.scrollTo(t.left + e, t.top, !0);
            }
            if (e) {
              let t = r.locationOf(e),
                i = r.width();
              this.moveTo(t, i);
            }
            return i.resolve(), n;
          }
          this.clear();
          let o = !1;
          return (
            "pre-paginated" === this.layout.name &&
              2 === this.layout.divisor &&
              t.properties.includes("page-spread-right") &&
              (o = !0),
            this.add(t, o)
              .then(
                function (t) {
                  if (e) {
                    let i = t.locationOf(e),
                      n = t.width();
                    this.moveTo(i, n);
                  }
                }.bind(this),
                (t) => {
                  i.reject(t);
                },
              )
              .then(
                function () {
                  return this.handleNextPrePaginated(o, t, this.add);
                }.bind(this),
              )
              .then(
                function () {
                  this.views.show(), i.resolve();
                }.bind(this),
              ),
            n
          );
        }
        afterDisplayed(t) {
          this.emit(f.c.MANAGERS.ADDED, t);
        }
        afterResized(t) {
          this.emit(f.c.MANAGERS.RESIZE, t.section);
        }
        moveTo(t, e) {
          var i = 0,
            n = 0;
          this.isPaginated
            ? ((i =
                Math.floor(t.left / this.layout.delta) * this.layout.delta) +
                this.layout.delta >
                this.container.scrollWidth &&
                (i = this.container.scrollWidth - this.layout.delta),
              (n = Math.floor(t.top / this.layout.delta) * this.layout.delta) +
                this.layout.delta >
                this.container.scrollHeight &&
                (n = this.container.scrollHeight - this.layout.delta))
            : (n = t.top),
            "rtl" === this.settings.direction &&
              ((i += this.layout.delta), (i -= e)),
            this.scrollTo(i, n, !0);
        }
        add(t, e) {
          var i = this.createView(t, e);
          return (
            this.views.append(i),
            (i.onDisplayed = this.afterDisplayed.bind(this)),
            (i.onResize = this.afterResized.bind(this)),
            i.on(f.c.VIEWS.AXIS, (t) => {
              this.updateAxis(t);
            }),
            i.on(f.c.VIEWS.WRITING_MODE, (t) => {
              this.updateWritingMode(t);
            }),
            i.display(this.request)
          );
        }
        append(t, e) {
          var i = this.createView(t, e);
          return (
            this.views.append(i),
            (i.onDisplayed = this.afterDisplayed.bind(this)),
            (i.onResize = this.afterResized.bind(this)),
            i.on(f.c.VIEWS.AXIS, (t) => {
              this.updateAxis(t);
            }),
            i.on(f.c.VIEWS.WRITING_MODE, (t) => {
              this.updateWritingMode(t);
            }),
            i.display(this.request)
          );
        }
        prepend(t, e) {
          var i = this.createView(t, e);
          return (
            i.on(f.c.VIEWS.RESIZED, (t) => {
              this.counter(t);
            }),
            this.views.prepend(i),
            (i.onDisplayed = this.afterDisplayed.bind(this)),
            (i.onResize = this.afterResized.bind(this)),
            i.on(f.c.VIEWS.AXIS, (t) => {
              this.updateAxis(t);
            }),
            i.on(f.c.VIEWS.WRITING_MODE, (t) => {
              this.updateWritingMode(t);
            }),
            i.display(this.request)
          );
        }
        counter(t) {
          "vertical" === this.settings.axis
            ? this.scrollBy(0, t.heightDelta, !0)
            : this.scrollBy(t.widthDelta, 0, !0);
        }
        next() {
          var t;
          let e = this.settings.direction;
          if (this.views.length) {
            if (
              !this.isPaginated ||
              "horizontal" !== this.settings.axis ||
              (e && "ltr" !== e)
            )
              if (
                this.isPaginated &&
                "horizontal" === this.settings.axis &&
                "rtl" === e
              )
                (this.scrollLeft = this.container.scrollLeft),
                  "default" === this.settings.rtlScrollType
                    ? this.container.scrollLeft > 0
                      ? this.scrollBy(this.layout.delta, 0, !0)
                      : (t = this.views.last().section.next())
                    : this.container.scrollLeft + -1 * this.layout.delta >
                        -1 * this.container.scrollWidth
                      ? this.scrollBy(this.layout.delta, 0, !0)
                      : (t = this.views.last().section.next());
              else if (this.isPaginated && "vertical" === this.settings.axis) {
                (this.scrollTop = this.container.scrollTop),
                  this.container.scrollTop + this.container.offsetHeight <
                  this.container.scrollHeight
                    ? this.scrollBy(0, this.layout.height, !0)
                    : (t = this.views.last().section.next());
              } else t = this.views.last().section.next();
            else
              (this.scrollLeft = this.container.scrollLeft),
                this.container.scrollLeft +
                  this.container.offsetWidth +
                  this.layout.delta <=
                this.container.scrollWidth
                  ? this.scrollBy(this.layout.delta, 0, !0)
                  : (t = this.views.last().section.next());
            if (t) {
              this.clear(), this.updateLayout();
              let e = !1;
              return (
                "pre-paginated" === this.layout.name &&
                  2 === this.layout.divisor &&
                  t.properties.includes("page-spread-right") &&
                  (e = !0),
                this.append(t, e)
                  .then(
                    function () {
                      return this.handleNextPrePaginated(e, t, this.append);
                    }.bind(this),
                    (t) => t,
                  )
                  .then(
                    function () {
                      this.isPaginated ||
                        "horizontal" !== this.settings.axis ||
                        "rtl" !== this.settings.direction ||
                        "default" !== this.settings.rtlScrollType ||
                        this.scrollTo(this.container.scrollWidth, 0, !0),
                        this.views.show();
                    }.bind(this),
                  )
              );
            }
          }
        }
        prev() {
          var t;
          let e = this.settings.direction;
          if (this.views.length) {
            if (
              !this.isPaginated ||
              "horizontal" !== this.settings.axis ||
              (e && "ltr" !== e)
            )
              if (
                this.isPaginated &&
                "horizontal" === this.settings.axis &&
                "rtl" === e
              )
                (this.scrollLeft = this.container.scrollLeft),
                  "default" === this.settings.rtlScrollType
                    ? this.container.scrollLeft + this.container.offsetWidth <
                      this.container.scrollWidth
                      ? this.scrollBy(-this.layout.delta, 0, !0)
                      : (t = this.views.first().section.prev())
                    : this.container.scrollLeft < 0
                      ? this.scrollBy(-this.layout.delta, 0, !0)
                      : (t = this.views.first().section.prev());
              else if (this.isPaginated && "vertical" === this.settings.axis) {
                (this.scrollTop = this.container.scrollTop),
                  this.container.scrollTop > 0
                    ? this.scrollBy(0, -this.layout.height, !0)
                    : (t = this.views.first().section.prev());
              } else t = this.views.first().section.prev();
            else
              (this.scrollLeft = this.container.scrollLeft),
                this.container.scrollLeft > 0
                  ? this.scrollBy(-this.layout.delta, 0, !0)
                  : (t = this.views.first().section.prev());
            if (t) {
              this.clear(), this.updateLayout();
              let e = !1;
              return (
                "pre-paginated" === this.layout.name &&
                  2 === this.layout.divisor &&
                  "object" != typeof t.prev() &&
                  (e = !0),
                this.prepend(t, e)
                  .then(
                    function () {
                      var e;
                      if (
                        "pre-paginated" === this.layout.name &&
                        this.layout.divisor > 1 &&
                        (e = t.prev())
                      )
                        return this.prepend(e);
                    }.bind(this),
                    (t) => t,
                  )
                  .then(
                    function () {
                      this.isPaginated &&
                        "horizontal" === this.settings.axis &&
                        ("rtl" === this.settings.direction
                          ? "default" === this.settings.rtlScrollType
                            ? this.scrollTo(0, 0, !0)
                            : this.scrollTo(
                                -1 * this.container.scrollWidth +
                                  this.layout.delta,
                                0,
                                !0,
                              )
                          : this.scrollTo(
                              this.container.scrollWidth - this.layout.delta,
                              0,
                              !0,
                            )),
                        this.views.show();
                    }.bind(this),
                  )
              );
            }
          }
        }
        current() {
          var t = this.visible();
          return t.length ? t[t.length - 1] : null;
        }
        clear() {
          this.views &&
            (this.views.hide(), this.scrollTo(0, 0, !0), this.views.clear());
        }
        currentLocation() {
          return (
            this.updateLayout(),
            this.isPaginated && "horizontal" === this.settings.axis
              ? (this.location = this.paginatedLocation())
              : (this.location = this.scrolledLocation()),
            this.location
          );
        }
        scrolledLocation() {
          let t = this.visible(),
            e = this.container.getBoundingClientRect(),
            i = e.height < window.innerHeight ? e.height : window.innerHeight,
            n = e.width < window.innerWidth ? e.width : window.innerWidth,
            r = "vertical" === this.settings.axis,
            s = (this.settings.direction, 0);
          return (
            this.settings.fullsize && (s = r ? window.scrollY : window.scrollX),
            t.map((t) => {
              let o,
                a,
                h,
                l,
                { index: c, href: u } = t.section,
                d = t.position(),
                f = t.width(),
                p = t.height();
              r
                ? ((o = s + e.top - d.top + 0),
                  (a = o + i - 0),
                  (l = this.layout.count(p, i).pages),
                  (h = i))
                : ((o = s + e.left - d.left + 0),
                  (a = o + n - 0),
                  (l = this.layout.count(f, n).pages),
                  (h = n));
              let g = Math.ceil(o / h),
                m = [],
                v = Math.ceil(a / h);
              if ("rtl" === this.settings.direction && !r) {
                let t = g;
                (g = l - v), (v = l - t);
              }
              m = [];
              for (var y = g; y <= v; y++) {
                let t = y + 1;
                m.push(t);
              }
              return {
                index: c,
                href: u,
                pages: m,
                totalPages: l,
                mapping: this.mapping.page(t.contents, t.section.cfiBase, o, a),
              };
            })
          );
        }
        paginatedLocation() {
          let t = this.visible(),
            e = this.container.getBoundingClientRect(),
            i = 0,
            n = 0;
          return (
            this.settings.fullsize && (i = window.scrollX),
            t.map((t) => {
              let r,
                s,
                o,
                a,
                { index: h, href: l } = t.section,
                c = t.position(),
                u = t.width();
              "rtl" === this.settings.direction
                ? ((r = e.right - i),
                  (a = Math.min(Math.abs(r - c.left), this.layout.width) - n),
                  (o = c.width - (c.right - r) - n),
                  (s = o - a))
                : ((r = e.left + i),
                  (a = Math.min(c.right - r, this.layout.width) - n),
                  (s = r - c.left + n),
                  (o = s + a)),
                (n += a);
              let d = this.mapping.page(t.contents, t.section.cfiBase, s, o),
                f = this.layout.count(u).pages,
                p = Math.floor(s / this.layout.pageWidth),
                g = [],
                m = Math.floor(o / this.layout.pageWidth);
              if (
                (p < 0 && ((p = 0), (m += 1)),
                "rtl" === this.settings.direction)
              ) {
                let t = p;
                (p = f - m), (m = f - t);
              }
              for (var v = p + 1; v <= m; v++) {
                let t = v;
                g.push(t);
              }
              return { index: h, href: l, pages: g, totalPages: f, mapping: d };
            })
          );
        }
        isVisible(t, e, i, n) {
          var r = t.position(),
            s = n || this.bounds();
          return (
            ("horizontal" === this.settings.axis &&
              r.right > s.left - e &&
              r.left < s.right + i) ||
            ("vertical" === this.settings.axis &&
              r.bottom > s.top - e &&
              r.top < s.bottom + i)
          );
        }
        visible() {
          for (
            var t,
              e = this.bounds(),
              i = this.views.displayed(),
              n = i.length,
              r = [],
              s = 0;
            s < n;
            s++
          )
            (t = i[s]), !0 === this.isVisible(t, 0, 0, e) && r.push(t);
          return r;
        }
        scrollBy(t, e, i) {
          let n = "rtl" === this.settings.direction ? -1 : 1;
          i && (this.ignore = !0),
            this.settings.fullsize
              ? window.scrollBy(t * n, e * n)
              : (t && (this.container.scrollLeft += t * n),
                e && (this.container.scrollTop += e)),
            (this.scrolled = !0);
        }
        scrollTo(t, e, i) {
          i && (this.ignore = !0),
            this.settings.fullsize
              ? window.scrollTo(t, e)
              : ((this.container.scrollLeft = t),
                (this.container.scrollTop = e)),
            (this.scrolled = !0);
        }
        onScroll() {
          let t, e;
          this.settings.fullsize
            ? ((t = window.scrollY), (e = window.scrollX))
            : ((t = this.container.scrollTop), (e = this.container.scrollLeft)),
            (this.scrollTop = t),
            (this.scrollLeft = e),
            this.ignore
              ? (this.ignore = !1)
              : (this.emit(f.c.MANAGERS.SCROLL, { top: t, left: e }),
                clearTimeout(this.afterScrolled),
                (this.afterScrolled = setTimeout(
                  function () {
                    this.emit(f.c.MANAGERS.SCROLLED, {
                      top: this.scrollTop,
                      left: this.scrollLeft,
                    });
                  }.bind(this),
                  20,
                )));
        }
        bounds() {
          return this.stage.bounds();
        }
        applyLayout(t) {
          (this.layout = t),
            this.updateLayout(),
            this.views &&
              this.views.length > 0 &&
              "pre-paginated" === this.layout.name &&
              this.display(this.views.first().section);
        }
        updateLayout() {
          this.stage &&
            ((this._stageSize = this.stage.size()),
            this.isPaginated
              ? (this.layout.calculate(
                  this._stageSize.width,
                  this._stageSize.height,
                  this.settings.gap,
                ),
                (this.settings.offset =
                  this.layout.delta / this.layout.divisor))
              : this.layout.calculate(
                  this._stageSize.width,
                  this._stageSize.height,
                ),
            (this.viewSettings.width = this.layout.width),
            (this.viewSettings.height = this.layout.height),
            this.setLayout(this.layout));
        }
        setLayout(t) {
          (this.viewSettings.layout = t),
            (this.mapping = new a.a(
              t.props,
              this.settings.direction,
              this.settings.axis,
            )),
            this.views &&
              this.views.forEach(function (e) {
                e && e.setLayout(t);
              });
        }
        updateWritingMode(t) {
          this.writingMode = t;
        }
        updateAxis(t, e) {
          (e || t !== this.settings.axis) &&
            ((this.settings.axis = t),
            this.stage && this.stage.axis(t),
            (this.viewSettings.axis = t),
            this.mapping &&
              (this.mapping = new a.a(
                this.layout.props,
                this.settings.direction,
                this.settings.axis,
              )),
            this.layout &&
              ("vertical" === t
                ? this.layout.spread("none")
                : this.layout.spread(this.layout.settings.spread)));
        }
        updateFlow(t, e = "auto") {
          let i = "paginated" === t || "auto" === t;
          (this.isPaginated = i),
            "scrolled-doc" === t ||
            "scrolled-continuous" === t ||
            "scrolled" === t
              ? this.updateAxis("vertical")
              : this.updateAxis("horizontal"),
            (this.viewSettings.flow = t),
            this.settings.overflow
              ? (this.overflow = this.settings.overflow)
              : (this.overflow = i ? "hidden" : e),
            this.stage && this.stage.overflow(this.overflow),
            this.updateLayout();
        }
        getContents() {
          var t = [];
          return this.views
            ? (this.views.forEach(function (e) {
                const i = e && e.contents;
                i && t.push(i);
              }),
              t)
            : t;
        }
        direction(t = "ltr") {
          (this.settings.direction = t),
            this.stage && this.stage.direction(t),
            (this.viewSettings.direction = t),
            this.updateLayout();
        }
        isRendered() {
          return this.rendered;
        }
      }
      r()(p.prototype);
      e.a = p;
    },
    function (t, e, i) {
      "use strict";
      var n = i(2),
        r = i(0);
      e.a = class {
        constructor(t, e, i, n = !1) {
          (this.layout = t),
            (this.horizontal = "horizontal" === i),
            (this.direction = e || "ltr"),
            (this._dev = n);
        }
        section(t) {
          var e = this.findRanges(t);
          return this.rangeListToCfiList(t.section.cfiBase, e);
        }
        page(t, e, i, r) {
          var s,
            o = !(!t || !t.document) && t.document.body;
          if (o) {
            if (
              ((s = this.rangePairToCfiPair(e, {
                start: this.findStart(o, i, r),
                end: this.findEnd(o, i, r),
              })),
              !0 === this._dev)
            ) {
              let e = t.document,
                i = new n.a(s.start).toRange(e),
                r = new n.a(s.end).toRange(e),
                o = e.defaultView.getSelection(),
                a = e.createRange();
              o.removeAllRanges(),
                a.setStart(i.startContainer, i.startOffset),
                a.setEnd(r.endContainer, r.endOffset),
                o.addRange(a);
            }
            return s;
          }
        }
        walk(t, e) {
          if (!t || t.nodeType !== Node.TEXT_NODE) {
            var i = function (t) {
                return t.data.trim().length > 0
                  ? NodeFilter.FILTER_ACCEPT
                  : NodeFilter.FILTER_REJECT;
              },
              n = i;
            n.acceptNode = i;
            for (
              var r,
                s,
                o = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, n, !1);
              (r = o.nextNode()) && !(s = e(r));

            );
            return s;
          }
        }
        findRanges(t) {
          for (
            var e,
              i,
              n = [],
              r = t.contents.scrollWidth(),
              s = Math.ceil(r / this.layout.spreadWidth) * this.layout.divisor,
              o = this.layout.columnWidth,
              a = this.layout.gap,
              h = 0;
            h < s.pages;
            h++
          )
            (e = (o + a) * h),
              (i = o * (h + 1) + a * h),
              n.push({
                start: this.findStart(t.document.body, e, i),
                end: this.findEnd(t.document.body, e, i),
              });
          return n;
        }
        findStart(t, e, i) {
          for (var n, s, o = [t], a = t; o.length; )
            if (
              ((n = o.shift()),
              (s = this.walk(n, (t) => {
                var n, s, h, l, c;
                if (
                  ((c = Object(r.nodeBounds)(t)),
                  this.horizontal && "ltr" === this.direction)
                ) {
                  if (
                    ((n = this.horizontal ? c.left : c.top),
                    (s = this.horizontal ? c.right : c.bottom),
                    n >= e && n <= i)
                  )
                    return t;
                  if (s > e) return t;
                  (a = t), o.push(t);
                } else if (this.horizontal && "rtl" === this.direction) {
                  if (((n = c.left), (s = c.right) <= i && s >= e)) return t;
                  if (n < i) return t;
                  (a = t), o.push(t);
                } else {
                  if (((h = c.top), (l = c.bottom), h >= e && h <= i)) return t;
                  if (l > e) return t;
                  (a = t), o.push(t);
                }
              })))
            )
              return this.findTextStartRange(s, e, i);
          return this.findTextStartRange(a, e, i);
        }
        findEnd(t, e, i) {
          for (var n, s, o = [t], a = t; o.length; )
            if (
              ((n = o.shift()),
              (s = this.walk(n, (t) => {
                var n, s, h, l, c;
                if (
                  ((c = Object(r.nodeBounds)(t)),
                  this.horizontal && "ltr" === this.direction)
                ) {
                  if (
                    ((n = Math.round(c.left)),
                    (s = Math.round(c.right)),
                    n > i && a)
                  )
                    return a;
                  if (s > i) return t;
                  (a = t), o.push(t);
                } else if (this.horizontal && "rtl" === this.direction) {
                  if (
                    ((n = Math.round(this.horizontal ? c.left : c.top)),
                    (s = Math.round(this.horizontal ? c.right : c.bottom)) <
                      e && a)
                  )
                    return a;
                  if (n < e) return t;
                  (a = t), o.push(t);
                } else {
                  if (
                    ((h = Math.round(c.top)),
                    (l = Math.round(c.bottom)),
                    h > i && a)
                  )
                    return a;
                  if (l > i) return t;
                  (a = t), o.push(t);
                }
              })))
            )
              return this.findTextEndRange(s, e, i);
          return this.findTextEndRange(a, e, i);
        }
        findTextStartRange(t, e, i) {
          for (
            var n, r, s = this.splitTextNodeIntoRanges(t), o = 0;
            o < s.length;
            o++
          )
            if (
              ((r = (n = s[o]).getBoundingClientRect()),
              this.horizontal && "ltr" === this.direction)
            ) {
              if (r.left >= e) return n;
            } else if (this.horizontal && "rtl" === this.direction) {
              if (r.right <= i) return n;
            } else if (r.top >= e) return n;
          return s[0];
        }
        findTextEndRange(t, e, i) {
          for (
            var n, r, s, o, a, h, l, c = this.splitTextNodeIntoRanges(t), u = 0;
            u < c.length;
            u++
          ) {
            if (
              ((s = (r = c[u]).getBoundingClientRect()),
              this.horizontal && "ltr" === this.direction)
            ) {
              if (((o = s.left), (a = s.right), o > i && n)) return n;
              if (a > i) return r;
            } else if (this.horizontal && "rtl" === this.direction) {
              if (((o = s.left), (a = s.right) < e && n)) return n;
              if (o < e) return r;
            } else {
              if (((h = s.top), (l = s.bottom), h > i && n)) return n;
              if (l > i) return r;
            }
            n = r;
          }
          return c[c.length - 1];
        }
        splitTextNodeIntoRanges(t, e) {
          var i,
            n = [],
            r = (t.textContent || "").trim(),
            s = t.ownerDocument,
            o = e || " ",
            a = r.indexOf(o);
          if (-1 === a || t.nodeType != Node.TEXT_NODE)
            return (i = s.createRange()).selectNodeContents(t), [i];
          for (
            (i = s.createRange()).setStart(t, 0),
              i.setEnd(t, a),
              n.push(i),
              i = !1;
            -1 != a;

          )
            (a = r.indexOf(o, a + 1)) > 0 &&
              (i && (i.setEnd(t, a), n.push(i)),
              (i = s.createRange()).setStart(t, a + 1));
          return i && (i.setEnd(t, r.length), n.push(i)), n;
        }
        rangePairToCfiPair(t, e) {
          var i = e.start,
            r = e.end;
          return (
            i.collapse(!0),
            r.collapse(!1),
            { start: new n.a(i, t).toString(), end: new n.a(r, t).toString() }
          );
        }
        rangeListToCfiList(t, e) {
          for (var i, n = [], r = 0; r < e.length; r++)
            (i = this.rangePairToCfiPair(t, e[r])), n.push(i);
          return n;
        }
        axis(t) {
          return t && (this.horizontal = "horizontal" === t), this.horizontal;
        }
      };
    },
    function (t, e, i) {
      var n = i(7);
      t.exports = function (t) {
        return "object" == typeof t ? null !== t : n(t);
      };
    },
    function (t, e, i) {
      var n = i(9),
        r = i(7),
        s = function (t) {
          return r(t) ? t : void 0;
        };
      t.exports = function (t, e) {
        return arguments.length < 2 ? s(n[t]) : n[t] && n[t][e];
      };
    },
    function (t, e, i) {
      var n = i(13),
        r = i(21),
        s = i(32);
      t.exports = n
        ? function (t, e, i) {
            return r.f(t, e, s(1, i));
          }
        : function (t, e, i) {
            return (t[e] = i), t;
          };
    },
    function (t, e, i) {
      var n = i(13),
        r = i(61),
        s = i(22),
        o = i(55),
        a = Object.defineProperty;
      e.f = n
        ? a
        : function (t, e, i) {
            if ((s(t), (e = o(e)), s(i), r))
              try {
                return a(t, e, i);
              } catch (t) {}
            if ("get" in i || "set" in i)
              throw TypeError("Accessors not supported");
            return "value" in i && (t[e] = i.value), t;
          };
    },
    function (t, e, i) {
      var n = i(18);
      t.exports = function (t) {
        if (n(t)) return t;
        throw TypeError(String(t) + " is not an object");
      };
    },
    function (t, e, i) {
      "use strict";
      var n = i(3),
        r = i.n(n),
        s = i(0),
        o = i(2),
        a = i(17),
        h = i(10),
        l = i(1);
      const c = "undefined" != typeof navigator,
        u = c && /Chrome/.test(navigator.userAgent),
        d = c && !u && /AppleWebKit/.test(navigator.userAgent);
      class f {
        constructor(t, e, i, n) {
          (this.epubcfi = new o.a()),
            (this.document = t),
            (this.documentElement = this.document.documentElement),
            (this.content = e || this.document.body),
            (this.window = this.document.defaultView),
            (this._size = { width: 0, height: 0 }),
            (this.sectionIndex = n || 0),
            (this.cfiBase = i || ""),
            this.epubReadingSystem("epub.js", l.b),
            (this.called = 0),
            (this.active = !0),
            this.listeners();
        }
        static get listenedEvents() {
          return l.a;
        }
        width(t) {
          var e = this.content;
          return (
            t && Object(s.isNumber)(t) && (t += "px"),
            t && (e.style.width = t),
            parseInt(this.window.getComputedStyle(e).width)
          );
        }
        height(t) {
          var e = this.content;
          return (
            t && Object(s.isNumber)(t) && (t += "px"),
            t && (e.style.height = t),
            parseInt(this.window.getComputedStyle(e).height)
          );
        }
        contentWidth(t) {
          var e = this.content || this.document.body;
          return (
            t && Object(s.isNumber)(t) && (t += "px"),
            t && (e.style.width = t),
            parseInt(this.window.getComputedStyle(e).width)
          );
        }
        contentHeight(t) {
          var e = this.content || this.document.body;
          return (
            t && Object(s.isNumber)(t) && (t += "px"),
            t && (e.style.height = t),
            parseInt(this.window.getComputedStyle(e).height)
          );
        }
        textWidth() {
          let t,
            e,
            i = this.document.createRange(),
            n = this.content || this.document.body,
            r = Object(s.borders)(n);
          return (
            i.selectNodeContents(n),
            (t = i.getBoundingClientRect()),
            (e = t.width),
            r && r.width && (e += r.width),
            Math.round(e)
          );
        }
        textHeight() {
          let t,
            e,
            i = this.document.createRange(),
            n = this.content || this.document.body;
          return (
            i.selectNodeContents(n),
            (t = i.getBoundingClientRect()),
            (e = t.bottom),
            Math.round(e)
          );
        }
        scrollWidth() {
          return this.documentElement.scrollWidth;
        }
        scrollHeight() {
          return this.documentElement.scrollHeight;
        }
        overflow(t) {
          return (
            t && (this.documentElement.style.overflow = t),
            this.window.getComputedStyle(this.documentElement).overflow
          );
        }
        overflowX(t) {
          return (
            t && (this.documentElement.style.overflowX = t),
            this.window.getComputedStyle(this.documentElement).overflowX
          );
        }
        overflowY(t) {
          return (
            t && (this.documentElement.style.overflowY = t),
            this.window.getComputedStyle(this.documentElement).overflowY
          );
        }
        css(t, e, i) {
          var n = this.content || this.document.body;
          return (
            e
              ? n.style.setProperty(t, e, i ? "important" : "")
              : n.style.removeProperty(t),
            this.window.getComputedStyle(n)[t]
          );
        }
        viewport(t) {
          var e,
            i = this.document.querySelector("meta[name='viewport']"),
            n = {
              width: void 0,
              height: void 0,
              scale: void 0,
              minimum: void 0,
              maximum: void 0,
              scalable: void 0,
            },
            r = [];
          if (i && i.hasAttribute("content")) {
            let t = i.getAttribute("content"),
              e = t.match(/width\\s*=\\s*([^,]*)/),
              r = t.match(/height\\s*=\\s*([^,]*)/),
              s = t.match(/initial-scale\\s*=\\s*([^,]*)/),
              o = t.match(/minimum-scale\\s*=\\s*([^,]*)/),
              a = t.match(/maximum-scale\\s*=\\s*([^,]*)/),
              h = t.match(/user-scalable\\s*=\\s*([^,]*)/);
            e && e.length && void 0 !== e[1] && (n.width = e[1]),
              r && r.length && void 0 !== r[1] && (n.height = r[1]),
              s && s.length && void 0 !== s[1] && (n.scale = s[1]),
              o && o.length && void 0 !== o[1] && (n.minimum = o[1]),
              a && a.length && void 0 !== a[1] && (n.maximum = a[1]),
              h && h.length && void 0 !== h[1] && (n.scalable = h[1]);
          }
          return (
            (e = Object(s.defaults)(t || {}, n)),
            t &&
              (e.width && r.push("width=" + e.width),
              e.height && r.push("height=" + e.height),
              e.scale && r.push("initial-scale=" + e.scale),
              "no" === e.scalable
                ? (r.push("minimum-scale=" + e.scale),
                  r.push("maximum-scale=" + e.scale),
                  r.push("user-scalable=" + e.scalable))
                : (e.scalable && r.push("user-scalable=" + e.scalable),
                  e.minimum && r.push("minimum-scale=" + e.minimum),
                  e.maximum && r.push("minimum-scale=" + e.maximum)),
              i ||
                ((i = this.document.createElement("meta")).setAttribute(
                  "name",
                  "viewport",
                ),
                this.document.querySelector("head").appendChild(i)),
              i.setAttribute("content", r.join(", ")),
              this.window.scrollTo(0, 0)),
            e
          );
        }
        expand() {
          this.emit(l.c.CONTENTS.EXPAND);
        }
        listeners() {
          this.imageLoadListeners(),
            this.mediaQueryListeners(),
            this.addEventListeners(),
            this.addSelectionListeners(),
            "undefined" == typeof ResizeObserver
              ? (this.resizeListeners(), this.visibilityListeners())
              : this.resizeObservers(),
            this.linksHandler();
        }
        removeListeners() {
          this.removeEventListeners(),
            this.removeSelectionListeners(),
            this.observer && this.observer.disconnect(),
            clearTimeout(this.expanding);
        }
        resizeCheck() {
          let t = this.textWidth(),
            e = this.textHeight();
          (t == this._size.width && e == this._size.height) ||
            ((this._size = { width: t, height: e }),
            this.onResize && this.onResize(this._size),
            this.emit(l.c.CONTENTS.RESIZE, this._size));
        }
        resizeListeners() {
          clearTimeout(this.expanding),
            requestAnimationFrame(this.resizeCheck.bind(this)),
            (this.expanding = setTimeout(this.resizeListeners.bind(this), 350));
        }
        visibilityListeners() {
          document.addEventListener("visibilitychange", () => {
            "visible" === document.visibilityState && !1 === this.active
              ? ((this.active = !0), this.resizeListeners())
              : ((this.active = !1), clearTimeout(this.expanding));
          });
        }
        transitionListeners() {
          let t = this.content;
          (t.style.transitionProperty =
            "font, font-size, font-size-adjust, font-stretch, font-variation-settings, font-weight, width, height"),
            (t.style.transitionDuration = "0.001ms"),
            (t.style.transitionTimingFunction = "linear"),
            (t.style.transitionDelay = "0"),
            (this._resizeCheck = this.resizeCheck.bind(this)),
            this.document.addEventListener("transitionend", this._resizeCheck);
        }
        mediaQueryListeners() {
          for (
            var t = this.document.styleSheets,
              e = function (t) {
                t.matches &&
                  !this._expanding &&
                  setTimeout(this.expand.bind(this), 1);
              }.bind(this),
              i = 0;
            i < t.length;
            i += 1
          ) {
            var n;
            try {
              n = t[i].cssRules;
            } catch (t) {
              return;
            }
            if (!n) return;
            for (var r = 0; r < n.length; r += 1) {
              if (n[r].media)
                this.window.matchMedia(n[r].media.mediaText).addListener(e);
            }
          }
        }
        resizeObservers() {
          (this.observer = new ResizeObserver((t) => {
            requestAnimationFrame(this.resizeCheck.bind(this));
          })),
            this.observer.observe(this.document.documentElement);
        }
        mutationObservers() {
          this.observer = new MutationObserver((t) => {
            this.resizeCheck();
          });
          this.observer.observe(this.document, {
            attributes: !0,
            childList: !0,
            characterData: !0,
            subtree: !0,
          });
        }
        imageLoadListeners() {
          for (
            var t, e = this.document.querySelectorAll("img"), i = 0;
            i < e.length;
            i++
          )
            void 0 !== (t = e[i]).naturalWidth &&
              0 === t.naturalWidth &&
              (t.onload = this.expand.bind(this));
        }
        fontLoadListeners() {
          this.document &&
            this.document.fonts &&
            this.document.fonts.ready.then(
              function () {
                this.resizeCheck();
              }.bind(this),
            );
        }
        root() {
          return this.document ? this.document.documentElement : null;
        }
        locationOf(t, e) {
          var i,
            n = { left: 0, top: 0 };
          if (!this.document) return n;
          if (this.epubcfi.isCfiString(t)) {
            let r = new o.a(t).toRange(this.document, e);
            if (r) {
              try {
                if (
                  !r.endContainer ||
                  (r.startContainer == r.endContainer &&
                    r.startOffset == r.endOffset)
                ) {
                  let t = r.startContainer.textContent.indexOf(
                    " ",
                    r.startOffset,
                  );
                  -1 == t && (t = r.startContainer.textContent.length),
                    r.setEnd(r.startContainer, t);
                }
              } catch (t) {
                console.error(
                  "setting end offset to start container length failed",
                  t,
                );
              }
              if (r.startContainer.nodeType === Node.ELEMENT_NODE)
                (i = r.startContainer.getBoundingClientRect()),
                  (n.left = i.left),
                  (n.top = i.top);
              else if (d) {
                let t = r.startContainer,
                  e = new Range();
                try {
                  1 === t.nodeType
                    ? (i = t.getBoundingClientRect())
                    : r.startOffset + 2 < t.length
                      ? (e.setStart(t, r.startOffset),
                        e.setEnd(t, r.startOffset + 2),
                        (i = e.getBoundingClientRect()))
                      : r.startOffset - 2 > 0
                        ? (e.setStart(t, r.startOffset - 2),
                          e.setEnd(t, r.startOffset),
                          (i = e.getBoundingClientRect()))
                        : (i = t.parentNode.getBoundingClientRect());
                } catch (t) {
                  console.error(t, t.stack);
                }
              } else i = r.getBoundingClientRect();
            }
          } else if ("string" == typeof t && t.indexOf("#") > -1) {
            let e = t.substring(t.indexOf("#") + 1),
              n = this.document.getElementById(e);
            if (n)
              if (d) {
                let t = new Range();
                t.selectNode(n), (i = t.getBoundingClientRect());
              } else i = n.getBoundingClientRect();
          }
          return i && ((n.left = i.left), (n.top = i.top)), n;
        }
        addStylesheet(t) {
          return new Promise(
            function (e, i) {
              var n,
                r = !1;
              this.document
                ? (n = this.document.querySelector("link[href='" + t + "']"))
                  ? e(!0)
                  : (((n = this.document.createElement("link")).type =
                      "text/css"),
                    (n.rel = "stylesheet"),
                    (n.href = t),
                    (n.onload = n.onreadystatechange =
                      function () {
                        r ||
                          (this.readyState && "complete" != this.readyState) ||
                          ((r = !0),
                          setTimeout(() => {
                            e(!0);
                          }, 1));
                      }),
                    this.document.head.appendChild(n))
                : e(!1);
            }.bind(this),
          );
        }
        _getStylesheetNode(t) {
          var e;
          return (
            (t = "epubjs-inserted-css-" + (t || "")),
            !!this.document &&
              ((e = this.document.getElementById(t)) ||
                (((e = this.document.createElement("style")).id = t),
                this.document.head.appendChild(e)),
              e)
          );
        }
        addStylesheetCss(t, e) {
          return (
            !(!this.document || !t) &&
            ((this._getStylesheetNode(e).innerHTML = t), !0)
          );
        }
        addStylesheetRules(t, e) {
          var i;
          if (this.document && t && 0 !== t.length)
            if (
              ((i = this._getStylesheetNode(e).sheet),
              "[object Array]" === Object.prototype.toString.call(t))
            )
              for (var n = 0, r = t.length; n < r; n++) {
                var s = 1,
                  o = t[n],
                  a = t[n][0],
                  h = "";
                "[object Array]" === Object.prototype.toString.call(o[1][0]) &&
                  ((o = o[1]), (s = 0));
                for (var l = o.length; s < l; s++) {
                  var c = o[s];
                  h += c[0] + ":" + c[1] + (c[2] ? " !important" : "") + ";\\n";
                }
                i.insertRule(a + "{" + h + "}", i.cssRules.length);
              }
            else {
              Object.keys(t).forEach((e) => {
                const n = t[e];
                if (Array.isArray(n))
                  n.forEach((t) => {
                    const n = Object.keys(t)
                      .map((e) => \`\${e}:\${t[e]}\`)
                      .join(";");
                    i.insertRule(\`\${e}{\${n}}\`, i.cssRules.length);
                  });
                else {
                  const t = Object.keys(n)
                    .map((t) => \`\${t}:\${n[t]}\`)
                    .join(";");
                  i.insertRule(\`\${e}{\${t}}\`, i.cssRules.length);
                }
              });
            }
        }
        addScript(t) {
          return new Promise(
            function (e, i) {
              var n,
                r = !1;
              this.document
                ? (((n = this.document.createElement("script")).type =
                    "text/javascript"),
                  (n.async = !0),
                  (n.src = t),
                  (n.onload = n.onreadystatechange =
                    function () {
                      r ||
                        (this.readyState && "complete" != this.readyState) ||
                        ((r = !0),
                        setTimeout(function () {
                          e(!0);
                        }, 1));
                    }),
                  this.document.head.appendChild(n))
                : e(!1);
            }.bind(this),
          );
        }
        addClass(t) {
          var e;
          this.document &&
            (e = this.content || this.document.body) &&
            e.classList.add(t);
        }
        removeClass(t) {
          var e;
          this.document &&
            (e = this.content || this.document.body) &&
            e.classList.remove(t);
        }
        addEventListeners() {
          this.document &&
            ((this._triggerEvent = this.triggerEvent.bind(this)),
            l.a.forEach(function (t) {
              this.document.addEventListener(t, this._triggerEvent, {
                passive: !0,
              });
            }, this));
        }
        removeEventListeners() {
          this.document &&
            (l.a.forEach(function (t) {
              this.document.removeEventListener(t, this._triggerEvent, {
                passive: !0,
              });
            }, this),
            (this._triggerEvent = void 0));
        }
        triggerEvent(t) {
          this.emit(t.type, t);
        }
        addSelectionListeners() {
          this.document &&
            ((this._onSelectionChange = this.onSelectionChange.bind(this)),
            this.document.addEventListener(
              "selectionchange",
              this._onSelectionChange,
              { passive: !0 },
            ));
        }
        removeSelectionListeners() {
          this.document &&
            (this.document.removeEventListener(
              "selectionchange",
              this._onSelectionChange,
              { passive: !0 },
            ),
            (this._onSelectionChange = void 0));
        }
        onSelectionChange(t) {
          this.selectionEndTimeout && clearTimeout(this.selectionEndTimeout),
            (this.selectionEndTimeout = setTimeout(
              function () {
                var t = this.window.getSelection();
                this.triggerSelectedEvent(t);
              }.bind(this),
              250,
            ));
        }
        triggerSelectedEvent(t) {
          var e, i;
          t &&
            t.rangeCount > 0 &&
            ((e = t.getRangeAt(0)).collapsed ||
              ((i = new o.a(e, this.cfiBase).toString()),
              this.emit(l.c.CONTENTS.SELECTED, i),
              this.emit(l.c.CONTENTS.SELECTED_RANGE, e)));
        }
        range(t, e) {
          return new o.a(t).toRange(this.document, e);
        }
        cfiFromRange(t, e) {
          return new o.a(t, this.cfiBase, e).toString();
        }
        cfiFromNode(t, e) {
          return new o.a(t, this.cfiBase, e).toString();
        }
        map(t) {
          return new a.a(t).section();
        }
        size(t, e) {
          var i = { scale: 1, scalable: "no" };
          this.layoutStyle("scrolling"),
            t >= 0 &&
              (this.width(t),
              (i.width = t),
              this.css("padding", "0 " + t / 12 + "px")),
            e >= 0 && (this.height(e), (i.height = e)),
            this.css("margin", "0"),
            this.css("box-sizing", "border-box"),
            this.viewport(i);
        }
        columns(t, e, i, n, r) {
          let o = Object(s.prefixed)("column-axis"),
            a = Object(s.prefixed)("column-gap"),
            h = Object(s.prefixed)("column-width"),
            l = Object(s.prefixed)("column-fill"),
            c =
              0 === this.writingMode().indexOf("vertical")
                ? "vertical"
                : "horizontal";
          this.layoutStyle("paginated"),
            "rtl" === r && "horizontal" === c && this.direction(r),
            this.width(t),
            this.height(e),
            this.viewport({ width: t, height: e, scale: 1, scalable: "no" }),
            this.css("overflow-y", "hidden"),
            this.css("margin", "0", !0),
            "vertical" === c
              ? (this.css("padding-top", n / 2 + "px", !0),
                this.css("padding-bottom", n / 2 + "px", !0),
                this.css("padding-left", "20px"),
                this.css("padding-right", "20px"),
                this.css(o, "vertical"))
              : (this.css("padding-top", "20px"),
                this.css("padding-bottom", "20px"),
                this.css("padding-left", n / 2 + "px", !0),
                this.css("padding-right", n / 2 + "px", !0),
                this.css(o, "horizontal")),
            this.css("box-sizing", "border-box"),
            this.css("max-width", "inherit"),
            this.css(l, "auto"),
            this.css(a, n + "px"),
            this.css(h, i + "px"),
            this.css("-webkit-line-box-contain", "block glyphs replaced");
        }
        scaler(t, e, i) {
          var n = "scale(" + t + ")",
            r = "";
          this.css("transform-origin", "top left"),
            (e >= 0 || i >= 0) &&
              (r = " translate(" + (e || 0) + "px, " + (i || 0) + "px )"),
            this.css("transform", n + r);
        }
        fit(t, e, i) {
          var n = this.viewport(),
            r = parseInt(n.width),
            s = parseInt(n.height),
            o = t / r,
            a = e / s,
            h = o < a ? o : a;
          if (
            (this.layoutStyle("paginated"),
            this.width(r),
            this.height(s),
            this.overflow("hidden"),
            this.scaler(h, 0, 0),
            this.css("background-size", r * h + "px " + s * h + "px"),
            this.css("background-color", "transparent"),
            i && i.properties.includes("page-spread-left"))
          ) {
            var l = t - r * h;
            this.css("margin-left", l + "px");
          }
        }
        direction(t) {
          this.documentElement && (this.documentElement.style.direction = t);
        }
        mapPage(t, e, i, n, r) {
          return new a.a(e, r).page(this, t, i, n);
        }
        linksHandler() {
          Object(h.c)(this.content, (t) => {
            this.emit(l.c.CONTENTS.LINK_CLICKED, t);
          });
        }
        writingMode(t) {
          let e = Object(s.prefixed)("writing-mode");
          return (
            t && this.documentElement && (this.documentElement.style[e] = t),
            this.window.getComputedStyle(this.documentElement)[e] || ""
          );
        }
        layoutStyle(t) {
          return (
            t &&
              ((this._layoutStyle = t),
              (navigator.epubReadingSystem.layoutStyle = this._layoutStyle)),
            this._layoutStyle || "paginated"
          );
        }
        epubReadingSystem(t, e) {
          return (
            (navigator.epubReadingSystem = {
              name: t,
              version: e,
              layoutStyle: this.layoutStyle(),
              hasFeature: function (t) {
                switch (t) {
                  case "dom-manipulation":
                  case "layout-changes":
                  case "touch-events":
                  case "mouse-events":
                  case "keyboard-events":
                    return !0;
                  case "spine-scripting":
                  default:
                    return !1;
                }
              },
            }),
            navigator.epubReadingSystem
          );
        }
        destroy() {
          this.removeListeners();
        }
      }
      r()(f.prototype), (e.a = f);
    },
    function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Underline = e.Pane = e.Mark = e.Highlight = void 0),
        i(96),
        i(68);
      var n = s(i(125)),
        r = s(i(126));
      function s(t) {
        return t && t.__esModule ? t : { default: t };
      }
      e.Pane = class {
        constructor(t) {
          let e =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : document.body;
          (this.target = t),
            (this.element = n.default.createElement("svg")),
            (this.marks = []),
            (this.element.style.position = "absolute"),
            this.element.setAttribute("pointer-events", "none"),
            r.default.proxyMouse(this.target, this.marks),
            (this.container = e),
            this.container.appendChild(this.element),
            this.render();
        }
        addMark(t) {
          var e = n.default.createElement("g");
          return (
            this.element.appendChild(e),
            t.bind(e, this.container),
            this.marks.push(t),
            t.render(),
            t
          );
        }
        removeMark(t) {
          var e = this.marks.indexOf(t);
          if (-1 !== e) {
            var i = t.unbind();
            this.element.removeChild(i), this.marks.splice(e, 1);
          }
        }
        render() {
          var t, e, i, n;
          for (var r of ((function (t, e) {
            t.style.setProperty("top", "".concat(e.top, "px"), "important"),
              t.style.setProperty("left", "".concat(e.left, "px"), "important"),
              t.style.setProperty(
                "height",
                "".concat(e.height, "px"),
                "important",
              ),
              t.style.setProperty(
                "width",
                "".concat(e.width, "px"),
                "important",
              );
          })(
            this.element,
            ((t = this.target),
            (e = this.container),
            (i = e.getBoundingClientRect()),
            {
              top: (n = t.getBoundingClientRect()).top - i.top,
              left: n.left - i.left,
              height: t.scrollHeight,
              width: t.scrollWidth,
            }),
          ),
          this.marks))
            r.render();
        }
      };
      class o {
        constructor() {
          this.element = null;
        }
        bind(t, e) {
          (this.element = t), (this.container = e);
        }
        unbind() {
          var t = this.element;
          return (this.element = null), t;
        }
        render() {}
        dispatchEvent(t) {
          this.element && this.element.dispatchEvent(t);
        }
        getBoundingClientRect() {
          return this.element.getBoundingClientRect();
        }
        getClientRects() {
          for (var t = [], e = this.element.firstChild; e; )
            t.push(e.getBoundingClientRect()), (e = e.nextSibling);
          return t;
        }
        filteredRanges() {
          if (!this.range) return [];
          const t = Array.from(this.range.getClientRects()).map((t) =>
              JSON.stringify(t),
            ),
            e = new Set(t);
          return Array.from(e).map((t) => JSON.parse(t));
        }
      }
      e.Mark = o;
      class a extends o {
        constructor(t, e, i, n) {
          super(),
            (this.range = t),
            (this.className = e),
            (this.data = i || {}),
            (this.attributes = n || {});
        }
        bind(t, e) {
          for (var i in (super.bind(t, e), this.data))
            this.data.hasOwnProperty(i) &&
              (this.element.dataset[i] = this.data[i]);
          for (var i in this.attributes)
            this.attributes.hasOwnProperty(i) &&
              this.element.setAttribute(i, this.attributes[i]);
          this.className && this.element.classList.add(this.className);
        }
        render() {
          for (; this.element.firstChild; )
            this.element.removeChild(this.element.firstChild);
          for (
            var t = this.element.ownerDocument.createDocumentFragment(),
              e = this.filteredRanges(),
              i = this.element.getBoundingClientRect(),
              r = this.container.getBoundingClientRect(),
              s = 0,
              o = e.length;
            s < o;
            s++
          ) {
            var a = e[s],
              h = n.default.createElement("rect");
            h.setAttribute("x", a.left - i.left + r.left),
              h.setAttribute("y", a.top - i.top + r.top),
              h.setAttribute("height", a.height),
              h.setAttribute("width", a.width),
              h.setAttribute("fill", this.attributes.fill),
              h.setAttribute("fill-opacity", this.attributes["fill-opacity"]),
              t.appendChild(h);
          }
          this.element.appendChild(t);
        }
      }
      e.Highlight = a;
      e.Underline = class extends a {
        constructor(t, e, i, n) {
          super(t, e, i, n);
        }
        render() {
          for (; this.element.firstChild; )
            this.element.removeChild(this.element.firstChild);
          for (
            var t = this.element.ownerDocument.createDocumentFragment(),
              e = this.filteredRanges(),
              i = this.element.getBoundingClientRect(),
              r = this.container.getBoundingClientRect(),
              s = 0,
              o = e.length;
            s < o;
            s++
          ) {
            var a,
              h,
              l,
              c = e[s],
              u = n.default.createElement("rect");
            u.setAttribute("x", c.left - i.left + r.left),
              u.setAttribute("y", c.top - i.top + r.top),
              u.setAttribute("height", c.height),
              u.setAttribute("width", c.width),
              u.setAttribute("fill", "none"),
              u.setAttribute("stroke", "transparent");
            var d = n.default.createElement("line");
            d.setAttribute("x1", c.left - i.left + r.left),
              d.setAttribute("x2", c.left - i.left + r.left + c.width),
              d.setAttribute("y1", c.top - i.top + r.top + c.height - 1),
              d.setAttribute("y2", c.top - i.top + r.top + c.height - 1),
              d.setAttribute(
                "stroke-width",
                (null === (a = this.attributes) || void 0 === a
                  ? void 0
                  : a["stroke-width"]) || 1,
              ),
              d.setAttribute(
                "stroke-opacity",
                (null === (h = this.attributes) || void 0 === h
                  ? void 0
                  : h["stroke-opacity"]) || 0.3,
              ),
              d.setAttribute(
                "stroke",
                (null === (l = this.attributes) || void 0 === l
                  ? void 0
                  : l.stroke) || "black",
              ),
              d.setAttribute("stroke-linecap", "square"),
              t.appendChild(u),
              t.appendChild(d);
          }
          this.element.appendChild(t);
        }
      };
    },
    function (t, e) {
      var i;
      i = (function () {
        return this;
      })();
      try {
        i = i || new Function("return this")();
      } catch (t) {
        "object" == typeof window && (i = window);
      }
      t.exports = i;
    },
    function (t, e, i) {
      "use strict";
      function n(t, e) {
        return (
          void 0 === e && (e = Object),
          e && "function" == typeof e.freeze ? e.freeze(t) : t
        );
      }
      var r = n({
          HTML: "text/html",
          isHTML: function (t) {
            return t === r.HTML;
          },
          XML_APPLICATION: "application/xml",
          XML_TEXT: "text/xml",
          XML_XHTML_APPLICATION: "application/xhtml+xml",
          XML_SVG_IMAGE: "image/svg+xml",
        }),
        s = n({
          HTML: "http://www.w3.org/1999/xhtml",
          isHTML: function (t) {
            return t === s.HTML;
          },
          SVG: "http://www.w3.org/2000/svg",
          XML: "http://www.w3.org/XML/1998/namespace",
          XMLNS: "http://www.w3.org/2000/xmlns/",
        });
      (e.freeze = n), (e.MIME_TYPE = r), (e.NAMESPACE = s);
    },
    function (t, e, i) {
      var n = i(53),
        r = i(54);
      t.exports = function (t) {
        return n(r(t));
      };
    },
    function (t, e, i) {
      var n = i(50);
      (e.DOMImplementation = n.DOMImplementation),
        (e.XMLSerializer = n.XMLSerializer),
        (e.DOMParser = i(93).DOMParser);
    },
    function (t, e, i) {
      "use strict";
      var n = i(3),
        r = i.n(n),
        s = i(0),
        o = i(6),
        a = i(2),
        h = i(15),
        l = i(1);
      class c {
        constructor(t) {
          (this.settings = t),
            (this.name = t.layout || "reflowable"),
            (this._spread = "none" !== t.spread),
            (this._minSpreadWidth = t.minSpreadWidth || 800),
            (this._evenSpreads = t.evenSpreads || !1),
            "scrolled" === t.flow ||
            "scrolled-continuous" === t.flow ||
            "scrolled-doc" === t.flow
              ? (this._flow = "scrolled")
              : (this._flow = "paginated"),
            (this.width = 0),
            (this.height = 0),
            (this.spreadWidth = 0),
            (this.delta = 0),
            (this.columnWidth = 0),
            (this.gap = 0),
            (this.divisor = 1),
            (this.props = {
              name: this.name,
              spread: this._spread,
              flow: this._flow,
              width: 0,
              height: 0,
              spreadWidth: 0,
              delta: 0,
              columnWidth: 0,
              gap: 0,
              divisor: 1,
            });
        }
        flow(t) {
          return (
            void 0 !== t &&
              ((this._flow =
                "scrolled" === t ||
                "scrolled-continuous" === t ||
                "scrolled-doc" === t
                  ? "scrolled"
                  : "paginated"),
              this.update({ flow: this._flow })),
            this._flow
          );
        }
        spread(t, e) {
          return (
            t &&
              ((this._spread = "none" !== t),
              this.update({ spread: this._spread })),
            e >= 0 && (this._minSpreadWidth = e),
            this._spread
          );
        }
        calculate(t, e, i) {
          var n,
            r,
            s,
            o,
            a = 1,
            h = i || 0,
            l = t,
            c = e,
            u = Math.floor(l / 12);
          (a = this._spread && l >= this._minSpreadWidth ? 2 : 1),
            "reflowable" !== this.name ||
              "paginated" !== this._flow ||
              i >= 0 ||
              (h = u % 2 == 0 ? u : u - 1),
            "pre-paginated" === this.name && (h = 0),
            a > 1 ? (s = (n = l / a - h) + h) : ((n = l), (s = l)),
            "pre-paginated" === this.name && a > 1 && (l = n),
            (r = n * a + h),
            (o = l),
            (this.width = l),
            (this.height = c),
            (this.spreadWidth = r),
            (this.pageWidth = s),
            (this.delta = o),
            (this.columnWidth = n),
            (this.gap = h),
            (this.divisor = a),
            this.update({
              width: l,
              height: c,
              spreadWidth: r,
              pageWidth: s,
              delta: o,
              columnWidth: n,
              gap: h,
              divisor: a,
            });
        }
        format(t, e, i) {
          return "pre-paginated" === this.name
            ? t.fit(this.columnWidth, this.height, e)
            : "paginated" === this._flow
              ? t.columns(
                  this.width,
                  this.height,
                  this.columnWidth,
                  this.gap,
                  this.settings.direction,
                )
              : i && "horizontal" === i
                ? t.size(null, this.height)
                : t.size(this.width, null);
        }
        count(t, e) {
          let i, n;
          return (
            "pre-paginated" === this.name
              ? ((i = 1), (n = 1))
              : "paginated" === this._flow
                ? ((e = e || this.delta),
                  (i = Math.ceil(t / e)),
                  (n = i * this.divisor))
                : ((e = e || this.height), (i = Math.ceil(t / e)), (n = i)),
            { spreads: i, pages: n }
          );
        }
        update(t) {
          if (
            (Object.keys(t).forEach((e) => {
              this.props[e] === t[e] && delete t[e];
            }),
            Object.keys(t).length > 0)
          ) {
            let e = Object(s.extend)(this.props, t);
            this.emit(l.c.LAYOUT.UPDATED, e, t);
          }
        }
      }
      r()(c.prototype);
      var u = c,
        d = i(5);
      var f = class {
        constructor(t) {
          (this.rendition = t),
            (this._themes = {
              default: { rules: {}, url: "", serialized: "" },
            }),
            (this._overrides = {}),
            (this._current = "default"),
            (this._injected = []),
            this.rendition.hooks.content.register(this.inject.bind(this)),
            this.rendition.hooks.content.register(this.overrides.bind(this));
        }
        register() {
          if (0 !== arguments.length)
            return 1 === arguments.length && "object" == typeof arguments[0]
              ? this.registerThemes(arguments[0])
              : 1 === arguments.length && "string" == typeof arguments[0]
                ? this.default(arguments[0])
                : 2 === arguments.length && "string" == typeof arguments[1]
                  ? this.registerUrl(arguments[0], arguments[1])
                  : 2 === arguments.length && "object" == typeof arguments[1]
                    ? this.registerRules(arguments[0], arguments[1])
                    : void 0;
        }
        default(t) {
          if (t)
            return "string" == typeof t
              ? this.registerUrl("default", t)
              : "object" == typeof t
                ? this.registerRules("default", t)
                : void 0;
        }
        registerThemes(t) {
          for (var e in t)
            t.hasOwnProperty(e) &&
              ("string" == typeof t[e]
                ? this.registerUrl(e, t[e])
                : this.registerRules(e, t[e]));
        }
        registerCss(t, e) {
          (this._themes[t] = { serialized: e }),
            (this._injected[t] || "default" == t) && this.update(t);
        }
        registerUrl(t, e) {
          var i = new d.a(e);
          (this._themes[t] = { url: i.toString() }),
            (this._injected[t] || "default" == t) && this.update(t);
        }
        registerRules(t, e) {
          (this._themes[t] = { rules: e }),
            (this._injected[t] || "default" == t) && this.update(t);
        }
        select(t) {
          var e = this._current;
          (this._current = t),
            this.update(t),
            this.rendition.getContents().forEach((i) => {
              i.removeClass(e), i.addClass(t);
            });
        }
        update(t) {
          this.rendition.getContents().forEach((e) => {
            this.add(t, e);
          });
        }
        inject(t) {
          var e,
            i = [],
            n = this._themes;
          for (var r in n)
            !n.hasOwnProperty(r) ||
              (r !== this._current && "default" !== r) ||
              ((((e = n[r]).rules && Object.keys(e.rules).length > 0) ||
                (e.url && -1 === i.indexOf(e.url))) &&
                this.add(r, t),
              this._injected.push(r));
          "default" != this._current && t.addClass(this._current);
        }
        add(t, e) {
          var i = this._themes[t];
          i &&
            e &&
            (i.url
              ? e.addStylesheet(i.url)
              : i.serialized
                ? (e.addStylesheetCss(i.serialized, t), (i.injected = !0))
                : i.rules &&
                  (e.addStylesheetRules(i.rules, t), (i.injected = !0)));
        }
        override(t, e, i) {
          var n = this.rendition.getContents();
          (this._overrides[t] = { value: e, priority: !0 === i }),
            n.forEach((e) => {
              e.css(t, this._overrides[t].value, this._overrides[t].priority);
            });
        }
        removeOverride(t) {
          var e = this.rendition.getContents();
          delete this._overrides[t],
            e.forEach((e) => {
              e.css(t);
            });
        }
        overrides(t) {
          var e = this._overrides;
          for (var i in e)
            e.hasOwnProperty(i) && t.css(i, e[i].value, e[i].priority);
        }
        fontSize(t) {
          this.override("font-size", t);
        }
        font(t) {
          this.override("font-family", t, !0);
        }
        destroy() {
          (this.rendition = void 0),
            (this._themes = void 0),
            (this._overrides = void 0),
            (this._current = void 0),
            (this._injected = void 0);
        }
      };
      i(23);
      class p {
        constructor({
          type: t,
          cfiRange: e,
          data: i,
          sectionIndex: n,
          cb: r,
          className: s,
          styles: o,
          cfiRangeText: a,
        }) {
          (this.type = t),
            (this.cfiRange = e),
            (this.cfiRangeText = a),
            (this.data = i),
            (this.sectionIndex = n),
            (this.mark = void 0),
            (this.cb = r),
            (this.className = s),
            (this.styles = o);
        }
        update(t = {}, e = {}) {
          var i, n, r, s, o, a, h, l, c, u;
          (this.data && (this.data = t),
          this.styles || (this.styles = {}),
          null != e && e.stroke) &&
            (null !== (i = this.mark) &&
              void 0 !== i &&
              null !== (n = i.attributes) &&
              void 0 !== n &&
              n.stroke &&
              (this.mark.attributes.stroke = e.stroke),
            (this.styles.stroke = e.stroke));
          null != e &&
            e["stroke-opacity"] &&
            (null !== (r = this.mark) &&
              void 0 !== r &&
              null !== (s = r.attributes) &&
              void 0 !== s &&
              s["stroke-opacity"] &&
              (this.mark.attributes["stroke-opacity"] = e["stroke-opacity"]),
            (this.styles["stroke-opacity"] = e["stroke-opacity"]));
          null != e &&
            e["stroke-width"] &&
            (null !== (o = this.mark) &&
              void 0 !== o &&
              null !== (a = o.attributes) &&
              void 0 !== a &&
              a["stroke-width"] &&
              (this.mark.attributes["stroke-width"] = e["stroke-width"]),
            (this.styles["stroke-width"] = e["stroke-width"]));
          null != e &&
            e.fill &&
            (null !== (h = this.mark) &&
              void 0 !== h &&
              null !== (l = h.attributes) &&
              void 0 !== l &&
              l.fill &&
              (this.mark.attributes.fill = e.fill),
            (this.styles.fill = e.fill));
          null != e &&
            e["fill-opacity"] &&
            (null !== (c = this.mark) &&
              void 0 !== c &&
              null !== (u = c.attributes) &&
              void 0 !== u &&
              u["fill-opacity"] &&
              (this.mark.attributes["fill-opacity"] = e["fill-opacity"]),
            (this.styles["fill-opacity"] = e["fill-opacity"]));
        }
        attach(t) {
          let e,
            {
              cfiRange: i,
              cfiRangeText: n,
              data: r,
              type: s,
              mark: o,
              cb: a,
              className: h,
              styles: c,
            } = this;
          return (
            "highlight" === s
              ? (e = t.highlight(i, r, a, h, c, n))
              : "underline" === s
                ? (e = t.underline(i, r, a, h, c, n))
                : "mark" === s && (e = t.mark(i, r, a, h, c, n)),
            (this.mark = e),
            this.emit(l.c.ANNOTATION.ATTACH, e),
            e
          );
        }
        detach(t) {
          let e,
            { cfiRange: i, type: n } = this;
          return (
            t &&
              ("highlight" === n
                ? (e = t.unhighlight(i))
                : "underline" === n
                  ? (e = t.ununderline(i))
                  : "mark" === n && (e = t.unmark(i))),
            (this.mark = void 0),
            this.emit(l.c.ANNOTATION.DETACH, e),
            e
          );
        }
        text() {}
      }
      r()(p.prototype);
      var g = class {
          constructor(t) {
            (this.rendition = t),
              (this.highlights = []),
              (this.underlines = []),
              (this.marks = []),
              (this._annotations = {}),
              (this._annotationsBySectionIndex = {}),
              this.rendition.hooks.render.register(this.inject.bind(this)),
              this.rendition.hooks.unloaded.register(this.clear.bind(this));
          }
          add(t, e, i, n, r, s, o) {
            let h = encodeURI(e + t),
              l = new a.a(e).spinePos,
              c = new p({
                type: t,
                cfiRange: e,
                data: i,
                sectionIndex: l,
                cb: n,
                className: r,
                styles: s,
                cfiRangeText: o,
              });
            return (
              (this._annotations[h] = c),
              "highlight" === t && this.highlights.push(c),
              "underline" === t && this.underlines.push(c),
              "mark" === t && this.marks.push(c),
              l in this._annotationsBySectionIndex
                ? this._annotationsBySectionIndex[l].push(h)
                : (this._annotationsBySectionIndex[l] = [h]),
              this.rendition.views().forEach((t) => {
                c.sectionIndex === t.index && c.attach(t);
              }),
              c
            );
          }
          remove(t, e) {
            let i = encodeURI(t + e);
            if (i in this._annotations) {
              let n = this._annotations[i];
              if (e && n.type !== e) return;
              this.rendition.views().forEach((t) => {
                this._removeFromAnnotationBySectionIndex(n.sectionIndex, i),
                  n.sectionIndex === t.index && n.detach(t);
              }),
                (this.highlights = this.highlights.filter(
                  (i) => i.type !== e && i.cfiRange !== t,
                )),
                (this.underlines = this.underlines.filter(
                  (i) => i.type !== e && i.cfiRange !== t,
                )),
                (this.marks = this.marks.filter(
                  (i) => i.type !== e && i.cfiRange !== t,
                )),
                delete this._annotations[i];
            }
          }
          _removeFromAnnotationBySectionIndex(t, e) {
            this._annotationsBySectionIndex[t] = this._annotationsAt(t).filter(
              (t) => t !== e,
            );
          }
          _annotationsAt(t) {
            return this._annotationsBySectionIndex[t];
          }
          highlight(t, e, i, n, r, s) {
            return this.add("highlight", t, e, i, n, r, s);
          }
          underline(t, e, i, n, r, s) {
            return this.add("underline", t, i, n, r, s, e);
          }
          mark(t, e, i, n) {
            return this.add("mark", t, e, i, n);
          }
          each() {
            return [...this.highlights, ...this.underlines, ...this.marks];
          }
          inject(t) {
            let e = t.index;
            if (e in this._annotationsBySectionIndex) {
              this._annotationsBySectionIndex[e].forEach((e) => {
                this._annotations[e].attach(t);
              });
            }
          }
          clear(t) {
            let e = t.index;
            if (e in this._annotationsBySectionIndex) {
              this._annotationsBySectionIndex[e].forEach((e) => {
                this._annotations[e].detach(t);
              });
            }
          }
          show() {}
          hide() {}
        },
        m = i(45),
        v = i(16),
        y = i(47);
      class b {
        constructor(t, e) {
          (this.settings = Object(s.extend)(this.settings || {}, {
            width: null,
            height: null,
            ignoreClass: "",
            manager: "default",
            view: "iframe",
            flow: null,
            layout: null,
            spread: null,
            minSpreadWidth: 800,
            stylesheet: null,
            resizeOnOrientationChange: !0,
            script: null,
            snap: !1,
            defaultDirection: "ltr",
            allowScriptedContent: !1,
            allowPopups: !1,
          })),
            Object(s.extend)(this.settings, e),
            "object" == typeof this.settings.manager &&
              (this.manager = this.settings.manager),
            (this.book = t),
            (this.hooks = {}),
            (this.hooks.display = new o.a(this)),
            (this.hooks.serialize = new o.a(this)),
            (this.hooks.content = new o.a(this)),
            (this.hooks.unloaded = new o.a(this)),
            (this.hooks.layout = new o.a(this)),
            (this.hooks.render = new o.a(this)),
            (this.hooks.show = new o.a(this)),
            this.hooks.content.register(this.handleLinks.bind(this)),
            this.hooks.content.register(this.passEvents.bind(this)),
            this.hooks.content.register(this.adjustImages.bind(this)),
            this.book.spine.hooks.content.register(
              this.injectIdentifier.bind(this),
            ),
            this.settings.stylesheet &&
              this.book.spine.hooks.content.register(
                this.injectStylesheet.bind(this),
              ),
            this.settings.script &&
              this.book.spine.hooks.content.register(
                this.injectScript.bind(this),
              ),
            (this.themes = new f(this)),
            (this.annotations = new g(this)),
            (this.epubcfi = new a.a()),
            (this.q = new h.a(this)),
            (this.location = void 0),
            this.q.enqueue(this.book.opened),
            (this.starting = new s.defer()),
            (this.started = this.starting.promise),
            this.q.enqueue(this.start);
        }
        setManager(t) {
          this.manager = t;
        }
        requireManager(t) {
          return "string" == typeof t && "default" === t
            ? v.a
            : "string" == typeof t && "continuous" === t
              ? y.a
              : t;
        }
        requireView(t) {
          return "string" == typeof t && "iframe" === t ? m.a : t;
        }
        start() {
          switch (
            (this.settings.layout ||
              ("pre-paginated" !== this.book.package.metadata.layout &&
                "true" !== this.book.displayOptions.fixedLayout) ||
              (this.settings.layout = "pre-paginated"),
            this.book.package.metadata.spread)
          ) {
            case "none":
              this.settings.spread = "none";
              break;
            case "both":
              this.settings.spread = !0;
          }
          this.manager ||
            ((this.ViewManager = this.requireManager(this.settings.manager)),
            (this.View = this.requireView(this.settings.view)),
            (this.manager = new this.ViewManager({
              view: this.View,
              queue: this.q,
              request: this.book.load.bind(this.book),
              settings: this.settings,
            }))),
            this.direction(
              this.book.package.metadata.direction ||
                this.settings.defaultDirection,
            ),
            (this.settings.globalLayoutProperties =
              this.determineLayoutProperties(this.book.package.metadata)),
            this.flow(this.settings.globalLayoutProperties.flow),
            this.layout(this.settings.globalLayoutProperties),
            this.manager.on(l.c.MANAGERS.ADDED, this.afterDisplayed.bind(this)),
            this.manager.on(l.c.MANAGERS.REMOVED, this.afterRemoved.bind(this)),
            this.manager.on(l.c.MANAGERS.RESIZED, this.onResized.bind(this)),
            this.manager.on(
              l.c.MANAGERS.ORIENTATION_CHANGE,
              this.onOrientationChange.bind(this),
            ),
            this.manager.on(
              l.c.MANAGERS.SCROLLED,
              this.reportLocation.bind(this),
            ),
            this.emit(l.c.RENDITION.STARTED),
            this.starting.resolve();
        }
        attachTo(t) {
          return this.q.enqueue(
            function () {
              this.manager.render(t, {
                width: this.settings.width,
                height: this.settings.height,
              }),
                this.emit(l.c.RENDITION.ATTACHED);
            }.bind(this),
          );
        }
        display(t) {
          return (
            this.displaying && this.displaying.resolve(),
            this.q.enqueue(this._display, t)
          );
        }
        _display(t) {
          if (this.book) {
            this.epubcfi.isCfiString(t);
            var e,
              i = new s.defer(),
              n = i.promise;
            return (
              (this.displaying = i),
              this.book.locations.length() &&
                Object(s.isFloat)(t) &&
                (t = this.book.locations.cfiFromPercentage(parseFloat(t))),
              (e = this.book.spine.get(t))
                ? (this.manager.display(e, t).then(
                    () => {
                      i.resolve(e),
                        (this.displaying = void 0),
                        this.emit(l.c.RENDITION.DISPLAYED, e),
                        this.reportLocation();
                    },
                    (t) => {
                      this.emit(l.c.RENDITION.DISPLAY_ERROR, t);
                    },
                  ),
                  n)
                : (i.reject(new Error("No Section Found")), n)
            );
          }
        }
        afterDisplayed(t) {
          t.on(l.c.VIEWS.MARK_CLICKED, (e, i) =>
            this.triggerMarkEvent(e, i, t.contents),
          ),
            this.hooks.render.trigger(t, this).then(() => {
              t.contents
                ? this.hooks.content.trigger(t.contents, this).then(() => {
                    this.emit(l.c.RENDITION.RENDERED, t.section, t);
                  })
                : this.emit(l.c.RENDITION.RENDERED, t.section, t);
            });
        }
        afterRemoved(t) {
          this.hooks.unloaded.trigger(t, this).then(() => {
            this.emit(l.c.RENDITION.REMOVED, t.section, t);
          });
        }
        onResized(t, e) {
          this.emit(
            l.c.RENDITION.RESIZED,
            { width: t.width, height: t.height },
            e,
          ),
            this.location &&
              this.location.start &&
              this.display(e || this.location.start.cfi);
        }
        onOrientationChange(t) {
          this.emit(l.c.RENDITION.ORIENTATION_CHANGE, t);
        }
        moveTo(t) {
          this.manager.moveTo(t);
        }
        resize(t, e, i) {
          t && (this.settings.width = t),
            e && (this.settings.height = e),
            this.manager.resize(t, e, i);
        }
        clear() {
          this.manager.clear();
        }
        next() {
          return this.q
            .enqueue(this.manager.next.bind(this.manager))
            .then(this.reportLocation.bind(this));
        }
        prev() {
          return this.q
            .enqueue(this.manager.prev.bind(this.manager))
            .then(this.reportLocation.bind(this));
        }
        determineLayoutProperties(t) {
          var e = this.settings.layout || t.layout || "reflowable",
            i = this.settings.spread || t.spread || "auto",
            n = this.settings.orientation || t.orientation || "auto",
            r = this.settings.flow || t.flow || "auto",
            s = t.viewport || "",
            o = this.settings.minSpreadWidth || t.minSpreadWidth || 800,
            a = this.settings.direction || t.direction || "ltr";
          return (
            (0 === this.settings.width || this.settings.width > 0) &&
              (0 === this.settings.height || this.settings.height),
            {
              layout: e,
              spread: i,
              orientation: n,
              flow: r,
              viewport: s,
              minSpreadWidth: o,
              direction: a,
            }
          );
        }
        flow(t) {
          var e = t;
          ("scrolled" !== t &&
            "scrolled-doc" !== t &&
            "scrolled-continuous" !== t) ||
            (e = "scrolled"),
            ("auto" !== t && "paginated" !== t) || (e = "paginated"),
            (this.settings.flow = t),
            this._layout && this._layout.flow(e),
            this.manager &&
              this._layout &&
              this.manager.applyLayout(this._layout),
            this.manager && this.manager.updateFlow(e),
            this.manager &&
              this.manager.isRendered() &&
              this.location &&
              (this.manager.clear(), this.display(this.location.start.cfi));
        }
        layout(t) {
          return (
            t &&
              ((this._layout = new u(t)),
              this._layout.spread(t.spread, this.settings.minSpreadWidth),
              this._layout.on(l.c.LAYOUT.UPDATED, (t, e) => {
                this.emit(l.c.RENDITION.LAYOUT, t, e);
              })),
            this.manager &&
              this._layout &&
              this.manager.applyLayout(this._layout),
            this._layout
          );
        }
        spread(t, e) {
          (this.settings.spread = t),
            e && (this.settings.minSpreadWidth = e),
            this._layout && this._layout.spread(t, e),
            this.manager &&
              this.manager.isRendered() &&
              this.manager.updateLayout();
        }
        direction(t) {
          (this.settings.direction = t || "ltr"),
            this.manager && this.manager.direction(this.settings.direction),
            this.manager &&
              this.manager.isRendered() &&
              this.location &&
              (this.manager.clear(), this.display(this.location.start.cfi));
        }
        reportLocation() {
          return this.q.enqueue(
            function () {
              requestAnimationFrame(
                function () {
                  var t = this.manager.currentLocation();
                  if (t && t.then && "function" == typeof t.then)
                    t.then(
                      function (t) {
                        let e = this.located(t);
                        e &&
                          e.start &&
                          e.end &&
                          ((this.location = e),
                          this.emit(l.c.RENDITION.LOCATION_CHANGED, {
                            index: this.location.start.index,
                            href: this.location.start.href,
                            start: this.location.start.cfi,
                            end: this.location.end.cfi,
                            percentage: this.location.start.percentage,
                          }),
                          this.emit(l.c.RENDITION.RELOCATED, this.location));
                      }.bind(this),
                    );
                  else if (t) {
                    let e = this.located(t);
                    if (!e || !e.start || !e.end) return;
                    (this.location = e),
                      this.emit(l.c.RENDITION.LOCATION_CHANGED, {
                        index: this.location.start.index,
                        href: this.location.start.href,
                        start: this.location.start.cfi,
                        end: this.location.end.cfi,
                        percentage: this.location.start.percentage,
                      }),
                      this.emit(l.c.RENDITION.RELOCATED, this.location);
                  }
                }.bind(this),
              );
            }.bind(this),
          );
        }
        currentLocation() {
          var t = this.manager.currentLocation();
          if (t && t.then && "function" == typeof t.then)
            t.then(
              function (t) {
                return this.located(t);
              }.bind(this),
            );
          else if (t) {
            return this.located(t);
          }
        }
        located(t) {
          if (!t.length) return {};
          let e = t[0],
            i = t[t.length - 1],
            n = {
              start: {
                index: e.index,
                href: e.href,
                cfi: e.mapping.start,
                displayed: { page: e.pages[0] || 1, total: e.totalPages },
              },
              end: {
                index: i.index,
                href: i.href,
                cfi: i.mapping.end,
                displayed: {
                  page: i.pages[i.pages.length - 1] || 1,
                  total: i.totalPages,
                },
              },
            },
            r = this.book.locations.locationFromCfi(e.mapping.start),
            s = this.book.locations.locationFromCfi(i.mapping.end);
          null != r &&
            ((n.start.location = r),
            (n.start.percentage =
              this.book.locations.percentageFromLocation(r))),
            null != s &&
              ((n.end.location = s),
              (n.end.percentage =
                this.book.locations.percentageFromLocation(s)));
          let o = this.book.pageList.pageFromCfi(e.mapping.start),
            a = this.book.pageList.pageFromCfi(i.mapping.end);
          return (
            -1 != o && (n.start.page = o),
            -1 != a && (n.end.page = a),
            i.index === this.book.spine.last().index &&
              n.end.displayed.page >= n.end.displayed.total &&
              (n.atEnd = !0),
            e.index === this.book.spine.first().index &&
              1 === n.start.displayed.page &&
              (n.atStart = !0),
            n
          );
        }
        destroy() {
          this.manager && this.manager.destroy(), (this.book = void 0);
        }
        passEvents(t) {
          l.a.forEach((e) => {
            t.on(e, (e) => this.triggerViewEvent(e, t));
          }),
            t.on(l.c.CONTENTS.SELECTED, (e) => this.triggerSelectedEvent(e, t));
        }
        triggerViewEvent(t, e) {
          this.emit(t.type, t, e);
        }
        triggerSelectedEvent(t, e) {
          this.emit(l.c.RENDITION.SELECTED, t, e);
        }
        triggerMarkEvent(t, e, i) {
          this.emit(l.c.RENDITION.MARK_CLICKED, t, e, i);
        }
        getRange(t, e) {
          var i = new a.a(t),
            n = this.manager.visible().filter(function (t) {
              if (i.spinePos === t.index) return !0;
            });
          if (n.length) return n[0].contents.range(i, e);
        }
        adjustImages(t) {
          if ("pre-paginated" === this._layout.name)
            return new Promise(function (t) {
              t();
            });
          let e = t.window.getComputedStyle(t.content, null),
            i =
              0.95 *
              (t.content.offsetHeight -
                (parseFloat(e.paddingTop) + parseFloat(e.paddingBottom))),
            n = parseFloat(e.paddingLeft) + parseFloat(e.paddingRight);
          return (
            t.addStylesheetRules({
              img: {
                "max-width":
                  (this._layout.columnWidth
                    ? this._layout.columnWidth - n + "px"
                    : "100%") + "!important",
                "max-height": i + "px!important",
                "object-fit": "contain",
                "page-break-inside": "avoid",
                "break-inside": "avoid",
                "box-sizing": "border-box",
              },
              svg: {
                "max-width":
                  (this._layout.columnWidth
                    ? this._layout.columnWidth - n + "px"
                    : "100%") + "!important",
                "max-height": i + "px!important",
                "page-break-inside": "avoid",
                "break-inside": "avoid",
              },
            }),
            new Promise(function (t, e) {
              setTimeout(function () {
                t();
              }, 1);
            })
          );
        }
        getContents() {
          return this.manager ? this.manager.getContents() : [];
        }
        views() {
          return (this.manager ? this.manager.views : void 0) || [];
        }
        handleLinks(t) {
          t &&
            t.on(l.c.CONTENTS.LINK_CLICKED, (t) => {
              let e = this.book.path.relative(t);
              this.display(e);
            });
        }
        injectStylesheet(t, e) {
          let i = t.createElement("link");
          i.setAttribute("type", "text/css"),
            i.setAttribute("rel", "stylesheet"),
            i.setAttribute("href", this.settings.stylesheet),
            t.getElementsByTagName("head")[0].appendChild(i);
        }
        injectScript(t, e) {
          let i = t.createElement("script");
          i.setAttribute("type", "text/javascript"),
            i.setAttribute("src", this.settings.script),
            (i.textContent = " "),
            t.getElementsByTagName("head")[0].appendChild(i);
        }
        injectIdentifier(t, e) {
          let i = this.book.packaging.metadata.identifier,
            n = t.createElement("meta");
          n.setAttribute("name", "dc.relation.ispartof"),
            i && n.setAttribute("content", i),
            t.getElementsByTagName("head")[0].appendChild(n);
        }
      }
      r()(b.prototype);
      e.a = b;
    },
    function (t, e, i) {
      "use strict";
      var n = i(85)();
      t.exports = function (t) {
        return t !== n && null !== t;
      };
    },
    function (t, e, i) {
      var n = i(9),
        r = i(51).f,
        s = i(20),
        o = i(38),
        a = i(35),
        h = i(106),
        l = i(113);
      t.exports = function (t, e) {
        var i,
          c,
          u,
          d,
          f,
          p = t.target,
          g = t.global,
          m = t.stat;
        if ((i = g ? n : m ? n[p] || a(p, {}) : (n[p] || {}).prototype))
          for (c in e) {
            if (
              ((d = e[c]),
              (u = t.noTargetGet ? (f = r(i, c)) && f.value : i[c]),
              !l(g ? c : p + (m ? "." : "#") + c, t.forced) && void 0 !== u)
            ) {
              if (typeof d == typeof u) continue;
              h(d, u);
            }
            (t.sham || (u && u.sham)) && s(d, "sham", !0), o(i, c, d, t);
          }
      };
    },
    function (t, e) {
      t.exports = function (t, e) {
        return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: e,
        };
      };
    },
    function (t, e) {
      t.exports = !1;
    },
    function (t, e, i) {
      var n = i(9),
        r = i(35),
        s = n["__core-js_shared__"] || r("__core-js_shared__", {});
      t.exports = s;
    },
    function (t, e, i) {
      var n = i(9);
      t.exports = function (t, e) {
        try {
          Object.defineProperty(n, t, {
            value: e,
            configurable: !0,
            writable: !0,
          });
        } catch (i) {
          n[t] = e;
        }
        return e;
      };
    },
    function (t, e, i) {
      var n = i(54);
      t.exports = function (t) {
        return Object(n(t));
      };
    },
    function (t, e, i) {
      var n = i(9),
        r = i(18),
        s = n.document,
        o = r(s) && r(s.createElement);
      t.exports = function (t) {
        return o ? s.createElement(t) : {};
      };
    },
    function (t, e, i) {
      var n = i(9),
        r = i(7),
        s = i(12),
        o = i(20),
        a = i(35),
        h = i(62),
        l = i(63),
        c = i(64).CONFIGURABLE,
        u = l.get,
        d = l.enforce,
        f = String(String).split("String");
      (t.exports = function (t, e, i, h) {
        var l,
          u = !!h && !!h.unsafe,
          p = !!h && !!h.enumerable,
          g = !!h && !!h.noTargetGet,
          m = h && void 0 !== h.name ? h.name : e;
        r(i) &&
          ("Symbol(" === String(m).slice(0, 7) &&
            (m = "[" + String(m).replace(/^Symbol\\(([^)]*)\\)/, "$1") + "]"),
          (!s(i, "name") || (c && i.name !== m)) && o(i, "name", m),
          (l = d(i)).source ||
            (l.source = f.join("string" == typeof m ? m : ""))),
          t !== n
            ? (u ? !g && t[e] && (p = !0) : delete t[e],
              p ? (t[e] = i) : o(t, e, i))
            : p
              ? (t[e] = i)
              : a(e, i);
      })(Function.prototype, "toString", function () {
        return (r(this) && u(this).source) || h(this);
      });
    },
    function (t, e, i) {
      var n = i(59),
        r = i(60),
        s = n("keys");
      t.exports = function (t) {
        return s[t] || (s[t] = r(t));
      };
    },
    function (t, e) {
      t.exports = {};
    },
    function (t, e) {
      t.exports = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf",
      ];
    },
    function (t, e, i) {
      var n,
        r = i(22),
        s = i(118),
        o = i(41),
        a = i(40),
        h = i(119),
        l = i(37),
        c = i(39),
        u = c("IE_PROTO"),
        d = function () {},
        f = function (t) {
          return "<script>" + t + "</script>";
        },
        p = function (t) {
          t.write(f("")), t.close();
          var e = t.parentWindow.Object;
          return (t = null), e;
        },
        g = function () {
          try {
            n = new ActiveXObject("htmlfile");
          } catch (t) {}
          var t, e;
          g =
            "undefined" != typeof document
              ? document.domain && n
                ? p(n)
                : (((e = l("iframe")).style.display = "none"),
                  h.appendChild(e),
                  (e.src = String("javascript:")),
                  (t = e.contentWindow.document).open(),
                  t.write(f("document.F=Object")),
                  t.close(),
                  t.F)
              : p(n);
          for (var i = o.length; i--; ) delete g.prototype[o[i]];
          return g();
        };
      (a[u] = !0),
        (t.exports =
          Object.create ||
          function (t, e) {
            var i;
            return (
              null !== t
                ? ((d.prototype = r(t)),
                  (i = new d()),
                  (d.prototype = null),
                  (i[u] = t))
                : (i = g()),
              void 0 === e ? i : s(i, e)
            );
          });
    },
    function (t, e) {
      t.exports = {};
    },
    function (t, e) {
      t.exports = function (t) {
        var e = typeof t;
        return null != t && ("object" == e || "function" == e);
      };
    },
    function (t, e, i) {
      "use strict";
      var n = i(3),
        r = i.n(n),
        s = i(0),
        o = i(2),
        a = i(23),
        h = i(1),
        l = i(24);
      class c {
        constructor(t, e) {
          (this.settings = Object(s.extend)(
            {
              ignoreClass: "",
              axis: void 0,
              direction: void 0,
              width: 0,
              height: 0,
              layout: void 0,
              globalLayoutProperties: {},
              method: void 0,
              forceRight: !1,
              allowScriptedContent: !1,
              allowPopups: !1,
            },
            e || {},
          )),
            (this.id = "epubjs-view-" + Object(s.uuid)()),
            (this.section = t),
            (this.index = t.index),
            (this.element = this.container(this.settings.axis)),
            (this.added = !1),
            (this.displayed = !1),
            (this.rendered = !1),
            (this.fixedWidth = 0),
            (this.fixedHeight = 0),
            (this.epubcfi = new o.a()),
            (this.layout = this.settings.layout),
            (this.pane = void 0),
            (this.highlights = {}),
            (this.underlines = {}),
            (this.marks = {});
        }
        container(t) {
          var e = document.createElement("div");
          return (
            e.classList.add("epub-view"),
            (e.style.height = "0px"),
            (e.style.width = "0px"),
            (e.style.overflow = "hidden"),
            (e.style.position = "relative"),
            (e.style.display = "block"),
            (e.style.flex = t && "horizontal" == t ? "none" : "initial"),
            e
          );
        }
        create() {
          return (
            this.iframe ||
              (this.element || (this.element = this.createContainer()),
              (this.iframe = document.createElement("iframe")),
              (this.iframe.id = this.id),
              (this.iframe.scrolling = "no"),
              (this.iframe.style.overflow = "hidden"),
              (this.iframe.seamless = "seamless"),
              (this.iframe.style.border = "none"),
              (this.iframe.sandbox = "allow-same-origin"),
              this.settings.allowScriptedContent &&
                (this.iframe.sandbox += " allow-scripts"),
              this.settings.allowPopups &&
                (this.iframe.sandbox += " allow-popups"),
              this.iframe.setAttribute("enable-annotation", "true"),
              (this.resizing = !0),
              (this.element.style.visibility = "hidden"),
              (this.iframe.style.visibility = "hidden"),
              (this.iframe.style.width = "0"),
              (this.iframe.style.height = "0"),
              (this._width = 0),
              (this._height = 0),
              this.element.setAttribute("ref", this.index),
              (this.added = !0),
              (this.elementBounds = Object(s.bounds)(this.element)),
              "srcdoc" in this.iframe
                ? (this.supportsSrcdoc = !0)
                : (this.supportsSrcdoc = !1),
              this.settings.method ||
                (this.settings.method = this.supportsSrcdoc
                  ? "srcdoc"
                  : "write")),
            this.iframe
          );
        }
        render(t, e) {
          return (
            this.create(),
            this.size(),
            this.sectionRender || (this.sectionRender = this.section.render(t)),
            this.sectionRender
              .then(
                function (t) {
                  return this.load(t);
                }.bind(this),
              )
              .then(
                function () {
                  let t,
                    e = this.contents.writingMode();
                  return (
                    (t =
                      "scrolled" === this.settings.flow
                        ? 0 === e.indexOf("vertical")
                          ? "horizontal"
                          : "vertical"
                        : 0 === e.indexOf("vertical")
                          ? "vertical"
                          : "horizontal"),
                    0 === e.indexOf("vertical") &&
                      "paginated" === this.settings.flow &&
                      (this.layout.delta = this.layout.height),
                    this.setAxis(t),
                    this.emit(h.c.VIEWS.AXIS, t),
                    this.setWritingMode(e),
                    this.emit(h.c.VIEWS.WRITING_MODE, e),
                    this.layout.format(this.contents, this.section, this.axis),
                    this.addListeners(),
                    new Promise((t, e) => {
                      this.expand(),
                        this.settings.forceRight &&
                          (this.element.style.marginLeft = this.width() + "px"),
                        t();
                    })
                  );
                }.bind(this),
                function (t) {
                  return (
                    this.emit(h.c.VIEWS.LOAD_ERROR, t),
                    new Promise((e, i) => {
                      i(t);
                    })
                  );
                }.bind(this),
              )
              .then(
                function () {
                  this.emit(h.c.VIEWS.RENDERED, this.section);
                }.bind(this),
              )
          );
        }
        reset() {
          this.iframe &&
            ((this.iframe.style.width = "0"),
            (this.iframe.style.height = "0"),
            (this._width = 0),
            (this._height = 0),
            (this._textWidth = void 0),
            (this._contentWidth = void 0),
            (this._textHeight = void 0),
            (this._contentHeight = void 0)),
            (this._needsReframe = !0);
        }
        size(t, e) {
          var i = t || this.settings.width,
            n = e || this.settings.height;
          "pre-paginated" === this.layout.name
            ? this.lock("both", i, n)
            : "horizontal" === this.settings.axis
              ? this.lock("height", i, n)
              : this.lock("width", i, n),
            (this.settings.width = i),
            (this.settings.height = n);
        }
        lock(t, e, i) {
          var n,
            r = Object(s.borders)(this.element);
          (n = this.iframe
            ? Object(s.borders)(this.iframe)
            : { width: 0, height: 0 }),
            "width" == t &&
              Object(s.isNumber)(e) &&
              (this.lockedWidth = e - r.width - n.width),
            "height" == t &&
              Object(s.isNumber)(i) &&
              (this.lockedHeight = i - r.height - n.height),
            "both" === t &&
              Object(s.isNumber)(e) &&
              Object(s.isNumber)(i) &&
              ((this.lockedWidth = e - r.width - n.width),
              (this.lockedHeight = i - r.height - n.height)),
            this.displayed && this.iframe && this.expand();
        }
        expand(t) {
          var e,
            i = this.lockedWidth,
            n = this.lockedHeight;
          this.iframe &&
            !this._expanding &&
            ((this._expanding = !0),
            "pre-paginated" === this.layout.name
              ? ((i = this.layout.columnWidth), (n = this.layout.height))
              : "horizontal" === this.settings.axis
                ? ((i = this.contents.textWidth()) % this.layout.pageWidth >
                    0 &&
                    (i =
                      Math.ceil(i / this.layout.pageWidth) *
                      this.layout.pageWidth),
                  this.settings.forceEvenPages &&
                    ((e = i / this.layout.pageWidth),
                    this.layout.divisor > 1 &&
                      "reflowable" === this.layout.name &&
                      e % 2 > 0 &&
                      (i += this.layout.pageWidth)))
                : "vertical" === this.settings.axis &&
                  ((n = this.contents.textHeight()),
                  "paginated" === this.settings.flow &&
                    n % this.layout.height > 0 &&
                    (n =
                      Math.ceil(n / this.layout.height) * this.layout.height)),
            (this._needsReframe || i != this._width || n != this._height) &&
              this.reframe(i, n),
            (this._expanding = !1));
        }
        reframe(t, e) {
          var i;
          Object(s.isNumber)(t) &&
            ((this.element.style.width = t + "px"),
            (this.iframe.style.width = t + "px"),
            (this._width = t)),
            Object(s.isNumber)(e) &&
              ((this.element.style.height = e + "px"),
              (this.iframe.style.height = e + "px"),
              (this._height = e)),
            (i = {
              width: t,
              height: e,
              widthDelta: this.prevBounds ? t - this.prevBounds.width : t,
              heightDelta: this.prevBounds ? e - this.prevBounds.height : e,
            }),
            this.pane && this.pane.render(),
            requestAnimationFrame(() => {
              let t;
              for (let e in this.marks)
                this.marks.hasOwnProperty(e) &&
                  ((t = this.marks[e]), this.placeMark(t.element, t.range));
            }),
            this.onResize(this, i),
            this.emit(h.c.VIEWS.RESIZED, i),
            (this.prevBounds = i),
            (this.elementBounds = Object(s.bounds)(this.element));
        }
        load(t) {
          var e = new s.defer(),
            i = e.promise;
          if (!this.iframe)
            return e.reject(new Error("No Iframe Available")), i;
          if (
            ((this.iframe.onload = function (t) {
              this.onLoad(t, e);
            }.bind(this)),
            "blobUrl" === this.settings.method)
          )
            (this.blobUrl = Object(s.createBlobUrl)(
              t,
              "application/xhtml+xml",
            )),
              (this.iframe.src = this.blobUrl),
              this.element.appendChild(this.iframe);
          else if ("srcdoc" === this.settings.method)
            (this.iframe.srcdoc = t), this.element.appendChild(this.iframe);
          else {
            if (
              (this.element.appendChild(this.iframe),
              (this.document = this.iframe.contentDocument),
              !this.document)
            )
              return e.reject(new Error("No Document Available")), i;
            if (
              (this.iframe.contentDocument.open(),
              window.MSApp && MSApp.execUnsafeLocalFunction)
            ) {
              var n = this;
              MSApp.execUnsafeLocalFunction(function () {
                n.iframe.contentDocument.write(t);
              });
            } else this.iframe.contentDocument.write(t);
            this.iframe.contentDocument.close();
          }
          return i;
        }
        onLoad(t, e) {
          (this.window = this.iframe.contentWindow),
            (this.document = this.iframe.contentDocument),
            (this.contents = new a.a(
              this.document,
              this.document.body,
              this.section.cfiBase,
              this.section.index,
            )),
            (this.rendering = !1);
          var i = this.document.querySelector("link[rel='canonical']");
          i
            ? i.setAttribute("href", this.section.canonical)
            : ((i = this.document.createElement("link")).setAttribute(
                "rel",
                "canonical",
              ),
              i.setAttribute("href", this.section.canonical),
              this.document.querySelector("head").appendChild(i)),
            this.contents.on(h.c.CONTENTS.EXPAND, () => {
              this.displayed &&
                this.iframe &&
                (this.expand(),
                this.contents && this.layout.format(this.contents));
            }),
            this.contents.on(h.c.CONTENTS.RESIZE, (t) => {
              this.displayed &&
                this.iframe &&
                (this.expand(),
                this.contents && this.layout.format(this.contents));
            }),
            e.resolve(this.contents);
        }
        setLayout(t) {
          (this.layout = t),
            this.contents && (this.layout.format(this.contents), this.expand());
        }
        setAxis(t) {
          (this.settings.axis = t),
            (this.element.style.flex = "horizontal" == t ? "none" : "initial"),
            this.size();
        }
        setWritingMode(t) {
          this.writingMode = t;
        }
        addListeners() {}
        removeListeners(t) {}
        display(t) {
          var e = new s.defer();
          return (
            this.displayed
              ? e.resolve(this)
              : this.render(t).then(
                  function () {
                    this.emit(h.c.VIEWS.DISPLAYED, this),
                      this.onDisplayed(this),
                      (this.displayed = !0),
                      e.resolve(this);
                  }.bind(this),
                  function (t) {
                    e.reject(t, this);
                  },
                ),
            e.promise
          );
        }
        show() {
          (this.element.style.visibility = "visible"),
            this.iframe &&
              ((this.iframe.style.visibility = "visible"),
              (this.iframe.style.transform = "translateZ(0)"),
              this.iframe.offsetWidth,
              (this.iframe.style.transform = null)),
            this.emit(h.c.VIEWS.SHOWN, this);
        }
        hide() {
          (this.element.style.visibility = "hidden"),
            (this.iframe.style.visibility = "hidden"),
            (this.stopExpanding = !0),
            this.emit(h.c.VIEWS.HIDDEN, this);
        }
        offset() {
          return { top: this.element.offsetTop, left: this.element.offsetLeft };
        }
        width() {
          return this._width;
        }
        height() {
          return this._height;
        }
        position() {
          return this.element.getBoundingClientRect();
        }
        locationOf(t) {
          this.iframe.getBoundingClientRect();
          var e = this.contents.locationOf(t, this.settings.ignoreClass);
          return { left: e.left, top: e.top };
        }
        onDisplayed(t) {}
        onResize(t, e) {}
        bounds(t) {
          return (
            (!t && this.elementBounds) ||
              (this.elementBounds = Object(s.bounds)(this.element)),
            this.elementBounds
          );
        }
        highlight(t, e = {}, i, n = "epubjs-hl", r = {}, s = "") {
          if (!this.contents) return;
          const o = Object.assign(
            {
              fill: "yellow",
              "fill-opacity": "0.3",
              "mix-blend-mode": "multiply",
            },
            r,
          );
          let a = this.contents.range(t),
            c = () => {
              this.emit(h.c.VIEWS.MARK_CLICKED, t, e);
            };
          (e.epubcfi = t),
            this.pane || (this.pane = new l.Pane(this.iframe, this.element));
          let u = new l.Highlight(a, n, e, o),
            d = this.pane.addMark(u);
          return (
            (this.highlights[t] = {
              mark: d,
              element: d.element,
              listeners: [c, i],
              cfiRangeText: s,
            }),
            d.element.setAttribute("ref", n),
            d.element.addEventListener("click", c),
            i && d.element.addEventListener("click", i),
            d
          );
        }
        underline(t, e = {}, i, n = "epubjs-ul", r = {}, s = "") {
          if (!this.contents) return;
          const o = Object.assign(
            {
              stroke: "black",
              "stroke-opacity": "0.3",
              "mix-blend-mode": "multiply",
            },
            r,
          );
          let a = this.contents.range(t),
            c = () => {
              this.emit(h.c.VIEWS.MARK_CLICKED, t, e);
            };
          (e.epubcfi = t),
            this.pane || (this.pane = new l.Pane(this.iframe, this.element));
          let u = new l.Underline(a, n, e, o),
            d = this.pane.addMark(u);
          return (
            (this.underlines[t] = {
              mark: d,
              element: d.element,
              listeners: [c, i],
              cfiRangeText: s,
            }),
            d.element.setAttribute("ref", n),
            d.element.addEventListener("click", c),
            i && d.element.addEventListener("click", i),
            d
          );
        }
        mark(t, e = {}, i, n = "epubjs-mk", r = {}, s = "") {
          if (!this.contents) return;
          if (t in this.marks) {
            return this.marks[t];
          }
          let o = this.contents.range(t);
          if (!o) return;
          let a = o.commonAncestorContainer,
            l = 1 === a.nodeType ? a : a.parentNode,
            c = (i) => {
              this.emit(h.c.VIEWS.MARK_CLICKED, t, e);
            };
          o.collapsed && 1 === a.nodeType
            ? ((o = new Range()), o.selectNodeContents(a))
            : o.collapsed && ((o = new Range()), o.selectNodeContents(l));
          let u = this.document.createElement("a");
          return (
            u.setAttribute("ref", n),
            (u.style = r),
            (u.style.position = "absolute"),
            (u.dataset.epubcfi = t),
            e &&
              Object.keys(e).forEach((t) => {
                u.dataset[t] = e[t];
              }),
            i && u.addEventListener("click", i),
            u.addEventListener("click", c),
            this.placeMark(u, o),
            this.element.appendChild(u),
            (this.marks[t] = {
              element: u,
              range: o,
              listeners: [c, i],
              cfiRangeText: s,
            }),
            l
          );
        }
        placeMark(t, e) {
          let i, n, r;
          if (
            "pre-paginated" === this.layout.name ||
            "horizontal" !== this.settings.axis
          ) {
            let t = e.getBoundingClientRect();
            (i = t.top), (n = t.right);
          } else {
            let t,
              o = e.getClientRects();
            for (var s = 0; s != o.length; s++)
              (t = o[s]),
                (!r || t.left < r) &&
                  ((r = t.left),
                  (n =
                    Math.ceil(r / this.layout.props.pageWidth) *
                      this.layout.props.pageWidth -
                    this.layout.gap / 2),
                  (i = t.top));
          }
          (t.style.top = i + "px"), (t.style.left = n + "px");
        }
        unhighlight(t) {
          let e;
          t in this.highlights &&
            ((e = this.highlights[t]),
            this.pane.removeMark(e.mark),
            e.listeners.forEach((t) => {
              t &&
                (e.element.removeEventListener("click", t),
                e.element.removeEventListener("touchstart", t));
            }),
            delete this.highlights[t]);
        }
        ununderline(t) {
          let e;
          t in this.underlines &&
            ((e = this.underlines[t]),
            this.pane.removeMark(e.mark),
            e.listeners.forEach((t) => {
              t &&
                (e.element.removeEventListener("click", t),
                e.element.removeEventListener("touchstart", t));
            }),
            delete this.underlines[t]);
        }
        unmark(t) {
          let e;
          t in this.marks &&
            ((e = this.marks[t]),
            this.element.removeChild(e.element),
            e.listeners.forEach((t) => {
              t &&
                (e.element.removeEventListener("click", t),
                e.element.removeEventListener("touchstart", t));
            }),
            delete this.marks[t]);
        }
        destroy() {
          for (let t in this.highlights) this.unhighlight(t);
          for (let t in this.underlines) this.ununderline(t);
          for (let t in this.marks) this.unmark(t);
          this.blobUrl && Object(s.revokeBlobUrl)(this.blobUrl),
            this.displayed &&
              ((this.displayed = !1),
              this.removeListeners(),
              this.contents.destroy(),
              (this.stopExpanding = !0),
              this.element.removeChild(this.iframe),
              this.pane && (this.pane.element.remove(), (this.pane = void 0)),
              (this.iframe = void 0),
              (this.contents = void 0),
              (this._textWidth = null),
              (this._textHeight = null),
              (this._width = null),
              (this._height = null));
        }
      }
      r()(c.prototype), (e.a = c);
    },
    function (t, e, i) {
      var n = i(44),
        r = i(129),
        s = i(131),
        o = Math.max,
        a = Math.min;
      t.exports = function (t, e, i) {
        var h,
          l,
          c,
          u,
          d,
          f,
          p = 0,
          g = !1,
          m = !1,
          v = !0;
        if ("function" != typeof t) throw new TypeError("Expected a function");
        function y(e) {
          var i = h,
            n = l;
          return (h = l = void 0), (p = e), (u = t.apply(n, i));
        }
        function b(t) {
          return (p = t), (d = setTimeout(x, e)), g ? y(t) : u;
        }
        function w(t) {
          var i = t - f;
          return void 0 === f || i >= e || i < 0 || (m && t - p >= c);
        }
        function x() {
          var t = r();
          if (w(t)) return E(t);
          d = setTimeout(
            x,
            (function (t) {
              var i = e - (t - f);
              return m ? a(i, c - (t - p)) : i;
            })(t),
          );
        }
        function E(t) {
          return (d = void 0), v && h ? y(t) : ((h = l = void 0), u);
        }
        function S() {
          var t = r(),
            i = w(t);
          if (((h = arguments), (l = this), (f = t), i)) {
            if (void 0 === d) return b(f);
            if (m) return clearTimeout(d), (d = setTimeout(x, e)), y(f);
          }
          return void 0 === d && (d = setTimeout(x, e)), u;
        }
        return (
          (e = s(e) || 0),
          n(i) &&
            ((g = !!i.leading),
            (c = (m = "maxWait" in i) ? o(s(i.maxWait) || 0, e) : c),
            (v = "trailing" in i ? !!i.trailing : v)),
          (S.cancel = function () {
            void 0 !== d && clearTimeout(d), (p = 0), (h = f = l = d = void 0);
          }),
          (S.flush = function () {
            return void 0 === d ? u : E(r());
          }),
          S
        );
      };
    },
    function (t, e, i) {
      "use strict";
      var n = i(0),
        r = i(16),
        s = i(1),
        o = i(3),
        a = i.n(o);
      const h = Math.PI / 2,
        l = {
          easeOutSine: function (t) {
            return Math.sin(t * h);
          },
          easeInOutSine: function (t) {
            return -0.5 * (Math.cos(Math.PI * t) - 1);
          },
          easeInOutQuint: function (t) {
            return (t /= 0.5) < 1
              ? 0.5 * Math.pow(t, 5)
              : 0.5 * (Math.pow(t - 2, 5) + 2);
          },
          easeInCubic: function (t) {
            return Math.pow(t, 3);
          },
        };
      class c {
        constructor(t, e) {
          (this.settings = Object(n.extend)(
            {
              duration: 80,
              minVelocity: 0.2,
              minDistance: 10,
              easing: l.easeInCubic,
            },
            e || {},
          )),
            (this.supportsTouch = this.supportsTouch()),
            this.supportsTouch && this.setup(t);
        }
        setup(t) {
          (this.manager = t),
            (this.layout = this.manager.layout),
            (this.fullsize = this.manager.settings.fullsize),
            this.fullsize
              ? ((this.element = this.manager.stage.element),
                (this.scroller = window),
                this.disableScroll())
              : ((this.element = this.manager.stage.container),
                (this.scroller = this.element),
                (this.element.style.WebkitOverflowScrolling = "touch")),
            (this.manager.settings.offset = this.layout.width),
            (this.manager.settings.afterScrolledTimeout =
              2 * this.settings.duration),
            (this.isVertical = "vertical" === this.manager.settings.axis),
            this.manager.isPaginated &&
              !this.isVertical &&
              ((this.touchCanceler = !1),
              (this.resizeCanceler = !1),
              (this.snapping = !1),
              this.scrollLeft,
              this.scrollTop,
              (this.startTouchX = void 0),
              (this.startTouchY = void 0),
              (this.startTime = void 0),
              (this.endTouchX = void 0),
              (this.endTouchY = void 0),
              (this.endTime = void 0),
              this.addListeners());
        }
        supportsTouch() {
          return !!(
            "ontouchstart" in window ||
            (window.DocumentTouch && document instanceof DocumentTouch)
          );
        }
        disableScroll() {
          this.element.style.overflow = "hidden";
        }
        enableScroll() {
          this.element.style.overflow = "";
        }
        addListeners() {
          (this._onResize = this.onResize.bind(this)),
            window.addEventListener("resize", this._onResize),
            (this._onScroll = this.onScroll.bind(this)),
            this.scroller.addEventListener("scroll", this._onScroll),
            (this._onTouchStart = this.onTouchStart.bind(this)),
            this.scroller.addEventListener("touchstart", this._onTouchStart, {
              passive: !0,
            }),
            this.on("touchstart", this._onTouchStart),
            (this._onTouchMove = this.onTouchMove.bind(this)),
            this.scroller.addEventListener("touchmove", this._onTouchMove, {
              passive: !0,
            }),
            this.on("touchmove", this._onTouchMove),
            (this._onTouchEnd = this.onTouchEnd.bind(this)),
            this.scroller.addEventListener("touchend", this._onTouchEnd, {
              passive: !0,
            }),
            this.on("touchend", this._onTouchEnd),
            (this._afterDisplayed = this.afterDisplayed.bind(this)),
            this.manager.on(s.c.MANAGERS.ADDED, this._afterDisplayed);
        }
        removeListeners() {
          window.removeEventListener("resize", this._onResize),
            (this._onResize = void 0),
            this.scroller.removeEventListener("scroll", this._onScroll),
            (this._onScroll = void 0),
            this.scroller.removeEventListener(
              "touchstart",
              this._onTouchStart,
              { passive: !0 },
            ),
            this.off("touchstart", this._onTouchStart),
            (this._onTouchStart = void 0),
            this.scroller.removeEventListener("touchmove", this._onTouchMove, {
              passive: !0,
            }),
            this.off("touchmove", this._onTouchMove),
            (this._onTouchMove = void 0),
            this.scroller.removeEventListener("touchend", this._onTouchEnd, {
              passive: !0,
            }),
            this.off("touchend", this._onTouchEnd),
            (this._onTouchEnd = void 0),
            this.manager.off(s.c.MANAGERS.ADDED, this._afterDisplayed),
            (this._afterDisplayed = void 0);
        }
        afterDisplayed(t) {
          let e = t.contents;
          ["touchstart", "touchmove", "touchend"].forEach((t) => {
            e.on(t, (t) => this.triggerViewEvent(t, e));
          });
        }
        triggerViewEvent(t, e) {
          this.emit(t.type, t, e);
        }
        onScroll(t) {
          (this.scrollLeft = this.fullsize
            ? window.scrollX
            : this.scroller.scrollLeft),
            (this.scrollTop = this.fullsize
              ? window.scrollY
              : this.scroller.scrollTop);
        }
        onResize(t) {
          this.resizeCanceler = !0;
        }
        onTouchStart(t) {
          let { screenX: e, screenY: i } = t.touches[0];
          this.fullsize && this.enableScroll(),
            (this.touchCanceler = !0),
            this.startTouchX ||
              ((this.startTouchX = e),
              (this.startTouchY = i),
              (this.startTime = this.now())),
            (this.endTouchX = e),
            (this.endTouchY = i),
            (this.endTime = this.now());
        }
        onTouchMove(t) {
          let { screenX: e, screenY: i } = t.touches[0],
            n = Math.abs(i - this.endTouchY);
          (this.touchCanceler = !0),
            !this.fullsize &&
              n < 10 &&
              (this.element.scrollLeft -= e - this.endTouchX),
            (this.endTouchX = e),
            (this.endTouchY = i),
            (this.endTime = this.now());
        }
        onTouchEnd(t) {
          this.fullsize && this.disableScroll(), (this.touchCanceler = !1);
          let e = this.wasSwiped();
          0 !== e ? this.snap(e) : this.snap(),
            (this.startTouchX = void 0),
            (this.startTouchY = void 0),
            (this.startTime = void 0),
            (this.endTouchX = void 0),
            (this.endTouchY = void 0),
            (this.endTime = void 0);
        }
        wasSwiped() {
          let t = this.layout.pageWidth * this.layout.divisor,
            e = this.endTouchX - this.startTouchX,
            i = Math.abs(e),
            n = e / (this.endTime - this.startTime),
            r = this.settings.minVelocity;
          return i <= this.settings.minDistance || i >= t
            ? 0
            : n > r
              ? -1
              : n < -r
                ? 1
                : void 0;
        }
        needsSnap() {
          return (
            this.scrollLeft % (this.layout.pageWidth * this.layout.divisor) != 0
          );
        }
        snap(t = 0) {
          let e = this.scrollLeft,
            i = this.layout.pageWidth * this.layout.divisor,
            n = Math.round(e / i) * i;
          return t && (n += t * i), this.smoothScrollTo(n);
        }
        smoothScrollTo(t) {
          const e = new n.defer(),
            i = this.scrollLeft,
            r = this.now(),
            s = this.settings.duration,
            o = this.settings.easing;
          return (
            (this.snapping = !0),
            function n() {
              const a = this.now(),
                h = Math.min(1, (a - r) / s);
              if ((o(h), this.touchCanceler || this.resizeCanceler))
                return (
                  (this.resizeCanceler = !1),
                  (this.snapping = !1),
                  void e.resolve()
                );
              h < 1
                ? (window.requestAnimationFrame(n.bind(this)),
                  this.scrollTo(i + (t - i) * h, 0))
                : (this.scrollTo(t, 0), (this.snapping = !1), e.resolve());
            }.call(this),
            e.promise
          );
        }
        scrollTo(t = 0, e = 0) {
          this.fullsize
            ? window.scroll(t, e)
            : ((this.scroller.scrollLeft = t), (this.scroller.scrollTop = e));
        }
        now() {
          return "now" in window.performance
            ? performance.now()
            : new Date().getTime();
        }
        destroy() {
          this.scroller &&
            (this.fullsize && this.enableScroll(),
            this.removeListeners(),
            (this.scroller = void 0));
        }
      }
      a()(c.prototype);
      var u = c,
        d = i(46),
        f = i.n(d);
      class p extends r.a {
        constructor(t) {
          super(t),
            (this.name = "continuous"),
            (this.settings = Object(n.extend)(this.settings || {}, {
              infinite: !0,
              overflow: void 0,
              axis: void 0,
              writingMode: void 0,
              flow: "scrolled",
              offset: 500,
              offsetDelta: 250,
              width: void 0,
              height: void 0,
              snap: !1,
              afterScrolledTimeout: 10,
              allowScriptedContent: !1,
              allowPopups: !1,
            })),
            Object(n.extend)(this.settings, t.settings || {}),
            "undefined" != t.settings.gap &&
              0 === t.settings.gap &&
              (this.settings.gap = t.settings.gap),
            (this.viewSettings = {
              ignoreClass: this.settings.ignoreClass,
              axis: this.settings.axis,
              flow: this.settings.flow,
              layout: this.layout,
              width: 0,
              height: 0,
              forceEvenPages: !1,
              allowScriptedContent: this.settings.allowScriptedContent,
              allowPopups: this.settings.allowPopups,
            }),
            (this.scrollTop = 0),
            (this.scrollLeft = 0);
        }
        display(t, e) {
          return r.a.prototype.display.call(this, t, e).then(
            function () {
              return this.fill();
            }.bind(this),
          );
        }
        fill(t) {
          var e = t || new n.defer();
          return (
            this.q
              .enqueue(() => this.check())
              .then((t) => {
                t ? this.fill(e) : e.resolve();
              }),
            e.promise
          );
        }
        moveTo(t) {
          var e = 0,
            i = 0;
          this.isPaginated
            ? ((e = Math.floor(t.left / this.layout.delta) * this.layout.delta),
              this.settings.offsetDelta)
            : ((i = t.top), t.top, this.settings.offsetDelta),
            (e > 0 || i > 0) && this.scrollBy(e, i, !0);
        }
        afterResized(t) {
          this.emit(s.c.MANAGERS.RESIZE, t.section);
        }
        removeShownListeners(t) {
          t.onDisplayed = function () {};
        }
        add(t) {
          var e = this.createView(t);
          return (
            this.views.append(e),
            e.on(s.c.VIEWS.RESIZED, (t) => {
              e.expanded = !0;
            }),
            e.on(s.c.VIEWS.AXIS, (t) => {
              this.updateAxis(t);
            }),
            e.on(s.c.VIEWS.WRITING_MODE, (t) => {
              this.updateWritingMode(t);
            }),
            (e.onDisplayed = this.afterDisplayed.bind(this)),
            (e.onResize = this.afterResized.bind(this)),
            e.display(this.request)
          );
        }
        append(t) {
          var e = this.createView(t);
          return (
            e.on(s.c.VIEWS.RESIZED, (t) => {
              e.expanded = !0;
            }),
            e.on(s.c.VIEWS.AXIS, (t) => {
              this.updateAxis(t);
            }),
            e.on(s.c.VIEWS.WRITING_MODE, (t) => {
              this.updateWritingMode(t);
            }),
            this.views.append(e),
            (e.onDisplayed = this.afterDisplayed.bind(this)),
            e
          );
        }
        prepend(t) {
          var e = this.createView(t);
          return (
            e.on(s.c.VIEWS.RESIZED, (t) => {
              this.counter(t), (e.expanded = !0);
            }),
            e.on(s.c.VIEWS.AXIS, (t) => {
              this.updateAxis(t);
            }),
            e.on(s.c.VIEWS.WRITING_MODE, (t) => {
              this.updateWritingMode(t);
            }),
            this.views.prepend(e),
            (e.onDisplayed = this.afterDisplayed.bind(this)),
            e
          );
        }
        counter(t) {
          "vertical" === this.settings.axis
            ? this.scrollBy(0, t.heightDelta, !0)
            : this.scrollBy(t.widthDelta, 0, !0);
        }
        update(t) {
          for (
            var e,
              i = this.bounds(),
              r = this.views.all(),
              s = r.length,
              o = [],
              a = void 0 !== t ? t : this.settings.offset || 0,
              h = new n.defer(),
              l = [],
              c = 0;
            c < s;
            c++
          )
            if (((e = r[c]), !0 === this.isVisible(e, a, a, i))) {
              if (e.displayed) e.show();
              else {
                let t = e.display(this.request).then(
                  function (t) {
                    t.show();
                  },
                  (t) => {
                    e.hide();
                  },
                );
                l.push(t);
              }
              o.push(e);
            } else
              this.q.enqueue(e.destroy.bind(e)),
                clearTimeout(this.trimTimeout),
                (this.trimTimeout = setTimeout(
                  function () {
                    this.q.enqueue(this.trim.bind(this));
                  }.bind(this),
                  250,
                ));
          return l.length
            ? Promise.all(l).catch((t) => {
                h.reject(t);
              })
            : (h.resolve(), h.promise);
        }
        check(t, e) {
          var i = new n.defer(),
            r = [],
            s = "horizontal" === this.settings.axis,
            o = this.settings.offset || 0;
          t && s && (o = t), e && !s && (o = e);
          var a = this._bounds;
          let h = s ? this.scrollLeft : this.scrollTop,
            l = s ? Math.floor(a.width) : a.height,
            c = s ? this.container.scrollWidth : this.container.scrollHeight,
            u =
              this.writingMode && 0 === this.writingMode.indexOf("vertical")
                ? "vertical"
                : "horizontal",
            d = this.settings.rtlScrollType,
            f = "rtl" === this.settings.direction;
          this.settings.fullsize
            ? ((s && f && "negative" === d) || (!s && f && "default" === d)) &&
              (h *= -1)
            : (f && "default" === d && "horizontal" === u && (h = c - l - h),
              f && "negative" === d && "horizontal" === u && (h *= -1));
          let p = () => {
              let t = this.views.first(),
                e = t && t.section.prev();
              e && r.push(this.prepend(e));
            },
            g = h - o;
          h + l + o >= c &&
            (() => {
              let t = this.views.last(),
                e = t && t.section.next();
              e && r.push(this.append(e));
            })(),
            g < 0 && p();
          let m = r.map((t) => t.display(this.request));
          return r.length
            ? Promise.all(m)
                .then(() => this.check())
                .then(
                  () => this.update(o),
                  (t) => t,
                )
            : (this.q.enqueue(
                function () {
                  this.update();
                }.bind(this),
              ),
              i.resolve(!1),
              i.promise);
        }
        trim() {
          for (
            var t = new n.defer(),
              e = this.views.displayed(),
              i = e[0],
              r = e[e.length - 1],
              s = this.views.indexOf(i),
              o = this.views.indexOf(r),
              a = this.views.slice(0, s),
              h = this.views.slice(o + 1),
              l = 0;
            l < a.length - 1;
            l++
          )
            this.erase(a[l], a);
          for (var c = 1; c < h.length; c++) this.erase(h[c]);
          return t.resolve(), t.promise;
        }
        erase(t, e) {
          var i, n;
          this.settings.fullsize
            ? ((i = window.scrollY), (n = window.scrollX))
            : ((i = this.container.scrollTop), (n = this.container.scrollLeft));
          var r = t.bounds();
          this.views.remove(t),
            e &&
              ("vertical" === this.settings.axis
                ? this.scrollTo(0, i - r.height, !0)
                : "rtl" === this.settings.direction
                  ? this.settings.fullsize
                    ? this.scrollTo(n + Math.floor(r.width), 0, !0)
                    : this.scrollTo(n, 0, !0)
                  : this.scrollTo(n - Math.floor(r.width), 0, !0));
        }
        addEventListeners(t) {
          window.addEventListener(
            "unload",
            function (t) {
              (this.ignore = !0), this.destroy();
            }.bind(this),
          ),
            this.addScrollListeners(),
            this.isPaginated &&
              this.settings.snap &&
              (this.snapper = new u(
                this,
                this.settings.snap &&
                  "object" == typeof this.settings.snap &&
                  this.settings.snap,
              ));
        }
        addScrollListeners() {
          var t;
          this.tick = n.requestAnimationFrame;
          let e =
            "rtl" === this.settings.direction &&
            "default" === this.settings.rtlScrollType
              ? -1
              : 1;
          (this.scrollDeltaVert = 0),
            (this.scrollDeltaHorz = 0),
            this.settings.fullsize
              ? ((t = window),
                (this.scrollTop = window.scrollY * e),
                (this.scrollLeft = window.scrollX * e))
              : ((t = this.container),
                (this.scrollTop = this.container.scrollTop),
                (this.scrollLeft = this.container.scrollLeft)),
            (this._onScroll = this.onScroll.bind(this)),
            t.addEventListener("scroll", this._onScroll),
            (this._scrolled = f()(this.scrolled.bind(this), 30)),
            (this.didScroll = !1);
        }
        removeEventListeners() {
          (this.settings.fullsize
            ? window
            : this.container
          ).removeEventListener("scroll", this._onScroll),
            (this._onScroll = void 0);
        }
        onScroll() {
          let t,
            e,
            i =
              "rtl" === this.settings.direction &&
              "default" === this.settings.rtlScrollType
                ? -1
                : 1;
          this.settings.fullsize
            ? ((t = window.scrollY * i), (e = window.scrollX * i))
            : ((t = this.container.scrollTop), (e = this.container.scrollLeft)),
            (this.scrollTop = t),
            (this.scrollLeft = e),
            this.ignore ? (this.ignore = !1) : this._scrolled(),
            (this.scrollDeltaVert += Math.abs(t - this.prevScrollTop)),
            (this.scrollDeltaHorz += Math.abs(e - this.prevScrollLeft)),
            (this.prevScrollTop = t),
            (this.prevScrollLeft = e),
            clearTimeout(this.scrollTimeout),
            (this.scrollTimeout = setTimeout(
              function () {
                (this.scrollDeltaVert = 0), (this.scrollDeltaHorz = 0);
              }.bind(this),
              150,
            )),
            clearTimeout(this.afterScrolled),
            (this.didScroll = !1);
        }
        scrolled() {
          this.q.enqueue(
            function () {
              return this.check();
            }.bind(this),
          ),
            this.emit(s.c.MANAGERS.SCROLL, {
              top: this.scrollTop,
              left: this.scrollLeft,
            }),
            clearTimeout(this.afterScrolled),
            (this.afterScrolled = setTimeout(
              function () {
                (this.snapper &&
                  this.snapper.supportsTouch &&
                  this.snapper.needsSnap()) ||
                  this.emit(s.c.MANAGERS.SCROLLED, {
                    top: this.scrollTop,
                    left: this.scrollLeft,
                  });
              }.bind(this),
              this.settings.afterScrolledTimeout,
            ));
        }
        next() {
          let t =
            "pre-paginated" === this.layout.props.name &&
            this.layout.props.spread
              ? 2 * this.layout.props.delta
              : this.layout.props.delta;
          this.views.length &&
            (this.isPaginated && "horizontal" === this.settings.axis
              ? this.scrollBy(t, 0, !0)
              : this.scrollBy(0, this.layout.height, !0),
            this.q.enqueue(
              function () {
                return this.check();
              }.bind(this),
            ));
        }
        prev() {
          let t =
            "pre-paginated" === this.layout.props.name &&
            this.layout.props.spread
              ? 2 * this.layout.props.delta
              : this.layout.props.delta;
          this.views.length &&
            (this.isPaginated && "horizontal" === this.settings.axis
              ? this.scrollBy(-t, 0, !0)
              : this.scrollBy(0, -this.layout.height, !0),
            this.q.enqueue(
              function () {
                return this.check();
              }.bind(this),
            ));
        }
        updateFlow(t) {
          this.rendered &&
            this.snapper &&
            (this.snapper.destroy(), (this.snapper = void 0)),
            super.updateFlow(t, "scroll"),
            this.rendered &&
              this.isPaginated &&
              this.settings.snap &&
              (this.snapper = new u(
                this,
                this.settings.snap &&
                  "object" == typeof this.settings.snap &&
                  this.settings.snap,
              ));
        }
        destroy() {
          super.destroy(), this.snapper && this.snapper.destroy();
        }
      }
      e.a = p;
    },
    function (t, e, i) {
      (function (e) {
        t.exports = (function t(e, i, n) {
          function r(o, a) {
            if (!i[o]) {
              if (!e[o]) {
                if (s) return s(o, !0);
                var h = new Error("Cannot find module '" + o + "'");
                throw ((h.code = "MODULE_NOT_FOUND"), h);
              }
              var l = (i[o] = { exports: {} });
              e[o][0].call(
                l.exports,
                function (t) {
                  var i = e[o][1][t];
                  return r(i || t);
                },
                l,
                l.exports,
                t,
                e,
                i,
                n,
              );
            }
            return i[o].exports;
          }
          for (var s = !1, o = 0; o < n.length; o++) r(n[o]);
          return r;
        })(
          {
            1: [
              function (t, i, n) {
                (function (t) {
                  "use strict";
                  var e,
                    n,
                    r = t.MutationObserver || t.WebKitMutationObserver;
                  if (r) {
                    var s = 0,
                      o = new r(c),
                      a = t.document.createTextNode("");
                    o.observe(a, { characterData: !0 }),
                      (e = function () {
                        a.data = s = ++s % 2;
                      });
                  } else if (t.setImmediate || void 0 === t.MessageChannel)
                    e =
                      "document" in t &&
                      "onreadystatechange" in t.document.createElement("script")
                        ? function () {
                            var e = t.document.createElement("script");
                            (e.onreadystatechange = function () {
                              c(),
                                (e.onreadystatechange = null),
                                e.parentNode.removeChild(e),
                                (e = null);
                            }),
                              t.document.documentElement.appendChild(e);
                          }
                        : function () {
                            setTimeout(c, 0);
                          };
                  else {
                    var h = new t.MessageChannel();
                    (h.port1.onmessage = c),
                      (e = function () {
                        h.port2.postMessage(0);
                      });
                  }
                  var l = [];
                  function c() {
                    var t, e;
                    n = !0;
                    for (var i = l.length; i; ) {
                      for (e = l, l = [], t = -1; ++t < i; ) e[t]();
                      i = l.length;
                    }
                    n = !1;
                  }
                  i.exports = function (t) {
                    1 !== l.push(t) || n || e();
                  };
                }).call(
                  this,
                  void 0 !== e
                    ? e
                    : "undefined" != typeof self
                      ? self
                      : "undefined" != typeof window
                        ? window
                        : {},
                );
              },
              {},
            ],
            2: [
              function (t, e, i) {
                "use strict";
                var n = t(1);
                function r() {}
                var s = {},
                  o = ["REJECTED"],
                  a = ["FULFILLED"],
                  h = ["PENDING"];
                function l(t) {
                  if ("function" != typeof t)
                    throw new TypeError("resolver must be a function");
                  (this.state = h),
                    (this.queue = []),
                    (this.outcome = void 0),
                    t !== r && f(this, t);
                }
                function c(t, e, i) {
                  (this.promise = t),
                    "function" == typeof e &&
                      ((this.onFulfilled = e),
                      (this.callFulfilled = this.otherCallFulfilled)),
                    "function" == typeof i &&
                      ((this.onRejected = i),
                      (this.callRejected = this.otherCallRejected));
                }
                function u(t, e, i) {
                  n(function () {
                    var n;
                    try {
                      n = e(i);
                    } catch (e) {
                      return s.reject(t, e);
                    }
                    n === t
                      ? s.reject(
                          t,
                          new TypeError("Cannot resolve promise with itself"),
                        )
                      : s.resolve(t, n);
                  });
                }
                function d(t) {
                  var e = t && t.then;
                  if (
                    t &&
                    ("object" == typeof t || "function" == typeof t) &&
                    "function" == typeof e
                  )
                    return function () {
                      e.apply(t, arguments);
                    };
                }
                function f(t, e) {
                  var i = !1;
                  function n(e) {
                    i || ((i = !0), s.reject(t, e));
                  }
                  function r(e) {
                    i || ((i = !0), s.resolve(t, e));
                  }
                  var o = p(function () {
                    e(r, n);
                  });
                  "error" === o.status && n(o.value);
                }
                function p(t, e) {
                  var i = {};
                  try {
                    (i.value = t(e)), (i.status = "success");
                  } catch (t) {
                    (i.status = "error"), (i.value = t);
                  }
                  return i;
                }
                (e.exports = l),
                  (l.prototype.catch = function (t) {
                    return this.then(null, t);
                  }),
                  (l.prototype.then = function (t, e) {
                    if (
                      ("function" != typeof t && this.state === a) ||
                      ("function" != typeof e && this.state === o)
                    )
                      return this;
                    var i = new this.constructor(r);
                    return (
                      this.state !== h
                        ? u(i, this.state === a ? t : e, this.outcome)
                        : this.queue.push(new c(i, t, e)),
                      i
                    );
                  }),
                  (c.prototype.callFulfilled = function (t) {
                    s.resolve(this.promise, t);
                  }),
                  (c.prototype.otherCallFulfilled = function (t) {
                    u(this.promise, this.onFulfilled, t);
                  }),
                  (c.prototype.callRejected = function (t) {
                    s.reject(this.promise, t);
                  }),
                  (c.prototype.otherCallRejected = function (t) {
                    u(this.promise, this.onRejected, t);
                  }),
                  (s.resolve = function (t, e) {
                    var i = p(d, e);
                    if ("error" === i.status) return s.reject(t, i.value);
                    var n = i.value;
                    if (n) f(t, n);
                    else {
                      (t.state = a), (t.outcome = e);
                      for (var r = -1, o = t.queue.length; ++r < o; )
                        t.queue[r].callFulfilled(e);
                    }
                    return t;
                  }),
                  (s.reject = function (t, e) {
                    (t.state = o), (t.outcome = e);
                    for (var i = -1, n = t.queue.length; ++i < n; )
                      t.queue[i].callRejected(e);
                    return t;
                  }),
                  (l.resolve = function (t) {
                    return t instanceof this ? t : s.resolve(new this(r), t);
                  }),
                  (l.reject = function (t) {
                    var e = new this(r);
                    return s.reject(e, t);
                  }),
                  (l.all = function (t) {
                    var e = this;
                    if ("[object Array]" !== Object.prototype.toString.call(t))
                      return this.reject(new TypeError("must be an array"));
                    var i = t.length,
                      n = !1;
                    if (!i) return this.resolve([]);
                    for (
                      var o = new Array(i), a = 0, h = -1, l = new this(r);
                      ++h < i;

                    )
                      c(t[h], h);
                    return l;
                    function c(t, r) {
                      e.resolve(t).then(
                        function (t) {
                          (o[r] = t),
                            ++a !== i || n || ((n = !0), s.resolve(l, o));
                        },
                        function (t) {
                          n || ((n = !0), s.reject(l, t));
                        },
                      );
                    }
                  }),
                  (l.race = function (t) {
                    var e = this;
                    if ("[object Array]" !== Object.prototype.toString.call(t))
                      return this.reject(new TypeError("must be an array"));
                    var i = t.length,
                      n = !1;
                    if (!i) return this.resolve([]);
                    for (var o, a = -1, h = new this(r); ++a < i; )
                      (o = t[a]),
                        e.resolve(o).then(
                          function (t) {
                            n || ((n = !0), s.resolve(h, t));
                          },
                          function (t) {
                            n || ((n = !0), s.reject(h, t));
                          },
                        );
                    return h;
                  });
              },
              { 1: 1 },
            ],
            3: [
              function (t, i, n) {
                (function (e) {
                  "use strict";
                  "function" != typeof e.Promise && (e.Promise = t(2));
                }).call(
                  this,
                  void 0 !== e
                    ? e
                    : "undefined" != typeof self
                      ? self
                      : "undefined" != typeof window
                        ? window
                        : {},
                );
              },
              { 2: 2 },
            ],
            4: [
              function (t, e, i) {
                "use strict";
                var n =
                    "function" == typeof Symbol &&
                    "symbol" == typeof Symbol.iterator
                      ? function (t) {
                          return typeof t;
                        }
                      : function (t) {
                          return t &&
                            "function" == typeof Symbol &&
                            t.constructor === Symbol &&
                            t !== Symbol.prototype
                            ? "symbol"
                            : typeof t;
                        },
                  r = (function () {
                    try {
                      if ("undefined" != typeof indexedDB) return indexedDB;
                      if ("undefined" != typeof webkitIndexedDB)
                        return webkitIndexedDB;
                      if ("undefined" != typeof mozIndexedDB)
                        return mozIndexedDB;
                      if ("undefined" != typeof OIndexedDB) return OIndexedDB;
                      if ("undefined" != typeof msIndexedDB) return msIndexedDB;
                    } catch (t) {
                      return;
                    }
                  })();
                function s(t, e) {
                  (t = t || []), (e = e || {});
                  try {
                    return new Blob(t, e);
                  } catch (r) {
                    if ("TypeError" !== r.name) throw r;
                    for (
                      var i = new (
                          "undefined" != typeof BlobBuilder
                            ? BlobBuilder
                            : "undefined" != typeof MSBlobBuilder
                              ? MSBlobBuilder
                              : "undefined" != typeof MozBlobBuilder
                                ? MozBlobBuilder
                                : WebKitBlobBuilder
                        )(),
                        n = 0;
                      n < t.length;
                      n += 1
                    )
                      i.append(t[n]);
                    return i.getBlob(e.type);
                  }
                }
                "undefined" == typeof Promise && t(3);
                var o = Promise;
                function a(t, e) {
                  e &&
                    t.then(
                      function (t) {
                        e(null, t);
                      },
                      function (t) {
                        e(t);
                      },
                    );
                }
                function h(t, e, i) {
                  "function" == typeof e && t.then(e),
                    "function" == typeof i && t.catch(i);
                }
                function l(t) {
                  return (
                    "string" != typeof t &&
                      (console.warn(
                        t + " used as a key, but it is not a string.",
                      ),
                      (t = String(t))),
                    t
                  );
                }
                function c() {
                  if (
                    arguments.length &&
                    "function" == typeof arguments[arguments.length - 1]
                  )
                    return arguments[arguments.length - 1];
                }
                var u = void 0,
                  d = {},
                  f = Object.prototype.toString;
                function p(t) {
                  return "boolean" == typeof u
                    ? o.resolve(u)
                    : (function (t) {
                        return new o(function (e) {
                          var i = t.transaction(
                              "local-forage-detect-blob-support",
                              "readwrite",
                            ),
                            n = s([""]);
                          i
                            .objectStore("local-forage-detect-blob-support")
                            .put(n, "key"),
                            (i.onabort = function (t) {
                              t.preventDefault(), t.stopPropagation(), e(!1);
                            }),
                            (i.oncomplete = function () {
                              var t =
                                  navigator.userAgent.match(/Chrome\\/(\\d+)/),
                                i = navigator.userAgent.match(/Edge\\//);
                              e(i || !t || parseInt(t[1], 10) >= 43);
                            });
                        }).catch(function () {
                          return !1;
                        });
                      })(t).then(function (t) {
                        return (u = t);
                      });
                }
                function g(t) {
                  var e = d[t.name],
                    i = {};
                  (i.promise = new o(function (t, e) {
                    (i.resolve = t), (i.reject = e);
                  })),
                    e.deferredOperations.push(i),
                    e.dbReady
                      ? (e.dbReady = e.dbReady.then(function () {
                          return i.promise;
                        }))
                      : (e.dbReady = i.promise);
                }
                function m(t) {
                  var e = d[t.name].deferredOperations.pop();
                  if (e) return e.resolve(), e.promise;
                }
                function v(t, e) {
                  var i = d[t.name].deferredOperations.pop();
                  if (i) return i.reject(e), i.promise;
                }
                function y(t, e) {
                  return new o(function (i, n) {
                    if (
                      ((d[t.name] = d[t.name] || {
                        forages: [],
                        db: null,
                        dbReady: null,
                        deferredOperations: [],
                      }),
                      t.db)
                    ) {
                      if (!e) return i(t.db);
                      g(t), t.db.close();
                    }
                    var s = [t.name];
                    e && s.push(t.version);
                    var o = r.open.apply(r, s);
                    e &&
                      (o.onupgradeneeded = function (e) {
                        var i = o.result;
                        try {
                          i.createObjectStore(t.storeName),
                            e.oldVersion <= 1 &&
                              i.createObjectStore(
                                "local-forage-detect-blob-support",
                              );
                        } catch (i) {
                          if ("ConstraintError" !== i.name) throw i;
                          console.warn(
                            'The database "' +
                              t.name +
                              '" has been upgraded from version ' +
                              e.oldVersion +
                              " to version " +
                              e.newVersion +
                              ', but the storage "' +
                              t.storeName +
                              '" already exists.',
                          );
                        }
                      }),
                      (o.onerror = function (t) {
                        t.preventDefault(), n(o.error);
                      }),
                      (o.onsuccess = function () {
                        var e = o.result;
                        (e.onversionchange = function (t) {
                          t.target.close();
                        }),
                          i(e),
                          m(t);
                      });
                  });
                }
                function b(t) {
                  return y(t, !1);
                }
                function w(t) {
                  return y(t, !0);
                }
                function x(t, e) {
                  if (!t.db) return !0;
                  var i = !t.db.objectStoreNames.contains(t.storeName),
                    n = t.version < t.db.version,
                    r = t.version > t.db.version;
                  if (
                    (n &&
                      (t.version !== e &&
                        console.warn(
                          'The database "' +
                            t.name +
                            "\\" can't be downgraded from version " +
                            t.db.version +
                            " to version " +
                            t.version +
                            ".",
                        ),
                      (t.version = t.db.version)),
                    r || i)
                  ) {
                    if (i) {
                      var s = t.db.version + 1;
                      s > t.version && (t.version = s);
                    }
                    return !0;
                  }
                  return !1;
                }
                function E(t) {
                  return s(
                    [
                      (function (t) {
                        for (
                          var e = t.length,
                            i = new ArrayBuffer(e),
                            n = new Uint8Array(i),
                            r = 0;
                          r < e;
                          r++
                        )
                          n[r] = t.charCodeAt(r);
                        return i;
                      })(atob(t.data)),
                    ],
                    { type: t.type },
                  );
                }
                function S(t) {
                  return t && t.__local_forage_encoded_blob;
                }
                function N(t) {
                  var e = this,
                    i = e._initReady().then(function () {
                      var t = d[e._dbInfo.name];
                      if (t && t.dbReady) return t.dbReady;
                    });
                  return h(i, t, t), i;
                }
                function _(t, e, i, n) {
                  void 0 === n && (n = 1);
                  try {
                    var r = t.db.transaction(t.storeName, e);
                    i(null, r);
                  } catch (r) {
                    if (
                      n > 0 &&
                      (!t.db ||
                        "InvalidStateError" === r.name ||
                        "NotFoundError" === r.name)
                    )
                      return o
                        .resolve()
                        .then(function () {
                          if (
                            !t.db ||
                            ("NotFoundError" === r.name &&
                              !t.db.objectStoreNames.contains(t.storeName) &&
                              t.version <= t.db.version)
                          )
                            return t.db && (t.version = t.db.version + 1), w(t);
                        })
                        .then(function () {
                          return (function (t) {
                            g(t);
                            for (
                              var e = d[t.name], i = e.forages, n = 0;
                              n < i.length;
                              n++
                            ) {
                              var r = i[n];
                              r._dbInfo.db &&
                                (r._dbInfo.db.close(), (r._dbInfo.db = null));
                            }
                            return (
                              (t.db = null),
                              b(t)
                                .then(function (e) {
                                  return (t.db = e), x(t) ? w(t) : e;
                                })
                                .then(function (n) {
                                  t.db = e.db = n;
                                  for (var r = 0; r < i.length; r++)
                                    i[r]._dbInfo.db = n;
                                })
                                .catch(function (e) {
                                  throw (v(t, e), e);
                                })
                            );
                          })(t).then(function () {
                            _(t, e, i, n - 1);
                          });
                        })
                        .catch(i);
                    i(r);
                  }
                }
                var O = {
                    _driver: "asyncStorage",
                    _initStorage: function (t) {
                      var e = this,
                        i = { db: null };
                      if (t) for (var n in t) i[n] = t[n];
                      var r = d[i.name];
                      r ||
                        ((r = {
                          forages: [],
                          db: null,
                          dbReady: null,
                          deferredOperations: [],
                        }),
                        (d[i.name] = r)),
                        r.forages.push(e),
                        e._initReady ||
                          ((e._initReady = e.ready), (e.ready = N));
                      var s = [];
                      function a() {
                        return o.resolve();
                      }
                      for (var h = 0; h < r.forages.length; h++) {
                        var l = r.forages[h];
                        l !== e && s.push(l._initReady().catch(a));
                      }
                      var c = r.forages.slice(0);
                      return o
                        .all(s)
                        .then(function () {
                          return (i.db = r.db), b(i);
                        })
                        .then(function (t) {
                          return (
                            (i.db = t),
                            x(i, e._defaultConfig.version) ? w(i) : t
                          );
                        })
                        .then(function (t) {
                          (i.db = r.db = t), (e._dbInfo = i);
                          for (var n = 0; n < c.length; n++) {
                            var s = c[n];
                            s !== e &&
                              ((s._dbInfo.db = i.db),
                              (s._dbInfo.version = i.version));
                          }
                        });
                    },
                    _support: (function () {
                      try {
                        if (!r || !r.open) return !1;
                        var t =
                            "undefined" != typeof openDatabase &&
                            /(Safari|iPhone|iPad|iPod)/.test(
                              navigator.userAgent,
                            ) &&
                            !/Chrome/.test(navigator.userAgent) &&
                            !/BlackBerry/.test(navigator.platform),
                          e =
                            "function" == typeof fetch &&
                            -1 !== fetch.toString().indexOf("[native code");
                        return (
                          (!t || e) &&
                          "undefined" != typeof indexedDB &&
                          "undefined" != typeof IDBKeyRange
                        );
                      } catch (t) {
                        return !1;
                      }
                    })(),
                    iterate: function (t, e) {
                      var i = this,
                        n = new o(function (e, n) {
                          i.ready()
                            .then(function () {
                              _(i._dbInfo, "readonly", function (r, s) {
                                if (r) return n(r);
                                try {
                                  var o = s
                                      .objectStore(i._dbInfo.storeName)
                                      .openCursor(),
                                    a = 1;
                                  (o.onsuccess = function () {
                                    var i = o.result;
                                    if (i) {
                                      var n = i.value;
                                      S(n) && (n = E(n));
                                      var r = t(n, i.key, a++);
                                      void 0 !== r ? e(r) : i.continue();
                                    } else e();
                                  }),
                                    (o.onerror = function () {
                                      n(o.error);
                                    });
                                } catch (t) {
                                  n(t);
                                }
                              });
                            })
                            .catch(n);
                        });
                      return a(n, e), n;
                    },
                    getItem: function (t, e) {
                      var i = this;
                      t = l(t);
                      var n = new o(function (e, n) {
                        i.ready()
                          .then(function () {
                            _(i._dbInfo, "readonly", function (r, s) {
                              if (r) return n(r);
                              try {
                                var o = s
                                  .objectStore(i._dbInfo.storeName)
                                  .get(t);
                                (o.onsuccess = function () {
                                  var t = o.result;
                                  void 0 === t && (t = null),
                                    S(t) && (t = E(t)),
                                    e(t);
                                }),
                                  (o.onerror = function () {
                                    n(o.error);
                                  });
                              } catch (t) {
                                n(t);
                              }
                            });
                          })
                          .catch(n);
                      });
                      return a(n, e), n;
                    },
                    setItem: function (t, e, i) {
                      var n = this;
                      t = l(t);
                      var r = new o(function (i, r) {
                        var s;
                        n.ready()
                          .then(function () {
                            return (
                              (s = n._dbInfo),
                              "[object Blob]" === f.call(e)
                                ? p(s.db).then(function (t) {
                                    return t
                                      ? e
                                      : ((i = e),
                                        new o(function (t, e) {
                                          var n = new FileReader();
                                          (n.onerror = e),
                                            (n.onloadend = function (e) {
                                              var n = btoa(
                                                e.target.result || "",
                                              );
                                              t({
                                                __local_forage_encoded_blob: !0,
                                                data: n,
                                                type: i.type,
                                              });
                                            }),
                                            n.readAsBinaryString(i);
                                        }));
                                    var i;
                                  })
                                : e
                            );
                          })
                          .then(function (e) {
                            _(n._dbInfo, "readwrite", function (s, o) {
                              if (s) return r(s);
                              try {
                                var a = o.objectStore(n._dbInfo.storeName);
                                null === e && (e = void 0);
                                var h = a.put(e, t);
                                (o.oncomplete = function () {
                                  void 0 === e && (e = null), i(e);
                                }),
                                  (o.onabort = o.onerror =
                                    function () {
                                      var t = h.error
                                        ? h.error
                                        : h.transaction.error;
                                      r(t);
                                    });
                              } catch (t) {
                                r(t);
                              }
                            });
                          })
                          .catch(r);
                      });
                      return a(r, i), r;
                    },
                    removeItem: function (t, e) {
                      var i = this;
                      t = l(t);
                      var n = new o(function (e, n) {
                        i.ready()
                          .then(function () {
                            _(i._dbInfo, "readwrite", function (r, s) {
                              if (r) return n(r);
                              try {
                                var o = s
                                  .objectStore(i._dbInfo.storeName)
                                  .delete(t);
                                (s.oncomplete = function () {
                                  e();
                                }),
                                  (s.onerror = function () {
                                    n(o.error);
                                  }),
                                  (s.onabort = function () {
                                    var t = o.error
                                      ? o.error
                                      : o.transaction.error;
                                    n(t);
                                  });
                              } catch (t) {
                                n(t);
                              }
                            });
                          })
                          .catch(n);
                      });
                      return a(n, e), n;
                    },
                    clear: function (t) {
                      var e = this,
                        i = new o(function (t, i) {
                          e.ready()
                            .then(function () {
                              _(e._dbInfo, "readwrite", function (n, r) {
                                if (n) return i(n);
                                try {
                                  var s = r
                                    .objectStore(e._dbInfo.storeName)
                                    .clear();
                                  (r.oncomplete = function () {
                                    t();
                                  }),
                                    (r.onabort = r.onerror =
                                      function () {
                                        var t = s.error
                                          ? s.error
                                          : s.transaction.error;
                                        i(t);
                                      });
                                } catch (t) {
                                  i(t);
                                }
                              });
                            })
                            .catch(i);
                        });
                      return a(i, t), i;
                    },
                    length: function (t) {
                      var e = this,
                        i = new o(function (t, i) {
                          e.ready()
                            .then(function () {
                              _(e._dbInfo, "readonly", function (n, r) {
                                if (n) return i(n);
                                try {
                                  var s = r
                                    .objectStore(e._dbInfo.storeName)
                                    .count();
                                  (s.onsuccess = function () {
                                    t(s.result);
                                  }),
                                    (s.onerror = function () {
                                      i(s.error);
                                    });
                                } catch (t) {
                                  i(t);
                                }
                              });
                            })
                            .catch(i);
                        });
                      return a(i, t), i;
                    },
                    key: function (t, e) {
                      var i = this,
                        n = new o(function (e, n) {
                          t < 0
                            ? e(null)
                            : i
                                .ready()
                                .then(function () {
                                  _(i._dbInfo, "readonly", function (r, s) {
                                    if (r) return n(r);
                                    try {
                                      var o = s.objectStore(
                                          i._dbInfo.storeName,
                                        ),
                                        a = !1,
                                        h = o.openKeyCursor();
                                      (h.onsuccess = function () {
                                        var i = h.result;
                                        i
                                          ? 0 === t || a
                                            ? e(i.key)
                                            : ((a = !0), i.advance(t))
                                          : e(null);
                                      }),
                                        (h.onerror = function () {
                                          n(h.error);
                                        });
                                    } catch (t) {
                                      n(t);
                                    }
                                  });
                                })
                                .catch(n);
                        });
                      return a(n, e), n;
                    },
                    keys: function (t) {
                      var e = this,
                        i = new o(function (t, i) {
                          e.ready()
                            .then(function () {
                              _(e._dbInfo, "readonly", function (n, r) {
                                if (n) return i(n);
                                try {
                                  var s = r
                                      .objectStore(e._dbInfo.storeName)
                                      .openKeyCursor(),
                                    o = [];
                                  (s.onsuccess = function () {
                                    var e = s.result;
                                    e ? (o.push(e.key), e.continue()) : t(o);
                                  }),
                                    (s.onerror = function () {
                                      i(s.error);
                                    });
                                } catch (t) {
                                  i(t);
                                }
                              });
                            })
                            .catch(i);
                        });
                      return a(i, t), i;
                    },
                    dropInstance: function (t, e) {
                      e = c.apply(this, arguments);
                      var i = this.config();
                      (t = ("function" != typeof t && t) || {}).name ||
                        ((t.name = t.name || i.name),
                        (t.storeName = t.storeName || i.storeName));
                      var n,
                        s = this;
                      if (t.name) {
                        var h = t.name === i.name && s._dbInfo.db,
                          l = h
                            ? o.resolve(s._dbInfo.db)
                            : b(t).then(function (e) {
                                var i = d[t.name],
                                  n = i.forages;
                                i.db = e;
                                for (var r = 0; r < n.length; r++)
                                  n[r]._dbInfo.db = e;
                                return e;
                              });
                        n = t.storeName
                          ? l.then(function (e) {
                              if (e.objectStoreNames.contains(t.storeName)) {
                                var i = e.version + 1;
                                g(t);
                                var n = d[t.name],
                                  s = n.forages;
                                e.close();
                                for (var a = 0; a < s.length; a++) {
                                  var h = s[a];
                                  (h._dbInfo.db = null),
                                    (h._dbInfo.version = i);
                                }
                                return new o(function (e, n) {
                                  var s = r.open(t.name, i);
                                  (s.onerror = function (t) {
                                    s.result.close(), n(t);
                                  }),
                                    (s.onupgradeneeded = function () {
                                      s.result.deleteObjectStore(t.storeName);
                                    }),
                                    (s.onsuccess = function () {
                                      var t = s.result;
                                      t.close(), e(t);
                                    });
                                })
                                  .then(function (t) {
                                    n.db = t;
                                    for (var e = 0; e < s.length; e++) {
                                      var i = s[e];
                                      (i._dbInfo.db = t), m(i._dbInfo);
                                    }
                                  })
                                  .catch(function (e) {
                                    throw (
                                      ((v(t, e) || o.resolve()).catch(
                                        function () {},
                                      ),
                                      e)
                                    );
                                  });
                              }
                            })
                          : l.then(function (e) {
                              g(t);
                              var i = d[t.name],
                                n = i.forages;
                              e.close();
                              for (var s = 0; s < n.length; s++)
                                n[s]._dbInfo.db = null;
                              return new o(function (e, i) {
                                var n = r.deleteDatabase(t.name);
                                (n.onerror = function () {
                                  var t = n.result;
                                  t && t.close(), i(n.error);
                                }),
                                  (n.onblocked = function () {
                                    console.warn(
                                      'dropInstance blocked for database "' +
                                        t.name +
                                        '" until all open connections are closed',
                                    );
                                  }),
                                  (n.onsuccess = function () {
                                    var t = n.result;
                                    t && t.close(), e(t);
                                  });
                              })
                                .then(function (t) {
                                  i.db = t;
                                  for (var e = 0; e < n.length; e++)
                                    m(n[e]._dbInfo);
                                })
                                .catch(function (e) {
                                  throw (
                                    ((v(t, e) || o.resolve()).catch(
                                      function () {},
                                    ),
                                    e)
                                  );
                                });
                            });
                      } else n = o.reject("Invalid arguments");
                      return a(n, e), n;
                    },
                  },
                  T =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                  C = /^~~local_forage_type~([^~]+)~/,
                  I = "__lfsc__:".length,
                  k = I + "arbf".length,
                  R = Object.prototype.toString;
                function A(t) {
                  var e,
                    i,
                    n,
                    r,
                    s,
                    o = 0.75 * t.length,
                    a = t.length,
                    h = 0;
                  "=" === t[t.length - 1] &&
                    (o--, "=" === t[t.length - 2] && o--);
                  var l = new ArrayBuffer(o),
                    c = new Uint8Array(l);
                  for (e = 0; e < a; e += 4)
                    (i = T.indexOf(t[e])),
                      (n = T.indexOf(t[e + 1])),
                      (r = T.indexOf(t[e + 2])),
                      (s = T.indexOf(t[e + 3])),
                      (c[h++] = (i << 2) | (n >> 4)),
                      (c[h++] = ((15 & n) << 4) | (r >> 2)),
                      (c[h++] = ((3 & r) << 6) | (63 & s));
                  return l;
                }
                function L(t) {
                  var e,
                    i = new Uint8Array(t),
                    n = "";
                  for (e = 0; e < i.length; e += 3)
                    (n += T[i[e] >> 2]),
                      (n += T[((3 & i[e]) << 4) | (i[e + 1] >> 4)]),
                      (n += T[((15 & i[e + 1]) << 2) | (i[e + 2] >> 6)]),
                      (n += T[63 & i[e + 2]]);
                  return (
                    i.length % 3 == 2
                      ? (n = n.substring(0, n.length - 1) + "=")
                      : i.length % 3 == 1 &&
                        (n = n.substring(0, n.length - 2) + "=="),
                    n
                  );
                }
                var j = {
                  serialize: function (t, e) {
                    var i = "";
                    if (
                      (t && (i = R.call(t)),
                      t &&
                        ("[object ArrayBuffer]" === i ||
                          (t.buffer &&
                            "[object ArrayBuffer]" === R.call(t.buffer))))
                    ) {
                      var n,
                        r = "__lfsc__:";
                      t instanceof ArrayBuffer
                        ? ((n = t), (r += "arbf"))
                        : ((n = t.buffer),
                          "[object Int8Array]" === i
                            ? (r += "si08")
                            : "[object Uint8Array]" === i
                              ? (r += "ui08")
                              : "[object Uint8ClampedArray]" === i
                                ? (r += "uic8")
                                : "[object Int16Array]" === i
                                  ? (r += "si16")
                                  : "[object Uint16Array]" === i
                                    ? (r += "ur16")
                                    : "[object Int32Array]" === i
                                      ? (r += "si32")
                                      : "[object Uint32Array]" === i
                                        ? (r += "ui32")
                                        : "[object Float32Array]" === i
                                          ? (r += "fl32")
                                          : "[object Float64Array]" === i
                                            ? (r += "fl64")
                                            : e(
                                                new Error(
                                                  "Failed to get type for BinaryArray",
                                                ),
                                              )),
                        e(r + L(n));
                    } else if ("[object Blob]" === i) {
                      var s = new FileReader();
                      (s.onload = function () {
                        var i =
                          "~~local_forage_type~" +
                          t.type +
                          "~" +
                          L(this.result);
                        e("__lfsc__:blob" + i);
                      }),
                        s.readAsArrayBuffer(t);
                    } else
                      try {
                        e(JSON.stringify(t));
                      } catch (i) {
                        console.error(
                          "Couldn't convert value into a JSON string: ",
                          t,
                        ),
                          e(null, i);
                      }
                  },
                  deserialize: function (t) {
                    if ("__lfsc__:" !== t.substring(0, I)) return JSON.parse(t);
                    var e,
                      i = t.substring(k),
                      n = t.substring(I, k);
                    if ("blob" === n && C.test(i)) {
                      var r = i.match(C);
                      (e = r[1]), (i = i.substring(r[0].length));
                    }
                    var o = A(i);
                    switch (n) {
                      case "arbf":
                        return o;
                      case "blob":
                        return s([o], { type: e });
                      case "si08":
                        return new Int8Array(o);
                      case "ui08":
                        return new Uint8Array(o);
                      case "uic8":
                        return new Uint8ClampedArray(o);
                      case "si16":
                        return new Int16Array(o);
                      case "ur16":
                        return new Uint16Array(o);
                      case "si32":
                        return new Int32Array(o);
                      case "ui32":
                        return new Uint32Array(o);
                      case "fl32":
                        return new Float32Array(o);
                      case "fl64":
                        return new Float64Array(o);
                      default:
                        throw new Error("Unkown type: " + n);
                    }
                  },
                  stringToBuffer: A,
                  bufferToString: L,
                };
                function D(t, e, i, n) {
                  t.executeSql(
                    "CREATE TABLE IF NOT EXISTS " +
                      e.storeName +
                      " (id INTEGER PRIMARY KEY, key unique, value)",
                    [],
                    i,
                    n,
                  );
                }
                function P(t, e, i, n, r, s) {
                  t.executeSql(
                    i,
                    n,
                    r,
                    function (t, o) {
                      o.code === o.SYNTAX_ERR
                        ? t.executeSql(
                            "SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
                            [e.storeName],
                            function (t, a) {
                              a.rows.length
                                ? s(t, o)
                                : D(
                                    t,
                                    e,
                                    function () {
                                      t.executeSql(i, n, r, s);
                                    },
                                    s,
                                  );
                            },
                            s,
                          )
                        : s(t, o);
                    },
                    s,
                  );
                }
                function M(t, e, i, n) {
                  var r = this;
                  t = l(t);
                  var s = new o(function (s, o) {
                    r.ready()
                      .then(function () {
                        void 0 === e && (e = null);
                        var a = e,
                          h = r._dbInfo;
                        h.serializer.serialize(e, function (e, l) {
                          l
                            ? o(l)
                            : h.db.transaction(
                                function (i) {
                                  P(
                                    i,
                                    h,
                                    "INSERT OR REPLACE INTO " +
                                      h.storeName +
                                      " (key, value) VALUES (?, ?)",
                                    [t, e],
                                    function () {
                                      s(a);
                                    },
                                    function (t, e) {
                                      o(e);
                                    },
                                  );
                                },
                                function (e) {
                                  if (e.code === e.QUOTA_ERR) {
                                    if (n > 0)
                                      return void s(
                                        M.apply(r, [t, a, i, n - 1]),
                                      );
                                    o(e);
                                  }
                                },
                              );
                        });
                      })
                      .catch(o);
                  });
                  return a(s, i), s;
                }
                function z(t) {
                  return new o(function (e, i) {
                    t.transaction(
                      function (n) {
                        n.executeSql(
                          "SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",
                          [],
                          function (i, n) {
                            for (var r = [], s = 0; s < n.rows.length; s++)
                              r.push(n.rows.item(s).name);
                            e({ db: t, storeNames: r });
                          },
                          function (t, e) {
                            i(e);
                          },
                        );
                      },
                      function (t) {
                        i(t);
                      },
                    );
                  });
                }
                var B = {
                  _driver: "webSQLStorage",
                  _initStorage: function (t) {
                    var e = this,
                      i = { db: null };
                    if (t)
                      for (var n in t)
                        i[n] = "string" != typeof t[n] ? t[n].toString() : t[n];
                    var r = new o(function (t, n) {
                      try {
                        i.db = openDatabase(
                          i.name,
                          String(i.version),
                          i.description,
                          i.size,
                        );
                      } catch (t) {
                        return n(t);
                      }
                      i.db.transaction(function (r) {
                        D(
                          r,
                          i,
                          function () {
                            (e._dbInfo = i), t();
                          },
                          function (t, e) {
                            n(e);
                          },
                        );
                      }, n);
                    });
                    return (i.serializer = j), r;
                  },
                  _support: "function" == typeof openDatabase,
                  iterate: function (t, e) {
                    var i = this,
                      n = new o(function (e, n) {
                        i.ready()
                          .then(function () {
                            var r = i._dbInfo;
                            r.db.transaction(function (i) {
                              P(
                                i,
                                r,
                                "SELECT * FROM " + r.storeName,
                                [],
                                function (i, n) {
                                  for (
                                    var s = n.rows, o = s.length, a = 0;
                                    a < o;
                                    a++
                                  ) {
                                    var h = s.item(a),
                                      l = h.value;
                                    if (
                                      (l && (l = r.serializer.deserialize(l)),
                                      void 0 !== (l = t(l, h.key, a + 1)))
                                    )
                                      return void e(l);
                                  }
                                  e();
                                },
                                function (t, e) {
                                  n(e);
                                },
                              );
                            });
                          })
                          .catch(n);
                      });
                    return a(n, e), n;
                  },
                  getItem: function (t, e) {
                    var i = this;
                    t = l(t);
                    var n = new o(function (e, n) {
                      i.ready()
                        .then(function () {
                          var r = i._dbInfo;
                          r.db.transaction(function (i) {
                            P(
                              i,
                              r,
                              "SELECT * FROM " +
                                r.storeName +
                                " WHERE key = ? LIMIT 1",
                              [t],
                              function (t, i) {
                                var n = i.rows.length
                                  ? i.rows.item(0).value
                                  : null;
                                n && (n = r.serializer.deserialize(n)), e(n);
                              },
                              function (t, e) {
                                n(e);
                              },
                            );
                          });
                        })
                        .catch(n);
                    });
                    return a(n, e), n;
                  },
                  setItem: function (t, e, i) {
                    return M.apply(this, [t, e, i, 1]);
                  },
                  removeItem: function (t, e) {
                    var i = this;
                    t = l(t);
                    var n = new o(function (e, n) {
                      i.ready()
                        .then(function () {
                          var r = i._dbInfo;
                          r.db.transaction(function (i) {
                            P(
                              i,
                              r,
                              "DELETE FROM " + r.storeName + " WHERE key = ?",
                              [t],
                              function () {
                                e();
                              },
                              function (t, e) {
                                n(e);
                              },
                            );
                          });
                        })
                        .catch(n);
                    });
                    return a(n, e), n;
                  },
                  clear: function (t) {
                    var e = this,
                      i = new o(function (t, i) {
                        e.ready()
                          .then(function () {
                            var n = e._dbInfo;
                            n.db.transaction(function (e) {
                              P(
                                e,
                                n,
                                "DELETE FROM " + n.storeName,
                                [],
                                function () {
                                  t();
                                },
                                function (t, e) {
                                  i(e);
                                },
                              );
                            });
                          })
                          .catch(i);
                      });
                    return a(i, t), i;
                  },
                  length: function (t) {
                    var e = this,
                      i = new o(function (t, i) {
                        e.ready()
                          .then(function () {
                            var n = e._dbInfo;
                            n.db.transaction(function (e) {
                              P(
                                e,
                                n,
                                "SELECT COUNT(key) as c FROM " + n.storeName,
                                [],
                                function (e, i) {
                                  var n = i.rows.item(0).c;
                                  t(n);
                                },
                                function (t, e) {
                                  i(e);
                                },
                              );
                            });
                          })
                          .catch(i);
                      });
                    return a(i, t), i;
                  },
                  key: function (t, e) {
                    var i = this,
                      n = new o(function (e, n) {
                        i.ready()
                          .then(function () {
                            var r = i._dbInfo;
                            r.db.transaction(function (i) {
                              P(
                                i,
                                r,
                                "SELECT key FROM " +
                                  r.storeName +
                                  " WHERE id = ? LIMIT 1",
                                [t + 1],
                                function (t, i) {
                                  var n = i.rows.length
                                    ? i.rows.item(0).key
                                    : null;
                                  e(n);
                                },
                                function (t, e) {
                                  n(e);
                                },
                              );
                            });
                          })
                          .catch(n);
                      });
                    return a(n, e), n;
                  },
                  keys: function (t) {
                    var e = this,
                      i = new o(function (t, i) {
                        e.ready()
                          .then(function () {
                            var n = e._dbInfo;
                            n.db.transaction(function (e) {
                              P(
                                e,
                                n,
                                "SELECT key FROM " + n.storeName,
                                [],
                                function (e, i) {
                                  for (
                                    var n = [], r = 0;
                                    r < i.rows.length;
                                    r++
                                  )
                                    n.push(i.rows.item(r).key);
                                  t(n);
                                },
                                function (t, e) {
                                  i(e);
                                },
                              );
                            });
                          })
                          .catch(i);
                      });
                    return a(i, t), i;
                  },
                  dropInstance: function (t, e) {
                    e = c.apply(this, arguments);
                    var i = this.config();
                    (t = ("function" != typeof t && t) || {}).name ||
                      ((t.name = t.name || i.name),
                      (t.storeName = t.storeName || i.storeName));
                    var n,
                      r = this;
                    return (
                      a(
                        (n = t.name
                          ? new o(function (e) {
                              var n;
                              (n =
                                t.name === i.name
                                  ? r._dbInfo.db
                                  : openDatabase(t.name, "", "", 0)),
                                t.storeName
                                  ? e({ db: n, storeNames: [t.storeName] })
                                  : e(z(n));
                            }).then(function (t) {
                              return new o(function (e, i) {
                                t.db.transaction(
                                  function (n) {
                                    function r(t) {
                                      return new o(function (e, i) {
                                        n.executeSql(
                                          "DROP TABLE IF EXISTS " + t,
                                          [],
                                          function () {
                                            e();
                                          },
                                          function (t, e) {
                                            i(e);
                                          },
                                        );
                                      });
                                    }
                                    for (
                                      var s = [],
                                        a = 0,
                                        h = t.storeNames.length;
                                      a < h;
                                      a++
                                    )
                                      s.push(r(t.storeNames[a]));
                                    o.all(s)
                                      .then(function () {
                                        e();
                                      })
                                      .catch(function (t) {
                                        i(t);
                                      });
                                  },
                                  function (t) {
                                    i(t);
                                  },
                                );
                              });
                            })
                          : o.reject("Invalid arguments")),
                        e,
                      ),
                      n
                    );
                  },
                };
                function q(t, e) {
                  var i = t.name + "/";
                  return (
                    t.storeName !== e.storeName && (i += t.storeName + "/"), i
                  );
                }
                function F() {
                  return (
                    !(function () {
                      try {
                        return (
                          localStorage.setItem("_localforage_support_test", !0),
                          localStorage.removeItem("_localforage_support_test"),
                          !1
                        );
                      } catch (t) {
                        return !0;
                      }
                    })() || localStorage.length > 0
                  );
                }
                var U = {
                    _driver: "localStorageWrapper",
                    _initStorage: function (t) {
                      var e = {};
                      if (t) for (var i in t) e[i] = t[i];
                      return (
                        (e.keyPrefix = q(t, this._defaultConfig)),
                        F()
                          ? ((this._dbInfo = e),
                            (e.serializer = j),
                            o.resolve())
                          : o.reject()
                      );
                    },
                    _support: (function () {
                      try {
                        return (
                          "undefined" != typeof localStorage &&
                          "setItem" in localStorage &&
                          !!localStorage.setItem
                        );
                      } catch (t) {
                        return !1;
                      }
                    })(),
                    iterate: function (t, e) {
                      var i = this,
                        n = i.ready().then(function () {
                          for (
                            var e = i._dbInfo,
                              n = e.keyPrefix,
                              r = n.length,
                              s = localStorage.length,
                              o = 1,
                              a = 0;
                            a < s;
                            a++
                          ) {
                            var h = localStorage.key(a);
                            if (0 === h.indexOf(n)) {
                              var l = localStorage.getItem(h);
                              if (
                                (l && (l = e.serializer.deserialize(l)),
                                void 0 !== (l = t(l, h.substring(r), o++)))
                              )
                                return l;
                            }
                          }
                        });
                      return a(n, e), n;
                    },
                    getItem: function (t, e) {
                      var i = this;
                      t = l(t);
                      var n = i.ready().then(function () {
                        var e = i._dbInfo,
                          n = localStorage.getItem(e.keyPrefix + t);
                        return n && (n = e.serializer.deserialize(n)), n;
                      });
                      return a(n, e), n;
                    },
                    setItem: function (t, e, i) {
                      var n = this;
                      t = l(t);
                      var r = n.ready().then(function () {
                        void 0 === e && (e = null);
                        var i = e;
                        return new o(function (r, s) {
                          var o = n._dbInfo;
                          o.serializer.serialize(e, function (e, n) {
                            if (n) s(n);
                            else
                              try {
                                localStorage.setItem(o.keyPrefix + t, e), r(i);
                              } catch (t) {
                                ("QuotaExceededError" !== t.name &&
                                  "NS_ERROR_DOM_QUOTA_REACHED" !== t.name) ||
                                  s(t),
                                  s(t);
                              }
                          });
                        });
                      });
                      return a(r, i), r;
                    },
                    removeItem: function (t, e) {
                      var i = this;
                      t = l(t);
                      var n = i.ready().then(function () {
                        var e = i._dbInfo;
                        localStorage.removeItem(e.keyPrefix + t);
                      });
                      return a(n, e), n;
                    },
                    clear: function (t) {
                      var e = this,
                        i = e.ready().then(function () {
                          for (
                            var t = e._dbInfo.keyPrefix,
                              i = localStorage.length - 1;
                            i >= 0;
                            i--
                          ) {
                            var n = localStorage.key(i);
                            0 === n.indexOf(t) && localStorage.removeItem(n);
                          }
                        });
                      return a(i, t), i;
                    },
                    length: function (t) {
                      var e = this.keys().then(function (t) {
                        return t.length;
                      });
                      return a(e, t), e;
                    },
                    key: function (t, e) {
                      var i = this,
                        n = i.ready().then(function () {
                          var e,
                            n = i._dbInfo;
                          try {
                            e = localStorage.key(t);
                          } catch (t) {
                            e = null;
                          }
                          return e && (e = e.substring(n.keyPrefix.length)), e;
                        });
                      return a(n, e), n;
                    },
                    keys: function (t) {
                      var e = this,
                        i = e.ready().then(function () {
                          for (
                            var t = e._dbInfo,
                              i = localStorage.length,
                              n = [],
                              r = 0;
                            r < i;
                            r++
                          ) {
                            var s = localStorage.key(r);
                            0 === s.indexOf(t.keyPrefix) &&
                              n.push(s.substring(t.keyPrefix.length));
                          }
                          return n;
                        });
                      return a(i, t), i;
                    },
                    dropInstance: function (t, e) {
                      if (
                        ((e = c.apply(this, arguments)),
                        !(t = ("function" != typeof t && t) || {}).name)
                      ) {
                        var i = this.config();
                        (t.name = t.name || i.name),
                          (t.storeName = t.storeName || i.storeName);
                      }
                      var n,
                        r = this;
                      return (
                        a(
                          (n = t.name
                            ? new o(function (e) {
                                t.storeName
                                  ? e(q(t, r._defaultConfig))
                                  : e(t.name + "/");
                              }).then(function (t) {
                                for (
                                  var e = localStorage.length - 1;
                                  e >= 0;
                                  e--
                                ) {
                                  var i = localStorage.key(e);
                                  0 === i.indexOf(t) &&
                                    localStorage.removeItem(i);
                                }
                              })
                            : o.reject("Invalid arguments")),
                          e,
                        ),
                        n
                      );
                    },
                  },
                  W = function (t, e) {
                    for (var i, n, r = t.length, s = 0; s < r; ) {
                      if (
                        (i = t[s]) === (n = e) ||
                        ("number" == typeof i &&
                          "number" == typeof n &&
                          isNaN(i) &&
                          isNaN(n))
                      )
                        return !0;
                      s++;
                    }
                    return !1;
                  },
                  H =
                    Array.isArray ||
                    function (t) {
                      return (
                        "[object Array]" === Object.prototype.toString.call(t)
                      );
                    },
                  V = {},
                  X = {},
                  G = { INDEXEDDB: O, WEBSQL: B, LOCALSTORAGE: U },
                  Y = [
                    G.INDEXEDDB._driver,
                    G.WEBSQL._driver,
                    G.LOCALSTORAGE._driver,
                  ],
                  $ = ["dropInstance"],
                  K = [
                    "clear",
                    "getItem",
                    "iterate",
                    "key",
                    "keys",
                    "length",
                    "removeItem",
                    "setItem",
                  ].concat($),
                  Z = {
                    description: "",
                    driver: Y.slice(),
                    name: "localforage",
                    size: 4980736,
                    storeName: "keyvaluepairs",
                    version: 1,
                  };
                function J(t, e) {
                  t[e] = function () {
                    var i = arguments;
                    return t.ready().then(function () {
                      return t[e].apply(t, i);
                    });
                  };
                }
                function Q() {
                  for (var t = 1; t < arguments.length; t++) {
                    var e = arguments[t];
                    if (e)
                      for (var i in e)
                        e.hasOwnProperty(i) &&
                          (H(e[i])
                            ? (arguments[0][i] = e[i].slice())
                            : (arguments[0][i] = e[i]));
                  }
                  return arguments[0];
                }
                var tt = new ((function () {
                  function t(e) {
                    for (var i in ((function (t, e) {
                      if (!(t instanceof e))
                        throw new TypeError(
                          "Cannot call a class as a function",
                        );
                    })(this, t),
                    G))
                      if (G.hasOwnProperty(i)) {
                        var n = G[i],
                          r = n._driver;
                        (this[i] = r), V[r] || this.defineDriver(n);
                      }
                    (this._defaultConfig = Q({}, Z)),
                      (this._config = Q({}, this._defaultConfig, e)),
                      (this._driverSet = null),
                      (this._initDriver = null),
                      (this._ready = !1),
                      (this._dbInfo = null),
                      this._wrapLibraryMethodsWithReady(),
                      this.setDriver(this._config.driver).catch(function () {});
                  }
                  return (
                    (t.prototype.config = function (t) {
                      if ("object" === (void 0 === t ? "undefined" : n(t))) {
                        if (this._ready)
                          return new Error(
                            "Can't call config() after localforage has been used.",
                          );
                        for (var e in t) {
                          if (
                            ("storeName" === e &&
                              (t[e] = t[e].replace(/\\W/g, "_")),
                            "version" === e && "number" != typeof t[e])
                          )
                            return new Error(
                              "Database version must be a number.",
                            );
                          this._config[e] = t[e];
                        }
                        return (
                          !("driver" in t) ||
                          !t.driver ||
                          this.setDriver(this._config.driver)
                        );
                      }
                      return "string" == typeof t
                        ? this._config[t]
                        : this._config;
                    }),
                    (t.prototype.defineDriver = function (t, e, i) {
                      var n = new o(function (e, i) {
                        try {
                          var n = t._driver,
                            r = new Error(
                              "Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver",
                            );
                          if (!t._driver) return void i(r);
                          for (
                            var s = K.concat("_initStorage"),
                              h = 0,
                              l = s.length;
                            h < l;
                            h++
                          ) {
                            var c = s[h];
                            if ((!W($, c) || t[c]) && "function" != typeof t[c])
                              return void i(r);
                          }
                          !(function () {
                            for (
                              var e = function (t) {
                                  return function () {
                                    var e = new Error(
                                        "Method " +
                                          t +
                                          " is not implemented by the current driver",
                                      ),
                                      i = o.reject(e);
                                    return (
                                      a(i, arguments[arguments.length - 1]), i
                                    );
                                  };
                                },
                                i = 0,
                                n = $.length;
                              i < n;
                              i++
                            ) {
                              var r = $[i];
                              t[r] || (t[r] = e(r));
                            }
                          })();
                          var u = function (i) {
                            V[n] &&
                              console.info(
                                "Redefining LocalForage driver: " + n,
                              ),
                              (V[n] = t),
                              (X[n] = i),
                              e();
                          };
                          "_support" in t
                            ? t._support && "function" == typeof t._support
                              ? t._support().then(u, i)
                              : u(!!t._support)
                            : u(!0);
                        } catch (t) {
                          i(t);
                        }
                      });
                      return h(n, e, i), n;
                    }),
                    (t.prototype.driver = function () {
                      return this._driver || null;
                    }),
                    (t.prototype.getDriver = function (t, e, i) {
                      var n = V[t]
                        ? o.resolve(V[t])
                        : o.reject(new Error("Driver not found."));
                      return h(n, e, i), n;
                    }),
                    (t.prototype.getSerializer = function (t) {
                      var e = o.resolve(j);
                      return h(e, t), e;
                    }),
                    (t.prototype.ready = function (t) {
                      var e = this,
                        i = e._driverSet.then(function () {
                          return (
                            null === e._ready && (e._ready = e._initDriver()),
                            e._ready
                          );
                        });
                      return h(i, t, t), i;
                    }),
                    (t.prototype.setDriver = function (t, e, i) {
                      var n = this;
                      H(t) || (t = [t]);
                      var r = this._getSupportedDrivers(t);
                      function s() {
                        n._config.driver = n.driver();
                      }
                      function a(t) {
                        return (
                          n._extend(t),
                          s(),
                          (n._ready = n._initStorage(n._config)),
                          n._ready
                        );
                      }
                      var l =
                        null !== this._driverSet
                          ? this._driverSet.catch(function () {
                              return o.resolve();
                            })
                          : o.resolve();
                      return (
                        (this._driverSet = l
                          .then(function () {
                            var t = r[0];
                            return (
                              (n._dbInfo = null),
                              (n._ready = null),
                              n.getDriver(t).then(function (t) {
                                (n._driver = t._driver),
                                  s(),
                                  n._wrapLibraryMethodsWithReady(),
                                  (n._initDriver = (function (t) {
                                    return function () {
                                      var e = 0;
                                      return (function i() {
                                        for (; e < t.length; ) {
                                          var r = t[e];
                                          return (
                                            e++,
                                            (n._dbInfo = null),
                                            (n._ready = null),
                                            n.getDriver(r).then(a).catch(i)
                                          );
                                        }
                                        s();
                                        var h = new Error(
                                          "No available storage method found.",
                                        );
                                        return (
                                          (n._driverSet = o.reject(h)),
                                          n._driverSet
                                        );
                                      })();
                                    };
                                  })(r));
                              })
                            );
                          })
                          .catch(function () {
                            s();
                            var t = new Error(
                              "No available storage method found.",
                            );
                            return (n._driverSet = o.reject(t)), n._driverSet;
                          })),
                        h(this._driverSet, e, i),
                        this._driverSet
                      );
                    }),
                    (t.prototype.supports = function (t) {
                      return !!X[t];
                    }),
                    (t.prototype._extend = function (t) {
                      Q(this, t);
                    }),
                    (t.prototype._getSupportedDrivers = function (t) {
                      for (var e = [], i = 0, n = t.length; i < n; i++) {
                        var r = t[i];
                        this.supports(r) && e.push(r);
                      }
                      return e;
                    }),
                    (t.prototype._wrapLibraryMethodsWithReady = function () {
                      for (var t = 0, e = K.length; t < e; t++) J(this, K[t]);
                    }),
                    (t.prototype.createInstance = function (e) {
                      return new t(e);
                    }),
                    t
                  );
                })())();
                e.exports = tt;
              },
              { 3: 3 },
            ],
          },
          {},
          [4],
        )(4);
      }).call(this, i(25));
    },
    function (t, e, i) {
      "use strict";
      var n = i(3),
        r = i.n(n),
        s = i(0),
        o = i(5),
        a = i(4),
        h = i(2),
        l = i(6),
        c = i(10);
      var u = function (t, e, i, n) {
          var r,
            o = "undefined" != typeof window && window.URL,
            h = o ? "blob" : "arraybuffer",
            l = new s.defer(),
            c = new XMLHttpRequest(),
            u = XMLHttpRequest.prototype;
          for (r in ("overrideMimeType" in u ||
            Object.defineProperty(u, "overrideMimeType", {
              value: function () {},
            }),
          i && (c.withCredentials = !0),
          (c.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
              var t = !1;
              if (
                (("" !== this.responseType &&
                  "document" !== this.responseType) ||
                  (t = this.responseXML),
                200 === this.status || 0 === this.status || t)
              ) {
                var i;
                if (!this.response && !t)
                  return (
                    l.reject({
                      status: this.status,
                      message: "Empty Response",
                      stack: new Error().stack,
                    }),
                    l.promise
                  );
                if (403 === this.status)
                  return (
                    l.reject({
                      status: this.status,
                      response: this.response,
                      message: "Forbidden",
                      stack: new Error().stack,
                    }),
                    l.promise
                  );
                (i = t
                  ? this.responseXML
                  : Object(s.isXml)(e)
                    ? Object(s.parse)(this.response, "text/xml")
                    : "xhtml" == e
                      ? Object(s.parse)(this.response, "application/xhtml+xml")
                      : "html" == e || "htm" == e
                        ? Object(s.parse)(this.response, "text/html")
                        : "json" == e
                          ? JSON.parse(this.response)
                          : "blob" == e
                            ? o
                              ? this.response
                              : new Blob([this.response])
                            : this.response),
                  l.resolve(i);
              } else
                l.reject({
                  status: this.status,
                  message: this.response,
                  stack: new Error().stack,
                });
            }
          }),
          (c.onerror = function (t) {
            l.reject(t);
          }),
          c.open("GET", t, !0),
          n))
            c.setRequestHeader(r, n[r]);
          return (
            "json" == e && c.setRequestHeader("Accept", "application/json"),
            e || (e = new a.a(t).extension),
            "blob" == e && (c.responseType = h),
            Object(s.isXml)(e) && c.overrideMimeType("text/xml"),
            "binary" == e && (c.responseType = "arraybuffer"),
            c.send(),
            l.promise
          );
        },
        d = i(28);
      var f = class {
        constructor(t, e) {
          (this.idref = t.idref),
            (this.linear = "yes" === t.linear),
            (this.properties = t.properties),
            (this.index = t.index),
            (this.href = t.href),
            (this.url = t.url),
            (this.canonical = t.canonical),
            (this.next = t.next),
            (this.prev = t.prev),
            (this.cfiBase = t.cfiBase),
            e
              ? (this.hooks = e)
              : ((this.hooks = {}),
                (this.hooks.serialize = new l.a(this)),
                (this.hooks.content = new l.a(this))),
            (this.document = void 0),
            (this.contents = void 0),
            (this.output = void 0);
        }
        load(t) {
          var e = t || this.request || u,
            i = new s.defer(),
            n = i.promise;
          return (
            this.contents
              ? i.resolve(this.contents)
              : e(this.url)
                  .then(
                    function (t) {
                      return (
                        (this.document = t),
                        (this.contents = t.documentElement),
                        this.hooks.content.trigger(this.document, this)
                      );
                    }.bind(this),
                  )
                  .then(
                    function () {
                      i.resolve(this.contents);
                    }.bind(this),
                  )
                  .catch(function (t) {
                    i.reject(t);
                  }),
            n
          );
        }
        base() {
          return Object(c.a)(this.document, this);
        }
        render(t) {
          var e = new s.defer(),
            i = e.promise;
          return (
            this.output,
            this.load(t)
              .then(
                function (t) {
                  var e =
                      (
                        ("undefined" != typeof navigator &&
                          navigator.userAgent) ||
                        ""
                      ).indexOf("Trident") >= 0,
                    i = new (
                      "undefined" == typeof XMLSerializer || e
                        ? d.DOMParser
                        : XMLSerializer
                    )();
                  return (this.output = i.serializeToString(t)), this.output;
                }.bind(this),
              )
              .then(
                function () {
                  return this.hooks.serialize.trigger(this.output, this);
                }.bind(this),
              )
              .then(
                function () {
                  e.resolve(this.output);
                }.bind(this),
              )
              .catch(function (t) {
                e.reject(t);
              }),
            i
          );
        }
        find(t) {
          var e = this,
            i = [],
            n = t.toLowerCase();
          return (
            Object(s.sprint)(e.document, function (t) {
              !(function (t) {
                for (
                  var r,
                    s,
                    o,
                    a = t.textContent.toLowerCase(),
                    h = e.document.createRange(),
                    l = -1;
                  -1 != s;

                )
                  -1 != (s = a.indexOf(n, l + 1)) &&
                    ((h = e.document.createRange()).setStart(t, s),
                    h.setEnd(t, s + n.length),
                    (r = e.cfiFromRange(h)),
                    (o =
                      t.textContent.length < 150
                        ? t.textContent
                        : "..." +
                          (o = t.textContent.substring(s - 75, s + 75)) +
                          "..."),
                    i.push({ cfi: r, excerpt: o })),
                    (l = s);
              })(t);
            }),
            i
          );
        }
        search(t, e = 5) {
          if (void 0 === document.createTreeWalker) return this.find(t);
          let i = [];
          const n = this,
            r = t.toLowerCase(),
            s = function (t) {
              const e = t
                .reduce((t, e) => t + e.textContent, "")
                .toLowerCase()
                .indexOf(r);
              if (-1 != e) {
                const s = 0,
                  o = e + r.length;
                let a = 0,
                  h = 0;
                if (e < t[s].length) {
                  let r;
                  for (; a < t.length - 1 && ((h += t[a].length), !(o <= h)); )
                    a += 1;
                  let l = t[s],
                    c = t[a],
                    u = n.document.createRange();
                  u.setStart(l, e);
                  let d = t
                    .slice(0, a)
                    .reduce((t, e) => t + e.textContent.length, 0);
                  u.setEnd(c, d > o ? o : o - d), (r = n.cfiFromRange(u));
                  let f = t
                    .slice(0, a + 1)
                    .reduce((t, e) => t + e.textContent, "");
                  f.length > 150 &&
                    ((f = f.substring(e - 75, e + 75)),
                    (f = "..." + f + "...")),
                    i.push({ cfi: r, excerpt: f });
                }
              }
            },
            o = document.createTreeWalker(
              n.document,
              NodeFilter.SHOW_TEXT,
              null,
              !1,
            );
          let a,
            h = [];
          for (; (a = o.nextNode()); )
            h.push(a), h.length == e && (s(h.slice(0, e)), (h = h.slice(1, e)));
          return h.length > 0 && s(h), i;
        }
        reconcileLayoutSettings(t) {
          var e = {
            layout: t.layout,
            spread: t.spread,
            orientation: t.orientation,
          };
          return (
            this.properties.forEach(function (t) {
              var i,
                n,
                r = t.replace("rendition:", ""),
                s = r.indexOf("-");
              -1 != s &&
                ((i = r.slice(0, s)), (n = r.slice(s + 1)), (e[i] = n));
            }),
            e
          );
        }
        cfiFromRange(t) {
          return new h.a(t, this.cfiBase).toString();
        }
        cfiFromElement(t) {
          return new h.a(t, this.cfiBase).toString();
        }
        unload() {
          (this.document = void 0),
            (this.contents = void 0),
            (this.output = void 0);
        }
        destroy() {
          this.unload(),
            this.hooks.serialize.clear(),
            this.hooks.content.clear(),
            (this.hooks = void 0),
            (this.idref = void 0),
            (this.linear = void 0),
            (this.properties = void 0),
            (this.index = void 0),
            (this.href = void 0),
            (this.url = void 0),
            (this.next = void 0),
            (this.prev = void 0),
            (this.cfiBase = void 0);
        }
      };
      var p = class {
          constructor() {
            (this.spineItems = []),
              (this.spineByHref = {}),
              (this.spineById = {}),
              (this.hooks = {}),
              (this.hooks.serialize = new l.a()),
              (this.hooks.content = new l.a()),
              this.hooks.content.register(c.a),
              this.hooks.content.register(c.b),
              this.hooks.content.register(c.d),
              (this.epubcfi = new h.a()),
              (this.loaded = !1),
              (this.items = void 0),
              (this.manifest = void 0),
              (this.spineNodeIndex = void 0),
              (this.baseUrl = void 0),
              (this.length = void 0);
          }
          unpack(t, e, i) {
            (this.items = t.spine),
              (this.manifest = t.manifest),
              (this.spineNodeIndex = t.spineNodeIndex),
              (this.baseUrl = t.baseUrl || t.basePath || ""),
              (this.length = this.items.length),
              this.items.forEach((t, n) => {
                var r,
                  s = this.manifest[t.idref];
                (t.index = n),
                  (t.cfiBase = this.epubcfi.generateChapterComponent(
                    this.spineNodeIndex,
                    t.index,
                    t.id,
                  )),
                  t.href &&
                    ((t.url = e(t.href, !0)), (t.canonical = i(t.href))),
                  s &&
                    ((t.href = s.href),
                    (t.url = e(t.href, !0)),
                    (t.canonical = i(t.href)),
                    s.properties.length &&
                      t.properties.push.apply(t.properties, s.properties)),
                  "yes" === t.linear
                    ? ((t.prev = function () {
                        let e = t.index;
                        for (; e > 0; ) {
                          let t = this.get(e - 1);
                          if (t && t.linear) return t;
                          e -= 1;
                        }
                      }.bind(this)),
                      (t.next = function () {
                        let e = t.index;
                        for (; e < this.spineItems.length - 1; ) {
                          let t = this.get(e + 1);
                          if (t && t.linear) return t;
                          e += 1;
                        }
                      }.bind(this)))
                    : ((t.prev = function () {}), (t.next = function () {})),
                  (r = new f(t, this.hooks)),
                  this.append(r);
              }),
              (this.loaded = !0);
          }
          get(t) {
            var e = 0;
            if (void 0 === t)
              for (; e < this.spineItems.length; ) {
                let t = this.spineItems[e];
                if (t && t.linear) break;
                e += 1;
              }
            else if (this.epubcfi.isCfiString(t)) {
              e = new h.a(t).spinePos;
            } else
              "number" == typeof t || !1 === isNaN(t)
                ? (e = t)
                : "string" == typeof t && 0 === t.indexOf("#")
                  ? (e = this.spineById[t.substring(1)])
                  : "string" == typeof t &&
                    ((t = t.split("#")[0]),
                    (e =
                      this.spineByHref[t] || this.spineByHref[encodeURI(t)]));
            return this.spineItems[e] || null;
          }
          append(t) {
            var e = this.spineItems.length;
            return (
              (t.index = e),
              this.spineItems.push(t),
              (this.spineByHref[decodeURI(t.href)] = e),
              (this.spineByHref[encodeURI(t.href)] = e),
              (this.spineByHref[t.href] = e),
              (this.spineById[t.idref] = e),
              e
            );
          }
          prepend(t) {
            return (
              (this.spineByHref[t.href] = 0),
              (this.spineById[t.idref] = 0),
              this.spineItems.forEach(function (t, e) {
                t.index = e;
              }),
              0
            );
          }
          remove(t) {
            var e = this.spineItems.indexOf(t);
            if (e > -1)
              return (
                delete this.spineByHref[t.href],
                delete this.spineById[t.idref],
                this.spineItems.splice(e, 1)
              );
          }
          each() {
            return this.spineItems.forEach.apply(this.spineItems, arguments);
          }
          first() {
            let t = 0;
            do {
              let e = this.get(t);
              if (e && e.linear) return e;
              t += 1;
            } while (t < this.spineItems.length);
          }
          last() {
            let t = this.spineItems.length - 1;
            do {
              let e = this.get(t);
              if (e && e.linear) return e;
              t -= 1;
            } while (t >= 0);
          }
          destroy() {
            this.each((t) => t.destroy()),
              (this.spineItems = void 0),
              (this.spineByHref = void 0),
              (this.spineById = void 0),
              this.hooks.serialize.clear(),
              this.hooks.content.clear(),
              (this.hooks = void 0),
              (this.epubcfi = void 0),
              (this.loaded = !1),
              (this.items = void 0),
              (this.manifest = void 0),
              (this.spineNodeIndex = void 0),
              (this.baseUrl = void 0),
              (this.length = void 0);
          }
        },
        g = i(15),
        m = i(1);
      class v {
        constructor(t, e, i) {
          (this.spine = t),
            (this.request = e),
            (this.pause = i || 100),
            (this.q = new g.a(this)),
            (this.epubcfi = new h.a()),
            (this._locations = []),
            (this._locationsWords = []),
            (this.total = 0),
            (this.break = 150),
            (this._current = 0),
            (this._wordCounter = 0),
            (this.currentLocation = ""),
            (this._currentCfi = ""),
            (this.processingTimeout = void 0);
        }
        generate(t) {
          return (
            t && (this.break = t),
            this.q.pause(),
            this.spine.each(
              function (t) {
                t.linear && this.q.enqueue(this.process.bind(this), t);
              }.bind(this),
            ),
            this.q.run().then(
              function () {
                return (
                  (this.total = this._locations.length - 1),
                  this._currentCfi && (this.currentLocation = this._currentCfi),
                  this._locations
                );
              }.bind(this),
            )
          );
        }
        createRange() {
          return {
            startContainer: void 0,
            startOffset: void 0,
            endContainer: void 0,
            endOffset: void 0,
          };
        }
        process(t) {
          return t.load(this.request).then(
            function (e) {
              var i = new s.defer(),
                n = this.parse(e, t.cfiBase);
              return (
                (this._locations = this._locations.concat(n)),
                t.unload(),
                (this.processingTimeout = setTimeout(
                  () => i.resolve(n),
                  this.pause,
                )),
                i.promise
              );
            }.bind(this),
          );
        }
        parse(t, e, i) {
          var n,
            r,
            o = [],
            a = t.ownerDocument,
            l = Object(s.qs)(a, "body"),
            c = 0,
            u = i || this.break;
          if (
            (Object(s.sprint)(
              l,
              function (t) {
                var i,
                  s = t.length,
                  a = 0;
                if (0 === t.textContent.trim().length) return !1;
                for (
                  0 == c &&
                    (((n = this.createRange()).startContainer = t),
                    (n.startOffset = 0)),
                    (i = u - c) > s && ((c += s), (a = s));
                  a < s;

                )
                  if (
                    ((i = u - c),
                    0 === c &&
                      ((a += 1),
                      ((n = this.createRange()).startContainer = t),
                      (n.startOffset = a)),
                    a + i >= s)
                  )
                    (c += s - a), (a = s);
                  else {
                    (a += i), (n.endContainer = t), (n.endOffset = a);
                    let r = new h.a(n, e).toString();
                    o.push(r), (c = 0);
                  }
                r = t;
              }.bind(this),
            ),
            n && n.startContainer && r)
          ) {
            (n.endContainer = r), (n.endOffset = r.length);
            let t = new h.a(n, e).toString();
            o.push(t), (c = 0);
          }
          return o;
        }
        generateFromWords(t, e, i) {
          var n = t ? new h.a(t) : void 0;
          return (
            this.q.pause(),
            (this._locationsWords = []),
            (this._wordCounter = 0),
            this.spine.each(
              function (t) {
                t.linear &&
                  (n
                    ? t.index >= n.spinePos &&
                      this.q.enqueue(this.processWords.bind(this), t, e, n, i)
                    : this.q.enqueue(this.processWords.bind(this), t, e, n, i));
              }.bind(this),
            ),
            this.q.run().then(
              function () {
                return (
                  this._currentCfi && (this.currentLocation = this._currentCfi),
                  this._locationsWords
                );
              }.bind(this),
            )
          );
        }
        processWords(t, e, i, n) {
          return n && this._locationsWords.length >= n
            ? Promise.resolve()
            : t.load(this.request).then(
                function (r) {
                  var o = new s.defer(),
                    a = this.parseWords(r, t, e, i),
                    h = n - this._locationsWords.length;
                  return (
                    (this._locationsWords = this._locationsWords.concat(
                      a.length >= n ? a.slice(0, h) : a,
                    )),
                    t.unload(),
                    (this.processingTimeout = setTimeout(
                      () => o.resolve(a),
                      this.pause,
                    )),
                    o.promise
                  );
                }.bind(this),
              );
        }
        countWords(t) {
          return (t = (t = (t = t.replace(/(^\\s*)|(\\s*$)/gi, "")).replace(
            /[ ]{2,}/gi,
            " ",
          )).replace(/\\n /, "\\n")).split(" ").length;
        }
        parseWords(t, e, i, n) {
          var r,
            o = e.cfiBase,
            a = [],
            l = t.ownerDocument,
            c = Object(s.qs)(l, "body"),
            u = i,
            d = !n || n.spinePos !== e.index;
          n &&
            e.index === n.spinePos &&
            (r = n.findNode(
              n.range ? n.path.steps.concat(n.start.steps) : n.path.steps,
              t.ownerDocument,
            ));
          return (
            Object(s.sprint)(
              c,
              function (t) {
                if (!d) {
                  if (t !== r) return !1;
                  d = !0;
                }
                if (
                  t.textContent.length < 10 &&
                  0 === t.textContent.trim().length
                )
                  return !1;
                var e,
                  i = this.countWords(t.textContent),
                  n = 0;
                if (0 === i) return !1;
                for (
                  (e = u - this._wordCounter) > i &&
                  ((this._wordCounter += i), (n = i));
                  n < i;

                )
                  if (n + (e = u - this._wordCounter) >= i)
                    (this._wordCounter += i - n), (n = i);
                  else {
                    n += e;
                    let i = new h.a(t, o);
                    a.push({ cfi: i.toString(), wordCount: this._wordCounter }),
                      (this._wordCounter = 0);
                  }
                t;
              }.bind(this),
            ),
            a
          );
        }
        locationFromCfi(t) {
          let e;
          return (
            h.a.prototype.isCfiString(t) && (t = new h.a(t)),
            0 === this._locations.length
              ? -1
              : ((e = Object(s.locationOf)(
                  t,
                  this._locations,
                  this.epubcfi.compare,
                )),
                e > this.total ? this.total : e)
          );
        }
        percentageFromCfi(t) {
          if (0 === this._locations.length) return null;
          var e = this.locationFromCfi(t);
          return this.percentageFromLocation(e);
        }
        percentageFromLocation(t) {
          return t && this.total ? t / this.total : 0;
        }
        cfiFromLocation(t) {
          var e = -1;
          return (
            "number" != typeof t && (t = parseInt(t)),
            t >= 0 && t < this._locations.length && (e = this._locations[t]),
            e
          );
        }
        cfiFromPercentage(t) {
          let e;
          if (
            (t > 1 &&
              console.warn(
                "Normalize cfiFromPercentage value to between 0 - 1",
              ),
            t >= 1)
          ) {
            let t = new h.a(this._locations[this.total]);
            return t.collapse(), t.toString();
          }
          return (e = Math.ceil(this.total * t)), this.cfiFromLocation(e);
        }
        load(t) {
          return (
            (this._locations = "string" == typeof t ? JSON.parse(t) : t),
            (this.total = this._locations.length - 1),
            this._locations
          );
        }
        save() {
          return JSON.stringify(this._locations);
        }
        getCurrent() {
          return this._current;
        }
        setCurrent(t) {
          var e;
          if ("string" == typeof t) this._currentCfi = t;
          else {
            if ("number" != typeof t) return;
            this._current = t;
          }
          0 !== this._locations.length &&
            ("string" == typeof t
              ? ((e = this.locationFromCfi(t)), (this._current = e))
              : (e = t),
            this.emit(m.c.LOCATIONS.CHANGED, {
              percentage: this.percentageFromLocation(e),
            }));
        }
        get currentLocation() {
          return this._current;
        }
        set currentLocation(t) {
          this.setCurrent(t);
        }
        length() {
          return this._locations.length;
        }
        destroy() {
          (this.spine = void 0),
            (this.request = void 0),
            (this.pause = void 0),
            this.q.stop(),
            (this.q = void 0),
            (this.epubcfi = void 0),
            (this._locations = void 0),
            (this.total = void 0),
            (this.break = void 0),
            (this._current = void 0),
            (this.currentLocation = void 0),
            (this._currentCfi = void 0),
            clearTimeout(this.processingTimeout);
        }
      }
      r()(v.prototype);
      var y = v,
        b = i(8),
        w = i.n(b);
      var x = class {
        constructor(t) {
          (this.packagePath = ""),
            (this.directory = ""),
            (this.encoding = ""),
            t && this.parse(t);
        }
        parse(t) {
          var e;
          if (!t) throw new Error("Container File Not Found");
          if (!(e = Object(s.qs)(t, "rootfile")))
            throw new Error("No RootFile Found");
          (this.packagePath = e.getAttribute("full-path")),
            (this.directory = w.a.dirname(this.packagePath)),
            (this.encoding = t.xmlEncoding);
        }
        destroy() {
          (this.packagePath = void 0),
            (this.directory = void 0),
            (this.encoding = void 0);
        }
      };
      var E = class {
        constructor(t) {
          (this.manifest = {}),
            (this.navPath = ""),
            (this.ncxPath = ""),
            (this.coverPath = ""),
            (this.spineNodeIndex = 0),
            (this.spine = []),
            (this.metadata = {}),
            t && this.parse(t);
        }
        parse(t) {
          var e, i, n;
          if (!t) throw new Error("Package File Not Found");
          if (!(e = Object(s.qs)(t, "metadata")))
            throw new Error("No Metadata Found");
          if (!(i = Object(s.qs)(t, "manifest")))
            throw new Error("No Manifest Found");
          if (!(n = Object(s.qs)(t, "spine")))
            throw new Error("No Spine Found");
          return (
            (this.manifest = this.parseManifest(i)),
            (this.navPath = this.findNavPath(i)),
            (this.ncxPath = this.findNcxPath(i, n)),
            (this.coverPath = this.findCoverPath(t)),
            (this.spineNodeIndex = Object(s.indexOfElementNode)(n)),
            (this.spine = this.parseSpine(n, this.manifest)),
            (this.uniqueIdentifier = this.findUniqueIdentifier(t)),
            (this.metadata = this.parseMetadata(e)),
            (this.metadata.direction = n.getAttribute(
              "page-progression-direction",
            )),
            {
              metadata: this.metadata,
              spine: this.spine,
              manifest: this.manifest,
              navPath: this.navPath,
              ncxPath: this.ncxPath,
              coverPath: this.coverPath,
              spineNodeIndex: this.spineNodeIndex,
            }
          );
        }
        parseMetadata(t) {
          var e = {};
          return (
            (e.title = this.getElementText(t, "title")),
            (e.creator = this.getElementText(t, "creator")),
            (e.description = this.getElementText(t, "description")),
            (e.pubdate = this.getElementText(t, "date")),
            (e.publisher = this.getElementText(t, "publisher")),
            (e.identifier = this.getElementText(t, "identifier")),
            (e.language = this.getElementText(t, "language")),
            (e.rights = this.getElementText(t, "rights")),
            (e.modified_date = this.getPropertyText(t, "dcterms:modified")),
            (e.layout = this.getPropertyText(t, "rendition:layout")),
            (e.orientation = this.getPropertyText(t, "rendition:orientation")),
            (e.flow = this.getPropertyText(t, "rendition:flow")),
            (e.viewport = this.getPropertyText(t, "rendition:viewport")),
            (e.media_active_class = this.getPropertyText(
              t,
              "media:active-class",
            )),
            (e.spread = this.getPropertyText(t, "rendition:spread")),
            e
          );
        }
        parseManifest(t) {
          var e = {},
            i = Object(s.qsa)(t, "item");
          return (
            Array.prototype.slice.call(i).forEach(function (t) {
              var i = t.getAttribute("id"),
                n = t.getAttribute("href") || "",
                r = t.getAttribute("media-type") || "",
                s = t.getAttribute("media-overlay") || "",
                o = t.getAttribute("properties") || "";
              e[i] = {
                href: n,
                type: r,
                overlay: s,
                properties: o.length ? o.split(" ") : [],
              };
            }),
            e
          );
        }
        parseSpine(t, e) {
          var i = [],
            n = Object(s.qsa)(t, "itemref");
          return (
            Array.prototype.slice.call(n).forEach(function (t, e) {
              var n = t.getAttribute("idref"),
                r = t.getAttribute("properties") || "",
                s = r.length ? r.split(" ") : [],
                o = {
                  id: t.getAttribute("id"),
                  idref: n,
                  linear: t.getAttribute("linear") || "yes",
                  properties: s,
                  index: e,
                };
              i.push(o);
            }),
            i
          );
        }
        findUniqueIdentifier(t) {
          var e = t.documentElement.getAttribute("unique-identifier");
          if (!e) return "";
          var i = t.getElementById(e);
          return i &&
            "identifier" === i.localName &&
            "http://purl.org/dc/elements/1.1/" === i.namespaceURI &&
            i.childNodes.length > 0
            ? i.childNodes[0].nodeValue.trim()
            : "";
        }
        findNavPath(t) {
          var e = Object(s.qsp)(t, "item", { properties: "nav" });
          return !!e && e.getAttribute("href");
        }
        findNcxPath(t, e) {
          var i,
            n = Object(s.qsp)(t, "item", {
              "media-type": "application/x-dtbncx+xml",
            });
          return (
            n ||
              ((i = e.getAttribute("toc")) && (n = t.querySelector("#" + i))),
            !!n && n.getAttribute("href")
          );
        }
        findCoverPath(t) {
          Object(s.qs)(t, "package").getAttribute("version");
          var e = Object(s.qsp)(t, "item", { properties: "cover-image" });
          if (e) return e.getAttribute("href");
          var i = Object(s.qsp)(t, "meta", { name: "cover" });
          if (i) {
            var n = i.getAttribute("content"),
              r = t.getElementById(n);
            return r ? r.getAttribute("href") : "";
          }
          return !1;
        }
        getElementText(t, e) {
          var i,
            n = t.getElementsByTagNameNS("http://purl.org/dc/elements/1.1/", e);
          return n && 0 !== n.length && (i = n[0]).childNodes.length
            ? i.childNodes[0].nodeValue
            : "";
        }
        getPropertyText(t, e) {
          var i = Object(s.qsp)(t, "meta", { property: e });
          return i && i.childNodes.length ? i.childNodes[0].nodeValue : "";
        }
        load(t) {
          this.metadata = t.metadata;
          let e = t.readingOrder || t.spine;
          return (
            (this.spine = e.map(
              (t, e) => ((t.index = e), (t.linear = t.linear || "yes"), t),
            )),
            t.resources.forEach((t, e) => {
              (this.manifest[e] = t),
                t.rel && "cover" === t.rel[0] && (this.coverPath = t.href);
            }),
            (this.spineNodeIndex = 0),
            (this.toc = t.toc.map((t, e) => ((t.label = t.title), t))),
            {
              metadata: this.metadata,
              spine: this.spine,
              manifest: this.manifest,
              navPath: this.navPath,
              ncxPath: this.ncxPath,
              coverPath: this.coverPath,
              spineNodeIndex: this.spineNodeIndex,
              toc: this.toc,
            }
          );
        }
        destroy() {
          (this.manifest = void 0),
            (this.navPath = void 0),
            (this.ncxPath = void 0),
            (this.coverPath = void 0),
            (this.spineNodeIndex = void 0),
            (this.spine = void 0),
            (this.metadata = void 0);
        }
      };
      var S = class {
          constructor(t, e = "") {
            (this.toc = []),
              (this.tocByHref = {}),
              (this.tocById = {}),
              (this.landmarks = []),
              (this.landmarksByType = {}),
              (this.length = 0),
              e && (this.tocPath = new a.a(e)),
              t && this.parse(t);
          }
          parse(t) {
            let e,
              i,
              n = t.nodeType;
            n && ((e = Object(s.qs)(t, "html")), (i = Object(s.qs)(t, "ncx"))),
              n
                ? e
                  ? ((this.toc = this.parseNav(t)),
                    (this.landmarks = this.parseLandmarks(t)))
                  : i && (this.toc = this.parseNcx(t))
                : (this.toc = this.load(t)),
              (this.length = 0),
              this.unpack(this.toc);
          }
          unpack(t) {
            for (var e, i = 0; i < t.length; i++)
              (e = t[i]).href && (this.tocByHref[e.href] = i),
                e.id && (this.tocById[e.id] = i),
                this.length++,
                e.subitems.length && this.unpack(e.subitems);
          }
          get(t) {
            var e;
            return t
              ? (0 === t.indexOf("#")
                  ? (e = this.tocById[t.substring(1)])
                  : t in this.tocByHref && (e = this.tocByHref[t]),
                this.getByIndex(t, e, this.toc))
              : this.toc;
          }
          getByIndex(t, e, i) {
            if (0 === i.length) return;
            const n = i[e];
            if (!n || (t !== n.id && t !== n.href)) {
              let n;
              for (
                let r = 0;
                r < i.length &&
                ((n = this.getByIndex(t, e, i[r].subitems)), !n);
                ++r
              );
              return n;
            }
            return n;
          }
          landmark(t) {
            var e;
            return t
              ? ((e = this.landmarksByType[t]), this.landmarks[e])
              : this.landmarks;
          }
          parseNav(t) {
            var e = Object(s.querySelectorByType)(t, "nav", "toc"),
              i = [];
            if (!e) return i;
            let n = Object(s.filterChildren)(e, "ol", !0);
            return n ? (i = this.parseNavList(n)) : i;
          }
          parseNavList(t, e) {
            const i = [];
            if (!t) return i;
            if (!t.children) return i;
            for (let n = 0; n < t.children.length; n++) {
              const r = this.navItem(t.children[n], e);
              r && i.push(r);
            }
            return i;
          }
          navItem(t, e) {
            let i = t.getAttribute("id") || void 0,
              n =
                Object(s.filterChildren)(t, "a", !0) ||
                Object(s.filterChildren)(t, "span", !0);
            if (!n) return;
            const r = n.getAttribute("href") || "";
            let o = this.tocPath.join(r);
            i || (i = o);
            let a = n.textContent || "",
              h = [],
              l = Object(s.filterChildren)(t, "ol", !0);
            return (
              l && (h = this.parseNavList(l, i)),
              { id: i, href: o, label: a, subitems: h, parent: e }
            );
          }
          parseLandmarks(t) {
            var e,
              i,
              n = Object(s.querySelectorByType)(t, "nav", "landmarks"),
              r = n ? Object(s.qsa)(n, "li") : [],
              o = r.length,
              a = [];
            if (!r || 0 === o) return a;
            for (e = 0; e < o; ++e)
              (i = this.landmarkItem(r[e])) &&
                (a.push(i), (this.landmarksByType[i.type] = e));
            return a;
          }
          landmarkItem(t) {
            let e = Object(s.filterChildren)(t, "a", !0);
            if (!e) return;
            let i =
              e.getAttributeNS("http://www.idpf.org/2007/ops", "type") ||
              void 0;
            return {
              href: e.getAttribute("href") || "",
              label: e.textContent || "",
              type: i,
            };
          }
          parseNcx(t) {
            var e,
              i,
              n = Object(s.qsa)(t, "navPoint"),
              r = n.length,
              o = {},
              a = [];
            if (!n || 0 === r) return a;
            for (e = 0; e < r; ++e)
              (o[(i = this.ncxItem(n[e])).id] = i),
                i.parent ? o[i.parent].subitems.push(i) : a.push(i);
            return a;
          }
          ncxItem(t) {
            var e,
              i = t.getAttribute("id") || !1,
              n = Object(s.qs)(t, "content").getAttribute("src"),
              r = Object(s.qs)(t, "navLabel"),
              o = r.textContent ? r.textContent : "",
              a = t.parentNode;
            return (
              !a ||
                ("navPoint" !== a.nodeName &&
                  "navPoint" !== a.nodeName.split(":").slice(-1)[0]) ||
                (e = a.getAttribute("id")),
              { id: i, href: n, label: o, subitems: [], parent: e }
            );
          }
          load(t) {
            return t.map(
              (t) => (
                (t.label = t.title),
                (t.subitems = t.children ? this.load(t.children) : []),
                t
              ),
            );
          }
          forEach(t) {
            return this.toc.forEach(t);
          }
        },
        N = {
          application: {
            ecmascript: ["es", "ecma"],
            javascript: "js",
            ogg: "ogx",
            pdf: "pdf",
            postscript: ["ps", "ai", "eps", "epsi", "epsf", "eps2", "eps3"],
            "rdf+xml": "rdf",
            smil: ["smi", "smil"],
            "xhtml+xml": ["xhtml", "xht"],
            xml: ["xml", "xsl", "xsd", "opf", "ncx"],
            zip: "zip",
            "x-httpd-eruby": "rhtml",
            "x-latex": "latex",
            "x-maker": ["frm", "maker", "frame", "fm", "fb", "book", "fbdoc"],
            "x-object": "o",
            "x-shockwave-flash": ["swf", "swfl"],
            "x-silverlight": "scr",
            "epub+zip": "epub",
            "font-tdpfr": "pfr",
            "inkml+xml": ["ink", "inkml"],
            json: "json",
            "jsonml+json": "jsonml",
            "mathml+xml": "mathml",
            "metalink+xml": "metalink",
            mp4: "mp4s",
            "omdoc+xml": "omdoc",
            oxps: "oxps",
            "vnd.amazon.ebook": "azw",
            widget: "wgt",
            "x-dtbook+xml": "dtb",
            "x-dtbresource+xml": "res",
            "x-font-bdf": "bdf",
            "x-font-ghostscript": "gsf",
            "x-font-linux-psf": "psf",
            "x-font-otf": "otf",
            "x-font-pcf": "pcf",
            "x-font-snf": "snf",
            "x-font-ttf": ["ttf", "ttc"],
            "x-font-type1": ["pfa", "pfb", "pfm", "afm"],
            "x-font-woff": "woff",
            "x-mobipocket-ebook": ["prc", "mobi"],
            "x-mspublisher": "pub",
            "x-nzb": "nzb",
            "x-tgif": "obj",
            "xaml+xml": "xaml",
            "xml-dtd": "dtd",
            "xproc+xml": "xpl",
            "xslt+xml": "xslt",
            "internet-property-stream": "acx",
            "x-compress": "z",
            "x-compressed": "tgz",
            "x-gzip": "gz",
          },
          audio: {
            flac: "flac",
            midi: ["mid", "midi", "kar", "rmi"],
            mpeg: ["mpga", "mpega", "mp2", "mp3", "m4a", "mp2a", "m2a", "m3a"],
            mpegurl: "m3u",
            ogg: ["oga", "ogg", "spx"],
            "x-aiff": ["aif", "aiff", "aifc"],
            "x-ms-wma": "wma",
            "x-wav": "wav",
            adpcm: "adp",
            mp4: "mp4a",
            webm: "weba",
            "x-aac": "aac",
            "x-caf": "caf",
            "x-matroska": "mka",
            "x-pn-realaudio-plugin": "rmp",
            xm: "xm",
            mid: ["mid", "rmi"],
          },
          image: {
            gif: "gif",
            ief: "ief",
            jpeg: ["jpeg", "jpg", "jpe"],
            pcx: "pcx",
            png: "png",
            "svg+xml": ["svg", "svgz"],
            tiff: ["tiff", "tif"],
            "x-icon": "ico",
            bmp: "bmp",
            webp: "webp",
            "x-pict": ["pic", "pct"],
            "x-tga": "tga",
            "cis-cod": "cod",
          },
          text: {
            "cache-manifest": ["manifest", "appcache"],
            css: "css",
            csv: "csv",
            html: ["html", "htm", "shtml", "stm"],
            mathml: "mml",
            plain: [
              "txt",
              "text",
              "brf",
              "conf",
              "def",
              "list",
              "log",
              "in",
              "bas",
            ],
            richtext: "rtx",
            "tab-separated-values": "tsv",
            "x-bibtex": "bib",
          },
          video: {
            mpeg: ["mpeg", "mpg", "mpe", "m1v", "m2v", "mp2", "mpa", "mpv2"],
            mp4: ["mp4", "mp4v", "mpg4"],
            quicktime: ["qt", "mov"],
            ogg: "ogv",
            "vnd.mpegurl": ["mxu", "m4u"],
            "x-flv": "flv",
            "x-la-asf": ["lsf", "lsx"],
            "x-mng": "mng",
            "x-ms-asf": ["asf", "asx", "asr"],
            "x-ms-wm": "wm",
            "x-ms-wmv": "wmv",
            "x-ms-wmx": "wmx",
            "x-ms-wvx": "wvx",
            "x-msvideo": "avi",
            "x-sgi-movie": "movie",
            "x-matroska": ["mpv", "mkv", "mk3d", "mks"],
            "3gpp2": "3g2",
            h261: "h261",
            h263: "h263",
            h264: "h264",
            jpeg: "jpgv",
            jpm: ["jpm", "jpgm"],
            mj2: ["mj2", "mjp2"],
            "vnd.ms-playready.media.pyv": "pyv",
            "vnd.uvvu.mp4": ["uvu", "uvvu"],
            "vnd.vivo": "viv",
            webm: "webm",
            "x-f4v": "f4v",
            "x-m4v": "m4v",
            "x-ms-vob": "vob",
            "x-smv": "smv",
          },
        },
        _ = (function () {
          var t,
            e,
            i,
            n,
            r = {};
          for (t in N)
            if (N.hasOwnProperty(t))
              for (e in N[t])
                if (N[t].hasOwnProperty(e))
                  if ("string" == typeof (i = N[t][e])) r[i] = t + "/" + e;
                  else for (n = 0; n < i.length; n++) r[i[n]] = t + "/" + e;
          return r;
        })();
      var O = {
        lookup: function (t) {
          return (t && _[t.split(".").pop().toLowerCase()]) || "text/plain";
        },
      };
      var T = class {
        constructor(t, e) {
          (this.settings = {
            replacements: (e && e.replacements) || "base64",
            archive: e && e.archive,
            resolver: e && e.resolver,
            request: e && e.request,
          }),
            this.process(t);
        }
        process(t) {
          (this.manifest = t),
            (this.resources = Object.keys(t).map(function (e) {
              return t[e];
            })),
            (this.replacementUrls = []),
            (this.html = []),
            (this.assets = []),
            (this.css = []),
            (this.urls = []),
            (this.cssUrls = []),
            this.split(),
            this.splitUrls();
        }
        split() {
          (this.html = this.resources.filter(function (t) {
            if ("application/xhtml+xml" === t.type || "text/html" === t.type)
              return !0;
          })),
            (this.assets = this.resources.filter(function (t) {
              if ("application/xhtml+xml" !== t.type && "text/html" !== t.type)
                return !0;
            })),
            (this.css = this.resources.filter(function (t) {
              if ("text/css" === t.type) return !0;
            }));
        }
        splitUrls() {
          (this.urls = this.assets.map(
            function (t) {
              return t.href;
            }.bind(this),
          )),
            (this.cssUrls = this.css.map(function (t) {
              return t.href;
            }));
        }
        createUrl(t) {
          var e = new o.a(t),
            i = O.lookup(e.filename);
          return this.settings.archive
            ? this.settings.archive.createUrl(t, {
                base64: "base64" === this.settings.replacements,
              })
            : "base64" === this.settings.replacements
              ? this.settings
                  .request(t, "blob")
                  .then((t) => Object(s.blob2base64)(t))
                  .then((t) => Object(s.createBase64Url)(t, i))
              : this.settings
                  .request(t, "blob")
                  .then((t) => Object(s.createBlobUrl)(t, i));
        }
        replacements() {
          if ("none" === this.settings.replacements)
            return new Promise(
              function (t) {
                t(this.urls);
              }.bind(this),
            );
          var t = this.urls.map((t) => {
            var e = this.settings.resolver(t);
            return this.createUrl(e).catch((t) => (console.error(t), null));
          });
          return Promise.all(t).then(
            (t) => (
              (this.replacementUrls = t.filter((t) => "string" == typeof t)), t
            ),
          );
        }
        replaceCss(t, e) {
          var i = [];
          return (
            (t = t || this.settings.archive),
            (e = e || this.settings.resolver),
            this.cssUrls.forEach(
              function (n) {
                var r = this.createCssFile(n, t, e).then(
                  function (t) {
                    var e = this.urls.indexOf(n);
                    e > -1 && (this.replacementUrls[e] = t);
                  }.bind(this),
                );
                i.push(r);
              }.bind(this),
            ),
            Promise.all(i)
          );
        }
        createCssFile(t) {
          if (w.a.isAbsolute(t))
            return new Promise(function (t) {
              t();
            });
          var e,
            i = this.settings.resolver(t);
          e = this.settings.archive
            ? this.settings.archive.getText(i)
            : this.settings.request(i, "text");
          var n = this.urls.map((t) => {
            var e = this.settings.resolver(t);
            return new a.a(i).relative(e);
          });
          return e
            ? e.then(
                (t) => (
                  (t = Object(c.e)(t, n, this.replacementUrls)),
                  "base64" === this.settings.replacements
                    ? Object(s.createBase64Url)(t, "text/css")
                    : Object(s.createBlobUrl)(t, "text/css")
                ),
                (t) =>
                  new Promise(function (t) {
                    t();
                  }),
              )
            : new Promise(function (t) {
                t();
              });
        }
        relativeTo(t, e) {
          return (
            (e = e || this.settings.resolver),
            this.urls.map(
              function (i) {
                var n = e(i);
                return new a.a(t).relative(n);
              }.bind(this),
            )
          );
        }
        get(t) {
          var e = this.urls.indexOf(t);
          if (-1 !== e)
            return this.replacementUrls.length
              ? new Promise(
                  function (t, i) {
                    t(this.replacementUrls[e]);
                  }.bind(this),
                )
              : this.createUrl(t);
        }
        substitute(t, e) {
          var i;
          return (
            (i = e ? this.relativeTo(e) : this.urls),
            Object(c.e)(t, i, this.replacementUrls)
          );
        }
        destroy() {
          (this.settings = void 0),
            (this.manifest = void 0),
            (this.resources = void 0),
            (this.replacementUrls = void 0),
            (this.html = void 0),
            (this.assets = void 0),
            (this.css = void 0),
            (this.urls = void 0),
            (this.cssUrls = void 0);
        }
      };
      var C = class {
          constructor(t) {
            (this.pages = []),
              (this.locations = []),
              (this.epubcfi = new h.a()),
              (this.firstPage = 0),
              (this.lastPage = 0),
              (this.totalPages = 0),
              (this.toc = void 0),
              (this.ncx = void 0),
              t && (this.pageList = this.parse(t)),
              this.pageList &&
                this.pageList.length &&
                this.process(this.pageList);
          }
          parse(t) {
            var e = Object(s.qs)(t, "html"),
              i = Object(s.qs)(t, "ncx");
            return e ? this.parseNav(t) : i ? this.parseNcx(t) : void 0;
          }
          parseNav(t) {
            var e,
              i,
              n = Object(s.querySelectorByType)(t, "nav", "page-list"),
              r = n ? Object(s.qsa)(n, "li") : [],
              o = r.length,
              a = [];
            if (!r || 0 === o) return a;
            for (e = 0; e < o; ++e) (i = this.item(r[e])), a.push(i);
            return a;
          }
          parseNcx(t) {
            var e,
              i,
              n,
              r,
              o = [],
              a = 0;
            if (!(i = Object(s.qs)(t, "pageList"))) return o;
            if (
              ((r = (n = Object(s.qsa)(i, "pageTarget")).length),
              !n || 0 === n.length)
            )
              return o;
            for (a = 0; a < r; ++a) (e = this.ncxItem(n[a])), o.push(e);
            return o;
          }
          ncxItem(t) {
            var e = Object(s.qs)(t, "navLabel"),
              i = Object(s.qs)(e, "text").textContent;
            return {
              href: Object(s.qs)(t, "content").getAttribute("src"),
              page: parseInt(i, 10),
            };
          }
          item(t) {
            var e,
              i,
              n = Object(s.qs)(t, "a"),
              r = n.getAttribute("href") || "",
              o = n.textContent || "",
              a = parseInt(o);
            return -1 != r.indexOf("epubcfi")
              ? ((i = (e = r.split("#"))[0]),
                { cfi: e.length > 1 && e[1], href: r, packageUrl: i, page: a })
              : { href: r, page: a };
          }
          process(t) {
            t.forEach(function (t) {
              this.pages.push(t.page), t.cfi && this.locations.push(t.cfi);
            }, this),
              (this.firstPage = parseInt(this.pages[0])),
              (this.lastPage = parseInt(this.pages[this.pages.length - 1])),
              (this.totalPages = this.lastPage - this.firstPage);
          }
          pageFromCfi(t) {
            var e = -1;
            if (0 === this.locations.length) return -1;
            var i = Object(s.indexOfSorted)(
              t,
              this.locations,
              this.epubcfi.compare,
            );
            return (
              -1 != i
                ? (e = this.pages[i])
                : void 0 !==
                    (e =
                      (i = Object(s.locationOf)(
                        t,
                        this.locations,
                        this.epubcfi.compare,
                      )) -
                        1 >=
                      0
                        ? this.pages[i - 1]
                        : this.pages[0]) || (e = -1),
              e
            );
          }
          cfiFromPage(t) {
            var e = -1;
            "number" != typeof t && (t = parseInt(t));
            var i = this.pages.indexOf(t);
            return -1 != i && (e = this.locations[i]), e;
          }
          pageFromPercentage(t) {
            return Math.round(this.totalPages * t);
          }
          percentageFromPage(t) {
            var e = (t - this.firstPage) / this.totalPages;
            return Math.round(1e3 * e) / 1e3;
          }
          percentageFromCfi(t) {
            var e = this.pageFromCfi(t);
            return this.percentageFromPage(e);
          }
          destroy() {
            (this.pages = void 0),
              (this.locations = void 0),
              (this.epubcfi = void 0),
              (this.pageList = void 0),
              (this.toc = void 0),
              (this.ncx = void 0);
          }
        },
        I = i(29),
        k = i(76),
        R = i.n(k);
      var A = class {
          constructor() {
            (this.zip = void 0), (this.urlCache = {}), this.checkRequirements();
          }
          checkRequirements() {
            try {
              this.zip = new R.a();
            } catch (t) {
              throw new Error("JSZip lib not loaded");
            }
          }
          open(t, e) {
            return this.zip.loadAsync(t, { base64: e });
          }
          openUrl(t, e) {
            return u(t, "binary").then(
              function (t) {
                return this.zip.loadAsync(t, { base64: e });
              }.bind(this),
            );
          }
          request(t, e) {
            var i,
              n = new s.defer(),
              r = new a.a(t);
            return (
              e || (e = r.extension),
              (i = "blob" == e ? this.getBlob(t) : this.getText(t))
                ? i.then(
                    function (t) {
                      let i = this.handleResponse(t, e);
                      n.resolve(i);
                    }.bind(this),
                  )
                : n.reject({
                    message: "File not found in the epub: " + t,
                    stack: new Error().stack,
                  }),
              n.promise
            );
          }
          handleResponse(t, e) {
            return "json" == e
              ? JSON.parse(t)
              : Object(s.isXml)(e)
                ? Object(s.parse)(t, "text/xml")
                : "xhtml" == e
                  ? Object(s.parse)(t, "application/xhtml+xml")
                  : "html" == e || "htm" == e
                    ? Object(s.parse)(t, "text/html")
                    : t;
          }
          getBlob(t, e) {
            var i = window.decodeURIComponent(t.substr(1)),
              n = this.zip.file(i);
            if (n)
              return (
                (e = e || O.lookup(n.name)),
                n.async("uint8array").then(function (t) {
                  return new Blob([t], { type: e });
                })
              );
          }
          getText(t, e) {
            var i = window.decodeURIComponent(t.substr(1)),
              n = this.zip.file(i);
            if (n)
              return n.async("string").then(function (t) {
                return t;
              });
          }
          getBase64(t, e) {
            var i = window.decodeURIComponent(t.substr(1)),
              n = this.zip.file(i);
            if (n)
              return (
                (e = e || O.lookup(n.name)),
                n.async("base64").then(function (t) {
                  return "data:" + e + ";base64," + t;
                })
              );
          }
          createUrl(t, e) {
            var i,
              n,
              r = new s.defer(),
              o = window.URL || window.webkitURL || window.mozURL,
              a = e && e.base64;
            return t in this.urlCache
              ? (r.resolve(this.urlCache[t]), r.promise)
              : (a
                  ? (n = this.getBase64(t)) &&
                    n.then(
                      function (e) {
                        (this.urlCache[t] = e), r.resolve(e);
                      }.bind(this),
                    )
                  : (n = this.getBlob(t)) &&
                    n.then(
                      function (e) {
                        (i = o.createObjectURL(e)),
                          (this.urlCache[t] = i),
                          r.resolve(i);
                      }.bind(this),
                    ),
                n ||
                  r.reject({
                    message: "File not found in the epub: " + t,
                    stack: new Error().stack,
                  }),
                r.promise);
          }
          revokeUrl(t) {
            var e = window.URL || window.webkitURL || window.mozURL,
              i = this.urlCache[t];
            i && e.revokeObjectURL(i);
          }
          destroy() {
            var t = window.URL || window.webkitURL || window.mozURL;
            for (let e in this.urlCache) t.revokeObjectURL(e);
            (this.zip = void 0), (this.urlCache = {});
          }
        },
        L = i(48),
        j = i.n(L);
      class D {
        constructor(t, e, i) {
          (this.urlCache = {}),
            (this.storage = void 0),
            (this.name = t),
            (this.requester = e || u),
            (this.resolver = i),
            (this.online = !0),
            this.checkRequirements(),
            this.addListeners();
        }
        checkRequirements() {
          try {
            let t;
            void 0 === j.a && (t = j.a),
              (this.storage = t.createInstance({ name: this.name }));
          } catch (t) {
            throw new Error("localForage lib not loaded");
          }
        }
        addListeners() {
          (this._status = this.status.bind(this)),
            window.addEventListener("online", this._status),
            window.addEventListener("offline", this._status);
        }
        removeListeners() {
          window.removeEventListener("online", this._status),
            window.removeEventListener("offline", this._status),
            (this._status = void 0);
        }
        status(t) {
          let e = navigator.onLine;
          (this.online = e),
            e ? this.emit("online", this) : this.emit("offline", this);
        }
        add(t, e) {
          let i = t.resources.map((t) => {
            let { href: i } = t,
              n = this.resolver(i),
              r = window.encodeURIComponent(n);
            return this.storage
              .getItem(r)
              .then((t) =>
                !t || e
                  ? this.requester(n, "binary").then((t) =>
                      this.storage.setItem(r, t),
                    )
                  : t,
              );
          });
          return Promise.all(i);
        }
        put(t, e, i) {
          let n = window.encodeURIComponent(t);
          return this.storage
            .getItem(n)
            .then(
              (r) =>
                r ||
                this.requester(t, "binary", e, i).then((t) =>
                  this.storage.setItem(n, t),
                ),
            );
        }
        request(t, e, i, n) {
          return this.online
            ? this.requester(t, e, i, n).then((e) => (this.put(t), e))
            : this.retrieve(t, e);
        }
        retrieve(t, e) {
          new s.defer();
          var i = new a.a(t);
          return (
            e || (e = i.extension),
            ("blob" == e ? this.getBlob(t) : this.getText(t)).then((i) => {
              var n,
                r = new s.defer();
              return (
                i
                  ? ((n = this.handleResponse(i, e)), r.resolve(n))
                  : r.reject({
                      message: "File not found in storage: " + t,
                      stack: new Error().stack,
                    }),
                r.promise
              );
            })
          );
        }
        handleResponse(t, e) {
          return "json" == e
            ? JSON.parse(t)
            : Object(s.isXml)(e)
              ? Object(s.parse)(t, "text/xml")
              : "xhtml" == e
                ? Object(s.parse)(t, "application/xhtml+xml")
                : "html" == e || "htm" == e
                  ? Object(s.parse)(t, "text/html")
                  : t;
        }
        getBlob(t, e) {
          let i = window.encodeURIComponent(t);
          return this.storage.getItem(i).then(function (i) {
            if (i) return (e = e || O.lookup(t)), new Blob([i], { type: e });
          });
        }
        getText(t, e) {
          let i = window.encodeURIComponent(t);
          return (
            (e = e || O.lookup(t)),
            this.storage.getItem(i).then(function (t) {
              var i,
                n = new s.defer(),
                r = new FileReader();
              if (t)
                return (
                  (i = new Blob([t], { type: e })),
                  r.addEventListener("loadend", () => {
                    n.resolve(r.result);
                  }),
                  r.readAsText(i, e),
                  n.promise
                );
            })
          );
        }
        getBase64(t, e) {
          let i = window.encodeURIComponent(t);
          return (
            (e = e || O.lookup(t)),
            this.storage.getItem(i).then((t) => {
              var i,
                n = new s.defer(),
                r = new FileReader();
              if (t)
                return (
                  (i = new Blob([t], { type: e })),
                  r.addEventListener("loadend", () => {
                    n.resolve(r.result);
                  }),
                  r.readAsDataURL(i, e),
                  n.promise
                );
            })
          );
        }
        createUrl(t, e) {
          var i,
            n,
            r = new s.defer(),
            o = window.URL || window.webkitURL || window.mozURL,
            a = e && e.base64;
          return t in this.urlCache
            ? (r.resolve(this.urlCache[t]), r.promise)
            : (a
                ? (n = this.getBase64(t)) &&
                  n.then(
                    function (e) {
                      (this.urlCache[t] = e), r.resolve(e);
                    }.bind(this),
                  )
                : (n = this.getBlob(t)) &&
                  n.then(
                    function (e) {
                      (i = o.createObjectURL(e)),
                        (this.urlCache[t] = i),
                        r.resolve(i);
                    }.bind(this),
                  ),
              n ||
                r.reject({
                  message: "File not found in storage: " + t,
                  stack: new Error().stack,
                }),
              r.promise);
        }
        revokeUrl(t) {
          var e = window.URL || window.webkitURL || window.mozURL,
            i = this.urlCache[t];
          i && e.revokeObjectURL(i);
        }
        destroy() {
          var t = window.URL || window.webkitURL || window.mozURL;
          for (let e in this.urlCache) t.revokeObjectURL(e);
          (this.urlCache = {}), this.removeListeners();
        }
      }
      r()(D.prototype);
      var P = D;
      var M = class {
        constructor(t) {
          (this.interactive = ""),
            (this.fixedLayout = ""),
            (this.openToSpread = ""),
            (this.orientationLock = ""),
            t && this.parse(t);
        }
        parse(t) {
          if (!t) return this;
          const e = Object(s.qs)(t, "display_options");
          if (!e) return this;
          return (
            Object(s.qsa)(e, "option").forEach((t) => {
              let e = "";
              switch (
                (t.childNodes.length && (e = t.childNodes[0].nodeValue),
                t.attributes.name.value)
              ) {
                case "interactive":
                  this.interactive = e;
                  break;
                case "fixed-layout":
                  this.fixedLayout = e;
                  break;
                case "open-to-spread":
                  this.openToSpread = e;
                  break;
                case "orientation-lock":
                  this.orientationLock = e;
              }
            }),
            this
          );
        }
        destroy() {
          (this.interactive = void 0),
            (this.fixedLayout = void 0),
            (this.openToSpread = void 0),
            (this.orientationLock = void 0);
        }
      };
      const z = "binary",
        B = "base64",
        q = "epub",
        F = "opf",
        U = "json",
        W = "directory";
      class H {
        constructor(t, e) {
          void 0 === e &&
            "string" != typeof t &&
            t instanceof Blob == !1 &&
            t instanceof ArrayBuffer == !1 &&
            ((e = t), (t = void 0)),
            (this.settings = Object(s.extend)(this.settings || {}, {
              requestMethod: void 0,
              requestCredentials: void 0,
              requestHeaders: void 0,
              encoding: void 0,
              replacements: void 0,
              canonical: void 0,
              openAs: void 0,
              store: void 0,
            })),
            Object(s.extend)(this.settings, e),
            (this.opening = new s.defer()),
            (this.opened = this.opening.promise),
            (this.isOpen = !1),
            (this.loading = {
              manifest: new s.defer(),
              spine: new s.defer(),
              metadata: new s.defer(),
              cover: new s.defer(),
              navigation: new s.defer(),
              pageList: new s.defer(),
              resources: new s.defer(),
              displayOptions: new s.defer(),
            }),
            (this.loaded = {
              manifest: this.loading.manifest.promise,
              spine: this.loading.spine.promise,
              metadata: this.loading.metadata.promise,
              cover: this.loading.cover.promise,
              navigation: this.loading.navigation.promise,
              pageList: this.loading.pageList.promise,
              resources: this.loading.resources.promise,
              displayOptions: this.loading.displayOptions.promise,
            }),
            (this.ready = Promise.all([
              this.loaded.manifest,
              this.loaded.spine,
              this.loaded.metadata,
              this.loaded.cover,
              this.loaded.navigation,
              this.loaded.resources,
              this.loaded.displayOptions,
            ])),
            (this.isRendered = !1),
            (this.request = this.settings.requestMethod || u),
            (this.spine = new p()),
            (this.locations = new y(this.spine, this.load.bind(this))),
            (this.navigation = void 0),
            (this.pageList = void 0),
            (this.url = void 0),
            (this.path = void 0),
            (this.archived = !1),
            (this.archive = void 0),
            (this.storage = void 0),
            (this.resources = void 0),
            (this.rendition = void 0),
            (this.container = void 0),
            (this.packaging = void 0),
            (this.displayOptions = void 0),
            this.settings.store && this.store(this.settings.store),
            t &&
              this.open(t, this.settings.openAs).catch((e) => {
                var i = new Error("Cannot load book at " + t);
                this.emit(m.c.BOOK.OPEN_FAILED, i);
              });
        }
        open(t, e) {
          var i,
            n = e || this.determineType(t);
          return (
            n === z
              ? ((this.archived = !0),
                (this.url = new o.a("/", "")),
                (i = this.openEpub(t)))
              : n === B
                ? ((this.archived = !0),
                  (this.url = new o.a("/", "")),
                  (i = this.openEpub(t, n)))
                : n === q
                  ? ((this.archived = !0),
                    (this.url = new o.a("/", "")),
                    (i = this.request(
                      t,
                      "binary",
                      this.settings.requestCredentials,
                      this.settings.requestHeaders,
                    ).then(this.openEpub.bind(this))))
                  : n == F
                    ? ((this.url = new o.a(t)),
                      (i = this.openPackaging(this.url.Path.toString())))
                    : n == U
                      ? ((this.url = new o.a(t)),
                        (i = this.openManifest(this.url.Path.toString())))
                      : ((this.url = new o.a(t)),
                        (i = this.openContainer("META-INF/container.xml").then(
                          this.openPackaging.bind(this),
                        ))),
            i
          );
        }
        openEpub(t, e) {
          return this.unarchive(t, e || this.settings.encoding)
            .then(() => this.openContainer("META-INF/container.xml"))
            .then((t) => this.openPackaging(t));
        }
        openContainer(t) {
          return this.load(t).then(
            (t) => (
              (this.container = new x(t)),
              this.resolve(this.container.packagePath)
            ),
          );
        }
        openPackaging(t) {
          return (
            (this.path = new a.a(t)),
            this.load(t).then(
              (t) => ((this.packaging = new E(t)), this.unpack(this.packaging)),
            )
          );
        }
        openManifest(t) {
          return (
            (this.path = new a.a(t)),
            this.load(t).then(
              (t) => (
                (this.packaging = new E()),
                this.packaging.load(t),
                this.unpack(this.packaging)
              ),
            )
          );
        }
        load(t) {
          var e = this.resolve(t);
          return this.archived
            ? this.archive.request(e)
            : this.request(
                e,
                null,
                this.settings.requestCredentials,
                this.settings.requestHeaders,
              );
        }
        resolve(t, e) {
          if (t) {
            var i = t;
            return t.indexOf("://") > -1
              ? t
              : (this.path && (i = this.path.resolve(t)),
                0 != e && this.url && (i = this.url.resolve(i)),
                i);
          }
        }
        canonical(t) {
          return t
            ? this.settings.canonical
              ? this.settings.canonical(t)
              : this.resolve(t, !0)
            : "";
        }
        determineType(t) {
          var e;
          return "base64" === this.settings.encoding
            ? B
            : "string" != typeof t
              ? z
              : ((e = new o.a(t).path().extension) &&
                  (e = e.replace(/\\?.*$/, "")),
                e
                  ? "epub" === e
                    ? q
                    : "opf" === e
                      ? F
                      : "json" === e
                        ? U
                        : void 0
                  : W);
        }
        unpack(t) {
          (this.package = t),
            "" === this.packaging.metadata.layout
              ? this.load(
                  this.url.resolve(
                    "META-INF/com.apple.ibooks.display-options.xml",
                  ),
                )
                  .then((t) => {
                    (this.displayOptions = new M(t)),
                      this.loading.displayOptions.resolve(this.displayOptions);
                  })
                  .catch((t) => {
                    (this.displayOptions = new M()),
                      this.loading.displayOptions.resolve(this.displayOptions);
                  })
              : ((this.displayOptions = new M()),
                this.loading.displayOptions.resolve(this.displayOptions)),
            this.spine.unpack(
              this.packaging,
              this.resolve.bind(this),
              this.canonical.bind(this),
            ),
            (this.resources = new T(this.packaging.manifest, {
              archive: this.archive,
              resolver: this.resolve.bind(this),
              request: this.request.bind(this),
              replacements:
                this.settings.replacements ||
                (this.archived ? "blobUrl" : "base64"),
            })),
            this.loadNavigation(this.packaging).then(() => {
              this.loading.navigation.resolve(this.navigation);
            }),
            this.packaging.coverPath &&
              (this.cover = this.resolve(this.packaging.coverPath)),
            this.loading.manifest.resolve(this.packaging.manifest),
            this.loading.metadata.resolve(this.packaging.metadata),
            this.loading.spine.resolve(this.spine),
            this.loading.cover.resolve(this.cover),
            this.loading.resources.resolve(this.resources),
            this.loading.pageList.resolve(this.pageList),
            (this.isOpen = !0),
            this.archived ||
            (this.settings.replacements && "none" != this.settings.replacements)
              ? this.replacements()
                  .then(() => {
                    this.loaded.displayOptions.then(() => {
                      this.opening.resolve(this);
                    });
                  })
                  .catch((t) => {
                    console.error(t);
                  })
              : this.loaded.displayOptions.then(() => {
                  this.opening.resolve(this);
                });
        }
        loadNavigation(t) {
          let e = t.navPath || t.ncxPath,
            i = t.toc;
          return i
            ? new Promise((e, n) => {
                (this.navigation = new S(i)),
                  t.pageList && (this.pageList = new C(t.pageList)),
                  e(this.navigation);
              })
            : e
              ? this.load(e, "xml").then(
                  (t) => (
                    (this.navigation = new S(t, e)),
                    (this.pageList = new C(t)),
                    this.navigation
                  ),
                )
              : new Promise((t, e) => {
                  (this.navigation = new S()),
                    (this.pageList = new C()),
                    t(this.navigation);
                });
        }
        section(t) {
          return this.spine.get(t);
        }
        renderTo(t, e) {
          return (
            (this.rendition = new I.a(this, e)),
            this.rendition.attachTo(t),
            this.rendition
          );
        }
        setRequestCredentials(t) {
          this.settings.requestCredentials = t;
        }
        setRequestHeaders(t) {
          this.settings.requestHeaders = t;
        }
        unarchive(t, e) {
          return (this.archive = new A()), this.archive.open(t, e);
        }
        store(t) {
          let e =
              this.settings.replacements &&
              "none" !== this.settings.replacements,
            i = this.url,
            n = this.settings.requestMethod || u.bind(this);
          return (
            (this.storage = new P(t, n, this.resolve.bind(this))),
            (this.request = this.storage.request.bind(this.storage)),
            this.opened.then(() => {
              this.archived &&
                (this.storage.requester = this.archive.request.bind(
                  this.archive,
                ));
              let t = (t, e) => {
                e.output = this.resources.substitute(t, e.url);
              };
              (this.resources.settings.replacements = e || "blobUrl"),
                this.resources
                  .replacements()
                  .then(() => this.resources.replaceCss()),
                this.storage.on("offline", () => {
                  (this.url = new o.a("/", "")),
                    this.spine.hooks.serialize.register(t);
                }),
                this.storage.on("online", () => {
                  (this.url = i), this.spine.hooks.serialize.deregister(t);
                });
            }),
            this.storage
          );
        }
        coverUrl() {
          return this.loaded.cover.then(() =>
            this.cover
              ? this.archived
                ? this.archive.createUrl(this.cover)
                : this.cover
              : null,
          );
        }
        replacements() {
          return (
            this.spine.hooks.serialize.register((t, e) => {
              e.output = this.resources.substitute(t, e.url);
            }),
            this.resources
              .replacements()
              .then(() => this.resources.replaceCss())
          );
        }
        getRange(t) {
          var e = new h.a(t),
            i = this.spine.get(e.spinePos),
            n = this.load.bind(this);
          return i
            ? i.load(n).then(function (t) {
                return e.toRange(i.document);
              })
            : new Promise((t, e) => {
                e("CFI could not be found");
              });
        }
        key(t) {
          var e = t || this.packaging.metadata.identifier || this.url.filename;
          return \`epubjs:\${m.b}:\${e}\`;
        }
        destroy() {
          (this.opened = void 0),
            (this.loading = void 0),
            (this.loaded = void 0),
            (this.ready = void 0),
            (this.isOpen = !1),
            (this.isRendered = !1),
            this.spine && this.spine.destroy(),
            this.locations && this.locations.destroy(),
            this.pageList && this.pageList.destroy(),
            this.archive && this.archive.destroy(),
            this.resources && this.resources.destroy(),
            this.container && this.container.destroy(),
            this.packaging && this.packaging.destroy(),
            this.rendition && this.rendition.destroy(),
            this.displayOptions && this.displayOptions.destroy(),
            (this.spine = void 0),
            (this.locations = void 0),
            (this.pageList = void 0),
            (this.archive = void 0),
            (this.resources = void 0),
            (this.container = void 0),
            (this.packaging = void 0),
            (this.rendition = void 0),
            (this.navigation = void 0),
            (this.url = void 0),
            (this.path = void 0),
            (this.archived = !1);
        }
      }
      r()(H.prototype);
      e.a = H;
    },
    function (t, e, i) {
      var n = i(26).NAMESPACE;
      function r(t) {
        return "" !== t;
      }
      function s(t, e) {
        return t.hasOwnProperty(e) || (t[e] = !0), t;
      }
      function o(t) {
        if (!t) return [];
        var e = (function (t) {
          return t ? t.split(/[\\t\\n\\f\\r ]+/).filter(r) : [];
        })(t);
        return Object.keys(e.reduce(s, {}));
      }
      function a(t, e) {
        for (var i in t) e[i] = t[i];
      }
      function h(t, e) {
        var i = t.prototype;
        if (!(i instanceof e)) {
          function n() {}
          (n.prototype = e.prototype),
            a(i, (n = new n())),
            (t.prototype = i = n);
        }
        i.constructor != t &&
          ("function" != typeof t && console.error("unknown Class:" + t),
          (i.constructor = t));
      }
      var l = {},
        c = (l.ELEMENT_NODE = 1),
        u = (l.ATTRIBUTE_NODE = 2),
        d = (l.TEXT_NODE = 3),
        f = (l.CDATA_SECTION_NODE = 4),
        p = (l.ENTITY_REFERENCE_NODE = 5),
        g = (l.ENTITY_NODE = 6),
        m = (l.PROCESSING_INSTRUCTION_NODE = 7),
        v = (l.COMMENT_NODE = 8),
        y = (l.DOCUMENT_NODE = 9),
        b = (l.DOCUMENT_TYPE_NODE = 10),
        w = (l.DOCUMENT_FRAGMENT_NODE = 11),
        x = (l.NOTATION_NODE = 12),
        E = {},
        S = {},
        N =
          ((E.INDEX_SIZE_ERR = ((S[1] = "Index size error"), 1)),
          (E.DOMSTRING_SIZE_ERR = ((S[2] = "DOMString size error"), 2)),
          (E.HIERARCHY_REQUEST_ERR = ((S[3] = "Hierarchy request error"), 3))),
        _ =
          ((E.WRONG_DOCUMENT_ERR = ((S[4] = "Wrong document"), 4)),
          (E.INVALID_CHARACTER_ERR = ((S[5] = "Invalid character"), 5)),
          (E.NO_DATA_ALLOWED_ERR = ((S[6] = "No data allowed"), 6)),
          (E.NO_MODIFICATION_ALLOWED_ERR =
            ((S[7] = "No modification allowed"), 7)),
          (E.NOT_FOUND_ERR = ((S[8] = "Not found"), 8))),
        O =
          ((E.NOT_SUPPORTED_ERR = ((S[9] = "Not supported"), 9)),
          (E.INUSE_ATTRIBUTE_ERR = ((S[10] = "Attribute in use"), 10)));
      (E.INVALID_STATE_ERR = ((S[11] = "Invalid state"), 11)),
        (E.SYNTAX_ERR = ((S[12] = "Syntax error"), 12)),
        (E.INVALID_MODIFICATION_ERR = ((S[13] = "Invalid modification"), 13)),
        (E.NAMESPACE_ERR = ((S[14] = "Invalid namespace"), 14)),
        (E.INVALID_ACCESS_ERR = ((S[15] = "Invalid access"), 15));
      function T(t, e) {
        if (e instanceof Error) var i = e;
        else
          (i = this),
            Error.call(this, S[t]),
            (this.message = S[t]),
            Error.captureStackTrace && Error.captureStackTrace(this, T);
        return (i.code = t), e && (this.message = this.message + ": " + e), i;
      }
      function C() {}
      function I(t, e) {
        (this._node = t), (this._refresh = e), k(this);
      }
      function k(t) {
        var e = t._node._inc || t._node.ownerDocument._inc;
        if (t._inc != e) {
          var i = t._refresh(t._node);
          at(t, "length", i.length), a(i, t), (t._inc = e);
        }
      }
      function R() {}
      function A(t, e) {
        for (var i = t.length; i--; ) if (t[i] === e) return i;
      }
      function L(t, e, i, r) {
        if ((r ? (e[A(e, r)] = i) : (e[e.length++] = i), t)) {
          i.ownerElement = t;
          var s = t.ownerDocument;
          s &&
            (r && q(s, t, r),
            (function (t, e, i) {
              t && t._inc++,
                i.namespaceURI === n.XMLNS &&
                  (e._nsMap[i.prefix ? i.localName : ""] = i.value);
            })(s, t, i));
        }
      }
      function j(t, e, i) {
        var n = A(e, i);
        if (!(n >= 0)) throw T(_, new Error(t.tagName + "@" + i));
        for (var r = e.length - 1; n < r; ) e[n] = e[++n];
        if (((e.length = r), t)) {
          var s = t.ownerDocument;
          s && (q(s, t, i), (i.ownerElement = null));
        }
      }
      function D() {}
      function P() {}
      function M(t) {
        return (
          ("<" == t ? "&lt;" : ">" == t && "&gt;") ||
          ("&" == t && "&amp;") ||
          ('"' == t && "&quot;") ||
          "&#" + t.charCodeAt() + ";"
        );
      }
      function z(t, e) {
        if (e(t)) return !0;
        if ((t = t.firstChild))
          do {
            if (z(t, e)) return !0;
          } while ((t = t.nextSibling));
      }
      function B() {}
      function q(t, e, i, r) {
        t && t._inc++,
          i.namespaceURI === n.XMLNS &&
            delete e._nsMap[i.prefix ? i.localName : ""];
      }
      function F(t, e, i) {
        if (t && t._inc) {
          t._inc++;
          var n = e.childNodes;
          if (i) n[n.length++] = i;
          else {
            for (var r = e.firstChild, s = 0; r; )
              (n[s++] = r), (r = r.nextSibling);
            n.length = s;
          }
        }
      }
      function U(t, e) {
        var i = e.previousSibling,
          n = e.nextSibling;
        return (
          i ? (i.nextSibling = n) : (t.firstChild = n),
          n ? (n.previousSibling = i) : (t.lastChild = i),
          F(t.ownerDocument, t),
          e
        );
      }
      function W(t, e, i) {
        var n = e.parentNode;
        if ((n && n.removeChild(e), e.nodeType === w)) {
          var r = e.firstChild;
          if (null == r) return e;
          var s = e.lastChild;
        } else r = s = e;
        var o = i ? i.previousSibling : t.lastChild;
        (r.previousSibling = o),
          (s.nextSibling = i),
          o ? (o.nextSibling = r) : (t.firstChild = r),
          null == i ? (t.lastChild = s) : (i.previousSibling = s);
        do {
          r.parentNode = t;
        } while (r !== s && (r = r.nextSibling));
        return (
          F(t.ownerDocument || t, t),
          e.nodeType == w && (e.firstChild = e.lastChild = null),
          e
        );
      }
      function H() {
        this._nsMap = {};
      }
      function V() {}
      function X() {}
      function G() {}
      function Y() {}
      function $() {}
      function K() {}
      function Z() {}
      function J() {}
      function Q() {}
      function tt() {}
      function et() {}
      function it() {}
      function nt(t, e) {
        var i = [],
          n = (9 == this.nodeType && this.documentElement) || this,
          r = n.prefix,
          s = n.namespaceURI;
        if (s && null == r && null == (r = n.lookupPrefix(s)))
          var o = [{ namespace: s, prefix: null }];
        return ot(this, i, t, e, o), i.join("");
      }
      function rt(t, e, i) {
        var r = t.prefix || "",
          s = t.namespaceURI;
        if (!s) return !1;
        if (("xml" === r && s === n.XML) || s === n.XMLNS) return !1;
        for (var o = i.length; o--; ) {
          var a = i[o];
          if (a.prefix === r) return a.namespace !== s;
        }
        return !0;
      }
      function st(t, e, i) {
        t.push(" ", e, '="', i.replace(/[<&"]/g, M), '"');
      }
      function ot(t, e, i, r, s) {
        if ((s || (s = []), r)) {
          if (!(t = r(t))) return;
          if ("string" == typeof t) return void e.push(t);
        }
        switch (t.nodeType) {
          case c:
            var o = t.attributes,
              a = o.length,
              h = t.firstChild,
              l = t.tagName,
              g = l;
            if (
              !(i = n.isHTML(t.namespaceURI) || i) &&
              !t.prefix &&
              t.namespaceURI
            ) {
              for (var x, E = 0; E < o.length; E++)
                if ("xmlns" === o.item(E).name) {
                  x = o.item(E).value;
                  break;
                }
              if (!x)
                for (var S = s.length - 1; S >= 0; S--) {
                  if (
                    "" === (N = s[S]).prefix &&
                    N.namespace === t.namespaceURI
                  ) {
                    x = N.namespace;
                    break;
                  }
                }
              if (x !== t.namespaceURI)
                for (S = s.length - 1; S >= 0; S--) {
                  var N;
                  if ((N = s[S]).namespace === t.namespaceURI) {
                    N.prefix && (g = N.prefix + ":" + l);
                    break;
                  }
                }
            }
            e.push("<", g);
            for (var _ = 0; _ < a; _++) {
              "xmlns" == (O = o.item(_)).prefix
                ? s.push({ prefix: O.localName, namespace: O.value })
                : "xmlns" == O.nodeName &&
                  s.push({ prefix: "", namespace: O.value });
            }
            for (_ = 0; _ < a; _++) {
              var O, T, C;
              if (rt((O = o.item(_)), 0, s))
                st(
                  e,
                  (T = O.prefix || "") ? "xmlns:" + T : "xmlns",
                  (C = O.namespaceURI),
                ),
                  s.push({ prefix: T, namespace: C });
              ot(O, e, i, r, s);
            }
            if (l === g && rt(t, 0, s))
              st(
                e,
                (T = t.prefix || "") ? "xmlns:" + T : "xmlns",
                (C = t.namespaceURI),
              ),
                s.push({ prefix: T, namespace: C });
            if (h || (i && !/^(?:meta|link|img|br|hr|input)$/i.test(l))) {
              if ((e.push(">"), i && /^script$/i.test(l)))
                for (; h; )
                  h.data ? e.push(h.data) : ot(h, e, i, r, s.slice()),
                    (h = h.nextSibling);
              else for (; h; ) ot(h, e, i, r, s.slice()), (h = h.nextSibling);
              e.push("</", g, ">");
            } else e.push("/>");
            return;
          case y:
          case w:
            for (h = t.firstChild; h; )
              ot(h, e, i, r, s.slice()), (h = h.nextSibling);
            return;
          case u:
            return st(e, t.name, t.value);
          case d:
            return e.push(t.data.replace(/[<&]/g, M).replace(/]]>/g, "]]&gt;"));
          case f:
            return e.push("<![CDATA[", t.data, "]]>");
          case v:
            return e.push("\\x3c!--", t.data, "--\\x3e");
          case b:
            var I = t.publicId,
              k = t.systemId;
            if ((e.push("<!DOCTYPE ", t.name), I))
              e.push(" PUBLIC ", I),
                k && "." != k && e.push(" ", k),
                e.push(">");
            else if (k && "." != k) e.push(" SYSTEM ", k, ">");
            else {
              var R = t.internalSubset;
              R && e.push(" [", R, "]"), e.push(">");
            }
            return;
          case m:
            return e.push("<?", t.target, " ", t.data, "?>");
          case p:
            return e.push("&", t.nodeName, ";");
          default:
            e.push("??", t.nodeName);
        }
      }
      function at(t, e, i) {
        t[e] = i;
      }
      (T.prototype = Error.prototype),
        a(E, T),
        (C.prototype = {
          length: 0,
          item: function (t) {
            return this[t] || null;
          },
          toString: function (t, e) {
            for (var i = [], n = 0; n < this.length; n++) ot(this[n], i, t, e);
            return i.join("");
          },
        }),
        (I.prototype.item = function (t) {
          return k(this), this[t];
        }),
        h(I, C),
        (R.prototype = {
          length: 0,
          item: C.prototype.item,
          getNamedItem: function (t) {
            for (var e = this.length; e--; ) {
              var i = this[e];
              if (i.nodeName == t) return i;
            }
          },
          setNamedItem: function (t) {
            var e = t.ownerElement;
            if (e && e != this._ownerElement) throw new T(O);
            var i = this.getNamedItem(t.nodeName);
            return L(this._ownerElement, this, t, i), i;
          },
          setNamedItemNS: function (t) {
            var e,
              i = t.ownerElement;
            if (i && i != this._ownerElement) throw new T(O);
            return (
              (e = this.getNamedItemNS(t.namespaceURI, t.localName)),
              L(this._ownerElement, this, t, e),
              e
            );
          },
          removeNamedItem: function (t) {
            var e = this.getNamedItem(t);
            return j(this._ownerElement, this, e), e;
          },
          removeNamedItemNS: function (t, e) {
            var i = this.getNamedItemNS(t, e);
            return j(this._ownerElement, this, i), i;
          },
          getNamedItemNS: function (t, e) {
            for (var i = this.length; i--; ) {
              var n = this[i];
              if (n.localName == e && n.namespaceURI == t) return n;
            }
            return null;
          },
        }),
        (D.prototype = {
          hasFeature: function (t, e) {
            return !0;
          },
          createDocument: function (t, e, i) {
            var n = new B();
            if (
              ((n.implementation = this),
              (n.childNodes = new C()),
              (n.doctype = i || null),
              i && n.appendChild(i),
              e)
            ) {
              var r = n.createElementNS(t, e);
              n.appendChild(r);
            }
            return n;
          },
          createDocumentType: function (t, e, i) {
            var n = new K();
            return (
              (n.name = t),
              (n.nodeName = t),
              (n.publicId = e || ""),
              (n.systemId = i || ""),
              n
            );
          },
        }),
        (P.prototype = {
          firstChild: null,
          lastChild: null,
          previousSibling: null,
          nextSibling: null,
          attributes: null,
          parentNode: null,
          childNodes: null,
          ownerDocument: null,
          nodeValue: null,
          namespaceURI: null,
          prefix: null,
          localName: null,
          insertBefore: function (t, e) {
            return W(this, t, e);
          },
          replaceChild: function (t, e) {
            this.insertBefore(t, e), e && this.removeChild(e);
          },
          removeChild: function (t) {
            return U(this, t);
          },
          appendChild: function (t) {
            return this.insertBefore(t, null);
          },
          hasChildNodes: function () {
            return null != this.firstChild;
          },
          cloneNode: function (t) {
            return (function t(e, i, n) {
              var r = new i.constructor();
              for (var s in i) {
                var o = i[s];
                "object" != typeof o && o != r[s] && (r[s] = o);
              }
              i.childNodes && (r.childNodes = new C());
              switch (((r.ownerDocument = e), r.nodeType)) {
                case c:
                  var a = i.attributes,
                    h = (r.attributes = new R()),
                    l = a.length;
                  h._ownerElement = r;
                  for (var d = 0; d < l; d++)
                    r.setAttributeNode(t(e, a.item(d), !0));
                  break;
                case u:
                  n = !0;
              }
              if (n)
                for (var f = i.firstChild; f; )
                  r.appendChild(t(e, f, n)), (f = f.nextSibling);
              return r;
            })(this.ownerDocument || this, this, t);
          },
          normalize: function () {
            for (var t = this.firstChild; t; ) {
              var e = t.nextSibling;
              e && e.nodeType == d && t.nodeType == d
                ? (this.removeChild(e), t.appendData(e.data))
                : (t.normalize(), (t = e));
            }
          },
          isSupported: function (t, e) {
            return this.ownerDocument.implementation.hasFeature(t, e);
          },
          hasAttributes: function () {
            return this.attributes.length > 0;
          },
          lookupPrefix: function (t) {
            for (var e = this; e; ) {
              var i = e._nsMap;
              if (i) for (var n in i) if (i[n] == t) return n;
              e = e.nodeType == u ? e.ownerDocument : e.parentNode;
            }
            return null;
          },
          lookupNamespaceURI: function (t) {
            for (var e = this; e; ) {
              var i = e._nsMap;
              if (i && t in i) return i[t];
              e = e.nodeType == u ? e.ownerDocument : e.parentNode;
            }
            return null;
          },
          isDefaultNamespace: function (t) {
            return null == this.lookupPrefix(t);
          },
        }),
        a(l, P),
        a(l, P.prototype),
        (B.prototype = {
          nodeName: "#document",
          nodeType: y,
          doctype: null,
          documentElement: null,
          _inc: 1,
          insertBefore: function (t, e) {
            if (t.nodeType == w) {
              for (var i = t.firstChild; i; ) {
                var n = i.nextSibling;
                this.insertBefore(i, e), (i = n);
              }
              return t;
            }
            return (
              null == this.documentElement &&
                t.nodeType == c &&
                (this.documentElement = t),
              W(this, t, e),
              (t.ownerDocument = this),
              t
            );
          },
          removeChild: function (t) {
            return (
              this.documentElement == t && (this.documentElement = null),
              U(this, t)
            );
          },
          importNode: function (t, e) {
            return (function t(e, i, n) {
              var r;
              switch (i.nodeType) {
                case c:
                  (r = i.cloneNode(!1)).ownerDocument = e;
                case w:
                  break;
                case u:
                  n = !0;
              }
              r || (r = i.cloneNode(!1));
              if (((r.ownerDocument = e), (r.parentNode = null), n))
                for (var s = i.firstChild; s; )
                  r.appendChild(t(e, s, n)), (s = s.nextSibling);
              return r;
            })(this, t, e);
          },
          getElementById: function (t) {
            var e = null;
            return (
              z(this.documentElement, function (i) {
                if (i.nodeType == c && i.getAttribute("id") == t)
                  return (e = i), !0;
              }),
              e
            );
          },
          getElementsByClassName: function (t) {
            var e = o(t);
            return new I(this, function (i) {
              var n = [];
              return (
                e.length > 0 &&
                  z(i.documentElement, function (r) {
                    if (r !== i && r.nodeType === c) {
                      var s = r.getAttribute("class");
                      if (s) {
                        var a = t === s;
                        if (!a) {
                          var h = o(s);
                          a = e.every(
                            ((l = h),
                            function (t) {
                              return l && -1 !== l.indexOf(t);
                            }),
                          );
                        }
                        a && n.push(r);
                      }
                    }
                    var l;
                  }),
                n
              );
            });
          },
          createElement: function (t) {
            var e = new H();
            return (
              (e.ownerDocument = this),
              (e.nodeName = t),
              (e.tagName = t),
              (e.localName = t),
              (e.childNodes = new C()),
              ((e.attributes = new R())._ownerElement = e),
              e
            );
          },
          createDocumentFragment: function () {
            var t = new tt();
            return (t.ownerDocument = this), (t.childNodes = new C()), t;
          },
          createTextNode: function (t) {
            var e = new G();
            return (e.ownerDocument = this), e.appendData(t), e;
          },
          createComment: function (t) {
            var e = new Y();
            return (e.ownerDocument = this), e.appendData(t), e;
          },
          createCDATASection: function (t) {
            var e = new $();
            return (e.ownerDocument = this), e.appendData(t), e;
          },
          createProcessingInstruction: function (t, e) {
            var i = new et();
            return (
              (i.ownerDocument = this),
              (i.tagName = i.target = t),
              (i.nodeValue = i.data = e),
              i
            );
          },
          createAttribute: function (t) {
            var e = new V();
            return (
              (e.ownerDocument = this),
              (e.name = t),
              (e.nodeName = t),
              (e.localName = t),
              (e.specified = !0),
              e
            );
          },
          createEntityReference: function (t) {
            var e = new Q();
            return (e.ownerDocument = this), (e.nodeName = t), e;
          },
          createElementNS: function (t, e) {
            var i = new H(),
              n = e.split(":"),
              r = (i.attributes = new R());
            return (
              (i.childNodes = new C()),
              (i.ownerDocument = this),
              (i.nodeName = e),
              (i.tagName = e),
              (i.namespaceURI = t),
              2 == n.length
                ? ((i.prefix = n[0]), (i.localName = n[1]))
                : (i.localName = e),
              (r._ownerElement = i),
              i
            );
          },
          createAttributeNS: function (t, e) {
            var i = new V(),
              n = e.split(":");
            return (
              (i.ownerDocument = this),
              (i.nodeName = e),
              (i.name = e),
              (i.namespaceURI = t),
              (i.specified = !0),
              2 == n.length
                ? ((i.prefix = n[0]), (i.localName = n[1]))
                : (i.localName = e),
              i
            );
          },
        }),
        h(B, P),
        (H.prototype = {
          nodeType: c,
          hasAttribute: function (t) {
            return null != this.getAttributeNode(t);
          },
          getAttribute: function (t) {
            var e = this.getAttributeNode(t);
            return (e && e.value) || "";
          },
          getAttributeNode: function (t) {
            return this.attributes.getNamedItem(t);
          },
          setAttribute: function (t, e) {
            var i = this.ownerDocument.createAttribute(t);
            (i.value = i.nodeValue = "" + e), this.setAttributeNode(i);
          },
          removeAttribute: function (t) {
            var e = this.getAttributeNode(t);
            e && this.removeAttributeNode(e);
          },
          appendChild: function (t) {
            return t.nodeType === w
              ? this.insertBefore(t, null)
              : (function (t, e) {
                  var i = e.parentNode;
                  if (i) {
                    var n = t.lastChild;
                    i.removeChild(e);
                    n = t.lastChild;
                  }
                  return (
                    (n = t.lastChild),
                    (e.parentNode = t),
                    (e.previousSibling = n),
                    (e.nextSibling = null),
                    n ? (n.nextSibling = e) : (t.firstChild = e),
                    (t.lastChild = e),
                    F(t.ownerDocument, t, e),
                    e
                  );
                })(this, t);
          },
          setAttributeNode: function (t) {
            return this.attributes.setNamedItem(t);
          },
          setAttributeNodeNS: function (t) {
            return this.attributes.setNamedItemNS(t);
          },
          removeAttributeNode: function (t) {
            return this.attributes.removeNamedItem(t.nodeName);
          },
          removeAttributeNS: function (t, e) {
            var i = this.getAttributeNodeNS(t, e);
            i && this.removeAttributeNode(i);
          },
          hasAttributeNS: function (t, e) {
            return null != this.getAttributeNodeNS(t, e);
          },
          getAttributeNS: function (t, e) {
            var i = this.getAttributeNodeNS(t, e);
            return (i && i.value) || "";
          },
          setAttributeNS: function (t, e, i) {
            var n = this.ownerDocument.createAttributeNS(t, e);
            (n.value = n.nodeValue = "" + i), this.setAttributeNode(n);
          },
          getAttributeNodeNS: function (t, e) {
            return this.attributes.getNamedItemNS(t, e);
          },
          getElementsByTagName: function (t) {
            return new I(this, function (e) {
              var i = [];
              return (
                z(e, function (n) {
                  n === e ||
                    n.nodeType != c ||
                    ("*" !== t && n.tagName != t) ||
                    i.push(n);
                }),
                i
              );
            });
          },
          getElementsByTagNameNS: function (t, e) {
            return new I(this, function (i) {
              var n = [];
              return (
                z(i, function (r) {
                  r === i ||
                    r.nodeType !== c ||
                    ("*" !== t && r.namespaceURI !== t) ||
                    ("*" !== e && r.localName != e) ||
                    n.push(r);
                }),
                n
              );
            });
          },
        }),
        (B.prototype.getElementsByTagName = H.prototype.getElementsByTagName),
        (B.prototype.getElementsByTagNameNS =
          H.prototype.getElementsByTagNameNS),
        h(H, P),
        (V.prototype.nodeType = u),
        h(V, P),
        (X.prototype = {
          data: "",
          substringData: function (t, e) {
            return this.data.substring(t, t + e);
          },
          appendData: function (t) {
            (t = this.data + t),
              (this.nodeValue = this.data = t),
              (this.length = t.length);
          },
          insertData: function (t, e) {
            this.replaceData(t, 0, e);
          },
          appendChild: function (t) {
            throw new Error(S[N]);
          },
          deleteData: function (t, e) {
            this.replaceData(t, e, "");
          },
          replaceData: function (t, e, i) {
            (i = this.data.substring(0, t) + i + this.data.substring(t + e)),
              (this.nodeValue = this.data = i),
              (this.length = i.length);
          },
        }),
        h(X, P),
        (G.prototype = {
          nodeName: "#text",
          nodeType: d,
          splitText: function (t) {
            var e = this.data,
              i = e.substring(t);
            (e = e.substring(0, t)),
              (this.data = this.nodeValue = e),
              (this.length = e.length);
            var n = this.ownerDocument.createTextNode(i);
            return (
              this.parentNode &&
                this.parentNode.insertBefore(n, this.nextSibling),
              n
            );
          },
        }),
        h(G, X),
        (Y.prototype = { nodeName: "#comment", nodeType: v }),
        h(Y, X),
        ($.prototype = { nodeName: "#cdata-section", nodeType: f }),
        h($, X),
        (K.prototype.nodeType = b),
        h(K, P),
        (Z.prototype.nodeType = x),
        h(Z, P),
        (J.prototype.nodeType = g),
        h(J, P),
        (Q.prototype.nodeType = p),
        h(Q, P),
        (tt.prototype.nodeName = "#document-fragment"),
        (tt.prototype.nodeType = w),
        h(tt, P),
        (et.prototype.nodeType = m),
        h(et, P),
        (it.prototype.serializeToString = function (t, e, i) {
          return nt.call(t, e, i);
        }),
        (P.prototype.toString = nt);
      try {
        if (Object.defineProperty) {
          Object.defineProperty(I.prototype, "length", {
            get: function () {
              return k(this), this.$$length;
            },
          }),
            Object.defineProperty(P.prototype, "textContent", {
              get: function () {
                return (function t(e) {
                  switch (e.nodeType) {
                    case c:
                    case w:
                      var i = [];
                      for (e = e.firstChild; e; )
                        7 !== e.nodeType && 8 !== e.nodeType && i.push(t(e)),
                          (e = e.nextSibling);
                      return i.join("");
                    default:
                      return e.nodeValue;
                  }
                })(this);
              },
              set: function (t) {
                switch (this.nodeType) {
                  case c:
                  case w:
                    for (; this.firstChild; ) this.removeChild(this.firstChild);
                    (t || String(t)) &&
                      this.appendChild(this.ownerDocument.createTextNode(t));
                    break;
                  default:
                    (this.data = t), (this.value = t), (this.nodeValue = t);
                }
              },
            }),
            (at = function (t, e, i) {
              t["$$" + e] = i;
            });
        }
      } catch (t) {}
      (e.DocumentType = K),
        (e.DOMException = T),
        (e.DOMImplementation = D),
        (e.Element = H),
        (e.Node = P),
        (e.NodeList = C),
        (e.XMLSerializer = it);
    },
    function (t, e, i) {
      var n = i(13),
        r = i(52),
        s = i(32),
        o = i(27),
        a = i(55),
        h = i(12),
        l = i(61),
        c = Object.getOwnPropertyDescriptor;
      e.f = n
        ? c
        : function (t, e) {
            if (((t = o(t)), (e = a(e)), l))
              try {
                return c(t, e);
              } catch (t) {}
            if (h(t, e)) return s(!r.f.call(t, e), t[e]);
          };
    },
    function (t, e, i) {
      "use strict";
      var n = {}.propertyIsEnumerable,
        r = Object.getOwnPropertyDescriptor,
        s = r && !n.call({ 1: 2 }, 1);
      e.f = s
        ? function (t) {
            var e = r(this, t);
            return !!e && e.enumerable;
          }
        : n;
    },
    function (t, e, i) {
      var n = i(11),
        r = i(97),
        s = "".split;
      t.exports = n(function () {
        return !Object("z").propertyIsEnumerable(0);
      })
        ? function (t) {
            return "String" == r(t) ? s.call(t, "") : Object(t);
          }
        : Object;
    },
    function (t, e) {
      t.exports = function (t) {
        if (null == t) throw TypeError("Can't call method on " + t);
        return t;
      };
    },
    function (t, e, i) {
      var n = i(98),
        r = i(56);
      t.exports = function (t) {
        var e = n(t, "string");
        return r(e) ? e : String(e);
      };
    },
    function (t, e, i) {
      var n = i(7),
        r = i(19),
        s = i(57);
      t.exports = s
        ? function (t) {
            return "symbol" == typeof t;
          }
        : function (t) {
            var e = r("Symbol");
            return n(e) && Object(t) instanceof e;
          };
    },
    function (t, e, i) {
      var n = i(58);
      t.exports = n && !Symbol.sham && "symbol" == typeof Symbol.iterator;
    },
    function (t, e, i) {
      var n = i(99),
        r = i(11);
      t.exports =
        !!Object.getOwnPropertySymbols &&
        !r(function () {
          var t = Symbol();
          return (
            !String(t) ||
            !(Object(t) instanceof Symbol) ||
            (!Symbol.sham && n && n < 41)
          );
        });
    },
    function (t, e, i) {
      var n = i(33),
        r = i(34);
      (t.exports = function (t, e) {
        return r[t] || (r[t] = void 0 !== e ? e : {});
      })("versions", []).push({
        version: "3.18.3",
        mode: n ? "pure" : "global",
        copyright: "© 2021 Denis Pushkarev (zloirock.ru)",
      });
    },
    function (t, e) {
      var i = 0,
        n = Math.random();
      t.exports = function (t) {
        return (
          "Symbol(" +
          String(void 0 === t ? "" : t) +
          ")_" +
          (++i + n).toString(36)
        );
      };
    },
    function (t, e, i) {
      var n = i(13),
        r = i(11),
        s = i(37);
      t.exports =
        !n &&
        !r(function () {
          return (
            7 !=
            Object.defineProperty(s("div"), "a", {
              get: function () {
                return 7;
              },
            }).a
          );
        });
    },
    function (t, e, i) {
      var n = i(7),
        r = i(34),
        s = Function.toString;
      n(r.inspectSource) ||
        (r.inspectSource = function (t) {
          return s.call(t);
        }),
        (t.exports = r.inspectSource);
    },
    function (t, e, i) {
      var n,
        r,
        s,
        o = i(105),
        a = i(9),
        h = i(18),
        l = i(20),
        c = i(12),
        u = i(34),
        d = i(39),
        f = i(40),
        p = a.WeakMap;
      if (o || u.state) {
        var g = u.state || (u.state = new p()),
          m = g.get,
          v = g.has,
          y = g.set;
        (n = function (t, e) {
          if (v.call(g, t)) throw new TypeError("Object already initialized");
          return (e.facade = t), y.call(g, t, e), e;
        }),
          (r = function (t) {
            return m.call(g, t) || {};
          }),
          (s = function (t) {
            return v.call(g, t);
          });
      } else {
        var b = d("state");
        (f[b] = !0),
          (n = function (t, e) {
            if (c(t, b)) throw new TypeError("Object already initialized");
            return (e.facade = t), l(t, b, e), e;
          }),
          (r = function (t) {
            return c(t, b) ? t[b] : {};
          }),
          (s = function (t) {
            return c(t, b);
          });
      }
      t.exports = {
        set: n,
        get: r,
        has: s,
        enforce: function (t) {
          return s(t) ? r(t) : n(t, {});
        },
        getterFor: function (t) {
          return function (e) {
            var i;
            if (!h(e) || (i = r(e)).type !== t)
              throw TypeError("Incompatible receiver, " + t + " required");
            return i;
          };
        },
      };
    },
    function (t, e, i) {
      var n = i(13),
        r = i(12),
        s = Function.prototype,
        o = n && Object.getOwnPropertyDescriptor,
        a = r(s, "name"),
        h = a && "something" === function () {}.name,
        l = a && (!n || (n && o(s, "name").configurable));
      t.exports = { EXISTS: a, PROPER: h, CONFIGURABLE: l };
    },
    function (t, e, i) {
      var n = i(12),
        r = i(27),
        s = i(109).indexOf,
        o = i(40);
      t.exports = function (t, e) {
        var i,
          a = r(t),
          h = 0,
          l = [];
        for (i in a) !n(o, i) && n(a, i) && l.push(i);
        for (; e.length > h; ) n(a, (i = e[h++])) && (~s(l, i) || l.push(i));
        return l;
      };
    },
    function (t, e) {
      var i = Math.ceil,
        n = Math.floor;
      t.exports = function (t) {
        var e = +t;
        return e != e || 0 === e ? 0 : (e > 0 ? n : i)(e);
      };
    },
    function (t, e) {
      e.f = Object.getOwnPropertySymbols;
    },
    function (t, e, i) {
      var n = i(9),
        r = i(114),
        s = i(115),
        o = i(116),
        a = i(20),
        h = i(14),
        l = h("iterator"),
        c = h("toStringTag"),
        u = o.values,
        d = function (t, e) {
          if (t) {
            if (t[l] !== u)
              try {
                a(t, l, u);
              } catch (e) {
                t[l] = u;
              }
            if ((t[c] || a(t, c, e), r[e]))
              for (var i in o)
                if (t[i] !== o[i])
                  try {
                    a(t, i, o[i]);
                  } catch (e) {
                    t[i] = o[i];
                  }
          }
        };
      for (var f in r) d(n[f] && n[f].prototype, f);
      d(s, "DOMTokenList");
    },
    function (t, e, i) {
      var n = i(65),
        r = i(41);
      t.exports =
        Object.keys ||
        function (t) {
          return n(t, r);
        };
    },
    function (t, e, i) {
      "use strict";
      var n,
        r,
        s,
        o = i(11),
        a = i(7),
        h = i(42),
        l = i(71),
        c = i(38),
        u = i(14),
        d = i(33),
        f = u("iterator"),
        p = !1;
      [].keys &&
        ("next" in (s = [].keys())
          ? (r = l(l(s))) !== Object.prototype && (n = r)
          : (p = !0)),
        null == n ||
        o(function () {
          var t = {};
          return n[f].call(t) !== t;
        })
          ? (n = {})
          : d && (n = h(n)),
        a(n[f]) ||
          c(n, f, function () {
            return this;
          }),
        (t.exports = { IteratorPrototype: n, BUGGY_SAFARI_ITERATORS: p });
    },
    function (t, e, i) {
      var n = i(12),
        r = i(7),
        s = i(36),
        o = i(39),
        a = i(122),
        h = o("IE_PROTO"),
        l = Object.prototype;
      t.exports = a
        ? Object.getPrototypeOf
        : function (t) {
            var e = s(t);
            if (n(e, h)) return e[h];
            var i = e.constructor;
            return r(i) && e instanceof i
              ? i.prototype
              : e instanceof Object
                ? l
                : null;
          };
    },
    function (t, e, i) {
      var n = i(21).f,
        r = i(12),
        s = i(14)("toStringTag");
      t.exports = function (t, e, i) {
        t &&
          !r((t = i ? t : t.prototype), s) &&
          n(t, s, { configurable: !0, value: e });
      };
    },
    function (t, e, i) {
      var n = i(130),
        r = "object" == typeof self && self && self.Object === Object && self,
        s = n || r || Function("return this")();
      t.exports = s;
    },
    function (t, e, i) {
      var n = i(73).Symbol;
      t.exports = n;
    },
    function (t, e, i) {
      var n = i(46),
        r = i(44);
      t.exports = function (t, e, i) {
        var s = !0,
          o = !0;
        if ("function" != typeof t) throw new TypeError("Expected a function");
        return (
          r(i) &&
            ((s = "leading" in i ? !!i.leading : s),
            (o = "trailing" in i ? !!i.trailing : o)),
          n(t, e, { leading: s, maxWait: e, trailing: o })
        );
      };
    },
    function (e, i) {
      e.exports = t;
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        function (t) {
          var n = i(49),
            r = i(29),
            s = i(2),
            o = i(23),
            a = i(0),
            h = i(1);
          i(45), i(16), i(47);
          function l(t, e) {
            return new n.a(t, e);
          }
          (l.VERSION = h.b),
            void 0 !== t && (t.EPUBJS_VERSION = h.b),
            (l.Book = n.a),
            (l.Rendition = r.a),
            (l.Contents = o.a),
            (l.CFI = s.a),
            (l.utils = a),
            (e.default = l);
        }.call(this, i(25));
    },
    function (t, e, i) {
      "use strict";
      var n = i(79),
        r = i(87),
        s = i(88),
        o = i(89);
      (t.exports = function (t, e) {
        var i, s, a, h, l;
        return (
          arguments.length < 2 || "string" != typeof t
            ? ((h = e), (e = t), (t = null))
            : (h = arguments[2]),
          null == t
            ? ((i = a = !0), (s = !1))
            : ((i = o.call(t, "c")),
              (s = o.call(t, "e")),
              (a = o.call(t, "w"))),
          (l = { value: e, configurable: i, enumerable: s, writable: a }),
          h ? n(r(h), l) : l
        );
      }).gs = function (t, e, i) {
        var a, h, l, c;
        return (
          "string" != typeof t
            ? ((l = i), (i = e), (e = t), (t = null))
            : (l = arguments[3]),
          null == e
            ? (e = void 0)
            : s(e)
              ? null == i
                ? (i = void 0)
                : s(i) || ((l = i), (i = void 0))
              : ((l = e), (e = i = void 0)),
          null == t
            ? ((a = !0), (h = !1))
            : ((a = o.call(t, "c")), (h = o.call(t, "e"))),
          (c = { get: e, set: i, configurable: a, enumerable: h }),
          l ? n(r(l), c) : c
        );
      };
    },
    function (t, e, i) {
      "use strict";
      t.exports = i(80)() ? Object.assign : i(81);
    },
    function (t, e, i) {
      "use strict";
      t.exports = function () {
        var t,
          e = Object.assign;
        return (
          "function" == typeof e &&
          (e((t = { foo: "raz" }), { bar: "dwa" }, { trzy: "trzy" }),
          t.foo + t.bar + t.trzy === "razdwatrzy")
        );
      };
    },
    function (t, e, i) {
      "use strict";
      var n = i(82),
        r = i(86),
        s = Math.max;
      t.exports = function (t, e) {
        var i,
          o,
          a,
          h = s(arguments.length, 2);
        for (
          t = Object(r(t)),
            a = function (n) {
              try {
                t[n] = e[n];
              } catch (t) {
                i || (i = t);
              }
            },
            o = 1;
          o < h;
          ++o
        )
          n((e = arguments[o])).forEach(a);
        if (void 0 !== i) throw i;
        return t;
      };
    },
    function (t, e, i) {
      "use strict";
      t.exports = i(83)() ? Object.keys : i(84);
    },
    function (t, e, i) {
      "use strict";
      t.exports = function () {
        try {
          return Object.keys("primitive"), !0;
        } catch (t) {
          return !1;
        }
      };
    },
    function (t, e, i) {
      "use strict";
      var n = i(30),
        r = Object.keys;
      t.exports = function (t) {
        return r(n(t) ? Object(t) : t);
      };
    },
    function (t, e, i) {
      "use strict";
      t.exports = function () {};
    },
    function (t, e, i) {
      "use strict";
      var n = i(30);
      t.exports = function (t) {
        if (!n(t)) throw new TypeError("Cannot use null or undefined");
        return t;
      };
    },
    function (t, e, i) {
      "use strict";
      var n = i(30),
        r = Array.prototype.forEach,
        s = Object.create,
        o = function (t, e) {
          var i;
          for (i in t) e[i] = t[i];
        };
      t.exports = function (t) {
        var e = s(null);
        return (
          r.call(arguments, function (t) {
            n(t) && o(Object(t), e);
          }),
          e
        );
      };
    },
    function (t, e, i) {
      "use strict";
      t.exports = function (t) {
        return "function" == typeof t;
      };
    },
    function (t, e, i) {
      "use strict";
      t.exports = i(90)() ? String.prototype.contains : i(91);
    },
    function (t, e, i) {
      "use strict";
      var n = "razdwatrzy";
      t.exports = function () {
        return (
          "function" == typeof n.contains &&
          !0 === n.contains("dwa") &&
          !1 === n.contains("foo")
        );
      };
    },
    function (t, e, i) {
      "use strict";
      var n = String.prototype.indexOf;
      t.exports = function (t) {
        return n.call(this, t, arguments[1]) > -1;
      };
    },
    function (t, e, i) {
      "use strict";
      t.exports = function (t) {
        if ("function" != typeof t)
          throw new TypeError(t + " is not a function");
        return t;
      };
    },
    function (t, e, i) {
      var n = i(26),
        r = i(50),
        s = i(94),
        o = i(95),
        a = r.DOMImplementation,
        h = n.NAMESPACE,
        l = o.ParseError,
        c = o.XMLReader;
      function u(t) {
        this.options = t || { locator: {} };
      }
      function d() {
        this.cdata = !1;
      }
      function f(t, e) {
        (e.lineNumber = t.lineNumber), (e.columnNumber = t.columnNumber);
      }
      function p(t) {
        if (t)
          return (
            "\\n@" +
            (t.systemId || "") +
            "#[line:" +
            t.lineNumber +
            ",col:" +
            t.columnNumber +
            "]"
          );
      }
      function g(t, e, i) {
        return "string" == typeof t
          ? t.substr(e, i)
          : t.length >= e + i || e
            ? new java.lang.String(t, e, i) + ""
            : t;
      }
      function m(t, e) {
        t.currentElement
          ? t.currentElement.appendChild(e)
          : t.doc.appendChild(e);
      }
      (u.prototype.parseFromString = function (t, e) {
        var i = this.options,
          n = new c(),
          r = i.domBuilder || new d(),
          o = i.errorHandler,
          a = i.locator,
          l = i.xmlns || {},
          u = /\\/x?html?$/.test(e),
          f = u ? s.HTML_ENTITIES : s.XML_ENTITIES;
        return (
          a && r.setDocumentLocator(a),
          (n.errorHandler = (function (t, e, i) {
            if (!t) {
              if (e instanceof d) return e;
              t = e;
            }
            var n = {},
              r = t instanceof Function;
            function s(e) {
              var s = t[e];
              !s &&
                r &&
                (s =
                  2 == t.length
                    ? function (i) {
                        t(e, i);
                      }
                    : t),
                (n[e] =
                  (s &&
                    function (t) {
                      s("[xmldom " + e + "]\\t" + t + p(i));
                    }) ||
                  function () {});
            }
            return (i = i || {}), s("warning"), s("error"), s("fatalError"), n;
          })(o, r, a)),
          (n.domBuilder = i.domBuilder || r),
          u && (l[""] = h.HTML),
          (l.xml = l.xml || h.XML),
          t && "string" == typeof t
            ? n.parse(t, l, f)
            : n.errorHandler.error("invalid doc source"),
          r.doc
        );
      }),
        (d.prototype = {
          startDocument: function () {
            (this.doc = new a().createDocument(null, null, null)),
              this.locator && (this.doc.documentURI = this.locator.systemId);
          },
          startElement: function (t, e, i, n) {
            var r = this.doc,
              s = r.createElementNS(t, i || e),
              o = n.length;
            m(this, s),
              (this.currentElement = s),
              this.locator && f(this.locator, s);
            for (var a = 0; a < o; a++) {
              t = n.getURI(a);
              var h = n.getValue(a),
                l = ((i = n.getQName(a)), r.createAttributeNS(t, i));
              this.locator && f(n.getLocator(a), l),
                (l.value = l.nodeValue = h),
                s.setAttributeNode(l);
            }
          },
          endElement: function (t, e, i) {
            var n = this.currentElement;
            n.tagName;
            this.currentElement = n.parentNode;
          },
          startPrefixMapping: function (t, e) {},
          endPrefixMapping: function (t) {},
          processingInstruction: function (t, e) {
            var i = this.doc.createProcessingInstruction(t, e);
            this.locator && f(this.locator, i), m(this, i);
          },
          ignorableWhitespace: function (t, e, i) {},
          characters: function (t, e, i) {
            if ((t = g.apply(this, arguments))) {
              if (this.cdata) var n = this.doc.createCDATASection(t);
              else n = this.doc.createTextNode(t);
              this.currentElement
                ? this.currentElement.appendChild(n)
                : /^\\s*$/.test(t) && this.doc.appendChild(n),
                this.locator && f(this.locator, n);
            }
          },
          skippedEntity: function (t) {},
          endDocument: function () {
            this.doc.normalize();
          },
          setDocumentLocator: function (t) {
            (this.locator = t) && (t.lineNumber = 0);
          },
          comment: function (t, e, i) {
            t = g.apply(this, arguments);
            var n = this.doc.createComment(t);
            this.locator && f(this.locator, n), m(this, n);
          },
          startCDATA: function () {
            this.cdata = !0;
          },
          endCDATA: function () {
            this.cdata = !1;
          },
          startDTD: function (t, e, i) {
            var n = this.doc.implementation;
            if (n && n.createDocumentType) {
              var r = n.createDocumentType(t, e, i);
              this.locator && f(this.locator, r),
                m(this, r),
                (this.doc.doctype = r);
            }
          },
          warning: function (t) {
            console.warn("[xmldom warning]\\t" + t, p(this.locator));
          },
          error: function (t) {
            console.error("[xmldom error]\\t" + t, p(this.locator));
          },
          fatalError: function (t) {
            throw new l(t, this.locator);
          },
        }),
        "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
          /\\w+/g,
          function (t) {
            d.prototype[t] = function () {
              return null;
            };
          },
        ),
        (e.__DOMHandler = d),
        (e.DOMParser = u),
        (e.DOMImplementation = r.DOMImplementation),
        (e.XMLSerializer = r.XMLSerializer);
    },
    function (t, e, i) {
      var n = i(26).freeze;
      (e.XML_ENTITIES = n({
        amp: "&",
        apos: "'",
        gt: ">",
        lt: "<",
        quot: '"',
      })),
        (e.HTML_ENTITIES = n({
          lt: "<",
          gt: ">",
          amp: "&",
          quot: '"',
          apos: "'",
          Agrave: "À",
          Aacute: "Á",
          Acirc: "Â",
          Atilde: "Ã",
          Auml: "Ä",
          Aring: "Å",
          AElig: "Æ",
          Ccedil: "Ç",
          Egrave: "È",
          Eacute: "É",
          Ecirc: "Ê",
          Euml: "Ë",
          Igrave: "Ì",
          Iacute: "Í",
          Icirc: "Î",
          Iuml: "Ï",
          ETH: "Ð",
          Ntilde: "Ñ",
          Ograve: "Ò",
          Oacute: "Ó",
          Ocirc: "Ô",
          Otilde: "Õ",
          Ouml: "Ö",
          Oslash: "Ø",
          Ugrave: "Ù",
          Uacute: "Ú",
          Ucirc: "Û",
          Uuml: "Ü",
          Yacute: "Ý",
          THORN: "Þ",
          szlig: "ß",
          agrave: "à",
          aacute: "á",
          acirc: "â",
          atilde: "ã",
          auml: "ä",
          aring: "å",
          aelig: "æ",
          ccedil: "ç",
          egrave: "è",
          eacute: "é",
          ecirc: "ê",
          euml: "ë",
          igrave: "ì",
          iacute: "í",
          icirc: "î",
          iuml: "ï",
          eth: "ð",
          ntilde: "ñ",
          ograve: "ò",
          oacute: "ó",
          ocirc: "ô",
          otilde: "õ",
          ouml: "ö",
          oslash: "ø",
          ugrave: "ù",
          uacute: "ú",
          ucirc: "û",
          uuml: "ü",
          yacute: "ý",
          thorn: "þ",
          yuml: "ÿ",
          nbsp: " ",
          iexcl: "¡",
          cent: "¢",
          pound: "£",
          curren: "¤",
          yen: "¥",
          brvbar: "¦",
          sect: "§",
          uml: "¨",
          copy: "©",
          ordf: "ª",
          laquo: "«",
          not: "¬",
          shy: "­­",
          reg: "®",
          macr: "¯",
          deg: "°",
          plusmn: "±",
          sup2: "²",
          sup3: "³",
          acute: "´",
          micro: "µ",
          para: "¶",
          middot: "·",
          cedil: "¸",
          sup1: "¹",
          ordm: "º",
          raquo: "»",
          frac14: "¼",
          frac12: "½",
          frac34: "¾",
          iquest: "¿",
          times: "×",
          divide: "÷",
          forall: "∀",
          part: "∂",
          exist: "∃",
          empty: "∅",
          nabla: "∇",
          isin: "∈",
          notin: "∉",
          ni: "∋",
          prod: "∏",
          sum: "∑",
          minus: "−",
          lowast: "∗",
          radic: "√",
          prop: "∝",
          infin: "∞",
          ang: "∠",
          and: "∧",
          or: "∨",
          cap: "∩",
          cup: "∪",
          int: "∫",
          there4: "∴",
          sim: "∼",
          cong: "≅",
          asymp: "≈",
          ne: "≠",
          equiv: "≡",
          le: "≤",
          ge: "≥",
          sub: "⊂",
          sup: "⊃",
          nsub: "⊄",
          sube: "⊆",
          supe: "⊇",
          oplus: "⊕",
          otimes: "⊗",
          perp: "⊥",
          sdot: "⋅",
          Alpha: "Α",
          Beta: "Β",
          Gamma: "Γ",
          Delta: "Δ",
          Epsilon: "Ε",
          Zeta: "Ζ",
          Eta: "Η",
          Theta: "Θ",
          Iota: "Ι",
          Kappa: "Κ",
          Lambda: "Λ",
          Mu: "Μ",
          Nu: "Ν",
          Xi: "Ξ",
          Omicron: "Ο",
          Pi: "Π",
          Rho: "Ρ",
          Sigma: "Σ",
          Tau: "Τ",
          Upsilon: "Υ",
          Phi: "Φ",
          Chi: "Χ",
          Psi: "Ψ",
          Omega: "Ω",
          alpha: "α",
          beta: "β",
          gamma: "γ",
          delta: "δ",
          epsilon: "ε",
          zeta: "ζ",
          eta: "η",
          theta: "θ",
          iota: "ι",
          kappa: "κ",
          lambda: "λ",
          mu: "μ",
          nu: "ν",
          xi: "ξ",
          omicron: "ο",
          pi: "π",
          rho: "ρ",
          sigmaf: "ς",
          sigma: "σ",
          tau: "τ",
          upsilon: "υ",
          phi: "φ",
          chi: "χ",
          psi: "ψ",
          omega: "ω",
          thetasym: "ϑ",
          upsih: "ϒ",
          piv: "ϖ",
          OElig: "Œ",
          oelig: "œ",
          Scaron: "Š",
          scaron: "š",
          Yuml: "Ÿ",
          fnof: "ƒ",
          circ: "ˆ",
          tilde: "˜",
          ensp: " ",
          emsp: " ",
          thinsp: " ",
          zwnj: "‌",
          zwj: "‍",
          lrm: "‎",
          rlm: "‏",
          ndash: "–",
          mdash: "—",
          lsquo: "‘",
          rsquo: "’",
          sbquo: "‚",
          ldquo: "“",
          rdquo: "”",
          bdquo: "„",
          dagger: "†",
          Dagger: "‡",
          bull: "•",
          hellip: "…",
          permil: "‰",
          prime: "′",
          Prime: "″",
          lsaquo: "‹",
          rsaquo: "›",
          oline: "‾",
          euro: "€",
          trade: "™",
          larr: "←",
          uarr: "↑",
          rarr: "→",
          darr: "↓",
          harr: "↔",
          crarr: "↵",
          lceil: "⌈",
          rceil: "⌉",
          lfloor: "⌊",
          rfloor: "⌋",
          loz: "◊",
          spades: "♠",
          clubs: "♣",
          hearts: "♥",
          diams: "♦",
        })),
        (e.entityMap = e.HTML_ENTITIES);
    },
    function (t, e, i) {
      var n = i(26).NAMESPACE,
        r =
          /[A-Z_a-z\\xC0-\\xD6\\xD8-\\xF6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD]/,
        s = new RegExp(
          "[\\\\-\\\\.0-9" +
            r.source.slice(1, -1) +
            "\\\\u00B7\\\\u0300-\\\\u036F\\\\u203F-\\\\u2040]",
        ),
        o = new RegExp(
          "^" + r.source + s.source + "*(?::" + r.source + s.source + "*)?$",
        );
      function a(t, e) {
        (this.message = t),
          (this.locator = e),
          Error.captureStackTrace && Error.captureStackTrace(this, a);
      }
      function h() {}
      function l(t, e) {
        return (
          (e.lineNumber = t.lineNumber), (e.columnNumber = t.columnNumber), e
        );
      }
      function c(t, e, i, r, s, o) {
        function a(t, e, n) {
          i.attributeNames.hasOwnProperty(t) &&
            o.fatalError("Attribute " + t + " redefined"),
            i.addValue(t, e, n);
        }
        for (var h, l = ++e, c = 0; ; ) {
          var u = t.charAt(l);
          switch (u) {
            case "=":
              if (1 === c) (h = t.slice(e, l)), (c = 3);
              else {
                if (2 !== c)
                  throw new Error("attribute equal must after attrName");
                c = 3;
              }
              break;
            case "'":
            case '"':
              if (3 === c || 1 === c) {
                if (
                  (1 === c &&
                    (o.warning('attribute value must after "="'),
                    (h = t.slice(e, l))),
                  (e = l + 1),
                  !((l = t.indexOf(u, e)) > 0))
                )
                  throw new Error("attribute value no end '" + u + "' match");
                a(h, (d = t.slice(e, l).replace(/&#?\\w+;/g, s)), e - 1),
                  (c = 5);
              } else {
                if (4 != c) throw new Error('attribute value must after "="');
                a(h, (d = t.slice(e, l).replace(/&#?\\w+;/g, s)), e),
                  o.warning(
                    'attribute "' + h + '" missed start quot(' + u + ")!!",
                  ),
                  (e = l + 1),
                  (c = 5);
              }
              break;
            case "/":
              switch (c) {
                case 0:
                  i.setTagName(t.slice(e, l));
                case 5:
                case 6:
                case 7:
                  (c = 7), (i.closed = !0);
                case 4:
                case 1:
                case 2:
                  break;
                default:
                  throw new Error("attribute invalid close char('/')");
              }
              break;
            case "":
              return (
                o.error("unexpected end of input"),
                0 == c && i.setTagName(t.slice(e, l)),
                l
              );
            case ">":
              switch (c) {
                case 0:
                  i.setTagName(t.slice(e, l));
                case 5:
                case 6:
                case 7:
                  break;
                case 4:
                case 1:
                  "/" === (d = t.slice(e, l)).slice(-1) &&
                    ((i.closed = !0), (d = d.slice(0, -1)));
                case 2:
                  2 === c && (d = h),
                    4 == c
                      ? (o.warning('attribute "' + d + '" missed quot(")!'),
                        a(h, d.replace(/&#?\\w+;/g, s), e))
                      : ((n.isHTML(r[""]) &&
                          d.match(/^(?:disabled|checked|selected)$/i)) ||
                          o.warning(
                            'attribute "' +
                              d +
                              '" missed value!! "' +
                              d +
                              '" instead!!',
                          ),
                        a(d, d, e));
                  break;
                case 3:
                  throw new Error("attribute value missed!!");
              }
              return l;
            case "":
              u = " ";
            default:
              if (u <= " ")
                switch (c) {
                  case 0:
                    i.setTagName(t.slice(e, l)), (c = 6);
                    break;
                  case 1:
                    (h = t.slice(e, l)), (c = 2);
                    break;
                  case 4:
                    var d = t.slice(e, l).replace(/&#?\\w+;/g, s);
                    o.warning('attribute "' + d + '" missed quot(")!!'),
                      a(h, d, e);
                  case 5:
                    c = 6;
                }
              else
                switch (c) {
                  case 2:
                    i.tagName;
                    (n.isHTML(r[""]) &&
                      h.match(/^(?:disabled|checked|selected)$/i)) ||
                      o.warning(
                        'attribute "' +
                          h +
                          '" missed value!! "' +
                          h +
                          '" instead2!!',
                      ),
                      a(h, h, e),
                      (e = l),
                      (c = 1);
                    break;
                  case 5:
                    o.warning('attribute space is required"' + h + '"!!');
                  case 6:
                    (c = 1), (e = l);
                    break;
                  case 3:
                    (c = 4), (e = l);
                    break;
                  case 7:
                    throw new Error(
                      "elements closed character '/' and '>' must be connected to",
                    );
                }
          }
          l++;
        }
      }
      function u(t, e, i) {
        for (var r = t.tagName, s = null, o = t.length; o--; ) {
          var a = t[o],
            h = a.qName,
            l = a.value;
          if ((f = h.indexOf(":")) > 0)
            var c = (a.prefix = h.slice(0, f)),
              u = h.slice(f + 1),
              d = "xmlns" === c && u;
          else (u = h), (c = null), (d = "xmlns" === h && "");
          (a.localName = u),
            !1 !== d &&
              (null == s && ((s = {}), p(i, (i = {}))),
              (i[d] = s[d] = l),
              (a.uri = n.XMLNS),
              e.startPrefixMapping(d, l));
        }
        for (o = t.length; o--; ) {
          (c = (a = t[o]).prefix) &&
            ("xml" === c && (a.uri = n.XML),
            "xmlns" !== c && (a.uri = i[c || ""]));
        }
        var f;
        (f = r.indexOf(":")) > 0
          ? ((c = t.prefix = r.slice(0, f)), (u = t.localName = r.slice(f + 1)))
          : ((c = null), (u = t.localName = r));
        var g = (t.uri = i[c || ""]);
        if ((e.startElement(g, u, r, t), !t.closed))
          return (t.currentNSMap = i), (t.localNSMap = s), !0;
        if ((e.endElement(g, u, r), s)) for (c in s) e.endPrefixMapping(c);
      }
      function d(t, e, i, n, r) {
        if (/^(?:script|textarea)$/i.test(i)) {
          var s = t.indexOf("</" + i + ">", e),
            o = t.substring(e + 1, s);
          if (/[&<]/.test(o))
            return /^script$/i.test(i)
              ? (r.characters(o, 0, o.length), s)
              : ((o = o.replace(/&#?\\w+;/g, n)),
                r.characters(o, 0, o.length),
                s);
        }
        return e + 1;
      }
      function f(t, e, i, n) {
        var r = n[i];
        return (
          null == r &&
            ((r = t.lastIndexOf("</" + i + ">")) < e &&
              (r = t.lastIndexOf("</" + i)),
            (n[i] = r)),
          r < e
        );
      }
      function p(t, e) {
        for (var i in t) e[i] = t[i];
      }
      function g(t, e, i, n) {
        switch (t.charAt(e + 2)) {
          case "-":
            return "-" === t.charAt(e + 3)
              ? (r = t.indexOf("--\\x3e", e + 4)) > e
                ? (i.comment(t, e + 4, r - e - 4), r + 3)
                : (n.error("Unclosed comment"), -1)
              : -1;
          default:
            if ("CDATA[" == t.substr(e + 3, 6)) {
              var r = t.indexOf("]]>", e + 9);
              return (
                i.startCDATA(),
                i.characters(t, e + 9, r - e - 9),
                i.endCDATA(),
                r + 3
              );
            }
            var s = (function (t, e) {
                var i,
                  n = [],
                  r = /'[^']+'|"[^"]+"|[^\\s<>\\/=]+=?|(\\/?\\s*>|<)/g;
                (r.lastIndex = e), r.exec(t);
                for (; (i = r.exec(t)); ) if ((n.push(i), i[1])) return n;
              })(t, e),
              o = s.length;
            if (o > 1 && /!doctype/i.test(s[0][0])) {
              var a = s[1][0],
                h = !1,
                l = !1;
              o > 3 &&
                (/^public$/i.test(s[2][0])
                  ? ((h = s[3][0]), (l = o > 4 && s[4][0]))
                  : /^system$/i.test(s[2][0]) && (l = s[3][0]));
              var c = s[o - 1];
              return i.startDTD(a, h, l), i.endDTD(), c.index + c[0].length;
            }
        }
        return -1;
      }
      function m(t, e, i) {
        var n = t.indexOf("?>", e);
        if (n) {
          var r = t.substring(e, n).match(/^<\\?(\\S*)\\s*([\\s\\S]*?)\\s*$/);
          if (r) {
            r[0].length;
            return i.processingInstruction(r[1], r[2]), n + 2;
          }
          return -1;
        }
        return -1;
      }
      function v() {
        this.attributeNames = {};
      }
      (a.prototype = new Error()),
        (a.prototype.name = a.name),
        (h.prototype = {
          parse: function (t, e, i) {
            var r = this.domBuilder;
            r.startDocument(),
              p(e, (e = {})),
              (function (t, e, i, r, s) {
                function o(t) {
                  var e = t.slice(1, -1);
                  return e in i
                    ? i[e]
                    : "#" === e.charAt(0)
                      ? (function (t) {
                          if (t > 65535) {
                            var e = 55296 + ((t -= 65536) >> 10),
                              i = 56320 + (1023 & t);
                            return String.fromCharCode(e, i);
                          }
                          return String.fromCharCode(t);
                        })(parseInt(e.substr(1).replace("x", "0x")))
                      : (s.error("entity not found:" + t), t);
                }
                function h(e) {
                  if (e > N) {
                    var i = t.substring(N, e).replace(/&#?\\w+;/g, o);
                    x && p(N), r.characters(i, 0, e - N), (N = e);
                  }
                }
                function p(e, i) {
                  for (; e >= b && (i = w.exec(t)); )
                    (y = i.index), (b = y + i[0].length), x.lineNumber++;
                  x.columnNumber = e - y + 1;
                }
                var y = 0,
                  b = 0,
                  w = /.*(?:\\r\\n?|\\n)|.*$/g,
                  x = r.locator,
                  E = [{ currentNSMap: e }],
                  S = {},
                  N = 0;
                for (;;) {
                  try {
                    var _ = t.indexOf("<", N);
                    if (_ < 0) {
                      if (!t.substr(N).match(/^\\s*$/)) {
                        var O = r.doc,
                          T = O.createTextNode(t.substr(N));
                        O.appendChild(T), (r.currentElement = T);
                      }
                      return;
                    }
                    switch ((_ > N && h(_), t.charAt(_ + 1))) {
                      case "/":
                        var C = t.indexOf(">", _ + 3),
                          I = t.substring(_ + 2, C).replace(/[ \\t\\n\\r]+$/g, ""),
                          k = E.pop();
                        C < 0
                          ? ((I = t.substring(_ + 2).replace(/[\\s<].*/, "")),
                            s.error(
                              "end tag name: " +
                                I +
                                " is not complete:" +
                                k.tagName,
                            ),
                            (C = _ + 1 + I.length))
                          : I.match(/\\s</) &&
                            ((I = I.replace(/[\\s<].*/, "")),
                            s.error(
                              "end tag name: " + I + " maybe not complete",
                            ),
                            (C = _ + 1 + I.length));
                        var R = k.localNSMap,
                          A = k.tagName == I;
                        if (
                          A ||
                          (k.tagName &&
                            k.tagName.toLowerCase() == I.toLowerCase())
                        ) {
                          if ((r.endElement(k.uri, k.localName, I), R))
                            for (var L in R) r.endPrefixMapping(L);
                          A ||
                            s.fatalError(
                              "end tag name: " +
                                I +
                                " is not match the current start tagName:" +
                                k.tagName,
                            );
                        } else E.push(k);
                        C++;
                        break;
                      case "?":
                        x && p(_), (C = m(t, _, r));
                        break;
                      case "!":
                        x && p(_), (C = g(t, _, r, s));
                        break;
                      default:
                        x && p(_);
                        var j = new v(),
                          D = E[E.length - 1].currentNSMap,
                          P = ((C = c(t, _, j, D, o, s)), j.length);
                        if (
                          (!j.closed &&
                            f(t, C, j.tagName, S) &&
                            ((j.closed = !0),
                            i.nbsp || s.warning("unclosed xml attribute")),
                          x && P)
                        ) {
                          for (var M = l(x, {}), z = 0; z < P; z++) {
                            var B = j[z];
                            p(B.offset), (B.locator = l(x, {}));
                          }
                          (r.locator = M),
                            u(j, r, D) && E.push(j),
                            (r.locator = x);
                        } else u(j, r, D) && E.push(j);
                        n.isHTML(j.uri) && !j.closed
                          ? (C = d(t, C, j.tagName, o, r))
                          : C++;
                    }
                  } catch (t) {
                    if (t instanceof a) throw t;
                    s.error("element parse error: " + t), (C = -1);
                  }
                  C > N ? (N = C) : h(Math.max(_, N) + 1);
                }
              })(t, e, i, r, this.errorHandler),
              r.endDocument();
          },
        }),
        (v.prototype = {
          setTagName: function (t) {
            if (!o.test(t)) throw new Error("invalid tagName:" + t);
            this.tagName = t;
          },
          addValue: function (t, e, i) {
            if (!o.test(t)) throw new Error("invalid attribute:" + t);
            (this.attributeNames[t] = this.length),
              (this[this.length++] = { qName: t, value: e, offset: i });
          },
          length: 0,
          getLocalName: function (t) {
            return this[t].localName;
          },
          getLocator: function (t) {
            return this[t].locator;
          },
          getQName: function (t) {
            return this[t].qName;
          },
          getURI: function (t) {
            return this[t].uri;
          },
          getValue: function (t) {
            return this[t].value;
          },
        }),
        (e.XMLReader = h),
        (e.ParseError = a);
    },
    function (t, e, i) {
      var n = i(31),
        r = i(19),
        s = i(11),
        o = r("JSON", "stringify"),
        a = /[\\uD800-\\uDFFF]/g,
        h = /^[\\uD800-\\uDBFF]$/,
        l = /^[\\uDC00-\\uDFFF]$/,
        c = function (t, e, i) {
          var n = i.charAt(e - 1),
            r = i.charAt(e + 1);
          return (h.test(t) && !l.test(r)) || (l.test(t) && !h.test(n))
            ? "\\\\u" + t.charCodeAt(0).toString(16)
            : t;
        },
        u = s(function () {
          return (
            '"\\\\udf06\\\\ud834"' !== o("\\udf06\\ud834") ||
            '"\\\\udead"' !== o("\\udead")
          );
        });
      o &&
        n(
          { target: "JSON", stat: !0, forced: u },
          {
            stringify: function (t, e, i) {
              var n = o.apply(null, arguments);
              return "string" == typeof n ? n.replace(a, c) : n;
            },
          },
        );
    },
    function (t, e) {
      var i = {}.toString;
      t.exports = function (t) {
        return i.call(t).slice(8, -1);
      };
    },
    function (t, e, i) {
      var n = i(18),
        r = i(56),
        s = i(101),
        o = i(104),
        a = i(14)("toPrimitive");
      t.exports = function (t, e) {
        if (!n(t) || r(t)) return t;
        var i,
          h = s(t, a);
        if (h) {
          if (
            (void 0 === e && (e = "default"), (i = h.call(t, e)), !n(i) || r(i))
          )
            return i;
          throw TypeError("Can't convert object to primitive value");
        }
        return void 0 === e && (e = "number"), o(t, e);
      };
    },
    function (t, e, i) {
      var n,
        r,
        s = i(9),
        o = i(100),
        a = s.process,
        h = s.Deno,
        l = (a && a.versions) || (h && h.version),
        c = l && l.v8;
      c
        ? (r = (n = c.split("."))[0] < 4 ? 1 : n[0] + n[1])
        : o &&
          (!(n = o.match(/Edge\\/(\\d+)/)) || n[1] >= 74) &&
          (n = o.match(/Chrome\\/(\\d+)/)) &&
          (r = n[1]),
        (t.exports = r && +r);
    },
    function (t, e, i) {
      var n = i(19);
      t.exports = n("navigator", "userAgent") || "";
    },
    function (t, e, i) {
      var n = i(102);
      t.exports = function (t, e) {
        var i = t[e];
        return null == i ? void 0 : n(i);
      };
    },
    function (t, e, i) {
      var n = i(7),
        r = i(103);
      t.exports = function (t) {
        if (n(t)) return t;
        throw TypeError(r(t) + " is not a function");
      };
    },
    function (t, e) {
      t.exports = function (t) {
        try {
          return String(t);
        } catch (t) {
          return "Object";
        }
      };
    },
    function (t, e, i) {
      var n = i(7),
        r = i(18);
      t.exports = function (t, e) {
        var i, s;
        if ("string" === e && n((i = t.toString)) && !r((s = i.call(t))))
          return s;
        if (n((i = t.valueOf)) && !r((s = i.call(t)))) return s;
        if ("string" !== e && n((i = t.toString)) && !r((s = i.call(t))))
          return s;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    function (t, e, i) {
      var n = i(9),
        r = i(7),
        s = i(62),
        o = n.WeakMap;
      t.exports = r(o) && /native code/.test(s(o));
    },
    function (t, e, i) {
      var n = i(12),
        r = i(107),
        s = i(51),
        o = i(21);
      t.exports = function (t, e) {
        for (var i = r(e), a = o.f, h = s.f, l = 0; l < i.length; l++) {
          var c = i[l];
          n(t, c) || a(t, c, h(e, c));
        }
      };
    },
    function (t, e, i) {
      var n = i(19),
        r = i(108),
        s = i(67),
        o = i(22);
      t.exports =
        n("Reflect", "ownKeys") ||
        function (t) {
          var e = r.f(o(t)),
            i = s.f;
          return i ? e.concat(i(t)) : e;
        };
    },
    function (t, e, i) {
      var n = i(65),
        r = i(41).concat("length", "prototype");
      e.f =
        Object.getOwnPropertyNames ||
        function (t) {
          return n(t, r);
        };
    },
    function (t, e, i) {
      var n = i(27),
        r = i(110),
        s = i(111),
        o = function (t) {
          return function (e, i, o) {
            var a,
              h = n(e),
              l = s(h),
              c = r(o, l);
            if (t && i != i) {
              for (; l > c; ) if ((a = h[c++]) != a) return !0;
            } else
              for (; l > c; c++)
                if ((t || c in h) && h[c] === i) return t || c || 0;
            return !t && -1;
          };
        };
      t.exports = { includes: o(!0), indexOf: o(!1) };
    },
    function (t, e, i) {
      var n = i(66),
        r = Math.max,
        s = Math.min;
      t.exports = function (t, e) {
        var i = n(t);
        return i < 0 ? r(i + e, 0) : s(i, e);
      };
    },
    function (t, e, i) {
      var n = i(112);
      t.exports = function (t) {
        return n(t.length);
      };
    },
    function (t, e, i) {
      var n = i(66),
        r = Math.min;
      t.exports = function (t) {
        return t > 0 ? r(n(t), 9007199254740991) : 0;
      };
    },
    function (t, e, i) {
      var n = i(11),
        r = i(7),
        s = /#|\\.prototype\\./,
        o = function (t, e) {
          var i = h[a(t)];
          return i == c || (i != l && (r(e) ? n(e) : !!e));
        },
        a = (o.normalize = function (t) {
          return String(t).replace(s, ".").toLowerCase();
        }),
        h = (o.data = {}),
        l = (o.NATIVE = "N"),
        c = (o.POLYFILL = "P");
      t.exports = o;
    },
    function (t, e) {
      t.exports = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0,
      };
    },
    function (t, e, i) {
      var n = i(37)("span").classList,
        r = n && n.constructor && n.constructor.prototype;
      t.exports = r === Object.prototype ? void 0 : r;
    },
    function (t, e, i) {
      "use strict";
      var n = i(27),
        r = i(117),
        s = i(43),
        o = i(63),
        a = i(120),
        h = o.set,
        l = o.getterFor("Array Iterator");
      (t.exports = a(
        Array,
        "Array",
        function (t, e) {
          h(this, { type: "Array Iterator", target: n(t), index: 0, kind: e });
        },
        function () {
          var t = l(this),
            e = t.target,
            i = t.kind,
            n = t.index++;
          return !e || n >= e.length
            ? ((t.target = void 0), { value: void 0, done: !0 })
            : "keys" == i
              ? { value: n, done: !1 }
              : "values" == i
                ? { value: e[n], done: !1 }
                : { value: [n, e[n]], done: !1 };
        },
        "values",
      )),
        (s.Arguments = s.Array),
        r("keys"),
        r("values"),
        r("entries");
    },
    function (t, e, i) {
      var n = i(14),
        r = i(42),
        s = i(21),
        o = n("unscopables"),
        a = Array.prototype;
      null == a[o] && s.f(a, o, { configurable: !0, value: r(null) }),
        (t.exports = function (t) {
          a[o][t] = !0;
        });
    },
    function (t, e, i) {
      var n = i(13),
        r = i(21),
        s = i(22),
        o = i(69);
      t.exports = n
        ? Object.defineProperties
        : function (t, e) {
            s(t);
            for (var i, n = o(e), a = n.length, h = 0; a > h; )
              r.f(t, (i = n[h++]), e[i]);
            return t;
          };
    },
    function (t, e, i) {
      var n = i(19);
      t.exports = n("document", "documentElement");
    },
    function (t, e, i) {
      "use strict";
      var n = i(31),
        r = i(33),
        s = i(64),
        o = i(7),
        a = i(121),
        h = i(71),
        l = i(123),
        c = i(72),
        u = i(20),
        d = i(38),
        f = i(14),
        p = i(43),
        g = i(70),
        m = s.PROPER,
        v = s.CONFIGURABLE,
        y = g.IteratorPrototype,
        b = g.BUGGY_SAFARI_ITERATORS,
        w = f("iterator"),
        x = function () {
          return this;
        };
      t.exports = function (t, e, i, s, f, g, E) {
        a(i, e, s);
        var S,
          N,
          _,
          O = function (t) {
            if (t === f && R) return R;
            if (!b && t in I) return I[t];
            switch (t) {
              case "keys":
              case "values":
              case "entries":
                return function () {
                  return new i(this, t);
                };
            }
            return function () {
              return new i(this);
            };
          },
          T = e + " Iterator",
          C = !1,
          I = t.prototype,
          k = I[w] || I["@@iterator"] || (f && I[f]),
          R = (!b && k) || O(f),
          A = ("Array" == e && I.entries) || k;
        if (
          (A &&
            (S = h(A.call(new t()))) !== Object.prototype &&
            S.next &&
            (r || h(S) === y || (l ? l(S, y) : o(S[w]) || d(S, w, x)),
            c(S, T, !0, !0),
            r && (p[T] = x)),
          m &&
            "values" == f &&
            k &&
            "values" !== k.name &&
            (!r && v
              ? u(I, "name", "values")
              : ((C = !0),
                (R = function () {
                  return k.call(this);
                }))),
          f)
        )
          if (
            ((N = {
              values: O("values"),
              keys: g ? R : O("keys"),
              entries: O("entries"),
            }),
            E)
          )
            for (_ in N) (b || C || !(_ in I)) && d(I, _, N[_]);
          else n({ target: e, proto: !0, forced: b || C }, N);
        return (
          (r && !E) || I[w] === R || d(I, w, R, { name: f }), (p[e] = R), N
        );
      };
    },
    function (t, e, i) {
      "use strict";
      var n = i(70).IteratorPrototype,
        r = i(42),
        s = i(32),
        o = i(72),
        a = i(43),
        h = function () {
          return this;
        };
      t.exports = function (t, e, i) {
        var l = e + " Iterator";
        return (
          (t.prototype = r(n, { next: s(1, i) })),
          o(t, l, !1, !0),
          (a[l] = h),
          t
        );
      };
    },
    function (t, e, i) {
      var n = i(11);
      t.exports = !n(function () {
        function t() {}
        return (
          (t.prototype.constructor = null),
          Object.getPrototypeOf(new t()) !== t.prototype
        );
      });
    },
    function (t, e, i) {
      var n = i(22),
        r = i(124);
      t.exports =
        Object.setPrototypeOf ||
        ("__proto__" in {}
          ? (function () {
              var t,
                e = !1,
                i = {};
              try {
                (t = Object.getOwnPropertyDescriptor(
                  Object.prototype,
                  "__proto__",
                ).set).call(i, []),
                  (e = i instanceof Array);
              } catch (t) {}
              return function (i, s) {
                return n(i), r(s), e ? t.call(i, s) : (i.__proto__ = s), i;
              };
            })()
          : void 0);
    },
    function (t, e, i) {
      var n = i(7);
      t.exports = function (t) {
        if ("object" == typeof t || n(t)) return t;
        throw TypeError("Can't set " + String(t) + " as a prototype");
      };
    },
    function (t, e, i) {
      "use strict";
      function n(t) {
        return document.createElementNS("http://www.w3.org/2000/svg", t);
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.createElement = n),
        (e.default = void 0);
      e.default = { createElement: n };
    },
    function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.clone = r),
        (e.default = void 0),
        (e.proxyMouse = n),
        i(127),
        i(68);
      e.default = { proxyMouse: n };
      function n(t, e) {
        function i(i) {
          for (var n = e.length - 1; n >= 0; n--) {
            var o = e[n],
              a = i.clientX,
              h = i.clientY;
            if (
              (i.touches &&
                i.touches.length &&
                ((a = i.touches[0].clientX), (h = i.touches[0].clientY)),
              s(o, t, a, h))
            ) {
              o.dispatchEvent(r(i));
              break;
            }
          }
        }
        if ("iframe" === t.nodeName || "IFRAME" === t.nodeName)
          try {
            this.target = t.contentDocument;
          } catch (e) {
            this.target = t;
          }
        else this.target = t;
        for (var n of ["mouseup", "mousedown", "click", "touchstart"])
          this.target.addEventListener(n, (t) => i(t), !1);
      }
      function r(t) {
        var e = Object.assign({}, t, { bubbles: !1 });
        try {
          return new MouseEvent(t.type, e);
        } catch (n) {
          var i = document.createEvent("MouseEvents");
          return (
            i.initMouseEvent(
              t.type,
              !1,
              e.cancelable,
              e.view,
              e.detail,
              e.screenX,
              e.screenY,
              e.clientX,
              e.clientY,
              e.ctrlKey,
              e.altKey,
              e.shiftKey,
              e.metaKey,
              e.button,
              e.relatedTarget,
            ),
            i
          );
        }
      }
      function s(t, e, i, n) {
        var r = e.getBoundingClientRect();
        function s(t, e, i) {
          var n = t.top - r.top,
            s = t.left - r.left,
            o = n + t.height,
            a = s + t.width;
          return n <= i && s <= e && o > i && a > e;
        }
        if (!s(t.getBoundingClientRect(), i, n)) return !1;
        for (var o = t.getClientRects(), a = 0, h = o.length; a < h; a++)
          if (s(o[a], i, n)) return !0;
        return !1;
      }
    },
    function (t, e, i) {
      var n = i(31),
        r = i(128);
      n(
        { target: "Object", stat: !0, forced: Object.assign !== r },
        { assign: r },
      );
    },
    function (t, e, i) {
      "use strict";
      var n = i(13),
        r = i(11),
        s = i(69),
        o = i(67),
        a = i(52),
        h = i(36),
        l = i(53),
        c = Object.assign,
        u = Object.defineProperty;
      t.exports =
        !c ||
        r(function () {
          if (
            n &&
            1 !==
              c(
                { b: 1 },
                c(
                  u({}, "a", {
                    enumerable: !0,
                    get: function () {
                      u(this, "b", { value: 3, enumerable: !1 });
                    },
                  }),
                  { b: 2 },
                ),
              ).b
          )
            return !0;
          var t = {},
            e = {},
            i = Symbol();
          return (
            (t[i] = 7),
            "abcdefghijklmnopqrst".split("").forEach(function (t) {
              e[t] = t;
            }),
            7 != c({}, t)[i] || "abcdefghijklmnopqrst" != s(c({}, e)).join("")
          );
        })
          ? function (t, e) {
              for (
                var i = h(t), r = arguments.length, c = 1, u = o.f, d = a.f;
                r > c;

              )
                for (
                  var f,
                    p = l(arguments[c++]),
                    g = u ? s(p).concat(u(p)) : s(p),
                    m = g.length,
                    v = 0;
                  m > v;

                )
                  (f = g[v++]), (n && !d.call(p, f)) || (i[f] = p[f]);
              return i;
            }
          : c;
    },
    function (t, e, i) {
      var n = i(73);
      t.exports = function () {
        return n.Date.now();
      };
    },
    function (t, e, i) {
      (function (e) {
        var i = "object" == typeof e && e && e.Object === Object && e;
        t.exports = i;
      }).call(this, i(25));
    },
    function (t, e, i) {
      var n = i(132),
        r = i(44),
        s = i(134),
        o = /^[-+]0x[0-9a-f]+$/i,
        a = /^0b[01]+$/i,
        h = /^0o[0-7]+$/i,
        l = parseInt;
      t.exports = function (t) {
        if ("number" == typeof t) return t;
        if (s(t)) return NaN;
        if (r(t)) {
          var e = "function" == typeof t.valueOf ? t.valueOf() : t;
          t = r(e) ? e + "" : e;
        }
        if ("string" != typeof t) return 0 === t ? t : +t;
        t = n(t);
        var i = a.test(t);
        return i || h.test(t) ? l(t.slice(2), i ? 2 : 8) : o.test(t) ? NaN : +t;
      };
    },
    function (t, e, i) {
      var n = i(133),
        r = /^\\s+/;
      t.exports = function (t) {
        return t ? t.slice(0, n(t) + 1).replace(r, "") : t;
      };
    },
    function (t, e) {
      var i = /\\s/;
      t.exports = function (t) {
        for (var e = t.length; e-- && i.test(t.charAt(e)); );
        return e;
      };
    },
    function (t, e, i) {
      var n = i(135),
        r = i(138);
      t.exports = function (t) {
        return "symbol" == typeof t || (r(t) && "[object Symbol]" == n(t));
      };
    },
    function (t, e, i) {
      var n = i(74),
        r = i(136),
        s = i(137),
        o = n ? n.toStringTag : void 0;
      t.exports = function (t) {
        return null == t
          ? void 0 === t
            ? "[object Undefined]"
            : "[object Null]"
          : o && o in Object(t)
            ? r(t)
            : s(t);
      };
    },
    function (t, e, i) {
      var n = i(74),
        r = Object.prototype,
        s = r.hasOwnProperty,
        o = r.toString,
        a = n ? n.toStringTag : void 0;
      t.exports = function (t) {
        var e = s.call(t, a),
          i = t[a];
        try {
          t[a] = void 0;
          var n = !0;
        } catch (t) {}
        var r = o.call(t);
        return n && (e ? (t[a] = i) : delete t[a]), r;
      };
    },
    function (t, e) {
      var i = Object.prototype.toString;
      t.exports = function (t) {
        return i.call(t);
      };
    },
    function (t, e) {
      t.exports = function (t) {
        return null != t && "object" == typeof t;
      };
    },
  ]).default;
});
`;
