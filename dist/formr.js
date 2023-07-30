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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Constants
var EMAIL_REGEXP = exports.EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

// Value type
var isset = exports.isset = function isset(value) {
  return value !== undefined && value !== null;
};

var isString = exports.isString = function isString(value) {
  try {
    return isset(value) && value.constructor && value.constructor === String || typeof value === "string";
  } catch (e) {
    console.error(e);
  }
  return false;
};

var isNumber = exports.isNumber = function isNumber(value) {
  try {
    return isset(value) && value.constructor && value.constructor === Number || typeof value === "number";
  } catch (e) {
    console.error(e);
  }
  return false;
};

var isBoolean = exports.isBoolean = function isBoolean(value) {
  try {
    return isset(value) && value.constructor && value.constructor === Boolean || typeof value === "boolean";
  } catch (e) {
    console.error(e);
  }
  return false;
};

var isEmail = exports.isEmail = function isEmail(value) {
  try {
    return isset(value) && EMAIL_REGEXP.test(value);
  } catch (e) {
    console.error(e);
  }
  return false;
};

var isFunction = exports.isFunction = function isFunction(value) {
  try {
    return isset(value) && value.constructor && value.constructor === Function || typeof value === "function";
  } catch (e) {
    console.error(e);
  }
  return false;
};

var isInt = exports.isInt = function isInt(value) {
  return Boolean(isset(value) && value.length && !isNaN(Number(value)));
};
var isStr = exports.isStr = function isStr(value) {
  return Boolean(isset(value) && isInt(value) === false && isString(value));
};

// Field type
var isInputElement = exports.isInputElement = function isInputElement(field) {
  return field.constructor === HTMLInputElement;
};
var isTextInputElement = exports.isTextInputElement = function isTextInputElement(field) {
  return isInputElement(field) && field.type === "text";
};
var isNumberInputElement = exports.isNumberInputElement = function isNumberInputElement(field) {
  return isInputElement(field) && field.type === "number";
};
var isEmailInputElement = exports.isEmailInputElement = function isEmailInputElement(field) {
  return isInputElement(field) && field.type === "email";
};
var isDateInputElement = exports.isDateInputElement = function isDateInputElement(field) {
  return isInputElement(field) && field.type === "date";
};
var isCheckboxElement = exports.isCheckboxElement = function isCheckboxElement(field) {
  return isInputElement(field) && field.type === "checkbox";
};
var isRadioElement = exports.isRadioElement = function isRadioElement(field) {
  return isInputElement(field) && field.type === "radio";
};
var isSelectElement = exports.isSelectElement = function isSelectElement(field) {
  return field.constructor === HTMLSelectElement;
};
var isTextareaElement = exports.isTextareaElement = function isTextareaElement(field) {
  return field.constructor === HTMLTextAreaElement;
};
var isCheckableElement = exports.isCheckableElement = function isCheckableElement(field) {
  return isInputElement(field) && (isCheckboxElement(field) || isRadioElement(field));
};
var isFileInputElement = exports.isFileInputElement = function isFileInputElement(field) {
  return isInputElement(field) && field.type === "file";
};

// Field state
var isFieldChecked = exports.isFieldChecked = function isFieldChecked(field) {
  return isCheckboxElement(field) && isRadioElement(field) && field.checked === true;
};
var isFieldUnchecked = exports.isFieldUnchecked = function isFieldUnchecked(field) {
  return isCheckboxElement(field) && isRadioElement(field) && field.checked === false;
};
var isFieldSelected = exports.isFieldSelected = function isFieldSelected(field) {
  return isSelectElement(field) && field.selected === true;
};
var isFieldUnselected = exports.isFieldUnselected = function isFieldUnselected(field) {
  return isSelectElement(field) && field.selected === false;
};

// Tools
var capitalize = exports.capitalize = function capitalize(value) {
  return "" + value.charAt(0).toUpperCase() + value.slice(1);
};

