export const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export default {

  _isString (value) {
    try {
      return (value.constructor && value.constructor === String) || typeof value === "string"
    } catch (e) {
      console.error(e)
    }
    return false
  },

  _isNumber (value) {
    try {
      return (value.constructor && value.constructor === Number) || typeof value === "number"
    } catch (e) {
      console.error(e)
    }
    return false
  },

  _isBoolean (value) {
    try {
      return (value.constructor && value.constructor === Boolean) || typeof value === "boolean"
    } catch (e) {
      console.error(e)
    }
    return false
  },

  _isEmail (value) {
    try {
      return EMAIL_REGEXP.test(value)
    } catch (e) {
      console.error(e)
    }
    return false
  },

  _isFunction (value) {
    try {
      return (value.constructor && value.constructor === Function) || typeof value === "function"
    } catch (e) {
      console.error(e)
    }
    return false
  },
  
  _isInt (value) {
    return !isNaN(Number(value))
  },
  
  _isStr (value) {
    return !this._isInt(value) && this._isString(value)
  },

  _capitalize (value) {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
  }

}