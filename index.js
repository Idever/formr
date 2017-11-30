import Formr from './src/Formr'

(function (w) {
  if (w !== undefined) {
    if (!(w.Formr)) {
      w.Formr = Formr
    }
  }
})(window, undefined)

export default Formr