exports.default = {
  CONSTANTS: { EMAIL_REGEXP: EMAIL_REGEXP },
  value_type: {
    isString: isString,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isEmail: isEmail,
    isFunction: isFunction,
    isInt: isInt,
    isStr: isStr
  },
  field_type: {
    isInputElement: isInputElement,
    isTextInputElement: isTextInputElement,
    isNumberInputElement: isNumberInputElement,
    isEmailInputElement: isEmailInputElement,
    isDateInputElement: isDateInputElement,
    isCheckboxElement: isCheckboxElement,
    isRadioElement: isRadioElement,
    isSelectElement: isSelectElement,
    isTextareaElement: isTextareaElement,
    isCheckableElement: isCheckableElement
  },
  field_state: {
    isFieldChecked: isFieldChecked,
    isFieldUnchecked: isFieldUnchecked,
    isFieldSelected: isFieldSelected,
    isFieldUnselected: isFieldUnselected
  },
  tools: {
    capitalize: capitalize
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseRule = function () {
  function BaseRule(rule, key) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var constraints = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var HTMLField = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, BaseRule);

    this.rule = rule;
    this.key = key;
    this.value = value;
    this.constraints = constraints;
    this.HTMLField = HTMLField;
  }

  _createClass(BaseRule, [{
    key: '_hasHTMLField',
    value: function _hasHTMLField() {
      return this.HTMLField && this.HTMLField.length;
    }
  }, {
    key: '_isset',
    value: function _isset() {
      return (0, _helpers.isset)(this.value);
    }
  }]);

  return BaseRule;
}();

exports.default = BaseRule;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Formr = __webpack_require__(3);

var _Formr2 = _interopRequireDefault(_Formr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (w) {
  if (w !== undefined) {
    __webpack_require__(11);
    if (!w.Formr) {
      w.Formr = _Formr2.default;
    }
  }
})(window, undefined);

exports.default = _Formr2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RequiredRule = __webpack_require__(4);

var _RequiredRule2 = _interopRequireDefault(_RequiredRule);

var _StringRule = __webpack_require__(5);

var _StringRule2 = _interopRequireDefault(_StringRule);

var _NumberRule = __webpack_require__(6);

var _NumberRule2 = _interopRequireDefault(_NumberRule);

var _BooleanRule = __webpack_require__(7);

var _BooleanRule2 = _interopRequireDefault(_BooleanRule);

var _EmailRule = __webpack_require__(8);

var _EmailRule2 = _interopRequireDefault(_EmailRule);

var _CheckedRule = __webpack_require__(9);

var _CheckedRule2 = _interopRequireDefault(_CheckedRule);

var _ImageRule = __webpack_require__(10);

var _ImageRule2 = _interopRequireDefault(_ImageRule);

var _helpers = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_SETTINGS = {
  debug: false,
  test_mode: false, // false|browser|server|both
  observe_event: 'keyup',
  validate_before_submit: true
};

