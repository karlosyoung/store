/**
 * Created by qiaozm on 2016/6/29.
 * 零售提交订单第一步组件
 */
import React,{Component} from 'react';
var Header=require('../../common/header');
var Util=require('../../common/Util');
import Service from '../../common/service';
import AddFeedBack from './addFeedBack';
import NoInter from '../../common/noInter';
import NetInfo from '../../common/netInfo';
import {
    AppRegistry,
    StyleSheet,
    View,
    WebView,
    Text,
    Image
    } from'react-native';
var FeedBackTwo =React.createClass({
    getInitialState: function() {
        return {
            type:this.props.initData.type,
            token:this.props.initData.token,
            noticeId:this.props.initData.noticeId,
            loaded:false,
            noNet:false    //false有网   true无网
        };
    },
    componentDidMount: function() {
       var _q='?token='+this.state.token+'&noticeId='+this.state.noticeId;//079ecf7aee36479ebe78d294b9fab0eb
       var _url=Service.toFeedback+_q;
        this.setState({
            toActionUrl:_url
        });
    },
    render: function() {
        return (
            <View style={{height: Util.size.height,paddingBottom:20,width:Util.size.width,backgroundColor:'#f7f7f7'}}>
                <View><Image source={require('../../img/common/noInter.png')} resizeMode='contain' style={{width:0,height:0}} /></View>
                <Header navigator={this.props.navigator} initObj={{
                    backName:'feedbackTwo',
                    title:'反馈统计',
                    show:true,
                    type:this.state.type
                }}/>
                {
                    this.state.noNet?
                        <NoInter callback={this._onPressRefresh.bind(this)} />
                    :
                        <WebView
                        onError={this._onError}
                        onLoad={this._onLoad}
                        onLoadStart={this._onLoad}
                        bounces={false}
                        url={this.state.toActionUrl}></WebView>
                }
                <NetInfo callback={this._getNetInfoState.bind(this)} />
            </View>
        );
    },
    _onError:function(){
        //alert('异常');
    },
    _onLoad:function(){
        this.setState({
            loaded:true
        });
    },
    _onLoadStart:function(){
       this.renderLoadingView();
    },

     //监测网络状态
    _getNetInfoState:function(param){
        this.setState({
            noNet:param
        });
    },

    //点击刷新方法
    _onPressRefresh:function(param){
        this.fetchData();
    },
    _endReached:function(){
        this.getMoreData();
    },
    _onRefresh: function () {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.fetchData();
        }, 1000);
    },

    renderLoadingView: function() {
        return (
                <View>
                Header navigator={this.props.navigator} initObj={{
                backName:'feedbackTwo',
                title:'反馈统计',
                show:true,
                type:this.state.type
                }}/>
                <View style={styles.container}>
                <Image source={require('../../img/common/loading.gif')} style={{width: 25, height:25} }  />
            </View>
                </View>
        );
    }
});
var styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f7f7f7',
        width:Util.size.width,
        height:Util.size.height
    }
});
module.exports= FeedBackTwo;


