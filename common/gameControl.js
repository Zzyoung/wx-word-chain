
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

export default {
  scoreDom: null,
  errorMsgDom: null,
  wordChainDom: null,
  wordChainWrapper: null,
  timerDom: {
    timerWrapper: null,
    num: null,
    left: null,
    right: null,
    rotate: null
  },
  endModal: null,
  score: 0,
  defaultCycle: 15,
  cycle: 15,
  jsTimer: null,
  wordChain: [{
            word:'start',
            preWord: 'star',
            lastLetter: 't'
        }],
  validate: function (word) {
    if (!word) {
      return false;
    }
    var search = dictionary.get(word);
    var validate = search === word;
    if (validate) {
      dictionary.remove(word);
    }
    return validate;
  },
  answer: function (word, player) {
    var self = this;
    var validate = this.validate(word);
    if (!validate) {
      this.showError('呀，拼错了！');
      return false;
    }

    var isRepeat = this.isRepeat(word);
    if (isRepeat) {
      this.showError('这个单词已经出现过了');
      return false;
    }
    
    this.addNewWordInChain(word);
    this.hideError();
    this.timePause();
    this.getScore();
    if (player === 'computer') {
      this.fire('nextRound-player',word);
    } else {
      this.fire('nextRound-computer',word);
    }
    this.timeStart();
  },
  addNewWordInChain: function (word) {
    this.wordChain.push(word);
    var li = document.createElement('li');
    var innerHtml = wordTemplate({word:word});
    li.innerHTML = innerHtml;
    this.wordChainDom.appendChild(li);
    utils.scrollDown(this.wordChainWrapper, 0, 0.4);
  },
  isRepeat: function (word) {
    return this.wordChain.indexOf(word) >= 0;
  },
  reset: function () {
    for (var i = this.wordChain.length - 1; i >= 0; i--) {
      dictionary.add(this.wordChain[i], this.wordChain[i]);
    }
    this.wordChain = [];
  },
  getScore: function () {
    this.score ++;
    this.scoreDom.innerHTML = this.score;
  },
  timeStart: function () {
    var self = this;
    utils.addClass(this.timerDom.timerWrapper,'no-animation');
    utils.removeClass(this.timerDom.timerWrapper, 'paused');
    setTimeout(function() {
      utils.removeClass(self.timerDom.timerWrapper,'no-animation');
    },20);
    this.timerDom.num.innerHTML = this.defaultCycle;
    this.cycle = this.defaultCycle;
    this.startInterval();
  },
  timePause: function () {
    utils.addClass(this.timerDom.timerWrapper, 'paused');
  },
  start: function(config) {
    document.querySelector('.start-page').style.display = 'none';
    document.querySelector('.game-page').style.display = 'block';
    this.hideError();
    this.timeStart();
    this.startInterval();
    this.fire('nextRound-computer', letters[new Date().getTime() % 25]);
  },
  restart: function () {
    this.endModal.style.display = 'none';
    this.score = 0;
    this.cycle = this.defaultCycle;
    this.scoreDom.innerHTML = 0;
    this.wordChainDom.innerHTML = '';
    this.reset();

    this.start();
  },
  startInterval: function() {
    var self = this;
    clearInterval(this.jsTimer);
    this.jsTimer = setInterval(function () {
      self.cycle--;
      self.timerDom.num.innerHTML = self.cycle;
      if (self.cycle === 0) {
        clearInterval(self.jsTimer);
        self.computerWin();
      }
    }, 1000);
  },
  computerWin: function () {
    this.timePause();
    
    this.endModal.querySelector('.score').innerHTML = this.score;
    this.endModal.style.display = 'block';
    utils.addClass(keyboard, 'hide');
  },
  playerWin: function () {
    this.timePause();

    this.endModal.querySelector('.score').innerHTML = this.score;
    this.endModal.querySelector('.modal-header').innerHTML = 'YOU WIN!';
    this.endModal.style.display = 'block';
  },
  hideError: function () {
    this.errorMsgDom.style.visibility = 'hidden';
  },
  showError: function (msg) {
    this.errorMsgDom.innerHTML = msg;
    this.errorMsgDom.style.visibility = 'visible';
  }
};
