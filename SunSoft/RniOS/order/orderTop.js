/**
 * Created by qiaozm on 2016/6/29.
 * 头部导航主体部分组件
 */
var Util=require('../../common/Util');
import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from'react-native';
var OrderTop=React.createClass({
    getInitialState() {
        return null;
    },
    render:function(){
        var data= this.props.data;
        var _titleView=this._initTitleView(data.orderStatusStr);
        return(
               <View>
               {
               data.recType==3?
               <View style= {styles.orderTitle}>
               <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 14, height: 15,marginRight:1}} />
               <View style={styles.orderHao}><Text style={styles.orderSta} allowFontScaling={false}>订单号：<Text style={styles.orderSta} allowFontScaling={false}>{data.orderSn}</Text><Text allowFontScaling={false} style={styles.smallFont}>（代买）</Text></Text></View>
               {_titleView}
               </View>
               :
               <View>
                   {
                        data.recType==0?
                        <View style= {styles.orderTitle}>
                           <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 14, height: 15,marginRight:1}} />
                           <View style={styles.orderHao}><Text style={styles.orderSta} allowFontScaling={false}>订单号：<Text style={styles.orderSta} allowFontScaling={false}>{data.orderSn}</Text><Text allowFontScaling={false} style={styles.smallFont}>（零售）</Text></Text></View>
                           {_titleView}
                        </View>
                        :
                        <View style= {styles.orderTitle}>
                           <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 14, height: 15,marginRight:1}} />
                           <View style={styles.orderHao}><Text style={styles.orderSta} allowFontScaling={false}>订单号：<Text style={styles.orderSta} allowFontScaling={false}>{data.orderSn}</Text><Text allowFontScaling={false} style={styles.smallFont}>（统购）</Text></Text></View>
                           {_titleView}
                        </View>
                   }
                   </View>

               }
               </View>
            
        )
    },
    _initTitleView:function(orderStatusStr){
        var _orderStatusStr=this.props.data.orderStatusStr;
        if(_orderStatusStr=='待付款'){
            return(
                <View style={styles.orderState}><Text allowFontScaling={false} style={[styles.smallFont,styles.red]}>{_orderStatusStr}</Text></View>
            )
        }else if(_orderStatusStr=='待发货'){
             return(
                 <View style={styles.orderState}><Text allowFontScaling={false} style={[styles.smallFont,styles.yellow]}>{_orderStatusStr}</Text></View>
             )
         }else if(_orderStatusStr=='待收货'){
             return(
                 <View style={styles.orderState}><Text allowFontScaling={false} style={[styles.smallFont,styles.yellow]}>{_orderStatusStr}</Text></View>
             )
         }else if(_orderStatusStr=='已完成'){
             return(
                 <View style={styles.orderState}><Text allowFontScaling={false} style={[styles.smallFont,styles.green]}>{_orderStatusStr}</Text></View>
             )
         }else if(_orderStatusStr=='已取消'){
             return(
                 <View style={styles.orderState}><Text allowFontScaling={false} style={[styles.smallFont,styles.gray]}>{_orderStatusStr}</Text></View>
             )
         }
     },
});
var styles=StyleSheet.create({
    orderTitle:{
        flex:1,
        flexDirection:'row',
        width:Util.size.width-20,
        height:40,
        alignItems:'center'
    },
    orderSta:{
        height:38,
        lineHeight:27,
        fontSize:12
    },
                             smallFont:{
                             fontSize:11
                             },
    orderHao:{
        paddingLeft:5,
        justifyContent:'center',
        alignItems:'flex-start',
        width:Util.size.width-80,
        color:'#333',
        height:39,
        lineHeight:28,
        fontSize:13
    },
    orderState:{
        flexDirection:'row',
        justifyContent:'flex-end',
        width:40
    },
    gray:{
        color:'#929292'
    },
    yellow:{
        color:'#fca800'
    },
    red:{
        color:'#f65e5d'
    },
    green:{
        color:'#4cb071'
    }
});
module.exports=OrderTop;