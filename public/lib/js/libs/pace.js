/*! pace 0.4.15 */
(function () {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = [].slice, P = {}.hasOwnProperty, Q = function (a, b) {
        function c() {
            this.constructor = a
        }

        for (var d in b)P.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
    }, R = [].indexOf || function (a) {
        for (var b = 0, c = this.length; c > b; b++)if (b in this && this[b] === a)return b;
        return-1
    };
    s = {catchupTime: 500, initialRate: .03, minTime: 500, ghostTime: 250, maxProgressPerFrame: 10, easeFactor: 1.25, startOnPageLoad: !0, restartOnPushState: !0, restartOnRequestAfter: 500, target: "body", elements: {checkInterval: 100, selectors: ["body"]}, eventLag: {minSamples: 10, sampleCount: 3, lagThreshold: 3}, ajax: {trackMethods: ["GET"], trackWebSockets: !1}}, z = function () {
        var a;
        return null != (a = "undefined" != typeof performance && null !== performance ? "function" == typeof performance.now ? performance.now() : void 0 : void 0) ? a : +new Date
    }, B = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, r = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == B && (B = function (a) {
        return setTimeout(a, 50)
    }, r = function (a) {
        return clearTimeout(a)
    }), D = function (a) {
        var b, c;
        return b = z(), c = function () {
            var d;
            return d = z() - b, b = z(), a(d, function () {
                return B(c)
            })
        }, c()
    }, C = function () {
        var a, b, c;
        return c = arguments[0], b = arguments[1], a = 3 <= arguments.length ? O.call(arguments, 2) : [], "function" == typeof c[b] ? c[b].apply(c, a) : c[b]
    }, t = function () {
        var a, b, c, d, e, f, g;
        for (b = arguments[0], d = 2 <= arguments.length ? O.call(arguments, 1) : [], f = 0, g = d.length; g > f; f++)if (c = d[f])for (a in c)P.call(c, a) && (e = c[a], null != b[a] && "object" == typeof b[a] && null != e && "object" == typeof e ? t(b[a], e) : b[a] = e);
        return b
    }, o = function (a) {
        var b, c, d, e, f;
        for (c = b = 0, e = 0, f = a.length; f > e; e++)d = a[e], c += Math.abs(d), b++;
        return c / b
    }, v = function (a, b) {
        var c, d, e;
        if (null == a && (a = "options"), null == b && (b = !0), e = document.querySelector("[data-pace-" + a + "]")) {
            if (c = e.getAttribute("data-pace-" + a), !b)return c;
            try {
                return JSON.parse(c)
            } catch (f) {
                return d = f, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", d) : void 0
            }
        }
    }, null == window.Pace && (window.Pace = {}), A = Pace.options = t(s, window.paceOptions, v()), h = function (a) {
        function b() {
            return M = b.__super__.constructor.apply(this, arguments)
        }

        return Q(b, a), b
    }(Error), b = function () {
        function a() {
            this.progress = 0
        }

        return a.prototype.getElement = function () {
            var a;
            if (null == this.el) {
                if (a = document.querySelector(A.target), !a)throw new h;
                this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace("pace-done", ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != a.firstChild ? a.insertBefore(this.el, a.firstChild) : a.appendChild(this.el)
            }
            return this.el
        }, a.prototype.finish = function () {
            var a;
            return a = this.getElement(), a.className = a.className.replace("pace-active", ""), a.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
        }, a.prototype.update = function (a) {
            return this.progress = a, this.render()
        }, a.prototype.destroy = function () {
            return this.getElement().parentNode.removeChild(this.getElement()), this.el = void 0
        }, a.prototype.render = function () {
            var a, b;
            return null == document.querySelector(A.target) ? !1 : (a = this.getElement(), a.children[0].style.width = "" + this.progress + "%", (!this.lastRenderedProgress || 0 | (this.lastRenderedProgress | 0 !== this.progress)) && (a.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? b = "99" : (b = this.progress < 10 ? "0" : "", b += 0 | this.progress), a.children[0].setAttribute("data-progress", "" + b)), this.lastRenderedProgress = this.progress)
        }, a.prototype.done = function () {
            return this.progress >= 100
        }, a
    }(), g = function () {
        function a() {
            this.bindings = {}
        }

        return a.prototype.trigger = function (a, b) {
            var c, d, e, f, g;
            if (null != this.bindings[a]) {
                for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++)c = f[d], g.push(c.call(this, b));
                return g
            }
        }, a.prototype.on = function (a, b) {
            var c;
            return null == (c = this.bindings)[a] && (c[a] = []), this.bindings[a].push(b)
        }, a
    }(), J = window.XMLHttpRequest, I = window.XDomainRequest, H = window.WebSocket, u = function (a, b) {
        var c, d, e, f;
        f = [];
        for (d in b.prototype)try {
            e = b.prototype[d], null == a[d] && "function" != typeof e ? f.push(a[d] = e) : f.push(void 0)
        } catch (g) {
            c = g
        }
        return f
    }, i = function (a) {
        function b() {
            var a, c = this;
            b.__super__.constructor.apply(this, arguments), a = function (a) {
                var b;
                return b = a.open, a.open = function (d, e) {
                    var f;
                    return f = (null != d ? d : "GET").toUpperCase(), R.call(A.ajax.trackMethods, f) >= 0 && c.trigger("request", {type: d, url: e, request: a}), b.apply(a, arguments)
                }
            }, window.XMLHttpRequest = function (b) {
                var c;
                return c = new J(b), a(c), c
            }, u(window.XMLHttpRequest, J), null != I && (window.XDomainRequest = function () {
                var b;
                return b = new I, a(b), b
            }, u(window.XDomainRequest, I)), null != H && A.ajax.trackWebSockets && (window.WebSocket = function (a, b) {
                var d;
                return d = new H(a, b), c.trigger("request", {type: "socket", url: a, protocols: b, request: d}), d
            }, u(window.WebSocket, H))
        }

        return Q(b, a), b
    }(g), K = null, w = function () {
        return null == K && (K = new i), K
    }, A.restartOnRequestAfter !== !1 && w().on("request", function (b) {
        var c, d, e;
        return e = b.type, d = b.request, Pace.running ? void 0 : (c = arguments, setTimeout(function () {
            var b, f, g, h, i, j, k;
            if (f = "socket" === e ? d.readyState < 2 : 0 < (i = d.readyState) && 4 > i) {
                for (Pace.restart(), j = Pace.sources, k = [], g = 0, h = j.length; h > g; g++) {
                    if (b = j[g], b instanceof a) {
                        b.watch.apply(b, c);
                        break
                    }
                    k.push(void 0)
                }
                return k
            }
        }, A.restartOnRequestAfter))
    }), a = function () {
        function a() {
            var a = this;
            this.elements = [], w().on("request", function () {
                return a.watch.apply(a, arguments)
            })
        }

        return a.prototype.watch = function (a) {
            var b, c, d;
            return d = a.type, b = a.request, c = "socket" === d ? new l(b) : new m(b), this.elements.push(c)
        }, a
    }(), m = function () {
        function a(a) {
            var b, c, d, e, f, g, h = this;
            if (this.progress = 0, null != window.ProgressEvent)for (c = null, a.addEventListener("progress", function (a) {
                return h.progress = a.lengthComputable ? 100 * a.loaded / a.total : h.progress + (100 - h.progress) / 2
            }), g = ["load", "abort", "timeout", "error"], d = 0, e = g.length; e > d; d++)b = g[d], a.addEventListener(b, function () {
                return h.progress = 100
            }); else f = a.onreadystatechange, a.onreadystatechange = function () {
                var b;
                return 0 === (b = a.readyState) || 4 === b ? h.progress = 100 : 3 === a.readyState && (h.progress = 50), "function" == typeof f ? f.apply(null, arguments) : void 0
            }
        }

        return a
    }(), l = function () {
        function a(a) {
            var b, c, d, e, f = this;
            for (this.progress = 0, e = ["error", "open"], c = 0, d = e.length; d > c; c++)b = e[c], a.addEventListener(b, function () {
                return f.progress = 100
            })
        }

        return a
    }(), d = function () {
        function a(a) {
            var b, c, d, f;
            for (null == a && (a = {}), this.elements = [], null == a.selectors && (a.selectors = []), f = a.selectors, c = 0, d = f.length; d > c; c++)b = f[c], this.elements.push(new e(b))
        }

        return a
    }(), e = function () {
        function a(a) {
            this.selector = a, this.progress = 0, this.check()
        }

        return a.prototype.check = function () {
            var a = this;
            return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
                return a.check()
            }, A.elements.checkInterval)
        }, a.prototype.done = function () {
            return this.progress = 100
        }, a
    }(), c = function () {
        function a() {
            var a, b, c = this;
            this.progress = null != (b = this.states[document.readyState]) ? b : 100, a = document.onreadystatechange, document.onreadystatechange = function () {
                return null != c.states[document.readyState] && (c.progress = c.states[document.readyState]), "function" == typeof a ? a.apply(null, arguments) : void 0
            }
        }

        return a.prototype.states = {loading: 0, interactive: 50, complete: 100}, a
    }(), f = function () {
        function a() {
            var a, b, c, d, e, f = this;
            this.progress = 0, a = 0, e = [], d = 0, c = z(), b = setInterval(function () {
                var g;
                return g = z() - c - 50, c = z(), e.push(g), e.length > A.eventLag.sampleCount && e.shift(), a = o(e), ++d >= A.eventLag.minSamples && a < A.eventLag.lagThreshold ? (f.progress = 100, clearInterval(b)) : f.progress = 100 * (3 / (a + 3))
            }, 50)
        }

        return a
    }(), k = function () {
        function a(a) {
            this.source = a, this.last = this.sinceLastUpdate = 0, this.rate = A.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = C(this.source, "progress"))
        }

        return a.prototype.tick = function (a, b) {
            var c;
            return null == b && (b = C(this.source, "progress")), b >= 100 && (this.done = !0), b === this.last ? this.sinceLastUpdate += a : (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / A.catchupTime, this.sinceLastUpdate = 0, this.last = b), b > this.progress && (this.progress += this.catchup * a), c = 1 - Math.pow(this.progress / 100, A.easeFactor), this.progress += c * this.rate * a, this.progress = Math.min(this.lastProgress + A.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
        }, a
    }(), F = null, E = null, p = null, G = null, n = null, q = null, Pace.running = !1, x = function () {
        return A.restartOnPushState ? Pace.restart() : void 0
    }, null != window.history.pushState && (L = window.history.pushState, window.history.pushState = function () {
        return x(), L.apply(window.history, arguments)
    }), null != window.history.replaceState && (N = window.history.replaceState, window.history.replaceState = function () {
        return x(), N.apply(window.history, arguments)
    }), j = {ajax: a, elements: d, document: c, eventLag: f}, (y = function () {
        var a, c, d, e, f, g, h, i, l;
        for (Pace.sources = F = [], h = ["ajax", "elements", "document", "eventLag"], d = 0, f = h.length; f > d; d++)c = h[d], A[c] !== !1 && F.push(new j[c](A[c]));
        for (l = null != (i = A.extraSources) ? i : [], e = 0, g = l.length; g > e; e++)a = l[e], F.push(new a(A));
        return Pace.bar = p = new b, E = [], G = new k
    })(), Pace.stop = function () {
        return Pace.running = !1, p.destroy(), q = !0, null != n && ("function" == typeof r && r(n), n = null), y()
    }, Pace.restart = function () {
        return Pace.stop(), Pace.go()
    }, Pace.go = function () {
        return Pace.running = !0, p.render(), q = !1, n = D(function (a, b) {
            var c, d, e, f, g, h, i, j, l, m, n, o, r, s, t, u, v, w;
            for (j = 100 - p.progress, d = r = 0, e = !0, h = s = 0, u = F.length; u > s; h = ++s)for (n = F[h], m = null != E[h] ? E[h] : E[h] = [], g = null != (w = n.elements) ? w : [n], i = t = 0, v = g.length; v > t; i = ++t)f = g[i], l = null != m[i] ? m[i] : m[i] = new k(f), e &= l.done, l.done || (d++, r += l.tick(a));
            return c = r / d, p.update(G.tick(a, c)), o = z(), p.done() || e || q ? (p.update(100), setTimeout(function () {
                return p.finish(), Pace.running = !1
            }, Math.max(A.ghostTime, Math.min(A.minTime, z() - o)))) : b()
        })
    }, Pace.start = function (a) {
        t(A, a), Pace.running = !0;
        try {
            p.render()
        } catch (b) {
            h = b
        }
        return document.querySelector(".pace") ? Pace.go() : setTimeout(Pace.start, 50)
    }, "function" == typeof define && define.amd ? define(function () {
        return Pace
    }) : "object" == typeof exports ? module.exports = Pace : A.startOnPageLoad && Pace.start()
}).call(this);