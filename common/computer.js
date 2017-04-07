import dictionary from './dictionary.js';

function Computer () {
  this.memory = null;
}

Computer.prototype.responseAnswer = function (firstLetter) {
  var word = dictionary.getByFirstLetter(firstLetter);
  return word;
}

export default new Computer();
