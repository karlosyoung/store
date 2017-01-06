/**
 * Created by qiaozm on 2016/6/29.
 * 头部导航回退按钮组件
 */


import React,{Component} from 'react';
var Util=require('./Util');
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform
} from'react-native';
var NativeModules  = require('react-native').NativeModules;
var RNBridgeModule=NativeModules.RNBridgeModule;
var RightIcon=React.createClass({
getInitialState: function () {
        return{
            data:this.props.data
        };
    },
    render:function(){
        var _num=this.props.data;
        if(_num>99){
            _num='99+';
        }
        return (
            <View>
                <TouchableOpacity onPress={this._onPressFunc.bind(this)}>
                    <View style={styles.addCar}>
                        <Image source={require('../img/retailDetail/addcarNum.png')} resizeMode='contain' style={[styles.imgGood,{width:36,height:36}]} />
                        <View style={[styles.center,{position:'absolute',top:0,right:1}]}>
                <View>
                {
                Platform.OS=='ios'?
                <Text allowFontScaling={false} style={styles.buyNum}>{_num}</Text>
                :
                <Text style={styles.buyNums}>{_num}</Text>
                }
                </View>
                
                            </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    },
    //点击方法
    _onPressFunc:function(){
        RNBridgeModule.isTabHidden('true');//显示tab
        RNBridgeModule.goToCart('toCart');
    }
});

var styles=StyleSheet.create({
    addCar:{
        width:36,
        height:36,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        marginRight:20
    },
    buyNum:{
        fontSize:7,
        color:'#fff',
        width:15,
        textAlign:'center'
    },
    buyNums:{
        fontSize:Util.fixedFont(7),
        color:'#fff',
        width:15,
        textAlign:'center'
    },
    center:{
        width:15,
        height:15,
        marginLeft:3,
        marginTop:3,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f65e5d',
        borderRadius:18
    }
});
module.exports=RightIcon;