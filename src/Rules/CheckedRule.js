import BaseRule from './BaseRule'

export default class CheckedRule extends BaseRule {

  constructor (value) {
    super(value)
  }

  validate (expected) {
    return this.value == expected
  }

}