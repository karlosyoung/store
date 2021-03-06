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
var OrderGoodDetailDai=React.createClass({
    getInitialState: function() {
        return null;
    },
    render:function(){
        var _goodsListView=this._initGoodsViewList();
        var data=this.props.data;
        return(
        <View>
            <View>
                {_goodsListView}
                <View style={styles.centerR}>
                    <View style={styles.yiHang}><Text style={styles.grayColor}>支付配送：在线支付 集中配送至学校</Text></View>
                    <Text style={styles.grayColor}>下单时间：{this.props.data.data.addTime}</Text>
                </View>
            </View>
        </View>
        );
    },
    _initGoodsViewList:function(){
        var data=this.props.data;
        var _recType=data.data.recType;//1	商品类型;0普通;1公告统购; 2公告代购
        var itemList=[];
        var _list=[];
        _list=data.data.helpOrderDTOList;
        if(_list!=null && _list.length>0){
            for(var i=0;i<_list.length;i++){
                var item=_list[i];
                var _reserve1=item.status;
                var _goodsListView=this._initHelpGoodsViewList(item.sunOrderGoodsDTOList,_recType,item.sex);
                var _goodLength=item.sunOrderGoodsDTOList.length;
                var _count=0;
                for(var k=0;k<_goodLength;k++){
                    _count+=parseInt(item.sunOrderGoodsDTOList[k].purchaseGoodsNumber==null?1:item.sunOrderGoodsDTOList[k].purchaseGoodsNumber);
                }
                itemList[i]=(
                    <View style={styles.backHui}>
                        <View style={styles.titleInform}><Text style={{marginLeft:10,marginTop:5}}>收货信息{i+1}</Text></View>
                         {_goodsListView}
                         <View style={[styles.yiHang,styles.orderHeis]}>
                            <View style={styles.yiLeft}>
                                 <View style={[styles.yiHang,styles.twoLong]}>
                                      <Image style={styles.orderImg} source={require('../../img/orderDetail/man.png')} style={{width: 12, height: 13,marginTop:2,marginRight:7} } />
                                      <View style={styles.nameMAx}><Text numberOfLines={1} style={styles.names}>{item.userRealName}</Text></View>
                                      <Image style={styles.orderImg} source={require('../../img/orderDetail/newphone.png')} style={{width: 9, height: 13,marginTop:2,marginRight:7} } />
                                      <View style={styles.phoneMAx}><Text numberOfLines={1} style={styles.phone}>{item.mobilePhone}</Text></View>
                                 </View>
                                 <View style={styles.orderAddHeig}><Text style={styles.fontSmal} numberOfLines={2}>{data.data.province+' '+data.data.city+' '+data.data.district+' '+data.data.schoolName+' '+item.gradeNo+' '+item.classNo}</Text></View>
                            </View>
                            <View style={styles.yiRight}>
                                 <Text style={styles.fontGong}>共<Text>{_count}</Text>件</Text>
                                 <Text style={styles.fontGong}>共<Text style={styles.redColor}>{Util.FuncRmbFormat(item.price*(item.sunOrderGoodsDTOList[0].goodsNumber))}</Text></Text>
                            </View>
                         </View>
                     </View>
                );
            }
        };
        return itemList;
    },
    //生成代购商品列表数据
     _initHelpGoodsViewList:function(_list,_recType,_sex){
        var itemList=[];
        if(_list!=null && _list.length>0){
            for(var i=0;i<_list.length;i++){
                var item=_list[i];
                var _reserve1='2';
                if(_recType==0 && this.props.data.data.orderPayShippingStatus==0){
                    _reserve1=item.status;  //只有零售显示下架
                }
                itemList[i]=(
                    <TouchableOpacity onPress={this._pressCallback.bind(this,item.goodsId)}>
                        <View style={styles.backHui}>
                            <View style={styles.orderCont}>
                                 {
                                     _reserve1 =='03'?
                                     <View>
                                         <View style={[styles.marginL,{width:80}]}>
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
                                               _sex== '男'?
                                                   <Image source={require('../../img/common/boy.png')} style={{width:30, height:30} }/>
                                               :
                                                _sex=='女'?
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
                                      <View style={[styles.marginL,{width:80}]}>
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
                                          _sex=='男'?
                                              <Image source={require('../../img/common/boy.png')} style={{width:30, height:30} }/>
                                          :
                                          _sex=='女'?
                                              <Image source={require('../../img/common/girl.png')} style={{width:30, height:30} }/>
                                          :
                                              null
                                       }
                                       </View>
                                       </View>
                                 }
                                 <View style={styles.orderConRig}>
                                    <Text numberOfLines={1} style={[styles.marginBet,styles.fiveFont]}>{item.goodsName}</Text>
                                    <Text style={styles.marginBet}>尺码：<Text>{item.goodsAttrValue==null?'':item.goodsAttrValue}</Text></Text>
                                    <Text style={styles.marginBet}>数量：X<Text>{item.purchaseGoodsNumber==null?1:item.purchaseGoodsNumber}</Text></Text>
                                 </View>
                         </View>
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
    backHui:{
        width:Util.size.width-28
    },
    fontSmal:{
        fontSize:Util.fixedFont(12)
    },
    names:{
        fontSize:Util.fixedFont(12)
    },
    phone:{
        fontSize:Util.fixedFont(12)
    },
    fiveFont:{
        fontSize:Util.fixedFont(14),
        marginBottom:4,
        marginTop:2
    },
    titleInform:{
        height:25,
        justifyContent:'center',
        backgroundColor:'#fff',
        width:Util.size.width-28,
        marginTop:10,
        justifyContent:'center',
        alignItems:'flex-start'
    },
    daiPay:{
        backgroundColor:'orange'
    },
    smallFont:{
        fontSize:Util.fixedFont(12)
    },
    yiHang:{
        flexDirection:'row',
        flex:1
    },
    twoLong:{
        height:20
    },
    orderAddHeig:{
        height:35,
        justifyContent:'center',
    },
    orderHeis:{
        height:70,
        width:Util.size.width-28,
        backgroundColor:'#fff',
        paddingTop:10,
        paddingBottom:10,
        borderColor:'#e0e0e0',
        borderTopWidth:1,
    },
    yiLeft:{
        width:Util.size.width-128,
        height:50,
        color:'#5e5a57',
        paddingLeft:8,
        paddingRight:8
    },
    yiRight:{
        width:100,
        borderLeftWidth:1,
        borderColor:'#b0b0b0',
        height:50,
        paddingLeft:5
    },
    fontGong:{
        height:30
    },
    nameMAx:{
        width:Util.size.width-260
    },
    phoneMAx:{
        width:90
    },
    posiTop:{
        alignItems:'flex-end',
        width:Util.size.width-20
    },
    grayColor:{
        color:'#5e5a57',
        fontSize:Util.fixedFont(12)
    },
    centerR:{
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        width:Util.size.width-28,
        paddingTop:5,
        paddingBottom:5,
        marginTop:10,
        marginBottom:50
    },
    orderCont:{
        flex:1,
        flexDirection:'row',
        height:100,
        width:Util.size.width-28,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    writeColor:{
        color:'#fff'
    },
    orderConRig:{
        marginLeft:20,
        justifyContent:'center',
        alignItems:'flex-start',
        width:Util.size.width-150,
                             color:'#333'
    },
    orderGoods:{
        width:80,
        height:80,
        justifyContent:'center'
    },
    redColor:{
        color:'#f65e5d'
    },
     marginBet:{
        marginBottom:1,
        marginTop:1,
        fontSize:Util.fixedFont(12),
        color:'#5e5a57',
        lineHeight:19
     }
});
module.exports=OrderGoodDetailDai;