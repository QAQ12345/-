//app.js
App({
  globalData: {
    windowWidth: 0,
    windowHeight: 0,
    distinct: 'kekele'
  },
  onLaunch() {
    this.handleSystemInfo();
  },
  handleSystemInfo() {
    let windowWidth = wx.getStorageSync('windowWidth');
    let windowHeight = wx.getStorageSync('windowHeight');
    if (windowWidth && windowHeight){
      this.globalData.windowWidth = windowWidth;
      this.globalData.windowHeight = windowHeight;
    }else{
      try {
        let res = wx.getSystemInfoSync();

        this.globalData.windowWidth = res.windowWidth;
        this.globalData.windowHeight = res.windowHeight;
        wx.setStorageSync('windowWidth', res.windowWidth);
        wx.setStorageSync('windowHeight', res.windowHeight);
      } catch (e) {}
    }
  }
})