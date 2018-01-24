import BaseRule from './BaseRule'
import { isStr, isString, isInt } from '../../lib/helpers'

export default class RequiredRule extends BaseRule {

  validate () {
    let v = true
    if (isStr(this.value)) v = Boolean(this.value.trim().length > 0)
    return this.value !== undefined && v;
  }

}