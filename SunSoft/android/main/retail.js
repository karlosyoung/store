import React,{Component} from 'react';
var Header=require('../../common/header');
var Util=require('../../common/Util');
import Service from '../../common/service';
import Swiper from '../../common/swiper';
import RetailDetail from './retailDetail';
import NoData from '../../common/noData';
import NoInter from '../../common/noInter';
import NetInfo from '../../common/netInfo';
import LoadImg from '../../common/loadImg';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    ListView,
    Platform
} from'react-native';
var NativeModules  = require('react-native').NativeModules;
var RNBridgeModule=NativeModules.RNBridgeModule;
var _props='';
var _rowIndex=0;  //列表item下标
var Retail =React.createClass({
    getInitialState: function () {
    //RNBridgeModule.isTabHidden('true');//隐藏tab
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            schoolId:this.props.initData.schoolId,
            userId:this.props.initData.userId,
            userName:this.props.initData.userName,
            token:this.props.initData.token,
            isRefreshing: false,
            dataSource: ds,
            pageNo:1,
            psize:10,
            results:0,
            data:[],
            loaded: false,
            noData:false,  //false有数据 true无数据
            noNet:false    //false有网   true无网
        };
    },
    componentDidMount: function () {
        _props=this.props;
        var _param={
            fetchMethod:this.fetchData,
            fetchParamData:{}
        }
        this.FuncFetchData(_param);
    },
    componentWillMount:function() {
    },

    //调用接口获取数据总方法
    FuncFetchData:function(param){
        var that=this;
        var p =param.fetchMethod();//请求数据
        var p1=Util.FuncTimeOut();//判断是否超时
        Promise.race([p, p1]).then(function (result) {
            var data=result.data;
            var _message=result.message;
            //alert(data.length);
            if(_message=='timeout'){
                that.setState({
                    loaded:true,
                    noNet:true,
                    isRefreshing: false
                });
            }else{
                if(_message=='retailList'){
                     var _rows=data.obj.body.rows;
                     that.setState({
                         noData:false,
                         noNet:false,
                         pageNo:1,
                         dataSource: that.state.dataSource.cloneWithRows(_rows),
                         loaded: true,
                         data:_rows,
                         results:data.obj.body.results,
                         isRefreshing: false
                     });
                }else if(_message=='retailMoreList'){  //获取零售特体尺码列表
                    //var _data=that.state.data.concat(data.obj.body.rows);
                    that.setState({
                        noData:false,
                        noNet:false,
                        pageNo:that.state.pageNo+1,
                        dataSource: that.state.dataSource.cloneWithRows(data),
                        data:data,
                        loaded: true,
                        isRefreshing: false
                    });
                }
            }
        }, function(reason){
            if(reason=='noData'){
                that.setState({
                    loaded:true,
                    noData:true,
                    isRefreshing: false
                });
            }else if(reason=='noNet'){
                that.setState({
                    loaded:true,
                    noNet:true,
                    isRefreshing: false
                });
            }
        });
    },

    //下拉刷新
    fetchData: function () {
        var that=this;
        return new Promise(function (resolve, reject) {
             _rowIndex=0;
             var _q='schoolId='+that.state.schoolId+'&pageNo=1&pageSize='+that.state.psize+'&userId='+that.state.userId+'&userName='+that.state.userName+'&token='+that.state.token+'&datestr='+new Date();
             var _baseUrl=Service.retailList+'?'+_q;
             fetch(_baseUrl)
             .then((response) => response.json())
             .then((responseData) => {
             if(responseData.msgCode==99){
                 RNBridgeModule.toLogin('toLogin');
             }else if(responseData.msgCode==1){
                 reject('noData');
             }else{
                 if(responseData.obj.body==null){
                     reject('noData');
                     return
                 }
                    var _data={
                        data:responseData,
                        message:'retailList'
                    }
                     resolve(_data);
             }
             }).catch(function(err){
                 reject('noNet');
             });
        });
    },
    //上翻加载更多
    getMoreData: function () {
     var _pageCount=Math.ceil(this.state.results/this.state.psize);//总页数
            if(this.state.pageNo<_pageCount){
               var _q='schoolId='+this.state.schoolId+'&pageNo='+(this.state.pageNo+1)+'&pageSize='+this.state.psize+'&userId='+this.state.userId+'&userName='+this.state.userName+'&token='+this.state.token;
                var _baseUrl=Service.retailList+'?'+_q;
                fetch(_baseUrl)
                    .then((response) => response.json())
                    .then((responseData) => {
                    if(responseData.msgCode==99){
                        RNBridgeModule.toLogin('toLogin');
                    }else if(responseData.msgCode==1){
                        this.setState({
                            loaded:true,
                            noData:true,
                            isRefreshing: false
                        });
                    }else{
                         if(responseData.obj.body==null){
                            this.setState({
                                loaded:true,
                                noData:true,
                                isRefreshing: false
                            });
                            return
                        }
                            var _data=this.state.data.concat(responseData.obj.body.rows);
                            this.setState({
                                noData:false,
                                noNet:false,
                                pageNo:this.state.pageNo+1,
                                dataSource: this.state.dataSource.cloneWithRows(_data),
                                data:_data,
                                loaded: true,
                                isRefreshing: false
                            });
                    }

                    }).catch(function(err){
                      this.setState({
                           loaded:true,
                           noNet:true,
                           isRefreshing: false
                       });
                  });
            }
       /* var that=this;
         return new Promise(function (resolve, reject) {
              var _pageCount=Math.ceil(that.state.results/that.state.psize);//总页数
              if(that.state.pageNo<_pageCount){
                var _q='schoolId='+that.state.schoolId+'&pageNo='+(that.state.pageNo+1)+'&pageSize='+that.state.psize+'&userId='+that.state.userId+'&userName='+that.state.userName+'&token='+that.state.token;
                var _baseUrl=Service.retailList+'?'+_q;
                fetch(_baseUrl)
                .then((response) => response.json())
                .then((responseData) => {
                if(responseData.msgCode==99){
                    RNBridgeModule.toLogin('toLogin');
                }else if(responseData.msgCode==1){
                    reject('noData');
                }else{
                     if(responseData.obj.body==null){
                        reject('noData');
                        return
                    }
                    var data=that.state.data.concat(responseData.obj.body.rows);
                    var _data={
                         data:data,
                         message:'retailMoreList'
                    }
                     resolve(_data);
                }

                }).catch(function(err){
                  reject('noNet');
              });
              }
         });*/
    },
    render: function () {
        if (this.state == null || !this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <View style={styles.outView}>
                <View><Image source={require('../../img/common/noInter.png')} resizeMode='contain' style={{width:0,height:0}} /></View>
                <Header navigator={this.props.navigator} initObj={{
                      backName:'retail',
                      title:'学校零售'
                  }}/>
                {
                    this.state.noNet?
                        <NoInter callback={this._onPressRefresh.bind(this)} />
                    :
                    this.state.noData?
                        <NoData callback={this._onPressRefresh.bind(this)} />
                    :
                        <ScrollView
                            refreshControl={
                              <RefreshControl
                              refreshing={this.state.isRefreshing}
                              onRefresh={this._onRefresh}
                              colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                              progressBackgroundColor="#ffffff"
                              />
                              }>
                            <Swiper data={
                            {token:this.state.token,positionId:6}
                            } />
                            <ListView
                                contentContainerStyle={styles.list}
                                onEndReached={this._endReached}
                                dataSource={this.state.dataSource}
                                renderRow={this.renderItem}
                            >
                            </ListView>
                        </ScrollView>
                }
                <NetInfo callback={this._getNetInfoState.bind(this)} />
            </View>
        );
    },

    //监测网络状态
    _getNetInfoState:function(param){
        this.setState({
            noNet:param
        });
    },

    //点击刷新方法
    _onPressRefresh:function(param){
       var _param={
            fetchMethod:this.fetchData,
            fetchParamData:{}
        }
        this.FuncFetchData(_param);
    },
    _endReached:function(){
     /*var _param={
            fetchMethod:this.getMoreData,
            fetchParamData:{}
        }
        this.FuncFetchData(_param);*/
        this.getMoreData();
    },
    _onRefresh: function () {
       this.setState({isRefreshing: true});
        setTimeout(() => {
            var _param={
                fetchMethod:this.fetchData,
                fetchParamData:{}
            }
            this.FuncFetchData(_param);
        }, 1000);
    },
    renderLoadingView: function () {
        return (
        <View>
                        <Header navigator={this.props.navigator} initObj={{
                              backName:'retail',
                              title:'学校零售'
                          }}/>
            <View style={styles.container}>
                <Image source={require('../../img/common/loading.gif')} style={{width: 25, height:25} }  />
            </View>
        </View>
        );
    },
    renderItem: function(item: object, sectionID: number, rowID: number) {
        var _num=rowID%2;
        if(_num==0){
            return <LeftRowItem data={{
                item:item,
                token:this.state.token,
                userId:this.state.userId
                }}/>;
        }else{
            return <RightRowItem data={{
                 item:item,
                 token:this.state.token,
                 userId:this.state.userId
             }}/>;
        }
    }
});


