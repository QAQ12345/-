const app=getApp();
const utils=require('../../utils/util.js');

Page({
  data:{
    hasResult:false,
    result:[]
  },
  staticData:{
    inputValue:''
  },
  onLoad(){
    this.handleGetSearchResults();
  },
  handleGetSearchResults() {
    const data={
      keyword: this.staticData.inputValue,
      distinct: app.globalData.distinct
    };
    utils.sendRequest('trade/get_search_list','POST',data,this.handleSearchSucc.bind(this));
  },
  handleSearchSucc(res){
    if(res.data.ret){
      this.setData({
        hasResult: true,
        result:res.data.data
      })
    }else{
      this.setData({
        hasResult: false
      })
    }
    
  },
  handleInputChange(e){
    this.staticData.inputValue=e.detail.value;
  },
  handleSearch(){
    this.handleGetSearchResults();
  },
  handleDetail(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.dataset.index
    })
  }
})