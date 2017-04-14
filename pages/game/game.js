var dictionary = require('../../common/dictionary.js');
var gameControl = require('../../common/gameControl.js');
var computer = require('../../common/computer.js');

Page({
    data: {
        score: 0,
        answer: '',
        errorMsg: ' ',
        timerStatus: 'no-animation',
        defaultTimerNumber: 15,
        timerNumber: 15,
        timerId: null,
        wordChain: [],
        scrollTop: 0,
        gameover: false,
        resultMsg: ''
    },
    onReady: function () {
        this.start();
        
    },
    start: function () {
        var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        this.setData({
            wordChain: [],
            score: 0,
            gameover: false,
            resultMsg: '',
            scrollTop: 0,
            errorMsg: ' '
        });
        var computerAnswer = computer.default.responseAnswer(letters[new Date().getTime() % 25]);
        this.answer(computerAnswer, 'computer');
        this.startTimer();
    },
    restart: function () {
        var wordChain = this.data.wordChain;
        for (var i = 0; i < wordChain.length; i++) {
            dictionary.default.add(wordChain[i]);
        }
        this.start();
    },
    validate: function (word) {
        var search = dictionary.default.get(word);
        var wordChain = this.data.wordChain;
        var isRepeat = false;
        for (var i = 0; i < wordChain.length; i++) {
            var wordItem = wordChain[i];
            if (wordItem.word === word) {
                isRepeat = true;
                break;
            }
        }
        if (isRepeat === true) {
            return {
                status: false,
                msg: '这个单词已经出现过了'
            }
        }
        var validate = search === word;
        if (validate) {
            dictionary.default.remove(word);
            return {
                status: true
            }
        } else {
            return {
                status: false,
                msg: '呀，拼错了！'
            }
        }
    },
    answer: function (word, role) {
        var self = this;
        var validate = this.validate(word);
        if (!validate.status) {
            this.setData({
                errorMsg: validate.msg
            });
            return false;
        }

        var oldWordChain = this.data.wordChain;
        oldWordChain.push({
            word: word,
            preWord: word.slice(0, word.length - 1),
            lastLetter: word.slice(word.length - 1)
        });
        this.setData({
            wordChain: oldWordChain,
            score: this.data.score + 1
        });
        this.scrollDown(0, 400);
        if (this.data.score === 50) {
            this.gameOver('player');
            return;
        }
        this.startTimer();
        if (role === 'computer') {
            this.setData({
                answer: word.slice(word.length - 1)
            })
        } else if (role === 'player') {
            this.setData({
                errorMsg: ' '
            });
            this.answer(computer.default.responseAnswer(word.slice(word.length - 1)), 'computer');
        }
    },
    linear: function (t, b, c, d) {
        return c * t/d + b;
    },
    scrollDown: function(currentTime,duration) {
        var self = this;
        var scrollTop = this.data.scrollTop;
        var changeValue = 60;
        var beginValue = 0;
        if (changeValue <= 0) {
            return;
        }
        var value = this.linear(currentTime, beginValue, changeValue, duration);
        this.setData({
            scrollTop: scrollTop + value
        });
        currentTime = currentTime + 20;
        if (currentTime <= duration) {
            setTimeout(function(){
                self.scrollDown(currentTime,duration);
            },16.7);
        }
    },
    responseAnswer: function () {
        var self = this;
        
        this.answer(this.data.answer, 'player');
    },
    startTimer: function () {
        var self = this;
        clearInterval(this.timerId);
        this.setData({
            timerStatus: 'no-animation'
        });
        setTimeout(function () {
            self.setData({
                timerStatus: '',
                timerNumber: 15
            });
        }, 17);
        this.timerId = setInterval(function () {
            self.setData({
                timerNumber: self.data.timerNumber - 1
            });
            if (self.data.timerNumber === 0) {
                clearInterval(self.timerId);
                // 电脑获胜
                self.gameOver('computer');
            }
        }, 1000);
    },
    writeAnswer: function(event) {
        var letter = event.target.dataset.letter;
        if (letter === undefined) {
            return;
        }

        var newAnswer = '';
        var oldAnswer = this.data.answer;
        if (letter === 'delete') {
            if (oldAnswer.length === 1) {
                return;
            }
            newAnswer = oldAnswer.substr(0, oldAnswer.length - 1);
        } else {
            newAnswer = oldAnswer + letter;
        }
        this.setData({
            answer: newAnswer
        })
    },
    gameOver: function (winner) {
        console.log(winner);
        clearInterval(this.data.timerId);
        if (winner === 'computer') {
            this.setData({
                gameover: true,
                timerStatus: 'no-animation',
                resultMsg: 'GAME OVER!'
            });
        } else {
            console.log(123);
            this.setData({
                gameover: true,
                timerStatus: 'no-animation',
                resultMsg: 'YOU WIN!'
            })
        }
    }
});