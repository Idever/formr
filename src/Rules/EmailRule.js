import BaseRule from './BaseRule'
import { isEmail } from '../../lib/helpers'

export default class EmailRule extends BaseRule {

  validate () {
    if (!this._isset()) return false
    return isEmail(this.value)
  }

}