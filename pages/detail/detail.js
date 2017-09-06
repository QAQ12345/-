const app=getApp();
const utils = require('../../utils/util.js');

Page({
  data:{
    address:'',
    type:'sell',
    textType:'',
    message:'',
    contact:''
  },
  staticData:{
    id:''
  },
  onLoad(options){
    this.staticData.id=options.id;
    this.getDatailInfo();
  },
  getDatailInfo(){
    const data={
      id:this.staticData.id,
      distinct: app.globalData.distinct
    };
    utils.sendRequest('trade/get_item','POST',data,this.handleGetDetailSucc.bind(this))
  },
  handleGetDetailSucc(res){
    const result=res.data.data;
    this.setData({
      address: result.address,
      type: result.type,
      textType: result.type=='sell'?'求购':'转让',
      message: result.message,
      contact: result.contact
    })
  }
})