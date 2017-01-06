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
    TouchableOpacity
} from'react-native';
var sizeModal = React.createClass({
    getInitialState() {
        var _buyNum=this.props.data.buyNum;
        if(_buyNum==null || _buyNum==''){
            _buyNum="1";
        };
        return {
            buyNum:_buyNum,
            loaded:false,
            animationType: 'slide',
            modalVisible: this.props.modalVisible,
            transparent: true,
            chiSize:'',
            isUniform:'false',   //是否为制服
            sizeList:[],  //尺码列表
            checkedSizeValue:this.props.data.checkedSize,  //选中的尺码值,
            checkedSizeId:this.props.data.checkedSizeId,  //选中的尺码ID
           data:this.props.data
        };
    },

    componentDidMount: function () {
       // alert(this.props.data.token);
        this._fetchData();
    },
    _fetchData: function() {
         var _q='?token='+this.props.data.token+'&goodsTypeId='+this.props.data.goodsTypeId+'&catId='+this.props.data.catId+'&goodsId='+this.props.data.goodsId+'&sex='+this.props.data.sex;
         var baseUrl=Service.getSizeInfo+_q;
         var that=this;
         Util.get(baseUrl,
         function(data){
            var _msgCode=data.msgCode;
            if(_msgCode==1){
                alert('异常');
            }else if(_msgCode==99){
                alert('请登录');
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
                alert(err);
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
                   if(Platform.OS=='ios'){
                       this.setState({
                           showIosToast:true,
                           toastMsg:'请选择尺码'
                       });
                       this._setTimeOutFun();
                   }else{
                       ToastAndroid.show('请选择尺码', 2000);
                   }
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
        var modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff'
        };
        var innerContainerTransparentStyle = this.state.transparent
            ? {backgroundColor: '#fff'}
            : null;
        var activeButtonStyle = {
            backgroundColor: '#ddd'
        };
        var _sizeViewList=this._initSizeViewList();  //生成尺码列表
        return (
            <View style={styles.viewV}>
                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this._setModalVisible(false)}}
                >
                    <View style={[styles.container, modalBackgroundStyle]}>
                        <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                                <View style={styles.sizeCon}>
                                    <View  style={styles.sizeTop}>
                                        <Image source={{uri: this.state.data.goodsImg}} style={[styles.goodImg,{position: 'absolute',top:-25,left: 10,borderRadius:6}]} />
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
                                    <View style={styles.zhiSize}>
                                        <View style={styles.yiHang}>
                                            <Image source={require('../../img/retail/zhi.png')} resizeMode='contain' style={[styles.flexImg,{width:22}]} />
                                            <Text style={styles.sizeBig}>智能尺码助手</Text>
                                        </View>
                                        <View style={styles.goodSize}>
                                            <View style={styles.bottomSize}>
                                                <TextInput placeholder="身高"  keyboardType="numeric" placeholderTextColor="#b0b0b0" ref="heightInput" onChangeText={this._getHeightValue} style={[styles.cenText,styles.shuRu,{fontSize:12}]}>
                                                </TextInput>
                                               <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                            </View>
                                            <View style={styles.lineHeight}><Text style={styles.greenColor}>cm </Text></View>
                                            <Image source={require('../../img/retailDetail/j.png')} resizeMode='contain' style={{ width:14,marginLeft:3,marginRight:3,height:33}} />
                                            <View style={styles.bottomSize}>
                                                <TextInput placeholder="体重" keyboardType="numeric"  placeholderTextColor="#b0b0b0" ref="widthInput" onChangeText={this._getWidthValue} style={[styles.cenText,styles.shuRu,{fontSize:12}]}>
                                                </TextInput>
                                                <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                            </View>
                                            <View style={styles.lineHeight}><Text style={styles.greenColor}>kg</Text></View>
                                            <Image source={require('../../img/retailDetail/d.png')} resizeMode='contain' style={{ width:14,marginLeft:3,marginRight:3,height:33}} />
                                            <TouchableOpacity onPress={this._validateValue.bind(this)}>
                                                <View style={styles.resultSize}>
                                                    {
                                                        this.state.chiSize==''||this.state.chiSize==null?
                                                            <Text style={[styles.cenText,styles.greenColor]}>开始计算</Text>
                                                            :
                                                            <Text style={styles.cenText}>{this.state.chiSize}</Text>
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.selectSize}>
                                        <View style={styles.yiHang}>
                                            <Image source={require('../../img/retail/rule.png')} resizeMode='contain' style={[styles.flexImg,{width:22}]} />
                                            <Text style={styles.sizeBig}>尺码选择</Text>
                                        </View>
                                        <View>
                                            {
                                                this.state.isUniform=='TRUE'?
                                                    <Text style={styles.instructions}>购买B款制服时,衬衫发大一码.如制服155B时,则衬衫为160A</Text>
                                                    :
                                                    null
                                            }
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
                                                <View style={[styles.yiHang,styles.containT,{justifyContent:'center',alignItems:'center',width:80,textAlign:'center'}]}>
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
                                            <View style={styles.borderRad}><Text style={styles.sureBtn}>确定</Text></View>
                                        </TouchableOpacity>
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
                    </View>
                </Modal>
            </View>
        );
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
             buyNum:_buyNum+''
           });
        }
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
                                <Text style={[styles.writeColor,styles.tenTwo]}>{item.clothingSizeValue}</Text>
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
            checkedSizeId:data.clothingSizeId
        });
    },

    //身高输入框内容变化调用
    _getHeightValue: function (val) {
        this.setState({
           heightValue:Util.FuncStrFormateSpace3(val),
           chiSize:''
        });
    },

    //体重输入框内容变化调用
    _getWidthValue: function (val) {
        this.setState({
            widthValue:Util.FuncStrFormateSpace3(val),
            chiSize:''
        });
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
        if(!isNaN(heightValue)){
            if(parseInt(heightValue)>0){
                if(heightValue.split(".").length>1){
                    if(heightValue.split(".")[1].length<3){
                        result=true;
                    }else{
                        if(Platform.OS=='ios'){
                            this.setState({
                                showIosToast:true,
                                toastMsg:'请输入身高和体重，格式如175cm，85.9kg。'
                            });
                            this._setTimeOutFun();
                        }else{
                            ToastAndroid.show('请输入身高和体重，格式如175cm，85.9kg。', 2000);
                        }

                       // alert('输入错误，格式如175cm,85.9kg。');
                    }
                }else{
                    result=true;
                }
            }else{
                if(Platform.OS=='ios'){
                    this.setState({
                        showIosToast:true,
                        toastMsg:'请输入身高和体重，格式如175cm，85.9kg。'
                    });
                    this._setTimeOutFun();
                }else{
                    ToastAndroid.show('请输入身高和体重，格式如175cm，85.9kg。', ToastAndroid.LONG);
                }
               // alert('输入错误，格式如175cm,85.9kg。');
            }
        }else{
            if(Platform.OS=='ios'){
                this.setState({
                    showIosToast:true,
                    toastMsg:'请输入身高和体重，格式如175cm，85.9kg。'
                });
                this._setTimeOutFun();
            }else{
                ToastAndroid.show('请输入身高和体重，格式如175cm，85.9kg。', ToastAndroid.LONG);
            }
            //alert('输入错误，格式如175cm,85.9kg。')
        }
        if(result){
            if(!isNaN(widthValue)){
                if(parseFloat(widthValue)>0){
                    if(widthValue.split(".").length>1){
                        if(widthValue.split(".")[1].length<3){
                            this._getComputeClothingSize();
                        }else{
                            if(Platform.OS=='ios'){
                                this.setState({
                                    showIosToast:true,
                                    toastMsg:'请输入身高和体重，格式如175cm，85.9kg。'
                                });
                                this._setTimeOutFun();
                            }else{
                                ToastAndroid.show('请输入身高和体重，格式如175cm，85.9kg。', ToastAndroid.LONG);
                            }
                        }
                    }else{
                        this._getComputeClothingSize();
                    }
                }else{
                    if(Platform.OS=='ios'){
                        this.setState({
                            showIosToast:true,
                            toastMsg:'请输入身高和体重，格式如175cm，85.9kg。'
                        });
                        this._setTimeOutFun();
                    }else{
                        ToastAndroid.show('请输入身高和体重，格式如175cm，85.9kg。', ToastAndroid.LONG);
                    }
                    //alert('输入错误，格式如175cm,85.9kg。')
                }
            }else{
                if(Platform.OS=='ios'){
                    this.setState({
                        showIosToast:true,
                        toastMsg:'请输入身高和体重，格式如175cm，85.9kg。'
                    });
                    this._setTimeOutFun();
                }else{
                    ToastAndroid.show('请输入身高和体重，格式如175cm，85.9kg。', ToastAndroid.LONG);
                }
                //alert('输入错误，格式如175cm,85.9kg。');
            }
        }
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
                alert('暂无数据');
            }else if(_msgCode==99){
                alert('请登录');
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
                        chiSize:_tip,
                        checkedSizeValue:_tip,
                        checkedSizeId:_clothingSizeId
                    });
                }else{
                    that.setState({
                    chiSize:bodyStr,
                    checkedSizeValue:bodyStr,
                    checkedSizeId:_clothingSizeId
                   });
                }
            }
        },function(err){
            alert(err);
        });
    }
});



