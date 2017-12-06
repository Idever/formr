import BaseRule from './BaseRule'

export default class ImageRule extends BaseRule {

  constructor (value) {
    super(value)
    this.mimetypes = ['jpg', 'jpeg', 'png', 'svg', 'tiff', 'bmp', 'gif']
  }

  validate (mimetypes = this.mimetypes) {
    const re = new RegExp(mimetypes.join('|'), 'i')
    return this.value !== undefined && this.value.type && re.test(this.value.type)
  }

}