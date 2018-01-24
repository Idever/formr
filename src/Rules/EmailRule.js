import BaseRule from './BaseRule'
import { isEmail } from '../../lib/helpers'

export default class EmailRule extends BaseRule {

  validate () {
    return this.value !== undefined && isEmail(this.value)
  }

}