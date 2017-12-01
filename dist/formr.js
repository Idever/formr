/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Formr__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Formr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_Formr__);


(function (w) {
  if (w !== undefined) {
    if (!w.Formr) {
      w.Formr = __WEBPACK_IMPORTED_MODULE_0__src_Formr___default.a;
    }
  }
})(window, undefined);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__src_Formr___default.a);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var email_regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

var Formr = function () {
  function Formr(form) {
    _classCallCheck(this, Formr);

    if (!form) throw new Error('Formr :: form is not defined');

    this._data = [];

    this._data = window === undefined || window && (!window.HTMLFormElement || form.constructor !== window.HTMLFormElement) ? this._normalizeData(form) : form.elements;

    this._values = {};
    this._errors = {};
    this._messages = {
      'required': 'Ce champ est requis',
      'string': 'Ce champ doit être une chaîne de caractères valide',
      'boolean': 'Ce champ doit être de type booléen (vrai/faux)',
      'number': 'Ce champ ne peut contenir que des chiffres',
      'email': 'Le format de l\'adresse email est invalide',
      'length': 'Ce champ doit faire entre :min et :max caractères',
      'between': 'Ce champ doit être compris entre :min et :max',
      'under': 'La valeur de ce champ doit être:strict inférieure à :max',
      'above': 'La valeur de ce champ doit être:strict supérieure à :min',
      'same': 'La valeur ":value" est différente celle attendue ":expected"',
      'in': 'Seuls les valeurs ":values" sont autorisées pour ce champ'
    };
    this._fillValues();
  }

  _createClass(Formr, [{
    key: 'isValid',
    value: function isValid() {
      return Boolean(Object.keys(this._errors).length === 0);
    }
  }, {
    key: 'getErrors',
    value: function getErrors() {
      return this._errors;
    }
  }, {
    key: 'required',
    value: function required() {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
          this.required(arguments[i]);
        }
      } else {
        var _arguments = Array.prototype.slice.call(arguments),
            key = _arguments[0];

        var value = this._getValue(key);
        if (value === undefined || this._isString(value) && value.length === 0) this._addError(key, 'required');
      }
      return this;
    }
  }, {
    key: 'string',
    value: function string() {
      this._callMultipleArgsMethod('string', arguments);
      return this;
    }
  }, {
    key: 'number',
    value: function number() {
      this._callMultipleArgsMethod('number', arguments);
      return this;
    }
  }, {
    key: 'boolean',
    value: function boolean() {
      this._callMultipleArgsMethod('boolean', arguments);
      return this;
    }
  }, {
    key: 'email',
    value: function email() {
      this._callMultipleArgsMethod('email', arguments);
      return this;
    }
  }, {
    key: 'in',
    value: function _in(key, constraints) {
      var value = this._getValue(key);
      if (!Array.isArray(constraints, value)) this._addError(key, 'in', { ':values': constraints.join(',') });
      return this;
    }
  }, {
    key: 'between',
    value: function between(key) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var value = this._getValue(key);
      if (this._isString(value) && (value.length < min || value.length > max) || this._isNumber(value) && (value < min || value > max)) this._addError(key, 'length', { ':min': min, ':max': max });
      return this;
    }
  }, {
    key: 'under',
    value: function under(key) {
      var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var value = Number(this._getValue(key));
      if (this._isNumber(value) && (strict && value > max || !strict && value >= max)) this._addError(key, 'under', { ':max': max, ':strict': strict ? ' strictement' : '' });
      return this;
    }
  }, {
    key: 'above',
    value: function above(key) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var value = Number(this._getValue(key));
      if (this._isNumber(value) && (strict && value < min || !strict && value <= min)) this._addError(key, 'above', { ':min': min, ':strict': strict ? ' strictement' : '' });
      return this;
    }
  }, {
    key: 'same',
    value: function same(key) {
      var comparisonValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var value = Number(this._getValue(key));
      if (!strict && comparisonValue != value || strict && comparisonValue !== value) this._addError(key, 'same', { ':expected': value, ':value': comparisonValue });
      return this;
    }
  }, {
    key: '_getValue',
    value: function _getValue(key) {
      if (this._values[key] !== undefined) return this._values[key];else if (this._data[key] !== undefined) return this._data[key].value;else throw new Error('Key \'' + key + '\' does not exists !');
    }
  }, {
    key: '_fillValues',
    value: function _fillValues() {
      if (Object.keys(this._values).length) return;
      for (var i = 0; i < this._data.length; i++) {
        var item = this._data[i];
        if (item.name !== undefined && this._values[item.name] === undefined) this._values[item.name] = item.value;
      }
    }
  }, {
    key: '_addError',
    value: function _addError(key, type) {
      var repl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var message = this._messages[type];
      if (!message) return;
      if (repl) {
        message = message.replace(new RegExp(Object.keys(repl).join("|"), "g"), function (s) {
          return repl[s];
        });
      }
      if (!this._errors[key]) this._errors[key] = [];
      this._errors[key].push(message);
    }
  }, {
    key: '_isString',
    value: function _isString(value) {
      try {
        return value.constructor && value.constructor === String || typeof value === "string";
      } catch (e) {
        console.error(e);
      }
      return false;
    }
  }, {
    key: '_isNumber',
    value: function _isNumber(value) {
      try {
        return value.constructor && value.constructor === Number || typeof value === "number";
      } catch (e) {
        console.error(e);
      }
      return false;
    }
  }, {
    key: '_isBoolean',
    value: function _isBoolean(value) {
      try {
        return value.constructor && value.constructor === Boolean || typeof value === "boolean";
      } catch (e) {
        console.error(e);
      }
      return false;
    }
  }, {
    key: '_isEmail',
    value: function _isEmail(value) {
      try {
        return email_regexp.test(value);
      } catch (e) {
        console.error(e);
      }
      return false;
    }
  }, {
    key: '_normalizeData',
    value: function _normalizeData() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var arr = [];
      if (Object.keys(data).length) {
        for (var name in data) {
          arr.push({
            name: name,
            value: data[name]
          });
        }
      }
      return arr;
    }
  }, {
    key: '_callMultipleArgsMethod',
    value: function _callMultipleArgsMethod(rule_name) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (args.length > 1) {
        for (var i = 0; i < args.length; i++) {
          this[rule_name](args[i]);
        }
      } else {
        var _args = _slicedToArray(args, 1),
            key = _args[0];

        var value = this._getValue(key);
        var _assert_method_name = '_is' + (rule_name.charAt(0).toUpperCase() + rule_name.slice(1));
        if (this[_assert_method_name] !== undefined && this[_assert_method_name](value) === false) this._addError(key, fn);
      }
      return this;
    }
  }]);

  return Formr;
}();

module.exports = Formr;

/***/ })
/******/ ]);