import Formr from './src/Formr'

(function (w) {
  if (w !== undefined) {
    require('./lib/polyfills')
    if (!(w.Formr)) {
      w.Formr = Formr
    }
  }
})(window, undefined)

export default Formr