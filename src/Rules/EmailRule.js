import BaseRule from './BaseRule'

export default class EmailRule extends BaseRule {

  constructor (value) {
    super(value)
  }

  validate () {
    return this.value !== undefined && this.helpers._isEmail(this.value)
  }

}