var Formr = function () {
  function Formr(data) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Formr);

    if (!data) throw new Error('Formr :: data is not defined');

    this._isHTMLFormElement = false;
    this._data = data;
    this._excluded = [];
    this._settings = _extends({}, DEFAULT_SETTINGS, settings);
    this._errors = {};
    this._rules = {};
    this._observers = {};
    this._validators = {
      'required': _RequiredRule2.default,
      'string': _StringRule2.default,
      'number': _NumberRule2.default,
      'boolean': _BooleanRule2.default,
      'email': _EmailRule2.default,
      'checked': _CheckedRule2.default,
      'image': _ImageRule2.default
    };
    this._messages = {
      'required': 'Ce champ est requis',
      'string': 'Ce champ doit être une chaîne de caractères valide',
      'boolean': 'Ce champ doit être de type booléen (vrai/faux)',
      'number': 'Ce champ ne peut contenir que des chiffres',
      'email': 'Le format de l\'adresse email est invalide',
      'length': 'Ce champ doit faire entre :min et :max caractères',
      'between': 'Ce champ doit être compris entre :min et :max',
      'between2': 'Between 2 Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
      'under': 'La valeur de ce champ doit être:strict inférieure à :max',
      'above': 'La valeur de ce champ doit être:strict supérieure à :min',
      'same': 'La valeur ":value" est différente celle attendue ":expected"',
      'in': 'Seuls les valeurs ":values" sont autorisées pour ce champ',
      'checked': 'Ce champ doit être coché',
      'unchecked': 'Ce champ ne doit pas être coché',
      'image': 'Format de fichier invalide (acceptés: :acceptedMimetypes)',
      'type': 'Le fichier doit être de type ":mimetype"',
      'size': 'La taille du fichier ne doit pas excéder :size Mo'
    };

    this._initData();
    this._form = this._isHTMLFormElement ? data : null;

    if (this._settings.messages) this.messages(this._settings.message);
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
    key: 'resetErrors',
    value: function resetErrors() {
      this._errors = [];
    }
  }, {
    key: 'messages',
    value: function messages() {
      var _messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._messages = _extends({}, this._messages, _messages);
      return this;
    }
  }, {
    key: 'excluded',
    value: function excluded() {
      if (arguments && arguments.length) this._excluded = this._excluded.concat(Array.from(arguments));
      return this;
    }
  }, {
    key: 'required',
    value: function required() {
      if (arguments && arguments.length) {
        if (arguments.length > 1) {
          for (var i = 0; i < arguments.length; i++) {
            this.required(arguments[i]);
          }
        } else {
          var _arguments = Array.prototype.slice.call(arguments),
              key = _arguments[0];

          var value = this._getValue(key);
          this._addRule(key, 'required');

          if (!this._validate('required', key, value)) this._addError(key, 'required');
        }
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
    key: 'checked',
    value: function checked(key) {
      var expected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var element = this._getHtmlElement(key);
      this._addRule(key, 'checked', [expected]);

      if (!this._validate('checked', key, element ? Boolean(element.checked) : false, [expected])) this._addError(key, expected ? 'checked' : 'unchecked');
      return this;
    }
  }, {
    key: 'image',
    value: function image(key) {
      var acceptedMimetypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (this._isHTMLFormElement || this._settings.test_mode !== false) {
        var value = this._getValue(key);
        this._addRule(key, 'image', [acceptedMimetypes]);

        if (!this._validate('image', key, value, [acceptedMimetypes])) this._addError(key, 'image', { acceptedMimetypes: acceptedMimetypes.join(',') });
      }
      return this;
    }
  }, {
    key: 'type',
    value: function type(key, mimetype) {
      if (this._isHTMLFormElement || this._settings.test_mode !== false) {
        var value = this._getValue(key);
        this._addRule(key, 'type', [mimetype]);

        if (value.type !== mimetype) this._addError(key, 'type', { mimetype: mimetype });
      }
    }
  }, {
    key: 'size',
    value: function size(key) {
      var _size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (this._isHTMLFormElement || this._settings.test_mode !== false) {
        var value = this._getValue(key);
        this._addRule(key, 'size', [_size]);

        if (value.size < _size) this._addError(key, 'size', { size: _size });
      }
      return this;
    }
  }, {
    key: 'in',
    value: function _in(key) {
      var constraints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var value = this._getValue(key);
      this._addRule(key, 'in', [constraints]);

      if (!Array.isArray(constraints, value)) this._addError(key, 'in', { ':values': constraints.join(',') });
      return this;
    }
  }, {
    key: 'between',
    value: function between(key) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var value = this._getValue(key);
      var _isInt = (0, _helpers.isInt)(value);
      this._addRule(key, 'between', [min, max]);

      if ((0, _helpers.isStr)(value) && (value.length < min || value.length > max) || _isInt && (value < min || value > max)) this._addError(key, _isInt ? 'between' : 'length', { ':min': min, ':max': max });
      return this;
    }
  }, {
    key: 'between2',
    value: function between2(key) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var value = this._getValue(key);
      var _isInt = (0, _helpers.isInt)(value);
      this._addRule(key, 'between2', [min, max]);

      if ((0, _helpers.isStr)(value) && (value.length < min || value.length > max) || _isInt && (value < min || value > max)) this._addError(key, _isInt ? 'between2' : 'length', { ':min': min, ':max': max });
      return this;
    }
  }, {
    key: 'under',
    value: function under(key) {
      var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var value = Number(this._getValue(key));
      this._addRule(key, 'under', [max, strict]);

      if ((0, _helpers.isNumber)(value) && (strict && value > max || !strict && value >= max)) this._addError(key, 'under', { ':max': max, ':strict': !strict ? ' strictement' : '' });
      return this;
    }
  }, {
    key: 'above',
    value: function above(key) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var value = Number(this._getValue(key));
      this._addRule(key, 'above', [min, strict]);

      if ((0, _helpers.isNumber)(value) && (strict && value < min || !strict && value <= min)) this._addError(key, 'above', { ':min': min, ':strict': !strict ? ' strictement' : '' });
      return this;
    }
  }, {
    key: 'same',
    value: function same(key) {
      var comparisonValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var value = Number(this._getValue(key));
      this._addRule(key, 'same', [comparisonValue, strict]);

      if (!strict && comparisonValue != value || strict && comparisonValue !== value) this._addError(key, 'same', { ':expected': value, ':value': comparisonValue });
      return this;
    }
  }, {
    key: 'validateAll',
    value: function validateAll() {
      this._applyRules(true);
      return this;
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (!arguments.length) this.validateAll();else {
        this.resetErrors();
        Array.from(arguments).forEach(this._applyRule.bind(this));
      }
      return this;
    }
  }, {
    key: 'observe',
    value: function observe() {
      var _this = this;

      if (!arguments.length || (0, _helpers.isFunction)(arguments[0])) throw new Error('Formr.observe :: You must specify at least one field to observe');
      if (this._isHTMLFormElement) {
        var args = Array.from(arguments);
        var callback = args.pop();
        if (!callback || callback.constructor !== Function) throw new Error('Formr.observe :: the last argument must be a valid JavaScript function');
        args.forEach(function (arg) {
          return _this._observable(arg, callback);
        });
      }
      return this;
    }
  }, {
    key: 'unobserve',
    value: function unobserve() {
      var _this2 = this;

      if (this._isHTMLFormElement && arguments.length) {
        Array.from(arguments).forEach(function (key) {
          _this2._data[key].removeEventListener(_this2._settings.observe_event, _this2._observers[key]);
          _this2._observers[key] = null;
        });
      }
      return this;
    }
  }, {
    key: 'submit',
    value: function submit(callback) {
      var _this3 = this;

      var preventDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (this._isHTMLFormElement && this._form) {
        this._form.addEventListener('submit', function (e) {
          if (preventDefault) e.preventDefault();
          if (_this3._settings.validate_before_submit === true) _this3.validateAll();
          callback(e);
        });
      }
      return this;
    }
  }, {
    key: '_observable',
    value: function _observable(arg, callback) {
      var _this4 = this;

      var cEvent = null;
      var cCallback = null;
      var validate = false;

      if (Array.isArray(arg)) {
        var _arg = arg;

        var _arg2 = _slicedToArray(_arg, 4);

        arg = _arg2[0];
        cEvent = _arg2[1];
        customCallback = _arg2[2];
        validate = _arg2[3];
      } else if (arg.constructor === Object) {
        cEvent = arg.event || null;
        cCallback = arg.callback || null;
        validate = arg.validate;
        arg = arg.field;
      }

      this._observers[arg] = this._debounce(function (e) {
        var value = e.target.value;
        _this4._setValue(arg, value);
        var err = null;

        if (validate) {
          _this4._applyRules(true);
          err = !_this4.isValid() ? _this4.getErrors() : null;
        }

        if (cCallback && cCallback.constructor === Function) cCallback(e, arg, value, err);
        callback(e, arg, value, err);
      }, 300);
      this._data[arg].addEventListener(cEvent || this._settings.observe_event, this._observers[arg]);
    }
  }, {
    key: '_getValue',
    value: function _getValue(key) {
      var field = this._data[key];
      if ((0, _helpers.isset)(field)) {
        if ((0, _helpers.isFileInputElement)(field)) return field.files;else if ((0, _helpers.isCheckableElement)(field)) return field.checked;else if ((0, _helpers.isInputElement)(field) || (0, _helpers.isSelectElement)(field) || (0, _helpers.isTextareaElement)(field)) return field.value;
      } else throw new Error('Key \'' + key + '\' does not exists !');
    }
  }, {
    key: '_getHtmlElement',
    value: function _getHtmlElement(key) {
      if (!this._isHTMLFormElement) return null;
      return this._data[key] || null;
    }
  }, {
    key: '_setValue',
    value: function _setValue(key, value) {
      if (this._data[key] !== undefined) this._data[key].value = value;
    }
  }, {
    key: '_addError',
    value: function _addError(key, type) {
      var repl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var message = this._messages[type];
      if (!message) return;
      if (repl) message = message.replace(new RegExp(Object.keys(repl).join("|"), "g"), function (s) {
        return repl[s];
      });
      if (!this._errors[key]) this._errors[key] = [];
      this._errors[key].push(message);
    }
  }, {
    key: '_normalizeData',
    value: function _normalizeData() {
      var arr = [];
      if (Object.keys(this._data).length) {
        for (var field in this._data) {
          arr.push({
            name: field,
            value: this._data[field]
          });
        }
      }
      this._data = arr;
    }
  }, {
    key: '_initData',
    value: function _initData() {
      if (window !== undefined && this._data.constructor === window.HTMLFormElement) {
        this._isHTMLFormElement = true;
        this._data = this._data.elements;
      } else if (this._data.constructor === Object) this._normalizeData();else throw new Error('Formr :: data must be a valid HTML form Element or a valid Javascript Object');
    }
  }, {
    key: '_callMultipleArgsMethod',
    value: function _callMultipleArgsMethod(rule_name) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (args && args.length) {
        if (args.length > 1) {
          for (var i = 0; i < args.length; i++) {
            this[rule_name](args[i]);
          }
        } else {
          var _args = _slicedToArray(args, 1),
              key = _args[0];

          var value = this._getValue(key);
          this._addRule(key, rule_name);
          if (!this._validate(rule_name, key, value)) this._addError(key, rule_name);
        }
      }
      return this;
    }
  }, {
    key: '_validate',
    value: function _validate(rule, key, value) {
      var constraints = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

      if (this._isOptional(key)) {
        if (!this._getValue(key) || !this._getValue(key).length) return true;
      }
      var ValidatorClass = this._validators[rule] || null;
      if (!ValidatorClass) return true;
      try {
        var v = new ValidatorClass(rule, key, value, constraints, this._getHtmlElement(key));
        return v.validate.apply(v, constraints);
      } catch (e) {
        throw new Error(e);
      }
      return true;
    }
  }, {
    key: '_addRule',
    value: function _addRule(key, name) {
      var constraints = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      if (!this._rules[key]) this._rules[key] = {};
      if (!this._rules[key][name]) this._rules[key][name] = constraints;
    }
  }, {
    key: '_isRequired',
    value: function _isRequired(key) {
      return Object.keys(this._rules[key]).indexOf('required') >= 0;
    }
  }, {
    key: '_isOptional',
    value: function _isOptional(key) {
      var condition = !this._isRequired(key);

      return condition;
    }
  }, {
    key: '_applyRules',
    value: function _applyRules() {
      var reset_errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (reset_errors) this.resetErrors();
      for (var key in this._rules) {
        this._applyRule(key);
      }
    }
  }, {
    key: '_applyRule',
    value: function _applyRule(key) {
      if (!this._rules[key]) return;
      var rules = this._rules[key];
      if (!rules || !Object.keys(rules).length) return;
      for (var name in rules) {
        this[name].apply(this, [key].concat(_toConsumableArray(rules[name])));
      }
    }
  }, {
    key: '_isFormElement',
    value: function _isFormElement(item) {
      if (!this._isHTMLFormElement || !item.constructor) return false;
      return [HTMLInputElement, HTMLTextAreaElement, HTMLSelectElement].indexOf(item.constructor) >= 0;
    }
  }, {
    key: '_debounce',
    value: function _debounce(callback, delay) {
      var timer = void 0;
      return function () {
        var args = arguments;
        var context = this;
        clearTimeout(timer);
        timer = setTimeout(function () {
          callback.apply(context, args);
        }, delay);
      };
    }
  }]);

  return Formr;
}();

