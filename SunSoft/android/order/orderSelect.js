/**
 * Created by qiaozm on 2016/6/29.
 * 零售提交订单第一步组件
 */
import React,{Component} from 'react';
var Header=require('../../common/header');
var Util=require('../../common/Util');
import Service from '../../common/service';
import OrderDetail from './orderDetail';
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
    Platform,
    TouchableOpacity
    } from'react-native';
var OrderSelect =React.createClass({
    getInitialState: function() {
        return null;
    },
    componentDidMount: function() {
    },
    render: function() {
        var _orderSelect=this.props.data.orderSelect;
        return (
            <View style={styles.black}>
                <TouchableOpacity onPress={this._closeBtn.bind(this,_orderSelect)}>
                <View style={styles.blackPop}></View>
               </TouchableOpacity>
                    <View style={{width:Util.size.width,height:55,paddingTop:10, paddingBottom:10,flex:1,flexDirection:'row', paddingLeft:14,paddingRight:14, backgroundColor:'#fff',position:'absolute',top:0,left:0}}>
                        {
                             _orderSelect=='allOrder'?
                                <TouchableOpacity onPress={this._closeBtn.bind(this,'allOrder')}>
                                    <View style={styles.redBorder}><Text style={styles.orderList}>全部</Text></View>
                                </TouchableOpacity>
                             :
                                <TouchableOpacity onPress={this._closeBtn.bind(this,'allOrder')}>
                                    <View style={styles.border}><Text style={styles.orderGray}>全部</Text></View>
                                </TouchableOpacity>
                        }
                        {
                             _orderSelect=='schoolOrder'?
                                <TouchableOpacity onPress={this._closeBtn.bind(this,'schoolOrder')}>
                                    <View style={styles.redBorder}><Text  style={styles.orderList}>统购订单</Text></View>
                                </TouchableOpacity>
                             :
                             <TouchableOpacity onPress={this._closeBtn.bind(this,'schoolOrder')}>
                                <View style={styles.border}><Text  style={styles.orderGray}>统购订单</Text></View>
                             </TouchableOpacity>
                        }
                        {
                             _orderSelect=='retailOrder'?
                             <TouchableOpacity onPress={this._closeBtn.bind(this,'retailOrder')}>
                                <View style={styles.redBorder}><Text  style={styles.orderList}>零售订单</Text></View>
                             </TouchableOpacity>
                             :
                             <TouchableOpacity onPress={this._closeBtn.bind(this,'retailOrder')}>
                                <View style={styles.border}><Text  style={styles.orderGray}>零售订单</Text></View>
                             </TouchableOpacity>
                        }
                        {
                             _orderSelect=='insteadOrder'?
                             <TouchableOpacity onPress={this._closeBtn.bind(this,'insteadOrder')}>
                                <View style={styles.redBorder}><Text  style={styles.orderList}>代买订单</Text></View>
                             </TouchableOpacity>
                             :
                             <TouchableOpacity onPress={this._closeBtn.bind(this,'insteadOrder')}>
                                <View style={styles.border}><Text  style={styles.orderGray}>代买订单</Text></View>
                             </TouchableOpacity>
                        }
                   </View>
            </View>
        );
    },
     //取消关闭弹出框
  _closeBtn:function(param){
         var _param={
             msgCode:'_callbackOrderSelect',
             fetchMethod:'',
             fetchParamData:param
         }
         this.props.callback(_param);
    },
});
var styles = StyleSheet.create({
    black:{
        width:Util.size.width,
        height:Util.size.height,
        position:'absolute',
        left:0,
        top:44
    },
    blackPop:{
        backgroundColor:'#000',
        opacity:0.7,
        width:Util.size.width,
        height:Util.size.height
    },
    border:{
        width:(Util.size.width-84)/4,
        marginLeft:7,
        marginRight:7,
        height:32,
        borderColor:'#b0b0b0',
        borderWidth:0.5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4
    },
    redBorder:{
        width:(Util.size.width-84)/4,
        marginLeft:7,
        marginRight:7,
        height:32,
        borderColor:'#f64b3e',
        borderWidth:0.5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4
    },
    orderList:{
        color:'#f64b3e',
        fontSize:Util.fixedFont(12)
    },
    orderGray:{
        color:'#5e5a57',
        fontSize:Util.fixedFont(12)
    }
});
module.exports=OrderSelect;


