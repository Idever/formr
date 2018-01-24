import BaseRule from './BaseRule'
import { isBoolean } from '../../lib/helpers'

export default class BooleanRule extends BaseRule {

  validate () {
    return this.value !== undefined && isBoolean(this.value)
  }

}