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
var PopLayer=require('../../common/order_Pay');
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
            orderPayShippingStatus:this.props.initData.orderPayShippingStatus==-1?'':this.props.initData.orderPayShippingStatus,
             recType:this.props.initData.recType==null?'':this.props.initData.recType,
            pageNo:1,
            pageSize:10,
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
            orderSelect:'allOrder',
            headTitle:'全部订单',
            isAgainPurchaseBtn:true  //代替购买按钮是否可用 true可用false不可用
        };
    },
    componentDidMount: function() {
   // RNBridgeModule.orderIn('订单列表');
        BackAndroid.addEventListener('hardwareBackPress', this.onBackPressed);
        if(this.state.orderPayShippingStatus=='0'){
            this.setState({headTitle:'待付款'});
        }else if(this.state.orderPayShippingStatus=='1'){
             this.setState({headTitle:'待收货'});
        }else if(this.state.orderPayShippingStatus=='2'){
             this.setState({headTitle:'已取消'});
         }else if(this.state.orderPayShippingStatus=='3'){
              this.setState({headTitle:'已完成'});
          }
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
                if(_message=='selectMyOrderPage'){
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
                       recType:data.recType,
                       orderSelectList:false,
                       orderSelect:data.orderSelect
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
       // RNBridgeModule.buttonBack('order');
         return false;
    },
    componentWillUnmount(){
    RNBridgeModule.orderOut('订单列表');
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackPressed);
    },
    fetchData: function() {
        var that=this;
        return new Promise(function (resolve, reject) {
            var _q='?token='+that.state.token+'&userId='+that.state.userId+'&orderPayShippingStatus='+that.state.orderPayShippingStatus+'&recType='+that.state.recType+'&pageNo=1&pageSize='+that.state.pageSize;
             var baseUrl=Service.selectMyOrderPage+_q;
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
                            message:'selectMyOrderPage'
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
             var _q='?token='+this.state.token+'&userId='+this.state.userId+'&orderPayShippingStatus='+this.state.orderPayShippingStatus+'&recType='+this.state.recType+'&pageNo='+(this.state.pageNo+1)+'&pageSize='+this.state.pageSize;
             var baseUrl=Service.selectMyOrderPage+_q;
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
                                ref="_listView"
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
                        <PopLayer data={
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
        if (_orderPayShippingStatus=='0'){
            _orderStatusStr='待付款';
            if(_recType==1 || _recType==3){
                if(reserve1=='03'){
                    _btnCode='01';  //统购商品下架
                }else{
                    _btnCode='02';  //统购商品正常可以继续支付
                }
            }else{
                if(reserve1=='03'){
                    _btnCode='03';  //零售商品下架
                }else{
                    _btnCode='04';   //零售商品正常可以继续支付
                }
            }
        }else if(_orderPayShippingStatus=='1'){
            _orderStatusStr = '待收货';
            _btnCode='05';   //待收货状态用户可以确认收货
        }else if (_orderPayShippingStatus == '2'){
            _orderStatusStr = '已取消';
            _btnCode='06';
        } else if (_orderPayShippingStatus=='3') {
            _orderStatusStr = '已完成';
           // _btnCode='07';
        }
        var _btnView=this._btnViewInit(_btnCode,item);
        return(
            <View style={styles.orderDan}>
            <View style={styles.bottomB}>
                <OrderTop data={{
                    orderSn:_ordersn,
                    orderStatusStr:_orderStatusStr,
                    recType:_recType
                }} />
                </View>
                <OrderGoodDetail data={{
                    data:item,
                    btnCode:_btnCode,
                    orderStatusStr:_orderStatusStr
                }}  callback={this._orderDetail.bind(this)} />
                <View style={styles.payMon}>
                    <Text style={styles.fontGong}>共<Text>{_orderCount}</Text>件,总金额:<Text style={[styles.redColor,{fontSize:Util.fixedFont(15)}]}>{Util.FuncRmbFormat(item.goodsAmount)}</Text></Text>
                    {_btnView}
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
    _btnViewInit:function(_btnCode,item){
        if(_btnCode=='01'){//统购商品已下架，不能继续支付，付款按钮置灰
            return (
                <View style={styles.payMoney}>
                    <View>
                        <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                        <View style={[styles.sureGoods,styles.grayBorder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center' }]}>
                            <TouchableOpacity data={item} onPress={this._funcUpdateOrderById.bind(this,item,2,'')}>
                                <Text style={styles.grayColor}>取消订单</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.sureGoodsR}>
                        <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                        <View style={[styles.grayBorder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                            <Text style={styles.grayColor}>付款</Text>
                        </View>
                    </View>
                </View>
            );
        }else if(_btnCode=='02'){
            return (
                <View style={styles.payMoney}>
                    <View>
                        <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                        <View style={[styles.sureGoods,styles.grayBorder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center' }]}>
                            <TouchableOpacity data={item} onPress={this._funcUpdateOrderById.bind(this,item,2,'')}>
                                <Text style={styles.grayColor}>取消订单</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.sureGoodsR}>
                        <Image source={require('../../img/common/1235.png')} resizeMode='contain' style={{width:72,height:27}} />
                        <View style={[styles.redBorder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity onPress={this._payBtnEvent.bind(this,item)}>
                                <Text style={ styles.redColor}>付款</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }else if(_btnCode=='03'){
            return(
                <View style={styles.payMoney}>
                    <View>
                        <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                        <View style={[styles.sureGoods,styles.grayBorder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center' }]}>
                            <TouchableOpacity data={item} onPress={this._funcUpdateOrderById.bind(this,item,2,'')}>
                                <Text style={styles.grayColor}>取消订单</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.sureGoodsR}>
                        <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                        <View style={[styles.grayBorder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                            <Text  style={styles.grayColor}>付款</Text>
                        </View>
                    </View>
                </View>
            );
        }else if(_btnCode=='04'){
            return(
                <View style={styles.payMoney}>
                    <View>
                        <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                        <View style={[styles.sureGoods,styles.grayBorder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center' }]}>
                            <TouchableOpacity data={item} onPress={this._funcUpdateOrderById.bind(this,item,2,'')}>
                                <Text style={styles.grayColor}>取消订单</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.sureGoodsR}>
                        <Image source={require('../../img/common/1235.png')} resizeMode='contain' style={{width:72,height:27}} />
                        <View style={[styles.redBorder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity onPress={this._payBtnEvent.bind(this,item)}>
                                <Text style={ styles.redColor}>付款</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }else if(_btnCode=='05'){
            return (
                <View style={styles.payMoney}>
                    <View style={styles.sureGoodsR}>
                         <Image source={require('../../img/common/1235.png')} resizeMode='contain' style={{width:72,height:27}} />
                         <View style={[styles.redBorder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity onPress={this._funcUpdateOrderById.bind(this,item,'',2)}>
                                <Text  style={styles.redColor}>确认收货</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }else if(_btnCode=='06'){
            if(item.recType==0){
                return (
                    <View style={styles.payMoney}>
                        <View>
                            <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                            <View style={[styles.sureGoods,styles.grayBorder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center' }]}>
                                <TouchableOpacity onPress={this._funDeleteOrderByOrderSn.bind(this,item)}>
                                    <Text style={styles.grayColor}>删除订单</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.sureGoodsR}>
                            <Image source={require('../../img/common/1235.png')} resizeMode='contain' style={{width:72,height:27}} />
                            <View style={[styles.redBorder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center'}]}>
                                <TouchableOpacity onPress={this.FuncFetchData.bind(this,{
                                     fetchMethod:this._againPurchase,
                                     fetchParamData:item
                                })}>
                                    <Text style={ styles.redColor}>再次购买</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                );
            }else{
                return (
                     <View style={styles.payMoney}>
                     <View>
                         <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                         <View style={[styles.sureGoods,styles.grayBorder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center',marginRight:10 }]}>
                             <TouchableOpacity onPress={this._funDeleteOrderByOrderSn.bind(this,item)}>
                                 <Text style={styles.grayColor}>删除订单</Text>
                             </TouchableOpacity>
                         </View>
                     </View>

                     </View>
                 );
            }
        }else if(_btnCode=='07'){
             return (
                 <View style={styles.payMoney}>
                      <View>
                           <Image source={require('../../img/common/1234.png')} resizeMode='contain' style={{width:72,height:27}} />
                           <View style={[styles.sureGoods,styles.grayBorder,{position:'absolute',top:0,left:0,width:72,height:27,justifyContent:'center',alignItems:'center',marginRight:10 }]}>
                               <TouchableOpacity onPress={this._funDeleteOrderByOrderSn.bind(this,item)}>
                                   <Text style={styles.grayColor}>删除订单</Text>
                               </TouchableOpacity>
                           </View>
                       </View>
                 </View>
             );
         }
        return null;
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
         if(param!='cancle'){
            var _param={
                 fetchMethod:this.fetchData,
                 fetchParamData:''
             }
             this.FuncFetchData(_param);
            //this.fetchData();
        }
        this.setState({
            payAlert:false
        });
    },

    _callbackOrderSelect:function(param){
        if(this.refs._listView!=null){
            this.refs._listView.scrollTo({y: 0});
        }
        var _recType='';
        if(param=='allOrder'){
            _recType='';
        }else if(param=='schoolOrder'){
            _recType='1';
        }else if(param=='retailOrder'){
             _recType='0';
        }else if(param=='insteadOrder'){
             _recType='3';
         }
         //alert(_recType);
        var that=this;
        return new Promise(function (resolve, reject) {
             var _q='?token='+that.state.token+'&userId='+that.state.userId+'&orderPayShippingStatus='+that.state.orderPayShippingStatus+'&recType='+_recType+'&pageNo=1&pageSize='+that.state.pageSize;
             var baseUrl=Service.selectMyOrderPage+_q;
             Util.get(baseUrl,
             function(data){
                var _msgCode=data.msgCode;
                if(_msgCode==1){
                    that.setState({
                        loaded:true,
                        noOrder:true,
                        recType:_recType,
                        orderSelectList:false,
                        orderSelect:param,
                        pageNo:1
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
                            recType:_recType,
                           orderSelectList:false,
                           orderSelect:param,
                           pageNo:1
                       });
                       reject('noData1');
                   }else{
                       _data.recType=_recType;
                       _data.orderSelect=param;
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
                       recType:_recType,
                       orderSelectList:false,
                       orderSelect:param,
                       pageNo:1
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
    //付款按钮点击事件
    _payBtnEvent:function(item){
        this.setState({
            payAlert:true,
            payData:item
        });
        /*if(Platform.OS=='ios'){

        }else{
            ToastAndroid.show('请输入身高和体重，格式如175cm，85.9kg。', ToastAndroid.LONG);
        }*/
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
        ])
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
                var _title=data.obj.title;
                var _msgCode=data.msgCode;
                if(_msgCode==1){
                    reject('noData1');
                    ToastAndroid.show(data.obj.message, 2000);
                }else if(_msgCode==99){
                    RNBridgeModule.toLogin('toLogin');
                }else{
                    ToastAndroid.show(data.obj.message, 2000);
                    var _data={
                        data:data,
                        message:'cancelOrderOrconfirmReceipt'
                    }
                     resolve(_data);
                }
             },function(err){
                    reject('noNet');
             });
        });
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
        ])
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
                var _title=data.obj.title;
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

    _orderListPayBtn:function(){
        this.props.navigator.push({
            component:PopLayer
        })
    },


    //跳转到订单详情
    _orderDetail:function(_data){
        this.props.navigator.push({
            component:OrderDetail,
            title: '零售详情',
            params:{
                goodsNumberTotal:_data.data.data.goodsNumberTotal,
                orderId:_data.data.data.orderId,
                recType:_data.data.data.recType,
                btnCode:_data.data.btnCode,
                orderStatusStr:_data.data.orderStatusStr,
                token:this.state.token,
                userId:this.state.userId,
                callback:this._callbackOnRefresh
            }
        });
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
    }
});
var styles = StyleSheet.create({
    bottomB:{
    borderColor:'#e0e0e0',
    borderBottomWidth:0.5
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
        height:55,
        alignItems:'center',
        justifyContent:'flex-start',
        borderTopWidth:0.5,
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
        borderColor:'#f65e5d',
    },
    grayBorder:{
        borderColor:'#b0b0b0'
    }
});
module.exports=Order;


