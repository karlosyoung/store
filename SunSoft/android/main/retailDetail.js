/**
 * Created by qiaozm on 2016/6/29.
 * 商品详情组件
 */
import React,{Component} from 'react';
import GoodDetail from './goodDetail';
import SupplierInfo from './supplier';
import SizeModal from './sizeModal';
import CustomSizeModal from './customSizeModal';
import BodyMeasure from './bodyMeasure';
import orderOneView from './orderOneView';
import RetailSwiper from '../../common/retailSwiper';
var Header=require('../../common/header');
var Util=require('../../common/Util');
import Service from '../../common/service';
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
    ScrollView,
    Image,
    TouchableOpacity,
    absolute,
    Platform,
    ToastAndroid,
    BackAndroid
} from'react-native';
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
var { NativeModules } = require('react-native');
var RNBridgeModule=NativeModules.RNBridgeModule;
var btnDisabled=true;  //true表示按钮可以点击 false表示按钮不能点击
var RetailDetail =React.createClass({
    getInitialState: function() {
       //  RNBridgeModule.isTabHidden('false');//隐藏tab
        return {
            initRoute:this.props.initRoute,
            type:this.props.initData.type,   //跳转01 RN 02原生
            showPage:'good',
            showBigPic:false,
            modalVisible:false,
            customSizeModal:false,//是否显示特体尺码
            isBodyMeasure:false,//如何测量页面是否为打开状态
            height:'',  //身高
            weight:'',  //体重
            bust:'',    //胸围
            waist:'',   //腰围
            hip:'',     //臂围
            shoulderWidth:'',  //肩宽
            sleeveLength:'',   //袖长
            outsideLength:'',  //裤长
            goodsId:this.props.initData.goodsId,
            token:this.props.initData.token,
            userId:this.props.initData.userId,
            loaded:false,
            noData:false,  //false有数据 true无数据
            noNet:false    //false有网   true无网
        };
    },

    componentDidMount: function() {
       // RNBridgeModule.shopDetailIn('零售商品详情');
        var _param={
            fetchMethod:this.fetchData,
            fetchParamData:''
        }
        this.FuncFetchData(_param);
        BackAndroid.addEventListener('hardwareBackPress', this.onBackPressed);
         //this.fetchData();
    },
    onBackPressed:function(){
        if(this.state.isBodyMeasure){
            this.setState({isBodyMeasure:false});
            return;
        }else{
            if(this.state.modalVisible || this.state.customSizeModal){
                this.setState({
                    modalVisible:false,
                    customSizeModal:false
                });
                return true;
            }else{
                return false;
            }
        }
    },
    componentWillUnmount(){
      //RNBridgeModule.shopDetailOut('零售商品详情');
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackPressed);
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
                if(_message=='retailDetailList'){
                    that.setState({
                        NoData:false,
                        noNet:false,
                        loaded:true,
                        goods:data.obj.body.goods,
                        sunGoodsCategoryDTO:data.obj.body.sunGoodsCategoryDTO,
                        cartSize:data.obj.body.cartSize,
                        userId:data.obj.body.userId,
                        userName:data.obj.body.userName,
                        isUniform:data.obj.body.goodsCategory.isUniform,//是否为制服  true为制服 false不是制服;
                        sizeList:data.obj.body.list
                    });
                }else if(_message=='selectByTypeIdValue'){  //获取零售特体尺码列表
                    var _body=data.obj.body;
                    that.setState({
                        customSizeList:_body,
                        modalVisible: false,
                        height:data.height,
                        weight:data.weight,
                        customSizeModal:true
                    });
                }else if(_message=='addShopCartGoods'){//加入购物车
                    that.setState({
                        cartSize:data
                    });
                }else if(_message=='schoolGoodsDetail'){//立即购买
                    that.setState({
                        loaded:true
                    });
                    that.props.navigator.push({
                           title: '提交订单',
                           component: orderOneView,
                           params:{
                             initData:{
                               orderData:data.obj.body,
                               token:that.state.token,
                               userId:that.state.userId,
                               type:'01'
                             }
                           }
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
             var _q='?token='+that.state.token+'&goodsId='+that.state.goodsId;
             var baseUrl=Service.retailDetailList+_q;
             Util.get(baseUrl,
             function(data){
                var _msgCode=data.msgCode;
                if(_msgCode==1){
                    reject('noData');
                }else if(_msgCode==99){
                    RNBridgeModule.toLogin('toLogin');
                }else{
                    var _data={
                        data:data,
                        message:'retailDetailList'
                    }
                     resolve(_data);
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
                <View style={{flex:1}}>
                   {
                       this.state.showBigPic==true&&this.state.goods.goodsAttImg!=''&&this.state.goods.goodsAttImg!=null?
                           <RetailSwiper data={{goodsThumb:this.state.goods.goodsAttImg}} showBigPic={this.state.showBigPic} callback={this._callback.bind(this)}/>
                       :
                           <View style={{flex:1}}>
                               <View style={{flex:1}}>
                                   <View><Image source={require('../../img/common/noInter.png')} resizeMode='contain' style={{width:0,height:0}} /></View>
                                   <Header navigator={this.props.navigator} initObj={{
                                       backName:this.state.initRoute,//retailDetail,orderRetailDetail,cartRetailDetail
                                       title:'商品详情',
                                       show:true,
                                       data:this.state.cartSize,
                                       type:this.state.type
                                   }}/>
                                   {
                                       this.state.noData?
                                           <NoData callback={this._onPressRefresh.bind(this)} />
                                       :
                                       this.state.noNet?
                                           <NoInter callback={this._onPressRefresh.bind(this)} />
                                       :
                                       <View style={{flex:1}}>
                                       <ScrollView>
                                           <View style={styles.bigView}>
                                                <TouchableOpacity onPress={this._openBigPic.bind(this)}>
                                                <View style={styles.topImage}>
                                                    <View  style={styles.viewImages}>
                                                    <LoadImg data={
                                                        {
                                                            width:Util.size.width,
                                                            height:Util.size.width*75/73,
                                                            uri:this.state.goods.goodsImg+'!m730x750.jpg',
                                                            dataSource:require('../../img/common/defaultReDetail.png')
                                                        }
                                                    } />
                                                        <View style={{ position:'absolute',top:0,left:0,width:30,height:30,justifyContent:'flex-start',alignItems:'flex-start' }}>
                                                        {
                                                            this.state.goods.goodsProperties==1?
                                                                <Image source={require('../../img/common/boy.png')} style={{width:30, height:30} }/>
                                                            :
                                                                <Image source={require('../../img/common/girl.png')} style={{width:30, height:30} }/>
                                                         }
                                                         </View>
                                                        <View style={[styles.goodsTop,{position: 'absolute',bottom: 0,left: 0}]}><Text numberOfLines={1} style={[styles.titleName,styles.writeColor]}>{this.state.goods.goodsName}</Text><Text style={[styles.price,styles.redColor]}>{Util.FuncRmbFormat(this.state.goods.shopPrice)}</Text></View>
                                                    </View>
                                                    {
                                                        this.state.goods.status!='02'?
                                                            <View style={[styles.xiaJ,{position:'absolute',top:0,left:0,width:Util.size.width,height:Util.size.width*75/73}]}>
                                                                <Image source={require('../../img/retailDetail/down.png')} resizeMode='contain' style={[styles.imgGood,{width:100,height:100}]} />
                                                                <Text style={ {fontSize:Util.fixedFont(28),color:'#fff',textAlign:'center'} }>已下架</Text>
                                                            </View>
                                                        :
                                                        null
                                                    }
                                                </View>
                                                </TouchableOpacity>
                                                <View style={styles.chiM}>
                                                    <View style={styles.selSize}>
                                                        {
                                                            this.state.goods.status!='02'|| this.state.goods.isBuy=='no'?
                                                                <View style={styles.sizeXia}>
                                                                    <Image source={require('../../img/retail/bai.png')} resizeMode='contain' style={[styles.imgGood,{width:25,height:25}]} />
                                                                    <Text style={[styles.writeColor,styles.fontLu]}>选择尺码</Text>
                                                                </View>
                                                            :
                                                                <TouchableOpacity onPress={this._checkedSize.bind(this)}>
                                                                    <View style={styles.sizeCur}>
                                                                        <Image source={require('../../img/retail/bai.png')} resizeMode='contain' style={[styles.imgGood,{width:25,height:25}]} />
                                                                        <Text style={[styles.writeColor,styles.fontLu]}>选择尺码</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                         }
                                                        {
                                                            this.state.selectSize!=null&&this.state.selectSize!=''?
                                                                <TouchableOpacity onPress={this._checkedSize.bind(this)}>
                                                                    <View style={{flex:1, flexDirection:'row', marginLeft:40,width:120}}>
                                                                        <View style={styles.currentSum}><Text style={styles.writeColor}>{this.state.goodsNumber}件</Text></View>
                                                                        <View style={styles.currentSize}><Text style={styles.writeColor}>{this.state.selectSize}</Text></View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            :
                                                            this.state.goods.status!='02'|| this.state.goods.isBuy=='no'?
                                                                <View style={styles.unCheckedize}><Text style={styles.writeColor}></Text></View>
                                                            :
                                                                <TouchableOpacity onPress={this._checkedSize.bind(this)}>
                                                                    <View style={styles.unCheckedize}><Text style={styles.writeColor}></Text></View>
                                                                </TouchableOpacity>

                                                        }
                                                        <View style={styles.rightList}><Image source={require('../../img/retailDetail/righ.png')} resizeMode='contain' style={{width:10,height:19}} /></View>
                                                    </View>
                                                </View>
                                                <View  style={styles.cont}>
                                                    <View>
                                                        {
                                                            this.state.showPage=='good'?
                                                            <View>
                                                                <View style={styles.goodText}>
                                                                   <TouchableOpacity onPress={this._goDetail.bind(this,'good')}>
                                                                       <View style={styles.goodDetail}><Text style={[styles.fontSi,styles.heiColor]}>商品详情</Text></View>
                                                                   </TouchableOpacity>
                                                                   <TouchableOpacity onPress={this._goDetail.bind(this,'supplier')}>
                                                                       <View style={styles.mInfo}><Text style={[styles.fontSi,styles.heiColor]}>厂家信息</Text></View>
                                                                   </TouchableOpacity>
                                                                </View>
                                                                <Image source={require('../../img/retailDetail/main_left.png')} resizeMode='contain' style={{position:absolute,bottom:5,left:0, width:Util.size.width, height:10}} />
                                                            </View>
                                                            :
                                                            <View>
                                                                 <View style={styles.goodText}>
                                                                    <TouchableOpacity onPress={this._goDetail.bind(this,'good')}>
                                                                        <View style={styles.goodDetail}><Text style={[styles.fontSi,styles.heiColor]}>商品详情</Text></View>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={this._goDetail.bind(this,'supplier')}>
                                                                        <View style={styles.mInfo}><Text style={[styles.fontSi,styles.heiColor]}>厂家信息</Text></View>
                                                                    </TouchableOpacity>
                                                                 </View>
                                                                 <Image source={require('../../img/retailDetail/main_right.png')} resizeMode='contain' style={{position:absolute,bottom:5,left:0, width:Util.size.width, height:10}} />
                                                            </View>
                                                        }
                                                    </View>
                                                    <View>
                                                        {
                                                            this.state.showPage=='good'?
                                                            <GoodDetail data={
                                                                {
                                                                    designConcept:this.state.goods.designConcept,
                                                                    picFileName:this.state.sunGoodsCategoryDTO.picFileName,
                                                                    goodsInfoImg:this.state.goods.goodsInfoImg,
                                                                    goodsAttImg:this.state.goods.goodsAttImg,
                                                                    isUniform:this.state.isUniform
                                                                }
                                                            }/>
                                                            :
                                                            <SupplierInfo data={
                                                                {
                                                                    supplierId:this.state.goods.suppliersId,
                                                                    token:this.state.token
                                                                }
                                                            } />
                                                        }
                                                    </View>
                                                </View>
                                           </View>
                                   </ScrollView>
                                    {
                                       this.state.goods.status=='02'?
                                           this.state.goods.isBuy=='no'?
                                               <View style={styles.buGou}>
                                                   <Text allowFontScaling={false} style={styles.writeColor}>{this.state.goods.deferredSalesTime}</Text><Text allowFontScaling={false} style={styles.writeColor}>起即可在学校零售商城补购、增购</Text>
                                               </View>
                                           :
                                               <View style={styles.addCar}>
                                                   <TouchableOpacity onPress={this.FuncFetchData.bind(this,{
                                                       fetchMethod:this._addShoppingCart,
                                                       fetchParamData:''

                                                   })}>
                                                       <View style={styles.adds}>
                                                       <View style={styles.addsIn}>
                                                            <Image source={require('../../img/retailDetail/b.png')} resizeMode='contain' style={[styles.imgGood,{width:24,height:21}]} />
                                                            <Text style={styles.graCfont}>加入购物车</Text>
                                                       </View>
                                                       </View>
                                                   </TouchableOpacity>

                                                   <TouchableOpacity onPress={this.onLine.bind(this)}>
                                                      <View style={styles.adds}>
                                                          <Image source={require('../../img/retailDetail/c.png')} resizeMode='contain' style={[styles.imgGood,{width:24,height:21}]} />
                                                          <Text style={styles.graCfont}>在线客服</Text>
                                                      </View>
                                                  </TouchableOpacity>
                                                   <TouchableOpacity onPress={this.buyGoodBtn.bind(this)}>
                                                       <View style={styles.buy}><Text style={{fontSize:Util.fixedFont(18),color:'#fff'}}>立即购买</Text></View>
                                                   </TouchableOpacity>
                                               </View>
                                       :
                                           <View style={styles.addCar}>
                                               <View style={styles.adds}>
                                               <Image source={require('../../img/retailDetail/b.png')} resizeMode='contain' style={[styles.imgGood,{width:24,height:21}]} />
                                               <Text style={styles.graCfont}>加入购物车</Text>
                                               </View>
                                               <TouchableOpacity onPress={this.onLine.bind(this)}>
                                                   <View style={styles.adds}>
                                                   <Image source={require('../../img/retailDetail/c.png')} resizeMode='contain' style={[styles.imgGood,{width:24,height:21}]} />
                                                   <Text style={styles.graCfont}>在线客服</Text>
                                                   </View>
                                               </TouchableOpacity>
                                               <View style={styles.xiaBuy}><Text style={{fontSize:Util.fixedFont(18),color:'#fff'}}>立即购买</Text></View>
                                           </View>
                                   }
                                   </View>

                                }
                           </View>

                            {
                               this.state.modalVisible?
                                  <SizeModal data={
                                      {goodsTypeId:this.state.goods.goodsTypeId,
                                      catId:this.state.goods.catId,
                                      goodsId:this.state.goodsId,
                                      token:this.state.token,
                                      sex:this.state.goods.goodsProperties,//2,//this.state.sunGoodsCategoryDTO.sex,
                                      goodsName:this.state.goods.goodsName,
                                      goodsImg:this.state.goods.goodsImg,
                                      checkedSize:this.state.selectSize,
                                      checkedSizeId:this.state.goodsAttr,
                                      buyNum:this.state.goodsNumber,
                                      formula:this.state.sunGoodsCategoryDTO.formula,
                                      isUniform:this.state.isUniform,
                                      sizeList:this.state.sizeList
                                      }
                                  } modalVisible={this.state.modalVisible} callback={this._callbackModalVisible.bind(this)} />
                                    :
                                    this.state.customSizeModal?
                                   <CustomSizeModal data={
                                       {goodsTypeId:this.state.goods.goodsTypeId,
                                       catId:this.state.goods.catId,
                                       goodsId:this.state.goodsId,
                                       token:this.state.token,
                                       sex:this.state.goods.goodsProperties,//2,//this.state.sunGoodsCategoryDTO.sex,
                                       goodsName:this.state.goods.goodsName,
                                       goodsImg:this.state.goods.goodsImg,
                                       height:this.state.height,
                                       weight:this.state.weight,
                                       customSizeList:this.state.customSizeList
                                       }
                                   } modalVisible={this.state.modalVisible} callback={this._callbackModalVisible.bind(this)} />
                                    :
                                    null
                           }
                        </View>
            }
            <NetInfo callback={this._getNetInfoState.bind(this)} />
            </View>
        );
    },

    //在线客服
        onLine:function(){
            RNBridgeModule.onlineClick('onLink');
        },
         //获取零售特体尺码列表
         _fetchSelectByTypeIdValue:function(param) {
            var _param=param.split(',');
            var height=_param[0];
            var weight=_param[1];
            var that=this;
            return new Promise(function (resolve, reject) {
                  var _q='?token='+that.state.token+'&goodsTypeId='+that.state.goods.goodsTypeId+'&catId='+that.state.goods.catId+'&sex='+that.state.goods.goodsProperties;
                  var baseUrl=Service.selectByTypeIdValue+_q;
                 Util.get(baseUrl,
                 function(data){
                    var _title=data.obj.title;
                    var _msgCode=data.msgCode;
                    if(_msgCode==1){
                        reject('noData');
                    }else if(_msgCode==99){
                        RNBridgeModule.toLogin('toLogin');
                    }else{
                        data.height=height;
                        data.weight=weight;
                        var _data={
                            data:data,
                            message:'selectByTypeIdValue'
                        }
                        resolve(_data);
                    }
                 },function(err){
                        reject('noNet');
                 });
            });
        },
    //监测网络状态
    _getNetInfoState:function(param){
        this.setState({
            noNet:param
        });
    },
    //点击刷新方法
    _onPressRefresh:function(param){
        //this.fetchData();
        var _param={
            fetchMethod:this.fetchData,
            fetchParamData:{}
        }
        this.FuncFetchData(_param);
    },
    _endReached:function(){
        this.getMoreData();
    },
    _onRefresh: function () {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            //this.fetchData();
            var _param={
                fetchMethod:this.fetchData,
                fetchParamData:{}
            }
            this.FuncFetchData(_param);
        }, 1000);
    },
    //立即购买
    buyGoodBtn:function(){
        if(btnDisabled==true){
            btnDisabled=false;//两秒钟内不能点击
            var _checkedSize=this.state.selectSize;
            if(_checkedSize!=null && _checkedSize!=''){
                this.setState({loaded:false});
                var _param={
                    fetchMethod:this._schoolGoodsDetail,
                    fetchParamData:''
                }
                this.FuncFetchData(_param);
               // this._schoolGoodsDetail();
            }else{
                this._checkedSize();
            }
            setTimeout(() => {
                btnDisabled=true;//两秒钟内不能点击
            }, 2000);
        }
    },
    //添加购物车
    _addShoppingCart:function(){
        var _checkedSize=this.state.selectSize;
        var that=this;
        return new Promise(function (resolve, reject) {
            if(_checkedSize!=null && _checkedSize!=''){
                var _cartSize=parseInt(that.state.cartSize);
                var _goodsNumber=parseInt(that.state.goodsNumber);
                //var _result =that._goodsNumberAble(_cartSize+_goodsNumber);//数量总和
                var _q='?token='+that.state.token+'&goodsId='+that.state.goods.goodsId+'&goodsAttr='+that.state.goodsAttr+'&selectSize='+that.state.selectSize+'&goodsNumber='+_goodsNumber;
                var _specialInfo='{"height":"'+that.state.height+'","weight":"'+that.state.weight+'","bust":"'+that.state.bust+'","waist":"'+that.state.waist+'","hip":"'+that.state.hip+'",'+
                    '"shoulderWidth":"'+that.state.shoulderWidth+'","sleeveLength":"'+that.state.sleeveLength+'","outsideLength":"'+that.state.outsideLength+'"}';
                var baseUrl=Service.addShopCartGoods+_q+'&specialInfo='+_specialInfo;
                Util.get(baseUrl,
                function(data){
                    var _msgCode=data.msgCode;
                    if(_msgCode==1){
                        reject('noData1');//不处理
                        ToastAndroid.show(data.obj.title, 2000);
                    }else if(_msgCode==99){
                        RNBridgeModule.toLogin('toLogin');
                    }else{
                       ToastAndroid.show(data.obj.title, 2000);
                        var _data={
                            data:_cartSize+_goodsNumber,
                            message:'addShopCartGoods'
                        }
                         resolve(_data);
                    }
                },function(err){
                    reject('noNet');
                });
            }else{
                reject('noData1');//不处理
                that._checkedSize();
            }
        });
    },
//验证数量不超过99
    _goodsNumberAble:function(goodsNumber){
        var result=true;
        var num = 99;
        if(goodsNumber>num){
            result=false;
        }else{
            result=true;
        };
        return result;
    },
    //立即购买提交方法
    _schoolGoodsDetail:function(){
        var that=this;
        return new Promise(function (resolve, reject) {
             var _q='?token='+that.state.token+'&goodsId='+that.state.goods.goodsId+'&goodsAttrId='+that.state.goodsAttr+'&goodsAttrValue='+that.state.selectSize+
             '&goodsNumber='+that.state.goodsNumber+'&isCart=1'+'&height='+that.state.height+'&weight='+that.state.weight+'&bust='+that.state.bust+
             '&waist='+that.state.waist+'&hip='+that.state.hip+'&shoulderWidth='+that.state.shoulderWidth+'&sleeveLength='+that.state.sleeveLength+'&outsideLength='+that.state.outsideLength;
              var baseUrl=Service.schoolGoodsDetail+_q;
             Util.get(baseUrl,
             function(data){
                var _title=data.obj.title;
                var _msgCode=data.msgCode;
                if(_msgCode==1){
                    reject('noData1');//不处理
                    ToastAndroid.show(_title,2000);
                }else if(_msgCode==99){
                    RNBridgeModule.toLogin('toLogin');
                }else{
                    var _data={
                        data:data,
                        message:'schoolGoodsDetail'
                    }
                     resolve(_data);
                }
             },function(err){
                    reject('noNet');
             });
        });
    },

    _callbackBodyMeasure:function(){
        this.setState({isBodyMeasure:false});
    },

    //选择尺码回调函数
    _callbackModalVisible(param){
        var _close=param.closeBtn;
        if(!_close){
            this.setState({
                 modalVisible: false,
                 customSizeModal:false,
                 selectSize:param.checkedSizeValue,
                 goodsAttr:param.checkedSizeId,
                 goodsNumber:param.buyNum
             });
        }else{
            if(_close=='customSizeModal'){
                var _param={
                    fetchMethod:this._fetchSelectByTypeIdValue,
                    fetchParamData:param.height+','+param.weight
                }
                this.FuncFetchData(_param);
                //this._fetchSelectByTypeIdValue(param.height,param.weight);//获取特体尺码列表
            }else if(_close=='bodyMeasure'){
                this.setState({isBodyMeasure:true});
                this.props.navigator.push({
                   title: '身体数据测量方法',
                   component: BodyMeasure,
                   params:{
                    callback:this._callbackBodyMeasure
                   }
                });
            }else if(_close=='customSizeConfirm'){
                this.setState({
                     modalVisible: false,
                     customSizeModal:false,
                     selectSize:param.checkedSizeValue,
                     goodsAttr:param.checkedSizeId,
                     goodsNumber:param.buyNum,
                     height:param.customSizeData.height,
                     weight:param.customSizeData.weight,
                     bust:param.customSizeData.bust,
                     waist:param.customSizeData.waist,
                     hip:param.customSizeData.hip,
                     shoulderWidth:param.customSizeData.shoulderWidth,
                     sleeveLength:param.customSizeData.sleeveLength,
                     outsideLength:param.customSizeData.trousersLength
                 });
            }else{
                this.setState({
                     modalVisible: false,
                     customSizeModal:false
                 });
            }
        }
    },
    //选择尺码
    _checkedSize:function(){
        var _status=this.state.goods.status;
        if(_status=='02'){
            this.setState({
                 modalVisible:true
            })
        }
    },
    //点击大图关闭大图，显示商品详情页面
    _callback(param) {
        this.setState({
            showBigPic: param
        });

    },
    //点击显示大图
    _openBigPic:function(){
        var _status=this.state.goods.status;
        if(_status=='02'){
            this.setState({
                showBigPic:true
            });
        }
    },
    //点击进入商品详情或者厂家信息
    _goDetail:function(param){
        this.setState({
            showPage:param
        });
    },
    renderLoadingView: function() {
        return (
        <View>
                                           <Header navigator={this.props.navigator} initObj={{
                                               backName:this.state.initRoute,//retailDetail,orderRetailDetail,cartRetailDetail
                                               title:'商品详情',
                                               show:true,
                                               data:this.state.cartSize,
                                               type:this.state.type
                                           }}/>
            <View style={styles.container}>
                <Image source={require('../../img/common/loading.gif')} style={{width: 25, height:25} }  />
            </View>
         </View>
        );
    },
});
var styles = StyleSheet.create({
    container:{
        width:Util.size.width,
        height:Util.size.height,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f7f7f7'
    },
    bigView:{
        flex:1,
        backgroundColor:'#f7f7f7'
    },
    fontLu:{
        fontSize:Util.fixedFont(14)
    },
    goodsTop:{
        flex:1,
        flexDirection:'row',
        opacity:0.7,
        backgroundColor:'#000',
        width:Util.size.width,
        height:40,
        alignItems:'center',
        paddingLeft:14
    },
    titleName:{
        width:0.7*Util.size.width,
        fontSize:Util.fixedFont(13)
    },
    price:{
        width:0.3*Util.size.width,
        fontSize:Util.fixedFont(15)
    },
    writeColor:{
        color:'#fff',
        opacity:1,
        fontSize:Util.fixedFont(13)
    },
    redColor:{
        color:'#f04f43'
    },
    heiColor:{
        color:'#333'
    },
    topImage:{
        width:Util.size.width
    },
    viewImages:{
        width:Util.size.width,
        height:Util.size.width*75/73,
        backgroundColor:'#fff'
    },
    addCar:{
        flex:1,
        flexDirection:'row',
        height:50,
        position:'absolute',
        bottom:0,
        left:0
    },
    buy:{
        width:Util.size.width/3,
        height:50,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:0,
        backgroundColor:'#f04f43'
    },
    xiaBuy:{
        width:Util.size.width/3,
        height:50,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:0,
        backgroundColor:'#bebebe'
    },
       graCfont:{
       color:'#888888',
       fontSize:Util.fixedFont(12)
       },
    adds:{
        width:Util.size.width/3,
        height:50,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:0,
        backgroundColor:'#fff',
        flex:1,
        flexDirection:'row'
    },
    addsIn:{
        borderRightColor:'#bebebe',
        borderRightWidth:0.5,
        height:35,
        width:Util.size.width/3,
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingRight:10
    },
    fontSi:{
        fontSize:Util.fixedFont(15),
        color:'#333'
    },
    goodText:{
        flex:1,
        flexDirection:'row',
        height:44
    },
    selSize:{
        width:Util.size.width,
        height:35,
        flex:1,
        flexDirection:'row'
    },
    chiM:{
        width:Util.size.width,
        height:35,
        backgroundColor:'#fff',
        marginBottom:14,
        marginTop:14,
        borderBottomWidth:0.5,
        borderStyle:'solid',
        borderBottomColor:'#f7f7f7'
    },
    imgGood:{
        width:20,
        marginRight:8,
        marginLeft:8
    },
    cont:{
        width:Util.size.width,
        backgroundColor:'#fff',
        paddingBottom:10
    },
    sizeCur:{
        width:105,
        height:35,
        backgroundColor:'#4bb270',
        alignItems:'center',
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        marginRight:15
    },
    currentSum:{
        width:40,
        height:25,
        backgroundColor:'#4bb270',
        alignItems:'center',
        justifyContent: 'center',
        marginTop:5
    },
    currentSize:{
        width:60,
        height:25,
        backgroundColor:'#4bb270',
        alignItems:'center',
        justifyContent: 'center',
        marginLeft:20,
        marginTop:5
    },
    unCheckedize:{
        width:60,
        height:25,
        backgroundColor:'#fff',
        marginLeft:100,
        alignItems:'center',
        justifyContent: 'center',
        marginTop:5
        },
    rightList:{
        justifyContent:'center',
        width:10,
        height:35,
        marginLeft:15,
        marginRight:32,
        alignItems:'flex-end'
    },
    goodDetail:{
        width:Util.size.width/2,
        height:40,
        backgroundColor:'#fff',
        justifyContent: 'center',
        alignItems:'center',
        borderColor:'#e0e0e0',
        borderRightWidth:1,
        marginTop:2,
        marginBottom:2
    },
    mInfo:{
        width:Util.size.width/2,
        height:40,
        backgroundColor:'#fff',
        justifyContent: 'center',
        alignItems:'center',
        marginTop:2,
        marginBottom:2
    },
    xiaJ:{
        backgroundColor:'#000',
        opacity:0.7,
        justifyContent:'center',
        alignItems:'center'
    },
    sizeXia:{
        width:105,
        height:35,
        backgroundColor:'#b0b0b0',
        alignItems:'center',
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        marginRight:15
    },
    buGou:{
        width:Util.size.width,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        flexDirection:'row',
        backgroundColor:'#e0e0e0',
        position:'absolute',
        bottom:0,
        left:0
    }

});
module.exports=RetailDetail;


