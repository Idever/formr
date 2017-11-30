'use strict'

var email_regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

function Validator (form) {
  if (!form) throw new Error('Validator :: form is not defined')
  this._data = form.elements || null
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

Validator.prototype.isValid = function () {
  return Boolean(Object.keys(this._errors).length === 0)
}

Validator.prototype.getErrors = function () {
  return this._errors
}

Validator.prototype.required = function () {
  if (arguments.length > 1) {
    for (var i = 0; i < arguments.length; i++) {
      this.required(arguments[i])
    }
  } else {
    var key = arguments[0]
    var value = this._getValue(key)
    if (!value || !value.length) this._addError(key, 'required')
  }
  return this
}

Validator.prototype.string = function () {
  if (arguments.length > 1) {
    for (var i = 0; i < arguments.length; i++) {
      this.string(arguments[i])
    }
  } else {
    var key = arguments[0]
    var value = this._getValue(key)
    if (!this._isString(value)) this._addError(key, 'string')
  }
  return this
}

Validator.prototype.boolean = function () {
  if (arguments.length > 1) {
    for (var i = 0; i < arguments.length; i++) {
      this.boolean(arguments[i])
    }
  } else {
    var key = arguments[0]
    var value = this._getValue(key)
    if (!this._isBoolean(value)) this._addError(key, 'boolean')
  }
  return this
}

Validator.prototype.email = function () {
  if (arguments.length > 1) {
    for (var i = 0; i < arguments.length; i++) {
      this.string(arguments[i])
    }
  } else {
    var key = arguments[0]
    var value = this._getValue(key)
    if (!(email_regexp.test(value)))
      this._addError(key, 'email')
  }
  return this
}

Validator.prototype.in = function (key, constraints) {
  var value = this._getValue(key)
  if (!Array.isArray(constraints, value))
    this._addError(key, 'in', {':values': constraints.join(',')})
  return this
}

Validator.prototype.between = function (key, min, max) {
  var value = this._getValue(key)
  min = min || 0
  max = max || 0
  if (
    (this._isString(value) && (value.length < min || value.length > max)) ||
    (this._isNumber(value) && (value < min || value > max))
  ) this._addError(key, 'length', {':min': min, ':max': max})
  return this
}

Validator.prototype.under = function (key, max, strict) {
  strict = Boolean(strict)
  var value = Number(this._getValue(key))
  if (
    this._isNumber(value) &&
    ((strict && value > max) ||
    (!strict && value >= max))
  ) this._addError(key, 'under', {':max': max, ':strict': strict ? ' strictement' : ''})
  return this
}

Validator.prototype.above = function (key, min, strict) {
  strict = Boolean(strict)
  var value = Number(this._getValue(key))
  if (
    this._isNumber(value) &&
    ((strict && value < min) ||
    (!strict && value <= min))
  ) this._addError(key, 'above', {':min': min, ':strict': strict ? ' strictement' : ''})
  return this
}

Validator.prototype.same = function (key, comparisonValue, strict) {
  strict = Boolean(strict)
  var value = Number(this._getValue(key))
  if (
    (!strict && comparisonValue != value) ||
    (strict && comparisonValue !== value)
  ) this._addError(key, 'same', {':expected': value, ':value': comparisonValue})
  return this
}

Validator.prototype._getValue = function (key) {
  if (this._values[key]) return this._values[key]
  else if (this._data[key]) return this._data[key].value
  else throw new Error('Key %s does not exists !', key)
}

Validator.prototype._fillValues = function () {

  if (Object.keys(this._values).length) return
  for (var i = 0; i < this._data.length; i++) {
    var item = this._data[i]
    if (item.name && !this._values[item.name])
      this._values[item.name] = item.value
  }
}

Validator.prototype._addError = function (key, type, repl) {
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

Validator.prototype._isString = function (value) {
  try {
    return (value.constructor && value.constructor === String) || typeof value === "string"
  } catch (e) {
    console.error(e)
  }
  return false
}

Validator.prototype._isNumber = function (value) {
  try {
    return (value.constructor && value.constructor === Number) || typeof value === "number"
  } catch (e) {
    console.error(e)
  }
  return false
}

Validator.prototype._isBoolean = function (value) {
  try {
    return (value.constructor && value.constructor === Boolean) || typeof value === "boolean"
  } catch (e) {
    console.error(e)
  }
  return false
}
