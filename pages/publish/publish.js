const app=getApp();
const utils=require('../../utils/util.js');

Page({
  data:{
    address:"请选择地址",
    success:false
  },
  staticData:{
    "latitude":'',
    "longitude":'',
    "type":'sell',
    "message":'',
    "contact":''
  },
  handleSelectAddress(){
    wx.chooseLocation({
      success:this.handleAddressSucc.bind(this)
    })
  },
  handleAddressSucc(res){
    this.setData({
      "address":res.address
    })
    Object.assign(this.staticData,{
      "latitude": res.latitude,
      "longitude": res.longitude
    })
    
  },
  handleTypeChange(e){
    this.staticData.type=e.detail.value;
  },
  handleMessageChange(e){
    this.staticData.message=e.detail.value;
  },
  handleContactChange(e){
    this.staticData.contact = e.detail.value;
  },
  handleSendMessage(){
    if(this.data.address=='请选择地址' || !this.data.address){
      this.showToast('请选择地址');
      return;
    }
    if (!this.staticData.message) {
      this.showToast('请填写具体需求');
      return;
    }
    if (!this.staticData.contact) {
      this.showToast('请填写联系方式');
      return;
    }
    this.sendPostInfo()
  },
  showToast(title){
    wx.showToast({
      title: title,
      icon: 'loding',
      duration: 2000
    })
  },
  sendPostInfo(){
    const data=Object.assign({},this.staticData,{
      address: this.data.address,
      distinct: app.globalData.distinct
    })
    utils.sendRequest('trade/add_item', 'POST', data, this.handleSubmitSucc.bind(this))
  },
  handleSubmitSucc(){
      this.setData({
        success:true
      })
    }
})