var styles = StyleSheet.create({
    container:{
        width:Util.size.width,
        height:Util.size.width,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f7f7f7'
    },
    outView:{
        paddingBottom:57,
        backgroundColor:'#f7f7f7',
	    flex:1
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'flex-start'
    },
    redText:{
        color:'#f64b3e',
        fontSize:Util.fixedFont(13)
    },
    container: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#f7f7f7',
        width:Util.size.width,
        height:Util.size.height,
        justifyContent:'center',
        alignItems:'center'
    },
    leftContainer:{
        width:Util.size.width/2-15,
        height:210,
        backgroundColor:'#fff',
        borderRadius:10,
        marginTop:10,
        marginLeft:10,
        marginRight:5
    },
    rightContainer:{
        width:Util.size.width/2-15,
        height:210,
        backgroundColor:'#fff',
        borderRadius:10,
        marginLeft:5,
        marginRight:10,
        marginTop:10
    },
    title: {
        fontSize: Util.fixedFont(11),
        color:'#5e5a57'
    },
    year: {
        fontSize:Util.fixedFont(13),
        color:'#5e5a57'
    },
    thumbnail: {
        width:Util.size.width/2-29,
        height: 156,
        marginRight:7,
        marginLeft:7,
        marginTop:4,
        borderRadius:6
    },
    allTitle:{
        flex:1,
        flexDirection: 'row',
        paddingLeft:5
    },
    goodTitle:{
        width:Util.size.width/2-15,
        justifyContent:'center',
        height:25,
        paddingLeft:5
    },
    widthL:{
        width:Util.size.width/2-25,
        marginLeft:5,
        marginRight:5
    }
});
var LeftRowItem = React.createClass({
    render: function() {
        return(
                <TouchableOpacity style={styles.leftContainer}  onPress={this._loadPage.bind(this,1)}>
                <View>
                    <LoadImg style={styles.thumbnail} data={
                        {
                            width:Util.size.width/2-29,
                            height: 156,
                            uri:this.props.data.item.goodsImg+'!m324x324.jpg',
                            dataSource:require('../../img/common/defaultReDetail.png'),
                        }
                    } />
                     <View style={{ position:'absolute',top:7,left:7,width:30,height:30,justifyContent:'flex-start',alignItems:'flex-start' }}>
                     {
                        this.props.data.item.goodsProperties==1?
                            <Image source={require('../../img/common/boy.png')} style={{width:30, height:30} }/>
                        :
                            <Image source={require('../../img/common/girl.png')} style={{width:30, height:30} }/>
                     }
                      </View>
                    <View style={styles.goodTitle}><Text numberOfLines={1} style={styles.title}>{this.props.data.item.goodsName}</Text></View>
                    <Image source={require('../../img/retail/diline.png')} resizeMode='contain' style={styles.widthL} />
                    <View style={styles.allTitle}><Text style={styles.year}>智园价：</Text><Text style={styles.redText}>{Util.FuncRmbFormat(this.props.data.item.shopPrice)}</Text></View>
                </View>
                </TouchableOpacity>
        );
    },
    _loadPage:function(id) {
        /*_props.navigator.push({
            title: '零售详情',
            component: RetailDetail,
            params:{
                initData:{
                    goodsId:this.props.data.item.goodsId,
                    token:this.props.data.token,
                    userId:this.props.data.userId,
                    type:'01'   //01 RN 02原生
                }
            }
        })*/
        RNBridgeModule.retailToRetailDetail(this.props.data.item.goodsId);
    }
});

