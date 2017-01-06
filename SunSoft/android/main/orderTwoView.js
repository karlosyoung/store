/**
 * Created by qiaozm on 2016/6/29.
 * 零售提交订单第二步组件
 */
import React,{Component} from 'react';
var Header=require('../../common/header');
var Util=require('../../common/Util');
var PopLayer=require('./popOrder');
var NoNet=require('../../common/noNet');
import Service from '../../common/service';
import Order from '../order/order';
import NoInter from '../../common/noInter';
import NetInfo from '../../common/netInfo';
import Loading from '../../common/loading';
import LoadImg from '../../common/loadImg';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    Image,
    TouchableOpacity,
    Platform,
    ToastAndroid,
    BackAndroid
    } from'react-native';
var status='02';
var NativeModules  = require('react-native').NativeModules;
var RNBridgeModule=NativeModules.RNBridgeModule;
var OrderTwoView =React.createClass({
    getInitialState: function() {
        return {
            refresh:true,
            data:this.props.data,
            orderOneData:this.props.orderOneData,
            token:this.props.token,
            userId:this.props.userId,
            ShowOrderPop:false, //false隐藏支付方式 true显示支付方法
            noNet:false,    //false有网   true无网
            ShowLoading:false,
            btnDisable:false  //按钮是否可用  true 不可用，  false 可用
        };
    },

    componentDidMount: function() {
        //RNBridgeModule.shopDetailIn('零售提交订单(2/2)');
        status='02';
        BackAndroid.addEventListener('hardwareBackPress', this.onBackPressed);
    },

    //调用服务方法总入口
    FuncFetchData:function(param){
        var p =param.fetchMethod();//请求数据
        var p1=Util.FuncTimeOut();//判断是否超时
        var that=this;
        Promise.race([p, p1]).then(function (result) {
            var data=result.data;
            var _message=result.message;
            if(_message=='timeout'){
                that.setState({
                    loaded:true,
                    noNet:true,
                    ShowLoading:false
                });
            }else{
                if(_message='retailCreateOrder'){
                    var _payData={
                        orderId:data.obj.body.orderId,
                        orderSn:data.obj.body.orderSn,
                        goodsName:data.obj.body.goodsDetail,
                        price:data.obj.body.price,
                        titleName:data.obj.body.titleName
                    };
                    that.setState({
                        payData:_payData,
                        ShowLoading:false,
                        ShowOrderPop:true
                    });
                }
            }
        }, function(reason){
            if(reason=='noData'){
                that.setState({
                    loaded:true,
                    noData:true,
                    ShowLoading:false
                });
            }else if(reason=='noNet'){
                that.setState({
                    loaded:true,
                    noNet:true,
                    ShowLoading:false
                });
            }
        });
    },

    onBackPressed:function(){
        if(Platform.OS!='ios'){
            this.props.callback();
        }
        this.props.navigator.pop();
        return true;
    },
    componentWillUnmount(){
       // RNBridgeModule.shopDetailOut('零售提交订单(2/2)');
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackPressed);
    },

    render: function() {
       var _goodList=this._initGoodsViewList();
        return (
            <View style={{flex:1}}>
                <View><Image source={require('../../img/common/noInter.png')} resizeMode='contain' style={{width:0,height:0}} /></View>
                <Header style={styles.head} navigator={this.props.navigator} initObj={{
                    backName:'orderTwoView',
                    title:'提交订单(2/2)',
                    show:true,
                    callback:this.props.callback
                }}/>
                {
                this.state.noNet?
                    <NoInter callback={this._onPressRefresh.bind(this)} />
                :
                <ScrollView>
                    <View style={styles.orderList}>
                        <View style={styles.orderSum}>
                            <View style={styles.listOut}><Text style={styles.listTitle}>商品清单</Text></View>
                            {_goodList}
                            <View style={styles.listOut}><Text style={styles.listTitle}>收货信息</Text></View>
                            <View style={styles.shoAddress}>
                                <View style={{width:Util.size.width, height:124,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../img/retailDetail/addressLine.png')} style={{width:307,height:94} } />
                                    <View style={styles.showIn}>
                                        <View style={styles.naAdd}>
                                            <Image source={require('../../img/order/renT.png')} style={{width: 15, height: 16,marginRight:10,marginTop:3} } />
                                            <View style={styles.nameMAx}><Text style={styles.artailColor} numberOfLines={1} >{this.state.orderOneData.consignee}</Text></View>
                                            <Image source={require('../../img/orderDetail/newphone.png')} style={{width: 12, height: 19,marginRight:10,marginTop:3} } />
                                            <View style={styles.phoneMAx}><Text style={styles.artailColor} numberOfLines={1}>{this.state.orderOneData.tel}</Text></View>
                                        </View>
                                        <View style={styles.addR}>
                                            <Image source={require('../../img/order/ditu.png')} style={{width: 18, height: 18,marginRight:10} }  />
                                            <View style={styles.zheH}><Text allowFontScaling={false} numberOfLines={2} style={styles.artailColor} >{this.state.data.schoolAddr} {this.state.orderOneData.gradeValue}{this.state.orderOneData.classValue}</Text></View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.shoHuo}>
                                <View style={styles.yiHang}><Text style={styles.peiPay}>支付配送：</Text><Text style={styles.peiLine}>在线支付 集中配送至学校</Text></View>
                                <View style={styles.yiHang}><Text style={styles.peiPay}>商品数量：</Text><Text style={styles.sunGood}>共{this.state.data.goodsNumber}件</Text></View>
                                <View style={styles.yiHang}><Text style={styles.peiPay}>商品总额：</Text><Text style={styles.red}>{Util.FuncRmbFormat(this.state.data.price)}</Text></View>
                            </View>
                            {
                                status=='02'|| this.state.btnDisable==false?
                                    <TouchableOpacity  onPress={this._popOrder.bind(this)}>
                                        <View style={styles.nextBu}><Text style={styles.next}>确认提交</Text></View>
                                    </TouchableOpacity>
                                :
                                    <View style={styles.xiaNext}><Text style={styles.next}>确认提交</Text></View>
                            }
                        </View>
                    </View>
                </ScrollView>
                }
                {
                   this.state.ShowLoading?
                   <Loading />
                   :
                   null
               }
                {
                this.state.ShowOrderPop?
                <PopLayer ShowOrderPop={this.state.ShowOrderPop} callback={this._callback.bind(this)} data={
                {
                token:this.state.token,
                payData:this.state.payData
                }
                } />
                :
                null
                }
               <NetInfo callback={this._getNetInfoState.bind(this)} />
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
       // this.getMoreData();
    },
    _onRefresh: function () {
        this.setState({isRefreshing: true});
        setTimeout(() => {
           // this.fetchData();
        }, 1000);
    },

      //选择支付方式弹出框回调函数
        _callback() {
            this.setState({
                ShowOrderPop: false
            });
         this.props.navigator.push({
            title: '全部订单',
            component: Order,
            params:{
                initData:{
                    userId:this.state.userId,
                    token:this.state.token,
                    orderPayShippingStatus:''
                }
            }
        });
        },
     //提交订单跳转到弹出框
        _popOrder:function(){
            if(status=='02'){
                if(this.state.btnDisable==false){
                    var _param={
                        fetchMethod:this._retailCreateOrder,
                        fetchParamData:''
                    }
                    this.FuncFetchData(_param);
                }
                //this._retailCreateOrder();
                /*this.setState({
                    ShowOrderPop:true
                });*/
            }else{
            ToastAndroid.show('您选择的商品中有已下架的商品！', 2000);
            }
        },

    //零售提交订单接口
    _retailCreateOrder:function(){
        var that=this;
        this.setState({ShowLoading:true,btnDisable:true});
        return new Promise(function (resolve, reject) {
             var _type='03';//订单的来源  01-PC端  02-IOS端 03-android
              var _q='?token='+that.state.token+'&goodsId='+that.state.data.dto.goodsId+'&goodsAttr='+that.state.data.dto.goodsAttrId+'&selectSize='+that.state.data.dto.goodsAttrValue+'&GoodsNumber='+that.state.data.dto.goodsNumber+
                     '&gradeNo='+that.state.orderOneData.gradeId+'&classNo='+that.state.orderOneData.classId+'&consignee='+that.state.orderOneData.consignee+'&isCart='+that.state.data.isCart+'&recId='+that.state.data.dto.recId+
                     '&type='+_type+'&mobile='+that.state.orderOneData.tel;
              var _customSizeInput='&height='+that.state.data.dto.height+'&weight='+that.state.data.dto.weight+'&bust='+that.state.data.dto.bust+
              '&waist='+that.state.data.dto.waist+'&hip='+that.state.data.dto.hip+'&shoulderWidth='+that.state.data.dto.shoulderWidth+
              '&sleeveLength='+that.state.data.dto.sleeveLength+'&outsideLength='+that.state.data.dto.outsideLength;       //特体尺码八个输入参数
              var baseUrl=Service.retailCreateOrder+_q+_customSizeInput;
             Util.get(baseUrl,
             function(data){
                var _msgCode=data.msgCode;
                if(_msgCode==1){
                    reject('noData1');//不处理
                    that.setState({refresh:false,ShowLoading:false,btnDisable:false});
                    ToastAndroid.show(data.obj.message, 2000);
                }else if(_msgCode==99){
                    RNBridgeModule.toLogin('toLogin');
                }else if(_msgCode=='03'){
                     ToastAndroid.show(data.obj.message, 2000);
                     status="03";
                      reject('noData1');//不处理
                     that.setState({refresh:false,ShowLoading:false,btnDisable:true});
                 }else{
                    var _data={
                        data:data,
                        message:'retailCreateOrder'
                    }
                     resolve(_data);
                }
             },function(err){
                    that.setState({refresh:false,ShowLoading:false,btnDisable:false});
                    reject('noNet');
             });
        });


    },

    //初始化商品列表
    _initGoodsViewList:function(){
        var itemList=[];
        var _goodsList=this.state.data.sunGoodsDTO;//商品列表
        if(_goodsList!=null && _goodsList.length>0){
            for(var i=0;i<_goodsList.length;i++){
                var item=_goodsList[i];
                if(item.status!='02'){
                    status=item.status;
                }
                itemList[i]=(
                    <View style={styles.listDetail}>
                        {
                            item.status=='02'?
                                <View style={[styles.marginL,{width:90, marginLeft:20}]}>
                                    <LoadImg data={
                                        {
                                            width:90,
                                            height:90,
                                            uri:item.goodsImg+'!m166x166.jpg',
                                            dataSource:require('../../img/common/defaultReDetail.png')
                                        }
                                    } />
                                    <View style={{ position:'absolute',top:5,left:0,width:30,height:30,justifyContent:'flex-start',alignItems:'flex-start' }}>
                                    {
                                        item.goodsProperties==1?
                                            <Image source={require('../../img/common/boy.png')} style={{width:30, height:30} }/>
                                        :
                                            <Image source={require('../../img/common/girl.png')} style={{width:30, height:30} }/>
                                     }
                                     </View>
                                </View>
                            :
                                <View>
                                     <View style={[styles.marginL,{width:90, marginLeft:20}]}>
                                         <LoadImg data={
                                             {
                                                 width:90,
                                                 height:90,
                                                 uri:item.goodsImg+'!m166x166.jpg',
                                                 dataSource:require('../../img/common/defaultReDetail.png')
                                             }
                                         } />
                                         <View style={{ position:'absolute',top:5,left:0,width:30,height:30,justifyContent:'flex-start',alignItems:'flex-start' }}>
                                         {
                                             item.goodsProperties==1?
                                                 <Image source={require('../../img/common/boy.png')} style={{width:30, height:30} }/>
                                             :
                                                 <Image source={require('../../img/common/girl.png')} style={{width:30, height:30} }/>
                                          }
                                          </View>
                                     </View>
                                     <View style={{ position:'absolute',top:5,left:20,width:90,height:90,backgroundColor:'#000',opacity:0.7,justifyContent:'center',alignItems:'center' }}>
                                        <Text style={styles.writeColor}>已下架</Text>
                                     </View>
                                </View>
                        }

                        <View style={[styles.guiGe,styles.marginL]}>
                            <Text numberOfLines={1} style={styles.marginBet}>{item.goodsName}</Text>
                            <Text style={styles.marginBet}>尺码：{item.goodsAttrValue}</Text>
                            <Text style={styles.marginBet}>数量：X{item.goodsNumber}</Text>
                            <Text style={styles.marginBet}>价格：<Text style={styles.red}>{Util.FuncRmbFormat(item.shopPrice)}</Text></Text>
                        </View>
                    </View>
                );
            }
        };
        return itemList;
    },
    renderLoadingView: function() {
        return (
        <View>
            <Header style={styles.head} navigator={this.props.navigator} initObj={{
                                                                backName:'orderTwoView',
                                                                title:'提交订单(2/2)',
                                                                show:true,
                                                                callback:this.props.callback
                                                            }}/>
            <View style={styles.container}>
                <Image source={require('../../img/common/loading.gif')} style={{width: 25, height:25} }  />
            </View>
        </View>
        );
    }
});
var styles = StyleSheet.create({
    container:{
        width:Util.size.width,
        height:Util.size.width,
        justifyContent:'center',
        alignItems:'center'
    },
     red:{
         color:'#f00',
         fontSize:Util.fixedFont(12)
     },
     orderList:{
         backgroundColor:'#f7f7f7'
     },
     listOut:{
         width:Util.size.width,
         height:35,
         backgroundColor:'#fff',
         paddingLeft:15,
         marginTop:5,
         marginBottom:10,
         justifyContent:'center'
     },
     listTitle:{
         fontSize:Util.fixedFont(16),
         color:'#333'
     },
     listDetail:{
         flex:1,
         flexDirection:'row',
         width:Util.size.width,
         height:100
     },
     peiLine:{
        color:'#5e5a57',
        fontSize:Util.fixedFont(12)
     },
     sunGood:{
        color:'#5e5a57',
        fontSize:Util.fixedFont(12)
     },
     guiGe:{
         justifyContent: 'center',
         marginRight:20,
         width:Util.size.width-150
     },
     shoAddress:{
         width:Util.size.width,
         marginLeft:20,
         marginTop:15,
         marginBottom:15,
         justifyContent:'center',
         alignItems:'center',
         height:124
     },
     addR:{
         width:307,
         flexWrap:'wrap',
         alignItems:'center',
         flexDirection:'row',
                               justifyContent:'center',
                               height:40,
         flex:1,
         marginTop:2
     },
     showIn:{
         padding:10,
         width:307,
         position:'absolute',
         top:0,
         left:0
     },
     zheH:{
         flexWrap:'wrap',
         height:40,
         justifyContent:'center',
         fontSize:Util.fixedFont(12),
                               width:Util.size.width-50,
     },
     shoHuo:{
         width:Util.size.width,
         backgroundColor:'#fff',
         paddingBottom:10,
         paddingTop:10
     },
     niaJ:{
         height:50,
         borderBottomColor:'#b0b0b0',
         borderBottomWidth:0.5,
         justifyContent:'center'
     },
     nextBu:{
         width:Util.size.width-80,
         height:40,
         backgroundColor:'orange',
         borderRadius:4,
         marginTop:35,
         marginLeft:40,
         marginRight:40,
         marginBottom:30,
         alignItems:'center',
         paddingTop:10
     },
     xiaNext:{
         width:Util.size.width-80,
         height:40,
         backgroundColor:'#b0b0b0',
         borderRadius:4,
         marginTop:35,
         marginLeft:40,
         marginBottom:30,
         marginRight:40,
         justifyContent:'center'
     },
     next:{
         color:'#fff',
         textAlign:'center',
         justifyContent:'center',
         alignItems:'center',
         fontSize:Util.fixedFont(16)
     },
     naAdd:{
         flex:1,
         flexDirection:'row',
         alignItems:'center',
         height:25
     },
     yiHang:{
         flex:1,
         flexDirection:'row',
         width:Util.size.width-100,
         marginLeft:50,
         marginTop:3,
         marginRight:50
     },
    artailColor:{
        color:'#5e5a57',
        backgroundColor:'#fff',
        fontSize:Util.fixedFont(12)
    },
     peiPay:{
         fontSize:Util.fixedFont(12),
         color:'#333'
     },
     marginL:{
         marginLeft:20,
         justifyContent:'center',
         alignItems:'flex-start',
         width:Util.size.width-150
     },
     nameMAx:{
         width:Util.size.width-215,
        backgroundColor:'#fff'
     },
     phoneMAx:{
         width:90,
        backgroundColor:'#fff'
     },
     marginBet:{
        marginBottom:2,
        marginTop:2,
        color:'#5e5a57',
        fontSize:Util.fixedFont(12)
     }

});
module.exports=OrderTwoView;


