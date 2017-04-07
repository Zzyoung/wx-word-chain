//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
  },
  onShareAppMessage: function () {
      return {
          title: '[小程序]单词接龙（测试分享功能）',
          path: '/pages/index/index',
          success: function(res) {
              // 分享成功
          },
          fail: function(res) {
              // 分享失败
          }
      }
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
