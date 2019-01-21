export default {
  sha3 (code) {
    const JsSHA = require('jssha')
    var shaObj = new JsSHA('SHA3-256', 'TEXT')
    shaObj.update(code)
    return shaObj.getHash('HEX')
  }
}
