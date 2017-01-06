/**
 * Created by qiaozm on 2016/7/7.
 * 厂家信息组件
 */
var Util=require('../../common/Util');
import React, { Component } from 'react';
import Service from '../../common/service';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
var supplierInfo=React.createClass({
    getInitialState: function () {
       return {
            data:this.props.data,
            loaded:false
       };
    },
    componentDidMount: function() {
        this._fetchData();
    },
    render: function() {
    if (!this.state.loaded) {
      
    }
    return (
               <View style={styles.conCenter}>
               <View style={styles.conDetail}>
               <Text allowFontScaling={false} style={styles.goodTitle}>{this.state.data.supplierName==null?"":this.state.data.supplierName}：</Text>
               <View sytle={styles.comContent}><Text allowFontScaling={false} style={styles.comTex}>{this.state.data.supplierContent==null?"":this.state.data.supplierContent}</Text></View>
               <Text allowFontScaling={false} style={styles.goodTitle}>基本情况：</Text>
               <View style={styles.comTime}>
               <Text allowFontScaling={false} style={styles.textLine}>成立时间:<Text allowFontScaling={false} style={styles.daZi}>{this.state.data.supplierSetupDate==null?"":this.state.data.supplierSetupDate}</Text></Text>
               <Text allowFontScaling={false} style={styles.textLine}>法人代表:<Text allowFontScaling={false} style={styles.daZi}>{this.state.data.legalRepr==null?"":this.state.data.legalRepr}</Text></Text>
               </View>
               <View style={styles.comTime}>
               <Text allowFontScaling={false} style={styles.textLine}>注册资金:<Text allowFontScaling={false} style={styles.daZi}>{this.state.data.regCapital==null?"":this.state.data.regCapital}万</Text></Text>
               <Text allowFontScaling={false} style={styles.textLine}>职工人数:<Text allowFontScaling={false} style={styles.daZi}>{this.state.data.employeeNum==null?"":this.state.data.employeeNum}</Text></Text>
               </View>
               <Text allowFontScaling={false} style={styles.goodTitle}>企业资质：</Text>
               <View style={styles.sizeImg}>
               <Image defaultSource={require('../../img/common/defaultReDetail.png')} resizeMode='contain' source={{uri: this.state.data.busiLicensePicUrl}} style={[{width:400, height:500},styles.imgBs]} />
               </View>
               <View style={styles.sizeImg}>
               <Image defaultSource={require('../../img/common/defaultReDetail.png')} resizeMode='contain' source={{uri: this.state.data.orgCodePicUrl}} style={[{width:400, height:250},styles.imgBs]} />
               </View>
               <View style={styles.sizeImg}>
               <Image defaultSource={require('../../img/common/defaultReDetail.png')} resizeMode='contain' source={{uri: this.state.data.taxCertPicUrl}} style={[{width:400, height:250},styles.imgBs]} />
               </View>
               <Text allowFontScaling={false} style={styles.goodTitle}>设备条件：</Text>
               <View style={styles.comContent}>
               <Text allowFontScaling={false} style={styles.comTex}>{this.state.data.equipmentInfo==null?"":this.state.data.equipmentInfo}</Text>
               </View>
               </View>
               </View>
               );
 },
                                   
                                   
    _fetchData:function(){
    var that=this;
    var _q='?token='+this.state.data.token+'&supplierId='+this.state.data.supplierId;
    var baseUrl=Service.findSupplierById+_q;
    var that=this;
    Util.get(baseUrl,function(data){
        var _title=data.title;
        if(_title==1){
            //alert('暂无数据');
        }else if(_title==99){
            RNBridgeModule.toLogin('toLogin');
        }else{
            var _body=data.body;
            //alert(_body.supplierName);
            that.setState({
                data: _body,
                loaded:true
            });
            //alert(_body.supplierName);
             // this.refs.goodTitle.text='sfsfsdf';
            //  ReactNative.findDOMNode(this.refs['goodTitle']).text=_body.supplierName;
         }
      },function(err){
        //alert(err);
      });
   }
});
var styles = StyleSheet.create({
                               conCenter:{
                               width:Util.size.width,
                               },
                               conDetail:{},
                               goodTitle:{
                               width:Util.size.width,
                               height:30,
                               marginTop:10,
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
                               
                               comTime:{
                               flex:1,
                               flexDirection:'row',
                               borderBottomColor:'#b0b0b0',
                               borderBottomWidth:1,
                               paddingLeft:20,
                               paddingTop:5,
                               height:32
                               },
                               comContent:{
                               width:Util.size.width,
                               justifyContent:'center',
                               alignItems:'center',
                               paddingBottom:10
                               },
                               comTex:{
                               justifyContent:'center',
                               alignItems:'center',
                               marginLeft:14,
                               marginRight:14,
                               color:'#929292'
                               },
                               daZi:{
                               color:'#5e5a57',
                               fontSize:13
                               },
                               textLine:{
                               width:Util.size.width/2,
                               justifyContent: 'center',
                               color:'#b0b0b0',
                               fontSize:11
                               },
                               imgBs:{
                               width:Util.size.width-20,
                               marginRight:10,
                               marginLeft:10
                               }
                               });
module.exports=supplierInfo;


