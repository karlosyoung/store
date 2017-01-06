import React,{Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform
} from'react-native';
var Icon=React.createClass({
    render:function(){
        return (
            <View style={styles.pangZi}>
                <Image source={require('../img/common/goback.png')} style={{ width:9,height:17}} resizeMode='contain' />
            </View>
        )
    }
});

var styles=StyleSheet.create({
    pangZi:{
        paddingLeft:20,
        marginTop:11,
        paddingRight:21,
        marginBottom:11,
        height:30,
       justifyContent:'center'
    },
    goBack:{
       borderLeftWidth:2,
       borderBottomWidth:2,
        width:20,
        height:20,
        transform:[{rotate:'45deg'}],
        borderColor:'#fff',
        marginLeft:20
   }
});
module.exports=Icon;