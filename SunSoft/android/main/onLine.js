/**
 * Created by qiaozm on 2016/6/29.
 * 零售提交订单第一步组件
 */
import React,{Component} from 'react';
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
var NativeModules  = require('react-native').NativeModules;
var RNBridgeModule=NativeModules.RNBridgeModule;
var onLine =React.createClass({
    render: function() {
        if (this.state==null || !this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <View style={{flex:1}}>
                <View><Image source={require('../../img/common/noInter.png')} resizeMode='contain' style={{width:0,height:0}} /></View>
                <Header style={styles.head} navigator={this.props.navigator} initObj={{
                    backName:'onLine',
                    title:'在线客服',
                    show:true,
                }}/>
                <ScrollView>
                    <Text>在线客服</Text>
                </ScrollView>
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
    _toOrderTwo:function(){
        this.setState({toOrderTwo:true});
    },
    renderLoadingView: function() {
        return (
        <View>
         <Header style={styles.head} navigator={this.props.navigator} initObj={{
                            backName:'onLine',
                            title:'在线客服',
                            show:true,
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
});
module.exports=onLine;


