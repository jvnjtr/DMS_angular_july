!(function (t) {
  var e = {};
  function n(r) {
    if (e[r]) return e[r].exports;
    var i = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var i in t)
          n.d(
            r,
            i,
            function (e) {
              return t[e];
            }.bind(null, i)
          );
      return r;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 2));
})([
  function (t, e) {},
  function (t, e, n) {},
  function (t, e, n) {
    "use strict";
    function r(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function i(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    n.r(e);
    var o = (function () {
        function t(e) {
          var n =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            "string" == typeof e
              ? ((this.el = document.createElement(e)), (this.el.className = n))
              : (this.el = e),
            (this.data = {});
        }
        var e, n, o;
        return (
          (e = t),
          (n = [
            {
              key: "data",
              value: function (t, e) {
                return void 0 !== e ? ((this.data[t] = e), this) : this.data[t];
              },
            },
            {
              key: "on",
              value: function (t, e) {
                var n = r(t.split(".")),
                  i = n[0],
                  o = n.slice(1),
                  a = i;
                return (
                  "mousewheel" === a &&
                    /Firefox/i.test(window.navigator.userAgent) &&
                    (a = "DOMMouseScroll"),
                  this.el.addEventListener(a, function (t) {
                    e(t);
                    for (var n = 0; n < o.length; n += 1) {
                      var r = o[n];
                      if ("left" === r && 0 !== t.button) return;
                      if ("right" === r && 2 !== t.button) return;
                      "stop" === r && t.stopPropagation();
                    }
                  }),
                  this
                );
              },
            },
            {
              key: "offset",
              value: function (t) {
                var e = this;
                if (void 0 !== t)
                  return (
                    Object.keys(t).forEach(function (n) {
                      e.css(n, "".concat(t[n], "px"));
                    }),
                    this
                  );
                var n = this.el;
                return {
                  top: n.offsetTop,
                  left: n.offsetLeft,
                  height: n.offsetHeight,
                  width: n.offsetWidth,
                };
              },
            },
            {
              key: "scroll",
              value: function (t) {
                var e = this.el;
                return (
                  void 0 !== t &&
                    (void 0 !== t.left && (e.scrollLeft = t.left),
                    void 0 !== t.top && (e.scrollTop = t.top)),
                  { left: e.scrollLeft, top: e.scrollTop }
                );
              },
            },
            {
              key: "box",
              value: function () {
                return this.el.getBoundingClientRect();
              },
            },
            {
              key: "parent",
              value: function () {
                return new t(this.el.parentNode);
              },
            },
            {
              key: "children",
              value: function () {
                for (
                  var t = this, e = arguments.length, n = new Array(e), r = 0;
                  r < e;
                  r++
                )
                  n[r] = arguments[r];
                return 0 === arguments.length
                  ? this.el.childNodes
                  : (n.forEach(function (e) {
                      return t.child(e);
                    }),
                    this);
              },
            },
            {
              key: "removeChild",
              value: function (t) {
                this.el.removeChild(t);
              },
            },
            {
              key: "child",
              value: function (e) {
                var n = e;
                return (
                  "string" == typeof e
                    ? (n = document.createTextNode(e))
                    : e instanceof t && (n = e.el),
                  this.el.appendChild(n),
                  this
                );
              },
            },
            {
              key: "contains",
              value: function (t) {
                return this.el.contains(t);
              },
            },
            {
              key: "className",
              value: function (t) {
                return void 0 !== t
                  ? ((this.el.className = t), this)
                  : this.el.className;
              },
            },
            {
              key: "addClass",
              value: function (t) {
                return this.el.classList.add(t), this;
              },
            },
            {
              key: "hasClass",
              value: function (t) {
                return this.el.classList.contains(t);
              },
            },
            {
              key: "removeClass",
              value: function (t) {
                return this.el.classList.remove(t), this;
              },
            },
            {
              key: "toggle",
              value: function () {
                var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : "active";
                return this.toggleClass(t);
              },
            },
            {
              key: "toggleClass",
              value: function (t) {
                return this.el.classList.toggle(t);
              },
            },
            {
              key: "active",
              value: function () {
                var t =
                    !(arguments.length > 0 && void 0 !== arguments[0]) ||
                    arguments[0],
                  e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : "active";
                return t ? this.addClass(e) : this.removeClass(e), this;
              },
            },
            {
              key: "checked",
              value: function () {
                var t =
                  !(arguments.length > 0 && void 0 !== arguments[0]) ||
                  arguments[0];
                return this.active(t, "checked"), this;
              },
            },
            {
              key: "disabled",
              value: function () {
                var t =
                  !(arguments.length > 0 && void 0 !== arguments[0]) ||
                  arguments[0];
                return (
                  t ? this.addClass("disabled") : this.removeClass("disabled"),
                  this
                );
              },
            },
            {
              key: "attr",
              value: function (t, e) {
                var n = this;
                if (void 0 !== e) this.el.setAttribute(t, e);
                else {
                  if ("string" == typeof t) return this.el.getAttribute(t);
                  Object.keys(t).forEach(function (e) {
                    n.el.setAttribute(e, t[e]);
                  });
                }
                return this;
              },
            },
            {
              key: "removeAttr",
              value: function (t) {
                return this.el.removeAttribute(t), this;
              },
            },
            {
              key: "html",
              value: function (t) {
                return void 0 !== t
                  ? ((this.el.innerHTML = t), this)
                  : this.el.innerHTML;
              },
            },
            {
              key: "val",
              value: function (t) {
                return void 0 !== t
                  ? ((this.el.value = t), this)
                  : this.el.value;
              },
            },
            {
              key: "focus",
              value: function () {
                this.el.focus();
              },
            },
            {
              key: "cssRemoveKeys",
              value: function () {
                for (
                  var t = this, e = arguments.length, n = new Array(e), r = 0;
                  r < e;
                  r++
                )
                  n[r] = arguments[r];
                return (
                  n.forEach(function (e) {
                    return t.el.style.removeProperty(e);
                  }),
                  this
                );
              },
            },
            {
              key: "css",
              value: function (t, e) {
                var n = this;
                return void 0 === e && "string" != typeof t
                  ? (Object.keys(t).forEach(function (e) {
                      n.el.style[e] = t[e];
                    }),
                    this)
                  : void 0 !== e
                  ? ((this.el.style[t] = e), this)
                  : this.el.style[t];
              },
            },
            {
              key: "computedStyle",
              value: function () {
                return window.getComputedStyle(this.el, null);
              },
            },
            {
              key: "show",
              value: function () {
                return this.css("display", "block"), this;
              },
            },
            {
              key: "hide",
              value: function () {
                return this.css("display", "none"), this;
              },
            },
          ]) && i(e.prototype, n),
          o && i(e, o),
          t
        );
      })(),
      a = function (t) {
        var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        return new o(t, e);
      };
    n(0);
    function l(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    var c = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    function s(t) {
      for (var e = "", n = t; n >= c.length; )
        (n /= c.length), (n -= 1), (e += c[parseInt(n, 10) % c.length]);
      var r = t % c.length;
      return (e += c[r]);
    }
    function u(t) {
      for (var e = 0, n = 0; n < t.length - 1; n += 1) {
        var r = t.charCodeAt(n) - 65,
          i = t.length - 1 - n;
        e += Math.pow(c.length, i) + c.length * r;
      }
      return (e += t.charCodeAt(t.length - 1) - 65);
    }
    function f(t) {
      for (var e = "", n = "", r = 0; r < t.length; r += 1)
        t.charAt(r) >= "0" && t.charAt(r) <= "9"
          ? (n += t.charAt(r))
          : (e += t.charAt(r));
      return [u(e), parseInt(n, 10) - 1];
    }
    function h(t, e) {
      return "".concat(s(t)).concat(e + 1);
    }
    function p(t, e, n) {
      var r =
        arguments.length > 3 && void 0 !== arguments[3]
          ? arguments[3]
          : function () {
              return !0;
            };
      if (0 === e && 0 === n) return t;
      var i = l(f(t), 2),
        o = i[0],
        a = i[1];
      return r(o, a) ? h(o + e, a + n) : t;
    }
    function d(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function y(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var v = (function () {
      function t(e, n, r, i) {
        var o =
            arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
          a =
            arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.sri = e),
          (this.sci = n),
          (this.eri = r),
          (this.eci = i),
          (this.w = o),
          (this.h = a);
      }
      var e, n, r;
      return (
        (e = t),
        (r = [
          {
            key: "valueOf",
            value: function (e) {
              var n = e.split(":"),
                r = d(f(n[0]), 2),
                i = r[0],
                o = r[1],
                a = o,
                l = i;
              if (n.length > 1) {
                var c = d(f(n[1]), 2);
                (l = c[0]), (a = c[1]);
              }
              return new t(o, i, a, l);
            },
          },
        ]),
        (n = [
          {
            key: "set",
            value: function (t, e, n, r) {
              (this.sri = t), (this.sci = e), (this.eri = n), (this.eci = r);
            },
          },
          {
            key: "multiple",
            value: function () {
              return this.eri - this.sri > 0 || this.eci - this.sci > 0;
            },
          },
          {
            key: "includes",
            value: function () {
              for (
                var t = 0, e = 0, n = arguments.length, r = new Array(n), i = 0;
                i < n;
                i++
              )
                r[i] = arguments[i];
              if (1 === r.length) {
                var o = f(r[0]),
                  a = d(o, 2);
                (e = a[0]), (t = a[1]);
              } else 2 === r.length && ((t = r[0]), (e = r[1]));
              var l = this.sri,
                c = this.sci,
                s = this.eri,
                u = this.eci;
              return l <= t && t <= s && c <= e && e <= u;
            },
          },
          {
            key: "each",
            value: function (t) {
              for (
                var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : function () {
                          return !0;
                        },
                  n = this.sri,
                  r = this.sci,
                  i = this.eri,
                  o = this.eci,
                  a = n;
                a <= i;
                a += 1
              )
                if (e(a)) for (var l = r; l <= o; l += 1) t(a, l);
            },
          },
          {
            key: "contains",
            value: function (t) {
              return (
                this.sri <= t.sri &&
                this.sci <= t.sci &&
                this.eri >= t.eri &&
                this.eci >= t.eci
              );
            },
          },
          {
            key: "within",
            value: function (t) {
              return (
                this.sri >= t.sri &&
                this.sci >= t.sci &&
                this.eri <= t.eri &&
                this.eci <= t.eci
              );
            },
          },
          {
            key: "disjoint",
            value: function (t) {
              return (
                this.sri > t.eri ||
                this.sci > t.eci ||
                t.sri > this.eri ||
                t.sci > this.eci
              );
            },
          },
          {
            key: "intersects",
            value: function (t) {
              return (
                this.sri <= t.eri &&
                this.sci <= t.eci &&
                t.sri <= this.eri &&
                t.sci <= this.eci
              );
            },
          },
          {
            key: "union",
            value: function (e) {
              var n = this.sri,
                r = this.sci,
                i = this.eri,
                o = this.eci;
              return new t(
                e.sri < n ? e.sri : n,
                e.sci < r ? e.sci : r,
                e.eri > i ? e.eri : i,
                e.eci > o ? e.eci : o
              );
            },
          },
          {
            key: "difference",
            value: function (e) {
              var n = [],
                r = function (e, r, i, o) {
                  n.push(new t(e, r, i, o));
                },
                i = this.sri,
                o = this.sci,
                a = this.eri,
                l = this.eci,
                c = e.sri - i,
                s = e.sci - o,
                u = a - e.eri,
                f = l - e.eci;
              return (
                c > 0
                  ? (r(i, o, e.sri - 1, l),
                    u > 0
                      ? (r(e.eri + 1, o, a, l),
                        s > 0 && r(e.sri, o, e.eri, e.sci - 1),
                        f > 0 && r(e.sri, e.eci + 1, e.eri, l))
                      : (s > 0 && r(e.sri, o, a, e.sci - 1),
                        f > 0 && r(e.sri, e.eci + 1, a, l)))
                  : u > 0 &&
                    (r(e.eri + 1, o, a, l),
                    s > 0 && r(i, o, e.eri, e.sci - 1),
                    f > 0 && r(i, e.eci + 1, e.eri, l)),
                s > 0
                  ? (r(i, o, a, e.sci - 1),
                    f > 0
                      ? (r(i, e.eri + 1, a, l),
                        c > 0 && r(i, e.sci, e.sri - 1, e.eci),
                        u > 0 && r(e.sri + 1, e.sci, a, e.eci))
                      : (c > 0 && r(i, e.sci, e.sri - 1, l),
                        u > 0 && r(e.sri + 1, e.sci, a, l)))
                  : f > 0 &&
                    (r(a, e.eci + 1, a, l),
                    c > 0 && r(i, o, e.sri - 1, e.eci),
                    u > 0 && r(e.eri + 1, o, a, e.eci)),
                n
              );
            },
          },
          {
            key: "size",
            value: function () {
              return [this.eri - this.sri + 1, this.eci - this.sci + 1];
            },
          },
          {
            key: "toString",
            value: function () {
              var t = this.sri,
                e = this.sci,
                n = this.eri,
                r = this.eci,
                i = h(e, t);
              return (
                this.multiple() && (i = "".concat(i, ":").concat(h(r, n))), i
              );
            },
          },
          {
            key: "clone",
            value: function () {
              return new t(
                this.sri,
                this.sci,
                this.eri,
                this.eci,
                this.w,
                this.h
              );
            },
          },
          {
            key: "equals",
            value: function (t) {
              return (
                this.eri === t.eri &&
                this.eci === t.eci &&
                this.sri === t.sri &&
                this.sci === t.sci
              );
            },
          },
        ]) && y(e.prototype, n),
        r && y(e, r),
        t
      );
    })();
    function b(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var g = (function () {
      function t() {
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.range = new v(0, 0, 0, 0)),
          (this.ri = 0),
          (this.ci = 0);
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "multiple",
            value: function () {
              return this.range.multiple();
            },
          },
          {
            key: "setIndexes",
            value: function (t, e) {
              (this.ri = t), (this.ci = e);
            },
          },
          {
            key: "size",
            value: function () {
              return this.range.size();
            },
          },
        ]) && b(e.prototype, n),
        r && b(e, r),
        t
      );
    })();
    var m = function t() {
      !(function (t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      })(this, t),
        (this.x = 0),
        (this.y = 0),
        (this.ri = 0),
        (this.ci = 0);
    };
    function w(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var k = (function () {
      function t() {
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.undoItems = []),
          (this.redoItems = []);
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "add",
            value: function (t) {
              this.undoItems.push(JSON.stringify(t)), (this.redoItems = []);
            },
          },
          {
            key: "canUndo",
            value: function () {
              return this.undoItems.length > 0;
            },
          },
          {
            key: "canRedo",
            value: function () {
              return this.redoItems.length > 0;
            },
          },
          {
            key: "undo",
            value: function (t, e) {
              var n = this.undoItems,
                r = this.redoItems;
              this.canUndo() &&
                (r.push(JSON.stringify(t)), e(JSON.parse(n.pop())));
            },
          },
          {
            key: "redo",
            value: function (t, e) {
              var n = this.undoItems,
                r = this.redoItems;
              this.canRedo() &&
                (n.push(JSON.stringify(t)), e(JSON.parse(r.pop())));
            },
          },
        ]) && w(e.prototype, n),
        r && w(e, r),
        t
      );
    })();
    function O(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var S = (function () {
      function t() {
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.range = null),
          (this.state = "clear");
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "copy",
            value: function (t) {
              return (this.range = t), (this.state = "copy"), this;
            },
          },
          {
            key: "cut",
            value: function (t) {
              return (this.range = t), (this.state = "cut"), this;
            },
          },
          {
            key: "isCopy",
            value: function () {
              return "copy" === this.state;
            },
          },
          {
            key: "isCut",
            value: function () {
              return "cut" === this.state;
            },
          },
          {
            key: "isClear",
            value: function () {
              return "clear" === this.state;
            },
          },
          {
            key: "clear",
            value: function () {
              (this.range = null), (this.state = "clear");
            },
          },
        ]) && O(e.prototype, n),
        r && O(e, r),
        t
      );
    })();
    function x(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function E(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function j(t, e, n) {
      return e && E(t.prototype, e), n && E(t, n), t;
    }
    var _ = (function () {
        function t(e, n, r) {
          x(this, t), (this.ci = e), (this.operator = n), (this.value = r);
        }
        return (
          j(t, [
            {
              key: "set",
              value: function (t, e) {
                (this.operator = t), (this.value = e);
              },
            },
            {
              key: "includes",
              value: function (t) {
                var e = this.operator,
                  n = this.value;
                return "all" === e || ("in" === e && n.includes(t));
              },
            },
            {
              key: "vlength",
              value: function () {
                var t = this.operator,
                  e = this.value;
                return "in" === t ? e.length : 0;
              },
            },
            {
              key: "getData",
              value: function () {
                return {
                  ci: this.ci,
                  operator: this.operator,
                  value: this.value,
                };
              },
            },
          ]),
          t
        );
      })(),
      C = (function () {
        function t(e, n) {
          x(this, t), (this.ci = e), (this.order = n);
        }
        return (
          j(t, [
            {
              key: "asc",
              value: function () {
                return "asc" === this.order;
              },
            },
            {
              key: "desc",
              value: function () {
                return "desc" === this.order;
              },
            },
          ]),
          t
        );
      })(),
      T = (function () {
        function t() {
          x(this, t),
            (this.ref = null),
            (this.filters = []),
            (this.sort = null);
        }
        return (
          j(t, [
            {
              key: "setData",
              value: function (t) {
                var e = t.ref,
                  n = t.filters,
                  r = t.sort;
                null != e &&
                  ((this.ref = e),
                  (this.filters = n.map(function (t) {
                    return new _(t.ci, t.operator, t.value);
                  })),
                  r && (this.sort = new C(r.ci, r.order)));
              },
            },
            {
              key: "getData",
              value: function () {
                if (this.active()) {
                  var t = this.ref,
                    e = this.filters,
                    n = this.sort;
                  return {
                    ref: t,
                    filters: e.map(function (t) {
                      return t.getData();
                    }),
                    sort: n,
                  };
                }
                return {};
              },
            },
            {
              key: "addFilter",
              value: function (t, e, n) {
                var r = this.getFilter(t);
                null == r ? this.filters.push(new _(t, e, n)) : r.set(e, n);
              },
            },
            {
              key: "setSort",
              value: function (t, e) {
                this.sort = e ? new C(t, e) : null;
              },
            },
            {
              key: "includes",
              value: function (t, e) {
                return !!this.active() && this.hrange().includes(t, e);
              },
            },
            {
              key: "getSort",
              value: function (t) {
                var e = this.sort;
                return e && e.ci === t ? e : null;
              },
            },
            {
              key: "getFilter",
              value: function (t) {
                for (var e = this.filters, n = 0; n < e.length; n += 1)
                  if (e[n].ci === t) return e[n];
                return null;
              },
            },
            {
              key: "filteredRows",
              value: function (t) {
                var e = new Set(),
                  n = new Set();
                if (this.active())
                  for (
                    var r = this.range(),
                      i = r.sri,
                      o = r.eri,
                      a = this.filters,
                      l = i + 1;
                    l <= o;
                    l += 1
                  )
                    for (var c = 0; c < a.length; c += 1) {
                      var s = a[c],
                        u = t(l, s.ci),
                        f = u ? u.text : "";
                      if (!s.includes(f)) {
                        e.add(l);
                        break;
                      }
                      n.add(l);
                    }
                return { rset: e, fset: n };
              },
            },
            {
              key: "items",
              value: function (t, e) {
                var n = {};
                if (this.active())
                  for (
                    var r = this.range(), i = r.sri, o = r.eri, a = i + 1;
                    a <= o;
                    a += 1
                  ) {
                    var l = e(a, t);
                    if (null === l || /^\s*$/.test(l.text))
                      n[""] = (n[""] || 0) + 1;
                    else {
                      var c = l.text,
                        s = (n[c] || 0) + 1;
                      n[c] = s;
                    }
                  }
                return n;
              },
            },
            {
              key: "range",
              value: function () {
                return v.valueOf(this.ref);
              },
            },
            {
              key: "hrange",
              value: function () {
                var t = this.range();
                return (t.eri = t.sri), t;
              },
            },
            {
              key: "clear",
              value: function () {
                (this.ref = null), (this.filters = []), (this.sort = null);
              },
            },
            {
              key: "active",
              value: function () {
                return null !== this.ref;
              },
            },
          ]),
          t
        );
      })();
    function P(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var A = (function () {
      function t() {
        var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this._ = e);
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "forEach",
            value: function (t) {
              this._.forEach(t);
            },
          },
          {
            key: "deleteWithin",
            value: function (t) {
              this._ = this._.filter(function (e) {
                return !e.within(t);
              });
            },
          },
          {
            key: "getFirstIncludes",
            value: function (t, e) {
              for (var n = 0; n < this._.length; n += 1) {
                var r = this._[n];
                if (r.includes(t, e)) return r;
              }
              return null;
            },
          },
          {
            key: "filterIntersects",
            value: function (e) {
              return new t(
                this._.filter(function (t) {
                  return t.intersects(e);
                })
              );
            },
          },
          {
            key: "intersects",
            value: function (t) {
              for (var e = 0; e < this._.length; e += 1) {
                if (this._[e].intersects(t)) return !0;
              }
              return !1;
            },
          },
          {
            key: "union",
            value: function (t) {
              var e = t;
              return (
                this._.forEach(function (t) {
                  t.intersects(e) && (e = t.union(e));
                }),
                e
              );
            },
          },
          {
            key: "add",
            value: function (t) {
              this.deleteWithin(t), this._.push(t);
            },
          },
          {
            key: "shift",
            value: function (t, e, n, r) {
              this._.forEach(function (i) {
                var o = i.sri,
                  a = i.sci,
                  l = i.eri,
                  c = i.eci,
                  s = i;
                "row" === t
                  ? o >= e
                    ? ((s.sri += n), (s.eri += n))
                    : o < e && e <= l && ((s.eri += n), r(o, a, n, 0))
                  : "column" === t &&
                    (a >= e
                      ? ((s.sci += n), (s.eci += n))
                      : a < e && e <= c && ((s.eci += n), r(o, a, 0, n)));
              });
            },
          },
          {
            key: "move",
            value: function (t, e, n) {
              this._.forEach(function (r) {
                var i = r;
                i.within(t) &&
                  ((i.eri += e), (i.sri += e), (i.sci += n), (i.eci += n));
              });
            },
          },
          {
            key: "setData",
            value: function (t) {
              return (
                (this._ = t.map(function (t) {
                  return v.valueOf(t);
                })),
                this
              );
            },
          },
          {
            key: "getData",
            value: function () {
              return this._.map(function (t) {
                return t.toString();
              });
            },
          },
        ]) && P(e.prototype, n),
        r && P(e, r),
        t
      );
    })();
    var R = function t() {
      for (
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          n = arguments.length,
          r = new Array(n > 1 ? n - 1 : 0),
          i = 1;
        i < n;
        i++
      )
        r[i - 1] = arguments[i];
      return (
        r.forEach(function (n) {
          Object.keys(n).forEach(function (r) {
            var i = n[r];
            "string" == typeof i ||
            "number" == typeof i ||
            "boolean" == typeof i
              ? (e[r] = i)
              : "function" != typeof i &&
                !Array.isArray(i) &&
                i instanceof Object
              ? ((e[r] = e[r] || {}), t(e[r], i))
              : (e[r] = i);
          });
        }),
        e
      );
    };
    function I(t) {
      for (var e = "".concat(t), n = 0, r = !1, i = 0; i < e.length; i += 1)
        !0 === r && (n += 1), "." === e.charAt(i) && (r = !0);
      return n;
    }
    function D(t, e, n) {
      if (Number.isNaN(e) || Number.isNaN(n)) return e + t + n;
      var r = I(e),
        i = I(n),
        o = Number(e),
        a = Number(n),
        l = 0;
      if ("-" === t) l = o - a;
      else if ("+" === t) l = o + a;
      else if ("*" === t) l = o * a;
      else if ("/" === t) return I((l = o / a)) > 5 ? l.toFixed(2) : l;
      return l.toFixed(Math.max(r, i));
    }
    var z = {
      cloneDeep: function (t) {
        return JSON.parse(JSON.stringify(t));
      },
      merge: function () {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
          e[n] = arguments[n];
        return R.apply(void 0, [{}].concat(e));
      },
      equals: function t(e, n) {
        var r = Object.keys(e);
        if (r.length !== Object.keys(n).length) return !1;
        for (var i = 0; i < r.length; i += 1) {
          var o = r[i],
            a = e[o],
            l = n[o];
          if (void 0 === l) return !1;
          if (
            "string" == typeof a ||
            "number" == typeof a ||
            "boolean" == typeof a
          ) {
            if (a !== l) return !1;
          } else if (Array.isArray(a)) {
            if (a.length !== l.length) return !1;
            for (var c = 0; c < a.length; c += 1) if (!t(a[c], l[c])) return !1;
          } else if (
            "function" != typeof a &&
            !Array.isArray(a) &&
            a instanceof Object &&
            !t(a, l)
          )
            return !1;
        }
        return !0;
      },
      arrayEquals: function (t, e) {
        if (t.length !== e.length) return !1;
        for (var n = 0; n < t.length; n += 1) if (t[n] !== e[n]) return !1;
        return !0;
      },
      sum: function (t) {
        var e =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : function (t) {
                  return t;
                },
          n = 0,
          r = 0;
        return (
          Object.keys(t).forEach(function (i) {
            (n += e(t[i], i)), (r += 1);
          }),
          [n, r]
        );
      },
      rangeEach: function (t, e, n) {
        for (var r = t; r < e; r += 1) n(r);
      },
      rangeSum: function (t, e, n) {
        for (var r = 0, i = t; i < e; i += 1) r += n(i);
        return r;
      },
      rangeReduceIf: function (t, e, n, r, i, o) {
        for (var a = n, l = r, c = t; c < e && !(a > i); c += 1) a += l = o(c);
        return [c, a - l, l];
      },
      deleteProperty: function (t, e) {
        var n = t["".concat(e)];
        return delete t["".concat(e)], n;
      },
      numberCalc: D,
    };
    function H(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function M(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var N = (function () {
      function t(e) {
        var n = e.len,
          r = e.height;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this._ = {}),
          (this.len = n),
          (this.height = r);
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "getHeight",
            value: function (t) {
              if (this.isHide(t)) return 0;
              var e = this.get(t);
              return e && e.height ? e.height : this.height;
            },
          },
          {
            key: "setHeight",
            value: function (t, e) {
              this.getOrNew(t).height = e;
            },
          },
          {
            key: "unhide",
            value: function (t) {
              for (var e = t; e > 0 && ((e -= 1), this.isHide(e)); )
                this.setHide(e, !1);
            },
          },
          {
            key: "isHide",
            value: function (t) {
              var e = this.get(t);
              return e && e.hide;
            },
          },
          {
            key: "setHide",
            value: function (t, e) {
              var n = this.getOrNew(t);
              !0 === e ? (n.hide = !0) : delete n.hide;
            },
          },
          {
            key: "setStyle",
            value: function (t, e) {
              this.getOrNew(t).style = e;
            },
          },
          {
            key: "sumHeight",
            value: function (t, e, n) {
              var r = this;
              return z.rangeSum(t, e, function (t) {
                return n && n.has(t) ? 0 : r.getHeight(t);
              });
            },
          },
          {
            key: "totalHeight",
            value: function () {
              return this.sumHeight(0, this.len);
            },
          },
          {
            key: "get",
            value: function (t) {
              return this._[t];
            },
          },
          {
            key: "getOrNew",
            value: function (t) {
              return (this._[t] = this._[t] || { cells: {} }), this._[t];
            },
          },
          {
            key: "getCell",
            value: function (t, e) {
              var n = this.get(t);
              return void 0 !== n && void 0 !== n.cells && void 0 !== n.cells[e]
                ? n.cells[e]
                : null;
            },
          },
          {
            key: "getCellMerge",
            value: function (t, e) {
              var n = this.getCell(t, e);
              return n && n.merge ? n.merge : [0, 0];
            },
          },
          {
            key: "getCellOrNew",
            value: function (t, e) {
              var n = this.getOrNew(t);
              return (n.cells[e] = n.cells[e] || {}), n.cells[e];
            },
          },
          {
            key: "setCell",
            value: function (t, e, n) {
              var r =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : "all",
                i = this.getOrNew(t);
              "all" === r
                ? (i.cells[e] = n)
                : "text" === r
                ? ((i.cells[e] = i.cells[e] || {}), (i.cells[e].text = n.text))
                : "format" === r &&
                  ((i.cells[e] = i.cells[e] || {}),
                  (i.cells[e].style = n.style),
                  n.merge && (i.cells[e].merge = n.merge));
            },
          },
          {
            key: "setCellText",
            value: function (t, e, n) {
              var r = this.getCellOrNew(t, e);
              !1 !== r.editable && (r.text = n);
            },
          },
          {
            key: "copyPaste",
            value: function (t, e, n) {
              var r =
                  arguments.length > 3 &&
                  void 0 !== arguments[3] &&
                  arguments[3],
                i =
                  arguments.length > 4 && void 0 !== arguments[4]
                    ? arguments[4]
                    : function () {},
                o = t.sri,
                a = t.sci,
                l = t.eri,
                c = t.eci,
                s = e.sri,
                u = e.sci,
                f = e.eri,
                h = e.eci,
                d = t.size(),
                y = H(d, 2),
                v = y[0],
                b = y[1],
                g = e.size(),
                m = H(g, 2),
                w = m[0],
                k = m[1],
                O = !0,
                S = 0;
              (f < o || h < a) && ((O = !1), (S = f < o ? w : k));
              for (var x = o; x <= l; x += 1)
                if (this._[x])
                  for (var E = a; E <= c; E += 1)
                    if (this._[x].cells && this._[x].cells[E])
                      for (var j = s; j <= f; j += v)
                        for (var _ = u; _ <= h; _ += b) {
                          var C = j + (x - o),
                            T = _ + (E - a),
                            P = z.cloneDeep(this._[x].cells[E]);
                          r &&
                            P &&
                            P.text &&
                            P.text.length > 0 &&
                            (function () {
                              var t = P.text,
                                e = _ - u + (j - s) + 2;
                              if ((O || (e -= S + 1), "=" === t[0]))
                                P.text = t.replace(
                                  /[a-zA-Z]{1,3}\d+/g,
                                  function (t) {
                                    var n = 0,
                                      r = 0;
                                    return (
                                      o === s ? (n = e - 1) : (r = e - 1),
                                      /^\d+$/.test(t) ? t : p(t, n, r)
                                    );
                                  }
                                );
                              else if (
                                (v <= 1 && b > 1 && (s > l || f < o)) ||
                                (b <= 1 && v > 1 && (u > c || h < a)) ||
                                (v <= 1 && b <= 1)
                              ) {
                                var n = /[\\.\d]+$/.exec(t);
                                if (null !== n) {
                                  var r = Number(n[0]) + e - 1;
                                  P.text = t.substring(0, n.index) + r;
                                }
                              }
                            })(),
                            this.setCell(C, T, P, n),
                            i(C, T, P);
                        }
            },
          },
          {
            key: "cutPaste",
            value: function (t, e) {
              var n = this,
                r = {};
              this.each(function (i) {
                n.eachCells(i, function (o) {
                  var a = parseInt(i, 10),
                    l = parseInt(o, 10);
                  t.includes(i, o) &&
                    ((a = e.sri + (a - t.sri)), (l = e.sci + (l - t.sci))),
                    (r[a] = r[a] || { cells: {} }),
                    (r[a].cells[l] = n._[i].cells[o]);
                });
              }),
                (this._ = r);
            },
          },
          {
            key: "paste",
            value: function (t, e) {
              var n = this;
              if (!(t.length <= 0)) {
                var r = e.sri,
                  i = e.sci;
                t.forEach(function (t, e) {
                  var o = r + e;
                  t.forEach(function (t, e) {
                    var r = i + e;
                    n.setCellText(o, r, t);
                  });
                });
              }
            },
          },
          {
            key: "insert",
            value: function (t) {
              var e = this,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 1,
                r = {};
              this.each(function (i, o) {
                var a = parseInt(i, 10);
                a >= t &&
                  ((a += n),
                  e.eachCells(i, function (e, r) {
                    r.text &&
                      "=" === r.text[0] &&
                      (r.text = r.text.replace(
                        /[a-zA-Z]{1,3}\d+/g,
                        function (e) {
                          return p(e, 0, n, function (e, n) {
                            return n >= t;
                          });
                        }
                      ));
                  })),
                  (r[a] = o);
              }),
                (this._ = r),
                (this.len += n);
            },
          },
          {
            key: "delete",
            value: function (t, e) {
              var n = this,
                r = e - t + 1,
                i = {};
              this.each(function (o, a) {
                var l = parseInt(o, 10);
                l < t
                  ? (i[l] = a)
                  : o > e &&
                    ((i[l - r] = a),
                    n.eachCells(o, function (t, n) {
                      n.text &&
                        "=" === n.text[0] &&
                        (n.text = n.text.replace(
                          /[a-zA-Z]{1,3}\d+/g,
                          function (t) {
                            return p(t, 0, -r, function (t, n) {
                              return n > e;
                            });
                          }
                        ));
                    }));
              }),
                (this._ = i),
                (this.len -= r);
            },
          },
          {
            key: "insertColumn",
            value: function (t) {
              var e = this,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 1;
              this.each(function (r, i) {
                var o = {};
                e.eachCells(r, function (e, r) {
                  var i = parseInt(e, 10);
                  i >= t &&
                    ((i += n),
                    r.text &&
                      "=" === r.text[0] &&
                      (r.text = r.text.replace(
                        /[a-zA-Z]{1,3}\d+/g,
                        function (e) {
                          return p(e, n, 0, function (e) {
                            return e >= t;
                          });
                        }
                      ))),
                    (o[i] = r);
                }),
                  (i.cells = o);
              });
            },
          },
          {
            key: "deleteColumn",
            value: function (t, e) {
              var n = this,
                r = e - t + 1;
              this.each(function (i, o) {
                var a = {};
                n.eachCells(i, function (n, i) {
                  var o = parseInt(n, 10);
                  o < t
                    ? (a[o] = i)
                    : o > e &&
                      ((a[o - r] = i),
                      i.text &&
                        "=" === i.text[0] &&
                        (i.text = i.text.replace(
                          /[a-zA-Z]{1,3}\d+/g,
                          function (t) {
                            return p(t, -r, 0, function (t) {
                              return t > e;
                            });
                          }
                        )));
                }),
                  (o.cells = a);
              });
            },
          },
          {
            key: "deleteCells",
            value: function (t) {
              var e = this,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "all";
              t.each(function (t, r) {
                e.deleteCell(t, r, n);
              });
            },
          },
          {
            key: "deleteCell",
            value: function (t, e) {
              var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : "all",
                r = this.get(t);
              if (null !== r) {
                var i = this.getCell(t, e);
                null !== i &&
                  !1 !== i.editable &&
                  ("all" === n
                    ? delete r.cells[e]
                    : "text" === n
                    ? (i.text && delete i.text, i.value && delete i.value)
                    : "format" === n
                    ? (void 0 !== i.style && delete i.style,
                      i.merge && delete i.merge)
                    : "merge" === n && i.merge && delete i.merge);
              }
            },
          },
          {
            key: "maxCell",
            value: function () {
              var t = Object.keys(this._),
                e = t[t.length - 1],
                n = this._[e];
              if (n) {
                var r = n.cells,
                  i = Object.keys(r),
                  o = i[i.length - 1];
                return [parseInt(e, 10), parseInt(o, 10)];
              }
              return [0, 0];
            },
          },
          {
            key: "each",
            value: function (t) {
              Object.entries(this._).forEach(function (e) {
                var n = H(e, 2),
                  r = n[0],
                  i = n[1];
                t(r, i);
              });
            },
          },
          {
            key: "eachCells",
            value: function (t, e) {
              this._[t] &&
                this._[t].cells &&
                Object.entries(this._[t].cells).forEach(function (t) {
                  var n = H(t, 2),
                    r = n[0],
                    i = n[1];
                  e(r, i);
                });
            },
          },
          {
            key: "setData",
            value: function (t) {
              t.len && ((this.len = t.len), delete t.len), (this._ = t);
            },
          },
          {
            key: "getData",
            value: function () {
              var t = this.len;
              return Object.assign({ len: t }, this._);
            },
          },
        ]) && M(e.prototype, n),
        r && M(e, r),
        t
      );
    })();
    function F(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var W = (function () {
        function t(e) {
          var n = e.len,
            r = e.width,
            i = e.indexWidth,
            o = e.minWidth;
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this._ = {}),
            (this.len = n),
            (this.width = r),
            (this.indexWidth = i),
            (this.minWidth = o);
        }
        var e, n, r;
        return (
          (e = t),
          (n = [
            {
              key: "setData",
              value: function (t) {
                t.len && ((this.len = t.len), delete t.len), (this._ = t);
              },
            },
            {
              key: "getData",
              value: function () {
                var t = this.len;
                return Object.assign({ len: t }, this._);
              },
            },
            {
              key: "getWidth",
              value: function (t) {
                if (this.isHide(t)) return 0;
                var e = this._[t];
                return e && e.width ? e.width : this.width;
              },
            },
            {
              key: "getOrNew",
              value: function (t) {
                return (this._[t] = this._[t] || {}), this._[t];
              },
            },
            {
              key: "setWidth",
              value: function (t, e) {
                this.getOrNew(t).width = e;
              },
            },
            {
              key: "unhide",
              value: function (t) {
                for (var e = t; e > 0 && ((e -= 1), this.isHide(e)); )
                  this.setHide(e, !1);
              },
            },
            {
              key: "isHide",
              value: function (t) {
                var e = this._[t];
                return e && e.hide;
              },
            },
            {
              key: "setHide",
              value: function (t, e) {
                var n = this.getOrNew(t);
                !0 === e ? (n.hide = !0) : delete n.hide;
              },
            },
            {
              key: "setStyle",
              value: function (t, e) {
                this.getOrNew(t).style = e;
              },
            },
            {
              key: "sumWidth",
              value: function (t, e) {
                var n = this;
                return z.rangeSum(t, e, function (t) {
                  return n.getWidth(t);
                });
              },
            },
            {
              key: "totalWidth",
              value: function () {
                return this.sumWidth(0, this.len);
              },
            },
          ]) && F(e.prototype, n),
          r && F(e, r),
          t
        );
      })(),
      V = ["en"],
      q = {
        en: {
          toolbar: {
            undo: "Undo",
            redo: "Redo",
            print: "Print",
            paintformat: "Paint format",
            clearformat: "Clear format",
            format: "Format",
            fontName: "Font",
            fontSize: "Font size",
            fontBold: "Font bold",
            fontItalic: "Font italic",
            underline: "Underline",
            strike: "Strike",
            color: "Text color",
            bgcolor: "Fill color",
            border: "Borders",
            merge: "Merge cells",
            align: "Horizontal align",
            valign: "Vertical align",
            textwrap: "Text wrapping",
            freeze: "Freeze cell",
            autofilter: "Filter",
            formula: "Functions",
            more: "More",
          },
          contextmenu: {
            copy: "Copy",
            cut: "Cut",
            paste: "Paste",
            pasteValue: "Paste values only",
            pasteFormat: "Paste format only",
            hide: "Hide",
            insertRow: "Insert row",
            insertColumn: "Insert column",
            deleteSheet: "Delete",
            deleteRow: "Delete row",
            deleteColumn: "Delete column",
            deleteCell: "Delete cell",
            deleteCellText: "Delete cell text",
            validation: "Data validations",
            cellprintable: "Enable export",
            cellnonprintable: "Disable export",
            celleditable: "Enable editing",
            cellnoneditable: "Disable editing",
          },
          print: {
            size: "Paper size",
            orientation: "Page orientation",
            orientations: ["Landscape", "Portrait"],
          },
          format: {
            normal: "Normal",
            text: "Plain Text",
            number: "Number",
            percent: "Percent",
            rmb: "RMB",
            usd: "USD",
            eur: "EUR",
            date: "Date",
            time: "Time",
            datetime: "Date time",
            duration: "Duration",
          },
          formula: {
            sum: "Sum",
            average: "Average",
            max: "Max",
            min: "Min",
            _if: "IF",
            and: "AND",
            or: "OR",
            concat: "Concat",
          },
          validation: {
            required: "it must be required",
            notMatch: "it not match its validation rule",
            between: "it is between {} and {}",
            notBetween: "it is not between {} and {}",
            notIn: "it is not in list",
            equal: "it equal to {}",
            notEqual: "it not equal to {}",
            lessThan: "it less than {}",
            lessThanEqual: "it less than or equal to {}",
            greaterThan: "it greater than {}",
            greaterThanEqual: "it greater than or equal to {}",
          },
          error: { pasteForMergedCell: "Unable to do this for merged cells" },
          calendar: {
            weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
          },
          button: {
            next: "Next",
            cancel: "Cancel",
            remove: "Remove",
            save: "Save",
            ok: "OK",
          },
          sort: { desc: "Sort Z -> A", asc: "Sort A -> Z" },
          filter: { empty: "empty" },
          dataValidation: {
            mode: "Mode",
            range: "Cell Range",
            criteria: "Criteria",
            modeType: { cell: "Cell", column: "Colun", row: "Row" },
            type: {
              list: "List",
              number: "Number",
              date: "Date",
              phone: "Phone",
              email: "Email",
            },
            operator: {
              be: "between",
              nbe: "not betwwen",
              lt: "less than",
              lte: "less than or equal to",
              gt: "greater than",
              gte: "greater than or equal to",
              eq: "equal to",
              neq: "not equal to",
            },
          },
        },
      };
    function B(t, e) {
      if (e)
        for (var n = 0, r = V; n < r.length; n++) {
          var i = r[n];
          if (!e[i]) break;
          for (
            var o = e[i], a = t.match(/(?:\\.|[^.])+/g), l = 0;
            l < a.length;
            l += 1
          ) {
            var c = o[a[l]];
            if (!c) break;
            if (l === a.length - 1) return c;
            o = c;
          }
        }
    }
    function L(t) {
      var e = B(t, q);
      return (
        !e &&
          window &&
          window.x_spreadsheet &&
          window.x_spreadsheet.$messages &&
          (e = B(t, window.x_spreadsheet.$messages)),
        e || ""
      );
    }
    function U(t) {
      return function () {
        return L(t);
      };
    }
    function Y(t, e) {
      arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
        ? (V = [t])
        : V.unshift(t),
        e && (q[t] = e);
    }
    function $(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function X(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var Z = {
      phone: /^[1-9]\d{10}$/,
      email: /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/,
    };
    function K(t, e) {
      var n = "";
      if (!t) {
        for (
          var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), o = 2;
          o < r;
          o++
        )
          i[o - 2] = arguments[o];
        n = L.apply(void 0, ["validation.".concat(e)].concat(i));
      }
      return [t, n];
    }
    var J = (function () {
      function t(e, n, r, i) {
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.required = n),
          (this.value = r),
          (this.type = e),
          (this.operator = i),
          (this.message = "");
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "parseValue",
            value: function (t) {
              var e = this.type;
              return "date" === e
                ? new Date(t)
                : "number" === e
                ? Number(t)
                : t;
            },
          },
          {
            key: "equals",
            value: function (t) {
              var e =
                this.type === t.type &&
                this.required === t.required &&
                this.operator === t.operator;
              return (
                e &&
                  (e = Array.isArray(this.value)
                    ? z.arrayEquals(this.value, t.value)
                    : this.value === t.value),
                e
              );
            },
          },
          {
            key: "values",
            value: function () {
              return this.value.split(",");
            },
          },
          {
            key: "validate",
            value: function (t) {
              var e = this.required,
                n = this.operator,
                r = this.value,
                i = this.type;
              if (e && /^\s*$/.test(t)) return K(!1, "required");
              if (/^\s*$/.test(t)) return [!0];
              if (Z[i] && !Z[i].test(t)) return K(!1, "notMatch");
              if ("list" === i) return K(this.values().includes(t), "notIn");
              if (n) {
                var o = this.parseValue(t);
                if ("be" === n) {
                  var a = $(r, 2),
                    l = a[0],
                    c = a[1];
                  return K(
                    o >= this.parseValue(l) && o <= this.parseValue(c),
                    "between",
                    l,
                    c
                  );
                }
                if ("nbe" === n) {
                  var s = $(r, 2),
                    u = s[0],
                    f = s[1];
                  return K(
                    o < this.parseValue(u) || o > this.parseValue(f),
                    "notBetween",
                    u,
                    f
                  );
                }
                if ("eq" === n) return K(o === this.parseValue(r), "equal", r);
                if ("neq" === n)
                  return K(o !== this.parseValue(r), "notEqual", r);
                if ("lt" === n) return K(o < this.parseValue(r), "lessThan", r);
                if ("lte" === n)
                  return K(o <= this.parseValue(r), "lessThanEqual", r);
                if ("gt" === n)
                  return K(o > this.parseValue(r), "greaterThan", r);
                if ("gte" === n)
                  return K(o >= this.parseValue(r), "greaterThanEqual", r);
              }
              return [!0];
            },
          },
        ]) && X(e.prototype, n),
        r && X(e, r),
        t
      );
    })();
    function G(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function Q(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function tt(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function et(t, e, n) {
      return e && tt(t.prototype, e), n && tt(t, n), t;
    }
    var nt = (function () {
        function t(e, n, r) {
          Q(this, t), (this.refs = n), (this.mode = e), (this.validator = r);
        }
        return (
          et(
            t,
            [
              {
                key: "includes",
                value: function (t, e) {
                  for (var n = this.refs, r = 0; r < n.length; r += 1) {
                    if (v.valueOf(n[r]).includes(t, e)) return !0;
                  }
                  return !1;
                },
              },
              {
                key: "addRef",
                value: function (t) {
                  this.remove(v.valueOf(t)), this.refs.push(t);
                },
              },
              {
                key: "remove",
                value: function (t) {
                  var e = [];
                  this.refs.forEach(function (n) {
                    var r = v.valueOf(n);
                    r.intersects(t)
                      ? r.difference(t).forEach(function (t) {
                          return e.push(t.toString());
                        })
                      : e.push(n);
                  }),
                    (this.refs = e);
                },
              },
              {
                key: "getData",
                value: function () {
                  var t = this.refs,
                    e = this.mode,
                    n = this.validator;
                  return {
                    refs: t,
                    mode: e,
                    type: n.type,
                    required: n.required,
                    operator: n.operator,
                    value: n.value,
                  };
                },
              },
            ],
            [
              {
                key: "valueOf",
                value: function (e) {
                  var n = e.refs,
                    r = e.mode,
                    i = e.type,
                    o = e.required,
                    a = e.operator,
                    l = e.value;
                  return new t(r, n, new J(i, o, l, a));
                },
              },
            ]
          ),
          t
        );
      })(),
      rt = (function () {
        function t() {
          Q(this, t), (this._ = []), (this.errors = new Map());
        }
        return (
          et(t, [
            {
              key: "getError",
              value: function (t, e) {
                return this.errors.get("".concat(t, "_").concat(e));
              },
            },
            {
              key: "validate",
              value: function (t, e, n) {
                var r = this.get(t, e),
                  i = "".concat(t, "_").concat(e),
                  o = this.errors;
                if (null !== r) {
                  var a = G(r.validator.validate(n), 2),
                    l = a[0],
                    c = a[1];
                  l ? o.delete(i) : o.set(i, c);
                } else o.delete(i);
                return !0;
              },
            },
            {
              key: "add",
              value: function (t, e, n) {
                var r = n.type,
                  i = n.required,
                  o = n.value,
                  a = n.operator,
                  l = new J(r, i, o, a),
                  c = this.getByValidator(l);
                null !== c ? c.addRef(e) : this._.push(new nt(t, [e], l));
              },
            },
            {
              key: "getByValidator",
              value: function (t) {
                for (var e = 0; e < this._.length; e += 1) {
                  var n = this._[e];
                  if (n.validator.equals(t)) return n;
                }
                return null;
              },
            },
            {
              key: "get",
              value: function (t, e) {
                for (var n = 0; n < this._.length; n += 1) {
                  var r = this._[n];
                  if (r.includes(t, e)) return r;
                }
                return null;
              },
            },
            {
              key: "remove",
              value: function (t) {
                this.each(function (e) {
                  e.remove(t);
                });
              },
            },
            {
              key: "each",
              value: function (t) {
                this._.forEach(function (e) {
                  return t(e);
                });
              },
            },
            {
              key: "getData",
              value: function () {
                return this._.filter(function (t) {
                  return t.refs.length > 0;
                }).map(function (t) {
                  return t.getData();
                });
              },
            },
            {
              key: "setData",
              value: function (t) {
                this._ = t.map(function (t) {
                  return nt.valueOf(t);
                });
              },
            },
          ]),
          t
        );
      })();
    function it(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function ot(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function at(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    var lt = {
        mode: "edit",
        view: {
          height: function () {
            return document.documentElement.clientHeight;
          },
          width: function () {
            return document.documentElement.clientWidth;
          },
        },
        showGrid: !0,
        showToolbar: !0,
        showContextmenu: !0,
        showBottomBar: !0,
        row: { len: 100, height: 25 },
        col: { len: 26, width: 100, indexWidth: 60, minWidth: 60 },
        style: {
          bgcolor: "#ffffff",
          align: "left",
          valign: "middle",
          textwrap: !1,
          strike: !1,
          underline: !1,
          color: "#0a0a0a",
          font: { name: "Arial", size: 10, bold: !1, italic: !1 },
          format: "normal",
        },
      },
      ct = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      };
    function st(t, e) {
      var n =
          arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : function () {},
        r = this.merges,
        i = e.clone(),
        o = at(t.size(), 2),
        a = o[0],
        l = o[1],
        c = at(e.size(), 2),
        s = c[0],
        u = c[1];
      return (
        a > s && (i.eri = e.sri + a - 1),
        l > u && (i.eci = e.sci + l - 1),
        !r.intersects(i) || (n(L("error.pasteForMergedCell")), !1)
      );
    }
    function ut(t, e, n) {
      var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
        i = this.rows,
        o = this.merges;
      ("all" !== n && "format" !== n) ||
        (i.deleteCells(e, n), o.deleteWithin(e)),
        i.copyPaste(t, e, n, r, function (t, e, n) {
          if (n && n.merge) {
            var r = at(n.merge, 2),
              i = r[0],
              a = r[1];
            if (i <= 0 && a <= 0) return;
            o.add(new v(t, e, t + i, e + a));
          }
        });
    }
    function ft(t, e) {
      var n = this.clipboard,
        r = this.rows,
        i = this.merges;
      r.cutPaste(t, e), i.move(t, e.sri - t.sri, e.sci - t.sci), n.clear();
    }
    function ht(t, e, n) {
      var r = this.styles,
        i = this.rows.getCellOrNew(t, e),
        o = {};
      void 0 !== i.style && (o = z.cloneDeep(r[i.style])),
        (o = z.merge(o, { border: n })),
        (i.style = this.addStyle(o));
    }
    var pt = (function () {
      function t(e, n) {
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.settings = z.merge(lt, n || {})),
          (this.name = e || "sheet"),
          (this.freeze = [0, 0]),
          (this.styles = []),
          (this.merges = new A()),
          (this.rows = new N(this.settings.row)),
          (this.cols = new W(this.settings.col)),
          (this.validations = new rt()),
          (this.hyperlinks = {}),
          (this.comments = {}),
          (this.selector = new g()),
          (this.scroll = new m()),
          (this.history = new k()),
          (this.clipboard = new S()),
          (this.autoFilter = new T()),
          (this.change = function () {}),
          (this.exceptRowSet = new Set()),
          (this.sortedRowMap = new Map()),
          (this.unsortedRowMap = new Map());
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "addValidation",
            value: function (t, e, n) {
              var r = this;
              this.changeData(function () {
                r.validations.add(t, e, n);
              });
            },
          },
          {
            key: "removeValidation",
            value: function () {
              var t = this,
                e = this.selector.range;
              this.changeData(function () {
                t.validations.remove(e);
              });
            },
          },
          {
            key: "getSelectedValidator",
            value: function () {
              var t = this.selector,
                e = t.ri,
                n = t.ci,
                r = this.validations.get(e, n);
              return r ? r.validator : null;
            },
          },
          {
            key: "getSelectedValidation",
            value: function () {
              var t = this.selector,
                e = t.ri,
                n = t.ci,
                r = t.range,
                i = this.validations.get(e, n),
                o = { ref: r.toString() };
              return (
                null !== i && ((o.mode = i.mode), (o.validator = i.validator)),
                o
              );
            },
          },
          {
            key: "canUndo",
            value: function () {
              return this.history.canUndo();
            },
          },
          {
            key: "canRedo",
            value: function () {
              return this.history.canRedo();
            },
          },
          {
            key: "undo",
            value: function () {
              var t = this;
              this.history.undo(this.getData(), function (e) {
                t.setData(e);
              });
            },
          },
          {
            key: "redo",
            value: function () {
              var t = this;
              this.history.redo(this.getData(), function (e) {
                t.setData(e);
              });
            },
          },
          {
            key: "copy",
            value: function () {
              this.clipboard.copy(this.selector.range);
            },
          },
          {
            key: "copyToSystemClipboard",
            value: function () {
              if (void 0 !== navigator.clipboard) {
                for (
                  var t = "",
                    e = this.rows.getData(),
                    n = this.selector.range.sri;
                  n <= this.selector.range.eri;
                  n += 1
                ) {
                  if (ct(e, n)) {
                    for (
                      var r = this.selector.range.sci;
                      r <= this.selector.range.eci;
                      r += 1
                    )
                      if (
                        (r > this.selector.range.sci && (t += "\t"),
                        ct(e[n].cells, r))
                      ) {
                        var i = String(e[n].cells[r].text);
                        -1 === i.indexOf("\n") &&
                        -1 === i.indexOf("\t") &&
                        -1 === i.indexOf('"')
                          ? (t += i)
                          : (t += '"'.concat(i, '"'));
                      }
                  } else
                    for (
                      var o = this.selector.range.sci;
                      o <= this.selector.range.eci;
                      o += 1
                    )
                      t += "\t";
                  t += "\n";
                }
                navigator.clipboard.writeText(t).then(
                  function () {},
                  function (e) {
                    console.log(
                      "text copy to the system clipboard error  ",
                      t,
                      e
                    );
                  }
                );
              }
            },
          },
          {
            key: "cut",
            value: function () {
              this.clipboard.cut(this.selector.range);
            },
          },
          {
            key: "paste",
            value: function () {
              var t = this,
                e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : "all",
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : function () {},
                r = this.clipboard,
                i = this.selector;
              return (
                !r.isClear() &&
                !!st.call(this, r.range, i.range, n) &&
                (this.changeData(function () {
                  r.isCopy()
                    ? ut.call(t, r.range, i.range, e)
                    : r.isCut() && ft.call(t, r.range, i.range);
                }),
                !0)
              );
            },
          },
          {
            key: "pasteFromText",
            value: function (t) {
              var e = t.split("\r\n").map(function (t) {
                return t.replace(/"/g, "").split("\t");
              });
              e.length > 0 && (e.length -= 1);
              var n = this.rows,
                r = this.selector;
              this.changeData(function () {
                n.paste(e, r.range);
              });
            },
          },
          {
            key: "autofill",
            value: function (t, e) {
              var n = this,
                r =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : function () {},
                i = this.selector.range;
              return (
                !!st.call(this, i, t, r) &&
                (this.changeData(function () {
                  ut.call(n, i, t, e, !0);
                }),
                !0)
              );
            },
          },
          {
            key: "clearClipboard",
            value: function () {
              this.clipboard.clear();
            },
          },
          {
            key: "calSelectedRangeByEnd",
            value: function (t, e) {
              var n = this.selector,
                r = this.rows,
                i = this.cols,
                o = this.merges,
                a = n.range,
                l = a.sri,
                c = a.sci,
                s = a.eri,
                u = a.eci,
                f = n.ri,
                h = n.ci,
                p = t,
                d = e;
              return (
                t < 0 && (p = r.len - 1),
                e < 0 && (d = i.len - 1),
                p > f ? ((l = f), (s = p)) : ((l = p), (s = f)),
                d > h ? ((c = h), (u = d)) : ((c = d), (u = h)),
                (n.range = o.union(new v(l, c, s, u))),
                (n.range = o.union(n.range)),
                n.range
              );
            },
          },
          {
            key: "calSelectedRangeByStart",
            value: function (t, e) {
              var n = this.selector,
                r = this.rows,
                i = this.cols,
                o = this.merges.getFirstIncludes(t, e);
              return (
                null === o &&
                  ((o = new v(t, e, t, e)),
                  -1 === t && ((o.sri = 0), (o.eri = r.len - 1)),
                  -1 === e && ((o.sci = 0), (o.eci = i.len - 1))),
                (n.range = o),
                o
              );
            },
          },
          {
            key: "setSelectedCellAttr",
            value: function (t, e) {
              var n = this;
              this.changeData(function () {
                var r = n.selector,
                  i = n.styles,
                  o = n.rows;
                if ("merge" === t) e ? n.merge() : n.unmerge();
                else if ("border" === t)
                  (function (t) {
                    var e = this,
                      n = t.mode,
                      r = t.style,
                      i = t.color,
                      o = this.styles,
                      a = this.selector,
                      l = this.rows,
                      c = a.range,
                      s = c.sri,
                      u = c.sci,
                      f = c.eri,
                      h = c.eci,
                      p = !this.isSignleSelected();
                    if (
                      p ||
                      ("inside" !== n && "horizontal" !== n && "vertical" !== n)
                    )
                      if ("outside" !== n || p) {
                        if ("none" === n)
                          a.range.each(function (t, n) {
                            var r = l.getCell(t, n);
                            if (r && void 0 !== r.style) {
                              var i = z.cloneDeep(o[r.style]);
                              delete i.border, (r.style = e.addStyle(i));
                            }
                          });
                        else if (
                          "all" === n ||
                          "inside" === n ||
                          "outside" === n ||
                          "horizontal" === n ||
                          "vertical" === n
                        )
                          !(function () {
                            for (var t = [], o = s; o <= f; o += 1)
                              for (var a = u; a <= h; a += 1) {
                                for (var c = [], d = 0; d < t.length; d += 1) {
                                  var y = at(t[d], 4),
                                    v = y[0],
                                    b = y[1],
                                    g = y[2],
                                    m = y[3];
                                  if (
                                    (o === v + g + 1 && c.push(d),
                                    v <= o && o <= v + g && a === b)
                                  ) {
                                    a += m + 1;
                                    break;
                                  }
                                }
                                if (
                                  (c.forEach(function (e) {
                                    return t.splice(e, 1);
                                  }),
                                  a > h)
                                )
                                  break;
                                var w = l.getCell(o, a),
                                  k = 0,
                                  O = 0;
                                if (w && w.merge) {
                                  var S = at(w.merge, 2);
                                  (k = S[0]), (O = S[1]), t.push([o, a, k, O]);
                                }
                                var x = k > 0 && o + k === f,
                                  E = O > 0 && a + O === h,
                                  j = {};
                                "all" === n
                                  ? (j = {
                                      bottom: [r, i],
                                      top: [r, i],
                                      left: [r, i],
                                      right: [r, i],
                                    })
                                  : "inside" === n
                                  ? (!E && a < h && (j.right = [r, i]),
                                    !x && o < f && (j.bottom = [r, i]))
                                  : "horizontal" === n
                                  ? !x && o < f && (j.bottom = [r, i])
                                  : "vertical" === n
                                  ? !E && a < h && (j.right = [r, i])
                                  : "outside" === n &&
                                    p &&
                                    (s === o && (j.top = [r, i]),
                                    (x || f === o) && (j.bottom = [r, i]),
                                    u === a && (j.left = [r, i]),
                                    (E || h === a) && (j.right = [r, i])),
                                  Object.keys(j).length > 0 &&
                                    ht.call(e, o, a, j),
                                  (a += O);
                              }
                          })();
                        else if ("top" === n || "bottom" === n)
                          for (var d = u; d <= h; d += 1)
                            "top" === n &&
                              (ht.call(this, s, d, { top: [r, i] }),
                              (d += l.getCellMerge(s, d)[1])),
                              "bottom" === n &&
                                (ht.call(this, f, d, { bottom: [r, i] }),
                                (d += l.getCellMerge(f, d)[1]));
                        else if ("left" === n || "right" === n)
                          for (var y = s; y <= f; y += 1)
                            "left" === n &&
                              (ht.call(this, y, u, { left: [r, i] }),
                              (y += l.getCellMerge(y, u)[0])),
                              "right" === n &&
                                (ht.call(this, y, h, { right: [r, i] }),
                                (y += l.getCellMerge(y, h)[0]));
                      } else
                        ht.call(this, s, u, {
                          top: [r, i],
                          bottom: [r, i],
                          left: [r, i],
                          right: [r, i],
                        });
                  }).call(n, e);
                else if ("formula" === t) {
                  var a = r.ri,
                    l = r.ci,
                    c = r.range;
                  if (r.multiple()) {
                    var s = at(r.size(), 2),
                      u = s[0],
                      f = s[1],
                      p = c.sri,
                      d = c.sci,
                      y = c.eri,
                      v = c.eci;
                    if (u > 1)
                      for (var b = d; b <= v; b += 1) {
                        o.getCellOrNew(y + 1, b).text = "="
                          .concat(e, "(")
                          .concat(h(b, p), ":")
                          .concat(h(b, y), ")");
                      }
                    else if (f > 1) {
                      o.getCellOrNew(a, v + 1).text = "="
                        .concat(e, "(")
                        .concat(h(d, a), ":")
                        .concat(h(v, a), ")");
                    }
                  } else {
                    o.getCellOrNew(a, l).text = "=".concat(e, "()");
                  }
                } else
                  r.range.each(function (r, a) {
                    var l = o.getCellOrNew(r, a),
                      c = {};
                    if (
                      (void 0 !== l.style && (c = z.cloneDeep(i[l.style])),
                      "format" === t)
                    )
                      (c.format = e), (l.style = n.addStyle(c));
                    else if (
                      "font-bold" === t ||
                      "font-italic" === t ||
                      "font-name" === t ||
                      "font-size" === t
                    ) {
                      var s = {};
                      (s[t.split("-")[1]] = e),
                        (c.font = Object.assign(c.font || {}, s)),
                        (l.style = n.addStyle(c));
                    } else
                      "strike" === t ||
                      "textwrap" === t ||
                      "underline" === t ||
                      "align" === t ||
                      "valign" === t ||
                      "color" === t ||
                      "bgcolor" === t
                        ? ((c[t] = e), (l.style = n.addStyle(c)))
                        : (l[t] = e);
                  });
              });
            },
          },
          {
            key: "setSelectedCellText",
            value: function (t) {
              var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "input",
                n = this.autoFilter,
                r = this.selector,
                i = this.rows,
                o = r.ri,
                a = r.ci,
                l = o;
              this.unsortedRowMap.has(o) && (l = this.unsortedRowMap.get(o));
              var c = i.getCell(l, a),
                s = c ? c.text : "";
              if ((this.setCellText(l, a, t, e), n.active())) {
                var u = n.getFilter(a);
                if (u) {
                  var f = u.value.findIndex(function (t) {
                    return t === s;
                  });
                  f >= 0 && u.value.splice(f, 1, t);
                }
              }
            },
          },
          {
            key: "getSelectedCell",
            value: function () {
              var t = this.selector,
                e = t.ri,
                n = t.ci,
                r = e;
              return (
                this.unsortedRowMap.has(e) && (r = this.unsortedRowMap.get(e)),
                this.rows.getCell(r, n)
              );
            },
          },
          {
            key: "xyInSelectedRect",
            value: function (t, e) {
              var n = this.getSelectedRect(),
                r = n.left,
                i = n.top,
                o = n.width,
                a = n.height,
                l = t - this.cols.indexWidth,
                c = e - this.rows.height;
              return l > r && l < r + o && c > i && c < i + a;
            },
          },
          {
            key: "getSelectedRect",
            value: function () {
              return this.getRect(this.selector.range);
            },
          },
          {
            key: "getClipboardRect",
            value: function () {
              var t = this.clipboard;
              return t.isClear()
                ? { left: -100, top: -100 }
                : this.getRect(t.range);
            },
          },
          {
            key: "getRect",
            value: function (t) {
              var e = this.scroll,
                n = this.rows,
                r = this.cols,
                i = this.exceptRowSet,
                o = t.sri,
                a = t.sci,
                l = t.eri,
                c = t.eci;
              if (o < 0 && a < 0)
                return { left: 0, l: 0, top: 0, t: 0, scroll: e };
              var s = r.sumWidth(0, a),
                u = n.sumHeight(0, o, i),
                f = n.sumHeight(o, l + 1, i),
                h = r.sumWidth(a, c + 1),
                p = s - e.x,
                d = u - e.y,
                y = this.freezeTotalHeight(),
                v = this.freezeTotalWidth();
              return (
                v > 0 && v > s && (p = s),
                y > 0 && y > u && (d = u),
                { l: s, t: u, left: p, top: d, height: f, width: h, scroll: e }
              );
            },
          },
          {
            key: "getCellRectByXY",
            value: function (t, e) {
              var n = this.scroll,
                r = this.merges,
                i = this.rows,
                o = this.cols,
                a = function (t, e) {
                  var n = this.rows,
                    r = this.freezeTotalHeight(),
                    i = n.height;
                  r + n.height < t && (i -= e);
                  for (
                    var o = this.exceptRowSet, a = 0, l = i, c = n.height;
                    a < n.len && !(l > t);
                    a += 1
                  )
                    o.has(a) || (l += c = n.getHeight(a));
                  return (l -= c) <= 0
                    ? { ri: -1, top: 0, height: c }
                    : { ri: a - 1, top: l, height: c };
                }.call(this, e, n.y),
                l = a.ri,
                c = a.top,
                s = a.height,
                u = function (t, e) {
                  var n = this.cols,
                    r = this.freezeTotalWidth(),
                    i = n.indexWidth;
                  r + n.indexWidth < t && (i -= e);
                  var o = at(
                      z.rangeReduceIf(
                        0,
                        n.len,
                        i,
                        n.indexWidth,
                        t,
                        function (t) {
                          return n.getWidth(t);
                        }
                      ),
                      3
                    ),
                    a = o[0],
                    l = o[1],
                    c = o[2];
                  return l <= 0
                    ? { ci: -1, left: 0, width: n.indexWidth }
                    : { ci: a - 1, left: l, width: c };
                }.call(this, t, n.x),
                f = u.ci,
                h = u.left,
                p = u.width;
              if (
                (-1 === f && (p = o.totalWidth()),
                -1 === l && (s = i.totalHeight()),
                l >= 0 || f >= 0)
              ) {
                var d = r.getFirstIncludes(l, f);
                if (d) {
                  (l = d.sri), (f = d.sci);
                  var y = this.cellRect(l, f);
                  (h = y.left), (c = y.top), (p = y.width), (s = y.height);
                }
              }
              return { ri: l, ci: f, left: h, top: c, width: p, height: s };
            },
          },
          {
            key: "isSignleSelected",
            value: function () {
              var t = this.selector.range,
                e = t.sri,
                n = t.sci,
                r = t.eri,
                i = t.eci,
                o = this.getCell(e, n);
              if (o && o.merge) {
                var a = at(o.merge, 2),
                  l = a[0],
                  c = a[1];
                if (e + l === r && n + c === i) return !0;
              }
              return !this.selector.multiple();
            },
          },
          {
            key: "canUnmerge",
            value: function () {
              var t = this.selector.range,
                e = t.sri,
                n = t.sci,
                r = t.eri,
                i = t.eci,
                o = this.getCell(e, n);
              if (o && o.merge) {
                var a = at(o.merge, 2),
                  l = a[0],
                  c = a[1];
                if (e + l === r && n + c === i) return !0;
              }
              return !1;
            },
          },
          {
            key: "merge",
            value: function () {
              var t = this,
                e = this.selector,
                n = this.rows;
              if (!this.isSignleSelected()) {
                var r = at(e.size(), 2),
                  i = r[0],
                  o = r[1];
                if (i > 1 || o > 1) {
                  var a = e.range,
                    l = a.sri,
                    c = a.sci;
                  this.changeData(function () {
                    var r = n.getCellOrNew(l, c);
                    (r.merge = [i - 1, o - 1]),
                      t.merges.add(e.range),
                      t.rows.deleteCells(e.range),
                      t.rows.setCell(l, c, r);
                  });
                }
              }
            },
          },
          {
            key: "unmerge",
            value: function () {
              var t = this,
                e = this.selector;
              if (this.isSignleSelected()) {
                var n = e.range,
                  r = n.sri,
                  i = n.sci;
                this.changeData(function () {
                  t.rows.deleteCell(r, i, "merge"),
                    t.merges.deleteWithin(e.range);
                });
              }
            },
          },
          {
            key: "canAutofilter",
            value: function () {
              return !this.autoFilter.active();
            },
          },
          {
            key: "autofilter",
            value: function () {
              var t = this,
                e = this.autoFilter,
                n = this.selector;
              this.changeData(function () {
                e.active()
                  ? (e.clear(),
                    (t.exceptRowSet = new Set()),
                    (t.sortedRowMap = new Map()),
                    (t.unsortedRowMap = new Map()))
                  : (e.ref = n.range.toString());
              });
            },
          },
          {
            key: "setAutoFilter",
            value: function (t, e, n, r) {
              var i = this.autoFilter;
              i.addFilter(t, n, r), i.setSort(t, e), this.resetAutoFilter();
            },
          },
          {
            key: "resetAutoFilter",
            value: function () {
              var t = this,
                e = this.autoFilter,
                n = this.rows;
              if (e.active()) {
                var r = e.sort,
                  i = e.filteredRows(function (t, e) {
                    return n.getCell(t, e);
                  }),
                  o = i.rset,
                  a = i.fset,
                  l = Array.from(a),
                  c = Array.from(a);
                r &&
                  l.sort(function (t, e) {
                    return "asc" === r.order
                      ? t - e
                      : "desc" === r.order
                      ? e - t
                      : 0;
                  }),
                  (this.exceptRowSet = o),
                  (this.sortedRowMap = new Map()),
                  (this.unsortedRowMap = new Map()),
                  l.forEach(function (e, n) {
                    t.sortedRowMap.set(c[n], e), t.unsortedRowMap.set(e, c[n]);
                  });
              }
            },
          },
          {
            key: "deleteCell",
            value: function () {
              var t = this,
                e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : "all",
                n = this.selector;
              this.changeData(function () {
                t.rows.deleteCells(n.range, e),
                  ("all" !== e && "format" !== e) ||
                    t.merges.deleteWithin(n.range);
              });
            },
          },
          {
            key: "insert",
            value: function (t) {
              var e = this,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 1;
              this.changeData(function () {
                var r = e.selector.range,
                  i = r.sri,
                  o = r.sci,
                  a = e.rows,
                  l = e.merges,
                  c = e.cols,
                  s = i;
                "row" === t
                  ? a.insert(i, n)
                  : "column" === t &&
                    (a.insertColumn(o, n), (s = o), (c.len += 1)),
                  l.shift(t, s, n, function (t, e, n, r) {
                    var i = a.getCell(t, e);
                    (i.merge[0] += n), (i.merge[1] += r);
                  });
              });
            },
          },
          {
            key: "delete",
            value: function (t) {
              var e = this;
              this.changeData(function () {
                var n = e.rows,
                  r = e.merges,
                  i = e.selector,
                  o = e.cols,
                  a = i.range,
                  l = i.range,
                  c = l.sri,
                  s = l.sci,
                  u = l.eri,
                  f = l.eci,
                  h = at(i.range.size(), 2),
                  p = h[0],
                  d = h[1],
                  y = c,
                  v = p;
                "row" === t
                  ? n.delete(c, u)
                  : "column" === t &&
                    (n.deleteColumn(s, f), (y = a.sci), (v = d), (o.len -= 1)),
                  r.shift(t, y, -v, function (t, e, r, i) {
                    var o = n.getCell(t, e);
                    (o.merge[0] += r),
                      (o.merge[1] += i),
                      0 === o.merge[0] && 0 === o.merge[1] && delete o.merge;
                  });
              });
            },
          },
          {
            key: "scrollx",
            value: function (t, e) {
              var n = this.scroll,
                r = this.freeze,
                i = this.cols,
                o = at(r, 2)[1],
                a = at(
                  z.rangeReduceIf(o, i.len, 0, 0, t, function (t) {
                    return i.getWidth(t);
                  }),
                  3
                ),
                l = a[0],
                c = a[1],
                s = a[2],
                u = c;
              t > 0 && (u += s),
                n.x !== u && ((n.ci = t > 0 ? l : 0), (n.x = u), e());
            },
          },
          {
            key: "scrolly",
            value: function (t, e) {
              var n = this.scroll,
                r = this.freeze,
                i = this.rows,
                o = at(r, 1)[0],
                a = at(
                  z.rangeReduceIf(o, i.len, 0, 0, t, function (t) {
                    return i.getHeight(t);
                  }),
                  3
                ),
                l = a[0],
                c = a[1],
                s = a[2],
                u = c;
              t > 0 && (u += s),
                n.y !== u && ((n.ri = t > 0 ? l : 0), (n.y = u), e());
            },
          },
          {
            key: "cellRect",
            value: function (t, e) {
              var n = this.rows,
                r = this.cols,
                i = r.sumWidth(0, e),
                o = n.sumHeight(0, t),
                a = n.getCell(t, e),
                l = r.getWidth(e),
                c = n.getHeight(t);
              if (null !== a && a.merge) {
                var s = at(a.merge, 2),
                  u = s[0],
                  f = s[1];
                if (u > 0)
                  for (var h = 1; h <= u; h += 1) c += n.getHeight(t + h);
                if (f > 0)
                  for (var p = 1; p <= f; p += 1) l += r.getWidth(e + p);
              }
              return { left: i, top: o, width: l, height: c, cell: a };
            },
          },
          {
            key: "getCell",
            value: function (t, e) {
              return this.rows.getCell(t, e);
            },
          },
          {
            key: "getCellTextOrDefault",
            value: function (t, e) {
              var n = this.getCell(t, e);
              return n && n.text ? n.text : "";
            },
          },
          {
            key: "getCellStyle",
            value: function (t, e) {
              var n = this.getCell(t, e);
              return n && void 0 !== n.style ? this.styles[n.style] : null;
            },
          },
          {
            key: "getCellStyleOrDefault",
            value: function (t, e) {
              var n = this.styles,
                r = this.rows.getCell(t, e),
                i = r && void 0 !== r.style ? n[r.style] : {};
              return z.merge(this.defaultStyle(), i);
            },
          },
          {
            key: "getSelectedCellStyle",
            value: function () {
              var t = this.selector,
                e = t.ri,
                n = t.ci;
              return this.getCellStyleOrDefault(e, n);
            },
          },
          {
            key: "setCellText",
            value: function (t, e, n, r) {
              var i = this.rows,
                o = this.history,
                a = this.validations;
              "finished" === r
                ? (i.setCellText(t, e, ""),
                  o.add(this.getData()),
                  i.setCellText(t, e, n))
                : (i.setCellText(t, e, n), this.change(this.getData())),
                a.validate(t, e, n);
            },
          },
          {
            key: "freezeIsActive",
            value: function () {
              var t = at(this.freeze, 2),
                e = t[0],
                n = t[1];
              return e > 0 || n > 0;
            },
          },
          {
            key: "setFreeze",
            value: function (t, e) {
              var n = this;
              this.changeData(function () {
                n.freeze = [t, e];
              });
            },
          },
          {
            key: "freezeTotalWidth",
            value: function () {
              return this.cols.sumWidth(0, this.freeze[1]);
            },
          },
          {
            key: "freezeTotalHeight",
            value: function () {
              return this.rows.sumHeight(0, this.freeze[0]);
            },
          },
          {
            key: "setRowHeight",
            value: function (t, e) {
              var n = this;
              this.changeData(function () {
                n.rows.setHeight(t, e);
              });
            },
          },
          {
            key: "setColWidth",
            value: function (t, e) {
              var n = this;
              this.changeData(function () {
                n.cols.setWidth(t, e);
              });
            },
          },
          {
            key: "viewHeight",
            value: function () {
              var t = this.settings,
                e = t.view,
                n = t.showToolbar,
                r = t.showBottomBar,
                i = e.height();
              return r && (i -= 41), n && (i -= 41), i;
            },
          },
          {
            key: "viewWidth",
            value: function () {
              return this.settings.view.width();
            },
          },
          {
            key: "freezeViewRange",
            value: function () {
              var t = at(this.freeze, 2),
                e = t[0],
                n = t[1];
              return new v(
                0,
                0,
                e - 1,
                n - 1,
                this.freezeTotalWidth(),
                this.freezeTotalHeight()
              );
            },
          },
          {
            key: "contentRange",
            value: function () {
              var t = this.rows,
                e = this.cols,
                n = at(t.maxCell(), 2),
                r = n[0],
                i = n[1],
                o = t.sumHeight(0, r + 1),
                a = e.sumWidth(0, i + 1);
              return new v(0, 0, r, i, a, o);
            },
          },
          {
            key: "exceptRowTotalHeight",
            value: function (t, e) {
              var n = this.exceptRowSet,
                r = this.rows,
                i = Array.from(n),
                o = 0;
              return (
                i.forEach(function (n) {
                  if (n < t || n > e) {
                    var i = r.getHeight(n);
                    o += i;
                  }
                }),
                o
              );
            },
          },
          {
            key: "viewRange",
            value: function () {
              var t = this.scroll,
                e = this.rows,
                n = this.cols,
                r = this.freeze,
                i = this.exceptRowSet,
                o = t.ri,
                a = t.ci;
              o <= 0 && (o = at(r, 1)[0]);
              a <= 0 && (a = at(r, 2)[1]);
              for (
                var l = 0, c = 0, s = [e.len, n.len], u = s[0], f = s[1], h = o;
                h < e.len &&
                (i.has(h) || ((c += e.getHeight(h)), (u = h)),
                !(c > this.viewHeight()));
                h += 1
              );
              for (
                var p = a;
                p < n.len &&
                ((f = p), !((l += n.getWidth(p)) > this.viewWidth()));
                p += 1
              );
              return new v(o, a, u, f, l, c);
            },
          },
          {
            key: "eachMergesInView",
            value: function (t, e) {
              this.merges.filterIntersects(t).forEach(function (t) {
                return e(t);
              });
            },
          },
          {
            key: "hideRowsOrCols",
            value: function () {
              var t = this.rows,
                e = this.cols,
                n = this.selector,
                r = at(n.size(), 2),
                i = r[0],
                o = r[1],
                a = n.range,
                l = a.sri,
                c = a.sci,
                s = a.eri,
                u = a.eci;
              if (i === t.len) for (var f = c; f <= u; f += 1) e.setHide(f, !0);
              else if (o === e.len)
                for (var h = l; h <= s; h += 1) t.setHide(h, !0);
            },
          },
          {
            key: "unhideRowsOrCols",
            value: function (t, e) {
              this["".concat(t, "s")].unhide(e);
            },
          },
          {
            key: "rowEach",
            value: function (t, e, n) {
              for (
                var r = 0,
                  i = this.rows,
                  o = this.exceptRowSet,
                  a = it(o),
                  l = 0,
                  c = 0;
                c < a.length;
                c += 1
              )
                a[c] < t && (l += 1);
              for (var s = t + l; s <= e + l; s += 1)
                if (o.has(s)) l += 1;
                else {
                  var u = i.getHeight(s);
                  if (u > 0 && (n(s, r, u), (r += u) > this.viewHeight()))
                    break;
                }
            },
          },
          {
            key: "colEach",
            value: function (t, e, n) {
              for (var r = 0, i = this.cols, o = t; o <= e; o += 1) {
                var a = i.getWidth(o);
                if (a > 0 && (n(o, r, a), (r += a) > this.viewWidth())) break;
              }
            },
          },
          {
            key: "defaultStyle",
            value: function () {
              return this.settings.style;
            },
          },
          {
            key: "addStyle",
            value: function (t) {
              for (var e = this.styles, n = 0; n < e.length; n += 1) {
                var r = e[n];
                if (z.equals(r, t)) return n;
              }
              return e.push(t), e.length - 1;
            },
          },
          {
            key: "changeData",
            value: function (t) {
              this.history.add(this.getData()),
                t(),
                this.change(this.getData());
            },
          },
          {
            key: "setData",
            value: function (t) {
              var e = this;
              return (
                Object.keys(t).forEach(function (n) {
                  if (
                    "merges" === n ||
                    "rows" === n ||
                    "cols" === n ||
                    "validations" === n
                  )
                    e[n].setData(t[n]);
                  else if ("freeze" === n) {
                    var r = at(f(t[n]), 2),
                      i = r[0],
                      o = r[1];
                    e.freeze = [o, i];
                  } else
                    "autofilter" === n
                      ? e.autoFilter.setData(t[n])
                      : void 0 !== t[n] && (e[n] = t[n]);
                }),
                this
              );
            },
          },
          {
            key: "getData",
            value: function () {
              var t = this.name,
                e = this.freeze,
                n = this.styles,
                r = this.merges,
                i = this.rows,
                o = this.cols,
                a = this.validations,
                l = this.autoFilter;
              return {
                name: t,
                freeze: h(e[1], e[0]),
                styles: n,
                merges: r.getData(),
                rows: i.getData(),
                cols: o.getData(),
                validations: a.getData(),
                autofilter: l.getData(),
              };
            },
          },
        ]) && ot(e.prototype, n),
        r && ot(e, r),
        t
      );
    })();
    function dt(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function yt(t, e, n) {
      t.addEventListener(e, n);
    }
    function vt(t, e, n) {
      t.removeEventListener(e, n);
    }
    function bt(t) {
      t.xclickoutside &&
        (vt(window.document.body, "click", t.xclickoutside),
        delete t.xclickoutside);
    }
    function gt(t, e) {
      (t.xclickoutside = function (n) {
        2 === n.detail ||
          t.contains(n.target) ||
          (e ? e(t) : (t.hide(), bt(t)));
      }),
        yt(window.document.body, "click", t.xclickoutside);
    }
    function mt(t, e, n) {
      yt(t, "mousemove", e),
        (t.xEvtUp = function (r) {
          vt(t, "mousemove", e), vt(t, "mouseup", t.xEvtUp), n(r);
        }),
        yt(t, "mouseup", t.xEvtUp);
    }
    function wt(t, e, n, r) {
      Math.abs(t) > Math.abs(e)
        ? r(t > 0 ? "right" : "left", t, n)
        : r(e > 0 ? "down" : "up", e, n);
    }
    var kt = "x-spreadsheet";
    window.devicePixelRatio;
    function Ot(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var St = (function () {
      function t() {
        var e = this,
          n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          r = arguments.length > 1 ? arguments[1] : void 0;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.moving = !1),
          (this.vertical = n),
          (this.el = a(
            "div",
            "".concat(kt, "-resizer ").concat(n ? "vertical" : "horizontal")
          )
            .children(
              (this.unhideHoverEl = a("div", "".concat(kt, "-resizer-hover"))
                .on("dblclick.stop", function (t) {
                  return e.mousedblclickHandler(t);
                })
                .css("position", "absolute")
                .hide()),
              (this.hoverEl = a("div", "".concat(kt, "-resizer-hover")).on(
                "mousedown.stop",
                function (t) {
                  return e.mousedownHandler(t);
                }
              )),
              (this.lineEl = a("div", "".concat(kt, "-resizer-line")).hide())
            )
            .hide()),
          (this.cRect = null),
          (this.finishedFn = null),
          (this.minDistance = r),
          (this.unhideFn = function () {});
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "showUnhide",
            value: function (t) {
              (this.unhideIndex = t), this.unhideHoverEl.show();
            },
          },
          {
            key: "hideUnhide",
            value: function () {
              this.unhideHoverEl.hide();
            },
          },
          {
            key: "show",
            value: function (t, e) {
              var n = this.moving,
                r = this.vertical,
                i = this.hoverEl,
                o = this.lineEl,
                a = this.el,
                l = this.unhideHoverEl;
              if (!n) {
                this.cRect = t;
                var c = t.left,
                  s = t.top,
                  u = t.width,
                  f = t.height;
                a
                  .offset({ left: r ? c + u - 5 : c, top: r ? s : s + f - 5 })
                  .show(),
                  i.offset({ width: r ? 5 : u, height: r ? f : 5 }),
                  o.offset({
                    width: r ? 0 : e.width,
                    height: r ? e.height : 0,
                  }),
                  l.offset({
                    left: r ? 5 - u : c,
                    top: r ? s : 5 - f,
                    width: r ? 5 : u,
                    height: r ? f : 5,
                  });
              }
            },
          },
          {
            key: "hide",
            value: function () {
              this.el.offset({ left: 0, top: 0 }).hide(), this.hideUnhide();
            },
          },
          {
            key: "mousedblclickHandler",
            value: function () {
              this.unhideIndex && this.unhideFn(this.unhideIndex);
            },
          },
          {
            key: "mousedownHandler",
            value: function (t) {
              var e = this,
                n = t,
                r = this.el,
                i = this.lineEl,
                o = this.cRect,
                a = this.vertical,
                l = this.minDistance,
                c = a ? o.width : o.height;
              i.show(),
                mt(
                  window,
                  function (t) {
                    (e.moving = !0),
                      null !== n &&
                        1 === t.buttons &&
                        (a
                          ? (c += t.movementX) > l &&
                            r.css("left", "".concat(o.left + c, "px"))
                          : (c += t.movementY) > l &&
                            r.css("top", "".concat(o.top + c, "px")),
                        (n = t));
                  },
                  function () {
                    (n = null),
                      i.hide(),
                      (e.moving = !1),
                      e.hide(),
                      e.finishedFn && (c < l && (c = l), e.finishedFn(o, c));
                  }
                );
            },
          },
        ]) && Ot(e.prototype, n),
        r && Ot(e, r),
        t
      );
    })();
    function xt(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var Et = (function () {
      function t(e) {
        var n = this;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.vertical = e),
          (this.moveFn = null),
          (this.el = a(
            "div",
            "".concat(kt, "-scrollbar ").concat(e ? "vertical" : "horizontal")
          )
            .child((this.contentEl = a("div", "")))
            .on("mousemove.stop", function () {})
            .on("scroll.stop", function (t) {
              var e = t.target,
                r = e.scrollTop,
                i = e.scrollLeft;
              n.moveFn && n.moveFn(n.vertical ? r : i, t);
            }));
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "move",
            value: function (t) {
              return this.el.scroll(t), this;
            },
          },
          {
            key: "scroll",
            value: function () {
              return this.el.scroll();
            },
          },
          {
            key: "set",
            value: function (t, e) {
              var n = t - 1;
              if (e > n) {
                var r = this.vertical ? "height" : "width";
                this.el.css(r, "".concat(n - 15, "px")).show(),
                  this.contentEl
                    .css(this.vertical ? "width" : "height", "1px")
                    .css(r, "".concat(e, "px"));
              } else this.el.hide();
              return this;
            },
          },
        ]) && xt(e.prototype, n),
        r && xt(e, r),
        t
      );
    })();
    function jt(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function _t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Ct(t, e, n) {
      return e && _t(t.prototype, e), n && _t(t, n), t;
    }
    var Tt = 10,
      Pt = (function () {
        function t() {
          var e = this,
            n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          jt(this, t),
            (this.useHideInput = n),
            (this.inputChange = function () {}),
            (this.cornerEl = a("div", "".concat(kt, "-selector-corner"))),
            (this.areaEl = a("div", "".concat(kt, "-selector-area"))
              .child(this.cornerEl)
              .hide()),
            (this.clipboardEl = a(
              "div",
              "".concat(kt, "-selector-clipboard")
            ).hide()),
            (this.autofillEl = a(
              "div",
              "".concat(kt, "-selector-autofill")
            ).hide()),
            (this.el = a("div", "".concat(kt, "-selector"))
              .css("z-index", "".concat(Tt))
              .children(this.areaEl, this.clipboardEl, this.autofillEl)
              .hide()),
            n &&
              ((this.hideInput = a("input", "").on(
                "compositionend",
                function (t) {
                  e.inputChange(t.target.value);
                }
              )),
              this.el.child(
                (this.hideInputDiv = a("div", "hide-input").child(
                  this.hideInput
                ))
              ),
              this.el.child(
                (this.hideInputDiv = a("div", "hide-input").child(
                  this.hideInput
                ))
              )),
            (Tt += 1);
        }
        return (
          Ct(t, [
            {
              key: "setOffset",
              value: function (t) {
                return this.el.offset(t).show(), this;
              },
            },
            {
              key: "hide",
              value: function () {
                return this.el.hide(), this;
              },
            },
            {
              key: "setAreaOffset",
              value: function (t) {
                var e = t.left,
                  n = t.top,
                  r = {
                    width: t.width - 3 + 0.8,
                    height: t.height - 3 + 0.8,
                    left: e - 0.8,
                    top: n - 0.8,
                  };
                this.areaEl.offset(r).show(),
                  this.useHideInput &&
                    (this.hideInputDiv.offset(r),
                    this.hideInput.val("").focus());
              },
            },
            {
              key: "setClipboardOffset",
              value: function (t) {
                var e = t.left,
                  n = t.top,
                  r = t.width,
                  i = t.height;
                this.clipboardEl.offset({
                  left: e,
                  top: n,
                  width: r - 5,
                  height: i - 5,
                });
              },
            },
            {
              key: "showAutofill",
              value: function (t) {
                var e = t.left,
                  n = t.top,
                  r = t.width,
                  i = t.height;
                this.autofillEl
                  .offset({ width: r - 3, height: i - 3, left: e, top: n })
                  .show();
              },
            },
            {
              key: "hideAutofill",
              value: function () {
                this.autofillEl.hide();
              },
            },
            {
              key: "showClipboard",
              value: function () {
                this.clipboardEl.show();
              },
            },
            {
              key: "hideClipboard",
              value: function () {
                this.clipboardEl.hide();
              },
            },
          ]),
          t
        );
      })();
    function At(t) {
      var e = this.data,
        n = t.left,
        r = t.top,
        i = t.width,
        o = t.height,
        a = t.scroll,
        l = t.l,
        c = t.t,
        s = e.freezeTotalWidth(),
        u = e.freezeTotalHeight(),
        f = n - s;
      s > l && (f -= a.x);
      var h = r - u;
      return u > c && (h -= a.y), { left: f, top: h, width: i, height: o };
    }
    function Rt(t) {
      var e = this.data,
        n = t.left,
        r = t.width,
        i = t.height,
        o = t.l,
        a = t.t,
        l = t.scroll,
        c = e.freezeTotalWidth(),
        s = n - c;
      return c > o && (s -= l.x), { left: s, top: a, width: r, height: i };
    }
    function It(t) {
      var e = this.data,
        n = t.top,
        r = t.width,
        i = t.height,
        o = t.l,
        a = t.t,
        l = t.scroll,
        c = e.freezeTotalHeight(),
        s = n - c;
      return c > a && (s -= l.y), { left: o, top: s, width: r, height: i };
    }
    function Dt(t) {
      this.br.setAreaOffset(At.call(this, t));
    }
    function zt(t) {
      this.t.setAreaOffset(Rt.call(this, t));
    }
    function Ht(t) {
      this.l.setAreaOffset(It.call(this, t));
    }
    function Mt(t) {
      this.l.setClipboardOffset(It.call(this, t));
    }
    function Nt(t) {
      this.br.setClipboardOffset(At.call(this, t));
    }
    function Ft(t) {
      this.t.setClipboardOffset(Rt.call(this, t));
    }
    function Wt(t) {
      Dt.call(this, t),
        function (t) {
          this.tl.setAreaOffset(t);
        }.call(this, t),
        zt.call(this, t),
        Ht.call(this, t);
    }
    function Vt(t) {
      Nt.call(this, t),
        function (t) {
          this.tl.setClipboardOffset(t);
        }.call(this, t),
        Ft.call(this, t),
        Mt.call(this, t);
    }
    var qt = (function () {
      function t(e) {
        var n = this;
        jt(this, t),
          (this.inputChange = function () {}),
          (this.data = e),
          (this.br = new Pt(!0)),
          (this.t = new Pt()),
          (this.l = new Pt()),
          (this.tl = new Pt()),
          (this.br.inputChange = function (t) {
            n.inputChange(t);
          }),
          this.br.el.show(),
          (this.offset = null),
          (this.areaOffset = null),
          (this.indexes = null),
          (this.range = null),
          (this.arange = null),
          (this.el = a("div", "".concat(kt, "-selectors"))
            .children(this.tl.el, this.t.el, this.l.el, this.br.el)
            .hide()),
          (this.lastri = -1),
          (this.lastci = -1),
          (Tt += 1);
      }
      return (
        Ct(t, [
          {
            key: "resetData",
            value: function (t) {
              (this.data = t),
                (this.range = t.selector.range),
                this.resetAreaOffset();
            },
          },
          {
            key: "hide",
            value: function () {
              this.el.hide();
            },
          },
          {
            key: "resetOffset",
            value: function () {
              var t = this.data,
                e = this.tl,
                n = this.t,
                r = this.l,
                i = this.br,
                o = t.freezeTotalHeight(),
                a = t.freezeTotalWidth();
              o > 0 || a > 0
                ? (e.setOffset({ width: a, height: o }),
                  n.setOffset({ left: a, height: o }),
                  r.setOffset({ top: o, width: a }),
                  i.setOffset({ left: a, top: o }))
                : (e.hide(),
                  n.hide(),
                  r.hide(),
                  i.setOffset({ left: 0, top: 0 }));
            },
          },
          {
            key: "resetAreaOffset",
            value: function () {
              var t = this.data.getSelectedRect(),
                e = this.data.getClipboardRect();
              Wt.call(this, t), Vt.call(this, e), this.resetOffset();
            },
          },
          {
            key: "resetBRTAreaOffset",
            value: function () {
              var t = this.data.getSelectedRect(),
                e = this.data.getClipboardRect();
              Dt.call(this, t),
                zt.call(this, t),
                Nt.call(this, e),
                Ft.call(this, e),
                this.resetOffset();
            },
          },
          {
            key: "resetBRLAreaOffset",
            value: function () {
              var t = this.data.getSelectedRect(),
                e = this.data.getClipboardRect();
              Dt.call(this, t),
                Ht.call(this, t),
                Nt.call(this, e),
                Mt.call(this, e),
                this.resetOffset();
            },
          },
          {
            key: "set",
            value: function (t, e) {
              var n =
                  !(arguments.length > 2 && void 0 !== arguments[2]) ||
                  arguments[2],
                r = this.data,
                i = r.calSelectedRangeByStart(t, e),
                o = i.sri,
                a = i.sci;
              if (n) {
                var l = t,
                  c = e;
                t < 0 && (l = 0),
                  e < 0 && (c = 0),
                  r.selector.setIndexes(l, c),
                  (this.indexes = [l, c]);
              }
              (this.moveIndexes = [o, a]),
                (this.range = i),
                this.resetAreaOffset(),
                this.el.show();
            },
          },
          {
            key: "setEnd",
            value: function (t, e) {
              var n =
                  !(arguments.length > 2 && void 0 !== arguments[2]) ||
                  arguments[2],
                r = this.data,
                i = this.lastri,
                o = this.lastci;
              if (n) {
                if (t === i && e === o) return;
                (this.lastri = t), (this.lastci = e);
              }
              (this.range = r.calSelectedRangeByEnd(t, e)),
                Wt.call(this, this.data.getSelectedRect());
            },
          },
          {
            key: "reset",
            value: function () {
              var t = this.data.selector.range,
                e = t.eri,
                n = t.eci;
              this.setEnd(e, n);
            },
          },
          {
            key: "showAutofill",
            value: function (t, e) {
              if (-1 !== t || -1 !== e) {
                var n = this.range,
                  r = n.sri,
                  i = n.sci,
                  o = n.eri,
                  a = n.eci,
                  l = t,
                  c = e,
                  s = r - t,
                  u = o - t,
                  f = a - e;
                if (i - e > 0) this.arange = new v(r, c, o, i - 1);
                else if (s > 0) this.arange = new v(l, i, r - 1, a);
                else if (f < 0) this.arange = new v(r, a + 1, o, c);
                else {
                  if (!(u < 0)) return void (this.arange = null);
                  this.arange = new v(o + 1, i, l, a);
                }
                if (null !== this.arange) {
                  var h = this.data.getRect(this.arange);
                  (h.width += 2), (h.height += 2);
                  var p = this.br,
                    d = this.l,
                    y = this.t,
                    b = this.tl;
                  p.showAutofill(At.call(this, h)),
                    d.showAutofill(It.call(this, h)),
                    y.showAutofill(Rt.call(this, h)),
                    b.showAutofill(h);
                }
              }
            },
          },
          {
            key: "hideAutofill",
            value: function () {
              var t = this;
              ["br", "l", "t", "tl"].forEach(function (e) {
                t[e].hideAutofill();
              });
            },
          },
          {
            key: "showClipboard",
            value: function () {
              var t = this,
                e = this.data.getClipboardRect();
              Vt.call(this, e),
                ["br", "l", "t", "tl"].forEach(function (e) {
                  t[e].showClipboard();
                });
            },
          },
          {
            key: "hideClipboard",
            value: function () {
              var t = this;
              ["br", "l", "t", "tl"].forEach(function (e) {
                t[e].hideClipboard();
              });
            },
          },
        ]),
        t
      );
    })();
    function Bt(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function Lt(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Ut(t) {
      t.preventDefault();
      var e = this.filterItems;
      e.length <= 0 ||
        (t.stopPropagation(),
        this.itemIndex < 0 && (this.itemIndex = 0),
        e[this.itemIndex].el.click(),
        this.hide());
    }
    var Yt = (function () {
      function t(e, n) {
        var r =
          arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : "200px";
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.filterItems = []),
          (this.items = e),
          (this.el = a("div", "".concat(kt, "-suggest"))
            .css("width", r)
            .hide()),
          (this.itemClick = n),
          (this.itemIndex = -1);
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "setOffset",
            value: function (t) {
              this.el.cssRemoveKeys("top", "bottom").offset(t);
            },
          },
          {
            key: "hide",
            value: function () {
              var t = this.el;
              (this.filterItems = []),
                (this.itemIndex = -1),
                t.hide(),
                bt(this.el.parent());
            },
          },
          {
            key: "setItems",
            value: function (t) {
              this.items = t;
            },
          },
          {
            key: "search",
            value: function (t) {
              var e,
                n = this,
                r = this.items;
              if (
                (/^\s*$/.test(t) ||
                  (r = r.filter(function (e) {
                    return (e.key || e).startsWith(t.toUpperCase());
                  })),
                (r = r.map(function (t) {
                  var e = t.title;
                  e ? "function" == typeof e && (e = e()) : (e = t);
                  var r = a("div", "".concat(kt, "-item"))
                    .child(e)
                    .on("click.stop", function () {
                      n.itemClick(t), n.hide();
                    });
                  return t.label && r.child(a("div", "label").html(t.label)), r;
                })),
                (this.filterItems = r),
                !(r.length <= 0))
              ) {
                var i = this.el;
                (e = i.html("")).children.apply(e, Bt(r)).show(),
                  gt(i.parent(), function () {
                    n.hide();
                  });
              }
            },
          },
          {
            key: "bindInputEvents",
            value: function (t) {
              var e = this;
              t.on("keydown", function (t) {
                return function (t) {
                  var e = t.keyCode;
                  switch ((t.ctrlKey && t.stopPropagation(), e)) {
                    case 37:
                      t.stopPropagation();
                      break;
                    case 38:
                      (function (t) {
                        t.preventDefault(), t.stopPropagation();
                        var e = this.filterItems;
                        e.length <= 0 ||
                          (this.itemIndex >= 0 && e[this.itemIndex].toggle(),
                          (this.itemIndex -= 1),
                          this.itemIndex < 0 && (this.itemIndex = e.length - 1),
                          e[this.itemIndex].toggle());
                      }).call(this, t);
                      break;
                    case 39:
                      t.stopPropagation();
                      break;
                    case 40:
                      (function (t) {
                        t.stopPropagation();
                        var e = this.filterItems;
                        e.length <= 0 ||
                          (this.itemIndex >= 0 && e[this.itemIndex].toggle(),
                          (this.itemIndex += 1),
                          this.itemIndex > e.length - 1 && (this.itemIndex = 0),
                          e[this.itemIndex].toggle());
                      }).call(this, t);
                      break;
                    case 13:
                    case 9:
                      Ut.call(this, t);
                      break;
                    default:
                      t.stopPropagation();
                  }
                }.call(e, t);
              });
            },
          },
        ]) && Lt(e.prototype, n),
        r && Lt(e, r),
        t
      );
    })();
    function $t(t) {
      return ($t =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Xt(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Zt(t, e) {
      return !e || ("object" !== $t(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Kt(t) {
      return (Kt = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Jt(t, e) {
      return (Jt =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Gt = (function (t) {
      function e(t) {
        var n;
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          ((n = Zt(
            this,
            Kt(e).call(this, "div", "".concat(kt, "-icon"))
          )).iconNameEl = a("div", "".concat(kt, "-icon-img ").concat(t))),
          n.child(n.iconNameEl),
          n
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Jt(t, e);
        })(e, o),
        (n = e),
        (r = [
          {
            key: "setName",
            value: function (t) {
              this.iconNameEl.className("".concat(kt, "-icon-img ").concat(t));
            },
          },
        ]) && Xt(n.prototype, r),
        i && Xt(n, i),
        e
      );
    })();
    function Qt(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function te(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function ee(t, e) {
      t.setMonth(t.getMonth() + e);
    }
    function ne(t, e) {
      var n = new Date(t);
      return n.setDate(e - t.getDay() + 1), n;
    }
    var re = (function () {
      function t(e) {
        var n,
          r = this;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.value = e),
          (this.cvalue = new Date(e)),
          (this.headerLeftEl = a("div", "calendar-header-left")),
          (this.bodyEl = a("tbody", "")),
          this.buildAll(),
          (this.el = a("div", "x-spreadsheet-calendar").children(
            a("div", "calendar-header").children(
              this.headerLeftEl,
              a("div", "calendar-header-right").children(
                a("a", "calendar-prev")
                  .on("click.stop", function () {
                    return r.prev();
                  })
                  .child(new Gt("chevron-left")),
                a("a", "calendar-next")
                  .on("click.stop", function () {
                    return r.next();
                  })
                  .child(new Gt("chevron-right"))
              )
            ),
            a("table", "calendar-body").children(
              a("thead", "").child(
                (n = a("tr", "")).children.apply(
                  n,
                  Qt(
                    L("calendar.weeks").map(function (t) {
                      return a("th", "cell").child(t);
                    })
                  )
                )
              ),
              this.bodyEl
            )
          )),
          (this.selectChange = function () {});
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "setValue",
            value: function (t) {
              (this.value = t), (this.cvalue = new Date(t)), this.buildAll();
            },
          },
          {
            key: "prev",
            value: function () {
              ee(this.value, -1), this.buildAll();
            },
          },
          {
            key: "next",
            value: function () {
              ee(this.value, 1), this.buildAll();
            },
          },
          {
            key: "buildAll",
            value: function () {
              this.buildHeaderLeft(), this.buildBody();
            },
          },
          {
            key: "buildHeaderLeft",
            value: function () {
              var t = this.value;
              this.headerLeftEl.html(
                ""
                  .concat(L("calendar.months")[t.getMonth()], " ")
                  .concat(t.getFullYear())
              );
            },
          },
          {
            key: "buildBody",
            value: function () {
              var t,
                e = this,
                n = this.value,
                r = this.cvalue,
                i = this.bodyEl,
                o = (function (t, e, n) {
                  for (
                    var r = new Date(t, e, 1, 23, 59, 59),
                      i = [[], [], [], [], [], []],
                      o = 0;
                    o < 6;
                    o += 1
                  )
                    for (var a = 0; a < 7; a += 1) {
                      var l = ne(r, 7 * o + a),
                        c = l.getMonth() !== e,
                        s =
                          l.getMonth() === n.getMonth() &&
                          l.getDate() === n.getDate();
                      i[o][a] = { d: l, disabled: c, active: s };
                    }
                  return i;
                })(n.getFullYear(), n.getMonth(), r).map(function (t) {
                  var n,
                    r = t.map(function (t) {
                      var n = "cell";
                      return (
                        t.disabled && (n += " disabled"),
                        t.active && (n += " active"),
                        a("td", "").child(
                          a("div", n)
                            .on("click.stop", function () {
                              e.selectChange(t.d);
                            })
                            .child(t.d.getDate().toString())
                        )
                      );
                    });
                  return (n = a("tr", "")).children.apply(n, Qt(r));
                });
              (t = i.html("")).children.apply(t, Qt(o));
            },
          },
        ]) && te(e.prototype, n),
        r && te(e, r),
        t
      );
    })();
    function ie(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var oe = (function () {
      function t() {
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.calendar = new re(new Date())),
          (this.el = a("div", "".concat(kt, "-datepicker"))
            .child(this.calendar.el)
            .hide());
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "setValue",
            value: function (t) {
              var e = this.calendar;
              return (
                "string" == typeof t
                  ? /^\d{4}-\d{1,2}-\d{1,2}$/.test(t) &&
                    e.setValue(new Date(t.replace(new RegExp("-", "g"), "/")))
                  : t instanceof Date && e.setValue(t),
                this
              );
            },
          },
          {
            key: "change",
            value: function (t) {
              var e = this;
              this.calendar.selectChange = function (n) {
                t(n), e.hide();
              };
            },
          },
          {
            key: "show",
            value: function () {
              this.el.show();
            },
          },
          {
            key: "hide",
            value: function () {
              this.el.hide();
            },
          },
        ]) && ie(e.prototype, n),
        r && ie(e, r),
        t
      );
    })();
    function ae(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function le(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function ce() {
      var t = this.inputText;
      if (!/^\s*$/.test(t)) {
        var e = this.textlineEl,
          n = this.textEl,
          r = this.areaOffset,
          i = t.split("\n"),
          o = Math.max.apply(
            Math,
            le(
              i.map(function (t) {
                return t.length;
              })
            )
          ),
          a = e.offset().width / t.length,
          l = (o + 1) * a + 5,
          c = this.viewFn().width - r.left - a,
          s = i.length;
        if (l > r.width) {
          var u = l;
          l > c &&
            ((u = c), (s += parseInt(l / c, 10)), (s += l % c > 0 ? 1 : 0)),
            n.css("width", "".concat(u, "px"));
        }
        (s *= this.rowHeight) > r.height && n.css("height", "".concat(s, "px"));
      }
    }
    function se(t) {
      var e = t.keyCode,
        n = t.altKey;
      13 !== e && 9 !== e && t.stopPropagation(),
        13 === e &&
          n &&
          (function (t, e) {
            var n = t.target,
              r = n.value,
              i = n.selectionEnd,
              o = "".concat(r.slice(0, i)).concat(e).concat(r.slice(i));
            (n.value = o),
              n.setSelectionRange(i + 1, i + 1),
              (this.inputText = o),
              this.textlineEl.html(o),
              ce.call(this);
          }.call(this, t, "\n"),
          t.stopPropagation()),
        13 !== e || n || t.preventDefault();
    }
    function ue(t, e) {
      var n = this.textEl,
        r = this.textlineEl;
      n.el.blur(),
        n.val(t),
        r.html(t),
        function (t) {
          var e = this.textEl.el;
          setTimeout(function () {
            e.focus(), e.setSelectionRange(t, t);
          }, 0);
        }.call(this, e);
    }
    var fe = (function () {
      function t(e, n, r) {
        var i = this;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.viewFn = n),
          (this.rowHeight = r),
          (this.formulas = e),
          (this.suggest = new Yt(e, function (t) {
            (function (t) {
              var e = this.inputText,
                n = this.validator,
                r = 0;
              if (n && "list" === n.type)
                (this.inputText = t), (r = this.inputText.length);
              else {
                var i = e.lastIndexOf("="),
                  o = e.substring(0, i + 1),
                  a = e.substring(i + 1);
                (a = -1 !== a.indexOf(")") ? a.substring(a.indexOf(")")) : ""),
                  (this.inputText = "".concat(o + t.key, "(")),
                  (r = this.inputText.length),
                  (this.inputText += ")".concat(a));
              }
              ue.call(this, this.inputText, r);
            }).call(i, t);
          })),
          (this.datepicker = new oe()),
          this.datepicker.change(function (t) {
            i.setText(
              (function (t) {
                var e = t.getMonth() + 1,
                  n = t.getDate();
                return (
                  e < 10 && (e = "0".concat(e)),
                  n < 10 && (n = "0".concat(n)),
                  "".concat(t.getFullYear(), "-").concat(e, "-").concat(n)
                );
              })(t)
            ),
              i.clear();
          }),
          (this.areaEl = a("div", "".concat(kt, "-editor-area"))
            .children(
              (this.textEl = a("textarea", "")
                .on("input", function (t) {
                  return function (t) {
                    var e = t.target.value,
                      n = this.suggest,
                      r = this.textlineEl,
                      i = this.validator,
                      o = this.cell;
                    if (null !== o)
                      if (
                        ("editable" in o && !0 === o.editable) ||
                        void 0 === o.editable
                      ) {
                        if (((this.inputText = e), i))
                          "list" === i.type ? n.search(e) : n.hide();
                        else {
                          var a = e.lastIndexOf("=");
                          -1 !== a ? n.search(e.substring(a + 1)) : n.hide();
                        }
                        r.html(e), ce.call(this), this.change("input", e);
                      } else t.target.value = o.text;
                    else {
                      if (((this.inputText = e), i))
                        "list" === i.type ? n.search(e) : n.hide();
                      else {
                        var l = e.lastIndexOf("=");
                        -1 !== l ? n.search(e.substring(l + 1)) : n.hide();
                      }
                      r.html(e), ce.call(this), this.change("input", e);
                    }
                  }.call(i, t);
                })
                .on("paste.stop", function () {})
                .on("keydown", function (t) {
                  return se.call(i, t);
                })),
              (this.textlineEl = a("div", "textline")),
              this.suggest.el,
              this.datepicker.el
            )
            .on("mousemove.stop", function () {})
            .on("mousedown.stop", function () {})),
          (this.el = a("div", "".concat(kt, "-editor"))
            .child(this.areaEl)
            .hide()),
          this.suggest.bindInputEvents(this.textEl),
          (this.areaOffset = null),
          (this.freeze = { w: 0, h: 0 }),
          (this.cell = null),
          (this.inputText = ""),
          (this.change = function () {});
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "setFreezeLengths",
            value: function (t, e) {
              (this.freeze.w = t), (this.freeze.h = e);
            },
          },
          {
            key: "clear",
            value: function () {
              "" !== this.inputText && this.change("finished", this.inputText),
                (this.cell = null),
                (this.areaOffset = null),
                (this.inputText = ""),
                this.el.hide(),
                this.textEl.val(""),
                this.textlineEl.html(""),
                function () {
                  this.suggest.setItems(this.formulas);
                }.call(this),
                this.datepicker.hide();
            },
          },
          {
            key: "setOffset",
            value: function (t) {
              var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "top",
                n = this.textEl,
                r = this.areaEl,
                i = this.suggest,
                o = this.freeze,
                a = this.el;
              if (t) {
                this.areaOffset = t;
                var l = t.left,
                  c = t.top,
                  s = t.width,
                  u = t.height,
                  f = t.l,
                  h = t.t,
                  p = { left: 0, top: 0 };
                (o.w > f && o.h > h) ||
                  (o.w < f && o.h < h
                    ? ((p.left = o.w), (p.top = o.h))
                    : o.w > f
                    ? (p.top = o.h)
                    : o.h > h && (p.left = o.w)),
                  a.offset(p),
                  r.offset({ left: l - p.left - 0.8, top: c - p.top - 0.8 }),
                  n.offset({ width: s - 9 + 0.8, height: u - 3 + 0.8 });
                var d = { left: 0 };
                (d[e] = u), i.setOffset(d), i.hide();
              }
            },
          },
          {
            key: "setCell",
            value: function (t, e) {
              var n = this.el,
                r = this.datepicker,
                i = this.suggest;
              n.show(), (this.cell = t);
              var o = (t && t.text) || "";
              if ((this.setText(o), (this.validator = e), e)) {
                var a = e.type;
                "date" === a && (r.show(), /^\s*$/.test(o) || r.setValue(o)),
                  "list" === a && (i.setItems(e.values()), i.search(""));
              }
            },
          },
          {
            key: "setText",
            value: function (t) {
              (this.inputText = t), ue.call(this, t, t.length), ce.call(this);
            },
          },
        ]) && ae(e.prototype, n),
        r && ae(e, r),
        t
      );
    })();
    function he(t) {
      return (he =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function pe(t, e) {
      return !e || ("object" !== he(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function de(t) {
      return (de = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function ye(t, e) {
      return (ye =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var ve = (function (t) {
      function e(t) {
        var n,
          r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          (n = pe(
            this,
            de(e).call(this, "div", "".concat(kt, "-button ").concat(r))
          )).child(L("button.".concat(t))),
          n
        );
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && ye(t, e);
        })(e, o),
        e
      );
    })();
    function be(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function ge(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function me(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function we(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function ke(t, e, n) {
      return e && we(t.prototype, e), n && we(t, n), t;
    }
    function Oe() {
      return window.devicePixelRatio || 1;
    }
    function Se() {
      return Oe() - 0.5;
    }
    function xe(t) {
      return parseInt(t * Oe(), 10);
    }
    function Ee(t) {
      var e = xe(t);
      return e > 0 ? e - 0.5 : 0.5;
    }
    var je = (function () {
      function t(e, n, r, i) {
        var o =
          arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0;
        me(this, t),
          (this.x = e),
          (this.y = n),
          (this.width = r),
          (this.height = i),
          (this.padding = o),
          (this.bgcolor = "#ffffff"),
          (this.borderTop = null),
          (this.borderRight = null),
          (this.borderBottom = null),
          (this.borderLeft = null);
      }
      return (
        ke(t, [
          {
            key: "setBorders",
            value: function (t) {
              var e = t.top,
                n = t.bottom,
                r = t.left,
                i = t.right;
              e && (this.borderTop = e),
                i && (this.borderRight = i),
                n && (this.borderBottom = n),
                r && (this.borderLeft = r);
            },
          },
          {
            key: "innerWidth",
            value: function () {
              return this.width - 2 * this.padding - 2;
            },
          },
          {
            key: "innerHeight",
            value: function () {
              return this.height - 2 * this.padding - 2;
            },
          },
          {
            key: "textx",
            value: function (t) {
              var e = this.width,
                n = this.padding,
                r = this.x;
              return (
                "left" === t
                  ? (r += n)
                  : "center" === t
                  ? (r += e / 2)
                  : "right" === t && (r += e - n),
                r
              );
            },
          },
          {
            key: "texty",
            value: function (t, e) {
              var n = this.height,
                r = this.padding,
                i = this.y;
              return (
                "top" === t
                  ? (i += r)
                  : "middle" === t
                  ? (i += n / 2 - e / 2)
                  : "bottom" === t && (i += n - r - e),
                i
              );
            },
          },
          {
            key: "topxys",
            value: function () {
              var t = this.x,
                e = this.y;
              return [
                [t, e],
                [t + this.width, e],
              ];
            },
          },
          {
            key: "rightxys",
            value: function () {
              var t = this.x,
                e = this.y,
                n = this.width;
              return [
                [t + n, e],
                [t + n, e + this.height],
              ];
            },
          },
          {
            key: "bottomxys",
            value: function () {
              var t = this.x,
                e = this.y,
                n = this.width,
                r = this.height;
              return [
                [t, e + r],
                [t + n, e + r],
              ];
            },
          },
          {
            key: "leftxys",
            value: function () {
              var t = this.x,
                e = this.y;
              return [
                [t, e],
                [t, e + this.height],
              ];
            },
          },
        ]),
        t
      );
    })();
    function _e(t, e, n, r, i, o, a) {
      var l = { x: 0, y: 0 };
      "underline" === t
        ? (l.y = "bottom" === i ? 0 : "top" === i ? -(o + 2) : -o / 2)
        : "strike" === t &&
          ("bottom" === i
            ? (l.y = o / 2)
            : "top" === i && (l.y = -(o / 2 + 2))),
        "center" === r ? (l.x = a / 2) : "right" === r && (l.x = a),
        this.line([e - l.x, n - l.y], [e - l.x + a, n - l.y]);
    }
    var Ce = (function () {
        function t(e, n, r) {
          me(this, t),
            (this.el = e),
            (this.ctx = e.getContext("2d")),
            this.resize(n, r),
            this.ctx.scale(Oe(), Oe());
        }
        return (
          ke(t, [
            {
              key: "resize",
              value: function (t, e) {
                (this.el.style.width = "".concat(t, "px")),
                  (this.el.style.height = "".concat(e, "px")),
                  (this.el.width = xe(t)),
                  (this.el.height = xe(e));
              },
            },
            {
              key: "clear",
              value: function () {
                var t = this.el,
                  e = t.width,
                  n = t.height;
                return this.ctx.clearRect(0, 0, e, n), this;
              },
            },
            {
              key: "attr",
              value: function (t) {
                return Object.assign(this.ctx, t), this;
              },
            },
            {
              key: "save",
              value: function () {
                return this.ctx.save(), this.ctx.beginPath(), this;
              },
            },
            {
              key: "restore",
              value: function () {
                return this.ctx.restore(), this;
              },
            },
            {
              key: "beginPath",
              value: function () {
                return this.ctx.beginPath(), this;
              },
            },
            {
              key: "translate",
              value: function (t, e) {
                return this.ctx.translate(xe(t), xe(e)), this;
              },
            },
            {
              key: "scale",
              value: function (t, e) {
                return this.ctx.scale(t, e), this;
              },
            },
            {
              key: "clearRect",
              value: function (t, e, n, r) {
                return this.ctx.clearRect(t, e, n, r), this;
              },
            },
            {
              key: "fillRect",
              value: function (t, e, n, r) {
                return (
                  this.ctx.fillRect(xe(t) - 0.5, xe(e) - 0.5, xe(n), xe(r)),
                  this
                );
              },
            },
            {
              key: "fillText",
              value: function (t, e, n) {
                return this.ctx.fillText(t, xe(e), xe(n)), this;
              },
            },
            {
              key: "text",
              value: function (t, e) {
                var n = this,
                  r =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : {},
                  i =
                    !(arguments.length > 3 && void 0 !== arguments[3]) ||
                    arguments[3],
                  o = this.ctx,
                  a = r.align,
                  l = r.valign,
                  c = r.font,
                  s = r.color,
                  u = r.strike,
                  f = r.underline,
                  h = e.textx(a);
                o.save(),
                  o.beginPath(),
                  this.attr({
                    textAlign: a,
                    textBaseline: l,
                    font: ""
                      .concat(c.italic ? "italic" : "", " ")
                      .concat(c.bold ? "bold" : "", " ")
                      .concat(xe(c.size), "px ")
                      .concat(c.name),
                    fillStyle: s,
                    strokeStyle: s,
                  });
                var p = "".concat(t).split("\n"),
                  d = e.innerWidth(),
                  y = [];
                p.forEach(function (t) {
                  var e = o.measureText(t).width;
                  if (i && e > xe(d)) {
                    for (
                      var n = { w: 0, len: 0, start: 0 }, r = 0;
                      r < t.length;
                      r += 1
                    )
                      n.w >= xe(d) &&
                        (y.push(t.substr(n.start, n.len)),
                        (n = { w: 0, len: 0, start: r })),
                        (n.len += 1),
                        (n.w += o.measureText(t[r]).width + 1);
                    n.len > 0 && y.push(t.substr(n.start, n.len));
                  } else y.push(t);
                });
                var v = (y.length - 1) * (c.size + 2),
                  b = e.texty(l, v);
                return (
                  y.forEach(function (t) {
                    var e = o.measureText(t).width;
                    n.fillText(t, h, b),
                      u && _e.call(n, "strike", h, b, a, l, c.size, e),
                      f && _e.call(n, "underline", h, b, a, l, c.size, e),
                      (b += c.size + 2);
                  }),
                  o.restore(),
                  this
                );
              },
            },
            {
              key: "border",
              value: function (t, e) {
                var n = this.ctx;
                return (
                  (n.lineWidth = Se),
                  (n.strokeStyle = e),
                  "medium" === t
                    ? (n.lineWidth = xe(2) - 0.5)
                    : "thick" === t
                    ? (n.lineWidth = xe(3))
                    : "dashed" === t
                    ? n.setLineDash([xe(3), xe(2)])
                    : "dotted" === t
                    ? n.setLineDash([xe(1), xe(1)])
                    : "double" === t && n.setLineDash([xe(2), 0]),
                  this
                );
              },
            },
            {
              key: "line",
              value: function () {
                var t = this.ctx;
                if (arguments.length > 1) {
                  t.beginPath();
                  var e = arguments.length <= 0 ? void 0 : arguments[0],
                    n = ge(e, 2),
                    r = n[0],
                    i = n[1];
                  t.moveTo(Ee(r), Ee(i));
                  for (var o = 1; o < arguments.length; o += 1) {
                    var a =
                        o < 0 || arguments.length <= o ? void 0 : arguments[o],
                      l = ge(a, 2),
                      c = l[0],
                      s = l[1];
                    t.lineTo(Ee(c), Ee(s));
                  }
                  t.stroke();
                }
                return this;
              },
            },
            {
              key: "strokeBorders",
              value: function (t) {
                var e = this.ctx;
                e.save();
                var n = t.borderTop,
                  r = t.borderRight,
                  i = t.borderBottom,
                  o = t.borderLeft;
                n &&
                  (this.border.apply(this, be(n)),
                  this.line.apply(this, be(t.topxys()))),
                  r &&
                    (this.border.apply(this, be(r)),
                    this.line.apply(this, be(t.rightxys()))),
                  i &&
                    (this.border.apply(this, be(i)),
                    this.line.apply(this, be(t.bottomxys()))),
                  o &&
                    (this.border.apply(this, be(o)),
                    this.line.apply(this, be(t.leftxys()))),
                  e.restore();
              },
            },
            {
              key: "dropdown",
              value: function (t) {
                var e = this.ctx,
                  n = t.x,
                  r = t.y,
                  i = n + t.width - 15,
                  o = r + t.height - 15;
                e.save(),
                  e.beginPath(),
                  e.moveTo(xe(i), xe(o)),
                  e.lineTo(xe(i + 8), xe(o)),
                  e.lineTo(xe(i + 4), xe(o + 6)),
                  e.closePath(),
                  (e.fillStyle = "rgba(0, 0, 0, .45)"),
                  e.fill(),
                  e.restore();
              },
            },
            {
              key: "error",
              value: function (t) {
                var e = this.ctx,
                  n = t.x,
                  r = t.y,
                  i = n + t.width - 1;
                e.save(),
                  e.beginPath(),
                  e.moveTo(xe(i - 8), xe(r - 1)),
                  e.lineTo(xe(i), xe(r - 1)),
                  e.lineTo(xe(i), xe(r + 8)),
                  e.closePath(),
                  (e.fillStyle = "rgba(255, 0, 0, .65)"),
                  e.fill(),
                  e.restore();
              },
            },
            {
              key: "frozen",
              value: function (t) {
                var e = this.ctx,
                  n = t.x,
                  r = t.y,
                  i = n + t.width - 1;
                e.save(),
                  e.beginPath(),
                  e.moveTo(xe(i - 8), xe(r - 1)),
                  e.lineTo(xe(i), xe(r - 1)),
                  e.lineTo(xe(i), xe(r + 8)),
                  e.closePath(),
                  (e.fillStyle = "rgba(0, 255, 0, .85)"),
                  e.fill(),
                  e.restore();
              },
            },
            {
              key: "rect",
              value: function (t, e) {
                var n = this.ctx,
                  r = t.x,
                  i = t.y,
                  o = t.width,
                  a = t.height,
                  l = t.bgcolor;
                n.save(),
                  n.beginPath(),
                  (n.fillStyle = l || "#fff"),
                  n.rect(Ee(r + 1), Ee(i + 1), xe(o - 2), xe(a - 2)),
                  n.clip(),
                  n.fill(),
                  e(),
                  n.restore();
              },
            },
          ]),
          t
        );
      })(),
      Te = [
        { key: "Arial", title: "Arial" },
        { key: "Helvetica", title: "Helvetica" },
        { key: "Source Sans Pro", title: "Source Sans Pro" },
        { key: "Comic Sans MS", title: "Comic Sans MS" },
        { key: "Courier New", title: "Courier New" },
        { key: "Verdana", title: "Verdana" },
        { key: "Lato", title: "Lato" },
      ],
      Pe = [
        { pt: 7.5, px: 10 },
        { pt: 8, px: 11 },
        { pt: 9, px: 12 },
        { pt: 10, px: 13 },
        { pt: 10.5, px: 14 },
        { pt: 11, px: 15 },
        { pt: 12, px: 16 },
        { pt: 14, px: 18.7 },
        { pt: 15, px: 20 },
        { pt: 16, px: 21.3 },
        { pt: 18, px: 24 },
        { pt: 22, px: 29.3 },
        { pt: 24, px: 32 },
        { pt: 26, px: 34.7 },
        { pt: 36, px: 48 },
        { pt: 42, px: 56 },
      ];
    function Ae(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    var Re = function (t) {
        for (
          var e = [], n = [], r = [], i = 0, o = "", a = 1, l = "", c = 0;
          c < t.length;
          c += 1
        ) {
          var s = t.charAt(c);
          if (" " !== s) {
            if (s >= "a" && s <= "z") r.push(s.toUpperCase());
            else if (
              (s >= "0" && s <= "9") ||
              (s >= "A" && s <= "Z") ||
              "." === s
            )
              r.push(s);
            else if ('"' === s) {
              for (c += 1; '"' !== t.charAt(c); ) r.push(t.charAt(c)), (c += 1);
              n.push('"'.concat(r.join(""))), (r = []);
            } else if ("-" === s && /[+\-*/,(]/.test(l)) r.push(s);
            else {
              if (
                ("(" !== s && r.length > 0 && n.push(r.join("")), ")" === s)
              ) {
                var u = e.pop();
                if (2 === i)
                  try {
                    for (
                      var p = Ae(f(n.pop()), 2),
                        d = p[0],
                        y = p[1],
                        v = Ae(f(n.pop()), 2),
                        b = v[0],
                        g = v[1],
                        m = 0,
                        w = b;
                      w <= d;
                      w += 1
                    )
                      for (var k = g; k <= y; k += 1) n.push(h(w, k)), (m += 1);
                    n.push([u, m]);
                  } catch (t) {}
                else if (1 === i || 3 === i)
                  3 === i && n.push(o), n.push([u, a]), (a = 1);
                else
                  for (; "(" !== u && (n.push(u), !(e.length <= 0)); )
                    u = e.pop();
                i = 0;
              } else if ("=" === s || ">" === s || "<" === s) {
                var O = t.charAt(c + 1);
                (o = s),
                  ("=" !== O && "-" !== O) || ((o += O), (c += 1)),
                  (i = 3);
              } else if (":" === s) i = 2;
              else if ("," === s) 3 === i && n.push(o), (i = 1), (a += 1);
              else if ("(" === s && r.length > 0) e.push(r.join(""));
              else {
                if (e.length > 0 && ("+" === s || "-" === s)) {
                  var S = e[e.length - 1];
                  if (("(" !== S && n.push(e.pop()), "*" === S || "/" === S))
                    for (; e.length > 0 && "(" !== (S = e[e.length - 1]); )
                      n.push(e.pop());
                } else if (e.length > 0) {
                  var x = e[e.length - 1];
                  ("*" !== x && "/" !== x) || n.push(e.pop());
                }
                e.push(s);
              }
              r = [];
            }
            l = s;
          }
        }
        for (r.length > 0 && n.push(r.join("")); e.length > 0; )
          n.push(e.pop());
        return n;
      },
      Ie = function (t, e) {
        var n = Ae(t, 1)[0],
          r = t;
        if ('"' === n) return t.substring(1);
        var i = 1;
        if (
          ("-" === n && ((r = t.substring(1)), (i = -1)),
          r[0] >= "0" && r[0] <= "9")
        )
          return i * Number(r);
        var o = Ae(f(r), 2);
        return i * e(o[0], o[1]);
      },
      De = function (t, e, n, r) {
        for (var i = [], o = 0; o < t.length; o += 1) {
          var a = t[o],
            l = a[0];
          if ("+" === a) {
            var c = i.pop();
            i.push(D("+", i.pop(), c));
          } else if ("-" === a)
            if (1 === i.length) {
              var s = i.pop();
              i.push(D("*", s, -1));
            } else {
              var u = i.pop();
              i.push(D("-", i.pop(), u));
            }
          else if ("*" === a) i.push(D("*", i.pop(), i.pop()));
          else if ("/" === a) {
            var f = i.pop();
            i.push(D("/", i.pop(), f));
          } else if ("=" === l || ">" === l || "<" === l) {
            var h = i.pop();
            Number.isNaN(h) || (h = Number(h));
            var p = i.pop();
            Number.isNaN(p) || (p = Number(p));
            var d = !1;
            "=" === l
              ? (d = p === h)
              : ">" === a
              ? (d = p > h)
              : ">=" === a
              ? (d = p >= h)
              : "<" === a
              ? (d = p < h)
              : "<=" === a && (d = p <= h),
              i.push(d);
          } else if (Array.isArray(a)) {
            for (
              var y = Ae(a, 2), v = y[0], b = y[1], g = [], m = 0;
              m < b;
              m += 1
            )
              g.push(i.pop());
            i.push(e[v].render(g.reverse()));
          } else {
            if (r.includes(a)) return 0;
            ((l >= "a" && l <= "z") || (l >= "A" && l <= "Z")) && r.push(a),
              i.push(Ie(a, n)),
              r.pop();
          }
        }
        return i[0];
      },
      ze = {
        render: function t(e, n, r) {
          var i =
            arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
          if ("=" === e[0]) {
            var o = Re(e.substring(1));
            return o.length <= 0
              ? e
              : De(
                  o,
                  n,
                  function (e, o) {
                    return t(r(e, o), n, r, i);
                  },
                  i
                );
          }
          return e;
        },
      };
    function He(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function Me(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    var Ne = [
        {
          key: "SUM",
          title: U("formula.sum"),
          render: function (t) {
            return t.reduce(function (t, e) {
              return D("+", t, e);
            }, 0);
          },
        },
        {
          key: "AVERAGE",
          title: U("formula.average"),
          render: function (t) {
            return (
              t.reduce(function (t, e) {
                return Number(t) + Number(e);
              }, 0) / t.length
            );
          },
        },
        {
          key: "MAX",
          title: U("formula.max"),
          render: function (t) {
            return Math.max.apply(
              Math,
              Me(
                t.map(function (t) {
                  return Number(t);
                })
              )
            );
          },
        },
        {
          key: "MIN",
          title: U("formula.min"),
          render: function (t) {
            return Math.min.apply(
              Math,
              Me(
                t.map(function (t) {
                  return Number(t);
                })
              )
            );
          },
        },
        {
          key: "IF",
          title: U("formula._if"),
          render: function (t) {
            var e = He(t, 3),
              n = e[0],
              r = e[1],
              i = e[2];
            return n ? r : i;
          },
        },
        {
          key: "AND",
          title: U("formula.and"),
          render: function (t) {
            return t.every(function (t) {
              return t;
            });
          },
        },
        {
          key: "OR",
          title: U("formula.or"),
          render: function (t) {
            return t.some(function (t) {
              return t;
            });
          },
        },
        {
          key: "CONCAT",
          title: U("formula.concat"),
          render: function (t) {
            return t.join("");
          },
        },
      ],
      Fe = Ne,
      We = {};
    function Ve(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        Be(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function qe(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        Be(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function Be(t) {
      if (
        Symbol.iterator in Object(t) ||
        "[object Arguments]" === Object.prototype.toString.call(t)
      )
        return Array.from(t);
    }
    Ne.forEach(function (t) {
      We[t.key] = t;
    });
    var Le = function (t) {
        return t;
      },
      Ue = function (t) {
        if (/^(-?\d*.?\d*)$/.test(t)) {
          var e = qe(Number(t).toFixed(2).toString().split("\\.")),
            n = e[0],
            r = e.slice(1);
          return [n.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")].concat(Ve(r));
        }
        return t;
      },
      Ye = [
        {
          key: "normal",
          title: U("format.normal"),
          type: "string",
          render: Le,
        },
        { key: "text", title: U("format.text"), type: "string", render: Le },
        {
          key: "number",
          title: U("format.number"),
          type: "number",
          label: "1,000.12",
          render: Ue,
        },
        {
          key: "percent",
          title: U("format.percent"),
          type: "number",
          label: "10.12%",
          render: function (t) {
            return "".concat(t, "%");
          },
        },
        {
          key: "rmb",
          title: U("format.rmb"),
          type: "number",
          label: "￥10.00",
          render: function (t) {
            return "￥".concat(Ue(t));
          },
        },
        {
          key: "usd",
          title: U("format.usd"),
          type: "number",
          label: "$10.00",
          render: function (t) {
            return "$".concat(Ue(t));
          },
        },
        {
          key: "eur",
          title: U("format.eur"),
          type: "number",
          label: "€10.00",
          render: function (t) {
            return "€".concat(Ue(t));
          },
        },
        {
          key: "date",
          title: U("format.date"),
          type: "date",
          label: "26/09/2008",
          render: Le,
        },
        {
          key: "time",
          title: U("format.time"),
          type: "date",
          label: "15:59:00",
          render: Le,
        },
        {
          key: "datetime",
          title: U("format.datetime"),
          type: "date",
          label: "26/09/2008 15:59:00",
          render: Le,
        },
        {
          key: "duration",
          title: U("format.duration"),
          type: "date",
          label: "24:01:00",
          render: Le,
        },
      ],
      $e = {};
    function Xe(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function Ze(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    Ye.forEach(function (t) {
      $e[t.key] = t;
    });
    var Ke = 5,
      Je = { fillStyle: "#f4f5f8" },
      Ge = { fillStyle: "#fff", lineWidth: Se, strokeStyle: "#e6e6e6" };
    function Qe(t, e, n) {
      var r =
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
        i = t.cellRect(e, n),
        o = i.left,
        a = i.top,
        l = i.width,
        c = i.height;
      return new je(o, a + r, l, c, Ke);
    }
    function tn(t, e, n, r) {
      var i =
          arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
        o = e.sortedRowMap,
        a = e.rows,
        l = e.cols;
      if (!a.isHide(n) && !l.isHide(r)) {
        var c = n;
        o.has(n) && (c = o.get(n));
        var s = e.getCell(c, r);
        if (null !== s) {
          var u = !1;
          "editable" in s && !1 === s.editable && (u = !0);
          var f = e.getCellStyleOrDefault(c, r),
            h = Qe(e, n, r, i);
          (h.bgcolor = f.bgcolor),
            void 0 !== f.border && (h.setBorders(f.border), t.strokeBorders(h)),
            t.rect(h, function () {
              var i = "";
              (i = e.settings.evalPaused
                ? s.text || ""
                : ze.render(s.text || "", We, function (t, n) {
                    return e.getCellTextOrDefault(n, t);
                  })),
                f.format && (i = $e[f.format].render(i));
              var o = Object.assign({}, f.font);
              (o.size = (function (t) {
                for (var e = 0; e < Pe.length; e += 1) {
                  var n = Pe[e];
                  if (n.pt === t) return n.px;
                }
                return t;
              })(o.size)),
                t.text(
                  i,
                  h,
                  {
                    align: f.align,
                    valign: f.valign,
                    font: o,
                    color: f.color,
                    strike: f.strike,
                    underline: f.underline,
                  },
                  f.textwrap
                ),
                e.validations.getError(n, r) && t.error(h),
                u && t.frozen(h);
            });
        }
      }
    }
    function en(t, e, n, r, i) {
      var o = this.draw,
        a = this.data;
      o.save(), o.translate(e, n).translate(r, i);
      var l = a.exceptRowSet,
        c = a.exceptRowTotalHeight(t.sri, t.eri);
      o.save(),
        o.translate(0, -c),
        t.each(
          function (t, e) {
            tn(o, a, t, e);
          },
          function (t) {
            return (function (t) {
              var e = l.has(t);
              if (e) {
                var n = a.rows.getHeight(t);
                o.translate(0, -n);
              }
              return !e;
            })(t);
          }
        ),
        o.restore();
      var s = new Set();
      o.save(),
        o.translate(0, -c),
        a.eachMergesInView(t, function (t) {
          var e = t.sri,
            n = t.sci,
            r = t.eri;
          if (l.has(e)) {
            if (!s.has(e)) {
              s.add(e);
              var i = a.rows.sumHeight(e, r + 1);
              o.translate(0, -i);
            }
          } else tn(o, a, e, n);
        }),
        o.restore(),
        function (t) {
          var e = this.data,
            n = this.draw;
          if (t) {
            var r = e.autoFilter;
            if (!r.active()) return;
            var i = r.hrange();
            t.intersects(i) &&
              i.each(function (t, r) {
                var i = Qe(e, t, r);
                n.dropdown(i);
              });
          }
        }.call(this, t),
        o.restore();
    }
    function nn(t, e, n, r) {
      var i = this.draw;
      i.save(),
        i.attr({ fillStyle: "rgba(75, 137, 255, 0.08)" }).fillRect(t, e, n, r),
        i.restore();
    }
    function rn(t, e, n, r, i, o) {
      var a = this,
        l = this.draw,
        c = this.data,
        u = e.h,
        f = e.w,
        h = o + r,
        p = i + n;
      l.save(),
        l.attr(Je),
        ("all" !== t && "left" !== t) || l.fillRect(0, h, n, u),
        ("all" !== t && "top" !== t) || l.fillRect(p, 0, f, r);
      var d = c.selector.range,
        y = d.sri,
        v = d.sci,
        b = d.eri,
        g = d.eci;
      l.attr({
        textAlign: "center",
        textBaseline: "middle",
        font: "500 ".concat(xe(12), "px Source Sans Pro"),
        fillStyle: "#585757",
        lineWidth: Se(),
        strokeStyle: "#e6e6e6",
      }),
        ("all" !== t && "left" !== t) ||
          (c.rowEach(e.sri, e.eri, function (t, e, r) {
            var i = h + e,
              o = t;
            l.line([0, i], [n, i]),
              y <= o && o < b + 1 && nn.call(a, 0, i, n, r),
              l.fillText(o + 1, n / 2, i + r / 2),
              t > 0 &&
                c.rows.isHide(t - 1) &&
                (l.save(),
                l.attr({ strokeStyle: "#c6c6c6" }),
                l.line([5, i + 5], [n - 5, i + 5]),
                l.restore());
          }),
          l.line([0, u + h], [n, u + h]),
          l.line([n, h], [n, u + h])),
        ("all" !== t && "top" !== t) ||
          (c.colEach(e.sci, e.eci, function (t, e, n) {
            var i = p + e,
              o = t;
            l.line([i, 0], [i, r]),
              v <= o && o < g + 1 && nn.call(a, i, 0, n, r),
              l.fillText(s(o), i + n / 2, r / 2),
              t > 0 &&
                c.cols.isHide(t - 1) &&
                (l.save(),
                l.attr({ strokeStyle: "#c6c6c6" }),
                l.line([i + 5, 5], [i + 5, r - 5]),
                l.restore());
          }),
          l.line([f + p, 0], [f + p, r]),
          l.line([0, r], [f + p, r])),
        l.restore();
    }
    function on(t, e, n, r, i) {
      var o = t.sri,
        a = t.sci,
        l = t.eri,
        c = t.eci,
        s = t.w,
        u = t.h,
        f = this.draw,
        h = this.data,
        p = h.settings;
      f.save(),
        f.attr(Ge).translate(e + r, n + i),
        p.showGrid
          ? (h.rowEach(o, l, function (t, e, n) {
              t !== o && f.line([0, e], [s, e]),
                t === l && f.line([0, e + n], [s, e + n]);
            }),
            h.colEach(a, c, function (t, e, n) {
              t !== a && f.line([e, 0], [e, u]),
                t === c && f.line([e + n, 0], [e + n, u]);
            }),
            f.restore())
          : f.restore();
    }
    var an = (function () {
      function t(e, n) {
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.el = e),
          (this.draw = new Ce(e, n.viewWidth(), n.viewHeight())),
          (this.data = n);
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "resetData",
            value: function (t) {
              (this.data = t), this.render();
            },
          },
          {
            key: "render",
            value: function () {
              var t = this.data,
                e = t.rows,
                n = t.cols.indexWidth,
                r = e.height;
              this.draw.resize(t.viewWidth(), t.viewHeight()), this.clear();
              var i = t.viewRange(),
                o = t.freezeTotalWidth(),
                a = t.freezeTotalHeight(),
                l = t.scroll,
                c = l.x,
                s = l.y;
              on.call(this, i, n, r, o, a),
                en.call(this, i, n, r, -c, -s),
                rn.call(this, "all", i, n, r, o, a),
                function (t, e) {
                  var n = this.draw;
                  n.save(),
                    n.attr({ fillStyle: "#f4f5f8" }).fillRect(0, 0, t, e),
                    n.restore();
                }.call(this, n, r);
              var u = Xe(t.freeze, 2),
                f = u[0],
                h = u[1];
              if (f > 0 || h > 0) {
                if (f > 0) {
                  var p = i.clone();
                  (p.sri = 0),
                    (p.eri = f - 1),
                    (p.h = a),
                    on.call(this, p, n, r, o, 0),
                    en.call(this, p, n, r, -c, 0),
                    rn.call(this, "top", p, n, r, o, 0);
                }
                if (h > 0) {
                  var d = i.clone();
                  (d.sci = 0),
                    (d.eci = h - 1),
                    (d.w = o),
                    on.call(this, d, n, r, 0, a),
                    rn.call(this, "left", d, n, r, 0, a),
                    en.call(this, d, n, r, 0, -s);
                }
                var y = t.freezeViewRange();
                on.call(this, y, n, r, 0, 0),
                  rn.call(this, "all", y, n, r, 0, 0),
                  en.call(this, y, n, r, 0, 0),
                  function (t, e, n, r) {
                    var i = this.draw,
                      o = this.data,
                      a = o.viewWidth() - t,
                      l = o.viewHeight() - e;
                    i
                      .save()
                      .translate(t, e)
                      .attr({ strokeStyle: "rgba(75, 137, 255, .6)" }),
                      i.line([0, r], [a, r]),
                      i.line([n, 0], [n, l]),
                      i.restore();
                  }.call(this, n, r, o, a);
              }
            },
          },
          {
            key: "clear",
            value: function () {
              this.draw.clear();
            },
          },
        ]) && Ze(e.prototype, n),
        r && Ze(e, r),
        t
      );
    })();
    function ln(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function cn(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var sn = [
        ["A3", 11.69, 16.54],
        ["A4", 8.27, 11.69],
        ["A5", 5.83, 8.27],
        ["B4", 9.84, 13.9],
        ["B5", 6.93, 9.84],
      ],
      un = ["landscape", "portrait"];
    function fn(t) {
      return parseInt(96 * t, 10);
    }
    function hn(t) {
      "cancel" === t ? this.el.hide() : this.toPrint();
    }
    var pn = (function () {
      function t(e) {
        var n, r;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.paper = {
            w: fn(sn[0][1]),
            h: fn(sn[0][2]),
            padding: 50,
            orientation: un[0],
            get width() {
              return "landscape" === this.orientation ? this.h : this.w;
            },
            get height() {
              return "landscape" === this.orientation ? this.w : this.h;
            },
          }),
          (this.data = e),
          (this.el = a("div", "".concat(kt, "-print"))
            .children(
              a("div", "".concat(kt, "-print-bar")).children(
                a("div", "-title").child("Print settings"),
                a("div", "-right").children(
                  a("div", "".concat(kt, "-buttons")).children(
                    new ve("cancel").on("click", hn.bind(this, "cancel")),
                    new ve("next", "primary").on("click", hn.bind(this, "next"))
                  )
                )
              ),
              a("div", "".concat(kt, "-print-content")).children(
                (this.contentEl = a("div", "-content")),
                a("div", "-sider").child(
                  a("form", "").children(
                    a("fieldset", "").children(
                      a("label", "").child("".concat(L("print.size"))),
                      (n = a("select", "")).children
                        .apply(
                          n,
                          ln(
                            sn.map(function (t, e) {
                              return a("option", "")
                                .attr("value", e)
                                .child(
                                  ""
                                    .concat(t[0], " ( ")
                                    .concat(t[1], "''x")
                                    .concat(t[2], "'' )")
                                );
                            })
                          )
                        )
                        .on(
                          "change",
                          function (t) {
                            var e = this.paper,
                              n = t.target.value,
                              r = sn[n];
                            (e.w = fn(r[1])), (e.h = fn(r[2])), this.preview();
                          }.bind(this)
                        )
                    ),
                    a("fieldset", "").children(
                      a("label", "").child("".concat(L("print.orientation"))),
                      (r = a("select", "")).children
                        .apply(
                          r,
                          ln(
                            un.map(function (t, e) {
                              return a("option", "")
                                .attr("value", e)
                                .child("".concat(L("print.orientations")[e]));
                            })
                          )
                        )
                        .on(
                          "change",
                          function (t) {
                            var e = this.paper,
                              n = t.target.value,
                              r = un[n];
                            (e.orientation = r), this.preview();
                          }.bind(this)
                        )
                    )
                  )
                )
              )
            )
            .hide());
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "resetData",
            value: function (t) {
              this.data = t;
            },
          },
          {
            key: "preview",
            value: function () {
              var t = this,
                e = this.data,
                n = this.paper,
                r = n.width,
                i = n.height,
                o = n.padding,
                l = r - 2 * o,
                c = i - 2 * o,
                s = e.contentRange(),
                u = parseInt(s.h / c, 10) + 1,
                f = l / s.w,
                h = o,
                p = o;
              f > 1 && (h += (l - s.w) / 2);
              var d = 0,
                y = 0;
              this.contentEl.html(""), (this.canvases = []);
              for (
                var v = { sri: 0, sci: 0, eri: 0, eci: 0 },
                  b = function (n) {
                    var o = 0,
                      l = 0,
                      u = a("div", "".concat(kt, "-canvas-card")),
                      b = a("canvas", "".concat(kt, "-canvas"));
                    t.canvases.push(b.el);
                    var g = new Ce(b.el, r, i);
                    for (
                      g.save(), g.translate(h, p), f < 1 && g.scale(f, f);
                      d <= s.eri;
                      d += 1
                    ) {
                      var m = e.rows.getHeight(d);
                      if (!((o += m) < c)) {
                        l = -(o - m);
                        break;
                      }
                      for (var w = 0; w <= s.eci; w += 1)
                        tn(g, e, d, w, y), (v.eci = w);
                    }
                    (v.eri = d),
                      g.restore(),
                      g.save(),
                      g.translate(h, p),
                      f < 1 && g.scale(f, f);
                    var k = y;
                    e.eachMergesInView(v, function (t) {
                      var n = t.sri,
                        r = t.sci;
                      tn(g, e, n, r, k);
                    }),
                      g.restore(),
                      (v.sri = v.eri),
                      (v.sci = v.eci),
                      (y += l),
                      t.contentEl.child(
                        a("div", "".concat(kt, "-canvas-card-wraper")).child(
                          u.child(b)
                        )
                      );
                  },
                  g = 0;
                g < u;
                g += 1
              )
                b();
              this.el.show();
            },
          },
          {
            key: "toPrint",
            value: function () {
              this.el.hide();
              var t = this.paper,
                e = a("iframe", "").hide().el;
              window.document.body.appendChild(e);
              var n = e.contentWindow,
                r = n.document,
                i = document.createElement("style");
              (i.innerHTML = "\n      @page { size: "
                .concat(t.width, "px ")
                .concat(
                  t.height,
                  "px; };\n      canvas {\n        page-break-before: auto;        \n        page-break-after: always;\n        image-rendering: pixelated;\n      };\n    "
                )),
                r.head.appendChild(i),
                this.canvases.forEach(function (t) {
                  var e = t.cloneNode(!1);
                  e.getContext("2d").drawImage(t, 0, 0), r.body.appendChild(e);
                }),
                n.print();
            },
          },
        ]) && cn(e.prototype, n),
        r && cn(e, r),
        t
      );
    })();
    function dn(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function yn(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var vn = [
      { key: "copy", title: U("contextmenu.copy"), label: "Ctrl+C" },
      { key: "cut", title: U("contextmenu.cut"), label: "Ctrl+X" },
      { key: "paste", title: U("contextmenu.paste"), label: "Ctrl+V" },
      {
        key: "paste-value",
        title: U("contextmenu.pasteValue"),
        label: "Ctrl+Shift+V",
      },
      {
        key: "paste-format",
        title: U("contextmenu.pasteFormat"),
        label: "Ctrl+Alt+V",
      },
      { key: "divider" },
      { key: "insert-row", title: U("contextmenu.insertRow") },
      { key: "insert-column", title: U("contextmenu.insertColumn") },
      { key: "divider" },
      { key: "delete-row", title: U("contextmenu.deleteRow") },
      { key: "delete-column", title: U("contextmenu.deleteColumn") },
      { key: "delete-cell-text", title: U("contextmenu.deleteCellText") },
      { key: "hide", title: U("contextmenu.hide") },
      { key: "divider" },
      { key: "validation", title: U("contextmenu.validation") },
      { key: "divider" },
      { key: "cell-printable", title: U("contextmenu.cellprintable") },
      { key: "cell-non-printable", title: U("contextmenu.cellnonprintable") },
      { key: "divider" },
      { key: "cell-editable", title: U("contextmenu.celleditable") },
      { key: "cell-non-editable", title: U("contextmenu.cellnoneditable") },
    ];
    function bn() {
      var t = this;
      return vn.map(function (e) {
        return function (t) {
          var e = this;
          return "divider" === t.key
            ? a("div", "".concat(kt, "-item divider"))
            : a("div", "".concat(kt, "-item"))
                .on("click", function () {
                  e.itemClick(t.key), e.hide();
                })
                .children(t.title(), a("div", "label").child(t.label || ""));
        }.call(t, e);
      });
    }
    var gn = (function () {
      function t(e) {
        var n,
          r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.menuItems = bn.call(this)),
          (this.el = (n = a("div", "".concat(kt, "-contextmenu"))).children
            .apply(n, dn(this.menuItems))
            .hide()),
          (this.viewFn = e),
          (this.itemClick = function () {}),
          (this.isHide = r),
          this.setMode("range");
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "setMode",
            value: function (t) {
              var e = this.menuItems[12];
              "row-col" === t ? e.show() : e.hide();
            },
          },
          {
            key: "hide",
            value: function () {
              var t = this.el;
              t.hide(), bt(t);
            },
          },
          {
            key: "setPosition",
            value: function (t, e) {
              if (!this.isHide) {
                var n = this.el,
                  r = n.show().offset().width,
                  i = this.viewFn(),
                  o = i.height / 2,
                  a = t;
                i.width - t <= r && (a -= r),
                  n.css("left", "".concat(a, "px")),
                  e > o
                    ? n
                        .css("bottom", "".concat(i.height - e, "px"))
                        .css("max-height", "".concat(e, "px"))
                        .css("top", "auto")
                    : n
                        .css("top", "".concat(e, "px"))
                        .css("max-height", "".concat(i.height - e, "px"))
                        .css("bottom", "auto"),
                  gt(n);
              }
            },
          },
        ]) && yn(e.prototype, n),
        r && yn(e, r),
        t
      );
    })();
    function mn(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var wn = (function () {
      function t(e, n, r) {
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.tip = L(
            "toolbar.".concat(
              e.replace(/-[a-z]/g, function (t) {
                return t[1].toUpperCase();
              })
            )
          )),
          n && (this.tip += " (".concat(n, ")")),
          (this.tag = e),
          (this.shortcut = n),
          (this.value = r),
          (this.el = this.element()),
          (this.change = function () {});
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "element",
            value: function () {
              var t = this.tip;
              return a("div", "".concat(kt, "-toolbar-btn"))
                .on("mouseenter", function (e) {
                  !(function (t, e) {
                    if (!e.classList.contains("active")) {
                      var n = e.getBoundingClientRect(),
                        r = n.left,
                        i = n.top,
                        o = n.width,
                        l = n.height,
                        c = a("div", "".concat(kt, "-tooltip")).html(t).show();
                      document.body.appendChild(c.el);
                      var s = c.box();
                      c
                        .css("left", "".concat(r + o / 2 - s.width / 2, "px"))
                        .css("top", "".concat(i + l + 2, "px")),
                        yt(e, "mouseleave", function () {
                          document.body.contains(c.el) &&
                            document.body.removeChild(c.el);
                        }),
                        yt(e, "click", function () {
                          document.body.contains(c.el) &&
                            document.body.removeChild(c.el);
                        });
                    }
                  })(t, e.target);
                })
                .attr("data-tooltip", t);
            },
          },
          { key: "setState", value: function () {} },
        ]) && mn(e.prototype, n),
        r && mn(e, r),
        t
      );
    })();
    function kn(t) {
      return (kn =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function On(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Sn(t, e) {
      return !e || ("object" !== kn(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function xn(t, e, n) {
      return (xn =
        "undefined" != typeof Reflect && Reflect.get
          ? Reflect.get
          : function (t, e, n) {
              var r = (function (t, e) {
                for (
                  ;
                  !Object.prototype.hasOwnProperty.call(t, e) &&
                  null !== (t = En(t));

                );
                return t;
              })(t, e);
              if (r) {
                var i = Object.getOwnPropertyDescriptor(r, e);
                return i.get ? i.get.call(n) : i.value;
              }
            })(t, e, n || t);
    }
    function En(t) {
      return (En = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function jn(t, e) {
      return (jn =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var _n = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          Sn(this, En(e).apply(this, arguments))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && jn(t, e);
        })(e, wn),
        (n = e),
        (r = [
          { key: "dropdown", value: function () {} },
          {
            key: "getValue",
            value: function (t) {
              return t;
            },
          },
          {
            key: "element",
            value: function () {
              var t = this,
                n = this.tag;
              return (
                (this.dd = this.dropdown()),
                (this.dd.change = function (e) {
                  return t.change(n, t.getValue(e));
                }),
                xn(En(e.prototype), "element", this).call(this).child(this.dd)
              );
            },
          },
          {
            key: "setState",
            value: function (t) {
              t && ((this.value = t), this.dd.setTitle(t));
            },
          },
        ]) && On(n.prototype, r),
        i && On(n, i),
        e
      );
    })();
    function Cn(t) {
      return (Cn =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Tn(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Pn(t, e) {
      return !e || ("object" !== Cn(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function An(t) {
      return (An = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Rn(t, e) {
      return (Rn =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var In = (function (t) {
      function e(t, n, r, i) {
        var o, l;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          ((l = Pn(
            this,
            An(e).call(this, "div", "".concat(kt, "-dropdown ").concat(i))
          )).title = t),
          (l.change = function () {}),
          (l.headerClick = function () {}),
          "string" == typeof t
            ? (l.title = a("div", "".concat(kt, "-dropdown-title")).child(t))
            : r && l.title.addClass("arrow-left"),
          (l.contentEl = a("div", "".concat(kt, "-dropdown-content"))
            .css("width", n)
            .hide());
        for (
          var c = arguments.length, s = new Array(c > 4 ? c - 4 : 0), u = 4;
          u < c;
          u++
        )
          s[u - 4] = arguments[u];
        return (
          (o = l).setContentChildren.apply(o, s),
          (l.headerEl = a("div", "".concat(kt, "-dropdown-header"))),
          l.headerEl
            .on("click", function () {
              "block" !== l.contentEl.css("display") ? l.show() : l.hide();
            })
            .children(
              l.title,
              r
                ? a("div", "".concat(kt, "-icon arrow-right")).child(
                    a("div", "".concat(kt, "-icon-img arrow-down"))
                  )
                : ""
            ),
          l.children(l.headerEl, l.contentEl),
          l
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Rn(t, e);
        })(e, o),
        (n = e),
        (r = [
          {
            key: "setContentChildren",
            value: function () {
              var t;
              (this.contentEl.html(""), arguments.length > 0) &&
                (t = this.contentEl).children.apply(t, arguments);
            },
          },
          {
            key: "setTitle",
            value: function (t) {
              this.title.html(t), this.hide();
            },
          },
          {
            key: "show",
            value: function () {
              var t = this;
              this.contentEl.show(),
                this.parent().active(),
                gt(this.parent(), function () {
                  t.hide();
                });
            },
          },
          {
            key: "hide",
            value: function () {
              this.parent().active(!1),
                this.contentEl.hide(),
                bt(this.parent());
            },
          },
        ]) && Tn(n.prototype, r),
        i && Tn(n, i),
        e
      );
    })();
    function Dn(t) {
      return (Dn =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function zn(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function Hn(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Mn(t, e) {
      return !e || ("object" !== Dn(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Nn(t) {
      return (Nn = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Fn(t, e) {
      return (Fn =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Wn = (function (t) {
      function e(t, n) {
        var r, i;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
        var o = new Gt("align-".concat(n)),
          l = t.map(function (t) {
            return ((e = "align-".concat(t)),
            a("div", "".concat(kt, "-item")).child(new Gt(e))).on(
              "click",
              function () {
                i.setTitle(t), i.change(t);
              }
            );
            var e;
          });
        return (i = Mn(
          this,
          (r = Nn(e)).call.apply(
            r,
            [this, o, "auto", !0, "bottom-left"].concat(zn(l))
          )
        ));
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Fn(t, e);
        })(e, In),
        (n = e),
        (r = [
          {
            key: "setTitle",
            value: function (t) {
              this.title.setName("align-".concat(t)), this.hide();
            },
          },
        ]) && Hn(n.prototype, r),
        i && Hn(n, i),
        e
      );
    })();
    function Vn(t) {
      return (Vn =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function qn(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Bn(t, e) {
      return !e || ("object" !== Vn(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Ln(t) {
      return (Ln = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Un(t, e) {
      return (Un =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Yn = (function (t) {
      function e(t) {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          Bn(this, Ln(e).call(this, "align", "", t))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Un(t, e);
        })(e, _n),
        (n = e),
        (r = [
          {
            key: "dropdown",
            value: function () {
              var t = this.value;
              return new Wn(["left", "center", "right"], t);
            },
          },
        ]) && qn(n.prototype, r),
        i && qn(n, i),
        e
      );
    })();
    function $n(t) {
      return ($n =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Xn(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Zn(t, e) {
      return !e || ("object" !== $n(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Kn(t) {
      return (Kn = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Jn(t, e) {
      return (Jn =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Gn = (function (t) {
      function e(t) {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          Zn(this, Kn(e).call(this, "valign", "", t))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Jn(t, e);
        })(e, _n),
        (n = e),
        (r = [
          {
            key: "dropdown",
            value: function () {
              var t = this.value;
              return new Wn(["top", "middle", "bottom"], t);
            },
          },
        ]) && Xn(n.prototype, r),
        i && Xn(n, i),
        e
      );
    })();
    function Qn(t) {
      return (Qn =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function tr(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function er(t, e) {
      return !e || ("object" !== Qn(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function nr(t, e, n) {
      return (nr =
        "undefined" != typeof Reflect && Reflect.get
          ? Reflect.get
          : function (t, e, n) {
              var r = (function (t, e) {
                for (
                  ;
                  !Object.prototype.hasOwnProperty.call(t, e) &&
                  null !== (t = rr(t));

                );
                return t;
              })(t, e);
              if (r) {
                var i = Object.getOwnPropertyDescriptor(r, e);
                return i.get ? i.get.call(n) : i.value;
              }
            })(t, e, n || t);
    }
    function rr(t) {
      return (rr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function ir(t, e) {
      return (ir =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var or = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          er(this, rr(e).apply(this, arguments))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && ir(t, e);
        })(e, wn),
        (n = e),
        (r = [
          {
            key: "element",
            value: function () {
              var t = this,
                n = this.tag;
              return nr(rr(e.prototype), "element", this)
                .call(this)
                .child(new Gt(n))
                .on("click", function () {
                  return t.click();
                });
            },
          },
          {
            key: "click",
            value: function () {
              this.change(this.tag, this.toggle());
            },
          },
          {
            key: "setState",
            value: function (t) {
              this.el.active(t);
            },
          },
          {
            key: "toggle",
            value: function () {
              return this.el.toggle();
            },
          },
          {
            key: "active",
            value: function () {
              return this.el.hasClass("active");
            },
          },
        ]) && tr(n.prototype, r),
        i && tr(n, i),
        e
      );
    })();
    function ar(t) {
      return (ar =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function lr(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function cr(t, e) {
      return !e || ("object" !== ar(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function sr(t) {
      return (sr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function ur(t, e) {
      return (ur =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var fr = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          cr(this, sr(e).call(this, "autofilter"))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && ur(t, e);
        })(e, or),
        (n = e),
        (r = [{ key: "setState", value: function () {} }]) &&
          lr(n.prototype, r),
        i && lr(n, i),
        e
      );
    })();
    function hr(t) {
      return (hr =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function pr(t, e) {
      return !e || ("object" !== hr(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function dr(t) {
      return (dr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function yr(t, e) {
      return (yr =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var vr = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          pr(this, dr(e).call(this, "font-bold", "Ctrl+B"))
        );
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && yr(t, e);
        })(e, or),
        e
      );
    })();
    function br(t) {
      return (br =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function gr(t, e) {
      return !e || ("object" !== br(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function mr(t) {
      return (mr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function wr(t, e) {
      return (wr =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var kr = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          gr(this, mr(e).call(this, "font-italic", "Ctrl+I"))
        );
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && wr(t, e);
        })(e, or),
        e
      );
    })();
    function Or(t) {
      return (Or =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Sr(t, e) {
      return !e || ("object" !== Or(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function xr(t) {
      return (xr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Er(t, e) {
      return (Er =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var jr = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          Sr(this, xr(e).call(this, "strike", "Ctrl+U"))
        );
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Er(t, e);
        })(e, or),
        e
      );
    })();
    function _r(t) {
      return (_r =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Cr(t, e) {
      return !e || ("object" !== _r(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Tr(t) {
      return (Tr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Pr(t, e) {
      return (Pr =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Ar = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          Cr(this, Tr(e).call(this, "underline", "Ctrl+U"))
        );
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Pr(t, e);
        })(e, or),
        e
      );
    })();
    function Rr(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    var Ir = [
        "#ffffff",
        "#000100",
        "#e7e5e6",
        "#445569",
        "#5b9cd6",
        "#ed7d31",
        "#a5a5a5",
        "#ffc001",
        "#4371c6",
        "#71ae47",
      ],
      Dr = [
        [
          "#f2f2f2",
          "#7f7f7f",
          "#d0cecf",
          "#d5dce4",
          "#deeaf6",
          "#fce5d5",
          "#ededed",
          "#fff2cd",
          "#d9e2f3",
          "#e3efd9",
        ],
        [
          "#d8d8d8",
          "#595959",
          "#afabac",
          "#adb8ca",
          "#bdd7ee",
          "#f7ccac",
          "#dbdbdb",
          "#ffe59a",
          "#b3c6e7",
          "#c5e0b3",
        ],
        [
          "#bfbfbf",
          "#3f3f3f",
          "#756f6f",
          "#8596b0",
          "#9cc2e6",
          "#f4b184",
          "#c9c9c9",
          "#fed964",
          "#8eaada",
          "#a7d08c",
        ],
        [
          "#a5a5a5",
          "#262626",
          "#3a3839",
          "#333f4f",
          "#2e75b5",
          "#c45a10",
          "#7b7b7b",
          "#bf8e01",
          "#2f5596",
          "#538136",
        ],
        [
          "#7f7f7f",
          "#0c0c0c",
          "#171516",
          "#222a35",
          "#1f4e7a",
          "#843c0a",
          "#525252",
          "#7e6000",
          "#203864",
          "#365624",
        ],
      ],
      zr = [
        "#c00000",
        "#fe0000",
        "#fdc101",
        "#ffff01",
        "#93d051",
        "#00b04e",
        "#01b0f1",
        "#0170c1",
        "#012060",
        "#7030a0",
      ];
    function Hr(t) {
      var e = this;
      return a("td", "").child(
        a("div", "".concat(kt, "-color-palette-cell"))
          .on("click.stop", function () {
            return e.change(t);
          })
          .css("background-color", t)
      );
    }
    var Mr = function t() {
      var e,
        n,
        r,
        i = this;
      !(function (t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      })(this, t),
        (this.el = a("div", "".concat(kt, "-color-palette"))),
        (this.change = function () {});
      var o = a("table", "").children(
        (e = a("tbody", "")).children.apply(
          e,
          [
            (n = a(
              "tr",
              "".concat(kt, "-theme-color-placeholders")
            )).children.apply(
              n,
              Rr(
                Ir.map(function (t) {
                  return Hr.call(i, t);
                })
              )
            ),
          ].concat(
            Rr(
              Dr.map(function (t) {
                var e;
                return (e = a(
                  "tr",
                  "".concat(kt, "-theme-colors")
                )).children.apply(
                  e,
                  Rr(
                    t.map(function (t) {
                      return Hr.call(i, t);
                    })
                  )
                );
              })
            ),
            [
              (r = a("tr", "".concat(kt, "-standard-colors"))).children.apply(
                r,
                Rr(
                  zr.map(function (t) {
                    return Hr.call(i, t);
                  })
                )
              ),
            ]
          )
        )
      );
      this.el.child(o);
    };
    function Nr(t) {
      return (Nr =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Fr(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Wr(t, e) {
      return !e || ("object" !== Nr(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Vr(t) {
      return (Vr = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function qr(t, e) {
      return (qr =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Br = (function (t) {
      function e(t, n) {
        var r;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
        var i = new Gt(t)
            .css("height", "16px")
            .css("border-bottom", "3px solid ".concat(n)),
          o = new Mr();
        return (
          (o.change = function (t) {
            r.setTitle(t), r.change(t);
          }),
          (r = Wr(this, Vr(e).call(this, i, "auto", !1, "bottom-left", o.el)))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && qr(t, e);
        })(e, In),
        (n = e),
        (r = [
          {
            key: "setTitle",
            value: function (t) {
              this.title.css("border-color", t), this.hide();
            },
          },
        ]) && Fr(n.prototype, r),
        i && Fr(n, i),
        e
      );
    })();
    function Lr(t) {
      return (Lr =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Ur(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function Yr(t, e) {
      return !e || ("object" !== Lr(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function $r(t) {
      return ($r = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Xr(t, e) {
      return (Xr =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Zr = [
        [
          "thin",
          '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" style="user-select: none;"></line></svg>',
        ],
        [
          "medium",
          '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="2" style="user-select: none;"><line x1="0" y1="1.0" x2="50" y2="1.0" stroke-width="2" stroke="black" style="user-select: none;"></line></svg>',
        ],
        [
          "thick",
          '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="3" style="user-select: none;"><line x1="0" y1="1.5" x2="50" y2="1.5" stroke-width="3" stroke="black" style="user-select: none;"></line></svg>',
        ],
        [
          "dashed",
          '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="2" style="user-select: none;"></line></svg>',
        ],
        [
          "dotted",
          '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="1" style="user-select: none;"></line></svg>',
        ],
      ],
      Kr = (function (t) {
        function e(t) {
          var n, r;
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e);
          var i = new Gt("line-type"),
            o = 0,
            l = Zr.map(function (e, n) {
              return a(
                "div",
                ""
                  .concat(kt, "-item state ")
                  .concat(t === e[0] ? "checked" : "")
              )
                .on("click", function () {
                  l[o].toggle("checked"),
                    l[n].toggle("checked"),
                    (o = n),
                    r.hide(),
                    r.change(e);
                })
                .child(a("div", "".concat(kt, "-line-type")).html(e[1]));
            });
          return (r = Yr(
            this,
            (n = $r(e)).call.apply(
              n,
              [this, i, "auto", !1, "bottom-left"].concat(Ur(l))
            )
          ));
        }
        return (
          (function (t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && Xr(t, e);
          })(e, In),
          e
        );
      })();
    function Jr(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function Gr(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function Qr() {
      var t;
      return a("table", "").child(
        (t = a("tbody", "")).children.apply(t, arguments)
      );
    }
    function ti(t) {
      var e = this;
      return a("td", "").child(
        a("div", "".concat(kt, "-border-palette-cell"))
          .child(new Gt("border-".concat(t)))
          .on("click", function () {
            e.mode = t;
            var n = e.mode,
              r = e.style,
              i = e.color;
            e.change({ mode: n, style: r, color: i });
          })
      );
    }
    var ei = function t() {
      var e,
        n,
        r = this;
      !(function (t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      })(this, t),
        (this.color = "#000"),
        (this.style = "thin"),
        (this.mode = "all"),
        (this.change = function () {}),
        (this.ddColor = new Br("line-color", this.color)),
        (this.ddColor.change = function (t) {
          r.color = t;
        }),
        (this.ddType = new Kr(this.style)),
        (this.ddType.change = function (t) {
          var e = Gr(t, 1)[0];
          r.style = e;
        }),
        (this.el = a("div", "".concat(kt, "-border-palette")));
      var i = Qr(
        a("tr", "").children(
          a("td", "".concat(kt, "-border-palette-left")).child(
            Qr(
              (e = a("tr", "")).children.apply(
                e,
                Jr(
                  ["all", "inside", "horizontal", "vertical", "outside"].map(
                    function (t) {
                      return ti.call(r, t);
                    }
                  )
                )
              ),
              (n = a("tr", "")).children.apply(
                n,
                Jr(
                  ["left", "top", "right", "bottom", "none"].map(function (t) {
                    return ti.call(r, t);
                  })
                )
              )
            )
          ),
          a("td", "".concat(kt, "-border-palette-right")).children(
            a("div", "".concat(kt, "-toolbar-btn")).child(this.ddColor.el),
            a("div", "".concat(kt, "-toolbar-btn")).child(this.ddType.el)
          )
        )
      );
      this.el.child(i);
    };
    function ni(t) {
      return (ni =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function ri(t, e) {
      return !e || ("object" !== ni(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function ii(t) {
      return (ii = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function oi(t, e) {
      return (oi =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var ai = (function (t) {
      function e() {
        var t;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
        var n = new Gt("border-all"),
          r = new ei();
        return (
          (r.change = function (e) {
            t.change(e), t.hide();
          }),
          (t = ri(this, ii(e).call(this, n, "auto", !1, "bottom-left", r.el)))
        );
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && oi(t, e);
        })(e, In),
        e
      );
    })();
    function li(t) {
      return (li =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function ci(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function si(t, e) {
      return !e || ("object" !== li(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function ui(t) {
      return (ui = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function fi(t, e) {
      return (fi =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var hi = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          si(this, ui(e).call(this, "border"))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && fi(t, e);
        })(e, _n),
        (n = e),
        (r = [
          {
            key: "dropdown",
            value: function () {
              return new ai();
            },
          },
        ]) && ci(n.prototype, r),
        i && ci(n, i),
        e
      );
    })();
    function pi(t) {
      return (pi =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function di(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function yi(t, e) {
      return !e || ("object" !== pi(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function vi(t, e, n) {
      return (vi =
        "undefined" != typeof Reflect && Reflect.get
          ? Reflect.get
          : function (t, e, n) {
              var r = (function (t, e) {
                for (
                  ;
                  !Object.prototype.hasOwnProperty.call(t, e) &&
                  null !== (t = bi(t));

                );
                return t;
              })(t, e);
              if (r) {
                var i = Object.getOwnPropertyDescriptor(r, e);
                return i.get ? i.get.call(n) : i.value;
              }
            })(t, e, n || t);
    }
    function bi(t) {
      return (bi = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function gi(t, e) {
      return (gi =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var mi = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          yi(this, bi(e).apply(this, arguments))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && gi(t, e);
        })(e, wn),
        (n = e),
        (r = [
          {
            key: "element",
            value: function () {
              var t = this;
              return vi(bi(e.prototype), "element", this)
                .call(this)
                .child(new Gt(this.tag))
                .on("click", function () {
                  return t.change(t.tag);
                });
            },
          },
          {
            key: "setState",
            value: function (t) {
              this.el.disabled(t);
            },
          },
        ]) && di(n.prototype, r),
        i && di(n, i),
        e
      );
    })();
    function wi(t) {
      return (wi =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function ki(t, e) {
      return !e || ("object" !== wi(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Oi(t) {
      return (Oi = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Si(t, e) {
      return (Si =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var xi = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          ki(this, Oi(e).call(this, "clearformat"))
        );
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Si(t, e);
        })(e, mi),
        e
      );
    })();
    function Ei(t) {
      return (Ei =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function ji(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function _i(t, e) {
      return !e || ("object" !== Ei(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Ci(t) {
      return (Ci = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Ti(t, e) {
      return (Ti =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Pi = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          _i(this, Ci(e).call(this, "paintformat"))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Ti(t, e);
        })(e, or),
        (n = e),
        (r = [{ key: "setState", value: function () {} }]) &&
          ji(n.prototype, r),
        i && ji(n, i),
        e
      );
    })();
    function Ai(t) {
      return (Ai =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Ri(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Ii(t, e) {
      return !e || ("object" !== Ai(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Di(t) {
      return (Di = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function zi(t, e) {
      return (zi =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Hi = (function (t) {
      function e(t) {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          Ii(this, Di(e).call(this, "color", void 0, t))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && zi(t, e);
        })(e, _n),
        (n = e),
        (r = [
          {
            key: "dropdown",
            value: function () {
              var t = this.tag,
                e = this.value;
              return new Br(t, e);
            },
          },
        ]) && Ri(n.prototype, r),
        i && Ri(n, i),
        e
      );
    })();
    function Mi(t) {
      return (Mi =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Ni(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Fi(t, e) {
      return !e || ("object" !== Mi(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Wi(t) {
      return (Wi = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Vi(t, e) {
      return (Vi =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var qi = (function (t) {
      function e(t) {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          Fi(this, Wi(e).call(this, "bgcolor", void 0, t))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Vi(t, e);
        })(e, _n),
        (n = e),
        (r = [
          {
            key: "dropdown",
            value: function () {
              var t = this.tag,
                e = this.value;
              return new Br(t, e);
            },
          },
        ]) && Ni(n.prototype, r),
        i && Ni(n, i),
        e
      );
    })();
    function Bi(t) {
      return (Bi =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Li(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function Ui(t, e) {
      return !e || ("object" !== Bi(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Yi(t) {
      return (Yi = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function $i(t, e) {
      return ($i =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Xi = (function (t) {
      function e() {
        var t, n;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
        var r = Pe.map(function (t) {
          return a("div", "".concat(kt, "-item"))
            .on("click", function () {
              n.setTitle("".concat(t.pt)), n.change(t);
            })
            .child("".concat(t.pt));
        });
        return (n = Ui(
          this,
          (t = Yi(e)).call.apply(
            t,
            [this, "10", "60px", !0, "bottom-left"].concat(Li(r))
          )
        ));
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && $i(t, e);
        })(e, In),
        e
      );
    })();
    function Zi(t) {
      return (Zi =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Ki(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Ji(t, e) {
      return !e || ("object" !== Zi(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Gi(t) {
      return (Gi = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Qi(t, e) {
      return (Qi =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var to = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          Ji(this, Gi(e).call(this, "font-size"))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Qi(t, e);
        })(e, _n),
        (n = e),
        (r = [
          {
            key: "getValue",
            value: function (t) {
              return t.pt;
            },
          },
          {
            key: "dropdown",
            value: function () {
              return new Xi();
            },
          },
        ]) && Ki(n.prototype, r),
        i && Ki(n, i),
        e
      );
    })();
    function eo(t) {
      return (eo =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function no(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function ro(t, e) {
      return !e || ("object" !== eo(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function io(t) {
      return (io = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function oo(t, e) {
      return (oo =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var ao = (function (t) {
      function e() {
        var t, n;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
        var r = Te.map(function (t) {
          return a("div", "".concat(kt, "-item"))
            .on("click", function () {
              n.setTitle(t.title), n.change(t);
            })
            .child(t.title);
        });
        return (n = ro(
          this,
          (t = io(e)).call.apply(
            t,
            [this, Te[0].title, "160px", !0, "bottom-left"].concat(no(r))
          )
        ));
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && oo(t, e);
        })(e, In),
        e
      );
    })();
    function lo(t) {
      return (lo =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function co(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function so(t, e) {
      return !e || ("object" !== lo(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function uo(t) {
      return (uo = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function fo(t, e) {
      return (fo =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var ho = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          so(this, uo(e).call(this, "font-name"))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && fo(t, e);
        })(e, _n),
        (n = e),
        (r = [
          {
            key: "getValue",
            value: function (t) {
              return t.key;
            },
          },
          {
            key: "dropdown",
            value: function () {
              return new ao();
            },
          },
        ]) && co(n.prototype, r),
        i && co(n, i),
        e
      );
    })();
    function po(t) {
      return (po =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function yo(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function vo(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function bo(t, e) {
      return !e || ("object" !== po(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function go(t) {
      return (go = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function mo(t, e) {
      return (mo =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var wo = (function (t) {
      function e() {
        var t, n;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
        var r = Ye.slice(0);
        return (
          r.splice(2, 0, { key: "divider" }),
          r.splice(8, 0, { key: "divider" }),
          (r = r.map(function (t) {
            var e = a("div", "".concat(kt, "-item"));
            return (
              "divider" === t.key
                ? e.addClass("divider")
                : (e.child(t.title()).on("click", function () {
                    n.setTitle(t.title()), n.change(t);
                  }),
                  t.label && e.child(a("div", "label").html(t.label))),
              e
            );
          })),
          (n = bo(
            this,
            (t = go(e)).call.apply(
              t,
              [this, "Normal", "220px", !0, "bottom-left"].concat(yo(r))
            )
          ))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && mo(t, e);
        })(e, In),
        (n = e),
        (r = [
          {
            key: "setTitle",
            value: function (t) {
              for (var e = 0; e < Ye.length; e += 1)
                Ye[e].key === t && this.title.html(Ye[e].title());
              this.hide();
            },
          },
        ]) && vo(n.prototype, r),
        i && vo(n, i),
        e
      );
    })();
    function ko(t) {
      return (ko =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Oo(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function So(t, e) {
      return !e || ("object" !== ko(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function xo(t) {
      return (xo = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Eo(t, e) {
      return (Eo =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var jo = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          So(this, xo(e).call(this, "format"))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Eo(t, e);
        })(e, _n),
        (n = e),
        (r = [
          {
            key: "getValue",
            value: function (t) {
              return t.key;
            },
          },
          {
            key: "dropdown",
            value: function () {
              return new wo();
            },
          },
        ]) && Oo(n.prototype, r),
        i && Oo(n, i),
        e
      );
    })();
    function _o(t) {
      return (_o =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Co(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function To(t, e) {
      return !e || ("object" !== _o(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Po(t) {
      return (Po = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Ao(t, e) {
      return (Ao =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Ro = (function (t) {
      function e() {
        var t, n;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
        var r = Ne.map(function (t) {
          return a("div", "".concat(kt, "-item"))
            .on("click", function () {
              n.hide(), n.change(t);
            })
            .child(t.key);
        });
        return (n = To(
          this,
          (t = Po(e)).call.apply(
            t,
            [this, new Gt("formula"), "180px", !0, "bottom-left"].concat(Co(r))
          )
        ));
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Ao(t, e);
        })(e, In),
        e
      );
    })();
    function Io(t) {
      return (Io =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Do(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function zo(t, e) {
      return !e || ("object" !== Io(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Ho(t) {
      return (Ho = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Mo(t, e) {
      return (Mo =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var No = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          zo(this, Ho(e).call(this, "formula"))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Mo(t, e);
        })(e, _n),
        (n = e),
        (r = [
          {
            key: "getValue",
            value: function (t) {
              return t.key;
            },
          },
          {
            key: "dropdown",
            value: function () {
              return new Ro();
            },
          },
        ]) && Do(n.prototype, r),
        i && Do(n, i),
        e
      );
    })();
    function Fo(t) {
      return (Fo =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Wo(t, e) {
      return !e || ("object" !== Fo(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Vo(t) {
      return (Vo = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function qo(t, e) {
      return (qo =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Bo = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          Wo(this, Vo(e).call(this, "freeze"))
        );
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && qo(t, e);
        })(e, or),
        e
      );
    })();
    function Lo(t) {
      return (Lo =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Uo(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Yo(t, e) {
      return !e || ("object" !== Lo(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function $o(t) {
      return ($o = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Xo(t, e) {
      return (Xo =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Zo = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          Yo(this, $o(e).call(this, "merge"))
        );
      }
      var n, r, i;
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Xo(t, e);
        })(e, or),
        (n = e),
        (r = [
          {
            key: "setState",
            value: function (t, e) {
              this.el.active(t).disabled(e);
            },
          },
        ]) && Uo(n.prototype, r),
        i && Uo(n, i),
        e
      );
    })();
    function Ko(t) {
      return (Ko =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Jo(t, e) {
      return !e || ("object" !== Ko(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Go(t) {
      return (Go = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Qo(t, e) {
      return (Qo =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var ta = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          Jo(this, Go(e).call(this, "redo", "Ctrl+Y"))
        );
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && Qo(t, e);
        })(e, mi),
        e
      );
    })();
    function ea(t) {
      return (ea =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function na(t, e) {
      return !e || ("object" !== ea(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function ra(t) {
      return (ra = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function ia(t, e) {
      return (ia =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var oa = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          na(this, ra(e).call(this, "undo", "Ctrl+Z"))
        );
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && ia(t, e);
        })(e, mi),
        e
      );
    })();
    function aa(t) {
      return (aa =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function la(t, e) {
      return !e || ("object" !== aa(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function ca(t) {
      return (ca = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function sa(t, e) {
      return (sa =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var ua = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          la(this, ca(e).call(this, "print", "Ctrl+P"))
        );
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && sa(t, e);
        })(e, mi),
        e
      );
    })();
    function fa(t) {
      return (fa =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function ha(t, e) {
      return !e || ("object" !== fa(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function pa(t) {
      return (pa = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function da(t, e) {
      return (da =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var ya = (function (t) {
      function e() {
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          ha(this, pa(e).call(this, "textwrap"))
        );
      }
      return (
        (function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && da(t, e);
        })(e, or),
        e
      );
    })();
    function va(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function ba(t) {
      return (ba =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function ga(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function ma(t, e) {
      return !e || ("object" !== ba(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function wa(t) {
      return (wa = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function ka(t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        e && Oa(t, e);
    }
    function Oa(t, e) {
      return (Oa =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Sa = (function (t) {
        function e() {
          var t;
          ga(this, e);
          var n = new Gt("ellipsis"),
            r = a("div", "".concat(kt, "-toolbar-more"));
          return (
            ((t = ma(
              this,
              wa(e).call(this, n, "auto", !1, "bottom-right", r)
            )).moreBtns = r),
            t.contentEl.css("max-width", "420px"),
            t
          );
        }
        return ka(e, In), e;
      })(),
      xa = (function (t) {
        function e() {
          var t;
          return (
            ga(this, e), (t = ma(this, wa(e).call(this, "more"))).el.hide(), t
          );
        }
        var n, r, i;
        return (
          ka(e, _n),
          (n = e),
          (r = [
            {
              key: "dropdown",
              value: function () {
                return new Sa();
              },
            },
            {
              key: "show",
              value: function () {
                this.el.show();
              },
            },
            {
              key: "hide",
              value: function () {
                this.el.hide();
              },
            },
          ]) && va(n.prototype, r),
          i && va(n, i),
          e
        );
      })();
    function Ea(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function ja(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function _a() {
      return a("div", "".concat(kt, "-toolbar-divider"));
    }
    function Ca() {
      var t,
        e,
        n = this.el,
        r = this.btns,
        i = this.moreEl,
        o = this.btns2,
        a = i.dd,
        l = a.moreBtns,
        c = a.contentEl;
      n.css("width", "".concat(this.widthFn() - 60, "px"));
      var s = n.box(),
        u = 160,
        f = 12,
        h = [],
        p = [];
      o.forEach(function (t, e) {
        var n = ja(t, 2),
          r = n[0],
          i = n[1];
        (u += i),
          e === o.length - 1 || u < s.width ? h.push(r) : ((f += i), p.push(r));
      }),
        (t = r.html("")).children.apply(t, h),
        (e = l.html("")).children.apply(e, p),
        c.css("width", "".concat(f, "px")),
        p.length > 0 ? i.show() : i.hide();
    }
    var Ta = (function () {
      function t(e, n) {
        var r = this,
          i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.data = e),
          (this.change = function () {}),
          (this.widthFn = n),
          (this.isHide = i);
        var o = e.defaultStyle();
        (this.items = [
          [
            (this.undoEl = new oa()),
            (this.redoEl = new ta()),
            new ua(),
            (this.paintformatEl = new Pi()),
            (this.clearformatEl = new xi()),
          ],
          _a(),
          [(this.formatEl = new jo())],
          _a(),
          [(this.fontEl = new ho()), (this.fontSizeEl = new to())],
          _a(),
          [
            (this.boldEl = new vr()),
            (this.italicEl = new kr()),
            (this.underlineEl = new Ar()),
            (this.strikeEl = new jr()),
            (this.textColorEl = new Hi(o.color)),
          ],
          _a(),
          [
            (this.fillColorEl = new qi(o.bgcolor)),
            (this.borderEl = new hi()),
            (this.mergeEl = new Zo()),
          ],
          _a(),
          [
            (this.alignEl = new Yn(o.align)),
            (this.valignEl = new Gn(o.valign)),
            (this.textwrapEl = new ya()),
          ],
          _a(),
          [
            (this.freezeEl = new Bo()),
            (this.autofilterEl = new fr()),
            (this.formulaEl = new No()),
            (this.moreEl = new xa()),
          ],
        ]),
          (this.el = a("div", "".concat(kt, "-toolbar"))),
          (this.btns = a("div", "".concat(kt, "-toolbar-btns"))),
          this.items.forEach(function (t) {
            Array.isArray(t)
              ? t.forEach(function (t) {
                  r.btns.child(t.el),
                    (t.change = function () {
                      r.change.apply(r, arguments);
                    });
                })
              : r.btns.child(t.el);
          }),
          this.el.child(this.btns),
          i
            ? this.el.hide()
            : (this.reset(),
              setTimeout(function () {
                (function () {
                  var t = this;
                  (this.btns2 = []),
                    this.items.forEach(function (e) {
                      if (Array.isArray(e))
                        e.forEach(function (e) {
                          var n = e.el,
                            r = n.box(),
                            i = n.computedStyle(),
                            o = i.marginLeft,
                            a = i.marginRight;
                          t.btns2.push([
                            n,
                            r.width + parseInt(o, 10) + parseInt(a, 10),
                          ]);
                        });
                      else {
                        var n = e.box(),
                          r = e.computedStyle(),
                          i = r.marginLeft,
                          o = r.marginRight;
                        t.btns2.push([
                          e,
                          n.width + parseInt(i, 10) + parseInt(o, 10),
                        ]);
                      }
                    });
                }).call(r),
                  Ca.call(r);
              }, 0),
              yt(window, "resize", function () {
                Ca.call(r);
              }));
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "paintformatActive",
            value: function () {
              return this.paintformatEl.active();
            },
          },
          {
            key: "paintformatToggle",
            value: function () {
              this.paintformatEl.toggle();
            },
          },
          {
            key: "trigger",
            value: function (t) {
              this["".concat(t, "El")].click();
            },
          },
          {
            key: "resetData",
            value: function (t) {
              (this.data = t), this.reset();
            },
          },
          {
            key: "reset",
            value: function () {
              if (!this.isHide) {
                var t = this.data,
                  e = t.getSelectedCellStyle();
                this.undoEl.setState(!t.canUndo()),
                  this.redoEl.setState(!t.canRedo()),
                  this.mergeEl.setState(t.canUnmerge(), !t.selector.multiple()),
                  this.autofilterEl.setState(!t.canAutofilter());
                var n = e.font,
                  r = e.format;
                this.formatEl.setState(r),
                  this.fontEl.setState(n.name),
                  this.fontSizeEl.setState(n.size),
                  this.boldEl.setState(n.bold),
                  this.italicEl.setState(n.italic),
                  this.underlineEl.setState(e.underline),
                  this.strikeEl.setState(e.strike),
                  this.textColorEl.setState(e.color),
                  this.fillColorEl.setState(e.bgcolor),
                  this.alignEl.setState(e.align),
                  this.valignEl.setState(e.valign),
                  this.textwrapEl.setState(e.textwrap),
                  this.freezeEl.setState(t.freezeIsActive());
              }
            },
          },
        ]) && Ea(e.prototype, n),
        r && Ea(e, r),
        t
      );
    })();
    function Pa(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function Aa(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var Ra = (function () {
      function t(e, n) {
        var r,
          i = this,
          o =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : "600px";
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.title = e),
          (this.el = a("div", "".concat(kt, "-modal"))
            .css("width", o)
            .children(
              a("div", "".concat(kt, "-modal-header")).children(
                new Gt("close").on("click.stop", function () {
                  return i.hide();
                }),
                this.title
              ),
              (r = a("div", "".concat(kt, "-modal-content"))).children.apply(
                r,
                Pa(n)
              )
            )
            .hide());
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "show",
            value: function () {
              var t = this;
              (this.dimmer = a("div", "".concat(kt, "-dimmer active"))),
                document.body.appendChild(this.dimmer.el);
              var e = this.el.show().box(),
                n = e.width,
                r = e.height,
                i = document.documentElement,
                o = i.clientHeight,
                l = i.clientWidth;
              this.el.offset({ left: (l - n) / 2, top: (o - r) / 3 }),
                (window.xkeydownEsc = function (e) {
                  27 === e.keyCode && t.hide();
                }),
                yt(window, "keydown", window.xkeydownEsc);
            },
          },
          {
            key: "hide",
            value: function () {
              this.el.hide(),
                document.body.removeChild(this.dimmer.el),
                vt(window, "keydown", window.xkeydownEsc),
                delete window.xkeydownEsc;
            },
          },
        ]) && Aa(e.prototype, n),
        r && Aa(e, r),
        t
      );
    })();
    function Ia(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var Da = (function () {
      function t(e, n) {
        var r = this;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.vchange = function () {}),
          (this.el = a("div", "".concat(kt, "-form-input"))),
          (this.input = a("input", "")
            .css("width", e)
            .on("input", function (t) {
              return r.vchange(t);
            })
            .attr("placeholder", n)),
          this.el.child(this.input);
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "focus",
            value: function () {
              var t = this;
              setTimeout(function () {
                t.input.el.focus();
              }, 10);
            },
          },
          {
            key: "hint",
            value: function (t) {
              this.input.attr("placeholder", t);
            },
          },
          {
            key: "val",
            value: function (t) {
              return this.input.val(t);
            },
          },
        ]) && Ia(e.prototype, n),
        r && Ia(e, r),
        t
      );
    })();
    function za(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var Ha = (function () {
      function t(e, n, r) {
        var i = this,
          o =
            arguments.length > 3 && void 0 !== arguments[3]
              ? arguments[3]
              : function (t) {
                  return t;
                },
          l =
            arguments.length > 4 && void 0 !== arguments[4]
              ? arguments[4]
              : function () {};
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.key = e),
          (this.getTitle = o),
          (this.vchange = function () {}),
          (this.el = a("div", "".concat(kt, "-form-select"))),
          (this.suggest = new Yt(
            n.map(function (t) {
              return { key: t, title: i.getTitle(t) };
            }),
            function (t) {
              i.itemClick(t.key), l(t.key), i.vchange(t.key);
            },
            r,
            this.el
          )),
          this.el
            .children(
              (this.itemEl = a("div", "input-text").html(this.getTitle(e))),
              this.suggest.el
            )
            .on("click", function () {
              return i.show();
            });
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "show",
            value: function () {
              this.suggest.search("");
            },
          },
          {
            key: "itemClick",
            value: function (t) {
              (this.key = t), this.itemEl.html(this.getTitle(t));
            },
          },
          {
            key: "val",
            value: function (t) {
              return void 0 !== t
                ? ((this.key = t), this.itemEl.html(this.getTitle(t)), this)
                : this.key;
            },
          },
        ]) && za(e.prototype, n),
        r && za(e, r),
        t
      );
    })();
    function Ma(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var Na = {
        number: /(^\d+$)|(^\d+(\.\d{0,4})?$)/,
        date: /^\d{4}-\d{1,2}-\d{1,2}$/,
      },
      Fa = (function () {
        function t(e, n, r, i) {
          var o = this;
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this.label = ""),
            (this.rule = n),
            r &&
              (this.label = a("label", "label")
                .css("width", "".concat(i, "px"))
                .html(r)),
            (this.tip = a("div", "tip").child("tip").hide()),
            (this.input = e),
            (this.input.vchange = function () {
              return o.validate();
            }),
            (this.el = a("div", "".concat(kt, "-form-field")).children(
              this.label,
              e.el,
              this.tip
            ));
        }
        var e, n, r;
        return (
          (e = t),
          (n = [
            {
              key: "isShow",
              value: function () {
                return "none" !== this.el.css("display");
              },
            },
            {
              key: "show",
              value: function () {
                this.el.show();
              },
            },
            {
              key: "hide",
              value: function () {
                return this.el.hide(), this;
              },
            },
            {
              key: "val",
              value: function (t) {
                return this.input.val(t);
              },
            },
            {
              key: "hint",
              value: function (t) {
                this.input.hint(t);
              },
            },
            {
              key: "validate",
              value: function () {
                var t = this.input,
                  e = this.rule,
                  n = this.tip,
                  r = this.el,
                  i = t.val();
                if (e.required && /^\s*$/.test(i))
                  return (
                    n.html(L("validation.required")), r.addClass("error"), !1
                  );
                if ((e.type || e.pattern) && !(e.pattern || Na[e.type]).test(i))
                  return (
                    n.html(L("validation.notMatch")), r.addClass("error"), !1
                  );
                return r.removeClass("error"), !0;
              },
            },
          ]) && Ma(e.prototype, n),
          r && Ma(e, r),
          t
        );
      })();
    function Wa(t) {
      return (Wa =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Va(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function qa(t, e) {
      return !e || ("object" !== Wa(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function Ba(t) {
      return (Ba = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function La(t, e) {
      return (La =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Ua = 100,
      Ya = (function (t) {
        function e() {
          var t;
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e);
          var n = new Fa(
              new Ha("cell", ["cell"], "100%", function (t) {
                return L("dataValidation.modeType.".concat(t));
              }),
              { required: !0 },
              "".concat(L("dataValidation.range"), ":"),
              Ua
            ),
            r = new Fa(new Da("120px", "E3 or E3:F12"), {
              required: !0,
              pattern: /^([A-Z]{1,2}[1-9]\d*)(:[A-Z]{1,2}[1-9]\d*)?$/,
            }),
            i = new Fa(
              new Ha(
                "list",
                ["list", "number", "date", "phone", "email"],
                "100%",
                function (t) {
                  return L("dataValidation.type.".concat(t));
                },
                function (e) {
                  return t.criteriaSelected(e);
                }
              ),
              { required: !0 },
              "".concat(L("dataValidation.criteria"), ":"),
              Ua
            ),
            o = new Fa(
              new Ha(
                "be",
                ["be", "nbe", "eq", "neq", "lt", "lte", "gt", "gte"],
                "160px",
                function (t) {
                  return L("dataValidation.operator.".concat(t));
                },
                function (e) {
                  return t.criteriaOperatorSelected(e);
                }
              ),
              { required: !0 }
            ).hide(),
            l = new Fa(new Da("70px", "10"), { required: !0 }).hide(),
            c = new Fa(new Da("70px", "100"), {
              required: !0,
              type: "number",
            }).hide(),
            s = new Fa(new Da("120px", "a,b,c"), { required: !0 }),
            u = new Fa(new Da("70px", "10"), {
              required: !0,
              type: "number",
            }).hide();
          return (
            ((t = qa(
              this,
              Ba(e).call(this, L("contextmenu.validation"), [
                a("div", "".concat(kt, "-form-fields")).children(n.el, r.el),
                a("div", "".concat(kt, "-form-fields")).children(
                  i.el,
                  o.el,
                  l.el,
                  c.el,
                  u.el,
                  s.el
                ),
                a("div", "".concat(kt, "-buttons")).children(
                  new ve("cancel").on("click", function () {
                    return t.btnClick("cancel");
                  }),
                  new ve("remove").on("click", function () {
                    return t.btnClick("remove");
                  }),
                  new ve("save", "primary").on("click", function () {
                    return t.btnClick("save");
                  })
                ),
              ])
            )).mf = n),
            (t.rf = r),
            (t.cf = i),
            (t.of = o),
            (t.minvf = l),
            (t.maxvf = c),
            (t.vf = u),
            (t.svf = s),
            (t.change = function () {}),
            t
          );
        }
        var n, r, i;
        return (
          (function (t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && La(t, e);
          })(e, Ra),
          (n = e),
          (r = [
            {
              key: "showVf",
              value: function (t) {
                var e = "date" === t ? "2018-11-12" : "10",
                  n = this.vf;
                n.input.hint(e), n.show();
              },
            },
            {
              key: "criteriaSelected",
              value: function (t) {
                var e = this.of,
                  n = this.minvf,
                  r = this.maxvf,
                  i = this.vf,
                  o = this.svf;
                "date" === t || "number" === t
                  ? (e.show(),
                    (n.rule.type = t),
                    (r.rule.type = t),
                    "date" === t
                      ? (n.hint("2018-11-12"), r.hint("2019-11-12"))
                      : (n.hint("10"), r.hint("100")),
                    n.show(),
                    r.show(),
                    i.hide(),
                    o.hide())
                  : ("list" === t ? o.show() : o.hide(),
                    i.hide(),
                    e.hide(),
                    n.hide(),
                    r.hide());
              },
            },
            {
              key: "criteriaOperatorSelected",
              value: function (t) {
                if (t) {
                  var e = this.minvf,
                    n = this.maxvf,
                    r = this.vf;
                  if ("be" === t || "nbe" === t) e.show(), n.show(), r.hide();
                  else {
                    var i = this.cf.val();
                    (r.rule.type = i),
                      "date" === i ? r.hint("2018-11-12") : r.hint("10"),
                      r.show(),
                      e.hide(),
                      n.hide();
                  }
                }
              },
            },
            {
              key: "btnClick",
              value: function (t) {
                if ("cancel" === t) this.hide();
                else if ("remove" === t) this.change("remove"), this.hide();
                else if ("save" === t) {
                  for (
                    var e = [
                        "mf",
                        "rf",
                        "cf",
                        "of",
                        "svf",
                        "vf",
                        "minvf",
                        "maxvf",
                      ],
                      n = 0;
                    n < e.length;
                    n += 1
                  ) {
                    var r = this[e[n]];
                    if (r.isShow() && !r.validate()) return;
                  }
                  var i = this.mf.val(),
                    o = this.rf.val(),
                    a = this.cf.val(),
                    l = this.of.val(),
                    c = this.svf.val();
                  ("number" !== a && "date" !== a) ||
                    (c =
                      "be" === l || "nbe" === l
                        ? [this.minvf.val(), this.maxvf.val()]
                        : this.vf.val()),
                    this.change("save", i, o, {
                      type: a,
                      operator: l,
                      required: !1,
                      value: c,
                    }),
                    this.hide();
                }
              },
            },
            {
              key: "setValue",
              value: function (t) {
                if (t) {
                  var e = this.mf,
                    n = this.rf,
                    r = this.cf,
                    i = this.of,
                    o = this.svf,
                    a = this.vf,
                    l = this.minvf,
                    c = this.maxvf,
                    s = t.mode,
                    u = t.ref,
                    f = t.validator || { type: "list" },
                    h = f.type,
                    p = f.operator,
                    d = f.value;
                  e.val(s || "cell"),
                    n.val(u),
                    r.val(h),
                    i.val(p),
                    Array.isArray(d)
                      ? (l.val(d[0]), c.val(d[1]))
                      : (o.val(d || ""), a.val(d || "")),
                    this.criteriaSelected(h),
                    this.criteriaOperatorSelected(p);
                }
                this.show();
              },
            },
          ]) && Va(n.prototype, r),
          i && Va(n, i),
          e
        );
      })();
    function $a(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function Xa(t) {
      return a("div", "".concat(kt, "-item ").concat(t));
    }
    function Za(t) {
      var e = this;
      return Xa("state")
        .child(L("sort.".concat(t)))
        .on("click.stop", function () {
          return e.itemClick(t);
        });
    }
    function Ka() {
      var t = this.filterhEl,
        e = this.filterValues,
        n = this.values;
      t.html("".concat(e.length, " / ").concat(n.length)),
        t.checked(e.length === n.length);
    }
    var Ja = (function () {
      function t() {
        var e = this;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.filterbEl = a("div", "".concat(kt, "-body"))),
          (this.filterhEl = a("div", "".concat(kt, "-header state")).on(
            "click.stop",
            function () {
              return e.filterClick(0, "all");
            }
          )),
          (this.el = a("div", "".concat(kt, "-sort-filter"))
            .children(
              (this.sortAscEl = Za.call(this, "asc")),
              (this.sortDescEl = Za.call(this, "desc")),
              Xa("divider"),
              a("div", "".concat(kt, "-filter")).children(
                this.filterhEl,
                this.filterbEl
              ),
              a("div", "".concat(kt, "-buttons")).children(
                new ve("cancel").on("click", function () {
                  return e.btnClick("cancel");
                }),
                new ve("ok", "primary").on("click", function () {
                  return e.btnClick("ok");
                })
              )
            )
            .hide()),
          (this.ci = null),
          (this.sortDesc = null),
          (this.values = null),
          (this.filterValues = []);
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "btnClick",
            value: function (t) {
              if ("ok" === t) {
                var e = this.ci,
                  n = this.sort,
                  r = this.filterValues;
                this.ok && this.ok(e, n, "in", r);
              }
              this.hide();
            },
          },
          {
            key: "itemClick",
            value: function (t) {
              this.sort = t;
              var e = this.sortAscEl,
                n = this.sortDescEl;
              e.checked("asc" === t), n.checked("desc" === t);
            },
          },
          {
            key: "filterClick",
            value: function (t, e) {
              var n = this.filterbEl,
                r = this.filterValues,
                i = this.values,
                o = n.children();
              "all" === e
                ? o.length === r.length
                  ? ((this.filterValues = []),
                    o.forEach(function (t) {
                      return a(t).checked(!1);
                    }))
                  : ((this.filterValues = Array.from(i)),
                    o.forEach(function (t) {
                      return a(t).checked(!0);
                    }))
                : a(o[t]).toggle("checked")
                ? r.push(e)
                : r.splice(
                    r.findIndex(function (t) {
                      return t === e;
                    }),
                    1
                  );
              Ka.call(this);
            },
          },
          {
            key: "set",
            value: function (t, e, n, r) {
              this.ci = t;
              var i = this.sortAscEl,
                o = this.sortDescEl;
              null !== r
                ? ((this.sort = r.order),
                  i.checked(r.asc()),
                  o.checked(r.desc()))
                : ((this.sortDesc = null), i.checked(!1), o.checked(!1)),
                (this.values = Object.keys(e)),
                (this.filterValues = n ? Array.from(n.value) : Object.keys(e)),
                function (t) {
                  var e = this,
                    n = this.filterbEl,
                    r = this.filterValues;
                  n.html(""),
                    Object.keys(t).forEach(function (i, o) {
                      var l = t[i],
                        c = r.includes(i) ? "checked" : "";
                      n.child(
                        a("div", "".concat(kt, "-item state ").concat(c))
                          .on("click.stop", function () {
                            return e.filterClick(o, i);
                          })
                          .children(
                            "" === i ? L("filter.empty") : i,
                            a("div", "label").html("(".concat(l, ")"))
                          )
                      );
                    });
                }.call(this, e, n),
                Ka.call(this);
            },
          },
          {
            key: "setOffset",
            value: function (t) {
              var e = this;
              this.el.offset(t).show();
              var n = 1;
              gt(this.el, function () {
                n <= 0 && e.hide(), (n -= 1);
              });
            },
          },
          {
            key: "show",
            value: function () {
              this.el.show();
            },
          },
          {
            key: "hide",
            value: function () {
              this.el.hide(), bt(this.el);
            },
          },
        ]) && $a(e.prototype, n),
        r && $a(e, r),
        t
      );
    })();
    function Ga(t, e) {
      var n = a("div", "".concat(kt, "-toast")),
        r = a("div", "".concat(kt, "-dimmer active"));
      n.children(
        a("div", "".concat(kt, "-toast-header")).children(
          new Gt("close").on("click.stop", function () {
            return (
              document.body.removeChild(n.el),
              void document.body.removeChild(r.el)
            );
          }),
          t
        ),
        a("div", "".concat(kt, "-toast-content")).html(e)
      ),
        document.body.appendChild(n.el),
        document.body.appendChild(r.el);
      var i = n.box(),
        o = i.width,
        l = i.height,
        c = document.documentElement,
        s = c.clientHeight,
        u = c.clientWidth;
      n.offset({ left: (u - o) / 2, top: (s - l) / 3 });
    }
    function Qa(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function tl(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function el(t, e) {
      var n,
        r = this;
      return function () {
        for (
          var i = r, o = arguments.length, a = new Array(o), l = 0;
          l < o;
          l++
        )
          a[l] = arguments[l];
        var c = a;
        n ||
          (n = setTimeout(function () {
            (n = null), t.apply(i, c);
          }, e));
      };
    }
    function nl(t, e, n) {
      var r =
          !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
        i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
      if (-1 !== e || -1 !== n) {
        var o = this.table,
          a = this.selector,
          l = this.toolbar,
          c = this.data;
        this.contextMenu.setMode(-1 === e || -1 === n ? "row-col" : "range");
        var s = c.getCell(e, n);
        t
          ? (a.setEnd(e, n, i), this.trigger("cells-selected", s, a.range))
          : (a.set(e, n, r), this.trigger("cell-selected", s, e, n)),
          l.reset(),
          o.render();
      }
    }
    function rl(t, e) {
      var n = this.selector,
        r = this.data,
        i = r.rows,
        o = r.cols,
        a = tl(n.indexes, 2),
        l = a[0],
        c = a[1],
        s = n.range,
        u = s.eri,
        f = s.eci;
      if (t) {
        var h = tl(n.moveIndexes, 2);
        (l = h[0]), (c = h[1]);
      }
      "left" === e
        ? c > 0 && (c -= 1)
        : "right" === e
        ? (f !== c && (c = f), c < o.len - 1 && (c += 1))
        : "up" === e
        ? l > 0 && (l -= 1)
        : "down" === e
        ? (u !== l && (l = u), l < i.len - 1 && (l += 1))
        : "row-first" === e
        ? (c = 0)
        : "row-last" === e
        ? (c = o.len - 1)
        : "col-first" === e
        ? (l = 0)
        : "col-last" === e && (l = i.len - 1),
        t && (n.moveIndexes = [l, c]),
        nl.call(this, t, l, c),
        function () {
          var t = this.data,
            e = this.verticalScrollbar,
            n = this.horizontalScrollbar,
            r = t.getSelectedRect(),
            i = r.l,
            o = r.t,
            a = r.left,
            l = r.top,
            c = r.width,
            s = r.height,
            u = this.getTableOffset();
          if (Math.abs(a) + c > u.width) n.move({ left: i + c - u.width });
          else {
            var f = t.freezeTotalWidth();
            a < f && n.move({ left: i - 1 - f });
          }
          if (Math.abs(l) + s > u.height) e.move({ top: o + s - u.height - 1 });
          else {
            var h = t.freezeTotalHeight();
            l < h && e.move({ top: o - 1 - h });
          }
        }.call(this);
    }
    function il() {
      var t = this.data,
        e = this.verticalScrollbar,
        n = this.getTableOffset().height,
        r = t.exceptRowTotalHeight(0, -1);
      e.set(n, t.rows.totalHeight() - r);
    }
    function ol() {
      var t = this.data,
        e = this.horizontalScrollbar,
        n = this.getTableOffset().width;
      t && e.set(n, t.cols.totalWidth());
    }
    function al() {
      var t = this.tableEl,
        e = this.overlayerEl,
        n = this.overlayerCEl,
        r = this.table,
        i = this.toolbar,
        o = this.selector,
        a = this.el,
        l = this.getTableOffset(),
        c = this.getRect();
      t.attr(c),
        e.offset(c),
        n.offset(l),
        a.css("width", "".concat(c.width, "px")),
        il.call(this),
        ol.call(this),
        function () {
          var t = this.selector,
            e = this.data,
            n = this.editor,
            r = tl(e.freeze, 2),
            i = r[0],
            o = r[1];
          if (i > 0 || o > 0) {
            var a = e.freezeTotalWidth(),
              l = e.freezeTotalHeight();
            n.setFreezeLengths(a, l);
          }
          t.resetAreaOffset();
        }.call(this),
        r.render(),
        i.reset(),
        o.reset();
    }
    function ll() {
      var t = this.data,
        e = this.selector;
      t.clearClipboard(), e.hideClipboard();
    }
    function cl() {
      var t = this.data,
        e = this.selector;
      t.copy(), t.copyToSystemClipboard(), e.showClipboard();
    }
    function sl() {
      var t = this.data,
        e = this.selector;
      t.cut(), e.showClipboard();
    }
    function ul(t, e) {
      var n = this.data;
      if ("read" !== n.settings.mode)
        if (
          n.paste(t, function (t) {
            return Ga("Tip", t);
          })
        )
          al.call(this);
        else if (e) {
          var r = e.clipboardData.getData("text/plain");
          this.data.pasteFromText(r), al.call(this);
        }
    }
    function fl(t, e) {
      this.data.unhideRowsOrCols(t, e), al.call(this);
    }
    function hl(t) {
      var e = this,
        n = this.selector,
        r = this.data,
        i = this.table,
        o = this.sortFilter,
        a = t.offsetX,
        l = t.offsetY,
        c = t.target.className === "".concat(kt, "-selector-corner"),
        s = r.getCellRectByXY(a, l),
        u = s.left,
        f = s.top,
        h = s.width,
        p = s.height,
        d = s.ri,
        y = s.ci,
        v = r.autoFilter;
      if (v.includes(d, y) && u + h - 20 < a && f + p - 20 < l) {
        var b = v.items(y, function (t, e) {
          return r.rows.getCell(t, e);
        });
        return (
          o.hide(),
          o.set(y, b, v.getFilter(y), v.getSort(y)),
          void o.setOffset({ left: u, top: f + p + 2 })
        );
      }
      t.shiftKey ||
        (c ? n.showAutofill(d, y) : nl.call(this, !1, d, y),
        mt(
          window,
          function (t) {
            var i = r.getCellRectByXY(t.offsetX, t.offsetY);
            (d = i.ri),
              (y = i.ci),
              c
                ? n.showAutofill(d, y)
                : 1 !== t.buttons || t.shiftKey || nl.call(e, !0, d, y, !0, !0);
          },
          function () {
            c &&
              n.arange &&
              "read" !== r.settings.mode &&
              r.autofill(n.arange, "all", function (t) {
                return Ga("Tip", t);
              }) &&
              i.render(),
              n.hideAutofill(),
              function () {
                var t = this.toolbar;
                t.paintformatActive() &&
                  (ul.call(this, "format"),
                  ll.call(this),
                  t.paintformatToggle());
              }.call(e);
          }
        )),
        c || 1 !== t.buttons || (t.shiftKey && nl.call(this, !0, d, y));
    }
    function pl() {
      var t = this.editor,
        e = this.data.getSelectedRect(),
        n = this.getTableOffset(),
        r = "top";
      e.top > n.height / 2 && (r = "bottom"), t.setOffset(e, r);
    }
    function dl() {
      var t = this.editor,
        e = this.data;
      "read" !== e.settings.mode &&
        (pl.call(this),
        t.setCell(e.getSelectedCell(), e.getSelectedValidator()),
        ll.call(this));
    }
    function yl(t) {
      var e =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : "finished",
        n = this.data,
        r = this.table;
      if ("read" !== n.settings.mode) {
        n.setSelectedCellText(t, e);
        var i = n.selector,
          o = i.ri,
          a = i.ci;
        "finished" === e ? r.render() : this.trigger("cell-edited", t, o, a);
      }
    }
    function vl(t) {
      var e = this.data;
      "read" !== e.settings.mode &&
        ("insert-row" === t
          ? e.insert("row")
          : "delete-row" === t
          ? e.delete("row")
          : "insert-column" === t
          ? e.insert("column")
          : "delete-column" === t
          ? e.delete("column")
          : "delete-cell" === t
          ? e.deleteCell()
          : "delete-cell-format" === t
          ? e.deleteCell("format")
          : "delete-cell-text" === t
          ? e.deleteCell("text")
          : "cell-printable" === t
          ? e.setSelectedCellAttr("printable", !0)
          : "cell-non-printable" === t
          ? e.setSelectedCellAttr("printable", !1)
          : "cell-editable" === t
          ? e.setSelectedCellAttr("editable", !0)
          : "cell-non-editable" === t && e.setSelectedCellAttr("editable", !1),
        ll.call(this),
        al.call(this));
    }
    function bl(t, e) {
      var n = this.data;
      if ("undo" === t) this.undo();
      else if ("redo" === t) this.redo();
      else if ("print" === t) this.print.preview();
      else if ("paintformat" === t) !0 === e ? cl.call(this) : ll.call(this);
      else if ("clearformat" === t) vl.call(this, "delete-cell-format");
      else if ("link" === t);
      else if ("chart" === t);
      else if ("autofilter" === t)
        (function () {
          this.data.autofilter(), al.call(this);
        }).call(this);
      else if ("freeze" === t)
        if (e) {
          var r = n.selector,
            i = r.ri,
            o = r.ci;
          this.freeze(i, o);
        } else this.freeze(0, 0);
      else
        n.setSelectedCellAttr(t, e),
          "formula" !== t || n.selector.multiple() || dl.call(this),
          al.call(this);
    }
    function gl() {
      var t,
        e,
        n,
        r,
        i,
        o,
        a = this,
        l = this.selector,
        c = this.overlayerEl,
        s = this.rowResizer,
        u = this.colResizer,
        f = this.verticalScrollbar,
        h = this.horizontalScrollbar,
        p = this.editor,
        d = this.contextMenu,
        y = this.toolbar,
        v = this.modalValidation,
        b = this.sortFilter;
      c
        .on("mousemove", function (t) {
          (function (t) {
            if (
              0 === t.buttons &&
              t.target.className !== "".concat(kt, "-resizer-hover")
            ) {
              var e = t.offsetX,
                n = t.offsetY,
                r = this.rowResizer,
                i = this.colResizer,
                o = this.tableEl,
                a = this.data,
                l = a.rows,
                c = a.cols;
              if (e > c.indexWidth && n > l.height)
                return r.hide(), void i.hide();
              var s = o.box(),
                u = a.getCellRectByXY(t.offsetX, t.offsetY);
              u.ri >= 0 && -1 === u.ci
                ? ((u.width = c.indexWidth),
                  r.show(u, { width: s.width }),
                  l.isHide(u.ri - 1) ? r.showUnhide(u.ri) : r.hideUnhide())
                : r.hide(),
                -1 === u.ri && u.ci >= 0
                  ? ((u.height = l.height),
                    i.show(u, { height: s.height }),
                    c.isHide(u.ci - 1) ? i.showUnhide(u.ci) : i.hideUnhide())
                  : i.hide();
            }
          }).call(a, t);
        })
        .on("mousedown", function (t) {
          p.clear(),
            d.hide(),
            2 === t.buttons
              ? (a.data.xyInSelectedRect(t.offsetX, t.offsetY)
                  ? d.setPosition(t.offsetX, t.offsetY)
                  : (hl.call(a, t), d.setPosition(t.offsetX, t.offsetY)),
                t.stopPropagation())
              : 2 === t.detail
              ? dl.call(a)
              : hl.call(a, t);
        })
        .on("mousewheel.stop", function (t) {
          (function (t) {
            var e = this.verticalScrollbar,
              n = this.horizontalScrollbar,
              r = this.data,
              i = e.scroll().top,
              o = n.scroll().left,
              a = r.rows,
              l = r.cols,
              c = t.deltaY,
              s = t.deltaX,
              u = function (t, e) {
                var n = t,
                  r = 0;
                do {
                  (r = e(n)), (n += 1);
                } while (r <= 0);
                return r;
              },
              f = function (t) {
                if (t > 0) {
                  var n = r.scroll.ri + 1;
                  if (n < a.len) {
                    var o = u(n, function (t) {
                      return a.getHeight(t);
                    });
                    e.move({ top: i + o - 1 });
                  }
                } else {
                  var l = r.scroll.ri - 1;
                  if (l >= 0) {
                    var c = u(l, function (t) {
                      return a.getHeight(t);
                    });
                    e.move({ top: 0 === l ? 0 : i - c });
                  }
                }
              },
              h = Math.abs(c),
              p = Math.abs(s),
              d = Math.max(h, p);
            /Firefox/i.test(window.navigator.userAgent) && el(f(t.detail), 50),
              d === p &&
                el(
                  (function (t) {
                    if (t > 0) {
                      var e = r.scroll.ci + 1;
                      if (e < l.len) {
                        var i = u(e, function (t) {
                          return l.getWidth(t);
                        });
                        n.move({ left: o + i - 1 });
                      }
                    } else {
                      var a = r.scroll.ci - 1;
                      if (a >= 0) {
                        var c = u(a, function (t) {
                          return l.getWidth(t);
                        });
                        n.move({ left: 0 === a ? 0 : o - c });
                      }
                    }
                  })(s),
                  50
                ),
              d === h && el(f(c), 50);
          }).call(a, t);
        })
        .on("mouseout", function (t) {
          var e = t.offsetX;
          t.offsetY <= 0 && u.hide(), e <= 0 && s.hide();
        }),
        (l.inputChange = function (t) {
          yl.call(a, t, "input"), dl.call(a);
        }),
        (t = c.el),
        (n = (e = {
          move: function (t, e) {
            (function (t, e) {
              var n = this.verticalScrollbar,
                r = this.horizontalScrollbar,
                i = n.scroll().top,
                o = r.scroll().left;
              "left" === t || "right" === t
                ? r.move({ left: o - e })
                : ("up" !== t && "down" !== t) || n.move({ top: i - e });
            }).call(a, t, e);
          },
        }).move),
        (r = e.end),
        (i = 0),
        (o = 0),
        yt(t, "touchstart", function (t) {
          var e = t.touches[0],
            n = e.pageX,
            r = e.pageY;
          (i = n), (o = r);
        }),
        yt(t, "touchmove", function (t) {
          if (n) {
            var e = t.changedTouches[0],
              r = e.pageX,
              a = e.pageY,
              l = r - i,
              c = a - o;
            (Math.abs(l) > 10 || Math.abs(c) > 10) &&
              (wt(l, c, t, n), (i = r), (o = a)),
              t.preventDefault();
          }
        }),
        yt(t, "touchend", function (t) {
          if (r) {
            var e = t.changedTouches[0],
              n = e.pageX,
              a = e.pageY;
            wt(n - i, a - o, t, r);
          }
        }),
        (y.change = function (t, e) {
          return bl.call(a, t, e);
        }),
        (b.ok = function (t, e, n, r) {
          return function (t, e, n, r) {
            this.data.setAutoFilter(t, e, n, r), al.call(this);
          }.call(a, t, e, n, r);
        }),
        (s.finishedFn = function (t, e) {
          (function (t, e) {
            var n = t.ri,
              r = this.table,
              i = this.selector;
            this.data.rows.setHeight(n, e),
              r.render(),
              i.resetAreaOffset(),
              il.call(this),
              pl.call(this);
          }).call(a, t, e);
        }),
        (u.finishedFn = function (t, e) {
          (function (t, e) {
            var n = t.ci,
              r = this.table,
              i = this.selector;
            this.data.cols.setWidth(n, e),
              r.render(),
              i.resetAreaOffset(),
              ol.call(this),
              pl.call(this);
          }).call(a, t, e);
        }),
        (s.unhideFn = function (t) {
          fl.call(a, "row", t);
        }),
        (u.unhideFn = function (t) {
          fl.call(a, "col", t);
        }),
        (f.moveFn = function (t, e) {
          (function (t) {
            var e = this,
              n = this.data,
              r = this.table,
              i = this.selector;
            n.scrolly(t, function () {
              i.resetBRLAreaOffset(), pl.call(e), r.render();
            });
          }).call(a, t, e);
        }),
        (h.moveFn = function (t, e) {
          (function (t) {
            var e = this,
              n = this.data,
              r = this.table,
              i = this.selector;
            n.scrollx(t, function () {
              i.resetBRTAreaOffset(), pl.call(e), r.render();
            });
          }).call(a, t, e);
        }),
        (p.change = function (t, e) {
          yl.call(a, e, t);
        }),
        (v.change = function (t) {
          if ("save" === t) {
            for (
              var e,
                n = arguments.length,
                r = new Array(n > 1 ? n - 1 : 0),
                i = 1;
              i < n;
              i++
            )
              r[i - 1] = arguments[i];
            (e = a.data).addValidation.apply(e, r);
          } else a.data.removeValidation();
        }),
        (d.itemClick = function (t) {
          "validation" === t
            ? v.setValue(a.data.getSelectedValidation())
            : "copy" === t
            ? cl.call(a)
            : "cut" === t
            ? sl.call(a)
            : "paste" === t
            ? ul.call(a, "all")
            : "paste-value" === t
            ? ul.call(a, "text")
            : "paste-format" === t
            ? ul.call(a, "format")
            : "hide" === t
            ? function () {
                this.data.hideRowsOrCols(), al.call(this);
              }.call(a)
            : vl.call(a, t);
        }),
        yt(window, "resize", function () {
          a.reload();
        }),
        yt(window, "click", function (t) {
          a.focusing = c.contains(t.target);
        }),
        yt(window, "paste", function (t) {
          a.focusing && (ul.call(a, "all", t), t.preventDefault());
        }),
        yt(window, "keydown", function (t) {
          if (a.focusing) {
            var e = t.keyCode || t.which,
              n = t.key,
              r = t.ctrlKey,
              i = t.shiftKey,
              o = t.metaKey;
            if (r || o)
              switch (e) {
                case 90:
                  a.undo(), t.preventDefault();
                  break;
                case 89:
                  a.redo(), t.preventDefault();
                  break;
                case 67:
                  cl.call(a), t.preventDefault();
                  break;
                case 88:
                  sl.call(a), t.preventDefault();
                  break;
                case 85:
                  y.trigger("underline"), t.preventDefault();
                  break;
                case 86:
                  break;
                case 37:
                  rl.call(a, i, "row-first"), t.preventDefault();
                  break;
                case 38:
                  rl.call(a, i, "col-first"), t.preventDefault();
                  break;
                case 39:
                  rl.call(a, i, "row-last"), t.preventDefault();
                  break;
                case 40:
                  rl.call(a, i, "col-last"), t.preventDefault();
                  break;
                case 32:
                  nl.call(a, !1, -1, a.data.selector.ci, !1),
                    t.preventDefault();
                  break;
                case 66:
                  y.trigger("bold");
                  break;
                case 73:
                  y.trigger("italic");
              }
            else {
              switch (e) {
                case 32:
                  i && nl.call(a, !1, a.data.selector.ri, -1, !1);
                  break;
                case 27:
                  d.hide(), ll.call(a);
                  break;
                case 37:
                  rl.call(a, i, "left"), t.preventDefault();
                  break;
                case 38:
                  rl.call(a, i, "up"), t.preventDefault();
                  break;
                case 39:
                  rl.call(a, i, "right"), t.preventDefault();
                  break;
                case 40:
                  rl.call(a, i, "down"), t.preventDefault();
                  break;
                case 9:
                  p.clear(),
                    rl.call(a, !1, i ? "left" : "right"),
                    t.preventDefault();
                  break;
                case 13:
                  p.clear(),
                    rl.call(a, !1, i ? "up" : "down"),
                    t.preventDefault();
                  break;
                case 8:
                  vl.call(a, "delete-cell-text"), t.preventDefault();
              }
              "Delete" === n
                ? (vl.call(a, "delete-cell-text"), t.preventDefault())
                : (e >= 65 && e <= 90) ||
                  (e >= 48 && e <= 57) ||
                  (e >= 96 && e <= 105) ||
                  "=" === t.key
                ? (yl.call(a, t.key, "input"), dl.call(a))
                : 113 === e && dl.call(a);
            }
          }
        });
    }
    var ml = (function () {
      function t(e, n) {
        var r = this;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.eventMap = (function () {
            var t = new Map();
            function e(e, n) {
              var r;
              return (
                (t.has(e) &&
                  ((r = t.get(e)), (Array.isArray(r) && r.push(n)) || !1)) ||
                t.set(e, [].concat(n))
              );
            }
            function n(e, n) {
              var r, i;
              return (
                t.has(e) &&
                ((r = t.get(e)),
                (i = r.indexOf(n)) >= 0 &&
                  r.splice(i, 1) &&
                  0 === t.get(e).length &&
                  t.delete(e))
              );
            }
            return {
              get current() {
                return t;
              },
              on: e,
              once: function (t, r) {
                return e(t, function e() {
                  for (
                    var i = arguments.length, o = new Array(i), a = 0;
                    a < i;
                    a++
                  )
                    o[a] = arguments[a];
                  r.call.apply(r, [null].concat(o)), n(t, e);
                });
              },
              fire: function (e, n) {
                return (
                  t.has(e) &&
                  (function () {
                    var r = t.get(e),
                      i = !0,
                      o = !1,
                      a = void 0;
                    try {
                      for (
                        var l, c = r[Symbol.iterator]();
                        !(i = (l = c.next()).done);
                        i = !0
                      ) {
                        var s = l.value;
                        s.call.apply(s, [null].concat(dt(n)));
                      }
                    } catch (t) {
                      (o = !0), (a = t);
                    } finally {
                      try {
                        i || null == c.return || c.return();
                      } finally {
                        if (o) throw a;
                      }
                    }
                  })()
                );
              },
              removeListener: n,
              removeAllListeners: function () {
                t.clear();
              },
            };
          })());
        var i = n.settings,
          o = i.view,
          l = i.showToolbar,
          c = i.showContextmenu;
        (this.el = a("div", "".concat(kt, "-sheet"))),
          (this.toolbar = new Ta(n, o.width, !l)),
          (this.print = new pn(n)),
          e.children(this.toolbar.el, this.el, this.print.el),
          (this.data = n),
          (this.tableEl = a("canvas", "".concat(kt, "-table"))),
          (this.rowResizer = new St(!1, n.rows.height)),
          (this.colResizer = new St(!0, n.cols.minWidth)),
          (this.verticalScrollbar = new Et(!0)),
          (this.horizontalScrollbar = new Et(!1)),
          (this.editor = new fe(
            Fe,
            function () {
              return r.getTableOffset();
            },
            n.rows.height
          )),
          (this.modalValidation = new Ya()),
          (this.contextMenu = new gn(function () {
            return r.getRect();
          }, !c)),
          (this.selector = new qt(n)),
          (this.overlayerCEl = a(
            "div",
            "".concat(kt, "-overlayer-content")
          ).children(this.editor.el, this.selector.el)),
          (this.overlayerEl = a("div", "".concat(kt, "-overlayer")).child(
            this.overlayerCEl
          )),
          (this.sortFilter = new Ja()),
          this.el.children(
            this.tableEl,
            this.overlayerEl.el,
            this.rowResizer.el,
            this.colResizer.el,
            this.verticalScrollbar.el,
            this.horizontalScrollbar.el,
            this.contextMenu.el,
            this.modalValidation.el,
            this.sortFilter.el
          ),
          (this.table = new an(this.tableEl.el, n)),
          gl.call(this),
          al.call(this),
          nl.call(this, !1, 0, 0);
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "on",
            value: function (t, e) {
              return this.eventMap.on(t, e), this;
            },
          },
          {
            key: "trigger",
            value: function (t) {
              for (
                var e = this.eventMap,
                  n = arguments.length,
                  r = new Array(n > 1 ? n - 1 : 0),
                  i = 1;
                i < n;
                i++
              )
                r[i - 1] = arguments[i];
              e.fire(t, r);
            },
          },
          {
            key: "resetData",
            value: function (t) {
              this.editor.clear(),
                (this.data = t),
                il.call(this),
                ol.call(this),
                this.toolbar.resetData(t),
                this.print.resetData(t),
                this.selector.resetData(t),
                this.table.resetData(t);
            },
          },
          {
            key: "loadData",
            value: function (t) {
              return this.data.setData(t), al.call(this), this;
            },
          },
          {
            key: "freeze",
            value: function (t, e) {
              return this.data.setFreeze(t, e), al.call(this), this;
            },
          },
          {
            key: "undo",
            value: function () {
              this.data.undo(), al.call(this);
            },
          },
          {
            key: "redo",
            value: function () {
              this.data.redo(), al.call(this);
            },
          },
          {
            key: "reload",
            value: function () {
              return al.call(this), this;
            },
          },
          {
            key: "getRect",
            value: function () {
              var t = this.data;
              return { width: t.viewWidth(), height: t.viewHeight() };
            },
          },
          {
            key: "getTableOffset",
            value: function () {
              var t = this.data,
                e = t.rows,
                n = t.cols,
                r = this.getRect(),
                i = r.width,
                o = r.height;
              return {
                width: i - n.indexWidth,
                height: o - e.height,
                left: n.indexWidth,
                top: e.height,
              };
            },
          },
        ]) && Qa(e.prototype, n),
        r && Qa(e, r),
        t
      );
    })();
    function wl(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function kl(t) {
      return (kl =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
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
            })(t);
    }
    function Ol(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = new Array(t.length); e < t.length; e++)
              n[e] = t[e];
            return n;
          }
        })(t) ||
        (function (t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function Sl(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function xl(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function El(t, e, n) {
      return e && xl(t.prototype, e), n && xl(t, n), t;
    }
    function jl(t, e) {
      return !e || ("object" !== kl(e) && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function _l(t) {
      return (_l = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function Cl(t, e) {
      return (Cl =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var Tl = (function (t) {
        function e(t) {
          var n;
          Sl(this, e);
          var r = new Gt("ellipsis");
          return (
            ((n = jl(
              this,
              _l(e).call(this, r, "auto", !1, "top-left")
            )).contentClick = t),
            n
          );
        }
        return (
          (function (t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && Cl(t, e);
          })(e, In),
          El(e, [
            {
              key: "reset",
              value: function (t) {
                var e = this,
                  n = t.map(function (t, n) {
                    return a("div", "".concat(kt, "-item"))
                      .css("width", "150px")
                      .css("font-weight", "normal")
                      .on("click", function () {
                        e.contentClick(n), e.hide();
                      })
                      .child(t);
                  });
                this.setContentChildren.apply(this, Ol(n));
              },
            },
            { key: "setTitle", value: function () {} },
          ]),
          e
        );
      })(),
      Pl = [{ key: "delete", title: U("contextmenu.deleteSheet") }];
    function Al() {
      var t = this;
      return Pl.map(function (e) {
        return function (t) {
          var e = this;
          return a("div", "".concat(kt, "-item"))
            .child(t.title())
            .on("click", function () {
              e.itemClick(t.key), e.hide();
            });
        }.call(t, e);
      });
    }
    var Rl = (function () {
        function t() {
          var e;
          Sl(this, t),
            (this.el = (e = a("div", "".concat(kt, "-contextmenu")).css(
              "width",
              "160px"
            )).children
              .apply(e, Ol(Al.call(this)))
              .hide()),
            (this.itemClick = function () {});
        }
        return (
          El(t, [
            {
              key: "hide",
              value: function () {
                var t = this.el;
                t.hide(), bt(t);
              },
            },
            {
              key: "setOffset",
              value: function (t) {
                var e = this.el;
                e.offset(t), e.show(), gt(e);
              },
            },
          ]),
          t
        );
      })(),
      Il = (function () {
        function t() {
          var e = this,
            n =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : function () {},
            r =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : function () {},
            i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : function () {},
            o =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : function () {};
          Sl(this, t),
            (this.swapFunc = r),
            (this.updateFunc = o),
            (this.dataNames = []),
            (this.activeEl = null),
            (this.deleteEl = null),
            (this.items = []),
            (this.moreEl = new Tl(function (t) {
              e.clickSwap2(e.items[t]);
            })),
            (this.contextMenu = new Rl()),
            (this.contextMenu.itemClick = i),
            (this.el = a("div", "".concat(kt, "-bottombar")).children(
              this.contextMenu.el,
              (this.menuEl = a("ul", "".concat(kt, "-menu")).child(
                a("li", "").children(
                  new Gt("add").on("click", function () {
                    n();
                  }),
                  a("span", "").child(this.moreEl)
                )
              ))
            ));
        }
        return (
          El(t, [
            {
              key: "addItem",
              value: function (t, e) {
                var n = this;
                this.dataNames.push(t);
                var r = a("li", e ? "active" : "").child(t);
                r
                  .on("click", function () {
                    n.clickSwap2(r);
                  })
                  .on("contextmenu", function (t) {
                    var e = t.target,
                      i = e.offsetLeft,
                      o = e.offsetHeight;
                    n.contextMenu.setOffset({ left: i, bottom: o + 1 }),
                      (n.deleteEl = r);
                  })
                  .on("dblclick", function () {
                    var t = r.html(),
                      e = new Da("auto", "");
                    e.val(t),
                      e.input.on("blur", function (e) {
                        var r = e.target.value,
                          i = n.dataNames.findIndex(function (e) {
                            return e === t;
                          });
                        n.renameItem(i, r);
                      }),
                      r.html("").child(e.el),
                      e.focus();
                  }),
                  e && this.clickSwap(r),
                  this.items.push(r),
                  this.menuEl.child(r),
                  this.moreEl.reset(this.dataNames);
              },
            },
            {
              key: "renameItem",
              value: function (t, e) {
                this.dataNames.splice(t, 1, e),
                  this.moreEl.reset(this.dataNames),
                  this.items[t].html("").child(e),
                  this.updateFunc(t, e);
              },
            },
            {
              key: "clear",
              value: function () {
                var t = this;
                this.items.forEach(function (e) {
                  t.menuEl.removeChild(e.el);
                }),
                  (this.items = []),
                  (this.dataNames = []),
                  this.moreEl.reset(this.dataNames);
              },
            },
            {
              key: "deleteItem",
              value: function () {
                var t = this.activeEl,
                  e = this.deleteEl;
                if (this.items.length > 1) {
                  var n = this.items.findIndex(function (t) {
                    return t === e;
                  });
                  if (
                    (this.items.splice(n, 1),
                    this.dataNames.splice(n, 1),
                    this.menuEl.removeChild(e.el),
                    this.moreEl.reset(this.dataNames),
                    t === e)
                  ) {
                    var r = wl(this.items, 1)[0];
                    return (this.activeEl = r), this.activeEl.toggle(), [n, 0];
                  }
                  return [n, -1];
                }
                return [-1];
              },
            },
            {
              key: "clickSwap2",
              value: function (t) {
                var e = this.items.findIndex(function (e) {
                  return e === t;
                });
                this.clickSwap(t), this.activeEl.toggle(), this.swapFunc(e);
              },
            },
            {
              key: "clickSwap",
              value: function (t) {
                null !== this.activeEl && this.activeEl.toggle(),
                  (this.activeEl = t);
              },
            },
          ]),
          t
        );
      })();
    n(1);
    function Dl(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, l = t[Symbol.iterator]();
              !(r = (a = l.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function zl(t, e) {
      var n = Object.keys(t);
      return (
        Object.getOwnPropertySymbols &&
          n.push.apply(n, Object.getOwnPropertySymbols(t)),
        e &&
          (n = n.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
        n
      );
    }
    function Hl(t, e, n) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    }
    function Ml(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    n.d(e, "spreadsheet", function () {
      return Fl;
    });
    var Nl = (function () {
        function t(e) {
          var n = this,
            r =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          var i = e;
          (this.options = (function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = null != arguments[e] ? arguments[e] : {};
              e % 2
                ? zl(n, !0).forEach(function (e) {
                    Hl(t, e, n[e]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(n)
                  )
                : zl(n).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(n, e)
                    );
                  });
            }
            return t;
          })({ showBottomBar: !0 }, r)),
            (this.sheetIndex = 1),
            (this.datas = []),
            "string" == typeof e && (i = document.querySelector(e)),
            (this.bottombar = this.options.showBottomBar
              ? new Il(
                  function () {
                    var t = n.addSheet();
                    n.sheet.resetData(t);
                  },
                  function (t) {
                    var e = n.datas[t];
                    n.sheet.resetData(e);
                  },
                  function () {
                    n.deleteSheet();
                  },
                  function (t, e) {
                    n.datas[t].name = e;
                  }
                )
              : null),
            (this.data = this.addSheet());
          var o = a("div", "".concat(kt)).on("contextmenu", function (t) {
            return t.preventDefault();
          });
          i.appendChild(o.el),
            (this.sheet = new ml(o, this.data)),
            null !== this.bottombar && o.child(this.bottombar.el);
        }
        var e, n, r;
        return (
          (e = t),
          (r = [
            {
              key: "locale",
              value: function (t, e) {
                Y(t, e);
              },
            },
          ]),
          (n = [
            {
              key: "addSheet",
              value: function (t) {
                var e = this,
                  n =
                    !(arguments.length > 1 && void 0 !== arguments[1]) ||
                    arguments[1],
                  r = t || "sheet".concat(this.sheetIndex),
                  i = new pt(r, this.options);
                return (
                  (i.change = function () {
                    for (
                      var t, n = arguments.length, r = new Array(n), i = 0;
                      i < n;
                      i++
                    )
                      r[i] = arguments[i];
                    (t = e.sheet).trigger.apply(t, ["change"].concat(r));
                  }),
                  this.datas.push(i),
                  null !== this.bottombar && this.bottombar.addItem(r, n),
                  (this.sheetIndex += 1),
                  i
                );
              },
            },
            {
              key: "deleteSheet",
              value: function () {
                if (null !== this.bottombar) {
                  var t = Dl(this.bottombar.deleteItem(), 2),
                    e = t[0],
                    n = t[1];
                  e >= 0 &&
                    (this.datas.splice(e, 1),
                    n >= 0 && this.sheet.resetData(this.datas[n]));
                }
              },
            },
            {
              key: "loadData",
              value: function (t) {
                var e = Array.isArray(t) ? t : [t];
                if (
                  (null !== this.bottombar && this.bottombar.clear(),
                  (this.datas = []),
                  e.length > 0)
                )
                  for (var n = 0; n < e.length; n += 1) {
                    var r = e[n],
                      i = this.addSheet(r.name, 0 === n);
                    i.setData(r), 0 === n && this.sheet.resetData(i);
                  }
                return this;
              },
            },
            {
              key: "getData",
              value: function () {
                return this.datas.map(function (t) {
                  return t.getData();
                });
              },
            },
            {
              key: "cellText",
              value: function (t, e, n) {
                var r =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : 0;
                return this.datas[r].setCellText(t, e, n, "finished"), this;
              },
            },
            {
              key: "cell",
              value: function (t, e) {
                var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 0;
                return this.datas[n].getCell(t, e);
              },
            },
            {
              key: "cellStyle",
              value: function (t, e) {
                var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 0;
                return this.datas[n].getCellStyle(t, e);
              },
            },
            {
              key: "reRender",
              value: function () {
                return this.sheet.table.render(), this;
              },
            },
            {
              key: "on",
              value: function (t, e) {
                return this.sheet.on(t, e), this;
              },
            },
            {
              key: "validate",
              value: function () {
                return this.data.validations.errors.size <= 0;
              },
            },
            {
              key: "change",
              value: function (t) {
                return this.sheet.on("change", t), this;
              },
            },
          ]) && Ml(e.prototype, n),
          r && Ml(e, r),
          t
        );
      })(),
      Fl = function (t) {
        var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return new Nl(t, e);
      };
    window &&
      ((window.x_spreadsheet = Fl),
      (window.x_spreadsheet.locale = function (t, e) {
        return Y(t, e);
      }));
    e.default = Nl;
  },
]);
//# sourceMappingURL=xspreadsheet.js.map
