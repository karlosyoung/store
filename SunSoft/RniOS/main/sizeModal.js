/**
 * Created by qiaozm on 2016/7/7.
 * 尺码弹出组件
 */
import Util from '../../common/Util';
import Service from '../../common/service';
import React,{Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TextInput,
    ToastAndroid,
    Platform,
    TouchableOpacity,
    ScrollView
} from'react-native';
var { NativeModules } = require('react-native');
var RNBridgeModule=NativeModules.RNBridgeModule;
var sizeModal = React.createClass({
    getInitialState() {

        return {
            buyNum:'1',
            loaded:true,
            animationType: 'slide',
            modalVisible: this.props.modalVisible,
            transparent: true,
            isUniform:this.props.data.isUniform,   //是否为制服
            sizeList:this.props.data.sizeList,  //尺码列表
            checkedSizeValue:'',//this.props.data.checkedSize,  //选中的尺码值,
            checkedSizeId:'',//this.props.data.checkedSizeId,  //选中的尺码ID
           data:this.props.data
        };
    },

    componentDidMount: function () {
       // alert(this.props.data.token);
       //this._fetchData();
    },
    componentWillMount:function() {
    },
    _fetchData: function() {
         var _q='?token='+this.props.data.token+'&goodsTypeId='+this.props.data.goodsTypeId+'&catId='+this.props.data.catId+'&goodsId='+this.props.data.goodsId+'&sex='+this.props.data.sex;
         var baseUrl=Service.getSizeInfo+_q;
         var that=this;
         Util.get(baseUrl,
         function(data){
            var _msgCode=data.msgCode;
            if(_msgCode==1){
                //alert('异常');
            }else if(_msgCode==99){
                RNBridgeModule.toLogin('toLogin');
            }else{
                var _body=data.obj.body;
                var _isUniform=_body.goodsCategory.isUniform;//是否为制服  true为制服 false不是制服;
                var _sizeList=_body.list;
                that.setState({
                    isUniform:_isUniform,
                    sizeList:_sizeList,
                    loaded:true
                });
            }
         },function(err){
                //alert(err);
            });
    },
    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    },
    _closeSizeModal(visible){
        var _closeBtn=visible.closeBtn;
        if(_closeBtn){
           this.props.callback(visible);
        }else{
              if(this.state.checkedSizeValue==null || this.state.checkedSizeValue==''){
                   RNBridgeModule.toast('请选择尺码');
               }else{
                   this.props.callback(visible);
               }
        }
    },

    _setAnimationType(type) {
        this.setState({animationType: type});
    },

    _toggleTransparent() {
        this.setState({transparent: !this.state.transparent});
    },
    render() {
            if (this.state == null || !this.state.loaded) {
                return this.renderLoadingView();
            }
        var _sizeViewList=this._initSizeViewList();  //生成尺码列表
        return (
            <View style={styles.viewV}>
                     <TouchableOpacity style={styles.containerBig} onPress={this._closeSizeModal.bind(this, {
                         checkedSizeValue:this.state.checkedSizeValue,
                         checkedSizeId:this.state.checkedSizeId,
                         buyNum:this.state.buyNum,
                         closeBtn:true
                     })}>
                        <View style={styles.containerBigView}></View>
                    </TouchableOpacity>
                            <View style={styles.sizeCon}>
                                <View style={styles.sizeTop}>
                                    <View style={styles.leftView}></View>
                                    <View style={styles.leftPosition}>
                                         <Image defaultSource={require('../../img/common/defaultReDetail.png')} source={{uri: this.state.data.goodsImg+'!m166x166.jpg'}} style={[styles.goodImg,{borderRadius:6}]} />
                <View style={{ position:'absolute',top:0,left:0,width:30,height:30,justifyContent:'flex-start',alignItems:'flex-start' }}>
                {
                this.state.data.sex==1?
                <Image source={require('../../img/common/boy.png')} style={{width:30, height:30} }/>
                :
                <Image source={require('../../img/common/girl.png')} style={{width:30, height:30} }/>
                }
                </View>
                                    </View>
                                    <View style={styles.sizeWen}>
                                        <View style={[styles.yiHang,styles.xuHeight]}>
                                            <View style={styles.sizeCons}><Text allowFontScaling={false} numberOfLines={1} style={styles.sizeTitle}>{this.state.data.goodsName}</Text></View>
                                            <TouchableOpacity onPress={this._closeSizeModal.bind(this, {
                                                checkedSizeValue:this.state.checkedSizeValue,
                                                checkedSizeId:this.state.checkedSizeId,
                                                buyNum:this.state.buyNum,
                                                closeBtn:true
                                            })}>
                                                <Image source={require('../../img/retail/Close.png')} resizeMode='contain' style={[styles.closeBtn,{width:22,height:22}]} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.sizeNum}><Text allowFontScaling={false} style={styles.suLi}>请选择尺码和购买数量</Text></View>
                                    </View>
                                </View>

                                <View style={styles.sizeConIn}>

                                    <View style={styles.zhiSize}>
                                        <View style={styles.yiHang}>
                                            <Image source={require('../../img/retail/zhi.png')} resizeMode='contain' style={[styles.flexImg,{width:22}]} />
                                            <Text allowFontScaling={false} style={styles.sizeBig}>智能尺码助手</Text>
                                        </View>
                                        <View style={styles.goodSize}>
                                            <View style={styles.bottomSize}>
                                                <TextInput placeholder="身高"  keyboardType="numeric" value={this.state.heightValue} placeholderTextColor="#b0b0b0" ref="heightInput" onChangeText={this._getHeightValue} style={[styles.cenText,styles.shuRu,{fontSize:12}]}>
                                                </TextInput>
                                               <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                            </View>
                                            <View style={styles.lineHeight}><Text allowFontScaling={false} style={[styles.greenColor,styles.fontSi]}>厘米</Text></View>
                                            <Image source={require('../../img/retailDetail/j.png')} resizeMode='contain' style={{ width:14,marginLeft:3,marginRight:3,height:33}} />
                                            <View style={styles.bottomSize}>
                                                <TextInput placeholder="体重" keyboardType="numeric" value={this.state.widthValue}  placeholderTextColor="#b0b0b0" ref="widthInput" onChangeText={this._getWidthValue} style={[styles.cenText,styles.shuRu,{fontSize:12}]}>
                                                </TextInput>
                                                <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                            </View>
                                            <View style={styles.lineHeight}><Text allowFontScaling={false} style={[styles.greenColor,styles.fontSi]}>公斤</Text></View>
                                            <Image source={require('../../img/retailDetail/d.png')} resizeMode='contain' style={{ width:14,marginLeft:3,marginRight:3,height:33}} />
                                            <TouchableOpacity onPress={this._validateValue.bind(this)}>
                                                <View style={styles.resultSize}>
                                                    <Text allowFontScaling={false}  style={[styles.cenText,styles.greenColor,{height:30,lineHeight:22}]}>尺码计算</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.selectSize}>
                                        <View style={styles.yiHang}>
                                            <Image source={require('../../img/retail/rule.png')} resizeMode='contain' style={[styles.flexImg,{width:22}]} />
                                            <Text allowFontScaling={false} style={styles.sizeBig}>选择尺码</Text>
                                        </View>
                                        <View>
                                            <View style={styles.goodSize}>
                                                {_sizeViewList}
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.yiHang,styles.containE]}>
                                        <View style={styles.leftD}>
                                            <Text allowFontScaling={false} style={styles.buyNum}>购买数量</Text>
                                            <View style={styles.yiHang}>
                                                <TouchableOpacity onPress={this._RducteEvent.bind(this)}>
                                                    <Image source={require('../../img/retail/jian.png')} resizeMode='contain' style={styles.fuHao} />
                                                </TouchableOpacity>
                                                <View style={styles.yiHang,styles.containT}>
                                                    <TextInput value={this.state.buyNum} editable={false}  style={styles.number}></TextInput>
                                                </View>
                                                <TouchableOpacity onPress={this._AddNumEvent.bind(this)}>
                                                    <Image source={require('../../img/retail/jia.png')} resizeMode='contain' style={styles.fuHao} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={this._closeSizeModal.bind(this,{
                                                  checkedSizeValue:this.state.checkedSizeValue,
                                                  checkedSizeId:this.state.checkedSizeId,
                                                  buyNum:this.state.buyNum,
                                                  closeBtn:false
                                              })}>
                                            <View style={styles.borderRad}><Text allowFontScaling={false} style={styles.sureBtn}>确定</Text></View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            {
                                this.state.showIosToast?
                                    <View style={[styles.toastIos,{position:'absolute',top:150,left:75}]}>
                                        <Text allowFontScaling={false} style={styles.toaColor}>{this.state.toastMsg}</Text>
                                    </View>
                                    :
                                    null
                            }
            </View>
        );
    },
    renderLoadingView: function () {
        return (
            <View style={styles.container}>
            </View>
        );
    },
    _initSizeViewList:function(){
        var itemList=[];
        var _sizeList=this.state.sizeList;
        if(_sizeList!=null && _sizeList.length>0){
            for(var i=0;i<_sizeList.length;i++){
                var item=_sizeList[i];
                var _clothingSizeValue=item.clothingSizeValue;
                if(this.state.checkedSizeValue==_clothingSizeValue){
                   // checkedSizeId=item.checkedSizeId;
                     itemList[i]=(
                        <TouchableOpacity onPress={this._onPressSizeList.bind(this,{
                           clothingSizeValue:item.clothingSizeValue,
                           clothingSizeId:item.clothingSizeId
                       })}>
                            <View style={styles.selectedSize}>
                                <Text allowFontScaling={false} style={[styles.writeColor,styles.tenTwo]}>{item.clothingSizeValue}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }else{
                    itemList[i]=(
                        <TouchableOpacity onPress={this._onPressSizeList.bind(this,{
                            clothingSizeValue:item.clothingSizeValue,
                            clothingSizeId:item.clothingSizeId
                        })}>
                            <View style={styles.selSize}>
                                <Text allowFontScaling={false} style={[styles.grayColor,styles.tenTwo]}>{item.clothingSizeValue}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }
            }
        };
        return itemList;
    },
    //尺码列表点击事件
    _onPressSizeList:function(data){
        this.setState({
            checkedSizeValue:data.clothingSizeValue,
            checkedSizeId:data.clothingSizeId,
            heightValue:'',
            widthValue:''
        });
    },

    //身高输入框内容变化调用
    _getHeightValue: function (val) {
        var _height=this.state.heightValue;
        if(Util.FuncStrFormateSpace4(val)){
            this.setState({
               heightValue:Util.FuncStrFormateSpace3(val)
            });
        }else{
            if(!isNaN(Util.FuncStrFormateSpace3(val))){
                if(Util.FuncStrFormateSpace3(val)!='' && Util.FuncStrFormateSpace3(val)!=0){
                    this.setState({
                       heightValue:_height
                    });
                }else{
                  this.setState({
                     heightValue:''
                  });
                }
            }else{
                var _str=Util.FuncStrFormateSpace3(val);
                if(!isNaN(_str.substring(0,_str.length-1))){
                    this.setState({
                        heightValue:_str.substring(0,_str.length-1)
                   });
                }else{
                    this.setState({
                        heightValue:''
                    });
               }
            }
        }
    },

    //体重输入框内容变化调用
    _getWidthValue: function (val) {
        var _widthValue=this.state.widthValue;
        if(Util.FuncStrFormateSpace5(val)){
            this.setState({
               widthValue:Util.FuncStrFormateSpace3(val)
            });
        }else{
            var _str=Util.FuncStrFormateSpace3(val);
           if(_str.substring(_str.length-1)=='.' && _str.substring(0,_str.length-1).indexOf('.')<0){
                if(_str!='.'){
                    this.setState({
                       widthValue:Util.FuncStrFormateSpace3(val)
                    });
                }else{
                    this.setState({
                       widthValue:''
                    });
                }
            }else{
                if(Util.FuncStrFormateSpace3(val)!='' && Util.FuncStrFormateSpace3(val)!=0){
                    this.setState({
                       widthValue:_widthValue
                    });
                }else{
                  this.setState({
                     widthValue:''
                  });
                }
            }
        }
    },

    //设置toast显示，2秒钟以后隐藏<Ios使用>
    _setTimeOutFun:function(){
        var that=this;
        var timeoutID=setTimeout(function () {
            that.setState({
                showIosToast:false
            });
            if(timeoutID){
                clearTimeout(timeoutID);
            }
        },2000)
    },
    //开始计算按钮
    _validateValue:function(){
        var heightValue=this.state.heightValue;
        var widthValue=this.state.widthValue;
        var result=false;
        if(heightValue!=null && heightValue!=''){
            if(heightValue>0 && heightValue<1000){
                result=true;
            }else{
                RNBridgeModule.toast('输入错误，格式如175厘米，85.9公斤。');
            }
        }else{
            RNBridgeModule.toast('输入错误，格式如175厘米，85.9公斤。');
        }
        if(result){
            if(widthValue!=null && widthValue!=''){
                if(widthValue.substring(widthValue.length-1)=='.'){
                    RNBridgeModule.toast('输入错误，格式如175厘米，85.9公斤。');
                }else{
                    if(widthValue>0 && widthValue<1000){
                        this._getComputeClothingSize();
                    }else{
                         RNBridgeModule.toast('输入错误，格式如175厘米，85.9公斤。');
                    }
                }
            }else{
                 RNBridgeModule.toast('输入错误，格式如175厘米，85.9公斤。');
            }
        }
    },

    //增加购买数量
    _AddNumEvent:function(){
        var _buyNum=parseInt(this.state.buyNum)+1;
        this.setState({
            buyNum:_buyNum+''
        });
    },

    //减少购买数量
    _RducteEvent:function(){
        var _buyNum=parseInt(this.state.buyNum)-1;
        if(_buyNum<1){
             if(Platform.OS=='ios'){
                    RNBridgeModule.toast('购买数量至少为一件');
             }else{
                    ToastAndroid.show('购买数量至少为一件', 2000);
            }
        }else{
          this.setState({
             buyNum:_buyNum+''
           });
        }
    },

     //回调函数
        _callbackBody(param){
            this.setState({
                 BodySize: true
             });
        },

    renderLoadingView: function () {
        return (
            <View style={styles.container}>
            </View>
        );
    },

     //跳转到测量尺码
        _bodySize:function(_data){
            this.props.navigator.push({
                component:BodyMeasure
            });
        },

    //获取推荐尺码
    _getComputeClothingSize:function(){
        var _q='?token='+this.state.data.token+'&goodsId='+this.state.data.goodsId+
        '&formula='+this.state.data.formula+'&sex='+this.state.data.sex+'&goodsTypeId='+this.state.data.goodsTypeId+'&catId='+this.state.data.catId+'&height='+this.state.heightValue+'&weight='+this.state.widthValue;
        var baseUrl=Service.computeClothingSize+_q;
        var that=this;
        Util.get(baseUrl,function(data){
            var _msgCode=data.msgCode;
            if(_msgCode==1){
                ToastAndroid.show(_message, 2000);
            }else if(_msgCode==99){
                RNBridgeModule.toLogin('toLogin');
            }else{
                var bodyStr='';
                var _clothingSizeId='';
                if(data.obj.body.clothingSizeValue==null || data.obj.body.clothingSizeValue==''){
                    bodyStr='';
                }else{
                    bodyStr=data.obj.body.clothingSizeValue;
                    _clothingSizeId=data.obj.body.clothingSizeId;
                }
                if(bodyStr.indexOf('||')>=0){
                    var _chima=bodyStr.substring(bodyStr.indexOf('||')+2);
                    var _tip=bodyStr.substring(0,bodyStr.indexOf('||'));
                    that.setState({
                        checkedSizeValue:_tip,
                        checkedSizeId:_clothingSizeId
                    });
                }else{
                   if(bodyStr=='特体'){
                       var _data={
                            height:that.state.heightValue,
                            weight:that.state.widthValue,
                            closeBtn:'customSizeModal'
                       };
                       that._closeSizeModal(_data);
                   }else{
                        that.setState({
                            checkedSizeValue:bodyStr,
                            checkedSizeId:_clothingSizeId
                        });
                   }
                }
            }
        },function(err){
            //alert(err);
        });
    }
});

