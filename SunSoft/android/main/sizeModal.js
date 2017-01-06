/**
 * Created by qiaozm on 2016/7/7.
 * 尺码弹出组件
 */
import Util from '../../common/Util';
import Service from '../../common/service';
import React,{Component} from 'react';
import Loading from '../../common/loading';
import LoadImg from '../../common/loadImg';
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
           data:this.props.data,
           isClearInput:false,
           ShowLoading:false,
           isAddNum:true   //true表示加按钮可用，false表示不可用
        };
    },

    componentDidMount: function () {
    },
    componentWillMount:function() {
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
                   ToastAndroid.show('请选择尺码', 2000);
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
        <View style={{width:Util.size.width,flex:1}}>
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
                        <LoadImg style={styles.goodImg} data={
                            {
                                width:76,
                                height:76,
                                uri:this.state.data.goodsImg+'!m166x166.jpg',
                                dataSource:require('../../img/common/defaultReDetail.png')
                            }
                        } />
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
                                <View style={styles.sizeCons}><Text numberOfLines={1} style={styles.sizeTitle}>{this.state.data.goodsName}</Text></View>
                                <TouchableOpacity onPress={this._closeSizeModal.bind(this, {
                                    checkedSizeValue:this.state.checkedSizeValue,
                                    checkedSizeId:this.state.checkedSizeId,
                                    buyNum:this.state.buyNum,
                                    closeBtn:true
                                })}>
                                    <Image source={require('../../img/retail/Close.png')} resizeMode='contain' style={[styles.closeBtn,{width:22,height:22}]} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.sizeNum}><Text style={styles.suLi}>请选择尺码和购买数量</Text></View>
                        </View>
                    </View>
                    <View style={styles.sizeConIn}>
                        <View style={styles.zhiSize}>
                            <View style={styles.yiHang}>
                                <Image source={require('../../img/retail/zhi.png')} resizeMode='contain' style={[styles.flexImg,{width:22}]} />
                                <Text style={styles.sizeBig}>智能尺码助手</Text>
                            </View>
                            <View style={styles.goodSize}>
                                <View style={styles.bottomSize}>
                                    <TextInput placeholder="身高"  keyboardType="numeric" value={this.state.heightValue} placeholderTextColor="#b0b0b0" ref="heightInput" onChangeText={this._getHeightValue} style={[styles.cenText,styles.shuRu,{fontSize:Util.fixedFont(12)}]}>
                                    </TextInput>
                                   <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                </View>
                                <View style={styles.lineHeight}><Text style={styles.greenColor}>厘米</Text></View>
                                <Image source={require('../../img/retailDetail/j.png')} resizeMode='contain' style={{ width:14,marginLeft:3,marginRight:3,height:33}} />
                                <View style={styles.bottomSize}>
                                    <TextInput placeholder="体重" keyboardType="numeric" value={this.state.widthValue}  placeholderTextColor="#b0b0b0" ref="widthInput" onChangeText={this._getWidthValue} style={[styles.cenText,styles.shuRu,{fontSize:Util.fixedFont(12)}]}>
                                    </TextInput>
                                    <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                </View>
                                <View style={styles.lineHeight}><Text style={styles.greenColor}>公斤</Text></View>
                                <Image source={require('../../img/retailDetail/d.png')} resizeMode='contain' style={{ width:14,marginLeft:3,marginRight:3,height:33}} />
                                <TouchableOpacity onPress={this._validateValue.bind(this)}>
                                    <View style={styles.resultSize}>
                                        <Text style={[styles.cenText,styles.greenColor]}>尺码计算</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.selectSize}>
                            <View style={styles.yiHang}>
                                <Image source={require('../../img/retail/rule.png')} resizeMode='contain' style={[styles.flexImg,{width:22}]} />
                                <Text style={styles.sizeBig}>选择尺码</Text>
                            </View>
                            <View>
                                <View style={styles.goodSize}>
                                    {_sizeViewList}
                                </View>
                            </View>
                        </View>
                        <View style={[styles.yiHang,styles.containE]}>
                            <View style={styles.leftD}>
                                <Text style={styles.buyNum}>购买数量</Text>
                                <View style={styles.yiHang}>
                                    <TouchableOpacity onPress={this._RducteEvent.bind(this)}>
                                        <Image source={require('../../img/retail/jian.png')} resizeMode='contain' style={styles.fuHao} />
                                    </TouchableOpacity>
                                    <View style={styles.yiHang,styles.containT}>
                                        <Image source={require('../../img/retail/number.png')} resizeMode='contain' style={styles.addNumber} />
                                        <TextInput value={this.state.buyNum} editable={false} maxLength={5} style={styles.number}></TextInput>
                                    </View>
                                    <TouchableOpacity onPress={this._AddNumEvent.bind(this)}>
                                    {
                                        this.state.isAddNum?
                                            <Image source={require('../../img/retail/jia.png')} resizeMode='contain' style={styles.fuHao} />
                                        :
                                            <Image source={require('../../img/retail/grayJia.png')} resizeMode='contain' style={styles.fuHao} />
                                    }

                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity onPress={this._closeSizeModal.bind(this,{
                                      checkedSizeValue:this.state.checkedSizeValue,
                                      checkedSizeId:this.state.checkedSizeId,
                                      buyNum:this.state.buyNum,
                                      closeBtn:false
                                  })}>
                                <View style={styles.borderRad}><Text style={styles.sureBtn}>确定</Text></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {
                    this.state.showIosToast?
                        <View style={[styles.toastIos,{position:'absolute',top:150,left:75}]}>
                            <Text style={styles.toaColor}>{this.state.toastMsg}</Text>
                        </View>
                        :
                        null
                }
            </View>
            {
            this.state.ShowLoading?
            <Loading />
            :
            null
            }
        </View>
        );
    },

    //增加购买数量
        _AddNumEvent:function(){
            var _buyNum=parseInt(this.state.buyNum)+1;
            if(_buyNum>99){
                ToastAndroid.show('商品数量超过上限', 2000);
                this.setState({isAddNum:false});
            }else{
                this.setState({
                    buyNum:_buyNum+''
                });
            }
        },

    //减少购买数量
        _RducteEvent:function(){
            var _buyNum=parseInt(this.state.buyNum)-1;
            if(_buyNum==99){
                this.setState({isAddNum:true});
            }else if(_buyNum<1){
                if(Platform.OS=='ios'){
                    this.setState({
                        showIosToast:true,
                        toastMsg:'购买数量至少为一件'
                    });
                    this._setTimeOutFun();
                }else{
                    ToastAndroid.show('购买数量至少为一件', 2000);
                }
            }else{
                this.setState({
                    buyNum:_buyNum+'',
                    isAddNum:true
                });
            }
        },
    renderLoadingView: function () {
        return (
            <View style={styles.container}>
                <Image source={require('../../img/common/loading.gif')} style={{width: 25, height:25} }  />
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
                        <TouchableOpacity style={styles.selectedSize} onPress={this._onPressSizeList.bind(this,{
                           clothingSizeValue:item.clothingSizeValue,
                           clothingSizeId:item.clothingSizeId
                       })}>
                            <View style={styles.selectedSize}>
                                <Text style={[styles.writeColor,styles.tenTwo]}>{item.clothingSizeValue}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }else{
                    itemList[i]=(
                        <TouchableOpacity style={styles.selectedSize} onPress={this._onPressSizeList.bind(this,{
                            clothingSizeValue:item.clothingSizeValue,
                            clothingSizeId:item.clothingSizeId
                        })}>
                            <View style={styles.selSize}>
                                <Text style={[styles.grayColor,styles.tenTwo]}>{item.clothingSizeValue}</Text>
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
                ToastAndroid.show('输入错误，格式如175厘米，85.9公斤。', 2000);
            }
        }else{
            ToastAndroid.show('输入错误，格式如175厘米，85.9公斤。', 2000);
        }
        if(result){
            if(widthValue!=null && widthValue!=''){
                if(widthValue.substring(widthValue.length-1)=='.'){
                    ToastAndroid.show('输入错误，格式如175厘米，85.9公斤。', 2000);
                }else{
                    if(widthValue>0 && widthValue<1000){
                        this._getComputeClothingSize();
                    }else{
                         ToastAndroid.show('输入错误，格式如175厘米，85.9公斤。', 2000);
                    }
                }
            }else{
                 ToastAndroid.show('输入错误，格式如175厘米，85.9公斤。', 2000);
            }
        }
    },
    //获取推荐尺码
    _getComputeClothingSize:function(){
        var _q='?token='+this.state.data.token+'&goodsId='+this.state.data.goodsId+
        '&formula='+this.state.data.formula+'&sex='+this.state.data.sex+'&goodsTypeId='+this.state.data.goodsTypeId+'&catId='+this.state.data.catId+'&height='+this.state.heightValue+'&weight='+this.state.widthValue;
        var baseUrl=Service.computeClothingSize+_q;
        var that=this;
        this.setState({
            ShowLoading:true
        });
        Util.get(baseUrl,function(data){
            var _msgCode=data.msgCode;
            if(_msgCode==1){
                that.setState({
                    ShowLoading:false
                });
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
                        checkedSizeId:_clothingSizeId,
                        ShowLoading:false
                    });
                }else{
                   if(bodyStr=='特体'){
                       var _data={
                            height:that.state.heightValue,
                            weight:that.state.widthValue,
                            closeBtn:'customSizeModal',
                            ShowLoading:false
                       };
                       that._closeSizeModal(_data);
                   }else{
                        that.setState({
                            checkedSizeValue:bodyStr,
                            checkedSizeId:_clothingSizeId,
                            ShowLoading:false
                        });
                   }
                }
            }
        },function(err){
           that.setState({
               ShowLoading:false
           });
        });
    }
});



var styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20
    },
    leftView:{
        height:77,
        width:90,
        backgroundColor:'#fff',
        marginTop:20
    },
    leftPosition:{
        width:80,
        height:77,
        position:'absolute',
        left:8,
        bottom:20,
        borderRadius:6,
        backgroundColor:'#fff',
        padding:2
    },
    tenTwo:{
        fontSize:Util.fixedFont(12)
    },
    greenColor:{
        color:'#4bb270',
        fontSize:Util.fixedFont(12)
    },
    toaColor:{
        color:'#fff',
        fontSize:Util.fixedFont(14)
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
        backgroundColor:'#fff',
        paddingBottom:5,
        borderTopColor:'#bebebe',
        borderWidth:0.5,
        width:Util.size.width
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
        alignItems:'center',
        backgroundColor:'#fff'
    },
    resultSize:{
        borderColor:'#4bb270',
        borderWidth:0.5,
        width:90,
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
        height:97
    },
    goodImg:{
        width:76,
        height:76,
        borderRadius:6
    },
    selectSize:{
        width:Util.size.width,
    },
    sureBtn:{
        color:'#fff',
        marginTop:15,
        marginBottom:15,
        fontSize:Util.fixedFont(14)
    },
    borderRad:{
        width:133,
        height:39,
        backgroundColor:'orange',
        justifyContent:'center',
        borderRadius:4,
        alignItems:'center',
        marginTop:27,
        marginRight:17,
    	marginLeft:17
    },
    leftD:{
        width:200,
        marginTop:8,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:17,
        height:55
    },
    buyNum:{
        fontSize:Util.fixedFont(15),
        marginBottom:2,
        color:'#5e5a57'
    },
    containT:{
        justifyContent:'center',
        marginLeft:17,
        marginRight:17,
        width:71,
        height:33,
        alignItems:'center'
    },
    number:{
        width:71,
        height:38,
        textAlign:'center',
        fontSize:Util.fixedFont(16),
        position:'absolute',
        top:0,
        left:0,
        color:'#333'

    },
    addNumber:{
        width:71,
        height:33,
    },
    fuHao:{
        width:33,
        height:33,
        marginRight:0,
        marginLeft:0
    },
    zhiSize:{
        width:Util.size.width-10,
        height:70,
        backgroundColor:'#fff'
    },
    goodSize:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        paddingLeft:10,
        paddingRight:10,
        width:Util.size.width
    },
    sizeBig:{
        color:'#4cb071',
        fontSize:Util.fixedFont(15),
        marginLeft:10,
        marginTop:10
    },
    goodText:{
        flex:1,
        flexDirection:'row'
    },
    containE:{
        width:Util.size.width,
        flex:1,
        backgroundColor:'#fff',
        height:68
    },
    sizeWen:{
        width:Util.size.width-90,
        height:77,
        backgroundColor:'#fff',
        marginTop:20,
        paddingLeft:10,
        paddingBottom:17,
        justifyContent:'center'
    },
    sizeCons:{
        marginTop:5,
        width:Util.size.width-134,
        textAlign:'left',
        height:36
    },
    sizeTitle:{
        marginBottom:5,
        marginTop:5,
        height:35,
        color:'#333',
        fontSize:Util.fixedFont(16)
    },
    bottomSize:{
        width:(Util.size.width-230)/2,
        height:40,
        marginLeft:4,
        marginRight:4,
        justifyContent:'center'
    },
    selSize:{
        width:(Util.size.width-60)/5,
        height:26,
        marginLeft:4,
        marginRight:4,
        borderColor:'#b0b0b0',
        borderWidth:0.5,
        marginBottom:5,
        justifyContent:'center',
        alignItems:'center'
    },
    selectedSize:{
        width:(Util.size.width-60)/5,
        height:26,
        backgroundColor:'#4bb270',
        marginLeft:4,
        marginRight:4,
        borderWidth:0.5,
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
        color:'#b0b0b0',
        fontSize:Util.fixedFont(12)
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
        width:Util.size.width-97,
        justifyContent:'flex-end',
        paddingRight:17
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