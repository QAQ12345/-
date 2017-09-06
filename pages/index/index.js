const app = getApp();
const utils = require('../../utils/util.js');

Page({
  data:{
    "longitude": 116.407526,
    "latitude": 39.90403,
    markers: [],
    controls: [{
      id: 1,
      iconPath: '/resources/pin.png',
      position: {
        left: (app.globalData.windowWidth)/2-11,
        top: ((app.globalData.windowHeight-42)) / 2 - 31,
        width: 22,
        height: 31
      }
    },{
      id: 2,
      iconPath: '/resources/center.png',
      clickable: true,
      position: {
        left: 20,
        top: app.globalData.windowHeight - 82,
        width: 22,
        height: 22
      }
    }]
  },
  onShow() {
    this.handlePosition();
    this.handlePoints();
    this.mapCtx = wx.createMapContext('map');
  },
  handlePosition() {
    wx.getLocation({
      type: 'gcj02',
      success: this.handlePosSucc.bind(this)
    })
  },
  handlePoints(){
    const data={distinct: app.globalData.distinct};
    utils.sendRequest('trade/get_list','GET',data,this.handleGetPointsSucc.bind(this));
  },
  handleGetPointsSucc(res){
    const points=res.data.data;
    const arr=[];
    for(var i=0;i<points.length;i++){
      let item=points[i];
      arr.push({
        iconPath: "../../resources/"+item.type+".png",
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        width:30,
        height:30
      })
    }
    this.setData({
      markers:arr
    })
  },
  handlePosSucc(res) {
    this.setData({
      "longitude": res.longitude,
      "latitude": res.latitude
    })
  },
  controlTap() {
    this.mapCtx.moveToLocation();
  },
  markerTap(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.markerId
    })
  },
  onShareAppMessage() {
    return {
      title: '暖湾鱼友圈',
      path: '/pages/index/index'
    }
  }
})
