/**
 * Created on 2016/7/21.
 *
 */
var Util=require('./Util');
import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
var Loading =React.createClass({
    render:function(){
        return(
            <View style={styles.huiBox}>
                <View style={[styles.containers]}>
                    <Image source={require('../img/common/loading.gif')} style={{width: 25, height:25} }  />
                </View>
            </View>
        )
    }
});
var styles=StyleSheet.create({
    huiBox:{
        width:Util.size.width,
        height:Util.size.height,
        backgroundColor:'#000',
        opacity:0.7,
        position:'absolute',
        bottom:0,
        left:0
    },
    containers:{
        width:Util.size.width,
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        height:Util.size.height
    },
});
module.exports=Loading;