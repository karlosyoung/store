/**
 * Created by qiaozm on 2016/7/7.
 * 商品详情组件
 */
var Util=require('../../common/Util');
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
var goodDetail=React.createClass({
    getInitialState: function () {
        return {
            data:this.props.data
        };
    },
    componentDidMount: function() {
    },
    render: function() {
     var _imgList=this._FuncAttImgList();  //生成尺码列表
        return (
                <View style={styles.conCenter}>
                    <View style={styles.conDetail}>
                         <View style={styles.duBuf}>
                            <Text allowFontScaling={false}  style={styles.goodTitle}>设计理念</Text>
                            <View style={styles.sizeFont}>
                <Text allowFontScaling={false}  style={[styles.smallFont,{flex:1}]}>{this.state.data.designConcept}</Text>
                            </View>
                        </View>
                        <View style={styles.duBuf}>
                            <Text  allowFontScaling={false}  style={styles.goodTitle}>商品信息</Text>
                            <View style={styles.sizeImg}>
                                <Image defaultSource={require('../../img/common/defaultReDetail.png')} source={{uri: this.state.data.goodsInfoImg}} resizeMode='contain' style={[{height:120,width:Util.size.width-20},styles.imgBs]} />
                            </View>
                        </View>
                        <View style={styles.duBuf}>
                            <Text allowFontScaling={false} style={styles.goodTitle}>参考尺码</Text>
                            {
                                this.state.data.isUniform!='TRUE'?
                                    <View style={styles.sizeImg}><Image defaultSource={require('../../img/common/defaultReDetail.png')} source={{uri: this.state.data.picFileName}} resizeMode='contain' style={[{height:400,width:Util.size.width-20},styles.imgBs]} /></View>
                                    :
                                    <View style={styles.sizeImg}><Image defaultSource={require('../../img/common/defaultReDetail.png')} source={{uri: this.state.data.picFileName}} resizeMode='contain' style={[{height:500,width:Util.size.width-20},styles.imgBs]} /></View>
                            }
                        </View>
                        <View style={styles.duBuf}>
                            <Text allowFontScaling={false} style={styles.goodTitle}>选码提示</Text>
                            <View style={styles.sizeFont}>
                                 <Text allowFontScaling={false} style={[styles.smallFont,{height:65}]}>1.推荐尺码已经过人体数据验证，满足学生2-3年的生长需求。校服内可搭配毛衫穿着，如需更宽松或更合体，可酌情上下调整一个码。</Text>
                                 <Text allowFontScaling={false} style={[styles.smallFont,{height:65}]}>2.选购时，请综合参考尺码表中各项参数，以选择合适的尺码。也可平铺测量自己已有的合身服装作为参考。</Text>
                                 <Text allowFontScaling={false} style={[styles.smallFont,{height:25}]}>3.如对尺寸有疑问可咨询客服人员。</Text>
                            </View>
                        </View>
                        <View style={styles.duBuf}>
                            <Text allowFontScaling={false} style={styles.goodTitle}>图片展示</Text>
                            {_imgList}
                        </View>
                    </View>
                </View>
        );
    },
    //图片展示列表
    _FuncAttImgList:function(){
        var _imgList=[];
        var _goodsAttImgList=this.state.data.goodsAttImg;
        if(_goodsAttImgList!=null && _goodsAttImgList!=''){
            var _list=_goodsAttImgList.split(',');
            if(_list!=null && _list.length>0){
                for(var i=0;i<_list.length;i++){
                    _imgList[i]=(
                        <View style={styles.sizeImg}>
                            <Image defaultSource={require('../../img/common/defaultReDetail.png')} source={{uri: _list[i]}} resizeMode='contain' style={[{height:350,width:Util.size.width-20},styles.imgBs]} />
                        </View>
                    );
                }
            }else{
                _imgList[0]=(
                    <View style={styles.sizeImg}>
                        <Image defaultSource={require('../../img/common/defaultReDetail.png')} source={{uri: _goodsAttImgList}} resizeMode='contain' style={[{height:350,width:Util.size.width-20},styles.imgBs]} />
                    </View>
                );
            }
        }
        return _imgList;
    }
});
var styles = StyleSheet.create({
    smallFont:{
        fontSize:13,
        color:'#929292',
        lineHeight:18
    },
    conCenter:{
        width:Util.size.width,
        marginTop:10
    },
    conDetail:{
        width:Util.size.width,
        paddingBottom:10
    },
    duBuf:{
        width:Util.size.width
    },
    goodTitle:{
        width:Util.size.width,
        height:30,
        justifyContent:'center',
        marginLeft:15,
        fontSize:15,
        color:'#333',
        alignItems:'center'
    },
    sizeImg:{
        width:Util.size.width,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center'
    },
    imgBs:{
        paddingLeft:10,
        paddingRight:10,
        width:Util.size.width-20
    },
    sizeFont:{
        paddingBottom:15,
        paddingLeft:20,
        paddingRight:20
    },
    duBof:{
        paddingBottom:15
    },
    widthL:{
        width:Util.size.width/2-15
    }
});
module.exports=goodDetail;


