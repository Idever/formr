import BaseRule from './BaseRule'

export default class BooleanRule extends BaseRule {

  constructor (value) {
    super(value)
  }

  validate () {
    return this.value !== undefined && this.helpers._isBoolean(this.value)
  }

}