exports.default = Formr;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseRule2 = __webpack_require__(1);

var _BaseRule3 = _interopRequireDefault(_BaseRule2);

var _helpers = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RequiredRule = function (_BaseRule) {
  _inherits(RequiredRule, _BaseRule);

  function RequiredRule() {
    _classCallCheck(this, RequiredRule);

    return _possibleConstructorReturn(this, (RequiredRule.__proto__ || Object.getPrototypeOf(RequiredRule)).apply(this, arguments));
  }

  _createClass(RequiredRule, [{
    key: 'validate',
    value: function validate() {
      if (!this._isset()) return false;
      return Boolean(this.value.length > 0);
    }
  }]);

  return RequiredRule;
}(_BaseRule3.default);

exports.default = RequiredRule;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseRule2 = __webpack_require__(1);

var _BaseRule3 = _interopRequireDefault(_BaseRule2);

var _helpers = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StringRule = function (_BaseRule) {
  _inherits(StringRule, _BaseRule);

  function StringRule() {
    _classCallCheck(this, StringRule);

    return _possibleConstructorReturn(this, (StringRule.__proto__ || Object.getPrototypeOf(StringRule)).apply(this, arguments));
  }

  _createClass(StringRule, [{
    key: 'validate',
    value: function validate() {
      if (!this._isset()) return false;
      return (0, _helpers.isString)(this.value);
    }
  }]);

  return StringRule;
}(_BaseRule3.default);

