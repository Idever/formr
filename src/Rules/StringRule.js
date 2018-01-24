import BaseRule from './BaseRule'
import { isString } from '../../lib/helpers'

export default class StringRule extends BaseRule {

  validate () {
    return this.value !== undefined && isString(this.value)
  }

}