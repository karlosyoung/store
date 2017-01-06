/**
 * Created by qiaozm on 2016/6/29.
 * 商品详情组件
 */
import React,{Component} from 'react';
var Header=require('../../common/header');
var Util=require('../../common/Util');
var OrderTop=require('./orderTop');
var OrderGoodDetail=require('./orderGoodDetail');
var OrderGoodDetailDai=require('./orderGoodDetailDai');
import Service from '../../common/service';
var PopLayer=require('../main/popOrder');
import OrderPay from '../../common/order_Pay';
import Order from './order';
import RetailDetail from '../main/retailDetail';
import NoInter from '../../common/noInter';
import NetInfo from '../../common/netInfo';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    Platform,
    Alert,
    AlertIOS,
    ToastAndroid,
    BackAndroid
    } from'react-native';
var { NativeModules } = require('react-native');
var RNBridgeModule=NativeModules.RNBridgeModule;
var OrderDetail =React.createClass({
    getInitialState: function() {
    //RNBridgeModule.isTabHidden('false');//隐藏tab
        return {
            goodsNumberTotal:this.props.goodsNumberTotal,
            token:this.props.token,
            userId:this.props.userId,
            orderId:this.props.orderId,
            recType:this.props.recType,
            btnCode:this.props.btnCode,
            loaded: false,
            orderStatusStr:this.props.orderStatusStr,
            OrderPopTi:false,
            payAlert:false,  //是否显示支付弹框
            noNet:false,   //false有网   true无网
            isAgainPurchaseBtn:true  //代替购买按钮是否可用 true可用false不可用
        };
    },
    componentDidMount: function() {
       // RNBridgeModule.orderIn('订单详情');
        var _param={
            fetchMethod:this.fetchData,
            fetchParamData:''
        }
        this.FuncFetchData(_param);
        BackAndroid.addEventListener('hardwareBackPress', this.onBackPressed);
    },
    onBackPressed:function(){
        this.props.navigator.pop();
         return true;
    },
    fetchData: function() {
        var that=this;
        return new Promise(function (resolve, reject) {
            var _q='?token='+that.state.token+'&orderId='+that.state.orderId+'&recType='+that.state.recType;
             var baseUrl=Service.appSelectOrderDetailInfo+_q;
             Util.get(baseUrl,
             function(data){
                var _msgCode=data.msgCode;
                if(_msgCode==1){
                    reject('noData');
                }else if(_msgCode==99){
                    RNBridgeModule.toLogin('toLogin');
                }else{
                    var _data=data.obj.body;
                    if(_data==null){
                        reject('noData');
                    }else{
                        var _paramData={
                            data:_data,
                            message:'appSelectOrderDetailInfo'
                        }
                         resolve(_paramData);
                    }
                }
             },function(err){
                    reject('noNet');
             });
        });
    },
    //调用服务方法总入口
    FuncFetchData:function(param){
       var p=param.fetchMethod(param.fetchParamData);//请求数据
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
                if(_message=='appSelectOrderDetailInfo'){
                    that.setState({
                        loaded: true,
                        data:data
                    });

                }else if(_message=='cancelOrderOrconfirmReceipt'){//确认订单，取消订单确定按钮执行方法
                    var _orderStatusStr='';
                    var _btnCode='';
                    if(data==2){
                        _orderStatusStr='已取消';
                        _btnCode='06';
                    }else{
                        _orderStatusStr='已完成';
                    }
                    that.setState({
                        btnCode:_btnCode,
                        orderStatusStr:_orderStatusStr
                    });
                }else if( _message=='deleteOrderByOrderSn'){  // 删除订单
                    that.props.callback();
                    that.props.navigator.popToTop();
                }else if(_message=='addShopCartGoods'){
                     RNBridgeModule.goToCart('toCart');
                 }
            }
        }, function(reason){
            if(reason=='noData'){
                that.setState({
                    loaded:true,
                    noData:true
                });
            }else if(reason=='noNet'){
                that.setState({
                    loaded:true,
                    noNet:true
                });
            }
        });
    },
    componentWillUnmount(){
        //RNBridgeModule.orderOut('订单详情');
         BackAndroid.removeEventListener('hardwareBackPress', this.onBackPressed);
    },
    render: function() {
        var data= this.state.data;
        if (this.state==null || !this.state.loaded) {
            return this.renderLoadingView();
        }
        var _btnView=this._btnViewInit(this.state.btnCode,this.state.data);
        var _titleView=this._initTitleView();
        return (
            <View style={[styles.bigView,{flex:1}]}>
                <View><Image source={require('../../img/common/noInter.png')} resizeMode='contain' style={{width:0,height:0}} /></View>
                <Header navigator={this.props.navigator} initObj={{
                    backName:'orderDetail',
                    title:'订单详情',
                    show:true,
                    callback:this.props.callback
                }}/>
                <View style={{flex:1}}>
                {
                    this.state.noNet?
                        <NoInter callback={this._onPressRefresh.bind(this)} />
                    :
                        <ScrollView>
                            <TouchableHighlight>
                                <View style={styles.orderList}>
                                <View>
                                {
                                    this.state.data.recType==3?
                                    <View style={styles.topIn}>
                                          <View style={styles.orderTitle}>
                                              <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 15, height: 16,marginRight:1} } />
                                                  <View style={styles.orderHaos}><Text style={styles.orderStas}>订单号：<Text style={styles.orderStas}>{this.state.data.orderSn}</Text><Text style={styles.smallFont}>（代买）</Text></Text></View>
                                              <View style={{justifyContent:'flex-end',width:40}}>{_titleView}</View>
                                          </View>
                                    </View>
                                    :
                                    <View style={styles.topInB}>
                                        {
                                             this.state.data.recType==0?
                                             <View style={styles.orderTitle}>
                                                 <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 15, height: 16,marginRight:1} } />
                                                     <View style={styles.orderHaos}><Text style={styles.orderStas}>订单号：<Text style={styles.orderStas}>{this.state.data.orderSn}</Text><Text style={styles.smallFont}>（零售）</Text></Text></View>
                                                 <View style={{width:40}}>{_titleView}</View>
                                             </View>
                                             :
                                             <View style={styles.orderTitle}>
                                                 <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 15, height: 16,marginRight:1} } />
                                                     <View style={styles.orderHaos}><Text style={styles.orderStas}>订单号：<Text style={styles.orderStas}>{this.state.data.orderSn}</Text><Text style={styles.smallFont}>（统购）</Text></Text></View>
                                                 <View style={{width:40}}>{_titleView}</View>
                                             </View>
                                        }
                                    </View>
                                }
                                </View>
                                    {
                                        this.state.data.recType==3?
                                            <View style={styles.orderDan}>
                                                <OrderGoodDetailDai data={{
                                                   data:this.state.data,
                                                   btnCode:this.state.btnCode,
                                                   orderStatusStr:this.state.orderStatusStr
                                               }}  callback={this._goodsDetail.bind(this)} />
                                            </View>
                                        :
                                            <View style={{backgroundColor:'#fff',flex:1,width:Util.size.width}}>
                                                <View style={styles.addIphone}>
                                                <Image style={styles.orderImg} source={require('../../img/order/border.png')} style={{width: Util.size.width-45,height:89} } />
                                                <View style={styles.addIpoIn}>
                                                    <View style={styles.orderHao}>
                                                        <Image style={styles.orderImg} source={require('../../img/order/renT.png')} style={{width: 17, height: 18,marginRight:10} } />
                                                        <View style={styles.nameMAx}><Text numberOfLines={1} style={styles.names}>{this.state.data.consignee}</Text></View>
                                                        <Image style={styles.orderImg} source={require('../../img/orderDetail/newphone.png')} style={{width: 13, height: 20,marginRight:10} } />
                                                        <View style={styles.phoneMAx}><Text numberOfLines={1} style={styles.phone}>{this.state.data.mobile}</Text></View>
                                                    </View>
                                                    <View style={styles.orderSta}>
                                                        <Image style={styles.orderImg} source={require('../../img/order/ditu.png')} style={{width: 19, height: 19,marginRight:10} } />
                                                        <Text numberOfLines={2} style={styles.zheH}>{this.state.data.address}</Text>
                                                    </View>
                                                </View>
                                                </View>
                                                <View style={styles.orderDan}>
                                                    <OrderGoodDetail data={{
                                                        data:this.state.data,
                                                        btnCode:this.state.btnCode,
                                                        orderStatusStr:this.state.orderStatusStr
                                                    }}  callback={this._goodsDetail.bind(this)} />
                                                </View>
                                                <View style={styles.peiStyle}>
                                                    <View style={styles.yiHang}><Text style={styles.grayColo}>支付配送：</Text><Text style={styles.grayG}>在线支付 集中配送至学校</Text></View>
                                                    <View style={styles.yiHang}><Text style={styles.grayColo}>商品总额：</Text><Text style={styles.redColor}>{Util.FuncRmbFormat(this.state.data.goodsAmount)}</Text></View>
                                                    <View style={styles.yiHang}><Text style={styles.grayColor}>下单时间：<Text>{this.state.data.addTime}</Text></Text></View>
                                                </View>
                                                <View style={styles.payMon}>
                                                    <Text style={styles.fontGong}>共<Text>{this.state.goodsNumberTotal}</Text>件，总金额：<Text style={styles.redColor}>{Util.FuncRmbFormat(this.state.data.goodsAmount)}</Text></Text>
                                                    {_btnView}
                                                </View>
                                            </View>
                                    }
                                </View>
                            </TouchableHighlight>
                        </ScrollView>
                    }
                    <NetInfo callback={this._getNetInfoState.bind(this)} />
                </View>
                {
                    this.state.data.recType==3?
                        <View style={{ position:'absolute',bottom:0,left:0,width:Util.size.width,height:50,justifyContent:'center',backgroundColor:'#fff',alignItems:'flex-start',paddingLeft:10,paddingRight:10}}>
                            <View style={styles.yiHangs}>
                                <View>
                                     <Text style={styles.fontGo}>共<Text>{this.state.goodsNumberTotal}</Text>件</Text>
                                     <Text style={styles.fontGo}>总金额：<Text style={styles.redColor}>{Util.FuncRmbFormat(this.state.data.goodsAmount)}</Text></Text>
                                </View>
                                <View style={styles.payMoney}>
                                    {_btnView}
                                </View>
                            </View>
                        </View>
                    :
                        null
                }
                    {
                        this.state.payAlert?
                            <PopLayer data={
                                {
                                    token:this.state.token,
                                    payData:this.state.data,
                                    reqSource:'orderDetail'
                                }
                            } callback={this._callbackPayFunc.bind(this)} />
                        :
                            null
                    }
            </View>

        );
    },

    //监测网络状态
    _getNetInfoState:function(param){
        this.setState({
            noNet:param
        });
    },

    //点击刷新方法
    _onPressRefresh:function(param){
        this.fetchData();
    },
    _endReached:function(){
        this.getMoreData();
    },
    _onRefresh: function () {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.fetchData();
        }, 1000);
    },
    _initTitleView:function(){
        var _orderStatusStr=this.state.orderStatusStr;
        if(_orderStatusStr=='待付款'){
            return(
                <View style={styles.orderState}><Text style={[styles.smallFont,styles.red]}>{_orderStatusStr}</Text></View>
            )
        }else if(_orderStatusStr=='待发货'){
             return(
                 <View style={styles.orderState}><Text style={[styles.smallFont,styles.yellow]}>{_orderStatusStr}</Text></View>
             )
        }else if(_orderStatusStr=='待收货'){
             return(
                 <View style={styles.orderState}><Text style={[styles.smallFont,styles.yellow]}>{_orderStatusStr}</Text></View>
             )
        }else if(_orderStatusStr=='已完成'){
             return(
                 <View style={styles.orderState}><Text style={[styles.smallFont,styles.green]}>{_orderStatusStr}</Text></View>
             )
        }else if(_orderStatusStr=='已取消'){
             return(
                 <View style={styles.orderState}><Text style={[styles.smallFont,styles.gray]}>{_orderStatusStr}</Text></View>
             )
        }
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
        _btnViewInit:function(_btnCode,item){
            if(_btnCode=='01'){//统购商品已下架，不能继续支付，付款按钮置灰
                return (
                <View style={styles.btnClick}>
                    <View style={styles.maRight}>
                        <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                        <View style={[styles.canOrder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity data={item} onPress={this._funcUpdateOrderById.bind(this,item,2,'')}>
                                <Text style={styles.blockColor}>取消订单</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                        <View  style={[styles.xiaOrder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                            <Text style={styles.blockColor}>付款</Text>
                        </View>
                    </View>
                </View>
                );
            }else if(_btnCode=='02'){
                return (
                <View style={styles.btnClick}>
                    <View style={styles.maRight}>
                        <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                        <View style={[styles.canOrder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity data={item} onPress={this._funcUpdateOrderById.bind(this,item,2,'')}>
                                <Text style={styles.blockColor}>取消订单</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Image source={require('../../img/common/1235.png')} resizeMode='contain' style={{width:72,height:27}} />
                        <View style={[styles.surOrder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity data={item} onPress={this._payBtnEvent.bind(this,item)}>
                                <Text style={styles.payColor}>付款</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                );
            }else if(_btnCode=='03'){
                return(
                    <View style={styles.btnClick}>
                        <View style={styles.maRight}>
                            <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                            <View style={[styles.canOrder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                                <TouchableOpacity data={item} onPress={this._funcUpdateOrderById.bind(this,item,2,'')}>
                                    <Text style={styles.blockColor}>取消订单</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                            <View style={[styles.xiaOrder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                                <Text style={styles.blockColor}>付款</Text>
                            </View>
                        </View>
                    </View>
                );
            }else if(_btnCode=='04'){
                return(
                    <View style={styles.btnClick}>
                        <View style={styles.maRight}>
                            <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                            <View style={[styles.canOrder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                                <TouchableOpacity onPress={this._funcUpdateOrderById.bind(this,item,2,'')}>
                                    <Text style={styles.blockColor}>取消订单</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Image source={require('../../img/common/1235.png')} resizeMode='contain' style={{width:72,height:27}} />
                            <View style={[styles.surOrder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                                <TouchableOpacity data={item} onPress={this._payBtnEvent.bind(this,item)}>
                                    <Text style={styles.payColor}>付款</Text>
                                 </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                );
            }else if(_btnCode=='05'){
                return (
                <View style={styles.btnClick}>
                    <View>
                         <Image source={require('../../img/common/1235.png')} resizeMode='contain' style={{width:72,height:27}} />
                         <View style={[styles.surOrder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity onPress={this._funcUpdateOrderById.bind(this,item,'',2)}>
                                <Text style={styles.payColor}>确认收货</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                );
            }else if(_btnCode=='06'){
                 if(item.recType==0){
                    return (
                     <View style={styles.btnClick}>
                         <View style={styles.maRight}>
                             <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                             <View style={[styles.xiaOrder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                                 <TouchableOpacity onPress={this._funDeleteOrderByOrderSn.bind(this,item,'',2)}>
                                     <Text style={styles.blockColor}>删除订单</Text>
                                 </TouchableOpacity>
                             </View>
                         </View>
                         <View>
                             <Image source={require('../../img/common/1235.png')} resizeMode='contain' style={{width:72,height:27}} />
                             <View style={[styles.surOrder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                                  <TouchableOpacity data={item}  onPress={this.FuncFetchData.bind(this,{
                                         fetchMethod:this._againPurchase,
                                         fetchParamData:item
                                     })}>
                                      <Text style={styles.payColor}>再次购买</Text>
                                  </TouchableOpacity>
                             </View>
                         </View>
                     </View>
                     );
                 }else{
                    return (
                     <View style={styles.btnClick}>
                          <View>
                              <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                              <View style={[styles.xiaOrder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                                  <TouchableOpacity onPress={this._funDeleteOrderByOrderSn.bind(this,item,'',2)}>
                                     <Text style={styles.blockColor}>删除订单</Text>
                                  </TouchableOpacity>
                              </View>
                          </View>
                     </View>
                     );
                 }
            }else if(_btnCode=='07'){
                return (
                <View style={styles.btnClick}>
                    <View>
                        <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                        <View style={[styles.xiaOrder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                             <TouchableOpacity onPress={this._funDeleteOrderByOrderSn.bind(this,item,'',2)}>
                              <Text style={styles.blockColor}>删除订单</Text>
                             </TouchableOpacity>
                        </View>
                    </View>
                  </View>
                  );
             }
            return null;
        },

        //删除订单按钮执行方法
        _funDeleteOrderByOrderSn:function(item){
            var _param={
                 fetchMethod:this._deleteOrderByOrderSn,
                 fetchParamData:{
                    item:item
                 }
             }
            Alert.alert('提示','确认删除该订单吗？',[
              {text:'取消'},
              {text:'确定',onPress:this.FuncFetchData.bind(this,_param)}
            ]);
        },

        //删除订单确定按钮执行方法
        _deleteOrderByOrderSn:function(param){
            var item=param.item;
            var that=this;
            return new Promise(function (resolve, reject) {
                 var _q='?token='+that.state.token+'&orderId='+item.orderId+'&orderSn='+item.orderSn;
                 var baseUrl=Service.deleteOrderByOrderSn+_q;
                 Util.get(baseUrl,
                 function(data){
                    var _msgCode=data.msgCode;
                    if(_msgCode==1){
                        reject('noData1');
                        ToastAndroid.show(data.obj.title, 2000);
                    }else if(_msgCode==99){
                        RNBridgeModule.toLogin('toLogin');
                    }else{
                        ToastAndroid.show(data.obj.title, 2000);
                        var _data={
                            data:data,
                            message:'deleteOrderByOrderSn'
                        }
                         resolve(_data);
                    }
                 },function(err){
                        reject('noNet');
                 });
            });
        },

        //再次购买
        _againPurchase:function(item){
            var that=this;
            return new Promise(function (resolve, reject) {
               if(that.state.isAgainPurchaseBtn==true){
                    var _q='?token='+that.state.token+'&orderId='+item.orderId;
                    var baseUrl=Service.againPurchase+_q;
                    Util.get(baseUrl,
                    function(data){
                       var _msgCode=data.msgCode;
                       if(_msgCode==1){
                           reject('noData1');//不处理
                           that.setState({
                              isAgainPurchaseBtn:true  //再次购买按钮只响应一次
                           });
                           ToastAndroid.show(data.obj.title, 2000);
                       }else if(_msgCode==99){
                           RNBridgeModule.toLogin('toLogin');
                       }else{
                          that.setState({
                            isAgainPurchaseBtn:false  //再次购买按钮只响应一次
                          });
                          ToastAndroid.show(data.obj.title, 2000);
                           var _data={
                              // data:_cartSize+_goodsNumber,
                               message:'addShopCartGoods'
                           }
                            resolve(_data);
                       }
                    },function(err){
                       that.setState({
                         isAgainPurchaseBtn:true  //再次购买按钮只响应一次
                       });
                       reject('noNet');
                   });
               }
            });
        },

         //付款回调方法
        _callbackPayFunc:function(param){
           // alert(param.payCode+'xxxx'+param.payName);
            if(param=='3' || param=='03'){
               ToastAndroid.show('该订单已支付完成', 2000);
               this.setState({
                   payAlert:false,
                   btnCode:'',
                   orderStatusStr: '待发货'
               });
            }else{
                this.setState({
                    payAlert:false
                });
            }
        },

        //付款按钮点击事件
        _payBtnEvent:function(item){
            this.setState({
                payAlert:true
            });
         },

    //确认订单，取消订单
        _funcUpdateOrderById:function(item,_orderStatus,_shippingStatus){
            var _msg='确认取消该订单吗？';
            if(_shippingStatus=='2'){
                _msg='您确认已收到货物吗？';
            }
            var _param={
                 fetchMethod:this._updateOrderById,
                 fetchParamData:{
                    item:item,
                    orderStatus:_orderStatus,
                    shippingStatus:_shippingStatus
                 }
             }
             Alert.alert('提示',_msg,[
              {text:'取消'},
              {text:'确定',onPress:this.FuncFetchData.bind(this,_param)}
            ]);
        },
        //确认订单，取消订单确定按钮执行方法
        _updateOrderById:function(param){
            var item=param.item;
            var _orderStatus=param.orderStatus;
            var _shippingStatus=param.shippingStatus;
            var that=this;
            return new Promise(function (resolve, reject) {
                 var _q='?token='+that.state.token+'&userId='+that.state.userId+'&orderId='+item.orderId+'&orderSn='+item.orderSn+'&orderStatus='+_orderStatus+'&shippingStatus='+_shippingStatus;
                  var baseUrl=Service.cancelOrderOrconfirmReceipt+_q;
                 Util.get(baseUrl,
                 function(data){
                    var _msgCode=data.msgCode;
                    if(_msgCode==1){
                        reject('noData1');
                        ToastAndroid.show(data.obj.message, 2000);
                    }else if(_msgCode==99){
                        RNBridgeModule.toLogin('toLogin');
                    }else{
                        ToastAndroid.show(data.obj.message, 2000);
                        var _data={
                            data:_orderStatus,
                            message:'cancelOrderOrconfirmReceipt'
                        }
                         resolve(_data);
                    }
                 },function(err){
                        reject('noNet');
                 });
            });
        },

    renderLoadingView: function() {
        return (
        <View>
        <Header navigator={this.props.navigator} initObj={{
                            backName:'orderDetail',
                            title:'订单详情',
                            show:true,
                            callback:this.props.callback
                        }}/>
            <View style={styles.container}>
                <Image source={require('../../img/common/loading.gif')} style={{width: 25, height:25} }  />
            </View>
           </View>
        );
    },
    //跳转到订单详情
    _goodsDetail:function(_data){
        if(this.state.data.recType==1 || this.state.data.recType==3){
            RNBridgeModule.schoolDetail(_data.goodsId);
        }else{
            RNBridgeModule.goRetailDetail(_data.goodsId);
        }
    }
});
var styles = StyleSheet.create({
    maRight:{
        marginRight:10
    },
    container:{
        justifyContent:'center',
        alignItems:'center',
        width:Util.size.width,
        height:Util.size.height,
        backgroundColor:'#f7f7f7'
    },
    bigView:{
        width:Util.size.width,
        flex:1,
        backgroundColor:'#f7f7f7'
    },
    fontGong:{
        fontSize:Util.fixedFont(14),
        width:Util.size.width-150,
        marginTop:8,
        color:'#333'
    },
    fontGo:{
       fontSize:Util.fixedFont(14),
       color:'#333'
    },
    xiaDan:{
        fontSize:Util.fixedFont(13)
    },
    topIn:{
        paddingLeft:10,
        width:Util.size.width,
        height:40,
        flex:1,
        flexDirection:'row'
    },
    topInB:{
        paddingLeft:10,
        width:Util.size.width,
        backgroundColor:'#fff',
        height:39,
        borderColor:'#e0e0e0',
        borderBottomWidth:0.5,
        flex:1,
        flexDirection:'row'
    },
    redColor:{
        color:'#f00',
        fontSize:Util.fixedFont(14)
    },
    addIphone:{
        width:Util.size.width,
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:'#fff'
    },
    payMon:{
        flex:1,
        flexDirection:'row',
        width:Util.size.width,
        paddingLeft:10,
        paddingRight:10,
        marginBottom:10,
        height:40,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    addIpoIn:{
        padding:10,
        width:Util.size.width-40,
        position:'absolute',
        top:15,
        left:20
    },
    orderDan:{
        paddingLeft:14,
        paddingRight:14,
        width:Util.size.width,
        paddingBottom:10,
        backgroundColor:'#f7f7f7'
    },
    orderHao:{
        flex:1,
        flexDirection:'row',
        height:30,
        alignItems:'center'
    },
    grayG:{
        color:'#5e5a57',
        fontSize:Util.fixedFont(14)
    },
    names:{
        width:100,
        fontSize:Util.fixedFont(14)
    },
    phone:{
        width:200,
        fontSize:Util.fixedFont(14)
    },
    orderSta:{
        height:40,
        alignItems:'center',
        flexDirection:'row',
        flex:1,
        width:Util.size.width-80
    },
    orderCont:{
        flex:1,
        flexDirection:'row',
        height:100,
        width:Util.size.width,
        paddingTop:10,
        paddingLeft:25,
        backgroundColor:'#f7f7f7',
        paddingBottom:10,
        marginBottom:10
    },
    orderConRig:{
        justifyContent:'center',
        marginLeft:20
    },
    grayColo:{
        color:'#333',
        fontSize:Util.fixedFont(14)
    },
    orderGoods:{
        width:80,
        height:80,
        justifyContent:'center'
    },
    peiStyle:{
        backgroundColor:'#fff',
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:30,
        paddingRight:30,
        borderBottomColor:'#e0e0e0',
        borderBottomWidth:0.5
    },
    btnClick:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:5
    },
    canOrder:{
        justifyContent:'center',
        alignItems:'center',
    },
    blockColor:{
        color:'#929292',
        fontSize:Util.fixedFont(13)
    },
    surOrder:{
        justifyContent:'center',
        alignItems:'center',
    },
    xiaOrder:{
        justifyContent:'center',
        alignItems:'center',
    },
    payColor:{
        color:'#f65e5d',
        fontSize:Util.fixedFont(13)
    },
    grayColor:{
        color:'#929292',
        fontSize:Util.fixedFont(14)
    },
    zheH:{
        flexWrap:'wrap',
        width:Util.size.width-105,
        lineHeight:18,
        fontSize:Util.fixedFont(14)
    },
    nameMAx:{
        width:Util.size.width-205
    },
    phoneMAx:{
        width:70
    },
    yiHang:{
        flexDirection:'row',
        flex:1,
        marginTop:3
    },
    yiHangs:{
       flexDirection:'row',
       flex:1,
       height:50,
       alignItems:'center'
   },
    payMoney:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        height:50,
        alignItems:'center',
	paddingRight:10
      },
        redBorder:{
            borderColor:'#f65e5d',
        },
        grayBorder:{
            borderColor:'#b0b0b0'
        },



         orderTitle:{
                flex:1,
                flexDirection:'row',
                width:Util.size.width,
                height:40,
                alignItems:'center'
            },
            orderHaos:{
                paddingLeft:5,
                width:Util.size.width-93,
                color:'#333',
                fontSize:Util.fixedFont(13),
                height:40,
                alignItems:'center',
                justifyContent:'center'
            },
            orderStas:{
                fontSize:Util.fixedFont(13),
                color:'#333'
            },
            orderState:{
                flexDirection:'row',
                justifyContent:'flex-end',
                width:40,
                height:32,
                alignItems:'center'
            },
            gray:{
                  color:'#929292'
              },
              yellow:{
                  color:'#fca800'
              },
              red:{
                  color:'#f65e5d'
              },
              green:{
                  color:'#4cb071'
              },
              smallFont:{
                  fontSize:Util.fixedFont(11),
                  color:'#333'
              },
});
module.exports=OrderDetail;


