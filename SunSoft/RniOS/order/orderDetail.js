/**
 * Created by qiaozm on 2016/6/29.
 * 商品详情组件
 */
import React,{Component} from 'react';
var Header=require('../../common/header');
var Util=require('../../common/Util');
var OrderTop=require('./orderTop');
var OrderPppCom = require('../../common/order_Pop');
var OrderGoodDetail=require('./orderGoodDetail');
var OrderGoodDetailDai=require('./orderGoodDetailDai');
import Service from '../../common/service';
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
    AlertIOS
    } from'react-native';
var { NativeModules } = require('react-native');
var RNBridgeModule=NativeModules.RNBridgeModule;
var OrderDetail =React.createClass({
    getInitialState: function() {
    RNBridgeModule.isTabHidden('false');//隐藏tab
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
        var _param={
            fetchMethod:this.fetchData,
            fetchParamData:''
        }
        this.FuncFetchData(_param);
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
                     /*var _recType=data.recType;//1	商品类型;0普通;1公告统购; 2公告代购
                     if(_recType==3){
                        _list=data.helpOrderDTOList;
                        var _orderCount=0;  //代购订单数量
                        if(_list!=null && _list.length>0){
                            for(var i=0;i<_list.length;i++){
                                var item=_list[i];
                                var _goodLength=item.sunOrderGoodsDTOList.length;
                                var _count=0;
                                for(var k=0;k<_goodLength;k++){
                                    _count+=parseInt(item.sunOrderGoodsDTOList[k].goodsNumber);
                                }
                                _orderCount+=_count;
                            }
                        };
                        that.setState({orderCont:_orderCount});
                     }else{
                        _list=data.sunOrderGoodsDTOList;
                        var _orderCount=0;  //代购订单数量
                        if(_list!=null && _list.length>0){
                            for(var i=0;i<_list.length;i++){
                                var item=_list[i];
                                _orderCount+=parseInt(item.goodsNumber);
                            }
                        };
                        that.setState({orderCont:_orderCount});
                     }*/
                }else if(_message=='cancelOrderOrconfirmReceipt'){//确认订单，取消订单确定按钮执行方法
                    var _orderStatusStr='';
                    var _btnCode='';
                    if(data==2){
                        _orderStatusStr='已取消';
                        _btnCode='06';
                    }else{
                        _orderStatusStr='已完成';
                        //_btnCode='07';
                    }
                    that.setState({
                        btnCode:_btnCode,
                        orderStatusStr:_orderStatusStr
                    });
                }else if( _message=='deleteOrderByOrderSn'){  // 删除订单
                    that.props.callback();
                    that.props.navigator.popToTop();
                }else if(_message=='addShopCartGoods'){
                     RNBridgeModule.listGoToCart('toCart');
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
    },
    render: function() {
        if (this.state==null || !this.state.loaded) {
            return this.renderLoadingView();
        }
        var _btnView=this._btnViewInit(this.state.btnCode,this.state.data);
                                   var data= this.state.data;
                var _titleView=this._initTitleView(data.orderStatusStr);
        return (
            <View style={[styles.bigView,{height: Util.size.height}]}>
                <View><Image source={require('../../img/common/noInter.png')} resizeMode='contain' style={{width:0,height:0}} /></View>
                <Header navigator={this.props.navigator} initObj={{
                    backName:'orderDetail',
                    title:'订单详情',
                    show:true,
                    callback:this.props.callback
                 }}/>
                <View style={{height: Util.size.height-57}}>
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
                                              <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 14, height: 15,marginRight:1} } />
                                                  <View style={styles.orderHaos}><Text allowFontScaling={false} style={styles.orderStas}>订单号：<Text allowFontScaling={false} style={styles.orderStas}>{this.state.data.orderSn}</Text><Text allowFontScaling={false} style={styles.smallFont}>（代买）</Text></Text></View>
                                                        {_titleView}
                                          </View>
                                    </View>
                                    :
                                    <View style={styles.topInB}>
                                        {
                                             this.state.data.recType==0?
                                             <View style={styles.orderTitle}>
                                                 <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 14, height: 15,marginRight:1} } />
                                                     <View style={styles.orderHaos}><Text allowFontScaling={false} style={styles.orderStas}>订单号：<Text allowFontScaling={false} style={styles.orderStas}>{this.state.data.orderSn}</Text><Text allowFontScaling={false} style={styles.smallFont}>（零售）</Text></Text></View>
                                                 {_titleView}
                                             </View>
                                             :
                                             <View style={styles.orderTitle}>
                                                 <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 14, height: 15,marginRight:1} } />
                                                     <View style={styles.orderHaos}><Text allowFontScaling={false} style={styles.orderStas}>订单号：<Text allowFontScaling={false} style={styles.orderStas}>{this.state.data.orderSn}</Text><Text allowFontScaling={false} style={styles.smallFont}>（统购）</Text></Text></View>
                                                 {_titleView}
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
                                <View>
                                <View style={styles.addIphone}>
                                    <Image style={styles.orderImg} source={require('../../img/order/border.png')} style={{width: Util.size.width-20,height:85} } />
                                    <View style={styles.addIpoIn}>
                                        <View style={styles.orderHao}>
                                            <Image style={styles.orderImg} source={require('../../img/order/renT.png')} style={{width: 17, height: 18,marginRight:10} } />
                                            <View style={styles.nameMAx}><Text allowFontScaling={false} numberOfLines={2} style={styles.names}>{this.state.data.consignee}</Text></View>
                                            <Image style={styles.orderImg} source={require('../../img/order/iphone.png')} style={{width: 13, height: 20,marginRight:10} } />
                                            <View style={styles.phoneMAx}><Text allowFontScaling={false} numberOfLines={1} style={styles.phone}>{this.state.data.mobile}</Text></View>
                                        </View>
                                        <View style={styles.orderSta}>
                                            <Image style={styles.orderImg} source={require('../../img/order/ditu.png')} style={{width: 19, height: 19,marginRight:10} } />
                                            <Text style={{height:35}} allowFontScaling={false} numberOfLines={2} style={styles.zheH}>{this.state.data.address}</Text>
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
                                    <View style={styles.yiHang}><Text allowFontScaling={false} style={styles.grayColo}>支付配送：</Text><Text allowFontScaling={false} style={styles.grayG}>在线支付 集中配送至学校</Text></View>
                                    <View style={styles.yiHang}><Text allowFontScaling={false} style={styles.grayColo}>商品总额：</Text><Text allowFontScaling={false} style={styles.redColor}>{Util.FuncRmbFormat(this.state.data.goodsAmount)}</Text></View>
                                    <View style={styles.yiHang}><Text allowFontScaling={false} style={styles.grayColor}>下单时间：<Text allowFontScaling={false} style={styles.addTime}>{this.state.data.addTime}</Text></Text></View>
                                </View>
                                <View style={styles.payMon}>
                                    <Text allowFontScaling={false} style={styles.widthM}>共<Text allowFontScaling={false}>{this.state.goodsNumberTotal}</Text>件，总金额：<Text allowFontScaling={false} style={styles.redColors}>{Util.FuncRmbFormat(this.state.data.goodsAmount)}</Text></Text>
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
                <View style={{ position:'absolute',bottom:10,left:0,width:Util.size.width,height:50,justifyContent:'center',backgroundColor:'#fff',alignItems:'flex-start',paddingLeft:10,paddingRight:10}}>
                    <View style={styles.yiHangs}>
                <View style={{paddingBottom:10}}>
                            <Text allowFontScaling={false} style={styles.fontGo}>共<Text allowFontScaling={false}>{this.state.goodsNumberTotal}</Text>件</Text>
                            <Text allowFontScaling={false} style={styles.fontGo}>总金额：<Text allowFontScaling={false} style={styles.redColor}>{Util.FuncRmbFormat(this.state.data.goodsAmount)}</Text></Text>
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
                            <OrderPay data={
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
     //监测网络状态
        _getNetInfoState:function(param){
            this.setState({
                noNet:param
            });
        },
        //点击刷新方法
        _onPressRefresh:function(param){
            //this.fetchData();
        },
        _endReached:function(){
            //this.getMoreData();
        },
        _onRefresh: function () {
            this.setState({isRefreshing: true});
            setTimeout(() => {
               // this.fetchData();
            }, 1000);
    },
    _initTitleView:function(orderStatusStr){
        var _orderStatusStr=this.state.data.orderStatusStr;
        if(_orderStatusStr=='待付款'){
            return(
                <View style={styles.orderState}><Text allowFontScaling={false} style={[styles.smallFont,styles.red]}>{_orderStatusStr}</Text></View>
            )
        }else if(_orderStatusStr=='待发货'){
             return(
                 <View style={styles.orderState}><Text allowFontScaling={false} style={[styles.smallFont,styles.yellow]}>{_orderStatusStr}</Text></View>
             )
        }else if(_orderStatusStr=='待收货'){
             return(
                 <View style={styles.orderState}><Text allowFontScaling={false} style={[styles.smallFont,styles.yellow]}>{_orderStatusStr}</Text></View>
             )
        }else if(_orderStatusStr=='已完成'){
             return(
                 <View style={styles.orderState}><Text allowFontScaling={false} style={[styles.smallFont,styles.green]}>{_orderStatusStr}</Text></View>
             )
        }else if(_orderStatusStr=='已取消'){
             return(
                 <View style={styles.orderState}><Text allowFontScaling={false} style={[styles.smallFont,styles.gray]}>{_orderStatusStr}</Text></View>
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
                    <View style={styles.canOrder}>
                        <TouchableOpacity data={item} onPress={this._funcUpdateOrderById.bind(this,item,2,'')}>
                            <Text allowFontScaling={false} style={styles.blockColor}>取消订单</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.xiaOrder}>
                        <Text allowFontScaling={false} style={styles.blockColor}>付款</Text>
                    </View>
                </View>
                );
            }else if(_btnCode=='02'){
                return (
                <View style={styles.btnClick}>
                    <View style={styles.canOrder}>
                        <TouchableOpacity data={item} onPress={this._funcUpdateOrderById.bind(this,item,2,'')}>
                            <Text allowFontScaling={false} style={styles.blockColor}>取消订单</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.surOrder}>
                        <TouchableOpacity data={item} onPress={this._payBtnEvent.bind(this,item)}>
                            <Text allowFontScaling={false} style={styles.payColor}>付款</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                );
            }else if(_btnCode=='03'){
                return(
                    <View style={styles.btnClick}>
                        <View style={styles.canOrder}>
                            <TouchableOpacity data={item} onPress={this._funcUpdateOrderById.bind(this,item,2,'')}>
                                <Text allowFontScaling={false} style={styles.blockColor}>取消订单</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.xiaOrder}>
                            <Text allowFontScaling={false} style={styles.blockColor}>付款</Text>
                        </View>
                    </View>
                );
            }else if(_btnCode=='04'){
                return(
                    <View style={styles.btnClick}>
                        <View style={styles.canOrder}>
                            <TouchableOpacity onPress={this._funcUpdateOrderById.bind(this,item,2,'')}>
                                <Text allowFontScaling={false} style={styles.blockColor}>取消订单</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.surOrder}>
                            <TouchableOpacity data={item} onPress={this._payBtnEvent.bind(this,item)}>
                                <Text allowFontScaling={false} style={styles.payColor}>付款</Text>
                             </TouchableOpacity>
                        </View>
                    </View>
                );
            }else if(_btnCode=='05'){
                return (
                <View style={styles.btnClick}>
                     <View style={styles.surOrder}>
                        <TouchableOpacity onPress={this._funcUpdateOrderById.bind(this,item,'',2)}>
                            <Text allowFontScaling={false} style={styles.payColor}>确认收货</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                );
            }else if(_btnCode=='06'){
                 if(item.recType==0){
                    return (
                     <View style={styles.btnClick}>
                          <View style={[styles.xiaOrder,{marginRight:10}]}>
                             <TouchableOpacity onPress={this._funDeleteOrderByOrderSn.bind(this,item,'',2)}>
                                 <Text allowFontScaling={false} style={styles.blockColor}>删除订单</Text>
                             </TouchableOpacity>
                         </View>
                         <View style={styles.surOrder}>
                              <TouchableOpacity data={item}  onPress={this.FuncFetchData.bind(this,{
                                     fetchMethod:this._againPurchase,
                                     fetchParamData:item
                                 })}>
                                  <Text allowFontScaling={false} style={styles.payColor}>再次购买</Text>
                              </TouchableOpacity>
                          </View>
                     </View>
                     );
                 }else{
                    return (
                     <View style={styles.btnClick}>
                          <View style={styles.xiaOrder}>
                             <TouchableOpacity onPress={this._funDeleteOrderByOrderSn.bind(this,item,'',2)}>
                                 <Text allowFontScaling={false} style={styles.blockColor}>删除订单</Text>
                             </TouchableOpacity>
                         </View>
                     </View>
                     );
                 }
             }else if(_btnCode=='07'){
                return (
                  <View style={styles.btnClick}>
                       <View style={styles.xiaOrder}>
                          <TouchableOpacity onPress={this._funDeleteOrderByOrderSn.bind(this,item,'',2)}>
                              <Text allowFontScaling={false} style={styles.blockColor}>删除订单</Text>
                          </TouchableOpacity>
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
            AlertIOS.alert('提示','确认删除该订单吗?',[
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
                    var _msgCode=data.msgCode;
                    if(_msgCode==1){
                        reject('noData1');
                        RNBridgeModule.toast(data.obj.title);
                    }else if(_msgCode==99){
                        RNBridgeModule.toLogin('toLogin');
                    }else{
                        RNBridgeModule.toast(data.obj.title);
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
                           RNBridgeModule.toast(data.obj.title);
                       }else if(_msgCode==99){
                           RNBridgeModule.toLogin('toLogin');
                       }else{
                          that.setState({
                              isAgainPurchaseBtn:false  //再次购买按钮只响应一次
                            });
                          RNBridgeModule.toast(data.obj.title);
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
               RNBridgeModule.toast('该订单已支付完成');
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
            AlertIOS.alert('提示',_msg,[
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
                        RNBridgeModule.toast(data.obj.message);
                    }else if(_msgCode==99){
                        RNBridgeModule.toLogin('toLogin');
                    }else{
                        RNBridgeModule.toast(data.obj.message);
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
            <View style={styles.container}>
                <Image source={require('../../img/common/loading.gif')} style={{width: 25, height:25} }  />
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
                               fontGo:{
                               fontSize:14,
                               color:'#333'
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
                               height:45
                               },
                               sureGoods:{
                               width:60,
                               height:31,
                               borderWidth:1,
                               borderRadius:4,
                               justifyContent:'center',
                               alignItems:'center'
                               },
                               sureGoodsR:{
                               width:60,
                               height:31,
                               borderWidth:1,
                               borderRadius:4,
                               justifyContent:'center',
                               alignItems:'center',
                               marginLeft:10,
                               marginRight:10
                               },
                               redBorder:{
                               borderColor:'#f65e5d',
                               },
                               grayBorder:{
                               borderColor:'#b0b0b0',
                               fontSize:13
                               },
    payMon:{
        flex:1,
        flexDirection:'row',
        width:Util.size.width,
        height:40,
        alignItems:'center',
                               marginBottom:10,
                               paddingRight:10,
                               paddingLeft:10
    },
        widthM:{
            width:Util.size.width-150,
            height:39,
            lineHeight:32,
                               fontSize:13,
                               color:'#333'
        },
    container:{
        justifyContent:'center',
        alignItems:'center',
        width:Util.size.width,
        height:Util.size.height
    },
    bigView:{
        backgroundColor:'#fff'
    },
    topIn:{
        paddingLeft:10,
        width:Util.size.width,
                               backgroundColor:'#f7f7f7',
                               flex:1,
                               flexDirection:'row'
    },
                               topInB:{
                               paddingLeft:10,
                               width:Util.size.width,
                               backgroundColor:'#fff',
                               borderColor:'#e0e0e0',
                               borderBottomWidth:1,
                               flex:1,
                               flexDirection:'row'
                               },
        redColors:{
            color:'#f65e5d',
                                   height:29,
                                   lineHeight:21,
                               fontSize:12
                                   },
                               fontGong:{
                               fontSize:13,
                               width:Util.size.width-150,
                               marginTop:8
                               },
    redColor:{
        color:'#f00',
        width:Util.size.width-150
    },
    orderHao:{
        paddingLeft:5,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderBottomColor:'#b0b0b0',
        width:Util.size.width-80
    },
    addIphone:{
        width:Util.size.width,
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#fff'
    },
                               posiTop:{
                               height:25
                               },
                               diHeight:{
                               height:45
                               },
    addIpoIn:{
        padding:10,
        width:Util.size.width-40,
        position:'absolute',
        top:15,
        left:20
    },
    orderDan:{
        width:Util.size.width,
                               paddingRight:10,
                               paddingLeft:10,
        paddingBottom:10,
        backgroundColor:'#f7f7f7'
    },
    orderHao:{
        flex:1,
        flexDirection:'row',
        height:30,
        alignItems:'center'
    },
    grayColor:{
        color:'#b0b0b0'
    },
    grayG:{
        color:'#5e5a57',
        width:Util.size.width-150
    },
    names:{
        width:100,
                               height:24,
                               lineHeight:20
    },
    phone:{
        width:200
    },
    addTime:{
        width:Util.size.width-150
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
        color:'#333'
    },
    peiStyle:{
        backgroundColor:'#fff',
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:30,
        paddingRight:30,
        borderBottomColor:'#e0e0e0',
        borderBottomWidth:1
    },
    btnClick:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:5
    },
    canOrder:{
        width:60,
        marginRight:10,
        borderColor:'#b0b0b0',
        borderWidth:1,
        height:27,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4
    },
    blockColor:{
        color:'#929292',
        height:25,
        lineHeight:19,
                               fontSize:11
    },
    surOrder:{
        width:60,
        height:27,
        borderColor:'#f65e5d',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4
    },
    xiaOrder:{
        width:60,
        height:27,
        borderColor:'#b0b0b0',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4
    },
    payColor:{
        color:'#f65e5d',
                               height:25,
                               lineHeight:19,
                               fontSize:11,
    },
    grayColor:{
        color:'#929292',
        width:Util.size.width-60
    },
    zheH:{
        flexWrap:'wrap',
        width:Util.size.width-105,
        lineHeight:20
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    orderTitle:{
                flex:1,
                flexDirection:'row',
                width:Util.size.width,
                height:32,
                alignItems:'center'
            },
            orderHaos:{
                width:Util.size.width-93,
                color:'#333',
                fontSize:12,
                height:32,
                alignItems:'flex-start',
                justifyContent:'center'
               
            },
            orderStas:{
                fontSize:12,
                color:'#333'
            },
            orderState:{
                width:40,
                height:32
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
                  fontSize:11,
                  color:'#333'
              },
});
module.exports=OrderDetail;


