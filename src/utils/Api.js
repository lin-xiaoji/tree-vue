import reqwest from 'reqwest'



const baseUrl = 'http://tree.lin-xiaoji.com/api/';
const Api = {
    baseUrl:baseUrl,
    post(url,param,callback) {
        this.ajax(url,param,callback,'POST');
    },
    get(url,param,callback) {
        this.ajax(url,param,callback,'GET');
    },
    ajax(url,param,callback,type){
        let token = '';
        const isLoggedIn = !!Cookie.get("login_id");
        if(isLoggedIn) {
            token = token + '&login_id='+  Cookie.get("login_id") +'&token='+ Cookie.get("token");
        }
        var url = baseUrl + url + token;
        if(url.indexOf('?') == -1) {
            url = url.replace('&','?');
        }
        reqwest({
            url: url ,
            method: type,
            crossOrigin: true,
            data: param,
            success: function(ret){
                try{
                    var data = JSON.parse(ret);
                } catch (e) {
                    alert('json error:'+ret);
                    iView.Message.error('数据格式错误，数据内容：'+ret);
                    return false;
                }
                if(data.code == 200){
                    callback(data.data);
                } else {
                    iView.Message.error(data.msg);
                }
            }
        });
    }
};


export default Api;
