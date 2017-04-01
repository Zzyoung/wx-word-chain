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
        this.setData({
            scrollTop: this.data.scrollTop + 60
        });
    }
});