var styles = StyleSheet.create({
    tenTwo:{
        fontSize:12
    },
    greenColor:{
        color:'#4bb270'
    },
    toaColor:{
        color:'#fff'
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
        paddingBottom:5,
        width:Util.size.width
    },
    container: {
        flex: 1,
        justifyContent:'flex-end',
        marginTop:44,
        width:Util.size.width
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center'
    },
    sizeCon:{
        flex:1,
        backgroundColor:'#f7f7f7',
        height:450
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
        backgroundColor:'#f7f7f7'
    },
    resultSize:{
        borderColor:'#4bb270',
        borderWidth:1,
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
        borderBottomColor:'#e0e0e0',
        borderBottomWidth:1
    },
    goodImg:{
        marginTop:10,
        width:80,
        height:80,
        marginRight:10
    },
    selectSize:{
        width:Util.size.width
    },
    sureBtn:{
        color:'#fff',
        marginTop:15,
        marginBottom:15
    },
    borderRad:{
        width:90,
        height:35,
        backgroundColor:'orange',
        justifyContent:'center',
        borderRadius:4,
        alignItems:'center',
        marginTop:30,
        marginRight:20,
    	marginLeft:Util.size.width-310
    },
    leftD:{
        width:200,
        height:80,
        marginTop:7,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:10
    },
    buyNum:{
        fontSize:16
    },
    containT:{
        justifyContent:'center',
        marginLeft:20,
        marginRight:20,
        width:80,
        height:40,
        alignItems:'center'
    },
    number:{
        backgroundColor:'#fff',
        width:80,
        height:35,
        borderColor:'#e0e0e0',
        borderWidth:1,
        borderRadius:10,
        textAlign:'center'
    },
    fuHao:{
        width:35,
        height:35,
        marginRight:0,
        marginLeft:0,
        marginTop:2
    },
    zhiSize:{
        width:Util.size.width,
        height:70
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
        marginTop:10
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
        paddingRight:4
    },
    sizeWen:{
        width:Util.size.width-100,
        height:60,
        marginLeft:100
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
        width:(Util.size.width-210)/2,
        height:40,
        marginLeft:4,
        marginRight:4,
        justifyContent:'center'
    },
    selSize:{
        width:(Util.size.width-50)/5,
        height:26,
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
        height:26,
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
        width:(Util.size.width-220)/2,
        height:15,
        marginLeft:5,
        marginRight:5
    },
    lineHeight:{
        height:50,
        width:20,
        justifyContent:'center'
    },
    topPad:{
        position:'absolute',
        top:0
    }
});

module.exports=sizeModal;