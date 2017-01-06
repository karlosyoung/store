/**
 * Created by qiaozm on 2016/6/29.
 * 头部导航主体部分组件
 */
var Util=require('./Util');
var Icon=require('./left_icon');
import React,{Component} from 'react';
var RightIcon =require('./right_icon');
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    ScrollView,
    TouchableOpacity,
    Platform
} from'react-native';
var NativeModules  = require('react-native').NativeModules;
var RNBridgeModule=NativeModules.RNBridgeModule;
var Header=React.createClass({
    getInitialState: function () {
        return{
            backName:this.props.initObj.backName,
            data:this.props.initObj.data
        };
    },
    render:function(){
       var obj=this.props.initObj;
        return(
            <View>
                {
                    obj.show?
                        <View style={[styles.header,styles.row,styles.center]}>
                            <TouchableOpacity style={[styles.row,styles.center]} onPress={this._pop}>
                                <Icon/>
                            </TouchableOpacity>
                            {
                            obj.backName=='order'?
                                <TouchableOpacity onPress={this._callbackFunc.bind(this)}>
                                    <View style={[styles.title,styles.center,styles.qunM]}>
                                        <View>
                                            {
                                                Platform.OS=='ios'?
                                                    <Text allowFontScaling={false} style={[styles.center,styles.marLeft,{color:'#fff',fontSize:16,height:38,lineHeight:25}]} numberOfLines={1}>{obj.title}</Text>
                                                :
                                                <Text style={[styles.center,styles.marLeft,{color:'#fff',fontSize:Util.fixedFont(18)}]} numberOfLines={1}>{obj.title}</Text>
                                            }
                                        </View>
                                        {
                                            obj.backName=='order'?
                                                 obj.orderSelectList?
                                                <Image source={require('../img/order/shanglalist.png')} style={styles.xiaList} />
                                                 :
                                                <Image source={require('../img/order/xialalist.png')} style={styles.shaList} />
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            :
                                <View style={[styles.title,styles.center,styles.qunMs]}>
                                    {
                                        obj.backName=='retailDetail' || obj.backName=='orderRetailDetail' || obj.backName=='cartRetailDetail'?
                                            <View>
                                            {
                                                Platform.OS=='ios'?
                                                    <Text allowFontScaling={false} style={[styles.center,{color:'#fff',fontSize:16,height:28,lineHeight:20,width:Util.size.width-102,textAlign:'center'}]} numberOfLines={1}>{obj.title}</Text>
                                                :
                                                    <Text style={[styles.center,{color:'#fff',fontSize:Util.fixedFont(18),width:Util.size.width-102,textAlign:'center'}]} numberOfLines={1}>{obj.title}</Text>
                                            }
                                            </View>
                                        :
                                            <View>
                                            {
                                                Platform.OS=='ios'?
                                                    <Text allowFontScaling={false} style={[styles.center,styles.marLeft,{color:'#fff',fontSize:16,height:28,lineHeight:20,width:Util.size.width-102,textAlign:'center'}]} numberOfLines={1}>{obj.title}</Text>
                                                :
                                                    <Text style={[styles.center,styles.marLeft,{color:'#fff',fontSize:Util.fixedFont(18)}]} numberOfLines={1}>{obj.title}</Text>
                                            }
                                            </View>
                                    }
                                </View>
                    	    }
                            {
                                obj.backName=='retailDetail' || obj.backName=='orderRetailDetail' || obj.backName=='cartRetailDetail'?
                                  <RightIcon data={obj.data}/>
                                :
                                null
                            }
                        </View>
                        :
                         <View>
                            {
                                Platform.OS=='ios'?
                                <View style={[styles.row,styles.center,{height:44,backgroundColor:'#4cb050'}]}>
                                    <View style={[styles.title,styles.center]}>
                                        <Text allowFontScaling={false} style={[styles.center,{color:'#fff',fontSize:16,height:38,lineHeight:25 }]} numberOfLines={1}>{obj.title}</Text>
                                    </View>
                                </View>
                                :
                                <View style={[styles.row,styles.center,{height:50,backgroundColor:'#4cb050'}]}>
                                    <View style={[styles.title,styles.center]}>
                                        <Text style={[styles.center,{color:'#fff',fontSize:Util.fixedFont(18)}]} numberOfLines={1}>{obj.title}</Text>
                                    </View>
                                </View>
                            }
                         </View>

                }
            </View>
        )
    },

    _callbackFunc:function(){
    this.props.callback();},

    _pop:function(){
        var _backName=this.state.backName;
        if(_backName=='orderDetail'){
            this.props.initObj.callback();
        }else if(_backName=='order' || _backName=='orderFeedback' ||  _backName=='addFeedback'){
            if(Platform.OS=='ios'){
                RNBridgeModule.isTabHidden('true');//显示tab
            }
            RNBridgeModule.buttonBack(_backName); //调用原生返回按钮
        }else if(_backName=='retailDetail' || _backName=='orderRetailDetail' || _backName=='cartRetailDetail'){
            if(Platform.OS=='ios'){
                RNBridgeModule.isTabHidden('true');//显示tab
            }
             if(this.props.initObj.type=='02'){
                RNBridgeModule.buttonBack(_backName); //调用原生返回按钮
             }
        }else if(_backName=='orderOneView'){
           if(this.props.initObj.type=='02'){
               RNBridgeModule.buttonBack(_backName); //调用原生返回按钮
            }
        }else if(_backName=='orderTwoView'){
            if(Platform.OS!='ios'){
                this.props.initObj.callback();
            }
        }else if(_backName=='feedbackTwo'){
            if(this.props.initObj.type=='02'){
                RNBridgeModule.buttonBack(_backName); //调用原生返回按钮
             }
         }else if(_backName=='bodyMeasure'){
            this.props.initObj.callback();
         }
        this.props.navigator.pop();
    }
});
var styles=StyleSheet.create({
    xiaList:{
        width:13,
        height:8,
	    marginLeft:7,
	    marginTop:0
    },
    shaList:{
        width:13,
        height:8,
        marginLeft:7,
        marginTop:0
    },
    row:{
        flexDirection:'row'
    },
    marLeft:{
        marginLeft:-46
    },
    header:{
        height:44,
        backgroundColor:'#4cb050',
        width:Util.size.width
    },
    fontFFF:{
        color:'#fff',
        fontSize:16
    },
    title:{
        flex:1,
        flexDirection:'row'
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    qunM:{
        width:Util.size.width-46,
        height:30,
        justifyContent:'center'
    },
    qunMs:{
         width:Util.size.width-102,
         height:30,
         justifyContent:'center',
         alignItems:'center'
     }
});
module.exports=Header;