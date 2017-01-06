/**
 * Created by qiaozm on 2016/6/29.
 * 订单选择支付方式组件
 */
 import React,{Component} from 'react';
var Util=require('./Util');
import Service from './service';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ToastAndroid,
    Platform
    } from'react-native';
var NativeModules  = require('react-native').NativeModules;
var RNBridgeModule=NativeModules.RNBridgeModule;
var btnDisabled=true;  //true表示按钮可以点击 false表示按钮不能点击
var OrderPayPop =React.createClass({
    getInitialState: function() {
        return {
            reqSource:this.props.data.reqSource,//来源，orderList 订单列表  orderDetail 订单详情
            token:this.props.data.token,
            payData:this.props.data.payData,
            payCode:this.props.data.payData.payId,
            payName:this.props.data.payData.payName
        };
    },

    componentDidMount: function() {
        this.fetchData();
    },
    fetchData: function() {
         var _q='?token='+this.state.token;
         var baseUrl=Service.getOnlineEnabledPaymentList+_q;
         var that=this;
         Util.get(baseUrl,
         function(data){
            var _body=data.body;
            if(_body!=null && _body!='' && _body.length>0){
                that.setState({
                    paymentList:_body
                });
            }
         },function(err){
                //alert(err);
            });
    },
    render: function() {
        var _payMentView=this._initPaymentView();
        return (
            <View style={styles.black}>
                <View style={styles.blackPop}></View>
                <View style={styles.orderPull}>
                    <View style={styles.twoH}>
                <View>
                {
                Platform.OS=='ios'?
                <Text allowFontScaling={false} style={styles.huiColor}>提示:</Text>
                :
                <Text style={styles.huiColor}>提示:</Text>
                }
                </View>
                        <View style={{height:50,width:Util.size.width-100,justifyContent:'center',alignItems:'center'}}>
                {
                Platform.OS=='ios'?
                <Text allowFontScaling={false} style={styles.goods}>请选择支付方式:</Text>
                :
                <Text style={styles.goods}>请选择支付方式:</Text>
                }



                        </View>
                        <View style={[styles.yiHang,{height:40, marginBottom:10}]}>
                            {_payMentView}
                        </View>
                        <View style={styles.cenTer}>
                                <View style={{flex:1,flexDirection:'row',width:Util.size.width-100,height:40,justifyContent:'center',alignItems:'center'}}>
                                    <TouchableOpacity  onPress={this._cancleBtn.bind(this,'cancle')}>
                                        <View style={[styles.ban,styles.rightBorder]}>
                {
                Platform.OS=='ios'?
                <Text allowFontScaling={false} style={{color:'#53b0e9'}}>取消</Text>
                :
                <Text style={{color:'#53b0e9'}}>取消</Text>
                }



                </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity  onPress={this._confirmBtn.bind(this)}>
                                        <View style={styles.ban}>
                {
                Platform.OS=='ios'?
                <Text allowFontScaling={false} style={{color:'#53b0e9'}}>确定</Text>
                :
                <Text style={{color:'#53b0e9'}}>确定</Text>
                }

                </View>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </View>
                </View>
            </View>
        );

    },
    //取消关闭弹出框
            _cancleBtn:function(param){
                 this.props.callback(param);
            },

   //生成在线支付列表
   _initPaymentView:function(){
       var itemList=[];
       var _referer=this.state.payData.referer;//订单的来源  01-PC端  02-IOS端 03-android
       var _paymentList=this.state.paymentList;
       if(_paymentList!=null && _paymentList.length>0){
           for(var i=0;i<_paymentList.length;i++){
               var item=_paymentList[i];
               if(_referer=='01'){
                    if(this.props.data.payData.payId==item.payCode){
                        itemList[i]=(<TouchableOpacity onPress={this._payTypeOnPress.bind(this,item.payCode,item.payName)}>
                            <View style={styles.yiHan}>
                                <Image source={require('../img/retailDetail/Ok0.png')} resizeMode='contain' style={[styles.fanxuan,{width:22}]} />
                                {
                                   Platform.OS=='ios'?
                                   <Image defaultSource={require('../img/common/alipayimgide.png')} source={{uri: item.payImgide+'!m159x43.png'}}  resizeMode='contain' style={[styles.zhiFu,{width:Util.size.width/2-90,height:40}]} />
                                   :
                                   <LoadImg style={styles.zhiFu} data={
                                       {
                                           width:Util.size.width/2-90,
                                           height:40,
                                           uri:item.payImgide+'!m159x43.png',
                                           dataSource:require('../img/common/alipayimgide.png')
                                       }
                                   } />
                                }
                            </View>
                        </TouchableOpacity>);
                        break;
                    }
               }else{
                    itemList[i]=(
                       <TouchableOpacity onPress={this._payTypeOnPress.bind(this,item.payCode,item.payName)}>
                           {
                               this.state.payCode==item.payCode?
                               <View style={styles.yiHan}>
                                   <Image source={require('../img/retailDetail/Ok0.png')} resizeMode='contain' style={[styles.fanxuan,{width:22}]} />
                                    {
                                       Platform.OS=='ios'?
                                       <Image defaultSource={require('../img/common/alipayimgide.png')} source={{uri: item.payImgide+'!m159x43.png'}}  resizeMode='contain' style={[styles.zhiFu,{width:Util.size.width/2-90,height:40}]} />
                                       :
                                       <LoadImg style={styles.zhiFu} data={
                                           {
                                               width:Util.size.width/2-90,
                                               height:40,
                                               uri:item.payImgide+'!m159x43.png',
                                               dataSource:require('../img/common/alipayimgide.png')
                                           }
                                       } />
                                    }
                               </View>
                               :
                               <View style={styles.yiHan}>
                                   <Image source={require('../img/retailDetail/Ok.png')} resizeMode='contain' style={[styles.fanxuan,{width:22}]} />
                                   {
                                      Platform.OS=='ios'?
                                      <Image defaultSource={require('../img/common/wxpayimgide.png')} source={{uri: item.payImgide+'!m159x43.png'}}  resizeMode='contain' style={[styles.zhiFu,{width:Util.size.width/2-90,height:40}]} />
                                      :
                                      <LoadImg style={styles.zhiFu} data={
                                          {
                                              width:Util.size.width/2-90,
                                              height:40,
                                              uri:item.payImgide+'!m159x43.png',
                                              dataSource:require('../img/common/wxpayimgide.png')
                                          }
                                      } />
                                   }
                               </View>
                           }
                       </TouchableOpacity>
                   );
               }
           }
       };
       return itemList;
   },

   //选择支付方式
   _payTypeOnPress:function(_payCode,_payName){
       this.setState({
           payCode:_payCode,
           payName:_payName
       });
   },

    //确定按钮事件
    _confirmBtn:function(){
        if(btnDisabled==true){
            btnDisabled=false;
            var _referer=this.state.payData.referer;//订单的来源  01-PC端  02-IOS端 03-android
            var _payCode=this.state.payCode;
            var _recType=this.state.payData.recType;//1	商品类型;0普通;1公告统购; 2公告代购
            var _goodsName='';//this.state.payData.sunOrderGoodsDTOList[0].goodsName;
            if(this.state.reqSource=='orderList'){
                _goodsName=this.state.payData.sunOrderGoodsDTOList[0].goodsName;
            }else if(this.state.reqSource=='orderDetail'){
                if(_recType==3){
                   _goodsName=this.state.payData.helpOrderDTOList[0].sunOrderGoodsDTOList[0].goodsName;
                }else{
                  _goodsName=this.state.payData.sunOrderGoodsDTOList[0].goodsName;
                }
            }
           /* if(_recType==3){
               _goodsName=this.state.payData.helpOrderDTOList[0].sunOrderGoodsDTOList[0].goodsName;
            }else{
              _goodsName=this.state.payData.sunOrderGoodsDTOList[0].goodsName;
            }*/
            var _goodsNumberTotal=this.state.payData.goodsNumberTotal;
            var _titleName='';
            var _type='';
            if(Platform.OS=='ios'){
                _type='02';
                //alert('请在电脑端完成支付。');
            }else{
                _type='03';
            }
            if(_payCode=='wxpay' && _referer=='01'){
                if(Platform.OS=='ios'){
                    _type='02';
                    RNBridgeModule.toast('请在电脑端完成支付。');
                    //alert('请在电脑端完成支付。');
                }else{
                    _type='03';
                    ToastAndroid.show('请在电脑端完成支付。', 2000);
                }
                setTimeout(() => {
                    btnDisabled=true;//两秒钟内不能点击
                }, 2000);
                this.props.callback('confirm');
            }else{
                if(_goodsNumberTotal>1){
                    _titleName=_goodsName+'...共' + _goodsNumberTotal + '件商品';
                }else{
                    _titleName=_goodsName;
                }
                var _q='?token='+this.state.token+'&payCode='+this.state.payCode+'&orderSn='+this.state.payData.orderSn+'&orderId='+this.state.payData.orderId+'&type='+_type;
                 var baseUrl=Service.getPayDetail+_q;
                 var that=this;
                 Util.get(baseUrl,
                 function(data){
                    var _message=data.obj.message;
                    var _msgCode=data.msgCode;
                    if(_msgCode==1){
                         if(Platform.OS=='ios'){
                            RNBridgeModule.toast(_message);
                        }else{
                            ToastAndroid.show(_message, 2000);
                        }
                        setTimeout(() => {
                            btnDisabled=true;//两秒钟内不能点击
                        }, 2000);
                        that.props.callback('confirm');
                    }else if(_msgCode==99){
                        RNBridgeModule.toLogin('toLogin');
                    }else if(_msgCode=='3' || _msgCode=='03'){
                        if(Platform.OS=='ios'){
                            RNBridgeModule.toast(_message);
                        }else{
                            ToastAndroid.show(_message, 2000);
                        }
                        setTimeout(() => {
                            btnDisabled=true;//两秒钟内不能点击
                        }, 2000);
                        that.props.callback(_msgCode);
                    }else{
                        var _data={};
                        if(that.state.payCode=='alipay'){
                            _data={
                                orderId:that.state.payData.orderId,
                                alipay_order:that.state.payData.orderSn,
                                alipay_description:_goodsName,
                                alipay_price:that.state.payData.goodsAmount,
                                alipay_name:_titleName,
                                alipay_privateKey:data.obj.body.pay.rsa_private,
                                alipay_partner:data.obj.body.pay.partner,
                                rsa_public:data.obj.body.pay.rsa_public,
                                alipay_url:data.obj.body.url,
                                alipay_seller:data.obj.body.pay.seller_id,
                                type:that.state.payData.recType
                            };
                        }else if(that.state.payCode=='wxpay'){
                            _data={
                                  orderId:that.state.payData.orderId,
                                  wxpay_orderId:that.state.payData.orderSn,
                                  wxpay_appid:data.obj.body.wxScanPayResqDTO.appid,
                                  wxpay_mchid:data.obj.body.wxScanPayResqDTO.partnerid,
                                  wxpay_prepayid:data.obj.body.wxScanPayResqDTO.prepayid,
                                  wxpay_noncestr:data.obj.body.wxScanPayResqDTO.noncestr,
                                  wxpay_timestamp:data.obj.body.wxScanPayResqDTO.timestamp,
                                  wxpay_packages:data.obj.body.wxScanPayResqDTO.packagevalue,
                                  wxpay_sign:data.obj.body.wxScanPayResqDTO.sign,
                                  type:that.state.payData.recType
                            };
                        };
                        var payData={
                            payCode:that.state.payCode,
                            data:_data
                        };
                        setTimeout(() => {
                            btnDisabled=true;//两秒钟内不能点击
                        }, 2000);
                        RNBridgeModule.payMoneyOrder(payData);//调用原生提供的支付
                        that.props.callback('confirm');
                    }
                 },function(err){
                    setTimeout(() => {
                        btnDisabled=true;//两秒钟内不能点击
                    }, 2000);
                      that.props.callback('confirm');
                 });
            }
        }
    },


});
var styles = StyleSheet.create({
    black:{
        width:Util.size.width,
        height:Util.size.height,
        position:'absolute',
        left:0,
        top:0
    },
    huiColor:{
        color:'#5e5a57',
        fontSize:18
    },
    blackPop:{
        backgroundColor:'#000',
        opacity:0.7,
        width:Util.size.width,
        height:Util.size.height
    },
    orderPull:{
        width:Util.size.width-100,
        marginLeft:50,
        marginRight:50,
        flex:1,
        flexDirection:'row',
        backgroundColor:'#fff',
        borderRadius:6,
        position:'absolute',
        top:Util.size.height/2-140,
        paddingTop:20,
        paddingBottom:15,
        left:0
    },
    yiHang:{
        flex:1,
        flexDirection:'row',
        width:Util.size.width-120
    },
    twoH:{
        width:Util.size.width-100,
        height:140,
        justifyContent:'center',
        alignItems:'center'
    },
    goods:{
        color:'#5e5a57'
    },
    yiHan:{
        width:Util.size.width/2-60,
        height:40,
        flex:1,
        flexDirection:'row'
    },
    fanxuan:{
        marginLeft:5
    },
    cenTer:{
        flex:1,
        flexDirection:'row',
        width:Util.size.width-100,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderTopColor:'#bebebe',
        borderTopWidth:1
    },
    ban:{
        width:Util.size.width/2-50,
        justifyContent:'center',
        alignItems:'center',
        height:40
    },
    rightBorder:{
        borderColor:'#bebebe',
        borderRightWidth:1,
        height:40
    }
});
module.exports=OrderPayPop;


