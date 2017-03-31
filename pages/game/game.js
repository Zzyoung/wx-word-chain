var dictionary = require('../../common/dictionary.js');

Page({
    data: {
        answer: '',
        errorMsg: '',
        wordChain: [{
            word:'start',
            preWord: 'star',
            lastLetter: 't'
        },{
            word: 'teach',
            preWord: 'teac',
            lastLetter: 'h'
        },{
            word: 'teach',
            preWord: 'teac',
            lastLetter: 'h'
        },{
            word: 'teach',
            preWord: 'teac',
            lastLetter: 'h'
        },{
            word: 'teach',
            preWord: 'teac',
            lastLetter: 'h'
        },{
            word: 'teach',
            preWord: 'teac',
            lastLetter: 'h'
        },{
            word: 'teach',
            preWord: 'teac',
            lastLetter: 'h'
        },{
            word: 'teach',
            preWord: 'teac',
            lastLetter: 'h'
        }],
        scrollTop: 0
    },
    onShow: function () {
        
    },
    responseAnswer: function () {
        console.log(123);
        this.setData({
            scrollTop: 100
        });
        console.log(this.scrollTop);
    }
});