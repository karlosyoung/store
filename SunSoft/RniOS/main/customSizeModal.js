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
var customSizeText='';  //定制按钮
var sizeModal = React.createClass({
    getInitialState:function(){
        return {
            buyNum:'1',
            height:this.props.data.height,
            weight:this.props.data.weight,
            goodsTypeId:this.props.data.goodsTypeId,
            catId:this.props.data.catId,
            token:this.props.data.token,
            sex:this.props.data.sex,
            loaded:true,
            sizeList:this.props.data.customSizeList,
            data:this.props.data,
            isCustomSizeText:false,
            isClearInput:false   //是否清除除身高体重以外的其他六个输入值，（如果是计算出来的不清除false，如果是直接选择的特体尺码列表则要清除true）
        };
    },

    componentDidMount: function () {
       // alert(this.props.data.token);
       //this._fetchData();
    },
    componentWillMount:function() {
    },
    _closeSizeModal(visible){
        var _closeBtn=visible.closeBtn;
        if(_closeBtn==true){
           this.props.callback(visible);
        }else{
              if(this.state.checkedSizeValue==null || this.state.checkedSizeValue==''){
                   RNBridgeModule.toast('请选择尺码');
               }else{
                    if(this.state.isClearInput || this.state.checkedSizeValue=='定制'){
                        var _customSizeData={
                             height:'',
                             weight:'',
                             bust:'',
                             waist:'',
                             hip:'',
                             shoulderWidth:'',
                             sleeveLength:'',
                             trousersLength:''
                       }
                       visible.customSizeData=_customSizeData;
                    }
                   this.props.callback(visible);
               }
        }
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
                                            <View style={styles.yiHang}>
                                                <Text allowFontScaling={false} style={styles.sizeBig}>智能尺码助手</Text>
                                                <TouchableOpacity onPress={this._goBodyMeasure.bind(this)}>
                                                    <Text allowFontScaling={false} style={styles.orange}>如何测量?</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={styles.fit}><Text allowFontScaling={false} style={styles.gryColor}>您的体型偏胖，请输入详细数据</Text></View>
                
                                        <View style={styles.goodSizeT}>
                                            <View style={styles.bottomSizeT}>
                                                <Text style={[styles.grayColor,styles.heightS]} allowFontScaling={false}>身高</Text>
                                                <View style={{width:70}}>
                                                    <TextInput keyboardType="number-pad" value={this.state.height} editable={false} style={[styles.cenText,styles.shuRu,{fontSize:12}]}></TextInput>
                                                    <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                                </View>
                                                <Text style={[styles.green,{width:35}]} allowFontScaling={false}>厘米</Text>
                                            </View>
                                            <View style={styles.bottomSizeT}>
                                                <Text style={[styles.grayColor,styles.heightS]} allowFontScaling={false}>体重</Text>
                                                <View style={{width:70}}>
                                                    <TextInput keyboardType="number-pad"  value={this.state.weight} editable={false} style={[styles.cenText,styles.shuRu,{fontSize:12}]}></TextInput>
                                                    <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                                </View>
                                                <Text style={[styles.green,{width:35}]} allowFontScaling={false}>公斤</Text>
                                            </View>
                                            <View style={styles.bottomSizeT}>
                                                <Text style={[styles.grayColor,styles.heightS]} allowFontScaling={false}>胸围</Text>
                                                <View style={{width:70}}>
                                                    <TextInput keyboardType="number-pad" value={this.state.bust} placeholderTextColor="#b0b0b0" onChangeText={this._getValue.bind(this,'bust')} style={[styles.cenText,styles.shuRu,{fontSize:12}]}></TextInput>
                                                    <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                                </View>
                                                <Text style={[styles.green,{width:35}]} allowFontScaling={false}>厘米</Text>
                                            </View>
                                            <View style={styles.bottomSizeT}>
                                                <Text style={[styles.grayColor,styles.heightS]} allowFontScaling={false}>腰围</Text>
                                                <View style={{width:70}}>
                                                    <TextInput keyboardType="number-pad"  value={this.state.waist} placeholderTextColor="#b0b0b0" onChangeText={this._getValue.bind(this,'waist')} style={[styles.cenText,styles.shuRu,{fontSize:12}]}></TextInput>
                                                    <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                                </View>
                                                <Text style={[styles.green,{width:35}]} allowFontScaling={false}>厘米</Text>
                                            </View>

                                            <View style={styles.bottomSizeT}>
                                                <Text style={[styles.grayColor,styles.heightS]} allowFontScaling={false}>臀围</Text>
                                                <View style={{width:70}}>
                                                    <TextInput keyboardType="number-pad"  value={this.state.hip}  placeholderTextColor="#b0b0b0" onChangeText={this._getValue.bind(this,'hip')} style={[styles.cenText,styles.shuRu,{fontSize:12}]}></TextInput>
                                                    <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                                </View>
                                                <Text style={[styles.green,{width:35}]} allowFontScaling={false}>厘米</Text>
                                            </View>
                                            <View style={styles.bottomSizeT}>
                                                <Text style={[styles.grayColor,styles.heightS]} allowFontScaling={false}>肩宽</Text>
                                                <View style={{width:70}}>
                                                    <TextInput keyboardType="number-pad" value={this.state.shoulderWidth} placeholderTextColor="#b0b0b0" onChangeText={this._getValue.bind(this,'shoulderWidth')} style={[styles.cenText,styles.shuRu,{fontSize:12}]}></TextInput>
                                                    <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                                </View>
                                                <Text style={[styles.green,{width:35}]} allowFontScaling={false}>厘米</Text>
                                            </View>
                                            <View style={styles.bottomSizeT}>
                                                <Text style={[styles.grayColor,styles.heightS]} allowFontScaling={false}>袖长</Text>
                                                <View style={{width:70}}>
                                                    <TextInput keyboardType="number-pad"  value={this.state.sleeveLength}  placeholderTextColor="#b0b0b0" onChangeText={this._getValue.bind(this,'sleeveLength')} style={[styles.cenText,styles.shuRu,{fontSize:12}]}></TextInput>
                                                    <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                                </View>
                                                <Text style={[styles.green,{width:35}]} allowFontScaling={false}>厘米</Text>
                                            </View>
                                            <View style={styles.bottomSizeT}>
                                                <Text style={[styles.grayColor,styles.heightS]} allowFontScaling={false}>裤长</Text>
                                                <View style={{width:70}}>
                                                    <TextInput keyboardType="number-pad"  value={this.state.trousersLength}  placeholderTextColor="#b0b0b0" onChangeText={this._getValue.bind(this,'trousersLength')} style={[styles.cenText,styles.shuRu,{fontSize:12}]}></TextInput>
                                                    <Image source={require('../../img/retail/line.png')} resizeMode='contain' style={[styles.diLine,{position: 'absolute',bottom: 0,left: 0}]} />
                                                </View>
                                                <Text style={[styles.green,{width:35}]} allowFontScaling={false}>厘米</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={this._validateValue.bind(this)}>
                                            <View style={styles.resultCen}>
                                                <Text allowFontScaling={false} style={[styles.cenText,styles.greenColor,{height:26,lineHeight:21}]}>尺码计算</Text>
                                            </View>
                                        </TouchableOpacity>



                                    <View style={styles.selectSize}>
                                        <View style={styles.yiHang}>
                                            <Image source={require('../../img/retail/rule.png')} resizeMode='contain' style={[styles.flexImg,{width:22}]} />
                                            <Text allowFontScaling={false} style={styles.sizeBig}>尺码选择</Text>
                                        </View>
                                        <View>
                                                <View style={styles.goodSize}>
                                                   {_sizeViewList}
                                                   {
                                                    this.state.isCustomSizeText?
                                                        customSizeText
                                                     :
                                                        null
                                                   }
                                                </View>
                                                {
                                                    this.state.isCustomSizeText?
                                                        <View><Text allowFontScaling={false} style={styles.instructions}>您的体型需要定制，请联系客服400-6896600</Text></View>
                                                    :
                                                        null
                                                }
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
                                                  customSizeData:{
                                                    height:this.state.height,
                                                    weight:this.state.weight,
                                                    bust:this.state.bust,
                                                    waist:this.state.waist,
                                                    hip:this.state.hip,
                                                    shoulderWidth:this.state.shoulderWidth,
                                                    sleeveLength:this.state.sleeveLength,
                                                    trousersLength:this.state.trousersLength
                                                  },
                                                  closeBtn:'customSizeConfirm'
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
                var _specialSizeValue=item.specialSizeValue;
                if(this.state.checkedSizeValue==_specialSizeValue){
                   // checkedSizeId=item.checkedSizeId;
                    if(_specialSizeValue=='定制'){
                        customSizeText=(
                            <TouchableOpacity onPress={this._onPressSizeList.bind(this,{
                               clothingSizeValue:item.specialSizeValue,
                               clothingSizeId:item.specialSizeId
                           })}>
                                <View style={styles.selectedSize}>
                                    <Text allowFontScaling={false} style={[styles.writeColor,styles.tenTwo]}>{item.specialSizeValue}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }else{
                        itemList[i]=(
                            <TouchableOpacity onPress={this._onPressSizeList.bind(this,{
                               clothingSizeValue:item.specialSizeValue,
                               clothingSizeId:item.specialSizeId
                           })}>
                                <View style={styles.selectedSize}>
                                    <Text allowFontScaling={false} style={[styles.writeColor,styles.tenTwo]}>{item.specialSizeValue}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }
                }else{
                    if(_specialSizeValue=='定制'){
                        customSizeText=(
                            <TouchableOpacity onPress={this._onPressSizeList.bind(this,{
                                clothingSizeValue:item.specialSizeValue,
                                clothingSizeId:item.specialSizeId
                            })}>
                                <View style={styles.selSize}>
                                    <Text allowFontScaling={false} style={[styles.grayColor,styles.tenTwo]}>{item.specialSizeValue}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }else{
                        itemList[i]=(
                            <TouchableOpacity onPress={this._onPressSizeList.bind(this,{
                                clothingSizeValue:item.specialSizeValue,
                                clothingSizeId:item.specialSizeId
                            })}>
                                <View style={styles.selSize}>
                                    <Text allowFontScaling={false} style={[styles.grayColor,styles.tenTwo]}>{item.specialSizeValue}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }
                }
            }
        };
        return itemList;
    },
    //尺码列表点击事件
    _onPressSizeList:function(data){
        var _isCustomSizeText=false;
        if(data.clothingSizeValue=='定制'){
            _isCustomSizeText=true;
        }
        this.setState({
            checkedSizeValue:data.clothingSizeValue,
            checkedSizeId:data.clothingSizeId,
            isClearInput:true,
            isCustomSizeText:_isCustomSizeText,
            bust:'',
            waist:'',
            hip:'',
           shoulderWidth:'',
           sleeveLength:'',
           trousersLength:''
        });
    },

    //输入框内容变化调用
    _getValue: function (name,val) {
        if(name=='bust'){
            var _bust=this.state.bust;
            if(Util.FuncStrFormateSpace4(val)){
                this.setState({
                   bust:Util.FuncStrFormateSpace3(val)
                });
            }else{
                if(!isNaN(Util.FuncStrFormateSpace3(val))){
                    if(Util.FuncStrFormateSpace3(val)!='' && Util.FuncStrFormateSpace3(val)!=0){
                        this.setState({
                           bust:_bust
                        });
                    }else{
                      this.setState({
                         bust:''
                      });
                    }
                }else{
                    var _str=Util.FuncStrFormateSpace3(val);
                    if(!isNaN(_str.substring(0,_str.length-1))){
                        this.setState({
                            bust:_str.substring(0,_str.length-1)
                       });
                    }else{
                        this.setState({
                            bust:''
                        });
                   }
                }
            }
        }else if(name=='waist'){
            var _waist=this.state.waist;
            if(Util.FuncStrFormateSpace4(val)){
                this.setState({
                    waist:Util.FuncStrFormateSpace3(val)
                 });
            }else{
                if(!isNaN(Util.FuncStrFormateSpace3(val))){
                    if(Util.FuncStrFormateSpace3(val)!='' && Util.FuncStrFormateSpace3(val)!=0){
                        this.setState({
                           waist:_waist
                        });
                    }else{
                      this.setState({
                         waist:''
                      });
                    }
                }else{
                    var _str=Util.FuncStrFormateSpace3(val);
                    if(!isNaN(_str.substring(0,_str.length-1))){
                        this.setState({
                            waist:_str.substring(0,_str.length-1)
                       });
                    }else{
                        this.setState({
                            waist:''
                        });
                   }
                }
            }
        }else if(name=='hip'){
            var _hip=this.state.hip;
            if(Util.FuncStrFormateSpace4(val)){
                this.setState({
                    hip:Util.FuncStrFormateSpace3(val)
                 });
            }else{
                if(!isNaN(Util.FuncStrFormateSpace3(val))){
                    if(Util.FuncStrFormateSpace3(val)!='' && Util.FuncStrFormateSpace3(val)!=0){
                        this.setState({
                           hip:_hip
                        });
                    }else{
                      this.setState({
                         hip:''
                      });
                    }
                }else{
                    var _str=Util.FuncStrFormateSpace3(val);
                    if(!isNaN(_str.substring(0,_str.length-1))){
                        this.setState({
                            hip:_str.substring(0,_str.length-1)
                       });
                    }else{
                        this.setState({
                            hip:''
                        });
                   }
                }
            }
        }else if(name=='shoulderWidth'){
             var _shoulderWidth=this.state.shoulderWidth;
             if(Util.FuncStrFormateSpace4(val)){
                 this.setState({
                     shoulderWidth:Util.FuncStrFormateSpace3(val)
                  });
             }else{
                 if(!isNaN(Util.FuncStrFormateSpace3(val))){
                    if(Util.FuncStrFormateSpace3(val)!='' && Util.FuncStrFormateSpace3(val)!=0){
                         this.setState({
                            shoulderWidth:_shoulderWidth
                         });
                     }else{
                       this.setState({
                          shoulderWidth:''
                       });
                     }
                 }else{
                    var _str=Util.FuncStrFormateSpace3(val);
                    if(!isNaN(_str.substring(0,_str.length-1))){
                        this.setState({
                            shoulderWidth:_str.substring(0,_str.length-1)
                       });
                    }else{
                        this.setState({
                            shoulderWidth:''
                        });
                   }
                 }
             }
         }else if(name=='sleeveLength'){
            var _sleeveLength=this.state.sleeveLength;
            if(Util.FuncStrFormateSpace4(val)){
                this.setState({
                    sleeveLength:Util.FuncStrFormateSpace3(val)
                 });
            }else{
                if(!isNaN(Util.FuncStrFormateSpace3(val))){
                    if(Util.FuncStrFormateSpace3(val)!='' && Util.FuncStrFormateSpace3(val)!=0){
                        this.setState({
                           sleeveLength:_sleeveLength
                        });
                    }else{
                      this.setState({
                         sleeveLength:''
                      });
                    }
                }else{
                    var _str=Util.FuncStrFormateSpace3(val);
                    if(!isNaN(_str.substring(0,_str.length-1))){
                        this.setState({
                            sleeveLength:_str.substring(0,_str.length-1)
                       });
                    }else{
                        this.setState({
                            sleeveLength:''
                        });
                   }
                }
            }

          }else if(name=='trousersLength'){
              var _trousersLength=this.state.trousersLength;
              if(Util.FuncStrFormateSpace4(val)){
                  this.setState({
                      trousersLength:Util.FuncStrFormateSpace3(val)
                   });
              }else{
                  if(!isNaN(Util.FuncStrFormateSpace3(val))){
                     if(Util.FuncStrFormateSpace3(val)!='' && Util.FuncStrFormateSpace3(val)!=0){
                          this.setState({
                             trousersLength:_trousersLength
                          });
                      }else{
                        this.setState({
                           trousersLength:''
                        });
                      }
                  }else{
                    var _str=Util.FuncStrFormateSpace3(val);
                    if(!isNaN(_str.substring(0,_str.length-1))){
                        this.setState({
                            trousersLength:_str.substring(0,_str.length-1)
                       });
                    }else{
                        this.setState({
                            trousersLength:''
                        });
                   }
                  }
              }
         }
    },

    //开始计算按钮
    _validateValue:function(){
        var result='';
        result=this._validateInput(this.state.bust);
        if(result==''){
            result=this._validateInput(this.state.waist);
            if(result==''){
                result=this._validateInput(this.state.hip);
                if(result==''){
                     result=this._validateInput(this.state.shoulderWidth);
                     if(result==''){
                         result=this._validateInput(this.state.sleeveLength);
                         if(result==''){
                            result=this._validateInput(this.state.trousersLength);
                            if(result==''){
                                this._getComputeClothingSize();
                            }else{
                               RNBridgeModule.toast(result);
                            }
                         }else{
                            RNBridgeModule.toast(result);
                         }
                     }else{
                       RNBridgeModule.toast(result);
                     }
                }else{
                    RNBridgeModule.toast(result);
                }
            }else{
                RNBridgeModule.toast(result);
            }
        }else{
            RNBridgeModule.toast(result);
        }
    },

    //验证输入框
    _validateInput:function(val){
        var result='';
        if(val!=null && val!=''){
            if(val>0 && val<1000){
                result='';
            }else{
                result='输入错误，格式如175厘米，85.9公斤。';
            }
        }else{
            result='请输入全部数据';
        }
        return result;
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
            RNBridgeModule.toast('购买数量至少为一件');
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

     //跳转到测量尺码
        _goBodyMeasure:function(){
            var _data={closeBtn:'bodyMeasure'}
            this.props.callback(_data);
        },

    //获取推荐尺码
    _getComputeClothingSize:function(){
        var _q='?token='+this.state.token+'&sex='+this.state.sex+'&catId='+this.state.catId+'&height='+this.state.height+
                '&bust='+this.state.bust+'&waist='+this.state.waist+'&hip='+this.state.hip;//'&weight='+this.state.widthValue;
        var baseUrl=Service.getRecommendclothingSize+_q;
        var that=this;
        Util.get(baseUrl,function(data){
            var _msgCode=data.msgCode;
            if(_msgCode==1){
                RNBridgeModule.toast(_message);
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
                    if(bodyStr=='定制'){
                        that.setState({
                            isCustomSizeText:true,
                            checkedSizeValue:bodyStr,
                            checkedSizeId:_clothingSizeId,
                            isClearInput:false
                        });
                    }else{
                       that.setState({
                           isCustomSizeText:false,
                           checkedSizeValue:bodyStr,
                           checkedSizeId:_clothingSizeId,
                           isClearInput:false
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
    heightS:{
        height:30,
        lineHeight:22,
                               width:30
    },
    fit:{
        paddingLeft:20
    },
    gryColor:{
        color:'#9e9e9e',
                               height:25
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
        lineHeight:16
    },
    green:{
        color:'#4bb270',
                               height:30,lineHeight:22
    },
    greenColor:{
        color:'#4bb270'
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
        height:30,
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
        marginTop:12
    },
    instructions:{
        color:'red',
        fontSize:12,
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
        width:(Util.size.width-20)/2,
        marginLeft:4,
        marginRight:4,
        justifyContent:'center',
        flex:1,
        backgroundColor:'red',
        flexDirection:'row'
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
        width:60,
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
    },
   goodSizeT:{
       flexDirection:'row',
       flexWrap:'wrap',
       paddingLeft:4,
       paddingRight:4,
       width:Util.size.width
   },
   bottomSizeT:{
       width:(Util.size.width-50)/2,
       flexDirection:'row',
       marginLeft:4,
       marginRight:4,
       justifyContent:'flex-end',
       alignItems:'center',
       height:30,
       backgroundColor:'#f7f7f7',
       marginLeft:15
   },
    resultCen:{
       borderColor:'#4bb270',
       borderWidth:1,
       width:Util.size.width-240,
       height:28,
       marginLeft:120,
       marginRight:120,
       marginTop:5,
       justifyContent:'center'
   }
});

module.exports=sizeModal;