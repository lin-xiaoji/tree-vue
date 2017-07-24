import reqwest from 'reqwest'
import Cookie from './Cookie'


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
                    return false;
                }
                if(data.code == 1){
                    callback(data.data);
                } else {
                    alert(data.msg);
                }
            }
        });
    }
};


export default Api;
