/**
 * Created by qiaozm on 2016/6/29.
 * 零售提交订单第一步组件
 */
import React,{Component} from 'react';
import Picker from 'react-native-picker';
import OrderTwoView from './orderTwoView';
var Header=require('../../common/header');
var Util=require('../../common/Util');
import NoInter from '../../common/noInter';
import NetInfo from '../../common/netInfo';
import LoadImg from '../../common/loadImg';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    TouchableHighlight,
    CalendarManager,
    pxielRatio,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
    ToastAndroid,
    BackAndroid
    } from'react-native';
var status='02';//下架状态
var NativeModules  = require('react-native').NativeModules;
var RNBridgeModule=NativeModules.RNBridgeModule;
var orderOneView =React.createClass({
    getInitialState: function() {
    var _data=this.props.initData.orderData;
    if(this.props.initData.type=='02'){  //android this.props.initData.orderData为字符串，需要转为json对象
        _data=eval('(' + this.props.initData.orderData + ')');
    }
    return {
        data:_data,
        token:this.props.initData.token,
        userId:this.props.initData.userId,
        type:this.props.initData.type,   //跳转01 RN 02原生
        isShowPicker:false,//是否显示班级年级picker
        classOrGrade:'class',//显示班级还是年级 class班级 grade年级
        gradeValue:'请选择年级',
        classValue:'请选择班级',
        gradeId:'',
        classId:'',
        gradeIndex:0,  //选中的下标
        classIndex:0,//选中的下标
        toOrderTwo:true,  //下一步按钮是否显示
        noNet:false    //false有网   true无网
    }
    },

    componentDidMount: function() {
       // RNBridgeModule.shopDetailIn('零售提交订单(1/2)');
        BackAndroid.addEventListener('hardwareBackPress', this.onBackPressed);
    },
    onBackPressed:function(){
        if(this.state.type=='02'){
            return false;
        }else{
           this.props.navigator.pop();
           return true;
        }
    },
    componentWillUnmount(){
       // RNBridgeModule.shopDetailOut('零售提交订单(1/2)');
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackPressed);
    },
    render: function() {
    var _goodList=this._initGoodsViewList();
        return (
            <View style={{flex:1}}>
                <View><Image source={require('../../img/common/noInter.png')} resizeMode='contain' style={{width:0,height:0}} /></View>
                <Header style={styles.head} navigator={this.props.navigator} initObj={{
                    backName:'orderOneView',
                    title:'提交订单(1/2)',
                    show:true,
                    type:this.state.type
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
                                     <Image source={require('../../img/retailDetail/xiaobo.png')} style={{width:Util.size.width-40}} resizeMode='contain' />
                                        <View style={styles.addressSure}>
                                            <Text numberOfLines={2} style={styles.address}>{this.state.data!=null?this.state.data.schoolAddr:''}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.shoHuo}>
                                        <TouchableOpacity onPress={this._onPickerPress.bind(this,'grade')}>
                                            <View style={styles.niaJ}>
                                                <View style={styles.leftText}><Text style={styles.nia}>年级</Text></View>
                                                <View style={styles.textInpT}><Text style={styles.grayColor}>{this.state.gradeValue==null?'请选择年级':this.state.gradeValue}</Text></View>
                                                <Image source={require('../../img/order/xiala.png')} style={styles.rightList} resizeMode='contain' />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this._onPickerPress.bind(this,'class')}>
                                            <View style={styles.niaJ}>
                                                <View style={styles.leftText}><Text style={styles.nia}>班级</Text></View>
                                                <View style={styles.textInpT}><Text style={styles.grayColor}>{this.state.classValue==null?'请选择班级':this.state.classValue}</Text></View>
                                                <Image source={require('../../img/order/xiala.png')} style={styles.rightList} resizeMode='contain' />
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.niaJ}>
                                            <View style={styles.leftText}><Text style={styles.nia}>收货人</Text></View>
                                            <View style={styles.textInp}><TextInput style={[styles.textInpIn,{fontSize:Util.fixedFont(14)}]} onChangeText={this._getTextInputValue.bind(this,'consignee')} placeholderTextColor="#b0b0b0" placeholder="请输入收货学生姓名" underlineColorAndroid="transparent" ></TextInput></View>
                                        </View>
                                        <View style={styles.niaJ}>
                                            <View style={styles.leftText}><Text style={styles.nia}>手机号</Text></View>
                                            <View style={styles.textInp}><TextInput style={[styles.textInpIn,{fontSize:Util.fixedFont(14)}]} onChangeText={this._getTextInputValue.bind(this,'tel')}placeholderTextColor="#b0b0b0"  keyboardType="numeric" underlineColorAndroid="transparent" placeholder="请输入联系人手机号" ></TextInput></View>
                                        </View>
                                    </View>
                                    {
                                        this.state.toOrderTwo==true?
                                            status=='02'?
                                             <TouchableOpacity onPress={this._orderOneNextBtn.bind(this)}>
                                                <View style={styles.nextBu}><Text style={styles.next}>下一步</Text></View>
                                            </TouchableOpacity>
                                            :
                                          <View style={styles.xiaNext}><Text style={styles.next}>下一步</Text></View>
                                        :
                                            null
                                    }
                                </View>
                            </View>
                    </ScrollView>
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
       // this.fetchData();
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
    //textInput输入变化调用
        _getTextInputValue: function (param,val) {
           if(param=='tel'){
                this.setState({
                   tel:Util.FuncStrFormateSpace3(val)
                });
           }else if(param=='consignee'){
                this.setState({
                   consignee:Util.FuncStrFormateSpace2(val)
                });
           }
        },

    //picker回调函数
    _callbackPicker:function(param){
        if(param.value==''){
            this.setState({isShowPicker:false});
        }else{
            if(param.classOrGrade=='class'){
                this.setState({
                    classValue:param.value,
                    classId:param.id,
                    isShowPicker:false,
                    classIndex:param.index
                });
            }else{
                this.setState({
                    gradeValue:param.value,
                    gradeId:param.id,
                    isShowPicker:false,
                    gradeIndex:param.index
                });
            }
        }
    },


    //form 输入框验证
    _formValidata:function(){
        var _message='';
        if(this.state.gradeValue==null || this.state.gradeValue=='' || this.state.gradeValue=='请选择年级'){
            return '请选择年级';
        }else if(this.state.classValue==null || this.state.classValue=='' || this.state.classValue=='请选择班级'){
           return  '请选择班级';
        };
        _message= this._valiConsignee();  //验证收货人合法性
        if(_message!=''){
           return _message;
        };
        _message=this._valiMobile();   //验证手机号合法性
        if(_message!=''){
            return _message;
        };
        return _message;
    },

    //验证手机号合法性
    _valiMobile:function(){
        var _mobile=this.state.tel;
        if(_mobile==null || _mobile==''){
           return "请输入有效手机号码";
        }else{
            var re=/^1[34578][0-9]\d{8}$/;
            if(!re.test(_mobile)){
                return "请输入有效手机号码";
            };
            var _txtlength=Util.FuncGetTextLength(_mobile);
            if(_txtlength!=11){
                return "请输入有效手机号码";
            }
        };
        return '';
    },

    //收货人验证
     /*   _valiConsignee:function(){
            var _consignee=Util.FuncStrFormateSpace2(this.state.consignee);
            if(_consignee==null || _consignee==''){
                return "请输入收货学生姓名";
            }
            return '';
        },*/

     //收货人验证
     _valiConsignee:function(){
       var _consignee=this.state.consignee;
        if(_consignee==null || _consignee==''){
            return "请输入收货学生姓名。";
        }else{
            var _tempConsignee=_consignee.replace(/\s+/g,'');
            var reg=/^[\u2E80-\u9FFF]+$/;
            if(!reg.test(_tempConsignee)){
                return "最多输入10个汉字或20位英文字符。";
           }
            var _txtlength=Util.FuncGetTextLength(_consignee);
            if(_txtlength<1 || _txtlength>20){
                return "最多输入10个汉字或20位英文字符。";
            }
        };
        return '';
     },

//初始化商品列表
    _initGoodsViewList:function(){
            var itemList=[];
            if(this.state.data!=null){
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
                                    <Text numberOfLines={1} style={styles.comHeight}>{item.goodsName}</Text>
                                    <Text style={styles.comHeight}>尺码：{item.goodsAttrValue}</Text>
                                    <Text style={styles.comHeight}>数量：X{item.goodsNumber}</Text>
                                    <Text style={styles.comHeight}>价格：<Text style={styles.red}>{Util.FuncRmbFormat(item.shopPrice)}</Text></Text>
                                </View>
                            </View>
                        );
                    }
                };
            }
            return itemList;
        },

    //点击班级年级显示班级年级picker
    _onPickerPress:function(param){
         var _dataValue=new Array();
        var _dataKey=new Array();
        var _data=this.state.data.schoolClass;
        var _classOrGrade=this.state.classOrGrade;
        var _Index=this.state.classIndex;
        if(param=='grade'){
            _data=this.state.data.schoolGrade;
            _Index=this.state.gradeIndex;
        }
        for(var i=0;i<_data.length;i++){
            var _item=_data[i];
            _dataKey.push(_item.key);
            _dataValue.push(_item.value);
        };
        Picker.init({
            pickerData: _dataValue,
            selectedValue: [_dataValue[_Index]],
            onPickerConfirm: pickedValue => {
                if(param=='grade'){
                    this.setState({
                        gradeValue:pickedValue,
                        gradeId:_dataKey[_dataValue.indexOf(''+pickedValue)],
                        gradeIndex:_dataValue.indexOf(''+pickedValue)
                    });
                }else{
                    this.setState({
                        classValue:pickedValue,
                        classId:_dataKey[_dataValue.indexOf(''+pickedValue)],
                        classIndex:_dataValue.indexOf(''+pickedValue)
                    });
                }
            },
            onPickerCancel: pickedValue => {
                //alert(pickedValue);
                //console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                //alert(pickedValue);
                //console.log('area', pickedValue);
            }
        });
        Picker.show();
    },

    //提交订单跳转到第二步
    _orderOneNextBtn:function(){
        if(status=='02'){
            var _message=this._formValidata();//验证form输入合法性
            if(_message==''){
                this.setState({toOrderTwo:false});
                this.props.navigator.push({
                    title: '提交订单第二步',
                    component: OrderTwoView,
                    params:{
                        data:this.state.data,
                        orderOneData:{
                            gradeValue:this.state.gradeValue,
                            gradeId:this.state.gradeId,
                            classId:this.state.classId,
                            classValue:this.state.classValue,
                            consignee:this.state.consignee,
                            tel:this.state.tel
                        },
                        token:this.state.token,
                        userId:this.state.userId,
                        callback:this._toOrderTwo
                    }
                });
            }else{
                if(Platform.OS=='ios'){
                    RNBridgeModule.toast(_message);
                    //alert(_message);
                }else{
                    ToastAndroid.show(_message, 2000);
                }
            }
        }else{
            alert('商品已下架');
        }

    },
    _toOrderTwo:function(){
        this.setState({toOrderTwo:true});
    },
    renderLoadingView: function() {
        return (

        <View>
         <Header style={styles.head} navigator={this.props.navigator} initObj={{
                            backName:'orderOneView',
                            title:'提交订单(1/2)',
                            show:true,
                            type:this.state.type
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
        color:'#f64b3e'
    },
    orderSum:{
        width:Util.size.width
    },
    orderList:{
        backgroundColor:'#f7f7f7',
        paddingBottom:10
    },
    grayColor:{
        color:'#5e5a57',
        fontSize:Util.fixedFont(16)
    },
    writeColor:{
        color:'#fff'
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
    guiGe:{
        justifyContent: 'center',
        marginRight:20,
        width:Util.size.width-150
    },
    shoAddress:{
        width:Util.size.width-40,
        backgroundColor:'#fff',
        marginLeft:20,
        marginRight:20,
        marginBottom:15,
        height:36,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center'
    },
    address:{
        fontSize:Util.fixedFont(16),
        color:'#5e5a57'
    },
    addressSure:{
        position:'absolute',
        top:0,
        left:0,
        width:Util.size.width-40,
        height:36,
        justifyContent:'center',
        alignItems:'center'
    },
    shoHuo:{
        width:Util.size.width,
        backgroundColor:'#fff',
        paddingLeft:25,
        paddingRight:25,
        paddingBottom:20
    },
    niaJ:{
        height:48,
        borderBottomColor:'#e0e0e0',
        borderBottomWidth:0.5,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        width:Util.size.width-50,
        justifyContent:'center'
    },
    leftText:{
        width:50,
        alignItems:'flex-start',
        height:48,
        justifyContent:'center',
        textAlign:'left'
    },
    nia:{
        color:'#5e5a57',
        fontSize:Util.fixedFont(16),
        textAlign:'left'
    },
     leftCen:{
         height:60,
         width:60,
         alignItems:'center',
         justifyContent:'center'
     },
    nextBu:{
        width:Util.size.width-60,
        height:40,
        backgroundColor:'orange',
        borderRadius:4,
        marginTop:15,
        marginLeft:30,
        marginRight:30,
        marginBottom:15,
        justifyContent:'center'
    },
    xiaNext:{
        width:Util.size.width-60,
        height:40,
        backgroundColor:'#b0b0b0',
        borderRadius:4,
        marginTop:50,
        marginLeft:30,
        marginRight:30,
        marginBottom:15,
        justifyContent:'center'
    },
    next:{
        color:'#fff',
        textAlign:'center',
        justifyContent:'center',
        fontSize:Util.fixedFont(16)
    },
    textInp:{
        width:Util.size.width-100,
        justifyContent:'center',
        height:48,
        color:'#5e5a57',
        paddingLeft:10,
        alignItems:'flex-start'
    },
    textInpIn:{
        width:Util.size.width-100,
        justifyContent:'center',
        height:48,
        color:'#5e5a57',
        alignItems:'flex-start'
    },
    textInpT:{
        width:Util.size.width-100,
        justifyContent:'center',
        height:48,
        color:'#5e5a57',
        paddingLeft:15,
fontSize:Util.fixedFont(16)
    },
    rightList:{
        position:'absolute',
        right:15,
        top:0,
        width:17,
        justifyContent:'center',
        height:48,
        alignItems:'center'
    },
    marginL:{
        height:100,
        marginLeft:20,
        justifyContent:'center'
    },
    comHeight:{
        marginTop:2,
        marginBottom:2,
        color:'#5e5a57',
        fontSize:Util.fixedFont(12)
    }
});
module.exports=orderOneView;


