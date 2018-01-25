import BaseRule from './BaseRule'
import { isStr, isString, isInt } from '../../lib/helpers'

export default class RequiredRule extends BaseRule {

  validate () {
    if (!this._isset()) return false
    return Boolean(this.value.length > 0)
  }

}