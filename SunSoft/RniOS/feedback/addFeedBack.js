/**
 * Created by qiaozm on 2016/6/29.
 * 零售提交订单第一步组件
 */
import React,{Component} from 'react';
var Header=require('../../common/header');
var Util=require('../../common/Util');
import Service from '../../common/service';
import feedbackTwo from './feedbackTwo';
import NoInter from '../../common/noInter';
import NetInfo from '../../common/netInfo';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    ToastAndroid
    } from'react-native';
var { NativeModules } = require('react-native');
var RNBridgeModule=NativeModules.RNBridgeModule;
var AddFeedBack =React.createClass({
    getInitialState: function() {
        return {
            content:'',
            token:this.props.initData.token,
            orderId:this.props.initData.orderId,
            ksStarCount:0,
            jgStarCount:0,
            csStarCount:0,
            tyStarCount:0,
            isDisable:true   //true表示按钮可用 false表示按钮不可点击
        };
    },
    componentDidMount: function() {
        //var id=this.props.id;
        this.setState({
            loaded:true,
            noNet:false    //false有网   true无网
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
                if(_message=='addCommentInfo'){
                    RNBridgeModule.goPicChart(data.obj.body);
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
    render: function() {
        return (
            <View style={{height: Util.size.height}}>
                <View><Image source={require('../../img/common/noInter.png')} resizeMode='contain' style={{width:0,height:0}} /></View>
                <Header style={styles.head} navigator={this.props.navigator} initObj={{
                    backName:'addFeedback',
                    title:'添加反馈',
                    show:true
                }}/>
                {
                this.state.noNet?
                    <NoInter callback={this._onPressRefresh.bind(this)} />
                :
                <ScrollView>
                    <View style={styles.addFeedback}>
                        <View style={styles.backTop}>
                            <View style={styles.backTopIn}>
                                <View style={styles.backTopT}>
                                    <Image source={require('../../img/feedback/line.png')} resizeMode='contain' style={[styles.imgLeftT,{width:Util.size.width/2-95}]} />
                                    <Text allowFontScaling={false} style={styles.imgTitleT}>对此次订购进行评价</Text>
                                    <Image source={require('../../img/feedback/line.png')} resizeMode='contain' style={[styles.imgRightT,{width:Util.size.width/2-95}]} />
                                </View>
                                <View style={styles.pingZ}>
                                    <View style={styles.pingJ}>
                                        <View style={[styles.uniforms,styles.rightMargin]}><Text allowFontScaling={false} style={styles.fontStyleB}>校服款式</Text></View>
                                        {this._initStarView('ks',this.state.ksStarCount)}
                                    </View>
                                    <View style={styles.pingJ}>
                                        <View style={[styles.uniforms,styles.rightMargin]}><Text allowFontScaling={false} style={styles.fontStyleB}>校服价格</Text></View>
                                        {this._initStarView('jg',this.state.jgStarCount)}
                                    </View>
                                    <View style={styles.pingJ}>
                                        <View style={[styles.uniforms,styles.rightMargin]}><Text allowFontScaling={false} style={styles.fontStyleB}>生产厂商</Text></View>
                                        {this._initStarView('cs',this.state.csStarCount)}
                                    </View>
                                    <View style={styles.pingJ}>
                                        <View style={[styles.uniforms,styles.rightMargin]}><Text allowFontScaling={false} style={styles.fontStyleB}>购买体验</Text></View>
                                        {this._initStarView('ty',this.state.tyStarCount)}
                                    </View>
                                </View>
                                <View style={styles.backBottomB}>
                                    <Image source={require('../../img/feedback/line.png')} resizeMode='contain' style={[styles.imgLeftB,{width:Util.size.width/2-80}]} />
                                    <Text allowFontScaling={false} style={styles.imgTitleT}>反馈留言</Text>
                                    <Image source={require('../../img/feedback/line.png')} resizeMode='contain' style={[styles.imgRightB,{width:Util.size.width/2-80}]} />
                                </View>
                                <View style={styles.backCenter}>
                <TextInput autoCapitalize="none" onChangeText={this.msgChangeFunc.bind(this)} autoCorrect={false} multiline={true} style={styles.backCon} placeholderTextColor="#b0b0b0" returnKeyType="done" placeholder="请给我们一些建议与留言，200字以内"></TextInput>
                                </View>
                            </View>
                        </View>
                <TouchableOpacity onPress={this.FuncFetchData.bind(this,{
                                                                   fetchMethod:this._pressConfirmEvnet,
                                                                   fetchParamData:''
                                                                   })}>
                            <View style={styles.sureBtn}><Text allowFontScaling={false} style={styles.surebtn}>确定</Text></View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                 }
                 <NetInfo callback={this._getNetInfoState.bind(this)} />
            </View>
        );
    },

    //反馈留言输入改变事件
        msgChangeFunc:function(val){
            this.setState({content:val});
        },

    _pressConfirmEvnet:function(){
        var that=this;
        return new Promise(function (resolve, reject) {
             if(that.state.isDisable){
                if(that.state.ksStarCount!=0 && that.state.jgStarCount!=0 && that.state.csStarCount!=0 && that.state.tyStarCount!=0){
                    that.setState({isDisable:false});  //按钮设置为不可点击，避免重复提交
                     var _optionType='01,02,03,04';
                     var _optionName='0'+(5-that.state.ksStarCount)+',0'+(5-that.state.jgStarCount)+',0'+(5-that.state.csStarCount)+',0'+(5-that.state.tyStarCount);
                     var _commentType=1;
                     var _q='?token='+that.state.token+'&idValue='+that.state.orderId+'&optionType='+_optionType+'&optionName='+_optionName+'&commentType='+_commentType+'&content='+that.state.content;
                      var baseUrl=Service.addCommentInfo+_q;
                      Util.get(baseUrl,
                      function(data){
                         var _msgCode=data.msgCode;
                         if(_msgCode==1){
                             reject('noData');
                               that.setState({isDisable:true});
                         }else if(_msgCode==99){
                             RNBridgeModule.toLogin('toLogin');
                         }else{
                             RNBridgeModule.toast(data.obj.title);
                             var _data={
                                 data:data,
                                 message:'addCommentInfo'
                             }
                              resolve(_data);
                         }
                      },function(err){
                          reject('noNet');
                               that.setState({isDisable:true});
                      });
                 }else{
                     reject('noNet1');
                     RNBridgeModule.toast('请完成反馈评价后提交。', 2000);
                 }
             }
        });
    },

    _initStarView:function(optionType,starCount){
        var obj=['','失望','不满','一般','满意','惊喜'];
        var weistarCount=5-starCount;
        var itemList=[];
        var j=0;
        for(var i=0;i<starCount;i++){
            itemList[i]=(
                <TouchableOpacity onPress={this._pressStarEvnet.bind(this,optionType,j+1)}>
                    <Image source={require('../../img/feedback/xuanstar.png')} resizeMode='contain' style={[styles.imgStar,{width:20}]} />
                </TouchableOpacity>
            );
            j=j+1;
        }
        for(var i=0;i<weistarCount;i++){
            itemList[j]=(
                <TouchableOpacity onPress={this._pressStarEvnet.bind(this,optionType,j+1)}>
                    <Image source={require('../../img/feedback/weistar.png')} resizeMode='contain' style={[styles.imgStar,{width:20}]} />
                </TouchableOpacity>
            );
            j=j+1;
        }
        itemList[j]=(<View style={[styles.uniforms,styles.weiZ]}><Text allowFontScaling={false} style={styles.fontStyleS}>{obj[starCount]}</Text></View>);
        return itemList;
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

        //点击星星变换星星样式
        _pressStarEvnet:function(optionType,starCount){
            if(optionType=='ks'){
                this.setState({ksStarCount:starCount});
            }else if(optionType=='jg'){
                this.setState({jgStarCount:starCount});
            }else if(optionType=='cs'){
                 this.setState({csStarCount:starCount});
            }else if(optionType=='ty'){
                this.setState({tyStarCount:starCount});
            }
        },
     renderLoadingView: function() {
        return (
                <View>
                <Header style={styles.head} navigator={this.props.navigator} initObj={{
                backName:'addFeedback',
                title:'添加反馈',
                show:true
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
                               height:Util.size.height,
                               width:Util.size.width,
                               justifyContent:'center',
                               alignItems:'center'
                               },
                               contain:{
        height:Util.size.height,
        width:Util.size.width,
        justifyContent:'center',
        alignItems:'center'
    },
    addFeedback:{
        width:Util.size.width,
        backgroundColor:'#f7f7f7',
        padding:15
    },
    backTop:{
        width:Util.size.width-30,
        backgroundColor:'#fff',
        borderRadius:10,
        padding:20,
        marginBottom:15
    },
    backTopIn:{
        width:Util.size.width-70
    },
    backTopT:{
        flex:1,
        flexDirection:'row'
    },
    imgLeftT:{
        width:Util.size.width/2-100,
        marginTop:5
    },
    imgRightT:{
        width:Util.size.width/2-100,
        transform:[{rotate:'180deg'}],
        marginTop:5
    },
    imgTitleT:{
        fontSize:13,
        height:20,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:5,
        marginRight:5,
        color:'#929292'
    },
    pingJ:{
        flex:1,
        flexDirection:'row',
        paddingLeft:10
    },
    backBottomB:{
        flex:1,
        flexDirection:'row',
        marginBottom:20
    },
    imgLeftB:{
        width:Util.size.width/2-60,
        marginTop:5
    },
    imgRightB:{
        width:Util.size.width/2-60,
        transform:[{rotate:'180deg'}],
        marginTop:5
    },
    uniforms:{
        height:35,
        justifyContent:'center',
        alignItems:'center',
        marginRight:5
    },
    imgStar:{
        marginLeft:5
    },
    weiZ:{
        marginLeft:20
    },
    rightMargin:{
        marginRight:15
    },
    pingZ:{
        marginTop:15,
        paddingBottom:15
    },
    fontStyleS:{
        fontSize:14,
        color:'#5e5a57'
    },
    fontStyleB:{
        fontSize:15,
        color:'#5e5a57',
        height:35,
                               lineHeight:24
    },
    backCon:{
        width:Util.size.width-100,
        marginLeft:10,
        marginRight:10,
        height:70,
        borderColor:'#b0b0b0',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'flex-start',
        fontSize:13,
        padding:10,
        color:'#929292',
        borderRadius:10

    },
    sureBtn:{
        width:Util.size.width-130,
        marginLeft:50,
        marginRight:50,
        height:40,
        backgroundColor:'orange',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    surebtn:{
        color:'#fff'
    }

});
module.exports= AddFeedBack;


