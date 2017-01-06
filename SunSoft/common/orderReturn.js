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
            <View style={styles.returnGoods}>
                <View style={styles.reGoIn}>

                </View>
                <Image source={require('../../img/order/ding.png')} style={{width: 15, height: 16,marginRight:1,position:'absolute'} } />
                <TouchableOpacity onPress={this._goBuyFunc.bind(this)}>

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
        justifyContent:'center',
        alignItems:'center'
        },
    noDataImg:{
        width:Util.size.width-250,
        height:Util.size.width-250
    },
    noFountIn:{
        color:'#929292',
        fontSize:15,
        width:Util.size.width,
        textAlign:'center'
    },
    reGoIn:{
        width:253,
        marginLeft:Util.size.width/2-127,
        marginRight:Util.size.width/2-127,
        height:277,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
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