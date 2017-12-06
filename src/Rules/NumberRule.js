import BaseRule from './BaseRule'

export default class NumberRule extends BaseRule {

  constructor (value) {
    super(value)
  }

  validate () {
    return this.value !== undefined && this.helpers._isInt(this.value) && this.helpers._isNumber(this.value)
  }

}