export default {
  isEmail(str) {
    try {
      if (str !== null && str.length > 0) {
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
        return reg.test(str)
      }
    } catch (e) {
      return true
    }
  }
}
