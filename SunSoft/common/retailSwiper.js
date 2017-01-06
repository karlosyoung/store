/**
 * Created by qiaozm on 2016/7/6.
 * 轮播图组件
 */
var Util=require('./Util');
import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

var retailSwiper=React.createClass({
    getInitialState: function () {
        return {
            showPagePic:this.props.showBigPic,
            data:this.props.data
        };
    },
    componentDidMount: function() {
    },
    render:function(){
        var _swiperList=this._FuncSwiperList();
        return(
                <View style={{height:Util.size.height,width:Util.size.width}}>
                    <Swiper style={styles.wrapper} showsButtons={false} autoplayTimeout={2.5}>
                        {_swiperList}
                    </Swiper>
                </View>
        );
    },
    //图片轮播
        _FuncSwiperList:function(){
            var _itemList=[];
            var _goodsThumbList=this.state.data.goodsThumb;
            if(_goodsThumbList!=null && _goodsThumbList!=''){
                var _list=_goodsThumbList.split(',');
                if(_list!=null && _list.length>0){
                    for(var i=0;i<_list.length;i++){
                        _itemList[i]=(
                            <TouchableOpacity onPress={this._closeBigPic.bind(this,false)}>
                                <View style={styles.slider}>
                                    <Image style={{height:Util.size.height,width:Util.size.width}} resizeMode="contain"  source={{uri: _list[i]}} />
                                </View>
                            </TouchableOpacity>
                        );
                    }
                }else{
                    _itemList[0]=(
                        <TouchableOpacity onPress={this._closeBigPic.bind(this,false)}>
                            <View style={styles.slider}>
                                <Image style={{height:Util.size.height,width:Util.size.width}} resizeMode="contain"  source={{uri: _list[0]}} />
                            </View>
                        </TouchableOpacity>
                    );
                }
            }
            return _itemList;
        },
    _closeBigPic:function(param){
        this.props.callback(param);
    }
});
var styles=StyleSheet.create({
    wrapper:{
    },
    slider:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color:'#fff',
        fontSize:30,
        fontWeight:'bold'
    }
});
module.exports=retailSwiper;