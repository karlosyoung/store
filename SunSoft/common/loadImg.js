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
var LoadImg =React.createClass({
    getInitialState: function() {
       //  RNBridgeModule.isTabHidden('false');//隐藏tab
        return {
            loaded:false
        };
    },
    render:function(){
        return(
                 <View>
                     <Image source={{uri: this.props.data.uri}} style={{width:this.props.data.width,height: this.props.data.height}} resizeMode='contain' />
                     {
                         this.state.loaded?
                             <View style={{width:this.props.data.width,height: this.props.data.height,position:'absolute',top:0,left:0}}>
                                 <Image source={this.props.data.dataSource}  style={{width:this.props.data.width,height: this.props.data.height}} resizeMode='contain' />
                             </View>
                         :
                           null
                      }
                 </View>
        );
    },
    _loadedImg:function(){
        this.setState({loaded:true});
    }
});
module.exports=LoadImg;