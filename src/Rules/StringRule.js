import BaseRule from './BaseRule'
import { isString } from '../../lib/helpers'

export default class StringRule extends BaseRule {

  validate () {
    if (!this._isset()) return false
    return isString(this.value)
  }

}