/* eslint-disable */

export default function (imgs) {

  var
    canvas = document.querySelector('#canvas'),
    context = canvas.getContext('2d'),
    
    shapecanvas = document.createElement('canvas'),
    shapecontext = shapecanvas.getContext('2d'),
    shapecanvasscale = 1,
    shapedata = null,

    areawidth = 0,
    areaheight = 0,

    canvaswidth = 1920,
    canvasheight = 1080,
    halfcanvaswidth = canvaswidth / 2,
    halfcanvasheight = canvasheight / 2,

    fontsize = 150,
    fontweight = 600,
    fontheight = fontsize * 0.72,
    fontx = 0,
    fonty = 0,
    textwidth = 0,

    gridsize = 6,
    dotsize = 6,

    scale = 1,
    scaleratio = 1,

    _pointerx = -1,
    _pointery = -1,

    canvasposition = {},

    twopi = Math.PI * 2,
    shapes = imgs,
    currentshape = '',

    colored = false,
    colorcheck = document.querySelector('#colored-check'),

    buttonbox = document.querySelector('#options'),
    buttons = [],

    started = false,

    i;


  // test
  // shapecanvas.style.cssText = 'position: absolute; left: 0; top: 0; background: #f60; opacity: 0.5; pointer-events: none;';
  // document.body.appendChild(shapecanvas);

  for (i = 0; i < shapes.length; i++) {
    buttons[i] = document.createElement('button');
    buttons[i].type = 'button';
    buttons[i].setAttribute('data-index', i);
    buttons[i].addEventListener('click', change);
    buttons[i].setAttribute("id", i)
    if (!i) {
      buttons[i].className = 'on';
    }
    buttonbox.appendChild(buttons[i]);

    if (shapes[i].indexOf('./') != -1) {
      buttons[i].innerHTML = '<img src="' + shapes[i] + '" alt="">';
      shapes[i] = (function (src) {
        var image = new Image();
        image.src = src;
        image.crossOrigin = "";
        image.id = `image${i}`;
        return image;
      })(shapes[i]);
    } else {
      buttons[i].innerHTML = shapes[i];
    }

  }

  setTimeout(() => {
    document.getElementById("1").click()
  }, 2000)

  buttonbox.appendChild(buttonbox.querySelector('.color-check'));

  colorcheck.addEventListener('change', function () {
    colored = this.checked;
  }, false);

  // ready to font load
  shapecontext.font = fontweight + ' ' + fontsize + 'px Exo';
  shapecontext.fillText('asdf', 0, 0);

  animator.onanimation = function () {
    particles.draw();
  };


  canvas.addEventListener('mousemove', function (e) {
    _pointerx = e.clientX;
    _pointery = e.clientY;
    particles.annoying();
  }, false);
  canvas.addEventListener('mouseleave', function (e) {
    particles.stopannoying();
  }, false);

  canvas.addEventListener('touchstart', (function () {
    function move(e) {
      _pointerx = e.touches[0].pageX;
      _pointery = e.touches[0].pageY;
      particles.annoying();
      e.preventDefault();
    }
    function end() {
      particles.stopannoying();
      canvas.removeEventListener('touchmove', move, false);
      canvas.removeEventListener('touchend', end, false);
    }
    return function (e) {
      canvas.addEventListener('touchmove', move, false);
      canvas.addEventListener('touchend', end, false);
      move.call(this, e);
    }
  })(), false);

  window.addEventListener('resize', resize);



  var particles = (function () {

    var items = [],
      numitems = 0, numprevitems = 0,
      animationoptions = {
        appear: { duration: 1000, easing: [0.175, 0.885, 0.275, 1.175], onend: breath },
        rumble: { duration: 1000, easing: [0.665, 0.240, 0.175, 1], onend: itemreposition },
        reposition: { duration: 1250, easing: [0.770, 0.000, 0.175, 1], onend: breath },
        breath: { easing: 'easetOutCirc', onend: breath },
        remove: { easing: 'easeOutSine', onend: removeitem },
        decoappear: { easing: 'easeOutCirc', onend: repositiondecos },
        decoreposition: { easing: 'easeInOutSine', onend: repositiondecos }
      },
      i, j;

    canvas.width = canvaswidth;
    canvas.height = canvasheight;

    function draw() {

      var maxitems = Math.max(numitems, numprevitems),
        item, relatedpercent;

      // canvas.width = canvaswidth;
      // canvas.height = canvasheight;

      // context.fillStyle = '#222';
      // context.fillRect(0, 0, canvaswidth, canvasheight);
      context.clearRect(0, 0, canvaswidth, canvasheight);

      for (i = 0; i < maxitems; i++) {
        item = items[i];
        if (item) {
          relatedpercent = 0.125;
          item.rx += (item.vx - item.rx) * relatedpercent;
          item.ry += (item.vy - item.ry) * relatedpercent;
          context.beginPath();
          context.arc(item.x + item.rx, item.y + item.ry, (dotsize / 2) * item.s, 0, twopi);
          context.closePath();
          context.fillStyle = 'rgba(' + Math.round(item.r) + ', ' + Math.round(item.g) + ', ' + Math.round(item.b) + ', ' + item.a + ')';
          context.fill();
        }
      }

    }

    function annoying() {

      var pointerx = (_pointerx - canvasposition.left) * scaleratio,
        pointery = (_pointery - canvasposition.top) * scaleratio,
        pointerdistance,
        distance, distancex, distancey, direction,
        item, maxitems = Math.max(numitems, numprevitems);

      for (i = 0; i < maxitems; i++) {
        item = items[i];
        if (item) {
          if (pointerx > -1) {
            pointerdistance = PAGES.browser.touchbased ? item.f == 1 ? 200 : 350 : item.f == 1 ? 75 : 250;
            distancex = pointerx - item.x;
            distancey = pointery - item.y;
            distance = Math.sqrt(distancex * distancex + distancey * distancey);
            if (pointerdistance > distance) {
              direction = Math.atan2(distancey, distancex);
              distance = distance - pointerdistance;
              item.vx = Math.cos(direction) * distance;
              item.vy = Math.sin(direction) * distance;
            } else {
              item.vx = item.vy = 0;
            }
          } else {
            item.vx = item.vy = 0;
          }
        }
      }

    }

    function stopannoying() {
      _pointerx = _pointery = -1;
      annoying();
    }

    function createitem(index) {
      return getvalues({ i: index, vx: 0, vy: 0, rx: 0, ry: 0 }, null, null, null, 0);
    }

    function rumble() {
      items.sort(randomsort);
      reposition(true);
      for (j = 0; j < numitems; j++) {
        animationoptions.rumble.delay = j / 2;
        animator.set(items[j], getvalues(), animationoptions.rumble);
      }
    }

    function randomsort() {
      return Math.random() - Math.random();
    }

    function itemreposition() {
      if (this.f == 1) {
        animator.set(this, getvalues(null, this._x, this._y), animationoptions.reposition);
      } else if (this.f == 2) {
        repositiondecos.call(this);
      }
    }

    function reposition(rumbled) {

      var shapecanvaswidth = shapecanvas.width,
        startx = Math.floor(fontx / gridsize) * gridsize,
        starty = fonty - fontheight - gridsize,
        cols = Math.ceil((textwidth + gridsize * 2) / gridsize),
        rows = Math.ceil((fontheight + gridsize * 2) / gridsize),
        numgrids = cols * rows,
        isnew, x, y, dataindex;

      if (typeof (currentshape) != 'string') {
        startx = starty = 0;
        cols = rows = Math.ceil(shapecanvaswidth / gridsize);
        numgrids = cols * rows;
      }
      shapecontext.fillStyle = '#000';

      for (i = 0, j = 0; i < numgrids; i++) {

        x = startx + i % cols * gridsize;
        y = starty + Math.floor(i / cols) * gridsize;

        dataindex = (Math.round(x * shapecanvasscale) + (Math.round(y * shapecanvasscale) - 1) * shapecanvaswidth) * 4;

        // console.log(x, y, shapedata[dataindex], shapedata[dataindex+1], shapedata[dataindex+2], shapedata[dataindex+3]);
        // if (shapedata[dataindex+3] > 100) {
        if (shapedata[dataindex]) {
          shapecontext.fillRect(Math.round(x * shapecanvasscale), Math.round(y * shapecanvasscale), 1, 1); // test
          if (!items[j]) {
            items[j] = createitem(j);
          }
          items[j].f = 1; // in shape
          items[j]._x = x;
          items[j]._y = y;
          if (!rumbled) {
            animationoptions.appear.delay = j / 3;
            animator.set(items[j], getvalues(null, x, y), animationoptions.appear);
          }
          j++;
        }

      }

      numprevitems = numitems;
      numitems = j + 100;

      for (; j < numitems; j++) {
        if (!items[j]) {
          items[j] = createitem(j);
          repositiondecos.call(items[j], true);
        }
        items[j].f = 2; // deco
      }

      for (; j < numprevitems; j++) {
        if (items[j]) {
          animationoptions.remove.duration = Math.random() * 1000 + 1500;
          animator.set(items[j], getvalues(null, null, null, null, 0), animationoptions.remove);
        }
      }

      draw();

    }

    function breath() {
      animationoptions.breath.duration = Math.random() * 1000 + 500;
      animator.set(this, getvalues(null, this.x, this.y), animationoptions.breath);
    }

    function removeitem() {
      items.pop();
    }



    function repositiondecos(isfirst) {
      if (isfirst === true) {
        animationoptions.decoappear.duration = Math.random() * 2500 + 1500;
        animator.set(this, getvalues(null, this.x + (Math.random() * 500 - 250), this.y + (Math.random() * 500 - 250)),
          animationoptions.decoappear);
      } else {
        animationoptions.decoreposition.duration = Math.random() * 5000 + 5000;
        animator.set(this, getvalues(), animationoptions.decoreposition);
      }
    }

    function getvalues(item, _x, _y, _s, _a) {

      // var x = _x || (Math.random()-Math.random())*halfcanvaswidth+halfcanvaswidth,
      // 	y = _y || (Math.random()-Math.random())*halfcanvasheight+halfcanvasheight,
      var angle = Math.random() * 180,
        x = _x || Math.cos(angle * Math.PI) * (Math.random() * halfcanvaswidth) + halfcanvaswidth,
        y = _y || Math.sin(angle * Math.PI) * (Math.random() * halfcanvasheight) + halfcanvasheight,
        s = _s !== undefined && _s !== null ? _s : 0.25 + 0.75 * Math.random(),
        a = _a !== undefined && _a !== null ? _a : 0.45 + 0.55 * Math.random(),
        r = 255, g = 255, b = 255;

      if (colored) {
        r = Math.round(Math.random() * 145) + 110;
        g = Math.round(Math.random() * 145) + 110;
        b = Math.round(Math.random() * 145) + 110;
      }

      if (item) {
        item.x = x;
        item.y = y;
        item.s = s;
        item.a = a;
        item.r = r;
        item.g = g;
        item.b = b;
        return item;
      } else {
        return { x: x, y: y, s: s, a: a, r: r, g: g, b: b };
      }

    }

    return {
      draw: draw,
      rumble: rumble,
      annoying: annoying,
      stopannoying: stopannoying,
      reposition: reposition
    }

  })();

  function change() {
    var clicked = this;
    buttons.map(function (button) {
      button.className = button == clicked ? 'on' : '';
    });
    drawshape(shapes[this.getAttribute('data-index')]);
  }

  function drawshape(shape) {

    var isfirst = !currentshape;

    if (shape != currentshape) {

      currentshape = shape;

      shapecanvas.width = canvaswidth * shapecanvasscale;
      shapecanvas.height = canvasheight * shapecanvasscale;
      console.log(shape)
      console.log(typeof shapes)

      if (typeof (shape) == 'string') {

        shapecontext.font = fontweight + ' ' + fontsize + 'px Exo';

        textwidth = shapecontext.measureText(shape).width;
        fontx = canvaswidth / 2 - textwidth / 2;
        fonty = canvasheight / 2 + fontheight / 2;

        shapecontext.fillStyle = 'rgba(255, 255, 255, 0.5)';
        shapecontext.font = fontweight + ' ' + fontsize * shapecanvasscale + 'px Exo';
        shapecontext.fillText(shape, fontx * shapecanvasscale, fonty * shapecanvasscale);

      } else {
        console.log("--shape--")
        console.log(shape)
        shapecontext.drawImage(shape, 0, 0);
      }

      shapedata = shapecontext.getImageData(0, 0, shapecanvas.width, shapecanvas.height).data;

      if (isfirst) {
        particles.reposition();
      } else {
        particles.rumble();
      }

    }

  }

  function resize() {
    areawidth = window.innerWidth;
    areaheight = window.innerHeight;
    scale = Math.min(1, areawidth / canvaswidth, areaheight / canvasheight);
    // canvas.style.transform = 'translate(-50%, -50%) scale(' + scale + ', ' + scale + ')';
    if (canvas.width != canvaswidth) {
      canvas.width = canvaswidth;
      canvas.height = canvasheight;
    }
    canvasposition = canvas.getBoundingClientRect();
    scaleratio = 1 / scale;
  }

  function start(e) {

    resize();
    drawshape(shapes[0]);

    return;

    var guide = e.guide,
      point;

    resize();
    drawshape(shapes[0]);

    point = { x: areawidth / 2 - (canvaswidth * scale) * 0.45, y: areaheight / 2 };

    setTimeout(function () {
      guide.show();
      setpoints();
      setTimeout(function () {
        animator.set(point, { x: areawidth / 2 + (canvaswidth * scale) * 0.45 }, {
          duration: 2500, easing: 'easeInOutExpo', onupdate: setpoints, onend: function () {
            guide.hide();
            particle.stopannoying();
          }
        });
      }, PAGES.browser.touchbased ? 1000 : 500);
      PAGES.browser.touchbased && guide.press();
    }, 1500);

    function setpoints() {
      _pointerx = point.x;
      _pointery = point.y;
      particles.annoying();
      guide.position(point.x, point.y);
    }

    started = true;

  }

  window.PAGES && PAGES.initialize({
    // guide: 'pointer',
    play: function (e) {
      start(e);
    },
    pause: function () {
      // pause();
    }
  });

};

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

