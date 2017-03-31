//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
  },
  //事件处理函数
  startGame: function() {
    wx.redirectTo({
      url: '../game/game'
    });
  },
  onLoad: function () {
    
  }
})
