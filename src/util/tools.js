export default {
  removeEmptyKey(search) {
    for (var key in search) {
      if (this.search[key] === null || this.search[key] === "") {
        delete this.search[key];
      }
    }
    return search
  },
  timeBuilder(beginDate,beginTime){
    return beginDate.getFullYear() +
    "-" +
    (new Number(beginDate.getMonth()) + 1) +
    "-" +
    beginDate.getDate() +
    " " +
    beginTime;
  }
}
