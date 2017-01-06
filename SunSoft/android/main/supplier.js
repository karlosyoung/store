/**
 * Created by qiaozm on 2016/7/7.
 * 厂家信息组件
 */
import React,{Component} from 'react';
import ReactNative from 'react-native'
var Util=require('../../common/Util');
import Service from '../../common/service';
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} = ReactNative;
var supplierInfo =React.createClass({
    getInitialState: function () {
            return {
                data:this.props.data,
                loaded:false
            };
        },
        componentDidMount: function () {
            this._fetchData();
        },
        componentWillMount:function() {
        },
    render: function() {
    //alert(this.state.data.supplierName);
    if (!this.state.loaded) {
                return this.renderLoadingView();
            }
        return (
            <View style={styles.conCenter}>
                <View style={styles.conDetail}>
                    <Text style={styles.goodTitle}>{this.state.data.supplierName==null?"":this.state.data.supplierName}：</Text>
                    <View sytle={styles.comContent}><Text style={styles.comTex}>{this.state.data.supplierContent==null?"":this.state.data.supplierContent}</Text></View>
                    <Text style={styles.goodTitle}>基本情况：</Text>
                    <View>
                        <View style={styles.comTime}>
                            <Text style={styles.textLine}>成立时间:<Text style={styles.daZi}>{this.state.data.supplierSetupDate==null?"":this.state.data.supplierSetupDate}</Text></Text>
                            <Text style={styles.textLine}>法人代表:<Text style={styles.daZi}>{this.state.data.legalRepr==null?"":this.state.data.legalRepr}</Text></Text>
                        </View>
                        <View style={{ position:'absolute',bottom:0,left:0}}>
                            <Image resizeMode='contain' source={require('../../img/retailDetail/lineImage.png')} style={{width:Util.size.width-30, height:3,marginLeft:15}} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.comTime}>
                            <Text style={styles.textLine}>注册资金:<Text style={styles.daZi}>{this.state.data.regCapital==null?"":this.state.data.regCapital}万</Text></Text>
                            <Text style={styles.textLine}>职工人数:<Text style={styles.daZi}>{this.state.data.employeeNum==null?"":this.state.data.employeeNum}</Text></Text>
                        </View>
                        <View style={{ position:'absolute',bottom:0,left:0}}>
                            <Image resizeMode='contain' source={require('../../img/retailDetail/lineImage.png')} style={{width:Util.size.width-30, height:3,marginLeft:15}} />
                        </View>
                    </View>
                    <Text style={styles.goodTitle}>企业资质：</Text>
                    <View style={styles.sizeImg}>
                        <Image resizeMode='contain' source={{uri: this.state.data.busiLicensePicUrl}} style={[{width:400, height:500},styles.imgBs]} />
                    </View>
                    <View style={styles.sizeImg}>
                        <Image resizeMode='contain' source={{uri: this.state.data.orgCodePicUrl}} style={[{width:400, height:250},styles.imgBs]} />
                    </View>
                    <View style={styles.sizeImg}>
                        <Image resizeMode='contain' source={{uri: this.state.data.taxCertPicUrl}} style={[{width:400, height:250},styles.imgBs]} />
                    </View>
                    <Text style={styles.goodTitle}>设备条件：</Text>
                    <View style={styles.comContent}>
                        <Text style={styles.comTex}>{this.state.data.equipmentInfo==null?"":this.state.data.equipmentInfo}</Text>
                    </View>
                </View>
            </View>
        );
    },
    renderLoadingView: function () {
            return (
                <View style={styles.container}>
                    <Text>
                    </Text>
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
        marginBottom:50
    },
    conDetail:{},
    goodTitle:{
        width:Util.size.width,
        height:30,
        marginTop:10,
        justifyContent:'center',
        marginLeft:15,
        fontSize:Util.fixedFont(15),
        color:'#5a5b58',
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
        marginLeft:15,
        height:34,
        paddingTop:5,
        justifyContent:'center',
        marginRight:15,
        width:Util.size.width-30
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
        marginLeft:15,
        marginRight:15,
        color:'#888888',
        fontSize:Util.fixedFont(12)
    },
    daZi:{
        color:'#5e5a57',
        fontSize:Util.fixedFont(13)
    },
    textLine:{
        width:Util.size.width/2-15,
        color:'#b0b0b0',
        fontSize:Util.fixedFont(11)
    },
    imgBs:{
        width:Util.size.width-30,
        marginRight:15,
        marginLeft:15
}
});
module.exports=supplierInfo;