/* eslint-disable */
  const PAGES = (function () {


    let amialone = parent.location.href == window.location.href,

      html = document.documentElement,
      body,

      settings = {},

      scrollbarwidth = 0,

      loaded = false,

      browser = {
        ios: (/iphone|ipad|android/i).test(navigator.userAgent),
        android: (/android/i).test(navigator.userAgent),
      },

      guide = null,

      key;


    if (browser.ios || browser.android) {
      browser.touchbased = true;
      html.classList.add('touchbased');
    } else {
      browser.hoverable = true;
      html.classList.add('hoverable');
    }

    document.addEventListener('DOMContentLoaded', function () {

      const infobox = document.querySelector('#info'),
        detailbox = infobox.querySelector('.detail'),
        infobutton = infobox.querySelector('.info a'),
        fullbutton = infobox.querySelector('.full a'),
        listbutton = infobox.querySelector('.list a'),
        refreshbutton = infobox.querySelector('.refresh a'),
        sharebuttons = infobox.querySelectorAll('.share a');


      body = document.body;

      detailbox.addEventListener('transitionend', onhideinfo, false);
      detailbox.addEventListener('webkitTransitionEnd', onhideinfo, false);

      infobutton.addEventListener('click', function (e) {
        infobox.classList[!infobox.classList.contains('detail') ? 'add' : 'remove']('detail');
        if (infobox.classList.contains('detail')) {
          infobox.style.bottom = '0';
          settings.pause && settings.pause();
        } else {
          settings.resume && settings.resume();
        }
        e.stopPropagation();
      }, false);

      refreshbutton.addEventListener('click', function (e) {
        location.reload();
        e.preventDefault();
      });

      (amialone ? listbutton : fullbutton).parentNode.style.display = 'block';

      for (key in sharebuttons) {
        !isNaN(key) && sharebuttons[key].addEventListener('click', sharing, false);
      }

      infobox.querySelector('.link a').addEventListener('click', stoppropagation, false);

      window.addEventListener('load', function () {
        infobox.classList.add('show-buttons');
      });

      function onhideinfo (e) {
        if (e.target == e.currentTarget && e.propertyName == 'opacity' && !infobox.classList.contains('detail')) {
          infobox.style.bottom = '';
        }
      }

      // get scroll bar width
      (function () {
        const checker = document.createElement('div');
        checker.style.cssText = 'position: absolute; left: -999em; width: 100px; height: 100px; overflow: scroll;';
        body.appendChild(checker);
        scrollbarwidth = 100 - checker.clientWidth;
        body.removeChild(checker);
      })();

  	});

    window.addEventListener('message', function (e) {
      if (e.data == 'play') {
        play();
      } else {
        settings[e.data] && settings[e.data]({ guide: guide });
      }
    });

    window.addEventListener('load', function () {
      amialone && play();
      loaded = true;
    });


    function addhandle (moving, options) {

      let $box = document.createElement('div'),
        $handle,
        arrows = [false, false, false, false],
        x = 0, y = 0,
        downpoint,
        radius,
        usearrowkey = false;

      options = options || { smooth: true };

      $box.className = 'handle-box';
      $box.innerHTML = [
        options.arrow === true && (!options.direction || options.direction === 'x') ? '<div class="arrow"></div>' : '',
        options.arrow === true && (!options.direction || options.direction === 'y') ? '<div class="arrow y"></div>' : '',
        '<div class="handle"></div>',
      ].join('');
      $handle = $box.querySelector('.handle');
      $handle.addEventListener('mousedown', down, false);
      $handle.addEventListener('touchstart', down, false);
      document.body.appendChild($box);

      radius = options.smooth ? $box.offsetWidth / 2 : $box.offsetWidth / 2 - $handle.offsetWidth / 2 - 1;
      moving.angle = moving.distance = 0;
      requestAnimationFrame(function () {
        $box.classList.add('added');
      });

      document.addEventListener('keydown', setarrowkey, false);
      document.addEventListener('keyup', setarrowkey, false);

      function setarrowkey (e, value) {
        var keycode = e.keyCode,
          value = e.type === 'keydown' ? true : false,
          _usearrowkey;
        if (keycode === 37) {
          arrows[0] = value;
        } else if (keycode === 38) {
          arrows[1] = value;
        } else if (keycode === 39) {
          arrows[2] = value;
        } else if (keycode === 40) {
          arrows[3] = value;
        }
        _usearrowkey = arrows[0] || arrows[1] || arrows[2] || arrows[3];
        if (_usearrowkey && !usearrowkey) {
          $box.classList.add('use-arrow-key');
          requestAnimationFrame(applyarrowkey);
        }
        usearrowkey = _usearrowkey;
        !options.smooth && applyarrowkey();
      }

      function applyarrowkey () {
        let movevalue;
        if (usearrowkey) {
          if (options.smooth) {
            movevalue = radius / 50;
            sethandle(
              arrows[0] ? Math.min(0, x) - movevalue : arrows[2] ? Math.max(0, x) + movevalue : x,
              arrows[1] ? Math.min(0, y) - movevalue : arrows[3] ? Math.max(0, y) + movevalue : y,
            );
            requestAnimationFrame(applyarrowkey);
          } else {
            sethandle(
              arrows[0] ? -radius : arrows[2] ? radius : x,
              arrows[1] ? -radius : arrows[3] ? radius : y,
            );
          }
        } else {
          sethandle(null);
          $box.classList.remove('use-arrow-key');
        }
      }

      function sethandle (_x, _y) {
        let angle, distance;
        if (_x !== null) {
          _x = options.direction && options.direction === 'y' ? 0 : _x;
          _y = options.direction && options.direction === 'x' ? 0 : _y;
          angle = Math.atan2(_y, _x);
          distance = Math.min(radius, Math.sqrt(_x * _x + _y * _y));
          if (0 > angle) {
            // angle += Math.PI*2;
          }
          x = Math.cos(angle) * distance;
          y = Math.sin(angle) * distance;
          moving.angle = angle - Math.PI / 2;
          moving.distance = distance / radius;
        } else {
          x = y = moving.angle = moving.distance = 0;
        }
        $handle.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
        options.onchange && options.onchange(moving.angle, moving.distance);
      }

      function down (e) {
        let rect;
        if (!usearrowkey) {
          rect = $box.getBoundingClientRect();
          downpoint = getpoint(e);
          $handle.classList.add('dragging');
          document.addEventListener('mousemove', move, false);
          document.addEventListener('mouseup', up, false);
          document.addEventListener('touchmove', move, false);
          document.addEventListener('touchend', up, false);
        }
        e.preventDefault();
      }

      function move (e) {
        const point = getpoint(e);
        sethandle(point[0] - downpoint[0], point[1] - downpoint[1]);
      }

      function up (e) {
        $handle.classList.remove('dragging');
        $handle.offsetWidth;
        $handle.style.transform = '';
        sethandle(null);
        document.removeEventListener('mousemove', move, false);
        document.removeEventListener('mouseup', up, false);
        document.removeEventListener('touchmove', move, false);
        document.removeEventListener('touchend', up, false);
      }

    }

    function addcover (color) {

      const $cover = document.createElement('div');

      $cover.className = 'cover';
      $cover.style.backgroundColor = color || window.getComputedStyle(body).backgroundColor;
      body.appendChild($cover);

      function remove () {
        $cover.offsetWidth; // reflow trick
        $cover.addEventListener('transitionend', function onremoved () {
          body.removeChild($cover);
        });
        $cover.style.opacity = 0;
      }

      return { remove: remove };

    }

    function play () {
      settings.play && setTimeout(function () {
        settings.play({ guide: guide });
      }, amialone ? settings.delayforalone || 500 : 0);
    }

    function createguide (_guide) {

      let element = document.createElement('div'),
        child = null,
        blocker = document.createElement('div');

      guide = {
        show: function () {
          element.classList.add('show');
        },
        hide: function () {
          element.classList.add('hide');
          element.classList.remove('press');
        },
        press: function () {
          element.classList.add('press');
        },
        release: function () {
          element.classList.remove('press');
        },
        position: function (x, y) {
          element.style.left = x + 'px';
          element.style.top = y + 'px';
        },
        tilt: function (percent) {
          child.style.cssText = '-webkit-transform: rotateY(' + 30 * percent + 'deg); transform: rotateY(' + 30 * percent + 'deg);';
        },
      };

      if (_guide == 'device') {
        element.classList.add('guide-device');
        element.innerHTML = '<div></div>';
        child = element.children[0];
      } else {
        element.classList.add('guide-pointer');
      }

      element.addEventListener('webkitTransitionEnd', transitionend);
      element.addEventListener('transitionend', transitionend);

      body.appendChild(element);

      blocker.classList.add('guide-blocker');
      blocker.addEventListener('touchstart', preventdefault, false);
      body.appendChild(blocker);

      function transitionend (e) {
        if (e.target == e.currentTarget && e.propertyName == 'opacity' && element.classList.contains('hide')) {
          body.removeChild(element);
          body.removeChild(blocker);
        }
      }

    }

    function sharing (e) {
      const size = this.getAttribute('data-size').split(/, */),
        popupwindow = popup(this.href, parseInt(size[0]), parseInt(size[1]), 'share-window');
      popupwindow && popupwindow.focus();
      e.preventDefault();
    }

    function popup (url, width, height, name) {
      return window.open(url, name || '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=' + (width + scrollbarwidth) + ',height=' + height);
    }

    function getpoint (e) {
      if (e.touches) {
        e = e.touches[0];
      }
      return [e.pageX || e.clientX, e.pageY || e.clientY];
    }

    function preventdefault (e) {
      e.preventDefault();
    }

    function stoppropagation (e) {
      e.stopPropagation();
    }

    function checkfontloaded () {

      let box = document.createElement('div'),
        weights = [200, 300, 500, 600],
        width, numchecked = 0, checkcount = 0;

      box.innerHTML = 'ABCDEFG1234567!@#$%^&';
      box.className = 'font-checker font-family-for-check';
      body.appendChild(box);
      width = box.offsetWidth;
      box.className = 'font-checker';
      box.style.fontWeight = weights[0];
      check();

      function check () {
        if (width != box.offsetWidth || checkcount > 50) {
          if (weights.length > numchecked) {
            box.style.fontWeight = weights[++numchecked];
            check();
          } else {
            settings.onfontloaded();
            body.removeChild(box);
            box = null;
          }
        } else {
          setTimeout(check, 50);
          checkcount++;
        }
      }

    }


    return {
      browser: browser,
      addhandle: addhandle,
      addcover: addcover,
      initialize: function (_settings) {

        settings = _settings || {};

        body = document.body;

        if (settings.onfontloaded) {
          checkfontloaded();
        }

        if (settings.guide) {
          createguide(settings.guide);
        }

        loaded && amialone && play();

      },
    };

  })();