var RightRowItem = React.createClass({
    render: function() {
        return(
        <TouchableOpacity style={styles.rightContainer}  onPress={this._loadPage.bind(this,1)}>
                    <View>
                    <LoadImg style={styles.thumbnail} data={
                        {
                            width:Util.size.width/2-29,
                            height: 156,
                            uri:this.props.data.item.goodsImg+'!m324x324.jpg',
                            dataSource:require('../../img/common/defaultReDetail.png')
                        }
                    } />
                        <View style={{ position:'absolute',top:7,left:7,width:30,height:30,justifyContent:'flex-start',alignItems:'flex-start' }}>
                        {
                            this.props.data.item.goodsProperties==1?
                                <Image source={require('../../img/common/boy.png')} style={{width:30, height:30} }/>
                            :
                                <Image source={require('../../img/common/girl.png')} style={{width:30, height:30} }/>
                         }
                         </View>
                        <View style={styles.goodTitle}><Text numberOfLines={1} style={styles.title}>{this.props.data.item.goodsName}</Text></View>
                        <Image source={require('../../img/retail/diline.png')} resizeMode='contain' style={styles.widthL} />
                        <View style={styles.allTitle}><Text style={styles.year}>智园价：</Text><Text style={styles.redText}>{Util.FuncRmbFormat(this.props.data.item.shopPrice)}</Text></View>
                    </View>
                    </TouchableOpacity>
        );
    },
    _loadPage:function(id) {
        /*_props.navigator.push({
            title: '零售详情',
            component: RetailDetail,
           params:{
               initData:{
                    goodsId:this.props.data.item.goodsId,
                    token:this.props.data.token,
                    userId:this.props.data.userId,
                    type:'01'   //01 RN 02原生
               }
           }
        })*/
        RNBridgeModule.retailToRetailDetail(this.props.data.item.goodsId);
    }
});
module.exports=Retail;