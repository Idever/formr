export default class BaseRule {

  constructor (rule, key, value = undefined, constraints = [], HTMLField = null) {
    this.rule = rule
    this.key = key
    this.value = value
    this.constraints = constraints
    this.HTMLField = HTMLField
  }

  _hasHTMLField () {
    return this.HTMLField && this.HTMLField.length
  }

}