exports.default = StringRule;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseRule2 = __webpack_require__(1);

var _BaseRule3 = _interopRequireDefault(_BaseRule2);

var _helpers = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberRule = function (_BaseRule) {
  _inherits(NumberRule, _BaseRule);

  function NumberRule() {
    _classCallCheck(this, NumberRule);

    return _possibleConstructorReturn(this, (NumberRule.__proto__ || Object.getPrototypeOf(NumberRule)).apply(this, arguments));
  }

  _createClass(NumberRule, [{
    key: 'validate',
    value: function validate() {
      if (!this._isset()) return false;
      if ((0, _helpers.isInt)(this.value)) this.value = Number(this.value);
      return (0, _helpers.isNumber)(this.value);
    }
  }]);

  return NumberRule;
}(_BaseRule3.default);

exports.default = NumberRule;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseRule2 = __webpack_require__(1);

var _BaseRule3 = _interopRequireDefault(_BaseRule2);

var _helpers = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BooleanRule = function (_BaseRule) {
  _inherits(BooleanRule, _BaseRule);

  function BooleanRule() {
    _classCallCheck(this, BooleanRule);

    return _possibleConstructorReturn(this, (BooleanRule.__proto__ || Object.getPrototypeOf(BooleanRule)).apply(this, arguments));
  }

  _createClass(BooleanRule, [{
    key: 'validate',
    value: function validate() {
      if (!this._isset()) return false;
      return (0, _helpers.isBoolean)(this.value);
    }
  }]);

  return BooleanRule;
}(_BaseRule3.default);

