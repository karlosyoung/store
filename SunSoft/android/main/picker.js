/**
 * Created by qiaozm on 2016/6/29.
 * 仿照iOS的滚轮控件
 */
import React, { Component } from 'react';
import Picker from 'react-native-picker';
var Util=require('../../common/Util');
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
var pickerModel = React.createClass({
    getInitialState: function() {
        var _selectedItemIndex=this.props.data.classIndex;
      if(this.props.data.classOrGrade=='grade'){
        _selectedItemIndex=this.props.data.gradeIndex
      }
      return {
        classOrGrade:this.props.data.classOrGrade,
        selectedItemIndex:_selectedItemIndex,
        data:this.props.data.pickerData,
        itemList: []
      }
    },
    _showAreaPicker() {
        Picker.init({
            pickerData: this.state.itemList,
            selectedValue: ['赵云'],
            onPickerConfirm: pickedValue => {
                alert(pickedValue);
                console.log('area', pickedValue);
            },
            onPickerCancel: pickedValue => {
                alert(pickedValue);
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                alert(pickedValue);
                console.log('area', pickedValue);
            }
        });
        Picker.show();
    },
    componentDidMount: function() {
        var _dataValue=new Array();
        var _dataKey=new Array();
        var _data=this.state.data.schoolClass;
        var _classOrGrade=this.state.classOrGrade;
        if(_classOrGrade=='grade'){
            _data=this.state.data.schoolGrade;
            //this.setState({selectedItemIndex:4});
        }
        for(var i=0;i<_data.length;i++){
            var _item=_data[i];
            _dataKey.push(_item.key);
            _dataValue.push(_item.value);
        };
        this.setState({
            itemKeyList:_dataKey,
            itemList:_dataValue
        });
         //this.fetchData();
    },

_getItemValue: function() {
    var _value=this.state.itemList[this.state.selectedItemIndex];
    this.props.callback({
    value:_value,
    id:this.state.itemKeyList[this.state.selectedItemIndex],
    classOrGrade:this.state.classOrGrade,
    index:this.state.selectedItemIndex
});  //回调函数
/*this.setState({
selectedItem: this.state.itemList.indexOf(name),
})*/
},

render() {
        return (
            <View style={{height:100}}>
                <TouchableOpacity style={{marginTop: 10, marginLeft: 20}} onPress={this._showAreaPicker.bind(this)}>
                    <Text>AreaPicker</Text>
                </TouchableOpacity>
            </View>
        );
    }
});

const styles = StyleSheet.create({
  popLayer:{
    height:Util.size.height,
    backgroundColor:'#000',
    opacity:0.7,
    width:Util.size.width,
    position:'absolute',
    top:0,
    left:0
   },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height:Util.size.height,
    width:Util.size.width,
    position:'absolute',
    top:0,
    left:0
  },
  back:{
      justifyContent: 'center',
      alignItems: 'center',
      height:Util.size.height/3+70,
      width:Util.size.width,
      position:'absolute',
      top:Util.size.height-Util.size.height/3-50,
      left:0,
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  selectBtn:{
    width:Util.size.width,
    height:10,
    flex:1,
    paddingTop:10,
    flexDirection:'row',
    flexWrap:'nowrap',
    backgroundColor:'#4cb050'
  },
  sureBtn:{
    justifyContent:'center',
    alignItems:'center',
    height:30,
    width:70,
    marginLeft:15
  },
  cancelBtn:{
    justifyContent:'center',
    alignItems:'center',
    height:30,
    width:70,
    marginRight:15,
    marginLeft:Util.size.width-180
  },
  sureBtnIn:{
    color:'#fff',
    fontSize:Util.fixedFont(16),
    height:20,
    lineHeight:18
  },
  cancelBtnIn:{
    color:'#fff',
    fontSize:Util.fixedFont(16),
    height:20,
    lineHeight:18
  },
  box:{
    borderTopColor:'#5e5a57',
    borderTopWidth:1,
    borderBottomColor:'#5e5a57',
    borderBottomWidth:1,
    width:Util.size.width,
    height:40,
    fontSize:16
  }

});
module.exports=pickerModel;