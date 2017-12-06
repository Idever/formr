import helpers from '../../lib/helpers'

export default class BaseRule {

  constructor (value) {
    this.value = value
    this.helpers = helpers
  }

}