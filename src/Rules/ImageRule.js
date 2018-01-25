import BaseRule from './BaseRule'

export default class ImageRule extends BaseRule {

  constructor (rule, key, value, HTMLField) {
    super(rule, key, value, HTMLField)
    this.mimetypes = ['jpg', 'jpeg', 'png', 'svg', 'tiff', 'bmp', 'gif']
  }

  validate (mimetypes = this.mimetypes) {
    if (!this._isset()) return false
    const re = new RegExp(mimetypes.join('|'), 'gi')
    return Boolean(
      this.value.constructor === FileList && 
      this.value.length && 
      Array.from(this.value).some(item => re.test(item.type))
    )
  }

}