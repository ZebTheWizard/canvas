// Generated by CoffeeScript 1.12.4
(function() {
  Function.prototype.property = function(prop, desc) {
    return Object.defineProperty(this.prototype, prop, desc);
  };

  window.Popup = (function() {
    function Popup(params) {
      var _body, _but, _but_, _button, _buttons, _color, _current, _footer, _header, _this, _title, _tray, _window, headerDown, headerMove, headerUp, i, p, xpos, ypos;
      p = params || {};
      _this = this;
      this.appendTo = p.appendTo || 'body';
      this.buttons = p.buttons || ['Continue', 'Cancel'];
      this.closeable = p.closeable || false;
      this.draggable = p.draggable || false;
      if (p.el) {
        this.el = p.el;
      }
      this.genID = true;
      this.pinnable = p.pinnable || false;
      if (p.text) {
        this.text = p.text;
      }
      this.title = p.title || 'Popup';
      _window = document.createElement("div");
      _window.className = 'window';
      _window.id = "popup-window-" + this.id;
      this.parent.appendChild(_window);
      this.setWindow = true;
      this.show = true;
      _tray = document.createElement("div");
      _tray.id = 'popup-tray';
      document.body.appendChild(_tray);
      xpos = ypos = 0;
      _header = document.createElement("div");
      _header.className = 'header';
      _window.appendChild(_header);
      headerDown = function(e) {
        if (_this.draggable === true) {
          xpos = e.clientX - _window.offsetLeft;
          ypos = e.clientY - _window.offsetTop;
          return window.addEventListener('mousemove', headerMove, true);
        }
      };
      headerMove = function(e) {
        _this.minimize = false;
        if (parseInt(_window.style.top) + _window.clientHeight > window.innerHeight + 50 && _this.pinnable === true) {
          _this.minimize = true;
        }
        _window.style.position = "absolute";
        _window.style.top = e.clientY + 'px';
        return _window.style.left = e.clientX + 'px';
      };
      headerUp = function() {
        return window.removeEventListener('mousemove', headerMove, true);
      };
      _header.addEventListener('mousedown', headerDown, false);
      window.addEventListener('mouseup', headerUp, false);
      if (this.closeable === true) {
        _buttons = document.createElement("div");
        _buttons.className = 'buttons';
        _header.appendChild(_buttons);
        _color = ['red', 'yellow', 'green'];
        i = 0;
        while (i < 3) {
          _button = document.createElement("button");
          _button.className = 'button ';
          _button.className += _color[i];
          _button.id = _but_ = "popup-" + _color[i] + "-" + this.id;
          _buttons.appendChild(_button);
          _but = document.getElementById(_but_);
          if (_color[i] === 'red') {
            _button.addEventListener("click", function() {
              return _this.show = false;
            }, _this);
          } else if (_color[i] === 'yellow') {
            _button.addEventListener("click", function() {
              return _this.minimize = true;
            }, _this);
          } else {
            _button.addEventListener("click", function() {
              return _this.minimize = false;
            }, _this);
          }
          i++;
        }
      }
      _title = document.createElement("div");
      _title.className = "title";
      _title.innerHTML = this.title;
      _header.appendChild(_title);
      _body = document.createElement("div");
      _body.className = 'body';
      _body.innerHTML = this.body;
      _window.appendChild(_body);
      _footer = document.createElement("div");
      _footer.className = 'footer';
      _window.appendChild(_footer);
      _buttons = document.createElement("div");
      _buttons.className = 'buttons';
      _footer.appendChild(_buttons);
      i = 0;
      while (i < Object.keys(this.actions).length) {
        _current = Object.keys(this.actions)[i];
        if (_current !== 'default') {
          _button = document.createElement("button");
          _button.className = 'button ';
          _button.id = "popup-" + _current + "-" + this.id;
          _button.innerHTML = _current;
          _button.onClickMethod = _current;
          _buttons.appendChild(_button);
          _button.addEventListener("click", function() {
            eval("if(p.on" + this.onClickMethod + "){p.on" + this.onClickMethod + "()}");
            return _this.show = false;
          }, _this);
        }
        i++;
      }
      _button = document.createElement("button");
      _button.className = 'button ';
      _button.id = "popup-default-" + this.id;
      _button.classList.add('default');
      _button.addEventListener("click", function() {
        if (p.onDefault) {
          p.onDefault();
        }
        return _this.show = false;
      }, _this);
      _button.innerHTML = this.actions["default"];
      _buttons.appendChild(_button);
    }

    Popup.property('genID', {
      set: function() {
        return this.id = window.popup_incr = ++window.popup_incr || 1;
      }
    });

    Popup.property('show', {
      set: function(bool) {
        if (bool === true) {
          this.window.style.display = "block";
        } else {
          this.window.style.display = "none";
        }
        return this.isVisible = bool;
      }
    });

    Popup.property('minimize', {
      set: function(bool) {
        var _tray;
        if (bool === true) {
          _tray = document.getElementById('popup-tray');
          this.window.children[1].style.display = "none";
          this.window.children[2].style.display = "none";
          this.window.classList.add('minimized');
          _tray.appendChild(this.window);
        } else {
          this.window.children[1].style.display = "block";
          this.window.children[2].style.display = "block";
          this.window.classList.remove('minimized');
          this.parent.appendChild(this.window);
        }
        return this.isVisible = bool;
      }
    });

    Popup.property('text', {
      set: function(str) {
        return this.body = str;
      }
    });

    Popup.property('el', {
      set: function(str) {
        return this.body = document.querySelector(str).outerHTML;
      }
    });

    Popup.property('setWindow', {
      set: function() {
        return this.window = document.getElementById("popup-window-" + this.id);
      }
    });

    Popup.property('appendTo', {
      set: function(str) {
        return this.parent = document.querySelector(str);
      }
    });

    Popup.property('buttons', {
      set: function(buttons) {
        var b, j, len, results;
        this.actions = {};
        results = [];
        for (j = 0, len = buttons.length; j < len; j++) {
          b = buttons[j];
          if (buttons.indexOf(b) === 0) {
            results.push(this.actions["default"] = buttons[0]);
          } else {
            results.push(eval("this.actions." + b + " = '" + b + "'"));
          }
        }
        return results;
      }
    });

    return Popup;

  })();

}).call(this);