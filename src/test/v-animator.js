/* eslint-disable */
// simple animator for only set values in object
// doesn't set styles or attributes.

// use animator.set(object, values, options);
// if set function to animator.onanimation, it will be firing every animation updates
(function() {
  (function() {
    var div = document.createElement('div'),
    requestanimationframe = "requestAnimationFrame",
      prefixs = ["Webkit", "Moz", "O", "ms"],
      i,
      numprefixs = prefixs.length;
    
    if (!window[requestanimationframe]) {
      requestanimationframe = "RequestAnimationFrame";
      for (i = 0; i < numprefixs; i++) {
        if (window[prefixs[i] + requestanimationframe] !== undefined) {
          window.requestAnimationFrame =
            window[prefixs[i] + requestanimationframe];
          window.cancelAnimationFrame =
            window[prefixs[i] + "CancelAnimationFrame"];
          break;
        }
      }
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (function() {
        var lasttime = 0;
        return function(callback) {
          var currenttime = gettime();
          var timetocall = Math.max(0, 16 - (currenttime - lasttime));
          lasttime = currenttime + timetocall;
          return setTimeout(function() {
            callback(currenttime + timetocall);
          }, timetocall);
        };
      })();
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }

    div = null;
  })();

  function gettime() {
    return new Date().getTime();
  }

  // simple animator for only set value x/y
  var animator = (function() {
    var tweens = [],
      delayedtweens = [],
      fps = 60,
      _easing = "easeOutCubic",
      nowframe = 0,
      lastframe = 0,
      totalframes = 0,
      starttime = 0,
      playing = false,
      timer = null,
      timerdelay = 1000 / fps,
      // Convert to JS from "Robert Penner's Easing Functions" http://www.robertpenner.com/easing/
      easings = {
        linear: function(t, b, c, d) {
          return (c * t) / d + b;
        },
        easeInQuad: function(t, b, c, d) {
          return c * (t /= d) * t + b;
        },
        easeOutQuad: function(t, b, c, d) {
          return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function(t, b, c, d) {
          if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
          return (-c / 2) * (--t * (t - 2) - 1) + b;
        },
        easeOutInQuad: function(t, b, c, d) {
          if (t < d / 2) return easings.easeOutQuad(t * 2, b, c / 2, d);
          return easings.easeInQuad(t * 2 - d, b + c / 2, c / 2, d);
        },
        easeInCubic: function(t, b, c, d) {
          return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function(t, b, c, d) {
          return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function(t, b, c, d) {
          if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
          return (c / 2) * ((t -= 2) * t * t + 2) + b;
        },
        easeOutInCubic: function(t, b, c, d) {
          if (t < d / 2) return easings.easeOutCubic(t * 2, b, c / 2, d);
          return easings.easeInCubic(t * 2 - d, b + c / 2, c / 2, d);
        },
        easeInQuart: function(t, b, c, d) {
          return c * (t /= d) * t * t * t + b;
        },
        easeOutQuart: function(t, b, c, d) {
          return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOutQuart: function(t, b, c, d) {
          if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
          return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
        },
        easeOutInQuart: function(t, b, c, d) {
          if (t < d / 2) return easings.easeOutQuart(t * 2, b, c / 2, d);
          return easings.easeInQuart(t * 2 - d, b + c / 2, c / 2, d);
        },
        easeInQuint: function(t, b, c, d) {
          return c * (t /= d) * t * t * t * t + b;
        },
        easeOutQuint: function(t, b, c, d) {
          return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function(t, b, c, d) {
          if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
          return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
        },
        easeOutInQuint: function(t, b, c, d) {
          if (t < d / 2) return easings.easeOutQuint(t * 2, b, c / 2, d);
          return easings.easeInQuint(t * 2 - d, b + c / 2, c / 2, d);
        },
        easeInSine: function(t, b, c, d) {
          return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function(t, b, c, d) {
          return c * Math.sin((t / d) * (Math.PI / 2)) + b;
        },
        easeInOutSine: function(t, b, c, d) {
          return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
        },
        easeOutInSine: function(t, b, c, d) {
          if (t < d / 2) return easings.easeOutSine(t * 2, b, c / 2, d);
          return easings.easeInSine(t * 2 - d, b + c / 2, c / 2, d);
        },
        easeInExpo: function(t, b, c, d) {
          return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b - c * 0.001;
        },
        easeOutExpo: function(t, b, c, d) {
          return t == d
            ? b + c
            : c * 1.001 * (-Math.pow(2, (-10 * t) / d) + 1) + b;
        },
        easeInOutExpo: function(t, b, c, d) {
          if (t == 0) return b;
          if (t == d) return b + c;
          if ((t /= d / 2) < 1)
            return (c / 2) * Math.pow(2, 10 * (t - 1)) + b - c * 0.0005;
          return (c / 2) * 1.0005 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeOutInExpo: function(t, b, c, d) {
          if (t < d / 2) return easings.easeOutExpo(t * 2, b, c / 2, d);
          return easings.easeInExpo(t * 2 - d, b + c / 2, c / 2, d);
        },
        easeInCirc: function(t, b, c, d) {
          return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOutCirc: function(t, b, c, d) {
          return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOutCirc: function(t, b, c, d) {
          if ((t /= d / 2) < 1)
            return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
          return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        easeOutInCirc: function(t, b, c, d) {
          if (t < d / 2) return easings.easeOutCirc(t * 2, b, c / 2, d);
          return easings.easeInCirc(t * 2 - d, b + c / 2, c / 2, d);
        },
        easeInElastic: function(t, b, c, d, a, p) {
          if (!t) return b;
          if ((t /= d) == 1) return b + c;
          var s,
            p = !p || typeof p != "number" ? d * 0.3 : p,
            a = !a || typeof a != "number" ? 0 : a;
          if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
          } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
          return (
            -(
              a *
              Math.pow(2, 10 * (t -= 1)) *
              Math.sin(((t * d - s) * (2 * Math.PI)) / p)
            ) + b
          );
        },
        easeOutElastic: function(t, b, c, d, a, p) {
          if (!t) return b;
          if ((t /= d) == 1) return b + c;
          var s,
            p = !p || typeof p != "number" ? d * 0.3 : p,
            a = !a || typeof a != "number" ? 0 : a;
          if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
          } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
          return (
            a *
              Math.pow(2, -10 * t) *
              Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
            c +
            b
          );
        },
        easeInOutElastic: function(t, b, c, d, a, p) {
          if (t == 0) return b;
          if ((t /= d / 2) == 2) return b + c;
          var s,
            p = d * (0.3 * 1.5),
            a = 0;
          var s,
            p = !p || typeof p != "number" ? d * (0.3 * 1.5) : p,
            a = !a || typeof a != "number" ? 0 : a;
          if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
          } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
          if (t < 1)
            return (
              -0.5 *
                (a *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
              b
            );
          return (
            a *
              Math.pow(2, -10 * (t -= 1)) *
              Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
              0.5 +
            c +
            b
          );
        },
        easeOutInElastic: function(t, b, c, d, a, p) {
          if (t < d / 2)
            return easings.easeOutElastic(t * 2, b, c / 2, d, a, p);
          return easings.easeInElastic(t * 2 - d, b + c / 2, c / 2, d, a, p);
        },
        easeInBack: function(t, b, c, d, s) {
          var s = !s || typeof s != "number" ? 1.70158 : s;
          return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOutBack: function(t, b, c, d, s) {
          var s = !s || typeof s != "number" ? 1.70158 : s;
          return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOutBack: function(t, b, c, d, s) {
          var s = !s || typeof s != "number" ? 1.70158 : s;
          if ((t /= d / 2) < 1)
            return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
          return (
            (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
          );
        },
        easeOutInBack: function(t, b, c, d, s) {
          if (t < d / 2) return easings.easeOutBack(t * 2, b, c / 2, d, s);
          return easings.easeInBack(t * 2 - d, b + c / 2, c / 2, d, s);
        },
        easeInBounce: function(t, b, c, d) {
          return c - easings.easeOutBounce(d - t, 0, c, d) + b;
        },
        easeOutBounce: function(t, b, c, d) {
          if ((t /= d) < 1 / 2.75) return c * (7.5625 * t * t) + b;
          else if (t < 2 / 2.75)
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
          else if (t < 2.5 / 2.75)
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
          else return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        },
        easeInOutBounce: function(t, b, c, d) {
          if (t < d / 2) return easings.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
          else
            return (
              easings.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
            );
        },
        easeOutInBounce: function(t, b, c, d) {
          if (t < d / 2) return easings.easeOutBounce(t * 2, b, c / 2, d);
          return easings.easeInBounce(t * 2 - d, b + c / 2, c / 2, d);
        },
      },
      beziereasings = {};

    function set(target, property, option) {
      var frames,
        easing,
        tween,
        p,
        fromvalues,
        tovalues,
        tween,
        stopedindex,
        animatable = false;

      if (option.delay) {
        frames = Math.round((fps * option.delay) / 1000);
        delete option.delay;
        delayedtweens.push([nowframe + frames, target, property, option]);
      } else {
        frames = Math.round((fps * option.duration) / 1000);
        if (option.easing.constructor === Array) {
          easing = option.easing.join("");
          if (beziereasings[easing]) {
            easing = beziereasings[easing];
          } else {
            easing = beziereasings[easing] = BezierEasing.apply(
              null,
              option.easing
            );
          }
        } else {
          easing = easings[option.easing] || easings[_easing];
          easing.p = 1;
        }

        fromvalues = {};
        tovalues = {};
        for (p in property) {
          if (target[p] != property[p]) {
            fromvalues[p] = target[p];
            tovalues[p] = property[p];
            animatable = true;
          }
        }

        if (!animatable) {
          return false;
        }

        tween = {
          tg: target,
          fv: fromvalues,
          tv: tovalues,
          sf: nowframe,
          tf: frames,
          ea: easing,
          eu: option.onupdate,
          ee: option.onend,
          dd: false,
        };

        stopedindex = stop(target);
        if (stopedindex != -1) {
          tweens[stopedindex] = tween;
        } else {
          tweens.push(tween);
        }
      }

      totalframes = Math.max(totalframes, nowframe + frames + fps);

      if (!playing) {
        starttime = gettime();
        timer = window.requestAnimationFrame(action);
        playing = true;
      }
    }

    function stop(target) {
      var i = 0,
        numtweens = tweens.length;
      for (; i < numtweens; i++) {
        if (tweens[i].tg == target) {
          return i;
        }
      }
      return -1;
    }

    function checkdelayedtweens() {
      var i = 0,
        numdelayedtweens = delayedtweens.length;
      for (; i < numdelayedtweens; i++) {
        if (nowframe >= delayedtweens[i][0]) {
          delayedtweens[i].shift();
          set.apply(null, delayedtweens[i]);
          delayedtweens.splice(i, 1);
          numdelayedtweens--;
          i--;
        }
      }
    }

    function action() {
      lastframe = nowframe;
      nowframe = Math.floor((gettime() - starttime) / timerdelay);
      if (nowframe - lastframe > fps) {
        // after deactive tab
        nowframe = lastframe + 1;
        starttime = gettime() - nowframe * timerdelay;
      }
      if (totalframes > nowframe) {
        checkdelayedtweens();
        setproperties(nowframe);
        timer = window.requestAnimationFrame(action);
        animator.onanimation && animator.onanimation();
      } else {
        window.cancelAnimationFrame(timer);
        setproperties(totalframes);
        nowframe = totalframes = 0;
        tweens = [];
        playing = false;
      }
    }

    function setproperties(step) {
      var tween,
        mystep,
        myframes,
        p,
        i = 0,
        numtweens = tweens.length;

      for (; i < numtweens; i++) {
        tween = tweens[i];
        if (step >= tween.sf && !tween.dd) {
          myframes = tween.tf - 1;
          mystep = Math.min(myframes, step - tween.sf);
          if (mystep > -1) {
            for (p in tween.fv) {
              tween.tg[p] = getvalue(
                tween.ea,
                tween.fv[p],
                tween.tv[p],
                mystep,
                myframes
              );
            }
            tween.eu &&
              tween.eu.call(
                tween.tg,
                geteventvalue(tween, "update", mystep, myframes)
              );
            if (mystep == myframes) {
              tween.ee &&
                tween.ee.call(
                  tween.tg,
                  geteventvalue(tween, "end", mystep, myframes)
                );
              tween.dd = true;
            }
          }
        }
      }
    }

    function getvalue(easing, from, to, step, totalstep) {
      if (easing.p) {
        return easing(step, from, to - from, totalstep);
      } else {
        return from + (to - from) * easing(step / totalstep);
      }
    }

    function geteventvalue(tween, type, step, totalstep) {
      return { type: type, progress: step / totalstep };
    }

    return { set: set, stop: stop, easings: easings };
  })();

  window.animator = animator;
})();

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */
(function(definition) {
  if (typeof exports === "object") {
    module.exports = definition();
  } else if (typeof define === "function" && define.amd) {
    define([], definition);
  } else {
    window.BezierEasing = definition();
  }
})(function() {
  // These values are established by empiricism with tests (tradeoff: performance VS precision)
  var NEWTON_ITERATIONS = 4;
  var NEWTON_MIN_SLOPE = 0.001;
  var SUBDIVISION_PRECISION = 0.0000001;
  var SUBDIVISION_MAX_ITERATIONS = 10;

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  var float32ArraySupported = "Float32Array" in window;

  function A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
  }

  function B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1;
  }

  function C(aA1) {
    return 3.0 * aA1;
  }

  // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }

  // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
  function getSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  function binarySubdivide(aX, aA, aB) {
    var currentX,
      currentT,
      i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
    return currentT;
  }

  function BezierEasing(mX1, mY1, mX2, mY2) {
    // Validate arguments
    console.log("--test--")
    console.log(arguments)
    console.log(mX1, mY1, mX2, mY2)
    if (arguments.length !== 4) {
      throw new Error("BezierEasing requires 4 arguments.");
    }
    for (var i = 0; i < 4; ++i) {
      if (
        typeof arguments[i] !== "number" ||
        isNaN(arguments[i]) ||
        !isFinite(arguments[i])
      ) {
        throw new Error("BezierEasing arguments should be integers.");
      }
    }
    if (mX1 < 0 || mX1 > 1 || mX2 < 0 || mX2 > 1) {
      throw new Error("BezierEasing x values must be in [0, 1] range.");
    }

    var mSampleValues = float32ArraySupported
      ? new Float32Array(kSplineTableSize)
      : new Array(kSplineTableSize);

    function newtonRaphsonIterate(aX, aGuessT) {
      for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) return aGuessT;
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }
      return aGuessT;
    }

    function calcSampleValues() {
      for (var i = 0; i < kSplineTableSize; ++i) {
        mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }

    function getTForX(aX) {
      var intervalStart = 0.0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (
        ;
        currentSample != lastSample && mSampleValues[currentSample] <= aX;
        ++currentSample
      ) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;

      // Interpolate to provide an initial guess for t
      var dist =
        (aX - mSampleValues[currentSample]) /
        (mSampleValues[currentSample + 1] - mSampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;

      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(
          aX,
          intervalStart,
          intervalStart + kSampleStepSize
        );
      }
    }

    var _precomputed = false;

    function precompute() {
      _precomputed = true;
      if (mX1 != mY1 || mX2 != mY2) calcSampleValues();
    }

    var f = function(aX) {
      if (!_precomputed) precompute();
      if (mX1 === mY1 && mX2 === mY2) return aX; // linear
      // Because JavaScript number are imprecise, we should guarantee the extremes are right.
      if (aX === 0) return 0;
      if (aX === 1) return 1;
      return calcBezier(getTForX(aX), mY1, mY2);
    };

    f.getControlPoints = function() {
      return [
        {
          x: mX1,
          y: mY1,
        },
        {
          x: mX2,
          y: mY2,
        },
      ];
    };

    var args = [mX1, mY1, mX2, mY2];
    var str = "BezierEasing(" + args + ")";
    f.toString = function() {
      return str;
    };

    var css = "cubic-bezier(" + args + ")";
    f.toCSS = function() {
      return css;
    };

    return f;
  }

  // CSS mapping
  BezierEasing.css = {
    ease: BezierEasing(0.25, 0.1, 0.25, 1.0),
    linear: BezierEasing(0.0, 0.0, 1.0, 1.0),
    "ease-in": BezierEasing(0.42, 0.0, 1.0, 1.0),
    "ease-out": BezierEasing(0.0, 0.0, 0.58, 1.0),
    "ease-in-out": BezierEasing(0.42, 0.0, 0.58, 1.0),
  };

  return BezierEasing;
});
