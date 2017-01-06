import React,{Component} from 'react';
import service from '../../common/service';
import {
    AppRegistry,
    TouchableOpacity,
    StyleSheet,
    Navigator,
    View,
    Text,
    Platform
} from'react-native';

var MyAwesomeApp =React.createClass({
  render() {
    return (
      <View >
        <Text style={styles.hello}>Hello, World</Text>
        <Text style={styles.hello}>恭喜你已经完成React Native移植Android项目</Text>
        <Text style={styles.hello}>博客地址:www.lcode.org</Text>
      </View>
    )
  }
});
var styles = StyleSheet.create({
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
module.exports=MyAwesomeApp;
