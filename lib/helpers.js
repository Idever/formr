// Constants
export const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/


// Value type
export const isString = value => {
  try {
    return (value.constructor && value.constructor === String) || typeof value === "string"
  } catch (e) {
    console.error(e)
  }
  return false
}

export const isNumber = value => {
  try {
    return (value.constructor && value.constructor === Number) || typeof value === "number"
  } catch (e) {
    console.error(e)
  }
  return false
}

export const isBoolean = value => {
  try {
    return (value.constructor && value.constructor === Boolean) || typeof value === "boolean"
  } catch (e) {
    console.error(e)
  }
  return false
}

export const isEmail = value => {
  try {
    return EMAIL_REGEXP.test(value)
  } catch (e) {
    console.error(e)
  }
  return false
}

export const isFunction = value => {
  try {
    return (value.constructor && value.constructor === Function) || typeof value === "function"
  } catch (e) {
    console.error(e)
  }
  return false
}

export const isInt = value => Boolean(value.length && !isNaN(Number(value)))
export const isStr = value => isInt(value) === false && isString(value)


// Field type
const isInputElement = field => field.constructor === HTMLInputElement
const isTextInputElement = field => isInputElement(field) && field.type === "text"
const isNumberInputElement = field => isInputElement(field) && field.type === "number"
const isEmailInputElement = field => isInputElement(field) && field.type === "email"
const isDateInputElement = field => isInputElement(field) && field.type === "date"
const isCheckboxElement = field => isInputElement(field) && field.type === "checkbox"
const isRadioElement = field => isInputElement(field) && field.type === "radio"
const isSelectElement = field => field.constructor === HTMLSelectElement
const isTextareaElement = field => field.constructor === HTMLTextAreaElement
const isCheckableElement = field => isInput && (isCheckboxElement || isRadioElement)


// Field state
const isFieldChecked = field => (isCheckboxElement(field) && isRadioElement(field)) && field.checked === true
const isFieldUnchecked = field => (isCheckboxElement(field) && isRadioElement(field)) && field.checked === false
const isFieldSelected = field => isSelectElement(field) && field.selected === true
const isFieldUnselected = field => isSelectElement(field) && field.selected === false


// Tools
export const capitalize = value => `${value.charAt(0).toUpperCase()}${value.slice(1)}`

export default {
  CONSTANTS: { EMAIL_REGEXP },
  value_type: {
    isString,
    isNumber,
    isBoolean,
    isEmail,
    isFunction,
    isInt,
    isStr
  },
  field_type: {
    isInputElement,
    isTextInputElement,
    isNumberInputElement,
    isEmailInputElement,
    isDateInputElement,
    isCheckboxElement,
    isRadioElement,
    isSelectElement,
    isTextareaElement,
    isCheckableElement
  },
  field_state: {
    isFieldChecked,
    isFieldUnchecked,
    isFieldSelected,
    isFieldUnselected
  },
  tools: {
    capitalize
  }
}