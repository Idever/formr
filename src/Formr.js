'use strict'

const email_regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

class Formr {
  
  constructor (form) {
    if (!form) throw new Error('Formr :: form is not defined')

    this._data = []

    this._data = window === undefined || (window && (!window.HTMLFormElement || form.constructor !== window.HTMLFormElement))
      ? this._normalizeData(form)
      : form.elements

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
      'in': 'Seuls les valeurs ":values" sont autorisées pour ce champ'
    }
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
        (this._isString(value) && !value.length)
      ) this._addError(key, 'required')
    }
    return this
  }

  string () {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        this.string(arguments[i])
      }
    } else {
      const [key,] = arguments
      const value = this._getValue(key)
      if (!this._isString(value)) this._addError(key, 'string')
    }
    return this
  }


  number () {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        this.number(arguments[i])
      }
    } else {
      const [key,] = arguments
      const value = this._getValue(key)
      if (!this._isNumber(value)) this._addError(key, 'number')
    }
    return this
  }

  boolean () {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        this.boolean(arguments[i])
      }
    } else {
      const [key,] = arguments
      const value = this._getValue(key)
      if (!this._isBoolean(value)) this._addError(key, 'boolean')
    }
    return this
  }

  email () {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        this.string(arguments[i])
      }
    } else {
      const [key,] = arguments
      const value = this._getValue(key)
      if (!(email_regexp.test(value)))
        this._addError(key, 'email')
    }
    return this
  }

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
    ) this._addError(key, 'under', {':max': max, ':strict': strict ? ' strictement' : ''})
    return this
  }

  above (key, min = 0, strict = false) {
    const value = Number(this._getValue(key))
    if (
      this._isNumber(value) &&
      ((strict && value < min) ||
      (!strict && value <= min))
    ) this._addError(key, 'above', {':min': min, ':strict': strict ? ' strictement' : ''})
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

  _normalizeData (data = {}) {
    let arr = []
    if (Object.keys(data).length) {
      for (let name in data) {
        arr.push({
          name: name,
          value: data[name]
        })
      }
    }
    return arr
  }
}

module.exports = Formr