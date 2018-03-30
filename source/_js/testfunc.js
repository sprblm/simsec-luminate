const addClass = (el, newClass) => {
  if (el.className.indexOf(newClass) === -1) {
    el.className += newClass;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { addClass };
}
