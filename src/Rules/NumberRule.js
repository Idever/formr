import BaseRule from './BaseRule'
import { isInt, isNumber } from '../../lib/helpers'

export default class NumberRule extends BaseRule {

  validate () {
    if (!this._isset()) return false
    if (isInt(this.value)) this.value = Number(this.value)
    return isNumber(this.value)
  }

}