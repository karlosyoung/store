/**
 * Created by qiaozm on 2016/6/29.
 * 零售提交订单第一步组件
 */
import React,{Component} from 'react';
var Header=require('./header');
var Util=require('./Util');
import Service from './service';
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
var OrderPppCom =React.createClass({
    componentDidMount: function() {
    },
    render: function() {
        return (
            <View style={styles.black}>
                <View style={styles.blackPop}></View>
                <View style={styles.orderPull}>

                    <View style={styles.twoH}>
                    {
                        Platform.OS=='ios'?
                        <Text allowFontScaling={false} style={styles.huiColor}>提示:</Text>
                        :
                        <Text style={styles.huiColor}>提示:</Text>
                    }
                        <View style={{height:80,width:Util.size.width-100,justifyContent:'center',alignItems:'center'}}>
                        {
                            Platform.OS=='ios'?
                            <Text allowFontScaling={false} style={[styles.fSize,styles.goods]}>您确认收到货物吗</Text>
                            :
                            <Text style={[styles.fSize,styles.goods]}>您确认收到货物吗</Text>
                        }
                
                        </View>
                        <View style={[styles.yiHang,{height:30}]}>
                            <TouchableOpacity  onPress={this._cancleBtn.bind(this)}>
                                <View style={{width:Util.size.width/2-50,height:30,justifyContent:'center',alignItems:'center'}}>
                {
                Platform.OS=='ios'?
                <Text allowFontScaling={false} style={{color:'#929292'}}>取消</Text>
                :
                <Text style={{color:'#929292'}}>取消</Text>
                }
                
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{width:Util.size.width/2-50,height:30,justifyContent:'center',alignItems:'center'}}>
                
                                {
                                    Platform.OS=='ios'?
                                    <Text allowFontScaling={false} style={{color:'#929292'}}>确定</Text>
                                    :
                                    <Text style={{color:'#929292'}}>确定</Text>
                                }
                
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        );
    },
     //取消关闭弹出框
        _cancleBtn:function(){
             this.setState({
                OrderPppCom:false
            });
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
        paddingBottom:20,
        left:0
    },
    yiHang:{
        flex:1,
        flexDirection:'row'
    },
    manH:{
        width:Util.size.width-100,
        height:40,
        justifyContent:'center',
        alignItems:'flex-start',
        backgroundColor:'#4cb071',
        borderRadius:6,
        paddingLeft:20
    },
    twoH:{
        width:Util.size.width-100,
        height:140,
        justifyContent:'center',
        alignItems:'center'

    },
    goodS:{
        color:'#929292',
        fontSize:14
    },
    goods:{
        color:'#333',
        fontSize:17
    }
});
module.exports=OrderPppCom;


