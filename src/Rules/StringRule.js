import BaseRule from './BaseRule'

export default class StringRule extends BaseRule {

  constructor (value) {
    super(value)
  }

  validate () {
    return this.value !== undefined && this.helpers._isString(this.value)
  }

}