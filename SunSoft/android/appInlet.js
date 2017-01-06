/**
 * Created by qiaozm on 2016/6/29.
 * 头部导航主体部分组件
 */
import React,{Component} from 'react';
import Retail from './main/retail';
import Order from './order/order';
import OrderSelect from './order/orderSelect';
import FeedBack from './feedback/feedback';
import AddFeedBack from './feedback/addFeedBack';
import FeedBackTwo from './feedback/feedbackTwo';
import orderOneView from './main/orderOneView';
import RetailDetail from './main/retailDetail';
import OrderReturn from './order/orderReturn';
import {
    AppRegistry,
    TouchableOpacity,
    StyleSheet,
    Navigator,
    View,
    Text,
    Platform
} from'react-native';
var defaultRoute = {
  component: Retail,
  param:{}
};
var navigation=React.createClass({
getInitialState: function() {
     return {
            initData:this.props.initData,
            initRoute:this.props.initRoute
     };
 },
_renderScene(route, navigator) {
    var Component = route.component;
    return (
        <Component {...route.params} navigator={navigator} />
    );
  },
  render:function(){
  if(this.state.initRoute=='order'){
    defaultRoute.component=Order;
  }else if(this.state.initRoute=='orderFeedback'){
    defaultRoute.component=FeedBack;
  }else if(this.state.initRoute=='addFeedBack'){
    defaultRoute.component=AddFeedBack;
  }else if(this.state.initRoute=='feedBackTwo'){
       defaultRoute.component=FeedBackTwo;
  }else if(this.state.initRoute=='toOrder'){
    defaultRoute.component=orderOneView;
  }else if(this.state.initRoute=='retailDetail' || this.state.initRoute=='orderRetailDetail' || this.state.initRoute=='cartRetailDetail'){
    defaultRoute.component=RetailDetail;
  }else if(this.state.initRoute=='afterSale'){
    defaultRoute.component=OrderReturn;
  }
  defaultRoute.params={
    initRoute:this.state.initRoute,
    initData:this.state.initData
  }
    return (
        <Navigator
            initialRoute={defaultRoute}
            renderScene={this._renderScene}/>
    );
  }
});
AppRegistry.registerComponent('SunSoft', () => navigation);
