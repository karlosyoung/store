/**
 * Created by qiaozm on 2016/6/29.
 * 头部导航主体部分组件
 */
var Util=require('../../common/Util');
import React,{Component} from 'react';
import LoadImg from '../../common/loadImg';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from'react-native';
var OrderGoodDetail=React.createClass({
    getInitialState: function() {
        return null;
    },
    render:function(){
        var _goodsListView=this._initGoodsViewList();
        return(
            <View>{_goodsListView}</View>
        );
    },
    _initGoodsViewList:function(){
        var data=this.props.data;
        var _recType=data.data.recType;//1	商品类型;0普通;1公告统购; 3公告代购
        var itemList=[];
        var _list=data.data.sunOrderGoodsDTOList;
        if(_list!=null && _list.length>0){
            for(var i=0;i<_list.length;i++){
                var item=_list[i];
                var _reserve1='2';
                if(_recType=='0' && data.data.orderPayShippingStatus=='0'){
                    _reserve1=item.status;//data.data.reserve1;  //只有零售显示下架
                }
                if(_recType==3 && i!=0){
                    continue;
                }
                itemList[i]=(
                    <TouchableOpacity onPress={this._pressCallback.bind(this,item.goodsId)}>
                        <View style={styles.orderCont}>
                        {
                            _reserve1 =='03'?
                            <View>
                                 <View style={[styles.marginL,{width:80, marginLeft:20}]}>
                                 <LoadImg style={styles.orderGoods} data={
                                     {
                                        width:80,
                                        height:80,
                                        uri:item.goodsImg+'!m166x166.jpg',
                                        dataSource:require('../../img/common/defaultReDetail.png')
                                     }
                                 } />
                                      <View style={{ position:'absolute',top:0,left:0,width:30,height:30,justifyContent:'flex-start',alignItems:'flex-start' }}>
                                     {
                                         item.goodsProperties== 1?
                                             <Image source={require('../../img/common/boy.png')} style={{width:30, height:30} }/>
                                         :
                                          item.goodsProperties==2?
                                                <Image source={require('../../img/common/girl.png')} style={{width:30, height:30} }/>
                                            :
                                                null
                                      }
                                      </View>
                                 </View>
                                 <View style={{ position:'absolute',top:0,left:20,width:80,height:80,backgroundColor:'#000',opacity:0.7,justifyContent:'center',alignItems:'center' }}>
                                    <Text style={styles.writeColor}>已下架</Text>
                                 </View>
                            </View>
                            :
                            <View style={[styles.marginL,{width:80, marginLeft:20}]}>
                             <LoadImg style={styles.orderGoods} data={
                                 {
                                    width:80,
                                    height:80,
                                    uri:item.goodsImg+'!m166x166.jpg',
                                    dataSource:require('../../img/common/defaultReDetail.png')
                                 }
                             } />
                             <View style={{ position:'absolute',top:0,left:0,width:30,height:30,justifyContent:'flex-start',alignItems:'flex-start' }}>
                             {
                                 item.goodsProperties==1?
                                     <Image source={require('../../img/common/boy.png')} style={{width:30, height:30} }/>
                                 :
                                 item.goodsProperties==2?
                                     <Image source={require('../../img/common/girl.png')} style={{width:30, height:30} }/>
                                 :
                                     null
                              }
                              </View>
                              </View>
                        }
                        {
                            _recType==3?
                                <View style={styles.orderConRig}>
                                    <Text style={[styles.marginBet,styles.fiveFont]} numberOfLines={1}>{item.goodsName}</Text>
                                    <Text style={styles.marginBet}>尺码：<Text>{item.goodsAttrValue==null?'':item.goodsAttrValue}</Text></Text>
                                    <Text style={styles.marginBet}>数量：X<Text>{item.goodsNumber}</Text></Text>
                                    <View style={styles.daiPay}><Text style={styles.smallFont}>查看全部</Text></View>
                                </View>
                             :
                            <View style={styles.orderConRig}>
                                 <Text numberOfLines={1} style={[styles.marginBet,styles.fiveFont]}>{item.goodsName}</Text>
                                 <Text style={styles.marginBet}>尺码：<Text>{item.goodsAttrValue==null?'':item.goodsAttrValue}</Text></Text>
                                 <Text style={styles.marginBet}>数量：X<Text>{item.purchaseGoodsNumber}</Text></Text>
                                 {
                                     _recType==0?
                                         <Text style={[styles.marginBet,styles.redColor]}>{Util.FuncRmbFormat(item.marketPrice)}</Text>
                                     :
                                         null
                                 }
                            </View>
                        }

                        </View>
                    </TouchableOpacity>
                );
            }
        };
        return itemList;
    },
    _pressCallback(_goodsId){
        data={
            data:this.props.data,
            goodsId:_goodsId
        }
        this.props.callback(data);
    },
});
var styles=StyleSheet.create({
    fiveFont:{
        fontSize:Util.fixedFont(14),
        marginBottom:4,
        marginTop:2
    },
    yiHang:{
        flex:1,flexDirection:'row'
    },
    daiPay:{
        backgroundColor:'orange',
        padding:2
    },
    smallFont:{
        fontSize:Util.fixedFont(12),
        color:'#fff'
    },
    orderCont:{
        flex:1,
        flexDirection:'row',
        height:100,
        width:Util.size.width,
        justifyContent:'center',
        alignItems:'center'
    },
    writeColor:{
        color:'#fff'
    },
    orderConRig:{
        marginLeft:20,
        justifyContent:'center',
        alignItems:'flex-start',
        width:Util.size.width-80,
        height:100
    },
    orderGoods:{
        width:80,
        height:80,
        justifyContent:'center'
    },
    redColor:{
        color:'#f00'
    },
    smalFon:{
        fontSize:Util.fixedFont(14)
    },
    align:{
        width:80
    },
     marginBet:{
        marginBottom:1,
        marginTop:1,
        fontSize:Util.fixedFont(12),
        width:Util.size.width-140,
        color:'#5e5a57',
        lineHeight:19
     }
});
module.exports=OrderGoodDetail;