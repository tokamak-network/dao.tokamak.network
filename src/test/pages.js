/* eslint-disable */

export default function pages () {
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

  })();}
