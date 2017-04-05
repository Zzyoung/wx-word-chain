import dictionary from './dictionary.js';

function Computer () {
  this.memory = null;
}

Computer.prototype.responseAnswer = function (firstLetter) {
  console.log('firstLetter:', firstLetter);
  console.log(dictionary);
  var word = dictionary.getByFirstLetter(firstLetter);
  console.log('computer answer:', word);
  return word;
}

export default new Computer();
