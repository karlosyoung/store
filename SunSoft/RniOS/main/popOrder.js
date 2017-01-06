/**
 * Created by qiaozm on 2016/6/29.
 * 零售提交订单第一步组件
 */
import React,{Component} from 'react';
import OrderTwoView from './orderTwoView';
var Header=require('../../common/header');
var Util=require('../../common/Util');
import Service from '../../common/service';
import {
AppRegistry,
StyleSheet,
Text,
View,
Alert,
ScrollView,
Image,
TextInput,
Platform,
TouchableOpacity
} from'react-native';
var NativeModules  = require('react-native').NativeModules;
var RNBridgeModule=NativeModules.RNBridgeModule;
var PopLayer =React.createClass({
    getInitialState: function() {
        return {
            payData:this.props.data.payData,
            payCode:'alipay',
            payName:'支付宝在线支付',
            token:this.props.data.token,
            isPayBtn:true   //确定支付按钮是否可以点击
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
            <View style={styles.backBad}>
                <View style={styles.popLayer}></View>
                <View style={styles.popIn}>
                    <View style={styles.yiXin}>
                       <Image source={require('../../img/retailDetail/bigT.jpg')} resizeMode='contain' style={[styles.imgTig,{width:Util.size.width-150,height:180,marginTop:25,marginLeft:25,marginRight:25}]} />
                       <TouchableOpacity onPress={this._closeBtn.bind(this)} style={[styles.closeBtn,{position:'absolute',top:8,right:-10,width:30,height:30}]}>
                            <Image source={require('../../img/retailDetail/closeB.png')} style={{width:30,height:30}} resizeMode='contain' />
                       </TouchableOpacity>
                   </View>
                   <Text allowFontScaling={false} style={styles.jinZi}>请选择支付方式</Text>
                   <View style={ [styles.yiHang,styles.jianJu]}>
                        {_payMentView}
                   </View>
                   {
                        this.state.isPayBtn?
                            <TouchableOpacity onPress={this._sureBtn.bind(this)}>
                               <Image source={require('../../img/order/sure_btn.png')}style={[styles.imgGood,{width:Util.size.width-160,height:40}]} resizeMode='contain'/>
                          </TouchableOpacity>
                       :
                          <Image source={require('../../img/order/sure_btn.png')}style={[styles.imgGood,{width:Util.size.width-160,height:40}]} resizeMode='contain'/>
                   }
               </View>
        </View>
        );
    },

    //生成在线支付列表
    _initPaymentView:function(){
         var itemList=[];
        var _paymentList=this.state.paymentList;
        if(_paymentList!=null && _paymentList.length>0){
            for(var i=0;i<_paymentList.length;i++){
                var item=_paymentList[i];
                itemList[i]=(
                    <TouchableOpacity onPress={this._payTypeOnPress.bind(this,item.payCode,item.payName)}>
                        {
                            this.state.payCode==item.payCode?
                            <View style={styles.yiHan}>
                                <Image source={require('../../img/retailDetail/Ok0.png')} resizeMode='contain' style={[styles.fanxuan,{width:22}]} />
                                <Image defaultSource={require('../../img/common/alipayimgide.png')} source={{uri: item.payImgide+'!m159x43.png'}}  resizeMode='contain' style={[styles.zhiFu,{width:Util.size.width/2-85,height:40}]} />
                            </View>
                            :
                            <View style={styles.yiHan}>
                                <Image source={require('../../img/retailDetail/Ok.png')} resizeMode='contain' style={[styles.fanxuan,{width:22}]} />
                                <Image defaultSource={require('../../img/common/wxpayimgide.png')} source={{uri: item.payImgide+'!m159x43.png'}}  resizeMode='contain' style={[styles.zhiFu,{width:Util.size.width/2-85,height:40}]} />
                            </View>
                        }
                    </TouchableOpacity>
                );
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

    //提交订单跳转到弹出框
    _sureBtn:function(){
          this.setState({isPayBtn:false});
         this._retailCreateOrder();  //零售提交订单方法调用
         this.setState({
            ShowOrderPop:false
        });
    },

    //提交订单关闭选择支付方式弹出框
    _closeBtn:function(){
         this.props.callback();
    },

    //零售提交订单接口
    _retailCreateOrder:function(){
        var _type='03';//订单的来源  01-PC端  02-IOS端 03-android
        if(Platform.OS=='ios'){
            _type='02';
        }
        var _q='?token='+this.state.token+'&payCode='+this.state.payCode+'&orderSn='+this.state.payData.orderSn+'&orderId='+this.state.payData.orderId+'&type='+_type;
         var baseUrl=Service.getPayDetail+_q;
         var that=this;
         Util.get(baseUrl,
         function(data){
            var _message=data.obj.message;
            var _msgCode=data.msgCode;
            if(_msgCode==1){
                that.setState({isPayBtn:true});
                RNBridgeModule.toast(_message);
            }else if(_msgCode==99){
                RNBridgeModule.toLogin('toLogin');
            }else if(_msgCode=='3' || _msgCode=='03'){
                if(Platform.OS=='ios'){
                    RNBridgeModule.toast(_message);
                }
                that.setState({isPayBtn:true});
            }else{
                var _data={};
                if(that.state.payCode=='alipay'){
                    _data={
                        alipay_order:that.state.payData.orderSn,
                        alipay_description:that.state.payData.goodsName,
                        alipay_price:that.state.payData.price,
                        alipay_name:that.state.payData.titleName,
                        alipay_privateKey:data.obj.body.pay.rsa_private,
                        alipay_partner:data.obj.body.pay.partner,
                        rsa_public:data.obj.body.pay.rsa_public,
                        alipay_url:data.obj.body.url,
                        alipay_seller:data.obj.body.pay.seller_id,
                        type:0
                    };
                }else if(that.state.payCode=='wxpay'){
                    _data={
                          wxpay_orderId:that.state.payData.orderSn,
                          wxpay_appid:data.obj.body.wxScanPayResqDTO.appid,
                          wxpay_mchid:data.obj.body.wxScanPayResqDTO.partnerid,
                          wxpay_prepayid:data.obj.body.wxScanPayResqDTO.prepayid,
                          wxpay_noncestr:data.obj.body.wxScanPayResqDTO.noncestr,
                          wxpay_timestamp:data.obj.body.wxScanPayResqDTO.timestamp,
                          wxpay_packages:data.obj.body.wxScanPayResqDTO.packagevalue,
                          wxpay_sign:data.obj.body.wxScanPayResqDTO.sign,
                          type:0
                    };
                };
                var payData={
                    payCode:that.state.payCode,
                    data:_data
                };
                RNBridgeModule.payMoneyRetail(payData);//调用原生提供的支付
            }
         },function(err){
                that.setState({
                    isPayBtn:true,
                    loaded:true,
                    noNet:true
                });
            });
    }
});
var styles = StyleSheet.create({
    backBad:{
        justifyContent: 'center',
        alignItems: 'center',
        height:Util.size.height,
        width:Util.size.width,
        position:'absolute',
        top:0,
        left:0
    },
    popLayer:{
        height:Util.size.height,
        backgroundColor:'#000',
        opacity:0.7,
        width:Util.size.width,
        position:'absolute',
        top:0,
        left:0
    },
    yiHang:{
        flex:1,
        flexDirection:'row'
    },
    popIn:{
        width:Util.size.width-60,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#fff',
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:20,
        borderRadius:10,
        position:'absolute',
        top:Util.size.height/5,
        left:0
    },
    weiX:{
        justifyContent:'flex-start'
    },
    zhiFu:{
        justifyContent:'flex-start',
        width:Util.size.width/2-70
    },
    size:{
        marginTop:-60
    },
    jinZi:{
        fontSize:14,
        color:'#5e5a57',
                               height:30,
                               lineHeight:30
    },
    imgGood:{
        marginLeft:30,
        marginRight:30,
        justifyContent:'center',
        alignItems:'center'
    },
    goodsTop:{
        width:Util.size.width-100,
        height:40,
        justifyContent:'center',
        alignItems:'center'
    },
    wirteColor:{
        color:'#fff'
    },
    jianJu:{
        marginTop:10,
        marginBottom:10,
        width:Util.size.width-60
    },
    yiHan:{
        width:Util.size.width/2-60,
        flexDirection:'row',
        flex:1
    }
});
module.exports=PopLayer;


