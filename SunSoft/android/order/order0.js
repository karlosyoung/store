/**
 * Created by qiaozm on 2016/6/29.
 * 订单列表组件
 */
import React,{Component} from 'react';
import OrderTop from './orderTop.js';
var Header=require('../../common/header');
var Util=require('../../common/Util');
import Service from '../../common/service';
var OrderDetail=require('./orderDetail');
var OrderPppCom = require('../../common/order_Pop')
var OrderGoodDetail=require('./orderGoodDetail');
var OrderGoodDetailDai=require('./orderGoodDetailDai');
import NoOrder from '../../common/noOrder';
import OrderPay from '../../common/order_Pay';
import OrderSelect from './orderSelect';
import NoInter from '../../common/noInter';
import NetInfo from '../../common/netInfo';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    ListView,
    RefreshControl,
    Alert,
    AlertIOS,
    ToastAndroid,
    BackAndroid
    } from'react-native';
var { NativeModules } = require('react-native');
var RNBridgeModule=NativeModules.RNBridgeModule;
var Order =React.createClass({
    getInitialState: function() {
    //RNBridgeModule.isTabHidden('false');//隐藏tab
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       return {
            token:this.props.initData.token,
            userId:this.props.initData.userId,
            orderPayShippingStatus:3,//this.props.initData.orderPayShippingStatus==-1?'':this.props.initData.orderPayShippingStatus,
            pageNo:1,
            pageSize:6,
            results:0,
            dataSource: ds,
            data:[],
            isRefreshing: false,
            loaded: false,
            noOrder:false,  //false有数据 true无数据
            noNet:false,    //false有网   true无网
            payAlert:false,  //是否显示支付弹框
            orderSelectList:false,  //是否显示订单状态筛选按钮
            noNet:false,    //false有网   true无网
            orderSelect:'',
            headTitle:'售后服务'
        };
    },
    componentDidMount: function() {
        BackAndroid.addEventListener('hardwareBackPress', this.onBackPressed);
          var _param={
             fetchMethod:this.fetchData,
             fetchParamData:''
         }
         this.FuncFetchData(_param);
       // this.fetchData();
    },
     //调用服务方法总入口
    FuncFetchData:function(param){
       var p;
        if(param.msgCode=='_callbackOrderSelect'){
            p=this._callbackOrderSelect(param.fetchParamData);
        }else{
            p=param.fetchMethod(param.fetchParamData);//请求数据
        }
        var p1=Util.FuncTimeOut();//判断是否超时
        var that=this;
        Promise.race([p, p1]).then(function (result) {
            var data=result.data;
            var _message=result.message;
            if(_message=='timeout'){
                that.setState({
                    loaded:true,
                    noNet:true
                });
            }else{
                if(_message=='selectRetailAndUnityBuyOrderTOPage'){
                    that.setState({
                        noOrder:false,
                        pageNo:1,
                        dataSource: that.state.dataSource.cloneWithRows(data.rows),
                        loaded: true,
                        data:data.rows,
                        results:data.results,
                        isRefreshing: false
                    });
                }else if(_message=='cancelOrderOrconfirmReceipt' || _message=='deleteOrderByOrderSn'){  //确认订单，取消订单确定按钮执行方法  删除订单
                    var _param={
                          fetchMethod:that.fetchData,
                          fetchParamData:''
                    }
                    that.FuncFetchData(_param);
                }else if(_message=='callbackSelectMyOrderPage'){
                    that.setState({
                       noOrder:false,
                       pageNo:1,
                       dataSource: that.state.dataSource.cloneWithRows(data.rows),
                       loaded: true,
                       data:data.rows,
                       results:data.results,
                       isRefreshing: false,
                       orderPayShippingStatus:data.orderPayShippingStatus,
                       orderSelectList:false,
                       orderSelect:data.orderSelect,
                       headTitle:data.headTitle
                   });
                }else if(_message=='addShopCartGoods'){
                    RNBridgeModule.goToCart('toCart');
                }
            }
        }, function(reason){
            if(reason=='noData'){
                that.setState({
                    loaded:true,
                    noOrder:true
                });
            }else if(reason=='noNet'){
                that.setState({
                    loaded:true,
                    noNet:true
                });
            }
        });
    },
    onBackPressed:function(){
        //RNBridgeModule.isTabHidden('true');//显示tab
        RNBridgeModule.buttonBack('order');
         return false;
    },
    componentWillUnmount(){
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackPressed);
    },
    fetchData: function() {
        var that=this;
        return new Promise(function (resolve, reject) {
            var _q='?token='+that.state.token+'&userId='+that.state.userId+'&orderPayShippingStatus='+that.state.orderPayShippingStatus+'&pageNo=1&pageSize='+that.state.pageSize;

             var baseUrl=Service.selectRetailAndUnityBuyOrderTOPage+_q;
             Util.get(baseUrl,
             function(data){
                var _title=data.obj.title;
                var _msgCode=data.msgCode;
                if(_msgCode==1){
                    reject('noData');
                }else if(_msgCode==99){
                    RNBridgeModule.toLogin('toLogin');
                }else{
                    var _data=data.obj.body;
                    if(_data==null || _data.rows==null){
                        reject('noData');
                    }else{
                        var _paramData={
                            data:_data,
                            message:'selectRetailAndUnityBuyOrderTOPage'
                        }
                         resolve(_paramData);
                    }
                }
             },function(err){
                    reject('noNet');
             });
        });
    },
    getMoreData: function() {
        var _pageCount=Math.ceil(this.state.results/this.state.pageSize);//总页数
        if(this.state.pageNo<_pageCount){
             var _q='?token='+this.state.token+'&userId='+this.state.userId+'&orderPayShippingStatus='+this.state.orderPayShippingStatus+'&pageNo='+(this.state.pageNo+1)+'&pageSize='+this.state.pageSize;
             var baseUrl=Service.selectRetailAndUnityBuyOrderTOPage+_q;
             var that=this;
             Util.get(baseUrl,
             function(data){
                var _msgCode=data.msgCode;
                if(_msgCode==1){
                    that.setState({
                        loaded:true,
                        noOrder:true
                    });
                    /*if(Platform.OS=='ios'){
                    }else{
                        ToastAndroid.show('请输入身高和体重，格式如175cm，85.9kg。', ToastAndroid.LONG);
                    }*/
                }else if(_msgCode==99){
                    RNBridgeModule.toLogin('toLogin');
                }else{
                    var _data=data.obj.body;
                    if(_data==null || _data.rows==null){
                        that.setState({
                            loaded:true,
                            noOrder:true
                        });
                    }else{
                        var _rows=that.state.data.concat(_data.rows);
                        that.setState({
                            noOrder:false,
                            pageNo:that.state.pageNo+1,
                            dataSource: that.state.dataSource.cloneWithRows(_rows),
                            loaded: true,
                            data:_rows,
                            results:_data.results,
                            isRefreshing: false
                        });
                    }
                }
             },function(err){
                that.setState({
                    loaded:true,
                    //noOrder:true,
                    noNet:true
                });
             });
        }
    },
    render: function() {
        var data= this.state.data;
        var _titleView=this._initTitleView(this.state.data.orderStatusStr);
        if (this.state==null || !this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <View style={{flex:1,backgroundColor:'#f7f7f7'}}>
                    <View><Image source={require('../../img/common/noInter.png')} resizeMode='contain' style={{width:0,height:0}} /></View>
                    <Header navigator={this.props.navigator} initObj={{
                        backName:'order',
                        title:this.state.headTitle,
                        show:true,
                        orderSelectList:this.state.orderSelectList
                    }}  callback={this._orderSelect.bind(this)} />
                    <View style={{flex:1}}>
                    {
                        this.state.noOrder?
                            <NoOrder callback={this._goBuyFunc.bind(this)} />
                        :
                        this.state.noNet?
                            <NoInter callback={this._onPressRefresh.bind(this)} />
                        :
                            <ListView
                                refreshControl={
                                  <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={this._onRefresh}
                                  colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                                  progressBackgroundColor="#ffffff"/>
                                  }
                                 contentContainerStyle={styles.list}
                                 onEndReached={this._endReached}
                                 dataSource={this.state.dataSource}
                                 renderRow={this._renderItem}>
                             </ListView>
                    }
                    <NetInfo callback={this._getNetInfoState.bind(this)} />
                </View>
                {
                    this.state.payAlert?
                        <OrderPay data={
                            {
                                token:this.state.token,
                                payData:this.state.payData,
                                reqSource:'orderList'
                            }
                        } callback={this._callbackPayFunc.bind(this)} />
                    :
                        null
                }
                {
                    this.state.orderSelectList?
                    <OrderSelect data={{orderSelect:this.state.orderSelect}} callback={this.FuncFetchData.bind(this)} />
                    :
                    null
                }
            </View>
        );
    },
    _goBuyFunc:function(){
          RNBridgeModule.goToOrderList('goToOrderList');  //跳转到零售商品详情
    },
    //监测网络状态
    _getNetInfoState:function(param){
        this.setState({
            noNet:param
        });
    },
    //点击刷新方法
    _onPressRefresh:function(param){
         var _param={
              fetchMethod:this.fetchData,
              fetchParamData:''
          }
          this.FuncFetchData(_param);
        //this.fetchData();
    },
    _endReached:function(){
        this.getMoreData();
    },
    _onRefresh: function () {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            var _param={
                 fetchMethod:this.fetchData,
                 fetchParamData:''
             }
             this.FuncFetchData(_param);

            //this.fetchData();
        }, 1000);
    },

    _renderItem: function(item: object, sectionID: number, rowID: number) {
        var _orderCount=item.goodsNumberTotal;  //代购订单数量
       // var _orderId = item.orderId;//订单ID
       var _orderPayShippingStatus=item.orderPayShippingStatus;  //订单状态
        var _ordersn=item.orderSn;//订单唯一标示
       // var _orderStatus = item.orderStatus; // 订单状态
       // var _payStatus = item.payStatus; // 支付状态
        //var _shippingStatus = item.shippingStatus; // 商品配送情况
        var reserve1=item.reserve1;  //是否下架
        var _recType=item.recType;//1	商品类型;0普通;1公告统购; 3公告代购
        var _orderStatusStr='';
        var _btnCode='';//01   付款按钮置灰 02   付款按钮正常 03   取消订单按钮,付款按钮置灰 04   取消订单按钮,付款按钮正常 05   确认收货按钮


        return(
            <View style={styles.orderDan}>
            <View>
                {
                    item.recType==3?
                        <View style={styles.orderTitle}>
                            <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 15, height: 16,marginRight:1} } />
                                <View style={styles.orderHao}><Text style={styles.orderSta}>订单号：<Text style={styles.orderSta}>{item.orderSn}</Text><Text style={styles.smallFont}>（代买）</Text></Text></View>
                            <View style={{justifyContent:'flex-end',width:40}}>{_titleView}</View>
                        </View>
                    :
                    <View>
                    {
                         item.recType==0?
                         <View style={styles.orderTitle}>
                             <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 15, height: 16,marginRight:1} } />
                                 <View style={styles.orderHao}><Text style={styles.orderSta}>订单号：<Text style={styles.orderSta}>{item.orderSn}</Text><Text style={styles.smallFont}>（零售）</Text></Text></View>
                             <View style={{justifyContent:'flex-end',width:40}}>{_titleView}</View>
                         </View>
                         :
                         <View style={styles.orderTitle}>
                             <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 15, height: 16,marginRight:1} } />
                                 <View style={styles.orderHao}><Text style={styles.orderSta}>订单号：<Text style={styles.orderSta}>{item.orderSn}</Text><Text style={styles.smallFont}>（统购）</Text></Text></View>
                             <View style={{justifyContent:'flex-end',width:40}}>{_titleView}</View>
                         </View>
                    }
                    </View>
                }
                </View>
                <OrderGoodDetail data={{
                    data:item,
                    btnCode:_btnCode,
                    orderStatusStr:_orderStatusStr
                }}  />
                <View style={styles.payMon}>
                    <Text style={styles.fontGong}>共<Text>{_orderCount}</Text>件,总金额:<Text style={[styles.redColor,{fontSize:Util.fixedFont(15)}]}>{Util.FuncRmbFormat(item.goodsAmount)}</Text></Text>
                </View>
            </View>
        );
    },

    /*
    初始化功能按钮view
     01   统购付款按钮置灰  下架
     02   统购付款按钮正常
     03   零售取消订单按钮,付款按钮置灰
     04   零售取消订单按钮,付款按钮正常
     05   确认收货按钮
     06   删除订单按钮
     */

    _callbackOrderSelect:function(param){
        var _orderPayShippingStatus='3';
        var _headTitle='';
        var that=this;
        return new Promise(function (resolve, reject) {
             var _q='?getTimestamp='+getTimestamp;
             var baseUrl=Service.selectRetailAndUnityBuyOrderTOPage+_q;
             Util.get(baseUrl,
             function(data){
                var _msgCode=data.msgCode;
                if(_msgCode==1){
                    that.setState({
                        loaded:true,
                        noOrder:true,
                        orderPayShippingStatus:_orderPayShippingStatus,
                        orderSelectList:false,
                        orderSelect:param,
                        headTitle:_headTitle
                    });
                    reject('noData1');
                }else if(_msgCode==99){
                    RNBridgeModule.toLogin('toLogin');
                }else{
                   var _data=data.obj.body;
                   if(_data==null || _data.rows==null){
                       that.setState({
                           loaded:true,
                           noOrder:true,
                           orderPayShippingStatus:_orderPayShippingStatus,
                           orderSelectList:false,
                           orderSelect:param,
                           headTitle:_headTitle
                       });
                       reject('noData1');
                   }else{
                       _data.orderPayShippingStatus=_orderPayShippingStatus;
                       _data.orderSelect=param;
                       _data.headTitle=_headTitle;
                       var _paramData={
                           data:_data,
                           message:'callbackSelectMyOrderPage'
                       }
                       resolve(_paramData);
                   }
                }
             },function(err){
                    reject('noNet1');
                   that.setState({
                       loaded:true,
                       noOrder:true,
                       orderPayShippingStatus:_orderPayShippingStatus,
                       orderSelectList:false,
                       orderSelect:param,
                       headTitle:_headTitle
                   });
             });
        });
    },

    _orderSelect:function(){
         var _orderSelect=this.state.orderSelectList;
         _orderSelect=!_orderSelect;
        this.setState({
            orderSelectList:_orderSelect
        })
    },
    _orderListPayBtn:function(){
        this.props.navigator.push({
            component:OrderPppCom
        })
    },

    _callbackOnRefresh: function () {
        setTimeout(() => {
            var _param={
                 fetchMethod:this.fetchData,
                 fetchParamData:''
             }
             this.FuncFetchData(_param);
            //this.fetchData();
        }, 200);
    },

    renderLoadingView: function() {
        return (
        <View>
                            <Header navigator={this.props.navigator} initObj={{
                                backName:'order',
                                title:this.state.headTitle,
                                show:true,
                                orderSelectList:this.state.orderSelectList
                            }}  callback={this._orderSelect.bind(this)} />
            <View style={styles.container}>
                <Image source={require('../../img/common/loading.gif')} style={{width: 25, height:25} }  />
            </View>
        </View>
        );
    },
    _initTitleView:function(orderStatusStr){
           // var _orderStatusStr=this.props.data.orderStatusStr;
            if(_orderStatusStr=='申请售后'){
                   return(
                       <View style={styles.borderGray}><Text style={[styles.smallFont,styles.gray]}>{_orderStatusStr}</Text></View>
                   )
            }else if(_orderStatusStr=='已申请'){
                   return(
                       <View style={styles.borderGray}><Text style={[styles.smallFont,styles.gray]}>{_orderStatusStr}</Text></View>
                   )
            }else if(_orderStatusStr=='已受理'){
                   return(
                       <View style={styles.borderGray}><Text style={[styles.smallFont,styles.gray]}>{_orderStatusStr}</Text></View>
                   )
            }
         },

});
var styles = StyleSheet.create({
    bottomB:{
    borderColor:'#e0e0e0',
    borderBottomWidth:1
    },
    grayColor:{
        color:'#929292',
        fontSize:Util.fixedFont(13)
    },
    fontGong:{
        fontSize:Util.fixedFont(13),
        color:'#333'
    },
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f7f7f7',
        width:Util.size.width,
        height:Util.size.height
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'flex-start'
    },
    redColor:{
        color:'#f65e5d',
        fontSize:Util.fixedFont(13)
    },
    writeColor:{
        color:'#929292'
    },
    orderDan:{
        backgroundColor:'#fff',
        marginTop:14,
        paddingLeft:14,
        paddingRight:14,
        width:Util.size.width
    },
    orderList:{
        width:Util.size.width
    },
    payMon:{
        flex:1,
        flexDirection:'row',
        width:Util.size.width-28,
        height:45,
        alignItems:'center',
        justifyContent:'flex-end',
        borderTopWidth:1,
        borderTopColor:'#e0e0e0'
    },
    bigW:{
        width:200
    },
    payMoney:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    blackPop:{
        backgroundColor:'#000',
        opacity:0.7,
        width:Util.size.width,
        height:Util.size.height
    },
    orderPull:{
        width:Util.size.width,
        height:60,
        paddingTop:10,
        flex:1,
        flexDirection:'row',
        position:'absolute',
        left:0,
        top:0,
        backgroundColor:'#fff',
        paddingLeft:30,
        paddingRight:30
    },
    black:{
        width:Util.size.width,
        height:Util.size.height,
        position:'absolute',
        left:0,
        top:0
    },
    sureGoods:{
        justifyContent:'center',
        alignItems:'center'
    },
    sureGoodsR:{
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10
    },
    redBorder:{
        borderColor:'#f00',
    },
    grayBorder:{
        borderColor:'#b0b0b0'
    }
});
module.exports=Order;


