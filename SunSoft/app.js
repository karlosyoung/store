/**
 * Created by qiaozm on 2016/6/29.
 * 头部导航主体部分组件
 */
import React,{Component} from 'react';
import {
    AppRegistry,
    TouchableOpacity,
    StyleSheet,
    Navigator,
    View,
    Text,
    Platform
} from'react-native';
if(Platform.OS=='ios'){
       require('./RniOS/appInlet');
  }else{
       require('./android/appInlet');
  }
