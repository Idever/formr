import RequiredRule from './Rules/RequiredRule'
import StringRule from './Rules/StringRule'
import NumberRule from './Rules/NumberRule'
import BooleanRule from './Rules/BooleanRule'
import EmailRule from './Rules/EmailRule'
import CheckedRule from './Rules/CheckedRule'
import ImageRule from './Rules/ImageRule'
import { isInt, isStr, isNumber, isFunction, isInputElement, isCheckableElement, isSelectElement } from '../lib/helpers'

const DEFAULT_SETTINGS = {
  debug: false,
  test_mode: false, // false|browser|server|both
  observe_event: 'keyup',
  validate_before_submit: true
}

export default class Formr {
  constructor (data, settings = {}) {
    if (!data) throw new Error('Formr :: data is not defined')

    this._isHTMLFormElement = false
    this._data = data
    this._settings = { ...DEFAULT_SETTINGS, ...settings }
    this._values = {}
    this._errors = {}
    this._rules = {}
    this._observers = {}
    this._validators = {
      'required': RequiredRule,
      'string': StringRule,
      'number': NumberRule,
      'boolean': BooleanRule,
      'email': EmailRule,
      'checked': CheckedRule,
      'image': ImageRule
    }
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
      'in': 'Seuls les valeurs ":values" sont autorisées pour ce champ',
      'checked': 'Ce champ doit être coché',
      'unchecked': 'Ce champ ne doit pas être coché',
      'image': 'Format de fichier invalide (acceptés: :acceptedMimetypes)',
      'type': 'Le fichier doit être de type ":mimetype"',
      'size': 'La taille du fichier ne doit pas excéder :size Mo'
    }

    this._initData()
    this._form = this._isHTMLFormElement ? data : null
    this._fillValues()

