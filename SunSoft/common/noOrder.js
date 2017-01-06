/**
 * Created on 2016/8/3.
 *
 */
var Util=require('./Util');
import React,{Component} from 'react';
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
var NoOrder =React.createClass({
    render:function(){
       var obj=this.props.initObj;
        return(
            <View style={styles.noData}>
                <Image source={require('../img/order/norder.png')} resizeMode='contain' style={[styles.noDataImg,{width:Util.size.width-250,height:Util.size.width-250}]} />
                <View style={styles.noFount}>
               {
               Platform.OS=='ios'?
               <Text allowFontScaling={false} style={styles.noFountIn}>暂无订单~</Text>
               :
               <Text style={styles.noFountIn}>暂无订单~</Text>
               }
               
               </View>
                <TouchableOpacity onPress={this._goBuyFunc.bind(this)}>
                    <View style={styles.goBuy}>
               {
               Platform.OS=='ios'?
               <Text allowFontScaling={false} style={styles.toBuy}>去购买</Text>
               :
               <Text style={styles.toBuys}>去购买</Text>
               }
               
                    </View>
                </TouchableOpacity>
            </View>
        )
    },

    _goBuyFunc:function(){
        this.props.callback();
       },

    _pop:function(){
        this.props.navigator.pop();
    }
});
var styles=StyleSheet.create({
    noData:{
        width:Util.size.width,
        height:Util.size.height,
        backgroundColor:'#f7f7f7',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop:100
        },
    noDataImg:{
        width:Util.size.width-250,
        height:Util.size.width-250
    },
    noFount:{
        width:Util.size.width,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
       },
    noFountIn:{
        color:'#929292',
        fontSize:15,
                             width:Util.size.width,
                             textAlign:'center'
    },
    goBuy:{
        width:Util.size.width-100,
        marginLeft:50,
        marginRight:50,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'orange',
        borderRadius:6,
        marginTop:15
    },
    toBuy:{
        color:'#fff',
        height:40,
        lineHeight:26
    },
    toBuys:{
        color:'#fff'
    }
});
module.exports=NoOrder;