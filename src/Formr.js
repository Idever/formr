'use strict'

const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const DEFAULT_SETTINGS = {
  debug: false,
  test_mode: false // false|browser|server|both
}

class Formr {
  
  constructor (data, settings = {}) {
    if (!data) throw new Error('Formr :: data is not defined')

    this._isHTMLFormElement = false
    this._data = data
    this._settings = Object.assign({}, DEFAULT_SETTINGS, settings)
    this._values = {}
    this._errors = {}
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
      'image': 'Format de fichier invalide (acceptés: :accepted_mimetypes)',
      'type': 'Le fichier doit être de type ":mimetype"',
    }
    
    this._initData()
    this._fillValues()
  }

  isValid () {
    return Boolean(Object.keys(this._errors).length === 0)
  }

  getErrors () {
    return this._errors
  }

  required () {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        this.required(arguments[i])
      }
    } else {
      const [key,] = arguments
      const value = this._getValue(key)
      if (
        value === undefined || 
        (this._isString(value) && value.length === 0)
      ) this._addError(key, 'required')
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
    const value = this._getValue(key)
    if (value != expected)
      this._addError(key, expected === true ? 'checked' : 'unchecked')
    return this
  }
  
  image (key, accepted_mimetypes = ['jpg', 'jpeg', 'png', 'svg', 'tiff', 'bmp', 'gif']) {
    if (this._isHTMLFormElement || this._settings.test_mode !== false) {
      const value = this._getValue(key)
      const re = new RegExp(accepted_mimetypes.join('|'), 'i')
      if (!re.test(value.type)) this._addError(key, 'image', { accepted_mimetypes: accepted_mimetypes.join(',')  })
    }
    return this
  }

  type (key, mimetype) {
    if (this._isHTMLFormElement || this._settings.test_mode !== false) {
      const value = this._getValue(key)
      if (value.type !== mimetype) this._addError(key, 'type', { mimetype })
    }
  }

  /*size (key, size = 0) {
    if (this._isHTMLFormElement) {
      
    }
  }*/

  in (key, constraints) {
    const value = this._getValue(key)
    if (!Array.isArray(constraints, value))
      this._addError(key, 'in', {':values': constraints.join(',')})
    return this
  }

  between (key, min = 0, max = 0) {
    const value = this._getValue(key)
    if (
      (this._isString(value) && (value.length < min || value.length > max)) ||
      (this._isNumber(value) && (value < min || value > max))
    ) this._addError(key, 'length', {':min': min, ':max': max})
    return this
  }

  under (key, max = 0, strict = false) {
    const value = Number(this._getValue(key))
    if (
      this._isNumber(value) &&
      ((strict && value > max) ||
      (!strict && value >= max))
    ) this._addError(key, 'under', {':max': max, ':strict': !strict ? ' strictement' : ''})
    return this
  }

  above (key, min = 0, strict = false) {
    const value = Number(this._getValue(key))

    if (
      this._isNumber(value) &&
      ((strict && value < min) ||
      (!strict && value <= min))
    ) this._addError(key, 'above', {':min': min, ':strict': !strict ? ' strictement' : ''})
    return this
  }

  same (key, comparisonValue = '', strict = false) {
    const value = Number(this._getValue(key))
    if (
      (!strict && comparisonValue != value) ||
      (strict && comparisonValue !== value)
    ) this._addError(key, 'same', {':expected': value, ':value': comparisonValue})
    return this
  }

  _getValue (key) {
    if (this._values[key] !== undefined) return this._values[key]
    else if (this._data[key] !== undefined) return this._data[key].value
    else throw new Error(`Key '${key}' does not exists !`)
  }

  _fillValues () {
    if (Object.keys(this._values).length) return
    for (var i = 0; i < this._data.length; i++) {
      var item = this._data[i]
      if (item.name !== undefined && this._values[item.name] === undefined)
        this._values[item.name] = item.value
      }
  }

  _addError (key, type, repl = null) {
    var message = this._messages[type]
    if (!message) return
    if (repl) {
      message = message.replace(
        new RegExp(Object.keys(repl).join("|"), "g"),
        function (s) { return repl[s]; }
      );
    }
    if (!this._errors[key]) this._errors[key] = []
    this._errors[key].push(message)
  }

  _isString (value) {
    try {
      return (value.constructor && value.constructor === String) || typeof value === "string"
    } catch (e) {
      console.error(e)
    }
    return false
  }

  _isNumber (value) {
    try {
      return (value.constructor && value.constructor === Number) || typeof value === "number"
    } catch (e) {
      console.error(e)
    }
    return false
  }

  _isBoolean (value) {
    try {
      return (value.constructor && value.constructor === Boolean) || typeof value === "boolean"
    } catch (e) {
      console.error(e)
    }
    return false
  }

  _isEmail (value) {
    try {
      return EMAIL_REGEXP.test(value)
    } catch (e) {
      console.error(e)
    }
    return false
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
      const _assert_method_name = `_is${rule_name.charAt(0).toUpperCase() + rule_name.slice(1)}`
      if (this[_assert_method_name] !== undefined && this[_assert_method_name](value) === false) this._addError(key, fn)
    }
    return this
  }

  messages (messages = {}) {
    this._messages = Object.assign({}, this._messages, messages)
    return this
  }
}

module.exports = Formr