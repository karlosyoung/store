/**
 * Created by qiaozm on 2016/6/29.
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
    TouchableOpacity
} from'react-native';
var NoNet=React.createClass({
    render:function(){
       var obj=this.props.initObj;
        return(
            <View style={[styles.noNet,{position:'absolute',top:44,left:0}]}>
                <Image source={require('../img/common/nonet.png')} resizeMode='contain' style={[{width:30},styles.imgWei]} />
                <Text allowFontScaling={false} style={styles.wenZi}>网络无法连接，请检查您的网络设置</Text>
            </View>
        )
    },

    _pop:function(){
        this.props.navigator.pop();
    }
});
var styles=StyleSheet.create({
    noNet:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'yellow',
        width:Util.size.width,
        height:40,
        justifyContent:'center',
        alignItems:'center'
    },
    imgWei:{
        marginTop:5,
        marginRight:5
    },
    wenZi:{
        fontSize:14
    }

});
module.exports=NoNet;