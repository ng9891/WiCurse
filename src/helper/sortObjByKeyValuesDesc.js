function sortObjByKeyValuesDesc(obj) {
  return Object.keys(obj).sort((a, b) => {
    return obj[a] - obj[b];
  }).reverse();
}

module.exports = sortObjByKeyValuesDesc;
