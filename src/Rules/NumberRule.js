import BaseRule from './BaseRule'
import { isInt, isNumber } from '../../lib/helpers'

export default class NumberRule extends BaseRule {

  validate () {
    if (isInt(this.value)) this.value = Number(this.value)
    return this.value !== undefined && isNumber(this.value)
  }

}