var styles = StyleSheet.create({
    fontSi:{
        fontSize:11,
        height:30,
        lineHeight:28
    },
    leftView:{
        height:60,
        width:90,
        backgroundColor:'#f7f7f7',
        marginTop:40
    },
    leftPosition:{
        width:80,
        height:80,
        position:'absolute',
        left:10,
        bottom:0,
        borderRadius:6,
        backgroundColor:'#f7f7f7'
    },
    tenTwo:{
        fontSize:12,
        height:19,
        lineHeight:16,
        width:(Util.size.width-60)/5,
        textAlign:'center'
    },
    greenColor:{
        color:'#4bb270',
        fontSize:Util.fixedFont(12)
    },
    toaColor:{
        color:'#fff'
    },
    orange:{
        color:'orange',
        marginTop:11,
        marginLeft:10
    },
    toastIos:{
        position:'absolute',
        width:Util.size.width-150,
        height:70,
        flex:1,
        bottom:40,
        justifyContent:'center',
        backgroundColor:'#333',
        borderRadius:10,
        alignItems:'center'
    },
    viewV:{
        paddingBottom:0,
        width:Util.size.width,
        flex:1,
        position:'absolute',
        bottom:0,
        left:0
    },
    container: {
        flex: 1,
        justifyContent:'flex-end',
        width:Util.size.width
    },
    containerBig:{
        position:'absolute',
        bottom:0,
        left:0,
        height:Util.size.height,
        justifyContent:'flex-end',
        width:Util.size.width
    },
    containerBigView:{
         flex: 1,
        justifyContent:'flex-end',
        width:Util.size.width,
        backgroundColor:'#000',
        opacity:0.7
    },
    sizeCon:{
        flex:1,
        width:Util.size.width
    },
    sizeConIn:{
        backgroundColor:'#f7f7f7'
    },
    grayColor:{
        color:'#929292'
    },
    cenText:{
        textAlign:'center',
        alignItems:'center'
    },
    shuRu:{
        height:40,
        backgroundColor:'#f7f7f7'
    },
    resultSize:{
        borderColor:'#4bb270',
        borderWidth:1,
        width:95,
        height:33,
        marginLeft:10,
        alignItems:'center',
        justifyContent:'center'
    },
    writeColor:{
        color:'#fff'
    },
    sizeTop:{
        flex:1,
        flexDirection:'row',
        width:Util.size.width,
        borderBottomColor:'#e0e0e0',
        borderBottomWidth:1,
        height:100
    },
    goodImg:{
        width:80,
        height:80
    },
    selectSize:{
        width:Util.size.width,
    },
    sureBtn:{
        color:'#fff',
        marginTop:15,
        marginBottom:15,
        height:30,
        lineHeight:22
    },
    borderRad:{
        width:90,
        height:30,
        backgroundColor:'orange',
        justifyContent:'center',
        borderRadius:4,
        alignItems:'center',
        marginTop:29,
        marginRight:20,
    	marginLeft:Util.size.width-310
    },
    leftD:{
        width:200,
        marginTop:7,
        justifyContent:'center',
                               alignItems:'center',
                               paddingLeft:10,
                               height:55
                               },
                               buyNum:{
        fontSize:14,
                               height:20,
                               lineHeight:16
    },
                               containT:{
                               justifyContent:'center',
                               marginLeft:20,
                               marginRight:20,
                               width:80,
                               height:30,
                               alignItems:'center'
                               },
                               number:{
                               backgroundColor:'#fff',
                               width:76,
                               height:31,
                               borderColor:'#e0e0e0',
                               borderWidth:1,
                               borderRadius:10,
                               textAlign:'center',
                               marginTop:3
                               },
                               fuHao:{
                               width:30,
                               height:30,
                               marginRight:0,
                               marginLeft:0,
                               marginTop:2
                               },
                               zhiSize:{
                               width:Util.size.width,
        backgroundColor:'#f7f7f7'
    },
    goodSize:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        paddingLeft:4,
        paddingRight:4,
        width:Util.size.width
    },
    sizeBig:{
        color:'#4bb270',
        fontSize:15,
        marginLeft:10,
        marginTop:10,
        height:30
    },
    instructions:{
        color:'red',
        fontSize:10,
        marginLeft:10,
        height:25
    },
    goodText:{
        flex:1,
        flexDirection:'row'
    },
    conText:{
        width:Util.size.width,
        height:46,
        justifyContent: 'center',
        borderBottomColor:'#b0b0b0',
        borderBottomWidth:1
    },
    containE:{
        width:Util.size.width,
        paddingLeft:4,
        paddingRight:4,
        flex:1,
        backgroundColor:'#f7f7f7'
    },
    sizeWen:{
        width:Util.size.width-90,
        height:60,
        backgroundColor:'#f7f7f7',
        marginTop:40,
        paddingLeft:10
    },
    sizeCons:{
        marginTop:5,
        width:Util.size.width-144,
        textAlign:'left',
        height:35
    },
    sizeTitle:{
        marginBottom:5,
        marginTop:5,
        height:35,
        color:'#333',
        fontSize:16
    },
    bottomSize:{
        width:(Util.size.width-220)/2,
        height:40,
        marginLeft:4,
        marginRight:4,
        justifyContent:'center'
    },
    selSize:{
        width:(Util.size.width-50)/5,
        height:21,
        marginLeft:4,
        marginRight:4,
        borderColor:'#b0b0b0',
        borderWidth:1,
        marginBottom:5,
        justifyContent:'center',
        alignItems:'center'
    },
    selectedSize:{
        width:(Util.size.width-50)/5,
        height:21,
        backgroundColor:'#4bb270',
        marginLeft:4,
        marginRight:4,
        borderWidth:1,
        borderColor:'#4bb270',
        marginBottom:5,
        justifyContent:'center',
        alignItems:'center'
    },
    yiHang:{
        flex:1,
        flexDirection:'row'
    },
    suLi:{
        height:20,
        justifyContent:'center',
        color:'#929292'
    },
    closeBtn:{
        marginTop:10,
        justifyContent:'flex-end'
},
    flexImg:{
        marginLeft:15
    },
    xuHeight:{
        height:20,
        width:Util.size.width-100,
        justifyContent:'flex-end',
        paddingRight:20
    },
    sizeNum:{
        width:Util.size.width-175
    },
    diLine:{
        width:(Util.size.width-240)/2,
        height:15,
        marginLeft:3,
        marginRight:3
    },
    lineHeight:{
        height:50,
        width:25,
        justifyContent:'center'
    },
    topPad:{
        position:'absolute',
        top:0
    }
                        
});

module.exports=sizeModal;