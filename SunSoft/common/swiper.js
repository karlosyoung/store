/**
 * Created by qiaozm on 2016/7/6.
 * 轮播图组件
 */
var Util=require('./Util');
import Swiper from 'react-native-swiper';
import Service from './service';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

var swiper=React.createClass({
    getInitialState: function() {
        return {
            positionId:this.props.data.positionId,
            token:this.props.data.token,
            loaded:false
        };
    },

    componentDidMount: function() {
         this.fetchData();
    },
    fetchData: function() {
        //+this.state.goodsId
         var _q='?token='+this.state.token+'&positionId='+this.state.positionId;
         var baseUrl=Service.getSlidead+_q;
         var that=this;
         Util.get(baseUrl,
         function(data){
            var _msgCode=data.msgCode;
            if(_msgCode==1){
                ToastAndroid.show(_message, 2000);
            }else if(_msgCode==99){
                RNBridgeModule.toLogin('toLogin');
            }else{
                that.setState({
                    loaded:true,
                    dataList:data.obj.body
                });
              //alert(_msgCode);
            }
         },function(err){
            });
    },
    render:function(){
        if (this.state==null || !this.state.loaded) {
            return this.renderLoadingView();
        }
        var _swierViwList=this._initSwiperViewList();
        return(
            <View style={{height:175}}>
                {
                    this.state.dataList!=null&&this.state.dataList.length>1?
                        <Swiper style={styles.wrapper}
                         showsButtons={false} autoplay={true} autoplayTimeout={2.5} height={175}>
                            {_swierViwList}
                        </Swiper>
                    :
                    <View>{_swierViwList}</View>
                }

            </View>

        );
    },
    _initSwiperViewList:function(){
            var itemList=[];
            var _dataList=this.state.dataList;
            if(_dataList!=null && _dataList.length>0){
                if(_dataList.length==1){
                    itemList[0]=(<Image style={{height:175,width:Util.size.width}} source={{uri: _dataList[0].adCode}} />);
                }else{
                    for(var i=0;i<_dataList.length;i++){
                        var item=_dataList[i];
                        itemList[i]=(
                            <View style={styles.slider1}>
                                <Image style={{height:175,width:Util.size.width}} source={{uri: item.adCode}} />
                            </View>
                        );
                    }
                }
            }else{
                 itemList[0]=(<Image style={{height:175,width:Util.size.width}} source={require('../img/common/banner.jpg')} />);
            };
            return itemList;
        },
    renderLoadingView: function() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
});
var styles=StyleSheet.create({
    wrapper:{

    },
    slider1:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#9dd6eb'
    },
    slider2:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#97cae5'
    },
    slider3:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#92bbd9'
    },
    text:{
        color:'#fff',
        fontSize:30,
        fontWeight:'bold'
    }
});
module.exports=swiper;