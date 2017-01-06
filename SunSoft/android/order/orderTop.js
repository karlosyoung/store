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
                    <View style={styles.orderTitle}>
                        <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 15, height: 16,marginRight:1} } />
                            <View style={styles.orderHao}><Text style={styles.orderSta}>订单号：<Text style={styles.orderSta}>{data.orderSn}</Text><Text style={styles.smallFont}>（代买）</Text></Text></View>
                        <View style={{justifyContent:'flex-end',width:40}}>{_titleView}</View>
                    </View>
                :
                <View>
                {
                     data.recType==0?
                     <View style={styles.orderTitle}>
                         <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 15, height: 16,marginRight:1} } />
                             <View style={styles.orderHao}><Text style={styles.orderSta}>订单号：<Text style={styles.orderSta}>{data.orderSn}</Text><Text style={styles.smallFont}>（零售）</Text></Text></View>
                         <View style={{justifyContent:'flex-end',width:40}}>{_titleView}</View>
                     </View>
                     :
                     <View style={styles.orderTitle}>
                         <Image style={styles.orderImg} source={require('../../img/order/ding.png')} style={{width: 15, height: 16,marginRight:1} } />
                             <View style={styles.orderHao}><Text style={styles.orderSta}>订单号：<Text style={styles.orderSta}>{data.orderSn}</Text><Text style={styles.smallFont}>（统购）</Text></Text></View>
                         <View style={{justifyContent:'flex-end',width:40}}>{_titleView}</View>
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
                <View style={styles.orderState}><Text style={[styles.smallFont,styles.red]}>{_orderStatusStr}</Text></View>
            )
        }else if(_orderStatusStr=='待发货'){
             return(
                 <View style={styles.orderState}><Text style={[styles.smallFont,styles.yellow]}>{_orderStatusStr}</Text></View>
             )
        }else if(_orderStatusStr=='待收货'){
             return(
                 <View style={styles.orderState}><Text style={[styles.smallFont,styles.yellow]}>{_orderStatusStr}</Text></View>
             )
        }else if(_orderStatusStr=='已完成'){
             return(
                 <View style={styles.orderState}><Text style={[styles.smallFont,styles.green]}>{_orderStatusStr}</Text></View>
             )
        }else if(_orderStatusStr=='已取消'){
             return(
                 <View style={styles.orderState}><Text style={[styles.smallFont,styles.gray]}>{_orderStatusStr}</Text></View>
             )
        }
     },
});
var styles=StyleSheet.create({
    smallFont:{
        fontSize:Util.fixedFont(12),
        color:'#333'
    },
    bColor:{
        backgroundColor:'#f7f7f7'
    },
    orderTitle:{
        flex:1,
        flexDirection:'row',
        width:Util.size.width,
        height:44,
        alignItems:'center'
    },
    orderHao:{
        paddingLeft:5,
        width:Util.size.width-86,
        color:'#333',
        fontSize:Util.fixedFont(14),
        height:44,
        alignItems:'flex-start',
        justifyContent:'center'
    },
    orderSta:{
        fontSize:Util.fixedFont(14),
        color:'#333'
    },
    orderState:{
        flexDirection:'row',
        justifyContent:'flex-end',
        width:40
    },
    borderGray:{
        flexDirection:'row',
        justifyContent:'flex-end',
        width:40,
        borderWidth:0.5,
        borderColor:'#b0b0b0',
        height:20,
        borderRadius:4,
        alignItems:'center'
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