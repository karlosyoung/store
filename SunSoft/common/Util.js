/**
 * Created by qiaozm on 2016/6/29.
 * 提供公用方法
 */
var React=require('react-native');
var Dimensions=require('Dimensions');
var{
    PixelRatio,
    ActivityIndicatorIOS
    }=React
module.exports={
    /*最小线宽*/
    pixel:1/PixelRatio.get(),

    /*实际像素*/
    getPixelSizeForLayoutSize:function(param){
        return PixelRatio.getPixelSizeForLayoutSize(param);
    },

    /*屏幕尺寸*/
    size:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },

    /**
     * fetch的get方法
     * @method get
     * @param {string} url
     * @param {function} callback请求成功回调
     */
    get:function(url,successCallback,failCallback){
        fetch(url).then((response)=>response.text())
        .then((_responseText)=>{
            successCallback(JSON.parse(_responseText));
        }).catch(function(err){
            failCallback(err);
        });
    },

    /**
         * fetch的post方法
         * @method post
         * @param {string} url
         * @param {function} callback请求成功回调
         */
        post:function(url,fromData,successCallback,failCallback){
            fetch(url, {
                   method: 'POST',
                   body:this._toQueryString(fromData)})
             .then((response)=>response.text())
            .then((_responseText)=>{
                successCallback(JSON.parse(_responseText));
            }).catch(function(err){
                failCallback(err);
            });
        },

        _toQueryString:function(obj) {
            return obj ? Object.keys(obj).sort().map(function (key) {
                var val = obj[key];
                if (Array.isArray(val)) {
                    return val.sort().map(function (val2) {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                    }).join('&');
                }

                return encodeURIComponent(key) + '=' + encodeURIComponent(val);
            }).join('&') : '';
        },

        /**
        *判断请求数据是否超时
        *@param {string} s
        **/
        FuncTimeOut:function(){
            return new Promise(function (resolve, reject) {
                var _data={
                    data:{},
                    message:'timeout'
                }
               setTimeout(resolve, 10000, _data);
           });
        },

    /**
    *人民币格式化
    *@param {string} s
    **/
    FuncRmbFormat:function(s){
        if(/[^0-9\.]/.test(s)) return "invalid value";
        	s=s+'';
            s=s.replace(/^(\d*)$/,"$1.");
            s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
            s=s.replace(".",",");
            var re=/(\d)(\d{3},)/;
            while(re.test(s))
                    s=s.replace(re,"$1,$2");
            s=s.replace(/,(\d\d)$/,".$1");
            if(s.indexOf('.')>0){
            	var temp=s.substring(s.indexOf('.'));
            	/*if(temp=='.00'){
            		s=s.substring(0,s.indexOf('.'));
            	}*/
            }
            return "￥" + s.replace(/^\./,"0.");
    },

    /**
    *删除字符串左右的空格
    *@param {string} str
    **/
    FuncStrFormateSpace1:function(str){
    	return str.replace(/(^\s*)|(\s*$)/g,'');
    },

    /**
    *删除字符串左右的空格保留中间一个空格
    *@param {string} str
    **/
    FuncStrFormateSpace2:function(str){
    	var _str=str.replace(/(^\s*)|(\s*$)/g,'');  //删除左右的空格
    	_str=_str.replace(/\s+/g,' ');  //保留中间一个空格
    	return _str;
    },

    /**
     * 删除字符串所有的空格
     *@param {string} str
     */
    FuncStrFormateSpace3:function(str){
    	return str.replace(/\s/g, "");
    },

    /**
     * 判断是否为非负整数字
     *@param {string} str
     */
    FuncStrFormateSpace4:function(str){
        return /^[0-9]*[1-9][0-9]*$/.test(this.FuncStrFormateSpace3(str));
    },

    /**
     * 判断是否为非负浮点数
     *@param {string} str
     */
    FuncStrFormateSpace5:function(str){
        return /^(([0-9]*[1-9][0-9]*\.[0-9])|([0-9]*[1-9][0-9]*))$/.test(this.FuncStrFormateSpace3(str));
    },

    /**
     * 获取字符串的字符长度
     */
    FuncGetTextLength:function(str){// 获取字符串的长度 一个汉字为2个字符
    	return str.replace(/[^\x00-\xff]/g,"xx").length;
    },

    fixedFont:function(size) {
        // NOTE: Font Scale should always be the same as the Pixel Ratio on iOS, making this
        // a no-op.
        return size * React.PixelRatio.get() / React.PixelRatio.getFontScale();
      }
};