/**
 * Created by qiaozm on 2016/6/29.
 * 封装navigation
 * 所有的切换过场动画都是从底部往上,回退是从上往下
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator
} from'react-native';

module.exports=React.createClass({
    render:function(){
        return(
            <Navigator
                initialRoute={{name:'',component:this.props.component}}
                configureScene={()=>{return Navigator.SceneConfigs.FloatFromBottom;}}
                renderScene={(route,navigator)=>{
                    const Component=route.component;
                    return(
                        <View style={{flex:1}}>
                            <Component navigator={navigator} route={route} {...route.passProps} />
                        </View>
                    );
            }}/>
        );
    }
});