    if (this._settings.messages) this.messages(this._settings.message)
  }

  isValid () {
    return Boolean(Object.keys(this._errors).length === 0)
  }

  getErrors () {
    return this._errors
  }
  
  resetErrors () {
    this._errors = []
  }
  
  messages (messages = {}) {
    this._messages = { ...this._messages, ...messages }
    return this
  }

  required () {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        this.required(arguments[i])
      }
    } else {
      const [key, ] = arguments
      const value = this._getValue(key)
      this._addRule(key, 'required')
      
      if (!this._validate('required', key, value)) this._addError(key, 'required')
    }
    return this
  }

  string () {
    this._callMultipleArgsMethod('string', arguments)
    return this
  }

  number () {
    this._callMultipleArgsMethod('number', arguments)
    return this
  }

  boolean () {
    this._callMultipleArgsMethod('boolean', arguments)
    return this
  }

  email () {
    this._callMultipleArgsMethod('email', arguments)
    return this
  }

  checked (key, expected = true) {
    const element = this._getHtmlElement(key)
    this._addRule(key, 'checked', [expected])

    if (!this._validate('checked', key, element ? Boolean(element.checked) : false, [expected])) this._addError(key, expected ? 'checked' : 'unchecked')
    return this
  }

  image (key, acceptedMimetypes = []) {
    if (this._isHTMLFormElement || this._settings.test_mode !== false) {
      const value = this._getValue(key)
      this._addRule(key, 'image', [acceptedMimetypes])

      if (!this._validate('image', key, value, [acceptedMimetypes])) this._addError(key, 'image', { acceptedMimetypes: acceptedMimetypes.join(',') })
    }
    return this
  }

  type (key, mimetype) {
    if (this._isHTMLFormElement || this._settings.test_mode !== false) {
      const value = this._getValue(key)
      this._addRule(key, 'type', [mimetype])

      if (value.type !== mimetype) this._addError(key, 'type', { mimetype })
    }
  }

  size (key, size = 0) {
    if (this._isHTMLFormElement || this._settings.test_mode !== false) {
      const value = this._getValue(key)
      this._addRule(key, 'size', [size])

      if (value.size < size) this._addError(key, 'size', { size })
    }
    return this
  }

  in (key, constraints = []) {
    const value = this._getValue(key)
    this._addRule(key, 'in', [constraints])

    if (!Array.isArray(constraints, value))
      this._addError(key, 'in', {':values': constraints.join(',')})
    return this
  }

  between (key, min = 0, max = 0) {
    const value = this._getValue(key)
    const _isInt = isInt(value)
    this._addRule(key, 'between', [min, max])

    if (
      (isStr(value) && (value.length < min || value.length > max)) ||
      (_isInt && (value < min || value > max))
    ) this._addError(key, _isInt ? 'between' : 'length', {':min': min, ':max': max})
    return this
  }

  under (key, max = 0, strict = false) {
    const value = Number(this._getValue(key))
    this._addRule(key, 'under', [max, strict])

    if (
      isNumber(value) &&
      ((strict && value > max) ||
      (!strict && value >= max))
    ) this._addError(key, 'under', {':max': max, ':strict': !strict ? ' strictement' : ''})
    return this
  }

  above (key, min = 0, strict = false) {
    const value = Number(this._getValue(key))
    this._addRule(key, 'above', [min, strict])

    if (
      isNumber(value) &&
      ((strict && value < min) ||
      (!strict && value <= min))
    ) this._addError(key, 'above', {':min': min, ':strict': !strict ? ' strictement' : ''})
    return this
  }

  same (key, comparisonValue = '', strict = false) {
    const value = Number(this._getValue(key))
    this._addRule(key, 'same', [comparisonValue, strict])

    if (
      (!strict && comparisonValue != value) ||
      (strict && comparisonValue !== value)
    ) this._addError(key, 'same', {':expected': value, ':value': comparisonValue})
    return this
  }

  validateAll () {
    this._applyRules(true)
    return this
  }

  validate () {
    if (!arguments.length) this.validateAll()
    else {
      this.resetErrors()
      Array.from(arguments).forEach(this._applyRule.bind(this))
    }
    return this
  }

  observe () {
    if (!arguments.length || isFunction(arguments[0])) throw new Error('Formr.observe :: You must specify at least one field to observe')
    if (this._isHTMLFormElement) {
      let args = Array.from(arguments)
      const callback = args.pop()
      if (!callback || callback.constructor !== Function) throw new Error('Formr.observe :: the last argument must be a valid JavaScript function')
      args.forEach(arg => this._observable(arg, callback))
    }
    return this
  }

  unobserve () {
    if (this._isHTMLFormElement && arguments.length) {
      Array.from(arguments).forEach(key => {
        this._data[key].removeEventListener(this._settings.observe_event, this._observers[key])
        this._observers[key] = null
      })
    }
    return this
  }

  submit (callback) {
    if (this._isHTMLFormElement && this._form) {
      this._form.addEventListener('submit', e => {
        if (this._settings.validate_before_submit === true)
          this.validateAll()
        callback(e)
      })
    }
    return this
  }

  _observable (arg, callback) {
    let cEvent = null
    let cCallback = null
    let validate = false

    if (Array.isArray(arg)) {
      [ arg, cEvent, customCallback, validate ] = arg
    } else if (arg.constructor === Object) {
      cEvent = arg.event || null
      cCallback = arg.callback || null
      validate = arg.validate
      arg = arg.field
    }

    this._observers[arg] = this._debounce(e => {
      const value = e.target.value
      this._setValue(arg, value)
      let err = null

      if (validate) {
        this._applyRules(true)
        err = !this.isValid() ? this.getErrors() : null
      }

      if (cCallback && cCallback.constructor === Function) cCallback(e, arg, value, err)
      callback(e, arg, value, err)
    }, 300)
    this._data[arg].addEventListener(cEvent || this._settings.observe_event, this._observers[arg])
  }

  _getValue (key) {
    if (this._values[key] !== undefined) return this._values[key]
    else if (this._data[key] !== undefined) return this._data[key].value
    else throw new Error(`Key '${key}' does not exists !`)
  }

  _getHtmlElement (key) {
    if (!this._isHTMLFormElement) return null
    return this._data[key] || null
  }

  _setValue (key, value) {
    if (this._data[key] !== undefined) this._data[key].value = value
  }

  _fillValues () {
    if (Object.keys(this._values).length) return
    for (let i = 0; i < this._data.length; i++) {
      let item = this._data[i]
      if (item.name !== undefined && this._values[item.name] === undefined)
        this._values[item.name] = item.value
      }
  }

  _addError (key, type, repl = null) {
    let message = this._messages[type]
    if (!message) return
    if (repl) message = message.replace(new RegExp(Object.keys(repl).join("|"), "g"), s => repl[s])
    if (!this._errors[key]) this._errors[key] = []
    this._errors[key].push(message)
  }

  _normalizeData () {
    let arr = []
    if (Object.keys(this._data).length) {
      for (let field in this._data) {
        arr.push({
          name: field,
          value: this._data[field]
        })
      }
    }
    this._data = arr
  }

  _initData () {
    if (window !== undefined && this._data.constructor === window.HTMLFormElement) {
      this._isHTMLFormElement = true
      this._data = this._data.elements
    } else if (this._data.constructor === Object)
      this._normalizeData()
    else
      throw new Error('Formr :: data must be a valid HTML form Element or a valid Javascript Object')
  }

  _callMultipleArgsMethod (rule_name, args = []) {
    if (args.length > 1) {
      for (let i = 0; i < args.length; i++) {
        this[rule_name](args[i])
      }
    } else {
      const [key,] = args
      const value = this._getValue(key)
      this._addRule(key, rule_name)
      if (!this._validate(rule_name, key, value)) this._addError(key, rule_name)
    }
    return this
  }

  _validate (rule, key, value, constraints = []) {
    if (this._isOptional(key) && !this._getValue(key).length) return true
    const ValidatorClass = this._validators[rule] || null
    if (!ValidatorClass) return true
    try {
      const v = new ValidatorClass(rule, key, value, constraints, this._getHtmlElement(key))
      return v.validate.apply(v, constraints)
    } catch (e) {
      throw new Error(e)
    }
    return true
  }

  _addRule (key, name, constraints = []) {
    if (!this._rules[key]) this._rules[key] = {}
    if (!this._rules[key][name]) this._rules[key][name] = constraints
  }

  _isRequired (key) {
    return Object.keys(this._rules[key]).indexOf('required') >= 0
  }

  _isOptional (key) {
    let condition = !this._isRequired(key)
    // let field = this._getHtmlElement(key)
    // let value = this._getValue(key)

    return condition
  }

  _applyRules (reset_errors = false) {
    if (reset_errors) this.resetErrors()
    this._updateValues()
    for (let key in this._rules) {
      this._applyRule(key)
    }
  }

  _applyRule (key) {
    if (!this._rules[key]) return
    const rules = this._rules[key]
    if (!rules || !Object.keys(rules).length) return
    for (let name in rules) {
      this[name].apply(this, [key, ...rules[name]])
    }
  }

  _updateValues () {
    for (let field in this._data) {
      let f = this._data[field]
      if (isInputElement(f) || isSelectElement(f))
        this._values[field] = f.value
      else if (isCheckableElement(f))
        this._values[field] = f.checked
    }
  }

  _isFormElement (item) {
    if (!this._isHTMLFormElement || !item.constructor) return false
    return [
      HTMLInputElement,
      HTMLTextAreaElement,
      HTMLSelectElement
    ].indexOf(item.constructor) >= 0
  }

  _debounce(callback, delay){
    let timer
    return function () {
      const args = arguments
      const context = this
      clearTimeout(timer)
      timer = setTimeout(() => {
          callback.apply(context, args)
      }, delay)
    }
  }
}
