/**
 * Created on 2016/7/21.
 *
 */
var Util=require('./Util');
import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
var NoData =React.createClass({
    render:function(){
        return(
            <View>
            {
                Platform.OS=='ios'?
               <View style={styles.noDatas}>
                <View style={styles.noDataIns}>
                    <Image source={require('../img/common/noData.png')} resizeMode='contain' style={[styles.noDataImgs,{width:Util.size.width-230,height:Util.size.width-230}]} />
                    <View style={styles.zanWus}><Text allowFontScaling={false} style={styles.zanWuIns}>暂无数据</Text></View>
                    <View style={styles.noFounts}><Text allowFontScaling={false} style={styles.noFountIn}>抱歉，没有找到您当前的数据</Text></View>
                    <TouchableOpacity onPress={this._onPressRefresh.bind(this)}>
                        <View style={styles.retrys}><Image source={require('../img/common/cs.png')} resizeMode='contain' style={[styles.retryIns]} /></View>
                    </TouchableOpacity>
                </View>
               </View>
            :
               <View style={styles.noData}>
                <View style={styles.noDataIn}>
                     <Image source={require('../img/common/noData.png')} resizeMode='contain' style={[styles.noDataImg,{width:Util.size.width-260,height:Util.size.width-260}]} />
                    <View style={styles.zanWu}><Text allowFontScaling={false} style={styles.zanWuIn}>暂无数据</Text></View>
                    <View style={styles.noFount}><Text allowFontScaling={false} style={styles.noFountIn}>抱歉，没有找到您当前的数据</Text></View>
                    <TouchableOpacity onPress={this._onPressRefresh.bind(this)}>
                        <View style={styles.retry}><Image source={require('../img/common/cs.png')} resizeMode='contain' style={[styles.retryIn]} /></View>
                    </TouchableOpacity>
                </View>
               </View>
            }

            </View>
        )
    },

    //点击刷新方法
    _onPressRefresh:function(){
        this.props.callback('noData');
    }
});
var styles=StyleSheet.create({
                             
                             noDatas:{
                             width:Util.size.width,
                             height:Util.size.height,
                             justifyContent:'center',
                             alignItems:'flex-start',
                             flexDirection: 'row',
                             flex:1,
                             marginTop:Util.size.height/9
                             },
                             noData:{
    width:Util.size.width,
    height:Util.size.height,
    justifyContent:'center',
    alignItems:'flex-start',
    flexDirection: 'row',
    flex:1,
    marginTop:84
    },
    noDataIns:{
        width:Util.size.width-40,
        paddingLeft:20,
        paddingRight:20,
        height:320,
        backgroundColor:'#fff',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
        },
    noDataImgs:{
        width:Util.size.width-165,
        height:Util.size.width-165,
        marginLeft:70,
        marginRight:70
    },
    zanWus:{
        width:Util.size.width,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    noFounts:{
        width:Util.size.width-40,
        height:30,
        justifyContent:'center',
        alignItems:'center'
       },
    retrys:{
        width:Util.size.width,
        justifyContent:'center',
        alignItems:'center',
        height:48
    },
    zanWuIns:{
        color:'#333',
        fontSize:16,
        height:35,
        fontWeight:'bold'
    },
    retryIns:{
        width:Util.size.width-225,
        height:48,
        marginRight:80
    },



noDataIn:{
    width:316,
    marginRight:Util.size.width/2-158,
    marginLeft:Util.size.width/2-158,
    height:338,
    backgroundColor:'#fff',
    borderRadius:15,
    alignItems:'center'
    },
noDataImg:{
    width:Util.size.width-165,
    height:Util.size.width-165,
    marginLeft:70,
    marginRight:70,
        marginTop:15,
        marginBottom:10,
},
zanWu:{
    width:Util.size.width,
    height:20,
    justifyContent:'center',
    alignItems:'center',
},
noFount:{
    width:Util.size.width-40,
    height:20,
    justifyContent:'center',
    alignItems:'center',
    marginTop:16
   },
retry:{
    width:Util.size.width,
    justifyContent:'center',
    alignItems:'center',
    height:37,
    marginTop:45
},
zanWuIn:{
    color:'#333',
    fontSize:16,
    height:20,
    fontWeight:'bold'
},
noFountIn:{
    width:Util.size.width-40,
    color:'#b0b0b0',
    fontSize:13,
    textAlign:'center'
},
retryIn:{
    width:108,
    height:37,
    marginRight:52
}
});
module.exports=NoData;