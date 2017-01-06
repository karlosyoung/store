/**
 * Created by qiaozm on 2016/6/29.
 * 零售提交订单第一步组件
 */
import React,{Component} from 'react';
var Header=require('../../common/header');
import feedbackTwo from './feedbackTwo';
import Service from '../../common/service';
var Util=require('../../common/Util');
import NoData from '../../common/noData';
import addFeedBack from './addFeedBack';
import NoInter from '../../common/noInter';
import NetInfo from '../../common/netInfo';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    ListView,
    RefreshControl,
    Image,
    TextInput,
    TouchableOpacity,
    NativeModules
    } from'react-native';
var RNBridgeModule=NativeModules.RNBridgeModule;
var FeedBack =React.createClass({
    getInitialState: function() {
        RNBridgeModule.isTabHidden('false');//隐藏tab
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       return {
            token:this.props.initData.token,
            dataSource: ds,
            data:[],
            isRefreshing: false,
            loaded: false,
            noData:false,  //false有数据 true无数据
            noNet:false    //false有网   true无网
        };
    },

    componentDidMount: function() {
       var _param={
            fetchMethod:this.fetchData,
            fetchParamData:''
        }
        this.FuncFetchData(_param);
    },
    onBackPressed:function(){
      // RNBridgeModule.isTabHidden('true');//显示tab
    },
    componentWillUnmount(){
    },
    //调用服务方法总入口
    FuncFetchData:function(param){
       var p=param.fetchMethod(param.fetchParamData);//请求数据
        var p1=Util.FuncTimeOut();//判断是否超时
        var that=this;
        Promise.race([p, p1]).then(function (result) {
            var data=result.data;
            var _message=result.message;
            if(_message=='timeout'){
                that.setState({
                    loaded:true,
                    noNet:true
                });
            }else{
                if(_message=='getnoticelistbyschoolid'){
                   that.setState({
                       noData:false,
                       dataSource: that.state.dataSource.cloneWithRows(data),
                       loaded: true,
                       isRefreshing: false
                   });
                }
            }
        }, function(reason){
            if(reason=='noData'){
                that.setState({
                    loaded:true,
                    noData:true
                });
            }else if(reason=='noNet'){
                that.setState({
                    loaded:true,
                    noNet:true
                });
            }
        });
    },
    fetchData: function() {
        var that=this;
        return new Promise(function (resolve, reject) {
             var _q='?token='+that.state.token;
             var baseUrl=Service.getnoticelistbyschoolid+_q;
             Util.get(baseUrl,
             function(data){
                var _msgCode=data.msgCode;
                if(_msgCode==1){
                    reject('noData');
                }else if(_msgCode==99){
                    RNBridgeModule.toLogin('toLogin');
                }else{
                    var _data=data.obj.body;
                    if(_data==null){
                        reject('noData');
                    }else{
                        var _paramData={
                            data:_data,
                            message:'getnoticelistbyschoolid'
                        }
                         resolve(_paramData);
                    }
                }
             },function(err){
                    reject('noNet');
             });
        });
    },
    render: function() {
        if (this.state==null || !this.state.loaded) {
         return this.renderLoadingView();
         }
        return (
            <View style={{height: Util.size.height,backgroundColor:'#f7f7f7'}}>
                <View><Image source={require('../../img/common/noInter.png')} resizeMode='contain' style={{width:0,height:0}} /></View>
                <Header style={styles.head} navigator={this.props.navigator} initObj={{
                    backName:'orderFeedback',
                    title:'订购反馈',
                    show:true,
                    type:'01'
                }}/>
                <View style={{height: Util.size.height-54}}>
                    {
                        this.state.noData?
                            <NoData callback={this._onPressRefresh.bind(this)} />
                        :
                         this.state.noNet?
                            <NoInter callback={this._onPressRefresh.bind(this)} />
                         :
                            <ListView
                                refreshControl={
                                  <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={this._onRefresh}
                                  colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                                  progressBackgroundColor="#ffffff"/>
                                  }
                                 contentContainerStyle={styles.list}
                                 dataSource={this.state.dataSource}
                                 renderRow={this._renderItem}>
                             </ListView>
                    }
                    <NetInfo callback={this._getNetInfoState.bind(this)} />
            </View>
        </View>
        );
    },

    _renderItem: function(item: object, sectionID: number, rowID: number) {
        return(
        <TouchableOpacity onPress={this.feedbackTwo.bind(this,item.noticeId)}>
            <View style={styles.adList}>
                <View style={styles.adListIn}>
                    <View style={styles.adTitle}><Text allowFontScaling={false} numberOfLines={1} style={styles.adTitles}>{item.titleName}</Text></View>
               <View style={styles.article}><Text allowFontScaling={false} numberOfLines={2} style={styles.articles}>{this._formateNoticeContent(item.noticeContent)}</Text></View>
                </View>
                <View style={styles.lookBack}><Text allowFontScaling={false} style={styles.lookBacks}>查看订购反馈</Text></View>
            </View>
        </TouchableOpacity>
        );
    },
         _onRefresh: function () {
            this.setState({isRefreshing: true});
             setTimeout(() => {
                this.fetchData();
             }, 1000);
         },

     _formateNoticeContent:function(noticeContentStr){
         var delStr1 = "&lt;div class="+ "\"sj\"" + "&gt;";
        var delStr2 = "&lt;/div&gt;&lt;div class="+ "\"sj\"" + "&gt;";
        var delStr3 = "&lt;/div&gt;";
        noticeContentStr =  noticeContentStr.replace(delStr1,""); /*换行*/
        noticeContentStr =  noticeContentStr.replace(delStr2,""); /*换行*/
        noticeContentStr =  noticeContentStr.replace(delStr3,""); /*置为空*/
        return noticeContentStr.substring(0,31)+'......';
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
    //跳转到第二步
    feedbackTwo:function(noticeId){
        this.props.navigator.push({
            title: '反馈统计',
            component: feedbackTwo,
            params:{
                initData:{
                    token:this.state.token,
                    noticeId:noticeId
                }
            }
        })
    },
    renderLoadingView: function() {
        return (
                <View>
                <Header style={styles.head} navigator={this.props.navigator} initObj={{
                backName:'orderFeedback',
                title:'订购反馈',
                show:true,
                type:'01'
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
        width:Util.size.width,
        height:Util.size.height,
        alignItems:'center',
        justifyContent:'center'
    },
    backList:{
        width:Util.size.width,
        height:Util.size.height,
        backgroundColor:'#f7f7f7'
    },
    adList:{
        width:Util.size.width,
        backgroundColor:'#fff',
        marginBottom:15
    },
    adListIn:{
        width:Util.size.width
    },
    adTitle:{
        width:Util.size.width,
        paddingTop:20,
        paddingLeft:20,
        paddingRight:20,
        justifyContent:'center',
        alignItems:'center'
    },
    article:{
        width:Util.size.width,
        paddingLeft:20,
        paddingRight:20,
        height:60,
        justifyContent:'center',
        alignItems:'center'
    },
    adTitles:{
        fontSize:16,
        color:'#333',
        height:20,
        lineHeight:18,
        width:Util.size.width-40,
        textAlign:'center'
    },
    articles:{
        fontSize:14,
        color:'#5e5a57',
        height:50,
        lineHeight:18,
        width:Util.size.width-40
    },
    lookBack:{
        width:Util.size.width,
        paddingTop:15,
        paddingBottom:15,
        justifyContent:'center',
        alignItems:'center',
        borderTopColor:'#e0e0e0',
        borderTopWidth:1
    },
    lookBacks:{
        fontSize:15,
        color:'#5e5a57',
        height:18
    }
});
module.exports= FeedBack;