exports.default = BooleanRule;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseRule2 = __webpack_require__(1);

var _BaseRule3 = _interopRequireDefault(_BaseRule2);

var _helpers = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmailRule = function (_BaseRule) {
  _inherits(EmailRule, _BaseRule);

  function EmailRule() {
    _classCallCheck(this, EmailRule);

    return _possibleConstructorReturn(this, (EmailRule.__proto__ || Object.getPrototypeOf(EmailRule)).apply(this, arguments));
  }

  _createClass(EmailRule, [{
    key: 'validate',
    value: function validate() {
      if (!this._isset()) return false;
      return (0, _helpers.isEmail)(this.value);
    }
  }]);

  return EmailRule;
}(_BaseRule3.default);

exports.default = EmailRule;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseRule2 = __webpack_require__(1);

var _BaseRule3 = _interopRequireDefault(_BaseRule2);

var _helpers = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckedRule = function (_BaseRule) {
  _inherits(CheckedRule, _BaseRule);

  function CheckedRule() {
    _classCallCheck(this, CheckedRule);

    return _possibleConstructorReturn(this, (CheckedRule.__proto__ || Object.getPrototypeOf(CheckedRule)).apply(this, arguments));
  }

  _createClass(CheckedRule, [{
    key: 'validate',
    value: function validate(expected) {
      if (!this._isset()) return false;
      return this._hasHTMLField() && (0, _helpers.isCheckboxElement)(this.HTMLField) ? this.HTMLField.checked === expected : this.value == expected;
    }
  }]);

  return CheckedRule;
}(_BaseRule3.default);

