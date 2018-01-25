import BaseRule from './BaseRule'
import { isBoolean } from '../../lib/helpers'

export default class BooleanRule extends BaseRule {

  validate () {
    if (!this._isset()) return false
    return isBoolean(this.value)
  }

}