// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const createSandboxMath = () => {
  const sandboxMath: any = { pow: Math.pow, random: Math.random };

  (function (a: any, b: any, c: any, d: any, e: any, f: any) {
    function k(a: any) {
      var b,
        c = a.length,
        e: any = this,
        f = 0,
        g = (e.i = e.j = 0),
        h = (e.S = []);
      for (c || (a = [c++]); d > f; ) h[f] = f++;
      for (f = 0; d > f; f++)
        ((h[f] = h[(g = j & (g + a[f % c] + (b = h[f])))]), (h[g] = b));
      (e.g = function (a: any) {
        for (var b, c = 0, f = e.i, g = e.j, h = e.S; a--; )
          ((b = h[(f = j & (f + 1))]),
            (c = c * d + h[j & ((h[f] = h[(g = j & (g + b))]) + (h[g] = b))]));
        return ((e.i = f), (e.j = g), c);
      })(d);
    }
    function l(a: any, b: any) {
      var e,
        c: any = [],
        d = (typeof a)[0];
      if (b && "o" == d)
        for (e in a)
          try {
            c.push(l(a[e], b - 1));
          } catch (f) {}
      return c.length ? c : "s" == d ? a : a + "\0";
    }
    function m(a: any, b: any) {
      for (var d, c = a + "", e = 0; c.length > e; )
        b[j & e] = j & ((d ^= 19 * b[j & e]) + c.charCodeAt(e++));
      return o(b);
    }
    function n(c?: any) {
      try {
        return (a.crypto.getRandomValues((c = new Uint8Array(d))), o(c));
      } catch (e) {
        return [+new Date(), a, a.navigator.plugins, a.screen, o(b)];
      }
    }
    function o(a: any) {
      return String.fromCharCode.apply(0, a as any);
    }
    var g = c.pow(d, e),
      h = c.pow(2, f),
      i = 2 * h,
      j = d - 1;
    ((c.seedrandom = function (a: any, f?: any) {
      var j: any = [],
        p = m(l(f ? [a, o(b)] : 0 in arguments ? a : n(), 3), j),
        q = new (k as any)(j);
      return (
        m(o(q.S), b),
        (c.random = function () {
          for (var a = q.g(e), b = g, c = 0; h > a; )
            ((a = (a + c) * d), (b *= d), (c = q.g(1)));
          for (; a >= i; ) ((a /= 2), (b /= 2), (c >>>= 1));
          return (a + c) / b;
        }),
        p
      );
    }),
      m(c.random(), b));
  })(window, [], sandboxMath, 256, 6, 52);

  return sandboxMath;
};

export const Math2 = createSandboxMath();