exports.default = CheckedRule;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseRule2 = __webpack_require__(1);

var _BaseRule3 = _interopRequireDefault(_BaseRule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageRule = function (_BaseRule) {
  _inherits(ImageRule, _BaseRule);

  function ImageRule(rule, key, value, HTMLField) {
    _classCallCheck(this, ImageRule);

    var _this = _possibleConstructorReturn(this, (ImageRule.__proto__ || Object.getPrototypeOf(ImageRule)).call(this, rule, key, value, HTMLField));

    _this.mimetypes = ['jpg', 'jpeg', 'png', 'svg', 'tiff', 'bmp', 'gif'];
    return _this;
  }

  _createClass(ImageRule, [{
    key: 'validate',
    value: function validate() {
      var mimetypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.mimetypes;

      if (!this._isset()) return false;
      var re = new RegExp(mimetypes.join('|'), 'gi');
      return Boolean(this.value.constructor === FileList && this.value.length && Array.from(this.value).some(function (item) {
        return re.test(item.type);
      }));
    }
  }]);

  return ImageRule;
}(_BaseRule3.default);

exports.default = ImageRule;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  if (!Event.prototype.preventDefault) {
    Event.prototype.preventDefault = function () {
      this.returnValue = false;
    };
  }
  if (!Event.prototype.stopPropagation) {
    Event.prototype.stopPropagation = function () {
      this.cancelBubble = true;
    };
  }
  if (!Element.prototype.addEventListener) {
    var eventListeners = [];

    var addEventListener = function addEventListener(type, listener /*, useCapture (will be ignored) */) {
      var self = this;
      var wrapper = function wrapper(e) {
        e.target = e.srcElement;
        e.currentTarget = self;
        if (typeof listener.handleEvent != 'undefined') {
          listener.handleEvent(e);
        } else {
          listener.call(self, e);
        }
      };
      if (type == "DOMContentLoaded") {
        var wrapper2 = function wrapper2(e) {
          if (document.readyState == "complete") {
            wrapper(e);
          }
        };
        document.attachEvent("onreadystatechange", wrapper2);
        eventListeners.push({ object: this, type: type, listener: listener, wrapper: wrapper2 });

        if (document.readyState == "complete") {
          var e = new Event();
          e.srcElement = window;
          wrapper2(e);
        }
      } else {
        this.attachEvent("on" + type, wrapper);
        eventListeners.push({ object: this, type: type, listener: listener, wrapper: wrapper });
      }
    };
    var removeEventListener = function removeEventListener(type, listener /*, useCapture (will be ignored) */) {
      var counter = 0;
      while (counter < eventListeners.length) {
        var eventListener = eventListeners[counter];
        if (eventListener.object == this && eventListener.type == type && eventListener.listener == listener) {
          if (type == "DOMContentLoaded") {
            this.detachEvent("onreadystatechange", eventListener.wrapper);
          } else {
            this.detachEvent("on" + type, eventListener.wrapper);
          }
          eventListeners.splice(counter, 1);
          break;
        }
        ++counter;
      }
    };
    Element.prototype.addEventListener = addEventListener;
    Element.prototype.removeEventListener = removeEventListener;
    if (HTMLDocument) {
      HTMLDocument.prototype.addEventListener = addEventListener;
      HTMLDocument.prototype.removeEventListener = removeEventListener;
    }
    if (Window) {
      Window.prototype.addEventListener = addEventListener;
      Window.prototype.removeEventListener = removeEventListener;
    }
  }
})();

/***/ })
/******/ ]);