/**
 * Created by qiaozm on 2016/6/29.
 * 商品详情组件
 */
import React,{Component} from 'react';
var Header=require('../../common/header');
var Util=require('../../common/Util');
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    BackAndroid
} from'react-native';
var BodyMeasure =React.createClass({
    getInitialState: function() {
       return null;
    },
   componentDidMount: function() {
       BackAndroid.addEventListener('hardwareBackPress', this.onBackPressed);
   },
   onBackPressed:function(){
       this.props.navigator.pop();
       return true;
   },
   componentWillUnmount(){
     BackAndroid.removeEventListener('hardwareBackPress', this.onBackPressed);
   },

    render: function() {
        return (
            <View style={{flex:1}}>
                    <View style={{flex:1}}>
                        <View><Image source={require('../../img/common/noInter.png')} resizeMode='contain' style={{width:0,height:0}} /></View>
                        <Header navigator={this.props.navigator} initObj={{
                            backName:'bodyMeasure',
                            title:'身体数据测量方法',
                            show:true,
                            callback:this.props.callback
                        }}/>
                        <ScrollView>
                            <View style={styles.bigView}>
                                <View  style={styles.cont}>
                                    <Image source={require('../../img/retailDetail/boddy.png')} resizeMode='contain' style={{width:Util.size.width-30,height:350,marginLeft:15,marginRight:15}}  />
                                    <View style={styles.ceLang}>
                                        <Text style={styles.fontG}>1.身高：赤脚站立时头顶到地面的高度</Text>
                                        <Text style={styles.fontG}>2.体重：保持身体平稳站在体重秤上测量</Text>
                                        <Text style={styles.fontG}>3.肩宽：左肩点到右肩点</Text>
                                        <Text style={styles.fontG}>4.胸围：经胸点处水平测量一周</Text>
                                        <Text style={styles.fontG}>5.腰围：经肚脐点处处水平测量一周</Text>
                                        <Text style={styles.fontG}>6.臀围：经臀部最丰满处水平测量一周</Text>
                                        <Text style={styles.fontG}>7.袖长：肩点到虎口</Text>
                                        <Text style={styles.fontG}>8.裤长：赤脚站立时自然腰位直至地面</Text>
                                    </View>
                                </View>
                            </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#f7f7f7',
        width:Util.size.width,
        height:Util.size.height,
        justifyContent:'center',
        alignItems:'center'
    },
    bigView:{
        flex:1,
        backgroundColor:'#f7f7f7',
        width:Util.size.width
    },
    cont:{
        width:Util.size.width-20,
        backgroundColor:'#fff',
        margin:10,
        flex:1,
    },
    ceLang:{
        width:Util.size.width-40,
        marginLeft:20,
        marginRight:20,
        marginTop:15
    },
    fontG:{
        fontSize:Util.fixedFont(14),
        height:30,
        justifyContent:'center'
    }

});
module.exports=BodyMeasure;


